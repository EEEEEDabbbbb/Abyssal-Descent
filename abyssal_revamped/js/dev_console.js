// ══════════════════════════════════════════════════════════════
// DEV CONSOLE  —  Abyssal Descent
// Toggle with:  ` (backtick)  or  F2
// ══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Inject styles ──────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #dev-console-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
    }
    #dev-console-overlay.open { display: block; }

    #dev-console {
      pointer-events: all;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(640px, 94vw);
      max-height: 80vh;
      background: #0d0b14;
      border: 1px solid #7c5cbf;
      border-radius: 6px;
      box-shadow: 0 0 40px #4a2d8a88, 0 0 0 1px #2a1a4a;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #d4b8ff;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    #dev-console-header {
      background: #1a1030;
      border-bottom: 1px solid #7c5cbf44;
      padding: 8px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      cursor: move;
    }
    #dev-console-header span {
      color: #c8a84b;
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 11px;
      text-transform: uppercase;
    }
    #dev-console-close {
      background: none;
      border: none;
      color: #7c5cbf;
      font-size: 18px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
    }
    #dev-console-close:hover { color: #c8a84b; }

    #dev-console-log {
      flex: 1;
      overflow-y: auto;
      padding: 10px 14px;
      min-height: 120px;
      max-height: 300px;
      scrollbar-width: thin;
      scrollbar-color: #7c5cbf44 transparent;
    }
    .dev-log-line { margin: 2px 0; line-height: 1.5; word-break: break-word; }
    .dev-log-line.info  { color: #a88fe0; }
    .dev-log-line.ok    { color: #5edb8a; }
    .dev-log-line.error { color: #f06060; }
    .dev-log-line.warn  { color: #e0b84b; }
    .dev-log-line.cmd   { color: #c8a84b; }

    #dev-console-input-row {
      display: flex;
      border-top: 1px solid #7c5cbf44;
      background: #110e1c;
      padding: 8px 10px;
      gap: 8px;
      align-items: center;
    }
    #dev-console-input-row span { color: #7c5cbf; font-size: 14px; }
    #dev-console-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #e2d4ff;
      font-family: inherit;
      font-size: 13px;
      caret-color: #c8a84b;
    }
    #dev-console-run {
      background: #2a1a4a;
      border: 1px solid #7c5cbf66;
      color: #c8a84b;
      border-radius: 4px;
      padding: 3px 10px;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
    }
    #dev-console-run:hover { background: #3b2460; }

    #dev-console-hints {
      border-top: 1px solid #7c5cbf22;
      padding: 8px 14px;
      font-size: 11px;
      color: #5a4880;
      line-height: 1.7;
    }
    #dev-console-hints b { color: #7c5cbf; }
  `;
  document.head.appendChild(style);

  // ── Build DOM ──────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'dev-console-overlay';
  overlay.innerHTML = `
    <div id="dev-console">
      <div id="dev-console-header">
        <span>⚙ DEV CONSOLE</span>
        <button id="dev-console-close">✕</button>
      </div>
      <div id="dev-console-log"></div>
      <div id="dev-console-input-row">
        <span>&gt;</span>
        <input id="dev-console-input" type="text" placeholder="type a command…" autocomplete="off" spellcheck="false" />
        <button id="dev-console-run">RUN</button>
      </div>
      <div id="dev-console-hints">
        <b>setlevel &lt;classId&gt; &lt;1-20&gt;</b> — set a class level &nbsp;|&nbsp;
        <b>maxlevel [classId]</b> — max one or all classes<br>
        <b>give shards &lt;n&gt;</b> — add Soul Shards &nbsp;|&nbsp;
        <b>give talent &lt;n&gt;</b> — add Talent Points &nbsp;|&nbsp;
        <b>give item &lt;id&gt;</b> — add item to inventory<br>
        <b>unlocksecret [all|bossId]</b> — unlock secret boss class(es) &nbsp;|&nbsp;
        <b>converge</b> — force-unlock The Convergence &nbsp;|&nbsp;
        <b>finalfusion</b> — force-unlock The Unnamed<br>
        <b>listitems [filter]</b> — browse all item IDs &nbsp;|&nbsp;
        <b>setall &lt;1-20&gt;</b> — set ALL unlocked classes to a level &nbsp;|&nbsp;
        <b>status</b> — show current meta &nbsp;|&nbsp; <b>help</b>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // ── Helpers ────────────────────────────────────────────────
  const logEl = () => document.getElementById('dev-console-log');

  function log(msg, type = 'info') {
    const el = logEl();
    const line = document.createElement('div');
    line.className = `dev-log-line ${type}`;
    line.textContent = msg;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
  }

  function clear() { logEl().innerHTML = ''; }

  // ── Toggle ─────────────────────────────────────────────────
  function openConsole() {
    overlay.classList.add('open');
    document.getElementById('dev-console-input').focus();
  }
  function closeConsole() {
    overlay.classList.remove('open');
  }
  function toggleConsole() {
    overlay.classList.contains('open') ? closeConsole() : openConsole();
  }

  document.getElementById('dev-console-close').onclick = closeConsole;

  document.addEventListener('keydown', e => {
    if (e.key === '`' || e.key === 'F2') { e.preventDefault(); toggleConsole(); }
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeConsole();
  });

  // Block ALL keyboard events from reaching the game while the input is focused.
  // Use capture phase + stopImmediatePropagation so we intercept before the game's listeners.
  function blockForGame(e) {
    if (document.activeElement === input) {
      if (e.key === 'Enter') return; // let Enter through to trigger runInput()
      e.stopImmediatePropagation();
      // Don't preventDefault — we still want the browser to type the character into the input
    }
  }
  document.addEventListener('keydown',  blockForGame, true);
  document.addEventListener('keyup',    blockForGame, true);
  document.addEventListener('keypress', blockForGame, true);

  // ── Draggable ──────────────────────────────────────────────
  const panel   = document.getElementById('dev-console');
  const header  = document.getElementById('dev-console-header');
  let dragging  = false, ox = 0, oy = 0;
  header.addEventListener('mousedown', e => {
    dragging = true;
    const r = panel.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    panel.style.transform = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    panel.style.left = (e.clientX - ox) + 'px';
    panel.style.top  = (e.clientY - oy) + 'px';
  });
  document.addEventListener('mouseup', () => { dragging = false; });

  // ── Command history ────────────────────────────────────────
  const history = [];
  let histIdx   = -1;
  const input   = document.getElementById('dev-console-input');

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')     { runInput(); }
    if (e.key === 'ArrowUp')   { if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; } e.preventDefault(); }
    if (e.key === 'ArrowDown') { if (histIdx > 0) { histIdx--; input.value = history[histIdx]; } else { histIdx = -1; input.value = ''; } e.preventDefault(); }
  });
  document.getElementById('dev-console-run').onclick = runInput;

  function runInput() {
    const raw = input.value.trim();
    if (!raw) return;
    history.unshift(raw);
    histIdx = -1;
    input.value = '';
    log('> ' + raw, 'cmd');
    execute(raw);
  }

  // ── All class IDs (base + fusion, including secret boss classes) ──
  function getAllClassIds() {
    const base   = typeof CLASSES        !== 'undefined' ? Object.keys(CLASSES)        : [];
    const fusion = typeof FUSION_CLASSES !== 'undefined' ? Object.keys(FUSION_CLASSES) : [];
    return [...new Set([...base, ...fusion])];
  }

  // ── Refresh fusion lab button if it's currently open ──────
  function refreshFusionLabIfOpen() {
    if (typeof _checkConvergenceButton === 'function') {
      try { _checkConvergenceButton(); } catch(e) {}
    }
    if (typeof _renderRoster === 'function') {
      try { _renderRoster(); } catch(e) {}
    }
  }

  // ── Command executor ───────────────────────────────────────
  function execute(raw) {
    const parts = raw.trim().toLowerCase().split(/\s+/);
    const cmd   = parts[0];

    // ── help ──────────────────────────────────────────────
    if (cmd === 'help' || cmd === '?') {
      log('── Commands ──────────────────────────────────', 'info');
      log('setlevel <classId> <1-20>          — set a specific class to a level', 'info');
      log('maxlevel [classId]                 — max one class, or ALL unlocked if no arg', 'info');
      log('setall <1-20>                      — set every unlocked class to a level', 'info');
      log('give shards <n>                    — add n Soul Shards', 'info');
      log('give talent <n>                    — add n Talent Points', 'info');
      log('give item <itemId>                 — add item to inventory (must be in a run)', 'info');
      log('listitems [filter]                 — list all item IDs (optional partial filter)', 'info');
      log('unlockall                          — unlock all base classes', 'info');
      log('unlocksecret [all|herald|rot|tempest|horror|warden]  — unlock secret boss class(es)', 'info');
      log('converge                           — force-unlock The Convergence (maxes prereqs)', 'info');
      log('finalfusion                        — force-unlock The Unnamed (maxes prereqs)', 'info');
      log('status                             — print current meta snapshot', 'info');
      log('clear                              — clear this log', 'info');
      return;
    }

    // ── clear ─────────────────────────────────────────────
    if (cmd === 'clear') { clear(); return; }

    // ── status ────────────────────────────────────────────
    if (cmd === 'status') {
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      log(`Soul Shards:   ${G.meta.soulShards}`, 'ok');
      log(`Talent Points: ${G.meta.talentPoints}`, 'ok');
      log(`Unlocked classes (${G.meta.unlockedClasses.length}): ${G.meta.unlockedClasses.join(', ')}`, 'ok');
      const lvls = G.meta.classLevels || {};
      const lvlStrs = Object.entries(lvls).map(([k, v]) => `${k}:${v}`).join(', ');
      log(`Class levels: ${lvlStrs || '(none recorded)'}`, 'ok');
      return;
    }

    // ── setlevel <classId> <n> ────────────────────────────
    if (cmd === 'setlevel') {
      if (parts.length < 3) { log('Usage: setlevel <classId> <1-20>', 'error'); return; }
      const classId = parts[1];
      const level   = parseInt(parts[2], 10);
      if (isNaN(level) || level < 1 || level > 20) { log('Level must be 1-20.', 'error'); return; }
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      const allIds = getAllClassIds();
      if (!allIds.includes(classId)) { log(`Unknown class: "${classId}". Check your spelling.`, 'error'); return; }
      G.meta.classLevels = G.meta.classLevels || {};
      G.meta.classLevels[classId] = level;
      // Auto-unlock if not already
      if (!G.meta.unlockedClasses.includes(classId)) {
        G.meta.unlockedClasses.push(classId);
        log(`  → also unlocked ${classId}`, 'warn');
      }
      if (typeof saveMeta === 'function') saveMeta();
      log(`✓ ${classId} set to level ${level}.`, 'ok');
      refreshFusionLabIfOpen();
      return;
    }

    // ── maxlevel [classId] ────────────────────────────────
    if (cmd === 'maxlevel') {
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      G.meta.classLevels = G.meta.classLevels || {};
      if (parts.length >= 2 && parts[1] !== 'all') {
        // Single class
        const classId = parts[1];
        const allIds  = getAllClassIds();
        if (!allIds.includes(classId)) { log(`Unknown class: "${classId}".`, 'error'); return; }
        G.meta.classLevels[classId] = 20;
        if (!G.meta.unlockedClasses.includes(classId)) {
          G.meta.unlockedClasses.push(classId);
          log(`  → also unlocked ${classId}`, 'warn');
        }
        if (typeof saveMeta === 'function') saveMeta();
        log(`✓ ${classId} maxed to level 20.`, 'ok');
      } else {
        // All unlocked classes
        const targets = G.meta.unlockedClasses.length ? G.meta.unlockedClasses : getAllClassIds();
        targets.forEach(id => { G.meta.classLevels[id] = 20; });
        if (typeof saveMeta === 'function') saveMeta();
        log(`✓ Maxed ${targets.length} classes to level 20.`, 'ok');
      }
      refreshFusionLabIfOpen();
      return;
    }

    // ── setall <n> ────────────────────────────────────────
    if (cmd === 'setall') {
      if (parts.length < 2) { log('Usage: setall <1-20>', 'error'); return; }
      const level = parseInt(parts[1], 10);
      if (isNaN(level) || level < 1 || level > 20) { log('Level must be 1-20.', 'error'); return; }
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      G.meta.classLevels = G.meta.classLevels || {};
      const targets = G.meta.unlockedClasses.length ? G.meta.unlockedClasses : getAllClassIds();
      targets.forEach(id => { G.meta.classLevels[id] = level; });
      if (typeof saveMeta === 'function') saveMeta();
      log(`✓ Set ${targets.length} classes to level ${level}.`, 'ok');
      refreshFusionLabIfOpen();
      return;
    }

    // ── unlocksecret [all | bossId] ───────────────────────
    // bossId shortcuts: herald, rot, tempest, horror, warden
    // or pass the class id directly: voidreaper, plagueborn, etc.
    if (cmd === 'unlocksecret') {
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      const SECRET_MAP = {
        herald:      'voidreaper',
        rot:         'plagueborn',
        tempest:     'stormlord',
        horror:      'soulrender',
        warden:      'abyssal_tyrant',
        voidreaper:  'voidreaper',
        plagueborn:  'plagueborn',
        stormlord:   'stormlord',
        soulrender:  'soulrender',
        abyssal_tyrant: 'abyssal_tyrant',
      };
      const SECRET_IDS = ['voidreaper','plagueborn','stormlord','soulrender','abyssal_tyrant'];
      const arg = parts[1] || 'all';
      const targets = arg === 'all' ? SECRET_IDS : [SECRET_MAP[arg]].filter(Boolean);
      if (!targets.length) {
        log(`Unknown secret boss: "${arg}". Use: all, herald, rot, tempest, horror, warden`, 'error');
        log('Or use the class id directly: voidreaper, plagueborn, stormlord, soulrender, abyssal_tyrant', 'warn');
        return;
      }
      G.meta.classLevels = G.meta.classLevels || {};
      let added = 0;
      targets.forEach(id => {
        if (!G.meta.unlockedClasses.includes(id)) { G.meta.unlockedClasses.push(id); }
        if (!G.meta.unlockedFusions.includes(id)) { G.meta.unlockedFusions.push(id); }
        G.meta.classLevels[id] = G.meta.classLevels[id] || 1;
        added++;
        const cls = (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[id]) || {};
        log(`✓ Unlocked: ${cls.name || id}`, 'ok');
      });
      if (typeof saveMeta === 'function') saveMeta();
      refreshFusionLabIfOpen();
      if (typeof updateUI === 'function') updateUI();
      log(`${added} secret class(es) unlocked. Use maxlevel to max them.`, 'info');
      return;
    }

    // ── triggersecret [boss] — force a secret boss to spawn on next floor ──
    // Usage: triggersecret herald | rot | tempest | horror | warden
    // Must be in an active run. The boss spawns when you descend to the next floor.
    if (cmd === 'triggersecret') {
      if (typeof G === 'undefined' || !G.player) { log('Must be in an active run.', 'error'); return; }
      const BOSS_MAP = {
        herald:  'herald_of_nothing',
        rot:     'the_rot',
        tempest: 'the_tempest_unbound',
        horror:  'undying_horror',
        warden:  'the_first_warden',
      };
      const arg = parts[1];
      if (!arg || !BOSS_MAP[arg]) {
        log('Usage: triggersecret <herald|rot|tempest|horror|warden>', 'warn');
        log('This will force that secret boss to spawn on your next floor transition.', 'info');
        return;
      }
      const bossId = BOSS_MAP[arg];
      // Check if SECRET_BOSSES is accessible
      if (typeof SECRET_BOSSES === 'undefined') { log('SECRET_BOSSES not loaded.', 'error'); return; }
      const boss = SECRET_BOSSES[bossId];
      if (!boss) { log(`Boss "${bossId}" not found in SECRET_BOSSES.`, 'error'); return; }
      // Force the trigger by setting a flag that generateMap checks
      G._forceSecretBoss = bossId;
      G._secretBossTriggeredThisRun = false; // allow re-trigger for testing
      log(`✓ "${boss.name}" queued — descend to the next floor to fight it.`, 'ok');
      log(`Trigger window: floors ${boss.triggerWindow.minFloor}–${boss.triggerWindow.maxFloor} (bypassed for test).`, 'info');
      return;
    }

    // ── converge — force-unlock The Convergence ───────────
    if (cmd === 'converge') {
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      G.meta.classLevels = G.meta.classLevels || {};
      // Ensure all 5 secret classes are unlocked + maxed so canConverge() passes
      const SECRET_IDS = ['voidreaper','plagueborn','stormlord','soulrender','abyssal_tyrant'];
      SECRET_IDS.forEach(id => {
        if (!G.meta.unlockedClasses.includes(id)) G.meta.unlockedClasses.push(id);
        if (!G.meta.unlockedFusions.includes(id)) G.meta.unlockedFusions.push(id);
        G.meta.classLevels[id] = 20;
      });
      if (G.meta.unlockedClasses.includes('the_convergence')) {
        log('The Convergence is already unlocked.', 'warn');
        refreshFusionLabIfOpen();
        return;
      }
      G.meta.unlockedClasses.push('the_convergence');
      G.meta.unlockedFusions.push('the_convergence');
      G.meta.classLevels['the_convergence'] = G.meta.classLevels['the_convergence'] || 1;
      if (typeof saveMeta === 'function') saveMeta();
      refreshFusionLabIfOpen();
      if (typeof updateUI === 'function') updateUI();
      log('✓ The Convergence unlocked. (All 5 secret classes also maxed)', 'ok');
      return;
    }

    // ── finalfusion — force-unlock The Unnamed ────────────
    if (cmd === 'finalfusion') {
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      G.meta.classLevels = G.meta.classLevels || {};
      if (G.meta.unlockedClasses.includes('the_unnamed')) {
        log('The Unnamed is already unlocked.', 'warn');
        return;
      }
      // Ensure prerequisites exist
      ['the_convergence','abyssal_one'].forEach(id => {
        if (!G.meta.unlockedClasses.includes(id)) G.meta.unlockedClasses.push(id);
        if (!G.meta.unlockedFusions.includes(id)) G.meta.unlockedFusions.push(id);
        G.meta.classLevels[id] = 20;
      });
      G.meta.unlockedClasses.push('the_unnamed');
      G.meta.unlockedFusions.push('the_unnamed');
      G.meta.classLevels['the_unnamed'] = G.meta.classLevels['the_unnamed'] || 1;
      if (typeof saveMeta === 'function') saveMeta();
      refreshFusionLabIfOpen();
      if (typeof updateUI === 'function') updateUI();
      log('✓         ', 'ok'); // intentionally blank
      return;
    }

    // ── give shards/talent/item ───────────────────────────
    if (cmd === 'give') {
      if (parts.length < 3) { log('Usage: give shards <n>  |  give talent <n>  |  give item <id>', 'error'); return; }
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      const sub = parts[1];

      // item branch — no numeric amount needed, must come first
      if (sub === 'item' || sub === 'items') {
        if (!G.player) { log('No active player. Start a run first.', 'error'); return; }
        const itemId = parts[2];
        if (typeof ITEM_POOL === 'undefined') { log('ITEM_POOL not loaded.', 'error'); return; }
        const template = ITEM_POOL.find(i => i.id === itemId);
        if (!template) {
          const matches = ITEM_POOL.filter(i => i.id.includes(itemId)).map(i => i.id).slice(0, 8);
          log(`Unknown item: "${itemId}".`, 'error');
          if (matches.length) log(`Did you mean: ${matches.join(', ')}`, 'warn');
          else log(`Try: listitems ${itemId}`, 'warn');
          return;
        }
        if (G.player.inventory.length >= 12) { log('Inventory full (12/12). Drop something first.', 'error'); return; }
        const item = Object.assign({}, template);
        G.player.inventory.push(item);
        if (typeof updateUI === 'function') updateUI();
        log(`✓ Added "${item.name}" (${item.rarity}) to inventory. [${G.player.inventory.length}/12]`, 'ok');
        return;
      }

      const amount = parseInt(parts[2], 10);
      if (isNaN(amount)) { log('Amount must be a number.', 'error'); return; }
      if (sub === 'shards' || sub === 'soulshards') {
        G.meta.soulShards = (G.meta.soulShards || 0) + amount;
        if (typeof saveMeta === 'function') saveMeta();
        log(`✓ Added ${amount} Soul Shards. Total: ${G.meta.soulShards}.`, 'ok');
        const el = document.getElementById('soul-shards-display');
        if (el) el.textContent = G.meta.soulShards;
        if (typeof updateUI === 'function') updateUI();
        return;
      }
      if (sub === 'talent' || sub === 'talents' || sub === 'talentpoints') {
        G.meta.talentPoints = (G.meta.talentPoints || 0) + amount;
        if (G.player) G.player.talentPoints = (G.player.talentPoints || 0) + amount;
        if (typeof saveMeta === 'function') saveMeta();
        log(`✓ Added ${amount} Talent Points. Total: ${G.meta.talentPoints}.`, 'ok');
        if (typeof updateUI === 'function') updateUI();
        return;
      }
      log(`Unknown resource: "${sub}". Use "shards", "talent", or "item <id>".`, 'error');
      return;
    }

    // ── unlockall ─────────────────────────────────────────
    if (cmd === 'unlockall') {
      if (typeof G === 'undefined') { log('G is not defined yet.', 'error'); return; }
      const allIds = getAllClassIds();
      let added = 0;
      allIds.forEach(id => {
        if (!G.meta.unlockedClasses.includes(id)) {
          G.meta.unlockedClasses.push(id);
          added++;
        }
      });
      // Also push FUSION_CLASSES entries into unlockedFusions
      if (typeof FUSION_CLASSES !== 'undefined') {
        Object.keys(FUSION_CLASSES).forEach(id => {
          if (!G.meta.unlockedFusions.includes(id)) G.meta.unlockedFusions.push(id);
        });
      }
      if (typeof saveMeta === 'function') saveMeta();
      log(`✓ Unlocked ${added} new classes. Total unlocked: ${G.meta.unlockedClasses.length}.`, 'ok');
      log(`✓ unlockedFusions: ${G.meta.unlockedFusions.join(', ')}`, 'ok');
      return;
    }

    // ── diagcollection — dump what showClassCollection sees ──
    if (cmd === 'diagcollection') {
      if (typeof G === 'undefined') { log('G not defined.', 'error'); return; }
      const unlocked = G.meta.unlockedClasses || [];
      const fused    = G.meta.unlockedFusions  || [];
      const levels   = G.meta.classLevels      || {};

      log(`── unlockedClasses (${unlocked.length}) ──`, 'warn');
      log(unlocked.join(', ') || '(none)', 'info');

      log(`── unlockedFusions (${fused.length}) ──`, 'warn');
      log(fused.join(', ') || '(none)', 'info');

      log(`── CLASSES keys ──`, 'warn');
      const ckeys = typeof CLASSES !== 'undefined' ? Object.keys(CLASSES) : [];
      log(ckeys.join(', ') || '(none)', 'info');

      log(`── FUSION_CLASSES keys ──`, 'warn');
      const fkeys = typeof FUSION_CLASSES !== 'undefined' ? Object.keys(FUSION_CLASSES) : [];
      log(fkeys.join(', ') || '(none)', 'info');

      // Simulate what fusionEntries builder does
      const fusionOnlyIds = fkeys.filter(id => !ckeys.includes(id));
      log(`── FUSION_CLASSES not in CLASSES (fusion-only) ──`, 'warn');
      log(fusionOnlyIds.join(', ') || '(none)', 'info');

      const extraFused = fusionOnlyIds.filter(id => unlocked.includes(id) && !fused.includes(id));
      log(`── extraFused (fusion-only ids in unlockedClasses but not unlockedFusions) ──`, 'warn');
      log(extraFused.join(', ') || '(none)', 'info');

      const allFusedIds = [...fused, ...extraFused];
      log(`── allFusedIds (will become fusionEntries) ──`, 'warn');
      log(allFusedIds.join(', ') || '(none)', 'info');

      // Check rarity resolution for each
      log(`── rarity per fusionEntry ──`, 'warn');
      allFusedIds.forEach(id => {
        const cls = (typeof FUSION_CLASSES !== 'undefined' && FUSION_CLASSES[id]) || {};
        const rarity = (typeof CLASS_RARITY !== 'undefined' ? CLASS_RARITY[id] : null) || cls.rarity || 'rare';
        log(`  ${id}: rarity=${rarity}, in CLASS_RARITY=${!!(CLASS_RARITY&&CLASS_RARITY[id])}, cls.rarity=${cls.rarity||'(none)'}`, 'info');
      });

      // Check abyssal classes specifically
      const abyssalClasses = ['the_convergence','the_unnamed','abyssal_one','voidreaper','plagueborn','stormlord','soulrender','abyssal_tyrant'];
      log(`── abyssal class status ──`, 'warn');
      abyssalClasses.forEach(id => {
        const inCLASSES = ckeys.includes(id);
        const inFUSION  = fkeys.includes(id);
        const inUnlocked = unlocked.includes(id);
        const inFused    = fused.includes(id);
        log(`  ${id}: CLASSES=${inCLASSES} FUSION_CLASSES=${inFUSION} unlockedClasses=${inUnlocked} unlockedFusions=${inFused}`, inUnlocked||inFused ? 'ok' : 'error');
      });
      return;
    }

    // ── listitems [filter] ────────────────────────────────
    if (cmd === 'listitems') {
      if (typeof ITEM_POOL === 'undefined') { log('ITEM_POOL not loaded.', 'error'); return; }
      const filter = parts[1] || '';
      const results = ITEM_POOL.filter(i => !filter || i.id.includes(filter) || i.name.toLowerCase().includes(filter) || (i.type && i.type.includes(filter)) || (i.element && i.element.includes(filter)) || (i.rarity && i.rarity.includes(filter)) || (i.slot && i.slot.includes(filter)));
      if (!results.length) { log(`No items matching "${filter}".`, 'warn'); return; }
      log(`── ${results.length} item(s)${filter ? ' matching "'+filter+'"' : ''} ──`, 'info');
      // Group by type
      const byType = {};
      results.forEach(i => { (byType[i.type] = byType[i.type] || []).push(i); });
      for (const [type, items] of Object.entries(byType)) {
        log(`[${type}]`, 'warn');
        items.forEach(i => log(`  ${i.id.padEnd(32)} ${i.icon} ${i.name} (${i.rarity})`, 'ok'));
      }
      return;
    }

    
  }

  // ── Boot message ───────────────────────────────────────────
  log('Abyssal Descent — Dev Console ready.', 'info');
  log('Press ` (backtick) or F2 to toggle. Type "help" for commands.', 'info');
})();
