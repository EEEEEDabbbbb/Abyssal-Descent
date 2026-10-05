// Fuzz every ability: cast it in a real combat, let every status it applies
// run its course, end the fight, and check nothing crashed, nothing went NaN,
// and no stat change outlived the fight.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, loadAllFusions, prepare } = require('./helpers');

let ctx;
let result;
before(async () => {
  ctx = await openGame();
  await loadAllFusions(ctx.page);
  await prepare(ctx.page);
  result = await ctx.page.evaluate(() => {
    window.setTimeout = () => 0;               // no scheduled enemy turns
    window.showModal = () => {};
    window.updateUI = () => {};                // rendering isn't under test; keeps this fast
    window.spawnFloat = () => {};
    const KEYS = ['atk', 'def', 'spd', 'crit', 'critDmg', 'maxHp', 'maxMp'];
    const out = { throws: [], nan: [], drift: [], count: 0 };
    // Each ability is cast a few times so its random branches (procs, crits) get exercised
    const runs = Object.entries(ABILITIES).flatMap(([id, ab]) => [[id, ab], [id, ab], [id, ab]]);
    const seen = new Set();
    for (const [id, ab] of runs) {
      if (!seen.has(id)) { seen.add(id); out.count++; }
      __startTestRun('shadowblade', 25);
      const p = G.player;
      p.passives = [];
      const base = Object.fromEntries(KEYS.map(k => [k, p.stats[k] || 0]));
      const e = getBossForFloor(25);
      e.hp = Math.round(e.maxHp * 0.25);
      e.maxHp = Math.max(e.maxHp, 1);
      startCombat(e);
      G.turn = 'player';
      G._statusErrors = [];
      try {
        ab.use(p, e);
        for (let i = 0; i < 12; i++) {
          tickStatus(p);
          tickStatus(e);
          p.stats.hp = Math.max(p.stats.hp, 1);
          e.hp = Math.max(e.hp, 1);
        }
      } catch (err) {
        out.throws.push(`${id}: ${err.message}`);
        G.inCombat = false;
        continue;
      }
      if (G._statusErrors.length) out.throws.push(`${id}: ${G._statusErrors.join('; ')}`);
      const nums = [...KEYS.map(k => p.stats[k]), p.stats.hp, p.stats.mp, e.hp, e.atk, e.def, e.spd];
      if (nums.some(v => typeof v === 'number' && Number.isNaN(v))) out.nan.push(id);
      endCombat(true);
      const changed = KEYS.filter(k => Math.abs((p.stats[k] || 0) - base[k]) > 1e-9);
      if (changed.length) out.drift.push(`${id}: ${changed.join(',')}`);
    }
    for (const k of ['throws', 'nan', 'drift']) out[k] = [...new Set(out[k])];
    return out;
  });
});
after(async () => { await ctx.browser.close(); });

test('fuzzed every ability', () => {
  assert.ok(result.count > 6000, `only ${result.count} abilities fuzzed`);
});

test('no ability throws when cast or while its statuses tick', () => {
  assert.deepEqual(result.throws, []);
});

test('no ability produces NaN stats', () => {
  assert.deepEqual(result.nan, []);
});

test('no ability changes player stats beyond the fight', () => {
  assert.deepEqual(result.drift, []);
});

test('no page errors during fuzzing', () => {
  assert.deepEqual(ctx.errors, []);
});
