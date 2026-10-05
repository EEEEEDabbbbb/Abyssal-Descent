// ══════════════════════════════════════════════════════════════
// DEVTEST  —  Abyssal Descent
// Call devtest() from the browser inspect console at any time.
// ══════════════════════════════════════════════════════════════

window.devtest = function(opts = {}) {
  const verbose = opts.verbose || false;
  const results = { pass: 0, fail: 0, warn: 0 };
  const failures = {}; // section → [messages]

  const C = {
    head: 'color:#c8a84b;font-weight:bold;font-size:13px',
    ok:   'color:#5edb8a',
    fail: 'color:#f06060;font-weight:bold',
    warn: 'color:#e0b84b',
    dim:  'color:#888',
  };

  function section(name) {
    console.groupCollapsed('%c── ' + name, C.head);
    failures[name] = [];
  }
  function endsection(name) {
    console.groupEnd();
    if (failures[name] && failures[name].length) {
      console.log('%c  ' + failures[name].length + ' failure(s) in "' + name + '":', C.fail);
      failures[name].forEach(m => console.log('%c    ✗ ' + m, C.fail));
    }
  }
  function cur() { return Object.keys(failures)[Object.keys(failures).length - 1]; }

  function pass(msg) { if (verbose) console.log('%c  ✓ ' + msg, C.ok); results.pass++; }
  function fail(msg) { console.log('%c  ✗ ' + msg, C.fail); failures[cur()].push(msg); results.fail++; }
  function warn(msg) { console.log('%c  ⚠ ' + msg, C.warn); results.warn++; }
  function info(msg) { console.log('%c  ' + msg, C.dim); }

  // ── 1. Core globals ──────────────────────────────────────────
  section('Core globals');
  const required = ['ABILITIES','CLASSES','ITEM_POOL','HYBRID_WEAPON_ARTS','WEAPON_ELEMENT_ABILITIES','ELEMENT_ORDER','makeHybridKey','getPrimaryElement'];
  required.forEach(name => {
    try {
      if (eval('typeof ' + name) !== 'undefined') pass(name + ' loaded');
      else fail(name + ' is MISSING');
    } catch(e) { fail(name + ' is MISSING'); }
  });
  endsection('Core globals');

  // Guard
  try { void ABILITIES; void HYBRID_WEAPON_ARTS; void CLASSES; void ITEM_POOL; }
  catch(e) { console.log('%cCritical global missing — is abilities.js deployed?', C.fail); return results; }

  // ── 2. ABILITIES definitions ─────────────────────────────────
  section('ABILITIES definitions');
  const abilityIds = Object.keys(ABILITIES);
  pass(abilityIds.length + ' ability definitions found');
  let badAbils = [];
  abilityIds.forEach(id => {
    const a = ABILITIES[id];
    if (!a.id)   badAbils.push(id + ': missing .id');
    if (!a.name) badAbils.push(id + ': missing .name');
    if (typeof a.use !== 'function') badAbils.push(id + ': missing use() function');
  });
  if (badAbils.length === 0) pass('All ability definitions have id, name, use()');
  else badAbils.forEach(m => fail(m));
  endsection('ABILITIES definitions');

  // ── 3. HYBRID_WEAPON_ARTS lookup integrity ───────────────────
  section('HYBRID_WEAPON_ARTS lookup integrity');
  const lookupKeys = Object.keys(HYBRID_WEAPON_ARTS);
  pass(lookupKeys.length + ' lookup entries found');

  // Group missing ability IDs by combo key for readability
  const missingByKey = {};
  lookupKeys.forEach(key => {
    const entry = HYBRID_WEAPON_ARTS[key];
    if (!entry.abilities || entry.abilities.length === 0) {
      fail(key + ': empty abilities array');
      return;
    }
    const missing = entry.abilities.filter(id => !ABILITIES[id]);
    if (missing.length > 0) missingByKey[key] = missing;
    else if (verbose) pass(key + ': all ' + entry.abilities.length + ' abilities OK');
  });

  if (Object.keys(missingByKey).length === 0) {
    pass('All lookup entries resolve to real abilities');
  } else {
    // Group by suffix pattern to find systematic issues
    const suffixCounts = {};
    Object.values(missingByKey).flat().forEach(id => {
      const suffix = id.replace(/^\w+_\w+_/, '');
      suffixCounts[suffix] = (suffixCounts[suffix] || 0) + 1;
    });
    const totalMissing = Object.values(missingByKey).reduce((a,b) => a + b.length, 0);
    fail(Object.keys(missingByKey).length + ' lookup keys have missing abilities (' + totalMissing + ' total missing IDs)');
    info('Missing by ability suffix (systematic patterns):');
    Object.entries(suffixCounts).sort((a,b) => b[1]-a[1]).forEach(([suffix, count]) => {
      info('  _' + suffix + ': ' + count + ' missing across combos');
    });
    info('First 10 affected keys:');
    Object.entries(missingByKey).slice(0, 10).forEach(([key, ids]) => {
      info('  ' + key + ' → missing: ' + ids.join(', '));
    });
  }
  endsection('HYBRID_WEAPON_ARTS lookup integrity');

  // ── 4. Base class × weapon coverage ─────────────────────────
  section('Base class × weapon element coverage');
  const weaponEls = new Set(
    ITEM_POOL.filter(i => i.type === 'weapon' && i.element && i.element !== 'normal').map(i => i.element)
  );
  info('Weapon elements: ' + [...weaponEls].join(', '));
  const missingKeys = [];
  Object.entries(CLASSES).forEach(([classId, cls]) => {
    const classEl = getPrimaryElement(cls);
    weaponEls.forEach(weaponEl => {
      if (weaponEl === classEl) return;
      const key = makeHybridKey(classEl, weaponEl);
      if (!HYBRID_WEAPON_ARTS[key]) missingKeys.push(classId + '(' + classEl + ') + ' + weaponEl + ' → "' + key + '"');
    });
  });
  if (missingKeys.length === 0) pass('Every base class + weapon combo has a lookup key');
  else { fail(missingKeys.length + ' class+weapon combos have no lookup key'); missingKeys.forEach(m => fail(m)); }
  endsection('Base class × weapon element coverage');

  // ── 5. ITEM_POOL integrity ───────────────────────────────────
  section('ITEM_POOL integrity');
  pass(ITEM_POOL.length + ' items in pool');
  let badItems = 0;
  ITEM_POOL.forEach(item => {
    if (!item.id || !item.name || !item.type) { fail((item.id||'?') + ': missing required field'); badItems++; }
    if (item.grantAbilities) {
      item.grantAbilities.forEach(abId => {
        if (!ABILITIES[abId]) warn(item.id + ': grantAbilities has unknown "' + abId + '"');
      });
    }
  });
  if (badItems === 0) pass('All items have id, name, type');
  endsection('ITEM_POOL integrity');

  // ── 6. CLASSES integrity ────────────────────────────────────
  section('CLASSES integrity');
  pass(Object.keys(CLASSES).length + ' base classes');
  let badClasses = 0;
  Object.entries(CLASSES).forEach(([id, cls]) => {
    if (!cls.element) { fail(id + ': missing .element'); badClasses++; return; }
    const missing = (cls.abilities||[]).filter(a => !ABILITIES[a]);
    if (missing.length > 0) { fail(id + ': unknown abilities — ' + missing.join(', ')); badClasses++; }
    else if (verbose) pass(id + ': OK');
  });
  if (badClasses === 0) pass('All base classes valid');
  endsection('CLASSES integrity');

  // ── 7. Active player ────────────────────────────────────────
  section('Active player');
  if (typeof G === 'undefined' || !G.player) {
    info('No active run — skipping');
  } else {
    const p = G.player;
    pass('Player class: ' + p.classId);
    const unknownAbils = p.abilities.filter(a => !ABILITIES[a]);
    if (unknownAbils.length > 0) fail('Player has unknown abilities: ' + unknownAbils.join(', '));
    else pass('Player abilities valid (' + p.abilities.length + ')');
    if (p.equipment && p.equipment.weapon) {
      const w = p.equipment.weapon;
      const cls = getClassData(p.classId);
      const classEl = cls ? getPrimaryElement(cls) : p._baseElement;
      const key = makeHybridKey(classEl, w.element);
      if (HYBRID_WEAPON_ARTS[key]) pass('Weapon key "' + key + '" exists');
      else warn('Weapon key "' + key + '" not found (using fallback)');
    } else info('No weapon equipped');
  }
  endsection('Active player');

  // ── Summary ──────────────────────────────────────────────────
  const status = results.fail > 0 ? '✗ FAILED' : results.warn > 0 ? '⚠ PASSED WITH WARNINGS' : '✓ ALL TESTS PASSED';
  const style  = results.fail > 0 ? C.fail : results.warn > 0 ? C.warn : C.ok;
  console.log('');
  console.log('%c' + status + '%c  —  ' + results.pass + ' passed, ' + results.fail + ' failed, ' + results.warn + ' warnings', style, C.dim);
  return results;
};

console.log('%cdevtest() ready. devtest() = failures only. devtest({verbose:true}) = everything.', 'color:#7c5cbf;font-style:italic');
