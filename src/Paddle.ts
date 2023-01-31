/* eslint-disable import/extensions */
import Sprite from './Sprite';

export interface PaddleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
}

export class Paddle extends Sprite {
  constructor(public x: number, public y: number, public width: number = 75, public height: number = 20, public color: string = 'blue', public speed: number = 7) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.color = color;
  }
}
