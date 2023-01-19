import Ball from './ball';
import Brick from './brick';
import Bricks from './bricks';
import Paddle from './paddle';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -4;
const ballRadius = 10;
let ballColor = '#0095DD';
const paddleHeight = 15;
const paddleWidth = 95;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 3;
const startBrickColumnCount = 5;
let brkColumnCount = startBrickColumnCount;
const startBrickWidth = 75;
let brickWidth = startBrickWidth;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
let score = 0;
let lives = 3;
let totalBricks = 0;

const ball = new Ball(200, 200, 10, 'blue');

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'violet');
  gradient.addColorStop(0.25, 'pink');
  gradient.addColorStop(0.5, 'red');
  gradient.addColorStop(0.75, 'pink');
  gradient.addColorStop(1, 'violet');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
}
