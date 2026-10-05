// Diagnostic: measures how hard each enemy move really hits — its direct
// damage plus any damage over time it leaves on you for the next three turns
// — relative to a basic attack, next to the power enemies.js credits it with
// when it normalises enemy ATK (movePower, read from the move's formula).
// Moves far above 1.0 in the last column hit harder than their enemy's stats
// account for (bleed and poison stacks are the usual reason).
//
//   node tools/measure_moves.js
//
// (Feeding these numbers straight into movePower was tried: it moved ATK from
// DoT enemies onto everyone else and made floors 1–5 deadlier, so it isn't
// used.) Needs the dev dependencies (npm install).
const { openGame, prepare } = require('../tests/helpers');

const SAMPLES = Number(process.env.SAMPLES) || 60;

(async () => {
  const ctx = await openGame();
  await prepare(ctx.page);
  const table = await ctx.page.evaluate(SAMPLES => {
    window.setTimeout = () => 0; window.spawnFloat = () => {}; window.sfx = () => {};
    window.screenShake = () => {}; window.updateUI = () => {};
    __startTestRun('runeblade', 10, 'MOVES');
    const p = G.player; p.passives = [];
    // One use of the move by an ATK-100 enemy against DEF 30, plus three turns
    // of whatever it leaves behind. `setup` puts the enemy in the state the
    // move expects (a charge already under way…).
    const measure = (id, setup) => {
      let total = 0;
      for (let i = 0; i < SAMPLES; i++) {
        const e = getRandomEnemy(10, false);
        Object.assign(e, { atk: 100, element: 'normal', hp: 1e6, maxHp: 1e6, _channeling: null });
        startCombat(e); G.turn = 'enemy';
        Object.assign(p.stats, { maxHp: 1e7, hp: 1e7, def: 30 }); p.shield = 0; removeStatuses(p, () => true);
        if (setup) setup(e);
        const hp0 = p.stats.hp;
        G._actingEnemy = e; ENEMY_ABILITIES[id](e, p); G._actingEnemy = null;
        for (let t = 0; t < 3; t++) tickStatus(p);
        total += hp0 - p.stats.hp;
        endCombat(false); G.phase = 'explore';
      }
      return total / SAMPLES;
    };
    const basic = measure('basic');
    const ids = new Set(); Object.values(ENEMY_POOL).forEach(e => (e.patterns || []).forEach(m => ids.add(m)));
    const out = {};
    for (const id of [...ids].sort()) {
      if (!ENEMY_ABILITIES[id]) continue;
      // A channelled attack spends one turn charging and one releasing
      const dmg = id === 'channel_burst'
        ? (measure(id) + measure(id, e => { e._channeling = 'channel_burst'; })) / 2
        : measure(id);
      const measured = Math.round(dmg / basic * 100) / 100;
      const terms = _enemyMoveTerms(id);
      const credited = terms ? Math.round(terms.reduce((a, [x]) => a + x, 0) * 100) / 100 : 1.2;
      out[id] = { measured, credited, ratio: Math.round(measured / credited * 100) / 100 };
    }
    return out;
  }, SAMPLES);
  console.table(Object.entries(table).sort((a, b) => b[1].ratio - a[1].ratio).map(([id, v]) => ({ move: id, ...v })));
  await ctx.browser.close();
})();
