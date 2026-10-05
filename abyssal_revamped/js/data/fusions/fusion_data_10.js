// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 10 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_10 = {
  'dragonknight+pestilencelord': 'dragon_pestilence',
  'dragonknight+windwalker': 'dragon_wind',
  'doomcaster+dragonknight': 'dragon_doom',
  'arcanist+dragonknight': 'dragon_arcanist',
  'dragonknight+sentinel': 'dragon_sentinel',
  'dragonknight+phantom': 'dragon_phantom',
  'gravitist+tidecaller': 'tide_gravitist',
  'soundbreaker+tidecaller': 'tide_soundbreaker',
  'chronomancer+tidecaller': 'tide_chrono',
  'spellsword+tidecaller': 'tide_spellsword',
  'plaguedoctor+tidecaller': 'tide_plague',
  'geomancer+tidecaller': 'tide_geo',
  'lightbringer+tidecaller': 'tide_lightbringer',
  'beastmaster+tidecaller': 'tide_beast',
  'techsavant+tidecaller': 'tide_tech',
  'gravewarden+tidecaller': 'tide_grave',
  'magnetist+tidecaller': 'tide_magnetist',
  'crystalmancer+tidecaller': 'tide_crystal',
  'tidecaller+warlord': 'tide_war',
  'spiritwalker+tidecaller': 'tide_spirit',
  'hexblade+tidecaller': 'tide_hex',
  'cosmomancer+tidecaller': 'tide_cosmo',
  'pestilencelord+tidecaller': 'tide_pestilence',
  'tidecaller+windwalker': 'tide_wind',
  'doomcaster+tidecaller': 'tide_doom',
  'arcanist+tidecaller': 'tide_arcanist',
  'sentinel+tidecaller': 'tide_sentinel',
  'phantom+tidecaller': 'tide_phantom',
  'gravitist+soundbreaker': 'gravitist_soundbreaker',
  'chronomancer+gravitist': 'gravitist_chrono',
  'gravitist+spellsword': 'gravitist_spellsword',
  'gravitist+plaguedoctor': 'gravitist_plague',
  'geomancer+gravitist': 'gravitist_geo',
  'gravitist+lightbringer': 'gravitist_lightbringer',
  'beastmaster+gravitist': 'gravitist_beast',
  'gravitist+techsavant': 'gravitist_tech',
  'gravewarden+gravitist': 'gravitist_grave'
};

const FUSION_CLASSES_10 = {
  dragon_pestilence: {
    id:'dragon_pestilence', name:'The Plague Wyrm', icon:'🐉',
    tagline:'The dragon carries every disease it has ever survived. It has survived many.',
    color:'#997700', element:'venomdrake', rarity:'legendary',
    fusedFrom:['dragonknight','pestilencelord'],
    stats:{hp:105,maxHp:105,mp:75,maxMp:75,atk:14,def:10,spd:11,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:7,SPD:6,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','fire_poison_plague','fire_bug_plague','dragon_dark_dot_strike','poison_dark_drain'],
    burstAbility:'pestilence_burst',
    passives:['intimidation','plague_lord'],
    description:'A plague-bearer of draconic scale — diseases spread by breath weapon across the entire arena, venom upgraded to weaponized biological agent by the pestilencelord\'s expertise. The Plague Wyrm does not die of its own cargo. Everything else might.',
    lore:'The dragonknight survived things that kill lesser creatures. The pestilencelord catalogued what those things were. The Plague Wyrm is the combined result: a dragon that has survived every plague it now carries and delivers them with the enthusiasm of something that has never personally suffered the consequences.'
  },

  dragon_wind: {
    id:'dragon_wind', name:'The Storm Drake', icon:'🐉',
    tagline:'A dragon that flies fast enough creates its own weather. This one does it deliberately.',
    color:'#b39955', element:'stormdrake', rarity:'rare',
    fusedFrom:['dragonknight','windwalker'],
    stats:{hp:105,maxHp:105,mp:60,maxMp:60,atk:15,def:9,spd:16,crit:14},
    statDisplay:{HP:7,ATK:11,DEF:6,SPD:9,MP:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_wind_strike','dragon_wind_drain','fire_wind_cyclone','fire_flying_dive'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','gust'],
    description:'A dragon that generates storm conditions in its wake — wind currents shaped by wingbeats into weapons, cyclone charges that sweep the entire battlefield, and a 16 SPD that makes engagement on its own terms rather than the enemy\'s.',
    lore:'Dragons are large and generate significant air displacement when moving. The windwalker considered this professionally interesting. The Storm Drake treats atmospheric disruption as a primary attack vector, which reorganizes the typical combat timeline in ways opponents generally find inconvenient.'
  },

  dragon_doom: {
    id:'dragon_doom', name:'The Doomed Wyrm', icon:'🐉',
    tagline:'The dragon is doomed. So is everything near it.',
    color:'#a24d1a', element:'blooddrake', rarity:'legendary',
    fusedFrom:['dragonknight','doomcaster'],
    stats:{hp:100,maxHp:100,mp:80,maxMp:80,atk:14,def:8,spd:12,crit:14},
    statDisplay:{HP:7,ATK:10,DEF:5,SPD:7,MP:8},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_dark_final','dragon_dark_surge','dragon_dark_drain','normal_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['intimidation','doom_aura'],
    description:'A dragon with doom woven into its existence — fire breath carries the doom-curse, claw strikes seal fate on contact, and the dragon\'s own impending doom radiates outward as an aura that marks everyone nearby for the same conclusion.',
    lore:'The doomcaster sealed fates. The dragonknight had a very significant fate available. The Doomed Wyrm\'s own doom is so powerful it overflows into the surrounding area, which the doomcaster considers a design feature and the dragon considers an acceptable arrangement given the damage output it enables.'
  },

  dragon_arcanist: {
    id:'dragon_arcanist', name:'The Mage Drake', icon:'🐉',
    tagline:'The most powerful arcane practitioner is also the largest one in the room.',
    color:'#994d66', element:'minddrake', rarity:'legendary',
    fusedFrom:['dragonknight','arcanist'],
    stats:{hp:98,maxHp:98,mp:85,maxMp:85,atk:13,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:8},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','psychic_cosmic_blast','psychic_cosmic_weaken','dragon_cosmic_strike','electric_psychic_vortex'],
    burstAbility:'arcanist_burst',
    passives:['intimidation','arcane_mastery'],
    description:'A dragon who also happens to be an arcane grandmaster — formulae derived from the arcane tradition scaled to draconic energy output. The Mage Drake casts spells at magnitudes the arcanist alone could not sustain and the dragon alone would not think to direct.',
    lore:'The arcanist maximized arcane output within biological constraints. The dragonknight had considerably fewer biological constraints. The Mage Drake operates the arcane tradition on a power budget that the original practitioners did not anticipate and the tradition is still updating its upper limits to reflect.'
  },

  dragon_sentinel: {
    id:'dragon_sentinel', name:'The Dragon Fortress', icon:'🐉',
    tagline:'The wall holds. The wall breathes fire. These are both accurate statements.',
    color:'#b37744', element:'dragonforge', rarity:'rare',
    fusedFrom:['dragonknight','sentinel'],
    stats:{hp:145,maxHp:145,mp:45,maxMp:45,atk:13,def:16,spd:8,crit:8},
    statDisplay:{HP:10,ATK:9,DEF:10,SPD:4},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','normal_dragon_roar','fire_ground_quake','fire_steel_quench','normal_rune_ward'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','bastion'],
    description:'A dragon that holds ground — 145 HP and 16 DEF behind draconic scales, fire breath as area denial, and the same immovability as the sentinel but expressed in a body large enough to block corridors entirely. The Dragon Fortress is both the wall and its own garrison.',
    lore:'The sentinel held position through discipline. The dragonknight held position through being large enough to constitute a geographical feature. The Dragon Fortress holds position through both simultaneously, producing a fortification that cannot be flanked because it fits wall-to-wall.'
  },

  dragon_phantom: {
    id:'dragon_phantom', name:'The Spectral Wyrm', icon:'🐉',
    tagline:'A ghost that is also a dragon. The size does not diminish in death.',
    color:'#b3805e', element:'dragonspirit', rarity:'mythical',
    fusedFrom:['dragonknight','phantom'],
    stats:{hp:100,maxHp:100,mp:65,maxMp:65,atk:15,def:8,spd:15,crit:19},
    statDisplay:{HP:7,ATK:11,DEF:5,SPD:8,MP:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','water_ghost_phase','ice_ghost_wraith','dragon_spirit_drain','dragon_spirit_final'],
    burstAbility:'phantom_burst',
    passives:['intimidation','phase'],
    description:'A dragon-sized spectral entity that phases through dungeon walls — spectral fire breath, ghostly claw strikes that pass through armor, and the combined authority of draconic intimidation and phantom phasing. The Spectral Wyrm is a full-size dragon that walls cannot contain.',
    lore:'Dragons are already difficult. Ghost dragons are considerably more so. The Spectral Wyrm phases through whatever it encounters and breathes spectral fire that passes through shields. The dungeons were not designed with ghost dragons in mind, and most architectural assumptions no longer apply.'
  },

  tide_gravitist: {
    id:'tide_gravitist', name:'The Deep Pull', icon:'🌊',
    tagline:'The ocean floor is the gravitationally densest point of the ocean. This brings that force upward.',
    color:'#447799', element:'vortex', rarity:'epic',
    fusedFrom:['tidecaller','gravitist'],
    stats:{hp:80,maxHp:80,mp:93,maxMp:93,atk:10,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_gravity_pressure','water_gravity_collapse','water_gravity_eddy','gravity_void_surge'],
    burstAbility:'gravitist_burst',
    passives:['tidal_flow','gravity_well'],
    description:'Gravitational tides — uses mass to amplify tidal forces, creates gravitational riptides that pull enemies under, and generates pressure-collapse zones where water and gravity cooperate to compress whatever enters them.',
    lore:'Ocean tides are already gravitational phenomena. The gravitist noticed this overlap professionally. The Deep Pull operates at the intersection where tidal force and gravitational force become the same force, which is a location very difficult to swim away from.'
  },

  tide_soundbreaker: {
    id:'tide_soundbreaker', name:'The Tsunami Bell', icon:'🌊',
    tagline:'Sound carries further in water. The bell rings below the surface. Everything above hears it.',
    color:'#91a291', element:'resonantwave', rarity:'rare',
    fusedFrom:['tidecaller','soundbreaker'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:12,def:7,spd:14,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_sound_tsunami','water_sound_crescendo','water_sound_echo','ice_sound_shatter'],
    burstAbility:'soundbreaker_burst',
    passives:['tidal_flow','resonance'],
    description:'Sonic tides — sound waves amplified through water to create pressure-shockwaves that travel at tidal speed. The Tsunami Bell rings below the enemy\'s footing and the resonance arrives from below, above, and sideways simultaneously.',
    lore:'Sound behaves differently in water. The soundbreaker studied this. The Tsunami Bell found that tidal waves are already a sonic event at appropriate frequencies, and that aligning the wave frequency with the resonant frequency of enemy equipment produces results the tidecaller alone was not achieving.'
  },

  tide_chrono: {
    id:'tide_chrono', name:'The Eternal Tide', icon:'🌊',
    tagline:'The tide always returns. This one returns on a schedule only it controls.',
    color:'#7791e6', element:'tidaltime', rarity:'epic',
    fusedFrom:['tidecaller','chronomancer'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:10,def:7,spd:13,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_time_stasis','water_time_drain','water_time_rewind','dark_time_surge'],
    burstAbility:'chronomancer_burst',
    passives:['tidal_flow','time_warp'],
    description:'Tides that operate outside the normal timeline — waves that appear from the past, tidal stasis that freezes enemies in a moment of drowning, and the eternal certainty that the tide returns regardless of what defenses exist when it arrives.',
    lore:'Tides are governed by celestial cycles. The chronomancer governed time. The Eternal Tide found the tidal cycle is already a temporal phenomenon, and controlling the timeline means controlling when the tide returns — in practice, whenever it is most inconvenient for the current adversary.'
  },

  tide_spellsword: {
    id:'tide_spellsword', name:'The Riptide Mind', icon:'🌊',
    tagline:'The current pulls in the direction of the thought. The thought is aggressive.',
    color:'#776fbb', element:'mindwave', rarity:'rare',
    fusedFrom:['tidecaller','spellsword'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:12,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_psychic_vortex','water_psychic_depths','water_psychic_surge','electric_psychic_pulse'],
    burstAbility:'spellsword_burst',
    passives:['tidal_flow','spellblade'],
    description:'Psychic tides — water shaped by psionic pressure, riptide vortexes that scramble enemy concentration, and waves that carry mental assault as well as physical force. The Riptide Mind drowns both the body and its ability to resist.',
    lore:'Tides are persistent and direction-set by forces larger than the individual. Psionic precision adds targeting. The Riptide Mind creates psychic currents with tidal persistence — not a spike of mental force but a continuous pull the target cannot out-think because it is already inside their cognition.'
  },

  tide_plague: {
    id:'tide_plague', name:'The Miasmic Tide', icon:'🌊',
    tagline:'The water is already carrying something. You are already in the water.',
    color:'#66a280', element:'toxictide', rarity:'epic',
    fusedFrom:['tidecaller','plaguedoctor'],
    stats:{hp:80,maxHp:80,mp:95,maxMp:95,atk:10,def:8,spd:12,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:6,SPD:7,MP:9},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_poison_miasma','water_poison_dissolve','water_poison_corruption','fire_poison_plague'],
    burstAbility:'plaguedoctor_burst',
    passives:['tidal_flow','immunity'],
    description:'Plague carried in tidal water — disease dissolved into the wave itself, ensuring full coverage of everything the tide touches. The Miasmic Tide cannot be avoided by retreating from the water because the water follows.',
    lore:'Water transmits disease effectively. The plaguedoctor considered this a natural delivery system that had been underutilized. The Miasmic Tide formalizes the arrangement: disease is dissolved into the tidal water at therapeutic concentration, and the tide ensures even distribution across the battlefield.'
  },

  tide_geo: {
    id:'tide_geo', name:'The Undertow', icon:'🌊',
    tagline:'The sea takes the shore slowly. This one takes it all at once.',
    color:'#779191', element:'mudslide', rarity:'uncommon',
    fusedFrom:['tidecaller','geomancer'],
    stats:{hp:93,maxHp:93,mp:80,maxMp:80,atk:12,def:11,spd:11,crit:11},
    statDisplay:{HP:6,ATK:8,DEF:8,SPD:6,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','fire_ground_quake','fire_rock_strike','ice_rock_avalanche','water_dark_current'],
    burstAbility:'tidecaller_burst',
    passives:['tidal_flow','earth_body'],
    description:'Combines tidal force with geological weight — waves carrying stone, mudslide tides that reshape terrain permanently, and the grinding geological force of the shoreline compressed into dungeon-range events.',
    lore:'Where water meets rock, the rock always loses eventually. The Undertow makes this process immediate rather than geological: the tide carries the geomancer\'s stone, the stone amplifies the wave\'s mass, and the combined force remakes the battlefield in a single engagement.'
  },

  tide_lightbringer: {
    id:'tide_lightbringer', name:'The Bioluminescent', icon:'🌊',
    tagline:'The deep sea glows. What glows in the deep is not always friendly.',
    color:'#a2bb88', element:'holytide', rarity:'rare',
    fusedFrom:['tidecaller','lightbringer'],
    stats:{hp:85,maxHp:85,mp:88,maxMp:88,atk:12,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_light_surge','water_light_beacon','water_light_cleanse','normal_light_blind'],
    burstAbility:'lightbringer_burst',
    passives:['tidal_flow','radiant'],
    description:'Luminescent tides — waves that carry their own light, holy water that illuminates as it purges, and the cold light of the deep sea applied as a divine weapon. The Bioluminescent is beautiful at a distance. Up close it is considerably less scenic.',
    lore:'The deepest ocean produces its own light. The lightbringer studied how. The Bioluminescent found that bioluminescence is already a form of divine illumination at sufficient depth and scale, and that bringing it to surface level produces effects terrestrial techniques do not replicate.'
  },

  tide_beast: {
    id:'tide_beast', name:'The Sea Pack', icon:'🌊',
    tagline:'The ocean has predators. They learned to work together. It took geological time.',
    color:'#66aa88', element:'runetide', rarity:'uncommon',
    fusedFrom:['tidecaller','beastmaster'],
    stats:{hp:90,maxHp:90,mp:78,maxMp:78,atk:13,def:9,spd:14,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:7},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','normal_dragon_surge','water_spirit_drown','fire_fighting_combo','water_wind_torrent'],
    burstAbility:'tidecaller_burst',
    passives:['tidal_flow','feral_bond'],
    description:'Commands sea predators coordinated through tidal currents — aquatic beasts that attack from below the waterline, pack formations that use the tide as a coordination signal, and the accumulated apex-predator instincts of creatures adapted to a three-dimensional hunt.',
    lore:'The beastmaster coordinated land predators. The tidecaller coordinated water predators. The Sea Pack found the coordination method was the same in both cases and that aquatic predators who have already mastered three-dimensional hunting are particularly responsive to additional tactical direction.'
  },

  tide_tech: {
    id:'tide_tech', name:'The Hydro Engine', icon:'🌊',
    tagline:'Water is the original power source. This one has been considerably upgraded.',
    color:'#4491bb', element:'aquatech', rarity:'epic',
    fusedFrom:['tidecaller','techsavant'],
    stats:{hp:83,maxHp:83,mp:93,maxMp:93,atk:12,def:8,spd:14,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:9},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_steel_rust','water_steel_pierce','fire_cyber_overclock','fire_cyber_system_melt'],
    burstAbility:'techsavant_burst',
    passives:['tidal_flow','overclock'],
    description:'Water-powered technical systems deployed as weapons — hydro-turbines that generate combat electricity, tidal-driven mechanisms overclocked beyond rated limits, and water-steel attacks that corrode enemy equipment while breaching their armor.',
    lore:'The techsavant used electricity. The tidecaller used water. The Hydro Engine found these were sequential: water drives turbines, turbines generate electricity, electricity powers systems. The tidecaller provides unlimited fuel; the techsavant provides the conversion apparatus. Output is indefinitely sustained.'
  },

  tide_grave: {
    id:'tide_grave', name:'The Drowned Shore', icon:'🌊',
    tagline:'The sea swallows graves. Eventually it swallows everything. This one does not wait.',
    color:'#4d80aa', element:'tidesoul', rarity:'rare',
    fusedFrom:['tidecaller','gravewarden'],
    stats:{hp:100,maxHp:100,mp:78,maxMp:78,atk:12,def:11,spd:11,crit:11},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:6,MP:7},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_dark_drown','water_dark_depths','water_ghost_haunt','water_spirit_drown'],
    burstAbility:'tidecaller_burst',
    passives:['tidal_flow','undying'],
    description:'Tides that carry the drowned dead — waves full of waterlogged spirits, dark water that pulls the living toward the same depth, and a shore that does not return what it takes. The Drowned Shore refuses to be destroyed as long as water remains.',
    lore:'The gravewarden maintained graves. The ocean creates graves at scale. The Drowned Shore manages both: a coastline that takes the living, holds them, and eventually returns them changed. The gravewarden considers this a large-scale implementation of standard professional practice.'
  },

  tide_magnetist: {
    id:'tide_magnetist', name:'The Magnetic Current', icon:'🌊',
    tagline:'Salt water conducts. The current that flows through it has opinions.',
    color:'#4d99bb', element:'magnetwave', rarity:'rare',
    fusedFrom:['tidecaller','magnetist'],
    stats:{hp:85,maxHp:85,mp:88,maxMp:88,atk:12,def:9,spd:12,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','fire_magnet_pull','gravity_magnet_surge','water_steel_vortex','electric_steel_magnetize'],
    burstAbility:'magnetist_burst',
    passives:['tidal_flow','magnetic_field'],
    description:'Electrically conductive tides — salt water carrying magnetic fields through the battlefield, pulling metal weapons toward the current and creating electromagnetic whirlpools that drag armored combatants off their feet.',
    lore:'Salt water is an excellent conductor of both electricity and magnetic fields. The magnetist considered this industrially significant. The Magnetic Current operates the tide as an electromagnetic delivery system, using the water\'s natural conductivity to extend magnetic effects across the entire battlefield simultaneously.'
  },

  tide_crystal: {
    id:'tide_crystal', name:'The Crystal Tide', icon:'🌊',
    tagline:'The water grew them. They grew through the water. Now both go where they choose.',
    color:'#66aae6', element:'crystalwave', rarity:'epic',
    fusedFrom:['tidecaller','crystalmancer'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:13,def:7,spd:14,crit:16},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:8,MP:9},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_crystal_refract','water_crystal_flow','water_crystal_drain','fire_crystal_shard'],
    burstAbility:'crystalmancer_burst',
    passives:['tidal_flow','crystal_body'],
    description:'Crystal structures grown inside moving water — tide-suspended crystal shards that refract wave energy into multiple simultaneous beams, crystalline riptides that shatter on enemy contact, and water that flows through crystal lattices without slowing.',
    lore:'Crystals grow in water. The crystalmancer accelerated this. The Crystal Tide operates in a medium full of structures growing and shattering continuously — the tide is simultaneously a crystal quarry, a crystal delivery system, and a crystal detonation mechanism.'
  },

  tide_war: {
    id:'tide_war', name:'The Naval Siege', icon:'🌊',
    tagline:'The warlord\'s favorite terrain is one the enemy cannot cross. The ocean qualifies.',
    color:'#886f66', element:'watertide', rarity:'rare',
    fusedFrom:['tidecaller','warlord'],
    stats:{hp:103,maxHp:103,mp:73,maxMp:73,atk:14,def:11,spd:12,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','fire_fighting_rage','water_wind_tempest','normal_blood_mark','fire_rock_strike'],
    burstAbility:'tidecaller_burst',
    passives:['tidal_flow','battle_hardened'],
    description:'Applies warlord tactics to tidal warfare — waves directed as maneuvers, riptides as flanking movements, the tidal cycle as a battle rhythm dictating engagement windows. The Naval Siege controls the water-terrain and everything in it.',
    lore:'Warlords study terrain. The ocean is terrain that moves, which is the most advantageous kind. The Naval Siege treats the tide as a tactical element and plans engagements around tidal cycles the way other warlords plan around sunrise and sunset.'
  },

  tide_spirit: {
    id:'tide_spirit', name:'The Ocean\'s Memory', icon:'🌊',
    tagline:'The ocean remembers every ship it has taken. It shares this history freely.',
    color:'#44a2aa', element:'spiritwave', rarity:'epic',
    fusedFrom:['tidecaller','spiritwalker'],
    stats:{hp:88,maxHp:88,mp:88,maxMp:88,atk:11,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_spirit_siphon','water_spirit_banish','water_spirit_flow','water_spirit_drown'],
    burstAbility:'spiritwalker_burst',
    passives:['tidal_flow','spirit_bond'],
    description:'Channels the spirits of the sea-dead — drowned warriors, sunken ghosts, the accumulated spiritual residue of every life the ocean has claimed. The Ocean\'s Memory deploys these as allies, and the ocean has been collecting them for a very long time.',
    lore:'The spiritwalker communed with spirits. The ocean contains more spirits than anywhere else. The Ocean\'s Memory found the sea\'s accumulated dead are enthusiastic about participation and that the tidal connection provides communication bandwidth with drowned spirits that land-based techniques could not match.'
  },

  tide_hex: {
    id:'tide_hex', name:'The Binding Current', icon:'🌊',
    tagline:'The current sets the direction. The hex sets the destination.',
    color:'#665eaa', element:'bloodtide', rarity:'epic',
    fusedFrom:['tidecaller','hexblade'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:12,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_dark_maelstrom','water_dark_void','normal_void_curse','psychic_void_blast'],
    burstAbility:'hexblade_burst',
    passives:['tidal_flow','hex_master'],
    description:'Hexes carried in water — curses dissolved into the tide that activate on contact, binding currents that hold hexed targets in place while the sea does its work. The Binding Current delivers hexes to places the hexblade could not physically reach.',
    lore:'The hexblade placed curses at close range. The tide reaches everywhere. The Binding Current combined these delivery methods and found that a hex dissolved in tidal water achieves coverage that direct application cannot match, reaching enemies behind obstacles or in full retreat.'
  },

  tide_cosmo: {
    id:'tide_cosmo', name:'The Cosmic Ocean', icon:'🌊',
    tagline:'The ocean covers most of the planet. Space covers everything else. Together: everything.',
    color:'#4466bb', element:'cosmicwave', rarity:'legendary',
    fusedFrom:['tidecaller','cosmomancer'],
    stats:{hp:78,maxHp:78,mp:103,maxMp:103,atk:11,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_cosmic_tide','water_cosmic_void','water_cosmic_depths','light_cosmic_blast'],
    burstAbility:'cosmomancer_burst',
    passives:['tidal_flow','stardust'],
    description:'Tides governed by cosmic forces — star-driven waves, nebula-currents that flow through solid matter, and the astronomical authority of bodies large enough to affect planetary hydrology applied at dungeon scale.',
    lore:'Ocean tides are already cosmological phenomena, caused by the gravitational influence of the moon and sun. The cosmomancer extended this to all celestial bodies in range. The Cosmic Ocean is driven by a gravitational consortium of every astronomical object the cosmomancer could negotiate with.'
  },

  tide_pestilence: {
    id:'tide_pestilence', name:'The Red Tide', icon:'🌊',
    tagline:'The color is a warning. The tide does not wait for warnings to be processed.',
    color:'#4d9166', element:'toxictide', rarity:'epic',
    fusedFrom:['tidecaller','pestilencelord'],
    stats:{hp:83,maxHp:83,mp:95,maxMp:95,atk:12,def:8,spd:12,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_poison_surge','water_poison_siphon','fire_poison_plague','poison_dark_drain'],
    burstAbility:'pestilence_burst',
    passives:['tidal_flow','plague_lord'],
    description:'Biological plague tides — water supersaturated with engineered organisms that bloom on contact with living tissue. The Red Tide covers the entire battlefield in a single wave and the bloom activates immediately on landing.',
    lore:'Red tides occur naturally when certain organisms bloom in seawater. The pestilencelord found the organisms, studied them, and improved them. The Red Tide is an engineered biological event at tidal scale: the tidecaller\'s delivery range combined with the pestilencelord\'s biological expertise.'
  },

  tide_wind: {
    id:'tide_wind', name:'The Typhoon', icon:'🌊',
    tagline:'The typhoon is wind and water at 17 SPD. Neither is negotiable.',
    color:'#66b3bb', element:'typhoon', rarity:'rare',
    fusedFrom:['tidecaller','windwalker'],
    stats:{hp:83,maxHp:83,mp:80,maxMp:80,atk:12,def:7,spd:17,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:9,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_wind_maelstrom','water_wind_vortex','water_wind_tempest','fire_wind_cyclone'],
    burstAbility:'tidecaller_burst',
    passives:['tidal_flow','gust'],
    description:'A self-sustaining typhoon — wind and wave feeding each other to maintain and amplify the storm. Moving at 17 SPD, the Typhoon covers the battlefield before enemies can establish a defensive position and leaves no stable footing behind it.',
    lore:'Typhoons are water and wind in a self-sustaining feedback loop. The windwalker provided the wind; the tidecaller provided the water. The Typhoon found the feedback loop forms naturally when these two disciplines operate simultaneously, and that neither party needs to intervene much once it has started.'
  },

  tide_doom: {
    id:'tide_doom', name:'The Drowning Sentence', icon:'🌊',
    tagline:'The doom is already in the water. You are already in the water.',
    color:'#556680', element:'bloodtide', rarity:'legendary',
    fusedFrom:['tidecaller','doomcaster'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:11,def:6,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_dark_void','water_dark_current','time_void_blast','normal_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['tidal_flow','doom_aura'],
    description:'Doom dissolved in tidal water — the death sentence carried by the wave, delivered on contact to everything the tide touches. The Drowning Sentence does not target individuals. It delivers doom wholesale with tidal coverage.',
    lore:'Doom requires delivery. Tides deliver everything in their path. The Drowning Sentence made the tide a doom vector and found this solved the doomcaster\'s perennial coverage problem: individual targeting is replaced by tidal distribution, which the doom activates regardless.'
  },

  tide_arcanist: {
    id:'tide_arcanist', name:'The Formless Theorem', icon:'🌊',
    tagline:'Water has no fixed shape. The formula it carries does.',
    color:'#4d66cc', element:'mindwave', rarity:'epic',
    fusedFrom:['tidecaller','arcanist'],
    stats:{hp:75,maxHp:75,mp:105,maxMp:105,atk:10,def:6,spd:13,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_psychic_drain','water_psychic_torrent','psychic_cosmic_blast','psychic_void_blast'],
    burstAbility:'arcanist_burst',
    passives:['tidal_flow','arcane_mastery'],
    description:'Arcane formulae expressed through tidal motion — spells cast as wave patterns that carry their effect across the battlefield. The Formless Theorem is shapeless and exactly correct simultaneously.',
    lore:'The arcanist wrote formulae with fixed syntax. Water has fluid syntax. The Formless Theorem found that a formula expressed as a wave pattern reaches farther than one expressed as a point and carries the same mathematical precision in a much larger delivery envelope.'
  },

  tide_sentinel: {
    id:'tide_sentinel', name:'The Sea Wall', icon:'🌊',
    tagline:'The sea wall does not move. The sea behind it is another matter.',
    color:'#6691aa', element:'tidewall', rarity:'uncommon',
    fusedFrom:['tidecaller','sentinel'],
    stats:{hp:123,maxHp:123,mp:65,maxMp:65,atk:10,def:14,spd:9,crit:8},
    statDisplay:{HP:8,ATK:7,DEF:9,SPD:5,MP:6},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_steel_flow','water_steel_pierce','normal_rune_ward','normal_ice_prison'],
    burstAbility:'tidecaller_burst',
    passives:['tidal_flow','bastion'],
    description:'An immovable fortification with the ocean behind it — the Sea Wall holds position while tides surge over and through the enemy. Cannot be moved, regenerates from water damage, and has effectively unlimited reserves in the form of the tide itself.',
    lore:'The sentinel held ground. The ocean holds ground differently: it does not stay in one place, but it always returns. The Sea Wall combines both forms of holding — the sentinel holds the position and the ocean holds the initiative, and neither gives up what it holds.'
  },

  tide_phantom: {
    id:'tide_phantom', name:'The Deepwater Haunt', icon:'🌊',
    tagline:'The ghost in the water is older than the shore.',
    color:'#6699c4', element:'tidesoul', rarity:'legendary',
    fusedFrom:['tidecaller','phantom'],
    stats:{hp:78,maxHp:78,mp:85,maxMp:85,atk:13,def:6,spd:16,crit:20},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['tidal_surge','wave_crash','riptide','tsunami','water_ghost_phase','water_ghost_wraith','ice_ghost_siphon','water_spirit_siphon'],
    burstAbility:'phantom_burst',
    passives:['tidal_flow','phase'],
    description:'A spectral entity bound to deep water — phases through the battlefield on tidal currents, drains life force through tidal contact, and moves at 16 SPD through a medium no physical barrier can stop.',
    lore:'The deepest water contains things that have been there longer than most dungeon floors have existed. The Deepwater Haunt is one of them: a phantom that predates the current architecture and treats walls and floors as the temporary arrangements they are from its geological perspective.'
  },

  gravitist_soundbreaker: {
    id:'gravitist_soundbreaker', name:'The Resonant Crush', icon:'⚫',
    tagline:'Sound at the resonant frequency of gravity is not sound. It is structure failure.',
    color:'#91805e', element:'gravitysound', rarity:'epic',
    fusedFrom:['gravitist','soundbreaker'],
    stats:{hp:78,maxHp:78,mp:90,maxMp:90,atk:12,def:6,spd:14,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','sound_void_strike','sound_void_final','gravity_magnet_surge','ice_sound_shatter'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','resonance'],
    description:'Sonic gravity — sound waves propagated through gravitational force, producing vibrations at the resonant frequency of mass itself. The Resonant Crush does not break surfaces with pressure. It breaks them by vibrating their molecular bonds at the frequency gravity suggests.',
    lore:'Gravity affects all matter. Sound propagates through matter. The gravitist and soundbreaker found these disciplines intersect at a frequency matter itself is not designed to resist. Buildings are not designed for this. Neither are enemies.'
  },

  gravitist_chrono: {
    id:'gravitist_chrono', name:'The Time Dilation Engine', icon:'⚫',
    tagline:'Mass slows time. This mass slows time intentionally.',
    color:'#776fb3', element:'timedilation', rarity:'legendary',
    fusedFrom:['gravitist','chronomancer'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:10,def:6,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','dark_time_surge','dark_time_drain','gravity_void_blast','time_void_drain'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','time_warp'],
    description:'Uses gravitational mass to dilate time around targets — enemies near gravity wells age faster or freeze in temporal suspension. The Time Dilation Engine can make a target experience a year inside a second, or stop their subjective time entirely while combat proceeds around them.',
    lore:'General relativity establishes that mass curves time as well as space. The chronomancer understood time; the gravitist understood mass. The Time Dilation Engine applies both simultaneously and has found the overlap is larger than either tradition independently appreciated.'
  },

  gravitist_spellsword: {
    id:'gravitist_spellsword', name:'The Mind Crush', icon:'⚫',
    tagline:'Gravity on the mind is not metaphorical. It is gravitational force applied to the mind.',
    color:'#774d88', element:'mindcrush', rarity:'epic',
    fusedFrom:['gravitist','spellsword'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:12,def:7,spd:12,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:7,MP:8},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','psychic_void_blast','psychic_void_surge','gravity_magnet_blast','electric_psychic_vortex'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','spellblade'],
    description:'Psionic gravity — mental force applied with gravitational authority, psychic pressure that increases with proximity to the gravitational well. The Mind Crush compresses enemy cognition in the same way gravity compresses matter, producing structural failure in both.',
    lore:'The spellsword struck at the mind. The gravitist struck at mass. The Mind Crush found that the mind has mass and that applying gravitational force to a brain produces cognitive effects standard psionic attacks do not. The neurological literature does not have a category for this.'
  },

  gravitist_plague: {
    id:'gravitist_plague', name:'The Gravity Plague', icon:'⚫',
    tagline:'Gravity compresses bodies. Compressed bodies are more susceptible to infection. This is a feedback loop.',
    color:'#66804d', element:'graveplague', rarity:'legendary',
    fusedFrom:['gravitist','plaguedoctor'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:10,def:7,spd:11,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_poison_plague','poison_cosmic_blast','gravity_void_surge','poison_dark_drain'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','immunity'],
    description:'Disease engineered to exploit gravitational compression — plagues that activate when cellular pressure increases, spreading faster through compressed targets. The Gravity Plague first compresses, then infects at the density that maximizes infection rate.',
    lore:'The plaguedoctor studied what makes infection more effective. Density is a factor: compressed tissue is more susceptible. The gravitist provided compression on demand. The Gravity Plague applies gravitational crush first and disease second, producing infection rates the standard approach does not achieve.'
  },

  gravitist_geo: {
    id:'gravitist_geo', name:'The Singularity Point', icon:'⚫',
    tagline:'The densest point in the dungeon is here. Everything else falls toward it.',
    color:'#776f5e', element:'singularity', rarity:'rare',
    fusedFrom:['gravitist','geomancer'],
    stats:{hp:88,maxHp:88,mp:83,maxMp:83,atk:11,def:9,spd:10,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:6,MP:8},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_ground_quake','ice_rock_shatter','gravity_void_strike','normal_gravity_anchor'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','earth_body'],
    description:'A gravitational singularity anchored in geomantic stone — a point of maximum mass that pulls the battlefield inward, crushes earth into denser configurations, and draws enemies from any direction toward a single point of concentrated geological and gravitational force.',
    lore:'The geomancer dealt with large masses of stone. The gravitist dealt with their gravitational authority. The Singularity Point found that placing a gravitational singularity inside a geological formation produces a stable, self-reinforcing anchor that neither discipline could generate independently.'
  },

  gravitist_lightbringer: {
    id:'gravitist_lightbringer', name:'The Heavy Light', icon:'⚫',
    tagline:'Light has mass. Enough light in one place has significant mass. This is that place.',
    color:'#a29955', element:'lightheavy', rarity:'epic',
    fusedFrom:['gravitist','lightbringer'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:12,def:8,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','dragon_light_drain','dragon_light_weaken','normal_light_blind','normal_light_dawn'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','radiant'],
    description:'Gravitationally concentrated light — photons compressed to the density where light itself becomes a crushing force. The Heavy Light focuses divine radiance into a gravitational lens that burns and crushes simultaneously from any distance.',
    lore:'Photons have momentum and therefore interact with gravity. The gravitist and lightbringer found this interaction is significant at sufficient light density. The Heavy Light concentrates divine light to the gravitational threshold where it stops passing through things and starts pressing through them instead.'
  },

  gravitist_beast: {
    id:'gravitist_beast', name:'The Heavy Pack', icon:'⚫',
    tagline:'The pack that weighs more hits harder. This is basic physics applied to predators.',
    color:'#668855', element:'runeweight', rarity:'rare',
    fusedFrom:['gravitist','beastmaster'],
    stats:{hp:85,maxHp:85,mp:80,maxMp:80,atk:12,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','normal_dragon_surge','normal_dragon_roar','gravity_magnet_blast','normal_gravity_pull'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','feral_bond'],
    description:'Commands gravitationally enhanced predators — beasts with increased effective mass for impact force, pack formations anchored in gravitational wells, and coordinated strikes where each animal lands with the weight of several. The Heavy Pack hits harder than its size suggests.',
    lore:'Impact force is mass times acceleration. The beastmaster provided the acceleration; the gravitist provided the mass. The Heavy Pack found that a predator with doubled effective mass at the moment of impact produces twice the force per strike, and coordinating this across a pack multiplies the effect further.'
  },

  gravitist_tech: {
    id:'gravitist_tech', name:'The Gravity Engine', icon:'⚫',
    tagline:'Gravity is free energy if you know how to extract it. This one knows how.',
    color:'#446f88', element:'techgrav', rarity:'legendary',
    fusedFrom:['gravitist','techsavant'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:11,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','fire_cyber_overclock','fire_cyber_system_melt','gravity_void_final','electric_cyber_spark'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','overclock'],
    description:'Technical systems powered by gravitational energy extraction — machines overclocked by gravity differentials, weapons that use mass collapse as a power source, and a perpetual energy engine that the techsavant finds professionally satisfying.',
    lore:'The techsavant needed power sources. The gravitist had gravitational potential energy in quantity. The Gravity Engine built the conversion apparatus and found that a gravitational well generates sufficient power to run everything at overclock indefinitely, which solved the energy problem permanently.'
  },

  gravitist_grave: {
    id:'gravitist_grave', name:'The Gravity Tomb', icon:'⚫',
    tagline:'Everything falls into the grave. Gravity ensures the grave is always below.',
    color:'#4d5e77', element:'gravesoul', rarity:'epic',
    fusedFrom:['gravitist','gravewarden'],
    stats:{hp:95,maxHp:95,mp:80,maxMp:80,atk:11,def:10,spd:10,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['gravity_crush','mass_shift','event_horizon','singularity','water_ghost_haunt','gravity_void_dot_strike','normal_gravity_anchor','water_dark_depths'],
    burstAbility:'gravitist_burst',
    passives:['gravity_well','undying'],
    description:'A grave with gravitational authority — everything falls toward it, is held there by gravitational mass, and is prevented from leaving by the same force that brought it in. The Gravity Tomb is self-filling and self-maintaining.',
    lore:'The gravewarden dug graves. The gravitist found that a sufficiently massive grave fills itself. The Gravity Tomb combined these observations and found that a grave with gravitational pull at its center is the most efficient burial system available: enemies fall in, stay in, and maintenance is handled by physics.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_10);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_10);
  FUSION_LOADED_FILES.add(10);
  if(typeof console!=='undefined') console.debug('[Fusion] File 10 loaded (37 classes)');
})();
