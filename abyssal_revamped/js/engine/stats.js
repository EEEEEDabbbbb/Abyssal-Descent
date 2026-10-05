// ══════════════════════════════════════════════════════════════
// STATS  (js/engine/stats.js)
//
// PERMANENT vs TEMPORARY STATS
//   p.base  — the player's permanent stats: class stats + shard upgrades +
//             level-ups + talents + equipment + event rewards.
//   p.stats — the live values combat actually reads. Buffs, debuffs,
//             abilities and passives are free to change these however they
//             like during a fight; resetTemporaryStats() snaps them back to
//             p.base when the fight ends (won or fled) and on every floor
//             change, so no temporary effect can ever leak into the run.
//
//   ⚠️ Anything meant to be PERMANENT must go through addPermanentStat()
//      (or applyPermanentBonuses()). A direct `p.stats.atk += 5` only lasts
//      until the end of the current fight.
//   hp / mp are resources, not stats: they are never reset, only clamped.
//
// ENEMY STATS
//   Enemies store stats as flat fields (e.hp, e.atk, e.def, e.spd).
//   prepareEnemy() also gives them a non-enumerable `stats` view onto those
//   same fields, because a lot of ability code reads/writes `en.stats.def`.
// ══════════════════════════════════════════════════════════════

const STAT_KEYS = ['maxHp', 'maxMp', 'atk', 'def', 'spd', 'crit', 'critDmg'];

function initBaseStats(p) {
  p.stats.critDmg = p.stats.critDmg || 0;
  p.base = {};
  STAT_KEYS.forEach(k => { p.base[k] = p.stats[k] || 0; });
}

// addPermanentStat — changes a stat for the rest of the run.
// maxHp/maxMp gains also grant the same amount of current HP/MP; losses clamp.
function addPermanentStat(p, key, delta) {
  if (!delta) return;
  if (key === 'hp' || key === 'mp') {
    const maxKey = key === 'hp' ? 'maxHp' : 'maxMp';
    p.stats[key] = clamp(p.stats[key] + delta, 0, p.stats[maxKey]);
    return;
  }
  if (!STAT_KEYS.includes(key)) return;
  if (!p.base) initBaseStats(p);
  p.base[key] = (p.base[key] || 0) + delta;
  p.stats[key] = (p.stats[key] || 0) + delta;
  if (key === 'maxHp') p.stats.hp = clamp(p.stats.hp + Math.max(0, delta), 0, p.stats.maxHp);
  if (key === 'maxMp') p.stats.mp = clamp(p.stats.mp + Math.max(0, delta), 0, p.stats.maxMp);
}

// applyPermanentBonuses — e.g. equipment/talent bonuses: { atk:5, maxHp:20 }.
// sign = -1 removes them again.
function applyPermanentBonuses(p, bonuses, sign = 1) {
  for (const [k, v] of Object.entries(bonuses || {})) addPermanentStat(p, k, v * sign);
}

// resetTemporaryStats — snaps live stats back to the permanent base.
function resetTemporaryStats(p) {
  if (!p) return;
  if (!p.base) { initBaseStats(p); return; }
  STAT_KEYS.forEach(k => { p.stats[k] = p.base[k]; });
  p.stats.hp = clamp(Math.round(p.stats.hp), 0, p.stats.maxHp);
  p.stats.mp = clamp(Math.round(p.stats.mp), 0, p.stats.maxMp);
}

// ── Enemies ───────────────────────────────────────────────────
const ENEMY_STAT_FIELDS = new Set(['hp', 'maxHp', 'atk', 'def', 'spd']);

function prepareEnemy(e) {
  if (!e || e._isEnemy) return e;
  Object.defineProperty(e, '_isEnemy', { value: true, enumerable: false });
  const extra = {};
  const view = new Proxy({}, {
    get(_, k) {
      if (ENEMY_STAT_FIELDS.has(k)) return e[k];
      if (k in extra) return extra[k];
      return (k === 'crit' || k === 'critDmg' || k === 'mp' || k === 'maxMp') ? 0 : undefined;
    },
    set(_, k, v) {
      if (ENEMY_STAT_FIELDS.has(k)) e[k] = v; else extra[k] = v;
      return true;
    },
    has(_, k) { return ENEMY_STAT_FIELDS.has(k) || k in extra; },
  });
  Object.defineProperty(e, 'stats', { value: view, enumerable: false, configurable: true });
  if (!Array.isArray(e.status)) e.status = [];
  return e;
}

function isEnemy(entity) { return !!(entity && entity._isEnemy); }

// Both players and prepared enemies expose entity.stats, so status code can
// treat them the same way.
function snapshotStats(entity) {
  const out = {};
  STAT_KEYS.forEach(k => { out[k] = entity.stats[k] || 0; });
  return out;
}
