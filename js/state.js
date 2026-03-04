// ── GAME STATE ─────────────────────────────────────────────
let uiState="play";       // "play" | "message" | "inventory" | "gameover"
let parserText="";        // text typed by player (not yet submitted)
let msgBox=null;          // current message box {lines, cb}
let msgQueue=[];          // queued messages waiting to display
let inventory=[];         // items the cat is carrying
let currentRoom="dining"; // "dining" | "kitchen" | "bedroom"
let score=0;
let petCount=0;           // groom cycle counter
let itemsFound={};        // flags: visitedKitchen, clothFallen, chaseTriggered, etc.
const KD={};              // keyboard state (key → bool)

// ── MESSAGE SYSTEM ────────────────────────────────────────
function showMsg(t,cb){
  const ls=wrap(t,240);
  if(uiState==="message"&&msgBox){
    msgQueue.push({lines:ls,cb:cb||null});
  } else {
    msgBox={lines:ls,cb:cb||null};
    uiState="message";
  }
}

function dismissMsg(){
  // Fire the callback on the box being dismissed
  if(msgBox&&msgBox.cb){msgBox.cb();msgBox.cb=null;}
  if(msgQueue.length){msgBox=msgQueue.shift();}
  else{msgBox=null;uiState="play";}
}

function addScore(n){score+=n;sfx.score();}
