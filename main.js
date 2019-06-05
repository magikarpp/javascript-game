let active = 0;

let board_size = 100;

let p_location = [];
let p_vision = 6;

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);

generateBoard();
start();

function start(){
  active = 1;
  playerLocation(board_size/2, board_size/2);

}

function generateBoard(){
  for(let i = 0; i <= board_size; i++){
    let row = "r" + i;

    let p = document.createElement("p");
    p.id = row;
    p.style.display = "none";

    document.getElementById("board").appendChild(p);

    for(let j = 0; j <= board_size; j++){
      let cell = "r" + i + "c" + j;

      let c = document.createElement("span");
      c.id = cell;
      c.innerHTML = "&nbsp";

      document.getElementById(row).appendChild(c);

      let r = Math.floor(Math.random() * 100);
      if(r >= 0 && r < 97)document.getElementById(cell).style.backgroundColor = "white";
      else if(r >= 97 && r < 98) document.getElementById(cell).style.backgroundColor = "orange";
      else if(r >= 98 && r < 99) document.getElementById(cell).style.backgroundColor = "fuchsia";
      else if(r >= 99 && r < 100) document.getElementById(cell).style.backgroundColor = "teal";

      c.style.display = "none";
    }
  }
}

function keyPress(event){
  if(active == 1){
    if(event.which == 40){
      movePlayer("down");
    }
    else if(event.which == 39){
      movePlayer("right");
    }
    else if(event.which == 38){
      movePlayer("up");
    }
    else if(event.which == 37){
      movePlayer("left");
    }
  }
}

function keyRelease(event){
  if(active == 1){

  }
}

function playerLocation(x, y){
  document.getElementById(getId(x, y)).style.backgroundColor = "green";
  p_location[0] = x;
  p_location[1] = y;
  vision(x, y);
}

function vision(x, y){
  //remove vision
  for(let i = (x - p_vision); i <= (y + p_vision); i++){
    if(!(i > board_size) && !(i < 0)){
      document.getElementById("r" + i).style.display = "none";
      for(let j = (x - p_vision); j <= (y + p_vision); j++){
        if(!(j > board_size) && !(j < 0)){
          document.getElementById(getId(i, j)).style.display = "none";
        }
      }
    }
  }

  //gain vision
  for(let i = (p_location[0] - p_vision); i <= (p_location[0] + p_vision); i++){
    if(!(i > board_size) && !(i < 0)){
      document.getElementById("r" + i).style.display = "block";
      for(let j = (p_location[1] - p_vision); j <= (p_location[1] + p_vision); j++){

        if(!(j > board_size) && !(j < 0)){
          document.getElementById(getId(i, j)).style.display = "inline";
        }
      }
    }
  }
}

function movePlayer(direction){
  let tempx = p_location[0];
  let tempy = p_location[1];

  document.getElementById(getId(p_location[0], p_location[1])).style.backgroundColor = "white";

  if(direction == "up") p_location[0]--;
  else if(direction == "down") p_location[0]++;
  else if(direction == "left") p_location[1]--;
  else if(direction == "right") p_location[1]++;

  if(!p_location[0] > board_size || !p_location[0] < 0){
    p_location[0] = tempx;
  }
  if(!p_location[1] > board_size || !p_location[1] < 0){
    p_location[1] = tempy;
  }

  document.getElementById(getId(p_location[0], p_location[1])).style.backgroundColor = "green";
  vision(tempx, tempy);

}

function getId(x, y){
  return "r" + x + "c" + y;
}
