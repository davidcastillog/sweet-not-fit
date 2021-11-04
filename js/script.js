// Functions 
/*
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    
  };
}
*/

// Background moves with character
function moveBackground(x){
  if(x){
    bgImages.forEach(e =>{
      e.x -= e.speed;
  })
  }
}

// Character Movement
function move(){
  if (left){
    characterX -= 4
  }
  if (right){
    characterX += 4
    moveBackground(true)
  }
}
  
// Limit Character Movement
function limitMovement(){
  if(characterX < 100){
    characterX = 100
  }
  
  if (characterX > 400){
    characterX = 400
  }

  if (characterY < 150){
    characterY = 267
  }

  if (characterY > 267){
    characterY = 267
  }
}
  
// Keyboard
// RUN (A & D)
document.onkeydown = function(e){
  if(e.key === 'a') left = true;
  if(e.key ==='d') right = true;
  playerState = 'run'
}
  
// When the key is released is stopped
document.onkeyup = function(e){
  if(e.key === 'a') left = false;
  if(e.key ==='d') right = false;
  playerState = 'stand'

}

// Jump (Space Bar)
addEventListener("keydown",(e)=>{
  if(e.keyCode === 32){
    characterY -= 100;
    playerState = 'jump'
  }
})

addEventListener("keyup",(e)=>{
  if(e.keyCode === 32){
    characterY += 100;
    playerState = 'run'
  }
})

// Fire (Enter)
addEventListener("keydown",(e)=>{
  if(e.keyCode === 13){
    playerState = 'fire'
    fireAudio.play()
  }
})

addEventListener("keyup",(e)=>{
  if(e.keyCode === 13){
    playerState = 'stand'
  }
})

// Character Sprite States
animationStates.forEach((states, index) =>{
  let frames = {
    loc: [],
  }
  for (let j = 0; j < states.frames; j++){
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY});
  }
  spriteAnimations[states.name] = frames;
});

function characterAnimate(){
  let position = Math.floor(frames / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(characterImage, frameX, frameY, spriteWidth, spriteHeight,characterX,characterY,
    spriteWidth, spriteHeight);
}

// -

function generateEnemies(){
  if(frames % 100 == 0 || frames % 250 === 0 || frames % 450 === 0){
      
    let enemyY = Math.floor(Math.random() * (320 - 150)) + 150
    let randomType = Math.floor(Math.random() * enemyType.length);

    const enemy = new Enemy(enemyType[randomType],enemyY)
    enemies.push(enemy)
  }
}

function drawEnemies(){
  enemies.forEach((enemy,index_enemy)=>{
      enemy.draw()

    if(enemy.x + enemy.width < 0){
      enemies.splice(index_enemy,1)
    } 
  })
}

// -

function startGame(){
 // mainAudio.play()
  requestId = requestAnimationFrame(update)
}

function gameOver(){
  mainAudio.pause()
  gameOverAudio.play()
  Background.gameOver()
  requestId = undefined
}

function update(){
    frames++
    ctx.clearRect(0,0,canvasW,canvasH)
    bgImages.forEach(e =>{
        e.draw();
    })
    character.draw();
    move();
    limitMovement();
    characterAnimate();
    generateEnemies();
    drawEnemies();
    startGame()
}

update(); // to use on window.onload