class Game {
    constructor(ctx, player, background, enemy, bullet) {
      this.ctx = ctx;      
      this.player = player;
      this.background = background;     
      this.bullet = bullet;
      this.frameNumber = 0;
      this.score = 0;       
      this.enemy = enemy;

      this.gameOverImg = new Image();
      this.gameOverImg.src = "./images/gameOver.png"
      this.gameWinImg = new Image();
      this.gameWinImg.src = "./images/congrats.png"
      this.livesImg = new Image();
      this.livesImg.src = "./images/liveUp.png"

      this.shootSFX = new Audio("OST/buster.mp3")
      this.gameWinSFX = new Audio("OST/win.mp3")
      this.bgSFX = new Audio ("OST/ost.mp3")
      this.gameOverSFX = new Audio ("OST/death.mp3")
    
      document.addEventListener("keydown", (e) => {
        switch (e.keyCode){
            case 37:               // L arrow
                 this.playerGoLeft()
                break;   
            case 39:               // R arrow
                this.playerGoRight()
                break;
            case 38:                // Up arrow     
                this.playerJump();    
                break;
            case 32:                // SpaceBar
                this.playerShoot();
                this.shootSFX.play();
                break;
        }
      });
    }
  
    start() {
      this.player.hp = 3;
      this.init();
      this.play(); 
    }   
      
    init() {
      if(this.frameNumber) this.stop()  
      this.frameNumber = 0;    
      this.score = 0;  
      this.background.init();
      this.enemy.init();
      this.player.init();
    }    
  
    play() {       
      this.move();
      this.draw();    
      this.bulletCollision();
      this.enemyCheckCollision();
      this.playerCheckCollision();
      this.removeIfExitsCanvas();
      this.bgSFX.play();
      if (this.player.hp === 0) this.gameOver();
      if (this.score === 20) this.gameWin()
      this.enemyAttacks(this.frameNumber);
      if (this.frameNumber !== null) {                               
        this.frameNumber = requestAnimationFrame(this.play.bind(this));  
      }    
    }

    stop(){
        cancelAnimationFrame(this.frameNumber);
        this.frameNumber = null;
    }

    playerJump() {
        this.player.jump();   
      }

    playerGoLeft(){
        this.player.goLeft();
    }

    playerGoRight(){
        this.player.goRight();  
    }

    playerShoot(){
        this.bullet.newBullet(this.player.x, this.player.y);  
      }

    move() {
      this.background.move(this.frameNumber);
      this.enemy.move(this.frameNumber);
      this.player.move(this.frameNumber);
      this.bullet.move(); 
    }
  
    draw() {
      this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.background.draw(this.frameNumber);
      this.enemy.draw(this.frameNumber);
      this.player.draw(this.frameNumber);    
      this.bullet.draw();
      this.drawScore();
      this.drawHP();
    }    

    drawScore(){
      this.ctx.save();
      this.ctx.fillStyle = "white";
      this.ctx.font = " bold 24px sans-serif";
      this.ctx.fillText(`Score: ${this.score}`, 80, 40);
      this.ctx.restore(); 
    }

    drawHP(){
      this.ctx.save();
      this.ctx.fillStyle = "white";
      this.ctx.font = " bold 24px sans-serif";
      this.ctx.drawImage(this.livesImg, 25,420)
      this.ctx.fillText(` ${this.player.hp}`, 88, 455);
      this.ctx.restore(); 
    }
        
    removeIfExitsCanvas(){
      this.enemy.enemies = this.enemy.removeIfExitsCanvas(this.enemy.enemies);
     this.bullet.bullets = this.bullet.removeIfExitsCanvas(this.bullet.bullets);
    }

    bulletCollision(){            
      let collisions = false;
      if (this.bullet.bullets.some((bullet) =>
      this.enemy.collidesWith(bullet))
      ){
        collisions = true;
      }    
    } 

    enemyCheckCollision(){             
      this.enemy.enemies.forEach(e => {
        if(this.bullet.collidesWith(e)) {
          let index = this.enemy.enemies.indexOf(e);
          this.enemy.enemies.splice(index,1);
          this.scoreCount();          
        }
      })     
    }

    playerCheckCollision(){
      this.enemy.enemies.forEach(e =>{
        if(this.player.collidesWith(e)){
          let index = this.enemy.enemies.indexOf(e);
          this.enemy.enemies.splice(index,1);
          this.player.hp--;
        }
      })
    }

    enemyAttacks(frameNumber){
      this.enemy.jump(frameNumber);

    }

    scoreCount(){
        this.score ++      
    }

    gameOver(){
      this.stop();
      this.bgSFX.pause();
      this.ctx.save();
      this.gameOverSFX.play();
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(this.gameOverImg, 0,0);
      this.ctx.fillStyle = "#ffd700";
      this.ctx.textAlign = "center";
      this.ctx.font = "bold 32px sans-serif";  
      this.ctx.fillText(
        `Your score: ${this.score}`, 
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2.3
      );
      this.ctx.restore();
    }
     

    gameWin(){
      this.stop();
      this.bgSFX.pause();
      this.ctx.save();
      this.gameWinSFX.play();
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(this.gameWinImg,200,50)
      this.ctx.fillStyle = "#ffd700";
      this.ctx.textAlign = "center";
      this.ctx.font = "bold 32px sans-serif";
      this.ctx.fillText(
        `Mission Complete! You Win!`, 
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 1.1
      );
      this.ctx.restore();
    }
   
}

