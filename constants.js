"use strict";

// ── CANVAS & DIMENSIONS ────────────────────────────────────
const GW=320,GH=200,TOP=12,FLOOR=142; // FLOOR = where wall meets floor
const C=document.getElementById("game");
let X=C.getContext("2d");
C.width=GW;C.height=GH;C.focus();

// ── EGA COLOUR PALETTE ─────────────────────────────────────
const E={
  black:"#000000",blue:"#0000AA",green:"#00AA00",cyan:"#00AAAA",
  red:"#AA0000",mag:"#AA00AA",brown:"#AA5500",lgray:"#AAAAAA",
  dgray:"#555555",lblue:"#5555FF",lgreen:"#55FF55",lcyan:"#55FFFF",
  lred:"#FF5555",lmag:"#FF55FF",yellow:"#FFFF55",white:"#FFFFFF"
};

// ── RESPONSIVE SCALING ────────────────────────────────────
function fit(){
  const mW=Math.min(640,innerWidth-20),mH=innerHeight-50;
  let w=mW,h=mW*GH/GW;
  if(h>mH){h=mH;w=h*GW/GH;}
  C.style.width=w+"px";C.style.height=h+"px";
}
fit();
addEventListener("resize",fit);
