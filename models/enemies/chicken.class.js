/**
 * Represents a Chicken enemy in the game.
 * The chicken moves from right to left and displays different animations for walking and death.
 */
class Chicken extends MovableObject {
    /**
   * The height of the chicken.
   * @type {number}
   */
  height = 70;

    /**
   * The width of the chicken.
   * @type {number}
   */
  width = 48;

    /**
   * The y-coordinate of the chicken.
   * @type {number}
   */
  y = 430;

    /**
   * The health of the chicken.
   * @type {number}
   */
  health = 100;

    /**
   * The world object that the chicken belongs to.
   * @type {Object}
   */
  world;

    /**
   * Offset values for collision detection and positioning.
   * @type {Object}
   */
  offset = {
    top:10,
    bottom:10,
    right:20,
    left:10 
  }


    /**
   * Array of image paths for the chicken's walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

    /**
   * Array of image paths for the chicken's death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    /**
   * Creates an instance of the Chicken class.
   * @param {number} y - The y-coordinate of the chicken.
   * @param {number} x - The x-coordinate of the chicken.
   * @param {Object} world - The world object the chicken belongs to.
   */
  constructor(x, world) {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);  
    this.world = world;
    this.x = x + 700 + Math.random() * 700;
    this.speed = 5 + Math.random() * 1.45;
    this.animate();  
  }

    /**
   * Animates the chicken by updating its movement and animation based on whether it's dead or alive.
   */
  animate() {
    setInterval(() => {
      if(!this.isDead()){
        if(this.isGameOnPause()){
          return;
        }
        else{
          this.moveToLeft();
        }
      }
    }, 1000 /30);
    setInterval(() => {
      if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
      }else{
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 334);
  }
}

 
 