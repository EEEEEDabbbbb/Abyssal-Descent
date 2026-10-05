# ABYSSAL — Rework Design Doc v1
*Drafted from a direct read of the current codebase (combat.js, enemies.js, classes.js, MODDING_GUIDE.md, ABYSSAL_REFERENCE.md) — not assumptions.*

## Progress
- ✅ **Bug-fix & polish pass (v2.1): DONE.** Stat/status engine rebuilt, saves rewritten, all passives implemented, many combat fixes — see `CHANGELOG.md` at the repo root. (The `frost_bite` slow mentioned below is fixed: debuff stat losses now always wear off.)
- ✅ **Phase 1 — Combat core: DONE.**
  - Initiative queue: `state.js` (`G._pendingSecondActor`), `combat.js` (`determineFirstActor`, `resolveNextRoundInitiative`, wired into `startCombat`/`endPlayerTurn`/`enemyTurn`). SPD now decides who acts first each round (clamped 10–90%, never a lock).
  - Telegraphing: `enemies.js` (`ENEMY_ABILITY_INFO`, `getEnemyNextMove`), `render.js` (combat view shows "Next: [icon] [label]" for every enemy).
  - Regular-fight escalation: `combat.js` (`checkRegularEscalation` — +8% ATK every 5 rounds for non-boss fights, mutually exclusive with boss enrage).
- ✅ **Phase 2 — Enemy AI: DONE, with one deliberate change from the original plan.**
  - Instead of hand-tagging each of the 81 enemies with an archetype label (Aggressor/Controller/Drainer/Bruiser), classified the 31 *abilities* by role once (`ABILITY_ROLE` in enemies.js: pressure/control/drain/filler) and made selection reactive to fight state instead. Scales to every current and future enemy automatically — no per-enemy data entry, nothing to keep in sync as new enemies get added.
  - `pickEnemyAbility(e,p)` (enemies.js): player <30% HP → enemy reaches for a 'pressure' move from its own kit if it has one; enemy <30% HP → reaches for a 'drain' move if it has one; otherwise the original fixed cycle. Deterministic, not random.
  - Single source of truth: both the real resolution (`enemyTurn()` in combat.js) and the telegraph (`getEnemyNextMove()`) call the same function, so the "Next:" indicator can never show something different from what actually happens.
  - Not yet done: an opening-move "Controller" bias (favor a control move in the first round or two) — natural next refinement if you want more of that archetype's flavor specifically.
- ✅ Phase 3 — Enemy variety (elites, new patterns, multi-enemy rooms): DONE
  - ✅ Elite variants: `enemies.js` (`ELITE_CHANCE`=12%, `ELITE_STAT_MULT`=1.4× on floor 3+, rolled in `getRandomEnemy()` — ×2 gold, +0.35 loot chance, +60% XP, "Elite" name prefix), `render.js` (purple border/tag, distinct from boss crimson and guardian gold).
  - ✅ New ability patterns: three structurally distinct moves added to `ENEMY_ABILITIES`/`ENEMY_ABILITY_INFO`/`ABILITY_ROLE`, wired into 2 enemies each (6 total) across tiers:
    - `channel_burst` (Iron Golem, Void Witch) — genuine 2-turn commitment: turn 1 telegraphs + chip damage, turn 2 is FORCED via a new `e._channeling` override in `pickEnemyAbility` (bypasses the normal cycle entirely) and lands a huge hit. Punishable — burst it down mid-channel and the release never lands.
    - `summon_ally` (Bog Witch, Fungal Shaman) — distinct from the existing `summon` (self-heal only): adds a persistent extra damage-over-time source simulating a minion, without needing true multi-enemy combat.
    - `culling_strike` (Void Stalker, Plague Knight) — scales with the player's current debuff count; a payoff finisher for debuff-heavy enemies.
  - ✅ Multi-enemy rooms: DONE — true independent multi-actor combat, not simulated.
    - **Core trick that kept this low-risk**: `state.js` — `G.enemies` is the real backing array, `G.enemy` became a `get`/`set` accessor resolving to the currently-targeted (auto-skipping dead) enemy. All ~89 pre-existing call sites across abilities.js/items.js/status.js/combat.js that read or write `G.enemy` needed **zero changes** — for a solo fight `G.enemies` is just a 1-element array and `G.enemy` resolves exactly as before.
    - `combat.js`: `startCombat()` accepts a single enemy or an array; `enemyTurn()` loops every alive pack member each round (stunned ones skip individually, pack continues) while the round/initiative bookkeeping from Phase 1 stays untouched — "the enemy side" is still one conceptual turn-slot per round, whatever's inside it; `checkCombatEnd()` requires *all* pack members dead; `winCombat()` sums XP/gold and rolls loot independently per enemy; new `targetEnemy(idx)` for click-to-target.
    - `enemies.js`: `getRandomEnemyPack()` — 2 enemies at 70% stats each (a measured bump, not simply 2×), Elite rolls disabled on pack members so the two difficulty systems don't compound.
    - `mapgen.js`: new `placeEnemyCell()` helper, 16% pack chance on floor 4+, wired into all 3 enemy-spawn sites. **Hard guarantee: bosses/guardians are never packs** — enforced by construction (pack rolling only happens in this one helper, which the boss spawn path never calls), which is what let `winCombat()`/`checkCombatEnd()` stay simple.
    - `render.js`: new `renderPackCombatView()` — separate, simpler card layout (no boss phase bar needed) with click-to-target and a highlighted border on the current target; solo fights still render through the original untouched card. Minimap shows a distinct 👥 "Enemy Pack (N)" tooltip.
    - Verified action buttons (`#abilities-grid`/`#basic-actions`) and the combo display are in separate DOM containers refreshed independently of the enemy card area, so they needed no changes.
- ✅ Phase 4 — New content (priority: floors/biomes > bosses > items; NO new classes per your call — 600+ already exist): DONE
  - ✅ Floor/biome variety: DONE. New `js/data/biomes.js` — 7 themed biomes spanning floors 1-50, reusing the existing `ELEMENTS` color palette (Crumbling Crypt 1-7 ghost, Frozen Depths 8-14 ice, Molten Rift 15-20 fire, Storm Wastes 21-27 storm, Coral Abyss 28-35 water, Void Reaches 36-42 void, The Abyssal Maw 43-50 cosmic).
    - Each biome (except the first) has ONE environmental effect on exploration moves (now 5% chance/move, at most 3 per floor, never lethal — `triggerBiomeEffect()` wired into `movePlayer()`), severity scaling gently with depth. **Important correctness fix along the way**: I found `tickStatus()` is only ever called from combat's `endPlayerTurn()`, never during exploration — so a duration-based status debuff applied by a biome effect would never count down outside combat. Redesigned all effects as instant damage/heal instead of statuses, which sidesteps that gap entirely. (Also found, unrelated to this work: `frost_bite`'s enemy ability stores its SPD reduction as `spdLoss` instead of the `spdPen` field `tickStatus()` actually restores on expiry — a pre-existing latent bug, so that slow is currently permanent. Didn't touch it — out of scope for this content pass, flagging for awareness.)
    - Biome name + a random flavor line announced on floor transition (`nextFloor()`); first floor of a new biome gets an extra "Entering [Biome]" line.
    - Subtle visual identity: new `--biome-accent` CSS var (`style.css`) tints plain floor-tile borders using the biome's element color, set via `nextFloor()`. Verified it can't bleed into enemy/boss/treasure/exit/shop cell colors — those rules sit later in the cascade at equal specificity, so they always win on cells that have both classes.
  - ✅ New bosses (2.2): 9 rival bosses (`BOSS_RIVALS` in enemies.js), one per boss floor 5–45, each with three phases and a signature move; the run seed picks the usual boss or its rival.
  - ✅ New items/equipment (2.2): 15 items with 7 new gear effects (thorns, executioner, firststrike, manasiphon, laststand, scholar, midas).
- ✅ Phase 5 — Juice pass: synthesized sound effects, screen shake on crits/big hits/boss phases, a crit flash on the enemy, varied attack lines in the combat log, achievement toasts, damage estimates in the "Next:" telegraph.
- ✅ 2.2 systems work (beyond the original plan): one smooth difficulty curve fitted to measured player growth (`ENEMY_CURVE`, `tools/honest_run.js`), seeded runs + Daily Descent, run records/achievements, minimap. See `CHANGELOG.md`.

## Priority Order (confirmed with you)
1. **Combat feel & excitement** — pacing, impact, tension
2. **Enemy variety & AI** — smarter, more varied fights
3. **New content** — classes, items, floors, bosses
4. **Architecture** — *not* a rework target. Current data-driven structure (classes.js/items.js/enemies.js as plain data, lazy-loaded fusions, getClassData() indirection) is already clean and stays as-is. Any architecture change should be a side effect of #1–#3, never a goal on its own.

## What's Already Good (do not touch)
- Data-driven definitions for classes/items/enemies/events — easy to extend, well-documented in MODDING_GUIDE.md
- Lazy-loaded fusion system (595 fusions across 17 files) — solves the file-size problem elegantly
- Status effect system (`addStatus`/`tickStatus`) — general-purpose, handles stat penalties + per-turn callbacks cleanly
- Boss phase/enrage scaffolding — good bones, just underused (see below)
- Talent tree + shard shop meta-progression — solid retention loop already

## Diagnosis: Why Combat Currently Feels Flat

Verified directly in `combat.js` / `enemies.js`:

1. **No turn order / initiative.** `startCombat()` hardcodes `G.turn = 'player'` every fight. SPD is never checked to decide who acts first — it's strict player→enemy→player alternation, always, regardless of stats. SPD's *only* real jobs today: a dodge-chance formula (`40 + p.spd - e.spd`), a couple of status-penalty bookkeeping lines, and one niche equipment token (`spd_dmg`, +10% dmg if faster). It's a stat that barely matters.

2. **Enemy "AI" is a fixed loop, not a decision.** `enemyTurn()` does `pattern[e.patternIndex % pattern.length]; e.patternIndex++`. Every enemy just cycles its `patterns` array in the same order every single fight, forever — total obliviousness to player HP, player status, or how the fight is going. A `curse` caster will curse you on the same turn number whether you're at 100% HP or 5%.

3. **Escalation is boss-only.** Phases + enrage timers exist, but only for the 10 named bosses. Every other one of the 81 regular enemies is flat from turn 1 to death — no build-up, no "oh it's getting dangerous" moment.

4. **No signal before enemy action.** The enemy's move for this turn isn't shown until after it lands. Player decisions are more reactive-after-the-fact than tactical.

## Rework 1 — Combat Core (foundation everything else sits on)

- **Initiative queue.** Replace the hardcoded player-first alternation with a SPD-driven turn order, recalculated each round. Makes SPD (and the talents/items that boost it) actually matter, and opens room for "extra turn" / "double turn" effects as new build tools.
- **Telegraphed enemy intent.** Show the enemy's *next* move (icon + short label) before the player acts, sourced straight from `pattern[patternIndex]`. Near-zero engine risk — it's data that already exists, just not surfaced — but it turns every fight from "watch numbers happen" into "react to what's coming."
- **Escalation for regular fights, not just bosses.** A lightweight round-based ramp (e.g. every N rounds, small ATK/SPD creep) so long fights build tension instead of flatlining. Reuses the enrage-timer pattern already proven on bosses.

## Rework 2 — Enemy AI (behavior profiles, not fixed loops)

Replace `pattern[patternIndex % pattern.length]` with a weighted decision step:
- Each enemy keeps its `patterns` list (no data migration needed) but gains a small rule set — e.g. "favor `curse`/`wail` while player is above 60% HP, favor `heavy`/execute-style moves once player is below 30%."
- Four rough archetypes to sort the existing 81 enemies + 10 bosses into: **Aggressor** (pure pressure), **Controller** (debuff/stun-heavy), **Drainer** (life_drain/heal-focused), **Bruiser** (heavy hits, slow tempo). Reframes existing patterns rather than writing 91 new movesets from scratch.
- Still fully deterministic and debuggable — no ML, just readable if/else weighting, consistent with how `checkBossPhase`/`checkBossEnrage` already work.

## Rework 3 — Enemy Variety

- **Elite variants.** Cheap content multiplier: tag a subset of existing enemies as spawnable "Elite" (e.g. ×1.4 stats, distinct visual tint, guaranteed better loot roll). Reuses all 81 existing enemies instead of hand-authoring new ones from zero.
- **New enemy ability patterns.** Current 14 (`basic`/`heavy`/`double`/`curse`/`wail`/etc.) are all "hit + maybe debuff." Add a few structurally different ones — a channel-then-release move (telegraphed, punishable if you burst it down first), a summon-reinforcement move (not just self-heal, which is all `summon` does today), a positional/AOE-flavored hit that scales with a status you've stacked. New entries just slot into `ENEMY_ABILITIES`.
- **Occasional multi-enemy rooms.** Right now every fight is 1-on-1. `mapgen.js` room content could occasionally spawn a pair of weaker enemies instead of one — real variety without new enemy data.

## Rework 4 — New Content (built on top of the improved engine)
Once the above lands, new classes/items/floors/bosses slot into a much more interesting combat loop instead of just adding more of the same flat fights. This phase is the payoff, not the starting point — sequenced last on purpose.

## Sequencing
1. Combat core (initiative, telegraphing, regular-fight escalation)
2. Enemy AI behavior profiles + archetype sort
3. Enemy variety (elites, new patterns, multi-enemy rooms)
4. New content (classes/items/floors/bosses) on the reworked foundation
5. Juice pass (hit-stop/screen-shake on crits & phase transitions, combat log phrasing variety) — cheap, do opportunistically alongside any phase above

## Open Questions For You
- OK with regular (non-boss) fights occasionally being multi-enemy, or keep every non-boss fight 1-on-1?
- Any concern about breaking existing save files? Adding `e.archetype`/AI-weight fields to enemy data is additive and safe; anything touching `G.turn`/initiative structure should get a fallback default in `run_save.js` per the modding guide's save-compat warning.
- Want me to start writing actual code for Rework 1 (combat core) next, or review/adjust this doc first?
