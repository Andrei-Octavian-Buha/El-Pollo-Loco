class MovableObject {
  x = 150;
  y = 300;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

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
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image.png ', 'img/image2.png']
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
  drawFrameOffset(ctx){
    if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = 'red';
      ctx.rect(this.x + this.width - this.offset.right,
          this.y + this.height - this.offset.top, 
          this.width - this.offset.left,
          this.height - this.offset.bottom);
      ctx.stroke();
    }
  }
  // character.isColliding(chicken);
  isColliding(mo){
    return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height -this.offset.top > mo.y + mo.offset.top &&
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
    let i = this.currentImage % this.IMAGES_WALKING.length;
    //i = 0, 1, 2, 3, 4, 5, 6, 0, 1,
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


}
