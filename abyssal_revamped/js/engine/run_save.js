// ══════════════════════════════════════════════════════════════
// RUN SAVE SYSTEM — mid-run persistence across tab closes
//
// Saves the full run state (player, map, floor, inventory, etc.)
// into localStorage as one of 3 named slots.
//
// Keys:
//   abyssal_run_slots  — JSON array of slot metadata (name, floor, class, timestamp)
//   abyssal_run_<n>    — full serialised run state for slot n (0, 1, 2)
//
// Public API:
//   saveRun()                — save current run to its slot (or auto-pick next available)
//   loadRun(slotIndex)       — restore G state from a slot and resume the game
//   deleteRunSlot(slotIndex) — wipe a slot
//   getRunSlots()            — return array of 3 slot metadata objects (null = empty)
//   hasAnyRunSave()          — true if at least one slot has a save
//   autoSaveRun()            — saveRun() but silent (no UI feedback)
//
// Called from:
//   nextFloor()      — auto-save on every floor transition
//   winCombat()      — auto-save after every combat
//   game-screen UI   — manual save button
// ══════════════════════════════════════════════════════════════

const RUN_SAVE_VERSION = 1;
const RUN_SLOT_COUNT   = 3;
const LS_SLOTS_KEY     = 'abyssal_run_slots';
const LS_RUN_KEY       = (n) => `abyssal_run_${n}`;

// ⚠️  SERIALISATION GOTCHAS — read before modifying:
//   1. p.abilities    — array of ID strings, NOT objects. Save/restore as-is.
//                       DO NOT call resolveAbility() on load; engine expects strings.
//   2. p.equipment    — { weapon, armor, relic } object. Old saves had flat keys
//                       (equippedWeapon etc.) — those are dead, use p.equipment.*
//   3. cell.event     — contains functions (choice effects); cannot JSON.stringify.
//                       Saved as eventIndex (index into EVENTS array). Re-hydrated
//                       on load via EVENTS[cell.eventIndex].
//   4. cell.enemy/item — saved as shallow copies. Boss phases, pattern state etc.
//                        are reconstructed — bosses reset to full on reload.
//   5. Fusion classes  — fusion class files are lazy-loaded. After loadRun(),
//                        preloadPlayerFusions() is called to ensure class data exists
//                        before renderClassSelect() runs.
//   6. Existing saves   written before any structural change to _serialiseRun are STALE.
//                        Delete them via the continue modal's Delete Slot button.
//
// ── Slot metadata ──────────────────────────────────────────────
// Returns array of 3 items; each is null (empty) or:
//   { slot, classId, className, classIcon, floor, timestamp, label }
function getRunSlots() {
  try {
    const raw = localStorage.getItem(LS_SLOTS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const out = [];
    for (let i = 0; i < RUN_SLOT_COUNT; i++) {
      out.push(arr[i] || null);
    }
    return out;
  } catch(e) { return [null, null, null]; }
}

function _saveSlotMeta(slotIndex, meta) {
  try {
    const arr = getRunSlots();
    arr[slotIndex] = meta;
    localStorage.setItem(LS_SLOTS_KEY, JSON.stringify(arr));
  } catch(e) {}
}

function hasAnyRunSave() {
  return getRunSlots().some(s => s !== null);
}

// ── Serialise the current run ──────────────────────────────────
// We deep-clone G.player and G.map, stripping out any function
// references (ability use() fns are looked up by id on load).
function _serialiseRun() {
  const p = G.player;
  if (!p) return null;

  // Serialise map — only store revealed/visited tiles and their content.
  // Full tile objects are plain data so we can JSON them directly.
  const mapSnapshot = G.map ? G.map.map(row => row.map(cell => ({
    type:     cell.type,
    revealed: cell.revealed,
    visited:  cell.visited,
    content:  cell.content || null,
    room:     cell.room,
    // Preserve shop stock on cells so merchant doesn't restock on load
    _shopItems: cell._shopItems ? cell._shopItems.map(i => ({...i})) : undefined,
    // Preserve enemy and item references so combat/treasure still work after load
    enemy: cell.enemy ? {...cell.enemy} : undefined,
    item:  cell.item  ? {...cell.item}  : undefined,
    // Events contain functions so save by index and re-look up on load
    eventIndex: (cell.event && typeof EVENTS !== 'undefined') ? EVENTS.indexOf(cell.event) : undefined,
  }))) : null;

  const playerSnapshot = {
    classId:     p.classId,
    name:        p.name,
    icon:        p.icon,
    element:     p.element,
    color:       p.color,
    level:       p.level,
    xp:          p.xp,
    stats:       {...p.stats},
    baseStats:   {...p.baseStats},
    // Abilities stored as ID strings
    abilityIds:  [...(p.abilities || [])],
    burstId:     p.burstAbility || null,
    passiveIds:  p.passives || [],
    inventory:   p.inventory.map(i => ({...i})),
    equippedWeapon: p.equipment?.weapon ? {...p.equipment.weapon} : null,
    equippedArmor:  p.equipment?.armor  ? {...p.equipment.armor}  : null,
    equippedAccessory: p.equipment?.relic ? {...p.equipment.relic} : null,
    gold:        p.gold,
    combo:       p.combo || 0,
    burstCharge: p.burstCharge || 0,
    talentPoints: p.talentPoints || 0,
    talents:     p.talents || {},
    // Class-specific run state
    _executeThreshold:  p._executeThreshold,
    _stormCharge:       p._stormCharge,
    _dominionStacks:    p._dominionStacks,
    _convergenceForm:   p._convergenceForm,
    // Ward
    floorWardRemaining: p.floorWardRemaining || 0,
    floorWardBonus:     p.floorWardBonus     || 0,
  };

  return {
    version:    RUN_SAVE_VERSION,
    savedAt:    Date.now(),
    floor:      G.floor,
    phase:      'explore', // always resume in explore — never mid-combat
    playerPos:  {...G.playerPos},
    exitPos:    G.exitPos ? {...G.exitPos} : null,
    killedBoss: G.killedBoss,
    worldGen:   {...G.worldGen},
    log:        G.log.slice(0, 30), // last 30 log lines
    _secretBossTriggeredThisRun: G._secretBossTriggeredThisRun,
    player:     playerSnapshot,
    map:        mapSnapshot,
    mapW:       G.mapW,
    mapH:       G.mapH,
  };
}

// ── Deserialise and restore G ──────────────────────────────────
async function _deserialiseRun(data) {
  if (!data || data.version !== RUN_SAVE_VERSION) return false;

  const p = data.player;

  // Ensure fusion class data is loaded if needed (covers both fusion and secret classes)
  if (p.classId && !CLASSES[p.classId] && !(typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[p.classId]) && typeof FUSION_FILE_LOOKUP !== 'undefined') {
    const fileNums = new Set();
    for (const [key, fileNum] of Object.entries(FUSION_FILE_LOOKUP)) {
      if (key.split('+').includes(p.classId)) fileNums.add(fileNum);
    }
    await Promise.all([...fileNums].map(n => loadFusionFile(n)));
  }

  // Abilities are ID strings — restore directly (ABILITIES lookup happens at use-time)
  const abilities    = p.abilityIds || [];
  const burstAbility = p.burstId    || null;

  // Reconstruct player object
  G.player = {
    classId:     p.classId,
    name:        p.name,
    icon:        p.icon,
    element:     p.element,
    color:       p.color,
    level:       p.level,
    xp:          p.xp,
    stats:       {...p.stats},
    baseStats:   {...p.baseStats},
    abilities,
    burstAbility,
    passives:    p.passiveIds || [],
    inventory:   p.inventory  || [],
    equipment: {
      weapon: p.equippedWeapon    || null,
      armor:  p.equippedArmor     || null,
      relic:  p.equippedAccessory || null,
    },
    gold:        p.gold    || 0,
    combo:       p.combo   || 0,
    burstCharge: p.burstCharge || 0,
    talentPoints: p.talentPoints || 0,
    talents:     p.talents || {},
    status:      [],
    cooldowns:   {},
    floorWardRemaining: p.floorWardRemaining || 0,
    floorWardBonus:     p.floorWardBonus     || 0,
    // Class-specific run state
    _executeThreshold: p._executeThreshold,
    _stormCharge:      p._stormCharge,
    _dominionStacks:   p._dominionStacks,
    _convergenceForm:  p._convergenceForm,
  };

  // Restore map
  G.map = data.map || null;
  G.mapW = data.mapW || 20;
  G.mapH = data.mapH || 20;

  // Re-hydrate event objects from saved index (functions can't survive JSON)
  if (G.map && typeof EVENTS !== 'undefined') {
    G.map.forEach(row => row.forEach(cell => {
      if (cell.eventIndex !== undefined && cell.eventIndex >= 0) {
        cell.event = EVENTS[cell.eventIndex];
      }
    }));
  }

  // Restore run state
  G.floor      = data.floor;
  G.phase      = 'explore';
  G.turn       = 'player';
  G.inCombat   = false;
  G.enemy      = null;
  G.playerPos  = data.playerPos  || { x: 1, y: 1 };
  G.exitPos    = data.exitPos    || null;
  G.killedBoss = data.killedBoss || false;
  G.worldGen   = data.worldGen   || G.worldGen;
  G.log        = data.log        || [];
  G._secretBossTriggeredThisRun = data._secretBossTriggeredThisRun || false;
  G._currentEvent = null;
  G._rewardChoices = null;

  return true;
}

// ── Public: save current run ───────────────────────────────────
// slotIndex: 0-2. If omitted, uses the slot this run was loaded
// from (G._runSaveSlot), or the first empty slot, or slot 0.
function saveRun(slotIndex) {
  if (!G.player) return false;
  // Don't save mid-combat — wait for the clean state
  if (G.inCombat) return false;

  const data = _serialiseRun();
  if (!data) return false;

  if (slotIndex === undefined || slotIndex === null) {
    slotIndex = G._runSaveSlot ?? _nextAvailableSlot();
  }
  slotIndex = Math.max(0, Math.min(RUN_SLOT_COUNT - 1, slotIndex));
  G._runSaveSlot = slotIndex;

  try {
    localStorage.setItem(LS_RUN_KEY(slotIndex), JSON.stringify(data));
  } catch(e) { return false; }

  const cls = CLASSES[G.player.classId]
    || (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[G.player.classId])
    || {};
  _saveSlotMeta(slotIndex, {
    slot:       slotIndex,
    classId:    G.player.classId,
    className:  G.player.name,
    classIcon:  G.player.icon || cls.icon || '?',
    floor:      G.floor,
    timestamp:  data.savedAt,
    label:      `Floor ${G.floor} · ${G.player.name}`,
  });

  return true;
}

// Silent auto-save — no UI side effects
function autoSaveRun() {
  saveRun();
}

// ── Public: load a run slot ────────────────────────────────────
async function loadRun(slotIndex) {
  try {
    const raw = localStorage.getItem(LS_RUN_KEY(slotIndex));
    if (!raw) return false;
    const data = JSON.parse(raw);
    const ok = await _deserialiseRun(data);
    if (!ok) return false;
    G._runSaveSlot = slotIndex;
    return true;
  } catch(e) { return false; }
}

// ── Public: delete a slot ──────────────────────────────────────
function deleteRunSlot(slotIndex) {
  try {
    localStorage.removeItem(LS_RUN_KEY(slotIndex));
    const arr = getRunSlots();
    arr[slotIndex] = null;
    localStorage.setItem(LS_SLOTS_KEY, JSON.stringify(arr));
  } catch(e) {}
}

// ── Public: clear the save for the active run ─────────────────
// Called on death or floor 50 clear so the slot doesn't linger.
function clearActiveRunSave() {
  if (G._runSaveSlot !== undefined && G._runSaveSlot !== null) {
    deleteRunSlot(G._runSaveSlot);
    G._runSaveSlot = null;
  }
}

// ── Helpers ───────────────────────────────────────────────────
function _nextAvailableSlot() {
  const slots = getRunSlots();
  const empty = slots.findIndex(s => s === null);
  return empty >= 0 ? empty : 0; // overwrite slot 0 if all full
}
