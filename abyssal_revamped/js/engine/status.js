// ══════════════════════════════════════════════════════════════
// STATUS SYSTEM
// ══════════════════════════════════════════════════════════════

function addStatus(entity, status) {
  if (!entity.status) entity.status = [];
  const existing = entity.status.find(s => s.id === status.id);
  if (existing) {
    existing.duration = Math.max(existing.duration, status.duration);
    if (status.stacks) existing.stacks = Math.min(10, (existing.stacks||1) + status.stacks);
  } else {
    entity.status.push({ ...status });
  }
}

function tickStatus(entity) {
  if (!entity.status) return;
  entity.status = entity.status.filter(s => {
    s.duration--;
    if (s.duration <= 0) {
      // Restore enemy stat penalties on expiry
      if (s.defPen && entity === G.enemy)  entity.def = Math.max(0, entity.def + s.defPen);
      if (s.atkPen && entity === G.enemy)  entity.atk = Math.max(1, entity.atk + s.atkPen);
      if (s.spdPen && entity === G.enemy)  entity.spd = Math.max(1, entity.spd + s.spdPen);  // FIX 6: restore spdPen
      // Restore player buff bonuses on expiry
      if (entity === G.player) {
        if (s.defBonus)  G.player.stats.def  = Math.max(0, G.player.stats.def  - s.defBonus);
        if (s.atkBonus)  G.player.stats.atk  = Math.max(1, G.player.stats.atk  - s.atkBonus);
        if (s.spdBonus)  G.player.stats.spd  = Math.max(1, G.player.stats.spd  - s.spdBonus);
        if (s.critBonus) G.player.stats.crit = Math.max(0, G.player.stats.crit - s.critBonus);
        // Restore player debuff stat penalties on expiry
        if (s.defPen)  G.player.stats.def = Math.min(999, G.player.stats.def + s.defPen);
        if (s.atkPen)  G.player.stats.atk = Math.min(999, G.player.stats.atk + s.atkPen);
        if (s.spdPen)  G.player.stats.spd = Math.min(999, G.player.stats.spd + s.spdPen);
      }
      if (s.onExpire) s.onExpire(entity);
      return false;
    }
    if (s.onTurn && entity && entity.stats) s.onTurn(entity);
    return true;
  });
}

function clearCombatStatuses(p) {
  // FIX 1: Revert ALL active buff stat bonuses before clearing — no whitelist exceptions.
  // Every buff that granted a bonus must have it reverted when combat ends.
  p.status.forEach(s => {
    if (s.type !== 'buff') return;
    if (s.defBonus)  p.stats.def  = Math.max(0, p.stats.def  - s.defBonus);
    if (s.atkBonus)  p.stats.atk  = Math.max(1, p.stats.atk  - s.atkBonus);
    if (s.spdBonus)  p.stats.spd  = Math.max(1, p.stats.spd  - s.spdBonus);
    if (s.critBonus) p.stats.crit = Math.max(0, p.stats.crit - s.critBonus);
  });
  // Clear all combat statuses — buffs and debuffs both end when the fight ends
  p.status = p.status.filter(s => s.permanent === true);
}
