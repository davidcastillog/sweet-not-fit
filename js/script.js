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
addEventListener("keydown",(e)=>{
  if(e.key === 'a') {
    left = true;
    playerState = 'run';
  }
  if(e.key ==='d') {
    right = true;
    playerState = 'run'
  }
})
  
// When the key is released is stopped
addEventListener("keyup",(e)=>{
  if(e.key === 'a') {
    left = false;
    playerState = 'stand'
  } 
  if(e.key ==='d'){
    right = false;
    playerState = 'stand'
  }
})

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
    playerState = 'run'
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

function generateEnemies(){
  if(frames % 250 === 0 || frames % 550 === 0){
      
    let enemyY = Math.floor(Math.random() * (450 - 300)) + 300
    let randomEnemy = Math.floor(Math.random() * enemyType.length);

    const enemy = new Enemy(enemyType[randomEnemy],enemyY)
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

function generateSweets(){
  if(frames % 150 === 0 || frames % 550 === 0){
      
    let candyY = Math.floor(Math.random() * (450 - 250)) + 250
    let randomSweet = Math.floor(Math.random() * sweetTye.length);

    const sweet = new Sweet(sweetTye[randomSweet],candyY)
    sweets.push(sweet)
  }
}

function drawSweets(){
  sweets.forEach((sweet,index_sweet)=>{
    sweet.draw()

    if(sweet.x + sweet.width < 0){
      sweets.splice(index_sweet,1)
    } 
  })
}

function collision(item1,item2){
  return(item1.x < item2.x + item2.width &&
    item1.x + item1.width > item2.x &&
    item1.y < item2.y + item2.height &&
    item1.height + item1.y > item2.y)
}

function startGame(){
  mainAudio.play()
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
    move();
    limitMovement();
    characterAnimate();
    generateEnemies();
    drawEnemies();
    generateSweets()
    drawSweets()
    startGame()
}

update(); // to use on window.onload