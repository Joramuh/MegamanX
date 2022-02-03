class Bullet {
  constructor(ctx) {
      this.ctx = ctx;
      this.bullets = [];     
    }

    init(){
      this.bullets = []
    }

    move(){
      this.bullets.forEach((shot)=> {
        shot.x += shot.xv
      })
    }

    newBullet(playerX, playerY){
      this.bullets.push(this.spawnNewBullet(playerX, playerY))
    }

    spawnNewBullet(x, y){
      const newBullet = {
        sprite: new Image(),
        x: x+33,
        y: y+28,
        width: 20,
        height: 16,
        xv: 25,
      }
      newBullet.sprite.src = "./images/bullet.png";
      return newBullet
    }

    draw(){
      this.bullets.forEach( shot=>{
        this.ctx.drawImage(
          shot.sprite,
          shot.x,
          shot.y,
          shot.width,
          shot.height
        )
      })   
    }

    collidesWith(enemy){
      let collided = false;
      this.bullets.forEach((bullet) =>{
        if(bullet.x >= enemy.x &&
          bullet.y > enemy.y){
          collided = true;
          let index = this.bullets.indexOf(bullet);
          this.bullets.splice(index,1)
        }
      })
      return collided    
    }

    removeIfExitsCanvas(array) {
      const newArray = array.filter((value, index, arr) => {
          return value.x < this.ctx.canvas.width + value.width
      })
      return newArray
   }
  }

