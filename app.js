let grid = document.querySelector(".grid");
let row = 24;
let col = 24;
let speed = 400;
let eggSpeed = 4000;
let dir = "right"; //Starting direction of Movement
let snake = [[12,0],[12,1],[12,2],[12,3]];
let wallCount =0;
let eggCount =0;
let score =0;
let started = true;

let start = document.querySelector(".start");
start.addEventListener("click",()=>{
   started = true;
   speed = 400;
   eggSpeed = 4000;
   dir = "right"; //Starting direction of Movement
   snake = [[12,0],[12,1],[12,2],[12,3]];
   wallCount =0;
   eggCount =0;
   score =0;
   for(let i=0;i<row;i++){
      for(let j =0;j<col;j++){
         let block = document.querySelector(`.r${i}c${j}`);
         if(block.wall){
            block.wall = false;
            block.classList.remove("red");
         }
         if(block.egg){
            block.egg = false;
            block.classList.remove("egg");
         }
         for(let k =0;k<snake.length;k++){
            if(snake[k][0]==i && snake[k][1]==j){
               block.wall = true;
               wallCount++;
               block.classList.add("red");
            }
         }
      }
   }
   scUpdate();
   move();
   eggGenerator();
});

function scUpdate(){
   let sc = document.querySelector("#score");
   sc.innerText = `${score}`;
}

//Creating the Grid

for(let i=0;i<row;i++){
   for(let j =0;j<col;j++){
      let block = document.createElement("div");
      block.classList.add("block");
      block.classList.add(`r${i}c${j}`);
      block.r = i;
      block.c = j;
      block.wall = false;
      block.egg = false;
      for(let k =0;k<snake.length;k++){
         if(snake[k][0]==i && snake[k][1]==j){
            block.wall = true;
            wallCount++;
            block.classList.add("red");
         }
      }

      grid.append(block);

   }
}

//To apply the Movement of Snake with Direction and Speed
function move(){
   setTimeout(()=>{
      let rem = snake[0];
      let add;
      if(dir=="right"){
         add = [snake[snake.length-1][0],snake[snake.length-1][1]+1];
      }
      else if(dir == "up"){
         add = [snake[snake.length-1][0]-1,snake[snake.length-1][1]];
         //console.log(add);
      }
      else if(dir == "down"){
         add = [snake[snake.length-1][0]+1,snake[snake.length-1][1]];
         //console.log(add);
      }
      else if(dir == "left"){
         add = [snake[snake.length-1][0],snake[snake.length-1][1]-1];
         //console.log(add);
      }
      if(add[0]>=0 && add[1]>=0 && add[0]<row && add[1]<col){
         let a = document.querySelector(`.r${add[0]}c${add[1]}`);
         let r = document.querySelector(`.r${rem[0]}c${rem[1]}`);
         // console.log(a);
         // console.log(r);
         if(a.wall == false){
            a.classList.add("red");
            a.wall =true;
            wallCount++;
            snake.push(add);

            if(!a.egg){
               r.classList.remove("red");
               r.wall = false;
               wallCount--;
               snake.shift();
            }else{
               score++;
               scUpdate();
               a.egg = false;
               eggCount--;
               a.classList.remove("egg");
               if(speed>200){
                  speed -= 20;
               }else if(speed>100){
                  speed -= 5;
               }else if(speed>50){
                  speed -= 1;
               }
               if(speed>200){ 
                  eggSpeed -= 50;
               }else if(speed>100){
                  eggSpeed -= 20;
               }else if(speed>50){
                  eggSpeed -= 10;
               }
               console.log("speed : ",speed);
               console.log("eggSpeed : ",eggSpeed);
            }
            if(started){
               pressedKey = null;
               move(dir);
            }
         }else{
            console.log("Game Over");
            started = false;
            return;
         }
      }else{
         console.log("Game Over");
         started = false;
      }
   },speed);
}

//Adding Event listners to the Keys
let pressedKey = null;
document.addEventListener("keydown",function(event) {

   if(pressedKey !== null){
      console.log("ignore",event.Key);
      return;
   }
   pressedKey = event.key;

   if(event.key === "ArrowUp"){
      //console.log("up pressed");
      if(dir=="down"){
         return;
      }
      dir = "up";
   }
   if(event.key === "ArrowDown"){
      //console.log("Down pressed");
      if(dir=="up"){
         return;
      }
      dir = "down";
   }
   if(event.key === "ArrowLeft"){
      //console.log("Left pressed");
      if(dir=="right"){
         return;
      }
      dir = "left";
   }
   if(event.key === "ArrowRight"){
      //console.log("right pressed");
      if(dir=="left"){
         return;
      }
      dir = "right";
   }
});

//Adding Event Listners to the buttons
let up = document.querySelector(".Up");
let down = document.querySelector(".Down");
let right = document.querySelector(".Right");
let left = document.querySelector(".Left");
up.addEventListener("click" , function (event){
   if(pressedKey !== null){
      console.log("ignore",event);
      return;
   }
   pressedKey = event;
   if(dir=="down"){
      return;
   }
   dir = "up";
});

down.addEventListener("click" , function (event){
   if(pressedKey !== null){
      console.log("ignore",event);
      return;
   }
   pressedKey = event;
   if(dir=="up"){
      return;
   }
   dir = "down";
});
left.addEventListener("click" , function (event){
   if(pressedKey !== null){
      console.log("ignore",event);
      return;
   }
   pressedKey = event;
   if(dir=="right"){
      return;
   }
   dir = "left";
});
right.addEventListener("click" , function (event){
   if(pressedKey !== null){
      console.log("ignore",event);
      return;
   }
   pressedKey = event;
   if(dir=="left"){
      return;
   }
   dir = "right"; 
});


//Random egg Generator
function eggGenerator(){
   setTimeout(()=>{
      let e;
      while(true){
         if( (wallCount+eggCount)==(row*col)){
            console.log("Max Score! You win");
            return;
         }
         let a = Math.floor(Math.random() * row);
         let b = Math.floor(Math.random() * col);
         e = document.querySelector(`.r${a}c${b}`);
         if(e.wall || e.egg){
            continue;
         }else{
            break;
         }
      }
      e.egg = true;
      eggCount++;
      //e.wall = true;
      e.classList.add("egg");
      if(started){
         eggGenerator();
      }
   },eggSpeed);
}




