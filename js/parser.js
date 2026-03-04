// ── VERB ALIASES ───────────────────────────────────────────
const VA={
  look:["look","look at","examine","inspect","check","study","read","observe","peer","gaze","stare","view","see","watch","scan","survey","search","describe","investigate"],
  smell:["smell","sniff","scent","whiff","nose","inhale"],
  touch:["touch","feel","paw","pat","tap","poke","prod","rub","stroke","knead","press","headbutt","bunt"],
  taste:["taste","lick","nibble","sample"],
  listen:["listen","hear","listen to","eavesdrop on"],
  eat:["eat","consume","devour","munch","chomp","gobble","chew","bite","dine","feast","snack","wolf down"],
  drink:["drink","lap","sip","slurp","gulp"],
  take:["take","get","grab","pick up","snag","steal","swipe","snatch","collect","acquire","pocket","nab","yoink"],
  drop:["drop","put down","set down","place","leave","discard","release","put"],
  open:["open","pull open","pry","pry open","crack open","pop open"],
  close:["close","shut","slam","push shut"],
  push:["push","shove","nudge","move","knock","bump","press"],
  pull:["pull","tug","yank","drag","haul"],
  climb:["climb","jump","jump on","jump up","leap","leap on","hop","hop on","hop up","pounce","mount","scale","clamber","jump onto","hop onto","get on","get up","get up on","spring onto","vault onto"],
  sit:["sit","sit on","sit down","rest","relax","lounge","lie","lie down","lie on","curl up","curl","lay","settle","sleep","sleep on","nap","nap on","perch","roost on"],
  scratch:["scratch","claw","sharpen","scrape","swat","bat","swipe at","rake"],
  turn:["turn","twist","rotate","switch","flip","toggle"],
  use:["use","operate","activate","try","work","employ","interact with"],
  enter:["enter","go through","walk through","go in","go into","pass through","walk into","step through"],
  talk:["talk","say","speak","tell","ask","chat","converse","call","yell","shout","whisper","meow at"]
};

function matchVerb(w){
  for(const[v,as]of Object.entries(VA))if(as.includes(w))return v;
  return null;
}

function matchNoun(t,r){
  const obs=RO[r];
  const tl=t.toLowerCase();
  // Try nounMap first — prefer longer (more specific) matches
  let best=null,bestLen=0;
  for(const[k,as]of Object.entries(nounMap)){
    if(!obs[k])continue;
    for(const a of as)if(tl.includes(a)&&a.length>bestLen){best=k;bestLen=a.length;}
  }
  if(best)return best;
  // Fall back to RO key substring match
  for(const k of Object.keys(obs))if(tl.includes(k))return k;
  return null;
}

// ── JUMP-ONTO HELPER ──────────────────────────────────────
// Single source of truth for jumping onto any surface.
// Called by both bare "jump" (positional) and "climb/jump X" (noun-based).
// Returns true if handled (even if refused), false if noun is not a surface.
function jumpOnto(noun){
  const zones={
    table:  {room:"dining",  xMin:72,  xMax:224, layer:"table",   y:78},
    lchair: {room:"dining",  xMin:55,  xMax:80,  layer:"lchair",  y:92},
    rchair: {room:"dining",  xMin:237, xMax:262, layer:"rchair",  y:92},
    counter:{room:"kitchen", xMin:60,  xMax:264, layer:"counter", y:70},
    bed:    {room:"bedroom", xMin:8,   xMax:86,  layer:"bed",     y:64},
    dresser:{room:"bedroom", xMin:224, xMax:280, layer:"dresser", y:83},
  };

  // Stove: always hot, never lands
  if(noun==="stove"){
    if(currentRoom!=="kitchen"){showMsg("No stove here.");return true;}
    sfx.badcat();
    startAnim("jump",36,()=>{
      sfx.land();
      showMsg("You leap toward the stove and IMMEDIATELY regret it! HOT HOT HOT! You bail off before you even land. Your paws are fine. Your dignity is not.");
      addScore(3);
    },true);
    return true;
  }

  const z=zones[noun];
  if(!z)return false; // not a recognised surface

  if(currentRoom!==z.room){
    const dn=(noun==="lchair"||noun==="rchair")?"chair":noun;
    showMsg("There is no "+dn+" to jump on here.");
    return true;
  }

  // Cross-surface: allow table↔chair hops without returning to floor first
  if(P.layer!=="floor"){
    const crossOk={table:["lchair","rchair"],lchair:["table"],rchair:["table"]};
    if(crossOk[P.layer]&&crossOk[P.layer].includes(noun)&&currentRoom===z.room){
      const crossMsgs={
        table:"You spring across to the table! Graceful, obviously.",
        lchair:"You hop across to the chair cushion. A lateral move, literally.",
        rchair:"You hop across to the chair cushion. A lateral move, literally.",
      };
      const crossX={
        lchair:67,
        rchair:249,
        table:P.layer==="lchair"?95:205,
      };
      sfx.jump();
      startAnim("jump",36,()=>{
        sfx.land();P.layer=z.layer;P.y=z.y;P.x=crossX[noun]||P.x;
        addScore(2);
        showMsg(crossMsgs[noun]||"You hop across.");
      },true);
      return true;
    }
    showMsg("You are already up on something.");
    return true;
  }

  if(P.x<z.xMin||P.x>z.xMax){
    const dispName=(noun==="lchair"||noun==="rchair")?"chair":noun;
    showMsg("You are not close enough to the "+dispName+" to jump on it. Move closer.");
    return true;
  }

  // State-aware jump messages
  const bedMsg=itemsFound.chaseTriggered
    ?"You FLING yourself onto the now-dog-free bed. EVERY INCH IS YOURS. You spread out completely. This is what the whole day was building to. Well. One of the things."
    :"You leap onto the bed! The dog shifts and sighs. You claim the good pillow.";
  const msgs={
    table:"You spring onto the table! The plates rattle. You survey your domain from on high.",
    lchair:"You hop up onto the chair cushion. Soft, warm, and covered in your own fur. Exactly as it should be.",
    rchair:"You hop up onto the chair cushion. The red velvet is warm from the lamp above. You settle in.",
    counter:"You leap onto the counter! King of the kitchen.",
    bed:bedMsg,
    dresser:"You scrabble up onto the dresser top! Dusty up here. A forgotten hairbrush. You knock it off the edge. Obviously.",
  };

  sfx.jump();
  startAnim("jump",36,()=>{
    sfx.land();P.layer=z.layer;P.y=z.y;
    addScore(3);
    showMsg(msgs[noun]);
  },true);
  return true;
}

// ── COMMAND PARSER ─────────────────────────────────────────
function parse(raw){
  const t=raw.trim().toLowerCase();
  if(!t)return;

  // Allow restart/help during infinite win-sleep; block everything else during animation
  const isWinSleep=anim.type==="sleep"&&anim.maxFrames===9999&&itemsFound.won;
  if(isAnimating()&&!isWinSleep)return;

  // ── SYSTEM COMMANDS ──────────────────────────────────────
  if(t==="help"||t==="?"){
    showMsg("You are a cat. Arrow keys to move. Just type commands and press ENTER. TAB for inventory. Try: LOOK, SMELL, TOUCH, LISTEN, TASTE, EAT, DRINK, TAKE, DROP, OPEN, PUSH, PULL, CLIMB, SIT, SCRATCH, TURN. Cat verbs: MEOW, PURR, HISS, NAP, STRETCH, GROOM, JUMP, HIDE, WAIT, RUN.");
    return;
  }
  if(t==="inventory"||t==="i"){uiState="inventory";return;}
  if(t==="score"){showMsg("Your score is "+score+" points.");return;}

  if(t==="restart"||t==="new game"||t==="start over"){
    inventory=[];currentRoom="dining";score=0;petCount=0;itemsFound={};
    uiState="play";P.x=160;P.y=FLOOR-16;P.dir="right";P.layer="floor";
    anim={type:null,frame:0,maxFrames:0,onDone:null};
    trashBarrelBox.disabled=false;
    msgBox=null;msgQueue=[];
    startAnim("sleep",9999,null);
    sfx.fanfare();
    showMsg("You are a distinguished grey cat. Your kingdom spans three rooms. You awake from your slumber.",()=>{
      anim={type:null,frame:0,maxFrames:0,onDone:null,jumpUp:false};
      sfx.stretch();startAnim("stretch",60,null);
    });
    showMsg("Something reaches your nose. There is a silver serving lid on the dining table — and whatever is underneath it smells absolutely extraordinary.");
    showMsg("Arrow keys to move. Just start typing to enter commands. Good luck.");
    return;
  }

  if(uiState==="gameover"){showMsg("You are inside a trash barrel. Dignity: zero. Type RESTART to try again.");return;}
  if(t==="quit"||t==="q"){showMsg("You can't quit being a cat.");return;}
  if(t==="save"){showMsg("INSERT SAVE DISK IN DRIVE A: ... Just kidding. Your progress is stored in your whiskers.");return;}
  if(t==="load"||t==="restore"){showMsg("Nothing to restore. You live in the eternal present.");return;}
  if(t==="xyzzy"){showMsg("A hollow voice says: 'Mrow.'");sfx.pickup();return;}
  if(t==="debug"){debugMode=!debugMode;return;}
  if(t==="test"||t==="run tests"){runTests();return;}
  if(t==="version"||t==="about"){showMsg("Cat's Quest v1.1 — A pixel art text adventure. EGA graphics, 8-bit audio. 1987 forever.\n\nIssues? https://github.com/csciuto/cats-quest/issues");return;}

  // ── ANIMATED CAT VERBS ───────────────────────────────────
  if(t==="meow"||t==="mew"||t==="mrow"||t==="yowl"){
    sfx.meow();
    const bedroomMeows=["You let out a soft mrow. Max's ear twitches. You freeze. His ear settles. Crisis averted.","You meow experimentally. Max shifts in his sleep and sighs deeply. Maybe don't.","MROW! Max's eyes flicker half-open. You look elaborately at the ceiling. He closes them again. That was close."];
    const normalMeows=["You let out a resounding MEOW. Majestic.","MROW! Nobody answers. But it felt right.","MEEEOOOOW. The universe takes note."];
    const msgs=currentRoom==="bedroom"?bedroomMeows:normalMeows;
    startAnim("meow",45,()=>{showMsg(msgs[Math.floor(Math.random()*msgs.length)]);});
    addScore(2);return;
  }
  if(t==="purr"){
    sfx.purr();
    startAnim("purr",80,()=>showMsg("PRRRRRRRRRR. The vibration resonates through your entire body. This is your power."));
    addScore(3);return;
  }
  if(t==="hiss"){
    sfx.hiss();
    startAnim("hiss",40,()=>showMsg("KSSSHHHH! You arch your back and hiss at nothing. The air is TERRIFIED."));
    addScore(1);return;
  }

  // ── JUMP UP / JUMP DOWN (layer transitions) ──────────────
  const jumpDown=t==="jump down"||t==="get down"||t==="climb down"||t==="hop down"||t==="leap down"||t==="jump off"||t==="jump floor"||t==="jump to floor"||t==="down";
  const jumpUp=t==="jump"||t==="jump up"||t==="leap"||t==="hop"||t==="pounce"||t==="climb up"||t==="get up"||t==="up";
  if(jumpDown||jumpUp){
    if(P.layer!=="floor"&&(jumpDown||jumpUp)){
      sfx.jump();
      startAnim("jump",36,()=>{
        sfx.land();P.layer="floor";P.y=FLOOR-16;
        // Trash-dive: did we land inside the upright barrel?
        if(currentRoom==="kitchen"&&!trashBarrelBox.disabled&&collides(P.x,P.y,"kitchen")){
          sfx.crash();
          itemsFound.trashDive=true;
          uiState="gameover";
          showMsg("You leap off the counter... directly into the open trash barrel.");
          showMsg("CLANG. CLATTER. A lid bounces across the kitchen floor.");
          showMsg("You are inside the barrel. You are surrounded by chicken scraps, old coffee grounds, and something that might have been a fish on Tuesday.");
          showMsg("You sit very still for a long time.");
          showMsg("A VERY DIRTY AND EMBARRASSED CAT.\n\nBut also, now that you think about it... surrounded by chicken scraps.\n\nSmall victories.\n\n☆ GAME OVER ☆\nFINAL SCORE: "+score+" points\n\nType RESTART to play again.");
        } else {
          showMsg("You leap down to the floor, landing with practiced grace.");
        }
      });
      return;
    }
    if(P.layer==="floor"&&jumpUp){
      if(currentRoom==="kitchen"&&P.x>=265){jumpOnto("stove");return;}
      const surfaces={dining:["lchair","table","rchair"],kitchen:["counter"],bedroom:["bed","dresser"]};
      const candidates=(surfaces[currentRoom]||[]);
      const zones={lchair:{xMin:55,xMax:80},table:{xMin:72,xMax:224},rchair:{xMin:237,xMax:262},counter:{xMin:60,xMax:264},bed:{xMin:8,xMax:86},dresser:{xMin:224,xMax:280}};
      const hit=candidates.find(n=>P.x>=zones[n].xMin&&P.x<=zones[n].xMax);
      if(hit){jumpOnto(hit);return;}
      showMsg("You crouch to jump... but there's nothing up there worth landing on. You straighten up with dignity, as if that was always the plan.");
      return;
    }
    if(jumpDown||P.layer!=="floor"){
      sfx.jump();
      startAnim("jump",36,()=>{sfx.land();showMsg("You spring into the air with feline grace! And land perfectly.");});
      return;
    }
    showMsg("You crouch to jump... but there's nothing up there worth landing on. You straighten up with dignity, as if that was always the plan.");
    return;
  }

  if(t==="stretch"){
    sfx.stretch();
    startAnim("stretch",60,()=>showMsg("Full cat stretch: front paws forward, back arched, rear end high. Every vertebra cracks. Ahhhh."));
    addScore(1);return;
  }
  if(t==="scratch"){
    sfx.scratch();
    startAnim("scratch",50,()=>showMsg("You flex your claws and scratch vigorously at the "+(currentRoom==="dining"?"hardwood floor":currentRoom==="kitchen"?"tile floor":"carpet")+". Ahh, maintenance."));
    addScore(1);return;
  }
  if(t==="nap"||t==="sleep"){
    sfx.purr();
    if(P.layer==="lchair"||P.layer==="rchair"){
      startAnim("sleep",120,()=>showMsg("You circle three times and sink into the cushion. It is warm and slightly concave — the exact shape of you. You sleep for two hours. Someone tries to sit here. You do not move. They stand."));
      addScore(6);return;
    }
    if(P.layer==="dresser"){
      startAnim("drawerSleep",180,()=>showMsg("You wake up extremely refreshed. A sock is stuck to your face. You leave it there."));
      addScore(8);return;
    }
    startAnim("sleep",120,()=>showMsg("You curl into a perfect circle and drift off. You dream of birds and infinite tuna. You wake after 47 minutes. Refreshing!"));
    addScore(5);return;
  }
  if(t.startsWith("pet")||t==="groom"||t==="clean"||t==="wash"||t==="bathe"){
    sfx.purr();
    startAnim("groom",60,()=>{
      showMsg(["You groom meticulously. Left paw, right paw, behind the ears. IMMACULATE.","You lick your paw and wipe your face. Hygiene matters.","Thorough grooming. Every hair in place. Perfection.","You clean behind your ears. Looking good!"][petCount%4]);
    });
    petCount++;addScore(3);return;
  }
  if(t==="sing"||t==="yodel"){sfx.meow();startAnim("meow",40,()=>showMsg("You produce a sound charitably called singing."));return;}
  if(t==="dance"){startAnim("dance",50,()=>showMsg("You do a sideways crab-walk. Tail poofs. ADVANCED MOVEMENT."));return;}
  if(t==="think"||t==="ponder"||t==="contemplate"){showMsg("Why is the red dot uncatchable? Where does the food come from? Who is the cat in the mirror?");return;}

  // ── PLAY MOUSE ───────────────────────────────────────────
  if((t==="play mouse"||t==="play catnip"||t==="play with mouse"||t==="play with catnip")&&inventory.includes("catnip mouse")){
    if(currentRoom!=="bedroom"){showMsg("You bat the catnip mouse around. It skitters. You chase it. This is fine.");addScore(1);return;}
    sfx.scratch();
    startAnim("scratch",60,()=>{
      showMsg("You go ABSOLUTELY FERAL on the catnip mouse. Batting, biting, bunny-kicking. You slide across the rug. You throw it in the air and catch it. You roll onto your back and kick it into the dresser. Max snores through all of it. He has seen this before.");
      addScore(3);
    });
    return;
  }

  // ── SQUEAK TOY — chase trigger ───────────────────────────
  if(t==="squeak toy"||t==="squeak"||t==="play toy"||t==="play with toy"||t==="use toy"||t==="play squeaky"||t==="use squeaky"||t==="squeaky"||t==="kong"||t==="squeeze kong"||t==="squeak kong"||t==="use kong"||t==="play kong"||t==="play with kong"){
    if(!inventory.includes("dog toy")){showMsg("You don't have the squeaky toy.");return;}
    if(currentRoom!=="bedroom"){showMsg("You give it a test squeak. SKREEEEE. Your own ears hurt. You stop immediately.");return;}
    if(itemsFound.chaseTriggered){showMsg("Max is long gone. The doggie door is silent.");return;}
    startAnim("alert",28,()=>{
      sfx.alert();
      startAnim("alert",9999,null);
      showMsg("You give the toy one experimental SQUEAK.");
      showMsg("MAX'S EYES FLY OPEN.");
      showMsg("He sees the toy. He sees YOU. You see HIM. You make a decision: RUN.",()=>{
        anim={type:null,frame:0,maxFrames:0,onDone:null};
        itemsFound.chaseTriggered=true;
        trashBarrelBox.disabled=true;
        itemsFound.clothFallen=true;
        chgRoom("dining");P.x=160;P.y=FLOOR-16;P.layer="floor";
        addScore(20);
      });
      showMsg("You bolt through the dining room — thundering paws behind you — MAX crashes through everything — the tablecloth FLIES — the serving lid CLANGS across the floor —");
      showMsg("— a tremendous CRASH from the kitchen — then FLAP FLAP FLAP through the doggie door to the backyard. Silence.");
      showMsg("...You are alone in the dining room. The tablecloth is on the floor. The serving lid has rolled under a chair. And on the table...");
    });
    return;
  }

  // ── EAT CHICKEN — win state ──────────────────────────────
  if(t==="eat chicken"||((t==="take chicken"||t==="get chicken")&&currentRoom==="dining")||(t==="eat"&&currentRoom==="dining"&&itemsFound.clothFallen)){
    if(!itemsFound.clothFallen){showMsg("There's nothing special to eat on the table right now. The serving lid is closed.");return;}
    if(P.layer!=="table"){showMsg("The chicken is on the table. You'll need to jump up there to reach it. So close. So very close.");return;}
    sfx.eat();
    startAnim("eat",60,()=>{
      sfx.win();itemsFound.won=true;
      addScore(50);
      P.layer="floor";P.x=160;P.y=FLOOR-16;
      showMsg("You attack the chicken with everything you have. It is SPECTACULAR. Every bite better than the last. You eat until you can barely move.");
      showMsg("You topple sideways off the table and land on the tablecloth with a soft thud. You are a sphere. You are at peace.",()=>{
        sfx.purr();
        startAnim("sleep",9999,null);
      });
      showMsg("The humans come home to find: a destroyed tablecloth, a scattered serving lid, an empty plate, and one extremely satisfied spherical cat. MAX is apparently in the backyard and seems fine.");
      showMsg("★ ★ ★  YOU WIN  ★ ★ ★\nFINAL SCORE: "+score+" points\n\nType RESTART to play again.");
    });
    return;
  }

  if(t==="chase tail"||t==="chase my tail"||t==="spin"||t==="chase"){
    startAnim("run",60,()=>showMsg("You spin after your own tail with ABSOLUTE CONVICTION. Three full rotations. You catch it. You are not sure what you expected. You release it and walk away with enormous dignity."));
    addScore(2);return;
  }
  if(t==="zoomies"||t==="zoom"){
    startAnim("run",80,()=>showMsg("3am energy, deployed at noon. You blast a full lap of the room, skid on the rug, ricochet off the wall, stop dead, and sit. You lick your paw. Nothing happened. Nothing ever happened."));
    addScore(3);return;
  }
  if(t==="loaf"||t==="loaf mode"||t==="be a loaf"){
    sfx.purr();
    startAnim("sleep",50,()=>showMsg("You tuck all four paws underneath you and become a perfect oval. No paws. No legs. Just cat. A loaf. You are a loaf."));
    addScore(2);return;
  }
  if(t==="slow blink"||t==="blink slowly"||t==="blink"||t==="trust"){
    startAnim("groom",30,()=>showMsg("You fix the room with a slow, heavy-lidded blink. In cat, this means: I trust you. I am comfortable. This is my domain and I am at peace with it. The room does not blink back. That is fine."));
    addScore(1);return;
  }
  if(t==="chirp"||t==="chatter"||t==="ekekek"||t==="ek ek ek"){
    sfx.chirp();
    startAnim("meow",30,()=>showMsg("Ek ek ek ek ek. The sound comes from somewhere primal. You aren't fully in control of it. Something small and fast must be nearby."));
    addScore(1);return;
  }
  if(t==="knock"||t==="knock off"||t==="knock down"||t==="knock over"||t==="push off"||t==="bat off"||t==="swat off"){
    if(P.layer==="table"||P.layer==="counter"||P.layer==="dresser"){
      startAnim("scratch",35,()=>showMsg("You make deliberate eye contact with the nearest object. You extend one paw. You hold it there for a long moment. Then you push it off the edge. You watch it fall. You feel nothing. You feel everything."));
      addScore(4);return;
    }
    if(P.layer==="lchair"||P.layer==="rchair"){showMsg("You look around the cushion. Nothing up here worth pushing. You consider pushing yourself off, but that would be undignified.");return;}
    showMsg("Nothing to knock off from down here. You need elevation. Gravity is the point.");
    return;
  }
  if(t==="wait"||t==="z"){showMsg("Time passes. You stare into the middle distance. A dust mote floats by.");return;}
  if(t==="fly"){sfx.jump();startAnim("jump",30,()=>showMsg("You flap your paws vigorously. Cats were not designed for flight."));return;}
  if(t==="dig"){startAnim("scratch",35,()=>showMsg("You paw at the floor. This isn't a sandbox."));return;}
  if(t==="hide"){showMsg("You find a shadow under the "+(currentRoom==="dining"?"table":currentRoom==="kitchen"?"counter":"bed")+". You crouch, invisible. PREDATOR.");addScore(2);return;}
  if(t==="run"){startAnim("run",40,()=>showMsg("ZOOMIES! You blast across the room for no reason, then stop suddenly. Normal."));addScore(1);return;}

  // ── ENTER CLOSET ─────────────────────────────────────────
  if(!itemsFound.inCloset&&currentRoom==="bedroom"&&(t==="enter closet"||t==="open closet"||t==="go in closet"||t==="go into closet"||t==="go in"||t==="go closet"||t==="closet")){
    itemsFound.inCloset=true;sfx.door();
    showMsg("You squeeze through the gap. The door swings behind you. Pure darkness. The smell of fresh litter, cedar, and a single forgotten shoe.");
    showMsg("It is very dark in here. You can see nothing. But you know exactly where everything is. You always do.");
    return;
  }

  // ── EXIT CLOSET ──────────────────────────────────────────
  if(itemsFound.inCloset&&(t==="exit"||t==="exit closet"||t==="leave"||t==="leave closet"||t==="come out"||t==="go out"||t==="open door")){
    itemsFound.inCloset=false;P.x=168;P.y=FLOOR-16;sfx.door();
    showMsg(["You shoulder the door open and emerge into the bedroom. You immediately want to go back in. You resist. For now.","You slip back out. The light is horrible after all that lovely darkness. You consider going back in. This is a compulsion.","You exit the closet. You turn around. You stare at the gap. The gap is perfect. You know you'll be back."][Math.floor(Math.random()*3)]);
    return;
  }

  // ── LITTER BOX ───────────────────────────────────────────
  if(["use litter box","use litterbox","use litter","go to bathroom","go to the bathroom","go bathroom","use bathroom","bathroom","pee","wee","poop","go potty","toilet","do your business","use the box","use box","use litter tray"].includes(t)){
    if(!itemsFound.inCloset){
      sfx.error();
      showMsg(["You feel the urge. Go find your box.","Nature calls. You know where to go. Off you go.","That's a private activity. Find somewhere appropriate."][Math.floor(Math.random()*3)]);
      return;
    }
    sfx.scratch();
    startAnim("scratch",120,()=>{
      itemsFound.inCloset=false;P.x=168;P.y=FLOOR-16;sfx.door();
      showMsg(["You find the box in the dark. You do not need light. You are a professional. You scratch with focused intensity. You cover it. Thoroughly. Twice. You emerge. Refreshed. Dignified. Satisfied.","You use the litter box with the quiet efficiency of someone who has done this ten thousand times and will do it ten thousand more. You kick a small amount of litter outside the box. This is intentional. You exit.","In the darkness, you find the box immediately. You do your business. You cover it with the dedication of someone burying treasure. You reemerge. The world is brighter. You did that."][Math.floor(Math.random()*3)]);
      addScore(2);
    });
    return;
  }

  // ── PARSE VERB + NOUN ─────────────────────────────────────
  const words=t.split(/\s+/);
  let verb=null,nounText="";
  if(words.length>=2){const tw=words[0]+" "+words[1];verb=matchVerb(tw);if(verb)nounText=words.slice(2).join(" ");}
  if(!verb){verb=matchVerb(words[0]);nounText=words.slice(1).join(" ");}
  nounText=nounText.replace(/^(at|the|a|an|to|on|in|into|with|my|some|this|that)\s+/g,"").replace(/^(at|the|a|an|to|on|in|into|with|my|some|this|that)\s+/g,"").trim();

  // ── GO DIRECTION ─────────────────────────────────────────
  if(["go","walk","run","move","head"].includes(words[0])){
    const d=words.slice(1).join(" ");
    if(d.match(/east|right/)){if(currentRoom==="dining"){chgRoom("kitchen");return;}if(currentRoom==="bedroom"){chgRoom("dining");return;}showMsg("You're already as far east as you can go.");return;}
    if(d.match(/west|left/)){if(currentRoom==="kitchen"){chgRoom("dining");return;}if(currentRoom==="dining"){chgRoom("bedroom");return;}showMsg("You're already as far west as you can go.");return;}
    if(d.match(/kitchen/)){if(currentRoom==="dining"||currentRoom==="bedroom"){if(currentRoom==="bedroom")chgRoom("dining");chgRoom("kitchen");return;}showMsg("You're already in the kitchen.");return;}
    if(d.match(/bedroom|bed room/)){if(currentRoom==="dining"||currentRoom==="kitchen"){if(currentRoom==="kitchen")chgRoom("dining");chgRoom("bedroom");return;}showMsg("You're already in the bedroom.");return;}
    if(d.match(/dining/)){if(currentRoom==="kitchen"){chgRoom("dining");return;}if(currentRoom==="bedroom"){chgRoom("dining");return;}showMsg("You're already in the dining room.");return;}
    if(d.match(/north|up/)){showMsg("There's a wall that way.");return;}
    if(d.match(/south|down/)){showMsg("The floor is in the way.");return;}
    if(d.match(/outside|out/)){showMsg("Doors and windows are closed. You are a DISTINGUISHED indoor cat.");return;}
    showMsg("Go where? Try: east, west, kitchen, dining room, bedroom.");return;
  }

  if(!verb){
    const noun=matchNoun(t,currentRoom);
    if(noun&&RO[currentRoom][noun]&&RO[currentRoom][noun].look){showMsg(RO[currentRoom][noun].look);return;}
    sfx.error();showMsg(["I don't understand. ENTER then HELP.","Not a thing. Even for a cat.","Try something else.","You tilt your head in confusion."][Math.floor(Math.random()*4)]);return;
  }

  // ── ROOM-WIDE LOOK / SMELL / LISTEN ──────────────────────
  if(verb==="look"&&!nounText){
    if(itemsFound.inCloset){
      showMsg("Inside the closet: total darkness. A litter box, well-maintained. A single shoe. Something that used to be a belt. The sliver of light through the gap is the entire world.");
      showMsg("You could stay in here forever. You won't. But you could.");
      return;
    }
    let desc=roomDescs[currentRoom];
    if(currentRoom==="kitchen"&&itemsFound.chaseTriggered)desc="The kitchen is a disaster zone. The trash barrel is knocked over, contents on the floor. The basket by the door is empty. Max went straight through the doggie door to the backyard. A doorway west leads back to the dining room.";
    if(currentRoom==="dining"&&itemsFound.clothFallen)desc="The dining room after the great chase. The tablecloth is on the floor, the serving lid rolled under a chair. The chandelier still glows. And on the table — a roasted chicken, just sitting there. A doorway east leads to the kitchen. A doorway west leads to the bedroom.";
    if(currentRoom==="bedroom"&&itemsFound.chaseTriggered)desc="The bedroom without Max. The bed is enormous and completely unoccupied. A mahogany dresser stands on the right. The closet door remains slightly ajar. The rug looks very inviting. A doorway east leads back to the dining room.";
    if(desc.includes("|")){const parts=desc.split("|");showMsg(parts[0]);showMsg(parts[1]);}else{showMsg(desc);}
    return;
  }
  if(verb==="smell"&&!nounText){showMsg("You sniff the air. "+(currentRoom==="dining"?"Wood polish, kibble, and contentment.":currentRoom==="kitchen"?"Lemon cleaner, fish stew, and adventure.":"Warm dog, lavender, and dusty dreams."));return;}
  if(verb==="listen"&&!nounText){showMsg("You cock your ears. "+(currentRoom==="dining"?"Chandelier candles crackling and distant birdsong.":currentRoom==="kitchen"?"Fridge humming, faucet dripping, pot bubbling.":"Deep dog snores. The faint tick of a clock."));return;}
  if(verb==="scratch"&&!nounText){sfx.scratch();startAnim("scratch",50,()=>showMsg("You flex your claws and scratch the floor. Ahh, maintenance."));addScore(1);return;}

  const noun=matchNoun(nounText,currentRoom);

  // ── TAKE ─────────────────────────────────────────────────
  if(verb==="take"){
    if(nounText.includes("tuna")){if(inventory.includes("tuna")){showMsg("You already have the tuna.");return;}if(currentRoom!=="kitchen"){showMsg("No tuna here. Try the kitchen fridge.");return;}if(!itemsFound.fridgeOpened){showMsg("Open the fridge first.");return;}inventory.push("tuna");addScore(15);sfx.pickup();showMsg("You extract the tuna with your teeth. Foil-wrapped, smells INCREDIBLE.");return;}
    if(nounText.includes("treat")){if(inventory.includes("cat treats")){showMsg("You already have the treats.");return;}if(currentRoom!=="kitchen"){showMsg("No treats here. Check kitchen cabinets.");return;}if(!itemsFound.cabinetOpened){showMsg("Open the cabinets first.");return;}inventory.push("cat treats");addScore(10);sfx.pickup();showMsg("You snag the bag of Fancy Feast treats. They rattle gloriously.");return;}
    if(nounText.includes("catnip")||nounText.includes("catnip mouse")||nounText==="mouse"||nounText==="toy mouse"||nounText==="mouse toy"){if(inventory.includes("catnip mouse")){showMsg("You already have the catnip mouse.");return;}if(currentRoom!=="bedroom"){showMsg("No toy mouse here.");return;}if(P.layer!=="dresser"){showMsg("You can see something in the open drawer, but you'll need to jump up into the dresser to grab it.");return;}inventory.push("catnip mouse");addScore(10);sfx.pickup();showMsg("You snatch the catnip mouse from the drawer. It crinkles gloriously. Your pupils are enormous.");return;}
    if(noun==="dogtoy"||nounText.includes("dog toy")||nounText.includes("squeaky")||nounText.includes("squeak")||nounText.includes("kong")||nounText==="toy"){if(inventory.includes("dog toy")){showMsg("You already have the squeaky toy.");return;}if(currentRoom!=="kitchen"){showMsg("No squeaky toy here. Check the kitchen by the doggie door.");return;}if(itemsFound.toyTaken){showMsg("The basket is empty. You already have it.");return;}inventory.push("dog toy");itemsFound.toyTaken=true;addScore(5);sfx.pickup();showMsg("You pick up the squeaky toy very carefully. It does not squeak. You intend to keep it that way for now.");return;}
    sfx.error();showMsg("You can't take that.");return;
  }

  // ── DROP ─────────────────────────────────────────────────
  if(verb==="drop"){
    if(nounText.includes("tuna")&&inventory.includes("tuna")){inventory=inventory.filter(i=>i!=="tuna");showMsg("You set the tuna down. Its aroma fills the room.");return;}
    if(nounText.includes("treat")&&inventory.includes("cat treats")){inventory=inventory.filter(i=>i!=="cat treats");showMsg("You drop the treats. Tempting rattle.");return;}
    if((nounText.includes("catnip")||nounText.includes("mouse")||nounText.includes("toy"))&&inventory.includes("catnip mouse")){inventory=inventory.filter(i=>i!=="catnip mouse");showMsg("You drop the catnip mouse. It lands with a satisfying crinkle.");return;}
    showMsg("You're not carrying that.");return;
  }

  // ── EAT (items) ──────────────────────────────────────────
  if(verb==="eat"){
    if(nounText.includes("tuna")&&inventory.includes("tuna")){inventory=inventory.filter(i=>i!=="tuna");sfx.eat();addScore(25);startAnim("eat",50,()=>showMsg("You devour the tuna. MAGNIFICENT. The pinnacle of all nine lives."));return;}
    if(nounText.includes("treat")&&inventory.includes("cat treats")){sfx.eat();addScore(10);startAnim("eat",40,()=>showMsg("Salmon flavored! Eyes go wide. You eat three more."));return;}
    if((nounText.includes("catnip")||nounText.includes("mouse")||nounText.includes("toy"))&&inventory.includes("catnip mouse")){sfx.pickup();addScore(15);startAnim("groom",60,()=>showMsg("You DEMOLISH the catnip mouse. Roll, kick, bunny-kick, repeat. You are FERAL. You are UNSTOPPABLE. You stop suddenly and lick your paw as if nothing happened."));inventory=inventory.filter(i=>i!=="catnip mouse");return;}
    if(noun&&RO[currentRoom][noun]&&RO[currentRoom][noun].eat){sfx.eat();addScore(3);startAnim("eat",40,()=>showMsg(RO[currentRoom][noun].eat));return;}
    showMsg("You can't eat that.");return;
  }

  // ── DRINK ────────────────────────────────────────────────
  if(verb==="drink"){
    if(noun==="sink"&&P.layer!=="counter"){showMsg("You need to be on the counter to reach the faucet. Cats know this. You know this. Jump up first.");return;}
    if(noun&&RO[currentRoom][noun]&&RO[currentRoom][noun].drink){sfx.splash();addScore(3);showMsg(RO[currentRoom][noun].drink);return;}
    showMsg("Nothing drinkable here.");return;
  }

  if(!noun){if(verb==="look")showMsg("You don't see '"+nounText+"' here.");else{sfx.error();showMsg("You don't see that here.");}return;}
  const obj=RO[currentRoom][noun];

  // ── PRE-RO STATE OVERRIDES ───────────────────────────────
  if(noun==="table"){
    if(verb==="look"){showMsg(itemsFound.clothFallen?"The table is bare — tablecloth crumpled on the floor, lid knocked aside. A roasted chicken sits on a plate right there. Waiting for you.":"A sturdy oak table with a deep red tablecloth. A silver serving lid sits on it — something smells INCREDIBLE underneath.");return;}
    if(verb==="smell"){showMsg(itemsFound.clothFallen?"FRESH ROASTED CHICKEN. Right there on a plate. You are a being of pure focus.":"It smells faintly of last night's roast chicken. Maddeningly close.");return;}
  }
  if(noun==="trash"&&itemsFound.chaseTriggered){
    if(verb==="look"){showMsg("The trash barrel is knocked over on its side, contents scattered. Chicken bones on the tile. The cat approves of this outcome.");return;}
    if(verb==="smell"){showMsg("Old chicken scraps and floor. You sniff. Mostly just floor now.");return;}
    if(verb==="push"||verb==="touch"){showMsg("It's already on the floor. Max did a thorough job.");return;}
  }
  if(noun==="bones"&&!itemsFound.chaseTriggered){showMsg("You don't see any bones here. The trash barrel is upright and closed.");return;}
  if(noun==="dog"&&itemsFound.chaseTriggered){showMsg("Max blasted through the doggie door and is in the backyard. The bed is all yours now.");return;}
  if(noun==="bed"&&itemsFound.chaseTriggered){
    if(verb==="look"){showMsg("The bed is empty! Max is out in the backyard. The whole magnificent expanse is YOURS.");return;}
    if(verb==="smell"){showMsg("Warm blankets and the fading ghost of dog. You don't mind. You settle in triumphantly.");return;}
  }
  if(noun==="dresser"&&verb==="look"&&P.layer!=="dresser"){showMsg(inventory.includes("catnip mouse")?"A mahogany dresser with an open top drawer. You've already claimed what was inside.":"A mahogany dresser with an open top drawer. You can just make out something crinkly in there. You'd need to get inside to reach it.");return;}
  if(noun==="dresser"&&verb==="look"&&P.layer==="dresser"){showMsg(inventory.includes("catnip mouse")?"You are sitting in an open dresser drawer. Socks. A hairbrush. A guitar pick. The catnip mouse is gone — you already have it.":"You are sitting inside the open drawer. Socks. A hairbrush. A guitar pick. And — right there — a catnip mouse.");return;}
  if(noun==="dogtoy"&&itemsFound.chaseTriggered){showMsg("The basket is still there, but empty now. Max took the toy out through the doggie door.");return;}

  // ── CLIMB (delegate to jumpOnto) ─────────────────────────
  if(verb==="climb"){
    let jumpNoun=noun;
    if(noun==="chair"){
      const lDist=Math.abs(P.x-67),rDist=Math.abs(P.x-249);
      jumpNoun=lDist<=rDist?"lchair":"rchair";
    }
    const handled=jumpOnto(jumpNoun);
    if(handled)return;
    // Fall through to RO handler if not a surface
  }

  if(verb==="open"&&noun==="fridge"){itemsFound.fridgeOpened=true;addScore(5);}
  if(verb==="open"&&noun==="cabinet"){itemsFound.cabinetOpened=true;addScore(5);}
  if(verb==="enter"||(verb==="open"&&(noun==="doorR"||noun==="doorL"))){
    if(noun==="doorR"&&currentRoom==="dining"){chgRoom("kitchen");return;}
    if(noun==="doorL"&&currentRoom==="kitchen"){chgRoom("dining");return;}
  }

  // Lid requires being on the table
  if(noun==="lid"&&!itemsFound.clothFallen&&currentRoom==="dining"&&P.layer!=="table"){
    if(verb==="look"||verb==="smell"){/* allow from floor */}
    else{showMsg("The lid is on the table. You'll need to jump up there to reach it.");return;}
  }

  // State-gated plot objects
  if(noun==="chicken"&&!itemsFound.clothFallen){
    if(verb==="smell")showMsg("Something amazing is under that silver lid. You can smell it from here — roasted chicken, without a doubt.");
    else showMsg("You don't see any chicken. There's a silver serving lid on the table though...");
    return;
  }
  if(noun==="lid"&&itemsFound.clothFallen){showMsg("The lid is on the floor under a chair, forgotten. The chicken is what matters now.");return;}
  if(noun==="tablecloth"&&itemsFound.clothFallen){showMsg("The tablecloth is crumpled on the floor. Max really made a mess of things.");return;}

  // ── RO DISPATCH ───────────────────────────────────────────
  if(obj[verb]){
    let resp=obj[verb];
    if(resp==="$KITCHEN"){chgRoom("kitchen");return;}
    if(resp==="$DINING"){chgRoom("dining");return;}
    if(resp==="$ENTER_CLOSET"){
      if(currentRoom!=="bedroom"){showMsg("There is no closet here.");return;}
      itemsFound.inCloset=true;sfx.door();
      showMsg("You squeeze through the gap. The door swings behind you. Pure darkness. The smell of fresh litter, cedar, and a single forgotten shoe.");
      showMsg("It is very dark in here. You can see nothing. But you know exactly where everything is. You always do.");
      return;
    }
    if(resp==="$ANIM_SCRATCH"){sfx.scratch();startAnim("scratch",50,()=>showMsg("You flex your claws and scratch vigorously. Ahh, maintenance."));addScore(1);return;}
    if(resp.startsWith("$CHIRP_")){sfx.chirp();showMsg(resp.slice(7));return;}

    const isBad=resp.startsWith("$BADCAT_");
    if(isBad)resp=resp.slice(8);

    if(verb==="scratch"||verb==="climb"){
      const layerMap={table:"table",counter:"counter",bed:"bed"};
      const layerY={table:78,counter:70,bed:64};
      if(verb==="climb"&&layerMap[noun]&&P.layer==="floor"){
        sfx.jump();
        startAnim("jump",36,()=>{
          sfx.land();P.layer=layerMap[noun];P.y=layerY[noun];
          showMsg(resp);addScore(isBad?3:2);
        });
        return;
      }
      const snd=isBad?sfx.badcat:verb==="scratch"?sfx.scratch:sfx.jump;
      const animType=verb==="scratch"?"scratch":"jump";
      const frames=verb==="scratch"?50:36;
      snd();
      startAnim(animType,frames,()=>{
        if(verb==="climb")sfx.land();
        showMsg(resp);
        if(isBad)addScore(3);else addScore(2);
      });
      return;
    }
    if(isBad){sfx.badcat();showMsg(resp);addScore(3);return;}
    if(verb==="sit"){startAnim("sleep",50,()=>showMsg(resp));addScore(2);return;}
    if(verb==="eat"){sfx.eat();startAnim("eat",40,()=>showMsg(resp));addScore(2);return;}
    showMsg(resp);
    if(verb==="open")addScore(2);
    return;
  }

  // Late state-aware fallbacks (table/trash have duplicate overrides)
  if(noun==="table"){
    if(verb==="look"){showMsg(itemsFound.clothFallen?"The table is bare — tablecloth on the floor, lid knocked aside. A roasted chicken sits on a plate. Just sitting there. For you.":"A sturdy oak table with a deep red tablecloth. A silver serving lid sits on it — something smells INCREDIBLE underneath.");return;}
    if(verb==="smell"){showMsg(itemsFound.clothFallen?"FRESH ROASTED CHICKEN. Right there on a plate. You are a being of pure focus.":"It smells faintly of last night's roast chicken. Maddeningly close.");return;}
  }
  if(noun==="trash"&&itemsFound.chaseTriggered){
    if(verb==="look"){showMsg("The trash barrel is knocked over, contents scattered. Chicken bones on the floor. The cat approves of this outcome.");return;}
    if(verb==="smell"){showMsg("Old chicken and floor tile. You sniff. Mostly just floor now.");return;}
    if(verb==="push"||verb==="touch"){showMsg("It's already on the floor. Max did a thorough job.");return;}
  }

  // Generic fallback responses
  const fb={
    look:"You look more closely. Nothing remarkable.",
    smell:"You sniff it. Smells like "+nounText+".",
    touch:"You paw at it. Solid.",taste:"You lick it cautiously. Indeterminate.",
    listen:"Silence.",push:"You push. Nothing.",pull:"Doesn't budge.",
    climb:"You eye it speculatively but decide against jumping on that. Even cats have limits. Some.",
    sit:"Can't sit on that comfortably.",
    scratch:"You consider scratching it but something holds you back. A rare moment of restraint.",
    turn:"Can't turn that.",open:"Can't open that.",close:"Already closed.",
    enter:"Can't enter that.",use:"Not sure how.",talk:"You meow at it. No response."
  };
  showMsg(fb[verb]||("You can't "+verb+" that."));
}
