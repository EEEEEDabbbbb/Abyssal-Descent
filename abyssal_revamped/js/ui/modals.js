// ══════════════════════════════════════════════════════════════
// MODALS & OVERLAYS  (js/ui/modals.js)
//
// ALL modals use a single #overlay + #overlay-content pair in index.html.
// showModal(html, closeable) — the only way to open a modal.
//   - Injects HTML into #overlay-content as a .modal-body div
//   - If closeable=true, adds a .modal-close-btn (✕) as position:absolute top-right
//   - ⚠️ The ✕ is OUTSIDE .modal-body — it's a sibling, anchored to #overlay-content
//   - Add padding-top on your content wrapper to avoid content hiding under ✕
// closeModal() — removes .active from #overlay; also resets phase to 'explore' if in event/shop
//
// MODAL FUNCTIONS IN THIS FILE:
//   showEvent(event, cell, cx, cy)  — event choice dialog (closeable=false)
//   resolveEvent(idx)               — updates #overlay-content .modal-body with result
//   showShop / renderShop           — merchant modal with buy/reroll/sell
//   buyShopItem(idx)                — purchases from G._shopItems array
//   openSellMenu / sellItemFromMenu — sell submenu within shop
//   showFloorReward()               — 3-item boss reward choice (closeable=false)
//   claimReward(idx)                — picks from G._rewardChoices, closes modal
//   openInventoryUse()              — combat item use list (closeable=false)
//   showTalentTree / buyTalent      — talent tree modal
//   showShardEmporium / buyShardUpgrade — shard shop modal
//   showWorldGenModal               — world settings before starting a run
//   openHowToPlay                   — static info modal
//   openLoadoutModal / pickLoadout  — loadout selection
//   showPauseMenu / confirmAbandon / abandonRun — pause/abandon flow
//
// ITEM RARITY IN MODALS:
//   Shop/reward lists use .item-rarity-badge (inline span, NO position:absolute)
//   Treasure popup (showItemPopup in render.js) uses .item-rarity (block div, normal flow)
//   ⚠️ NEVER add position:absolute to .item-rarity CSS rule — it will break the popup
// ══════════════════════════════════════════════════════════════

function showModal(html, closeable=true) {
  const overlay = document.getElementById('overlay');
  const content = document.getElementById('overlay-content');
  overlay.classList.add('active');
  content.innerHTML = closeable
    ? `<button class="modal-close-btn" onclick="closeModal()" aria-label="Close">✕</button><div class="modal-body">${html}</div>`
    : `<div class="modal-body">${html}</div>`;
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  if (G.phase==='event'||G.phase==='shop') { G.phase='explore'; updateUI(); }
}

// ── Descend? (stepping on the exit with things left behind) ───
function showDescendConfirm() {
  showModal(`
    <div class="modal-title">▼ Descend to Floor ${G.floor + 1}?</div>
    <div style="text-align:center;color:var(--text-mid);margin:0.75rem 0 1rem;line-height:1.6">You're leaving ${leftBehindOnFloor()} behind on this floor.</div>
    <div style="display:flex;gap:0.5rem">
      <button class="title-btn primary choice-btn" id="descend-btn" data-key="1" style="flex:1" onclick="confirmDescend()"><span class="key-hint">1</span>Descend</button>
      <button class="title-btn choice-btn" data-key="2" style="flex:1" onclick="closeModal()"><span class="key-hint">2</span>Stay</button>
    </div>`);
  const btn = document.getElementById('descend-btn');
  if (btn) btn.focus({ preventScroll: true }); // Enter descends, Escape stays
}
function confirmDescend() {
  closeModal();
  if (G.player && G.map && G.map[G.playerPos.y][G.playerPos.x].content === 'exit') nextFloor();
}

// ── Event dialog ──────────────────────────────────────────────
function showEvent(event, cell, cx, cy) {
  let html = `<div class="modal-title">${event.icon} ${event.name}</div>
    <div style="color:var(--text-mid);font-size:0.8rem;margin-bottom:1rem;font-style:italic">${event.desc}</div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">`;
  event.choices.forEach((ch,i)=>{
    const text = typeof ch.text === 'function' ? ch.text(G.player) : ch.text;
    html+=`<button class="title-btn choice-btn" data-key="${i + 1}" onclick="resolveEvent(${i})" style="text-align:left;font-size:0.75rem;padding:0.5rem 0.8rem;min-width:0;max-width:100%;white-space:normal;letter-spacing:0.05em;line-height:1.4"><span class="key-hint">${i + 1}</span>${text}</button>`;
  });
  html+='</div>';
  G._currentEvent = event;
  G._currentEventCell = cell;
  G._currentEventPos  = {x:cx,y:cy};
  showModal(html, false);
}

function resolveEvent(idx) {
  const event = G._currentEvent;
  const cell  = G._currentEventCell;
  if (!event) { closeModal(); return; }
  // Seeded by the event's place: reloading can't re-roll a wager
  const pos = G._currentEventPos || { x: 0, y: 0 };
  const result = withSeedKey(`event:${G.floor}:${pos.x},${pos.y}`, () => event.choices[idx].effect(G.player));
  if (cell) { cell.content='visited'; cell.event=null; }
  document.querySelector('#overlay-content .modal-body').innerHTML = `
    <div class="modal-title">${event.icon} ${event.name}</div>
    <div style="color:var(--text-mid);font-size:0.9rem;margin:1rem 0;font-style:italic">${result}</div>
    <button class="title-btn primary" id="event-continue-btn" style="display:block;width:100%;min-width:0;max-width:100%;margin-top:0.5rem;font-size:0.85rem;padding:0.5rem 1rem" onclick="closeModal()">Continue</button>`;
  G._currentEvent=null;
  updateUI();
  const cont = document.getElementById('event-continue-btn');
  if (cont) cont.focus({ preventScroll: true }); // Enter / Space continues
}

// ── Shop ──────────────────────────────────────────────────────
function showShop(cell, cx, cy) {
  G._shopCell = cell;
  G._shopPos  = {x:cx,y:cy};
  // Persist shop stock to the cell — only generate once per merchant visit
  if (!cell._shopItems) cell._shopItems = withSeedKey(`shop:${G.floor}:${cx},${cy}`, _generateShopItems);
  G._shopItems = cell._shopItems;
  renderShop();
}

// Rarity price multipliers — rarer items cost proportionally more
const RARITY_PRICE_MULT = {
  common: 1, uncommon: 1.5, rare: 2.5,
  epic: 4, legendary: 7, mythical: 12, divine: 20
};
// Typical merchant price for a piece of gear on this floor (before the random part)
function gearShopPrice(rarity, floor = G.floor) { return (30 + floor * 4) * (RARITY_PRICE_MULT[rarity] || 1); }
// Consumables cost (12–21) × rarity × depth; typicalShopPrice uses the middle
function consumableShopPrice(rarity, floor = G.floor, roll = 4.5) {
  return Math.floor((12 + roll) * (RARITY_PRICE_MULT[rarity] || 1) * (1 + floor * 0.04));
}
function typicalShopPrice(item, floor = G.floor) {
  return item.type === 'consumable' ? consumableShopPrice(item.rarity, floor) : gearShopPrice(item.rarity, floor);
}

function _generateShopItems() {
  const floor = G.floor;
  const items = [];
  // 3 pieces of gear + 2 consumables, no duplicates
  const stocked = new Set();
  for (let i=0;i<3;i++) {
    const item = getRandomGearByFloor(floor, stocked);
    stocked.add(item.id);
    const mult = RARITY_PRICE_MULT[item.rarity] || 1;
    const shopPrice = Math.floor((20 + floor*4 + rand(20)) * mult);
    items.push({...item, shopPrice});
  }
  // Consumables: a healing potion that is still worth drinking at this
  // depth, plus one more rolled with the floor's loot odds (flat-value
  // potions from floor 1 are useless by floor 20).
  const consPrice = it => consumableShopPrice(it.rarity, floor, rand(10));
  const healId = floor >= 25 ? 'abyssal_elixir_l' : floor >= 15 ? 'grand_elixir' : floor >= 7 ? 'heavy_elixir' : 'health_potion';
  const heal = ITEM_POOL.find(it => it.id === healId);
  if (heal) items.push({ ...cloneItem(heal), shopPrice: consPrice(heal) });
  const rarity = rollLootRarity(floor);
  const pool = ITEM_POOL.filter(it => it.type === 'consumable' && it.rarity === rarity && it.id !== healId);
  if (pool.length) { const c = pool[rand(pool.length)]; items.push({ ...cloneItem(c), shopPrice: consPrice(c) }); }
  return items;
}

function renderShop() {
  const p = G.player;
  let html = `<div class="modal-title">🏪 Merchant's Wares</div>
    <div style="font-size:0.75rem;color:var(--text-dim);margin-bottom:0.75rem;text-align:center">Gold: <strong style="color:var(--accent-gold)">${p.gold}</strong></div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">`;
  G._shopItems.forEach((item,i)=>{
    const canAfford = p.gold >= item.shopPrice;
    const elObj = item.element ? ELEMENTS[item.element] : null;
    html+=`<div class="shop-item ${!canAfford?'unaffordable':''}">
      <div class="shop-item-info">
        <div class="item-name">${item.icon} ${item.name} <span class="item-rarity-badge ${item.rarity}">${item.rarity}</span> <span style="font-size:0.62rem;color:var(--text-dim);text-transform:capitalize">${item.type}</span>${elObj?` <span style="color:${elObj.color};font-size:0.65rem">${elObj.icon}</span>`:''}</div>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-top:1px">${item.desc}</div>
      </div>
      <button class="buy-btn ${!canAfford?'disabled-btn':''}" ${!canAfford?'disabled':''} onclick="buyShopItem(${i})">${item.shopPrice}g</button>
    </div>`;
  });
  html+=`</div>
    <div style="display:flex;gap:0.4rem;margin-top:0.75rem">
      <button class="title-btn" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.7rem;letter-spacing:0.08em" onclick="rerollShop()" ${p.gold < getRerollCost() ? 'disabled' : ''}>🔄 Reroll (${getRerollCost()}g)</button>
      <button class="title-btn" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.7rem;letter-spacing:0.08em;color:var(--accent-gold)" onclick="openSellMenu()">💰 Sell</button>
      <button class="title-btn danger" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.7rem;letter-spacing:0.08em" onclick="closeShopKeepAlive()">✕ Leave</button>
    </div>`;
  showModal(html, false);
}

function buyShopItem(idx) {
  const p    = G.player;
  const item = G._shopItems[idx];
  if (!item||p.gold<item.shopPrice) return;
  if (inventoryFull(p)) { logEntry('system','🎒 Your pack is full — sell or drop something first.'); renderShop(); updateUI(); return; }
  p.gold -= item.shopPrice;
  G._shopItems.splice(idx,1);
  const clean = cloneItem(item);
  delete clean.shopPrice;
  addToInventory(clean);
  logEntry('reward',`Bought: ${item.name} for ${item.shopPrice}g.`);
  renderShop();
}

function openSellMenu() {
  const p = G.player;
  const sellable = p.inventory.filter(item => !item.permanent);
  if (!sellable.length) {
    showModal(`<div class="modal-title">💰 Sell Items</div>
      <div style="color:var(--text-dim);text-align:center;margin:1rem 0">Your inventory is empty.</div>
      <button class="title-btn" style="width:100%" onclick="renderShop()">← Back</button>`, false);
    return;
  }
  let html = `<div class="modal-title">💰 Sell to Merchant</div>
    <div style="font-size:0.7rem;color:var(--text-dim);text-align:center;margin-bottom:0.75rem">Gold: <strong style="color:var(--accent-gold)">${p.gold}</strong></div>
    <div style="display:flex;flex-direction:column;gap:0.4rem">`;
  p.inventory.forEach((item, i) => {
    if (item.permanent) return;
    const price = getSellPrice(item);
    const elObj = item.element ? ELEMENTS[item.element] : null;
    html += `<div class="shop-item">
      <div class="shop-item-info">
        <div class="item-name">${item.icon} ${item.name} <span class="item-rarity-badge ${item.rarity}">${item.rarity}</span> <span style="font-size:0.62rem;color:var(--text-dim);text-transform:capitalize">${item.type}</span>${elObj?` <span style="color:${elObj.color}">${elObj.icon}</span>`:''}</div>
        <div style="font-size:0.68rem;color:var(--text-dim)">${item.desc}</div>
      </div>
      <button class="buy-btn" onclick="sellItemFromMenu(${i})">${price}g</button>
    </div>`;
  });
  html += `</div><button class="title-btn" style="width:100%;margin-top:0.75rem" onclick="renderShop()">← Back to Shop</button>`;
  showModal(html, false);
}

function sellItemFromMenu(idx, confirmed = false) {
  const item = G.player.inventory[idx];
  if (!item) return;
  // Valuable items get a confirmation step
  if (!confirmed && ['epic','legendary','mythical','divine'].includes(item.rarity)) {
    showModal(`<div class="modal-title">Sell ${item.icon} ${item.name}?</div>
      <div style="text-align:center;color:var(--text-mid);margin:0.75rem 0">This <span class="item-rarity-badge ${item.rarity}">${item.rarity}</span> item sells for <strong style="color:var(--accent-gold)">${getSellPrice(item)}g</strong>.</div>
      <div style="display:flex;gap:0.5rem">
        <button class="title-btn" style="flex:1;min-width:0" onclick="openSellMenu()">Keep it</button>
        <button class="title-btn primary" style="flex:1;min-width:0" onclick="sellItemFromMenu(${idx}, true)">Sell</button>
      </div>`, false);
    return;
  }
  sellItem(idx);
  openSellMenu(); // re-render the sell menu
}

function getRerollCost() { return 15 + G.floor * 3; }

function rerollShop() {
  const cost = getRerollCost();
  if (G.player.gold < cost) { logEntry('system','Not enough gold to reroll!'); return; }
  G.player.gold -= cost;
  G._shopItems = _generateShopItems();
  if (G._shopCell) G._shopCell._shopItems = G._shopItems; // persist rerolled stock to cell
  logEntry('system',`Shop refreshed for ${cost}g.`);
  renderShop();
}

function closeShopKeepAlive() {
  // Closing shop does NOT consume the cell — it stays on the map
  document.getElementById('overlay').classList.remove('active');
  G.phase = 'explore';
  updateUI();
}

// ── Floor reward (boss floors) ───────────────────────────────
// choices: the saved choices when resuming a run (see resumePendingRunState)
function showFloorReward(choices) {
  choices = choices || [
    getBossLootByFloor(G.floor),
    getBossLootByFloor(G.floor),
    getBossLootByFloor(G.floor),
  ];
  G._rewardChoices = choices;
  let html = `<div class="modal-title">⭐ Boss Reward</div>
    <div style="font-size:0.75rem;color:var(--text-dim);text-align:center;margin-bottom:0.75rem">Choose one item:</div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">`;
  choices.forEach((item,i)=>{
    const elObj = item.element ? ELEMENTS[item.element] : null;
    html+=`<div class="shop-item reward-item" data-key="${i + 1}" onclick="claimReward(${i})" role="button" tabindex="0" style="cursor:pointer">
      <div class="shop-item-info">
        <div class="item-name"><span class="key-hint">${i + 1}</span>${item.icon} ${item.name} <span class="item-rarity-badge ${item.rarity}">${item.rarity}</span>${elObj?` <span style="color:${elObj.color};font-size:0.65rem">${elObj.icon}</span>`:''}</div>
        <div style="font-size:0.68rem;color:var(--text-dim)">${item.desc}</div>
      </div>
    </div>`;
  });
  html+=`</div><button class="title-btn" style="width:100%;margin-top:0.75rem" onclick="claimReward(-1)">Skip reward</button>`;
  showModal(html, false);
}

function claimReward(idx) {
  if (idx >= 0 && G._rewardChoices && G._rewardChoices[idx]) {
    addToInventory(cloneItem(G._rewardChoices[idx]));
    logEntry('reward',`Claimed: ${G._rewardChoices[idx].name}!`);
  }
  G._rewardChoices = null;
  document.getElementById('overlay').classList.remove('active');
  G.phase = 'explore';
  G.map[G.playerPos.y][G.playerPos.x].content = 'visited';
  G.inCombat = false;
  if (typeof autoSaveRun === 'function') autoSaveRun();
  updateUI();
}

// ── Inventory use in combat ───────────────────────────────────
function openInventoryUse() {
  const p = G.player;
  if (!p.inventory.length) { logEntry('system','Inventory is empty.'); return; }
  let html = `<div class="modal-title">🎒 Use Item</div>
    <div style="display:flex;flex-direction:column;gap:0.4rem">`;
  p.inventory.forEach((item,i)=>{
    const key = i < 9 ? i + 1 : null; // number keys pick the first nine
    html+=`<button class="title-btn choice-btn" ${key ? `data-key="${key}"` : ''} style="text-align:left" onclick="useItemInCombat(${i})">${key ? `<span class="key-hint">${key}</span>` : ''}${item.icon} ${item.name} — ${item.desc}</button>`;
  });
  html+=`</div><button class="title-btn danger" style="width:100%;margin-top:0.5rem" onclick="closeModal()">Cancel</button>`;
  showModal(html); // Esc cancels
}

// useItemInCombat — using or equipping an item mid-fight takes your turn.
// Items that deal damage just lower HP; checkCombatEnd() decides if the fight
// is over (all pack members dead), never the item itself.
function useItemInCombat(idx) {
  if (!G.inCombat || G.turn !== 'player') return;
  closeModal();
  useItem(idx);
  checkCombatEnd();
  if (G.inCombat) endPlayerTurn();
}

// ── Talent Tree ───────────────────────────────────────────────
function showTalentTree() {
  const p = G.player;
  if (!p) {
    // Read-only preview from the title screen
    const rows = TALENT_TREE.map(t => `<div class="shop-item" style="cursor:default"><div class="shop-item-info">
        <div class="item-name">${t.name} <span style="font-size:0.65rem;color:var(--text-dim)">max ${t.maxRank} · ${t.cost} pt${t.cost>1?'s':''}/rank</span></div>
        <div style="font-size:0.68rem;color:var(--text-dim)">${t.desc}</div></div></div>`).join('');
    showModal(`<div class="modal-title">🌟 Talent Tree</div>
      <div style="font-size:0.7rem;color:var(--text-dim);text-align:center;margin-bottom:0.75rem;font-style:italic">You earn 2 Talent Points per level during a run and spend them here (pause menu → Talents). Talents reset when the run ends.</div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">${rows}</div>
      <button class="title-btn" style="width:100%;margin-top:0.75rem" onclick="closeModal()">Close</button>`);
    return;
  }
  const pts = p.talentPoints||0;
  let html = `<div class="modal-title">🌟 Talent Tree</div>
    <div style="font-size:0.75rem;color:var(--accent-gold);text-align:center;margin-bottom:0.4rem">Points: <strong>${pts}</strong></div>
    <div style="font-size:0.63rem;color:var(--text-dim);text-align:center;margin-bottom:0.75rem;font-style:italic">Resets each run.</div>
    <div style="display:flex;flex-direction:column;gap:0.4rem">`;
  TALENT_TREE.forEach(t=>{
    const rank  = p.talents[t.id]||0;
    const maxed = rank>=t.maxRank;
    html+=`<div class="shop-item" style="${maxed?'border-color:var(--accent-gold)':''}">
      <div class="shop-item-info">
        <div class="item-name">${t.name} <span style="font-size:0.65rem;color:var(--text-dim)">${rank}/${t.maxRank}</span></div>
        <div style="font-size:0.68rem;color:var(--text-dim)">${t.desc}</div>
      </div>
      <button class="buy-btn" ${maxed||pts<t.cost?'disabled':''} onclick="buyTalent('${t.id}')">${maxed?'MAX':'+ '+t.cost}</button>
    </div>`;
  });
  html+=`</div><button class="title-btn" style="width:100%;margin-top:0.75rem" onclick="closeModal()">Close</button>`;
  showModal(html);
}

function buyTalent(id) {
  const t = TALENT_TREE.find(x=>x.id===id); if(!t)return;
  const p = G.player; if(!p)return;
  const rank = p.talents[id]||0;
  if (rank>=t.maxRank||p.talentPoints<t.cost) return;
  p.talentPoints -= t.cost;
  p.talents[id] = rank+1;
  // Apply the difference between the new and old rank as a permanent stat bonus
  if (t.bonus) {
    const now  = t.bonus(rank + 1);
    const prev = rank > 0 ? t.bonus(rank) : {};
    const diff = {};
    for (const k of Object.keys(now)) diff[k] = now[k] - (prev[k] || 0);
    applyPermanentBonuses(p, diff, 1);
  }
  if (t.special === 'undying') p.undying = true;
  logEntry('reward',`Talent: ${t.name} rank ${rank+1}.`);
  showTalentTree();
  updateUI();
}

// ── Shard Emporium ────────────────────────────────────────────
function showShardEmporium() {
  let html = `<div class="modal-title">⚗ Shard Emporium</div>
    <div style="font-size:0.75rem;color:var(--accent-violet-bright);text-align:center;margin-bottom:0.75rem">Soul Shards: <strong>${G.meta.soulShards}</strong></div>
    <div style="display:flex;flex-direction:column;gap:0.4rem">`;
  SHARD_SHOP_ITEMS.forEach(item=>{
    const rank  = getShardShopRank(item.id);
    const maxed = rank>=item.maxRank;
    const reqMet = !item.requires || getShardShopRank(item.requires) >= 1;
    const canBuy = !maxed && G.meta.soulShards>=item.cost && reqMet;
    const reqItem = item.requires ? SHARD_SHOP_ITEMS.find(i=>i.id===item.requires) : null;
    const lockedNote = !reqMet ? `<div style="font-size:0.63rem;color:var(--text-dim);margin-top:2px">🔒 Requires ${reqItem?.name||item.requires}</div>` : '';
    html+=`<div class="shop-item" style="${maxed?'border-color:var(--accent-violet)':''}${!reqMet?';opacity:0.5':''}">
      <div class="shop-item-info">
        <div class="item-name">${item.icon} ${item.name} <span style="font-size:0.65rem;color:var(--text-dim)">${rank}/${item.maxRank}</span></div>
        <div style="font-size:0.68rem;color:var(--text-dim)">${item.desc}</div>
        ${lockedNote}
      </div>
      <button class="buy-btn" ${!canBuy?'disabled':''} onclick="buyShardUpgrade('${item.id}')">${maxed?'MAX':item.cost+'⚗'}</button>
    </div>`;
  });
  html+=`</div><button class="title-btn" style="width:100%;margin-top:0.75rem" onclick="closeModal()">Close</button>`;
  showModal(html);
}

function buyShardUpgrade(id) {
  const item = SHARD_SHOP_ITEMS.find(i=>i.id===id); if(!item)return;
  const rank = getShardShopRank(id);
  if (rank>=item.maxRank||G.meta.soulShards<item.cost) return;
  if (item.requires && getShardShopRank(item.requires) < 1) return; // prerequisite not met
  G.meta.soulShards-=item.cost;
  G.meta.shopUpgrades[id]=(rank+1);
  saveMeta();
  logEntry('reward',`Shard Emporium: ${item.name} upgraded!`);
  showShardEmporium();
  updateUI();
}

// ── World Gen Modal ───────────────────────────────────────────
function showWorldGenModal(onConfirm) {
  const wg = G.worldGen;
  function seg(key, opts, current) {
    return opts.map(o=>`<button class="seg-btn ${current===o?'active':''}" onclick="setWorldGen('${key}','${o}')">${o}</button>`).join('');
  }
  const html = `
    <div class="modal-title">🌍 World Settings</div>
    <div style="font-size:0.7rem;color:var(--text-dim);text-align:center;margin-bottom:0.75rem">Customize this run's dungeon</div>
    <div style="display:flex;flex-direction:column;gap:0.6rem" id="worldgen-inner">
      ${worldGenRow('Room Count',   'roomCount',   ['few','normal','many'],   wg.roomCount)}
      ${worldGenRow('Difficulty',   'difficulty',  ['normal','hard','nightmare'], wg.difficulty)}
      ${worldGenRow('Enemy Density','enemyDensity',['sparse','normal','dense'],  wg.enemyDensity)}
      ${worldGenRow('Treasure Rate','treasureRate',['low','normal','high'],       wg.treasureRate)}
      ${worldGenRow('Map Size',     'mapSize',     ['small','normal','large'],    wg.mapSize)}
    </div>
    <div style="font-size:0.68rem;color:var(--text-dim);margin-top:0.4rem;line-height:1.5">Hard: enemies ×1.3, Soul Shards ×1.25 · Nightmare: enemies ×1.7, Soul Shards ×1.5</div>
    <div style="margin-top:0.6rem">
      <label for="worldgen-seed" style="display:block;font-size:0.7rem;color:var(--text-mid);margin-bottom:3px">Seed <span style="color:var(--text-dim)">(optional: the same seed and settings build the same floors)</span></label>
      <input id="worldgen-seed" class="text-input" type="text" maxlength="16" placeholder="Random" autocomplete="off" spellcheck="false">
    </div>
    <button class="title-btn primary" style="width:100%;margin-top:1rem" onclick="confirmWorldGen()">Descend</button>
    <button class="title-btn" style="width:100%;margin-top:0.4rem" onclick="closeModal()">Cancel</button>`;
  G._worldGenConfirm = onConfirm;
  showModal(html, false);
}

function worldGenRow(label, key, opts, current) {
  return `<div>
    <div style="font-size:0.7rem;color:var(--text-mid);margin-bottom:3px">${label}</div>
    <div class="seg-group">${opts.map(o=>`<button class="seg-btn ${current===o?'active':''}" onclick="setWorldGen('${key}','${o}')">${o}</button>`).join('')}</div>
  </div>`;
}

function setWorldGen(key, val) {
  G.worldGen[key] = val;
  // Re-render without closing
  const inner = document.getElementById('worldgen-inner');
  if (inner) {
    const wg = G.worldGen;
    inner.innerHTML =
      worldGenRow('Room Count',   'roomCount',   ['few','normal','many'],   wg.roomCount)+
      worldGenRow('Difficulty',   'difficulty',  ['normal','hard','nightmare'],wg.difficulty)+
      worldGenRow('Enemy Density','enemyDensity',['sparse','normal','dense'],  wg.enemyDensity)+
      worldGenRow('Treasure Rate','treasureRate',['low','normal','high'],       wg.treasureRate)+
      worldGenRow('Map Size',     'mapSize',     ['small','normal','large'],    wg.mapSize);
  }
}

function confirmWorldGen() {
  const seedInput = document.getElementById('worldgen-seed');
  G._pendingSeed = seedInput ? normaliseSeed(seedInput.value) : null;
  document.getElementById('overlay').classList.remove('active');
  if (G._worldGenConfirm) G._worldGenConfirm();
  G._worldGenConfirm = null;
}

// ── New Game+ Modal ───────────────────────────────────────────
function showNGPlusModal(onConfirm) {
  const cycle = G.meta.ngPlus+1;
  const html = `
    <div class="modal-title" style="color:#9900ff">🔄 New Game+</div>
    <div style="text-align:center;color:var(--text-mid);font-size:0.8rem;margin:0.75rem 0;line-height:1.8">
      You are about to start <strong>NG+ Cycle ${cycle}</strong>.<br>
      Enemies will be <strong style="color:var(--accent-crimson)">${Math.round((1+cycle*0.3)*100)}% stronger</strong>.<br>
      All conquest rewards carry over.
    </div>
    <button class="title-btn primary" style="width:100%;background:var(--accent-violet)" onclick="startNGPlus()">Begin NG+ Cycle ${cycle}</button>
    <button class="title-btn" style="width:100%;margin-top:0.4rem" onclick="closeModal()">Not yet</button>`;
  showModal(html, true);
}

function startNGPlus() {
  G._dailyMode = false;
  G.meta.ngPlus++;
  saveMeta();
  checkAchievements();
  closeModal();
  document.getElementById('overlay').classList.remove('active');
  showScreen('class-select-screen');
}

// ── How To Play ───────────────────────────────────────────────
function openHowToPlay() {
  const html = `
    <div class="modal-title">? How to Play</div>
    <div style="font-size:0.78rem;line-height:1.9;color:var(--text-mid)">
      <b style="color:var(--accent-gold)">Exploration</b><br>
      Move with WASD / arrow keys, the on-screen pad, or tap any revealed tile to walk there. Explore each floor for chests, shops, events and secret rooms, then defeat the floor's guardian (or boss every 5th floor) to unlock the exit ▼. The minimap (M) shows everything you've uncovered; click it to walk there. Auto-explore (X or 🧭) walks to the nearest chest or unexplored ground and stops when an enemy comes into view. In events and boss rewards, number keys pick a choice. If you step on the exit with chests or events still in sight, you're asked before you descend. Each level-up restores a quarter of your HP and MP, and descending restores some too.<br><br>
      <b style="color:var(--accent-gold)">Combat</b><br>
      Each round, SPD decides who acts first. <b>Attack</b> (Q) builds combo and MP, <b>Defend</b> (E) gives shield and MP, <b>Item</b> (R) uses a consumable, <b>Flee</b> (F) escapes ordinary fights (never bosses or guardians). Abilities use keys 1–9. Every hit builds Combo (+10% damage each) and charges <b>Burst</b> (Space). Under its name, a red or green line shows the element matchup (how much you deal and take). Watch the enemy's <i>Next:</i> line to see what it will do and roughly how hard it will hit you (≈45 dmg) — Defend before the big ones.<br><br>
      <b style="color:var(--accent-gold)">Buffs & Debuffs</b><br>
      Effects last the number of turns shown and end with the fight — nothing temporary carries over. Bosses resist executes and shake off stuns quickly.<br><br>
      <b style="color:var(--accent-gold)">Elements</b><br>
      40 elements with a full effectiveness table. Exploit weaknesses for up to 4× damage; enemies use their element against yours too. Gear whose element matches an ability gives +20% (Affinity).<br><br>
      <b style="color:var(--accent-gold)">Items</b><br>
      Find gear in chests, drops, shops and events; equip it from your pack (equipping mid-fight takes your turn). If your pack is full, loot is left on the ground — step back onto the tile to pick it up. Rarity: Common → Uncommon → Rare → Epic → Legendary → Mythical → Divine.<br><br>
      <b style="color:var(--accent-gold)">Progression</b><br>
      Leveling up in a run grants stats (based on your class) and Talent Points, spent in the Talent Tree for this run only. Soul Shards are earned from bosses, events and every death; spend them in the Shard Emporium on permanent upgrades, class unlocks and loadouts. Each class also earns Class XP — master two classes (level 20) to fuse them in the Fusion Lab.<br><br>
      <b style="color:var(--accent-gold)">Saving</b><br>
      Runs auto-save on every floor and after each fight (up to 3 runs at once). Use 💾 Save or <i>Save & Quit</i> from the pause menu (Esc) any time outside combat. Every run has a seed (shown in the pause menu); enter one in World Settings to replay the same floors, or try the 📅 Daily Descent: the same floors for everyone, every day.<br><br>
      <b style="color:var(--accent-gold)">Records</b><br>
      The 🏆 Records screen keeps your lifetime totals, your last 20 runs and 20 achievements, each worth Soul Shards the first time.<br><br>
      <b style="color:var(--accent-gold)">Floor 50</b><br>
      Defeat the Abyssal God to conquer the Abyss and unlock New Game+, where every cycle makes enemies 30% stronger.
    </div>`;
  showModal(html, true);
}

// ── Loadout Select ────────────────────────────────────────────
function openLoadoutModal() {
  const shards  = G.meta.soulShards;
  const current = G.meta.selectedLoadout || 'none';
  const html = `
    <div class="modal-title">🎒 Choose Starting Loadout</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem">
      <span style="color:var(--text-dim);font-size:0.75rem;font-style:italic">Spend Soul Shards for a head start each run.</span>
      <span style="font-family:'Cinzel',serif;font-size:0.85rem;color:var(--accent-teal-bright)">⚗ ${shards} Shards</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">
      ${LOADOUTS.map(lo => {
        const canAfford = shards >= lo.cost || lo.cost === 0;
        const selected  = current === lo.id;
        return `<div onclick="pickLoadout('${lo.id}',${lo.cost})" style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.8rem;border:1px solid ${selected?'var(--accent-gold)':'var(--border)'};background:${selected?'rgba(201,168,76,0.06)':'var(--bg-card)'};cursor:${canAfford?'pointer':'default'};opacity:${canAfford?1:0.5};border-radius:2px;transition:border-color 0.2s">
          <div style="font-size:1.4rem">${lo.icon}</div>
          <div style="flex:1">
            <div style="font-family:'Cinzel',serif;font-size:0.82rem;color:${selected?'var(--accent-gold)':'var(--text-bright)'}">${lo.name}${selected?' ✓':''}</div>
            <div style="font-size:0.7rem;color:var(--text-dim);margin-top:0.15rem">${lo.desc}</div>
          </div>
          <div style="font-size:0.7rem;color:var(--accent-teal-bright);white-space:nowrap">${lo.cost>0?`⚗ ${lo.cost}/run`:'Free'}</div>
        </div>`;
      }).join('')}
    </div>`;
  showModal(html, true);
}

function pickLoadout(id, cost) {
  if (cost > 0 && G.meta.soulShards < cost) return;
  G.meta.selectedLoadout = id;
  saveMeta();
  openLoadoutModal();
}
