# Abyssal Descent

A gothic roguelike dungeon crawler that runs entirely in the browser. Descend 50
procedurally generated floors, fight turn-based battles, collect loot, and fuse
mastered classes into 600+ new ones.

## Play

Open `abyssal_revamped/index.html` in a browser. No install, server or build
step is needed. Progress is saved in the browser's local storage.

- `abyssal_revamped/READ_ME_FIRST.md`: quick start and community links
- `abyssal_revamped/ABYSSAL_REFERENCE.md`: full game reference (classes, enemies, items, systems)
- `abyssal_revamped/MODDING_GUIDE.md`: how the code is organised and how to add content
- `CHANGELOG.md`: what changed between versions

## Development

The game itself has no dependencies. Tooling lives at the repository root and
is only needed for development:

```bash
npm install     # installs Playwright and a headless Chromium
npm test        # runs the automated test suite (well under a minute)
```

The suite boots the real game in headless Chromium and checks:

- **Data integrity**: every ability, burst, element, passive, fusion recipe and
  event reference resolves; loot quality rises with depth.
- **Ability fuzzing**: all 6,800+ abilities are cast and their statuses run to
  completion. It checks for crashes, NaN stats, and stat changes that outlive
  the fight.
- **Regressions**: one test per fixed bug (saves, softlocks, exploits, combat
  rules, passives).
- **Content and UI**: every rival boss fought through all its phases, every
  gear effect, run records and achievements, and tooltips by mouse, keyboard
  and touch.
- **End-to-end play**: a bot plays through the UI for several floors, including
  a boss fight. Set `PLAY_FLOORS=21 npm test` to send it deeper.

Other tools:

- `node tools/build_fusion_index.js` rebuilds the fusion class → file index and
  fixes fusion element/id problems. Run it after editing fusion data.
- `node tools/class_balance.js [classId…]` simulates fights for each class on
  several floors and prints win rates, which is handy after changing a class.
- Opening `index.html?dev=1` loads the developer console (backtick or F2), the
  in-browser self test (`devtest()`), and a call logger.
