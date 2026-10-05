# 🌑 ABYSSAL
## Complete Game Reference Document
### Browser-Based Roguelike Dungeon Crawler — Floor 1 to 50

---

## 🗺️ Core Gameplay Loop

ABYSSAL is a browser-based roguelike dungeon crawler where you descend a procedurally generated dungeon floor by floor, fighting enemies in turn-based combat, collecting loot, levelling up, and pushing toward Floor 50 to face the Abyssal God. Each run is distinct due to BSP map generation, randomised item drops, and a floor-scaling difficulty system.

- **Difficulty Tiers:** Normal → Hard → Brutal → Abyssal — each tier scales enemy ATK, DEF, and HP significantly (×1.0 / ×1.25 / ×1.6 / ×2.0 base stat multiplier).
- **Milestone Floors:** Boss floors every 5th floor apply an additional ×1.5 stat multiplier and trigger phase-based boss fights.
- **Win Condition:** Defeat THE ABYSSAL GOD on Floor 50. Doing so unlocks The Abyssal One class and grants the Crown of the Abyss relic permanently.

---

## 🧙 Classes — 639 Total

The class roster is split into four categories: **Base** (unlocked via Soul Shards or free), **Secret** (unlocked by defeating secret bosses), **Abyssal** (endgame unlocks), and **Fusion** (crafted by combining two classes in the Fusion Lab).

### Class Systems

Each class has:
- **8 class abilities** — unique to that class
- **1 burst ability** — charged via combo meter (fills at 5 charges); powerful damage at 500–800% ATK
- **1 passive** (base classes) or **2 passives** (fusion classes) — always-active combat bonuses
- **Weapon Arts** — equipping a weapon with a different element than your class swaps your abilities to a matching Arts set, enabling massive build variety across 40+ element combinations

### Class Levelling & Fusion
Each class has a level (max 20) that persists across runs. Reaching level 10 on two classes enables you to fuse them in the Fusion Lab, creating a new class with both parents' abilities and two passives.

---

### Base Classes (36)

Free or unlockable with Soul Shards. Unlock requires reaching the listed floor on any run, then spending shards.

| Icon | Class | Element | Unlock |
|---|---|---|---|
| 🗡️ | Shadowblade | Shadow | Free |
| 🛡️ | Ironclad | Steel | Free |
| 🔥 | Pyromancer | Fire | 30 shards (Floor 2) |
| 🌍 | Geomancer | Ground | 40 shards (Floor 3) |
| 🗡️ | Sentinel | Steel | 40 shards (Floor 3) |
| 🦁 | Beastmaster | Normal | 50 shards (Floor 4) |
| ⚡ | Stormcaller | Electric | 65 shards (Floor 5) |
| 🩸 | Blood Knight | Dark | 70 shards (Floor 6) |
| 🔱 | Runeblade | Normal | 75 shards (Floor 7) |
| 🌊 | Tidecaller | Water | 75 shards (Floor 7) |
| 💨 | Windwalker | Wind | 85 shards (Floor 8) |
| ⚔️ | Warlord | Fighting | 95 shards (Floor 9) |
| 🪦 | Gravewarden | Ghost | 105 shards (Floor 10) |
| ❄️ | Frostweaver | Ice | 130 shards (Floor 12) |
| ⚜️ | Paladin | Fairy | 145 shards (Floor 13) |
| 🐉 | Dragonknight | Dragon | 160 shards (Floor 14) |
| 🌙 | Soulweaver | Ghost | 175 shards (Floor 15) |
| 💀 | Necromancer | Ghost | 175 shards (Floor 15) |
| 💡 | Lightbringer | Light | 185 shards (Floor 16) |
| ⚔️ | Spellsword | Psychic | 200 shards (Floor 17) |
| 🔊 | Soundbreaker | Sound | 200 shards (Floor 17) |
| 🧲 | Magnetist | Magnet | 215 shards (Floor 18) |
| 🌀 | Gravitist | Gravity | 240 shards (Floor 20) |
| 🦠 | Plague Doctor | Poison | 260 shards (Floor 21) |
| 🌀 | Voidmancer | Shadow | 280 shards (Floor 22) |
| 🤖 | Techsavant | Tech | 295 shards (Floor 23) |
| ⏳ | Chronomancer | Time | 310 shards (Floor 24) |
| 🔯 | Hexblade | Dark | 330 shards (Floor 25) |
| 👼 | Spiritwalker | Spirit | 345 shards (Floor 26) |
| 💎 | Crystalmancer | Crystal | 380 shards (Floor 29) |
| 🦠 | Pestilence Lord | Poison | 420 shards (Floor 32) |
| 🔮 | Arcanist | Psychic | 460 shards (Floor 35) |
| ☄️ | Doomcaster | Dark | 520 shards (Floor 38) |
| 🌌 | Cosmomancer | Cosmic | 580 shards (Floor 43) |
| 👻 | Phantom | Ghost | 650 shards (Floor 46) |
| 🖤 | Nullbringer | Dark | 700 shards (Floor 47) |

**Class Mechanical Highlights**
- **Shadowblade:** Combo counter — Night Blade deals +20% per stack (max 10). Vanish guarantees next hit at 200% damage.
- **Ironclad:** Shield management — Retaliate uses current shield as bonus damage; Steel Resolve converts shield into HP.
- **Pyromancer:** Burn detonation — Inferno deals 200% ATK × Burn stacks; Cataclysm (burst) dumps 10 stacks instantly.
- **Stormcaller:** Stun synergy — Tempest Blade crits guaranteed on stunned targets; Ball Lightning deals 2× to Waterlogged enemies.
- **Blood Knight:** HP as resource — Sacrifice spends 25% HP for 300% ATK + HP spent; Frenzy stacks +5 ATK per Hemostrike use.
- **Voidmancer:** Entropy stacking — Singularity doubles Entropy stacks; Annihilate consumes all stacks for 150% ATK per stack.
- **Necromancer:** Plague DoT — Plague Nova detonates stacks for 250% + 50% per stack; Raise Dead heals 20 HP per stack.
- **Soulweaver:** Lifesteal-heavy — Death Coil heals 100% of damage dealt; Astral Veil dodges 2 hits and counter-heals.
- **Paladin:** Holy synergies — Divine Lance fully pierces DEF vs ghost/dark enemies; Radiant Aura cleanses all debuffs + heals.
- **Runeblade:** Debuff runes — Time Rune reduces all cooldowns by 1; Crystal Rune embeds shards for per-turn crystal DoT.
- **Nullbringer:** Sunder system — five unique sunder abilities each permanently remove a different aspect of the enemy (flesh, will, form, time, existence); Anatomical Study amplifies all damage to sundered enemies.

---

### Secret Classes (5)

Unlocked by defeating a specific secret boss in a run. Secret bosses spawn randomly during floor transitions when certain conditions are met — only one per run.

| Icon | Class | Element | Unlock Condition | Secret Boss |
|---|---|---|---|---|
| 🌑 | Voidreaper | Void | Play a shadow/dark/void class; floors 5–15 | The Herald of Nothing |
| 🦠 | Plagueborn | Poison | Have a poison ability in your kit; floors 8–18 | The Rot |
| ⛈️ | Stormlord | Electric | Reach floor 10 on any prior run; floors 10–22 | The Tempest Unbound |
| 👁️ | Soulrender | Ghost | Reach floor 20 on any prior run; floors 15–28 | The Undying Horror |
| 🔱 | Abyssal Tyrant | Dark | Defeat 2 other secret bosses first; floors 20–35 | The First Warden |

Secret bosses have a reduced 50% trigger chance on repeat encounters (for re-farming or fun after already unlocking the class).

---

### Abyssal Classes (3)

The rarest classes — each requires exceptional progression to access.

| Icon | Class | Element | How to Unlock |
|---|---|---|---|
| 👁️ | The Abyssal One | Shadow | Defeat the Abyssal God (Floor 50 conquest) |
| ✦ | The Convergence | Void | Fuse all 5 secret classes together at level 20+ each |
| 　 | The Unnamed | (none) | Fuse The Convergence + The Abyssal One at level 20+ each |

**The Convergence** — Starts in Null Form with no element. Each turn it reads the enemy and evolves, cycling through Execute, DoT, Drain, Control, and Burst forms. Each form unlocks a unique version of its abilities. Resets at turn 10 at double power.

**The Unnamed** — The final class. Combines everything. Its passive `phase` gives a 25% chance on every hit to bypass all enemy DEF entirely.

---

### Fusion Classes (595)

Created in the Fusion Lab by combining any two unlocked base or secret classes, both at level 10 or higher. Fusion classes inherit a mix of both parents' abilities and gain two passives.

**Fusion Rarity Distribution:**
| Rarity | Count |
|---|---|
| Uncommon | 50 |
| Rare | 189 |
| Epic | 201 |
| Legendary | 138 |
| Mythical | 46 |
| Divine | 6 |

**Example Fusions:**
- 🌑 Shadowblade + 🛡️ Ironclad → **Darkguard** (shadow+steel tank-assassin)
- 🌙 Soulweaver + 🗡️ Shadowblade → **Shade Reaper** (lifesteal+burst)
- 🔥 Pyromancer + ⚡ Stormcaller → **Infernal Tempest** (burn+stun)
- 🌀 Voidmancer + ⏳ Chronomancer → **Void Chronomancer** (entropy+time manipulation)
- 👻 Phantom + 🖤 Nullbringer → various divine-tier combinations

---

## 👾 Enemies — 91 Total (81 Regular + 10 Bosses)

### Regular Enemies

All enemies scale with floor depth: base stats are multiplied by floor tier (×1.0/×1.25/×1.6/×2.0), an additional per-floor scale factor (+18% per floor), and the player's selected difficulty multiplier.

**Tier 1 — Floors 1–7 (21 enemies)**
💀 Restless Skeleton · 👻 Hollow Wraith · 👺 Abyssal Goblin · ⚔️ Cursed Armor · 🪱 Grave Worm · 😈 Shadow Imp · 🗡️ Hollow Knight · 🕷️ Giant Cave Spider · ❄️ Frost Sprite · 🐢 Mud Crawler · 🦇 Rabid Bat · 🧹 Bog Witch · 🪨 Stone Sprite · 🌱 Vine Horror · 🗿 Cracked Golem · 🔵 Ice Wisp · 🐀 Crypt Rat · 💨 Wind Sprite · 🔥 Ember Imp · 🐺 Dire Wolf · 🦀 Thunder Crab

**Tier 2 — Floors 8–20 (24 enemies)**
🧛 Blood Vampire · 🧙 Ancient Lich · 🧟 Flesh Ghoul · 🌑 Soul Eater · 🐀 Plague Rat Swarm · 🌀 Void Stalker · 🐍 Abyssal Serpent · 🦀 Tide Crawler · 🌬️ Wind Wraith · 🐊 Swamp Horror · 🧊 Frost Revenant · 🦅 Thunder Hawk · 🦑 Deep Lurker · 🍄 Fungal Shaman · 🦂 Desert Scorpion · 🤖 Iron Golem · 🧜 Sea Witch · ⛈️ Storm Elemental · 👹 Bog Troll · 🦜 Screeching Harpy · ⚔️ Cursed Knight · 🪸 Coral Beast · 🌋 Lava Crawler · 🌑 Void Shade

**Tier 3 — Floors 21–50 (25 enemies)**
👿 Void Demon · 👻 Screaming Banshee · 🗿 Abyss Golem · ⚔️ Dread Knight · 🌪️ Chaos Elemental · 🦑 Abyssal Horror · 💀 Elder Lich · 🪨 Stone Golem · 🦅 Sky Predator · 🧊 Glacier Titan · 🔮 Void Witch · ⛈️ Storm Giant · ☠️ Plague Knight · 🐲 Abyssal Hydra · 🔥 Flame Archon · 🗜️ Iron Colossus · 💀 Death Specter · 🌳 Verdant Colossus · 🩸 Crimson Revenant · 🌀 Abyssal Djinn · 🐉 Tempest Wyrm · 🦀 Deep Tyrant · 🖤 Null Knight · 🦅 Abyssal Phoenix · 🔱 Runic Colossus

### Enemy Ability Types (14 patterns)

| Ability | Effect |
|---|---|
| `basic` | Standard ATK damage |
| `heavy` | 160% ATK, 70% DEF pierce |
| `double` | Two hits of 70% ATK each |
| `drain` | Damage + heal self 40% of damage dealt |
| `curse` | Damage + reduce player ATK/DEF by 1 for 3 turns |
| `wail` | Damage + reduce player DEF 30% for 2 turns |
| `poison_spit` | Damage + apply poison DoT |
| `charge` | Skip turn to boost ATK, then heavy attack |
| `stun_strike` | Damage + stun player for 1 turn |
| `life_drain` | Damage + heal self from absorbed HP |
| `shadow_slash` | Shadow element heavy hit |
| `infernal_breath` | Fire element hit + Scorched debuff |
| `void_tear` | Shield-piercing void attack |
| `enrage_strike` | Damage scales with enemy's own missing HP |

---

### Bosses (Floor 5, 10, 15, 20, 25, 30, 35, 40, 45, 50)

All 10 bosses are multi-phase encounters with phase-triggered stat boosts, pattern changes, and an enrage timer. Stats shown are base values before floor scaling.

---

**💀 The Bone Revenant · Floor 5**
*"It was buried for a reason."*
HP: 280 · ATK: 22 · DEF: 10 · SPD: 9 · Element: Ghost
Patterns: `basic, heavy, charge, curse`
Phase 2 (≤50% HP): Unchained — +8 ATK / +5 DEF. Patterns: `heavy, charge, curse, heavy`
Phase 3 (≤25% HP): Final Reckoning — +15 ATK / +8 DEF. Patterns: `charge, heavy, void_tear, charge`
⚠ Enrage: 20 turns

---

**🌑 The Shadow Tyrant · Floor 10**
*"Darkness given ambition."*
HP: 480 · ATK: 32 · DEF: 16 · SPD: 14 · Element: Shadow
Patterns: `shadow_slash, basic, void_tear, curse`
Phase 2 (≤50% HP): Shadow Incarnate — +12 ATK / +8 DEF. Patterns: `shadow_slash, void_tear, double, heavy`
Phase 3 (≤25% HP): The Abyss Speaks — +20 ATK / +12 DEF. Patterns: `void_tear, heavy, charge, void_tear`
⚠ Enrage: 18 turns

---

**🫧 The Plaguelord · Floor 15**
*"Disease is just evolution you disagree with."*
HP: 680 · ATK: 38 · DEF: 18 · SPD: 11 · Element: Poison
Patterns: `poison_spit, basic, curse, poison_spit`
Phase 2 (≤50% HP): Plague Bloom — +14 ATK / +10 DEF. Patterns: `poison_spit, heavy, poison_spit, curse`
Phase 3 (≤25% HP): Total Infection — +22 ATK / +14 DEF. Patterns: `poison_spit, charge, void_tear, poison_spit`
⚠ Enrage: 16 turns

---

**🌀 The Void Emperor · Floor 20**
*"He who sits at the center of nothing."*
HP: 920 · ATK: 48 · DEF: 22 · SPD: 16 · Element: Shadow
Patterns: `void_tear, shadow_slash, basic, void_tear`
Phase 2 (≤50% HP): Reality Fracture — +18 ATK / +12 DEF. Patterns: `void_tear, void_tear, heavy, shadow_slash`
Phase 3 (≤25% HP): Emperor Unchained — +30 ATK / +18 DEF. Patterns: `void_tear, charge, heavy, void_tear, charge`
⚠ Enrage: 15 turns

---

**🐉 The Crimson Leviathan · Floor 25**
*"Ancient beyond reckoning. Hungry beyond reason."*
HP: 1,200 · ATK: 58 · DEF: 26 · SPD: 13 · Element: Fire
Patterns: `infernal_breath, heavy, charge, basic`
Phase 2 (≤50% HP): Blazing Fury — +22 ATK / +15 DEF. Patterns: `infernal_breath, charge, heavy, infernal_breath`
Phase 3 (≤25% HP): Leviathan Ascendant — +38 ATK / +22 DEF. Patterns: `charge, infernal_breath, void_tear, charge, infernal_breath`
⚠ Enrage: 14 turns

---

**👁️ The Undying Archon · Floor 30**
*"It has watched every hero fall here."*
HP: 1,550 · ATK: 70 · DEF: 32 · SPD: 15 · Element: Ghost
Patterns: `life_drain, heavy, curse, wail`
Phase 2 (≤50% HP): Archon Resurgent — +28 ATK / +18 DEF. Dies and immediately returns stronger. Patterns: `life_drain, void_tear, heavy, curse`
Phase 3 (≤25% HP): True Undying — +45 ATK / +28 DEF. Every wound makes it angry. Patterns: `life_drain, void_tear, enrage_strike, curse`
⚠ Enrage: 13 turns

---

**👑 The Abyssal Sovereign · Floor 35**
*"The abyss chose a ruler. It chose well."*
HP: 2,000 · ATK: 85 · DEF: 40 · SPD: 17 · Element: Dark
Patterns: `void_tear, heavy, shadow_slash, enrage_strike`
Phase 2 (≤50% HP): Sovereign Wrath — +35 ATK / +24 DEF. Patterns: `enrage_strike, void_tear, heavy, enrage_strike`
Phase 3 (≤25% HP): Sovereign Absolute — +55 ATK / +38 DEF. Patterns: `enrage_strike, charge, void_tear, enrage_strike, heavy`
⚠ Enrage: 12 turns

---

**🦑 The Eternal Devourer · Floor 40**
*"It has eaten entire worlds. You are a snack."*
HP: 2,600 · ATK: 100 · DEF: 48 · SPD: 16 · Element: Shadow
Patterns: `void_tear, life_drain, summon, charge`
Phase 2 (≤50% HP): Devourer Awakened — +40 ATK / +30 DEF. It was only half-awake until now. Patterns: `life_drain, void_tear, charge, heavy, life_drain`
Phase 3 (≤25% HP): Consumption — +65 ATK / +45 DEF. Begins eating reality itself. Patterns: `life_drain, void_tear, enrage_strike, charge, void_tear`
⚠ Enrage: 11 turns

---

**😈 The Abyssal Overlord · Floor 45**
*"One floor stands between you and the end."*
HP: 3,300 · ATK: 120 · DEF: 58 · SPD: 18 · Element: Dark
Patterns: `enrage_strike, void_tear, heavy, charge`
Phase 2 (≤50% HP): Overlord Unbound — +50 ATK / +38 DEF. The chains of the abyss held him back. No longer. Patterns: `enrage_strike, charge, void_tear, enrage_strike, heavy`
Phase 3 (≤25% HP): The Last Gate — +80 ATK / +55 DEF. He will not let you reach Floor 50. Patterns: `charge, enrage_strike, void_tear, charge, enrage_strike`
⚠ Enrage: 10 turns

---

**🌌 THE ABYSSAL GOD · Floor 50 — FINAL BOSS**
*"You reached the bottom. Now face what lives here."*
HP: 5,000 · ATK: 150 · DEF: 70 · SPD: 20 · Element: Shadow
Patterns: `void_tear, enrage_strike, heavy, life_drain`
Phase 2 (≤65% HP): God Awakened — +60 ATK / +40 DEF. It was testing you. Now it is serious. Patterns: `enrage_strike, void_tear, charge, heavy, enrage_strike`
Phase 3 (≤30% HP): Godhood Unbound — +100 ATK / +65 DEF. The entire abyss is now your enemy. Patterns: `enrage_strike, void_tear, enrage_strike, charge, life_drain, void_tear`
⚠ Enrage: 8 turns — REACHES INTO THE VOID

---

### Secret Bosses (5)

Hidden encounters that spawn randomly during floor transitions when specific conditions are met. Defeating them permanently unlocks a secret class. Only one secret boss can spawn per run.

| Icon | Boss | Floor Window | Trigger Chance | Condition | Unlocks |
|---|---|---|---|---|---|
| 🌀 | The Herald of Nothing | 5–15 | 8% | Dark/void/shadow class | Voidreaper |
| 🦠 | The Rot | 8–18 | 7% | Poison ability in kit | Plagueborn |
| ⛈️ | The Tempest Unbound | 10–22 | 7% | Reached floor 10 previously | Stormlord |
| 👁️ | The Undying Horror | 15–28 | 8% | Reached floor 20 previously | Soulrender |
| 🔱 | The First Warden | 20–35 | 9% | Defeated 2+ other secret bosses | Abyssal Tyrant |

Secret bosses never spawn on boss floors (5, 10, 15, etc.) and cannot trigger more than once per run.

---

## 🎒 Items — 240 Total

Items span 7 rarity tiers: Common → Uncommon → Rare → Epic → Legendary → Mythical → Divine. Drop quality scales with floor depth — mostly Common/Uncommon early, Legendary/Mythical regularly by Floor 20+, with Divine drops possible from Floor 40 onward.

| Category | Count | Slot |
|---|---|---|
| Consumables | 55 | Inventory (use in combat or from map) |
| Weapons | 57 | Weapon slot (grants element, stats, special effects) |
| Armor | 58 | Armor slot (DEF, HP, MP, special effects) |
| Relics | 57 + 1 conquest | Relic slot (passive always-on effects) |

*(Full item tables — consumables, weapons, armor, relics — are unchanged from the previous document. All 240 entries remain current.)*

---

## 🗺️ Map System

Maps are procedurally generated using BSP (Binary Space Partitioning), creating organic room layouts connected by 2-tile-wide corridors. Each floor has a distinct layout with 8 room types:

| Room Type | Description |
|---|---|
| Start | Where you begin each floor; fully revealed on entry |
| Tiny / Small | Low-density rooms, minor loot or standard encounters |
| Normal | Standard exploration rooms |
| Large | Bigger rooms with higher encounter/loot density |
| Boss | Contains the floor boss — only on milestone floors (every 5th) |
| Secret | Hidden rooms discoverable during exploration; contain bonus loot; nearby walls show faint visual hints |
| Exit | Staircase to the next floor; guarded until boss/guardian is defeated |

The map is fog-of-war; tiles reveal as you walk within range. The full map can be revealed via the Ancient Tome event (spend 15 MP).

---

## 📖 Random Events — 7 Types

Discovered during floor exploration. Each event offers 3 choices with distinct risk/reward tradeoffs.

| Event | Choices |
|---|---|
| ⛩️ Dark Altar | Spend 20 HP for +4 ATK / +2 SPD · Spend 15 MP to reveal full map · Leave |
| 👤 Wandering Soul | Buy random Uncommon (30 gold) · Trade inventory item for higher rarity · Ignore |
| 👁️ Chamber of Curses | Embrace curse (+5 ATK, -5 DEF, cursed) · Resist (take 20 dmg, gain 40 gold) · Flee |
| 💧 Font of Healing | Full HP restore · 50% HP+MP restore · Take a free Health Potion |
| 📕 Ancient Tome | Gain 60 XP · Absorb random +3 stat boost · Destroy for 15 gold |
| 🌀 Soul Well | +15 max HP / +10 max MP · Gain 25 Soul Shards · Leave |
| 🗿 Mysterious Statue | 50/50 blessing or -10 HP · Smash for 20 gold (take 5 dmg) · Ignore |

---

## 🧪 Status Effects

A robust system of buffs and debuffs persist turn-to-turn with per-turn callbacks. Status interactions are core to class identity and build strategy.

### Enemy Debuffs (Applied by Player)

| Debuff | Effect |
|---|---|
| Bleed | Stacking DoT — ATK-scaled damage per stack each turn |
| Burn | Stacking DoT — detonable via Inferno/Plague Nova; enhanced by Burnboost equipment |
| Entropy | Stacking — reduces enemy ATK and DEF by 2 per stack; cleared on expiry (stats restored) |
| Plague | Stacking DoT — detonable; scales Raise Dead healing and Plague Nova damage |
| Poison | DoT — applied by Venom weapon effect and several enemy abilities |
| Wither | -30% enemy ATK and DEF |
| Stun | Skips enemy turn completely |
| Soul Cage | -25% ATK/DEF, 20% stun chance per turn |
| Smoke Blind | -25% ATK, 35% miss chance |
| Solar Blind | -30% ATK |
| Gust Slow | Reduced SPD |
| Shadow Web | -30% SPD; stuns if SPD hits 0 |
| Earth Shaken | -25% DEF |
| Scorched | -20% DEF (from Magma Surge / Infernal Breath) |
| Waterlogged | Increases electric damage taken (synergy with Stormcaller) |
| Rune Sear | +10% magic vulnerability |
| Abyss Gaze | 50% stun chance per turn for 3 turns |
| Haunted | Loses 10 MP per turn |
| Holy Burn | Holy DoT from Consecrate |
| Crystal Shard | Crystal DoT embedded by Crystal Rune |
| Void Rupture | -20% all stats |
| Elder Rune | -35% all stats |
| Rune Apocalypse | -50% ATK/DEF |

### Player Buffs

| Buff | Effect |
|---|---|
| Vanished | Invisible — next attack guaranteed hit + damage multiplier |
| Fortified | +12 DEF for 3 turns |
| Unbreakable | +20 DEF, massive shield |
| Iron Fortress | Reflects 100% of next hit back at attacker |
| Runic Shield | +10 DEF + shield |
| Storm Surge | +8 SPD/CRIT, next ability costs no MP |
| Maelstrom | +15 SPD/CRIT for 4 turns |
| Storm Ward | +8 DEF / +10 SPD; attackers take electric damage |
| Storm Rune | +12 SPD / +8 CRIT |
| Warcry | +10 ATK / +8 DEF |
| Bloodlust | +8 ATK, lifesteal for 2 turns |
| Frenzy | Stacking +5 ATK per Hemostrike use (Blood Knight) |
| Undead Army | +15 ATK / +8 DEF for 4 turns |
| Magma Coat | Attackers receive 3 Burn stacks on hit |
| Radiant Aura | +10 DEF, cleanses all debuffs |
| Bone Wall | +15 DEF + 40 shield |
| HP Regen | Regenerates HP per turn |
| MP Regen | Regenerates MP per turn |
| Invulnerable | Immune to all damage for duration |
| dmgMult | Temporary damage multiplier (used by convergence_reset and special abilities) |

---

## 🌐 Element System — 40 Total

A full effectiveness table governs elemental interactions: Super Effective, Effective, Neutral, Weak, and Super Weak. Elements affect damage multipliers and determine which Weapon Arts unlock when equipping off-class weapons.

**Core Elements (20)**
Normal · Fire · Water · Electric · Grass · Ice · Fighting · Poison · Ground · Flying · Psychic · Bug · Rock · Ghost · Dragon · Dark · Steel · Fairy · Wind · Shadow

**Exotic Elements (20)**
Sound · Light · Cosmic · Crystal · Nuclear · Tech · Spirit · Magma · Storm · Time · Space · Gravity · Plasma · Void · Blood · Rune · Glass · Slime · Cyber · Magnet

---

## 📈 Meta Progression

Progress persists between runs via Soul Shards earned through gameplay. Three systems allow permanent improvements.

### Talent Tree (9 Talents)
Purchased with Talent Points earned by levelling up mid-run.

| Talent | Effect | Max Ranks | Shard Cost/Rank |
|---|---|---|---|
| Blood Price | +10 max HP per rank | 3 | 5 |
| Soul Reserve | +10 max MP per rank | 3 | 5 |
| Iron Will | +2 DEF per rank | 3 | 6 |
| Shadow Arts | +2 ATK per rank | 3 | 6 |
| Quickening | +3 SPD per rank | 2 | 10 |
| Fate-Touched | +5% CRIT per rank | 2 | 10 |
| Undying | Survive lethal damage at 1 HP once per run | 1 | 30 |
| Deep Roots | +5 max HP and +5 max MP per rank | 3 | 12 |
| Critical Eye | +3% CRIT and +5% CRIT DMG per rank | 3 | 14 |

### Shard Shop (19 Upgrades)
Permanent upgrades purchased with Soul Shards.

| Upgrade | Effect | Max Ranks | Cost |
|---|---|---|---|
| Vitality Core | +15 max HP permanently | 3 | 8 shards |
| Mana Core | +15 max MP permanently | 3 | 8 shards |
| Power Shard | +3 ATK permanently | 4 | 10 shards |
| Armor Shard | +3 DEF permanently | 4 | 10 shards |
| Swift Shard | +3 SPD permanently | 3 | 12 shards |
| Gold Reserve | +25 starting gold per rank | 3 | 15 shards |
| Abyss Ward | +3 DEF for first 3 floors per rank | 2 | 18 shards |
| Lucky Find | +10% item drop rate per rank | 3 | 20 shards |
| Combo Mastery | Burst meter fills 25% faster per rank | 2 | 22 shards |
| Abyssal Pact I | Start each run with a random Rare item | 1 | 10 shards |
| Abyssal Pact II | Start each run with a random Epic item | 1 | 85 shards |
| Abyssal Pact III | Start each run with a random Legendary item | 1 | 250 shards |
| Abyssal Pact IV | Start each run with a random Mythical item | 1 | 500 shards |
| Purge Common | Common items no longer drop | 1 | 100 shards |
| Purge Uncommon | Uncommon items no longer drop (req. Purge Common) | 1 | 250 shards |
| Purge Rare | Rare items no longer drop (req. Purge Uncommon) | 1 | 500 shards |

### Class Levels & Fusion Unlock
Each class has a level (max 20) that persists across all runs. XP gained per combat = 10 + (2 × current floor). Reaching level 10 on two classes enables fusion. Reaching level 20 is required for the Convergence and final fusion unlocks.

---

## 🏆 Rarity Tiers

| Rarity | Stars | Used For |
|---|---|---|
| Common | ⭐ (1) | Base item drops, early game |
| Uncommon | ⭐⭐ (2) | Early-mid drops |
| Rare | ⭐⭐⭐ (3) | Most base classes; mid-game drops |
| Epic | ⭐⭐⭐⭐ (4) | Late-game drops |
| Legendary | ⭐⭐⭐⭐⭐ (5) | Floor 20+ regular drops |
| Mythical | ⭐⭐⭐⭐⭐⭐ (6) | Floor 35+ drops |
| Divine | ⭐⭐⭐⭐⭐⭐⭐ (7) | Floor 40+ rare drops |
| Secret | ⭐⭐⭐⭐⭐⭐⭐⭐ (8) | Secret boss unlock classes only |
| Abyssal | ⭐⭐⭐⭐⭐⭐⭐⭐⭐ (9) | The Convergence, The Unnamed, The Abyssal One |

---

## ⚙️ Technical Architecture

| File | Purpose |
|---|---|
| `js/data/abilities.js` | ~158k lines — 46 hand-written base abilities + weapon arts + ~75k generated hybrid combinations |
| `js/data/classes.js` | 36 base class definitions + CLASS_UNLOCK_COSTS |
| `js/data/enemies.js` | 81 regular enemies + 10 bosses + ENEMY_ABILITIES + getRandomEnemy() floor scaling |
| `js/data/elements.js` | 40-element effectiveness table |
| `js/data/events.js` | 7 random event definitions with branching choices |
| `js/data/fusion.js` | Rarity tiers, CLASS_RARITY, lazy loader, secret boss definitions, convergence logic |
| `js/data/fusion_lookup.js` | Recipe key → file number map (595 entries, do not hand-edit) |
| `js/data/fusions/fusion_data_1–17.js` | 595 fusion class definitions, lazy-loaded on demand |
| `js/data/items.js` | 240 items — consumables, weapons, armor, relics |
| `js/data/meta.js` | Talent tree, shard shop upgrades, loadout definitions |
| `js/engine/combat.js` | Full turn-based combat engine — hit resolution, crits, passives, status, win/lose |
| `js/engine/mapgen.js` | BSP procedural map generation, room content placement, secret boss floor generator |
| `js/engine/player.js` | createPlayer(), stat application, talent/shard bonuses |
| `js/engine/run_save.js` | 3-slot localStorage save system with serialise/deserialise |
| `js/engine/state.js` | G object definition and defaults |
| `js/engine/status.js` | addStatus(), tickStatus() — per-turn callbacks |
| `js/engine/utils.js` | calcDmg(), getDmgMult(), XP/levelling, saveMeta(), status helpers |
| `js/ui/fusion_modal.js` | Fusion Lab screen + Class Collection screen (both live here) |
| `js/ui/modals.js` | Shop, events, rewards, inventory use modals |
| `js/ui/render.js` | updateUI() and all sub-renderers (stats, map, combat, inventory) |
| `js/ui/screens.js` | showScreen(), renderClassSelect(), renderCollection() |
| `js/ui/settings.js` | Settings screen |

**Total codebase:** ~160k+ lines across 40+ JavaScript files + HTML/CSS.

---

*End of ABYSSAL Game Reference — v2.0*
