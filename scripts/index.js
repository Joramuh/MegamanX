const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const player = new Player(ctx)
const background = new Background(ctx)
const enemy = new Enemy(ctx)
const bullet = new Bullet(ctx)

const loadingImg = new Image();
loadingImg.src = "./images/loadingScreen.png";

const game = new Game(ctx, player, background, enemy, bullet)   

ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// ctx.drawImage(game.gameOverImg,0,0);
ctx.fillStyle = "#ffd700";
ctx.textAlign = "center";
ctx.font = "bold italic 32px sans-serif";
ctx.fillText("Now Loading...", ctx.canvas.width/2, ctx.canvas.height/2);

const startButton =  document.getElementById("new-game")
  startButton.onclick = ()=> {
    startButton.textContent = "Play Again"
    startButton.blur();
    game.start();
  }

  