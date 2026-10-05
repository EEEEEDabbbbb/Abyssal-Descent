// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 7 of 17
// Lazy-loaded when a player fuses classes that map to this file.
// Self-registers into DUAL_FUSIONS + FUSION_CLASSES on load.
// ══════════════════════════════════════════════════════════════

const FUSION_RECIPES_7 = {
  'runeblade+spellsword': 'rune_spellsword',
  'plaguedoctor+runeblade': 'rune_plague',
  'geomancer+runeblade': 'rune_geo',
  'lightbringer+runeblade': 'rune_lightbringer',
  'beastmaster+runeblade': 'rune_beast',
  'runeblade+techsavant': 'rune_tech',
  'gravewarden+runeblade': 'rune_grave',
  'magnetist+runeblade': 'rune_magnetist',
  'crystalmancer+runeblade': 'rune_crystal',
  'runeblade+warlord': 'rune_war',
  'runeblade+spiritwalker': 'rune_spirit',
  'hexblade+runeblade': 'rune_hex',
  'cosmomancer+runeblade': 'rune_cosmo',
  'pestilencelord+runeblade': 'rune_pestilence',
  'runeblade+windwalker': 'rune_wind',
  'doomcaster+runeblade': 'rune_doom',
  'arcanist+runeblade': 'rune_arcanist',
  'runeblade+sentinel': 'rune_sentinel',
  'phantom+runeblade': 'rune_phantom',
  'necromancer+paladin': 'necro_paladin',
  'frostweaver+necromancer': 'necro_frost',
  'dragonknight+necromancer': 'necro_dragon',
  'necromancer+tidecaller': 'necro_tide',
  'gravitist+necromancer': 'necro_gravitist',
  'necromancer+soundbreaker': 'necro_soundbreaker',
  'chronomancer+necromancer': 'necro_chrono',
  'necromancer+spellsword': 'necro_spellsword',
  'necromancer+plaguedoctor': 'necro_plague',
  'geomancer+necromancer': 'necro_geo',
  'lightbringer+necromancer': 'necro_lightbringer',
  'beastmaster+necromancer': 'necro_beast',
  'necromancer+techsavant': 'necro_tech',
  'gravewarden+necromancer': 'necro_grave',
  'magnetist+necromancer': 'necro_magnetist',
  'crystalmancer+necromancer': 'necro_crystal',
  'necromancer+warlord': 'necro_war',
  'necromancer+spiritwalker': 'necro_spirit'
};

const FUSION_CLASSES_7 = {
  rune_spellsword: {
    id:'rune_spellsword', name:'The Written Blade', icon:'🔱',
    tagline:'The spell is the rune. The rune is the sword. It is one weapon.',
    color:'#c47766', element:'normal', elementFlavor:'runepsychic', rarity:'rare',
    fusedFrom:['runeblade','spellsword'],
    stats:{hp:95,maxHp:95,mp:75,maxMp:75,atk:13,def:9,spd:13,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_carve','normal_rune_mark','electric_psychic_pulse','electric_psychic_vortex'],
    burstAbility:'spellsword_burst',
    passives:['rune_mastery','spellblade'],
    description:'Every arcane formula is inscribed as a rune, every rune fights as a spell. Psionically-charged runes detonate with mental force on contact. The Written Blade inscribes equations into enemies and solves them with bladed precision.',
    lore:'The spellsword encoded magic in its blade. The runeblade encoded magic in inscriptions. The Written Blade merged the encoding and the blade into a single syntax, and now writes the same sentence in both languages simultaneously.'
  },

  rune_plague: {
    id:'rune_plague', name:'The Infected Inscription', icon:'🔱',
    tagline:'The mark spreads. What the mark says is contagious.',
    color:'#b3aa2b', element:'normal', elementFlavor:'runeplague', rarity:'epic',
    fusedFrom:['runeblade','plaguedoctor'],
    stats:{hp:88,maxHp:88,mp:85,maxMp:85,atk:12,def:8,spd:12,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','normal_rune_drain','fire_poison_plague','fire_bug_plague'],
    burstAbility:'plague_doctor_burst',
    passives:['rune_mastery','immunity'],
    description:'Carves plague-runes that spread disease through the act of inscription — the rune itself is the infection vector. Adjacent enemies not yet marked begin showing symptoms from proximity to marked targets. The Infected Inscription turns every carved mark into a transmission event.',
    lore:'The plaguedoctor recorded symptoms. The runeblade recorded commands. The Infected Inscription found that a rune describing plague is indistinguishable from the plague itself, which solved the transmission problem by making the record the disease.'
  },

  rune_geo: {
    id:'rune_geo', name:'The Carved Earth', icon:'🔱',
    tagline:'The mountain holds the inscription. The inscription holds the mountain.',
    color:'#c4993c', element:'normal', elementFlavor:'runeearth', rarity:'uncommon',
    fusedFrom:['runeblade','geomancer'],
    stats:{hp:100,maxHp:100,mp:70,maxMp:70,atk:13,def:11,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:7,SPD:7,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_ward','normal_rune_carve','fire_ground_quake','fire_rock_strike'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','earth_body'],
    description:'Inscribes runes directly into bedrock — geological wards that trigger when the earth shifts, detonating runes embedded in stone walls and floors. The battlefield is pre-inscribed before the fight begins. The enemy walks into a library of commands.',
    lore:'The geomancer shaped stone. The runeblade inscribed surfaces. The Carved Earth found that stone holds a rune better than anything else in the dungeon, and that the dungeon itself has been waiting for someone to take proper advantage of this.'
  },

  rune_lightbringer: {
    id:'rune_lightbringer', name:'The Illuminated Text', icon:'🔱',
    tagline:'Every rune glows. What it says is bright enough to blind.',
    color:'#eec433', element:'normal', elementFlavor:'runelight', rarity:'rare',
    fusedFrom:['runeblade','lightbringer'],
    stats:{hp:93,maxHp:93,mp:78,maxMp:78,atk:13,def:9,spd:13,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','normal_light_blind','normal_rune_ward','normal_light_dawn'],
    burstAbility:'lightbringer_burst',
    passives:['rune_mastery','radiant'],
    description:'Sacred runes that emit divine light on activation — blinding enemies caught near detonating inscriptions. The battlefield fills with glowing wards that pulse at irregular intervals. Enemies must choose between looking away and missing the next attack.',
    lore:'Runes glow faintly with stored energy. The lightbringer made light a weapon. The Illuminated Text discovered that a rune bright enough to read from across a room is also bright enough to end the conversation prematurely.'
  },

  rune_beast: {
    id:'rune_beast', name:'The Branded Hunt', icon:'🔱',
    tagline:'The mark finds the beast. The beast finds the marked.',
    color:'#b3b333', element:'normal', rarity:'uncommon',
    fusedFrom:['runeblade','beastmaster'],
    stats:{hp:98,maxHp:98,mp:68,maxMp:68,atk:14,def:9,spd:14,crit:13},
    statDisplay:{HP:7,ATK:10,DEF:6,SPD:8,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','normal_dragon_surge','fire_fighting_rage','fire_fighting_combo'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','feral_bond'],
    description:'Brands beasts with hunt-runes that track marked prey over any distance. Rune-marked enemies are visible through walls and attacked with heightened precision. The branded beast pack coordinates strikes through rune-network awareness.',
    lore:'The beastmaster coordinated the hunt. The runeblade marked the prey. The Branded Hunt found that a rune on the target is more reliable than any vocal command, and that beasts following a rune-trail never lose the scent.'
  },

  rune_tech: {
    id:'rune_tech', name:'The Etched Circuit', icon:'🔱',
    tagline:'Runes are ancient code. Circuits are modern runes. They agree on this.',
    color:'#919966', element:'normal', elementFlavor:'runetech', rarity:'epic',
    fusedFrom:['runeblade','techsavant'],
    stats:{hp:90,maxHp:90,mp:83,maxMp:83,atk:13,def:8,spd:14,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_carve','normal_rune_mark','fire_cyber_system_melt','fire_cyber_overclock'],
    burstAbility:'techsavant_burst',
    passives:['rune_mastery','overclock'],
    description:'Etch rune-circuits into both magical and mechanical systems — each inscription is simultaneously an arcane command and a technical exploit. Overloads enemy equipment with runic commands that the technology cannot interpret and cannot ignore.',
    lore:'The techsavant wrote code. The runeblade wrote runes. The Etched Circuit discovered these are the same language compiled for different systems — and that the runic compiler crashes things the code compiler does not reach.'
  },

  rune_grave: {
    id:'rune_grave', name:'The Funerary Script', icon:'🔱',
    tagline:'The inscription on the grave is a command, not a memorial.',
    color:'#998855', element:'normal', elementFlavor:'runesoul', rarity:'rare',
    fusedFrom:['runeblade','gravewarden'],
    stats:{hp:108,maxHp:108,mp:68,maxMp:68,atk:13,def:12,spd:11,crit:12},
    statDisplay:{HP:7,ATK:9,DEF:8,SPD:7,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','water_ghost_haunt','normal_rune_drain','water_ghost_drown'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','undying'],
    description:'Inscribes death-commands into the dead and dying — runes carved on corpses that enforce their continued service. The Funerary Script does not raise the dead through necromancy. It simply writes them a standing order that death cannot override.',
    lore:'The gravewarden managed the deceased. The runeblade managed inscriptions. The Funerary Script found that the most effective command carved on a body is one written before it becomes one, while there is still something present to read the order.'
  },

  rune_magnetist: {
    id:'rune_magnetist', name:'The Magnetic Inscription', icon:'🔱',
    tagline:'The rune draws what it describes. The inscription becomes the force.',
    color:'#99a266', element:'normal', elementFlavor:'runemagnet', rarity:'rare',
    fusedFrom:['runeblade','magnetist'],
    stats:{hp:93,maxHp:93,mp:78,maxMp:78,atk:13,def:9,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','fire_magnet_pull','normal_rune_carve','fire_magnet_flux'],
    burstAbility:'magnetist_burst',
    passives:['rune_mastery','magnetic_field'],
    description:'Magnetic runes that attract metal weapons toward inscribed targets and repel attackers from warded allies. The Magnetic Inscription writes attraction and repulsion commands in durable stone, then lets physics enforce them indefinitely.',
    lore:'Magnetism follows rules. Runes write rules. The Magnetic Inscription found these rules were compatible and that a rune describing attraction produces the attraction as a physical property of the marked surface. The magnetist found this professionally elegant.'
  },

  rune_crystal: {
    id:'rune_crystal', name:'Crystal Scripture', icon:'🔱',
    tagline:'The crystal holds the inscription perfectly. It will hold it forever.',
    color:'#b3b391', element:'normal', elementFlavor:'runecrystal', rarity:'epic',
    fusedFrom:['runeblade','crystalmancer'],
    stats:{hp:85,maxHp:85,mp:85,maxMp:85,atk:14,def:8,spd:14,crit:17},
    statDisplay:{HP:6,ATK:10,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_carve','fire_crystal_refract','fire_crystal_shard','normal_rune_shatter'],
    burstAbility:'crystalmancer_burst',
    passives:['rune_mastery','crystal_body'],
    description:'Grows crystal matrices around rune-inscriptions, preserving and amplifying them indefinitely. Each crystal is a stored command waiting for the right trigger. Shattering Crystal Scripture detonates every stored inscription simultaneously.',
    lore:'Crystal is the ideal inscription medium: hard, clear, permanent. The crystalmancer made it available in quantity. The runeblade used it to write a battlefield-scale library that delivers itself all at once when broken.'
  },

  rune_war: {
    id:'rune_war', name:'The Battle Codex', icon:'🔱',
    tagline:'Tactical doctrine carved in iron. The enemy is the footnote.',
    color:'#d57711', element:'normal', elementFlavor:'runewar', rarity:'rare',
    fusedFrom:['runeblade','warlord'],
    stats:{hp:110,maxHp:110,mp:63,maxMp:63,atk:15,def:11,spd:12,crit:12},
    statDisplay:{HP:7,ATK:11,DEF:8,SPD:7,MP:6},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','normal_rune_ward','fire_fighting_rage','fire_rock_strike'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','battle_hardened'],
    description:'War-runes that encode tactical commands — inscriptions of rallying, feint, advance, and execute written on the battlefield itself. Allies crossing rune-wards receive tactical buffs. Enemies crossing them receive the alternative edition.',
    lore:'Warlords wrote strategy. The runeblade wrote it permanently. The Battle Codex inscribes the entire plan of engagement into the dungeon floor before the enemy arrives, and the battle proceeds as written whether the enemy cooperates or not.'
  },

  rune_spirit: {
    id:'rune_spirit', name:'The Living Glyph', icon:'🔱',
    tagline:'The spirit inhabits the inscription. The inscription inhabits the spirit.',
    color:'#91aa55', element:'normal', elementFlavor:'runespirit', rarity:'epic',
    fusedFrom:['runeblade','spiritwalker'],
    stats:{hp:95,maxHp:95,mp:78,maxMp:78,atk:12,def:9,spd:13,crit:13},
    statDisplay:{HP:6,ATK:8,DEF:6,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','fire_spirit_sanctuary','normal_rune_ward','water_ghost_phase'],
    burstAbility:'spiritwalker_burst',
    passives:['rune_mastery','spirit_bond'],
    description:'Runes that spirits can inhabit — inscriptions become dwelling places for bound souls, each glyph expressing the spiritual energy of what was sealed inside it. Activated Living Glyphs release spiritual force as well as runic power.',
    lore:'Spirits needed vessels. Runes provided them. The Living Glyph found that a spirit sealed in an inscription and a rune charged with power are, at a certain energy level, indistinguishable — and can be released in the same way.'
  },

  rune_hex: {
    id:'rune_hex', name:'The Accursed Mark', icon:'🔱',
    tagline:'The inscription is the hex. Reading it is enough.',
    color:'#b36655', element:'normal', elementFlavor:'bloodrune', rarity:'epic',
    fusedFrom:['runeblade','hexblade'],
    stats:{hp:90,maxHp:90,mp:80,maxMp:80,atk:13,def:8,spd:13,crit:14},
    statDisplay:{HP:6,ATK:9,DEF:5,SPD:8,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','dark_rune_drain','dark_rune_blast','normal_void_curse','normal_dark_drain'],
    burstAbility:'hexblade_burst',
    passives:['rune_mastery','hex_master'],
    description:'Carves hexes as runes — the inscription is simultaneously a mark and a curse. Contact with the Accursed Mark triggers the hex immediately. The rune cannot be removed without triggering it first. There is no safe way to deal with it.',
    lore:'Hexes require delivery. Runes are permanent. The Accursed Mark solved the delivery problem by making the hex its own vessel — written on every surface the runeblade passes, waiting for the moment of contact.'
  },

  rune_cosmo: {
    id:'rune_cosmo', name:'The Astral Codex', icon:'🔱',
    tagline:'The stars were inscribed before the dungeon existed. They have seniority.',
    color:'#916f66', element:'normal', elementFlavor:'runecosmic', rarity:'legendary',
    fusedFrom:['runeblade','cosmomancer'],
    stats:{hp:85,maxHp:85,mp:93,maxMp:93,atk:12,def:7,spd:13,crit:14},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','light_cosmic_blast','light_cosmic_strike','normal_space_consume'],
    burstAbility:'cosmomancer_burst',
    passives:['rune_mastery','stardust'],
    description:'Inscribes cosmic runes — astronomical commands written in the language the stars use. Each glyph corresponds to a celestial body; activating it channels the energy of that body directly. The Astral Codex fights with astronomical leverage.',
    lore:'The cosmomancer read the stars. The runeblade wrote in their language. The Astral Codex discovered that star-runes have gravitational authority — the inscriptions do not just describe stellar forces, they invoke the signatures that those forces recognize as commands.'
  },

  rune_pestilence: {
    id:'rune_pestilence', name:'The Plague Seal', icon:'🔱',
    tagline:'The rune seals the disease. Inside the target.',
    color:'#999911', element:'normal', elementFlavor:'runeplague', rarity:'epic',
    fusedFrom:['runeblade','pestilencelord'],
    stats:{hp:90,maxHp:90,mp:85,maxMp:85,atk:13,def:8,spd:12,crit:13},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:7,MP:8},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','fire_poison_plague','normal_rune_drain','fire_bug_plague'],
    burstAbility:'pestilence_lord_burst',
    passives:['rune_mastery','plague_lord'],
    description:'Seals engineered plagues inside rune-inscriptions on the target — the disease is held dormant by the rune until the seal breaks. Removing the seal releases the plague at full potency with no incubation period. Shattering the Plague Seal is catastrophic.',
    lore:'The pestilencelord needed a way to delay onset. The runeblade provided a containment vessel. The Plague Seal discovered that a plague in suspension is more dangerous than an active one, because it delivers full potency on a schedule rather than over time.'
  },

  rune_wind: {
    id:'rune_wind', name:'The Wind-Written', icon:'🔱',
    tagline:'The wind carries the inscription everywhere it goes. That is everywhere.',
    color:'#b3bb66', element:'normal', elementFlavor:'runewind', rarity:'rare',
    fusedFrom:['runeblade','windwalker'],
    stats:{hp:90,maxHp:90,mp:70,maxMp:70,atk:13,def:8,spd:17,crit:15},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:9,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_mark','fire_wind_cyclone','fire_flying_updraft','normal_rune_carve'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','gust'],
    description:'Rune-inscriptions carried on wind currents — glyphs that travel at gust speed and mark everything they pass through. Moving at 17 SPD, the Wind-Written inscribes the entire battlefield before most enemies complete their first action.',
    lore:'The runeblade carves slowly and carefully. The windwalker suggested doing it quickly across a large area. The Wind-Written does both: the inscriptions are precise, the coverage is total, and the process takes approximately one combat turn.'
  },

  rune_doom: {
    id:'rune_doom', name:'The Final Inscription', icon:'🔱',
    tagline:'The last rune is always the same rune. It says: end.',
    color:'#a26f2b', element:'normal', elementFlavor:'bloodrune', rarity:'legendary',
    fusedFrom:['runeblade','doomcaster'],
    stats:{hp:85,maxHp:85,mp:90,maxMp:90,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','dark_rune_blast','dark_rune_dot_strike','normal_void_drain','dark_rune_drain'],
    burstAbility:'doomcaster_burst',
    passives:['rune_mastery','doom_aura'],
    description:'Inscribes doom in runic form — an irrevocable written sentence carved into the target\'s future. The Final Inscription cannot be removed, cannot be countered, and executes on schedule regardless of what happens in between.',
    lore:'The doomcaster sealed fates verbally. The runeblade sealed them in writing. The Final Inscription found that a doom written in rune is more binding than one spoken — it remains after the speaker leaves, enforced by the inscription itself.'
  },

  rune_arcanist: {
    id:'rune_arcanist', name:'The Theorem Inscribed', icon:'🔱',
    tagline:'The formula written in rune cannot be argued with. Only solved.',
    color:'#996f77', element:'normal', elementFlavor:'runepsychic', rarity:'epic',
    fusedFrom:['runeblade','arcanist'],
    stats:{hp:83,maxHp:83,mp:95,maxMp:95,atk:12,def:7,spd:13,crit:15},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:9},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_carve','normal_rune_drain','electric_psychic_vortex','fire_psychic_fever'],
    burstAbility:'void_burst',
    passives:['rune_mastery','arcane_mastery'],
    description:'Arcane formulae expressed as durable rune-inscriptions — spells that persist after casting because they are written rather than spoken. The Theorem Inscribed does not cast once. It writes once, and the spell continues until the inscription is removed.',
    lore:'The arcanist formulated spells. The runeblade made them permanent. The Theorem Inscribed discovered that a spell written in rune is functionally a trap with infinite duration — it waits patiently for a target and executes when the conditions are met.'
  },

  rune_sentinel: {
    id:'rune_sentinel', name:'The Warded Bastion', icon:'🔱',
    tagline:'The wall is already inscribed. Every approach triggers something.',
    color:'#b39955', element:'normal', elementFlavor:'runeforge', rarity:'uncommon',
    fusedFrom:['runeblade','sentinel'],
    stats:{hp:130,maxHp:130,mp:55,maxMp:55,atk:11,def:14,spd:9,crit:9},
    statDisplay:{HP:9,ATK:8,DEF:9,SPD:5,MP:5},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','normal_rune_ward','normal_rune_mark','fire_steel_quench','fire_ground_ward'],
    burstAbility:'runeblade_burst',
    passives:['rune_mastery','bastion'],
    description:'A fortified position covered in pre-inscribed wards — every approach route is already marked, every attack vector is already trapped, and every inch of defended ground carries standing rune-orders that execute the moment the boundary is crossed.',
    lore:'The sentinel held position. The runeblade inscribed it. The Warded Bastion holds the same position but converts the approach into a scripted event that the attacker did not know they were walking into.'
  },

  rune_phantom: {
    id:'rune_phantom', name:'The Invisible Inscription', icon:'🔱',
    tagline:'The rune you cannot see still executes when you cross it.',
    color:'#b3a26f', element:'normal', elementFlavor:'runesoul', rarity:'legendary',
    fusedFrom:['runeblade','phantom'],
    stats:{hp:85,maxHp:85,mp:75,maxMp:75,atk:14,def:7,spd:16,crit:20},
    statDisplay:{HP:6,ATK:10,DEF:5,SPD:9,MP:7},
    abilities:['rune_strike','bind_rune','runic_shield','elder_rune','water_ghost_phase','normal_rune_mark','normal_void_pierce','water_ghost_wraith'],
    burstAbility:'shadow_burst',
    passives:['rune_mastery','phase'],
    description:'Phases through defenses to inscribe runes on the inside of armor and the inside of enemies. Every rune is invisible from the outside. The Invisible Inscription delivers its commands from within, and nothing outside can reach them to remove them.',
    lore:'The runeblade needed access to inscribe. The phantom provided it. The Invisible Inscription inscribes on surfaces no one else can reach, carving commands in places that cannot be seen, touched, or countered from any conventional exterior approach.'
  },

  necro_paladin: {
    id:'necro_paladin', name:'The Undying Crusade', icon:'💀',
    tagline:'Righteousness does not end at death. Neither does the war.',
    color:'#88bb5e', element:'ghost', elementFlavor:'sacredsoul', rarity:'epic',
    fusedFrom:['necromancer','paladin'],
    stats:{hp:100,maxHp:100,mp:90,maxMp:90,atk:10,def:9,spd:9,crit:9},
    statDisplay:{HP:7,ATK:7,DEF:6,SPD:5,MP:9},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','normal_light_dawn','normal_blood_sacrifice','normal_light_absorb','normal_rune_ward'],
    burstAbility:'necro_burst',
    passives:['death_aura','sacred_aura'],
    description:'The holy war that does not end because the warriors do not stay dead. Raises fallen allies as divine undead who retain the fervor of their cause. Enemy undead are purified into service. Every combatant eventually fights for both sides simultaneously.',
    lore:'The crusade lost its first generation. The second was raised from the first. The Undying Crusade no longer recruits. It simply continues, with the same soldiers who started, until the cause is either won or the dungeon runs out of floors.'
  },

  necro_frost: {
    id:'necro_frost', name:'The Frozen Dead', icon:'💀',
    tagline:'Cold preserves. This is a feature, not a coincidence.',
    color:'#5ec4b3', element:'ghost', elementFlavor:'frosted_ghost', rarity:'epic',
    fusedFrom:['necromancer','frostweaver'],
    stats:{hp:75,maxHp:75,mp:103,maxMp:103,atk:10,def:7,spd:11,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','ice_ghost_wraith','ice_ghost_chill','ice_ghost_siphon','ice_dark_frost'],
    burstAbility:'necro_burst',
    passives:['death_aura','frost_mastery'],
    description:'Raises frost-preserved undead from the cold — undead that have been frozen rather than rotten, in perfect condition, with full combat capability and the added quality of being extremely cold to the touch. Slows enemies with every strike.',
    lore:'Cold preserves bodies better than any necromantic technique. The frostweaver had been doing this accidentally. The Frozen Dead formalized the arrangement, and the resulting undead are both better-preserved and more unsettling than the standard models.'
  },

  necro_dragon: {
    id:'necro_dragon', name:'Dracolicha', icon:'💀',
    tagline:'A dragon does not stay dead. Not when the necromancer is nearby.',
    color:'#888833', element:'ghost', elementFlavor:'dragonspirit', rarity:'epic',
    fusedFrom:['necromancer','dragonknight'],
    stats:{hp:100,maxHp:100,mp:85,maxMp:85,atk:13,def:9,spd:10,crit:11},
    statDisplay:{HP:7,ATK:9,DEF:6,SPD:6,MP:8},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','dragon_dark_surge','dragon_dark_drain','dragon_dark_dot_strike','normal_dragon_wrath'],
    burstAbility:'necro_burst',
    passives:['death_aura','intimidation'],
    description:'Raises draconic undead — skeletal dragons with dark-breath instead of fire, spectral wyrms that pass through walls, and the commanding presence of a dragon combined with the indifference of the dead. Dracolicha does not fear what killed its predecessor.',
    lore:'The dragonknight commanded living dragons. The necromancer commanded the deceased. The Dracolicha negotiated the handoff and found that dragons do not diminish much in death — they lose body heat but gain something harder to quantify and easier to fear.'
  },

  necro_tide: {
    id:'necro_tide', name:'The Drowned Army', icon:'💀',
    tagline:'They drowned. They rose. They are wet about it.',
    color:'#3ca299', element:'ghost', elementFlavor:'tidesoul', rarity:'rare',
    fusedFrom:['necromancer','tidecaller'],
    stats:{hp:78,maxHp:78,mp:105,maxMp:105,atk:10,def:7,spd:11,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','water_ghost_drown','water_ghost_haunt','ice_ghost_chill','water_ghost_phase'],
    burstAbility:'necro_burst',
    passives:['death_aura','tidal_flow'],
    description:'Raises drowned dead from standing water — waterlogged undead that spew the water they died in, summons tide-bound spirits from the deep, and commands an army that arrived from below rather than walking in through the door.',
    lore:'Rivers and seas have battlefields at their bottoms. The tidecaller knew this. The necromancer knew what was at the bottom of those battlefields. The Drowned Army recruits from a population that has been waiting, patient and wet, for exactly this moment.'
  },

  necro_gravitist: {
    id:'necro_gravitist', name:'The Grave Pull', icon:'💀',
    tagline:'Everything falls into the grave. It simply accelerates the falling.',
    color:'#3c8066', element:'ghost', elementFlavor:'gravesoul', rarity:'epic',
    fusedFrom:['necromancer','gravitist'],
    stats:{hp:73,maxHp:73,mp:108,maxMp:108,atk:9,def:6,spd:11,crit:13},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:6,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','normal_gravity_crush','normal_gravity_pull','normal_void_drain','normal_gravity_anchor'],
    burstAbility:'gravitist_burst',
    passives:['death_aura','gravity_well'],
    description:'Uses gravity as a death vector — pulls enemies toward death-zones where undead wait, accelerates the fall of the dying into undeath, and creates gravitational mass from accumulated necrotic energy. Everything falls toward the Grave Pull.',
    lore:'Gravity pulls things down. The grave is down. The Grave Pull made the connection explicit, which is either a profound observation about the nature of mortality or a very efficient combat technique depending on whether you are on the receiving end.'
  },

  necro_soundbreaker: {
    id:'necro_soundbreaker', name:'The Death Knell', icon:'💀',
    tagline:'The bell rings once. Everyone hears it. Not everyone is still standing when it stops.',
    color:'#88aa5e', element:'ghost', elementFlavor:'wailsoul', rarity:'epic',
    fusedFrom:['necromancer','soundbreaker'],
    stats:{hp:75,maxHp:75,mp:103,maxMp:103,atk:11,def:6,spd:13,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','ice_sound_dissonance','ice_sound_shatter','ice_ghost_wraith','ice_ghost_siphon'],
    burstAbility:'necro_burst',
    passives:['death_aura','resonance'],
    description:'Wails of the dead weaponized as sonic attacks — the frequency of death resonates with living tissue at a wavelength that disrupts biological processes. The Death Knell does not announce death. It produces it, harmonically, at range.',
    lore:'Death has a sound. The necromancer knew what it was. The soundbreaker knew how to deploy sound as a weapon. The Death Knell combined these and found that the resonant frequency of dying is broadly effective across most enemy categories.'
  },

  necro_chrono: {
    id:'necro_chrono', name:'The Timeless Grave', icon:'💀',
    tagline:'The dead do not age. Time does not reach the grave.',
    color:'#6f99b3', element:'ghost', elementFlavor:'timeghost', rarity:'epic',
    fusedFrom:['necromancer','chronomancer'],
    stats:{hp:70,maxHp:70,mp:115,maxMp:115,atk:9,def:6,spd:12,crit:12},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:7,MP:11},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','dark_time_drain','dark_time_surge','dark_time_dot_strike','normal_time_age'],
    burstAbility:'chronomancer_burst',
    passives:['death_aura','time_warp'],
    description:'Removes undead from the timeline entirely — they cannot be aged, slowed, or time-locked. Meanwhile, accelerates aging in living enemies, rushing them toward the grave. The Timeless Grave ensures that death is the only destination and time is its instrument.',
    lore:'The dead are outside time. The chronomancer controlled time. The Timeless Grave combined these facts and found that controlling time for the living while granting timelessness to the dead creates a very favorable gap in the rate of decay between the two armies.'
  },

  necro_spellsword: {
    id:'necro_spellsword', name:'The Lich Blade', icon:'💀',
    tagline:'Arcane power and undying will. The blade requires both.',
    color:'#6f7788', element:'ghost', elementFlavor:'mindghost', rarity:'epic',
    fusedFrom:['necromancer','spellsword'],
    stats:{hp:80,maxHp:80,mp:100,maxMp:100,atk:11,def:7,spd:11,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','electric_psychic_pulse','electric_ghost_drain','electric_ghost_surge','ice_ghost_siphon'],
    burstAbility:'necro_burst',
    passives:['death_aura','spellblade'],
    description:'Combines the intellectual precision of arcane spellwork with the raw necrotic authority of undeath mastery — psychic attacks that drain soul fragments mid-flight, and a blade enchanted with ghostly energy that phases through armor.',
    lore:'The spellsword combined intellect and steel. The necromancer combined intellect and death. The Lich Blade found these were the same combination at different operating temperatures, and works best at the coldest end of the spectrum.'
  },

  necro_plague: {
    id:'necro_plague', name:'The Plague Lord\'s Grave', icon:'💀',
    tagline:'The disease outlives the patient. It is preserved in the corpse. The corpse walks.',
    color:'#5eaa4d', element:'ghost', elementFlavor:'plaguesoul', rarity:'epic',
    fusedFrom:['necromancer','plaguedoctor'],
    stats:{hp:73,maxHp:73,mp:110,maxMp:110,atk:9,def:6,spd:10,crit:12},
    statDisplay:{HP:5,ATK:6,DEF:4,SPD:5,MP:11},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','fire_poison_plague','fire_bug_plague','ice_ghost_chill','normal_dark_corrupt'],
    burstAbility:'plague_doctor_burst',
    passives:['death_aura','immunity'],
    description:'Raises plague-bearing undead — each corpse is a walking contagion delivery system, spreading disease on contact while remaining entirely unaffected by whatever it carries. The raised dead are immune to the plague inside them. The living are not.',
    lore:'The necromancer raised the dead. The plaguedoctor studied what killed them. The Plague Lord\'s Grave found that raising a plague victim raises the plague with them, and that the undead host is a perfect carrier: enthusiastic, mobile, and epidemiologically indifferent.'
  },

  necro_geo: {
    id:'necro_geo', name:'The Barrow Mound', icon:'💀',
    tagline:'The earth remembers everything buried in it. Every burial is a resource.',
    color:'#6f995e', element:'ghost', elementFlavor:'earthspirit', rarity:'rare',
    fusedFrom:['necromancer','geomancer'],
    stats:{hp:85,maxHp:85,mp:95,maxMp:95,atk:10,def:9,spd:9,crit:10},
    statDisplay:{HP:6,ATK:7,DEF:6,SPD:5,MP:9},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','fire_ground_quake','fire_rock_strike','water_ghost_haunt','normal_dark_consume'],
    burstAbility:'necro_burst',
    passives:['death_aura','earth_body'],
    description:'Commands from below — raises the dead directly from the earth beneath the enemy\'s feet, uses geomantic tremors to expose buried remains, and shapes the terrain into burial mounds that generate undead continuously while the fight lasts.',
    lore:'The geomancer shaped the earth. The necromancer shaped what was in the earth. The Barrow Mound combined these practices and found that every dungeon floor is substantially composed of previous adventurers, which is a strategic resource the previous owners are not using.'
  },

  necro_lightbringer: {
    id:'necro_lightbringer', name:'The Graveside Vigil', icon:'💀',
    tagline:'The light at the grave is not comforting. It illuminates what is still moving.',
    color:'#99c455', element:'ghost', elementFlavor:'sacredsoul', rarity:'epic',
    fusedFrom:['necromancer','lightbringer'],
    stats:{hp:78,maxHp:78,mp:103,maxMp:103,atk:11,def:7,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','normal_light_dawn','normal_light_blind','dragon_light_strike','dragon_light_drain'],
    burstAbility:'necro_burst',
    passives:['death_aura','radiant'],
    description:'Radiant undead that illuminate as they fight — holy light channeled through necrotic forms creates blinding spectral figures that deal both light damage and necrotic drain. The living cannot look at them directly. The dead have no preference.',
    lore:'The lightbringer lit the way. The necromancer lit the grave. The Graveside Vigil combines these practices and found that undead carrying divine light are more unsettling than standard models — which is a category improvement the necromancer had not previously attempted.'
  },

  necro_beast: {
    id:'necro_beast', name:'The Dead Pack', icon:'💀',
    tagline:'The pack runs forever. It has no choice in the matter.',
    color:'#5eb355', element:'ghost', elementFlavor:'runesoul', rarity:'rare',
    fusedFrom:['necromancer','beastmaster'],
    stats:{hp:83,maxHp:83,mp:93,maxMp:93,atk:12,def:7,spd:12,crit:12},
    statDisplay:{HP:6,ATK:8,DEF:5,SPD:7,MP:9},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','ice_ghost_chill','fire_fighting_rage','normal_dragon_surge','normal_blood_feast'],
    burstAbility:'necro_burst',
    passives:['death_aura','feral_bond'],
    description:'Commands a pack of undead animals — raised predators that retain hunting instincts and pack coordination while no longer requiring food, rest, or survival instinct. The Dead Pack hunts with the efficiency of the living and the persistence of the dead.',
    lore:'The beastmaster commanded beasts that needed managing. The necromancer commanded things that did not. The Dead Pack combined these disciplines and found that undead animals require considerably less negotiation than living ones, while being comparably effective at the actual work.'
  },

  necro_tech: {
    id:'necro_tech', name:'The Undying Machine', icon:'💀',
    tagline:'The machine never lived. It cannot die. These statements are compatible.',
    color:'#3c9988', element:'ghost', elementFlavor:'techghost', rarity:'epic',
    fusedFrom:['necromancer','techsavant'],
    stats:{hp:75,maxHp:75,mp:108,maxMp:108,atk:10,def:6,spd:12,crit:13},
    statDisplay:{HP:5,ATK:7,DEF:4,SPD:7,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','fire_cyber_system_melt','electric_ghost_surge','electric_ghost_drain','fire_cyber_data_leech'],
    burstAbility:'techsavant_burst',
    passives:['death_aura','overclock'],
    description:'Animates mechanical constructs with necrotic energy — machines that should be inert run on death-force, overclocked past design limits because the necromantic driver ignores safety systems. The Undying Machine does not overheat. It overcomes.',
    lore:'The techsavant built machines. The necromancer animated things. The Undying Machine found that machines are simply undead that were never alive, which resolved the ethical question considerably and dramatically expanded the available recruitment pool.'
  },

  necro_grave: {
    id:'necro_grave', name:'The Master of Graves', icon:'💀',
    tagline:'Every grave is a barracks. This one has the key to all of them.',
    color:'#448877', element:'ghost', rarity:'rare',
    fusedFrom:['necromancer','gravewarden'],
    stats:{hp:93,maxHp:93,mp:93,maxMp:93,atk:10,def:9,spd:9,crit:10},
    statDisplay:{HP:7,ATK:7,DEF:6,SPD:5,MP:9},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','water_ghost_haunt','water_ghost_drown','ice_ghost_wraith','water_ghost_phase'],
    burstAbility:'necro_burst',
    passives:['death_aura','undying'],
    description:'Commands the graves themselves — raises undead in waves from prepared burial sites, maintains graveyards as fortified positions, and refuses to be put down permanently as long as any grave within range remains filled.',
    lore:'The gravewarden kept the graves. The necromancer opened them. The Master of Graves resolved this tension by treating every burial as preparation and every grave as logistics. The gravewarden now works for the necromancer, conceptually speaking.'
  },

  necro_magnetist: {
    id:'necro_magnetist', name:'The Iron Dead', icon:'💀',
    tagline:'The skeleton rattles for a reason. The reason is magnetic.',
    color:'#44a288', element:'ghost', elementFlavor:'magnetghost', rarity:'epic',
    fusedFrom:['necromancer','magnetist'],
    stats:{hp:78,maxHp:78,mp:103,maxMp:103,atk:11,def:7,spd:11,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:6,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','fire_magnet_pull','fire_magnet_flux','electric_ghost_drain','ice_ghost_siphon'],
    burstAbility:'necro_burst',
    passives:['death_aura','magnetic_field'],
    description:'Raises magnetically-animated undead — skeletons held together by magnetic force rather than necromantic energy, making them resistant to turning and dismissal. The Iron Dead draws metallic weapons away from enemies and into skeletal hands.',
    lore:'Bones contain iron. Magnets attract iron. The necromancer provided the bones; the magnetist provided the force. The Iron Dead found that magnetic animation produces undead with considerably better structural integrity than traditional necromantic methods.'
  },

  necro_crystal: {
    id:'necro_crystal', name:'The Crystal Tomb', icon:'💀',
    tagline:'The crystal preserves the dead perfectly. They are preserved indefinitely.',
    color:'#5eb3b3', element:'ghost', elementFlavor:'crystalghost', rarity:'legendary',
    fusedFrom:['necromancer','crystalmancer'],
    stats:{hp:70,maxHp:70,mp:110,maxMp:110,atk:12,def:6,spd:12,crit:15},
    statDisplay:{HP:5,ATK:8,DEF:4,SPD:7,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','ice_ghost_ethereal','ice_ghost_phantasm','fire_crystal_refract','fire_crystal_shard'],
    burstAbility:'crystalmancer_burst',
    passives:['death_aura','crystal_body'],
    description:'Entombs undead in crystal matrices — perfectly preserved, indefinitely durable, and able to refract necrotic energy through crystal facets to strike from multiple angles. Shattering crystal-encased undead releases everything stored inside simultaneously.',
    lore:'The crystalmancer preserved things in crystal. The necromancer preserved things in undeath. The Crystal Tomb combined these preservation methods and found that crystal-encased undead are harder to destroy and considerably more unpleasant to fight than either discipline produced independently.'
  },

  necro_war: {
    id:'necro_war', name:'The Endless Legion', icon:'💀',
    tagline:'The army that replenishes itself from its own casualties is the only army that cannot be routed.',
    color:'#807733', element:'ghost', elementFlavor:'warsoul', rarity:'rare',
    fusedFrom:['necromancer','warlord'],
    stats:{hp:95,maxHp:95,mp:88,maxMp:88,atk:13,def:9,spd:11,crit:11},
    statDisplay:{HP:6,ATK:9,DEF:6,SPD:6,MP:8},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','fire_fighting_rage','normal_blood_feast','normal_dragon_roar','fire_fighting_ignite'],
    burstAbility:'necro_burst',
    passives:['death_aura','battle_hardened'],
    description:'Warlord tactics applied to an undead army that replaces itself from every enemy killed — casualties join the Endless Legion\'s ranks mid-combat. The tactical problem of attrition simply does not apply when the enemy\'s deaths are recruitment.',
    lore:'The warlord managed logistics. The necromancer solved them. The Endless Legion was the solution: an army with a supply line that runs through the enemy, which dramatically simplifies the traditional problems of provisioning and reinforcement.'
  },

  necro_spirit: {
    id:'necro_spirit', name:'The Ancestor Choir', icon:'💀',
    tagline:'The dead speak. The necromancer has given them a great deal to say.',
    color:'#3caa77', element:'ghost', elementFlavor:'spiritghost', rarity:'epic',
    fusedFrom:['necromancer','spiritwalker'],
    stats:{hp:80,maxHp:80,mp:103,maxMp:103,atk:10,def:7,spd:12,crit:12},
    statDisplay:{HP:5,ATK:7,DEF:5,SPD:7,MP:10},
    abilities:['raise_dead','soul_drain','bone_armor','undead_army','electric_spirit_surge','electric_spirit_possession','water_ghost_phase','electric_ghost_chain'],
    burstAbility:'spiritwalker_burst',
    passives:['death_aura','spirit_bond'],
    description:'Summons the spirits of the honored dead alongside raised physical remains — the spirit choir provides guidance and additional ranged spiritual attacks while the physical undead engage at close range. Two armies from one source.',
    lore:'The spiritwalker communed with the dead peacefully. The necromancer communed with them professionally. The Ancestor Choir found a configuration where both relationships coexist: the spirits are consulted, the remains are deployed, and the distinction between the two armies gets complicated around the third wave.'
  }
};

(function(){
  Object.assign(DUAL_FUSIONS, FUSION_RECIPES_7);
  Object.assign(FUSION_CLASSES, FUSION_CLASSES_7);
  FUSION_LOADED_FILES.add(7);
  if(typeof console!=='undefined') console.debug('[Fusion] File 7 loaded (37 classes)');
})();
