// ══════════════════════════════════════════════════════════════
// STATUS SYSTEM  (js/engine/status.js)
//
// A status is { id, name, type:'buff'|'debuff', icon, duration, ... }.
//
// TIMING
//   tickStatus(entity) runs at the end of that entity's own turn. For each
//   status: onTurn() fires, duration drops by 1, and at 0 it expires. A
//   status applied during its owner's own turn is "fresh" and skips that
//   first tick, so "+30% ATK for 4 turns" really covers the next 4 actions
//   and Vanish survives until the attack it is meant to empower.
//
// STAT RECORD FIELDS (the caller has ALREADY changed the stat; the status
// just remembers by how much so expiry can undo it):
//   atkBonus/defBonus/spdBonus/critBonus      — undone by subtracting
//   atkPen/defPen/spdPen, atkLoss/defLoss/spdLoss — undone by adding back
//   Re-applying an active status adds the new amounts to the old ones.
//
// HOOKS
//   onApply(entity)            — once, when first applied
//   onTurn(entity)             — every tick
//   onExpire(entity)/onRemove  — when it ends (expiry or removeStatuses)
//   Stat changes made by onApply/onTurn are treated as "for the duration":
//   they are applied once (never compounded each turn) and undone on expiry
//   if the status's own onExpire doesn't undo them itself.
//
// Errors thrown by status callbacks are caught and logged to
// G._statusErrors so one bad effect can never freeze a fight.
// ══════════════════════════════════════════════════════════════

const STATUS_BONUS_FIELDS = { atkBonus:'atk', defBonus:'def', spdBonus:'spd', critBonus:'crit' };
const STATUS_PEN_FIELDS   = { atkPen:'atk', defPen:'def', spdPen:'spd', atkLoss:'atk', defLoss:'def', spdLoss:'spd' };
const STATUS_RECORD_FIELDS = [...Object.keys(STATUS_BONUS_FIELDS), ...Object.keys(STATUS_PEN_FIELDS)];

const _STAT_WRITE_RE  = /\.(?:stats\.)?(?:atk|def|spd|crit|critDmg|maxHp|maxMp)\s*(?:[-+*/]?=(?!=))/;
const _SIDE_EFFECT_RE = /dealDmg|\.hp\b|\.mp\b|shield|addStatus|apply(?:Burn|Plague|Entropy)|stacks|cooldown|combo|status/;

function _isStunStatus(s) { return s && (s.id === 'stun' || s.id === 'stunned'); }

function _statusError(where, s, err) {
  G._statusErrors = G._statusErrors || [];
  G._statusErrors.push(`${where} ${s && s.id}: ${err && err.message}`);
  console.warn('[status]', where, s && s.id, err);
}

function _safeCall(where, s, fn, ...args) {
  try { return fn(...args); } catch (err) { _statusError(where, s, err); }
}

// Is this a status the entity should refuse outright?
function _statusBlocked(entity, status) {
  const list = entity.status || [];
  if (_isStunStatus(status)) {
    if (list.some(s => s.immuneStun)) return 'shrugs off the stun';
    if (isEnemy(entity) && (entity._stunImmune || 0) > 0) return 'resists the stun';
  }
  if (!isEnemy(entity) && status.type === 'debuff') {
    if (list.some(s => s.id === 'debuff_immune')) return 'is immune to debuffs';
    if ((entity.passives || []).includes('immunity') && /poison|plague|disease|toxin|venom|rot|blight|spore|pestil|virus|infect/.test(status.id || '')) {
      return 'is immune to poison and disease';
    }
  }
  return null;
}

function addStatus(entity, status) {
  if (!entity || !status) return;
  if (!entity.stats) prepareEnemy(entity);
  if (!entity.status) entity.status = [];
  const blocked = _statusBlocked(entity, status);
  if (blocked) {
    logEntry('system', `${isEnemy(entity) ? entity.name : 'You'} ${blocked}!`);
    return;
  }
  const ownTurn = G.inCombat && ((isEnemy(entity) && G.turn === 'enemy') || (!isEnemy(entity) && G.turn === 'player'));
  const existing = entity.status.find(s => s.id === status.id);
  if (existing) {
    existing.duration = Math.max(existing.duration, status.duration);
    if (status.stacks) existing.stacks = Math.min(10, (existing.stacks || 1) + status.stacks);
    STATUS_RECORD_FIELDS.forEach(f => { if (status[f]) existing[f] = (existing[f] || 0) + status[f]; });
    if (ownTurn) existing._fresh = true;
    return;
  }
  const s = { ...status };
  if (ownTurn) s._fresh = true;
  entity.status.push(s);
  _attachStatEffects(entity, s);
}

// Converts onApply/onTurn stat changes into a single "for the duration" delta.
function _attachStatEffects(entity, s) {
  const before = snapshotStats(entity);
  if (s.onApply) _safeCall('onApply', s, s.onApply, entity);

  if (s.onTurn && _STAT_WRITE_RE.test(String(s.onTurn))) {
    const orig = s.onTurn;
    if (!_SIDE_EFFECT_RE.test(String(orig))) {
      // Pure stat buff/debuff written as a per-turn effect: apply it once,
      // right now, instead of compounding it every turn.
      _safeCall('onTurn', s, orig, entity);
      s.onTurn = null;
    } else {
      // Mixed effect (e.g. damage + stat change): keep the per-turn part but
      // only let the stat change land on the first tick.
      s.onTurn = (ent) => {
        const pre = snapshotStats(ent);
        orig(ent);
        if (s._statApplied) STAT_KEYS.forEach(k => { ent.stats[k] = pre[k]; });
        else {
          s._statApplied = true;
          const post = snapshotStats(ent);
          s._statDelta = s._statDelta || {};
          STAT_KEYS.forEach(k => { s._statDelta[k] = (s._statDelta[k] || 0) + (post[k] - pre[k]); });
        }
      };
    }
  }
  const after = snapshotStats(entity);
  const delta = {};
  let any = false;
  STAT_KEYS.forEach(k => { delta[k] = after[k] - before[k]; if (delta[k]) any = true; });
  if (any) s._statDelta = delta;
}

function tickStatus(entity) {
  if (!entity || !entity.status) return;
  if (!entity.stats) prepareEnemy(entity);
  for (const s of entity.status.slice()) {
    if (!entity.status.includes(s)) continue; // removed by another status's callback
    if (s._fresh) { s._fresh = false; continue; }
    if (s.onTurn) _safeCall('onTurn', s, s.onTurn, entity);
    s.duration--;
    if (s.duration <= 0) endStatus(entity, s);
  }
}

// endStatus — removes one status and undoes everything it recorded.
function endStatus(entity, s) {
  entity.status = (entity.status || []).filter(x => x !== s);
  for (const [f, key] of Object.entries(STATUS_BONUS_FIELDS)) {
    if (s[f]) entity.stats[key] = Math.max(key === 'atk' || key === 'spd' ? 1 : 0, (entity.stats[key] || 0) - s[f]);
  }
  for (const [f, key] of Object.entries(STATUS_PEN_FIELDS)) {
    if (s[f]) entity.stats[key] = (entity.stats[key] || 0) + s[f];
  }
  const before = snapshotStats(entity);
  if (s.onExpire) _safeCall('onExpire', s, s.onExpire, entity);
  if (s.onRemove) _safeCall('onRemove', s, s.onRemove, entity);
  if (s._statDelta) {
    const after = snapshotStats(entity);
    STAT_KEYS.forEach(k => {
      const d = s._statDelta[k];
      if (!d) return;
      const undone = after[k] - before[k];
      // The status's own hooks reverted (most of) it — leave it alone.
      if (Math.sign(undone) === -Math.sign(d) && Math.abs(undone) >= Math.abs(d) * 0.5) return;
      entity.stats[k] = (entity.stats[k] || 0) - d;
    });
  }
}

// removeStatuses — cleanses statuses early, undoing their stat effects.
function removeStatuses(entity, predicate) {
  if (!entity || !entity.status) return [];
  const gone = entity.status.filter(predicate);
  gone.forEach(s => endStatus(entity, s));
  return gone;
}

function hasStatus(entity, id) {
  return !!(entity && entity.status && entity.status.some(s => s.id === id));
}

// clearCombatStatuses — end-of-fight cleanup. Stats are reset to base right
// after, so statuses are simply dropped (no expiry callbacks/messages).
function clearCombatStatuses(p) {
  p.status = (p.status || []).filter(s => s.permanent === true);
  resetTemporaryStats(p);
}
