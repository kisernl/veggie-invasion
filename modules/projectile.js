class Projectile {
  constructor() {
    this.width = 4;
    this.height = 20;
    this.x = 0;
    this.y = 0;
    this.speed = 20;
    this.free = true;
  }
  draw(context) {
    if (!this.free) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  update() {
    if (!this.free) {
      this.y -= this.speed;
    }
  }
  //method for using a projectile from the projectiles pool
  start() {
    this.free = false;
  }
  // method for returning used projectile to the pool
  reset() {
    this.free = true;
  }
}

export default Projectile;
