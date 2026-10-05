// ══════════════════════════════════════════════════════════════
// FUSION DATA — File 17 of 17
// Nullbringer fusions (35 combinations)
// The Sunder classes: Nullbringer + every other base class
// ══════════════════════════════════════════════════════════════

(function(){
  FUSION_LOADED_FILES.add(17);

  // ── RECIPE KEYS ──
  DUAL_FUSIONS['arcanist+nullbringer']    = 'unwritten_law';
  DUAL_FUSIONS['beastmaster+nullbringer'] = 'null_beast';
  DUAL_FUSIONS['bloodknight+nullbringer'] = 'blood_null';
  DUAL_FUSIONS['chronomancer+nullbringer']= 'null_chronomancer';
  DUAL_FUSIONS['cosmomancer+nullbringer'] = 'cosmic_null';
  DUAL_FUSIONS['crystalmancer+nullbringer']='null_crystal';
  DUAL_FUSIONS['doomcaster+nullbringer']  = 'doom_null';
  DUAL_FUSIONS['dragonknight+nullbringer']= 'null_dragon';
  DUAL_FUSIONS['frostweaver+nullbringer'] = 'null_frost';
  DUAL_FUSIONS['geomancer+nullbringer']   = 'null_earth';
  DUAL_FUSIONS['gravewarden+nullbringer'] = 'grave_null';
  DUAL_FUSIONS['gravitist+nullbringer']   = 'null_gravity';
  DUAL_FUSIONS['hexblade+nullbringer']    = 'null_hexblade';
  DUAL_FUSIONS['ironclad+nullbringer']    = 'null_vanguard';
  DUAL_FUSIONS['lightbringer+nullbringer']= 'light_null';
  DUAL_FUSIONS['magnetist+nullbringer']   = 'null_magnetist';
  DUAL_FUSIONS['necromancer+nullbringer'] = 'null_necromancer';
  DUAL_FUSIONS['nullbringer+paladin']     = 'null_paladin';
  DUAL_FUSIONS['nullbringer+pestilencelord']='null_plague_lord';
  DUAL_FUSIONS['nullbringer+phantom']     = 'phantom_null';
  DUAL_FUSIONS['nullbringer+plaguedoctor']= 'null_doctor';
  DUAL_FUSIONS['nullbringer+pyromancer']  = 'null_flame';
  DUAL_FUSIONS['nullbringer+runeblade']   = 'null_runeblade';
  DUAL_FUSIONS['nullbringer+sentinel']    = 'null_sentinel';
  DUAL_FUSIONS['nullbringer+shadowblade'] = 'null_shadow';
  DUAL_FUSIONS['nullbringer+soulweaver']  = 'null_soulweaver';
  DUAL_FUSIONS['nullbringer+soundbreaker']= 'null_resonance';
  DUAL_FUSIONS['nullbringer+spellsword']  = 'null_spellsword';
  DUAL_FUSIONS['nullbringer+spiritwalker']= 'null_spiritwalker';
  DUAL_FUSIONS['nullbringer+stormcaller'] = 'null_storm';
  DUAL_FUSIONS['nullbringer+techsavant']  = 'null_savant';
  DUAL_FUSIONS['nullbringer+tidecaller']  = 'null_tide';
  DUAL_FUSIONS['nullbringer+voidmancer']  = 'void_null';
  DUAL_FUSIONS['nullbringer+warlord']     = 'null_warlord';
  DUAL_FUSIONS['nullbringer+windwalker']  = 'null_wind';

  // ── FUSION CLASS DEFINITIONS ──
  Object.assign(FUSION_CLASSES, {

    unwritten_law: {
      id:'unwritten_law', name:'The Unwritten Law', icon:'🌑',
      tagline:'Every formula has an axiom. This one removed the axiom and found the formula still ran.',
      color:'#88ffff', element:'void', elementFlavor:'voidpsychic', rarity:'divine',
      fusedFrom:['nullbringer','arcanist'],
      stats:{hp:86,maxHp:86,mp:124,maxMp:124,atk:11,def:5,spd:12,crit:16},
      statDisplay:{HP:6,ATK:7,DEF:3,SPD:6,MP:10},
      abilities:['necrotic_bolt','psychic_rend','gravity_crush','necrotic_bolt','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','soul_harvest'],
      description:'Arcane theory applied to the mechanism of Sunder — each Sunder stack analyzed as a variable in a running formula, amplified by Anatomical Study as the equation becomes more complex. The Unwritten Law derived the formula for dismantling a thing before it knew it was being dismantled.',
      lore:'The arcanist derived formulae within a framework of axioms. The nullbringer had no axioms: only the Sunder, and the Sunder needs no justification. The Unwritten Law found that removing the axiomatic framework does not prevent the formula from running — it only removes the ceiling the framework imposed. The resulting equations operate on things the original framework did not permit equations to address.'
    },

    null_beast: {
      id:'null_beast', name:'The Erasing Hunt', icon:'🌑',
      tagline:'The pack that hunts to eliminate, not to eat.',
      color:'#ffaa00', element:'void', elementFlavor:'voidnature', rarity:'legendary',
      fusedFrom:['nullbringer','beastmaster'],
      stats:{hp:111,maxHp:111,mp:92,maxMp:92,atk:14,def:8,spd:14,crit:15},
      statDisplay:{HP:8,ATK:9,DEF:5,SPD:7,MP:8},
      abilities:['feral_strike','pack_howl','savage_bite','feral_strike','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','vital_hunger'],
      description:'Predatory instinct in service of the Sunder — animals that do not tear to consume but to unmake, coordinating Sunder application across every pack member simultaneously. Anatomical Study converts the beastmaster\'s knowledge of prey anatomy into Sunder precision.',
      lore:'The beastmaster taught animals where to strike for fastest kills. The nullbringer taught them where to strike to Sunder. The Erasing Hunt found these were different knowledge systems with different outcomes: killing ends the target, Sunder ends the target\'s existence as a coherent thing. The pack learned the difference and prefers the latter, which the beastmaster notes is a change in motivation they did not predict.'
    },

    blood_null: {
      id:'blood_null', name:'The Hemorrhaging Void', icon:'🌑',
      tagline:'Pain feeds the bloodknight. The void feeds on what the bloodknight becomes.',
      color:'#cc2244', element:'void', elementFlavor:'voidblood', rarity:'legendary',
      fusedFrom:['nullbringer','bloodknight'],
      stats:{hp:116,maxHp:116,mp:89,maxMp:89,atk:14,def:9,spd:11,crit:12},
      statDisplay:{HP:8,ATK:9,DEF:6,SPD:6,MP:7},
      abilities:['bloodlust','crimson_slash','sacrifice','blood_nova','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','vital_hunger'],
      description:'The bloodknight\'s pain-conversion feeding the Sunder mechanism — every wound received increases Sunder potency, and every Sunder stack converts biological coherence to blood-borne void. The Hemorrhaging Void converts injury into erasure in both directions simultaneously.',
      lore:'The bloodknight drew strength from pain. The nullbringer drew strength from unmaking. The Hemorrhaging Void found these were two expressions of the same appetite: both require something to be broken. The distinction is that the bloodknight breaks things for power and the nullbringer breaks them for finality, and the fusion pursues both simultaneously, which doubles the efficiency of every hit.'
    },

    null_chronomancer: {
      id:'null_chronomancer', name:'The Suspended Erasure', icon:'🌑',
      tagline:'Time was stopped so the Sunder could finish. Time does not restart the same.',
      color:'#aaffcc', element:'void', elementFlavor:'voidtime', rarity:'mythical',
      fusedFrom:['nullbringer','chronomancer'],
      stats:{hp:89,maxHp:89,mp:116,maxMp:116,atk:12,def:6,spd:13,crit:14},
      statDisplay:{HP:6,ATK:8,DEF:4,SPD:7,MP:10},
      abilities:['time_slash','rewind','timestop','time_slash','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','soul_harvest'],
      description:'Sunder delivered across suspended time — the chronomancer stops the moment, the nullbringer applies all four Sunder stacks simultaneously, and when time resumes the target is already in the process of being unmade. Sunder_time delivers the temporal dimension of erasure to a target frozen in the moment.',
      lore:'The chronomancer froze time to extend the advantage window. The nullbringer used that window to apply every Sunder simultaneously. The Suspended Erasure found that delivering the complete Sunder suite at a single moment — rather than sequentially — produces a compression effect on the target that time was not designed to accommodate, and that when time resumes, it resumes around a target that has been completely and instantaneously addressed by all four dimensions of erasure at once.'
    },

    cosmic_null: {
      id:'cosmic_null', name:'The Void Between Stars', icon:'🌑',
      tagline:'Space is mostly nothing. This is the nothing between the somethings.',
      color:'#2222aa', element:'void', elementFlavor:'voidcosmic', rarity:'divine',
      fusedFrom:['nullbringer','cosmomancer'],
      stats:{hp:86,maxHp:86,mp:124,maxMp:124,atk:11,def:5,spd:11,crit:16},
      statDisplay:{HP:6,ATK:7,DEF:3,SPD:6,MP:10},
      abilities:['stardust','nebula_shield','supernova','stardust','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','stardust'],
      description:'The cosmomancer\'s astronomical range applied to Sunder delivery — the void between stars given agency and directed at a single target. The Void Between Stars applies Sunder at cosmological force, each stack backed by the mass of astronomical nothingness that the cosmomancer controls.',
      lore:'The cosmomancer worked with stellar masses. The nullbringer worked with the absence between them. The Void Between Stars found that the void between stars constitutes most of the universe\'s volume and that channeling it through the Sunder mechanism makes the nullbringer\'s erasure cosmological rather than personal — the target is not being erased by someone, they are being erased by the structural absence that comprises most of reality.'
    },

    null_crystal: {
      id:'null_crystal', name:'The Shattering Nothing', icon:'🌑',
      tagline:'The crystal focuses the void to a point. The point is precise.',
      color:'#aaccff', element:'void', elementFlavor:'voidcrystal', rarity:'divine',
      fusedFrom:['nullbringer','crystalmancer'],
      stats:{hp:90,maxHp:90,mp:115,maxMp:115,atk:12,def:6,spd:12,crit:17},
      statDisplay:{HP:6,ATK:8,DEF:4,SPD:7,MP:10},
      abilities:['crystal_shot','crystal_barrier','prism_blast','crystal_shot','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','crystal_body'],
      description:'The void focused through crystal facets — each Sunder stack delivered with the precision of a crystal-refracted beam, striking at exact molecular geometry. The Shattering Nothing uses crystal mathematics to place Sunder exactly where Anatomical Study identifies the optimal target point.',
      lore:'The crystalmancer focused light to a point with mathematical precision. The nullbringer focused erasure. The Shattering Nothing found that the void, like light, can be refracted to a geometric point and that a Sunder delivered at that precision affects the target\'s structural coherence at the level the geometry specifies — which, with crystal precision, is any level the crystalmancer chooses to specify.'
    },

    doom_null: {
      id:'doom_null', name:'The Foreclosed Existence', icon:'🌑',
      tagline:'The doom sealed the fate. The null erases what the doom sealed.',
      color:'#330033', element:'void', elementFlavor:'voiddoom', rarity:'divine',
      fusedFrom:['nullbringer','doomcaster'],
      stats:{hp:85,maxHp:85,mp:127,maxMp:127,atk:11,def:5,spd:11,crit:16},
      statDisplay:{HP:6,ATK:7,DEF:3,SPD:6,MP:11},
      abilities:['doom_bolt','inevitable_end','apocalypse','doom_bolt','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','doom_aura'],
      description:'The doom as precondition for the Sunder — fate sealed first, then unmade. The Foreclosed Existence forecloses the target\'s future before systematically removing their present, ensuring that even if the Sunder process were interrupted, the outcome is already sealed in the doom seal.',
      lore:'The doomcaster sealed fates. The nullbringer erased outcomes. The Foreclosed Existence found these were sequenced operations that produce different results than either alone: the doom removes the possibility of alternate outcomes, and then the Sunder removes the only outcome that remains. The target is not destroyed — they are sealed into a terminal state and then the terminal state is unmade, which is a distinction the doomcaster finds philosophically precise.'
    },

    null_dragon: {
      id:'null_dragon', name:'The Unscaled Wyrm', icon:'🌑',
      tagline:'The dragon that has had its nature removed is still the largest predator in the room.',
      color:'#664400', element:'void', elementFlavor:'voiddrgaon', rarity:'mythical',
      fusedFrom:['nullbringer','dragonknight'],
      stats:{hp:113,maxHp:113,mp:97,maxMp:97,atk:15,def:9,spd:12,crit:13},
      statDisplay:{HP:8,ATK:10,DEF:6,SPD:7,MP:8},
      abilities:['dragon_strike','scale_armor','wyrm_breath','ancient_roar','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','dragon_scales'],
      description:'The dragonknight\'s physical supremacy channeled into Sunder delivery — every strike carries the mass and force of draconic heritage, and every hit applies a Sunder stack with anatomical precision to the target\'s most critical structure. The Unscaled Wyrm dismantles the way only apex predators can.',
      lore:'The dragonknight was ancient and unassailable. The nullbringer removed the permanence of those properties. The Unscaled Wyrm found that the dragonknight\'s physical capabilities remain unchanged when the nullbringer\'s influence is added; what changes is the purpose those capabilities serve. The dragon still strikes with full draconic force. The Sunder is what the force is delivering, which the Wyrm considers an improvement in precision.'
    },

    null_frost: {
      id:'null_frost', name:'The Absolute Cold', icon:'🌑',
      tagline:'Absolute zero is the temperature at which molecular motion ceases. The Sunder addresses what remains.',
      color:'#88eeee', element:'void', elementFlavor:'voidice', rarity:'mythical',
      fusedFrom:['nullbringer','frostweaver'],
      stats:{hp:90,maxHp:90,mp:113,maxMp:113,atk:12,def:6,spd:11,crit:15},
      statDisplay:{HP:6,ATK:8,DEF:4,SPD:6,MP:10},
      abilities:['glacial_spike','frost_nova','blizzard_wall','absolute_zero','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','frost_armor'],
      description:'The frostweaver\'s absolute cold applied to Sunder preparation — ice arrests biological function, and the Sunder stacks are applied to a target whose defenses are suspended by cold. Sunder_flesh works more efficiently on frozen tissue; Sunder_will on a mind slowed to near-stillness.',
      lore:'The frostweaver slowed things to stillness. The nullbringer required stillness to apply Sunder precisely. The Absolute Cold found that a target arrested by cold is optimally prepared for Sunder delivery — the biological and cognitive defenses that would normally resist each stack are running at a fraction of their capacity, and the Sunder does not require the target to be cooperating in order to work.'
    },

    null_earth: {
      id:'null_earth', name:'The Ungrounded', icon:'🌑',
      tagline:'The stone that forgets it is stone is no longer a foundation. It is rubble that has not fallen yet.',
      color:'#887755', element:'void', elementFlavor:'voidearth', rarity:'legendary',
      fusedFrom:['nullbringer','geomancer'],
      stats:{hp:119,maxHp:119,mp:92,maxMp:92,atk:12,def:11,spd:10,crit:11},
      statDisplay:{HP:8,ATK:8,DEF:7,SPD:6,MP:8},
      abilities:['rock_throw','earth_wall','seismic_wave','rock_throw','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','earth_body'],
      description:'Geological force in service of the Sunder — the geomancer\'s earth attacks each delivering a Sunder stack, the dungeon walls themselves contributing to the dismantling. The Ungrounded removes the foundation of whatever it strikes: physical, structural, and existential.',
      lore:'The geomancer moved stone because stone endures. The nullbringer moved stone because stone could be used to Sunder. The Ungrounded found that geological force is the most ancient force available and that applying Sunder through geological mass means the target is being dismantled by something that has been doing this — existing, pressing down, eroding — since before consciousness was a concept.'
    },

    grave_null: {
      id:'grave_null', name:'The Open Grave', icon:'🌑',
      tagline:'The grave that waited. The null that fills it with something that was not ready.',
      color:'#557755', element:'void', elementFlavor:'voidgrave', rarity:'legendary',
      fusedFrom:['nullbringer','gravewarden'],
      stats:{hp:99,maxHp:99,mp:105,maxMp:105,atk:12,def:8,spd:11,crit:13},
      statDisplay:{HP:7,ATK:8,DEF:6,SPD:6,MP:9},
      abilities:['grave_touch','bone_armor','death_knell','grave_touch','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','undying'],
      description:'The gravewarden prepares the interment; the nullbringer accelerates the arrival. The Open Grave applies Sunder stacks that systematically prepare the target for burial, each stack completing another stage of what the grave has been waiting to receive.',
      lore:'The gravewarden maintained graves for those who would eventually need them. The nullbringer had strong opinions about the timeline. The Open Grave found that a grave prepared before the target\'s death is not premature — it is accurate. The Sunder does not kill the target; it advances them through the stages of becoming what the grave was built for, which the gravewarden finds professionally satisfying and the target finds unwelcome.'
    },

    null_gravity: {
      id:'null_gravity', name:'The Crushing Absence', icon:'🌑',
      tagline:'Gravity pulls toward mass. The null is the absence of mass. Both collapse.',
      color:'#444466', element:'void', elementFlavor:'voidgravity', rarity:'mythical',
      fusedFrom:['nullbringer','gravitist'],
      stats:{hp:88,maxHp:88,mp:119,maxMp:119,atk:13,def:6,spd:11,crit:15},
      statDisplay:{HP:6,ATK:9,DEF:4,SPD:6,MP:10},
      abilities:['gravity_well','crush','event_horizon','gravity_well','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','gravity_mastery'],
      description:'Gravitational force and void erasure combined — the gravitist compresses the target, and each layer of compression is met by a Sunder stack that addresses the compressed matter at its new density. The Crushing Absence works inward and outward simultaneously.',
      lore:'The gravitist compressed matter. The nullbringer erased what compression revealed. The Crushing Absence found that gravitational compression removes the structural protection that bulk provides, and that Sunder applied to a compressed target is more efficient because the spatial relationship between vulnerable components has been reduced. The null waits inside the event horizon the gravitist created, which is where the Sunder works best.'
    },

    null_hexblade: {
      id:'null_hexblade', name:'The Unmaking Curse', icon:'🌑',
      tagline:'The curse removes resistance. The Sunder removes what was resisting.',
      color:'#663388', element:'void', elementFlavor:'voidhex', rarity:'mythical',
      fusedFrom:['nullbringer','hexblade'],
      stats:{hp:96,maxHp:96,mp:105,maxMp:105,atk:14,def:7,spd:12,crit:16},
      statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:9},
      abilities:['hex_strike','doom_sigil','hex_strike','doom_sigil','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','hex_master'],
      description:'Hexes calibrated to remove Sunder resistance — each curse suppresses a different defensive layer, and each Sunder stack follows into the gap. The Unmaking Curse is the most complete preparation for Sunder delivery available: hex first, then the Sunder that the hex was preparing for.',
      lore:'The hexblade weakened targets before attacking. The nullbringer needed weakened targets for efficient Sunder delivery. The Unmaking Curse found these were the same operation described from different endpoints: the hex removes resistance, the Sunder operates without resistance, and the two together produce a dismantling that neither alone achieves — because a Sunder against a hexed target progresses at a rate that exceeds what the target can regenerate or reconstitute.'
    },

    null_vanguard: {
      id:'null_vanguard', name:'The Iron Unmaking', icon:'🌑',
      tagline:'The armor held. The Sunder addressed what the armor was protecting.',
      color:'#667799', element:'void', elementFlavor:'voidsteel', rarity:'legendary',
      fusedFrom:['nullbringer','ironclad'],
      stats:{hp:127,maxHp:127,mp:84,maxMp:84,atk:11,def:11,spd:10,crit:10},
      statDisplay:{HP:9,ATK:7,DEF:7,SPD:6,MP:7},
      abilities:['shield_bash','fortify','retaliate','warcry','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','iron_will'],
      description:'The ironclad\'s immovable defense housing the Sunder — a 127 HP wall that applies Sunder stacks with every defensive action. The Iron Unmaking holds its position while systematically dismantling whatever is attacking it, converting the ironclad\'s durability into a Sunder delivery platform.',
      lore:'The ironclad was built to survive everything. The nullbringer was built to end everything. The Iron Unmaking found that these purposes are compatible over time: survive the initial assault, apply Sunder stacks through each exchange, hold the position until the Sunder completes its work. The armor did not make the target invincible — it made them patient enough to wait for the Sunder to finish.'
    },

    light_null: {
      id:'light_null', name:'The Sacred Erasure', icon:'🌑',
      tagline:'The light judges. The null carries out the judgment.',
      color:'#ffffaa', element:'void', elementFlavor:'voidlight', rarity:'mythical',
      fusedFrom:['nullbringer','lightbringer'],
      stats:{hp:108,maxHp:108,mp:103,maxMp:103,atk:12,def:9,spd:11,crit:13},
      statDisplay:{HP:7,ATK:8,DEF:6,SPD:6,MP:9},
      abilities:['radiant_strike','blinding_flash','divine_judgment','radiant_strike','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','radiant'],
      description:'Divine light as the authority for Sunder — the lightbringer provides the judgment, the nullbringer provides the execution. The Sacred Erasure does not destroy its targets; it removes them with theological authority, each Sunder stack a step in a process that the light has deemed necessary.',
      lore:'The lightbringer passed judgment. The nullbringer executed it. The Sacred Erasure found that divine authority and the Sunder mechanism are compatible — the light identifies what should not persist, and the null removes it at the structural level the judgment specifies. The combination is notable for being the only form of erasure that arrives with an official theological rationale, which the target may find either comforting or unhelpful depending on their beliefs.'
    },

    null_magnetist: {
      id:'null_magnetist', name:'The Magnetic Disassembly', icon:'🌑',
      tagline:'The field pulls components apart. The Sunder addresses what the field separated.',
      color:'#5599bb', element:'void', elementFlavor:'voidmagnet', rarity:'mythical',
      fusedFrom:['nullbringer','magnetist'],
      stats:{hp:94,maxHp:94,mp:108,maxMp:108,atk:13,def:7,spd:12,crit:14},
      statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:9},
      abilities:['magnetic_pull','iron_rain','magnetic_pull','iron_rain','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','magnetic_field'],
      description:'The magnetic field as a disassembly tool for the Sunder — pulling the target\'s components apart so each Sunder stack can address them individually. The Magnetic Disassembly converts the magnetist\'s pulling force into anatomical precision, pre-separating what Anatomical Study identifies as distinct structures.',
      lore:'The magnetist separated ferrous components by field force. The nullbringer needed components separated before applying Sunder. The Magnetic Disassembly found that the field and the Sunder work in sequence: the field performs the preliminary separation that makes Sunder delivery precise, and the Sunder addresses the separated components rather than the composite target, which is more efficient than working against structural integrity that the magnetic field has already compromised.'
    },

    null_necromancer: {
      id:'null_necromancer', name:'The Final Death', icon:'🌑',
      tagline:'The necromancer raises the dead. The null ensures they do not rise again.',
      color:'#334433', element:'void', elementFlavor:'voidnecro', rarity:'mythical',
      fusedFrom:['nullbringer','necromancer'],
      stats:{hp:89,maxHp:89,mp:127,maxMp:127,atk:11,def:6,spd:11,crit:13},
      statDisplay:{HP:6,ATK:7,DEF:4,SPD:6,MP:10},
      abilities:['corpse_bolt','plague','raise_dead','death_spiral','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','death_mastery'],
      description:'The necromancer\'s death authority and the Sunder\'s permanent removal combined — the Final Death raises the fallen as temporary allies and then applies Sunder to everything in range, including the undead allies, converting the entire battlefield into Sunder delivery. What the Sunder processes does not return.',
      lore:'The necromancer mastered death and its reversal. The nullbringer mastered something past reversal. The Final Death found these were endpoints of the same axis: the necromancer controls the boundary between death and undeath, and the nullbringer erases the boundary entirely. What the Final Death applies the Sunder to no longer has a boundary to control, which makes the necromancer\'s reanimation techniques inapplicable in a way that even the necromancer acknowledges with professional respect.'
    },

    null_paladin: {
      id:'null_paladin', name:'The Void Crusader', icon:'🌑',
      tagline:'The holy warrior\'s conviction, directed at something the holy books do not name.',
      color:'#887799', element:'void', elementFlavor:'voidholy', rarity:'mythical',
      fusedFrom:['nullbringer','paladin'],
      stats:{hp:122,maxHp:122,mp:94,maxMp:94,atk:12,def:10,spd:10,crit:11},
      statDisplay:{HP:8,ATK:8,DEF:7,SPD:6,MP:8},
      abilities:['holy_strike','divine_shield','consecrate','wrath_of_light','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','divine_grace'],
      description:'Paladin conviction fueling Sunder delivery — the certainty that drives the holy warrior adapted to serve a different certainty, that some things should not persist. The Void Crusader applies Sunder with the disciplined force of a paladin assault, each stack delivered with the intentionality of a sacred duty.',
      lore:'The paladin acted from conviction that the holy purpose demanded it. The nullbringer acted from conviction that the Sunder demanded nothing — it simply was. The Void Crusader found that the paladin\'s conviction, redirected toward the Sunder\'s operation, produces a delivery mechanism that is both more disciplined and more committed than the nullbringer alone: the conviction ensures the Sunder is completed, which the nullbringer appreciates as a structural improvement.'
    },

    null_plague_lord: {
      id:'null_plague_lord', name:'The Plague of Ending', icon:'🌑',
      tagline:'The disease that dismantles rather than merely kills.',
      color:'#446644', element:'void', elementFlavor:'voidplague', rarity:'divine',
      fusedFrom:['nullbringer','pestilencelord'],
      stats:{hp:88,maxHp:88,mp:119,maxMp:119,atk:11,def:6,spd:11,crit:13},
      statDisplay:{HP:6,ATK:7,DEF:4,SPD:6,MP:10},
      abilities:['plague_lance','virulent_bloom','plague_lance','virulent_bloom','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','plague_lord'],
      description:'Plague engineered to deliver Sunder stacks biologically — each infection is a Sunder application, each vector a precision dismantling agent. The Plague of Ending does not cause biological death; it causes biological Sunder, and the two are not the same outcome.',
      lore:'The pestilencelord made diseases that kill. The nullbringer needed diseases that Sunder. The Plague of Ending engineered pathogens around the Sunder mechanism and found that a disease designed to apply Sunder rather than kill is more difficult to counter — immune systems learned to respond to killing pathogens, but a pathogen applying Sunder addresses structures the immune system does not classify as under attack because they have never been attacked through that vector before.'
    },

    phantom_null: {
      id:'phantom_null', name:'The Nothing That Strikes', icon:'🌑',
      tagline:'You did not see it. You felt the Sunder. The sequence is correct.',
      color:'#558888', element:'void', elementFlavor:'voidghost', rarity:'divine',
      fusedFrom:['nullbringer','phantom'],
      stats:{hp:88,maxHp:88,mp:110,maxMp:110,atk:12,def:5,spd:16,crit:19},
      statDisplay:{HP:6,ATK:8,DEF:3,SPD:8,MP:9},
      abilities:['shadow_strike','vanish','phantom_step','death_mark','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','phase'],
      description:'An invisible Sunder delivery mechanism — the phantom phases to optimal position and applies each Sunder stack from within the target\'s own space before phasing away. The Nothing That Strikes delivers the complete Sunder suite without ever being locatable, which makes counter-Sunder techniques inapplicable.',
      lore:'The phantom struck from invisible positions. The nullbringer struck from wherever the Sunder was most efficient. The Nothing That Strikes found that the most efficient Sunder delivery position is inside the target\'s occupied space, which the phantom can access during phase. The Sunder stacks applied from that position experience no interference because there is no distance for defenses to operate across, and the phantom is already inside the boundary they were designed to protect.'
    },

    null_doctor: {
      id:'null_doctor', name:'The Terminal Prognosis', icon:'🌑',
      tagline:'The plaguedoctor knows where the body fails. The nullbringer addresses those locations precisely.',
      color:'#668855', element:'void', elementFlavor:'voidmed', rarity:'mythical',
      fusedFrom:['nullbringer','plaguedoctor'],
      stats:{hp:90,maxHp:90,mp:113,maxMp:113,atk:12,def:6,spd:11,crit:14},
      statDisplay:{HP:6,ATK:8,DEF:4,SPD:6,MP:10},
      abilities:['inoculate','miasma','quarantine','inoculate','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','immunity'],
      description:'The plaguedoctor\'s anatomical knowledge amplifying Sunder precision — the doctor\'s diagnosis identifies exactly where each Sunder stack should be applied for maximum effect, converting Anatomical Study from a passive amplifier to an active targeting system.',
      lore:'The plaguedoctor diagnosed the locations and mechanisms of biological failure. The nullbringer needed those locations identified for Sunder delivery. The Terminal Prognosis found that the plaguedoctor\'s diagnostic framework is the most precise targeting system available for Sunder application — more precise than combat instinct and more reliable than arcane calculation, because the doctor\'s knowledge is empirical rather than theoretical and was developed specifically for the biological systems the Sunder operates on.'
    },

    null_flame: {
      id:'null_flame', name:'The Unburning', icon:'🌑',
      tagline:'The fire that does not consume. The Sunder that fire was preparing for.',
      color:'#ff5500', element:'void', elementFlavor:'voidfire', rarity:'legendary',
      fusedFrom:['nullbringer','pyromancer'],
      stats:{hp:92,maxHp:92,mp:111,maxMp:111,atk:10,def:6,spd:12,crit:14},
      statDisplay:{HP:6,ATK:7,DEF:4,SPD:7,MP:10},
      abilities:['fireball','ignite','inferno','phoenixflame','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','fire_mastery'],
      description:'Fire that prepares targets for the Sunder rather than destroying them — the pyromancer\'s heat degrades structural integrity, and each Sunder stack follows into the weakened structure. The Unburning fire is not burning the target out of existence but burning away what would prevent the Sunder from working.',
      lore:'The pyromancer\'s fire consumed. The nullbringer\'s Sunder dismantled. The Unburning found that fire and Sunder are sequential rather than redundant: fire degrades the structural and biological integrity that gives Sunder stacks resistance, and Sunder addresses the degraded structure with precision the fire alone could not achieve. The fire prepares; the Sunder finishes. The target experiences both, which is less redundant than it sounds.'
    },

    null_runeblade: {
      id:'null_runeblade', name:'The Unscribed Blade', icon:'🌑',
      tagline:'The rune that inscribes Sunder into every strike.',
      color:'#8855aa', element:'void', elementFlavor:'voidrune', rarity:'legendary',
      fusedFrom:['nullbringer','runeblade'],
      stats:{hp:105,maxHp:105,mp:100,maxMp:100,atk:13,def:8,spd:12,crit:14},
      statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:9},
      abilities:['rune_strike','bind_rune','runic_shield','elder_rune','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','rune_mastery'],
      description:'Runic inscription applied to Sunder delivery — each rune carved into the target inscribes a Sunder stack rather than a curse. The Unscribed Blade leaves marks that the target cannot read but the nullbringer can see, each one tracking the progress of a different dimension of erasure.',
      lore:'The runeblade inscribed runes that cursed or bound. The nullbringer inscribed Sunder. The Unscribed Blade found that the runeblade\'s inscription technique is the most precise Sunder delivery method available: the rune system allows each of the four Sunder stacks to be placed at exactly the location and depth the nullbringer specifies, which is more accurate than a strike or a curse and more durable than either, because runes carved in the target persist until the Sunder they represent completes.'
    },

    null_sentinel: {
      id:'null_sentinel', name:'The Immovable Erasure', icon:'🌑',
      tagline:'It holds the position. The position it holds is the one where you are being Sundered.',
      color:'#667788', element:'void', elementFlavor:'voidwall', rarity:'legendary',
      fusedFrom:['nullbringer','sentinel'],
      stats:{hp:130,maxHp:130,mp:86,maxMp:86,atk:12,def:12,spd:10,crit:11},
      statDisplay:{HP:9,ATK:8,DEF:8,SPD:6,MP:7},
      abilities:['shield_bash','fortify','retaliate','iron_fortress','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','bastion'],
      description:'The sentinel\'s hold converted to a Sunder delivery mechanism — 130 HP that does not move, applying a new Sunder stack with every exchange. The Immovable Erasure wins by outlasting: every attack against it returns a Sunder stack, and the sentinel has enough HP to apply the entire suite at its own pace.',
      lore:'The sentinel held because endurance served the mission. The nullbringer applied Sunder because patience served the mechanism. The Immovable Erasure found these were the same operating principle: hold the position, apply stacks on the sentinel\'s schedule rather than the target\'s, and let the accumulated Sunder finish the engagement. The bastion passive ensures there is always enough HP to complete the Sunder suite, which the sentinel considers a tactical planning improvement over the uncertainty of conventional combat outcomes.'
    },

    null_shadow: {
      id:'null_shadow', name:'The Void Blade', icon:'🌑',
      tagline:'The shadow kills. The null ensures nothing remains to prove it happened.',
      color:'#222233', element:'void', elementFlavor:'voidshadow', rarity:'legendary',
      fusedFrom:['nullbringer','shadowblade'],
      stats:{hp:94,maxHp:94,mp:94,maxMp:94,atk:14,def:6,spd:15,crit:18},
      statDisplay:{HP:6,ATK:10,DEF:4,SPD:8,MP:8},
      abilities:['shadow_strike','vanish','hemorrhage','death_mark','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','shadow_veil'],
      description:'The shadowblade\'s lethal precision redirected to Sunder delivery — each assassination technique applying a Sunder stack rather than a kill. At 15 SPD with shadow concealment, the Void Blade applies the complete Sunder suite before any defensive response can be organized.',
      lore:'The shadowblade operated from shadow and killed with precision. The nullbringer operated from void and Sundered with precision. The Void Blade found these were the same work in different registers: shadow enables approach and void enables erasure, and both require the same skill of finding the exact right place to apply force. The Sunder applied from shadow is the shadowblade\'s technique at its logical extension — not ending the target\'s life but ending their coherence as a thing that exists.'
    },

    null_soulweaver: {
      id:'null_soulweaver', name:'The Soul Unraveling', icon:'🌑',
      tagline:'The soul is not exempt. The Sunder reaches everything.',
      color:'#6644aa', element:'void', elementFlavor:'voidsoul', rarity:'mythical',
      fusedFrom:['nullbringer','soulweaver'],
      stats:{hp:89,maxHp:89,mp:116,maxMp:116,atk:11,def:6,spd:11,crit:13},
      statDisplay:{HP:6,ATK:7,DEF:4,SPD:6,MP:10},
      abilities:['soul_drain','soul_bind','spirit_weave','soul_surge','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','soul_harvest'],
      description:'The soulweaver\'s access to the soul level combined with the Sunder\'s scope — each Sunder stack applied not just to the physical and cognitive but to the spiritual substrate. The Soul Unraveling dismantles what physical damage cannot reach, addressing the target at the level the soulweaver could access and the nullbringer needed to.',
      lore:'The soulweaver manipulated souls as a medium. The nullbringer needed the Sunder to reach the soul\'s level. The Soul Unraveling found these were compatible operations: the soulweaver provides access to the spiritual substrate that conventional Sunder cannot reach without assistance, and the Sunder_will and Sunder_form stacks, delivered at that level rather than the surface level, produce outcomes that the nullbringer considers the complete expression of the Sunder mechanism — nothing in the target is excluded from the process.'
    },

    null_resonance: {
      id:'null_resonance', name:'The Resonant Void', icon:'🌑',
      tagline:'The frequency at which something ceases to exist.',
      color:'#5588aa', element:'void', elementFlavor:'voidsound', rarity:'mythical',
      fusedFrom:['nullbringer','soundbreaker'],
      stats:{hp:96,maxHp:96,mp:106,maxMp:106,atk:14,def:6,spd:14,crit:16},
      statDisplay:{HP:6,ATK:9,DEF:4,SPD:8,MP:9},
      abilities:['sonic_strike','resonance','shockwave','sonic_strike','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','resonance_master'],
      description:'Sound at the resonant frequency of the Sunder — each sonic strike delivering a Sunder stack at the precise vibrational frequency that Anatomical Study identifies as optimal for each target structure. The Resonant Void dismantles through frequency rather than force, which bypasses the structural resistance that makes conventional Sunder delivery inefficient.',
      lore:'The soundbreaker found the resonant frequency of structures and used vibration to break them. The nullbringer found the resonant frequency of existence and used it for Sunder. The Resonant Void found that every Sunder stack has an optimal delivery frequency — the frequency at which the target structure offers the least resistance — and that the soundbreaker\'s vibrational techniques can deliver each stack at exactly that frequency, converting Sunder from a force application into a precision resonance event.'
    },

    null_spellsword: {
      id:'null_spellsword', name:'The Psionic Unmaking', icon:'🌑',
      tagline:'The mind that holds the sword that holds the Sunder.',
      color:'#6677cc', element:'void', elementFlavor:'voidpsion', rarity:'mythical',
      fusedFrom:['nullbringer','spellsword'],
      stats:{hp:103,maxHp:103,mp:103,maxMp:103,atk:14,def:8,spd:13,crit:15},
      statDisplay:{HP:7,ATK:9,DEF:6,SPD:7,MP:9},
      abilities:['arcane_slash','mana_shield','spell_blade','arcane_slash','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','psionic_link'],
      description:'The spellsword\'s psionic precision combined with the Sunder — each strike guided by psychic awareness of the target\'s internal structure, delivering Sunder stacks to exact locations. Anatomical Study amplified by the spellsword\'s mind-reading means the nullbringer knows where each stack will be most effective before delivering it.',
      lore:'The spellsword read targets psionically before striking. The nullbringer needed targets read before Sunder delivery. The Psionic Unmaking found that psionic target awareness converts Anatomical Study from a passive observation into an active intelligence feed: the spellsword\'s mind identifies the exact state of each Sunder-relevant structure in real time, which allows the nullbringer to deliver each stack at the optimal moment rather than the available one. The difference in efficiency is significant.'
    },

    null_spiritwalker: {
      id:'null_spiritwalker', name:'The Haunted Unmaking', icon:'🌑',
      tagline:'The spirit confirmed what the nullbringer suspected: there is no part of the target that is exempt.',
      color:'#559966', element:'void', elementFlavor:'voidspirit', rarity:'mythical',
      fusedFrom:['nullbringer','spiritwalker'],
      stats:{hp:99,maxHp:99,mp:108,maxMp:108,atk:12,def:8,spd:12,crit:13},
      statDisplay:{HP:6,ATK:8,DEF:6,SPD:7,MP:9},
      abilities:['spirit_touch','soul_link','spirit_surge','spirit_touch','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','spirit_bond'],
      description:'Spirit allies delivering Sunder stacks across the spiritual plane — the spiritwalker\'s spectral forces applying Sunder to the target\'s spiritual and physical components simultaneously. The Haunted Unmaking ensures the Sunder suite is complete at every level the target exists on.',
      lore:'The spiritwalker communicated with the dead to understand the living. The nullbringer applied the Sunder to both states. The Haunted Unmaking found that using spirit allies to deliver Sunder stacks across the spirit plane extends the Sunder mechanism to dimensions of the target that purely physical application cannot reach, which the nullbringer considers a completion of the Sunder\'s intended scope rather than an extension of it.'
    },

    null_storm: {
      id:'null_storm', name:'The Thundering Void', icon:'🌑',
      tagline:'Lightning is fast. The Sunder is what it was fast enough to deliver.',
      color:'#4466aa', element:'void', elementFlavor:'voidstorm', rarity:'legendary',
      fusedFrom:['nullbringer','stormcaller'],
      stats:{hp:97,maxHp:97,mp:105,maxMp:105,atk:12,def:7,spd:14,crit:16},
      statDisplay:{HP:6,ATK:8,DEF:5,SPD:8,MP:9},
      abilities:['lightning_bolt','chain_lightning','storm_surge','thunderclap','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','storm_mastery'],
      description:'Lightning as Sunder delivery — each bolt carrying a Sunder stack at lightning speed, chain lightning applying multiple stacks across multiple targets simultaneously. The Thundering Void converts the stormcaller\'s area coverage into Sunder deployment at a rate no other delivery method achieves.',
      lore:'The stormcaller\'s lightning struck faster than reaction could prevent. The nullbringer needed delivery that outpaced reaction. The Thundering Void found that lightning speed applied to Sunder delivery converts the target\'s reaction time from a defensive variable to an irrelevant one: the Sunder stack is already applied before the target\'s nervous system has completed the signal that something is happening. Chain lightning extends this advantage to every target in the arc simultaneously.'
    },

    null_savant: {
      id:'null_savant', name:'The Null Protocol', icon:'🌑',
      tagline:'The code that runs the Sunder. The system that the Sunder runs on.',
      color:'#335577', element:'void', elementFlavor:'voidtech', rarity:'mythical',
      fusedFrom:['nullbringer','techsavant'],
      stats:{hp:93,maxHp:93,mp:111,maxMp:111,atk:13,def:7,spd:13,crit:15},
      statDisplay:{HP:6,ATK:9,DEF:5,SPD:7,MP:10},
      abilities:['overcharge','system_crash','plasma_cannon','overcharge','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','overclock'],
      description:'The Sunder implemented as a technical protocol — Sunder stacks delivered by technical systems that apply them with machine precision, without the variance that biological delivery introduces. The Null Protocol runs without hesitation, miscalculation, or fatigue, executing the complete Sunder suite on the techsavant\'s schedule.',
      lore:'The techsavant built systems that executed without error. The nullbringer needed Sunder delivered without error. The Null Protocol compiled the Sunder mechanism as executable code and found that a technical Sunder delivery system applies stacks at exact timing, exact intensity, and exact location every time — which converts the Sunder from a function of the nullbringer\'s combat performance into a function of the technical system\'s reliability, which is considerably more consistent.'
    },

    null_tide: {
      id:'null_tide', name:'The Voiding Current', icon:'🌑',
      tagline:'The tide wears everything down. The Sunder finishes what the tide started.',
      color:'#3366aa', element:'void', elementFlavor:'voidwater', rarity:'legendary',
      fusedFrom:['nullbringer','tidecaller'],
      stats:{hp:93,maxHp:93,mp:110,maxMp:110,atk:12,def:7,spd:12,crit:14},
      statDisplay:{HP:6,ATK:8,DEF:5,SPD:7,MP:9},
      abilities:['tidal_wave','whirlpool','riptide','ocean_blessing','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','tide_mastery'],
      description:'The tide\'s relentless pressure combined with Sunder delivery — each wave applies a Sunder stack, the whirlpool holding targets in place while the current applies the full suite. The Voiding Current converts the tidecaller\'s inexorable force into inexorable Sunder progression.',
      lore:'The tidecaller\'s waves wore down whatever they struck over time. The nullbringer operated on the same principle through a different mechanism. The Voiding Current found these were compatible timescales: the tide\'s erosive persistence and the Sunder\'s accumulative progression both operate through repeated application rather than single decisive force, and combining them produces a target that is being simultaneously worn down by tidal force and dismantled by Sunder stacks, which is more than the target is designed to accommodate.'
    },

    void_null: {
      id:'void_null', name:'The Deepest Absence', icon:'🌑',
      tagline:'The void looked at the null and recognized itself.',
      color:'#110011', element:'void', elementFlavor:'voidvoid', rarity:'mythical',
      fusedFrom:['nullbringer','voidmancer'],
      stats:{hp:86,maxHp:86,mp:122,maxMp:122,atk:11,def:5,spd:11,crit:15},
      statDisplay:{HP:6,ATK:7,DEF:3,SPD:6,MP:10},
      abilities:['void_bolt','entropy','singularity','annihilate','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','void_mastery'],
      description:'Two forms of absence, unified — the voidmancer\'s void entropy and the nullbringer\'s Sunder operating from the same substrate. The Deepest Absence applies Sunder stacks backed by the void\'s complete absence of anything, and each stack drains from a pool of nothingness that does not run out.',
      lore:'The voidmancer called on the void as a force. The nullbringer was the void applied with purpose. The Deepest Absence found that two practitioners of absence working together do not double the nothing — they find the layer of nothing beneath the nothing the other was accessing. The Sunder stacks this generates are backed by the deepest absence available, which the voidmancer acknowledges they had not reached alone and the nullbringer notes is the correct substrate for a Sunder of this scope.'
    },

    null_warlord: {
      id:'null_warlord', name:'The Erasing Campaign', icon:'🌑',
      tagline:'The warlord who wins by leaving nothing to oppose them.',
      color:'#554433', element:'void', elementFlavor:'voidwar', rarity:'legendary',
      fusedFrom:['nullbringer','warlord'],
      stats:{hp:122,maxHp:122,mp:92,maxMp:92,atk:14,def:10,spd:11,crit:12},
      statDisplay:{HP:8,ATK:10,DEF:7,SPD:6,MP:8},
      abilities:['war_cry','cleave','berserker_rage','war_cry','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','battle_hardened'],
      description:'Warlord tactical doctrine applied to Sunder delivery as a campaign objective — the Erasing Campaign plans each engagement around achieving the complete Sunder suite, with every tactical maneuver in service of placing the nullbringer in the position to apply the next stack.',
      lore:'The warlord planned campaigns with clear objectives. The nullbringer had one objective: complete the Sunder. The Erasing Campaign adopted the warlord\'s planning framework around that single objective and found that warlord discipline applied to Sunder delivery converts an improvisational process into a planned one — each tactical position chosen for its contribution to Sunder stack delivery, each exchange evaluated by whether it brings the Sunder closer to completion. The warlord considers this the most focused campaign doctrine they have ever executed.'
    },

    null_wind: {
      id:'null_wind', name:'The Erasing Gale', icon:'🌑',
      tagline:'The wind removes everything it passes through. The Sunder is specific about what it removes.',
      color:'#446655', element:'void', elementFlavor:'voidwind', rarity:'legendary',
      fusedFrom:['nullbringer','windwalker'],
      stats:{hp:92,maxHp:92,mp:104,maxMp:104,atk:13,def:6,spd:16,crit:17},
      statDisplay:{HP:6,ATK:9,DEF:4,SPD:9,MP:9},
      abilities:['gust_blade','tempest_step','cyclone','gust_blade','sunder_flesh','sunder_will','sunder_form','sunder_time'],
      burstAbility:'nullbringer_burst',
      passives:['anatomical_study','gust'],
      description:'Sunder delivery at 16 SPD — the complete Sunder suite applied before any defensive reaction can be completed. The Erasing Gale moves at wind speed and applies each Sunder stack in the brief window before the target\'s defensive response catches up to what is happening to them.',
      lore:'The windwalker moved faster than response could prevent. The nullbringer needed Sunder delivered faster than response could prevent. The Erasing Gale found that applying Sunder at wind speed converts each stack from an event the target can respond to into an event the target is already processing the aftermath of — all four stacks arrive in the time it takes to register the first, which is the Sunder delivery condition the nullbringer had been optimizing toward and the windwalker achieved on the first collaboration.'
    }
  });

  if(typeof console!=='undefined') console.debug('[Fusion] File 17 loaded (35 classes)');
})();
