window.addEventListener("load", sidenVises);

//OPRETTER FLERE ELEMENTER
let liv, point, speed, delay;

const godmad1 = document.querySelector("#spegepolse_container");
const godmad2 = document.querySelector("#leverpostej_container");
const godmad3 = document.querySelector("#aggemad_container");

const dårligmad1 = document.querySelector("#radenspegepolse_container");
const dårligmad2 = document.querySelector("#radenleverpostej_container");
const dårligmad3 = document.querySelector("#radenaggemad_container");

//GØR SÅ ELEMENTERNE STARTER PÅ EN TILFÆLDIG POSITION, +1 FOR AT UNDGÅ 0
function ranTal(n) {
  return Math.floor(Math.random() * n) + 1;
}

function sidenVises() {
  console.log("siden vises");

  //Lyt om der bliver ændret størrelse af browser window
  window.addEventListener("resize", windowResize);
  //kald windowResize første gang siden vises
  windowResize();

  //SKJULER SIDER OG ELEMMENTER DER IKKE SKAL VISES I STARTEN
  document.querySelector("#startskærm").classList.remove("hide");
  document.querySelector("#game").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#regelskærm").classList.add("hide");
  document.querySelector("#provigenknap1").classList.add("hide");
  document.querySelector("#provigenknap2").classList.add("hide");

  //GØR AT MAN KAN KLIKKE PÅ STARKNAPPEN
  document.querySelector("#spilknap").addEventListener("click", startSpil);

  //GØR MAN KAN KLIKKE PÅ REGELSKÆRMEN
  document.querySelector("#regelknap").addEventListener("click", regelSpil);
}

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProcent = 5;
  let myFont = (widthScreen / 100) * myFontInProcent;
  document.querySelector("#point").style.fontSize = myFont + "px";

  let myFontInProcent2 = 4;
  let myFont2 = (widthScreen / 100) * myFontInProcent2;
  document.querySelector("#liv").style.fontSize = myFont2 + "px";
}

function regelSpil() {
  console.log("spillets regler");

  //FJERNER HIDE FRA REGELSKÆRMEN --> GØR AT DEN BLIVER VIST OG SÅ HIDER DEN STARTSKÆRMEN
  document.querySelector("#regelskærm").classList.remove("hide");
  document.querySelector("#startskærm").classList.add("hide");

  //MAN KAN KLIKKE PÅ REGEL SKÆRMEN (FUNKTIONEN UNDER FÅR DEN TIL AT FORSVINDE)
  document.querySelector("#regelskærm").addEventListener("click", regelspilVæk);
}

function regelspilVæk() {
  console.log("");
  //NÅR MAN KLIKKER PÅ SKÆRMEN FORSVINDER REGELSKÆRMEN IGEN OG GÅR TILBAGE TIL STARTSKÆRM
  document.querySelector("#regelskærm").classList.add("hide");
  document.querySelector("#startskærm").classList.remove("hide");
}

function startSpil() {
  console.log("spillet startes");

  document.querySelector("#groove").volume = 0.1;
  document.querySelector("#groove").currentTime = 0;
  document.querySelector("#groove").play();

  document.querySelector("#game").classList.remove("hide");
  document.querySelector("#startskærm").classList.add("hide");

  document.querySelector("#urviser").classList.add("viser_animation");
  document.querySelector("#urviser").addEventListener("animationend", stopSpillet);

  point = 0;
  liv = 3;
  speed = 1;

  document.querySelector("#liv").textContent = liv;
  document.querySelector("#point").textContent = point;

  //GØR SÅ ALLE MADERNE FALDER

  godmad1.classList.add("fald", "speed" + speed, "delay" + ranTal(6), "pos" + ranTal(5));
  godmad2.classList.add("fald", "speed" + speed, "delay" + ranTal(6), "pos" + ranTal(5));
  godmad3.classList.add("fald", "speed" + speed, "delay" + ranTal(6), "pos" + ranTal(5));

  dårligmad1.classList.add("fald", "speed" + speed, "delay" + ranTal(6), "pos" + ranTal(5));
  dårligmad2.classList.add("fald", "speed" + speed, "delay" + ranTal(6), "pos" + ranTal(5));
  dårligmad3.classList.add("fald", "speed" + speed, "delay" + ranTal(6), "pos" + ranTal(5));

  //GØR SÅ MAN KAN KLIKKE PÅ MADDERNE
  godmad1.addEventListener("mousedown", GodClick);
  godmad2.addEventListener("mousedown", GodClick);
  godmad3.addEventListener("mousedown", GodClick);

  dårligmad1.addEventListener("mousedown", RadenClick);
  dårligmad2.addEventListener("mousedown", RadenClick);
  dårligmad3.addEventListener("mousedown", RadenClick);

  //GENSTART MADDERNE
  godmad1.addEventListener("animationiteration", genstartGod);
  godmad2.addEventListener("animationiteration", genstartGod);
  godmad3.addEventListener("animationiteration", genstartGod);

  dårligmad1.addEventListener("animationiteration", genstartRaden);
  dårligmad2.addEventListener("animationiteration", genstartRaden);
  dårligmad3.addEventListener("animationiteration", genstartRaden);
}

//KLIK PÅ DEN GODE MAD
function GodClick() {
  console.log("klikket på god mad");
  console.log(this);

  document.querySelector("#klik").volume = 0.1;
  document.querySelector("#klik").currentTime = 0;
  document.querySelector("#klik").play();

  this.classList.add("pause");

  this.firstElementChild.classList.add("drej");
  this.addEventListener("animationend", genstartGod);

  //tæl liv
  liv--;
  document.querySelector("#liv").textContent = liv;

  if (liv <= 0) {
    stopSpillet();
  }
}

function genstartGod() {
  console.log("genstart god mad");
  console.log(this);

  this.classList = "";
  this.firstElementChild.classList = "";

  this.offsetLeft;
  this.classList.remove("pause");

  this.classList.add("fald", "speed" + speed, "pos" + ranTal(4));
}

//KLIK PÅ DÅRLIG MAD (BRUG THIS)
function RadenClick() {
  console.log("klikket på dårlig mad");

  document.querySelector("#klik").volume = 0.1;
  document.querySelector("#klik").currentTime = 0;
  document.querySelector("#klik").play();

  this.classList.add("pause");
  this.firstElementChild.classList.add("drej");
  this.addEventListener("animationend", genstartRaden);

  point++;
  document.querySelector("#point").textContent = point;

  if (point >= 5) {
    speed = 2;
  } else if (point >= 2) {
    speed = 3;
  }
}

function genstartRaden() {
  console.log("genstart råden mad");
  console.log(this);

  this.classList = "";
  this.firstElementChild.classList = "";

  this.offsetLeft;
  this.classList.remove("pause");

  this.classList.add("fald", "speed" + speed, "pos" + ranTal(4));
}

//definer funktionerne hver for sig ligesom i start spillet
function stopSpillet() {
  console.log("stopSpillet");

  document.querySelector("#groove").pause();

  //stop timer
  document.querySelector("#urviser").classList.remove("viser_animation");
  document.querySelector("#urviser").removeEventListener("animationend", stopSpillet);

  //fjern alt på alle elementers container og sprite
  godmad1.classList = "";
  godmad1.firstElementChild.classList = "";

  godmad2.classList = "";
  godmad2.firstElementChild.classList = "";

  godmad3.classList = "";
  godmad3.firstElementChild.classList = "";

  dårligmad1.classList = "";
  dårligmad1.firstElementChild.classList = "";

  dårligmad2.classList = "";
  dårligmad2.firstElementChild.classList = "";

  dårligmad3.classList = "";
  dårligmad3.firstElementChild.classList = "";

  //fjern alle event listener på alle containere
  godmad1.removeEventListener("mousedown", GodClick);
  godmad1.removeEventListener("animationiteration", genstartGod);

  godmad2.removeEventListener("mousedown", GodClick);
  godmad2.removeEventListener("animationiteration", genstartGod);

  godmad3.removeEventListener("mousedown", GodClick);
  godmad3.removeEventListener("animationiteration", genstartGod);

  dårligmad1.removeEventListener("mousedown", RadenClick);
  dårligmad1.removeEventListener("animationiteration", genstartRaden);

  dårligmad2.removeEventListener("mousedown", RadenClick);
  dårligmad2.removeEventListener("animationiteration", genstartRaden);

  dårligmad3.removeEventListener("mousedown", RadenClick);
  dårligmad3.removeEventListener("animationiteration", genstartRaden);

  if (liv <= 0) {
    game_over();
  } else if (point >= 10) {
    level_complete();
  } else {
    game_over();
  }
}

function game_over() {
  console.log("du har tabt");

  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#provigenknap1").classList.remove("hide");
  document.querySelector("#provigenknap1").addEventListener("click", sidenVises);
}

function level_complete() {
  console.log("du har vundet");

  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#provigenknap2").classList.remove("hide");
  document.querySelector("#provigenknap2").addEventListener("click", sidenVises);
}
