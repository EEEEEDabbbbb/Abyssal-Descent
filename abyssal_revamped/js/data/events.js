// ══════════════════════════════════════════════════════════════
// RANDOM EVENTS
// ══════════════════════════════════════════════════════════════

const EVENTS = [
  { id:'altar', name:'Dark Altar', icon:'⛩️',
    desc:'An ancient altar pulses with malevolent energy. Dark runes beckon you to make an offering.',
    choices:[
      { text:'Offer 20 HP for power (+4 ATK, +2 SPD)', effect:(p)=>{ if(p.stats.hp>25){p.stats.hp-=20;p.stats.atk+=4;p.stats.spd+=2;return 'The altar accepts your blood. Power flows through you.';} return 'You lack the resolve.'; } },
      { text:'Offer 15 MP to gain knowledge (reveal floor map)', effect:(p)=>{ if(p.stats.mp>=15){p.stats.mp-=15;G.map.forEach(r=>r.forEach(c=>{if(c.type!=='wall')c.revealed=true;}));return 'Knowledge floods your mind. The floor is revealed.';} return 'Not enough mana.'; } },
      { text:'Leave the altar undisturbed', effect:(p)=>{ return 'Wise. Some gifts have too high a price.'; } },
    ]
  },
  { id:'wandering_merchant', name:'Wandering Soul', icon:'👤',
    desc:'A spectral merchant drifts past, offering peculiar wares.',
    choices:[
      { text:'Buy a random item (30 gold)', effect:(p)=>{ if(p.gold>=30){p.gold-=30;const item=getRandomItem('uncommon');addToInventory(item);return `Purchased: ${item.name}.`;} return 'Not enough gold.'; } },
      { text:'Trade a random item for a better one', effect:(p)=>{ if(p.inventory.length>0){const removed=p.inventory.splice(rand(p.inventory.length),1)[0];const rarityLadder=['common','uncommon','rare','epic','legendary','mythical','divine'];const currentTier=rarityLadder.indexOf(removed.rarity);const nextRarity=rarityLadder[Math.min(currentTier+1,rarityLadder.length-1)];const newItem=getRandomItem(nextRarity);addToInventory(newItem);return `Traded ${removed.name} (${removed.rarity}) for ${newItem.name} (${newItem.rarity})!`;} return 'Nothing to trade.'; } },
      { text:'Ignore the merchant', effect:(p)=>{ return 'The soul drifts on, taking its secrets.'; } },
    ]
  },
  { id:'curse_room', name:'Chamber of Curses', icon:'👁️',
    desc:'The walls weep black ichor. A curse hangs heavy in the stagnant air.',
    choices:[
      { text:'Embrace the curse (+5 ATK, -5 DEF, Cursed for 3 floors)', effect:(p)=>{ p.stats.atk+=5;p.stats.def=Math.max(0,p.stats.def-5);addStatus(p,{id:'floor_curse',name:'Cursed',type:'debuff',icon:'👁️',duration:99});return 'Power surges — and something else takes root in you.'; } },
      { text:'Resist the curse (take 20 dmg, gain 40 gold)', effect:(p)=>{ p.stats.hp=Math.max(1,p.stats.hp-20);p.gold+=40;return 'You resist! 20 damage, 40 gold gained.'; } },
      { text:'Flee the room', effect:(p)=>{ return 'You back away from the cursed chamber.'; } },
    ]
  },
  { id:'font_of_healing', name:'Font of Healing', icon:'💧',
    desc:'Crystal-clear water wells up from cracks in the stone, carrying the faint scent of dawn.',
    choices:[
      { text:'Drink deeply (restore all HP)', effect:(p)=>{ p.stats.hp=p.stats.maxHp;return 'Vitality restored completely!'; } },
      { text:'Restore HP and MP (50% each)', effect:(p)=>{ p.stats.hp=Math.round(p.stats.maxHp*0.5+p.stats.hp*0.5);p.stats.mp=Math.round(p.stats.maxMp*0.5+p.stats.mp*0.5);return 'Both HP and MP partially restored.'; } },
      { text:'Fill a vial (gain a Health Potion)', effect:(p)=>{ addToInventory(cloneItem(ITEM_POOL.find(i=>i.id==='health_potion')));return 'Blood Flask added to inventory.'; } },
    ]
  },
  { id:'tome_of_knowledge', name:'Ancient Tome', icon:'📕',
    desc:'A decaying tome floats before you, its pages filled with forbidden knowledge.',
    choices:[
      { text:'Study the tome (gain 60 XP)', effect:(p)=>{ gainXP(60);return 'Ancient wisdom fills your mind.'; } },
      { text:'Absorb the power (random stat +3)', effect:(p)=>{ const stats=['atk','def','spd'];const s=stats[rand(stats.length)];p.stats[s]+=3;return `Power absorbed: +3 ${s.toUpperCase()}!`; } },
      { text:'Destroy the tome (gain 15 gold)', effect:(p)=>{ p.gold+=15;return 'The tome burns. 15 gold found among ashes.'; } },
    ]
  },
  { id:'soul_well', name:'Soul Well', icon:'🌀',
    desc:'A deep well filled with trapped souls. Their whispers promise power.',
    choices:[
      { text:'Drink from the well (+15 max HP, +10 max MP)', effect:(p)=>{ p.stats.maxHp+=15;p.stats.hp=Math.min(p.stats.maxHp,p.stats.hp+15);p.stats.maxMp+=10;p.stats.mp=Math.min(p.stats.maxMp,p.stats.mp+10);return 'Soul energy courses through you!'; } },
      { text:'Release the souls (gain 25 Soul Shards)', effect:(p)=>{ G.meta.soulShards+=25;saveMeta();return 'Freed souls reward you with 25 Soul Shards!'; } },
      { text:'Leave the souls be', effect:(p)=>{ return 'Some souls deserve their rest.'; } },
    ]
  },
  { id:'mysterious_statue', name:'Mysterious Statue', icon:'🗿',
    desc:'A statue of unknown origin. Its eyes seem to follow you.',
    choices:[
      { text:'Pray to the statue (50% chance: +1 to all stats or -2 HP)', effect:(p)=>{ if(rand(100)<50){p.stats.atk++;p.stats.def++;p.stats.spd++;return 'The statue grants its blessing! +1 all stats.';} else{p.stats.hp=Math.max(1,p.stats.hp-10);return 'The statue is displeased. -10 HP.';} } },
      { text:'Smash the statue (gain 20 gold, take 5 dmg)', effect:(p)=>{ p.gold+=20;p.stats.hp=Math.max(1,p.stats.hp-5);return 'Rubble and 20 gold. Worth it?'; } },
      { text:'Ignore it', effect:(p)=>{ return 'Its eyes follow you out of the room.'; } },
    ]
  },
];
