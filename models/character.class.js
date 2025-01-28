class Character extends MovableObject {
  height = 280;
  width = 150;
  y = 140;
  offset = {
    top:170,
    bottom:120,
    right:120,
    left:70
  }
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMP = [
      "img/2_character_pepe/3_jump/J-31.png",
      "img/2_character_pepe/3_jump/J-32.png",
      "img/2_character_pepe/3_jump/J-33.png",
      "img/2_character_pepe/3_jump/J-34.png",
      "img/2_character_pepe/3_jump/J-35.png",
      "img/2_character_pepe/3_jump/J-36.png",
      "img/2_character_pepe/3_jump/J-37.png",
      "img/2_character_pepe/3_jump/J-38.png",
      "img/2_character_pepe/3_jump/J-39.png",
  ];

  speed = 10;
  world;
  health = 100;

  currentImage = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.walk();
    this.applyGravity();
  }

  walk() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.moveRight();
          this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
          this.moveToLeft();
          this.otherDirection = true;
      }
      
      this.world.camera_x = -this.x;

      if (this.world.keyboard.SPACE && !this.isAboveGround()){
          this.jump();
      } 
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
          this.playAnimation(this.IMAGES_JUMP);
      } else {
          if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
              this.playAnimation(this.IMAGES_WALKING);
          }
      }
    }, 50);
  }



}
