// ══════════════════════════════════════════════════════════════
// RENDERING  (js/ui/render.js)
//
// updateUI() is the master refresh — call it after any state change.
// It calls all sub-renderers; most sub-renderers are safe to call alone too.
//
// SUB-RENDERERS & WHAT THEY OWN:
//   renderStatsGrid()      → #stats-grid (ATK/DEF/SPD/CRIT/GOLD/element/passive)
//   renderStatusEffects()  → any .status-row container (player or enemy)
//   renderInventory()      → #inventory-grid (item cards with .item-rarity badges)
//   renderEquipmentSlots() → #equip-slots (weapon/armor/relic slots)
//   renderAbilities()      → #abilities-grid (ability buttons with cooldowns)
//   renderBasicActions()   → #basic-actions (attack/defend/item/flee/burst)
//   renderCenterPanel()    → #dungeon-view (combat or explore depending on G.phase)
//   renderCombatView()     → combat arena: enemy display + status
//   renderExploreView()    → map viewport: fog-of-war tile grid
//   renderRightPanel()     → #combat-log (last 60 entries)
//
// ITEM POPUP — showItemPopup(item):
//   Used for treasure chest rewards. Layout: name → rarity → element → desc → button.
//   Uses .item-rarity class (NOT .item-rarity-badge).
//   ⚠️ .item-rarity must NOT have position:absolute in CSS — that caused the
//      "rarity stuck in top-right corner" bug. Fixed: inventory cards use inline
//      style="position:absolute;top:0.3rem;right:0.4rem" directly (line ~132).
//
// TOOLTIP — showTooltip(event, name, desc) / showAbilityTooltip(event, abId)
//   Dynamically created div appended to body, positioned near cursor with overflow detection.
// ══════════════════════════════════════════════════════════════

function updateUI() {
  if (!G.player) return;
  // Check for death outside combat (e.g. event damage)
  if (G.player.stats.hp <= 0 && !G.inCombat) { gameOver(); return; }
  const p = G.player;

  document.getElementById('floor-badge').textContent = `FLOOR ${G.floor}`;
  document.getElementById('soul-shards-display').textContent = G.meta.soulShards;
  document.getElementById('gold-display').textContent = p.gold;

  const ngEl = document.getElementById('ng-badge');
  if (ngEl) ngEl.style.display = G.meta.ngPlus > 0 ? '' : 'none';
  if (ngEl && G.meta.ngPlus > 0) ngEl.textContent = `NG+${G.meta.ngPlus}`;

  document.getElementById('char-portrait').textContent = getClassData(p.classId)?.icon || '⚔';
  document.getElementById('char-name').textContent     = p.name;
  document.getElementById('char-class').textContent    = getClassData(p.classId)?.name || '';
  document.getElementById('char-level').textContent    = `Level ${p.level}`;

  const hpPct = clamp(p.stats.hp/p.stats.maxHp*100,0,100);
  document.getElementById('hp-bar').style.width = hpPct+'%';
  document.getElementById('hp-val').textContent = `${p.stats.hp}/${p.stats.maxHp}`;

  const mpPct = clamp(p.stats.mp/p.stats.maxMp*100,0,100);
  document.getElementById('mp-bar').style.width = mpPct+'%';
  document.getElementById('mp-val').textContent = `${p.stats.mp}/${p.stats.maxMp}`;

  if (p.shield > 0) {
    document.getElementById('shield-bar-container').style.display='';
    document.getElementById('shield-val').textContent = ''+p.shield;
  } else {
    document.getElementById('shield-bar-container').style.display='none';
  }

  const xpPct = clamp(p.xp/xpForLevel(p.level)*100,0,100);
  document.getElementById('xp-bar').style.width  = xpPct+'%';
  document.getElementById('xp-val').textContent  = `${p.xp}/${xpForLevel(p.level)}`;

  if (p.talentPoints > 0) {
    document.getElementById('talent-pts-badge').style.display='';
    document.getElementById('talent-pts').textContent = p.talentPoints;
  } else {
    document.getElementById('talent-pts-badge').style.display='none';
  }

  renderStatsGrid();
  renderStatusEffects(p.status, 'player-status');
  renderEquipment();
  renderInventory();
  renderAbilities();
  renderBasicActions();
  renderCenterPanel();
  renderRightPanel();
  updateComboUI();
}

function renderStatsGrid() {
  const p   = G.player;
  const el  = getClassData(p.classId)?.element;
  const elObj = el ? ELEMENTS[el] : null;
  // ⚠️ When adding new passives (base or fusion), add entries to BOTH
  // passiveNames and passiveDescs below, or tooltips will silently show nothing.
  const passiveNames = {
    // ── Base class passives ──
    shadow_step:      '🗡️ Shadow Step',
    iron_skin:        '🛡️ Iron Skin',
    soul_harvest:     '🌀 Soul Harvest',
    combustion:       '🔥 Combustion',
    static_charge:    '⚡ Static Charge',
    vital_hunger:     '🩸 Vital Hunger',
    void_affinity:    '🌑 Void Affinity',
    rune_mastery:     '🔱 Rune Mastery',
    death_aura:       '💀 Death Aura',
    sacred_aura:      '⚜️ Sacred Aura',
    abyssal_presence: '👁️ Abyssal Presence',
    anatomical_study: '🔬 Anatomical Study',
    // ── Fusion class passives ──
    arcane_mastery:   '✨ Arcane Mastery',
    bastion:          '🏰 Bastion',
    battle_hardened:  '⚔️ Battle Hardened',
    crystal_body:     '💎 Crystal Body',
    death_mastery:    '💀 Death Mastery',
    divine_grace:     '⚜️ Divine Grace',
    doom_aura:        '🌑 Doom Aura',
    dragon_scales:    '🐉 Dragon Scales',
    earth_body:       '🌍 Earth Body',
    feral_bond:       '🐾 Feral Bond',
    fire_mastery:     '🔥 Fire Mastery',
    frost_armor:      '❄️ Frost Armor',
    frost_mastery:    '❄️ Frost Mastery',
    gravity_mastery:  '🌀 Gravity Mastery',
    gravity_well:     '🌀 Gravity Well',
    gust:             '💨 Gust',
    hex_master:       '🔮 Hex Master',
    immunity:         '🛡️ Immunity',
    intimidation:     '😤 Intimidation',
    iron_will:        '🛡️ Iron Will',
    magnetic_field:   '🧲 Magnetic Field',
    overclock:        '⚙️ Overclock',
    phase:            '👻 Phase',
    plague_lord:      '🦠 Plague Lord',
    psionic_link:     '🔮 Psionic Link',
    radiant:          '☀️ Radiant',
    resonance:        '🔊 Resonance',
    resonance_master: '🔊 Resonance Master',
    shadow_veil:      '🌑 Shadow Veil',
    spellblade:       '⚔️ Spellblade',
    spirit_bond:      '👻 Spirit Bond',
    stardust:         '⭐ Stardust',
    storm_mastery:    '⚡ Storm Mastery',
    tidal_flow:       '🌊 Tidal Flow',
    tide_mastery:     '🌊 Tide Mastery',
    time_warp:        '⏳ Time Warp',
    undying:          '💀 Undying',
    void_mastery:     '🌀 Void Mastery',
  };
  const passiveDescs = {
    // ── Base class passives ──
    shadow_step:      'First strike each combat is a guaranteed critical hit.',
    iron_skin:        'Gain bonus shield (50% DEF) at combat start.',
    soul_harvest:     '+15% magic damage. MP regen doubled in combat.',
    combustion:       'All burn applications gain +1 extra stack.',
    static_charge:    'First ability each combat costs 0 MP.',
    vital_hunger:     'Deal up to +50% damage when low HP. Lifesteal below 50% HP.',
    void_affinity:    '+20% magic damage. Enemy starts with 1 Entropy stack.',
    rune_mastery:     'ATK increased by 8% at combat start.',
    death_aura:       'Enemies begin combat with 2 Plague stacks.',
    sacred_aura:      'Gain 20% max MP at combat start.',
    abyssal_presence: 'Enemies start combat with -10% ATK (Dread).',
    anatomical_study: '+18% damage per active Sunder on the enemy (up to +90% at 5 Sunders).',
    // ── Fusion class passives ──
    arcane_mastery:   'Arcane damage is applied before each strike lands, effectively hitting twice.',
    bastion:          'Can vanish while holding the defensive line — punishes enemies that overcommit to an empty position.',
    battle_hardened:  'Marks priority targets at combat start. Shadow strikes against marked targets deal bonus damage.',
    crystal_body:     'Shatters into crystal shards on taking damage, each shard dealing a small counter-hit.',
    death_mastery:    'Necromantic power amplifies all death-element effects. Undead allies persist one extra turn.',
    divine_grace:     'Holy conviction amplifies Sunder delivery — Sundered enemies take bonus holy damage.',
    doom_aura:        'Each Vanish tightens a doom mark on the enemy. At max stacks, the next strike is an instant kill.',
    dragon_scales:    'Draconic armor absorbs a portion of incoming damage and converts it to ATK.',
    earth_body:       'Rooted in stone — immune to SPD reduction effects. Strike eruptions deal bonus ground damage.',
    feral_bond:       'Stacks hunt marks on targets from stealth. At 3 marks, the next strike deals 200% bonus damage.',
    fire_mastery:     'Fire applications prime targets for Sunder rather than consuming them, amplifying both systems.',
    frost_armor:      'Ice shell absorbs the first hit each combat. Shatters on break, dealing frost damage to the attacker.',
    frost_mastery:    'Slows targets from stealth before striking. Frozen enemies take 50% bonus damage from the opening hit.',
    gravity_mastery:  'Gravitational force amplifies Sunder — each active Sunder increases crush damage dealt.',
    gravity_well:     'Warps gravity around the target at combat start, reducing their SPD by 20% for the first 3 turns.',
    gust:             'Movement speed exceeds targeting — first strike each combat cannot be counterattacked.',
    hex_master:       'Applies Weakness and Misfortune to the enemy before the first strike lands.',
    immunity:         'Immune to poison and disease effects. Contagion abilities deal 25% bonus damage.',
    intimidation:     'Reduces enemy ATK by 15% at combat start through sheer draconic presence.',
    iron_will:        'Cannot be reduced below 1 HP more than once per combat. Second near-death restores 20% HP.',
    magnetic_field:   'Strips metallic armor from enemies at combat start, reducing their DEF by 10%.',
    overclock:        'First two abilities each combat have their cooldowns reduced by 1.',
    phase:            'Passes through armor on the opening strike — first hit ignores DEF entirely.',
    plague_lord:      'All poison and disease effects applied by this class last 2 extra turns.',
    psionic_link:     'Spells and strikes share damage scaling — each spell cast boosts the next strike by 10%, and vice versa.',
    radiant:          'Blinds the enemy with a radiant flash at combat start, causing them to miss their first attack.',
    resonance:        'Resonance stacks persist between encounters. Enter each combat with stacks carried from the last.',
    resonance_master: 'Resonance stacks cap is increased. Each stack beyond the normal cap adds bonus void damage.',
    shadow_veil:      'Enters combat cloaked — enemy cannot act on turn 1.',
    spellblade:       'Spells set up strikes and strikes set up spells — alternating between them grants +15% damage to each.',
    spirit_bond:      'Stalks from the spirit plane before manifesting — first strike deals bonus damage and cannot miss.',
    stardust:         'Teleports between strikes, making counterattacks impossible. Each teleport adds 5% crit chance for that hit.',
    storm_mastery:    'Thunder strikes amplify Sunder — each Sunder increases chain lightning damage dealt.',
    tidal_flow:       'Water currents cloak movement — first strike from stealth deals bonus water damage.',
    tide_mastery:     'Ocean power surges with each turn — tidal damage increases by 5% per combat round, up to 50%.',
    time_warp:        'Strikes targets before they react — first ability each combat takes effect before the enemy turn.',
    undying:          'Survives one lethal hit per combat, rising with 15% HP. The killing blow is reflected back at half damage.',
    void_mastery:     'Entropy stacks applied by this class reduce all enemy stats, not just the primary targets.',
  };
  const passiveHtml = (p.passives||[]).map(passive => {
    const name = passiveNames[passive] || passive;
    const desc = passiveDescs[passive] || 'No description available.';
    const safeName = name.replace(/'/g,'`');
    const safeDesc = desc.replace(/'/g,'`');
    return `<div class="stat-item" style="grid-column:span 2;cursor:help"
      onmouseenter="showTooltip(event,'${safeName}','${safeDesc}')"
      onmouseleave="hideTooltip()">
        <div class="stat-item-name">Passive</div>
        <div class="stat-item-val" style="color:var(--accent-teal-bright);font-size:0.65rem">${name}</div>
       </div>`;
  }).join('');
  document.getElementById('stats-grid').innerHTML = [
    {name:'ATK',  val:p.stats.atk},
    {name:'DEF',  val:p.stats.def},
    {name:'SPD',  val:p.stats.spd},
    {name:'CRIT', val:p.stats.crit+'%'},
    {name:'GOLD', val:p.gold},
  ].map(s=>`<div class="stat-item"><div class="stat-item-name">${s.name}</div><div class="stat-item-val">${s.val}</div></div>`).join('')
  + (elObj ? `<div class="stat-item" style="grid-column:span 2"><div class="stat-item-name">Element</div><div class="stat-item-val" style="color:${elObj.color}">${elObj.icon} ${elObj.name}</div></div>` : '')
  + passiveHtml;
}

// STATUS_DESCS — descriptions for statuses whose effects live in onTurn closures
// (no readable numeric fields). Keyed by status id.
const STATUS_DESCS = {
  // ── DoTs ──
  burn:            'Fire damage each turn (scales with stacks)',
  plague:          'Poison damage each turn (scales with stacks)',
  bleed:           'Bleed damage each turn (scales with stacks)',
  bleeding:        'Bleed damage each turn',
  entropy:         'Void damage each turn + ATK/DEF reduced',
  poison:          'Poison damage each turn',
  poisoned:        'Poison damage each turn',
  rot:             'Rot damage each turn',
  decay:           'Decay damage each turn',
  ignite:          'Fire damage each turn',
  ignited:         'Fire damage each turn',
  scorch:          'Scorching fire damage each turn',
  scorched:        'Fire defense reduced',
  smolder:         'Smoldering fire damage each turn',
  smoldering:      'Low fire damage each turn',
  frostbite:       'Frost damage each turn',
  frost:           'Frost damage each turn',
  death_toxin:     'Stacking lethal toxin each turn',
  festering:       'Festering wound damage each turn',
  virulent:        'Virulent disease spreading each turn',
  radiation:       'Radiation damage each turn',
  irradiated:      'Radiation damage each turn',
  holy_burn:       'Holy fire damage each turn',
  magma_burn:      'Magma damage each turn',
  plasma_burn:     'Plasma damage each turn',
  soul_burn:       'Soul damage each turn',
  techburn:        'Tech damage each turn',
  cosmic_burn:     'Cosmic damage each turn',
  stellar_burn:    'Stellar damage each turn',
  crystal_burn:    'Crystal damage each turn',
  // ── CC ──
  stun:            'Cannot act this turn',
  stunned:         'Cannot act this turn',
  frozen:          'Frozen — SPD reduced, cannot dodge',
  freeze:          'Frozen — cannot act',
  paralyzed:       'Paralyzed — may lose turns',
  confused:        'Confused — may attack self',
  confusion:       'Confused — actions may backfire',
  silenced:        'Silenced — cannot use abilities',
  blind:           'Blinded — reduced accuracy',
  blinded:         'Blinded — reduced accuracy',
  smoke_blind:     'Blinded by smoke — high miss chance',
  charmed:         'Charmed — may skip turns',
  terrified:       'Terrified — reduced effectiveness',
  disarmed:        'Disarmed — cannot use weapon abilities',
  suppressed:      'Suppressed — abilities disabled',
  stasis:          'In stasis — cannot act',
  // ── Debuffs (stat reduction without numeric field) ──
  doom_marked:     'Doom mark — incoming damage +20%',
  doomed:          'Doomed — fate sealed',
  hexed:           'Hexed — under a curse',
  curse_mark:      'Cursed mark — accumulating hex',
  waterlogged:     'Waterlogged — SPD reduced',
  drenched:        'Drenched — water vulnerability',
  soaked:          'Soaked — water vulnerability',
  haunted:         'Haunted — loses MP each turn',
  rune_sear:       'Rune sear — rune damage on strikes',
  exposed:         'Exposed — DEF lowered',
  breached:        'Breached — defenses compromised',
  cracked:         'Cracked — defense weakening',
  shattered:       'Shattered — low DEF this turn',
  brittle:         'Brittle — vulnerable to next hit',
  targeted:        'Targeted — next hit deals bonus damage',
  marked:          'Marked — bonus damage from all sources',
  shadow_mark:     'Shadow marked — shadow strikes deal bonus damage',
  doom_sigil:      'Doom sigil — doom accumulating',
  oblivion_marked: 'Oblivion mark — extreme damage incoming',
  // ── Buffs (no numeric field) ──
  vanished:        'Vanished — next attack deals bonus damage',
  invulnerable:    'Invulnerable — immune to all damage',
  phased:          'Phased — partially immune to physical hits',
  astral_veil:     'Astral veil — dodge charges active',
  singularity_point:'Singularity point — next ability amplified',
  fighting_stance: 'Stance active — combat bonuses applied',
  counter_stance:  'Counter stance — next hit triggers counter',
  iron_fortress:   'Iron Fortress — reflects damage back',
  magma_coat:      'Magma Coat — attacker takes burn on hit',
  convergence_reset:'Convergence — damage doubled for 4 turns',
  mp_regen:        'MP regenerating each turn',
  hp_regen_combat: 'HP regenerating each turn',
};

function getStatusDesc(s) {
  // 1. Named lookup first
  if (STATUS_DESCS[s.id]) return STATUS_DESCS[s.id];
  // 2. Build from numeric fields
  const parts = [];
  if (s.atkBonus)  parts.push(`+${s.atkBonus} ATK`);
  if (s.defBonus)  parts.push(`+${s.defBonus} DEF`);
  if (s.spdBonus)  parts.push(`+${s.spdBonus} SPD`);
  if (s.critBonus) parts.push(`+${s.critBonus}% CRIT`);
  if (s.atkPen)    parts.push(`-${s.atkPen} ATK`);
  if (s.defPen)    parts.push(`-${s.defPen} DEF`);
  if (s.spdPen)    parts.push(`-${s.spdPen} SPD`);
  if (s.dmgMult && s.dmgMult !== 1)         parts.push(`×${s.dmgMult} outgoing dmg`);
  if (s.dmgReduce && s.dmgReduce > 0)       parts.push(`-${Math.round(s.dmgReduce*100)}% incoming dmg`);
  if (s.incomingDmgMult && s.incomingDmgMult !== 1) parts.push(`×${s.incomingDmgMult} incoming dmg`);
  if (s.hpRegen)     parts.push(`+${s.hpRegen} HP/turn`);
  if (s.mpRegen)     parts.push(`+${s.mpRegen} MP/turn`);
  if (s.dodgeChance) parts.push(`${s.dodgeChance}% dodge`);
  if (s.missChance)  parts.push(`${s.missChance}% enemy miss`);
  if (parts.length) return parts.join(', ');
  // 3. Pattern fallback for generated/hybrid IDs
  const id = s.id;
  if (s.type === 'debuff') {
    if (/burn|fire|scorch|ignit|magma|ember/.test(id))     return 'Fire damage each turn';
    if (/bleed|hemorrhage|wound/.test(id))                 return 'Bleed damage each turn';
    if (/poison|venom|toxic|plague|rot|decay/.test(id))    return 'Poison damage each turn';
    if (/frost|frozen|chill/.test(id))                     return 'Frost damage / SPD reduced';
    if (/stun|paralyz/.test(id))                           return 'Cannot act';
    if (/blind|smoke/.test(id))                            return 'Reduced accuracy';
    if (/entropy|void/.test(id))                           return 'Void damage / stats reduced';
    if (/weaken|wither|debilitat/.test(id))                return 'Stats reduced';
    if (/doom|fate|seal/.test(id))                         return 'Doom accumulating';
    if (/dot_/.test(id))                                   return 'Elemental damage each turn';
    if (/slow|slowed/.test(id))                            return 'SPD reduced';
    if (/mark|target/.test(id))                            return 'Marked — bonus damage incoming';
    return 'Debuff active';
  } else {
    if (/regen|heal/.test(id))                             return 'HP regenerating';
    if (/shield|ward|barrier|armor/.test(id))              return 'Damage absorbed / DEF boosted';
    if (/vanish|phase|veil|cloak|shadow_form/.test(id))    return 'Concealed — phase active';
    if (/invulner|immune/.test(id))                        return 'Immune to damage';
    if (/haste|speed|swift|gale/.test(id))                 return 'SPD boosted';
    if (/power|strength|rage|frenzy/.test(id))             return 'ATK boosted';
    if (/buff_/.test(id))                                   return 'Stance active — elemental bonuses applied';
    return 'Buff active';
  }
}

function renderStatusEffects(statuses, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!statuses||!statuses.length) { el.innerHTML='<span style="color:var(--text-dim);font-size:0.7rem;font-style:italic">None</span>'; return; }
  el.innerHTML = statuses.map(s=>{
    const desc = getStatusDesc(s);
    const stackStr = s.stacks ? ` (×${s.stacks})` : '';
    const dur = s.duration >= 999 ? 'permanent' : `${s.duration}t`;
    const tooltipName = `${s.icon} ${s.name}${stackStr}`.replace(/'/g,'`');
    const tooltipDesc = `${dur} — ${desc}`.replace(/'/g,'`');
    return `<div class="status-tag ${s.type} status-pulse" style="cursor:help"
      onmouseenter="showTooltip(event,'${tooltipName}','${tooltipDesc}')"
      onmouseleave="hideTooltip()">
      ${s.icon} ${s.name}${s.stacks?` ×${s.stacks}`:''} <span style="opacity:0.6">${s.duration>=999?'∞':s.duration+'t'}</span>
    </div>`;
  }).join('');
}

function renderEquipment() { renderEquipmentSlots(); }

function renderInventory() {
  const p   = G.player;
  document.getElementById('inv-count').textContent = `(${p.inventory.length}/12)`;
  const grid = document.getElementById('inventory-grid');
  if (!p.inventory.length) { grid.innerHTML='<span style="color:var(--text-dim);font-size:0.7rem;font-style:italic">Empty</span>'; return; }
  // Disable item clicks during enemy turn to prevent accidental modal-open while overlay may be pending
  const itemClickable = !(G.inCombat && G.turn !== 'player');
  grid.innerHTML = p.inventory.map((item,i)=>`
    <div class="item-card" ${itemClickable ? `onclick="openItemMenu(${i})"` : ''} style="${itemClickable ? '' : 'opacity:0.6;cursor:default;'}"
      onmouseenter="showTooltip(event,'${item.name.replace(/'/g,'`')}','${item.desc.replace(/'/g,'`')}')"
      onmouseleave="hideTooltip()">
      <div class="item-rarity ${item.rarity}" style="position:absolute;top:0.3rem;right:0.4rem">${item.rarity}</div>
      <div class="item-name">${item.icon} ${item.name}</div>
      <div class="item-type">${item.type}${item.element&&ELEMENTS[item.element]?' <span style="color:'+ELEMENTS[item.element].color+'">'+ELEMENTS[item.element].icon+'</span>':''}</div>
    </div>`).join('');
}

function renderEquipmentSlots() {
  const p = G.player;
  const weaponEl = p.equipment?.weapon?.element;
  const relicEl  = p.equipment?.relic?.element;
  const armorEl  = p.equipment?.armor?.element;
  // Affinity: any equipped item whose element matches an ability element
  const affinityAbils = p.abilities.filter(id => {
    const el = ABILITIES[id]?.element;
    return el && (el === weaponEl || el === relicEl || el === armorEl);
  });
  document.getElementById('equip-slots').innerHTML = [
    {slot:'weapon',label:'Weapon'},{slot:'armor',label:'Armor'},{slot:'relic',label:'Relic'}
  ].map(s=>{
    const item = p.equipment[s.slot];
    const elObj = item?.element ? ELEMENTS[item.element] : null;
    const elIcon = elObj ? elObj.icon : '';
    // Show affinity note on whichever slot triggered it
    const slotAffinityAbils = item?.element ? p.abilities.filter(id => ABILITIES[id]?.element === item.element) : [];
    const affinityNote = (slotAffinityAbils.length > 0)
      ? `<div style="font-size:0.6rem;color:${elObj?.color||'#ffaa00'};margin-top:1px">⚔ Affinity: ${slotAffinityAbils.map(id=>ABILITIES[id]?.name||id).join(', ')}</div>`
      : '';
    const unequipBtn = item && !item.permanent
      ? `<button onclick="event.stopPropagation();unequipItem('${s.slot}')" style="font-size:0.55rem;padding:1px 4px;margin-top:3px;background:var(--bg-deep);border:1px solid var(--border);color:var(--text-dim);cursor:pointer;border-radius:2px" title="Unequip">↑ unequip</button>`
      : '';
    return `<div class="equip-slot"
      onmouseenter="${item?`showTooltip(event,'${(item.name||'').replace(/'/g,'`')} ${elIcon}','${(item.desc||'').replace(/'/g,'`')}')`:'null'}"
      onmouseleave="hideTooltip()">
      <div class="equip-slot-name">${s.label}</div>
      <div class="equip-slot-item ${item?'equipped':''}">${item ? item.icon+' '+item.name+(elIcon?' '+elIcon:'') : '—'}</div>
      ${affinityNote}
      ${unequipBtn}
    </div>`;
  }).join('');
}

function renderAbilities() {
  const p = G.player;
  const inCombat = G.inCombat && G.turn==='player';
  const weaponEl = p.equipment?.weapon?.element;
  document.getElementById('abilities-grid').innerHTML = p.abilities.map(abId=>{
    const ab = ABILITIES[abId]; if(!ab) return '';
    const onCd   = (p.cooldowns[abId]||0)>0;
    const isHpCost = ab.costType === 'hp';
    const noResource = isHpCost ? (p.stats.hp <= ab.cost + 1) : (p.stats.mp < ab.cost);
    const disabled = !inCombat||onCd||noResource;
    const elObj = ab.element ? ELEMENTS[ab.element] : null;
    const costColor = isHpCost ? 'var(--hp-color)' : 'var(--mp-color)';
    const costLabel = isHpCost ? '♥' : '✦';
    const costDisplay = ab.cost > 0 ? `${ab.cost}${costLabel}` : (isHpCost ? '—♥' : '0✦');
    // Affinity glow: weapon element matches ability element
    const hasAffinity = weaponEl && ab.element && weaponEl === ab.element;
    const affinityStyle = hasAffinity ? `box-shadow:0 0 6px 2px ${elObj?.color||'#ffaa00'}88;` : '';
    const affinityBadge = hasAffinity ? `<span style="position:absolute;top:2px;right:3px;font-size:0.55rem;color:${elObj?.color||'#ffaa00'}" title="Weapon Affinity +20%">⚔</span>` : '';
    return `<button class="ability-btn ${onCd?'on-cooldown':''}"
      style="--ability-color:${ab.color||'var(--accent-violet)'};${affinityStyle}position:relative"
      ${disabled?'disabled':''}
      onclick="playerAction('ability','${abId}')"
      onmouseenter="showAbilityTooltip(event,'${abId}')"
      onmouseleave="hideTooltip()">
      ${onCd?`<span class="ab-cd">${p.cooldowns[abId]}t</span>`:''}
      ${affinityBadge}
      <span class="abn">${ab.icon} ${ab.name}${elObj?` <span style="font-size:0.6rem;color:${elObj.color}">${elObj.icon}</span>`:''}</span>
      <div class="ab-cost"><span style="color:${costColor}">${costDisplay}</span></div>
    </button>`;
  }).join('');
}

function renderBasicActions() {
  const inCombat = G.inCombat && G.turn==='player';
  const p        = G.player;
  const charge   = p.burstCharge||0;
  const burstReady = charge>=BURST_THRESHOLD && inCombat;
  const burstPct   = Math.min(100,(charge/BURST_THRESHOLD)*100);
  document.getElementById('basic-actions').innerHTML = `
    <button class="basic-btn" ${!inCombat?'disabled':''} onclick="playerAction('attack')">⚔ Attack</button>
    <button class="basic-btn" ${!inCombat?'disabled':''} onclick="playerAction('defend')">🛡 Defend</button>
    <button class="basic-btn" ${!inCombat?'disabled':''} onclick="playerAction('item')">🎒 Item</button>
    <button class="basic-btn danger" ${!inCombat?'disabled':''} onclick="playerAction('flee')">↩ Flee</button>
    <button class="basic-btn burst-btn" id="burst-btn"
      ${!burstReady?'disabled':''} onclick="playerAction('burst')"
      style="grid-column:span 2;${burstReady?'border-color:#cc44ff;color:#cc44ff;':''}">
      <div class="burst-fill-bg" id="burst-fill" style="width:${burstPct}%"></div>
      <span style="position:relative">⚡ BURST ${burstReady?'READY!':Math.round(burstPct)+'%'}</span>
    </button>`;
}

function renderCenterPanel() {
  const view = document.getElementById('dungeon-view');
  if (G.phase==='combat'&&G.inCombat&&G.enemy) renderCombatView(view);
  else renderExploreView(view);
}

// ── Combat view ───────────────────────────────────────────────
function renderCombatView(view) {
  // MULTI-ENEMY: packs get their own simpler layout (see mapgen.js —
  // packs are guaranteed regular-enemy-only, so no boss phase bar/enrage
  // timer needed here). Solo fights fall through to the original card
  // below completely unchanged.
  if (G.enemies && G.enemies.length > 1) { renderPackCombatView(view, G.enemies); return; }

  const e    = G.enemy;
  const hpPct = clamp(e.hp/e.maxHp*100,0,100);
  const elObj = e.element ? ELEMENTS[e.element] : null;
  const isBoss= e.isBoss;
  const isGuardian = e.isGuardian;
  const isElite = e.isElite;

  // TELEGRAPHING: show the enemy's next move before it happens (see
  // getEnemyNextMove() in enemies.js). Reads e.patternIndex, which only
  // advances when the enemy actually takes its turn — so this always
  // reflects the real upcoming move, including through a stunned turn.
  const nextMove = getEnemyNextMove(e);

  // HP bar color
  const hpColor = hpPct>60 ? 'var(--hp-color)' : hpPct>30 ? '#d4844a' : 'var(--accent-crimson)';

  view.innerHTML = `
    <div class="combat-arena">
      <div class="enemy-display" id="enemy-display"
        style="${isBoss?'border-color:var(--accent-crimson-bright);box-shadow:0 0 24px rgba(204,34,34,0.35)':isGuardian?'border-color:#cc8833;':isElite?'border-color:#9955dd;box-shadow:0 0 16px rgba(153,85,221,0.3)':''}" >
        <div class="combo-display" id="combo-disp"></div>
        ${isBoss||isGuardian ? `<div id="boss-phase-bar" class="boss-phase-bar"></div>` : ''}
        <span class="enemy-sprite" id="enemy-sprite">${e.icon}</span>
        <div class="enemy-name-display" style="${isBoss?'color:var(--accent-crimson-bright);font-size:1.1rem;font-weight:700;letter-spacing:0.05em':isElite?'color:#9955dd;font-weight:700':''}">
          ${e.name}
          ${elObj?`<span class="element-badge" style="background:${elObj.color}22;border:1px solid ${elObj.color};color:${elObj.color};border-radius:4px;padding:1px 5px;font-size:0.65rem;margin-left:4px">${elObj.icon} ${elObj.name}</span>`:''}
          ${isGuardian?`<span style="color:#cc8833;font-size:0.7rem;margin-left:4px">[GUARDIAN]</span>`:''}
          ${isElite?`<span style="color:#9955dd;font-size:0.7rem;margin-left:4px">[ELITE]</span>`:''}
        </div>
        <div class="enemy-title" style="font-style:italic;color:var(--text-dim);font-size:0.68rem">"${e.title||''}"</div>
        <div class="enemy-next-move" style="font-size:0.72rem;color:var(--text-dim);margin-top:3px;display:flex;align-items:center;justify-content:center;gap:5px">
          <span style="opacity:0.65">Next:</span>
          <span style="color:${isBoss?'var(--accent-crimson-bright)':'var(--text-main,#ddd)'};font-weight:600">${nextMove.icon} ${nextMove.label}</span>
        </div>
        ${isBoss?`<div class="round-counter" style="font-size:0.65rem;color:var(--text-dim)">Turn ${G.combatRound+1}${e.enrageTurns?' · Enrage in '+(e.enrageTurns-((e.enrageCount||0)%e.enrageTurns))+' turns':''}</div>`:''}
        <div class="enemy-hp-bar">
          <div class="resource-bar-label">
            <span style="color:var(--text-dim);font-size:0.68rem">HP</span>
            <span style="font-size:0.68rem">${e.hp}/${e.maxHp}</span>
          </div>
          <div class="resource-bar-track" style="height:12px">
            <div class="resource-bar-fill" style="width:${hpPct}%;background:${hpColor};transition:width 0.3s"></div>
          </div>
        </div>
        <div class="status-row" id="enemy-status" style="margin-top:0.4rem;display:flex;flex-wrap:wrap;gap:3px"></div>
      </div>
    </div>`;

  renderStatusEffects(e.status||[], 'enemy-status');
  if (isBoss||isGuardian) renderBossPhaseBar(e);

  // combo display update
  updateComboUI();
}

// renderPackCombatView — multi-enemy "pack" encounter layout. Simpler
// per-card markup than the solo view above since packs are guaranteed
// regular-enemy-only (see placeEnemyCell() in mapgen.js) — no boss phase
// bar or enrage timer needed. Click a card to target it (targetEnemy() in
// combat.js); the currently-targeted card gets a highlighted border.
function renderPackCombatView(view, enemies) {
  const cardsHTML = enemies.map((e, idx) => {
    const alive = e.hp > 0;
    const hpPct = clamp(e.hp/e.maxHp*100, 0, 100);
    const hpColor = hpPct>60 ? 'var(--hp-color)' : hpPct>30 ? '#d4844a' : 'var(--accent-crimson)';
    const elObj = e.element ? ELEMENTS[e.element] : null;
    const isTargeted = alive && idx === G.targetIndex;
    const nextMove = alive ? getEnemyNextMove(e) : null;
    return `
      <div class="enemy-display pack-card" id="enemy-display-${idx}"
        onclick="${alive?`targetEnemy(${idx})`:''}"
        style="cursor:${alive?'pointer':'default'};opacity:${alive?1:0.4};width:160px;flex:0 0 auto;padding:0.8rem;${isTargeted?'border-color:var(--accent-crimson-bright);box-shadow:0 0 16px rgba(204,34,34,0.3)':''}">
        <span class="enemy-sprite" id="enemy-sprite-${idx}">${alive?e.icon:'💀'}</span>
        <div class="enemy-name-display" style="font-size:0.85rem;${isTargeted?'font-weight:700':''}">
          ${e.name}
          ${elObj?`<span class="element-badge" style="background:${elObj.color}22;border:1px solid ${elObj.color};color:${elObj.color};border-radius:4px;padding:0 4px;font-size:0.6rem;margin-left:3px">${elObj.icon}</span>`:''}
          ${isTargeted?`<span style="color:var(--accent-crimson-bright);font-size:0.65rem;margin-left:3px">🎯</span>`:''}
        </div>
        ${alive?`
        <div class="enemy-next-move" style="font-size:0.65rem;color:var(--text-dim);margin-top:2px;display:flex;align-items:center;justify-content:center;gap:4px">
          <span style="opacity:0.65">Next:</span>
          <span style="font-weight:600">${nextMove.icon} ${nextMove.label}</span>
        </div>` : `<div style="font-size:0.7rem;color:var(--text-dim);margin-top:2px">Defeated</div>`}
        <div class="enemy-hp-bar">
          <div class="resource-bar-label">
            <span style="color:var(--text-dim);font-size:0.62rem">HP</span>
            <span style="font-size:0.62rem">${e.hp}/${e.maxHp}</span>
          </div>
          <div class="resource-bar-track" style="height:8px">
            <div class="resource-bar-fill" style="width:${hpPct}%;background:${hpColor};transition:width 0.3s"></div>
          </div>
        </div>
        <div class="status-row" id="enemy-status-${idx}" style="margin-top:0.3rem;display:flex;flex-wrap:wrap;gap:2px;justify-content:center"></div>
      </div>`;
  }).join('');

  view.innerHTML = `
    <div class="combat-arena">
      <div class="combo-display" id="combo-disp"></div>
      <div class="pack-arena" style="display:flex;gap:0.6rem;flex-wrap:wrap;justify-content:center">
        ${cardsHTML}
      </div>
    </div>`;

  enemies.forEach((e, idx) => renderStatusEffects(e.status||[], `enemy-status-${idx}`));
  updateComboUI();
}

// ── Explore / map view ────────────────────────────────────────
function renderExploreView(view) {
  if (!G.map) { view.innerHTML='<div style="color:var(--text-dim);text-align:center;padding:2rem">Generating dungeon...</div>'; return; }

  const cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--map-cell-size'))||26;
  const {x:px,y:py} = G.playerPos;
  const viewW = (view.clientWidth  || view.offsetWidth  || 400);
  const viewH = (view.clientHeight || view.offsetHeight || 320);

  let html = `<div class="explore-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;padding:0 0.25rem">
    <span style="font-size:0.7rem;color:var(--text-dim)">${G.floor<=7?'Surface Ruins':G.floor<=20?'The Deep':G.floor<=35?'Brutal Abyss':'The Abyssal Depths'} — Floor ${G.floor}</span>
    <span style="font-size:0.62rem;color:var(--text-dim);font-style:italic">WASD / ↑↓←→ to move</span>
    <span style="font-size:0.7rem;color:var(--text-dim)">${getFloorTier(G.floor).toUpperCase()}</span>
  </div>`;

  html += `<div class="map-viewport" style="width:100%;height:${viewH-36}px;overflow:hidden;position:relative;background:#0a080e;border:1px solid var(--border)">
    <div class="map-inner" id="map-inner" style="position:absolute;transition:transform 0.12s;transform:translate(${Math.round(viewW/2-px*cellSize-cellSize/2)}px,${Math.round((viewH-36)/2-py*cellSize-cellSize/2)}px)">`;

  for (let y=0;y<G.mapH;y++) {
    for (let x=0;x<G.mapW;x++) {
      const cell = G.map[y][x];
      if (!cell.revealed) { html+=`<div class="mc wall fog" style="left:${x*cellSize}px;top:${y*cellSize}px;width:${cellSize}px;height:${cellSize}px;position:absolute"></div>`; continue; }
      const isPlayer = x===px&&y===py;
      let cls='mc'; let inner=''; let bg=''; let title='';
      if (cell.type==='wall') {
        cls+=' wall'; bg='background:var(--map-wall)';
        if (cell.secretHint&&!cell.secretRevealed) { cls+=' secret-hint'; }
      } else {
        cls+=' floor'; bg='background:var(--map-floor)';
        if (cell.visited) bg='background:var(--map-floor-visited)';
        if (cell.isCorridor) bg='background:var(--map-corridor)';
        if (cell.secret&&!cell.secretRevealed) cls+=' secret-cell';
        if (isPlayer) { cls+=' player-cell'; inner='<div class="player-dot"></div>'; }
        else {
          switch(cell.content) {
            case 'enemy':    cls+=' enemy-cell';   inner=cell.enemies?'👥':'👾'; title=cell.enemies?`Enemy Pack (${cell.enemies.length})`:(cell.enemy?.name||'Enemy'); break;
            case 'boss': case 'boss_active': cls+=' boss-cell'; inner='💀'; title='BOSS'; break;
            case 'treasure': cls+=' treasure-cell'; inner='◆'; title='Treasure'; break;
            case 'shop':     cls+=' shop-cell';     inner='🏪'; title='Shop'; break;
            case 'event':    cls+=' event-cell';    inner='?'; title='Event'; break;
            case 'exit':     cls+=' exit-cell';     inner='▼'; title='Exit (Open)'; break;
            case 'exit_locked':case 'boss_exit': cls+=' exit-locked-cell'; inner='🔒'; title='Exit (Locked)'; break;
            case 'start':    cls+=' start-cell'; break;
          }
        }
      }
      html+=`<div class="${cls}" title="${title}" style="position:absolute;left:${x*cellSize}px;top:${y*cellSize}px;width:${cellSize}px;height:${cellSize}px;${bg};font-size:${Math.max(10,cellSize*0.5)}px;display:flex;align-items:center;justify-content:center">${inner}</div>`;
    }
  }
  html+='</div></div>';

  view.innerHTML = html;
}

// ── Right panel (log) ─────────────────────────────────────────
let _lastLogLength = 0;
function renderRightPanel() {
  const log = document.getElementById('combat-log');
  if (!log) return;
  const entries = G.log.slice(0, 60);
  if (entries.length === _lastLogLength) return; // nothing new, don't touch the DOM
  _lastLogLength = entries.length;
  const wasAtBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 40;
  log.innerHTML = entries.map(entry=>`
    <div class="log-entry ${entry.type}">${entry.msg}</div>`).join('');
  if (wasAtBottom) log.scrollTop = log.scrollHeight;
}

// ── Floating damage numbers ───────────────────────────────────
function spawnFloat(text, type, containerId) {
  if (!S.dmgNumbers) return;
  const container = document.getElementById(containerId);
  if (!container) return;
  const el = document.createElement('div');
  el.className = `float-num ${type}`;
  el.textContent = type==='damage'?`-${text}`:type==='heal'?`+${text}`:text;
  el.style.cssText = `left:${20+rand(60)}%;top:${10+rand(40)}%;`;
  container.appendChild(el);
  setTimeout(()=>el.remove(), 1200);
}

// ── Tooltip ───────────────────────────────────────────────────
function showTooltip(event, name, desc) {
  let tt = document.getElementById('tooltip');
  if (!tt) { tt=document.createElement('div'); tt.id='tooltip'; tt.className='tooltip'; document.body.appendChild(tt); }
  tt.innerHTML = `<strong>${name}</strong><br>${desc}`;
  tt.style.display = 'block';
  tt.style.left = 'auto';
  tt.style.top  = 'auto';
  const ttW = tt.offsetWidth  || 220;
  const ttH = tt.offsetHeight || 80;
  const margin = 8;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let x = event.clientX + margin;
  if (x + ttW > vw - margin) x = event.clientX - ttW - margin;
  let y = event.clientY + margin;
  if (y + ttH > vh - margin) y = event.clientY - ttH - margin;
  tt.style.left = Math.max(margin, x) + 'px';
  tt.style.top  = Math.max(margin, y) + 'px';
}
function showAbilityTooltip(event, abId) {
  const ab = ABILITIES[abId]; if(!ab)return;
  const elObj = ab.element?ELEMENTS[ab.element]:null;
  const elStr = elObj?` · <span style="color:${elObj.color}">${elObj.icon} ${elObj.name}</span>`:'';
  const costStr = ab.costType==='hp' ? `<span style="color:var(--hp-color)">${ab.cost>0?ab.cost:'—'}♥ HP</span>`
                : ab.costType==='burst' ? `<span style="color:#cc44ff">BURST</span>`
                : `<span style="color:var(--mp-color)">${ab.cost}✦ MP</span>`;
  const weaponEl = G.player?.equipment?.weapon?.element;
  const affinityStr = (weaponEl && ab.element && weaponEl===ab.element)
    ? ` · <span style="color:${elObj?.color||'#ffaa00'}">⚔ +20% Affinity</span>` : '';
  showTooltip(event, ab.name+elStr, ab.desc + ` · ${costStr}` + (ab.maxCooldown?` · CD: ${ab.maxCooldown}t`:'') + affinityStr);
}
function hideTooltip() {
  const tt=document.getElementById('tooltip'); if(tt)tt.style.display='none';
}

// ── Item popup ────────────────────────────────────────────────
function showItemPopup(item) {
  const elObj = item.element ? ELEMENTS[item.element] : null;
  const html = `
    <div style="padding-top:0.5rem">
      <div class="modal-title">${item.icon} ${item.name}</div>
      <div class="item-rarity ${item.rarity}" style="text-align:center;font-size:0.7rem;letter-spacing:0.1em;margin-bottom:0.5rem">${item.rarity.toUpperCase()}</div>
      ${elObj?`<div style="text-align:center;color:${elObj.color};margin-bottom:0.5rem">${elObj.icon} ${elObj.name}</div>`:''}
      <div style="color:var(--text-mid);font-size:0.8rem;text-align:center;margin-bottom:0.25rem">${item.desc}</div>
      <button class="title-btn primary" style="display:block;width:100%;margin-top:1rem;min-width:0;max-width:100%;padding:0.5rem 1rem;font-size:0.85rem" onclick="closeModal()">Take it</button>
    </div>`;
  showModal(html);
}
