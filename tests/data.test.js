// Data integrity: every reference in the game data must point at something real.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { openGame, loadAllFusions } = require('./helpers');

let ctx;
before(async () => { ctx = await openGame(); await loadAllFusions(ctx.page); });
after(async () => { await ctx.browser.close(); });

test('game boots without page errors', () => {
  assert.deepEqual(ctx.errors, []);
});

test('every class ability and burst exists', async () => {
  const missing = await ctx.page.evaluate(() => {
    const out = [];
    for (const c of [...Object.values(CLASSES), ...Object.values(FUSION_CLASSES)]) {
      for (const a of [...(c.abilities || []), c.burstAbility].filter(Boolean)) {
        if (!ABILITIES[a]) out.push(`${c.id} → ${a}`);
      }
    }
    return out;
  });
  assert.deepEqual(missing, []);
});

test('players never get duplicate ability buttons', async () => {
  const dupes = await ctx.page.evaluate(() => {
    const out = [];
    for (const id of [...Object.keys(CLASSES), ...Object.keys(FUSION_CLASSES)]) {
      G.player = null;
      const p = createPlayer(id);
      if (new Set(p.abilities).size !== p.abilities.length) out.push(id);
    }
    return out;
  });
  assert.deepEqual(dupes, []);
});

test('every class element is a real element', async () => {
  const bad = await ctx.page.evaluate(() =>
    [...Object.values(CLASSES), ...Object.values(FUSION_CLASSES)]
      .filter(c => c.element !== null && !ELEMENTS[c.element]).map(c => `${c.id}:${c.element}`)); // null = deliberately elementless
  assert.deepEqual(bad, []);
});

test('every fusion recipe produces a unique class', async () => {
  const collisions = await ctx.page.evaluate(() => {
    const seen = {};
    Object.values(DUAL_FUSIONS).forEach(id => { seen[id] = (seen[id] || 0) + 1; });
    return Object.entries(seen).filter(([, n]) => n > 1).map(([id]) => id);
  });
  assert.deepEqual(collisions, []);
});

test('every fusion class can locate its own data file', async () => {
  const bad = await ctx.page.evaluate(() =>
    Object.entries(DUAL_FUSIONS)
      .filter(([key, id]) => FUSION_CLASS_FILE[id] !== FUSION_FILE_LOOKUP[key])
      .map(([, id]) => id));
  assert.deepEqual(bad, []);
});

test('enemy patterns, items and weapon arts reference real abilities', async () => {
  const bad = await ctx.page.evaluate(() => {
    const out = [];
    for (const [id, e] of Object.entries(ENEMY_POOL)) {
      [...(e.patterns || []), ...(e.phases || []).flatMap(ph => ph.newPatterns || [])]
        .forEach(p => { if (!ENEMY_ABILITIES[p] || !ENEMY_ABILITY_INFO[p]) out.push(`${id} → ${p}`); });
      if (e.element && !ELEMENTS[e.element]) out.push(`${id} element ${e.element}`);
    }
    ITEM_POOL.forEach(it => {
      (it.grantAbilities || []).forEach(a => { if (!ABILITIES[a]) out.push(`${it.id} → ${a}`); });
      if (it.element && !ELEMENTS[it.element]) out.push(`${it.id} element ${it.element}`);
    });
    [...Object.entries(WEAPON_ELEMENT_ABILITIES), ...Object.entries(HYBRID_WEAPON_ARTS)]
      .forEach(([k, v]) => (v.abilities || []).forEach(a => { if (!ABILITIES[a]) out.push(`arts ${k} → ${a}`); }));
    return out;
  });
  assert.deepEqual(bad, []);
});

test('every passive has a name, a description and an implementation', async () => {
  const bad = await ctx.page.evaluate(() => {
    const all = new Set([...Object.values(CLASSES), ...Object.values(FUSION_CLASSES)].flatMap(c => c.passives || []));
    return [...all].filter(p => !PASSIVE_INFO[p] || !PASSIVE_INFO[p].name || !PASSIVE_INFO[p].desc || !IMPLEMENTED_PASSIVES.has(p));
  });
  assert.deepEqual(bad, []);
});

test('loot rarity never gets worse on deeper floors', async () => {
  const curve = await ctx.page.evaluate(() => {
    const ladder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical', 'divine'];
    const out = [];
    for (let f = 1; f <= 50; f++) {
      let s = 0; const n = 3000;
      for (let i = 0; i < n; i++) s += ladder.indexOf(getRandomItemByFloor(f).rarity);
      out.push(s / n);
    }
    return out;
  });
  for (let f = 1; f < curve.length; f++) {
    assert.ok(curve[f] >= curve[f - 1] - 0.08, `floor ${f + 1} avg ${curve[f].toFixed(2)} < floor ${f} avg ${curve[f - 1].toFixed(2)}`);
  }
});

test('every event choice resolves cleanly at any depth', async () => {
  const bad = await ctx.page.evaluate(() => {
    window.updateUI = () => {}; window.showModal = () => {};
    const out = [];
    for (const floor of [1, 20, 45]) {
      for (const ev of EVENTS) {
        ev.choices.forEach((ch, i) => {
          G.player = null; G.floor = floor; G.log = [];
          G.player = createPlayer('shadowblade');
          G.map = generateMap(floor);
          G.player.inventory.push(cloneItem(ITEM_POOL.find(it => it.id === 'health_potion')));
          G.player.gold = 9999;
          try {
            const text = typeof ch.text === 'function' ? ch.text(G.player) : ch.text;
            const res = ch.effect(G.player);
            const nums = [...Object.values(G.player.stats), ...Object.values(G.player.base)];
            if (typeof text !== 'string' || typeof res !== 'string') out.push(`${ev.id}#${i}: missing text`);
            if (nums.some(n => Number.isNaN(n))) out.push(`${ev.id}#${i}: NaN`);
          } catch (err) { out.push(`${ev.id}#${i} @${floor}: ${err.message}`); }
        });
      }
    }
    return out;
  });
  assert.deepEqual(bad, []);
});
