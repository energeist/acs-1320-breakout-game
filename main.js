class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = -dy;
    this.radius = radius;
  }
}

let ball = new Ball();

function initializeBricks() {
  for (let c = 0; c < startBrickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r] = {
        x: 0
        y: 0
        status: 1,
      };
    }
  }
}