// ── MAIN LOOP ──────────────────────────────────────────────
function loop(){
  updateP();
  tickAnim();
  // Keep cat asleep once sleep starts after win
  if(itemsFound.won&&anim.type==="sleep"&&anim.maxFrames===9999&&anim.frame>=9998){
    startAnim("sleep",9999,null);
  }
  X.fillStyle=E.black;X.fillRect(0,0,GW,GH);
  drawTopBar();
  if(currentRoom==="dining")drawDining();else if(currentRoom==="kitchen")drawKitch();else drawBedroom();
  drawCat();
  if(currentRoom==="bedroom"&&P.layer==="dresser")drawDresserFg();
  if(debugMode)drawDebug();
  if(debugMode&&currentRoom==="bedroom")drawDoorDebug();
  if(uiState==="message")drawMBox();
  drawParser(); // always show if text present
  if(uiState==="inventory")drawInv();
  requestAnimationFrame(loop);
}

// ── EXPORTS FOR TESTING ────────────────────────────────────
window._test = {matchVerb,matchNoun,collides,wrap,parse,showMsg,dismissMsg,addScore,tickAnim,
  get state(){return{uiState,parserText,msgBox,msgQueue,inventory,currentRoom,score,petCount,itemsFound,P,anim};},
  setState(s){if(s.currentRoom!==undefined)currentRoom=s.currentRoom;if(s.uiState!==undefined)uiState=s.uiState;},
  reset(){uiState="play";parserText="";msgBox=null;msgQueue=[];inventory=[];currentRoom="dining";score=0;petCount=0;itemsFound={};P.x=160;P.y=FLOOR-16;P.dir="right";P.frame=0;P.moving=false;P.layer="floor";anim={type:null,frame:0,maxFrames:0,onDone:null};trashBarrelBox.disabled=false;}
};

// ── EMBEDDED TEST RUNNER ───────────────────────────────────

// ── START ─────────────────────────────────────────────────
requestAnimationFrame(loop);
