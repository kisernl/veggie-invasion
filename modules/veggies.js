import Enemy from "./enemy.js";

class Veggies extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("veggie_sprite_sheet");
    this.frameX = 0;
    this.maxFrame = 3;
    this.frameY = Math.floor(Math.random() * 6);
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

export default Veggies;
// time stamp 1:21:22
