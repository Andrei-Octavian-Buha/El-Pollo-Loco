class Chicken extends MovableObject {
  height = 70;
  width = 48;
  y = 346;

  offset = {
    top:65,
    bottom:15,
    right:40,
    left:20
  }
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.45;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveToLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}
