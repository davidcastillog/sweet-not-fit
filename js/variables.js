// Variables

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasW = canvas.width;
const canvasH = canvas.height;

// Configuration
let gameSpeed = 5; // Background movement
let frames = 0;
let requestID; // *

// Game
let enemies = []; // *
let sweets = []; // dulces *
let knifes = []; // *
let destroyed = []; // Enemies Destroyed *
let count = 0; // Sweets eaten *
let gravity = 3; // *
let friction = 0.9; // *

// Character
let health = 100; // *
// Character Initial position
let characterX = 100;
let characterY = 267;

let left = false;
let right = false;

const characterImage = new Image();
characterImage.src = '../img/sprite-character.png';

// Size of each sprite box
const spriteWidth = 175;
const spriteHeight = 250;

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
  
  console.log(fire.loc[0].y) // 750
  
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
