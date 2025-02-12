class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  health = 100;
  lastHit = 0;


  offset = {
    top:0,
    bottom:0,
    right:0,
    left:0
  }
  
  world;

  constructor(world) {
    super();
    this.world = world;
  }

  applyGravity() { 
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 30);
  }

  isAboveGround(){
    if(this instanceof ThrowableObject){
      return true;
    }else{
      return this.y <  224;
    }
  }

  isColliding(mo){
    return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left <  mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  isCollidingFromBottomtoTop(mo){
    return this.y + this.height - this.offset.bottom > mo.y + mo.offset.top&&
            this.x + this.width - this.offset.right > mo.x;
  }

  moveRight() {
    if(this.isGameOnPause()){
      return;
    }else{
      this.x += this.speed;
    }
  }

  moveToLeft() {
    if(this.isGameOnPause()){
      return;
    }else{
      this.x -= this.speed;
    }
  }

  jump(){
    if(this.isGameOnPause()){
      return;
    }else{
      this.speedY = 25;
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    //i = 0, 1, 2, 3, 4, 5, 6, 0, 1,
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  
  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.1;
  }

  hit(){    
    if(this.isGameOnPause()){
      return;
    }else{
      this.health -= 2;
      if(this.health < 0){
        this.health = 0;
      }else{
        this.lastHit = new Date().getTime();
      }
    }
  }

  isGameOnPause(){
    if(this.world){
      return this.world.gamePaused;
    }
  }
}