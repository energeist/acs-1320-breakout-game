/* eslint-disable import/extensions */
import Sprite from './Sprite';

export interface BrickProps {
  x: number;
  y: number;
  width: number;
  height: number;
  status: number;
}

export class Brick extends Sprite implements BrickProps {
  status: number;
  constructor(public x: number, public y: number, public width: number = 75, public height: number = 20, public color: string = 'blue') {
    super(x, y, width, height, color);
    this.status = 1;
  }
}

