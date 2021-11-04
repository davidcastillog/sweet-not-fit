// Classes

// Parallax Background
class Background {
    constructor(image,speedChange){
        this.x = 0;
        this.y = 0;
        this.width = canvasW;
        this.height = canvasH;
        this.image = image;
        this.speedChange = speedChange;
        this.speed = gameSpeed * this.speedChange;
        this.imgGameOver = new Image();
        this.imgGameOver.src = 'img/gameover.png'
    }

    draw(item){
        if (this.x <= -canvasW){
            this.x = 0;
        }

        ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
        ctx.drawImage(this.image,this.x + this.width,this.y, this.width, this.height);
    }

    gameOver(){
        ctx.drawImage(this.imgGameOver,400,300,1000,665)
    }
}

// Generate Multiple Backgrounds with Speed
const layer1 = new Background(bg1, 1);
const layer2 = new Background(bg2, 0.6);
const layer3 = new Background(bg3, 0.4);
const layer4 = new Background(bg4, 0.3);
const layer5 = new Background(bg5, 0.1);
const layer6 = new Background(bg6, 0);
const bgImages = [layer6,layer5,layer4,layer3,layer2,layer1]

class Character {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = new Image ();
        this.image.src = '../img/character.png'
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collision(item){
        this.x < item.x + item.width &&
        this.x + this.width > item.x &&
        this.y < item.y + item.height &&
        this.y + this.height > item.y
    }
}

const character = new Character(300,320,82,176);

class Enemy {
    constructor(tipo,y){
        this.tipo = tipo;
        this.x = canvasW;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = new Image()
        this.image.src = this.chooseEnemy(this.tipo)
    }

    draw(){
        this.x -= 4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    chooseEnemy(tipo){
       console.log(tipo)
        switch (tipo) {
            case 'apple':
                return '../img/enemies/apple.png'
            
            case 'cherry':
                return '../img/enemies/cherry.png'

            case 'lettuce':
                return '../img/enemies/lettuce.png'
            
            case 'onion':
                return '../img/enemies/onion.png'
            
            case 'orange':
                return '../img/enemies/orange.png'
                        
            case 'eggplant':
                return '../img/enemies/eggplant.png'

            default: return '../img/enemies/tomato.png'
        }
    }
}