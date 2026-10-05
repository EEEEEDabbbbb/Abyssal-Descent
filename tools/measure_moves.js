// Measures how hard each enemy move really hits — its direct damage plus any
// damage over time it leaves on you for the next three turns — relative to a
// basic attack, and prints the MOVE_POWER table used by enemies.js to
// normalise enemy ATK (see movePower / scaleEnemyToFloor there).
//
//   node tools/measure_moves.js        # paste the output over MOVE_POWER
//
// Re-run it after adding or changing an enemy move. Needs the dev
// dependencies (npm install).
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
      out[id] = Math.round(dmg / basic * 100) / 100;
    }
    return out;
  }, SAMPLES);
  const lines = Object.entries(table).map(([id, v]) => `  ${id}: ${v},`);
  console.log('const MOVE_POWER = {\n' + lines.join('\n') + '\n};');
  await ctx.browser.close();
})();
