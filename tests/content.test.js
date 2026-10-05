// New content: rival bosses (and their signature moves) and the 2.2 gear effects.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, prepare } = require('./helpers');

let ctx;
const run = (fn, arg) => ctx.page.evaluate(fn, arg);

before(async () => {
  ctx = await openGame();
  await prepare(ctx.page);
  await run(() => {
    window.setTimeout = fn => { fn(); return 0; };
    window.updateUI = () => {}; window.spawnFloat = () => {}; window.showModal = () => {};
    window.showFloorReward = () => {}; window.sfx = () => {};
    G._enemyTurnDelay = 0;
  });
});
after(async () => { await ctx.browser.close(); });

test('every enemy move has a telegraph label and an AI role', async () => {
  const missing = await run(() => Object.keys(ENEMY_ABILITIES).filter(k => !ENEMY_ABILITY_INFO[k] || !ABILITY_ROLE[k]));
  assert.deepEqual(missing, []);
});

test('each boss floor can roll its usual boss or its rival, fixed by the seed', async () => {
  const r = await run(() => {
    const seen = {};
    for (let i = 0; i < 40; i++) {
      seedRun('RIVAL' + i);
      for (const f of Object.keys(BOSS_RIVALS)) {
        const id = withFloorSeed(+f, () => getBossForFloor(+f)).id;
        (seen[f] = seen[f] || new Set()).add(id);
      }
    }
    seedRun('SAME1'); const a = withFloorSeed(5, () => getBossForFloor(5)).id;
    seedRun('SAME1'); const b = withFloorSeed(5, () => getBossForFloor(5)).id;
    return { both: Object.entries(seen).filter(([, s]) => s.size === 2).length, floors: Object.keys(BOSS_RIVALS).length, same: a === b };
  });
  assert.equal(r.both, r.floors);
  assert.equal(r.same, true);
});

test('every rival boss can be fought to the end through all its phases, without errors', async () => {
  const r = await run(() => {
    const out = [];
    for (const [floor, id] of Object.entries(BOSS_RIVALS)) {
      __startTestRun('ironclad', +floor);
      const p = G.player;
      const boss = getBossForFloor(+floor, id);
      // Mechanics, not balance: survive a few rounds (HP is refilled every
      // turn) and hit for ~1/15 of the boss's HP. Keep HP realistic — drains
      // heal the boss by the damage they deal.
      addPermanentStat(p, 'maxHp', boss.atk * 12 - p.base.maxHp);
      addPermanentStat(p, 'atk', Math.round(boss.maxHp / 12 + boss.def * 1.5) - p.base.atk);
      G._gameOverShown = true; // a lucky boss crit mustn't end the test run
      G._statusErrors = [];
      const used = new Set();
      const realAbilities = {};
      for (const k of Object.keys(ENEMY_ABILITIES)) { realAbilities[k] = ENEMY_ABILITIES[k]; ENEMY_ABILITIES[k] = (e, pl) => { used.add(k); return realAbilities[k](e, pl); }; }
      startCombat(boss);
      let turns = 0;
      while (G.inCombat && turns < 400) {
        if (G.turn !== 'player') { enemyTurn(); continue; }
        turns++;
        p.stats.hp = p.stats.maxHp;
        playerAction('attack');
      }
      Object.assign(ENEMY_ABILITIES, realAbilities);
      out.push({ id, won: boss.hp <= 0, phases: boss.currentPhase, moves: used.size, errors: G._statusErrors.length });
      G.inCombat = false; G.phase = 'explore';
    }
    return out;
  });
  for (const b of r) {
    assert.equal(b.won, true, JSON.stringify(b));
    assert.ok(b.phases >= 2, JSON.stringify(b));
    assert.ok(b.moves >= 3, JSON.stringify(b));
    assert.equal(b.errors, 0, JSON.stringify(b));
  }
});

test('every signature move resolves cleanly and does what it says', async () => {
  const r = await run(() => {
    const out = {};
    for (const [floor, id] of Object.entries(BOSS_RIVALS)) {
      __startTestRun('ironclad', +floor);
      const p = G.player; addPermanentStat(p, 'maxHp', 100000);
      p.passives = [];
      const boss = getBossForFloor(+floor, id);
      startCombat(boss); G.turn = 'enemy'; p.shield = 0;
      // A fast boss may already have opened with its move: start clean
      removeStatuses(p, () => true); removeStatuses(boss, () => true);
      const sig = boss.patterns[0];
      const before = { php: p.stats.hp, mp: p.stats.mp, atk: p.stats.atk, spd: p.stats.spd, bdef: boss.def, batk: boss.atk, bhp: boss.hp };
      G._statusErrors = [];
      if (sig === 'time_rewind') { boss.hp = Math.round(boss.maxHp / 2); before.bhp = boss.hp; addStatus(boss, { id: 'x', name: 'x', type: 'debuff', icon: '', duration: 5 }); }
      G._actingEnemy = boss; ENEMY_ABILITIES[sig](boss, p); G._actingEnemy = null;
      out[sig] = { hurt: p.stats.hp < before.php, mp: p.stats.mp < before.mp, atk: p.stats.atk < before.atk, spd: p.stats.spd < before.spd,
        def: boss.def > before.bdef, batk: boss.atk > before.batk, healed: boss.hp > before.bhp, cleansed: !boss.status.some(s => s.id === 'x'), errors: G._statusErrors.length };
      G.inCombat = false;
    }
    return out;
  });
  assert.ok(r.brood_swarm.hurt);
  assert.ok(r.dirge.hurt && r.dirge.atk);
  assert.ok(r.glacial_prison.hurt && r.glacial_prison.spd);
  assert.ok(r.mirror_ward.hurt && r.mirror_ward.def);
  assert.ok(r.quake_slam.hurt);
  assert.ok(r.starfall.hurt);
  assert.ok(r.blood_pact.hurt && r.blood_pact.batk);
  assert.ok(r.time_rewind.healed && r.time_rewind.cleansed);
  assert.ok(r.oblivion_gaze.hurt && r.oblivion_gaze.mp);
  assert.ok(Object.values(r).every(m => m.errors === 0));
});

test('enemy moves log the damage you actually take', async () => {
  const r = await run(() => {
    __startTestRun('ironclad', 10);
    const p = G.player; p.passives = [];
    const e = getRandomEnemy(10, false); e.element = 'sound'; // resisted by Steel
    startCombat(e); G.turn = 'enemy'; p.shield = 0;
    const hp0 = p.stats.hp; G.log = [];
    G._actingEnemy = e; ENEMY_ABILITIES.basic(e, p); G._actingEnemy = null;
    const lost = hp0 - p.stats.hp;
    return { lost, logged: G.log.map(l => l.msg).find(m => /attacks for/.test(m)) };
  });
  assert.ok(r.logged.includes(`for ${r.lost}.`), JSON.stringify(r));
});

test('a hit your shield soaks is still logged with its damage', async () => {
  const r = await run(() => {
    __startTestRun('ironclad', 10);
    const p = G.player; p.passives = [];
    const e = getRandomEnemy(10, false); e.element = 'normal';
    startCombat(e); G.turn = 'enemy'; p.shield = 100000;
    const hp0 = p.stats.hp; G.log = [];
    G._actingEnemy = e; ENEMY_ABILITIES.basic(e, p); G._actingEnemy = null;
    return { lostHp: hp0 - p.stats.hp, logged: G.log.map(l => l.msg).find(m => /attacks for/.test(m)) };
  });
  assert.equal(r.lostHp, 0);
  assert.match(r.logged, /attacks for [1-9]\d*\./);
});

test('the "Next:" telegraph estimates the damage a move will do', async () => {
  const r = await run(() => {
    __startTestRun('ironclad', 12);
    const p = G.player; p.passives = [];
    const e = getRandomEnemy(12, false); e.element = 'normal';
    startCombat(e); G.turn = 'enemy';
    const out = {};
    for (const id of ['basic', 'heavy', 'double', 'charge', 'brood_swarm']) {
      const est = estimateEnemyMove(e, id, p);
      let total = 0; const n = 60;
      for (let i = 0; i < n; i++) {
        p.shield = 0; p.stats.hp = p.stats.maxHp = 1e6; removeStatuses(p, () => true);
        const hp0 = p.stats.hp; G._actingEnemy = e; ENEMY_ABILITIES[id](e, p); G._actingEnemy = null;
        total += hp0 - p.stats.hp;
      }
      out[id] = { est, avg: total / n };
    }
    out.channel = estimateEnemyMove(e, 'channel_burst', p);
    e.patterns = ['heavy']; updateUI(); renderCenterPanel();
    out.shown = document.querySelector('.next-est') ? document.querySelector('.next-est').textContent : null;
    return out;
  });
  for (const id of ['basic', 'heavy', 'double', 'charge']) {
    const { est, avg } = r[id];
    assert.ok(Math.abs(est - avg) <= Math.max(3, avg * 0.12), `${id}: estimate ${est} vs average ${avg}`);
  }
  assert.ok(r.brood_swarm.est > 0);
  assert.equal(r.channel, null);
  assert.match(String(r.shown), /^≈\d+ dmg$/);
});

test('a low-HP boss never drains twice in a row', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 30);
    const boss = getBossForFloor(30, 'undying_archon');
    boss.patterns = ['life_drain', 'heavy', 'basic'];
    boss.hp = Math.round(boss.maxHp * 0.1);
    const picks = [];
    for (let i = 0; i < 6; i++) { const id = pickEnemyAbility(boss, G.player); picks.push(id); boss.patternIndex++; boss._lastWasDrain = ABILITY_ROLE[id] === 'drain'; }
    return picks;
  });
  for (let i = 1; i < r.length; i++) assert.ok(!(r[i] === 'life_drain' && r[i - 1] === 'life_drain'), r.join(','));
  assert.ok(r.includes('life_drain'));
});

// Equips a test relic with the given effect for one check
const withGear = (effect, fn) => run(({ effect, fn }) => {
  __startTestRun('shadowblade', 3);
  const p = G.player;
  p.equipment.relic = { id: 'test_relic', name: 'Test', slot: 'relic', type: 'relic', rarity: 'rare', effect, bonuses: {} };
  const e = getRandomEnemy(3, false);
  e.hp = e.maxHp = 10000; e.def = 0; e.element = 'normal'; e.patterns = ['basic'];
  startCombat(e); G.turn = 'player';
  return new Function('p', 'e', fn)(p, e);
}, { effect, fn: fn.toString().replace(/^[^{]*{/, '').replace(/}\s*$/, '') });

test('gear: Thorns hurts the attacker', async () => {
  const back = await withGear('thorns', (p, e) => {
    const hp0 = e.hp; G._actingEnemy = e; dealDmgToPlayer(100); G._actingEnemy = null;
    return hp0 - e.hp;
  });
  assert.ok(back > 0);
});

test('gear: Executioner only boosts hits on wounded enemies', async () => {
  const r = await withGear('executioner', (p, e) => {
    p.combo = 0; const full = dealDmgToEnemy(e, 100, false);
    e.hp = Math.round(e.maxHp * 0.2); p.combo = 0;
    const hp0 = e.hp; dealDmgToEnemy(e, 100, false); const low = hp0 - e.hp;
    return { full: 10000 - (10000 - full), low, ratio: low / full };
  });
  assert.ok(r.ratio > 1.25 && r.ratio < 1.35, JSON.stringify(r));
});

test('gear: First Strike boosts only the first hit of a fight', async () => {
  const r = await withGear('firststrike', (p, e) => {
    const a = e.hp; dealDmgToEnemy(e, 100, false); const first = a - e.hp;
    const b = e.hp; dealDmgToEnemy(e, 100, false); const second = b - e.hp;
    return first / second;
  });
  assert.ok(r > 1.4 && r < 1.6, String(r));
});

test('gear: Mana Siphon restores MP once per action', async () => {
  const gained = await withGear('manasiphon', (p, e) => {
    p.stats.mp = 0; G._directHitsThisAction = 0;
    dealDmgToEnemy(e, 50, false); dealDmgToEnemy(e, 50, false); // a two-hit ability
    return p.stats.mp;
  });
  assert.equal(gained, 4);
});

test('gear: Last Stand cuts damage only at low HP', async () => {
  const r = await withGear('laststand', (p, e) => {
    p.shield = 0; p.stats.hp = p.stats.maxHp = 10000;
    const a = dealDmgToPlayer(400);
    p.shield = 0; p.stats.hp = 2000;
    const b = dealDmgToPlayer(400);
    return b / a;
  });
  assert.ok(r > 0.7 && r < 0.8, String(r));
});

test('gear: Scholar and Midas raise fight rewards', async () => {
  const r = await withGear('scholar_midas', (p, e) => {
    e.xp = 100; e.gold = [100, 100];
    const xp0 = p.xp, lvl0 = p.level, gold0 = p.gold;
    e.hp = 0; checkCombatEnd();
    return { gold: p.gold - gold0, leveled: p.level > lvl0 || p.xp - xp0 >= 125 };
  });
  assert.equal(r.gold, 150);
  assert.equal(r.leveled, true);
});

test('no page errors', () => {
  assert.deepEqual(ctx.errors, []);
});
