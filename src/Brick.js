/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = 'blue') {
    super(x, y, width, height, color);
    this.status = 1;
    this.debug();
  }

  // eslint-disable-next-line class-methods-use-this
  debug() {
    console.log('brick loaded');
  }
}

export default Brick;
