// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 15 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_15 = {
  'gravewarden+hexblade': 'grave_hex',
  'cosmomancer+gravewarden': 'grave_cosmo',
  'gravewarden+pestilencelord': 'grave_pestilence',
  'gravewarden+windwalker': 'grave_wind',
  'doomcaster+gravewarden': 'grave_doom',
  'arcanist+gravewarden': 'grave_arcanist',
  'gravewarden+sentinel': 'grave_sentinel',
  'gravewarden+phantom': 'grave_phantom',
  'crystalmancer+magnetist': 'magnetist_crystal',
  'magnetist+warlord': 'magnetist_war',
  'magnetist+spiritwalker': 'magnetist_spirit',
  'hexblade+magnetist': 'magnetist_hex',
  'cosmomancer+magnetist': 'magnetist_cosmo',
  'magnetist+pestilencelord': 'magnetist_pestilence',
  'magnetist+windwalker': 'magnetist_wind',
  'doomcaster+magnetist': 'magnetist_doom',
  'arcanist+magnetist': 'magnetist_arcanist',
  'magnetist+sentinel': 'magnetist_sentinel',
  'magnetist+phantom': 'magnetist_phantom',
  'crystalmancer+warlord': 'crystal_war',
  'crystalmancer+spiritwalker': 'crystal_spirit',
  'crystalmancer+hexblade': 'crystal_hex',
  'cosmomancer+crystalmancer': 'crystal_cosmo',
  'crystalmancer+pestilencelord': 'crystal_pestilence',
  'crystalmancer+windwalker': 'crystal_wind',
  'crystalmancer+doomcaster': 'crystal_doom',
  'arcanist+crystalmancer': 'crystal_arcanist',
  'crystalmancer+sentinel': 'crystal_sentinel',
  'crystalmancer+phantom': 'crystal_phantom',
  'spiritwalker+warlord': 'war_spirit',
  'hexblade+warlord': 'war_hex',
  'cosmomancer+warlord': 'war_cosmo',
  'pestilencelord+warlord': 'war_pestilence',
  'warlord+windwalker': 'war_wind',
  'doomcaster+warlord': 'war_doom',
  'arcanist+warlord': 'war_arcanist',
  'sentinel+warlord': 'war_sentinel'
};

const FUSION_CLASSES_15 = {
  grave_hex: {
    id:'grave_hex', name:'The Hexed Grave', icon:'💀',
    tagline:'The curse was buried here. It has been growing.',
    color:'#776688', element:'hexgrave', rarity:'epic',
    fusedFrom:['gravewarden','hexblade'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:11,def:10,spd:11,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:7,SPD:6,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','dark_blood_dot_strike','dark_blood_weaken','normal_void_hollow','normal_rune_burden'],
    burstAbility:'hexblade_burst',
    passives:['undying','hex_master'],
    description:'Hexes maintained in grave sites — curses interred with the dead that have been aging and intensifying in burial conditions. The Hexed Grave opens graves to release the compounded hexes, deploying curses that have been accumulating since the original occupant was buried.',
    lore:'The hexblade placed fresh curses. The gravewarden suggested burying them. The Hexed Grave found that a hex in burial conditions compounds over time without the environmental interference that affects surface hexes, and that opening a grave releases a curse that has been intensifying in conditions optimized for it, which is considerably more powerful than one freshly placed.'
  },

  grave_cosmo: {
    id:'grave_cosmo', name:'The Cosmic Grave', icon:'💀',
    tagline:'The universe buries its dead in nebulae. This works at smaller scale.',
    color:'#5566aa', element:'gravecosmo', rarity:'legendary',
    fusedFrom:['gravewarden','cosmomancer'],
    stats:{hp:88,maxHp:88,mp:90,maxMp:90,atk:11,def:10,spd:11,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:7,SPD:6,MP:9},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','light_cosmic_blast','dark_cosmic_weaken','steel_cosmic_final','normal_space_void'],
    burstAbility:'cosmomancer_burst',
    passives:['undying','stardust'],
    description:'Graves with cosmic dimensions — burial sites that extend into astronomical space, the dead interred in the fabric of the cosmos itself. The Cosmic Grave raises allies who have been resting in nebulae, amplified by the time and stellar energy absorbed during their vast interment.',
    lore:'The cosmomancer knew where matter went after stellar death: nebulae, the graves of stars. The gravewarden found this professionally relevant. The Cosmic Grave extended the concept from stars to people: burying in cosmic substrate rather than earth produces a form of interment that draws on astronomical energy, and what returns from such a grave is proportionally larger than what entered it.'
  },

  grave_pestilence: {
    id:'grave_pestilence', name:'The Plague Pit', icon:'💀',
    tagline:'The mass grave is also a bioreactor. This is not intentional. It is efficient.',
    color:'#668855', element:'graveplague', rarity:'epic',
    fusedFrom:['gravewarden','pestilencelord'],
    stats:{hp:92,maxHp:92,mp:82,maxMp:82,atk:11,def:11,spd:9,crit:12},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:5,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','fire_bug_plague','fire_poison_plague','water_dark_drown','poison_dark_drain'],
    burstAbility:'gravewarden_burst',
    passives:['undying','plague_lord'],
    description:'A grave that generates disease — the biological processes of decomposition weaponized, plague cultivated in the ideal medium of mass burial. The Plague Pit is simultaneously a cemetery and a pathogen laboratory, and the bodies in it are working materials.',
    lore:'Decomposition produces biological activity. The pestilencelord studied which kind. The Plague Pit found that mass burial sites generate specific pathogen profiles based on the population interred, and that a gravewarden who selects burial populations carefully can cultivate very specific diseases in the resulting grave with no laboratory equipment required.'
  },

  grave_wind: {
    id:'grave_wind', name:'The Haunted Gale', icon:'💀',
    tagline:'The wind that moves through the graveyard carries what the graveyard holds.',
    color:'#889977', element:'gravewind', rarity:'rare',
    fusedFrom:['gravewarden','windwalker'],
    stats:{hp:88,maxHp:88,mp:75,maxMp:75,atk:12,def:9,spd:14,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:7},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','fire_wind_cyclone','fire_flying_updraft','water_ghost_haunt','wind_void_drain'],
    burstAbility:'gravewarden_burst',
    passives:['undying','gust'],
    description:'Wind channeled through grave sites — a gale that carries spectral residue from burials, spreading haunting effects at wind velocity. The Haunted Gale moves at 14 SPD and leaves every location it passes through temporarily inhabited by the dead.',
    lore:'Wind through a graveyard picks up what is there. The windwalker noticed this. The Haunted Gale accelerated the process: the wind deliberately carries spectral content from burial sites and deposits it across the battlefield at wind speed, which the gravewarden approves of as a method of expanding the grave\'s sphere of influence without digging more graves.'
  },

  grave_doom: {
    id:'grave_doom', name:'The Sealed Burial', icon:'💀',
    tagline:'The grave that cannot be escaped. The doom ensures this.',
    color:'#665566', element:'graved doom', rarity:'legendary',
    fusedFrom:['gravewarden','doomcaster'],
    stats:{hp:90,maxHp:90,mp:88,maxMp:88,atk:11,def:11,spd:10,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:6,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','time_void_blast','normal_void_unmake','dark_blood_final','steel_void_surge'],
    burstAbility:'doomcaster_burst',
    passives:['undying','doom_aura'],
    description:'A burial that is also a doom seal — enemies sent to the grave cannot return because their doom is sealed inside. The Sealed Burial is the one form of interment that the undying principle does not apply to: what the doom seals inside does not come back out.',
    lore:'The gravewarden maintained graves. The doomcaster sealed fates. The Sealed Burial found that combining these practices produces a burial site with enhanced retention: the doom seals the interment, ensuring that standard resurrection techniques and undying passive effects do not apply within the grave\'s boundary. The gravewarden considers this a quality control improvement.'
  },

  grave_arcanist: {
    id:'grave_arcanist', name:'The Inscribed Tomb', icon:'💀',
    tagline:'The formula on the tomb is not decorative.',
    color:'#778899', element:'gravearcane', rarity:'legendary',
    fusedFrom:['gravewarden','arcanist'],
    stats:{hp:85,maxHp:85,mp:98,maxMp:98,atk:10,def:10,spd:11,crit:14},
    statDisplay:{HP:6,ATK:7,DEF:7,SPD:6,MP:9},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','light_rune_blast','light_rune_drain','psychic_dark_strike','steel_cosmic_blast'],
    burstAbility:'arcanist_burst',
    passives:['undying','arcane_mastery'],
    description:'Arcane formulae inscribed on tomb walls — every burial in the Inscribed Tomb is also an arcane construct, the formulae of the arcanist tradition used to preserve and empower the dead. What rises from an arcane tomb is not merely undead but arcane undead: the formulae activated at resurrection.',
    lore:'Ancient tradition inscribed protective formulae on tombs. The arcanist understood what those formulae actually did. The Inscribed Tomb writes functional arcane code rather than decorative scripture and found that formulae inscribed in burial conditions, around the accumulated arcane residue of the dead, become considerably more powerful than the same formulae written anywhere else.'
  },

  grave_sentinel: {
    id:'grave_sentinel', name:'The Graveyard Watch', icon:'💀',
    tagline:'The sentinel who guards the dead does not tire. Neither do the dead.',
    color:'#889988', element:'gravewall', rarity:'uncommon',
    fusedFrom:['gravewarden','sentinel'],
    stats:{hp:128,maxHp:128,mp:60,maxMp:60,atk:9,def:15,spd:7,crit:8},
    statDisplay:{HP:9,ATK:6,DEF:10,SPD:4},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','normal_rune_ward','fire_steel_quench','water_dark_depths','normal_gravity_burden'],
    burstAbility:'gravewarden_burst',
    passives:['undying','bastion'],
    description:'A fortified graveyard — the sentinel\'s immovability applied to burial grounds, protecting both the dead inside and the living outside from what crosses the boundary. The Graveyard Watch holds 128 HP behind 15 DEF and considers both directions of the wall equally important.',
    lore:'The sentinel held a position. Graveyards have positions to hold. The Graveyard Watch combined these and found that a sentinel guarding a graveyard has two responsibilities simultaneously: keeping enemies out and keeping the dead in, and that both are served by the same immovable presence at the perimeter. The dead, for their part, seem to appreciate the consistency.'
  },

  grave_phantom: {
    id:'grave_phantom', name:'The Restless Dead', icon:'💀',
    tagline:'The grave\'s ghost refuses the grave. The gravewarden finds this professionally vexing.',
    color:'#8899aa', element:'graveghost', rarity:'mythical',
    fusedFrom:['gravewarden','phantom'],
    stats:{hp:80,maxHp:80,mp:83,maxMp:83,atk:12,def:7,spd:15,crit:20},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','water_ghost_phase','water_ghost_possess','ice_ghost_haunt','electric_ghost_drain'],
    burstAbility:'phantom_burst',
    passives:['undying','phase'],
    description:'A spectral entity that refuses containment — phases out of graves as easily as it phases through walls, cannot be interred despite the gravewarden\'s best efforts. The Restless Dead has found that being ungraveable and undying in the same body produces a combat advantage no containment method addresses.',
    lore:'The gravewarden maintained graves. The Restless Dead would not stay in one. After some professional reflection, the gravewarden decided to work with rather than against this quality: a ghost that refuses to stay buried and cannot be killed is a very efficient ally, even if filing the paperwork is irregular.'
  },

  magnetist_crystal: {
    id:'magnetist_crystal', name:'The Crystalline Field', icon:'🧲',
    tagline:'Crystal conducts the field. The field shapes the crystal. Both grow.',
    color:'#88aadd', element:'magnetcrystal', rarity:'legendary',
    fusedFrom:['magnetist','crystalmancer'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:12,def:7,spd:13,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','fire_crystal_refract','crystal_void_surge','steel_void_blast','gravity_magnet_blast'],
    burstAbility:'magnetist_burst',
    passives:['magnetic_field','crystal_body'],
    description:'Crystal structures grown along magnetic field lines — minerals that conduct and amplify the magnetic field as they form. The Crystalline Field creates a growing lattice of magnetically active crystal that both reinforces the field and provides a physical attack medium.',
    lore:'Crystals grow along energetic gradients. Magnetic fields are energetic gradients. The Crystalline Field let the crystalmancer grow crystal along the magnetist\'s field lines and found that crystal formed in this way is strongly magnetized from its molecular structure upward, which creates a self-reinforcing field amplifier that grows as long as the crystal grows.'
  },

  magnetist_war: {
    id:'magnetist_war', name:'The Iron Legion', icon:'🧲',
    tagline:'The warlord who controls the battlefield\'s iron controls the battlefield.',
    color:'#886655', element:'magnetwar', rarity:'rare',
    fusedFrom:['magnetist','warlord'],
    stats:{hp:98,maxHp:98,mp:72,maxMp:72,atk:13,def:11,spd:11,crit:12},
    statDisplay:{HP:6,ATK:9,DEF:8,SPD:6,MP:7},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','fire_fighting_rage','normal_blood_mark','fire_magnet_flux','electric_steel_magnetize'],
    burstAbility:'magnetist_burst',
    passives:['magnetic_field','battle_hardened'],
    description:'Magnetic tactical control — disarms enemies by pulling metal weapons toward the Iron Legion, creates magnetic barriers that redirect attacks, and applies warlord tactical doctrine in an environment where all ferrous equipment is under the Iron Legion\'s authority.',
    lore:'The warlord controlled soldiers. The magnetist controlled metal. The Iron Legion found that controlling the metal a soldier carries is equivalent to controlling the soldier to a significant degree: pull the sword from the grip, seal the armor against movement, redirect the projectile. The warlord provides the tactical framework; the magnetist provides the environmental control.'
  },

  magnetist_spirit: {
    id:'magnetist_spirit', name:'The Spirit Compass', icon:'🧲',
    tagline:'Spirits navigate by magnetic fields. This one navigates spirits.',
    color:'#7799aa', element:'magnetspirit', rarity:'epic',
    fusedFrom:['magnetist','spiritwalker'],
    stats:{hp:82,maxHp:82,mp:88,maxMp:88,atk:11,def:9,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','electric_spirit_surge','electric_spirit_haunt','gravity_magnet_stance','electric_ghost_chain'],
    burstAbility:'spiritwalker_burst',
    passives:['magnetic_field','spirit_bond'],
    description:'Spirits guided by magnetic fields — commands spectral entities through magnetic channel, directs spirits through field lines rather than vocal commands. The Spirit Compass operates a spirit network with magnetic precision, positioning allies to the coordinate defined by the field.',
    lore:'The spiritwalker communicated with spirits through ritual and intent. The magnetist found that spirits respond to magnetic fields. The Spirit Compass combined these and found that communicating through magnetic fields is faster and more precise than the ritual approach, and that spirits generally prefer the clarity of a field vector to the ambiguity of intent.'
  },

  magnetist_hex: {
    id:'magnetist_hex', name:'The Magnetic Curse', icon:'🧲',
    tagline:'The curse pulls at the same frequency as the field. Neither lets go.',
    color:'#887799', element:'magnethex', rarity:'epic',
    fusedFrom:['magnetist','hexblade'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:12,def:8,spd:12,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','dark_blood_weaken','dark_blood_stance','steel_void_weaken','normal_void_hollow'],
    burstAbility:'hexblade_burst',
    passives:['magnetic_field','hex_master'],
    description:'Hexes delivered through magnetic field — curses that propagate along field lines, attaching to anything the magnetic field reaches. The Magnetic Curse cannot be removed by leaving the area because the field follows, and the curse is in the field.',
    lore:'The hexblade placed curses at contact range. The magnetist extended range to the field boundary. The Magnetic Curse attached hexes to magnetic particles and found that a curse traveling on a magnetic field cannot be outrun because the target\'s own iron-containing blood acts as a secondary field source, which makes removal of the curse require removing the blood first.'
  },

  magnetist_cosmo: {
    id:'magnetist_cosmo', name:'The Magnetar', icon:'🧲',
    tagline:'The most magnetic objects in the universe are also among the most dangerous.',
    color:'#4455aa', element:'cosmomagnet', rarity:'legendary',
    fusedFrom:['magnetist','cosmomancer'],
    stats:{hp:75,maxHp:75,mp:103,maxMp:103,atk:11,def:6,spd:12,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','steel_cosmic_blast','dark_cosmic_weaken','light_cosmic_surge','normal_space_warp'],
    burstAbility:'cosmomancer_burst',
    passives:['magnetic_field','stardust'],
    description:'A magnetar in miniature — the magnetic field strength of a neutron star compressed to dungeon scale. The Magnetar\'s field is strong enough to affect non-ferrous materials, disrupt biological neural processes, and pull metal objects from significant distances at speeds that preclude reaction.',
    lore:'Magnetars are the most magnetically powerful objects known. The magnetist studied them. The cosmomancer provided access. The Magnetar operates a scaled-down version of a magnetar\'s field and found that even at dungeon scale, a magnetar-class magnetic field produces effects that the conventional magnetist\'s techniques do not, because the field strength exceeds the threshold where non-magnetic materials also respond.'
  },

  magnetist_pestilence: {
    id:'magnetist_pestilence', name:'The Magnetic Plague', icon:'🧲',
    tagline:'The field carries the plague. The plague carries iron. The iron carries the field.',
    color:'#558866', element:'magnetplague', rarity:'epic',
    fusedFrom:['magnetist','pestilencelord'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:12,def:8,spd:11,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:6,MP:8},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','fire_poison_plague','fire_bug_plague','gravity_magnet_dot_strike','poison_wind_blast'],
    burstAbility:'pestilencelord_burst',
    passives:['magnetic_field','plague_lord'],
    description:'Pathogens engineered to carry magnetic particles — disease that travels on magnetic fields, guided to targets by field lines. The Magnetic Plague infects at range and follows fleeing targets through the field it generates, making retreat in a magnetically active environment actively dangerous.',
    lore:'The pestilencelord needed long-range delivery. Magnetic fields are long-range forces. The Magnetic Plague engineered organisms with iron-particle payloads and found that a magnetically active pathogen travels where the field directs it, which converts the magnetist\'s field control into a precision-guided biological delivery system.'
  },

  magnetist_wind: {
    id:'magnetist_wind', name:'The Electromagnetic Storm', icon:'🧲',
    tagline:'Electromagnetic fields and wind fields are both fields. At high enough energy, they merge.',
    color:'#7799bb', element:'magnetwind', rarity:'rare',
    fusedFrom:['magnetist','windwalker'],
    stats:{hp:80,maxHp:80,mp:80,maxMp:80,atk:12,def:7,spd:15,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','fire_wind_cyclone','fire_flying_updraft','steel_wind_strike','wind_void_surge'],
    burstAbility:'magnetist_burst',
    passives:['magnetic_field','gust'],
    description:'An electromagnetic cyclone — wind that carries magnetic charge, a storm where the weather and the field are the same phenomenon. The Electromagnetic Storm moves at 15 SPD and pulls metal objects into the cyclone, which both accelerates and directs them.',
    lore:'The windwalker moved air. The magnetist moved fields. The Electromagnetic Storm found that a cyclone with an embedded magnetic field pulls metal objects into the wind column and then accelerates them on the field lines, producing a storm that is simultaneously a natural event and a railgun, which the windwalker considers an interesting development in storm design.'
  },

  magnetist_doom: {
    id:'magnetist_doom', name:'The Gravitational Doom Pole', icon:'🧲',
    tagline:'The field pulls everything toward the doom.',
    color:'#664477', element:'magnetdoom', rarity:'legendary',
    fusedFrom:['magnetist','doomcaster'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:11,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:9},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','time_void_blast','steel_void_blast','dark_blood_final','wind_void_final'],
    burstAbility:'doomcaster_burst',
    passives:['magnetic_field','doom_aura'],
    description:'Doom anchored at the magnetic pole — the field lines point toward the doom, pulling metal-bearing targets inexorably toward the sealed fate at the center. The Gravitational Doom Pole converts the magnetist\'s pulling force into a doom delivery mechanism with unusual directional authority.',
    lore:'The doomcaster placed doom as a targeted effect. The magnetist suggested making the field point toward it. The Gravitational Doom Pole found that a doom at the magnetic pole of the field creates a situation where every metal-bearing enemy is being pulled toward their sealed fate by a force they cannot feel as distinct from the magnetic pull, making the doom and the field experientially identical until the doom activates.'
  },

  magnetist_arcanist: {
    id:'magnetist_arcanist', name:'The Arcane Lodestone', icon:'🧲',
    tagline:'The formula that controls the field is more powerful than the field alone.',
    color:'#5566bb', element:'magnetarcane', rarity:'legendary',
    fusedFrom:['arcanist','magnetist'],
    stats:{hp:72,maxHp:72,mp:108,maxMp:108,atk:11,def:5,spd:13,crit:16},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','psychic_cosmic_blast','light_rune_blast','steel_cosmic_final','electric_psychic_vortex'],
    burstAbility:'arcanist_burst',
    passives:['magnetic_field','arcane_mastery'],
    description:'Magnetic fields governed by arcane formulae — precise field configurations derived mathematically, theoretical magnetic constructs that the empirical magnetist cannot produce through field manipulation alone. The Arcane Lodestone operates magnetism as applied mathematics.',
    lore:'The magnetist manipulated fields by instinct and practice. The arcanist derived the equations governing them. The Arcane Lodestone found that applying mathematical precision to field configuration produces shapes and behaviors that empirical manipulation cannot achieve — not because of power differences, but because some configurations are only findable by solving the equation, not by experimentation.'
  },

  magnetist_sentinel: {
    id:'magnetist_sentinel', name:'The Magnetic Wall', icon:'🧲',
    tagline:'The wall that deflects metal attacks does not need to be thick.',
    color:'#778899', element:'magnetwall', rarity:'rare',
    fusedFrom:['magnetist','sentinel'],
    stats:{hp:120,maxHp:120,mp:63,maxMp:63,atk:9,def:14,spd:9,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:6},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','normal_rune_ward','steel_light_surge','fire_magnet_pull','fire_steel_quench'],
    burstAbility:'magnetist_burst',
    passives:['magnetic_field','bastion'],
    description:'A fortified magnetic field — the sentinel\'s immovability combined with a magnetic field that redirects metal projectiles and pulls weapons from incoming attackers. The Magnetic Wall deflects before contact, holding the position with a perimeter wider than the physical body.',
    lore:'The sentinel held position behind a physical body. The magnetist held position behind a field. The Magnetic Wall combines these: the sentinel provides the anchor point and the field provides a defensive perimeter that extends beyond physical contact range, redirecting threats before they reach the body that is holding the position.'
  },

  magnetist_phantom: {
    id:'magnetist_phantom', name:'The Magnetic Ghost', icon:'🧲',
    tagline:'The ghost in the machine is also the machine.',
    color:'#6677aa', element:'magnetghost', rarity:'mythical',
    fusedFrom:['magnetist','phantom'],
    stats:{hp:73,maxHp:73,mp:88,maxMp:88,atk:12,def:5,spd:15,crit:21},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:8},
    abilities:['magnetic_pull','field_surge','pole_shift','iron_cage','water_ghost_phase','ice_ghost_phantasm','steel_void_surge','gravity_magnet_blast'],
    burstAbility:'phantom_burst',
    passives:['magnetic_field','phase'],
    description:'A spectral entity with magnetic authority — phases through physical matter while maintaining and projecting a magnetic field through what it passes through. The Magnetic Ghost is intangible to physical attack while its field is entirely tangible to every metal object in range.',
    lore:'Phantoms phase through matter. Magnetic fields pass through matter. The Magnetic Ghost found these properties are compatible in the same entity: the ghost is immaterial but the field it generates is not, which means physical immunity does not protect against a field that reaches through walls — and the ghost is usually inside the wall when it applies the field.'
  },

  crystal_war: {
    id:'crystal_war', name:'The Crystal Legion', icon:'💎',
    tagline:'The soldiers made of crystal do not break morale. They break structurally, which is worse.',
    color:'#aabbcc', element:'crystalwar', rarity:'rare',
    fusedFrom:['crystalmancer','warlord'],
    stats:{hp:98,maxHp:98,mp:73,maxMp:73,atk:13,def:10,spd:11,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:7,SPD:6,MP:7},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','fire_fighting_rage','normal_blood_mark','crystal_void_surge','fire_crystal_shatter'],
    burstAbility:'crystalmancer_burst',
    passives:['crystal_body','battle_hardened'],
    description:'Warlord tactics executed in crystal — formations that exploit refraction for simultaneous multi-angle attacks, crystal warriors that shatter into shards on death. The Crystal Legion applies tactical doctrine to a material where every fallen soldier becomes an area denial device.',
    lore:'The warlord organized soldiers with the expectation they would remain soldiers after taking damage. Crystal soldiers shatter instead, which the warlord initially considered a liability. The Crystal Legion found it is a feature: every crystal unit that takes sufficient damage becomes a shard deployment, which converts casualties into tactical resources.'
  },

  crystal_spirit: {
    id:'crystal_spirit', name:'The Crystal Oracle', icon:'💎',
    tagline:'The crystal holds the spirit. The spirit reads the crystal.',
    color:'#bbccee', element:'crystalspirit', rarity:'epic',
    fusedFrom:['crystalmancer','spiritwalker'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:11,def:9,spd:12,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:9},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','electric_spirit_surge','electric_spirit_veil','crystal_void_stance','fire_crystal_refract'],
    burstAbility:'spiritwalker_burst',
    passives:['crystal_body','spirit_bond'],
    description:'Spirits housed in crystal structures — the spiritwalker\'s spirit allies preserved in crystal lattice, protected from environmental disruption while retaining their spiritual capacity. The Crystal Oracle\'s spirits can communicate across great distances through crystal resonance.',
    lore:'Spirits are affected by their environment. Crystal is stable. The Crystal Oracle found that spirits housed in crystal formations are protected from the environmental degradation that normally weakens spirits over time, and that crystal also amplifies spiritual communication — the lattice transmits spiritual signals the way glass fibers transmit light, which the spiritwalker finds extremely useful.'
  },

  crystal_hex: {
    id:'crystal_hex', name:'The Cursed Prism', icon:'💎',
    tagline:'The crystal refracts the curse in every direction. All directions. Simultaneously.',
    color:'#cc99ee', element:'crystalhex', rarity:'epic',
    fusedFrom:['crystalmancer','hexblade'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:12,def:7,spd:13,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','dark_blood_weaken','crystal_void_dot_strike','normal_rune_burden','psychic_void_weaken'],
    burstAbility:'hexblade_burst',
    passives:['crystal_body','hex_master'],
    description:'Hexes refracted through crystal — a single curse split into multiple simultaneous curses by the crystal\'s facets. The Cursed Prism places as many hexes as the crystal has facets and directs each one with refraction precision. One hex becomes many.',
    lore:'The hexblade placed one curse at a time. Crystal refracts one beam into many. The Cursed Prism placed curses in crystal and found that a hex entering the crystal from one direction exits as multiple simultaneous hexes from all facets, which multiplies the curse delivery rate by a factor equal to the number of facets the crystalmancer has bothered to grow.'
  },

  crystal_cosmo: {
    id:'crystal_cosmo', name:'The Cosmic Lens', icon:'💎',
    tagline:'The crystal that focuses starlight focuses it to the temperature of a star.',
    color:'#99aaff', element:'crystalcosmo', rarity:'legendary',
    fusedFrom:['crystalmancer','cosmomancer'],
    stats:{hp:72,maxHp:72,mp:105,maxMp:105,atk:12,def:6,spd:13,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:10},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','light_cosmic_blast','steel_cosmic_final','crystal_void_blast','dark_cosmic_weaken'],
    burstAbility:'cosmomancer_burst',
    passives:['crystal_body','stardust'],
    description:'Crystal configured as a cosmic lens — focusing astronomical light and energy to a point. The Cosmic Lens concentrates starlight to stellar intensity, refracts cosmic forces into precise channels, and handles energies that would destroy conventional matter by being crystallized to handle exactly those energies.',
    lore:'Lenses focus light. The cosmomancer had access to a great deal of light. The Cosmic Lens grew crystals specifically shaped to focus cosmic energy to a point and found that stellar-intensity focused light at dungeon scale is a significant force multiplier — the crystal doesn\'t burn because it was grown to tolerate exactly this input, which required the crystalmancer to do some advance calculations.'
  },

  crystal_pestilence: {
    id:'crystal_pestilence', name:'The Plague Crystal', icon:'💎',
    tagline:'The plague grew beautiful in the crystal. It is still a plague.',
    color:'#99cc88', element:'crystalplague', rarity:'epic',
    fusedFrom:['crystalmancer','pestilencelord'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:12,def:7,spd:12,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','fire_bug_plague','fire_crystal_shard','crystal_void_surge','poison_cosmic_dot_strike'],
    burstAbility:'crystalmancer_burst',
    passives:['crystal_body','plague_lord'],
    description:'Pathogens preserved and delivered in crystal shards — disease crystallized at peak virulence and shattered to release on contact. The Plague Crystal is simultaneously beautiful and extremely dangerous, with the crystal structure serving as both a preservation medium and a delivery mechanism.',
    lore:'The pestilencelord needed to preserve disease at maximum potency for deployment. Crystal is a preservation medium. The Plague Crystal crystallized pathogens at peak virulence and found that crystal-preserved disease remains at crystallization potency indefinitely — there is no decay in crystal — and that the shatter delivery releases the full dose in a shrapnel pattern that achieves excellent coverage.'
  },

  crystal_wind: {
    id:'crystal_wind', name:'The Glass Storm', icon:'💎',
    tagline:'Crystal at wind velocity is not wind. It is a different category of problem.',
    color:'#cceeff', element:'crystalwind', rarity:'rare',
    fusedFrom:['crystalmancer','windwalker'],
    stats:{hp:78,maxHp:78,mp:82,maxMp:82,atk:13,def:7,spd:16,crit:16},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:9,MP:8},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','fire_wind_cyclone','fire_flying_soar','crystal_void_strike','fire_crystal_shard'],
    burstAbility:'crystalmancer_burst',
    passives:['crystal_body','gust'],
    description:'Crystal shards moving at wind velocity — a cyclone of sharp mineral fragments that cuts everything it passes through. The Glass Storm moves at 16 SPD and the damage radius expands with speed, as each fragment fragments further on impact and joins the storm.',
    lore:'The windwalker moved air. The crystalmancer added solid matter to it. The Glass Storm found that crystal shards in a cyclone accelerate to wind speed and that at wind speed, even small crystal fragments have significant penetration characteristics. The storm also self-replenishes by shattering on impact and adding the fragments back to the cyclone.'
  },

  crystal_doom: {
    id:'crystal_doom', name:'The Crystal Doom', icon:'💎',
    tagline:'The doom was sealed in crystal. Crystal is very difficult to unseal.',
    color:'#aa88cc', element:'crystaldoom', rarity:'legendary',
    fusedFrom:['crystalmancer','doomcaster'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:11,def:6,spd:13,crit:16},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','crystal_void_blast','dark_cosmic_final','time_void_drain','normal_void_unmake'],
    burstAbility:'doomcaster_burst',
    passives:['crystal_body','doom_aura'],
    description:'Doom preserved in crystal — the death sentence crystallized at the moment of sealing, immune to degradation. The Crystal Doom can be deployed years after it was created at full potency, and the crystal format makes it physically hard to remove from the target even if they know it is there.',
    lore:'The doomcaster sealed fates in formats that could degrade over time. The crystalmancer suggested crystal. The Crystal Doom found that a doom preserved in crystal maintains its sealed intensity indefinitely and that the physical crystal embedded in the target is also a challenge to remove, which makes denial or delay of the doom considerably more difficult than for versions sealed in less permanent media.'
  },

  crystal_arcanist: {
    id:'crystal_arcanist', name:'The Living Formula', icon:'💎',
    tagline:'The formula grown in three dimensions does things the written formula does not.',
    color:'#aabbff', element:'crystalarcane', rarity:'legendary',
    fusedFrom:['arcanist','crystalmancer'],
    stats:{hp:70,maxHp:70,mp:108,maxMp:108,atk:11,def:5,spd:13,crit:17},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:11},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','psychic_cosmic_blast','light_rune_blast','crystal_void_surge','psychic_dark_stance'],
    burstAbility:'arcanist_burst',
    passives:['crystal_body','arcane_mastery'],
    description:'Arcane formulae expressed as crystal structures — three-dimensional equations grown in mineral lattice, theoretical constructs with physical form. The Living Formula can be modified by growing new facets and the crystal\'s own growth adds variables to the formula that the arcanist did not write.',
    lore:'The arcanist wrote formulae in two dimensions. Crystal grows in three. The Living Formula expressed arcane equations as crystal structures and found that three-dimensional formulae have terms that flat notation cannot represent, and that some of those terms produce effects the original formula did not anticipate — which the arcanist classifies as a discovery rather than an error.'
  },

  crystal_sentinel: {
    id:'crystal_sentinel', name:'The Crystal Fortress', icon:'💎',
    tagline:'The wall made of crystal is transparent and extremely hard. Enemies can see it coming.',
    color:'#cceeff', element:'crystalwall', rarity:'rare',
    fusedFrom:['crystalmancer','sentinel'],
    stats:{hp:122,maxHp:122,mp:62,maxMp:62,atk:10,def:15,spd:8,crit:9},
    statDisplay:{HP:8,ATK:7,DEF:10,SPD:5},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','normal_rune_ward','fire_crystal_fracture','normal_ice_armor','steel_light_surge'],
    burstAbility:'crystalmancer_burst',
    passives:['crystal_body','bastion'],
    description:'A defensive position made of grown crystal — transparent walls that reveal what approaches while being structurally harder than stone. The Crystal Fortress refracts light through its walls as an additional defense layer, creating visual disruption that makes determining the wall\'s exact position difficult.',
    lore:'The sentinel built defenses from available material. The crystalmancer grew better material. The Crystal Fortress holds position behind crystal walls that are harder than stone, refractive, and self-repairing — the crystalmancer simply grows the damaged sections back. The transparency is considered a feature by the sentinel, who can see what is approaching, and a problem by those approaching.'
  },

  crystal_phantom: {
    id:'crystal_phantom', name:'The Glass Ghost', icon:'💎',
    tagline:'A ghost made of crystal is both invisible and very sharp.',
    color:'#ddeeff', element:'crystalghost', rarity:'mythical',
    fusedFrom:['crystalmancer','phantom'],
    stats:{hp:73,maxHp:73,mp:85,maxMp:85,atk:13,def:5,spd:15,crit:21},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['crystal_form','refraction','crystallize','shatter_burst','water_ghost_phase','ice_ghost_chill','crystal_void_surge','crystal_void_blast'],
    burstAbility:'phantom_burst',
    passives:['crystal_body','phase'],
    description:'A spectral entity composed of crystal — phases through matter and leaves crystal fragments embedded in whatever it passes through. The Glass Ghost is transparent, intangible to conventional attack, and leaves a trail of crystalline shrapnel that makes retreat through its wake as dangerous as its strike.',
    lore:'Phantoms phase through matter. Crystal passes light through itself. The Glass Ghost found these properties combine into an entity that is simultaneously a ghost and a crystal lattice: it phases through enemies while depositing crystal fragments inside them, which the targets discover as a delayed and internally-distributed damage event that the Glass Ghost considers architecturally elegant.'
  },

  war_spirit: {
    id:'war_spirit', name:'The Spirit of War', icon:'⚔️',
    tagline:'The war that has ended is still remembered by everyone who survived it. The spirit ensures they do not forget.',
    color:'#aa8855', element:'warspirit', rarity:'epic',
    fusedFrom:['warlord','spiritwalker'],
    stats:{hp:95,maxHp:95,mp:82,maxMp:82,atk:13,def:9,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','electric_spirit_surge','electric_spirit_possession','normal_blood_mark','dark_blood_surge'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','spirit_bond'],
    description:'Commands the spirits of fallen warriors — the warlord\'s tactical doctrine applied to an army of the glorious dead, spirit soldiers who remember every battle they ever fought and execute the warlord\'s orders without the limitations of biological soldiers.',
    lore:'The warlord led living soldiers who tired, doubted, and died. The spiritwalker offered alternatives. The Spirit of War commands soldiers who no longer tire, doubt, or die and found that the primary limitations on warlord tactical doctrine were those of the organic soldiers executing it — which this arrangement resolves. The resulting army is slower to deploy but considerably more reliable.'
  },

  war_hex: {
    id:'war_hex', name:'The Cursed Warlord', icon:'⚔️',
    tagline:'The warlord who curses enemies before engaging them is the warlord who wins before the battle starts.',
    color:'#996677', element:'warhex', rarity:'epic',
    fusedFrom:['warlord','hexblade'],
    stats:{hp:95,maxHp:95,mp:80,maxMp:80,atk:14,def:9,spd:12,crit:14},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:7,MP:8},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','dark_blood_dot_strike','dark_blood_weaken','normal_void_curse','normal_blood_mark'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','hex_master'],
    description:'Battlefield hexes as tactical preparation — curses deployed before engagement as a force multiplier. Every enemy the Cursed Warlord fights is already weakened before the tactical engagement begins, converting pre-battle preparation into battlefield advantage.',
    lore:'The warlord prepared tactically. The hexblade prepared biologically. The Cursed Warlord combined these and found that a tactical plan that accounts for enemy debilitation via hexes before contact produces better outcome projections than a plan that assumes enemies at full capacity. Pre-battle hexing became standard doctrine.'
  },

  war_cosmo: {
    id:'war_cosmo', name:'The Cosmic Warlord', icon:'⚔️',
    tagline:'The warlord who commands the stars commands everything beneath them.',
    color:'#6677aa', element:'warcosmo', rarity:'legendary',
    fusedFrom:['warlord','cosmomancer'],
    stats:{hp:93,maxHp:93,mp:82,maxMp:82,atk:13,def:8,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','steel_cosmic_blast','dark_cosmic_weaken','light_cosmic_surge','wind_cosmic_strike'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','stardust'],
    description:'Warlord tactics at astronomical scale — battles planned across cosmic distances, forces that arrive from stellar positions, and the tactical doctrine of someone who has read the entire observable universe as a field map.',
    lore:'The warlord\'s tactical range was limited by what they could survey. The cosmomancer extended the survey to astronomical scale. The Cosmic Warlord plans engagements with full awareness of the cosmic context and found that most tactical problems have solutions that appear obvious when the relevant scale is large enough — the solution was always there but the field map was previously too small to show it.'
  },

  war_pestilence: {
    id:'war_pestilence', name:'The Plague General', icon:'⚔️',
    tagline:'The general who adds biological warfare to tactical doctrine wins wars at lower personal cost.',
    color:'#778855', element:'warplague', rarity:'epic',
    fusedFrom:['warlord','pestilencelord'],
    stats:{hp:93,maxHp:93,mp:78,maxMp:78,atk:13,def:9,spd:11,crit:12},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:6,MP:8},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','fire_poison_plague','fire_bug_plague','normal_blood_mark','fire_fighting_rage'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','plague_lord'],
    description:'Biological warfare integrated into tactical doctrine — plague deployed as a tactical weapon on the same timeline as conventional forces. The Plague General coordinates disease outbreak timing with battlefield maneuvers, ensuring peak infection and peak tactical pressure arrive simultaneously.',
    lore:'The warlord timed tactical actions for maximum effect. The pestilencelord timed biological actions for maximum spread. The Plague General combined timing doctrines and found that a disease outbreak timed to coincide with the moment of conventional engagement is more effective than either alone, because the enemy must divide response resources between two simultaneous crises with different response requirements.'
  },

  war_wind: {
    id:'war_wind', name:'The Storm General', icon:'⚔️',
    tagline:'The warlord who controls the weather controls the terrain. Terrain is everything.',
    color:'#aabb77', element:'warwind', rarity:'rare',
    fusedFrom:['warlord','windwalker'],
    stats:{hp:93,maxHp:93,mp:72,maxMp:72,atk:14,def:9,spd:14,crit:13},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:8,MP:7},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','fire_wind_cyclone','fire_flying_soar','wind_blood_blast','wind_light_surge'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','gust'],
    description:'Applies wind control to battlefield terrain management — creating and directing cyclones as tactical instruments, using wind corridors as movement channels, and deploying airborne forces at 14 SPD. The Storm General\'s battlefield is dynamic in ways that ground-based tactical planning doesn\'t model.',
    lore:'The warlord managed terrain as a static factor. The windwalker managed it as a dynamic one. The Storm General combined these and found that terrain modified in real time during engagement produces tactical advantages that neither static terrain advantage nor mobility alone achieves — the battlefield is being actively managed in favor of the Storm General throughout the engagement.'
  },

  war_doom: {
    id:'war_doom', name:'The Death Command', icon:'⚔️',
    tagline:'The warlord orders death. The doomcaster ensures it.',
    color:'#774455', element:'wardoom', rarity:'legendary',
    fusedFrom:['warlord','doomcaster'],
    stats:{hp:90,maxHp:90,mp:85,maxMp:85,atk:13,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','time_void_blast','dark_blood_final','normal_void_unmake','wind_void_final'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','doom_aura'],
    description:'Battle orders backed by doom seals — every tactical command the Death Command issues to engage the enemy seals the target\'s fate. The warlord issues the order; the doom guarantees its execution regardless of tactical outcomes.',
    lore:'The warlord issued orders that soldiers executed through effort. The doomcaster issued sentences that fate executed through inevitability. The Death Command found that combining these makes every battle order a doom seal: when the Death Command designates a target, the tactical engagement is the mechanism, not the cause. The cause was the designation, and the doom has already guaranteed the outcome.'
  },

  war_arcanist: {
    id:'war_arcanist', name:'The Arcane General', icon:'⚔️',
    tagline:'The formula for winning is: know more than the enemy. This one does.',
    color:'#6655aa', element:'wararcane', rarity:'legendary',
    fusedFrom:['arcanist','warlord'],
    stats:{hp:88,maxHp:88,mp:90,maxMp:90,atk:13,def:7,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:9},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','psychic_cosmic_blast','light_rune_blast','dark_blood_surge','electric_psychic_vortex'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','arcane_mastery'],
    description:'Tactical genius amplified by arcane analysis — every battlefield variable quantified, every enemy action modeled, every arcane force coordinated with conventional force in a unified theory of battle. The Arcane General fights the war that the mathematics says it should fight and adjusts the math in real time.',
    lore:'The warlord intuited tactical superiority from experience. The arcanist derived it mathematically. The Arcane General found that a battle plan derived from a complete mathematical model of the battlefield is more reliable than one derived from experience alone, because experience generates heuristics that fail on novel conditions, while math generates models that update when new data arrives.'
  },

  war_sentinel: {
    id:'war_sentinel', name:'The Unbreakable Line', icon:'⚔️',
    tagline:'The line holds. This has been confirmed by everyone who tried to break it.',
    color:'#997755', element:'warwall', rarity:'uncommon',
    fusedFrom:['warlord','sentinel'],
    stats:{hp:130,maxHp:130,mp:55,maxMp:55,atk:12,def:16,spd:8,crit:9},
    statDisplay:{HP:9,ATK:8,DEF:10,SPD:4},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','normal_rune_ward','fire_steel_quench','fire_ground_ward','normal_blood_mark'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','bastion'],
    description:'A defensive line that has never broken — 130 HP and 16 DEF behind the sentinel\'s bastion passive and the warlord\'s battle-hardened experience. The Unbreakable Line holds its position through tactical excellence and physical toughness simultaneously, and the combination has not yet been overcome.',
    lore:'The warlord had many tactical doctrines. The sentinel had one: hold. The Unbreakable Line found that the sentinel\'s doctrine is the foundation all others rest on and that applying warlord tactical support to the sentinel\'s fundamental posture produces a defensive capability that is, by the historical record at time of writing, unbreakable. The record is still being compiled.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_15);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_15);
  FUSION_LOADED_FILES.add(15);
  if(typeof console!=='undefined') console.debug('[Fusion] File 15 loaded (37 classes)');
})();
