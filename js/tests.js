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

  sec("Collision System");
  ok("Dining: all floor walkable",!G.collides(160,124,"dining"));
  ok("Dining: left side walkable",!G.collides(40,124,"dining"));
  ok("Dining: right side walkable",!G.collides(260,124,"dining"));
  ok("Kitchen: center walkable",!G.collides(140,124,"kitchen"));
  ok("Kitchen: left side walkable",!G.collides(60,124,"kitchen"));
  ok("Bedroom: center walkable",!G.collides(160,124,"bedroom"));

  sec("Text Wrapping");
  const w1=G.wrap("Hello world",200);
  eq("Short text = 1 line",w1.length,1);
  eq("Short text content",w1[0],"Hello world");
  const w2=G.wrap("This is a much longer sentence that should wrap across multiple lines when the width is small",100);
  ok("Long text wraps",w2.length>1);
  ok("Each line fits width",w2.every(l=>l.length*6<=106));

  sec("Room Descriptions");
  G.reset();G.dismissMsg();G.parse("look");
  ok("look gives message",G.state.msgBox!==null);
  inc("look in dining mentions table",G.state.msgBox.lines.join(" "),"table");
  G.reset();G.dismissMsg();G.parse("go kitchen");G.dismissMsg();G.parse("look");
  inc("look in kitchen mentions fridge",G.state.msgBox.lines.join(" "),"fridge");
  G.reset();G.dismissMsg();G.parse("go bedroom");G.dismissMsg();G.parse("look");
  inc("look in bedroom mentions bed",G.state.msgBox.lines.join(" "),"bed");
  inc("look in bedroom mentions dog",G.state.msgBox.lines.join(" "),"retriever");

  sec("Navigation");
  G.reset();G.dismissMsg();
  eq("Start in dining",G.state.currentRoom,"dining");
  G.parse("go kitchen");eq("go kitchen → kitchen",G.state.currentRoom,"kitchen");G.dismissMsg();
  G.parse("go dining room");eq("go dining → dining",G.state.currentRoom,"dining");G.dismissMsg();
  G.parse("go bedroom");eq("go bedroom → bedroom",G.state.currentRoom,"bedroom");G.dismissMsg();
  G.parse("go east");eq("go east from bedroom → dining",G.state.currentRoom,"dining");G.dismissMsg();
  G.parse("go east");eq("go east from dining → kitchen",G.state.currentRoom,"kitchen");G.dismissMsg();
  G.parse("go west");eq("go west from kitchen → dining",G.state.currentRoom,"dining");G.dismissMsg();
  G.parse("go west");eq("go west from dining → bedroom",G.state.currentRoom,"bedroom");G.dismissMsg();
  G.parse("go outside");ok("go outside gives message",G.state.msgBox!==null);

  sec("Score System");
  G.reset();G.dismissMsg();const s0=G.state.score;
  G.parse("meow");ok("meow increases score",G.state.score>s0);

  sec("Cat Verb Animations");
  G.reset();G.dismissMsg();G.parse("meow");eq("meow anim",G.state.anim.type,"meow");
  G.reset();G.dismissMsg();G.parse("hiss");eq("hiss anim",G.state.anim.type,"hiss");
  G.reset();G.dismissMsg();G.parse("purr");eq("purr anim",G.state.anim.type,"purr");
  G.reset();G.dismissMsg();G.parse("stretch");eq("stretch anim",G.state.anim.type,"stretch");
  G.reset();G.dismissMsg();G.parse("nap");eq("nap → sleep anim",G.state.anim.type,"sleep");
  G.reset();G.dismissMsg();G.parse("sleep");eq("sleep → sleep anim",G.state.anim.type,"sleep");
  G.reset();G.dismissMsg();G.parse("groom");eq("groom anim",G.state.anim.type,"groom");
  G.reset();G.dismissMsg();G.parse("scratch");eq("bare scratch anim",G.state.anim.type,"scratch");

  sec("Dining Object Interactions");
  G.reset();G.dismissMsg();
  G.parse("smell table");ok("smell table gives message",G.state.msgBox!==null);
  inc("smell table mentions chicken",G.state.msgBox.lines.join(" "),"chicken");
  G.reset();G.dismissMsg();
  G.parse("examine painting");ok("examine painting works",G.state.msgBox!==null);
  inc("examine painting mentions Whiskers",G.state.msgBox.lines.join(" "),"Whiskers");
  G.reset();G.dismissMsg();
  G.parse("claw curtain");ok("claw curtain → scratch anim",G.state.anim.type==="scratch");

  sec("Bedroom Object Interactions");
  G.reset();G.dismissMsg();G.parse("go bedroom");G.dismissMsg();
  G.parse("look at dog");ok("look dog gives message",G.state.msgBox!==null);
  inc("look dog mentions drool",G.state.msgBox.lines.join(" "),"drool");
  G.dismissMsg();
  G.parse("smell dresser");ok("smell dresser gives message",G.state.msgBox!==null);
  inc("smell dresser mentions cedar",G.state.msgBox.lines.join(" "),"Cedar");
  G.dismissMsg();
  G.parse("look mirror");inc("mirror mentions handsome",G.state.msgBox.lines.join(" "),"handsome");
  G.dismissMsg();
  G.parse("knead rug");ok("knead rug gives message",G.state.msgBox!==null);
  G.dismissMsg();
  G.parse("sleep on rug");
  if(G.state.anim.onDone){G.state.anim.onDone();}G.state.anim.type=null;
  ok("sleep on rug gives message",G.state.msgBox!==null);
  inc("sleep on rug mentions circle",G.state.msgBox.lines.join(" "),"circle");

  sec("Plot Nouns");
  eq("lid in dining",G.matchNoun("lid","dining"),"lid");
  eq("cover→lid",G.matchNoun("cover","dining"),"lid");
  eq("tablecloth in dining",G.matchNoun("tablecloth","dining"),"tablecloth");
  eq("cloth→tablecloth",G.matchNoun("cloth","dining"),"tablecloth");
  eq("chicken in dining",G.matchNoun("chicken","dining"),"chicken");
  eq("carcass→chicken",G.matchNoun("carcass","dining"),"chicken");
  eq("squeaky→dogtoy",G.matchNoun("squeaky toy","kitchen"),"dogtoy");
  eq("barrel→trash",G.matchNoun("barrel","kitchen"),"trash");
  eq("bin→trash",G.matchNoun("bin","kitchen"),"trash");

  sec("Collision - Trash Barrel");
  G.reset();G.dismissMsg();
  ok("barrel blocks at x=216",G.collides(216,124,"kitchen"));
  ok("barrel doesn't block x=140",!G.collides(140,124,"kitchen"));
  G.state.itemsFound.chaseTriggered=true;
  trashBarrelBox.disabled=true;
  ok("barrel clear after chase",!G.collides(216,124,"kitchen"));
  G.reset();
  ok("barrel re-enabled after reset",G.collides(216,124,"kitchen"));

  sec("Plot - Take Dog Toy");
  G.reset();G.dismissMsg();
  G.parse("take toy");
  inc("no toy here (wrong room)",G.state.msgBox.lines.join(" "),"squeaky");
  G.dismissMsg();
  G.parse("go kitchen");G.dismissMsg();
  G.parse("take toy");G.dismissMsg();
  ok("dog toy in inventory",G.state.inventory.includes("dog toy"));
  ok("toyTaken flag set",G.state.itemsFound.toyTaken===true);
  G.parse("take toy");
  inc("can't take twice",G.state.msgBox.lines.join(" "),"already");
  G.dismissMsg();

  sec("Plot - Squeak in Wrong Room");
  G.reset();G.dismissMsg();
  G.parse("go kitchen");G.dismissMsg();
  G.parse("take toy");G.dismissMsg();
  G.parse("squeak toy");
  ok("squeak msg in kitchen",G.state.msgBox!==null);
  ok("chase NOT triggered",!G.state.itemsFound.chaseTriggered);
  G.dismissMsg();

  sec("Plot - Chase Sequence");
  G.reset();G.dismissMsg();
  G.parse("go kitchen");G.dismissMsg();
  G.parse("take toy");G.dismissMsg();
  G.parse("go dining room");G.dismissMsg();
  G.parse("go bedroom");G.dismissMsg();
  G.parse("squeak toy");
  for(let i=0;i<28;i++)G.tickAnim();
  eq("still in bedroom after squeak",G.state.currentRoom,"bedroom");
  ok("alert anim frozen",G.state.anim.type==="alert");
  ok("chase NOT triggered yet",!G.state.itemsFound.chaseTriggered);
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  ok("chase triggered after 3rd msg",G.state.itemsFound.chaseTriggered===true);
  ok("cloth fallen",G.state.itemsFound.clothFallen===true);
  eq("warped to dining",G.state.currentRoom,"dining");
  ok("barrel disabled",trashBarrelBox.disabled===true);
  G.dismissMsg();G.dismissMsg();G.dismissMsg();

  sec("Closet - Enter and Exit");
  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});
  G.parse("enter closet");
  ok("inCloset set on enter",G.state.itemsFound.inCloset===true);
  inc("enter closet dark msg",G.state.msgBox.lines.join(" "),"dark");
  G.dismissMsg();G.dismissMsg();
  G.parse("look");
  inc("look in closet mentions litter",G.state.msgBox.lines.join(" "),"litter");
  G.dismissMsg();G.dismissMsg();
  G.parse("exit closet");
  ok("inCloset cleared on exit",!G.state.itemsFound.inCloset);
  inc("exit msg mentions in and out",G.state.msgBox.lines.join(" "),"back");
  G.dismissMsg();

  sec("Litter Box - Requires Closet");
  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});
  G.parse("use litter box");
  ok("litter blocked outside closet: has scold",G.state.msgBox!==null);
  G.dismissMsg();
  G.parse("bathroom");
  ok("bathroom alias blocked outside closet: has scold",G.state.msgBox!==null);
  G.dismissMsg();
  G.state.itemsFound.inCloset=true;
  G.parse("use litter box");
  eq("litter box anim starts in closet",G.state.anim.type,"scratch");
  for(let i=0;i<120;i++)G.tickAnim();
  ok("litter box msg shown after anim",G.state.msgBox!==null);
  G.dismissMsg();

  sec("Plot - Chicken Gate");
  G.reset();G.dismissMsg();
  G.parse("look chicken");
  inc("chicken hidden before chase",G.state.msgBox.lines.join(" "),"lid");
  G.dismissMsg();

  sec("Plot - Win State");
  G.reset();G.dismissMsg();
  G.parse("go kitchen");G.dismissMsg();
  G.parse("take toy");G.dismissMsg();
  G.parse("go dining room");G.dismissMsg();
  G.parse("go bedroom");G.dismissMsg();
  G.parse("squeak toy");
  for(let i=0;i<28;i++)G.tickAnim();
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  G.state.P.layer="table";G.state.P.y=78;
  G.parse("eat chicken");
  for(let i=0;i<120;i++)G.tickAnim();
  ok("win msg shown",G.state.msgBox!==null);
  inc("win mentions chicken",G.state.msgBox.lines.join(" "),"chicken");
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  ok("win score msg present",G.state.msgBox!==null);
  inc("win score msg",G.state.msgBox?G.state.msgBox.lines.join(" "):"","WIN");

  sec("Plot - Restart");
  G.parse("restart");G.dismissMsg();
  eq("restart → dining",G.state.currentRoom,"dining");
  eq("restart → score 0",G.state.score,0);
  eq("restart → empty inv",G.state.inventory.length,0);
  ok("barrel re-enabled",G.collides(216,124,"kitchen"));

  sec("Layer System");
  G.reset();G.dismissMsg();
  eq("start on floor",G.state.P.layer,"floor");
  G.state.P.x=150;G.state.P.y=130;
  G.parse("jump");
  eq("jump in dining → jump anim",G.state.anim.type,"jump");
  if(G.state.anim.onDone){G.state.anim.onDone();}
  G.state.anim.type=null;G.dismissMsg();
  eq("after jump: on table layer",G.state.P.layer,"table");
  eq("after jump: y=78",G.state.P.y,78);
  G.parse("jump down");
  if(G.state.anim.onDone){G.state.anim.onDone();}
  G.state.anim.type=null;G.dismissMsg();
  eq("after jump down: floor layer",G.state.P.layer,"floor");
  G.reset();G.dismissMsg();G.parse("go bedroom");G.dismissMsg();
  G.state.P.x=40;G.state.P.y=130;
  G.parse("jump");
  if(G.state.anim.onDone){G.state.anim.onDone();}
  G.state.anim.type=null;G.dismissMsg();
  eq("jump in bedroom → bed layer",G.state.P.layer,"bed");
  eq("jump in bedroom → y=64",G.state.P.y,64);

  sec("Inventory System");
  G.reset();G.dismissMsg();
  G.parse("take tuna");inc("can't take tuna without fridge",G.state.msgBox.lines.join(" "),"fridge");
  eq("inventory empty",G.state.inventory.length,0);
  G.reset();G.dismissMsg();G.parse("go kitchen");G.dismissMsg();
  G.parse("open fridge");G.dismissMsg();
  ok("fridge marked opened",G.state.itemsFound.fridgeOpened===true);
  G.parse("take tuna");G.dismissMsg();
  eq("tuna in inventory",G.state.inventory.length,1);
  eq("tuna item name",G.state.inventory[0],"tuna");
  G.parse("take tuna");inc("can't take tuna twice",G.state.msgBox.lines.join(" "),"already");
  G.dismissMsg();G.parse("eat tuna");
  eq("eating tuna removes from inventory",G.state.inventory.length,0);

  sec("Kitchen Treats");
  G.reset();G.dismissMsg();G.parse("go kitchen");G.dismissMsg();
  G.parse("open cabinet");G.dismissMsg();
  ok("cabinet marked opened",G.state.itemsFound.cabinetOpened===true);
  G.parse("take treats");G.dismissMsg();
  eq("treats in inventory",G.state.inventory.length,1);
  inc("treats item name",G.state.inventory[0],"treat");

  sec("Special Commands");
  G.reset();G.dismissMsg();
  G.parse("save");inc("save easter egg",G.state.msgBox.lines.join(" "),"DISK");
  G.dismissMsg();G.parse("xyzzy");inc("xyzzy easter egg",G.state.msgBox.lines.join(" "),"Mrow");
  G.dismissMsg();G.parse("score");inc("score shows score",G.state.msgBox.lines.join(" "),"score");
  G.dismissMsg();G.parse("help");ok("help gives message",G.state.msgBox!==null);

  sec("Room-wide Senses");
  G.reset();G.dismissMsg();
  G.parse("smell");inc("bare smell in dining",G.state.msgBox.lines.join(" "),"polish");
  G.dismissMsg();G.parse("listen");inc("bare listen in dining",G.state.msgBox.lines.join(" "),"Chandelier");
  G.reset();G.dismissMsg();G.parse("go kitchen");G.dismissMsg();
  G.parse("smell");inc("bare smell in kitchen",G.state.msgBox.lines.join(" "),"cleaner");
  G.reset();G.dismissMsg();G.parse("go bedroom");G.dismissMsg();
  G.parse("smell");inc("bare smell in bedroom",G.state.msgBox.lines.join(" "),"dog");
  G.dismissMsg();G.parse("listen");inc("bare listen in bedroom",G.state.msgBox.lines.join(" "),"snore");

  sec("Error Handling");
  G.reset();G.dismissMsg();
  G.parse("florbinate the gizzard");ok("nonsense gives message",G.state.msgBox!==null);
  G.dismissMsg();G.parse("");ok("empty parse is safe",true);

  sec("State Management");
  G.reset();
  eq("reset: dining",G.state.currentRoom,"dining");
  eq("reset: score 0",G.state.score,0);
  eq("reset: empty inv",G.state.inventory.length,0);
  eq("reset: no anim",G.state.anim.type,null);
  eq("reset: floor layer",G.state.P.layer,"floor");
  eq("reset: uiState play",G.state.uiState,"play");

  sec("New Aliases");
  eq("kong→dogtoy",G.matchNoun("kong","kitchen"),"dogtoy");
  eq("rubber kong→dogtoy",G.matchNoun("rubber kong","kitchen"),"dogtoy");
  eq("yoink→take",G.matchVerb("yoink"),"take");
  eq("investigate→look",G.matchVerb("investigate"),"look");
  eq("headbutt→touch",G.matchVerb("headbutt"),"touch");
  eq("vault onto→climb",G.matchVerb("vault onto"),"climb");
  eq("perch→sit",G.matchVerb("perch"),"sit");
  eq("meow at→talk",G.matchVerb("meow at"),"talk");
  eq("inhale→smell",G.matchVerb("inhale"),"smell");

  sec("Cat Verbs - New");
  G.reset();G.dismissMsg();
  G.parse("chase tail");ok("chase tail: run anim",G.state.anim.type==="run");
  G.reset();G.dismissMsg();
  G.parse("zoomies");ok("zoomies: run anim",G.state.anim.type==="run");
  G.reset();G.dismissMsg();
  G.parse("loaf");ok("loaf: sleep anim",G.state.anim.type==="sleep");
  G.reset();G.dismissMsg();
  G.parse("slow blink");ok("slow blink: groom anim",G.state.anim.type==="groom");
  G.reset();G.dismissMsg();
  G.state.P.layer="table";
  G.parse("knock");ok("knock on table: scratch anim",G.state.anim.type==="scratch");
  G.reset();G.dismissMsg();
  G.parse("knock");ok("knock on floor: message shown",G.state.msgBox!==null);
  inc("knock on floor: elevation msg",G.state.msgBox.lines.join(" "),"elevation");

  sec("Taste Responses");
  G.reset();G.dismissMsg();
  G.parse("taste kibble");ok("taste kibble: gives message",G.state.msgBox!==null);
  inc("taste kibble: not bad decisions",G.state.msgBox.lines.join(" "),"meat");
  G.reset();G.dismissMsg();G.parse("go bedroom");G.dismissMsg();
  G.parse("lick dog");ok("lick dog: gives message",G.state.msgBox!==null);
  inc("lick dog: mentions Max",G.state.msgBox.lines.join(" "),"Max");

  sec("Take Kong");
  G.reset();G.dismissMsg();G.parse("go kitchen");G.dismissMsg();
  G.parse("get kong");G.dismissMsg();
  ok("get kong: toy in inventory",G.state.inventory.includes("dog toy"));

  G.reset();G.dismissMsg();
  G.showMsg("First message");G.showMsg("Second message");
  ok("first message shown",G.state.msgBox!==null);
  inc("first msg content",G.state.msgBox.lines.join(" "),"First");
  G.dismissMsg();ok("second from queue",G.state.msgBox!==null);
  inc("second msg content",G.state.msgBox.lines.join(" "),"Second");
  G.dismissMsg();eq("queue empty: null",G.state.msgBox,null);

  sec("State - Table Look/Smell");
  G.reset();G.dismissMsg();
  G.parse("look table");
  inc("pre-chase table mentions lid",G.state.msgBox.lines.join(" "),"serving lid");
  G.dismissMsg();G.parse("smell table");
  inc("pre-chase smell mentions last night",G.state.msgBox.lines.join(" "),"last night");
  G.dismissMsg();
  G.setState({currentRoom:"kitchen"});G.parse("take toy");G.dismissMsg();
  G.setState({currentRoom:"bedroom"});G.parse("squeaky");
  for(let i=0;i<28;i++)G.tickAnim();
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  G.setState({currentRoom:"dining"});
  G.parse("look table");
  inc("post-chase table mentions chicken",G.state.msgBox.lines.join(" "),"chicken");
  const noLidPost=!G.state.msgBox.lines.join(" ").includes("serving lid");
  ok("post-chase table no longer mentions lid",noLidPost);
  G.dismissMsg();G.parse("smell table");
  inc("post-chase smell says fresh chicken",G.state.msgBox.lines.join(" "),"FRESH");

  sec("State - Room Desc Post-Chase");
  G.reset();G.dismissMsg();
  G.setState({currentRoom:"kitchen"});G.state.itemsFound.chaseTriggered=true;
  G.parse("look");
  inc("kitchen post-chase desc mentions disaster",G.state.msgBox.lines.join(" "),"disaster");
  G.dismissMsg();
  G.setState({currentRoom:"dining"});G.state.itemsFound.clothFallen=true;
  G.parse("look");
  inc("dining post-chase desc mentions chicken",G.state.msgBox.lines.join(" "),"chicken");
  G.dismissMsg();

  sec("State - Trash Post-Chase");
  G.reset();G.dismissMsg();
  G.setState({currentRoom:"kitchen"});
  G.parse("look trash");
  inc("pre-chase trash mentions barrel",G.state.msgBox.lines.join(" "),"barrel");
  G.dismissMsg();
  G.state.itemsFound.chaseTriggered=true;
  G.parse("look trash");
  inc("post-chase trash mentions knocked over",G.state.msgBox.lines.join(" "),"knocked");
  G.dismissMsg();G.parse("smell trash");
  inc("post-chase trash smell changed",G.state.msgBox.lines.join(" "),"floor");

  sec("State - Basket Persists After Chase");
  G.reset();G.dismissMsg();
  G.setState({currentRoom:"kitchen"});
  G.parse("look basket");
  inc("basket visible before chase",G.state.msgBox.lines.join(" "),"basket");
  G.dismissMsg();
  G.state.itemsFound.chaseTriggered=true;G.state.itemsFound.toyTaken=true;
  G.parse("look basket");
  inc("basket visible after chase (just empty)",G.state.msgBox.lines.join(" "),"basket");
  G.dismissMsg();G.parse("look dogtoy");
  inc("dogtoy gone message mentions empty",G.state.msgBox.lines.join(" "),"empty");

  sec("State - Climb Sets Layer");
  G.reset();G.dismissMsg();
  eq("starts on floor","floor",G.state.P.layer);
  G.state.P.x=150;
  G.parse("climb table");
  for(let i=0;i<60;i++)G.tickAnim();
  eq("after climb table, layer=table","table",G.state.P.layer);
  G.parse("jump down");
  for(let i=0;i<60;i++)G.tickAnim();
  eq("after jump down, layer=floor","floor",G.state.P.layer);
  G.setState({currentRoom:"kitchen"});G.state.P.x=150;
  G.parse("climb counter");
  for(let i=0;i<60;i++)G.tickAnim();
  eq("after climb counter, layer=counter","counter",G.state.P.layer);

  sec("State - Win");
  G.reset();G.dismissMsg();
  G.setState({currentRoom:"dining"});G.state.itemsFound.clothFallen=true;
  G.state.P.layer="table";G.state.P.y=78;
  G.parse("eat chicken");
  for(let i=0;i<120;i++)G.tickAnim();
  G.dismissMsg();G.dismissMsg();G.dismissMsg();
  ok("win message shown",G.state.msgBox!==null);
  inc("win message mentions YOU WIN",G.state.msgBox.lines.join(" "),"WIN");
  inc("win message shows score",G.state.msgBox.lines.join(" "),"SCORE");

  sec("Trash Dive");
  G.reset();G.dismissMsg();
  G.setState({currentRoom:"kitchen"});
  G.state.P.layer="counter";G.state.P.y=70;G.state.P.x=220;
  G.parse("jump down");for(let i=0;i<60;i++)G.tickAnim();
  ok("trash dive: trashDive flag set",!!G.state.itemsFound.trashDive);
  ok("trash dive: gameover indicated",!!G.state.itemsFound.trashDive&&G.state.uiState!=="play");
  G.dismissMsg();G.dismissMsg();G.dismissMsg();G.dismissMsg();
  ok("trash dive: final msg present",G.state.msgBox!==null);
  inc("trash dive: final msg mentions GAME OVER",G.state.msgBox?G.state.msgBox.lines.join(" "):"","GAME OVER");
  G.dismissMsg();
  G.parse("look");
  ok("gameover blocks look with barrel msg",G.state.msgBox!==null);
  G.reset();G.dismissMsg();
  G.setState({currentRoom:"kitchen"});
  G.state.P.layer="counter";G.state.P.y=70;G.state.P.x=120;
  G.parse("jump down");for(let i=0;i<60;i++)G.tickAnim();
  ok("clean landing: no trashDive",!G.state.itemsFound.trashDive);
  ok("clean landing: still play state",G.state.uiState!=="gameover");

  sec("Table Floor Walkability");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});
  ok("under table center walkable",!G.collides(150,130,"dining"));
  ok("left of table walkable",!G.collides(30,130,"dining"));
  ok("right of table walkable",!G.collides(260,130,"dining"));
  G.state.P.x=150;G.parse("jump");for(let i=0;i<60;i++)G.tickAnim();G.dismissMsg();
  eq("table still jumpable","table",G.state.P.layer);

  sec("JumpUp No Surface");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});G.state.P.x=10;
  G.parse("jump up");
  inc("jump up off-surface: message has nothing",G.state.msgBox.lines.join(" "),"nothing");
  eq("jump up off-surface: stays floor","floor",G.state.P.layer);

  sec("Unified Jump System");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});G.state.P.x=150;
  G.parse("jump");for(let i=0;i<60;i++)G.tickAnim();G.dismissMsg();
  eq("positional jump onto table: layer","table",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});G.state.P.x=150;
  G.parse("jump table");for(let i=0;i<60;i++)G.tickAnim();G.dismissMsg();
  eq("jump table in range: layer","table",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});G.state.P.x=10;
  G.parse("jump table");
  inc("jump table out of range: not close enough",G.state.msgBox.lines.join(" "),"close");
  eq("jump table out of range: still floor","floor",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});G.state.P.x=40;
  G.parse("jump");for(let i=0;i<60;i++)G.tickAnim();
  inc("jump bed dog present: dog message",G.state.msgBox.lines.join(" "),"dog");
  eq("jump bed dog present: layer","bed",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});
  G.state.itemsFound.chaseTriggered=true;G.state.P.x=40;
  G.parse("jump");for(let i=0;i<60;i++)G.tickAnim();
  inc("jump bed dog gone: YOURS message",G.state.msgBox.lines.join(" "),"YOURS");
  eq("jump bed dog gone: layer","bed",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});
  G.state.itemsFound.chaseTriggered=true;G.state.P.x=40;
  G.parse("jump bed");for(let i=0;i<60;i++)G.tickAnim();
  inc("jump bed noun dog gone: same YOURS message",G.state.msgBox.lines.join(" "),"YOURS");

  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});G.state.P.x=250;
  G.parse("jump");for(let i=0;i<60;i++)G.tickAnim();G.dismissMsg();
  eq("positional jump onto dresser: layer","dresser",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});G.state.P.x=250;
  G.parse("jump dresser");for(let i=0;i<60;i++)G.tickAnim();G.dismissMsg();
  eq("jump dresser noun: layer","dresser",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"kitchen"});G.state.P.x=280;
  G.parse("jump");for(let i=0;i<60;i++)G.tickAnim();
  inc("positional jump near stove: HOT",G.state.msgBox.lines.join(" "),"HOT");
  eq("positional jump near stove: still floor","floor",G.state.P.layer);

  G.reset();G.dismissMsg();G.setState({currentRoom:"kitchen"});G.state.P.x=280;
  G.parse("jump stove");for(let i=0;i<60;i++)G.tickAnim();
  inc("jump stove noun: HOT",G.state.msgBox.lines.join(" "),"HOT");
  eq("jump stove noun: still floor","floor",G.state.P.layer);

  sec("Sink Requires Counter");
  G.reset();G.dismissMsg();G.setState({currentRoom:"kitchen"});
  G.parse("drink sink");
  inc("drink sink on floor: blocked",G.state.msgBox.lines.join(" "),"counter");
  G.dismissMsg();G.state.P.layer="counter";
  G.parse("drink sink");
  inc("drink sink on counter: allowed",G.state.msgBox.lines.join(" "),"faucet");

  sec("Eat Chicken Requires Table");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});
  G.state.itemsFound.clothFallen=true;
  G.parse("eat chicken");
  inc("eat chicken on floor: need table",G.state.msgBox.lines.join(" "),"table");
  ok("eat chicken on floor: no win",!G.state.itemsFound.won);
  G.dismissMsg();G.state.P.layer="table";G.state.P.y=78;
  G.parse("eat chicken");for(let i=0;i<120;i++)G.tickAnim();
  ok("eat chicken on table: win triggered",G.state.msgBox!==null);

  sec("Get Chicken Room Guard");
  G.reset();G.dismissMsg();G.setState({currentRoom:"kitchen"});
  G.state.itemsFound.clothFallen=true;
  G.parse("get chicken");
  eq("get chicken in kitchen: not dining, no win",G.state.uiState,"message");
  ok("get chicken in kitchen: not won",!G.state.itemsFound.won);

  sec("Bones - Kitchen Post-Chase");
  G.reset();G.dismissMsg();G.setState({currentRoom:"kitchen"});
  G.state.itemsFound.chaseTriggered=true;
  G.parse("look bones");
  ok("look bones: has msg",G.state.msgBox!==null);
  inc("look bones: mentions bones",G.state.msgBox.lines.join(" "),"bones");
  G.dismissMsg();G.parse("smell bones");
  inc("smell bones: mentions chicken",G.state.msgBox.lines.join(" "),"chicken");
  G.dismissMsg();G.parse("lick bones");
  inc("lick bones: mentions meaty or splinter",G.state.msgBox.lines.join(" "),"meaty");
  G.dismissMsg();G.parse("taste bones");
  inc("taste bones: same response",G.state.msgBox.lines.join(" "),"meaty");
  G.dismissMsg();G.parse("eat bones");for(let i=0;i<50;i++)G.tickAnim();
  inc("eat bones: warns about danger",G.state.msgBox?G.state.msgBox.lines.join(" "):"","splinter");
  G.dismissMsg();

  sec("Jump Down Aliases");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});
  G.state.P.layer="table";G.state.P.y=78;
  G.parse("jump off");for(let i=0;i<60;i++)G.tickAnim();
  eq("jump off: back on floor","floor",G.state.P.layer);
  G.state.P.layer="table";G.state.P.y=78;
  G.parse("jump floor");for(let i=0;i<60;i++)G.tickAnim();
  eq("jump floor: back on floor","floor",G.state.P.layer);

  sec("Closet Exit Warp");
  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});
  G.state.itemsFound.inCloset=true;G.state.P.x=50;
  G.parse("exit closet");G.dismissMsg();
  ok("exit closet: x is right of door",G.state.P.x>=160);
  eq("exit closet: not in closet",false,!!G.state.itemsFound.inCloset);

  sec("Kong Squeak Alias");
  G.reset();G.dismissMsg();G.setState({currentRoom:"bedroom"});
  G.state.inventory.push("dog toy");
  G.parse("kong");for(let i=0;i<28;i++)G.tickAnim();
  ok("kong triggers alert anim or msg",G.state.anim.type==="alert"||G.state.msgBox!==null);

  sec("Smell Chicken Gate");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});
  G.parse("smell chicken");
  inc("smell chicken before cloth: mentions lid or smell",G.state.msgBox.lines.join(" "),"lid");
  G.dismissMsg();G.state.itemsFound.clothFallen=true;
  G.parse("smell chicken");
  inc("smell chicken after cloth: mentions chicken",G.state.msgBox.lines.join(" "),"chicken");
  G.dismissMsg();

  sec("Bones Pre-Chase Guard");
  G.reset();G.dismissMsg();G.setState({currentRoom:"kitchen"});
  G.parse("look bones");
  inc("look bones pre-chase: blocked",G.state.msgBox.lines.join(" "),"barrel");
  G.dismissMsg();G.state.itemsFound.chaseTriggered=true;
  G.parse("look bones");
  inc("look bones post-chase: shows bones",G.state.msgBox.lines.join(" "),"bones");
  G.dismissMsg();

  sec("Lid Verbs");
  G.reset();G.dismissMsg();G.setState({currentRoom:"dining"});
  G.parse("move lid");ok("move lid: has response",G.state.msgBox!==null);G.dismissMsg();
  G.parse("take lid");ok("take lid: has response",G.state.msgBox!==null);G.dismissMsg();
  G.parse("pull lid");ok("pull lid: has response",G.state.msgBox!==null);G.dismissMsg();

  } catch(err) {
    if(_cur) _cur.tests.push({desc:"EXCEPTION: "+err.message,ok:false});
    _f++;_t++;
  } finally {
    G.reset();
    for(const k of Object.keys(_sfxSave)) sfx[k]=_sfxSave[k];
    if(masterGain) masterGain.gain.value=1.0;
  }

  // ── RENDER RESULTS OVERLAY ────────────────────────────────
  let html=`<style>#tov *{font-family:monospace;box-sizing:border-box} .tpass{color:#55FF55} .tfail{color:#FF5555;font-weight:bold} .tsec{color:#FFFF55;margin:12px 0 4px;font-size:13px} .ttest{font-size:11px;margin:1px 0} .tsum{margin-top:16px;padding:8px 12px;border:1px solid #555;font-size:13px;display:inline-block}</style>`;
  for(const s of _secs){
    html+=`<div class="tsec">${s.name}</div>`;
    for(const t of s.tests) html+=`<div class="ttest ${t.ok?'tpass':'tfail'}">${t.ok?'✓':'✗'} ${t.desc}</div>`;
  }
  const sc=_f?'tfail':'tpass';
  html+=`<div class="tsum ${sc}">${_p}/${_t} passed &nbsp; ${_f} failed</div>`;
  html+=`<div style="margin-top:16px;color:#FFFF55;font-family:monospace;font-size:12px;margin-bottom:6px">── SOUNDS ──</div>`;
  html+=`<div id="_sfxBtns" style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px"></div>`;
  html+=`<div style="margin-top:4px;color:#FFFF55;font-family:monospace;font-size:12px;margin-bottom:6px">── CAT ANIMATIONS ──</div>`;
  html+=`<canvas id="_animPreview" width="640" height="240" style="image-rendering:pixelated;width:640px;height:240px;background:#1a1a2e;border:1px solid #444;display:block"></canvas>`;
  document.getElementById('_tov_body').innerHTML=html;
  document.getElementById('_tov').style.display='flex';

  // Sound buttons
  const _sfxNames=Object.keys(sfx);
  const _btnContainer=document.getElementById('_sfxBtns');
  const _btnStyle='background:#222;color:#AAFFAA;border:1px solid #555;padding:3px 8px;cursor:pointer;font-family:monospace;font-size:11px';
  for(const sn of _sfxNames){
    const b=document.createElement('button');b.textContent=sn;b.style.cssText=_btnStyle;
    b.onclick=()=>{ea();if(masterGain)masterGain.gain.value=1.0;sfx[sn]();};
    _btnContainer.appendChild(b);
  }

  // Animation preview canvas
  const _anims=[
    {name:"walk",   fn:(cx,cy,af)=>{drawNormalCat(cx,cy,"right",af%4,true);}},
    {name:"sleep",  fn:(cx,cy,af)=>{drawSleepCat(cx,cy);}},
    {name:"stretch",fn:(cx,cy,af)=>{drawStretchCat(cx,cy,af%60);}},
    {name:"jump",   fn:(cx,cy,af)=>{const dy=Math.round(-Math.sin((af%36)/36*Math.PI)*12);drawNormalCat(cx,cy+dy,"right",0,false);}},
    {name:"scratch",fn:(cx,cy,af)=>{drawScratchCat(cx,cy,af%40);}},
    {name:"groom",  fn:(cx,cy,af)=>{drawGroomCat(cx,cy,af%60);}},
    {name:"eat",    fn:(cx,cy,af)=>{drawEatCat(cx,cy,af%40);}},
    {name:"meow",   fn:(cx,cy,af)=>{drawMeowCat(cx,cy,af%30);}},
    {name:"hiss",   fn:(cx,cy,af)=>{drawHissCat(cx+4,cy);}},
    {name:"purr",   fn:(cx,cy,af)=>{const vib=(af%4<2)?1:0;drawNormalCat(cx+vib,cy,"right",0,false);const px2=cx+16;if(af%8<4){X.fillStyle=E.white;X.fillRect(px2,cy+4,2,1);X.fillRect(px2+2,cy+6,2,1);}}},
    {name:"run",    fn:(cx,cy,af)=>{drawNormalCat(cx,cy,"right",Math.floor(af/2)%4,true);}},
    {name:"alert",  fn:(cx,cy,af)=>{drawAlertCat(cx,cy,af%28);}},
    {name:"drawer", fn:(cx,cy,af)=>{drawDrawerSleepCat(cx,cy,af%60);}},
  ];
  const COLS=7,SCALE=2,cellW=Math.floor(320/COLS),ROW_H=55;
  let _af2=0;const _gameX=X;
  function _drawPreviews(){
    const pc=document.getElementById('_animPreview');if(!pc)return;
    const px=pc.getContext('2d');X=px;
    px.fillStyle="#1a1a2e";px.fillRect(0,0,640,240);
    px.save();px.scale(SCALE,SCALE);
    for(let i=0;i<_anims.length;i++){
      const row=Math.floor(i/COLS),col=i%COLS;
      const cx=col*cellW+Math.floor(cellW/2)-7,cy=row*ROW_H+24;
      try{_anims[i].fn(cx,cy,_af2);}catch(e){}
      px.fillStyle="#667";px.font="5px monospace";
      px.fillText(_anims[i].name,col*cellW+2,row*ROW_H+ROW_H-4);
    }
    px.restore();X=_gameX;_af2++;
    window._animPreviewRaf=requestAnimationFrame(_drawPreviews);
  }
  if(window._animPreviewRaf)cancelAnimationFrame(window._animPreviewRaf);
  window._animPreviewRaf=null;
  _drawPreviews();
} // end runTests
