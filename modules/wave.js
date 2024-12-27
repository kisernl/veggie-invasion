import Enemy from "./enemy.js";

class Wave {
  constructor(game) {
    this.game = game;
    // this.enemySize = this.game.enemySize;
    this.width = this.game.columns * this.game.enemySize;
    this.height = this.game.rows * this.game.enemySize;
    // if the wave starts at 0, it gets stuck on left corner, must start within boundaries set in render method
    this.x = 0 + this.game.width * 0.25;
    this.y = 0 - this.height;
    // this.x = 0 + this.width;
    // this.y = 0 - this.height;
    this.speedX = 3;
    this.speedY = 0;
    this.enemies = [];
    this.nextWaveTrigger = false;
    this.create();
  }
  render(context) {
    if (this.y < 0) this.y += 5;
    this.speedY = 0;
    if (
      // code below causes wave to bounce 1/2 the enemy width short of right and left game edge
      this.x - this.game.enemySize * 0.5 < 0 ||
      this.x + this.width > this.game.width - this.game.enemySize * 0.5
    ) {
      this.speedX *= -1;
      this.speedY = this.game.enemySize;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    this.enemies.forEach((enemy) => {
      enemy.update(this.x, this.y);
      enemy.draw(context);
    });
    this.enemies = this.enemies.filter((object) => !object.markedForDeletion);
  }
  create() {
    for (let y = 0; y < this.game.rows; y++) {
      for (let x = 0; x < this.game.columns; x++) {
        let enemyX = x * this.game.enemySize;
        let enemyY = y * this.game.enemySize;
        this.enemies.push(new Enemy(this.game, enemyX, enemyY));
      }
    }
  }
}

export default Wave;

////////////////////
// timestamp: 37:57 https://www.youtube.com/watch?v=cuudnyDyWGE&t=5839s
