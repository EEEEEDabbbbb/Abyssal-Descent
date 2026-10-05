// ══════════════════════════════════════════════════════════════
// SETTINGS
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

function applySetting(key, value) {
  switch(key) {
    case 'fontSize': {
      S.fontSize = +value;
      document.getElementById('s-font-size-val').textContent = FONT_SIZE_LABELS[+value-1];
      const sizes = ['0.65rem','0.72rem','0.78rem','0.88rem','1.0rem'];
      document.documentElement.style.setProperty('--ui-font-size', sizes[+value-1]);
      break;
    }
    case 'mapSize': {
      S.mapSize = +value;
      document.getElementById('s-map-size-val').textContent = MAP_SIZE_LABELS[+value-1];
      const cellSizes = ['20px','26px','32px'];
      document.documentElement.style.setProperty('--map-cell-size', cellSizes[+value-1]);
      break;
    }
    case 'logSize': {
      S.logSize = value;
      document.querySelectorAll('#s-log-size .seg-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('#s-log-size .seg-btn').forEach(b=>{ if(b.textContent.toLowerCase()===value) b.classList.add('active'); });
      const heights = { small:'100px', medium:'160px', large:'260px' };
      document.documentElement.style.setProperty('--log-height', heights[value]||'160px');
      break;
    }
    case 'theme': {
      S.theme = value;
      document.querySelectorAll('.theme-swatch').forEach(s=>s.classList.toggle('active',s.dataset.theme===value));
      applyTheme(value);
      break;
    }
    case 'dmgNumbers':   S.dmgNumbers   = !!value; document.getElementById('s-dmg-numbers').checked=!!value; break;
    case 'animSpeed': {
      S.animSpeed = value;
      document.querySelectorAll('#s-anim-speed .seg-btn').forEach(b=>b.classList.toggle('active',b.textContent.toLowerCase()===value));
      G._enemyTurnDelay = {slow:1200,normal:600,fast:300,instant:50}[value]||600;
      break;
    }
    case 'reduceMotion': S.reduceMotion=!!value; document.body.classList.toggle('reduce-motion',!!value); break;
    case 'screenShake':  S.screenShake=!!value; break;
    case 'masterVol':    S.masterVol=+value; document.getElementById('s-master-vol-val').textContent=value+'%'; break;
  }
  saveSettings();
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
  // Reset to default first
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
  G._enemyTurnDelay = {slow:1200,normal:600,fast:300,instant:50}[S.animSpeed]||600;
}

function syncSettingsUI() {
  try {
    document.getElementById('s-font-size').value = S.fontSize;
    document.getElementById('s-font-size-val').textContent = FONT_SIZE_LABELS[S.fontSize-1];
    document.getElementById('s-map-size').value  = S.mapSize;
    document.getElementById('s-map-size-val').textContent  = MAP_SIZE_LABELS[S.mapSize-1];
    document.getElementById('s-dmg-numbers').checked  = S.dmgNumbers;
    document.getElementById('s-reduce-motion').checked = S.reduceMotion;
    document.getElementById('s-screenshake').checked   = S.screenShake;
    document.getElementById('s-master-vol').value      = S.masterVol;
    document.getElementById('s-master-vol-val').textContent = S.masterVol+'%';
    applySetting('logSize',   S.logSize);
    applySetting('animSpeed', S.animSpeed);
    applySetting('theme',     S.theme);
    if (S.reduceMotion) document.body.classList.add('reduce-motion');
  } catch(e){}
}
