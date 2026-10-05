# 🌑 ABYSSAL
## Complete Game Reference Document
### Browser-Based Roguelike Dungeon Crawler — Floor 1 to 50

---

## 🗺️ Core Gameplay Loop

ABYSSAL is a browser-based roguelike dungeon crawler where you descend a procedurally generated dungeon floor by floor, fighting enemies in turn-based combat, collecting loot, levelling up, and pushing toward Floor 50 to face the Abyssal God. Each run is distinct due to BSP map generation, randomised item drops, and a floor-scaling difficulty system.

- **Difficulty Tiers:** Normal → Hard → Brutal → Abyssal — each tier brings a new set of enemies with nastier moves. Their strength comes from one smooth depth curve, so a new tier never makes enemies jump in power overnight (new-tier enemies phase in over 4 floors, from floors 8 and 21).
- **Bosses & Milestones:** Every 5th floor is a boss floor with a phase-based boss fight. On milestone floors (10, 20, 25, 30, 40, 50) regular enemies are 20% stronger. Other floors lock their exit behind a Guardian.
- **Recovery:** each level-up restores 25% of your max HP and MP, and descending restores 20% HP / 30% MP.
- **World settings:** Difficulty (Normal ×1.0 / Hard ×1.3 / Nightmare ×1.7 enemy HP & ATK), room count, enemy density, treasure rate and map size are chosen per run. New Game+ adds +30% enemy HP & ATK per cycle.
- **Win Condition:** Defeat THE ABYSSAL GOD on Floor 50. Doing so unlocks The Abyssal One class and grants the Crown of the Abyss relic permanently.

---

## 🧙 Classes — 41 base & secret, 3 abyssal, 630 fusions

The class roster is split into four categories: **Base** (unlocked via Soul Shards or free), **Secret** (unlocked by defeating secret bosses), **Abyssal** (endgame unlocks), and **Fusion** (crafted by combining two classes in the Fusion Lab).

### Class Systems

Each class has:
- **4–8 class abilities** — unique to that class (hotkeys 1–9)
- **1 burst ability** — charged via combo meter (fills at 5 charges); powerful damage at 500–800% ATK
- **1 passive** (base classes) or **2 passives** (fusion classes) — always-active combat bonuses; hover a passive in the stats panel for exactly what it does
- **Weapon Arts** — equipping a weapon with a different element than your class swaps your abilities to a matching Arts set, enabling massive build variety across 40+ element combinations

### Class Levelling & Fusion
Each class has a level (max 20) that persists across runs, earned through Class XP from every fight won with that class. Reaching level 20 on two classes enables you to fuse them in the Fusion Lab, creating a new class with both parents' abilities and two passives.

Run levels are separate: each level-up grants stats weighted by your class's strengths (its HP/MP/ATK/DEF/SPD ratings) and 2 Talent Points for this run.

---

### Base Classes (36)

Free or unlockable with Soul Shards. Unlock requires reaching the listed floor on any run, then spending shards.

| Icon | Class | Element | Unlock |
|---|---|---|---|
| 🗡️ | Shadowblade | Shadow | Free |
| 🛡️ | Ironclad | Steel | Free |
| 🔥 | Pyromancer | Fire | 15 shards (Floor 2) |
| 🌍 | Geomancer | Ground | 20 shards (Floor 3) |
| 🗡️ | Sentinel | Steel | 20 shards (Floor 3) |
| 🦁 | Beastmaster | Normal | 25 shards (Floor 4) |
| ⚡ | Stormcaller | Electric | 30 shards (Floor 5) |
| 🩸 | Blood Knight | Dark | 35 shards (Floor 6) |
| 🔱 | Runeblade | Normal | 40 shards (Floor 7) |
| 🌊 | Tidecaller | Water | 40 shards (Floor 7) |
| 💨 | Windwalker | Wind | 40 shards (Floor 8) |
| ⚔️ | Warlord | Fighting | 50 shards (Floor 9) |
| 🪦 | Gravewarden | Ghost | 50 shards (Floor 10) |
| ❄️ | Frostweaver | Ice | 65 shards (Floor 12) |
| ⚜️ | Paladin | Fairy | 70 shards (Floor 13) |
| 🐉 | Dragonknight | Dragon | 80 shards (Floor 14) |
| 🌙 | Soulweaver | Ghost | 90 shards (Floor 15) |
| 💀 | Necromancer | Ghost | 90 shards (Floor 15) |
| 💡 | Lightbringer | Light | 90 shards (Floor 16) |
| ⚔️ | Spellsword | Psychic | 100 shards (Floor 17) |
| 🔊 | Soundbreaker | Sound | 100 shards (Floor 17) |
| 🧲 | Magnetist | Magnet | 110 shards (Floor 18) |
| 🌀 | Gravitist | Gravity | 120 shards (Floor 20) |
| 🦠 | Plague Doctor | Poison | 130 shards (Floor 21) |
| 🌀 | Voidmancer | Shadow | 140 shards (Floor 22) |
| 🤖 | Techsavant | Tech | 150 shards (Floor 23) |
| ⏳ | Chronomancer | Time | 155 shards (Floor 24) |
| 🔯 | Hexblade | Dark | 165 shards (Floor 25) |
| 👼 | Spiritwalker | Spirit | 170 shards (Floor 26) |
| 💎 | Crystalmancer | Crystal | 190 shards (Floor 29) |
| 🦠 | Pestilence Lord | Poison | 210 shards (Floor 32) |
| 🔮 | Arcanist | Psychic | 230 shards (Floor 35) |
| ☄️ | Doomcaster | Dark | 260 shards (Floor 38) |
| 🌌 | Cosmomancer | Cosmic | 290 shards (Floor 43) |
| 👻 | Phantom | Ghost | 325 shards (Floor 46) |
| 🖤 | Nullbringer | Dark | 350 shards (Floor 47) |

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

### Fusion Classes (630)

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

## 👾 Enemies — 89 Total (70 Regular + 19 Bosses), plus 5 Secret Bosses

### Regular Enemies

All enemies follow one depth curve (`ENEMY_CURVE` in enemies.js), fitted to how a player who wins their fights actually grows. Each tier's pool is normalised to the same average, so a tougher-than-average enemy stays tougher than average at any depth. Then the difficulty (Normal ×1, Hard ×1.3, Nightmare ×1.7) and New Game+ (+30% per cycle) multipliers apply to HP and ATK.

| Floor | Avg HP | Avg ATK | Avg DEF |
|---|---|---|---|
| 1 | 35 | 11 | 3 |
| 7 | 100 | 30 | 8 |
| 14 | 340 | 88 | 17 |
| 20 | 560 | 135 | 25 |
| 30 | 900 | 190 | 37 |
| 40 | 1,250 | 245 | 47 |
| 50 | 1,650 | 300 | 57 |

Guardians are ×2.6 HP / ×1.2 ATK of the floor's average enemy (gentler before floor 10: ×1.6 HP / ×1.0 ATK on floor 1); floor bosses and secret bosses ×3.5 HP / ×1.15 ATK (boss phase ATK boosts scale with the boss). Enemy SPD grows 4% per floor. Armour can block at most 85% of any hit.

**Initiative and fleeing** compare SPD as a ratio: at equal SPD you act first 50% of the time and flee 40% of the time; being much faster raises both, up to 90%.

**Tier 1 — Floors 1–7 (21 enemies)**
💀 Restless Skeleton · 👻 Hollow Wraith · 👺 Abyssal Goblin · ⚔️ Cursed Armor · 🪱 Grave Worm · 😈 Shadow Imp · 🗡️ Hollow Knight · 🕷️ Giant Cave Spider · ❄️ Frost Sprite · 🐢 Mud Crawler · 🦇 Rabid Bat · 🧹 Bog Witch · 🪨 Stone Sprite · 🌱 Vine Horror · 🗿 Cracked Golem · 🔵 Ice Wisp · 🐀 Crypt Rat · 💨 Wind Sprite · 🔥 Ember Imp · 🐺 Dire Wolf · 🦀 Thunder Crab

**Tier 2 — Floors 8–20 (24 enemies)**
🧛 Blood Vampire · 🧙 Ancient Lich · 🧟 Flesh Ghoul · 🌑 Soul Eater · 🐀 Plague Rat Swarm · 🌀 Void Stalker · 🐍 Abyssal Serpent · 🦀 Tide Crawler · 🌬️ Wind Wraith · 🐊 Swamp Horror · 🧊 Frost Revenant · 🦅 Thunder Hawk · 🦑 Deep Lurker · 🍄 Fungal Shaman · 🦂 Desert Scorpion · 🤖 Iron Golem · 🧜 Sea Witch · ⛈️ Storm Elemental · 👹 Bog Troll · 🦜 Screeching Harpy · ⚔️ Cursed Knight · 🪸 Coral Beast · 🌋 Lava Crawler · 🌑 Void Shade

**Tier 3 — Floors 21–50 (25 enemies)**
👿 Void Demon · 👻 Screaming Banshee · 🗿 Abyss Golem · ⚔️ Dread Knight · 🌪️ Chaos Elemental · 🦑 Abyssal Horror · 💀 Elder Lich · 🪨 Stone Golem · 🦅 Sky Predator · 🧊 Glacier Titan · 🔮 Void Witch · ⛈️ Storm Giant · ☠️ Plague Knight · 🐲 Abyssal Hydra · 🔥 Flame Archon · 🗜️ Iron Colossus · 💀 Death Specter · 🌳 Verdant Colossus · 🩸 Crimson Revenant · 🌀 Abyssal Djinn · 🐉 Tempest Wyrm · 🦀 Deep Tyrant · 🖤 Null Knight · 🦅 Abyssal Phoenix · 🔱 Runic Colossus

### Enemy Ability Types (34 patterns)

Enemies telegraph their next move ("Next: …"), with an estimate of the damage it will do to you for ordinary attacks (≈45). They lean on pressure moves when you're below 30% HP and on drain moves when they are (but never drain twice in a row). 12% of enemies from floor 3 are Elite (×1.4 stats, better rewards); from floor 4, 16% of encounters are 2-enemy packs (each at 70% stats and rewards). Enemy attacks carry their element.

The first 14:

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
| `life_drain` | Damage + heals itself for half the damage dealt |
| `shadow_slash` | Shadow element heavy hit |
| `infernal_breath` | Fire element hit + Scorched debuff |
| `void_tear` | Shield-piercing void attack |
| `enrage_strike` | Damage scales with enemy's own missing HP |

Also: Summon (drain) · Frost Bite · Blizzard · Thunder Clap · Lightning Chain · Spore Cloud · Entangle · Acid Spray · Sandstorm · Heat Wave · Deep Dive · Undertow · Talon Rake · Earthshatter · Rust · Mind Spike · Soul Rend · Channel Burst (two-turn wind-up, punishable) · Summon Ally (lingering minion damage) · Culling Strike (scales with your debuffs). All their stat penalties wear off when they expire, and always when the fight ends.

**Bosses** resist executes (an execute can take at most 15% of their max HP at once) and gain 2 turns of stun immunity after being stunned. You can't flee bosses or guardians.

---

### Bosses (Floor 5, 10, 15, 20, 25, 30, 35, 40, 45, 50)

Every boss is a multi-phase encounter with phase-triggered stat boosts, pattern changes, and an enrage timer. Stats shown are base values before floor scaling.

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

### Rival Bosses (Floors 5–45)

On each boss floor except 50, a run meets either the boss above or its rival.
The run's seed decides which, so the same seed always meets the same bosses.
Each rival has a signature move:

| Move | Effect |
|---|---|
| 🕷️ Brood Swarm | 3 bites (45% ATK each) and Infested: 15% ATK per turn for 3 turns |
| 🎶 Dirge | 110% ATK and −20% ATK for 3 turns |
| 🧊 Glacial Prison | 100% ATK, −40% SPD for 3 turns, 30% chance to freeze you for a turn |
| 🪞 Mirror Ward | +30% DEF for 2 turns (refreshes, never stacks) and a 90% ATK strike |
| 🌊 Quake Slam | 170% ATK that ignores shields |
| 🌠 Starfall | 3 strikes of 60% ATK that ignore shields |
| 🩸 Blood Pact | Pays 6% max HP for +12% ATK (at most 3 times), then 110% ATK |
| ⏪ Rewind | Heals 6% max HP and removes all of its debuffs |
| 👁️ Oblivion Gaze | 120% ATK and drains 25% of your MP |

**🕷️ The Carrion Matron · Floor 5 (rival)**
*"Every corpse down here is a nursery."*
HP: 260 · ATK: 20 · DEF: 9 · SPD: 11 · Element: Bug
Signature: 🕷️ Brood Swarm. Patterns: `brood_swarm, basic, poison_spit, basic`
Phase 2 (≤50% HP): The Brood Wakes — +7 ATK / +4 DEF. Patterns: `brood_swarm, poison_spit, heavy, brood_swarm`
Phase 3 (≤25% HP): Hive Mother — +14 ATK / +7 DEF. Patterns: `brood_swarm, charge, brood_swarm, poison_spit`
⚠ Enrage: 20 turns

---

**🎶 The Hollow Choir · Floor 10 (rival)**
*"Seven voices. No throats."*
HP: 450 · ATK: 30 · DEF: 14 · SPD: 15 · Element: Sound
Signature: 🎶 Dirge. Patterns: `dirge, basic, wail, double`
Phase 2 (≤50% HP): Crescendo — +11 ATK / +7 DEF. Patterns: `dirge, wail, heavy, dirge`
Phase 3 (≤25% HP): The Final Note — +19 ATK / +11 DEF. Patterns: `dirge, charge, wail, dirge, heavy`
⚠ Enrage: 18 turns

---

**❄️ The Frostbound Queen · Floor 15 (rival)**
*"She froze her court so it could never leave her."*
HP: 640 · ATK: 36 · DEF: 20 · SPD: 12 · Element: Ice
Signature: 🧊 Glacial Prison. Patterns: `glacial_prison, frost_bite, basic, blizzard`
Phase 2 (≤50% HP): Winter Court — +13 ATK / +10 DEF. Patterns: `glacial_prison, blizzard, heavy, frost_bite`
Phase 3 (≤25% HP): Absolute Winter — +21 ATK / +14 DEF. Patterns: `glacial_prison, blizzard, charge, glacial_prison`
⚠ Enrage: 16 turns

---

**🪞 The Mirror Sovereign · Floor 20 (rival)**
*"It wears the faces of everyone who looked too long."*
HP: 880 · ATK: 46 · DEF: 24 · SPD: 15 · Element: Glass
Signature: 🪞 Mirror Ward. Patterns: `mirror_ward, heavy, mind_spike, double`
Phase 2 (≤50% HP): Shattered Reflection — +17 ATK / +12 DEF. Patterns: `mirror_ward, mind_spike, charge, heavy`
Phase 3 (≤25% HP): A Thousand Faces — +28 ATK / +17 DEF. Patterns: `charge, mirror_ward, void_tear, mind_spike, heavy`
⚠ Enrage: 15 turns

---

**🌊 The Drowned Titan · Floor 25 (rival)**
*"It sank with its city and kept growing."*
HP: 1,250 · ATK: 55 · DEF: 28 · SPD: 10 · Element: Water
Signature: 🌊 Quake Slam. Patterns: `quake_slam, undertow, basic, deep_dive`
Phase 2 (≤50% HP): High Tide — +21 ATK / +14 DEF. Patterns: `quake_slam, deep_dive, heavy, undertow`
Phase 3 (≤25% HP): The Deluge — +36 ATK / +21 DEF. Patterns: `quake_slam, charge, deep_dive, quake_slam, undertow`
⚠ Enrage: 14 turns

---

**🌠 The Star Eater · Floor 30 (rival)**
*"It ate the sky above the abyss. Now it is still hungry."*
HP: 1,500 · ATK: 68 · DEF: 30 · SPD: 16 · Element: Cosmic
Signature: 🌠 Starfall. Patterns: `starfall, basic, void_tear, heavy`
Phase 2 (≤50% HP): Event Horizon — +27 ATK / +17 DEF. Patterns: `starfall, void_tear, charge, starfall`
Phase 3 (≤25% HP): Supernova — +43 ATK / +27 DEF. Patterns: `starfall, enrage_strike, void_tear, starfall, charge`
⚠ Enrage: 13 turns

---

**🩸 The Blood Regent · Floor 35 (rival)**
*"It rules with a crown it grew from its own veins."*
HP: 1,950 · ATK: 82 · DEF: 38 · SPD: 16 · Element: Blood
Signature: 🩸 Blood Pact. Patterns: `blood_pact, life_drain, heavy, shadow_slash`
Phase 2 (≤50% HP): Sanguine Court — +31 ATK / +22 DEF. Patterns: `blood_pact, shadow_slash, charge, life_drain`
Phase 3 (≤25% HP): The Red Throne — +52 ATK / +32 DEF. Patterns: `blood_pact, enrage_strike, life_drain, charge, shadow_slash`
⚠ Enrage: 12 turns

---

**⏳ The Unwound · Floor 40 (rival)**
*"A clock that stopped, and refused to die with it."*
HP: 2,500 · ATK: 96 · DEF: 46 · SPD: 18 · Element: Time
Signature: ⏪ Rewind. Patterns: `time_rewind, heavy, mind_spike, charge`
Phase 2 (≤50% HP): Wrong Hours — +36 ATK / +26 DEF. Patterns: `heavy, time_rewind, charge, mind_spike, heavy`
Phase 3 (≤25% HP): Time Undone — +60 ATK / +38 DEF. Patterns: `charge, enrage_strike, time_rewind, charge, void_tear`
⚠ Enrage: 11 turns

---

**👁️ The Eye of Oblivion · Floor 45 (rival)**
*"It does not attack you. It forgets you, a little at a time."*
HP: 3,200 · ATK: 116 · DEF: 56 · SPD: 18 · Element: Void
Signature: 👁️ Oblivion Gaze. Patterns: `oblivion_gaze, void_tear, soul_rend, heavy`
Phase 2 (≤50% HP): The Lid Opens — +43 ATK / +31 DEF. Patterns: `oblivion_gaze, void_tear, charge, soul_rend`
Phase 3 (≤25% HP): Nothing Remains — +72 ATK / +46 DEF. Patterns: `oblivion_gaze, enrage_strike, void_tear, oblivion_gaze, charge`
⚠ Enrage: 10 turns

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

## 🎒 Items — 254 Total

Items span 7 rarity tiers: Common → Uncommon → Rare → Epic → Legendary → Mythical → Divine. Drop quality rises steadily with floor depth (it never gets worse deeper down) — mostly Common/Uncommon early, Epic/Legendary regularly by Floor 20+, Divine increasingly common from Floor 30.

| Category | Count | Slot |
|---|---|---|
| Consumables | 60 | Inventory (use in combat or from map) |
| Weapons | 64 | Weapon slot (grants element, stats, special effects) |
| Armor | 64 | Armor slot (DEF, HP, MP, special effects) |
| Relics | 65 + 1 conquest | Relic slot (passive always-on effects) |

**Gear effects added in 2.2** (on 15 new items, Uncommon to Mythical):

| Effect | What it does |
|---|---|
| Thorns | Attackers take 20% of the damage they deal back |
| Executioner | +30% damage to enemies under 30% HP |
| First Strike | Your first hit each fight deals +50% |
| Mana Siphon | Your first hit each turn restores 4 MP |
| Last Stand | Take 25% less damage while under 25% HP |
| Scholar | +25% XP from fights |
| Midas | +50% gold from fights |

Inventory holds 12 items. When it's full, new loot is left on the ground where you stand (🎒 on the map) — step back onto the tile to pick it up. Using or equipping an item during a fight takes your turn.

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

The map is fog-of-war; tiles reveal as you walk within range. Secret rooms look like solid wall until you step inside; walls nearby sometimes give a hint. The full map can be revealed via the Dark Altar event (spend MP). Move with WASD/arrows, the on-screen pad, or by tapping a revealed tile. The minimap (M) shows everything you have revealed. Auto-explore (X or the 🧭 button) walks to the nearest chest, event or dropped loot, otherwise to the nearest unexplored ground, and stops when an enemy comes into view.

**Seeds & the Daily Descent.** Every run has a seed (pause menu); the same seed and World Settings always build the same floors. The 📅 Daily Descent on the title screen uses one seed per calendar day with standard settings and any class; your best floor that day is kept.

**Merchants** (one per floor) sell 3 pieces of gear rolled with the floor's loot odds, a healing potion that keeps up with your depth (Blood Flask → Heavy Elixir from floor 7 → Grand Elixir from 15 → Abyssal Tincture from 25), and one more consumable rolled with the floor's loot odds. Stock can be rerolled for gold, and you can sell items there for a quarter of what the merchant would charge for that rarity on the current floor.

---

## 📖 Random Events — 13 Types

Discovered during floor exploration. Costs and rewards scale with depth (shown values are floor 1).

| Event | Choices |
|---|---|
| ⛩️ Dark Altar | Spend 20% max HP for +ATK / +SPD · Spend MP to reveal the full map · Leave |
| 👤 Wandering Soul | Buy a random item for this floor · Trade an inventory item for a higher rarity · Ignore |
| 👁️ Chamber of Curses | Embrace (+ATK permanently, −DEF for 3 floors) · Resist (take damage, gain gold) · Flee |
| 💧 Font of Healing | Full HP restore · Restore half of missing HP+MP · Take a Blood Flask |
| 📕 Ancient Tome | Gain XP (60% of a level) · Absorb a random +2 stat · Destroy for gold |
| 🌀 Soul Well | +max HP / +max MP · Gain Soul Shards · Leave |
| 🗿 Mysterious Statue | 50/50: +1 ATK/DEF/SPD or lose HP · Smash for gold (take damage) · Ignore |
| 🎲 The Bone Gambler | Wager gold (50%: double) · Wager HP for a prize · Walk away |
| 🛡️ Rusted Armory | Search for gear (30% trap) · Salvage for gold · Leave |
| ⛲ Crimson Fountain | Full heal for −max HP for 3 floors · +ATK for 3 floors for 20% HP · Leave |
| 👻 Trapped Spirit | Free it (+1 Talent Point) · Bind it (+3 CRIT permanently, −MP) · Leave |
| 🧝 Wounded Adventurer | Give a Blood Flask for a good item · Bandage (−HP, +XP) · Rob (+gold, −1 DEF) |
| 🧰 Whispering Chest | Open (60% great loot, 40% mimic bite) · Leave |

---

## 🧪 Status Effects

Buffs and debuffs last the number of turns shown (counted on their owner's turns) and run per-turn effects such as damage-over-time. Every status — and every temporary stat change — ends when the fight ends; only level-ups, talents, gear, events and Shard Emporium upgrades change your stats for the rest of a run.

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

**Earning Soul Shards**
- Every run that ends (death or abandon): 1.5 per floor reached, plus 2 per level above 1 on death.
- Each boss: 5 + the floor number (10 on floor 5, 55 on floor 50).
- Each new depth record: 2 per floor deeper than your previous best.
- Some events (Soul Well, freed souls) and first-time Abyss conquest (150).
- On Hard and Nightmare, everything above except the conquest bonus pays ×1.25 / ×1.5.
- Achievements (Records screen) pay a fixed amount once each.

### Talent Tree (9 Talents)
Bought with Talent Points (2 per level-up) during a run; talents reset when the run ends.

| Talent | Effect | Max Ranks | Points/Rank |
|---|---|---|---|
| Blood Price | +10 max HP per rank | 3 | 1 |
| Soul Reserve | +10 max MP per rank | 3 | 1 |
| Iron Will | +2 DEF per rank | 3 | 1 |
| Shadow Arts | +2 ATK per rank | 3 | 1 |
| Quickening | +3 SPD per rank | 2 | 2 |
| Fate-Touched | +5% CRIT per rank | 2 | 2 |
| Undying | Survive lethal damage at 1 HP once per run | 1 | 4 |
| Deep Roots | +5 max HP and +5 max MP per rank | 3 | 2 |
| Critical Eye | +3% CRIT and +5% CRIT DMG per rank | 3 | 2 |

### Shard Shop (16 Upgrades)
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
| `js/data/abilities.js` | ~158k lines — hand-written class abilities + weapon arts + generated hybrid combinations (6,800+ abilities) |
| `js/data/classes.js` | 41 base & secret class definitions + CLASS_UNLOCK_COSTS |
| `js/data/enemies.js` | 70 regular enemies + 10 bosses + ENEMY_ABILITIES + floor/difficulty/NG+ scaling |
| `js/data/elements.js` | 40-element effectiveness table |
| `js/data/events.js` | 13 random events with depth-scaled choices |
| `js/data/biomes.js` | 7 biomes (floor ranges, flavor, exploration hazards) |
| `js/data/fusion.js` | Rarity tiers, CLASS_RARITY, lazy loader, secret boss definitions, convergence logic |
| `js/data/fusion_lookup.js` | Recipe key → file, fusion class → file (regenerate with tools/build_fusion_index.js) |
| `js/data/fusions/fusion_data_1–17.js` | 630 fusion class definitions, lazy-loaded on demand |
| `js/data/items.js` | 239 items + loot tables |
| `js/data/meta.js` | Talent tree, shard shop upgrades, loadout definitions |
| `js/engine/combat.js` | Turn-based combat engine — damage pipeline, initiative, enemy turns, win/lose |
| `js/engine/passives.js` | Passive names/descriptions and hook implementations |
| `js/engine/stats.js` | Permanent (p.base) vs temporary (p.stats) stats; enemy stats view |
| `js/engine/status.js` | addStatus(), tickStatus(), removeStatuses() |
| `js/engine/mapgen.js` | BSP map generation, movement, floor transitions, secret boss arenas |
| `js/engine/player.js` | createPlayer(), inventory, equipment, weapon arts, loadouts |
| `js/engine/run_save.js` | 3-slot localStorage run saves |
| `js/engine/state.js` | G object, defaultMeta(), version |
| `js/engine/utils.js` | calcDmg(), damage multipliers, XP/levelling, saveMeta(), status helpers |
| `js/ui/*.js` | Rendering, modals, screens, Fusion Lab, settings, sound effects |
| `tests/` (repo root) | Automated browser tests — `npm install && npm test` |

---

*End of ABYSSAL Game Reference — v2.1*
