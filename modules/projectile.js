class Projectile {
  constructor() {
    this.width = 6;
    this.height = 20;
    this.x = 0;
    this.y = 0;
    this.speed = 20;
    this.free = true;
  }
  draw(context) {
    if (!this.free) {
      context.save();
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.restore();
    }
  }
  update() {
    if (!this.free) {
      this.y -= this.speed;
      if (this.y < -this.height) this.reset();
    }
  }
  //method for using a projectile from the projectiles pool
  start(x, y) {
    this.x = x - this.width * 0.5;
    this.y = y;
    this.free = false;
  }
  // method for returning used projectile to the pool
  reset() {
    this.free = true;
  }
}

export default Projectile;
