/* eslint-disable import/extensions */

interface SpriteProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  moveBy(dx: number, dy: number): void
  moveBy(x: number, y: number): void
  render(ctx: CanvasRenderingContext2D): void
}

class Sprite implements SpriteProps {
  constructor(public x: number = 0, public y: number = 0, public width: number = 100, public height: number = 100, public color: string = 'blue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
