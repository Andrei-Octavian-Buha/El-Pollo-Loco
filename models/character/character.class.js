class Character extends MovableObject {
  height = 280;
  width = 150;
  x = 350;
  y= 224;
  world;
  cooldown = false;

  speed = 10;
  health = 100;
  botleLoot = 0;
  coinsLoot = 0;
  currentImage = 0;


  offset = {
    top:120,
    bottom:15,
    right: 55,
    left:45,
  }

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",

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

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];


  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.world.camera_x = -this.x + 200;
      if(!this.isDead()){
        if(this.isGameOnPause()){
          return;
        }else{
        if ((
              (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && 
              this.world.keyboard.SPACE && !this.isAboveGround()) || 
              this.world.keyboard.SPACE && !this.isAboveGround()) {
                  this.jump();
        }
        else if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x)
        {
          this.moveRight();
          this.otherDirection = false;
        }
        else if (this.world.keyboard.LEFT && this.x > 150) {
          this.moveToLeft();
          this.otherDirection = true;
        }else if(this.botleLoot > 0 && !this.world.cooldown){
          if(this.world.keyboard.D ){
            this.world.checkInterval();
            this.world.throwBottle(20);
            this.botleLoot -=  1;
            console.log(`Mai ai ${this.botleLoot}`);
            this.world.statusBar[1].setPertange(this.world.character.botleLoot);
          }else if(this.world.keyboard.S ){
            this.world.checkInterval();
            this.world.throwBottle(15);
            this.botleLoot -=  1;              
            console.log(`Mai ai ${this.botleLoot}`);
            this.world.statusBar[1].setPertange(this.world.character.botleLoot);
          }else if(this.world.keyboard.A ){
            this.world.checkInterval();
            this.world.throwBottle(10);
            this.botleLoot -=  1;
            console.log(`Mai ai ${this.botleLoot}`);
            this.world.statusBar[1].setPertange(this.world.character.botleLoot);
          }
        }
      }
    }
    }, 1000/30);
    
    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 333);

    this.fastAnimation();
  }

  fastAnimation(){
    setInterval(() => {
      if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
        this.playAnimation(this.IMAGES_WALKING);
        // this.sound.walk.play();
      }else if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
      }else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 150);
    setInterval(() => {
      if(this.isAboveGround()){
        this.playAnimation(this.IMAGES_JUMP);
      }
    }, 200);
  }
}
