// ══════════════════════════════════════════════════════════════
// PLAYER  (js/engine/player.js)
//
// createPlayer(classId) — builds the player object from scratch each run
//   Reads class data via getClassData() (works for both base and fusion classes)
//   Applies talent bonuses (getTalentBonuses) and shard shop bonuses (getShardShopBonuses)
//   Sets up cooldowns dict: { abilityId: 0 } for all class abilities + burst
//   Applies conquest permanent gear (abyssal_crown) if previously earned
//   Returns complete player object — stored in G.player
//
// PLAYER OBJECT SHAPE:
//   classId, name, icon, level, xp, gold
//   stats: { hp, maxHp, mp, maxMp, atk, def, spd, crit, critDmg }
//   shield: flat damage absorption (not a stat, combat-only buffer)
//   status: [] — active status effects (see status.js for tickStatus)
//   abilities: [] — ability IDs from class definition
//   burstAbility: ID of burst ability
//   passives: [] — passive ability IDs (max 1 for base classes, 2 for fusions)
//   equipment: { weapon: null, armor: null, relic: null }
//   inventory: [] — max 12 items
//   cooldowns: { abilityId: turnsRemaining }
//   combo, burstCharge — combat state
//   undying, undyingUsed — talent flag for surviving lethal hit
//   floorWardRemaining, floorWardBonus — shard shop defense buff for first 3 floors
//   nextAttackMult, nextAttackGuaranteed, nextAttackLifesteal — one-shot flags consumed in combat
//   nextAbilityFree — static_charge passive flag
//   divineMantleActive — divine mantle relic flag (20% MP cost reduction)
//
// INVENTORY:
//   addToInventory(item)  — adds item, max 12 slots, logs if full
//   openItemMenu(idx)     — context menu (use/equip/sell/drop); in-combat limits to use only
//   dropItem(idx)         — removes from inventory, places on current map cell
//   sellItem(idx)         — requires G.phase==='shop', gives 50% of item value
//   estimateItemValue(item) — fallback pricing by rarity tier if no shopPrice
//
// EQUIPMENT:
//   equipItem(item, idx)  — removes old item bonuses, applies new item bonuses
//                           handles weapon element ability swap (applyWeaponElementSwap)
//                           handles weapon-granted bonus abilities (grantAbilities field)
//   unequipItem(slot)     — reverses bonuses, returns item to inventory
//   equipItem_silent(p, item) — equip without log messages (used by applyLoadout)
//   applyWeaponElementSwap(p, weapon) — swaps ability set when weapon element ≠ class element
//     Uses WEAPON_ELEMENT_ABILITIES table; p._swappedAbilitySet tracks active swap
//
// LOADOUTS:
//   applyLoadout(player) — reads G.meta.selectedLoadout, gives starting items/gold
//   Loadout ids: 'none', 'warrior_kit', 'mage_kit', 'survivor_kit', 'relic_cache', 'blessed_arms'
//   Cost paid once per run from soulShards in saveMeta()
// ══════════════════════════════════════════════════════════════

function createPlayer(classId) {
  const cls = deepCopy(getClassData(classId));
  const m   = G.meta;

  const bonuses      = getTalentBonuses();
  const shardBonuses = getShardShopBonuses();

  const stats = { ...cls.stats, critDmg:0 };

  // Apply talent bonuses
  for (const [k,v] of Object.entries(bonuses)) {
    if (k==='maxHp') { stats.maxHp+=v; stats.hp=Math.min(stats.maxHp,stats.hp+v); }
    else if (k==='maxMp') { stats.maxMp+=v; stats.mp=Math.min(stats.maxMp,stats.mp+v); }
    else if (k in stats) stats[k]+=v;
  }
  // Apply shard shop bonuses
  for (const [k,v] of Object.entries(shardBonuses)) {
    if (k==='maxHp') { stats.maxHp+=v; stats.hp=Math.min(stats.maxHp,stats.hp+v); }
    else if (k==='maxMp') { stats.maxMp+=v; stats.mp=Math.min(stats.maxMp,stats.mp+v); }
    else if (k in stats) stats[k]+=v;
  }

  const cooldowns = {};
  cls.abilities.forEach(abId => { cooldowns[abId] = 0; });
  if (cls.burstAbility) cooldowns[cls.burstAbility] = 0;

  const player = {
    classId,
    name:  cls.name,
    icon:  cls.icon,
    level: 1,
    xp:    0,
    gold:  shardBonuses.startGold || 0,
    stats,
    shield:     0,
    status:     [],
    abilities:  cls.abilities,
    burstAbility: cls.burstAbility || null,
    passives:   cls.passives || [],
    equipment:  { weapon:null, armor:null, relic:null },
    inventory:  [],
    cooldowns,
    combo:       0,
    burstCharge: 0,
    damageTakenCombat: 0,
    talentPoints:  0,
    talents:       {}, // ⚠️ single-run only — resets each run, NOT from G.meta.talents
    undying:       m.talents['undying'] >= 1,
    undyingUsed:   false,
    floorWardRemaining: shardBonuses.floorWard ? 3 : 0,
    floorWardBonus:     shardBonuses.floorWard || 0,
    nextAttackMult:       null,
    nextAttackGuaranteed: false,
    nextAttackLifesteal:  false,
    nextAbilityFree:      false,
    nextAbilityFreeCount: 0,
    nextNAttackBonus:     1.0,
    nextNAttackCount:     0,
    nextNAttackCrit:      false,
    nextNAttackPierce:    false,
    divineMantleActive:   false,
  };

  if (player.floorWardBonus > 0) {
    player.stats.def += player.floorWardBonus;
    logEntry('system', `⚗ Abyss Ward active: +${player.floorWardBonus} DEF for 3 floors.`);
  }

  // Abyssal Pact (Shard Emporium) — grant starting item at highest unlocked rarity
  const pactRarity = getShardShopBonuses().startItemRarity;
  if (pactRarity) addToInventory(getRandomItem(pactRarity));

  // Apply conquest permanent gear if it exists
  if (m.conquestRewards?.permanentGear) {
    const gear = CONQUEST_GEAR.find(g => g.id === m.conquestRewards.permanentGear);
    if (gear) {
      const g = cloneItem(gear);
      if (g.bonuses) {
        for (const [k,v] of Object.entries(g.bonuses)) {
          if (k==='maxHp') { player.stats.maxHp+=v; player.stats.hp=Math.min(player.stats.maxHp,player.stats.hp+v); }
          else if (k==='maxMp') { player.stats.maxMp+=v; player.stats.mp=Math.min(player.stats.maxMp,player.stats.mp+v); }
          else if (k in player.stats) player.stats[k]+=v;
        }
      }
      player.equipment.relic = g;
      logEntry('reward', `👑 Crown of the Abyss equipped (permanent conquest gear).`);
    }
  }

  return player;
}

function getTalentBonuses() {
  const bonuses = {};
  const talents = (G.player && G.player.talents) ? G.player.talents : {};
  TALENT_TREE.forEach(t => {
    const rank = talents[t.id] || 0;
    if (rank > 0 && t.bonus) {
      const b = t.bonus(rank);
      for (const [k,v] of Object.entries(b)) bonuses[k] = (bonuses[k]||0) + v;
    }
  });
  return bonuses;
}

// ── Inventory ────────────────────────────────────────────────
function addToInventory(item) {
  const p = G.player;
  if (!p) return;
  if (p.inventory.length >= 12) {
    logEntry('system', 'Inventory full! Drop something first.');
    return;
  }
  p.inventory.push(item);
}

function openItemMenu(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item) return;
  if (G.inCombat && G.turn === 'player') {
    // In combat: only consumables can be used, no drop/sell
    if (item.type === 'consumable') {
      useItemInCombat(idx);
    } else {
      useItem(idx); // equip
    }
    return;
  }
  // Out of combat — show context menu
  const isEquippable = ['weapon','armor','relic'].includes(item.type);
  const isConsumable = item.type === 'consumable';
  const atMerchant   = G.phase === 'shop' && G._shopCell;
  const sellPrice    = atMerchant ? Math.max(1, Math.floor((item.shopPrice || estimateItemValue(item)) * 0.5)) : 0;

  let html = `<div class="modal-title">${item.icon} ${item.name}</div>
    <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:0.75rem">${item.desc}</div>
    <div style="display:flex;flex-direction:column;gap:0.4rem">`;

  if (isConsumable) {
    html += `<button class="title-btn primary" onclick="closeModal();useItem(${idx})">${item.icon} Use</button>`;
  } else if (isEquippable) {
    html += `<button class="title-btn primary" onclick="closeModal();useItem(${idx})">⚔ Equip</button>`;
  }

  if (atMerchant) {
    html += `<button class="title-btn" style="color:var(--accent-gold)" onclick="closeModal();sellItem(${idx})">💰 Sell for ${sellPrice}g</button>`;
  }

  html += `<button class="title-btn danger" onclick="closeModal();dropItem(${idx})">🗑 Drop</button>`;
  html += `<button class="title-btn" onclick="closeModal()">Cancel</button>`;
  html += `</div>`;
  showModal(html, true);
}

function estimateItemValue(item) {
  const rarityBase = {common:10,uncommon:18,rare:30,epic:50,legendary:80,mythical:120,divine:180};
  return rarityBase[item.rarity] || 10;
}

function dropItem(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item) return;
  // Place item on current map cell
  if (G.map && G.playerPos) {
    const cell = G.map[G.playerPos.y][G.playerPos.x];
    if (!cell.droppedItems) cell.droppedItems = [];
    cell.droppedItems.push(item);
  }
  p.inventory.splice(idx, 1);
  logEntry('system', `Dropped: ${item.name}.`);
  updateUI();
}

function sellItem(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item || G.phase !== 'shop') return;
  const price = Math.max(1, Math.floor((item.shopPrice || estimateItemValue(item)) * 0.5));
  p.inventory.splice(idx, 1);
  p.gold += price;
  logEntry('reward', `Sold ${item.name} for ${price}g.`);
  updateUI();
}

function unequipItem(slot) {
  const p = G.player;
  const item = p.equipment[slot];
  if (!item || item.permanent) return;
  if (p.inventory.length >= 12) { logEntry('system', 'Inventory full! Cannot unequip.'); return; }
  // Remove bonuses
  if (item.bonuses) {
    for (const [k,v] of Object.entries(item.bonuses)) {
      if (k==='maxHp') { p.stats.maxHp-=v; p.stats.hp=Math.min(p.stats.hp,p.stats.maxHp); }
      else if (k==='maxMp') { p.stats.maxMp-=v; p.stats.mp=Math.min(p.stats.mp,p.stats.maxMp); }
      else if (k in p.stats) p.stats[k]-=v;
    }
  }
  // Remove weapon ability swaps
  if (slot === 'weapon' && item.grantedAbilities) {
    p.abilities = p.abilities.filter(a => !item.grantedAbilities.includes(a));
    item.grantedAbilities.forEach(a => { delete p.cooldowns[a]; });
  }
  if (slot === 'weapon' && p._swappedAbilitySet) {
    const cls = getClassData(p.classId);
    p.abilities = [...cls.abilities];
    p._swappedAbilitySet = null;
  }
  p.equipment[slot] = null;
  p.inventory.push({ ...item });
  logEntry('system', `Unequipped: ${item.name}.`);
  updateUI();
}

function useItem(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item) return;
  if (item.type === 'consumable') {
    if (item.use) item.use(p);
    p.inventory.splice(idx, 1);
    updateUI();
  } else if (['weapon','armor','relic'].includes(item.type)) {
    equipItem(item, idx);
  }
}

function equipItem(item, idx) {
  const p    = G.player;
  const slot = item.slot || item.type;
  const old  = p.equipment[slot];

  // Unequip old item first — remove its bonuses
  if (old) {
    if (old.bonuses) {
      for (const [k,v] of Object.entries(old.bonuses)) {
        if (k==='maxHp') { p.stats.maxHp-=v; p.stats.hp=Math.min(p.stats.hp,p.stats.maxHp); }
        else if (k==='maxMp') { p.stats.maxMp-=v; p.stats.mp=Math.min(p.stats.mp,p.stats.maxMp); }
        else if (k in p.stats) p.stats[k]-=v;
      }
    }
    // Remove any bonus abilities granted by old weapon
    if (old.grantedAbilities) {
      p.abilities = p.abilities.filter(a => !old.grantedAbilities.includes(a));
      old.grantedAbilities.forEach(a => { delete p.cooldowns[a]; });
    }
    if (!old.permanent) p.inventory.push({ ...old });
  }

  // Apply new item bonuses
  if (item.bonuses) {
    for (const [k,v] of Object.entries(item.bonuses)) {
      if (k==='maxHp') { p.stats.maxHp+=v; p.stats.hp=Math.min(p.stats.maxHp,p.stats.hp+v); }
      else if (k==='maxMp') { p.stats.maxMp+=v; p.stats.mp=Math.min(p.stats.maxMp,p.stats.mp+v); }
      else if (k in p.stats) p.stats[k]+=v;
    }
  }

  p.equipment[slot] = item;
  p.inventory.splice(idx, 1);

  // ── Weapon element ability swap ──────────────────────────────
  if (slot === 'weapon' && typeof WEAPON_ELEMENT_ABILITIES !== 'undefined') {
    const cls      = getClassData(p.classId);
    const weaponEl = item.element;
    const classEl  = cls ? getPrimaryElement(cls) : null;
    const hybridKey = makeHybridKey(classEl, weaponEl);
    const hybridSet = (typeof HYBRID_WEAPON_ARTS !== 'undefined') && HYBRID_WEAPON_ARTS[hybridKey];
    const swapSet  = hybridSet || (weaponEl && WEAPON_ELEMENT_ABILITIES[weaponEl]);
    const wouldSwap = swapSet && swapSet.abilities && weaponEl !== 'normal' && weaponEl !== classEl;

    if (wouldSwap) {
      const swapLabel = swapSet.label || (weaponEl + ' Arts');
      showModal(`
        <div class="modal-title">⚔ Weapon Arts</div>
        <div style="text-align:center;margin:0.75rem 0;font-size:0.85rem;color:var(--text-dim)">
          <strong style="color:var(--accent-gold)">${item.name}</strong> offers
          <strong style="color:var(--accent-violet-bright)">${swapLabel}</strong>.<br><br>
          Replace your current abilities with this weapon's arts?<br>
          <span style="font-size:0.72rem;color:var(--text-dim)">(Unequip &amp; re-equip to change your mind later.)</span>
        </div>
        <div style="display:flex;gap:0.5rem;margin-top:0.75rem">
          <button class="buy-btn" style="flex:1;background:var(--accent-violet)" onclick="closeModal();applyWeaponElementSwap(G.player,G.player.equipment.weapon);updateUI()">Yes — Swap</button>
          <button class="buy-btn" style="flex:1" onclick="closeModal()">No — Keep Mine</button>
        </div>
      `);
    } else {
      applyWeaponElementSwap(p, item);
    }
  }

  // ── Weapon-granted bonus abilities ──────────────────────────
  if (slot === 'weapon' && item.grantAbilities) {
    const granted = [];
    item.grantAbilities.forEach(abId => {
      if (ABILITIES[abId] && !p.abilities.includes(abId)) {
        p.abilities.push(abId);
        p.cooldowns[abId] = 0;
        granted.push(ABILITIES[abId].name);
      }
    });
    if (granted.length > 0) logEntry('reward', `⚔ ${item.name} grants: ${granted.join(', ')}!`);
    item.grantedAbilities = item.grantAbilities;
  }

  logEntry('reward', `Equipped: ${item.name}.`);
  updateUI();
}

// Element order must match the order in master_gen.js / abilities.js lookup table.
// Keys are always built as lowerIndex_higherIndex so we need to sort consistently.
const ELEMENT_ORDER = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy','wind','sound','light','cosmic','crystal','nuclear','tech','spirit','magma','storm','time','space','gravity','plasma','void','blood','rune','glass','slime','cyber','magnet'];
function makeHybridKey(a, b) {
  // Shadow combos are always stored as shadow_X (shadowblade hand-written set)
  if (a === 'shadow' || b === 'shadow') {
    const other = a === 'shadow' ? b : a;
    return 'shadow_' + other;
  }
  const ai = ELEMENT_ORDER.indexOf(a), bi = ELEMENT_ORDER.indexOf(b);
  // Unknown elements go last; if both unknown, alphabetical
  if (ai === -1 && bi === -1) return a < b ? a+'_'+b : b+'_'+a;
  if (ai === -1) return b+'_'+a;
  if (bi === -1) return a+'_'+b;
  return ai <= bi ? a+'_'+b : b+'_'+a;
}

// Resolve the primary element for hybrid key lookup.
// For base classes this is just cls.element.
// For fusion classes we walk fusedFrom[0] → its base class element,
// so a Nuclear+Fire fusion using an Ice weapon gets nuclear_ice, not nuclearcinder_ice.
function getPrimaryElement(cls) {
  if (!cls) return null;
  // If the element is a known single-word base element, use it directly
  if (cls.fusedFrom && cls.fusedFrom.length > 0) {
    const parentId = cls.fusedFrom[0];
    const parentCls = getClassData(parentId);
    // Walk up recursively in case parent is also a fusion
    return getPrimaryElement(parentCls) || cls.element;
  }
  return cls.element;
}

function applyWeaponElementSwap(p, weapon) {
  const cls = getClassData(p.classId);
  const weaponEl = weapon ? weapon.element : null;
  // For fusion classes that may not be loaded yet, fall back to player's stored element/abilities
  const classEl  = cls ? getPrimaryElement(cls) : p._baseElement;
  const baseAbilities = cls ? cls.abilities : p._baseAbilities;

  // Cache base abilities and element on first equip so we can restore later even if cls is unloaded
  if (!p._baseAbilities) p._baseAbilities = [...p.abilities];
  if (!p._baseElement)   p._baseElement   = classEl;

  // Restore base class abilities first (strip any previous swap)
  if (p._swappedAbilitySet) {
    p.abilities = [...baseAbilities];
    p._swappedAbilitySet = null;
    baseAbilities.forEach(a => { if (p.cooldowns[a] === undefined) p.cooldowns[a] = 0; });
  }

  if (!weaponEl || weaponEl === 'normal' || weaponEl === classEl) return;

  // Check hybrid arts first (class × weapon specific), then fall back to generic weapon arts
  const hybridKey = makeHybridKey(classEl, weaponEl);
  const swapSet = (typeof HYBRID_WEAPON_ARTS !== 'undefined' && HYBRID_WEAPON_ARTS[hybridKey])
    || WEAPON_ELEMENT_ABILITIES[weaponEl];
  if (!swapSet || !swapSet.abilities) return;

  const validAbils = swapSet.abilities.filter(a => ABILITIES[a]);
  if (validAbils.length === 0) return;

  p.abilities = [...validAbils];
  p._swappedAbilitySet = weaponEl;
  validAbils.forEach(a => { if (p.cooldowns[a] === undefined) p.cooldowns[a] = 0; });

  logEntry('reward', `⚔ ${weapon.name} unlocks ${swapSet.label}! Abilities replaced.`);
}


function equipItem_silent(p, item) {
  const slot = item.slot || item.type;
  if (item.bonuses) {
    for (const [k,v] of Object.entries(item.bonuses)) {
      if (k==='maxHp') { p.stats.maxHp+=v; p.stats.hp=Math.min(p.stats.maxHp,p.stats.hp+v); }
      else if (k==='maxMp') { p.stats.maxMp+=v; p.stats.mp=Math.min(p.stats.maxMp,p.stats.mp+v); }
      else if (k in p.stats) p.stats[k]+=v;
    }
  }
  p.equipment[slot] = item;
  p.inventory = p.inventory.filter(i => i !== item);
}

function applyLoadout(player) {
  const id = G.meta.selectedLoadout || 'none';
  const lo = LOADOUTS.find(l => l.id === id);
  if (!lo || id === 'none') return;
  if (lo.cost > 0) {
    if (G.meta.soulShards < lo.cost) return;
    G.meta.soulShards -= lo.cost;
    saveMeta();
  }
  switch (id) {
    case 'warrior_kit':
      addToInventory(cloneItem(ITEM_POOL.find(i=>i.id==='health_potion')));
      player.gold += 20;
      logEntry('reward',"Warrior's Kit: Blood Flask + 20 gold.");
      break;
    case 'mage_kit': {
      addToInventory(cloneItem(ITEM_POOL.find(i=>i.id==='mana_crystal')));
      const bs = cloneItem(ITEM_POOL.find(i=>i.id==='bone_staff'));
      addToInventory(bs);
      logEntry('reward',"Arcanist's Satchel: Mana Crystal + Bone Staff.");
      break;
    }
    case 'survivor_kit':
      addToInventory(cloneItem(ITEM_POOL.find(i=>i.id==='health_potion')));
      addToInventory(cloneItem(ITEM_POOL.find(i=>i.id==='health_potion')));
      player.gold += 10;
      logEntry('reward',"Survivor's Bundle: 2× Blood Flask + 10 gold.");
      break;
    case 'relic_cache': {
      const rare = getRandomItem('rare');
      addToInventory(rare);
      logEntry('reward',`Relic Cache: ${rare.name} found!`);
      break;
    }
    case 'blessed_arms': {
      const dagger = cloneItem(ITEM_POOL.find(i=>i.id==='shadow_dagger'));
      addToInventory(dagger);
      equipItem_silent(player, dagger);
      logEntry('reward','Blessed Arms: Shadow Dagger equipped!');
      break;
    }
  }
}
