// ══════════════════════════════════════════════════════════════
// GAME STATE & CONSTANTS
// ══════════════════════════════════════════════════════════════

const GAME_VERSION = '2.3.0';
const FLOOR_COUNT = 50;
const RUNE_CHARS = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];

// Map dimensions per floor (nonlinear scaling)
// Early floors are intentionally generous — more space = more corridors and branching
function getMapDims(floor) {
  // floors 1-7:  32-42  (big early maps, lots to explore)
  // floors 8-20: 42-58
  // floors 21-35:58-72
  // floors 36-50:72-88
  if (floor <= 7)  { const t=(floor-1)/6;  return { w:Math.round(32+t*10), h:Math.round(32+t*10) }; }
  if (floor <= 20) { const t=(floor-8)/12; return { w:Math.round(42+t*16), h:Math.round(42+t*16) }; }
  if (floor <= 35) { const t=(floor-21)/14;return { w:Math.round(58+t*14), h:Math.round(58+t*14) }; }
  const t=(floor-36)/14; return { w:Math.round(72+t*16), h:Math.round(72+t*20) };
}

// Room count per floor (scales with map size and world gen setting)
// Early floors get more rooms to reward exploration
function getRoomCount(floor, setting='normal') {
  const base = floor <= 7  ? { min:10, max:16 }
             : floor <= 20 ? { min:12, max:18 }
             : floor <= 35 ? { min:15, max:22 }
             :                { min:18, max:28 };
  const mult = { few:0.65, normal:1.0, many:1.4 }[setting] || 1.0;
  return {
    min: Math.round(base.min * mult),
    max: Math.round(base.max * mult),
  };
}

// defaultMeta — persistent cross-run progress (saved to localStorage by
// saveMeta/loadMeta in utils.js). Add new fields here; loadMeta() merges old
// saves over these defaults.
function defaultMeta() {
  return {
    soulShards:      0,
    shopUpgrades:    {},
    unlockedClasses: ['shadowblade','ironclad'],
    selectedLoadout: null,
    maxFloor:        0,
    ngPlus:          0,   // New Game+ cycle count
    conquestRewards: {    // unlocked by defeating Floor 50 Final Boss
      conquered:        false,
      title:            false,
      permanentGear:    null,
      ngPlusUnlocked:   false,
      shardDumpClaimed: false,
    },
    // ── Fusion system ──
    classLevels:          {},   // { classId: classLevel } — from class XP, persists across runs
    classXP:              {},   // { classId: xp toward next class level }
    unlockedFusions:      [],   // fusion class IDs permanently unlocked
    knownFusionRecipes:   [],   // canonical '+'-joined keys of revealed recipes
    defeatedSecretBosses: [],   // secret boss IDs defeated at least once
    // ── Records (records.js) ──
    achievements: {},           // { achievementId: timestamp earned }
    runHistory:   [],           // last 20 finished runs, newest first
    daily:        null,         // { key:'YYYYMMDD', best, runs } for today's Daily Descent
    tipsSeen:     {},           // { tipId: timestamp } one-time hints already shown (records.js showTip)
    lifetime: { runs:0, deaths:0, conquests:0, kills:0, bosses:0, shards:0, playMs:0, dmgDealt:0, bestHit:0 },
  };
}

let G = {
  player: null,
  // ── MULTI-ENEMY COMBAT ──────────────────────────────────────
  // G.enemies is the real backing array — one or more independent enemy
  // actors in the current fight. G.targetIndex is which one the player has
  // currently selected to attack. G.enemy below is kept as a computed
  // ALIAS for the currently-targeted enemy — every pre-existing call site
  // across abilities.js/items.js/status.js/combat.js that reads or writes
  // G.enemy keeps working completely unchanged, because for a normal
  // single-enemy fight G.enemies is just a 1-element array and G.enemy
  // resolves to that one enemy exactly as before. Bosses/guardians are
  // NEVER placed in a pack — see mapgen.js — so anything boss-specific can
  // keep assuming a single enemy safely.
  enemies: [],
  targetIndex: 0,
  get enemy() {
    if (!this.enemies || !this.enemies.length) return null;
    const t = this.enemies[this.targetIndex];
    if (t && t.hp > 0) return t;
    // Targeted enemy is dead/missing — auto-retarget to the next alive one
    // so every existing damage/ability/item call site keeps working without
    // having to know anything about targeting.
    const aliveIdx = this.enemies.findIndex(en => en.hp > 0);
    if (aliveIdx >= 0) { this.targetIndex = aliveIdx; return this.enemies[aliveIdx]; }
    return this.enemies[0] || null; // all dead — fallback during teardown
  },
  set enemy(val) {
    if (val === null || val === undefined) { this.enemies = []; this.targetIndex = 0; }
    else { this.enemies = [val]; this.targetIndex = 0; }
  },
  floor:  1,
  map:    null,
  mapW:   20,
  mapH:   20,
  playerPos: { x:0, y:0 },
  phase: 'explore', // 'explore','combat','event','reward','shop','chest','worldgen'
  turn:  'player',
  inCombat:    false,
  combatRound: 0,
  // _pendingSecondActor: which side (player/enemy) still owes an action this
  // round under the SPD-driven initiative system. Set by
  // resolveNextRoundInitiative() in combat.js — see that function's comment.
  _pendingSecondActor: null,
  log: [],
  meta: defaultMeta(),
  // ── Per-run secret boss flag (resets each run, not persisted) ──
  _secretBossTriggeredThisRun: false,
  selectedClass: null,
  killedBoss:    false,
  exitPos:       null,

  // World gen settings (set per run via pre-run modal)
  worldGen: {
    roomCount:    'normal',   // few / normal / many
    difficulty:   'normal',   // normal / hard / nightmare
    enemyDensity: 'normal',   // sparse / normal / dense
    treasureRate: 'normal',   // low / normal / high
    mapSize:      'normal',   // small / normal / large
  },
  daily: null,                // 'YYYYMMDD' while playing a Daily Descent

  // Combat internals
  _currentAbilityMagic: false,
  _weaponAffinity: 1.0,
  _enemyTurnDelay: 600,
  _rewardChoices: null,

  // Combo system
  // combo is stored on G.player.combo (int)
  // burstCharge: 0-5, at 5 burst is available
};
