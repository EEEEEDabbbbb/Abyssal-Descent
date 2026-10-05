// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 4 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_4 = {
  'lightbringer+pyromancer': 'pyro_lightbringer',
  'beastmaster+pyromancer': 'pyro_beast',
  'pyromancer+techsavant': 'pyro_tech',
  'gravewarden+pyromancer': 'pyro_grave',
  'magnetist+pyromancer': 'pyro_magnetist',
  'crystalmancer+pyromancer': 'pyro_crystal',
  'pyromancer+warlord': 'pyro_war',
  'pyromancer+spiritwalker': 'pyro_spirit',
  'hexblade+pyromancer': 'pyro_hex',
  'cosmomancer+pyromancer': 'pyro_cosmo',
  'pestilencelord+pyromancer': 'pyro_pestilence',
  'pyromancer+windwalker': 'pyro_wind',
  'doomcaster+pyromancer': 'pyro_doom',
  'arcanist+pyromancer': 'pyro_arcanist',
  'pyromancer+sentinel': 'pyro_sentinel',
  'phantom+pyromancer': 'pyro_phantom',
  'bloodknight+stormcaller': 'storm_blood',
  'stormcaller+voidmancer': 'storm_void',
  'runeblade+stormcaller': 'storm_rune',
  'necromancer+stormcaller': 'storm_necro',
  'paladin+stormcaller': 'storm_paladin',
  'frostweaver+stormcaller': 'storm_frost',
  'dragonknight+stormcaller': 'storm_dragon',
  'stormcaller+tidecaller': 'storm_tide',
  'gravitist+stormcaller': 'storm_gravitist',
  'soundbreaker+stormcaller': 'storm_soundbreaker',
  'chronomancer+stormcaller': 'storm_chrono',
  'spellsword+stormcaller': 'storm_spellsword',
  'plaguedoctor+stormcaller': 'storm_plague',
  'geomancer+stormcaller': 'storm_geo',
  'lightbringer+stormcaller': 'storm_lightbringer',
  'beastmaster+stormcaller': 'storm_beast',
  'stormcaller+techsavant': 'storm_tech',
  'gravewarden+stormcaller': 'storm_grave',
  'magnetist+stormcaller': 'storm_magnetist',
  'crystalmancer+stormcaller': 'storm_crystal',
  'stormcaller+warlord': 'storm_war'
};

const FUSION_CLASSES_4 = {
  pyro_lightbringer: {
    id:'pyro_lightbringer', name:'Solar Flare', icon:'☀️',
    tagline:'The sun does not ask permission to burn.',
    color:'#e68033', element:'fire', elementFlavor:'holyfire', rarity:'rare',
    fusedFrom:['pyromancer','lightbringer'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:10,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:8,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_light_radiant','fire_light_beacon','fire_light_brand','fire_light_siphon'],
    burstAbility:'lightbringer_burst',
    passives:['combustion','radiant'],
    description:'Combines divine radiance with raw pyromantic heat into something that burns the eye before it burns the body. Blinds targets with solar intensity, then scorches them in the afterimage.',
    lore:'The lightbringer brought illumination. The pyromancer pointed out that enough illumination becomes incineration. This was technically correct and practically devastating.'
  },

  pyro_beast: {
    id:'pyro_beast', name:'Fireborn', icon:'🦁',
    tagline:'The beast does not tame the fire. They understand each other.',
    color:'#aa6f33', element:'fire', elementFlavor:'runefire', rarity:'uncommon',
    fusedFrom:['pyromancer','beastmaster'],
    stats:{hp:85,maxHp:85,mp:78,maxMp:78,atk:11,def:7,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_fighting_rage','fire_fighting_combo','fire_flying_dive','fire_flying_updraft'],
    burstAbility:'pyro_burst',
    passives:['combustion','feral_bond'],
    description:'Primal fire embodied. Fights with pure predatory instinct amplified by flame — leaping dives that ignite on impact, raging combos that grow hotter with each hit, and the feral patience to wait for the perfect kill.',
    lore:'The beast was already burning. Not literally, but in the way a predator burns — with focus, hunger, and the certainty of the hunt. The pyromancy just made it visible.'
  },

  pyro_tech: {
    id:'pyro_tech', name:'Plasma Forge', icon:'⚙️',
    tagline:'Heat applied with precision is engineering. This is that.',
    color:'#885566', element:'fire', elementFlavor:'techflame', rarity:'rare',
    fusedFrom:['pyromancer','techsavant'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:10,def:6,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_cyber_overclock','fire_cyber_system_melt','fire_tech_plasma','fire_tech_circuit'],
    burstAbility:'techsavant_burst',
    passives:['combustion','overclock'],
    description:'Superheats technical systems into plasma states — circuits become conductors for fire, machines overheat into weapons, and every hack ends with something on fire that was not previously on fire.',
    lore:'The techsavant said: heat is just energy in the wrong direction. The pyromancer said: all directions are the right direction for heat. They built a forge from the disagreement.'
  },

  pyro_grave: {
    id:'pyro_grave', name:'The Pyre', icon:'🕯️',
    tagline:'What burns is not destroyed. It is preserved in ash.',
    color:'#914455', element:'fire', elementFlavor:'soulfire', rarity:'uncommon',
    fusedFrom:['pyromancer','gravewarden'],
    stats:{hp:95,maxHp:95,mp:78,maxMp:78,atk:10,def:9,spd:10,crit:12},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:6,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_ghost_soulburn','fire_ghost_shade','fire_ghost_haunt','fire_spirit_exorcism'],
    burstAbility:'gravewarden_burst',
    passives:['combustion','undying'],
    description:'The eternal funeral pyre — burns the dead to power itself, uses soulfire to banish the undead it does not raise, and refuses to stay down when struck. Every death feeds the flame.',
    lore:'The gravewarden kept the dead in place. The pyromancer kept things burning. Together they found that fire and death have a relationship older than either discipline, and considerably more reciprocal.'
  },

  pyro_magnetist: {
    id:'pyro_magnetist', name:'Molten Lodestone', icon:'🧲',
    tagline:'Molten iron follows no compass. It follows hunger.',
    color:'#915e66', element:'fire', elementFlavor:'ironfire', rarity:'rare',
    fusedFrom:['pyromancer','magnetist'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:10,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_magnet_pull','fire_magnet_forge','fire_steel_smelt','fire_magnet_flux'],
    burstAbility:'magnetist_burst',
    passives:['combustion','magnetic_field'],
    description:'Melts metal with fire then reshapes it magnetically mid-flight. Pulls weapons from enemy hands and returns them as superheated projectiles. The magnetic field grows stronger as the ambient temperature rises.',
    lore:'Iron becomes liquid at the right temperature. Liquid iron has no opinion about where magnets tell it to go. The Molten Lodestone discovered this relationship and has been exploiting it ever since.'
  },

  pyro_crystal: {
    id:'pyro_crystal', name:'Prism Inferno', icon:'💎',
    tagline:'Crystal refracts. Fire amplifies. Together they multiply.',
    color:'#aa6f91', element:'fire', elementFlavor:'crystalfire', rarity:'epic',
    fusedFrom:['pyromancer','crystalmancer'],
    stats:{hp:73,maxHp:73,mp:95,maxMp:95,atk:11,def:6,spd:13,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_crystal_shard','fire_crystal_refract','fire_crystal_resonance','fire_crystal_ignition'],
    burstAbility:'crystalmancer_burst',
    passives:['combustion','crystal_body'],
    description:'Each crystal shard acts as a lens for pyromantic energy — fire passing through refracts into dozens of burning beams hitting from every angle simultaneously. The more crystals shatter, the more fire multiplies.',
    lore:'The crystalmancer studied light refraction. The pyromancer pointed out that fire is light with attitude. The Prism Inferno is what you get when that attitude is systematically directed through every available surface at once.'
  },

  pyro_war: {
    id:'pyro_war', name:'The Warchief\'s Pyre', icon:'🔥',
    tagline:'The army that fights behind fire never breaks.',
    color:'#cc3311', element:'fire', elementFlavor:'infernofist', rarity:'uncommon',
    fusedFrom:['pyromancer','warlord'],
    stats:{hp:98,maxHp:98,mp:73,maxMp:73,atk:12,def:9,spd:12,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:7,MP:7},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_fighting_rage','fire_fighting_ignite','fire_fighting_combo','fire_rock_strike'],
    burstAbility:'warlord_burst',
    passives:['combustion','battle_hardened'],
    description:'Commands from behind a wall of fire that is also an offensive front. Every tactical order arrives wrapped in flame. Rallies allies with burning war cries that literally ignite the battlefield.',
    lore:'Warlords historically used fire as a siege tool. This one uses it as a personality. The results are less historically typical and considerably harder to defend against.'
  },

  pyro_spirit: {
    id:'pyro_spirit', name:'Soulpyre', icon:'🌿',
    tagline:'Spirits do not burn. They become the fire.',
    color:'#886655', element:'fire', elementFlavor:'soulflame', rarity:'rare',
    fusedFrom:['pyromancer','spiritwalker'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:9,def:7,spd:13,crit:13},
    statDisplay:{HP:6,ATK:6,DEF:5,SPD:8,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_spirit_purge','fire_spirit_ascension','fire_ghost_wisp','fire_spirit_sanctuary'],
    burstAbility:'spiritwalker_burst',
    passives:['combustion','spirit_bond'],
    description:'Burns spiritual energy as fuel — spirit-touched flames that purge curses and conditions while damaging enemies. The fire heals allies it passes through and harms enemies it touches, distinguishing between the two with perfect spiritual accuracy.',
    lore:'The spiritwalker said: the spirit is warmth. The pyromancer said: warmth is fire. They argued about whether this was profound or reductive for a long time and eventually just started working together.'
  },

  pyro_hex: {
    id:'pyro_hex', name:'Hellbrand', icon:'🔮',
    tagline:'Cursed fire does not go out. It is the curse.',
    color:'#aa2255', element:'fire', elementFlavor:'hellfire', rarity:'rare',
    fusedFrom:['pyromancer','hexblade'],
    stats:{hp:78,maxHp:78,mp:90,maxMp:90,atk:10,def:6,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_dark_eclipse','fire_dark_annihilation','fire_dark_siphon','fire_dark_smolder'],
    burstAbility:'hexblade_burst',
    passives:['combustion','hex_master'],
    description:'Brands enemies with cursed fire that cannot be extinguished by conventional means. Each brand is also a hex — weakening defenses, inverting healing, and detonating catastrophically when the target dies.',
    lore:'The hexblade cursed its targets. The pyromancer burned them. The Hellbrand discovered that cursed fire produces a third effect neither discipline had previously documented. It remains poorly understood but well-utilized.'
  },

  pyro_cosmo: {
    id:'pyro_cosmo', name:'Stellar Cremation', icon:'🌟',
    tagline:'Stars burn for millions of years. It is patient.',
    color:'#882b66', element:'fire', elementFlavor:'starfire', rarity:'epic',
    fusedFrom:['pyromancer','cosmomancer'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:9,def:5,spd:12,crit:14},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_cosmic_solar','fire_space_supernova','fire_space_stellar_drain','fire_cosmic_aurora'],
    burstAbility:'cosmomancer_burst',
    passives:['combustion','stardust'],
    description:'Channels the nuclear fire at the heart of stars — an entirely different category of flame from anything found in a dungeon. Attacks carry stellar radiation. The supernova burst does not metaphorically end fights.',
    lore:'The pyromancer thought they understood fire. The cosmomancer showed them the inside of a sun. The pyromancer has not been intimidated by anything since that conversation, including things considerably larger than themselves.'
  },

  pyro_pestilence: {
    id:'pyro_pestilence', name:'The Immolation', icon:'☣️',
    tagline:'The plague needs a vector. Fire is very fast.',
    color:'#915511', element:'fire', elementFlavor:'plaguefire', rarity:'epic',
    fusedFrom:['pyromancer','pestilencelord'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:10,def:6,spd:11,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:9},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_poison_plague','fire_bug_plague','fire_poison_corrode','fire_poison_miasma'],
    burstAbility:'pestilence_lord_burst',
    passives:['combustion','plague_lord'],
    description:'Uses fire as an aerosol delivery system for engineered plague — burning enemies spreads contagion in a radius. The immune to fire are not immune to what rides the fire. The plague that survives ignition is the dangerous one.',
    lore:'Most diseases die in fire. The pestilencelord spent considerable effort developing ones that do not. The pyromancer said: I can deliver those faster than anything. This was the beginning of a productive working relationship.'
  },

  pyro_wind: {
    id:'pyro_wind', name:'Firestorm', icon:'🌪️',
    tagline:'Wind does not fight the fire. It carries it everywhere.',
    color:'#aa7766', element:'fire', elementFlavor:'firestorm', rarity:'uncommon',
    fusedFrom:['pyromancer','windwalker'],
    stats:{hp:78,maxHp:78,mp:80,maxMp:80,atk:10,def:6,spd:16,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:9,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_wind_cyclone','fire_wind_thermal','fire_flying_dive','fire_flying_ember'],
    burstAbility:'windwalker_burst',
    passives:['combustion','gust'],
    description:'A living firestorm — wind and fire feeding each other in a self-sustaining spiral. Moves faster than either element alone. The updrafts carry burning debris. The fire spreads on every gust. There is no safe direction.',
    lore:'Wildfire spreads with the wind. The windwalker controlled the wind. The pyromancer controlled the fire. The Firestorm is what happens when neither bothers to control either, and simply lets them work together naturally.'
  },

  pyro_doom: {
    id:'pyro_doom', name:'The Last Conflagration', icon:'💣',
    tagline:'Doom announced with fire is not a warning. It is a schedule.',
    color:'#992b2b', element:'fire', elementFlavor:'hellfire', rarity:'epic',
    fusedFrom:['pyromancer','doomcaster'],
    stats:{hp:73,maxHp:73,mp:100,maxMp:100,atk:9,def:5,spd:12,crit:15},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:10},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_dark_eclipse','fire_dark_annihilation','fire_space_supernova','fire_void_voidfire'],
    burstAbility:'doomcaster_burst',
    passives:['combustion','doom_aura'],
    description:'Marks targets with doom, then sets them on fire to accelerate the timeline. The doom detonates as an inferno. Every kill spawns an explosion. The Last Conflagration does not end fights — it ends rooms.',
    lore:'The doomcaster said: your fate is sealed. The pyromancer said: yes, but when? They arrived at a specific answer together, and have been keeping that appointment reliably ever since.'
  },

  pyro_arcanist: {
    id:'pyro_arcanist', name:'Burning Theorem', icon:'📚',
    tagline:'Every equation has a heat solution.',
    color:'#912b77', element:'fire', elementFlavor:'mindfire', rarity:'epic',
    fusedFrom:['pyromancer','arcanist'],
    stats:{hp:70,maxHp:70,mp:105,maxMp:105,atk:9,def:5,spd:13,crit:15},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:8,MP:10},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_psychic_blaze','fire_psychic_fever','fire_space_flare','fire_space_plasma_burn'],
    burstAbility:'void_burst',
    passives:['combustion','arcane_mastery'],
    description:'Applies arcane theory to combustion — calculates the exact temperature and trajectory of every flame, optimizes burn patterns for maximum coverage, and delivers fire with the precision of a mathematical proof.',
    lore:'The arcanist approached everything as an equation. The pyromancer approached everything as a fire. The Burning Theorem found that one of these approaches has a much faster solution time, and the other makes it more accurate.'
  },

  pyro_sentinel: {
    id:'pyro_sentinel', name:'Molten Wall', icon:'🧱',
    tagline:'Nothing passes a wall that is also on fire.',
    color:'#aa5555', element:'fire', elementFlavor:'molten', rarity:'uncommon',
    fusedFrom:['pyromancer','sentinel'],
    stats:{hp:118,maxHp:118,mp:65,maxMp:65,atk:8,def:12,spd:9,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:8,SPD:5,MP:6},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_ground_magma_armor','fire_steel_forge','fire_rock_forge','fire_rock_cinder'],
    burstAbility:'pyro_burst',
    passives:['combustion','bastion'],
    description:'An immovable burning barricade. Every attack against it triggers a retaliatory burst of fire. Standing in front of the Molten Wall means standing in front of a wall — and also standing in fire.',
    lore:'The sentinel said: I will not move. The pyromancer said: neither will the fire. They agreed this was a compatible philosophy, and have been holding the line together, incandescently, ever since.'
  },

  pyro_phantom: {
    id:'pyro_phantom', name:'Phantom Blaze', icon:'👻',
    tagline:'The ghost burns. What it haunts burns with it.',
    color:'#aa5e6f', element:'fire', elementFlavor:'soulfire', rarity:'legendary',
    fusedFrom:['pyromancer','phantom'],
    stats:{hp:73,maxHp:73,mp:85,maxMp:85,atk:11,def:5,spd:15,crit:20},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:8},
    abilities:['fireball','ignite','inferno','phoenixflame','fire_ghost_soulburn','fire_ghost_haunt','fire_ghost_shade','water_ghost_phase'],
    burstAbility:'shadow_burst',
    passives:['combustion','phase'],
    description:'A burning apparition that phases through defenses before igniting from within. Passes through walls to set the other side on fire. Haunts targets with clinging soulfire that bypasses physical armor entirely.',
    lore:'Ghosts cannot be burned. This one found a loophole: it is the fire. Targets struck by the Phantom Blaze report burning sensations in places that have not technically been touched. This is accurate.'
  },

  storm_blood: {
    id:'storm_blood', name:'Hemorrhage Storm', icon:'⚡',
    tagline:'The lightning opens the wound. The wound feeds the storm.',
    color:'#805577', element:'electric', elementFlavor:'stormblood', rarity:'rare',
    fusedFrom:['stormcaller','bloodknight'],
    stats:{hp:103,maxHp:103,mp:65,maxMp:65,atk:13,def:9,spd:12,crit:13},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:6},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_blood_hemorrhage','electric_blood_conductor','fire_blood_vitaldrain','electric_blood_anemia'],
    burstAbility:'storm_burst',
    passives:['static_charge','vital_hunger'],
    description:'Blood conducts electricity. The Hemorrhage Storm uses this fact without mercy — lightning strikes that hemorrhage on impact, bleeding wounds that become conductors for the next bolt, and a feedback loop of pain that compounds with every exchange.',
    lore:'The bloodknight knew blood as power. The stormcaller knew lightning as power. They discovered blood conducts lightning, which produced a power source neither had anticipated and both found professionally exciting.'
  },

  storm_void: {
    id:'storm_void', name:'Null Tempest', icon:'🌀',
    tagline:'The storm that erases the things it passes through.',
    color:'#666fcc', element:'electric', elementFlavor:'stormshade', rarity:'epic',
    fusedFrom:['stormcaller','voidmancer'],
    stats:{hp:75,maxHp:75,mp:95,maxMp:95,atk:11,def:6,spd:13,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_void_storm','electric_void_rupture','electric_void_collapse','normal_void_unmake'],
    burstAbility:'void_burst',
    passives:['static_charge','void_affinity'],
    description:'A storm made of void energy — lightning that unmakes instead of burning, thunder that silences existence rather than just sound. The Null Tempest leaves nothing behind where it passes. Not rubble. Nothing.',
    lore:'What does a void storm look like? Mostly it looks like the absence of things that were previously present. The stormcaller found this aesthetically jarring. The voidmancer found it adequate.'
  },

  storm_rune: {
    id:'storm_rune', name:'Runic Tempest', icon:'🔱',
    tagline:'The rune inscribed by lightning lasts forever. The lightning does not need to.',
    color:'#99a280', element:'electric', elementFlavor:'runestorm', rarity:'rare',
    fusedFrom:['stormcaller','runeblade'],
    stats:{hp:93,maxHp:93,mp:75,maxMp:75,atk:13,def:8,spd:14,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_rune_sigil','electric_rune_overload','electric_rune_inscribe','electric_rune_spark'],
    burstAbility:'storm_burst',
    passives:['static_charge','rune_mastery'],
    description:'Carves storm runes directly into enemies and the environment with lightning. Inscribed surfaces become conductors for subsequent bolts, building a network of charged rune-traps across the battlefield that detonate in chain reactions.',
    lore:'The runeblade carved marks slowly and carefully. The stormcaller offered to do it faster. The marks are less elegant but considerably more energized, and the target cooperation rate has not improved.'
  },

  storm_necro: {
    id:'storm_necro', name:'The Galvanic Dead', icon:'💀',
    tagline:'Lightning does not kill the dead. It recruits them.',
    color:'#44a2a2', element:'ghost', elementFlavor:'stormsoul', rarity:'rare',
    fusedFrom:['stormcaller','necromancer'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:10,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ghost_surge','electric_ghost_possession','electric_ghost_chain','electric_ghost_drain'],
    burstAbility:'necro_burst',
    passives:['static_charge','death_aura'],
    description:'Animates undead with storm energy rather than necrotic power — galvanic zombies that crackle with electricity, death knights that arc chain lightning when struck, and a storm that feeds on the spiritual charge of the recently dead.',
    lore:'The necromancer said: I raise the dead. The stormcaller said: lightning can do that too, sort of. The results are technically the same but the conversation about what "alive" means became considerably more complicated.'
  },

  storm_paladin: {
    id:'storm_paladin', name:'Thundersaint', icon:'⚜️',
    tagline:'The divine mandate arrives at lightning speed.',
    color:'#99b399', element:'electric', elementFlavor:'holystorm', rarity:'rare',
    fusedFrom:['stormcaller','paladin'],
    stats:{hp:108,maxHp:108,mp:70,maxMp:70,atk:12,def:11,spd:12,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_fairy_enchant','electric_fairy_dazzle','electric_fairy_charm','normal_light_blind'],
    burstAbility:'paladin_burst',
    passives:['static_charge','sacred_aura'],
    description:'Delivers divine judgment with the speed and reach of lightning. Holy electricity that distinguishes between ally and enemy — purifying the former, judging the latter. The Thundersaint does not wait for the wicked to come to it.',
    lore:'The paladin believed in righteous force. The stormcaller believed in forces of nature. They agreed that these descriptions overlapped considerably more than expected, and acted accordingly.'
  },

  storm_frost: {
    id:'storm_frost', name:'Blizzard Voltage', icon:'❄️',
    tagline:'Cold slows the charge. Charge shatters the cold. Both win.',
    color:'#6fbbee', element:'ice', elementFlavor:'frostbolt', rarity:'rare',
    fusedFrom:['stormcaller','frostweaver'],
    stats:{hp:83,maxHp:83,mp:83,maxMp:83,atk:12,def:8,spd:14,crit:16},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ice_shock','electric_ice_chain','electric_ice_arctic','electric_ice_storm'],
    burstAbility:'frostweaver_burst',
    passives:['static_charge','frost_mastery'],
    description:'Ice and electricity in unstable combination — frozen targets become perfect conductors, channeling lightning through their bodies in full. The Blizzard Voltage freezes first and electrocutes second, with neither step leaving much room for recovery.',
    lore:'The frostweaver froze enemies in place. The stormcaller noted that frozen enemies do not dodge lightning. This observation proved so useful that they have been refining it together ever since.'
  },

  storm_dragon: {
    id:'storm_dragon', name:'Stormlord Drake', icon:'🐉',
    tagline:'The dragon breathes fire. This one breathes lightning.',
    color:'#99806f', element:'dragon', elementFlavor:'dragonbolt', rarity:'rare',
    fusedFrom:['stormcaller','dragonknight'],
    stats:{hp:108,maxHp:108,mp:65,maxMp:65,atk:14,def:10,spd:13,crit:14},
    statDisplay:{HP:7,ATK:10,DEF:7,SPD:8,MP:6},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_dragon_volt','electric_dragon_storm','electric_dragon_overload','electric_dragon_charge'],
    burstAbility:'dragonknight_burst',
    passives:['static_charge','intimidation'],
    description:'A dragon whose fire has been replaced by storm — electric breath, lightning claw swipes, and a roar that conducts a shockwave across the entire arena. The draconic scales act as natural insulators for the rider\'s own safety.',
    lore:'All dragons command respect. The Stormlord Drake commands it at a distance of thirty feet in all directions, measured from the point of furthest arc. This is a larger radius than most.'
  },

  storm_tide: {
    id:'storm_tide', name:'Maelstrom Caller', icon:'🌊',
    tagline:'The storm and the sea were always the same argument.',
    color:'#4d99d5', element:'electric', elementFlavor:'stormsurge', rarity:'rare',
    fusedFrom:['stormcaller','tidecaller'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:12,def:8,spd:14,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ice_storm','electric_ground_quake','normal_electric_storm','normal_electric_jolt'],
    burstAbility:'storm_burst',
    passives:['static_charge','tidal_flow'],
    description:'Commands weather at the intersection of sea and sky — calls lightning from storm clouds into water, generating electrified tidal surges. The water conducts the electricity across the entire battlefield simultaneously.',
    lore:'The tidecaller called storms at sea. The stormcaller called storms from land. They called the same storm once, from opposite ends, and the result convinced both of them that collaboration was preferable to competition.'
  },

  storm_gravitist: {
    id:'storm_gravitist', name:'The Gravity Storm', icon:'⚫',
    tagline:'Mass and charge are cousins. This one found the family resemblance.',
    color:'#4d77a2', element:'electric', elementFlavor:'gravitron', rarity:'epic',
    fusedFrom:['stormcaller','gravitist'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:11,def:7,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_space_singularity','electric_space_collapse','electric_cosmic_gravity_well','electric_space_warp'],
    burstAbility:'gravitist_burst',
    passives:['static_charge','gravity_well'],
    description:'Warps gravity to direct lightning — bolts that curve around corners, chain lightning that defies geometry, and gravitational singularities that pull all electrical charge into a single catastrophic point.',
    lore:'Gravity pulls things together. Electricity follows the path of least resistance. The Gravity Storm found a configuration where those two facts produce the same path, which is into whatever is currently unlucky enough to be in range.'
  },

  storm_soundbreaker: {
    id:'storm_soundbreaker', name:'The Thunderbreak', icon:'🔊',
    tagline:'Thunder and sound were always the same. Now they are weaponized together.',
    color:'#99a299', element:'electric', elementFlavor:'thunderwave', rarity:'rare',
    fusedFrom:['stormcaller','soundbreaker'],
    stats:{hp:83,maxHp:83,mp:83,maxMp:83,atk:13,def:7,spd:15,crit:16},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:9,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_rock_seismic','electric_rock_resonance','electric_ground_discharge','electric_ground_quake'],
    burstAbility:'soundbreaker_burst',
    passives:['static_charge','resonance'],
    description:'Lightning-speed sound attacks that shatter defenses before the electricity even arrives. Uses sonic resonance to find structural weaknesses in armor, then delivers electricity directly into those weaknesses with thunderclap precision.',
    lore:'Thunder is sound that lightning makes. The soundbreaker made sound into a weapon. The Thunderbreak made them the same weapon, and specifically made it the loudest and most damaging version of that weapon possible.'
  },

  storm_chrono: {
    id:'storm_chrono', name:'Temporal Lightning', icon:'⏳',
    tagline:'Lightning already struck. It also will strike. It is striking.',
    color:'#8091ee', element:'electric', elementFlavor:'timestorm', rarity:'epic',
    fusedFrom:['stormcaller','chronomancer'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:11,def:7,spd:14,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_time_stasis','electric_time_rewind','electric_time_pulse','electric_time_surge'],
    burstAbility:'chronomancer_burst',
    passives:['static_charge','time_warp'],
    description:'Calls lightning from multiple points in time simultaneously — a bolt that already struck adds to a bolt currently striking adds to one about to strike. The Temporal Lightning turns every exchange into a temporal pile-on.',
    lore:'Lightning is instantaneous. Time is not. The Temporal Lightning discovered a technique that makes lightning as patient as time, and time as fast as lightning. The implications keep both components very busy.'
  },

  storm_spellsword: {
    id:'storm_spellsword', name:'Arc Blade', icon:'⚡',
    tagline:'The blade carries the charge. The spell carries the blade.',
    color:'#806fc4', element:'psychic', elementFlavor:'psiblast', rarity:'rare',
    fusedFrom:['stormcaller','spellsword'],
    stats:{hp:88,maxHp:88,mp:80,maxMp:80,atk:13,def:8,spd:14,crit:16},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_psychic_pulse','electric_psychic_vortex','electric_psychic_feedback','electric_psychic_spark'],
    burstAbility:'spellsword_burst',
    passives:['static_charge','spellblade'],
    description:'Psychic spells delivered at lightning speed, physical strikes that arc static into the mind, and an attack chain that builds feedback loops between mental and electrical damage. Each hit makes the next hit worse for the target in both dimensions.',
    lore:'The spellsword said: I fight with mind and blade. The stormcaller said: I fight with speed and electricity. The Arc Blade fights with all four simultaneously, which leaves enemies very few good options.'
  },

  storm_plague: {
    id:'storm_plague', name:'The Epidemic Arc', icon:'🧫',
    tagline:'The lightning spreads the plague. The plague spreads by proximity. The proximity spreads by lightning.',
    color:'#6fa288', element:'poison', elementFlavor:'toxicstorm', rarity:'epic',
    fusedFrom:['stormcaller','plaguedoctor'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:11,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_poison_storm','electric_poison_cascade','electric_poison_conduct','electric_poison_venom'],
    burstAbility:'plague_doctor_burst',
    passives:['static_charge','immunity'],
    description:'Uses chain lightning as a disease vector — each bolt carries engineered plague to every target it arcs through. A single infected enemy becomes a transmission tower for the next bolt. The more infected targets, the wider the arc.',
    lore:'The plaguedoctor wanted better transmission vectors. The stormcaller suggested lightning. The Epidemic Arc can infect an entire room from a single initial strike, which the plaguedoctor described as professionally satisfying.'
  },

  storm_geo: {
    id:'storm_geo', name:'The Groundstrike', icon:'🪨',
    tagline:'The earth remembers every bolt. It conducts the next one.',
    color:'#809199', element:'electric', elementFlavor:'grounding', rarity:'uncommon',
    fusedFrom:['stormcaller','geomancer'],
    stats:{hp:93,maxHp:93,mp:75,maxMp:75,atk:12,def:10,spd:12,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:7,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ground_magnetize','electric_ground_conductivity','electric_rock_discharge','electric_rock_seismic'],
    burstAbility:'storm_burst',
    passives:['static_charge','earth_body'],
    description:'Grounds lightning into the earth, then releases it as seismic shockwaves across the floor. Charges the stone itself into a massive conductor — enemies touching the ground take continuous electrical damage while the Groundstrike controls the terrain.',
    lore:'The geomancer understood the earth. The stormcaller understood the sky. They discovered that most things happening between them were fundamentally the same process, just at different altitudes.'
  },

  storm_lightbringer: {
    id:'storm_lightbringer', name:'Aurora Wrath', icon:'🌅',
    tagline:'The northern lights are just divine lightning at full brightness.',
    color:'#aabb91', element:'electric', elementFlavor:'holystorm', rarity:'rare',
    fusedFrom:['stormcaller','lightbringer'],
    stats:{hp:85,maxHp:85,mp:83,maxMp:83,atk:13,def:8,spd:14,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_fairy_enchant','electric_fairy_supernova','electric_fairy_dazzle','electric_fairy_charm'],
    burstAbility:'lightbringer_burst',
    passives:['static_charge','radiant'],
    description:'Holy lightning that illuminates and destroys in equal measure. Dazzles enemies with blinding radiance before the bolt arrives. The Aurora Wrath makes being struck by divine electricity a profoundly disorienting sensory experience.',
    lore:'The lightbringer illuminated. The stormcaller electrified. The Aurora Wrath illuminates by electrifying — which is functionally indistinguishable from the original purposes and considerably more dramatic.'
  },

  storm_beast: {
    id:'storm_beast', name:'The Thunderpack', icon:'🐺',
    tagline:'The pack moves like lightning. Lightning moves like a pack.',
    color:'#6faa91', element:'electric', elementFlavor:'runestorm', rarity:'uncommon',
    fusedFrom:['stormcaller','beastmaster'],
    stats:{hp:90,maxHp:90,mp:73,maxMp:73,atk:13,def:8,spd:15,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:9,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_dragon_charge','electric_dragon_volt','normal_electric_conduit','normal_electric_storm'],
    burstAbility:'storm_burst',
    passives:['static_charge','feral_bond'],
    description:'Commands a pack of storm-touched beasts — animals that have been suffused with static charge and move with electric speed. Coordinates lightning strikes with animal pack tactics for flanking attacks that arrive from every angle simultaneously.',
    lore:'Animals fear lightning. The beastmaster learned to speak to that fear. The stormcaller learned to speak to the lightning. The Thunderpack found that both had been having the same conversation with different vocabulary.'
  },

  storm_tech: {
    id:'storm_tech', name:'Overclocked', icon:'💻',
    tagline:'The system runs hot. Hotter. Past the rated maximum. Still faster.',
    color:'#4d91c4', element:'electric', elementFlavor:'techstorm', rarity:'epic',
    fusedFrom:['stormcaller','techsavant'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:12,def:7,spd:15,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:9,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_steel_rail','electric_steel_overload','electric_steel_polarize','electric_steel_conductor'],
    burstAbility:'techsavant_burst',
    passives:['static_charge','overclock'],
    description:'Pushes every system past its rated limit using raw storm energy. Machines become railguns. Armor becomes a lightning rod that recharges on impact. Processing speed exceeds any rated threshold while the storm energy lasts, which is until the fight ends.',
    lore:'The techsavant built systems with safety margins. The stormcaller said: what if we removed those? The resulting entity has no safety margins, runs extremely fast, and has never exploded during a fight. Once. Between fights. It was fine.'
  },

  storm_grave: {
    id:'storm_grave', name:'The Lightning Lich', icon:'💀',
    tagline:'The storm that refuses death is considerably more inconvenient than one that accepts it.',
    color:'#5580b3', element:'ghost', elementFlavor:'stormsoul', rarity:'rare',
    fusedFrom:['stormcaller','gravewarden'],
    stats:{hp:100,maxHp:100,mp:73,maxMp:73,atk:12,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ghost_surge','electric_ghost_drain','electric_ghost_possession','water_ghost_phase'],
    burstAbility:'storm_burst',
    passives:['static_charge','undying'],
    description:'A storm that cannot end because it refuses to. Binds storm energy to dead matter to animate it, then uses that animated army to extend the storm further. When nearly defeated, releases everything stored as one final catastrophic discharge.',
    lore:'The gravewarden kept dead things from ending. The stormcaller kept storms from ending. The Lightning Lich keeps both, and the argument about which is more unsettling has never been resolved.'
  },

  storm_magnetist: {
    id:'storm_magnetist', name:'The Lodestone Storm', icon:'🧲',
    tagline:'Every bolt finds the largest conductor. The lodestone makes itself that conductor.',
    color:'#5599c4', element:'electric', elementFlavor:'magnetstorm', rarity:'rare',
    fusedFrom:['stormcaller','magnetist'],
    stats:{hp:85,maxHp:85,mp:83,maxMp:83,atk:13,def:8,spd:13,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_steel_magnetize','electric_steel_coil','electric_ground_magnetize','electric_steel_polarize'],
    burstAbility:'magnetist_burst',
    passives:['static_charge','magnetic_field'],
    description:'Uses magnetic fields to direct lightning with surgical precision — draws bolts toward metallic armor, creates electromagnetic cages that hold enemies in place for sustained arcing, and redirects incoming attacks into stored charge.',
    lore:'The magnetist moved metal. The stormcaller moved lightning. The Lodestone Storm discovered that lightning is metal in the same way that fire is light — which is to say, technically, and with useful implications.'
  },

  storm_crystal: {
    id:'storm_crystal', name:'Crystal Conductor', icon:'💎',
    tagline:'Perfect crystal lattice conducts without resistance. The enemy provides the resistance.',
    color:'#6faaee', element:'crystal', elementFlavor:'crystalstorm', rarity:'epic',
    fusedFrom:['stormcaller','crystalmancer'],
    stats:{hp:78,maxHp:78,mp:90,maxMp:90,atk:13,def:7,spd:15,crit:18},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:9,MP:9},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_crystal_resonate','electric_crystal_cascade','electric_crystal_prism','electric_crystal_overload'],
    burstAbility:'crystalmancer_burst',
    passives:['static_charge','crystal_body'],
    description:'Grows crystal lattices across the battlefield that act as perfect conductors for storm energy. Lightning entering from one crystal exits from all of them simultaneously. A single bolt can arc to every crystal in range in the same instant.',
    lore:'Crystal is a perfect conductor. The stormcaller had a lot of lightning and needed somewhere to put it. The crystalmancer built the infrastructure. The Crystal Conductor is the result of both parties getting exactly what they wanted.'
  },

  storm_war: {
    id:'storm_war', name:'Stormbreaker General', icon:'⚔️',
    tagline:'Commands the battlefield. The battlefield includes the sky.',
    color:'#916f6f', element:'electric', elementFlavor:'warstorm', rarity:'rare',
    fusedFrom:['stormcaller','warlord'],
    stats:{hp:103,maxHp:103,mp:68,maxMp:68,atk:14,def:10,spd:13,crit:14},
    statDisplay:{HP:7,ATK:10,DEF:7,SPD:8,MP:7},
    abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','electric_ground_discharge','electric_ground_conductivity','normal_electric_overload','electric_rock_slam'],
    burstAbility:'storm_burst',
    passives:['static_charge','battle_hardened'],
    description:'A warlord who fights with an entire storm as their army. Directs lightning strikes as tactical strikes, uses thunderclaps as area denial, and personally charges into melee while the storm continues the ranged bombardment above.',
    lore:'The warlord said: I need range. The stormcaller said: I have range. The warlord said: and close combat? The stormcaller said: also yes. The resulting partnership won the next three engagements before either side had a chance to plan them.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_4);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_4);
  FUSION_LOADED_FILES.add(4);
  if(typeof console!=='undefined') console.debug('[Fusion] File 4 loaded (37 classes)');
})();
