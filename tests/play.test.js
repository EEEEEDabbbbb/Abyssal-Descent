// End-to-end: a bot plays the real game through the UI — menus, class
// select, world-gen dialog, keyboard movement, combat hotkeys, events, shops,
// chests and boss rewards — across several floors including a boss floor.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame } = require('./helpers');

let ctx;
before(async () => { ctx = await openGame(); });
after(async () => { await ctx.browser.close(); });

async function playFloors(classId, targetFloor, maxSteps = 6000) {
  const { page } = ctx;
  await page.evaluate(() => { localStorage.clear(); });
  await page.reload();
  await page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await page.evaluate(() => ensureAbilitiesLoaded());
  await page.evaluate(async (cid) => {
    await ensureClassLoaded(cid);
    if (!G.meta.unlockedClasses.includes(cid)) G.meta.unlockedClasses.push(cid);
    applySetting('animSpeed', 'instant');
  }, classId);
  // Menus, exactly as a player would click them
  await page.click('text=Begin Descent');
  await page.click(`.class-card:has(.class-name:text-is("${await page.evaluate(c => getClassData(c).name, classId)}"))`);
  await page.click('#start-run-btn');
  await page.click('#overlay-content button:has-text("Descend")');
  await page.waitForFunction(() => G.player && G.map);

  return page.evaluate(async ({ targetFloor, maxSteps }) => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const key = k => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
    // Keep the bot alive so the test exercises flow, not balance
    const p = G.player;
    addPermanentStat(p, 'maxHp', 5000); addPermanentStat(p, 'atk', 400); addPermanentStat(p, 'def', 60);
    const stats = { fights: 0, events: 0, shops: 0, rewards: 0, steps: 0 };
    let lastFloor = G.floor, stuck = 0;

    function nextStep() {
      // BFS over walkable tiles to the best target: open exit > guardian/boss > unexplored edge
      const { x: sx, y: sy } = G.playerPos;
      const exitOpen = G.exitPos && G.map[G.exitPos.y][G.exitPos.x].content === 'exit';
      const prev = new Map([[sx + ',' + sy, null]]);
      const q = [[sx, sy]];
      let goal = null, fallback = null;
      while (q.length) {
        const [x, y] = q.shift();
        const c = G.map[y][x];
        if (!(x === sx && y === sy)) {
          if (exitOpen && c.content === 'exit') { goal = [x, y]; break; }
          if (!exitOpen && (c.content === 'boss' || c.content === 'enemy' && c.enemy && c.enemy.isSecretBoss)) { goal = [x, y]; break; }
          if (!fallback && !c.visited && c.content !== 'exit_locked' && c.content !== 'boss_exit') fallback = [x, y];
        }
        for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
          const nx = x + dx, ny = y + dy, k = nx + ',' + ny;
          if (nx < 0 || ny < 0 || nx >= G.mapW || ny >= G.mapH || prev.has(k)) continue;
          const n = G.map[ny][nx];
          if (n.type === 'wall' || n.content === 'exit_locked' || n.content === 'boss_exit' || n.content === 'shop') continue;
          prev.set(k, [x, y]); q.push([nx, ny]);
        }
      }
      const target = goal || fallback;
      if (!target) return null;
      let cur = target;
      while (prev.get(cur[0] + ',' + cur[1]) && (prev.get(cur[0] + ',' + cur[1])[0] !== sx || prev.get(cur[0] + ',' + cur[1])[1] !== sy)) cur = prev.get(cur[0] + ',' + cur[1]);
      return { dx: cur[0] - sx, dy: cur[1] - sy };
    }

    function handleModal() {
      const content = document.getElementById('overlay-content');
      const buttons = [...content.querySelectorAll('button, .reward-item')];
      const text = content.innerText;
      const pick = re => buttons.find(b => re.test(b.innerText));
      let b;
      if (/Boss Reward/.test(text)) { stats.rewards++; b = content.querySelector('.reward-item'); }
      else if (/Merchant/.test(text)) { stats.shops++; b = pick(/Leave/); }
      else if ((b = pick(/Take it|Continue|No — Keep|^OK$|Resume|Return to the Surface/))) {}
      else if (content.querySelector('.modal-close-btn') && !/choice|Offer|Drink|Buy|Pray/.test(text)) b = content.querySelector('.modal-close-btn');
      else { stats.events++; b = buttons[buttons.length - 1]; } // event: take the safe last choice
      (b || buttons[0]).click();
    }

    while (G.floor < targetFloor && stats.steps < maxSteps) {
      stats.steps++;
      if (document.getElementById('game-over-screen').classList.contains('active')) {
        return { ...stats, floor: G.floor, died: true, lastLog: G.log.slice(0, 14).map(l => l.msg) };
      }
      if (document.getElementById('overlay').classList.contains('active')) { handleModal(); await sleep(0); continue; }
      if (G.inCombat) {
        if (G.turn === 'player') { stats.fights += G.combatRound === 0 ? 1 : 0; key('q'); }
        await sleep(5);
        continue;
      }
      const step = nextStep();
      if (!step) return { ...stats, floor: G.floor, stuck: 'no path' };
      const k = step.dx === 1 ? 'ArrowRight' : step.dx === -1 ? 'ArrowLeft' : step.dy === 1 ? 'ArrowDown' : 'ArrowUp';
      key(k);
      if (G.floor === lastFloor) { if (++stuck > 3000) return { ...stats, floor: G.floor, stuck: 'too long on floor' }; }
      else { lastFloor = G.floor; stuck = 0; p.stats.hp = p.stats.maxHp; } // the bot never heals itself
      await sleep(0);
    }
    return { ...stats, floor: G.floor, logErrors: (G._statusErrors || []).length };
  }, { targetFloor, maxSteps });
}

// PLAY_FLOORS=21 npm test  — play deeper (more bosses, biomes, milestones)
const DEPTH = Number(process.env.PLAY_FLOORS) || 7;

test(`a bot can play from floor 1 to floor ${DEPTH} (incl. the floor-5 boss)`, async () => {
  const r = await playFloors('shadowblade', DEPTH, 600 * DEPTH);
  assert.equal(r.died, undefined, JSON.stringify(r));
  assert.equal(r.stuck, undefined, JSON.stringify(r));
  assert.ok(r.floor >= 7, JSON.stringify(r));
  assert.ok(r.rewards >= 1, 'boss reward on floor 5');
  assert.equal(r.logErrors, 0);
});

test('the same works for a fusion class', async () => {
  const target = Math.max(4, Math.min(DEPTH, 12));
  const r = await playFloors('darkguard', target, 600 * target);
  assert.equal(r.died, undefined, JSON.stringify(r));
  assert.ok(r.floor >= target, JSON.stringify(r));
});

test('no page errors while playing', () => {
  assert.deepEqual(ctx.errors, []);
});
