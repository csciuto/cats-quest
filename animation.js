// ── ANIMATION SYSTEM ───────────────────────────────────────
// Special cat animations that play out over frames.
// anim.type = null means no animation playing.
let anim={type:null,frame:0,maxFrames:0,onDone:null,jumpUp:false};

function startAnim(type,frames,doneCb,isJumpUp){
  anim={type,frame:0,maxFrames:frames,onDone:doneCb||null,jumpUp:!!isJumpUp};
}

function tickAnim(){
  if(!anim.type)return;
  anim.frame++;
  if(anim.frame>=anim.maxFrames){
    const cb=anim.onDone;
    anim={type:null,frame:0,maxFrames:0,onDone:null};
    if(cb)cb();
  }
}

function isAnimating(){return anim.type!==null;}
