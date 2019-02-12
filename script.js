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

function goLeft() {
  if(tabMapLoad[posY][posX - 1]["ct"] == " "){
    tabMapLoad[posY][posX]["ct"] = " ";
    tabMapLoad[posY][posX]["obj"].empty().append(" ");
    posX -= 1;
    tabMapLoad[posY][posX]["ct"] = "@";
    tabMapLoad[posY][posX]["obj"].empty().append("@");
  }
}

function goRight() {
  if(tabMapLoad[posY][posX + 1]["ct"] == " "){
    tabMapLoad[posY][posX]["ct"] = " ";
    tabMapLoad[posY][posX]["obj"].empty().append(" ");
    posX += 1;
    tabMapLoad[posY][posX]["ct"] = "@";
    tabMapLoad[posY][posX]["obj"].empty().append("@");
  }
}

function goUp() {
  if(tabMapLoad[posY - 1][posX]["ct"] == " "){
    tabMapLoad[posY][posX]["ct"] = " ";
    tabMapLoad[posY][posX]["obj"].empty().append(" ");
    posY -= 1;
    tabMapLoad[posY][posX]["ct"] = "@";
    tabMapLoad[posY][posX]["obj"].empty().append("@");
  }
}

function goDown() {
  if(tabMapLoad[posY + 1][posX]["ct"] == " "){
    tabMapLoad[posY][posX]["ct"] = " ";
    tabMapLoad[posY][posX]["obj"].empty().append(" ");
    posY += 1;
    tabMapLoad[posY][posX]["ct"] = "@";
    tabMapLoad[posY][posX]["obj"].empty().append("@");
  }
}

function afficherPos() {
  console.log("posX : " + posX + " posY : " + posY);
}
