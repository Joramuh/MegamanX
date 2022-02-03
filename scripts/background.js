class Background {              
    constructor(ctx) {
      this.ctx = ctx;
      this.img = new Image()
      this.img.src = "./images/background.png"
      this.img.isReady = false
  
      this.img.onload = () => {
        this.img.isReady = true
      }
      this.x = 0
      this.y = 0 
      this.vx = -0.8     
      this.width = this.ctx.canvas.width
      this.height = this.ctx.canvas.height  
    }

    init(){
        this.x = 0,
        this.y = 0
      }

    move(){
      this.x += this.vx;  
      if (this.x + this.width <= 0) {
        this.x = 0;
      }
    }

    draw(){
        if (this.img.isReady) {
          this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
          );
          this.ctx.drawImage(
            this.img,
            this.x + this.width,
            this.y,
            this.width,
            this.height
          )
        }
      }
  }
  



