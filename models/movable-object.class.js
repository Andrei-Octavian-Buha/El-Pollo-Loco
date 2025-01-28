class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  health = 100;
  lastHit = 0;
  offset = {
    top:20,
    bottom:20,
    right:20,
    left:20
  }

  applyGravity(){
    setInterval(()=>{
      if(this.isAboveGround() ||this.speedY > 0){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000/25)
  }

  isAboveGround(){
    return this.y < 140;
  }

  drawFrame(ctx){
    if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  drawFrameOffset(ctx) { 
    if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = 'red'; // Poți schimba culoarea
        ctx.rect(this.x + this.offset.left,
          this.y + this.offset.top,
          this.width - this.offset.right - this.offset.left,
          this.height -this.offset.top - this.offset.bottom); // Desenează pătratul în zona de intersecție
        ctx.stroke();
    }
  }
  // character.isColliding(chicken);
  isColliding(mo){
    return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left <  mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveToLeft() {
    this.x -= this.speed;
  }

  jump(){
    this.speedY = 30;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    //i = 0, 1, 2, 3, 4, 5, 6, 0, 1,
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  isDead(){
    return this.health == 0;
  }

  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  hit(){
    this.health -= 5;
    if(this.health < 0){
      this.health = 0;
    }else{
      this.lastHit = new Date().getTime();
    }
  }
}
