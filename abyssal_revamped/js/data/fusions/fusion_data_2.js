// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 2 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_2 = {
  'ironclad+voidmancer': 'void_warden',
  'ironclad+runeblade': 'runeguard',
  'ironclad+necromancer': 'bone_fortress',
  'ironclad+paladin': 'sacred_guardian',
  'frostweaver+ironclad': 'glacial_vanguard',
  'dragonknight+ironclad': 'dragon_fortress',
  'ironclad+tidecaller': 'tide_bastion',
  'gravitist+ironclad': 'gravity_fortress',
  'ironclad+soundbreaker': 'resonant_fortress',
  'chronomancer+ironclad': 'timeless_vanguard',
  'ironclad+spellsword': 'arcane_vanguard',
  'ironclad+plaguedoctor': 'plague_bulwark',
  'geomancer+ironclad': 'earthen_colossus',
  'ironclad+lightbringer': 'divine_vanguard',
  'beastmaster+ironclad': 'iron_predator',
  'ironclad+techsavant': 'iron_automaton',
  'gravewarden+ironclad': 'undying_fortress',
  'ironclad+magnetist': 'magnetic_colossus',
  'crystalmancer+ironclad': 'crystal_bastion',
  'ironclad+warlord': 'iron_warlord',
  'ironclad+spiritwalker': 'spirit_fortress',
  'hexblade+ironclad': 'hexed_iron',
  'cosmomancer+ironclad': 'cosmic_vanguard',
  'ironclad+pestilencelord': 'plague_colossus',
  'ironclad+windwalker': 'gale_vanguard',
  'doomcaster+ironclad': 'doom_fortress',
  'arcanist+ironclad': 'arcane_bulwark',
  'ironclad+sentinel': 'eternal_bastion',
  'ironclad+phantom': 'iron_specter',
  'pyromancer+soulweaver': 'soulfire_channeler',
  'soulweaver+stormcaller': 'storm_soul',
  'bloodknight+soulweaver': 'blood_weaver',
  'soulweaver+voidmancer': 'void_weaver',
  'runeblade+soulweaver': 'soul_runeweaver',
  'necromancer+soulweaver': 'necrospirit',
  'paladin+soulweaver': 'sacred_soul',
  'frostweaver+soulweaver': 'frost_soul',
  'dragonknight+soulweaver': 'dragon_spirit'
};

const FUSION_CLASSES_2 = {
  void_warden: {
    id:'void_warden', name:'Void Warden', icon:'🌀',
    tagline:'The armor does not stop the void. It becomes the void.',
    color:'#6644aa', element:'voidsteel', rarity:'rare',
    fusedFrom:['ironclad','voidmancer'],
    stats:{hp:103,maxHp:103,mp:75,maxMp:75,atk:10,def:9,spd:9,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:6,SPD:5,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','normal_void_slash','normal_void_pierce','normal_gravity_anchor','normal_cosmic_null'],
    burstAbility:'void_burst',
    passives:['iron_skin','void_affinity'],
    description:'Armor infused with the void itself. Attacks pass through its defenses only to vanish — absorbed into a null space within the iron. Retaliates by launching compressed void shards.',
    lore:'The void does not need to destroy things. It simply needs to make them stop existing. The armor understood this better than its wearer.'
  },

  runeguard: {
    id:'runeguard', name:'Runeguard', icon:'🔱',
    tagline:'Inscribed in iron. The runes do not break.',
    color:'#7755aa', element:'runeforge', rarity:'uncommon',
    fusedFrom:['ironclad','runeblade'],
    stats:{hp:120,maxHp:120,mp:55,maxMp:55,atk:12,def:12,spd:11,crit:9},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:7},
    abilities:['shield_bash','fortify','retaliate','warcry','normal_time_strike','normal_time_echo','normal_ice_shard','normal_storm_conduct'],
    burstAbility:'runeblade_burst',
    passives:['iron_skin','rune_mastery'],
    description:'Every plate of armor is a rune. Every rune is a trap. Attackers who strike the Runeguard trigger inscribed counterspells — ice, storm, time-lock — embedded directly into the steel.',
    lore:'The smith did not know they were writing. They thought they were decorating. When the runes first fired, everyone in the forge was surprised — except the armor.'
  },

  bone_fortress: {
    id:'bone_fortress', name:'Bone Fortress', icon:'🦴',
    tagline:'The dead do not tire. The fortress does not fall.',
    color:'#558866', element:'soulsteel', rarity:'rare',
    fusedFrom:['ironclad','necromancer'],
    stats:{hp:105,maxHp:105,mp:80,maxMp:80,atk:9,def:10,spd:9,crit:8},
    statDisplay:{HP:7,ATK:6,DEF:7,SPD:5,MP:8},
    abilities:['shield_bash','fortify','retaliate','warcry','soul_drain','necrotic_bolt','water_ghost_haunt','astral_veil'],
    burstAbility:'necro_burst',
    passives:['iron_skin','death_aura'],
    description:'An iron bastion reinforced by necrotic energy. Fallen enemies are incorporated into its defenses, adding their bones to the wall. The longer a siege lasts, the more the fortress grows.',
    lore:'The necromancer said: everything that falls feeds us. The ironclad said: nothing falls. They were both right, in different ways, and now nothing falls except the things attacking them.'
  },

  sacred_guardian: {
    id:'sacred_guardian', name:'Sacred Guardian', icon:'⚜️',
    tagline:'Holy steel does not bend. Neither do its convictions.',
    color:'#bbaa33', element:'sacredsteel', rarity:'rare',
    fusedFrom:['ironclad','paladin'],
    stats:{hp:135,maxHp:135,mp:50,maxMp:50,atk:11,def:14,spd:8,crit:7},
    statDisplay:{HP:9,ATK:8,DEF:10,SPD:5},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_light_beacon','fire_light_blind','fire_fairy_charm','fire_fairy_blessing'],
    burstAbility:'paladin_burst',
    passives:['iron_skin','sacred_aura'],
    description:'Iron consecrated by divine fire. Enemies who strike the Guardian are blinded by reflected holy light. Those who persist are struck by righteousness that does not distinguish between justice and punishment.',
    lore:'It does not ask for faith. It does not need faith. It simply requires that you stop trying to destroy what it is protecting. This requirement, it enforces absolutely.'
  },

  glacial_vanguard: {
    id:'glacial_vanguard', name:'Glacial Vanguard', icon:'🧊',
    tagline:'A wall of ice. A thousand ways to die on it.',
    color:'#88ddff', element:'glacialsteel', rarity:'rare',
    fusedFrom:['ironclad','frostweaver'],
    stats:{hp:110,maxHp:110,mp:63,maxMp:63,atk:10,def:12,spd:11,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_ice_frost_burn','fire_ice_thermal_shift','fire_ice_temperature_shock','fire_ice_steam_strike'],
    burstAbility:'frostweaver_burst',
    passives:['iron_skin','frost_mastery'],
    description:'A moving glacier of iron and ice. Freezes attackers to its surface mid-strike, holds them there until the cold finishes what the steel started.',
    lore:'The glacier does not chase. It simply waits. The enemies ran at it. They are still there, technically. You can see their outlines in the ice if you look closely enough.'
  },

  dragon_fortress: {
    id:'dragon_fortress', name:'Dragon Fortress', icon:'🐉',
    tagline:'A fortress that breathes fire. A dragon that refuses to fall.',
    color:'#886622', element:'dragonforge', rarity:'rare',
    fusedFrom:['ironclad','dragonknight'],
    stats:{hp:135,maxHp:135,mp:45,maxMp:45,atk:13,def:14,spd:9,crit:8},
    statDisplay:{HP:9,ATK:9,DEF:10,SPD:5},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_dragon_scale','fire_dragon_rage','fire_steel_smelt','fire_steel_temper'],
    burstAbility:'dragonknight_burst',
    passives:['iron_skin','intimidation'],
    description:'Dragon scales forged into iron plate, fire breathed through reinforced vents. An impenetrable wall that attacks back with dragonfire. Siege it and get burned. Rush it and get crushed.',
    lore:'Dragons are not known for defense. This one learned. It learned that when nothing can breach you, the battle is already decided — and it is not decided against you.'
  },

  tide_bastion: {
    id:'tide_bastion', name:'Tide Bastion', icon:'🌊',
    tagline:'The sea breaks on the fortress. The fortress endures.',
    color:'#3377aa', element:'tidewall', rarity:'uncommon',
    fusedFrom:['ironclad','tidecaller'],
    stats:{hp:113,maxHp:113,mp:65,maxMp:65,atk:10,def:12,spd:11,crit:9},
    statDisplay:{HP:8,ATK:7,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','water_ghost_drown','water_ghost_phase','shadow_water_depths','shadow_water_leech'],
    burstAbility:'tidecaller_burst',
    passives:['iron_skin','tidal_flow'],
    description:'Iron infused with tidal power. Commands the water around it defensively — drowning attackers, pulling them down, and using the current as an extension of the fortress wall.',
    lore:'The tide does not negotiate. The iron does not negotiate. Nothing about the Tide Bastion negotiates. This is useful.'
  },

  gravity_fortress: {
    id:'gravity_fortress', name:'Gravity Fortress', icon:'⚫',
    tagline:'The weight of the fortress bends reality.',
    color:'#445577', element:'gravisteel', rarity:'rare',
    fusedFrom:['ironclad','gravitist'],
    stats:{hp:108,maxHp:108,mp:68,maxMp:68,atk:10,def:11,spd:10,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:8,SPD:6,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','normal_gravity_crush','normal_gravity_pull','normal_gravity_anchor','fire_gravity_well'],
    burstAbility:'gravitist_burst',
    passives:['iron_skin','gravity_well'],
    description:'So heavily armored it bends the gravity around it. Enemies are pulled toward it involuntarily, weapons fly from their hands toward its surface, and attacks land with crushing gravitational amplification.',
    lore:'It did not move toward them. Gravity moved them toward it. There is an important distinction. The distinction did not help them.'
  },

  resonant_fortress: {
    id:'resonant_fortress', name:'Resonant Fortress', icon:'🔊',
    tagline:'The fortress shakes the earth with its voice.',
    color:'#6677aa', element:'resonantsteel', rarity:'rare',
    fusedFrom:['ironclad','soundbreaker'],
    stats:{hp:110,maxHp:110,mp:63,maxMp:63,atk:12,def:11,spd:12,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_sound_roar','fire_sound_resonance','fire_sound_blast','fire_sound_scorch'],
    burstAbility:'soundbreaker_burst',
    passives:['iron_skin','resonance'],
    description:'Iron tuned to resonant frequency. When struck, it does not absorb impact — it amplifies it outward as a shockwave that shatters everything nearby. Hitting the Resonant Fortress is the worst mistake a melee enemy can make.',
    lore:'They told it to be quiet. It was. Then it hit back at the exact frequency that causes stone to crumble, and was quiet again, and nobody told it anything after that.'
  },

  timeless_vanguard: {
    id:'timeless_vanguard', name:'Timeless Vanguard', icon:'⏳',
    tagline:'The fortress that has always stood. Will always stand.',
    color:'#7766aa', element:'timesteel', rarity:'rare',
    fusedFrom:['ironclad','chronomancer'],
    stats:{hp:105,maxHp:105,mp:75,maxMp:75,atk:10,def:11,spd:11,crit:9},
    statDisplay:{HP:7,ATK:7,DEF:8,SPD:7,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','normal_time_strike','normal_time_rewind','normal_time_echo','normal_time_stasis'],
    burstAbility:'chronomancer_burst',
    passives:['iron_skin','time_warp'],
    description:'Exists partially outside of time. Attacks that should have landed already haven\'t yet. Wounds that were dealt are being considered for reversal. The Timeless Vanguard has already defended against attacks that have not been made.',
    lore:'How old is it? It does not know. Time is a path it walks in both directions, depending on need. The armor has never been new. It has also never been old.'
  },

  arcane_vanguard: {
    id:'arcane_vanguard', name:'Arcane Vanguard', icon:'🗡️',
    tagline:'The spells are in the armor.',
    color:'#6644aa', element:'spellsteel', rarity:'rare',
    fusedFrom:['ironclad','spellsword'],
    stats:{hp:115,maxHp:115,mp:60,maxMp:60,atk:12,def:12,spd:11,crit:10},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_psychic_focus','fire_psychic_fever','fire_psychic_blaze','fire_psychic_thought'],
    burstAbility:'spellsword_burst',
    passives:['iron_skin','spellblade'],
    description:'Armor inscribed with active psychic wards. Psychic attacks bounce back. Melee attacks trigger arcane counterspells. Standing near the Arcane Vanguard is the magical equivalent of touching a live wire.',
    lore:'The spellsword said: the blade is just a channel for the spell. The ironclad said: so is the armor. They are now the same thing, which makes them considerably harder to fight.'
  },

  plague_bulwark: {
    id:'plague_bulwark', name:'Plague Bulwark', icon:'🩺',
    tagline:'The fortress that infects everything it touches.',
    color:'#558844', element:'plagueiron', rarity:'rare',
    fusedFrom:['ironclad','plaguedoctor'],
    stats:{hp:108,maxHp:108,mp:70,maxMp:70,atk:10,def:11,spd:9,crit:9},
    statDisplay:{HP:7,ATK:7,DEF:8,SPD:5,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_poison_venom','fire_poison_corrode','fire_poison_plague','fire_poison_miasma'],
    burstAbility:'plaguedoctor_burst',
    passives:['iron_skin','immunity'],
    description:'A walking quarantine zone. The armor drips with engineered pestilence — touch it and contract a disease. Strike it and the impact aerosolizes the contagion. The plague bulwark does not need to attack. It simply has to be near you.',
    lore:'The plaguedoctor said: do no harm. The ironclad said: harm everything that comes close. They found a middle position that technically satisfies both.'
  },

  earthen_colossus: {
    id:'earthen_colossus', name:'Earthen Colossus', icon:'🪨',
    tagline:'Built from the mountain. Part of it now.',
    color:'#886644', element:'earthensteel', rarity:'uncommon',
    fusedFrom:['ironclad','geomancer'],
    stats:{hp:120,maxHp:120,mp:55,maxMp:55,atk:11,def:14,spd:8,crit:8},
    statDisplay:{HP:8,ATK:8,DEF:10,SPD:5},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_ground_quake','fire_ground_eruption','fire_rock_forge','fire_rock_eruption'],
    burstAbility:'ironclad_burst',
    passives:['iron_skin','earth_body'],
    description:'Iron and earth, merged into something that is less armor and more geology. Raises stone walls mid-combat, triggers localized earthquakes as defensive measures, and is as difficult to move as the mountain it came from.',
    lore:'The mountain did not object to being shaped. It simply waited. The Earthen Colossus is still waiting. It will be waiting after you are done.'
  },

  divine_vanguard: {
    id:'divine_vanguard', name:'Divine Vanguard', icon:'☀️',
    tagline:'Holy light inside iron will. Neither yields.',
    color:'#ccbb44', element:'divinesteel', rarity:'rare',
    fusedFrom:['ironclad','lightbringer'],
    stats:{hp:113,maxHp:113,mp:63,maxMp:63,atk:12,def:12,spd:11,crit:10},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_light_radiant','fire_light_beacon','fire_fairy_charm','fire_light_blind'],
    burstAbility:'lightbringer_burst',
    passives:['iron_skin','radiant'],
    description:'Solar-powered iron — armor that absorbs and stores radiant energy, then unleashes it as blinding pulses that sear through darkness and expose hidden attackers.',
    lore:'It is hard to ambush something that illuminates everything within thirty feet. The Divine Vanguard renders most stealth tactics inconvenient.'
  },

  iron_predator: {
    id:'iron_predator', name:'Iron Predator', icon:'🐾',
    tagline:'Armored fury. Primal and unyielding.',
    color:'#776644', element:'runeforge', rarity:'uncommon',
    fusedFrom:['ironclad','beastmaster'],
    stats:{hp:118,maxHp:118,mp:53,maxMp:53,atk:12,def:12,spd:12,crit:9},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:7},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_fighting_rage','fire_fighting_combo','fire_fighting_ignite','fire_fighting_jab'],
    burstAbility:'ironclad_burst',
    passives:['iron_skin','feral_bond'],
    description:'Iron armor grown around a primal core. Fights with beast instinct — relentless, adaptable, uncaring about pain. Every scratch makes it more aggressive, not less.',
    lore:'The beastmaster tamed wild things. The ironclad tamed itself. The Iron Predator stopped taming anything and simply let both parts express themselves fully.'
  },

  iron_automaton: {
    id:'iron_automaton', name:'Iron Automaton', icon:'⚙️',
    tagline:'The machine wears the armor. Or the armor is the machine.',
    color:'#4477aa', element:'irontech', rarity:'rare',
    fusedFrom:['ironclad','techsavant'],
    stats:{hp:110,maxHp:110,mp:68,maxMp:68,atk:11,def:11,spd:12,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_cyber_heat_sink','fire_cyber_overclock','fire_tech_circuit','fire_tech_forge'],
    burstAbility:'techsavant_burst',
    passives:['iron_skin','overclock'],
    description:'A fully automated iron suit with no pilot — the tech and the armor have merged into a self-operating combat machine. Runs diagnostics mid-fight, optimizes attack patterns, self-repairs between blows.',
    lore:'There was a pilot once. The machine kept running. Nobody is entirely sure when the pilot stopped being necessary and the machine stopped pretending otherwise.'
  },

  undying_fortress: {
    id:'undying_fortress', name:'Undying Fortress', icon:'🪦',
    tagline:'It does not fall. It has decided.',
    color:'#556677', element:'soulsteel', rarity:'uncommon',
    fusedFrom:['ironclad','gravewarden'],
    stats:{hp:128,maxHp:128,mp:53,maxMp:53,atk:11,def:14,spd:8,crit:8},
    statDisplay:{HP:8,ATK:8,DEF:10,SPD:5},
    abilities:['shield_bash','fortify','retaliate','warcry','soul_drain','necrotic_bolt','water_ghost_haunt','water_ghost_wraith'],
    burstAbility:'gravewarden_burst',
    passives:['iron_skin','undying'],
    description:'An iron fortress animated by death itself. Near-fatal blows are absorbed by necrotic energy and converted to strength. It has been nearly killed seventeen times. Each time, it got back up angrier.',
    lore:'The gravewarden understood: death is not an ending. It is a warning. The iron agreed. Together they have become something death simply passes over.'
  },

  magnetic_colossus: {
    id:'magnetic_colossus', name:'Magnetic Colossus', icon:'🧲',
    tagline:'Iron attracts iron. Then crushes it.',
    color:'#446688', element:'magnetiron', rarity:'rare',
    fusedFrom:['ironclad','magnetist'],
    stats:{hp:113,maxHp:113,mp:63,maxMp:63,atk:12,def:12,spd:10,crit:9},
    statDisplay:{HP:8,ATK:8,DEF:8,SPD:6,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_magnet_pull','fire_magnet_forge','fire_magnet_flux','fire_magnet_strike'],
    burstAbility:'magnetist_burst',
    passives:['iron_skin','magnetic_field'],
    description:'A colossal iron suit that is also a massive magnet. Rips metal weapons from enemy hands, draws armored enemies into close range, then converts all that gathered metal into crushing force.',
    lore:'It stripped every weapon from every enemy in the room before any of them had moved. Then it clapped its hands. The metal understood what came next even if the enemies did not.'
  },

  crystal_bastion: {
    id:'crystal_bastion', name:'Crystal Bastion', icon:'💎',
    tagline:'The crystal fortress refracts all damage.',
    color:'#88aacc', element:'crystalsteel', rarity:'epic',
    fusedFrom:['ironclad','crystalmancer'],
    stats:{hp:105,maxHp:105,mp:70,maxMp:70,atk:12,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_crystal_shard','fire_crystal_refract','fire_crystal_resonance','fire_crystal_ignition'],
    burstAbility:'crystalmancer_burst',
    passives:['iron_skin','crystal_body'],
    description:'Iron latticed with crystal matrices. Incoming damage is refracted into prismatic counterattacks that strike from every angle simultaneously. Difficult to hurt without hurting yourself worse.',
    lore:'The crystalmancer understood: every structure has a resonant frequency. The iron understood: if you find the frequency of everything attacking you, you can return it with interest.'
  },

  iron_warlord: {
    id:'iron_warlord', name:'Iron Warlord', icon:'⚔️',
    tagline:'Offense and defense, indistinguishable.',
    color:'#886633', element:'warlordsteel', rarity:'uncommon',
    fusedFrom:['ironclad','warlord'],
    stats:{hp:130,maxHp:130,mp:48,maxMp:48,atk:13,def:14,spd:10,crit:8},
    statDisplay:{HP:9,ATK:9,DEF:10,SPD:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_fighting_rage','fire_fighting_combo','fire_steel_temper','fire_steel_smelt'],
    burstAbility:'warlord_burst',
    passives:['iron_skin','battle_hardened'],
    description:'Commands a battlefield from behind an impenetrable wall of iron. Its presence alone intimidates enemies into tactical mistakes. Every defensive stance is also a setup for overwhelming offense.',
    lore:'The warlord said: attack relentlessly. The ironclad said: defend absolutely. They argued. The Iron Warlord that emerged does both, simultaneously, without compromise.'
  },

  spirit_fortress: {
    id:'spirit_fortress', name:'Spirit Fortress', icon:'🌿',
    tagline:'The fortress that mends itself. Endlessly.',
    color:'#557766', element:'spiritfort', rarity:'rare',
    fusedFrom:['ironclad','spiritwalker'],
    stats:{hp:115,maxHp:115,mp:63,maxMp:63,atk:10,def:12,spd:11,crit:9},
    statDisplay:{HP:8,ATK:7,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','water_ghost_phase','water_ghost_haunt','fire_spirit_sanctuary','fire_spirit_purge'],
    burstAbility:'spiritwalker_burst',
    passives:['iron_skin','spirit_bond'],
    description:'Iron infused with spirit energy that continuously repairs itself. Wounds close in real time; dents unfold; broken sections regrow. Damaging the Spirit Fortress is a frustrating and ultimately futile exercise.',
    lore:'The spirit asked: what do you need? The iron said: to not break. The spirit said: I can arrange that. And it did.'
  },

  hexed_iron: {
    id:'hexed_iron', name:'Hexed Iron', icon:'🔮',
    tagline:'Cursed armor. Even worse to hit than to avoid.',
    color:'#775588', element:'bloodsteel', rarity:'rare',
    fusedFrom:['ironclad','hexblade'],
    stats:{hp:110,maxHp:110,mp:65,maxMp:65,atk:12,def:11,spd:11,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_dark_eclipse','fire_dark_shroud','fire_dark_consumption','fire_dark_smolder'],
    burstAbility:'hexblade_burst',
    passives:['iron_skin','hex_master'],
    description:'Armor hexed at the molecular level. Strikes against it trigger curse transfer — attackers inherit the hex from each blow. The more they hit, the more cursed they become. Its defense and its hex are the same mechanism.',
    lore:'The hexblade said: curses are most powerful when they are unavoidable. The ironclad said: try to avoid hitting me. Neither statement remains entirely untrue.'
  },

  cosmic_vanguard: {
    id:'cosmic_vanguard', name:'Cosmic Vanguard', icon:'🌌',
    tagline:'The fortress at the edge of reality. And just past it.',
    color:'#4455aa', element:'cosmifort', rarity:'epic',
    fusedFrom:['ironclad','cosmomancer'],
    stats:{hp:105,maxHp:105,mp:78,maxMp:78,atk:10,def:10,spd:11,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:7,SPD:7,MP:8},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_cosmic_solar','fire_cosmic_nebula','fire_cosmic_stardust','fire_cosmic_aurora'],
    burstAbility:'cosmomancer_burst',
    passives:['iron_skin','stardust'],
    description:'Iron forged in the heart of a dying star. Carries the gravitational memory of stellar mass — attacks are bent around it by spatial distortion, and its counterstrikes arrive from impossible angles.',
    lore:'It is not the largest thing. It simply has the gravity of something that is. The distinction is technical. The result is the same.'
  },

  plague_colossus: {
    id:'plague_colossus', name:'Plague Colossus', icon:'☣️',
    tagline:'Touch the fortress. Inherit the plague.',
    color:'#557744', element:'plagueiron', rarity:'epic',
    fusedFrom:['ironclad','pestilencelord'],
    stats:{hp:110,maxHp:110,mp:70,maxMp:70,atk:11,def:11,spd:9,crit:9},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:5,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_poison_corrode','fire_poison_plague','fire_bug_plague','fire_bug_hive'],
    burstAbility:'pestilence_burst',
    passives:['iron_skin','plague_lord'],
    description:'An iron colossal oozing engineered plague. The armor is its delivery mechanism — every breach of its defenses spreads disease outward. Cracking the Plague Colossus open is exactly what it wants you to do.',
    lore:'The pestilencelord wanted a way to spread disease faster. The ironclad offered itself. This is, in retrospect, a decision that affected a very large number of other people.'
  },

  gale_vanguard: {
    id:'gale_vanguard', name:'Gale Vanguard', icon:'💨',
    tagline:'The fortress moves faster than it has any right to.',
    color:'#5577aa', element:'galevanguard', rarity:'uncommon',
    fusedFrom:['ironclad','windwalker'],
    stats:{hp:110,maxHp:110,mp:55,maxMp:55,atk:12,def:11,spd:15,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:9},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_wind_thermal','fire_wind_cyclone','fire_flying_updraft','fire_flying_dive'],
    burstAbility:'windwalker_burst',
    passives:['iron_skin','gust'],
    description:'Iron armor propelled by controlled wind currents. Moves with impossible speed for its weight, intercepts attacks from the other side of the arena, and uses momentum to amplify every defensive bash.',
    lore:'They told it that heavy armor slows you down. It has been disproving this, continuously, since the day it fused. The wind does not slow. Neither does the iron it carries.'
  },

  doom_fortress: {
    id:'doom_fortress', name:'Doom Fortress', icon:'💣',
    tagline:'Everything that approaches it is already doomed.',
    color:'#664433', element:'bloodsteel', rarity:'epic',
    fusedFrom:['ironclad','doomcaster'],
    stats:{hp:105,maxHp:105,mp:75,maxMp:75,atk:10,def:9,spd:11,crit:11},
    statDisplay:{HP:7,ATK:7,DEF:6,SPD:7,MP:7},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_dark_consumption','fire_dark_eclipse','fire_void_devour','fire_void_hollowing'],
    burstAbility:'doomcaster_burst',
    passives:['iron_skin','doom_aura'],
    description:'A fortress that radiates inevitability. Enemies within range find their luck failing, their attacks missing, their armor degrading. The Doom Fortress does not need to move. It just needs to exist long enough.',
    lore:'You cannot besiege a doom fortress. You can only be the siege it was waiting for.'
  },

  arcane_bulwark: {
    id:'arcane_bulwark', name:'Arcane Bulwark', icon:'📚',
    tagline:'Spells and shields are the same language.',
    color:'#5544bb', element:'spellsteel', rarity:'epic',
    fusedFrom:['ironclad','arcanist'],
    stats:{hp:103,maxHp:103,mp:80,maxMp:80,atk:10,def:9,spd:11,crit:12},
    statDisplay:{HP:7,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_psychic_blaze','fire_psychic_fever','fire_psychic_focus','fire_psychic_thought'],
    burstAbility:'arcanist_burst',
    passives:['iron_skin','arcane_mastery'],
    description:'A living arcane ward in iron form. Absorbs magic attacks into its matrix and detonates them as enhanced counterspells. Magic users find that every spell they throw is simply fuel for the next retaliation.',
    lore:'The arcanist called it a perfect defensive matrix. The ironclad called it armor. They were describing the same thing from two directions, and they were both completely right.'
  },

  eternal_bastion: {
    id:'eternal_bastion', name:'Eternal Bastion', icon:'🏰',
    tagline:'Nothing passes. Nothing ever has. Nothing ever will.',
    color:'#778899', element:'steel', rarity:'uncommon',
    fusedFrom:['ironclad','sentinel'],
    stats:{hp:150,maxHp:150,mp:40,maxMp:40,atk:9,def:17,spd:7,crit:5},
    statDisplay:{HP:10,ATK:6,DEF:12,SPD:4},
    abilities:['shield_bash','fortify','retaliate','warcry','fire_steel_quench','fire_steel_forge','fire_rock_forge','fire_ground_magma_armor'],
    burstAbility:'ironclad_burst',
    passives:['iron_skin','bastion'],
    description:'The ultimate expression of defensive power. 150 HP. 17 DEF. Does not move unless to retaliate. Has never been defeated. There is no record of anyone seriously trying twice.',
    lore:'It was not built to last. It simply has not stopped. After a certain point, the distinction ceases to matter.'
  },

  iron_specter: {
    id:'iron_specter', name:'Iron Specter', icon:'👻',
    tagline:'The ghost inside the armor refuses to leave.',
    color:'#6677aa', element:'soulsteel', rarity:'legendary',
    fusedFrom:['ironclad','phantom'],
    stats:{hp:105,maxHp:105,mp:60,maxMp:60,atk:12,def:9,spd:14,crit:17},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:8,MP:6},
    abilities:['shield_bash','fortify','retaliate','warcry','water_ghost_wraith','water_ghost_phase','water_ghost_drown','water_ghost_haunt'],
    burstAbility:'phantom_burst',
    passives:['iron_skin','phase'],
    description:'A phantom wearing iron. It phases between solid and spectral — attacks pass through when it chooses, and land against iron when it does not. An enemy cannot know which state they will find it in.',
    lore:'The armor would not let the ghost leave. The ghost stopped trying. Now the armor walks on its own, which is more unsettling than either component was separately.'
  },

  soulfire_channeler: {
    id:'soulfire_channeler', name:'Soulfire Channeler', icon:'🔥',
    tagline:'The flame that feeds on souls, not wood.',
    color:'#cc5588', element:'soulfire', rarity:'rare',
    fusedFrom:['soulweaver','pyromancer'],
    stats:{hp:73,maxHp:73,mp:95,maxMp:95,atk:8,def:6,spd:11,crit:12},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_ghost_soulburn','fire_ghost_wisp','fire_ghost_haunt','fire_ghost_shade'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','combustion'],
    description:'Drains the soul from targets and burns it as fuel. Every kill makes the fire brighter. The Soulfire Channeler does not need kindling. It is the kindling.',
    lore:'Regular fire needs oxygen. This fire needs something else. It is picky about what it will not burn, and has not found a limit yet.'
  },

  storm_soul: {
    id:'storm_soul', name:'Storm Soul', icon:'⚡',
    tagline:'The storm that remembers every life it took.',
    color:'#5577cc', element:'stormsoul', rarity:'rare',
    fusedFrom:['soulweaver','stormcaller'],
    stats:{hp:78,maxHp:78,mp:90,maxMp:90,atk:10,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:8,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','electric_shadow_spark','electric_shadow_phantom','electric_shadow_conduit','electric_shadow_drain'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','static_charge'],
    description:'A storm animated by harvested souls. Each soul drained powers another bolt. Each bolt releases a fragment of the soul it consumed. Targets struck by the Storm Soul hear voices — the voices of everyone it has already taken.',
    lore:'The storm does not choose its path. But this one does. It remembers where it came from, and it keeps count.'
  },

  blood_weaver: {
    id:'blood_weaver', name:'Blood Weaver', icon:'🩸',
    tagline:'Life and death flow in the same current.',
    color:'#882244', element:'deathblood', rarity:'rare',
    fusedFrom:['soulweaver','bloodknight'],
    stats:{hp:95,maxHp:95,mp:75,maxMp:75,atk:12,def:9,spd:10,crit:10},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:6,MP:7},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_blood_vitaldrain','fire_blood_bloodboil','fire_blood_cauterize','fire_blood_hemorrhage'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','vital_hunger'],
    description:'Weaves blood and soul together into a single tapestry of damage. Drains life force directly from bloodflow. Every wound it inflicts heals itself. The more targets bleed, the stronger it becomes.',
    lore:'The bloodknight said: take what you need to keep fighting. The soulweaver said: take everything, not just the body. The Blood Weaver does not distinguish. It finds the difference academic.'
  },

  void_weaver: {
    id:'void_weaver', name:'Void Weaver', icon:'🌀',
    tagline:'The void does not consume the soul. It becomes it.',
    color:'#554488', element:'wraith', rarity:'epic',
    fusedFrom:['soulweaver','voidmancer'],
    stats:{hp:68,maxHp:68,mp:105,maxMp:105,atk:9,def:5,spd:11,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_void_voidfire','fire_void_devour','fire_void_hollowing','normal_void_pierce'],
    burstAbility:'void_burst',
    passives:['soul_harvest','void_affinity'],
    description:'Unravels enemies at the soul level — not just attacking the body, but pulling the spiritual thread that holds a being together. Targets weakened by void energy cannot be healed by normal means.',
    lore:'The soul can be damaged. Most practitioners stop there because the alternatives are ethically significant. The Void Weaver did not stop there.'
  },

  soul_runeweaver: {
    id:'soul_runeweaver', name:'Soul Runeweaver', icon:'🔱',
    tagline:'The runes are written in something older than ink.',
    color:'#887733', element:'runesoul', rarity:'rare',
    fusedFrom:['soulweaver','runeblade'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:11,def:8,spd:12,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','normal_time_strike','normal_time_echo','normal_ice_freeze','normal_storm_strike'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','rune_mastery'],
    description:'Inscribes soul-runes directly onto enemies — marks written in spiritual essence that activate when souls are drained nearby. A rune-trap ecosystem that rewards patience and punishes aggression.',
    lore:'The runes do not require a surface. They prefer one, for legibility, but the soul holds ink as well as stone does. Better, actually. It does not chip.'
  },

  necrospirit: {
    id:'necrospirit', name:'Necrospirit', icon:'💀',
    tagline:'Neither fully dead nor alive. Infinitely patient.',
    color:'#33aa88', element:'ghost', rarity:'epic',
    fusedFrom:['soulweaver','necromancer'],
    stats:{hp:70,maxHp:70,mp:110,maxMp:110,atk:9,def:6,spd:10,crit:11},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:6,MP:10},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','water_ghost_wraith','water_ghost_drown','water_ghost_haunt','water_ghost_phase'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','death_aura'],
    description:'Exists in the threshold between life and death, using both states simultaneously. Harvests souls to raise them, raises them to harvest more. A self-sustaining cycle of undeath that grows without limit.',
    lore:'When asked if it was alive, it said: that depends on your definition. When asked if it was dead, it gave the same answer. Both questioners were uncomfortable, and one of them is now part of the answer.'
  },

  sacred_soul: {
    id:'sacred_soul', name:'Sacred Soul', icon:'⚜️',
    tagline:'The divine light and the restless soul, made whole.',
    color:'#ccbb55', element:'sacredsoul', rarity:'epic',
    fusedFrom:['soulweaver','paladin'],
    stats:{hp:100,maxHp:100,mp:80,maxMp:80,atk:10,def:10,spd:9,crit:9},
    statDisplay:{HP:7,ATK:7,DEF:7,SPD:5,MP:8},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_light_beacon','fire_fairy_blessing','fire_spirit_sanctuary','fire_spirit_purge'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','sacred_aura'],
    description:'Holy energy and soul energy, unified. Heals allies while draining enemies. Banishes the undead while raising better ones. The Sacred Soul is simultaneously the most holy and most heretical class in the dungeon.',
    lore:'The paladin said: this is wrong. The soulweaver said: it is effective. After the third battle, the paladin stopped arguing about which of those mattered more.'
  },

  frost_soul: {
    id:'frost_soul', name:'Frost Soul', icon:'❄️',
    tagline:'The soul frozen in place. Still dangerous. More dangerous.',
    color:'#77aacc', element:'frosted_ghost', rarity:'epic',
    fusedFrom:['soulweaver','frostweaver'],
    stats:{hp:75,maxHp:75,mp:93,maxMp:93,atk:10,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_ice_frost_burn','fire_ice_thermal_shift','fire_ice_temperature_shock','fire_ice_vapor_drain'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','frost_mastery'],
    description:'Drains heat along with souls — freezing targets at the spiritual level. A creature with a frozen soul cannot fight back effectively; it can barely remember why it was fighting. Then the ice finishes the work.',
    lore:'The frost weaver found that cold slows reactions. The soul weaver found that draining the soul does the same. Together they found a way to slow something down to nothing.'
  },

  dragon_spirit: {
    id:'dragon_spirit', name:'Dragon Spirit', icon:'🐉',
    tagline:'The dragon\'s fire is also its soul. Both are available for harvest.',
    color:'#aa7733', element:'dragonspirit', rarity:'epic',
    fusedFrom:['soulweaver','dragonknight'],
    stats:{hp:100,maxHp:100,mp:75,maxMp:75,atk:13,def:9,spd:11,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:7},
    abilities:['soul_drain','necrotic_bolt','wither','death_coil','fire_dragon_breath','fire_dragon_rage','fire_ghost_soulburn','fire_dragon_scale'],
    burstAbility:'soulweaver_burst',
    passives:['soul_harvest','intimidation'],
    description:'A dragon whose fire is soul-infused. Breathes spiritual flame that damages both body and essence. Draconic souls are among the most potent energy sources in the dungeon — and it has learned to burn its own.',
    lore:'The dragon did not understand what the soulweaver was doing. Then it felt its fire grow stronger. Then it stopped asking questions and started working with it.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_2);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_2);
  FUSION_LOADED_FILES.add(2);
  if(typeof console!=='undefined') console.debug('[Fusion] File 2 loaded (38 classes)');
})();
