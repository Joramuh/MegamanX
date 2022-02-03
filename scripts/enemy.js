class Enemy {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = 60;    
        this.height = 81;    
        this.x = 639;
        this.y = 300;
        this.xv -= 10;
        this.yv = 0;
        this.gravity = 0.6; 
        this.floor = 300;
        this.enemies = [];
        this.img = new Image();
        this.img.src = "./images/vile.png"
    }
  
    init(){
        this.x = 639;
        this.y = 300;
        this.yv = 0;
        this.xv = 3;
        this.gravity = 0.6; 
        this.enemies = [];               
    }
  
    move(frameNumber) {    
        if(Math.floor(Math.random()*30) % 2 === 0){
        if(frameNumber % 35 === 0){
            const enemyPositionX = (590)
            this.enemies.push(this.createEnemy(enemyPositionX))}
}
        this.enemies.forEach((goLeft)=> {
            goLeft.x -= goLeft.xv;  
            goLeft.y += goLeft.yv;      
        })

        this.yv += this.gravity;
  
        if (this.y > this.floor) {
          this.y = this.floor} 
          if (this.y < 0){this.y = 0}             
    }
  
    createEnemy(positionX){
       const newEnemy = {
           img: new Image(),
           width: 60,
           height: 81,
           y: 300,
           x: positionX,
           xv: 3,
           yv: 0,
       }
       newEnemy.img.src = "./images/vile.png"
       return newEnemy;
    }

    jump(frameNumber){     
       if(frameNumber % 500 === 0){ 
        this.enemies.forEach((enemy)=> { 
            setInterval(enemy.yv = -2.5, 2100)})
  
       }
    }

    draw() {   
        this.enemies.forEach( enemy => {
        this.ctx.drawImage(         
            enemy.img, 
            enemy.x,
            enemy.y,    
          )
        }
        )
      }  

    collidesWith(bullet){
        return (this.x < bullet.x + bullet.width &&
               this.x + this.width > bullet.x)
      }

    collidesWithPlayer(player){
        return (this.x < player.x + player.width &&
            this.x + this.width > player.x)
    }
    
    exitsCanvas(){
        return this.x < thix.ctx.canvas.width;
    }
    
    removeIfExitsCanvas(array){
        const newArray = array.filter((value, index, arr) => {
            return value.x > 0 - value.width
        })
        return newArray
    }

  }
