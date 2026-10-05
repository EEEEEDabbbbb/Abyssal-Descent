// UI accessibility: tooltips work with a mouse, a keyboard and a touch screen.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { GAME_URL } = require('./helpers');

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

async function gamePage(opts = {}) {
  const page = await browser.newPage(opts);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(GAME_URL);
  await page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await page.evaluate(() => ensureAbilitiesLoaded());
  await page.evaluate(() => {
    seedRun('UI1');
    G.selectedClass = 'shadowblade';
    G.player = createPlayer('shadowblade');
    G.map = generateMap(1); G.phase = 'explore';
    G.player.inventory.push(cloneItem(ITEM_POOL.find(i => i.id === 'misers_coin')));
    showScreen('game-screen'); updateUI();
  });
  return { page, errors };
}
const tipText = page => page.evaluate(() => {
  const t = document.getElementById('tooltip');
  return t && t.style.display === 'block' ? t.textContent : null;
});

test('hovering an item shows its tooltip, with apostrophes intact', async () => {
  const { page, errors } = await gamePage();
  await page.hover('#inventory-grid .item-card');
  await page.mouse.move(...(await page.evaluate(() => { const r = document.querySelector('#inventory-grid .item-card').getBoundingClientRect(); return [r.left + 12, r.top + 12]; })));
  assert.match(await tipText(page), /Miser's Coin/);
  await page.mouse.move(2, 2);
  assert.equal(await tipText(page), null);
  assert.deepEqual(errors, []);
  await page.close();
});

test('keyboard focus shows tooltips, including on unusable abilities', async () => {
  const { page, errors } = await gamePage();
  await page.evaluate(() => document.querySelector('#abilities-grid .ability-btn').focus());
  await page.keyboard.press('Tab'); // focus-visible comes from keyboard navigation
  const text = await tipText(page);
  assert.ok(text && text.length > 10, String(text));
  await page.keyboard.press('Tab');
  assert.ok(await tipText(page));
  assert.deepEqual(errors, []);
  await page.close();
});

test('an unusable ability says why in its tooltip', async () => {
  const { page } = await gamePage();
  const why = await page.evaluate(() => {
    const e = getRandomEnemy(1); e.hp = e.maxHp = 999; e.spd = 1;
    startCombat(e); G.turn = 'player'; G.player.stats.mp = 0; updateUI();
    const btn = [...document.querySelectorAll('#abilities-grid .ability-btn')].find(b => b.getAttribute('aria-disabled') === 'true');
    const r = btn.getBoundingClientRect();
    showAbilityTooltip({ clientX: r.left, clientY: r.bottom }, btn.dataset.tipAbility);
    return document.getElementById('tooltip').textContent;
  });
  assert.match(why, /Not enough mana/);
  await page.close();
});

test('a long press shows the tooltip on touch screens without pressing the button', async () => {
  const { page, errors } = await gamePage({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const r = await page.evaluate(async () => {
    const e = getRandomEnemy(1); e.hp = e.maxHp = 999; e.spd = 1;
    startCombat(e); G.turn = 'player'; G.player.stats.mp = 999; updateUI();
    const btn = document.querySelector('#abilities-grid .ability-btn:not([aria-disabled])');
    const rect = btn.getBoundingClientRect();
    const touch = new Touch({ identifier: 1, target: btn, clientX: rect.left + 5, clientY: rect.top + 5 });
    btn.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [touch], changedTouches: [touch] }));
    await new Promise(res => setTimeout(res, 600));
    const shown = document.getElementById('tooltip').style.display === 'block';
    btn.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [], changedTouches: [touch] }));
    const mp0 = G.player.stats.mp, round0 = G.combatRound, log0 = G.log.length;
    btn.click(); // the tap that ends the long press
    return { shown, acted: G.player.stats.mp !== mp0 || G.log.length !== log0 };
  });
  assert.deepEqual(r, { shown: true, acted: false });
  assert.deepEqual(errors, []);
  await page.close();
});

test('on a phone, the on-screen pad moves you and tapping a revealed tile walks there', async () => {
  const { page, errors } = await gamePage({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  // Find a pad direction that leads onto open floor, press it
  const moved = await page.evaluate(() => {
    G.map.forEach(row => row.forEach(c => { if (c.content && c.content !== 'start') { c.content = null; c.enemy = null; c.enemies = null; } }));
    updateUI();
    const { x, y } = G.playerPos;
    const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    for (const [name, [dx, dy]] of Object.entries(dirs)) {
      const c = G.map[y + dy] && G.map[y + dy][x + dx];
      if (c && c.type !== 'wall') return { name, from: { x, y }, to: { x: x + dx, y: y + dy } };
    }
    return null;
  });
  await page.tap(`.dpad-btn.dpad-${moved.name}`);
  const afterPad = await page.evaluate(() => ({ ...G.playerPos }));
  assert.deepEqual(afterPad, moved.to);
  // Tap a revealed floor tile two steps away and let the walk finish
  const target = await page.evaluate(() => {
    const { x, y } = G.playerPos;
    for (const [dx, dy] of [[2,0],[-2,0],[0,2],[0,-2],[1,1],[-1,-1],[1,-1],[-1,1]]) {
      const c = G.map[y + dy] && G.map[y + dy][x + dx];
      if (c && c.type !== 'wall' && c.revealed && findPath(x, y, x + dx, y + dy)) return { x: x + dx, y: y + dy };
    }
    return null;
  });
  if (target) {
    await page.tap(`.mc[data-x="${target.x}"][data-y="${target.y}"]`);
    await page.waitForFunction(t => G.playerPos.x === t.x && G.playerPos.y === t.y, target, { timeout: 5000 });
  }
  assert.deepEqual(errors, []);
  await page.close();
});


test('auto-explore walks to the nearest chest, then on to unexplored ground, and stops when an enemy comes into view', async () => {
  const { page, errors } = await gamePage();
  // Clear the floor, then put one chest in reach and nothing else
  const chest = await page.evaluate(() => {
    applySetting('animSpeed', 'instant');
    G.map.forEach(row => row.forEach(c => { if (c.content && c.content !== 'start') { c.content = null; c.enemy = null; c.enemies = null; c.item = null; c.event = null; } }));
    const { x, y } = G.playerPos;
    let best = null;
    G.map.forEach((row, cy) => row.forEach((c, cx) => {
      if (!c.revealed || c.type === 'wall' || (cx === x && cy === y)) return;
      const path = findPath(x, y, cx, cy);
      if (path && path.length >= 3 && (!best || path.length < best.d)) best = { x: cx, y: cy, d: path.length };
    }));
    const c = G.map[best.y][best.x];
    c.content = 'treasure'; c.item = cloneItem(ITEM_POOL.find(i => i.rarity === 'common'));
    updateUI();
    return best;
  });
  await page.keyboard.press('x');
  await page.waitForFunction(t => G.map[t.y][t.x].content === 'visited', chest, { timeout: 5000 });
  await page.evaluate(() => closeModal());
  const pos = await page.evaluate(() => ({ ...G.playerPos }));
  assert.deepEqual({ x: pos.x, y: pos.y }, { x: chest.x, y: chest.y });

  // Now hide an enemy just past the edge of what's been seen and explore again
  const r = await page.evaluate(async () => {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    const target = autoExploreTarget();
    if (!target || !target.frontier) return { skipped: true };
    const W = G.mapW, H = G.mapH;
    let spot = null;
    for (let r = 2; r <= 4 && !spot; r++) for (const [dx, dy] of [[r,0],[-r,0],[0,r],[0,-r]]) {
      const x = target.x + dx, y = target.y + dy;
      const c = G.map[y] && G.map[y][x];
      if (c && !c.revealed && c.type !== 'wall') { spot = { x, y }; break; }
    }
    if (!spot) return { skipped: true };
    const c = G.map[spot.y][spot.x];
    c.content = 'enemy'; c.enemy = getRandomEnemy(1);
    autoExplore();
    for (let i = 0; i < 200 && _walkTimer; i++) await sleep(20);
    return { inCombat: G.inCombat, seen: G.map[spot.y][spot.x].revealed, log: G.log.slice(0, 3).map(e => e.msg) };
  });
  if (!r.skipped) {
    assert.equal(r.inCombat, false, JSON.stringify(r));
    assert.equal(r.seen, true);
    assert.ok(r.log.some(m => /spot an enemy/.test(m)), JSON.stringify(r.log));
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test('auto-explore says so when the floor is fully explored', async () => {
  const { page, errors } = await gamePage();
  const log = await page.evaluate(() => {
    G.map.forEach(row => row.forEach(c => { c.revealed = true; if (c.content && c.content !== 'start') { c.content = null; c.enemy = null; c.enemies = null; } }));
    autoExplore();
    return G.log[0].msg;
  });
  assert.match(log, /Nothing left to explore/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('number keys pick event choices and boss rewards; Enter continues', async () => {
  const { page, errors } = await gamePage();
  await page.evaluate(() => {
    const ev = EVENTS.find(e => e.id === 'fountain') || EVENTS[0];
    const cell = { content: 'event', event: ev };
    G.phase = 'event'; showEvent(ev, cell, 0, 0);
    window.__evCell = cell;
  });
  await page.keyboard.press('2');
  const afterChoice = await page.evaluate(() => ({ cell: __evCell.content, focused: document.activeElement && document.activeElement.id }));
  assert.deepEqual(afterChoice, { cell: 'visited', focused: 'event-continue-btn' });
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => isModalOpen()), false);

  const r = await page.evaluate(() => { G.floor = 5; showFloorReward(); return G._rewardChoices.map(i => i.name); });
  await page.keyboard.press('3');
  const claimed = await page.evaluate(() => ({ open: isModalOpen(), last: G.player.inventory[G.player.inventory.length - 1].name }));
  assert.deepEqual(claimed, { open: false, last: r[2] });
  assert.deepEqual(errors, []);
  await page.close();
});

test('stepping on the exit asks first only if you\'re leaving chests or events behind', async () => {
  const { page, errors } = await gamePage();
  const setup = () => page.evaluate(() => {
    G.floor = 1; G.map = generateMap(1); G.phase = 'explore'; G._gameOverShown = false;
    G.map.forEach(row => row.forEach(c => { if (['treasure', 'event', 'enemy', 'boss'].includes(c.content)) c.content = null; }));
    // An open exit right next to the player
    const { x, y } = G.playerPos;
    const [dx, dy] = [[1,0],[-1,0],[0,1],[0,-1]].find(([dx, dy]) => { const c = G.map[y+dy] && G.map[y+dy][x+dx]; return c && c.type !== 'wall'; });
    G.map[y+dy][x+dx].content = 'exit';
    updateUI();
    return { dx, dy };
  });
  // Nothing left behind: straight down
  let d = await setup();
  await page.evaluate(({ dx, dy }) => movePlayer(dx, dy), d);
  assert.equal(await page.evaluate(() => G.floor), 2);
  // A chest in sight: asked, Stay keeps you here, Enter on Descend goes down
  d = await setup();
  const asked = await page.evaluate(({ dx, dy }) => {
    const chest = G.map.flat().find(c => c.type === 'floor' && !c.content && c.revealed);
    chest.content = 'treasure'; chest.item = cloneItem(ITEM_POOL[0]);
    movePlayer(dx, dy);
    return { floor: G.floor, text: document.getElementById('overlay-content').textContent };
  }, d);
  assert.equal(asked.floor, 1);
  assert.match(asked.text, /leaving 1 chest behind/);
  await page.keyboard.press('2');
  assert.deepEqual(await page.evaluate(() => ({ floor: G.floor, open: isModalOpen() })), { floor: 1, open: false });
  await page.evaluate(({ dx, dy }) => { movePlayer(-dx, -dy); movePlayer(dx, dy); }, d);
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => G.floor), 2);
  assert.deepEqual(errors, []);
  await page.close();
});
