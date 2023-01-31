/* eslint-disable max-len */
/* eslint-disable import/extensions */
import Brick from './Brick.js';

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
    this.totalBricks = 0;
    this.initializeBricks();
  }

  initializeBricks() {
    // for (let r = 0; r < this.rows; r += 1) {
    //   this.bricks[r] = [];
    //   console.log(this.cols);
    //   if (r % 2 === 0) {
    //     this.cols *= 2;
    //     this.width = (this.width / 2) - this.padding;
    //   }
    //   for (let c = 0; c < this.cols; c += 1) {
    //     const brickX = (c * (this.width + this.padding)) + this.offsetLeft;
    //     const brickY = (r * (this.height + this.padding)) + this.offsetTop;
    //     this.bricks[r][c] = new Brick(brickX, brickY, this.width, this.height, this.color);
    //     this.totalBricks += 1;
    //   }
    // }

    const brickColors = ['#FF0000', '#FF9900', '#FFFF00', '#66FF33', '#00FFFF', '#0000FF', '#6600FF', '#6600CC', '#CC0099', '#FF0066'];

    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (c * (this.width + this.padding)) + this.offsetLeft;
        const brickY = (r * (this.height + this.padding)) + this.offsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, brickColors[this.totalBricks % brickColors.length]);
        this.totalBricks += 1;
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
}

export default Bricks;
