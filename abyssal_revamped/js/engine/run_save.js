// ══════════════════════════════════════════════════════════════
// RUN SAVE SYSTEM — mid-run persistence across tab closes
//
// Saves the full run state (player, map, floor, inventory, etc.)
// into localStorage as one of RUN_SLOT_COUNT named slots.
//
// Keys:
//   abyssal_run_slots  — JSON array of slot metadata (name, floor, class, timestamp)
//   abyssal_run_<n>    — full serialised run state for slot n
//
// Public API:
//   saveRun(slotIndex)       — save current run to a slot (default: this run's slot)
//   autoSaveRun()            — save to this run's slot if it has one (silent)
//   loadRun(slotIndex)       — restore G state from a slot (async)
//   deleteRunSlot(slotIndex) — wipe a slot
//   getRunSlots()            — array of slot metadata objects (null = empty)
//   hasAnyRunSave()          — true if at least one slot has a save
//   assignRunSlot()          — called by startRun(): claims the first EMPTY slot
//                              for the new run, or none if all are full (the run
//                              then only saves when the player picks a slot)
//   clearActiveRunSave()     — on death / abandon / victory
//
// WHAT IS SAVED
//   Everything on the player except active statuses (runs always resume in
//   exploration, with live stats reset to p.base). Items lose their `use`
//   functions in JSON, so rehydrateItem() rebuilds them from ITEM_POOL by id.
//   Map cells are stored compactly (untouched wall tiles as 0); events are
//   stored as an index into EVENTS. Packs (cell.enemies), dropped items,
//   secret rooms and secret-boss state are all kept.
// ══════════════════════════════════════════════════════════════

const RUN_SAVE_VERSION = 2;
const RUN_SLOT_COUNT   = 3;
const LS_SLOTS_KEY     = 'abyssal_run_slots';
const LS_RUN_KEY       = (n) => `abyssal_run_${n}`;

// ── Slot metadata ──────────────────────────────────────────────
function getRunSlots() {
  try {
    const raw = localStorage.getItem(LS_SLOTS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const out = [];
    for (let i = 0; i < RUN_SLOT_COUNT; i++) out.push(arr[i] || null);
    return out;
  } catch(e) { return Array(RUN_SLOT_COUNT).fill(null); }
}

function _saveSlotMeta(slotIndex, meta) {
  const arr = getRunSlots();
  arr[slotIndex] = meta;
  localStorage.setItem(LS_SLOTS_KEY, JSON.stringify(arr));
}

function hasAnyRunSave() {
  return getRunSlots().some(s => s !== null);
}

// ── Items ──────────────────────────────────────────────────────
// Items saved to JSON lose their functions (consumable `use`). Rebuild them
// from the item definition, keeping per-copy fields (shopPrice, etc.).
function findItemDef(id) {
  return ITEM_POOL.find(i => i.id === id) || CONQUEST_GEAR.find(i => i.id === id) || null;
}
function rehydrateItem(saved) {
  if (!saved) return saved;
  const def = findItemDef(saved.id);
  return def ? { ...def, ...saved } : saved;
}

// ── Map cells ──────────────────────────────────────────────────
const CELL_DEFAULTS = { type:'wall', revealed:false, visited:false, content:null };

function _serialiseCell(cell) {
  const out = {};
  for (const [k, v] of Object.entries(cell)) {
    if (k === 'event') continue;
    if (v === undefined || typeof v === 'function') continue;
    if (k in CELL_DEFAULTS && CELL_DEFAULTS[k] === v) continue;
    out[k] = v;
  }
  if (cell.event && typeof EVENTS !== 'undefined') out.eventIndex = EVENTS.indexOf(cell.event);
  return Object.keys(out).length ? out : 0;
}

function _deserialiseCell(saved) {
  const cell = { ...CELL_DEFAULTS, ...(saved || {}) };
  if (cell.eventIndex !== undefined) {
    if (cell.eventIndex >= 0 && EVENTS[cell.eventIndex]) cell.event = EVENTS[cell.eventIndex];
    delete cell.eventIndex;
  }
  if (cell.item) cell.item = rehydrateItem(cell.item);
  if (cell._shopItems) cell._shopItems = cell._shopItems.map(rehydrateItem);
  if (cell.droppedItems) cell.droppedItems = cell.droppedItems.map(rehydrateItem);
  return cell;
}

// ── Serialise the current run ──────────────────────────────────
function _serialiseRun() {
  const p = G.player;
  if (!p) return null;

  // Statuses (with their closures) aren't saved; save stats as they'll be
  // after those statuses are gone: the permanent base plus current HP/MP.
  const player = JSON.parse(JSON.stringify({ ...p, status: [] }));
  if (p.base) {
    STAT_KEYS.forEach(k => { player.stats[k] = p.base[k]; });
    player.stats.hp = Math.min(player.stats.hp, player.stats.maxHp);
    player.stats.mp = Math.min(player.stats.mp, player.stats.maxMp);
  }

  return {
    version:    RUN_SAVE_VERSION,
    savedAt:    Date.now(),
    floor:      G.floor,
    playerPos:  { ...G.playerPos },
    exitPos:    G.exitPos ? { ...G.exitPos } : null,
    killedBoss: G.killedBoss,
    worldGen:   { ...G.worldGen },
    seed:       G.seed || null,
    daily:      G.daily || null,
    rngState:   typeof G.rngState === 'number' ? G.rngState : null,
    selectedClass: G.selectedClass || p.classId,
    log:        G.log.slice(0, 30),
    _secretBossTriggeredThisRun: G._secretBossTriggeredThisRun,
    _pendingSecretBoss: G._pendingSecretBoss || null,
    _secretBossCell:    G._secretBossCell ? { ...G._secretBossCell } : null,
    player,
    map:        G.map ? G.map.map(row => row.map(_serialiseCell)) : null,
    mapW:       G.mapW,
    mapH:       G.mapH,
  };
}

// ensureClassLoaded — fusion class data lives in lazy-loaded files
async function ensureClassLoaded(classId) {
  if (!classId || getClassData(classId)) return;
  const fileNum = typeof FUSION_CLASS_FILE !== 'undefined' ? FUSION_CLASS_FILE[classId] : null;
  if (fileNum) await loadFusionFile(fileNum);
}

// ── Deserialise and restore G ──────────────────────────────────
async function _deserialiseRun(data) {
  if (!data || data.version !== RUN_SAVE_VERSION || !data.player) return false;

  await ensureAbilitiesLoaded();
  await ensureClassLoaded(data.player.classId);
  if (!getClassData(data.player.classId)) return false;

  const p = data.player;
  p.status = [];
  p.inventory = (p.inventory || []).map(rehydrateItem);
  for (const slot of ['weapon', 'armor', 'relic']) p.equipment[slot] = rehydrateItem(p.equipment[slot]);
  p.cooldowns = p.cooldowns || {};
  if (!p.base) initBaseStats(p);
  resetTemporaryStats(p);

  G.player     = p;
  G.map        = data.map ? data.map.map(row => row.map(_deserialiseCell)) : null;
  G.mapW       = data.mapW;
  G.mapH       = data.mapH;
  G.floor      = data.floor;
  G.phase      = 'explore';
  G.turn       = 'player';
  G.inCombat   = false;
  G.enemy      = null;
  G.playerPos  = data.playerPos;
  G.exitPos    = data.exitPos || null;
  G.killedBoss = data.killedBoss || false;
  G.worldGen   = data.worldGen || G.worldGen;
  G.daily = data.daily || null;
  if (data.seed && typeof data.rngState === 'number') { G.seed = data.seed; G.rngState = data.rngState; }
  else seedRun(); // saves from before seeds existed get a fresh one
  G.selectedClass = data.selectedClass || p.classId;
  G.log        = data.log || [];
  G._secretBossTriggeredThisRun = data._secretBossTriggeredThisRun || false;
  G._pendingSecretBoss = data._secretBossTriggeredThisRun ? data._pendingSecretBoss : null;
  G._secretBossCell    = data._secretBossCell || null;
  G._currentEvent  = null;
  G._rewardChoices = null;
  G._gameOverShown = false;
  _lastLogLength = -1;
  applyBiomeTheme(G.floor);
  return true;
}

// ── Public: save current run ───────────────────────────────────
// Returns true on success. Never saves mid-combat.
function saveRun(slotIndex) {
  if (!G.player || G.inCombat) return false;
  if (slotIndex === undefined || slotIndex === null) slotIndex = G._runSaveSlot;
  if (slotIndex === undefined || slotIndex === null) return false;
  slotIndex = Math.max(0, Math.min(RUN_SLOT_COUNT - 1, slotIndex));

  if (_playClockStart) flushPlayClock();  // bank play time into runStats
  const data = _serialiseRun();
  if (!data) return false;
  try {
    localStorage.setItem(LS_RUN_KEY(slotIndex), JSON.stringify(data));
    _saveSlotMeta(slotIndex, {
      slot:       slotIndex,
      classId:    G.player.classId,
      className:  G.player.name,
      classIcon:  G.player.icon || '?',
      floor:      G.floor,
      timestamp:  data.savedAt,
      label:      `Floor ${G.floor} · ${G.player.name}`,
    });
  } catch(e) {
    console.warn('[save] run save failed', e);
    if (!G._saveFailWarned) {
      G._saveFailWarned = true;
      logEntry('system', '⚠ Could not save the run — browser storage may be full or disabled.');
    }
    return false;
  }
  G._runSaveSlot = slotIndex;
  return true;
}

// Silent auto-save — only into the slot this run owns
function autoSaveRun() {
  if (G._runSaveSlot === undefined || G._runSaveSlot === null) return false;
  return saveRun(G._runSaveSlot);
}

// assignRunSlot — a new run claims the first empty slot; it never takes over
// a slot that holds another run.
function assignRunSlot() {
  const empty = getRunSlots().findIndex(s => s === null);
  G._runSaveSlot = empty >= 0 ? empty : null;
  if (G._runSaveSlot === null) {
    logEntry('system', '💾 All save slots are full — this run will not auto-save. Use 💾 Save to choose a slot to overwrite.');
  }
}

// ── Public: load a run slot ────────────────────────────────────
async function loadRun(slotIndex) {
  try {
    const raw = localStorage.getItem(LS_RUN_KEY(slotIndex));
    if (!raw) return false;
    const ok = await _deserialiseRun(JSON.parse(raw));
    if (!ok) return false;
    G._runSaveSlot = slotIndex;
    startPlayClock();
    return true;
  } catch(e) {
    console.warn('[save] run load failed', e);
    return false;
  }
}

// ── Public: delete a slot ──────────────────────────────────────
function deleteRunSlot(slotIndex) {
  try {
    localStorage.removeItem(LS_RUN_KEY(slotIndex));
    _saveSlotMeta(slotIndex, null);
  } catch(e) {}
  if (G._runSaveSlot === slotIndex && !G.player) G._runSaveSlot = null;
}

// ── Public: clear the save for the active run ─────────────────
// Called on death, abandon and floor 50 clear so the slot doesn't linger.
function clearActiveRunSave() {
  if (G._runSaveSlot !== undefined && G._runSaveSlot !== null) {
    deleteRunSlot(G._runSaveSlot);
  }
  G._runSaveSlot = null;
}
