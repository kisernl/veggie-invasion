import Player from "./player.js";
import Projectile from "./projectile.js";
import Enemy from "./enemy.js";
import Wave from "./wave.js";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.keys = [];
    this.player = new Player(this);

    this.projectilesPool = [];
    this.numberOfProjectiles = 10;
    this.createProjectiles();

    //wave grid for enemies
    this.columns = 6;
    this.rows = 6;
    this.enemySize = 48;

    this.waves = [];
    this.waves.push(new Wave(this));
    this.waveCount = 1;

    this.score = 0;
    this.gameOver = false;

    // event listener
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      if (e.key === "s") this.player.shoot();
    });
    window.addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }

  render(context) {
    this.drawStatusText(context);
    this.player.draw(context);
    this.player.update();
    this.projectilesPool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });
    this.waves.forEach((wave) => {
      wave.render(context);
      if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver) {
        this.newWave();
        this.waveCount++;
        wave.nextWaveTrigger = true;
      }
    });
    this.drawGameOverText(context);
  }
  // create projectiles object pool
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());
    }
  }
  // get free projectile object from the pool
  getProjectile() {
    for (let i = 0; i < this.projectilesPool.length; i++) {
      if (this.projectilesPool[i].free) return this.projectilesPool[i];
    }
  }
  // collision detection between 2 rectangles
  checkCollision(a, b) {
    // is top left corner of rect A horizontally less than top left corner of rect B + width of rect B && is the horizontal position of top right corner of rect A more than the top left corner of rect B && is vertical position of rect A less than the vertical position of rect B + height of rect B && if the bottom left corner of rect A is below the top left corner of rect B
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
    // the above code returns true or false
    // runs in Enemy module
  }
  drawStatusText(context) {
    context.fillText("Score: " + this.score, 30, 45);
    context.fillText("Wave: " + this.waveCount, 30, 90);
    if (this.player.lives > -1) {
      context.fillText("Lives: " + this.player.lives, 30, 135);
    } else {
      context.fillText("Lives: 0", 30, 135);
    }
    for (let i = 0; i < this.player.lives; i++) {}
  }
  drawGameOverText(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    if (this.gameOver) {
      context.textAlign = "center";
      context.font = "500 100px DotGothic16";
      context.fillText("GAME OVER!", this.width * 0.5, this.height * 0.35);
    }
    context.restore();
  }
  newWave() {
    if (
      Math.random() < 0.5 &&
      this.columns * this.enemySize < this.width * 0.8
    ) {
      this.columns++;
    } else if (this.rows * this.enemySize < this.height * 0.6) {
      this.rows++;
    }
    this.waves.push(new Wave(this));
  }
}

export default Game;
