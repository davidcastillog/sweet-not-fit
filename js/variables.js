// Variables

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasW = canvas.width;
const canvasH = canvas.height;

// Configuration
let gameSpeed = 5; // Background speed
let frames = 0;
let requestID; // *
let gravity = 0.9; // *

// Game
let enemies = [];
let enemyType = ['apple', 'cherry', 'lettuce', 'onion', 'orange', 'eggplant', 'tomato']
let sweets = [];
let sweetTye = ['cake', 'chocolate', 'donutSprinkles', 'chocolateDonut', 'ironHack', 'lollipop']
let enemiesDestroyed = []; // Enemies Destroyed *
let score = 0; // Sweets eaten *

// Audio
// Main theme
const mainAudio = new Audio()
mainAudio.src = 'audio/maintheme.mp3'
mainAudio.loop = true

// Throw Knife
const fireAudio = new Audio()
fireAudio.src = 'audio/throw.wav'

// Collision with enemy
const enemyCollisionAudio = new Audio()
enemyCollisionAudio.src = 'audio/noo.wav'

// Game over
const gameOverAudio = new Audio()
gameOverAudio.src = 'audio/gameover.wav'

// Sweet eaten
const yummyAudio = new Audio()
yummyAudio.src = 'audio/yummy.mp3'

// Character
let health = 100; // *
// Character Initial position
let characterX = 100;
let characterY = 267;
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

// States coordinates on sprite
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
  
  // console.log(fire.loc[0].y) // 750
  
  // Array of all character states animations
  const spriteAnimations = [stand,run,jump,fire];
  
  // Character States with frames (non squared sprite images)
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
    }
  ];

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
