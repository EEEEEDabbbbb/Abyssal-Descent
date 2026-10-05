// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 16 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_16 = {
  'phantom+warlord': 'ghost_campaign',
  'hexblade+spiritwalker': 'spirit_hex',
  'cosmomancer+spiritwalker': 'spirit_cosmo',
  'pestilencelord+spiritwalker': 'spirit_pestilence',
  'spiritwalker+windwalker': 'spirit_wind',
  'doomcaster+spiritwalker': 'spirit_doom',
  'arcanist+spiritwalker': 'spirit_arcanist',
  'sentinel+spiritwalker': 'spirit_sentinel',
  'phantom+spiritwalker': 'spirit_phantom',
  'cosmomancer+hexblade': 'hex_cosmo',
  'hexblade+pestilencelord': 'hex_pestilence',
  'hexblade+windwalker': 'hex_wind',
  'doomcaster+hexblade': 'hex_doom',
  'arcanist+hexblade': 'hex_arcanist',
  'hexblade+sentinel': 'hex_sentinel',
  'hexblade+phantom': 'hex_phantom',
  'cosmomancer+pestilencelord': 'cosmo_pestilence',
  'cosmomancer+windwalker': 'cosmo_wind',
  'cosmomancer+doomcaster': 'cosmo_doom',
  'arcanist+cosmomancer': 'cosmo_arcanist',
  'cosmomancer+sentinel': 'cosmo_sentinel',
  'cosmomancer+phantom': 'cosmo_phantom',
  'pestilencelord+windwalker': 'pestilence_wind',
  'doomcaster+pestilencelord': 'pestilence_doom',
  'arcanist+pestilencelord': 'pestilence_arcanist',
  'pestilencelord+sentinel': 'pestilence_sentinel',
  'pestilencelord+phantom': 'pestilence_phantom',
  'doomcaster+windwalker': 'wind_doom',
  'arcanist+windwalker': 'wind_arcanist',
  'sentinel+windwalker': 'wind_sentinel',
  'phantom+windwalker': 'wind_phantom',
  'arcanist+doomcaster': 'doom_arcanist',
  'doomcaster+sentinel': 'doom_sentinel',
  'doomcaster+phantom': 'doom_phantom',
  'arcanist+sentinel': 'arcanist_sentinel',
  'arcanist+phantom': 'arcanist_phantom',
  'phantom+sentinel': 'sentinel_phantom'
};

const FUSION_CLASSES_16 = {
  ghost_campaign: {
    id:'ghost_campaign', name:'The Ghost Campaign', icon:'⚔️',
    tagline:'The warlord whose army cannot be seen cannot be countered.',
    color:'#998899', element:'fighting', elementFlavor:'warghost', rarity:'mythical',
    fusedFrom:['warlord','phantom'],
    stats:{hp:92,maxHp:92,mp:80,maxMp:80,atk:14,def:7,spd:16,crit:20},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:8,MP:8},
    abilities:['battle_cry','tactical_strike','war_stomp','siege_breaker','water_ghost_phase','ice_ghost_phantasm','wind_void_drain','dark_blood_final'],
    burstAbility:'warlord_burst',
    passives:['battle_hardened','phase'],
    description:'Warlord tactics executed from an undetectable state — a phantom army that occupies battlefield positions without being visible, strikes without being locatable, and retreats through walls. The Ghost Campaign runs the warlord\'s full tactical doctrine from a position of complete positional ambiguity.',
    lore:'The warlord commanded from a visible command position, which is a vulnerability the warlord accepted as the cost of command. The phantom removed it. The Ghost Campaign commands from wherever the phantom chooses to be, which is frequently inside the wall adjacent to the target, which the warlord\'s tactical doctrine did not previously model as a valid command position but has since updated to include.'
  },

  spirit_hex: {
    id:'spirit_hex', name:'The Cursed Spirit', icon:'👻',
    tagline:'The spirit that carries a curse carries it further than any living thing.',
    color:'#9977bb', element:'spirit', elementFlavor:'spirithex', rarity:'epic',
    fusedFrom:['spiritwalker','hexblade'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:12,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','dark_blood_weaken','dark_blood_dot_strike','normal_void_hollow','psychic_void_weaken'],
    burstAbility:'spiritwalker_burst',
    passives:['spirit_bond','hex_master'],
    description:'Spirits bearing hexes as cargo — spectral entities that deliver curses across the spirit plane, bypassing physical defenses entirely. The Cursed Spirit places hexes through walls, around corners, and across distances that the hexblade alone could not reach, because the spirit takes the most direct route regardless of what is in the way.',
    lore:'The hexblade placed curses by proximity. Spirits travel without regard for physical obstacles. The Cursed Spirit found that distributing hexes via spirit carrier extends the delivery range to wherever spirits can travel, which is everywhere, and that a spirit bearing a curse is also somewhat cursed, which makes it angrier and faster, which the spiritwalker notes as an unexpected efficiency gain.'
  },

  spirit_cosmo: {
    id:'spirit_cosmo', name:'The Stellar Spirit', icon:'👻',
    tagline:'The spirits of those who died under stars become part of the stars. This one came back.',
    color:'#7788cc', element:'spirit', elementFlavor:'spiritcosmo', rarity:'legendary',
    fusedFrom:['spiritwalker','cosmomancer'],
    stats:{hp:80,maxHp:80,mp:97,maxMp:97,atk:11,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','light_cosmic_blast','dark_cosmic_weaken','wind_cosmic_strike','light_cosmic_surge'],
    burstAbility:'cosmomancer_burst',
    passives:['spirit_bond','stardust'],
    description:'Commands spirits who have passed through astronomical space — cosmic spirits vast in scale and ancient beyond dungeon reckoning, returning from stellar distances with energies accumulated during their vast journey. The Stellar Spirit\'s allies have been traveling since before the dungeon was built.',
    lore:'The spiritwalker called spirits from nearby. The cosmomancer knew where spirits went at great distance. The Stellar Spirit reached further and found that spirits who have spent time in astronomical environments return to the dungeon carrying cosmic residue that amplifies their spiritual force — they left as ordinary dead and came back as something considerably larger.'
  },

  spirit_pestilence: {
    id:'spirit_pestilence', name:'The Plague Spirit', icon:'👻',
    tagline:'The ghost of a plague carries the plague. The ghost also carries a grudge.',
    color:'#779955', element:'spirit', elementFlavor:'spiritplague', rarity:'epic',
    fusedFrom:['spiritwalker','pestilencelord'],
    stats:{hp:82,maxHp:82,mp:88,maxMp:88,atk:12,def:8,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','fire_poison_plague','fire_bug_plague','poison_dark_blast','poison_void_surge'],
    burstAbility:'pestilencelord_burst',
    passives:['spirit_bond','plague_lord'],
    description:'Spirits of the plague dead, still infectious — spectral entities that carry active disease in their spectral form, transmitting plague through haunting rather than physical contact. The Plague Spirit infects targets who cannot be physically reached and is immune to countermeasures designed for living plague vectors.',
    lore:'The spiritwalker spoke with spirits of various deaths. The pestilencelord found the plague-dead interesting professionally. The Plague Spirit found that spirits who died of disease retain the disease in spectral form, and that spectral disease infects differently from biological disease — it appears in the target\'s biology without a physical transmission event, which medicine has no established response to.'
  },

  spirit_wind: {
    id:'spirit_wind', name:'The Wandering Dead', icon:'👻',
    tagline:'The wind takes everything everywhere. The dead have nowhere else to be.',
    color:'#aabb88', element:'spirit', elementFlavor:'spiritwind', rarity:'rare',
    fusedFrom:['spiritwalker','windwalker'],
    stats:{hp:82,maxHp:82,mp:82,maxMp:82,atk:11,def:7,spd:16,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:9,MP:8},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','fire_wind_cyclone','fire_flying_soar','wind_blood_blast','wind_light_surge'],
    burstAbility:'spiritwalker_burst',
    passives:['spirit_bond','gust'],
    description:'Spirits dispersed by wind across the entire battlefield — the windwalker\'s currents carry spectral allies to every position simultaneously. Moving at 16 SPD, the Wandering Dead achieves total spirit coverage before a defense can be organized against any of its individual manifestations.',
    lore:'Spirits drift naturally. The windwalker accelerated this. The Wandering Dead found that spirits on windwalker currents achieve omnipresence across the battlefield faster than the eye can track, and that spiritual attacks from all directions simultaneously are more difficult to respond to than sequential attacks from a locatable source.'
  },

  spirit_doom: {
    id:'spirit_doom', name:'The Doomed Soul', icon:'👻',
    tagline:'The doom follows the spirit. Spirits go everywhere. The doom goes everywhere.',
    color:'#775566', element:'spirit', elementFlavor:'spiritdoom', rarity:'legendary',
    fusedFrom:['spiritwalker','doomcaster'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:11,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','time_void_drain','dark_blood_final','dark_void_blast','normal_void_unmake'],
    burstAbility:'doomcaster_burst',
    passives:['spirit_bond','doom_aura'],
    description:'The doom sealed in a spirit carrier — spectral entities bearing doom seals that cannot be cleansed because they are not physically present to cleanse. The Doomed Soul delivers doom across the spirit plane to targets the doomcaster alone could not reach, and the doom arrives with the spirit\'s complete imperviousness to material countermeasures.',
    lore:'The doomcaster sealed fates from proximity. Spirits travel without constraint. The Doomed Soul found that doom delivered via spirit carrier arrives without the warning signs that let some targets prepare — there is no visible caster, no detectable spell, only the spirit and the doom it carries, which the target experiences when the seal activates and not before.'
  },

  spirit_arcanist: {
    id:'spirit_arcanist', name:'The Formula of Souls', icon:'👻',
    tagline:'The arcanist who derived the equation for spiritual existence changed what was possible on both sides of death.',
    color:'#8899bb', element:'spirit', elementFlavor:'spiritarcane', rarity:'legendary',
    fusedFrom:['spiritwalker','arcanist'],
    stats:{hp:75,maxHp:75,mp:105,maxMp:105,atk:11,def:6,spd:13,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','psychic_cosmic_blast','psychic_rune_blast','psychic_dark_weaken','light_rune_surge'],
    burstAbility:'arcanist_burst',
    passives:['spirit_bond','arcane_mastery'],
    description:'Arcane formulae applied to the mechanics of spiritual existence — the spiritwalker\'s intuitive understanding of the spirit plane expressed as equations, making spirit manipulation as precise as any other magical discipline. The Formula of Souls can specify exact behavioral parameters for the spirits it commands.',
    lore:'The spiritwalker worked with spirits through empathy and relationship. The arcanist wanted equations. The Formula of Souls derived the mathematical description of spiritual behavior and found that spirits, once modeled, can be directed with a precision that relationship-based communication does not achieve — not because the relationship is worse but because math does not depend on the spirit\'s mood.'
  },

  spirit_sentinel: {
    id:'spirit_sentinel', name:'The Ancestral Guard', icon:'👻',
    tagline:'The dead who stand watch have been watching longer than the living can imagine.',
    color:'#99aa99', element:'spirit', elementFlavor:'spiritwall', rarity:'rare',
    fusedFrom:['spiritwalker','sentinel'],
    stats:{hp:120,maxHp:120,mp:68,maxMp:68,atk:9,def:14,spd:9,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:6},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','normal_rune_ward','electric_spirit_surge','electric_spirit_veil','water_ghost_haunt'],
    burstAbility:'spiritwalker_burst',
    passives:['spirit_bond','bastion'],
    description:'Ancestral spirits holding a defensive position — the accumulated dead of the dungeon standing watch at a fixed point, impervious to fatigue, unable to be routed, and supplemented by new arrivals when casualties occur. The Ancestral Guard holds its position because the dead have nothing else to do.',
    lore:'The sentinel held because will and training demanded it. The dead hold because they have already passed beyond the things that make the living give ground. The Ancestral Guard occupies a position with a permanence that no living soldier can match and a roster that replenishes from the dead of any battle fought in the vicinity.'
  },

  spirit_phantom: {
    id:'spirit_phantom', name:'The Deep Haunting', icon:'👻',
    tagline:'Two orders of the unseen, working together. The dungeon has no response to this.',
    color:'#aabbcc', element:'spirit', elementFlavor:'spiritghost', rarity:'mythical',
    fusedFrom:['spiritwalker','phantom'],
    stats:{hp:78,maxHp:78,mp:85,maxMp:85,atk:12,def:6,spd:16,crit:21},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:8},
    abilities:['spirit_link','ancestral_call','soul_surge','communion','water_ghost_phase','ice_ghost_phantasm','electric_spirit_possession','electric_ghost_drain'],
    burstAbility:'phantom_burst',
    passives:['spirit_bond','phase'],
    description:'Spirits commanding phantom abilities, and a phantom commanding spirits — operating entirely in the non-material plane, the Deep Haunting has no physical presence to target and no material limitation to navigate. It phases through defenses and commands spiritual forces from within the matter those defenses are made of.',
    lore:'The spiritwalker and the phantom both operated outside material constraints. The Deep Haunting combined their non-material methods and found that the overlap produces a presence so comprehensively outside physical reality that the conventional dungeon has no layer of defense that applies to it — material barriers are phased through, and spiritual wards do not affect a being that is also a spirit.'
  },

  hex_cosmo: {
    id:'hex_cosmo', name:'The Cosmic Curse', icon:'🔮',
    tagline:'A hex placed by the stars is difficult to appeal.',
    color:'#5566cc', element:'dark', elementFlavor:'hexcosmo', rarity:'legendary',
    fusedFrom:['hexblade','cosmomancer'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:12,def:6,spd:13,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:10},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','light_cosmic_blast','dark_cosmic_weaken','psychic_void_blast','psychic_cosmic_surge'],
    burstAbility:'hexblade_burst',
    passives:['hex_master','stardust'],
    description:'Hexes with astronomical authority — curses backed by cosmic alignment, written into the positional relationship of celestial bodies. The Cosmic Curse is difficult to remove because removing it requires changing the alignment of stars, which is beyond the typical counter-hex practitioner\'s scope of work.',
    lore:'The hexblade placed curses by personal authority. The cosmomancer observed that astronomical forces dwarf personal authority. The Cosmic Curse placed hexes aligned to celestial configurations and found that a curse backed by the movement of stars is not only more powerful but also effectively permanent on human timescales, because the astronomical conditions that anchor it change on astronomical timescales.'
  },

  hex_pestilence: {
    id:'hex_pestilence', name:'The Plague Hex', icon:'🔮',
    tagline:'The curse suppresses resistance. The plague is already through the door.',
    color:'#778844', element:'dark', elementFlavor:'hexplague', rarity:'epic',
    fusedFrom:['hexblade','pestilencelord'],
    stats:{hp:78,maxHp:78,mp:92,maxMp:92,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','fire_poison_plague','fire_bug_plague','poison_void_surge','poison_dark_blast'],
    burstAbility:'hexblade_burst',
    passives:['hex_master','plague_lord'],
    description:'Hexes that open the target to disease — curses that suppress the immune response as their primary function, ensuring the plague that follows finds no resistance. The Plague Hex operates in sequence: hex first, infect second, and the hex guarantees the infection takes.',
    lore:'The pestilencelord\'s primary obstacle was immune resistance. The hexblade could remove obstacles. The Plague Hex combined these in the obvious sequence and found that a hex calibrated to suppress immune response is more useful to the pestilencelord than any direct curse — it does not kill the target, it simply ensures the disease does the killing without interference.'
  },

  hex_wind: {
    id:'hex_wind', name:'The Wandering Curse', icon:'🔮',
    tagline:'The curse that blows on the wind needs no caster nearby.',
    color:'#aabb55', element:'dark', elementFlavor:'hexwind', rarity:'rare',
    fusedFrom:['hexblade','windwalker'],
    stats:{hp:75,maxHp:75,mp:85,maxMp:85,atk:12,def:6,spd:15,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:8},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','fire_wind_cyclone','psychic_wind_blast','wind_void_blast','wind_blood_surge'],
    burstAbility:'hexblade_burst',
    passives:['hex_master','gust'],
    description:'Hexes dispersed on the wind — curses that travel as airborne particles, self-applying to anyone who breathes them. The Wandering Curse at 15 SPD covers the entire battlefield before targets can leave the hex-saturated air, and it does not require the hexblade to be near any individual target.',
    lore:'Hexes traditionally required proximity. The windwalker provided distance coverage. The Wandering Curse attached hex effects to windborne particles and found that a curse dispersed as aerosol is considerably more efficient than one placed by hand — it requires one action to deploy and applies continuously to everything breathing in the wind field, which is all of it.'
  },

  hex_doom: {
    id:'hex_doom', name:'The Inevitable Curse', icon:'🔮',
    tagline:'The hex weakens. The doom arrives into weakness. Nothing remains.',
    color:'#665577', element:'dark', elementFlavor:'hexdoom', rarity:'legendary',
    fusedFrom:['hexblade','doomcaster'],
    stats:{hp:72,maxHp:72,mp:103,maxMp:103,atk:11,def:5,spd:13,crit:16},
    statDisplay:{HP:4,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','time_void_drain','dark_void_blast','dark_blood_final','normal_void_unmake'],
    burstAbility:'doomcaster_burst',
    passives:['hex_master','doom_aura'],
    description:'A hex and a doom issued simultaneously — the curse degrades every defense, and the doom arrives when the target is maximally weakened. The Inevitable Curse uses the hex as preparation for the doom, ensuring the sealed fate finds no resistance when it activates.',
    lore:'The hexblade weakened targets. The doomcaster waited for weakness. The Inevitable Curse combined these and found they were already naturally sequenced: hex first to remove resistance, doom second to activate into the gap the hex created. The target experiences both in the same moment, one weakening what the other destroys.'
  },

  hex_arcanist: {
    id:'hex_arcanist', name:'The Formulaic Curse', icon:'🔮',
    tagline:'The hex derived mathematically is the most comprehensive hex. No gap in the formula means no gap in the curse.',
    color:'#7766cc', element:'dark', elementFlavor:'hexarcane', rarity:'legendary',
    fusedFrom:['hexblade','arcanist'],
    stats:{hp:70,maxHp:70,mp:108,maxMp:108,atk:11,def:5,spd:13,crit:17},
    statDisplay:{HP:4,ATK:7,DEF:3,SPD:7,MP:11},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','psychic_rune_blast','psychic_dark_weaken','light_rune_surge','psychic_void_final'],
    burstAbility:'arcanist_burst',
    passives:['hex_master','arcane_mastery'],
    description:'Hexes derived from first principles — curses with no gaps because they were derived rather than created by tradition, updated with each iteration to close every loophole. The Formulaic Curse is the theoretically optimal hex, and the arcanist continues to optimize it between combats.',
    lore:'Hexes had loopholes because they were developed by individual practitioners with incomplete knowledge. The arcanist derived the complete hex from foundational principles and found that a curse derived from mathematical axioms has no gaps because axioms have no gaps. Opponents who have studied hex-breaking techniques find none of those techniques apply because the Formulaic Curse was designed with knowledge of every one of them.'
  },

  hex_sentinel: {
    id:'hex_sentinel', name:'The Cursed Fortification', icon:'🔮',
    tagline:'The wall is cursed. The curse holds the wall. The wall holds the curse.',
    color:'#998877', element:'dark', elementFlavor:'hexwall', rarity:'epic',
    fusedFrom:['hexblade','sentinel'],
    stats:{hp:115,maxHp:115,mp:72,maxMp:72,atk:9,def:14,spd:9,crit:11},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:7},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','normal_rune_ward','dark_blood_weaken','normal_void_anchor','steel_void_weaken'],
    burstAbility:'hexblade_burst',
    passives:['hex_master','bastion'],
    description:'A fortified position that curses those who approach it — the sentinel\'s immovable perimeter laced with hexes that activate on proximity. Enemies who try to breach the Cursed Fortification are debilitated before they make contact with the wall they are trying to breach.',
    lore:'The sentinel held the line. The hexblade weakened those who crossed it. The Cursed Fortification combined these: the hexes activate at approach range, ensuring that whatever breaches the perimeter is already operating at a fraction of its capacity, which converts the sentinel\'s defensive challenge from holding against full-strength enemies to holding against hexed ones.'
  },

  hex_phantom: {
    id:'hex_phantom', name:'The Haunting Hex', icon:'🔮',
    tagline:'The curse you cannot see is the curse you cannot remove.',
    color:'#9988bb', element:'dark', elementFlavor:'hexghost', rarity:'mythical',
    fusedFrom:['hexblade','phantom'],
    stats:{hp:72,maxHp:72,mp:88,maxMp:88,atk:13,def:5,spd:16,crit:21},
    statDisplay:{HP:4,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['hex_strike','curse_mark','debilitate','hex_nova','water_ghost_phase','ice_ghost_haunt','dark_void_blast','psychic_void_dot_strike'],
    burstAbility:'phantom_burst',
    passives:['hex_master','phase'],
    description:'Hexes placed by an invisible hand — a phantom hexblade that phases through targets while applying curses, leaving no visible caster to locate and counter. The Haunting Hex operates from within the target\'s personal space, applying hexes at point-blank range from a position of complete invisibility.',
    lore:'Counter-hex techniques begin by locating the caster. The phantom has no locatable position. The Haunting Hex places curses while phased into the target\'s occupied space and found that hexes applied at that range are more accurate and more potent than those applied at distance, and that the target cannot identify the caster because the caster is currently in the same location as the target, which is not where they are looking.'
  },

  cosmo_pestilence: {
    id:'cosmo_pestilence', name:'The Cosmic Plague', icon:'🌌',
    tagline:'Disease evolved in conditions you cannot imagine, for hosts you will never meet. You will meet it, though.',
    color:'#556699', element:'cosmic', elementFlavor:'cosmoplague', rarity:'legendary',
    fusedFrom:['cosmomancer','pestilencelord'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:11,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['cosmic_ray','void_lance','stellar_surge','gravity_well','fire_poison_plague','poison_cosmic_blast','poison_cosmic_final','fire_bug_plague'],
    burstAbility:'cosmomancer_burst',
    passives:['stardust','plague_lord'],
    description:'Disease of extraterrestrial origin deployed with cosmomancer precision — pathogens from environments so different that local immune systems have no categorization for them, delivered via stellar trajectory to precise targets. The Cosmic Plague arrived from somewhere else and is not interested in local immunity.',
    lore:'The pestilencelord cultivated every known pathogen. The cosmomancer knew where the unknown ones were. The Cosmic Plague sources disease from biological environments so different from the dungeon that even the pestilencelord had not catalogued them, and found that truly alien pathogens have a 100% initial infection rate because the target\'s immune system has no prior response pattern to draw on.'
  },

  cosmo_wind: {
    id:'cosmo_wind', name:'The Solar Wind', icon:'🌌',
    tagline:'Stars have wind. It travels farther than dungeon wind does.',
    color:'#88aadd', element:'cosmic', elementFlavor:'cosmowind', rarity:'rare',
    fusedFrom:['cosmomancer','windwalker'],
    stats:{hp:73,maxHp:73,mp:88,maxMp:88,atk:12,def:5,spd:17,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:9},
    abilities:['cosmic_ray','void_lance','stellar_surge','gravity_well','fire_wind_cyclone','fire_flying_soar','wind_cosmic_blast','wind_cosmic_final'],
    burstAbility:'cosmomancer_burst',
    passives:['stardust','gust'],
    description:'The charged particle stream of stellar wind at dungeon scale — 17 SPD, carrying stellar radiation at velocity. The Solar Wind moves faster than the eye tracks and delivers cosmic energy as a continuous stream rather than discrete attacks, because solar wind does not stop.',
    lore:'The windwalker moved air. The cosmomancer moved stellar particle streams. The Solar Wind found that particles ejected by stars travel at a significant fraction of light speed, and that scaling this down to dungeon application while retaining the velocity-to-mass ratio produces the fastest combat movement available while also delivering radiation damage, which the windwalker considers a significant product improvement.'
  },

  cosmo_doom: {
    id:'cosmo_doom', name:'The Heat Death', icon:'🌌',
    tagline:'The universe ends eventually. This accelerates the schedule for one participant.',
    color:'#334466', element:'cosmic', elementFlavor:'cosmodoom', rarity:'legendary',
    fusedFrom:['cosmomancer','doomcaster'],
    stats:{hp:70,maxHp:70,mp:107,maxMp:107,atk:10,def:5,spd:12,crit:15},
    statDisplay:{HP:4,ATK:6,DEF:4,SPD:7,MP:11},
    abilities:['cosmic_ray','void_lance','stellar_surge','gravity_well','time_void_final','dark_cosmic_final','dark_void_blast','normal_void_unmake'],
    burstAbility:'doomcaster_burst',
    passives:['stardust','doom_aura'],
    description:'The cosmological doom — the entropic end-state of the universe applied to a single target on an accelerated timeline. The Heat Death does not seal a fate so much as it applies the universe\'s own inevitable conclusion to the target personally and immediately.',
    lore:'The doomcaster sealed individual fates. The cosmomancer understood the fate the universe intends for everything. The Heat Death found these were the same doom at different scales and that applying the cosmological endpoint to a single target is the most comprehensive doom available, because the universe\'s own trajectory is, by definition, inescapable.'
  },

  cosmo_arcanist: {
    id:'cosmo_arcanist', name:'The Grand Unified Theory', icon:'🌌',
    tagline:'The formula that describes everything can do everything.',
    color:'#5566bb', element:'cosmic', elementFlavor:'cosmoarcane', rarity:'legendary',
    fusedFrom:['arcanist','cosmomancer'],
    stats:{hp:68,maxHp:68,mp:115,maxMp:115,atk:11,def:4,spd:13,crit:17},
    statDisplay:{HP:4,ATK:7,DEF:3,SPD:7,MP:11},
    abilities:['cosmic_ray','void_lance','stellar_surge','gravity_well','psychic_cosmic_blast','psychic_cosmic_final','light_cosmic_blast','psychic_rune_blast'],
    burstAbility:'arcanist_burst',
    passives:['stardust','arcane_mastery'],
    description:'The unified theoretical framework describing all forces simultaneously — the arcanist\'s mathematical tradition extended to cosmological scales, producing a formula that describes and therefore controls everything within its scope. The Grand Unified Theory operates at the level where gravity, electromagnetism, and arcane force are the same thing.',
    lore:'The arcanist spent years deriving a formula that unified arcane and physical forces. The cosmomancer worked at scales where those forces were already unified. The Grand Unified Theory completed the derivation and found that at cosmological scale the formula does not distinguish between magic and physics, which means the arcanist\'s most powerful spells and the universe\'s physical laws are expressed by the same equation.'
  },

  cosmo_sentinel: {
    id:'cosmo_sentinel', name:'The Stellar Fortress', icon:'🌌',
    tagline:'The fortress at the center of a star is defended by the star.',
    color:'#6688aa', element:'cosmic', elementFlavor:'cosmowall', rarity:'epic',
    fusedFrom:['cosmomancer','sentinel'],
    stats:{hp:110,maxHp:110,mp:78,maxMp:78,atk:9,def:13,spd:9,crit:11},
    statDisplay:{HP:7,ATK:6,DEF:9,SPD:6,MP:8},
    abilities:['cosmic_ray','void_lance','stellar_surge','gravity_well','normal_rune_ward','light_cosmic_surge','steel_cosmic_blast','dark_cosmic_stance'],
    burstAbility:'cosmomancer_burst',
    passives:['stardust','bastion'],
    description:'A defensive position with stellar backing — the sentinel\'s immovable hold reinforced by astronomical mass. The Stellar Fortress holds its position because it has a star\'s gravitational authority anchoring it, and approaching enemies are contending not just with the sentinel but with cosmological forces at the perimeter.',
    lore:'The sentinel required will to hold position. The cosmomancer added mass. The Stellar Fortress anchors its position to astronomical mass and found that a defense with stellar gravitational support is considerably harder to move than one sustained by will alone — the sentinel\'s determination is unchanged but it is now supported by something that does not get tired.'
  },

  cosmo_phantom: {
    id:'cosmo_phantom', name:'The Dark Matter', icon:'🌌',
    tagline:'It accounts for most of the universe\'s mass. No one has ever seen it. You will not see this one either.',
    color:'#222244', element:'cosmic', elementFlavor:'cosmoghost', rarity:'mythical',
    fusedFrom:['cosmomancer','phantom'],
    stats:{hp:70,maxHp:70,mp:95,maxMp:95,atk:13,def:4,spd:16,crit:22},
    statDisplay:{HP:4,ATK:9,DEF:3,SPD:8,MP:9},
    abilities:['cosmic_ray','void_lance','stellar_surge','gravity_well','water_ghost_phase','dark_cosmic_final','psychic_void_blast','gravity_void_blast'],
    burstAbility:'phantom_burst',
    passives:['stardust','phase'],
    description:'Astronomical mass that cannot be detected — a phantom with cosmological substance, exerting gravitational force without any observable presence. The Dark Matter is invisible, intangible to conventional attack, and exerts the gravitational authority of a significant concentration of cosmic mass.',
    lore:'The cosmomancer studied dark matter as a professional interest. The phantom was dark matter in a biological sense. The Dark Matter combined these and achieved the cosmological version: a presence that exerts significant gravitational effects and interacts with nothing except through gravity, which means it cannot be blocked, deflected, or directly opposed — only experienced.'
  },

  pestilence_wind: {
    id:'pestilence_wind', name:'The Airborne Apocalypse', icon:'☣️',
    tagline:'The wind carries everything to everyone. The pestilencelord considers this optimal delivery.',
    color:'#99bb44', element:'poison', elementFlavor:'windplague', rarity:'epic',
    fusedFrom:['pestilencelord','windwalker'],
    stats:{hp:78,maxHp:78,mp:88,maxMp:88,atk:12,def:6,spd:15,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:8},
    abilities:['toxic_cloud','virulent_strain','pandemic','plague_bloom','fire_wind_cyclone','fire_flying_updraft','poison_void_surge','poison_cosmic_blast'],
    burstAbility:'pestilencelord_burst',
    passives:['plague_lord','gust'],
    description:'Mass airborne disease deployment — every plague in the pestilencelord\'s arsenal dispersed simultaneously by windwalker cyclone across the entire battlefield. The Airborne Apocalypse has no targeting, because it does not need to target: everything breathes.',
    lore:'The pestilencelord\'s greatest constraint was delivery range. The windwalker removed it entirely. The Airborne Apocalypse releases the full pathogen library into windwalker-generated currents and found that disease in a cyclone achieves complete battlefield saturation in a single action, converting targeted biological warfare into an area event with no dead zones.'
  },

  pestilence_doom: {
    id:'pestilence_doom', name:'The Terminal Pandemic', icon:'☣️',
    tagline:'The disease is survivable. The doom ensures it is not survived.',
    color:'#557744', element:'poison', elementFlavor:'plaguedoom', rarity:'legendary',
    fusedFrom:['pestilencelord','doomcaster'],
    stats:{hp:73,maxHp:73,mp:100,maxMp:100,atk:11,def:5,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['toxic_cloud','virulent_strain','pandemic','plague_bloom','time_void_final','dark_blood_final','poison_void_blast','poison_dark_final'],
    burstAbility:'doomcaster_burst',
    passives:['plague_lord','doom_aura'],
    description:'Disease with a sealed outcome — the pestilencelord provides the infection mechanism, the doomcaster provides the guarantee. The Terminal Pandemic uses every pathogen in the pestilencelord\'s arsenal and then seals the doom so that the body\'s attempts to fight them are foreclosed rather than overcome.',
    lore:'Diseases kill probabilistically. The doomcaster changed this to certainty. The Terminal Pandemic infects with the full pathogen suite and simultaneously seals the doom, which retroactively guarantees the infection is fatal — not by making the disease more lethal, but by removing the possibility that the target\'s biological responses succeed. They are trying. The doom notes that it does not matter.'
  },

  pestilence_arcanist: {
    id:'pestilence_arcanist', name:'The Theoretical Maximum', icon:'☣️',
    tagline:'The most lethal disease possible, derived mathematically. The pestilencelord is satisfied.',
    color:'#668833', element:'poison', elementFlavor:'plaguearcane', rarity:'legendary',
    fusedFrom:['arcanist','pestilencelord'],
    stats:{hp:70,maxHp:70,mp:107,maxMp:107,atk:11,def:4,spd:13,crit:15},
    statDisplay:{HP:4,ATK:7,DEF:3,SPD:7,MP:10},
    abilities:['toxic_cloud','virulent_strain','pandemic','plague_bloom','psychic_cosmic_blast','psychic_dark_weaken','poison_cosmic_final','light_rune_blast'],
    burstAbility:'arcanist_burst',
    passives:['plague_lord','arcane_mastery'],
    description:'The mathematically optimal pathogen — disease designed by theoretical derivation to be maximally effective against every possible biological target simultaneously. The Theoretical Maximum is what the pestilencelord has been trying to create empirically for their entire career, completed by the arcanist in an afternoon.',
    lore:'The pestilencelord had created very good diseases. The arcanist derived the best possible disease from mathematical principles. The Theoretical Maximum is the result: a pathogen with no evolutionary constraints, designed to the specifications of the optimal lethality formula. The pestilencelord reviewed the result, compared it to their life\'s work, and had complicated feelings about the afternoon it took.'
  },

  pestilence_sentinel: {
    id:'pestilence_sentinel', name:'The Plague Ward', icon:'☣️',
    tagline:'The wall seals the plague in. The plague is doing exactly what the pestilencelord intended.',
    color:'#669944', element:'poison', elementFlavor:'plaguewall', rarity:'rare',
    fusedFrom:['pestilencelord','sentinel'],
    stats:{hp:115,maxHp:115,mp:70,maxMp:70,atk:9,def:14,spd:8,crit:10},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:7},
    abilities:['toxic_cloud','virulent_strain','pandemic','plague_bloom','normal_rune_ward','fire_steel_quench','poison_void_stance','normal_gravity_burden'],
    burstAbility:'pestilencelord_burst',
    passives:['plague_lord','bastion'],
    description:'A contained biological hazard zone — the sentinel holds the perimeter, the pestilencelord fills the interior. The Plague Ward cannot be approached without entering a disease environment, and the sentinel ensures it cannot be left without permission. Everything inside the perimeter belongs to the plague.',
    lore:'The pestilencelord needed to concentrate disease in a bounded area. The sentinel provided the boundary. The Plague Ward found that a sentinel-enforced quarantine zone contains disease with an efficiency that the pestilencelord\'s biological containment protocols alone could not achieve, and that the sentinel, who does not breathe plague-laced air in the way a living sentinel would, is an ideal perimeter enforcer for a biological hazard.'
  },

  pestilence_phantom: {
    id:'pestilence_phantom', name:'The Specter of Plague', icon:'☣️',
    tagline:'The ghost that carries disease. The disease that cannot be avoided. This is not a coincidence.',
    color:'#77aa55', element:'poison', elementFlavor:'plagueghost', rarity:'legendary',
    fusedFrom:['pestilencelord','phantom'],
    stats:{hp:73,maxHp:73,mp:90,maxMp:90,atk:13,def:5,spd:15,crit:19},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:9},
    abilities:['toxic_cloud','virulent_strain','pandemic','plague_bloom','water_ghost_phase','ice_ghost_haunt','poison_void_blast','poison_dark_drain'],
    burstAbility:'phantom_burst',
    passives:['plague_lord','phase'],
    description:'A disease vector without a body — the pestilencelord\'s entire pathogen arsenal carried by a phantom that phases through physical barriers to deliver infection directly. The Specter of Plague cannot be quarantined because walls do not stop it, and the disease it carries cannot be avoided because the carrier has already phased through to the other side.',
    lore:'The pestilencelord needed to reach targets in sealed rooms. The phantom reached everything. The Specter of Plague found that a disease carrier who phases through quarantine walls solves the pestilencelord\'s access problem entirely, and that the phantom\'s inability to be infected means it can carry any combination of pathogens without self-limiting its own effectiveness.'
  },

  wind_doom: {
    id:'wind_doom', name:'The Approaching Storm', icon:'💨',
    tagline:'The doom arrives on the wind. You can hear it before it reaches you. This does not help.',
    color:'#88aa66', element:'wind', elementFlavor:'winddoom', rarity:'legendary',
    fusedFrom:['windwalker','doomcaster'],
    stats:{hp:73,maxHp:73,mp:98,maxMp:98,atk:12,def:5,spd:16,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:9},
    abilities:['gale_force','wind_slash','cyclone','tempest_strike','time_void_drain','wind_void_final','dark_blood_final','wind_void_blast'],
    burstAbility:'windwalker_burst',
    passives:['gust','doom_aura'],
    description:'A doom seal carried at wind velocity — the sealed fate arrives before any defensive preparation can be completed, because at 16 SPD it completes the transit before the target identifies it as incoming. The Approaching Storm gives a moment of warning. The doom was already sealed when the warning began.',
    lore:'The doomcaster\'s sealed fates were always described as inevitable. The windwalker made them also immediate. The Approaching Storm carries doom at speed and found that the experience of inevitability is qualitatively changed when the inevitable thing also arrives before you finish processing the information that it is coming.'
  },

  wind_arcanist: {
    id:'wind_arcanist', name:'The Living Theorem', icon:'💨',
    tagline:'The formula expressed in wind is a formula that moves.',
    color:'#aabb88', element:'wind', elementFlavor:'windarcane', rarity:'legendary',
    fusedFrom:['windwalker','arcanist'],
    stats:{hp:68,maxHp:68,mp:108,maxMp:108,atk:11,def:4,spd:16,crit:17},
    statDisplay:{HP:4,ATK:7,DEF:3,SPD:9,MP:11},
    abilities:['gale_force','wind_slash','cyclone','tempest_strike','psychic_rune_blast','psychic_wind_blast','wind_cosmic_final','wind_light_surge'],
    burstAbility:'arcanist_burst',
    passives:['gust','arcane_mastery'],
    description:'Arcane formulae expressed as wind patterns — the arcanist\'s equations encoded in the topology of moving air. The Living Theorem\'s spells propagate outward as wind fronts, covering the entire battlefield at 16 SPD, and the formula continues to operate as long as the wind blows.',
    lore:'The arcanist wrote formulae in static media. The windwalker moved everything. The Living Theorem found that a formula written in wind topology is a formula that moves toward its target, and that moving formulae are harder to block than static ones — the spell is not coming from a specific direction because the wind comes from every direction, and the formula is in all of it.'
  },

  wind_sentinel: {
    id:'wind_sentinel', name:'The Gale Wall', icon:'💨',
    tagline:'The wall you cannot see is a wall made of air moving fast enough to be a wall.',
    color:'#bbdd88', element:'wind', elementFlavor:'windwall', rarity:'rare',
    fusedFrom:['windwalker','sentinel'],
    stats:{hp:108,maxHp:108,mp:70,maxMp:70,atk:10,def:13,spd:14,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:9,SPD:8,MP:7},
    abilities:['gale_force','wind_slash','cyclone','tempest_strike','normal_rune_ward','fire_wind_surge','wind_light_blast','wind_blood_stance'],
    burstAbility:'windwalker_burst',
    passives:['gust','bastion'],
    description:'A defensive position that moves — the sentinel\'s holding ability combined with the windwalker\'s 14 SPD, creating a fortification that can reposition to cover any approach angle before the attack reaches the previous position. The Gale Wall holds and moves simultaneously.',
    lore:'The sentinel was immovable, which was tactically appropriate but positionally static. The windwalker was always moving, which was fast but positionally unstable. The Gale Wall found the combination: a defensive presence that moves fast enough to be wherever the attack is going before the attack gets there, which converts the sentinel\'s holding capability into something that can hold any position rather than just one.'
  },

  wind_phantom: {
    id:'wind_phantom', name:'The Invisible Gale', icon:'💨',
    tagline:'The wind you cannot see. The wind you cannot touch. The wind that touches you.',
    color:'#cceebb', element:'wind', elementFlavor:'windghost', rarity:'mythical',
    fusedFrom:['windwalker','phantom'],
    stats:{hp:70,maxHp:70,mp:82,maxMp:82,atk:13,def:4,spd:18,crit:21},
    statDisplay:{HP:4,ATK:9,DEF:3,SPD:9,MP:8},
    abilities:['gale_force','wind_slash','cyclone','tempest_strike','water_ghost_phase','ice_ghost_phantasm','wind_void_drain','wind_blood_surge'],
    burstAbility:'phantom_burst',
    passives:['gust','phase'],
    description:'A phantom moving at 18 SPD — the fastest class in the game, invisible, and phasing through any material obstacle. The Invisible Gale strikes before the target registers it is there, from a direction and distance that cannot be determined because the attacker has no fixed position.',
    lore:'The windwalker moved at high speed. The phantom moved invisibly. The Invisible Gale combined speed and invisibility and found that the two properties compound: an invisible attacker at wind speed leaves no time to react to detection because the detection and the impact occur in the same instant — and the detection of an invisible target typically fails anyway, making the timeline entirely one-sided.'
  },

  doom_arcanist: {
    id:'doom_arcanist', name:'The Equation of Endings', icon:'⏳',
    tagline:'The formula with only one solution, and the solution is the end.',
    color:'#554466', element:'dark', elementFlavor:'doomarcane', rarity:'legendary',
    fusedFrom:['doomcaster','arcanist'],
    stats:{hp:65,maxHp:65,mp:115,maxMp:115,atk:10,def:4,spd:12,crit:18},
    statDisplay:{HP:4,ATK:6,DEF:3,SPD:7,MP:11},
    abilities:['doom_mark','seal_fate','inevitable','entropy_strike','psychic_cosmic_blast','psychic_rune_final','dark_void_blast','psychic_void_final'],
    burstAbility:'doomcaster_burst',
    passives:['doom_aura','arcane_mastery'],
    description:'The doom as a solved equation — the doomcaster\'s sealed fates expressed as mathematical inevitability, derived and proven by the arcanist\'s framework. The Equation of Endings has no unsolvable cases and no variables that can be set to avoid the outcome, because the arcanist verified the formula contains none.',
    lore:'The doomcaster sealed fates through authority. The arcanist proved them through mathematics. The Equation of Endings found that a doom that has been proven mathematically is qualitatively different from one issued by personal authority: the target can argue with authority. They cannot argue with a verified proof. The arcanist includes the proof in the doom seal, which the doomcaster considers an elegant touch.'
  },

  doom_sentinel: {
    id:'doom_sentinel', name:'The Last Wall', icon:'⏳',
    tagline:'The wall that holds until the doom activates is the last wall anyone will see.',
    color:'#556677', element:'dark', elementFlavor:'doomwall', rarity:'epic',
    fusedFrom:['doomcaster','sentinel'],
    stats:{hp:115,maxHp:115,mp:75,maxMp:75,atk:9,def:15,spd:8,crit:11},
    statDisplay:{HP:8,ATK:6,DEF:10,SPD:5,MP:7},
    abilities:['doom_mark','seal_fate','inevitable','entropy_strike','normal_rune_ward','fire_steel_quench','dark_void_blast','time_void_weaken'],
    burstAbility:'doomcaster_burst',
    passives:['doom_aura','bastion'],
    description:'A defensive position reinforced by doom — the sentinel holds while the doom seals the fate of everyone attacking the wall. The Last Wall does not need to be an impenetrable defense; it only needs to hold until the doom activates, at which point the definition of "impenetrable" becomes academic.',
    lore:'The sentinel held the wall by preventing enemies from passing it. The doomcaster held the wall by ensuring enemies who approached it did not survive the approach. The Last Wall combines both: a physical hold backed by sealed fates, so that enemies who breach the physical perimeter find they already lost before they got there.'
  },

  doom_phantom: {
    id:'doom_phantom', name:'The Sealed Shade', icon:'⏳',
    tagline:'The phantom carries the doom. The doom cannot be avoided because the carrier cannot be detected.',
    color:'#445566', element:'dark', elementFlavor:'doomghost', rarity:'mythical',
    fusedFrom:['doomcaster','phantom'],
    stats:{hp:68,maxHp:68,mp:92,maxMp:92,atk:12,def:4,spd:16,crit:22},
    statDisplay:{HP:4,ATK:8,DEF:3,SPD:8,MP:9},
    abilities:['doom_mark','seal_fate','inevitable','entropy_strike','water_ghost_phase','ice_ghost_phantasm','dark_void_blast','time_void_drain'],
    burstAbility:'phantom_burst',
    passives:['doom_aura','phase'],
    description:'A phantom carrying doom seals — invisible, intangible, and moving at 16 SPD to place doom marks that cannot be detected before they activate. The Sealed Shade delivers doom as a contact effect from a carrier the target cannot perceive, making counter-doom techniques inapplicable because there is no observable delivery to counter.',
    lore:'The doomcaster needed to place doom seals undetected. The phantom delivered everything undetected. The Sealed Shade applies doom marks while phased into the target\'s occupied space and found that a doom seal placed at that range is invisible not because of any concealment technique but because the caster is in the same location as the target during placement, which is not where anyone looks for an incoming attack.'
  },

  arcanist_sentinel: {
    id:'arcanist_sentinel', name:'The Runic Bastion', icon:'📜',
    tagline:'The formula that holds the wall is a better wall than the wall.',
    color:'#7788aa', element:'psychic', elementFlavor:'arcanewall', rarity:'epic',
    fusedFrom:['arcanist','sentinel'],
    stats:{hp:113,maxHp:113,mp:80,maxMp:80,atk:9,def:14,spd:9,crit:12},
    statDisplay:{HP:7,ATK:6,DEF:9,SPD:6,MP:8},
    abilities:['arcane_bolt','spell_surge','mana_burn','arcane_mastery_strike','normal_rune_ward','light_rune_surge','psychic_rune_blast','void_rune_stance'],
    burstAbility:'arcanist_burst',
    passives:['arcane_mastery','bastion'],
    description:'Arcane formulae maintaining a defensive position — the sentinel\'s hold expressed as equations that self-sustain without the biological limits of a living defender. The Runic Bastion holds through mathematical necessity: the formula says the position holds, and the formula is correct.',
    lore:'The sentinel held through will. The arcanist held through proof. The Runic Bastion derived the formula for an unbreachable position and found that a defense described by an internally consistent mathematical framework holds for the same reason the framework holds — because the alternative would require the formula to be false, and the arcanist has checked the formula.'
  },

  arcanist_phantom: {
    id:'arcanist_phantom', name:'The Invisible Theorem', icon:'📜',
    tagline:'The formula that operates from outside observation space operates without constraint.',
    color:'#8899cc', element:'psychic', elementFlavor:'arcaneghost', rarity:'mythical',
    fusedFrom:['arcanist','phantom'],
    stats:{hp:65,maxHp:65,mp:108,maxMp:108,atk:12,def:4,spd:15,crit:22},
    statDisplay:{HP:4,ATK:8,DEF:3,SPD:8,MP:11},
    abilities:['arcane_bolt','spell_surge','mana_burn','arcane_mastery_strike','water_ghost_phase','psychic_void_final','psychic_rune_blast','psychic_dark_final'],
    burstAbility:'phantom_burst',
    passives:['arcane_mastery','phase'],
    description:'The arcanist\'s most powerful formulae cast from an invisible state — spells that arrive without a visible caster to locate, interrupt, or counter. The Invisible Theorem phases to casting position, executes the formula at point-blank range, and phases away before the target identifies where the spell originated.',
    lore:'The arcanist\'s primary vulnerability was the casting position: visible, stationary, locatable. The phantom had no position to locate. The Invisible Theorem phases to optimal formula execution range and found that the arcanist\'s theoretical output is not limited by range — it is limited by the need to be in range while remaining alive, which the phase capability addresses more comprehensively than any defensive formula the arcanist had previously derived.'
  },

  sentinel_phantom: {
    id:'sentinel_phantom', name:'The Unbreachable Shadow', icon:'🛡️',
    tagline:'The wall you cannot touch and cannot go around. Both properties are real.',
    color:'#778899', element:'steel', elementFlavor:'ghostwall', rarity:'mythical',
    fusedFrom:['sentinel','phantom'],
    stats:{hp:112,maxHp:112,mp:72,maxMp:72,atk:11,def:15,spd:13,crit:17},
    statDisplay:{HP:7,ATK:7,DEF:10,SPD:7,MP:7},
    abilities:['fortify','shield_wall','taunt','counter_stance','water_ghost_phase','ice_ghost_phantasm','dark_void_blast','void_rune_surge'],
    burstAbility:'sentinel_burst',
    passives:['bastion','phase'],
    description:'A defensive presence that is simultaneously immovable and intangible — holds position with 15 DEF while phasing to intercept attacks that bypass the physical wall. The Unbreachable Shadow covers every approach because the physical position blocks the direct approach and the phase covers everything else.',
    lore:'The sentinel held position physically. The phantom occupied positions physically impossible to hold. The Unbreachable Shadow combined these and found the defensive answer to every approach vector: the physical wall handles direct assault, and the phantom capability handles approaches that go through or around the physical wall, which were previously the sentinel\'s theoretical vulnerability and are now also covered.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_16);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_16);
  FUSION_LOADED_FILES.add(16);
  if(typeof console!=='undefined') console.debug('[Fusion] File 16 loaded (37 classes)');
})();
