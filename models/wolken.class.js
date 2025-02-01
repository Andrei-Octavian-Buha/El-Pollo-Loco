class Wolken extends MovableObject {
  y = 0;
  height = 150;
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = 0 + Math.random(1024) * 500;
    this.width = 700;
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
