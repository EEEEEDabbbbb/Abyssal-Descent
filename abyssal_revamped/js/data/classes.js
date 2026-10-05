// ══════════════════════════════════════════════════════════════
// CLASSES — 10 playable classes + Abyssal One (conquest unlock)
// ══════════════════════════════════════════════════════════════

const CLASSES = {
  shadowblade:{
    id:'shadowblade', name:'Shadowblade', icon:'🗡️',
    tagline:'Strike from darkness. Vanish before retaliation.',
    color:'#6b3fa0', element:'shadow',
    stats:{hp:80,maxHp:80,mp:60,maxMp:60,atk:14,def:5,spd:16,crit:20},
    statDisplay:{HP:6,ATK:9,DEF:4,SPD:10,MP:7},
    abilities:['shadow_strike','vanish','hemorrhage','death_mark','smoke_screen','phantom_step','shadow_web','night_blade'],
    burstAbility:'shadow_burst',
    passives:['shadow_step'],
    description:'Masters of shadow who deal massive burst damage and escape retaliation. High crit chance, low defense.',
    lore:'Once assassins of the Obsidian Court, now cursed to walk between life and shadow.'
  },
  ironclad:{
    id:'ironclad', name:'Ironclad', icon:'🛡️',
    tagline:'An immovable wall. Every blow feeds the counter.',
    color:'#4a7acc', element:'steel',
    stats:{hp:140,maxHp:140,mp:40,maxMp:40,atk:9,def:14,spd:8,crit:5},
    statDisplay:{HP:10,ATK:5,DEF:10,SPD:4,MP:4},
    abilities:['shield_bash','fortify','retaliate','warcry','iron_fortress','earthquake_slam','steel_resolve','bulwark_charge'],
    burstAbility:'ironclad_burst',
    passives:['iron_skin'],
    description:'The unbreakable vanguard. Generates shields and punishes enemies for attacking.',
    lore:'Veteran knights who underwent the Ritual of Unbreaking, fusing their will to steel.'
  },
  soulweaver:{
    id:'soulweaver', name:'Soulweaver', icon:'🌙',
    tagline:'Death is not the end. It is a resource.',
    color:'#2aabab', element:'ghost',
    stats:{hp:70,maxHp:70,mp:100,maxMp:100,atk:8,def:6,spd:10,crit:10},
    statDisplay:{HP:5,ATK:6,DEF:5,SPD:6,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','psychic_rend','spirit_lash','soul_shatter','astral_veil'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest'],
    description:'A manipulator of life force. Drains enemies to heal, applies deadly debuffs, and unleashes soul energy.',
    lore:"Scholars who crossed the veil and returned changed — carrying death's whispers in their veins."
  },
  pyromancer:{
    id:'pyromancer', name:'Pyromancer', icon:'🔥',
    tagline:'Everything burns. Everything ends.',
    color:'#cc2222', element:'fire',
    stats:{hp:75,maxHp:75,mp:90,maxMp:90,atk:7,def:5,spd:11,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','magma_coat','cinder_storm','magma_surge','solar_flare'],
    burstAbility:'pyro_burst',
    passives:['combustion'],
    description:'Chaos incarnate. Stacks Burn on enemies for escalating damage, then detonates it for catastrophic effect.',
    lore:'Cultists of the Eternal Pyre who burned away fear and sanity to wield the primal flame.'
  },
  stormcaller:{
    id:'stormcaller', name:'Stormcaller', icon:'⚡',
    tagline:'The tempest answers to none. Neither will you.',
    color:'#5599dd', element:'electric',
    stats:{hp:85,maxHp:85,mp:80,maxMp:80,atk:11,def:7,spd:14,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:9,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','gust_strike','ball_lightning','storm_ward','tempest_blade'],
    burstAbility:'storm_burst',
    passives:['static_charge'],
    description:'Calls down lightning to chain between enemies and stun. High SPD and CRIT, punishes slow enemies hard.',
    lore:'Survivors of the Maelstrom Wastes who absorbed its endless lightning and learned to release it at will.'
  },
  bloodknight:{
    id:'bloodknight', name:'Blood Knight', icon:'🩸',
    tagline:'Pain is power. Bleed is currency.',
    color:'#aa1111', element:'dark',
    stats:{hp:120,maxHp:120,mp:50,maxMp:50,atk:13,def:11,spd:9,crit:8},
    statDisplay:{HP:9,ATK:9,DEF:8,SPD:5,MP:5},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','hemostrike','blood_ritual','wrath_spiral','crimson_tide_strike'],
    burstAbility:'bloodknight_burst',
    passives:['vital_hunger'],
    description:'A warrior who sacrifices HP to fuel devastating attacks. The lower their health, the more dangerous they become.',
    lore:'Knights who made a pact with the Crimson Abyss, trading a piece of their soul for power that grows with every wound.'
  },
  voidmancer:{
    id:'voidmancer', name:'Voidmancer', icon:'🌀',
    tagline:'Unravel reality. Consume what remains.',
    color:'#7744bb', element:'shadow',
    stats:{hp:65,maxHp:65,mp:110,maxMp:110,atk:9,def:4,spd:10,crit:14},
    statDisplay:{HP:4,ATK:7,DEF:3,SPD:6,MP:11},
    abilities:['void_bolt','entropy','singularity','annihilate','void_shred','reality_rip','cosmic_collapse','gravity_crush'],
    burstAbility:'void_burst',
    passives:['void_affinity'],
    description:'A master of reality-unraveling magic. Applies Entropy to enemies, reducing all their stats over time before obliterating them.',
    lore:'Scholars who stared into the Void too long and were stared back into — but emerged with its power in their hands.'
  },
  runeblade:{
    id:'runeblade', name:'Runeblade', icon:'🔱',
    tagline:'Each rune carved in flesh. Each strike answers in kind.',
    color:'#ddaa22', element:'normal',
    stats:{hp:100,maxHp:100,mp:70,maxMp:70,atk:12,def:9,spd:12,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:8,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','aqua_rune','time_rune','crystal_rune','storm_rune'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery'],
    description:'A balanced warrior who inscribes magical runes to enhance attacks and sap enemy power.',
    lore:'Ancient warriors from the Rune Wastes, their bodies inscribed with power-words that blur the line between blade and spell.'
  },
  necromancer:{
    id:'necromancer', name:'Necromancer', icon:'💀',
    tagline:"The dead serve. The living are just dead that haven't accepted it yet.",
    color:'#33aa66', element:'ghost',
    stats:{hp:70,maxHp:70,mp:120,maxMp:120,atk:8,def:5,spd:9,crit:10},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:5,MP:12},
    abilities:['corpse_bolt','plague','raise_dead','death_spiral','bone_wall','plague_nova','soul_cage','undead_army'],
    burstAbility:'necro_burst',
    passives:['death_aura'],
    description:'Commands the power of death itself. Stacks Plague on enemies for crushing DoT, raises undead to fight alongside them.',
    lore:"Grave-touched cultists of the Bone Sanctum who broke the seals on death's threshold and dragged its secrets back with them."
  },
  paladin:{
    id:'paladin', name:'Paladin', icon:'⚜️',
    tagline:'Light and steel. Wrath and mercy are one.',
    color:'#ddcc55', element:'fairy',
    stats:{hp:130,maxHp:130,mp:60,maxMp:60,atk:11,def:13,spd:8,crit:7},
    statDisplay:{HP:9,ATK:8,DEF:9,SPD:4,MP:6},
    abilities:['holy_strike','divine_shield','consecrate','wrath_of_light','radiant_aura','divine_lance','holy_nova','martyrs_wrath'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura'],
    description:'A holy warrior combining defense and divine damage. Generates shields, smites with holy light, and punishes undead and demons.',
    lore:'Templars of the Sunken Citadel who descended into the abyss not to survive it — but to purge it.'
  },
  frostweaver:{
    id:'frostweaver', name:'Frostweaver', icon:'❄️',
    tagline:'Stop the world. Freeze the rest.',
    color:'#88ddff', element:'ice',
    stats:{hp:72,maxHp:72,mp:95,maxMp:95,atk:10,def:6,spd:10,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:9},
    abilities:['glacial_spike','frost_nova','blizzard_wall','absolute_zero','permafrost','cryogenic_pulse','ice_veil','glacial_spike'],
    burstAbility:'frostweaver_burst',
    passives:['static_charge'],
    description:'A master of ice magic who slows and freezes enemies, then shatters them with amplified damage. Frozen foes take devastating bonus hits.',
    lore:'Survivors of the Glacial Vault who absorbed centuries of frozen time and wield winter itself as a weapon.'
  },
  dragonknight:{
    id:'dragonknight', name:'Dragonknight', icon:'🐉',
    tagline:'The dragon is not a mount. It is what you became.',
    color:'#7038f8', element:'dragon',
    stats:{hp:115,maxHp:115,mp:65,maxMp:65,atk:15,def:11,spd:11,crit:10},
    statDisplay:{HP:8,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['dragon_strike','scale_armor','wyrm_breath','ancient_roar','tail_sweep','draconic_will','dragon_strike','wyrm_breath'],
    burstAbility:'dragonknight_burst',
    passives:['iron_skin'],
    description:'A warrior who has awakened draconic power within. Combines heavy physical might with dragon breath and draconic intimidation.',
    lore:'Knights who consumed a dragon\'s heart and survived — transformed by the fire that should have killed them.'
  },
  tidecaller:{
    id:'tidecaller', name:'Tidecaller', icon:'🌊',
    tagline:'The ocean does not ask. It takes.',
    color:'#2244ff', element:'water',
    stats:{hp:78,maxHp:78,mp:88,maxMp:88,atk:11,def:7,spd:12,crit:12},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['tidal_wave','whirlpool','riptide','ocean_blessing','tidal_surge','wave_crash','tsunami','tidal_pull'],
    burstAbility:'tidecaller_burst',
    passives:['soul_harvest'],
    description:'Commands the power of ocean currents. Drenches enemies for bonus damage, controls the flow of battle, and heals from the tides.',
    lore:'Deep-sea shamans who dove to the abyssal trenches and returned speaking in currents, carrying the ocean\'s wrath.'
  },
  gravitist:{
    id:'gravitist', name:'Gravitist', icon:'🌀',
    tagline:'Everything falls. You decide when.',
    color:'#334455', element:'gravity',
    stats:{hp:68,maxHp:68,mp:105,maxMp:105,atk:12,def:5,spd:9,crit:13},
    statDisplay:{HP:4,ATK:8,DEF:4,SPD:5,MP:10},
    abilities:['gravity_well','crush','gravity_spike','tidal_pull','event_horizon','singularity_point','gravitational_collapse','crushing_depth'],
    burstAbility:'gravitist_burst',
    passives:['void_affinity'],
    description:'Bends gravitational forces to crush enemies. Slows SPD relentlessly, then deals bonus damage for each point of SPD stripped.',
    lore:'Scholars from the Gravity Wells of the Abyssal Pit, who learned to fold the weight of nothing into a weapon.'
  },
  soundbreaker:{
    id:'soundbreaker', name:'Soundbreaker', icon:'🔊',
    tagline:'You\'ll hear it before you die. Both are your fault.',
    color:'#ffbb55', element:'sound',
    stats:{hp:82,maxHp:82,mp:82,maxMp:82,atk:13,def:6,spd:15,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:9,MP:8},
    abilities:['sonic_strike','resonance','shockwave','sonic_blast','resonance_field','frequency_break','subsonic_crush','soundbreaker_burst'],
    burstAbility:'soundbreaker_burst',
    passives:['static_charge'],
    description:'Weaponizes sound itself. Resonance stacks multiply damage over a fight, and shockwaves shatter enemy defenses while stunning them.',
    lore:'Arena champions who fought so many battles their battle cries cracked dungeon walls — now they harness that resonance deliberately.'
  },
  chronomancer:{
    id:'chronomancer', name:'Chronomancer', icon:'⏳',
    tagline:'Time is a resource. You spend it on your enemies.',
    color:'#ddcc88', element:'time',
    stats:{hp:70,maxHp:70,mp:100,maxMp:100,atk:10,def:6,spd:13,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:8,MP:10},
    abilities:['time_slash','rewind','timestop','time_stop','temporal_rift','age_strike','chrono_haste','chronomancer_burst'],
    burstAbility:'chronomancer_burst',
    passives:['soul_harvest'],
    description:'Manipulates time to heal themselves, freeze enemies, and reset cooldowns. The Temporal Collapse burst permanently ages any foe.',
    lore:'Monks of the Broken Clock Tower who repaired time itself and kept a few pieces for themselves.'
  },
  spellsword:{
    id:'spellsword', name:'Spellsword', icon:'⚔️',
    tagline:'Half blade. Half spell. Twice the problem.',
    color:'#9955ff', element:'psychic',
    stats:{hp:95,maxHp:95,mp:75,maxMp:75,atk:13,def:9,spd:13,crit:13},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:8,MP:7},
    abilities:['arcane_slash','mana_shield','spell_blade','arcane_slash','mana_shield','spell_blade','arcane_slash','mana_shield'],
    burstAbility:'spellsword_burst',
    passives:['rune_mastery'],
    description:'A perfect blend of physical and magical combat. Every strike carries arcane force. Spell Blade hits random elements for unpredictable synergies.',
    lore:'Graduates of the Arcane Dueling Academies who mastered both disciplines, refusing to be limited by either.'
  },
  plaguedoctor:{
    id:'plaguedoctor', name:'Plague Doctor', icon:'🎭',
    tagline:'The cure is worse. That\'s the point.',
    color:'#7733aa', element:'poison',
    stats:{hp:72,maxHp:72,mp:95,maxMp:95,atk:10,def:6,spd:10,crit:11},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:9},
    abilities:['inoculate','miasma','quarantine','inoculate','miasma','quarantine','inoculate','miasma'],
    burstAbility:'plague_doctor_burst',
    passives:['death_aura'],
    description:'A methodical debuffer who applies Plague, Miasma, and Quarantine to lock down enemies. The Epidemic burst is a catastrophic final diagnosis.',
    lore:'Physicians of the Pestilent Ward who studied every disease until they could apply them deliberately, with surgical precision.'
  },
  geomancer:{
    id:'geomancer', name:'Geomancer', icon:'🌍',
    tagline:'The earth remembers every step. So does your grave.',
    color:'#aa8833', element:'ground',
    stats:{hp:125,maxHp:125,mp:55,maxMp:55,atk:11,def:14,spd:7,crit:7},
    statDisplay:{HP:9,ATK:7,DEF:10,SPD:4,MP:5},
    abilities:['rock_throw','earth_wall','seismic_wave','rock_throw','earth_wall','seismic_wave','rock_throw','earth_wall'],
    burstAbility:'geomancer_burst',
    passives:['iron_skin'],
    description:'Commands the earth itself. Raises walls for massive defense, hurls boulders, and splits the ground with seismic waves.',
    lore:'Miners who dug too deep into the Abyss, emerged fluent in a language of stone that predates speech.'
  },
  lightbringer:{
    id:'lightbringer', name:'Lightbringer', icon:'💡',
    tagline:'Darkness ends where you stand.',
    color:'#ffff88', element:'light',
    stats:{hp:105,maxHp:105,mp:75,maxMp:75,atk:11,def:10,spd:10,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:7,SPD:6,MP:7},
    abilities:['radiant_strike','blinding_flash','divine_judgment','radiant_strike','blinding_flash','divine_judgment','radiant_strike','blinding_flash'],
    burstAbility:'lightbringer_burst',
    passives:['sacred_aura'],
    description:'A beacon of divine light. Shreds dark and ghost enemies, blinds attackers, and self-heals with every radiant strike.',
    lore:'Pilgrims who descended into the Abyss carrying a single torch and returned as the torch itself.'
  },
  beastmaster:{
    id:'beastmaster', name:'Beastmaster', icon:'🦁',
    tagline:'Civilization is a veneer. You stopped pretending.',
    color:'#aa7722', element:'normal',
    stats:{hp:110,maxHp:110,mp:55,maxMp:55,atk:14,def:8,spd:14,crit:14},
    statDisplay:{HP:8,ATK:9,DEF:6,SPD:9,MP:6},
    abilities:['feral_strike','pack_howl','savage_bite','feral_strike','pack_howl','savage_bite','feral_strike','pack_howl'],
    burstAbility:'beastmaster_burst',
    passives:['vital_hunger'],
    description:'A primal warrior who grows stronger with each consecutive attack. Feral Strike stacks damage, and the Wild Hunt burst is five guaranteed crits.',
    lore:'Hunters exiled from the city-states who lived in the Abyss long enough to remember what they were before they were human.'
  },
  techsavant:{
    id:'techsavant', name:'Techsavant', icon:'🤖',
    tagline:'The machine is not your master. Unless you are the machine.',
    color:'#00ffcc', element:'tech',
    stats:{hp:78,maxHp:78,mp:90,maxMp:90,atk:12,def:7,spd:13,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['overcharge','system_crash','plasma_cannon','overcharge','system_crash','plasma_cannon','overcharge','system_crash'],
    burstAbility:'techsavant_burst',
    passives:['static_charge'],
    description:'Wields advanced technology as a weapon. Crashes enemy systems to devastate all stats, then overloads with a Meltdown that permanently corrupts them.',
    lore:'Engineers from the Mechanic\'s Vault who built machines to fight the Abyss, then realized they were becoming the machines.'
  },
  gravewarden:{
    id:'gravewarden', name:'Gravewarden', icon:'🪦',
    tagline:'You tend the dead. The dead return the favor.',
    color:'#33aa66', element:'ghost',
    stats:{hp:88,maxHp:88,mp:80,maxMp:80,atk:10,def:9,spd:9,crit:10},
    statDisplay:{HP:6,ATK:7,DEF:7,SPD:5,MP:8},
    abilities:['grave_touch','bone_armor','death_knell','grave_touch','bone_armor','death_knell','grave_touch','bone_armor'],
    burstAbility:'gravewarden_burst',
    passives:['death_aura'],
    description:'Guards the boundary between life and death. Heals from every strike, raises bone armor for regeneration, and executes weakened foes.',
    lore:'Caretakers of the Sunken Graveyard who made a pact with its residents — protection in exchange for proper burial rites.'
  },
  magnetist:{
    id:'magnetist', name:'Magnetist', icon:'🧲',
    tagline:'Everything is metal if you pull hard enough.',
    color:'#cc4444', element:'magnet',
    stats:{hp:80,maxHp:80,mp:85,maxMp:85,atk:12,def:7,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:7,MP:8},
    abilities:['magnetic_pull','iron_rain','magnetic_pull','iron_rain','magnetic_pull','iron_rain','magnetic_pull','iron_rain'],
    burstAbility:'magnetist_burst',
    passives:['rune_mastery'],
    description:'Turns metal against its wielder. Iron Rain shreds DEF in three stacked hits, and Polarity Crush permanently cripples enemy defense.',
    lore:'Smiths from the Magnetic Wastes who hammered so many blades they became the force that shapes metal instead.'
  },
  crystalmancer:{
    id:'crystalmancer', name:'Crystalmancer', icon:'💎',
    tagline:'Precision. Refraction. Annihilation.',
    color:'#aaddff', element:'crystal',
    stats:{hp:72,maxHp:72,mp:98,maxMp:98,atk:11,def:6,spd:11,crit:18},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['crystal_shot','crystal_barrier','prism_blast','crystal_shot','crystal_barrier','prism_blast','crystal_shot','crystal_barrier'],
    burstAbility:'crystalmancer_burst',
    passives:['shadow_step'],
    description:'A glass cannon who lives and dies on crit chance. Crystal Shot ricochets on crit, and Prism Blast splits into multi-element chaos.',
    lore:'Jewelers who cut gemstones until they understood refraction on a molecular level — and learned to apply it to combat.'
  },
  warlord:{
    id:'warlord', name:'Warlord', icon:'⚔️',
    tagline:'Victory is not the goal. Domination is.',
    color:'#cc5500', element:'fighting',
    stats:{hp:130,maxHp:130,mp:55,maxMp:55,atk:14,def:13,spd:10,crit:9},
    statDisplay:{HP:9,ATK:10,DEF:9,SPD:6,MP:6},
    abilities:['war_cry','cleave','berserker_rage','war_cry','cleave','berserker_rage','war_cry','cleave'],
    burstAbility:'warlord_burst',
    passives:['iron_skin'],
    description:'A battlefield commander who stacks DEF reduction with every Cleave and becomes increasingly dangerous with Berserker Rage. The Conquest burst is five blows that shred through anything.',
    lore:'Generals of the Endless War who outlived their armies and eventually became the war itself.'
  },
  spiritwalker:{
    id:'spiritwalker', name:'Spiritwalker', icon:'👼',
    tagline:'Both worlds answer to you. Neither one owns you.',
    color:'#eeddff', element:'spirit',
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:10,def:8,spd:11,crit:10},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['spirit_touch','soul_link','spirit_surge','spirit_touch','soul_link','spirit_surge','spirit_touch','soul_link'],
    burstAbility:'spiritwalker_burst',
    passives:['sacred_aura'],
    description:'A bridge between the living and spirit world. Every strike heals. Soul Link reflects damage back at attackers. Transcendence grants invulnerability.',
    lore:'Wanderers who followed the dead a little too far and found the path back — but kept one foot on each side of it.'
  },
  hexblade:{
    id:'hexblade', name:'Hexblade', icon:'🔯',
    tagline:'Every word is a curse. You know them all.',
    color:'#bb33bb', element:'dark',
    stats:{hp:82,maxHp:82,mp:80,maxMp:80,atk:13,def:7,spd:12,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:8,MP:8},
    abilities:['hex_strike','doom_sigil','hex_strike','doom_sigil','hex_strike','doom_sigil','hex_strike','doom_sigil'],
    burstAbility:'hexblade_burst',
    passives:['shadow_step'],
    description:'Curses enemies with stacking stat penalties and timed detonation. Doom Sigil explodes for 400% after 3 turns. The Hexfall burst curses all stats simultaneously.',
    lore:'Hexsmiths of the Cursed Tribunal who inscribed forbidden words into their blades until the words started writing themselves.'
  },
  cosmomancer:{
    id:'cosmomancer', name:'Cosmomancer', icon:'🌌',
    tagline:'The universe has a power budget. You are overdrawn.',
    color:'#5533cc', element:'cosmic',
    stats:{hp:65,maxHp:65,mp:115,maxMp:115,atk:9,def:4,spd:10,crit:15},
    statDisplay:{HP:4,ATK:7,DEF:3,SPD:6,MP:12},
    abilities:['stardust','nebula_shield','supernova','stardust','nebula_shield','supernova','stardust','nebula_shield'],
    burstAbility:'cosmomancer_burst',
    passives:['void_affinity'],
    description:'Applies Stardust DoT then detonates it with Supernova for compounding damage. The Big Bang burst is the highest raw damage ability in the game.',
    lore:'Astronomers who observed a star go supernova from too close and absorbed the event rather than being destroyed by it.'
  },
  pestilencelord:{
    id:'pestilencelord', name:'Pestilence Lord', icon:'🦠',
    tagline:'You did not bring the plague. You are the plague.',
    color:'#660088', element:'poison',
    stats:{hp:68,maxHp:68,mp:105,maxMp:105,atk:9,def:5,spd:9,crit:10},
    statDisplay:{HP:4,ATK:6,DEF:4,SPD:5,MP:11},
    abilities:['plague_lance','virulent_bloom','plague_lance','virulent_bloom','plague_lance','virulent_bloom','plague_lance','virulent_bloom'],
    burstAbility:'pestilence_lord_burst',
    passives:['death_aura'],
    description:'A specialist in Plague stacking. Virulent Bloom doubles existing Plague stacks and shreds enemy ATK/SPD. The Black Death burst applies 15 Plague stacks with stat decay.',
    lore:'High priests of the Blight Temple who spent decades cataloguing every disease and eventually became the catalogue.'
  },
  windwalker:{
    id:'windwalker', name:'Windwalker', icon:'🌪️',
    tagline:'You\'re not faster than the wind. You\'re the wind.',
    color:'#bbffff', element:'wind',
    stats:{hp:76,maxHp:76,mp:78,maxMp:78,atk:12,def:5,spd:19,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:12,MP:9},
    abilities:['gust_blade','tempest_step','cyclone','gust_blade','tempest_step','cyclone','gust_blade','tempest_step'],
    burstAbility:'windwalker_burst',
    passives:['shadow_step'],
    description:'The highest SPD class in the game. Gust Blade double-hits when you outspeed the enemy. Cyclone stacks combo with every hit. Fastest burst in the dungeon.',
    lore:'Nomads of the Howling Wastes who ran so long against the wind that they forgot which one of them was supposed to stop.'
  },
  doomcaster:{
    id:'doomcaster', name:'Doomcaster', icon:'☄️',
    tagline:'There is no defense. There is only how long you last.',
    color:'#440044', element:'dark',
    stats:{hp:62,maxHp:62,mp:120,maxMp:120,atk:9,def:3,spd:10,crit:16},
    statDisplay:{HP:4,ATK:7,DEF:2,SPD:6,MP:12},
    abilities:['doom_bolt','inevitable_end','apocalypse','doom_bolt','inevitable_end','apocalypse','doom_bolt','inevitable_end'],
    burstAbility:'doomcaster_burst',
    passives:['void_affinity'],
    description:'Maximum offense, minimum defense. Doom Bolt stacks to 10x damage. Inevitable End executes below 20% HP. The Extinction Event burst is the highest single-hit damage ability.',
    lore:'Scholars who read the Book of Endings and could not stop reading — until the book started reading them back.'
  },
  arcanist:{
    id:'arcanist', name:'Arcanist', icon:'🔮',
    tagline:'Magic is a language. You speak it fluently.',
    color:'#cc44ff', element:'psychic',
    stats:{hp:65,maxHp:65,mp:115,maxMp:115,atk:8,def:4,spd:11,crit:15},
    statDisplay:{HP:4,ATK:6,DEF:3,SPD:7,MP:12},
    abilities:['necrotic_bolt','psychic_rend','gravity_crush','necrotic_bolt','psychic_rend','gravity_crush','soul_shatter','astral_veil'],
    burstAbility:'void_burst',
    passives:['soul_harvest'],
    description:'A pure-magic generalist who combines psychic, gravity, and ghost elements. Highest MP pool, enormous magic damage, glass-cannon survivability.',
    lore:'Arcane scholars who studied every school of magic without picking one — and quietly became the most dangerous casters alive.'
  },
  sentinel:{
    id:'sentinel', name:'Sentinel', icon:'🗡️',
    tagline:'The line does not move. Neither do you.',
    color:'#335577', element:'steel',
    stats:{hp:145,maxHp:145,mp:45,maxMp:45,atk:10,def:16,spd:7,crit:6},
    statDisplay:{HP:10,ATK:6,DEF:11,SPD:4,MP:5},
    abilities:['shield_bash','fortify','retaliate','warcry','iron_fortress','steel_resolve','bulwark_charge','shield_bash'],
    burstAbility:'ironclad_burst',
    passives:['iron_skin'],
    description:'An even more defensive variant than the Ironclad. Maximum HP and DEF. Every ability is a survivability tool. Wins by outlasting everything.',
    lore:'Wardens of the Last Gate who never once retreated in recorded history — and were eventually assigned to the Abyss.'
  },
  phantom:{
    id:'phantom',  name:'Phantom', icon:'👻',
    tagline:'You were never here. You were never anywhere.',
    color:'#8866cc', element:'ghost',
    stats:{hp:68,maxHp:68,mp:88,maxMp:88,atk:11,def:4,spd:18,crit:22},
    statDisplay:{HP:5,ATK:8,DEF:3,SPD:11,MP:10},
    abilities:['shadow_strike','vanish','phantom_step','death_mark','soul_drain','psychic_rend','shadow_web','night_blade'],
    burstAbility:'shadow_burst',
    passives:['shadow_step'],
    description:'A ghost-element assassin combining the best of Shadowblade and Soulweaver. Highest crit in the game at base. Lives in Vanish, strikes from the spirit world.',
    lore:'Shadowblades who died once and came back as something harder to kill — because you cannot kill what is already a ghost.'
  },

  // ── SECRET BOSS UNLOCK CLASSES — each unlocked by defeating a specific secret boss ──
  voidreaper:{
    id:'voidreaper', name:'Voidreaper', icon:'🌑',
    tagline:'The threshold is not a warning. It is an invitation.',
    color:'#9900cc', element:'void',
    stats:{hp:75,maxHp:75,mp:110,maxMp:110,atk:16,def:4,spd:13,crit:18},
    statDisplay:{HP:5,ATK:11,DEF:3,SPD:8,MP:10},
    abilities:['void_harvest','threshold_cut','oblivion_mark','null_cascade','void_harvest','threshold_cut','oblivion_mark','null_cascade'],
    burstAbility:'voidreaper_burst',
    passives:['void_affinity','void_mastery'],
    description:'An execute specialist who sets thresholds that rise as the fight continues. Each kill raises the execute ceiling permanently.',
    lore:'The Herald did not survive the encounter. What came back wearing its shape was something that had learned from it.'
  },
  plagueborn:{
    id:'plagueborn', name:'Plagueborn', icon:'🦠',
    tagline:'The disease is not the weapon. The disease IS you.',
    color:'#44aa22', element:'poison',
    stats:{hp:80,maxHp:80,mp:100,maxMp:100,atk:11,def:6,spd:11,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['rot_touch','spore_cloud','festering_wound','plague_cascade','rot_touch','spore_cloud','festering_wound','plague_cascade'],
    burstAbility:'plagueborn_burst',
    passives:['death_aura','plague_lord'],
    description:'A DoT specialist with 4 distinct diseases that stack independently. When all 4 are active simultaneously, they detonate each other in sequence.',
    lore:'It did not catch The Rot. It became a better version of it.'
  },
  stormlord:{
    id:'stormlord', name:'Stormlord', icon:'⛈️',
    tagline:'Every strike is a promise. The burst is the delivery.',
    color:'#3388ff', element:'electric',
    stats:{hp:78,maxHp:78,mp:105,maxMp:105,atk:14,def:5,spd:17,crit:20},
    statDisplay:{HP:5,ATK:10,DEF:3,SPD:10,MP:10},
    abilities:['charge_strike','storm_coil','lightning_cage','discharge','charge_strike','storm_coil','lightning_cage','discharge'],
    burstAbility:'stormlord_burst',
    passives:['static_charge','storm_mastery'],
    description:'A burst specialist that accumulates Storm Charge across turns. Each stored charge multiplies the next detonation. At 10 charges, abilities auto-upgrade.',
    lore:'The Tempest Unbound was a ceiling. The Stormlord removed it.'
  },
  soulrender:{
    id:'soulrender', name:'Soulrender', icon:'👁️',
    tagline:'You do not run out of enemies. You run out of soul.',
    color:'#cc4488', element:'ghost',
    stats:{hp:85,maxHp:85,mp:95,maxMp:95,atk:13,def:7,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:9},
    abilities:['soul_rip','life_siphon','spectral_drain','soul_collapse','soul_rip','life_siphon','spectral_drain','soul_collapse'],
    burstAbility:'soulrender_burst',
    passives:['soul_harvest','undying'],
    description:'A drain specialist that converts all damage dealt into HP and MP. Above 90% HP, all abilities gain +40% damage. Below 30% HP, lifesteal triples.',
    lore:'The Undying Horror collected everything it killed. The Soulrender learned to spend that collection.'
  },
  abyssal_tyrant:{
    id:'abyssal_tyrant', name:'Abyssal Tyrant', icon:'🔱',
    tagline:'Nothing acts without permission. You stopped giving it.',
    color:'#885500', element:'dark',
    stats:{hp:100,maxHp:100,mp:90,maxMp:90,atk:13,def:10,spd:10,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:6,MP:8},
    abilities:['dominion','stat_shatter','ability_lock','total_suppression','dominion','stat_shatter','ability_lock','total_suppression'],
    burstAbility:'abyssal_tyrant_burst',
    passives:['abyssal_presence','intimidation'],
    description:'A control specialist that methodically removes enemy capabilities. Each ability locks out a different combat option — ATK, SPD, DEF, or actions entirely.',
    lore:'The First Warden held the Abyss in order for eons. The Abyssal Tyrant inherited that authority and pointed it at everything.'
  },

  // ── DIVINE CLASS — Deep dungeon unlock ──
  nullbringer:{
    id:'nullbringer', name:'Nullbringer', icon:'🌑',
    tagline:'You were never a threat. I simply haven\'t erased you yet.',
    color:'#1a0033', element:'void',
    stats:{hp:95,maxHp:95,mp:115,maxMp:115,atk:12,def:6,spd:11,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:4,SPD:7,MP:12},
    abilities:['sunder_flesh','sunder_will','sunder_form','sunder_time','sunder_existence','sunder_will','sunder_form','sunder_flesh'],
    burstAbility:'nullbringer_burst',
    passives:['anatomical_study'],
    description:'Dismantles enemies layer by layer. Each Sunder permanently removes a part of the enemy — healing, ATK, DEF, SPD, or their passive. Anatomical Study grants +18% damage per active Sunder, reaching +90% at full deconstruction.',
    lore:'There are no records of where Nullbringers come from. Only records of what they left behind — which is nothing.'
  },

};

// ── Class unlock costs ──
const CLASS_UNLOCK_COSTS = {
  // COMMON — F0–F4
  shadowblade:   { shardCost:0,   floor:0  },
  ironclad:      { shardCost:0,   floor:0  },
  pyromancer:    { shardCost:30,  floor:2  },
  geomancer:     { shardCost:40,  floor:3  },
  sentinel:      { shardCost:40,  floor:3  },
  beastmaster:   { shardCost:50,  floor:4  },

  // UNCOMMON — F5–F10
  stormcaller:   { shardCost:65,  floor:5  },
  bloodknight:   { shardCost:70,  floor:6  },
  runeblade:     { shardCost:75,  floor:7  },
  tidecaller:    { shardCost:75,  floor:7  },
  windwalker:    { shardCost:85,  floor:8  },
  warlord:       { shardCost:95,  floor:9  },
  gravewarden:   { shardCost:105, floor:10 },

  // RARE — F12–F18
  frostweaver:   { shardCost:130, floor:12 },
  paladin:       { shardCost:145, floor:13 },
  dragonknight:  { shardCost:160, floor:14 },
  soulweaver:    { shardCost:175, floor:15 },
  necromancer:   { shardCost:175, floor:15 },
  lightbringer:  { shardCost:185, floor:16 },
  spellsword:    { shardCost:200, floor:17 },
  soundbreaker:  { shardCost:200, floor:17 },
  magnetist:     { shardCost:215, floor:18 },

  // EPIC — F20–F26
  gravitist:     { shardCost:240, floor:20 },
  plaguedoctor:  { shardCost:260, floor:21 },
  voidmancer:    { shardCost:280, floor:22 },
  techsavant:    { shardCost:295, floor:23 },
  chronomancer:  { shardCost:310, floor:24 },
  hexblade:      { shardCost:330, floor:25 },
  spiritwalker:  { shardCost:345, floor:26 },

  // LEGENDARY — F29–F35
  crystalmancer: { shardCost:380, floor:29 },
  pestilencelord:{ shardCost:420, floor:32 },
  arcanist:      { shardCost:460, floor:35 },

  // MYTHICAL — F38–F43
  doomcaster:    { shardCost:520, floor:38 },
  cosmomancer:   { shardCost:580, floor:43 },

  // DIVINE — F46–F47
  phantom:       { shardCost:650, floor:46 },
  nullbringer:   { shardCost:700, floor:47 },

};
