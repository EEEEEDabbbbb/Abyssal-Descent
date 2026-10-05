// ══════════════════════════════════════════════════════════════
// SCREENS  (js/ui/screens.js)
//
// showScreen(id) — the only way to navigate between screens.
//   Hides all .screen elements, shows the target by id.
//   Calls the appropriate render function for that screen.
//   Screen ids: 'title-screen', 'class-select-screen', 'game-screen',
//               'game-over-screen', 'settings-screen', 'fusion-lab-screen',
//               'collection-screen'
//
// TITLE SCREEN:
//   renderTitleScreen() — shows/hides continue button, spawns floating runes
//   initTitleRunes() — creates 18 random rune characters that float upward
//
// CLASS SELECT:
//   renderClassSelect() — builds class-grid from CLASSES + G.meta.unlockedFusions
//   ⚠️ Must call preloadPlayerFusions() first if any fusions are unlocked
//      (fusion data files are lazy-loaded; see fusion.js).
//      showScreen() handles this automatically — don't call renderClassSelect() directly.
//   unlockClass(id, event) — deducts shards, adds to G.meta.unlockedClasses, saves
//
// CLASS SELECT DATA FLOW:
//   allClasses = Object.values(CLASSES)                   — always shown (locked/unlocked)
//              + unlockedFusions filtered against CLASSES  — fusion-only additions only
//   ⚠️ Classes in BOTH CLASSES and FUSION_CLASSES (secret boss classes) must NOT be added
//      from unlockedFusions — they're already in allClasses via CLASSES. The renderClassSelect
//      function skips fusion entries where CLASSES[id] already exists to prevent duplicates.
//   isUnlocked: base classes check unlockedClasses; fusion-only check unlockedFusions
//   conquestOnly classes (abyssal_one) require G.meta.conquestRewards.conquered === true
//
// GAME OVER SCREEN:
//   gameOver() in utils.js calls showScreen('game-over-screen')
//   Populates death stats, class icon, class level progress bar, fusion hint
//   Death quotes are random from a local pool
//
// CLASS CARD LOCK OVERLAYS:
//   Each locked card gets a .class-lock-overlay div (position:absolute, inset:0)
//   Overlay content depends on lock type:
//     - Fusion class: "Unlock in Fusion Lab"
//     - Conquest only: "Defeat Floor 50 boss"
//     - Normal locked: shows shard cost + floor requirement with ✓/✗ indicators
//       and an Unlock button if floor requirement is met
//
// SETTINGS:
//   renderSettingsScreen() — renders theme swatches and loadout grid
//   openSettings() — saves G._prevScreen so returnFromSettings() goes back correctly
// ══════════════════════════════════════════════════════════════

function showScreen(id) {
  // Explicitly hide ALL screens by force
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  document.getElementById('overlay').classList.remove('active');

  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    el.style.display = 'flex';
  }

  if (id === 'title-screen')        renderTitleScreen();
  if (id === 'class-select-screen') {
    // Preload fusion files for any unlocked fusions before rendering
    const fusions = G.meta.unlockedFusions || [];
    if (fusions.length > 0 && typeof preloadPlayerFusions === 'function') {
      preloadPlayerFusions(G.meta.unlockedClasses || []).then(() => renderClassSelect());
    } else {
      renderClassSelect();
    }
  }
  if (id === 'game-screen')         updateUI();
  if (id === 'collection-screen') {
    if (typeof preloadPlayerFusions === 'function') {
      preloadPlayerFusions(G.meta.unlockedClasses || []).then(() => renderCollection());
    } else {
      renderCollection();
    }
  }
  if (id === 'fusion-lab-screen')   renderFusionLab();
  if (id === 'settings-screen')     renderSettingsScreen();
}


function renderTitleScreen() {
  const m = G.meta;
  const conquered = m.conquestRewards?.conquered;

  // Continue: any saved run. New Game+: unlocked by beating floor 50.
  _updateContinueBtn();
  const ngBtn = document.getElementById('ngplus-btn');
  if (ngBtn) {
    ngBtn.style.display = m.conquestRewards?.ngPlusUnlocked ? '' : 'none';
    ngBtn.textContent = m.ngPlus > 0 ? `🔄 New Game+ (now NG+${m.ngPlus})` : '🔄 New Game+';
  }

  // Update flavor quote if player has conquered the abyss
  const flavor = document.querySelector('.title-flavor em');
  if (flavor && conquered) {
    flavor.innerHTML = '"Conqueror of the Abyss.<br>The darkness remembers your name."';
  }

  const ver = document.getElementById('title-version');
  if (ver) ver.textContent = `v${GAME_VERSION}`;

  // Spawn floating runes
  initTitleRunes();
}

function initTitleRunes() {
  const container = document.getElementById('title-runes');
  if (!container || container.children.length > 0) return;
  const runes = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];
  for (let i = 0; i < 18; i++) {
    const r = document.createElement('div');
    r.className = 'rune';
    r.textContent = runes[Math.floor(Math.random() * runes.length)];
    r.style.left = (Math.random() * 100) + '%';
    r.style.top  = (20 + Math.random() * 70) + '%';
    r.style.animationDelay  = (Math.random() * 8) + 's';
    r.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(r);
  }
}

function showClassSelect()   { showScreen('class-select-screen'); }
function showShardShop()     { openShardEmporium(); }
function showLoadoutSelect() { openLoadoutModal(); }
function showHowToPlay()     { openHowToPlay(); }

function filterClassGrid(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.class-card').forEach(card => {
    if (!q) { card.style.display = ''; return; }
    const name    = (card.querySelector('.class-name')?.textContent    || '').toLowerCase();
    const tagline = (card.querySelector('.class-tagline')?.textContent || '').toLowerCase();
    const element = card.dataset.element || '';
    card.style.display = (name.includes(q) || tagline.includes(q) || element.includes(q)) ? '' : 'none';
  });
}

function renderClassSelect() {
  const m = G.meta;
  const grid = document.getElementById('class-grid');
  grid.innerHTML = '';
  // Clear search on re-render
  const searchEl = document.getElementById('class-search');
  if (searchEl) searchEl.value = '';

  // Re-enable begin run if returning to screen with a valid selection
  const btn = document.getElementById('start-run-btn');
  if (btn && G.selectedClass && (m.unlockedClasses.includes(G.selectedClass) || (m.unlockedFusions||[]).includes(G.selectedClass))) {
    btn.disabled = false;
  }

  // Build combined list: base classes + unlocked fusions
  const allClasses = [...Object.values(CLASSES)];
  const unlockedFusions = m.unlockedFusions || [];
  const unlockedClasses = m.unlockedClasses || [];
  if (typeof FUSION_CLASSES !== 'undefined') {
    // Fusion-only IDs: in FUSION_CLASSES but NOT in CLASSES
    const fusionOnlyIds = Object.keys(FUSION_CLASSES).filter(id => !CLASSES[id]);
    // Add if unlocked via unlockedFusions OR unlockedClasses (abyssal/convergence/unnamed use unlockedClasses)
    fusionOnlyIds.forEach(fid => {
      if (unlockedFusions.includes(fid) || unlockedClasses.includes(fid)) {
        const fcls = FUSION_CLASSES[fid];
        if (fcls) allClasses.push({ ...fcls, _isFusion: true });
      }
    });
  }

  // Playable classes first, then locked ones (stable within each group)
  const playable = c => c._isFusion ? (unlockedFusions.includes(c.id) || unlockedClasses.includes(c.id)) : unlockedClasses.includes(c.id);
  allClasses.sort((a, b) => Number(playable(b)) - Number(playable(a)));

  allClasses.forEach(cls=>{
    const isFusion    = !!cls._isFusion;
    const unlockInfo  = CLASS_UNLOCK_COSTS[cls.id];
    const isUnlocked  = isFusion
      ? (unlockedFusions.includes(cls.id) || unlockedClasses.includes(cls.id))
      : unlockedClasses.includes(cls.id);
    const isConquestOnly = cls.conquestOnly;
    const hasConquered = m.conquestRewards?.conquered;
    const canAfford = !isUnlocked && !isConquestOnly && !isFusion && unlockInfo &&
      m.soulShards >= unlockInfo.shardCost && m.maxFloor >= unlockInfo.floor;
    const floorMet = unlockInfo ? m.maxFloor >= unlockInfo.floor : false;

    const elObj = ELEMENTS[cls.element] || null;
    const card = document.createElement('div');
    card.className = `class-card ${!isUnlocked ? 'locked' : ''} ${G.selectedClass===cls.id ? 'selected' : ''}`;
    card.style.setProperty('--class-color', cls.color);
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.dataset.element = cls.element || '';
    if (isUnlocked) { card.setAttribute('role', 'button'); card.tabIndex = 0; card.setAttribute('aria-label', `${cls.name} — ${cls.tagline || ''}`); }

    const statBars = Object.entries(cls.statDisplay||{}).map(([k,v])=>`
      <div style="display:flex;align-items:center;gap:4px;font-size:0.62rem;margin-bottom:2px">
        <span style="width:26px;color:var(--text-dim);flex-shrink:0">${k}</span>
        <div style="flex:1;height:4px;background:var(--border);border-radius:2px;min-width:0">
          <div style="width:${Math.min(100,v*10)}%;height:4px;background:${cls.color};border-radius:2px"></div>
        </div>
      </div>`).join('');

    // Build lock overlay content
    let lockOverlay = '';
    if (!isUnlocked) {
      let lockMsg = '';
      if (isFusion) {
        lockMsg = `<div style="font-weight:bold;margin-bottom:6px;font-size:0.75rem">⚗ Fusion Class</div>
          <div style="font-size:0.62rem;color:var(--text-dim);line-height:1.5">Unlock in the Fusion Lab<br>by maxing both parent classes.</div>`;
      } else if (isConquestOnly) {
        lockMsg = hasConquered
          ? `<div style="color:#9900ff;font-weight:bold;margin-bottom:4px">👑 Conquest Class</div><div style="font-size:0.6rem;color:var(--text-dim)">Available on class select screen (already unlocked by conquest)</div>`
          : `<div style="color:#9900ff;font-weight:bold;margin-bottom:6px">👑 Conquest Only</div><div style="font-size:0.62rem;color:var(--text-mid);line-height:1.4">Defeat the Abyssal God<br>on Floor 50 to unlock.</div>`;
      } else if (unlockInfo) {
        const shardOk = m.soulShards >= unlockInfo.shardCost;
        const floorOk = m.maxFloor >= unlockInfo.floor;
        lockMsg = `<div style="font-weight:bold;margin-bottom:6px;font-size:0.75rem">🔒 Locked</div>
          <div style="font-size:0.62rem;line-height:1.6">
            <div style="color:${shardOk?'#44ff88':'var(--text-dim)'}">${shardOk?'✓':'✗'} ${unlockInfo.shardCost} Soul Shards ${shardOk?`(have ${m.soulShards})`:`(have ${m.soulShards})`}</div>
            <div style="color:${floorOk?'#44ff88':'var(--text-dim)'}">${floorOk?'✓':'✗'} Reach Floor ${unlockInfo.floor} ${floorOk?'':'(best: '+m.maxFloor+')'}</div>
          </div>`;
        if (floorMet) {
          lockMsg += `<button class="title-btn primary" onclick="unlockClass('${cls.id}',event)" style="margin-top:8px;width:100%;font-size:0.7rem;padding:4px 8px" ${canAfford?'':'disabled'}>Unlock — ${unlockInfo.shardCost}⚗</button>`;
        }
      }
      lockOverlay = `<div class="class-lock-overlay" style="position:absolute;inset:0;background:rgba(8,6,14,0.88);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px;z-index:2;backdrop-filter:blur(2px)">${lockMsg}</div>`;
    }

    card.innerHTML = `
      <div class="class-icon">${cls.icon}</div>
      <div class="class-name">${cls.name}</div>
      ${elObj ? `<div style="color:${elObj.color};font-size:0.65rem;margin-bottom:2px">${elObj.icon} ${elObj.name}${elementFlavorText(cls)}</div>` : ''}
      <div class="class-tagline" style="font-size:0.65rem;color:var(--text-mid);font-style:italic;margin-bottom:6px;line-height:1.3">${cls.tagline}</div>
      <div class="class-stat-bars" style="margin-top:auto">${statBars}</div>
      ${lockOverlay}`;

    if (isUnlocked) {
      card.onclick = () => {
        G.selectedClass = cls.id;
        document.querySelectorAll('.class-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('start-run-btn').disabled = false;
        document.getElementById('selected-class-desc').innerHTML =
          `<strong>${cls.name}</strong>${cls._isFusion ? ' <span style="color:#aa44ff;font-size:0.7rem">⚗ Fusion</span>' : ''} — ${cls.description || cls.tagline || ''}<br>
          <span style="font-size:0.65rem;color:var(--text-dim);font-style:italic">${cls.lore || ''}</span>`;
      };
    }
    grid.appendChild(card);
  });
}

function unlockClass(id, event) {
  event.stopPropagation();
  const info = CLASS_UNLOCK_COSTS[id];
  if (!info||G.meta.unlockedClasses.includes(id)) return;
  if (G.meta.soulShards < info.shardCost||G.meta.maxFloor < info.floor) return;
  G.meta.soulShards -= info.shardCost;
  G.meta.unlockedClasses.push(id);
  saveMeta();
  renderClassSelect();
}

function selectLoadout(id) {
  G.meta.selectedLoadout = id;
  document.querySelectorAll('.loadout-btn').forEach(b=>b.classList.remove('active'));
  const el = document.querySelector(`.loadout-btn[data-id="${id}"]`);
  if (el) el.classList.add('active');
}

// ── Game Over ─────────────────────────────────────────────────
function gameOver() {
  // Can be reached from several places in the same frame (combat end, UI
  // refresh) — the run only ends, and pays out, once.
  if (G._gameOverShown || !G.player) return;
  G._gameOverShown = true;
  G.inCombat = false;
  G.phase = 'gameover';
  // Run is over — clear the save slot so it doesn't show as continuable
  clearActiveRunSave();
  _updateContinueBtn();
  const p           = G.player;
  const floorReached = G.floor;
  sfx('death');
  const shards = Math.max(1, Math.round(floorReached * 1.5 + (p.level - 1) * 2));
  G.meta.soulShards += shards;
  saveMeta();

  // ── Basic stats ───────────────────────────────────────────
  document.getElementById('game-over-floor').textContent  = floorReached;
  document.getElementById('game-over-level').textContent  = p?.level || 1;
  document.getElementById('game-over-shards').textContent = shards;
  document.getElementById('game-over-best').textContent   = G.meta.maxFloor;

  // ── Class identity block ──────────────────────────────────
  const classId  = p.classId;
  const cls      = getClassData(classId);
  const elData   = cls ? (ELEMENTS[cls.element] || null) : null;
  const clsColor = cls?.color || 'var(--text-mid)';

  const iconEl = document.getElementById('death-class-icon');
  const nameEl = document.getElementById('death-class-name');
  const elemEl = document.getElementById('death-class-element');
  const block  = document.getElementById('death-class-block');

  if (cls) {
    iconEl.textContent = cls.icon || '⚔';
    iconEl.style.textShadow = `0 0 24px ${clsColor}`;
    nameEl.textContent  = cls.name;
    nameEl.style.color  = clsColor;
    elemEl.innerHTML    = elData
      ? `<span style="color:${elData.color}">${elData.icon} ${elData.name}</span>` : '';
    block.style.setProperty('--cls-color', clsColor);
  }

  // ── Death quote pool ──────────────────────────────────────
  const quotes = [
    '"The abyss reclaimed you."',
    '"Another name carved into the dark."',
    '"The descent continues — without you."',
    '"You were so close. You were not close enough."',
    '"The floor remembers every hero. None of them made it either."',
    '"Darkness does not mourn."',
    '"The abyss has seen stronger."',
    '"It will be waiting when you return."',
  ];
  document.getElementById('death-quote').textContent =
    quotes[Math.floor(Math.random() * quotes.length)];

  // ── Class level progress ──────────────────────────────────
  const classLevel = (G.meta.classLevels?.[classId] || 1);
  const classXP    = (G.meta.classXP?.[classId]     || 0);
  const maxLevel   = 20;
  const atMax      = classLevel >= maxLevel;
  const xpNeeded   = atMax ? 0 : classXpForLevel(classLevel);
  const xpPct      = atMax ? 100 : Math.min(100, (classXP / xpNeeded) * 100);
  const rarity     = (typeof CLASS_RARITY !== 'undefined' && classId)
    ? (CLASS_RARITY[classId] || 'common') : 'common';
  const rarityColor = (typeof RARITY !== 'undefined')
    ? (RARITY[rarity]?.color || clsColor) : clsColor;

  document.getElementById('death-clvl-label').textContent =
    cls ? `${cls.name} — Class Level` : 'Class Level';
  document.getElementById('death-clvl-val').textContent =
    atMax ? `${maxLevel} ★ MAX` : `${classLevel} / ${maxLevel}`;
  document.getElementById('death-clvl-val').style.color = rarityColor;

  const bar = document.getElementById('death-clvl-bar');
  bar.style.width      = xpPct + '%';
  bar.style.background = rarityColor;

  document.getElementById('death-clvl-xp').textContent = atMax
    ? 'Class mastered — ready to fuse!'
    : `${classXP} / ${xpNeeded} XP to level ${classLevel + 1}`;

  // Fusion hint
  const hintEl = document.getElementById('death-clvl-hint');
  if (atMax) {
    hintEl.innerHTML = `<button class="title-btn fusion-lab-btn" style="margin-top:0.4rem;width:100%" onclick="openFusionModal()">⚗ Fuse Now</button>`;
  } else {
    // Estimate from what this run actually earned
    const perRun  = Math.max(1, p._classXpGained || (10 + G.floor * 2));
    const runsEst = Math.max(1, Math.ceil((xpNeeded - classXP) / perRun));
    hintEl.textContent = `+${p._classXpGained || 0} class XP this run · ~${runsEst} more run${runsEst > 1 ? 's' : ''} like this to reach level ${classLevel + 1}`;
    hintEl.style.color = 'var(--text-dim)';
  }

  showScreen('game-over-screen');
}

// ── Win (cleared floor 50) ────────────────────────────────────
function winGame() {
  triggerConquestReward();
}

// ── In-game menu (pause) ──────────────────────────────────────
function showPauseMenu() {
  let html = `<div class="modal-title">⏸ Paused</div>
    ${G.seed ? `<div style="text-align:center;font-size:0.7rem;color:var(--text-dim)">Floor ${G.floor} · Seed <span style="color:var(--text-mid);user-select:all">${G.seed}</span></div>` : ''}
    <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:0.5rem">
      <button class="title-btn" style="min-width:0;max-width:100%;font-size:0.8rem;padding:0.5rem 1rem" onclick="closeModal()">Resume</button>
      <button class="title-btn" style="min-width:0;max-width:100%;font-size:0.8rem;padding:0.5rem 1rem" onclick="closeModal();showTalentTree()">🌟 Talents${G.player?.talentPoints?` (${G.player.talentPoints})`:''}</button>
      <button class="title-btn" style="min-width:0;max-width:100%;font-size:0.8rem;padding:0.5rem 1rem" onclick="closeModal();openSettings()">⚙ Settings</button>
      ${G.inCombat ? '' : `<button class="title-btn" style="min-width:0;max-width:100%;font-size:0.8rem;padding:0.5rem 1rem" onclick="closeModal();saveAndQuit()">💾 Save &amp; Quit to Title</button>`}
      <button class="title-btn danger" style="min-width:0;max-width:100%;font-size:0.8rem;padding:0.5rem 1rem" onclick="closeModal();confirmAbandon()">↩ Abandon Run</button>
    </div>`;
  showModal(html);
}

function confirmAbandon() {
  let html = `<div class="modal-title">Abandon Run?</div>
    <div style="color:var(--text-mid);font-size:0.8rem;margin:0.5rem 0">You will lose all progress. Soul Shards earned this run will be saved.</div>
    <div style="display:flex;gap:0.5rem;margin-top:0.5rem">
      <button class="title-btn danger" style="flex:1;min-width:0;font-size:0.8rem;padding:0.5rem 0.75rem" onclick="abandonRun()">Abandon</button>
      <button class="title-btn" style="flex:1;min-width:0;font-size:0.8rem;padding:0.5rem 0.75rem" onclick="closeModal()">Cancel</button>
    </div>`;
  showModal(html, false);
}

function abandonRun() {
  if (G.player && !G._gameOverShown) {
    const shards = Math.max(0, Math.round(G.floor * 1.5));
    G.meta.soulShards += shards;
    saveMeta();
  }
  // An abandoned run is over: its save must not stay continuable
  clearActiveRunSave();
  resetRunState();
  G.phase = 'title';
  document.getElementById('overlay').classList.remove('active');
  showScreen('title-screen');
}

function saveAndQuit() {
  if (!G.player || G.inCombat) return;
  if (G._runSaveSlot === null || G._runSaveSlot === undefined) { showSaveSlotPicker(true); return; }
  saveRun();
  returnToTitle();
}

// ── Settings screen ───────────────────────────────────────────
function renderSettingsScreen() {
  // Themes
  const themeGrid = document.getElementById('theme-grid');
  if (themeGrid) {
    themeGrid.innerHTML = '';
    ['default','emerald','bone','void','blood'].forEach(t=>{
      const btn=document.createElement('div');
      btn.className=`theme-swatch ${S.theme===t?'active':''}`;
      btn.dataset.theme=t;
      btn.textContent=t.charAt(0).toUpperCase()+t.slice(1);
      btn.onclick=()=>applySetting('theme',t);
      themeGrid.appendChild(btn);
    });
  }
  // Loadouts
  const loGrid = document.getElementById('loadout-grid');
  if (loGrid) {
    loGrid.innerHTML = LOADOUTS.map(lo=>`
      <button class="loadout-btn ${G.meta.selectedLoadout===lo.id?'active':''}" data-id="${lo.id}"
        onclick="selectLoadout('${lo.id}')">
        <span>${lo.icon} ${lo.name}</span>
        <span style="font-size:0.65rem;color:var(--text-dim)">${lo.desc}</span>
        ${lo.cost>0?`<span style="font-size:0.65rem;color:var(--accent-violet-bright)">${lo.cost}⚗/run</span>`:''}
      </button>`).join('');
  }
  syncSettingsUI();
}
