// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 13 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_13 = {
  'magnetist+plaguedoctor': 'plague_magnetist',
  'crystalmancer+plaguedoctor': 'plague_crystal',
  'plaguedoctor+warlord': 'plague_war',
  'plaguedoctor+spiritwalker': 'plague_spirit',
  'hexblade+plaguedoctor': 'plague_hex',
  'cosmomancer+plaguedoctor': 'plague_cosmo',
  'pestilencelord+plaguedoctor': 'plague_pestilence',
  'plaguedoctor+windwalker': 'plague_wind',
  'doomcaster+plaguedoctor': 'plague_doom',
  'arcanist+plaguedoctor': 'plague_arcanist',
  'plaguedoctor+sentinel': 'plague_sentinel',
  'phantom+plaguedoctor': 'plague_phantom',
  'geomancer+lightbringer': 'geo_lightbringer',
  'beastmaster+geomancer': 'geo_beast',
  'geomancer+techsavant': 'geo_tech',
  'geomancer+gravewarden': 'geo_grave',
  'geomancer+magnetist': 'geo_magnetist',
  'crystalmancer+geomancer': 'geo_crystal',
  'geomancer+warlord': 'geo_war',
  'geomancer+spiritwalker': 'geo_spirit',
  'geomancer+hexblade': 'geo_hex',
  'cosmomancer+geomancer': 'geo_cosmo',
  'geomancer+pestilencelord': 'geo_pestilence',
  'geomancer+windwalker': 'geo_wind',
  'doomcaster+geomancer': 'geo_doom',
  'arcanist+geomancer': 'geo_arcanist',
  'geomancer+sentinel': 'geo_sentinel',
  'geomancer+phantom': 'geo_phantom',
  'beastmaster+lightbringer': 'lightbringer_beast',
  'lightbringer+techsavant': 'lightbringer_tech',
  'gravewarden+lightbringer': 'lightbringer_grave',
  'lightbringer+magnetist': 'lightbringer_magnetist',
  'crystalmancer+lightbringer': 'lightbringer_crystal',
  'lightbringer+warlord': 'lightbringer_war',
  'lightbringer+spiritwalker': 'lightbringer_spirit',
  'hexblade+lightbringer': 'lightbringer_hex',
  'cosmomancer+lightbringer': 'lightbringer_cosmo'
};

const FUSION_CLASSES_13 = {
  plague_magnetist: {
    id:'plague_magnetist', name:'The Iron Contagion', icon:'🩺',
    tagline:'The disease rides the magnetic field. The field is everywhere.',
    color:'#4d7788', element:'magnetplague', rarity:'epic',
    fusedFrom:['plaguedoctor','magnetist'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:12,def:8,spd:12,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_magnet_pull','fire_magnet_flux','gravity_magnet_surge','poison_dark_drain'],
    burstAbility:'magnetist_burst',
    passives:['immunity','magnetic_field'],
    description:'Disease attached to magnetic particles — pathogens that adhere to ferrous matter and travel through magnetic fields to reach targets. The Iron Contagion infects through metal surfaces, airborne magnetic particles, and the field itself. Removing your armor makes it worse.',
    lore:'Magnetic particles exist in blood. The plaguedoctor found this interesting. The Iron Contagion engineered pathogens that attach to magnetic particles and travel wherever the magnetic field directs them — which, in a dungeon full of iron tools and armor, is everywhere simultaneously.'
  },

  plague_crystal: {
    id:'plague_crystal', name:'The Crystalline Plague', icon:'🩺',
    tagline:'The crystal is beautiful. The crystal is also growing inside the host.',
    color:'#88aa66', element:'crystalplague', rarity:'epic',
    fusedFrom:['plaguedoctor','crystalmancer'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:12,def:7,spd:12,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_crystal_shard','fire_crystal_fracture','crystal_void_surge','poison_dark_dot_strike'],
    burstAbility:'crystalmancer_burst',
    passives:['immunity','crystal_body'],
    description:'A crystallization pathogen — disease that grows crystal structures inside living tissue, visible through skin as it progresses, shattering outward on host death. The Crystalline Plague is its own transmission vector: the crystals that shatter carry the next generation.',
    lore:'The crystalmancer grew crystals in controlled environments. The plaguedoctor found a use for the growth mechanism in biological contexts. The Crystalline Plague grows crystal lattices in living hosts and discovered that the body\'s own mineral content is sufficient substrate — the disease does not need to bring its own material.'
  },

  plague_war: {
    id:'plague_war', name:'The Biological Campaign', icon:'🩺',
    tagline:'The most effective siege weapon is patience. The plague has infinite patience.',
    color:'#887755', element:'plaguewar', rarity:'rare',
    fusedFrom:['plaguedoctor','warlord'],
    stats:{hp:90,maxHp:90,mp:80,maxMp:80,atk:12,def:9,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:6,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_fighting_rage','normal_blood_mark','poison_wind_surge','fire_poison_plague'],
    burstAbility:'plaguedoctor_burst',
    passives:['immunity','battle_hardened'],
    description:'Applies warlord campaign doctrine to plague deployment — disease used as a tactical weapon, infection timed for maximum disruption of enemy cohesion, and a biological war plan with objectives, timelines, and contingencies. The Biological Campaign treats disease as logistics.',
    lore:'The warlord waged war through position and timing. The plaguedoctor waged it through biology. The Biological Campaign found these were compatible doctrines: plague is an attrition weapon that rewards patience, and warlord discipline is the practice of converting patience into strategic advantage. The resulting campaign plan is both ruthlessly effective and meticulously documented.'
  },

  plague_spirit: {
    id:'plague_spirit', name:'The Plague Ghost', icon:'🩺',
    tagline:'The spirit carries disease between worlds. Both worlds suffer.',
    color:'#668877', element:'plaguespirit', rarity:'epic',
    fusedFrom:['plaguedoctor','spiritwalker'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:11,def:8,spd:12,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','electric_spirit_siphon','water_ghost_haunt','fire_poison_plague','water_spirit_drown'],
    burstAbility:'spiritwalker_burst',
    passives:['immunity','spirit_bond'],
    description:'Spirits as disease vectors — the Plague Ghost commands entities that exist in both the material and spiritual planes, transmitting infection across both simultaneously. Physical immunity offers no protection when the vector bypasses physical contact entirely.',
    lore:'Spirits move between worlds. The plaguedoctor engineered organisms that can make the same journey. The Plague Ghost found that disease transmitted via spirit phase bypasses the immune responses designed for physical pathogens, since the infection appears in the body from a vector the immune system was not monitoring — because it has no mechanism to monitor spirit-plane transmission.'
  },

  plague_hex: {
    id:'plague_hex', name:'The Cursed Infection', icon:'🩺',
    tagline:'The curse weakens the immune system. The plague exploits the weakness. This is intentional.',
    color:'#7755aa', element:'hexplague', rarity:'epic',
    fusedFrom:['plaguedoctor','hexblade'],
    stats:{hp:80,maxHp:80,mp:92,maxMp:92,atk:12,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['infect','plague_cloud','epidemic','quarantine','dark_blood_dot_strike','dark_blood_weaken','normal_void_curse','psychic_void_weaken'],
    burstAbility:'hexblade_burst',
    passives:['immunity','hex_master'],
    description:'Hexes calibrated to suppress immune response — the curse precedes the infection, guaranteeing the disease finds a compromised host. The Cursed Infection has a 100% infection rate among hexed targets, because the hex removes the one factor that creates uncertainty.',
    lore:'The hexblade weakened targets for subsequent attack. The plaguedoctor needed weakened immune systems for efficient infection. The Cursed Infection found these were perfectly complementary requirements: the hex provides the exact biological vulnerability the disease is designed to exploit, at the moment of maximum utility.'
  },

  plague_cosmo: {
    id:'plague_cosmo', name:'The Stellar Pathogen', icon:'🩺',
    tagline:'Life exists elsewhere. So does disease. This one came from further away.',
    color:'#5566aa', element:'cosmoplague', rarity:'legendary',
    fusedFrom:['plaguedoctor','cosmomancer'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:11,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['infect','plague_cloud','epidemic','quarantine','light_cosmic_blast','light_cosmic_surge','poison_cosmic_blast','poison_cosmic_final'],
    burstAbility:'cosmomancer_burst',
    passives:['immunity','stardust'],
    description:'Disease of extraterrestrial origin — pathogens from environments with different atmospheric and biological baseline conditions, to which local immune systems have no prepared defense. The Stellar Pathogen did not evolve here. Immunity did.',
    lore:'The cosmomancer traveled far. The plaguedoctor studied what came back. The Stellar Pathogen carries biological material from environments so different from the dungeon\'s that local immune systems have no category for it — not because it is more virulent, but because the immune system\'s entire pattern library was compiled from local threats and this one is not local.'
  },

  plague_pestilence: {
    id:'plague_pestilence', name:'The Compound Plague', icon:'🩺',
    tagline:'Two experts in the same field, working together. The field is death.',
    color:'#558855', element:'fullplague', rarity:'legendary',
    fusedFrom:['plaguedoctor','pestilencelord'],
    stats:{hp:80,maxHp:80,mp:98,maxMp:98,atk:12,def:8,spd:11,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:6,MP:9},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_bug_plague','fire_poison_plague','poison_cosmic_weaken','poison_wind_blast'],
    burstAbility:'pestilence_burst',
    passives:['immunity','plague_lord'],
    description:'The combined disease library of two biological weapons specialists — every pathogen from both traditions, administered simultaneously to exploit the synergistic progression where each disease accelerates the others. The Compound Plague makes the plaguedoctor and pestilencelord\'s arsenals available in sequence and overlap.',
    lore:'The plaguedoctor and pestilencelord represent different schools of the same practice. The Compound Plague unified their curricula and found that diseases designed by independent practitioners do not interfere with each other — they accelerate each other. This turns out to be worse for the recipient than either school anticipated.'
  },

  plague_wind: {
    id:'plague_wind', name:'The Airborne', icon:'🩺',
    tagline:'The wind carries everything. The plaguedoctor optimized for this.',
    color:'#88aa44', element:'windplague', rarity:'rare',
    fusedFrom:['plaguedoctor','windwalker'],
    stats:{hp:80,maxHp:80,mp:82,maxMp:82,atk:12,def:7,spd:15,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_wind_cyclone','psychic_wind_blast','poison_wind_strike','poison_wind_surge'],
    burstAbility:'plaguedoctor_burst',
    passives:['immunity','gust'],
    description:'Airborne pathogens at wind velocity — disease delivered as a cloud that moves at 15 SPD and covers the entire battlefield in a single turn. The Airborne has solved the plague doctor\'s fundamental coverage problem: everything in range breathes.',
    lore:'Airborne transmission is the most efficient delivery method. The windwalker controlled air. The Airborne combined these and found that a disease cloud propelled at wind speed achieves total battlefield coverage in the time it takes the enemy to identify they are under a biological attack — which is, in most cases, after they have already breathed.'
  },

  plague_doom: {
    id:'plague_doom', name:'The Terminal Diagnosis', icon:'🩺',
    tagline:'The diagnosis is terminal. The doom confirms it. This is now a formality.',
    color:'#667766', element:'doomplague', rarity:'legendary',
    fusedFrom:['plaguedoctor','doomcaster'],
    stats:{hp:75,maxHp:75,mp:103,maxMp:103,atk:10,def:6,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['infect','plague_cloud','epidemic','quarantine','time_void_blast','normal_void_unmake','dark_blood_final','poison_dark_final'],
    burstAbility:'doomcaster_burst',
    passives:['immunity','doom_aura'],
    description:'A disease that guarantees its own fatal outcome — the doom seals the progression so that recovery becomes impossible regardless of resistance. The Terminal Diagnosis does not require a particularly virulent pathogen. It requires one that cannot be survived.',
    lore:'The plaguedoctor made deadly diseases. The doomcaster made outcomes inevitable. The Terminal Diagnosis combined these and found that sealing the doom does not require a more lethal pathogen — it requires ensuring that whatever pathogen is present cannot be overcome. The doom provides this guarantee; the disease provides the mechanism.'
  },

  plague_arcanist: {
    id:'plague_arcanist', name:'The Theoretical Pathogen', icon:'🩺',
    tagline:'The disease derived mathematically is more efficient than one evolved naturally.',
    color:'#6677aa', element:'arcaneplague', rarity:'legendary',
    fusedFrom:['plaguedoctor','arcanist'],
    stats:{hp:73,maxHp:73,mp:108,maxMp:108,atk:10,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['infect','plague_cloud','epidemic','quarantine','psychic_cosmic_blast','psychic_dark_weaken','poison_cosmic_blast','light_rune_blast'],
    burstAbility:'arcanist_burst',
    passives:['immunity','arcane_mastery'],
    description:'Disease designed by mathematical derivation — the arcanist\'s formula applied to pathogen design, producing diseases optimized by theoretical analysis rather than evolutionary selection. The Theoretical Pathogen is more efficient than anything that evolved because it was designed without constraints.',
    lore:'Evolution optimizes under constraint. The arcanist optimizes without it. The Theoretical Pathogen used arcane mathematical frameworks to derive the ideal disease from first principles and found that the result bears no resemblance to anything that evolved naturally, which means immune systems have no heuristic for responding to it.'
  },

  plague_sentinel: {
    id:'plague_sentinel', name:'The Quarantine Wall', icon:'🩺',
    tagline:'Nothing comes in. Nothing goes out. The disease inside is not your concern. Yet.',
    color:'#668866', element:'plaguewall', rarity:'uncommon',
    fusedFrom:['plaguedoctor','sentinel'],
    stats:{hp:118,maxHp:118,mp:70,maxMp:70,atk:9,def:14,spd:8,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:7},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_steel_quench','normal_rune_ward','poison_wind_stance','water_dark_depths'],
    burstAbility:'plaguedoctor_burst',
    passives:['immunity','bastion'],
    description:'A fortified biological containment zone — the Quarantine Wall holds its position while sealing all exits with plague-laced barriers. The sentinel\'s immovability enforces the plaguedoctor\'s quarantine, and the disease inside the perimeter is the intended outcome rather than a side effect.',
    lore:'Quarantine requires enforcement. The plaguedoctor needed to seal perimeters. The sentinel was the best available perimeter-sealer. The Quarantine Wall operates as both: the sentinel holds the wall that ensures quarantine holds, and the disease inside the wall operates on its own schedule undisturbed by the usual factors that limit pathogen progression.'
  },

  plague_phantom: {
    id:'plague_phantom', name:'The Pestilent Specter', icon:'🩺',
    tagline:'The ghost of a plague victim carries the plague. This was predictable.',
    color:'#6699aa', element:'plagueghost', rarity:'legendary',
    fusedFrom:['plaguedoctor','phantom'],
    stats:{hp:78,maxHp:78,mp:88,maxMp:88,atk:13,def:6,spd:15,crit:18},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','water_ghost_phase','water_ghost_haunt','poison_dark_drain','dark_blood_weaken'],
    burstAbility:'phantom_burst',
    passives:['immunity','phase'],
    description:'A spectral plague vector — phases through physical barriers to deliver infection, immune to any counter-disease because it no longer has biology to infect. The Pestilent Specter carries disease it cannot catch to targets who cannot avoid it.',
    lore:'The plaguedoctor studied what happened when plague victims died. The phantom answered. The Pestilent Specter is the natural outcome: the disease outlasts the host and continues operating in its spectral form, which is immune to antibiotics and most other countermeasures because it no longer has the biological substrate those countermeasures are designed to address.'
  },

  geo_lightbringer: {
    id:'geo_lightbringer', name:'The Illuminated Stone', icon:'🗿',
    tagline:'Light through crystal. The mountain does not mind the glow.',
    color:'#ccaa55', element:'lightearth', rarity:'rare',
    fusedFrom:['geomancer','lightbringer'],
    stats:{hp:90,maxHp:90,mp:85,maxMp:85,atk:12,def:10,spd:10,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','normal_light_gleam','normal_light_illuminate','light_rune_blast','light_rune_stance'],
    burstAbility:'lightbringer_burst',
    passives:['earth_body','radiant'],
    description:'Holy light channeled through stone — divine radiance refracted through mineral lattices into shaped beams, sacred earth that pulses with inner luminescence. The Illuminated Stone blinds in the same moment it strikes.',
    lore:'Light travels through crystal at angles determined by the mineral\'s structure. The lightbringer provided light; the geomancer selected the mineral. The Illuminated Stone found that certain stone formations focus divine light into precisely directed beams, which is a use the geomancer had not previously considered and the lightbringer considers a significant efficiency improvement.'
  },

  geo_beast: {
    id:'geo_beast', name:'The Earthborn Pack', icon:'🗿',
    tagline:'The animals that live in stone are not slower. They are denser.',
    color:'#887755', element:'earthbeast', rarity:'uncommon',
    fusedFrom:['geomancer','beastmaster'],
    stats:{hp:100,maxHp:100,mp:68,maxMp:68,atk:13,def:12,spd:10,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:6},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','normal_dragon_roar','fire_ground_quake','fire_rock_cinder','fire_fighting_combo'],
    burstAbility:'geomancer_burst',
    passives:['earth_body','feral_bond'],
    description:'Coordinates geological fauna — creatures that burrow through stone, emerge through the dungeon floor, and attack from angles that assume the walls are a travel medium rather than a barrier. The Earthborn Pack fights from below the terrain.',
    lore:'The beastmaster commanded surface predators. The geomancer commanded stone. The Earthborn Pack combined these by commanding predators that live in stone: creatures who treat solid rock as their natural habitat and emerge through dungeon floors at the coordinates the geomancer specifies. The walls do not protect against them because the walls are where they live.'
  },

  geo_tech: {
    id:'geo_tech', name:'The Mining Engine', icon:'🗿',
    tagline:'The machine that cuts stone is the most powerful machine. This one was upgraded.',
    color:'#887766', element:'earthtech', rarity:'epic',
    fusedFrom:['geomancer','techsavant'],
    stats:{hp:90,maxHp:90,mp:85,maxMp:85,atk:12,def:10,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','fire_cyber_overclock','fire_ground_volcano','steel_cosmic_final','electric_cyber_shutdown'],
    burstAbility:'techsavant_burst',
    passives:['earth_body','overclock'],
    description:'Technical systems augmented with geological force — machines powered by geothermal energy, drills overclocked beyond material limits by geomantic reinforcement, and the technical precision of the techsavant applied to the raw power of tectonic movement.',
    lore:'The techsavant built machines. The geomancer provided unlimited power from the geological substrate. The Mining Engine found that geothermal energy is effectively infinite by dungeon standards and that running the techsavant\'s systems on it removes the energy ceiling that previously limited their performance.'
  },

  geo_grave: {
    id:'geo_grave', name:'The Stone Tomb', icon:'🗿',
    tagline:'The stone remembered. The dead are part of the stone now.',
    color:'#776655', element:'earthgrave', rarity:'rare',
    fusedFrom:['geomancer','gravewarden'],
    stats:{hp:105,maxHp:105,mp:70,maxMp:70,atk:11,def:13,spd:8,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:9,SPD:5},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','water_ghost_haunt','fire_rock_siphon','water_dark_depths','normal_rune_ward'],
    burstAbility:'geomancer_burst',
    passives:['earth_body','undying'],
    description:'Entombs enemies in geological formations — stone closes over fallen enemies, preserving them, and the geological formation retains their fighting force as a standing resource. The Stone Tomb does not let go of anything it has enclosed.',
    lore:'The gravewarden maintained graves with care. The geomancer made graves that required no maintenance: stone formations that close over their contents and are permanent. The Stone Tomb found that geological entombment is the most durable form of burial available and that the geological record retains things that wooden coffins in soil do not.'
  },

  geo_magnetist: {
    id:'geo_magnetist', name:'The Lodestone Peak', icon:'🗿',
    tagline:'The magnetic mountain pulls iron from all directions. Stand near iron carefully.',
    color:'#7788aa', element:'earthmagnet', rarity:'rare',
    fusedFrom:['geomancer','magnetist'],
    stats:{hp:95,maxHp:95,mp:75,maxMp:75,atk:12,def:11,spd:9,crit:11},
    statDisplay:{HP:6,ATK:8,DEF:8,SPD:5,MP:7},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','fire_magnet_pull','fire_magnet_flux','gravity_magnet_blast','electric_steel_magnetize'],
    burstAbility:'magnetist_burst',
    passives:['earth_body','magnetic_field'],
    description:'Geological magnetism at mountain scale — iron ore in surrounding stone activated as a magnetic force, pulling enemy metal equipment toward the stone formation. The Lodestone Peak creates a gravitational-class magnetic field by magnetizing the dungeon walls themselves.',
    lore:'Lodestone is magnetic rock. The magnetist studied it as a baseline. The Lodestone Peak scaled the concept: instead of a lodestone, a mountain made of magnetized geological material. The magnetic field this produces is proportional to the stone volume, which in a dungeon is effectively unlimited.'
  },

  geo_crystal: {
    id:'geo_crystal', name:'The Crystal Cavern', icon:'🗿',
    tagline:'The cave grew them over millennia. They are ready now.',
    color:'#99aacc', element:'earthcrystal', rarity:'epic',
    fusedFrom:['geomancer','crystalmancer'],
    stats:{hp:88,maxHp:88,mp:88,maxMp:88,atk:12,def:10,spd:10,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','fire_crystal_shard','fire_crystal_refract','crystal_void_surge','ice_rock_crystallize'],
    burstAbility:'crystalmancer_burst',
    passives:['earth_body','crystal_body'],
    description:'A dungeon formation grown from mineral patience — crystal structures in geological matrix, the cavern walls become the weapon, and the Crystal Cavern can grow formations anywhere the stone already exists. The dungeon is its artillery.',
    lore:'Crystals grow in geological formations over geological time. The crystalmancer accelerated this. The Crystal Cavern grows formations instantaneously wherever the mineral substrate exists, which is everywhere there is stone — meaning everywhere in the dungeon. The walls are the ammunition.'
  },

  geo_war: {
    id:'geo_war', name:'The Siege Mountain', icon:'🗿',
    tagline:'The mountain does not move. The army that holds the mountain does not need to.',
    color:'#998866', element:'earthwar', rarity:'rare',
    fusedFrom:['geomancer','warlord'],
    stats:{hp:105,maxHp:105,mp:70,maxMp:70,atk:13,def:13,spd:9,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:9,SPD:5},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','fire_fighting_rage','normal_blood_mark','fire_rock_strike','fire_ground_scorch'],
    burstAbility:'geomancer_burst',
    passives:['earth_body','battle_hardened'],
    description:'Geological siege warfare — holds the high ground permanently because the high ground is also the weapon. The Siege Mountain directs boulder volleys as tactical units, uses terrain reshaping as a flanking maneuver, and fights every battle from a position of geological superiority.',
    lore:'The warlord valued terrain. The geomancer created it. The Siege Mountain occupies the highest ground and then modifies that ground during the engagement, raising new obstacles, collapsing approaches, and deploying geological resources with the same precision the warlord applies to troop movements.'
  },

  geo_spirit: {
    id:'geo_spirit', name:'The Stone Memory', icon:'🗿',
    tagline:'The stone has been here longer than anything that died here. It remembers all of it.',
    color:'#99aa88', element:'earthspirit', rarity:'epic',
    fusedFrom:['geomancer','spiritwalker'],
    stats:{hp:92,maxHp:92,mp:82,maxMp:82,atk:11,def:11,spd:9,crit:11},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:5,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','electric_spirit_surge','water_ghost_haunt','fire_ground_quake','electric_spirit_siphon'],
    burstAbility:'spiritwalker_burst',
    passives:['earth_body','spirit_bond'],
    description:'The spiritual residue preserved in stone — every death that occurred in the dungeon recorded in the mineral matrix. Stone Memory summons these geological spirits as allies, commanding the accumulated dead of the dungeon from the stone that witnessed them.',
    lore:'Spirits linger where they died. The geomancer noted that the dungeon stone had been present for every death that had occurred in it. The Stone Memory found that the accumulated spiritual residue in geological material is proportional to its age and the number of events it witnessed, which for dungeon stone is a very large number.'
  },

  geo_hex: {
    id:'geo_hex', name:'The Cursed Stone', icon:'🗿',
    tagline:'The hex was carved into the stone centuries ago. The stone has been waiting.',
    color:'#887799', element:'earthhex', rarity:'epic',
    fusedFrom:['geomancer','hexblade'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:12,def:10,spd:10,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','dark_blood_stance','dark_blood_weaken','normal_void_hollow','normal_rune_burden'],
    burstAbility:'hexblade_burst',
    passives:['earth_body','hex_master'],
    description:'Hexes inscribed in geological stone — curses that have existed in the dungeon walls since before the current occupants arrived, activating when the target steps into range. The Cursed Stone\'s hexes are patient, durable, and pre-positioned.',
    lore:'The hexblade inscribed curses in temporary media. The geomancer suggested stone. The Cursed Stone found that hexes carved into geological material are effectively permanent and that dungeon stone already has some curses in it from previous practitioners — the Cursed Stone simply activates what was already there and adds to the collection.'
  },

  geo_cosmo: {
    id:'geo_cosmo', name:'The Planetary Core', icon:'🗿',
    tagline:'Planets are made of stone. The force at their center is significant.',
    color:'#778899', element:'earthcosmo', rarity:'legendary',
    fusedFrom:['geomancer','cosmomancer'],
    stats:{hp:85,maxHp:85,mp:95,maxMp:95,atk:11,def:10,spd:10,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:7,SPD:6,MP:9},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','light_cosmic_blast','dark_cosmic_stance','steel_cosmic_final','normal_gravity_collapse'],
    burstAbility:'cosmomancer_burst',
    passives:['earth_body','stardust'],
    description:'Geological force at planetary scale — the pressure of a planet\'s mantle directed into the dungeon, astronomical stone masses commanded as weapons, and the cosmomancer\'s awareness of planetary bodies applied to the geomancer\'s stone control.',
    lore:'Planets are essentially large stones with cores of compressed minerals. The geomancer understood stone. The cosmomancer understood planets. The Planetary Core found that scaling geological techniques to planetary dimensions produces forces that the dungeon-scale versions do not approach, and that applying planetary core pressure to a small space has results the geology textbooks describe and the occupants of that space experience directly.'
  },

  geo_pestilence: {
    id:'geo_pestilence', name:'The Contaminated Earth', icon:'🗿',
    tagline:'The soil is sick. The sickness goes down as far as the stone. Which is all the way down.',
    color:'#778855', element:'earthplague', rarity:'epic',
    fusedFrom:['geomancer','pestilencelord'],
    stats:{hp:90,maxHp:90,mp:80,maxMp:80,atk:12,def:10,spd:9,crit:11},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:5,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','fire_bug_plague','fire_poison_plague','fire_ground_volcano','fire_rock_slag'],
    burstAbility:'geomancer_burst',
    passives:['earth_body','plague_lord'],
    description:'Geological plague delivery — disease introduced into the mineral substrate, transmitted through floor contact, stone walls, and the geological dust produced by earth attacks. The Contaminated Earth cannot be cleaned without removing the dungeon entirely.',
    lore:'Soil pathogens are real and persistent. The pestilencelord introduced them to geological substrate. The Contaminated Earth found that rock is a better long-term disease carrier than soil: slower to transmit but essentially permanent. The dungeon stone now carries what was put in it and will continue to do so for geological time.'
  },

  geo_wind: {
    id:'geo_wind', name:'The Sandstorm', icon:'🗿',
    tagline:'The stone that becomes airborne is still stone. It moves faster now.',
    color:'#ccaa77', element:'earthwind', rarity:'rare',
    fusedFrom:['geomancer','windwalker'],
    stats:{hp:88,maxHp:88,mp:75,maxMp:75,atk:13,def:9,spd:14,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:7},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','fire_wind_cyclone','fire_flying_updraft','fire_rock_cinder','fire_ground_scorch'],
    burstAbility:'geomancer_burst',
    passives:['earth_body','gust'],
    description:'Geological material made airborne — stone dust at wind velocity, boulders launched by cyclone, and the sandstorm that scours everything it passes through. The Sandstorm converts the dungeon\'s stone floors into airborne ammunition.',
    lore:'Wind erodes stone. The geomancer reversed this: stone erodes everything the wind carries it through. The Sandstorm combines the windwalker\'s velocity with the geomancer\'s material, producing a projectile delivery system that uses the dungeon itself as ammunition and the wind as the accelerant.'
  },

  geo_doom: {
    id:'geo_doom', name:'The Collapsing World', icon:'🗿',
    tagline:'The doom makes the stone fall. The stone was always going to fall. The doom simply confirmed when.',
    color:'#776655', element:'earthdoom', rarity:'legendary',
    fusedFrom:['geomancer','doomcaster'],
    stats:{hp:88,maxHp:88,mp:88,maxMp:88,atk:12,def:9,spd:9,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:5,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','normal_void_unmake','dark_cosmic_weaken','fire_ground_volcano','time_void_blast'],
    burstAbility:'doomcaster_burst',
    passives:['earth_body','doom_aura'],
    description:'Geological doom — the dungeon itself is doomed to collapse on a timeline only the Collapsing World controls. Doom sealed in stone, quakes that carry the doom-frequency, and the certainty that the geological structure above the enemy will not remain geological structure indefinitely.',
    lore:'The doomcaster sealed individual fates. The geomancer sealed geological ones. The Collapsing World found that geological doom is more persuasive than personal doom because it is harder to argue with and the scale of the event makes individual countermeasures seem optimistic.'
  },

  geo_arcanist: {
    id:'geo_arcanist', name:'The Runic Earth', icon:'🗿',
    tagline:'The oldest writing was carved in stone. This is the original arcane tradition.',
    color:'#8899aa', element:'eartharcane', rarity:'legendary',
    fusedFrom:['geomancer','arcanist'],
    stats:{hp:85,maxHp:85,mp:98,maxMp:98,atk:11,def:9,spd:10,crit:14},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:6,MP:9},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','light_rune_blast','light_rune_drain','psychic_cosmic_blast','steel_cosmic_blast'],
    burstAbility:'arcanist_burst',
    passives:['earth_body','arcane_mastery'],
    description:'Arcane formulae inscribed in geological material — the Runic Earth casts spells through stone carvings, geological formations that encode the arcanist\'s most powerful theorems. The formulae have been in the stone for centuries. They are still valid.',
    lore:'Ancient arcane practice carved formulae in stone for permanence. The geomancer could always read them. The Runic Earth combined these traditions and found that a formula inscribed in geological substrate has the geological formation\'s own mass as a power source — and geological formations contain a great deal of potential energy.'
  },

  geo_sentinel: {
    id:'geo_sentinel', name:'The Mountain Hold', icon:'🗿',
    tagline:'The mountain does not decide to hold. It simply is held.',
    color:'#99aa99', element:'earthwall', rarity:'uncommon',
    fusedFrom:['geomancer','sentinel'],
    stats:{hp:135,maxHp:135,mp:55,maxMp:55,atk:10,def:16,spd:7,crit:8},
    statDisplay:{HP:9,ATK:7,DEF:10,SPD:4},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','normal_rune_ward','fire_ground_ward','fire_steel_quench','normal_gravity_burden'],
    burstAbility:'geomancer_burst',
    passives:['earth_body','bastion'],
    description:'A geological fortification — 135 HP and 16 DEF in a body composed of dungeon stone itself. The Mountain Hold cannot be moved because it is, in a geological sense, the same thing as the dungeon walls. Attacking it is attacking the architecture.',
    lore:'The sentinel held position through will. Stone holds position through mass. The Mountain Hold requires no will: it holds because it is stone and stone holds. The sentinel\'s training provides the tactical application of this geological fact, turning the geomancer\'s raw mass into a defended perimeter rather than just a large obstacle.'
  },

  geo_phantom: {
    id:'geo_phantom', name:'The Stone Ghost', icon:'🗿',
    tagline:'The ghost passed through the wall. The wall came with it.',
    color:'#aabbcc', element:'earthghost', rarity:'legendary',
    fusedFrom:['geomancer','phantom'],
    stats:{hp:88,maxHp:88,mp:80,maxMp:80,atk:13,def:8,spd:13,crit:16},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['stone_skin','earth_pulse','boulder_throw','quake_slam','water_ghost_phase','ice_ghost_chill','fire_rock_slag','normal_gravity_collapse'],
    burstAbility:'phantom_burst',
    passives:['earth_body','phase'],
    description:'A spectral entity composed of stone — phases through walls while carrying geological mass, strikes from within solid rock, and phases out leaving behind stone formations where it passed. The Stone Ghost makes the dungeon walls a mobility asset rather than a barrier.',
    lore:'Phantoms phase through solid matter. The geomancer worked with solid matter professionally. The Stone Ghost found that a phantom carrying geological mass phases through walls and leaves that mass behind in configurations the geomancer can specify, which converts every phase-through into both a movement and a terrain modification.'
  },

  lightbringer_beast: {
    id:'lightbringer_beast', name:'The Radiant Pack', icon:'☀️',
    tagline:'The pack that moves in its own light leaves no shadows for enemies to use.',
    color:'#ddcc66', element:'lightbeast', rarity:'rare',
    fusedFrom:['lightbringer','beastmaster'],
    stats:{hp:90,maxHp:90,mp:78,maxMp:78,atk:13,def:9,spd:14,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:7},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','normal_dragon_roar','normal_dragon_surge','light_blood_blast','normal_light_illuminate'],
    burstAbility:'lightbringer_burst',
    passives:['radiant','feral_bond'],
    description:'A pack of light-touched predators — animals marked by divine radiance, coordinating hunts in perfect visibility of their own creation. The Radiant Pack lights its own arena and hunts in conditions where the darkness that prey uses for cover is simply absent.',
    lore:'Predators that hunt by sight benefit from light. The lightbringer provides it. The Radiant Pack creates hunting conditions of pure visibility — no shadows, no cover, no darkness-dependent camouflage. The beastmaster coordinates the hunt and the lightbringer ensures the terrain never advantages the prey.'
  },

  lightbringer_tech: {
    id:'lightbringer_tech', name:'The Solar Engine', icon:'☀️',
    tagline:'Light is energy. This one converts it efficiently.',
    color:'#ddbb44', element:'lighttech', rarity:'epic',
    fusedFrom:['lightbringer','techsavant'],
    stats:{hp:82,maxHp:82,mp:90,maxMp:90,atk:12,def:8,spd:13,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','fire_cyber_overclock','electric_cyber_pulse','steel_light_surge','normal_light_illuminate'],
    burstAbility:'techsavant_burst',
    passives:['radiant','overclock'],
    description:'Technical systems powered by divine light — solar conversion apparatus that overclocks on radiant energy, weapons that channel divine light through technical amplifiers. The Solar Engine makes the lightbringer\'s output a power source and the techsavant\'s machines the delivery mechanism.',
    lore:'The techsavant needed energy. The lightbringer produced it in unlimited quantity. The Solar Engine built the conversion apparatus and found that divine light is a cleaner and more powerful energy source than anything the techsavant had previously worked with, which the techsavant considers a significant professional development.'
  },

  lightbringer_grave: {
    id:'lightbringer_grave', name:'The Sanctified Ground', icon:'☀️',
    tagline:'The light consecrates the grave. What rests there rests in peace. Peace is not the same as inactivity.',
    color:'#ccbb77', element:'lightgrave', rarity:'rare',
    fusedFrom:['lightbringer','gravewarden'],
    stats:{hp:95,maxHp:95,mp:80,maxMp:80,atk:11,def:11,spd:10,crit:11},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:6,MP:8},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','water_ghost_haunt','light_blood_drain','light_void_surge','normal_light_gleam'],
    burstAbility:'lightbringer_burst',
    passives:['radiant','undying'],
    description:'Consecrated burial grounds — graves blessed by divine light, the dead preserved in radiance rather than darkness. The Sanctified Ground calls on the consecrated dead as divine allies rather than undead ones: the distinction matters and the lightbringer insists upon it.',
    lore:'The gravewarden managed the dead with care. The lightbringer blessed the ground they occupied. The Sanctified Ground found that consecrated dead do not become undead in the conventional sense — they become light-touched versions of themselves, which fight differently and the lightbringer considers theologically preferable.'
  },

  lightbringer_magnetist: {
    id:'lightbringer_magnetist', name:'The Polar Light', icon:'☀️',
    tagline:'The aurora is magnetic light. This one has opinions.',
    color:'#bbdd88', element:'lightmagnet', rarity:'epic',
    fusedFrom:['lightbringer','magnetist'],
    stats:{hp:82,maxHp:82,mp:88,maxMp:88,atk:12,def:8,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','fire_magnet_pull','gravity_magnet_blast','steel_light_surge','light_void_blast'],
    burstAbility:'magnetist_burst',
    passives:['radiant','magnetic_field'],
    description:'Magnetic light weaponized — electromagnetic radiation directed by field lines, divine radiance that follows magnetic channels to reach targets behind cover. The Polar Light bends light around obstacles by bending the magnetic field that carries it.',
    lore:'Aurora is light produced by magnetic field interaction. The lightbringer produced the light; the magnetist produced the field. The Polar Light found that light following magnetic field lines can be directed around obstacles and through gaps that straight-line light cannot navigate, which solves the problem of enemies who use cover effectively.'
  },

  lightbringer_crystal: {
    id:'lightbringer_crystal', name:'The Prism Saint', icon:'☀️',
    tagline:'White light contains all light. The crystal separates what was always there.',
    color:'#ddeebb', element:'lightcrystal', rarity:'legendary',
    fusedFrom:['lightbringer','crystalmancer'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:13,def:7,spd:13,crit:17},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:7,MP:9},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','fire_crystal_refract','fire_crystal_shard','light_rune_blast','light_cosmic_surge'],
    burstAbility:'crystalmancer_burst',
    passives:['radiant','crystal_body'],
    description:'Holy light separated into component spectra by crystal refraction — each frequency of divine light has a different effect, and the Prism Saint deploys all of them simultaneously by passing the light through crystal lattices that separate and amplify each band.',
    lore:'White light is all light combined. The crystalmancer separated it. The Prism Saint found that divine white light contains multiple simultaneous effects that normally cancel each other in the combined beam, and that refracting them into component frequencies and delivering each frequency independently multiplies the light\'s effective output considerably.'
  },

  lightbringer_war: {
    id:'lightbringer_war', name:'The Holy Crusade', icon:'☀️',
    tagline:'The warlord who fights for something is harder to stop than one who fights for nothing.',
    color:'#ddbb55', element:'lightwar', rarity:'rare',
    fusedFrom:['lightbringer','warlord'],
    stats:{hp:98,maxHp:98,mp:72,maxMp:72,atk:14,def:10,spd:12,crit:12},
    statDisplay:{HP:6,ATK:10,DEF:7,SPD:7,MP:7},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','fire_fighting_rage','fire_fighting_ignite','light_blood_blast','normal_blood_mark'],
    burstAbility:'lightbringer_burst',
    passives:['radiant','battle_hardened'],
    description:'A crusading warlord sustained by divine conviction — tactical precision in service of holy purpose, the warlord\'s martial expertise amplified by the lightbringer\'s radiant authority. The Holy Crusade does not acknowledge retreat as a valid tactical option.',
    lore:'The warlord fought because it was their profession. The lightbringer fought because it was their calling. The Holy Crusade found that professional expertise combined with divine calling produces a combatant who is both more competent and more motivated than either alone, and that motivation of this kind does not diminish under adverse tactical conditions.'
  },

  lightbringer_spirit: {
    id:'lightbringer_spirit', name:'The Luminous Soul', icon:'☀️',
    tagline:'The spirit that carries light is visible to the living and the dead.',
    color:'#ddddaa', element:'lightspirit', rarity:'epic',
    fusedFrom:['lightbringer','spiritwalker'],
    stats:{hp:85,maxHp:85,mp:88,maxMp:88,atk:11,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','electric_spirit_surge','electric_spirit_veil','light_blood_blast','light_void_surge'],
    burstAbility:'spiritwalker_burst',
    passives:['radiant','spirit_bond'],
    description:'Commands spirits blessed with divine light — spiritual entities visible and radiant in both physical and spirit planes, providing illumination and combat force simultaneously. The Luminous Soul\'s allied spirits are also light sources, which the darkness finds inconvenient.',
    lore:'Spirits are normally invisible. The lightbringer made them radiant. The Luminous Soul found that divine light applied to spirits makes them visible in both physical and spiritual dimensions simultaneously, which the spiritwalker notes makes them harder to coordinate tactically but also considerably harder for enemies to ignore, which serves the combat purpose.'
  },

  lightbringer_hex: {
    id:'lightbringer_hex', name:'The Divine Curse', icon:'☀️',
    tagline:'The holy curse is the most judgmental curse.',
    color:'#ccbb44', element:'lighthex', rarity:'epic',
    fusedFrom:['lightbringer','hexblade'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:12,def:8,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','dark_light_blast','dark_light_final','light_void_blast','light_blood_stance'],
    burstAbility:'hexblade_burst',
    passives:['radiant','hex_master'],
    description:'Holy curses — divine judgment inscribed as hexes, blessings that become curses when applied to the unworthy. The Divine Curse uses the lightbringer\'s divine authority to seal hexes that cannot be removed by conventional means because they were placed by the light, not the darkness.',
    lore:'Hexes traditionally come from dark sources. The lightbringer found that divine authority produces hexes of equal power through different mechanism: a curse from the light is experienced as a judgment rather than an attack, which the hexblade notes is psychologically more disabling because the target cannot object to the assessment without directly challenging the divine authority that made it.'
  },

  lightbringer_cosmo: {
    id:'lightbringer_cosmo', name:'The Stellar Light', icon:'☀️',
    tagline:'Stars are light. The light from all stars at once is significant.',
    color:'#ddeeff', element:'lightcosmo', rarity:'legendary',
    fusedFrom:['lightbringer','cosmomancer'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:10},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','light_cosmic_blast','light_cosmic_surge','light_cosmic_final','light_time_blast'],
    burstAbility:'cosmomancer_burst',
    passives:['radiant','stardust'],
    description:'The combined light output of all observable stars — the cosmomancer\'s astronomical awareness applied to the lightbringer\'s divine radiance, producing a luminance that the dungeon\'s darkness has no answer for. The Stellar Light illuminates simultaneously at astronomical and combat scales.',
    lore:'Stars are essentially divine light sources at astronomical scale. The cosmomancer accessed them professionally. The Stellar Light combined cosmic reach with divine authority and found that the total light output of all observable stars, focused through the lightbringer\'s divine channel, produces a radiance that is both literally and theologically blinding.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_13);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_13);
  FUSION_LOADED_FILES.add(13);
  if(typeof console!=='undefined') console.debug('[Fusion] File 13 loaded (37 classes)');
})();
