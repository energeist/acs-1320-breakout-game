/* eslint-disable import/extensions */
import Sprite from './Sprite';

export interface BallProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
  moveBall: () => void;
  render:(ctx: CanvasRenderingContext2D) => void;
}

export class Ball extends Sprite implements BallProps {
  constructor(public x: number = 0, public y: number = 0, public dx: number = 2, public dy: number = -1, readonly radius: number = 10, public color: string = 'red') {
    super(x, y, 0, 0, color);
    this.dx = dx;
    this.dy = -dy;
    this.radius = radius;
    this.color = color;
  }

  moveBall() {
    this.moveBy(this.dx, this.dy);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

