const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
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
let brickColumnCount = startBrickColumnCount;
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

for (let r = 0; r < brickRowCount; r++) {
  bricks[r] = []
  if (r % 2 == 0) {
    brickWidth = startBrickWidth / 2
    brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding))  
  } else {
    brickWidth = startBrickWidth;
    brickColumnCount = startBrickColumnCount;
  }
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[r][c] = { 
      x: 0,
      y: 0, 
      status: 1 
    };
    totalBricks++;
  }
} 

// for (let c = 0; c < brickColumnCount; c++) {
//   bricks[c] = [];
//   for (let r = 0; r < brickRowCount; r++) {
//     bricks[c][r] = { 
//       x: 0,
//       y: 0, 
//       status: 1 
//     };
//   }
// }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function randomColor() {
  let hexValues = '1234567890ABCDEF';
  let hexString = '#';
  for (let i = 0; i < 6; i++) {
    hexString += hexValues[Math.floor(Math.random()*16)];
  }
  return hexString;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -(dy + 1);
    } else {
      lives--;
      if (!lives) {
        alert(`GAME OVER... YOUR SCORE WAS ${score} POINTS`);
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
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

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
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

// function drawBricks() {
//   brickColors = ['#FF0000', '#FF9900', '#FFFF00', '#66FF33', '#00FFFF', '#0000FF', '#6600FF', '#6600CC', '#CC0099', '#FF0066']
//   for (let c = 0; c < brickColumnCount; c++) {
//     for (let r = 0; r < brickRowCount; r++) {
//       if (bricks[c][r].status === 1) {
//         const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
//         const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         //ctx.fillStyle = "#0095DD";
//         ctx.fillStyle = brickColors[c];
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }

function drawBricks() {
  brickColors = ['#FF0000', '#FF9900', '#FFFF00', '#66FF33', '#00FFFF', '#0000FF', '#6600FF', '#6600CC', '#CC0099', '#FF0066']
  for (let r = 0; r < brickRowCount; r++) {
    if (r % 2 == 0) {
      brickWidth = startBrickWidth / 2
      brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding))  
    } else {
      brickWidth = startBrickWidth;
      brickColumnCount = startBrickColumnCount;
    }
    for (let c = 0; c < brickColumnCount; c++) {
      if (bricks[r][c].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        //ctx.fillStyle = "#0095DD";
        ctx.fillStyle = brickColors[c];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let r = 0; r < brickRowCount; r++) {
    if (r % 2 == 0) {
      brickWidth = startBrickWidth / 2
      brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding))  
    } else {
      brickWidth = startBrickWidth;
      brickColumnCount = startBrickColumnCount;
    }
    for (let c = 0; c < brickColumnCount; c++) {
      const b = bricks[r][c];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -(dy + 1);
          b.status = 0;
          ballColor = randomColor();
          score++;
          if (score === totalBricks) {
            alert(`YOU WIN, CONGRATULATIONS! YOUR SCORE WAS ${score} POINTS!`);
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

// function collisionDetection() {
//   for (let c = 0; c < brickColumnCount; c++) {
//     for (let r = 0; r < brickRowCount; r++) {
//       const b = bricks[c][r];
//       if (b.status === 1) {
//         if (
//           x > b.x &&
//           x < b.x + brickWidth &&
//           y > b.y &&
//           y < b.y + brickHeight
//         ) {
//           dy = -(dy + 1);
//           b.status = 0;
//           ballColor = randomColor();
//           score++;
//           if (score === brickRowCount * brickColumnCount) {
//             alert(`YOU WIN, CONGRATULATIONS! YOUR SCORE WAS ${score} POINTS!`);
//             document.location.reload();
//             clearInterval(interval); // Needed for Chrome to end game
//           }
//         }
//       }
//     }
//   }
// }

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

draw();