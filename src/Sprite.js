/* eslint-disable import/extensions */
class Sprite {
  constructor(x = 0, y = 0, width = 100, height = 100, color = 'blue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.debug();
  }

  // eslint-disable-next-line class-methods-use-this
  debug() {
    console.log('sprite loaded');
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
