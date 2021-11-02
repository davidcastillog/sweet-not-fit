// Functions 

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    
  };
}

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
      character.x -= 4
    }
    if (right){
      character.x += 4
      moveBackground(true)
    }
  }
  
  // Limit Character Movement
  function limitMovement(){
      if(character.x < 200){
          character.x = 200
      }
  
      if (character.x > 300){
          character.x = 300
      }

      if (character.y < 200){
        character.y = 320
      }

      if (character.y > 320){
        character.y = 320
      }
  }
  
  // Keyboard Movements

  // When the key is pressed is in movement
  document.onkeydown = function(e){
    if(e.key === 'a') left = true;
    if(e.key ==='d') right = true;
  }
  
  // When the key is released is stopped
  document.onkeyup = function(e){
    if(e.key === 'a') left = false;
    if(e.key ==='d') right = false;
  }

  addEventListener("keydown",(e)=>{
    if(e.keyCode === 32){
      character.y -= 100
    }
  })

  addEventListener("keyup",(e)=>{
    if(e.keyCode === 32){
      character.y += 100
    }
  })
  
  function update(){
      frames++
      ctx.clearRect(0,0,canvasW,canvasH)
      bgImages.forEach(e =>{
          e.draw();
      })
      character.draw();
      move();
      limitMovement();
      requestAnimationFrame(update)
  }
  update();