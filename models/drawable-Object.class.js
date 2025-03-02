class DrawableObject{
  y = 300;
  height = 150;
  width = 100;
  img;
  imageCache = [];
  currentImage = 0;

  constructor() {}

  loadImage(path) {
      this.img = new Image();
      this.img.src = path;
  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isDead(){
    return this.health <= 0;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
    
  // drawFrameOffset(ctx) { 
  //   if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CoinsLoot || this instanceof BotleLoot || this instanceof ThrowableObject){
  //       ctx.beginPath();
  //       ctx.lineWidth = "3";
  //       ctx.strokeStyle = 'red'; // Poți schimba culoarea
  //       ctx.rect(this.x + this.offset.left,
  //         this.y + this.offset.top,
  //         this.width - this.offset.right - this.offset.left,
  //         this.height -this.offset.top - this.offset.bottom); // Desenează pătratul în zona de intersecție
  //       ctx.stroke();
  //   }
  // }
}