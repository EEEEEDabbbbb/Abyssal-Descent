// ══════════════════════════════════════════════════════════════
// RECORDS UI  (js/ui/records_ui.js)
//
// renderRunSummary(containerId, stats) — stat tiles for one run (death screen)
// showRunStats()  — pause menu: the current run so far
// showRecords()   — title screen: lifetime totals, achievements, run history
// Data lives in js/engine/records.js.
// ══════════════════════════════════════════════════════════════

function _fmt(n) { return Math.round(n || 0).toLocaleString(); }

function _runTiles(s) {
  return [
    ['Enemies slain', _fmt(s.kills)],
    ['Bosses & guardians', _fmt(s.bosses)],
    ['Damage dealt', _fmt(s.dmgDealt)],
    ['Damage taken', _fmt(s.dmgTaken)],
    ['Biggest hit', _fmt(s.bestHit)],
    ['Critical hits', _fmt(s.crits)],
    ['Chests opened', _fmt(s.chests)],
    ['Events', _fmt(s.events)],
    ['Steps', _fmt(s.steps)],
    ['Play time', formatPlayTime(s.playMs)],
  ].map(([k, v]) => `<div class="rs-tile"><span class="rs-val">${v}</span><span class="rs-label">${k}</span></div>`).join('');
}

function renderRunSummary(containerId, record) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const s = (G.player && G.player.runStats) || newRunStats();
  el.innerHTML = `<div class="rs-grid">${_runTiles(s)}</div>` +
    (record && record.killedBy ? `<div class="rs-foot">Slain by <b>${record.killedBy}</b>${record.seed ? ` · Seed <span class="rs-seed">${record.seed}</span>` : ''}</div>`
      : (G.seed ? `<div class="rs-foot">Seed <span class="rs-seed">${G.seed}</span></div>` : ''));
}

function showRunStats() {
  if (!G.player) return;
  flushPlayClock();
  showModal(`<div class="modal-title">📊 This Run</div>
    <div style="text-align:center;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
      Floor ${G.floor} · Level ${G.player.level} · ⚗ ${_fmt(runStats().shards)} Soul Shards earned${G.seed ? ` · Seed <span class="rs-seed">${G.seed}</span>` : ''}
    </div>
    <div class="rs-grid">${_runTiles(runStats())}</div>
    <button class="title-btn" style="width:100%;min-width:0;max-width:100%;margin-top:0.75rem" onclick="closeModal();showPauseMenu()">← Back</button>`);
}

function _outcomeLabel(r) {
  if (r.outcome === 'conquered') return '<span style="color:var(--accent-gold)">👑 Conquered</span>';
  if (r.outcome === 'abandoned') return '<span style="color:var(--text-dim)">Abandoned</span>';
  return `<span style="color:var(--accent-crimson)">☠ ${r.killedBy ? 'Slain by ' + r.killedBy : 'Died'}</span>`;
}

function showRecords(tab = 'overview') {
  const m = G.meta;
  const L = { ...defaultMeta().lifetime, ...(m.lifetime || {}) };
  const earned = ACHIEVEMENTS.filter(a => hasAchievement(a.id)).length;
  const tabs = [['overview', 'Overview'], ['achievements', `Achievements ${earned}/${ACHIEVEMENTS.length}`], ['history', 'Recent Runs']];
  const tabBar = `<div class="seg-group" role="tablist" style="margin-bottom:0.75rem">${tabs.map(([id, label]) =>
    `<button class="seg-btn ${tab === id ? 'active' : ''}" role="tab" aria-selected="${tab === id}" onclick="showRecords('${id}')">${label}</button>`).join('')}</div>`;

  let body = '';
  if (tab === 'overview') {
    const tiles = [
      ['Deepest floor', _fmt(m.maxFloor)], ['Runs', _fmt(L.runs)], ['Conquests', _fmt(L.conquests)],
      ['Enemies slain', _fmt(L.kills)], ['Bosses & guardians', _fmt(L.bosses)], ['Biggest hit', _fmt(L.bestHit)],
      ['Damage dealt', _fmt(L.dmgDealt)], ['Shards earned', _fmt(L.shards)], ['Play time', formatPlayTime(L.playMs)],
      ['Classes unlocked', _fmt((m.unlockedClasses || []).length)], ['New Game+', _fmt(m.ngPlus)], ['Achievements', `${earned}/${ACHIEVEMENTS.length}`],
    ];
    body = `<div class="rs-grid">${tiles.map(([k, v]) => `<div class="rs-tile"><span class="rs-val">${v}</span><span class="rs-label">${k}</span></div>`).join('')}</div>`;
  } else if (tab === 'achievements') {
    body = `<div class="ach-grid">${ACHIEVEMENTS.map(a => {
      const got = hasAchievement(a.id);
      const when = got ? new Date(m.achievements[a.id]).toLocaleDateString() : '';
      return `<div class="ach ${got ? 'ach-got' : ''}" aria-label="${a.name}: ${got ? 'earned' : 'not earned'}">
        <span class="ach-icon">${got ? a.icon : '🔒'}</span>
        <span class="ach-text"><b>${a.name}</b><span>${a.desc}</span></span>
        <span class="ach-reward">${got ? when : '+' + a.shards + ' ⚗'}</span>
      </div>`;
    }).join('')}</div>`;
  } else {
    const runs = m.runHistory || [];
    body = runs.length ? `<div class="run-hist">${runs.map(r => `
      <div class="run-row">
        <span class="run-icon">${r.icon || '⚔'}</span>
        <span class="run-main"><b>${r.className}</b> · Floor ${r.floor} · Lv ${r.level}${r.ngPlus ? ` · NG+${r.ngPlus}` : ''}<br>${_outcomeLabel(r)}</span>
        <span class="run-side">${_fmt(r.kills)} kills · ⚗ ${_fmt(r.shards)}<br>${formatPlayTime(r.playMs)} · ${new Date(r.at).toLocaleDateString()}${r.seed ? `<br><span class="rs-seed">${r.seed}</span>` : ''}</span>
      </div>`).join('')}</div>` : '<div style="text-align:center;color:var(--text-dim);padding:1rem">No finished runs yet.</div>';
  }
  showModal(`<div class="modal-title">🏆 Records</div>${tabBar}<div class="records-body">${body}</div>
    <button class="title-btn" style="width:100%;min-width:0;max-width:100%;margin-top:0.75rem" onclick="closeModal()">Close</button>`);
}
