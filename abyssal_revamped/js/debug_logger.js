// ══════════════════════════════════════════════════════════════
// DEBUG LOGGER — dev only (loaded by index.html when the URL has ?dev=1)
// Wraps core game functions and logs every call to the console.
// The full log is available as window.__abyssalDebugLog.
// ══════════════════════════════════════════════════════════════
(function() {
  var LOG = [];
  var START = Date.now();

  function dbg(cat, msg, data) {
    var ts = '[+' + (Date.now()-START) + 'ms]';
    var entry = ts + '[' + cat + '] ' + msg + (data !== undefined ? ' => ' + JSON.stringify(data) : '');
    LOG.push(entry);
    if (LOG.length > 5000) LOG.shift();
    console.log(entry);
  }

  function safe(fn, name, args) {
    try { return fn.apply(this, args); }
    catch(e) { dbg('ERROR', name + ' THREW: ' + e.message, {stack: e.stack}); throw e; }
  }

  function wrap(obj, name, category) {
    if (!obj || typeof obj[name] !== 'function') return;
    var orig = obj[name];
    obj[name] = function() {
      var args = Array.from(arguments);
      var preview = args.map(function(a) {
        if (a === null) return 'null';
        if (a === undefined) return 'undefined';
        if (typeof a === 'object') {
          try { return JSON.stringify(a).slice(0,80); } catch(e) { return '[obj]'; }
        }
        return String(a).slice(0,80);
      });
      dbg(category, name + '(' + preview.join(', ') + ')');
      var result;
      try { result = orig.apply(this, arguments); }
      catch(e) { dbg('ERROR', name + ' THREW: ' + e.message); throw e; }
      if (result !== undefined && result !== null && typeof result !== 'object') {
        dbg(category, name + ' returned: ' + result);
      }
      return result;
    };
  }

  function install() {
    dbg('BOOT', 'Wrapping all game functions...');

    // === COMBAT ===
    wrap(window, 'dealDmgToEnemy',   'COMBAT');
    wrap(window, 'dealDmgToPlayer',  'COMBAT');
    wrap(window, 'startCombat',      'COMBAT');
    wrap(window, 'playerAction',     'COMBAT');
    wrap(window, 'endPlayerTurn',    'COMBAT');
    wrap(window, 'enemyTurn',        'COMBAT');
    wrap(window, 'checkBossPhase',   'COMBAT');
    wrap(window, 'checkBossEnrage',  'COMBAT');
    wrap(window, 'checkCombatEnd',   'COMBAT');
    wrap(window, 'winCombat',        'COMBAT');
    wrap(window, 'endCombat',        'COMBAT');

    // === MAP / MOVEMENT ===
    wrap(window, 'movePlayer',       'MAP');
    wrap(window, 'handleCellContent','MAP');
    wrap(window, 'nextFloor',        'MAP');
    wrap(window, 'getValidMoves',    'MAP');

    // === PLAYER ===
    wrap(window, 'gainXP',           'PLAYER');
    wrap(window, 'gainClassXP',      'PLAYER');
    wrap(window, 'addToInventory',   'PLAYER');
    wrap(window, 'useItem',          'PLAYER');
    wrap(window, 'equipItem',        'PLAYER');

    // === UI ===
    wrap(window, 'updateUI',         'UI');
    wrap(window, 'renderCenterPanel','UI');
    wrap(window, 'closeModal',       'UI');

    // === STATE SNAPSHOTS on winCombat ===
    var origWin = window.winCombat;
    window.winCombat = function() {
      var e = G.enemy;
      dbg('COMBAT', 'winCombat: enemy snapshot', {
        name: e ? e.name : null,
        isBoss: e ? e.isBoss : null,
        isGuardian: e ? e.isGuardian : null,
        isFinalBoss: e ? e.isFinalBoss : null
      });
      dbg('COMBAT', 'winCombat: G.exitPos', G.exitPos);
      var result = origWin.apply(this, arguments);
      dbg('COMBAT', 'winCombat: exit cell after', G.exitPos ? G.map[G.exitPos.y][G.exitPos.x] : 'no exitPos');
      return result;
    };

    // === CLICK logger ===
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('button,[onclick]');
      if (btn) dbg('CLICK', '"' + btn.textContent.trim().slice(0,40) + '" onclick="' + (btn.getAttribute('onclick')||'').slice(0,80) + '"');
    }, true);

    // === JS errors ===
    window.addEventListener('error', function(e) {
      dbg('JS-ERROR', e.message, {file: e.filename, line: e.lineno});
    });

    dbg('BOOT', 'All functions wrapped. Ready.');
  }
  if (document.readyState === 'complete') install(); else window.addEventListener('load', install);
  window.__abyssalDebugLog = LOG;

  dbg('BOOT', 'Debug logger installed');
})();
