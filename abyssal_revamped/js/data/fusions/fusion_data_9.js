// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 9 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_9 = {
  'chronomancer+frostweaver': 'frost_chrono',
  'frostweaver+spellsword': 'frost_spellsword',
  'frostweaver+plaguedoctor': 'frost_plague',
  'frostweaver+geomancer': 'frost_geo',
  'frostweaver+lightbringer': 'frost_lightbringer',
  'beastmaster+frostweaver': 'frost_beast',
  'frostweaver+techsavant': 'frost_tech',
  'frostweaver+gravewarden': 'frost_grave',
  'frostweaver+magnetist': 'frost_magnetist',
  'crystalmancer+frostweaver': 'frost_crystal',
  'frostweaver+warlord': 'frost_war',
  'frostweaver+spiritwalker': 'frost_spirit',
  'frostweaver+hexblade': 'frost_hex',
  'cosmomancer+frostweaver': 'frost_cosmo',
  'frostweaver+pestilencelord': 'frost_pestilence',
  'frostweaver+windwalker': 'frost_wind',
  'doomcaster+frostweaver': 'frost_doom',
  'arcanist+frostweaver': 'frost_arcanist',
  'frostweaver+sentinel': 'frost_sentinel',
  'frostweaver+phantom': 'frost_phantom',
  'dragonknight+tidecaller': 'dragon_tide',
  'dragonknight+gravitist': 'dragon_gravitist',
  'dragonknight+soundbreaker': 'dragon_soundbreaker',
  'chronomancer+dragonknight': 'dragon_chrono',
  'dragonknight+spellsword': 'dragon_spellsword',
  'dragonknight+plaguedoctor': 'dragon_plague',
  'dragonknight+geomancer': 'dragon_geo',
  'dragonknight+lightbringer': 'dragon_lightbringer',
  'beastmaster+dragonknight': 'dragon_beast',
  'dragonknight+techsavant': 'dragon_tech',
  'dragonknight+gravewarden': 'dragon_grave',
  'dragonknight+magnetist': 'dragon_magnetist',
  'crystalmancer+dragonknight': 'dragon_crystal',
  'dragonknight+warlord': 'dragon_war',
  'dragonknight+spiritwalker': 'dragon_spirit',
  'dragonknight+hexblade': 'dragon_hex',
  'cosmomancer+dragonknight': 'dragon_cosmo'
};

const FUSION_CLASSES_9 = {
  frost_chrono: {
    id:'frost_chrono', name:'The Stillness', icon:'❄️',
    tagline:'Time frozen is not time stopped. It is time held still for examination.',
    color:'#99b3ff', element:'frozentime', rarity:'epic',
    fusedFrom:['frostweaver','chronomancer'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:10,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_time_stance','ice_time_blast','ice_time_weaken','ice_time_strike'],
    burstAbility:'chronomancer_burst',
    passives:['frost_mastery','time_warp'],
    description:'Combines temporal and thermal stasis — freezes enemies in both time and temperature simultaneously, creating targets that cannot move, age, or change. The Stillness creates perfect, indefinite stasis and then continues the fight around it.',
    lore:'The frostweaver froze things in place. The chronomancer froze things in time. The Stillness found these were parallel operations and that applying both simultaneously achieves a degree of stasis that neither technique reaches alone, which the frozen targets find difficult to argue with.'
  },

  frost_spellsword: {
    id:'frost_spellsword', name:'The Winter Blade', icon:'❄️',
    tagline:'The cold spell and the cold sword are the same cold applied twice.',
    color:'#9991d5', element:'frostmind', rarity:'epic',
    fusedFrom:['frostweaver','spellsword'],
    stats:{hp:85,maxHp:85,mp:83,maxMp:83,atk:12,def:8,spd:13,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_psychic_freeze','ice_psychic_drain','ice_psychic_vortex','ice_psychic_shard'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','spellblade'],
    description:'Psychic frost — cold that enters the mind before the body, freezing cognitive processes before physical ones. The Winter Blade chills thinking, then chills the thinker. Targets fight with slowed reflexes before they understand why.',
    lore:'The spellsword struck at mind and body. The frostweaver chilled everything. The Winter Blade found that chilling the mind first is considerably more efficient than chilling it second, and that psychic frost produces a cognitive effect that physical cold alone does not replicate.'
  },

  frost_plague: {
    id:'frost_plague', name:'The Frozen Sickness', icon:'❄️',
    tagline:'Cold slows metabolism. Cold slows the disease. Cold also extends how long the target experiences it.',
    color:'#88c499', element:'frostedplague', rarity:'epic',
    fusedFrom:['frostweaver','plaguedoctor'],
    stats:{hp:78,maxHp:78,mp:93,maxMp:93,atk:10,def:8,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:6,SPD:7,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_dark_blight','ice_dark_entropy','ice_dark_drift','fire_poison_plague'],
    burstAbility:'plaguedoctor_burst',
    passives:['frost_mastery','immunity'],
    description:'Preserves disease in frozen hosts — cold enough to slow metabolism and extend the infection process, ensuring maximum duration of effect. The Frozen Sickness does not kill quickly. It makes the process very long and very thorough.',
    lore:'The plaguedoctor made disease that acted fast. The frostweaver slowed things down. The Frozen Sickness found that slowing a disease extends the window of its effect, which is better for coverage and worse for anyone who was hoping the situation would resolve quickly.'
  },

  frost_geo: {
    id:'frost_geo', name:'The Permafrost', icon:'❄️',
    tagline:'The frozen ground holds forever. It was the temporary ground that was the anomaly.',
    color:'#99b3aa', element:'permafrost', rarity:'rare',
    fusedFrom:['frostweaver','geomancer'],
    stats:{hp:90,maxHp:90,mp:78,maxMp:78,atk:12,def:11,spd:11,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:8,SPD:6,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_rock_frostquake','ice_rock_shatter','ice_rock_crystallize','ice_rock_avalanche'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','earth_body'],
    description:'Freezes the earth into permafrost — ground so cold it becomes a weapon. Ice-rock shockwaves crack frozen floors, avalanches of ice-stone bury enemies, and the battlefield is perpetually reconfigured by geological cold that does not thaw between engagements.',
    lore:'The geomancer shaped earth. The frostweaver shaped cold. The Permafrost found the boundary between these disciplines is the ground in winter, and that a winter the frostweaver controls has no summer, which is the most advantageous condition possible for geological ice tactics.'
  },

  frost_lightbringer: {
    id:'frost_lightbringer', name:'The Aurora', icon:'❄️',
    tagline:'The coldest lights are the oldest lights. They have learned patience.',
    color:'#c4dda2', element:'holyice', rarity:'epic',
    fusedFrom:['frostweaver','lightbringer'],
    stats:{hp:83,maxHp:83,mp:85,maxMp:85,atk:12,def:9,spd:13,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','normal_light_blind','normal_light_dawn','ice_dark_eclipse','ice_ghost_chill'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','radiant'],
    description:'Aurora light — cold radiance that illuminates and freezes simultaneously, blinding flashes of light that leave frost on the target\'s vision. The Aurora fights with a light that is beautiful from a distance and devastating up close.',
    lore:'The northern lights are visible because it is cold enough to see them clearly. The lightbringer provided the light; the frostweaver provided the clarity. The Aurora combined these and found that cold light has properties that warm light does not, most of them useful.'
  },

  frost_beast: {
    id:'frost_beast', name:'The Arctic Pack', icon:'❄️',
    tagline:'Cold-weather predators do not slow in winter. Everything else does.',
    color:'#88cca2', element:'frostrune', rarity:'rare',
    fusedFrom:['frostweaver','beastmaster'],
    stats:{hp:88,maxHp:88,mp:75,maxMp:75,atk:13,def:9,spd:14,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:7},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_wind_freeze','ice_wind_slow','normal_ice_prison','normal_dragon_surge'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','feral_bond'],
    description:'Commands cold-adapted predators — beasts that move faster in freezing conditions, hunting across ice without slowing, whose pack tactics coordinate with the frostweaver\'s environmental cold. When the frost spreads, the Arctic Pack moves freely through what slows the enemy.',
    lore:'Arctic animals are not affected by arctic conditions. This is their defining competitive advantage. The beastmaster chose them specifically; the frostweaver provided the conditions; the Arctic Pack fights in a battlefield configured to favor predators that were already adapted to it.'
  },

  frost_tech: {
    id:'frost_tech', name:'Cryogenic Systems', icon:'❄️',
    tagline:'Cooling is a technical problem. This one is solved permanently and applied offensively.',
    color:'#66b3d5', element:'cryotech', rarity:'epic',
    fusedFrom:['frostweaver','techsavant'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:12,def:8,spd:14,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_steel_glacial','ice_steel_shard','ice_steel_brittle','fire_cyber_heat_sink'],
    burstAbility:'techsavant_burst',
    passives:['frost_mastery','overclock'],
    description:'Industrial cold applied as a weapon — cryogenic systems that flash-freeze mechanical and biological targets, ice-steel shards that shatter armor at cold-brittleness thresholds, and heat sinks that drain thermal energy from any system they contact.',
    lore:'Cooling systems are essential to any high-performance machine. The frostweaver provided cooling. The techsavant provided the machine. Cryogenic Systems found that sufficiently extreme cooling is indistinguishable from an attack and has been treating them as the same operation since the insight arrived.'
  },

  frost_grave: {
    id:'frost_grave', name:'The Glacier Tomb', icon:'❄️',
    tagline:'The glaciers preserve everything they consume. They are very patient about it.',
    color:'#6fa2c4', element:'frosted_ghost', rarity:'rare',
    fusedFrom:['frostweaver','gravewarden'],
    stats:{hp:98,maxHp:98,mp:75,maxMp:75,atk:12,def:11,spd:11,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_ghost_wraith','ice_ghost_chill','normal_ice_prison','normal_ice_shatter'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','undying'],
    description:'Preserves itself in glacier-cold — the Glacier Tomb slows its own deterioration to near zero, survives damage that would kill anything else by simply not responding to it biologically, and buries the dead in ice where they remain perfectly preserved indefinitely.',
    lore:'Glaciers preserve whatever they cover for thousands of years. The gravewarden considered this a useful property. The frostweaver considered it a natural extension of their professional practice. The Glacier Tomb considers it neither: it is simply how it lives, which it continues to do at a temperature most organisms find incompatible with living.'
  },

  frost_magnetist: {
    id:'frost_magnetist', name:'The Magnetic Glacier', icon:'❄️',
    tagline:'Ice is diamagnetic. At scale, this becomes interesting.',
    color:'#6fbbd5', element:'magnestice', rarity:'epic',
    fusedFrom:['frostweaver','magnetist'],
    stats:{hp:83,maxHp:83,mp:85,maxMp:85,atk:12,def:9,spd:12,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_steel_glacial','fire_magnet_pull','ice_steel_temper','electric_steel_magnetize'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','magnetic_field'],
    description:'Magnetically suspended ice structures — levitating glacier fragments directed by magnetic fields, ice that orbits the Magnetic Glacier in a controlled storm, and metal weapons pulled out of enemy hands and frozen in place before being redirected.',
    lore:'Ice is diamagnetic: it is repelled by magnetic fields. The magnetist knew this. At sufficient field strength and ice quantity, this property becomes tactically useful. The Magnetic Glacier operates at sufficient field strength and considerable ice quantity.'
  },

  frost_crystal: {
    id:'frost_crystal', name:'The Ice Lattice', icon:'❄️',
    tagline:'Perfect ice is perfect crystal. This is the perfect ice.',
    color:'#88ccff', element:'crystalice', rarity:'legendary',
    fusedFrom:['frostweaver','crystalmancer'],
    stats:{hp:75,maxHp:75,mp:93,maxMp:93,atk:13,def:7,spd:14,crit:18},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:8,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_rock_crystallize','ice_rock_shatter','fire_crystal_refract','ice_ghost_ethereal'],
    burstAbility:'crystalmancer_burst',
    passives:['frost_mastery','crystal_body'],
    description:'Grows perfect ice-crystal lattices across the battlefield — structures of geometric cold that refract ice energy in the same way crystal refracts light, multiplying every ice attack through every lattice node simultaneously. The Ice Lattice turns the entire arena into a cold-resonance chamber.',
    lore:'Ice is crystalline water. The crystalmancer worked with crystals; the frostweaver worked with ice. The Ice Lattice found these were not different materials but the same material at the same temperature, and that a perfect crystal at absolute zero is the most structurally ideal substance available.'
  },

  frost_war: {
    id:'frost_war', name:'The Frozen Campaign', icon:'❄️',
    tagline:'Winter campaigns fail. This is the winter commanding the campaign.',
    color:'#aa9180', element:'frostwar', rarity:'rare',
    fusedFrom:['frostweaver','warlord'],
    stats:{hp:100,maxHp:100,mp:70,maxMp:70,atk:14,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_wind_freeze','ice_wind_storm','fire_fighting_rage','normal_ice_prison'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','battle_hardened'],
    description:'Commands from inside a cold that applies to the enemy and not the allies. Tactical formations optimized for frozen terrain, war-cries that flash-freeze the air in the opponent\'s lungs, and the cold certainty of a warlord who has never once suffered from winter conditions.',
    lore:'Historically, winter defeats armies. The Frozen Campaign is the exception: a warlord who has made winter their operational environment rather than their obstacle. The enemy army, arriving in conventional equipment, finds the weather has already declared sides.'
  },

  frost_spirit: {
    id:'frost_spirit', name:'The Winter Spirit', icon:'❄️',
    tagline:'The oldest spirits lived through the ice age. They remember.',
    color:'#66c4c4', element:'frostspirit', rarity:'epic',
    fusedFrom:['frostweaver','spiritwalker'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:11,def:9,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_ghost_wraith','ice_ghost_phantasm','ice_ghost_siphon','ice_ghost_chill'],
    burstAbility:'spiritwalker_burst',
    passives:['frost_mastery','spirit_bond'],
    description:'Channels winter spirits — frost-touched entities that move through cold terrain without resistance, spirit attacks that chill the soul as well as the body, and a spiritual cold that bypasses physical insulation entirely. The Winter Spirit reaches through warmth to deliver cold directly.',
    lore:'Spirits predate the current climate. The oldest ones remember colder periods and retained the cold as a defining characteristic. The spiritwalker found them; the frostweaver found they were already practicing the same discipline from the inside.'
  },

  frost_hex: {
    id:'frost_hex', name:'The Winter Curse', icon:'❄️',
    tagline:'Cold curses last longer. Everything in cold lasts longer. This is the problem.',
    color:'#8880c4', element:'bloodfrost', rarity:'epic',
    fusedFrom:['frostweaver','hexblade'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:12,def:8,spd:13,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_dark_entropy','ice_dark_blight','ice_dark_frost','normal_void_curse'],
    burstAbility:'hexblade_burst',
    passives:['frost_mastery','hex_master'],
    description:'Cold-preserved hexes — curses sealed in ice that last indefinitely because cold preserves everything. The Winter Curse delivers hexes that cannot be dispelled while the target remains frozen, and remains frozen longer than any dispel can manage.',
    lore:'Hexes degrade over time. The frostweaver noted that cold slows degradation. The Winter Curse combines these observations and has produced hexes that have been continuously active since their initial application with no detectable reduction in potency. The plaguedoctor finds this professionally impressive.'
  },

  frost_cosmo: {
    id:'frost_cosmo', name:'The Cold Between Stars', icon:'❄️',
    tagline:'The temperature of the universe is three degrees above absolute zero. This is closer.',
    color:'#6688d5', element:'cosmicice', rarity:'legendary',
    fusedFrom:['frostweaver','cosmomancer'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:11,def:7,spd:13,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_cosmic_surge','ice_cosmic_stance','ice_cosmic_blast','normal_space_phase'],
    burstAbility:'cosmomancer_burst',
    passives:['frost_mastery','stardust'],
    description:'Channels the cold of deep space — the ambient temperature between galaxies, concentrated and directed. The Cold Between Stars operates at temperatures that make dungeon cold feel like a warm afternoon. Nothing survives extended contact with interstellar vacuum.',
    lore:'The cosmomancer studied the universe. Most of it is extremely cold. The frostweaver found this professionally relevant. The Cold Between Stars imports that temperature to local combat range, which involves a thermal differential that almost all known materials find terminal.'
  },

  frost_pestilence: {
    id:'frost_pestilence', name:'The Preserved Contagion', icon:'❄️',
    tagline:'The frozen plague does not spread. It detonates.',
    color:'#6fb380', element:'frostedplague', rarity:'legendary',
    fusedFrom:['frostweaver','pestilencelord'],
    stats:{hp:80,maxHp:80,mp:93,maxMp:93,atk:12,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_dark_blight','fire_poison_plague','fire_bug_plague','ice_ghost_chill'],
    burstAbility:'pestilence_burst',
    passives:['frost_mastery','plague_lord'],
    description:'Freezes plague inside the target — disease suspended in biological ice, preserved at full potency. When the ice shatters (at a time of the caster\'s choosing), the preserved contagion releases all at once rather than gradually. The Preserved Contagion stores up to deliver everything simultaneously.',
    lore:'Cold preserves biological material. The plaguedoctor confirmed this was true of their engineered diseases as well. The Preserved Contagion uses this property to hold plague in suspension until the optimal moment, at which point the delivery is instantaneous and comprehensive rather than gradual and partial.'
  },

  frost_wind: {
    id:'frost_wind', name:'The Blizzard', icon:'❄️',
    tagline:'Wind and cold are inseparable at sufficient intensity. This is sufficient intensity.',
    color:'#88d5d5', element:'blizzard', rarity:'rare',
    fusedFrom:['frostweaver','windwalker'],
    stats:{hp:80,maxHp:80,mp:78,maxMp:78,atk:12,def:7,spd:17,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:9,MP:7},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_wind_blizzard','ice_wind_storm','ice_wind_barrier','ice_wind_slow'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','gust'],
    description:'A self-sustaining blizzard — wind and cold feeding each other into a perpetual white-out. Moving at 17 SPD through a whiteout environment of one\'s own creation, the Blizzard is untargetable by enemies who cannot see through it and devastating to those who can.',
    lore:'Blizzards are wind and cold combined past the threshold of either individually. The windwalker exceeded wind thresholds; the frostweaver exceeded cold thresholds. The Blizzard exceeds both simultaneously and has found the resulting combination is a weather event that most tactical frameworks were not designed to address.'
  },

  frost_doom: {
    id:'frost_doom', name:'The Frozen Sentence', icon:'❄️',
    tagline:'Doom preserved in ice does not expire. The target does.',
    color:'#778899', element:'bloodfrost', rarity:'legendary',
    fusedFrom:['frostweaver','doomcaster'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:11,def:6,spd:13,crit:16},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_dark_entropy','ice_time_weaken','ice_ghost_chill','normal_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['frost_mastery','doom_aura'],
    description:'Seals doom in ice — the death sentence is frozen at the moment of application, preventing any countermeasure from reaching it before it executes. The Frozen Sentence cannot be broken by warmth or healing; it simply waits, perfectly preserved, for its scheduled moment.',
    lore:'Doom can sometimes be avoided if acted on quickly. The Frozen Sentence solves this: doom sealed in ice cannot be reached by any conventional removal technique. The target can attempt to thaw the sentence, but the doom executes the moment thawing begins, which is the same outcome with less waiting.'
  },

  frost_arcanist: {
    id:'frost_arcanist', name:'The Cold Formula', icon:'❄️',
    tagline:'Every system behaves predictably at low temperature. The formula is simple.',
    color:'#6f88e6', element:'frostmind', rarity:'legendary',
    fusedFrom:['frostweaver','arcanist'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:10,def:6,spd:13,crit:17},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_psychic_pierce','ice_psychic_vortex','ice_psychic_drain','ice_psychic_freeze'],
    burstAbility:'arcanist_burst',
    passives:['frost_mastery','arcane_mastery'],
    description:'Applies arcane precision to cold — calculates exact freezing thresholds for every target, delivers cold to the specific biological and magical systems that are most vulnerable to it, and constructs psychic ice structures of mathematical exactness.',
    lore:'At low temperatures, molecular behavior is predictable. The arcanist liked predictable. The frostweaver provided the low temperatures. The Cold Formula found that freezing things to the point where their behavior can be mathematically anticipated makes arcane calculation considerably more reliable.'
  },

  frost_sentinel: {
    id:'frost_sentinel', name:'The Glacial Wall', icon:'❄️',
    tagline:'The wall is ice. The ice is also a wall. Both are several meters thick.',
    color:'#88b3c4', element:'glacialsteel', rarity:'rare',
    fusedFrom:['frostweaver','sentinel'],
    stats:{hp:120,maxHp:120,mp:63,maxMp:63,atk:10,def:14,spd:9,crit:10},
    statDisplay:{HP:8,ATK:7,DEF:9,SPD:5,MP:6},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','normal_ice_armor','normal_ice_prison','ice_rock_avalanche','normal_ice_shatter'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','bastion'],
    description:'An immovable barrier of glacial ice — hits only reinforce the fortification by contributing thermal energy that the Glacial Wall converts to additional cold. Every attack makes the wall colder. Colder means thicker. Thicker means harder to cross.',
    lore:'The sentinel held position through everything. The frostweaver turned damage into cold. The Glacial Wall combined these and found that a defensive position that gets more defensible when attacked is, in practical terms, an ideal defensive position.'
  },

  frost_phantom: {
    id:'frost_phantom', name:'The Frost Wraith', icon:'❄️',
    tagline:'The coldest ghosts are the ones that were ice before they were anything else.',
    color:'#88bbdd', element:'frosted_ghost', rarity:'mythical',
    fusedFrom:['frostweaver','phantom'],
    stats:{hp:75,maxHp:75,mp:83,maxMp:83,atk:13,def:6,spd:16,crit:21},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:9,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_ghost_wraith','ice_ghost_ethereal','ice_ghost_phantasm','water_ghost_phase'],
    burstAbility:'phantom_burst',
    passives:['frost_mastery','phase'],
    description:'A spectral entity made of ice — phases through enemies leaving frost inside them, attacks from a state of near-total immateriality that weapons cannot reach, and drains warmth through spectral contact. The Frost Wraith freezes from the inside out.',
    lore:'Ghosts are cold. The frostweaver made things colder. The Frost Wraith emerged from the overlap and is colder than either source independently — a ghost composed of frost that phases through living things and leaves them colder for having been passed through.'
  },

  dragon_tide: {
    id:'dragon_tide', name:'Sea Serpent', icon:'🐉',
    tagline:'The ocean has always had dragons. They just stayed at the bottom.',
    color:'#918066', element:'tidewyrm', rarity:'rare',
    fusedFrom:['dragonknight','tidecaller'],
    stats:{hp:108,maxHp:108,mp:70,maxMp:70,atk:14,def:11,spd:12,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_wind_drain','dragon_wind_strike','water_ghost_drown','normal_dragon_surge'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','tidal_flow'],
    description:'A sea dragon risen from the depths — tidal commands coordinated with draconic strikes, water flooding the battlefield before the dragon charges through it, and a serpentine combat style adapted from ocean currents rather than terrestrial movement.',
    lore:'The ocean contains the largest animals. The deepest parts have never been fully explored. The Sea Serpent arrived from one of those parts and has brought the attitude of something that has been at the top of the food chain in a very large ecosystem for a very long time.'
  },

  dragon_gravitist: {
    id:'dragon_gravitist', name:'The Gravity Drake', icon:'🐉',
    tagline:'Large mass creates gravitational pull. This drake is aware of this.',
    color:'#915e33', element:'heavenwyrm', rarity:'epic',
    fusedFrom:['dragonknight','gravitist'],
    stats:{hp:103,maxHp:103,mp:73,maxMp:73,atk:13,def:9,spd:11,crit:13},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:6,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','normal_gravity_crush','normal_gravity_pull','normal_dragon_roar','dragon_wind_drain'],
    burstAbility:'gravitist_burst',
    passives:['intimidation','gravity_well'],
    description:'A dragon with gravitational control — increases its own effective mass during charges, creates gravitational wells that pull enemies toward its position, and uses the draconic mass as an amplifier for crushing gravitational attacks.',
    lore:'Dragons are large. Large things have gravitational pull. The Gravity Drake learned to apply this property deliberately rather than incidentally, which dramatically changes the experience of being in the vicinity of a dragon charge when the dragon is also actively pulling you toward it.'
  },

  dragon_soundbreaker: {
    id:'dragon_soundbreaker', name:'The Roar', icon:'🐉',
    tagline:'The sound of a dragon is already a weapon. This is that, tuned for maximum delivery.',
    color:'#dd882b', element:'dragonroar', rarity:'epic',
    fusedFrom:['dragonknight','soundbreaker'],
    stats:{hp:105,maxHp:105,mp:68,maxMp:68,atk:15,def:9,spd:13,crit:13},
    statDisplay:{HP:7,ATK:11,DEF:6,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','ice_sound_shatter','ice_sound_dissonance','dragon_wind_strike','dragon_wind_weaken'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','resonance'],
    description:'The dragon\'s roar as a precision weapon — calibrated to the exact frequency that shatters armor, disrupts spell concentration, and triggers fear responses simultaneously. The Roar is not just loud. It is structurally targeted at whatever the enemy needs to be intact.',
    lore:'Dragon roars cause fear. The soundbreaker studied why. The answer is that dragon roars operate at multiple frequencies simultaneously, several of which target specific biological fear responses. The Roar refined this to a deliberate delivery system, which is considerably more efficient than the original instinctive version.'
  },

  dragon_chrono: {
    id:'dragon_chrono', name:'The Ancient Drake', icon:'🐉',
    tagline:'The oldest dragons remember the first age. They operate on its timeline.',
    color:'#c47780', element:'timedrake', rarity:'epic',
    fusedFrom:['dragonknight','chronomancer'],
    stats:{hp:100,maxHp:100,mp:80,maxMp:80,atk:13,def:9,spd:12,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_time_surge','dragon_time_strike','dragon_time_dot_strike','normal_time_age'],
    burstAbility:'chronomancer_burst',
    passives:['intimidation','time_warp'],
    description:'An ancient dragon operating outside the normal timeline — attacks that arrive before they are seen, draconic charges that move through temporal shortcuts, and the accumulated patience of something that has been alive since the dungeon was young.',
    lore:'Ancient dragons have existed long enough to develop a personal relationship with time that younger beings do not share. The Ancient Drake has been alive for enough temporal cycles to understand shortcuts in the timeline that the chronomancer was still mapping. Their collaboration accelerated both.'
  },

  dragon_spellsword: {
    id:'dragon_spellsword', name:'The Arcane Wyrm', icon:'🐉',
    tagline:'Dragonfire is already magic. This is the academic version.',
    color:'#c45555', element:'minddrake', rarity:'epic',
    fusedFrom:['dragonknight','spellsword'],
    stats:{hp:110,maxHp:110,mp:65,maxMp:65,atk:15,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:11,DEF:8,SPD:7,MP:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','electric_psychic_pulse','electric_dragon_charge','electric_dragon_overload','normal_dragon_wrath'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','spellblade'],
    description:'Enchants draconic attacks with arcane formulae — fire breath becomes a spell delivery system, claw strikes carry psionic charges, and the draconic presence amplifies arcane output to scales the spellsword alone could not achieve.',
    lore:'Dragons are inherently magical creatures. The spellsword added intentionality to the magic. The Arcane Wyrm combined these and found that a dragon doing arcane mathematics during a charge is more effective than a dragon doing only one of those things, which was already very effective.'
  },

  dragon_plague: {
    id:'dragon_plague', name:'The Venom Drake', icon:'🐉',
    tagline:'Dragon venom is already a disease vector. The plaguedoctor just improved the formula.',
    color:'#b3881a', element:'venomdrake', rarity:'epic',
    fusedFrom:['dragonknight','plaguedoctor'],
    stats:{hp:103,maxHp:103,mp:75,maxMp:75,atk:13,def:10,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:6,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_dark_dot_strike','dragon_dark_drain','fire_poison_plague','fire_bug_plague'],
    burstAbility:'plaguedoctor_burst',
    passives:['intimidation','immunity'],
    description:'A plague-bearing dragon — venom upgraded by the plaguedoctor to a weaponized biological agent, fire breath carrying engineered pathogens, and draconic scale wounds that deliver plague on every strike. The Venom Drake is a flying outbreak that likes to fight.',
    lore:'Dragon venom is biologically complex. The plaguedoctor studied it extensively. The Venom Drake is the result of that study: a dragon whose venom has been systematically optimized from naturally occurring to deliberately engineered, which is a modest improvement on a system that was already extremely effective.'
  },

  dragon_geo: {
    id:'dragon_geo', name:'The Stone Wyrm', icon:'🐉',
    tagline:'The mountain does not move. The dragon that lives inside it occasionally does.',
    color:'#c4772b', element:'earthdrake', rarity:'rare',
    fusedFrom:['dragonknight','geomancer'],
    stats:{hp:115,maxHp:115,mp:60,maxMp:60,atk:14,def:13,spd:9,crit:10},
    statDisplay:{HP:8,ATK:10,DEF:9,SPD:5,MP:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','fire_ground_quake','fire_rock_strike','ice_rock_avalanche','normal_dragon_roar'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','earth_body'],
    description:'A dragon born of stone — scales like granite, a burrow-charge that creates seismic events, and geomantic authority over the dungeon floors and walls. The Stone Wyrm does not fight on the terrain. It is the terrain, currently inconvenienced.',
    lore:'Mountain dragons were the original tenants of every mountain range. The Stone Wyrm is one of the ones that came inside and found the walls to its liking. It has been here longer than the dungeon, and it considers the dungeon to be a recent addition to its existing home.'
  },

  dragon_lightbringer: {
    id:'dragon_lightbringer', name:'Radiant Drake', icon:'🐉',
    tagline:'The divine fire is already fire. The distinction is principally moral.',
    color:'#eea222', element:'holydrake', rarity:'epic',
    fusedFrom:['dragonknight','lightbringer'],
    stats:{hp:108,maxHp:108,mp:68,maxMp:68,atk:15,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:11,DEF:8,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_light_strike','dragon_light_drain','dragon_light_weaken','normal_light_blind'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','radiant'],
    description:'A dragon whose fire has been elevated to holy flame — blinding radiance in draconic form, divine breath that purges corruption, and a presence so brilliant that enemies are disoriented before the physical attack arrives.',
    lore:'The lightbringer brought light. The dragonknight brought dragons. The Radiant Drake found these were multiplicative rather than additive and that the result — divine fire in draconic quantity and delivery — produces an effect that most enemies describe, briefly, as overwhelming.'
  },

  dragon_beast: {
    id:'dragon_beast', name:'The Apex Predator', icon:'🐉',
    tagline:'At the top of the food chain, there is the dragon. Above that, nothing. This is the dragon aware of that.',
    color:'#b39122', element:'runedrake', rarity:'rare',
    fusedFrom:['dragonknight','beastmaster'],
    stats:{hp:113,maxHp:113,mp:58,maxMp:58,atk:15,def:11,spd:13,crit:12},
    statDisplay:{HP:7,ATK:11,DEF:8,SPD:7,MP:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','normal_dragon_roar','normal_dragon_wrath','fire_fighting_rage','dragon_wind_strike'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','feral_bond'],
    description:'The apex predator commanding a pack of apex predators — the Apex Predator coordinates a dragon with a bestiary that takes cues from it. Pack animals instinctively follow draconic authority. The combination of dragon tactics and pack tactics has no natural counter.',
    lore:'Dragons are already apex predators. The beastmaster added coordination. The Apex Predator found that a dragon that also commands a coordinated predator pack expands its operational envelope from "large area" to "everywhere simultaneously," which is the tactical ideal.'
  },

  dragon_tech: {
    id:'dragon_tech', name:'The Mechanical Drake', icon:'🐉',
    tagline:'The biological and mechanical are both machines. The dragon has more moving parts.',
    color:'#917755', element:'mechdrake', rarity:'epic',
    fusedFrom:['dragonknight','techsavant'],
    stats:{hp:105,maxHp:105,mp:73,maxMp:73,atk:14,def:10,spd:13,crit:13},
    statDisplay:{HP:7,ATK:10,DEF:7,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','electric_dragon_charge','electric_dragon_overload','fire_cyber_overclock','fire_cyber_system_melt'],
    burstAbility:'techsavant_burst',
    passives:['intimidation','overclock'],
    description:'A dragon with integrated technical augmentation — electric overclocking that supercharges draconic attacks, technical systems that enhance fire breath efficiency, and mechanical joints that allow velocities beyond natural draconic physiology.',
    lore:'The techsavant applied engineering to every available system. The dragonknight provided a biological system of unusual complexity. The Mechanical Drake found that draconic biology is remarkably receptive to technical enhancement, which makes sense given that it is already a more sophisticated system than anything the techsavant had previously worked with.'
  },

  dragon_grave: {
    id:'dragon_grave', name:'The Undying Drake', icon:'🐉',
    tagline:'The dragon that dies here has died before. It is aware of the pattern.',
    color:'#996644', element:'dragonspirit', rarity:'rare',
    fusedFrom:['dragonknight','gravewarden'],
    stats:{hp:123,maxHp:123,mp:58,maxMp:58,atk:14,def:13,spd:9,crit:10},
    statDisplay:{HP:8,ATK:10,DEF:9,SPD:5,MP:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_spirit_drain','dragon_spirit_strike','water_ghost_haunt','normal_dragon_roar'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','undying'],
    description:'A dragon that has survived every attempt on its life and remembers each one. When nearly killed, the Undying Drake releases a burst of accumulated draconic death-energy and continues. Its body carries the marks of previous endings that did not end.',
    lore:'Dragons are very difficult to kill. The Undying Drake has been very difficult to kill for longer than most dungeons have existed. It has learned from the experience and now treats near-death events as combat technique rather than emergency — a perspective shift that makes it substantially harder to kill than when it considered them emergencies.'
  },

  dragon_magnetist: {
    id:'dragon_magnetist', name:'The Lodestone Wyrm', icon:'🐉',
    tagline:'A magnetic dragon finds that its scales are the most useful feature.',
    color:'#998055', element:'irondrake', rarity:'epic',
    fusedFrom:['dragonknight','magnetist'],
    stats:{hp:108,maxHp:108,mp:68,maxMp:68,atk:15,def:11,spd:11,crit:12},
    statDisplay:{HP:7,ATK:11,DEF:8,SPD:6,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','fire_magnet_pull','electric_steel_magnetize','electric_dragon_overload','normal_dragon_wrath'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','magnetic_field'],
    description:'A magnetically charged drake — scales that attract metallic weapons and armor, draconic charges enhanced by magnetic propulsion, and electromagnetic roars that disrupt metal-bearing combatants across the entire arena.',
    lore:'Dragon scales are often metallic in composition. The magnetist found this professionally relevant. The Lodestone Wyrm discovered that a dragon with full magnetic control over its own scales has a substantial advantage over any opponent who is also metallic, which includes most armored fighters.'
  },

  dragon_crystal: {
    id:'dragon_crystal', name:'The Crystal Drake', icon:'🐉',
    tagline:'The dragon grew the crystal. The crystal grew around the dragon. It is both now.',
    color:'#b39180', element:'crystaldrake', rarity:'legendary',
    fusedFrom:['dragonknight','crystalmancer'],
    stats:{hp:100,maxHp:100,mp:75,maxMp:75,atk:15,def:9,spd:13,crit:15},
    statDisplay:{HP:7,ATK:11,DEF:6,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','fire_crystal_refract','fire_crystal_shard','dragon_dark_final','electric_crystal_cascade'],
    burstAbility:'crystalmancer_burst',
    passives:['intimidation','crystal_body'],
    description:'A dragon covered in crystal growth — fire breath refracted through crystal scales into dozens of simultaneous beams, crystal shards that regenerate from draconic energy, and an armored crystal exterior that shatters catastrophically when defeated.',
    lore:'Crystal grows on minerals. Draconic scales are minerals of unusual composition. The Crystal Drake found that its scales provided exceptional lattice structure for crystal growth, and the crystalmancer found that a mobile crystal platform larger than most buildings has interesting tactical possibilities.'
  },

  dragon_war: {
    id:'dragon_war', name:'The Warlord\'s Drake', icon:'🐉',
    tagline:'The warlord needed a strategy that was also a weapon the size of a building.',
    color:'#d55500', element:'wardrake', rarity:'rare',
    fusedFrom:['dragonknight','warlord'],
    stats:{hp:125,maxHp:125,mp:53,maxMp:53,atk:17,def:13,spd:11,crit:11},
    statDisplay:{HP:8,ATK:12,DEF:9,SPD:6},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','fire_fighting_rage','fire_rock_strike','normal_dragon_roar','fire_fighting_ignite'],
    burstAbility:'dragonknight_burst',
    passives:['intimidation','battle_hardened'],
    description:'A warlord who fights on dragonback and commands from that altitude — tactical overview combined with the ability to directly participate with 17 ATK. The Warlord\'s Drake does not wait in the rear. It is the front line, the cavalry, and the siege weapon simultaneously.',
    lore:'Warlords traditionally command from behind the lines. The Warlord\'s Drake found that commanding from above the lines, on top of a dragon, combines strategic overview with the ability to personally ensure compliance. The resulting command style is not subtle but is extremely effective.'
  },

  dragon_spirit: {
    id:'dragon_spirit', name:'The Dragon Ancestor', icon:'🐉',
    tagline:'The ancient dragons passed something down. This is the something.',
    color:'#918844', element:'spiritdrake', rarity:'epic',
    fusedFrom:['dragonknight','spiritwalker'],
    stats:{hp:110,maxHp:110,mp:68,maxMp:68,atk:14,def:11,spd:12,crit:12},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_spirit_final','dragon_spirit_surge','dragon_spirit_blast','fire_spirit_sanctuary'],
    burstAbility:'spiritwalker_burst',
    passives:['intimidation','spirit_bond'],
    description:'Commands the spirits of draconic ancestors — spiritual wyrms that augment physical attacks, ancient dragon-souls that provide tactical guidance, and the accumulated ancestral authority of a lineage that predates the dungeon.',
    lore:'Dragons remember their lineage. The spiritwalker communed with it. The Dragon Ancestor found that draconic ancestor-spirits have strong opinions about how descendants should conduct themselves in combat, and that their opinions are worth listening to given how long they were in practice before the lineage died.'
  },

  dragon_hex: {
    id:'dragon_hex', name:'The Cursed Drake', icon:'🐉',
    tagline:'Dragon curses last until the dragon decides otherwise. Dragons are patient.',
    color:'#b34444', element:'blooddrake', rarity:'epic',
    fusedFrom:['dragonknight','hexblade'],
    stats:{hp:105,maxHp:105,mp:70,maxMp:70,atk:15,def:10,spd:12,crit:13},
    statDisplay:{HP:7,ATK:11,DEF:7,SPD:7,MP:7},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_dark_surge','dragon_dark_dot_strike','dark_blood_strike','normal_void_curse'],
    burstAbility:'hexblade_burst',
    passives:['intimidation','hex_master'],
    description:'A dragon that curses on contact — every strike applies a hex, fire breath delivers curse carriers across wide areas, and the mere gaze of the Cursed Drake is sufficient for minor hex application. The curses accumulate and interact.',
    lore:'Dragon curses are traditional. The Cursed Drake modernized the practice with the hexblade\'s precision delivery system. The result applies curses with scientific exactness rather than the legendary inconsistency of traditional draconic malediction, which is more effective and less theatrically satisfying but the dragon considers this a reasonable trade.'
  },

  dragon_cosmo: {
    id:'dragon_cosmo', name:'The Void Wyrm', icon:'🐉',
    tagline:'Between stars, there are no dragons. This one found the way there and came back.',
    color:'#914d55', element:'cosmicdrake', rarity:'legendary',
    fusedFrom:['dragonknight','cosmomancer'],
    stats:{hp:100,maxHp:100,mp:83,maxMp:83,atk:14,def:9,spd:12,crit:13},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:7,MP:8},
    abilities:['dragon_claw','tail_sweep','fire_breath','dragon_charge','dragon_cosmic_strike','dragon_cosmic_final','dragon_cosmic_weaken','normal_space_consume'],
    burstAbility:'cosmomancer_burst',
    passives:['intimidation','stardust'],
    description:'A dragon that has traversed cosmic distances — fire breath carries stellar radiation, draconic strikes carry the accumulated kinetic energy of cosmological travel, and an authority that comes from being the largest predator in a very large space.',
    lore:'The cosmomancer mapped the void between stars. The dragonknight commanded the largest predators known. The Void Wyrm went further: a dragon who traveled between stars and returned. What it encountered in the void changed its fire, its scale, and its perspective on what constitutes a significant obstacle.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_9);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_9);
  FUSION_LOADED_FILES.add(9);
  if(typeof console!=='undefined') console.debug('[Fusion] File 9 loaded (37 classes)');
})();
