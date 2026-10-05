// ══════════════════════════════════════════════════════════════
// MAIN  (js/main.js)
//
// Entry point. init() called from index.html on load.
//
// GLOBAL STATE: G (defined in state.js)
//   G.player, G.enemy/G.enemies, G.map, G.floor, G.phase, G.inCombat, G.turn
//   G.meta — persistent data saved to localStorage (see saveMeta/loadMeta in utils.js)
//   G.worldGen — { roomCount, difficulty, enemyDensity, treasureRate, mapSize }
//   G.selectedClass — classId chosen on class select screen
//   G.log — combat log entries array (max 100, newest first)
//
// SCREEN FLOW:
//   init() → title-screen → class-select-screen → [world gen modal] → game-screen
//   game-screen → game-over-screen → title-screen or class-select-screen
//
// startRun() — async: fusion classes need their data file loaded before
//   createPlayer() (ensureClassLoaded in run_save.js).
//
// KEYBOARD (handleKeyDown) — only on the game screen, never while a dialog is open:
//   1-9          — ability slots
//   Q / E / R / F — attack / defend / item / flee
//   Space        — burst
//   Arrows/WASD  — movement (exploration only)
//   M            — toggle the minimap
//   X            — auto-explore
//   1–9 (dialog) — pick that choice in an event or boss reward
//   Escape       — close a closeable dialog, otherwise open the pause menu
// ══════════════════════════════════════════════════════════════

function init() {
  loadMeta();
  loadSettings();
  applyAllSettings();
  showScreen('title-screen');
  // Load the big generated ability file in the background (abilities.js)
  ensureAbilitiesLoaded().catch(err => console.warn(err));
  document.addEventListener('keydown', handleKeyDown);
  // Web app manifest (add to home screen). Only over http(s): browsers refuse
  // to fetch it from a file:// page and log an error.
  if (/^https?:$/.test(location.protocol)) {
    const link = Object.assign(document.createElement('link'), { rel: 'manifest', href: 'manifest.webmanifest' });
    document.head.appendChild(link);
  }
  window.addEventListener('resize', () => { if (isScreenActive('game-screen')) renderCenterPanel(); });
  // Tooltips: hover, keyboard focus or long press (render.js)
  initTooltips();
  // Save on tab close / hide so progress since the last fight isn't lost
  const flushSave = () => { if (G.player && !G.inCombat) autoSaveRun(); };
  window.addEventListener('pagehide', flushSave);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { flushSave(); flushPlayClock(false); } // the play clock pauses while hidden
    else if (G.player && isScreenActive('game-screen') && !G._gameOverShown) startPlayClock();
  });
}

function isScreenActive(id) {
  const el = document.getElementById(id);
  return !!(el && el.classList.contains('active'));
}

function isModalOpen() {
  return document.getElementById('overlay').classList.contains('active');
}

// resetRunState — clears everything that belongs to a single run
function resetRunState() {
  G.player     = null;
  G.enemy      = null;
  G.map        = null;
  G.floor      = 1;
  G.inCombat   = false;
  G.killedBoss = false;
  G.phase      = 'explore';
  G.turn       = 'player';
  G.combatRound = 0;
  G.log        = [];
  _lastLogLength = -1;
  G._currentEvent = null;
  G._rewardChoices = null;
  G._resume = null;
  G._pendingSecretBoss = null;
  G._secretBossCell = null;
  G._secretBossTriggeredThisRun = false;
  G._gameOverShown = false;
  G._saveFailWarned = false;
  G._biomeProcs = 0;
  G._biomeMoves = 0;
  G.seed       = null;
  G.daily      = null;
  G.rngState   = null; // outside a run, rand() uses Math.random
  _playClockStart = null;
}

// ── Daily Descent ────────────────────────────────────────────
// Everyone gets the same seed on the same (local) day, with standard world
// settings and any class. The best depth per day is kept in G.meta.daily.
function todayKey(d = new Date()) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}
function dailySeed(key = todayKey()) { return 'DAILY' + key; }
function startDailyDescent() { G._dailyMode = true; showScreen('class-select-screen'); }

function startRun() {
  if (!G.selectedClass) return;
  const classId = G.selectedClass;
  const daily = G._dailyMode ? todayKey() : null;
  const begin = async () => {
    const seed = daily ? dailySeed(daily) : G._pendingSeed;
    resetRunState();
    G.selectedClass = classId;
    G.daily = daily;
    seedRun(seed);
    G._pendingSeed = null;
    try {
      if (!window.ABILITIES_GENERATED_LOADED) {
        showModal('<div class="modal-title">Preparing the descent…</div><div style="text-align:center;color:var(--text-dim)">Loading abilities</div>', false);
        await ensureAbilitiesLoaded();
        closeModal();
      }
      await ensureClassLoaded(classId);
      G.player = createPlayer(classId);
    } catch (err) {
      console.error(err);
      showModal(`<div class="modal-title" style="color:var(--accent-crimson)">Could not start the run</div>
        <div style="text-align:center;color:var(--text-mid);margin:1rem 0">The data for this class failed to load. Try reloading the page.</div>
        <button class="title-btn" style="width:100%" onclick="closeModal()">OK</button>`);
      return;
    }
    assignRunSlot();
    applyLoadout(G.player);
    G.map = generateMap(G.floor);
    applyBiomeTheme(G.floor);

    if (runNgPlus() > 0) {
      logEntry('system', `▶ NG+ Cycle ${runNgPlus()} — Enemies are ${Math.round(getNgPlusMult()*100)}% as strong as normal.`);
    }
    const biome = getBiomeForFloor(G.floor);
    logEntry('system', `══ Abyssal Descent: Floor ${G.floor} ══`);
    logEntry('system', `You descend as the ${G.player.name}. (Seed ${G.seed})`);
    logEntry('system', `🗺 Entering ${biome.name}.`);

    if (daily) logEntry('system', `📅 Daily Descent for ${daily.slice(0, 4)}-${daily.slice(4, 6)}-${daily.slice(6)}: everyone plays these floors today.`);
    showScreen('game-screen');
    startPlayClock();
    autoSaveRun();
    updateUI();
  };
  if (daily) {
    // Standard settings so every daily run is comparable
    G.worldGen = { roomCount:'normal', difficulty:'normal', enemyDensity:'normal', treasureRate:'normal', mapSize:'normal' };
    begin();
  } else {
    showWorldGenModal(begin);
  }
}

const MOVE_KEYS = {
  arrowup:[0,-1], arrowdown:[0,1], arrowleft:[-1,0], arrowright:[1,0],
  w:[0,-1], s:[0,1], a:[-1,0], d:[1,0],
};

function handleKeyDown(e) {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  // Keyboard activation for clickable cards (role="button" divs)
  if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.getAttribute && e.target.getAttribute('role') === 'button' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
    e.target.click();
    return;
  }
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();

  if (key === 'escape') {
    if (isModalOpen()) {
      // Only dialogs with a ✕ can be dismissed (events, rewards etc. need a choice)
      if (document.querySelector('#overlay-content .modal-close-btn')) closeModal();
    } else if (isScreenActive('game-screen') && G.player) {
      showPauseMenu();
    }
    return;
  }

  // Number keys pick a numbered choice in a dialog (events, boss rewards)
  if (isModalOpen() && /^[1-9]$/.test(key)) {
    const choice = document.querySelector(`#overlay-content [data-key="${key}"]`);
    if (choice) { e.preventDefault(); choice.click(); }
    return;
  }

  if (!isScreenActive('game-screen') || !G.player || isModalOpen()) return;

  if (G.inCombat) {
    if (G.turn !== 'player') return;
    if (/^[1-9]$/.test(key)) {
      const abId = G.player.abilities[Number(key) - 1];
      if (abId) { e.preventDefault(); playerAction('ability', abId); }
      return;
    }
    const actions = { q:'attack', e:'defend', r:'item', f:'flee', ' ':'burst' };
    if (actions[key]) { e.preventDefault(); playerAction(actions[key]); }
    return;
  }

  if (key === 'm') { e.preventDefault(); toggleMinimap(); return; }
  if (key === 'x' && G.phase === 'explore') { e.preventDefault(); autoExplore(); return; }

  if (G.phase === 'explore' && MOVE_KEYS[key]) {
    e.preventDefault();
    cancelWalk();
    movePlayer(MOVE_KEYS[key][0], MOVE_KEYS[key][1]);
  }
}

// ── Public actions wired in HTML ──────────────────────────────
function openTalentTree()     { showTalentTree(); }
function openShardEmporium()  { showShardEmporium(); }
function openSettings()       {
  G._prevScreen = document.querySelector('.screen.active')?.id || 'title-screen';
  showScreen('settings-screen');
}
function returnFromSettings() {
  const prev = G._prevScreen || 'title-screen';
  G._prevScreen = null;
  showScreen(prev);
}
function returnToTitle() {
  if (G.player && isScreenActive('game-screen')) autoSaveRun();
  resetRunState();
  G.phase = 'title';
  showScreen('title-screen');
}
function newRun()   { resetRunState(); G.phase = 'title'; G.selectedClass = null; showScreen('class-select-screen'); }
function retryRun() { newRun(); }
