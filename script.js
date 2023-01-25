/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballColor = 'blue';

// const ballRadius = 10;

// const startBrickColumnCount = 5;
// const startBrickWidth = 75;
// let brickWidth = startBrickWidth;

// const brickColumnCount = startBrickColumnCount;

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
  constructor(cols, rows, width, height, padding, offsetTop, offsetLeft, color) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    this.color = color;
    this.initializeBricks();
  }

  initializeBricks() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (c * (this.width + this.padding)) + this.offsetLeft;
        const brickY = (r * (this.height + this.padding)) + this.offsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, this.color);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }

  // STRETCH CHALLENGE BRICKS
  // initializeBricks() {
  //   const objectColor = 'blue';
  //   for (let r = 0; r < this.brickRowCount; r += 1) {
  //     this.bricks[r] = [];
  //     if (r % 2 === 0) {
  //       brickWidth = startBrickWidth / 2;
  //       brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
  //     } else {
  //       brickWidth = startBrickWidth;
  //       brickColumnCount = this.startBrickColumnCount;
  //     }
  //     for (let c = 0; c < brickColumnCount; c += 1) {
  //       const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
  //       const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
  //       this.bricks[r][c] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
  //       totalBricks += 1;
  //     }
  //   }
  // }

  // STRETCH CHALLENGE BRICKS
  // render(ctx) {
  //   const brickColors = ['#FF0000', '#FF9900', '#FFFF00', '#66FF33', '#00FFFF', '#0000FF', '#6600FF', '#6600CC', '#CC0099', '#FF0066'];
  //   for (let r = 0; r < brickRowCount; r += 1) {
  //     if (r % 2 === 0) {
  //       brickWidth = startBrickWidth / 2;
  //       brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
  //     } else {
  //       brickWidth = startBrickWidth;
  //       brickColumnCount = startBrickColumnCount;
  //     }
  //     for (let c = 0; c < brickColumnCount; c += 1) {
  //       const brick = this.bricks[r][c];
  //       if (brick.status === 1) {
  //         brick.render(ctx);
  //       }
  //     }
  //   }
  // }
}

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

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}

class GameLabel {
  constructor(text, x, y, color = 'blue', font = '16px Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

class Game {
  constructor() {
    this.ball = new Ball(0, 0, 2, 2, 10, 'blue');

    // values for Bricks
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.color = 'blue';
    this.bricks = new Bricks(
      this.brickColumnCount,
      this.brickRowCount,
      this.width,
      this.height,
      this.padding,
      this.offsetTop,
      this.offsetLeft,
      this.color,
    );

    // values for Paddle
    this.paddleHeight = 10;
    this.paddleWidth = 55;
    this.paddleX = (canvas.width - this.width) / 2;
    this.paddleY = (canvas.height - this.height);
    this.paddle = new Paddle(
      this.paddleX,
      this.paddleY,
      this.paddleWidth,
      this.paddleHeight,
      this.color,
    );
    this.scoreLabel = new GameLabel('Score: ', 8, 20);
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20);
    this.rightPressed = false;
    this.leftPressed = false;
    this.setup();
    this.draw();
  }

  resetBallAndPaddle() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleX;
  }

  randomColor() {
    const hexValues = '1234567890ABCDEF';
    this.hexString = '#';
    for (let i = 0; i < 6; i += 1) {
      this.hexString += hexValues[Math.floor(Math.random() * 16)];
    }
    return this.hexString;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (this.ball.x > brick.x - this.ball.ballRadius
            && this.ball.x < brick.x + this.brickWidth + this.ball.ballRadius
            && this.ball.y > brick.y - this.ball.ballRadius
            && this.ball.y < brick.y + this.brickHeight + this.ball.ballRadius
          ) {
            this.ball.dy = -(this.ball.dy + 1);
            if (this.ball.dx < 0) {
              this.ball.dx -= 0.1;
            } else {
              this.ball.dx += 0.1;
            }
            brick.status = 0;
          }
        }
      }
    }
  }

  // STRETCH BRICKS
  // collisionDetection() {
  //   for (let r = 0; r < this.bricks.rows; r += 1) {
  //     if (r % 2 === 0) {
  //       brickWidth = startBrickWidth / 2;
  //       brickColumnCount = Math.floor((canvas.width - (brickOffsetLeft)) / (brickWidth + brickPadding));
  //     } else {
  //       brickWidth = startBrickWidth;
  //       brickColumnCount = startBrickColumnCount;
  //     }
  //     for (let c = 0; c < this.bricks.cols; c += 1) {
  //       const brick = this.bricks.bricks[r][c];
  //       if (brick.status === 1) {
  //         if (
  //           this.ball.x > brick.x - this.ball.ballRadius
  //           && this.ball.x < brick.x + brickWidth + this.ball.ballRadius
  //           && this.ball.y > brick.y - this.ball.ballRadius
  //           && this.ball.y < brick.y + brickHeight + this.ball.ballRadius
  //         ) {
  //           this.ball.dy = -(this.ball.dy + 1);
  //           if (this.ball.dx < 0) {
  //             this.ball.dx -= 0.1;
  //           } else {
  //             this.ball.dx += 0.1;
  //           }
  //           brick.status = 0;
  //           ballColor = this.randomColor();
  //           this.scoreLabel.value += 1;
  //           if (this.scoreLabel.value === totalBricks) {
  //             alert(`YOU WIN, CONGRATULATIONS! YOUR SCORE WAS ${this.scoreLabel.value} POINTS!`);
  //             document.location.reload();
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(0, 7);
    }
  }

  collisionsWithCanvasAndPaddle() {
    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.x < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
      this.ball.color = this.randomColor();
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
      this.ball.color = this.randomColor();
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius - this.paddle.height) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -(this.ball.dy + 1);
        this.ball.color = this.randomColor();
      } else {
        this.livesLabel.value -= 1;
        if (this.livesLabel.value === 0) {
          alert(`GAME OVER... YOUR SCORE WAS ${this.scoreLabel.value} POINTS`);
          document.location.reload();
        } else {
          this.resetBallAndPaddle();
        }
      }
    }
  }

  keyDownHandler(evt) {
    if (evt.key === 'Right' || evt.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(evt) {
    if (evt.key === 'Right' || evt.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(evt) {
    this.relativeX = evt.clientX - canvas.offsetLeft;
    if (this.relativeX > 0 && this.relativeX < (canvas.width - this.paddle.width / 2)) {
      this.paddle.moveTo(this.relativeX - this.paddle.width / 2, this.paddleY);
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // add gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'violet');
    gradient.addColorStop(0.25, 'pink');
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(0.75, 'pink');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.livesLabel.render(ctx);
    this.collisionDetection();
    this.ball.moveBall();
    this.movePaddle();
    this.collisionsWithCanvasAndPaddle();

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  setup() {
    this.livesLabel.value = 3;
    this.resetBallAndPaddle();
    document.addEventListener('keydown', (evt) => {
      this.keyDownHandler(evt);
    }, false);
    document.addEventListener('keyup', (evt) => {
      this.keyUpHandler(evt);
    }, false);
    document.addEventListener('mousemove', (evt) => {
      this.mouseMoveHandler(evt);
    }, false);
  }
}

const breakout = new Game();