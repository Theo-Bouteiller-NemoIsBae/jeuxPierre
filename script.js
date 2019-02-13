let tabMapLoad = [];
let posX = 0;
let posY = 0;
let espaceInsecable = " ";


class Tableau {
  constructor(destination, tab) {
    this.tab = tab;
    let maTable = $('<table></table>').appendTo(destination);
    let playerFind = false;

    posX = 0;
    posY = 0;

    for (let ligne of tab) {

      let maLigne = $('<tr></tr>').appendTo(maTable);
      let tabLigne = [];

      for (let col of ligne) {

        if (col == " "){
          col = espaceInsecable;
        }

        let maCol = $('<td></td>').append(col).appendTo(maLigne);
        let cells = {"ct":col, "obj": maCol};
        if (col == "@"){
          playerFind = true;
        }
        tabLigne.push(cells);
        if (playerFind == false) {
          posX += 1;
        }
      }
      tabMapLoad.push(tabLigne);
      if (playerFind == false) {
        posY += 1;
        posX = 0;
      }
    }
    afficherPos();
  }
}

$( document ).ready(function () {

  let zoneJeux = $("<div></div>").appendTo('body');



  for (let key in level["levels"]) {
    $('<button></button>').append(key).appendTo('body').on("click", function(){
      zoneJeux.empty();
      tabMapLoad = [];
      let table = new Tableau(zoneJeux, level["levels"][key]["cells"]);
      console.log(tabMapLoad);
    });;
  }

  //deplacement

  $('body').keydown(function(event) {
    inputKey = event['key'];

    switch (inputKey) {
      case "z":
        goUp();
        break;
      case "q":
        goLeft();
        break;
      case "s":
        goDown();
        break;
      case "d":
        goRight();
        break;
      default:
    }
    afficherPos();

  });
});

//logique

function goLeft() {
  switch (tabMapLoad[posY][posX - 1]["ct"]) {
    case espaceInsecable:
      changeCell(posX, posY, espaceInsecable);
      posX -= 1;
      changeCell(posX, posY, "@");
      break;

    case "$":
      let posPierreX = posX - 1;
      let posPierreY = posY;
      //verifier si la pierre peux bouger donc une case plus loin
      if (isCanMoveRock(posPierreX, posPierreY, "left")){
        //deplacer la pierre remplacer sa case par le joueur
        changeCell(posPierreX, posPierreY, "@")
        changeCell(posPierreX - 1, posPierreY, "$")
        //remettre a jour la case initiale du joueur
        changeCell(posX, posY, espaceInsecable);
        posX -= 1;
      }
      break;

    case ".":
      //changeCell(posX, posY, espaceInsecable);

      //posX -= 1;
      //changeCell(posX, posY, "@");
      break;
    default:

  }
}

function goRight() {
  switch (tabMapLoad[posY][posX + 1]["ct"]) {
    case espaceInsecable:
      changeCell(posX, posY, espaceInsecable);
      posX += 1;
      changeCell(posX, posY, "@");
      break;

    case "$":
      let posPierreX = posX + 1;
      let posPierreY = posY;
      //verifier si la pierre peux bouger donc une case plus loin
      if (isCanMoveRock(posPierreX, posPierreY, "right")){
        //deplacer la pierre remplacer sa case par le joueur
        changeCell(posPierreX, posPierreY, "@")
        changeCell(posPierreX + 1, posPierreY, "$")
        //remettre a jour la case initiale du joueur
        changeCell(posX, posY, espaceInsecable);
        posX += 1;
      }
      break;

    case ".":
      //changeCell(posX, posY, espaceInsecable);

      //posX -= 1;
      //changeCell(posX, posY, "@");
      break;
    default:

  }
}

function goUp() {
  switch (tabMapLoad[posY - 1][posX]["ct"]) {
    case espaceInsecable:
      changeCell(posX, posY, espaceInsecable);
      posY -= 1;
      changeCell(posX, posY, "@");
      break;

    case "$":
      let posPierreX = posX;
      let posPierreY = posY - 1;
      //verifier si la pierre peux bouger donc une case plus loin
      if (isCanMoveRock(posPierreX, posPierreY, "up")){
        //deplacer la pierre remplacer sa case par le joueur
        changeCell(posPierreX, posPierreY, "@")
        changeCell(posPierreX, posPierreY - 1, "$")
        //remettre a jour la case initiale du joueur
        changeCell(posX, posY, espaceInsecable);
        posY -= 1;
      }
      break;

    case ".":
      //changeCell(posX, posY, espaceInsecable);

      //posX -= 1;
      //changeCell(posX, posY, "@");
      break;
    default:

  }
}

function goDown() {
  switch (tabMapLoad[posY + 1][posX]["ct"]) {
    case espaceInsecable:
      changeCell(posX, posY, espaceInsecable);
      posY += 1;
      changeCell(posX, posY, "@");
      break;

    case "$":
      let posPierreX = posX;
      let posPierreY = posY + 1;
      //verifier si la pierre peux bouger donc une case plus loin
      if (isCanMoveRock(posPierreX, posPierreY, "down")){
        //deplacer la pierre remplacer sa case par le joueur
        changeCell(posPierreX, posPierreY, "@")
        changeCell(posPierreX, posPierreY + 1, "$")
        //remettre a jour la case initiale du joueur
        changeCell(posX, posY, espaceInsecable);
        posY += 1;
      }
      break;

    case ".":
      //changeCell(posX, posY, espaceInsecable);

      //posX -= 1;
      //changeCell(posX, posY, "@");
      break;
    default:

  }
}

//utilitaire pour logique

function changeCell(posX, posY, char) {
  tabMapLoad[posY][posX]["ct"] = char;
  tabMapLoad[posY][posX]["obj"].empty().append(char);
}

function isCanMoveRock(x, y, direction) {
  switch (direction) {
    case "up":
      return isCleanCell(x, y - 1);
      break;

    case "down":
      return isCleanCell(x, y + 1);
      break;

    case "left":
      return isCleanCell(x - 1, y);
      break;

    case "right":
      return isCleanCell(x + 1, y);
      break;
    default:
      return false;
  }
}

function isCleanCell(x, y) {
  switch (tabMapLoad[y][x]["ct"]) {
    case "#":
      return false;
      break;

    case "$":
      return false;
      break;

    default:
      return true;
  }
}

// debug

function afficherPos() {
  console.log("posX : " + posX + " posY : " + posY);
}
