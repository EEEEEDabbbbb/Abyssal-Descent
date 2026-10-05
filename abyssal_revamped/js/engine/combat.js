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

// dealDmgToEnemy — main outgoing damage function
// Called by: attack, abilities, DoTs, Nullbringer sunders
// Parameters:
//   e         — enemy object
//   dmg       — raw damage before multipliers
//   isCrit    — boolean; plays crit float if true
//   isDot     — boolean; skips combo mult, weapon affinity, animations if true
//   isMagic   — boolean; uses getMagicDmgMult instead of getDmgMult
//   atkElement — override element (defaults to class element for magic, 'normal' for physical)
function dealDmgToEnemy(e, dmg, isCrit, isDot=false, isMagic=false, atkElement=null) {
  if (!e) return 0;
  const p     = G.player;
  const magic = isMagic || !!G._currentAbilityMagic; // G._currentAbilityMagic set in playerAction() ability branch
  let mult    = magic ? getMagicDmgMult(p) : getDmgMult(p);

  // Weapon affinity bonus (+20% when weapon element matches ability element)
  // G._weaponAffinity is set in playerAction() ability/burst branches, reset after use
  if (!isDot && G._weaponAffinity && G._weaponAffinity !== 1.0) {
    mult *= G._weaponAffinity;
  }

  // Element effectiveness — looks up ELEMENTS table
  // For magic: uses class element. For physical: 'normal'. Can be overridden by atkElement param.
  const atkEl  = atkElement || (magic ? (getClassData(p.classId)?.element||'normal') : 'normal');
  const defEl  = e.element || 'normal';
  const elMult = getElementMult(atkEl, defEl); // defined in elements.js
  mult *= elMult;

  // Combo multiplier: +10% per combo stack (getComboMult in utils.js)
  // DoTs don't benefit from combo so they can't be exploited with defend-spam
  if (!isDot) mult *= getComboMult(p);

  // Nullbringer: anatomical_study passive — +18% dmg per active Sunder on this enemy
  // G._nullSunderActive set in startCombat() if player has anatomical_study passive
  // e._sunders tracks which sunders are active: { flesh, will, form, time, existence }
  if (G._nullSunderActive && e._sunders) {
    const sunderCount = Object.keys(e._sunders).length;
    if (sunderCount > 0) mult *= (1 + sunderCount * 0.18);
  }

  // ── PER-COMBAT PASSIVE FLAGS ──────────────────────────────────────
  // These G._ flags are set at combat start (startCombat) and cleared
  // in endCombat(). They're checked in dealDmgToEnemy, endPlayerTurn etc.
  // ⚠️  Always add new flags to the endCombat() cleanup block or they'll
  //     bleed into the next fight.
  //
  //   G._combustionActive     — Pyromancer: +25% dmg when enemy has Burn
  //   G._voidMasteryActive    — Voidreaper/Convergence: void/shadow +20% dmg
  //   G._plagueLordActive     — Plagueborn: diseases tick on player turn too
  //   G._stormMasteryActive   — Stormlord: +1 storm charge per ability
  //   G._phaseActive          — The Unnamed: 25% chance to bypass all DEF
  //   G._soulrenderActive     — Soulrender: >90%HP +40% dmg, <30%HP lifesteal×3
  //   G._nullSunderActive     — Nullbringer: anatomical_study sunder damage amp
  //   G._arcaneMasteryActive  — Fusion: deals bonus psychic dmg before each strike
  //   G._battleHardenedActive — Fusion: shadow strikes vs marked enemy +20% dmg
  //   G._bastionActive        — Fusion: first incoming attack evaded
  //   G._doomAuraActive       — Fusion: vanish builds doom stacks, 3 stacks = execute
  //   G._gustActive           — Fusion: first strike cannot be counterattacked
  //   G._spiritBondActive     — Fusion: first strike +40% dmg, cannot miss
  //   G._stardustActive       — Fusion: +5% crit per hit in a turn
  // ─────────────────────────────────────────────────────────────────

  // Combustion (Pyromancer): +25% damage when enemy has any Burn status
  if (G._combustionActive && G.enemy) {
    const hasBurn = (G.enemy.status||[]).some(s => s.id==='burn'||s.id==='burning'||s.id==='ignite'||s.id==='fire_dot'||s.id==='combustion');
    if (hasBurn) mult *= 1.25;
  }

  // Void Mastery (Voidreaper/Convergence): void/shadow abilities +20% damage
  if (G._voidMasteryActive && (atkElement==='void'||atkElement==='shadow'||atkElement==='dark')) {
    mult *= 1.20;
  }

  // Soulrender high-HP bonus: above 90% HP, +40% damage
  if (G._soulrenderActive && G.player) {
    const hpPct = G.player.stats.hp / G.player.stats.maxHp;
    if (hpPct >= 0.90) mult *= 1.40;
    // Lifesteal triple at low HP handled after damage is dealt
  }

  // Battle Hardened (fusion): shadow/dark strikes vs marked enemy +20% damage
  if (G._battleHardenedActive && e._battleHardenedMark &&
      (atkElement==='shadow'||atkElement==='dark'||atkElement==='void')) {
    mult *= 1.20;
  }

  // Spirit Bond (fusion): first strike +40% damage
  if (G._spiritBondActive && p && p._spiritBondFirstStrike) {
    mult *= 1.40;
    p._spiritBondFirstStrike = false;
  }

  // Stardust (fusion): each hit in a turn adds 5% crit chance (tracked via G._stardustHits)
  if (G._stardustActive && !isDot) {
    G._stardustHits = (G._stardustHits || 0) + 1;
    const stardustCritBonus = G._stardustHits * 5;
    if (rand(100) < stardustCritBonus) {
      mult *= 1.5;
      spawnFloat('STARDUST CRIT', 'crit', 'enemy-display');
    }
  }

  let finalDmg = Math.round(dmg * mult);

  // Phase (The Unnamed): 25% chance to ignore DEF entirely
  // dmg was already calculated with DEF applied — we boost by the DEF reduction ratio
  if (G._phaseActive && !isDot && G.enemy && rand(100) < 25) {
    const rawDmg = Math.round(dmg * mult); // with DEF
    const defBoost = G.enemy.def > 0 ? (1 + G.enemy.def / (G.enemy.def + 20)) : 1; // approximate DEF bypass gain
    finalDmg = Math.round(rawDmg * defBoost);
    spawnFloat('PHASE', 'crit', 'enemy-display');
    logEntry('player-action', `　 Phase: strike bypasses all DEF!`);
  }

  // Vanish (Shadowblade ability) — next attack gets bonus mult then vanish clears
  const vanish = p && p.status && p.status.find(s=>s.id==='vanished');
  if (vanish && p.nextAttackMult) {
    finalDmg = Math.round(finalDmg * p.nextAttackMult);
    p.nextAttackMult = null;
    p.status = p.status.filter(s=>s.id!=='vanished');
  }

  e.hp = Math.max(0, e.hp - finalDmg);

  // Soulrender: below 30% HP, lifesteal triples (adds on top of equipment lifesteal)
  if (G._soulrenderActive && G.player && !isDot) {
    const hpPct = G.player.stats.hp / G.player.stats.maxHp;
    if (hpPct < 0.30) {
      const tripleHeal = Math.round(finalDmg * 0.45); // 3× the base 15%
      G.player.stats.hp = Math.min(G.player.stats.maxHp, G.player.stats.hp + tripleHeal);
    }
  }

  // Lifesteal equipment effects — heals 15% of damage dealt
  if (!isDot && (hasEquipEffect(p,'lifesteal') || hasEquipEffect(p,'soulcrown'))) {
    const heal = Math.round(finalDmg * 0.15);
    p.stats.hp = Math.min(p.stats.maxHp, p.stats.hp + heal);
  }

  // Visual feedback — only for direct hits, not DoTs
  if (!isDot) {
    const el = document.getElementById('enemy-sprite');
    if (el) { el.classList.remove('hurt','attacking','dead'); void el.offsetWidth; el.classList.add('hurt'); }
    spawnFloat(finalDmg.toString(), isCrit ? 'crit' : 'damage', 'enemy-display');

    // Show "SUPER EFFECTIVE" / "NOT VERY EFFECTIVE" label if element matters
    const elLabel = getEffectivenessLabel(elMult);
    if (elLabel) logEntry('system', `${elLabel.text} (${ELEMENTS[atkEl]?.icon||''}${ELEMENTS[defEl]?.icon||''})`);
  }

  return finalDmg;
}

// dealDmgToPlayer — all incoming damage routes through here
// Handles: difficulty scaling, element effectiveness vs player, smoke screen miss,
//          evasion, invulnerability, block, Iron Fortress reflect, Magma Coat burn,
//          shield absorption, Undying talent, Blood Knight lifesteal, combo reset
function dealDmgToPlayer(rawDmg, ignoreShield=false, atkElement=null) {
  const p  = G.player;
  let   dmg = Math.max(1, rawDmg);

  // Bastion (fusion): evade the very first incoming attack each combat
  if (G._bastionActive) {
    G._bastionActive = false;
    spawnFloat('BASTION', 'miss', 'char-portrait');
    logEntry('player-action', `🏰 Bastion: You hold the line and vanish — attack evaded!`);
    return 0;
  }

  // Nightmare/Hard difficulty increases incoming damage
  dmg = Math.round(dmg * getDifficultyMult());

  // Element check: enemy element vs player's class element
  if (atkElement) {
    const defEl  = getClassData(p.classId)?.element || 'normal';
    const elMult = getElementMult(atkElement, defEl);
    dmg = Math.round(dmg * elMult);
    const elLabel = getEffectivenessLabel(elMult);
    if (elLabel) logEntry('system', `Enemy element ${elLabel.text} against you!`);
  }

  // Smoke screen (Shadowblade ability): 35% chance enemy misses entirely
  if (G.enemy) {
    const blind = G.enemy.status && G.enemy.status.find(s=>s.id==='smoke_blind');
    if (blind && rand(100) < (blind.missChance||35)) {
      spawnFloat('MISS','miss','char-portrait');
      logEntry('player-action',`${G.enemy.name} misses through the smoke!`);
      return 0;
    }
  }

  // Evasion — check equipment effects, take highest applicable %
  // divinemantle=20%, evasion_block=20%, evasion2=15%, evasion=10%
  let evasChance = 0;
  if (hasEquipEffect(p,'divinemantle')) evasChance = Math.max(evasChance, 20);
  if (hasEquipEffect(p,'evasion_block')) evasChance = Math.max(evasChance, 20);
  if (hasEquipEffect(p,'evasion2'))      evasChance = Math.max(evasChance, 15);
  if (hasEquipEffect(p,'evasion'))       evasChance = Math.max(evasChance, 10);
  // Status-based dodge chance (dodgeChance field on buff status)
  if (p.status) {
    p.status.forEach(s => { if (s.dodgeChance) evasChance = Math.max(evasChance, s.dodgeChance); });
  }
  if (evasChance > 0 && rand(100) < evasChance) {
    spawnFloat('EVADE','miss','char-portrait');
    logEntry('player-action','You evade the attack!');
    return 0;
  }

  // Invulnerable status (Paladin burst: divine_aegis)
  if (p.status && p.status.find(s=>s.id==='invulnerable')) {
    spawnFloat('IMMUNE','miss','char-portrait');
    logEntry('player-action','You are invulnerable!');
    return 0;
  }

  // Block chance from equipment (10% if block or evasion_block equipped)
  const blockChance = (hasEquipEffect(p,'block') || hasEquipEffect(p,'evasion_block')) ? 10 : 0;
  if (blockChance > 0 && rand(100) < blockChance) {
    spawnFloat('BLOCK','miss','char-portrait');
    logEntry('player-action','Attack blocked!');
    return 0;
  }

  // Iron Fortress (Ironclad ability): reflects 100% of damage back, consumed on use
  const fortress = p.status && p.status.find(s=>s.id==='iron_fortress');
  if (fortress) {
    const reflectDmg = Math.round(dmg * (fortress.counterReflect||1.0));
    p.status = p.status.filter(s=>s.id!=='iron_fortress');
    p.counterReflect = 0;
    if (G.enemy) {
      dealDmgToEnemy(G.enemy, reflectDmg, false, false, false, null);
      logEntry('player-action', `Iron Fortress REFLECTS ${reflectDmg} damage back!`);
      spawnFloat('REFLECT','crit','char-portrait');
    }
    return 0;
  }

  // Status-based reflect (reflectPct field) — reflects a % of damage back, non-consuming
  if (p.status && G.enemy) {
    const reflectStatus = p.status.find(s => s.reflectPct);
    if (reflectStatus) {
      const reflectDmg = Math.round(dmg * (reflectStatus.reflectPct / 100));
      if (reflectDmg > 0) {
        dealDmgToEnemy(G.enemy, reflectDmg, false, false, false, null);
        logEntry('player-action', `Reflected ${reflectDmg} damage back!`);
        spawnFloat('REFLECT','crit','char-portrait');
      }
    }
  }

  // Magma Coat (Pyromancer ability): burn attacker when hit
  const magmaCoat = p.status && p.status.find(s=>s.id==='magma_coat');
  if (magmaCoat && G.enemy) {
    applyBurn(G.enemy, p, 3);
    logEntry('player-action',`Magma Coat burns ${G.enemy.name} for 3 stacks!`);
  }

  // Shield absorption — shield acts as HP buffer, absorbs damage first
  if (!ignoreShield && p.shield > 0) {
    const absorbed = Math.min(p.shield, dmg);
    p.shield -= absorbed; dmg -= absorbed;
    if (absorbed > 0) spawnFloat(`-${absorbed}🛡️`,'miss','char-portrait');
    if (p.shield <= 0) p.shield = 0;
  }

  if (dmg <= 0) return 0;

  // Undying talent — survives lethal blow once per run with 1 HP
  // p.undying set in createPlayer() based on meta talent; p.undyingUsed resets on new run
  if (p.undying && !p.undyingUsed && p.stats.hp - dmg <= 0) {
    p.stats.hp = 1;
    p.undyingUsed = true;
    logEntry('system', '✦ Undying — survived with 1 HP!');
    spawnFloat('UNDYING','heal','char-portrait');
    resetCombo(p);
    return dmg;
  }

  p.stats.hp = Math.max(0, p.stats.hp - dmg);
  p.damageTakenCombat = (p.damageTakenCombat||0) + dmg;
  spawnFloat(dmg.toString(),'damage','char-portrait');

  // Blood Knight passive: vital_hunger — lifesteal 12% of damage taken when below 50% HP
  if (p.passives && p.passives.includes('vital_hunger') && p.stats.hp / p.stats.maxHp < 0.5) {
    const steal = Math.round(dmg * 0.12);
    if (steal > 0) { p.stats.hp = Math.min(p.stats.maxHp, p.stats.hp + steal); spawnFloat(`+${steal}`,'heal','char-portrait'); }
  }

  // Taking damage resets combo (prevents tanking to build combo)
  resetCombo(p);

  return dmg;
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
function determineFirstActor(p, e) {
  const pSpd = p.stats.spd;
  const eSpd = e.spd || 8;
  const pFirstChance = clamp(50 + (pSpd - eSpd) * 2, 10, 90);
  return rand(100) < pFirstChance ? 'player' : 'enemy';
}

// resolveNextRoundInitiative — rolls who acts first for the upcoming round
// and sets G.turn / G._pendingSecondActor accordingly. If the enemy wins
// initiative, kicks off enemyTurn() after the usual pacing delay (same
// delay used everywhere else enemy actions are scheduled). Called once from
// startCombat() to open the fight, and again at the end of every round from
// endPlayerTurn() / enemyTurn().
function resolveNextRoundInitiative() {
  const p = G.player, e = G.enemy;
  if (!p || !e) return;
  const first = determineFirstActor(p, e);
  G._pendingSecondActor = first === 'player' ? 'enemy' : 'player';
  G.turn = first;
  if (first === 'enemy') {
    logEntry('system', `⚡ ${e.name} is faster this round and strikes first!`);
    setTimeout(enemyTurn, G._enemyTurnDelay ?? 600);
  }
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
  enemyList.forEach(prepareEnemy); // gives enemies a `stats` view (stats.js)
  const enemy = enemyList[0]; // primary/lead enemy — used below for the single-target
                              // pre-combat passives (curse/mark/debuff-on-start effects)
                              // and for boss-only fields (isBoss/title/etc.)
  G.inCombat    = true;
  G.phase       = 'combat';
  G.enemies     = enemyList;
  G.targetIndex = 0;
  G.combatRound = 0;
  G.turn        = 'player';
  G.player.damageTakenCombat = 0;

  const p = G.player;

  // Clear stale mp_regen from previous combat before adding a fresh one
  p.status = p.status.filter(s => s.id !== 'mp_regen');

  // MP regen relics — checked by equipment effect tokens
  // soulcrown=10/turn, mpregen2=6/turn, mpregen=3/turn
  const mpRate = hasEquipEffect(p,'soulcrown') ? 10
    : hasEquipEffect(p,'mpregen2') ? 6
    : hasEquipEffect(p,'mpregen')  ? 3 : 0;
  if (mpRate > 0) {
    addStatus(p, {id:'mp_regen',name:'MP Regen',type:'buff',icon:'💙',duration:999,
      onTurn:(pl)=>{ pl.stats.mp=Math.min(pl.stats.maxMp,pl.stats.mp+mpRate); }});
  }

  // HP regen (jade amulet, bark armor equipment)
  p.status = p.status.filter(s => s.id !== 'hp_regen_combat');
  if (hasEquipEffect(p,'hpregen')) {
    addStatus(p, {id:'hp_regen_combat',name:'HP Regen',type:'buff',icon:'🌿',duration:999,
      onTurn:(pl)=>{ const h=Math.min(5,pl.stats.maxHp-pl.stats.hp); if(h>0){pl.stats.hp+=h;} }});
  }

  // Shield Pendant equipment: +5 shield at combat start
  if (hasEquipEffect(p,'shieldstart')) {
    p.shield = (p.shield||0) + 5;
    logEntry('player-action','⚔️ Shield Pendant grants 5 shield.');
  }

  p.divineMantleActive = hasEquipEffect(p,'divinemantle');

  // ── Class passives at combat start ─────────────────────────
  // Each passive listed here corresponds to a class defined in classes.js
  const passives = p.passives || [];

  // Ironclad: iron_skin — shield = 50% of DEF stat
  if (passives.includes('iron_skin')) {
    const bonusShield = Math.round(p.stats.def * 0.5);
    p.shield = (p.shield||0) + bonusShield;
    logEntry('player-action', `🛡️ Iron Skin: +${bonusShield} shield from DEF.`);
  }

  // Stormcaller: static_charge — p.nextAbilityFree flag consumed in playerAction() ability branch
  if (passives.includes('static_charge')) {
    p.nextAbilityFree = true;
    logEntry('player-action', `⚡ Static Charge: first ability is free!`);
  }

  // Shadowblade: shadow_step — p.nextAttackGuaranteed consumed in playerAction() attack branch
  if (passives.includes('shadow_step')) {
    p.nextAttackGuaranteed = true;
    logEntry('player-action', `🗡️ Shadow Step: first strike guaranteed critical!`);
  }

  // Necromancer: death_aura — applies 2 plague stacks via applyPlague() in utils.js
  if (passives.includes('death_aura') && G.enemy) {
    applyPlague(G.enemy, p, 2);
    logEntry('player-action', `💀 Death Aura: ${G.enemy.name} is afflicted with Plague!`);
  }

  // Paladin: sacred_aura — +20% max MP at combat start
  if (passives.includes('sacred_aura')) {
    const mpBonus = Math.round(p.stats.maxMp * 0.2);
    p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + mpBonus);
    logEntry('player-action', `⚜️ Sacred Aura: +${mpBonus} MP at combat start.`);
  }

  // Soulweaver: soul_harvest — doubles existing mp_regen rate if active
  if (passives.includes('soul_harvest') && mpRate > 0) {
    const existing = p.status.find(s => s.id === 'mp_regen');
    if (existing) { existing.onTurn = (pl) => { pl.stats.mp = Math.min(pl.stats.maxMp, pl.stats.mp + mpRate * 2); }; }
  }

  // Voidmancer: void_affinity — 1 entropy stack on enemy at start
  if (passives.includes('void_affinity') && G.enemy) {
    applyEntropy(G.enemy, p, 1);
    logEntry('player-action', `🌀 Void Affinity: Entropy seeps into ${G.enemy.name}.`);
  }

  // Runeblade: rune_mastery — +8% ATK for this fight (reset with all temporary stats in endCombat)
  if (passives.includes('rune_mastery')) {
    p.stats.atk = Math.round(p.stats.atk * 1.08);
    logEntry('player-action', `🔱 Rune Mastery: ATK empowered by rune inscriptions.`);
  }

  // Abyssal One: abyssal_presence — enemy ATK penalized 10% at start
  if (passives.includes('abyssal_presence') && G.enemy) {
    const pen = Math.round(G.enemy.atk * 0.10);
    G.enemy.atk = Math.max(1, G.enemy.atk - pen);
    addStatus(G.enemy, {id:'abyssal_dread', name:'Dread', type:'debuff', icon:'👁️', duration:999, atkPen:pen});
    logEntry('player-action', `👁️ Abyssal Presence: ${G.enemy.name} is filled with dread (-${pen} ATK).`);
  }

  // Nullbringer: anatomical_study — G._nullSunderActive flag enables sunder bonus in dealDmgToEnemy
  // e._sunders tracks which of the 5 sunders are applied to the current enemy
  if (passives.includes('anatomical_study')) {
    G._nullSunderActive = true;
    G.enemy._sunders = G.enemy._sunders || {};
    logEntry('player-action', `🌑 Anatomical Study: Each Sunder applied will amplify all damage by +18%.`);
  }

  // Pyromancer: combustion — all damage +25% when enemy has any Burn status
  // Implemented as a flag checked in dealDmgToEnemy
  G._combustionActive = passives.includes('combustion');

  // Voidreaper/Convergence: void_mastery — void/shadow abilities +20% damage, execute threshold +5%
  G._voidMasteryActive = passives.includes('void_mastery');
  if (passives.includes('void_mastery')) {
    logEntry('player-action', `🌑 Void Mastery: Void/shadow abilities +20% damage. Execute threshold +5%.`);
  }

  // Plagueborn: plague_lord — diseases tick on both player AND enemy turn (double rate)
  // Handled in endPlayerTurn via G._plagueLordActive flag
  G._plagueLordActive = passives.includes('plague_lord');
  if (passives.includes('plague_lord')) {
    logEntry('player-action', `🦠 Plague Lord: All diseases tick at double rate.`);
  }

  // Stormlord: storm_mastery — storm charges gained +1 extra per ability (tracked in ability use)
  G._stormMasteryActive = passives.includes('storm_mastery');
  if (passives.includes('storm_mastery')) {
    logEntry('player-action', `⛈️ Storm Mastery: +1 extra Storm Charge per ability.`);
  }

  // Abyssal Tyrant / Dragon: intimidation — additional -15% enemy ATK at combat start
  if (passives.includes('intimidation') && G.enemy) {
    const pen = Math.round(G.enemy.atk * 0.15);
    G.enemy.atk = Math.max(1, G.enemy.atk - pen);
    addStatus(G.enemy, {id:'intimidated',name:'Intimidated',type:'debuff',icon:'😨',duration:999,atkPen:pen});
    logEntry('player-action', `😨 Intimidation: ${G.enemy.name} is shaken! -${pen} ATK.`);
  }

  // The Unnamed: phase — 25% chance per hit to completely ignore enemy DEF
  // Handled as a flag in dealDmgToEnemy
  G._phaseActive = passives.includes('phase');
  if (passives.includes('phase')) {
    logEntry('player-action', `　 Phase: 25% chance each hit ignores all DEF.`);
  }

  // Soulrender: vital_hunger (high HP bonus) is already checked in dealDmgToEnemy
  // Additional soulrender passive: above 90% HP, +40% damage; below 30% HP, lifesteal triples
  G._soulrenderActive = passives.includes('soul_harvest') && passives.includes('undying');

  // ── Fusion passives ─────────────────────────────────────────

  // arcane_mastery — arcane pre-strike: deals bonus psychic damage before each physical hit
  // Implemented as a flag checked in dealDmgToEnemy
  G._arcaneMasteryActive = passives.includes('arcane_mastery');
  if (passives.includes('arcane_mastery')) {
    logEntry('player-action', `✨ Arcane Mastery: Arcane damage precedes every strike.`);
  }

  // bastion — first enemy attack each combat is evaded entirely (the "vanish while holding the line")
  G._bastionActive = passives.includes('bastion');
  if (passives.includes('bastion')) {
    logEntry('player-action', `🏰 Bastion: First incoming attack will be evaded.`);
  }

  // battle_hardened — marks enemy at combat start; shadow strikes vs marked targets +20% damage
  G._battleHardenedActive = passives.includes('battle_hardened');
  if (passives.includes('battle_hardened') && G.enemy) {
    G.enemy._battleHardenedMark = true;
    logEntry('player-action', `⚔️ Battle Hardened: ${G.enemy.name} is marked — shadow strikes deal bonus damage.`);
  }

  // doom_aura — each vanish tightens a doom mark; at 3 stacks next strike is an execute
  G._doomAuraActive = passives.includes('doom_aura');
  G._doomAuraStacks = 0;
  if (passives.includes('doom_aura')) {
    logEntry('player-action', `🌑 Doom Aura: Vanishing builds doom stacks. At 3 — execute.`);
  }

  // gust — first strike cannot be counterattacked (enemy skips retaliation on turn 1)
  G._gustActive = passives.includes('gust');
  if (passives.includes('gust')) {
    logEntry('player-action', `💨 Gust: First strike is too fast to counter.`);
  }

  // hex_master — applies Weakness (-20% ATK) and Misfortune (-20% DEF) to enemy at combat start
  if (passives.includes('hex_master') && G.enemy) {
    const atkPen = Math.round(G.enemy.atk * 0.20);
    const defPen = Math.round(G.enemy.def * 0.20);
    G.enemy.atk = Math.max(1, G.enemy.atk - atkPen);
    G.enemy.def = Math.max(0, G.enemy.def - defPen);
    addStatus(G.enemy, {id:'hex_weakness', name:'Weakness', type:'debuff', icon:'🔮', duration:999, atkPen});
    addStatus(G.enemy, {id:'hex_misfortune', name:'Misfortune', type:'debuff', icon:'🔮', duration:999, defPen});
    logEntry('player-action', `🔮 Hex Master: ${G.enemy.name} cursed! -${atkPen} ATK, -${defPen} DEF.`);
  }

  // spirit_bond — first strike deals +40% bonus damage and cannot miss
  G._spiritBondActive = passives.includes('spirit_bond');
  if (passives.includes('spirit_bond')) {
    p.nextAttackGuaranteed = true;
    p._spiritBondFirstStrike = true;
    logEntry('player-action', `👻 Spirit Bond: Manifesting from the spirit plane — first strike enhanced.`);
  }

  // stardust — each hit adds 5% crit chance for that hit (stacking per combo hit, resets each turn)
  G._stardustActive = passives.includes('stardust');
  if (passives.includes('stardust')) {
    logEntry('player-action', `⭐ Stardust: Each strike teleports — crit chance escalates per hit.`);
  }

  if (enemy.isBoss) {
    logEntry('system', `════ BOSS BATTLE: ${enemy.name} ════`);
  } else if (enemyList.length > 1) {
    logEntry('system', `══ Combat begins: ${enemy.name} and ${enemyList.length-1} other${enemyList.length>2?'s':''} ══`);
  } else {
    logEntry('system', `══ Combat begins: ${enemy.name} ══`);
  }
  logEntry('enemy-action', `"${enemy.title}"`);

  // INITIATIVE: roll who opens the fight based on relative SPD instead of
  // always defaulting to the player. See resolveNextRoundInitiative().
  resolveNextRoundInitiative();

  updateUI();
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

// playerAction — dispatches player input during combat
// type: 'attack' | 'defend' | 'item' | 'flee' | 'burst' | 'ability'
// abilityId: required when type === 'ability'
// Called from: HTML onclick buttons, handleKeyDown (main.js keys 1-5, q/e/r/f/space)
function playerAction(type, abilityId=null) {
  if (!G.inCombat || G.turn !== 'player') return;

  // Stun check — consumed here, skip turn
  const stun = G.player.status && G.player.status.find(s=>s.id==='stunned'||s.id==='stun');
  if (stun) {
    logEntry('system','You are stunned and cannot act!');
    G.player.status = G.player.status.filter(s=>s.id!=='stunned'&&s.id!=='stun');
    endPlayerTurn(); return;
  }

  let msg = '';
  const p = G.player;
  const e = G.enemy;

  if (type === 'attack') {
    // Arcane Mastery (fusion): fire a bonus psychic hit before the main strike lands
    if (G._arcaneMasteryActive && G.enemy) {
      const arcaneDmg = Math.round(calcDmg(p.stats.atk * 0.5, 0)); // ignores DEF
      dealDmgToEnemy(G.enemy, arcaneDmg, false, true, true, 'psychic');
      logEntry('player-action', `✨ Arcane Mastery: ${arcaneDmg} psychic damage precedes the strike.`);
    }
    // Basic attack: uses p.stats.atk vs e.def, crit applies 1.5x + critDmg bonus
    const nCrit = p.nextNAttackCount > 0 && p.nextNAttackCrit;
    const isCrit    = p.nextAttackGuaranteed || nCrit ? true : rand(100) < p.stats.crit;
    if (p.nextAttackGuaranteed) p.nextAttackGuaranteed = false;
    const critMult  = 1.5 + ((p.stats.critDmg||0)/100);
    // 'piercing' equipment: reduces effective DEF by 30%
    // nextNAttackPierce: reduces effective DEF by 50%
    const isPiercing = hasEquipEffect(p,'piercing') || (p.nextNAttackCount > 0 && p.nextNAttackPierce);
    let effectiveDef = isPiercing ? Math.round(e.def * (hasEquipEffect(p,'piercing') ? 0.7 : 0.5)) : e.def;
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

    // Venom: 20% chance to apply poison on attack
    // Dual-venom bonus: if 2+ equipped items have venom, proc chance → 25% and damage → +25% (capped)
    if (hasEquipEffect(p,'venom')) {
      const venomCount = Object.values(p.equipment).filter(s => s && s.effect && s.effect.split('_').includes('venom')).length;
      const dualVenom  = venomCount >= 2;
      const procChance = dualVenom ? 25 : 20;
      const dmgMult    = dualVenom ? 1.25 : 1.0;
      if (rand(100) < procChance) {
        addStatus(e,{id:'poison',name:'Poison',type:'debuff',icon:'☠️',duration:3,
          onTurn:(en)=>{const pd=Math.round(p.stats.atk*0.3*dmgMult);dealDmgToEnemy(en,pd,false,true);}});
        logEntry('player-action', dualVenom ? 'Twin Venom poisons the enemy! (+25%)' : 'Venom poisons the enemy!');
      }
    }

    // Toxin Buildup (normal_poison_buildup): _doubleToxin charges apply plague at double stacks on hit
    if (p._doubleToxin > 0 && e) {
      applyPlague(e, p, 2); // double stacks
      p._doubleToxin--;
      logEntry('player-action', `Toxin Buildup: double poison stacks applied! (${p._doubleToxin} charges left)`);
    }

    // Weapon element used for effectiveness check (defaults to 'normal' if no element)
    const weaponEl = p.equipment?.weapon?.element || 'normal';
    dealDmgToEnemy(e, dmg, isCrit, false, false, weaponEl);

    // Bloodlust ability effect: p.nextAttackLifesteal set by ability, consumed here
    if (p.nextAttackLifesteal) {
      const h=Math.round(dmg*0.3); p.stats.hp=Math.min(p.stats.maxHp,p.stats.hp+h);
      p.nextAttackLifesteal=false; logEntry('heal',`Bloodlust lifesteals ${h} HP.`);
    }

    addCombo(p); // increments combo counter, charges burst meter
    const mpGain = Math.max(1, Math.round(p.stats.maxMp * 0.10));
    p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + mpGain);
    msg = isCrit ? `Critical hit! ${dmg} damage. +${mpGain} MP.` : `You attack for ${dmg} damage. +${mpGain} MP.`;
    logEntry('player-action', msg);

    // Gust (fusion): first strike each combat is too fast to counter — skip enemy retaliation
    if (G._gustActive) {
      G._gustActive = false;
      logEntry('player-action', `💨 Gust: Strike too fast to counter — enemy cannot retaliate!`);
      updateUI();
      return; // skip endPlayerTurn = skip enemy turn this once
    }

    // Doom Aura (fusion): track vanish state; if player just attacked from vanish, add stack
    if (G._doomAuraActive) {
      const wasVanished = p.status && p.status.find(s=>s.id==='vanished');
      if (wasVanished) {
        G._doomAuraStacks = (G._doomAuraStacks || 0) + 1;
        logEntry('player-action', `🌑 Doom Aura: Doom tightens (${G._doomAuraStacks}/3).`);
        if (G._doomAuraStacks >= 3 && G.enemy) {
          G.enemy.hp = 0;
          logEntry('player-action', `🌑 Doom Aura: EXECUTE — doom fulfilled!`);
          spawnFloat('DOOM', 'crit', 'enemy-display');
          G._doomAuraStacks = 0;
        }
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
    p.status = p.status.filter(s=>s.id!=='vanished');
    msg = `You brace! +${shield} shield, +${mpGain} MP.`;
    logEntry('player-action', msg);

  } else if (type === 'item') {
    openInventoryUse(); return; // opens inventory modal without ending turn

  } else if (type === 'flee') {
    // Flee chance: 40 + player SPD - enemy SPD (can go negative)
    const chance = 40 + p.stats.spd - (e.spd||8);
    if (rand(100) < chance) {
      logEntry('system','You flee from combat!');
      resetCombo(p);
      endCombat(false); // false = fled, not won
      G.phase = 'explore';
      G.map[G.playerPos.y][G.playerPos.x].content = 'visited';
      updateUI(); return;
    } else {
      logEntry('system','Failed to flee!');
      endPlayerTurn(); return;
    }

  } else if (type === 'burst') {
    // Burst: requires burstCharge >= BURST_THRESHOLD (5)
    // G._weaponAffinity set here for burst abilities too
    if ((p.burstCharge||0) < BURST_THRESHOLD) { logEntry('system','Burst not ready!'); return; }
    const burstId = p.burstAbility;
    if (!burstId || !ABILITIES[burstId]) { logEntry('system','No burst ability!'); return; }
    const ab = ABILITIES[burstId];
    const weaponElB = p.equipment?.weapon?.element;
    const relicElB  = p.equipment?.relic?.element;
    const armorElB  = p.equipment?.armor?.element;
    const affinityMatchB = ab.element && (weaponElB === ab.element || relicElB === ab.element || armorElB === ab.element);
    G._weaponAffinity = affinityMatchB ? 1.20 : 1.0;
    if (affinityMatchB) logEntry('system', `⚔ ${ELEMENTS[ab.element]?.icon||''} Affinity! +20% ${ab.element} burst!`);
    G._currentAbilityMagic = !!(ab.tags && ab.tags.includes('magic'));
    msg = ab.use(p, e);
    G._currentAbilityMagic = false;
    G._weaponAffinity = 1.0;
    p.burstCharge = 0;
    p.combo = 0;
    updateComboUI();
    logEntry('player-action', `⚡ BURST: ${msg}`);

  } else if (type === 'ability' && abilityId) {
    const ab = ABILITIES[abilityId];
    if (!ab) return;
    let cost = ab.cost;
    // Divine Mantle relic: 20% MP cost reduction
    if (p.divineMantleActive) cost = Math.floor(cost * 0.8);
    // static_charge passive: first ability costs 0 MP (flag set in startCombat)
    if (p.nextAbilityFree)    { cost=0; p.nextAbilityFree=false; logEntry('player-action','⚡ Storm Surge: ability was free!'); }
    // nextAbilityFreeCount: multi-ability free charge (from stances/buffs)
    if (!p.nextAbilityFree && p.nextAbilityFreeCount > 0) { cost=0; p.nextAbilityFreeCount--; logEntry('player-action','✦ Ability costs no MP!'); }
    // Resource check: HP-cost abilities (costType:'hp') check health instead of MP
    if (ab.costType === 'hp') {
      if (p.stats.hp <= cost + 1) { logEntry('system','Not enough HP!'); return; }
    } else {
      if (p.stats.mp < cost)      { logEntry('system','Not enough mana!'); return; }
    }
    if ((p.cooldowns[abilityId]||0) > 0) { logEntry('system',`${ab.name} on cooldown (${p.cooldowns[abilityId]} turns)`); return; }
    if (ab.costType === 'hp') {
      p.stats.hp = Math.max(1, p.stats.hp - cost);
    } else {
      p.stats.mp -= cost;
    }
    // Affinity: +20% damage when any equipped item's element matches ability element (capped at +20%)
    const weaponEl  = p.equipment?.weapon?.element;
    const relicEl   = p.equipment?.relic?.element;
    const armorEl   = p.equipment?.armor?.element;
    const affinityMatch = ab.element && (weaponEl === ab.element || relicEl === ab.element || armorEl === ab.element);
    G._weaponAffinity = affinityMatch ? 1.20 : 1.0;
    if (affinityMatch) logEntry('system', `⚔ ${ELEMENTS[ab.element]?.icon||''} Affinity! +20% ${ab.element} damage.`);

    G._currentAbilityMagic = !!(ab.tags && ab.tags.includes('magic'));
    const comboBefore = p.combo || 0;
    msg = ab.use(p, e); // ability function returns a description string for the log
    G._currentAbilityMagic = false;
    G._weaponAffinity = 1.0;
    if (ab.maxCooldown > 0) p.cooldowns[abilityId] = ab.maxCooldown;
    // Physical/magic tagged abilities advance combo; utility abilities don't.
    // Some abilities bump p.combo themselves — that bump IS this cast's combo,
    // so don't count it twice (but still charge the burst meter once).
    if (ab.tags && (ab.tags.includes('physical')||ab.tags.includes('magic'))) {
      if ((p.combo || 0) > comboBefore) p.combo -= 1;
      addCombo(p);
    }
    // Storm Mastery: +1 extra storm charge per ability use
    if (G._stormMasteryActive && typeof p._stormCharge !== 'undefined') {
      p._stormCharge = (p._stormCharge || 0) + 1;
      logEntry('player-action', `⛈️ Storm Mastery: +1 Storm Charge (${p._stormCharge} total).`);
    }
    logEntry('player-action', msg);
  }

  checkCombatEnd();
  if (G.inCombat) endPlayerTurn();
}

// endPlayerTurn — called after every player action that doesn't end combat
// Ticks player statuses, decrements cooldowns, then resolves what happens
// next per the SPD initiative system (see resolveNextRoundInitiative()).
function endPlayerTurn() {
  G._stardustHits = 0; // Stardust: crit bonus resets each turn
  tickStatus(G.player); // runs onTurn callbacks and decrements duration (status.js)

  // Plague Lord: tick all enemy diseases an extra time on player turn end
  if (G._plagueLordActive && G.enemy && G.inCombat) {
    const diseases = (G.enemy.status || []).filter(s => s.disease && s.onTurn);
    for (const d of diseases) {
      d.onTurn(G.enemy);
    }
    if (diseases.length > 0) logEntry('player-action', `🦠 Plague Lord: diseases tick again!`);
  }
  checkCombatEnd();
  if (!G.inCombat) {
    // Combat ended during status tick (e.g. DoT killed enemy or player died to status)
    G.turn = 'player';
    return;
  }
  Object.keys(G.player.cooldowns).forEach(ab => { if(G.player.cooldowns[ab]>0) G.player.cooldowns[ab]--; });

  // INITIATIVE: if the enemy hasn't acted yet this round, it's owed a turn
  // now. If the enemy already went first, the player was this round's
  // second actor — the round is complete, so close it out and roll fresh
  // initiative for the next one instead of always handing it to the enemy.
  if (G._pendingSecondActor === 'enemy') {
    G.turn = 'enemy';
    updateUI();
    // G._enemyTurnDelay: can be set to 0 in tests/dev for instant enemy turns
    setTimeout(enemyTurn, G._enemyTurnDelay ?? 600);
  } else {
    G.combatRound++;
    resolveNextRoundInitiative();
    updateUI();
  }
}

// enemyTurn — resolves the ENTIRE enemy phase for this round: every enemy
// currently alive in G.enemies takes one action, in array order, one after
// another (packs — see mapgen.js). The round-closing logic (combatRound++,
// rerolling initiative, The Convergence's turn-10 check) runs ONCE after
// the whole phase completes, not once per enemy — so Phase 1's initiative
// system needed no changes: "the enemy side" is still a single conceptual
// turn-slot within a round, however many individual enemies act inside it.
function enemyTurn() {
  if (!G.inCombat || !G.enemies || !G.enemies.length) return;
  // Safety: close any lingering modal from the turn delay window
  document.getElementById('overlay').classList.remove('active');

  for (let i = 0; i < G.enemies.length; i++) {
    const e = G.enemies[i];
    if (e.hp <= 0) continue; // already defeated — skip, no turn for it

    checkBossPhase(e);   // upgrades boss stats if HP threshold crossed
    checkBossEnrage(e);  // periodic ATK/DEF buff if enrage timer set
    checkRegularEscalation(e); // lightweight ATK ramp for long non-boss fights

    // Stun: this enemy loses its turn, status consumed — the pack still
    // continues to the next enemy in line
    const stun = e.status && e.status.find(s=>s.id==='stun'||s.id==='stunned');
    if (stun) {
      logEntry('system', `${e.name} is stunned and cannot act!`);
      e.status = e.status.filter(s=>s.id!=='stun'&&s.id!=='stunned');
      tickStatus(e);
    } else {
      // Cycle through ability pattern (e.patterns array from enemy definition)
      // pickEnemyAbility (enemies.js) — HP-reactive selection within the
      // enemy's own pattern list; see its comment for the exact bias rules.
      const abId = pickEnemyAbility(e, G.player);
      e.patternIndex++;

      const abFn = ENEMY_ABILITIES[abId] || ENEMY_ABILITIES.basic;

      // Multiple enemy cards get per-index sprite ids (enemy-sprite-0, -1,
      // ...) from render.js; a solo fight keeps the original single id.
      const spriteEl = document.getElementById(G.enemies.length > 1 ? `enemy-sprite-${i}` : 'enemy-sprite');
      if (spriteEl) { spriteEl.classList.remove('hurt','attacking','dead'); void spriteEl.offsetWidth; spriteEl.classList.add('attacking'); }

      abFn(e, G.player); // enemy ability function — defined in enemies.js

      tickStatus(e);
    }

    checkCombatEnd();
    if (!G.inCombat) { updateUI(); return; } // player died mid-barrage — stop immediately
  }

  // ── Round fully resolved: every alive enemy has acted ──
  // INITIATIVE: only close out the round (increment combatRound, reroll who
  // acts first next round) if the enemy side was this round's second actor.
  // If the enemy side won initiative and went first, the player still owes
  // an action before the round is over.
  if (G._pendingSecondActor === 'enemy') {
    G.combatRound++;
    resolveNextRoundInitiative();
  } else {
    G.turn = 'player';
  }

  // The Convergence: auto-reset at turn 10 with double power (if player hasn't already reset)
  if (G.player && (G.player.classId === 'the_convergence') && G.combatRound === 10) {
    const p2 = G.player;
    if (!(p2.status||[]).find(s=>s.id==='convergence_reset')) {
      p2._convergenceForm = 'null';
      Object.keys(p2.cooldowns||{}).forEach(k=>p2.cooldowns[k]=0);
      addStatus(p2,{id:'convergence_reset',name:'Reset ×2',type:'buff',icon:'↺',duration:4,dmgMult:2.0});
      logEntry('system','✦ THE CONVERGENCE RESETS — Turn 10. All Forms double-powered for 4 turns.');
    }
  }

  checkCombatEnd();
  updateUI();
}

// checkBossPhase — compares current HP% to phase thresholds
// e.phases = [{ threshold:0.6, atkBoost:5, newPatterns:[...], announce:'...' }, ...]
// Phase index stored in e.currentPhase, incremented on crossing threshold
function checkBossPhase(e) {
  if (!e.phases || !e.phases.length) return;
  const hpPct = e.hp / e.maxHp;
  const nextPhase = e.currentPhase + 1;
  if (nextPhase > e.phases.length) return;
  const phase = e.phases[nextPhase - 1];
  if (hpPct <= phase.threshold && e.currentPhase < nextPhase) {
    e.currentPhase = nextPhase;
    e.atk += phase.atkBoost || 0;
    e.def += phase.defBoost || 0;
    if (phase.newPatterns) e.patterns = phase.newPatterns;
    e.patternIndex = 0;
    logEntry('system', `⚠ ${phase.announce}`);
    const spriteEl = document.getElementById('enemy-sprite');
    if (spriteEl) { spriteEl.style.filter='brightness(3)'; setTimeout(()=>spriteEl.style.filter='',600); }
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
  const xpGain   = allEnemies.reduce((sum, en) => sum + en.xp, 0);
  const goldGain = allEnemies.reduce((sum, en) => sum + randRange(en.gold[0], en.gold[1]), 0);
  gainXP(xpGain);
  // Class XP: 10 base + 2 per floor, persists in G.meta.classXP (used for fusion unlock)
  const classXpGain = 10 + (G.floor * 2);
  if (G.selectedClass) gainClassXP(G.selectedClass, classXpGain);
  G.player.gold += goldGain;

  if (e.isBoss) {
    const shardBonus = Math.round(5 + G.floor * 0.5);
    G.meta.soulShards += shardBonus;
    G.killedBoss = true;
    logEntry('reward', `★ Boss slain! +${shardBonus} Soul Shards.`);
  }
  logEntry('reward', `Victory! +${xpGain} XP, +${goldGain} gold.`);

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
    if (typeof clearActiveRunSave === 'function') clearActiveRunSave();
    triggerConquestReward();
    return;
  }

  // Boss floors (BOSS_FLOORS array in data): show item choice reward
  if (e.isBoss && BOSS_FLOORS.includes(G.floor)) {
    endCombat(true);
    G.phase = 'explore';
    G.map[G.playerPos.y][G.playerPos.x].content = 'visited';
    showFloorReward(); // in modals.js — shows 3-item choice modal
    return;
  }

  endCombat(true);
  G.phase = 'explore';
  G.map[G.playerPos.y][G.playerPos.x].content = 'visited';
  if (typeof autoSaveRun === 'function') autoSaveRun();
  updateUI();
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
  if (!m.conquestRewards.conquered) {
    m.conquestRewards.conquered = true;
    m.conquestRewards.title = true;
    m.conquestRewards.permanentGear = 'abyssal_crown';
    m.conquestRewards.ngPlusUnlocked = true;
    if (!m.conquestRewards.shardDumpClaimed) {
      m.soulShards += 150;
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
  showConquestModal();
}

function showConquestModal() {
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
    <button class="title-btn primary" style="width:100%;margin-top:0.5rem" onclick="document.getElementById('overlay').classList.remove('active');showScreen('title-screen')">Return to the Surface</button>`;
  showModal(html);
}
