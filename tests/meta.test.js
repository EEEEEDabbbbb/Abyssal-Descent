// Meta progression through the real UI: Fusion Lab, class unlocks, Shard Emporium.
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
});
after(async () => { await ctx.browser.close(); });

test('fusing two mastered classes in the Fusion Lab unlocks the fusion', async () => {
  const { page } = ctx;
  await run(() => {
    G.meta = defaultMeta();
    G.meta.classLevels = { shadowblade: 20, ironclad: 20 };
    showScreen('fusion-lab-screen'); renderFusionLab();
  });
  // Tap both roster cards, as a player would
  await page.click('#fusion-class-roster .fusion-roster-card:has-text("Shadowblade")');
  await page.click('#fusion-class-roster .fusion-roster-card:has-text("Ironclad")');
  await page.waitForFunction(() => getComputedStyle(document.getElementById('fusion-fuse-btn')).pointerEvents !== 'none', null, { timeout: 5000 });
  await page.click('#fusion-fuse-btn');
  await page.waitForFunction(() => /unlocked/.test(document.getElementById('fusion-status').textContent), null, { timeout: 5000 });
  const r = await run(() => ({ fusions: G.meta.unlockedFusions.slice(), ach: hasAchievement('fusionist'), expected: getDualFusion('shadowblade', 'ironclad') }));
  assert.ok(r.expected);
  assert.ok(r.fusions.includes(r.expected), JSON.stringify(r));
  assert.equal(r.ach, true);
});

test('classes can be unlocked with Soul Shards from class select', async () => {
  const { page } = ctx;
  const cost = await run(() => {
    G.meta = defaultMeta();
    G.meta.soulShards = 100; G.meta.maxFloor = 5;
    G._dailyMode = false; showScreen('class-select-screen');
    return CLASS_UNLOCK_COSTS.pyromancer.shardCost;
  });
  await page.click('.class-card:has(.class-name:text-is("Pyromancer")) button:has-text("Unlock")');
  const r = await run(() => ({ unlocked: G.meta.unlockedClasses.includes('pyromancer'), shards: G.meta.soulShards }));
  assert.deepEqual(r, { unlocked: true, shards: 100 - cost });
});

test('a class above your best floor stays locked even with enough shards', async () => {
  const r = await run(() => {
    G.meta = defaultMeta();
    G.meta.soulShards = 5000; G.meta.maxFloor = 1;
    unlockClass('nullbringer', { stopPropagation() {} });
    return { unlocked: G.meta.unlockedClasses.includes('nullbringer'), shards: G.meta.soulShards };
  });
  assert.deepEqual(r, { unlocked: false, shards: 5000 });
});

test('a Shard Emporium upgrade applies to the next run', async () => {
  const r = await run(() => {
    G.meta = defaultMeta(); G.meta.soulShards = 100;
    const before = createPlayer('shadowblade').base.atk;
    buyShardUpgrade('power_shard'); closeModal();
    const after = createPlayer('shadowblade').base.atk;
    return { diff: after - before, shards: G.meta.soulShards, rank: G.meta.shopUpgrades.power_shard };
  });
  assert.deepEqual(r, { diff: 3, shards: 90, rank: 1 });
});

test('no page errors', () => { assert.deepEqual(ctx.errors, []); });
