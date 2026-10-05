// ══════════════════════════════════════════════════════════════
// FUSION SYSTEM — Class Fusion, Rarities, Secret Bosses
// ══════════════════════════════════════════════════════════════

// ── RARITY TIERS ─────────────────────────────────────────────
const RARITY = {
  common:    { id:'common',    name:'Common',    color:'#aaaaaa', glow:'#888888', stars:1 },
  uncommon:  { id:'uncommon',  name:'Uncommon',  color:'#55cc55', glow:'#33aa33', stars:2 },
  rare:      { id:'rare',      name:'Rare',      color:'#4488ff', glow:'#2266dd', stars:3 },
  epic:      { id:'epic',      name:'Epic',      color:'#aa44ff', glow:'#8822dd', stars:4 },
  legendary: { id:'legendary', name:'Legendary', color:'#ffaa00', glow:'#dd8800', stars:5 },
  mythical:  { id:'mythical',  name:'Mythical',  color:'#ff4488', glow:'#dd1166', stars:6 },
  divine:    { id:'divine',    name:'Divine',    color:'#88ffff', glow:'#44dddd', stars:7 },
  abyssal:   { id:'abyssal',   name:'Abyssal',   color:'#cc00ff', glow:'#9900cc', stars:9 },
  secret:    { id:'secret',    name:'Secret',    color:'#ff6600', glow:'#cc4400', stars:8 },
};

// ── CLASS RARITY ASSIGNMENTS ──────────────────────────────────
// Base 36 classes (35 + Nullbringer) redistributed across tiers
const CLASS_RARITY = {
  // COMMON — simple kits, starter classes
  shadowblade:    'common',
  ironclad:       'common',
  pyromancer:     'common',
  geomancer:      'common',
  sentinel:       'common',
  beastmaster:    'common',

  // UNCOMMON — one signature mechanic
  stormcaller:    'uncommon',
  bloodknight:    'uncommon',
  runeblade:      'uncommon',
  tidecaller:     'uncommon',
  windwalker:     'uncommon',
  warlord:        'uncommon',
  gravewarden:    'uncommon',

  // RARE — clear synergy loops, element depth
  frostweaver:    'rare',
  paladin:        'rare',
  dragonknight:   'rare',
  soulweaver:     'rare',
  necromancer:    'rare',
  lightbringer:   'rare',
  spellsword:     'rare',
  soundbreaker:   'rare',
  magnetist:      'rare',

  // EPIC — multi-system kits, high skill ceiling
  gravitist:      'epic',
  plaguedoctor:   'epic',
  voidmancer:     'epic',
  techsavant:     'epic',
  chronomancer:   'epic',
  hexblade:       'epic',
  spiritwalker:   'epic',

  // LEGENDARY — mastery tier, elite stats
  crystalmancer:  'legendary',
  pestilencelord: 'legendary',
  arcanist:       'legendary',

  // MYTHICAL — glass cannon extremes
  doomcaster:     'mythical',
  cosmomancer:    'mythical',

  // DIVINE — unique mechanics, deep unlock required
  phantom:        'divine',
  nullbringer:    'divine',
  voidreaper:     'secret',
  plagueborn:     'secret',
  stormlord:      'secret',
  soulrender:     'secret',
  abyssal_tyrant: 'secret',

  // ABYSSAL — conquest only / secret fusion
  abyssal_one:    'abyssal',  // conquest unlock, not a fusion
  the_convergence:'abyssal',
  the_unnamed:    'abyssal',
};

// ── FUSION LEVEL REQUIREMENT ──────────────────────────────────
const FUSION_MIN_LEVEL = 20;

// ── FUSION RECIPE REGISTRY ────────────────────────────────────
// Populated lazily by fusion_data_N.js files when loaded.
// FUSION_FILE_LOOKUP (from fusion_lookup.js) maps recipe key → file number.
const DUAL_FUSIONS = {};
const FUSION_CLASSES = {};
const FUSION_LOADED_FILES = new Set();

// ── LAZY FILE LOADER ──────────────────────────────────────────
// Fusion class data is split across fusion_data_1.js through fusion_data_17.js
// to keep initial load time fast. Files are loaded on-demand.
//
// ⚠️  MODDING: if you add new fusion recipes, add them to a fusion_data_N.js
//     file and register the recipe key → file number in fusion_lookup.js.
//     The key format is: sorted class IDs joined by '_' e.g. 'chronomancer_spellsword'
//
// ⚠️  RENDERING BUG RISK: if you call renderClassSelect() or renderCollection()
//     before fusion files are loaded, classes show as raw IDs with no data.
//     Always go through showScreen() which calls preloadPlayerFusions() first.
// Inject a <script> tag for fusion_data_N.js and wait for it.
// Returns a Promise that resolves when the file registers itself.
function loadFusionFile(fileNum) {
  return new Promise((resolve, reject) => {
    if (FUSION_LOADED_FILES.has(fileNum)) { resolve(); return; }
    const script = document.createElement('script');
    script.src = `js/data/fusions/fusion_data_${fileNum}.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load fusion_data_${fileNum}.js`));
    document.head.appendChild(script);
  });
}

// ── ENSURE RECIPE IS LOADED ───────────────────────────────────
// Call before any operation that needs a specific fusion recipe.
// Returns a Promise. Resolves immediately if already loaded.
async function ensureFusionLoaded(classIds) {
  const key = getFusionKey(classIds);
  if (DUAL_FUSIONS[key]) return; // already loaded
  const fileNum = FUSION_FILE_LOOKUP[key];
  if (!fileNum) return; // no recipe exists (not an error)
  await loadFusionFile(fileNum);
}

// ── ENSURE ALL FILES FOR PLAYER'S CLASSES LOADED ─────────────
// Called when opening Fusion Lab — loads all files relevant to
// the player's currently unlocked classes.
async function preloadPlayerFusions(unlockedClasses) {
  const needed = new Set();
  for (const cls of unlockedClasses) {
    for (const [key, fileNum] of Object.entries(FUSION_FILE_LOOKUP)) {
      const parts = key.split('+');
      if (parts.includes(cls)) needed.add(fileNum);
    }
  }
  await Promise.all([...needed].map(n => loadFusionFile(n)));
}

const SECRET_BOSSES = {

  herald_of_nothing: {
    id:'herald_of_nothing',
    name:'The Herald of Nothing',
    icon:'🌀',
    title:'It was sent ahead. Of what, no one survived to ask.',
    // Trigger: RNG roll during floor transition on floors 5-15
    // Additional condition: player must have at least 1 void/shadow ability equipped
    triggerWindow: { minFloor:5, maxFloor:15 },
    triggerChance: 0.08, // 8% per floor in window
    triggerCondition: 'has_dark_element', // player class element is shadow/dark/void
    unlocks: { fusionClass:'voidreaper' },
    announcement: '??? The void stirs ahead. Something was sent to find you.',
    enemy: {
      id:'herald_of_nothing', name:'The Herald of Nothing', icon:'🌀', element:'shadow',
      title:'It was sent ahead. Of what, no one survived to ask.',
      isBoss:true, isSecretBoss:true,
      hp:600, maxHp:600, atk:40, def:18, spd:18, xp:400, gold:[120,180], loot:1.0,
      patterns:['void_tear','shadow_slash','void_tear','life_drain','void_tear'],
      phases:[
        { threshold:0.5, name:'Phase 2: Herald Ascendant', atkBoost:20, defBoost:12,
          announce:'THE HERALD ASCENDANT — It has delivered its message. Now it delivers you.',
          newPatterns:['void_tear','void_tear','shadow_slash','charge','void_tear'] },
      ],
      enrageTurns:12, enrageAnnounce:'The Herald opens a rift — ENRAGED!',
      status:[],patternIndex:0,currentPhase:0,enrageCount:0
    }
  },

  the_rot: {
    id:'the_rot',
    name:'The Rot',
    icon:'🦠',
    title:'The first sickness. The last one standing.',
    // Trigger: RNG on floors 8-18, additional: player must have poison/nature ability in kit
    triggerWindow: { minFloor:8, maxFloor:18 },
    triggerChance: 0.07,
    triggerCondition: 'has_poison_ability',
    unlocks: { fusionClass:'plagueborn' },
    announcement: '??? The air ahead tastes wrong. Something ancient and sick waits.',
    enemy: {
      id:'the_rot', name:'The Rot', icon:'🦠', element:'poison',
      title:'The first sickness. The last one standing.',
      isBoss:true, isSecretBoss:true,
      hp:750, maxHp:750, atk:38, def:20, spd:12, xp:480, gold:[140,200], loot:1.0,
      patterns:['poison_spit','curse','heavy','poison_spit','summon'],
      phases:[
        { threshold:0.5, name:'Phase 2: Full Bloom', atkBoost:18, defBoost:14,
          announce:'THE ROT BLOOMS — The spores are everywhere now.',
          newPatterns:['poison_spit','poison_spit','heavy','charge','poison_spit'] },
      ],
      enrageTurns:11, enrageAnnounce:'The Rot sporulates — ENRAGED!',
      status:[],patternIndex:0,currentPhase:0,enrageCount:0
    }
  },

  the_tempest_unbound: {
    id:'the_tempest_unbound',
    name:'The Tempest Unbound',
    icon:'⛈️',
    title:'Weather is the storm sleeping. This is it awake.',
    // Trigger: RNG on floors 10-22, ONLY triggers if current floor has no boss
    // Additional: player must have reached floor 10+ on a previous run
    triggerWindow: { minFloor:10, maxFloor:22 },
    triggerChance: 0.07,
    triggerCondition: 'reached_floor_10',
    unlocks: { fusionClass:'stormlord' },
    announcement: '??? The wind screams a different note. Something is building ahead.',
    enemy: {
      id:'the_tempest_unbound', name:'The Tempest Unbound', icon:'⛈️', element:'electric',
      title:'Weather is the storm sleeping. This is it awake.',
      isBoss:true, isSecretBoss:true,
      hp:820, maxHp:820, atk:44, def:16, spd:22, xp:550, gold:[160,230], loot:1.0,
      patterns:['stun_strike','charge','double','wail','stun_strike'],
      phases:[
        { threshold:0.5, name:'Phase 2: Tempest Unbound', atkBoost:22, defBoost:10,
          announce:'THE TEMPEST IS UNBOUND — The storm has no ceiling now.',
          newPatterns:['charge','stun_strike','double','stun_strike','charge'] },
      ],
      enrageTurns:10, enrageAnnounce:'The Tempest SURGES — ENRAGED!',
      status:[],patternIndex:0,currentPhase:0,enrageCount:0
    }
  },

  undying_horror: {
    id:'undying_horror',
    name:'The Undying Horror',
    icon:'👁️',
    title:'Every hero tried. Every hero became part of it.',
    // Trigger: RNG on floors 15-28, ONLY if player has died at least once this run (no save yet — tracks via meta)
    // Additional: triggers more often if player is on a winning streak (meta.maxFloor >= 20)
    triggerWindow: { minFloor:15, maxFloor:28 },
    triggerChance: 0.08,
    triggerCondition: 'meta_max_floor_20',
    unlocks: { fusionClass:'soulrender' },
    announcement: '??? The dead are restless. Something that should not exist waits ahead.',
    enemy: {
      id:'undying_horror', name:'The Undying Horror', icon:'👁️', element:'ghost',
      title:'Every hero tried. Every hero became part of it.',
      isBoss:true, isSecretBoss:true,
      hp:1100, maxHp:1100, atk:55, def:24, spd:14, xp:700, gold:[200,280], loot:1.0,
      patterns:['life_drain','wail','heavy','life_drain','curse'],
      phases:[
        { threshold:0.6, name:'Phase 2: True Undying', atkBoost:25, defBoost:16,
          announce:'THE UNDYING HORROR CANNOT DIE — It just adds this wound to the collection.',
          newPatterns:['life_drain','void_tear','heavy','life_drain','charge'] },
        { threshold:0.25, name:'Phase 3: The Collection', atkBoost:40, defBoost:24,
          announce:'THE COLLECTION IS COMPLETE — Everything it has ever killed fights with it now.',
          newPatterns:['life_drain','charge','void_tear','life_drain','heavy'] },
      ],
      enrageTurns:10, enrageAnnounce:'The Undying Horror ABSORBS another soul — ENRAGED!',
      status:[],patternIndex:0,currentPhase:0,enrageCount:0
    }
  },

  the_first_warden: {
    id:'the_first_warden',
    name:'The First Warden',
    icon:'🔱',
    title:'The Abyss needed a guardian before it needed a god.',
    // Trigger: RNG on floors 20-35, ONLY if player has defeated at least 2 other secret bosses
    triggerWindow: { minFloor:20, maxFloor:35 },
    triggerChance: 0.09,
    triggerCondition: 'defeated_2_secret_bosses',
    unlocks: { fusionClass:'abyssal_tyrant' },
    announcement: '??? Something ancient stirs. Something that remembers what the Abyss was before anyone fell into it.',
    enemy: {
      id:'the_first_warden', name:'The First Warden', icon:'🔱', element:'dark',
      title:'The Abyss needed a guardian before it needed a god.',
      isBoss:true, isSecretBoss:true,
      hp:1600, maxHp:1600, atk:70, def:35, spd:16, xp:1000, gold:[300,420], loot:1.0,
      patterns:['heavy','shadow_slash','stun_strike','void_tear','heavy'],
      phases:[
        { threshold:0.65, name:'Phase 2: Warden Unchained', atkBoost:30, defBoost:20,
          announce:'THE FIRST WARDEN IS UNCHAINED — The original compact is broken. It will destroy everything.',
          newPatterns:['void_tear','heavy','stun_strike','shadow_slash','charge'] },
        { threshold:0.3, name:'Phase 3: Abyss Incarnate', atkBoost:50, defBoost:30,
          announce:'THE FIRST WARDEN BECOMES THE ABYSS — There is no longer a line between the two.',
          newPatterns:['void_tear','charge','enrage_strike','void_tear','heavy'] },
      ],
      enrageTurns:9, enrageAnnounce:'The First Warden BECOMES the Abyss — ENRAGED!',
      status:[],patternIndex:0,currentPhase:0,enrageCount:0
    }
  },
};

// ── FUSION HELPER FUNCTIONS ───────────────────────────────────

// Returns a canonical sorted key for 2 or 3 classes
function getFusionKey(classIds) {
  return [...classIds].sort().join('+');
}

// Check if a dual fusion is available given two class IDs
function getDualFusion(classA, classB) {
  const key = getFusionKey([classA, classB]);
  return DUAL_FUSIONS[key] || null;
}

// Check if a triple fusion is available given three class IDs
function getTripleFusion(classA, classB, classC) {
  const key = getFusionKey([classA, classB, classC]);
  return TRIPLE_FUSIONS[key] || null;
}

// Get the fusion class definition (works for both fusion and base classes)
function getFusionClass(fusionId) {
  return FUSION_CLASSES[fusionId] || null;
}

// Check whether player meets fusion requirements
// canFuse — async: ensures fusion data file is loaded before checking
async function canFuse(classIds) {
  const levels = G.meta.classLevels || {};
  for (const id of classIds) {
    if (!G.meta.unlockedClasses.includes(id)) return { ok:false, reason:`${id} not unlocked` };
    if ((levels[id] || 0) < FUSION_MIN_LEVEL) return { ok:false, reason:`${id} must be level ${FUSION_MIN_LEVEL}` };
  }
  if (classIds.length === 2) {
    await ensureFusionLoaded(classIds);
    const result = getDualFusion(classIds[0], classIds[1]);
    if (!result) return { ok:false, reason:'No fusion exists for this combination' };
    if (G.meta.unlockedFusions && G.meta.unlockedFusions.includes(result)) return { ok:false, reason:'Already unlocked' };
    return { ok:true, result };
  }
  return { ok:false, reason:'Triple fusions not supported' };
}

// performFusion — async: waits for file load before fusing
async function performFusion(classIds) {
  const check = await canFuse(classIds);
  if (!check.ok) return check;
  G.meta.unlockedFusions = G.meta.unlockedFusions || [];
  G.meta.unlockedClasses = G.meta.unlockedClasses || [];
  G.meta.unlockedFusions.push(check.result);
  if (!G.meta.unlockedClasses.includes(check.result)) {
    G.meta.unlockedClasses.push(check.result);
  }
  saveMeta();
  return { ok:true, result:check.result };
}

// Secret boss trigger check — called from nextFloor()
function checkSecretBossTrigger(floor) {
  // Dev console override: force a specific boss regardless of conditions
  if (G._forceSecretBoss) {
    const forced = G._forceSecretBoss;
    G._forceSecretBoss = null;
    G._secretBossTriggeredThisRun = true;
    return forced;
  }

  // Never trigger on boss floors
  if (BOSS_FLOORS.includes(floor)) return null;
  // Never trigger if a secret boss was already triggered this run
  if (G._secretBossTriggeredThisRun) return null;

  for (const [bossId, boss] of Object.entries(SECRET_BOSSES)) {
    const { minFloor, maxFloor } = boss.triggerWindow;
    if (floor < minFloor || floor > maxFloor) continue;

    // Check trigger condition
    if (!meetsSecretBossCondition(boss.triggerCondition)) continue;

    // Already defeated this secret boss? Skip (no re-reward, but can still fight for fun — 50% chance)
    const alreadyDefeated = (G.meta.defeatedSecretBosses || []).includes(bossId);
    const effectiveChance = alreadyDefeated ? boss.triggerChance * 0.5 : boss.triggerChance;

    if (Math.random() < effectiveChance) {
      return bossId;
    }
  }
  return null;
}

function meetsSecretBossCondition(condition) {
  const meta = G.meta;
  const player = G.player;
  // Helper: get element for the current class, checking both CLASSES and FUSION_CLASSES
  const classElement = () => {
    if (!player) return null;
    return (CLASSES[player.classId]?.element)
        || (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[player.classId]?.element)
        || null;
  };
  switch (condition) {
    case 'has_dark_element':
      return player && ['shadow','dark','void'].includes(classElement());
    case 'has_poison_ability':
      return player && player.abilities && player.abilities.some(a =>
        ABILITIES[a]?.element === 'poison' || ABILITIES[a]?.tags?.includes('poison'));
    case 'reached_floor_10':
      return (meta.maxFloor || 0) >= 10;
    case 'meta_max_floor_20':
      return (meta.maxFloor || 0) >= 20;
    case 'defeated_2_secret_bosses':
      return (meta.defeatedSecretBosses || []).length >= 2;
    default:
      return true;
  }
}

// Called when a secret boss is defeated
function onSecretBossDefeated(bossId) {
  const boss = SECRET_BOSSES[bossId];
  if (!boss) return;

  G.meta.defeatedSecretBosses = G.meta.defeatedSecretBosses || [];
  if (!G.meta.defeatedSecretBosses.includes(bossId)) {
    G.meta.defeatedSecretBosses.push(bossId);
  }

  // Unlock the fusion recipe knowledge
  G.meta.knownFusionRecipes = G.meta.knownFusionRecipes || [];
  // Secret boss classes are unlocked directly — no recipe key needed

  // Unlock the class directly
  const fusionClassId = boss.unlocks.fusionClass;
  G.meta.unlockedClasses = G.meta.unlockedClasses || [];
  if (!G.meta.unlockedClasses.includes(fusionClassId)) {
    G.meta.unlockedClasses.push(fusionClassId);
  }
  G.meta.unlockedFusions = G.meta.unlockedFusions || [];
  if (!G.meta.unlockedFusions.includes(fusionClassId)) {
    G.meta.unlockedFusions.push(fusionClassId);
  }

  saveMeta();
  logEntry('reward', `★ Secret Boss defeated! Unlocked: ${CLASSES[fusionClassId]?.name || FUSION_CLASSES[fusionClassId]?.name || fusionClassId}`);
  logEntry('reward', `✦ A new class has been added to your roster.`);
}

// Get all fusion possibilities visible to the player (known combos they're close to)
function getVisibleFusions() {
  const unlocked = G.meta.unlockedClasses || [];
  const levels = G.meta.classLevels || {};
  const alreadyFused = G.meta.unlockedFusions || [];
  const results = [];

  // Iterate FUSION_FILE_LOOKUP (always complete — 595 recipes) rather than
  // DUAL_FUSIONS (only populated for loaded files).
  // For each recipe, show it if at least one parent class is unlocked.
  for (const [key, fileNum] of Object.entries(FUSION_FILE_LOOKUP)) {
    const [a, b] = key.split('+');
    const aUnlocked = unlocked.includes(a);
    const bUnlocked = unlocked.includes(b);
    if (!aUnlocked && !bUnlocked) continue; // hide if player has neither class

    // resultId: use loaded map if available, else use key as placeholder
    const resultId = DUAL_FUSIONS[key] || null;
    if (resultId && alreadyFused.includes(resultId)) continue;

    const aLevel = levels[a] || 0;
    const bLevel = levels[b] || 0;
    results.push({
      type:'dual', key, resultId, fileNum,
      classes:[a,b],
      aUnlocked, bUnlocked,
      aLevel, bLevel,
      aReady: aUnlocked && aLevel >= FUSION_MIN_LEVEL,
      bReady: bUnlocked && bLevel >= FUSION_MIN_LEVEL,
      fullyReady: aUnlocked && bUnlocked && aLevel >= FUSION_MIN_LEVEL && bLevel >= FUSION_MIN_LEVEL,
    });
  }

  return results;
}

// ══════════════════════════════════════════════════════════════
// SECRET BOSS UNLOCK CLASSES
// Each is unlocked by defeating a specific secret boss.
// The 5 together can be converged into The Convergence.
//
// ⚠️  WHERE THESE CLASSES LIVE (important for modders):
//   These 5 classes exist in BOTH CLASSES (classes.js) AND FUSION_CLASSES (here).
//   - CLASSES entry  → makes them appear in class select screen for all players
//   - FUSION_CLASSES entry → lets fusion system access their data via getClassData()
//     and lets the collection screen find them via FUSION_CLASSES keys
//   - They are NOT player-crafted fusions — they are unlocked by boss defeats
//   - In the collection: rarity='secret' → Secret tab, not Fusions tab
//   - G.meta.unlockedClasses tracks unlock (NOT unlockedFusions)
//   - Convergence check: canConverge() requires all 5 in unlockedClasses at level 20+
//
// ⚠️  ABYSSAL CLASSES (the_convergence, the_unnamed, abyssal_one) are DIFFERENT:
//   - They do NOT live in CLASSES — only in FUSION_CLASSES here
//   - They are tracked in unlockedClasses (not unlockedFusions)
//   - getClassData() finds them via the FUSION_CLASSES fallback
//   - Collection picks them up via the extraFused logic in renderCollection()
// ══════════════════════════════════════════════════════════════

const SECRET_BOSS_CLASS_IDS = [
  'voidreaper',       // Herald of Nothing
  'plagueborn',       // The Rot
  'stormlord',        // The Tempest Unbound
  'soulrender',       // The Undying Horror
  'abyssal_tyrant',   // The First Warden
];

// ── Check if all 5 secret boss classes are unlocked AND maxed ──
// Used by fusion modal to show/hide the Convergence button.
function canConverge() {
  const unlocked = G.meta.unlockedClasses || [];
  const levels   = G.meta.classLevels    || {};
  return SECRET_BOSS_CLASS_IDS.every(id =>
    unlocked.includes(id) && (levels[id] || 0) >= FUSION_MIN_LEVEL
  );
}

// ── Perform the 5-class convergence fusion ─────────────────────
// Does not go through normal canFuse() — it's a special ritual.
function performConvergence() {
  if (!canConverge()) return { ok:false, reason:'Not all 5 secret classes are mastered.' };
  const already = G.meta.unlockedClasses || [];
  if (already.includes('the_convergence')) return { ok:false, reason:'Already unlocked.' };
  G.meta.unlockedClasses = [...already, 'the_convergence'];
  G.meta.unlockedFusions = [...(G.meta.unlockedFusions||[]), 'the_convergence'];
  saveMeta();
  return { ok:true, result:'the_convergence' };
}

// ── Perform the final fusion: The Convergence + Abyssal One ────
// ⚠️ Both must be level FUSION_MIN_LEVEL. Result: the_unnamed.
function performFinalFusion() {
  const unlocked = G.meta.unlockedClasses || [];
  const levels   = G.meta.classLevels    || {};
  if (!unlocked.includes('the_convergence'))
    return { ok:false, reason:'The Convergence is not unlocked.' };
  if (!unlocked.includes('abyssal_one'))
    return { ok:false, reason:'The Abyssal One is not unlocked.' };
  if ((levels['the_convergence']||0) < FUSION_MIN_LEVEL)
    return { ok:false, reason:`The Convergence must be level ${FUSION_MIN_LEVEL}.` };
  if ((levels['abyssal_one']||0) < FUSION_MIN_LEVEL)
    return { ok:false, reason:`The Abyssal One must be level ${FUSION_MIN_LEVEL}.` };
  if (unlocked.includes('the_unnamed'))
    return { ok:false, reason:'Already unlocked.' };
  G.meta.unlockedClasses = [...unlocked, 'the_unnamed'];
  G.meta.unlockedFusions = [...(G.meta.unlockedFusions||[]), 'the_unnamed'];
  saveMeta();
  return { ok:true, result:'the_unnamed' };
}

// ══════════════════════════════════════════════════════════════
// SECRET BOSS CLASS DEFINITIONS
// Registered directly into FUSION_CLASSES so the rest of the
// UI (collection, class select, fusion lab) picks them up.
// ══════════════════════════════════════════════════════════════

Object.assign(FUSION_CLASSES, {

  // ── VOIDREAPER — unlocked by Herald of Nothing ──────────────
  voidreaper: {
    id:'voidreaper', name:'Voidreaper', icon:'🌑',
    tagline:'The threshold is not a warning. It is an invitation.',
    color:'#9900cc', element:'void', rarity:'secret',
    secretBossUnlock: 'herald_of_nothing',
    stats:{hp:75,maxHp:75,mp:110,maxMp:110,atk:16,def:4,spd:13,crit:18},
    statDisplay:{HP:5,ATK:11,DEF:3,SPD:8,MP:10},
    abilities:['void_harvest','threshold_cut','oblivion_mark','null_cascade',
               'void_harvest','threshold_cut','oblivion_mark','null_cascade'],
    burstAbility:'voidreaper_burst',
    passives:['void_affinity','void_mastery'],
    description:'An execute specialist who sets thresholds that rise as the fight continues. Each kill raises the execute ceiling permanently.',
    lore:'The Herald did not survive the encounter. What came back wearing its shape was something that had learned from it.'
  },

  // ── PLAGUEBORN — unlocked by The Rot ───────────────────────
  plagueborn: {
    id:'plagueborn', name:'Plagueborn', icon:'🦠',
    tagline:'The disease is not the weapon. The disease IS you.',
    color:'#44aa22', element:'poison', rarity:'secret',
    secretBossUnlock: 'the_rot',
    stats:{hp:80,maxHp:80,mp:100,maxMp:100,atk:11,def:6,spd:11,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['rot_touch','spore_cloud','festering_wound','plague_cascade',
               'rot_touch','spore_cloud','festering_wound','plague_cascade'],
    burstAbility:'plagueborn_burst',
    passives:['death_aura','plague_lord'],
    description:'A DoT specialist with 4 distinct diseases that stack independently. When all 4 are active simultaneously, they detonate each other in sequence.',
    lore:'It did not catch The Rot. It became a better version of it.'
  },

  // ── STORMLORD — unlocked by The Tempest Unbound ────────────
  stormlord: {
    id:'stormlord', name:'Stormlord', icon:'⛈️',
    tagline:'Every strike is a promise. The burst is the delivery.',
    color:'#3388ff', element:'electric', rarity:'secret',
    secretBossUnlock: 'the_tempest_unbound',
    stats:{hp:78,maxHp:78,mp:105,maxMp:105,atk:14,def:5,spd:17,crit:20},
    statDisplay:{HP:5,ATK:10,DEF:3,SPD:10,MP:10},
    abilities:['charge_strike','storm_coil','lightning_cage','discharge',
               'charge_strike','storm_coil','lightning_cage','discharge'],
    burstAbility:'stormlord_burst',
    passives:['static_charge','storm_mastery'],
    description:'A burst specialist that accumulates Storm Charge across turns. Each stored charge multiplies the next detonation. At 10 charges, abilities auto-upgrade.',
    lore:'The Tempest Unbound was a ceiling. The Stormlord removed it.'
  },

  // ── SOULRENDER — unlocked by The Undying Horror ─────────────
  soulrender: {
    id:'soulrender', name:'Soulrender', icon:'👁️',
    tagline:'You do not run out of enemies. You run out of soul.',
    color:'#cc4488', element:'ghost', rarity:'secret',
    secretBossUnlock: 'undying_horror',
    stats:{hp:85,maxHp:85,mp:95,maxMp:95,atk:13,def:7,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:9},
    abilities:['soul_rip','life_siphon','spectral_drain','soul_collapse',
               'soul_rip','life_siphon','spectral_drain','soul_collapse'],
    burstAbility:'soulrender_burst',
    passives:['soul_harvest','undying'],
    description:'A drain specialist that converts all damage dealt into HP and MP. Above 90% HP, all abilities gain +40% damage. Below 30% HP, lifesteal triples.',
    lore:'The Undying Horror collected everything it killed. The Soulrender learned to spend that collection.'
  },

  // ── ABYSSAL TYRANT — unlocked by The First Warden ──────────
  abyssal_tyrant: {
    id:'abyssal_tyrant', name:'Abyssal Tyrant', icon:'🔱',
    tagline:'Nothing acts without permission. You stopped giving it.',
    color:'#885500', element:'dark', rarity:'secret',
    secretBossUnlock: 'the_first_warden',
    stats:{hp:100,maxHp:100,mp:90,maxMp:90,atk:13,def:10,spd:10,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:6,MP:8},
    abilities:['dominion','stat_shatter','ability_lock','total_suppression',
               'dominion','stat_shatter','ability_lock','total_suppression'],
    burstAbility:'abyssal_tyrant_burst',
    passives:['abyssal_presence','intimidation'],
    description:'A control specialist that methodically removes enemy capabilities. Each ability locks out a different combat option — ATK, SPD, DEF, or actions entirely.',
    lore:'The First Warden held the Abyss in order for eons. The Abyssal Tyrant inherited that authority and pointed it at everything.'
  },

  // ══════════════════════════════════════════════════════════
  // THE CONVERGENCE — fused from all 5 secret boss classes
  // ══════════════════════════════════════════════════════════
  the_convergence: {
    id:'the_convergence', name:'The Convergence', icon:'✦',
    tagline:'Five broken things, unified. Something new breaks instead.',
    color:'#ffffff', element:'void', rarity:'abyssal',
    fusedFrom: SECRET_BOSS_CLASS_IDS,
    stats:{hp:95,maxHp:95,mp:120,maxMp:120,atk:15,def:8,spd:14,crit:16},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:9,MP:11},
    abilities:['convergence_read','convergence_mirror','convergence_absorb','convergence_shift',
               'convergence_overload','convergence_erase','convergence_apex','convergence_reset'],
    burstAbility:'convergence_burst',
    passives:['void_affinity','void_mastery'],
    description:'Starts combat in Null Form with no element. Each turn it reads the enemy and evolves — cycling through Execute, DoT, Drain, Control, and Burst forms. Each form unlocks a unique version of its abilities. Resets at turn 10 at double power.',
    lore:'Five hunters who could not be killed, fused into something that had never existed. The Abyss did not recognise it. That was the point.'
  },

  // ══════════════════════════════════════════════════════════
  // ABYSSAL ONE — conquest unlock (defeat Floor 50 Final Boss)
  // ══════════════════════════════════════════════════════════
  abyssal_one: {
    id:'abyssal_one', name:'The Abyssal One', icon:'👁️',
    tagline:'You have seen the bottom of the abyss. It blinked.',
    color:'#9900ff', element:'shadow', rarity:'abyssal',
    conquestOnly: true,
    stats:{hp:110,maxHp:110,mp:110,maxMp:110,atk:15,def:10,spd:15,crit:18},
    statDisplay:{HP:8,ATK:10,DEF:7,SPD:10,MP:11},
    abilities:['void_bolt','shadow_strike','death_coil','annihilate','abyssal_pulse','void_rupture','abyss_gaze'],
    burstAbility:'void_burst',
    passives:['abyssal_presence'],
    description:'The conqueror of the Abyss. A blend of all darkness made manifest. Unlocked by defeating the Abyssal God.',
    lore:'There is no going back from floor 50. What returned was not the same person that descended — but it was stronger.',
  },

  // ══════════════════════════════════════════════════════════
  // THE UNNAMED — fused from The Convergence + Abyssal One
  // The best class in the game. No element. No classification.
  // ══════════════════════════════════════════════════════════
  the_unnamed: {
    id:'the_unnamed', name:'The Unnamed', icon:'　',
    tagline:'　',
    color:'#e8e8ff', element:null, rarity:'abyssal',
    fusedFrom: ['the_convergence','abyssal_one'],
    stats:{hp:120,maxHp:120,mp:120,maxMp:120,atk:18,def:12,spd:18,crit:22},
    statDisplay:{HP:8,ATK:12,DEF:8,SPD:11,MP:11},
    abilities:['∅','⟁','⌬','⊘','∿','⋈','⌖','⊛'],
    burstAbility:'unnamed_burst',
    passives:['void_affinity','phase'],
    description:'Something that exists outside the classification system. Its abilities have no names. Its element registers as nothing. The Abyss does not acknowledge its presence.',
    lore:''
  },

});
