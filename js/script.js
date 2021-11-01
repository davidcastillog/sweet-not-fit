
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
    }

    draw(){
        if (this.x <= -canvasW){
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
        
        ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
        ctx.drawImage(this.image,this.x + this.width,this.y, this.width, this.height);
    }
}

const layer1 = new Background(bg1, 1);
const layer2 = new Background(bg2, 0.6);
const layer3 = new Background(bg3, 0.4);
const layer4 = new Background(bg4, 0.3);
const layer5 = new Background(bg5, 0.1);
const layer6 = new Background(bg6, 0);
const bgImages = [layer6,layer5,layer4,layer3,layer2,layer1]




function update(){
    ctx.clearRect(0,0,canvasW,canvasH)
    bgImages.forEach(e =>{
        e.draw();
    })
    requestAnimationFrame(update)
}
update();