// ══════════════════════════════════════════════════════════════
// SFX  (js/ui/sfx.js)
//
// Tiny synthesized sound effects via the Web Audio API — no audio files.
// sfx(name) plays one; volume follows S.masterVol (0 = muted).
// Sounds: hit, crit, hurt, miss, heal, levelup, victory, death, descend,
//         chest, boss
// Browsers only allow audio after the first click/keypress, so the very
// first sounds of a session may be silent — that's expected.
// ══════════════════════════════════════════════════════════════

const SFX = (() => {
  let ctx = null;
  const lastPlayed = {};

  function audio() {
    if (!S || S.masterVol <= 0) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function tone({ freq = 440, to = null, dur = 0.12, type = 'square', vol = 0.2, delay = 0 }) {
    const a = audio(); if (!a) return;
    const t = a.currentTime + delay;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    const v = Math.max(0.0002, vol * (S.masterVol / 100));
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(v, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(a.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function noise(dur = 0.08, vol = 0.15, cutoff = 1800) {
    const a = audio(); if (!a) return;
    const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = a.createBufferSource();
    const filter = a.createBiquadFilter();
    const gain = a.createGain();
    src.buffer = buf;
    filter.type = 'lowpass'; filter.frequency.value = cutoff;
    gain.gain.value = vol * (S.masterVol / 100);
    src.connect(filter).connect(gain).connect(a.destination);
    src.start();
  }

  const sounds = {
    hit:     () => { noise(0.07, 0.12); tone({ freq:180, to:90, dur:0.08, type:'triangle', vol:0.15 }); },
    crit:    () => { noise(0.12, 0.2, 2600); tone({ freq:520, to:160, dur:0.16, type:'sawtooth', vol:0.12 }); },
    hurt:    () => tone({ freq:150, to:70, dur:0.16, type:'square', vol:0.1 }),
    miss:    () => tone({ freq:900, to:1500, dur:0.08, type:'sine', vol:0.06 }),
    heal:    () => { tone({ freq:520, dur:0.1, type:'sine', vol:0.08 }); tone({ freq:780, dur:0.12, type:'sine', vol:0.08, delay:0.08 }); },
    levelup: () => [523, 659, 784, 1047].forEach((f, i) => tone({ freq:f, dur:0.14, type:'triangle', vol:0.1, delay:i * 0.09 })),
    victory: () => [392, 523, 659].forEach((f, i) => tone({ freq:f, dur:0.18, type:'triangle', vol:0.1, delay:i * 0.1 })),
    death:   () => [330, 262, 196, 131].forEach((f, i) => tone({ freq:f, dur:0.3, type:'sawtooth', vol:0.07, delay:i * 0.18 })),
    descend: () => tone({ freq:300, to:80, dur:0.6, type:'sine', vol:0.12 }),
    chest:   () => [660, 880, 1320].forEach((f, i) => tone({ freq:f, dur:0.1, type:'square', vol:0.05, delay:i * 0.06 })),
    boss:    () => { tone({ freq:70, dur:0.9, type:'sawtooth', vol:0.12 }); tone({ freq:74, dur:0.9, type:'sawtooth', vol:0.1 }); },
  };

  return {
    play(name) {
      const now = performance.now();
      if (lastPlayed[name] && now - lastPlayed[name] < 45) return; // multi-hit spam guard
      lastPlayed[name] = now;
      try { if (sounds[name]) sounds[name](); } catch (e) { /* audio is best-effort */ }
    },
  };
})();

function sfx(name) { SFX.play(name); }
