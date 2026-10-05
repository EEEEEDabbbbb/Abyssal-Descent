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
//   showClassCollection             — full class roster viewer
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
    ? `<button class="modal-close-btn" onclick="closeModal()">✕</button><div class="modal-body">${html}</div>`
    : `<div class="modal-body">${html}</div>`;
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  if (G.phase==='event'||G.phase==='shop') { G.phase='explore'; updateUI(); }
}

// ── Event dialog ──────────────────────────────────────────────
function showEvent(event, cell, cx, cy) {
  let html = `<div class="modal-title">${event.icon} ${event.name}</div>
    <div style="color:var(--text-mid);font-size:0.8rem;margin-bottom:1rem;font-style:italic">${event.desc}</div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">`;
  event.choices.forEach((ch,i)=>{
    const text = typeof ch.text === 'function' ? ch.text(G.player) : ch.text;
    html+=`<button class="title-btn" onclick="resolveEvent(${i})" style="text-align:left;font-size:0.75rem;padding:0.5rem 0.8rem;min-width:0;max-width:100%;white-space:normal;letter-spacing:0.05em;line-height:1.4">${text}</button>`;
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
  const result = event.choices[idx].effect(G.player);
  if (cell) { cell.content='visited'; cell.event=null; }
  document.querySelector('#overlay-content .modal-body').innerHTML = `
    <div class="modal-title">${event.icon} ${event.name}</div>
    <div style="color:var(--text-mid);font-size:0.9rem;margin:1rem 0;font-style:italic">${result}</div>
    <button class="title-btn primary" style="display:block;width:100%;min-width:0;max-width:100%;margin-top:0.5rem;font-size:0.85rem;padding:0.5rem 1rem" onclick="closeModal()">Continue</button>`;
  G._currentEvent=null;
  updateUI();
}

// ── Shop ──────────────────────────────────────────────────────
function showShop(cell, cx, cy) {
  G._shopCell = cell;
  G._shopPos  = {x:cx,y:cy};
  // Persist shop stock to the cell — only generate once per merchant visit
  if (!cell._shopItems) cell._shopItems = _generateShopItems();
  G._shopItems = cell._shopItems;
  renderShop();
}

function _generateShopItems() {
  const floor = G.floor;
  const items = [];
  // Rarity price multipliers — rarer items cost proportionally more
  const RARITY_PRICE_MULT = {
    common: 1, uncommon: 1.5, rare: 2.5,
    epic: 4, legendary: 7, mythical: 12, divine: 20
  };
  // 3 items + 1 consumable
  for (let i=0;i<3;i++) {
    const item = getRandomItemByFloor(floor);
    const mult = RARITY_PRICE_MULT[item.rarity] || 1;
    const shopPrice = Math.floor((20 + floor*4 + rand(20)) * mult);
    items.push({...item, shopPrice});
  }
  const consIds = [
    'health_potion','mana_crystal','elixir','iron_skin_salve','strength_draught',
    'spring_water','verdant_tonic','earthen_ward','wind_draught','mind_shard',
    'berserker_brew','shadow_dust'
  ];
  const cons = ITEM_POOL.find(it=>it.id===consIds[rand(consIds.length)]);
  if (cons) items.push({...cloneItem(cons), shopPrice:12+rand(10)});
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
      <button class="title-btn" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.7rem;letter-spacing:0.08em" onclick="rerollShop()">🔄 Reroll (15g)</button>
      <button class="title-btn" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.7rem;letter-spacing:0.08em;color:var(--accent-gold)" onclick="openSellMenu()">💰 Sell</button>
      <button class="title-btn danger" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.7rem;letter-spacing:0.08em" onclick="closeShopKeepAlive()">✕ Leave</button>
    </div>`;
  showModal(html, false);
}

function buyShopItem(idx) {
  const p    = G.player;
  const item = G._shopItems[idx];
  if (!item||p.gold<item.shopPrice) return;
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
    const price = Math.max(1, Math.floor((item.shopPrice || estimateItemValue(item)) * 0.5));
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

function sellItemFromMenu(idx) {
  sellItem(idx);
  openSellMenu(); // re-render the sell menu
}

function rerollShop() {
  if (G.player.gold < 15) { logEntry('system','Not enough gold to reroll!'); return; }
  G.player.gold -= 15;
  G._shopItems = _generateShopItems();
  if (G._shopCell) G._shopCell._shopItems = G._shopItems; // persist rerolled stock to cell
  logEntry('system','Shop refreshed for 15g.');
  renderShop();
}

function closeShopKeepAlive() {
  // Closing shop does NOT consume the cell — it stays on the map
  document.getElementById('overlay').classList.remove('active');
  G.phase = 'explore';
  updateUI();
}

// ── Floor reward (boss floors) ───────────────────────────────
function showFloorReward() {
  const choices = [
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
    html+=`<div class="shop-item reward-item" onclick="claimReward(${i})" style="cursor:pointer">
      <div class="shop-item-info">
        <div class="item-name">${item.icon} ${item.name} <span class="item-rarity-badge ${item.rarity}">${item.rarity}</span>${elObj?` <span style="color:${elObj.color};font-size:0.65rem">${elObj.icon}</span>`:''}</div>
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
  updateUI();
}

// ── Inventory use in combat ───────────────────────────────────
function openInventoryUse() {
  const p = G.player;
  if (!p.inventory.length) { logEntry('system','Inventory is empty.'); return; }
  let html = `<div class="modal-title">🎒 Use Item</div>
    <div style="display:flex;flex-direction:column;gap:0.4rem">`;
  p.inventory.forEach((item,i)=>{
    html+=`<button class="title-btn" style="text-align:left" onclick="useItemInCombat(${i})">${item.icon} ${item.name} — ${item.desc}</button>`;
  });
  html+=`</div><button class="title-btn danger" style="width:100%;margin-top:0.5rem" onclick="closeModal()">Cancel</button>`;
  showModal(html, false);
}

function useItemInCombat(idx) {
  closeModal();
  useItem(idx);
  if (G.inCombat) endPlayerTurn();
}

// ── Talent Tree ───────────────────────────────────────────────
function showTalentTree() {
  const p = G.player;
  if (!p) { showModal('<div class="modal-title">🌟 Talent Tree</div><div style="color:var(--text-dim);text-align:center;padding:1rem">Start a run to use the Talent Tree.</div><button class="title-btn" style="width:100%;margin-top:0.75rem" onclick="closeModal()">Close</button>'); return; }
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
  G.meta.ngPlus++;
  saveMeta();
  closeModal();
  document.getElementById('overlay').classList.remove('active');
  showScreen('class-select-screen');
}

// ── How To Play ───────────────────────────────────────────────
function openHowToPlay() {
  const html = `
    <div class="modal-title">? How to Play</div>
    <div style="font-size:0.78rem;line-height:2;color:var(--text-mid)">
      <b style="color:var(--accent-gold)">Exploration</b><br>
      Move through the dungeon with arrow buttons or keyboard arrows. Fog of war hides unexplored areas. Each floor has multiple room types including shops, treasure rooms, events, and boss chambers.<br><br>
      <b style="color:var(--accent-gold)">Combat</b><br>
      Turn-based. You act, then the enemy acts. Use <b>Attack</b> for basic damage, <b>Defend</b> to gain shield + MP, or unleash <b>Abilities</b> for powerful effects. Build <b>Combo</b> to charge your Burst move. <b>Flee</b> based on your SPD vs enemy SPD.<br><br>
      <b style="color:var(--accent-gold)">Abilities</b><br>
      Each class has 5 unique abilities. They cost MP (or HP for advanced skills) and some have cooldowns. Keys 1–5 trigger ability slots in combat. Weapon element matching an ability's element grants +20% damage.<br><br>
      <b style="color:var(--accent-gold)">Elements</b><br>
      20 elements with a full effectiveness table. Deal bonus damage by exploiting weaknesses, or neutral/reduced if resisted. Check enemy element for strategic choices.<br><br>
      <b style="color:var(--accent-gold)">Items</b><br>
      Find gear in chests, drops, shops, and events. Consumables are used instantly. Equipment must be equipped from inventory. Rarity tiers: Common → Uncommon → Rare → Epic → Legendary → Mythical → Divine.<br><br>
      <b style="color:var(--accent-gold)">Meta Progression</b><br>
      Earn Soul Shards on death. Spend them in the Shard Emporium to unlock classes, loadouts, and permanent bonuses. Talent Points earned in-run persist for future runs.<br><br>
      <b style="color:var(--accent-gold)">Boss Floors</b><br>
      Bosses appear at milestone floors and have multiple phases. Defeating the Floor 50 Final Boss unlocks New Game+.
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

// ── Class Collection ──────────────────────────────────────────
function showClassCollection() {
  const unlocked = G.meta.unlockedClasses || [];
  const fused    = G.meta.unlockedFusions || [];
  const levels   = G.meta.classLevels    || {};

  const RARITY_ORDER = ['abyssal','divine','mythical','legendary','epic','rare','uncommon','common'];

  const baseEntries = Object.values(CLASSES).map(cls => ({
    id:       cls.id,
    name:     cls.name,
    icon:     cls.icon,
    color:    cls.color,
    element:  cls.element,
    tagline:  cls.tagline,
    statDisplay: cls.statDisplay || {},
    rarity:   (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[cls.id] : null) || 'common',
    level:    levels[cls.id] || 0,
    unlocked: unlocked.includes(cls.id),
    isFusion: false,
  }));

  // Also include classes that live only in FUSION_CLASSES but were unlocked via unlockedClasses
  // (e.g. abyssal_one added to unlockedClasses on conquest)
  const fusionOnlyIds = Object.keys(typeof FUSION_CLASSES !== 'undefined' ? FUSION_CLASSES : {});
  const extraFused = fusionOnlyIds.filter(id => unlocked.includes(id) && !fused.includes(id));
  const allFusedIds = [...fused, ...extraFused];

  const fusionEntries = allFusedIds.map(id => {
    const cls = (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[id]) || {};
    const rarity = (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[id] : null)
                || cls.rarity || 'rare';
    return {
      id,
      name:        cls.name        || id,
      icon:        cls.icon        || '⚗',
      color:       cls.color       || '#cc00ff',
      element:     cls.element     || '',
      tagline:     cls.tagline     || '',
      statDisplay: cls.statDisplay || {},
      rarity,
      level:       levels[id]      || 0,
      unlocked:    true,
      isFusion:    true,
    };
  });

  // Locked base classes not yet unlocked — show as mystery cards
  const allBase = Object.values(CLASSES);
  const lockedEntries = allBase
    .filter(cls => !unlocked.includes(cls.id))
    .map(cls => ({
      id:       cls.id,
      name:     '???',
      icon:     '?',
      color:    '#555',
      element:  '',
      tagline:  '',
      statDisplay: {},
      rarity:   (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[cls.id] : null) || 'common',
      level:    0,
      unlocked: false,
      isFusion: false,
    }));

  // Deduplicate: fusion entries that are already in CLASSES show up in baseEntries too — skip them
  const baseIds = new Set(baseEntries.map(e => e.id));
  const uniqueFusionEntries = fusionEntries.filter(e => !baseIds.has(e.id));

  const allEntries = [
    ...baseEntries.filter(e => e.unlocked),
    ...uniqueFusionEntries,
    ...lockedEntries,
  ];

  allEntries.sort((a, b) => {
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && !b.unlocked) return -1;
    const ri = RARITY_ORDER.indexOf(a.rarity);
    const rj = RARITY_ORDER.indexOf(b.rarity);
    if (ri !== rj) return ri - rj;
    return a.name.localeCompare(b.name);
  });

  const totalUnlocked = allEntries.filter(e => e.unlocked).length;
  const total         = allEntries.length;

  // Build cards HTML matching the class-select style
  const cardsHtml = allEntries.map(entry => {
    const r     = (typeof RARITY !== 'undefined' && RARITY[entry.rarity]) || { color:'#aaaaaa', name: entry.rarity || 'Common' };
    const elObj = (typeof ELEMENTS !== 'undefined' && entry.element) ? ELEMENTS[entry.element] : null;
    const atMax = entry.level >= 20;

    const statBars = Object.entries(entry.statDisplay).map(([k,v]) => `
      <div style="display:flex;align-items:center;gap:4px;font-size:0.62rem;margin-bottom:2px">
        <span style="width:26px;color:var(--text-dim);flex-shrink:0">${k}</span>
        <div style="flex:1;height:4px;background:var(--border);border-radius:2px;min-width:0">
          <div style="width:${Math.min(100,v*10)}%;height:4px;background:${entry.color};border-radius:2px"></div>
        </div>
      </div>`).join('');

    // Rarity badge — top right corner
    const rarityBadge = `<div style="position:absolute;top:0.5rem;right:0.5rem;
        font-size:0.58rem;font-family:'Cinzel',serif;letter-spacing:0.05em;
        color:${r.color};border:1px solid ${r.color}88;
        background:rgba(0,0,0,0.6);padding:1px 5px;border-radius:2px;
        text-transform:uppercase">${r.name}</div>`;

    if (!entry.unlocked) {
      return `<div class="class-card locked" style="--class-color:#555;position:relative;overflow:hidden;opacity:0.45">
        ${rarityBadge}
        <div class="class-icon" style="font-size:2.5rem;margin-bottom:0.8rem;filter:grayscale(1)">🔒</div>
        <div class="class-name" style="color:var(--text-dim)">???</div>
        <div style="font-size:0.65rem;color:var(--text-dim);font-style:italic;margin-bottom:6px">Not yet discovered</div>
        <div class="class-stat-bars" style="margin-top:auto"></div>
      </div>`;
    }

    const lvlBadge = entry.level > 0
      ? `<div style="position:absolute;bottom:0.5rem;right:0.5rem;font-size:0.6rem;
            color:${atMax?'#ffaa00':'var(--text-dim)'};font-family:'Cinzel',serif">
            ${atMax ? 'Lv.'+entry.level+' ★' : 'Lv.'+entry.level}
          </div>`
      : '';

    const fusionTag = entry.isFusion
      ? `<div style="font-size:0.6rem;color:#cc00ff;margin-bottom:2px">⚗ Fusion</div>`
      : '';

    return `<div class="class-card" style="--class-color:${entry.color};position:relative;overflow:hidden;cursor:default">
      ${rarityBadge}
      ${lvlBadge}
      <div class="class-icon" style="font-size:2.5rem;margin-bottom:0.8rem;text-shadow:0 0 12px ${entry.color}">${entry.icon}</div>
      <div class="class-name" style="color:var(--text-bright)">${entry.name}</div>
      ${elObj ? `<div style="color:${elObj.color};font-size:0.65rem;margin-bottom:2px">${elObj.icon} ${elObj.name}</div>` : ''}
      ${fusionTag}
      <div style="font-size:0.65rem;color:var(--text-mid);font-style:italic;margin-bottom:6px;line-height:1.3">${entry.tagline}</div>
      <div class="class-stat-bars" style="margin-top:auto">${statBars}</div>
    </div>`;
  }).join('');

  const html = `
    <div class="modal-title">📖 Class Collection</div>
    <div style="font-size:0.72rem;color:var(--text-dim);text-align:center;margin-bottom:0.85rem">
      ${totalUnlocked} / ${total} discovered
    </div>
    <div id="collection-grid" style="
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(150px,1fr));
      gap:0.7rem;
      max-height:55vh;
      overflow-y:auto;
      margin-bottom:0.85rem;
      padding-right:2px;
    ">${cardsHtml}</div>
    <div style="display:flex;gap:0.5rem">
      <button class="title-btn" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.75rem" onclick="closeModal();openFusionModal()">⚗ Fusion Lab</button>
      <button class="title-btn" style="flex:1;min-width:0;padding:0.6rem 0.4rem;font-size:0.75rem" onclick="closeModal()">Close</button>
    </div>`;

  showModal(html, true);
}
