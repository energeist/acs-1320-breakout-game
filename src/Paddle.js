/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width = 75, height = 20, color = 'blue', speed = 7) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.color = color;
    this.debug();
  }

  // eslint-disable-next-line class-methods-use-this
  debug() {
    console.log('paddle loaded');
  }
}

export default Paddle;
