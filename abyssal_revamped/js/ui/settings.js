// ══════════════════════════════════════════════════════════════
// SETTINGS  (js/ui/settings.js)
//
// S — the settings object, saved to localStorage 'abyssal_settings'.
// applySetting(key, value)  — changes one setting from the Settings screen
// applyAllSettings()        — applies every saved setting (called at boot)
// syncSettingsUI()          — updates the Settings screen controls to match S
// ══════════════════════════════════════════════════════════════

const S = {
  fontSize:    3,
  mapSize:     2,
  logSize:     'medium',
  theme:       'default',
  dmgNumbers:  true,
  animSpeed:   'normal',
  reduceMotion:false,
  screenShake: true,
  masterVol:   80,
};

const FONT_SIZE_LABELS = ['Tiny','Small','Normal','Large','Huge'];
const MAP_SIZE_LABELS  = ['Small','Medium','Large'];
const FONT_SIZES       = ['0.65rem','0.72rem','0.78rem','0.88rem','1.0rem'];
const MAP_CELL_SIZES   = ['20px','26px','32px'];
const LOG_HEIGHTS      = { small:'100px', medium:'160px', large:'260px' };
const ANIM_DELAYS      = { slow:1200, normal:600, fast:300, instant:50 };

// _applyEffect — makes a setting take effect (no saving, no control syncing)
function _applyEffect(key) {
  const root = document.documentElement.style;
  switch (key) {
    case 'fontSize':     root.setProperty('--ui-font-size', FONT_SIZES[S.fontSize - 1] || FONT_SIZES[2]); break;
    case 'mapSize':      root.setProperty('--map-cell-size', MAP_CELL_SIZES[S.mapSize - 1] || MAP_CELL_SIZES[1]); break;
    case 'logSize':      root.setProperty('--log-height', LOG_HEIGHTS[S.logSize] || LOG_HEIGHTS.medium); break;
    case 'theme':        applyTheme(S.theme); break;
    case 'animSpeed':    G._enemyTurnDelay = ANIM_DELAYS[S.animSpeed] || 600; break;
    case 'reduceMotion': document.body.classList.toggle('reduce-motion', !!S.reduceMotion); break;
  }
}

function applySetting(key, value) {
  switch (key) {
    case 'fontSize': case 'mapSize': case 'masterVol': S[key] = +value; break;
    case 'dmgNumbers': case 'reduceMotion': case 'screenShake': S[key] = !!value; break;
    default: S[key] = value;
  }
  _applyEffect(key);
  if (key === 'mapSize' && G.player && document.getElementById('game-screen').classList.contains('active')) renderCenterPanel();
  syncSettingsUI();
  saveSettings();
}

function applyAllSettings() {
  ['fontSize','mapSize','logSize','theme','animSpeed','reduceMotion'].forEach(_applyEffect);
}

function applyTheme(theme) {
  const r = document.documentElement.style;
  const themes = {
    default: {},
    emerald: { '--accent-gold':'#3aaa3a','--accent-gold-dim':'#1a6a1a','--accent-crimson':'#1a6b1a','--accent-violet':'#1a6b6b' },
    bone:    { '--accent-gold':'#b8a060','--accent-gold-dim':'#7a6030','--accent-crimson':'#6a4a2a','--accent-violet':'#5a5050' },
    void:    { '--accent-gold':'#4466cc','--accent-gold-dim':'#223366','--accent-crimson':'#223366','--accent-violet':'#1a1a6b' },
    blood:   { '--accent-gold':'#cc2222','--accent-gold-dim':'#6a0000','--accent-crimson':'#880000','--accent-violet':'#4a0000' },
  };
  const vars = themes[theme] || themes.default;
  ['--accent-gold','--accent-gold-dim','--accent-crimson','--accent-violet'].forEach(v=>r.removeProperty(v));
  Object.entries(vars).forEach(([k,v])=>r.setProperty(k,v));
}

function saveSettings() {
  try { localStorage.setItem('abyssal_settings', JSON.stringify(S)); } catch(e){}
}

function loadSettings() {
  try {
    const d = localStorage.getItem('abyssal_settings');
    if (d) Object.assign(S, JSON.parse(d));
  } catch(e){}
}

function syncSettingsUI() {
  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };
  set('s-font-size',      el => { el.value = S.fontSize; });
  set('s-font-size-val',  el => { el.textContent = FONT_SIZE_LABELS[S.fontSize-1]; });
  set('s-map-size',       el => { el.value = S.mapSize; });
  set('s-map-size-val',   el => { el.textContent = MAP_SIZE_LABELS[S.mapSize-1]; });
  set('s-dmg-numbers',    el => { el.checked = S.dmgNumbers; });
  set('s-reduce-motion',  el => { el.checked = S.reduceMotion; });
  set('s-screenshake',    el => { el.checked = S.screenShake; });
  set('s-master-vol',     el => { el.value = S.masterVol; });
  set('s-master-vol-val', el => { el.textContent = S.masterVol + '%'; });
  document.querySelectorAll('#s-log-size .seg-btn').forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === S.logSize));
  document.querySelectorAll('#s-anim-speed .seg-btn').forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === S.animSpeed));
  document.querySelectorAll('.theme-swatch').forEach(s => s.classList.toggle('active', s.dataset.theme === S.theme));
}

// resetAllSaveData — removes only this game's keys (other pages served from
// the same file:// origin can share localStorage).
function resetAllSaveData() {
  Object.keys(localStorage).filter(k => k.startsWith('abyssal_')).forEach(k => localStorage.removeItem(k));
  location.reload();
}

function confirmResetAllSaveData() {
  showModal(`<div class="modal-title" style="color:var(--accent-crimson)">Reset all save data?</div>
    <div style="text-align:center;color:var(--text-mid);margin:1rem 0;line-height:1.6">
      This deletes your Soul Shards, unlocked classes, fusions, class levels, settings and every saved run.<br>
      <strong>This cannot be undone.</strong>
    </div>
    <div style="display:flex;gap:0.5rem">
      <button class="title-btn" style="flex:1;min-width:0" onclick="closeModal()">Cancel</button>
      <button class="title-btn danger" style="flex:1;min-width:0" onclick="resetAllSaveData()">Delete everything</button>
    </div>`, true);
}
