class BackgroundObject extends MovableObject {
  width = 1024;
  height = 576;
  initialX;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 576 - this.height;
    this.initialX = x;
  }
}

