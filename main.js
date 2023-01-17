/* eslint-disable no-alert */
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

for (let r = 0; r < brickRowCount; r += 1) {
  bricks[r] = [];
  if (r % 2 === 0) {
    brickWidth = startBrickWidth / 2;
    brkColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
  } else {
    brickWidth = startBrickWidth;
    brkColumnCount = startBrickColumnCount;
  }
  for (let c = 0; c < brkColumnCount; c += 1) {
    bricks[r][c] = {
      x: 0,
      y: 0,
      status: 1,
    };
    totalBricks += 1;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function randomColor() {
  const hexValues = '1234567890ABCDEF';
  let hexString = '#';
  for (let i = 0; i < 6; i += 1) {
    hexString += hexValues[Math.floor(Math.random() * 16)];
  }
  return hexString;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < (canvas.width - paddleWidth / 2)) {
    paddleX = relativeX - paddleWidth / 2;
  } else if (relativeX < (paddleWidth / 2 + canvas.offsetLeft)) {
    paddleX = 0;
  } else if (relativeX > canvas.width) {
    paddleX = canvas.width - paddleWidth;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function drawBricks() {
  const brickColors = ['#FF0000', '#FF9900', '#FFFF00', '#66FF33', '#00FFFF', '#0000FF', '#6600FF', '#6600CC', '#CC0099', '#FF0066'];
  for (let r = 0; r < brickRowCount; r += 1) {
    if (r % 2 === 0) {
      brickWidth = startBrickWidth / 2;
      brkColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
    } else {
      brickWidth = startBrickWidth;
      brkColumnCount = startBrickColumnCount;
    }
    for (let c = 0; c < brkColumnCount; c += 1) {
      if (bricks[r][c].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColors[c];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let r = 0; r < brickRowCount; r += 1) {
    if (r % 2 === 0) {
      brickWidth = startBrickWidth / 2;
      brkColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
    } else {
      brickWidth = startBrickWidth;
      brkColumnCount = startBrickColumnCount;
    }
    for (let c = 0; c < brkColumnCount; c += 1) {
      const b = bricks[r][c];
      if (b.status === 1) {
        if (
          x > b.x - ballRadius
          && x < b.x + brickWidth + ballRadius
          && y > b.y - ballRadius
          && y < b.y + brickHeight + ballRadius
        ) {
          dy = -(dy + 1);
          if (dx < 0) {
            dx -= 0.1;
          } else {
            dx += 0.1;
          }
          b.status = 0;
          ballColor = randomColor();
          score += 1;
          if (score === totalBricks) {
            alert(`YOU WIN, CONGRATULATIONS! YOUR SCORE WAS ${score} POINTS!`);
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

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
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    ballColor = randomColor();
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    ballColor = randomColor();
  } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -(dy + 1);
      ballColor = randomColor();
    } else {
      lives -= 1;
      if (!lives) {
        alert(`GAME OVER... YOUR SCORE WAS ${score} POINTS`);
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
