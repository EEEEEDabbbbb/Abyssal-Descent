// ══════════════════════════════════════════════════════════════
// BIOMES  (js/data/biomes.js)
//
// Floor/environment theming layer for the 1-50 floor range. Reuses the
// existing ELEMENTS color palette (elements.js) for visual consistency
// instead of inventing a new color system.
//
// Each biome has ONE environmental effect, applied with a modest per-move
// chance from movePlayer() (mapgen.js) — a spice, not a punishment. Effects
// are deliberately instant damage/heal only, NOT duration-based statuses:
// tickStatus() is only ever called from combat's endPlayerTurn(), never
// during exploration, so a duration-based debuff applied out of combat
// would never count down or expire until the player's next fight. Instant
// effects sidestep that gap entirely.
//
// Severity scales gently with depth for a sense of escalating danger.
//
// getBiomeForFloor(floor) — mirrors the existing getFloorTier() pattern.
// ══════════════════════════════════════════════════════════════

const BIOME_EFFECT_CHANCE = 10; // % chance per move (non-combat) to trigger

const BIOMES = [
  {
    id: 'crumbling_crypt', name: 'Crumbling Crypt', floors: [1, 7], element: 'ghost',
    flavor: [
      'Bones crunch underfoot. The air tastes of dust and old regret.',
      'Faint whispers trail behind you, always just out of earshot.',
      'The walls here remember screams the stone forgot how to make.',
    ],
    effect: null, // no environmental mechanic — early floors stay simple
  },
  {
    id: 'frozen_depths', name: 'Frozen Depths', floors: [8, 14], element: 'ice',
    flavor: [
      'Your breath crystallizes before it leaves your lips.',
      'Ice creeps across every surface, patient and total.',
      'The cold here isn\'t weather. It\'s intent.',
    ],
    effect(p) {
      const dmg = Math.max(1, Math.round(p.stats.maxHp * 0.025));
      dealDmgToPlayer(dmg, true);
      logEntry('system', `❄️ Frostbite nips at exposed skin. You take ${dmg} damage.`);
    },
  },
  {
    id: 'molten_rift', name: 'Molten Rift', floors: [15, 20], element: 'fire',
    flavor: [
      'The floor itself seems to breathe heat.',
      'Cracks of orange light pulse beneath your boots.',
      'Sweat and ash. The Rift does not cool.',
    ],
    effect(p) {
      const dmg = Math.max(1, Math.round(p.stats.maxHp * 0.03));
      dealDmgToPlayer(dmg, true);
      logEntry('system', `🔥 Heat rises from the cracked floor. You take ${dmg} damage.`);
    },
  },
  {
    id: 'storm_wastes', name: 'Storm Wastes', floors: [21, 27], element: 'storm',
    flavor: [
      'Lightning stitches the ceiling together, then tears it apart again.',
      'The thunder here never quite finishes.',
      'Static lifts the hair on your arms and doesn\'t let go.',
    ],
    effect(p) {
      const dmg = Math.max(1, Math.round(p.stats.maxHp * 0.035));
      dealDmgToPlayer(dmg, true);
      logEntry('system', `⚡ A stray bolt arcs down and catches you for ${dmg} damage.`);
    },
  },
  {
    id: 'coral_abyss', name: 'Coral Abyss', floors: [28, 35], element: 'water',
    flavor: [
      'Bioluminescent veins pulse faintly along the coral walls.',
      'Water drips from nowhere, pooling into faint light.',
      'Something ancient and slow watches from the dark water.',
    ],
    effect(p) {
      const heal = Math.max(1, Math.round(p.stats.maxHp * 0.04));
      p.stats.hp = Math.min(p.stats.maxHp, p.stats.hp + heal);
      logEntry('system', `💧 A hidden spring seeps through the coral. You recover ${heal} HP.`);
    },
  },
  {
    id: 'void_reaches', name: 'Void Reaches', floors: [36, 42], element: 'void',
    flavor: [
      'The dark here has weight. It presses in from every side.',
      'Your torchlight reaches less far than it should.',
      'Distance stops meaning what it used to mean.',
    ],
    effect(p) {
      const dmg = Math.max(1, Math.round(p.stats.maxHp * 0.04));
      dealDmgToPlayer(dmg, true);
      logEntry('system', `🕳️ The void gnaws at the edges of your resolve. You take ${dmg} damage.`);
    },
  },
  {
    id: 'abyssal_maw', name: 'The Abyssal Maw', floors: [43, 50], element: 'cosmic',
    flavor: [
      'This is not the bottom. There is no bottom. There is only further.',
      'Every wall here has a face, if you look too long.',
      'The Maw does not threaten. It simply waits for you to arrive.',
    ],
    effect(p) {
      const dmg = Math.max(1, Math.round(p.stats.maxHp * 0.05));
      dealDmgToPlayer(dmg, true);
      logEntry('system', `🌌 The Maw presses against your resolve. You take ${dmg} damage.`);
    },
  },
];

// getBiomeForFloor — mirrors getFloorTier()'s pattern (enemies.js)
function getBiomeForFloor(floor) {
  return BIOMES.find(b => floor >= b.floors[0] && floor <= b.floors[1]) || BIOMES[BIOMES.length-1];
}

// triggerBiomeEffect — called from movePlayer() (mapgen.js) on a per-move
// chance roll. No-op in combat, no-op if the current biome (e.g. Crumbling
// Crypt) has no effect defined.
function triggerBiomeEffect() {
  if (!G.player || G.inCombat) return;
  const biome = getBiomeForFloor(G.floor);
  if (!biome.effect) return;
  if (rand(100) >= BIOME_EFFECT_CHANCE) return;
  biome.effect(G.player);
}
