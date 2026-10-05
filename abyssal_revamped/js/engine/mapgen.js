// ══════════════════════════════════════════════════════════════
// MAP GENERATION  (js/engine/mapgen.js)
//
// ALGORITHM: Binary Space Partitioning (BSP)
//   1. bspSplit() recursively divides the map into leaf nodes
//   2. Each leaf gets one room via placeRoomInLeaf()
//   3. Rooms are connected by corridors (carveCorridor → carveSegment)
//   4. Extra cross-connections added for branching layouts
//   5. Content (enemies, items, events, boss, secret) placed in rooms
//
// CELL STRUCTURE: each map cell is { type, content, revealed, visited,
//   room, isCorridor, enemy?, item?, eventIndex?, _shopItems? }
//   type:    'wall' | 'floor' | 'door'
//   content: 'empty'|'enemy'|'boss'|'treasure'|'event'|'shop'|'secret'|
//            'exit'|'guardian'|'visited'|'secret_boss'
//   ⚠️  cell.enemy / cell.item / cell.eventIndex hold the actual data.
//       eventIndex is an index into the EVENTS array (functions can't be JSON serialised).
//
// CORRIDOR WIDTH: all corridors are 2 tiles wide (carveSegment adds extra row/col).
//   safeRandomCellInRoom() avoids placing exits/guardians on chokepoint cells
//   (cells with <2 open neighbours that would block room access).
//
// SECRET ROOMS: hidden until player is adjacent. markSecretHints() places
//   faint visual hints on nearby walls. checkSecretHints() reveals them on move.
//
// CONTENT PLACEMENT ORDER (in generateMap):
//   1. Exit room + guardian tile
//   2. Boss room (floor % 5 === 0) or secret boss room (checkSecretBossTrigger)
//   3. Secret room (15% chance per floor)
//   4. Treasure, shop, event rooms distributed across remaining rooms
//   5. Enemies filled into every room that has no other content (2-4 per room)
//
// FLOOR PROGRESSION:
//   nextFloor() — saves run, increments G.floor, generates new map, auto-saves
//   Every 5th floor: boss encounter. Boss room uses larger ROOM_TYPES.boss dimensions.
//
// SECRET BOSS TRIGGER: checkSecretBossTrigger(floor) in fusion.js
//   Called from nextFloor(). Returns a boss id if conditions are met, else null.
//   Conditions defined in fusion.js meetsSecretBossCondition().
//   generateSecretBossFloor() replaces normal generation when triggered.
// ══════════════════════════════════════════════════════════════

// Room types — all sizes bumped up significantly
const ROOM_TYPES = {
  start:   { minW:5,  minH:5,  maxW:7,  maxH:7  },
  tiny:    { minW:4,  minH:3,  maxW:5,  maxH:4  },
  small:   { minW:5,  minH:4,  maxW:7,  maxH:5  },
  normal:  { minW:7,  minH:6,  maxW:11, maxH:9  },
  large:   { minW:10, minH:8,  maxW:15, maxH:12 },
  boss:    { minW:12, minH:10, maxW:18, maxH:14 },
  secret:  { minW:5,  minH:4,  maxW:7,  maxH:6  },
  exit:    { minW:5,  minH:4,  maxW:7,  maxH:6  },
};

// ── BSP Node ─────────────────────────────────────────────────
class BSPNode {
  constructor(x, y, w, h) {
    this.x=x; this.y=y; this.w=w; this.h=h;
    this.left=null; this.right=null;
    this.room=null;
  }
}

function bspSplit(node, minSize, depth=0) {
  if (depth > 8) return;
  const canSplitH = node.h >= minSize * 2 + 3;
  const canSplitV = node.w >= minSize * 2 + 3;
  if (!canSplitH && !canSplitV) return;

  let splitH;
  if (canSplitH && canSplitV) splitH = rand(2) === 0;
  else splitH = canSplitH;

  if (splitH) {
    const splitY = node.y + minSize + rand(node.h - minSize * 2 - 2) + 1;
    node.left  = new BSPNode(node.x, node.y, node.w, splitY - node.y);
    node.right = new BSPNode(node.x, splitY, node.w, node.h - (splitY - node.y));
  } else {
    const splitX = node.x + minSize + rand(node.w - minSize * 2 - 2) + 1;
    node.left  = new BSPNode(node.x, node.y, splitX - node.x, node.h);
    node.right = new BSPNode(splitX, node.y, node.w - (splitX - node.x), node.h);
  }
  bspSplit(node.left, minSize, depth+1);
  bspSplit(node.right, minSize, depth+1);
}

function getLeaves(node, leaves=[]) {
  if (!node.left && !node.right) { leaves.push(node); return leaves; }
  if (node.left)  getLeaves(node.left, leaves);
  if (node.right) getLeaves(node.right, leaves);
  return leaves;
}

function placeRoomInLeaf(leaf, type='normal') {
  const def = ROOM_TYPES[type] || ROOM_TYPES.normal;
  const rw = Math.min(leaf.w - 2, randRange(def.minW, def.maxW));
  const rh = Math.min(leaf.h - 2, randRange(def.minH, def.maxH));
  if (rw < 2 || rh < 2) return null;
  const rx = leaf.x + 1 + rand(Math.max(1, leaf.w - rw - 1));
  const ry = leaf.y + 1 + rand(Math.max(1, leaf.h - rh - 1));
  return { x:rx, y:ry, w:rw, h:rh, cx:rx+Math.floor(rw/2), cy:ry+Math.floor(rh/2), type };
}

function carveRoom(map, room) {
  for (let dy=0; dy<room.h; dy++) {
    for (let dx=0; dx<room.w; dx++) {
      const mx=room.x+dx, my=room.y+dy;
      if (my>=0&&my<map.length&&mx>=0&&mx<map[0].length) {
        map[my][mx] = { type:'floor', revealed:false, visited:false, content:null, room: room.id };
      }
    }
  }
}

function carveCorridor(map, ax, ay, bx, by) {
  // Carve L-shaped corridor: go horizontal first, then vertical (or vice versa)
  if (rand(2) === 0) {
    carveSegment(map, ax, ay, bx, ay); // horizontal
    carveSegment(map, bx, ay, bx, by); // vertical
  } else {
    carveSegment(map, ax, ay, ax, by); // vertical
    carveSegment(map, ax, by, bx, by); // horizontal
  }
}

function carveSegment(map, ax, ay, bx, by) {
  const H = map.length, W = map[0].length;
  // Carve a 2-wide corridor: for horizontal segments also carve the row below,
  // for vertical segments also carve the column to the right.
  // This eliminates single-cell chokepoints that could block room entrances.
  function carveCell(x, y) {
    if (x>=0&&x<W&&y>=0&&y<H&&map[y][x].type==='wall')
      map[y][x]={type:'floor',revealed:false,visited:false,content:null,isCorridor:true};
  }
  let x=ax;
  while (x!==bx) {
    carveCell(x, ay);
    carveCell(x, ay+1); // second row for horizontal segments
    x+=x<bx?1:-1;
  }
  let y=ay;
  while (y!==by) {
    carveCell(bx, y);
    carveCell(bx+1, y); // second column for vertical segments
    y+=y<by?1:-1;
  }
  if (by>=0&&by<H&&bx>=0&&bx<W) {
    if (map[by][bx].type==='wall') map[by][bx]={type:'floor',revealed:false,visited:false,content:null,isCorridor:true};
  }
}

function revealAround(map, x, y, radius=4) {
  for (let dy=-radius;dy<=radius;dy++) for (let dx=-radius;dx<=radius;dx++) {
    const nx=x+dx, ny=y+dy;
    if (ny>=0&&ny<map.length&&nx>=0&&nx<map[0].length) map[ny][nx].revealed=true;
  }
}

// ── BFS reachability ─────────────────────────────────────────
function bfsReachable(map, sx, sy, tx, ty) {
  const H=map.length, W=map[0].length;
  const visited=Array.from({length:H},()=>new Uint8Array(W));
  const queue=[[sx,sy]];
  visited[sy][sx]=1;
  while (queue.length) {
    const [cx,cy]=queue.shift();
    if (cx===tx&&cy===ty) return true;
    for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx=cx+dx,ny=cy+dy;
      if (nx>=0&&nx<W&&ny>=0&&ny<H&&!visited[ny][nx]&&map[ny][nx].type!=='wall') {
        visited[ny][nx]=1; queue.push([nx,ny]);
      }
    }
  }
  return false;
}

// ── Random floor cell in room ─────────────────────────────────
function randomCellInRoom(room) {
  return {
    x: room.x + randRange(0, room.w-1),
    y: room.y + randRange(0, room.h-1),
  };
}

// Like randomCellInRoom but avoids corridor chokepoints —
// cells with only 1 open neighbour that would block the room entrance.
// Falls back to randomCellInRoom if no safe cell exists.
function safeRandomCellInRoom(room, map) {
  const candidates = [];
  for (let dy = 0; dy < room.h; dy++) {
    for (let dx = 0; dx < room.w; dx++) {
      const x = room.x + dx;
      const y = room.y + dy;
      if (map[y][x].type === 'wall') continue;
      // Count open (non-wall) neighbours
      let openNeighbours = 0;
      for (const [nx, ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]) {
        if (nx >= 0 && nx < map[0].length && ny >= 0 && ny < map.length && map[ny][nx].type !== 'wall') {
          openNeighbours++;
        }
      }
      // Skip cells that are the sole corridor connection (chokepoint)
      if (openNeighbours >= 2) candidates.push({x, y});
    }
  }
  if (candidates.length === 0) return randomCellInRoom(room);
  return candidates[rand(candidates.length)];
}

// ── Secret wall hint ──────────────────────────────────────────
// Mark walls adjacent to secret rooms with a special flag
function markSecretHints(map, secretRoom) {
  const H=map.length, W=map[0].length;
  // Mark the wall cells bordering the room on the outside
  for (let dy=-1; dy<=secretRoom.h; dy++) {
    for (let dx=-1; dx<=secretRoom.w; dx++) {
      const mx=secretRoom.x+dx, my=secretRoom.y+dy;
      if (mx<0||mx>=W||my<0||my>=H) continue;
      if (map[my][mx].type==='wall') map[my][mx].secretHint=true;
    }
  }
}

// ── Main map generator ────────────────────────────────────────
function generateMap(floor) {
  const dims = getMapDims(floor);
  const wgMapMult = { small:0.75, normal:1.0, large:1.3 }[G.worldGen.mapSize] || 1.0;
  const W = Math.round(dims.w * wgMapMult);
  const H = Math.round(dims.h * wgMapMult);

  G.mapW = W; G.mapH = H;

  // Build blank wall map
  const map = [];
  for (let y=0;y<H;y++) {
    map.push([]);
    for (let x=0;x<W;x++) map[y].push({type:'wall',revealed:false,visited:false,content:null});
  }

  const isBossFloor = BOSS_FLOORS.includes(floor);
  const roomCounts  = getRoomCount(floor, G.worldGen.roomCount);
  const targetRooms = randRange(roomCounts.min, roomCounts.max);

  // ── BSP split ──────────────────────────────────────────────
  // minLeafSize must be small enough that the map can fit targetRooms leaves
  // e.g. a 32x32 map needs minLeafSize<=8 to produce 10+ leaves
  const minLeafSize = Math.max(7, Math.floor(Math.min(W, H) / (targetRooms * 0.6)));
  const root = new BSPNode(0, 0, W, H);
  bspSplit(root, minLeafSize);
  const leaves = getLeaves(root);

  // Shuffle leaves for random room placement
  for (let i=leaves.length-1;i>0;i--) { const j=rand(i+1); [leaves[i],leaves[j]]=[leaves[j],leaves[i]]; }

  // ── Place rooms ────────────────────────────────────────────
  const rooms = [];
  let roomId = 0;

  const pickedLeaves = leaves.slice(0, Math.min(targetRooms + 3, leaves.length));

  for (let i=0; i<pickedLeaves.length && rooms.length < targetRooms+2; i++) {
    const leaf = pickedLeaves[i];
    let type = 'normal';
    if (rooms.length === 0) type = 'start';
    else if (rooms.length === pickedLeaves.length - 1 || rooms.length === targetRooms) type = 'exit';
    else if (isBossFloor && rooms.length === Math.floor(targetRooms/2)) type = 'boss';
    else {
      const r = rand(100);
      if (r < 10) type = 'tiny';
      else if (r < 25) type = 'small';
      else if (r < 45) type = 'normal';
      else if (r < 60) type = 'large';
      else type = 'normal';
    }
    const room = placeRoomInLeaf(leaf, type);
    if (!room) continue;
    room.id = roomId++;
    carveRoom(map, room);
    rooms.push(room);
  }

  if (rooms.length < 2) {
    // Fallback: force at least 2 rooms
    const fallback = [
      { x:2, y:2, w:4, h:4, cx:4, cy:4, type:'start',  id:0 },
      { x:W-7, y:H-7, w:4, h:4, cx:W-5, cy:H-5, type:'exit', id:1 },
    ];
    fallback.forEach(r=>carveRoom(map,r));
    rooms.push(...fallback);
  }

  // ── Connect rooms with corridors ───────────────────────────
  // Sort by x position, connect each to nearest unconnected
  const connected = new Set([0]);
  while (connected.size < rooms.length) {
    let bestDist=Infinity, bestA=-1, bestB=-1;
    for (const ai of connected) {
      for (let bi=0;bi<rooms.length;bi++) {
        if (connected.has(bi)) continue;
        const dist=Math.abs(rooms[ai].cx-rooms[bi].cx)+Math.abs(rooms[ai].cy-rooms[bi].cy);
        if (dist<bestDist) { bestDist=dist; bestA=ai; bestB=bi; }
      }
    }
    if (bestA===-1) break;
    carveCorridor(map, rooms[bestA].cx, rooms[bestA].cy, rooms[bestB].cx, rooms[bestB].cy);
    connected.add(bestB);
  }
  // ── Branching corridors ────────────────────────────────────
  // Two types of extra connections after the MST:
  //
  // 1. Room-to-room loops — nearby unlinked rooms get extra connections,
  //    creating cycles so the player has alternate routes.
  //
  // 2. Corridor-to-corridor offshoots — pick a point along an existing
  //    horizontal corridor segment and branch sideways (perpendicular) to
  //    a point along a DIFFERENT corridor segment. This creates passages
  //    that visibly sprout off the sides of corridors, not their ends.
  //    "Side" means perpendicular: horizontal corridors get vertical offshoots,
  //    vertical corridors get horizontal offshoots.

  const branchChance = floor <= 7 ? 55 : floor <= 20 ? 45 : 35;
  const maxDist      = Math.round((W + H) * 0.45);

  // 1. Room-to-room loops
  for (let ai = 0; ai < rooms.length; ai++) {
    for (let bi = ai + 1; bi < rooms.length; bi++) {
      const dist = Math.abs(rooms[ai].cx - rooms[bi].cx) + Math.abs(rooms[ai].cy - rooms[bi].cy);
      if (dist < maxDist && rand(100) < branchChance) {
        carveCorridor(map, rooms[ai].cx, rooms[ai].cy, rooms[bi].cx, rooms[bi].cy);
      }
    }
  }

  // 2. Corridor-to-corridor perpendicular offshoots
  // Collect corridor tiles and bucket them into horizontal runs and vertical runs.
  // A horizontal run = consecutive isCorridor tiles sharing the same Y.
  // A vertical run   = consecutive isCorridor tiles sharing the same X.
  // Then pick two runs with different orientations and connect a mid-point of each.
  const hRuns = []; // [{y, minX, maxX}]
  const vRuns = []; // [{x, minY, maxY}]

  for (let ry = 0; ry < H; ry++) {
    let runStart = -1;
    for (let rx = 0; rx < W; rx++) {
      const isC = map[ry][rx].isCorridor;
      if (isC && runStart === -1) runStart = rx;
      if ((!isC || rx === W-1) && runStart !== -1) {
        const endX = isC ? rx : rx - 1;
        if (endX - runStart >= 3) hRuns.push({ y: ry, minX: runStart, maxX: endX });
        runStart = -1;
      }
    }
  }
  for (let rx = 0; rx < W; rx++) {
    let runStart = -1;
    for (let ry = 0; ry < H; ry++) {
      const isC = map[ry][rx].isCorridor;
      if (isC && runStart === -1) runStart = ry;
      if ((!isC || ry === H-1) && runStart !== -1) {
        const endY = isC ? ry : ry - 1;
        if (endY - runStart >= 3) vRuns.push({ x: rx, minY: runStart, maxY: endY });
        runStart = -1;
      }
    }
  }

  // Connect a random mid-point of an hRun perpendicularly to a mid-point of a vRun
  const offshootCount = Math.floor(rooms.length * (floor <= 7 ? 0.7 : floor <= 20 ? 0.5 : 0.35));
  for (let i = 0; i < offshootCount; i++) {
    if (!hRuns.length || !vRuns.length) break;
    const hRun = hRuns[rand(hRuns.length)];
    const vRun = vRuns[rand(vRuns.length)];
    // Mid-points
    const hMidX = hRun.minX + Math.floor((hRun.maxX - hRun.minX) / 2);
    const vMidY = vRun.minY + Math.floor((vRun.maxY - vRun.minY) / 2);
    // Only connect if they're not too close or too far
    const dist = Math.abs(hMidX - vRun.x) + Math.abs(hRun.y - vMidY);
    if (dist > 4 && dist < maxDist) {
      // Branch from mid of hRun sideways (vertical segment) to meet the vRun
      carveSegment(map, hMidX, hRun.y, hMidX, vMidY);
      // Branch from mid of vRun sideways (horizontal segment) to meet the hRun
      carveSegment(map, vRun.x, vMidY, hMidX, vMidY);
    }
  }

  // ── Secret room ────────────────────────────────────────────
  // 60% chance to add 1 secret room in a corner of the map
  if (rand(100) < 60 && leaves.length > targetRooms + 3) {
    const secretLeaf = leaves[targetRooms + 2];
    const secretRoom = placeRoomInLeaf(secretLeaf, 'secret');
    if (secretRoom) {
      secretRoom.id = roomId++;
      secretRoom.isSecret = true;
      carveRoom(map, secretRoom);
      // Mark cells inside secret as secret_floor (hidden until discovered)
      for (let dy=0;dy<secretRoom.h;dy++) for (let dx=0;dx<secretRoom.w;dx++) {
        const mx=secretRoom.x+dx, my=secretRoom.y+dy;
        if (map[my]&&map[my][mx]) map[my][mx].secret=true;
      }
      markSecretHints(map, secretRoom);
      // Connect secret room to nearest room via a single corridor
      const nearest = rooms.reduce((best,r)=>{
        const d=Math.abs(r.cx-secretRoom.cx)+Math.abs(r.cy-secretRoom.cy);
        return d<best.d?{r,d}:{...best};
      },{r:rooms[0],d:Infinity}).r;
      carveCorridor(map, nearest.cx, nearest.cy, secretRoom.cx, secretRoom.cy);
      rooms.push(secretRoom);
    }
  }

  // ── Place content ──────────────────────────────────────────
  const startRoom = rooms[0];
  const exitRoom  = rooms.find(r=>r.type==='exit') || rooms[rooms.length-1];
  // Pick a boss room that isn't start or exit
  const bossRoom  = rooms.find(r=>r.type==='boss') ||
    rooms.find(r=>r!==startRoom && r!==exitRoom) ||
    exitRoom ||
    startRoom;

  // Player start
  const startPos = randomCellInRoom(startRoom);
  G.playerPos = { x:startPos.x, y:startPos.y };
  map[startPos.y][startPos.x].content = 'start';
  revealAround(map, startPos.x, startPos.y);

  // Exit (locked) — use safe placement to avoid blocking corridor entrances
  const exitPos = safeRandomCellInRoom(exitRoom, map);
  map[exitPos.y][exitPos.x].content = isBossFloor ? 'boss_exit' : 'exit_locked';
  G.exitPos = { x:exitPos.x, y:exitPos.y };

  // Boss or guardian — same safe placement
  const guardianPos = safeRandomCellInRoom(bossRoom, map);
  if (isBossFloor) {
    const boss = getBossForFloor(floor);
    if (boss) {
      map[guardianPos.y][guardianPos.x].content = 'boss';
      map[guardianPos.y][guardianPos.x].enemy   = boss;
    }
  } else {
    const guardian = getGuardianForFloor(floor);
    map[guardianPos.y][guardianPos.x].content = 'boss';
    map[guardianPos.y][guardianPos.x].enemy   = guardian;
  }

  // ── Place content in other rooms ───────────────────────────
  const densityMult = { sparse:0.5, normal:1.0, dense:1.5 }[G.worldGen.enemyDensity] || 1.0;
  const treasureMult= { low:0.5,    normal:1.0, high:1.6  }[G.worldGen.treasureRate] || 1.0;
  const usedCells   = new Set([`${startPos.x},${startPos.y}`,`${exitPos.x},${exitPos.y}`,`${guardianPos.x},${guardianPos.y}`]);

  // Helper: pick a free floor cell in a room
  function pickFreeCell(room, tries=16) {
    for (let t=0; t<tries; t++) {
      const c = randomCellInRoom(room);
      const k = `${c.x},${c.y}`;
      if (!usedCells.has(k) && map[c.y][c.x].type === 'floor') { usedCells.add(k); return c; }
    }
    return null;
  }

  const contentRooms = rooms.filter(r => r !== startRoom && r !== exitRoom && r !== bossRoom && !r.isSecret);
  // Enemy rooms: all non-start, non-secret rooms (including boss room before boss floors, exit room)
  const enemyEligibleRooms = rooms.filter(r => r !== startRoom && !r.isSecret);

  // ── Floor-wide enemy quota ─────────────────────────────────
  // Target: 8-12 enemies on normal, scaled by density setting
  const baseEnemies = randRange(9, 16);
  let enemyQuota = Math.round(baseEnemies * densityMult);
  // Guardian counts as one; the quota is for regular enemies
  let enemiesPlaced = 0;

  // placeEnemyCell — sets up a map cell as a regular-enemy encounter. Most
  // of the time it's a single enemy (cell.enemy); floor 4+ has a PACK_CHANCE
  // chance of a "pack" instead (cell.enemies — 2 enemies fought together in
  // one encounter, see getRandomEnemyPack() in enemies.js). Bosses/guardians
  // NEVER go through here — they're placed directly elsewhere and stay
  // strictly solo, by design (see startCombat()/winCombat() in combat.js,
  // which both rely on that guarantee).
  const PACK_CHANCE = 16;
  function placeEnemyCell(cell, floor) {
    cell.content = 'enemy';
    if (floor >= 4 && rand(100) < PACK_CHANCE) {
      cell.enemies = getRandomEnemyPack(floor);
    } else {
      cell.enemy = getRandomEnemy(floor);
    }
  }

  // Spread enemies across all eligible rooms first (including boss/exit), then overflow
  const enemyRooms = (enemyEligibleRooms.length > 0 ? enemyEligibleRooms : contentRooms.length > 0 ? contentRooms : [bossRoom, exitRoom].filter(Boolean)).slice();
  for (let i = enemyRooms.length - 1; i > 0; i--) {
    const j = rand(i + 1); [enemyRooms[i], enemyRooms[j]] = [enemyRooms[j], enemyRooms[i]];
  }

  // Pass 1: give each room 1-3 enemies until quota filled
  for (const room of enemyRooms) {
    if (enemiesPlaced >= enemyQuota) break;
    const roomCap = Math.min(3, enemyQuota - enemiesPlaced);
    const roomEnemies = randRange(1, roomCap);
    for (let e = 0; e < roomEnemies; e++) {
      if (enemiesPlaced >= enemyQuota) break;
      const ec = pickFreeCell(room);
      if (ec) { placeEnemyCell(map[ec.y][ec.x], floor); enemiesPlaced++; }
    }
  }

  // Pass 2: if quota still not met, loop rooms again
  if (enemiesPlaced < enemyQuota) {
    for (const room of enemyRooms) {
      if (enemiesPlaced >= enemyQuota) break;
      const ec = pickFreeCell(room);
      if (ec) { placeEnemyCell(map[ec.y][ec.x], floor); enemiesPlaced++; }
    }
  }

  // ── Fill empty rooms ──────────────────────────────────────
  // Any content room that ended up with no content gets 2-4 enemies
  // so players never walk into a completely bare room.
  for (const room of contentRooms) {
    const hasContent = Array.from(usedCells).some(k => {
      const [cx, cy] = k.split(',').map(Number);
      return cx >= room.x && cx < room.x + room.w &&
             cy >= room.y && cy < room.y + room.h;
    });
    if (!hasContent) {
      const fillCount = randRange(2, 4);
      for (let f = 0; f < fillCount; f++) {
        const fc = pickFreeCell(room);
        if (fc) { placeEnemyCell(map[fc.y][fc.x], floor); }
      }
    }
  }

  // ── Secret rooms ──────────────────────────────────────────
  for (const room of rooms.filter(r => r.isSecret)) {
    const sc = pickFreeCell(room);
    if (sc) { map[sc.y][sc.x].content = 'treasure'; map[sc.y][sc.x].item = getRandomItemByFloor(Math.min(floor+2, FLOOR_COUNT)); }
    const sc2 = pickFreeCell(room);
    if (sc2) { map[sc2.y][sc2.x].content = 'event'; map[sc2.y][sc2.x].event = EVENTS[rand(EVENTS.length)]; }
  }

  // ── Treasure & events scattered across rooms ──────────────
  // Fall back to any available room if contentRooms is empty
  const placementRooms = contentRooms.length > 0 ? contentRooms : [bossRoom, exitRoom].filter(Boolean);

  // Base treasures: ~3-5 per floor on normal
  const treasureCount = Math.round(randRange(1, 3) * treasureMult);
  for (let t = 0; t < treasureCount; t++) {
    if (!placementRooms.length) break;
    const room = placementRooms[rand(placementRooms.length)];
    const tc = pickFreeCell(room);
    if (tc) { map[tc.y][tc.x].content = 'treasure'; map[tc.y][tc.x].item = getRandomItemByFloor(floor); }
  }

  // Events: ~2-4 per floor
  const eventCount = 2;
  for (let e = 0; e < eventCount; e++) {
    if (!placementRooms.length) break;
    const room = placementRooms[rand(placementRooms.length)];
    const ec = pickFreeCell(room);
    if (ec) { map[ec.y][ec.x].content = 'event'; map[ec.y][ec.x].event = EVENTS[rand(EVENTS.length)]; }
  }

  // Shops: 1-2 per floor
  const shopCount = 1;
  for (let s = 0; s < shopCount; s++) {
    if (!placementRooms.length) break;
    const room = placementRooms[rand(placementRooms.length)];
    const sc = pickFreeCell(room);
    if (sc) { map[sc.y][sc.x].content = 'shop'; }
  }

  // ── BFS sanity check ───────────────────────────────────────
  const startReachesExit = bfsReachable(map, G.playerPos.x, G.playerPos.y, exitPos.x, exitPos.y);
  if (!startReachesExit) {
    // Emergency corridor from start to exit
    carveCorridor(map, G.playerPos.x, G.playerPos.y, exitPos.x, exitPos.y);
  }

  return map;
}

// ── Valid moves ───────────────────────────────────────────────
function getValidMoves() {
  const {x,y} = G.playerPos;
  const moves = { up:false, down:false, left:false, right:false };
  const dirs = [['up',0,-1],['down',0,1],['left',-1,0],['right',1,0]];
  for (const [dir,dx,dy] of dirs) {
    const nx=x+dx, ny=y+dy;
    if (nx<0||nx>=G.mapW||ny<0||ny>=G.mapH) continue;
    const cell=G.map[ny][nx];
    if (cell.type==='wall') continue;
    if (cell.content==='exit_locked'||cell.content==='boss_exit') continue;
    moves[dir]=true;
  }
  return moves;
}

function movePlayer(dx, dy) {
  if (G.phase==='combat') return;
  const nx=G.playerPos.x+dx, ny=G.playerPos.y+dy;
  if (nx<0||nx>=G.mapW||ny<0||ny>=G.mapH) return;
  const cell=G.map[ny][nx];
  if (cell.type==='wall') return;
  if (cell.content==='exit_locked'||cell.content==='boss_exit') {
    logEntry('system','🔒 The way forward is sealed. Defeat the guardian first.');
    return;
  }
  G.map[G.playerPos.y][G.playerPos.x].visited=true;
  G.playerPos={x:nx,y:ny};
  revealAround(G.map, nx, ny);

  // Secret room discovery — 15% chance on first entry
  if (cell.secret && !cell.secretRevealed) {
    cell.secretRevealed = true;
    logEntry('system','✦ You discover a secret room!');
  }

  // Check nearby secret hints (adjacent wall with secretHint)
  checkSecretHints(nx, ny);

  handleCellContent(cell, nx, ny);

  // BIOME EFFECTS: fires after handleCellContent so a move that triggers
  // combat correctly skips it (triggerBiomeEffect no-ops while G.inCombat).
  triggerBiomeEffect();

  updateUI();
}

function checkSecretHints(x, y) {
  for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]) {
    const nx=x+dx,ny=y+dy;
    if (nx<0||nx>=G.mapW||ny<0||ny>=G.mapH) continue;
    const cell=G.map[ny][nx];
    if (cell.secretHint && !cell.secretHintRevealed && rand(100)<15) {
      cell.secretHintRevealed=true;
      logEntry('system','👁 Something feels different about this wall...');
    }
  }
}

function handleCellContent(cell, x, y) {
  if (!cell.content||cell.content==='visited'||cell.content==='start') return;
  switch(cell.content) {
    case 'enemy':
      // cell.enemies (a pack) takes priority if present; startCombat()
      // accepts either a single enemy or an array — see combat.js.
      startCombat(cell.enemies || cell.enemy);
      break;
    case 'boss': {
      const enemy=cell.enemy||getBossForFloor(G.floor);
      if(enemy){cell.content='boss_active';startCombat(enemy);}
      break;
    }
    case 'treasure':
      if(cell.item){
        const foundItem=cell.item;
        logEntry('reward',`◆ Chest opened: ${foundItem.name}!`);
        addToInventory(cloneItem(foundItem));
        cell.content='visited';cell.item=null;
        showItemPopup(foundItem);
      }
      break;
    case 'event':
      if(cell.event){G.phase='event';showEvent(cell.event,cell,x,y);}
      break;
    case 'shop':
      G.phase='shop';
      showShop(cell,x,y);
      break;
    case 'exit':
      nextFloor();
      break;
    case 'exit_locked':
    case 'boss_exit':
      logEntry('system','🔒 The way forward is sealed. Defeat the guardian first.');
      break;
  }
}

function nextFloor() {
  G.floor++;
  if (G.floor > FLOOR_COUNT) { winGame(); return; }

  const p = G.player;
  // Partial restore between floors
  p.stats.hp = Math.min(p.stats.maxHp, p.stats.hp + Math.round(p.stats.maxHp*0.2));
  p.stats.mp = Math.min(p.stats.maxMp, p.stats.mp + Math.round(p.stats.maxMp*0.3));
  p.status   = [];
  p.combo    = 0;

  // Decay floor ward
  if (p.floorWardRemaining > 0) {
    p.floorWardRemaining--;
    if (p.floorWardRemaining<=0 && p.floorWardBonus>0) {
      p.stats.def=Math.max(0,p.stats.def-p.floorWardBonus);
      logEntry('system','⚗ Abyss Ward has faded.');
    }
  }

  // Update maxFloor and persist class level for fusion tracking
  if (G.floor > G.meta.maxFloor) {
    G.meta.maxFloor = G.floor;
  }
  if (p.classId) {
    const prev = G.meta.classLevels[p.classId] || 0;
    if (p.level > prev) G.meta.classLevels[p.classId] = p.level;
  }
  saveMeta();
  // ── Auto-save run on floor transition ──
  if (typeof autoSaveRun === 'function') autoSaveRun();
  const secretBossId = checkSecretBossTrigger(G.floor);
  if (secretBossId) {
    G._secretBossTriggeredThisRun = true;
    G._pendingSecretBoss = secretBossId;
    G.map = generateSecretBossFloor(G.floor, secretBossId);
    G.phase = 'explore';
    G.inCombat = false;
    G.killedBoss = false;
    const boss = SECRET_BOSSES[secretBossId];
    logEntry('system', `══ ??? Floor ${G.floor} ══`);
    logEntry('system', `⚠ ${boss.announcement}`);
    updateUI();
    return;
  }

  G.map = generateMap(G.floor);
  G.phase = 'explore';
  G.inCombat = false;
  G.killedBoss = false;

  const tierName = { normal:'Normal', hard:'Hard', brutal:'Brutal', abyssal:'Abyssal' }[getFloorTier(G.floor)] || '';
  logEntry('system', `══ Descending to Floor ${G.floor} [${tierName}] ══`);

  // BIOME: announce on the first floor of a new biome, then a random
  // flavor line every floor for fresh atmosphere. Also retints the map's
  // floor-tile border accent to match (--biome-accent, see style.css).
  const biome = getBiomeForFloor(G.floor);
  const biomeElement = ELEMENTS[biome.element];
  if (biomeElement) document.documentElement.style.setProperty('--biome-accent', biomeElement.color);
  if (G.floor === biome.floors[0]) logEntry('system', `🗺 Entering ${biome.name}.`);
  logEntry('system', biome.flavor[rand(biome.flavor.length)]);

  // Milestone floor announcement
  if (MILESTONE_FLOORS.includes(G.floor)) {
    logEntry('system', `⚠ MILESTONE FLOOR — Beware. Something powerful awaits.`);
  }

  updateUI();
}

// ── Secret Boss Floor Generator ───────────────────────────────
// Generates a minimal eerie arena map for a secret boss encounter.
// Single large room at center, player spawns at south end,
// boss spawns at north end. No exit until boss is defeated.
function generateSecretBossFloor(floor, secretBossId) {
  const W = 28, H = 28;
  G.mapW = W; G.mapH = H;

  const map = [];
  for (let y=0;y<H;y++) {
    map.push([]);
    for (let x=0;x<W;x++) map[y].push({type:'wall',revealed:false,visited:false,content:null});
  }

  // Carve a large central arena room
  const roomX=4, roomY=4, roomW=20, roomH=20;
  for (let y=roomY;y<roomY+roomH;y++) {
    for (let x=roomX;x<roomX+roomW;x++) {
      map[y][x]={type:'floor',revealed:false,visited:false,content:null,room:0};
    }
  }

  // Player spawns near south center of arena
  const playerX = Math.floor(W/2);
  const playerY = roomY + roomH - 3;
  G.playerPos = { x:playerX, y:playerY };
  map[playerY][playerX].content = 'player';

  // Boss spawns at north center — deep-copy so each encounter is fresh
  const bossX = Math.floor(W/2);
  const bossY = roomY + 3;
  const bossDef = SECRET_BOSSES[secretBossId];
  const bossEnemy = JSON.parse(JSON.stringify(bossDef.enemy));
  map[bossY][bossX].content = 'enemy';
  map[bossY][bossX].enemy   = bossEnemy;
  G._secretBossCell = { x:bossX, y:bossY };

  // Reveal the full arena immediately — you see exactly what waits
  for (let y=roomY-1;y<roomY+roomH+1;y++) {
    for (let x=roomX-1;x<roomX+roomW+1;x++) {
      if (y>=0&&y<H&&x>=0&&x<W) {
        map[y][x].revealed = true;
        map[y][x].visited  = true;
      }
    }
  }

  // No exit — placed by winCombat() after the boss falls (isBoss check handles it)
  G.exitPos = null;

  return map;
}
