// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 11 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_11 = {
  'gravitist+magnetist': 'gravitist_magnetist',
  'crystalmancer+gravitist': 'gravitist_crystal',
  'gravitist+warlord': 'gravitist_war',
  'gravitist+spiritwalker': 'gravitist_spirit',
  'gravitist+hexblade': 'gravitist_hex',
  'cosmomancer+gravitist': 'gravitist_cosmo',
  'gravitist+pestilencelord': 'gravitist_pestilence',
  'gravitist+windwalker': 'gravitist_wind',
  'doomcaster+gravitist': 'gravitist_doom',
  'arcanist+gravitist': 'gravitist_arcanist',
  'gravitist+sentinel': 'gravitist_sentinel',
  'gravitist+phantom': 'gravitist_phantom',
  'chronomancer+soundbreaker': 'soundbreaker_chrono',
  'soundbreaker+spellsword': 'soundbreaker_spellsword',
  'plaguedoctor+soundbreaker': 'soundbreaker_plague',
  'geomancer+soundbreaker': 'soundbreaker_geo',
  'lightbringer+soundbreaker': 'soundbreaker_lightbringer',
  'beastmaster+soundbreaker': 'soundbreaker_beast',
  'soundbreaker+techsavant': 'soundbreaker_tech',
  'gravewarden+soundbreaker': 'soundbreaker_grave',
  'magnetist+soundbreaker': 'soundbreaker_magnetist',
  'crystalmancer+soundbreaker': 'soundbreaker_crystal',
  'soundbreaker+warlord': 'soundbreaker_war',
  'soundbreaker+spiritwalker': 'soundbreaker_spirit',
  'hexblade+soundbreaker': 'soundbreaker_hex',
  'cosmomancer+soundbreaker': 'soundbreaker_cosmo',
  'pestilencelord+soundbreaker': 'soundbreaker_pestilence',
  'soundbreaker+windwalker': 'soundbreaker_wind',
  'doomcaster+soundbreaker': 'soundbreaker_doom',
  'arcanist+soundbreaker': 'soundbreaker_arcanist',
  'sentinel+soundbreaker': 'soundbreaker_sentinel',
  'phantom+soundbreaker': 'soundbreaker_phantom',
  'chronomancer+spellsword': 'chrono_spellsword',
  'chronomancer+plaguedoctor': 'chrono_plague',
  'chronomancer+geomancer': 'chrono_geo',
  'chronomancer+lightbringer': 'chrono_lightbringer',
  'beastmaster+chronomancer': 'chrono_beast'
};

const FUSION_CLASSES_11 = {
  gravitist_magnetist: {
    id:'gravitist_magnetist', name:'The Iron Horizon', icon:'⚫',
    tagline:'Gravity pulls down. Magnetism pulls sideways. Between them, nothing stays where it was.',
    color:'#4d7788', element:'magnet', elementFlavor:'magnetgrav', rarity:'epic',
    fusedFrom:['gravitist','magnetist'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:12,def:8,spd:12,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','gravity_magnet_stance','gravity_magnet_blast','gravity_magnet_dot_strike','fire_magnet_pull'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','magnetic_field'],
    description:'Combined gravitational and magnetic fields — metal objects caught between them have no stable resting position. The Iron Horizon pulls weapons from enemy hands while simultaneously pressing the enemies who hold them toward the floor.',
    lore:'Gravity and magnetism are both field forces. The gravitist and magnetist found their fields interact constructively and that the interference pattern between two aligned field forces produces effects neither field produces alone. Metal objects in the interference zone experience something that does not have a conventional name.'
  },

  gravitist_crystal: {
    id:'gravitist_crystal', name:'The Collapsed Lattice', icon:'⚫',
    tagline:'Crystal under sufficient gravitational pressure does not shatter. It becomes something denser.',
    color:'#6688b3', element:'gravity', elementFlavor:'crystalgrav', rarity:'legendary',
    fusedFrom:['gravitist','crystalmancer'],
    stats:{hp:73,maxHp:73,mp:98,maxMp:98,atk:12,def:6,spd:13,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_crystal_refract','fire_crystal_shard','gravity_blood_blast','gravity_void_final'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','crystal_body'],
    description:'Crystal collapsed by gravitational force into hyper-dense configurations — lattice structures that refract gravitational energy the way normal crystals refract light. The Collapsed Lattice detonates as a gravitic shockwave when shattered.',
    lore:'Crystals form under pressure. The gravitist provided extreme pressure. The Collapsed Lattice found that crystal grown under gravitational compression stores that potential energy in the lattice structure, and releasing it produces a gravitational detonation that the crystalmancer\'s standard shattering technique does not achieve.'
  },

  gravitist_war: {
    id:'gravitist_war', name:'The Weight of War', icon:'⚫',
    tagline:'The heaviest blow wins. This one has gravitational amplification.',
    color:'#884d33', element:'gravity', elementFlavor:'warcrush', rarity:'epic',
    fusedFrom:['gravitist','warlord'],
    stats:{hp:98,maxHp:98,mp:75,maxMp:75,atk:13,def:9,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:7},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_fighting_rage','normal_blood_mark','gravity_blood_surge','normal_gravity_anchor'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','battle_hardened'],
    description:'Gravitational warlord tactics — formations where gravity wells dictate movement, every charge is gravitationally accelerated, and the warlord\'s tactical precision is applied to a battlefield where falling toward the enemy is always an option.',
    lore:'The warlord calculated optimal force application. The gravitist provided amplification. The Weight of War found that tactical precision combined with gravitational force multipliers produces impact values that standard warlord arithmetic did not account for, requiring a revised table of expected outcomes.'
  },

  gravitist_spirit: {
    id:'gravitist_spirit', name:'The Gravity Well Soul', icon:'⚫',
    tagline:'The soul has weight. This one has considerably more than most.',
    color:'#448077', element:'gravity', elementFlavor:'spiritgrav', rarity:'legendary',
    fusedFrom:['gravitist','spiritwalker'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:10,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','gravity_blood_drain','gravity_blood_stance','water_ghost_haunt','electric_spirit_surge'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','spirit_bond'],
    description:'Spirits with gravitational mass — spirit attacks that carry the crushing weight of a gravity well, spiritual entities that orbit the Gravity Well Soul like celestial bodies, and a spiritual gravity that draws the souls of the dying toward the center.',
    lore:'Spirits normally move freely. The gravitist found they have mass in the spiritual domain. The Gravity Well Soul combined these and found that a spirit with gravitational authority pulls other spirits toward it, which is either a natural philosophical observation about charisma or a combat technique — both appear to be true.'
  },

  gravitist_hex: {
    id:'gravitist_hex', name:'The Crushing Curse', icon:'⚫',
    tagline:'The hex adds weight. The weight adds to the hex. The target goes down.',
    color:'#663c77', element:'gravity', elementFlavor:'voidblood', rarity:'legendary',
    fusedFrom:['gravitist','hexblade'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','gravity_blood_weaken','gravity_blood_blast','normal_void_curse','psychic_void_weaken'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','hex_master'],
    description:'Hexes that increase gravitational mass on the target — cursed enemies are progressively heavier, slower, and harder to move. The Crushing Curse exploits the gravitational excess to amplify damage from all subsequent attacks on the hexed target.',
    lore:'Hexes weaken. Gravity presses. The Crushing Curse found these are the same operation at different scales and that combining them produces a progressive debilitation where each turn the target is more affected than the last, with no natural ceiling on the accumulation.'
  },

  gravitist_cosmo: {
    id:'gravitist_cosmo', name:'The Event Horizon', icon:'⚫',
    tagline:'Nothing that crosses it returns. This is its defining property.',
    color:'#444488', element:'gravity', elementFlavor:'cosmicgrav', rarity:'mythical',
    fusedFrom:['gravitist','cosmomancer'],
    stats:{hp:73,maxHp:73,mp:105,maxMp:105,atk:10,def:6,spd:12,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','gravity_void_blast','gravity_void_surge','dark_cosmic_blast','normal_space_consume'],
    burstAbility:'cosmomancer_burst',
    passives:['gravity_well','stardust'],
    description:'A gravitational singularity of cosmological mass — the Event Horizon creates a point from which nothing escapes. Every enemy drawn past the threshold of its gravity well is simply not available for further decisions. The cosmomancer provided the scale; the gravitist provided the anchor.',
    lore:'The cosmomancer studied black holes as an academic subject. The gravitist asked: could we make one? The Event Horizon is the proof of concept: not a true stellar mass singularity but something that operates on the same principle at a range where it is useful in a dungeon context.'
  },

  gravitist_pestilence: {
    id:'gravitist_pestilence', name:'The Dense Contagion', icon:'⚫',
    tagline:'Gravitational compression concentrates disease. Dense disease spreads faster.',
    color:'#4d6f33', element:'gravity', elementFlavor:'graveplague', rarity:'legendary',
    fusedFrom:['gravitist','pestilencelord'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:11,def:7,spd:11,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_poison_plague','poison_cosmic_weaken','gravity_void_strike','poison_wind_surge'],
    burstAbility:'pestilence_lord_burst',
    passives:['gravity_well','plague_lord'],
    description:'Gravitationally compressed plague — disease concentrated to maximum potency by the same forces that collapse stars. The Dense Contagion delivers plague at densities that standard infection rates cannot match and spreads through gravitationally attracted particles.',
    lore:'Compression increases density. Density increases infection efficiency. The Dense Contagion applies gravitational force to biological agents and finds that the compressed version reaches potency thresholds that normal atmospheric delivery does not approach. The plague enters at full concentration without incubation.'
  },

  gravitist_wind: {
    id:'gravitist_wind', name:'The Vortex Collapse', icon:'⚫',
    tagline:'Wind orbits gravity. At sufficient speed, the orbit becomes an infall.',
    color:'#669188', element:'gravity', elementFlavor:'windgrav', rarity:'epic',
    fusedFrom:['gravitist','windwalker'],
    stats:{hp:78,maxHp:78,mp:83,maxMp:83,atk:12,def:6,spd:16,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:8},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_wind_cyclone','fire_flying_updraft','gravity_void_dot_strike','normal_gravity_pull'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','gust'],
    description:'Wind that spirals into a gravitational collapse — cyclones drawn inward by the gravity well, compressing the air column until the wind itself becomes a gravitational attack. The Vortex Collapse moves at 16 SPD and creates an inescapable spiral on arrival.',
    lore:'Tornadoes already spiral around a low-pressure center. The gravitist replaced the low-pressure center with a high-gravity center. The Vortex Collapse found this substitution produces a spiral with considerably higher inward force than atmospheric pressure differential alone provides.'
  },

  gravitist_doom: {
    id:'gravitist_doom', name:'The Gravitational Doom', icon:'⚫',
    tagline:'Doom falls. Gravity ensures everything falls toward doom.',
    color:'#55444d', element:'gravity', elementFlavor:'voidblood', rarity:'mythical',
    fusedFrom:['gravitist','doomcaster'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:10,def:5,spd:12,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','gravity_void_final','time_void_surge','dark_cosmic_blast','normal_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['gravity_well','doom_aura'],
    description:'Doom anchored in a gravity well — the death sentence suspended at the gravitational center, drawing all targets toward their destined end. The Gravitational Doom does not pursue. It waits at the bottom, and everything falls toward it eventually.',
    lore:'Doom falls upon its target. Gravity makes things fall. The Gravitational Doom anchored doom at the gravitational singularity and found that this converts a doom that pursues into a doom that waits, which is considered by the doomcaster to be a philosophical improvement and a practical one.'
  },

  gravitist_arcanist: {
    id:'gravitist_arcanist', name:'The Grand Unified Theory', icon:'⚫',
    tagline:'The formula that unifies all forces is the most powerful formula. This is an early draft.',
    color:'#4d4499', element:'gravity', elementFlavor:'mindcrush', rarity:'legendary',
    fusedFrom:['gravitist','arcanist'],
    stats:{hp:70,maxHp:70,mp:108,maxMp:108,atk:10,def:5,spd:13,crit:16},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','psychic_cosmic_blast','psychic_void_blast','gravity_void_surge','electric_psychic_vortex'],
    burstAbility:'void_burst',
    passives:['gravity_well','arcane_mastery'],
    description:'Applies arcane mathematics to gravitational theory — formulae that describe and therefore control gravitational force, theoretical constructs that function as gravity modifiers, and the unified field equations that make gravity and the arcane tradition compatible.',
    lore:'The arcanist derived formulae for every magical force. Gravity was the last one. The Grand Unified Theory is the working draft of the equation that combines them all and has found that the unified version has emergent properties neither tradition anticipated, several of which are immediately applicable to combat.'
  },

  gravitist_sentinel: {
    id:'gravitist_sentinel', name:'The Gravity Bastion', icon:'⚫',
    tagline:'The heaviest position is the most defensible position. Mass is defense.',
    color:'#666f77', element:'gravity', elementFlavor:'gravisteel', rarity:'rare',
    fusedFrom:['gravitist','sentinel'],
    stats:{hp:118,maxHp:118,mp:68,maxMp:68,atk:9,def:13,spd:9,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:6},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_steel_quench','fire_ground_ward','normal_gravity_anchor','gravity_magnet_stance'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','bastion'],
    description:'A fortified position anchored by gravitational mass — the Gravity Bastion cannot be displaced because it is gravitationally heavier than the force applied to move it. Attacks on the position are redirected into the gravity well. Breaching it requires overcoming the mass of a small geological feature.',
    lore:'The sentinel held position through will. The gravitist held position through mass. The Gravity Bastion holds position through both: the sentinel\'s trained immovability combined with gravitational anchoring that makes the position physically heavier than any displacement force the enemy can generate.'
  },

  gravitist_phantom: {
    id:'gravitist_phantom', name:'The Singularity Ghost', icon:'⚫',
    tagline:'A ghost with gravitational mass is functionally a black hole with opinions.',
    color:'#667791', element:'gravity', elementFlavor:'gravesoul', rarity:'mythical',
    fusedFrom:['gravitist','phantom'],
    stats:{hp:73,maxHp:73,mp:88,maxMp:88,atk:12,def:5,spd:15,crit:21},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:8},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','water_ghost_phase','gravity_void_blast','gravity_blood_drain','ice_ghost_ethereal'],
    burstAbility:'shadow_burst',
    passives:['gravity_well','phase'],
    description:'A spectral entity with gravitational authority — phases through matter while applying gravitational crush to everything it passes through, creates a gravitational anomaly wherever it exists, and cannot be struck because it is simultaneously a ghost and the densest point in the room.',
    lore:'Phantoms are immaterial. Gravity affects all matter. The Singularity Ghost resolved this apparent contradiction by being both: immaterial to conventional attacks but gravitationally massive in a way that does not require matter to operate. The physics involved are not currently explainable.'
  },

  soundbreaker_chrono: {
    id:'soundbreaker_chrono', name:'The Temporal Resonance', icon:'🔊',
    tagline:'Sound travels through time. The frequency determines the direction.',
    color:'#c499aa', element:'sound', elementFlavor:'resonanttime', rarity:'epic',
    fusedFrom:['soundbreaker','chronomancer'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:12,def:6,spd:15,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_time_blast','sound_time_drain','sound_time_final','dark_time_surge'],
    burstAbility:'chronomancer_burst',
    passives:['resonance','time_warp'],
    description:'Sonic waves propagated through the timeline — shockwaves that arrive before they are cast, resonance fields that vibrate enemies across multiple time-frames simultaneously, and the temporal instability of a frequency that the timeline is not designed to carry.',
    lore:'Sound frequency determines pitch. Temporal frequency determines timeline placement. The Temporal Resonance found these were analogous operations and that a sufficiently precise sonic frequency can identify the timeline\'s resonant frequency, which the timeline experiences as structural stress.'
  },

  soundbreaker_spellsword: {
    id:'soundbreaker_spellsword', name:'The Psychic Frequency', icon:'🔊',
    tagline:'The mind resonates at a specific frequency. This one found it.',
    color:'#c47780', element:'sound', elementFlavor:'sonicmind', rarity:'epic',
    fusedFrom:['soundbreaker','spellsword'],
    stats:{hp:85,maxHp:85,mp:83,maxMp:83,atk:13,def:7,spd:14,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:8,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_light_blast','sound_light_strike','electric_psychic_vortex','psychic_wind_blast'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','spellblade'],
    description:'Psionic sonics — sound waves calibrated to the resonant frequency of cognition, producing a mental shockwave that disrupts concentration and arcane casting mid-execution. The Psychic Frequency makes silence the enemy\'s best option, then makes silence impossible.',
    lore:'Every structure has a resonant frequency. The spellsword found the mind\'s. The soundbreaker delivered the frequency as a weapon. The Psychic Frequency found that cognitive disruption via resonance is more effective than direct psionic assault because the target cannot shield against a sound they can already hear inside their own skull.'
  },

  soundbreaker_plague: {
    id:'soundbreaker_plague', name:'The Carrier Wave', icon:'🔊',
    tagline:'Sound carries the disease. The disease vibrates. The vibration spreads.',
    color:'#b3aa44', element:'sound', elementFlavor:'toxicsound', rarity:'epic',
    fusedFrom:['soundbreaker','plaguedoctor'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:12,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','poison_wind_strike','poison_wind_blast','sound_void_weaken','fire_poison_plague'],
    burstAbility:'plague_doctor_burst',
    passives:['resonance','immunity'],
    description:'Disease transmitted via sonic resonance — pathogens that respond to specific frequencies, spreading through shared vibrations rather than physical contact. The Carrier Wave transmits plague at the speed of sound across the entire resonance field.',
    lore:'Some organisms respond to vibration. The plaguedoctor found organisms that activate at a specific frequency. The soundbreaker delivered that frequency. The Carrier Wave found that a disease triggered by sound spreads the moment the sound propagates, which is considerably faster than physical transmission.'
  },

  soundbreaker_geo: {
    id:'soundbreaker_geo', name:'The Seismic Voice', icon:'🔊',
    tagline:'The voice that moves mountains is not metaphorical. It is a precise seismic frequency.',
    color:'#c49955', element:'sound', elementFlavor:'seismicwave', rarity:'rare',
    fusedFrom:['soundbreaker','geomancer'],
    stats:{hp:90,maxHp:90,mp:78,maxMp:78,atk:13,def:9,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','ice_sound_shatter','ice_rock_frostquake','ice_rock_shatter','fire_ground_quake'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','earth_body'],
    description:'Geological sound weaponized — seismic frequencies that crack stone floors, resonant attacks calibrated to the mineral composition of dungeon walls, and voice-triggered avalanches that are less metaphorical than the expression usually implies.',
    lore:'The geomancer moved stone through force. The soundbreaker moved things through resonance. The Seismic Voice found that stone has a resonant frequency and that delivering it creates seismic events that the geomancer\'s direct approach cannot match in terms of area coverage and structural consequence.'
  },

  soundbreaker_lightbringer: {
    id:'soundbreaker_lightbringer', name:'The Shining Chord', icon:'🔊',
    tagline:'Sound and light travel at different speeds. They arrive together anyway.',
    color:'#eec44d', element:'sound', elementFlavor:'radiantsound', rarity:'epic',
    fusedFrom:['soundbreaker','lightbringer'],
    stats:{hp:83,maxHp:83,mp:85,maxMp:85,atk:13,def:8,spd:15,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_light_weaken','sound_light_final','normal_light_blind','normal_light_dawn'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','radiant'],
    description:'Combines light and sound into a unified radiant-sonic attack — the Shining Chord delivers blinding flash and deafening shockwave simultaneously, overwhelming all sensory defenses at once. There is no direction to look that avoids it.',
    lore:'The lightbringer used light. The soundbreaker used sound. The Shining Chord found these were parallel delivery systems that arrive at the target through different channels and overwhelm different defenses. Combining them overwhelms both categories simultaneously, which opponents find comprehensive.'
  },

  soundbreaker_beast: {
    id:'soundbreaker_beast', name:'The Pack Howl', icon:'🔊',
    tagline:'Pack coordination through frequency. The frequency is uncomfortable for non-members.',
    color:'#b3b34d', element:'sound', elementFlavor:'runesound', rarity:'rare',
    fusedFrom:['soundbreaker','beastmaster'],
    stats:{hp:88,maxHp:88,mp:75,maxMp:75,atk:14,def:8,spd:15,crit:14},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:8,MP:7},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','normal_dragon_surge','normal_dragon_roar','psychic_wind_surge','ice_sound_dissonance'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','feral_bond'],
    description:'Coordinates a predator pack through resonant frequency — beasts that respond to sonic commands inaudible to enemies, pack formations that execute on frequency cues, and a howl that disrupts enemy coordination while organizing allied animals.',
    lore:'Pack animals coordinate through sound. The soundbreaker upgraded the frequency to a range that enemies cannot process while pack members can. The Pack Howl operates on a sonic channel that the pack uses and everyone else experiences as disorientation, which is a useful asymmetry.'
  },

  soundbreaker_tech: {
    id:'soundbreaker_tech', name:'The Acoustic Overload', icon:'🔊',
    tagline:'Every machine has a resonant frequency. This one found all of them.',
    color:'#919980', element:'sound', elementFlavor:'techsound', rarity:'epic',
    fusedFrom:['soundbreaker','techsavant'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:13,def:7,spd:15,crit:15},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:8,MP:9},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','fire_cyber_overclock','fire_cyber_system_melt','sound_crystal_surge','sound_void_strike'],
    burstAbility:'techsavant_burst',
    passives:['resonance','overclock'],
    description:'Destroys technical systems through acoustic resonance — every machine component has a frequency at which it fails, and the Acoustic Overload knows them all. Simultaneously, it overclocks its own technical systems using resonant energy harvesting.',
    lore:'The techsavant built machines. The soundbreaker destroyed them. The Acoustic Overload combined both practices: building systems optimized for resonant operation while cataloguing the resonant failure points of every opposing system, which is a comprehensive competitive advantage.'
  },

  soundbreaker_grave: {
    id:'soundbreaker_grave', name:'The Death Rattle', icon:'🔊',
    tagline:'The last sound a body makes is specific. This one reproduces it for effect.',
    color:'#99886f', element:'sound', elementFlavor:'wailsoul', rarity:'rare',
    fusedFrom:['soundbreaker','gravewarden'],
    stats:{hp:98,maxHp:98,mp:75,maxMp:75,atk:13,def:10,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:7,SPD:7,MP:7},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_void_weaken','water_ghost_haunt','sound_void_final','water_dark_drown'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','undying'],
    description:'Sound weaponized from the boundary of death — wails of the dying, the frequency of organs failing, the resonant echo of the grave itself delivered as an attack. The Death Rattle survives its own destruction by making its death sound the most dangerous one it produces.',
    lore:'The gravewarden knew the sounds of death. The soundbreaker knew how to weaponize sound. The Death Rattle catalogued every final sound and found the most effective ones are also the most disorienting to the living — biological responses to death-frequencies are deeply encoded and not easily overridden.'
  },

  soundbreaker_magnetist: {
    id:'soundbreaker_magnetist', name:'The Electromagnetic Pulse', icon:'🔊',
    tagline:'Sound waves and electromagnetic waves are both waves. The distinction blurs at high energy.',
    color:'#99a280', element:'sound', elementFlavor:'magnetsound', rarity:'epic',
    fusedFrom:['soundbreaker','magnetist'],
    stats:{hp:83,maxHp:83,mp:85,maxMp:85,atk:13,def:8,spd:14,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','fire_magnet_flux','electric_steel_magnetize','sound_crystal_strike','sound_void_drain'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','magnetic_field'],
    description:'Sound and magnetism combined into an electromagnetic shockwave — sonic pulses that carry magnetic charge, resonant fields that disrupt both acoustic and electromagnetic shielding, and an EMP shockwave that fuses both at the point of impact.',
    lore:'Sound and electromagnetic radiation are both wave phenomena. The soundbreaker and magnetist found the boundary between them is less fixed than classical physics suggests, and that operating at that boundary produces a combined wave that neither individual source generates — and that most defenses are not designed to address.'
  },

  soundbreaker_crystal: {
    id:'soundbreaker_crystal', name:'The Crystal Resonance', icon:'🔊',
    tagline:'Every crystal sings at a specific frequency. This is that frequency, amplified.',
    color:'#b3b3aa', element:'sound', elementFlavor:'crystalsound', rarity:'legendary',
    fusedFrom:['soundbreaker','crystalmancer'],
    stats:{hp:75,maxHp:75,mp:93,maxMp:93,atk:14,def:6,spd:15,crit:18},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:8,MP:9},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_crystal_drain','sound_crystal_blast','sound_crystal_weaken','fire_crystal_shard'],
    burstAbility:'crystalmancer_burst',
    passives:['resonance','crystal_body'],
    description:'Grows crystals tuned to amplify specific frequencies, then shatters them at maximum resonance for catastrophic sonic detonation. The Crystal Resonance is the loudest thing in any room it enters, and it enters rooms by making them.',
    lore:'The crystalmancer grew crystals. The soundbreaker grew sounds. The Crystal Resonance found that a crystal grown to a specific acoustic resonance and then vibrated at that frequency produces a detonation that is simultaneously a sonic event and a crystal event, maximizing both damage modes at once.'
  },

  soundbreaker_war: {
    id:'soundbreaker_war', name:'The War Cry', icon:'🔊',
    tagline:'The war cry that breaks morale is the war cry that also breaks walls.',
    color:'#d5772b', element:'sound', elementFlavor:'warcry', rarity:'rare',
    fusedFrom:['soundbreaker','warlord'],
    stats:{hp:100,maxHp:100,mp:70,maxMp:70,atk:15,def:9,spd:14,crit:13},
    statDisplay:{HP:6,ATK:11,DEF:6,SPD:8,MP:7},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','fire_fighting_rage','fire_fighting_ignite','sound_light_blast','ice_sound_shatter'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','battle_hardened'],
    description:'Tactical sonic warfare — war cries that coordinate allies through frequency while disorienting enemies, shockwaves directed as tactical instruments rather than area events, and the battle instincts of the warlord combined with the sonic range of the soundbreaker.',
    lore:'War cries have always been part of battle. The soundbreaker made them structural. The War Cry calibrated the traditional warlord battle shout to frequencies that do not simply intimidate the enemy but acoustically disrupt their tactical coordination while leaving allies unaffected by the same sound.'
  },

  soundbreaker_spirit: {
    id:'soundbreaker_spirit', name:'The Spirit Chord', icon:'🔊',
    tagline:'Spirits respond to specific frequencies. These are those frequencies.',
    color:'#91aa6f', element:'sound', elementFlavor:'spiritsound', rarity:'epic',
    fusedFrom:['soundbreaker','spiritwalker'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:12,def:8,spd:15,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','electric_spirit_surge','electric_spirit_possession','sound_cosmic_blast','water_ghost_haunt'],
    burstAbility:'spiritwalker_burst',
    passives:['resonance','spirit_bond'],
    description:'Frequencies that summon and direct spirits — sonic ranges that spirits find compelling, resonant chords that amplify spiritual energy, and the ability to communicate with spirits at the speed of sound. The Spirit Chord conducts both an orchestra and an army.',
    lore:'The spiritwalker communicated with spirits through intent and ritual. The soundbreaker communicated through frequency. The Spirit Chord found that spirits respond to sound at specific frequencies and that understanding those frequencies is a faster and more scalable form of spirit communication than traditional approaches.'
  },

  soundbreaker_hex: {
    id:'soundbreaker_hex', name:'The Cursed Frequency', icon:'🔊',
    tagline:'The curse that travels at the speed of sound arrives before the target can retreat.',
    color:'#b3666f', element:'sound', elementFlavor:'wailblood', rarity:'epic',
    fusedFrom:['soundbreaker','hexblade'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:13,def:7,spd:15,crit:15},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:8,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','psychic_blood_weaken','psychic_blood_stance','sound_void_dot_strike','normal_void_curse'],
    burstAbility:'hexblade_burst',
    passives:['resonance','hex_master'],
    description:'Hexes transmitted via sound — curses that travel at sonic speed and activate when the target\'s biological resonance matches the curse frequency. The Cursed Frequency cannot be outrun because it propagates in all directions simultaneously.',
    lore:'The hexblade placed hexes through contact. The soundbreaker removed the contact requirement. The Cursed Frequency transmits hexes as sound and found that a curse delivered acoustically can saturate the entire resonance field simultaneously, which the hexblade\'s targeted approach could not achieve.'
  },

  soundbreaker_cosmo: {
    id:'soundbreaker_cosmo', name:'The Cosmic Frequency', icon:'🔊',
    tagline:'The universe has a fundamental frequency. This one found it empirically.',
    color:'#916f80', element:'sound', elementFlavor:'cosmicsound', rarity:'legendary',
    fusedFrom:['soundbreaker','cosmomancer'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:12,def:6,spd:14,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_cosmic_drain','sound_cosmic_weaken','sound_cosmic_blast','dark_cosmic_blast'],
    burstAbility:'cosmomancer_burst',
    passives:['resonance','stardust'],
    description:'The cosmic background frequency — the vibration permeating all of spacetime, concentrated and directed as a weapon. The Cosmic Frequency attacks at a wavelength that all matter resonates with, making physical shielding irrelevant by definition.',
    lore:'The cosmic microwave background is the residual frequency of creation. The cosmomancer knew it existed; the soundbreaker learned to generate it locally. The Cosmic Frequency produces the one sound that the universe itself made and found it is, indeed, the most fundamental frequency for structural disruption purposes.'
  },

  soundbreaker_pestilence: {
    id:'soundbreaker_pestilence', name:'The Plague Broadcast', icon:'🔊',
    tagline:'The announcement and the disease arrive simultaneously.',
    color:'#99992b', element:'sound', elementFlavor:'toxicsound', rarity:'legendary',
    fusedFrom:['soundbreaker','pestilencelord'],
    stats:{hp:80,maxHp:80,mp:93,maxMp:93,atk:13,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:7,MP:9},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','fire_poison_plague','poison_wind_blast','sound_void_weaken','poison_cosmic_surge'],
    burstAbility:'pestilence_lord_burst',
    passives:['resonance','plague_lord'],
    description:'Disease delivered via sound waves — pathogens carried in the resonance field, activated by the frequency of the broadcast. The Plague Broadcast covers an area the same way a sound does: instantaneously in all directions from the source.',
    lore:'Radio waves carry information. Sound waves carry vibration. The Plague Broadcast found they can also carry biological material if the biological material is calibrated to propagate on the wave. The pestilencelord engineered organisms that travel on resonance. The soundbreaker provided the resonance.'
  },

  soundbreaker_wind: {
    id:'soundbreaker_wind', name:'The Banshee Gale', icon:'🔊',
    tagline:'The wind that screams is screaming for a reason. The reason is you.',
    color:'#b3bb80', element:'sound', elementFlavor:'windwave', rarity:'rare',
    fusedFrom:['soundbreaker','windwalker'],
    stats:{hp:80,maxHp:80,mp:78,maxMp:78,atk:13,def:6,spd:18,crit:17},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:9,MP:7},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','fire_wind_cyclone','psychic_wind_blast','psychic_wind_surge','fire_flying_dive'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','gust'],
    description:'A screaming gale that moves at 18 SPD — the fastest class in any fusion file. Wind amplified by sonic resonance to hurricane levels, attacks that arrive before any defensive response, and a wail that marks everything it passes through.',
    lore:'Wind already makes sound. The soundbreaker made the sound also make wind. The Banshee Gale operates at 18 SPD, which is faster than the advisory threshold for any wind-related tactical framework, and the sound it produces is technically a weapon at its operating volume.'
  },

  soundbreaker_doom: {
    id:'soundbreaker_doom', name:'The Last Sound', icon:'🔊',
    tagline:'Everything ends with a sound. This one makes it happen on schedule.',
    color:'#a26f44', element:'sound', elementFlavor:'wailblood', rarity:'legendary',
    fusedFrom:['soundbreaker','doomcaster'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:12,def:5,spd:14,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','sound_void_final','sound_void_drain','time_void_blast','normal_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['resonance','doom_aura'],
    description:'Doom delivered as a terminal frequency — the final sound, transmitted directly to the target\'s biological systems. The Last Sound is not a warning. By the time it is audible, it has already been delivered and the doom is already active.',
    lore:'The doomcaster said: you are doomed. The soundbreaker transmitted it faster than the spoken word. The Last Sound found that a doom delivered acoustically reaches the target before they can respond and registers in biological systems that predate the cognitive ones, making it significantly harder to process a counter-response.'
  },

  soundbreaker_arcanist: {
    id:'soundbreaker_arcanist', name:'The Harmonic Formula', icon:'🔊',
    tagline:'The formula expressed as sound is understood by the universe without translation.',
    color:'#996f91', element:'sound', elementFlavor:'sonicmind', rarity:'legendary',
    fusedFrom:['soundbreaker','arcanist'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:12,def:5,spd:15,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','psychic_cosmic_blast','psychic_void_surge','sound_crystal_drain','sound_cosmic_weaken'],
    burstAbility:'void_burst',
    passives:['resonance','arcane_mastery'],
    description:'Arcane formulae expressed as sound — spells that propagate at acoustic speed, mathematical constructs that resonate with reality at the frequency of their derivation. The Harmonic Formula finds the resonant frequency of every arcane structure and exploits it.',
    lore:'The arcanist wrote formulae. The soundbreaker found their resonant frequency. The Harmonic Formula discovered that every arcane construct has a frequency at which it amplifies, and that speaking a formula at its resonant frequency produces significantly more effect than writing it silently — a finding the arcanist tradition is still debating the implications of.'
  },

  soundbreaker_sentinel: {
    id:'soundbreaker_sentinel', name:'The Resonant Wall', icon:'🔊',
    tagline:'The wall holds and also vibrates. The vibration is not accidental.',
    color:'#b3996f', element:'sound', elementFlavor:'resonantsteel', rarity:'rare',
    fusedFrom:['soundbreaker','sentinel'],
    stats:{hp:120,maxHp:120,mp:63,maxMp:63,atk:11,def:13,spd:11,crit:10},
    statDisplay:{HP:8,ATK:8,DEF:9,SPD:6,MP:6},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','fire_steel_quench','normal_rune_ward','sound_void_weaken','ice_sound_harmonic_shield'],
    burstAbility:'soundbreaker_burst',
    passives:['resonance','bastion'],
    description:'A fortified position that uses resonance as a defensive weapon — the Resonant Wall vibrates at frequencies that disrupt attack patterns, reflects sonic damage back at attackers, and holds its position while generating shockwaves that make adjacent space untenable.',
    lore:'The sentinel held ground. The soundbreaker made the ground dangerous. The Resonant Wall keeps the sentinel\'s immovability and adds the soundbreaker\'s environmental control: a defended position that is also a sonic weapon, making both offense and defense operate from the same stance.'
  },

  soundbreaker_phantom: {
    id:'soundbreaker_phantom', name:'The Silent Scream', icon:'🔊',
    tagline:'The loudest sound and the deepest silence are neighbors.',
    color:'#b3a288', element:'sound', elementFlavor:'wailsoul', rarity:'mythical',
    fusedFrom:['soundbreaker','phantom'],
    stats:{hp:75,maxHp:75,mp:83,maxMp:83,atk:14,def:5,spd:17,crit:21},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:9,MP:8},
    abilities:['sonic_blast','resonance_field','shockwave','frequency_break','water_ghost_phase','ice_ghost_wraith','sound_void_strike','sound_void_dot_strike'],
    burstAbility:'shadow_burst',
    passives:['resonance','phase'],
    description:'A phantom that attacks through sound while remaining inaudible — the Silent Scream phases through physical space, attacks from within the enemy\'s own resonance field, and makes the devastating sound while producing no detectable presence at its source.',
    lore:'Phantoms are silent. Soundbreakers are not. The Silent Scream resolved this by separating the source from the sound: the phantom phases to the optimal position without sound and then delivers the sonic attack, making the most noise while producing the least traceable presence.'
  },

  chrono_spellsword: {
    id:'chrono_spellsword', name:'The Temporal Blade', icon:'⏳',
    tagline:'The strike has already landed. This is just the visual confirmation.',
    color:'#aa66d5', element:'time', elementFlavor:'timemind', rarity:'epic',
    fusedFrom:['chronomancer','spellsword'],
    stats:{hp:80,maxHp:80,mp:95,maxMp:95,atk:12,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','time_rune_blast','time_rune_surge','electric_psychic_pulse','psychic_dark_strike'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','spellblade'],
    description:'Psionically-guided temporal strikes — blades launched into the timeline and redirected to arrive at the enemy\'s position from whichever direction they are least prepared for. The Temporal Blade selects the optimal moment of impact from all available options.',
    lore:'The spellsword found the optimal angle of attack through calculation. The chronomancer found the optimal moment of attack through temporal navigation. The Temporal Blade does both, which produces attacks from angles and moments the enemy had classified as impossible, which they technically still are.'
  },

  chrono_plague: {
    id:'chrono_plague', name:'The Incubation', icon:'⏳',
    tagline:'The plague has been present since before the fight started. It activates now.',
    color:'#999999', element:'time', elementFlavor:'timeplague', rarity:'legendary',
    fusedFrom:['chronomancer','plaguedoctor'],
    stats:{hp:73,maxHp:73,mp:105,maxMp:105,atk:10,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['time_stop','rewind','temporal_rift','age_strike','time_blood_blast','time_blood_surge','fire_poison_plague','poison_light_drain'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','immunity'],
    description:'Disease implanted retroactively — the plague is delivered into the enemy\'s past, where it has been incubating since before the fight began. When The Incubation activates, the disease arrives at full progression rather than at initial infection.',
    lore:'The plaguedoctor needed incubation time. The chronomancer provided it retroactively. The Incubation solved the plaguedoctor\'s fundamental timing problem: disease delivered into the past arrives at the present at full potency, skipping the incubation period entirely by ensuring it already happened.'
  },

  chrono_geo: {
    id:'chrono_geo', name:'The Geological Archive', icon:'⏳',
    tagline:'Stone remembers every moment it has experienced. This reads those moments as weapons.',
    color:'#aa88aa', element:'time', elementFlavor:'timeearth', rarity:'rare',
    fusedFrom:['chronomancer','geomancer'],
    stats:{hp:85,maxHp:85,mp:90,maxMp:90,atk:11,def:9,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:6,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_ground_quake','ice_rock_avalanche','time_rune_final','normal_time_age'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','earth_body'],
    description:'Reads the timeline of stone — every impact, fracture, and weight the dungeon floor has experienced, summoned back into the present as seismic events. The Geological Archive extracts every geological event from the stone\'s past and replays them simultaneously.',
    lore:'Stone records time through striation, compression, and fracture. The chronomancer learned to read these records. The Geological Archive found that reading the stone\'s geological history backward while standing on it causes all those events to briefly co-exist, which is as bad for the dungeon floor as it sounds.'
  },

  chrono_lightbringer: {
    id:'chrono_lightbringer', name:'The Ancient Light', icon:'⏳',
    tagline:'The light from distant stars is old light. This one is older.',
    color:'#d5b3a2', element:'time', elementFlavor:'timelight', rarity:'epic',
    fusedFrom:['chronomancer','lightbringer'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:12,def:8,spd:14,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:8,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','light_time_blast','light_time_drain','light_time_final','normal_light_blind'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','radiant'],
    description:'Light pulled from the past — radiance from a time before darkness, divine luminance from the earliest recorded moment. The Ancient Light is older than any darkness it encounters and therefore predates any shadow\'s authority to exist in its presence.',
    lore:'The lightbringer brought the light of the present. The chronomancer brought the light of the past. The Ancient Light found that light from sufficiently far back predates the things that currently try to extinguish it, and that temporal seniority is, in this context, a meaningful advantage.'
  },

  chrono_beast: {
    id:'chrono_beast', name:'The Primordial Pack', icon:'⏳',
    tagline:'The oldest predators are extinct. This one disagrees.',
    color:'#99a2a2', element:'time', elementFlavor:'runetime', rarity:'rare',
    fusedFrom:['chronomancer','beastmaster'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:12,def:8,spd:14,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['time_stop','rewind','temporal_rift','age_strike','time_blood_surge','time_blood_strike','normal_dragon_roar','fire_fighting_combo'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','feral_bond'],
    description:'Summons predators from the deep past — prehistoric apex predators dragged forward through time, creatures from periods when prey animals had not yet developed countermeasures. The Primordial Pack hunts with instincts older than any defense.',
    lore:'The beastmaster commanded living animals. The chronomancer accessed past ones. The Primordial Pack found that prehistoric predators are in excellent condition relative to the prey animals they encounter in the present, having been pulled from an era before those prey animals developed the specific survival strategies currently available.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_11);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_11);
  FUSION_LOADED_FILES.add(11);
  if(typeof console!=='undefined') console.debug('[Fusion] File 11 loaded (37 classes)');
})();
