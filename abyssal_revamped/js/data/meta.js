// ══════════════════════════════════════════════════════════════
// META PROGRESSION — Talents, Shard Shop, Loadouts
// ══════════════════════════════════════════════════════════════

const TALENT_TREE = [
  { id:'blood_price',   name:'Blood Price',   desc:'+10 max HP per rank. (3 ranks)',        maxRank:3, cost:1, shardCost:5,  bonus:(r)=>({maxHp:r*10}) },
  { id:'soul_reserve',  name:'Soul Reserve',  desc:'+10 max MP per rank. (3 ranks)',        maxRank:3, cost:1, shardCost:5,  bonus:(r)=>({maxMp:r*10}) },
  { id:'iron_will',     name:'Iron Will',     desc:'+2 DEF per rank. (3 ranks)',            maxRank:3, cost:1, shardCost:6,  bonus:(r)=>({def:r*2}) },
  { id:'shadow_arts',   name:'Shadow Arts',   desc:'+2 ATK per rank. (3 ranks)',            maxRank:3, cost:1, shardCost:6,  bonus:(r)=>({atk:r*2}) },
  { id:'quickening',    name:'Quickening',    desc:'+3 SPD per rank. (2 ranks)',            maxRank:2, cost:2, shardCost:10, bonus:(r)=>({spd:r*3}) },
  { id:'fate_touched',  name:'Fate-Touched',  desc:'+5% crit chance per rank. (2 ranks)',   maxRank:2, cost:2, shardCost:10, bonus:(r)=>({crit:r*5}) },
  { id:'undying',       name:'Undying',       desc:'Once per run, survive lethal damage at 1 HP. (1 rank)', maxRank:1, cost:4, shardCost:30, special:'undying' },
  { id:'deep_roots',    name:'Deep Roots',    desc:'+5 max HP AND +5 max MP per rank. (3 ranks)', maxRank:3, cost:2, shardCost:12, bonus:(r)=>({maxHp:r*5,maxMp:r*5}) },
  { id:'critical_eye',  name:'Critical Eye',  desc:'+3% crit AND +5% crit dmg per rank. (3 ranks)', maxRank:3, cost:2, shardCost:14, bonus:(r)=>({crit:r*3,critDmg:r*5}) },
];

const SHARD_SHOP_ITEMS = [
  { id:'vitality_core',   name:'Vitality Core',    icon:'❤️',  desc:'+15 max HP per rank.',    maxRank:3, cost:8,  bonus:{maxHp:15} },
  { id:'mana_core',       name:'Mana Core',        icon:'💙',  desc:'+15 max MP per rank.',    maxRank:3, cost:8,  bonus:{maxMp:15} },
  { id:'power_shard',     name:'Power Shard',      icon:'⚔️',  desc:'+3 ATK per rank.',        maxRank:4, cost:10, bonus:{atk:3} },
  { id:'armor_shard',     name:'Armor Shard',      icon:'🛡️',  desc:'+3 DEF per rank.',        maxRank:4, cost:10, bonus:{def:3} },
  { id:'swift_shard',     name:'Swift Shard',      icon:'💨',  desc:'+3 SPD per rank.',        maxRank:3, cost:12, bonus:{spd:3} },
  { id:'start_gold',      name:'Gold Reserve',     icon:'💰',  desc:'+25 starting gold per rank.', maxRank:3, cost:15, bonus:{startGold:25} },
  { id:'floor_ward',      name:'Abyss Ward',       icon:'⚗️',  desc:'+3 DEF for first 3 floors per rank.', maxRank:2, cost:18, special:'floorWard', bonus:{} },
  { id:'lucky_find',      name:'Lucky Find',       icon:'🍀',  desc:'+10% item drop rate per rank.', maxRank:3, cost:20, special:'lootBoost', bonus:{} },
  { id:'combo_mastery',   name:'Combo Mastery',    icon:'⚡',  desc:'Burst meter fills 25% faster per rank.', maxRank:2, cost:22, special:'comboBoost', bonus:{} },
  // ── Loot Purge chain ─────────────────────────────────────────────────────
  { id:'purge_common',    name:'Purge Common',     icon:'🗑️',  desc:'Common items no longer drop.',           maxRank:1, cost:100, special:'purgeCommon',   bonus:{}, requires:null },
  { id:'purge_uncommon',  name:'Purge Uncommon',   icon:'🗑️',  desc:'Uncommon items no longer drop. Requires Purge Common.',    maxRank:1, cost:250, special:'purgeUncommon', bonus:{}, requires:'purge_common' },
  { id:'purge_rare',      name:'Purge Rare',       icon:'🗑️',  desc:'Rare items no longer drop. Requires Purge Uncommon.',      maxRank:1, cost:500, special:'purgeRare',     bonus:{}, requires:'purge_uncommon' },
  // ── Abyssal Pact (tiered starting item) ──────────────────────────────────
  { id:'abyssal_pact_1',  name:'Abyssal Pact I',   icon:'📦',  desc:'Start each run with a random Rare item.',     maxRank:1, cost:10,  special:'startItem', startRarity:'rare',      bonus:{}, requires:null },
  { id:'abyssal_pact_2',  name:'Abyssal Pact II',  icon:'📦',  desc:'Start each run with a random Epic item.',     maxRank:1, cost:85,  special:'startItem', startRarity:'epic',      bonus:{}, requires:'abyssal_pact_1' },
  { id:'abyssal_pact_3',  name:'Abyssal Pact III', icon:'📦',  desc:'Start each run with a random Legendary item.',maxRank:1, cost:250, special:'startItem', startRarity:'legendary', bonus:{}, requires:'abyssal_pact_2' },
  { id:'abyssal_pact_4',  name:'Abyssal Pact IV',  icon:'📦',  desc:'Start each run with a random Mythical item.', maxRank:1, cost:500, special:'startItem', startRarity:'mythical',  bonus:{}, requires:'abyssal_pact_3' },
];

const LOADOUTS = [
  { id:'none',          name:'No Loadout',        icon:'—',  desc:'Start with nothing extra.',                cost:0 },
  { id:'warrior_kit',   name:"Warrior's Kit",     icon:'⚔️', desc:'Start with a Blood Flask and 20 gold.',    cost:3 },
  { id:'mage_kit',      name:"Arcanist's Satchel",icon:'🪄', desc:'Start with a Mana Crystal and Bone Staff.', cost:4 },
  { id:'survivor_kit',  name:"Survivor's Bundle", icon:'🧪', desc:'Start with 2× Blood Flask and 10 gold.',   cost:5 },
  { id:'relic_cache',   name:'Relic Cache',        icon:'💜', desc:'Start with a random rare item.',           cost:8 },
  { id:'blessed_arms',  name:'Blessed Arms',       icon:'🗡️', desc:'Start with Shadow Dagger equipped.',      cost:6 },
];

function getShardShopRank(id) {
  return G.meta.shopUpgrades[id] || 0;
}

function getShardShopBonuses() {
  const bonuses = {};
  SHARD_SHOP_ITEMS.forEach(item => {
    const rank = getShardShopRank(item.id);
    if (rank > 0 && item.bonus) {
      for (const [k,v] of Object.entries(item.bonus)) {
        bonuses[k] = (bonuses[k]||0) + v * rank;
      }
    }
    // Special handling
    if (rank > 0) {
      if (item.special === 'floorWard')    bonuses.floorWard    = (bonuses.floorWard||0)    + 3    * rank;
      if (item.special === 'lootBoost')    bonuses.lootBoost    = (bonuses.lootBoost||0)    + 0.1  * rank;
      if (item.special === 'comboBoost')   bonuses.comboBoost   = (bonuses.comboBoost||0)   + 0.25 * rank;
      if (item.special === 'purgeCommon')   bonuses.purgeCommon   = true;
      if (item.special === 'purgeUncommon') bonuses.purgeUncommon = true;
      if (item.special === 'purgeRare')     bonuses.purgeRare     = true;
      if (item.special === 'startItem' && item.startRarity) bonuses.startItemRarity = item.startRarity;
    }
  });
  return bonuses;
}
