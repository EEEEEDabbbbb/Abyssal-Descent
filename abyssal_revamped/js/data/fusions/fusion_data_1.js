// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 1 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_1 = {
  'ironclad+shadowblade': 'darkguard',
  'shadowblade+soulweaver': 'shade_reaper',
  'pyromancer+shadowblade': 'ashstalker',
  'shadowblade+stormcaller': 'thundershade',
  'bloodknight+shadowblade': 'crimson_phantom',
  'shadowblade+voidmancer': 'null_assassin',
  'runeblade+shadowblade': 'runic_shadow',
  'necromancer+shadowblade': 'death_stalker',
  'paladin+shadowblade': 'dusk_templar',
  'frostweaver+shadowblade': 'frostshade',
  'dragonknight+shadowblade': 'shadow_drake',
  'shadowblade+tidecaller': 'tide_shade',
  'gravitist+shadowblade': 'gravity_wraith',
  'shadowblade+soundbreaker': 'silent_shatter',
  'chronomancer+shadowblade': 'temporal_shade',
  'shadowblade+spellsword': 'spell_phantom',
  'plaguedoctor+shadowblade': 'plague_shade',
  'geomancer+shadowblade': 'dust_wraith',
  'lightbringer+shadowblade': 'eclipse_blade',
  'beastmaster+shadowblade': 'night_predator',
  'shadowblade+techsavant': 'ghost_protocol',
  'gravewarden+shadowblade': 'grave_phantom',
  'magnetist+shadowblade': 'iron_ghost',
  'crystalmancer+shadowblade': 'prism_shade',
  'shadowblade+warlord': 'war_phantom',
  'shadowblade+spiritwalker': 'spirit_stalker',
  'hexblade+shadowblade': 'cursed_phantom',
  'cosmomancer+shadowblade': 'starstalker',
  'pestilencelord+shadowblade': 'plague_phantom',
  'shadowblade+windwalker': 'storm_shade',
  'doomcaster+shadowblade': 'doom_shade',
  'arcanist+shadowblade': 'arcane_phantom',
  'sentinel+shadowblade': 'shadow_warden',
  'phantom+shadowblade': 'abyssal_specter',
  'ironclad+soulweaver': 'soul_sentinel',
  'ironclad+pyromancer': 'magmaclad',
  'ironclad+stormcaller': 'stormwall',
  'bloodknight+ironclad': 'iron_tyrant'
};

const FUSION_CLASSES_1 = {
  darkguard: {
    id:'darkguard', name:'Darkguard', icon:'🌑',
    tagline:'Shadow and steel. One hides. One holds.',
    color:'#556699', element:'voidsteel', rarity:'uncommon',
    fusedFrom:['shadowblade','ironclad'],
    stats:{hp:110,maxHp:110,mp:50,maxMp:50,atk:13,def:10,spd:13,crit:14},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:8},
    abilities:['shadow_strike','vanish','iron_fortress','death_mark','shadow_normal_exploit','shadow_normal_gut','steel_resolve','bulwark_charge'],
    burstAbility:'shadow_burst',
    passives:['shadow_step','iron_skin'],
    description:'The steel-clad shadow — a fusion of raw defensive power and lethal precision. Vanishes behind an iron wall and strikes when enemies least expect it.',
    lore:'The Ironclad descended into the Abyss expecting a siege. The Shadowblade was already inside, waiting. Neither remembers who approached whom first.'
  },

  shade_reaper: {
    id:'shade_reaper', name:'Shade Reaper', icon:'🌙',
    tagline:'The soul slips out before the body knows it.',
    color:'#557788', element:'wraith', rarity:'rare',
    fusedFrom:['shadowblade','soulweaver'],
    stats:{hp:75,maxHp:75,mp:80,maxMp:80,atk:12,def:6,spd:14,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:8},
    abilities:['shadow_strike','vanish','soul_drain','death_mark','shadow_normal_predator','water_ghost_wraith','shadow_normal_assassination','astral_veil'],
    burstAbility:'soulweaver_burst',
    passives:['shadow_step','soul_harvest'],
    description:'A phantom that bleeds targets dry. Every kill heals. Every vanish drains. The border between the living and the dead blurs with every strike.',
    lore:'It does not kill enemies. It harvests them — soul first, then body, then memory. What returns to the dungeon is never quite the same.'
  },

  ashstalker: {
    id:'ashstalker', name:'Ashstalker', icon:'🔥',
    tagline:'The kill is quick. The burning is not.',
    color:'#aa3311', element:'cindershadow', rarity:'uncommon',
    fusedFrom:['shadowblade','pyromancer'],
    stats:{hp:78,maxHp:78,mp:75,maxMp:75,atk:12,def:5,spd:14,crit:18},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:7},
    abilities:['shadow_strike','vanish','fire_shadow_veil','death_mark','shadow_fire_brand','shadow_fire_ember_step','fire_shadow_cinder','shadow_fire_cremation'],
    burstAbility:'shadow_burst',
    passives:['shadow_step','combustion'],
    description:'Strikes from nowhere and leaves nothing but embers. Marks targets with cursed fire, vanishes, then triggers the burn when they think they are safe.',
    lore:'Where it walked, the ash did not settle. It drifted — against the wind, against gravity — following whoever the Ashstalker intended to find next.'
  },

  thundershade: {
    id:'thundershade', name:'Thundershade', icon:'⚡',
    tagline:'You were never there. The lightning was.',
    color:'#5566aa', element:'stormshade', rarity:'uncommon',
    fusedFrom:['shadowblade','stormcaller'],
    stats:{hp:83,maxHp:83,mp:70,maxMp:70,atk:14,def:6,spd:16,crit:19},
    statDisplay:{HP:6,ATK:10,DEF:4,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','shadow_electric_volt_step','death_mark','electric_shadow_phantom','shadow_electric_chain_slash','shadow_electric_thundercloak','shadow_electric_lightning_execution'],
    burstAbility:'storm_burst',
    passives:['shadow_step','static_charge'],
    description:'Moves like shadow, strikes like thunder. Each vanish charges a bolt. Each bolt strikes before sound travels.',
    lore:'Stormcallers summon lightning from above. Shadowblades strike from below. When they fused, they discovered there was no above or below — only where the next strike would fall.'
  },

  crimson_phantom: {
    id:'crimson_phantom', name:'Crimson Phantom', icon:'🩸',
    tagline:'Pain is the knife. Blood is the shadow.',
    color:'#882233', element:'abyssblade', rarity:'uncommon',
    fusedFrom:['shadowblade','bloodknight'],
    stats:{hp:100,maxHp:100,mp:55,maxMp:55,atk:15,def:8,spd:13,crit:15},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_water_blood_tide','fire_blood_hemorrhage','shadow_normal_gut','fire_blood_bloodboil'],
    burstAbility:'bloodknight_burst',
    passives:['shadow_step','vital_hunger'],
    description:'A specter that feeds on wounds. Every attack bleeds the target; every bleed heals the Crimson Phantom. Retreats into shadow to drink the blood it has spilled.',
    lore:'The blood does not fall. It rises — drawn toward the phantom like iron filings to a lodestone. The enemy watches their own life leave them in long crimson arcs.'
  },

  null_assassin: {
    id:'null_assassin', name:'Null Assassin', icon:'🌑',
    tagline:'You were never here. Reality agrees.',
    color:'#664499', element:'shadow', rarity:'rare',
    fusedFrom:['shadowblade','voidmancer'],
    stats:{hp:73,maxHp:73,mp:85,maxMp:85,atk:13,def:5,spd:14,crit:19},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['shadow_strike','vanish','fire_void_voidfire','death_mark','normal_void_slash','normal_void_pierce','shadow_normal_vanishing_act','shadow_normal_assassination'],
    burstAbility:'void_burst',
    passives:['shadow_step','void_affinity'],
    description:'Erases itself from the fabric of the dungeon, then erases the target. Does not leave footprints. Does not cast a shadow. Does not miss.',
    lore:'There is no record of it entering the room. There is no record of the room, afterward.'
  },

  runic_shadow: {
    id:'runic_shadow', name:'Runic Shadow', icon:'🔱',
    tagline:'The rune is carved in darkness. The blade remembers.',
    color:'#886622', element:'runeshadow', rarity:'uncommon',
    fusedFrom:['shadowblade','runeblade'],
    stats:{hp:90,maxHp:90,mp:65,maxMp:65,atk:14,def:7,spd:15,crit:18},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:9,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_expose','shadow_normal_feint','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'runeblade_burst',
    passives:['shadow_step','rune_mastery'],
    description:'Inscribes runes of doom upon enemies in the dark. The runes detonate when triggered — the target never sees the trap, only feels it.',
    lore:'The runes do not glow. That is the point. Other runeblades announce their art. This one waits until the art is irreversible.'
  },

  death_stalker: {
    id:'death_stalker', name:'Death Stalker', icon:'💀',
    tagline:'The plague spreads from shadow. The corpse never saw you.',
    color:'#337722', element:'wraith', rarity:'rare',
    fusedFrom:['shadowblade','necromancer'],
    stats:{hp:75,maxHp:75,mp:90,maxMp:90,atk:12,def:5,spd:13,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_grass_blight_mark','shadow_grass_death_blossom','shadow_normal_assassination','astral_veil'],
    burstAbility:'necro_burst',
    passives:['shadow_step','death_aura'],
    description:'A killer that leaves pestilence in its wake. Applies blight marks from invisibility, lets disease do the slow work, then finishes with cold precision.',
    lore:'The necromancer wanted armies. The shadowblade wanted solitude. Together, they found a middle path: one target, perfectly unmade, without a sound.'
  },

  dusk_templar: {
    id:'dusk_templar', name:'Dusk Templar', icon:'⚜️',
    tagline:'The light casts a shadow. Walk in both.',
    color:'#886633', element:'dusklight', rarity:'rare',
    fusedFrom:['shadowblade','paladin'],
    stats:{hp:105,maxHp:105,mp:60,maxMp:60,atk:14,def:9,spd:13,crit:15},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:8,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_expose','shadow_normal_exploit','shadow_normal_gut','shadow_normal_assassination'],
    burstAbility:'paladin_burst',
    passives:['shadow_step','sacred_aura'],
    description:'Holy steel walks in shadow. Judges enemies in secret — marks them with divine doom, then executes holy judgment from the dark.',
    lore:'The order did not understand. A paladin does not hide, they said. But the Abyss is not a place of honor. It is a place of result.'
  },

  frostshade: {
    id:'frostshade', name:'Frostshade', icon:'❄️',
    tagline:'Cold as shadow. Sharp as ice.',
    color:'#5577aa', element:'frostshadow', rarity:'rare',
    fusedFrom:['shadowblade','frostweaver'],
    stats:{hp:80,maxHp:80,mp:73,maxMp:73,atk:13,def:7,spd:15,crit:19},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_water_cold_read','shadow_water_mist_step','shadow_water_undertow','shadow_water_riptide'],
    burstAbility:'frostweaver_burst',
    passives:['shadow_step','frost_mastery'],
    description:'A shadow that freezes time before the blade falls. Slows targets from darkness, then strikes when they are perfectly still.',
    lore:'It does not leave blood on the floor. The blood freezes mid-fall, suspended in the cold dark, long after the Frostshade has vanished.'
  },

  shadow_drake: {
    id:'shadow_drake', name:'Shadow Drake', icon:'🐉',
    tagline:'The dragon does not announce itself.',
    color:'#664422', element:'shadowdrake', rarity:'rare',
    fusedFrom:['shadowblade','dragonknight'],
    stats:{hp:105,maxHp:105,mp:55,maxMp:55,atk:16,def:9,spd:14,crit:17},
    statDisplay:{HP:7,ATK:11,DEF:6,SPD:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','fire_shadow_veil','fire_shadow_cinder','shadow_fire_dark_pyre','shadow_fire_cremation'],
    burstAbility:'dragonknight_burst',
    passives:['shadow_step','intimidation'],
    description:'A dragon that hunts like a predator. Wraps itself in shadow-flame, erupts from nothing, and leaves a crater where the enemy stood.',
    lore:'Dragons announce themselves. They believe in the theater of dominance. This one learned, in the dark, that the kill is sweeter when they never see it coming.'
  },

  tide_shade: {
    id:'tide_shade', name:'Tide Shade', icon:'🌊',
    tagline:'Beneath the tide, in the dark, something waits.',
    color:'#335566', element:'mireshadow', rarity:'uncommon',
    fusedFrom:['shadowblade','tidecaller'],
    stats:{hp:83,maxHp:83,mp:75,maxMp:75,atk:13,def:7,spd:15,crit:17},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_water_phantom_current','shadow_water_undertow','shadow_water_blood_tide','shadow_water_drowning_mark'],
    burstAbility:'tidecaller_burst',
    passives:['shadow_step','tidal_flow'],
    description:'Hunts from beneath dark water. The current is its cloak. It drowns targets in shadow, marks them for death, and lets the tide do the rest.',
    lore:'It does not breathe underwater. It does not need to. It has not needed air since the depths taught it patience.'
  },

  gravity_wraith: {
    id:'gravity_wraith', name:'Gravity Wraith', icon:'⚫',
    tagline:'Even light cannot escape the hunt.',
    color:'#443366', element:'gravshade', rarity:'rare',
    fusedFrom:['shadowblade','gravitist'],
    stats:{hp:78,maxHp:78,mp:78,maxMp:78,atk:13,def:6,spd:14,crit:18},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','normal_gravity_crush','normal_gravity_pull','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'gravitist_burst',
    passives:['shadow_step','gravity_well'],
    description:'Warps gravity around its targets before striking. Crushes them from above, below, and inside simultaneously — then vanishes before their collapse is complete.',
    lore:'Gravity pulls everything toward a center. The Gravity Wraith makes itself that center — then removes itself at the last possible moment.'
  },

  silent_shatter: {
    id:'silent_shatter', name:'Silent Shatter', icon:'🔇',
    tagline:'You hear nothing. Then everything breaks.',
    color:'#665544', element:'silentwave', rarity:'rare',
    fusedFrom:['shadowblade','soundbreaker'],
    stats:{hp:80,maxHp:80,mp:73,maxMp:73,atk:14,def:6,spd:16,crit:19},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_electric_paralytic_mark','shadow_electric_chain_slash','shadow_normal_expose','shadow_normal_assassination'],
    burstAbility:'soundbreaker_burst',
    passives:['shadow_step','resonance'],
    description:'Approaches in absolute silence, then detonates a cascade of sonic force that shatters armor and resolve alike. The enemy hears nothing — then hears everything at once.',
    lore:'The first sound is the last sound. Between silence and ruin, there is one heartbeat of understanding. Not enough time.'
  },

  temporal_shade: {
    id:'temporal_shade', name:'Temporal Shade', icon:'⏳',
    tagline:'The shadow arrives before you do.',
    color:'#665588', element:'timeshade', rarity:'rare',
    fusedFrom:['shadowblade','chronomancer'],
    stats:{hp:75,maxHp:75,mp:85,maxMp:85,atk:13,def:6,spd:15,crit:18},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:9,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','normal_time_strike','normal_time_echo','shadow_normal_vanishing_act','shadow_normal_assassination'],
    burstAbility:'chronomancer_burst',
    passives:['shadow_step','time_warp'],
    description:'Strikes targets before they know they have been struck. Steps between seconds to reposition, doubles back on its own timeline, and ends the fight before it began.',
    lore:'When the body fell, the attacker was already three hallways away. The body did not know this yet. It was still raising its weapon.'
  },

  spell_phantom: {
    id:'spell_phantom', name:'Spell Phantom', icon:'🔮',
    tagline:'The blade casts spells. The shadow casts doubt.',
    color:'#775566', element:'spellshadow', rarity:'rare',
    fusedFrom:['shadowblade','spellsword'],
    stats:{hp:85,maxHp:85,mp:70,maxMp:70,atk:14,def:7,spd:15,crit:19},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_feint','shadow_normal_expose','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'spellsword_burst',
    passives:['shadow_step','spellblade'],
    description:'Every spell is a setup for the blade. Every strike sets up the next spell. Feints enemies into dropping their guard, then chains arcane and physical damage in a dizzying spiral.',
    lore:'Other spellswords cast loudly. The Spell Phantom uses magic the way a pickpocket uses conversation — as misdirection, not the act.'
  },

  plague_shade: {
    id:'plague_shade', name:'Plague Shade', icon:'🩺',
    tagline:'The infection arrived with the shadow.',
    color:'#556633', element:'plagueshadow', rarity:'rare',
    fusedFrom:['shadowblade','plaguedoctor'],
    stats:{hp:78,maxHp:78,mp:80,maxMp:80,atk:13,def:6,spd:14,crit:17},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_grass_spore_veil','shadow_grass_blight_mark','shadow_grass_entangle','shadow_grass_death_blossom'],
    burstAbility:'plaguedoctor_burst',
    passives:['shadow_step','immunity'],
    description:'Delivers contagion from the dark. A single touch in passing leaves a disease that consumes the target hours later — long after the shade is gone.',
    lore:'The plague doctor wore a mask to keep the disease out. This one wears the dark to keep the disease in — until the moment it chooses to release it.'
  },

  dust_wraith: {
    id:'dust_wraith', name:'Dust Wraith', icon:'🪨',
    tagline:'It rose from the stone. It killed from the dark.',
    color:'#665544', element:'dustshade', rarity:'uncommon',
    fusedFrom:['shadowblade','geomancer'],
    stats:{hp:90,maxHp:90,mp:65,maxMp:65,atk:14,def:9,spd:13,crit:16},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:8,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_exploit','shadow_normal_gut','shadow_normal_expose','shadow_normal_assassination'],
    burstAbility:'shadow_burst',
    passives:['shadow_step','earth_body'],
    description:'Stone and shadow, merged. Erupts from the floor without warning, strikes with the force of an avalanche, then dissolves back into the earth.',
    lore:'Geomancers raise walls. This one lowers them — on top of whoever is standing beneath. The rubble does not look like a murder. That is part of the design.'
  },

  eclipse_blade: {
    id:'eclipse_blade', name:'Eclipse Blade', icon:'🌗',
    tagline:'The light does not scare the shadow. It sharpens it.',
    color:'#997722', element:'eclipseblade', rarity:'rare',
    fusedFrom:['shadowblade','lightbringer'],
    stats:{hp:83,maxHp:83,mp:73,maxMp:73,atk:14,def:7,spd:15,crit:18},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','fire_shadow_veil','fire_shadow_cinder','shadow_fire_brand','shadow_fire_soul_ignition'],
    burstAbility:'lightbringer_burst',
    passives:['shadow_step','radiant'],
    description:'Blinds enemies with radiant flash, then strikes from the induced darkness. The light is not a weapon — it is a blindfold.',
    lore:'Lightbringers burn the dark away. Eclipse blades use the transition — that sliver of adjustment, when the eye expects light but finds shadow — to strike.'
  },

  night_predator: {
    id:'night_predator', name:'Night Predator', icon:'🐾',
    tagline:'Feral in the dark. Lethal in the silence.',
    color:'#554422', element:'runeshadow', rarity:'uncommon',
    fusedFrom:['shadowblade','beastmaster'],
    stats:{hp:88,maxHp:88,mp:63,maxMp:63,atk:15,def:7,spd:16,crit:18},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:9,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_predator','shadow_normal_gut','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'shadow_burst',
    passives:['shadow_step','feral_bond'],
    description:'Hunts like an apex predator — stacks marks on prey from the shadows, reads their weaknesses, then unleashes a flurry of savage strikes from darkness.',
    lore:'The beast did not need to learn stealth. It was born knowing silence. When it fused with the shadowblade, it simply found a discipline as patient as itself.'
  },

  ghost_protocol: {
    id:'ghost_protocol', name:'Ghost Protocol', icon:'⚙️',
    tagline:'The system never detected the intrusion.',
    color:'#445566', element:'ghosttech', rarity:'rare',
    fusedFrom:['shadowblade','techsavant'],
    stats:{hp:80,maxHp:80,mp:78,maxMp:78,atk:14,def:6,spd:16,crit:18},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:9,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_electric_volt_step','shadow_electric_thundercloak','shadow_electric_overload','shadow_electric_lightning_execution'],
    burstAbility:'techsavant_burst',
    passives:['shadow_step','overclock'],
    description:'Hacks the dungeon itself — disables traps, jams enemy senses, and strikes with precision calculated to millisecond timing. The enemy does not see the attack coming. Their system does not either.',
    lore:'Protocol breach registered. Source: null. Method: null. Duration: null. Damage: catastrophic.'
  },

  grave_phantom: {
    id:'grave_phantom', name:'Grave Phantom', icon:'🪦',
    tagline:'It walks between graves. Both kinds.',
    color:'#446655', element:'wraith', rarity:'uncommon',
    fusedFrom:['shadowblade','gravewarden'],
    stats:{hp:98,maxHp:98,mp:63,maxMp:63,atk:14,def:9,spd:13,crit:16},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:8,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_grass_blight_mark','shadow_grass_spore_veil','shadow_normal_gut','shadow_normal_assassination'],
    burstAbility:'gravewarden_burst',
    passives:['shadow_step','undying'],
    description:'Haunts the battlefield like an inevitability. Cannot be killed cleanly — rises from near-death to finish what it started. The grave is not its resting place. It is its weapon.',
    lore:'Every grave is a door. Every door goes both directions. The Grave Phantom simply learned how to use the handle.'
  },

  iron_ghost: {
    id:'iron_ghost', name:'Iron Ghost', icon:'🧲',
    tagline:'The blades gather themselves. Then vanish.',
    color:'#556677', element:'ironshadow', rarity:'rare',
    fusedFrom:['shadowblade','magnetist'],
    stats:{hp:83,maxHp:83,mp:73,maxMp:73,atk:14,def:7,spd:14,crit:18},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:8,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','normal_gravity_pull','normal_gravity_crush','shadow_normal_expose','shadow_normal_assassination'],
    burstAbility:'magnetist_burst',
    passives:['shadow_step','magnetic_field'],
    description:'Tears metal from enemy armor with magnetic force, then uses those stolen shards as invisible projectiles from the dark. An assassin with a thousand blades it never has to carry.',
    lore:'It does not bring weapons. Enemies bring them. The Iron Ghost simply borrows what it needs and returns it — point first.'
  },

  prism_shade: {
    id:'prism_shade', name:'Prism Shade', icon:'💎',
    tagline:'Refracted shadow hits from every angle.',
    color:'#7766aa', element:'prismshade', rarity:'epic',
    fusedFrom:['shadowblade','crystalmancer'],
    stats:{hp:75,maxHp:75,mp:80,maxMp:80,atk:15,def:6,spd:16,crit:21},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:9,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_predator','shadow_normal_feint','shadow_normal_exploitation','shadow_normal_assassination'],
    burstAbility:'crystalmancer_burst',
    passives:['shadow_step','crystal_body'],
    description:'Shatters its own form into crystal shards before striking. Every shard strikes from a different direction. There is no defensive angle that covers all of them.',
    lore:'The crystal does not reflect light. It refracts shadow. Nine copies of the same killing blow arrive from nine directions simultaneously.'
  },

  war_phantom: {
    id:'war_phantom', name:'War Phantom', icon:'⚔️',
    tagline:'The warlord who is never seen coming.',
    color:'#774422', element:'warshadow', rarity:'uncommon',
    fusedFrom:['shadowblade','warlord'],
    stats:{hp:100,maxHp:100,mp:58,maxMp:58,atk:16,def:9,spd:14,crit:17},
    statDisplay:{HP:7,ATK:11,DEF:6,SPD:8,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_exploit','shadow_normal_gut','shadow_normal_expose','shadow_normal_assassination'],
    burstAbility:'warlord_burst',
    passives:['shadow_step','battle_hardened'],
    description:'Commands the field from darkness. Marks high-priority targets, coordinates shadow strikes that arrive from every position simultaneously, and never reveals the true line of attack.',
    lore:'Warlords stand on the hill to be seen. This one stands in the shadow of the hill. Its army never knew where the command came from. Neither did the enemy.'
  },

  spirit_stalker: {
    id:'spirit_stalker', name:'Spirit Stalker', icon:'🌿',
    tagline:'The spirit hunts. The shadow carries the blade.',
    color:'#447755', element:'spiritshadow', rarity:'rare',
    fusedFrom:['shadowblade','spiritwalker'],
    stats:{hp:85,maxHp:85,mp:73,maxMp:73,atk:13,def:7,spd:15,crit:18},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','water_ghost_wraith','water_ghost_haunt','shadow_normal_predator','shadow_normal_assassination'],
    burstAbility:'spiritwalker_burst',
    passives:['shadow_step','spirit_bond'],
    description:'Stalks targets through the spirit plane before manifesting for the kill. The target sees the shadow — just before the spirit manifests inside them.',
    lore:'The spiritwalker can commune with the dead. The shadowblade preferred the living. Together they found a target that was neither — the one standing between.'
  },

  cursed_phantom: {
    id:'cursed_phantom', name:'Cursed Phantom', icon:'🔮',
    tagline:'The curse arrives before the assassin does.',
    color:'#774488', element:'abyssblade', rarity:'rare',
    fusedFrom:['shadowblade','hexblade'],
    stats:{hp:80,maxHp:80,mp:75,maxMp:75,atk:14,def:6,spd:15,crit:19},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:9,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_expose','shadow_normal_feint','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'hexblade_burst',
    passives:['shadow_step','hex_master'],
    description:'Hexes targets while invisible — applying weakness, misfortune, and doom long before the physical strike lands. By the time the blade arrives, the enemy is already broken.',
    lore:'The hex lands while the enemy is searching. By the time they realize they have been cursed, the phantom is already behind them, waiting to see what happens next.'
  },

  starstalker: {
    id:'starstalker', name:'Starstalker', icon:'🌌',
    tagline:'It hunts between stars. Between moments.',
    color:'#334477', element:'starshadow', rarity:'epic',
    fusedFrom:['shadowblade','cosmomancer'],
    stats:{hp:75,maxHp:75,mp:88,maxMp:88,atk:13,def:5,spd:15,crit:19},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:9,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_vanishing_act','normal_cosmic_null','shadow_normal_predator','shadow_normal_assassination'],
    burstAbility:'cosmomancer_burst',
    passives:['shadow_step','stardust'],
    description:'Travels between constellations between strikes. Appears at impossible distances in impossible time. The cosmos is its hunting ground; the stars are its cover.',
    lore:'It does not use the dark between stars to hide. It uses the light between shadows to aim.'
  },

  plague_phantom: {
    id:'plague_phantom', name:'Plague Phantom', icon:'☣️',
    tagline:'The plague does not announce its arrival.',
    color:'#556633', element:'plagueshadow', rarity:'epic',
    fusedFrom:['shadowblade','pestilencelord'],
    stats:{hp:80,maxHp:80,mp:80,maxMp:80,atk:14,def:6,spd:14,crit:18},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:8,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_grass_spore_veil','shadow_grass_blight_mark','shadow_grass_overgrowth','shadow_grass_death_blossom'],
    burstAbility:'pestilence_burst',
    passives:['shadow_step','plague_lord'],
    description:'A walking pandemic in shadow form. Drifts invisibly through enemy ranks, leaving pestilence on every surface, every breath, every shadow it touches.',
    lore:'The pestilencelord spreads disease. The shadowblade spreads silence. Neither could have predicted that together they would spread something neither had a word for.'
  },

  storm_shade: {
    id:'storm_shade', name:'Storm Shade', icon:'💨',
    tagline:'Faster than the wind. Quieter than the shadow.',
    color:'#557766', element:'windshade', rarity:'uncommon',
    fusedFrom:['shadowblade','windwalker'],
    stats:{hp:80,maxHp:80,mp:65,maxMp:65,atk:14,def:6,spd:19,crit:20},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:11,MP:6},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_vanishing_act','shadow_normal_feint','shadow_normal_expose','shadow_normal_assassination'],
    burstAbility:'windwalker_burst',
    passives:['shadow_step','gust'],
    description:'A blur that exists between gusts. Strikes with wind-speed, hides in the sound of the storm, and is three positions ahead of wherever the enemy is looking.',
    lore:'The wind does not leave footprints either. They understood each other immediately.'
  },

  doom_shade: {
    id:'doom_shade', name:'Doom Shade', icon:'💣',
    tagline:'The doom arrives on silent feet.',
    color:'#554433', element:'abyssblade', rarity:'epic',
    fusedFrom:['shadowblade','doomcaster'],
    stats:{hp:75,maxHp:75,mp:85,maxMp:85,atk:13,def:5,spd:15,crit:19},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:9,MP:8},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_vanishing_act','shadow_normal_gut','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'doomcaster_burst',
    passives:['shadow_step','doom_aura'],
    description:'Marks targets with inevitable doom from the dark. Every vanish tightens the noose. The doom is not the kill — the kill is just the confirmation.',
    lore:'Doomcasters curse enemies from a distance. This one does it from a distance of zero — close enough to whisper the curse before the blade follows.'
  },

  arcane_phantom: {
    id:'arcane_phantom', name:'Arcane Phantom', icon:'📚',
    tagline:'The spells are invisible. The death is not.',
    color:'#5544aa', element:'spellshadow', rarity:'epic',
    fusedFrom:['shadowblade','arcanist'],
    stats:{hp:73,maxHp:73,mp:90,maxMp:90,atk:13,def:5,spd:15,crit:20},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:9,MP:9},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','shadow_normal_feint','shadow_normal_expose','shadow_normal_exploit','shadow_normal_assassination'],
    burstAbility:'arcanist_burst',
    passives:['shadow_step','arcane_mastery'],
    description:'Weaves spells invisibly around targets before striking. The arcane damage has already been applied before the blade lands — the target dies twice before they hit the ground.',
    lore:'The arcanist reads the enemy. The shadowblade ends the reading. By the time the phantom is done, neither description applies anymore.'
  },

  shadow_warden: {
    id:'shadow_warden', name:'Shadow Warden', icon:'🏰',
    tagline:'Even fortresses cast shadows.',
    color:'#556688', element:'voidsteel', rarity:'uncommon',
    fusedFrom:['shadowblade','sentinel'],
    stats:{hp:120,maxHp:120,mp:50,maxMp:50,atk:12,def:12,spd:12,crit:13},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:7},
    abilities:['shadow_strike','vanish','iron_fortress','death_mark','shadow_normal_expose','shadow_normal_feint','shadow_normal_gut','steel_resolve'],
    burstAbility:'shadow_burst',
    passives:['shadow_step','bastion'],
    description:'An immovable fortress that can also vanish. Holds the line in shadow, forcing enemies to attack positions that no longer exist, then punishes the overreach.',
    lore:'The sentinel said: nothing passes. The shadowblade said: nothing sees me pass. The warden that emerged said nothing at all.'
  },

  abyssal_specter: {
    id:'abyssal_specter', name:'Abyssal Specter', icon:'👻',
    tagline:'Not a shadow. Not a ghost. Neither. Both.',
    color:'#7755bb', element:'wraith', rarity:'legendary',
    fusedFrom:['shadowblade','phantom'],
    stats:{hp:75,maxHp:75,mp:70,maxMp:70,atk:15,def:5,spd:18,crit:25},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:10,MP:7},
    abilities:['shadow_strike','vanish','soul_drain','death_mark','water_ghost_wraith','shadow_water_riptide','shadow_normal_assassination','astral_veil'],
    burstAbility:'phantom_burst',
    passives:['shadow_step','phase'],
    description:'A being from beyond both shadows and death. Passes through walls. Cannot be targeted until it strikes. When it does strike, it attacks through armor, through bone, through will.',
    lore:'Two disciplines of disappearance merged and discovered a third thing entirely: something that does not merely vanish from sight, but from the concept of presence itself.'
  },

  soul_sentinel: {
    id:'soul_sentinel', name:'Soul Sentinel', icon:'🛡️',
    tagline:'The steel remembers every blow. The soul drinks them.',
    color:'#4a8899', element:'soulsteel', rarity:'rare',
    fusedFrom:['ironclad','soulweaver'],
    stats:{hp:105,maxHp:105,mp:70,maxMp:70,atk:9,def:11,spd:9,crit:8},
    statDisplay:{HP:7,ATK:6,DEF:8,SPD:5,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','soul_drain','necrotic_bolt','water_ghost_haunt','astral_veil'],
    burstAbility:'soulweaver_burst',
    passives:['iron_skin','soul_harvest'],
    description:'A wall of iron that feeds on the life force of every attacker. Takes damage, converts it to soul energy, then releases it as necrotic devastation.',
    lore:'Every time a weapon struck the iron, a little more life left the wielder. They thought they were fighting a shield. They were feeding a hunger.'
  },

  magmaclad: {
    id:'magmaclad', name:'Magmaclad', icon:'🌋',
    tagline:'The shield burns. Everything that touches it learns.',
    color:'#cc5500', element:'molten', rarity:'uncommon',
    fusedFrom:['ironclad','pyromancer'],
    stats:{hp:108,maxHp:108,mp:65,maxMp:65,atk:9,def:10,spd:10,crit:9},
    statDisplay:{HP:7,ATK:6,DEF:7,SPD:6,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_steel_forge','fire_steel_temper','fire_ground_eruption','fire_ground_magma_armor'],
    burstAbility:'ironclad_burst',
    passives:['iron_skin','combustion'],
    description:'Armored in living magma. Every defensive stance heats the armor further; every attack against the Magmaclad risks burning the attacker. An offense that punishes aggression.',
    lore:'The fire did not ruin the iron. The iron did not smother the fire. They found a temperature where both became something stronger than either.'
  },

  stormwall: {
    id:'stormwall', name:'Stormwall', icon:'⛈️',
    tagline:'Lightning does not care about armor. Until it is the armor.',
    color:'#4466bb', element:'stormsteel', rarity:'uncommon',
    fusedFrom:['ironclad','stormcaller'],
    stats:{hp:113,maxHp:113,mp:60,maxMp:60,atk:11,def:11,spd:12,crit:11},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_electric_voltage','fire_electric_chain','normal_storm_conduct','fire_electric_overload'],
    burstAbility:'storm_burst',
    passives:['iron_skin','static_charge'],
    description:'A fortress crackling with stored storm energy. Absorbs lightning attacks and redirects them as retaliation. The more it is struck, the more dangerous it becomes.',
    lore:'Generals feared the storm. The Stormwall made the storm into a wall. Now the generals fear the wall.'
  },

  iron_tyrant: {
    id:'iron_tyrant', name:'Iron Tyrant', icon:'⚔️',
    tagline:'The armor bleeds. So does everything else.',
    color:'#882211', element:'bloodsteel', rarity:'uncommon',
    fusedFrom:['ironclad','bloodknight'],
    stats:{hp:130,maxHp:130,mp:45,maxMp:45,atk:12,def:13,spd:9,crit:7},
    statDisplay:{HP:9,ATK:8,DEF:9,SPD:5},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_blood_cauterize','fire_blood_hemorrhage','fire_blood_bloodboil','fire_blood_vitaldrain'],
    burstAbility:'bloodknight_burst',
    passives:['iron_skin','vital_hunger'],
    description:'Iron-plated and blood-fueled. Bleeds enemies with every shield slam, converts incoming damage into bloodlust, and grows stronger with every wound — theirs or its own.',
    lore:'It did not choose to rule. It simply refused to fall. Eventually, everything else did. Rule was what remained.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_1);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_1);
  FUSION_LOADED_FILES.add(1);
  if(typeof console!=='undefined') console.debug('[Fusion] File 1 loaded (38 classes)');
})();
