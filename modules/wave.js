import Enemy from "./enemy.js";
import Veggies from "./veggies.js";

class Wave {
  constructor(game) {
    this.game = game;
    this.width = this.game.columns * this.game.enemySize;
    this.height = this.game.rows * this.game.enemySize;
    // if the wave starts at 0, it gets stuck on left corner, must start within boundaries set in render method
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = -this.height;

    if (this.game.waveCount % 5 === 0) {
      this.game.waveSpeed++;
    }
    this.speedX =
      Math.random() < 0.5 ? -this.game.waveSpeed : this.game.waveSpeed;
    this.speedY = 0;
    this.enemies = [];
    this.nextWaveTrigger = false;
    this.create();
  }
  render(context) {
    if (this.y < 48) this.y += 5;
    this.speedY = 0;

    //////// this code caused a glitch when waves dropped in
    // if (
    //   // code below causes wave to bounce 1/2 the enemy width short of right and left game edge
    //   this.x - this.game.enemySize * 0.5 < 0 ||
    //   this.x + this.width > this.game.width - this.game.enemySize * 0.5
    // ) {
    //   this.speedX *= -1;
    //   this.speedY = this.game.enemySize;
    // }
    if (this.x < 0 || this.x > this.game.width - this.width) {
      this.speedX *= -1;
      this.speedY = this.game.enemySize;
    }
    this.x += this.speedX;
    if (!this.game.gameOver) this.y += this.speedY;
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
        this.enemies.push(new Veggies(this.game, enemyX, enemyY));
      }
    }
  }
}

export default Wave;

////////////////////
// timestamp: 1:16:32 https://www.youtube.com/watch?v=cuudnyDyWGE&t=5839s
