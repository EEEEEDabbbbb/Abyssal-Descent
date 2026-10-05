// Run-flow regressions: softlocks, saves, exploits, settings.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, prepare } = require('./helpers');

let ctx;
const run = (fn, arg) => ctx.page.evaluate(fn, arg);

async function fresh() {
  // End any run first: leaving the page auto-saves a live run (pagehide)
  await ctx.page.evaluate(() => { if (typeof resetRunState === 'function') resetRunState(); localStorage.clear(); });
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

test('an enemy you flee from loses this fight\'s buffs and debuffs', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 1);
    const cell = G.map.flat().find(c => c.content === 'enemy' && c.enemy);
    const y = G.map.findIndex(row => row.includes(cell)), x = G.map[y].indexOf(cell);
    G._prevPlayerPos = { ...G.playerPos }; G.playerPos = { x, y };
    const en = cell.enemy;
    startCombat(en); G.turn = 'player';
    const before = { atk: en.atk, def: en.def, spd: en.spd, maxHp: en.maxHp };
    // A status-tracked debuff, a raw debuff and a self-buff
    const pen = Math.round(en.def * 0.5); en.def -= pen;
    addStatus(en, { id:'def_down', name:'d', type:'debuff', icon:'', duration:3, defPen: pen });
    en.spd = Math.round(en.spd * 0.5);
    en.atk += 40;
    en.hp = Math.max(1, Math.round(en.maxHp / 2));
    G.player.stats.spd = 999;
    const realRand = window.rand; window.rand = () => 0;
    playerAction('flee');
    window.rand = realRand;
    return { before, after: { atk: en.atk, def: en.def, spd: en.spd, maxHp: en.maxHp }, hp: en.hp, status: en.status.length };
  });
  assert.deepEqual(r.after, r.before);
  assert.ok(r.hp < r.before.maxHp, 'wounds stay');
  assert.equal(r.status, 0);
});

test('the same seed builds the same floors, whatever happens in between', async () => {
  const r = await run(() => {
    const layout = () => G.map.map(row => row.map(c => c.type[0] + (c.content || '-')[0]).join('')).join('/');
    __startTestRun('shadowblade', 1, 'ABYSS1');
    const a1 = layout();
    for (let i = 0; i < 50; i++) rand(100); // e.g. a few fights
    G.floor = 3; G.map = generateMap(3); const a3 = layout();
    __startTestRun('shadowblade', 1, 'ABYSS1');
    const b1 = layout();
    G.floor = 3; G.map = generateMap(3); const b3 = layout();
    __startTestRun('shadowblade', 1, 'OTHER2');
    const c1 = layout();
    return { same1: a1 === b1, same3: a3 === b3, differs: a1 !== c1, seed: G.seed };
  });
  assert.deepEqual(r, { same1: true, same3: true, differs: true, seed: 'OTHER2' });
});

test('reloading a save cannot re-roll what happens next', async () => {
  const r = await run(async () => {
    __startTestRun('shadowblade', 2, 'SCUM42');
    assignRunSlot(); saveRun();
    const first = [rand(1000), rand(1000), getRandomItemByFloor(10).id];
    await loadRun(G._runSaveSlot);
    const second = [rand(1000), rand(1000), getRandomItemByFloor(10).id];
    clearActiveRunSave(); // leave the save slots free for the other tests
    return { first, second, seed: G.seed };
  });
  assert.deepEqual(r.second, r.first);
  assert.equal(r.seed, 'SCUM42');
});

test('a new depth record pays Soul Shards once', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 1);
    G.meta.maxFloor = 3; G.meta.soulShards = 0;
    G.floor = 3; nextFloor();            // floor 4: new record
    const first = G.meta.soulShards;
    G.floor = 2; nextFloor();            // floor 3: not a record
    return { first, second: G.meta.soulShards, best: G.meta.maxFloor };
  });
  assert.deepEqual(r, { first: 2, second: 2, best: 4 });
});

test('Sunders hit, and can\'t be wasted on an enemy that already has them', async () => {
  const r = await run(async () => {
    await ensureClassLoaded('nullbringer');
    __startTestRun('nullbringer', 3);
    const e = getRandomEnemy(3); e.hp = e.maxHp = 9999;
    startCombat(e); G.turn = 'player';
    const hp0 = e.hp;
    playerAction('ability', 'sunder_form');
    const hit = hp0 - e.hp;
    G.turn = 'player'; G.player.cooldowns.sunder_form = 0; G.player.stats.mp = 999;
    return { hit, again: canUseAbility(G.player, 'sunder_form').ok, def: e.def };
  });
  assert.ok(r.hit > 0, JSON.stringify(r));
  assert.equal(r.again, false);
  assert.equal(r.def, 0);
});

test('a boss saved before its fight keeps its scaling after a reload', async () => {
  const r = await run(async () => {
    __startTestRun('shadowblade', 25, 'BOSSSAVE');
    const cell = G.map.flat().find(c => c.content === 'boss');
    const before = { hp: cell.enemy.hp, atk: cell.enemy.atk, ps: JSON.stringify(cell.enemy._phaseScale) };
    assignRunSlot(); saveRun();
    await loadRun(G._runSaveSlot);
    const c2 = G.map.flat().find(c => c.content === 'boss');
    const after = { hp: c2.enemy.hp, atk: c2.enemy.atk, ps: JSON.stringify(c2.enemy._phaseScale) };
    clearActiveRunSave();
    return { before, after };
  });
  assert.deepEqual(r.after, r.before);
  assert.ok(r.before.ps && r.before.ps !== 'undefined');
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

// Steps onto a fresh enemy next to the player (runs in the page)
const STEP_INTO_FIGHT = `
  window.__stepIntoFight = function(hp) {
    const { x, y } = G.playerPos;
    const [dx, dy] = [[1,0],[-1,0],[0,1],[0,-1]].find(([dx, dy]) => { const c = G.map[y+dy] && G.map[y+dy][x+dx]; return c && c.type !== 'wall' && !c.content; });
    const cell = G.map[y+dy][x+dx];
    cell.content = 'enemy'; cell.enemy = getRandomEnemy(G.floor, false); cell.enemy.hp = cell.enemy.maxHp = hp;
    const rngBefore = G.rngState;
    movePlayer(dx, dy);
    return { from: { x, y }, to: { x: x+dx, y: y+dy }, rngBefore };
  };
`;

test('closing the game mid-fight restarts that fight on Continue (it cannot be dodged)', async () => {
  await fresh();
  await ctx.page.addScriptTag({ content: STEP_INTO_FIGHT });
  const r = await run(async () => {
    __startTestRun('shadowblade', 3); assignRunSlot(); saveRun();
    const hp0 = G.player.stats.hp;
    const step = __stepIntoFight(500);
    const inFight = G.inCombat;
    const saved = JSON.parse(localStorage.getItem(LS_RUN_KEY(G._runSaveSlot)));
    await new Promise(res => setTimeout(res, 50));
    G.enemies[0].hp = 10; G.player.stats.hp = 1;           // the fight goes badly…
    const slot = G._runSaveSlot;
    resetRunState();                                       // …so the tab is closed
    await loadRun(slot); resumePendingRunState();
    return { inFight, inCombat: G.inCombat, hp: G.player.stats.hp, hp0, enemyHp: G.enemies && G.enemies[0].hp,
      pos: G.playerPos, to: step.to, sameDice: saved.rngState === step.rngBefore };
  });
  assert.equal(r.inFight, true);
  assert.equal(r.inCombat, true, 'Continue puts you back in the fight');
  assert.deepEqual(r.pos, r.to);
  assert.equal(r.enemyHp, 500, 'the fight starts over');
  assert.equal(r.hp, r.hp0, 'with your HP as it started');
  assert.equal(r.sameDice, true, 'with the same dice');
  await run(() => { endCombat(false); resetRunState(); });
});

test('after fleeing or winning, Continue does not restart the fight', async () => {
  await fresh();
  await ctx.page.addScriptTag({ content: STEP_INTO_FIGHT });
  const r = await run(async () => {
    __startTestRun('shadowblade', 3); assignRunSlot(); saveRun();
    const step = __stepIntoFight(500);
    await new Promise(res => setTimeout(res, 50));
    G.turn = 'player'; G.player.stats.spd = 9999;
    for (let i = 0; i < 20 && G.inCombat; i++) { G.turn = 'player'; playerAction('flee'); }
    const fled = !G.inCombat;
    const slot = G._runSaveSlot;
    resetRunState(); await loadRun(slot); resumePendingRunState();
    const afterFlee = { inCombat: G.inCombat, pos: { ...G.playerPos }, enemyLeft: G.map[step.to.y][step.to.x].content };
    // Now win one
    const step2 = __stepIntoFight(1);
    await new Promise(res => setTimeout(res, 50));
    for (let i = 0; i < 5 && G.inCombat; i++) { G.turn = 'player'; playerAction('attack'); await new Promise(res => setTimeout(res, 20)); }
    const won = !G.inCombat && G.player.stats.hp > 0;
    resetRunState(); await loadRun(slot); resumePendingRunState();
    return { fled, afterFlee, from: step.from, won, afterWin: { inCombat: G.inCombat, cell: G.map[step2.to.y][step2.to.x].content } };
  });
  assert.equal(r.fled, true);
  assert.deepEqual(r.afterFlee, { inCombat: false, pos: r.from, enemyLeft: 'enemy' });
  assert.equal(r.won, true);
  assert.deepEqual(r.afterWin, { inCombat: false, cell: 'visited' });
});

test('an unclaimed boss reward is still waiting after a reload', async () => {
  await fresh();
  const r = await run(async () => {
    __startTestRun('shadowblade', 5); assignRunSlot(); saveRun();
    const boss = getBossForFloor(5);
    G.map[G.playerPos.y][G.playerPos.x].content = 'boss_active';
    startCombat(boss);
    boss.hp = 0; winCombat();
    const names = G._rewardChoices.map(i => i.name);
    const slot = G._runSaveSlot;
    document.getElementById('overlay').classList.remove('active');         // tab closed on the reward screen
    resetRunState(); await loadRun(slot); resumePendingRunState();
    const again = (G._rewardChoices || []).map(i => i.name);
    const shown = document.getElementById('overlay').classList.contains('active') && /Boss Reward/.test(document.getElementById('overlay-content').textContent);
    claimReward(0);
    resetRunState(); await loadRun(slot); resumePendingRunState();
    return { names, again, shown, inCombat: G.inCombat, rewardAfterClaim: G._rewardChoices,
      claimed: G.player.inventory.some(i => i.name === names[0]) };
  });
  assert.deepEqual(r.again, r.names);
  assert.equal(r.shown, true);
  assert.equal(r.inCombat, false);
  assert.equal(r.rewardAfterClaim, null);
  assert.equal(r.claimed, true);
});

test('reloading can\'t re-roll an event wager or a merchant\'s stock', async () => {
  const r = await run(() => {
    __startTestRun('shadowblade', 6, 'REROLL');
    const ev = EVENTS.find(e => e.id === 'bone_gambler');
    const outcomes = new Set(), stocks = new Set();
    for (let i = 0; i < 12; i++) {
      G.rngState = 1000 + i * 7919;          // a different path through the floor each time
      G.player.gold = 500;
      G.phase = 'event'; showEvent(ev, { content: 'event', event: ev }, 4, 5);
      resolveEvent(0); closeModal();
      outcomes.add(G.player.gold);
      const shop = { content: 'shop' };
      G.phase = 'shop'; showShop(shop, 7, 3); closeModal();
      stocks.add(shop._shopItems.map(it => it.id + it.shopPrice).join());
    }
    return { outcomes: outcomes.size, stocks: stocks.size };
  });
  assert.deepEqual(r, { outcomes: 1, stocks: 1 });
});

test('the packed map saves and loads every cell exactly, and old saves still load', async () => {
  const r = await run(async () => {
    const norm = map => JSON.stringify(map.map(row => row.map(c => _serialiseCell(c))));
    const out = [];
    for (const [floor, size] of [[3, 'small'], [12, 'normal'], [25, 'large'], [37, 'normal']]) {
      G.worldGen.mapSize = size;
      __startTestRun('shadowblade', floor, 'PACK' + floor);
      // Some play: reveal and visit cells, drop loot, open a shop
      G.map.forEach((row, y) => row.forEach((c, x) => { if ((x + y) % 3 === 0) c.revealed = true; if ((x * y) % 7 === 1) c.visited = true; }));
      const floorCell = G.map.flat().find(c => c.type === 'floor' && !c.content);
      floorCell.droppedItems = [cloneItem(ITEM_POOL[5])];
      const before = norm(G.map);
      const data = JSON.parse(JSON.stringify(_serialiseRun()));
      const legacy = { ...data, map: G.map.map(row => row.map(c => _serialiseCell(c))), mapPacked: undefined };
      await _deserialiseRun(data);
      const packedOk = norm(G.map) === before;
      await _deserialiseRun(JSON.parse(JSON.stringify(legacy)));
      const legacyOk = norm(G.map) === before;
      out.push({ floor, size, packedOk, legacyOk, ratio: +(JSON.stringify(data).length / JSON.stringify(legacy).length).toFixed(2) });
    }
    G.worldGen.mapSize = 'normal';
    return out;
  });
  for (const row of r) {
    assert.equal(row.packedOk, true, JSON.stringify(row));
    assert.equal(row.legacyOk, true, JSON.stringify(row));
    assert.ok(row.ratio < 0.5, `packed save should be much smaller: ${JSON.stringify(row)}`);
  }
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
    const stock0 = shopCell._shopItems.length;
    buyShopItem(0);
    const chest = { type: 'floor', content: 'treasure', item: cloneItem(ITEM_POOL[1]) };
    G.phase = 'explore';
    handleCellContent(chest, 0, 0);
    closeModal();
    return { gold: p.gold, stock: shopCell._shopItems.length, stock0, chest: chest.content };
  });
  assert.equal(r.gold, 1000);
  assert.equal(r.stock, r.stock0); // nothing was sold to a full pack
  assert.equal(r.chest, 'treasure');
});

test('merchants stock three different pieces of gear and two consumables', async () => {
  const bad = await run(() => {
    __startTestRun('shadowblade', 1);
    const out = [];
    for (const floor of [1, 8, 20, 35, 50]) {
      G.floor = floor;
      for (let i = 0; i < 40; i++) {
        const items = _generateShopItems();
        const gear = items.slice(0, 3), cons = items.slice(3);
        if (gear.some(it => it.type === 'consumable')) out.push(`f${floor}: consumable in a gear slot`);
        if (cons.length !== 2 || cons.some(it => it.type !== 'consumable')) out.push(`f${floor}: consumables ${cons.map(c => c.id)}`);
        if (new Set(items.map(it => it.id)).size !== items.length) out.push(`f${floor}: duplicate ${items.map(it => it.id)}`);
      }
    }
    return out.slice(0, 5);
  });
  assert.deepEqual(bad, []);
});

test('nothing a merchant sells can be sold back for a profit, on any floor', async () => {
  const bad = await run(() => {
    __startTestRun('shadowblade', 1);
    const out = [];
    for (const floor of [1, 10, 25, 40, 50]) {
      G.floor = floor;
      for (let i = 0; i < 40; i++) {
        for (const it of _generateShopItems()) {
          if (getSellPrice(it) >= it.shopPrice) out.push(`${it.name} (${it.rarity}) f${floor}: buy ${it.shopPrice}, sell ${getSellPrice(it)}`);
        }
      }
    }
    return out.slice(0, 5);
  });
  assert.deepEqual(bad, []);
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

test('beating floor 50 conquers the Abyss and unlocks New Game+', async () => {
  await fresh();
  const r = await run(() => {
    __startTestRun('shadowblade', 50);
    assignRunSlot(); saveRun();
    const boss = getBossForFloor(50);
    startCombat(boss); G.turn = 'player';
    boss.hp = 1;
    addPermanentStat(G.player, 'atk', 99999);
    playerAction('attack');
    const modal = document.getElementById('overlay-content').innerText;
    const conquered = G.meta.conquestRewards.conquered;
    // "Return to the Surface"
    [...document.querySelectorAll('#overlay-content button')].find(b => /Return to the Surface/.test(b.textContent)).click();
    const onTitle = document.getElementById('title-screen').classList.contains('active');
    const ngBtn = document.getElementById('ngplus-btn');
    const saveGone = !hasAnyRunSave();
    ngBtn.click();
    [...document.querySelectorAll('#overlay-content button')].find(b => /Begin NG\+/.test(b.textContent)).click();
    return { conquered, modalShown: /CONQUERED/.test(modal), onTitle, ngVisible: ngBtn.style.display !== 'none', saveGone,
             ngPlus: G.meta.ngPlus, onClassSelect: document.getElementById('class-select-screen').classList.contains('active'),
             unlocked: G.meta.unlockedClasses.includes('abyssal_one') };
  });
  assert.deepEqual(r, { conquered: true, modalShown: true, onTitle: true, ngVisible: true, saveGone: true, ngPlus: 1, onClassSelect: true, unlocked: true });
});

test('no page errors', () => {
  assert.deepEqual(ctx.errors, []);
});
