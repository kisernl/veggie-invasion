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
    this.numberOfProjectiles = 15;
    this.createProjectiles();
    this.fired = false;

    //wave grid for enemies
    this.columns = 2;
    this.rows = 2;
    this.enemySize = 48;

    this.waveCount = 1;
    this.waveSpeed = 2;
    this.waves = [];
    this.waves.push(new Wave(this));

    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = 75;

    this.score = 0;
    this.gameOver = false;
    this.coffeeCup = document.getElementById("coffee_cup");

    // event listener
    window.addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
      if (e.key === "s" && !this.fired) this.player.shoot();
      this.fired = true;
      if ((e.key === "r" && this.gameOver) || (e.key === "R" && this.gameOver))
        this.restart();
    });
    window.addEventListener("keyup", (e) => {
      this.fired = false;
      const index = this.keys.indexOf(e.key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }

  render(context, deltaTime) {
    // sprite timing
    if (this.spriteTimer > this.spriteInterval) {
      this.spriteUpdate = true;
      this.spriteTimer = 0;
    } else {
      this.spriteUpdate = false;
      this.spriteTimer += deltaTime;
    }

    this.drawStatusText(context);
    // this.player.draw(context);
    // this.player.update();
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
        if (this.waveCount % 5 === 0) {
          this.player.lives++;
        }
      }
    });
    this.player.draw(context);
    this.player.update();
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
    //context.fillText("Wave: " + this.waveCount, 30, 90);
    /////// FEATURE NEEDED: coffee cup svg for lives instead of numbers
    // if (this.player.lives > -1) {
    //   context.fillText("Lives: " + this.player.lives, 30, 135);
    // } else {
    //   context.fillText("Lives: 0", 30, 135);
    // }
    for (let i = 0; i < this.player.lives; i++) {
      const cupX = 30 + i * 40; // Offset each coffee cup horizontally
      const cupY = 60; // Fixed vertical position
      context.drawImage(this.coffeeCup, cupX, cupY, 30, 30); // 30x30 size
    }
  }
  drawGameOverText(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "white";
    if (this.gameOver) {
      context.textAlign = "center";
      context.font = "500 100px DotGothic16";
      context.fillText("GAME OVER!", this.width * 0.5, this.height * 0.4);
      context.font = "500 30px DotGothic16";
      context.fillText(
        `Press "R" to try again`,
        this.width * 0.5,
        this.height * 0.47
      );
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
  restart() {
    this.player.restart();
    this.columns = 2;
    this.rows = 2;
    this.waves = [];
    this.waves.push(new Wave(this));
    this.waveCount = 1;
    this.score = 0;
    this.gameOver = false;
  }
}

export default Game;
