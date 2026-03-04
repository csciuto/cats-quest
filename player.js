// ── PLAYER ─────────────────────────────────────────────────
const P={x:160,y:FLOOR-16,dir:"right",frame:0,at:0,moving:false,layer:"floor"};

function chgRoom(r){
  sfx.door();
  const from=currentRoom;
  currentRoom=r;
  P.layer="floor";
  if(r==="kitchen"){
    P.x=18;P.y=FLOOR-16;P.dir="right";
    if(!itemsFound.visitedKitchen){
      itemsFound.visitedKitchen=true;
      showMsg("You pad into the kitchen. Checkered tiles click under your paws.");
    }
  } else if(r==="bedroom"){
    P.x=GW-28;P.y=FLOOR-16;P.dir="left";
    if(!itemsFound.visitedBedroom){
      itemsFound.visitedBedroom=true;
      showMsg("You pad into the bedroom. It smells of warm blankets and... dog.");
    }
  } else { // dining
    if(from==="kitchen"){P.x=GW-28;P.dir="left";}else{P.x=28;P.dir="right";}
    P.y=FLOOR-16;
    itemsFound.visitedDining=true;
  }
}

function updateP(){
  if(uiState==="gameover"||uiState!=="play"||isAnimating()||itemsFound.inCloset)return;
  let dx=0,dy=0;
  if(KD["ArrowLeft"])dx=-1;
  if(KD["ArrowRight"])dx=1;
  if(KD["ArrowUp"])dy=-1;
  if(KD["ArrowDown"])dy=1;
  P.moving=dx!==0||dy!==0;
  if(dx)P.dir=dx>0?"right":"left";
  const spd=1.2,yspd=spd*0.55;
  let nx=P.x+dx*spd,ny=P.y+dy*yspd;

  if(P.layer==="floor"){
    if(nx>=2&&nx<=GW-18&&!collides(nx,P.y,currentRoom))P.x=nx;
    if(ny>=125&&ny<=FLOOR+30&&!collides(P.x,ny,currentRoom))P.y=ny;
  } else if(P.layer==="table"){
    // Table surface x=86–234, cat 14px wide
    if(nx>=86&&nx<=220)P.x=nx;
  } else if(P.layer==="counter"){
    // Counter surface x=60–266, cat 14px wide
    if(nx>=60&&nx<=252)P.x=nx;
  } else if(P.layer==="bed"){
    // Bed surface x=14–80, cat 14px wide
    if(nx>=14&&nx<=66)P.x=nx;
  } else if(P.layer==="dresser"){
    // Dresser drawer opening x=232–276, cat 14px wide
    if(nx>=232&&nx<=262)P.x=nx;
  } else if(P.layer==="lchair"){
    // Left chair seat x=55–80, cat 14px
    if(nx>=55&&nx<=66)P.x=nx;
  } else if(P.layer==="rchair"){
    // Right chair seat x=237–262, cat 14px
    if(nx>=237&&nx<=248)P.x=nx;
  }

  // Room transitions via walking off screen edge
  if(P.x>=GW-22&&currentRoom==="dining")chgRoom("kitchen");
  if(P.x>=GW-22&&currentRoom==="bedroom")chgRoom("dining");
  if(P.x<=6&&currentRoom==="dining")chgRoom("bedroom");
  if(P.x<=14&&currentRoom==="kitchen")chgRoom("dining");

  if(P.moving){P.at++;P.frame=Math.floor(P.at/5)%4;}else{P.frame=0;P.at=0;}
}
