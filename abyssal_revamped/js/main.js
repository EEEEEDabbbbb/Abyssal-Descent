// ══════════════════════════════════════════════════════════════
// MAIN  (js/main.js)
//
// Entry point. init() called from index.html onload.
//
// GLOBAL STATE: G (defined in state.js)
//   G.player, G.enemy, G.map, G.floor, G.phase, G.inCombat, G.turn
//   G.meta — persistent data saved to localStorage (see saveMeta/loadMeta in utils.js)
//   G.worldGen — { roomCount, difficulty, enemyDensity, treasureRate, mapSize }
//   G.selectedClass — classId chosen on class select screen
//   G.log — combat log entries array (max 100, newest first)
//
// SCREEN FLOW:
//   init() → title-screen → class-select-screen → [world gen modal] → game-screen
//   game-screen → game-over-screen → title-screen or class-select-screen
//
// startRun() — async! Fusion classes need their data file loaded before createPlayer().
//   If G.selectedClass is NOT in CLASSES (i.e. it's a fusion), awaits loadFusionFile(n)
//   for all files that could contain that class (via FUSION_FILE_LOOKUP).
//   ⚠️ If you make startRun synchronous again, fusion class stats will be NaN.
//
// KEYBOARD SHORTCUTS (handleKeyDown):
//   1-5     — ability slots
//   Q       — attack
//   E       — defend
//   R       — open item menu
//   F       — flee
//   Space   — burst
//   Arrows/WASD — movement (explore phase only, handled in second keydown listener)
//   Escape  — close modal or open pause menu
//
// PUBLIC FUNCTIONS wired to HTML buttons (onclick):
//   openTalentTree, openShardEmporium, openSettings, returnFromSettings
//   returnToTitle, newRun, retryRun, showClassSelect, showContinue
// ══════════════════════════════════════════════════════════════

function init() {
  loadMeta();
  loadSettings();
  showScreen('title-screen');
  // Keyboard movement
  document.addEventListener('keydown', handleKeyDown);
  // Scroll map viewport with arrow keys
  document.addEventListener('keydown', e => {
    if (G.phase==='explore'&&!G.inCombat) {
      const map={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],
                 w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
      const dir=map[e.key];
      if(dir){e.preventDefault();movePlayer(dir[0],dir[1]);}
    }
    if (e.key==='Escape') {
      const overlay=document.getElementById('overlay');
      if(overlay.classList.contains('active')) closeModal();
      else if(G.phase!=='title'&&G.player) showPauseMenu();
    }
  });
  console.log('Abyssal Descent v2.0 — Pass 4 — Initialized');
}

function startRun() {
  if (!G.selectedClass) return;
  showWorldGenModal(async () => {
    G.floor     = 1;
    G.map       = null;
    G.inCombat  = false;
    G.killedBoss= false;
    G.phase     = 'explore';
    G.turn      = 'player';
    G.log       = [];
    _lastLogLength = 0;
    G.enemy     = null;
    G._currentEvent = null;

    // If selected class is a fusion, ensure its data file is loaded before createPlayer
    if (!CLASSES[G.selectedClass] && typeof FUSION_FILE_LOOKUP !== 'undefined') {
      const fileNums = new Set();
      for (const [key, fileNum] of Object.entries(FUSION_FILE_LOOKUP)) {
        if (key.split('+').includes(G.selectedClass)) fileNums.add(fileNum);
      }
      await Promise.all([...fileNums].map(n => loadFusionFile(n)));
    }

    G.player = createPlayer(G.selectedClass);
    applyLoadout(G.player);
    G.map = generateMap(G.floor);

    if (G.meta.ngPlus > 0) {
      logEntry('system', `▶ NG+ Cycle ${G.meta.ngPlus} — Enemies are ${Math.round((1+G.meta.ngPlus*0.3)*100)}% stronger.`);
    }
    const tier = getFloorTier(G.floor);
    logEntry('system', `══ Abyssal Descent: Floor ${G.floor} ══`);
    logEntry('system', `You descend as the ${G.player.name}.`);

    showScreen('game-screen');
    updateUI();
  });
}

function handleKeyDown(e) {
  // Abilities 1-5 (classes now have up to 5 active abilities)
  if (G.inCombat && G.turn==='player' && !e.ctrlKey && !e.altKey) {
    const keys = {'1':0,'2':1,'3':2,'4':3,'5':4};
    if (e.key in keys && G.player.abilities[keys[e.key]]) {
      e.preventDefault();
      playerAction('ability', G.player.abilities[keys[e.key]]);
      return;
    }
    if (e.key==='q'||e.key==='Q') { e.preventDefault(); playerAction('attack');  return; }
    if (e.key==='e'||e.key==='E') { e.preventDefault(); playerAction('defend');  return; }
    if (e.key==='r'||e.key==='R') { e.preventDefault(); playerAction('item');    return; }
    if (e.key==='f'||e.key==='F') { e.preventDefault(); playerAction('flee');    return; }
    if (e.key===' ')              { e.preventDefault(); playerAction('burst');   return; }
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
function returnToTitle()      { G.player = null; G.enemy = null; G.inCombat = false; showScreen('title-screen'); }
function newRun()             { G.selectedClass=null; showScreen('class-select-screen'); }
function retryRun()           { G.selectedClass=null; showScreen('class-select-screen'); }
