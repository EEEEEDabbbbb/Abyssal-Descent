# Abyssal Descent — Modding Guide

> This guide covers everything you need to add new classes, abilities, enemies, items, events, and secret bosses to Abyssal Descent. Read it top to bottom before you start — there are several non-obvious gotchas that will waste your time if you hit them blind.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Core Concepts](#2-core-concepts)
3. [Adding a Base Class](#3-adding-a-base-class)
4. [Adding Abilities](#4-adding-abilities)
5. [Adding a Fusion Class](#5-adding-a-fusion-class)
6. [Implementing Passives](#6-implementing-passives)
7. [Adding an Enemy](#7-adding-an-enemy)
8. [Adding a Boss](#8-adding-a-boss)
9. [Adding a Secret Boss](#9-adding-a-secret-boss)
10. [Adding Items](#10-adding-items)
11. [Adding Events](#11-adding-events)
12. [Adding a New Element](#12-adding-a-new-element)
13. [Rarity Tiers](#13-rarity-tiers)
14. [The Dev Console](#14-the-dev-console)
15. [Common Mistakes](#15-common-mistakes)

---

## 1. Project Structure

```
(repo root)
├── package.json / tests/       — dev-only automated tests (npm install && npm test)
├── tools/
│   └── build_fusion_index.js   — regenerates fusion indexes after editing fusion data
└── abyssal_revamped/
├── index.html                  — entry point, screen HTML, script loader order
├── js/
│   ├── main.js                 — init(), startRun(), keyboard input
│   ├── dev_console.js          — dev console (backtick / F2) — loads only with ?dev=1
│   ├── devtest.js              — in-browser self-test — loads only with ?dev=1
│   ├── debug_logger.js         — logs every core function call — loads only with ?dev=1
│   ├── engine/
│   │   ├── combat.js           — all fight logic, damage pipeline, win/lose
│   │   ├── mapgen.js           — BSP map generation, movement, floor transitions
│   │   ├── passives.js         — PASSIVE_INFO (names/descriptions) + passive hooks
│   │   ├── player.js           — createPlayer(), inventory, equipment
│   │   ├── records.js          — run stats, run history, achievements, toasts
│   │   ├── run_save.js         — localStorage save slots (3 slots)
│   │   ├── state.js            — G object, defaultMeta(), GAME_VERSION
│   │   ├── stats.js            — permanent vs temporary stats, enemy stats view
│   │   ├── status.js           — addStatus(), tickStatus(), removeStatuses()
│   │   └── utils.js            — damage math, XP, status helpers, saveMeta()
│   ├── ui/
│   │   ├── continue_modal.js   — Continue / save-slot dialogs
│   │   ├── fusion_modal.js     — Fusion Lab screen + Class Collection screen
│   │   ├── modals.js           — shop, events, rewards, inventory modals
│   │   ├── records_ui.js       — Records screen, run summary, Run Stats dialog
│   │   ├── render.js           — updateUI() and all sub-renderers, click-to-move, minimap
│   │   ├── screens.js          — showScreen(), renderClassSelect(), game over
│   │   ├── settings.js         — settings (S), applied at boot
│   │   └── sfx.js              — synthesized sound effects (Web Audio)
│   └── data/
│       ├── abilities.js        — ABILITIES{}, WEAPON_ELEMENT_ABILITIES, HYBRID_WEAPON_ARTS
│       ├── classes.js          — CLASSES{} — 10 base classes
│       ├── elements.js         — ELEMENTS{}, element effectiveness table
│       ├── enemies.js          — ENEMY_ABILITIES, ENEMIES[], boss definitions
│       ├── events.js           — EVENTS[] — random room events
│       ├── fusion.js           — rarity tiers, CLASS_RARITY, fusion loader, secret bosses
│       ├── fusion_lookup.js    — recipe key → file, and class id → file (generated)
│       ├── items.js            — ITEM_POOL[], equipment definitions
│       ├── biomes.js           — BIOMES (floor ranges, flavor, hazards)
│       ├── meta.js             — TALENT_TREE, SHARD_SHOP_ITEMS, LOADOUTS
│       └── fusions/
│           ├── fusion_data_1.js  — lazy-loaded fusion class definitions
│           ├── fusion_data_2.js
│           └── ... (up to fusion_data_17.js)
```

**Script load order matters.** Scripts are loaded in `index.html` in dependency order: data files first, then engine, then UI. If you add a new file, insert its `<script>` tag in the right place.

---

## 2. Core Concepts

### The G Object

Everything lives on `G` — the global game state. Key fields:

```javascript
G.player        // player object (see player.js)
G.enemy         // current enemy (null outside combat)
G.map           // 2D array of cell objects
G.floor         // current floor number
G.phase         // 'explore' | 'combat' | 'event' | 'shop'
G.inCombat      // boolean
G.turn          // 'player' | 'enemy'
G.enemies       // every enemy in the current fight (G.enemy = the targeted one)
G.combatRound   // completed rounds this fight (changes only in advanceRound())
G.meta          // persistent meta-progress (saved to localStorage)
G.log           // combat log array
```

### The Player Object

```javascript
p.classId           // string id of current class
p.stats             // LIVE values: { hp, maxHp, mp, maxMp, atk, def, spd, crit, critDmg }
p.base              // PERMANENT values: { maxHp, maxMp, atk, def, spd, crit, critDmg }
p.shield            // flat damage absorber (combat-only)
p.status            // active status effects []
p.abilities         // array of ability ID strings — NOT objects
p.burstAbility      // burst ability ID string
p.passives          // array of passive ID strings
p.equipment         // { weapon: item|null, armor: item|null, relic: item|null }
p.inventory         // items array, max 12
p.combo             // current combo count
p.burstCharge       // 0–5, burst fires at 5
p.cooldowns         // { abilityId: turnsRemaining }
```

### Permanent vs Temporary Stats (stats.js)

`p.stats` is what combat reads; anything may change it during a fight. When a
fight ends (won or fled) and on every floor change, `resetTemporaryStats(p)`
snaps `p.stats` back to `p.base`. So:

```javascript
p.stats.atk += 10;               // lasts until the end of this fight
addPermanentStat(p, 'atk', 10);  // lasts the whole run (level-ups, events, gear…)
applyPermanentBonuses(p, { atk:5, maxHp:20 }, 1);   // -1 removes them again
```

HP and MP are resources, not stats: they're never reset, only clamped to max.
Enemies keep flat stats (`e.atk`, `e.def`, …); `prepareEnemy(e)` also gives them
an `e.stats` view onto the same values so shared code can use `entity.stats`.

### G.meta — Persistent Progress

`G.meta` is saved to `localStorage` via `saveMeta()`. Always call `saveMeta()` after modifying it.
New fields go in `defaultMeta()` (state.js) — `loadMeta()` merges old saves over those defaults.

```javascript
G.meta.unlockedClasses      // base + secret + abyssal class IDs
G.meta.unlockedFusions      // player-crafted fusion IDs
G.meta.classLevels          // { classId: level } — max 20
G.meta.classXP              // { classId: xp }
G.meta.defeatedSecretBosses // secret boss IDs beaten across all runs
G.meta.soulShards           // currency for shard shop
G.meta.maxFloor             // highest floor ever reached
G.meta.achievements         // { achievementId: timestamp } (records.js)
G.meta.runHistory           // last 20 finished runs, newest first
G.meta.lifetime             // totals across all runs (kills, shards, play time…)
```

Shards earned **during a run** should go through `awardShards(n)` (records.js)
so they also count toward the run's total on the death screen. Run statistics
live on `G.player.runStats`; bump them with `trackStat('kills')` or
`trackBest('bestHit', dmg)`.

### Adding an Achievement

Add an entry to `ACHIEVEMENTS` in `js/engine/records.js`
(`{ id, icon, name, desc, shards }`), then either call
`unlockAchievement('my_id')` where it happens, or, if it depends only on
saved state (depth, gold, unlocks…), add a check to `checkAchievements()`.
Achievements pay their shards once and show a toast.

### Always Use getClassData()

```javascript
// CORRECT — works for base and fusion classes
const cls = getClassData('darkguard');

// WRONG — misses fusion classes
const cls = CLASSES['darkguard'];
```

Fusion class files are lazy-loaded. `CLASSES[id]` returns `undefined` for any fusion class until its file is loaded. `getClassData()` checks both `CLASSES` and `FUSION_CLASSES`.

---

## 3. Adding a Base Class

Base classes go in `js/data/classes.js` inside the `CLASSES` object.

### Class Object Shape

```javascript
my_class: {
  id:          'my_class',        // must match the key
  name:        'My Class',
  icon:        '🔮',
  tagline:     'One sentence pitch.',
  color:       '#aa44cc',         // hex — used for UI highlights
  element:     'shadow',          // see elements.js for valid values
  rarity:      'rare',            // see Rarity Tiers section
  stats: {
    hp:80, maxHp:80, mp:80, maxMp:80,
    atk:12, def:6, spd:10, crit:12
  },
  statDisplay: { HP:6, ATK:8, DEF:5, SPD:7, MP:8 }, // 1–12 bars shown in UI
  abilities:   ['ability_id_1', 'ability_id_2', /* up to 8 */ ],
  burstAbility:'my_burst',
  passives:    ['my_passive'],    // max 1 for base classes, 2 for fusions
  description: 'Longer tooltip description.',
  lore:        'Flavour text shown in collection.',

  // Optional — for classes that require purchase/unlock conditions:
  unlockCost:  { shards: 50 },   // shard cost to unlock in class select
  conquestOnly: true,            // if true, requires conquest completion
}
```

### Register the Unlock Cost

If your class requires shards to unlock, add an entry in `CLASS_UNLOCK_COSTS` in `js/data/classes.js`:

```javascript
const CLASS_UNLOCK_COSTS = {
  // existing entries...
  my_class: { shardCost: 50, floor: 8 },  // shards, and the floor you must have reached
};
```

A class needs **8 different abilities** (tests/data.test.js checks this), and
its Burst goes in `burstAbility`, never in `abilities`. To see how a new
class compares, run `node tools/class_balance.js my_class`: it simulates
fights and prints the win rate next to the other classes (most land at 60–88%).

### Register the Rarity

Add your class ID to `CLASS_RARITY` in `js/data/fusion.js`:

```javascript
const CLASS_RARITY = {
  // existing entries...
  my_class: 'rare',
};
```

---

## 4. Adding Abilities

Abilities go in `js/data/abilities.js` inside the `ABILITIES` object. Add hand-written abilities **before line ~680** (the generated section starts after that — do not edit the generated section).

### Ability Object Shape

```javascript
my_ability: {
  id:         'my_ability',
  name:       'My Ability',
  icon:       '💫',
  cost:       25,              // resource cost
  costType:   'mp',            // 'mp' or 'hp' ('burst' only for burstAbility)
  cooldown:   0,               // current cooldown (always 0 in definition)
  maxCooldown:2,               // turns before ability can be used again (0 = no cooldown)
  color:      '#aa44cc',       // button colour in UI
  element:    'shadow',        // element for damage calculation and type effectiveness
  desc:       'What this ability does.',
  tags:       ['physical'],    // see Tags below
  // optional: return a reason string when the ability can't be used right now
  // (the button greys out and shows it), e.g. an effect already on the enemy
  unusable: (p, e) => e._marked ? 'Already marked.' : null,
  use: (p, e) => {
    // p = player object, e = enemy object
    // Return a string — shown in the combat log
    const dmg = Math.round(calcDmg(p.stats.atk * 1.5, e.def));
    dealDmgToEnemy(e, dmg, false, false, false, 'shadow');
    return `My Ability hits for ${dmg}!`;
  }
},
```

### Tags

| Tag | Effect |
|---|---|
| `physical` | Uses `getDmgMult()` for damage multiplier |
| `magic` | Uses `getMagicDmgMult()` for damage multiplier |
| `heal` | Restores HP (log entry type 'heal') |
| `buff` | Applies a buff status to player |
| `debuff` | Applies a debuff to enemy |
| `execute` | Damage that scales with missing enemy HP |
| `dot` | Damage over time |
| `aoe` | Multi-hit (no mechanical difference, just flavour for now) |

### Damage Functions

```javascript
// Physical damage to enemy
dealDmgToEnemy(e, dmg, isCrit, isDot, isMagic, atkElement);

// Magic damage to enemy
dealDmgToEnemy(e, dmg, isCrit, false, true, 'shadow');

// Damage to player. While an enemy acts, G._actingEnemy is the attacker
// (reflects, misses and its element apply to it). DoT ticks have no attacker.
dealDmgToPlayer(dmg);

// Enemy healing — always use this so "no healing" effects are respected
healEnemy(e, amount);

// Instant kill — bosses/guardians lose 25% max HP instead
executeEnemy(e, 'My Ability');

// Base damage formula with ±15% variance
calcDmg(atk, def);  // max(1, atk - def) ± 15%

// Crit check pattern
const isCrit = rand(100) < Math.min(95, p.stats.crit + bonusCritChance);
const critMult = getCritMult(p); // 1.5 + critDmg/100
```

### Status Effects in Abilities

```javascript
// Apply a status to player or enemy via addStatus()
p.stats.atk += 5;              // ← YOU change the stat…
addStatus(target, {
  id:       'my_buff',
  name:     'My Buff',
  type:     'buff',           // 'buff' or 'debuff'
  icon:     '✨',
  duration: 3,                // ticks: lasts 3 of the owner's turns
  atkBonus: 5,                // …and record it so expiry undoes it
  // optional per-turn callback (damage-over-time, regen…)
  onTurn: (target) => {
    dealDmgToEnemy(target, 10, false, true);
  }
});
```

How statuses behave (status.js):

- **Timing** — a status ticks at the end of its owner's turn: `onTurn` runs,
  then duration drops by 1. A status applied during its owner's own turn
  skips that first tick, so "for 3 turns" means the next 3 turns.
- **Record fields** — `atkBonus/defBonus/spdBonus/critBonus` are subtracted on
  expiry; `atkPen/defPen/spdPen` (and `atkLoss/defLoss/spdLoss`) are added back.
  Re-applying an active status **refreshes** it: the longer duration and the
  larger amount win, so casting "-25% DEF" twice is still -25%. Give the
  status a `stacks` field (e.g. `stacks:1`) to make amounts add up instead,
  up to 10 stacks.
- **onApply / onTurn stat changes** — if `onApply` or `onTurn` changes stats,
  the engine applies it **once** (not every turn) and undoes it on expiry
  unless your `onExpire` already does. Prefer the record fields above.
- **Hooks** — `onApply`, `onTurn`, `onExpire`, `onRemove` (cleanse), plus
  combat hooks `onHit(p, attacker)`, `onDamage(p, dmg, attacker)`.
- **Mechanics fields** the engine understands: `dmgReduce` (fraction off
  incoming), `dodgeChance`/`dodgeBonus`, `dodgesRemaining`, `reflectPct`,
  `counterOnHit`, `echoOnHit`, `lifestealBonus`, `fullLifesteal`, `immuneStun`,
  `dmgMult` (player), and on enemies `incomingDmgMult`, `dmgAmpIn`, `noHeal`,
  `hpCapPct`, `atkMult`, `dmgReduction`, `missNext`.
- **Cleansing** — use `removeStatuses(entity, s => s.type === 'debuff')`, which
  undoes stat changes. Don't just filter `entity.status`.
- Whatever happens, every temporary stat change is reset when the fight ends.
  Enemies you flee from also go back to the stats they had when the fight began.
- **Randomness** — use `rand(n)` / `randFloat()` for anything that affects
  play, never `Math.random()`. They follow the run's seed, so seeds reproduce
  floors and reloading a save can't re-roll results. `Math.random()` is only
  for cosmetics (particles, sounds).

### Built-in Status Helpers

For Burn, Entropy, and Plague — use the helpers in `utils.js` rather than building them manually:

```javascript
applyBurn(e, p, stacks);    // fire DoT, stacks up to 10
applyEntropy(e, p, stacks); // reduces enemy ATK+DEF by 2 per stack
applyPlague(e, p, stacks);  // poison DoT, stacks up to 10

// Clearing them (also restores stat changes)
clearBurn(e);
clearEntropy(e);
clearPlague(e);
```

---

## 5. Adding a Fusion Class

Fusion classes are lazy-loaded from numbered files in `js/data/fusions/`. There are two places to register your fusion:

### Step 1 — Register the Recipe in fusion_lookup.js

`fusion_lookup.js` maps a sorted recipe key to a file number. The key is always alphabetically sorted class IDs joined by `+`:

```javascript
// In fusion_lookup.js, add to FUSION_FILE_LOOKUP:
'my_class+shadowblade': 17,   // whichever file number you're adding to
```

**Key format rule:** always sort the two IDs alphabetically. `ironclad+shadowblade` not `shadowblade+ironclad`.

### Step 2 — Add the Recipe and Class to a fusion_data_N.js File

Pick an existing file with space or create `fusion_data_18.js` (files are loaded on demand by `loadFusionFile(n)` — no `<script>` tag needed; bump `FILE_COUNT` in `tools/build_fusion_index.js` and the `17` in `tests/helpers.js`).

```javascript
// In FUSION_RECIPES_N at the top of the file:
'my_class+shadowblade': 'my_fusion_id',

// In FUSION_CLASSES_N below:
my_fusion_id: {
  id:         'my_fusion_id',
  name:       'My Fusion',
  icon:       '⚔️',
  tagline:    'Two halves of one catastrophe.',
  color:      '#7755aa',
  element:    'shadow',         // must be a key of ELEMENTS (matchups, badges, affinity)
  elementFlavor: 'duskblade',   // optional display-only flavor name
  rarity:     'rare',           // see Rarity Tiers
  fusedFrom:  ['my_class', 'shadowblade'],
  stats:      { hp:90, maxHp:90, mp:70, maxMp:70, atk:13, def:7, spd:13, crit:15 },
  statDisplay:{ HP:6, ATK:9, DEF:5, SPD:8, MP:7 },
  abilities:  ['ability_1', 'ability_2', 'ability_3', 'ability_4',
               'ability_5', 'ability_6', 'ability_7', 'ability_8'],
  burstAbility:'burst_ability_id',
  passives:   ['passive_1', 'passive_2'],  // fusion classes get 2 passives
  description:'Description shown in class select.',
  lore:       'Lore shown in collection.'
},
```

### Step 3 — Register Rarity

Add to `CLASS_RARITY` in `fusion.js`:

```javascript
my_fusion_id: 'rare',
```

### Step 4 — Rebuild the fusion indexes

```bash
node tools/build_fusion_index.js
```

This regenerates `FUSION_CLASS_FILE` (class id → file, used to load a saved
fusion run after a page refresh), gives any class with a made-up element a
real one (keeping the old name as `elementFlavor`), and renames a class id if
two recipes produce the same id. Both parent classes must reach
`FUSION_MIN_LEVEL` (20, in fusion.js) before the fusion can be made.

```

---

## 6. Implementing Passives

A passive ID in `p.passives` does nothing unless it has an implementation.
New passives go in **`js/engine/passives.js`**:

1. Add a name and an accurate description to `PASSIVE_INFO` (the stats-panel
   tooltip reads it — keep the text matching what the code does).
2. Add hooks to `PASSIVE_HOOKS`:

```javascript
PASSIVE_HOOKS.my_passive = {
  onCombatStart(p, enemies, st) { /* once per fight; st = per-fight scratch state */ },
  damageMult(p, e, ctx, st) {     /* outgoing multiplier; ctx: {direct, isDot, magic, kind, element} */
    return ctx.element === 'fire' ? 1.2 : 1;
  },
  onIncoming(p, dmg, attacker, st) { return dmg; },   // before shields/HP
  onDamaged(p, dmg, attacker, st) {},                 // after HP was lost
  onLethal(p, dmg, attacker, st) { return false; },   // true = survive the hit
  onAbilityCast(p, abilityId, st) {},
  onActionEnd(p, ctx, st) {},                         // ctx: {kind, directHits}
  onEnemyTurnEnd(p, st) {},
  opening(p, enemies, st) { return 'player'; },       // force first move in round 1
};
```

The data test `every passive has a name, a description and an implementation`
fails if a class uses a passive missing from either table.

Older passives (iron_skin, combustion, phase, gust, …) are still handled
inline in `startCombat()` / `dealDmgToEnemy()` in combat.js via `G._…Active`
flags (listed in `LEGACY_PASSIVES`); any new flag must be cleared in
`endCombat()`.

### dmgMult Status Buff

For temporary damage multipliers (like after using a special ability), apply a status buff with a `dmgMult` field — `getDmgMult()` reads it automatically:

```javascript
addStatus(p, {
  id: 'power_surge', name: 'Power Surge', type: 'buff',
  icon: '⚡', duration: 3,
  dmgMult: 1.5   // ← getDmgMult() multiplies by this
});
```

---

## 7. Adding an Enemy

Enemies go in the `ENEMIES` array in `js/data/enemies.js`.

### Enemy Object Shape

```javascript
{
  id:          'my_enemy',
  name:        'My Enemy',
  icon:        '👾',
  element:     'fire',
  hp:          80,
  maxHp:       80,
  atk:         14,
  def:         6,
  spd:         10,
  xp:          40,
  gold:        [10, 20],       // [min, max] gold drop range
  loot:        0.4,            // 0.0–1.0 drop chance
  minFloor:    1,              // earliest floor this enemy appears
  maxFloor:    10,             // latest floor (omit for no upper cap)
  patterns:    ['basic', 'heavy', 'basic', 'double', 'basic'],
  status:      [],             // start empty, always
  patternIndex:0,              // start at 0, always
  currentPhase:0,              // start at 0, always
  enrageCount: 0,              // start at 0, always
}
```

### Enemy Ability Patterns

`patterns` is an array of `ENEMY_ABILITIES` keys. The enemy cycles through them in order. Available patterns:

| Key | Effect |
|---|---|
| `basic` | Standard ATK damage |
| `heavy` | 160% ATK, 70% DEF pierce |
| `double` | Two hits of 70% ATK each |
| `stun_strike` | Damage + stun player for 1 turn |
| `charge` | Skip turn to boost ATK, then heavy attack |
| `poison_spit` | Damage + apply poison DoT |
| `life_drain` | Damage + heal self 40% of damage dealt |
| `shadow_slash` | Shadow element heavy hit |
| `void_tear` | Void element + 2-turn DEF reduction |
| `wail` | Reduce player DEF 30% for 2 turns + hit |
| `curse` | Reduce player ATK+DEF by 1 for 3 turns + hit |
| `summon` | Heals enemy 20% max HP |

Add custom enemy abilities to `ENEMY_ABILITIES` at the top of `enemies.js`.

---

## 8. Adding a Boss

Bosses appear on BOSS_FLOORS (every 5th floor). They're defined in the `BOSSES` array in `enemies.js`.

### Boss Object Shape

Bosses extend the enemy shape with `isBoss`, `phases`, `enrageTurns`:

```javascript
{
  id:          'my_boss',
  name:        'My Boss',
  icon:        '👁️',
  element:     'dark',
  isBoss:      true,
  hp:          500, maxHp:500,
  atk:         30, def:18, spd:12,
  xp:          300, gold:[80, 130], loot:1.0,
  patterns:    ['heavy', 'basic', 'void_tear', 'charge', 'heavy'],

  // Boss phases — triggered at HP thresholds
  phases: [
    {
      threshold:   0.5,         // triggers when HP drops below 50%
      name:        'Phase 2: Awakened',
      atkBoost:    15,          // permanent ATK increase on phase change
      defBoost:    8,
      announce:    'MY BOSS AWAKENS — It was holding back.',
      newPatterns: ['charge', 'heavy', 'void_tear', 'charge', 'heavy'],
    },
  ],

  enrageTurns:   10,            // ATK/DEF boost every N turns
  enrageAnnounce:'My Boss ENRAGES!',

  status:      [], patternIndex:0, currentPhase:0, enrageCount:0,
}
```

### Assigning Bosses to Floors

Boss floors are listed in `BOSS_FLOORS`, and `BOSS_BY_FLOOR` (enemies.js) names
the usual boss for each. `BOSS_RIVALS` names an alternative: on that floor
`getBossForFloor(floor)` picks one of the two from the floor's seed. To add a
boss, put it in `ENEMY_POOL` with `isBoss:true`, then make it the floor's
boss or its rival. `getBossForFloor(floor, 'my_boss')` forces a specific
boss for testing.

A new enemy move goes in `ENEMY_ABILITIES` and also needs an entry in
`ENEMY_ABILITY_INFO` (the "Next:" telegraph) and `ABILITY_ROLE` (AI
weighting); tests/content.test.js checks all three. Assign the move's result,
`dmg = dealDmgToPlayer(dmg)`, so the log shows the damage actually taken.
Use the `'drain'` role only for moves that heal the enemy.

---

## 9. Adding a Secret Boss

Secret bosses have a unique spawn system. They trigger on floor transitions based on conditions and RNG. All secret boss data lives in `js/data/fusion.js`.

### Step 1 — Define the Boss in SECRET_BOSSES

```javascript
const SECRET_BOSSES = {
  // ... existing bosses ...

  my_secret_boss: {
    id:               'my_secret_boss',
    name:             'My Secret Boss',
    icon:             '🌑',
    title:            'One-line flavour title.',
    triggerWindow:    { minFloor:10, maxFloor:25 },
    triggerChance:    0.08,     // 8% per eligible floor transition
    triggerCondition: 'reached_floor_10', // see conditions below
    unlocks:          { fusionClass:'my_secret_class' },
    announcement:     '??? Something lurks ahead. Something wrong.',
    enemy: {
      id:'my_secret_boss', name:'My Secret Boss', icon:'🌑', element:'void',
      isBoss:true, isSecretBoss:true,
      hp:800, maxHp:800, atk:45, def:20, spd:15,
      xp:500, gold:[150, 220], loot:1.0,
      patterns:['heavy','void_tear','shadow_slash','charge','heavy'],
      phases: [
        { threshold:0.5, name:'Phase 2: True Form', atkBoost:20, defBoost:12,
          announce:'IT TRANSFORMS — the real fight begins.',
          newPatterns:['charge','void_tear','heavy','charge','shadow_slash'] },
      ],
      enrageTurns:11, enrageAnnounce:'My Secret Boss ENRAGES!',
      status:[], patternIndex:0, currentPhase:0, enrageCount:0,
    }
  },
};
```

### Trigger Conditions

Add new conditions to `meetsSecretBossCondition()` in `fusion.js`:

| Existing condition | When true |
|---|---|
| `'has_dark_element'` | Player class element is shadow/dark/void |
| `'has_poison_ability'` | Player has a poison-tagged ability |
| `'reached_floor_10'` | `G.meta.maxFloor >= 10` |
| `'meta_max_floor_20'` | `G.meta.maxFloor >= 20` |
| `'defeated_2_secret_bosses'` | 2+ secret bosses in `defeatedSecretBosses` |

For a custom condition:

```javascript
case 'my_condition':
  return G.meta.classLevels['shadowblade'] >= 15; // example
```

### Step 2 — Add the Unlock Class

Add the secret class to `FUSION_CLASSES` and `CLASS_RARITY` in `fusion.js`, and to `CLASSES` in `classes.js` (secret classes live in both — see the architecture note in the comments at the top of the `SECRET_BOSS_UNLOCK CLASSES` section).

### Step 3 — Register in SECRET_BOSS_CLASS_IDs

```javascript
const SECRET_BOSS_CLASS_IDS = [
  'voidreaper', 'plagueborn', 'stormlord', 'soulrender', 'abyssal_tyrant',
  'my_secret_class',   // ← add here
];
```

### Testing Your Secret Boss

In the dev console:

```
triggersecret my_secret_boss_key
```

Then descend a floor. The boss spawns immediately regardless of floor window or condition.

---

## 10. Adding Items

Items go in the `ITEM_POOL` array in `js/data/items.js`.

### Consumable Shape

```javascript
{
  id:       'my_consumable',
  name:     'My Consumable',
  type:     'consumable',
  icon:     '🧪',
  rarity:   'uncommon',
  element:  'fire',
  desc:     'What it does.',
  use: (p) => {
    p.stats.atk += 5;
    addStatus(p, { id:'powered', name:'Powered', type:'buff', icon:'🔥', duration:3, atkBonus:5 });
    logEntry('status-applied', 'My Consumable: +5 ATK for 3 turns!');
  }
},
```

Item `id`s must be unique and stable: saves store items as JSON (functions are
dropped) and `rehydrateItem()` rebuilds `use` from `ITEM_POOL` by id on load.
Damage items should just lower the enemy's HP — `useItemInCombat()` calls
`checkCombatEnd()`; never call `winCombat()` from an item.

### Equipment Shape

Equipment uses `effect` tokens that `hasEquipEffect()` checks. Compound effects use `_` as a separator:

```javascript
{
  id:      'my_weapon',
  name:    'My Weapon',
  type:    'weapon',          // 'weapon' | 'armor' | 'relic'
  icon:    '⚔️',
  rarity:  'rare',
  element: 'fire',
  desc:    'Burns with purpose.',
  effect:  'burnboost_lifesteal',   // checked via hasEquipEffect(p, 'burnboost') etc.
  bonuses: { atk: 8, crit: 5 },    // permanent stats while equipped (any key of p.base)
  grantAbilities: ['my_ability'],  // optional: weapons can add abilities to the bar
}
```

**Built-in effect tokens** (checked in `utils.js`):

| Token | Effect |
|---|---|
| `burnboost` | +1 Burn stack on all Burn applications |
| `burnboost2` | +3 Burn stacks |
| `lifesteal` | Attacks restore HP |
| `piercing` | Damage partially ignores DEF |
| `spellmaster` | +20% magic damage |
| `deathcharm` | +15% dmg below 50% HP |
| `bloodpact` | +25% dmg below 30% HP |
| `heartofabyss` | +30% dmg always |
| `evasion2` | Chance to dodge attacks |
| `mpregen2` | MP regen per turn |

### Floor-Tiered Loot

Drops pick a rarity from `LOOT_ANCHORS` in `items.js` (weights at anchor
floors, interpolated between them, so quality only rises with depth), then a
random item of that rarity. Boss loot uses `getBossLootByFloor()`.

---

## 11. Adding Events

Events go in the `EVENTS` array in `js/data/events.js`.

```javascript
{
  id:   'my_event',
  name: 'My Event Name',
  icon: '🔮',
  desc: 'Descriptive room flavour text.',
  choices: [
    {
      // text can be a string or (p) => string so costs can scale with depth
      text:   () => `Offer ${evScale(20)} HP for power (+5 ATK)`,
      effect: (p) => {
        // p = player object. Must return a string (shown as outcome text)
        if (p.stats.hp > evScale(20) + 10) {
          p.stats.hp -= evScale(20);
          addPermanentStat(p, 'atk', 5);   // NOT p.stats.atk += 5 — that ends with the next fight
          return 'Power gained. Blood spent.';
        }
        return 'You lack the resolve.';
      }
    },
    {
      text:   'Choice B label',
      effect: (p) => {
        p.gold += 30;
        return 'You pocket the coin and move on.';
      }
    },
    {
      text:   'Leave',
      effect: (p) => { return 'You leave it undisturbed.'; }
    },
  ]
},
```

Helpers: `evScale(n)` scales a number with the floor; `addFloorEffect(p, {name, stat, amount, floors})`
applies a stat change that reverts after that many floors; `inventoryFull(p)` before giving items.
The data test `every event choice resolves cleanly at any depth` runs every choice.

**Important:** Event `effect` functions cannot be serialised to JSON. The save system stores only `eventIndex` (the index in the `EVENTS` array). This means:
- Never reorder `EVENTS` entries without considering existing save files
- New events should always be appended to the end of the array

---

## 12. Adding a New Element

Elements are defined in `js/data/elements.js`.

### Step 1 — Add to ELEMENTS

```javascript
const ELEMENTS = {
  // ... existing ...
  my_element: { id:'my_element', name:'My Element', icon:'🌟', color:'#ffaa00' },
};
```

### Step 2 — Add to the Effectiveness Table

The effectiveness table in `elements.js` controls type matchups. Find `ELEMENT_EFFECTIVENESS` and add your element's row:

```javascript
my_element: {
  fire:     1.0,
  water:    0.5,
  // ... etc. for every element
}
```

### Step 3 — Add to RARITY_ORDER in fusion.js

If you want it to appear in collection tabs, no changes needed — elements aren't tabs. But if you're adding an exotic element, make sure the `dealDmgToEnemy()` function in `combat.js` can resolve its effectiveness via `getTypeEffectiveness()`.

---

## 13. Rarity Tiers

Rarities are defined in `RARITY_TIERS` in `fusion.js`. From lowest to highest:

| Rarity | Stars | Colour | Notes |
|---|---|---|---|
| `common` | 1 | grey | Base drops |
| `uncommon` | 2 | green | |
| `rare` | 3 | blue | Default for most base classes |
| `epic` | 4 | purple | |
| `legendary` | 5 | gold | |
| `mythical` | 6 | red | |
| `divine` | 7 | cyan | High-tier fusions |
| `secret` | 8 | orange | Secret boss unlock classes |
| `abyssal` | 9 | purple | The Convergence, The Unnamed, Abyssal One |

**Collection tab routing:**
- `secret` rarity → Secret tab (NOT the Fusions tab)
- `abyssal` rarity → Abyssal tab (NOT the Fusions tab)
- Everything else with `isFusion=true` → Fusions tab
- Everything else → its named rarity tab

---

## 14. The Dev Console

Developer tools only load when the page URL ends with **`?dev=1`**
(e.g. `index.html?dev=1`). Then open the console with the **backtick (`)** or
**F2** key. `?dev=1` also loads `devtest.js` (run `devtest()` in the browser
console) and `debug_logger.js` (logs every core call; see `window.__abyssalDebugLog`).

### Automated tests

From the repository root: `npm install` once, then `npm test`. The suite boots
the real game in headless Chromium and checks data integrity, fuzzes every
ability, covers past bugs, and has a bot play several floors through the UI.

| Command | Effect |
|---|---|
| `unlockall` | Unlock every class and fusion |
| `unlocksecret [name]` | Unlock a specific secret class: `herald`, `rot`, `tempest`, `horror`, `warden` |
| `triggersecret [name]` | Queue a secret boss to spawn on next floor descent |
| `converge` | Force-unlock The Convergence (unlocks + maxlevels all 5 secret classes) |
| `maxlevel` | Set current class to level 20 |
| `maxlevel all` | Set ALL unlocked classes to level 20 |
| `shards [n]` | Set soul shards to n |
| `floor [n]` | Jump to floor n |
| `heal` | Restore player to full HP/MP |
| `killboss` | Instantly kill the current enemy |
| `diagcollection` | Dump collection state — useful for debugging unlock issues |
| `help` | List all commands |

---

## 15. Common Mistakes

### Fusion class shows as raw ID (e.g. `chrono_spellsword`)

The fusion data file hasn't loaded yet. Always navigate via `showScreen()`, not by calling `renderClassSelect()` or `renderCollection()` directly — `showScreen()` calls `preloadPlayerFusions()` first.

### Class not appearing in class select

Check that:
1. The class ID is in `G.meta.unlockedClasses` (for base/secret/abyssal) OR `G.meta.unlockedFusions` (for crafted fusions)
2. The class is defined in `CLASSES` (base/secret) OR `FUSION_CLASSES` (fusion-only)
3. The fusion file has loaded (use `diagcollection` in dev console)

### Class appears twice in class select

The class is in both `CLASSES` and is also being pushed from `unlockedFusions`. `renderClassSelect()` skips fusion entries where `CLASSES[id]` already exists. If you added a class to `CLASSES` but it's also in a `fusion_data_N.js` file AND in `unlockedFusions`, the dedup guard handles it — but double-check `CLASS_RARITY` and that `fusedFrom` is set correctly.

### Passive does nothing

Passives are strings only — they need an entry in `PASSIVE_INFO` and `PASSIVE_HOOKS` (passives.js). See section 6. `npm test` flags any passive without an implementation.

### Exit tile spawns in a wall after secret boss

The secret boss arena is 28×28 with a room carved from (4,4) to (23,23). Any exit placement outside that range lands on a wall. Hardcode exit coordinates using the known room constants rather than deriving from `G.mapW`/`G.mapH` (which may still hold the previous floor's dimensions).

### Status effect stat changes not reversing on expiry

If you change a stat when applying a status, record it with `atkBonus`/`atkPen`
(etc.) on the status so expiry undoes it mid-fight. Even if you forget, every
temporary change is reset when the fight ends. For a PERMANENT change use
`addPermanentStat()` — a plain `p.stats.atk += n` does not survive the fight.

### Save file breaks after structural changes to G

Run saves store the whole player and map (minus functions). Plain new fields on
the player or map cells are saved automatically. If you change the meaning of
existing fields, bump `RUN_SAVE_VERSION` in `run_save.js` (old saves then show
"Couldn't load save" and can be deleted) or add migration in `_deserialiseRun()`.
Run-level fields on `G` itself must be added to `_serialiseRun()`/`_deserialiseRun()`.
New `G.meta` fields go in `defaultMeta()` in state.js.

### Abilities defined after line ~6124 in abilities.js

That section was machine-generated, but the generator script is no longer part
of the project, so hand edits there are now safe and permanent. Prefer adding
new hand-crafted abilities near the top of the file with the class they belong
to.
