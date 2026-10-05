// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 5 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_5 = {
  'spiritwalker+stormcaller': 'storm_spirit',
  'hexblade+stormcaller': 'storm_hex',
  'cosmomancer+stormcaller': 'storm_cosmo',
  'pestilencelord+stormcaller': 'storm_pestilence',
  'stormcaller+windwalker': 'storm_wind',
  'doomcaster+stormcaller': 'storm_doom',
  'arcanist+stormcaller': 'storm_arcanist',
  'sentinel+stormcaller': 'storm_sentinel',
  'phantom+stormcaller': 'storm_phantom',
  'bloodknight+voidmancer': 'blood_void',
  'bloodknight+runeblade': 'blood_rune',
  'bloodknight+necromancer': 'blood_necro',
  'bloodknight+paladin': 'blood_paladin',
  'bloodknight+frostweaver': 'blood_frost',
  'bloodknight+dragonknight': 'blood_dragon',
  'bloodknight+tidecaller': 'blood_tide',
  'bloodknight+gravitist': 'blood_gravitist',
  'bloodknight+soundbreaker': 'blood_soundbreaker',
  'bloodknight+chronomancer': 'blood_chrono',
  'bloodknight+spellsword': 'blood_spellsword',
  'bloodknight+plaguedoctor': 'blood_plague',
  'bloodknight+geomancer': 'blood_geo',
  'bloodknight+lightbringer': 'blood_lightbringer',
  'beastmaster+bloodknight': 'blood_beast',
  'bloodknight+techsavant': 'blood_tech',
  'bloodknight+gravewarden': 'blood_grave',
  'bloodknight+magnetist': 'blood_magnetist',
  'bloodknight+crystalmancer': 'blood_crystal',
  'bloodknight+warlord': 'blood_war',
  'bloodknight+spiritwalker': 'blood_spirit',
  'bloodknight+hexblade': 'blood_hex',
  'bloodknight+cosmomancer': 'blood_cosmo',
  'bloodknight+pestilencelord': 'blood_pestilence',
  'bloodknight+windwalker': 'blood_wind',
  'bloodknight+doomcaster': 'blood_doom',
  'arcanist+bloodknight': 'blood_arcanist',
  'bloodknight+sentinel': 'blood_sentinel'
};

const FUSION_CLASSES_5 = {
  storm_spirit: {
    id:'storm_spirit', name:'The Charged Soul', icon:'⚡',
    tagline:'The spirit takes what form the storm gives it.',
    color:'#4da2b3', element:'spirit', elementFlavor:'spiritbolt', rarity:'epic',
    fusedFrom:['stormcaller','spiritwalker'],
    stats:{hp:88,maxHp:88,mp:83,maxMp:83,atk:12,def:8,spd:14,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_spirit_surge','electric_spirit_possession','electric_spirit_veil','electric_spirit_siphon'],
    burstAbility:'spiritwalker_burst',
    passives:['static_charge','spirit_bond'],
    description:'Spirit energy and electrical charge, indistinguishable. Spirits crackle with lightning. Lightning carries spiritual memory. The Charged Soul possesses enemies electrically — every bolt leaves a fragment that disrupts from within.',
    lore:'The spiritwalker moved between the living and the dead. The stormcaller moved between the ground and the sky. They found the intersection was a place neither had a name for, but both found professionally familiar.'
  },

  storm_hex: {
    id:'storm_hex', name:'Cursed Lightning', icon:'🔮',
    tagline:'The hex rides the bolt. It arrives before the target can respond.',
    color:'#6f5eb3', element:'dark', elementFlavor:'stormblood', rarity:'epic',
    fusedFrom:['stormcaller','hexblade'],
    stats:{hp:83,maxHp:83,mp:85,maxMp:85,atk:13,def:7,spd:14,crit:16},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_dark_corruption','electric_dark_eclipse','electric_dark_annihilation','electric_dark_siphon'],
    burstAbility:'hexblade_burst',
    passives:['static_charge','hex_master'],
    description:'Delivers hexes at lightning speed before targets can raise defenses. Each bolt is also a curse carrier — misfortune, weakness, doom — applied at the speed of thought. Chain lightning spreads hexes to every target it arcs through.',
    lore:'Hexes work by proximity or contact. The hexblade preferred contact. The stormcaller said: what if the contact were unavoidable and instantaneous? This question resolved into a career pivot for both parties.'
  },

  storm_cosmo: {
    id:'storm_cosmo', name:'The Cosmic Tempest', icon:'🌌',
    tagline:'The universe is mostly lightning. The rest is just waiting.',
    color:'#4d66c4', element:'electric', elementFlavor:'cosmicstorm', rarity:'legendary',
    fusedFrom:['stormcaller','cosmomancer'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:12,def:6,spd:14,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_cosmic_cosmic_storm','electric_cosmic_supernova','electric_cosmic_constellation','electric_space_singularity'],
    burstAbility:'cosmomancer_burst',
    passives:['static_charge','stardust'],
    description:'Channels the electromagnetic forces that move galaxies — storms at a cosmic scale, compressed into dungeon range. The Cosmic Tempest does not compare to natural phenomena. It is a natural phenomenon, operating locally.',
    lore:'The stormcaller called large storms. The cosmomancer called things larger than storms. The Cosmic Tempest is the result of asking what happens if you call those things down the same staircase.'
  },

  storm_pestilence: {
    id:'storm_pestilence', name:'The Plague Front', icon:'🌧️',
    tagline:'When the storm breaks, it rains something worse than water.',
    color:'#55916f', element:'poison', elementFlavor:'toxicstorm', rarity:'epic',
    fusedFrom:['stormcaller','pestilencelord'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_poison_storm','electric_poison_overload','electric_poison_conduct','electric_poison_cascade'],
    burstAbility:'pestilence_lord_burst',
    passives:['static_charge','plague_lord'],
    description:'A pestilence delivery system of unprecedented speed and range. The storm carries plague spores on every gust; lightning strikes aerosolize contagion across wide areas; and chain arcs transmit engineered diseases to every target in reach.',
    lore:'The pestilencelord wanted wider coverage. The stormcaller covered wide areas. The Plague Front achieves an infection radius that the plaguedoctor described as "ambitious" and everyone else described as "a significant problem".'
  },

  storm_wind: {
    id:'storm_wind', name:'The Hurricane', icon:'🌪️',
    tagline:'The eye is calm. Everything surrounding it is not.',
    color:'#6fb3c4', element:'wind', elementFlavor:'tempest', rarity:'rare',
    fusedFrom:['stormcaller','windwalker'],
    stats:{hp:83,maxHp:83,mp:75,maxMp:75,atk:13,def:7,spd:18,crit:17},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:10,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_wind_maelstrom','electric_wind_thunderstorm','electric_wind_gale','electric_wind_discharge'],
    burstAbility:'storm_burst',
    passives:['static_charge','gust'],
    description:'A self-contained hurricane with 18 SPD. Moves through enemies like weather through terrain — undirectable, unstoppable, and leaving devastation along its entire path. The wind and lightning feed each other in a perpetual acceleration.',
    lore:'The windwalker moved like wind. The stormcaller moved like lightning. The Hurricane moves like both at once, which is a velocity that most enemies find difficult to track and impossible to stay ahead of.'
  },

  storm_doom: {
    id:'storm_doom', name:'The Final Storm', icon:'⚡',
    tagline:'Doom is just a storm that knows where to aim.',
    color:'#5e6688', element:'electric', elementFlavor:'stormblood', rarity:'legendary',
    fusedFrom:['stormcaller','doomcaster'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:12,def:6,spd:14,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_space_void','electric_void_collapse','electric_dark_annihilation','electric_void_rupture'],
    burstAbility:'doomcaster_burst',
    passives:['static_charge','doom_aura'],
    description:'Marks targets with doom, then lets the storm guarantee the outcome. Every bolt carries doom charge. Every chain adds more. By the time the Final Storm has finished its second exchange, the result is not in question.',
    lore:'The doomcaster said: I can doom anything. The stormcaller said: I can reach anything. The Final Storm is what happens when both statements are combined into a single operational policy.'
  },

  storm_arcanist: {
    id:'storm_arcanist', name:'The Psionic Tempest', icon:'🧠',
    tagline:'The mind moves at the speed of thought. Lightning is faster. Together they argue about which matters.',
    color:'#5566d5', element:'psychic', elementFlavor:'psiblast', rarity:'epic',
    fusedFrom:['stormcaller','arcanist'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:11,def:6,spd:14,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_psychic_feedback','electric_psychic_vortex','electric_psychic_mind','electric_psychic_pulse'],
    burstAbility:'void_burst',
    passives:['static_charge','arcane_mastery'],
    description:'Arcane amplification meets electrical fury — psychic feedback loops that grow with every bolt, mental vortexes that pull lightning inward, and psionic explosions delivered at electrical speed to targets that cannot process the attack fast enough to respond.',
    lore:'The arcanist worked with the precision of thought. The stormcaller worked with the force of weather. The Psionic Tempest discovered that precision and force are not mutually exclusive when applied at the right velocity.'
  },

  storm_sentinel: {
    id:'storm_sentinel', name:'The Living Bulwark', icon:'🏰',
    tagline:'The wall that strikes back at the speed of light.',
    color:'#6f91b3', element:'electric', elementFlavor:'stormsteel', rarity:'uncommon',
    fusedFrom:['stormcaller','sentinel'],
    stats:{hp:123,maxHp:123,mp:60,maxMp:60,atk:10,def:13,spd:11,crit:10},
    statDisplay:{HP:8,ATK:7,DEF:9,SPD:7,MP:6},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_steel_conductor','electric_steel_coil','electric_ground_discharge','electric_steel_rail'],
    burstAbility:'storm_burst',
    passives:['static_charge','bastion'],
    description:'A fortress that fights back with lightning speed. Absorbs damage into charge, then releases it as targeted lightning strikes timed to the attacker\'s own offensive window. Hitting the Living Bulwark powers its next counterattack.',
    lore:'The sentinel said: nothing passes. The stormcaller said: things that approach get struck by lightning. Neither of these statements, deployed together, leaves attacking enemies a satisfying set of options.'
  },

  storm_phantom: {
    id:'storm_phantom', name:'The Thunderghost', icon:'👻',
    tagline:'The ghost rides the lightning. The lightning is the ghost.',
    color:'#6f99cc', element:'ghost', elementFlavor:'stormsoul', rarity:'legendary',
    fusedFrom:['stormcaller','phantom'],
    stats:{hp:78,maxHp:78,mp:80,maxMp:80,atk:13,def:6,spd:17,crit:22},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:10,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ghost_possession','electric_ghost_chain','electric_ghost_exorcism','water_ghost_phase'],
    burstAbility:'shadow_burst',
    passives:['static_charge','phase'],
    description:'A spectral entity that travels inside lightning bolts — phases out of existence, travels through the arc, and phases back in at the point of impact. Cannot be targeted between strikes. Attacks from inside the electrical discharge.',
    lore:'Ghosts move through walls. Lightning moves through conductors. The Thunderghost found that, at certain frequencies, these are the same movement through the same medium, and has been using both doors ever since.'
  },

  blood_void: {
    id:'blood_void', name:'The Exsanguination', icon:'🩸',
    tagline:'The void does not consume. The blood does. The void is the vessel.',
    color:'#912b66', element:'dark', elementFlavor:'abyssblade', rarity:'epic',
    fusedFrom:['bloodknight','voidmancer'],
    stats:{hp:93,maxHp:93,mp:80,maxMp:80,atk:12,def:8,spd:10,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:6,MP:8},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_void_drain','normal_void_unmake','normal_dark_void','normal_void_curse'],
    burstAbility:'void_burst',
    passives:['vital_hunger','void_affinity'],
    description:'Drains blood into the void — not spilling it but erasing it, pulling it from the target\'s veins into null-space. Targets drained this way cannot be healed by conventional means. The blood is simply gone from the equation.',
    lore:'The bloodknight drank blood for power. The voidmancer erased things for power. The Exsanguination combined these operations and discovered they point at the same result from opposite directions.'
  },

  blood_rune: {
    id:'blood_rune', name:'Bloodscribed', icon:'🔱',
    tagline:'Every rune carved in flesh is a promise. Every promise is power.',
    color:'#c45e1a', element:'dark', elementFlavor:'bloodrune', rarity:'rare',
    fusedFrom:['bloodknight','runeblade'],
    stats:{hp:110,maxHp:110,mp:60,maxMp:60,atk:14,def:11,spd:11,crit:11},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','blood_rune_strike','blood_rune_weaken','blood_rune_dot_strike','blood_rune_final'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','rune_mastery'],
    description:'Carves blood-runes into living flesh — each inscription drains life force over time and triggers devastating effects when destroyed. The runes feed the caster; the caster carves more runes. A self-sustaining economy of damage.',
    lore:'The runeblade wrote on stone and steel. The bloodknight found that flesh holds a mark better than either, and the ink it uses is renewable as long as the target is still alive. Temporarily.'
  },

  blood_necro: {
    id:'blood_necro', name:'The Crimson Lich', icon:'💀',
    tagline:'Death is just blood that has stopped moving. Move it again.',
    color:'#6f5e3c', element:'dark', elementFlavor:'deathblood', rarity:'rare',
    fusedFrom:['bloodknight','necromancer'],
    stats:{hp:95,maxHp:95,mp:85,maxMp:85,atk:12,def:8,spd:9,crit:10},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:5,MP:8},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_harvest','normal_blood_feast','normal_dark_consume','normal_blood_offering'],
    burstAbility:'necro_burst',
    passives:['vital_hunger','death_aura'],
    description:'Raises the dead and powers them with blood magic rather than necrotic energy — undead that retain the bloodlust of their former selves, feeding kills back to the Crimson Lich in an endless cycle of consumption and resurrection.',
    lore:'Necromancers animate the dead. The bloodknight asked: what if they were hungry again? The Crimson Lich found that the answer to this question produces undead that are considerably more motivated than the standard models.'
  },

  blood_paladin: {
    id:'blood_paladin', name:'The Fallen Crusade', icon:'⚜️',
    tagline:'Holy blood spilled for a cause becomes something else entirely.',
    color:'#c46f33', element:'dark', elementFlavor:'fallenlight', rarity:'rare',
    fusedFrom:['bloodknight','paladin'],
    stats:{hp:125,maxHp:125,mp:55,maxMp:55,atk:13,def:13,spd:9,crit:8},
    statDisplay:{HP:8,ATK:9,DEF:9,SPD:5},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_light_dawn','normal_light_absorb','normal_blood_sacrifice','normal_blood_pact'],
    burstAbility:'paladin_burst',
    passives:['vital_hunger','sacred_aura'],
    description:'A holy warrior who has replaced purity with sacrifice — draws power from the blood of enemies and the blood freely given by the cause. Heals the righteous. Bleeds the unjust. Has a very particular definition of each.',
    lore:'The paladin believed in sacrifice. The bloodknight believed in taking what was needed. The Fallen Crusade found these were the same operation, distinguished only by whose blood was being discussed.'
  },

  blood_frost: {
    id:'blood_frost', name:'Iceblood', icon:'❄️',
    tagline:'Blood freezes at the right temperature. It does not stop being dangerous.',
    color:'#997788', element:'dark', elementFlavor:'bloodfrost', rarity:'rare',
    fusedFrom:['bloodknight','frostweaver'],
    stats:{hp:100,maxHp:100,mp:68,maxMp:68,atk:13,def:10,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_ice_prison','normal_ice_shatter','normal_blood_drain','normal_ice_shard'],
    burstAbility:'frostweaver_burst',
    passives:['vital_hunger','frost_mastery'],
    description:'Freezes blood mid-flow — inside the target. Blood crystallizes into razor shards that shred from within, then the Iceblood shatters the frozen wounds for devastating burst damage. Every freeze is also a stored detonation.',
    lore:'The frostweaver froze water. The bloodknight valued blood. The Iceblood combined these interests and discovered that blood, frozen mid-circulation, produces a wound type that neither physician nor dungeon guide had previously documented.'
  },

  blood_dragon: {
    id:'blood_dragon', name:'The Sanguine Drake', icon:'🐉',
    tagline:'Dragons bleed fire. This one bleeds and it feeds the fire.',
    color:'#c43c09', element:'dark', elementFlavor:'blooddrake', rarity:'rare',
    fusedFrom:['bloodknight','dragonknight'],
    stats:{hp:125,maxHp:125,mp:50,maxMp:50,atk:15,def:12,spd:10,crit:10},
    statDisplay:{HP:8,ATK:10,DEF:8,SPD:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_dragon_wrath','normal_dragon_roar','normal_blood_feast','normal_dragon_surge'],
    burstAbility:'dragonknight_burst',
    passives:['vital_hunger','intimidation'],
    description:'A dragon that grows stronger with every wound — draconic regeneration powered by blood magic means injuries become fuel. The Sanguine Drake does not fear damage. It anticipates it, because damage makes it faster and hits harder.',
    lore:'Dragons are powerful but can be bled. The bloodknight found that a dragon that converts its own blood into combat power is a dragon that solves the one problem dragons historically have. This was not considered a gap that needed closing.'
  },

  blood_tide: {
    id:'blood_tide', name:'The Bleeding Sea', icon:'🌊',
    tagline:'The tide comes in red. It does not ask why.',
    color:'#77556f', element:'dark', elementFlavor:'bloodtide', rarity:'rare',
    fusedFrom:['bloodknight','tidecaller'],
    stats:{hp:103,maxHp:103,mp:70,maxMp:70,atk:13,def:10,spd:11,crit:10},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_drain','normal_blood_tap','normal_blood_harvest','water_ghost_drown'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','tidal_flow'],
    description:'Commands blood the way a tidecaller commands water — tidal waves of crimson that drown and drain simultaneously. Controls the flow of blood inside enemies, accelerating wounds or reversing healing at will.',
    lore:'The tidecaller controlled water. Blood is mostly water. The bloodknight pointed this out. The tidecaller considered it for a long time and eventually concluded that this was technically correct and professionally useful.'
  },

  blood_gravitist: {
    id:'blood_gravitist', name:'Hemorrhage Well', icon:'⚫',
    tagline:'Blood falls toward the center. Everything does, eventually.',
    color:'#77333c', element:'dark', elementFlavor:'voidblood', rarity:'epic',
    fusedFrom:['bloodknight','gravitist'],
    stats:{hp:98,maxHp:98,mp:73,maxMp:73,atk:12,def:9,spd:11,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_gravity_crush','normal_gravity_pull','normal_blood_drain','normal_gravity_anchor'],
    burstAbility:'gravitist_burst',
    passives:['vital_hunger','gravity_well'],
    description:'Creates gravitational wells that pull blood from wounds across distance — wounded enemies hemorrhage faster, their blood drawn toward the Hemorrhage Well which absorbs it as life energy. The greater the wounds, the stronger the pull.',
    lore:'The gravitist pulled matter. Blood is matter. The bloodknight found this observation opened a professional opportunity. The Hemorrhage Well is the result, and enemies who are bleeding anywhere near it find the situation compounds quickly.'
  },

  blood_soundbreaker: {
    id:'blood_soundbreaker', name:'The Sanguine Scream', icon:'💥',
    tagline:'The sound that ruptures vessels. Specifically those ones.',
    color:'#c45e33', element:'dark', elementFlavor:'wailblood', rarity:'rare',
    fusedFrom:['bloodknight','soundbreaker'],
    stats:{hp:100,maxHp:100,mp:68,maxMp:68,atk:14,def:9,spd:13,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:8,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_mark','normal_blood_pact','normal_electric_conduit','normal_blood_tap'],
    burstAbility:'soundbreaker_burst',
    passives:['vital_hunger','resonance'],
    description:'Tuned to the resonant frequency of blood vessels — sonic attacks that rupture veins and arteries without breaking the skin. Hemorrhages from the inside. The Sanguine Scream does not need to cut anything. It just needs to be heard.',
    lore:'The soundbreaker found the resonant frequency of most materials. The bloodknight asked: what is the resonant frequency of blood? The answer, when discovered, was kept confidential for several professional reasons and then immediately weaponized.'
  },

  blood_chrono: {
    id:'blood_chrono', name:'The Expirant', icon:'⏳',
    tagline:'Every heartbeat is a countdown. It accelerates the count.',
    color:'#aa4d88', element:'dark', elementFlavor:'doomtime', rarity:'epic',
    fusedFrom:['bloodknight','chronomancer'],
    stats:{hp:95,maxHp:95,mp:80,maxMp:80,atk:12,def:9,spd:12,crit:11},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_time_age','normal_time_drain','normal_blood_feast','normal_time_echo'],
    burstAbility:'chronomancer_burst',
    passives:['vital_hunger','time_warp'],
    description:'Accelerates biological time in targets — ages wounds so they hemorrhage faster, accelerates blood loss from existing injuries, and slows down the target\'s own perception of time while their body deteriorates at an accelerated rate.',
    lore:'The chronomancer manipulated time. The bloodknight manipulated life force. The Expirant discovered that these are the same operation when applied to organic matter, and has been running both dials simultaneously ever since.'
  },

  blood_spellsword: {
    id:'blood_spellsword', name:'Crimson Arcanist', icon:'🗡️',
    tagline:'The blood is also a spell. Every spell costs blood. Good.',
    color:'#aa2b5e', element:'dark', elementFlavor:'doompsychic', rarity:'rare',
    fusedFrom:['bloodknight','spellsword'],
    stats:{hp:105,maxHp:105,mp:65,maxMp:65,atk:14,def:10,spd:11,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:7,SPD:7,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_sacrifice','normal_blood_pact','normal_blood_mark','fire_psychic_fever'],
    burstAbility:'spellsword_burst',
    passives:['vital_hunger','spellblade'],
    description:'Uses blood as spell reagent — every arcane technique is powered by the blood of enemies. Spells hit harder when the caster is wounded. The Crimson Arcanist uses damage as a resource, converting injury directly into magical output.',
    lore:'The spellsword wove spells and steel. The bloodknight used blood and will. The Crimson Arcanist found that blood is the original magical reagent and that using it in real time, from living sources, produces more potent effects than anything bottled.'
  },

  blood_plague: {
    id:'blood_plague', name:'The Virulent Tide', icon:'🩸',
    tagline:'The plague spreads through blood. The blood spreads everywhere.',
    color:'#995e22', element:'dark', elementFlavor:'deathcurse', rarity:'epic',
    fusedFrom:['bloodknight','plaguedoctor'],
    stats:{hp:98,maxHp:98,mp:75,maxMp:75,atk:12,def:9,spd:10,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:6,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_mark','normal_blood_tap','fire_poison_plague','normal_blood_feast'],
    burstAbility:'plague_doctor_burst',
    passives:['vital_hunger','immunity'],
    description:'Weaponizes blood as a plague vector — infected blood is harvested from enemies and used to infect subsequent targets. Every drain also transmits disease. Every wound is both a resource and a delivery mechanism.',
    lore:'The plaguedoctor needed reliable transmission vectors. The bloodknight provided direct access to the most reliable one. The Virulent Tide combines bloodletting with infection in a way that makes containment protocols very difficult to implement.'
  },

  blood_geo: {
    id:'blood_geo', name:'Red Earth', icon:'🪨',
    tagline:'The ground runs red. It has absorbed too many battles to be surprised.',
    color:'#aa4d33', element:'dark', elementFlavor:'tombstone', rarity:'uncommon',
    fusedFrom:['bloodknight','geomancer'],
    stats:{hp:110,maxHp:110,mp:60,maxMp:60,atk:13,def:12,spd:9,crit:9},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:5,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_drain','normal_blood_pact','fire_rock_strike','fire_ground_quake'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','earth_body'],
    description:'Draws blood into stone, using the earth itself as a repository for harvested life force. Blood-saturated ground becomes difficult terrain that drains enemies walking across it. The battlefield itself is a resource.',
    lore:'The geomancer shaped earth. The bloodknight shaped conflict. Red Earth found that enough conflict leaves its mark on the earth — and that mark can be made useful with the right techniques, and enough time, and enough battles.'
  },

  blood_lightbringer: {
    id:'blood_lightbringer', name:'The Martyrs\' Light', icon:'🕯️',
    tagline:'The light is brighter when it costs something.',
    color:'#d5772b', element:'dark', elementFlavor:'fallenlight', rarity:'rare',
    fusedFrom:['bloodknight','lightbringer'],
    stats:{hp:103,maxHp:103,mp:68,maxMp:68,atk:14,def:11,spd:12,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_light_dawn','normal_light_absorb','normal_blood_sacrifice','normal_light_blind'],
    burstAbility:'lightbringer_burst',
    passives:['vital_hunger','radiant'],
    description:'Amplifies divine light by sacrificial blood — wounds inflicted fuel holy radiance that blinds enemies and heals allies. The more it bleeds, the brighter it burns. A combat style where every injury becomes a source of power.',
    lore:'The lightbringer said: light requires no sacrifice. The bloodknight disagreed. The Martyrs\' Light proved the bloodknight\'s point empirically, and the resulting light was brighter than the lightbringer had previously achieved through other means.'
  },

  blood_beast: {
    id:'blood_beast', name:'The Hunger', icon:'🐺',
    tagline:'The pack does not stop when it has enough. There is no enough.',
    color:'#99662b', element:'dark', elementFlavor:'bloodrune', rarity:'uncommon',
    fusedFrom:['bloodknight','beastmaster'],
    stats:{hp:108,maxHp:108,mp:58,maxMp:58,atk:14,def:11,spd:12,crit:11},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_feast','normal_blood_harvest','fire_fighting_rage','fire_fighting_combo'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','feral_bond'],
    description:'Predator and bloodletter merged. Hunts with feral precision, wounds with brutal efficiency, and feeds on what falls. The Hunger does not distinguish between combat and eating. Both processes run simultaneously.',
    lore:'Beasts hunt because they are hungry. The bloodknight fought because it was hungry. They found this overlap was complete rather than partial, and that working together allowed them to be much more thorough about both.'
  },

  blood_tech: {
    id:'blood_tech', name:'Vital Algorithm', icon:'💉',
    tagline:'The body is a system. Systems can be optimized. Especially other ones.',
    color:'#774d5e', element:'dark', elementFlavor:'techdark', rarity:'epic',
    fusedFrom:['bloodknight','techsavant'],
    stats:{hp:100,maxHp:100,mp:73,maxMp:73,atk:13,def:9,spd:12,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','fire_cyber_data_leech','fire_cyber_system_melt','normal_blood_drain','fire_cyber_overclock'],
    burstAbility:'techsavant_burst',
    passives:['vital_hunger','overclock'],
    description:'Hacks biological systems directly — rewrites pain responses, overrides regeneration, forces blood to flow where it should not. The Vital Algorithm treats the enemy\'s body as software and edits it mid-combat with precision the target cannot counteract.',
    lore:'The techsavant hacked systems. The bloodknight understood bodies. The Vital Algorithm found that biological systems are subject to the same exploits as digital ones, and that the patch cycle for flesh is considerably slower than for software.'
  },

  blood_grave: {
    id:'blood_grave', name:'The Sanguine Warden', icon:'🪦',
    tagline:'The grave is not empty. It is full of what was taken.',
    color:'#803c4d', element:'dark', elementFlavor:'deathblood', rarity:'rare',
    fusedFrom:['bloodknight','gravewarden'],
    stats:{hp:118,maxHp:118,mp:58,maxMp:58,atk:13,def:13,spd:9,crit:9},
    statDisplay:{HP:8,ATK:9,DEF:9,SPD:5,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_harvest','normal_blood_offering','water_ghost_haunt','water_ghost_drown'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','undying'],
    description:'Guards graves filled with drained targets and refuses to join them. Converts near-death experiences into power surges — the closer it comes to dying, the more aggressively it harvests the blood of anything nearby.',
    lore:'The gravewarden kept the dead in the ground. The bloodknight kept the ground red. The Sanguine Warden combines these specialties and has reached an arrangement with death: it keeps filling graves, and death keeps waiting.'
  },

  blood_magnetist: {
    id:'blood_magnetist', name:'Ferrous Sanguine', icon:'🧲',
    tagline:'Blood is iron. Iron is magnetic. The equation is straightforward.',
    color:'#80555e', element:'dark', elementFlavor:'magnetdark', rarity:'rare',
    fusedFrom:['bloodknight','magnetist'],
    stats:{hp:103,maxHp:103,mp:68,maxMp:68,atk:14,def:11,spd:11,crit:11},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_drain','fire_magnet_pull','fire_magnet_flux','normal_blood_mark'],
    burstAbility:'magnetist_burst',
    passives:['vital_hunger','magnetic_field'],
    description:'Blood contains iron. Ferrous Sanguine uses magnetic force to control that iron — pulling blood from wounds across distances, accelerating hemorrhage magnetically, and drawing the iron content from enemy blood directly into itself as fuel.',
    lore:'The magnetist worked with iron. The bloodknight pointed out where most of the iron in a dungeon currently is. The Ferrous Sanguine has been following this observation to its logical conclusion ever since, with considerable professional success.'
  },

  blood_crystal: {
    id:'blood_crystal', name:'The Crystallized Heart', icon:'💎',
    tagline:'Blood crystallizes at the extremes. Both extremes. Neither is comfortable.',
    color:'#996688', element:'dark', elementFlavor:'crystaldark', rarity:'epic',
    fusedFrom:['bloodknight','crystalmancer'],
    stats:{hp:95,maxHp:95,mp:75,maxMp:75,atk:14,def:9,spd:12,crit:14},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_sacrifice','normal_blood_pact','fire_crystal_shard','fire_crystal_refract'],
    burstAbility:'crystalmancer_burst',
    passives:['vital_hunger','crystal_body'],
    description:'Crystallizes harvested blood into razor-edged shards that refract light into multiple cutting beams. Blood crystal shatters on impact into smaller shards. Each kill generates material for the next attack. Self-sustaining and geometrically escalating.',
    lore:'The crystalmancer worked with crystal structures. The bloodknight provided an alternate material with similar lattice properties under extreme stress. The Crystallized Heart grows stronger with every drop harvested, which incentivizes a particular combat style.'
  },

  blood_war: {
    id:'blood_war', name:'The Crimson Warlord', icon:'⚔️',
    tagline:'The warlord who fights with every wound is not warlord for long, or forever.',
    color:'#bb2b09', element:'dark', elementFlavor:'warblood', rarity:'rare',
    fusedFrom:['bloodknight','warlord'],
    stats:{hp:120,maxHp:120,mp:53,maxMp:53,atk:15,def:12,spd:11,crit:10},
    statDisplay:{HP:8,ATK:10,DEF:8,SPD:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_feast','fire_fighting_rage','normal_blood_mark','fire_fighting_ignite'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','battle_hardened'],
    description:'Commands with absolute authority from the front line, converting every wound into rage and every kill into momentum. The Crimson Warlord does not retreat — it accelerates. Every hit it takes makes the next hit it lands more catastrophic.',
    lore:'The warlord commanded from behind the line. The bloodknight charged into it. The Crimson Warlord found that commanding is more persuasive when done from inside the worst of the fighting, covered in a substantial portion of it.'
  },

  blood_spirit: {
    id:'blood_spirit', name:'The Life Offering', icon:'🌿',
    tagline:'The spirit accepts the blood. The blood accepts the spirit. Neither was lost.',
    color:'#775e4d', element:'dark', elementFlavor:'spiritdark', rarity:'epic',
    fusedFrom:['bloodknight','spiritwalker'],
    stats:{hp:105,maxHp:105,mp:68,maxMp:68,atk:13,def:11,spd:12,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_sacrifice','normal_blood_pact','fire_spirit_sanctuary','water_ghost_phase'],
    burstAbility:'spiritwalker_burst',
    passives:['vital_hunger','spirit_bond'],
    description:'Channels life force through spiritual pathways — blood becomes spiritual currency, traded between the living and the dead for mutual benefit. Heals through spiritual sacrifice. Damages through spiritual extraction.',
    lore:'The spiritwalker communed with spirits through ritual. The bloodknight offered blood as payment. The Life Offering found that spirits have always accepted this currency — the spiritwalker simply had not been offering it in the right denominations.'
  },

  blood_hex: {
    id:'blood_hex', name:'The Bloodcurse', icon:'🔮',
    tagline:'The hex is in the blood now. The only way to remove it is to remove the blood.',
    color:'#991a4d', element:'dark', rarity:'epic',
    fusedFrom:['bloodknight','hexblade'],
    stats:{hp:100,maxHp:100,mp:70,maxMp:70,atk:14,def:9,spd:12,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:7,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_dark_corrupt','normal_void_curse','normal_blood_mark','normal_dark_consume'],
    burstAbility:'hexblade_burst',
    passives:['vital_hunger','hex_master'],
    description:'Injects hexes directly into the bloodstream — curses that spread with the blood, strengthening as they circulate. Cannot be dispelled without first stopping the blood, which creates its own set of problems.',
    lore:'Hexes traditionally require line of sight or physical contact. The Bloodcurse requires neither, once it has had any contact at all. It circulates with the target\'s biology and only strengthens with time.'
  },

  blood_cosmo: {
    id:'blood_cosmo', name:'The Cosmic Offering', icon:'🌌',
    tagline:'The universe is built from stardust and sacrifice. Both are available.',
    color:'#77225e', element:'dark', elementFlavor:'cosmicdark', rarity:'legendary',
    fusedFrom:['bloodknight','cosmomancer'],
    stats:{hp:95,maxHp:95,mp:83,maxMp:83,atk:13,def:8,spd:11,crit:12},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_space_consume','normal_blood_offering','normal_space_drift','normal_blood_sacrifice'],
    burstAbility:'cosmomancer_burst',
    passives:['vital_hunger','stardust'],
    description:'Offers harvested blood as fuel to cosmic forces — stellar energies accept the sacrifice and return devastating power. The universe, it turns out, has an economy, and blood is a convertible currency at the exchange rate the Cosmic Offering has negotiated.',
    lore:'The cosmomancer said: the stars do not care about individual lives. The bloodknight said: what if we offered them something that was not individual? The cosmic forces, it turned out, found this question interesting.'
  },

  blood_pestilence: {
    id:'blood_pestilence', name:'The Bleeding Plague', icon:'☣️',
    tagline:'The plague makes wounds. The wounds make more plague. The math is simple.',
    color:'#804d09', element:'dark', elementFlavor:'deathcurse', rarity:'epic',
    fusedFrom:['bloodknight','pestilencelord'],
    stats:{hp:100,maxHp:100,mp:75,maxMp:75,atk:13,def:9,spd:10,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:6,MP:7},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','fire_poison_plague','normal_blood_mark','normal_blood_tap','fire_bug_plague'],
    burstAbility:'pestilence_lord_burst',
    passives:['vital_hunger','plague_lord'],
    description:'Disease carried in blood — every wound transmits plague, every bit of blood drawn spreads contagion. The Bleeding Plague uses wounds as transmission events rather than incidental damage. More wounds means faster spread.',
    lore:'The pestilencelord developed blood-borne pathogens. The bloodknight created blood-borne wounds. The Bleeding Plague combined these with enthusiasm and has produced a cascade that healthcare professionals in the dungeon describe as a significant ongoing concern.'
  },

  blood_wind: {
    id:'blood_wind', name:'The Red Gale', icon:'💨',
    tagline:'The wind carries what it passes through. It has passed through a lot.',
    color:'#996f5e', element:'dark', elementFlavor:'deathwind', rarity:'rare',
    fusedFrom:['bloodknight','windwalker'],
    stats:{hp:100,maxHp:100,mp:60,maxMp:60,atk:14,def:9,spd:15,crit:13},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:9,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_drain','fire_wind_cyclone','fire_flying_dive','normal_blood_tap'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','gust'],
    description:'Moves at wind speed, harvests blood as it passes through enemies without stopping. The Red Gale does not duel — it runs through opponents like a cyclone, taking a little from each, and comes back around for more.',
    lore:'The windwalker moved through enemies without engaging. The bloodknight engaged with everything. The Red Gale does both simultaneously, which produces a combat style that is very hard to respond to because it has already moved past the response.'
  },

  blood_doom: {
    id:'blood_doom', name:'The Inevitable Bleed', icon:'💀',
    tagline:'Every wound is fatal. Some just take longer to realize it.',
    color:'#882222', element:'dark', rarity:'legendary',
    fusedFrom:['bloodknight','doomcaster'],
    stats:{hp:95,maxHp:95,mp:80,maxMp:80,atk:13,def:8,spd:11,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_dark_eclipse','normal_void_drain','normal_blood_feast','normal_dark_consume'],
    burstAbility:'doomcaster_burst',
    passives:['vital_hunger','doom_aura'],
    description:'Applies doom through bloodletting — every wound is also a doom mark. The doom does not kill immediately; it waits until the accumulated blood loss reaches a threshold, then triggers all marks simultaneously.',
    lore:'The doomcaster doomed its targets. The bloodknight bled them. The Inevitable Bleed found these operations describe the same outcome from different angles. Most targets agree, in retrospect, that both descriptions were accurate.'
  },

  blood_arcanist: {
    id:'blood_arcanist', name:'The Sanguine Formula', icon:'📚',
    tagline:'Blood is just chemistry. All chemistry has a formula.',
    color:'#80226f', element:'dark', elementFlavor:'doompsychic', rarity:'epic',
    fusedFrom:['bloodknight','arcanist'],
    stats:{hp:93,maxHp:93,mp:85,maxMp:85,atk:12,def:8,spd:12,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_sacrifice','normal_blood_pact','fire_psychic_fever','fire_psychic_focus'],
    burstAbility:'void_burst',
    passives:['vital_hunger','arcane_mastery'],
    description:'Applies arcane formulae to biology — blood as magical reagent, body chemistry as spell components, the circulatory system as a casting medium. Every arcane technique draws power from the biological systems of whoever is nearest.',
    lore:'The arcanist studied formulae. The bloodknight studied the body. The Sanguine Formula combined these curricula and discovered that the oldest magic textbooks describe blood as the original power source. The knowledge was there. It just needed applying.'
  },

  blood_sentinel: {
    id:'blood_sentinel', name:'The Crimson Bastion', icon:'🛡️',
    tagline:'It holds the line. The line is red.',
    color:'#994d4d', element:'dark', elementFlavor:'bloodsteel', rarity:'uncommon',
    fusedFrom:['bloodknight','sentinel'],
    stats:{hp:140,maxHp:140,mp:45,maxMp:45,atk:12,def:15,spd:8,crit:7},
    statDisplay:{HP:9,ATK:8,DEF:10,SPD:5},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','normal_blood_drain','normal_blood_mark','normal_blood_pact','water_ghost_haunt'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger','bastion'],
    description:'An immovable wall that drains the life of anything that approaches. The longer it holds position, the more blood it absorbs from nearby enemies. It does not need to attack to win — it simply needs to outlast.',
    lore:'The sentinel stood its ground. The bloodknight took ground. The Crimson Bastion holds ground while extracting a toll from anyone who contests it. The toll is biological and non-negotiable.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_5);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_5);
  FUSION_LOADED_FILES.add(5);
  if(typeof console!=='undefined') console.debug('[Fusion] File 5 loaded (37 classes)');
})();
