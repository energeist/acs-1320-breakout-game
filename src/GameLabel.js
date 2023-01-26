/* eslint-disable import/extensions */

import Sprite from './Sprite.js';

class GameLabel extends Sprite {
  constructor(text, x, y, color = 'blue', font = '16px Arial') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.value = 0;
    this.font = font;
    this.debug();
  }

  // eslint-disable-next-line class-methods-use-this
  debug() {
    console.log('gamelabel loaded');
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
