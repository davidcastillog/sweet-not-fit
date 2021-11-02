// Variables

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvasW = canvas.width;
const canvasH = canvas.height;

// Configuration
let gameSpeed = 5; // Background movement
let frames = 0;
let requestID;

// Game
let enemies = [];
let sweets = []; // dulces 
let knifes = [];
let destroyed = 0; // Enemies Destroyed
let record = 0;
let count = 0;
let gravity = 0.9;
let userPull = 0.2;

// Character
let health = 100;
let playerState = [] // Sprites 
let left = false;
let right = false;
let fire;

// Background
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
