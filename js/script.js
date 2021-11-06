// Functions 

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.getElementById('reset-button').onclick = () => {
    gameOver();
    resetGame();
  };

// Keyboard
// Keydown 
addEventListener("keydown",(e)=>{
  // Run (A & D)
  if(e.key === 'a') {
    left = true;
    playerState = 'run';
  }
  if(e.key ==='d') {
    right = true;
    playerState = 'run'
  }

  // Jump (Space Bar)
  if(e.keyCode === 32){
    characterY -= 100;
    playerState = 'jump'
  }

  // Fire (Enter)
  if(e.keyCode === 13){
    playerState = 'fire'
    fireAudio.play();
    generateKnife();
  }
})
  
// Keyup
addEventListener("keyup",(e)=>{
    // Run (A & D)
  if(e.key === 'a') {
    left = false;
    playerState = 'stand'
  } 
  if(e.key ==='d'){
    right = false;
    playerState = 'stand'
  }

  // Jump (Space Bar)
  if(e.keyCode === 32){
    characterY += 100;
    playerState = 'run'
  }

  // Fire (Enter)
  if(e.keyCode === 13){
    playerState = 'run'
  }
})

// Character Movement
function move(){
  if (left){
    characterX -= characterSpeed
  }
  if (right){
    characterX += characterSpeed
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

// Enemies
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

// Sweets
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

    if((sweet.x + sweet.width < 0) && (sweet.y + sweet.height > 800)){
      sweets.splice(index_sweet,1)
    }
  })
}

// Collision with Character
function collision(item1){
  return(characterX < item1.x + item1.width &&
    characterX + 85 > item1.x &&
    characterY < item1.y + item1.height &&
    170 + characterY > item1.y)
}

function enemyCollision(){
  enemies.forEach((enemy,index_enemy)=>{

    if(collision(enemy)){
      enemies.splice(index_enemy,1)
      health -= enemydamage
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

// Character Power
function generateKnife(){
  const knife = new Knife((characterX + 110), (characterY + 125));
  knives.push(knife)
}

function throwKnife(){
  knives.forEach((knife,index_knife) =>{
    knife.draw();

    enemies.forEach((enemy,index_enemy)=>{
    
      if(knife.collision(enemy)){

        if(enemy.life > 1) {
          enemy.life -= knifedamage;
          knives.splice(index_knife,1)

        } else {
        knives.splice(index_knife,1)
        enemies.splice(index_enemy,1)
        }
      }
    })
  })
}

// HUD
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
  ctx.fillStyle = 'white';
  ctx.fillText(`High Score: ${highscore}`, 851,42);
  ctx.fillStyle = 'red';
  ctx.fillText(`High Score: ${highscore}`, 850,40);
}

// Game Functions
function startGame(){
  mainAudio.play();
  requestId = requestAnimationFrame(update);
}

function gameOver(){
  mainAudio.pause()
  gameOverAudio.play()
  ctx.drawImage(imgGameOver,200,30,800,500);
  ctx.font= '32px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText(`Final Score: ${score}`,512,507);
  ctx.font= '32px sans-serif';
  ctx.fillStyle = 'yellow';
  ctx.fillText(`Final Score: ${score}`,511,505);
  requestId = undefined;
}

function killed(){
  if(health <= 0){
    setTimeout(() => {
      gameOver()
    }, 100); 
  }
}

function resetGame(){
  if(requestId){
    return true 
  };
  score = 0;
  health = 100;
  location.reload();
  startGame();
}

function highScore(){
  if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
  }
  else{
    localStorage.setItem("highscore", score);
  }
  console.log(highScore)
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
    throwKnife();
    killed()
    highScore();
    if(requestId){
      requestId = requestAnimationFrame(update)
    }
}
}