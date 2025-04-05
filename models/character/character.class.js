/**
 * Represents a character (player) in the game.
 * The character can perform actions like walking, jumping, and throwing bottles,
 * as well as managing health, loot, and animations.
 */
class Character extends MovableObject {
    /**
   * The height of the character.
   * @type {number}
   */
  height = 280;

    /**
   * The width of the character.
   * @type {number}
   */
  width = 150;

    /**
   * The x-coordinate of the character's position.
   * @type {number}
   */
  x = 350;

    /**
   * The y-coordinate of the character's position.
   * @type {number}
   */
  y= 224;

    /**
   * The world the character is in.
   * @type {Object}
   */
  world;

    /**
   * The cooldown state for the character's actions.
   * @type {boolean}
   */
  cooldown = false;

    /**
   * The movement speed of the character.
   * @type {number}
   */
  speed = 10;

    /**
   * The health of the character.
   * @type {number}
   */
  health = 100;

    /**
   * The number of bottles the character has.
   * @type {number}
   */
  botleLoot = 1;

    /**
   * The number of coins the character has.
   * @type {number}
   */
  coinsLoot = 0;

    /**
   * The current image index for animation purposes.
   * @type {number}
   */
  currentImage = 0;

  isIdle = false;

  /**
   * The offset values for the character's collision area.
   * @type {Object}
   */
  offset = {
    top:120,
    bottom:15,
    right: 65,
    left:45,
  }

  lastMovementTime;

    /**
   * Array of image paths representing the character's idle animation.
   * @type {string[]}
   */
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

  
    /**
   * Array of image paths representing the character's idle animation.
   * @type {string[]}
   */
    IMAGES_LONG_IDLE = [
      "img/2_character_pepe/1_idle/long_idle/I-11.png",
      "img/2_character_pepe/1_idle/long_idle/I-12.png",
      "img/2_character_pepe/1_idle/long_idle/I-13.png",
      "img/2_character_pepe/1_idle/long_idle/I-14.png",
      "img/2_character_pepe/1_idle/long_idle/I-15.png",
      "img/2_character_pepe/1_idle/long_idle/I-16.png",
      "img/2_character_pepe/1_idle/long_idle/I-17.png",
      "img/2_character_pepe/1_idle/long_idle/I-18.png",
      "img/2_character_pepe/1_idle/long_idle/I-19.png",
      "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
   * Array of image paths representing the character's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

    /**
   * Array of image paths representing the character's hurt animation.
   * @type {string[]}
   */
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

    /**
   * Array of image paths representing the character's death animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

    /**
   * Array of image paths representing the character's death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates an instance of the Character class.
   * Initializes the character with idle, walking, jumping, hurt, and death animations.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.controls();
    this.applyGravity();
    this.characterAnimation();
    this.lastMovementTime = Date.now();
  }

    /**
   * Handles the character's animations, movement, and interactions with the game world.
   * The character can walk, jump, throw bottles, and respond to keyboard input.
   */
  controls() {
    setInterval(() => {
      this.world.camera_x = -this.x + 200;
      if (!this.isDead() && !this.isGameOnPause()) {
        this.handleMovement();
        this.handleThrowing();
      }
    }, 1000/30);
  }


  handleMovement() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.world.sounds.playJump();
      this.lastMovementTime = Date.now();
    } else if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {  
      this.moveRight();
      this.otherDirection = false;
      this.playMovementSound();
    } else if (this.world.keyboard.LEFT && this.x > 150) {
      this.moveToLeft();
      this.otherDirection = true;
      this.playMovementSound();
    }
  }

  handleThrowing() {
    if (this.botleLoot > 0 && !this.world.cooldown) {
      if (this.world.keyboard.D) {
        this.world.checkInterval(300);
        this.world.throwBottle(20);
        this.botleLoot -=  1;
        this.world.statusBar[1].setPertange(this.world.character.botleLoot);
      } else if (this.world.keyboard.S) {
        this.world.checkInterval(300);
        this.world.throwBottle(15);
        this.botleLoot -=  1;              
        this.world.statusBar[1].setPertange(this.world.character.botleLoot);
      } else if (this.world.keyboard.A) {
        this.world.checkInterval(300);
        this.world.throwBottle(10);
        this.botleLoot -=  1;
        this.world.statusBar[1].setPertange(this.world.character.botleLoot);
      }
    }
  }

  playMovementSound() {
    if (!this.world.cooldown && !this.isAboveGround()) {
      this.world.sounds.playWalk();
      this.world.checkInterval(350);
      this.lastMovementTime = Date.now();
    }
  }


  characterAnimation() {
    const animationSpeed = 100;  // Setează viteza animației în milisecunde
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMP);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playIdleAnimation();
      }
    }, animationSpeed); // Viteza este controlată de acest interval
  }

playIdleAnimation() {
  const idleTime = Date.now() - this.lastMovementTime;
  if (idleTime > 5000) {
    this.playAnimation(this.IMAGES_LONG_IDLE);
  } else {
    this.playAnimation(this.IMAGES_IDLE);
  }
}

}
