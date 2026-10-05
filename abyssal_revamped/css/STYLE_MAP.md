# style.css — Section Map & Gotchas

## CSS VARIABLES (`:root`)
All theme colors, spacing tokens. Change theme colors here.
- `--bg-*` — background layers (void=darkest, deep, panel, card, hover)
- `--border-dim/glow/bright` — border intensity levels
- `--accent-*` — gold, crimson, violet, teal
- `--text-*` — text colors by brightness/semantic
- `--hp-color`, `--mp-color`, `--xp-color`, `--shield-color` — resource bar colors

## SCREENS (`.screen`, `#title-screen`, `#class-select-screen`, etc.)
Each screen is `display:none` by default; `.active` sets `display:flex`.
`showScreen()` in screens.js toggles these.

## ITEM RARITY — ⚠️ TWO SEPARATE CLASSES, DIFFERENT PURPOSES
`.item-rarity` — used on INVENTORY CARDS (item-card divs). 
  - NO longer has `position:absolute` — that was removed after a bug.
  - Inventory cards add `style="position:absolute;top:0.3rem;right:0.4rem"` inline.
  - Color variants: `.item-rarity.common/uncommon/rare/epic/legendary/mythical/divine`

`.item-rarity-badge` — used INLINE inside shop items / reward lists (inline <span>).
  - Never has position:absolute — flows naturally in text.
  - Same color variants as above.

⚠️ OLD BUG: `.item-rarity` previously had `position:absolute;top:0.3rem;right:0.4rem` in the
class rule itself, which caused it to always fly to the top-right corner even inside modals.
FIX: removed from class rule; added inline on inventory card only (render.js line ~132).

## MODAL / OVERLAY
`#overlay` — fixed fullscreen backdrop, `display:none` → `display:flex` on `.active`
`#overlay-content` — the white box. `position:relative` to anchor the ✕ button.
`.modal-close-btn` — `position:absolute; top:0.6rem; right:0.6rem`. The ✕ in corner.
`.modal-body` — wrapper div inside overlay-content that holds all modal HTML content.
`.modal-title` — gold Cinzel Decorative heading used at top of modal content.

To add padding so content doesn't sit under the ✕: wrap content in a div with `padding-top:0.5rem`.

## TITLE BUTTONS (`.title-btn`)
⚠️ `.title-btn` has `min-width:340px` — designed for title screen full-width buttons.
When used inside modals/event dialogs, ALWAYS override with inline:
  `style="min-width:0; max-width:100%; font-size:0.8rem; padding:0.5rem 1rem"`

## GAME SCREEN LAYOUT
`#game-screen.active` — CSS grid: `220px 1fr 220px` columns, `auto 1fr` rows
- `#hud-row` — grid-column 1/-1 (full width), row 1
- `#left-panel` — col 1, row 2
- `#center-panel` — col 2, row 2  
- `#right-panel` — col 3, row 2
Responsive @media (max-width:700px): stacks to single column

## COMBAT ELEMENTS
`.enemy-sprite` animations: `enemyIdle` (float), `enemyAttack` (lurch left), `enemyHurt` (flash), `enemyDead` (spin+shrink)
`.float-num` — floating damage numbers, `position:absolute` inside combat containers
`.combo-display` — combo counter, `position:absolute` in enemy-display top-right
`.burst-fill-bg` — purple fill inside burst button, width driven by JS

## MAP CELLS (`.mc.*`)
All map cells are `position:absolute` with `left/top` set by JS renderer.
Cell type classes: `.wall`, `.floor`, `.player-cell`, `.enemy-cell`, `.boss-cell`,
  `.treasure-cell`, `.exit-cell`, `.exit-locked-cell`, `.shop-cell`, `.event-cell`,
  `.start-cell`, `.fog`, `.secret-hint`

## DEATH SCREEN (`.death-*`)
Staggered fade-in animations using `deathFadeIn` keyframes with `animation-delay`.
`.death-class-block` — icon/name/element of the class you died as.
`.death-class-progress` — class XP bar with level info.

## FUSION LAB
`.fusion-slot` — dashed border slots for drag+drop class selection.
  - `.filled` — solid border when class assigned
  - `.drag-over` — gold border on hover during drag
`.fusion-roster-card` — draggable class cards in the roster list.

## SETTINGS / SEGMENTED CONTROLS
`.seg-btn` / `.seg-group` — pill-style option selectors (world gen, settings rows)
`.toggle` / `.toggle-track` / `.toggle-thumb` — CSS-only toggle switches
`.settings-slider` — range input styled to match theme
