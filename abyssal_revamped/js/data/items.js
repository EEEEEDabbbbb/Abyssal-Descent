// ══════════════════════════════════════════════════════════════
// ITEM POOL — 260 items across 7 rarities
// ══════════════════════════════════════════════════════════════

const ITEM_POOL = [
  // ── CONSUMABLES ──────────────────────────────────────────────
  { id:'health_potion',   name:'Blood Flask',       type:'consumable', icon:'🧪', rarity:'common',
    desc:'Restore 40 HP.', element:'normal',
    use:(p)=>{ const h=Math.min(40,p.stats.maxHp-p.stats.hp); p.stats.hp+=h; logEntry('heal',`Blood Flask restores ${h} HP.`); } },
  { id:'mana_crystal',    name:'Mana Crystal',      type:'consumable', icon:'💎', rarity:'common',
    desc:'Restore 30 MP.', element:'psychic',
    use:(p)=>{ const m=Math.min(30,p.stats.maxMp-p.stats.mp); p.stats.mp+=m; logEntry('heal',`Mana Crystal restores ${m} MP.`); } },
  { id:'elixir',          name:'Abyssal Elixir',    type:'consumable', icon:'⚗️', rarity:'uncommon',
    desc:'Restore 60 HP and 40 MP.', element:'normal',
    use:(p)=>{ const h=Math.min(60,p.stats.maxHp-p.stats.hp); const m=Math.min(40,p.stats.maxMp-p.stats.mp); p.stats.hp+=h; p.stats.mp+=m; logEntry('heal',`Elixir restores ${h} HP and ${m} MP.`); } },
  { id:'strength_draught',name:'Strength Draught',  type:'consumable', icon:'💪', rarity:'uncommon',
    desc:'+6 ATK for 3 turns.', element:'fighting',
    use:(p)=>{ addStatus(p,{id:'str_draught',name:'Strengthened',type:'buff',icon:'💪',duration:3,atkBonus:6}); p.stats.atk+=6; logEntry('status-applied','Strength Draught: +6 ATK for 3 turns.'); } },
  { id:'shadow_dust',     name:'Shadow Dust',       type:'consumable', icon:'🌑', rarity:'rare',
    desc:'Become invisible for 2 turns. Next attack deals 250% damage.', element:'shadow',
    use:(p)=>{ p.nextAttackMult=2.5; p.nextAttackGuaranteed=true; addStatus(p,{id:'vanished',name:'Vanished',type:'buff',icon:'💨',duration:2}); logEntry('status-applied','Shadow Dust: Vanished for 2 turns!'); } },
  { id:'berserker_brew',  name:'Berserker Brew',    type:'consumable', icon:'🍺', rarity:'rare',
    desc:'+10 ATK, -5 DEF for 4 turns.', element:'fighting',
    use:(p)=>{ addStatus(p,{id:'berserk',name:'Berserk',type:'buff',icon:'🍺',duration:4,atkBonus:10,defPen:5}); p.stats.atk+=10; p.stats.def=Math.max(0,p.stats.def-5); logEntry('status-applied','Berserker Brew: +10 ATK, -5 DEF!'); } },
  { id:'iron_skin_salve', name:'Iron Skin Salve',   type:'consumable', icon:'🛡️', rarity:'uncommon',
    desc:'+8 DEF for 3 turns.', element:'steel',
    use:(p)=>{ addStatus(p,{id:'iron_skin',name:'Iron Skin',type:'buff',icon:'🛡️',duration:3,defBonus:8}); p.stats.def+=8; logEntry('status-applied','Iron Skin Salve: +8 DEF for 3 turns.'); } },
  // ── NEW CONSUMABLES — exotic elements ──
  { id:'spring_water',    name:'Spring Water',      type:'consumable', icon:'💧', rarity:'common',
    desc:'Cool spring water. Restore 20 HP and 15 MP.', element:'water',
    use:(p)=>{ const h=Math.min(20,p.stats.maxHp-p.stats.hp); const m=Math.min(15,p.stats.maxMp-p.stats.mp); p.stats.hp+=h; p.stats.mp+=m; logEntry('heal',`Spring Water restores ${h} HP and ${m} MP.`); } },
  { id:'verdant_tonic',   name:'Verdant Tonic',     type:'consumable', icon:'🌿', rarity:'uncommon',
    desc:'Grass-brewed remedy. Regenerate 12 HP per turn for 3 turns.', element:'grass',
    use:(p)=>{ addStatus(p,{id:'hp_regen',name:'Regen',type:'buff',icon:'🌿',duration:3, onTurn:(pl)=>{ const h=Math.min(12,pl.stats.maxHp-pl.stats.hp); pl.stats.hp+=h; if(h>0)logEntry('heal',`Regen restores ${h} HP.`); } }); logEntry('status-applied','Verdant Tonic: Regen 12 HP/turn for 3 turns.'); } },
  { id:'earthen_ward',    name:'Earthen Ward',      type:'consumable', icon:'🌍', rarity:'uncommon',
    desc:'Harden your skin with earth magic. +12 DEF for 3 turns. Gain 25 shield.', element:'ground',
    use:(p)=>{ addStatus(p,{id:'earthen',name:'Earthen',type:'buff',icon:'🌍',duration:3,defBonus:12}); p.stats.def+=12; p.shield=(p.shield||0)+25; logEntry('status-applied','Earthen Ward: +12 DEF, +25 shield for 3 turns.'); } },
  { id:'wind_draught',    name:'Wind Draught',      type:'consumable', icon:'🌪️', rarity:'rare',
    desc:'Drink the wind. +12 SPD and +8 CRIT for 4 turns.', element:'wind',
    use:(p)=>{ addStatus(p,{id:'wind_draught',name:'Wind Blessed',type:'buff',icon:'🌪️',duration:4,spdBonus:12,critBonus:8}); p.stats.spd+=12; p.stats.crit+=8; logEntry('status-applied','Wind Draught: +12 SPD, +8 CRIT for 4 turns!'); } },
  { id:'mind_shard',      name:'Mind Shard',        type:'consumable', icon:'🔮', rarity:'rare',
    desc:'Psychic crystal shard. +8 ATK, +15 CRIT for 3 turns.', element:'psychic',
    use:(p)=>{ addStatus(p,{id:'mind_shard',name:'Psychic Edge',type:'buff',icon:'🔮',duration:3,atkBonus:8,critBonus:15}); p.stats.atk+=8; p.stats.crit+=15; logEntry('status-applied','Mind Shard: +8 ATK, +15 CRIT for 3 turns!'); } },

  // ── COMMON CONSUMABLES ×4 ─────────────────────────────────────
  { id:'dried_meat',       name:'Dried Meat',          type:'consumable', icon:'🥩', rarity:'common',
    desc:'Trail rations. Restore 25 HP.',              element:'normal',
    use:(p)=>{ const h=Math.min(25,p.stats.maxHp-p.stats.hp); p.stats.hp+=h; logEntry('heal',`Dried Meat restores ${h} HP.`); } },
  { id:'crude_bandage',    name:'Crude Bandage',        type:'consumable', icon:'🩹', rarity:'common',
    desc:'Stop the bleeding. Restore 15 HP and cleanse 1 debuff.',  element:'normal',
    use:(p)=>{ const h=Math.min(15,p.stats.maxHp-p.stats.hp); p.stats.hp+=h; const d=p.status&&p.status.find(s=>s.type==='debuff'); if(d){removeStatuses(p,s=>s===d);} logEntry('heal',`Crude Bandage restores ${h} HP${d?' and cleanses '+d.name+'.':'.'}` ); } },
  { id:'mp_draught',       name:'Mana Draught',         type:'consumable', icon:'🔵', rarity:'common',
    desc:'A thin blue liquid. Restore 20 MP.',         element:'psychic',
    use:(p)=>{ const m=Math.min(20,p.stats.maxMp-p.stats.mp); p.stats.mp+=m; logEntry('heal',`Mana Draught restores ${m} MP.`); } },
  { id:'pebble_bomb',      name:'Pebble Bomb',          type:'consumable', icon:'💥', rarity:'common',
    desc:'Deals 15 damage to the enemy.',              element:'rock',
    use:(p)=>{ if(!G.enemy)return; const dmg=Math.max(1,15-Math.floor(G.enemy.def*0.3)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); logEntry('player-action',`Pebble Bomb hits ${G.enemy.name} for ${dmg} damage!`); } },

  // ── UNCOMMON CONSUMABLES ×5 ───────────────────────────────────
  { id:'tonic_of_vigor',   name:'Tonic of Vigor',       type:'consumable', icon:'🌱', rarity:'uncommon',
    desc:'+5 ATK and +5 DEF for 3 turns.',             element:'grass',
    use:(p)=>{ addStatus(p,{id:'vigor',name:'Vigor',type:'buff',icon:'🌱',duration:3,atkBonus:5,defBonus:5}); p.stats.atk+=5; p.stats.def+=5; logEntry('status-applied','Tonic of Vigor: +5 ATK, +5 DEF for 3 turns.'); } },
  { id:'flash_powder',     name:'Flash Powder',          type:'consumable', icon:'✨', rarity:'uncommon',
    desc:'Blind the enemy. -6 ATK on enemy for 3 turns.',  element:'light',
    use:(p)=>{ if(!G.enemy)return; const pen=6; G.enemy.atk=Math.max(1,G.enemy.atk-pen); addStatus(G.enemy,{id:'blinded',name:'Blinded',type:'debuff',icon:'🌟',duration:3,atkPen:pen}); logEntry('player-action',`Flash Powder blinds ${G.enemy.name}! (-${pen} ATK)`); } },
  { id:'adrenaline_vial',  name:'Adrenaline Vial',       type:'consumable', icon:'💉', rarity:'uncommon',
    desc:'+10 SPD for 4 turns. Go first this turn.',   element:'normal',
    use:(p)=>{ addStatus(p,{id:'adrenaline',name:'Adrenaline',type:'buff',icon:'💉',duration:4,spdBonus:10}); p.stats.spd+=10; logEntry('status-applied','Adrenaline Vial: +10 SPD for 4 turns!'); } },
  { id:'smoke_bomb',       name:'Smoke Bomb',            type:'consumable', icon:'💨', rarity:'uncommon',
    desc:'Fill the air with smoke. Enemy has 40% miss chance for 2 turns.',  element:'shadow',
    use:(p)=>{ if(!G.enemy)return; addStatus(G.enemy,{id:'smoke_blind',name:'Smoke-Blind',type:'debuff',icon:'💨',duration:2}); logEntry('player-action',`Smoke Bomb: ${G.enemy.name} is blinded for 2 turns!`); } },
  { id:'lesser_antidote',  name:'Lesser Antidote',       type:'consumable', icon:'🧫', rarity:'uncommon',
    desc:'Cleanse poison and restore 20 HP.',          element:'grass',
    use:(p)=>{ removeStatuses(p,s=>s.id==='poison'||s.id==='venom'); const h=Math.min(20,p.stats.maxHp-p.stats.hp); p.stats.hp+=h; logEntry('heal',`Lesser Antidote cleanses poison and restores ${h} HP.`); } },

  { id:'focus_root',       name:'Focus Root',           type:'consumable', icon:'🌾', rarity:'uncommon',
    desc:'Chew the root. +8 CRIT for 4 turns.',        element:'grass',
    use:(p)=>{ addStatus(p,{id:'focus_root',name:'Focused',type:'buff',icon:'🌾',duration:4,critBonus:8}); p.stats.crit+=8; logEntry('status-applied','Focus Root: +8 CRIT for 4 turns.'); } },

  // ── RARE CONSUMABLES ×10 ──────────────────────────────────────
  { id:'fire_flask',       name:'Fire Flask',            type:'consumable', icon:'🔥', rarity:'rare',
    desc:'Hurl a fire flask. Deals 40 damage and applies 2 Burn stacks.',  element:'fire',
    use:(p)=>{ if(!G.enemy)return; const dmg=Math.max(5,40-Math.floor(G.enemy.def*0.4)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); logEntry('player-action',`Fire Flask hits ${G.enemy.name} for ${dmg} damage!`); applyBurn(G.enemy,p,2); } },
  { id:'void_dust',        name:'Void Dust',             type:'consumable', icon:'🌑', rarity:'rare',
    desc:'Apply Entropy to the enemy (2 stacks). -4 ATK and -4 DEF.',  element:'shadow',
    use:(p)=>{ if(!G.enemy)return; applyEntropy(G.enemy,p,2); logEntry('player-action',`Void Dust: ${G.enemy.name} afflicted with Entropy (2 stacks)!`); } },
  { id:'war_paint',        name:'War Paint',             type:'consumable', icon:'🎨', rarity:'rare',
    desc:'+12 ATK, +8 CRIT for 4 turns.',              element:'fighting',
    use:(p)=>{ addStatus(p,{id:'war_paint',name:'War Paint',type:'buff',icon:'🎨',duration:4,atkBonus:12,critBonus:8}); p.stats.atk+=12; p.stats.crit+=8; logEntry('status-applied','War Paint: +12 ATK, +8 CRIT for 4 turns!'); } },
  { id:'bulwark_draught',  name:'Bulwark Draught',       type:'consumable', icon:'🛡️', rarity:'rare',
    desc:'+15 DEF for 4 turns. Gain 40 shield.',        element:'steel',
    use:(p)=>{ addStatus(p,{id:'bulwark',name:'Bulwark',type:'buff',icon:'🛡️',duration:4,defBonus:15}); p.stats.def+=15; p.shield=(p.shield||0)+40; logEntry('status-applied','Bulwark Draught: +15 DEF, +40 shield for 4 turns!'); } },
  { id:'swift_tonic',      name:'Swift Tonic',           type:'consumable', icon:'💨', rarity:'rare',
    desc:'+15 SPD, +12 CRIT for 4 turns.',             element:'wind',
    use:(p)=>{ addStatus(p,{id:'swift',name:'Swift',type:'buff',icon:'💨',duration:4,spdBonus:15,critBonus:12}); p.stats.spd+=15; p.stats.crit+=12; logEntry('status-applied','Swift Tonic: +15 SPD, +12 CRIT for 4 turns!'); } },
  { id:'full_antidote',    name:'Full Antidote',         type:'consumable', icon:'🧪', rarity:'rare',
    desc:'Cleanse all debuffs. Restore 30 HP.',        element:'grass',
    use:(p)=>{ const count=(p.status||[]).filter(s=>s.type==='debuff').length; removeStatuses(p,s=>s.type==='debuff'); const h=Math.min(30,p.stats.maxHp-p.stats.hp); p.stats.hp+=h; logEntry('heal',`Full Antidote cleanses ${count} debuff(s) and restores ${h} HP.`); } },
  { id:'plague_vial',      name:'Plague Vial',           type:'consumable', icon:'☠️', rarity:'rare',
    desc:'Apply Plague to the enemy (2 stacks).',      element:'poison',
    use:(p)=>{ if(!G.enemy)return; applyPlague(G.enemy,p,2); logEntry('player-action',`Plague Vial: ${G.enemy.name} is afflicted with Plague (2 stacks)!`); } },
  { id:'heavy_elixir',     name:'Heavy Elixir',          type:'consumable', icon:'⚗️', rarity:'rare',
    desc:'Restore 80 HP and 50 MP.',                   element:'normal',
    use:(p)=>{ const h=Math.min(80,p.stats.maxHp-p.stats.hp); const m=Math.min(50,p.stats.maxMp-p.stats.mp); p.stats.hp+=h; p.stats.mp+=m; logEntry('heal',`Heavy Elixir restores ${h} HP and ${m} MP.`); } },
  { id:'regen_tonic',      name:'Regen Tonic',           type:'consumable', icon:'💚', rarity:'rare',
    desc:'Regenerate 20 HP/turn for 4 turns.',         element:'grass',
    use:(p)=>{ addStatus(p,{id:'hp_regen_tonic',name:'Regen',type:'buff',icon:'💚',duration:4,onTurn:(pl)=>{ const h=Math.min(20,pl.stats.maxHp-pl.stats.hp); pl.stats.hp+=h; if(h>0)logEntry('heal',`Regen restores ${h} HP.`); }}); logEntry('status-applied','Regen Tonic: Regen 20 HP/turn for 4 turns.'); } },
  { id:'finisher_vial',    name:"Finisher's Vial",       type:'consumable', icon:'💀', rarity:'rare',
    desc:'Deal 60 damage. Deals double if enemy is below 35% HP.',  element:'dark',
    use:(p)=>{ if(!G.enemy)return; const execute=G.enemy.hp/G.enemy.maxHp<0.35; const base=60; const dmg=Math.max(1,execute?base*2-Math.floor(G.enemy.def*0.3):base-Math.floor(G.enemy.def*0.5)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); logEntry('player-action',`${execute?"💀 EXECUTE! ":""}Finisher's Vial deals ${dmg} damage to ${G.enemy.name}!`); } },

  { id:'thunder_vial',     name:'Thunder Vial',          type:'consumable', icon:'⚡', rarity:'rare',
    desc:'Hurl crackling lightning. Deals 55 damage to the enemy.',  element:'electric',
    use:(p)=>{ if(!G.enemy)return; const dmg=Math.max(8,55-Math.floor(G.enemy.def*0.35)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); logEntry('player-action',`Thunder Vial strikes ${G.enemy.name} for ${dmg} damage!`); } },
  { id:'mp_regen_vial',    name:'Mana Regen Vial',        type:'consumable', icon:'🔷', rarity:'rare',
    desc:'Restore 10 MP/turn for 4 turns.',             element:'psychic',
    use:(p)=>{ addStatus(p,{id:'mp_regen_vial',name:'MP Regen',type:'buff',icon:'🔷',duration:4,onTurn:(pl)=>{ const m=Math.min(10,pl.stats.maxMp-pl.stats.mp); pl.stats.mp+=m; if(m>0)logEntry('heal',`Mana Regen Vial restores ${m} MP.`); }}); logEntry('status-applied','Mana Regen Vial: Regen 10 MP/turn for 4 turns.'); } },

  // ── EPIC CONSUMABLES ×12 ──────────────────────────────────────
  { id:'dragons_blood',    name:"Dragon's Blood",        type:'consumable', icon:'🐉', rarity:'epic',
    desc:'+20 ATK, +10 DEF, +10 SPD for 5 turns.',    element:'dragon',
    use:(p)=>{ addStatus(p,{id:'dragons_blood',name:"Dragon's Blood",type:'buff',icon:'🐉',duration:5,atkBonus:20,defBonus:10,spdBonus:10}); p.stats.atk+=20; p.stats.def+=10; p.stats.spd+=10; logEntry('status-applied',"Dragon's Blood: +20 ATK, +10 DEF, +10 SPD for 5 turns!"); } },
  { id:'void_grenade',     name:'Void Grenade',          type:'consumable', icon:'💣', rarity:'epic',
    desc:'Deals 90 damage and applies Entropy (3 stacks) to the enemy.',  element:'shadow',
    use:(p)=>{ if(!G.enemy)return; const dmg=Math.max(10,90-Math.floor(G.enemy.def*0.3)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); applyEntropy(G.enemy,p,3); logEntry('player-action',`Void Grenade hits ${G.enemy.name} for ${dmg} damage and applies Entropy!`); } },
  { id:'purity_draught',   name:'Purity Draught',        type:'consumable', icon:'🌿', rarity:'epic',
    desc:'Cleanse ALL debuffs, restore 60 HP. Immunity to debuffs for 2 turns.',  element:'fairy',
    use:(p)=>{ const count=(p.status||[]).filter(s=>s.type==='debuff').length; removeStatuses(p,s=>s.type==='debuff'); const h=Math.min(60,p.stats.maxHp-p.stats.hp); p.stats.hp+=h; addStatus(p,{id:'debuff_immune',name:'Pure',type:'buff',icon:'🌿',duration:2}); logEntry('heal',`Purity Draught cleanses ${count} debuff(s), restores ${h} HP, and grants debuff immunity for 2 turns!`); } },
  { id:'inferno_bomb',     name:'Inferno Bomb',          type:'consumable', icon:'🌋', rarity:'epic',
    desc:'Hurl a burning bomb. Deals 70 damage and applies 4 Burn stacks.',  element:'fire',
    use:(p)=>{ if(!G.enemy)return; const dmg=Math.max(10,70-Math.floor(G.enemy.def*0.3)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); applyBurn(G.enemy,p,4); logEntry('player-action',`Inferno Bomb blasts ${G.enemy.name} for ${dmg} damage and 4 Burn stacks!`); } },
  { id:'titan_draught',    name:'Titan Draught',         type:'consumable', icon:'🗿', rarity:'epic',
    desc:'+25 DEF for 5 turns. Gain 80 shield. Immune to damage the first hit.',  element:'rock',
    use:(p)=>{ addStatus(p,{id:'titan_draught',name:'Titan',type:'buff',icon:'🗿',duration:5,defBonus:25}); p.stats.def+=25; p.shield=(p.shield||0)+80; logEntry('status-applied','Titan Draught: +25 DEF, +80 shield for 5 turns!'); } },
  { id:'phantom_brew',     name:'Phantom Brew',          type:'consumable', icon:'👻', rarity:'epic',
    desc:'Next 3 attacks deal 180% damage. Become ghostly.',  element:'ghost',
    use:(p)=>{ p.nextAttackMult=1.8; addStatus(p,{id:'phantom_brew',name:'Phantom',type:'buff',icon:'👻',duration:3,_chargesLeft:3}); logEntry('status-applied','Phantom Brew: Next 3 attacks deal 180% damage!'); } },
  { id:'berserker_blood',  name:"Berserker's Blood",     type:'consumable', icon:'🩸', rarity:'epic',
    desc:'+25 ATK, +18 CRIT for 4 turns. -15 DEF.',   element:'dark',
    use:(p)=>{ addStatus(p,{id:'berserk_blood',name:"Berserker's Blood",type:'buff',icon:'🩸',duration:4,atkBonus:25,critBonus:18,defPen:15}); p.stats.atk+=25; p.stats.crit+=18; p.stats.def=Math.max(0,p.stats.def-15); logEntry('status-applied',"Berserker's Blood: +25 ATK, +18 CRIT, -15 DEF for 4 turns!"); } },
  { id:'plague_bomb',      name:'Plague Bomb',           type:'consumable', icon:'🫧', rarity:'epic',
    desc:'Hurl a plague bomb. Deals 50 damage and applies Plague (4 stacks).',  element:'poison',
    use:(p)=>{ if(!G.enemy)return; const dmg=Math.max(8,50-Math.floor(G.enemy.def*0.3)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); applyPlague(G.enemy,p,4); logEntry('player-action',`Plague Bomb hits ${G.enemy.name} for ${dmg} damage and applies Plague (4 stacks)!`); } },
  { id:'grand_elixir',     name:'Grand Elixir',          type:'consumable', icon:'✨', rarity:'epic',
    desc:'Restore 120 HP and 80 MP.',                  element:'fairy',
    use:(p)=>{ const h=Math.min(120,p.stats.maxHp-p.stats.hp); const m=Math.min(80,p.stats.maxMp-p.stats.mp); p.stats.hp+=h; p.stats.mp+=m; logEntry('heal',`Grand Elixir restores ${h} HP and ${m} MP.`); } },
  { id:'deep_regen',       name:'Deep Regen Potion',     type:'consumable', icon:'💧', rarity:'epic',
    desc:'Regenerate 30 HP/turn for 6 turns.',         element:'water',
    use:(p)=>{ addStatus(p,{id:'deep_regen',name:'Deep Regen',type:'buff',icon:'💧',duration:6,onTurn:(pl)=>{ const h=Math.min(30,pl.stats.maxHp-pl.stats.hp); pl.stats.hp+=h; if(h>0)logEntry('heal',`Deep Regen restores ${h} HP.`); }}); logEntry('status-applied','Deep Regen: 30 HP/turn for 6 turns.'); } },
  { id:'soul_bomb',        name:'Soul Bomb',             type:'consumable', icon:'💜', rarity:'epic',
    desc:'Deals 100 magic damage ignoring DEF.',       element:'ghost',
    use:(p)=>{ if(!G.enemy)return; const dmg=100; G.enemy.hp=Math.max(0,G.enemy.hp-dmg); logEntry('player-action',`Soul Bomb deals ${dmg} magic damage to ${G.enemy.name}!`); } },
  { id:'executioner_brew', name:"Executioner's Brew",    type:'consumable', icon:'⚔️', rarity:'epic',
    desc:'Deal 120 damage. Instakill if enemy is below 20% HP.',  element:'dark',
    use:(p)=>{ if(!G.enemy)return; const execute=G.enemy.hp/G.enemy.maxHp<0.20; if(execute){ logEntry('player-action',`💀 EXECUTE! Executioner's Brew slays ${G.enemy.name}!`); G.enemy.hp=0; return; } const dmg=Math.max(10,120-Math.floor(G.enemy.def*0.4)); G.enemy.hp=Math.max(0,G.enemy.hp-dmg); logEntry('player-action',`Executioner's Brew deals ${dmg} damage to ${G.enemy.name}!`); } },

  // ── LEGENDARY CONSUMABLES ×8 ──────────────────────────────────
  { id:'warlord_tonic',    name:'Warlord Tonic',         type:'consumable', icon:'⚔️', rarity:'legendary',
    desc:'+35 ATK, +20 CRIT, +15 SPD for 6 turns.',   element:'fighting',
    use:(p)=>{ addStatus(p,{id:'warlord',name:'Warlord',type:'buff',icon:'⚔️',duration:6,atkBonus:35,critBonus:20,spdBonus:15}); p.stats.atk+=35; p.stats.crit+=20; p.stats.spd+=15; logEntry('status-applied','Warlord Tonic: +35 ATK, +20 CRIT, +15 SPD for 6 turns!'); } },
  { id:'iron_fortress',    name:'Iron Fortress Brew',    type:'consumable', icon:'🏰', rarity:'legendary',
    desc:'+40 DEF for 5 turns. Gain 120 shield. Reflect 20% of damage taken.',  element:'steel',
    use:(p)=>{ addStatus(p,{id:'iron_fortress_draught',name:'Iron Fortress',type:'buff',icon:'🏰',duration:5,defBonus:40,reflectPct:25}); p.stats.def+=40; p.shield=(p.shield||0)+120; logEntry('status-applied','Iron Fortress: +40 DEF, +120 shield, 25% damage reflect for 5 turns!'); } },
  { id:'abyssal_elixir_l', name:'Abyssal Tincture',      type:'consumable', icon:'🌑', rarity:'legendary',
    desc:'Fully restore HP and MP.',                   element:'shadow',
    use:(p)=>{ const h=p.stats.maxHp-p.stats.hp; const m=p.stats.maxMp-p.stats.mp; p.stats.hp=p.stats.maxHp; p.stats.mp=p.stats.maxMp; logEntry('heal',`Abyssal Tincture fully restores ${h} HP and ${m} MP!`); } },
  { id:'gods_wrath',       name:"God's Wrath",           type:'consumable', icon:'☄️', rarity:'legendary',
    desc:'Call down lightning. Deals 200 magic damage ignoring DEF.',  element:'electric',
    use:(p)=>{ if(!G.enemy)return; G.enemy.hp=Math.max(0,G.enemy.hp-200); logEntry('player-action',`☄️ God's Wrath calls down lightning for 200 magic damage on ${G.enemy.name}!`); } },
  { id:'execution_mark',   name:'Execution Mark',        type:'consumable', icon:'💀', rarity:'legendary',
    desc:"Mark the enemy for death. Instakill if they're below 40% HP.",  element:'dark',
    use:(p)=>{ if(!G.enemy)return; const execute=G.enemy.hp/G.enemy.maxHp<0.40; if(execute){ logEntry('player-action',`💀 EXECUTION! Execution Mark obliterates ${G.enemy.name}!`); G.enemy.hp=0; return; } addStatus(G.enemy,{id:'death_marked',name:'Death Marked',type:'debuff',icon:'💀',duration:999}); logEntry('player-action',`${G.enemy.name} is marked for death! (instakill below 40% HP)`); } },
  { id:'chaos_brew',       name:'Chaos Brew',            type:'consumable', icon:'🌀', rarity:'legendary',
    desc:'+30 to ALL stats for 5 turns. Unstable: -10 DEF after it expires.',  element:'shadow',
    use:(p)=>{ addStatus(p,{id:'chaos_brew',name:'Chaos',type:'buff',icon:'🌀',duration:5,atkBonus:30,defBonus:30,spdBonus:30,critBonus:30,onExpire:(pl)=>{ pl.stats.def=Math.max(0,pl.stats.def-10); logEntry('status-applied','Chaos Brew fades — DEF reduced by 10.'); }}); p.stats.atk+=30; p.stats.def+=30; p.stats.spd+=30; p.stats.crit+=30; logEntry('status-applied','Chaos Brew: +30 ALL stats for 5 turns! (unstable)'); } },
  { id:'sustain_potion',   name:'Sustain Potion',        type:'consumable', icon:'💖', rarity:'legendary',
    desc:'Regenerate 40 HP/turn for 8 turns. Restore 80 MP.',  element:'fairy',
    use:(p)=>{ const m=Math.min(80,p.stats.maxMp-p.stats.mp); p.stats.mp+=m; addStatus(p,{id:'sustain',name:'Sustained',type:'buff',icon:'💖',duration:8,onTurn:(pl)=>{ const h=Math.min(40,pl.stats.maxHp-pl.stats.hp); pl.stats.hp+=h; if(h>0)logEntry('heal',`Sustain Potion regenerates ${h} HP.`); }}); logEntry('status-applied',`Sustain Potion: 40 HP/turn for 8 turns. Restored ${m} MP!`); } },
  { id:'plague_apocalypse',name:'Plague Apocalypse',     type:'consumable', icon:'☣️', rarity:'legendary',
    desc:'Apply Plague (6 stacks) + Entropy (4 stacks) + Burn (4 stacks) simultaneously.',  element:'poison',
    use:(p)=>{ if(!G.enemy)return; applyPlague(G.enemy,p,6); applyEntropy(G.enemy,p,4); applyBurn(G.enemy,p,4); logEntry('player-action',`☣️ Plague Apocalypse: ${G.enemy.name} is afflicted with Plague (6), Entropy (4), and Burn (4)!`); } },

  // ── MYTHICAL CONSUMABLES ×5 ───────────────────────────────────
  { id:'god_mode_brew',    name:'God Mode Brew',         type:'consumable', icon:'👁️', rarity:'mythical',
    desc:'Become invulnerable for 3 turns. All attacks deal triple damage.',  element:'shadow',
    use:(p)=>{ addStatus(p,{id:'invulnerable',name:'Invulnerable',type:'buff',icon:'👁️',duration:3}); p.nextAttackMult=(p.nextAttackMult||1)*3; addStatus(p,{id:'triple_dmg',name:'Lethal',type:'buff',icon:'⚡',duration:3}); logEntry('status-applied','🔥 God Mode Brew: Invulnerable + Triple Damage for 3 turns!'); } },
  { id:'cooldown_reset',   name:'Chrono Flask',          type:'consumable', icon:'⏳', rarity:'mythical',
    desc:'Instantly reset ALL ability cooldowns to 0.',  element:'ghost',
    use:(p)=>{ if(p.cooldowns){ Object.keys(p.cooldowns).forEach(k=>p.cooldowns[k]=0); } logEntry('status-applied','⏳ Chrono Flask: All ability cooldowns reset to 0!'); } },
  { id:'soul_resurrection',name:'Soul Vial',             type:'consumable', icon:'💫', rarity:'mythical',
    desc:'Restore HP and MP to full. Gain 200 shield. Cleanse all debuffs.',  element:'fairy',
    use:(p)=>{ removeStatuses(p,s=>s.type==='debuff'); p.stats.hp=p.stats.maxHp; p.stats.mp=p.stats.maxMp; p.shield=(p.shield||0)+200; logEntry('heal','💫 Soul Vial: Full HP/MP restored, +200 shield, all debuffs cleansed!'); } },
  { id:'oblivion_bomb',    name:'Oblivion Bomb',         type:'consumable', icon:'💥', rarity:'mythical',
    desc:'Deals 350 magic damage ignoring DEF. Destroys ALL enemy buffs.',  element:'void',
    use:(p)=>{ if(!G.enemy)return; G.enemy.status=(G.enemy.status||[]).filter(s=>s.type!=='buff'); G.enemy.hp=Math.max(0,G.enemy.hp-350); logEntry('player-action',`💥 Oblivion Bomb erases buffs and deals 350 damage to ${G.enemy.name}!`); } },
  { id:'avatar_brew',      name:'Avatar Brew',           type:'consumable', icon:'🌟', rarity:'mythical',
    desc:'+50 ATK, +30 DEF, +30 SPD, +30 CRIT for 7 turns. Lifesteal on all hits.',  element:'dragon',
    use:(p)=>{ addStatus(p,{id:'avatar',name:'Avatar',type:'buff',icon:'🌟',duration:7,atkBonus:50,defBonus:30,spdBonus:30,critBonus:30}); p.stats.atk+=50; p.stats.def+=30; p.stats.spd+=30; p.stats.crit+=30; addStatus(p,{id:'avatar_lifesteal',name:'Lifesteal',type:'buff',icon:'❤️',duration:7}); logEntry('status-applied','🌟 Avatar Brew: +50 ATK, +30 DEF/SPD/CRIT, Lifesteal for 7 turns!'); } },

  // ── DIVINE CONSUMABLE ×1 ──────────────────────────────────────
  { id:'elixir_of_gods',   name:'Elixir of the Gods',    type:'consumable', icon:'🔮', rarity:'divine',
    desc:'The ultimate consumable. Fully restore HP/MP. +60 ATK, +40 DEF, +40 SPD, +40 CRIT for 10 turns. Invulnerable for 2 turns. Reset all cooldowns. Deal 500 magic damage to the enemy.',  element:'cosmic',
    use:(p)=>{ p.stats.hp=p.stats.maxHp; p.stats.mp=p.stats.maxMp; removeStatuses(p,s=>s.type==='debuff'); if(p.cooldowns)Object.keys(p.cooldowns).forEach(k=>p.cooldowns[k]=0); addStatus(p,{id:'gods_gift',name:"Gods' Gift",type:'buff',icon:'🔮',duration:10,atkBonus:60,defBonus:40,spdBonus:40,critBonus:40}); p.stats.atk+=60; p.stats.def+=40; p.stats.spd+=40; p.stats.crit+=40; addStatus(p,{id:'invulnerable',name:'Invulnerable',type:'buff',icon:'🛡️',duration:2}); if(G.enemy){ G.enemy.hp=Math.max(0,G.enemy.hp-500); logEntry('player-action',`🔮 Elixir of the Gods shatters ${G.enemy.name} for 500 magic damage!`);  } logEntry('heal','🔮 Elixir of the Gods: Full restore, +60 ATK/+40 DEF/SPD/CRIT, Invulnerable, all cooldowns reset!'); } },

  // ── WEAPONS ──────────────────────────────────────────────────
  // Common
  { id:'rusty_sword',     name:'Rusty Sword',       type:'weapon', icon:'🗡️', rarity:'common',
    desc:'+4 ATK.',                                     slot:'weapon', element:'normal',  bonuses:{atk:4} },
  { id:'bone_staff',      name:'Bone Staff',         type:'weapon', icon:'🪄', rarity:'common',
    desc:'+3 ATK, +5 MP.',                              slot:'weapon', element:'ghost',   bonuses:{atk:3,maxMp:5} },
  // Uncommon
  { id:'shadow_dagger',   name:'Shadow Dagger',      type:'weapon', icon:'🗡️', rarity:'uncommon',
    desc:'+7 ATK, +5 CRIT.',                            slot:'weapon', element:'shadow',  bonuses:{atk:7,crit:5} },
  { id:'iron_mace',       name:'Iron Mace',          type:'weapon', icon:'🔨', rarity:'uncommon',
    desc:'+9 ATK, +3 DEF.',                             slot:'weapon', element:'steel',   bonuses:{atk:9,def:3} },
  { id:'frost_wand',      name:'Frost Wand',         type:'weapon', icon:'❄️', rarity:'uncommon',
    desc:'+6 ATK, +10 MP.',                             slot:'weapon', element:'ice',     bonuses:{atk:6,maxMp:10} },
  // Rare
  { id:'serrated_blade',  name:'Serrated Blade',     type:'weapon', icon:'⚔️', rarity:'rare',
    desc:'+12 ATK, +5 CRIT. Piercing.',                 slot:'weapon', element:'normal',  bonuses:{atk:12,crit:5}, effect:'piercing' },
  { id:'soul_saber',      name:'Soul Saber',         type:'weapon', icon:'💜', rarity:'rare',
    desc:'+10 ATK. 10% lifesteal.',                     slot:'weapon', element:'ghost',   bonuses:{atk:10}, effect:'lifesteal' },
  { id:'thunder_rod',     name:'Thunder Rod',        type:'weapon', icon:'⚡', rarity:'rare',
    desc:'+8 ATK, +8 SPD, +8 CRIT.',                   slot:'weapon', element:'electric',bonuses:{atk:8,spd:8,crit:8} },
  // Epic
  { id:'void_blade',      name:'Void Blade',         type:'weapon', icon:'🌀', rarity:'epic',
    desc:'+18 ATK, +10 CRIT. Piercing + Lifesteal. Grants: Void Shred.',    slot:'weapon', element:'shadow',  bonuses:{atk:18,crit:10}, effect:'piercing_lifesteal', grantAbilities:['void_shred'] },
  { id:'dragons_fang',    name:"Dragon's Fang",      type:'weapon', icon:'🐉', rarity:'epic',
    desc:'+20 ATK, +8 SPD. Grants: Cosmic Collapse.',                        slot:'weapon', element:'dragon',  bonuses:{atk:20,spd:8}, grantAbilities:['cosmic_collapse'] },
  { id:'inferno_staff',   name:'Inferno Staff',      type:'weapon', icon:'🔥', rarity:'epic',
    desc:'+15 ATK, +15 MP. Burnboost. Grants: Cinder Storm.',                slot:'weapon', element:'fire',    bonuses:{atk:15,maxMp:15}, effect:'burnboost', grantAbilities:['cinder_storm'] },
  // Legendary
  { id:'deathbringer',    name:'Deathbringer',       type:'weapon', icon:'💀', rarity:'legendary',
    desc:'+28 ATK, +15 CRIT. Piercing + Lifesteal. Grants: Night Blade + Death Mark.',    slot:'weapon', element:'dark',    bonuses:{atk:28,crit:15}, effect:'piercing_lifesteal', grantAbilities:['night_blade','death_mark'] },
  { id:'arcane_grimoire', name:'Arcane Grimoire',    type:'weapon', icon:'📕', rarity:'legendary',
    desc:'+20 ATK, +30 MP. Burnboost++. Grants: Soul Shatter + Cosmic Collapse.',         slot:'weapon', element:'psychic', bonuses:{atk:20,maxMp:30}, effect:'burnboost2', grantAbilities:['soul_shatter','cosmic_collapse'] },
  // Mythical
  { id:'abyssal_edge',    name:'Abyssal Edge',       type:'weapon', icon:'🌑', rarity:'mythical',
    desc:'+35 ATK, +20 CRIT, +20 SPD. Piercing. Grants: Night Blade + Phantom Step + Void Shred.',   slot:'weapon', element:'shadow',  bonuses:{atk:35,crit:20,spd:20}, effect:'piercing', grantAbilities:['night_blade','phantom_step','void_shred'] },
  { id:'void_scythe',     name:'Void Scythe',        type:'weapon', icon:'⚜️', rarity:'mythical',
    desc:'+40 ATK. Lifesteal + Burnboost++. Grants: Reality Rip + Void Rupture.',         slot:'weapon', element:'shadow',  bonuses:{atk:40}, effect:'lifesteal_burnboost2', grantAbilities:['reality_rip','void_rupture'] },
  // Divine
  { id:'eternity_blade',  name:'Eternity Blade',     type:'weapon', icon:'✨', rarity:'divine',
    desc:'+50 ATK, +25 CRIT. Piercing + Lifesteal + Burnboost. Grants: Divine Lance + Solar Flare + Martyrs Wrath.', slot:'weapon', element:'fairy', bonuses:{atk:50,crit:25}, effect:'piercing_lifesteal_burnboost', grantAbilities:['divine_lance','solar_flare','martyrs_wrath'] },
  { id:'abyssal_scepter', name:'Abyssal Scepter',    type:'weapon', icon:'🔱', rarity:'divine',
    desc:'+45 ATK, +50 MP, +15 SPD. Spellmaster + Burnboost++. Grants: Cosmic Collapse + Void Rupture + Abyss Gaze.', slot:'weapon', element:'dragon', bonuses:{atk:45,maxMp:50,spd:15}, effect:'spellmaster_burnboost2', grantAbilities:['cosmic_collapse','void_rupture','abyss_gaze'] },

  // ── ARMOR ─────────────────────────────────────────────────────
  // Common
  { id:'leather_vest',    name:'Leather Vest',       type:'armor', icon:'👕', rarity:'common',
    desc:'+3 DEF.',                                     slot:'armor', element:'normal',  bonuses:{def:3} },
  { id:'padded_gloves',   name:'Padded Gloves',      type:'armor', icon:'🧤', rarity:'common',
    desc:'+2 DEF, +2 SPD.',                             slot:'armor', element:'normal',  bonuses:{def:2,spd:2} },
  // Uncommon
  { id:'shadow_cloak',    name:'Shadow Cloak',       type:'armor', icon:'🧥', rarity:'uncommon',
    desc:'+6 DEF, +5 SPD.',                             slot:'armor', element:'shadow',  bonuses:{def:6,spd:5} },
  { id:'chainmail',       name:'Chainmail Hauberk',  type:'armor', icon:'⛓️', rarity:'uncommon',
    desc:'+9 DEF, +15 max HP.',                         slot:'armor', element:'steel',   bonuses:{def:9,maxHp:15} },
  // Rare
  { id:'bone_plate',      name:'Bone Plate',         type:'armor', icon:'🦴', rarity:'rare',
    desc:'+14 DEF, +20 max HP.',                        slot:'armor', element:'ghost',   bonuses:{def:14,maxHp:20} },
  { id:'blood_mail',      name:'Blood Mail',         type:'armor', icon:'🩸', rarity:'rare',
    desc:'+8 DEF, +30 max HP.',                         slot:'armor', element:'dark',    bonuses:{def:8,maxHp:30} },
  { id:'shadowweave',     name:'Shadowweave Armor',  type:'armor', icon:'🌑', rarity:'rare',
    desc:'+10 DEF, +8 SPD, +10 max MP.',                slot:'armor', element:'shadow',  bonuses:{def:10,spd:8,maxMp:10} },
  // Epic
  { id:'void_shroud',     name:'Void Shroud',        type:'armor', icon:'🌑', rarity:'epic',
    desc:'+15 DEF, +20 max HP, +20 max MP.',            slot:'armor', element:'shadow',  bonuses:{def:15,maxHp:20,maxMp:20} },
  { id:'dreadplate',      name:'Dreadplate Armor',   type:'armor', icon:'🛡️', rarity:'epic',
    desc:'+20 DEF, +40 max HP.',                        slot:'armor', element:'steel',   bonuses:{def:20,maxHp:40} },
  { id:'phantomweave',    name:'Phantomweave Cloak', type:'armor', icon:'👻', rarity:'epic',
    desc:'+12 DEF, +12 SPD, +25 max HP.',               slot:'armor', element:'ghost',   bonuses:{def:12,spd:12,maxHp:25} },
  // Legendary
  { id:'abyssal_plate',   name:'Abyssal Plate',      type:'armor', icon:'💀', rarity:'legendary',
    desc:'+25 DEF, +50 max HP, +10 SPD.',               slot:'armor', element:'dark',    bonuses:{def:25,maxHp:50,spd:10} },
  { id:'soulweave_robe',  name:'Soulweave Robes',    type:'armor', icon:'🌙', rarity:'legendary',
    desc:'+15 DEF, +30 max HP, +40 max MP, +8 SPD.',    slot:'armor', element:'ghost',   bonuses:{def:15,maxHp:30,maxMp:40,spd:8} },
  // Mythical
  { id:'voidwalker_hide', name:'Voidwalker Hide',    type:'armor', icon:'🔮', rarity:'mythical',
    desc:'+30 DEF, +60 max HP, +40 max MP, +15 SPD.',   slot:'armor', element:'shadow',  bonuses:{def:30,maxHp:60,maxMp:40,spd:15} },
  { id:'titan_shell',     name:"Titan's Shell",      type:'armor', icon:'🗿', rarity:'mythical',
    desc:'+40 DEF, +80 max HP. 10% chance to block any hit.', slot:'armor', element:'rock', bonuses:{def:40,maxHp:80}, effect:'block' },
  // Divine
  { id:'divinity_plate',  name:'Divinity Plate',     type:'armor', icon:'⚜️', rarity:'divine',
    desc:'+50 DEF, +100 max HP, +50 max MP. Evasion + Block.', slot:'armor', element:'fairy', bonuses:{def:50,maxHp:100,maxMp:50}, effect:'evasion_block' },
  { id:'eternity_robes',  name:'Eternity Robes',     type:'armor', icon:'🌟', rarity:'divine',
    desc:'+35 DEF, +60 max HP, +80 max MP, +20 SPD. Spellmaster.', slot:'armor', element:'psychic', bonuses:{def:35,maxHp:60,maxMp:80,spd:20}, effect:'spellmaster' },

  // ── NEW WEAPONS — exotic element coverage ───────────────────
  // Uncommon
  { id:'aqua_blade',      name:'Aqua Blade',         type:'weapon', icon:'💧', rarity:'uncommon',
    desc:'+8 ATK, +5 DEF. Water element attacks.',         slot:'weapon', element:'water',   bonuses:{atk:8,def:5} },
  { id:'thorn_whip',      name:'Thorn Whip',         type:'weapon', icon:'🌿', rarity:'uncommon',
    desc:'+6 ATK, +5 SPD. 20% chance to poison on hit.',  slot:'weapon', element:'grass',   bonuses:{atk:6,spd:5}, effect:'venom' },
  // Rare
  { id:'gale_saber',      name:'Gale Saber',         type:'weapon', icon:'🌪️', rarity:'rare',
    desc:'+11 ATK, +8 SPD. Wind element.',                slot:'weapon', element:'wind',    bonuses:{atk:11,spd:8} },
  { id:'mind_staff',      name:'Mind Staff',         type:'weapon', icon:'🔮', rarity:'rare',
    desc:'+9 ATK, +20 MP. Spellmaster.',                  slot:'weapon', element:'psychic', bonuses:{atk:9,maxMp:20}, effect:'spellmaster' },
  { id:'stone_maul',      name:'Stone Maul',         type:'weapon', icon:'🪨', rarity:'rare',
    desc:'+14 ATK, +5 DEF. Rock element. Stagger on crit.', slot:'weapon', element:'rock',  bonuses:{atk:14,def:5} },
  // Epic
  { id:'terra_hammer',    name:'Terra Hammer',       type:'weapon', icon:'🌍', rarity:'epic',
    desc:'+22 ATK, +12 DEF. Ground element. Piercing.',   slot:'weapon', element:'ground',  bonuses:{atk:22,def:12}, effect:'piercing' },
  { id:'feather_lance',   name:'Feather Lance',      type:'weapon', icon:'🦅', rarity:'epic',
    desc:'+18 ATK, +14 SPD, +10 CRIT. Flying element.',  slot:'weapon', element:'flying',  bonuses:{atk:18,spd:14,crit:10} },
  { id:'acid_fang',       name:'Acid Fang',          type:'weapon', icon:'🐛', rarity:'epic',
    desc:'+16 ATK, +12 CRIT. Bug element. Venom on all hits.', slot:'weapon', element:'bug', bonuses:{atk:16,crit:12}, effect:'venom' },
  // Legendary
  { id:'tidal_edge',      name:'Tidal Edge',         type:'weapon', icon:'🌊', rarity:'legendary',
    desc:'+26 ATK, +10 DEF, +10 SPD. Water element. Lifesteal.', slot:'weapon', element:'water', bonuses:{atk:26,def:10,spd:10}, effect:'lifesteal' },
  { id:'psychic_blade',   name:'Psychic Blade',      type:'weapon', icon:'💫', rarity:'legendary',
    desc:'+24 ATK, +25 MP, +12 CRIT. Psychic element. Spellmaster.', slot:'weapon', element:'psychic', bonuses:{atk:24,maxMp:25,crit:12}, effect:'spellmaster' },

  // ── NEW ARMOR — exotic element coverage ─────────────────────
  // Rare
  { id:'tidal_robe',      name:'Tidal Robe',         type:'armor', icon:'🌊', rarity:'rare',
    desc:'+8 DEF, +25 max HP, +20 max MP. MP regen.',     slot:'armor', element:'water',   bonuses:{def:8,maxHp:25,maxMp:20}, effect:'mpregen' },
  { id:'bark_armor',      name:'Bark Armor',         type:'armor', icon:'🌿', rarity:'rare',
    desc:'+10 DEF, +20 max HP. HP regen 5/turn.',         slot:'armor', element:'grass',   bonuses:{def:10,maxHp:20}, effect:'hpregen' },
  // Epic
  { id:'stone_skin',      name:'Stone Skin',         type:'armor', icon:'🪨', rarity:'epic',
    desc:'+22 DEF, +50 max HP. Ground element. Block.',   slot:'armor', element:'ground',  bonuses:{def:22,maxHp:50}, effect:'block' },
  { id:'windweave_cloak', name:'Windweave Cloak',    type:'armor', icon:'🌪️', rarity:'epic',
    desc:'+10 DEF, +15 SPD, +15 max HP. Wind element. Evasion.', slot:'armor', element:'wind', bonuses:{def:10,spd:15,maxHp:15}, effect:'evasion' },
  // Legendary
  { id:'sky_mantle',      name:'Sky Mantle',         type:'armor', icon:'🦅', rarity:'legendary',
    desc:'+18 DEF, +20 SPD, +30 max HP. Flying element. Evasion.',slot:'armor', element:'flying', bonuses:{def:18,spd:20,maxHp:30}, effect:'evasion' },

  // ── NEW RELICS — exotic element coverage ─────────────────────
  // Rare
  { id:'jade_amulet',     name:'Jade Amulet',        type:'relic', icon:'💚', rarity:'rare',
    desc:'Restore 5 HP per turn in combat. +15 max HP.',  slot:'relic', element:'grass',   bonuses:{maxHp:15}, effect:'hpregen' },
  { id:'aqua_pendant',    name:'Aqua Pendant',       type:'relic', icon:'💧', rarity:'rare',
    desc:'+8 DEF. 10% chance to negate incoming damage.', slot:'relic', element:'water',   bonuses:{def:8}, effect:'block' },
  // Epic
  { id:'storm_pendant',   name:'Storm Pendant',      type:'relic', icon:'⚡', rarity:'epic',
    desc:'+15 SPD, +10 CRIT. +10% damage if SPD > enemy.', slot:'relic', element:'wind',  bonuses:{spd:15,crit:10}, effect:'spd_dmg' },
  { id:'insect_carapace', name:'Insect Carapace',    type:'relic', icon:'🐛', rarity:'epic',
    desc:'+10 DEF, +10 SPD. Venom on basic attacks.',     slot:'relic', element:'bug',     bonuses:{def:10,spd:10}, effect:'venom' },
  { id:'granite_ward',    name:'Granite Ward',       type:'relic', icon:'🪨', rarity:'epic',
    desc:'+20 DEF, +40 max HP. 15% block chance.',        slot:'relic', element:'rock',    bonuses:{def:20,maxHp:40}, effect:'block' },
  // Legendary
  { id:'feather_talisman',name:'Feather Talisman',   type:'relic', icon:'🦅', rarity:'legendary',
    desc:'+12 SPD, +15 CRIT. 20% evasion, +20 ATK.',     slot:'relic', element:'flying',  bonuses:{spd:12,crit:15,atk:20}, effect:'evasion2' },

  // ── RELICS ───────────────────────────────────────────────────
  // Uncommon
  { id:'soul_stone',      name:'Soul Stone',         type:'relic', icon:'💜', rarity:'uncommon',
    desc:'Restore 3 MP per turn in combat.',            slot:'relic', element:'ghost',   effect:'mpregen' },
  { id:'crimson_ring',    name:'Crimson Ring',       type:'relic', icon:'💍', rarity:'uncommon',
    desc:'+8% crit damage bonus.',                      slot:'relic', element:'fire',    bonuses:{critDmg:8} },
  { id:'wanderer_charm',  name:"Wanderer's Charm",   type:'relic', icon:'🧿', rarity:'uncommon',
    desc:'+3 to all stats.',                            slot:'relic', element:'normal',  bonuses:{atk:3,def:3,spd:3} },
  // Rare
  { id:'death_charm',     name:'Death Charm',        type:'relic', icon:'💀', rarity:'rare',
    desc:'Deal +15% damage when below 50% HP.',         slot:'relic', element:'dark',    effect:'deathcharm' },
  { id:'venom_amulet',    name:'Venom Amulet',       type:'relic', icon:'🐍', rarity:'rare',
    desc:'+6 ATK, +5 CRIT. Attacks have 20% chance to poison.', slot:'relic', element:'poison', bonuses:{atk:6,crit:5}, effect:'venom' },
  { id:'shield_pendant',  name:'Shield Pendant',     type:'relic', icon:'🔰', rarity:'rare',
    desc:'Gain 5 shield at combat start.',              slot:'relic', element:'steel',   effect:'shieldstart' },
  // Epic
  { id:'abyss_eye',       name:'Eye of the Abyss',   type:'relic', icon:'👁️', rarity:'epic',
    desc:'10% chance to evade any attack.',             slot:'relic', element:'shadow',  effect:'evasion' },
  { id:'blood_pact',      name:'Blood Pact Stone',   type:'relic', icon:'🩸', rarity:'epic',
    desc:'+25% damage when below 30% HP.',              slot:'relic', element:'dark',    effect:'bloodpact' },
  { id:'arcane_heart',    name:'Arcane Heart',       type:'relic', icon:'💙', rarity:'epic',
    desc:'Restore 6 MP per turn. +15 max MP.',          slot:'relic', element:'psychic', bonuses:{maxMp:15}, effect:'mpregen2' },
  // Legendary
  { id:'void_core',       name:'Void Core',          type:'relic', icon:'🌀', rarity:'legendary',
    desc:'+20 ATK, +10 DEF. 15% evasion.',              slot:'relic', element:'shadow',  bonuses:{atk:20,def:10}, effect:'evasion2' },
  { id:'reapers_sigil',   name:"Reaper's Sigil",     type:'relic', icon:'☠️', rarity:'legendary',
    desc:'+30% crit dmg. Death Mark executes at 40% HP.', slot:'relic', element:'dark',  bonuses:{critDmg:30}, effect:'reaper' },
  // Mythical
  { id:'infinity_stone',  name:'Infinity Shard',     type:'relic', icon:'💠', rarity:'mythical',
    desc:'+30 ATK, +20 DEF, +20% crit dmg, 15% evasion.', slot:'relic', element:'psychic', bonuses:{atk:30,def:20,critDmg:20}, effect:'evasion2' },
  { id:'soul_crown',      name:'Soul Crown',         type:'relic', icon:'👑', rarity:'mythical',
    desc:'Restore 10 MP/turn, +40 max MP. Lifesteal on all abilities.', slot:'relic', element:'ghost', bonuses:{maxMp:40}, effect:'soulcrown' },
  // Divine
  { id:'divine_mantle',   name:'Divine Mantle',      type:'relic', icon:'✨', rarity:'divine',
    desc:'+40 ATK, +30 DEF, 20% evasion, all skills cost 20% less MP.', slot:'relic', element:'fairy', bonuses:{atk:40,def:30}, effect:'divinemantle_evasion2' },
  { id:'heart_of_abyss',  name:'Heart of the Abyss', type:'relic', icon:'🌠', rarity:'divine',
    desc:'Restore 15 MP/turn, +30% all damage, +50 max HP.', slot:'relic', element:'shadow', bonuses:{maxHp:50}, effect:'heartofabyss' },

  // ══════════════════════════════════════════════════════════════
  // WEAPONS — NEW (33 items to reach 60 total)
  // ══════════════════════════════════════════════════════════════

  // ── Common ×3 ────────────────────────────────────────────────
  { id:'cracked_club',      name:'Cracked Club',        type:'weapon', icon:'🪵', rarity:'common',
    desc:'+5 ATK.',                                        slot:'weapon', element:'fighting', bonuses:{atk:5} },
  { id:'apprentice_wand',   name:"Apprentice's Wand",   type:'weapon', icon:'🪄', rarity:'common',
    desc:'+3 ATK, +8 max MP.',                             slot:'weapon', element:'psychic',  bonuses:{atk:3,maxMp:8} },
  { id:'stone_knife',       name:'Stone Knife',          type:'weapon', icon:'🗡️', rarity:'common',
    desc:'+4 ATK, +3 SPD.',                                slot:'weapon', element:'rock',     bonuses:{atk:4,spd:3} },

  // ── Uncommon ×3 ──────────────────────────────────────────────
  { id:'ember_rod',         name:'Ember Rod',            type:'weapon', icon:'🔥', rarity:'uncommon',
    desc:'+7 ATK, +8 max MP. Fire element.',               slot:'weapon', element:'fire',     bonuses:{atk:7,maxMp:8} },
  { id:'ground_maul',       name:'Ground Maul',          type:'weapon', icon:'🌍', rarity:'uncommon',
    desc:'+10 ATK, +2 DEF. Ground element.',               slot:'weapon', element:'ground',   bonuses:{atk:10,def:2} },
  { id:'poison_dagger',     name:'Poison Dagger',        type:'weapon', icon:'🐍', rarity:'uncommon',
    desc:'+6 ATK, +6 CRIT. Venom on hit.',                 slot:'weapon', element:'poison',   bonuses:{atk:6,crit:6}, effect:'venom' },

  // ── Rare ×7 ──────────────────────────────────────────────────
  { id:'solar_staff',       name:'Solar Staff',          type:'weapon', icon:'☀️', rarity:'rare',
    desc:'+10 ATK, +12 max MP. Light element. Burnboost.', slot:'weapon', element:'light',    bonuses:{atk:10,maxMp:12}, effect:'burnboost' },
  { id:'cursed_blade',      name:'Cursed Blade',         type:'weapon', icon:'🩶', rarity:'rare',
    desc:'+13 ATK, +6 CRIT. Dark element.',                slot:'weapon', element:'dark',     bonuses:{atk:13,crit:6} },
  { id:'crystal_wand',      name:'Crystal Wand',         type:'weapon', icon:'💎', rarity:'rare',
    desc:'+8 ATK, +18 max MP. Crystal element. Spellmaster.', slot:'weapon', element:'crystal', bonuses:{atk:8,maxMp:18}, effect:'spellmaster' },
  { id:'plasma_lance',      name:'Plasma Lance',         type:'weapon', icon:'💠', rarity:'rare',
    desc:'+14 ATK, +7 SPD. Plasma element.',               slot:'weapon', element:'electric', bonuses:{atk:14,spd:7} },
  { id:'blood_fang',        name:'Blood Fang',           type:'weapon', icon:'🩸', rarity:'rare',
    desc:'+11 ATK, +8 CRIT. 10% lifesteal.',               slot:'weapon', element:'dark',     bonuses:{atk:11,crit:8}, effect:'lifesteal' },
  { id:'gravity_rod',       name:'Gravity Rod',          type:'weapon', icon:'🌀', rarity:'rare',
    desc:'+9 ATK, +15 max MP. Piercing.',                  slot:'weapon', element:'psychic',  bonuses:{atk:9,maxMp:15}, effect:'piercing' },
  { id:'bog_scythe',        name:'Bog Scythe',           type:'weapon', icon:'🌿', rarity:'rare',
    desc:'+12 ATK, +5 SPD. Grass element. Venom on hit.',  slot:'weapon', element:'grass',    bonuses:{atk:12,spd:5}, effect:'venom' },

  // ── Epic ×7 ──────────────────────────────────────────────────
  { id:'runic_halberd',     name:'Runic Halberd',        type:'weapon', icon:'🔱', rarity:'epic',
    desc:'+22 ATK, +8 DEF. Piercing. Grants: Fortify.',    slot:'weapon', element:'steel',    bonuses:{atk:22,def:8}, effect:'piercing', grantAbilities:['fortify'] },
  { id:'time_crook',        name:'Time Crook',           type:'weapon', icon:'⏳', rarity:'epic',
    desc:'+16 ATK, +25 max MP. Spellmaster. Grants: Astral Veil.', slot:'weapon', element:'ghost', bonuses:{atk:16,maxMp:25}, effect:'spellmaster', grantAbilities:['astral_veil'] },
  { id:'plague_staff',      name:'Plague Staff',         type:'weapon', icon:'🧪', rarity:'epic',
    desc:'+14 ATK, +20 max MP. Venom. Grants: Plague Nova.', slot:'weapon', element:'poison', bonuses:{atk:14,maxMp:20}, effect:'venom', grantAbilities:['plague_nova'] },
  { id:'magma_crusher',     name:'Magma Crusher',        type:'weapon', icon:'🌋', rarity:'epic',
    desc:'+24 ATK. Burnboost++. Grants: Cinder Storm.',    slot:'weapon', element:'fire',     bonuses:{atk:24}, effect:'burnboost2', grantAbilities:['cinder_storm'] },
  { id:'cosmic_staff',      name:'Cosmic Staff',         type:'weapon', icon:'🌠', rarity:'epic',
    desc:'+18 ATK, +30 max MP. Spellmaster. Grants: Cosmic Collapse.', slot:'weapon', element:'dragon', bonuses:{atk:18,maxMp:30}, effect:'spellmaster', grantAbilities:['cosmic_collapse'] },
  { id:'slime_blade',       name:'Slime Blade',          type:'weapon', icon:'💚', rarity:'epic',
    desc:'+17 ATK, +10 CRIT. Venom + Piercing.',           slot:'weapon', element:'poison',   bonuses:{atk:17,crit:10}, effect:'venom_piercing' },
  { id:'ghost_scythe',      name:'Ghost Scythe',         type:'weapon', icon:'👻', rarity:'epic',
    desc:'+20 ATK, +15 max MP. Lifesteal. Grants: Soul Shatter.', slot:'weapon', element:'ghost', bonuses:{atk:20,maxMp:15}, effect:'lifesteal', grantAbilities:['soul_shatter'] },

  // ── Legendary ×6 ─────────────────────────────────────────────
  { id:'thundergod_spear',  name:"Thundergod's Spear",   type:'weapon', icon:'⚡', rarity:'legendary',
    desc:'+30 ATK, +15 CRIT, +10 SPD. Piercing. Grants: Thunderclap + Void Shred.', slot:'weapon', element:'electric', bonuses:{atk:30,crit:15,spd:10}, effect:'piercing', grantAbilities:['thunderclap','void_shred'] },
  { id:'sunfire_blade',     name:'Sunfire Blade',        type:'weapon', icon:'☀️', rarity:'legendary',
    desc:'+28 ATK, +20 max MP. Burnboost. Grants: Solar Flare + Cinder Storm.', slot:'weapon', element:'fire', bonuses:{atk:28,maxMp:20}, effect:'burnboost', grantAbilities:['solar_flare','cinder_storm'] },
  { id:'plague_reaper',     name:'Plague Reaper',        type:'weapon', icon:'☠️', rarity:'legendary',
    desc:'+26 ATK, +15 CRIT. Venom + Piercing. Grants: Plague Nova + Death Mark.', slot:'weapon', element:'poison', bonuses:{atk:26,crit:15}, effect:'venom_piercing', grantAbilities:['plague_nova','death_mark'] },
  { id:'time_blade',        name:'Time Blade',           type:'weapon', icon:'⏳', rarity:'legendary',
    desc:'+25 ATK, +30 max MP, +12 SPD. Spellmaster. Grants: Phantom Step + Astral Veil.', slot:'weapon', element:'ghost', bonuses:{atk:25,maxMp:30,spd:12}, effect:'spellmaster', grantAbilities:['phantom_step','astral_veil'] },
  { id:'gravity_lance',     name:'Gravity Lance',        type:'weapon', icon:'🌀', rarity:'legendary',
    desc:'+27 ATK, +20 max MP. Piercing. Grants: Void Shred + Soul Shatter.', slot:'weapon', element:'shadow', bonuses:{atk:27,maxMp:20}, effect:'piercing', grantAbilities:['void_shred','soul_shatter'] },
  { id:'blood_reaver',      name:'Blood Reaver',         type:'weapon', icon:'🩸', rarity:'legendary',
    desc:'+32 ATK, +18 CRIT. Lifesteal + Piercing. Grants: Night Blade + Void Shred.', slot:'weapon', element:'dark', bonuses:{atk:32,crit:18}, effect:'lifesteal_piercing', grantAbilities:['night_blade','void_shred'] },

  // ── Mythical ×5 ──────────────────────────────────────────────
  { id:'plasma_cannon',     name:'Plasma Cannon',        type:'weapon', icon:'🔆', rarity:'mythical',
    desc:'+38 ATK, +20 max MP, +15 CRIT. Burnboost++ + Spellmaster. Grants: Solar Flare + Cinder Storm.', slot:'weapon', element:'fire', bonuses:{atk:38,maxMp:20,crit:15}, effect:'burnboost2_spellmaster', grantAbilities:['solar_flare','cinder_storm'] },
  { id:'cosmic_edge',       name:'Cosmic Edge',          type:'weapon', icon:'🌌', rarity:'mythical',
    desc:'+42 ATK, +25 max MP. Piercing + Lifesteal. Grants: Cosmic Collapse + Reality Rip.', slot:'weapon', element:'dragon', bonuses:{atk:42,maxMp:25}, effect:'piercing_lifesteal', grantAbilities:['cosmic_collapse','reality_rip'] },
  { id:'death_scepter',     name:'Death Scepter',        type:'weapon', icon:'💀', rarity:'mythical',
    desc:'+36 ATK, +18 CRIT, +20 max MP. Lifesteal + Burnboost++. Grants: Death Mark + Void Rupture.', slot:'weapon', element:'dark', bonuses:{atk:36,crit:18,maxMp:20}, effect:'lifesteal_burnboost2', grantAbilities:['death_mark','void_rupture'] },
  { id:'tidal_trident',     name:'Tidal Trident',        type:'weapon', icon:'🔱', rarity:'mythical',
    desc:'+40 ATK, +12 SPD, +15 DEF. Lifesteal + Piercing. Grants: Night Blade + Phantom Step.', slot:'weapon', element:'water', bonuses:{atk:40,spd:12,def:15}, effect:'lifesteal_piercing', grantAbilities:['night_blade','phantom_step'] },
  { id:'gravity_colossus',  name:'Gravity Colossus',     type:'weapon', icon:'⚫', rarity:'mythical',
    desc:'+45 ATK, +20 DEF. Piercing. Grants: Cosmic Collapse + Soul Shatter + Void Shred.', slot:'weapon', element:'ground', bonuses:{atk:45,def:20}, effect:'piercing', grantAbilities:['cosmic_collapse','soul_shatter','void_shred'] },

  // ── Divine ×2 ────────────────────────────────────────────────
  { id:'void_genesis',      name:'Void Genesis',         type:'weapon', icon:'🕳️', rarity:'divine',
    desc:'+55 ATK, +30 max MP, +20 CRIT. Piercing + Lifesteal + Spellmaster. Grants: Void Rupture + Reality Rip + Abyss Gaze.', slot:'weapon', element:'shadow', bonuses:{atk:55,maxMp:30,crit:20}, effect:'piercing_lifesteal_spellmaster', grantAbilities:['void_rupture','reality_rip','abyss_gaze'] },
  { id:'divine_arbiter',    name:'Divine Arbiter',       type:'weapon', icon:'⚜️', rarity:'divine',
    desc:'+52 ATK, +35 CRIT, +25 SPD. Piercing + Burnboost. Grants: Divine Lance + Solar Flare + Martyrs Wrath.', slot:'weapon', element:'fairy', bonuses:{atk:52,crit:35,spd:25}, effect:'piercing_burnboost', grantAbilities:['divine_lance','solar_flare','martyrs_wrath'] },

  // ══════════════════════════════════════════════════════════════
  // ARMOR — NEW (39 items to reach 60 total)
  // ══════════════════════════════════════════════════════════════

  // ── Common ×3 ────────────────────────────────────────────────
  { id:'rough_hide',        name:'Rough Hide',           type:'armor', icon:'🥾', rarity:'common',
    desc:'+3 DEF, +5 max HP.',                             slot:'armor', element:'normal',   bonuses:{def:3,maxHp:5} },
  { id:'cloth_robe',        name:'Cloth Robe',           type:'armor', icon:'👘', rarity:'common',
    desc:'+2 DEF, +10 max MP.',                            slot:'armor', element:'psychic',  bonuses:{def:2,maxMp:10} },
  { id:'scrap_plating',     name:'Scrap Plating',        type:'armor', icon:'🔩', rarity:'common',
    desc:'+4 DEF.',                                        slot:'armor', element:'steel',    bonuses:{def:4} },

  // ── Uncommon ×6 ──────────────────────────────────────────────
  { id:'fire_shroud',       name:'Fire Shroud',          type:'armor', icon:'🔥', rarity:'uncommon',
    desc:'+5 DEF, +8 max HP. Fire element.',               slot:'armor', element:'fire',     bonuses:{def:5,maxHp:8} },
  { id:'frost_mantle',      name:'Frost Mantle',         type:'armor', icon:'❄️', rarity:'uncommon',
    desc:'+6 DEF, +12 max MP. Ice element.',               slot:'armor', element:'ice',      bonuses:{def:6,maxMp:12} },
  { id:'wind_silk',         name:'Wind Silk',            type:'armor', icon:'🌬️', rarity:'uncommon',
    desc:'+4 DEF, +6 SPD. Wind element.',                  slot:'armor', element:'wind',     bonuses:{def:4,spd:6} },
  { id:'poison_wrap',       name:'Poison Wrap',          type:'armor', icon:'🐍', rarity:'uncommon',
    desc:'+5 DEF, +8 max HP, +3 SPD. Poison element.',    slot:'armor', element:'poison',   bonuses:{def:5,maxHp:8,spd:3} },
  { id:'blood_wrap',        name:'Blood Wrap',           type:'armor', icon:'🩸', rarity:'uncommon',
    desc:'+5 DEF, +15 max HP. Dark element.',              slot:'armor', element:'dark',     bonuses:{def:5,maxHp:15} },
  { id:'storm_coat',        name:'Storm Coat',           type:'armor', icon:'⛈️', rarity:'uncommon',
    desc:'+5 DEF, +5 SPD, +5 max MP. Electric element.',  slot:'armor', element:'electric', bonuses:{def:5,spd:5,maxMp:5} },

  // ── Rare ×8 ──────────────────────────────────────────────────
  { id:'crystal_plate',     name:'Crystal Plate',        type:'armor', icon:'💎', rarity:'rare',
    desc:'+13 DEF, +15 max HP. Crystal element.',          slot:'armor', element:'psychic',  bonuses:{def:13,maxHp:15} },
  { id:'rune_mantle',       name:'Rune Mantle',          type:'armor', icon:'🔱', rarity:'rare',
    desc:'+10 DEF, +20 max MP. Rune element. MP regen.',   slot:'armor', element:'psychic',  bonuses:{def:10,maxMp:20}, effect:'mpregen' },
  { id:'magma_coat',        name:'Magma Coat',           type:'armor', icon:'🌋', rarity:'rare',
    desc:'+11 DEF, +20 max HP. Magma element.',            slot:'armor', element:'fire',     bonuses:{def:11,maxHp:20} },
  { id:'gravity_wrap',      name:'Gravity Wrap',         type:'armor', icon:'🌀', rarity:'rare',
    desc:'+12 DEF, +25 max HP. Block.',                    slot:'armor', element:'ground',   bonuses:{def:12,maxHp:25}, effect:'block' },
  { id:'cosmic_robe',       name:'Cosmic Robe',          type:'armor', icon:'🌌', rarity:'rare',
    desc:'+8 DEF, +30 max MP, +12 max HP. Dragon element.',slot:'armor', element:'dragon',   bonuses:{def:8,maxMp:30,maxHp:12} },
  { id:'slime_hide',        name:'Slime Hide',           type:'armor', icon:'💚', rarity:'rare',
    desc:'+10 DEF, +25 max HP. HP regen.',                 slot:'armor', element:'poison',   bonuses:{def:10,maxHp:25}, effect:'hpregen' },
  { id:'dragon_scales',     name:'Dragon Scales',        type:'armor', icon:'🐉', rarity:'rare',
    desc:'+15 DEF, +20 max HP. Dragon element.',           slot:'armor', element:'dragon',   bonuses:{def:15,maxHp:20} },
  { id:'electric_mesh',     name:'Electric Mesh',        type:'armor', icon:'⚡', rarity:'rare',
    desc:'+9 DEF, +8 SPD, +15 max MP. Electric element.',  slot:'armor', element:'electric', bonuses:{def:9,spd:8,maxMp:15} },

  // ── Epic ×8 ──────────────────────────────────────────────────
  { id:'void_plate',        name:'Void Plate',           type:'armor', icon:'🌑', rarity:'epic',
    desc:'+18 DEF, +25 max HP, +25 max MP. Shadow element.', slot:'armor', element:'shadow', bonuses:{def:18,maxHp:25,maxMp:25} },
  { id:'blood_iron',        name:'Blood Iron',           type:'armor', icon:'🩸', rarity:'epic',
    desc:'+20 DEF, +45 max HP. Dark element. HP regen.',   slot:'armor', element:'dark',     bonuses:{def:20,maxHp:45}, effect:'hpregen' },
  { id:'rune_armor',        name:'Rune Armor',           type:'armor', icon:'🔱', rarity:'epic',
    desc:'+22 DEF, +40 max HP. Block.',                    slot:'armor', element:'steel',    bonuses:{def:22,maxHp:40}, effect:'block' },
  { id:'plague_shroud',     name:'Plague Shroud',        type:'armor', icon:'☠️', rarity:'epic',
    desc:'+15 DEF, +20 max HP, +15 max MP. Poison element. Venom on attacks.', slot:'armor', element:'poison', bonuses:{def:15,maxHp:20,maxMp:15}, effect:'venom' },
  { id:'thunder_mail',      name:'Thunder Mail',         type:'armor', icon:'⚡', rarity:'epic',
    desc:'+18 DEF, +20 max HP, +10 SPD. Electric element.',slot:'armor', element:'electric', bonuses:{def:18,maxHp:20,spd:10} },
  { id:'time_robe',         name:'Time Robe',            type:'armor', icon:'⏳', rarity:'epic',
    desc:'+14 DEF, +20 max HP, +40 max MP, +8 SPD. Ghost element.', slot:'armor', element:'ghost', bonuses:{def:14,maxHp:20,maxMp:40,spd:8} },
  { id:'solar_plate',       name:'Solar Plate',          type:'armor', icon:'☀️', rarity:'epic',
    desc:'+20 DEF, +35 max HP. Light element. Evasion.',   slot:'armor', element:'fairy',    bonuses:{def:20,maxHp:35}, effect:'evasion' },
  { id:'frost_carapace',    name:'Frost Carapace',       type:'armor', icon:'❄️', rarity:'epic',
    desc:'+17 DEF, +30 max HP, +30 max MP. Ice element.',  slot:'armor', element:'ice',      bonuses:{def:17,maxHp:30,maxMp:30} },

  // ── Legendary ×7 ─────────────────────────────────────────────
  { id:'titan_robe',        name:"Titan's Robe",         type:'armor', icon:'🗿', rarity:'legendary',
    desc:'+22 DEF, +40 max HP, +60 max MP, +10 SPD. Rock element.',   slot:'armor', element:'rock',    bonuses:{def:22,maxHp:40,maxMp:60,spd:10} },
  { id:'blood_shroud',      name:'Blood Shroud',         type:'armor', icon:'🩸', rarity:'legendary',
    desc:'+28 DEF, +70 max HP. Dark element. Lifesteal + HP regen.',  slot:'armor', element:'dark',    bonuses:{def:28,maxHp:70}, effect:'lifesteal_hpregen' },
  { id:'storm_plate',       name:'Storm Plate',          type:'armor', icon:'⛈️', rarity:'legendary',
    desc:'+25 DEF, +40 max HP, +20 SPD. Electric element. Evasion.',  slot:'armor', element:'electric',bonuses:{def:25,maxHp:40,spd:20}, effect:'evasion' },
  { id:'cosmic_mantle',     name:'Cosmic Mantle',        type:'armor', icon:'🌌', rarity:'legendary',
    desc:'+20 DEF, +35 max HP, +70 max MP, +12 SPD. Dragon element. Spellmaster.', slot:'armor', element:'dragon', bonuses:{def:20,maxHp:35,maxMp:70,spd:12}, effect:'spellmaster' },
  { id:'plague_carapace',   name:'Plague Carapace',      type:'armor', icon:'☠️', rarity:'legendary',
    desc:'+24 DEF, +55 max HP. Poison element. HP regen + Evasion.',  slot:'armor', element:'poison',  bonuses:{def:24,maxHp:55}, effect:'hpregen_evasion' },
  { id:'rune_plate',        name:'Rune Plate',           type:'armor', icon:'🔱', rarity:'legendary',
    desc:'+30 DEF, +50 max HP, +30 max MP. Block + MP regen.',         slot:'armor', element:'steel',   bonuses:{def:30,maxHp:50,maxMp:30}, effect:'block_mpregen' },
  { id:'frost_sovereign',   name:'Frost Sovereign',      type:'armor', icon:'❄️', rarity:'legendary',
    desc:'+26 DEF, +45 max HP, +50 max MP, +15 SPD. Ice element.',     slot:'armor', element:'ice',     bonuses:{def:26,maxHp:45,maxMp:50,spd:15} },

  // ── Mythical ×5 ──────────────────────────────────────────────
  { id:'solar_aegis',       name:'Solar Aegis',          type:'armor', icon:'☀️', rarity:'mythical',
    desc:'+38 DEF, +70 max HP, +20 SPD. Light element. Evasion + Block.', slot:'armor', element:'fairy', bonuses:{def:38,maxHp:70,spd:20}, effect:'evasion_block' },
  { id:'abyssal_hide',      name:'Abyssal Hide',         type:'armor', icon:'👁️', rarity:'mythical',
    desc:'+35 DEF, +80 max HP, +50 max MP. Shadow element. Evasion.',     slot:'armor', element:'shadow', bonuses:{def:35,maxHp:80,maxMp:50}, effect:'evasion2' },
  { id:'time_weave',        name:'Time Weave',           type:'armor', icon:'⏳', rarity:'mythical',
    desc:'+30 DEF, +60 max HP, +80 max MP, +20 SPD. Ghost element. Spellmaster.', slot:'armor', element:'ghost', bonuses:{def:30,maxHp:60,maxMp:80,spd:20}, effect:'spellmaster' },
  { id:'void_carapace',     name:'Void Carapace',        type:'armor', icon:'🕳️', rarity:'mythical',
    desc:'+42 DEF, +90 max HP. Shadow element. Block + HP regen.',         slot:'armor', element:'shadow', bonuses:{def:42,maxHp:90}, effect:'block_hpregen' },
  { id:'blood_titan',       name:'Blood Titan',          type:'armor', icon:'🩸', rarity:'mythical',
    desc:'+40 DEF, +100 max HP, +15 SPD. Dark element. Lifesteal + HP regen.', slot:'armor', element:'dark', bonuses:{def:40,maxHp:100,spd:15}, effect:'lifesteal_hpregen' },

  // ── Divine ×2 ────────────────────────────────────────────────
  { id:'genesis_plate',     name:'Genesis Plate',        type:'armor', icon:'🌟', rarity:'divine',
    desc:'+60 DEF, +120 max HP, +20 SPD. Evasion + Block + HP regen.',  slot:'armor', element:'fairy',  bonuses:{def:60,maxHp:120,spd:20}, effect:'evasion2_block_hpregen' },
  { id:'eternity_shroud',   name:'Eternity Shroud',      type:'armor', icon:'🌠', rarity:'divine',
    desc:'+50 DEF, +80 max HP, +100 max MP, +25 SPD. Dragon element. Spellmaster + Evasion.', slot:'armor', element:'dragon', bonuses:{def:50,maxHp:80,maxMp:100,spd:25}, effect:'spellmaster_evasion2' },

  // ══════════════════════════════════════════════════════════════
  // RELICS — NEW (38 items to reach 60 total)
  // ══════════════════════════════════════════════════════════════

  // ── Common ×3 ────────────────────────────────────────────────
  { id:'lucky_coin',        name:'Lucky Coin',           type:'relic', icon:'🪙', rarity:'common',
    desc:'+2 to all stats.',                               slot:'relic', element:'normal',   bonuses:{atk:2,def:2,spd:2} },
  { id:'ember_charm',       name:'Ember Charm',          type:'relic', icon:'🔥', rarity:'common',
    desc:'+3 ATK. Fire element.',                          slot:'relic', element:'fire',     bonuses:{atk:3} },
  { id:'iron_ring',         name:'Iron Ring',            type:'relic', icon:'💍', rarity:'common',
    desc:'+4 DEF.',                                        slot:'relic', element:'steel',    bonuses:{def:4} },

  // ── Uncommon ×4 ──────────────────────────────────────────────
  { id:'tide_ring',         name:'Tide Ring',            type:'relic', icon:'🌊', rarity:'uncommon',
    desc:'+5 DEF, +10 max MP. Water element.',             slot:'relic', element:'water',    bonuses:{def:5,maxMp:10} },
  { id:'wind_bead',         name:'Wind Bead',            type:'relic', icon:'🌬️', rarity:'uncommon',
    desc:'+5 SPD, +5 CRIT.',                               slot:'relic', element:'wind',     bonuses:{spd:5,crit:5} },
  { id:'shadow_token',      name:'Shadow Token',         type:'relic', icon:'🌑', rarity:'uncommon',
    desc:'+6 ATK, +4 CRIT. Shadow element.',               slot:'relic', element:'shadow',   bonuses:{atk:6,crit:4} },
  { id:'blood_bead',        name:'Blood Bead',           type:'relic', icon:'🩸', rarity:'uncommon',
    desc:'+8 ATK, +5 max HP. Dark element.',               slot:'relic', element:'dark',     bonuses:{atk:8,maxHp:5} },

  // ── Rare ×8 ──────────────────────────────────────────────────
  { id:'time_shard',        name:'Time Shard',           type:'relic', icon:'⏳', rarity:'rare',
    desc:'+8 SPD, +8 CRIT.',                               slot:'relic', element:'ghost',    bonuses:{spd:8,crit:8} },
  { id:'gravity_orb',       name:'Gravity Orb',          type:'relic', icon:'🌀', rarity:'rare',
    desc:'+10 DEF, +15 max HP. Block.',                    slot:'relic', element:'ground',   bonuses:{def:10,maxHp:15}, effect:'block' },
  { id:'plague_token',      name:'Plague Token',         type:'relic', icon:'☠️', rarity:'rare',
    desc:'+8 ATK, +6 CRIT. Poison element. Venom on attacks.', slot:'relic', element:'poison', bonuses:{atk:8,crit:6}, effect:'venom' },
  { id:'rune_stone',        name:'Rune Stone',           type:'relic', icon:'🔱', rarity:'rare',
    desc:'+6 ATK, +8 DEF. Burnboost.',                     slot:'relic', element:'steel',    bonuses:{atk:6,def:8}, effect:'burnboost' },
  { id:'crystal_eye',       name:'Crystal Eye',          type:'relic', icon:'💎', rarity:'rare',
    desc:'+10 CRIT, +5 SPD. Crystal element.',             slot:'relic', element:'psychic',  bonuses:{crit:10,spd:5} },
  { id:'cosmic_seed',       name:'Cosmic Seed',          type:'relic', icon:'🌌', rarity:'rare',
    desc:'+8 ATK, +10 max MP. MP regen.',                  slot:'relic', element:'dragon',   bonuses:{atk:8,maxMp:10}, effect:'mpregen' },
  { id:'blood_ring',        name:'Blood Ring',           type:'relic', icon:'❤️', rarity:'rare',
    desc:'+10 ATK, +10% crit dmg. Dark element. Lifesteal.', slot:'relic', element:'dark',  bonuses:{atk:10,critDmg:10}, effect:'lifesteal' },
  { id:'solar_amulet',      name:'Solar Amulet',         type:'relic', icon:'☀️', rarity:'rare',
    desc:'+8 ATK, +12 max MP. Light element. Burnboost.',  slot:'relic', element:'fairy',    bonuses:{atk:8,maxMp:12}, effect:'burnboost' },

  // ── Epic ×7 ──────────────────────────────────────────────────
  { id:'void_fragment',     name:'Void Fragment',        type:'relic', icon:'🕳️', rarity:'epic',
    desc:'+15 ATK, +12 DEF. Shadow element. Evasion.',     slot:'relic', element:'shadow',   bonuses:{atk:15,def:12}, effect:'evasion' },
  { id:'dragon_heart',      name:'Dragon Heart',         type:'relic', icon:'🐉', rarity:'epic',
    desc:'+20 ATK, +20 max HP. Dragon element.',           slot:'relic', element:'dragon',   bonuses:{atk:20,maxHp:20} },
  { id:'time_pendant',      name:'Time Pendant',         type:'relic', icon:'⏳', rarity:'epic',
    desc:'+10 SPD, +12 CRIT. Ghost element.',              slot:'relic', element:'ghost',    bonuses:{spd:10,crit:12} },
  { id:'plasma_core',       name:'Plasma Core',          type:'relic', icon:'⚡', rarity:'epic',
    desc:'+18 ATK, +8 CRIT. Electric element. Burnboost++.', slot:'relic', element:'electric', bonuses:{atk:18,crit:8}, effect:'burnboost2' },
  { id:'rune_heart',        name:'Rune Heart',           type:'relic', icon:'🔱', rarity:'epic',
    desc:'+12 ATK, +12 DEF, +15 max MP. Burnboost + MP regen.', slot:'relic', element:'steel', bonuses:{atk:12,def:12,maxMp:15}, effect:'burnboost_mpregen' },
  { id:'gravity_heart',     name:'Gravity Heart',        type:'relic', icon:'🌀', rarity:'epic',
    desc:'+15 DEF, +30 max HP. Ground element. Block + Shield start.', slot:'relic', element:'ground', bonuses:{def:15,maxHp:30}, effect:'block_shieldstart' },
  { id:'slime_core',        name:'Slime Core',           type:'relic', icon:'💚', rarity:'epic',
    desc:'+10 ATK, +10 DEF, +10 SPD. Poison element. Venom on attacks.', slot:'relic', element:'poison', bonuses:{atk:10,def:10,spd:10}, effect:'venom' },

  // ── Legendary ×7 ─────────────────────────────────────────────
  { id:'cosmic_core',       name:'Cosmic Core',          type:'relic', icon:'🌠', rarity:'legendary',
    desc:'+25 ATK, +25 DEF. Dragon element. Evasion + Spellmaster.',       slot:'relic', element:'dragon',  bonuses:{atk:25,def:25}, effect:'evasion_spellmaster' },
  { id:'dragon_scale_relic',name:"Dragon's Scale",       type:'relic', icon:'🐉', rarity:'legendary',
    desc:'+30 ATK, +20 DEF. Dragon element. Burnboost + Lifesteal.',       slot:'relic', element:'dragon',  bonuses:{atk:30,def:20}, effect:'burnboost_lifesteal' },
  { id:'void_eye',          name:'Void Eye',             type:'relic', icon:'👁️', rarity:'legendary',
    desc:'+25 ATK, +15 DEF, +15% crit dmg. Shadow element. 15% evasion.', slot:'relic', element:'shadow',  bonuses:{atk:25,def:15,critDmg:15}, effect:'evasion2' },
  { id:'solar_core',        name:'Solar Core',           type:'relic', icon:'☀️', rarity:'legendary',
    desc:'+20 ATK, +30 max MP. Light element. Burnboost++ + Spellmaster.', slot:'relic', element:'fairy',   bonuses:{atk:20,maxMp:30}, effect:'burnboost2_spellmaster' },
  { id:'blood_covenant',    name:'Blood Covenant',       type:'relic', icon:'🩸', rarity:'legendary',
    desc:'+28 ATK, +20 max HP. Dark element. Lifesteal + Evasion.',        slot:'relic', element:'dark',    bonuses:{atk:28,maxHp:20}, effect:'lifesteal_evasion' },
  { id:'time_heart',        name:'Time Heart',           type:'relic', icon:'⏳', rarity:'legendary',
    desc:'+15 SPD, +20 CRIT, +20 ATK. Ghost element. Spellmaster.',        slot:'relic', element:'ghost',   bonuses:{spd:15,crit:20,atk:20}, effect:'spellmaster' },
  { id:'plague_crown',      name:'Plague Crown',         type:'relic', icon:'☠️', rarity:'legendary',
    desc:'+22 ATK, +15 CRIT. Poison element. Venom + Burnboost.',          slot:'relic', element:'poison',  bonuses:{atk:22,crit:15}, effect:'venom_burnboost' },

  // ── Mythical ×7 ──────────────────────────────────────────────
  { id:'abyssal_eye',       name:'Abyssal Eye',          type:'relic', icon:'👁️', rarity:'mythical',
    desc:'+35 ATK, +25 DEF, +25% crit dmg. Shadow element. 15% evasion + Lifesteal.', slot:'relic', element:'shadow', bonuses:{atk:35,def:25,critDmg:25}, effect:'evasion2_lifesteal' },
  { id:'cosmic_heart',      name:'Cosmic Heart',         type:'relic', icon:'🌌', rarity:'mythical',
    desc:'+30 ATK, +25 DEF, +40 max MP. Dragon element. Spellmaster + Evasion.',      slot:'relic', element:'dragon', bonuses:{atk:30,def:25,maxMp:40}, effect:'spellmaster_evasion' },
  { id:'dragon_soul',       name:'Dragon Soul',          type:'relic', icon:'🐉', rarity:'mythical',
    desc:'+40 ATK, +30 DEF. Dragon element. Burnboost++ + Lifesteal + Evasion.',      slot:'relic', element:'dragon', bonuses:{atk:40,def:30}, effect:'burnboost2_lifesteal_evasion' },
  { id:'void_sovereign',    name:'Void Sovereign',       type:'relic', icon:'🕳️', rarity:'mythical',
    desc:'+38 ATK, +25 DEF, +20% crit dmg. Shadow element. Evasion + Spellmaster.',   slot:'relic', element:'shadow', bonuses:{atk:38,def:25,critDmg:20}, effect:'evasion2_spellmaster' },
  { id:'time_sovereign',    name:'Time Sovereign',       type:'relic', icon:'⌛', rarity:'mythical',
    desc:'+25 SPD, +30 CRIT, +30 ATK. Ghost element. Spellmaster + Evasion.',          slot:'relic', element:'ghost',  bonuses:{spd:25,crit:30,atk:30}, effect:'spellmaster_evasion2' },
  { id:'solar_sovereign',   name:'Solar Sovereign',      type:'relic', icon:'🌞', rarity:'mythical',
    desc:'+35 ATK, +35 max MP, +15% crit dmg. Light element. Burnboost++ + Spellmaster.', slot:'relic', element:'fairy', bonuses:{atk:35,maxMp:35,critDmg:15}, effect:'burnboost2_spellmaster' },
  { id:'blood_sovereign',   name:'Blood Sovereign',      type:'relic', icon:'🫀', rarity:'mythical',
    desc:'+40 ATK, +40 max HP, +20 CRIT. Dark element. Lifesteal + Evasion + HP regen.', slot:'relic', element:'dark', bonuses:{atk:40,maxHp:40,crit:20}, effect:'lifesteal_evasion2_hpregen' },

  // ── Divine ×2 ────────────────────────────────────────────────
  { id:'eternity_core',     name:'Eternity Core',        type:'relic', icon:'💫', rarity:'divine',
    desc:'+50 ATK, +40 DEF, +30% crit dmg, +30 max MP. Burnboost++ + Spellmaster + 20% evasion.', slot:'relic', element:'dragon', bonuses:{atk:50,def:40,critDmg:30,maxMp:30}, effect:'burnboost2_spellmaster_evasion2' },
  { id:'genesis_soul',      name:'Genesis Soul',         type:'relic', icon:'🔮', rarity:'divine',
    desc:'+45 ATK, +35 DEF, +50 max HP, +25% crit dmg. Shadow element. Lifesteal + Evasion + Spellmaster + HP regen.', slot:'relic', element:'shadow', bonuses:{atk:45,def:35,maxHp:50,critDmg:25}, effect:'lifesteal_evasion2_spellmaster_hpregen' },
];

// ── Permanent gear unlocked by defeating the Floor 50 Final Boss ──
const CONQUEST_GEAR = [
  { id:'abyssal_crown',   name:'Crown of the Abyss', type:'relic', icon:'👁️', rarity:'divine',
    desc:'PERMANENT. +60 ATK, +40 DEF, 25% evasion, Lifesteal, Spellmaster. Marks you as Conqueror.',
    slot:'relic', element:'shadow', bonuses:{atk:60,def:40,critDmg:40}, effect:'evasion2_lifesteal_spellmaster', permanent:true },
];

function cloneItem(item) { return { ...item }; }

function getRandomItem(rarity) {
  const pool = ITEM_POOL.filter(i => i.rarity === rarity);
  if (!pool.length) return cloneItem(ITEM_POOL[0]);
  return cloneItem(pool[Math.floor(Math.random() * pool.length)]);
}

function getRandomItemByFloor(floor) {
  const roll = Math.floor(Math.random() * 100);
  // Check loot purge upgrades
  const b = (typeof getShardShopBonuses === 'function') ? getShardShopBonuses() : {};
  const noCommon   = !!b.purgeCommon;
  const noUncommon = !!b.purgeUncommon;
  const noRare     = !!b.purgeRare;
  // Helper: resolve fallback rarity based on purge flags
  function lowestAllowed() {
    if (!noRare)     return 'rare';
    if (!noUncommon) return 'uncommon'; // shouldn't happen (rare requires uncommon purged first) but safe
    return 'epic';
  }
  function resolve(rarity) {
    if (rarity === 'common'   && noCommon)   return resolve('uncommon');
    if (rarity === 'uncommon' && noUncommon) return resolve('rare');
    if (rarity === 'rare'     && noRare)     return resolve('epic');
    return rarity;
  }
  if (floor >= 40) {
    if (roll < 10) return getRandomItem('divine');
    if (roll < 25) return getRandomItem('mythical');
    if (roll < 50) return getRandomItem('legendary');
    if (roll < 75) return getRandomItem('epic');
    return getRandomItem(resolve('rare'));
  }
  if (floor >= 30) {
    if (roll < 5)  return getRandomItem('divine');
    if (roll < 18) return getRandomItem('mythical');
    if (roll < 40) return getRandomItem('legendary');
    if (roll < 65) return getRandomItem('epic');
    if (roll < 85) return getRandomItem(resolve('rare'));
    return getRandomItem(resolve('uncommon'));
  }
  if (floor >= 20) {
    if (roll < 8)  return getRandomItem('mythical');
    if (roll < 25) return getRandomItem('legendary');
    if (roll < 50) return getRandomItem('epic');
    if (roll < 75) return getRandomItem(resolve('rare'));
    return getRandomItem(resolve('uncommon'));
  }
  if (floor >= 14) {
    if (roll < 3)  return getRandomItem('mythical');
    if (roll < 15) return getRandomItem('legendary');
    if (roll < 40) return getRandomItem('epic');
    if (roll < 68) return getRandomItem(resolve('rare'));
    if (roll < 88) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (floor >= 7) {
    if (roll < 1)  return getRandomItem('divine');
    if (roll < 5)  return getRandomItem('mythical');
    if (roll < 15) return getRandomItem('legendary');
    if (roll < 38) return getRandomItem('epic');
    if (roll < 65) return getRandomItem(resolve('rare'));
    if (roll < 88) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (floor >= 6) {
    if (roll < 3)  return getRandomItem('legendary');
    if (roll < 15) return getRandomItem('epic');
    if (roll < 45) return getRandomItem(resolve('rare'));
    if (roll < 75) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (floor >= 5) {
    if (roll < 8)  return getRandomItem('epic');
    if (roll < 30) return getRandomItem(resolve('rare'));
    if (roll < 65) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (floor >= 4) {
    if (roll < 15) return getRandomItem('legendary');
    if (roll < 35) return getRandomItem('epic');
    if (roll < 65) return getRandomItem(resolve('rare'));
    if (roll < 85) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (floor >= 3) {
    if (roll < 20) return getRandomItem('epic');
    if (roll < 45) return getRandomItem(resolve('rare'));
    if (roll < 75) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (floor >= 2) {
    if (roll < 30) return getRandomItem(resolve('rare'));
    if (roll < 60) return getRandomItem(resolve('uncommon'));
    return getRandomItem(resolve('common'));
  }
  if (roll < 45) return getRandomItem(resolve('uncommon'));
  return getRandomItem(resolve('common'));
}

// getBossLootByFloor — guaranteed high-quality loot for boss kills.
// Minimum rarity is epic at floor 1, scaling up aggressively with floor.
// Used for both the auto-drop on boss kill and the 3-choice reward modal.
function getBossLootByFloor(floor) {
  const roll = Math.floor(Math.random() * 100);
  if (floor >= 45) {  // floor 45-50 bosses: divine or mythical only
    if (roll < 50) return getRandomItem('divine');
    return getRandomItem('mythical');
  }
  if (floor >= 40) {
    if (roll < 30) return getRandomItem('divine');
    if (roll < 70) return getRandomItem('mythical');
    return getRandomItem('legendary');
  }
  if (floor >= 35) {
    if (roll < 15) return getRandomItem('divine');
    if (roll < 50) return getRandomItem('mythical');
    return getRandomItem('legendary');
  }
  if (floor >= 30) {
    if (roll < 10) return getRandomItem('divine');
    if (roll < 40) return getRandomItem('mythical');
    if (roll < 80) return getRandomItem('legendary');
    return getRandomItem('epic');
  }
  if (floor >= 25) {
    if (roll < 5)  return getRandomItem('divine');
    if (roll < 25) return getRandomItem('mythical');
    if (roll < 65) return getRandomItem('legendary');
    return getRandomItem('epic');
  }
  if (floor >= 20) {
    if (roll < 3)  return getRandomItem('divine');
    if (roll < 18) return getRandomItem('mythical');
    if (roll < 55) return getRandomItem('legendary');
    return getRandomItem('epic');
  }
  if (floor >= 15) {
    if (roll < 8)  return getRandomItem('mythical');
    if (roll < 40) return getRandomItem('legendary');
    return getRandomItem('epic');
  }
  if (floor >= 10) {
    if (roll < 3)  return getRandomItem('mythical');
    if (roll < 25) return getRandomItem('legendary');
    return getRandomItem('epic');
  }
  if (floor >= 5) {
    if (roll < 15) return getRandomItem('legendary');
    return getRandomItem('epic');
  }
  // floor 1-4: minimum epic
  return getRandomItem('epic');
}

