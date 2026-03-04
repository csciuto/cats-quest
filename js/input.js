// ── INPUT ──────────────────────────────────────────────────
document.addEventListener("keydown",e=>{
  const k=e.key;KD[k]=true;ea();

  // Message box: Enter/ESC dismisses
  if(uiState==="message"){
    e.preventDefault();
    if(k.startsWith("Arrow")) return; // arrows move cat but don't dismiss
    dismissMsg();
    if(k.length===1&&!e.ctrlKey&&!e.metaKey) parserText+=k;
    return;
  }
  // Inventory: ESC/Tab/Enter closes
  if(uiState==="inventory"){
    if(k==="Escape"||k==="Tab"||k==="Enter"){e.preventDefault();uiState="play";}
    else e.preventDefault();
    return;
  }

  // Play state (only remaining state)
  // Tab opens inventory
  if(k==="Tab"){e.preventDefault();uiState="inventory";return;}
  // Prevent browser defaults on game keys
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"," "].includes(k))e.preventDefault();

  // During animation, block typing — but allow during infinite win sleep
  if(isAnimating()&&!(anim.type==="sleep"&&anim.maxFrames===9999))return;

  // Enter: submit typed command
  if(k==="Enter"){
    e.preventDefault();
    if(parserText.trim()){const c=parserText;parserText="";parse(c);}
    return;
  }
  // Escape: clear text
  if(k==="Escape"){parserText="";return;}
  // Backspace
  if(k==="Backspace"){e.preventDefault();parserText=parserText.slice(0,-1);return;}
  // Typing: single printable chars (not arrow keys, not modifiers)
  if(k.length===1&&!e.ctrlKey&&!e.metaKey&&parserText.length<45){
    // Don't capture arrow-key movement letters while NOT typing
    // But once you start typing, all letters go to parser
    parserText+=k;
  }
});
document.addEventListener("keyup",e=>{KD[e.key]=false;});
document.addEventListener("keydown",e=>{if(e.key==="F1"){e.preventDefault();runTests();}},true);
C.addEventListener("click",e=>{
  if(!_urlHitBox)return;
  const r=C.getBoundingClientRect();
  const scaleX=GW/r.width, scaleY=GH/r.height;
  const cx=(e.clientX-r.left)*scaleX, cy=(e.clientY-r.top)*scaleY;
  const h=_urlHitBox;
  if(cx>=h.x&&cx<=h.x+h.w&&cy>=h.y&&cy<=h.y+h.h) window.open(h.url,"_blank");
});

