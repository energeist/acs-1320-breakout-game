/* eslint-disable import/extensions */

import Sprite from './Sprite';

export interface GameLabelProps {
  text: string;
  value: number;
  font: string;
  render(ctx: CanvasRenderingContext2D): void;
}

export class GameLabel extends Sprite {
  value: number;

  constructor(public text: string, public x: number, public y: number, public color: string = 'blue', readonly font: string = '16px Arial') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.value = 0;
    this.font = font;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}
