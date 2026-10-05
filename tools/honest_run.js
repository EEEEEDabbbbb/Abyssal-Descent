// Honest-play simulator: a bot plays whole runs with NO stat cheats and
// sensible choices (equips better gear, spends talents, drinks potions, uses
// its strongest affordable abilities and bursts, buys from shops, takes boss
// rewards), then reports how deep each run got and what killed it.
//
//   node tools/honest_run.js                       # 6 classes × 6 seeds
//   RUNS=10 node tools/honest_run.js warlord pyromancer
//   DIFF=hard node tools/honest_run.js
//   META=max node tools/honest_run.js  # veteran account: every Shard Emporium
//                                      # upgrade bought (purges/pacts too)
//   GOD=1 node tools/honest_run.js    # can't die: prints the player's stats on
//                                      # arrival at each floor (growth curve)
//   FLEE=1 node tools/honest_run.js   # flee hard counters and lost causes
//                                      # (never guardians or bosses), like a person
//   PRE="…" node tools/honest_run.js  # run code in the page first (try a change)
//
// Use it to check the difficulty curve after balance changes. Needs the dev
// dependencies (npm install).
const { openGame, prepare } = require('../tests/helpers');

let CLASSES = process.argv.slice(2).length ? process.argv.slice(2)
  : ['shadowblade', 'ironclad', 'pyromancer', 'warlord', 'necromancer', 'paladin'];
const RUNS = Number(process.env.RUNS) || 6;
const MAX_FLOOR = Number(process.env.MAX_FLOOR) || 50;

(async () => {
  const ctx = await openGame();
  await prepare(ctx.page);
  await ctx.page.evaluate(() => {
    window.setTimeout = fn => { fn(); return 0; };
    window.updateUI = () => {}; window.spawnFloat = () => {}; window.sfx = () => {};
    window.screenShake = () => {}; window.showToast = () => {};
    G._enemyTurnDelay = 0;
  });
  await ctx.page.addScriptTag({ content: BOT_SOURCE });
  if (process.env.FLEE) await ctx.page.evaluate(() => { window.__FLEE = true; });
  // PRE="…": run code in the page first, to try a change without editing data
  if (process.env.PRE) await ctx.page.evaluate(process.env.PRE);
  // FUSIONS=n: run n random fusion classes instead
  if (process.env.FUSIONS) {
    CLASSES = await ctx.page.evaluate(n => {
      const ids = Object.keys(FUSION_CLASS_FILE);
      const out = [];
      while (out.length < n) { const id = ids[Math.floor(Math.random() * ids.length)]; if (!out.includes(id)) out.push(id); }
      return out;
    }, Number(process.env.FUSIONS));
  }
  const all = [];
  for (const cls of CLASSES) {
    for (let i = 0; i < RUNS; i++) {
      const r = await ctx.page.evaluate(([cls, seed, max, diff, god, meta]) => __honestRun(cls, seed, max, diff, god, meta),
        [cls, `HONEST${i}`, MAX_FLOOR, process.env.DIFF || 'normal', !!process.env.GOD, process.env.META || '']);
      all.push(r);
    }
  }
  // Per class summary
  const rows = CLASSES.map(cls => {
    const rs = all.filter(r => r.cls === cls);
    const floors = rs.map(r => r.floor).sort((a, b) => a - b);
    return { cls, median: floors[Math.floor(floors.length / 2)], best: floors[floors.length - 1], worst: floors[0],
             avgLevel: +(rs.reduce((s, r) => s + r.level, 0) / rs.length).toFixed(1),
             bossDeaths: rs.filter(r => r.diedToBoss).length, runs: rs.length };
  });
  console.table(rows);
  // What kills runs, and where
  const killers = {};
  all.filter(r => r.killedBy).forEach(r => { killers[r.killedBy] = (killers[r.killedBy] || 0) + 1; });
  console.log('Top killers:', Object.entries(killers).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, n]) => `${k} ×${n}`).join(', '));
  const depth = {};
  all.forEach(r => { const b = Math.floor((r.floor - 1) / 5) * 5 + 1; depth[`${b}-${b + 4}`] = (depth[`${b}-${b + 4}`] || 0) + 1; });
  console.log('Deaths by floor band:', JSON.stringify(depth));
  if (process.env.VERBOSE) all.forEach(r => console.log(JSON.stringify({ ...r, growth: undefined, fights: undefined })));
  if (process.env.FIGHTS_LOG) all.forEach(r => { console.log(`-- ${r.cls} ${r.seed}`); r.fights.forEach(f => console.log(`  F${f.floor} ${f.names}: ${f.hp0}% -> ${f.hp1}% in ${f.turns} turns`)); });
  if (process.env.GOD) {
    // Average player stats on arrival at each floor
    const by = {};
    all.forEach(r => r.growth.forEach(g => { (by[g.floor] = by[g.floor] || []).push(g); }));
    console.log('floor\tlevel\tatk\tdef\tmaxHp\tspd\tgear');
    Object.keys(by).map(Number).sort((a, b) => a - b).forEach(f => {
      const a = by[f], avg = k => Math.round(a.reduce((s, g) => s + g[k], 0) / a.length);
      console.log([f, avg('level'), avg('atk'), avg('def'), avg('maxHp'), avg('spd'), avg('gear')].join('\t'));
    });
  }
  const se = all.filter(r => r.statusErrors.length);
  if (se.length) console.log('status errors:', JSON.stringify(se.map(r => [r.cls, r.statusErrors])));
  if (ctx.errors.length) console.log('page errors:', ctx.errors.slice(0, 5));
  await ctx.browser.close();
})();

// ── The bot (runs inside the page) ─────────────────────────────
const BOT_SOURCE = `
(function () {
  const STAT_W = { atk: 3, def: 2, maxHp: 0.35, maxMp: 0.1, spd: 1, crit: 1, critDmg: 0.4 };
  const gearScore = it => !it ? 0 : Object.entries(it.bonuses || {}).reduce((s, [k, v]) => s + (STAT_W[k] || 0) * v, 0) + (it.effect ? 8 : 0);
  const TALENT_ORDER = ['shadow_arts', 'blood_price', 'iron_will', 'fate_touched', 'critical_eye', 'deep_roots', 'quickening', 'soul_reserve', 'undying'];
  const isHeal = it => it.type === 'consumable' && /restore[s]? \\d+ HP|heal/i.test(it.desc || '');

  function maintain(p) {
    // Talents
    let spent = true;
    while (spent) {
      spent = false;
      for (const id of TALENT_ORDER) {
        const t = TALENT_TREE.find(x => x.id === id);
        if (t && (p.talents[id] || 0) < t.maxRank && p.talentPoints >= t.cost) { buyTalent(id); spent = true; break; }
      }
    }
    if (document.getElementById('overlay').classList.contains('active')) closeModal();
    // Equip upgrades
    for (let i = p.inventory.length - 1; i >= 0; i--) {
      const it = p.inventory[i];
      if (!['weapon', 'armor', 'relic'].includes(it.type)) continue;
      const slot = it.slot || it.type;
      if (gearScore(it) > gearScore(p.equipment[slot]) && !(p.equipment[slot] && p.equipment[slot].permanent)) {
        equipItem(it, i);
        if (document.getElementById('overlay').classList.contains('active')) closeModal(); // weapon arts: keep mine
      }
    }
    // Keep the pack light: sell spare gear, and keep at most 4 healing items
    // (other consumables get drunk right away)
    for (let i = p.inventory.length - 1; i >= 0; i--) {
      const it = p.inventory[i];
      if (it.type === 'consumable' && !isHeal(it)) { useItem(i); continue; }
      if (it.type !== 'consumable' && p.inventory.length >= 7) { p.gold += getSellPrice(it); p.inventory.splice(i, 1); }
    }
    while (p.inventory.filter(isHeal).length > 4) {
      const i = p.inventory.findIndex(isHeal);
      p.gold += getSellPrice(p.inventory[i]); p.inventory.splice(i, 1);
    }
    // Pick up anything left on the ground here (full-pack overflow)
    const here = G.map[G.playerPos.y][G.playerPos.x];
    if (here.droppedItems && here.droppedItems.length && !inventoryFull()) pickUpDroppedItems(here);
    // Heal up between fights if low
    while (p.stats.hp < p.stats.maxHp * 0.5) {
      const idx = p.inventory.findIndex(isHeal);
      if (idx < 0) break;
      useItem(idx);
    }
  }

  function abilityScore(p, id) {
    const ab = ABILITIES[id];
    const desc = ab.desc || '';
    const pcts = [...desc.matchAll(/(\\d+)% ATK/g)].map(m => +m[1]);
    let s = pcts.length ? Math.max(...pcts) : 0;
    if (/heal|restore/i.test(desc) && p.stats.hp < p.stats.maxHp * 0.45) s += 250;
    if (!pcts.length && /buff|stance|\\+\\d+% ATK/i.test(desc) && G.combatRound <= 1) s += 120;
    return s;
  }

  // FLEE=1: run from ordinary fights a person would give up on — a hard
  // element counter at the start, or losing badly — instead of fighting on
  function wantsToFlee(p) {
    if (!window.__FLEE) return false;
    const foes = (G.enemies || []).filter(e => e.hp > 0);
    if (!foes.length || foes.some(e => e.isBoss || e.isGuardian || e.isSecretBoss)) return false;
    const myEl = (getClassData(p.classId) || {}).element;
    const lead = foes[0];
    const counter = getElementMult(myEl, lead.element) < 1 && getElementMult(lead.element, myEl) > 1;
    if (counter && G.combatRound <= 1) return true;
    return p.stats.hp < p.stats.maxHp * 0.3 && lead.hp > lead.maxHp * 0.4;
  }

  function combatTurn(p) {
    if (wantsToFlee(p)) { playerAction('flee'); return; }
    const heal = p.inventory.findIndex(isHeal);
    if (p.stats.hp < p.stats.maxHp * 0.3 && heal >= 0) { useItemInCombat(heal); return; }
    if ((p.burstCharge || 0) >= BURST_THRESHOLD && ABILITIES[p.burstAbility]) { playerAction('burst'); return; }
    let best = null, bestScore = 0;
    for (const id of p.abilities) {
      if (!ABILITIES[id] || !canUseAbility(p, id).ok) continue;
      const sc = abilityScore(p, id);
      if (sc > bestScore) { best = id; bestScore = sc; }
    }
    if (best && bestScore >= 100) playerAction('ability', best);
    else playerAction('attack');
  }

  function handleModal(p) {
    if (G._rewardChoices) {
      let bi = 0; G._rewardChoices.forEach((it, i) => { if (gearScore(it) > gearScore(G._rewardChoices[bi])) bi = i; });
      claimReward(bi); return;
    }
    if (document.getElementById('descend-btn')) { confirmDescend(); return; } // leave unclaimed chests behind
    if (G._currentEvent) {
      const n = G._currentEvent.choices.length;
      resolveEvent(Math.floor(Math.random() * n)); return;
    }
    if (G.phase === 'shop' && G._shopItems) {
      // Buy the best affordable upgrade, then a potion
      for (let pass = 0; pass < 3; pass++) {
        let pick = -1, gain = 0;
        G._shopItems.forEach((it, i) => {
          if (it.shopPrice > p.gold) return;
          const g = it.type === 'consumable' ? (isHeal(it) ? 5 : 0) : gearScore(it) - gearScore(p.equipment[it.slot || it.type]);
          if (g > gain) { gain = g; pick = i; }
        });
        if (pick < 0) break;
        buyShopItem(pick);
      }
      closeShopKeepAlive(); return;
    }
    closeModal();
  }

  function nextStep() {
    const { x: sx, y: sy } = G.playerPos;
    const exitOpen = G.exitPos && G.map[G.exitPos.y][G.exitPos.x].content === 'exit';
    const prev = new Map([[sx + ',' + sy, null]]);
    const q = [[sx, sy]];
    let goal = null, fallback = null, interesting = null;
    while (q.length) {
      const [x, y] = q.shift();
      const c = G.map[y][x];
      if (!(x === sx && y === sy)) {
        if (!interesting && ['treasure', 'event', 'shop'].includes(c.content) && !(c.content === 'shop' && c._botVisited) && !(c.content === 'treasure' && inventoryFull())) interesting = [x, y];
        if (exitOpen && c.content === 'exit') { goal = [x, y]; break; }
        if (!exitOpen && (c.content === 'boss' || (c.content === 'enemy' && c.enemy && c.enemy.isSecretBoss))) { goal = goal || [x, y]; }
        if (!fallback && !c.visited && c.content !== 'exit_locked' && c.content !== 'boss_exit') fallback = [x, y];
      }
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy, k = nx + ',' + ny;
        if (nx < 0 || ny < 0 || nx >= G.mapW || ny >= G.mapH || prev.has(k)) continue;
        const n = G.map[ny][nx];
        if (n.type === 'wall' || n.content === 'exit_locked' || n.content === 'boss_exit') continue;
        prev.set(k, [x, y]); q.push([nx, ny]);
      }
    }
    // Explore and loot before taking on the floor's guardian
    const target = (exitOpen && goal) || interesting || fallback || goal;
    if (!target) return null;
    let cur = target;
    while (prev.get(cur[0] + ',' + cur[1]) && (prev.get(cur[0] + ',' + cur[1])[0] !== sx || prev.get(cur[0] + ',' + cur[1])[1] !== sy)) cur = prev.get(cur[0] + ',' + cur[1]);
    return { dx: cur[0] - sx, dy: cur[1] - sy };
  }

  window.__honestRun = async function (cls, seed, maxFloor, diff, god, meta) {
    await ensureClassLoaded(cls);
    localStorage.clear();
    G.meta = defaultMeta();
    if (meta === 'max') SHARD_SHOP_ITEMS.forEach(u => { G.meta.shopUpgrades[u.id] = u.maxRank; });
    G.worldGen = { roomCount: 'normal', difficulty: diff, enemyDensity: 'normal', treasureRate: 'normal', mapSize: 'normal' };
    resetRunState();
    G.selectedClass = cls;
    seedRun(seed);
    G.player = createPlayer(cls);
    applyLoadout(G.player);
    G.map = generateMap(G.floor);
    showScreen('game-screen');
    G.phase = 'explore';
    const p = G.player;
    const growth = [];
    const snap = () => growth.push({ floor: G.floor, level: p.level, atk: p.base.atk, def: p.base.def, maxHp: p.base.maxHp, spd: p.base.spd,
      gear: Math.round(Object.values(p.equipment).reduce((s, it) => s + gearScore(it), 0)) });
    snap();
    if (god && !window.__realDealDmgToPlayer) {
      window.__realDealDmgToPlayer = dealDmgToPlayer;
      window.dealDmgToPlayer = function () { const r = __realDealDmgToPlayer.apply(this, arguments); if (window.__god && G.player.stats.hp < 1) G.player.stats.hp = 1; return r; };
    }
    window.__god = !!god;
    G._statusErrors = [];
    let steps = 0, lastFloor = 1, floorSteps = 0, diedToBoss = false, stuck = null;
    const fights = []; G._botFight = null;
    while (!G._gameOverShown && G.floor <= maxFloor && steps < 60000) {
      steps++;
      if (G.phase === 'victory') break;
      if (document.getElementById('overlay').classList.contains('active')) { handleModal(G.player); continue; }
      if (G.inCombat) {
        if (!G._botFight) G._botFight = { floor: G.floor, names: G.enemies.map(e => e.name).join('+'), hp0: Math.round(100 * p.stats.hp / p.stats.maxHp), turns: 0 };
        if (G.turn === 'player') G._botFight.turns++;
        diedToBoss = G.enemies.some(e => e.isBoss || e.isGuardian);
        if (G.turn === 'player') combatTurn(p); else enemyTurn();
        continue;
      }
      if (G._botFight) { G._botFight.hp1 = Math.round(100 * p.stats.hp / p.stats.maxHp); fights.push(G._botFight); G._botFight = null; }
      maintain(p);
      const cellHere = G.map[G.playerPos.y][G.playerPos.x];
      if (cellHere.content === 'shop') cellHere._botVisited = true;
      const step = nextStep();
      if (!step) { stuck = 'no path'; break; }
      const before = G.playerPos.x + ',' + G.playerPos.y;
      movePlayer(step.dx, step.dy);
      if (G.floor !== lastFloor) { lastFloor = G.floor; floorSteps = 0; snap(); }
      else if (++floorSteps > 4000) { stuck = 'too long on floor at ' + before + ' phase ' + G.phase + ' cell ' + G.map[G.playerPos.y][G.playerPos.x].content; break; }
    }
    const gear = Object.values(p.equipment).filter(Boolean).map(i => i.rarity[0]).join('');
    return { conquered: !!(G.meta.conquestRewards && G.meta.conquestRewards.conquered), statusErrors: (G._statusErrors || []).slice(0, 5), cls, seed, floor: G.floor, level: p.level, died: !!G._gameOverShown, diedToBoss: G._gameOverShown && diedToBoss,
             killedBy: G._gameOverShown ? p._lastHitBy : null, atk: p.base.atk, def: p.base.def, hp: p.base.maxHp, gear, stuck, growth, fights: fights.concat(G._botFight ? [{ ...G._botFight, hp1: 0 }] : []) };
  };
})();
`;
