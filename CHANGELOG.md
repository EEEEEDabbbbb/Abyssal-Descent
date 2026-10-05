# Changelog

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
