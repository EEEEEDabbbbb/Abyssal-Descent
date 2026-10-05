// ══════════════════════════════════════════════════════════════
// CONTINUE MODAL — pick a saved run slot to resume
// ══════════════════════════════════════════════════════════════

// Called by the "↺ Continue Run" button on the title screen
function showContinue() {
  const slots = getRunSlots();
  if (!slots.some(s => s !== null)) {
    // Nothing to continue — shouldn't happen since button is hidden, but guard anyway
    return;
  }

  const rows = slots.map((slot, i) => {
    if (!slot) {
      return `
        <div class="continue-slot empty">
          <div class="continue-slot-label" style="color:var(--text-dim);font-style:italic">Empty Slot ${i + 1}</div>
        </div>`;
    }
    const date = new Date(slot.timestamp);
    const dateStr = date.toLocaleDateString(undefined, { month:'short', day:'numeric' })
      + ' ' + date.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' });
    return `
      <div class="continue-slot filled">
        <div class="continue-slot-main" onclick="continueRun(${i})">
          <div class="continue-slot-icon">${slot.classIcon}</div>
          <div class="continue-slot-info">
            <div class="continue-slot-name">${slot.className}</div>
            <div class="continue-slot-floor">Floor ${slot.floor}</div>
            <div class="continue-slot-date">${dateStr}</div>
          </div>
          <div class="continue-slot-action">▶ Load</div>
        </div>
        <button class="continue-slot-delete" onclick="confirmDeleteSlot(${i})" title="Delete save">✕</button>
      </div>`;
  }).join('');

  showModal(`
    <div class="modal-title" style="color:var(--accent-gold)">↺ Continue Run</div>
    <div style="font-size:0.72rem;color:var(--text-dim);text-align:center;margin-bottom:1rem">
      Select a save to resume. Your run will pick up exactly where you left off.
    </div>
    <div class="continue-slots-list">${rows}</div>
    <button class="title-btn" style="margin-top:1rem;width:100%" onclick="closeModal()">← Back</button>
  `);
}

// Load the chosen slot and jump into the game
async function continueRun(slotIndex) {
  closeModal();

  // Show a brief loading state
  showScreen('game-screen');
  const view = document.getElementById('dungeon-view');
  if (view) view.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-dim);font-family:\'Cinzel\',serif;font-size:0.85rem">Resuming…</div>';

  const ok = await loadRun(slotIndex);
  if (!ok) {
    // Corrupt or version-mismatch — bail back to title
    showScreen('title-screen');
    showModal(`
      <div class="modal-title" style="color:var(--accent-crimson)">Save Corrupted</div>
      <div style="text-align:center;color:var(--text-mid);margin:1rem 0">
        This save could not be loaded. It may be from an older version.
      </div>
      <button class="title-btn" style="width:100%" onclick="closeModal()">OK</button>
    `);
    deleteRunSlot(slotIndex);
    _updateContinueBtn();
    return;
  }

  logEntry('system', `↺ Run resumed — Floor ${G.floor}.`);
  updateUI();
  _updateContinueBtn();
}

// Confirm before deleting — prevent fat-finger disasters
function confirmDeleteSlot(slotIndex) {
  const slots = getRunSlots();
  const slot  = slots[slotIndex];
  if (!slot) return;
  showModal(`
    <div class="modal-title" style="color:var(--accent-crimson)">Delete Save?</div>
    <div style="text-align:center;color:var(--text-mid);margin:1rem 0;line-height:1.6">
      Delete <strong style="color:var(--accent-gold)">${slot.className}</strong> on Floor ${slot.floor}?<br>
      <span style="font-size:0.72rem">This cannot be undone.</span>
    </div>
    <div style="display:flex;gap:0.5rem">
      <button class="title-btn" style="flex:1" onclick="showContinue()">← Back</button>
      <button class="title-btn danger" style="flex:1" onclick="deleteRunSlot(${slotIndex});showContinue();_updateContinueBtn()">Delete</button>
    </div>
  `);
}

// Show/hide the Continue button on the title screen
function _updateContinueBtn() {
  const btn = document.getElementById('continue-btn');
  if (!btn) return;
  btn.style.display = (typeof hasAnyRunSave === 'function' && hasAnyRunSave()) ? '' : 'none';
}

// Show the manual save indicator in-game
function _flashSaveIndicator() {
  let el = document.getElementById('run-save-indicator');
  if (!el) return;
  el.textContent = '💾 Saved';
  el.style.opacity = '1';
  clearTimeout(el._fadeTimer);
  el._fadeTimer = setTimeout(() => { el.style.opacity = '0'; }, 2000);
}

// Called by saveRun() wrapper that also updates the UI
function saveRunWithFeedback() {
  if (saveRun()) _flashSaveIndicator();
}
