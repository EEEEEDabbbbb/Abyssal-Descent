// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 12 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_12 = {
  'chronomancer+techsavant': 'chrono_tech',
  'chronomancer+gravewarden': 'chrono_grave',
  'chronomancer+magnetist': 'chrono_magnetist',
  'chronomancer+crystalmancer': 'chrono_crystal',
  'chronomancer+warlord': 'chrono_war',
  'chronomancer+spiritwalker': 'chrono_spirit',
  'chronomancer+hexblade': 'chrono_hex',
  'chronomancer+cosmomancer': 'chrono_cosmo',
  'chronomancer+pestilencelord': 'chrono_pestilence',
  'chronomancer+windwalker': 'chrono_wind',
  'chronomancer+doomcaster': 'chrono_doom',
  'arcanist+chronomancer': 'chrono_arcanist',
  'chronomancer+sentinel': 'chrono_sentinel',
  'chronomancer+phantom': 'chrono_phantom',
  'plaguedoctor+spellsword': 'spellsword_plague',
  'geomancer+spellsword': 'spellsword_geo',
  'lightbringer+spellsword': 'spellsword_lightbringer',
  'beastmaster+spellsword': 'spellsword_beast',
  'spellsword+techsavant': 'spellsword_tech',
  'gravewarden+spellsword': 'spellsword_grave',
  'magnetist+spellsword': 'spellsword_magnetist',
  'crystalmancer+spellsword': 'spellsword_crystal',
  'spellsword+warlord': 'spellsword_war',
  'spellsword+spiritwalker': 'spellsword_spirit',
  'hexblade+spellsword': 'spellsword_hex',
  'cosmomancer+spellsword': 'spellsword_cosmo',
  'pestilencelord+spellsword': 'spellsword_pestilence',
  'spellsword+windwalker': 'spellsword_wind',
  'doomcaster+spellsword': 'spellsword_doom',
  'arcanist+spellsword': 'spellsword_arcanist',
  'sentinel+spellsword': 'spellsword_sentinel',
  'phantom+spellsword': 'spellsword_phantom',
  'geomancer+plaguedoctor': 'plague_geo',
  'lightbringer+plaguedoctor': 'plague_lightbringer',
  'beastmaster+plaguedoctor': 'plague_beast',
  'plaguedoctor+techsavant': 'plague_tech',
  'gravewarden+plaguedoctor': 'plague_grave'
};

const FUSION_CLASSES_12 = {
  chrono_tech: {
    id:'chrono_tech', name:'The Clockwork', icon:'⏳',
    tagline:'Machines that can predict the future maintain themselves perfectly.',
    color:'#7788d5', element:'time', elementFlavor:'timetech', rarity:'legendary',
    fusedFrom:['chronomancer','techsavant'],
    stats:{hp:75,maxHp:75,mp:103,maxMp:103,atk:11,def:7,spd:14,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:8,MP:10},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_cyber_overclock','fire_cyber_system_melt','time_rune_surge','time_void_surge'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','overclock'],
    description:'Technical systems that operate across time — machines that draw power from temporal differentials, automated processes that precomplete their tasks before they are initiated, and overclocked systems that run faster by skipping the moments between actions.',
    lore:'Machines work in time. The chronomancer worked on time. The Clockwork found that a machine allowed to skip forward over its own processing steps runs faster than any conventional overclocking can achieve, and that temporal shortcuts are essentially free computational power once you understand how to access them.'
  },

  chrono_grave: {
    id:'chrono_grave', name:'The Grave of Times', icon:'⏳',
    tagline:'Every moment that has passed is buried. This one digs them up.',
    color:'#8077c4', element:'time', elementFlavor:'timeghost', rarity:'epic',
    fusedFrom:['chronomancer','gravewarden'],
    stats:{hp:93,maxHp:93,mp:88,maxMp:88,atk:11,def:10,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:6,MP:8},
    abilities:['time_stop','rewind','temporal_rift','age_strike','water_ghost_haunt','time_blood_final','normal_time_age','water_dark_depths'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','undying'],
    description:'Commands the dead from any point in history — raises the fallen from specific past moments, returns victims to the moment before their death as allies, and refuses to stay buried across any timeline. The Grave of Times does not respect the direction of dying.',
    lore:'The gravewarden managed deaths in the present. The chronomancer managed moments across time. The Grave of Times manages deaths from any moment: a dead ally from three rounds ago returns at full strength from the moment before they fell, which is a resurrection technique that does not require magic — just access to the moment that already happened.'
  },

  chrono_magnetist: {
    id:'chrono_magnetist', name:'The Temporal Lodestone', icon:'⏳',
    tagline:'Magnetic fields persist through time. The lodestone left in a room centuries ago is still attracting.',
    color:'#8091d5', element:'time', elementFlavor:'timemagnet', rarity:'epic',
    fusedFrom:['chronomancer','magnetist'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:12,def:8,spd:13,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_magnet_pull','electric_steel_magnetize','time_void_strike','time_rune_dot_strike'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','magnetic_field'],
    description:'Magnetic fields drawn from past and future simultaneously — lodestones placed in the timeline attracting metal objects from multiple temporal directions, and the accumulated magnetic history of every metal object that has passed through the dungeon concentrated into the present.',
    lore:'Magnetic fields do not decay quickly. The chronomancer found that very old magnetic fields still exist, intact, in the past. The Temporal Lodestone retrieves magnetic fields placed in earlier epochs and applies them in the present, which produces magnetic forces that the magnetist alone could not generate from a standing start.'
  },

  chrono_crystal: {
    id:'chrono_crystal', name:'The Timekeeper\'s Crystal', icon:'⏳',
    tagline:'Quartz measures time. This crystal measures everything else.',
    color:'#99a2ff', element:'time', elementFlavor:'timecrystal', rarity:'legendary',
    fusedFrom:['chronomancer','crystalmancer'],
    stats:{hp:70,maxHp:70,mp:105,maxMp:105,atk:12,def:6,spd:14,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_crystal_refract','ice_rock_crystallize','time_rune_strike','time_void_drain'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','crystal_body'],
    description:'Crystals grown across centuries of dungeon time, compressed into immediate use — temporal crystal structures that store moments of maximum combat energy and release them on command, and a body half-composed of crystallized time.',
    lore:'Quartz oscillates at precise frequencies that correspond to time measurement. The chronomancer understood this relationship. The Timekeeper\'s Crystal grows crystals along temporal fault lines, producing structures that contain not just mineral energy but temporal potential — and shatters them at the moment of maximum accumulated value.'
  },

  chrono_war: {
    id:'chrono_war', name:'The Inevitable Victory', icon:'⏳',
    tagline:'The battle plan accounts for the future. The future has already confirmed the outcome.',
    color:'#bb6680', element:'time', elementFlavor:'timewar', rarity:'epic',
    fusedFrom:['chronomancer','warlord'],
    stats:{hp:95,maxHp:95,mp:83,maxMp:83,atk:13,def:9,spd:13,crit:12},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_fighting_rage','normal_blood_mark','time_blood_blast','time_rune_blast'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','battle_hardened'],
    description:'Applies temporal foresight to tactical doctrine — every engagement is planned with complete knowledge of the first three turns, orders issued before the enemy acts, and corrections pre-deployed for enemy responses that have not yet occurred.',
    lore:'The warlord anticipated enemy actions through experience and intelligence. The chronomancer confirmed them by checking. The Inevitable Victory plans battles with the benefit of foresight, issuing orders that account for enemy decisions the enemy has not yet made but will, because the chronomancer has already seen the timeline where they do.'
  },

  chrono_spirit: {
    id:'chrono_spirit', name:'The Ancestral Timeline', icon:'⏳',
    tagline:'Every ancestor exists simultaneously in the timeline. This calls them all.',
    color:'#7799c4', element:'time', elementFlavor:'timespirit', rarity:'legendary',
    fusedFrom:['chronomancer','spiritwalker'],
    stats:{hp:80,maxHp:80,mp:98,maxMp:98,atk:10,def:8,spd:14,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:6,SPD:8,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','electric_spirit_surge','time_blood_surge','water_ghost_phase','time_rune_final'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','spirit_bond'],
    description:'Communes with ancestors across every point in the timeline — the spiritwalker\'s spiritual network extended backward through time, accessing versions of spirits who were more powerful in earlier eras and pulling their capabilities forward.',
    lore:'The spiritwalker communed with spirits of the recently dead. The chronomancer offered access to every dead moment in the timeline. The Ancestral Timeline found that spirits exist at every point they ever lived and that speaking to the version of a spirit from its peak power is considerably more useful than speaking to the version that has had centuries to grow tired.'
  },

  chrono_hex: {
    id:'chrono_hex', name:'The Retroactive Curse', icon:'⏳',
    tagline:'The hex was placed before the fight began. You have been cursed since you arrived.',
    color:'#9955c4', element:'time', elementFlavor:'doomtime', rarity:'legendary',
    fusedFrom:['chronomancer','hexblade'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:12,def:7,spd:14,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:10},
    abilities:['time_stop','rewind','temporal_rift','age_strike','time_blood_weaken','psychic_blood_weaken','time_void_stance','normal_void_curse'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','hex_master'],
    description:'Places hexes retroactively — the curse is delivered into the enemy\'s past so that it has already been active when the fight begins. The Retroactive Curse cannot be countered by removing it before it is placed because, from the enemy\'s timeline perspective, it was placed before they arrived.',
    lore:'The hexblade placed curses in the present. The chronomancer placed them in the past. The Retroactive Curse found that a hex placed before the enemy entered the fight has had time to compound, which makes it considerably more potent than one placed at the start of combat — and technically impossible to counter-hex because the moment of placement is already gone.'
  },

  chrono_cosmo: {
    id:'chrono_cosmo', name:'The Spacetime Convergence', icon:'⏳',
    tagline:'Space and time are one thing. This is that one thing.',
    color:'#775ed5', element:'time', elementFlavor:'spacetime', rarity:'mythical',
    fusedFrom:['chronomancer','cosmomancer'],
    stats:{hp:70,maxHp:70,mp:113,maxMp:113,atk:10,def:6,spd:13,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:11},
    abilities:['time_stop','rewind','temporal_rift','age_strike','dark_cosmic_blast','dark_cosmic_final','time_void_blast','dark_time_surge'],
    burstAbility:'cosmomancer_burst',
    passives:['time_warp','stardust'],
    description:'Operates at the unified spacetime level — attacks that occur across both spatial and temporal dimensions simultaneously, movements that are technically teleportation and time travel simultaneously, and the combined authority of cosmic scale and temporal range.',
    lore:'Physics established that space and time are not separate phenomena. The chronomancer and cosmomancer found this was not theoretical. The Spacetime Convergence operates at the level where space and time are the same thing and has found that this simplifies the mechanics of both disciplines considerably.'
  },

  chrono_pestilence: {
    id:'chrono_pestilence', name:'The Long Plague', icon:'⏳',
    tagline:'The disease that has been running for a thousand years arrives at full progression.',
    color:'#808880', element:'time', elementFlavor:'timeplague', rarity:'legendary',
    fusedFrom:['chronomancer','pestilencelord'],
    stats:{hp:75,maxHp:75,mp:105,maxMp:105,atk:11,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_poison_plague','poison_light_blast','time_blood_final','poison_wind_stance'],
    burstAbility:'pestilence_lord_burst',
    passives:['time_warp','plague_lord'],
    description:'Disease delivered at maximum temporal progression — a plague that has been running for the entire timeline of the dungeon arrives in the present at its thousandth-year state. The Long Plague skips every incubation stage that the pestilencelord normally has to wait through.',
    lore:'The pestilencelord needed time for diseases to progress. The chronomancer provided as much as needed. The Long Plague takes a new infection, runs it forward through the temporal fast lane, and delivers the thousand-year version to the target in the current turn, which the target experiences as a very rapid acceleration of events.'
  },

  chrono_wind: {
    id:'chrono_wind', name:'The Temporal Gale', icon:'⏳',
    tagline:'The wind blew through here. The wind blows through here. The wind will blow through here. Simultaneously.',
    color:'#99aad5', element:'time', elementFlavor:'timewind', rarity:'epic',
    fusedFrom:['chronomancer','windwalker'],
    stats:{hp:75,maxHp:75,mp:90,maxMp:90,atk:12,def:6,spd:17,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','fire_wind_cyclone','fire_flying_updraft','time_rune_dot_strike','dark_time_drain'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','gust'],
    description:'Wind that occupies every moment of its timeline simultaneously — the Temporal Gale blows at 17 SPD through all points in time where wind has passed, creating a sustained cyclone from accumulated atmospheric history. Enemies are struck by every version of the wind at once.',
    lore:'Wind passes through an area and dissipates. The chronomancer found that the wind does not actually disappear — it simply moves to the next moment. The Temporal Gale stacks all these passing moments back onto the present location, producing the combined force of every wind event that has ever moved through this space.'
  },

  chrono_doom: {
    id:'chrono_doom', name:'The Inescapable Hour', icon:'⏳',
    tagline:'Every path through the timeline ends here. The chronomancer confirmed this.',
    color:'#885e99', element:'time', elementFlavor:'doomtime', rarity:'mythical',
    fusedFrom:['chronomancer','doomcaster'],
    stats:{hp:70,maxHp:70,mp:110,maxMp:110,atk:10,def:5,spd:13,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:11},
    abilities:['time_stop','rewind','temporal_rift','age_strike','time_void_surge','time_void_blast','dark_time_drain','dark_cosmic_final'],
    burstAbility:'doomcaster_burst',
    passives:['time_warp','doom_aura'],
    description:'A doom that has been confirmed across every branch of the timeline — there is no sequence of events that avoids it. The Inescapable Hour does not merely sentence the enemy. It has checked every timeline and confirmed the sentence is already served in all of them.',
    lore:'The doomcaster sealed a fate in one timeline. The chronomancer checked the others. The Inescapable Hour found that some dooms propagate across all temporal branches simultaneously and that confirming this property before applying the doom is considerably more reassuring about the outcome than conventional doom application, which only guarantees one timeline.'
  },

  chrono_arcanist: {
    id:'chrono_arcanist', name:'The Absolute Formula', icon:'⏳',
    tagline:'The formula that was true at the beginning of time is still true. It has had time to prove itself.',
    color:'#805ee6', element:'time', elementFlavor:'timemind', rarity:'legendary',
    fusedFrom:['chronomancer','arcanist'],
    stats:{hp:68,maxHp:68,mp:115,maxMp:115,atk:10,def:5,spd:14,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:11},
    abilities:['time_stop','rewind','temporal_rift','age_strike','psychic_cosmic_blast','psychic_dark_stance','time_rune_surge','time_void_drain'],
    burstAbility:'void_burst',
    passives:['time_warp','arcane_mastery'],
    description:'The oldest arcane formulae, retrieved from the beginning of magic itself — spells derived at the moment the arcane tradition began, before any limitations were established. The Absolute Formula operates on the pre-constraint version of magical law.',
    lore:'Arcane law accumulated restrictions over time as its consequences were understood. The arcanist knew the current version. The chronomancer retrieved the original version from before the restrictions were added. The Absolute Formula uses the unedited edition, which is considerably more powerful and the reason the restrictions were added in the first place.'
  },

  chrono_sentinel: {
    id:'chrono_sentinel', name:'The Eternal Post', icon:'⏳',
    tagline:'The sentinel has held this position since before the dungeon was built. They were here first.',
    color:'#9988c4', element:'time', elementFlavor:'timesteel', rarity:'rare',
    fusedFrom:['chronomancer','sentinel'],
    stats:{hp:115,maxHp:115,mp:75,maxMp:75,atk:9,def:13,spd:10,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:6,MP:7},
    abilities:['time_stop','rewind','temporal_rift','age_strike','normal_rune_ward','fire_steel_quench','time_void_stance','normal_gravity_anchor'],
    burstAbility:'chronomancer_burst',
    passives:['time_warp','bastion'],
    description:'A position held across all time — the Eternal Post has occupied this ground in every timeline and cannot be dislodged because it has already held the position in every version of events. Attacks on it have already failed before they are initiated.',
    lore:'The sentinel held their position in this timeline. The chronomancer confirmed they hold it in all others. The Eternal Post fights from the advantage of having already defended every attack they will ever face, which produces a defensive confidence that is not arrogance but actuarial precision.'
  },

  chrono_phantom: {
    id:'chrono_phantom', name:'The Timeline Ghost', icon:'⏳',
    tagline:'The ghost exists in every moment of its death simultaneously.',
    color:'#9991dd', element:'time', elementFlavor:'timeghost', rarity:'mythical',
    fusedFrom:['chronomancer','phantom'],
    stats:{hp:70,maxHp:70,mp:95,maxMp:95,atk:12,def:5,spd:16,crit:20},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['time_stop','rewind','temporal_rift','age_strike','water_ghost_phase','ice_ghost_wraith','time_void_surge','time_blood_weaken'],
    burstAbility:'shadow_burst',
    passives:['time_warp','phase'],
    description:'A phantom distributed across its entire timeline — exists simultaneously in every moment it has ever occupied, making it technically impossible to kill because its current form is one of many simultaneous instances. The Timeline Ghost strikes from moments that have already passed.',
    lore:'Phantoms are the residue of a single death. The Timeline Ghost is the residue of every death across every temporal branch, accumulated in a single location. It is difficult to quantify how many of it there are at any given moment. The answer changes depending on which moment you are asking from.'
  },

  spellsword_plague: {
    id:'spellsword_plague', name:'The Cognitive Infection', icon:'🗡️',
    tagline:'The disease that starts in the mind spreads to the body on its own schedule.',
    color:'#99776f', element:'psychic', elementFlavor:'mindplague', rarity:'epic',
    fusedFrom:['spellsword','plaguedoctor'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:12,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_blood_dot_strike','psychic_blood_drain','fire_poison_plague','poison_light_drain'],
    burstAbility:'plague_doctor_burst',
    passives:['spellblade','immunity'],
    description:'Psionic infection — disease introduced through the mind before it manifests physically. Enemies do not know they are infected until the cognitive symptoms begin, and by then the physical infection is already in progress.',
    lore:'Disease normally enters through physical exposure. The spellsword provided mental access. The Cognitive Infection introduced pathogens via psionic channel, bypassing the immune response that guards physical vectors. The body becomes aware of the infection only after the mind has already been processing it for two turns.'
  },

  spellsword_geo: {
    id:'spellsword_geo', name:'The Stone Mind', icon:'🗡️',
    tagline:'The mind of stone is patient. The blade of stone is patient and extremely hard.',
    color:'#aa6680', element:'psychic', elementFlavor:'mindearth', rarity:'rare',
    fusedFrom:['spellsword','geomancer'],
    stats:{hp:95,maxHp:95,mp:75,maxMp:75,atk:13,def:11,spd:11,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:8,SPD:6,MP:7},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','fire_ground_quake','ice_rock_shatter','psychic_earth_spire','psychic_rune_stance'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','earth_body'],
    description:'Psychic geology — stone shaped by mental commands, psionic force that travels through solid matter, and a geological patience applied to combat methodology. The Stone Mind makes the dungeon an extension of its own cognitive space.',
    lore:'The geomancer shaped stone with force. The spellsword shaped with thought. The Stone Mind found these were compatible approaches and that stone already responds to the right kind of cognitive pressure, which the geomancer had been providing accidentally as an attitude rather than a technique.'
  },

  spellsword_lightbringer: {
    id:'spellsword_lightbringer', name:'The Illuminated Mind', icon:'🗡️',
    tagline:'The mind that carries light cannot be deceived by darkness.',
    color:'#d59177', element:'psychic', elementFlavor:'holypsychic', rarity:'epic',
    fusedFrom:['spellsword','lightbringer'],
    stats:{hp:88,maxHp:88,mp:83,maxMp:83,atk:13,def:9,spd:13,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_light_strike','psychic_light_weaken','normal_light_blind','dragon_light_drain'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','radiant'],
    description:'Combines psionic precision with divine radiance — psychic strikes that carry light into the target\'s cognitive space, mind-piercing attacks that simultaneously blind and disrupt. The Illuminated Mind fights in a field of its own light that the enemy\'s darkness cannot enter.',
    lore:'The lightbringer brought light to dark places. The spellsword brought light to dark thoughts. The Illuminated Mind combined these and found that light introduced directly into the psionic channel is considerably more disruptive than light applied from the outside, because the target cannot shield internally from their own cognitive processes.'
  },

  spellsword_beast: {
    id:'spellsword_beast', name:'The Feral Intellect', icon:'🗡️',
    tagline:'Instinct and intellect are not opposites. They are collaborative.',
    color:'#998077', element:'psychic', elementFlavor:'runepsychic', rarity:'rare',
    fusedFrom:['spellsword','beastmaster'],
    stats:{hp:93,maxHp:93,mp:73,maxMp:73,atk:14,def:9,spd:14,crit:14},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:8,MP:7},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','normal_dragon_surge','psychic_wind_drain','psychic_rune_surge','fire_fighting_combo'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','feral_bond'],
    description:'Hunting intelligence amplified by psionic precision — instincts that operate at intellectual speed, pack tactics coordinated through mental link, and the combined predictive capacity of a predator\'s instinctive pattern-recognition and an arcanist\'s analytic model.',
    lore:'Animals predict prey movement through instinct. The spellsword predicted enemy movement through analysis. The Feral Intellect found these were the same prediction process at different temporal scales and that combining them produces a predictive model faster than either and more reliable than both.'
  },

  spellsword_tech: {
    id:'spellsword_tech', name:'The Neural Interface', icon:'🗡️',
    tagline:'The mind and the machine are already speaking. This introduced them properly.',
    color:'#7766aa', element:'psychic', elementFlavor:'techpsychic', rarity:'epic',
    fusedFrom:['spellsword','techsavant'],
    stats:{hp:85,maxHp:85,mp:88,maxMp:88,atk:13,def:8,spd:14,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','fire_cyber_overclock','electric_cyber_spark','psychic_rune_weaken','psychic_void_strike'],
    burstAbility:'techsavant_burst',
    passives:['spellblade','overclock'],
    description:'Direct mental control of technical systems — machines operated without interface hardware through psionic command, technical systems overclocked by cognitive processing speed, and a neural link that makes the Neural Interface simultaneously an organic being and the most sophisticated piece of equipment in the dungeon.',
    lore:'The techsavant built control interfaces. The spellsword bypassed them. The Neural Interface found that machines respond to psionic commands the same way they respond to hardware signals, and that a mind fast enough to send commands at machine-cycle speed can overclock systems by thinking at them very quickly.'
  },

  spellsword_grave: {
    id:'spellsword_grave', name:'The Haunted Blade', icon:'🗡️',
    tagline:'The blade remembers every enemy it has killed. They provide tactical advice.',
    color:'#805599', element:'psychic', elementFlavor:'mindghost', rarity:'rare',
    fusedFrom:['spellsword','gravewarden'],
    stats:{hp:103,maxHp:103,mp:73,maxMp:73,atk:13,def:11,spd:11,crit:13},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:6,MP:7},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','water_ghost_haunt','psychic_blood_stance','psychic_rune_final','water_ghost_phase'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','undying'],
    description:'A blade inhabited by the psychic impressions of its kills — the Haunted Blade draws tactical information from fallen enemies, their fighting styles and weaknesses recorded in the psionic memory of each death. Every kill makes the next fight easier.',
    lore:'Weapons accumulate history. The spellsword accumulates it deliberately. The gravewarden helped organize the psychic archive of the blade\'s kills, and the Haunted Blade now holds a comprehensive tactical database of enemy fighting styles contributed by the enemies themselves, whose final moments were spent providing the information.'
  },

  spellsword_magnetist: {
    id:'spellsword_magnetist', name:'The Telekinetic', icon:'🗡️',
    tagline:'The mind and the magnet both move things without touching them. This one does both.',
    color:'#806faa', element:'psychic', elementFlavor:'magnetmind', rarity:'epic',
    fusedFrom:['spellsword','magnetist'],
    stats:{hp:88,maxHp:88,mp:83,maxMp:83,atk:13,def:9,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','fire_magnet_pull','electric_steel_magnetize','psychic_rune_surge','psychic_wind_final'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','magnetic_field'],
    description:'Telekinetic and magnetic manipulation combined — weapons moved by mind and field simultaneously, objects caught between psionic and magnetic attraction forced into complex orbital trajectories. The Telekinetic fights with everything in the room at once.',
    lore:'The magnetist moved metal through fields. The spellsword moved objects through thought. The Telekinetic found these were functionally identical operations that amplify each other when applied to the same target: metal objects respond to both channels simultaneously and the resulting movement vectors are not ones the target can anticipate from either source alone.'
  },

  spellsword_crystal: {
    id:'spellsword_crystal', name:'The Crystal Mind', icon:'🗡️',
    tagline:'The crystal holds thought perfectly. The thoughts it holds are dangerous.',
    color:'#9980d5', element:'psychic', elementFlavor:'crystalmind', rarity:'legendary',
    fusedFrom:['spellsword','crystalmancer'],
    stats:{hp:80,maxHp:80,mp:90,maxMp:90,atk:14,def:7,spd:14,crit:18},
    statDisplay:{HP:5,ATK:10,DEF:5,SPD:8,MP:9},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','fire_crystal_shard','fire_crystal_refract','psychic_cosmic_strike','psychic_dark_surge'],
    burstAbility:'crystalmancer_burst',
    passives:['spellblade','crystal_body'],
    description:'Psychic impressions stored in crystal structures — psionic attacks refracted through crystal lattices to strike from multiple simultaneous directions, and a cognitive architecture supported by crystal storage that maintains complex tactical calculations across the entire fight.',
    lore:'Crystal stores information — optical data, electrical charge, lattice stress. The spellsword stored thoughts instead. The Crystal Mind found that crystal-stored psionic impressions are more stable than biological memory and can be retrieved at crystal-processing speeds, which is faster than organic recall by several orders of magnitude.'
  },

  spellsword_war: {
    id:'spellsword_war', name:'The Strategic Mind', icon:'🗡️',
    tagline:'The warlord who can read thoughts does not need scouts.',
    color:'#bb4455', element:'psychic', elementFlavor:'warpsychic', rarity:'rare',
    fusedFrom:['spellsword','warlord'],
    stats:{hp:105,maxHp:105,mp:68,maxMp:68,atk:15,def:11,spd:12,crit:13},
    statDisplay:{HP:7,ATK:11,DEF:8,SPD:7,MP:6},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','fire_fighting_rage','normal_blood_mark','psychic_blood_drain','fire_fighting_combo'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','battle_hardened'],
    description:'Tactical psionic warfare — reads enemy strategy directly from their minds, counters movements before they are executed, and coordinates attacks through mental link rather than audible commands. The Strategic Mind makes every enemy\'s tactical decision a liability.',
    lore:'The warlord gathered intelligence through conventional means. The spellsword gathered it through psionic access. The Strategic Mind combined these and found that reading an enemy\'s tactical plan from their own working memory is more accurate than any intelligence network, faster than any courier, and available in the moment the enemy formulates the plan rather than after it is executed.'
  },

  spellsword_spirit: {
    id:'spellsword_spirit', name:'The Mindwalker', icon:'🗡️',
    tagline:'The gap between the living mind and the spirit world is narrower than it appears.',
    color:'#777799', element:'psychic', elementFlavor:'spiritmind', rarity:'epic',
    fusedFrom:['spellsword','spiritwalker'],
    stats:{hp:90,maxHp:90,mp:83,maxMp:83,atk:12,def:9,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','electric_spirit_surge','electric_spirit_possession','psychic_dark_strike','water_ghost_phase'],
    burstAbility:'spiritwalker_burst',
    passives:['spellblade','spirit_bond'],
    description:'Walks between mental and spiritual dimensions — psionic attacks that enter through the spirit world rather than physical space, spirit allies coordinated through direct mental link, and the ability to exist partially in both planes simultaneously.',
    lore:'The spiritwalker moved between worlds physically. The spellsword moved between them cognitively. The Mindwalker found these were entry points to the same space from different directions, and that entering from the cognitive direction places the practitioner in a part of the spirit world that physical entry does not reach.'
  },

  spellsword_hex: {
    id:'spellsword_hex', name:'The Psionic Hex', icon:'🗡️',
    tagline:'The curse delivered by thought is already inside the target before they know it arrived.',
    color:'#993399', element:'psychic', elementFlavor:'doompsychic', rarity:'epic',
    fusedFrom:['spellsword','hexblade'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:13,def:8,spd:13,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_void_dot_strike','psychic_void_weaken','normal_void_curse','dark_blood_stance'],
    burstAbility:'hexblade_burst',
    passives:['spellblade','hex_master'],
    description:'Hexes delivered through psionic contact — curses that slip through the cognitive layer, activating inside the target\'s own thought processes where they cannot be reached from the outside. The Psionic Hex makes the target\'s own mind the delivery mechanism.',
    lore:'The hexblade placed curses through physical contact. The spellsword placed them through psionic contact. The Psionic Hex found that a curse introduced via the target\'s own cognitive channel bypasses the external defensive responses that conventional hexes trigger, since the threat is classified as internal rather than external.'
  },

  spellsword_cosmo: {
    id:'spellsword_cosmo', name:'The Cosmic Intellect', icon:'🗡️',
    tagline:'The mind that thinks at cosmic scale has perspective advantages.',
    color:'#773caa', element:'psychic', elementFlavor:'cosmicmind', rarity:'legendary',
    fusedFrom:['spellsword','cosmomancer'],
    stats:{hp:80,maxHp:80,mp:98,maxMp:98,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:10},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_cosmic_blast','psychic_cosmic_drain','dark_cosmic_strike','normal_space_consume'],
    burstAbility:'cosmomancer_burst',
    passives:['spellblade','stardust'],
    description:'Psionic power at cosmic scale — a mind that thinks in terms of stellar distances applies that spatial precision to dungeon combat. The Cosmic Intellect attacks from perspectives that require cosmological awareness to anticipate and executes with the precision of something that measures in astronomical units.',
    lore:'The cosmomancer thought at astronomical scale. The spellsword thought at precise cognitive scale. The Cosmic Intellect combined these and found that applying astronomical precision to individual combat targets produces attack trajectories that are mathematically exotic and practically unblockable by anyone reasoning at a lower scale.'
  },

  spellsword_pestilence: {
    id:'spellsword_pestilence', name:'The Thought Plague', icon:'🗡️',
    tagline:'Ideas spread like diseases. This one made that literal.',
    color:'#806655', element:'psychic', elementFlavor:'mindplague', rarity:'legendary',
    fusedFrom:['spellsword','pestilencelord'],
    stats:{hp:85,maxHp:85,mp:90,maxMp:90,atk:13,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:9},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_blood_weaken','fire_poison_plague','poison_light_surge','psychic_dark_weaken'],
    burstAbility:'pestilence_lord_burst',
    passives:['spellblade','plague_lord'],
    description:'A plague of harmful cognition — psychic contagion that spreads from mind to mind on contact, implanting destructive thought patterns that degrade tactical capacity. The Thought Plague is transmitted by proximity to an affected enemy and reaches full cognitive disruption in two turns.',
    lore:'The pestilencelord made biological pathogens. The spellsword made psionic ones. The Thought Plague engineered a cognitive pathogen: a pattern of thought that is both harmful to the host and compulsively transmitted to nearby minds. The pestilencelord finds the infection mechanics familiar; the ethics committee finds them novel.'
  },

  spellsword_wind: {
    id:'spellsword_wind', name:'The Gale Mind', icon:'🗡️',
    tagline:'The mind moves faster than wind. The mind that also moves as wind moves fastest.',
    color:'#9988aa', element:'psychic', elementFlavor:'mindwind', rarity:'rare',
    fusedFrom:['spellsword','windwalker'],
    stats:{hp:85,maxHp:85,mp:75,maxMp:75,atk:13,def:7,spd:17,crit:17},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:9,MP:7},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_wind_blast','psychic_wind_surge','fire_flying_dive','fire_wind_cyclone'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','gust'],
    description:'Mental speed expressed as physical velocity — a mind that processes at wind speed moves at wind speed. The Gale Mind operates at 17 SPD, selecting attack vectors at cognitive speed and executing them at atmospheric speed simultaneously.',
    lore:'Thought is faster than action. Wind is faster than most actions. The Gale Mind found that a mind which processes at wind speed and moves at that same speed produces a cognitive-physical synchronization that makes the time between decision and execution effectively zero.'
  },

  spellsword_doom: {
    id:'spellsword_doom', name:'The Doomed Thought', icon:'🗡️',
    tagline:'The thought that leads to doom is the doom. This one makes them simultaneous.',
    color:'#883c6f', element:'psychic', elementFlavor:'doompsychic', rarity:'legendary',
    fusedFrom:['spellsword','doomcaster'],
    stats:{hp:80,maxHp:80,mp:95,maxMp:95,atk:12,def:6,spd:13,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:9},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_void_blast','psychic_void_surge','dark_blood_final','normal_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['spellblade','doom_aura'],
    description:'Doom introduced at the cognitive level — the death sentence delivered into the target\'s own thought processes, where they experience it as a certainty before it manifests physically. The Doomed Thought makes doom inevitable by making it cognitively accepted first.',
    lore:'The doomcaster made doom inevitable externally. The spellsword made it inevitable internally. The Doomed Thought found that a doom the target believes is a doom the target stops resisting, which accelerates the doom\'s manifestation considerably — the cognitive acceptance removes the one variable that sometimes delays the outcome.'
  },

  spellsword_arcanist: {
    id:'spellsword_arcanist', name:'The Arcane Psyche', icon:'🗡️',
    tagline:'The practitioner who thinks in formulae is the formula.',
    color:'#803cbb', element:'psychic', rarity:'legendary',
    fusedFrom:['spellsword','arcanist'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:12,def:6,spd:13,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:10},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','psychic_cosmic_weaken','psychic_dark_stance','psychic_rune_final','electric_psychic_vortex'],
    burstAbility:'void_burst',
    passives:['spellblade','arcane_mastery'],
    description:'The complete merger of arcane theory and psionic practice — a practitioner whose mind operates as the formula itself, instantiating spells as cognition rather than casting. The Arcane Psyche does not cast. It thinks, and the thinking is the effect.',
    lore:'The arcanist derived formulae for reality. The spellsword enacted formulae as thought. The Arcane Psyche found these were the same operation: the arcanist was already thinking in reality\'s language and the spellsword was already acting in the arcanist\'s language. The merger required no translation at all.'
  },

  spellsword_sentinel: {
    id:'spellsword_sentinel', name:'The Psychic Bastion', icon:'🗡️',
    tagline:'The wall you cannot see is harder to pass than the wall you can.',
    color:'#996699', element:'psychic', elementFlavor:'spellsteel', rarity:'rare',
    fusedFrom:['spellsword','sentinel'],
    stats:{hp:125,maxHp:125,mp:60,maxMp:60,atk:11,def:14,spd:9,crit:10},
    statDisplay:{HP:8,ATK:8,DEF:9,SPD:5,MP:6},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','fire_steel_quench','normal_rune_ward','psychic_rune_stance','psychic_dark_dot_strike'],
    burstAbility:'spellsword_burst',
    passives:['spellblade','bastion'],
    description:'A fortified position defended by both physical barrier and psionic field — the Psychic Bastion holds its position behind a mental defense layer that disrupts attackers before they reach the physical wall, making it effectively two fortifications in sequence.',
    lore:'The sentinel held ground behind physical defenses. The spellsword held ground behind mental ones. The Psychic Bastion holds ground behind both, which produces a defensive position that requires an attacker to overcome a cognitive disruption field and then a physical barrier — and the cognitive disruption is encountered first.'
  },

  spellsword_phantom: {
    id:'spellsword_phantom', name:'The Psionic Specter', icon:'🗡️',
    tagline:'The ghost that thinks clearly is the ghost that targets precisely.',
    color:'#996fb3', element:'psychic', elementFlavor:'mindghost', rarity:'mythical',
    fusedFrom:['spellsword','phantom'],
    stats:{hp:80,maxHp:80,mp:80,maxMp:80,atk:14,def:6,spd:16,crit:21},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:8,MP:8},
    abilities:['psionic_slash','mind_pierce','arcane_edge','thought_shatter','water_ghost_phase','ice_ghost_ethereal','psychic_dark_surge','psychic_void_surge'],
    burstAbility:'shadow_burst',
    passives:['spellblade','phase'],
    description:'A phantom with psionic precision — phases through physical defenses to deliver precise psychic strikes at cognitive vulnerabilities, attacks at 16 SPD from an immaterial state that weapons cannot reach, and turns every successfully phased attack into a mental disruption event as well as a physical one.',
    lore:'Phantoms phase through matter. The spellsword targeted through thought. The Psionic Specter phases to the target\'s cognitive center and delivers attacks from inside their own mental architecture, where there are no physical defenses because the cognitive space was not designed to be entered from the outside.'
  },

  plague_geo: {
    id:'plague_geo', name:'The Miasmic Earth', icon:'🩺',
    tagline:'The soil is sick. Everything planted in it inherits the condition.',
    color:'#999944', element:'poison', elementFlavor:'plagueearth', rarity:'rare',
    fusedFrom:['plaguedoctor','geomancer'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:11,def:10,spd:9,crit:11},
    statDisplay:{HP:6,ATK:8,DEF:7,SPD:5,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_ground_quake','fire_rock_strike','poison_dark_drain','poison_wind_stance'],
    burstAbility:'plague_doctor_burst',
    passives:['immunity','earth_body'],
    description:'Disease introduced into the geological substrate — sick soil that transmits infection to anything in contact with the ground, stone walls that carry plague through their mineral matrix, and an earth that has become a comprehensive transmission medium.',
    lore:'The plaguedoctor studied transmission routes. The geomancer provided one: stone. The Miasmic Earth found that disease introduced into geological material spreads through mineral contact at a rate comparable to airborne transmission and is considerably harder to detect until symptoms present, because no one looks at the floor for the source.'
  },

  plague_lightbringer: {
    id:'plague_lightbringer', name:'The Purifier', icon:'🩺',
    tagline:'The light that kills disease also kills what carries it. The distinction is the plaguedoctor\'s job.',
    color:'#c4c43c', element:'poison', elementFlavor:'holypoison', rarity:'epic',
    fusedFrom:['plaguedoctor','lightbringer'],
    stats:{hp:80,maxHp:80,mp:93,maxMp:93,atk:12,def:8,spd:12,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['infect','plague_cloud','epidemic','quarantine','poison_light_drain','poison_light_surge','normal_light_blind','normal_light_dawn'],
    burstAbility:'plague_doctor_burst',
    passives:['immunity','radiant'],
    description:'Holy light weaponized as a plague delivery system — divine radiance that carries disease to targets while purifying the carrier. The Purifier is immune to everything it transmits and delivers it through a medium the enemy associates with healing.',
    lore:'Holy light purifies. The plaguedoctor made the purification selective. The Purifier carries disease inside divine radiance, using the light as a vector that bypasses biological immune responses because the host cells recognize it as beneficial and lower defenses accordingly. The plaguedoctor considers this elegant; the ethics committee considers it something else.'
  },

  plague_beast: {
    id:'plague_beast', name:'The Infested Pack', icon:'🩺',
    tagline:'The animals carry disease. The disease made them easier to find.',
    color:'#88b33c', element:'poison', elementFlavor:'runeplague', rarity:'rare',
    fusedFrom:['plaguedoctor','beastmaster'],
    stats:{hp:85,maxHp:85,mp:83,maxMp:83,atk:12,def:8,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_poison_plague','normal_dragon_surge','poison_wind_surge','fire_bug_plague'],
    burstAbility:'plague_doctor_burst',
    passives:['immunity','feral_bond'],
    description:'Commands a pack of disease-bearing animals — each beast carries a different pathogen, coordinating attacks to expose targets to multiple simultaneous infections. The animals are immune to their own cargo. The Infested Pack is a mobile multi-pathogen deployment system.',
    lore:'The beastmaster used animals for their abilities. The plaguedoctor found another use: as immune carriers. The Infested Pack breeds animals specifically for maximum pathogen load and minimum self-harm, producing a pack that is extremely dangerous without being aware that it is dangerous, which is the ideal carrier profile.'
  },

  plague_tech: {
    id:'plague_tech', name:'The Pathogen Engine', icon:'🩺',
    tagline:'Disease production at industrial scale. This is the factory.',
    color:'#66996f', element:'poison', elementFlavor:'techpoison', rarity:'legendary',
    fusedFrom:['plaguedoctor','techsavant'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:11,def:7,spd:13,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['infect','plague_cloud','epidemic','quarantine','fire_cyber_system_melt','fire_poison_plague','poison_cosmic_blast','poison_dark_dot_strike'],
    burstAbility:'plague_doctor_burst',
    passives:['immunity','overclock'],
    description:'Biological weaponry manufactured at technical precision — engineered pathogens produced and deployed with mechanical efficiency, automated disease distribution that the plaguedoctor alone could not maintain, and technical systems that overclock plague production beyond biological generation limits.',
    lore:'The plaguedoctor engineered by hand. The techsavant scaled production. The Pathogen Engine found that technical manufacturing of biological material produces pathogens at a rate and consistency that manual preparation cannot match, and that quality control is considerably easier when the process is automated.'
  },

  plague_grave: {
    id:'plague_grave', name:'The Plague Keeper', icon:'🩺',
    tagline:'The dead carry disease longer than the living. They have more patience for it.',
    color:'#6f885e', element:'poison', elementFlavor:'plaguesoul', rarity:'epic',
    fusedFrom:['plaguedoctor','gravewarden'],
    stats:{hp:95,maxHp:95,mp:83,maxMp:83,atk:11,def:11,spd:9,crit:11},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:5,MP:8},
    abilities:['infect','plague_cloud','epidemic','quarantine','water_ghost_haunt','fire_poison_plague','water_dark_depths','poison_dark_strike'],
    burstAbility:'plague_doctor_burst',
    passives:['immunity','undying'],
    description:'Maintains plague libraries in graves — diseases preserved in deceased tissue, accessed and deployed as needed. The Plague Keeper\'s archive of preserved infections is comprehensive, and every grave in range is both a storage facility and a deployment site.',
    lore:'The gravewarden managed what was buried. The plaguedoctor catalogued what killed them. The Plague Keeper combined these professions and found that graves are the ideal long-term storage for biological agents: cool, sealed, and already categorized by cause of death. The plaguedoctor finds this system highly efficient.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_12);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_12);
  FUSION_LOADED_FILES.add(12);
  if(typeof console!=='undefined') console.debug('[Fusion] File 12 loaded (37 classes)');
})();
