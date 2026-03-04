// ── EMBEDDED TEST RUNNER ───────────────────────────────────
function runTests(){
  const G=window._test;
  // Play fanfare quietly, then stub sfx so test commands are silent
  ea(); masterGain.gain.value=0.15; sfx.fanfare();
  const _sfxSave={}; for(const k of Object.keys(sfx)){_sfxSave[k]=sfx[k]; sfx[k]=()=>{};}

  let _p=0,_f=0,_t=0,_secs=[];let _cur=null;
  function sec(n){_cur={name:n,tests:[]};_secs.push(_cur);}
  function ok(desc,cond){_t++;if(cond){_p++;}else{_f++;}_cur.tests.push({desc,ok:!!cond});}
  function eq(desc,a,e){_t++;const pass=a===e;if(pass){_p++;}else{_f++;}_cur.tests.push({desc:(pass?desc:`${desc} (expected ${JSON.stringify(e)}, got ${JSON.stringify(a)})`),ok:pass});}
  function inc(desc,a,s){_t++;const pass=typeof a==="string"&&a.includes(s);if(pass){_p++;}else{_f++;}_cur.tests.push({desc:(pass?desc:`${desc} (expected to include "${s}", got ${JSON.stringify(a)})`),ok:pass});}

  try {
  // ── VERB MATCHING ──────────────────────────────────────────
  sec("Verb Matching");
  eq("'examine' → look",G.matchVerb("examine"),"look");
  eq("'sniff' → smell",G.matchVerb("sniff"),"smell");
  eq("'claw' → scratch",G.matchVerb("claw"),"scratch");
  eq("'swipe at' → scratch",G.matchVerb("swipe at"),"scratch");
  eq("'jump' → climb",G.matchVerb("jump"),"climb");
  eq("'pounce' → climb",G.matchVerb("pounce"),"climb");
  eq("'devour' → eat",G.matchVerb("devour"),"eat");
  eq("'lap' → drink",G.matchVerb("lap"),"drink");
  eq("'grab' → take",G.matchVerb("grab"),"take");
  eq("'knead' → touch",G.matchVerb("knead"),"touch");
  eq("'sleep on' → sit",G.matchVerb("sleep on"),"sit");
  eq("'nap on' → sit",G.matchVerb("nap on"),"sit");
  eq("'yell' → talk",G.matchVerb("yell"),"talk");
  eq("unknown → null",G.matchVerb("flibbertigibbet"),null);

  // ── NOUN MATCHING ──────────────────────────────────────────
  sec("Noun Matching - Dining Room");
  eq("'table' → table",G.matchNoun("table","dining"),"table");
  eq("'oak' → table",G.matchNoun("oak","dining"),"table");
  eq("'curtains' → window",G.matchNoun("curtains","dining"),"window");
  eq("'portrait' → painting",G.matchNoun("portrait","dining"),"painting");
  eq("'kibble' → bowl",G.matchNoun("kibble","dining"),"bowl");
  eq("'fridge' → null in dining",G.matchNoun("fridge","dining"),null);

  sec("Noun Matching - Kitchen");
  eq("'refrigerator' → fridge",G.matchNoun("refrigerator","kitchen"),"fridge");
  eq("'oven' → stove",G.matchNoun("oven","kitchen"),"stove");
  eq("'faucet' → sink",G.matchNoun("faucet","kitchen"),"sink");
  eq("'cupboard' → cabinet",G.matchNoun("cupboard","kitchen"),"cabinet");
  eq("'saucepan' → pot",G.matchNoun("saucepan","kitchen"),"pot");
  eq("'table' → null in kitchen",G.matchNoun("table","kitchen"),null);

  sec("Noun Matching - Bedroom");
  eq("'bed' → bed",G.matchNoun("bed","bedroom"),"bed");
  eq("'mattress' → bed",G.matchNoun("mattress","bedroom"),"bed");
  eq("'blanket' → bed",G.matchNoun("blanket","bedroom"),"bed");
  eq("'dog' → dog",G.matchNoun("dog","bedroom"),"dog");
  eq("'retriever' → dog",G.matchNoun("retriever","bedroom"),"dog");
  eq("'dresser' → dresser",G.matchNoun("dresser","bedroom"),"dresser");
  eq("'bureau' → dresser",G.matchNoun("bureau","bedroom"),"dresser");
  eq("'mirror' → mirror",G.matchNoun("mirror","bedroom"),"mirror");
  eq("'rug' → rug",G.matchNoun("rug","bedroom"),"rug");
  eq("'carpet' → rug",G.matchNoun("carpet","bedroom"),"rug");
  eq("'catnip' → catnip",G.matchNoun("catnip","bedroom"),"catnip");
  eq("'closet' → closet",G.matchNoun("closet","bedroom"),"closet");
  eq("'wardrobe' → closet",G.matchNoun("wardrobe","bedroom"),"closet");

  // ── COLLISION ─────────────────────────────────────────────
  sec("Collision System");
  ok("Dining: all floor walkable",!G.collides(160,124,"dining"));
  ok("Dining: left side walkable",!G.collides(40,124,"dining"));
  ok("Dining: right side walkable",!G.collides(260,124,"dining"));
  ok("Kitchen: center walkable",!G.collides(140,124,"kitchen"));
  ok("Kitchen: left side walkable",!G.collides(60,124,"kitchen"));
  ok("Bedroom: center walkable",!G.collides(160,124,"bedroom"));

  // ── TEXT WRAPPING ─────────────────────────────────────────
  sec("Text Wrapping");
  const w1=G.wrap("Hello world",200);
  eq("Short text = 1 line",w1.length,1);
  eq("Short text content",w1[0],"Hello world");
  const w2=G.wrap("This is a much longer sentence that should wrap across multiple lines when the width is small",100);
  ok("Long text wraps",w2.length>1);
  ok("Each line fits width",w2.every(l=>l.length*6<=106));

  // ── ROOM DESCRIPTIONS ────────────────────────────────────
  sec("Room Descriptions");
  G.reset();G.dismissMsg();G.parse("look");
  ok("look gives message",G.state.msgBox!==null);
  inc("look in dining mentions table",G.state.msgBox.lines.join(" "),"table");
  G.reset();G.dismissMsg();G.parse("go kitchen");G.dismissMsg();G.parse("look");
  inc("look in kitchen mentions fridge",G.state.msgBox.lines.join(" "),"fridge");
  G.reset();G.dismissMsg();G.parse("go bedroom");G.dismissMsg();G.parse("look");
  inc("look in bedroom mentions bed",G.state.msgBox.lines.join(" "),"bed");
  inc("look in bedroom mentions dog",G.state.msgBox.lines.join(" "),"retriever");

  // ── NAVIGATION ───────────────────────────────────────────
  sec("Navigation");
  G.reset();G.dismissMsg();
  eq("Start in dining",G.state.currentRoom,"dining");
  G.parse("go kitchen");eq("go kitchen → kitchen",G.state.currentRoom,"kitchen");G.dismissMsg();
  G.parse("go dining room");eq("go dining → dining",G.state.currentRoom,"dining");G.dismissMsg();
  G.parse("go bedroom");eq("go bedroom → bedroom",G.state.currentRoom,"bedroom");G.dismissMsg();
  G.parse("go east");eq("go east from bedroom → dining",G.state.currentRoom,"dining");G.dismissMsg();

  } catch(err) {
    if(_cur) _cur.tests.push({desc:"ERROR: "+err.message,ok:false});
    _f++;_t++;
  } finally {
    // Restore sfx
    for(const k of Object.keys(_sfxSave)) sfx[k]=_sfxSave[k];
    masterGain.gain.value=0.07;
  }

  // Show results overlay
  const ol=document.getElementById("_tov");
  const tb=document.getElementById("_ttb");
  ol.style.display="block";
  let html=`<b style="color:${_f>0?"#f55":"#5f5"}">${_p}/${_t} passed</b> (${_f} failed)<br><br>`;
  for(const s of _secs){
    html+=`<b>${s.name}</b><br>`;
    for(const t of s.tests) html+=`  ${t.ok?"✓":"✗"} ${t.desc}<br>`;
    html+=`<br>`;
  }
  tb.innerHTML=html;
}
