// Difficulty curve guards: enemy strength grows smoothly with depth (no
// cliffs at tier changes), bosses get steadily tougher, and the basic damage
// rules hold. Use tools/honest_run.js to judge the curve itself.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame } = require('./helpers');

let ctx;
const run = (fn, arg) => ctx.page.evaluate(fn, arg);
before(async () => { ctx = await openGame(); });
after(async () => { await ctx.browser.close(); });

test('regular enemies never get much stronger from one floor to the next', async () => {
  const jumps = await run(() => {
    G.meta = defaultMeta(); G.worldGen.difficulty = 'normal';
    const avg = f => {
      let hp = 0, atk = 0; const n = 600;
      for (let i = 0; i < n; i++) { const e = getRandomEnemy(f, false); hp += e.hp; atk += e.atk; }
      return { hp: hp / n, atk: atk / n };
    };
    const out = [];
    let prev = avg(1);
    for (let f = 2; f <= 50; f++) {
      const cur = avg(f);
      const milestone = MILESTONE_FLOORS.includes(f) || MILESTONE_FLOORS.includes(f - 1);
      const limit = milestone ? 1.45 : 1.3;
      if (cur.hp / prev.hp > limit || cur.atk / prev.atk > limit) out.push(`${f - 1}→${f}: HP ×${(cur.hp / prev.hp).toFixed(2)}, ATK ×${(cur.atk / prev.atk).toFixed(2)}`);
      prev = cur;
    }
    return out;
  });
  assert.deepEqual(jumps, []);
});

test('each floor boss is tougher than the one before', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G.worldGen.difficulty = 'normal';
    return BOSS_FLOORS.map(f => { const b = getBossForFloor(f, BOSS_BY_FLOOR[f]); return [f, b.hp, b.atk]; });
  });
  for (let i = 1; i < r.length; i++) {
    assert.ok(r[i][1] > r[i - 1][1], `boss HP ${JSON.stringify(r[i - 1])} → ${JSON.stringify(r[i])}`);
    assert.ok(r[i][2] > r[i - 1][2], `boss ATK ${JSON.stringify(r[i - 1])} → ${JSON.stringify(r[i])}`);
  }
});

test('a rival boss is about as tough as the usual boss of its floor', async () => {
  const r = await run(() => Object.entries(BOSS_RIVALS).map(([f, id]) => {
    const a = getBossForFloor(+f, BOSS_BY_FLOOR[f]), b = getBossForFloor(+f, id);
    return [id, b.hp / a.hp, b.atk / a.atk];
  }));
  r.forEach(([id, hp, atk]) => assert.ok(hp > 0.75 && hp < 1.3 && atk > 0.75 && atk < 1.3, `${id}: HP ×${hp.toFixed(2)} ATK ×${atk.toFixed(2)}`));
});

test('secret bosses scale with the floor they appear on', async () => {
  const r = await run(() => {
    G.meta = defaultMeta();
    const id = Object.keys(SECRET_BOSSES)[0];
    const at = f => { G.floor = f; const m = generateSecretBossFloor(f, id); const c = G._secretBossCell; return m[c.y][c.x].enemy.hp; };
    return [at(6), at(14)];
  });
  assert.ok(r[1] > r[0] * 1.5, JSON.stringify(r));
});

test('difficulty and NG+ multiply enemy stats exactly once', async () => {
  const r = await run(() => {
    G.meta = defaultMeta();
    const hp = (diff, ng) => { G.worldGen.difficulty = diff; G.meta.ngPlus = ng; seedRun('DIFF'); return getBossForFloor(10, 'shadow_tyrant').hp; };
    const out = { normal: hp('normal', 0), nightmare: hp('nightmare', 0), ng1: hp('normal', 1) };
    G.worldGen.difficulty = 'normal'; G.meta.ngPlus = 0;
    return { night: out.nightmare / out.normal, ng: out.ng1 / out.normal, mult: getDifficultyMult.call ? (() => { G.worldGen.difficulty = 'nightmare'; const m = getDifficultyMult(); G.worldGen.difficulty = 'normal'; return m; })() : 0 };
  });
  assert.ok(Math.abs(r.night - r.mult) < 0.02, JSON.stringify(r));
  assert.ok(Math.abs(r.ng - 1.3) < 0.02, JSON.stringify(r));
});

test('armour blocks at most 85% of a hit', async () => {
  const r = await run(() => { let min = Infinity; for (let i = 0; i < 200; i++) min = Math.min(min, calcDmg(100, 1000)); return min; });
  assert.ok(r >= 12 && r <= 18, String(r));
});

test('a level-up restores a quarter of max HP and MP', async () => {
  const r = await run(() => {
    G.meta = defaultMeta();
    G.player = createPlayer('shadowblade');
    const p = G.player; p.stats.hp = 1; p.stats.mp = 0;
    gainXP(xpForLevel(p.level));
    return { hp: p.stats.hp / p.stats.maxHp, mp: p.stats.mp / p.stats.maxMp };
  });
  assert.ok(r.hp >= 0.25 && r.hp < 0.45, JSON.stringify(r));
  assert.ok(r.mp >= 0.25 && r.mp < 0.45, JSON.stringify(r));
});

test('no page errors', () => { assert.deepEqual(ctx.errors, []); });
