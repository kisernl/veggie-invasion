import Player from "./modules/player.js";
import Projectiles from "./modules/projectiles.js";
import Enemy from "./modules/enemy.js";

const enemy = new Enemy();
enemy.test();

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "30px Impact";
});
