/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ballColor = 'blue';
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 55;
const brickRowCount = 3;
const startBrickColumnCount = 5;
const startBrickWidth = 75;
let brickWidth = startBrickWidth;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = (canvas.height - paddleHeight);
let brickColumnCount = startBrickColumnCount;
let score = 0;
let lives = 3;
let totalBricks = 0;
let rightPressed = false;
let leftPressed = false;

class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = -dy;
    this.radius = radius;
    this.color = color;
  }

  moveBall() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.brickWidth, this.brickHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Bricks {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.initializeBricks();
  }

  initializeBricks() {
    const objectColor = 'blue';
    for (let r = 0; r < this.brickRowCount; r += 1) {
      this.bricks[r] = [];
      if (r % 2 === 0) {
        brickWidth = startBrickWidth / 2;
        brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
      } else {
        brickWidth = startBrickWidth;
        brickColumnCount = this.startBrickColumnCount;
      }
      for (let c = 0; c < brickColumnCount; c += 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        this.bricks[r][c] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
        totalBricks += 1;
      }
    }
  }

  render(ctx) {
    const brickColors = ['#FF0000', '#FF9900', '#FFFF00', '#66FF33', '#00FFFF', '#0000FF', '#6600FF', '#6600CC', '#CC0099', '#FF0066'];
    for (let r = 0; r < brickRowCount; r += 1) {
      if (r % 2 === 0) {
        brickWidth = startBrickWidth / 2;
        brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
      } else {
        brickWidth = startBrickWidth;
        brickColumnCount = startBrickColumnCount;
      }
      for (let c = 0; c < brickColumnCount; c += 1) {
        const brick = this.bricks[r][c];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

const bricks = new Bricks(startBrickColumnCount, brickRowCount);

class Paddle {
  constructor(x, y, width, height, color = 'blue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.x, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}

const paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight, 'blue');

class Score {

}

class Lives {

}

class Game {

}

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -4;

let ball = new Ball(0, 0, 2, 2, 10, 'blue');

function randomColor() {
  const hexValues = '1234567890ABCDEF';
  let hexString = '#';
  for (let i = 0; i < 6; i += 1) {
    hexString += hexValues[Math.floor(Math.random() * 16)];
  }
  return hexString;
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
  if (relativeX > 0 && relativeX < (canvas.width - paddle.width / 2)) {
    paddle.x = relativeX - paddle.width / 2;
  } else if (relativeX < (paddle.width / 2 + canvas.offsetLeft)) {
    paddle.x = 0;
  } else if (relativeX > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function movePaddle() {
  if (rightPressed) {
    paddle.moveBy(7, 0);
  } else if (leftPressed) {
    paddle.moveBy(0, 7);
  }
}

function collisionDetection() {
  for (let r = 0; r < bricks.rows; r += 1) {
    if (r % 2 === 0) {
      brickWidth = startBrickWidth / 2;
      brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
    } else {
      brickWidth = startBrickWidth;
      brickColumnCount = startBrickColumnCount;
    }
    for (let c = 0; c < bricks.cols; c += 1) {
      const brick = bricks.bricks[r][c];
      if (brick.status === 1) {
        if (
          ball.x > brick.x - ball.ballRadius
          && ball.x < brick.x + brickWidth + ball.ballRadius
          && ball.y > brick.y - ball.ballRadius
          && ball.y < brick.y + brickHeight + ball.ballRadius
        ) {
          dy = -(dy + 1);
          if (dx < 0) {
            dx -= 0.1;
          } else {
            dx += 0.1;
          }
          brick.status = 0;
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
  bricks.render(ctx);
  ball.render(ctx);
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();
  if (x + dx > canvas.width - ball.radius || x + dx < ball.radius) {
    dx = -dx;
    ball.color = randomColor();
  }
  if (y + dy < ball.radius) {
    dy = -dy;
    ballColor = randomColor();
  } else if (y + dy > canvas.height - ball.radius - paddle.height) {
    if (x > paddle.x && x < paddle.x + paddle.width) {
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
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed) {
    paddle.moveBy(7, 0);
  } else if (leftPressed) {
    paddle.moveBy(0, 7);
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
