// ══════════════════════════════════════════════════════════════
// RANDOM EVENTS
//
// Each event: { id, name, icon, desc, choices:[{ text, effect(p) → result string }] }
// `text` may be a function (p) → string so costs/rewards can scale with depth.
// Permanent stat changes MUST use addPermanentStat() (stats.js) — a direct
// p.stats change would be undone at the end of the next fight.
// evScale(n) scales a number with the current floor (+8% per floor).
// ══════════════════════════════════════════════════════════════

function evScale(n) { return Math.max(1, Math.round(n * (1 + (G.floor - 1) * 0.08))); }

// addFloorEffect — a stat change that lasts for a number of floor transitions
// and is then reverted (see tickFloorEffects in mapgen.js).
function addFloorEffect(p, effect) {
  addPermanentStat(p, effect.stat, effect.amount);
  (p.floorEffects = p.floorEffects || []).push({ ...effect });
}

const EVENTS = [
  { id:'altar', name:'Dark Altar', icon:'⛩️',
    desc:'An ancient altar pulses with malevolent energy. Dark runes beckon you to make an offering.',
    choices:[
      { text:()=>`Offer ${Math.round(G.player.stats.maxHp*0.2)} HP for power (+${2+Math.floor(G.floor/6)} ATK, +${1+Math.floor(G.floor/10)} SPD)`,
        effect:(p)=>{ const cost=Math.round(p.stats.maxHp*0.2); if(p.stats.hp>cost+5){ p.stats.hp-=cost; addPermanentStat(p,'atk',2+Math.floor(G.floor/6)); addPermanentStat(p,'spd',1+Math.floor(G.floor/10)); return 'The altar accepts your blood. Power flows through you.';} return 'You are too weak to make the offering.'; } },
      { text:()=>`Offer ${evScale(15)} MP to gain knowledge (reveal floor map)`,
        effect:(p)=>{ const cost=evScale(15); if(p.stats.mp>=cost){p.stats.mp-=cost;G.map.forEach(r=>r.forEach(c=>{if(c.type!=='wall')c.revealed=true;}));return 'Knowledge floods your mind. The floor is revealed.';} return 'Not enough mana.'; } },
      { text:'Leave the altar undisturbed', effect:(p)=>{ return 'Wise. Some gifts have too high a price.'; } },
    ]
  },
  { id:'wandering_merchant', name:'Wandering Soul', icon:'👤',
    desc:'A spectral merchant drifts past, offering peculiar wares.',
    choices:[
      { text:()=>`Buy a random item (${evScale(30)} gold)`,
        effect:(p)=>{ const cost=evScale(30); if(inventoryFull(p)) return 'Your pack is too full to carry anything more.'; if(p.gold>=cost){p.gold-=cost;const item=getRandomItemByFloor(G.floor);addToInventory(item);return `Purchased: ${item.name}.`;} return 'Not enough gold.'; } },
      { text:'Trade a random item for a better one', effect:(p)=>{ if(p.inventory.length>0){const removed=p.inventory.splice(rand(p.inventory.length),1)[0];const rarityLadder=['common','uncommon','rare','epic','legendary','mythical','divine'];const currentTier=rarityLadder.indexOf(removed.rarity);const nextRarity=rarityLadder[Math.min(currentTier+1,rarityLadder.length-1)];const newItem=getRandomItem(nextRarity);addToInventory(newItem);return `Traded ${removed.name} (${removed.rarity}) for ${newItem.name} (${newItem.rarity})!`;} return 'Nothing to trade.'; } },
      { text:'Ignore the merchant', effect:(p)=>{ return 'The soul drifts on, taking its secrets.'; } },
    ]
  },
  { id:'curse_room', name:'Chamber of Curses', icon:'👁️',
    desc:'The walls weep black ichor. A curse hangs heavy in the stagnant air.',
    choices:[
      { text:()=>`Embrace the curse (+${3+Math.floor(G.floor/8)} ATK permanently, -${4+Math.floor(G.floor/8)} DEF for 3 floors)`,
        effect:(p)=>{ addPermanentStat(p,'atk',3+Math.floor(G.floor/8)); addFloorEffect(p,{name:'Chamber Curse',stat:'def',amount:-(4+Math.floor(G.floor/8)),floors:3}); return 'Power surges — and something else takes root in you.'; } },
      { text:()=>`Resist the curse (take ${evScale(20)} dmg, gain ${evScale(40)} gold)`,
        effect:(p)=>{ const d=evScale(20), g=evScale(40); p.stats.hp=Math.max(1,p.stats.hp-d);p.gold+=g;return `You resist! ${d} damage, ${g} gold gained.`; } },
      { text:'Flee the room', effect:(p)=>{ return 'You back away from the cursed chamber.'; } },
    ]
  },
  { id:'font_of_healing', name:'Font of Healing', icon:'💧',
    desc:'Crystal-clear water wells up from cracks in the stone, carrying the faint scent of dawn.',
    choices:[
      { text:'Drink deeply (restore all HP)', effect:(p)=>{ p.stats.hp=p.stats.maxHp;return 'Vitality restored completely!'; } },
      { text:'Restore HP and MP (50% of what is missing)', effect:(p)=>{ p.stats.hp=Math.round(p.stats.maxHp*0.5+p.stats.hp*0.5);p.stats.mp=Math.round(p.stats.maxMp*0.5+p.stats.mp*0.5);return 'Both HP and MP partially restored.'; } },
      { text:'Fill a vial (gain a Blood Flask)', effect:(p)=>{ addToInventory(cloneItem(ITEM_POOL.find(i=>i.id==='health_potion')));return 'Blood Flask added to your pack.'; } },
    ]
  },
  { id:'tome_of_knowledge', name:'Ancient Tome', icon:'📕',
    desc:'A decaying tome floats before you, its pages filled with forbidden knowledge.',
    choices:[
      { text:()=>`Study the tome (gain ${Math.round(xpForLevel(G.player.level)*0.6)} XP)`,
        effect:(p)=>{ gainXP(Math.round(xpForLevel(p.level)*0.6));return 'Ancient wisdom fills your mind.'; } },
      { text:()=>`Absorb the power (random stat +${2+Math.floor(G.floor/10)})`,
        effect:(p)=>{ const stats=['atk','def','spd'];const s=stats[rand(stats.length)];const n=2+Math.floor(G.floor/10);addPermanentStat(p,s,n);return `Power absorbed: +${n} ${s.toUpperCase()}!`; } },
      { text:()=>`Destroy the tome (gain ${evScale(15)} gold)`, effect:(p)=>{ const g=evScale(15); p.gold+=g;return `The tome burns. ${g} gold found among ashes.`; } },
    ]
  },
  { id:'soul_well', name:'Soul Well', icon:'🌀',
    desc:'A deep well filled with trapped souls. Their whispers promise power.',
    choices:[
      { text:()=>`Drink from the well (+${evScale(12)} max HP, +${evScale(8)} max MP)`,
        effect:(p)=>{ addPermanentStat(p,'maxHp',evScale(12)); addPermanentStat(p,'maxMp',evScale(8)); return 'Soul energy courses through you!'; } },
      { text:()=>`Release the souls (gain ${10+Math.floor(G.floor/2)} Soul Shards)`,
        effect:(p)=>{ const n=awardShards(10+Math.floor(G.floor/2));saveMeta();return `Freed souls reward you with ${n} Soul Shards!`; } },
      { text:'Leave the souls be', effect:(p)=>{ return 'Some souls deserve their rest.'; } },
    ]
  },
  { id:'mysterious_statue', name:'Mysterious Statue', icon:'🗿',
    desc:'A statue of unknown origin. Its eyes seem to follow you.',
    choices:[
      { text:()=>`Pray to the statue (50%: +1 ATK/DEF/SPD, or lose ${evScale(10)} HP)`,
        effect:(p)=>{ if(rand(100)<50){addPermanentStat(p,'atk',1);addPermanentStat(p,'def',1);addPermanentStat(p,'spd',1);return 'The statue grants its blessing! +1 ATK, DEF and SPD.';} else{const d=evScale(10);p.stats.hp=Math.max(1,p.stats.hp-d);return `The statue is displeased. -${d} HP.`;} } },
      { text:()=>`Smash the statue (gain ${evScale(20)} gold, take ${evScale(5)} dmg)`,
        effect:(p)=>{ const g=evScale(20), d=evScale(5); p.gold+=g;p.stats.hp=Math.max(1,p.stats.hp-d);return `Rubble and ${g} gold. Worth it?`; } },
      { text:'Ignore it', effect:(p)=>{ return 'Its eyes follow you out of the room.'; } },
    ]
  },  { id:'bone_gambler', name:'The Bone Gambler', icon:'🎲',
    desc:'A grinning skeleton rattles a cup of knucklebones. "Care to test your luck, little candle?"',
    choices:[
      { text:()=>`Wager ${evScale(25)} gold (50%: win double)`,
        effect:(p)=>{ const w=evScale(25); if(p.gold<w) return 'You cannot cover the wager.'; if(rand(100)<50){p.gold+=w;return `The bones favor you! +${w} gold.`;} p.gold-=w; return `The bones betray you. -${w} gold.`; } },
      { text:()=>`Wager ${Math.round(G.player.stats.maxHp*0.15)} HP for a prize (50%)`,
        effect:(p)=>{ const c=Math.round(p.stats.maxHp*0.15); if(p.stats.hp<=c+5) return 'You are too weak to wager blood.'; p.stats.hp-=c; if(rand(100)<50){ const it=getRandomItemByFloor(G.floor+2); addToInventory(it); return `Your blood buys a prize: ${it.name}!`; } return 'The skeleton cackles and keeps your blood.'; } },
      { text:'Walk away', effect:(p)=>{ return '"Coward," it clicks, not unkindly.'; } },
    ]
  },
  { id:'rusted_armory', name:'Rusted Armory', icon:'🛡️',
    desc:'Racks of ancient arms line the walls, most rusted to uselessness. Something glints among them.',
    choices:[
      { text:'Search the racks (30% chance of a trap)',
        effect:(p)=>{ if(inventoryFull(p)) return 'Your pack is too full to carry anything more.'; if(rand(100)<30){ const d=evScale(15); p.stats.hp=Math.max(1,p.stats.hp-d); return `A rack collapses on you! -${d} HP.`; } let it=getRandomItemByFloor(G.floor); for(let i=0;i<5&&it.type==='consumable';i++) it=getRandomItemByFloor(G.floor); addToInventory(it); return `Beneath the rust: ${it.name}!`; } },
      { text:()=>`Salvage the metal (+${evScale(18)} gold)`, effect:(p)=>{ const g=evScale(18); p.gold+=g; return `You haul out scrap worth ${g} gold.`; } },
      { text:'Leave it to rust', effect:(p)=>{ return 'Some things are best left buried.'; } },
    ]
  },
  { id:'crimson_fountain', name:'Crimson Fountain', icon:'⛲',
    desc:'A fountain runs thick and red. It smells of iron and old promises.',
    choices:[
      { text:()=>`Bathe in it (full heal, -${evScale(10)} max HP for 3 floors)`,
        effect:(p)=>{ addFloorEffect(p,{name:'Crimson Debt',stat:'maxHp',amount:-evScale(10),floors:3}); p.stats.hp=p.stats.maxHp; return 'Your wounds close — but the fountain keeps something of you.'; } },
      { text:()=>`Drink deeply (+${2+Math.floor(G.floor/8)} ATK for 3 floors, lose 20% HP)`,
        effect:(p)=>{ p.stats.hp=Math.max(1,Math.round(p.stats.hp*0.8)); addFloorEffect(p,{name:'Blood Frenzy',stat:'atk',amount:2+Math.floor(G.floor/8),floors:3}); return 'Rage floods your veins.'; } },
      { text:'Leave the fountain', effect:(p)=>{ return 'The red water stills as you go.'; } },
    ]
  },
  { id:'trapped_spirit', name:'Trapped Spirit', icon:'👻',
    desc:'A pale figure beats against a ring of glowing runes, begging to be released.',
    choices:[
      { text:'Break the runes (+1 talent point)', effect:(p)=>{ p.talentPoints=(p.talentPoints||0)+1; return 'The spirit flees upward, whispering a secret of power. +1 talent point.'; } },
      { text:()=>`Bind it to yourself (+3 CRIT permanently, -${evScale(10)} MP)`,
        effect:(p)=>{ p.stats.mp=Math.max(0,p.stats.mp-evScale(10)); addPermanentStat(p,'crit',3); return 'The spirit howls as it sinks into you. +3 CRIT.'; } },
      { text:'Leave it be', effect:(p)=>{ return 'Its pleading follows you down the corridor.'; } },
    ]
  },
  { id:'wounded_adventurer', name:'Wounded Adventurer', icon:'🧝',
    desc:'Another delver lies propped against the wall, bleeding badly. "Please… do you have anything?"',
    choices:[
      { text:'Give a Blood Flask (they reward you)',
        effect:(p)=>{ const i=p.inventory.findIndex(it=>it.id==='health_potion'); if(i<0) return 'You have no Blood Flask to give.'; p.inventory.splice(i,1); const it=getRandomItemByFloor(G.floor+3); addToInventory(it); return `"Take this — I won't need it where I'm going." You receive ${it.name}.`; } },
      { text:()=>`Bandage them (-${evScale(8)} HP, +${Math.round(xpForLevel(G.player.level)*0.4)} XP)`,
        effect:(p)=>{ p.stats.hp=Math.max(1,p.stats.hp-evScale(8)); gainXP(Math.round(xpForLevel(p.level)*0.4)); return 'You patch them up and learn a thing or two about the depths.'; } },
      { text:()=>`Rob them (+${evScale(35)} gold, -1 DEF permanently)`, effect:(p)=>{ const g=evScale(35); p.gold+=g; addPermanentStat(p,'def',-1); return `You take ${g} gold. Something in you hardens — and something else cracks.`; } },
    ]
  },
  { id:'whispering_chest', name:'Whispering Chest', icon:'🧰',
    desc:'An ornate chest whispers your name. Its lid is lined with suspiciously sharp teeth.',
    choices:[
      { text:'Open it (60%: great loot, 40%: mimic bite)',
        effect:(p)=>{ if(inventoryFull(p)) return 'Your pack is too full to take anything.'; if(rand(100)<60){ const it=getRandomItemByFloor(Math.min(FLOOR_COUNT,G.floor+6)); addToInventory(it); return `The whispers were true: ${it.name}!`; } const d=Math.round(p.stats.maxHp*0.25); p.stats.hp=Math.max(1,p.stats.hp-d); return `MIMIC! It bites for ${d} before scuttling into the dark.`; } },
      { text:'Leave it closed', effect:(p)=>{ return 'The whispering turns to a disappointed sigh.'; } },
    ]
  },
];
