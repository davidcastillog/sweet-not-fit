// Functions 
/*
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    
  };
}
*/
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

// Background moves with character
function moveBackground(x){
  if(x){
    bgImages.forEach(e =>{
      e.x -= e.speed;
  })
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
// Run (A & D)
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
    fireAudio.play();
    generateKnife();
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
      
    let enemyY = Math.floor(Math.random() * (450 - 350)) + 350
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
  if(frames % 250 === 0 || frames % 800 === 0){
      
    let candyY = Math.floor(Math.random() * (250 - 150)) + 150
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

// Collision with Character
function collision(item1){
  return(characterX < item1.x + item1.width &&
    characterX + 90 > item1.x &&
    characterY < item1.y + item1.height &&
    180 + characterY > item1.y)
}

function enemyCollision(){
  enemies.forEach((enemy,index_enemy)=>{

    if(collision(enemy)){
      enemies.splice(index_enemy,1)
      health -= 25
      enemyCollisionAudio.volume = 0.25
      enemyCollisionAudio.play()
    }
    
  })
}

function sweetEaten(){
  sweets.forEach((sweet,index_sweet) =>{

    if(collision(sweet)){
      sweets.splice(index_sweet,1)
      score++
      yummyAudio.play()
    }
  })
}

function generateKnife(){
  const knife = new Knife((characterX + 110), (characterY + 125));
  knives.push(knife)
}

function throwKnife(){
  knives.forEach((knife,index_knife) =>{
    knife.draw();

  enemies.forEach((enemy,index_enemy)=>{
    if(knife.collision(enemy)){
      knives.splice(index_knife,1)
      enemies.splice(index_enemy,1)
    }
  })
  })
}

function drawHUD(){
  if(health <= 100){
    ctx.drawImage(health100,15,15,180,55);
  }

  if(health <= 75){
    ctx.drawImage(health75,15,15,180,55);
  }

  if(health <= 50){
    ctx.drawImage(health50,15,15,180,55);
  }

  if(health <= 25){
    ctx.drawImage(health25,15,15,180,55);
  }

  if(health <= 0){
    ctx.drawImage(health0,15,15,180,55);
  }

  ctx.font= '12px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText(`Health: ${health}%`, 105, 63);

  // Score
  ctx.font= '24px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 1052,42);
  ctx.fillStyle = 'yellow';
  ctx.fillText(`Score: ${score}`, 1050,40);
}

function startGame(){
  // mainAudio.play();
  requestId = requestAnimationFrame(update);
}

function gameOver(){
  // mainAudio.pause()
  gameOverAudio.play()
  requestId = undefined;
  ctx.drawImage(imgGameOver,200,30,800,500);
  ctx.font= '32px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Final score: ${score}`,512,507);
  ctx.font= '32px sans-serif';
  ctx.fillStyle = 'yellow';
  ctx.fillText(`Final score: ${score}`,511,505);
}

function killed(){
  if(health <= 0){
    gameOver()
  }
}

function update(){
    frames++;
    ctx.clearRect(0,0,canvasW,canvasH);
    bgImages.forEach(e =>{
        e.draw();
    });
    move();
    drawHUD();
    limitMovement();
    enemyCollision();
    characterAnimate();
    generateEnemies();
    drawEnemies();
    sweetEaten();
    generateSweets();
    drawSweets();
    startGame();
    killed();
    throwKnife();
}

update(); // to use on window.onload