// Run-flow regressions: softlocks, saves, exploits, settings.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, prepare } = require('./helpers');

let ctx;
const run = (fn, arg) => ctx.page.evaluate(fn, arg);

async function fresh() {
  await ctx.page.evaluate(() => localStorage.clear());
  await ctx.page.reload();
  await ctx.page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await ctx.page.evaluate(() => ensureAbilitiesLoaded());
  await prepare(ctx.page);
  await run(() => { G._enemyTurnDelay = 0; });
}

before(async () => { ctx = await openGame(); await fresh(); });
after(async () => { await ctx.browser.close(); });

test('you cannot flee a guardian or boss', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 3);
    const g = getGuardianForFloor(3);
    startCombat(g); G.turn = 'player';
    G.player.stats.spd = 999;
    playerAction('flee');
    return { inCombat: G.inCombat, guardianAlive: g.hp > 0 };
  });
  assert.deepEqual(r, { inCombat: true, guardianAlive: true });
});

test('fleeing a normal enemy leaves it on the map', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 1);
    const cell = G.map.flat().find(c => c.content === 'enemy' && c.enemy);
    const y = G.map.findIndex(row => row.includes(cell)), x = G.map[y].indexOf(cell);
    G._prevPlayerPos = { ...G.playerPos };
    G.playerPos = { x, y };
    startCombat(cell.enemy); G.turn = 'player';
    G.player.stats.spd = 999;
    const realRand = window.rand; window.rand = () => 0;
    playerAction('flee');
    window.rand = realRand;
    return { inCombat: G.inCombat, content: cell.content, hasEnemy: !!cell.enemy };
  });
  assert.deepEqual(r, { inCombat: false, content: 'enemy', hasEnemy: true });
});

test('save → load keeps packs, consumables, dropped items, stats and secret-boss state', async () => {
  const r = await run(async () => {
    __startTestRun('shadowblade', 6);
    assignRunSlot();
    const p = G.player;
    addPermanentStat(p, 'atk', 7);
    p.stats.atk += 50;                                      // temporary buff, must not be saved
    const packCell = G.map.flat().find(c => c.type === 'floor' && !c.content);
    packCell.content = 'enemy'; packCell.enemies = getRandomEnemyPack(6); delete packCell.enemy;
    p.inventory.push(cloneItem(ITEM_POOL.find(i => i.id === 'health_potion')));
    G.map[G.playerPos.y][G.playerPos.x].droppedItems = [cloneItem(ITEM_POOL.find(i => i.id === 'mana_crystal'))];
    G._secretBossTriggeredThisRun = true; G._pendingSecretBoss = 'herald_of_nothing'; G._secretBossCell = { x: 1, y: 2 };
    const baseAtk = p.base.atk;
    if (!saveRun()) return { saved: false };
    resetRunState();
    const ok = await loadRun(G._runSaveSlot ?? 0);
    const q = G.player;
    const pc = G.map.flat().find(c => c.enemies);
    const potion = q.inventory.find(i => i.id === 'health_potion');
    q.stats.hp = 1; potion.use(q);
    return {
      ok, saved: true,
      atk: q.stats.atk, baseAtk,
      pack: pc ? pc.enemies.length : 0,
      potionHealed: q.stats.hp > 1,
      dropped: (G.map[G.playerPos.y][G.playerPos.x].droppedItems || []).length,
      pending: G._pendingSecretBoss, bossCell: G._secretBossCell,
    };
  });
  assert.equal(r.ok, true);
  assert.equal(r.atk, r.baseAtk);
  assert.equal(r.pack, 2);
  assert.equal(r.potionHealed, true);
  assert.equal(r.dropped, 1);
  assert.equal(r.pending, 'herald_of_nothing');
  assert.deepEqual(r.bossCell, { x: 1, y: 2 });
});

test('descending saves the NEW floor', async () => {
  const r = await run(async () => {
    __startTestRun('shadowblade', 1);
    assignRunSlot();
    nextFloor();
    const pos = { ...G.playerPos };
    const slot = G._runSaveSlot;
    resetRunState();
    await loadRun(slot);
    const cell = G.map[G.playerPos.y][G.playerPos.x];
    return { floor: G.floor, samePos: G.playerPos.x === pos.x && G.playerPos.y === pos.y, onExit: cell.content === 'exit' };
  });
  assert.deepEqual(r, { floor: 2, samePos: true, onExit: false });
});

test('a fusion run can be continued after a page reload', async () => {
  await run(async () => {
    const id = 'darkguard';
    await ensureClassLoaded(id);
    __startTestRun(id, 2);
    assignRunSlot();
    saveRun();
  });
  await ctx.page.reload();
  await ctx.page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await ctx.page.evaluate(() => ensureAbilitiesLoaded());
  await prepare(ctx.page);
  const r = await run(async () => {
    const slot = getRunSlots().findIndex(s => s && s.classId === 'darkguard');
    const ok = await loadRun(slot);
    return { ok, hasClass: !!getClassData('darkguard'), element: getClassData('darkguard')?.element };
  });
  assert.equal(r.ok, true);
  assert.equal(r.hasClass, true);
  assert.ok(r.element);
});

test('a new run never overwrites another run\'s save', async () => {
  await fresh();
  const r = await run(() => {
    for (let i = 0; i < 3; i++) { __startTestRun('shadowblade', i + 1); assignRunSlot(); saveRun(); }
    const before = JSON.stringify(getRunSlots().map(s => s && s.floor));
    __startTestRun('ironclad', 9); assignRunSlot(); autoSaveRun();
    return { before, after: JSON.stringify(getRunSlots().map(s => s && s.floor)), slot: G._runSaveSlot };
  });
  assert.equal(r.after, r.before);
  assert.equal(r.slot, null);
});

test('abandoning a run deletes its save (no repeat shard payouts)', async () => {
  await fresh();
  const r = await run(() => {
    __startTestRun('shadowblade', 5); assignRunSlot(); saveRun();
    const had = hasAnyRunSave();
    abandonRun();
    return { had, has: hasAnyRunSave() };
  });
  assert.deepEqual(r, { had: true, has: false });
});

test('dying pays Soul Shards exactly once and Escape does nothing on the death screen', async () => {
  await fresh();
  const r = await run(() => {
    G.meta.soulShards = 0;
    __startTestRun('shadowblade', 10);
    const e = getRandomEnemy(10); e.atk = 99999; e.patterns = ['basic'];
    startCombat(e);
    G.player.stats.hp = 1; G.turn = 'enemy'; G._pendingSecondActor = 'player';
    enemyTurn();
    const shown = Number(document.getElementById('game-over-shards').textContent);
    updateUI(); updateUI();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    return { shown, total: G.meta.soulShards, overlay: document.getElementById('overlay').classList.contains('active') };
  });
  assert.equal(r.total, r.shown);
  assert.equal(r.overlay, false);
});

test('the combat log keeps updating after 60+ lines', async () => {
  const shown = await run(() => {
    __startTestRun('shadowblade', 1);
    for (let i = 0; i < 80; i++) { logEntry('system', 'line ' + i); updateUI(); }
    logEntry('system', 'NEWEST'); updateUI();
    return document.getElementById('combat-log').innerText.includes('NEWEST');
  });
  assert.equal(shown, true);
});

test('Settings → Back returns to the run instead of ending it', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 1);
    openSettings();
    document.querySelector('#settings-screen .title-btn').click();
    return { screen: document.querySelector('.screen.active').id, hasPlayer: !!G.player };
  });
  assert.deepEqual(r, { screen: 'game-screen', hasPlayer: true });
});

test('a full pack never eats gold or loot', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 1);
    const p = G.player;
    while (p.inventory.length < 12) p.inventory.push(cloneItem(ITEM_POOL[0]));
    p.gold = 1000;
    const shopCell = { content: 'shop' };
    G.phase = 'shop'; showShop(shopCell, 0, 0);
    buyShopItem(0);
    const chest = { type: 'floor', content: 'treasure', item: cloneItem(ITEM_POOL[1]) };
    G.phase = 'explore';
    handleCellContent(chest, 0, 0);
    closeModal();
    return { gold: p.gold, stock: shopCell._shopItems.length, chest: chest.content };
  });
  assert.equal(r.gold, 1000);
  assert.equal(r.stock, 4);
  assert.equal(r.chest, 'treasure');
});

test('damage-over-time hurts enemies', async () => {
  const r = await run(() => {
    __startTestRun('pyromancer', 5);
    const e = getRandomEnemy(5); e.hp = e.maxHp = 5000;
    startCombat(e);
    G.turn = 'player';                       // you apply DoTs on your own turn
    applyBurn(e, G.player, 3); applyPlague(e, G.player, 2);
    const hp0 = e.hp;
    G.turn = 'enemy'; tickStatus(e);
    return { hp0, hp1: e.hp };
  });
  assert.ok(r.hp1 < r.hp0, `enemy HP ${r.hp0} → ${r.hp1}`);
});

test('settings apply on boot and NG+ unlock does not break the title screen', async () => {
  await run(() => {
    localStorage.setItem('abyssal_settings', JSON.stringify({ theme: 'blood', mapSize: 3 }));
    const m = defaultMeta(); m.conquestRewards.conquered = true; m.conquestRewards.ngPlusUnlocked = true;
    localStorage.setItem('abyssal_meta', JSON.stringify(m));
  });
  await ctx.page.reload();
  await ctx.page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await ctx.page.evaluate(() => ensureAbilitiesLoaded());
  const r = await run(() => ({
    gold: document.documentElement.style.getPropertyValue('--accent-gold'),
    cell: document.documentElement.style.getPropertyValue('--map-cell-size'),
    ngVisible: document.getElementById('ngplus-btn').style.display !== 'none',
  }));
  assert.equal(r.gold, '#cc2222');
  assert.equal(r.cell, '32px');
  assert.equal(r.ngVisible, true);
});

test('the Continue button appears on the title screen when a save exists', async () => {
  await fresh();
  const visible = await run(() => {
    __startTestRun('shadowblade', 2); assignRunSlot(); saveRun();
    returnToTitle();
    return document.getElementById('continue-btn').style.display !== 'none';
  });
  assert.equal(visible, true);
});

test('save export → import restores all progress', async () => {
  await fresh();
  const [download] = await Promise.all([
    ctx.page.waitForEvent('download'),
    ctx.page.evaluate(() => { G.meta.soulShards = 1234; saveMeta(); __startTestRun('shadowblade', 4); assignRunSlot(); saveRun(); exportSaveData(); }),
  ]);
  const content = require('node:fs').readFileSync(await download.path(), 'utf8');
  await ctx.page.evaluate(() => { localStorage.clear(); });
  await ctx.page.evaluate(data => { G._pendingImport = JSON.parse(data).data; applyImportedSave(); }, content).catch(() => {});
  await ctx.page.waitForLoadState('load');
  await ctx.page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  const r = await run(() => ({ shards: G.meta.soulShards, runs: getRunSlots().filter(Boolean).length }));
  assert.deepEqual(r, { shards: 1234, runs: 1 });
});

test('no page errors', () => {
  assert.deepEqual(ctx.errors, []);
});
