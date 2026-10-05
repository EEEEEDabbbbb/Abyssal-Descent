# Changelog

## 2.3.0

### Fixed
- Closing the game mid-fight and pressing Continue rewound you to before
  the fight, so you could walk around an enemy (or a guardian or boss) you
  were losing to. The game now saves as each fight starts, and Continue puts
  you back at the start of that fight with the same dice. An unclaimed boss
  reward is still waiting after a reload (it used to restart the boss fight).
  The pause menu can now quit to the title mid-fight, too.
- Event outcomes (wagers, mimics, collapsing racks) and a merchant's stock
  are fixed by where they are on the floor, so reloading and taking a
  different route can't re-roll them. In a Daily Descent everyone gets the
  same merchants and the same luck.
- A hit your shield soaked completely was logged as "attacks for 0"; the
  log shows its real size, and Thorns now pricks on shielded hits too.
- Lifesteal healed from overkill damage (a 500 hit on a 20 HP enemy healed
  as if all 500 landed).
- Resonance echoes counted as damage-over-time kills for Slow Burn.

### Balance
- **Difficulty curve rebuilt.** Enemy strength came from per-tier stat
  multipliers and per-tier base stats, so enemies got ~3× stronger
  overnight on floor 8 and again on floor 21, while floors 1–7 were
  harmless. A bot playing honestly never got past floor 8. Every stat now
  follows one smooth curve fitted to measured player growth, new enemy
  tiers phase in over four floors, and milestone floors add +20% (was +50%).
  The same bot now dies anywhere from floor 6 to 25 (median 10–18 depending
  on class), and a fully upgraded account reaches floors 12–30.
- Enemies whose moves hit much harder than average (Lava Crawler, Void
  Shade, Flame Archon…) have a bit less ATK, so a single unlucky
  encounter is less often run-ending. Void Stalker, the top killer in
  testing, was toned down.
- Enemy Bleed (Shadow Slash, Talon Rake) deals 12% of the enemy's ATK per
  stack each turn, down from 20%. It ignores DEF and stacks up to 10, so
  its users (Void Stalker, the Shadow Tyrant, Cursed Knight, Harpy…) were
  far and away the top killers in testing. Now deaths spread across the
  whole bestiary, and the honest bot's median depth rose by about two floors.
- Guardians, bosses and secret bosses follow the same curve. Secret bosses
  used fixed stats: deadly on floor 5, trivial on floor 30.
- Initiative and flee chance compare SPD as a ratio and enemy SPD grows
  with depth. Player SPD grows several-fold over a run, and the old flat
  difference meant you acted first 90% of the time from about floor 8.
- A floor guardian is never a hard counter for your class (a matchup that
  swings 4× or more against you, like an Arcanist's psychic attacks against
  a dark Hollow Knight): you can't flee a guardian, and those fights were
  close to unwinnable. The floor is otherwise unchanged, so a Daily Descent
  is the same for every class.
- Floor guardians ramp up over floors 1–10. On floor 1 they could kill a
  level-1 character who met one before any other fight.
- Each level-up restores 25% HP and MP.
- Merchants always sell a healing potion that keeps up with your depth,
  plus a consumable rolled with the floor's loot odds (they only ever sold
  floor-1 potions before). Their three other slots are always gear, never
  the same piece twice (a potion could show up there at a gear price, next
  to the same potion at the normal price).
- Selling pays a quarter of the merchant's price at your depth (a mythical
  item sold for 60 gold on any floor). Consumables sell for a quarter of a
  consumable's price, so nothing a merchant sells can be sold back for a
  profit.
- HP-regen gear restores 2% of max HP per turn (was a flat 5).
- Armour can block at most 85% of a hit (high-DEF builds took a flat 1
  damage from anything weaker than them).
- Life Drain heals the enemy for half the damage dealt (was all of it).
- Fusion classes had the padded-kit problem 2.2 fixed for base classes: 26
  repeated the same few abilities and 46 had two abilities with the same
  name. All 638 now have 8 distinct abilities.
- The five secret classes were defined twice, and the Collection and Fusion
  Lab showed an outdated copy (different stats and kit from what you
  played). There is now one definition.
- Hard and Nightmare world settings pay ×1.25 and ×1.5 Soul Shards during
  the run (they only made enemies stronger before). Achievements pay their
  fixed amounts.

### New
- First-run tips: during your first three runs, a short hint appears the
  first time something comes up (how a floor works, combat keys, when to
  flee a counter, spending talent points, healing up). Each shows once;
  tap a toast to dismiss it. On phones toasts sit below the top bar so
  HP and MP stay visible.
- Two new achievements: Against the Grain (beat an enemy that hard-counters
  your class) and Daily Grind (reach floor 5 in a Daily Descent).
- Class select shows which elements the selected class is strong against
  and weak to.
- Enemy cards show the element matchup when it isn't neutral ("You deal
  ×0.25 · You take ×2", red when it's against you), so a hard counter is
  obvious before you sink turns into it, and you can flee.
- The enemy's "Next:" move now shows roughly how much damage it will do to
  you (≈45 dmg), so you can decide when to defend or heal. The estimate is read
  from the move's own formula, your DEF and the element matchup.
- Daily Descent (title screen): everyone gets the same floors each day, with
  standard settings and any class (always at NG+0, so New Game+ players get
  the same floors). Your best floor for the day is shown on the button and in
  Records.
- Auto-explore (X, or the 🧭 button on the map): walks to the nearest chest,
  event or dropped loot, otherwise to the nearest unexplored ground, and
  stops as soon as an enemy comes into view. It never walks into fights,
  shops or the exit.
- The map header says whether the floor's exit is still sealed (🔒) or open (▼).
- Stepping on the exit asks first if you've seen chests, events or loot you
  haven't taken ("You're leaving 2 chests behind"). Enter descends; with
  nothing left behind you go straight down as before.
- Number keys pick choices in events, boss rewards and the in-fight item
  menu (R), Esc cancels the item menu, Enter continues after an event, and
  ? opens How to Play, so a keyboard player never needs the mouse.

### Death screen
- The buttons were narrower than the panels above them on wider screens.
- Dying on floor 1 of your first run showed a personal best (and a deepest
  floor in Records) of 0.
- A run that won no fights said "+0 class XP · ~7 more runs like this"; it
  now says class XP comes from won fights.

### Phones
- The game has an icon and a web app manifest, so on a phone "Add to Home
  Screen" opens it full-screen like an app (when served over https, e.g.
  itch.io).
- Your HP and MP stay visible in the top bar while you scroll, which matters
  in fights, since the character panel sits below the action bar on phones.
- Fixed on phones: the Fusion Lab was cut off on both sides, class select
  used half the screen, dialog buttons spilled past the dialog edge, the
  Collection footer hid its Back button, and screen shake could make the
  page scroll sideways.

### Accessibility
- Secondary text (descriptions, hints, labels) was too faint to read
  comfortably (about 2.5:1 contrast); it now meets the WCAG AA 4.5:1 minimum.
- The title screen was cut off at the top and bottom on windows shorter than
  about 850px (most laptops); it now fits, and scrolls if it ever can't.

### Developer
- Run saves pack the map (one letter per tile for its type and flags, one for
  its room): a fully explored large map saves in 59 KB instead of 378 KB.
  Older saves still load. This matters on itch.io, where browser storage may
  be shared with other games.
- `tools/honest_run.js` plays whole runs with no cheats and reports how deep
  they get and what killed them (`GOD=1` prints the player growth curve,
  `META=max` simulates a fully upgraded account, `FLEE=1` flees hard
  counters like a person, `PRE="…"` tries a change without editing data).
- `tools/measure_moves.js` measures each enemy move's real damage (DoTs
  included) against the power the stat normalisation credits it with.

## 2.2.0

### Fixed
- Re-casting a buff or debuff refreshes it instead of compounding it
  ("-25% DEF" cast three times was -58%). Effects that are meant to stack
  (Frenzy, Bleed, Dominion, Cleaved…) still stack, up to 10 times.
- Enemies you flee from no longer keep that fight's buffs and debuffs.
- Chronomancer and Soundbreaker could cast their Burst every turn for free
  from the ability bar.
- Spectral Haunt's dodge bonus did nothing.
- Enemy attacks logged their damage before resistances and shields ("attacks
  for 49" when you lost 25). The log now shows what you actually took.
- A boss low on HP could chain Life Drain every turn and out-heal you
  forever. Enemies never use a draining move twice in a row now.
- Cleaved counted its DEF loss twice.
- Removed 4,650 duplicate ability definitions (the ability file is 40% smaller,
  so the game loads faster).

### Balance
- 26 classes had padded kits that repeated the same 2–7 abilities. Every
  class now has 8 different abilities, filled from its element's ability set.
- Nullbringer's Sunders now also deal damage, and an already-applied Sunder
  can't be cast again by mistake.
- Weaker classes got more ATK/HP (Phantom, Frostweaver, Ironclad, Sentinel,
  Nullbringer, Magnetist and others); Abyssal Tyrant's control and
  Soulrender's lifesteal were toned down. In simulated fights every shop
  class now wins 60–88% of the time (was 45–90%).
- Class unlocks cost half as many Soul Shards (about 4,000 for all classes,
  was 8,085). Bosses pay 5 + floor shards (was 5 + half the floor), and every
  new depth record pays 2 shards per floor.

### New
- Run seeds: every run has a seed (shown in the pause menu, or enter one in
  World Settings). The same seed and settings build the same floors, and
  reloading a save can't re-roll chests, drops or flee attempts.
- Minimap in the corner of the map (toggle with M or in Settings); click it
  to walk somewhere you have already seen.
- Run statistics: kills, damage, biggest hit, chests, steps, play time and
  more. They're shown on the death screen and in the pause menu (📊 Run Stats).
- Records screen (🏆 on the title screen): lifetime totals, your last 20
  runs, and 20 achievements that each pay Soul Shards once.
- The death screen counts every shard the run earned (bosses, records,
  events), not just the death payout.
- 9 rival bosses: on every boss floor from 5 to 45, a run meets either the
  usual boss or its rival (the Carrion Matron, the Hollow Choir, the
  Frostbound Queen, the Mirror Sovereign, the Drowned Titan, the Star Eater,
  the Blood Regent, the Unwound, the Eye of Oblivion). Each has three phases
  and its own signature move.
- 15 new items with 7 new gear effects: Thorns, Executioner, First Strike,
  Mana Siphon, Last Stand, Scholar and Midas.

### Accessibility
- Tooltips work without a mouse: they open on keyboard focus and on a long
  press on touch screens (the press doesn't also trigger the button).
- Unusable abilities stay focusable and their tooltip says why ("Not enough
  mana", "Form is already sundered"…).
- Item names with apostrophes ("Miser's Coin") showed a backtick in tooltips.

### Developer
- `tools/class_balance.js` simulates fights for every class and prints win rates.
- The bundled fonts now ship with their SIL Open Font License files
  (`abyssal_revamped/css/fonts/`).
- New tests: run records, rival bosses and gear effects, tooltip
  accessibility (`npm test` now runs 113 checks).

## 2.1.0

A large bug-fix and polish release. Old run saves from 2.0 can't be continued
(class unlocks, shards and other progress are kept).

### Fixed: game-breaking
- Damage-over-time effects (Burn, Poison, Bleed, Plague, Entropy, Venom…) never
  damaged enemies. They now work, which makes damage-over-time classes much stronger.
- Combat could freeze on the enemy's turn when certain debuffs expired.
- Fleeing a boss or guardian removed it from the map and locked the exit
  forever. Bosses and guardians can no longer be fled.
- Loading a save broke 2-enemy packs (crash), potions (no effect), dropped
  items and secret-boss floors (no exit). Saves now keep everything.
- Descending saved the previous floor's map, so reloading could skip a floor.
- The combat log stopped updating after 60 lines.
- Settings → Back from the pause menu ended your run.
- Continuing a fusion-class run after a page refresh lost its class data.
- The Continue button vanished whenever you returned to the title screen.
- A new run could overwrite another run's save slot.
- Beating floor 50 caused an error on the title screen, and New Game+ was
  impossible to start.

### Fixed: exploits
- Dying paid out Soul Shards twice. Abandoning a run kept its save, so you
  could abandon, continue and abandon again for unlimited shards.
- Stacking consumables, many ability buffs, and leftover buffs after fleeing
  could make stats permanently higher. Stacking debuffs could make them
  permanently lower. All temporary effects now end with the fight.
- Shadow Form and about 1,100 similar "+X% for N turns" effects grew stronger
  every turn instead of applying once.
- Talent bonuses carried into the next run. Rune Mastery stacked on every reload.
- Resonance, Storm Charge, execute threshold and Dominion stacks never reset
  between fights.

### Fixed: combat
- Vanish now doubles your next attack, as described.
- Effects now last their full listed duration (they lasted one turn less).
- Debuffs from Frost Bite, Blizzard, Acid Spray, Rust and others wear off.
- Enemy attacks now use their element. Difficulty was applied twice
  (Nightmare was ~2.9× instead of 1.7×).
- Pack fights: reflects and counters hit the attacker, combat-start passives
  hit every enemy, and items no longer end the fight early.
- Gust, Doom Aura, Static Charge and the Convergence reset now work reliably.
- Bosses resist executes and briefly resist stuns after being stunned.
- Several boss phases can trigger at once from a big hit.
- 23 class passives (Crystal Body, Time Warp, Spellblade, Iron Will…) did
  nothing. All are implemented, and every passive description matches its effect.
- 108 fusion classes had a Burst that did nothing.
- Ability effects such as damage reduction, counters, guaranteed dodges,
  "cannot heal", lifesteal and Resonance Field echoes now work.
- Chrono Flask and Elixir of the Gods now reset cooldowns.
- Enemy damage could show fractions ("256.5"). Damage is now always a whole number.

### Balance
- Loot quality now rises steadily with depth (floors 3–4 used to drop better
  loot than 5–6).
- Level-ups grow the stats your class is good at. Late levels need less XP.
- Packs pay about 1.4× a single enemy (was 2×). Boss XP and guardian gold scale with depth.
- New Game+ now actually makes enemies stronger (+30% per cycle).
- Events scale with depth. Shop reroll cost scales with depth. Relic Cache gives an epic item.
- Biome hazards can no longer kill you, trigger less often (5% per step, at
  most 3 per floor) and can't hit several steps in a row.

### New
- 6 new events (13 total).
- Sound effects (Master Volume now does something). Screen shake on crits,
  big hits and boss phases.
- On-screen movement pad and tap/click-to-move, for touch screens too.
- Tap-to-select in the Fusion Lab (it was drag-only).
- Ability hotkeys 1–9 shown on buttons; duplicate ability buttons removed.
- Item comparison when equipping. Full inventory leaves loot on the ground
  instead of deleting it.
- Save slot picker when all 3 slots are full. Save & Quit in the pause menu.
  Auto-save when the tab is closed.
- Secret rooms are actually hidden until found.
- Fusion classes have real elements; their flavor names are still shown.
- Settings apply at startup. Reset All Data only clears this game's data.
- Keyboard and screen-reader basics: focusable cards, labels, larger minimum text.

### Developer
- Automated browser test suite (`npm test`).
- `tools/build_fusion_index.js` for fusion data.
- Developer console, self-test and call logger load only with `?dev=1`.
