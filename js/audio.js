// ── AUDIO ──────────────────────────────────────────────────
let ac=null, masterGain=null;

function ea(){
  if(!ac){
    ac=new(AudioContext||webkitAudioContext)();
    masterGain=ac.createGain();
    masterGain.gain.value=1.0;
    masterGain.connect(ac.destination);
  }
}

function tone(f,d,t,v){
  ea();
  const o=ac.createOscillator(),g=ac.createGain();
  o.type=t||"square";
  o.frequency.setValueAtTime(f,ac.currentTime);
  g.gain.setValueAtTime(v||0.07,ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+d);
  o.connect(g);g.connect(masterGain);o.start();o.stop(ac.currentTime+d);
}

function noise(d,v){
  ea();
  const n=ac.sampleRate*d|0,b=ac.createBuffer(1,n,ac.sampleRate),a=b.getChannelData(0);
  for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*Math.exp(-i/(n*0.3));
  const s=ac.createBufferSource(),g=ac.createGain();
  s.buffer=b;g.gain.value=v||0.05;s.connect(g);g.connect(masterGain);s.start();
}

const sfx={
  meow(){tone(900,.12,"sawtooth",.09);setTimeout(()=>tone(600,.18,"sawtooth",.08),100);setTimeout(()=>tone(450,.25,"sawtooth",.06),220);},
  purr(){for(let i=0;i<8;i++)setTimeout(()=>tone(50+Math.random()*20,.14,"sawtooth",.05),i*70);},
  pickup(){tone(440,.06,"square",.07);setTimeout(()=>tone(660,.06,"square",.07),60);setTimeout(()=>tone(880,.1,"square",.07),120);},
  door(){tone(120,.15,"triangle",.09);setTimeout(()=>tone(90,.2,"triangle",.07),100);},
  eat(){for(let i=0;i<4;i++)setTimeout(()=>tone(180+Math.random()*120,.05,"square",.06),i*60);},
  error(){tone(150,.15,"square",.06);setTimeout(()=>tone(100,.2,"square",.05),120);},
  score(){tone(523,.07,"square",.06);setTimeout(()=>tone(659,.07,"square",.06),70);setTimeout(()=>tone(784,.1,"square",.06),140);},
  hiss(){noise(.3,.05);},
  splash(){noise(.15,.04);},
  jump(){tone(250,.05,"square",.06);setTimeout(()=>tone(400,.05,"square",.06),40);setTimeout(()=>tone(550,.08,"square",.06),80);},
  scratch(){for(let i=0;i<3;i++)setTimeout(()=>noise(.06,.04),i*90);},
  stretch(){tone(200,.2,"sawtooth",.04);setTimeout(()=>tone(280,.25,"sawtooth",.03),180);},
  yawn(){tone(300,.15,"sawtooth",.05);setTimeout(()=>tone(200,.3,"sawtooth",.04),120);setTimeout(()=>tone(150,.2,"sawtooth",.03),350);},
  land(){tone(80,.1,"triangle",.08);},
  badcat(){tone(200,.1,"square",.08);setTimeout(()=>tone(150,.1,"square",.08),100);setTimeout(()=>tone(100,.15,"square",.07),200);},
  crash(){tone(80,.18,"square",.12);setTimeout(()=>tone(60,.22,"square",.1),80);setTimeout(()=>noise(.25,.08),160);setTimeout(()=>tone(900,.05,"sawtooth",.06),400);},
  fanfare(){tone(262,.07,"square",.08);setTimeout(()=>tone(330,.07,"square",.08),90);setTimeout(()=>tone(392,.07,"square",.08),180);setTimeout(()=>tone(523,.15,"square",.1),270);setTimeout(()=>tone(659,.1,"square",.09),430);setTimeout(()=>tone(784,.28,"square",.1),550);},
  alert(){tone(180,.05,"square",.07);setTimeout(()=>tone(300,.05,"square",.07),60);setTimeout(()=>tone(480,.1,"square",.09),120);},
  chirp(){tone(1800,.04,"square",.06);setTimeout(()=>tone(2200,.03,"square",.05),40);setTimeout(()=>tone(1600,.04,"square",.05),75);setTimeout(()=>tone(2000,.05,"square",.06),110);setTimeout(()=>tone(2400,.04,"square",.04),150);},
  win(){tone(523,.1,"square",.08);setTimeout(()=>tone(659,.1,"square",.08),120);setTimeout(()=>tone(784,.1,"square",.08),240);setTimeout(()=>tone(1047,.3,"square",.1),360);setTimeout(()=>tone(784,.1,"square",.07),700);setTimeout(()=>tone(1047,.4,"square",.1),820);},
};
