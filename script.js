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
  let gameStarted = false;

  function drawWelcomeMessage() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = "#ff90c7";
    ctx.textAlign = "center";
    ctx.fillStyle = "#c7f1c7";
    ctx.font = "500 75px DotGothic16";
    ctx.fillText("Veggie Invasion", canvas.width * 0.5, canvas.height * 0.25);
    ctx.font = "500 25px DotGothic16";
    ctx.fillText(
      "Arrow Left / Arrow Right to Move",
      canvas.width * 0.5,
      canvas.height * 0.35
    );
    ctx.fillText(`& "S" to shoot!`, canvas.width * 0.5, canvas.height * 0.4);
    ctx.font = "500 40px DotGothic16";
    ctx.fillText(
      "Press Enter to Start",
      canvas.width * 0.5,
      canvas.height * 0.75
    );
    ctx.restore();
  }

  // Animation loop
  function animate(timeStamp) {
    if (gameStarted) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.render(ctx, deltaTime);
      window.requestAnimationFrame(animate);
    } else {
      drawWelcomeMessage();
    }
  }

  // Start the game on Enter key press
  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !gameStarted) {
      gameStarted = true;
      animate(0); // Start the animation loop
    }
  });

  // Initial draw of the welcome message
  drawWelcomeMessage();
});
