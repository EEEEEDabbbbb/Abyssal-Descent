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
