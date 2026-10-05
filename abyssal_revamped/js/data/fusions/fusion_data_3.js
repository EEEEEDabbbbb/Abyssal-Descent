// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 3 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_3 = {
  'soulweaver+tidecaller': 'soul_tide',
  'gravitist+soulweaver': 'soul_gravitist',
  'soulweaver+soundbreaker': 'soul_soundbreaker',
  'chronomancer+soulweaver': 'soul_chrono',
  'soulweaver+spellsword': 'soul_spellsword',
  'plaguedoctor+soulweaver': 'soul_plague',
  'geomancer+soulweaver': 'soul_geo',
  'lightbringer+soulweaver': 'soul_lightbringer',
  'beastmaster+soulweaver': 'soul_beast',
  'soulweaver+techsavant': 'soul_tech',
  'gravewarden+soulweaver': 'soul_grave',
  'magnetist+soulweaver': 'soul_magnetist',
  'crystalmancer+soulweaver': 'soul_crystal',
  'soulweaver+warlord': 'soul_war',
  'soulweaver+spiritwalker': 'soul_spirit',
  'hexblade+soulweaver': 'soul_hex',
  'cosmomancer+soulweaver': 'soul_cosmo',
  'pestilencelord+soulweaver': 'soul_pestilence',
  'soulweaver+windwalker': 'soul_wind',
  'doomcaster+soulweaver': 'soul_doom',
  'arcanist+soulweaver': 'soul_arcanist',
  'sentinel+soulweaver': 'undying_wall',
  'phantom+soulweaver': 'soul_phantom',
  'pyromancer+stormcaller': 'pyro_storm',
  'bloodknight+pyromancer': 'pyro_blood',
  'pyromancer+voidmancer': 'pyro_void',
  'pyromancer+runeblade': 'pyro_rune',
  'necromancer+pyromancer': 'pyro_necro',
  'paladin+pyromancer': 'pyro_paladin',
  'frostweaver+pyromancer': 'pyro_frost',
  'dragonknight+pyromancer': 'pyro_dragon',
  'pyromancer+tidecaller': 'pyro_tide',
  'gravitist+pyromancer': 'pyro_gravitist',
  'pyromancer+soundbreaker': 'pyro_soundbreaker',
  'chronomancer+pyromancer': 'pyro_chrono',
  'pyromancer+spellsword': 'pyro_spellsword',
  'plaguedoctor+pyromancer': 'pyro_plague',
  'geomancer+pyromancer': 'pyro_geo'
};

const FUSION_CLASSES_3 = {
  soul_tide: {
    id:'soul_tide', name:'Drowned Oracle', icon:'🌊',
    tagline:'It hears the dead in the water. It answers them.',
    color:'#37a2bc', element:'ghost', elementFlavor:'tidesoul', rarity:'rare',
    fusedFrom:['soulweaver','tidecaller'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:10,def:7,spd:12,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','water_ghost_drown','water_ghost_haunt','water_ghost_wraith','water_ghost_torrent'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','tidal_flow'],
    description:'Channels the voices of the drowned, using their energy to power tidal attacks. Water becomes a conduit for soul energy — touching the tide means touching every soul ever lost to it.',
    lore:'The tidecaller listened to the water. The soulweaver listened to the dead. Enough drowned souls are in the water that eventually the distinction stopped mattering.'
  },

  soul_gravitist: {
    id:'soul_gravitist', name:'Singularity Monk', icon:'⚫',
    tagline:'The soul is heavy. It falls toward its own end.',
    color:'#378089', element:'gravity', elementFlavor:'gravesoul', rarity:'epic',
    fusedFrom:['soulweaver','gravitist'],
    stats:{hp:73,maxHp:73,mp:98,maxMp:98,atk:9,def:6,spd:11,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','normal_gravity_crush','normal_gravity_pull','normal_gravity_anchor','fire_gravity_well'],
    burstAbility:'gravitist_burst',
    passives:['soul_harvest','gravity_well'],
    description:'Uses gravitational force to accelerate soul drain — compresses targets so tightly their spiritual essence bleeds out under pressure. At full power, creates a gravitational singularity that pulls in nearby souls.',
    lore:'Mass warps space. Souls warp something else. The Singularity Monk found the formula that relates the two, and has been weaponizing it ever since.'
  },

  soul_soundbreaker: {
    id:'soul_soundbreaker', name:'The Wailing', icon:'🔇',
    tagline:'It screams the names of the dead. The dead answer.',
    color:'#84ab80', element:'sound', elementFlavor:'wailsoul', rarity:'epic',
    fusedFrom:['soulweaver','soundbreaker'],
    stats:{hp:75,maxHp:75,mp:93,maxMp:93,atk:11,def:6,spd:13,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_sound_roar','fire_sound_resonance','fire_sound_blast','fire_sound_scorch'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','resonance'],
    description:'Broadcasts the anguish of harvested souls as sonic weaponry. The sound that comes out is not noise — it is memory, compressed into a frequency that bypasses armor and strikes directly at the will to exist.',
    lore:'What does a stolen soul sound like? The Wailing knows. It has been answering that question, operationally, for longer than anyone remaining can remember.'
  },

  soul_chrono: {
    id:'soul_chrono', name:'Remnant Hourglass', icon:'⏳',
    tagline:'It borrows time from the dying. It never returns it.',
    color:'#6a9ad5', element:'time', elementFlavor:'timeghost', rarity:'epic',
    fusedFrom:['soulweaver','chronomancer'],
    stats:{hp:70,maxHp:70,mp:105,maxMp:105,atk:9,def:6,spd:12,crit:12},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','normal_time_strike','normal_time_rewind','normal_time_echo','normal_time_stasis'],
    burstAbility:'chronomancer_burst',
    passives:['soul_harvest','time_warp'],
    description:'Drains both soul and time from targets simultaneously. Every year stolen extends the caster\'s own. Targets aged by the Remnant Hourglass do not die young — they die ancient, suddenly.',
    lore:'You cannot take back time from the dead. The Remnant Hourglass skips that problem by taking it from enemies while they are still alive enough to feel the loss.'
  },

  soul_spellsword: {
    id:'soul_spellsword', name:'Mindreaper', icon:'🔮',
    tagline:'It reads your thoughts. Then it empties them.',
    color:'#6a78ab', element:'psychic', elementFlavor:'mindghost', rarity:'epic',
    fusedFrom:['soulweaver','spellsword'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:11,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_psychic_fever','fire_psychic_focus','fire_psychic_blaze','fire_psychic_thought'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','spellblade'],
    description:'Attacks mind and soul simultaneously, shredding psychic defenses before draining the spiritual essence underneath. Targets weakened by the Mindreaper lose not just health — they lose the ability to think clearly about fighting back.',
    lore:'The spellsword cut through armor. The soulweaver cut through life. The Mindreaper cuts through the part that decides to resist, first, and then handles the rest at leisure.'
  },

  soul_plague: {
    id:'soul_plague', name:'Soulrot', icon:'🧫',
    tagline:'The plague rots the body. This one rots what is underneath.',
    color:'#5a8855', element:'poison', elementFlavor:'blightsoul', rarity:'epic',
    fusedFrom:['soulweaver','plaguedoctor'],
    stats:{hp:73,maxHp:73,mp:100,maxMp:100,atk:9,def:7,spd:11,crit:12},
    statDisplay:{HP:5,ATK:6,DEF:5,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_poison_corrode','fire_poison_plague','fire_bug_plague','fire_poison_miasma'],
    burstAbility:'plague_doctor_burst',
    passives:['soul_harvest','immunity'],
    description:'Engineered a plague that attacks the soul directly rather than the body. Targets look fine on the outside while their spiritual essence dissolves. By the time symptoms become visible, there is nothing left to treat.',
    lore:'The plaguedoctor said: if we could target the soul, we could cure things medicine cannot reach. The soulweaver said: yes. And the other direction also works.'
  },

  soul_geo: {
    id:'soul_geo', name:'Gravemound', icon:'🪨',
    tagline:'The earth holds the dead. It does not forget them.',
    color:'#8a7255', element:'ghost', elementFlavor:'earthsoul', rarity:'rare',
    fusedFrom:['soulweaver','geomancer'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:10,def:9,spd:9,crit:10},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:5,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_ground_quake','fire_ground_eruption','fire_rock_forge','fire_grass_wither'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','earth_body'],
    description:'Every burial site is a power source. Draws soul energy from the dead buried in the earth, using the weight of generations to fuel devastating geological attacks. The older the ground, the stronger the magic.',
    lore:'Every graveyard is a battery. The Gravemound simply learned how to plug into it. The dead, having nothing else to do, do not object.'
  },

  soul_lightbringer: {
    id:'soul_lightbringer', name:'Requiem Light', icon:'🕯️',
    tagline:'The light at the end does not guide. It harvests.',
    color:'#d4a855', element:'ghost', elementFlavor:'soulight', rarity:'epic',
    fusedFrom:['soulweaver','lightbringer'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:11,def:8,spd:12,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_light_radiant','fire_light_beacon','fire_fairy_blessing','fire_spirit_purge'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','radiant'],
    description:'The light it casts is not for guidance — it is a lure. Souls are drawn toward it instinctively, and the Requiem Light is very good at receiving what comes. Targets feel a pull toward peace. They do not reach it.',
    lore:'Every culture has a light at the end. The Requiem Light studied that phenomenon extensively, from the perspective of whoever was doing the collecting.'
  },

  soul_beast: {
    id:'soul_beast', name:'Spiriteater', icon:'🐺',
    tagline:'It hunts the soul, not the body. The body just comes with it.',
    color:'#886644', element:'ghost', elementFlavor:'beastsoul', rarity:'rare',
    fusedFrom:['soulweaver','beastmaster'],
    stats:{hp:83,maxHp:83,mp:83,maxMp:83,atk:12,def:8,spd:13,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_fighting_rage','fire_fighting_combo','water_ghost_haunt','water_ghost_wraith'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','feral_bond'],
    description:'A predator with spiritually-attuned senses. Tracks targets by the spiritual signatures they leave behind, then attacks both the physical and spiritual simultaneously — feral body, precise soul.',
    lore:'Animals do not believe in souls. The beastmaster worked around this by partnering with something that believes in nothing except the hunt, and finds both kinds of prey equally interesting.'
  },

  soul_tech: {
    id:'soul_tech', name:'Ghost In The Machine', icon:'💾',
    tagline:'The ghost found the machine. The machine found a use.',
    color:'#4488aa', element:'ghost', elementFlavor:'ghosttech', rarity:'epic',
    fusedFrom:['soulweaver','techsavant'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:10,def:7,spd:13,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:8,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_cyber_overclock','fire_cyber_virus_burn','fire_tech_circuit','fire_cyber_firewall'],
    burstAbility:'techsavant_burst',
    passives:['soul_harvest','overclock'],
    description:'Uploads harvested souls directly into its own systems as processing power. Each soul drained improves reaction time, attack optimization, and targeting precision. An AI running on stolen consciousness.',
    lore:'The techsavant asked: what if we used soul energy as a power source? The soulweaver said: you would need a compatible interface. The techsavant built one. This was, technically, a breakthrough.'
  },

  soul_grave: {
    id:'soul_grave', name:'Barrowborn', icon:'🪦',
    tagline:'Born from graves. Returns to them enriched.',
    color:'#557766', element:'ghost', elementFlavor:'gravesoul', rarity:'rare',
    fusedFrom:['soulweaver','gravewarden'],
    stats:{hp:93,maxHp:93,mp:83,maxMp:83,atk:10,def:10,spd:9,crit:10},
    statDisplay:{HP:6,ATK:7,DEF:7,SPD:5,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','water_ghost_wraith','water_ghost_drown','water_ghost_phase','water_ghost_haunt'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','undying'],
    description:'A guardian of graves who also fills them. Controls the boundary between death and undeath with surgical precision — decides what stays down, what rises, and what gets harvested for energy.',
    lore:'The gravewarden kept the dead from rising. The soulweaver decided which ones were worth keeping. Together they realized: the two skills are the same skill, applied in different directions.'
  },

  soul_magnetist: {
    id:'soul_magnetist', name:'Soulpuller', icon:'🧲',
    tagline:'It does not chase souls. It reaches.',
    color:'#557799', element:'ghost', elementFlavor:'magsoul', rarity:'epic',
    fusedFrom:['soulweaver','magnetist'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:11,def:8,spd:11,crit:12},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_magnet_pull','fire_magnet_flux','fire_magnet_strike','normal_gravity_pull'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','magnetic_field'],
    description:'Generates a magnetic-spiritual field that attracts souls from a distance. Enemies across the arena feel their life force tugged toward the Soulpuller. Closing the distance just means it does not have to reach as far.',
    lore:'The magnetist learned to pull iron. The soulweaver learned to pull souls. They discovered, somewhat to their mutual surprise, that this is the same technique with different target material.'
  },

  soul_crystal: {
    id:'soul_crystal', name:'The Shardcage', icon:'💎',
    tagline:'Souls do not need a vessel. But they cannot escape a cage.',
    color:'#aa88cc', element:'crystal', elementFlavor:'crystalsoul', rarity:'legendary',
    fusedFrom:['soulweaver','crystalmancer'],
    stats:{hp:70,maxHp:70,mp:100,maxMp:100,atk:12,def:6,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_crystal_shard','fire_crystal_refract','fire_crystal_resonance','fire_crystal_ignition'],
    burstAbility:'crystalmancer_burst',
    passives:['soul_harvest','crystal_body'],
    description:'Traps harvested souls inside crystal matrices — they cannot leave, cannot be rescued, and are slowly consumed as fuel. Crystal shards detonated near these cages release the trapped souls as pure destructive energy.',
    lore:'The crystalmancer said: this structure is theoretically perfect. The soulweaver said: perfect for what? The crystalmancer had not considered that question. The answer, once found, was uncomfortable but effective.'
  },

  soul_war: {
    id:'soul_war', name:'Warlord Undying', icon:'⚔️',
    tagline:'It commands armies. It commands itself to not stop.',
    color:'#884422', element:'ghost', elementFlavor:'warsoul', rarity:'rare',
    fusedFrom:['soulweaver','warlord'],
    stats:{hp:95,maxHp:95,mp:78,maxMp:78,atk:13,def:9,spd:11,crit:11},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_fighting_rage','fire_fighting_combo','fire_fighting_ignite','water_ghost_haunt'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','battle_hardened'],
    description:'Refuses to die through sheer tactical force of will, constantly draining nearby souls to maintain combat effectiveness. Fallen enemies become reserves — their stolen energy fuels the next assault wave.',
    lore:'The warlord said: I will not retreat. The soulweaver said: then you need a different supply chain. They built one. It runs on everything nearby that stops moving.'
  },

  soul_spirit: {
    id:'soul_spirit', name:'The Undivided', icon:'🌿',
    tagline:'Spirit and soul are the same word in the oldest language.',
    color:'#559966', element:'ghost', elementFlavor:'twinsoul', rarity:'epic',
    fusedFrom:['soulweaver','spiritwalker'],
    stats:{hp:80,maxHp:80,mp:93,maxMp:93,atk:10,def:8,spd:12,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:6,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','water_ghost_phase','fire_spirit_sanctuary','fire_spirit_purge','water_ghost_haunt'],
    burstAbility:'spiritwalker_burst',
    passives:['soul_harvest','spirit_bond'],
    description:'Has achieved a complete merger of spiritual and soul energies. Exists partially in the spirit plane at all times — can see both the living and the dead, and act on both simultaneously.',
    lore:'The spiritwalker walked between worlds. The soulweaver moved between life and death. They discovered the worlds and the divide are the same geography. They have been exploring it together since.'
  },

  soul_hex: {
    id:'soul_hex', name:'Deathhex', icon:'🔮',
    tagline:'The curse reaches where the blade cannot. The soul goes further still.',
    color:'#885599', element:'ghost', elementFlavor:'hexsoul', rarity:'epic',
    fusedFrom:['soulweaver','hexblade'],
    stats:{hp:75,maxHp:75,mp:95,maxMp:95,atk:11,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_dark_eclipse','fire_dark_consumption','fire_dark_shroud','fire_void_devour'],
    burstAbility:'hexblade_burst',
    passives:['soul_harvest','hex_master'],
    description:'Curses enemies at the soul level — hexes that cannot be removed because they are inscribed on something beneath the body. The Deathhex does not just weaken enemies; it makes their spiritual essence hostile to themselves.',
    lore:'Hexes break. Curses can be lifted. This one cannot, because it is not on the person — it is on the thing inside the person that makes them a person. Getting at that requires a very specific type of expertise.'
  },

  soul_cosmo: {
    id:'soul_cosmo', name:'Void Between Stars', icon:'🌌',
    tagline:'Between every star is darkness. Between every soul is nothing.',
    color:'#334488', element:'cosmic', elementFlavor:'cosmosoul', rarity:'legendary',
    fusedFrom:['soulweaver','cosmomancer'],
    stats:{hp:70,maxHp:70,mp:108,maxMp:108,atk:10,def:6,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_cosmic_solar','fire_cosmic_nebula','normal_cosmic_null','fire_cosmic_stardust'],
    burstAbility:'cosmomancer_burst',
    passives:['soul_harvest','stardust'],
    description:'Harvests souls at a cosmic scale — not just from enemies, but from the ambient spiritual energy of the universe itself. Channels stellar death as soul fuel. The bigger the target, the more it takes.',
    lore:'Stars die too. Not quickly, not easily, but they do. The Void Between Stars has learned to be present for that, and to make use of it. The universe has no objections it can articulate.'
  },

  soul_pestilence: {
    id:'soul_pestilence', name:'The Undying Plague', icon:'☣️',
    tagline:'Plagues die out. This one learned not to.',
    color:'#558833', element:'ghost', elementFlavor:'plagueghost', rarity:'legendary',
    fusedFrom:['soulweaver','pestilencelord'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:10,def:7,spd:11,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_poison_plague','fire_bug_plague','fire_bug_hive','fire_poison_corrode'],
    burstAbility:'pestilence_lord_burst',
    passives:['soul_harvest','plague_lord'],
    description:'A plague that spreads through spiritual contact rather than physical. Cannot be quarantined because it passes between souls rather than bodies. Every soul harvested becomes a new vector for transmission.',
    lore:'The pestilencelord wanted a plague that could not be cured. The soulweaver said: put it somewhere doctors cannot reach. They found a location. Doctors remain frustrated by this.'
  },

  soul_wind: {
    id:'soul_wind', name:'Howling Remnant', icon:'💨',
    tagline:'The wind carries the dead. It always has.',
    color:'#6688aa', element:'ghost', elementFlavor:'windsoul', rarity:'rare',
    fusedFrom:['soulweaver','windwalker'],
    stats:{hp:75,maxHp:75,mp:85,maxMp:85,atk:11,def:6,spd:16,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_wind_thermal','fire_wind_cyclone','fire_wind_ember','ghost_wind_blast'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','gust'],
    description:'Rides wind currents loaded with harvested soul energy. Strikes from every direction as a howling vortex of spiritual force, then is gone — carried to the next target before the last one has finished falling.',
    lore:'The wind was always carrying something. The windwalker knew this. The soulweaver asked what. When they looked carefully, neither was entirely comfortable with the answer, but both found it useful.'
  },

  soul_doom: {
    id:'soul_doom', name:'Harbinger', icon:'💀',
    tagline:'Doom is already decided. It just needs delivery.',
    color:'#554433', element:'ghost', elementFlavor:'doomsoul', rarity:'legendary',
    fusedFrom:['soulweaver','doomcaster'],
    stats:{hp:70,maxHp:70,mp:105,maxMp:105,atk:10,def:5,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_dark_consumption','fire_void_devour','fire_void_hollowing','fire_dark_eclipse'],
    burstAbility:'doomcaster_burst',
    passives:['soul_harvest','doom_aura'],
    description:'Marks souls for destruction before the body arrives at the inevitable conclusion. The doom and the soul drain are the same motion — by the time the doom lands, there is nothing left to anchor the target to the living.',
    lore:'The doomcaster marked fates. The soulweaver harvested what was left after fates concluded. They realized they could run the same operation simultaneously, saving significant time.'
  },

  soul_arcanist: {
    id:'soul_arcanist', name:'The Obliteration', icon:'📚',
    tagline:'Magic erases matter. Soul magic erases more than that.',
    color:'#6655bb', element:'ghost', elementFlavor:'arcanesoul', rarity:'legendary',
    fusedFrom:['soulweaver','arcanist'],
    stats:{hp:68,maxHp:68,mp:110,maxMp:110,atk:9,def:5,spd:12,crit:14},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_psychic_blaze','fire_psychic_fever','fire_void_voidfire','fire_void_devour'],
    burstAbility:'void_burst',
    passives:['soul_harvest','arcane_mastery'],
    description:'The theoretical limit of soul magic — combines arcane amplification with direct soul destruction to unmake targets at the foundational level. Does not kill enemies. Removes them from the underlying structure of the dungeon.',
    lore:'The arcanist studied the rules of reality. The soulweaver studied the rules of existence. Together they found the clause that says both can be revoked. They are still deciding whether this is a discovery or a warning.'
  },

  undying_wall: {
    id:'undying_wall', name:'The Undying Wall', icon:'🛡️',
    tagline:'It will not move. It will not end. You will.',
    color:'#556688', element:'ghost', elementFlavor:'soulshard', rarity:'rare',
    fusedFrom:['soulweaver','sentinel'],
    stats:{hp:115,maxHp:115,mp:70,maxMp:70,atk:9,def:13,spd:8,crit:8},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:7},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_spirit_sanctuary','water_ghost_phase','water_ghost_haunt','fire_light_beacon'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','bastion'],
    description:'A fortress of soul energy and iron will. Cannot be outlasted — constantly drains nearby life force to sustain itself indefinitely. The longer a siege goes, the more the Undying Wall benefits.',
    lore:'The sentinel refused to fall. The soulweaver refused to run out of fuel. Together they became something that simply cannot be ended by conventional means, and several unconventional ones.'
  },

  soul_phantom: {
    id:'soul_phantom', name:'Void Between Breaths', icon:'👻',
    tagline:'It exists in the pause. Between heartbeats. Between thoughts.',
    color:'#8866cc', element:'ghost', elementFlavor:'phansoul', rarity:'mythical',
    fusedFrom:['soulweaver','phantom'],
    stats:{hp:70,maxHp:70,mp:90,maxMp:90,atk:12,def:5,spd:15,crit:19},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','water_ghost_wraith','water_ghost_phase','water_ghost_drown','water_ghost_haunt'],
    burstAbility:'shadow_burst',
    passives:['soul_harvest','phase'],
    description:'A fusion so complete it has stopped being a class and become a state. Exists only partially — the rest of it is somewhere between the living world and wherever souls go. Attacks from that in-between place. Cannot be struck while transitioning.',
    lore:'Two things that were already partially absent merged and became almost entirely absent. What remains is enough to kill you. The rest of it is somewhere you cannot follow.'
  },

  pyro_storm: {
    id:'pyro_storm', name:'Stormforged', icon:'⛈️',
    tagline:'Where fire meets lightning, the air itself becomes the weapon.',
    color:'#cc6622', element:'fire', elementFlavor:'stormfire', rarity:'uncommon',
    fusedFrom:['pyromancer','stormcaller'],
    stats:{hp:80,maxHp:80,mp:85,maxMp:85,atk:10,def:6,spd:13,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_storm_spark','fire_storm_tempest','fire_electric_chain','fire_storm_overload'],
    burstAbility:'storm_burst',
    passives:['combustion','static_charge'],
    description:'Channels both fire and electricity simultaneously, producing plasma-temperature attacks that burn and arc simultaneously. A single strike can ignite and paralyze the same target in the same motion.',
    lore:'The fire found the lightning. The lightning found something to carry. They have been moving together through storms ever since, neither one willing to let the other be the more dangerous thing in the sky.'
  },

  pyro_blood: {
    id:'pyro_blood', name:'Cauterizer', icon:'🩸',
    tagline:'Fire stops the bleeding. It also causes it. Both are useful.',
    color:'#cc3322', element:'fire', elementFlavor:'bloodfire', rarity:'uncommon',
    fusedFrom:['pyromancer','bloodknight'],
    stats:{hp:98,maxHp:98,mp:70,maxMp:70,atk:11,def:8,spd:11,crit:11},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:7,MP:7},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_blood_scorch','fire_blood_bloodboil','fire_blood_hemorrhage','fire_blood_vitaldrain'],
    burstAbility:'bloodknight_burst',
    passives:['combustion','vital_hunger'],
    description:'Uses fire both offensively and medically — cauterizes its own wounds in real time while inflicting burns that cause uncontrolled hemorrhage in targets. Gets stronger as it takes damage; heals faster than most can deal it.',
    lore:'The bloodknight bled for power. The pyromancer burned for power. They found a synthesis: burn the things that bleed. The resulting power is considerable.'
  },

  pyro_void: {
    id:'pyro_void', name:'Nullfire', icon:'🌑',
    tagline:'Fire that consumes even the absence of things.',
    color:'#772299', element:'fire', elementFlavor:'voidfire', rarity:'rare',
    fusedFrom:['pyromancer','voidmancer'],
    stats:{hp:70,maxHp:70,mp:100,maxMp:100,atk:9,def:5,spd:11,crit:14},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_void_sear','fire_void_devour','fire_void_hollowing','fire_void_voidfire'],
    burstAbility:'void_burst',
    passives:['combustion','void_affinity'],
    description:'Void-infused fire that burns matter and the absence of matter simultaneously. Targets hit by Nullfire find that healing is impossible — the void component consumes restorative energy as fast as it arrives.',
    lore:'What does void burn like? Nobody had asked this before because the question seemed paradoxical. The answer is: hotter than regular fire, and in more directions.'
  },

  pyro_rune: {
    id:'pyro_rune', name:'Blazing Inscription', icon:'🔱',
    tagline:'The rune ignites. Everything it touches remembers the fire.',
    color:'#cc6611', element:'fire', elementFlavor:'runefire', rarity:'uncommon',
    fusedFrom:['pyromancer','runeblade'],
    stats:{hp:88,maxHp:88,mp:80,maxMp:80,atk:10,def:7,spd:12,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:5,SPD:7,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_rune_brand','fire_rune_glyph','fire_rune_sigil','fire_rune_inscription'],
    burstAbility:'runeblade_burst',
    passives:['combustion','rune_mastery'],
    description:'Burns runes directly into enemies as brands — each mark is both a wound and a trap. Triggered runes detonate as fire from the inside. The Blazing Inscription does not need to hit twice; the first mark does the rest.',
    lore:'The runeblade carved its marks carefully, with intention. The pyromancer said: what if the mark was also on fire? The runeblade considered this. The results were thorough.'
  },

  pyro_necro: {
    id:'pyro_necro', name:'Ashwalker', icon:'💀',
    tagline:'Fire does not destroy. It transforms. The dead know this.',
    color:'#886633', element:'fire', elementFlavor:'ashbone', rarity:'rare',
    fusedFrom:['pyromancer','necromancer'],
    stats:{hp:73,maxHp:73,mp:105,maxMp:105,atk:8,def:5,spd:11,crit:12},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_ghost_soulburn','fire_ghost_shade','fire_ghost_haunt','fire_grass_wither'],
    burstAbility:'necro_burst',
    passives:['combustion','death_aura'],
    description:'Burns enemies and raises what remains as ash constructs — undead made of char and bone that retain the heat of their creation. An ash army does not tire and does not stop burning.',
    lore:'The necromancer learned that fire-dead are different from regular dead. More aggressive. More purposeful. Still obedient, thankfully — though the pyromancer remained cautious for reasons that were, technically, professional.'
  },

  pyro_paladin: {
    id:'pyro_paladin', name:'Pyre Saint', icon:'🔥',
    tagline:'Sanctify through fire. Both kinds of fire.',
    color:'#dd9922', element:'fire', elementFlavor:'holyfire', rarity:'rare',
    fusedFrom:['pyromancer','paladin'],
    stats:{hp:103,maxHp:103,mp:75,maxMp:75,atk:10,def:9,spd:10,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:6,SPD:6,MP:7},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_fairy_blessing','fire_light_beacon','fire_light_radiant','fire_fairy_charm'],
    burstAbility:'paladin_burst',
    passives:['combustion','sacred_aura'],
    description:'Holy fire purges as it burns — heals allies, cleanses curses, and devastates undead, all with the same flame. The Pyre Saint sees no contradiction between healing and burning. They are the same ministry.',
    lore:'The paladin said: fire purifies. The pyromancer said: fire destroys. They argued about which was more important until they discovered the fire did not care about the distinction.'
  },

  pyro_frost: {
    id:'pyro_frost', name:'The Tempering', icon:'🌡️',
    tagline:'Steel is made by fire and water together. So is this.',
    color:'#5599cc', element:'fire', elementFlavor:'steamfire', rarity:'rare',
    fusedFrom:['pyromancer','frostweaver'],
    stats:{hp:78,maxHp:78,mp:88,maxMp:88,atk:9,def:7,spd:12,crit:14},
    statDisplay:{HP:5,ATK:6,DEF:5,SPD:7,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_ice_steam_strike','fire_ice_frost_burn','fire_ice_temperature_shock','fire_ice_thermal_shift'],
    burstAbility:'frostweaver_burst',
    passives:['combustion','frost_mastery'],
    description:'Alternates between fire and ice in rapid succession — the thermal shock from extreme temperature change is more destructive than either element alone. Targets shatter from the inside out.',
    lore:'Fire and ice should cancel each other. They do, briefly, at the exact point of contact, in a shockwave that is somehow worse than both of them separately. This was unexpected. It is being used productively.'
  },

  pyro_dragon: {
    id:'pyro_dragon', name:'True Drakefire', icon:'🐉',
    tagline:'One breathes fire by birthright. One earned it.',
    color:'#cc5511', element:'fire', elementFlavor:'drakefire', rarity:'rare',
    fusedFrom:['pyromancer','dragonknight'],
    stats:{hp:103,maxHp:103,mp:70,maxMp:70,atk:12,def:9,spd:11,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:7,MP:7},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_dragon_breath','fire_dragon_rage','fire_dragon_scale','fire_dragon_claw'],
    burstAbility:'dragonknight_burst',
    passives:['combustion','intimidation'],
    description:'Dragon fire amplified by pyromantic mastery — hotter, more precise, and refined into focused beams that pierce armor rather than washing over it. A dragon knight who stopped pretending fire was incidental to the job.',
    lore:'The dragon had fire. The pyromancer had understanding of fire. Together they achieved fire with opinions — specific, targeted, and difficult to argue with.'
  },

  pyro_tide: {
    id:'pyro_tide', name:'The Scalding', icon:'♨️',
    tagline:'The water boils. Then everything else does.',
    color:'#cc4433', element:'fire', elementFlavor:'scaldtide', rarity:'uncommon',
    fusedFrom:['pyromancer','tidecaller'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:9,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:5,SPD:7,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_water_boil','fire_water_scald','fire_water_mist','fire_water_vapor'],
    burstAbility:'tidecaller_burst',
    passives:['combustion','tidal_flow'],
    description:'Superheats water into scalding steam clouds and pressure attacks. Floods areas with boiling tide, then ignites the steam. In an enclosed dungeon corridor, this is as bad as it sounds.',
    lore:'The tidecaller called the water. The pyromancer asked what happens if you heat it first. The tidecaller considered this. The answer involves a lot of steam and a significant restructuring of the local architecture.'
  },

  pyro_gravitist: {
    id:'pyro_gravitist', name:'Collapsing Star', icon:'🌟',
    tagline:'Everything falls toward the heat. Then into it.',
    color:'#cc4422', element:'fire', elementFlavor:'gravfire', rarity:'rare',
    fusedFrom:['pyromancer','gravitist'],
    stats:{hp:75,maxHp:75,mp:93,maxMp:93,atk:9,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_gravity_crush','fire_gravity_pull','fire_gravity_forge','fire_space_supernova'],
    burstAbility:'gravitist_burst',
    passives:['combustion','gravity_well'],
    description:'Creates miniature stellar collapse events — gravitational wells packed with fire that draw enemies in and compress them. Replicates the conditions inside a dying star, at a more personal scale.',
    lore:'A star is fire with enough mass to pull everything toward it. The Collapsing Star studied this and decided the scale was wrong — too big to be personal, not personal enough to be a weapon. It fixed that.'
  },

  pyro_soundbreaker: {
    id:'pyro_soundbreaker', name:'The Detonation', icon:'💥',
    tagline:'Sound travels through fire. Fire answers the call.',
    color:'#cc6633', element:'fire', elementFlavor:'pyrowave', rarity:'rare',
    fusedFrom:['pyromancer','soundbreaker'],
    stats:{hp:78,maxHp:78,mp:88,maxMp:88,atk:10,def:6,spd:14,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_sound_blast','fire_sound_roar','fire_sound_resonance','fire_sound_scorch'],
    burstAbility:'soundbreaker_burst',
    passives:['combustion','resonance'],
    description:'Uses sound waves to direct and focus fire — sonic detonations that channel flame into targeted explosions. The sound arrives first as a warning; the fire answers it a half-second later.',
    lore:'Sound is pressure. Fire spreads through pressure. The Detonation works by ensuring both happen in the same place simultaneously, which produces an event that neither discipline would have achieved alone.'
  },

  pyro_chrono: {
    id:'pyro_chrono', name:'Eternal Flame', icon:'🕰️',
    tagline:'Fire that burns outside of time cannot be extinguished inside it.',
    color:'#cc5522', element:'fire', elementFlavor:'timfire', rarity:'rare',
    fusedFrom:['pyromancer','chronomancer'],
    stats:{hp:73,maxHp:73,mp:100,maxMp:100,atk:9,def:6,spd:13,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:8,MP:10},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_time_blaze','fire_time_rewind','fire_time_scorch','normal_time_strike'],
    burstAbility:'chronomancer_burst',
    passives:['combustion','time_warp'],
    description:'Burns enemies across time — applies fire damage that extends backward and forward from the point of contact. Enemies find themselves burning before they were struck and after they are healed. The Eternal Flame cannot be put out because time does not cooperate.',
    lore:'Fire is extinguished when it runs out of fuel. Give fire a time dimension to move through and it never runs out. This was a theoretical insight. It became a practical problem very quickly.'
  },

  pyro_spellsword: {
    id:'pyro_spellsword', name:'The Igniting Word', icon:'📜',
    tagline:'Every spell ends in fire. That is not a coincidence.',
    color:'#cc4455', element:'fire', elementFlavor:'spellfire', rarity:'rare',
    fusedFrom:['pyromancer','spellsword'],
    stats:{hp:83,maxHp:83,mp:85,maxMp:85,atk:10,def:7,spd:12,crit:14},
    statDisplay:{HP:6,ATK:7,DEF:5,SPD:7,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_psychic_fever','fire_psychic_blaze','fire_space_flare','fire_cosmic_solar'],
    burstAbility:'spellsword_burst',
    passives:['combustion','spellblade'],
    description:'Every spell it casts ends with an ignition — psychic blasts that leave targets burning mentally as well as physically. Combines arcane damage with fire damage in every technique, resulting in overlapping wounds that neither can individually heal.',
    lore:'The spellsword said: the word has power. The pyromancer said: power produces heat. They found this observation had practical implications and applied them systematically.'
  },

  pyro_plague: {
    id:'pyro_plague', name:'The Burning Sickness', icon:'🔥',
    tagline:'The plague spreads through fire. The fire spreads the plague.',
    color:'#886622', element:'fire', elementFlavor:'plaguefire', rarity:'rare',
    fusedFrom:['pyromancer','plaguedoctor'],
    stats:{hp:75,maxHp:75,mp:95,maxMp:95,atk:9,def:6,spd:11,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_poison_sear','fire_poison_plague','fire_bug_plague','fire_poison_corrode'],
    burstAbility:'plague_doctor_burst',
    passives:['combustion','immunity'],
    description:'Disperses plague through fire — burning attacks carry engineered diseases that spread on contact with heat. The fire spreads the plague; the plague makes the fire worse. A self-amplifying system with no natural ceiling.',
    lore:'The plaguedoctor said: heat kills most pathogens. The pyromancer said: most. The plaguedoctor said: yes. They spent several months on the exceptions and produced something that uses fire as a vector rather than a cure.'
  },

  pyro_geo: {
    id:'pyro_geo', name:'The Magmaborn', icon:'🌋',
    tagline:'The earth was molten once. It remembers.',
    color:'#cc4400', element:'fire', elementFlavor:'magmastone', rarity:'uncommon',
    fusedFrom:['pyromancer','geomancer'],
    stats:{hp:88,maxHp:88,mp:80,maxMp:80,atk:10,def:9,spd:10,crit:12},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:6,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_ground_quake','fire_ground_eruption','fire_magma_erupt','fire_magma_lava_flow'],
    burstAbility:'pyro_burst',
    passives:['combustion','earth_body'],
    description:'Calls on the primordial fire inside the earth — erupts magma through the dungeon floor, turns stone to lava, and uses geological force to direct burning rock at precisely calculated targets. The dungeon is its weapon.',
    lore:'The geomancer shook the earth. The pyromancer heated it. They found that at a certain depth, the earth is already melted, and it is just waiting for permission to come up.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_3);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_3);
  FUSION_LOADED_FILES.add(3);
  if(typeof console!=='undefined') console.debug('[Fusion] File 3 loaded (38 classes)');
})();
