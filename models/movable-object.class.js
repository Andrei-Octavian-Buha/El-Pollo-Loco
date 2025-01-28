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
