#!/usr/bin/env node
// Rebuilds derived fusion data. Run after adding or editing fusion classes:
//
//   node tools/build_fusion_index.js
//
// It:
//   1. Renames fusion classes whose id collides with an earlier recipe's
//      result (two recipes must never produce the same class id).
//   2. Gives every fusion class a real element (one that exists in ELEMENTS).
//      Fusion data used invented names like 'bloodsteel'; those are kept as
//      `elementFlavor` (shown as flavor text) and `element` becomes whichever
//      parent element the class's abilities use most.
//   3. Regenerates FUSION_CLASS_FILE (fusion class id → data file number) at
//      the bottom of js/data/fusion_lookup.js.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..', 'abyssal_revamped');
const FUSION_DIR = path.join(ROOT, 'js', 'data', 'fusions');
const FILE_COUNT = 17;
const fusionPath = n => path.join(FUSION_DIR, `fusion_data_${n}.js`);

function loadContext() {
  const ctx = vm.createContext({ console: { debug() {}, log() {}, warn() {} }, document: {}, window: {} });
  for (const f of ['elements.js', 'abilities.js', 'classes.js', 'fusion.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data', f), 'utf8'), ctx, { filename: f });
  }
  return ctx;
}

function slug(name) {
  return name.toLowerCase().replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

// ── 1. Resolve id collisions ─────────────────────────────────
function fixCollisions() {
  const seen = new Map(); // result id → file it was first defined in
  let renamed = 0;
  for (let n = 1; n <= FILE_COUNT; n++) {
    let src = fs.readFileSync(fusionPath(n), 'utf8');
    // Matches both  'a+b': 'id'  and  DUAL_FUSIONS['a+b'] = 'id'
    const recipeRe = /'([a-z_]+\+[a-z_]+)'\]?\s*[:=]\s*'([a-z_0-9]+)'/g;
    const collisions = [];
    for (const m of src.matchAll(recipeRe)) {
      const id = m[2];
      if (seen.has(id) && seen.get(id) !== n) collisions.push({ key: m[1], id });
      else seen.set(id, n);
    }
    for (const { key, id } of collisions) {
      const blockRe = new RegExp(`\\n( +)${id}: \\{\\n\\1  id:'${id}', name:'([^']+)'`);
      const nameMatch = src.match(blockRe);
      if (!nameMatch) throw new Error(`Could not find class block for ${id} in file ${n}`);
      const [, indent, name] = nameMatch;
      let newId = slug(name);
      if (seen.has(newId)) newId = `${newId}_${key.split('+').map(s => s.slice(0, 4)).join('')}`;
      src = src.replace(new RegExp(`('${key.replace('+', '\\+')}'\\]?\\s*[:=]\\s*)'${id}'`), `$1'${newId}'`);
      src = src.replace(`\n${indent}${id}: {\n${indent}  id:'${id}',`, `\n${indent}${newId}: {\n${indent}  id:'${newId}',`);
      seen.set(newId, n);
      renamed++;
      console.log(`file ${n}: ${key} → ${id} renamed to ${newId} ("${name}")`);
    }
    fs.writeFileSync(fusionPath(n), src);
  }
  return renamed;
}

// ── 2. Real elements ─────────────────────────────────────────
function fixElements(ctx) {
  for (let n = 1; n <= FILE_COUNT; n++) vm.runInContext(fs.readFileSync(fusionPath(n), 'utf8'), ctx);
  const { ELEMENTS, ABILITIES, CLASSES, FUSION_CLASSES } = vm.runInContext('({ ELEMENTS, ABILITIES, CLASSES, FUSION_CLASSES })', ctx);
  const baseElement = id => (CLASSES[id] || FUSION_CLASSES[id] || {}).element;
  let fixed = 0;
  for (let n = 1; n <= FILE_COUNT; n++) {
    let src = fs.readFileSync(fusionPath(n), 'utf8');
    const ids = [...src.matchAll(/\n( +)([a-z_0-9]+): \{\n\1  id:'\2'/g)].map(m => [m[2], m[0]]);
    for (const [id, header] of ids) {
      const cls = FUSION_CLASSES[id];
      if (!cls || ELEMENTS[cls.element]) continue;
      const parents = (cls.fusedFrom || []).map(baseElement).filter(el => ELEMENTS[el]);
      const counts = {};
      (cls.abilities || []).forEach(a => {
        const el = ABILITIES[a] && ABILITIES[a].element;
        if (ELEMENTS[el]) counts[el] = (counts[el] || 0) + 1;
      });
      const candidates = parents.length ? parents : Object.keys(counts);
      const best = candidates.slice().sort((a, b) => (counts[b] || 0) - (counts[a] || 0))[0] || 'normal';
      const blockStart = src.indexOf(header);
      const elIdx = src.indexOf(`element:'${cls.element}'`, blockStart);
      if (blockStart < 0 || elIdx < 0) throw new Error(`Could not find element for ${id} in file ${n}`);
      src = src.slice(0, elIdx) + `element:'${best}', elementFlavor:'${cls.element}'` + src.slice(elIdx + `element:'${cls.element}'`.length);
      fixed++;
    }
    fs.writeFileSync(fusionPath(n), src);
  }
  return fixed;
}

// ── 3. Class → file index ────────────────────────────────────
function writeIndex() {
  const index = {};
  for (let n = 1; n <= FILE_COUNT; n++) {
    const src = fs.readFileSync(fusionPath(n), 'utf8');
    for (const m of src.matchAll(/\n( +)([a-z_0-9]+): \{\n\1  id:'\2'/g)) index[m[2]] = n;
  }
  const lookupPath = path.join(ROOT, 'js', 'data', 'fusion_lookup.js');
  let src = fs.readFileSync(lookupPath, 'utf8');
  const marker = '\n// ── FUSION_CLASS_FILE';
  if (src.includes(marker)) src = src.slice(0, src.indexOf(marker));
  const body = Object.entries(index).map(([id, n]) => `  '${id}':${n},`).join('\n');
  src = src.trimEnd() + `\n${marker} — fusion class id → data file (generated by tools/build_fusion_index.js) ──\nconst FUSION_CLASS_FILE = {\n${body}\n};\n`;
  fs.writeFileSync(lookupPath, src);
  return Object.keys(index).length;
}

const renamed = fixCollisions();
const fixed = fixElements(loadContext());
const indexed = writeIndex();
console.log(`Renamed ${renamed} colliding fusion ids, fixed ${fixed} elements, indexed ${indexed} fusion classes.`);
