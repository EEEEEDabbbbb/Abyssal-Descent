// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 6 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_6 = {
  'bloodknight+phantom': 'blood_phantom',
  'runeblade+voidmancer': 'void_rune',
  'necromancer+voidmancer': 'void_necro',
  'paladin+voidmancer': 'void_paladin',
  'frostweaver+voidmancer': 'void_frost',
  'dragonknight+voidmancer': 'void_dragon',
  'tidecaller+voidmancer': 'void_tide',
  'gravitist+voidmancer': 'void_gravitist',
  'soundbreaker+voidmancer': 'void_soundbreaker',
  'chronomancer+voidmancer': 'void_chrono',
  'spellsword+voidmancer': 'void_spellsword',
  'plaguedoctor+voidmancer': 'void_plague',
  'geomancer+voidmancer': 'void_geo',
  'lightbringer+voidmancer': 'void_lightbringer',
  'beastmaster+voidmancer': 'void_beast',
  'techsavant+voidmancer': 'void_tech',
  'gravewarden+voidmancer': 'void_grave',
  'magnetist+voidmancer': 'void_magnetist',
  'crystalmancer+voidmancer': 'void_crystal',
  'voidmancer+warlord': 'void_war',
  'spiritwalker+voidmancer': 'void_spirit',
  'hexblade+voidmancer': 'void_hex',
  'cosmomancer+voidmancer': 'void_cosmo',
  'pestilencelord+voidmancer': 'void_pestilence',
  'voidmancer+windwalker': 'void_wind',
  'doomcaster+voidmancer': 'void_doom',
  'arcanist+voidmancer': 'void_arcanist',
  'sentinel+voidmancer': 'void_sentinel',
  'phantom+voidmancer': 'void_phantom',
  'necromancer+runeblade': 'rune_necro',
  'paladin+runeblade': 'rune_paladin',
  'frostweaver+runeblade': 'rune_frost',
  'dragonknight+runeblade': 'rune_dragon',
  'runeblade+tidecaller': 'rune_tide',
  'gravitist+runeblade': 'rune_gravitist',
  'runeblade+soundbreaker': 'rune_soundbreaker',
  'chronomancer+runeblade': 'rune_chrono'
};

const FUSION_CLASSES_6 = {
  blood_phantom: {
    id:'blood_phantom', name:'The Crimson Shade', icon:'👻',
    tagline:'The ghost bleeds. Everything it passes through bleeds with it.',
    color:'#995566', element:'dark', elementFlavor:'deathblood', rarity:'legendary',
    fusedFrom:['bloodknight','phantom'],
    stats:{hp:95,maxHp:95,mp:65,maxMp:65,atk:14,def:8,spd:14,crit:18},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:8,MP:6},
    abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','water_ghost_wraith','normal_blood_drain','water_ghost_haunt','water_ghost_phase'],
    burstAbility:'shadow_burst',
    passives:['vital_hunger','phase'],
    description:'A ghost that passes through enemies and drains blood without physical contact — the wounds open as if from nothing. Phases through barriers to reach targets, then phases back out before they can respond, leaving them hemorrhaging from invisible injuries.',
    lore:'Ghosts pass through the living without touching them. Usually. The Crimson Shade found a configuration where the passing touches something, specifically something the target needs, and takes it on the way through.'
  },

  void_rune: {
    id:'void_rune', name:'The Erased Inscription', icon:'🌀',
    tagline:'The rune that unmakes what it marks.',
    color:'#aa776f', element:'shadow', elementFlavor:'runeshadow', rarity:'epic',
    fusedFrom:['voidmancer','runeblade'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:12,def:7,spd:12,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','void_rune_surge','void_rune_drain','void_rune_strike','normal_void_unmake'],
    burstAbility:'void_burst',
    passives:['void_affinity','rune_mastery'],
    description:'Inscribes void runes that actively erase what they mark — enemy armor degrades, weapons lose edge, defenses collapse. Detonated void-runes create localized null-zones. The Erased Inscription does not destroy enemies. It unmarks them from existence.',
    lore:'Runes traditionally add something — power, protection, a curse. The void rune subtracts. The runeblade found this philosophically uncomfortable. The voidmancer found it philosophically obvious. They reached an operational understanding.'
  },

  void_necro: {
    id:'void_necro', name:'The Unmaker', icon:'💀',
    tagline:'Death is not void. Death is the absence of life. Void is the absence of both.',
    color:'#557791', element:'shadow', elementFlavor:'wraith', rarity:'epic',
    fusedFrom:['voidmancer','necromancer'],
    stats:{hp:68,maxHp:68,mp:115,maxMp:115,atk:9,def:5,spd:10,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:6,MP:11},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','normal_void_drain','normal_dark_void','water_ghost_haunt'],
    burstAbility:'void_burst',
    passives:['void_affinity','death_aura'],
    description:'Unmakes the undead and the living with equal efficiency — necromantic forces cannot operate in void space, so the Unmaker clears the field entirely rather than choosing sides between life and death. The void does not raise armies. It erases the concept.',
    lore:'The necromancer controlled death. The voidmancer negated existence. The Unmaker found that these are different problems. Death has an after. Void does not. The Unmaker specializes in the second category.'
  },

  void_paladin: {
    id:'void_paladin', name:'The Fallen Absolute', icon:'🌀',
    tagline:'When the holy light touches the void, one of them wins. Ask which.',
    color:'#aa8888', element:'shadow', elementFlavor:'dusklight', rarity:'epic',
    fusedFrom:['voidmancer','paladin'],
    stats:{hp:98,maxHp:98,mp:85,maxMp:85,atk:11,def:9,spd:9,crit:12},
    statDisplay:{HP:7,ATK:8,DEF:6,SPD:5,MP:8},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_curse','normal_light_absorb','normal_void_pierce','normal_dark_eclipse'],
    burstAbility:'void_burst',
    passives:['void_affinity','sacred_aura'],
    description:'A paladin whose faith was consumed by the void — holy energy converted into null-force that neither heals nor burns, simply erases. The Fallen Absolute passes judgment, then removes whatever was judged from the equation entirely.',
    lore:'The paladin served the light. The void consumed the light. The Fallen Absolute serves something that emerged from that transaction — neither divine nor empty, but with the conviction of the former and the finality of the latter.'
  },

  void_frost: {
    id:'void_frost', name:'Absolute Zero', icon:'❄️',
    tagline:'Cold enough and nothing moves. Nothing exists at that temperature.',
    color:'#8091dd', element:'shadow', elementFlavor:'frostshadow', rarity:'epic',
    fusedFrom:['voidmancer','frostweaver'],
    stats:{hp:73,maxHp:73,mp:98,maxMp:98,atk:10,def:6,spd:12,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_ice_prison','normal_ice_shatter','normal_void_unmake','normal_void_drain'],
    burstAbility:'void_burst',
    passives:['void_affinity','frost_mastery'],
    description:'Combines absolute cold with absolute negation — freezes targets at the molecular level, then applies void energy to the frozen state. At true absolute zero, matter ceases to interact with anything. The Absolute Zero brings that condition to the enemy.',
    lore:'The frostweaver pursued cold. The voidmancer pursued nothingness. They found, at the extremes of both disciplines, that they were describing the same destination from different starting points.'
  },

  void_dragon: {
    id:'void_dragon', name:'The Void Drake', icon:'🌀',
    tagline:'A dragon with no breath. It erases things instead.',
    color:'#aa555e', element:'shadow', elementFlavor:'shadowdrake', rarity:'epic',
    fusedFrom:['voidmancer','dragonknight'],
    stats:{hp:98,maxHp:98,mp:80,maxMp:80,atk:13,def:8,spd:11,crit:13},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_dragon_surge','normal_dragon_wrath','normal_void_slash','normal_void_pierce'],
    burstAbility:'void_burst',
    passives:['void_affinity','intimidation'],
    description:'A dragon whose fire was replaced by void — null-breath that unmakes instead of burns, draconic strikes that leave void-wounds in reality rather than flesh. The Void Drake is not less dangerous than a fire dragon. It is dangerous in a way that is harder to recover from.',
    lore:'A dragon without fire is still a dragon. The Void Drake has replaced fire with something more permanent. Its subjects do not heal as reliably, which the drake finds professionally acceptable.'
  },

  void_tide: {
    id:'void_tide', name:'The Null Current', icon:'🌀',
    tagline:'The tide erases the shore. This one erases what the tide touches.',
    color:'#5e6fc4', element:'shadow', elementFlavor:'mireshadow', rarity:'epic',
    fusedFrom:['voidmancer','tidecaller'],
    stats:{hp:75,maxHp:75,mp:100,maxMp:100,atk:10,def:6,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_drain','normal_void_pierce','normal_space_phase','water_ghost_drown'],
    burstAbility:'void_burst',
    passives:['void_affinity','tidal_flow'],
    description:'Commands null-currents that flow through space — tides of void energy that drain matter from anything they pass through. Enemies caught in the Null Current lose mass, momentum, and eventually coherence as the void slowly unmakes them.',
    lore:'Water shapes the earth by erosion. Void shapes the earth by removal. The Null Current found these were the same operation at different scales, and concluded the void was simply more efficient.'
  },

  void_gravitist: {
    id:'void_gravitist', name:'The Event Horizon', icon:'⚫',
    tagline:'Past a certain point, nothing returns. Not even the void.',
    color:'#5e4d91', element:'shadow', elementFlavor:'gravshade', rarity:'legendary',
    fusedFrom:['voidmancer','gravitist'],
    stats:{hp:70,maxHp:70,mp:103,maxMp:103,atk:10,def:5,spd:11,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_gravity_crush','normal_gravity_anchor','normal_void_unmake','normal_space_consume'],
    burstAbility:'void_burst',
    passives:['void_affinity','gravity_well'],
    description:'Creates localized event horizons — gravitational singularities filled with void energy from which nothing escapes. Pulls enemies toward the horizon, and whatever crosses it does not come back. The Event Horizon is the most permanent form of crowd control.',
    lore:'A black hole is gravity compressed into void. The gravitist compressed gravity. The voidmancer compressed void. The Event Horizon is what happens when both compressions occur in the same location simultaneously.'
  },

  void_soundbreaker: {
    id:'void_soundbreaker', name:'The Silence', icon:'🔇',
    tagline:'The void has no sound. It will share this quality with the room.',
    color:'#aa7788', element:'shadow', elementFlavor:'silentwave', rarity:'epic',
    fusedFrom:['voidmancer','soundbreaker'],
    stats:{hp:73,maxHp:73,mp:98,maxMp:98,atk:12,def:5,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','normal_void_drain','normal_space_phase','normal_void_anchor'],
    burstAbility:'void_burst',
    passives:['void_affinity','resonance'],
    description:'Sound requires a medium. The Silence removes the medium. Void pockets that absorb all vibration, sonic attacks that tear sound from the air before it can travel, and areas of total null-resonance where concentration, coordination, and communication all fail.',
    lore:'The soundbreaker weaponized sound. The voidmancer negated things. They discovered these tools complement each other: the sound weapon creates the silence, and the silence enhances the next weapon. The Silence runs this loop continuously.'
  },

  void_chrono: {
    id:'void_chrono', name:'The End of Hours', icon:'⏳',
    tagline:'Time runs out. The void is what is left after.',
    color:'#9166dd', element:'shadow', elementFlavor:'timeshade', rarity:'legendary',
    fusedFrom:['voidmancer','chronomancer'],
    stats:{hp:68,maxHp:68,mp:110,maxMp:110,atk:10,def:5,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_time_age','normal_time_drain','normal_void_drain','normal_time_stasis'],
    burstAbility:'void_burst',
    passives:['void_affinity','time_warp'],
    description:'Erases time from targets — not killing them, but removing their place in the timeline. The End of Hours ages enemies into the void at the terminus of their personal timeline, reaching forward to pull the end backward into the present.',
    lore:'The chronomancer moved through time. The voidmancer moved through absence. They found that the end of a timeline is indistinguishable from void, which produces a technique that is either very elegant or very disturbing, depending on the observer\'s relationship to time.'
  },

  void_spellsword: {
    id:'void_spellsword', name:'The Null Formula', icon:'🌀',
    tagline:'The spell that unmakes spells. The blade that unmakes blades.',
    color:'#9144b3', element:'shadow', elementFlavor:'spellshadow', rarity:'epic',
    fusedFrom:['voidmancer','spellsword'],
    stats:{hp:78,maxHp:78,mp:95,maxMp:95,atk:12,def:6,spd:12,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_pierce','normal_void_curse','normal_dark_consume','normal_void_slash'],
    burstAbility:'void_burst',
    passives:['void_affinity','spellblade'],
    description:'A null-blade that cancels whatever it strikes — spells unravel, armor degrades, physical attacks lose force before arriving. The Null Formula writes equations that cancel the opponent\'s entire combat capability, one term at a time.',
    lore:'The spellsword combined magic and steel. The voidmancer combined negation with negation. The Null Formula found that a spell that cancels and a blade that unmakes are functionally equivalent, and that combining them produces a weapon with no natural counter.'
  },

  void_plague: {
    id:'void_plague', name:'The Unclean Nothing', icon:'🌀',
    tagline:'A plague that erases the host along with the disease. Efficient.',
    color:'#807777', element:'shadow', elementFlavor:'plagueshadow', rarity:'legendary',
    fusedFrom:['voidmancer','plaguedoctor'],
    stats:{hp:70,maxHp:70,mp:105,maxMp:105,atk:10,def:6,spd:11,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','normal_void_drain','fire_poison_plague','normal_dark_corrupt'],
    burstAbility:'void_burst',
    passives:['void_affinity','immunity'],
    description:'Engineers plague that consumes itself and its host simultaneously — void-infused disease that erases biological matter as it spreads. Leaves no remains. No body, no contamination, no trace. The Unclean Nothing solves the disposal problem.',
    lore:'The plaguedoctor managed disease processes. The voidmancer negated existence. The Unclean Nothing found that a plague engineered to erase itself along with its host is both more lethal and more sanitary than traditional approaches, which the plaguedoctor acknowledged with some reluctance.'
  },

  void_geo: {
    id:'void_geo', name:'The Hollowed Earth', icon:'🌀',
    tagline:'What the void leaves behind is a shape. The shape of what was removed.',
    color:'#916688', element:'shadow', elementFlavor:'dustshade', rarity:'rare',
    fusedFrom:['voidmancer','geomancer'],
    stats:{hp:83,maxHp:83,mp:90,maxMp:90,atk:11,def:8,spd:9,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:5,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','fire_ground_quake','normal_space_phase','normal_rock_crush'],
    burstAbility:'void_burst',
    passives:['void_affinity','earth_body'],
    description:'Hollows the earth with void energy — creates underground null-chambers that collapse under foot, erases stone to create sudden drops, and shapes terrain by removing it. The battlefield becomes a map of absences where something used to be.',
    lore:'The geomancer moved earth. The voidmancer removed things. The Hollowed Earth found that removing earth and moving earth achieve similar tactical results, but the void approach does not leave debris, which the geomancer found aesthetically disappointing but operationally useful.'
  },

  void_lightbringer: {
    id:'void_lightbringer', name:'The Eclipse', icon:'🌑',
    tagline:'The light goes in. Nothing comes out.',
    color:'#bb9180', element:'shadow', elementFlavor:'eclipseblade', rarity:'epic',
    fusedFrom:['voidmancer','lightbringer'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:12,def:7,spd:12,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_dark_eclipse','normal_light_absorb','normal_void_drain','normal_dark_fade'],
    burstAbility:'void_burst',
    passives:['void_affinity','radiant'],
    description:'Absorbs light into void-space and weaponizes the resulting darkness. Blinds enemies by consuming illumination, creates absolute dark zones, and converts captured radiance into void-bolts that carry the inverted energy of what was absorbed.',
    lore:'Light travels until it hits something. The Eclipse is the something. What enters does not exit. What tries to see through the Eclipse is simply somewhere without light, and the Eclipse uses this fact to its considerable advantage.'
  },

  void_beast: {
    id:'void_beast', name:'The Hollow Predator', icon:'🌀',
    tagline:'The void-touched beast does not hunger. It is a hunger.',
    color:'#808080', element:'shadow', elementFlavor:'runeshadow', rarity:'rare',
    fusedFrom:['voidmancer','beastmaster'],
    stats:{hp:80,maxHp:80,mp:88,maxMp:88,atk:12,def:7,spd:13,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:8,MP:8},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_slash','normal_void_pierce','normal_dark_consume','water_ghost_phase'],
    burstAbility:'void_burst',
    passives:['void_affinity','feral_bond'],
    description:'A predator whose attacks leave void-wounds — bites and claws that remove matter rather than cutting it, leaving injuries that do not bleed because there is nothing left to bleed from. The Hollow Predator hunts with instinct. It strikes with nothingness.',
    lore:'The beastmaster taught beasts to be weapons. The void taught matter to be absent. The Hollow Predator is a beast whose natural weapons have been replaced by the second option, which its prey finds considerably more difficult to prepare against.'
  },

  void_tech: {
    id:'void_tech', name:'System Null', icon:'💻',
    tagline:'Every system has a delete command. This one found them all.',
    color:'#5e66b3', element:'shadow', elementFlavor:'ghosttech', rarity:'legendary',
    fusedFrom:['voidmancer','techsavant'],
    stats:{hp:73,maxHp:73,mp:103,maxMp:103,atk:11,def:6,spd:13,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','fire_cyber_system_melt','normal_void_unmake','normal_void_drain','normal_space_phase'],
    burstAbility:'void_burst',
    passives:['void_affinity','overclock'],
    description:'Applies void logic to technical and biological systems — finds the delete command in every structure and executes it. Armor systems fail. Biological functions null out. Enchantments terminate. System Null does not destroy things. It uninstalls them.',
    lore:'Every system can be crashed. The techsavant found the crashes. The void found what crashed things go into. System Null found that the destination and the tool are the same: a deletion function with no recycle bin.'
  },

  void_grave: {
    id:'void_grave', name:'The Empty Grave', icon:'🌀',
    tagline:'The void does not raise the dead. It makes raising them impossible.',
    color:'#6655a2', element:'shadow', elementFlavor:'wraith', rarity:'epic',
    fusedFrom:['voidmancer','gravewarden'],
    stats:{hp:90,maxHp:90,mp:88,maxMp:88,atk:11,def:9,spd:9,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:5,MP:8},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_drain','water_ghost_drown','normal_dark_fade','normal_void_unmake'],
    burstAbility:'void_burst',
    passives:['void_affinity','undying'],
    description:'Guards the boundary between death and void — prevents resurrection, prevents undeath, and ensures that what falls does not return in any form. The Empty Grave leaves graves permanently empty by sending their contents somewhere from which no summoning can reach.',
    lore:'The gravewarden kept the dead down. The void made the down permanent. The Empty Grave ensures that whatever is killed stays whatever the void decides to do with it, which does not include returning to the dungeon.'
  },

  void_magnetist: {
    id:'void_magnetist', name:'The Null Pole', icon:'🌀',
    tagline:'Magnetism attracts and repels. Void only does one of those.',
    color:'#666fb3', element:'shadow', elementFlavor:'ironshadow', rarity:'epic',
    fusedFrom:['voidmancer','magnetist'],
    stats:{hp:75,maxHp:75,mp:98,maxMp:98,atk:12,def:7,spd:11,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_drain','normal_gravity_pull','normal_void_unmake','normal_space_consume'],
    burstAbility:'void_burst',
    passives:['void_affinity','magnetic_field'],
    description:'Creates void-magnetic poles that pull matter toward null-space rather than other matter. Weapons are drawn toward the void. Armor is stripped away. The Null Pole does not need to attack enemies directly — it pulls them into nothing.',
    lore:'The magnetist pulled metal. The voidmancer pulled existence into absence. The Null Pole found that these are different directions of the same force, and that the void direction has a considerably worse destination for whatever gets pulled there.'
  },

  void_crystal: {
    id:'void_crystal', name:'The Null Lattice', icon:'🌀',
    tagline:'A crystal that refracts into nothing. The nothing goes everywhere.',
    color:'#8080dd', element:'shadow', elementFlavor:'prismshade', rarity:'legendary',
    fusedFrom:['voidmancer','crystalmancer'],
    stats:{hp:68,maxHp:68,mp:105,maxMp:105,atk:12,def:5,spd:13,crit:18},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:8,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_pierce','normal_void_slash','normal_space_phase','normal_void_unmake'],
    burstAbility:'void_burst',
    passives:['void_affinity','crystal_body'],
    description:'Grows void-crystal lattices that refract null-energy the way normal crystal refracts light — void beams that split into multiple angles, each carrying the full force of the original. Shattering a null lattice releases everything stored inside simultaneously.',
    lore:'The crystalmancer made crystal that refracted light into everything. The voidmancer made void that refracted into absence. The Null Lattice combines these operations and produces structures that refract into nothing in every direction at once.'
  },

  void_war: {
    id:'void_war', name:'The Null Warlord', icon:'🌀',
    tagline:'Commands armies. The armies do not need to be real to follow orders.',
    color:'#a2445e', element:'shadow', elementFlavor:'warshadow', rarity:'epic',
    fusedFrom:['voidmancer','warlord'],
    stats:{hp:93,maxHp:93,mp:83,maxMp:83,atk:13,def:8,spd:11,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_slash','normal_dark_eclipse','normal_void_pierce','fire_fighting_rage'],
    burstAbility:'void_burst',
    passives:['void_affinity','battle_hardened'],
    description:'Commands void-constructs as tactical units — null-soldiers that cannot be hurt because they are already nothing, and cannot be reasoned with because they have no will. The Null Warlord directs an army of absence and lets physics handle the rest.',
    lore:'The warlord needed an army that would not question orders, would not retreat, and would not require supply lines. The void said: I have those. The Null Warlord\'s army has never had a morale problem, for obvious reasons.'
  },

  void_spirit: {
    id:'void_spirit', name:'The Hollow Saint', icon:'🌀',
    tagline:'The spirit reaches where the void cannot. The void takes what the spirit finds.',
    color:'#5e77a2', element:'shadow', elementFlavor:'spiritshadow', rarity:'legendary',
    fusedFrom:['voidmancer','spiritwalker'],
    stats:{hp:78,maxHp:78,mp:98,maxMp:98,atk:10,def:7,spd:12,crit:14},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','water_ghost_phase','normal_void_drain','fire_spirit_exorcism','normal_void_unmake'],
    burstAbility:'void_burst',
    passives:['void_affinity','spirit_bond'],
    description:'Uses spiritual awareness to locate targets across the spiritual plane, then delivers void energy through those same channels — striking the spiritual self before the physical one. The Hollow Saint leaves targets spiritually hollowed before the physical attack arrives.',
    lore:'The spiritwalker found spirits. The void consumed them. The Hollow Saint combined these skills and found that reaching the spiritual before the physical is simply a matter of which door you knock on first.'
  },

  void_hex: {
    id:'void_hex', name:'The Absolute Curse', icon:'🌀',
    tagline:'Curses can be broken. Void is not a condition. It is a destination.',
    color:'#8033a2', element:'shadow', elementFlavor:'abyssblade', rarity:'legendary',
    fusedFrom:['voidmancer','hexblade'],
    stats:{hp:73,maxHp:73,mp:100,maxMp:100,atk:12,def:6,spd:12,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_curse','normal_dark_corrupt','normal_void_unmake','normal_dark_consume'],
    burstAbility:'void_burst',
    passives:['void_affinity','hex_master'],
    description:'Applies curses that are indistinguishable from void — not weaknesses or bad luck, but structural negation of whatever is cursed. The Absolute Curse does not make the enemy unlucky. It makes them gradually less able to exist.',
    lore:'Hexes are conditional. The hexblade placed conditions. The voidmancer removed conditions from all equations. The Absolute Curse is a curse without condition — it does not require anything to activate and cannot be satisfied to deactivate.'
  },

  void_cosmo: {
    id:'void_cosmo', name:'The Dead Universe', icon:'🌌',
    tagline:'Stars die. Galaxies go dark. This is what that looks like, locally.',
    color:'#5e3cb3', element:'shadow', elementFlavor:'starshadow', rarity:'mythical',
    fusedFrom:['voidmancer','cosmomancer'],
    stats:{hp:68,maxHp:68,mp:113,maxMp:113,atk:10,def:5,spd:12,crit:15},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:11},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_space_consume','normal_void_unmake','normal_void_drain','electric_space_void'],
    burstAbility:'cosmomancer_burst',
    passives:['void_affinity','stardust'],
    description:'Channels the heat death of universes — the final state of all cosmological processes where entropy wins and everything reaches void. The Dead Universe does not fight enemies. It fast-forwards them to the end of their timeline.',
    lore:'The cosmomancer studied the universe. The void is what the universe becomes. The Dead Universe skips the intervening billions of years for individual targets and delivers the conclusion directly. The cosmomancer found this philosophically troubling. The voidmancer found it efficient.'
  },

  void_pestilence: {
    id:'void_pestilence', name:'The Empty Plague', icon:'🌀',
    tagline:'It spreads. What it spreads is absence.',
    color:'#66665e', element:'shadow', elementFlavor:'plagueshadow', rarity:'legendary',
    fusedFrom:['voidmancer','pestilencelord'],
    stats:{hp:73,maxHp:73,mp:105,maxMp:105,atk:11,def:6,spd:11,crit:14},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','fire_poison_plague','normal_void_drain','normal_dark_corrupt'],
    burstAbility:'pestilence_lord_burst',
    passives:['void_affinity','plague_lord'],
    description:'Spreads void as a contagion — the Empty Plague transmits null-energy between biological hosts, each carrier becoming less present until they cross the threshold from ill to absent. Uncurable because it is not a disease. It is a state of being.',
    lore:'The pestilencelord created plagues that spread. The void spread itself into anything with a suitable medium. The Empty Plague combined these properties and produced something that the plaguedoctor described as beyond conventional disease management. This was meant as a compliment.'
  },

  void_wind: {
    id:'void_wind', name:'The Null Wind', icon:'🌀',
    tagline:'A wind that carries nothing to everywhere.',
    color:'#8088b3', element:'shadow', elementFlavor:'windshade', rarity:'epic',
    fusedFrom:['voidmancer','windwalker'],
    stats:{hp:73,maxHp:73,mp:90,maxMp:90,atk:12,def:5,spd:16,crit:17},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:9,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','fire_wind_cyclone','normal_void_drain','fire_flying_updraft','normal_void_unmake'],
    burstAbility:'void_burst',
    passives:['void_affinity','gust'],
    description:'Wind carrying void energy — every gust strips matter from whatever it passes through, leaving surfaces eroded by nothingness rather than friction. Moves at wind speed and delivers void at every point along the path.',
    lore:'Wind erodes through contact. Void erodes through negation. The Null Wind applies both to every surface simultaneously at 16 SPD, which produces an erosion rate that stone does not survive and enemies manage even less well.'
  },

  void_doom: {
    id:'void_doom', name:'Absolute End', icon:'🌀',
    tagline:'Doom says you will die. Void says you will stop existing. Different.',
    color:'#6f3c77', element:'shadow', elementFlavor:'abyssblade', rarity:'mythical',
    fusedFrom:['voidmancer','doomcaster'],
    stats:{hp:68,maxHp:68,mp:110,maxMp:110,atk:10,def:4,spd:12,crit:16},
    statDisplay:{HP:5,ATK:7,DEF:3,SPD:7,MP:10},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','normal_void_drain','normal_dark_void','normal_space_consume'],
    burstAbility:'doomcaster_burst',
    passives:['void_affinity','doom_aura'],
    description:'The most permanent sentence possible. Doom marks targets for eventual destruction. Void marks targets for eventual negation. The Absolute End issues both simultaneously, and the outcome is not recoverable by any healing magic.',
    lore:'Death is an ending. The doomcaster sealed endings. The void is what is left after all endings conclude. The Absolute End operates past the event horizon of all other outcome systems, which makes countering it a theoretical exercise.'
  },

  void_arcanist: {
    id:'void_arcanist', name:'The Unwritten', icon:'🌀',
    tagline:'Magic writes the world. The void erases the writing.',
    color:'#663cc4', element:'shadow', elementFlavor:'spellshadow', rarity:'legendary',
    fusedFrom:['voidmancer','arcanist'],
    stats:{hp:65,maxHp:65,mp:115,maxMp:115,atk:10,def:4,spd:12,crit:17},
    statDisplay:{HP:5,ATK:7,DEF:3,SPD:7,MP:11},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_unmake','normal_void_drain','fire_psychic_blaze','normal_void_curse'],
    burstAbility:'void_burst',
    passives:['void_affinity','arcane_mastery'],
    description:'Applies arcane theory to void energy — calculates the precise formula for negation and applies it with mathematical precision. Enemy spells are unwritten mid-cast. Reality is edited to remove the premise of the attack.',
    lore:'The arcanist understood the laws of magic. The void was the exception to every law. The Unwritten studied the exception and found it had its own grammar — considerably simpler than magic\'s, and pointing in only one direction.'
  },

  void_sentinel: {
    id:'void_sentinel', name:'The Null Gate', icon:'🌀',
    tagline:'Nothing passes. Not even light. Especially not light.',
    color:'#8066a2', element:'shadow', elementFlavor:'voidsteel', rarity:'rare',
    fusedFrom:['voidmancer','sentinel'],
    stats:{hp:113,maxHp:113,mp:75,maxMp:75,atk:9,def:12,spd:8,crit:10},
    statDisplay:{HP:8,ATK:6,DEF:8,SPD:5,MP:7},
    abilities:['void_bolt','entropy','singularity','annihilate','normal_void_anchor','normal_void_pierce','fire_steel_quench','normal_dark_fade'],
    burstAbility:'void_burst',
    passives:['void_affinity','bastion'],
    description:'An immovable void-barrier that nothing can pass through. Not attacks, not magic, not retreat. The Null Gate does not just block — it negates passage, and things that contact it while trying to pass find their attempt unregistered by physics.',
    lore:'The sentinel blocked passage. The void blocked existence. The Null Gate does both simultaneously, which covers every contingency the sentinel could not, and several the sentinel did not believe were possible until demonstrated.'
  },

  void_phantom: {
    id:'void_phantom', name:'The Absence', icon:'🌀',
    tagline:'You cannot fight what is not there. You cannot fight what is less than that.',
    color:'#806fbb', element:'shadow', elementFlavor:'wraith', rarity:'mythical',
    fusedFrom:['voidmancer','phantom'],
    stats:{hp:68,maxHp:68,mp:95,maxMp:95,atk:12,def:4,spd:15,crit:21},
    statDisplay:{HP:5,ATK:8,DEF:3,SPD:9,MP:9},
    abilities:['void_bolt','entropy','singularity','annihilate','water_ghost_phase','normal_void_unmake','normal_space_phase','normal_void_drain'],
    burstAbility:'shadow_burst',
    passives:['void_affinity','phase'],
    description:'Two forms of non-presence merged into one. Phases between void and spectral states in alternation — present enough to attack, absent enough to be untargetable. The Absence strikes from nothingness and retreats to a different nothingness.',
    lore:'The phantom was already not quite there. The voidmancer was already not quite anything. The Absence is what emerged when two types of absence occupied the same space — something that is aggressively, deliberately, and very precisely nothing.'
  },

  rune_necro: {
    id:'rune_necro', name:'The Deathscribed', icon:'🔱',
    tagline:'Death is not the end of the inscription. It is the beginning of the second draft.',
    color:'#88aa44', element:'normal', elementFlavor:'runesoul', rarity:'rare',
    fusedFrom:['runeblade','necromancer'],
    stats:{hp:85,maxHp:85,mp:95,maxMp:95,atk:11,def:7,spd:11,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_drain','normal_rune_mark','water_ghost_haunt','normal_dark_consume'],
    burstAbility:'necro_burst',
    passives:['rune_mastery','death_aura'],
    description:'Inscribes death-runes that animate fallen enemies in place — the corpse becomes a rune-bound construct that fights until the inscription degrades. The longer the rune holds, the more powerful the construct becomes.',
    lore:'The runeblade wrote on surfaces that held. The necromancer found that death-touched flesh holds an inscription longer than stone. The Deathscribed uses fallen enemies as parchment for increasingly elaborate post-mortem commands.'
  },

  rune_paladin: {
    id:'rune_paladin', name:'The Sworn Inscription', icon:'⚜️',
    tagline:'Oaths carved in stone outlast the one who swore them. This is the point.',
    color:'#ddbb3c', element:'normal', elementFlavor:'runelight', rarity:'rare',
    fusedFrom:['runeblade','paladin'],
    stats:{hp:115,maxHp:115,mp:65,maxMp:65,atk:13,def:12,spd:11,crit:10},
    statDisplay:{HP:8,ATK:9,DEF:8,SPD:7,MP:6},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_ward','normal_light_dawn','normal_rune_mark','normal_light_blind'],
    burstAbility:'paladin_burst',
    passives:['rune_mastery','sacred_aura'],
    description:'Carves sacred oaths into the battlefield itself — wards that enforce divine law, runes that punish covenant-breakers, and inscriptions of absolute protection for those under the Sworn Inscription\'s guard. The oath holds whether or not the caster does.',
    lore:'The paladin made vows. The runeblade wrote them permanently. The Sworn Inscription found that a vow carved in rune-steel has a binding force that verbal commitments lack, and that enemies attacking a rune-ward are technically in breach of a contract they were not informed about.'
  },

  rune_frost: {
    id:'rune_frost', name:'The Frozen Sigil', icon:'❄️',
    tagline:'Cold preserves the inscription. The inscription preserves the cold.',
    color:'#b3c491', element:'normal', elementFlavor:'frostrune', rarity:'rare',
    fusedFrom:['runeblade','frostweaver'],
    stats:{hp:90,maxHp:90,mp:78,maxMp:78,atk:12,def:9,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_ice_prison','normal_rune_mark','normal_ice_shatter','normal_rune_ward'],
    burstAbility:'frostweaver_burst',
    passives:['rune_mastery','frost_mastery'],
    description:'Inscribes runes into ice — and ice into enemies. Frozen rune-traps that preserve perfectly in cold, triggering when the temperature rises. The Frozen Sigil prepares the battlefield with elaborate ice-rune architecture that activates in sequence.',
    lore:'The runeblade wrote runes on whatever was available. The frostweaver made ice available everywhere. The Frozen Sigil found that ice is an excellent medium for runes — it holds the inscription perfectly until released, at which point everything held happens at once.'
  },

  rune_dragon: {
    id:'rune_dragon', name:'The Branded Drake', icon:'🐉',
    tagline:'Every scale is an inscription. Every inscription is a weapon.',
    color:'#dd8811', element:'normal', elementFlavor:'runedrake', rarity:'rare',
    fusedFrom:['runeblade','dragonknight'],
    stats:{hp:115,maxHp:115,mp:60,maxMp:60,atk:15,def:11,spd:12,crit:12},
    statDisplay:{HP:8,ATK:10,DEF:8,SPD:7,MP:6},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_dragon_surge','normal_dragon_wrath','normal_rune_carve','normal_rune_shatter'],
    burstAbility:'dragonknight_burst',
    passives:['rune_mastery','intimidation'],
    description:'A dragon covered in active rune inscriptions — each scale is a carved ward or weapon trigger. Attacks carve runes into enemies on impact. The accumulated inscriptions on a target reach a critical mass and shatter simultaneously.',
    lore:'The runeblade inscribed its blade. The dragonknight had considerably more surface area. The Branded Drake carries an entire runic library across its scales, which is either an impressive research library or a very elaborate weapons system, depending on your relationship to the dragon.'
  },

  rune_tide: {
    id:'rune_tide', name:'The Tidal Inscription', icon:'🌊',
    tagline:'The tide writes the shore. These runes do not wash away.',
    color:'#91a277', element:'normal', elementFlavor:'runetide', rarity:'rare',
    fusedFrom:['runeblade','tidecaller'],
    stats:{hp:93,maxHp:93,mp:80,maxMp:80,atk:12,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','normal_rune_ward','water_ghost_drown','normal_rune_drain'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','tidal_flow'],
    description:'Uses water to distribute runes across the battlefield — inscriptions carried on tidal flows that mark every surface they touch. The water activates the runes as it recedes. The battlefield floods with rune-energy with each tidal surge.',
    lore:'The tidecaller shaped water\'s path. The runeblade shaped the surface water crossed. The Tidal Inscription combined these specialties and found that a tide of rune-laden water produces battlefield coverage that neither technique achieves alone.'
  },

  rune_gravitist: {
    id:'rune_gravitist', name:'The Binding Law', icon:'⚫',
    tagline:'Gravity is the oldest inscription. Everything obeys it.',
    color:'#918044', element:'normal', elementFlavor:'runeweight', rarity:'epic',
    fusedFrom:['runeblade','gravitist'],
    stats:{hp:88,maxHp:88,mp:83,maxMp:83,atk:12,def:8,spd:12,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','normal_gravity_crush','normal_rune_shatter','normal_gravity_pull'],
    burstAbility:'gravitist_burst',
    passives:['rune_mastery','gravity_well'],
    description:'Inscribes gravity-runes that modify the weight of whatever they mark — enemies become impossibly heavy, projectiles are redirected mid-flight, and the Binding Law can trap enemies in place by simply writing that they do not move.',
    lore:'Gravity is a rule. The runeblade wrote rules. The Binding Law found these were the same activity and that the universe will enforce inscribed gravity commands with the same consistency it enforces natural ones, which is completely and without exception.'
  },

  rune_soundbreaker: {
    id:'rune_soundbreaker', name:'The Resonant Inscription', icon:'🔊',
    tagline:'The rune that vibrates at the right frequency shatters everything nearby.',
    color:'#ddaa3c', element:'normal', elementFlavor:'runesound', rarity:'rare',
    fusedFrom:['runeblade','soundbreaker'],
    stats:{hp:90,maxHp:90,mp:78,maxMp:78,atk:13,def:8,spd:14,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_shatter','normal_rune_carve','normal_electric_conduit','normal_electric_spark'],
    burstAbility:'soundbreaker_burst',
    passives:['rune_mastery','resonance'],
    description:'Tunes rune inscriptions to resonant frequencies — each rune vibrates at the harmonic weakness of whatever it is carved on. Armor runes shatter armor. Wall runes collapse walls. Enemy runes find the frequency at which the target\'s biology fails.',
    lore:'The runeblade wrote runes that did things. The soundbreaker found the frequency that made things fail. The Resonant Inscription combined these: runes that describe a frequency, applied to a surface, produce the frequency as a standing wave until the surface stops being a surface.'
  },

  rune_chrono: {
    id:'rune_chrono', name:'The Eternal Mark', icon:'⏳',
    tagline:'Some inscriptions cannot be removed. Some have not been written yet.',
    color:'#c49991', element:'normal', elementFlavor:'runetime', rarity:'epic',
    fusedFrom:['runeblade','chronomancer'],
    stats:{hp:85,maxHp:85,mp:90,maxMp:90,atk:12,def:8,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:9},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_time_echo','normal_rune_mark','normal_time_drain','normal_rune_ward'],
    burstAbility:'chronomancer_burst',
    passives:['rune_mastery','time_warp'],
    description:'Inscribes runes that exist across time — marks placed now that activate in the past, traps written in the present that catch enemies before they knew to avoid them. The Eternal Mark leaves inscriptions in timelines and lets causality enforce them.',
    lore:'The runeblade\'s marks were permanent. The chronomancer\'s marks were temporal. The Eternal Mark found a third category: marks that are both, existing at a fixed point in time that all timelines pass through, which means they cannot be avoided by any technique currently known.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_6);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_6);
  FUSION_LOADED_FILES.add(6);
  if(typeof console!=='undefined') console.debug('[Fusion] File 6 loaded (37 classes)');
})();
