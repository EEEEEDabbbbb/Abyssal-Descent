// ══════════════════════════════════════════════════════════════
// UTILITIES  (js/engine/utils.js)
//
// PURE HELPERS: rand, randRange, clamp, deepCopy
//
// getClassData(classId) — ALWAYS USE THIS instead of CLASSES[classId] directly
//   Checks CLASSES first, then FUSION_CLASSES (lazy-loaded).
//   Returns null if class not found (fusion file not loaded yet).
//
// calcDmg(atk, def) — base damage formula with ±15% variance
//   result = max(1, atk - def) ± 15%
//
// STATUS HELPERS (burn/entropy/plague):
//   applyBurn(e, p, n)    — adds/stacks burn on enemy; getBurnBoost(p) adds passive bonuses
//   applyEntropy(e, p, n) — reduces enemy ATK+DEF by 2n each stack; clearEntropy restores
//   applyPlague(e, p, n)  — stacking poison DoT
//   All three have clear* functions to remove the status and reverse stat changes
//
// hasEquipEffect(p, eff) — checks if any equipped item has the given effect token
//   Effect strings can be compound: 'piercing_lifesteal_burnboost'
//   Splits on '_' and tries exact match + 2-token combos
//   ⚠️ Some effects contain numbers: 'evasion2', 'burnboost2', 'mpregen2'
//      These must be passed as the exact token string
//
// DAMAGE MULTIPLIERS:
//   getDmgMult(p)      — physical damage multiplier (equipment + low-HP bonuses + passives)
//   getMagicDmgMult(p) — magic damage multiplier (getDmgMult + spellmaster + void_affinity + soul_harvest)
//   getCritMult(p)     — 1.5 + critDmg/100
//   getDifficultyMult() — 1.0 / 1.3 / 1.7 based on G.worldGen.difficulty
//
// COMBO SYSTEM:
//   BURST_THRESHOLD = 5 — combos needed to fill burst meter
//   addCombo(p)   — increments p.combo and charges p.burstCharge
//   resetCombo(p) — resets p.combo to 0 (on taking damage or defending)
//   getComboMult(p) — +10% damage per combo stack
//   updateComboUI() — refreshes combo display and burst button state
//
// XP / LEVELING:
//   xpForLevel(lvl)       — run XP needed for next level (50 * 1.4^(lvl-1))
//   classXpForLevel(n)    — class XP needed for next class level (100 * n * 1.4)
//   gainXP(amount)        — adds run XP, levels up player stats (+8HP, +5MP, +2ATK, +1DEF/SPD, +1TP)
//   gainClassXP(id, amt)  — persists class XP in G.meta, levels up class, saves
//   Class max level = 20  — hitting 20 enables fusion in fusion lab
//
// META PERSISTENCE:
//   saveMeta() — JSON.stringify(G.meta) to localStorage 'abyssal_meta'
//   loadMeta() — reads and merges with defaults to handle missing new fields
// ══════════════════════════════════════════════════════════════

function rand(n)          { return Math.floor(Math.random() * n); }
function randRange(a, b)  { return a + rand(b - a + 1); }
function clamp(v, mn, mx) { return Math.min(mx, Math.max(mn, v)); }
function deepCopy(obj)    { return JSON.parse(JSON.stringify(obj)); }

// Looks up a class from base CLASSES or FUSION_CLASSES — always use this instead of CLASSES[id] directly
function getClassData(classId) {
  return (CLASSES && CLASSES[classId]) ||
         (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[classId]) ||
         null;
}

function calcDmg(atk, def) {
  const base     = Math.max(1, atk - def);
  const variance = Math.round(base * 0.15);
  return Math.max(1, base + randRange(-variance, variance));
}
// ── Status helpers ──────────────────────────────────────────
function getBurnStacks(e)  { const b=e.status&&e.status.find(s=>s.id==='burn');    return b?b.stacks:0; }
function getEntropyStacks(e){ const b=e.status&&e.status.find(s=>s.id==='entropy'); return b?b.stacks:0; }
function getPlagueStacks(e) { const b=e.status&&e.status.find(s=>s.id==='plague');  return b?b.stacks:0; }

function applyBurn(e, p, n) {
  const existing = e.status && e.status.find(s=>s.id==='burn');
  const totalStacks = n + getBurnBoost(p);
  if (existing) { existing.stacks=Math.min(10,existing.stacks+totalStacks); existing.duration=5; }
  else {
    addStatus(e,{id:'burn',name:'Burn',type:'debuff',icon:'🔥',duration:5,stacks:totalStacks,
      onTurn:(en)=>{
        const bs=en.status.find(s=>s.id==='burn');if(!bs)return;
        const bd=Math.max(1,Math.round(p.stats.atk*0.3*bs.stacks));
        dealDmgToEnemy(en,bd,false,true);
      }
    });
  }
}
function clearBurn(e) { e.status=(e.status||[]).filter(s=>s.id!=='burn'); }

function applyEntropy(e, p, n) {
  const existing = e.status && e.status.find(s=>s.id==='entropy');
  if (existing) {
    existing.stacks=Math.min(10,existing.stacks+n); existing.duration=6;
    e.atk=Math.max(1,e.atk-2*n); e.def=Math.max(0,e.def-2*n);
    existing.atkPen=(existing.atkPen||0)+2*n; existing.defPen=(existing.defPen||0)+2*n;
  } else {
    e.atk=Math.max(1,e.atk-2*n); e.def=Math.max(0,e.def-2*n);
    addStatus(e,{id:'entropy',name:'Entropy',type:'debuff',icon:'🌑',duration:6,stacks:n,atkPen:2*n,defPen:2*n,
      onTurn:(en)=>{const es=en.status.find(s=>s.id==='entropy');if(!es)return;const ed=Math.max(1,Math.round(p.stats.atk*0.5*es.stacks));dealDmgToEnemy(en,ed,false,true);}
    });
  }
}
function clearEntropy(e) {
  const b=e.status&&e.status.find(s=>s.id==='entropy');
  if(b){e.atk=Math.max(1,e.atk+(b.atkPen||0));e.def=Math.max(0,e.def+(b.defPen||0));}
  e.status=(e.status||[]).filter(s=>s.id!=='entropy');
}

function applyPlague(e, p, n) {
  const existing = e.status && e.status.find(s=>s.id==='plague');
  if (existing) { existing.stacks=Math.min(10,existing.stacks+n); existing.duration=6; }
  else {
    addStatus(e,{id:'plague',name:'Plague',type:'debuff',icon:'🫧',duration:6,stacks:n,
      onTurn:(en)=>{const ps=en.status.find(s=>s.id==='plague');if(!ps)return;const pd=Math.max(1,Math.round(p.stats.atk*0.4*ps.stacks));dealDmgToEnemy(en,pd,false,true);}
    });
  }
}
function clearPlague(e) { e.status=(e.status||[]).filter(s=>s.id!=='plague'); }

// ── Equipment helpers ────────────────────────────────────────
function hasEquipEffect(p, eff) {
  if (!p.equipment) return false;
  return Object.values(p.equipment).some(slot => {
    if (!slot || !slot.effect) return false;
    // Exact match OR the effect string contains the token as a word-boundary substring
    // e.g. 'evasion2_lifesteal_spellmaster'.includes('lifesteal') → true
    // Handles both plain 'lifesteal' and compound 'piercing_lifesteal_burnboost'
    if (slot.effect === eff) return true;
    // Match a single token ('lifesteal') or two adjacent tokens ('spd_dmg')
    const parts = slot.effect.split('_');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === eff) return true;
      if (i + 1 < parts.length && parts[i] + '_' + parts[i+1] === eff) return true;
    }
    return false;
  });
}

// ── Nightmare difficulty modifier ───────────────────────────
function getDifficultyMult() {
  const d = G.worldGen.difficulty;
  return { normal:1.0, hard:1.3, nightmare:1.7 }[d] || 1.0;
}

function getBurnBoost(p) {
  let boost=0;
  if(hasEquipEffect(p,'burnboost'))  boost+=1;
  if(hasEquipEffect(p,'burnboost2')) boost+=3;
  // Pyromancer passive: combustion — extra burn stack on all applications
  if(p.passives && p.passives.includes('combustion')) boost+=1;
  return boost;
}

// ── Damage multipliers ───────────────────────────────────────
function getDmgMult(p) {
  let mult=1.0;
  if(p.stats.hp/p.stats.maxHp<0.5 && hasEquipEffect(p,'deathcharm'))  mult*=1.15;
  if(p.stats.hp/p.stats.maxHp<0.3 && hasEquipEffect(p,'bloodpact'))   mult*=1.25;
  if(hasEquipEffect(p,'heartofabyss')) mult*=1.30;
  if(hasEquipEffect(p,'spd_dmg') && G.enemy && p.stats.spd > (G.enemy.spd||8)) mult*=1.10;
  // Blood Knight passive: vital_hunger — +1% dmg per 1% HP missing
  if(p.passives && p.passives.includes('vital_hunger')) {
    const missingPct = 1 - (p.stats.hp / p.stats.maxHp);
    mult *= (1 + missingPct * 0.5); // up to +50% at 0 HP
  }
  // Status buff: dmgMult — used by convergence_reset and similar abilities
  const dmgBuff = (p.status||[]).find(s => s.dmgMult);
  if (dmgBuff) mult *= dmgBuff.dmgMult;
  return mult;
}

function getCritMult(p) {
  const base = 1.5;
  const bonus = (p.stats.critDmg || 0) / 100;
  return base + bonus;
}

function getMagicDmgMult(p) {
  let mult=getDmgMult(p);
  if(hasEquipEffect(p,'spellmaster')) mult*=1.20;
  // Voidmancer passive: void_affinity — +20% magic damage
  if(p.passives && p.passives.includes('void_affinity')) mult*=1.20;
  // Soulweaver passive: soul_harvest — +15% magic damage
  if(p.passives && p.passives.includes('soul_harvest')) mult*=1.15;
  // Pyromancer passive: combustion — handled in burn application, no extra here
  return mult;
}

// ── Combo system ─────────────────────────────────────────────
const BURST_THRESHOLD = 5; // combos needed to fill burst

function getComboMult(p) {
  const combo = p.combo || 0;
  return 1.0 + (combo * 0.10); // +10% per combo, so 10 combo = +100%
}

function addCombo(p) {
  p.combo = (p.combo || 0) + 1;
  // Charge burst meter
  const boost = 1 + (G.meta.shopUpgrades['combo_mastery'] || 0) * 0.25;
  p.burstCharge = Math.min(BURST_THRESHOLD, (p.burstCharge || 0) + boost);
  updateComboUI();
}

function resetCombo(p) {
  if ((p.combo || 0) > 0) {
    p.combo = 0;
    updateComboUI();
  }
}

function updateComboUI() {
  const el = document.getElementById('combo-disp');
  const bEl = document.getElementById('burst-btn');
  if (!G.player) return;
  const combo = G.player.combo || 0;
  const charge = G.player.burstCharge || 0;
  if (el) {
    el.textContent = combo >= 2 ? `COMBO ×${combo}  (+${Math.round((getComboMult(G.player)-1)*100)}%)` : '';
    el.className = 'combo-display' + (combo >= 2 ? ' active' : '');
  }
  if (bEl) {
    const ready = charge >= BURST_THRESHOLD;
    bEl.disabled = !ready || !G.inCombat || G.turn !== 'player';
    bEl.style.opacity = ready ? '1' : '0.4';
    const pct = Math.min(100, (charge / BURST_THRESHOLD) * 100);
    const fillEl = document.getElementById('burst-fill');
    if (fillEl) fillEl.style.width = pct + '%';
    bEl.title = ready ? 'BURST READY!' : `Burst: ${Math.round(pct)}%`;
  }
}

// ── Save / Load meta ─────────────────────────────────────────
function saveMeta() {
  try { localStorage.setItem('abyssal_meta', JSON.stringify(G.meta)); }
  catch(e) { console.warn('[save] could not save meta progress', e); }
}
// loadMeta — merges the save over defaults so fields added in later versions
// get sane values, while unknown fields from the save are kept. A save that
// fails to parse is copied to 'abyssal_meta_corrupt_backup' before anything
// can overwrite it.
function loadMeta() {
  let raw = null;
  try { raw = localStorage.getItem('abyssal_meta'); } catch(e) { return; }
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    const d = defaultMeta();
    G.meta = {
      ...d,
      ...saved,
      conquestRewards: { ...d.conquestRewards, ...(saved.conquestRewards || {}) },
    };
    for (const k of ['unlockedClasses','unlockedFusions','knownFusionRecipes','defeatedSecretBosses']) {
      if (!Array.isArray(G.meta[k])) G.meta[k] = d[k];
    }
    for (const k of ['shopUpgrades','classLevels','classXP']) {
      if (!G.meta[k] || typeof G.meta[k] !== 'object') G.meta[k] = d[k];
    }
  } catch(e) {
    try { localStorage.setItem('abyssal_meta_corrupt_backup', raw); } catch(_) {}
    console.warn('[save] meta progress was unreadable; a backup was kept', e);
  }
}

function logEntry(type, msg) {
  G.log.unshift({ type, msg });
  if (G.log.length > 100) G.log.pop();
}

function xpForLevel(lvl) { return Math.round(50 * Math.pow(1.4, lvl - 1)); }

// Class leveling — separate from run XP, persists in G.meta
const CLASS_MAX_LEVEL = 20;
function classXpForLevel(n) { return Math.round(100 * n * 1.4); }

function gainClassXP(classId, amount) {
  if (!classId) return;
  const meta = G.meta;
  meta.classXP     = meta.classXP     || {};
  meta.classLevels = meta.classLevels || {};
  meta.classXP[classId]     = (meta.classXP[classId]     || 0) + amount;
  meta.classLevels[classId] = (meta.classLevels[classId] || 1);

  // Level-up loop — a single fight could span multiple levels at low levels
  while (meta.classLevels[classId] < CLASS_MAX_LEVEL) {
    const needed = classXpForLevel(meta.classLevels[classId]);
    if (meta.classXP[classId] < needed) break;
    meta.classXP[classId]    -= needed;
    meta.classLevels[classId]++;
    logEntry('reward', `✦ ${classId} reached class level ${meta.classLevels[classId]}!`);
  }

  // Cap XP at max level — no overflow accumulation past 20
  if (meta.classLevels[classId] >= CLASS_MAX_LEVEL) {
    meta.classXP[classId] = 0;
  }

  saveMeta();
}

// getLevelUpGains — per-class stat growth. The baseline (+8 HP, +5 MP, +2 ATK,
// +1 DEF, +1 SPD) is scaled by the class's statDisplay rating for that stat
// (rating 5 = baseline, 10 = 1.5×, 0 = 0.5×). Fractions carry over between
// levels in p._growthCarry so low-growth stats still rise every few levels.
const LEVEL_UP_BASE = { maxHp:8, maxMp:5, atk:2, def:1, spd:1 };
const LEVEL_UP_DISPLAY_KEY = { maxHp:'HP', maxMp:'MP', atk:'ATK', def:'DEF', spd:'SPD' };
function getLevelUpGains(p) {
  const display = (getClassData(p.classId) || {}).statDisplay || {};
  p._growthCarry = p._growthCarry || {};
  const gains = {};
  for (const [k, baseGain] of Object.entries(LEVEL_UP_BASE)) {
    const rating = display[LEVEL_UP_DISPLAY_KEY[k]];
    const mult = clamp(0.5 + (typeof rating === 'number' ? rating : 5) / 10, 0.5, 1.7);
    const total = (p._growthCarry[k] || 0) + baseGain * mult;
    gains[k] = Math.floor(total);
    p._growthCarry[k] = total - gains[k];
  }
  return gains;
}

function gainXP(amount) {
  const p = G.player;
  if (!p) return;
  p.xp += amount;
  while (p.xp >= xpForLevel(p.level)) {
    p.xp -= xpForLevel(p.level);
    p.level++;
    const g = getLevelUpGains(p);
    applyPermanentBonuses(p, g, 1); // maxHp/maxMp gains also restore that much HP/MP
    p.talentPoints += 2;
    logEntry('reward', `★ Level up! Now level ${p.level}. (+${g.maxHp} HP, +${g.maxMp} MP, +${g.atk} ATK, +${g.def} DEF, +${g.spd} SPD)`);
  }
}
