// Variables

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasW = canvas.width;
const canvasH = canvas.height;

// Game Configuration
let gameSpeed = 5; // Background speed
let frames = 0;
let requestID;
let gravity = 0.9; // * ¿?

// Sweets
let sweets = [];
let sweetTye = ['cake', 'chocolate', 'donutSprinkles', 'chocolateDonut', 'ironHack', 'lollipop']

// Enemies 
let enemies = [];
let enemyType = ['apple', 'cherry', 'lettuce', 'onion', 'orange', 'eggplant', 'tomato']
let enemydamage = 25;

// Character
let health = 100;
let score = 0;
let highscore = localStorage.getItem('highscore',0)
let characterSpeed = 4;
let knifedamage = 1;
let knives = [];
let characterX = 100;
let characterY = 0;

// Size of each sprite box
const spriteWidth = 175;
const spriteHeight = 250;

let left = false;
let right = false;

const characterImage = new Image();
characterImage.src = '../img/sprite-character.png';

// Character State
let playerState = 'stand'

// How many frames to wait for the next movement
const staggerFrames = 8;

// Coordinates for each sprite state on PNG
const stand = {
    loc: [
      {x:0, y:0}
    ]
};
  
const run = {
    loc: [
      {x:0, y:250},
      {x:175, y:250},
      {x:350, y:250},
      {x:525, y:250}
    ]
}
  
const jump = {
    loc: [
      {x:0, y:500},
      {x:175, y:500}
    ]
}
  
const fire = {
    loc: [
      {x:0, y:750}
    ]
}

const standFit = {
  loc: [
    {x:0, y:1000}
  ]
};

const runFit = {
  loc: [
    {x:0, y:1250},
    {x:175, y:1250},
    {x:350, y:1250},
    {x:525, y:1250}
  ]
}

const jumpFit = {
  loc: [
    {x:0, y:1500},
    {x:175, y:1500}
  ]
}

const fireFit = {
  loc: [
    {x:0, y:1750}
  ]
}

const runBack = {
  loc: [
    {x:0, y:2000},
    {x:175, y:2000},
    {x:350, y:2000},
    {x:525, y:2000}
  ]
}

const runFitBack = {
  loc: [
    {x:0, y:2250},
    {x:175, y:2250},
    {x:350, y:2250},
    {x:525, y:2250}
  ]
}
  
// console.log(fire.loc[0].y) // 750
  
// Array of all character states animations
const spriteAnimations = [stand,run,jump,fire,standFit,runFit,jumpFit,fireFit,runBack,runFitBack];
  
// Character States with frames (non squared sprites)
const animationStates = [
    {
      name: 'stand',
      frames: 1,
    },
    {
      name: 'run',
      frames: 4
    },
    {
      name: 'jump',
      frames: 2
    },
    {
      name: 'fire',
      frames: 1
    },
    {
      name: 'standFit',
      frames: 1,
    },
    {
      name: 'runFit',
      frames: 4
    },
    {
      name: 'jumpFit',
      frames: 2
    },
    {
      name: 'fireFit',
      frames: 1
    },
    {
      name: 'runBack',
      frames: 4
    },
    {
      name: 'runFitBack',
      frames: 4
    },
];

// Audio
// Main theme
const mainAudio = new Audio()
mainAudio.src = 'audio/maintheme.mp3'
mainAudio.loop = true

// Throw Knife
const fireAudio = new Audio()
fireAudio.src = 'audio/throw.wav'

// Sweet eaten
const yummyAudio = new Audio()
yummyAudio.src = 'audio/yummy.mp3'

// Collision with enemy
const enemyCollisionAudio = new Audio()
enemyCollisionAudio.src = 'audio/ohoh.mp3'

// Game over
const gameOverAudio = new Audio()
gameOverAudio.src = 'audio/gameover.mp3'

// Background Images (Layers)
const bg1 = new Image();
bg1.src = 'img/layer1.png';
const bg2 = new Image();
bg2.src = 'img/layer2.png';
const bg3 = new Image();
bg3.src = 'img/layer3.png';
const bg4 = new Image();
bg4.src = 'img/layer4.png';
const bg5 = new Image();
bg5.src = 'img/layer5.png';
const bg6 = new Image();
bg6.src = 'img/layer6.png';

// Health HUD
const health100 = new Image();
health100.src = '../img/health/health100.png';
const health75 = new Image();
health75.src = '../img/health/health75.png';
const health50 = new Image();
health50.src = '../img/health/health50.png';
const health25 = new Image();
health25.src = '../img/health/health25.png';
const health0 = new Image();
health0.src = '../img/health/health0.png';

// GameOver Image
const imgGameOver = new Image();
imgGameOver.src = '../img/gameover.png'