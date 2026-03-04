// ── ROOM DESCRIPTIONS (used by LOOK with no noun) ──────────
const roomDescs={
  dining:"An elegant dining room. A great oak table sits in the center with a red tablecloth, flanked by red-cushioned chairs. A silver serving lid sits on the table — something smells incredible underneath. A chandelier glows warmly above. Curtains frame a sunny window. A painting by 'M. Whiskers' hangs on the far wall. A food bowl sits near the right wall. A doorway east leads to the kitchen. A doorway west leads to the bedroom.",
  kitchen:"A tidy kitchen with checkered floors. A big dark fridge hums on the left. A gas stove and bubbling pot on the right. A trash barrel stands near the stove. A doorway west leads back to the dining room.|Wooden cabinets line the walls. A water bowl sits by the fridge. A counter and sink run along the back. A small basket by the doggie door holds a squeaky toy. Something smells like it was recently cooked.",
  bedroom:"A cozy bedroom with warm mauve walls. A king-size bed dominates the left side, occupied by a snoring golden retriever. A mahogany dresser with an oval mirror stands on the right. A closet door stands slightly ajar in the center of the wall — something familiar wafts out. A framed photo of Max hangs nearby. A plush rug covers the floor. A doorway east leads back to the dining room."
};

// ── NOUN ALIAS MAP ─────────────────────────────────────────
// Maps canonical noun keys to arrays of recognisable aliases.
const nounMap={
  table:["table","oak","dining table"],
  chandelier:["chandelier","candle","candles","light","lights"],
  window:["window","curtain","curtains","outside"],
  painting:["painting","picture","landscape","art","portrait"],
  chair:["chair","chairs","seat","cushion"],
  bowl:["bowl","food bowl","kibble","food","cat food","cat bowl"],
  doorR:["door","doorway","exit","east","kitchen door"],
  fridge:["fridge","refrigerator","icebox","freezer"],
  stove:["stove","oven","burner","burners","range","flame"],
  counter:["counter","countertop","bench"],
  cabinet:["cabinet","cabinets","cupboard","cupboards","drawer","drawers"],
  sink:["sink","faucet","tap","basin"],
  kwindow:["window","kitchen window"],
  pot:["pot","soup","cooking","saucepan","stew"],
  waterbowl:["water bowl","water dish","water","cat water"],
  doorL:["door","doorway","exit","west","dining door","dining room door"],
  magnets:["magnet","magnets","fridge magnets"],
  knobs:["knob","knobs","stove knobs"],
  plates:["plate","plates","dish","dishes"],
  floor:["floor","tile","tiles","ground"],
  wall:["wall","walls","wallpaper"],
  ceiling:["ceiling","roof"],
  closet:["closet","closet door","wardrobe"],
  litterbox:["litter box","litterbox","litter","litter tray","cat box","cat toilet"],
  photo:["photo","photograph","picture","portrait","frame","framed","framed photo","photo of max","picture of max","dog photo","dog picture"],
  bed:["bed","mattress","pillow","blanket","blankets","sheets","duvet","covers","bedding"],
  dog:["dog","doggy","puppy","pup","hound","pooch","retriever","fido","rover","good boy","max"],
  dresser:["dresser","drawers","drawer","bureau","chest"],
  mirror:["mirror","reflection","looking glass"],
  rug:["rug","carpet","mat"],
  catnip:["catnip","catnip mouse","toy mouse","mouse toy","mouse"],
  doorE:["doorway","east","dining","dining room"],
  lid:["lid","serving lid","silver lid","dome","cover","cloche"],
  tablecloth:["tablecloth","cloth","table cloth","drape"],
  chicken:["chicken","roast","roasted chicken","carcass","bird","dinner"],
  dogtoy:["dog toy","squeaky toy","squeaky","squeak toy","rubber toy","toy","kong","rubber kong"],
  basket:["basket","wicker"],
  trash:["trash","trash barrel","garbage","bin","barrel","can"],
  bones:["bones","chicken bones","scraps","chicken scraps","carcass","leftovers","bone"]
};

// ── ROOM OBJECTS ───────────────────────────────────────────
// RO[room][noun][verb] = response string.
// Special prefixes: $BADCAT_ $CHIRP_ $ANIM_SCRATCH $KITCHEN $DINING $ENTER_CLOSET
const RO={
  dining:{
    table:{
      look:"A sturdy oak table with a deep red tablecloth. It's seen many feasts and the occasional feline nap. There's a silver serving lid on it — and something smells INCREDIBLE underneath.",
      smell:"It smells faintly of last night's roast chicken.",
      touch:"Smooth and cool under your paws. Good quality.",
      push:"You push against the table leg. It doesn't budge.",
      climb:"$BADCAT_You leap onto the table! The plates rattle. You survey your domain from on high. A voice from another room yells. You hop down looking innocent.",
      listen:"You press your ear to the table. Wood. Just wood.",
      scratch:"$BADCAT_You sink your claws into the table leg and give it a good rake. Deep gouges appear in the oak. Satisfying, but you'll blame the dog."
    },
    lid:{
      look:"A silver serving lid, domed and heavy. Concealing something. The smell is maddening.",
      smell:"CHICKEN. Unmistakably, gloriously, ROASTED CHICKEN.",
      taste:"Cool metal. No taste. The smell coming from beneath it is the real crime.",
      touch:"You hook a claw under the edge and pull. It barely shifts. Whatever is under here smells incredible.",
      push:"You push. The lid shifts half an inch and slides back. The smell intensifies cruelly.",
      pull:"You wedge both paws under the rim and HEAVE. It scrapes an inch and clunks back. Too heavy.",
      move:"You shove the lid from the side. It pivots slightly and settles. Maddeningly immovable.",
      take:"You try to grab it — claws skitter across the smooth dome. No purchase. You need another approach.",
      open:"You wedge both paws under the lid and HEAVE. It shifts three inches... then clangs back down. It's far too heavy. There has to be another way.",
      sit:"You sit and stare at the lid. This solves nothing but feels appropriate."
    },
    tablecloth:{
      look:"A long red tablecloth that drapes all the way to the floor. Very dramatic. Very... grabbable.",
      touch:"It's slightly rough. Good for claws. You resist the urge — for now.",
      taste:"You lick the edge of the tablecloth. Fabric and faint chicken grease. A discovery. Unfortunate.",
      pull:"You tug the edge. Everything on the table rattles. You freeze. You let go."
    },
    chicken:{
      look:"A roasted chicken on a white plate. Golden brown. Glistening. Yours.",
      smell:"The most perfect chicken smell in the entire world. You have lived your whole life for this moment.",
      eat:"You attack the chicken with everything you have. It's spectacular. Every bite is better than the last. You eat until you are spherical. This is victory. This is what the whole day was building to. SCORE!"
    },
    chandelier:{
      look:"Five candles flicker above the table. The light casts dancing shadows.",
      touch:"Too high to reach. Even for you.",
      listen:"The candles crackle softly.",
      smell:"Warm wax and a hint of smoke.",
      climb:"You eye the chandelier. You COULD make that jump... NO. Bad cat. You'd bring the whole thing down."
    },
    window:{
      look:"$CHIRP_Through the curtained window you see a bright sunny day. Birds hopping on the lawn. Something primal stirs. Your jaw begins to chatter. Ek ek ek ek ek. You cannot stop it. You do not try.",
      open:"You nose the curtain aside. The window is closed, but the view of birds is MAGNIFICENT.",
      touch:"The curtain fabric is velvety. You resist clawing it. Barely.",
      smell:"Dust, sunshine, and a faint hint of bird.",
      listen:"Birdsong through the glass. Your ears rotate like satellite dishes.",
      scratch:"$BADCAT_You sink your claws into the curtain fabric and drag them down. SHRRRRIP! ...You freeze. You hear footsteps. You casually walk away as if nothing happened.",
      climb:"$BADCAT_You grab the curtains and climb halfway up! The rod creaks ominously. You descend with what dignity remains."
    },
    painting:{
      look:"A lovely pastoral landscape - green hills, blue sky, golden sun. Signed 'M. Whiskers'.",
      touch:"Nice texture. You consider adding your own artistic contribution with claws.",
      smell:"Old paint and pretension.",
      scratch:"$BADCAT_You reach up and rake your claws across the canvas! A new scratch joins M. Whiskers' masterpiece. It's... arguably an improvement?",
      climb:"$BADCAT_You leap at the painting! It swings wildly on its hook. You dangle for a moment before dropping gracefully. The painting hangs crooked now."
    },
    chair:{
      look:"Well-crafted chairs with red cushions. Grey cat hair covers both. Obviously.",
      sit:"You hop onto the cushion and knead it thoroughly. It is already shaped like you.",
      touch:"The cushion is warm and soft. Perfectly cat-shaped, through years of effort.",
      smell:"Smells like you. This is YOUR chair and has been for some time.",
      scratch:"$BADCAT_You dig your claws into the cushion fabric and drag. Threads pop. Stuffing peeks out. The cushion had it coming.",
      climb:"You could sit on a chair from the floor. Or you could leap directly to the table. Decisions, decisions.",
      push:"You nudge the chair with your shoulder. It scrapes across the floor. Deeply satisfying noise."
    },
    bowl:{
      look:"A ceramic bowl of cat kibble. A few pieces scattered on the floor.",
      eat:"You crunch some kibble. Crunchy outside, vaguely meat-flavored inside. 7 of 10.",
      taste:"You lick a piece of kibble experimentally. Adequately meat-adjacent. You eat it. You eat three more.",
      smell:"Adequately food-like.",
      touch:"You bat a piece of kibble across the floor. Satisfying.",
      push:"You nudge the bowl. It scrapes across the floor.",
      sit:"You sit next to the bowl. A bold power move.",
      listen:"The kibble sits there, silently judging you."
    },
    doorR:{look:"A doorway east to the kitchen. You smell something cooking.",enter:"$KITCHEN"},
    plates:{
      look:"Two white dinner plates on the table.",
      push:"$BADCAT_You place one paw on the plate and sloooowly push it toward the edge. It teeters... and crashes to the floor! SMASH! You stare down at the shards with zero remorse.",
      lick:"You lick a plate. Porcelain and faded memories of chicken.",
      climb:"The plate is flat. You sit on it. You are a cat on a plate. This is your life now."
    },
    floor:{look:"Hardwood flooring. Kibble pieces scattered about.",smell:"Wood polish and paws.",scratch:"$ANIM_SCRATCH"},
    wall:{look:"Cyan wallpaper with a delicate repeating pattern. Very 1987.",scratch:"$ANIM_SCRATCH",smell:"Paste and nostalgia."},
    ceiling:{look:"The chandelier hangs from a white ceiling. You contemplate the leap."}
  },

  kitchen:{
    fridge:{
      look:"A large dark grey fridge humming with mysterious promise. Colorful magnets on the door.",
      open:"You hook a claw around the handle and pull. Cold air! Inside: milk, cheese, leftover tuna in foil, and a suspicious jar of pickles.",
      smell:"Even closed, you detect tuna, cheese, and something questionable.",
      listen:"HUMMMMM. The eternal song of the fridge.",
      push:"Immovable. A worthy adversary.",
      touch:"Cold and smooth. You leave a perfect paw print.",
      climb:"$BADCAT_You scramble up the side of the fridge and perch on top! Dust bunnies up here. And... a lost toy mouse from 2019. You knock it off the edge triumphantly.",
      scratch:"Your claws screech across the dark enamel. The fridge doesn't care. It keeps humming."
    },
    stove:{
      look:"A gas stove with a blue flame. A pot bubbles on top. Knobs line the front.",
      smell:"Something savory. Your nose twitches.",
      listen:"Gas hisses. The pot bubbles. Blub blub blub.",
      touch:"CAREFUL! Hot! You pull your paw back.",
      turn:"You bat at a stove knob. The flame flickers. You decide not to burn the house down.",
      climb:"$BADCAT_You jump onto the stove and IMMEDIATELY regret it! HOT HOT HOT! You leap off with a yowl. Your paws are fine but your pride is singed.",
      scratch:"The stove is metal. Your claws just slide off with a horrible screech. Even YOU don't like that sound."
    },
    pot:{
      look:"A pot of something delicious simmering. Steam curls up lazily.",
      smell:"You stand on hind legs. Fish stew. HEAVENLY.",
      taste:"Too hot. Probably for the best.",
      touch:"HOT! You yank your paw back. You knew that.",
      listen:"Blub... blub... blub.",
      climb:"You attempt to get closer. The steam hits your nose. Immediate retreat."
    },
    counter:{
      look:"A long wooden countertop with brass-knobbed cabinets above and below.",
      climb:"$BADCAT_You leap onto the counter in one fluid motion. You are KING up here. You knock a spoon off the edge just because you can.",
      touch:"Smooth wood, a little sticky near the honey jar.",
      smell:"Crumbs, soap, ghost of a thousand sandwiches.",
      scratch:"$BADCAT_You rake your claws across the wooden countertop. Long pale scratches appear in the finish. Oops. Worth it."
    },
    cabinet:{
      look:"Wooden cabinets with brass knobs. They hold kitchen secrets.",
      open:"You hook a cabinet open. Plates, bowls, a dusty cookbook, and... a bag of Fancy Feast cat treats!",
      smell:"Through closed doors, you detect something. Treats?",
      climb:"$BADCAT_You clamber up the cabinet doors using the knobs as footholds. A brass knob pops off and clatters to the floor. You reach the top shelf. The view is excellent.",
      scratch:"$BADCAT_You dig your claws into the cabinet wood. Beautiful gouges. Someone spent a lot of money on these cabinets. That's their problem."
    },
    sink:{
      look:"A stainless steel sink with a dripping faucet. Plip... plip...",
      turn:"You bat the faucet handle. Water flows! Bat again. It stops. Technology mastered.",
      drink:"You lap at the dripping faucet. Kitchen sink water is INFINITELY better than bowl water. Known fact.",
      listen:"Plip... plip... plip. Hypnotic.",
      touch:"Cold steel and water. You shake droplets off with dignity."
    },
    kwindow:{
      look:"$CHIRP_Through the window you see the garden. A bird on the fence. Your jaw starts going before your brain does. Ek ek ek ek. Primal. Embarrassing. Correct.",
      smell:"Fresh air. Grass, soil, and that BIRD.",
      listen:"The bird chirps. Definitely mocking you."
    },
    waterbowl:{
      look:"A small bowl of fresh water. Sparkles in the light.",
      drink:"You lap some water. Adequate. Not as good as faucet water.",
      taste:"You lap a little. Cool, clean, adequate. Still not as good as faucet water.",
      touch:"You dip a paw in and flick droplets. Art.",
      push:"You nudge the bowl. Water sloshes.",
      sit:"You sit next to the water bowl. Ownership established.",
      smell:"Clean water. Adequate."
    },
    magnets:{
      look:"Three magnets: a red fish, a green 'MEOW', and a yellow star.",
      touch:"You bat the fish magnet. It slides down the fridge. Satisfying."
    },
    doorL:{look:"A doorway west to the dining room.",enter:"$DINING"},
    dogtoy:{
      look:"A rubber squeaky toy shaped like a hot dog sitting in a little basket by the doggie door. You can practically hear how loud it would be.",
      smell:"Rubber and dog slobber. Pungent.",
      touch:"You poke it with one claw. It emits a tiny test-squeak. Your ears flatten. That is LOUD.",
      take:"You pick up the squeaky toy delicately between your teeth. It does not squeak. Yet."
    },
    basket:{
      look:"A small wicker basket by the doggie door. Home to the squeaky toy.",
      smell:"Wicker and dog.",
      touch:"Scratchy wicker. The basket shifts a little.",
      push:"You headbutt the basket. It rocks.",
      sit:"You consider sitting in it. It is slightly too small and also smells like dog. You decline."
    },
    bones:{
      look:"Chicken bones and scraps strewn across the tile. The barrel's former contents. Magnificent chaos.",
      smell:"Roasted chicken, cold now. Still compelling. You are not above this.",
      eat:"You crunch down on a bone and — CRACK — a sharp shard scrapes your tongue. You spit it out immediately. Every cat instinct screams NO. These are cooked bones. They splinter. You back away with dignity and pretend that never happened.",
      taste:"Meaty. Deeply, magnificently meaty. But something makes you stop — a shard catches your tongue just slightly, a warning. These bones are cooked. They splinter into tiny needles. You are smart enough to lick and retreat.",
      touch:"You bat a bone across the tile. It skitters satisfyingly. You bat it again. This is fine."
    },
    trash:{
      look:"A tall kitchen trash barrel, lid slightly ajar. Something large and delicious-smelling is wedged inside. You tsk-tsk internally — these scraps really should go in the compost. Or, better yet, given to the cat.",
      smell:"Roasted chicken. Recent. Your pupils dilate involuntarily.",
      touch:"You push the barrel. It's heavy and barely wobbles. You're not moving this.",
      push:"You throw your whole body against it. The barrel rocks slightly and settles. Nothing. You need a larger mammal."
    },
    floor:{look:"Black and white checkered tile. You see your handsome reflection.",smell:"Lemon cleaner and tiny crumbs.",scratch:"$ANIM_SCRATCH"},
    wall:{look:"Light cyan walls with a tiled backsplash.",scratch:"$ANIM_SCRATCH"},
    ceiling:{look:"White ceiling with a fluorescent light. Functional."},
    knobs:{look:"Four stove knobs. Great power, great responsibility.",turn:"You swat a knob. Click. Nothing catches fire. Success!"}
  },

  bedroom:{
    bed:{
      look:"A king-size bed with orange and gold blankets. The dog has claimed roughly 80% of it.",
      smell:"Warm dog, fabric softener, and the ghost of a thousand naps.",
      touch:"Impossibly soft. You knead the blanket involuntarily.",
      sit:"You hop up and curl into a tight circle at the foot of the bed. This is yours now.",
      climb:"$BADCAT_You leap onto the bed! The dog stirs. You freeze. It lets out a long sigh and resettles. You own this pillow.",
      push:"You nudge the dog firmly. It grunts and takes up even MORE space.",
      listen:"The blanket rustles. The dog breathes in long, contented snores."
    },
    dog:{
      look:"A golden retriever, fast asleep. Paws twitching in some dream. A small, dignified trail of drool.",
      smell:"$BADCAT_You creep up and sniff the dog's ear. One leg twitches wildly. You sprint to the other side of the room.",
      touch:"$BADCAT_You tap the dog with one paw. It shifts. You freeze. Heart rate: 400bpm. It resettles. You are fine. You are FINE.",
      taste:"$BADCAT_You lick the top of Max's head. He smells like outside and biscuits. His tail wags once in his sleep. You regret everything.",
      listen:"Deep rumbling snores. The occasional dream-whimper. It is dreaming of chasing something. Probably you.",
      talk:"You hiss softly at the sleeping dog. It snores louder in response. Incredible.",
      scratch:"$BADCAT_You swat the dog on the nose. One eye half-opens. You look elaborately at the ceiling. The eye closes. Crisis averted.",
      sit:"You sit beside the dog with great dignity and pretend you were never intimidated by it."
    },
    catnip:{
      look:"A small fabric mouse stuffed with catnip. One button eye. Slightly soggy from a previous encounter.",
      smell:"CATNIP. Your pupils dilate to the size of dinner plates.",
      touch:"You bat it. It skids across the floor. You freeze. You bat it again. This is everything.",
      take:"You snatch it up. It crinkles satisfyingly in your teeth."
    },
    dresser:{
      look:"A mahogany dresser. The top drawer hangs open — someone left it like that. Something inside catches your eye.",
      smell:"Cedar, old fabric, and something that makes your nose twitch.",
      touch:"Solid mahogany. Excellent for claw maintenance. Not that you would.",
      scratch:"$BADCAT_You rake your claws down the side of the dresser. Long pale gouges appear in the mahogany. Someone spent real money on this. Their problem.",
      climb:"$BADCAT_You scrabble up the dresser drawers using the brass knobs as footholds. One knob pops off with a loud clank. You make it to the top. The view is excellent. The knob rolls under the bed."
    },
    mirror:{
      look:"A large oval mirror above the dresser. An exceptionally handsome and dignified cat stares back.",
      touch:"You paw at the glass. The other cat copies you PERFECTLY. Unsettling. Suspicious.",
      smell:"Glass and silver backing. The other cat seems to smell the same thing.",
      scratch:"You scratch at the mirror. The reflection scratches back. An impasse. Neither of you blink.",
      sit:"You sit in front of the mirror and stare. The other cat stares back. Neither of you blinks for a very long time.",
      listen:"Silence. The other cat seems to hear the same nothing."
    },
    closet:{
      look:"A slightly ajar closet door set into the wall. Through the gap, a familiar smell wafts out — fresh litter, old shoes, and the particular darkness that only closets have. You know what's in there.",
      smell:"Through the gap: cedar, litter, shoe leather. Everything you need. You consider your options.",
      touch:"You bat the door. It swings open another inch, then drifts back. Still ajar.",
      enter:"$ENTER_CLOSET",
      open:"$ENTER_CLOSET"
    },
    photo:{
      look:"A framed photograph of Max on the wall. He's sitting in a sunny garden, tongue out, looking extremely pleased with himself. He has no idea what's coming. You study his face. You feel nothing. You feel everything.",
      smell:"Photo paper and the faint ghost of dog. Your nose twitches involuntarily.",
      touch:"You paw at the frame. It swings slightly on its nail. Max's expression remains infuriatingly cheerful."
    },
    rug:{
      look:"A circular rug in warm reds and oranges. The kind of rug that just wants to be kneaded.",
      touch:"You press your paws in slowly. Divine. You stay like this for a while.",
      sit:"You circle three times and collapse into the rug. It accepts you completely. Warmth. Safety. Perfection.",
      smell:"Wool and old warmth. You have definitely slept here before.",
      taste:"You lick the rug. Wool, dust, and time. You stop immediately.",
      scratch:"$ANIM_SCRATCH"
    },
    doorE:{look:"A doorway east back to the dining room.",enter:"$DINING"},
    floor:{look:"Hardwood floor covered by a plush rug. Everything here is soft.",smell:"Clean and cozy.",scratch:"$ANIM_SCRATCH"},
    wall:{look:"Warm mauve walls with a faint repeating pattern.",scratch:"$ANIM_SCRATCH"},
    ceiling:{look:"White ceiling. You briefly consider the logistics. You decide not to today."},
    window:{
      look:"$CHIRP_Through the curtains, a morning garden. A squirrel on the fence stares directly at you. Your jaw betrays you instantly. Ek ek ek ek ek. The squirrel does not blink. You do not stop. Neither of you acknowledges this.",
      smell:"Fresh morning air, wet grass, and that squirrel.",
      listen:"Birds, a light wind, and the distant squirrel chattering."
    }
  }
};
