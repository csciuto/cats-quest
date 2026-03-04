// ── DRAW: ROOMS (same as before) ──────────────────────────
function drawDining(){
  X.fillStyle=E.cyan;X.fillRect(0,TOP,GW,FLOOR-TOP);
  X.fillStyle=E.blue;for(let y=TOP+6;y<FLOOR-8;y+=12)for(let x=6;x<GW-6;x+=16){X.fillRect(x,y,2,2);X.fillStyle="#006688";X.fillRect(x+8,y+6,2,2);X.fillStyle=E.blue;}
  X.fillStyle=E.brown;X.fillRect(0,FLOOR-6,GW,6);X.fillStyle=E.yellow;X.fillRect(0,FLOOR-7,GW,1);
  X.fillStyle=E.brown;X.fillRect(0,FLOOR,GW,GH-FLOOR);X.fillStyle="#884400";for(let i=0;i<8;i++)X.fillRect(0,FLOOR+i*4,GW,1);X.fillStyle="#773300";for(let x=0;x<GW;x+=32)X.fillRect(x,FLOOR,1,GH-FLOOR);
  // Window (+10px right to clear bedroom doorway) — drawn early so table overlaps it
  X.fillStyle=E.lmag;X.fillRect(18,22,7,62);X.fillRect(66,22,7,62);X.fillStyle=E.mag;X.fillRect(20,22,3,62);X.fillRect(68,22,3,62);X.fillStyle=E.brown;X.fillRect(16,20,60,2);X.fillStyle=E.yellow;X.fillRect(16,20,2,2);X.fillRect(74,20,2,2);
  X.fillStyle=E.white;X.fillRect(26,26,38,54);X.fillStyle=E.lcyan;X.fillRect(28,28,34,50);X.fillStyle=E.white;X.fillRect(32,32,8,4);X.fillRect(48,36,6,3);X.fillRect(44,26,2,54);X.fillRect(26,52,38,2);
  // Chandelier
  X.fillStyle=E.dgray;X.fillRect(158,TOP,1,14);X.fillRect(148,TOP,1,16);X.fillRect(168,TOP,1,16);X.fillStyle=E.brown;X.fillRect(146,26,26,3);X.fillStyle=E.yellow;X.fillRect(148,26,22,2);
  for(let i=0;i<5;i++){const c=147+i*5;X.fillStyle=E.white;X.fillRect(c,22,2,4);X.fillStyle=E.yellow;X.fillRect(c,20,2,2);X.fillStyle=E.lred;X.fillRect(c,19,2,1);}
  if(Math.random()>.85){X.fillStyle=E.yellow;X.fillRect(149,18,2,1);}
  // Table (drawn after window so it overlaps window bottom)
  X.fillStyle=E.brown;X.fillRect(86,96,148,8);X.fillStyle=E.red;X.fillRect(88,98,144,4);X.fillStyle=E.brown;X.fillRect(96,104,5,38);X.fillRect(220,104,5,38);X.fillStyle="#663300";X.fillRect(100,126,122,2);
  X.fillStyle=E.white;X.fillRect(120,94,8,3);X.fillRect(190,94,8,3);X.fillStyle=E.lgray;X.fillRect(121,95,6,1);X.fillRect(191,95,6,1);
  // Tablecloth — draped on table before chase, on floor after
  if(!itemsFound.clothFallen){
    X.fillStyle=E.red;X.fillRect(86,96,148,4);
    X.fillStyle="#CC2222";X.fillRect(86,100,4,42);X.fillRect(230,100,4,42);
    X.fillStyle=E.red;X.fillRect(84,138,6,4);X.fillRect(230,138,6,4);
  } else {
    X.fillStyle=E.red;X.fillRect(90,FLOOR,120,8);X.fillStyle="#CC2222";X.fillRect(92,FLOOR+2,116,4);
  }
  // Serving lid
  if(!itemsFound.clothFallen){
    X.fillStyle=E.lgray;X.fillRect(148,88,26,8);X.fillStyle=E.white;X.fillRect(149,89,24,6);X.fillStyle=E.lgray;X.fillRect(158,85,6,4);X.fillStyle=E.white;X.fillRect(159,86,4,2);
  } else {
    X.fillStyle=E.lgray;X.fillRect(238,FLOOR+2,18,6);X.fillStyle=E.white;X.fillRect(239,FLOOR+3,16,4);
    X.fillStyle="#CC8844";X.fillRect(150,88,22,8);
    X.fillStyle="#AA6622";X.fillRect(152,90,18,5);X.fillStyle="#FFAA44";X.fillRect(154,88,6,3);X.fillRect(162,88,4,3);
    X.fillStyle=E.white;X.fillRect(150,93,4,3);X.fillRect(168,93,4,3);
  }
  // Chairs — drawn LAST so they appear in front of tablecloth drape; left chair at 56 (10px left)
  [56,238].forEach(c=>{X.fillStyle=E.red;X.fillRect(c,82,24,3);X.fillRect(c+2,82,2,28);X.fillRect(c+8,82,2,28);X.fillRect(c+14,82,2,28);X.fillRect(c+20,82,2,28);X.fillStyle=E.brown;X.fillRect(c-1,110,26,3);X.fillRect(c+1,113,3,29);X.fillRect(c+20,113,3,29);});
  // Painting
  X.fillStyle=E.brown;X.fillRect(258,28,50,42);X.fillStyle="#664400";X.fillRect(260,30,46,38);X.fillStyle=E.lblue;X.fillRect(262,32,42,16);X.fillStyle=E.green;X.fillRect(262,48,42,18);X.fillStyle=E.lgreen;X.fillRect(268,48,10,18);X.fillRect(288,44,8,22);X.fillStyle=E.yellow;X.fillRect(296,34,4,4);X.fillRect(258,28,50,1);X.fillRect(258,28,1,42);
  // Food bowl
  X.fillStyle=E.lgray;X.fillRect(278,FLOOR-4,16,4);X.fillStyle=E.dgray;X.fillRect(280,FLOOR-6,12,2);X.fillStyle=E.brown;X.fillRect(282,FLOOR-8,8,2);X.fillRect(276,FLOOR-2,2,1);X.fillRect(296,FLOOR-1,2,1);
  // Doorway east (to kitchen)
  X.fillStyle=E.brown;X.fillRect(GW-10,66,10,FLOOR-66);X.fillStyle="#221100";X.fillRect(GW-8,68,8,FLOOR-70);X.fillStyle=E.yellow;X.fillRect(GW-10,66,1,FLOOR-66);X.fillRect(GW-10,66,10,1);
  // Doorway west (to bedroom)
  X.fillStyle=E.brown;X.fillRect(0,66,10,FLOOR-66);X.fillStyle="#221100";X.fillRect(0,68,8,FLOOR-70);X.fillStyle=E.yellow;X.fillRect(9,66,1,FLOOR-66);X.fillRect(0,66,10,1);
}

function drawKitch(){
  X.fillStyle=E.lcyan;X.fillRect(0,TOP,GW,FLOOR-TOP);
  for(let y=TOP+62;y<FLOOR-4;y+=8)for(let x=55;x<270;x+=8){X.fillStyle=((Math.floor(x/8)+Math.floor(y/8))%2)?"#88DDDD":E.lcyan;X.fillRect(x,y,8,8);}
  X.fillStyle=E.white;X.fillRect(0,FLOOR-4,GW,4);
  for(let y=FLOOR;y<GH;y+=32)for(let x=0;x<GW;x+=32){X.fillStyle="#555";X.fillRect(x,y,32,32);X.fillStyle=((Math.floor(x/32)+Math.floor((y-FLOOR)/32))%2)?"#2A3A4A":"#EEEEEE";X.fillRect(x+1,y+1,30,30);}
  // Fridge — dark grey, retro 1987 style
  X.fillStyle=E.dgray;X.fillRect(10,28,42,114);X.fillStyle="#444";X.fillRect(12,30,38,50);X.fillRect(12,82,38,58);X.fillStyle=E.lgray;X.fillRect(46,50,3,8);X.fillRect(46,106,3,8);dT("COOL",20,34,E.lgray);
  X.fillStyle=E.red;X.fillRect(18,86,4,4);X.fillStyle=E.lgreen;X.fillRect(30,90,4,4);X.fillStyle=E.yellow;X.fillRect(38,84,4,4);
  // Upper cabs
  for(let i=0;i<4;i++){const c=66+i*48;X.fillStyle=E.brown;X.fillRect(c,18,42,38);X.fillStyle="#884400";X.fillRect(c+2,20,38,34);X.fillStyle=E.red;X.fillRect(c+4,22,16,30);X.fillRect(c+22,22,16,30);X.fillStyle=E.yellow;X.fillRect(c+18,35,2,3);X.fillRect(c+36,35,2,3);}
  // Counter + lower cabs
  X.fillStyle=E.yellow;X.fillRect(60,88,206,4);X.fillStyle=E.white;X.fillRect(60,88,206,1);X.fillStyle=E.brown;X.fillRect(60,92,206,50);
  for(let i=0;i<4;i++){const c=66+i*48;X.fillStyle="#884400";X.fillRect(c+2,96,38,18);X.fillStyle=E.red;X.fillRect(c+4,98,16,14);X.fillRect(c+22,98,16,14);X.fillStyle=E.yellow;X.fillRect(c+18,103,2,3);X.fillRect(c+36,103,2,3);X.fillStyle="#884400";X.fillRect(c+2,118,38,20);X.fillStyle=E.red;X.fillRect(c+4,120,34,16);X.fillStyle=E.yellow;X.fillRect(c+19,127,4,2);}
  // Sink
  X.fillStyle=E.lgray;X.fillRect(140,89,32,3);X.fillStyle=E.dgray;X.fillRect(142,86,28,3);X.fillStyle=E.lgray;X.fillRect(155,76,4,10);X.fillStyle=E.dgray;X.fillRect(153,74,8,3);X.fillRect(158,74,3,6);
  if(Math.sin(Date.now()/400)>.5){X.fillStyle=E.lblue;X.fillRect(159,80,1,3);}
  // Window
  X.fillStyle=E.white;X.fillRect(130,60,52,26);X.fillStyle=E.lblue;X.fillRect(132,62,48,10);X.fillStyle=E.lgreen;X.fillRect(132,72,48,12);X.fillStyle=E.brown;X.fillRect(148,66,3,2);X.fillRect(146,65,2,1);X.fillRect(151,65,2,1);X.fillStyle=E.white;X.fillRect(155,62,2,22);
  // Stove
  X.fillStyle=E.dgray;X.fillRect(272,86,42,56);X.fillStyle=E.black;X.fillRect(275,90,36,18);X.fillStyle=E.lgray;X.fillRect(278,116,30,22);X.fillStyle="#333";X.fillRect(280,118,26,18);X.fillStyle=E.lgray;X.fillRect(278,86,12,3);X.fillRect(296,86,12,3);
  X.fillStyle=E.lblue;X.fillRect(282,89,6,4);X.fillStyle=E.lcyan;X.fillRect(283,90,4,2);X.fillStyle=E.yellow;X.fillRect(284,91,2,1);
  X.fillStyle=E.white;X.fillRect(275,110,3,3);X.fillRect(281,110,3,3);X.fillRect(293,110,3,3);X.fillRect(299,110,3,3);
  X.fillStyle=E.dgray;X.fillRect(279,82,10,5);X.fillStyle=E.lgray;X.fillRect(280,78,8,4);
  X.fillStyle=E.white;const st=Date.now()/200;if(Math.sin(st)>0)X.fillRect(282,74+Math.sin(st)*2,2,2);if(Math.sin(st+1)>0)X.fillRect(286,72+Math.sin(st+2)*2,2,2);
  // Water bowl
  X.fillStyle=E.lgray;X.fillRect(53,FLOOR-4,16,4);X.fillRect(55,FLOOR-6,12,2);X.fillStyle=E.lblue;X.fillRect(57,FLOOR-8,8,2);
  // Dog toy basket — lower right corner
  X.fillStyle="#AA8855";X.fillRect(270,FLOOR+8,18,10);
  X.fillStyle="#996644";X.fillRect(270,FLOOR+8,18,2);
  for(let bx=271;bx<287;bx+=3){X.fillStyle="#884433";X.fillRect(bx,FLOOR+10,1,6);}
  if(!itemsFound.toyTaken){
    X.fillStyle=E.red;X.fillRect(274,FLOOR+3,10,6);
    X.fillStyle="#FF4444";X.fillRect(275,FLOOR+4,8,4);
    X.fillStyle=E.white;X.fillRect(277,FLOOR+3,3,2);
  }
  // Trash barrel x=215 — blocks lower cabs, upright or knocked over after chase
  if(!itemsFound.chaseTriggered){
    X.fillStyle=E.dgray;X.fillRect(215,FLOOR-22,28,22);
    X.fillStyle="#333";X.fillRect(217,FLOOR-20,24,18);
    X.fillStyle=E.lgray;X.fillRect(214,FLOOR-24,30,4);
    X.fillStyle="#555";X.fillRect(215,FLOOR-18,28,2);X.fillRect(215,FLOOR-12,28,2);
    X.fillStyle=E.lgray;X.fillRect(214,FLOOR-26,18,4);
    X.fillStyle="#AA6622";X.fillRect(223,FLOOR-28,8,6);
  } else {
    X.fillStyle=E.dgray;X.fillRect(210,FLOOR-4,32,14);
    X.fillStyle="#333";X.fillRect(212,FLOOR-2,28,10);
    X.fillStyle="#555";X.fillRect(210,FLOOR,32,2);
    X.fillStyle="#AA6622";X.fillRect(196,FLOOR+2,14,4);X.fillRect(244,FLOOR+4,12,3);
    X.fillStyle="#CC8844";X.fillRect(202,FLOOR+7,10,3);
    X.fillStyle="#888";X.fillRect(190,FLOOR+4,6,2);X.fillRect(250,FLOOR+2,8,2);
    X.fillStyle="#663300";X.fillRect(198,FLOOR+11,16,2);X.fillRect(240,FLOOR+8,10,2);
  }
  // Trash-dive: cat legs sticking out of barrel
  if(itemsFound.trashDive){
    // Barrel still upright with cat inside
    X.fillStyle=E.dgray;X.fillRect(215,FLOOR-22,28,22);
    X.fillStyle="#333";X.fillRect(217,FLOOR-20,24,18);
    X.fillStyle=E.lgray;X.fillRect(214,FLOOR-24,30,4);
    X.fillStyle="#555";X.fillRect(215,FLOOR-18,28,2);X.fillRect(215,FLOOR-12,28,2);
    // Cat legs/tail sticking up out of barrel top
    X.fillStyle=E.lgray;X.fillRect(222,FLOOR-34,5,14);X.fillRect(231,FLOOR-30,5,12);
    X.fillStyle=E.dgray;X.fillRect(222,FLOOR-36,5,4);X.fillRect(231,FLOOR-32,5,4);
    // Tail curled over rim
    X.fillStyle=E.lgray;X.fillRect(237,FLOOR-28,6,3);X.fillRect(241,FLOOR-26,4,5);
    X.fillStyle=E.dgray;X.fillRect(238,FLOOR-28,4,2);
    // Coffee ground splatter
    X.fillStyle="#552200";X.fillRect(208,FLOOR-2,5,2);X.fillRect(244,FLOOR-4,6,2);X.fillRect(212,FLOOR+4,4,2);
  }
  // Doorway
  X.fillStyle=E.brown;X.fillRect(0,66,8,FLOOR-66);X.fillStyle="#221100";X.fillRect(0,68,6,FLOOR-70);X.fillStyle=E.yellow;X.fillRect(7,66,1,FLOOR-66);X.fillRect(0,66,8,1);
}

// ── DRAW: CAT with ANIMATIONS ─────────────────────────────
function drawCat(){
  if(itemsFound.trashDive) return; // cat is inside barrel, rendered there instead
  if(itemsFound.inCloset) return;  // cat is inside the closet
  const x=Math.round(P.x),y=Math.round(P.y);
  const bc=E.lgray,dc=E.dgray;
  const d=P.dir;
  const a=anim.type;
  const af=anim.frame;

  // ── JUMP: vertical offset ──
  let yOff=0;
  if(a==="jump"){
    const t=af/anim.maxFrames;
    // jumpUp: quarter-sine (always rising, warp fires at peak)
    // jumpDown/generic: full sine arc (up then down)
    yOff = anim.jumpUp ? -Math.sin(t*Math.PI*0.5)*18 : -Math.sin(t*Math.PI)*14;
  }
  const dy=Math.round(yOff);

  // ── DRAWER SLEEP: cat curled in open dresser drawer ──
  if(a==="drawerSleep"){ drawDrawerSleepCat(x,y,af); return; }
  // ── ALERT: ears perked, pupils blown, pre-chase pose ──
  if(a==="alert"){ drawAlertCat(x,y,af); return; }
  // ── HISS: puffed up ──
  if(a==="hiss"){
    drawHissCat(x,y);return;
  }
  // ── SCRATCH: alternating paw strike ──
  if(a==="scratch"){
    drawScratchCat(x,y+dy,af);return;
  }
  // ── STRETCH ──
  if(a==="stretch"){
    drawStretchCat(x,y,af);return;
  }
  // ── SLEEP ──
  if(a==="sleep"){
    drawSleepCat(x,y);return;
  }
  // ── GROOM ──
  if(a==="groom"){
    drawGroomCat(x,y,af);return;
  }
  // ── EAT ──
  if(a==="eat"){
    drawEatCat(x,y,af);return;
  }
  // ── MEOW: open mouth ──
  if(a==="meow"){
    drawMeowCat(x,y+dy,af);return;
  }
  // ── DANCE: side shuffle ──
  if(a==="dance"){
    const sOff=Math.sin(af*0.4)*4;
    drawNormalCat(x+Math.round(sOff),y+dy,d,P.frame,P.moving);return;
  }
  // ── RUN: fast legs ──
  if(a==="run"){
    drawNormalCat(x,y+dy,d,Math.floor(af/2)%4,true);return;
  }
  // ── PURR: vibrate ──
  if(a==="purr"){
    const vib=(af%4<2)?1:0;
    drawNormalCat(x+vib,y+dy,d,0,false);
    // Purr lines
    X.fillStyle=E.white;
    const px=d==="right"?x+16:x-4;
    if(af%8<4){X.fillRect(px,y+4,2,1);X.fillRect(px+(d==="right"?2:-2),y+6,2,1);}
    return;
  }

  drawNormalCat(x,y+dy,d,P.frame,P.moving);
}

function drawNormalCat(x,y,d,f,moving){
  const bc=E.lgray,dc=E.dgray;
  const eo=d==="right"?0:2;
  // Ears
  X.fillStyle=bc;X.fillRect(x+1+eo,y,3,2);X.fillRect(x+2+eo,y-1,1,1);X.fillRect(x+8+eo,y,3,2);X.fillRect(x+9+eo,y-1,1,1);
  X.fillStyle=E.lmag;X.fillRect(x+2+eo,y,1,1);X.fillRect(x+9+eo,y,1,1);
  // Head
  X.fillStyle=bc;X.fillRect(x+eo,y+2,12,7);X.fillRect(x+1+eo,y+1,10,1);
  // Eyes
  X.fillStyle=E.yellow;
  if(d==="right"){X.fillRect(x+5,y+4,2,2);X.fillRect(x+9,y+4,2,2);X.fillStyle=E.black;X.fillRect(x+6,y+4,1,2);X.fillRect(x+10,y+4,1,2);}
  else{X.fillRect(x+3,y+4,2,2);X.fillRect(x+7,y+4,2,2);X.fillStyle=E.black;X.fillRect(x+3,y+4,1,2);X.fillRect(x+7,y+4,1,2);}
  // Nose
  X.fillStyle=E.lmag;X.fillRect(x+6+(d==="right"?0:-1),y+6,2,1);
  // Whiskers
  X.fillStyle=E.white;if(d==="right"){X.fillRect(x+11,y+5,3,1);X.fillRect(x+11,y+7,3,1);}else{X.fillRect(x-2,y+5,3,1);X.fillRect(x-2,y+7,3,1);}
  // Body
  X.fillStyle=bc;X.fillRect(x+2,y+9,10,6);X.fillStyle=dc;X.fillRect(x+4,y+10,1,4);X.fillRect(x+7,y+10,1,4);X.fillRect(x+10,y+10,1,4);
  // Legs
  X.fillStyle=bc;const ly=y+15;
  if(moving){const lo=[[0,2,0,-1],[1,0,-1,1],[0,-1,0,2],[-1,1,1,0]][f%4]||[0,0,0,0];X.fillRect(x+2,ly+lo[0],2,3-lo[0]);X.fillRect(x+5,ly+lo[1],2,3-lo[1]);X.fillRect(x+8,ly+lo[2],2,3-lo[2]);X.fillRect(x+11,ly+lo[3],2,3-lo[3]);}
  else{X.fillRect(x+2,ly,2,3);X.fillRect(x+5,ly,2,3);X.fillRect(x+8,ly,2,3);X.fillRect(x+11,ly,2,3);}
  // Paws
  X.fillStyle=E.white;X.fillRect(x+2,y+17,2,1);X.fillRect(x+5,y+17,2,1);X.fillRect(x+8,y+17,2,1);X.fillRect(x+11,y+17,2,1);
  // Tail
  X.fillStyle=bc;const tw=Math.sin(Date.now()/300)*1.5;
  if(d==="right"){X.fillRect(x-1,y+10,2,2);X.fillRect(x-3,y+8+tw,2,3);X.fillRect(x-4,y+6+tw,2,3);}
  else{X.fillRect(x+13,y+10,2,2);X.fillRect(x+15,y+8+tw,2,3);X.fillRect(x+16,y+6+tw,2,3);}
  // Shadow
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawDrawerSleepCat(x,y,af){
  // Cat curled up inside open drawer — only head + body visible above drawer rim
  const bc=E.lgray;
  // Curled body filling drawer width
  X.fillStyle=bc;
  X.fillRect(x+2,y+4,16,10); // body blob
  X.fillRect(x+4,y+3,12,2);
  X.fillRect(x+2,y+14,12,2);
  // Head tucked left
  X.fillRect(x,y+6,5,6);
  // Ears flat/tucked
  X.fillRect(x,y+5,2,2);X.fillRect(x+3,y+5,2,2);
  X.fillStyle=E.lmag;X.fillRect(x+1,y+5,1,1);X.fillRect(x+4,y+5,1,1);
  // Closed eyes
  X.fillStyle=E.black;X.fillRect(x+1,y+8,1,1);
  // Tail curled around
  X.fillStyle=bc;
  X.fillRect(x+16,y+10,3,2);X.fillRect(x+18,y+8,2,3);X.fillRect(x+17,y+6,2,3);
  // Sock on face (every other second)
  if(Math.floor(Date.now()/1000)%2===0){
    X.fillStyle=E.yellow;X.fillRect(x+1,y+9,3,3);X.fillStyle="#884400";X.fillRect(x+2,y+9,1,3);
  }
  // ZZZs
  const zf=Math.floor(Date.now()/600)%3;
  if(zf>=0)dT("Z",x+6,y-4,E.white);
  if(zf>=1)dT("Z",x+12,y-9,E.lgray);
  if(zf>=2)dT("Z",x+18,y-14,E.dgray);
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+16,20,1);
}

function drawAlertCat(x,y,af){
  const bc=E.lgray,dc=E.dgray,d=P.dir,eo=d==="right"?0:2;
  const coil=af>14?1:0;
  // Extra-tall perked ears
  X.fillStyle=bc;
  X.fillRect(x+1+eo,y-1-coil,3,3); X.fillRect(x+2+eo,y-3-coil,1,3);
  X.fillRect(x+8+eo,y-1-coil,3,3); X.fillRect(x+9+eo,y-3-coil,1,3);
  X.fillStyle=E.lmag; X.fillRect(x+2+eo,y-1-coil,1,2); X.fillRect(x+9+eo,y-1-coil,1,2);
  // Head
  X.fillStyle=bc; X.fillRect(x+eo,y+2,12,7); X.fillRect(x+1+eo,y+1,10,1);
  // Wide blown pupils
  X.fillStyle=E.yellow;
  if(d==="right"){X.fillRect(x+4,y+3,3,3);X.fillRect(x+9,y+3,3,3);
    X.fillStyle=E.black;X.fillRect(x+5,y+3,2,3);X.fillRect(x+10,y+3,2,3);}
  else{X.fillRect(x+3,y+3,3,3);X.fillRect(x+7,y+3,3,3);
    X.fillStyle=E.black;X.fillRect(x+3,y+3,2,3);X.fillRect(x+7,y+3,2,3);}
  X.fillStyle=E.lmag; X.fillRect(x+6+(d==="right"?0:-1),y+6,2,1);
  X.fillStyle=E.white;
  if(d==="right"){X.fillRect(x+11,y+5,3,1);X.fillRect(x+11,y+7,3,1);}
  else{X.fillRect(x-2,y+5,3,1);X.fillRect(x-2,y+7,3,1);}
  // Body
  X.fillStyle=bc; X.fillRect(x+2,y+9,10,6);
  X.fillStyle=dc; X.fillRect(x+4,y+10,1,4);X.fillRect(x+7,y+10,1,4);X.fillRect(x+10,y+10,1,4);
  // Legs slightly crouched
  X.fillStyle=bc;
  X.fillRect(x+2,y+15,2,2); X.fillRect(x+5,y+15,2,2);
  X.fillRect(x+8,y+15,2,2); X.fillRect(x+11,y+15,2,2);
  X.fillStyle=E.white;
  X.fillRect(x+2,y+16,2,1); X.fillRect(x+5,y+16,2,1);
  X.fillRect(x+8,y+16,2,1); X.fillRect(x+11,y+16,2,1);
  // Tail stiff, low
  X.fillStyle=bc;
  if(d==="right"){X.fillRect(x-1,y+12,2,2);X.fillRect(x-3,y+13,2,3);X.fillRect(x-4,y+15,2,2);}
  else{X.fillRect(x+13,y+12,2,2);X.fillRect(x+15,y+13,2,3);X.fillRect(x+16,y+15,2,2);}
  X.fillStyle="rgba(0,0,0,0.15)"; X.fillRect(x,y+17,14,1);
}

function drawHissCat(x,y){
  const bc=E.lgray,lc="#BBBBBB",dc=E.dgray; // puffed body = slightly lighter gray, NOT white
  // Ears flat/splayed
  X.fillStyle=bc;
  X.fillRect(x,y-1,3,2);X.fillRect(x+11,y-1,3,2);
  X.fillStyle=E.lmag;X.fillRect(x+1,y-1,1,1);X.fillRect(x+12,y-1,1,1);
  // Head
  X.fillStyle=bc;X.fillRect(x+1,y+1,12,7);
  // Wide eyes
  X.fillStyle=E.yellow;X.fillRect(x+4,y+3,2,3);X.fillRect(x+9,y+3,2,3);
  X.fillStyle=E.black;X.fillRect(x+5,y+3,1,3);X.fillRect(x+10,y+3,1,3);
  // Open mouth - hissing
  X.fillStyle=E.lred;X.fillRect(x+6,y+6,3,2);
  X.fillStyle=E.white;X.fillRect(x+6,y+6,1,1);X.fillRect(x+8,y+6,1,1); // fangs
  // Puffy body (wider, light gray not white)
  X.fillStyle=lc;X.fillRect(x,y+8,14,8);
  X.fillStyle=bc;X.fillRect(x+1,y+9,12,6);
  // Arched back spikes (dark gray)
  X.fillStyle=dc;for(let i=0;i<5;i++)X.fillRect(x+2+i*2,y+7,2,2);
  // Stiff legs
  X.fillStyle=bc;X.fillRect(x+1,y+15,2,4);X.fillRect(x+5,y+15,2,4);X.fillRect(x+8,y+15,2,4);X.fillRect(x+11,y+15,2,4);
  // Puffed tail (straight up, dark gray)
  X.fillStyle=dc;X.fillRect(x-2,y+8,3,2);X.fillRect(x-3,y+4,3,5);X.fillRect(x-4,y+1,3,4);
  X.fillStyle=bc;X.fillRect(x-2,y+3,1,8); // tail inner
  // Shadow
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawScratchCat(x,y,af){
  const bc=E.lgray;
  const d=P.dir;
  const eo=d==="right"?0:2;
  // Body normal-ish but front paw extended and alternating
  X.fillStyle=bc;X.fillRect(x+1+eo,y,3,2);X.fillRect(x+2+eo,y-1,1,1);X.fillRect(x+8+eo,y,3,2);X.fillRect(x+9+eo,y-1,1,1);
  X.fillStyle=E.lmag;X.fillRect(x+2+eo,y,1,1);X.fillRect(x+9+eo,y,1,1);
  X.fillStyle=bc;X.fillRect(x+eo,y+2,12,7);X.fillRect(x+1+eo,y+1,10,1);
  // Focused eyes (narrow)
  X.fillStyle=E.yellow;
  X.fillRect(x+4+eo,y+4,2,1);X.fillRect(x+8+eo,y+4,2,1);
  X.fillStyle=E.black;X.fillRect(x+5+eo,y+4,1,1);X.fillRect(x+9+eo,y+4,1,1);
  X.fillStyle=E.lmag;X.fillRect(x+6+(d==="right"?0:-1),y+6,2,1);
  // Body
  X.fillStyle=bc;X.fillRect(x+2,y+9,10,6);
  // Legs - front paw scratching
  const phase=Math.floor(af/6)%2;
  X.fillStyle=bc;
  if(d==="right"){
    // Front right paw extended with claw marks
    X.fillRect(x+11,y+14+phase,2,4-phase);
    X.fillRect(x+8,y+15-phase,2,3+phase);
    // Claw sparks!
    X.fillStyle=E.yellow;
    if(phase===0){X.fillRect(x+14,y+16,1,1);X.fillRect(x+15,y+14,1,1);}
    else{X.fillRect(x+14,y+15,1,1);X.fillRect(x+13,y+17,1,1);}
  } else {
    X.fillRect(x+1,y+14+phase,2,4-phase);
    X.fillRect(x+4,y+15-phase,2,3+phase);
    X.fillStyle=E.yellow;
    if(phase===0){X.fillRect(x-1,y+16,1,1);X.fillRect(x-2,y+14,1,1);}
    else{X.fillRect(x-1,y+15,1,1);X.fillRect(x,y+17,1,1);}
  }
  // Back legs stable
  X.fillStyle=bc;X.fillRect(x+2,y+15,2,3);X.fillRect(x+5,y+15,2,3);
  if(d==="right"){X.fillRect(x+2,y+15,2,3);X.fillRect(x+5,y+15,2,3);}
  else{X.fillRect(x+8,y+15,2,3);X.fillRect(x+11,y+15,2,3);}
  // Paws
  X.fillStyle=E.white;X.fillRect(x+2,y+17,2,1);X.fillRect(x+5,y+17,2,1);X.fillRect(x+8,y+17,2,1);X.fillRect(x+11,y+17,2,1);
  // Tail excited
  const tw=Math.sin(af*0.5)*3;
  X.fillStyle=bc;
  if(d==="right"){X.fillRect(x-1,y+10,2,2);X.fillRect(x-3,y+7+tw,2,4);}
  else{X.fillRect(x+13,y+10,2,2);X.fillRect(x+15,y+7+tw,2,4);}
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawStretchCat(x,y,af){
  const bc=E.lgray;
  const t=af/60; // 0 to 1
  // Phase 1: front down, butt up. Phase 2: extend fully. Phase 3: back to normal
  const phase = t < 0.4 ? 0 : t < 0.75 ? 1 : 2;
  if(phase===0||phase===1){
    // Front half low, rear high
    const dip = phase===0 ? Math.min(af*0.3,4) : 4;
    // Head low
    X.fillStyle=bc;
    X.fillRect(x-2,y+6+dip,12,5); // head low and forward
    // Ears
    X.fillRect(x-1,y+4+dip,3,2);X.fillRect(x+6,y+4+dip,3,2);
    X.fillStyle=E.lmag;X.fillRect(x,y+4+dip,1,1);X.fillRect(x+7,y+4+dip,1,1);
    // Closed eyes (bliss)
    X.fillStyle=E.black;X.fillRect(x+2,y+8+dip,2,1);X.fillRect(x+6,y+8+dip,2,1);
    // Front paws extended forward
    X.fillStyle=bc;X.fillRect(x-4,y+15,6,2);X.fillRect(x-5,y+16,2,2);
    X.fillStyle=E.white;X.fillRect(x-5,y+17,2,1);
    // Body arched up
    X.fillStyle=bc;
    X.fillRect(x+4,y+4,10,8);
    // Rear end UP
    X.fillRect(x+8,y+2,6,6);
    // Back legs straight
    X.fillRect(x+10,y+8,2,10);X.fillRect(x+13,y+8,2,10);
    X.fillStyle=E.white;X.fillRect(x+10,y+17,2,1);X.fillRect(x+13,y+17,2,1);
    // Tail straight up!
    X.fillStyle=bc;X.fillRect(x+14,y+2,2,2);X.fillRect(x+15,y-1,2,4);
  } else {
    // Returning to normal
    drawNormalCat(x,y,P.dir,0,false);
  }
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawSleepCat(x,y){
  const bc=E.lgray;
  // Curled up ball
  X.fillStyle=bc;
  X.fillRect(x+1,y+8,12,8); // body ball
  X.fillRect(x+3,y+7,8,1);
  X.fillRect(x+2,y+16,10,2);
  // Head tucked
  X.fillRect(x,y+10,4,5);
  // Ears
  X.fillRect(x,y+9,2,2);X.fillRect(x+3,y+9,2,2);
  X.fillStyle=E.lmag;X.fillRect(x+1,y+9,1,1);X.fillRect(x+4,y+9,1,1);
  // Closed eyes
  X.fillStyle=E.black;X.fillRect(x+1,y+12,1,1);
  // Tail wrapped around
  X.fillStyle=bc;X.fillRect(x+12,y+14,3,2);X.fillRect(x+14,y+12,2,3);
  // Z's floating
  const zf=Math.floor(Date.now()/500)%3;
  X.fillStyle=E.white;
  dC("Z",x+6,y+3-zf,E.white);
  if(zf>0)dC("Z",x+10,y+1-zf,E.lgray);
  // Shadow
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawGroomCat(x,y,af){
  const bc=E.lgray;
  const phase=Math.floor(af/10)%3;
  // Sitting, licking paw
  X.fillStyle=bc;
  // Ears
  X.fillRect(x+2,y,3,2);X.fillRect(x+2,y-1,1,1);X.fillRect(x+8,y,3,2);X.fillRect(x+9,y-1,1,1);
  X.fillStyle=E.lmag;X.fillRect(x+3,y,1,1);X.fillRect(x+9,y,1,1);
  // Head
  X.fillStyle=bc;X.fillRect(x+1,y+2,12,7);
  // Closed eyes
  X.fillStyle=E.black;X.fillRect(x+4,y+4,2,1);X.fillRect(x+8,y+4,2,1);
  // Tongue out toward paw
  X.fillStyle=E.lred;X.fillRect(x+6,y+7,2,1);
  // Body
  X.fillStyle=bc;X.fillRect(x+2,y+9,10,6);
  // Paw raised to face
  const pawY = y + 6 + (phase===1?-1:0);
  X.fillStyle=bc;X.fillRect(x+12,pawY,3,3);
  X.fillStyle=E.white;X.fillRect(x+13,pawY+2,2,1);
  // Other legs
  X.fillStyle=bc;X.fillRect(x+2,y+15,2,3);X.fillRect(x+5,y+15,2,3);X.fillRect(x+8,y+15,2,3);
  X.fillStyle=E.white;X.fillRect(x+2,y+17,2,1);X.fillRect(x+5,y+17,2,1);X.fillRect(x+8,y+17,2,1);
  // Tail
  const tw=Math.sin(Date.now()/500)*1;
  X.fillStyle=bc;X.fillRect(x-1,y+12,2,2);X.fillRect(x-3,y+10+tw,2,3);
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawEatCat(x,y,af){
  const bc=E.lgray;
  const bob=Math.floor(af/4)%2;
  // Head bobbing down
  X.fillStyle=bc;
  X.fillRect(x+2,y+1-bob,3,2);X.fillRect(x+8,y+1-bob,3,2);
  X.fillStyle=E.lmag;X.fillRect(x+3,y+1-bob,1,1);X.fillRect(x+9,y+1-bob,1,1);
  X.fillStyle=bc;X.fillRect(x+1,y+3-bob,12,7);
  // Happy closed eyes
  X.fillStyle=E.black;X.fillRect(x+4,y+5-bob,2,1);X.fillRect(x+8,y+5-bob,2,1);
  // Mouth
  X.fillStyle=E.lmag;X.fillRect(x+6,y+8-bob,2,1);
  // Body
  X.fillStyle=bc;X.fillRect(x+2,y+9,10,6);
  // Legs
  X.fillRect(x+2,y+15,2,3);X.fillRect(x+5,y+15,2,3);X.fillRect(x+8,y+15,2,3);X.fillRect(x+11,y+15,2,3);
  X.fillStyle=E.white;X.fillRect(x+2,y+17,2,1);X.fillRect(x+5,y+17,2,1);X.fillRect(x+8,y+17,2,1);X.fillRect(x+11,y+17,2,1);
  // Tail happy wag
  const tw=Math.sin(af*0.4)*2;
  X.fillStyle=bc;X.fillRect(x-1,y+10,2,2);X.fillRect(x-3,y+8+tw,2,3);
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

function drawMeowCat(x,y,af){
  const bc=E.lgray,d=P.dir;
  const eo=d==="right"?0:2;
  const mouthOpen=Math.floor(af/6)%2;
  // Ears
  X.fillStyle=bc;X.fillRect(x+1+eo,y,3,2);X.fillRect(x+2+eo,y-1,1,1);X.fillRect(x+8+eo,y,3,2);X.fillRect(x+9+eo,y-1,1,1);
  X.fillStyle=E.lmag;X.fillRect(x+2+eo,y,1,1);X.fillRect(x+9+eo,y,1,1);
  // Head
  X.fillStyle=bc;X.fillRect(x+eo,y+2,12,7);X.fillRect(x+1+eo,y+1,10,1);
  // Eyes (wide)
  X.fillStyle=E.yellow;
  if(d==="right"){X.fillRect(x+5,y+4,2,2);X.fillRect(x+9,y+4,2,2);X.fillStyle=E.black;X.fillRect(x+6,y+4,1,2);X.fillRect(x+10,y+4,1,2);}
  else{X.fillRect(x+3,y+4,2,2);X.fillRect(x+7,y+4,2,2);X.fillStyle=E.black;X.fillRect(x+3,y+4,1,2);X.fillRect(x+7,y+4,1,2);}
  // MOUTH - open for meow!
  if(mouthOpen){
    X.fillStyle=E.lred;X.fillRect(x+5+(d==="right"?1:0),y+7,3,2);
    X.fillStyle=E.white;X.fillRect(x+5+(d==="right"?1:0),y+7,1,1); // tooth
  } else {
    X.fillStyle=E.lmag;X.fillRect(x+6+(d==="right"?0:-1),y+7,2,1);
  }
  // Sound waves!
  X.fillStyle=E.yellow;
  const wx=d==="right"?x+14:x-4;
  if(af%6<3){X.fillRect(wx,y+4,1,1);X.fillRect(wx+1,y+3,1,1);X.fillRect(wx+1,y+5,1,1);}
  // Body + legs normal
  X.fillStyle=bc;X.fillRect(x+2,y+9,10,6);
  X.fillStyle=E.dgray;X.fillRect(x+4,y+10,1,4);X.fillRect(x+7,y+10,1,4);X.fillRect(x+10,y+10,1,4);
  X.fillStyle=bc;X.fillRect(x+2,y+15,2,3);X.fillRect(x+5,y+15,2,3);X.fillRect(x+8,y+15,2,3);X.fillRect(x+11,y+15,2,3);
  X.fillStyle=E.white;X.fillRect(x+2,y+17,2,1);X.fillRect(x+5,y+17,2,1);X.fillRect(x+8,y+17,2,1);X.fillRect(x+11,y+17,2,1);
  const tw=Math.sin(Date.now()/300)*1.5;
  X.fillStyle=bc;
  if(d==="right"){X.fillRect(x-1,y+10,2,2);X.fillRect(x-3,y+8+tw,2,3);X.fillRect(x-4,y+6+tw,2,3);}
  else{X.fillRect(x+13,y+10,2,2);X.fillRect(x+15,y+8+tw,2,3);X.fillRect(x+16,y+6+tw,2,3);}
  X.fillStyle="rgba(0,0,0,0.15)";X.fillRect(x,y+18,14,1);
}

// ── DRAW: UI OVERLAYS ──────────────────────────────────────
let _urlHitBox=null; // {x,y,w,h,url} — set each frame when a URL line is visible
function drawMBox(){
  if(!msgBox)return;
  _urlHitBox=null;
  const ls=msgBox.lines,lh=10,pad=8,bw=260;
  const bh=ls.length*lh+pad*2+6;
  const bx=(GW-bw)/2,by=16;
  X.fillStyle="rgba(0,0,0,0.5)";X.fillRect(bx+3,by+3,bw,bh);
  X.fillStyle=E.blue;X.fillRect(bx,by,bw,bh);
  X.fillStyle=E.white;X.fillRect(bx,by,bw,1);X.fillRect(bx,by+bh-1,bw,1);X.fillRect(bx,by,1,bh);X.fillRect(bx+bw-1,by,1,bh);
  X.fillStyle=E.lcyan;X.fillRect(bx+2,by+2,bw-4,1);X.fillRect(bx+2,by+bh-3,bw-4,1);X.fillRect(bx+2,by+2,1,bh-4);X.fillRect(bx+bw-3,by+2,1,bh-4);
  for(let i=0;i<ls.length;i++){
    const line=ls[i];
    if(line.startsWith("http")){
      // Render URL in small native font, cyan + underline
      X.save();
      X.font="7px monospace";X.fillStyle=E.lcyan;X.textAlign="center";
      const ty=by+pad+2+i*lh+6;
      X.fillText(line,bx+bw/2,ty);
      const tw=X.measureText(line).width;
      const lx=Math.round(bx+bw/2-tw/2);
      X.fillStyle=E.lcyan;X.fillRect(lx,ty+1,Math.ceil(tw),1);
      X.restore();
      // Store hit box in canvas logical coords
      _urlHitBox={x:lx,y:ty-8,w:Math.ceil(tw),h:10,url:line};
    } else {
      const tw=tW(line);dT(line,bx+(bw-tw)/2,by+pad+2+i*lh,E.white);
    }
  }
  const h="ENTER";dT(h,bx+bw-tW(h)-6,by+bh-8,E.dgray);
}
function drawParser(){
  if(!parserText)return;
  const bw=GW-20,bh=16,bx=10,by=GH-24;
  X.fillStyle=E.black;X.fillRect(bx-1,by-1,bw+2,bh+2);X.fillStyle=E.blue;X.fillRect(bx,by,bw,bh);
  X.fillStyle=E.white;X.fillRect(bx,by,bw,1);X.fillRect(bx,by+bh,bw,1);X.fillRect(bx,by,1,bh);X.fillRect(bx+bw-1,by,1,bh);
  const cur=(Math.floor(Date.now()/400)%2)?"_":" ";
  dT("> "+parserText+cur,bx+4,by+4,E.lgreen);
}
function drawInv(){
  if(uiState!=="inventory")return;
  const bw=180,bh=90,bx=(GW-bw)/2,by=45;
  X.fillStyle="rgba(0,0,0,0.6)";X.fillRect(0,0,GW,GH);
  X.fillStyle=E.black;X.fillRect(bx,by,bw,bh);
  X.fillStyle=E.yellow;X.fillRect(bx,by,bw,1);X.fillRect(bx,by+bh,bw,1);X.fillRect(bx,by,1,bh);X.fillRect(bx+bw-1,by,1,bh);
  X.fillStyle=E.brown;X.fillRect(bx+2,by+2,bw-4,1);X.fillRect(bx+2,by+bh-2,bw-4,1);X.fillRect(bx+2,by+2,1,bh-4);X.fillRect(bx+bw-3,by+2,1,bh-4);
  const ti="INVENTORY";dT(ti,bx+(bw-tW(ti))/2,by+6,E.yellow);
  if(!inventory.length)dT("You carry nothing.",bx+12,by+22,E.lgray);
  else for(let i=0;i<inventory.length;i++)dT("* "+inventory[i],bx+12,by+22+i*10,E.white);
  dT("ESC/ENTER TO CLOSE",bx+(bw-tW("ESC/ENTER TO CLOSE"))/2,by+bh-12,E.dgray);
}
function drawTopBar(){
  X.fillStyle=E.blue;X.fillRect(0,0,GW,TOP);
  dT("CAT'S QUEST",4,3,E.white);
  const rn={dining:"THE DINING ROOM",kitchen:"THE KITCHEN",bedroom:"THE BEDROOM"}[currentRoom]||"";dT(rn,(GW-tW(rn))/2,3,E.lcyan);
  const sc="SCORE:"+score;dT(sc,GW-tW(sc)-4,3,E.yellow);
}

// ── DEBUG MODE ─────────────────────────────────────────────
let debugMode = false;
function drawDebug(){
  // Walkable strip — EXACT same values as the ny clamp in updateP
  const nyMin=125, nyMax=FLOOR+30, catH=18;
  X.fillStyle="rgba(0,255,0,0.12)";
  X.fillRect(0, nyMin, GW, nyMax-nyMin+catH); // full cat extent at max depth
  X.fillStyle="rgba(0,255,0,0.8)";
  X.fillRect(0, nyMin,       GW, 1); // top: cat can't go above this
  X.fillRect(0, nyMax,       GW, 1); // bottom: cat top-left max y
  X.fillRect(0, nyMax+catH,  GW, 1); // cat feet at max depth

  // Collision boxes (orange outline + fill)
  for(const b of colliders[currentRoom]){
    X.fillStyle="rgba(255,100,0,0.2)";
    X.fillRect(b.x, b.y, b.w, b.h);
    X.strokeStyle="rgba(255,165,0,1)";
    X.lineWidth=1;
    X.strokeRect(b.x+0.5, b.y+0.5, b.w, b.h);
  }

  // Cat bounding box (red)
  X.strokeStyle="rgba(255,50,50,1)";
  X.lineWidth=1;
  X.strokeRect(P.x+0.5, P.y+0.5, 14, 18);

  // HUD: cat coords
  X.fillStyle="rgba(0,0,0,0.75)";X.fillRect(2,GH-34,130,11);
  X.fillStyle="#fff";X.font="9px monospace";
  X.fillText("x:"+Math.round(P.x)+" y:"+Math.round(P.y)+" (FLOOR-y:"+(FLOOR-Math.round(P.y))+")",4,GH-25);

  // Grid lines every 20px with coordinate labels
  X.font="6px monospace";
  for(let gx=0;gx<=GW;gx+=20){
    X.fillStyle="rgba(255,255,255,0.15)";
    X.fillRect(gx,TOP,1,GH-TOP);
    X.fillStyle="rgba(255,255,0,0.7)";
    X.fillText(gx, gx+1, TOP+8);
  }
  for(let gy=0;gy<=GH;gy+=20){
    X.fillStyle="rgba(255,255,255,0.15)";
    X.fillRect(0,gy,GW,1);
    X.fillStyle="rgba(255,255,0,0.7)";
    X.fillText(gy, 2, gy-1);
  }

  // Legend
  X.fillStyle="rgba(0,0,0,0.75)";X.fillRect(GW-74,GH-34,72,11);
  X.fillStyle="#ffaa00";X.fillText("D = debug off",GW-72,GH-25);
}

function drawSleepingDog(x,y){
  const bc="#AA6622",lc="#CC8833",dc="#884400";
  // Body - loaf shape
  X.fillStyle=bc;X.fillRect(x,y+2,42,10);X.fillRect(x+2,y,38,4);
  // Head - left end, resting down
  X.fillStyle=lc;X.fillRect(x-8,y+4,12,8);X.fillRect(x-6,y+2,10,4);
  // Floppy ears
  X.fillStyle=dc;X.fillRect(x-10,y+4,4,10);X.fillRect(x-4,y+2,4,4);
  // Closed eyes - just a line
  X.fillStyle=E.black;X.fillRect(x-5,y+6,5,1);
  // Nose
  X.fillStyle=E.black;X.fillRect(x-8,y+8,4,3);X.fillStyle=lc;X.fillRect(x-7,y+8,2,1);
  // Tail curled at right end
  X.fillStyle=bc;X.fillRect(x+40,y,4,4);X.fillRect(x+42,y+2,4,6);X.fillRect(x+40,y+6,4,4);
  // Paws peeking out front
  X.fillStyle=lc;X.fillRect(x+6,y+11,8,4);X.fillRect(x+20,y+11,8,4);
  // Drool
  X.fillStyle=E.lblue;X.fillRect(x-9,y+11,2,3);X.fillRect(x-9,y+13,1,2);
  // Animated ZZZs
  const t=Math.floor(Date.now()/700)%3;
  if(t>=0)dT("Z",x+4,y-8,E.white);
  if(t>=1)dT("Z",x+10,y-14,E.lgray);
  if(t>=2)dT("Z",x+16,y-20,E.dgray);
}

// Max alert — same scale as sleeping, head lifted a few px, eyes open, mouth open, tail wagging
function drawAlertDog(x,y){
  const bc="#AA6622",lc="#CC8833",dc="#884400";
  // Body — same as sleeping
  X.fillStyle=bc;X.fillRect(x,y+2,42,10);X.fillRect(x+2,y,38,4);
  // Paws
  X.fillStyle=lc;X.fillRect(x+6,y+11,8,4);X.fillRect(x+20,y+11,8,4);
  // Head — lifted 6px above sleeping position (was y+4, now y-2)
  X.fillStyle=lc;X.fillRect(x-8,y-2,12,8);X.fillRect(x-6,y-4,10,4);
  // Ears
  X.fillStyle=dc;X.fillRect(x-10,y-2,4,8);X.fillRect(x-4,y-4,4,4);
  // Eyes — open (two dots with white glints)
  X.fillStyle=E.black;X.fillRect(x-6,y-1,2,2);X.fillRect(x-2,y-1,2,2);
  X.fillStyle=E.white;X.fillRect(x-6,y-1,1,1);X.fillRect(x-2,y-1,1,1);
  // Nose
  X.fillStyle=E.black;X.fillRect(x-8,y+2,4,2);X.fillStyle=lc;X.fillRect(x-7,y+2,2,1);
  // Open mouth + tongue (small)
  X.fillStyle=E.black;X.fillRect(x-7,y+4,6,2);
  X.fillStyle=E.lred;X.fillRect(x-6,y+4,4,2);
  // Tail wagging
  const wag=Math.round(Math.sin(Date.now()/80)*4);
  X.fillStyle=bc;
  X.fillRect(x+40,y+wag,4,4);X.fillRect(x+42,y-2+Math.round(wag*0.6),4,5);X.fillRect(x+44,y-5+Math.round(wag*0.3),4,5);
  // ! above head — bright yellow, drawn last so always on top
  X.fillStyle="#FF00FF";X.fillRect(x-1,y-22,2,7);X.fillRect(x-1,y-13,2,2);
}

function drawBedroom(){
  // Walls - warm mauve
  X.fillStyle="#994477";X.fillRect(0,TOP,GW,FLOOR-TOP);
  // Wallpaper - tiny diamond pattern
  for(let wy=TOP+5;wy<FLOOR-10;wy+=10)for(let wx=4;wx<GW-4;wx+=10){X.fillStyle="#AA5588";X.fillRect(wx+4,wy,2,1);X.fillRect(wx+3,wy+1,4,1);X.fillRect(wx+4,wy+2,2,1);}
  // Floor - same hardwood as dining
  X.fillStyle=E.brown;X.fillRect(0,FLOOR-6,GW,6);X.fillStyle=E.yellow;X.fillRect(0,FLOOR-7,GW,1);
  X.fillStyle=E.brown;X.fillRect(0,FLOOR,GW,GH-FLOOR);X.fillStyle="#884400";for(let i=0;i<8;i++)X.fillRect(0,FLOOR+i*4,GW,1);X.fillStyle="#773300";for(let x=0;x<GW;x+=32)X.fillRect(x,FLOOR,1,GH-FLOOR);
  // Rug - on the floor surface (y > FLOOR=142, not on the wall!)
  X.fillStyle="#AA0044";X.fillRect(76,FLOOR+14,170,30);X.fillStyle="#CC2255";X.fillRect(78,FLOOR+16,166,24);
  for(let rx=80;rx<244;rx+=8){X.fillStyle="#AA0044";X.fillRect(rx,FLOOR+16,4,3);X.fillRect(rx,FLOOR+38,4,3);}
  // Window - left side (above bed)
  X.fillStyle=E.lmag;X.fillRect(8,22,5,50);X.fillRect(52,22,5,50);X.fillStyle=E.mag;X.fillRect(9,22,3,50);X.fillRect(53,22,3,50);X.fillStyle=E.brown;X.fillRect(6,20,54,2);
  X.fillStyle=E.white;X.fillRect(14,24,36,46);X.fillStyle="#FFEEBB";X.fillRect(15,25,34,44); // warm daylight
  X.fillStyle=E.white;X.fillRect(32,24,2,46);X.fillRect(14,46,36,2); // cross
  // Bed frame - x=8–86, legs reach to floor
  X.fillStyle=E.brown;X.fillRect(8,70,78,6); // headboard rail
  X.fillStyle="#884400";X.fillRect(8,70,6,72);X.fillRect(80,70,6,72); // posts to floor
  X.fillStyle=E.brown;X.fillRect(8,118,78,4); // footboard rail
  X.fillStyle="#663300";X.fillRect(10,122,6,20);X.fillRect(78,122,6,20); // front legs
  // Mattress
  X.fillStyle=E.white;X.fillRect(14,76,66,44);
  // Pillows — two side by side
  X.fillStyle=E.lgray;X.fillRect(16,78,28,10);X.fillStyle=E.white;X.fillRect(17,79,26,8);
  X.fillStyle=E.lgray;X.fillRect(46,78,28,10);X.fillStyle=E.white;X.fillRect(47,79,26,8);
  // Blanket - orange/gold
  X.fillStyle="#FFAA33";X.fillRect(14,88,66,30);X.fillStyle="#FF8811";X.fillRect(14,88,66,3);
  X.fillStyle="#FFCC55";X.fillRect(14,91,66,2);
  X.fillStyle="#DD8822";X.fillRect(28,88,2,30);X.fillRect(48,88,2,30);X.fillRect(68,88,2,22);
  // Dog on bed — sleeping normally, alert when chase squeak plays
  if(!itemsFound.chaseTriggered){
    if(anim.type==="alert") drawAlertDog(18,84);
    else drawSleepingDog(18,84);
  }
  // Mirror first — behind dresser and cat
  X.fillStyle=E.brown;X.fillRect(234,28,42,58);
  X.fillStyle="#4499AA";X.fillRect(236,30,38,54);
  X.fillStyle="#AACCCC";X.fillRect(238,32,34,50);
  X.fillStyle=E.brown;X.fillRect(234,28,42,2);X.fillRect(234,84,42,2);X.fillRect(234,28,2,58);X.fillRect(274,28,2,58);
  // Dresser
  X.fillStyle=E.brown;X.fillRect(230,88,50,54);            // outer shell
  X.fillStyle=E.brown;X.fillRect(230,88,2,54);X.fillRect(278,88,2,54); // side rails
  X.fillStyle=E.brown;X.fillRect(230,88,50,4);             // top rail
  if(P.layer==="dresser"){
    X.fillStyle="#221100";X.fillRect(232,92,46,12);         // void behind cat
  } else {
    X.fillStyle="#221100";X.fillRect(232,92,46,3);          // ajar gap
    X.fillStyle="#884400";X.fillRect(232,95,46,9);          // top drawer face
    X.fillStyle=E.yellow;X.fillRect(253,99,4,3);            // top knob
  }
  X.fillStyle=E.brown;X.fillRect(230,104,50,4);             // divider
  X.fillStyle="#884400";X.fillRect(232,108,46,11);          // mid face
  X.fillStyle=E.yellow;X.fillRect(253,112,4,3);             // mid knob
  X.fillStyle=E.brown;X.fillRect(230,119,50,3);             // divider
  X.fillStyle="#884400";X.fillRect(232,122,46,20);          // bottom face
  X.fillStyle=E.yellow;X.fillRect(253,129,4,3);             // bottom knob
  // Closet door — keystoned shape, hinged left
  // TL(113,39) TR(153,34) BR(153,144) BL(113,142)
  // Top slopes UP 5px L→R. Bottom slopes DOWN 2px L→R. Left fills wall to floor.

  // Frame — flat, in wall plane
  X.fillStyle=E.brown;X.fillRect(110,37,50,FLOOR-37);
  X.fillStyle=E.yellow;X.fillRect(110,37,50,1);
  X.fillStyle=E.yellow;X.fillRect(110,37,1,FLOOR-37);
  X.fillStyle=E.yellow;X.fillRect(159,37,1,FLOOR-37);

  // Darkness behind door
  X.fillStyle="#0A0A14";X.fillRect(112,38,46,FLOOR-38);

  // Door face
  X.fillStyle="#7A4010";
  X.beginPath();X.moveTo(113,39);X.lineTo(153,34);X.lineTo(153,141);X.lineTo(113,140);X.closePath();X.fill();

  // Top edge highlight
  X.fillStyle="#996622";
  X.beginPath();X.moveTo(113,39);X.lineTo(153,34);X.lineTo(153,35);X.lineTo(113,40);X.closePath();X.fill();

  // Door thickness edge — top=34 bot=141
  X.fillStyle="#3D1F05";
  X.beginPath();X.moveTo(153,34);X.lineTo(156,34);X.lineTo(156,141);X.lineTo(153,141);X.closePath();X.fill();

  // Doorknob — moved 2px left
  X.fillStyle="#CCAA00";X.fillRect(145,91,6,6);
  X.fillStyle="#FFDD44";X.fillRect(146,92,4,4);
  X.fillStyle="#AA8800";X.fillRect(145,97,6,2);

  // Photo of Max in the garden — x=181–218 (38px), y=52–84 (32px)
  // Frame
  X.fillStyle="#884400";X.fillRect(181,52,38,32);
  X.fillStyle="#FFCC88";X.fillRect(182,53,1,30);X.fillRect(182,53,36,1); // highlight
  // Interior: x=183–217 (35px), y=54–82 (28px)
  // Sky — upper 10px
  X.fillStyle=E.lblue;X.fillRect(183,54,35,10);
  // Sun
  X.fillStyle=E.yellow;X.fillRect(211,56,3,3);
  // Fluffy clouds
  X.fillStyle=E.white;X.fillRect(185,56,7,3);X.fillRect(184,57,9,2);
  X.fillStyle=E.white;X.fillRect(195,55,5,3);X.fillRect(194,56,7,2);
  // Grass ground — lower 18px
  X.fillStyle="#228822";X.fillRect(183,64,35,18);
  // Lighter grass surface strip
  X.fillStyle=E.lgreen;X.fillRect(183,64,35,2);
  // Some grass blades
  X.fillStyle="#33AA33";X.fillRect(184,62,1,3);X.fillRect(188,63,1,2);X.fillRect(214,62,1,3);X.fillRect(210,63,1,2);
  // Max — sitting centered around x=198, on the grass at y=64
  // Haunches / body sitting
  X.fillStyle="#CC8833";X.fillRect(193,66,16,16);
  X.fillStyle="#FFAA44";X.fillRect(195,68,12,13);
  // Front paws
  X.fillStyle="#CC8833";X.fillRect(194,78,4,4);X.fillRect(205,78,4,4);
  X.fillStyle="#FFAA44";X.fillRect(195,79,3,3);X.fillRect(206,79,3,3);
  // Head
  X.fillStyle="#CC8833";X.fillRect(194,57,14,11);X.fillRect(193,58,16,9);
  X.fillStyle="#FFAA44";X.fillRect(195,58,12,9);
  // Floppy ears hanging down sides
  X.fillStyle="#AA5500";X.fillRect(192,57,3,12);X.fillRect(207,57,3,12);
  // Eyes — bright and happy
  X.fillStyle=E.black;X.fillRect(196,60,2,2);X.fillRect(204,60,2,2);
  X.fillStyle=E.white;X.fillRect(196,60,1,1);X.fillRect(204,60,1,1);
  // Nose
  X.fillStyle=E.black;X.fillRect(198,64,6,2);X.fillStyle="#CC6644";X.fillRect(199,64,4,1);
  // Big lolling tongue
  X.fillStyle=E.lred;X.fillRect(198,66,6,4);X.fillRect(197,67,8,3);
  X.fillStyle="#FF7777";X.fillRect(199,66,4,2);
  // Tail curled up behind — barely visible at right
  X.fillStyle="#CC8833";X.fillRect(209,70,3,6);X.fillRect(210,66,3,5);X.fillRect(211,64,2,3);
  // Doorway east (to dining)
  X.fillStyle=E.brown;X.fillRect(GW-10,66,10,FLOOR-66);X.fillStyle="#221100";X.fillRect(GW-8,68,8,FLOOR-70);X.fillStyle=E.yellow;X.fillRect(GW-10,66,1,FLOOR-66);X.fillRect(GW-10,66,10,1);
}
// drawDresserFg — only called when cat is ON dresser layer
// Draws top drawer face+knob over the cat
function drawDresserFg(){
  X.fillStyle="#884400";X.fillRect(232,95,46,9);   // top drawer face over cat
  X.fillStyle=E.yellow;X.fillRect(253,99,4,3);     // knob
}

// ── DOOR DEBUG OVERLAY ─────────────────────────────────────
// Extends 5px beyond frame on all sides.
// Frame is world x=110,y=37,w=50,h=FLOOR-37. Box origin = world (105,32).
function drawDoorDebug(){
  const OX=105, OY=32;
  const BW=60, BH=(FLOOR+5)-OY;
  // Semi-transparent backdrop
  X.fillStyle="rgba(0,0,0,0.55)";X.fillRect(OX,OY,BW,BH);
  // 5px grid — dim lines
  X.lineWidth=1;
  for(let lx=0;lx<=BW;lx+=5){
    X.strokeStyle=lx%10===0?"rgba(0,255,255,0.35)":"rgba(0,255,255,0.12)";
    X.beginPath();X.moveTo(OX+lx+0.5,OY);X.lineTo(OX+lx+0.5,OY+BH);X.stroke();
  }
  for(let ly=0;ly<=BH;ly+=5){
    X.strokeStyle=ly%10===0?"rgba(0,255,255,0.35)":"rgba(0,255,255,0.12)";
    X.beginPath();X.moveTo(OX,OY+ly+0.5);X.lineTo(OX+BW,OY+ly+0.5);X.stroke();
  }
  // Labels every 10px — same font as existing debug grid
  X.font="6px monospace";
  for(let lx=0;lx<=BW;lx+=10){
    X.fillStyle="rgba(255,255,0,0.85)";
    X.fillText(String(lx),OX+lx+1,OY+8);
  }
  for(let ly=0;ly<=BH;ly+=10){
    X.fillStyle="rgba(255,255,0,0.85)";
    X.fillText(String(ly),OX+1,OY+ly+7);
  }
  // Frame outline in yellow — local (5,5), w=50, h=BH-10
  X.strokeStyle="#FFFF00";X.lineWidth=1;
  X.strokeRect(OX+5+0.5,OY+5+0.5,50,BH-10);
  // Box border
  X.strokeStyle="#00FFFF";X.lineWidth=1;X.strokeRect(OX+0.5,OY+0.5,BW-1,BH-1);
}

// ── MAIN LOOP ──────────────────────────────────────────────
