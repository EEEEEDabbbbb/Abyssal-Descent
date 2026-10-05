// ══════════════════════════════════════════════════════════════
// PLAYER  (js/engine/player.js)
//
// createPlayer(classId) — builds the player object from scratch each run
//   Reads class data via getClassData() (works for both base and fusion classes)
//   Applies Shard Emporium bonuses, Abyss Ward and conquest gear as PERMANENT
//   stats (see stats.js — p.base vs p.stats).
//   Talents are per-run and start empty; they are bought in-run via buyTalent().
//
// PLAYER OBJECT SHAPE:
//   classId, name, icon, level, xp, gold
//   stats: { hp, maxHp, mp, maxMp, atk, def, spd, crit, critDmg } — live values
//   base:  { maxHp, maxMp, atk, def, spd, crit, critDmg } — permanent values
//   shield: flat damage absorption (not a stat, combat-only buffer)
//   status: [] — active status effects (see status.js)
//   abilities: [] — ability IDs currently on the bar (deduplicated)
//   burstAbility: ID of burst ability
//   passives: [] — passive ability IDs
//   equipment: { weapon: null, armor: null, relic: null }
//   inventory: [] — max INVENTORY_SIZE items
//   cooldowns: { abilityId: turnsRemaining }
//   combo, burstCharge — combat state
//   undying, undyingUsed — Undying talent: survive one lethal hit per run
//   floorWardRemaining, floorWardBonus — Abyss Ward: +DEF for the first 3 floors
//   nextAttackMult, nextAttackGuaranteed, nextAttackLifesteal — one-shot combat flags
//   nextAbilityFree / nextAbilityFreeCount — free ability casts
//   _swappedAbilitySet / _swapAbilities — active weapon-arts swap (element + ids)
//
// INVENTORY:
//   addToInventory(item)  — returns true if added; when full, the item is
//                           left on the ground at the player's position
//   pickUpDroppedItems()  — picks up items on the player's cell (mapgen.js)
//   openItemMenu(idx)     — context menu (use/equip/sell/drop)
//   dropItem(idx)         — places the item on the current map cell
//   sellItem(idx)         — requires G.phase==='shop', gives 50% of item value
//
// EQUIPMENT:
//   equipItem(item, idx)  — swaps bonuses (permanent stats), weapon arts, granted abilities
//   unequipItem(slot)     — reverses bonuses, returns item to inventory
//   refreshPlayerAbilities(p) — rebuilds p.abilities from class/weapon arts/weapon grants
//
// LOADOUTS:
//   applyLoadout(player) — reads G.meta.selectedLoadout, gives starting items/gold
// ══════════════════════════════════════════════════════════════

const INVENTORY_SIZE = 12;

// Burst abilities live on the Burst button, never on the ability bar
function notBurst(id) { return !(ABILITIES[id] && ABILITIES[id].costType === 'burst'); }

function createPlayer(classId) {
  const clsData = getClassData(classId);
  if (!clsData) throw new Error(`Class data for "${classId}" is not loaded`);
  const cls = deepCopy(clsData);
  const m   = G.meta;
  const shardBonuses = getShardShopBonuses();
  const classAbilities = [...new Set(cls.abilities || [])].filter(notBurst);

  const cooldowns = {};
  classAbilities.forEach(abId => { cooldowns[abId] = 0; });
  if (cls.burstAbility) cooldowns[cls.burstAbility] = 0;

  const player = {
    classId,
    name:  cls.name,
    icon:  cls.icon,
    level: 1,
    xp:    0,
    gold:  shardBonuses.startGold || 0,
    stats: { ...cls.stats, critDmg: 0 },
    shield:     0,
    status:     [],
    abilities:  classAbilities,
    _baseAbilities: [...classAbilities],
    _baseElement:   getPrimaryElement(cls),
    burstAbility: cls.burstAbility || null,
    passives:   cls.passives || [],
    equipment:  { weapon:null, armor:null, relic:null },
    inventory:  [],
    cooldowns,
    combo:       0,
    burstCharge: 0,
    damageTakenCombat: 0,
    talentPoints:  0,
    talents:       {}, // ⚠️ single-run only — bought with in-run talent points
    undying:       false,
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
  initBaseStats(player);

  // Shard Emporium stat upgrades are permanent for the whole run
  for (const [k, v] of Object.entries(shardBonuses)) {
    if (STAT_KEYS.includes(k)) addPermanentStat(player, k, v);
  }
  player.stats.hp = player.stats.maxHp;
  player.stats.mp = player.stats.maxMp;

  if (player.floorWardBonus > 0) {
    addPermanentStat(player, 'def', player.floorWardBonus);
    logEntry('system', `⚗ Abyss Ward active: +${player.floorWardBonus} DEF for 3 floors.`);
  }

  // Abyssal Pact (Shard Emporium) — grant starting item at highest unlocked rarity
  const pactRarity = shardBonuses.startItemRarity;
  if (pactRarity) player.inventory.push(getRandomItem(pactRarity));

  // Conquest permanent gear
  if (m.conquestRewards?.permanentGear) {
    const gear = CONQUEST_GEAR.find(g => g.id === m.conquestRewards.permanentGear);
    if (gear) {
      equipItem_silent(player, cloneItem(gear));
      logEntry('reward', `👑 ${gear.name} equipped (permanent conquest gear).`);
    }
  }

  return player;
}

// ── Inventory ────────────────────────────────────────────────
function inventoryFull(p = G.player) {
  return !p || p.inventory.length >= INVENTORY_SIZE;
}

// addToInventory — returns true if the item went into the bag. If the bag is
// full the item is left on the ground where the player stands (pick it up
// again by stepping back onto the tile), so loot is never silently lost.
function addToInventory(item) {
  const p = G.player;
  if (!p || !item) return false;
  if (p.inventory.length < INVENTORY_SIZE) {
    p.inventory.push(item);
    return true;
  }
  const cell = G.map && G.playerPos && G.map[G.playerPos.y] && G.map[G.playerPos.y][G.playerPos.x];
  if (cell) {
    (cell.droppedItems = cell.droppedItems || []).push(item);
    logEntry('system', `🎒 Inventory full — ${item.name} was left on the ground here.`);
  } else {
    logEntry('system', `🎒 Inventory full — ${item.name} was lost.`);
  }
  return false;
}

// pickUpDroppedItems — called when the player steps onto a tile with items on it
function pickUpDroppedItems(cell) {
  const p = G.player;
  if (!p || !cell || !cell.droppedItems || !cell.droppedItems.length) return;
  const picked = [];
  while (cell.droppedItems.length && p.inventory.length < INVENTORY_SIZE) {
    const item = cell.droppedItems.shift();
    p.inventory.push(item);
    picked.push(item.name);
  }
  if (picked.length) logEntry('reward', `🎒 Picked up: ${picked.join(', ')}.`);
  if (cell.droppedItems.length) logEntry('system', `🎒 Inventory full — ${cell.droppedItems.length} item(s) still on the ground.`);
  else delete cell.droppedItems;
}

function openItemMenu(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item) return;
  if (G.inCombat) {
    // In combat: using or equipping an item takes your turn
    if (G.turn === 'player') useItemInCombat(idx);
    return;
  }
  // Out of combat — show context menu
  const isEquippable = ['weapon','armor','relic'].includes(item.type);
  const isConsumable = item.type === 'consumable';
  const atMerchant   = G.phase === 'shop' && G._shopCell;
  const sellPrice    = atMerchant ? getSellPrice(item) : 0;

  let html = `<div class="modal-title">${item.icon} ${item.name}</div>
    <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:0.75rem">${item.desc}</div>
    ${isEquippable ? renderItemComparison(item) : ''}
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

// renderItemComparison — stat differences vs the item currently in that slot
function renderItemComparison(item) {
  const p = G.player;
  const slot = item.slot || item.type;
  const cur = p.equipment[slot];
  const keys = new Set([...Object.keys(item.bonuses || {}), ...Object.keys(cur?.bonuses || {})]);
  if (!keys.size) return '';
  const label = { maxHp:'Max HP', maxMp:'Max MP', atk:'ATK', def:'DEF', spd:'SPD', crit:'CRIT', critDmg:'Crit DMG' };
  const rows = [...keys].map(k => {
    const d = ((item.bonuses || {})[k] || 0) - ((cur?.bonuses || {})[k] || 0);
    const color = d > 0 ? '#44ff88' : d < 0 ? 'var(--accent-crimson-bright)' : 'var(--text-dim)';
    return `<span style="color:${color}">${label[k] || k} ${d > 0 ? '+' : ''}${d}</span>`;
  }).join(' · ');
  return `<div style="font-size:0.68rem;margin-bottom:0.6rem">vs ${cur ? cur.name : 'empty slot'}: ${rows}</div>`;
}

// getSellPrice — merchants pay a quarter of what they'd charge for the item
// on this floor (so selling stays worthwhile deeper down)
function getSellPrice(item) {
  return Math.max(1, Math.floor(gearShopPrice(item.rarity) * 0.25));
}

function dropItem(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item) return;
  if (G.map && G.playerPos) {
    const cell = G.map[G.playerPos.y][G.playerPos.x];
    (cell.droppedItems = cell.droppedItems || []).push(item);
  }
  p.inventory.splice(idx, 1);
  logEntry('system', `Dropped: ${item.name}. (Step off and back on to pick it up.)`);
  updateUI();
}

function sellItem(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item || G.phase !== 'shop') return;
  const price = getSellPrice(item);
  p.inventory.splice(idx, 1);
  p.gold += price;
  logEntry('reward', `Sold ${item.name} for ${price}g.`);
  updateUI();
}

function unequipItem(slot) {
  const p = G.player;
  const item = p.equipment[slot];
  if (!item || item.permanent) return;
  if (p.inventory.length >= INVENTORY_SIZE) { logEntry('system', 'Inventory full! Cannot unequip.'); return; }
  applyPermanentBonuses(p, item.bonuses, -1);
  p.equipment[slot] = null;
  if (slot === 'weapon') { p._swappedAbilitySet = null; p._swapAbilities = null; }
  refreshPlayerAbilities(p);
  p.inventory.push(item);
  logEntry('system', `Unequipped: ${item.name}.`);
  updateUI();
}

function useItem(idx) {
  const p = G.player;
  const item = p.inventory[idx];
  if (!item) return;
  if (item.type === 'consumable') {
    if (typeof item.use !== 'function') { logEntry('system', `${item.name} has no effect.`); return; }
    p.inventory.splice(idx, 1);
    item.use(p, G.enemy);
    updateUI();
  } else if (['weapon','armor','relic'].includes(item.type)) {
    equipItem(item, idx);
  }
}

function equipItem(item, idx) {
  const p    = G.player;
  const slot = item.slot || item.type;
  const old  = p.equipment[slot];

  if (old && old.permanent) {
    logEntry('system', `${old.name} cannot be removed — it is bound to you.`);
    return;
  }

  p.inventory.splice(idx, 1);
  if (old) {
    applyPermanentBonuses(p, old.bonuses, -1);
    p.inventory.push(old);
  }
  applyPermanentBonuses(p, item.bonuses, 1);
  p.equipment[slot] = item;

  if (slot === 'weapon') {
    // Drop the previous weapon's arts first; the new weapon may offer its own
    p._swappedAbilitySet = null;
    p._swapAbilities = null;
    refreshPlayerAbilities(p);
    const granted = (item.grantAbilities || []).filter(a => ABILITIES[a]).map(a => ABILITIES[a].name);
    if (granted.length) logEntry('reward', `⚔ ${item.name} grants: ${granted.join(', ')}!`);

    const swapSet = getWeaponArts(p, item);
    if (swapSet) {
      const swapLabel = swapSet.label || (item.element + ' Arts');
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
    }
  }

  logEntry('reward', `Equipped: ${item.name}.`);
  if (item.rarity === 'divine') unlockAchievement('divine_gear');
  updateUI();
}

// Element order must match the order used to build the HYBRID_WEAPON_ARTS keys
// in abilities.js. Keys are always built as lowerIndex_higherIndex.
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
// For fusion classes we walk fusedFrom[0] → its base class element,
// so a Nuclear+Fire fusion using an Ice weapon gets nuclear_ice.
function getPrimaryElement(cls) {
  if (!cls) return null;
  if (cls.fusedFrom && cls.fusedFrom.length > 0) {
    const parentCls = getClassData(cls.fusedFrom[0]);
    return getPrimaryElement(parentCls) || cls.element;
  }
  return cls.element;
}

// getWeaponArts — the ability set a weapon would swap in, or null
function getWeaponArts(p, weapon) {
  const weaponEl = weapon && weapon.element;
  const classEl  = p._baseElement || getPrimaryElement(getClassData(p.classId));
  if (!weaponEl || weaponEl === 'normal' || weaponEl === classEl) return null;
  const swapSet = (typeof HYBRID_WEAPON_ARTS !== 'undefined' && HYBRID_WEAPON_ARTS[makeHybridKey(classEl, weaponEl)])
    || (typeof WEAPON_ELEMENT_ABILITIES !== 'undefined' && WEAPON_ELEMENT_ABILITIES[weaponEl]);
  if (!swapSet || !swapSet.abilities) return null;
  const valid = [...new Set(swapSet.abilities.filter(a => ABILITIES[a]))];
  return valid.length ? { ...swapSet, abilities: valid } : null;
}

function applyWeaponElementSwap(p, weapon) {
  const swapSet = getWeaponArts(p, weapon);
  if (!swapSet) return;
  p._swappedAbilitySet = weapon.element;
  p._swapAbilities = swapSet.abilities;
  refreshPlayerAbilities(p);
  logEntry('reward', `⚔ ${weapon.name} unlocks ${swapSet.label || weapon.element + ' Arts'}! Abilities replaced.`);
}

// refreshPlayerAbilities — ability bar = (weapon arts OR class kit) + weapon grants
function refreshPlayerAbilities(p) {
  const cls = getClassData(p.classId);
  const classAbilities = p._baseAbilities || [...new Set(cls ? cls.abilities : p.abilities)];
  const core = p._swapAbilities && p._swapAbilities.length ? p._swapAbilities : classAbilities;
  const granted = ((p.equipment.weapon && p.equipment.weapon.grantAbilities) || []).filter(a => ABILITIES[a]);
  p.abilities = [...new Set([...core, ...granted])].filter(notBurst);
  p.abilities.forEach(a => { if (p.cooldowns[a] === undefined) p.cooldowns[a] = 0; });
}

function equipItem_silent(p, item) {
  const slot = item.slot || item.type;
  applyPermanentBonuses(p, item.bonuses, 1);
  p.equipment[slot] = item;
  p.inventory = p.inventory.filter(i => i !== item);
  if (slot === 'weapon') refreshPlayerAbilities(p);
}

function applyLoadout(player) {
  const id = G.meta.selectedLoadout || 'none';
  const lo = LOADOUTS.find(l => l.id === id);
  if (!lo || id === 'none') return;
  if (lo.cost > 0) {
    if (G.meta.soulShards < lo.cost) {
      logEntry('system', `🎒 ${lo.name} skipped — not enough Soul Shards (${lo.cost} needed).`);
      return;
    }
    G.meta.soulShards -= lo.cost;
    saveMeta();
  }
  const give = (itemId) => {
    const def = ITEM_POOL.find(i => i.id === itemId);
    if (def) addToInventory(cloneItem(def));
    return def;
  };
  switch (id) {
    case 'warrior_kit':
      give('health_potion');
      player.gold += 20;
      logEntry('reward',"Warrior's Kit: Blood Flask + 20 gold.");
      break;
    case 'mage_kit':
      give('mana_crystal');
      give('bone_staff');
      logEntry('reward',"Arcanist's Satchel: Mana Crystal + Bone Staff.");
      break;
    case 'survivor_kit':
      give('health_potion');
      give('health_potion');
      player.gold += 10;
      logEntry('reward',"Survivor's Bundle: 2× Blood Flask + 10 gold.");
      break;
    case 'relic_cache': {
      const epic = getRandomItem('epic');
      addToInventory(epic);
      logEntry('reward',`Relic Cache: ${epic.name} found!`);
      break;
    }
    case 'blessed_arms': {
      const def = ITEM_POOL.find(i => i.id === 'shadow_dagger');
      if (def) {
        equipItem_silent(player, cloneItem(def));
        logEntry('reward','Blessed Arms: Shadow Dagger equipped!');
      }
      break;
    }
  }
}
