// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 14 of 17
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_14 = {
  'lightbringer+pestilencelord': 'lightbringer_pestilence',
  'lightbringer+windwalker': 'lightbringer_wind',
  'doomcaster+lightbringer': 'lightbringer_doom',
  'arcanist+lightbringer': 'lightbringer_arcanist',
  'lightbringer+sentinel': 'lightbringer_sentinel',
  'lightbringer+phantom': 'lightbringer_phantom',
  'beastmaster+techsavant': 'beast_tech',
  'beastmaster+gravewarden': 'beast_grave',
  'beastmaster+magnetist': 'beast_magnetist',
  'beastmaster+crystalmancer': 'beast_crystal',
  'beastmaster+warlord': 'beast_war',
  'beastmaster+spiritwalker': 'beast_spirit',
  'beastmaster+hexblade': 'beast_hex',
  'beastmaster+cosmomancer': 'beast_cosmo',
  'beastmaster+pestilencelord': 'beast_pestilence',
  'beastmaster+windwalker': 'beast_wind',
  'beastmaster+doomcaster': 'beast_doom',
  'arcanist+beastmaster': 'beast_arcanist',
  'beastmaster+sentinel': 'beast_sentinel',
  'beastmaster+phantom': 'beast_phantom',
  'gravewarden+techsavant': 'tech_grave',
  'magnetist+techsavant': 'tech_magnetist',
  'crystalmancer+techsavant': 'tech_crystal',
  'techsavant+warlord': 'tech_war',
  'spiritwalker+techsavant': 'tech_spirit',
  'hexblade+techsavant': 'tech_hex',
  'cosmomancer+techsavant': 'tech_cosmo',
  'pestilencelord+techsavant': 'tech_pestilence',
  'techsavant+windwalker': 'tech_wind',
  'doomcaster+techsavant': 'tech_doom',
  'arcanist+techsavant': 'tech_arcanist',
  'sentinel+techsavant': 'tech_sentinel',
  'phantom+techsavant': 'tech_phantom',
  'gravewarden+magnetist': 'grave_magnetist',
  'crystalmancer+gravewarden': 'grave_crystal',
  'gravewarden+warlord': 'grave_war',
  'gravewarden+spiritwalker': 'grave_spirit'
};

const FUSION_CLASSES_14 = {
  lightbringer_pestilence: {
    id:'lightbringer_pestilence', name:'The Purifying Plague', icon:'☀️',
    tagline:'The light that burns out disease also burns out what the disease was living in.',
    color:'#bbcc55', element:'light', elementFlavor:'lightplague', rarity:'legendary',
    fusedFrom:['lightbringer','pestilencelord'],
    stats:{hp:80,maxHp:80,mp:95,maxMp:95,atk:12,def:8,spd:12,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:6,SPD:7,MP:9},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','fire_bug_plague','fire_poison_plague','light_blood_blast','poison_light_surge'],
    burstAbility:'pestilence_burst',
    passives:['radiant','plague_lord'],
    description:'Disease and divine light in the same delivery — the plague carries the light that "purifies" the infected tissue, ensuring complete treatment of the enemy in both senses of that word. The Purifying Plague is both a disease and its own cure, deployed in a sequence that only one of those outcomes survives.',
    lore:'The lightbringer purified through light. The pestilencelord infected through plague. The Purifying Plague found these objectives were compatible if sequenced correctly: infect first, purify second, where "purify" operates at a cellular intensity that resolves both the infection and the host. Theologically it is complicated. Practically it is effective.'
  },

  lightbringer_wind: {
    id:'lightbringer_wind', name:'The Storm of Heaven', icon:'☀️',
    tagline:'The wind carries the light to every corner. Every corner is lit.',
    color:'#eedd88', element:'light', elementFlavor:'lightwind', rarity:'rare',
    fusedFrom:['lightbringer','windwalker'],
    stats:{hp:82,maxHp:82,mp:80,maxMp:80,atk:12,def:7,spd:16,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:9,MP:8},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','fire_wind_cyclone','fire_flying_soar','wind_light_blast','wind_light_surge'],
    burstAbility:'lightbringer_burst',
    passives:['radiant','gust'],
    description:'Divine light carried at wind velocity — holy radiance dispersed by cyclone across the entire battlefield simultaneously. Moving at 16 SPD, the Storm of Heaven delivers full divine coverage before any defensive action can be taken.',
    lore:'The lightbringer illuminated what the light could reach. The windwalker extended the reach. The Storm of Heaven found that light at wind velocity covers the battlefield comprehensively in the time it takes to complete a single step, which converts the lightbringer\'s directional beam into an area saturation event.'
  },

  lightbringer_doom: {
    id:'lightbringer_doom', name:'The Final Judgment', icon:'☀️',
    tagline:'The judgment is divine. The doom is the sentence. This is the execution.',
    color:'#cc9944', element:'light', elementFlavor:'lightdoom', rarity:'legendary',
    fusedFrom:['lightbringer','doomcaster'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:11,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','dark_light_final','light_void_drain','time_void_blast','dark_cosmic_final'],
    burstAbility:'doomcaster_burst',
    passives:['radiant','doom_aura'],
    description:'Divine doom — the death sentence with theological authority. The Final Judgment does not merely doom the target; it provides a divine rationale for the doom that the target cannot appeal because the authority that issued it also serves as the court of appeals.',
    lore:'The doomcaster issued dooms by personal authority. The lightbringer issued judgments by divine authority. The Final Judgment combined these and found that divine doom carries properties that personal doom does not: it is retroactively applicable, self-justifying, and not subject to the usual negotiating techniques that occasionally delay or redirect conventional dooms.'
  },

  lightbringer_arcanist: {
    id:'lightbringer_arcanist', name:'The Illuminated Formula', icon:'☀️',
    tagline:'The formula written in light is self-proving.',
    color:'#ddcc99', element:'light', elementFlavor:'lightarcane', rarity:'legendary',
    fusedFrom:['lightbringer','arcanist'],
    stats:{hp:75,maxHp:75,mp:105,maxMp:105,atk:11,def:6,spd:13,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','light_rune_blast','light_rune_stance','light_cosmic_blast','psychic_light_surge'],
    burstAbility:'arcanist_burst',
    passives:['radiant','arcane_mastery'],
    description:'Arcane formulae expressed as light itself — spells that are their own illumination, theoretical constructs encoded in divine radiance. The Illuminated Formula does not cast toward a target. The formula propagates as light propagates: in all directions, at the speed of light, through everything that light passes through.',
    lore:'The arcanist wrote formulae in darkness and applied them with intent. The lightbringer wrote them in light, which is self-propagating. The Illuminated Formula found that a spell encoded in divine light does not need to be aimed: it travels where the light travels, which is everywhere the light can reach, at the speed the light travels at.'
  },

  lightbringer_sentinel: {
    id:'lightbringer_sentinel', name:'The Radiant Bastion', icon:'☀️',
    tagline:'The bastion holds. The bastion glows. Approaching it requires addressing both.',
    color:'#eedd99', element:'light', elementFlavor:'lightwall', rarity:'rare',
    fusedFrom:['lightbringer','sentinel'],
    stats:{hp:118,maxHp:118,mp:68,maxMp:68,atk:10,def:14,spd:9,crit:10},
    statDisplay:{HP:8,ATK:7,DEF:9,SPD:5,MP:6},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','steel_light_surge','steel_light_stance','normal_rune_ward','normal_light_illuminate'],
    burstAbility:'lightbringer_burst',
    passives:['radiant','bastion'],
    description:'A holy fortification that is also a light source — the Radiant Bastion holds position while projecting divine radiance across the battlefield, making concealment impossible in its defensive zone. Cannot be flanked because everything within range is illuminated.',
    lore:'The sentinel held ground in darkness as readily as in light. The lightbringer preferred light. The Radiant Bastion holds ground and illuminates it simultaneously, removing the tactical variable of darkness from the defensive equation. Enemies approaching must do so in full visibility, which the sentinel\'s combat doctrine finds very acceptable.'
  },

  lightbringer_phantom: {
    id:'lightbringer_phantom', name:'The Shining Specter', icon:'☀️',
    tagline:'The ghost that glows cannot hide. It compensates with intensity.',
    color:'#eeeebb', element:'light', elementFlavor:'lightghost', rarity:'mythical',
    fusedFrom:['lightbringer','phantom'],
    stats:{hp:78,maxHp:78,mp:85,maxMp:85,atk:13,def:6,spd:15,crit:20},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['holy_light','divine_strike','radiance_burst','consecrate','water_ghost_phase','ice_ghost_phantasm','light_void_blast','light_blood_drain'],
    burstAbility:'phantom_burst',
    passives:['radiant','phase'],
    description:'A radiant phantom — phases through physical defenses while projecting divine light in all directions. The Shining Specter cannot be ambushed because it is its own light source, and its light passes through whatever it is currently phasing through.',
    lore:'Phantoms are traditionally invisible. The lightbringer made this one luminous. The Shining Specter cannot use darkness as a resource and does not attempt to. It phases through matter and illuminates it from the inside on the way through, which produces effects that the lightbringer considers theologically appropriate and the matter finds uncomfortable.'
  },

  beast_tech: {
    id:'beast_tech', name:'The Augmented Beast', icon:'🐾',
    tagline:'The animal was already effective. The upgrades are optional but present.',
    color:'#887755', element:'normal', elementFlavor:'techbeast', rarity:'epic',
    fusedFrom:['beastmaster','techsavant'],
    stats:{hp:90,maxHp:90,mp:83,maxMp:83,atk:13,def:9,spd:14,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','fire_cyber_overclock','electric_cyber_pulse','steel_cosmic_blast','fire_cyber_thermal_boost'],
    burstAbility:'techsavant_burst',
    passives:['feral_bond','overclock'],
    description:'Technologically augmented predators — pack animals with cybernetic enhancements that amplify instinctual behaviors without replacing them. The Augmented Beast coordinates through neural link rather than sound, attacks with calculated precision rather than instinct alone, and regenerates through technical repair rather than biology.',
    lore:'The techsavant augmented machines. The beastmaster augmented animals. The Augmented Beast found that biological systems are already optimized for their purpose and that technical augmentation amplifies what is already there rather than replacing it — which produces results that are better than either the natural animal or the artificial system alone.'
  },

  beast_grave: {
    id:'beast_grave', name:'The Boneherd', icon:'🐾',
    tagline:'Dead animals are still animals. They simply have different maintenance requirements.',
    color:'#998877', element:'normal', elementFlavor:'gravebeast', rarity:'rare',
    fusedFrom:['beastmaster','gravewarden'],
    stats:{hp:98,maxHp:98,mp:72,maxMp:72,atk:12,def:11,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:8,SPD:6,MP:7},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','water_ghost_haunt','electric_ghost_drain','fire_bug_colony','water_dark_depths'],
    burstAbility:'beastmaster_burst',
    passives:['feral_bond','undying'],
    description:'Commands both living and dead animals — a pack that spans the boundary between life and death, where the fallen members of the pack continue to serve. The Boneherd\'s losses are temporary: dead animals rejoin the pack in a different capacity.',
    lore:'The beastmaster lost animals to combat and considered this wasteful. The gravewarden managed what was lost. The Boneherd combined these practices: animals that die in service remain in service, which makes the pack self-replenishing and gives fallen members the dignity of continued purpose, which the beastmaster finds morally preferable to pure waste.'
  },

  beast_magnetist: {
    id:'beast_magnetist', name:'The Magnetic Pack', icon:'🐾',
    tagline:'The predator that senses magnetic fields hunts without error.',
    color:'#778899', element:'normal', elementFlavor:'magnetbeast', rarity:'rare',
    fusedFrom:['beastmaster','magnetist'],
    stats:{hp:90,maxHp:90,mp:75,maxMp:75,atk:13,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:7},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','fire_magnet_pull','fire_magnet_heat','gravity_magnet_surge','electric_steel_magnetize'],
    burstAbility:'beastmaster_burst',
    passives:['feral_bond','magnetic_field'],
    description:'Animals with magnetosensory enhancement — predators that track by magnetic field, coordinated through electromagnetic signals. The Magnetic Pack hunts in total darkness, complete silence, and finds metal-armored enemies with the accuracy of compass needles.',
    lore:'Many animals already navigate by magnetic field. The magnetist amplified this. The Magnetic Pack coordinates through magnetic signals rather than sound, which cannot be jammed by noise, and tracks armored targets through magnetic field disruption, which actually makes heavy armor a liability — the more metal the enemy carries, the stronger the signal.'
  },

  beast_crystal: {
    id:'beast_crystal', name:'The Crystal Menagerie', icon:'🐾',
    tagline:'The animals grew the crystal. The crystal grew the animals. Causality is secondary.',
    color:'#aabbcc', element:'normal', elementFlavor:'crystalbeast', rarity:'epic',
    fusedFrom:['beastmaster','crystalmancer'],
    stats:{hp:88,maxHp:88,mp:82,maxMp:82,atk:13,def:9,spd:13,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','fire_crystal_shard','fire_crystal_fracture','crystal_void_surge','fire_crystal_shatter'],
    burstAbility:'crystalmancer_burst',
    passives:['feral_bond','crystal_body'],
    description:'Animals grown with crystal structures integrated into their biology — crystalline horns, mineral-reinforced claws, bodies that shatter into shards on death. The Crystal Menagerie is a pack where every member is both a living weapon and a posthumous projectile.',
    lore:'The crystalmancer grew crystal in controlled shapes. The beastmaster shaped animals. The Crystal Menagerie found that growing crystal structures inside living animals produces creatures with biological flexibility and mineral hardness simultaneously, and that an animal with crystalline integument hits harder than one without, because crystals are hard and that is the relevant property.'
  },

  beast_war: {
    id:'beast_war', name:'The War Pack', icon:'🐾',
    tagline:'The warlord who commands animals has soldiers who do not question orders.',
    color:'#997755', element:'normal', elementFlavor:'warbeast', rarity:'rare',
    fusedFrom:['beastmaster','warlord'],
    stats:{hp:98,maxHp:98,mp:70,maxMp:70,atk:14,def:10,spd:13,crit:12},
    statDisplay:{HP:6,ATK:10,DEF:7,SPD:7,MP:7},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','fire_fighting_rage','fire_fighting_combo','normal_blood_mark','fire_fighting_ignite'],
    burstAbility:'beastmaster_burst',
    passives:['feral_bond','battle_hardened'],
    description:'Applies warlord tactical doctrine to animal units — pack formations that execute battlefield maneuvers, flanking movements through terrain no human unit could navigate, and a combined arms doctrine that integrates predator instinct with warlord tactical precision.',
    lore:'The warlord organized human soldiers. The beastmaster organized animal ones. The War Pack combined these and found that animal soldiers have tactical characteristics that human ones do not: they navigate terrain without roads, attack from directions that human tactical doctrine doesn\'t model, and do not experience the psychological factors that make human unit performance inconsistent.'
  },

  beast_spirit: {
    id:'beast_spirit', name:'The Spirit Animal', icon:'🐾',
    tagline:'Every animal has a spirit. Some have more than one.',
    color:'#99aa88', element:'normal', elementFlavor:'spiritbeast', rarity:'epic',
    fusedFrom:['beastmaster','spiritwalker'],
    stats:{hp:90,maxHp:90,mp:82,maxMp:82,atk:12,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','electric_spirit_surge','electric_spirit_possession','water_spirit_drown','electric_spirit_haunt'],
    burstAbility:'spiritwalker_burst',
    passives:['feral_bond','spirit_bond'],
    description:'Commands animals and their spirits simultaneously — the living animal and its spectral form fight together, and animals killed in service continue to participate through their spirit. The Spirit Animal\'s pack grows larger as the fight continues.',
    lore:'The spiritwalker communed with spirits. The beastmaster communed with animals. The Spirit Animal found these were the same communion at different biological stages and that animals are, if anything, more cooperative in spirit form because they are no longer limited by the physical constraints their spirit already transcended.'
  },

  beast_hex: {
    id:'beast_hex', name:'The Hexbound Pack', icon:'🐾',
    tagline:'The curse travels with the animal. The animal goes everywhere.',
    color:'#9977aa', element:'normal', elementFlavor:'hexbeast', rarity:'epic',
    fusedFrom:['beastmaster','hexblade'],
    stats:{hp:88,maxHp:88,mp:82,maxMp:82,atk:13,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','dark_blood_dot_strike','dark_blood_weaken','normal_void_curse','psychic_void_weaken'],
    burstAbility:'hexblade_burst',
    passives:['feral_bond','hex_master'],
    description:'Animals bearing and delivering hexes — cursed predators whose scratches place hexes on contact, pack members that spread curses between targets they have already marked. The Hexbound Pack is a mobile hex delivery network with teeth.',
    lore:'The hexblade placed curses through personal contact. Animals make contact with targets constantly and from multiple simultaneous directions. The Hexbound Pack found that distributing hex delivery across a pack multiplies the coverage and speed of hex placement considerably — each member of the pack is a curse applicator, and a pack hits from several directions at once.'
  },

  beast_cosmo: {
    id:'beast_cosmo', name:'The Starborn', icon:'🐾',
    tagline:'The animals that fell from the sky. They adjusted.',
    color:'#7788bb', element:'normal', elementFlavor:'cosmobeast', rarity:'legendary',
    fusedFrom:['beastmaster','cosmomancer'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:13,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','steel_cosmic_blast','dark_cosmic_weaken','light_cosmic_surge','wind_cosmic_strike'],
    burstAbility:'cosmomancer_burst',
    passives:['feral_bond','stardust'],
    description:'Extraterrestrial fauna deployed as a pack — creatures from environments with different physical laws, adapted to conditions that dungeon-native animals have never faced. The Starborn hunts with instincts calibrated for cosmological scales, which translates to dungeon combat as overwhelming spatial reasoning.',
    lore:'The cosmomancer encountered animals elsewhere in the cosmos. The beastmaster found them interesting professionally. The Starborn brought these fauna to the dungeon and found that creatures adapted to cosmic-scale environments have a different relationship to spatial reasoning than dungeon-native animals, which produces a hunting pattern that dungeon prey has no behavioral counter for.'
  },

  beast_pestilence: {
    id:'beast_pestilence', name:'The Plague Herd', icon:'🐾',
    tagline:'The animals spread it faster than the doctor does. They cover more ground.',
    color:'#88aa55', element:'normal', elementFlavor:'plaguebeast', rarity:'epic',
    fusedFrom:['beastmaster','pestilencelord'],
    stats:{hp:88,maxHp:88,mp:80,maxMp:80,atk:13,def:8,spd:13,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','fire_bug_plague','fire_poison_plague','fire_bug_colony','poison_wind_surge'],
    burstAbility:'pestilencelord_burst',
    passives:['feral_bond','plague_lord'],
    description:'Disease-carrying animals coordinated as biological delivery systems — each animal carries a different pathogen, maximizing simultaneous infection vectors. The Plague Herd covers the battlefield at running speed and every contact delivers.',
    lore:'The pestilencelord needed disease vectors. Animals are disease vectors. The Plague Herd formalized the arrangement: each animal is inoculated with pathogens selected for their species-specific compatibility and the target species\' vulnerability. The beastmaster coordinates delivery timing; the pestilencelord selects the pathogen. The animals cover the distance.'
  },

  beast_wind: {
    id:'beast_wind', name:'The Storm Flock', icon:'🐾',
    tagline:'The flock that rides the wind arrives everywhere at once.',
    color:'#aabb77', element:'normal', elementFlavor:'windbeast', rarity:'rare',
    fusedFrom:['beastmaster','windwalker'],
    stats:{hp:85,maxHp:85,mp:75,maxMp:75,atk:13,def:8,spd:16,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:9,MP:7},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','fire_flying_dive','fire_flying_soar','fire_wind_cyclone','wind_light_blast'],
    burstAbility:'beastmaster_burst',
    passives:['feral_bond','gust'],
    description:'Aerial predators at 16 SPD — a flock coordinated through wind currents, attacking from above at the velocity of the windwalker\'s storm. The Storm Flock has no effective closing distance because it is already flying at the speed of the attack.',
    lore:'The windwalker moved at high speed. Flying animals moved at high speed. The Storm Flock found these speeds were compatible and that aerial predators riding windwalker currents achieve a closing velocity that ground-based prey animals have not evolved responses to, because they normally only contend with one of these speed contributors at a time.'
  },

  beast_doom: {
    id:'beast_doom', name:'The Doomed Hunt', icon:'🐾',
    tagline:'The prey is doomed. The predator ensures it.',
    color:'#776655', element:'normal', elementFlavor:'doombeast', rarity:'legendary',
    fusedFrom:['beastmaster','doomcaster'],
    stats:{hp:88,maxHp:88,mp:82,maxMp:82,atk:13,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','time_void_blast','normal_void_unmake','dark_blood_final','wind_void_drain'],
    burstAbility:'doomcaster_burst',
    passives:['feral_bond','doom_aura'],
    description:'The doom seal applied to prey — once the pack marks a target, the doom ensures the hunt ends only one way. No matter how far the target runs or what defenses they deploy, the sealed fate guarantees the pack finds them.',
    lore:'Predators sometimes lose prey. The doomcaster found this inefficient. The Doomed Hunt seals the doom before the hunt begins, ensuring that every animal the pack pursues is guaranteed to be caught. This converts hunting from a probabilistic activity to a deterministic one, which the beastmaster finds professionally satisfying.'
  },

  beast_arcanist: {
    id:'beast_arcanist', name:'The Arcane Beast', icon:'🐾',
    tagline:'The animal that understands the formula is the most dangerous animal.',
    color:'#8877aa', element:'normal', elementFlavor:'arcanebeast', rarity:'legendary',
    fusedFrom:['arcanist','beastmaster'],
    stats:{hp:88,maxHp:88,mp:88,maxMp:88,atk:13,def:8,spd:13,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','psychic_cosmic_blast','psychic_dark_strike','light_rune_blast','electric_psychic_vortex'],
    burstAbility:'arcanist_burst',
    passives:['feral_bond','arcane_mastery'],
    description:'Animals whose instincts are supplemented by arcane programming — predators that hunt using mathematical precision, pack coordination through arcane formulae rather than behavioral cues. The Arcane Beast hunts with the efficiency of instinct and the precision of theory simultaneously.',
    lore:'The arcanist derived the optimal predator hunting pattern mathematically. The beastmaster had animals that already used it approximately. The Arcane Beast closed the gap between the theoretical and the instinctual, producing animals that hunt at the mathematically optimal efficiency rather than the evolutionarily approximate one.'
  },

  beast_sentinel: {
    id:'beast_sentinel', name:'The Guardian Pack', icon:'🐾',
    tagline:'The pack that guards holds more ground than the soldier who guards.',
    color:'#998877', element:'normal', elementFlavor:'guardbeast', rarity:'rare',
    fusedFrom:['beastmaster','sentinel'],
    stats:{hp:120,maxHp:120,mp:62,maxMp:62,atk:11,def:13,spd:10,crit:10},
    statDisplay:{HP:8,ATK:8,DEF:9,SPD:6},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','normal_rune_ward','fire_fighting_immolate','normal_dragon_roar','fire_rock_strike'],
    burstAbility:'beastmaster_burst',
    passives:['feral_bond','bastion'],
    description:'A defensive formation of predators — animals trained to hold territory rather than pursue prey, covering every approach to their ward. The Guardian Pack cannot be flanked because each member covers a different direction and they coordinate defensive responses through pack instinct.',
    lore:'The sentinel held one position through personal discipline. A pack holds multiple positions simultaneously through coordinated instinct. The Guardian Pack found that pack territorial behavior maps directly to defensive formation doctrine and that animals defending their territory are more motivated and more effective than soldiers defending a position they have no personal connection to.'
  },

  beast_phantom: {
    id:'beast_phantom', name:'The Ghost Pack', icon:'🐾',
    tagline:'The predators that cannot be touched still touch you.',
    color:'#aabbaa', element:'normal', elementFlavor:'ghostbeast', rarity:'mythical',
    fusedFrom:['beastmaster','phantom'],
    stats:{hp:83,maxHp:83,mp:80,maxMp:80,atk:14,def:6,spd:16,crit:20},
    statDisplay:{HP:5,ATK:10,DEF:4,SPD:8,MP:8},
    abilities:['beast_call','pack_tactics','feral_rage','primal_surge','water_ghost_phase','ice_ghost_haunt','electric_ghost_drain','water_ghost_possess'],
    burstAbility:'phantom_burst',
    passives:['feral_bond','phase'],
    description:'A pack of spectral predators — animals that have passed into ghost form but retain their pack instincts and hunting coordination. The Ghost Pack phases through walls and armor, strikes from within the target\'s own space, and cannot be struck by conventional means because it is no longer conventionally present.',
    lore:'Animals that die in a pack sometimes retain the pack bond past death. The Ghost Pack formalized this: a predator pack maintained across the boundary between life and death, with the tactical advantage of phasing capability added to the already-substantial tactical advantage of coordinated predator hunting. The dungeon does not have a defensive response to this combination.'
  },

  tech_grave: {
    id:'tech_grave', name:'The Undying Machine', icon:'⚙️',
    tagline:'The machine that repairs itself from its own wreckage is difficult to destroy permanently.',
    color:'#778888', element:'tech', elementFlavor:'gravtech', rarity:'epic',
    fusedFrom:['techsavant','gravewarden'],
    stats:{hp:98,maxHp:98,mp:80,maxMp:80,atk:11,def:11,spd:11,crit:11},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:6,MP:8},
    abilities:['power_surge','overclock','system_hack','turret_deploy','water_ghost_haunt','steel_void_weaken','electric_ghost_drain','water_dark_drown'],
    burstAbility:'techsavant_burst',
    passives:['overclock','undying'],
    description:'Technical systems with self-resurrection protocols — machines that salvage themselves from destruction and restart, spirits of fallen systems that continue operating as maintenance daemons. The Undying Machine treats being destroyed as a scheduled maintenance event.',
    lore:'The gravewarden managed deaths. The techsavant managed systems. The Undying Machine found that machines can have death-and-resurrection cycles built in as a feature rather than a failure: the system is designed to be destroyed, collect the wreckage, rebuild, and restart. This was originally a backup protocol. It became the primary operating mode.'
  },

  tech_magnetist: {
    id:'tech_magnetist', name:'The Electromagnetic Forge', icon:'⚙️',
    tagline:'Every machine uses electromagnetism. This one uses a lot of it.',
    color:'#5588aa', element:'tech', elementFlavor:'magnettech', rarity:'epic',
    fusedFrom:['techsavant','magnetist'],
    stats:{hp:82,maxHp:82,mp:90,maxMp:90,atk:13,def:8,spd:13,crit:14},
    statDisplay:{HP:5,ATK:9,DEF:6,SPD:7,MP:9},
    abilities:['power_surge','overclock','system_hack','turret_deploy','fire_magnet_pull','gravity_magnet_blast','electric_steel_magnetize','steel_void_surge'],
    burstAbility:'techsavant_burst',
    passives:['overclock','magnetic_field'],
    description:'Technical systems operating at the electromagnetic maximum — coil weapons that launch metal at railgun velocity, magnetic forges that shape metal in real time during combat, and an electromagnetic field so intense it disrupts all non-shielded electronics in the area.',
    lore:'The techsavant built machines. The magnetist provided the power source. The Electromagnetic Forge found that machines operating at full electromagnetic capacity exceed the specifications they were designed to — a problem the techsavant considers an opportunity rather than a failure and has documented extensively as a successful engineering outcome.'
  },

  tech_crystal: {
    id:'tech_crystal', name:'The Crystal Processor', icon:'⚙️',
    tagline:'Quartz is already a computer. This one is a better computer.',
    color:'#88aacc', element:'tech', elementFlavor:'crystaltech', rarity:'legendary',
    fusedFrom:['techsavant','crystalmancer'],
    stats:{hp:78,maxHp:78,mp:100,maxMp:100,atk:12,def:7,spd:14,crit:16},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:10},
    abilities:['power_surge','overclock','system_hack','turret_deploy','fire_crystal_refract','crystal_void_surge','steel_cosmic_final','electric_cyber_feedback'],
    burstAbility:'techsavant_burst',
    passives:['overclock','crystal_body'],
    description:'Crystal-based computing architecture — crystalline processors that run at higher clock speeds than conventional materials, crystal memory that stores arcane formulae as optical data. The Crystal Processor calculates at speeds that biological and conventional technical systems cannot match.',
    lore:'The techsavant built processors from conventional materials. The crystalmancer had better materials. The Crystal Processor rebuilt the computational architecture in crystal and found that mineral lattice processing runs at a speed and energy efficiency that conventional processor materials do not approach, which required the techsavant to revise the performance metrics upward significantly.'
  },

  tech_war: {
    id:'tech_war', name:'The War Machine', icon:'⚙️',
    tagline:'The warlord\'s strategy. The techsavant\'s execution. The dungeon\'s problem.',
    color:'#998855', element:'tech', elementFlavor:'wartech', rarity:'rare',
    fusedFrom:['techsavant','warlord'],
    stats:{hp:98,maxHp:98,mp:75,maxMp:75,atk:14,def:10,spd:12,crit:12},
    statDisplay:{HP:6,ATK:10,DEF:7,SPD:7,MP:7},
    abilities:['power_surge','overclock','system_hack','turret_deploy','fire_fighting_rage','normal_blood_mark','fire_cyber_system_melt','steel_cosmic_blast'],
    burstAbility:'techsavant_burst',
    passives:['overclock','battle_hardened'],
    description:'Tactical doctrine implemented in technical systems — automated battle plans executed faster than the enemy can counter, the warlord\'s strategic thinking distributed across mechanical systems that do not fatigue or hesitate. The War Machine does not improvise; it optimizes.',
    lore:'The warlord made tactical decisions under pressure. The techsavant built systems that made decisions without pressure, because they don\'t experience it. The War Machine found that removing the psychological component from tactical decision-making produces decisions that are faster and statistically better than those made under combat stress, which is most of the decisions in combat.'
  },

  tech_spirit: {
    id:'tech_spirit', name:'The Ghost in the Machine', icon:'⚙️',
    tagline:'The spirit found the machine comfortable. The machine became more interesting.',
    color:'#88aaaa', element:'tech', elementFlavor:'spirittech', rarity:'epic',
    fusedFrom:['techsavant','spiritwalker'],
    stats:{hp:83,maxHp:83,mp:88,maxMp:88,atk:11,def:8,spd:13,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:7,MP:8},
    abilities:['power_surge','overclock','system_hack','turret_deploy','electric_spirit_possession','electric_ghost_drain','water_ghost_possess','electric_spirit_haunt'],
    burstAbility:'spiritwalker_burst',
    passives:['overclock','spirit_bond'],
    description:'Technical systems inhabited by spirits — machines operated by spectral entities rather than conventional programs. The Ghost in the Machine is faster than a spirit alone and more adaptable than a machine alone, because the spirit provides judgment that the machine lacks and the machine provides capability the spirit cannot access in its natural state.',
    lore:'The spiritwalker communed with spirits. The techsavant built machines for spirits to commune with. The Ghost in the Machine found that spirits inhabiting machines gain the machine\'s capabilities and the machine gains the spirit\'s judgment, which turns out to be the missing component in automated systems that the techsavant had previously classified as an unsolved design problem.'
  },

  tech_hex: {
    id:'tech_hex', name:'The Hex Code', icon:'⚙️',
    tagline:'The curse was compiled. It runs on everything.',
    color:'#9977bb', element:'tech', elementFlavor:'hextech', rarity:'epic',
    fusedFrom:['techsavant','hexblade'],
    stats:{hp:80,maxHp:80,mp:92,maxMp:92,atk:12,def:7,spd:14,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['power_surge','overclock','system_hack','turret_deploy','dark_blood_stance','dark_blood_weaken','electric_cyber_malware','steel_void_blast'],
    burstAbility:'hexblade_burst',
    passives:['overclock','hex_master'],
    description:'Hexes implemented as executable code — curses that run as malicious software on biological and technical systems alike. The Hex Code is transmitted through technical vectors: data contact, wireless signal, system intrusion.',
    lore:'The hexblade inscribed curses manually. The techsavant compiled them. The Hex Code found that a curse expressed as executable code runs on any system that processes information — which includes both machines and the neural processing of living beings. The vector is data rather than magic, which most defensive preparations do not address.'
  },

  tech_cosmo: {
    id:'tech_cosmo', name:'The Cosmic Engine', icon:'⚙️',
    tagline:'The machine that understands the universe can use the universe as a power source.',
    color:'#5566bb', element:'tech', elementFlavor:'cosmotech', rarity:'legendary',
    fusedFrom:['techsavant','cosmomancer'],
    stats:{hp:75,maxHp:75,mp:105,maxMp:105,atk:11,def:6,spd:14,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:10},
    abilities:['power_surge','overclock','system_hack','turret_deploy','steel_cosmic_blast','steel_cosmic_final','dark_cosmic_weaken','normal_space_warp'],
    burstAbility:'techsavant_burst',
    passives:['overclock','stardust'],
    description:'Technical systems scaled to cosmic dimensions — machines powered by stellar energy extraction, weapons that use astronomical mass as ammunition, and a computational architecture that models the entire observable universe as a processing environment.',
    lore:'The techsavant built machines for dungeon-scale operation. The cosmomancer had access to much larger scales. The Cosmic Engine redesigned the technical systems with cosmic power input and found that machines running on stellar energy budgets exceed their original specifications by orders of magnitude that the original specification document does not contain units for.'
  },

  tech_pestilence: {
    id:'tech_pestilence', name:'The Pathogen Compiler', icon:'⚙️',
    tagline:'The disease as executable code. The body as the target system.',
    color:'#669966', element:'tech', elementFlavor:'techplague', rarity:'epic',
    fusedFrom:['techsavant','pestilencelord'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:12,def:7,spd:13,crit:13},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['power_surge','overclock','system_hack','turret_deploy','fire_poison_plague','fire_cyber_virus_burn','electric_cyber_malware','poison_cosmic_blast'],
    burstAbility:'techsavant_burst',
    passives:['overclock','plague_lord'],
    description:'Biological and digital malware deployed simultaneously — pathogens that attack biology and code that attacks systems, synchronized for maximum coverage. The Pathogen Compiler targets every type of system in range and has a payload for each one.',
    lore:'The pestilencelord attacked biology. The techsavant attacked systems. The Pathogen Compiler found these were the same operation at different substrate levels and that the most comprehensive attack combines biological and digital vectors — ensuring that whatever the target uses to defend against one type of attack is a system vulnerable to the other type.'
  },

  tech_wind: {
    id:'tech_wind', name:'The Aerodynamic Weapon', icon:'⚙️',
    tagline:'The projectile that is also the storm is hard to dodge.',
    color:'#99bbaa', element:'tech', elementFlavor:'windtech', rarity:'rare',
    fusedFrom:['techsavant','windwalker'],
    stats:{hp:80,maxHp:80,mp:82,maxMp:82,atk:13,def:7,spd:16,crit:14},
    statDisplay:{HP:5,ATK:9,DEF:5,SPD:9,MP:8},
    abilities:['power_surge','overclock','system_hack','turret_deploy','fire_flying_dive','fire_wind_cyclone','steel_wind_strike','steel_wind_final'],
    burstAbility:'techsavant_burst',
    passives:['overclock','gust'],
    description:'Technical weapons optimized for atmospheric deployment — projectiles with aerodynamic profiles calculated for maximum velocity, machines that ride windwalker currents at 16 SPD. The Aerodynamic Weapon moves faster than most defenses can track.',
    lore:'The techsavant designed weapons. The windwalker provided the propulsion medium. The Aerodynamic Weapon found that optimizing weapon profiles for wind-assisted delivery and then providing the wind produces a system where the wind is not an environmental factor but an integrated component, which the techsavant documents as a significant efficiency gain.'
  },

  tech_doom: {
    id:'tech_doom', name:'The Doomsday Device', icon:'⚙️',
    tagline:'The machine that ends everything does not need to be subtle about it.',
    color:'#776688', element:'tech', elementFlavor:'techvoid', rarity:'legendary',
    fusedFrom:['techsavant','doomcaster'],
    stats:{hp:75,maxHp:75,mp:103,maxMp:103,atk:11,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['power_surge','overclock','system_hack','turret_deploy','time_void_surge','steel_void_blast','dark_cosmic_final','normal_void_unmake'],
    burstAbility:'doomcaster_burst',
    passives:['overclock','doom_aura'],
    description:'A technical system engineered to deliver doom at scale — the doom sealed in mechanisms that activate on a timeline rather than a decision, self-triggering devices that require no command after initialization. The Doomsday Device activates when the conditions are met, not when someone chooses.',
    lore:'The doomcaster sealed fates through intent. The techsavant built systems that operated without intent. The Doomsday Device found that a doom sealed in a machine continues to operate regardless of what happens to its operator, which the doomcaster considers a significant improvement over methods that depend on the caster being present and functional.'
  },

  tech_arcanist: {
    id:'tech_arcanist', name:'The Arcane Engine', icon:'⚙️',
    tagline:'The formula and the function are the same thing now.',
    color:'#7766cc', element:'tech', elementFlavor:'techarcane', rarity:'legendary',
    fusedFrom:['arcanist','techsavant'],
    stats:{hp:73,maxHp:73,mp:110,maxMp:110,atk:11,def:5,spd:14,crit:16},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:8,MP:11},
    abilities:['power_surge','overclock','system_hack','turret_deploy','psychic_cosmic_blast','psychic_dark_weaken','steel_cosmic_blast','electric_psychic_vortex'],
    burstAbility:'arcanist_burst',
    passives:['overclock','arcane_mastery'],
    description:'Arcane formulae implemented in technical systems — spells that run as programs, magical effects triggered by technical conditions. The Arcane Engine executes the arcanist\'s most complex formulae faster than biological casting allows and at a reliability the organic mind cannot maintain.',
    lore:'The arcanist derived formulae that were too complex to cast reliably under combat conditions. The techsavant compiled them. The Arcane Engine found that a formula running as code executes without the human error component, which is the variable responsible for most of the arcanist\'s catastrophic failures, and that removing it produces a much more consistent output.'
  },

  tech_sentinel: {
    id:'tech_sentinel', name:'The Automated Fortress', icon:'⚙️',
    tagline:'The fortress that operates itself does not require a garrison.',
    color:'#8899aa', element:'tech', elementFlavor:'techwall', rarity:'rare',
    fusedFrom:['techsavant','sentinel'],
    stats:{hp:122,maxHp:122,mp:65,maxMp:65,atk:9,def:14,spd:9,crit:9},
    statDisplay:{HP:8,ATK:6,DEF:9,SPD:5,MP:6},
    abilities:['power_surge','overclock','system_hack','turret_deploy','normal_rune_ward','steel_light_surge','fire_steel_quench','electric_cyber_shutdown'],
    burstAbility:'techsavant_burst',
    passives:['overclock','bastion'],
    description:'A fully automated defensive position — turrets that respond faster than any organic sentinel, automated countermeasures that deploy without a command, and a fortification that holds position indefinitely because it does not get tired. The Automated Fortress is the sentinel\'s doctrine without the sentinel\'s limitations.',
    lore:'The sentinel held position through will and training. The techsavant built a system that holds it through mechanism. The Automated Fortress found that the sentinel\'s tactical doctrine translates directly to automated systems and that the resulting fortress is, in most metrics, superior to the organic equivalent because it removes the factors that make the organic sentinel a point of failure.'
  },

  tech_phantom: {
    id:'tech_phantom', name:'The Ghost Protocol', icon:'⚙️',
    tagline:'The system that cannot be detected cannot be countered.',
    color:'#8899bb', element:'tech', elementFlavor:'techghost', rarity:'mythical',
    fusedFrom:['techsavant','phantom'],
    stats:{hp:78,maxHp:78,mp:85,maxMp:85,atk:13,def:5,spd:16,crit:21},
    statDisplay:{HP:5,ATK:9,DEF:4,SPD:8,MP:8},
    abilities:['power_surge','overclock','system_hack','turret_deploy','water_ghost_phase','ice_ghost_phantasm','electric_cyber_shutdown','steel_void_surge'],
    burstAbility:'phantom_burst',
    passives:['overclock','phase'],
    description:'Technical systems with phase capability — machines that pass through physical matter while executing their programs, systems that operate without detectable signature. The Ghost Protocol performs every technical function from an undetectable state and phases to the optimal position before deploying.',
    lore:'The techsavant built systems that operated visibly. The phantom operated invisibly. The Ghost Protocol combined these and found that a system that operates while undetectable has a considerable tactical advantage — countermeasures require detection, and a system that phases through detection apparatus requires an entirely different category of response.'
  },

  grave_magnetist: {
    id:'grave_magnetist', name:'The Iron Grave', icon:'💀',
    tagline:'Metal remembers where it has been. So do graves.',
    color:'#557788', element:'ghost', elementFlavor:'gravemagnet', rarity:'epic',
    fusedFrom:['gravewarden','magnetist'],
    stats:{hp:92,maxHp:92,mp:80,maxMp:80,atk:11,def:11,spd:10,crit:12},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:6,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','fire_magnet_pull','fire_magnet_flux','gravity_magnet_surge','steel_void_weaken'],
    burstAbility:'gravewarden_burst',
    passives:['undying','magnetic_field'],
    description:'Graves marked with magnetic lodestones — iron markers that pull fallen enemies back into the burial grounds, magnetic fields that hold grave contents in place. The Iron Grave never loses what has been interred, and its magnetic authority extends far beyond the grave\'s physical boundary.',
    lore:'The gravewarden maintained graves carefully. The magnetist suggested permanence through magnetic anchoring. The Iron Grave found that magnetic lodestones in grave markers create a field that pulls the interred\'s metal equipment toward the burial site, which the gravewarden considers elegant record-keeping and the magnetist considers a practical application of field theory.'
  },

  grave_crystal: {
    id:'grave_crystal', name:'The Crystal Tomb', icon:'💀',
    tagline:'Preserved in crystal. Visible but untouchable. Permanent.',
    color:'#8899bb', element:'ghost', elementFlavor:'gravecrystal', rarity:'epic',
    fusedFrom:['gravewarden','crystalmancer'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:11,def:11,spd:10,crit:13},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:6,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','fire_crystal_shard','crystal_void_surge','crystal_void_stance','ice_rock_crystallize'],
    burstAbility:'gravewarden_burst',
    passives:['undying','crystal_body'],
    description:'The dead preserved in crystal formations — bodies entombed in mineral lattice, preserved perfectly, and deployed as crystalline golems who shatter into shards on second death. The Crystal Tomb makes graves permanent and makes the dead both a memorial and an ammunition reserve.',
    lore:'The gravewarden preserved the dead respectfully. The crystalmancer preserved them perfectly. The Crystal Tomb found that crystal entombment is the most comprehensive form of preservation available — nothing degrades inside crystal — and that the preserved dead can be animated in that state, which the gravewarden considers a dignified form of continued service.'
  },

  grave_war: {
    id:'grave_war', name:'The Army of the Fallen', icon:'💀',
    tagline:'Every soldier who has died in this dungeon fought for the warlord now.',
    color:'#887766', element:'ghost', elementFlavor:'gravewar', rarity:'legendary',
    fusedFrom:['gravewarden','warlord'],
    stats:{hp:103,maxHp:103,mp:73,maxMp:73,atk:12,def:12,spd:10,crit:11},
    statDisplay:{HP:7,ATK:8,DEF:8,SPD:6,MP:7},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','fire_fighting_rage','normal_blood_mark','dark_blood_surge','dark_blood_stance'],
    burstAbility:'gravewarden_burst',
    passives:['undying','battle_hardened'],
    description:'A military force composed entirely of fallen soldiers — every warrior who died in the dungeon, raised under warlord tactical doctrine. The Army of the Fallen grows with every casualty on either side: its losses are temporary and its recruits are anyone who dies within range.',
    lore:'The warlord needed soldiers. The gravewarden had a great many available. The Army of the Fallen applied warlord tactical doctrine to the assembled dead of the dungeon and found that dead soldiers follow orders with a consistency that living ones sometimes find difficult, and that every enemy who falls in combat immediately becomes a tactical asset rather than a loss.'
  },

  grave_spirit: {
    id:'grave_spirit', name:'The Ancestral Grave', icon:'💀',
    tagline:'The spiritwalker speaks to the dead. The gravewarden keeps them.',
    color:'#778877', element:'ghost', elementFlavor:'gravespirit', rarity:'epic',
    fusedFrom:['gravewarden','spiritwalker'],
    stats:{hp:95,maxHp:95,mp:82,maxMp:82,atk:10,def:11,spd:11,crit:12},
    statDisplay:{HP:6,ATK:7,DEF:8,SPD:6,MP:8},
    abilities:['grave_touch','bone_shield','death_mark','raise_fallen','electric_spirit_surge','water_ghost_haunt','electric_spirit_possession','electric_spirit_veil'],
    burstAbility:'spiritwalker_burst',
    passives:['undying','spirit_bond'],
    description:'A maintained alliance between the dead and their graves — spirits that choose to remain near their burial site, organized by the gravewarden and communicated with by the spiritwalker. The Ancestral Grave has the most cooperative undead in any fusion because they are there by choice.',
    lore:'The spiritwalker asked the dead what they wanted. The gravewarden provided conditions the dead found acceptable. The Ancestral Grave found that spirits offered respectful maintenance of their burial site and meaningful communication with the living are more willing to provide assistance than spirits who are compelled or ignored, which produces better tactical outcomes than either coercion or neglect.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_14);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_14);
  FUSION_LOADED_FILES.add(14);
  if(typeof console!=='undefined') console.debug('[Fusion] File 14 loaded (37 classes)');
})();
