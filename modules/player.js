class Player {
  constructor(game) {
    this.game = game;
    this.width = 64;
    this.height = 64;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height * 1.5;
    this.speed = 5;
    this.lives = 3;
    this.image = document.getElementById("pink_donut");
  }
  draw(context) {
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y);
  }
  update() {
    // player movement
    if (this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed;
    if (this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed;
    // horizontal boundaries
    ///////////////////// FEATURE UPDATE: player stays within game canvas. Enemies bounce off invisible boundary which is 1/4 the size of the enemy from the edge
    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }
  shoot() {
    const projectile = this.game.getProjectile();
    if (projectile && !this.game.gameOver)
      projectile.start(this.x + this.width * 0.5, this.y);
  }
  restart() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height * 1.5;
    this.lives = 3;
  }
}

export default Player;
