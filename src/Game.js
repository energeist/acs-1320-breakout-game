/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import Ball from './Ball.js';
import Bricks from './Bricks.js';
import Paddle from './Paddle.js';
import GameLabel from './GameLabel.js';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    // values for Bricks
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.width = 75;
    this.height = 20;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.color = 'blue';

    // values for Ball
    this.ballRadius = 10;
    this.ballColor = 'blue';
    this.ball = new Ball(100, 200, 2, -2, this.ballRadius, this.ballColor);

    // values for Paddle
    this.paddleHeight = 15;
    this.paddleWidth = 100;
    this.paddleSpeed = 7;
    this.paddleColor = 'blue';
    this.paddleX = (canvas.width - this.width) / 2;
    this.paddleY = (canvas.height - this.height);
    this.paddle = new Paddle(
      this.paddleX,
      this.paddleY,
      this.paddleWidth,
      this.paddleHeight,
      this.paddleSpeed,
      this.paddleColor,
    );

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

    this.scoreLabel = new GameLabel('Score: ', 8, 20);
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20);
    this.rightPressed = false;
    this.leftPressed = false;
    this.setup();
    this.draw();
  }

  resetBallAndPaddle() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
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
          if (this.ball.x > brick.x - this.ball.radius
            && this.ball.x < brick.x + this.width + this.ball.radius
            && this.ball.y > brick.y - this.ball.radius
            && this.ball.y < brick.y + this.height + this.ball.radius
          ) {
            this.ball.dy = (Math.abs(this.ball.dy) + 0.2);
            if (this.ball.dx < 0) {
              this.ball.dx -= 0.1;
            } else {
              this.ball.dx += 0.1;
            }
            brick.status = 0;
            this.scoreLabel.value += 1;
            this.paddle.width -= 3;
            console.log(this.bricks.totalBricks);
            if (this.scoreLabel.value === this.bricks.totalBricks) {
              alert(`You win! Your final score is ${this.scoreLabel.value} points.`);
              document.location.reload();
            }
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
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionsWithCanvasAndPaddle() {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.x < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
      this.ball.color = this.randomColor();
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
      this.ball.color = this.randomColor();
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius - this.paddle.height) {
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
    this.relativeX = evt.clientX - this.canvas.offsetLeft;
    if (this.relativeX > 0 && this.relativeX < (this.canvas.width - this.paddle.width / 2)) {
      this.paddle.moveTo(this.relativeX - this.paddle.width / 2, this.paddleY);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // add gradient
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'violet');
    gradient.addColorStop(0.25, 'pink');
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(0.75, 'pink');
    gradient.addColorStop(1, 'violet');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.bricks.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
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

export default Game;
