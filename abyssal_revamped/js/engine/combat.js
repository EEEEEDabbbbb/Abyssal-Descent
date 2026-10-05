// ══════════════════════════════════════════════════════════════
// COMBAT ENGINE  (js/engine/combat.js)
//
// KEY CONCEPTS:
//   G.inCombat    — true while a fight is active
//   G.turn        — 'player' or 'enemy'; checked before any action
//   G.enemy       — current enemy object (null outside combat)
//   G.player      — player object (see player.js)
//   G.combatRound — incremented each time enemy finishes a turn
//
// DAMAGE FLOW:
//   playerAction() → dealDmgToEnemy()  (outgoing)
//   enemyTurn()    → dealDmgToPlayer() (incoming)
//
// STATUS EFFECTS: stored as arrays on p.status / e.status
//   Each status: { id, name, type, icon, duration, onTurn?, stacks? }
//   tickStatus() decrements duration and calls onTurn callbacks each turn
//
// NULLBRINGER SUNDERS: tracked on G.enemy._sunders object
//   { flesh:true, will:true, form:true, time:true, existence:true }
//   anatomical_study passive reads G._nullSunderActive + e._sunders
//
// BOSS PHASES: defined in enemy data as e.phases[]
//   checkBossPhase() compares e.hp/e.maxHp to phase thresholds
// ══════════════════════════════════════════════════════════════

// ── Helpers ───────────────────────────────────────────────────
function isBossLike(e) { return !!(e && (e.isBoss || e.isGuardian || e.isSecretBoss)); }

// DOM ids of an enemy's card/sprite (pack fights use per-index ids)
function enemyDisplayId(e) {
  const i = G.enemies.indexOf(e);
  return G.enemies.length > 1 && i >= 0 ? `enemy-display-${i}` : 'enemy-display';
}
function enemySpriteId(e) {
  const i = G.enemies.indexOf(e);
  return G.enemies.length > 1 && i >= 0 ? `enemy-sprite-${i}` : 'enemy-sprite';
}
function playSpriteAnim(id, cls) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hurt','crit-hit','attacking','dead'); void el.offsetWidth; el.classList.add(cls); }
}

// reflectDamage — retaliation (reflects, counters, shards). Never consumes
// Vanish, never builds combo-based bonuses, never triggers lifesteal.
function reflectDamage(target, amount, element) {
  if (!target || target.hp <= 0 || amount <= 0) return 0;
  G._reflecting = true;
  try { return dealDmgToEnemy(target, amount, false, false, false, element); }
  finally { G._reflecting = false; }
}

// healEnemy — every enemy heal goes through here so "no healing" effects work
function healEnemy(e, amount) {
  if (!e || amount <= 0) return 0;
  if ((e._sunders && e._sunders.flesh) || (e.status || []).some(s => s.noHeal)) return 0;
  let cap = e.maxHp;
  (e.status || []).forEach(s => { if (s.hpCapPct) cap = Math.min(cap, Math.round(e.maxHp * s.hpCapPct)); });
  const before = e.hp;
  e.hp = Math.min(cap, e.hp + Math.round(amount));
  return Math.max(0, e.hp - before);
}

// executeEnemy — instant kills. Bosses/guardians lose 25% max HP instead.
function executeEnemy(e, source) {
  if (!e || e.hp <= 0) return;
  if (isBossLike(e)) {
    const dmg = Math.round(e.maxHp * 0.25);
    e.hp = Math.max(0, e.hp - dmg);
    logEntry('player-action', `${source}: ${e.name} resists execution but loses ${dmg} HP!`);
  } else {
    e.hp = 0;
    logEntry('player-action', `${source}: ${e.name} is executed!`);
  }
}

// dealDmgToEnemy — main outgoing damage function
// Called by: attack, abilities, DoTs, reflects, Nullbringer sunders
// Parameters:
//   e         — enemy object
//   dmg       — raw damage before multipliers
//   isCrit    — boolean; plays crit float if true
//   isDot     — boolean; skips combo mult, weapon affinity, animations if true
//   isMagic   — boolean; uses getMagicDmgMult instead of getDmgMult
//   atkElement — override element (defaults to class element for magic, 'normal' for physical)
// A "direct" hit is one the player made this action (not a DoT tick or a
// reflect) — only direct hits consume Vanish, trigger lifesteal, etc.
function dealDmgToEnemy(e, dmg, isCrit, isDot=false, isMagic=false, atkElement=null) {
  if (!e || e.hp <= 0) return 0;
  const p     = G.player;
  const magic = isMagic || !!G._currentAbilityMagic; // G._currentAbilityMagic set in playerAction() ability branch
  const direct = !isDot && !G._reflecting;
  let mult    = magic ? getMagicDmgMult(p) : getDmgMult(p);

  // Weapon affinity bonus (+20% when weapon element matches ability element)
  if (direct && G._weaponAffinity && G._weaponAffinity !== 1.0) mult *= G._weaponAffinity;

  // Element effectiveness — for magic: class element, physical: 'normal', unless overridden
  const atkEl  = atkElement || (magic ? (getClassData(p.classId)?.element||'normal') : 'normal');
  const defEl  = e.element || 'normal';
  const elMult = getElementMult(atkEl, defEl); // defined in elements.js
  mult *= elMult;

  // Combo multiplier: +10% per combo stack. DoTs/reflects don't benefit.
  if (direct) mult *= getComboMult(p);

  // Debuffs on the target that make it take more damage
  (e.status || []).forEach(s => {
    if (s.incomingDmgMult) mult *= s.incomingDmgMult;
    if (s.dmgAmpIn) mult *= 1 + s.dmgAmpIn;
  });
  // Player buffs that boost a damage type
  (p.status || []).forEach(s => { if (s.crystalDmgBonus && atkEl === 'crystal') mult *= 1 + s.crystalDmgBonus; });

  // Nullbringer: anatomical_study — +18% dmg per active Sunder on this enemy
  if (G._nullSunderActive && e._sunders) {
    const sunderCount = Object.keys(e._sunders).length;
    if (sunderCount > 0) mult *= (1 + sunderCount * 0.18);
  }

  // ── PER-COMBAT PASSIVE FLAGS (set in startCombat, cleared in endCombat) ──
  //   G._combustionActive, _voidMasteryActive, _plagueLordActive, _stormMasteryActive,
  //   _phaseActive, _soulrenderActive, _nullSunderActive, _arcaneMasteryActive,
  //   _battleHardenedActive, _bastionActive, _doomAuraActive, _gustActive,
  //   _spiritBondActive, _stardustActive. Newer passives live in passives.js.

  // Combustion (Pyromancer): +25% damage when THIS enemy is burning
  if (G._combustionActive && (e.status||[]).some(s => /burn|ignit|fire_dot|combustion/.test(s.id))) mult *= 1.25;

  // Void Mastery: void/shadow/dark damage +20%
  if (G._voidMasteryActive && ['void','shadow','dark'].includes(atkEl)) mult *= 1.20;

  // Soulrender high-HP bonus: above 90% HP, +40% damage
  if (G._soulrenderActive && p.stats.hp / p.stats.maxHp >= 0.90) mult *= 1.40;

  // Battle Hardened: shadow/dark/void damage vs marked enemy +20%
  if (G._battleHardenedActive && e._battleHardenedMark && ['shadow','dark','void'].includes(atkEl)) mult *= 1.20;

  // Spirit Bond: first direct strike +40%
  if (direct && G._spiritBondActive && p._spiritBondFirstStrike) {
    mult *= 1.40;
    p._spiritBondFirstStrike = false;
  }

  // Stardust: each direct hit in a turn adds 5% chance for a +50% burst
  if (direct && G._stardustActive) {
    G._stardustHits = (G._stardustHits || 0) + 1;
    if (rand(100) < G._stardustHits * 5) {
      mult *= 1.5;
      spawnFloat('STARDUST', 'crit', enemyDisplayId(e));
    }
  }

  // Newer passives (passives.js)
  mult *= passiveDamageMult(p, e, { direct, isDot, magic, kind: magic ? 'magic' : 'physical', element: atkEl });

  // Gear: Executioner (+30% vs enemies under 30% HP), First Strike (+50% on
  // your first hit of each fight)
  if (direct && hasEquipEffect(p, 'executioner') && e.hp / e.maxHp < 0.30) mult *= 1.30;
  if (direct && hasEquipEffect(p, 'firststrike') && !G._firstStrikeUsed) { mult *= 1.50; G._firstStrikeUsed = true; }

  let finalDmg = Math.round(dmg * mult);

  // Phase: 25% chance per direct hit to slip past most of the enemy's DEF
  if (direct && G._phaseActive && rand(100) < 25) {
    const defBoost = e.def > 0 ? (1 + e.def / (e.def + 20)) : 1;
    finalDmg = Math.round(finalDmg * defBoost);
    spawnFloat('PHASE', 'crit', enemyDisplayId(e));
    logEntry('player-action', `👻 Phase: the strike slips past their guard!`);
  }

  // Vanish — the next direct hit gets the bonus multiplier, then Vanish ends
  if (direct && p.nextAttackMult && hasStatus(p, 'vanished')) {
    finalDmg = Math.round(finalDmg * p.nextAttackMult);
    p.nextAttackMult = null;
    removeStatuses(p, s => s.id === 'vanished');
  }

  // Bosses can't be executed outright: an "execute" ability that would kill a
  // boss in one hit is capped at 15% of its max HP.
  if (direct && isBossLike(e) && (G._currentAbilityTags || []).includes('execute') && finalDmg >= e.hp) {
    const cap = Math.max(1, Math.round(e.maxHp * 0.15));
    if (finalDmg > cap) {
      finalDmg = cap;
      if (!G._executeResistLogged) { G._executeResistLogged = true; logEntry('system', `${e.name} resists being executed!`); }
    }
  }

  const hpBefore = e.hp;
  e.hp = Math.max(0, e.hp - finalDmg);
  if (direct) G._directHitsThisAction = (G._directHitsThisAction || 0) + 1;
  // Gear: Mana Siphon — your first direct hit each action restores 4 MP
  if (direct && G._directHitsThisAction === 1 && hasEquipEffect(p, 'manasiphon')) p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + 4);
  // Run stats & achievements (records.js)
  trackStat('dmgDealt', hpBefore - e.hp);
  if (direct) {
    trackBest('bestHit', finalDmg);
    if (isCrit) trackStat('crits');
    if (finalDmg >= 1000) unlockAchievement('heavy_hitter');
  } else if (isDot && e.hp <= 0 && !G._echoing) {
    unlockAchievement('slow_burn');
  }

  if (direct) {
    // Lifesteal: gear 15%, Soulrender +45% below 30% HP, buffs
    let steal = 0;
    if (hasEquipEffect(p,'lifesteal') || hasEquipEffect(p,'soulcrown')) steal += 0.15;
    if (G._soulrenderActive && p.stats.hp / p.stats.maxHp < 0.30) steal += 0.45;
    (p.status || []).forEach(s => {
      if (s.fullLifesteal) steal += 1;
      if (s.lifestealBonus) steal += s.lifestealBonus / 100;
    });
    if (steal > 0) p.stats.hp = Math.min(p.stats.maxHp, p.stats.hp + Math.round((hpBefore - e.hp) * steal)); // overkill doesn't heal

    // Resonance Field: direct hits echo for extra damage
    const echo = (p.status || []).find(s => s.echoOnHit);
    if (echo && !G._echoing && e.hp > 0) {
      G._echoing = true;
      try { dealDmgToEnemy(e, Math.round(finalDmg * echo.echoOnHit), false, true, magic, atkEl); }
      finally { G._echoing = false; }
    }

    // Visual feedback
    playSpriteAnim(enemySpriteId(e), isCrit ? 'crit-hit' : 'hurt');
    sfx(isCrit ? 'crit' : 'hit');
    spawnFloat(finalDmg.toString(), isCrit ? 'crit' : 'damage', enemyDisplayId(e));
    if (isCrit) screenShake(1);

    // "Super effective" etc. — once per action, not once per hit
    const elLabel = getEffectivenessLabel(elMult);
    if (elLabel && !G._elLoggedThisAction) {
      G._elLoggedThisAction = true;
      logEntry('system', `${elLabel.text} (${ELEMENTS[atkEl]?.icon||''}→${ELEMENTS[defEl]?.icon||''})`);
    }
  }

  return finalDmg;
}

// dealDmgToPlayer — all incoming combat damage routes through here
// The attacker is G._actingEnemy (set by enemyTurn while an enemy acts); it
// is null for damage-over-time ticks, which can't be dodged/blocked/reflected.
// Handles: enemy damage modifiers, element vs your class element, misses,
// evasion, invulnerability, block, reflects/counters, damage reduction,
// shields, lethal-save effects, on-hit callbacks, combo reset.
// Difficulty is NOT applied here — it is already in enemy ATK (enemies.js).
function dealDmgToPlayer(rawDmg, ignoreShield=false, atkElement=null) {
  const p  = G.player;
  if (!p) return 0;
  const attacker = G._actingEnemy && G._actingEnemy.hp > 0 ? G._actingEnemy : null;
  let   dmg = Math.max(1, rawDmg);

  if (attacker) {
    // Attacker debuffs: Taunted (atkMult), Suppressed/Nullified (dmgReduction)
    (attacker.status || []).forEach(s => {
      if (s.atkMult) dmg *= s.atkMult;
      if (s.dmgReduction) dmg *= Math.max(0, 1 - s.dmgReduction);
    });
    dmg = Math.round(dmg);
    if (dmg <= 0) { logEntry('player-action', `${attacker.name}'s attack is nullified!`); return 0; }
    if (!atkElement) atkElement = attacker.element || null;

    // Bastion: the first enemy attack each fight is evaded
    if (G._bastionActive) {
      G._bastionActive = false;
      spawnFloat('BASTION', 'miss', 'char-portrait');
      logEntry('player-action', `🏰 Bastion: You hold the line and vanish — attack evaded!`);
      return 0;
    }

    // Misses caused by the attacker's own debuffs (Radiant flash, Smoke Screen)
    const dazzled = (attacker.status || []).find(s => s.missNext);
    if (dazzled) {
      removeStatuses(attacker, s => s === dazzled);
      spawnFloat('MISS','miss','char-portrait');
      logEntry('player-action', `${attacker.name} is dazzled and misses!`);
      return 0;
    }
    const blind = (attacker.status || []).find(s => s.id === 'smoke_blind');
    if (blind && rand(100) < (blind.missChance || 35)) {
      spawnFloat('MISS','miss','char-portrait');
      logEntry('player-action',`${attacker.name} misses through the smoke!`);
      return 0;
    }
  }

  // Element check: enemy element vs your class element
  if (atkElement) {
    const defEl  = getClassData(p.classId)?.element || 'normal';
    const elMult = getElementMult(atkElement, defEl);
    dmg = Math.round(dmg * elMult);
    const elLabel = getEffectivenessLabel(elMult);
    if (elLabel && attacker && attacker._elLoggedRound !== G.combatRound) {
      attacker._elLoggedRound = G.combatRound;
      logEntry('system', `${attacker.name}'s ${ELEMENTS[atkElement]?.name || atkElement} attacks: ${elLabel.text} against you!`);
    }
  }

  // Invulnerable status (e.g. Paladin burst: divine_aegis)
  if (hasStatus(p, 'invulnerable')) {
    spawnFloat('IMMUNE','miss','char-portrait');
    logEntry('player-action','You are invulnerable!');
    return 0;
  }

  if (attacker) {
    // Guaranteed dodges (Astral Veil)
    const veil = (p.status || []).find(s => s.dodgesRemaining > 0);
    if (veil) {
      veil.dodgesRemaining--;
      spawnFloat('EVADE','miss','char-portrait');
      logEntry('player-action','You phase out of the way!');
      if (veil.onHitDodge) veil.onHitDodge(p);
      if (veil.dodgesRemaining <= 0) removeStatuses(p, s => s === veil);
      return 0;
    }
    // Evasion — best gear chance, plus buff dodge chances/bonuses (cap 75%)
    let evasChance = 0;
    if (hasEquipEffect(p,'divinemantle'))  evasChance = Math.max(evasChance, 20);
    if (hasEquipEffect(p,'evasion_block')) evasChance = Math.max(evasChance, 20);
    if (hasEquipEffect(p,'evasion2'))      evasChance = Math.max(evasChance, 15);
    if (hasEquipEffect(p,'evasion'))       evasChance = Math.max(evasChance, 10);
    (p.status || []).forEach(s => {
      if (s.dodgeChance) evasChance = Math.max(evasChance, s.dodgeChance);
      if (s.dodgeBonus)  evasChance += s.dodgeBonus;
    });
    if (evasChance > 0 && rand(100) < Math.min(75, evasChance)) {
      spawnFloat('EVADE','miss','char-portrait');
      sfx('miss');
      logEntry('player-action','You evade the attack!');
      return 0;
    }

    // Block chance from equipment
    if ((hasEquipEffect(p,'block') || hasEquipEffect(p,'evasion_block')) && rand(100) < 10) {
      spawnFloat('BLOCK','miss','char-portrait');
      logEntry('player-action','Attack blocked!');
      return 0;
    }

    // Iron Fortress: reflects the whole hit back, consumed on use
    const fortress = (p.status || []).find(s => s.id === 'iron_fortress' && !s.defBonus);
    if (fortress) {
      const back = reflectDamage(attacker, Math.round(dmg * (fortress.counterReflect || 1.0)), null);
      removeStatuses(p, s => s === fortress);
      logEntry('player-action', `Iron Fortress REFLECTS ${back} damage back!`);
      spawnFloat('REFLECT','crit','char-portrait');
      return 0;
    }

    // Partial reflects / counters / on-hit effects (non-consuming)
    (p.status || []).slice().forEach(s => {
      if (s.reflectPct) {
        const back = reflectDamage(attacker, Math.round(dmg * (s.reflectPct / 100)), null);
        if (back > 0) logEntry('player-action', `Reflected ${back} damage back!`);
      }
      if (s.counterOnHit) {
        const back = reflectDamage(attacker, Math.round(calcDmg(p.stats.atk * s.counterOnHit, attacker.def)), null);
        if (back > 0) logEntry('player-action', `⚔️ Counter-attack for ${back}!`);
      }
      if (s.onHit) s.onHit(p, attacker);
      else if (s.id === 'magma_coat') { applyBurn(attacker, p, 3); logEntry('player-action',`Magma Coat burns ${attacker.name} for 3 stacks!`); }
    });
  }

  // Flat damage reduction buffs (cap 75%); gear Last Stand adds 25% below 25% HP
  let reduce = (p.status || []).reduce((sum, s) => sum + (s.dmgReduce || 0), 0);
  if (hasEquipEffect(p, 'laststand') && p.stats.hp < p.stats.maxHp * 0.25) reduce += 0.25;
  if (reduce > 0) dmg = Math.round(dmg * (1 - Math.min(0.75, reduce)));

  // Passive defenses (passives.js)
  dmg = passiveIncoming(p, dmg, attacker);
  if (dmg <= 0) return 0;
  // What landed on you (shield + HP). This is what the function returns, so
  // logs read "hits for 30" even when your shield soaked all of it.
  const landed = dmg;

  // Shield absorption — shield acts as HP buffer, absorbs damage first
  if (!ignoreShield && p.shield > 0) {
    const absorbed = Math.min(p.shield, dmg);
    p.shield -= absorbed; dmg -= absorbed;
    if (absorbed > 0) spawnFloat(`-${absorbed}🛡️`,'miss','char-portrait');
    if (p.shield <= 0) {
      p.shield = 0;
      // Bone Shield: backlash when the shield breaks
      const bone = (p.status || []).find(s => s.shieldBonus);
      if (bone && attacker) {
        const back = reflectDamage(attacker, bone.shieldBonus, null);
        removeStatuses(p, s => s === bone);
        logEntry('player-action', `🦴 Your shield shatters — backlash for ${back}!`);
      }
    }
  }

  if (dmg <= 0) { thornsBack(p, attacker, landed); return landed; }

  // Lethal hit: Undying talent (once per run), then lethal-save passives (once per fight)
  if (p.stats.hp - dmg <= 0) {
    if (p.undying && !p.undyingUsed) {
      p.stats.hp = 1;
      p.undyingUsed = true;
      logEntry('system', '✦ Undying — survived with 1 HP!');
      spawnFloat('UNDYING','heal','char-portrait');
      resetCombo(p);
      return landed;
    }
    if (passiveLethal(p, dmg, attacker)) {
      spawnFloat('SAVED','heal','char-portrait');
      resetCombo(p);
      return landed;
    }
  }

  p.stats.hp = Math.max(0, p.stats.hp - dmg);
  p.damageTakenCombat = (p.damageTakenCombat||0) + dmg;
  trackStat('dmgTaken', dmg);
  const hitter = attacker || G.enemy;
  if (hitter && hitter.name) p._lastHitBy = hitter.name;
  thornsBack(p, attacker, landed);
  spawnFloat(dmg.toString(),'damage','char-portrait');
  sfx('hurt');
  if (dmg >= p.stats.maxHp * 0.2) screenShake(2);

  // On-damage callbacks on buffs (e.g. slime coat: damage → MP; stone resonance: reflect)
  (p.status || []).slice().forEach(s => {
    if (s.onDamage) s.onDamage(p, dmg, attacker);
    if (s.onDamageTaken) s.onDamageTaken(p, dmg, attacker);
  });
  // Resonance Field: hits you take echo back at the attacker
  const echo = (p.status || []).find(s => s.echoOnHit);
  if (echo && attacker) reflectDamage(attacker, Math.round(dmg * echo.echoOnHit), null);

  passiveDamaged(p, dmg, attacker);

  // Blood Knight passive: vital_hunger — heal 12% of damage taken when below 50% HP
  if (p.passives && p.passives.includes('vital_hunger') && p.stats.hp > 0 && p.stats.hp / p.stats.maxHp < 0.5) {
    const steal = Math.round(dmg * 0.12);
    if (steal > 0) { p.stats.hp = Math.min(p.stats.maxHp, p.stats.hp + steal); spawnFloat(`+${steal}`,'heal','char-portrait'); }
  }

  // Taking damage resets combo (prevents tanking to build combo)
  resetCombo(p);

  return landed;
}

// Gear: Thorns — attackers take 20% of the damage they deal back (shielded
// hits included)
function thornsBack(p, attacker, landed) {
  if (!attacker || !hasEquipEffect(p, 'thorns')) return;
  const back = reflectDamage(attacker, Math.max(1, Math.round(landed * 0.2)));
  if (back > 0) logEntry('player-action', `🌹 Thorns: ${attacker.name} takes ${back} back.`);
}

// dealEnvironmentDamage — hazards outside combat (biomes). Can't be dodged,
// never kills (leaves at least 1 HP) and doesn't touch combat state.
function dealEnvironmentDamage(p, dmg) {
  if (!p || dmg <= 0) return 0;
  const before = p.stats.hp;
  p.stats.hp = Math.max(1, p.stats.hp - Math.round(dmg));
  const lost = before - p.stats.hp;
  if (lost > 0) spawnFloat(String(lost), 'damage', 'char-portrait');
  return lost;
}

// ── Combat flow ──────────────────────────────────────────────

// ── INITIATIVE SYSTEM ──────────────────────────────────────────
// Turn order is a per-round SPD contest instead of a hardcoded
// player-always-first alternation. Exactly one player action and one enemy
// action still happen per round — only the ORDER within the round is
// rolled. G._pendingSecondActor tracks who still owes an action; when the
// side that was owed finally acts, the round is complete: combatRound
// increments and resolveNextRoundInitiative() rolls fresh for the next one.
// ─────────────────────────────────────────────────────────────

// determineFirstActor — SPD-driven initiative contest for the upcoming
// round. Higher relative SPD raises the chance of acting first, but it's
// never a lock (clamped 10–90%) so a slower combatant can still open a
// round sometimes. Mirrors the existing dodge-chance formula style used
// elsewhere in this file (see the evasion check ~line 672) for consistency.
// Uses the SPD *ratio*, not the difference: player SPD grows several-fold
// over a run, and a flat difference soon pinned every fight at 90%.
function spdEdge(a, b) { return (a - b) / Math.max(1, a + b); } // -1..1
function determineFirstActor(p, e) {
  const pSpd = p.stats.spd;
  const eSpd = e.spd ?? 8;
  const pFirstChance = clamp(50 + 40 * spdEdge(pSpd, eSpd), 10, 90);
  return rand(100) < pFirstChance ? 'player' : 'enemy';
}

// Combat-log variety for basic attacks. Cosmetic, so it uses Math.random and
// never touches the run's seeded generator.
const ATTACK_LINES = ['You attack', 'You strike', 'Your blow lands', 'You cut in', 'You press the attack', 'Your strike connects'];
const CRIT_LINES   = ['Critical hit!', 'A brutal crit!', 'You find a weak point!', 'Devastating strike!'];
function pickFlavor(lines) { return lines[Math.floor(Math.random() * lines.length)]; }

// fastestEnemy — the alive enemy with the highest SPD (packs race as one side)
function fastestEnemy() {
  const alive = (G.enemies || []).filter(en => en.hp > 0);
  return alive.reduce((best, en) => (en.spd ?? 8) > (best.spd ?? 8) ? en : best, alive[0] || null);
}

// resolveNextRoundInitiative — rolls who acts first for the upcoming round
// and sets G.turn / G._pendingSecondActor accordingly. If the enemy wins
// initiative, kicks off enemyTurn() after the usual pacing delay (same
// delay used everywhere else enemy actions are scheduled). Called once from
// startCombat() to open the fight, and again at the end of every round from
// endPlayerTurn() / enemyTurn().
function resolveNextRoundInitiative() {
  const p = G.player, e = fastestEnemy();
  if (!p || !e) return;
  // Opening-round passives (Time Warp, Shadow Veil) guarantee the first move
  const forced = G.combatRound === 0 ? passiveOpening(p, G.enemies) : null;
  const first = forced || determineFirstActor(p, e);
  G._pendingSecondActor = first === 'player' ? 'enemy' : 'player';
  G.turn = first;
  if (first === 'enemy') {
    logEntry('system', `⚡ ${e.name} is faster this round and strikes first!`);
    setTimeout(enemyTurn, G._enemyTurnDelay ?? 600);
  }
}

// advanceRound — closes a round (both sides acted) and opens the next one.
// The single place combatRound changes, so round-based effects never miss.
function advanceRound() {
  G.combatRound++;
  // The Convergence: auto-reset at round 10 with double power
  const p2 = G.player;
  if (p2 && p2.classId === 'the_convergence' && G.combatRound === 10 && !hasStatus(p2, 'convergence_reset')) {
    p2._convergenceForm = 'null';
    Object.keys(p2.cooldowns||{}).forEach(k=>p2.cooldowns[k]=0);
    addStatus(p2,{id:'convergence_reset',name:'Reset ×2',type:'buff',icon:'↺',duration:4,dmgMult:2.0});
    logEntry('system','✦ THE CONVERGENCE RESETS — Round 10. All Forms double-powered for 4 turns.');
  }
  resolveNextRoundInitiative();
}

// startCombat — called from mapgen.js when player steps on enemy cell.
// Accepts either a single enemy object OR an array of enemies (a "pack" —
// see mapgen.js). Bosses/guardians are NEVER passed as an array; packs are
// regular-enemy-only, so anything boss-specific below can safely keep
// assuming a single enemy.
// Sets up G.inCombat, applies all combat-start passives and equipment effects
// G._nullSunderActive is set here for Nullbringer's anatomical_study passive
function startCombat(enemyOrEnemies) {
  const enemyList = (Array.isArray(enemyOrEnemies) ? enemyOrEnemies : [enemyOrEnemies]).filter(Boolean);
  if (!enemyList.length) return;
  // Save as the fight starts, before anything changes: closing the game
  // mid-fight restarts this fight on Continue (same enemies, same dice)
  // instead of rewinding to before it, so a lost fight can't be dodged.
  if (typeof saveCombatStart === 'function') saveCombatStart(enemyList);
  enemyList.forEach(prepareEnemy); // gives enemies a `stats` view (stats.js)
  // Remember each enemy's stats as the fight starts, so an enemy you flee
  // from goes back to normal instead of keeping this fight's buffs/debuffs.
  enemyList.forEach(en => {
    Object.defineProperty(en, '_fightStart', { value: { maxHp:en.maxHp, atk:en.atk, def:en.def, spd:en.spd }, enumerable:false, configurable:true, writable:true });
  });
  const enemy = enemyList[0]; // lead enemy — for the intro text and boss-only fields
  G.inCombat    = true;
  G.phase       = 'combat';
  G.enemies     = enemyList;
  G.targetIndex = 0;
  G.combatRound = 0;
  G.turn        = 'player';
  G._executeResistLogged = false;
  G._firstStrikeUsed = false;
  G.player.damageTakenCombat = 0;

  const p = G.player;
  const passives = p.passives || [];
  const each = fn => enemyList.forEach(fn);
  const names = enemyList.length > 1 ? 'the enemies' : enemy.name;

  // Per-fight class counters ("for this combat" mechanics) start fresh.
  // Resonance stacks carry over only with the Resonance passive.
  p._stormCharge = 0;
  p._dominionStacks = 0;
  p._executeThreshold = 0.20;
  p._convergenceForm = 'null';
  if (!passives.includes('resonance')) p._resonanceStacks = 0;
  p._resonanceStacks = Math.min(p._resonanceStacks || 0, resonanceCap(p));

  // MP regen relics — soulcrown=10/turn, mpregen2=6/turn, mpregen=3/turn
  // (Soulweaver's soul_harvest doubles it)
  const mpRate = (hasEquipEffect(p,'soulcrown') ? 10 : hasEquipEffect(p,'mpregen2') ? 6 : hasEquipEffect(p,'mpregen') ? 3 : 0)
    * (passives.includes('soul_harvest') ? 2 : 1);
  if (mpRate > 0) {
    addStatus(p, {id:'mp_regen',name:'MP Regen',type:'buff',icon:'💙',duration:999,
      onTurn:(pl)=>{ pl.stats.mp=Math.min(pl.stats.maxMp,pl.stats.mp+mpRate); }});
  }

  // HP regen gear: 2% of max HP per turn (at least 5)
  if (hasEquipEffect(p,'hpregen')) {
    addStatus(p, {id:'hp_regen_combat',name:'HP Regen',type:'buff',icon:'🌿',duration:999,
      onTurn:(pl)=>{ const h=Math.min(Math.max(5, Math.round(pl.stats.maxHp*0.02)),pl.stats.maxHp-pl.stats.hp); if(h>0){pl.stats.hp+=h;} }});
  }

  // Shield Pendant equipment: +5 shield at combat start
  if (hasEquipEffect(p,'shieldstart')) {
    p.shield = (p.shield||0) + 5;
    logEntry('player-action','⚔️ Shield Pendant grants 5 shield.');
  }

  p.divineMantleActive = hasEquipEffect(p,'divinemantle');

  // ── Class passives at combat start ─────────────────────────
  // Effects aimed at "the enemy" apply to EVERY enemy in a pack.

  // Ironclad: iron_skin — shield = 50% of DEF stat
  if (passives.includes('iron_skin')) {
    const bonusShield = Math.round(p.stats.def * 0.5);
    p.shield = (p.shield||0) + bonusShield;
    logEntry('player-action', `🛡️ Iron Skin: +${bonusShield} shield from DEF.`);
  }

  // Stormcaller: static_charge — first ability free (consumed in playerAction)
  if (passives.includes('static_charge')) {
    p.nextAbilityFree = true;
    logEntry('player-action', `⚡ Static Charge: first ability is free!`);
  }

  // Shadowblade: shadow_step — first strike guaranteed crit (consumed in playerAction)
  if (passives.includes('shadow_step')) {
    p.nextAttackGuaranteed = true;
    logEntry('player-action', `🗡️ Shadow Step: first strike guaranteed critical!`);
  }

  // Necromancer: death_aura — 2 Plague stacks on every enemy
  if (passives.includes('death_aura')) {
    each(en => applyPlague(en, p, 2));
    logEntry('player-action', `💀 Death Aura: ${names} ${enemyList.length > 1 ? 'are' : 'is'} afflicted with Plague!`);
  }

  // Paladin: sacred_aura — restore 20% max MP at combat start
  if (passives.includes('sacred_aura')) {
    const mpBonus = Math.round(p.stats.maxMp * 0.2);
    p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + mpBonus);
    logEntry('player-action', `⚜️ Sacred Aura: +${mpBonus} MP at combat start.`);
  }

  // Voidmancer: void_affinity — 1 Entropy stack on every enemy
  if (passives.includes('void_affinity')) {
    each(en => applyEntropy(en, p, 1));
    logEntry('player-action', `🌀 Void Affinity: Entropy seeps into ${names}.`);
  }

  // Runeblade: rune_mastery — +8% ATK for this fight (reset with temporary stats in endCombat)
  if (passives.includes('rune_mastery')) {
    p.stats.atk = Math.round(p.stats.atk * 1.08);
    logEntry('player-action', `🔱 Rune Mastery: ATK empowered by rune inscriptions.`);
  }

  // Abyssal One: abyssal_presence — every enemy -10% ATK
  if (passives.includes('abyssal_presence')) {
    each(en => {
      const pen = Math.round(en.atk * 0.10);
      en.atk = Math.max(1, en.atk - pen);
      addStatus(en, {id:'abyssal_dread', name:'Dread', type:'debuff', icon:'👁️', duration:999, atkPen:pen});
    });
    logEntry('player-action', `👁️ Abyssal Presence: ${names} ${enemyList.length > 1 ? 'are' : 'is'} filled with dread (-10% ATK).`);
  }

  // Nullbringer: anatomical_study — sunder damage amp (dealDmgToEnemy reads e._sunders)
  G._nullSunderActive = passives.includes('anatomical_study');
  if (G._nullSunderActive) {
    each(en => { en._sunders = en._sunders || {}; });
    logEntry('player-action', `🌑 Anatomical Study: Each Sunder applied will amplify all damage by +18%.`);
  }

  // Flags checked in dealDmgToEnemy / endPlayerTurn / playerAction
  G._combustionActive     = passives.includes('combustion');
  G._voidMasteryActive    = passives.includes('void_mastery');
  G._plagueLordActive     = passives.includes('plague_lord');
  G._stormMasteryActive   = passives.includes('storm_mastery');
  G._phaseActive          = passives.includes('phase');
  G._soulrenderActive     = p.classId === 'soulrender';
  G._arcaneMasteryActive  = passives.includes('arcane_mastery');
  G._bastionActive        = passives.includes('bastion');
  G._battleHardenedActive = passives.includes('battle_hardened');
  G._doomAuraActive       = passives.includes('doom_aura');
  G._doomAuraStacks       = 0;
  G._gustActive           = passives.includes('gust');
  G._spiritBondActive     = passives.includes('spirit_bond');
  G._stardustActive       = passives.includes('stardust');

  // Abyssal Tyrant / Dragon: intimidation — every enemy -15% ATK
  if (passives.includes('intimidation')) {
    each(en => {
      const pen = Math.round(en.atk * 0.15);
      en.atk = Math.max(1, en.atk - pen);
      addStatus(en, {id:'intimidated',name:'Intimidated',type:'debuff',icon:'😨',duration:999,atkPen:pen});
    });
    logEntry('player-action', `😨 Intimidation: ${names} ${enemyList.length > 1 ? 'are' : 'is'} shaken! -15% ATK.`);
  }

  if (G._battleHardenedActive) {
    each(en => { en._battleHardenedMark = true; });
    logEntry('player-action', `⚔️ Battle Hardened: ${names} marked — shadow strikes deal bonus damage.`);
  }

  // hex_master — every enemy: Weakness (-20% ATK) and Misfortune (-20% DEF)
  if (passives.includes('hex_master')) {
    each(en => {
      const atkPen = Math.round(en.atk * 0.20);
      const defPen = Math.round(en.def * 0.20);
      en.atk = Math.max(1, en.atk - atkPen);
      en.def = Math.max(0, en.def - defPen);
      addStatus(en, {id:'hex_weakness', name:'Weakness', type:'debuff', icon:'🔮', duration:999, atkPen});
      addStatus(en, {id:'hex_misfortune', name:'Misfortune', type:'debuff', icon:'🔮', duration:999, defPen});
    });
    logEntry('player-action', `🔮 Hex Master: ${names} cursed! -20% ATK, -20% DEF.`);
  }

  // spirit_bond — first strike: guaranteed crit with +40% damage
  if (G._spiritBondActive) {
    p.nextAttackGuaranteed = true;
    p._spiritBondFirstStrike = true;
    logEntry('player-action', `👻 Spirit Bond: Manifesting from the spirit plane — first strike enhanced.`);
  }

  // Newer passives (passives.js)
  passivesCombatStart(p, enemyList);

  if (enemy.isBoss) {
    logEntry('system', `════ BOSS BATTLE: ${enemy.name} ════`);
    screenShake(2);
    sfx('boss');
  } else if (enemyList.length > 1) {
    logEntry('system', `══ Combat begins: ${enemy.name} and ${enemyList.length-1} other${enemyList.length>2?'s':''} ══`);
  } else {
    logEntry('system', `══ Combat begins: ${enemy.name} ══`);
  }
  if (enemy.title) logEntry('enemy-action', `"${enemy.title}"`);

  // INITIATIVE: roll who opens the fight (see resolveNextRoundInitiative)
  resolveNextRoundInitiative();

  updateUI();
  // First-run tips (records.js)
  showTip('combat');
  const myEl = (getClassData(p.classId) || {}).element;
  if (!enemyList.some(en => en.isBoss || en.isGuardian) && enemyList.some(en => isHardCounter(en.element, myEl))) showTip('counter');
}

// targetEnemy — player clicks an enemy card in a pack fight (render.js's
// renderPackCombatView) to select it as the current attack target. All
// existing damage/ability/item code already reads G.enemy (the getter/
// setter alias in state.js), so retargeting is just this one assignment —
// nothing else needs to know targeting exists.
function targetEnemy(idx) {
  if (!G.inCombat || G.turn !== 'player') return;
  if (!G.enemies || !G.enemies[idx] || G.enemies[idx].hp <= 0) return;
  G.targetIndex = idx;
  updateUI();
}

// getAbilityCost — what casting this ability would cost right now
// (free-cast flags and Divine Mantle apply to MP abilities only)
function getAbilityCost(p, ab) {
  if (!ab) return Infinity;
  if (ab.costType === 'hp') return ab.cost || 0;
  if (p.nextAbilityFree || p.nextAbilityFreeCount > 0) return 0;
  return p.divineMantleActive ? Math.floor((ab.cost || 0) * 0.8) : (ab.cost || 0);
}

// canUseAbility — { ok, reason } for the UI and playerAction
function canUseAbility(p, abilityId) {
  const ab = ABILITIES[abilityId];
  if (!ab) return { ok:false, reason:'Unknown ability' };
  if (ab.costType === 'burst') return { ok:false, reason:'Bursts are used with the Burst button' };
  if ((p.cooldowns[abilityId] || 0) > 0) return { ok:false, reason:`${ab.name} on cooldown (${p.cooldowns[abilityId]} turns)` };
  // Optional per-ability check, e.g. a Sunder that is already on this enemy
  const why = ab.unusable && G.inCombat && G.enemy ? ab.unusable(p, G.enemy) : null;
  if (why) return { ok:false, reason: why };
  const cost = getAbilityCost(p, ab);
  if (ab.costType === 'hp' ? p.stats.hp <= cost + 1 : p.stats.mp < cost) {
    return { ok:false, reason: ab.costType === 'hp' ? 'Not enough HP!' : 'Not enough mana!' };
  }
  return { ok:true, cost };
}

// affinityFor — +20% when any equipped item's element matches the ability's
function affinityFor(p, ab) {
  if (!ab.element) return 1.0;
  const eq = p.equipment || {};
  return [eq.weapon, eq.armor, eq.relic].some(it => it && it.element === ab.element) ? 1.20 : 1.0;
}

// playerAction — dispatches player input during combat
// type: 'attack' | 'defend' | 'item' | 'flee' | 'burst' | 'ability'
// abilityId: required when type === 'ability'
// Called from: HTML onclick buttons, handleKeyDown (main.js)
function playerAction(type, abilityId=null) {
  if (!G.inCombat || G.turn !== 'player') return;
  const p = G.player;
  const e = G.enemy;
  if (!e) return;

  // Stunned: the turn is lost; the stun wears off as its duration ticks down
  if (p.status.some(s => s.id === 'stunned' || s.id === 'stun')) {
    logEntry('system','You are stunned and cannot act!');
    endPlayerTurn(); return;
  }

  // Per-action bookkeeping read by dealDmgToEnemy
  G._elLoggedThisAction = false;
  G._directHitsThisAction = 0;
  G._currentAbilityTags = null;
  let kind = null; // 'physical' | 'magic' — for alternating-damage passives
  let msg = '';

  if (type === 'attack') {
    kind = 'physical';
    // Arcane Mastery: a psychic strike precedes the basic attack
    if (G._arcaneMasteryActive) {
      const arcaneDmg = Math.round(calcDmg(p.stats.atk * 0.5, 0)); // ignores DEF
      dealDmgToEnemy(e, arcaneDmg, false, true, true, 'psychic');
      logEntry('player-action', `✨ Arcane Mastery: ${arcaneDmg} psychic damage precedes the strike.`);
    }
    // Doom Aura: attacking while Vanished tightens the doom mark
    const fromVanish = hasStatus(p, 'vanished');

    // Basic attack: uses p.stats.atk vs e.def, crit applies 1.5x + critDmg bonus
    const nCrit = p.nextNAttackCount > 0 && p.nextNAttackCrit;
    const isCrit    = p.nextAttackGuaranteed || nCrit ? true : rand(100) < p.stats.crit;
    if (p.nextAttackGuaranteed) p.nextAttackGuaranteed = false;
    const critMult  = 1.5 + ((p.stats.critDmg||0)/100);
    // 'piercing' equipment: -30% effective DEF; nextNAttackPierce: -50%
    const isPiercing = hasEquipEffect(p,'piercing') || (p.nextNAttackCount > 0 && p.nextNAttackPierce);
    const effectiveDef = isPiercing ? Math.round(e.def * (hasEquipEffect(p,'piercing') ? 0.7 : 0.5)) : e.def;
    let dmg = Math.round(calcDmg(p.stats.atk, effectiveDef) * (isCrit ? critMult : 1));

    // nextNAttack bonus — consume one charge
    if (p.nextNAttackCount > 0) {
      dmg = Math.round(dmg * p.nextNAttackBonus);
      p.nextNAttackCount--;
      if (p.nextNAttackCount <= 0) {
        p.nextNAttackBonus = 1.0;
        p.nextNAttackCrit  = false;
        p.nextNAttackPierce = false;
      }
    }

    // Venom: 20% chance to poison (25% and +25% damage with 2+ venom items)
    if (hasEquipEffect(p,'venom')) {
      const venomCount = Object.values(p.equipment).filter(s => s && s.effect && s.effect.split('_').includes('venom')).length;
      const dualVenom  = venomCount >= 2;
      const dmgMult    = dualVenom ? 1.25 : 1.0;
      if (rand(100) < (dualVenom ? 25 : 20)) {
        addStatus(e,{id:'poison',name:'Poison',type:'debuff',icon:'☠️',duration:3,
          onTurn:(en)=>{const pd=Math.round(p.stats.atk*0.3*dmgMult);dealDmgToEnemy(en,pd,false,true);}});
        logEntry('player-action', dualVenom ? 'Twin Venom poisons the enemy! (+25%)' : 'Venom poisons the enemy!');
      }
    }

    // Toxin Buildup: _doubleToxin charges apply plague at double stacks on hit
    if (p._doubleToxin > 0) {
      applyPlague(e, p, 2);
      p._doubleToxin--;
      logEntry('player-action', `Toxin Buildup: double poison stacks applied! (${p._doubleToxin} charges left)`);
    }

    // Weapon element used for effectiveness check (defaults to 'normal')
    const weaponEl = p.equipment?.weapon?.element || 'normal';
    const dealt = dealDmgToEnemy(e, dmg, isCrit, false, false, weaponEl);

    // Bloodlust ability effect: p.nextAttackLifesteal set by ability, consumed here
    if (p.nextAttackLifesteal) {
      const h=Math.round(dealt*0.3); p.stats.hp=Math.min(p.stats.maxHp,p.stats.hp+h);
      p.nextAttackLifesteal=false; logEntry('heal',`Bloodlust lifesteals ${h} HP.`);
    }

    addCombo(p); // increments combo counter, charges burst meter
    const mpGain = Math.max(1, Math.round(p.stats.maxMp * 0.10));
    p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + mpGain);
    msg = isCrit ? `${pickFlavor(CRIT_LINES)} ${dealt} damage. +${mpGain} MP.` : `${pickFlavor(ATTACK_LINES)} for ${dealt} damage. +${mpGain} MP.`;
    logEntry('player-action', msg);

    // Gust: the first attack each fight is too fast to counter — enemies lose their next action
    if (G._gustActive) {
      G._gustActive = false;
      G.enemies.forEach(en => { if (en.hp > 0) en._skipNextTurn = 'gust'; });
      logEntry('player-action', `💨 Gust: Strike too fast to counter — the enemy loses its next action!`);
    }

    if (G._doomAuraActive && fromVanish && e.hp > 0) {
      G._doomAuraStacks = (G._doomAuraStacks || 0) + 1;
      logEntry('player-action', `🌑 Doom Aura: Doom tightens (${G._doomAuraStacks}/3).`);
      if (G._doomAuraStacks >= 3) {
        G._doomAuraStacks = 0;
        executeEnemy(e, '🌑 Doom Aura');
        spawnFloat('DOOM', 'crit', enemyDisplayId(e));
      }
    }

  } else if (type === 'defend') {
    // Defend: shields based on DEF, +15% max MP, breaks combo and vanish
    const shield = Math.round(p.stats.def * 1.2);
    p.shield = (p.shield||0) + shield;
    const mpGain = Math.max(1, Math.round(p.stats.maxMp * 0.15));
    p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + mpGain);
    resetCombo(p);
    p.nextAttackMult = null; p.nextAttackGuaranteed = false;
    p.nextNAttackBonus = 1.0; p.nextNAttackCount = 0; p.nextNAttackCrit = false; p.nextNAttackPierce = false;
    removeStatuses(p, s => s.id === 'vanished');
    msg = `You brace! +${shield} shield, +${mpGain} MP.`;
    logEntry('player-action', msg);

  } else if (type === 'item') {
    openInventoryUse(); return; // opens inventory modal; using an item ends the turn

  } else if (type === 'flee') {
    // Bosses, guardians and secret bosses hold the way forward — no escape
    if (G.enemies.some(en => en.hp > 0 && isBossLike(en))) {
      logEntry('system', 'There is no escape — this foe bars the way forward!');
      updateUI(); return;
    }
    // Flee chance: 40% at equal SPD, better the faster you are (10–90%)
    const chance = clamp(40 + 50 * spdEdge(p.stats.spd, fastestEnemy()?.spd ?? 8), 10, 90);
    if (rand(100) < chance) {
      logEntry('system','You flee from combat!');
      trackStat('fled');
      resetCombo(p);
      // The enemies stay where they were: still wounded, but with this
      // fight's statuses and stat changes gone
      const survivors = G.enemies.filter(en => en.hp > 0);
      survivors.forEach(en => {
        en.status = [];
        if (en._fightStart) Object.assign(en, en._fightStart);
        en.hp = Math.min(en.hp, en.maxHp);
      });
      const cell = G.map[G.playerPos.y][G.playerPos.x];
      endCombat(false); // false = fled, not won
      G.phase = 'explore';
      if (survivors.length > 1) { cell.enemies = survivors; cell.enemy = null; }
      else if (survivors.length === 1) { cell.enemy = survivors[0]; delete cell.enemies; }
      cell.content = survivors.length ? 'enemy' : 'visited';
      // Step back to where you came from so you aren't standing on the enemy
      if (G._prevPlayerPos) G.playerPos = { ...G._prevPlayerPos };
      if (typeof autoSaveRun === 'function') autoSaveRun();
      updateUI(); return;
    }
    logEntry('system','Failed to flee!');
    endPlayerTurn(); return;

  } else if (type === 'burst') {
    if ((p.burstCharge||0) < BURST_THRESHOLD) { logEntry('system','Burst not ready!'); updateUI(); return; }
    const ab = ABILITIES[p.burstAbility];
    if (!ab) { logEntry('system','No burst ability!'); updateUI(); return; }
    G._weaponAffinity = affinityFor(p, ab);
    if (G._weaponAffinity > 1) logEntry('system', `⚔ ${ELEMENTS[ab.element]?.icon||''} Affinity! +20% ${ab.element} burst!`);
    G._currentAbilityMagic = !!(ab.tags && ab.tags.includes('magic'));
    G._currentAbilityTags = ab.tags || [];
    kind = G._currentAbilityMagic ? 'magic' : 'physical';
    try { msg = ab.use(p, e); }
    finally { G._currentAbilityMagic = false; G._weaponAffinity = 1.0; G._currentAbilityTags = null; }
    p.burstCharge = 0;
    p.combo = 0;
    updateComboUI();
    screenShake(2);
    logEntry('player-action', `⚡ BURST: ${msg}`);

  } else if (type === 'ability' && abilityId) {
    const ab = ABILITIES[abilityId];
    if (!ab) return;
    const check = canUseAbility(p, abilityId);
    if (!check.ok) { logEntry('system', check.reason); updateUI(); return; }
    // Pay — free-cast charges are only spent on a cast that actually happens
    if (ab.costType === 'hp') {
      p.stats.hp = Math.max(1, p.stats.hp - check.cost);
    } else {
      if (p.nextAbilityFree) { p.nextAbilityFree = false; logEntry('player-action','⚡ Static Charge: ability was free!'); }
      else if (p.nextAbilityFreeCount > 0) { p.nextAbilityFreeCount--; logEntry('player-action','✦ Ability costs no MP!'); }
      p.stats.mp -= check.cost;
    }
    G._weaponAffinity = affinityFor(p, ab);
    if (G._weaponAffinity > 1) logEntry('system', `⚔ ${ELEMENTS[ab.element]?.icon||''} Affinity! +20% ${ab.element} damage.`);

    G._currentAbilityMagic = !!(ab.tags && ab.tags.includes('magic'));
    G._currentAbilityTags = ab.tags || [];
    const damaging = ab.tags && (ab.tags.includes('physical') || ab.tags.includes('magic'));
    if (damaging) kind = G._currentAbilityMagic ? 'magic' : 'physical';
    const comboBefore = p.combo || 0;
    try { msg = ab.use(p, e); } // ability function returns a description string for the log
    finally { G._currentAbilityMagic = false; G._weaponAffinity = 1.0; G._currentAbilityTags = null; }
    if (ab.maxCooldown > 0) p.cooldowns[abilityId] = ab.maxCooldown;
    // Physical/magic abilities advance combo once. Some bump p.combo themselves
    // — that bump IS this cast's combo, so don't count it twice.
    if (damaging) {
      if ((p.combo || 0) > comboBefore) p.combo -= 1;
      addCombo(p);
    }
    // Storm Mastery: +1 extra storm charge per ability use
    if (G._stormMasteryActive) {
      p._stormCharge = (p._stormCharge || 0) + 1;
      logEntry('player-action', `⛈️ Storm Mastery: +1 Storm Charge (${p._stormCharge} total).`);
    }
    p._resonanceStacks = Math.min(p._resonanceStacks || 0, resonanceCap(p));
    passiveAbilityCast(p, abilityId);
    logEntry('player-action', msg);
  }

  passiveActionEnd(p, { kind, directHits: G._directHitsThisAction || 0 });
  checkCombatEnd();
  if (G.inCombat) endPlayerTurn();
}

// endPlayerTurn — called after every player action that doesn't end combat
// Ticks player statuses, decrements cooldowns, then resolves what happens
// next per the SPD initiative system (see resolveNextRoundInitiative()).
function endPlayerTurn() {
  if (!G.inCombat) return;
  G._stardustHits = 0; // Stardust: crit bonus resets each turn
  tickStatus(G.player); // runs onTurn callbacks and decrements duration (status.js)

  // Plague Lord: your poisons/diseases on every enemy tick an extra time
  if (G._plagueLordActive) {
    let ticks = 0;
    G.enemies.filter(en => en.hp > 0).forEach(en => (en.status || []).slice().forEach(s => {
      if (s.onTurn && (s.disease || /poison|plague|toxin|venom|rot|blight|disease|spore|pestil|virus|infect|contag|fester/.test(s.id))) {
        s.onTurn(en); ticks++;
      }
    }));
    if (ticks > 0) logEntry('player-action', `🦠 Plague Lord: diseases tick again!`);
  }
  checkCombatEnd();
  if (!G.inCombat) return; // a status tick ended the fight
  Object.keys(G.player.cooldowns).forEach(ab => { if(G.player.cooldowns[ab]>0) G.player.cooldowns[ab]--; });

  // INITIATIVE: if the enemy side hasn't acted yet this round it acts now;
  // otherwise the round is complete and a new one starts.
  if (G._pendingSecondActor === 'enemy') {
    G.turn = 'enemy';
    updateUI();
    // G._enemyTurnDelay: can be set to 0 in tests/dev for instant enemy turns
    setTimeout(enemyTurn, G._enemyTurnDelay ?? 600);
  } else {
    advanceRound();
    updateUI();
  }
}

// enemyTurn — resolves the ENTIRE enemy phase for this round: every enemy
// alive in G.enemies takes one action, in order (packs — see mapgen.js).
// G._actingEnemy marks who is attacking so reflects/misses/elements apply to
// the right enemy. Round bookkeeping runs ONCE after the whole phase.
function enemyTurn() {
  if (!G.inCombat || !G.enemies || !G.enemies.length || G.turn !== 'enemy') return;
  // A dialog is open (pause menu, weapon arts choice…) — wait for it to close
  // instead of acting behind it. This is also what makes the pause menu pause.
  if (document.getElementById('overlay').classList.contains('active')) {
    setTimeout(enemyTurn, 250);
    return;
  }

  for (let i = 0; i < G.enemies.length; i++) {
    const e = G.enemies[i];
    if (e.hp <= 0) continue; // already defeated — skip, no turn for it

    checkBossPhase(e);   // upgrades boss stats if HP thresholds were crossed
    checkBossEnrage(e);  // periodic ATK/DEF buff if enrage timer set
    checkRegularEscalation(e); // lightweight ATK ramp for long non-boss fights
    if (e._stunImmune > 0) e._stunImmune--;

    const stun = (e.status || []).find(s => s.id === 'stun' || s.id === 'stunned');
    if (e._skipNextTurn) {
      logEntry('system', e._skipNextTurn === 'gust' ? `${e.name} is still reeling from the first strike!`
        : `${e.name} can't find you in the dark!`);
      delete e._skipNextTurn;
    } else if (stun) {
      logEntry('system', `${e.name} is stunned and cannot act!`);
      if (isBossLike(e)) {
        // Bosses shake off stuns quickly and can't be stunned again right away
        removeStatuses(e, s => s.id === 'stun' || s.id === 'stunned');
        e._stunImmune = 2;
        logEntry('system', `${e.name} steadies itself — immune to stuns for 2 turns.`);
      }
    } else {
      // pickEnemyAbility (enemies.js) — HP-reactive selection within the
      // enemy's own pattern list; see its comment for the exact bias rules.
      const abId = pickEnemyAbility(e, G.player);
      e.patternIndex++;
      e._lastWasDrain = ABILITY_ROLE[abId] === 'drain';
      const abFn = ENEMY_ABILITIES[abId] || ENEMY_ABILITIES.basic;
      playSpriteAnim(enemySpriteId(e), 'attacking');
      G._actingEnemy = e;
      try { abFn(e, G.player); } // enemy ability function — defined in enemies.js
      finally { G._actingEnemy = null; }
    }
    tickStatus(e);

    checkCombatEnd();
    if (!G.inCombat) { updateUI(); return; } // fight ended mid-phase
  }

  passiveEnemyTurnEnd(G.player);

  // ── Enemy phase resolved ──
  // Close the round if the enemy side acted second; otherwise the player
  // still owes this round's action.
  if (G._pendingSecondActor === 'enemy') {
    advanceRound();
  } else {
    G.turn = 'player';
  }

  checkCombatEnd();
  updateUI();
}

// checkBossPhase — compares current HP% to phase thresholds
// e.phases = [{ threshold:0.6, atkBoost:5, newPatterns:[...], announce:'...' }, ...]
// e.currentPhase counts phases passed; a big hit can cross several at once.
function checkBossPhase(e) {
  if (!e.phases || !e.phases.length) return;
  e.currentPhase = e.currentPhase || 0;
  let changed = false;
  while (e.currentPhase < e.phases.length && e.hp / e.maxHp <= e.phases[e.currentPhase].threshold) {
    const phase = e.phases[e.currentPhase];
    e.currentPhase++;
    // ATK boosts are authored for the boss's base stats, so they scale like the
    // boss. DEF boosts stay flat: with subtractive damage a scaled DEF jump
    // would halve the player's damage late in the game.
    const ps = e._phaseScale || {};
    e.atk += Math.round((phase.atkBoost || 0) * (ps.atk || 1));
    e.def += phase.defBoost || 0;
    if (phase.newPatterns) e.patterns = phase.newPatterns;
    e.patternIndex = 0;
    logEntry('system', `⚠ ${phase.announce}`);
    changed = true;
  }
  if (changed) {
    const spriteEl = document.getElementById(enemySpriteId(e));
    if (spriteEl) { spriteEl.style.filter='brightness(3)'; setTimeout(()=>spriteEl.style.filter='',600); }
    screenShake(3);
    renderBossPhaseBar(e);
  }
}

// checkBossEnrage — periodic stat boost on a turn timer
// e.enrageTurns: interval (e.g. 5 = every 5 enemy turns)
// e.enrageCount: tracks elapsed turns
function checkBossEnrage(e) {
  if (!e.enrageTurns) return;
  e.enrageCount = (e.enrageCount||0) + 1;
  if (e.enrageCount % e.enrageTurns === 0) {
    e.atk = Math.round(e.atk * 1.2);
    e.def = Math.round(e.def * 1.2);
    logEntry('system', `🔴 ${e.enrageAnnounce || e.name + ' ENRAGES!'}`);
  }
}

// checkRegularEscalation — lightweight round-based ATK ramp for non-boss
// fights, so long encounters build tension instead of flatlining. Skipped
// entirely for anything using the boss enrage system already (isBoss /
// isGuardian / has enrageTurns set) so escalation never doubles up. Uses
// its own per-enemy counter (mirrors checkBossEnrage's e.enrageCount
// pattern above) rather than G.combatRound, since this runs once per
// enemyTurn() call — which happens exactly once per round regardless of
// which side won initiative that round.
function checkRegularEscalation(e) {
  if (e.isBoss || e.isGuardian || e.enrageTurns) return;
  e._escalationRounds = (e._escalationRounds || 0) + 1;
  if (e._escalationRounds % 5 === 0) {
    e.atk = Math.round(e.atk * 1.08);
    logEntry('system', `⏫ ${e.name} grows more dangerous the longer this fight drags on!`);
  }
}

// checkCombatEnd — called after every action to detect win/loss
function checkCombatEnd() {
  if (!G.inCombat) return;
  // Win only once EVERY enemy in the pack is dead — a single-enemy fight is
  // just a 1-element array, so this is exactly the old check in that case.
  if (G.enemies && G.enemies.length && G.enemies.every(en => en.hp <= 0)) { winCombat(); return; }
  if (G.player.stats.hp <= 0)     { gameOver(); }
}

// winCombat — handles all post-combat rewards and state cleanup
// Awards XP, gold, class XP; unlocks exit if boss/guardian; shows floor reward if boss floor
// ⚠️ Secret bosses: isSecretBoss flag triggers onSecretBossDefeated() + dynamic exit placement
//    (secret boss floors set G.exitPos=null so the exit must be placed here, not in mapgen)
function winCombat() {
  if (!G.enemies || !G.enemies.length) return;
  const allEnemies = G.enemies;
  const e = allEnemies[0]; // primary/lead enemy — safe for the boss-only
                           // fields below since packs are regular-enemy-only
                           // (mapgen.js never places a boss/guardian in one)

  // Reset Nullbringer sunder tracking for every enemy in the pack (any of
  // them could have been the target when sunders were applied) — IMPORTANT:
  // must happen before enemy objects are cleared
  G._nullSunderActive = false;
  allEnemies.forEach(en => {
    if (en._sunders) delete en._sunders;
    if (en._passiveDisabled) delete en._passiveDisabled;
  });

  // Rewards sum across the whole pack — a solo fight is just a 1-element
  // array, so this reduces to exactly the old single-enemy calculation.
  // Gear: Scholar (+25% XP), Midas (+50% gold)
  const xpGain   = Math.round(allEnemies.reduce((sum, en) => sum + en.xp, 0) * (hasEquipEffect(G.player, 'scholar') ? 1.25 : 1));
  const goldGain = Math.round(allEnemies.reduce((sum, en) => sum + randRange(en.gold[0], en.gold[1]), 0) * (hasEquipEffect(G.player, 'midas') ? 1.5 : 1));
  gainXP(xpGain);
  // Class XP: 10 base + 2 per floor, persists in G.meta.classXP (used for fusion unlock)
  const classXpGain = 10 + (G.floor * 2);
  gainClassXP(G.player.classId, classXpGain);
  G.player._classXpGained = (G.player._classXpGained || 0) + classXpGain;
  G.player.gold += goldGain;

  // Run stats & achievements (records.js)
  trackStat('kills', allEnemies.length);
  unlockAchievement('first_blood');
  if (allEnemies.length > 1) { trackStat('packs'); unlockAchievement('pack_hunter'); }
  const myEl = (getClassData(G.player.classId) || {}).element;
  if (allEnemies.some(en => isHardCounter(en.element, myEl))) unlockAchievement('against_grain');
  if (e.isBoss || e.isGuardian || e.isSecretBoss) trackStat('bosses');
  if (e.isBoss) {
    unlockAchievement('boss_slayer');
    if (!G.player.damageTakenCombat) unlockAchievement('flawless');
  }
  if (G.player.stats.hp > 0 && G.player.stats.hp < G.player.stats.maxHp * 0.05) unlockAchievement('close_call');

  if (e.isBoss) {
    const shardBonus = awardShards(Math.round(5 + G.floor));
    G.killedBoss = true;
    logEntry('reward', `★ Boss slain! +${shardBonus} Soul Shards.`);
  }
  logEntry('reward', `Victory! +${xpGain} XP, +${goldGain} gold.`);
  sfx('victory');

  // Secret boss defeated — fire reward, then place an exit in the arena
  if (e.isSecretBoss && G._pendingSecretBoss) {
    onSecretBossDefeated(G._pendingSecretBoss);
    G._pendingSecretBoss = null;
    // Arena constants: W=28, H=28, roomX=4, roomY=4, roomW=20, roomH=20
    // playerY = roomY + roomH - 3 = 21, so place exit at roomY + roomH - 2 = 22 (one row below player)
    const exitX = 14; // Math.floor(28/2)
    const exitY = 22; // roomY(4) + roomH(20) - 2, one tile below player spawn
    G.map[exitY][exitX] = { type:'floor', revealed:true, visited:true, content:'exit', room:0 };
    G.exitPos = { x:exitX, y:exitY };
    // Clear the boss cell so it doesn't keep rendering as an enemy
    if (G._secretBossCell) {
      const bc = G._secretBossCell;
      if (G.map[bc.y] && G.map[bc.y][bc.x]) {
        G.map[bc.y][bc.x].content = 'visited';
        G.map[bc.y][bc.x].enemy = null;
      }
      G._secretBossCell = null;
    }
    logEntry('system', '🔓 A rift opens in the arena floor. The abyss continues below.');
  }

  // Boss/guardian unlock exit: changes locked cell to open exit
  if ((e.isBoss || e.isGuardian) && G.exitPos) {
    const exitCell = G.map[G.exitPos.y][G.exitPos.x];
    if (exitCell.content === 'exit_locked' || exitCell.content === 'boss_exit') {
      exitCell.content = 'exit';
      logEntry('system', '🔓 The path forward has opened.');
    }
  }

  // Clear MP regen status after combat
  G.player.status = G.player.status.filter(s=>s.id!=='mp_regen');

  // Loot drop — bosses always drop guaranteed high-quality item; each
  // regular enemy in a pack gets its OWN independent loot roll (an
  // intentional reward for taking on a tougher multi-enemy encounter).
  if (e.isBoss) {
    const item = getBossLootByFloor(G.floor);
    logEntry('reward', `Boss Loot: Found ${item.name} (${item.rarity})!`);
    addToInventory(item);
  } else {
    allEnemies.forEach(en => {
      const lootChance = en.loot + (getShardShopBonuses().lootBoost || 0);
      if (rand(100) < lootChance * 100) {
        const item = getRandomItemByFloor(G.floor);
        logEntry('reward', `Loot: Found ${item.name}!`);
        addToInventory(item);
      }
    });
  }

  // Floor 50 final boss: triggers full conquest reward sequence
  if (e.isFinalBoss) {
    endCombat(true);
    G.phase = 'victory';
    clearActiveRunSave();
    triggerConquestReward();
    recordRunEnd('conquered');
    return;
  }

  // Boss floors (BOSS_FLOORS array in data): show item choice reward
  if (e.isBoss && BOSS_FLOORS.includes(G.floor)) {
    endCombat(true);
    G.phase = 'explore';
    G.map[G.playerPos.y][G.playerPos.x].content = 'visited';
    showFloorReward(); // in modals.js — shows 3-item choice modal
    checkAchievements();
    if (typeof autoSaveRun === 'function') autoSaveRun(); // the choice survives a reload
    return;
  }

  endCombat(true);
  G.phase = 'explore';
  G.map[G.playerPos.y][G.playerPos.x].content = 'visited';
  checkAchievements();
  if (typeof autoSaveRun === 'function') autoSaveRun();
  updateUI();
  if (G.player.stats.hp < G.player.stats.maxHp * 0.35) showTip('lowhp');
}

// endCombat — final cleanup of combat state
// won=true: clear combat statuses, keep shield=0
// won=false (fled): clear ALL statuses including debuffs
function endCombat(won) {
  G.inCombat = false;
  G.turn     = 'player';
  G.enemy    = null;
  G.player.combo = 0;
  G.player.burstCharge = 0;
  G.player._doubleToxin = 0;
  // Clear per-combat passive flags so they don't bleed between fights
  G._combustionActive  = false;
  G._voidMasteryActive = false;
  G._plagueLordActive  = false;
  G._stormMasteryActive = false;
  G._phaseActive       = false;
  G._soulrenderActive  = false;
  G._nullSunderActive  = false;
  G._arcaneMasteryActive  = false;
  G._battleHardenedActive = false;
  G._bastionActive        = false;
  G._doomAuraActive       = false;
  G._doomAuraStacks       = 0;
  G._gustActive           = false;
  G._spiritBondActive     = false;
  G._stardustActive       = false;
  G._stardustHits         = 0;
  G._actingEnemy          = null;
  G._passiveState         = {};
  G._currentAbilityTags   = null;
  G.player.nextAbilityFree = false;
  G.player.nextAttackMult  = null;
  G.player.shield = 0;
  // Every buff/debuff ends with the fight and live stats snap back to the
  // permanent base (status.js / stats.js) — nothing temporary can leak.
  clearCombatStatuses(G.player);
}

// ── Boss phase UI ────────────────────────────────────────────

// renderBossPhaseBar — renders pip indicators below boss HP bar
// Shows phase number dots; active=gold, done=red, upcoming=grey
function renderBossPhaseBar(e) {
  const el = document.getElementById('boss-phase-bar');
  if (!el || !e) return;
  if (!e.phases || !e.isBoss) { el.style.display='none'; return; }
  el.style.display = '';
  const phase = e.currentPhase;
  const total = e.phases.length + 1;
  el.innerHTML = Array.from({length:total},(_,i)=>{
    const active = i === phase;
    const done   = i < phase;
    return `<div class="phase-pip ${done?'done':''} ${active?'active':''}">${i+1}</div>`;
  }).join('') + `<span style="margin-left:0.5rem;font-size:0.65rem;color:var(--text-dim)">${
    phase < e.phases.length ? e.phases[phase]?.name || `Phase ${phase+1}` : 'Final Phase'
  }</span>`;
}

// ── Conquest reward (Floor 50) ───────────────────────────────

// triggerConquestReward — called when final boss dies
// Unlocks abyssal_one class, conquest title, permanent gear, NG+
// One-time shard bonus protected by shardDumpClaimed flag
function triggerConquestReward() {
  const m = G.meta;
  const firstTime = !m.conquestRewards.conquered;
  if (firstTime) {
    m.conquestRewards.conquered = true;
    m.conquestRewards.title = true;
    m.conquestRewards.permanentGear = 'abyssal_crown';
    m.conquestRewards.ngPlusUnlocked = true;
    if (!m.conquestRewards.shardDumpClaimed) {
      awardShards(150, true); // one-time reward, not scaled by difficulty
      m.conquestRewards.shardDumpClaimed = true;
    }
    if (!m.unlockedClasses.includes('abyssal_one')) {
      m.unlockedClasses.push('abyssal_one');
    }
    if (!m.unlockedFusions) m.unlockedFusions = [];
    if (!m.unlockedFusions.includes('abyssal_one')) {
      m.unlockedFusions.push('abyssal_one');
    }
    saveMeta();
  }
  checkAchievements();
  showConquestModal(firstTime);
}

function showConquestModal(firstTime) {
  const m = G.meta;
  if (!firstTime) {
    showModal(`
      <div class="modal-title" style="color:#9900ff;text-shadow:0 0 20px #9900ff88">⚜ THE ABYSS FALLS AGAIN ⚜</div>
      <div style="text-align:center;font-style:italic;color:var(--text-mid);margin:1rem 0;line-height:1.8">
        "${m.ngPlus > 0 ? `NG+${m.ngPlus} conquered.` : 'Conquered once more.'} The Abyssal God remembers you."
      </div>
      <button class="title-btn primary" style="width:100%;margin-top:0.5rem;background:var(--accent-violet)" onclick="closeModal();returnToTitle();showNGPlusModal()">🔄 Begin NG+${m.ngPlus + 1}</button>
      <button class="title-btn" style="width:100%;margin-top:0.4rem" onclick="closeModal();returnToTitle()">Return to the Surface</button>`, false);
    return;
  }
  const html = `
    <div class="modal-title" style="color:#9900ff;text-shadow:0 0 20px #9900ff88">⚜ THE ABYSS IS CONQUERED ⚜</div>
    <div style="text-align:center;font-style:italic;color:var(--text-mid);margin:1rem 0;line-height:1.8">
      "You have seen the bottom of the Abyss.<br>You have looked into the Abyssal God.<br>And you are still here."
    </div>
    <div style="display:flex;flex-direction:column;gap:0.5rem;margin:1rem 0">
      <div class="shop-item" style="border-color:#9900ff;cursor:default">
        <div class="shop-item-info"><div class="item-name">👁️ Abyssal One</div><div style="font-size:0.68rem;color:var(--text-dim);font-style:italic">New class unlocked — the ultimate form.</div></div>
      </div>
      <div class="shop-item" style="border-color:var(--accent-gold);cursor:default">
        <div class="shop-item-info"><div class="item-name">👑 Crown of the Abyss</div><div style="font-size:0.68rem;color:var(--text-dim);font-style:italic">Permanent legendary relic — carries into every future run.</div></div>
      </div>
      <div class="shop-item" style="border-color:var(--accent-teal-bright);cursor:default">
        <div class="shop-item-info"><div class="item-name">✦ Title: Conqueror of the Abyss</div><div style="font-size:0.68rem;color:var(--text-dim);font-style:italic">Displayed on the main menu forever.</div></div>
      </div>
      <div class="shop-item" style="border-color:var(--accent-violet-bright);cursor:default">
        <div class="shop-item-info"><div class="item-name">🔄 New Game+ Unlocked</div><div style="font-size:0.68rem;color:var(--text-dim);font-style:italic">Enemies scale harder each NG+ cycle. Can you do it again?</div></div>
      </div>
      <div class="shop-item" style="border-color:var(--accent-gold-dim);cursor:default">
        <div class="shop-item-info"><div class="item-name">⚗ +150 Soul Shards</div><div style="font-size:0.68rem;color:var(--text-dim);font-style:italic">One-time conquest reward.</div></div>
      </div>
    </div>
    <button class="title-btn primary" style="width:100%;margin-top:0.5rem" onclick="closeModal();returnToTitle()">Return to the Surface</button>`;
  showModal(html, false);
}
