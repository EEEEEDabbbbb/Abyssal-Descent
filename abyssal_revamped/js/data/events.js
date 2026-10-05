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
        effect:(p)=>{ const n=10+Math.floor(G.floor/2); G.meta.soulShards+=n;saveMeta();return `Freed souls reward you with ${n} Soul Shards!`; } },
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
  },
];
