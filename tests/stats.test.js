// Stat & status system regressions: temporary effects stay temporary,
// permanent ones stay permanent, and statuses last as long as they say.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, prepare } = require('./helpers');

let ctx;
before(async () => {
  ctx = await openGame();
  await prepare(ctx.page);
  await ctx.page.evaluate(() => {
    window.setTimeout = () => 0;
    window.updateUI = () => {};
    window.spawnFloat = () => {};
    window.showModal = () => {};
    // fight(): fresh run + a sturdy floor-1 enemy, player's turn
    window.__fight = (classId = 'shadowblade') => {
      __startTestRun(classId, 1);
      const e = getRandomEnemy(1);
      e.hp = e.maxHp = 99999; e.atk = 1; e.patterns = ['basic'];
      startCombat(e);
      G.turn = 'player'; G._pendingSecondActor = 'enemy';
      G.player.passives = [];
      return { p: G.player, e };
    };
  });
});
after(async () => { await ctx.browser.close(); });

const run = fn => ctx.page.evaluate(fn);

test('a 3-turn status ticks exactly 3 times', async () => {
  const ticks = await run(() => {
    const { p } = __fight();
    G.turn = 'enemy'; // applied by the enemy, so it is not "fresh" for the player
    let n = 0;
    addStatus(p, { id: 't', name: 't', type: 'debuff', icon: '', duration: 3, onTurn: () => n++ });
    for (let i = 0; i < 6; i++) tickStatus(p);
    return n;
  });
  assert.equal(ticks, 3);
});

test('Vanish survives to the next attack and doubles it', async () => {
  const r = await run(() => {
    const { p } = __fight();
    playerAction('ability', 'vanish');
    const stillVanished = hasStatus(p, 'vanished');
    return { stillVanished, mult: p.nextAttackMult };
  });
  assert.equal(r.stillVanished, true);
  assert.equal(r.mult, 2);
});

test('"+30% ATK for 4 turns" applies once and expires cleanly', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    const atk0 = p.stats.atk;
    ABILITIES.normal_dark_shadow.use(p, e);
    const atkNow = p.stats.atk;
    for (let i = 0; i < 3; i++) tickStatus(p);
    const atkMid = p.stats.atk;
    for (let i = 0; i < 4; i++) tickStatus(p);
    return { atk0, atkNow, atkMid, atkEnd: p.stats.atk };
  });
  assert.equal(r.atkNow, Math.round(r.atk0 * 1.3));
  assert.equal(r.atkMid, r.atkNow, 'buff must not compound each turn');
  assert.equal(r.atkEnd, r.atk0);
});

test('onApply buffs work and do not cost stats when they expire', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    const atk0 = p.stats.atk;
    ABILITIES.normal_magnet_charge.use(p, e);
    const atkNow = p.stats.atk;
    for (let i = 0; i < 8; i++) tickStatus(p);
    return { atk0, atkNow, atkEnd: p.stats.atk };
  });
  assert.ok(r.atkNow > r.atk0);
  assert.equal(r.atkEnd, r.atk0);
});

test('enemy debuffs on the player wear off in-fight and never outlast the fight', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    const s0 = { ...p.stats };
    G.turn = 'enemy';
    ['frost_bite', 'blizzard', 'acid_spray', 'rust', 'soul_rend', 'spore_cloud', 'entangle', 'undertow', 'lightning_chain', 'wail', 'curse']
      .forEach(id => ENEMY_ABILITIES[id](e, p));
    for (let i = 0; i < 6; i++) tickStatus(p);
    const afterExpiry = { atk: p.stats.atk, def: p.stats.def, spd: p.stats.spd };
    endCombat(true);
    return { s0, afterExpiry, afterFight: { atk: p.stats.atk, def: p.stats.def, spd: p.stats.spd } };
  });
  for (const k of ['atk', 'def', 'spd']) {
    assert.equal(r.afterFight[k], r.s0[k], `${k} changed after the fight`);
    assert.ok(Math.abs(r.afterExpiry[k] - r.s0[k]) <= 2, `${k} not restored on expiry: ${r.afterExpiry[k]} vs ${r.s0[k]}`);
  }
});

test('stacking a consumable buff cannot create permanent stats', async () => {
  const r = await run(() => {
    const { p } = __fight();
    const atk0 = p.stats.atk;
    const draught = ITEM_POOL.find(i => i.id === 'strength_draught');
    draught.use(p); draught.use(p); draught.use(p);
    for (let i = 0; i < 6; i++) tickStatus(p);
    const inFight = p.stats.atk;
    endCombat(true);
    return { atk0, inFight, after: p.stats.atk };
  });
  assert.equal(r.inFight, r.atk0);
  assert.equal(r.after, r.atk0);
});

test('Death Knell steals DEF for the fight only', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    const def0 = p.stats.def;
    ABILITIES.death_knell.use(p, e);
    const during = p.stats.def;
    endCombat(true);
    return { def0, during, after: p.stats.def };
  });
  assert.ok(r.during >= r.def0);
  assert.equal(r.after, r.def0);
});

test('level-ups, talents, equipment and events are permanent', async () => {
  const r = await run(() => {
    const { p } = __fight();
    const atk0 = p.stats.atk;
    gainXP(xpForLevel(1));                      // level 2
    const afterLevel = p.base.atk;
    p.talentPoints = 5; buyTalent('shadow_arts'); // +2 ATK
    const sword = cloneItem(ITEM_POOL.find(i => i.type === 'weapon' && i.bonuses && i.bonuses.atk));
    p.inventory.push(sword); equipItem(sword, p.inventory.length - 1);
    addPermanentStat(p, 'atk', 3);              // what event rewards use
    endCombat(true);
    return { atk0, afterLevel, final: p.stats.atk, base: p.base.atk, swordAtk: sword.bonuses.atk };
  });
  assert.ok(r.afterLevel > r.atk0, 'level-up raised base ATK');
  assert.equal(r.final, r.base);
  assert.ok(r.final >= r.afterLevel + 2 + r.swordAtk + 3);
});

test('talents do not leak into the next run', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 1);
    G.player.talentPoints = 10; buyTalent('shadow_arts'); buyTalent('shadow_arts');
    const p2 = (G.player = null, createPlayer('shadowblade'));
    G.player = null;
    const p3 = createPlayer('shadowblade');
    return { a: p2.stats.atk, b: p3.stats.atk };
  });
  assert.equal(r.a, r.b);
});

test('cleansing a debuff gives the stats back', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    const def0 = p.stats.def;
    G.turn = 'enemy';
    ENEMY_ABILITIES.rust(e, p);
    const rusted = p.stats.def;
    G.turn = 'player';
    ITEM_POOL.find(i => i.id === 'full_antidote').use(p);
    return { def0, rusted, after: p.stats.def };
  });
  assert.ok(r.rusted < r.def0);
  assert.equal(r.after, r.def0);
});

test('fleeing does not keep buffs', async () => {
  const r = await run(() => {
    const { p } = __fight();
    const atk0 = p.stats.atk;
    ITEM_POOL.find(i => i.id === 'warlord_tonic').use(p);
    endCombat(false);
    return { atk0, after: p.stats.atk };
  });
  assert.equal(r.after, r.atk0);
});

test('re-casting a debuff refreshes it instead of stacking it', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    e.def = 400;
    const ab = Object.values(ABILITIES).find(a => /const _defPen=Math.round\(e.def\*0.25\)/.test(String(a.use)) && !/stacks|rand\(/.test(String(a.use).replace('rand(100)<p.stats.crit', '')));
    ab.use(p, e); const once = e.def;
    ab.use(p, e); ab.use(p, e); const thrice = e.def;
    removeStatuses(e, s => s.id === 'def_down');
    return { once, thrice, after: e.def, id: ab.id };
  });
  assert.equal(r.once, 300, JSON.stringify(r));
  assert.equal(r.thrice, 300, JSON.stringify(r));
  assert.equal(r.after, 400, JSON.stringify(r));
});

test('stacking effects still stack, and come off cleanly', async () => {
  const r = await run(() => {
    const { p } = __fight();
    const atk0 = p.stats.atk;
    for (let i = 0; i < 3; i++) { p.stats.atk += 5; addStatus(p, { id:'frenzy', name:'Frenzy', type:'buff', icon:'', duration:3, stacks:1, atkBonus:5 }); }
    const stacked = p.stats.atk - atk0;
    removeStatuses(p, s => s.id === 'frenzy');
    return { stacked, after: p.stats.atk - atk0 };
  });
  assert.deepEqual(r, { stacked: 15, after: 0 });
});

test('a stacking effect stops growing at 10 stacks', async () => {
  const r = await run(() => {
    const { p } = __fight();
    const atk0 = p.stats.atk;
    for (let i = 0; i < 15; i++) { p.stats.atk += 5; addStatus(p, { id:'frenzy', name:'Frenzy', type:'buff', icon:'', duration:3, stacks:1, atkBonus:5 }); }
    return p.stats.atk - atk0;
  });
  assert.equal(r, 50);
});

test('Spectral Haunt grants dodge the engine actually reads', async () => {
  const r = await run(() => {
    const { p, e } = __fight();
    const crit0 = p.stats.crit;
    ABILITIES.fire_ghost_haunt.use(p, e);
    const s = p.status.find(x => x.id === 'haunt');
    return { crit: p.stats.crit - crit0, dodge: s && s.dodgeBonus, stray: 'dodgeChance' in p };
  });
  assert.deepEqual(r, { crit: 30, dodge: 25, stray: false });
});

test('no page errors', () => {
  assert.deepEqual(ctx.errors, []);
});
