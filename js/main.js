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

// ── START ─────────────────────────────────────────────────
P.layer="floor"; P.x=160; P.y=FLOOR-16;
startAnim("sleep",9999,null);
setTimeout(()=>sfx.fanfare(),400);
showMsg("You are a distinguished grey cat. Your kingdom spans three rooms. You awake from your slumber.",()=>{
  anim={type:null,frame:0,maxFrames:0,onDone:null,jumpUp:false};
  sfx.stretch();
  startAnim("stretch",60,null);
});
showMsg("Something reaches your nose. There is a silver serving lid on the dining table — and whatever is underneath it smells absolutely extraordinary.");
showMsg("Arrow keys to move. Just start typing to enter commands. Good luck.");
requestAnimationFrame(loop);
