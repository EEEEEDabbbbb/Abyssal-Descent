// ══════════════════════════════════════════════════════════════
// RECORDS  (js/engine/records.js)
//
// RUN STATS — G.player.runStats, saved with the run:
//   kills, bosses, packs, dmgDealt, dmgTaken, bestHit, crits, fled, chests,
//   events, steps, shards (all Soul Shards earned this run), playMs
//   trackStat(key, n) / trackBest(key, v) update them; both are no-ops
//   outside a run. awardShards(n) adds shards to G.meta AND the run total.
//
// RUN HISTORY — G.meta.runHistory: the last 20 finished runs (newest first),
//   written by recordRunEnd() from gameOver / abandonRun / the conquest.
// LIFETIME — G.meta.lifetime: totals across every run.
//
// ACHIEVEMENTS — ACHIEVEMENTS below; unlockAchievement(id) records one in
//   G.meta.achievements ({ id: timestamp }), pays its shards once and shows
//   a toast. checkAchievements() re-tests the "state" ones (depth, gold,
//   classes…) and is cheap enough to call after any milestone.
// ══════════════════════════════════════════════════════════════

const RUN_HISTORY_MAX = 20;

function newRunStats() {
  return { kills:0, bosses:0, packs:0, dmgDealt:0, dmgTaken:0, bestHit:0, crits:0,
           fled:0, chests:0, events:0, steps:0, shards:0, playMs:0 };
}

function runStats() {
  const p = G.player;
  if (!p) return null;
  if (!p.runStats) p.runStats = newRunStats();
  return p.runStats;
}

function trackStat(key, n = 1) {
  const s = runStats();
  if (s && n) s[key] = (s[key] || 0) + n;
}

function trackBest(key, v) {
  const s = runStats();
  if (s && v > (s[key] || 0)) s[key] = v;
}

// awardShards — every in-run shard reward goes through here so the run total
// on the death screen and in the history is complete. Harder world settings
// pay more (getShardRewardMult); pass fixed=true for set amounts (achievements).
function getShardRewardMult() {
  return { normal: 1, hard: 1.25, nightmare: 1.5 }[(G.worldGen || {}).difficulty] || 1;
}
function awardShards(n, fixed = false) {
  if (!n) return 0;
  const amount = fixed ? n : Math.round(n * getShardRewardMult());
  G.meta.soulShards += amount;
  trackStat('shards', amount);
  return amount;
}

// ── Play clock ─────────────────────────────────────────────────
// Counts time with the game screen visible; paused while the tab is hidden.
let _playClockStart = null;
function startPlayClock() { _playClockStart = Date.now(); }
function flushPlayClock(keepRunning = true) {
  const s = runStats();
  if (s && _playClockStart) s.playMs += Date.now() - _playClockStart;
  _playClockStart = keepRunning && s ? Date.now() : null;
}

function formatPlayTime(ms) {
  const m = Math.round((ms || 0) / 60000);
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h ${m % 60}m`;
}

// ── Run end ────────────────────────────────────────────────────
// outcome: 'died' | 'abandoned' | 'conquered'
function recordRunEnd(outcome) {
  const p = G.player;
  if (!p || p._runRecorded) return null;
  p._runRecorded = true;
  flushPlayClock(false);
  const s = runStats();
  const cls = getClassData(p.classId);
  const entry = {
    at: Date.now(), outcome,
    classId: p.classId, className: cls ? cls.name : p.classId, icon: cls ? cls.icon : '⚔',
    floor: G.floor, level: p.level, seed: G.seed || null, ngPlus: runNgPlus(), daily: G.daily || null,
    killedBy: outcome === 'died' ? (p._lastHitBy || 'the Abyss') : null,
    kills: s.kills, bosses: s.bosses, shards: s.shards, playMs: s.playMs, bestHit: s.bestHit,
  };
  const m = G.meta;
  m.runHistory = [entry, ...(m.runHistory || [])].slice(0, RUN_HISTORY_MAX);
  const L = m.lifetime = { ...defaultMeta().lifetime, ...(m.lifetime || {}) };
  L.runs++;
  if (outcome === 'died') L.deaths++;
  if (outcome === 'conquered') L.conquests++;
  L.kills += s.kills; L.bosses += s.bosses; L.shards += s.shards; L.playMs += s.playMs;
  L.dmgDealt += s.dmgDealt;
  L.bestHit = Math.max(L.bestHit, s.bestHit);
  if (G.daily) {
    if (!m.daily || m.daily.key !== G.daily) m.daily = { key: G.daily, best: 0, runs: 0 };
    m.daily.best = Math.max(m.daily.best, G.floor);
    m.daily.runs++;
  }
  saveMeta();
  return entry;
}

// ── Achievements ───────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id:'first_blood',   icon:'🗡️', name:'First Blood',        shards:5,   desc:'Win your first fight.' },
  { id:'pack_hunter',   icon:'👥', name:'Pack Hunter',        shards:5,   desc:'Defeat a pack of enemies.' },
  { id:'boss_slayer',   icon:'💀', name:'Boss Slayer',        shards:10,  desc:'Defeat a boss.' },
  { id:'flawless',      icon:'✨', name:'Flawless',           shards:25,  desc:'Defeat a boss without taking any damage.' },
  { id:'close_call',    icon:'💓', name:'Close Call',         shards:10,  desc:'Win a fight with less than 5% HP left.' },
  { id:'heavy_hitter',  icon:'💥', name:'Heavy Hitter',       shards:15,  desc:'Deal 1,000 damage in a single hit.' },
  { id:'slow_burn',     icon:'🔥', name:'Slow Burn',          shards:10,  desc:'Finish an enemy off with damage over time.' },
  { id:'slaughter',     icon:'⚔️', name:'Slaughter',          shards:20,  desc:'Defeat 100 enemies in one run.' },
  { id:'depth_10',      icon:'🕯️', name:'Into the Dark',      shards:10,  desc:'Reach floor 10.' },
  { id:'depth_20',      icon:'🌘', name:'Deeper Still',       shards:20,  desc:'Reach floor 20.' },
  { id:'depth_30',      icon:'🌑', name:'No Light Remains',   shards:30,  desc:'Reach floor 30.' },
  { id:'depth_40',      icon:'🕳️', name:'The Last Reaches',   shards:40,  desc:'Reach floor 40.' },
  { id:'conqueror',     icon:'👑', name:'Conqueror',          shards:100, desc:'Defeat the Abyssal God on floor 50.' },
  { id:'reborn',        icon:'🔄', name:'Reborn',             shards:25,  desc:'Start a New Game+ cycle.' },
  { id:'secret_room',   icon:'🚪', name:'Hidden Ways',        shards:10,  desc:'Discover a secret room.' },
  { id:'secret_boss',   icon:'👁️', name:'Things Best Left Buried', shards:30, desc:'Defeat a secret boss.' },
  { id:'hoarder',       icon:'💰', name:'Hoarder',            shards:10,  desc:'Carry 1,000 gold at once.' },
  { id:'divine_gear',   icon:'🌟', name:'Touched by Divinity', shards:25, desc:'Equip a Divine item.' },
  { id:'collector',     icon:'📖', name:'Collector',          shards:20,  desc:'Unlock 10 classes.' },
  { id:'fusionist',     icon:'⚗️', name:'Fusionist',          shards:20,  desc:'Create your first fusion class.' },
];
const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]));

function hasAchievement(id) { return !!(G.meta.achievements && G.meta.achievements[id]); }

function unlockAchievement(id) {
  const a = ACHIEVEMENT_BY_ID[id];
  if (!a || hasAchievement(id)) return false;
  G.meta.achievements = G.meta.achievements || {};
  G.meta.achievements[id] = Date.now();
  if (G.player && !G._gameOverShown) awardShards(a.shards, true); else G.meta.soulShards += a.shards;
  saveMeta();
  showToast(`<span class="toast-icon">${a.icon}</span><span><b>Achievement: ${a.name}</b><br><span class="toast-sub">${a.desc} +${a.shards} Soul Shards</span></span>`);
  if (typeof logEntry === 'function' && G.player) logEntry('reward', `🏆 Achievement: ${a.name} (+${a.shards} Soul Shards)`);
  return true;
}

// checkAchievements — the achievements that depend only on current state
function checkAchievements() {
  const m = G.meta, p = G.player;
  [[10,'depth_10'],[20,'depth_20'],[30,'depth_30'],[40,'depth_40']].forEach(([f, id]) => { if (m.maxFloor >= f) unlockAchievement(id); });
  if (m.conquestRewards && m.conquestRewards.conquered) unlockAchievement('conqueror');
  if ((m.ngPlus || 0) > 0) unlockAchievement('reborn');
  if ((m.unlockedClasses || []).length >= 10) unlockAchievement('collector');
  if ((m.defeatedSecretBosses || []).length) unlockAchievement('secret_boss');
  if (p) {
    if (p.gold >= 1000) unlockAchievement('hoarder');
    if (Object.values(p.equipment || {}).some(it => it && it.rarity === 'divine')) unlockAchievement('divine_gear');
    if ((runStats().kills || 0) >= 100) unlockAchievement('slaughter');
  }
}

// ── Toasts ─────────────────────────────────────────────────────
// Small notices in the corner that never block play.
function showToast(html, ms = 3800) {
  let box = document.getElementById('toast-container');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast-container';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    document.body.appendChild(box);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = html;
  box.appendChild(t);
  setTimeout(() => t.classList.add('toast-out'), ms);
  setTimeout(() => t.remove(), ms + 400);
}
