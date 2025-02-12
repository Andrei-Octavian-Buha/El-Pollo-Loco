class Endboss extends MovableObject {
  height = 256;
  width = 128;
  y = 170;
  x;
  world

  offset = {
    top:0,
    bottom:0,
    right:0,
    left:0
  }
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor(x, world) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.speed = 0.5;
    this.world = world;
    this.walk();

  }
  walk() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }

  moveToBattelGround(){
    setInterval(() => {
      let distance = Math.sqrt(Math.pow(this.world.charater.x - this.x, 2));
      console.log(distance);
    }, 1000 / 30);
  }
}