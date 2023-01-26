/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'red') {
    super(x, y, 0, 0, color);
    this.dx = dx;
    this.dy = -dy;
    this.radius = radius;
    this.color = color;
    this.debug();
  }

  // eslint-disable-next-line class-methods-use-this
  debug() {
    console.log('ball loaded');
  }

  moveBall() {
    this.moveBy(this.dx, this.dy);
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
