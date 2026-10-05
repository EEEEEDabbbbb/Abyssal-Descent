// Run stats, run history, achievements and the minimap.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, prepare } = require('./helpers');

let ctx;
const run = (fn, arg) => ctx.page.evaluate(fn, arg);

before(async () => {
  ctx = await openGame();
  await run(() => localStorage.clear());
  await ctx.page.reload();
  await ctx.page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await run(() => ensureAbilitiesLoaded());
  await prepare(ctx.page);
  await run(() => { G._enemyTurnDelay = 0; });
});
after(async () => { await ctx.browser.close(); });

test('winning a fight counts kills, damage and pays First Blood once', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G.meta.soulShards = 0;
    __startTestRun('shadowblade', 2);
    const e = getRandomEnemy(2); e.hp = e.maxHp = 30; e.def = 0;
    startCombat(e); G.turn = 'player';
    dealDmgToEnemy(e, 500, false); checkCombatEnd();
    const s = G.player.runStats;
    const shards1 = G.meta.soulShards;
    const e2 = getRandomEnemy(2); e2.hp = e2.maxHp = 30; e2.def = 0;
    startCombat(e2); G.turn = 'player'; dealDmgToEnemy(e2, 500, false); checkCombatEnd();
    return { kills: s.kills, dealt: s.dmgDealt, best: s.bestHit, got: hasAchievement('first_blood'), shards1, shards2: G.meta.soulShards };
  });
  assert.equal(r.kills, 2);
  assert.equal(r.dealt, 60);              // only the HP actually removed
  assert.ok(r.best >= 30);
  assert.equal(r.got, true);
  assert.equal(r.shards1, 5);
  assert.equal(r.shards2, 5);             // not paid twice
});

test('dying records the run in the history with its stats and total shards', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G._gameOverShown = false;
    __startTestRun('shadowblade', 4, 'HIST01');
    G.player.runStats = { ...newRunStats(), kills: 7, shards: 12 };
    G.player._lastHitBy = 'Bone Hound';
    gameOver();
    const h = G.meta.runHistory[0];
    return { h, life: G.meta.lifetime, shown: document.getElementById('game-over-shards').textContent,
             summary: document.getElementById('game-over-run-stats').textContent };
  });
  assert.equal(r.h.outcome, 'died');
  assert.equal(r.h.killedBy, 'Bone Hound');
  assert.equal(r.h.floor, 4);
  assert.equal(r.h.kills, 7);
  assert.equal(r.h.seed, 'HIST01');
  assert.equal(r.h.shards, 12 + Math.round(4 * 1.5));   // earlier shards + the death payout
  assert.equal(String(r.h.shards), r.shown);
  assert.equal(r.life.runs, 1);
  assert.equal(r.life.deaths, 1);
  assert.match(r.summary, /Slain by Bone Hound/);
});

test('abandoning records the run once', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G._gameOverShown = false;
    __startTestRun('shadowblade', 3);
    abandonRun();
    return { n: G.meta.runHistory.length, outcome: G.meta.runHistory[0].outcome };
  });
  assert.deepEqual(r, { n: 1, outcome: 'abandoned' });
});

test('the history keeps the latest 20 runs', async () => {
  const n = await run(() => {
    G.meta = defaultMeta();
    for (let i = 0; i < 25; i++) { G._gameOverShown = false; __startTestRun('shadowblade', 1); recordRunEnd('died'); }
    return G.meta.runHistory.length;
  });
  assert.equal(n, 20);
});

test('depth and collection achievements follow the meta state', async () => {
  const r = await run(() => {
    G.meta = defaultMeta();
    __startTestRun('shadowblade', 1);
    G.meta.maxFloor = 21;
    G.meta.unlockedClasses = Object.keys(CLASSES).slice(0, 10);
    checkAchievements();
    return ['depth_10', 'depth_20', 'depth_30', 'collector'].map(hasAchievement);
  });
  assert.deepEqual(r, [true, true, false, true]);
});

test('every achievement has a name, description, icon and reward', async () => {
  const bad = await run(() => ACHIEVEMENTS.filter(a => !a.name || !a.desc || !a.icon || !(a.shards > 0)).map(a => a.id));
  assert.deepEqual(bad, []);
});

test('run stats survive save and load', async () => {
  const r = await run(async () => {
    G.meta = defaultMeta(); G._gameOverShown = false;
    __startTestRun('shadowblade', 2);
    G.player.runStats = { ...newRunStats(), kills: 9, steps: 140 };
    assignRunSlot(); saveRun();
    G.player.runStats.kills = 0;
    await loadRun(G._runSaveSlot);
    const out = { kills: G.player.runStats.kills, steps: G.player.runStats.steps };
    clearActiveRunSave();
    return out;
  });
  assert.deepEqual(r, { kills: 9, steps: 140 });
});

test('the minimap shows revealed tiles and walks where you click', async () => {
  const r = await run(() => {
    applySetting('minimap', true);
    __startTestRun('shadowblade', 1);
    G._gameOverShown = false;
    showScreen('game-screen'); G.phase = 'explore';
    updateUI();
    const c = document.getElementById('minimap');
    if (!c) return { canvas: false };
    // A revealed floor tile next to the player
    const { x, y } = G.playerPos;
    const target = [[1,0],[-1,0],[0,1],[0,-1]].map(([dx, dy]) => [x + dx, y + dy])
      .find(([tx, ty]) => G.map[ty] && G.map[ty][tx] && G.map[ty][tx].type !== 'wall' && G.map[ty][tx].revealed);
    const rect = c.getBoundingClientRect();
    let walked = null;
    const realWalk = window.walkTo; window.walkTo = (tx, ty) => { walked = [tx, ty]; };
    c.dispatchEvent(new MouseEvent('click', { bubbles: true,
      clientX: rect.left + (target[0] + 0.5) * rect.width / G.mapW,
      clientY: rect.top + (target[1] + 0.5) * rect.height / G.mapH }));
    window.walkTo = realWalk;
    const before = !!document.getElementById('minimap');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'm', bubbles: true }));
    const hidden = !document.getElementById('minimap');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'm', bubbles: true }));
    return { canvas: true, w: c.width, walked, target, before, hidden, back: !!document.getElementById('minimap') };
  });
  assert.equal(r.canvas, true);
  assert.ok(r.w > 0);
  assert.deepEqual(r.walked, r.target);
  assert.deepEqual([r.before, r.hidden, r.back], [true, true, true]);
});

test('the Records screen renders every tab', async () => {
  const r = await run(() => {
    G._gameOverShown = false; __startTestRun('shadowblade', 2); recordRunEnd('abandoned');
    showRecords('overview');    const a = document.getElementById('overlay-content').textContent;
    showRecords('achievements'); const b = document.querySelectorAll('#overlay-content .ach').length;
    showRecords('history');      const c = document.querySelectorAll('#overlay-content .run-row').length;
    closeModal();
    return { overview: /Deepest floor/.test(a), achievements: b, history: c, a: a.slice(0, 200) };
  });
  assert.equal(r.overview, true, r.a);
  assert.equal(r.achievements, await run(() => ACHIEVEMENTS.length));
  assert.ok(r.history >= 1);
});

test('dying on floor 1 of a first run shows floor 1 as your best, not 0', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G._gameOverShown = false;
    __startTestRun('shadowblade', 1);
    gameOver();
    const best = document.getElementById('game-over-best').textContent;
    const hint = document.getElementById('death-clvl-hint').textContent;
    showRecords('overview'); const overview = document.getElementById('overlay-content').textContent; closeModal();
    return { best, hint, deepest: /1\s*Deepest floor/.test(overview) };
  });
  assert.equal(r.best, '1');
  assert.match(r.hint, /No class XP this run/);
  assert.equal(r.deepest, true);
});

test('first-run tips show once each, and stop after three runs', async () => {
  const r = await run(async () => {
    const tips = () => [...document.querySelectorAll('#toast-container .toast')].filter(t => t.textContent.includes('💡')).length;
    document.querySelectorAll('#toast-container .toast').forEach(t => t.remove());
    G.meta = defaultMeta(); G._gameOverShown = false;
    __startTestRun('shadowblade', 1);
    const fight = () => { const e = getRandomEnemy(1, false); e.hp = e.maxHp = 999; startCombat(e); endCombat(false); G.phase = 'explore'; };
    fight(); const first = tips();
    fight(); const second = tips();
    const seen = Object.keys(G.meta.tipsSeen);
    document.querySelectorAll('#toast-container .toast').forEach(t => t.remove());
    G.meta = defaultMeta(); G.meta.lifetime.runs = 3;
    fight();
    return { first, second, seen, veteran: tips() };
  });
  assert.equal(r.first, 1);
  assert.equal(r.second, 1, 'the combat tip is not repeated');
  assert.ok(r.seen.includes('combat'));
  assert.equal(r.veteran, 0);
});

test('Against the Grain and Daily Grind unlock when earned', async () => {
  const r = await run(async () => {
    G.meta = defaultMeta(); G._gameOverShown = false; G._enemyTurnDelay = 0;
    await ensureClassLoaded('windwalker');
    __startTestRun('windwalker', 3);
    const neutral = getRandomEnemy(3, false); neutral.element = 'normal'; startCombat(neutral); neutral.hp = 0; winCombat();
    const afterNeutral = hasAchievement('against_grain');
    const crab = deepCopy(ENEMY_POOL.thunder_crab); crab.status = []; crab.patternIndex = 0;
    startCombat(crab); crab.hp = 0; winCombat();
    const afterCounter = hasAchievement('against_grain');
    G.daily = null; G.floor = 6; checkAchievements(); const notDaily = hasAchievement('daily_grind');
    G.daily = todayKey(); checkAchievements(); const daily = hasAchievement('daily_grind');
    G.daily = null;
    return { afterNeutral, afterCounter, notDaily, daily };
  });
  assert.deepEqual(r, { afterNeutral: false, afterCounter: true, notDaily: false, daily: true });
});

test('Daily Descent: same seed for everyone today, standard settings, best floor kept', async () => {
  const r = await run(async () => {
    G.meta = defaultMeta(); G._gameOverShown = false;
    G.worldGen.difficulty = 'nightmare';
    startDailyDescent();
    const sub = document.getElementById('class-select-sub').textContent;
    G.selectedClass = 'shadowblade';
    startRun();
    await new Promise(res => { const t = setInterval(() => { if (G.player) { clearInterval(t); res(); } }, 20); });
    const seed = G.seed, diff = G.worldGen.difficulty, daily = G.daily;
    G.floor = 7; recordRunEnd('died');
    const best = G.meta.daily;
    renderTitleScreen();
    return { sub, seed, diff, daily, best, btn: document.getElementById('daily-btn').textContent, expected: dailySeed() };
  });
  assert.match(r.sub, /Daily Descent/);
  assert.equal(r.seed, r.expected);
  assert.equal(r.diff, 'normal');
  assert.equal(r.best.best, 7);
  assert.equal(r.best.key, r.daily);
  assert.match(r.btn, /best floor 7/);
});

test('Daily Descent ignores New Game+: same floors and enemy strength for everyone', async () => {
  const r = await run(async () => {
    const play = async ngPlus => {
      G.meta = defaultMeta(); G.meta.ngPlus = ngPlus; G._gameOverShown = false;
      startDailyDescent();
      G.selectedClass = 'shadowblade';
      G.player = null; startRun();
      await new Promise(res => { const t = setInterval(() => { if (G.player) { clearInterval(t); res(); } }, 20); });
      const layout = G.map.map(row => row.map(c => c.type[0] + (c.content || '-')[0]).join('')).join('|');
      return { layout, mult: getNgPlusMult(), badge: document.getElementById('ng-badge').style.display };
    };
    const a = await play(0), b = await play(3);
    return { same: a.layout === b.layout, multA: a.mult, multB: b.mult, badge: b.badge };
  });
  assert.deepEqual(r, { same: true, multA: 1, multB: 1, badge: 'none' });
});

test('harder world settings pay more Soul Shards (achievements stay fixed)', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G._gameOverShown = false;
    __startTestRun('shadowblade', 3);
    const pay = diff => { G.worldGen.difficulty = diff; G.meta.soulShards = 0; awardShards(20); return G.meta.soulShards; };
    const out = { normal: pay('normal'), hard: pay('hard'), nightmare: pay('nightmare') };
    G.meta.soulShards = 0; unlockAchievement('first_blood'); out.achievement = G.meta.soulShards;
    G.worldGen.difficulty = 'normal';
    return out;
  });
  assert.deepEqual(r, { normal: 20, hard: 25, nightmare: 30, achievement: 5 });
});

test('no page errors', () => {
  assert.deepEqual(ctx.errors, []);
});
