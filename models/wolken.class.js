class Wolken extends MovableObject {
  y = 0;
  height = 150;
  constructor(imagePath,x) {
    super().loadImage(imagePath);
    this.x = x;
    this.width = 1024;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -400) {
        this.x = 1100;
      }
    }, 1000 / 60);
  }
}
