import Game from "./modules/game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;
  ctx.fillStyle = "#ff90c7";
  ctx.strokeStyle = "white";
  ctx.font = "500 30px DotGothic16";
  ctx.lineWidth = 5;

  const game = new Game(canvas);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    window.requestAnimationFrame(animate);
  }
  animate(0);
});

// timestamp 56:11 https://www.youtube.com/watch?v=cuudnyDyWGE&t=2277s
