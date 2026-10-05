// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 8 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_8 = {
  'hexblade+necromancer': 'necro_hex',
  'cosmomancer+necromancer': 'necro_cosmo',
  'necromancer+pestilencelord': 'necro_pestilence',
  'necromancer+windwalker': 'necro_wind',
  'doomcaster+necromancer': 'necro_doom',
  'arcanist+necromancer': 'necro_arcanist',
  'necromancer+sentinel': 'necro_sentinel',
  'necromancer+phantom': 'necro_phantom',
  'frostweaver+paladin': 'paladin_frost',
  'dragonknight+paladin': 'paladin_dragon',
  'paladin+tidecaller': 'paladin_tide',
  'gravitist+paladin': 'paladin_gravitist',
  'paladin+soundbreaker': 'paladin_soundbreaker',
  'chronomancer+paladin': 'paladin_chrono',
  'paladin+spellsword': 'paladin_spellsword',
  'paladin+plaguedoctor': 'paladin_plague',
  'geomancer+paladin': 'paladin_geo',
  'lightbringer+paladin': 'paladin_lightbringer',
  'beastmaster+paladin': 'paladin_beast',
  'paladin+techsavant': 'paladin_tech',
  'gravewarden+paladin': 'paladin_grave',
  'magnetist+paladin': 'paladin_magnetist',
  'crystalmancer+paladin': 'paladin_crystal',
  'paladin+warlord': 'paladin_war',
  'paladin+spiritwalker': 'paladin_spirit',
  'hexblade+paladin': 'paladin_hex',
  'cosmomancer+paladin': 'paladin_cosmo',
  'paladin+pestilencelord': 'paladin_pestilence',
  'paladin+windwalker': 'paladin_wind',
  'doomcaster+paladin': 'paladin_doom',
  'arcanist+paladin': 'paladin_arcanist',
  'paladin+sentinel': 'paladin_sentinel',
  'paladin+phantom': 'paladin_phantom',
  'dragonknight+frostweaver': 'frost_dragon',
  'frostweaver+tidecaller': 'frost_tide',
  'frostweaver+gravitist': 'frost_gravitist',
  'frostweaver+soundbreaker': 'frost_soundbreaker'
};

const FUSION_CLASSES_8 = {
  necro_hex: {
    id:'necro_hex', name:'The Cursed Grave', icon:'💀',
    tagline:'The hex outlasts the hexed. The grave holds both.',
    color:'#5e6677', element:'ghost', elementFlavor:'deathblood', rarity:'epic',
    fusedFrom:['necromancer','hexblade'],
    stats:{hp:75,maxHp:75,mp:105,maxMp:105,atk:11,def:6,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','dark_blood_final','dark_blood_strike','dark_blood_stance','normal_void_curse'],
    burstAbility:'hexblade_burst',
    passives:['death_aura','hex_master'],
    description:'Raises hex-bound undead — cursed corpses that transmit their hexes on contact, spreading curses to living enemies with every strike. The hexes embedded in dead flesh do not degrade. They simply wait. The dead are patient with them.',
    lore:'The hexblade placed curses on the living. The necromancer raised the dead. The Cursed Grave found that hexes placed on the recently deceased do not expire with the host — they remain, fully active, in whatever walks again.'
  },

  necro_cosmo: {
    id:'necro_cosmo', name:'The Stellar Necropolis', icon:'💀',
    tagline:'Dead stars. Dead planets. Dead everything, at sufficient scale.',
    color:'#3c6f88', element:'ghost', elementFlavor:'cosmicghost', rarity:'legendary',
    fusedFrom:['necromancer','cosmomancer'],
    stats:{hp:70,maxHp:70,mp:118,maxMp:118,atk:10,def:5,spd:11,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:6,MP:11},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','dark_cosmic_blast','dark_cosmic_strike','light_cosmic_blast','normal_space_consume'],
    burstAbility:'cosmomancer_burst',
    passives:['death_aura','stardust'],
    description:'Channels the death of celestial bodies — dead stars as power sources, the energy of collapsed worlds fueling undead armies, cosmic-scale necrotic force focused down to dungeon range. The Stellar Necropolis fights with the weight of extinction.',
    lore:'The cosmomancer studied the lifecycle of stars. Most of them end. The necromancer asked: what happens after? The Stellar Necropolis found the answer and has been using it since — the death of a star is not an ending but a very large amount of available necrotic energy.'
  },

  necro_pestilence: {
    id:'necro_pestilence', name:'The Blighted Host', icon:'💀',
    tagline:'The undead carry disease without suffering from it. They are perfect hosts.',
    color:'#449933', element:'ghost', elementFlavor:'plaguesoul', rarity:'legendary',
    fusedFrom:['necromancer','pestilencelord'],
    stats:{hp:75,maxHp:75,mp:110,maxMp:110,atk:10,def:6,spd:10,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:5,MP:11},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','fire_poison_plague','fire_bug_plague','ice_ghost_chill','normal_dark_corrupt'],
    burstAbility:'pestilence_lord_burst',
    passives:['death_aura','plague_lord'],
    description:'The undead as a plague delivery system at maximum efficiency — corpses stuffed with engineered diseases spread contagion with every strike while remaining personally immune. The Blighted Host cannot be contained because killing it distributes the payload faster.',
    lore:'The plaguedoctor wanted vectors that did not die from their own cargo. The necromancer produced them. The Blighted Host is the professional result: an undead army optimized for disease transmission, immune to consequences, and extremely motivated in a directionless way.'
  },

  necro_wind: {
    id:'necro_wind', name:'The Wailing Gale', icon:'💀',
    tagline:'The wind carries screams. At a certain speed, the wind is the scream.',
    color:'#5ebb88', element:'ghost', elementFlavor:'windghost', rarity:'rare',
    fusedFrom:['necromancer','windwalker'],
    stats:{hp:75,maxHp:75,mp:95,maxMp:95,atk:11,def:6,spd:15,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:9},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','dark_wind_drain','dark_wind_blast','dark_wind_strike','fire_wind_cyclone'],
    burstAbility:'necro_burst',
    passives:['death_aura','gust'],
    description:'Spectral undead that ride the wind — wraiths that move at gust speed and phase through obstacles. The Wailing Gale fills the air with wind-borne spirit attacks that can strike from any direction. There is no safe side to face away from.',
    lore:'The windwalker moved like wind. The necromancer animated what the wind carried. The Wailing Gale found that spectral entities and fast-moving air have a natural affinity — both are invisible until contact, both come from unexpected directions, and both are considerably more damaging than their visual presence suggests.'
  },

  necro_doom: {
    id:'necro_doom', name:'The Inevitable End', icon:'💀',
    tagline:'Doom says: you will die. The undead army says: we will be there when you do.',
    color:'#4d6f4d', element:'ghost', elementFlavor:'deathblood', rarity:'legendary',
    fusedFrom:['necromancer','doomcaster'],
    stats:{hp:70,maxHp:70,mp:115,maxMp:115,atk:10,def:5,spd:11,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:6,MP:11},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','dark_time_drain','dark_cosmic_blast','normal_void_drain','normal_dark_eclipse'],
    burstAbility:'doomcaster_burst',
    passives:['death_aura','doom_aura'],
    description:'Seals doom onto targets and waits with an army of patient dead. The undead do not hurry. The doom does not expire. When doom triggers, every raised undead charges simultaneously. The Inevitable End just schedules the appointment.',
    lore:'The doomcaster doomed targets. The necromancer raised what they became. The Inevitable End streamlined the process: doom the target, wait, raise the result. Every fight is a future battle that has already been won. It simply has not been delivered yet.'
  },

  necro_arcanist: {
    id:'necro_arcanist', name:'The Lich Scholar', icon:'💀',
    tagline:'The search for perfect knowledge required outliving imperfect mortality.',
    color:'#446f99', element:'ghost', elementFlavor:'mindghost', rarity:'legendary',
    fusedFrom:['necromancer','arcanist'],
    stats:{hp:68,maxHp:68,mp:120,maxMp:120,atk:9,def:5,spd:12,crit:14},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:11},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','electric_psychic_vortex','electric_ghost_drain','dark_cosmic_blast','dark_time_surge'],
    burstAbility:'void_burst',
    passives:['death_aura','arcane_mastery'],
    description:'Applies arcane research to the problem of mortality and solves it conclusively. The Lich Scholar\'s undead retain the full intellectual capacity of their living selves and continue their research. The army is also a library. Both are dangerous.',
    lore:'The arcanist pursued knowledge across a lifetime. The necromancer extended the lifetime. The Lich Scholar found that death is simply an incomplete solution to the continuity problem, and that the necromantic supplement addresses the gaps in the original methodology.'
  },

  necro_sentinel: {
    id:'necro_sentinel', name:'The Undying Wall', icon:'💀',
    tagline:'The wall holds. The wall has always held. The wall cannot stop holding.',
    color:'#5e9977', element:'ghost', elementFlavor:'soulsteel', rarity:'rare',
    fusedFrom:['necromancer','sentinel'],
    stats:{hp:115,maxHp:115,mp:80,maxMp:80,atk:9,def:12,spd:8,crit:8},
    statDisplay:{HP:8,ATK:6,DEF:8,SPD:5,MP:8},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','water_ghost_haunt','ice_ghost_wraith','normal_rune_ward','electric_ghost_surge'],
    burstAbility:'necro_burst',
    passives:['death_aura','bastion'],
    description:'A fortified position held by undead who cannot retreat — an immovable wall of raised dead that absorbs damage without flinching, raises casualties from both sides as reinforcements, and holds the line indefinitely because death is not a valid reason to stop.',
    lore:'The sentinel held position through everything. The necromancer removed death as an obstacle to holding position. The Undying Wall does not hold because it is brave or disciplined. It holds because it has no other programming and an unlimited supply of reinforcements.'
  },

  necro_phantom: {
    id:'necro_phantom', name:'The Wraith Court', icon:'💀',
    tagline:'The most powerful undead are the ones that were never quite alive.',
    color:'#5ea291', element:'ghost', rarity:'mythical',
    fusedFrom:['necromancer','phantom'],
    stats:{hp:70,maxHp:70,mp:100,maxMp:100,atk:12,def:5,spd:14,crit:19},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','water_ghost_wraith','water_ghost_phase','ice_ghost_ethereal','electric_ghost_possession'],
    burstAbility:'shadow_burst',
    passives:['death_aura','phase'],
    description:'Commands a court of powerful wraiths — the highest tier of undead, spectral entities that phase through armor, possess enemies and turn them against allies, and drain life force without physical contact. The Wraith Court makes every fight a haunting.',
    lore:'Phantoms exist at the edge of death and non-death. The necromancer found them there. The Wraith Court is what a necromancer becomes when they spend enough time at that edge: something that commands from the threshold and has forgotten which side they were originally on.'
  },

  paladin_frost: {
    id:'paladin_frost', name:'The Winter Covenant', icon:'⚜️',
    tagline:'Holy ground stays holy in winter. It just becomes considerably more dangerous.',
    color:'#b3d5aa', element:'fairy', elementFlavor:'holyice', rarity:'epic',
    fusedFrom:['paladin','frostweaver'],
    stats:{hp:105,maxHp:105,mp:73,maxMp:73,atk:12,def:11,spd:11,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','ice_ghost_chill','ice_dark_frost','normal_ice_prison','normal_light_dawn'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','frost_mastery'],
    description:'Holy ground consecrated by ice — frozen sanctuaries that slow enemies who enter them, divine lances that shatter on impact into holy ice shards, and wards of absolute cold that protect allies from necrotic and dark forces.',
    lore:'The paladin held ground sacred. The frostweaver held ground frozen. The Winter Covenant found these were compatible holdings and that a ground both sacred and frozen is extremely difficult to contest on any practical level.'
  },

  paladin_dragon: {
    id:'paladin_dragon', name:'The Sacred Drake', icon:'⚜️',
    tagline:'The divine mandate is now significantly larger and has more teeth.',
    color:'#dd992b', element:'fairy', elementFlavor:'holydrake', rarity:'epic',
    fusedFrom:['paladin','dragonknight'],
    stats:{hp:130,maxHp:130,mp:55,maxMp:55,atk:14,def:13,spd:9,crit:9},
    statDisplay:{HP:9,ATK:10,DEF:9,SPD:5},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','dragon_light_strike','dragon_light_drain','dragon_light_weaken','normal_dragon_surge'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','intimidation'],
    description:'A holy warrior mounted on a consecrated dragon — divine light breathed instead of fire, holy scales that repel corruption, and the combined presence of the sacred and the draconic reducing most enemies to immediate reconsidering of their choices.',
    lore:'The paladin rode into battle on divine principle. The dragonknight rode into battle on a dragon. The Sacred Drake rides into battle on both simultaneously, which produces an entrance that most opponents describe as the most theologically significant experience of their dungeon career.'
  },

  paladin_tide: {
    id:'paladin_tide', name:'The Consecrated Tide', icon:'⚜️',
    tagline:'Holy water applied at tidal scale.',
    color:'#91b391', element:'fairy', elementFlavor:'holytide', rarity:'rare',
    fusedFrom:['paladin','tidecaller'],
    stats:{hp:108,maxHp:108,mp:75,maxMp:75,atk:12,def:11,spd:11,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','normal_light_dawn','normal_light_absorb','water_ghost_haunt','water_ghost_drown'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','tidal_flow'],
    description:'Holy water as a tidal weapon — consecrated floods that purify while they drown, divine currents that heal allies and harm undead and demons simultaneously. The Consecrated Tide cleanses everything it touches, which is not a comfortable process for the things being cleansed.',
    lore:'Holy water is blessed water. Tides are a great deal of water. The Consecrated Tide does the math on what sufficiently blessed water at tidal volume does to the contents of a dungeon, and the answer is: exactly what you would expect.'
  },

  paladin_gravitist: {
    id:'paladin_gravitist', name:'The Divine Weight', icon:'⚜️',
    tagline:'Divine judgment is heavy. This is literal.',
    color:'#91915e', element:'fairy', elementFlavor:'holygrav', rarity:'epic',
    fusedFrom:['paladin','gravitist'],
    stats:{hp:103,maxHp:103,mp:78,maxMp:78,atk:11,def:10,spd:10,crit:11},
    statDisplay:{HP:7,ATK:8,DEF:7,SPD:6,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','normal_gravity_crush','normal_gravity_anchor','normal_light_dawn','normal_rune_ward'],
    burstAbility:'gravitist_burst',
    passives:['sacred_aura','gravity_well'],
    description:'Delivers holy judgment with gravitational force — divine lances that increase in weight mid-flight, consecrated gravity wells that hold enemies in place for sustained holy damage, and the crushing awareness that divine authority has physical mass when applied this way.',
    lore:'The paladin delivered judgment. The gravitist delivered weight. The Divine Weight made these the same delivery: judgment that physically presses the recipient into the floor, which the paladin found more effective than verbal condemnation in most combat scenarios.'
  },

  paladin_soundbreaker: {
    id:'paladin_soundbreaker', name:'The Penitent Choir', icon:'⚜️',
    tagline:'The voice of divine authority carries. This one carries further.',
    color:'#ddbb55', element:'fairy', elementFlavor:'radiantsound', rarity:'epic',
    fusedFrom:['paladin','soundbreaker'],
    stats:{hp:105,maxHp:105,mp:73,maxMp:73,atk:13,def:10,spd:12,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','ice_sound_dissonance','ice_sound_shatter','light_time_blast','normal_light_blind'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','resonance'],
    description:'The Penitent Choir delivers divine commands at sonic volume — holy shockwaves that compel enemies to their knees, righteous frequencies that shatter undead and demon constructs, and a voice of judgment that operates at the resonant frequency of sin.',
    lore:'The paladin proclaimed divine authority. The soundbreaker made proclamations into weapons. The Penitent Choir found that there is a frequency at which divine authority becomes physically compelling, and that frequency is louder than most combatants are prepared for.'
  },

  paladin_chrono: {
    id:'paladin_chrono', name:'The Eternal Judgment', icon:'⚜️',
    tagline:'Divine law does not expire. It operates on its own schedule.',
    color:'#c4aaaa', element:'time', elementFlavor:'timelight', rarity:'epic',
    fusedFrom:['paladin','chronomancer'],
    stats:{hp:100,maxHp:100,mp:85,maxMp:85,atk:11,def:10,spd:11,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','light_time_blast','light_time_dot_strike','light_time_drain','normal_time_age'],
    burstAbility:'chronomancer_burst',
    passives:['sacred_aura','time_warp'],
    description:'Delivers divine sentence across time — judgments that activate after a delay, divine retribution that arrives in the past, and holy wards that last indefinitely because they are anchored outside the normal timeline.',
    lore:'Divine law is eternal. The chronomancer said: I can work with eternal. The Eternal Judgment operates on a schedule that neither the target nor the caster fully controls — the sentence has been passed, and it will be served at the appointed moment regardless of what happens between now and then.'
  },

  paladin_spellsword: {
    id:'paladin_spellsword', name:'The Righteous Blade', icon:'⚜️',
    tagline:'The holy sword and the holy spell are the same holy thing.',
    color:'#c48880', element:'fairy', elementFlavor:'holypsychic', rarity:'epic',
    fusedFrom:['paladin','spellsword'],
    stats:{hp:110,maxHp:110,mp:70,maxMp:70,atk:13,def:11,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','electric_psychic_pulse','electric_fairy_enchant','normal_light_blind','normal_light_dawn'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','spellblade'],
    description:'Enchants weapons with divine formulae — each spell is also a holy enchantment, each strike delivers both physical and divine damage, and the Righteous Blade maintains an arcane holy aura that amplifies both channels simultaneously.',
    lore:'The spellsword combined intellect and edge. The paladin combined faith and edge. The Righteous Blade found these were parallel approaches to the same weapon and that combining them produces a blade with two amplification systems that neither originally possessed alone.'
  },

  paladin_plague: {
    id:'paladin_plague', name:'The Purifying Plague', icon:'⚜️',
    tagline:'Disease is a test. The holy plague ensures everyone passes it immediately.',
    color:'#b3bb44', element:'fairy', elementFlavor:'holypoison', rarity:'epic',
    fusedFrom:['paladin','plaguedoctor'],
    stats:{hp:103,maxHp:103,mp:80,maxMp:80,atk:11,def:11,spd:9,crit:10},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:5,MP:8},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_poison_plague','fire_bug_plague','normal_light_dawn','normal_light_absorb'],
    burstAbility:'plague_doctor_burst',
    passives:['sacred_aura','immunity'],
    description:'Engineers holy plague — disease that purifies corrupt targets while strengthening the righteous. The Purifying Plague is simultaneously a cure and a weapon depending on the spiritual alignment of whoever it enters. The plaguedoctor finds this distinction useful. The target finds it categorical.',
    lore:'The plaguedoctor studied disease. The paladin studied corruption. The Purifying Plague found these were studying the same thing at different scales, and that a disease calibrated to target corruption rather than biology produces some very useful battlefield effects and some difficult theological questions.'
  },

  paladin_geo: {
    id:'paladin_geo', name:'The Sacred Ground', icon:'⚜️',
    tagline:'Holy earth is hard to move. This becomes someone else\'s problem.',
    color:'#c4aa55', element:'fairy', elementFlavor:'earthlight', rarity:'rare',
    fusedFrom:['paladin','geomancer'],
    stats:{hp:115,maxHp:115,mp:65,maxMp:65,atk:12,def:13,spd:8,crit:9},
    statDisplay:{HP:8,ATK:9,DEF:9,SPD:5,MP:6},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_ground_quake','fire_rock_strike','normal_rune_ward','normal_light_dawn'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','earth_body'],
    description:'Consecrates the very ground — the earth becomes holy terrain that heals allies walking across it and harms enemies. Stone becomes divine material that repels corruption. The Sacred Ground cannot be displaced because it is, definitionally, where the sacred is.',
    lore:'The geomancer considered the earth a tool. The paladin considered it an altar. The Sacred Ground compromised: it is both, simultaneously, and anything standing on it is subject to whichever interpretation is currently less convenient for them.'
  },

  paladin_lightbringer: {
    id:'paladin_lightbringer', name:'The Solar Crusade', icon:'⚜️',
    tagline:'The divine light and the worldly light are the same light. Both are weapons.',
    color:'#eed54d', element:'light', elementFlavor:'radiance', rarity:'epic',
    fusedFrom:['paladin','lightbringer'],
    stats:{hp:108,maxHp:108,mp:73,maxMp:73,atk:13,def:12,spd:11,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','normal_light_blind','normal_light_dawn','dragon_light_strike','dragon_light_weaken'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','radiant'],
    description:'Combines divine and natural light into a unified radiant weapon — blinding holy flashes, solar-powered divine lances, and an aura so bright it functions as area denial. The Solar Crusade does not fight in shadow. It removes the shadow.',
    lore:'The lightbringer brought illumination. The paladin brought the divine. The Solar Crusade found these were additive rather than redundant and that the sum is considerably brighter than either source individually, which is quantitatively useful and philosophically satisfying.'
  },

  paladin_beast: {
    id:'paladin_beast', name:'The Holy Hunt', icon:'⚜️',
    tagline:'The sacred pursuit does not end. It is a calling, not a task.',
    color:'#b3c44d', element:'fairy', elementFlavor:'runelight', rarity:'rare',
    fusedFrom:['paladin','beastmaster'],
    stats:{hp:113,maxHp:113,mp:63,maxMp:63,atk:13,def:12,spd:12,crit:10},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:6},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','normal_dragon_surge','normal_dragon_roar','normal_light_dawn','fire_fighting_combo'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','feral_bond'],
    description:'Commands holy beasts — animals consecrated in divine service, pack tactics in service of righteous purpose, and the tracking instinct of the hunt combined with the moral certainty of the crusade. The Holy Hunt knows exactly where the enemy is and exactly why it should be found.',
    lore:'The paladin pursued righteousness. The beastmaster pursued prey. The Holy Hunt found these pursuits were compatible and that a consecrated hunting pack has the additional advantage of moral clarity, which regular hunting packs lack and which makes them considerably more determined.'
  },

  paladin_tech: {
    id:'paladin_tech', name:'The Holy Engine', icon:'⚜️',
    tagline:'Divine purpose optimized through engineering. The divine endorses this.',
    color:'#91aa80', element:'fairy', elementFlavor:'techlight', rarity:'epic',
    fusedFrom:['paladin','techsavant'],
    stats:{hp:105,maxHp:105,mp:78,maxMp:78,atk:12,def:11,spd:12,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_cyber_overclock','normal_light_dawn','electric_fairy_enchant','fire_cyber_firewall'],
    burstAbility:'techsavant_burst',
    passives:['sacred_aura','overclock'],
    description:'Divine energy channeled through technical systems — holy enchantments overclocked beyond rated capacity, sacred firewalls that block both physical and spiritual intrusion, and divine-powered machines that answer to both the engineer and whatever the engineer serves.',
    lore:'The paladin said: divine purpose guides the faithful. The techsavant said: purpose can be optimized. The Holy Engine agreed with both and found that divine guidance combined with engineering precision produces output neither tradition previously achieved, which both traditions consider a validation of their core premises.'
  },

  paladin_grave: {
    id:'paladin_grave', name:'The Holy Sepulchre', icon:'⚜️',
    tagline:'The sacred grave does not release its occupants. It is a very specific kind of rest.',
    color:'#99996f', element:'fairy', elementFlavor:'sacredsoul', rarity:'rare',
    fusedFrom:['paladin','gravewarden'],
    stats:{hp:123,maxHp:123,mp:63,maxMp:63,atk:12,def:14,spd:8,crit:9},
    statDisplay:{HP:8,ATK:9,DEF:9,SPD:5,MP:6},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','normal_light_dawn','fire_spirit_exorcism','water_ghost_phase','normal_rune_ward'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','undying'],
    description:'Consecrates graves to ensure they stay graves — prevents undead from rising in the area, banishes spirits that attempt to cross, and refuses to be put down as long as there are unholy forces attempting to undo what the Holy Sepulchre has sealed.',
    lore:'The gravewarden held the dead down. The paladin held them sacred. The Holy Sepulchre combines these practices and found that a grave held both down and sacred is far more permanent than either condition alone. The necromancers find this professionally frustrating.'
  },

  paladin_magnetist: {
    id:'paladin_magnetist', name:'The Magnetic Covenant', icon:'⚜️',
    tagline:'Holy force draws the righteous near and holds the wicked in place.',
    color:'#99b380', element:'fairy', elementFlavor:'magnetlight', rarity:'epic',
    fusedFrom:['paladin','magnetist'],
    stats:{hp:108,maxHp:108,mp:73,maxMp:73,atk:13,def:12,spd:10,crit:10},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:6,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_magnet_pull','fire_magnet_flux','normal_light_dawn','electric_steel_magnetize'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','magnetic_field'],
    description:'Magnetic holy force — draws the weapons of the corrupt back on themselves, anchors enemies in place for sustained divine judgment, and maintains a magnetic aura that pulls metallic armor off enemy combatants during the divine aura detonation.',
    lore:'The paladin attracted followers through conviction. The magnetist attracted metal through force. The Magnetic Covenant found that the underlying operation is identical and that divine conviction, at the right field strength, produces the same physical effects as industrial magnetism.'
  },

  paladin_crystal: {
    id:'paladin_crystal', name:'The Crystal Shrine', icon:'⚜️',
    tagline:'The shrine refracts the divine light everywhere at once. There is no shadow.',
    color:'#b3c4aa', element:'fairy', elementFlavor:'crystallight', rarity:'legendary',
    fusedFrom:['paladin','crystalmancer'],
    stats:{hp:100,maxHp:100,mp:80,maxMp:80,atk:13,def:10,spd:12,crit:14},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:7,MP:8},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_crystal_refract','fire_crystal_shard','normal_light_blind','normal_light_dawn'],
    burstAbility:'crystalmancer_burst',
    passives:['sacred_aura','crystal_body'],
    description:'Grows crystal shrines that refract divine light across the entire battlefield — holy energy arrives from every angle simultaneously. Crystal structures amplify sacred auras. The Crystal Shrine is not an obstacle. It is a distributed divine delivery system.',
    lore:'The crystalmancer built structures that refracted light. The paladin illuminated with divine light. The Crystal Shrine found these ambitions were additive and that a crystal that refracts divine light provides coverage that the paladin could not achieve from a single standing position.'
  },

  paladin_war: {
    id:'paladin_war', name:'The Righteous Army', icon:'⚜️',
    tagline:'The divine mandate includes a tactical map. Enemies are marked on it.',
    color:'#d5882b', element:'fairy', elementFlavor:'holywar', rarity:'rare',
    fusedFrom:['paladin','warlord'],
    stats:{hp:125,maxHp:125,mp:58,maxMp:58,atk:14,def:13,spd:10,crit:9},
    statDisplay:{HP:8,ATK:10,DEF:9,SPD:6},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_fighting_rage','normal_blood_mark','normal_light_dawn','fire_rock_strike'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','battle_hardened'],
    description:'Commands with divine and martial authority simultaneously — holy war cries that inspire allies, tactical divine strikes that coordinate with each other, and a mandate that enemies cannot ignore because it is both righteous and extremely well-executed.',
    lore:'The warlord commanded the battlefield. The paladin commanded the moral high ground. The Righteous Army found that the moral high ground is also a battlefield position and that occupying it while employing sound tactics produces results that are difficult to argue with either militarily or philosophically.'
  },

  paladin_spirit: {
    id:'paladin_spirit', name:'The Ascendant', icon:'⚜️',
    tagline:'The divine and the spiritual are different names for the same summit.',
    color:'#91bb6f', element:'fairy', elementFlavor:'ascendant', rarity:'epic',
    fusedFrom:['paladin','spiritwalker'],
    stats:{hp:110,maxHp:110,mp:73,maxMp:73,atk:12,def:12,spd:11,crit:10},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:6,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_spirit_sanctuary','fire_spirit_ascension','water_ghost_phase','normal_light_dawn'],
    burstAbility:'spiritwalker_burst',
    passives:['sacred_aura','spirit_bond'],
    description:'Channels divine light through spiritual pathways — the spirit network carries holy energy to allies across the battlefield, consecrates spiritual entities, and elevates the Ascendant above the physical plane temporarily to attack from a position of divine perspective.',
    lore:'The spiritwalker walked between worlds. The paladin walked between the sacred and the mundane. The Ascendant walks between both distinctions simultaneously and has found the view from that position to be both spiritually clarifying and tactically advantageous.'
  },

  paladin_hex: {
    id:'paladin_hex', name:'The Inquisitor\'s Mark', icon:'⚜️',
    tagline:'The holy curse is still a curse. The target will not find the theological distinction comforting.',
    color:'#b3776f', element:'fairy', elementFlavor:'fallenlight', rarity:'epic',
    fusedFrom:['paladin','hexblade'],
    stats:{hp:105,maxHp:105,mp:75,maxMp:75,atk:13,def:11,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','dark_light_drain','dark_light_blast','normal_light_blind','normal_void_curse'],
    burstAbility:'hexblade_burst',
    passives:['sacred_aura','hex_master'],
    description:'Places holy hexes — divine curses that specifically target the corruption, weakness, and moral failing of the marked target. The Inquisitor\'s Mark knows exactly what each enemy is guilty of and exploits it. Enemies with no sin find this does not help them much.',
    lore:'The hexblade cursed without discrimination. The paladin discriminated extensively. The Inquisitor\'s Mark combined these practices and produced a curse that is targeted, documented, and delivered with the full ceremonial weight of divine judicial process. The outcome is the same but more official.'
  },

  paladin_cosmo: {
    id:'paladin_cosmo', name:'The Divine Cosmos', icon:'⚜️',
    tagline:'The universe was made with purpose. That purpose is currently expressed at close range.',
    color:'#918080', element:'cosmic', elementFlavor:'cosmiclight', rarity:'legendary',
    fusedFrom:['paladin','cosmomancer'],
    stats:{hp:100,maxHp:100,mp:88,maxMp:88,atk:12,def:9,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:6,MP:8},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','light_cosmic_blast','light_cosmic_strike','light_cosmic_dot_strike','normal_space_consume'],
    burstAbility:'cosmomancer_burst',
    passives:['sacred_aura','stardust'],
    description:'Channels cosmological divine force — stellar holy energy, the light of sacred stars, and the gravitational pull of divine bodies focused into combat range. The Divine Cosmos is not humble about the scale of its mandate.',
    lore:'The cosmomancer studied the scale of the universe. The paladin studied the purpose behind it. The Divine Cosmos found these studies were complementary and that a divine mandate operating at cosmological scale is simply more compelling than one that references only local phenomena.'
  },

  paladin_pestilence: {
    id:'paladin_pestilence', name:'The Sanctified Plague', icon:'⚜️',
    tagline:'The holy disease does not hurt the righteous. The distinction is enforced rigorously.',
    color:'#99aa2b', element:'fairy', elementFlavor:'holypoison', rarity:'legendary',
    fusedFrom:['paladin','pestilencelord'],
    stats:{hp:105,maxHp:105,mp:80,maxMp:80,atk:12,def:11,spd:9,crit:10},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:5,MP:8},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_poison_plague','fire_bug_plague','normal_light_dawn','normal_blood_sacrifice'],
    burstAbility:'pestilence_lord_burst',
    passives:['sacred_aura','plague_lord'],
    description:'Engineers plague that distinguishes between the righteous and the corrupt — the Sanctified Plague is a biological enforcer of divine law, spreading freely through enemies while healing and blessing allies it contacts. It determines righteousness on contact and acts accordingly.',
    lore:'The plaguedoctor made disease that spread to everything. The paladin needed disease that spread selectively. The Sanctified Plague required significant additional development work, a theological consultation, and three failed prototypes before it achieved the discrimination required.'
  },

  paladin_wind: {
    id:'paladin_wind', name:'The Crusader\'s Wind', icon:'⚜️',
    tagline:'Divine purpose has velocity. At 15 SPD, considerable velocity.',
    color:'#b3cc80', element:'fairy', elementFlavor:'windlight', rarity:'rare',
    fusedFrom:['paladin','windwalker'],
    stats:{hp:105,maxHp:105,mp:65,maxMp:65,atk:13,def:10,spd:15,crit:13},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:8,MP:6},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','fire_wind_cyclone','fire_flying_dive','normal_light_dawn','normal_light_blind'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','gust'],
    description:'Divine intervention at wind speed — the Crusader\'s Wind delivers holy justice before enemies can prepare a defense, sweeping the battlefield with consecrated gales that carry both the damage and the ideological content of the crusade.',
    lore:'Divine justice is supposed to be swift. The windwalker said: I can help with swift. The Crusader\'s Wind found that a crusade that moves at 15 SPD encounters considerably less organized resistance than one that approaches at a processional pace.'
  },

  paladin_doom: {
    id:'paladin_doom', name:'The Last Rite', icon:'⚜️',
    tagline:'The divine sentence was passed before the battle began. It is now being executed.',
    color:'#a28044', element:'fairy', elementFlavor:'fallenlight', rarity:'legendary',
    fusedFrom:['paladin','doomcaster'],
    stats:{hp:100,maxHp:100,mp:85,maxMp:85,atk:12,def:9,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:6,MP:8},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','dark_light_blast','dark_light_surge','normal_light_dawn','normal_void_curse'],
    burstAbility:'doomcaster_burst',
    passives:['sacred_aura','doom_aura'],
    description:'Issues divine doom — a holy sentence that combines the finality of divine judgment with the inevitability of doom magic. The Last Rite is not a killing blow. It is the official paperwork for one that arrives on schedule.',
    lore:'The paladin judged the living. The doomcaster doomed the living. The Last Rite combined both offices into one and found that a doom blessed by divine authority has a considerably higher delivery rate than either instrument achieves independently.'
  },

  paladin_arcanist: {
    id:'paladin_arcanist', name:'The Theologian', icon:'⚜️',
    tagline:'The proof of divine law can be expressed mathematically. The math is very clear on the outcome.',
    color:'#998091', element:'fairy', elementFlavor:'holypsychic', rarity:'legendary',
    fusedFrom:['paladin','arcanist'],
    stats:{hp:98,maxHp:98,mp:90,maxMp:90,atk:11,def:9,spd:11,crit:13},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:6,MP:9},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','electric_psychic_pulse','electric_fairy_enchant','light_cosmic_strike','light_time_blast'],
    burstAbility:'void_burst',
    passives:['sacred_aura','arcane_mastery'],
    description:'Applies arcane analysis to divine phenomena — calculates the optimal expression of holy force, derives the theoretical maximum output of sacred energy, and applies both with precision. The Theologian does not act on faith. It acts on demonstrated divine calculus.',
    lore:'The arcanist proved things. The paladin believed things. The Theologian found these were the same activity with different standards of evidence, and that when both standards are applied to the same divine phenomenon, the resulting certainty produces considerably more forceful output than either tradition achieves alone.'
  },

  paladin_sentinel: {
    id:'paladin_sentinel', name:'The Sacred Fortification', icon:'⚜️',
    tagline:'This ground is holy. Nothing crosses it. These are the same statement.',
    color:'#b3aa6f', element:'fairy', elementFlavor:'sacredsteel', rarity:'rare',
    fusedFrom:['paladin','sentinel'],
    stats:{hp:145,maxHp:145,mp:50,maxMp:50,atk:10,def:16,spd:7,crit:6},
    statDisplay:{HP:10,ATK:7,DEF:10,SPD:4},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','normal_rune_ward','fire_steel_quench','normal_light_dawn','normal_light_absorb'],
    burstAbility:'paladin_burst',
    passives:['sacred_aura','bastion'],
    description:'The most fortified holy position possible — consecrated ground held by a paladin who cannot be moved. Every approach is warded. Every attack is answered with divine retribution. The Sacred Fortification turns defense into theology and theology into an impenetrable barrier.',
    lore:'The sentinel said: I hold this position. The paladin said: this position is sacred. The Sacred Fortification discovered that holding a position for sacred reasons produces a determination that tactical attrition cannot address, which is the most defensible combination available.'
  },

  paladin_phantom: {
    id:'paladin_phantom', name:'The Holy Specter', icon:'⚜️',
    tagline:'The divine manifests through the threshold. It does not need a door.',
    color:'#b3b388', element:'fairy', elementFlavor:'sacredsoul', rarity:'mythical',
    fusedFrom:['paladin','phantom'],
    stats:{hp:100,maxHp:100,mp:70,maxMp:70,atk:13,def:9,spd:14,crit:18},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:8,MP:7},
    abilities:['radiant_aura','divine_lance','holy_nova','martyrs_wrath','water_ghost_phase','fire_spirit_exorcism','ice_ghost_chill','normal_light_blind'],
    burstAbility:'shadow_burst',
    passives:['sacred_aura','phase'],
    description:'Divine power expressed through spectral form — phases through barriers to deliver holy justice where corrupt targets attempt to hide, exorcises demons and undead it passes through, and manifests divine presence in areas that should not have it.',
    lore:'The phantom crossed boundaries that should not be crossed. The paladin believed in authority that should not be denied. The Holy Specter combined these and found that divine authority crossing forbidden boundaries produces a category of holy visitation that the traditional liturgy had not previously documented.'
  },

  frost_dragon: {
    id:'frost_dragon', name:'Glacial Wyrm', icon:'❄️',
    tagline:'The cold-blooded dragon was always going to end up here.',
    color:'#b3a280', element:'ice', elementFlavor:'frostdrake', rarity:'epic',
    fusedFrom:['frostweaver','dragonknight'],
    stats:{hp:105,maxHp:105,mp:68,maxMp:68,atk:14,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:10,DEF:8,SPD:7,MP:7},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_dragon_storm','ice_dragon_shard','ice_dragon_scales','normal_dragon_surge'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','intimidation'],
    description:'A dragon of pure frost — ice breath instead of fire, frozen scales that deflect attacks, and a territorial cold that extends across the battlefield. The Glacial Wyrm does not burn. It freezes, and things frozen by dragons do not thaw quickly.',
    lore:'Fire-breathing dragons get the attention. Cold-breathing dragons are considerably more unsettling in a dungeon context. The Glacial Wyrm breathes ice that freezes floors, ceilings, and enemies with equal thoroughness. The temperature drops when it enters a room. This is intentional.'
  },

  frost_tide: {
    id:'frost_tide', name:'The Frozen Shore', icon:'❄️',
    tagline:'Where the cold sea meets the cold land, everything stops.',
    color:'#66bbe6', element:'ice', elementFlavor:'glacier', rarity:'rare',
    fusedFrom:['frostweaver','tidecaller'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:11,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_ghost_chill','ice_water_glacial','ice_rock_avalanche','normal_ice_prison'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','tidal_flow'],
    description:'Commands tidal ice — waves that freeze on contact, glacial flows that reshape the battlefield, and the creeping cold of deep water expressed as an advancing wall of ice that stops when everything in front of it has stopped.',
    lore:'The tidecaller moved water. The frostweaver stopped it. The Frozen Shore found the precise location where the tide becomes ice — and found that controlling that boundary means controlling the temperature of everything that approaches it.'
  },

  frost_gravitist: {
    id:'frost_gravitist', name:'The Cold Singularity', icon:'❄️',
    tagline:'Absolute zero is the point where molecules stop moving. This accelerates arrival at that point.',
    color:'#6699b3', element:'ice', elementFlavor:'frozencore', rarity:'epic',
    fusedFrom:['frostweaver','gravitist'],
    stats:{hp:78,maxHp:78,mp:90,maxMp:90,atk:10,def:7,spd:12,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','normal_gravity_crush','normal_gravity_pull','ice_cosmic_surge','ice_time_stance'],
    burstAbility:'gravitist_burst',
    passives:['frost_mastery','gravity_well'],
    description:'Gravitational cold — uses mass to concentrate cold into a point of absolute temperature. Pulls all heat away from a target area, compresses frozen matter with gravitational force, and creates cold singularities that neither warmth nor movement can escape.',
    lore:'The frostweaver cooled things. The gravitist compressed things. The Cold Singularity compresses cold, which reduces the ambient temperature of the resulting point to a level that makes the standard meaning of the word "cold" feel optimistic.'
  },

  frost_soundbreaker: {
    id:'frost_soundbreaker', name:'The Frozen Frequency', icon:'❄️',
    tagline:'Sound slows in cold air. At absolute zero, it stops entirely. So does everything else.',
    color:'#b3c4aa', element:'ice', elementFlavor:'frostsound', rarity:'epic',
    fusedFrom:['frostweaver','soundbreaker'],
    stats:{hp:80,maxHp:80,mp:85,maxMp:85,atk:12,def:7,spd:14,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['ice_lance','frost_nova','frozen_time','absolute_zero','ice_sound_shatter','ice_sound_absolute_zero','ice_sound_dissonance','ice_sound_frozen_melody'],
    burstAbility:'frostweaver_burst',
    passives:['frost_mastery','resonance'],
    description:'Weaponizes the relationship between sound and temperature — cold slows sonic propagation, sonic resonance shatters frozen structures, and the combination delivers ice-borne vibrations at the exact frequency required to crystallize whatever they enter.',
    lore:'Sound travels differently through cold air. The frostweaver controlled the cold; the soundbreaker controlled the sound. The Frozen Frequency controls both simultaneously and has found the specific frequency at which cold and sound become a single unified destructive instrument.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_8);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_8);
  FUSION_LOADED_FILES.add(8);
  if(typeof console!=='undefined') console.debug('[Fusion] File 8 loaded (37 classes)');
})();
