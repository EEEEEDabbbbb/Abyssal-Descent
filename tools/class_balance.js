// Class balance report: every base class fights the real enemies of several
// floors many times (random usable ability each turn, like a casual player),
// then prints win rate, HP left and fight length.
//
//   node tools/class_balance.js            # all base classes
//   node tools/class_balance.js pyromancer warlord
//   PRE="CLASSES.warlord.stats.atk += 2" node tools/class_balance.js warlord
//     (PRE runs in the page first: try a change without editing the data)
//
// Needs the dev dependencies (npm install).
const { openGame, prepare } = require('../tests/helpers');

const FLOORS = [3, 8, 14, 20];
const FIGHTS = Number(process.env.FIGHTS) || 30;

(async () => {
  const ctx = await openGame();
  await prepare(ctx.page);
  const only = process.argv.slice(2);
  if (process.env.PRE) await ctx.page.evaluate(process.env.PRE);
  const rows = await ctx.page.evaluate(({ FLOORS, FIGHTS, only }) => {
    window.setTimeout = fn => { fn(); return 0; };
    window.updateUI = () => {}; window.spawnFloat = () => {}; window.showModal = () => {};
    window.renderCombatPanel = () => {}; window.sfx = () => {}; window.screenShake = () => {};
    G._enemyTurnDelay = 0;
    const out = [];
    for (const id of Object.keys(CLASSES)) {
      if (only.length && !only.includes(id)) continue;
      let wins = 0, fights = 0, hpLeft = 0, turns = 0;
      const perFloor = {};
      for (const floor of FLOORS) {
        perFloor[floor] = 0;
        for (let i = 0; i < FIGHTS; i++) {
          __startTestRun(id, floor);
          const p = G.player;
          // Typical level and gear for the floor: level ≈ floor, plus flat gear
          while (p.level < floor) gainXP(xpForLevel(p.level));
          applyPermanentBonuses(p, { atk: floor * 1.5, def: floor, maxHp: floor * 12 });
          p.stats.hp = p.stats.maxHp; p.stats.mp = p.stats.maxMp;
          const e = getRandomEnemy(floor);
          G._gameOverShown = true; // a loss shouldn't run the death screen
          startCombat(e);
          let n = 0;
          while (G.inCombat && p.stats.hp > 0 && n < 60) {
            if (G.turn !== 'player') { enemyTurn(); continue; }
            n++;
            if ((p.burstCharge || 0) >= BURST_THRESHOLD && ABILITIES[p.burstAbility]) { playerAction('burst'); continue; }
            const usable = p.abilities.filter(a => ABILITIES[a] && canUseAbility(p, a).ok);
            if (usable.length && Math.random() < 0.8) playerAction('ability', usable[Math.floor(Math.random() * usable.length)]);
            else playerAction('attack');
          }
          fights++; turns += n;
          if (p.stats.hp > 0 && e.hp <= 0) { wins++; perFloor[floor]++; hpLeft += p.stats.hp / p.stats.maxHp; }
          G.inCombat = false; G.phase = 'explore';
        }
      }
      const c = CLASSES[id].stats;
      out.push({ id, atk: c.atk, def: c.def, hp: c.maxHp, mp: c.maxMp, spd: c.spd, win: Math.round(100 * wins / fights), hpLeft: wins ? Math.round(100 * hpLeft / wins) : 0, turns: +(turns / fights).toFixed(1),
        ...Object.fromEntries(FLOORS.map(f => ['f' + f, Math.round(100 * perFloor[f] / FIGHTS)])) });
    }
    return out;
  }, { FLOORS, FIGHTS, only });
  rows.forEach(r => { r.score = Math.round(r.win * (0.5 + r.hpLeft / 200) / Math.max(1, r.turns / 6)); });
  rows.sort((a, b) => b.score - a.score);
  console.table(rows);
  if (ctx.errors.length) console.log('page errors:', ctx.errors.slice(0, 5));
  await ctx.browser.close();
})();
