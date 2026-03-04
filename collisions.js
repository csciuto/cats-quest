// ── COLLISION BOXES ────────────────────────────────────────
const colliders={
  dining:  [],
  kitchen: [],
  bedroom: [],
};

// Trash barrel — disabled after chase knocks it over
const trashBarrelBox={x:215,y:120,w:28,h:22,disabled:false};
colliders.kitchen.push(trashBarrelBox);

// Squeaky toy basket — always present (empty basket still blocks)
const basketBox={x:270,y:152,w:22,h:12,disabled:false};
colliders.kitchen.push(basketBox);

// Dining table: no floor collision — cat walks under freely, jumps to get on top.

function collides(nx,ny,room){
  const cw=14,ch=18;
  const boxes=colliders[room].filter(b=>!b.disabled);
  for(const b of boxes){
    if(nx+cw>b.x && nx<b.x+b.w && ny+ch>b.y && ny<b.y+b.h) return true;
  }
  return false;
}
