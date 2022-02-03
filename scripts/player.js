class Player {
    constructor(ctx) {
      this.ctx = ctx;
      this.width = 70;     
      this.height = 81;    
      this.x = 100;
      this.y = 300;
      this.xv = 35;
      this.yv = 0;
      this.gravity = 0.7;     
      this.floor = 300;
      this.img = new Image();
      this.img.src = "./images/megaman.png";   
      this.hp = 3;
    }
  
    init(){
      this.x = 100;
      this.y = 300;
      this.xv = 20;
      this.yv = 0;   
      this.gravity = 0.7;
    }
  
    move() {
      this.yv += this.gravity;
      this.y += this.yv;

      if (this.y > this.floor) {
        this.y = this.floor};
      if (this.y < 0){this.y = 0}     
    } 
           
    jump() {        
        this.yv = -15;   
    }

    goLeft(){
      if (this.x <= 0) {this.x = 0}
      else {this.x -=this.xv};
    }

    goRight(){
      if (this.x + this.width >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.width
      } else {this.x += this.xv    
    };
    }
  
    draw() {  
      this.ctx.drawImage(         
          this.img, 
          this.x,
          this.y,    
        );
    }   

    collidesWith(enemy){
      let collided = false;
     if(this.x >= enemy.x){ 
          collided = true;
          }
          return collided

        }
      
      
  }

  /*   ORIGINAL collidesWith  if(this.x >= enemy.x &&
      this.y  >= enemy.y ){ 
        */