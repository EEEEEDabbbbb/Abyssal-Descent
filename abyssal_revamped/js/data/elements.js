// ══════════════════════════════════════════════════════════════
// ELEMENTS — 20 Core Types + Effectiveness Table
// ══════════════════════════════════════════════════════════════

const ELEMENTS = {
  normal:   { id:'normal',   name:'Normal',   icon:'⚪', color:'#a8a878' },
  fire:     { id:'fire',     name:'Fire',     icon:'🔥', color:'#f08030' },
  water:    { id:'water',    name:'Water',    icon:'💧', color:'#6890f0' },
  electric: { id:'electric', name:'Electric', icon:'⚡', color:'#f8d030' },
  grass:    { id:'grass',    name:'Grass',    icon:'🌿', color:'#78c850' },
  ice:      { id:'ice',      name:'Ice',      icon:'❄️', color:'#98d8d8' },
  fighting: { id:'fighting', name:'Fighting', icon:'👊', color:'#c03028' },
  poison:   { id:'poison',   name:'Poison',   icon:'☠️', color:'#a040a0' },
  ground:   { id:'ground',   name:'Ground',   icon:'🌍', color:'#e0c068' },
  flying:   { id:'flying',   name:'Flying',   icon:'🦅', color:'#a890f0' },
  psychic:  { id:'psychic',  name:'Psychic',  icon:'🔮', color:'#f85888' },
  bug:      { id:'bug',      name:'Bug',      icon:'🐛', color:'#a8b820' },
  rock:     { id:'rock',     name:'Rock',     icon:'🪨', color:'#b8a038' },
  ghost:    { id:'ghost',    name:'Ghost',    icon:'👻', color:'#705898' },
  dragon:   { id:'dragon',   name:'Dragon',   icon:'🐉', color:'#7038f8' },
  dark:     { id:'dark',     name:'Dark',     icon:'🌑', color:'#705848' },
  steel:    { id:'steel',    name:'Steel',    icon:'⚙️', color:'#b8b8d0' },
  fairy:    { id:'fairy',    name:'Fairy',    icon:'✨', color:'#ee99ac' },
  wind:     { id:'wind',     name:'Wind',     icon:'🌪️', color:'#99ddff' },
  shadow:   { id:'shadow',   name:'Shadow',   icon:'🌫️', color:'#554466' },

  // ── EXOTIC ELEMENTS (Pass 3) ──────────────────────────────
  sound:    { id:'sound',    name:'Sound',    icon:'🔊', color:'#ffbb55' },
  light:    { id:'light',    name:'Light',    icon:'💡', color:'#ffffaa' },
  cosmic:   { id:'cosmic',   name:'Cosmic',   icon:'🌌', color:'#5533cc' },
  crystal:  { id:'crystal',  name:'Crystal',  icon:'💎', color:'#aaddff' },
  nuclear:  { id:'nuclear',  name:'Nuclear',  icon:'☢️', color:'#aaff33' },
  tech:     { id:'tech',     name:'Tech',     icon:'🤖', color:'#44ccff' },
  spirit:   { id:'spirit',   name:'Spirit',   icon:'👼', color:'#eeddff' },
  magma:    { id:'magma',    name:'Magma',    icon:'🌋', color:'#ff6600' },
  storm:    { id:'storm',    name:'Storm',    icon:'⛈️', color:'#334488' },
  time:     { id:'time',     name:'Time',     icon:'⏳', color:'#ddcc88' },
  space:    { id:'space',    name:'Space',    icon:'🌠', color:'#110033' },
  gravity:  { id:'gravity',  name:'Gravity',  icon:'🌀', color:'#445566' },
  plasma:   { id:'plasma',   name:'Plasma',   icon:'🔆', color:'#ff44ff' },
  void:     { id:'void',     name:'Void',     icon:'🕳️', color:'#110011' },
  blood:    { id:'blood',    name:'Blood',    icon:'🩸', color:'#880000' },
  rune:     { id:'rune',     name:'Rune',     icon:'🔱', color:'#cc9900' },
  glass:    { id:'glass',    name:'Glass',    icon:'🔍', color:'#ccffff' },
  slime:    { id:'slime',    name:'Slime',    icon:'🟢', color:'#55cc44' },
  cyber:    { id:'cyber',    name:'Cyber',    icon:'💻', color:'#00ffcc' },
  magnet:   { id:'magnet',   name:'Magnet',   icon:'🧲', color:'#cc4444' },
};

// Effectiveness multipliers: 4=super effective, 2=effective, 1=normal, 0.5=weak, 0.25=super weak
// Format: EFFECTIVENESS[attackType][defenderType] = multiplier
// Only non-1.0 entries listed; all others default to 1.0
const EFFECTIVENESS = (() => {
  const table = {};
  const types = Object.keys(ELEMENTS);

  // Initialize all to 1.0
  for (const atk of types) {
    table[atk] = {};
    for (const def of types) table[atk][def] = 1.0;
  }

  // ── FIRE ──
  table.fire.grass   = 2; table.fire.ice    = 2; table.fire.bug    = 2; table.fire.steel  = 2;
  table.fire.water   = 0.5; table.fire.fire = 0.5; table.fire.rock  = 0.5; table.fire.dragon = 0.5;

  // ── WATER ──
  table.water.fire   = 2; table.water.ground = 2; table.water.rock  = 2;
  table.water.water  = 0.5; table.water.grass  = 0.5; table.water.dragon = 0.5;

  // ── ELECTRIC ──
  table.electric.water  = 2; table.electric.flying = 2; table.electric.wind = 2;
  table.electric.grass  = 0.5; table.electric.electric = 0.5; table.electric.dragon = 0.5;
  table.electric.ground = 0.25;

  // ── GRASS ──
  table.grass.water  = 2; table.grass.ground = 2; table.grass.rock  = 2;
  table.grass.fire   = 0.5; table.grass.grass  = 0.5; table.grass.poison = 0.5;
  table.grass.flying = 0.5; table.grass.bug    = 0.5; table.grass.steel  = 0.5; table.grass.dragon = 0.5;

  // ── ICE ──
  table.ice.grass   = 2; table.ice.ground = 2; table.ice.flying = 2; table.ice.dragon = 2; table.ice.wind = 2;
  table.ice.fire    = 0.5; table.ice.water  = 0.5; table.ice.ice    = 0.5; table.ice.steel  = 0.5;

  // ── FIGHTING ──
  table.fighting.normal = 2; table.fighting.ice  = 2; table.fighting.rock  = 2; table.fighting.dark  = 2; table.fighting.steel = 2;
  table.fighting.poison = 0.5; table.fighting.flying = 0.5; table.fighting.psychic = 0.5; table.fighting.bug   = 0.5; table.fighting.fairy = 0.5;
  table.fighting.ghost  = 0.25;

  // ── POISON ──
  table.poison.grass = 2; table.poison.fairy = 2;
  table.poison.poison = 0.5; table.poison.ground = 0.5; table.poison.rock = 0.5; table.poison.ghost = 0.5;
  table.poison.steel = 0.25;

  // ── GROUND ──
  table.ground.fire    = 2; table.ground.electric = 2; table.ground.poison  = 2; table.ground.rock    = 2; table.ground.steel   = 2;
  table.ground.grass   = 0.5; table.ground.bug     = 0.5;
  table.ground.flying  = 0.25; table.ground.wind   = 0.25;

  // ── FLYING ──
  table.flying.grass    = 2; table.flying.fighting = 2; table.flying.bug     = 2;
  table.flying.electric = 0.5; table.flying.rock   = 0.5; table.flying.steel  = 0.5;

  // ── PSYCHIC ──
  table.psychic.fighting = 2; table.psychic.poison = 2;
  table.psychic.psychic  = 0.5; table.psychic.steel  = 0.5;
  table.psychic.dark     = 0.25;

  // ── BUG ──
  table.bug.grass   = 2; table.bug.psychic = 2; table.bug.dark   = 2;
  table.bug.fire    = 0.5; table.bug.fighting = 0.5; table.bug.flying = 0.5;
  table.bug.ghost   = 0.5; table.bug.steel   = 0.5; table.bug.fairy  = 0.5;

  // ── ROCK ──
  table.rock.fire    = 2; table.rock.ice     = 2; table.rock.flying = 2; table.rock.bug    = 2;
  table.rock.fighting = 0.5; table.rock.ground = 0.5; table.rock.steel  = 0.5;

  // ── GHOST ──
  table.ghost.ghost   = 2; table.ghost.psychic = 2;
  table.ghost.dark    = 0.5;
  table.ghost.normal  = 0.25; table.ghost.fighting = 0.25;

  // ── DRAGON ──
  table.dragon.dragon = 2;
  table.dragon.steel  = 0.5;
  table.dragon.fairy  = 0.25;

  // ── DARK ──
  table.dark.ghost    = 2; table.dark.psychic  = 2;
  table.dark.fighting = 0.5; table.dark.dark    = 0.5; table.dark.fairy   = 0.5;

  // ── STEEL ──
  table.steel.ice    = 2; table.steel.rock   = 2; table.steel.fairy  = 2;
  table.steel.fire   = 0.5; table.steel.water  = 0.5; table.steel.electric = 0.5; table.steel.steel   = 0.5;

  // ── FAIRY ──
  table.fairy.fighting = 2; table.fairy.dragon   = 4; table.fairy.dark    = 2;
  table.fairy.fire     = 0.5; table.fairy.poison   = 0.5; table.fairy.steel   = 0.5;

  // ── WIND ──
  table.wind.flying  = 2; table.wind.fire    = 2; table.wind.grass   = 2;
  table.wind.rock    = 0.5; table.wind.steel   = 0.5; table.wind.ground  = 0.5;
  table.wind.electric = 0.25;

  // ── SHADOW ──
  table.shadow.psychic = 2; table.shadow.ghost   = 2; table.shadow.normal  = 2;
  table.shadow.dark    = 0.5; table.shadow.steel   = 0.5;
  table.shadow.fairy   = 0.25;

  // ══════════════════ EXOTIC ELEMENTS ══════════════════════════

  // ── SOUND ── (vibration breaks crystal/glass, absorbed by ground/rock)
  table.sound.crystal  = 4; table.sound.glass    = 4; table.sound.ghost    = 2;
  table.sound.psychic  = 2; table.sound.flying   = 2;
  table.sound.ground   = 0.5; table.sound.rock   = 0.5; table.sound.steel  = 0.5;
  table.sound.void     = 0.25;

  // ── LIGHT ── (holy/radiant — crushes dark/ghost, weak to shadow/void)
  table.light.dark     = 4; table.light.ghost    = 2; table.light.shadow   = 2;
  table.light.void     = 2; table.light.bug      = 2;
  table.light.fire     = 0.5; table.light.light  = 0.5; table.light.crystal = 0.5;
  table.light.space    = 0.25;

  // ── COSMIC ── (reality-bending — strong vs ground/normal, weak vs time/space)
  table.cosmic.normal  = 2; table.cosmic.ground  = 2; table.cosmic.rock    = 2;
  table.cosmic.dragon  = 2; table.cosmic.steel   = 2;
  table.cosmic.fairy   = 0.5; table.cosmic.time  = 0.5; table.cosmic.space  = 0.5;
  table.cosmic.void    = 0.25;

  // ── CRYSTAL ── (razor sharp but brittle — shreds flying/ghost, shatters vs sound/fire)
  table.crystal.flying = 2; table.crystal.ghost  = 2; table.crystal.ice    = 2;
  table.crystal.fairy  = 2; table.crystal.light  = 2;
  table.crystal.fire   = 0.5; table.crystal.sound = 0.25; table.crystal.magma = 0.25;

  // ── NUCLEAR ── (raw energy — devastates steel/tech, resisted by ghost/shadow)
  table.nuclear.steel  = 4; table.nuclear.tech   = 4; table.nuclear.ice    = 2;
  table.nuclear.ground = 2; table.nuclear.rock   = 2; table.nuclear.grass  = 2;
  table.nuclear.ghost  = 0.5; table.nuclear.shadow = 0.5; table.nuclear.void = 0.5;
  table.nuclear.space  = 0.25;

  // ── TECH ── (precision engineering — counters steel/cyber, weak to EMP/electric/magnet)
  table.tech.steel     = 2; table.tech.cyber     = 2; table.tech.normal    = 2;
  table.tech.rock      = 2; table.tech.ghost     = 2;
  table.tech.electric  = 0.5; table.tech.magnet  = 0.25; table.tech.nuclear = 0.25;

  // ── SPIRIT ── (pure holy energy — counters undead/dark, weak to void/nuclear)
  table.spirit.ghost   = 4; table.spirit.dark    = 2; table.spirit.shadow  = 2;
  table.spirit.poison  = 2; table.spirit.slime   = 2;
  table.spirit.void    = 0.5; table.spirit.steel  = 0.5;
  table.spirit.nuclear = 0.25;

  // ── MAGMA ── (superheated rock — melts ice/steel, steam-countered by water)
  table.magma.ice      = 4; table.magma.steel    = 2; table.magma.rock     = 2;
  table.magma.grass    = 2; table.magma.crystal  = 2; table.magma.glass    = 2;
  table.magma.water    = 0.25; table.magma.ground = 0.5;

  // ── STORM ── (mixed electric/wind — great vs flying/water, grounded by ground)
  table.storm.flying   = 4; table.storm.water    = 2; table.storm.fire     = 2;
  table.storm.grass    = 2; table.storm.bug      = 2;
  table.storm.ground   = 0.25; table.storm.rock   = 0.5; table.storm.steel  = 0.5;

  // ── TIME ── (temporal — ages most things, but future-beings resist)
  table.time.normal    = 2; table.time.dragon    = 2; table.time.steel     = 2;
  table.time.ghost     = 2; table.time.psychic   = 2;
  table.time.space     = 0.5; table.time.void     = 0.5; table.time.cosmic  = 0.5;
  table.time.fairy     = 0.25;

  // ── SPACE ── (gravity/vacuum — overpowers ground/flying, blocked by time/steel)
  table.space.ground   = 2; table.space.flying   = 2; table.space.fire     = 2;
  table.space.dragon   = 2; table.space.light    = 2;
  table.space.time     = 0.5; table.space.steel   = 0.5; table.space.rock   = 0.5;
  table.space.gravity  = 0.25;

  // ── GRAVITY ── (crushing force — wrecks flying/steel/heavy, ignored by ghost)
  table.gravity.flying = 4; table.gravity.steel  = 2; table.gravity.rock   = 2;
  table.gravity.normal = 2; table.gravity.ground = 2;
  table.gravity.ghost  = 0.25; table.gravity.shadow = 0.5; table.gravity.space = 0.25;

  // ── PLASMA ── (supercharged matter — melts through most, deflected by magnet/void)
  table.plasma.steel   = 2; table.plasma.ice     = 2; table.plasma.rock    = 2;
  table.plasma.ghost   = 2; table.plasma.crystal = 2;
  table.plasma.magnet  = 0.5; table.plasma.void   = 0.5; table.plasma.water  = 0.5;
  table.plasma.space   = 0.25;

  // ── VOID ── (anti-existence — counters light/spirit, reflects magic)
  table.void.light     = 4; table.void.spirit    = 2; table.void.cosmic    = 2;
  table.void.fairy     = 2; table.void.normal    = 2;
  table.void.dark      = 0.5; table.void.ghost    = 0.5; table.void.shadow   = 0.5;
  table.void.void      = 0.25;

  // ── BLOOD ── (vital force — devours healing/life, resisted by undead/steel)
  table.blood.fairy    = 2; table.blood.grass    = 2; table.blood.spirit   = 2;
  table.blood.psychic  = 2; table.blood.slime    = 2;
  table.blood.ghost    = 0.5; table.blood.steel   = 0.5; table.blood.dark    = 0.5;
  table.blood.poison   = 0.25;

  // ── RUNE ── (ancient inscribed power — strong vs all magic, weak to time)
  table.rune.psychic   = 2; table.rune.shadow    = 2; table.rune.void      = 2;
  table.rune.dark      = 2; table.rune.ghost     = 2; table.rune.dragon    = 2;
  table.rune.normal    = 0.5; table.rune.time     = 0.5; table.rune.crystal = 0.5;
  table.rune.steel     = 0.25;

  // ── GLASS ── (fragile but cutting — high offense, crumbles vs sound/fighting)
  table.glass.flying   = 2; table.glass.bug      = 2; table.glass.poison   = 2;
  table.glass.fire     = 2; table.glass.steel    = 2;
  table.glass.sound    = 0.25; table.glass.fighting = 0.25; table.glass.rock = 0.5;

  // ── SLIME ── (corrosive ooze — melts armor/steel, dried by fire)
  table.slime.steel    = 2; table.slime.rock     = 2; table.slime.ground   = 2;
  table.slime.poison   = 2; table.slime.bug      = 2;
  table.slime.fire     = 0.5; table.slime.ice     = 0.5; table.slime.electric = 0.5;
  table.slime.light    = 0.25;

  // ── CYBER ── (digital/electronic — hacks tech, fried by EMP/electric)
  table.cyber.tech     = 4; table.cyber.normal   = 2; table.cyber.psychic  = 2;
  table.cyber.ghost    = 2; table.cyber.steel    = 2;
  table.cyber.electric = 0.25; table.cyber.magnet = 0.5; table.cyber.sound  = 0.5;

  // ── MAGNET ── (electromagnetic — dominates tech/steel/cyber, useless vs ground/rock)
  table.magnet.steel   = 4; table.magnet.tech    = 2; table.magnet.cyber   = 2;
  table.magnet.electric = 2; table.magnet.flying  = 2;
  table.magnet.ground  = 0.25; table.magnet.rock  = 0.5; table.magnet.ghost = 0.5;

  return table;
})();

function getElementMult(atkType, defType) {
  if (!atkType || !defType) return 1.0;
  if (!EFFECTIVENESS[atkType]) return 1.0;
  return EFFECTIVENESS[atkType][defType] ?? 1.0;
}

// elementMatchups(el) — which elements `el` hits hard, and which hit it hard
// (2× or more), for class select
function elementMatchups(el) {
  const ids = Object.keys(ELEMENTS);
  return {
    strong: ids.filter(x => x !== el && getElementMult(el, x) >= 2),
    weak:   ids.filter(x => getElementMult(x, el) >= 2),
  };
}

function getEffectivenessLabel(mult) {
  if (mult >= 4)    return { text: '⚡ DEVASTATES!! (4×)',      color: '#ff2200' };
  if (mult >= 2)    return { text: '✦ Super effective! (2×)',   color: '#ffaa00' };
  if (mult <= 0.25) return { text: '▽ Barely scratches (0.25×)', color: '#5577aa' };
  if (mult <= 0.5)  return { text: '▽ Not very effective (0.5×)', color: '#7799bb' };
  return null;
}
