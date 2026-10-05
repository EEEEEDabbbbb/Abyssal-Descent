// ══════════════════════════════════════════════════════════════
// FUSION LAB + CLASS COLLECTION  (js/ui/fusion_modal.js)
//
// THIS FILE owns BOTH the Fusion Lab screen AND the Class Collection
// screen (renderCollection()).
//
// FUSION LAB:
//   renderFusionLab()     — entry point, called by showScreen('fusion-lab-screen')
//   _renderRoster()       — left panel: all unlocked non-fusion classes
//   fusionDragStart/Drop  — drag handlers (ondragstart/ondrop in HTML)
//   fusionPick(id)        — tap/click/keyboard alternative to dragging
//   _renderSlot(slot)     — updates slot A or B display ('a'|'b')
//   _renderResultSlot()   — preview panel showing fused class
//   _updateFuseBtn()      — enables/disables the Fuse button
//   performFusion()       — executes the fusion (defined in fusion.js)
//   _checkConvergenceButton() — shows convergence/final fusion UI when conditions met
//
// CLASS COLLECTION:
//   renderCollection()    — entry point, called by showScreen('collection-screen')
//                           ⚠️  Must preloadPlayerFusions() first (screens.js does this)
//   filterCollection(f)   — tab filter: 'all'|rarity|'fusion'
//   _renderCollectionGrid() — re-renders grid for current filter
//   _buildCollCard(entry) — builds one card's HTML
//
// RARITY DISPLAY ORDER (high→low): abyssal, secret, divine, mythical,
//   legendary, epic, rare, uncommon, common
//
// COLLECTION DATA FLOW:
//   G.meta.unlockedClasses  — base classes + secret boss classes + abyssal/named classes
//   G.meta.unlockedFusions  — player-crafted fusion classes only
//   baseEntries             — from Object.values(CLASSES); isFusion=false always
//   fusionEntries           — from unlockedFusions + fusion-only ids found in unlockedClasses
//                             (abyssal_one/the_convergence/the_unnamed land here)
//   uniqueFusionEntries     — fusionEntries deduped against baseEntries (prevents double-show
//                             for classes that exist in both CLASSES and FUSION_CLASSES)
//
// RARITY → TAB MAPPING (important for modders):
//   'secret'  → Secret tab   (5 secret boss classes: voidreaper/plagueborn/stormlord/
//                              soulrender/abyssal_tyrant; NOT shown in Fusions tab)
//   'abyssal' → Abyssal tab  (the_convergence, the_unnamed, abyssal_one; NOT in Fusions)
//   anything else + isFusion → Fusions tab
//   anything else            → its rarity tab
// ══════════════════════════════════════════════════════════════

const _fusionSlots = { a: null, b: null };

function renderFusionLab() {
  _fusionSlots.a = null;
  _fusionSlots.b = null;
  _renderSlot('a');
  _renderSlot('b');
  _renderResultSlot(null);
  _updateFuseBtn();
  const s = document.getElementById('fusion-status');
  if (s) s.textContent = '';
  _renderRoster();
  _checkConvergenceButton();

  // Preload all fusion files relevant to the player's unlocked classes,
  // then re-check the preview in case slots were filled before load finished.
  if (typeof preloadPlayerFusions === 'function') {
    preloadPlayerFusions(G.meta.unlockedClasses || []).then(() => {
      _renderRoster();
      _checkFusionPreview();
    }).catch(() => {});
  }

  // Attach dragover visual feedback once
  ['a','b'].forEach(slot => {
    const el = document.getElementById('fusion-slot-' + slot);
    if (!el || el._fusionBound) return;
    el._fusionBound = true;
    el.addEventListener('dragenter', e => { e.preventDefault(); el.classList.add('drag-over'); });
    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
    el.addEventListener('drop',      () => el.classList.remove('drag-over'));
  });
}

// ── Roster ────────────────────────────────────────────────────
function _renderRoster() {
  const unlocked = G.meta.unlockedClasses || [];
  const levels   = G.meta.classLevels    || {};
  const roster   = document.getElementById('fusion-class-roster');
  if (!roster) return;

  const entries = unlocked.map(id => {
    const cls = CLASSES[id] || (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[id]) || {};
    return { id, cls, level: levels[id] || 0 };
  }).sort((a, b) => b.level - a.level);

  roster.innerHTML = entries.map(({ id, cls, level }) => {
    const ready  = level >= FUSION_MIN_LEVEL;
    const elObj  = cls.element && typeof ELEMENTS !== 'undefined' ? ELEMENTS[cls.element] : null;
    const color  = cls.color || '#888';
    const rarity = (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[id] : null) || cls.rarity || 'common';
    const rData  = (typeof RARITY !== 'undefined' && RARITY[rarity]) || { color:'#aaa', name: rarity };
    const drag   = ready ? 'draggable="true" ondragstart="fusionDragStart(event,\'' + id + '\')" onclick="fusionPick(\'' + id + '\')" role="button" tabindex="0"' : '';

    return '<div class="fusion-roster-card ' + (ready ? '' : 'not-ready') + '" '
      + 'style="--card-color:' + color + '" ' + drag + ' '
      + 'title="' + (ready ? 'Tap or drag to a slot' : 'Needs level ' + FUSION_MIN_LEVEL + ' (currently ' + level + ')') + '">'
      + '<div style="position:absolute;top:4px;right:4px;font-size:0.6rem;'
      + 'color:' + rData.color + ';border:1px solid ' + rData.color + '88;'
      + 'background:rgba(0,0,0,0.7);padding:1px 4px;border-radius:2px;'
      + 'font-family:\'Cinzel\',serif;text-transform:uppercase">' + rData.name + '</div>'
      + '<div style="font-size:1.8rem;margin-bottom:0.25rem;text-shadow:0 0 8px ' + color + '">' + (cls.icon || '?') + '</div>'
      + '<div style="font-family:\'Cinzel\',serif;font-size:0.7rem;color:' + color + ';margin-bottom:2px">' + (cls.name || id) + '</div>'
      + (elObj ? '<div style="font-size:0.6rem;color:' + elObj.color + '">' + elObj.icon + ' ' + elObj.name + '</div>' : '')
      + '<div style="font-size:0.6rem;margin-top:4px;color:' + (ready ? '#ffaa00' : 'var(--text-dim)') + '">'
      + (ready ? 'Lv.' + level + ' \u2605 Ready' : 'Lv.' + level + ' / ' + FUSION_MIN_LEVEL)
      + '</div></div>';
  }).join('');
}

// ── Drag handlers ─────────────────────────────────────────────
function fusionDragStart(event, classId) {
  event.dataTransfer.setData('classId', classId);
  event.dataTransfer.effectAllowed = 'copy';
}

function fusionDrop(event, slot) {
  event.preventDefault();
  const classId = event.dataTransfer.getData('classId');
  if (!classId) return;
  _placeInFusionSlot(classId, slot);
}

// fusionPick — tap/click/keyboard alternative to dragging: fills the first
// empty slot (or replaces slot B when both are full)
function fusionPick(classId) {
  if (_fusionSlots.a === classId || _fusionSlots.b === classId) return;
  _placeInFusionSlot(classId, !_fusionSlots.a ? 'a' : 'b');
}

function _placeInFusionSlot(classId, slot) {
  const other = slot === 'a' ? 'b' : 'a';
  if (_fusionSlots[other] === classId) {
    const s = document.getElementById('fusion-status');
    if (s) { s.textContent = "You can't fuse a class with itself."; s.style.color = 'var(--accent-crimson)'; }
    return;
  }
  _fusionSlots[slot] = classId;
  _renderSlot(slot);
  _checkFusionPreview();
  _updateFuseBtn();
}

// ── Slot rendering ────────────────────────────────────────────
function _renderSlot(slot) {
  const el      = document.getElementById('fusion-slot-' + slot);
  const classId = _fusionSlots[slot];
  if (!el) return;

  if (!classId) {
    el.classList.remove('filled');
    el.innerHTML = '<div class="fusion-slot-placeholder">Drop<br>Class ' + slot.toUpperCase() + '</div>';
    return;
  }

  const cls   = CLASSES[classId] || (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[classId]) || {};
  const level = (G.meta.classLevels || {})[classId] || 0;
  const elObj = cls.element && typeof ELEMENTS !== 'undefined' ? ELEMENTS[cls.element] : null;
  const color = cls.color || '#888';

  el.classList.add('filled');
  el.innerHTML =
    '<button class="slot-remove" onclick="_clearSlot(\'' + slot + '\')" title="Remove">\u2715</button>'
    + '<div class="slot-card">'
    + '<div class="slot-icon" style="text-shadow:0 0 10px ' + color + '">' + (cls.icon || '?') + '</div>'
    + '<div class="slot-name" style="color:' + color + '">' + (cls.name || classId) + '</div>'
    + (elObj ? '<div class="slot-el" style="color:' + elObj.color + '">' + elObj.icon + ' ' + elObj.name + '</div>' : '')
    + '<div class="slot-lvl">Lv.' + level + ' \u2605</div>'
    + '</div>';
}

function _clearSlot(slot) {
  _fusionSlots[slot] = null;
  _renderSlot(slot);
  _renderResultSlot(null);
  _updateFuseBtn();
  const s = document.getElementById('fusion-status');
  if (s) s.textContent = '';
}

// ── Preview ───────────────────────────────────────────────────
async function _checkFusionPreview() {
  const { a, b } = _fusionSlots;
  if (!a || !b) { _renderResultSlot(null); return; }
  const key = [a, b].sort().join('+');
  const status = document.getElementById('fusion-status');

  // Show loading state while we ensure the recipe file is loaded
  if (status) { status.textContent = 'Loading recipe\u2026'; status.style.color = 'var(--text-dim)'; }
  _renderResultSlot(null, true);

  if (typeof ensureFusionLoaded === 'function') {
    await ensureFusionLoaded([a, b]);
  }

  const resultId = typeof DUAL_FUSIONS !== 'undefined' ? (DUAL_FUSIONS[key] || null) : null;

  if (resultId && typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[resultId]) {
    _renderResultSlot(FUSION_CLASSES[resultId]);
    if (status) { status.textContent = 'Recipe found \u2014 ready to fuse!'; status.style.color = 'var(--accent-gold)'; }
  } else {
    _renderResultSlot(null);
    if (status) { status.textContent = 'No recipe exists for this combination.'; status.style.color = 'var(--text-dim)'; }
  }
}

function _renderResultSlot(cls, pending) {
  const el = document.getElementById('fusion-slot-result');
  if (!el) return;

  if (!cls && !pending) {
    el.classList.remove('has-result');
    el.innerHTML = '<div class="fusion-slot-placeholder">Result</div>';
    return;
  }
  if (pending) {
    el.classList.remove('has-result');
    el.innerHTML = '<div class="fusion-slot-placeholder" style="color:var(--accent-gold)">\u23f3</div>';
    return;
  }

  const elObj       = cls.element && typeof ELEMENTS !== 'undefined' ? ELEMENTS[cls.element] : null;
  const color       = cls.color || '#cc00ff';
  const alreadyOwned = (G.meta.unlockedFusions || []).includes(cls.id);

  el.classList.add('has-result');
  el.innerHTML =
    '<div class="slot-card">'
    + '<div class="slot-icon" style="text-shadow:0 0 14px ' + color + '">' + (cls.icon || '\u26d7') + '</div>'
    + '<div class="slot-name" style="color:' + color + '">' + cls.name + '</div>'
    + (elObj ? '<div class="slot-el" style="color:' + elObj.color + '">' + elObj.icon + ' ' + elObj.name + '</div>' : '')
    + '<div class="slot-lvl" style="color:' + (alreadyOwned ? 'var(--accent-gold)' : 'var(--accent-violet)') + '">'
    + (alreadyOwned ? '\u2713 Already unlocked' : '\u26d7 New fusion')
    + '</div></div>';
}

// ── Fuse button ───────────────────────────────────────────────
function _updateFuseBtn() {
  const btn = document.getElementById('fusion-fuse-btn');
  if (!btn) return;
  const ready = _fusionSlots.a && _fusionSlots.b;
  btn.style.opacity       = ready ? '1'    : '0.4';
  btn.style.pointerEvents = ready ? 'auto' : 'none';
}

async function doFusion() {
  const { a, b } = _fusionSlots;
  if (!a || !b) return;

  const btn    = document.getElementById('fusion-fuse-btn');
  const status = document.getElementById('fusion-status');
  if (btn)    { btn.style.opacity = '0.4'; btn.style.pointerEvents = 'none'; }
  if (status) { status.textContent = 'Fusing\u2026'; status.style.color = 'var(--text-dim)'; }

  const check = await canFuse([a, b]);
  if (!check.ok) {
    if (status) { status.textContent = '\u2717 ' + check.reason; status.style.color = 'var(--accent-crimson)'; }
    if (btn)    { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; }
    return;
  }

  const result = await performFusion([a, b]);
  if (!result.ok) {
    if (status) { status.textContent = '\u2717 ' + result.reason; status.style.color = 'var(--accent-crimson)'; }
    if (btn)    { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; }
    return;
  }

  const fusionCls = (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[result.result]) || {};
  const color     = fusionCls.color || '#cc00ff';
  if (status) {
    status.innerHTML = '<span style="color:' + color + '">\u2756 ' + (fusionCls.name || result.result) + ' unlocked! Now available in class select.</span>';
  }
  _renderResultSlot(fusionCls);
  _fusionSlots.a = null;
  _fusionSlots.b = null;
  _renderSlot('a');
  _renderSlot('b');
  _updateFuseBtn();
  _renderRoster();
  updateUI();
}

// ── Aliases ───────────────────────────────────────────────────
function openFusionModal() { showScreen('fusion-lab-screen'); renderFusionLab(); }
function showFusionLab()   { openFusionModal(); }


// ══════════════════════════════════════════════════════════════
// CLASS COLLECTION SCREEN


// ── Collection state ─────────────────────────────────────────
let _collectionFilter = 'all';
let _collectionData   = [];

function filterCollection(filter) {
  _collectionFilter = filter;
  document.querySelectorAll('.coll-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });
  _renderCollectionGrid();
}

function renderCollection() {
  const unlocked = G.meta.unlockedClasses || [];
  const fused    = G.meta.unlockedFusions || [];
  const levels   = G.meta.classLevels    || {};

  const RARITY_ORDER = ['abyssal','secret','divine','mythical','legendary','epic','rare','uncommon','common'];

  const baseEntries = Object.values(CLASSES).map(cls => ({
    id:          cls.id,
    name:        cls.name,
    icon:        cls.icon,
    color:       cls.color,
    element:     cls.element,
    tagline:     cls.tagline,
    description: cls.description || '',
    statDisplay: cls.statDisplay || {},
    rarity:      (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[cls.id] : null) || 'common',
    level:       levels[cls.id] || 0,
    unlocked:    unlocked.includes(cls.id),
    isFusion:    false,
  }));

  // Also pick up fusion-only classes unlocked via unlockedClasses (e.g. abyssal_one, the_convergence)
  const allClassIds = Object.keys(typeof CLASSES !== 'undefined' ? CLASSES : {});
  const fusionOnlyIds = Object.keys(typeof FUSION_CLASSES !== 'undefined' ? FUSION_CLASSES : {})
    .filter(id => !allClassIds.includes(id));
  const extraFused = fusionOnlyIds.filter(id => unlocked.includes(id) && !fused.includes(id));
  const allFusedIds = [...fused, ...extraFused];

  const fusionEntries = allFusedIds.map(id => {
    const cls = (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[id]) || {};
    // Check CLASS_RARITY first so abyssal classes get their correct rarity
    const rarity = (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[id] : null)
                || cls.rarity || 'rare';
    return {
      id,
      name:        cls.name        || id,
      icon:        cls.icon        || '\u26d7',
      color:       cls.color       || '#cc00ff',
      element:     cls.element     || '',
      tagline:     cls.tagline     || '',
      description: cls.description || '',
      statDisplay: cls.statDisplay || {},
      rarity,
      level:       levels[id]      || 0,
      unlocked:    true,
      isFusion:    true,
    };
  });

  // Deduplicate: remove fusion entries already present in baseEntries (e.g. divine secret classes)
  const baseIds = new Set(baseEntries.map(e => e.id));
  const uniqueFusionEntries = fusionEntries.filter(e => !baseIds.has(e.id));

  _collectionData = [...baseEntries, ...uniqueFusionEntries].sort((a, b) => {
    if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
    const ri = RARITY_ORDER.indexOf(a.rarity);
    const rj = RARITY_ORDER.indexOf(b.rarity);
    if (ri !== rj) return ri - rj;
    return a.name.localeCompare(b.name);
  });

  // Update subtitle — total includes all 630 fusion classes + 37 base classes = 667
  const TOTAL_CLASSES = 667;
  const totalUnlocked = _collectionData.filter(e => e.unlocked).length;
  const total = TOTAL_CLASSES;
  const sub = document.getElementById('collection-subtitle');
  if (sub) sub.textContent = totalUnlocked + ' / ' + total + ' classes discovered';

  // Update progress bar
  const bar = document.getElementById('coll-progress-bar');
  const lbl = document.getElementById('coll-progress-label');
  if (bar) bar.style.width = Math.round((totalUnlocked / total) * 100) + '%';
  if (lbl) lbl.textContent = Math.round((totalUnlocked / total) * 100) + '% complete';

  // Update tab counts
  const RARITY_LIST = ['common','uncommon','rare','epic','legendary','mythical','divine','secret','abyssal'];
  RARITY_LIST.forEach(r => {
    const tab = document.querySelector('.coll-tab[data-filter="' + r + '"]');
    if (tab) {
      const count = _collectionData.filter(e => e.rarity === r).length;
      const unl   = _collectionData.filter(e => e.rarity === r && e.unlocked).length;
      tab.textContent = tab.textContent.replace(/ \(\d+\/\d+\)$/, '');
      tab.textContent += ' (' + unl + '/' + count + ')';
    }
  });
  const fusionTab = document.querySelector('.coll-tab[data-filter="fusion"]');
  if (fusionTab) {
    // Count all entries that will appear in the Fusions tab:
    // isFusion:true AND rarity is not abyssal (abyssal fusions go in the Abyssal tab)
    const fusionCount = _collectionData.filter(e => e.isFusion && e.rarity !== 'abyssal' && e.rarity !== 'secret').length;
    fusionTab.textContent = '\u26d7 Fusions (' + fusionCount + ')';
  }

  _renderCollectionGrid();
}

function _renderCollectionGrid() {
  const grid = document.getElementById('collection-grid');
  if (!grid) return;

  const filter = _collectionFilter;
  const RARITY_ORDER = ['abyssal','secret','divine','mythical','legendary','epic','rare','uncommon','common'];
  const RARITY_STARS = { common:1, uncommon:2, rare:3, epic:4, legendary:5, mythical:6, divine:7, secret:8, abyssal:9 };

  let entries = _collectionData;
  if (filter === 'fusion') {
    entries = entries.filter(e => e.isFusion && e.rarity !== 'abyssal' && e.rarity !== 'secret');
  } else if (filter !== 'all') {
    entries = entries.filter(e => e.rarity === filter);
  }

  if (entries.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-dim);padding:3rem 0;font-style:italic;font-size:0.8rem">No classes in this category yet.</div>';
    return;
  }

  // Group by rarity when viewing "all"
  const showSections = (filter === 'all');
  let html = '';

  if (showSections) {
    // Group into rarity sections
    const groups = {};
    entries.forEach(e => {
      // Only send to _fusion bucket if it's a fusion AND not a named rarity tier (divine/abyssal)
      const namedRarity = e.rarity === 'abyssal' || e.rarity === 'divine' || e.rarity === 'secret' || !e.isFusion;
      const key = namedRarity ? e.rarity : '_fusion';
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });

    const sectionOrder = [...RARITY_ORDER, '_fusion'];
    sectionOrder.forEach(key => {
      if (!groups[key] || groups[key].length === 0) return;
      const r = (key === '_fusion')
        ? { name:'Fusions', color:'#cc00ff', stars:0 }
        : ((typeof RARITY !== 'undefined' && RARITY[key]) || { name:key, color:'#888', stars:1 });
      const unlockedInGroup = groups[key].filter(e => e.unlocked).length;
      html += '<div class="coll-section-header" style="--section-color:' + r.color + '">'
        + '<div class="coll-section-line"></div>'
        + '<div class="coll-section-label">'
        + (key === '_fusion' ? '\u26d7 ' : _rarityStars(r.stars || RARITY_STARS[key] || 1, r.color))
        + ' ' + r.name + ' '
        + '<span class="coll-section-count">(' + unlockedInGroup + '/' + groups[key].length + ')</span>'
        + '</div>'
        + '<div class="coll-section-line"></div>'
        + '</div>';
      groups[key].forEach(e => { html += _buildCollCard(e); });
    });
  } else {
    entries.forEach(e => { html += _buildCollCard(e); });
  }

  grid.innerHTML = html;
}

function _rarityStars(count, color) {
  let s = '';
  for (let i = 0; i < count; i++) s += '<span style="color:' + color + ';font-size:0.6rem">\u2605</span>';
  return s;
}

function _buildCollCard(entry) {
  const r = (typeof RARITY !== 'undefined' && RARITY[entry.rarity]) || { color:'#aaaaaa', name:entry.rarity, stars:1 };
  const RARITY_STARS = { common:1, uncommon:2, rare:3, epic:4, legendary:5, mythical:6, divine:7, secret:8, abyssal:9 };
  const stars   = r.stars || RARITY_STARS[entry.rarity] || 1;
  const elObj   = (typeof ELEMENTS !== 'undefined' && entry.element) ? ELEMENTS[entry.element] : null;
  const atMax   = entry.level >= 20;
  const color   = entry.color || '#888';

  const rarityBadge = '<div class="coll-rarity-badge" style="--badge-color:' + r.color + '">' + r.name + '</div>';

  const starsRow = '<div class="coll-stars">'
    + Array.from({length:8}, (_,i) =>
        '<span class="coll-star' + (i < stars ? '' : ' empty') + '" style="--star-color:' + r.color + '">\u2605</span>'
      ).join('')
    + '</div>';

  if (!entry.unlocked) {
    return '<div class="coll-card coll-locked" style="--card-color:#555">'
      + rarityBadge
      + starsRow
      + '<div class="class-icon" style="font-size:1.6rem;opacity:0.25">\uD83D\uDD12</div>'
      + '<div class="class-name" style="color:var(--text-dim);font-size:0.75rem">???</div>'
      + '<div style="font-size:0.6rem;color:var(--text-dim);font-style:italic;margin-top:2px">Not yet discovered</div>'
      + '</div>';
  }

  const statBars = Object.entries(entry.statDisplay).map(([k,v]) =>
    '<div style="display:flex;align-items:center;gap:4px;font-size:0.6rem;margin-bottom:2px">'
    + '<span style="width:24px;color:var(--text-dim);flex-shrink:0">' + k + '</span>'
    + '<div style="flex:1;height:3px;background:var(--border);border-radius:2px;min-width:0">'
    + '<div style="width:' + Math.min(100,v*10) + '%;height:3px;background:' + color + ';border-radius:2px"></div>'
    + '</div></div>'
  ).join('');

  const lvlColor = atMax ? '#ffaa00' : (entry.level > 0 ? 'var(--text-mid)' : 'var(--text-dim)');
  const lvlText  = atMax ? 'LV.' + entry.level + ' ★ MAX' : 'LV.' + (entry.level || 0) + ' / 20';
  const lvlBadge = '<div style="font-family:\'Cinzel\',serif;font-size:0.75rem;color:' + lvlColor + ';letter-spacing:0.04em;margin-bottom:3px">' + lvlText + '</div>';

  const fusionTag = (entry.isFusion && entry.rarity !== 'abyssal' && entry.rarity !== 'secret')
    ? '<div class="coll-fusion-tag">\u26d7 Fusion Class</div>'
    : '';

  return '<div class="coll-card" style="--card-color:' + color + '">'
    + rarityBadge
    + starsRow
    + '<div class="class-icon" style="font-size:1.6rem;text-shadow:0 0 12px ' + color + '">' + entry.icon + '</div>'
    + '<div class="class-name" style="font-size:1rem;margin-bottom:1px">' + entry.name + '</div>'
    + lvlBadge
    + (elObj ? '<div style="color:' + elObj.color + ';font-size:0.78rem;margin-bottom:2px">' + elObj.icon + ' ' + elObj.name + '</div>' : '')
    + fusionTag
    + '<div style="font-size:0.75rem;color:var(--text-mid);font-style:italic;margin-bottom:4px;line-height:1.3;flex:1">' + entry.tagline + '</div>'
    + '<div style="margin-top:auto">' + statBars + '</div>'
    + '</div>';
}

// ══════════════════════════════════════════════════════════════
// CONVERGENCE BUTTON — appears only when all 5 secret boss
// classes are unlocked AND mastered (level 20+)
// ══════════════════════════════════════════════════════════════

function _checkConvergenceButton() {
  const container = document.getElementById('fusion-convergence-zone');
  if (!container) return;

  const canConv = typeof canConverge === 'function' && canConverge();
  const alreadyHave = (G.meta.unlockedClasses || []).includes('the_convergence');
  const canFinal = !alreadyHave && canConv;
  const hasConvergence = alreadyHave;
  const hasAbyssalOne = (G.meta.unlockedClasses || []).includes('abyssal_one');
  const convLevel = (G.meta.classLevels || {})['the_convergence'] || 0;
  const aoLevel = (G.meta.classLevels || {})['abyssal_one'] || 0;
  const canDoFinal = hasConvergence && hasAbyssalOne && convLevel >= 20 && aoLevel >= 20
    && !(G.meta.unlockedClasses || []).includes('the_unnamed');
  const hasUnnamed = (G.meta.unlockedClasses || []).includes('the_unnamed');

  if (!canConv && !hasConvergence && !hasUnnamed) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';

  if (hasUnnamed) {
    container.innerHTML =
      '<div style="text-align:center;padding:1rem 0;">'
      + '<div style="font-size:1.4rem;color:#e8e8ff;font-family:\'Cinzel\',serif;letter-spacing:0.1em;margin-bottom:0.4rem">— — —</div>'
      + '<div style="font-size:0.7rem;color:var(--text-dim)">It is complete.</div>'
      + '</div>';
    return;
  }

  let html = '';

  if (canFinal) {
    html +=
      '<div style="text-align:center;width:100%">'
      + '<div style="font-size:0.65rem;color:var(--text-dim);font-family:\'Cinzel\',serif;letter-spacing:0.08em;margin-bottom:0.5rem">ALL FIVE CONVERGE</div>'
      + '<button class="title-btn" style="'
      + 'background:linear-gradient(135deg,#220033,#110022);'
      + 'border:1px solid #9900cc88;color:#cc88ff;'
      + 'font-family:\'Cinzel\',serif;letter-spacing:0.1em;'
      + 'min-width:240px;padding:0.7rem 1.5rem;'
      + '" onclick="_doConvergence()">✦ Converge</button>'
      + '<div style="font-size:0.65rem;color:var(--text-dim);margin-top:0.4rem">All 5 secret boss classes mastered</div>'
      + '</div>';
  } else if (hasConvergence && canDoFinal) {
    html +=
      '<div style="text-align:center;width:100%">'
      + '<div style="font-size:0.65rem;color:var(--text-dim);font-family:\'Cinzel\',serif;letter-spacing:0.08em;margin-bottom:0.5rem">THE FINAL FUSION</div>'
      + '<button class="title-btn" style="'
      + 'background:linear-gradient(135deg,#0a0a14,#050510);'
      + 'border:1px solid #e8e8ff44;color:#e8e8ff;'
      + 'font-family:\'Cinzel\',serif;letter-spacing:0.12em;'
      + 'min-width:240px;padding:0.7rem 1.5rem;'
      + '" onclick="_doFinalFusion()">　</button>'
      + '<div style="font-size:0.65rem;color:var(--text-dim);margin-top:0.4rem">The Convergence + Abyssal One</div>'
      + '</div>';
  } else if (hasConvergence) {
    // Show progress toward final fusion
    const lines = [];
    if (!hasAbyssalOne) lines.push('Abyssal One not unlocked');
    else if (aoLevel < 20) lines.push(`Abyssal One: Lv.${aoLevel}/20`);
    if (convLevel < 20) lines.push(`The Convergence: Lv.${convLevel}/20`);
    html +=
      '<div style="text-align:center;width:100%">'
      + '<div style="font-size:0.65rem;color:var(--text-dim);font-family:\'Cinzel\',serif;letter-spacing:0.08em;margin-bottom:0.3rem">THE CONVERGENCE UNLOCKED</div>'
      + '<div style="font-size:0.65rem;color:var(--text-dim)">' + lines.join(' · ') + '</div>'
      + '</div>';
  }

  container.innerHTML = html;
}

async function _doConvergence() {
  if (typeof performConvergence !== 'function') return;
  const result = performConvergence();
  const status = document.getElementById('fusion-status');
  if (!result.ok) {
    if (status) { status.textContent = '✗ ' + result.reason; status.style.color = 'var(--accent-crimson)'; }
    return;
  }
  if (status) {
    status.innerHTML = '<span style="color:#cc88ff;font-family:\'Cinzel\',serif;letter-spacing:0.08em">✦ The Convergence unlocked. Five become one.</span>';
  }
  _checkConvergenceButton();
  _renderRoster();
  updateUI();
}

async function _doFinalFusion() {
  if (typeof performFinalFusion !== 'function') return;
  const result = performFinalFusion();
  const status = document.getElementById('fusion-status');
  if (!result.ok) {
    if (status) { status.textContent = '✗ ' + result.reason; status.style.color = 'var(--accent-crimson)'; }
    return;
  }
  // No announcement. Just silence.
  if (status) { status.innerHTML = '<span style="color:#e8e8ff">　</span>'; }
  _checkConvergenceButton();
  _renderRoster();
  updateUI();
}
