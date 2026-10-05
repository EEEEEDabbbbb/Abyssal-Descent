// ══════════════════════════════════════════════════════════════
// PASSIVES  (js/engine/passives.js)
//
// PASSIVE_INFO  — display name + description for every passive id (the
//                 stats panel tooltip reads this; keep desc = what the code does).
// PASSIVE_HOOKS — implementations, keyed by passive id. Each may define:
//   onCombatStart(p, enemies, st)        — once per fight
//   damageMult(p, e, ctx, st) → number    — outgoing damage multiplier
//       ctx: { direct, isDot, magic, kind:'magic'|'physical', element }
//   onIncoming(p, dmg, attacker, st) → dmg — before shields/HP
//   onDamaged(p, dmg, attacker, st)       — after HP was lost
//   onLethal(p, dmg, attacker, st) → bool — return true to survive the hit
//   onAbilityCast(p, abilityId, st)       — after an ability resolves
//   onActionEnd(p, ctx, st)               — after every player action
//       ctx: { kind, directHits }
//   onEnemyTurnEnd(p, st)                 — after the enemy side acts
//   opening(p, enemies, st) → 'player'    — force who acts first in round 1
// `st` is per-fight scratch state (G._passiveState), reset every fight.
//
// Older passives (iron_skin, combustion, phase, gust, …) are still handled
// inline in combat.js; LEGACY_PASSIVES lists them so IMPLEMENTED_PASSIVES is
// complete.
// ══════════════════════════════════════════════════════════════

const PASSIVE_INFO = {
  // ── Base class passives ──
  shadow_step:      { name:'🗡️ Shadow Step',       desc:'Your first strike each fight is a guaranteed critical hit.' },
  iron_skin:        { name:'🛡️ Iron Skin',         desc:'Start each fight with a shield equal to 50% of your DEF.' },
  soul_harvest:     { name:'🌀 Soul Harvest',      desc:'+15% magic damage. MP regeneration from gear is doubled in combat.' },
  combustion:       { name:'🔥 Combustion',        desc:'Burns you apply gain +1 stack, and you deal +25% damage to burning enemies.' },
  static_charge:    { name:'⚡ Static Charge',     desc:'Your first ability each fight costs no MP.' },
  vital_hunger:     { name:'🩸 Vital Hunger',      desc:'Deal up to +50% damage as your HP drops. Below 50% HP, heal 12% of damage taken.' },
  void_affinity:    { name:'🌑 Void Affinity',     desc:'+20% magic damage. Enemies start each fight with 1 Entropy stack.' },
  rune_mastery:     { name:'🔱 Rune Mastery',      desc:'+8% ATK at the start of each fight.' },
  death_aura:       { name:'💀 Death Aura',        desc:'Enemies start each fight with 2 Plague stacks.' },
  sacred_aura:      { name:'⚜️ Sacred Aura',       desc:'Restore 20% of your max MP at the start of each fight.' },
  abyssal_presence: { name:'👁️ Abyssal Presence',  desc:'Enemies start each fight with -10% ATK (Dread).' },
  anatomical_study: { name:'🔬 Anatomical Study',  desc:'+18% damage per active Sunder on the enemy (up to +90% at 5 Sunders).' },
  // ── Fusion & special class passives ──
  arcane_mastery:   { name:'✨ Arcane Mastery',    desc:'Your basic attacks are preceded by a psychic strike for 50% ATK.' },
  bastion:          { name:'🏰 Bastion',           desc:'The first enemy attack each fight is evaded entirely.' },
  battle_hardened:  { name:'⚔️ Battle Hardened',   desc:'Enemies are marked at the start of each fight. Your shadow, dark and void damage against marked enemies is +20%.' },
  crystal_body:     { name:'💎 Crystal Body',      desc:'When an enemy hits you, crystal shards strike back twice for 10% of your ATK each.' },
  death_mastery:    { name:'💀 Death Mastery',     desc:'Ghost, dark, void and blood damage +20%.' },
  divine_grace:     { name:'⚜️ Divine Grace',      desc:'+15% damage against debuffed enemies. Light damage +15%.' },
  doom_aura:        { name:'🌑 Doom Aura',         desc:'Attacking while Vanished adds a Doom stack. At 3 stacks the strike executes the enemy (bosses lose 25% of max HP instead).' },
  dragon_scales:    { name:'🐉 Dragon Scales',     desc:'Take 15% less damage. Part of what the scales absorb becomes ATK for the rest of the fight (up to +30%).' },
  earth_body:       { name:'🌍 Earth Body',        desc:'Your SPD cannot be reduced. Ground damage +15%.' },
  feral_bond:       { name:'🐾 Feral Bond',        desc:'Every 3rd action that deals damage primes the hunt — your next hit deals +100% damage.' },
  fire_mastery:     { name:'🔥 Fire Mastery',      desc:'Burns you apply gain +1 stack. Fire damage +15%.' },
  frost_armor:      { name:'❄️ Frost Armor',       desc:'An ice shell absorbs the first hit each fight, then shatters for 50% ATK ice damage against the attacker.' },
  frost_mastery:    { name:'❄️ Frost Mastery',     desc:'Enemies start each fight 20% slower for 3 turns. Your first hit each fight deals +50% damage.' },
  gravity_mastery:  { name:'🌀 Gravity Mastery',   desc:'+8% damage for each debuff on the target (up to +40%).' },
  gravity_well:     { name:'🌀 Gravity Well',      desc:'Enemies start each fight with -20% SPD for 3 turns.' },
  gust:             { name:'💨 Gust',              desc:'Your first attack each fight is too fast to counter — the enemy loses its next action.' },
  hex_master:       { name:'🔮 Hex Master',        desc:'Enemies start each fight with Weakness (-20% ATK) and Misfortune (-20% DEF).' },
  immunity:         { name:'🛡️ Immunity',          desc:'Immune to poison and disease. Poison damage +25%.' },
  intimidation:     { name:'😤 Intimidation',      desc:'Enemies start each fight with -15% ATK.' },
  iron_will:        { name:'🛡️ Iron Will',         desc:'Once per fight, a lethal hit leaves you at 20% HP instead.' },
  magnetic_field:   { name:'🧲 Magnetic Field',    desc:'Enemies start each fight with -10% DEF.' },
  overclock:        { name:'⚙️ Overclock',         desc:'Your first two abilities each fight have their cooldowns reduced by 1.' },
  phase:            { name:'👻 Phase',             desc:'25% chance on each hit to slip past most of the enemy\'s DEF.' },
  plague_lord:      { name:'🦠 Plague Lord',       desc:'Your poisons and diseases tick an extra time at the end of each of your turns.' },
  psionic_link:     { name:'🔮 Psionic Link',      desc:'Alternating spells and strikes: each one after the other kind deals +10% damage.' },
  radiant:          { name:'☀️ Radiant',           desc:'A radiant flash at the start of each fight makes every enemy miss its first attack.' },
  resonance:        { name:'🔊 Resonance',         desc:'Resonance stacks carry over between fights instead of resetting.' },
  resonance_master: { name:'🔊 Resonance Master',  desc:'Resonance stacks cap at 8 instead of 5, and each stack above 5 adds +5% damage.' },
  shadow_veil:      { name:'🌑 Shadow Veil',       desc:'Enter each fight cloaked — you act first and enemies lose their first action.' },
  spellblade:       { name:'⚔️ Spellblade',        desc:'Alternating spells and strikes: each one after the other kind deals +15% damage.' },
  spirit_bond:      { name:'👻 Spirit Bond',       desc:'Your first strike each fight is a guaranteed critical hit with +40% damage.' },
  stardust:         { name:'⭐ Stardust',          desc:'Each hit in a turn adds +5% chance (stacking) for that hit to deal +50% damage.' },
  storm_mastery:    { name:'⚡ Storm Mastery',     desc:'Abilities grant +1 extra Storm Charge.' },
  tidal_flow:       { name:'🌊 Tidal Flow',        desc:'Your first hit each fight deals +40% damage.' },
  tide_mastery:     { name:'🌊 Tide Mastery',      desc:'Your damage rises 5% each round of a fight, up to +50%.' },
  time_warp:        { name:'⏳ Time Warp',         desc:'You always act first in the opening round of a fight.' },
  undying:          { name:'💀 Undying',           desc:'Once per fight, survive a lethal hit with 15% HP and reflect half the blow back at the attacker.' },
  void_mastery:     { name:'🌀 Void Mastery',      desc:'Void, shadow and dark damage +20%.' },
};

const RESONANCE_CAP = 5;
const RESONANCE_MASTER_CAP = 8;

function _elIs(ctx, ...els) { return els.includes(ctx.element); }
function _debuffCount(e) { return (e.status || []).filter(s => s.type === 'debuff').length; }
function _alternateBonus(ctx, st, bonus) {
  return ctx.direct && st.lastKind && ctx.kind !== st.lastKind ? 1 + bonus : 1;
}
function _slowEnemies(enemies, pct, turns, label) {
  enemies.forEach(en => {
    const pen = Math.max(1, Math.round((en.spd || 8) * pct));
    en.spd = Math.max(1, (en.spd || 8) - pen);
    addStatus(en, { id:`${label}_slow`, name:'Slowed', type:'debuff', icon:'🌀', duration:turns, spdPen:pen });
  });
}

const PASSIVE_HOOKS = {
  crystal_body: {
    onDamaged(p, dmg, attacker) {
      if (!attacker || attacker.hp <= 0) return;
      const shard = Math.max(1, Math.round(p.stats.atk * 0.10));
      const total = reflectDamage(attacker, shard, 'crystal') + reflectDamage(attacker, shard, 'crystal');
      logEntry('player-action', `💎 Crystal shards strike back for ${total}!`);
    },
  },
  death_mastery: {
    damageMult(p, e, ctx) { return _elIs(ctx, 'ghost', 'dark', 'void', 'blood') ? 1.2 : 1; },
  },
  divine_grace: {
    damageMult(p, e, ctx) { return (_debuffCount(e) > 0 ? 1.15 : 1) * (_elIs(ctx, 'light') ? 1.15 : 1); },
  },
  dragon_scales: {
    onCombatStart(p, enemies, st) { st.scalesAtk = 0; st.scalesCap = Math.round(p.stats.atk * 0.3); },
    onIncoming(p, dmg, attacker, st) {
      const absorbed = Math.round(dmg * 0.15);
      const gain = Math.min(st.scalesCap - st.scalesAtk, Math.max(1, Math.round(absorbed * 0.25)));
      if (gain > 0 && attacker) { p.stats.atk += gain; st.scalesAtk += gain; }
      return dmg - absorbed;
    },
  },
  earth_body: {
    onCombatStart(p, enemies, st) { st.spdFloor = p.stats.spd; },
    onEnemyTurnEnd(p, st) { if (p.stats.spd < st.spdFloor) p.stats.spd = st.spdFloor; },
    onActionEnd(p, ctx, st) { if (p.stats.spd < st.spdFloor) p.stats.spd = st.spdFloor; },
    damageMult(p, e, ctx) { return _elIs(ctx, 'ground') ? 1.15 : 1; },
  },
  feral_bond: {
    onCombatStart(p, enemies, st) { st.feralMarks = 0; st.feralPrimed = false; },
    damageMult(p, e, ctx, st) {
      if (ctx.direct && st.feralPrimed) { st.feralPrimed = false; logEntry('player-action', '🐾 Feral Bond: the hunt strikes!'); return 2; }
      return 1;
    },
    onActionEnd(p, ctx, st) {
      if (!ctx.directHits) return;
      if (++st.feralMarks >= 3) { st.feralMarks = 0; st.feralPrimed = true; logEntry('player-action', '🐾 Feral Bond: the hunt is primed — next hit +100%.'); }
    },
  },
  fire_mastery: {
    damageMult(p, e, ctx) { return _elIs(ctx, 'fire', 'magma') ? 1.15 : 1; },
  },
  frost_armor: {
    onCombatStart(p, enemies, st) { st.frostShell = true; },
    onIncoming(p, dmg, attacker, st) {
      if (!st.frostShell || !attacker) return dmg;
      st.frostShell = false;
      const shatter = reflectDamage(attacker, Math.round(p.stats.atk * 0.5), 'ice');
      logEntry('player-action', `❄️ Frost Armor absorbs the hit and shatters for ${shatter}!`);
      spawnFloat('SHELL', 'miss', 'char-portrait');
      return 0;
    },
  },
  frost_mastery: {
    onCombatStart(p, enemies) { _slowEnemies(enemies, 0.2, 3, 'frost_mastery'); },
    damageMult(p, e, ctx, st) {
      if (ctx.direct && !st.frostOpened) { st.frostOpened = true; return 1.5; }
      return 1;
    },
  },
  gravity_mastery: {
    damageMult(p, e) { return 1 + Math.min(0.4, _debuffCount(e) * 0.08); },
  },
  gravity_well: {
    onCombatStart(p, enemies) { _slowEnemies(enemies, 0.2, 3, 'gravity_well'); logEntry('player-action', '🌀 Gravity Well drags at the enemy (-20% SPD).'); },
  },
  immunity: {
    // Poison/disease immunity itself lives in addStatus (status.js)
    damageMult(p, e, ctx) { return _elIs(ctx, 'poison') ? 1.25 : 1; },
  },
  iron_will: {
    onLethal(p, dmg, attacker, st) {
      if (st.ironWillUsed) return false;
      st.ironWillUsed = true;
      p.stats.hp = Math.max(1, Math.round(p.stats.maxHp * 0.2));
      logEntry('system', '🛡️ Iron Will — you refuse to fall!');
      return true;
    },
  },
  magnetic_field: {
    onCombatStart(p, enemies) {
      enemies.forEach(en => {
        const pen = Math.round(en.def * 0.10);
        if (!pen) return;
        en.def = Math.max(0, en.def - pen);
        addStatus(en, { id:'magnetic_field', name:'Demagnetized', type:'debuff', icon:'🧲', duration:999, defPen:pen });
      });
    },
  },
  overclock: {
    onCombatStart(p, enemies, st) { st.overclock = 2; },
    onAbilityCast(p, abilityId, st) {
      if (st.overclock > 0 && (p.cooldowns[abilityId] || 0) > 0) {
        p.cooldowns[abilityId]--;
        st.overclock--;
        logEntry('player-action', `⚙️ Overclock: cooldown reduced by 1.`);
      }
    },
  },
  psionic_link: { damageMult(p, e, ctx, st) { return _alternateBonus(ctx, st, 0.10); } },
  spellblade:   { damageMult(p, e, ctx, st) { return _alternateBonus(ctx, st, 0.15); } },
  radiant: {
    onCombatStart(p, enemies) {
      enemies.forEach(en => addStatus(en, { id:'dazzled', name:'Dazzled', type:'debuff', icon:'☀️', duration:999, missNext:true }));
      logEntry('player-action', '☀️ Radiant: a blinding flash — enemies will miss their first attack.');
    },
  },
  resonance: {
    // Keeping stacks between fights is handled in startCombat (no reset)
  },
  resonance_master: {
    damageMult(p) { return 1 + Math.max(0, (p._resonanceStacks || 0) - RESONANCE_CAP) * 0.05; },
  },
  shadow_veil: {
    onCombatStart(p, enemies) { enemies.forEach(en => { en._skipNextTurn = 'cloaked'; }); logEntry('player-action', '🌑 Shadow Veil: you strike from the dark.'); },
    opening() { return 'player'; },
  },
  tidal_flow: {
    damageMult(p, e, ctx, st) {
      if (ctx.direct && !st.tidalOpened) { st.tidalOpened = true; return 1.4; }
      return 1;
    },
  },
  tide_mastery: {
    damageMult() { return 1 + Math.min(0.5, (G.combatRound || 0) * 0.05); },
  },
  time_warp: {
    opening() { return 'player'; },
  },
  undying: {
    onLethal(p, dmg, attacker, st) {
      if (st.undyingUsed) return false;
      st.undyingUsed = true;
      p.stats.hp = Math.max(1, Math.round(p.stats.maxHp * 0.15));
      logEntry('system', '💀 Undying — you rise again!');
      if (attacker && attacker.hp > 0) {
        const back = reflectDamage(attacker, Math.round(dmg * 0.5), null);
        logEntry('player-action', `💀 The killing blow rebounds for ${back}!`);
      }
      return true;
    },
  },
};

// Implemented inline in combat.js / utils.js
const LEGACY_PASSIVES = ['shadow_step','iron_skin','soul_harvest','combustion','static_charge','vital_hunger',
  'void_affinity','rune_mastery','death_aura','sacred_aura','abyssal_presence','anatomical_study','arcane_mastery',
  'bastion','battle_hardened','doom_aura','gust','hex_master','intimidation','phase','plague_lord','spirit_bond',
  'stardust','storm_mastery','void_mastery'];
const IMPLEMENTED_PASSIVES = new Set([...LEGACY_PASSIVES, ...Object.keys(PASSIVE_HOOKS)]);

// ── Hook runners ──────────────────────────────────────────────
function _hooksFor(p, name) {
  return (p && p.passives || []).map(id => PASSIVE_HOOKS[id]).filter(h => h && h[name]);
}
function passiveState() { return G._passiveState || (G._passiveState = {}); }

function passivesCombatStart(p, enemies) {
  G._passiveState = {};
  _hooksFor(p, 'onCombatStart').forEach(h => h.onCombatStart(p, enemies, G._passiveState));
}
function passiveDamageMult(p, e, ctx) {
  return _hooksFor(p, 'damageMult').reduce((m, h) => m * h.damageMult(p, e, ctx, passiveState()), 1);
}
function passiveIncoming(p, dmg, attacker) {
  return _hooksFor(p, 'onIncoming').reduce((d, h) => d > 0 ? h.onIncoming(p, d, attacker, passiveState()) : d, dmg);
}
function passiveDamaged(p, dmg, attacker) {
  _hooksFor(p, 'onDamaged').forEach(h => h.onDamaged(p, dmg, attacker, passiveState()));
}
function passiveLethal(p, dmg, attacker) {
  return _hooksFor(p, 'onLethal').some(h => h.onLethal(p, dmg, attacker, passiveState()));
}
function passiveAbilityCast(p, abilityId) {
  _hooksFor(p, 'onAbilityCast').forEach(h => h.onAbilityCast(p, abilityId, passiveState()));
}
function passiveActionEnd(p, ctx) {
  _hooksFor(p, 'onActionEnd').forEach(h => h.onActionEnd(p, ctx, passiveState()));
  if (ctx.kind) passiveState().lastKind = ctx.kind;
}
function passiveEnemyTurnEnd(p) {
  _hooksFor(p, 'onEnemyTurnEnd').forEach(h => h.onEnemyTurnEnd(p, passiveState()));
}
function passiveOpening(p, enemies) {
  return _hooksFor(p, 'opening').some(h => h.opening(p, enemies, passiveState()) === 'player') ? 'player' : null;
}
function resonanceCap(p) {
  return (p.passives || []).includes('resonance_master') ? RESONANCE_MASTER_CAP : RESONANCE_CAP;
}
