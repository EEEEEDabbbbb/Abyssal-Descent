// Combat-logic regressions and passive implementations.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, prepare, loadAllFusions } = require('./helpers');

let ctx;
before(async () => {
  ctx = await openGame();
  await loadAllFusions(ctx.page);
  await prepare(ctx.page);
  await ctx.page.evaluate(() => {
    window.setTimeout = () => 0;
    window.updateUI = () => {};
    window.spawnFloat = () => {};
    window.showModal = () => {};
    // __fight(classId, enemies, {passives}) — fight with sturdy, harmless enemies
    window.__fight = (classId = 'shadowblade', count = 1, opts = {}) => {
      __startTestRun(classId, opts.floor || 3);
      if (opts.passives) G.player.passives = opts.passives;
      const list = Array.from({ length: count }, () => {
        const e = opts.boss ? getBossForFloor(5) : getRandomEnemy(opts.floor || 3, false);
        e.hp = e.maxHp = opts.hp || 50000; e.atk = opts.atk ?? 20; e.def = 0; e.spd = 1; e.patterns = ['basic'];
        e.element = opts.element || 'normal';
        return e;
      });
      addPermanentStat(G.player, 'maxHp', 5000);   // survive test hits
      startCombat(count > 1 ? list : list[0]);
      G.turn = 'player'; G._pendingSecondActor = 'enemy';
      return { p: G.player, enemies: list };
    };
    window.__enemyHits = (e, raw = 100) => { G._actingEnemy = e; try { return dealDmgToPlayer(raw); } finally { G._actingEnemy = null; } };
  });
});
after(async () => { await ctx.browser.close(); });
const run = (fn, arg) => ctx.page.evaluate(fn, arg);

test('Gust: a killing first strike ends the fight', async () => {
  const r = await run(() => {
    const { enemies: [e] } = __fight('shadowblade', 1, { passives: ['gust'], hp: 1 });
    playerAction('attack');
    return { inCombat: G.inCombat, hp: e.hp };
  });
  assert.deepEqual(r, { inCombat: false, hp: 0 });
});

test('Gust: the enemy loses its next action', async () => {
  const r = await run(() => {
    const { p, enemies: [e] } = __fight('shadowblade', 1, { passives: ['gust'], atk: 500 });
    playerAction('attack');
    const hp0 = p.stats.hp;
    G.turn = 'enemy'; enemyTurn();
    return { hpLost: hp0 - p.stats.hp, skipped: !e._skipNextTurn };
  });
  assert.equal(r.hpLost, 0);
});

test('Doom Aura builds stacks and executes (bosses resist)', async () => {
  const r = await run(() => {
    const vanishAttack = () => { addStatus(G.player, { id:'vanished', name:'Vanished', type:'buff', icon:'', duration:2 }); G.player.nextAttackMult = 1; G.turn = 'player'; playerAction('attack'); };
    const { enemies: [e] } = __fight('shadowblade', 1, { passives: ['doom_aura'] });
    vanishAttack(); vanishAttack(); vanishAttack();
    const normalDead = e.hp === 0;
    const { enemies: [b] } = __fight('shadowblade', 1, { passives: ['doom_aura'], boss: true });
    vanishAttack(); vanishAttack(); vanishAttack();
    return { normalDead, bossAlive: b.hp > 0, bossLost: b.hp < b.maxHp };
  });
  assert.deepEqual(r, { normalDead: true, bossAlive: true, bossLost: true });
});

test('free casts are only spent on casts that happen', async () => {
  const r = await run(() => {
    const { p } = __fight('stormcaller', 1, { passives: ['static_charge'] });
    const ab = p.abilities.find(a => ABILITIES[a].cost > 0 && ABILITIES[a].costType !== 'hp');
    p.cooldowns[ab] = 2;
    playerAction('ability', ab);          // on cooldown — must not spend the free cast
    const stillFree = p.nextAbilityFree;
    p.cooldowns[ab] = 0; p.stats.mp = 0;
    G.turn = 'player';
    playerAction('ability', ab);          // free cast with 0 MP works
    return { stillFree, cast: p.cooldowns[ab] > 0 || !ABILITIES[ab].maxCooldown, freeAfter: p.nextAbilityFree };
  });
  assert.deepEqual(r, { stillFree: true, cast: true, freeAfter: false });
});

test('difficulty is applied once (enemy ATK), not again on incoming damage', async () => {
  const dmg = await run(() => {
    const { enemies: [e] } = __fight();
    G.worldGen.difficulty = 'nightmare';
    G.player.passives = []; G.player.equipment = { weapon: null, armor: null, relic: null };
    const taken = __enemyHits(e, 100);
    G.worldGen.difficulty = 'normal';
    return taken;
  });
  assert.equal(dmg, 100);
});

test('enemy elements apply against your class element', async () => {
  const r = await run(() => {
    const { p, enemies: [e] } = __fight('pyromancer', 1, { element: 'water' });
    p.equipment = { weapon: null, armor: null, relic: null };
    const mult = getElementMult('water', getClassData('pyromancer').element);
    return { taken: __enemyHits(e, 100), expected: Math.round(100 * mult) };
  });
  assert.equal(r.taken, r.expected);
});

test('in a pack, reflects hit the attacker and smoke only blinds the smoked enemy', async () => {
  const r = await run(() => {
    const { p, enemies: [a, b] } = __fight('shadowblade', 2);
    p.equipment = { weapon: null, armor: null, relic: null };
    G.targetIndex = 0;
    addStatus(p, { id:'thorns', name:'Thorns', type:'buff', icon:'', duration:5, reflectPct:50 });
    __enemyHits(b, 100);
    const reflectedToB = b.hp < b.maxHp && a.hp === a.maxHp;
    addStatus(a, { id:'smoke_blind', name:'Smoke', type:'debuff', icon:'', duration:5, missChance:100 });
    const hp0 = p.stats.hp;
    __enemyHits(b, 50);
    return { reflectedToB, unsmokedStillHits: p.stats.hp < hp0 };
  });
  assert.deepEqual(r, { reflectedToB: true, unsmokedStillHits: true });
});

test('combat-start passives affect every enemy in a pack', async () => {
  const r = await run(() => {
    const { enemies } = __fight('necromancer', 2, { passives: ['death_aura', 'intimidation'] });
    return enemies.map(e => hasStatus(e, 'plague') && hasStatus(e, 'intimidated'));
  });
  assert.deepEqual(r, [true, true]);
});

test('NG+ makes enemies stronger', async () => {
  const r = await run(() => {
    G.meta.ngPlus = 0; const a = getBossForFloor(10, 'shadow_tyrant');
    G.meta.ngPlus = 2; const b = getBossForFloor(10, 'shadow_tyrant');
    G.meta.ngPlus = 0;
    return { ratio: b.maxHp / a.maxHp };
  });
  assert.ok(Math.abs(r.ratio - 1.6) < 0.02, `ratio ${r.ratio}`);
});

test('a big hit can cross several boss phases at once', async () => {
  const r = await run(() => {
    const { enemies: [b] } = __fight('shadowblade', 1, { boss: true });
    b.hp = 1;
    checkBossPhase(b);
    return { phase: b.currentPhase, total: b.phases.length };
  });
  assert.equal(r.phase, r.total);
});

test('bosses resist executes and can\'t be stun-locked', async () => {
  const r = await run(() => {
    const { p, enemies: [b] } = __fight('shadowblade', 1, { boss: true });
    b.hp = Math.round(b.maxHp * 0.25);
    G._currentAbilityTags = ['execute'];
    dealDmgToEnemy(b, b.hp + 1, false);
    G._currentAbilityTags = null;
    const survivedExecute = b.hp > 0;
    addStatus(b, { id:'stun', name:'Stun', type:'debuff', icon:'', duration:1 });
    G.turn = 'enemy'; enemyTurn();
    G.turn = 'player';
    addStatus(b, { id:'stun', name:'Stun', type:'debuff', icon:'', duration:1 });
    return { survivedExecute, restunned: hasStatus(b, 'stun') };
  });
  assert.deepEqual(r, { survivedExecute: true, restunned: false });
});

test('multi-turn stuns last their full duration on normal enemies', async () => {
  const r = await run(() => {
    const { p, enemies: [e] } = __fight('shadowblade', 1, { atk: 500 });
    addStatus(e, { id:'stun', name:'Stun', type:'debuff', icon:'', duration:2 });
    const hp0 = p.stats.hp;
    G.turn = 'enemy'; enemyTurn(); G.turn = 'enemy'; enemyTurn();
    const afterTwo = p.stats.hp;
    G.turn = 'enemy'; enemyTurn();
    return { stunnedTwoTurns: afterTwo === hp0, actsAfter: p.stats.hp < afterTwo };
  });
  assert.deepEqual(r, { stunnedTwoTurns: true, actsAfter: true });
});

test('packs pay about 1.4× a single enemy, not 2×', async () => {
  const r = await run(() => {
    let single = 0, pack = 0;
    for (let i = 0; i < 400; i++) { single += getRandomEnemy(10, false).xp; pack += getRandomEnemyPack(10).reduce((s, e) => s + e.xp, 0); }
    return pack / single;
  });
  assert.ok(r > 1.2 && r < 1.6, `ratio ${r}`);
});

test('biome hazards never kill', async () => {
  const hp = await run(() => {
    __startTestRun('shadowblade', 45);
    G.player.stats.hp = 2;
    for (let i = 0; i < 20; i++) getBiomeForFloor(45).effect(G.player);
    return G.player.stats.hp;
  });
  assert.ok(hp >= 1);
});

// ── New passives ────────────────────────────────────────────────
test('passive: Frost Armor absorbs the first hit', async () => {
  const r = await run(() => {
    const { p, enemies: [e] } = __fight('shadowblade', 1, { passives: ['frost_armor'] });
    return { first: __enemyHits(e, 100), second: __enemyHits(e, 100), shattered: e.hp < e.maxHp };
  });
  assert.equal(r.first, 0); assert.ok(r.second > 0); assert.equal(r.shattered, true);
});

test('passive: Iron Will and Undying save you once per fight', async () => {
  const r = await run(() => {
    const out = {};
    for (const id of ['iron_will', 'undying']) {
      const { p, enemies: [e] } = __fight('shadowblade', 1, { passives: [id] });
      p.stats.hp = 10;
      __enemyHits(e, 99999);
      const alive = p.stats.hp > 0;
      __enemyHits(e, 99999);
      out[id] = { alive, secondKills: p.stats.hp === 0 };
    }
    return out;
  });
  assert.deepEqual(r.iron_will, { alive: true, secondKills: true });
  assert.deepEqual(r.undying, { alive: true, secondKills: true });
});

test('passive: Time Warp and Shadow Veil always open the fight', async () => {
  const r = await run(() => {
    const out = [];
    for (let i = 0; i < 20; i++) {
      __startTestRun('shadowblade', 3);
      G.player.passives = [i % 2 ? 'time_warp' : 'shadow_veil'];
      G.player.stats.spd = 1;
      const e = getRandomEnemy(3, false); e.spd = 999;
      startCombat(e);
      out.push(G.turn);
    }
    return out.every(t => t === 'player');
  });
  assert.equal(r, true);
});

test('passive: Radiant makes the first attack miss', async () => {
  const r = await run(() => {
    const { enemies: [e] } = __fight('shadowblade', 1, { passives: ['radiant'] });
    return [__enemyHits(e, 100), __enemyHits(e, 100) > 0];
  });
  assert.deepEqual(r, [0, true]);
});

test('passive: Immunity blocks poison', async () => {
  const r = await run(() => {
    const { p, enemies: [e] } = __fight('shadowblade', 1, { passives: ['immunity'] });
    G.turn = 'enemy'; G._actingEnemy = e;
    ENEMY_ABILITIES.poison_spit(e, p);
    G._actingEnemy = null;
    return hasStatus(p, 'poison');
  });
  assert.equal(r, false);
});

test('passive: Magnetic Field / Gravity Well weaken every enemy', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 3);
    G.player.passives = ['magnetic_field', 'gravity_well'];
    const a = getRandomEnemy(3, false), b = getRandomEnemy(3, false);
    a.def = b.def = 100; a.spd = b.spd = 50;
    startCombat([a, b]);
    return [a.def, b.def, a.spd, b.spd];
  });
  assert.deepEqual(r, [90, 90, 40, 40]);
});

test('passive: Overclock shortens the first two cooldowns', async () => {
  const r = await run(() => {
    const { p } = __fight('shadowblade', 1, { passives: ['overclock'] });
    const ab = p.abilities.find(a => ABILITIES[a].maxCooldown >= 2);
    p.stats.mp = 9999;
    playerAction('ability', ab);
    return { cd: p.cooldowns[ab], max: ABILITIES[ab].maxCooldown };
  });
  // cast sets max cooldown, Overclock removes 1, end of turn ticks 1
  assert.equal(r.cd, r.max - 2);
});

test('passive: damage passives raise damage', async () => {
  const r = await run(() => {
    const hit = (passives, setup) => {
      const { enemies: [e] } = __fight('shadowblade', 1, { passives });
      if (setup) setup(e);
      const realRand = window.rand; window.rand = n => 50 % n; // fixed variance
      const d = dealDmgToEnemy(e, 100, false, false, false, 'normal');
      window.rand = realRand;
      return d;
    };
    const base = hit([]);
    return {
      tidal: hit(['tidal_flow']) / base,
      frost: hit(['frost_mastery']) / base,
      gravity: hit(['gravity_mastery'], e => { addStatus(e,{id:'a',name:'a',type:'debuff',icon:'',duration:3}); addStatus(e,{id:'b',name:'b',type:'debuff',icon:'',duration:3}); }) / base,
      divine: hit(['divine_grace'], e => addStatus(e,{id:'a',name:'a',type:'debuff',icon:'',duration:3})) / base,
    };
  });
  assert.ok(Math.abs(r.tidal - 1.4) < 0.05, JSON.stringify(r));
  assert.ok(Math.abs(r.frost - 1.5) < 0.05, JSON.stringify(r));
  assert.ok(Math.abs(r.gravity - 1.16) < 0.05, JSON.stringify(r));
  assert.ok(Math.abs(r.divine - 1.15) < 0.05, JSON.stringify(r));
});

test('passive: Crystal Body strikes back', async () => {
  const r = await run(() => {
    const { enemies: [e] } = __fight('shadowblade', 1, { passives: ['crystal_body'] });
    __enemyHits(e, 50);
    return e.hp < e.maxHp;
  });
  assert.equal(r, true);
});

test('Resonance stacks reset each fight (unless the Resonance passive) and are capped', async () => {
  const r = await run(() => {
    const { p } = __fight('soundbreaker', 1);
    p._resonanceStacks = 40;
    endCombat(true);
    const e = getRandomEnemy(3, false); startCombat(e);
    const reset = p._resonanceStacks;
    p.passives = ['resonance']; p._resonanceStacks = 40; endCombat(true);
    startCombat(getRandomEnemy(3, false));
    return { reset, keptButCapped: p._resonanceStacks };
  });
  assert.deepEqual(r, { reset: 0, keptButCapped: 5 });
});

test('no page errors', () => {
  assert.deepEqual(ctx.errors, []);
});
