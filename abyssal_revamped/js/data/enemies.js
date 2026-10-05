// ══════════════════════════════════════════════════════════════
// ENEMIES — Base pool + 12 new + All bosses (floors 5,10,...,50)
// ══════════════════════════════════════════════════════════════

// ── ENEMY ABILITIES ──────────────────────────────────────────
const ENEMY_ABILITIES = {
  basic:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} attacks for ${dmg}.`);
  },
  heavy:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.6,p.stats.def*0.7));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} unleashes a heavy blow for ${dmg}!`);
  },
  double:(e,p)=>{
    let d1=Math.max(1,calcDmg(e.atk*0.7,p.stats.def));
    let d2=Math.max(1,calcDmg(e.atk*0.7,p.stats.def));
    d1=dealDmgToPlayer(d1); d2=dealDmgToPlayer(d2);
    logEntry('enemy-action',`${e.name} attacks twice for ${d1}+${d2}!`);
  },
  drain:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.2,p.stats.def*0.5));
    const taken=dealDmgToPlayer(dmg);
    if(healEnemy(e,Math.round(taken*0.4))>0){
      logEntry('enemy-action',`${e.name} drains ${taken} HP and heals!`);
    } else {
      logEntry('enemy-action',`${e.name} drains ${taken} HP — but cannot heal!`);
    }
  },
  curse:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*0.8,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    // Use a per-turn penalty tracked on the status so it can be restored on expiry
    const existing = p.status && p.status.find(s=>s.id==='cursed');
    if (existing) {
      // Extend duration and increase accumulated penalty
      existing.duration = Math.max(existing.duration, 3);
      existing.atkPen = (existing.atkPen||0) + 1;
      existing.defPen = (existing.defPen||0) + 1;
      p.stats.atk = Math.max(1, p.stats.atk - 1);
      p.stats.def = Math.max(0, p.stats.def - 1);
    } else {
      p.stats.atk = Math.max(1, p.stats.atk - 1);
      p.stats.def = Math.max(0, p.stats.def - 1);
      addStatus(p,{id:'cursed',name:'Cursed',type:'debuff',icon:'👁️',duration:3, atkPen:1, defPen:1});
    }
    logEntry('enemy-action',`${e.name} curses you! -1 ATK/-1 DEF. ${dmg} dmg.`);
  },
  wail:(e,p)=>{
    const pen=Math.round(p.stats.def*0.3);
    addStatus(p,{id:'wail',name:'Wailing',type:'debuff',icon:'😱',duration:2,defPen:pen});
    p.stats.def=Math.max(0,p.stats.def-pen);
    let dmg=Math.max(1,calcDmg(e.atk*1.1,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} wails! -${pen} DEF for 2 turns. ${dmg} dmg.`);
  },
  poison_spit:(e,p)=>{
    addStatus(p,{id:'poison',name:'Poison',type:'debuff',icon:'☠️',duration:4,
      onTurn:(pl)=>{let pd=Math.round(e.atk*0.25);pd=dealDmgToPlayer(pd,true);logEntry('enemy-action',`Poison burns for ${pd}!`);}});
    let dmg=Math.max(1,calcDmg(e.atk*0.9,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} spits poison! Poisoned. ${dmg} dmg.`);
  },
  charge:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*2.0,p.stats.def*0.5));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} CHARGES for ${dmg}!!!`);
  },
  stun_strike:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.1,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    if(rand(100)<35){
      addStatus(G.player,{id:'stun',name:'Stunned',type:'debuff',icon:'⚡',duration:1,onTurn:(pl)=>{logEntry('system','You are stunned!');}});
      logEntry('enemy-action',`${e.name} stun-strikes for ${dmg}! YOU ARE STUNNED.`);
    } else {
      logEntry('enemy-action',`${e.name} strikes for ${dmg}.`);
    }
  },
  life_drain:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.4,p.stats.def*0.4));
    const taken=dealDmgToPlayer(dmg);
    const healed=healEnemy(e,Math.round(taken*0.5)); // half: a full-value drain can out-heal the player
    logEntry('enemy-action',`${e.name} drains your life for ${taken}!${healed>0?` Heals ${healed}.`:''}`);
  },
  shadow_slash:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.3,p.stats.def*0.6));
    dmg=dealDmgToPlayer(dmg);
    addStatus(p,{id:'bleed',name:'Bleed',type:'debuff',icon:'🩸',duration:3,stacks:2,
      onTurn:(pl)=>{let bd=Math.max(1,Math.round(e.atk*0.2*(pl.status.find(s=>s.id==='bleed')||{stacks:1}).stacks));bd=dealDmgToPlayer(bd,true);}});
    logEntry('enemy-action',`${e.name} slashes from shadow for ${dmg}! Bleed x2.`);
  },
  infernal_breath:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.5,p.stats.def*0.5));
    dmg=dealDmgToPlayer(dmg);
    addStatus(p,{id:'burn_player',name:'Burning',type:'debuff',icon:'🔥',duration:3,
      onTurn:(pl)=>{let bd=Math.round(e.atk*0.3);bd=dealDmgToPlayer(bd,true);logEntry('enemy-action',`Burning for ${bd}!`);}});
    logEntry('enemy-action',`${e.name} breathes fire for ${dmg}! You are Burning!`);
  },
  void_tear:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.8,p.stats.def*0.3));
    dmg=dealDmgToPlayer(dmg,true); // ignores shield
    logEntry('enemy-action',`${e.name} tears the void for ${dmg}! (Shield ignored)`);
  },
  summon:(e,p)=>{
    const healed=healEnemy(e,Math.round(e.maxHp*0.1));
    let dmg=Math.max(1,calcDmg(e.atk,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} summons minions and attacks for ${dmg}!${healed>0?` Healed ${healed}.`:''}`);
  },
  enrage_strike:(e,p)=>{
    const mult=1.0+(1.0-e.hp/e.maxHp);
    let dmg=Math.max(1,calcDmg(e.atk*mult*1.5,p.stats.def*0.6));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} ENRAGES and strikes for ${dmg}!!!`);
  },
  // ── RIVAL BOSS SIGNATURE MOVES (see BOSS_RIVALS) ─────────
  brood_swarm:(e,p)=>{
    let total=0;
    for(let i=0;i<3;i++){ total+=dealDmgToPlayer(Math.max(1,calcDmg(e.atk*0.45,p.stats.def*0.6))); }
    addStatus(p,{id:'infested',name:'Infested',type:'debuff',icon:'🕷️',duration:3,
      onTurn:(pl)=>{let d=Math.max(1,Math.round(e.atk*0.15));d=dealDmgToPlayer(d,true);logEntry('enemy-action',`The brood gnaws for ${d}!`);}});
    logEntry('enemy-action',`${e.name} looses the brood — 3 bites for ${total}! You are Infested.`);
  },
  dirge:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.1,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    const pen=Math.round(p.stats.atk*0.2);
    p.stats.atk=Math.max(1,p.stats.atk-pen);
    addStatus(p,{id:'mournful',name:'Mournful',type:'debuff',icon:'🎶',duration:3,atkPen:pen});
    logEntry('enemy-action',`${e.name} sings a dirge for ${dmg}! -${pen} ATK for 3 turns.`);
  },
  glacial_prison:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.0,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    const pen=Math.round(p.stats.spd*0.4);
    p.stats.spd=Math.max(1,p.stats.spd-pen);
    addStatus(p,{id:'imprisoned',name:'Ice-Bound',type:'debuff',icon:'🧊',duration:3,spdPen:pen});
    if(rand(100)<30){
      addStatus(p,{id:'stun',name:'Frozen Solid',type:'debuff',icon:'🧊',duration:1,onTurn:()=>logEntry('system','You are frozen solid!')});
      logEntry('enemy-action',`${e.name} seals you in ice for ${dmg}! FROZEN SOLID.`);
    } else logEntry('enemy-action',`${e.name} encases you in ice for ${dmg}! -${pen} SPD.`);
  },
  mirror_ward:(e,p)=>{
    // Refreshes rather than stacks (status.js), so the ward never snowballs
    const bonus=Math.round(e.def*0.3);
    e.def+=bonus;
    addStatus(e,{id:'mirror_ward',name:'Mirror Ward',type:'buff',icon:'🪞',duration:2,defBonus:bonus});
    let dmg=Math.max(1,calcDmg(e.atk*0.9,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} raises a Mirror Ward (+${bonus} DEF for 2 turns), striking for ${dmg}.`);
  },
  quake_slam:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.7,p.stats.def*0.5));
    dmg=dealDmgToPlayer(dmg,true);
    logEntry('enemy-action',`${e.name} slams the seabed — QUAKE for ${dmg}! (Shield ignored)`);
  },
  starfall:(e,p)=>{
    let total=0;
    for(let i=0;i<3;i++){ total+=dealDmgToPlayer(Math.max(1,calcDmg(e.atk*0.6,p.stats.def*0.4)),true); }
    logEntry('enemy-action',`Stars fall at ${e.name}'s call — ${total} damage! (Shield ignored)`);
  },
  blood_pact:(e,p)=>{
    // Each pact costs 6% max HP for +12% ATK, up to 3 pacts per fight
    const pact=(e.status||[]).find(s=>s.id==='blood_pact');
    if(!pact || (pact.stacks||1)<3){
      const cost=Math.round(e.maxHp*0.06);
      e.hp=Math.max(1,e.hp-cost);
      const bonus=Math.round(e.atk*0.12);
      e.atk+=bonus;
      addStatus(e,{id:'blood_pact',name:'Blood Pact',type:'buff',icon:'🩸',duration:99,stacks:1,atkBonus:bonus});
      logEntry('enemy-action',`${e.name} spills ${cost} of its own blood: +${bonus} ATK!`);
    }
    let dmg=Math.max(1,calcDmg(e.atk*1.1,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} strikes with blood-fury for ${dmg}.`);
  },
  time_rewind:(e,p)=>{
    const cleansed=removeStatuses(e,s=>s.type==='debuff').length;
    const healed=healEnemy(e,Math.round(e.maxHp*0.06));
    logEntry('enemy-action',`${e.name} rewinds its own time!${healed>0?` Restores ${healed} HP.`:''}${cleansed?` ${cleansed} debuff${cleansed>1?'s':''} undone.`:''}`);
  },
  oblivion_gaze:(e,p)=>{
    const mpLoss=Math.round(p.stats.mp*0.25);
    p.stats.mp=Math.max(0,p.stats.mp-mpLoss);
    let dmg=Math.max(1,calcDmg(e.atk*1.2,p.stats.def*0.6));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} gazes into you: ${dmg} damage, ${mpLoss} MP forgotten.`);
  },
  // ── NEW ABILITIES ────────────────────────────────────────
  frost_bite:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.1,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    const existing=p.status&&p.status.find(s=>s.id==='frozen');
    if(!existing){
      const spdLoss=Math.round(p.stats.spd*0.3);
      p.stats.spd=Math.max(1,p.stats.spd-spdLoss);
      addStatus(p,{id:'frozen',name:'Frozen',type:'debuff',icon:'❄️',duration:2,spdLoss});
    }
    logEntry('enemy-action',`${e.name} bites with frost for ${dmg}! SPD reduced.`);
  },
  blizzard:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.4,p.stats.def*0.8));
    dmg=dealDmgToPlayer(dmg);
    const spdLoss=Math.round(p.stats.spd*0.4);
    p.stats.spd=Math.max(1,p.stats.spd-spdLoss);
    addStatus(p,{id:'blizzard_slow',name:'Blizzard',type:'debuff',icon:'🌨️',duration:3,spdLoss,
      onTurn:(pl)=>{ let cd=Math.round(e.atk*0.15); cd=dealDmgToPlayer(cd,true); logEntry('enemy-action',`Blizzard chills you for ${cd}!`); }});
    logEntry('enemy-action',`${e.name} blizzards for ${dmg}! Slowed and freezing!`);
  },
  thunder_clap:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.2,p.stats.def*0.7));
    dmg=dealDmgToPlayer(dmg);
    if(rand(100)<40){
      addStatus(p,{id:'stun',name:'Stunned',type:'debuff',icon:'⚡',duration:1});
      logEntry('enemy-action',`${e.name} THUNDER CLAPS for ${dmg}! YOU ARE STUNNED!`);
    } else {
      logEntry('enemy-action',`${e.name} thunder claps for ${dmg}!`);
    }
  },
  lightning_chain:(e,p)=>{
    let d1=Math.max(1,calcDmg(e.atk*0.8,p.stats.def));
    let d2=Math.max(1,calcDmg(e.atk*0.8,p.stats.def));
    d1=dealDmgToPlayer(d1); d2=dealDmgToPlayer(d2);
    const spdLoss=Math.round(p.stats.spd*0.2);
    p.stats.spd=Math.max(1,p.stats.spd-spdLoss);
    addStatus(p,{id:'shocked',name:'Shocked',type:'debuff',icon:'⚡',duration:2,spdLoss});
    logEntry('enemy-action',`${e.name} chains lightning for ${d1}+${d2}! Shocked (-SPD).`);
  },
  spore_cloud:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*0.7,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    const atkLoss=Math.round(p.stats.atk*0.2);
    p.stats.atk=Math.max(1,p.stats.atk-atkLoss);
    addStatus(p,{id:'spored',name:'Spore Sick',type:'debuff',icon:'🍄',duration:3,atkLoss,
      onTurn:(pl)=>{ let pd=Math.round(e.atk*0.18); pd=dealDmgToPlayer(pd,true); logEntry('enemy-action',`Spores fester for ${pd}!`); }});
    logEntry('enemy-action',`${e.name} releases spores for ${dmg}! ATK reduced + ticking damage.`);
  },
  entangle:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*0.9,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    const spdLoss=Math.round(p.stats.spd*0.5);
    p.stats.spd=Math.max(1,p.stats.spd-spdLoss);
    addStatus(p,{id:'entangled',name:'Entangled',type:'debuff',icon:'🌿',duration:2,spdLoss});
    logEntry('enemy-action',`${e.name} entangles you for ${dmg}! SPD halved for 2 turns.`);
  },
  acid_spray:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.0,p.stats.def*0.6));
    dmg=dealDmgToPlayer(dmg);
    const defLoss=Math.round(p.stats.def*0.25);
    p.stats.def=Math.max(0,p.stats.def-defLoss);
    addStatus(p,{id:'corroded',name:'Corroded',type:'debuff',icon:'🧪',duration:3,defLoss});
    logEntry('enemy-action',`${e.name} sprays acid for ${dmg}! DEF reduced.`);
  },
  sandstorm:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.1,p.stats.def*0.9));
    dmg=dealDmgToPlayer(dmg);
    if(!(p.status&&p.status.find(s=>s.id==='blinded'))){
      addStatus(p,{id:'blinded',name:'Blinded',type:'debuff',icon:'🌪️',duration:2,
        onTurn:(pl)=>{ logEntry('system','Vision blurred — you fumble your footing!'); }});
    }
    logEntry('enemy-action',`${e.name} kicks up a sandstorm for ${dmg}! Blinded!`);
  },
  heat_wave:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.2,p.stats.def*0.8));
    dmg=dealDmgToPlayer(dmg);
    const mpDrain=Math.round(p.stats.mp*0.2);
    p.stats.mp=Math.max(0,p.stats.mp-mpDrain);
    addStatus(p,{id:'scorched',name:'Scorched',type:'debuff',icon:'☀️',duration:2,
      onTurn:(pl)=>{ let md=Math.round(pl.stats.maxMp*0.08); pl.stats.mp=Math.max(0,pl.stats.mp-md); logEntry('enemy-action',`Heat drains ${md} MP!`); }});
    logEntry('enemy-action',`${e.name} unleashes a heat wave for ${dmg}! MP burns away.`);
  },
  deep_dive:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.3,p.stats.def*0.5));
    dmg=dealDmgToPlayer(dmg);
    addStatus(p,{id:'waterlogged',name:'Waterlogged',type:'debuff',icon:'💧',duration:3,
      onTurn:(pl)=>{ let wd=Math.round(e.atk*0.2); wd=dealDmgToPlayer(wd,true); logEntry('enemy-action',`You gasp for air — ${wd} dmg!`); }});
    logEntry('enemy-action',`${e.name} pulls you under for ${dmg}! Waterlogged.`);
  },
  undertow:(e,p)=>{
    let d1=Math.max(1,calcDmg(e.atk*0.9,p.stats.def));
    let d2=Math.max(1,calcDmg(e.atk*0.9,p.stats.def));
    d1=dealDmgToPlayer(d1); d2=dealDmgToPlayer(d2);
    const defLoss=Math.round(p.stats.def*0.2);
    p.stats.def=Math.max(0,p.stats.def-defLoss);
    addStatus(p,{id:'drenched',name:'Drenched',type:'debuff',icon:'🌊',duration:2,defLoss});
    logEntry('enemy-action',`${e.name} batters with undertow for ${d1}+${d2}! DEF reduced.`);
  },
  talon_rake:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.2,p.stats.def*0.7));
    dmg=dealDmgToPlayer(dmg);
    addStatus(p,{id:'bleed',name:'Bleed',type:'debuff',icon:'🩸',duration:3,stacks:3,
      onTurn:(pl)=>{ let bd=Math.max(1,Math.round(e.atk*0.2*(pl.status.find(s=>s.id==='bleed')||{stacks:1}).stacks)); bd=dealDmgToPlayer(bd,true); }});
    logEntry('enemy-action',`${e.name} rakes talons for ${dmg}! Bleed x3.`);
  },
  earthshatter:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.8,p.stats.def*0.6));
    dmg=dealDmgToPlayer(dmg);
    if(rand(100)<30){
      addStatus(p,{id:'stun',name:'Stunned',type:'debuff',icon:'⚡',duration:1});
      logEntry('enemy-action',`${e.name} SHATTERS the ground for ${dmg}! STUNNED!`);
    } else {
      logEntry('enemy-action',`${e.name} shatters the earth for ${dmg}!`);
    }
  },
  rust:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*0.8,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    const defLoss=Math.round(p.stats.def*0.35);
    p.stats.def=Math.max(0,p.stats.def-defLoss);
    addStatus(p,{id:'rusted',name:'Rusted',type:'debuff',icon:'🔩',duration:4,defLoss});
    logEntry('enemy-action',`${e.name} corrodes your armor for ${dmg}! -${defLoss} DEF for 4 turns.`);
  },
  mind_spike:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.0,p.stats.def*0.5));
    dmg=dealDmgToPlayer(dmg,true);
    const mpDrain=Math.round(p.stats.maxMp*0.3);
    p.stats.mp=Math.max(0,p.stats.mp-mpDrain);
    logEntry('enemy-action',`${e.name} spikes your mind for ${dmg} (shield piercing)! -${mpDrain} MP.`);
  },
  soul_rend:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*1.5,p.stats.def*0.4));
    dmg=dealDmgToPlayer(dmg,true);
    const atkLoss=Math.round(p.stats.atk*0.15);
    const defLoss=Math.round(p.stats.def*0.15);
    p.stats.atk=Math.max(1,p.stats.atk-atkLoss);
    p.stats.def=Math.max(0,p.stats.def-defLoss);
    addStatus(p,{id:'soul_rend',name:'Soul Rent',type:'debuff',icon:'💔',duration:3,atkLoss,defLoss});
    logEntry('enemy-action',`${e.name} rends your soul for ${dmg}! ATK/DEF both reduced.`);
  },
  // ── NEW: STRUCTURALLY DIFFERENT PATTERNS (Phase 3) ──────────
  // channel_burst — a genuine two-turn commitment, not an instant-resolve
  // move: turn 1 telegraphs (chip damage + obvious status), turn 2 is
  // FORCED regardless of pattern cycle (see pickEnemyAbility's
  // e._channeling override) and lands a huge hit. Punishable: burst the
  // enemy down during the channel and the release never happens.
  channel_burst:(e,p)=>{
    if (!e._channeling) {
      e._channeling = 'channel_burst';
      addStatus(p,{id:'incoming_burst',name:'Incoming Burst',type:'debuff',icon:'🌀',duration:2});
      let dmg=Math.max(1,calcDmg(e.atk*0.3,p.stats.def));
      dmg=dealDmgToPlayer(dmg);
      logEntry('enemy-action',`${e.name} begins channeling a devastating attack! (${dmg} dmg)`);
    } else {
      e._channeling = null;
      let dmg=Math.max(1,calcDmg(e.atk*2.4,p.stats.def*0.4));
      dmg=dealDmgToPlayer(dmg);
      logEntry('enemy-action',`${e.name} UNLEASHES the channeled attack for ${dmg}!!!`);
    }
  },
  // summon_ally — distinct from `summon` above (which just heals the
  // enemy): this adds a lingering second source of incoming damage each
  // turn, simulating a minion joining the fight without needing true
  // multi-enemy combat.
  summon_ally:(e,p)=>{
    let dmg=Math.max(1,calcDmg(e.atk*0.6,p.stats.def));
    dmg=dealDmgToPlayer(dmg);
    if(!(p.status&&p.status.find(s=>s.id==='harried'))){
      addStatus(p,{id:'harried',name:'Harried',type:'debuff',icon:'👥',duration:4,
        onTurn:(pl)=>{let md=Math.round(e.atk*0.35);md=dealDmgToPlayer(md,true);logEntry('enemy-action',`A summoned minion strikes for ${md}!`);}});
      logEntry('enemy-action',`${e.name} calls forth a minion to aid it! ${dmg} dmg.`);
    } else {
      logEntry('enemy-action',`${e.name} attacks for ${dmg} while its minion harries you!`);
    }
  },
  // culling_strike — scales with how many debuffs are currently stacked on
  // the player. A payoff finisher for Controller-flavored enemies with
  // multiple debuff moves in their kit; rewards the enemy (and punishes the
  // player) for letting stacks pile up instead of clearing them.
  culling_strike:(e,p)=>{
    const debuffCount=(p.status||[]).filter(s=>s.type==='debuff').length;
    let dmg=Math.max(1,calcDmg(e.atk*(1.0+debuffCount*0.25),p.stats.def*0.6));
    dmg=dealDmgToPlayer(dmg);
    logEntry('enemy-action',`${e.name} exploits your weakened state for ${dmg}!${debuffCount>0?` (+${debuffCount*25}% from ${debuffCount} debuffs)`:''}`);
  },
};

// ── TELEGRAPHING ──────────────────────────────────────────────
// Display-only metadata (icon + short label) for each ENEMY_ABILITIES key.
// Kept separate from ENEMY_ABILITIES on purpose: the ability functions above
// are the resolution logic and every existing call site invokes them
// directly (ENEMY_ABILITIES[abId](e,p)) — this table never touches that,
// it just gives the UI something to show before the move actually happens.
// Add an entry here whenever a new enemy ability key is added above.
const ENEMY_ABILITY_INFO = {
  basic:{icon:'⚔️',label:'Strike'},
  heavy:{icon:'💥',label:'Heavy Blow'},
  double:{icon:'🗡️',label:'Double Strike'},
  drain:{icon:'🩸',label:'Drain'},
  curse:{icon:'👁️',label:'Curse'},
  wail:{icon:'😱',label:'Wail'},
  poison_spit:{icon:'☠️',label:'Poison Spit'},
  charge:{icon:'💨',label:'Charge'},
  stun_strike:{icon:'⚡',label:'Stun Strike'},
  life_drain:{icon:'🩸',label:'Life Drain'},
  shadow_slash:{icon:'🗡️',label:'Shadow Slash'},
  infernal_breath:{icon:'🔥',label:'Infernal Breath'},
  void_tear:{icon:'🌌',label:'Void Tear'},
  summon:{icon:'👥',label:'Summon'},
  enrage_strike:{icon:'😡',label:'Enrage Strike'},
  frost_bite:{icon:'❄️',label:'Frost Bite'},
  blizzard:{icon:'🌨️',label:'Blizzard'},
  thunder_clap:{icon:'⚡',label:'Thunder Clap'},
  lightning_chain:{icon:'⚡',label:'Lightning Chain'},
  spore_cloud:{icon:'🍄',label:'Spore Cloud'},
  entangle:{icon:'🌿',label:'Entangle'},
  acid_spray:{icon:'🧪',label:'Acid Spray'},
  sandstorm:{icon:'🌪️',label:'Sandstorm'},
  heat_wave:{icon:'☀️',label:'Heat Wave'},
  deep_dive:{icon:'💧',label:'Deep Dive'},
  undertow:{icon:'🌊',label:'Undertow'},
  talon_rake:{icon:'🩸',label:'Talon Rake'},
  earthshatter:{icon:'🪨',label:'Earthshatter'},
  rust:{icon:'🔩',label:'Rust'},
  mind_spike:{icon:'🧠',label:'Mind Spike'},
  soul_rend:{icon:'💔',label:'Soul Rend'},
  channel_burst:{icon:'🌀',label:'Channeling...'},
  summon_ally:{icon:'👥',label:'Summon Ally'},
  culling_strike:{icon:'⚰️',label:'Culling Strike'},
  brood_swarm:{icon:'🕷️',label:'Brood Swarm'},
  dirge:{icon:'🎶',label:'Dirge'},
  glacial_prison:{icon:'🧊',label:'Glacial Prison'},
  mirror_ward:{icon:'🪞',label:'Mirror Ward'},
  quake_slam:{icon:'🌊',label:'Quake Slam'},
  starfall:{icon:'🌠',label:'Starfall'},
  blood_pact:{icon:'🩸',label:'Blood Pact'},
  time_rewind:{icon:'⏪',label:'Rewind'},
  oblivion_gaze:{icon:'👁️',label:'Oblivion Gaze'},
};

// getEnemyNextMove — returns the {icon,label} for whatever ability key is
// next in e.patterns (same lookup enemyTurn() uses to resolve the actual
// move), for the combat UI to telegraph before the enemy acts.

// ── ENEMY AI: BEHAVIOR-WEIGHTED ABILITY SELECTION ──────────────
// Rough role tag per ability, used to bias WHICH move within an enemy's own
// pattern list it reaches for based on the fight's current state —
// HP-reactive decision-making instead of a blind fixed cycle. This never
// grants an enemy a move outside its own e.patterns; it only re-prioritizes
// within it. Add a role here whenever a new ENEMY_ABILITIES key is added.
const ABILITY_ROLE = {
  basic:'filler', heavy:'pressure', double:'pressure', drain:'drain', curse:'control',
  wail:'control', poison_spit:'control', charge:'pressure', stun_strike:'control',
  life_drain:'drain', shadow_slash:'pressure', infernal_breath:'pressure', void_tear:'pressure',
  summon:'drain', enrage_strike:'pressure', frost_bite:'control', blizzard:'pressure',
  thunder_clap:'control', lightning_chain:'control', spore_cloud:'control', entangle:'control',
  acid_spray:'control', sandstorm:'control', heat_wave:'drain', deep_dive:'pressure',
  undertow:'pressure', talon_rake:'pressure', earthshatter:'pressure', rust:'control',
  mind_spike:'control', soul_rend:'pressure',
  channel_burst:'pressure', summon_ally:'control', culling_strike:'pressure',
  brood_swarm:'pressure', dirge:'control', glacial_prison:'control', mirror_ward:'drain',
  quake_slam:'pressure', starfall:'pressure', blood_pact:'pressure', time_rewind:'drain',
  oblivion_gaze:'control'
};

// pickEnemyAbility — single source of truth for "what does this enemy do
// next". Used by BOTH the real resolution (enemyTurn() in combat.js) and
// the telegraph (getEnemyNextMove() below) so they can never drift out of
// sync. Deterministic, not random — same inputs always produce the same
// pick, so it stays debuggable.
//
// Bias, in priority order (each only re-orders moves the enemy's OWN
// pattern list already contains):
//  1. Player below 30% HP    → reach for a 'pressure' move if it has one
//     (a "go for the kill" moment).
//  2. This enemy below 30% HP → reach for a 'drain' move if it has one
//     (sustain instead of just tanking hits).
//  3. Otherwise               → the original fixed cycle through e.patterns.
function pickEnemyAbility(e, p) {
  const pattern = e.patterns || ['basic'];

  // CHANNELED ABILITIES (e.g. channel_burst): a channel is a guaranteed
  // two-turn commitment, not just another pattern slot. If the enemy began
  // channeling last turn, it MUST release this turn regardless of the
  // normal cycle position — e._channeling stores the ability id to force.
  if (e._channeling) return e._channeling;

  if (pattern.length <= 1) return pattern[0] || 'basic';
  const idx = e.patternIndex || 0;

  if (p && p.stats.hp / p.stats.maxHp < 0.3) {
    const pressureMoves = pattern.filter(id => ABILITY_ROLE[id] === 'pressure');
    if (pressureMoves.length > 0) return pressureMoves[idx % pressureMoves.length];
  }
  // Low on HP: reach for a heal — but never twice in a row, or a boss whose
  // drain heals what it deals could out-heal the player forever.
  if (e.hp / e.maxHp < 0.3 && !e._lastWasDrain) {
    const drainMoves = pattern.filter(id => ABILITY_ROLE[id] === 'drain');
    if (drainMoves.length > 0) return drainMoves[idx % drainMoves.length];
  }
  if (e._lastWasDrain) {
    // Right after a drain, take the next non-drain move in the cycle
    for (let k = 0; k < pattern.length; k++) {
      const id = pattern[(idx + k) % pattern.length];
      if (ABILITY_ROLE[id] !== 'drain') return id;
    }
  }
  return pattern[idx % pattern.length];
}

// estimateEnemyMove — rough damage a move will do to you, for the "Next:"
// telegraph. Read straight from the move's own calcDmg(e.atk*X, p.stats.def*Y)
// terms (and a `for(i<N)` multi-hit loop), so it can't drift from the real
// formula. null for moves whose damage depends on more than that.
const _moveTermsCache = {};
function _enemyMoveTerms(abId) {
  if (abId in _moveTermsCache) return _moveTermsCache[abId];
  const src = String(ENEMY_ABILITIES[abId] || '');
  let terms = null;
  if (!/_channeling|debuffCount|\bmult\b|stacks/.test(src)) {
    terms = [];
    for (const m of src.matchAll(/calcDmg\(e\.atk(?:\*([\d.]+))?,\s*p\.stats\.def(?:\*([\d.]+))?\)/g)) terms.push([m[1] ? +m[1] : 1, m[2] ? +m[2] : 1]);
    const loop = src.match(/for\(let i=0;i<(\d+);i\+\+\)/);
    if (loop) terms = terms.flatMap(t => Array(+loop[1]).fill(t));
    if (!terms.length) terms = null;
  }
  return (_moveTermsCache[abId] = terms);
}
function estimateEnemyMove(e, abId, p) {
  const terms = _enemyMoveTerms(abId);
  if (!terms || !p) return null;
  let dmg = terms.reduce((s, [a, d]) => s + Math.max(1, e.atk * a - p.stats.def * d, e.atk * a * 0.15), 0);
  (e.status || []).forEach(s => { if (s.atkMult) dmg *= s.atkMult; if (s.dmgReduction) dmg *= Math.max(0, 1 - s.dmgReduction); });
  const myEl = (getClassData(p.classId) || {}).element || 'normal';
  if (e.element) dmg *= getElementMult(e.element, myEl);
  const reduce = (p.status || []).reduce((s, st) => s + (st.dmgReduce || 0), 0);
  if (reduce > 0) dmg *= 1 - Math.min(0.75, reduce);
  return Math.max(1, Math.round(dmg));
}

// getEnemyNextMove — returns the {icon,label} for whatever pickEnemyAbility()
// would choose right now. Always exactly matches what enemyTurn() will do.
function getEnemyNextMove(e) {
  const abId = pickEnemyAbility(e, G.player);
  const info = ENEMY_ABILITY_INFO[abId] || ENEMY_ABILITY_INFO.basic;
  return { ...info, est: estimateEnemyMove(e, abId, G.player) };
}

const ENEMY_POOL = {
  // ── TIER 1 (floors 1-7) ──────────────────────────────
  skeleton:{
    id:'skeleton', name:'Restless Skeleton', icon:'💀', element:'ghost',
    title:'Bones that refuse to rest.',
    hp:35, maxHp:35, atk:8, def:2, spd:6, xp:15, gold:[3,8], loot:0.4,
    patterns:['basic','basic','heavy'],
    status:[],patternIndex:0
  },
  wraith:{
    id:'wraith', name:'Hollow Wraith', icon:'👻', element:'ghost',
    title:'A scream with no throat.',
    hp:28, maxHp:28, atk:10, def:1, spd:10, xp:18, gold:[4,10], loot:0.45,
    patterns:['basic','wail','basic'],
    status:[],patternIndex:0
  },
  goblin:{
    id:'goblin', name:'Abyssal Goblin', icon:'👺', element:'poison',
    title:'Small. Vicious. Numerous.',
    hp:30, maxHp:30, atk:9, def:2, spd:12, xp:12, gold:[5,12], loot:0.35,
    patterns:['double','basic','poison_spit'],
    status:[],patternIndex:0
  },
  // NEW TIER 1
  cursed_armor:{
    id:'cursed_armor', name:'Cursed Armor', icon:'⚔️', element:'steel',
    title:'The knight inside already died.',
    hp:55, maxHp:55, atk:10, def:8, spd:4, xp:22, gold:[6,14], loot:0.45,
    patterns:['basic','heavy','curse'],
    status:[],patternIndex:0
  },
  grave_worm:{
    id:'grave_worm', name:'Grave Worm', icon:'🪱', element:'poison',
    title:'Patient as the grave itself.',
    hp:40, maxHp:40, atk:7, def:3, spd:8, xp:14, gold:[3,9], loot:0.4,
    patterns:['basic','poison_spit','basic','poison_spit'],
    status:[],patternIndex:0
  },
  shadow_imp:{
    id:'shadow_imp', name:'Shadow Imp', icon:'😈', element:'shadow',
    title:'Mischief given form.',
    hp:25, maxHp:25, atk:12, def:1, spd:16, xp:16, gold:[4,11], loot:0.4,
    patterns:['double','shadow_slash','basic'],
    status:[],patternIndex:0
  },
  hollow_knight:{
    id:'hollow_knight', name:'Hollow Knight', icon:'🗡️', element:'dark',
    title:'Honor without a soul to hold it.',
    hp:60, maxHp:60, atk:11, def:7, spd:7, xp:25, gold:[7,15], loot:0.5,
    patterns:['basic','heavy','stun_strike','basic'],
    status:[],patternIndex:0
  },

  // ── NEW TIER 1 ────────────────────────────────────────
  frost_sprite:{
    id:'frost_sprite', name:'Frost Sprite', icon:'❄️', element:'ice',
    title:'A shard of winter that never melted.',
    hp:22, maxHp:22, atk:8, def:1, spd:11, xp:14, gold:[3,8], loot:0.35,
    patterns:['frost_bite','basic','frost_bite','double'],
    status:[],patternIndex:0
  },
  mud_crawler:{
    id:'mud_crawler', name:'Mud Crawler', icon:'🐢', element:'ground',
    title:'Slow. Patient. Inevitable.',
    hp:50, maxHp:50, atk:7, def:6, spd:3, xp:15, gold:[3,9], loot:0.38,
    patterns:['basic','heavy','acid_spray'],
    status:[],patternIndex:0
  },
  rabid_bat:{
    id:'rabid_bat', name:'Rabid Bat', icon:'🦇', element:'flying',
    title:'Echolocation has led it to you.',
    hp:20, maxHp:20, atk:10, def:1, spd:17, xp:13, gold:[2,7], loot:0.35,
    patterns:['double','basic','talon_rake'],
    status:[],patternIndex:0
  },
  bog_witch:{
    id:'bog_witch', name:'Bog Witch', icon:'🧹', element:'poison',
    title:'Her hexes outlast her victims.',
    hp:38, maxHp:38, atk:11, def:2, spd:9, xp:20, gold:[5,13], loot:0.42,
    patterns:['curse','spore_cloud','basic','summon_ally','poison_spit'],
    status:[],patternIndex:0
  },
  stone_sprite:{
    id:'stone_sprite', name:'Stone Sprite', icon:'🪨', element:'ground',
    title:'The earth woke up angry.',
    hp:55, maxHp:55, atk:8, def:9, spd:4, xp:18, gold:[4,10], loot:0.38,
    patterns:['basic','heavy','sandstorm'],
    status:[],patternIndex:0
  },
  vine_horror:{
    id:'vine_horror', name:'Vine Horror', icon:'🌱', element:'grass',
    title:'It grew in the dark for a hundred years.',
    hp:42, maxHp:42, atk:9, def:4, spd:6, xp:17, gold:[3,9], loot:0.38,
    patterns:['entangle','basic','entangle','heavy'],
    status:[],patternIndex:0
  },
  cracked_golem:{
    id:'cracked_golem', name:'Cracked Golem', icon:'🗿', element:'ground',
    title:'Missing an arm. Angrier for it.',
    hp:48, maxHp:48, atk:10, def:7, spd:5, xp:19, gold:[4,11], loot:0.4,
    patterns:['heavy','basic','sandstorm','heavy'],
    status:[],patternIndex:0
  },
  ice_wisp:{
    id:'ice_wisp', name:'Ice Wisp', icon:'🔵', element:'ice',
    title:'A soul too cold to move on.',
    hp:18, maxHp:18, atk:9, def:0, spd:14, xp:12, gold:[2,7], loot:0.35,
    patterns:['frost_bite','basic','frost_bite'],
    status:[],patternIndex:0
  },
  crypt_rat:{
    id:'crypt_rat', name:'Crypt Rat', icon:'🐀', element:'poison',
    title:'It ate the corpses and kept going.',
    hp:24, maxHp:24, atk:8, def:1, spd:15, xp:11, gold:[2,6], loot:0.33,
    patterns:['double','basic','poison_spit','double'],
    status:[],patternIndex:0
  },
  wind_sprite:{
    id:'wind_sprite', name:'Wind Sprite', icon:'💨', element:'wind',
    title:'Invisible until it hits you.',
    hp:20, maxHp:20, atk:11, def:0, spd:18, xp:13, gold:[3,7], loot:0.35,
    patterns:['double','basic','double','wail'],
    status:[],patternIndex:0
  },
  ember_imp:{
    id:'ember_imp', name:'Ember Imp', icon:'🔥', element:'fire',
    title:'Small. Combustible. Enthusiastic.',
    hp:28, maxHp:28, atk:12, def:1, spd:14, xp:15, gold:[3,8], loot:0.37,
    patterns:['basic','infernal_breath','double'],
    status:[],patternIndex:0
  },
  dire_wolf:{
    id:'dire_wolf', name:'Dire Wolf', icon:'🐺', element:'normal',
    title:'It hunts in a pack of one. It is enough.',
    hp:36, maxHp:36, atk:11, def:3, spd:15, xp:16, gold:[3,9], loot:0.38,
    patterns:['double','charge','basic','talon_rake'],
    status:[],patternIndex:0
  },
  thunder_crab:{
    id:'thunder_crab', name:'Thunder Crab', icon:'🦀', element:'electric',
    title:'The shell conducts. You will find out.',
    hp:58, maxHp:58, atk:13, def:8, spd:6, xp:21, gold:[5,13], loot:0.4,
    patterns:['thunder_clap','heavy','basic','acid_spray'],
    status:[],patternIndex:0
  },

  // ── TIER 2 (floors 8-20) ──────────────────────────────
  vampire:{
    id:'vampire', name:'Blood Vampire', icon:'🧛', element:'dark',
    title:'The thirst is never satisfied.',
    hp:80, maxHp:80, atk:18, def:8, spd:14, xp:40, gold:[12,22], loot:0.55,
    patterns:['basic','drain','life_drain'],
    status:[],patternIndex:0
  },
  lich:{
    id:'lich', name:'Ancient Lich', icon:'🧙', element:'ghost',
    title:'Magic outlasts mortality.',
    hp:70, maxHp:70, atk:22, def:5, spd:11, xp:45, gold:[15,28], loot:0.6,
    patterns:['basic','curse','wail','heavy'],
    status:[],patternIndex:0
  },
  ghoul:{
    id:'ghoul', name:'Flesh Ghoul', icon:'🧟', element:'poison',
    title:'Appetite has replaced everything else.',
    hp:95, maxHp:95, atk:20, def:10, spd:9, xp:38, gold:[10,20], loot:0.5,
    patterns:['double','heavy','poison_spit'],
    status:[],patternIndex:0
  },
  // NEW TIER 2
  soul_eater:{
    id:'soul_eater', name:'Soul Eater', icon:'🌑', element:'ghost',
    title:'It feeds on what you are.',
    hp:85, maxHp:85, atk:20, def:6, spd:13, xp:42, gold:[13,24], loot:0.55,
    patterns:['drain','life_drain','curse'],
    status:[],patternIndex:0
  },
  plague_swarm:{
    id:'plague_swarm', name:'Plague Rat Swarm', icon:'🐀', element:'poison',
    title:'One becomes a hundred becomes a plague.',
    hp:75, maxHp:75, atk:16, def:4, spd:15, xp:36, gold:[10,18], loot:0.5,
    patterns:['double','poison_spit','double','charge'],
    status:[],patternIndex:0
  },
  void_stalker:{
    id:'void_stalker', name:'Void Stalker', icon:'🌀', element:'shadow',
    title:'It has been watching you since floor one.',
    hp:90, maxHp:90, atk:24, def:7, spd:16, xp:48, gold:[16,28], loot:0.6,
    patterns:['shadow_slash','void_tear','basic','culling_strike'],
    status:[],patternIndex:0
  },
  abyssal_serpent:{
    id:'abyssal_serpent', name:'Abyssal Serpent', icon:'🐍', element:'poison',
    title:'Ancient. Patient. Hungry.',
    hp:100, maxHp:100, atk:19, def:9, spd:12, xp:44, gold:[14,26], loot:0.55,
    patterns:['basic','poison_spit','charge','poison_spit'],
    status:[],patternIndex:0
  },

  // ── NEW TIER 2 ────────────────────────────────────────
  frost_revenant:{
    id:'frost_revenant', name:'Frost Revenant', icon:'🧊', element:'ice',
    title:'Died in a blizzard. The blizzard never left.',
    hp:88, maxHp:88, atk:17, def:9, spd:9, xp:41, gold:[12,22], loot:0.52,
    patterns:['frost_bite','heavy','blizzard','basic'],
    status:[],patternIndex:0
  },
  thunder_hawk:{
    id:'thunder_hawk', name:'Thunder Hawk', icon:'🦅', element:'electric',
    title:'The storm follows where it flies.',
    hp:75, maxHp:75, atk:21, def:5, spd:18, xp:44, gold:[13,24], loot:0.52,
    patterns:['thunder_clap','double','talon_rake','basic'],
    status:[],patternIndex:0
  },
  deep_lurker:{
    id:'deep_lurker', name:'Deep Lurker', icon:'🦑', element:'water',
    title:'Dragged from a depth that has no name.',
    hp:105, maxHp:105, atk:18, def:11, spd:8, xp:46, gold:[14,26], loot:0.55,
    patterns:['deep_dive','basic','undertow','drain'],
    status:[],patternIndex:0
  },
  fungal_shaman:{
    id:'fungal_shaman', name:'Fungal Shaman', icon:'🍄', element:'grass',
    title:'The spores do the thinking now.',
    hp:80, maxHp:80, atk:15, def:7, spd:10, xp:38, gold:[11,20], loot:0.5,
    patterns:['spore_cloud','basic','summon_ally','poison_spit'],
    status:[],patternIndex:0
  },
  desert_scorpion:{
    id:'desert_scorpion', name:'Desert Scorpion', icon:'🦂', element:'ground',
    title:'The desert has no mercy. Neither does it.',
    hp:92, maxHp:92, atk:20, def:8, spd:13, xp:43, gold:[13,23], loot:0.52,
    patterns:['poison_spit','sandstorm','double','acid_spray'],
    status:[],patternIndex:0
  },
  iron_golem:{
    id:'iron_golem', name:'Iron Golem', icon:'🤖', element:'steel',
    title:'Forged without mercy. Animated without reason.',
    hp:130, maxHp:130, atk:16, def:18, spd:4, xp:50, gold:[16,30], loot:0.55,
    patterns:['heavy','rust','basic','channel_burst'],
    status:[],patternIndex:0
  },
  sea_witch:{
    id:'sea_witch', name:'Sea Witch', icon:'🧜', element:'water',
    title:'She traded her voice for something worse.',
    hp:78, maxHp:78, atk:22, def:6, spd:12, xp:47, gold:[15,27], loot:0.55,
    patterns:['undertow','curse','deep_dive','wail'],
    status:[],patternIndex:0
  },
  storm_elemental:{
    id:'storm_elemental', name:'Storm Elemental', icon:'⛈️', element:'electric',
    title:'Pure static given terrible will.',
    hp:85, maxHp:85, atk:24, def:4, spd:17, xp:50, gold:[15,28], loot:0.58,
    patterns:['thunder_clap','lightning_chain','basic','thunder_clap'],
    status:[],patternIndex:0
  },
  bog_troll:{
    id:'bog_troll', name:'Bog Troll', icon:'👹', element:'grass',
    title:'Ugliness that learned to fight.',
    hp:115, maxHp:115, atk:21, def:12, spd:7, xp:48, gold:[14,25], loot:0.52,
    patterns:['heavy','entangle','drain','basic'],
    status:[],patternIndex:0
  },
  harpy:{
    id:'harpy', name:'Screeching Harpy', icon:'🦜', element:'flying',
    title:'The screech is a weapon. The talons are a bonus.',
    hp:72, maxHp:72, atk:20, def:5, spd:16, xp:40, gold:[12,22], loot:0.5,
    patterns:['talon_rake','wail','double','talon_rake'],
    status:[],patternIndex:0
  },
  cursed_knight:{
    id:'cursed_knight', name:'Cursed Knight', icon:'⚔️', element:'dark',
    title:'The curse is all that keeps him standing.',
    hp:100, maxHp:100, atk:23, def:14, spd:9, xp:50, gold:[16,28], loot:0.55,
    patterns:['curse','heavy','stun_strike','shadow_slash'],
    status:[],patternIndex:0
  },
  coral_beast:{
    id:'coral_beast', name:'Coral Beast', icon:'🪸', element:'water',
    title:'The reef grew teeth and a purpose.',
    hp:108, maxHp:108, atk:19, def:13, spd:7, xp:46, gold:[13,24], loot:0.52,
    patterns:['acid_spray','heavy','undertow','basic'],
    status:[],patternIndex:0
  },
  lava_crawler:{
    id:'lava_crawler', name:'Lava Crawler', icon:'🌋', element:'fire',
    title:'Swam up from somewhere very deep.',
    hp:95, maxHp:95, atk:24, def:8, spd:11, xp:47, gold:[14,26], loot:0.53,
    patterns:['infernal_breath','heat_wave','basic','charge'],
    status:[],patternIndex:0
  },
  void_shade:{
    id:'void_shade', name:'Void Shade', icon:'🌑', element:'shadow',
    title:'A shadow that forgot what cast it.',
    hp:82, maxHp:82, atk:25, def:6, spd:17, xp:49, gold:[15,27], loot:0.55,
    patterns:['shadow_slash','void_tear','basic','shadow_slash'],
    status:[],patternIndex:0
  },

  // ── PASS 3 ADDITIONS — exotic element enemies ──────────────
  giant_spider:{
    id:'giant_spider', name:'Giant Cave Spider', icon:'🕷️', element:'bug',
    title:'Eight eyes. No mercy.',
    hp:32, maxHp:32, atk:9, def:2, spd:12, xp:16, gold:[3,8], loot:0.4,
    patterns:['double','poison_spit','basic','double'],
    status:[],patternIndex:0
  },
  tide_crawler:{
    id:'tide_crawler', name:'Tide Crawler', icon:'🦀', element:'water',
    title:'Dragged from the drowned depths.',
    hp:55, maxHp:55, atk:12, def:5, spd:7, xp:22, gold:[5,12], loot:0.45,
    patterns:['basic','heavy','drain','basic'],
    status:[],patternIndex:0
  },
  wind_wraith:{
    id:'wind_wraith', name:'Wind Wraith', icon:'🌬️', element:'wind',
    title:'A scream on the breeze.',
    hp:70, maxHp:70, atk:14, def:3, spd:16, xp:28, gold:[6,14], loot:0.45,
    patterns:['wail','double','basic','wail'],
    status:[],patternIndex:0
  },
  stone_golem:{
    id:'stone_golem', name:'Stone Golem', icon:'🪨', element:'ground',
    title:'Ancient stone given terrible purpose.',
    hp:130, maxHp:130, atk:22, def:14, spd:4, xp:55, gold:[15,30], loot:0.55,
    patterns:['heavy','basic','heavy','charge'],
    status:[],patternIndex:0
  },
  swamp_horror:{
    id:'swamp_horror', name:'Swamp Horror', icon:'🐊', element:'poison',
    title:"You don't want to know what it ate last.",
    hp:110, maxHp:110, atk:20, def:8, spd:9, xp:48, gold:[12,25], loot:0.55,
    patterns:['poison_spit','heavy','drain','poison_spit'],
    status:[],patternIndex:0
  },
  sky_predator:{
    id:'sky_predator', name:'Sky Predator', icon:'🦅', element:'flying',
    title:'It never lands. You cannot hide.',
    hp:90, maxHp:90, atk:24, def:6, spd:18, xp:52, gold:[14,28], loot:0.55,
    patterns:['double','charge','basic','double'],
    status:[],patternIndex:0
  },
  demon:{
    id:'demon', name:'Void Demon', icon:'👿', element:'fire',
    title:'Born of rage and nothing else.',
    hp:130, maxHp:130, atk:32, def:15, spd:13, xp:80, gold:[25,45], loot:0.65,
    patterns:['heavy','infernal_breath','charge'],
    status:[],patternIndex:0
  },
  banshee:{
    id:'banshee', name:'Screaming Banshee', icon:'👻', element:'ghost',
    title:"The last thing you hear is also the first.",
    hp:110, maxHp:110, atk:35, def:8, spd:18, xp:85, gold:[28,50], loot:0.65,
    patterns:['wail','basic','void_tear','wail'],
    status:[],patternIndex:0
  },
  golem:{
    id:'golem', name:'Abyss Golem', icon:'🗿', element:'rock',
    title:'Patience made flesh made stone.',
    hp:170, maxHp:170, atk:28, def:22, spd:5, xp:90, gold:[30,55], loot:0.7,
    patterns:['heavy','basic','charge','heavy'],
    status:[],patternIndex:0
  },
  // NEW TIER 3
  dread_knight:{
    id:'dread_knight', name:'Dread Knight', icon:'⚔️', element:'dark',
    title:'The abyss gave him purpose. He gave it everything else.',
    hp:160, maxHp:160, atk:36, def:20, spd:11, xp:95, gold:[32,58], loot:0.7,
    patterns:['heavy','stun_strike','shadow_slash','charge'],
    status:[],patternIndex:0
  },
  chaos_elemental:{
    id:'chaos_elemental', name:'Chaos Elemental', icon:'🌪️', element:'normal',
    title:'All elements. No mercy.',
    hp:145, maxHp:145, atk:38, def:12, spd:15, xp:100, gold:[35,60], loot:0.7,
    patterns:['infernal_breath','void_tear','charge','poison_spit'],
    status:[],patternIndex:0
  },
  abyssal_horror:{
    id:'abyssal_horror', name:'Abyssal Horror', icon:'🦑', element:'shadow',
    title:"You weren't supposed to get this far.",
    hp:180, maxHp:180, atk:40, def:16, spd:10, xp:110, gold:[38,65], loot:0.75,
    patterns:['void_tear','heavy','life_drain','summon'],
    status:[],patternIndex:0
  },
  elder_lich:{
    id:'elder_lich', name:'Elder Lich', icon:'💀', element:'ghost',
    title:'Death is not an end. It is a promotion.',
    hp:155, maxHp:155, atk:42, def:14, spd:14, xp:115, gold:[40,70], loot:0.75,
    patterns:['curse','life_drain','heavy','void_tear'],
    status:[],patternIndex:0
  },

  // ── NEW TIER 3 ────────────────────────────────────────
  glacier_titan:{
    id:'glacier_titan', name:'Glacier Titan', icon:'🧊', element:'ice',
    title:'A mountain that decided to walk.',
    hp:200, maxHp:200, atk:30, def:25, spd:4, xp:120, gold:[40,72], loot:0.72,
    patterns:['blizzard','heavy','earthshatter','blizzard'],
    status:[],patternIndex:0
  },
  void_witch:{
    id:'void_witch', name:'Void Witch', icon:'🔮', element:'shadow',
    title:'She bargained with nothing. Nothing won.',
    hp:145, maxHp:145, atk:44, def:10, spd:16, xp:118, gold:[42,72], loot:0.73,
    patterns:['curse','mind_spike','channel_burst','soul_rend'],
    status:[],patternIndex:0
  },
  storm_giant:{
    id:'storm_giant', name:'Storm Giant', icon:'⛈️', element:'electric',
    title:'Thunder is just its footsteps.',
    hp:190, maxHp:190, atk:38, def:18, spd:10, xp:125, gold:[44,75], loot:0.73,
    patterns:['thunder_clap','earthshatter','lightning_chain','heavy'],
    status:[],patternIndex:0
  },
  plague_knight:{
    id:'plague_knight', name:'Plague Knight', icon:'☠️', element:'poison',
    title:'He chose pestilence. Pestilence chose well.',
    hp:165, maxHp:165, atk:36, def:22, spd:11, xp:108, gold:[38,65], loot:0.7,
    patterns:['heavy','poison_spit','rust','culling_strike'],
    status:[],patternIndex:0
  },
  abyssal_hydra:{
    id:'abyssal_hydra', name:'Abyssal Hydra', icon:'🐲', element:'water',
    title:'Cut one head off. Count the new ones.',
    hp:185, maxHp:185, atk:34, def:16, spd:12, xp:122, gold:[43,73], loot:0.73,
    patterns:['deep_dive','double','undertow','charge','drain'],
    status:[],patternIndex:0
  },
  flame_archon:{
    id:'flame_archon', name:'Flame Archon', icon:'🔥', element:'fire',
    title:'The fire is not just in its hands.',
    hp:170, maxHp:170, atk:45, def:12, spd:15, xp:120, gold:[42,70], loot:0.73,
    patterns:['infernal_breath','heat_wave','charge','infernal_breath'],
    status:[],patternIndex:0
  },
  iron_colossus:{
    id:'iron_colossus', name:'Iron Colossus', icon:'🗜️', element:'steel',
    title:'It was built to end wars. There are no more wars.',
    hp:230, maxHp:230, atk:32, def:30, spd:3, xp:130, gold:[46,78], loot:0.73,
    patterns:['heavy','rust','earthshatter','charge'],
    status:[],patternIndex:0
  },
  death_specter:{
    id:'death_specter', name:'Death Specter', icon:'💀', element:'ghost',
    title:'Not a ghost. A warning.',
    hp:150, maxHp:150, atk:46, def:9, spd:19, xp:124, gold:[44,74], loot:0.75,
    patterns:['soul_rend','void_tear','wail','life_drain'],
    status:[],patternIndex:0
  },
  verdant_colossus:{
    id:'verdant_colossus', name:'Verdant Colossus', icon:'🌳', element:'grass',
    title:'The forest grew a fist and aimed it at you.',
    hp:210, maxHp:210, atk:33, def:20, spd:6, xp:118, gold:[40,70], loot:0.72,
    patterns:['entangle','heavy','spore_cloud','earthshatter'],
    status:[],patternIndex:0
  },
  crimson_revenant:{
    id:'crimson_revenant', name:'Crimson Revenant', icon:'🩸', element:'fire',
    title:'Burned alive. Still burning.',
    hp:160, maxHp:160, atk:40, def:14, spd:14, xp:112, gold:[40,68], loot:0.72,
    patterns:['infernal_breath','shadow_slash','heavy','infernal_breath'],
    status:[],patternIndex:0
  },
  abyssal_djinn:{
    id:'abyssal_djinn', name:'Abyssal Djinn', icon:'🌀', element:'shadow',
    title:'Three wishes. All of them terrible.',
    hp:155, maxHp:155, atk:42, def:13, spd:17, xp:116, gold:[42,72], loot:0.73,
    patterns:['void_tear','curse','mind_spike','summon'],
    status:[],patternIndex:0
  },
  tempest_wyrm:{
    id:'tempest_wyrm', name:'Tempest Wyrm', icon:'🐉', element:'electric',
    title:'It breathes lightning. Lucky you.',
    hp:175, maxHp:175, atk:38, def:17, spd:13, xp:120, gold:[43,72], loot:0.73,
    patterns:['lightning_chain','charge','thunder_clap','double'],
    status:[],patternIndex:0
  },
  deep_tyrant:{
    id:'deep_tyrant', name:'Deep Tyrant', icon:'🦀', element:'water',
    title:'The ocean floor has a throne. This is what sat on it.',
    hp:195, maxHp:195, atk:35, def:22, spd:9, xp:126, gold:[44,76], loot:0.74,
    patterns:['undertow','heavy','deep_dive','enrage_strike'],
    status:[],patternIndex:0
  },
  null_knight:{
    id:'null_knight', name:'Null Knight', icon:'🖤', element:'dark',
    title:'He swore an oath to nothing. Nothing holds him to it.',
    hp:175, maxHp:175, atk:43, def:19, spd:13, xp:122, gold:[43,74], loot:0.73,
    patterns:['soul_rend','heavy','shadow_slash','stun_strike'],
    status:[],patternIndex:0
  },
  abyssal_phoenix:{
    id:'abyssal_phoenix', name:'Abyssal Phoenix', icon:'🦅', element:'fire',
    title:'Burns forever. Reborn wrong.',
    hp:160, maxHp:160, atk:44, def:11, spd:18, xp:119, gold:[42,72], loot:0.73,
    patterns:['infernal_breath','talon_rake','heat_wave','charge'],
    status:[],patternIndex:0
  },
  runic_colossus:{
    id:'runic_colossus', name:'Runic Colossus', icon:'🔱', element:'steel',
    title:'The runes are a language only it understands.',
    hp:220, maxHp:220, atk:36, def:28, spd:5, xp:128, gold:[45,78], loot:0.73,
    patterns:['rust','heavy','earthshatter','enrage_strike'],
    status:[],patternIndex:0
  },

  // ══════════════════════════════════════════════════════
  // BOSSES — Every 5th floor
  // ══════════════════════════════════════════════════════

  // ── FLOOR 5: The Bone Revenant ──
  bone_revenant:{
    id:'bone_revenant', name:'The Bone Revenant', icon:'💀', element:'ghost',
    title:'What the grave could not hold.',
    isBoss:true,
    hp:280, maxHp:280, atk:22, def:10, spd:9, xp:120, gold:[40,60], loot:1.0,
    patterns:['heavy','basic','curse','double'],
    phases:[
      { threshold:0.5, name:'Phase 2: Unchained', atkBoost:8, defBoost:5,
        announce:'The Bone Revenant SHATTERS and reforms! More bones. More rage.',
        newPatterns:['heavy','charge','curse','heavy'] },
      { threshold:0.25, name:'Phase 3: Final Reckoning', atkBoost:15, defBoost:8,
        announce:'FINAL RECKONING — bone and void fuse into something terrible.',
        newPatterns:['charge','heavy','void_tear','charge'] },
    ],
    enrageTurns:20,
    enrageAnnounce:'The Bone Revenant ENRAGES! +20% ATK/DEF.',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 10: The Shadow Tyrant ──
  shadow_tyrant:{
    id:'shadow_tyrant', name:'The Shadow Tyrant', icon:'🌑', element:'shadow',
    title:'Darkness given ambition.',
    isBoss:true,
    hp:480, maxHp:480, atk:32, def:16, spd:14, xp:250, gold:[70,100], loot:1.0,
    patterns:['shadow_slash','basic','void_tear','curse'],
    phases:[
      { threshold:0.5, name:'Phase 2: Shadow Incarnate', atkBoost:12, defBoost:8,
        announce:'Shadow Tyrant becomes one with the darkness. Harder to see. Harder to hit.',
        newPatterns:['shadow_slash','void_tear','double','heavy'] },
      { threshold:0.25, name:'Phase 3: The Abyss Speaks', atkBoost:20, defBoost:12,
        announce:'THE ABYSS SPEAKS THROUGH HIM. Everything gets darker.',
        newPatterns:['void_tear','heavy','charge','void_tear'] },
    ],
    enrageTurns:18,
    enrageAnnounce:'Shadow Tyrant absorbs the darkness — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 15: The Plaguelord ──
  plaguelord:{
    id:'plaguelord', name:'The Plaguelord', icon:'🫧', element:'poison',
    title:'Disease is just evolution you disagree with.',
    isBoss:true,
    hp:680, maxHp:680, atk:38, def:18, spd:11, xp:380, gold:[100,150], loot:1.0,
    patterns:['poison_spit','basic','curse','poison_spit'],
    phases:[
      { threshold:0.5, name:'Phase 2: Plague Bloom', atkBoost:14, defBoost:10,
        announce:"The Plaguelord's wounds bloom with disease. Now everything is plague.",
        newPatterns:['poison_spit','heavy','poison_spit','curse'] },
      { threshold:0.25, name:'Phase 3: Total Infection', atkBoost:22, defBoost:14,
        announce:'TOTAL INFECTION. The air itself turns green.',
        newPatterns:['poison_spit','charge','void_tear','poison_spit'] },
    ],
    enrageTurns:16,
    enrageAnnounce:'The Plaguelord drinks from his own plague — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 20: The Void Emperor ──
  void_emperor:{
    id:'void_emperor', name:'The Void Emperor', icon:'🌀', element:'shadow',
    title:'He who sits at the center of nothing.',
    isBoss:true,
    hp:920, maxHp:920, atk:48, def:22, spd:16, xp:550, gold:[150,220], loot:1.0,
    patterns:['void_tear','shadow_slash','basic','void_tear'],
    phases:[
      { threshold:0.5, name:'Phase 2: Reality Fracture', atkBoost:18, defBoost:12,
        announce:'THE VOID EMPEROR FRACTURES REALITY. Your attacks feel... wrong.',
        newPatterns:['void_tear','void_tear','heavy','shadow_slash'] },
      { threshold:0.25, name:'Phase 3: Emperor Unchained', atkBoost:30, defBoost:18,
        announce:'EMPEROR UNCHAINED — the void consumes everything near him.',
        newPatterns:['void_tear','charge','heavy','void_tear','charge'] },
    ],
    enrageTurns:15,
    enrageAnnounce:'The Void Emperor opens a tear in space — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 25: The Crimson Leviathan ──
  crimson_leviathan:{
    id:'crimson_leviathan', name:'The Crimson Leviathan', icon:'🐉', element:'fire',
    title:'Ancient beyond reckoning. Hungry beyond reason.',
    isBoss:true,
    hp:1200, maxHp:1200, atk:58, def:26, spd:13, xp:750, gold:[200,300], loot:1.0,
    patterns:['infernal_breath','heavy','charge','basic'],
    phases:[
      { threshold:0.5, name:'Phase 2: Blazing Fury', atkBoost:22, defBoost:15,
        announce:'The Crimson Leviathan IGNITES. The whole room is on fire.',
        newPatterns:['infernal_breath','charge','heavy','infernal_breath'] },
      { threshold:0.25, name:'Phase 3: Leviathan Ascendant', atkBoost:38, defBoost:22,
        announce:'LEVIATHAN ASCENDANT — primordial fire given terrible purpose.',
        newPatterns:['charge','infernal_breath','void_tear','charge','infernal_breath'] },
    ],
    enrageTurns:14,
    enrageAnnounce:'The Crimson Leviathan ROARS — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 30: The Undying Archon ──
  undying_archon:{
    id:'undying_archon', name:'The Undying Archon', icon:'👁️', element:'ghost',
    title:'It has watched every hero fall here.',
    isBoss:true,
    hp:1550, maxHp:1550, atk:70, def:32, spd:15, xp:1000, gold:[280,400], loot:1.0,
    patterns:['life_drain','heavy','curse','wail'],
    phases:[
      { threshold:0.5, name:'Phase 2: Archon Resurgent', atkBoost:28, defBoost:18,
        announce:'The Undying Archon DIES... and immediately returns. Stronger.',
        newPatterns:['life_drain','void_tear','heavy','curse'] },
      { threshold:0.25, name:'Phase 3: True Undying', atkBoost:45, defBoost:28,
        announce:'TRUE UNDYING. Every wound just makes it angry.',
        newPatterns:['life_drain','charge','void_tear','life_drain','heavy'] },
    ],
    enrageTurns:13,
    enrageAnnounce:'The Undying Archon absorbs the souls of the fallen — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 35: The Abyssal Sovereign ──
  abyssal_sovereign:{
    id:'abyssal_sovereign', name:'The Abyssal Sovereign', icon:'👑', element:'dark',
    title:'The abyss chose a ruler. It chose well.',
    isBoss:true,
    hp:2000, maxHp:2000, atk:85, def:40, spd:17, xp:1400, gold:[380,550], loot:1.0,
    patterns:['void_tear','heavy','shadow_slash','enrage_strike'],
    phases:[
      { threshold:0.5, name:'Phase 2: Sovereign Wrath', atkBoost:35, defBoost:24,
        announce:'THE SOVEREIGN AWAKENS ITS TRUE POWER. The abyss trembles.',
        newPatterns:['enrage_strike','void_tear','heavy','enrage_strike'] },
      { threshold:0.25, name:'Phase 3: Sovereign Absolute', atkBoost:55, defBoost:38,
        announce:'SOVEREIGN ABSOLUTE — the darkness bows to its will.',
        newPatterns:['enrage_strike','charge','void_tear','enrage_strike','heavy'] },
    ],
    enrageTurns:12,
    enrageAnnounce:'The Abyssal Sovereign declares dominion — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 40: The Eternal Devourer ──
  eternal_devourer:{
    id:'eternal_devourer', name:'The Eternal Devourer', icon:'🦑', element:'shadow',
    title:'It has eaten entire worlds. You are a snack.',
    isBoss:true,
    hp:2600, maxHp:2600, atk:100, def:48, spd:16, xp:1900, gold:[500,700], loot:1.0,
    patterns:['void_tear','life_drain','summon','charge'],
    phases:[
      { threshold:0.5, name:'Phase 2: Devourer Awakened', atkBoost:40, defBoost:30,
        announce:'THE DEVOURER AWAKENS FULLY. It was only half-awake until now.',
        newPatterns:['life_drain','void_tear','charge','heavy','life_drain'] },
      { threshold:0.25, name:'Phase 3: Consumption', atkBoost:65, defBoost:45,
        announce:'CONSUMPTION — it begins to eat reality itself.',
        newPatterns:['life_drain','void_tear','enrage_strike','charge','void_tear'] },
    ],
    enrageTurns:11,
    enrageAnnounce:'The Eternal Devourer CONSUMES a piece of your soul — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 45: The Abyssal Overlord ──
  abyssal_overlord:{
    id:'abyssal_overlord', name:'The Abyssal Overlord', icon:'😈', element:'dark',
    title:'One floor stands between you and the end.',
    isBoss:true,
    hp:3300, maxHp:3300, atk:120, def:58, spd:18, xp:2600, gold:[650,900], loot:1.0,
    patterns:['enrage_strike','void_tear','heavy','charge'],
    phases:[
      { threshold:0.5, name:'Phase 2: Overlord Unbound', atkBoost:50, defBoost:38,
        announce:'THE OVERLORD IS UNBOUND. The chains of the abyss held him back. No longer.',
        newPatterns:['enrage_strike','charge','void_tear','enrage_strike','heavy'] },
      { threshold:0.25, name:'Phase 3: The Last Gate', atkBoost:80, defBoost:55,
        announce:'THE LAST GATE OPENS. He will not let you reach floor 50.',
        newPatterns:['charge','enrage_strike','void_tear','charge','enrage_strike'] },
    ],
    enrageTurns:10,
    enrageAnnounce:'The Abyssal Overlord calls upon ALL the darkness — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── FLOOR 50: The Abyssal God — FINAL BOSS ──
  abyssal_god:{
    id:'abyssal_god', name:'THE ABYSSAL GOD', icon:'🌌', element:'shadow',
    title:'You reached the bottom. Now face what lives here.',
    isBoss:true,
    isFinalBoss:true,
    hp:5000, maxHp:5000, atk:150, def:70, spd:20, xp:5000, gold:[1000,1500], loot:1.0,
    patterns:['void_tear','enrage_strike','heavy','life_drain'],
    phases:[
      { threshold:0.65, name:'Phase 2: God Awakened', atkBoost:60, defBoost:40,
        announce:'THE ABYSSAL GOD AWAKENS. It was testing you. Now it is serious.',
        newPatterns:['enrage_strike','void_tear','charge','heavy','enrage_strike'] },
      { threshold:0.3, name:'Phase 3: Godhood Unbound', atkBoost:100, defBoost:65,
        announce:'GODHOOD UNBOUND — the entire abyss is now your enemy.',
        newPatterns:['enrage_strike','void_tear','enrage_strike','charge','life_drain','void_tear'] },
    ],
    enrageTurns:8,
    enrageAnnounce:'THE ABYSSAL GOD REACHES INTO THE VOID — ENRAGED!!!',
    conquestReward:true,
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },

  // ── RIVAL BOSSES — each run meets one of two bosses on floors 5–45 ──
  carrion_matron:{
    id:'carrion_matron', name:'The Carrion Matron', icon:'🕷️', element:'bug',
    title:'Every corpse down here is a nursery.',
    isBoss:true,
    hp:260, maxHp:260, atk:20, def:9, spd:11, xp:120, gold:[40,60], loot:1.0,
    patterns:['brood_swarm','basic','poison_spit','basic'],
    phases:[
      { threshold:0.5, name:'Phase 2: The Brood Wakes', atkBoost:7, defBoost:4,
        announce:'The Carrion Matron splits open — the brood pours out!',
        newPatterns:['brood_swarm','poison_spit','heavy','brood_swarm'] },
      { threshold:0.25, name:'Phase 3: Hive Mother', atkBoost:14, defBoost:7,
        announce:'HIVE MOTHER — the walls themselves crawl toward you.',
        newPatterns:['brood_swarm','charge','brood_swarm','poison_spit'] },
    ],
    enrageTurns:20,
    enrageAnnounce:'The Carrion Matron shrieks — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  hollow_choir:{
    id:'hollow_choir', name:'The Hollow Choir', icon:'🎶', element:'sound',
    title:'Seven voices. No throats.',
    isBoss:true,
    hp:450, maxHp:450, atk:30, def:14, spd:15, xp:250, gold:[70,100], loot:1.0,
    patterns:['dirge','basic','wail','double'],
    phases:[
      { threshold:0.5, name:'Phase 2: Crescendo', atkBoost:11, defBoost:7,
        announce:'The Hollow Choir swells into a CRESCENDO. Your ears bleed.',
        newPatterns:['dirge','wail','heavy','dirge'] },
      { threshold:0.25, name:'Phase 3: The Final Note', atkBoost:19, defBoost:11,
        announce:'THE FINAL NOTE — a sound that unmakes whoever hears it.',
        newPatterns:['dirge','charge','wail','dirge','heavy'] },
    ],
    enrageTurns:18,
    enrageAnnounce:'The Hollow Choir screams in unison — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  frostbound_queen:{
    id:'frostbound_queen', name:'The Frostbound Queen', icon:'❄️', element:'ice',
    title:'She froze her court so it could never leave her.',
    isBoss:true,
    hp:640, maxHp:640, atk:36, def:20, spd:12, xp:380, gold:[100,150], loot:1.0,
    patterns:['glacial_prison','frost_bite','basic','blizzard'],
    phases:[
      { threshold:0.5, name:'Phase 2: Winter Court', atkBoost:13, defBoost:10,
        announce:'The Frostbound Queen summons her frozen court to her side.',
        newPatterns:['glacial_prison','blizzard','heavy','frost_bite'] },
      { threshold:0.25, name:'Phase 3: Absolute Winter', atkBoost:21, defBoost:14,
        announce:'ABSOLUTE WINTER — the air itself freezes solid.',
        newPatterns:['glacial_prison','blizzard','charge','glacial_prison'] },
    ],
    enrageTurns:16,
    enrageAnnounce:'The Frostbound Queen shatters her crown — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  mirror_sovereign:{
    id:'mirror_sovereign', name:'The Mirror Sovereign', icon:'🪞', element:'glass',
    title:'It wears the faces of everyone who looked too long.',
    isBoss:true,
    hp:880, maxHp:880, atk:46, def:24, spd:15, xp:550, gold:[150,220], loot:1.0,
    patterns:['mirror_ward','heavy','mind_spike','double'],
    phases:[
      { threshold:0.5, name:'Phase 2: Shattered Reflection', atkBoost:17, defBoost:12,
        announce:'The Mirror Sovereign cracks — and every shard is still watching.',
        newPatterns:['mirror_ward','mind_spike','charge','heavy'] },
      { threshold:0.25, name:'Phase 3: A Thousand Faces', atkBoost:28, defBoost:17,
        announce:'A THOUSAND FACES — all of them yours.',
        newPatterns:['charge','mirror_ward','void_tear','mind_spike','heavy'] },
    ],
    enrageTurns:15,
    enrageAnnounce:'The Mirror Sovereign shrieks in a thousand voices — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  drowned_titan:{
    id:'drowned_titan', name:'The Drowned Titan', icon:'🌊', element:'water',
    title:'It sank with its city and kept growing.',
    isBoss:true,
    hp:1250, maxHp:1250, atk:55, def:28, spd:10, xp:750, gold:[200,300], loot:1.0,
    patterns:['quake_slam','undertow','basic','deep_dive'],
    phases:[
      { threshold:0.5, name:'Phase 2: High Tide', atkBoost:21, defBoost:14,
        announce:'HIGH TIDE — water floods the chamber to your waist.',
        newPatterns:['quake_slam','deep_dive','heavy','undertow'] },
      { threshold:0.25, name:'Phase 3: The Deluge', atkBoost:36, defBoost:21,
        announce:'THE DELUGE — the Drowned Titan brings the whole sea down on you.',
        newPatterns:['quake_slam','charge','deep_dive','quake_slam','undertow'] },
    ],
    enrageTurns:14,
    enrageAnnounce:'The Drowned Titan roars like a breaking wave — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  star_eater:{
    id:'star_eater', name:'The Star Eater', icon:'🌠', element:'cosmic',
    title:'It ate the sky above the abyss. Now it is still hungry.',
    isBoss:true,
    hp:1500, maxHp:1500, atk:68, def:30, spd:16, xp:1000, gold:[280,400], loot:1.0,
    patterns:['starfall','basic','void_tear','heavy'],
    phases:[
      { threshold:0.5, name:'Phase 2: Event Horizon', atkBoost:27, defBoost:17,
        announce:'The Star Eater opens its maw. Light bends toward it.',
        newPatterns:['starfall','void_tear','charge','starfall'] },
      { threshold:0.25, name:'Phase 3: Supernova', atkBoost:43, defBoost:27,
        announce:'SUPERNOVA — it vomits back every star it ever swallowed.',
        newPatterns:['starfall','enrage_strike','void_tear','starfall','charge'] },
    ],
    enrageTurns:13,
    enrageAnnounce:'The Star Eater collapses inward — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  blood_regent:{
    id:'blood_regent', name:'The Blood Regent', icon:'🩸', element:'blood',
    title:'It rules with a crown it grew from its own veins.',
    isBoss:true,
    hp:1950, maxHp:1950, atk:82, def:38, spd:16, xp:1400, gold:[380,550], loot:1.0,
    patterns:['blood_pact','life_drain','heavy','shadow_slash'],
    phases:[
      { threshold:0.5, name:'Phase 2: Sanguine Court', atkBoost:31, defBoost:22,
        announce:'The Blood Regent calls its court — every drop of spilled blood rises.',
        newPatterns:['blood_pact','shadow_slash','charge','life_drain'] },
      { threshold:0.25, name:'Phase 3: The Red Throne', atkBoost:52, defBoost:32,
        announce:'THE RED THRONE — it drinks the whole room dry.',
        newPatterns:['blood_pact','enrage_strike','life_drain','charge','shadow_slash'] },
    ],
    enrageTurns:12,
    enrageAnnounce:'The Blood Regent tears open its veins — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  the_unwound:{
    id:'the_unwound', name:'The Unwound', icon:'⏳', element:'time',
    title:'A clock that stopped, and refused to die with it.',
    isBoss:true,
    hp:2500, maxHp:2500, atk:96, def:46, spd:18, xp:1900, gold:[500,700], loot:1.0,
    patterns:['time_rewind','heavy','mind_spike','charge'],
    phases:[
      { threshold:0.5, name:'Phase 2: Wrong Hours', atkBoost:36, defBoost:26,
        announce:'The Unwound skips forward. You were hit before you saw it move.',
        newPatterns:['heavy','time_rewind','charge','mind_spike','heavy'] },
      { threshold:0.25, name:'Phase 3: Time Undone', atkBoost:60, defBoost:38,
        announce:'TIME UNDONE — every second you survive is borrowed.',
        newPatterns:['charge','enrage_strike','time_rewind','charge','void_tear'] },
    ],
    enrageTurns:11,
    enrageAnnounce:'The Unwound runs backward into fury — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
  eye_of_oblivion:{
    id:'eye_of_oblivion', name:'The Eye of Oblivion', icon:'👁️', element:'void',
    title:'It does not attack you. It forgets you, a little at a time.',
    isBoss:true,
    hp:3200, maxHp:3200, atk:116, def:56, spd:18, xp:2600, gold:[650,900], loot:1.0,
    patterns:['oblivion_gaze','void_tear','soul_rend','heavy'],
    phases:[
      { threshold:0.5, name:'Phase 2: The Lid Opens', atkBoost:43, defBoost:31,
        announce:'The Eye of Oblivion opens fully. Your name slips from your mind.',
        newPatterns:['oblivion_gaze','void_tear','charge','soul_rend'] },
      { threshold:0.25, name:'Phase 3: Nothing Remains', atkBoost:72, defBoost:46,
        announce:'NOTHING REMAINS — not even the memory of light.',
        newPatterns:['oblivion_gaze','enrage_strike','void_tear','oblivion_gaze','charge'] },
    ],
    enrageTurns:10,
    enrageAnnounce:'The Eye of Oblivion widens — ENRAGED!',
    status:[],patternIndex:0,currentPhase:0,enrageCount:0
  },
};

// ── Boss floor map ──
const BOSS_FLOORS = [5,10,15,20,25,30,35,40,45,50];
const BOSS_BY_FLOOR = {
  5:'bone_revenant', 10:'shadow_tyrant', 15:'plaguelord', 20:'void_emperor',
  25:'crimson_leviathan', 30:'undying_archon', 35:'abyssal_sovereign',
  40:'eternal_devourer', 45:'abyssal_overlord', 50:'abyssal_god'
};
// Rival bosses: on each of these floors a run meets either the usual boss or
// its rival (decided by the floor's seed, so a seed always meets the same ones).
const BOSS_RIVALS = {
  5:'carrion_matron', 10:'hollow_choir', 15:'frostbound_queen', 20:'mirror_sovereign',
  25:'drowned_titan', 30:'star_eater', 35:'blood_regent', 40:'the_unwound', 45:'eye_of_oblivion'
};

// ── Milestone floors (extra difficult, special modifiers) ──
const MILESTONE_FLOORS = [10,20,25,30,40,50];

// ── Difficulty tiers ──
function getFloorTier(floor) {
  if (floor >= 36) return 'abyssal';
  if (floor >= 21) return 'brutal';
  if (floor >= 8)  return 'hard';
  return 'normal';
}

// Elite variant tuning (see getRandomEnemy() below) — % chance per regular
// spawn, and the stat multiplier applied on top of normal floor scaling.
const ELITE_CHANCE    = 12;
const ELITE_STAT_MULT = 1.4;

// New Game+: each cycle makes every enemy 30% stronger (HP and ATK)
function getNgPlusMult() { return 1 + (G.meta.ngPlus || 0) * 0.3; }

// ── Enemy scaling ─────────────────────────────────────────────
// Every stat follows ONE smooth curve, fitted to how a player who wins their
// fights actually grows (measure it with `GOD=1 node tools/honest_run.js`).
// Each tier's enemy pool is normalised to the same average first, so a new
// tier changes WHICH enemies you meet, not how strong they are. (The old tier
// multipliers and per-tier base stats made enemies ~3× stronger overnight on
// floors 8 and 21.) Milestone floors add a smaller +20% bump.
//            floor   hp  atk  def    xp  gold   — average regular enemy, Normal
const ENEMY_CURVE = [
  [ 1,   35,  11,   3,   16,   7],
  [ 4,   58,  18,   5,   26,   7],
  [ 7,  100,  30,   8,   40,   9],
  [ 8,  122,  36,   9,   55,  11],
  [10,  175,  52,  12,  100,  14],
  [14,  340,  88,  17,  160,  18],
  [20,  560, 135,  25,  340,  28],
  [25,  730, 160,  31,  650,  36],
  [30,  900, 190,  37, 1000,  44],
  [40, 1250, 245,  47, 1700,  50],
  [50, 1650, 300,  57, 2500,  55],
];
const MILESTONE_MULT = 1.2;
// Bosses relative to a regular enemy on the same floor
const BOSS_MULT     = { hp:3.5, atk:1.15, def:1.4 };
const GUARDIAN_MULT = { hp:2.6, atk:1.2,  def:1.2, xp:2.5 }; // full strength from floor 10
// Early guardians are gentler: you may meet one at level 1 before any other fight
function guardianMult(floor) {
  const t = clamp((floor - 1) / 9, 0, 1);
  return { ...GUARDIAN_MULT, hp: 1.6 + (GUARDIAN_MULT.hp - 1.6) * t, atk: 1.0 + (GUARDIAN_MULT.atk - 1.0) * t, def: 1.0 + (GUARDIAN_MULT.def - 1.0) * t };
}
const SECRET_BOSS_MULT = 1.0;  // on top of BOSS_MULT (secret bosses can't be avoided)

const ENEMY_POOLS = {
  normal: ['skeleton','wraith','goblin','cursed_armor','grave_worm','shadow_imp','hollow_knight','giant_spider','frost_sprite','mud_crawler','rabid_bat','bog_witch','stone_sprite','vine_horror','cracked_golem','ice_wisp','crypt_rat','wind_sprite','ember_imp','dire_wolf','thunder_crab'],
  hard:   ['vampire','lich','ghoul','soul_eater','plague_swarm','void_stalker','abyssal_serpent','tide_crawler','wind_wraith','swamp_horror','frost_revenant','thunder_hawk','deep_lurker','fungal_shaman','desert_scorpion','iron_golem','sea_witch','storm_elemental','bog_troll','harpy','cursed_knight','coral_beast','lava_crawler','void_shade'],
  deep:   ['demon','banshee','golem','dread_knight','chaos_elemental','abyssal_horror','elder_lich','stone_golem','sky_predator','glacier_titan','void_witch','storm_giant','plague_knight','abyssal_hydra','flame_archon','iron_colossus','death_specter','verdant_colossus','crimson_revenant','abyssal_djinn','tempest_wyrm','deep_tyrant','null_knight','abyssal_phoenix','runic_colossus'],
};
const GUARDIAN_POOLS = {
  normal: ['hollow_knight','cursed_armor','stone_sprite','vine_horror','cracked_golem'],
  hard:   ['void_stalker','soul_eater','iron_golem','storm_elemental','bog_troll','cursed_knight','coral_beast'],
  deep:   ['dread_knight','elder_lich','abyssal_horror','iron_colossus','glacier_titan','storm_giant','death_specter','verdant_colossus','null_knight','runic_colossus'],
};
function enemyPoolKey(floor) { return floor <= 7 ? 'normal' : floor <= 20 ? 'hard' : 'deep'; }
// Regular enemies from the next tier phase in over 4 floors (20% → 80%), so
// their nastier move sets don't all arrive on the same floor.
const POOL_BLEND = [ { from: 8, prev: 'normal', next: 'hard' }, { from: 21, prev: 'hard', next: 'deep' } ];
function rollEnemyPoolKey(floor) {
  for (const b of POOL_BLEND) {
    const step = floor - b.from + 1;
    if (step >= 1 && step <= 4) return rand(100) < step * 20 ? b.next : b.prev;
  }
  return enemyPoolKey(floor);
}

// Enemy SPD grows 4% per floor (players get much faster over a run too;
// initiative compares the two as a ratio, see determineFirstActor).
function enemySpdScale(floor) { return 1 + (clamp(floor, 1, 50) - 1) * 0.04; }

// enemyCurve(floor) — the average regular enemy's stats on that floor.
// noMilestone: bosses already ARE the floor's spike, so they skip the bump.
function enemyCurve(floor, noMilestone = false) {
  const f = clamp(floor, 1, 50);
  let i = 0;
  while (i < ENEMY_CURVE.length - 2 && f > ENEMY_CURVE[i + 1][0]) i++;
  const a = ENEMY_CURVE[i], b = ENEMY_CURVE[i + 1];
  const t = (f - a[0]) / (b[0] - a[0]);
  const lerp = k => a[k] + (b[k] - a[k]) * t;
  const m = !noMilestone && MILESTONE_FLOORS.includes(floor) ? MILESTONE_MULT : 1;
  return { hp: lerp(1) * m, atk: lerp(2) * m, def: lerp(3), xp: lerp(4) * m, gold: lerp(5) };
}

// Average base stats of a pool (cached) — used to normalise it
const _poolAvgCache = {};
function poolAverage(ids) {
  const key = ids.join();
  if (!_poolAvgCache[key]) {
    const avg = k => ids.reduce((s, id) => s + (k === 'gold' ? (ENEMY_POOL[id].gold[0] + ENEMY_POOL[id].gold[1]) / 2 : ENEMY_POOL[id][k]), 0) / ids.length;
    _poolAvgCache[key] = { hp: avg('hp'), atk: avg('atk'), def: avg('def'), xp: avg('xp'), gold: avg('gold') };
  }
  return _poolAvgCache[key];
}

// scaleEnemyToFloor — sets e's stats from the curve, keeping how strong e is
// relative to the rest of its pool. mult: extra multipliers (elite, guardian…)
function scaleEnemyToFloor(e, floor, poolAvg, mult = {}) {
  const c = enemyCurve(floor);
  const diff = getDifficultyMult() * getNgPlusMult();
  const rel = k => (e[k] || 0) / (poolAvg[k] || 1);
  e.hp    = Math.max(1, Math.round(rel('hp')  * c.hp  * (mult.hp  || 1) * diff));
  e.maxHp = e.hp;
  e.atk   = Math.max(1, Math.round(rel('atk') * c.atk * (mult.atk || 1) * diff));
  e.def   = Math.max(0, Math.round(rel('def') * c.def * (mult.def || 1)));
  e.spd   = Math.max(1, Math.round((e.spd || 8) * enemySpdScale(floor)));
  e.xp    = Math.round(rel('xp') * c.xp * (mult.xp || 1));
  const g = (e.gold[0] + e.gold[1]) / 2;
  const goldScale = c.gold * (mult.gold || 1) / (poolAvg.gold || g || 1);
  e.gold  = e.gold.map(v => Math.max(1, Math.round(v * goldScale)));
  return e;
}

// getFloorStatMult — kept for anything that wants "how much stronger than
// floor 1" (e.g. mods); enemies use enemyCurve() directly.
function getFloorStatMult(floor) { return enemyCurve(floor).hp / ENEMY_CURVE[0][1]; }

// getRandomEnemy(floor, allowElite=true) — allowElite=false is used by
// getRandomEnemyPack() below so pack members never roll Elite too (keeps
// the two difficulty-spike systems from compounding unpredictably).
function getRandomEnemy(floor, allowElite=true) {
  const pool = ENEMY_POOLS[rollEnemyPoolKey(floor)];
  const base = deepCopy(ENEMY_POOL[pool[rand(pool.length)]]);

  // ELITE VARIANTS: cheap content multiplier — reuses every existing
  // regular enemy with buffed stats + better loot instead of hand-authoring
  // new enemy data. Floor 3+ only (too rough any earlier). See
  // ELITE_CHANCE / ELITE_STAT_MULT above for tuning.
  const isElite = allowElite && floor >= 3 && rand(100) < ELITE_CHANCE;
  const em = isElite ? ELITE_STAT_MULT : 1;
  scaleEnemyToFloor(base, floor, poolAverage(pool), { hp: em, atk: em, def: isElite ? 1.15 : 1, xp: isElite ? 1.6 : 1, gold: isElite ? 2 : 1 });
  base.loot     = isElite ? Math.min(1, (base.loot||0) + 0.35) : base.loot;
  base.status   = [];
  base.patternIndex = 0;

  if (isElite) {
    base.isElite = true;
    base.name = `Elite ${base.name}`;
    base.title = base.title ? `${base.title} (Elite)` : 'A stronger foe than most.';
  }

  return base;
}

// getRandomEnemyPack — returns 2 enemies for a "pack" encounter (see
// placeEnemyCell() in mapgen.js). Each is scaled to 70% HP/ATK so the pack
// as a whole is meaningfully tougher than one regular enemy but not simply
// double — an intentional, controlled difficulty bump rather than a wall.
// allowElite=false on both rolls keeps Elites and packs from stacking.
function getRandomEnemyPack(floor) {
  const a = getRandomEnemy(floor, false);
  const b = getRandomEnemy(floor, false);
  // Rewards scale down with the stats so a pack pays ~1.4× a single enemy, not 2×
  [a, b].forEach(en => {
    en.hp  = Math.round(en.hp * 0.7);
    en.maxHp = en.hp;
    en.atk = Math.round(en.atk * 0.7);
    en.xp  = Math.round(en.xp * 0.7);
    en.gold = en.gold.map(g => Math.round(g * 0.7));
    en.loot = (en.loot || 0) * 0.7;
  });
  return [a, b];
}

// getBossForFloor(floor, bossId?) — bossId forces a specific boss (tests, dev)
// Bosses are scaled to BOSS_MULT × the floor's regular enemy, relative to the
// floor's usual boss, so a rival keeps its own strengths and weaknesses.
function getBossForFloor(floor, forceId) {
  const bossId = forceId || (BOSS_RIVALS[floor] && rand(2) === 1 ? BOSS_RIVALS[floor] : BOSS_BY_FLOOR[floor]);
  if (!bossId || !ENEMY_POOL[bossId]) return null;
  const b = deepCopy(ENEMY_POOL[bossId]);
  const ref = ENEMY_POOL[BOSS_BY_FLOOR[floor]] || ENEMY_POOL[bossId];
  scaleBoss(b, floor, ref, 1);
  // Rewards scale with depth like everything else
  b.xp = Math.round(b.xp * (1 + (floor - 1) * 0.12));
  b.gold = (b.gold || [20, 40]).map(g => Math.round(g * (1 + (floor - 1) * 0.1)));
  b.status = [];
  b.patternIndex = 0;
  b.currentPhase = 0;
  b.enrageCount  = 0;
  return b;
}

// scaleBoss — boss (or secret boss) stats for this floor. ref is the boss
// whose base stats define "1×". Phase boosts (authored as flat numbers for
// the base stats) scale by the same factor via e._phaseScale.
function scaleBoss(b, floor, ref, extra = 1) {
  const c = enemyCurve(floor, true);
  const diff = getDifficultyMult() * getNgPlusMult();
  const kHp  = c.hp  * BOSS_MULT.hp  * extra / ref.hp;
  const kAtk = c.atk * BOSS_MULT.atk * extra / ref.atk;
  const kDef = c.def * BOSS_MULT.def / Math.max(1, ref.def);
  b.hp    = Math.round(b.hp * kHp * diff);
  b.maxHp = b.hp;
  b.atk   = Math.round(b.atk * kAtk * diff);
  b.def   = Math.round(b.def * kDef);
  b.spd   = Math.max(1, Math.round((b.spd || 8) * enemySpdScale(floor)));
  Object.defineProperty(b, '_phaseScale', { value: { atk: kAtk * diff, def: kDef }, enumerable: true, writable: true, configurable: true });
  return b;
}

// Guardian (non-boss-floor strong enemy that locks the exit)
function getGuardianForFloor(floor) {
  const pool = GUARDIAN_POOLS[enemyPoolKey(floor)];
  const base = deepCopy(ENEMY_POOL[pool[rand(pool.length)]]);
  // Normalised against the regular pool of the same tier, then made sturdier
  scaleEnemyToFloor(base, floor, poolAverage(ENEMY_POOLS[enemyPoolKey(floor)]), { ...guardianMult(floor), gold: 1.5 * (1 + (floor - 1) * 0.04) });
  base.isGuardian = true;
  base.status = [];
  base.patternIndex = 0;
  base.currentPhase = 0;
  base.enrageCount  = 0;
  return base;
}
