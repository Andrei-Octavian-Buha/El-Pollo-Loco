
/**
 * Represents an object that can move within the game world. 
 * This class provides methods to apply gravity, check collisions, and handle movement and jumping.
 * It also includes functionality for detecting if the object is hurt and playing animations.
 * 
 * @extends DrawableObject
 */class MovableObject extends DrawableObject {
      /**
     * The speed at which the object moves horizontally.
     * @type {number}
     */

  speed = 0.15;
      /**
     * A flag indicating whether the object is moving in the opposite direction.
     * @type {boolean}
     */

  otherDirection = false;
      /**
     * The vertical speed of the object (used for gravity and jumping).
     * @type {number}
     */
  speedY = 0;

      /**
     * The acceleration applied to the object's speed due to gravity.
     * @type {number}
     */
  acceleration = 2.5;

      /**
     * The health of the object.
     * @type {number}
     */
  health = 100;

      /**
     * The timestamp of the last hit taken by the object.
     * @type {number}
     */
  lastHit = 0;

      /**
     * An object representing the offset values (top, bottom, left, right) for collision detection.
     * @type {Object}
     * @property {number} top - The offset from the top.
     * @property {number} bottom - The offset from the bottom.
     * @property {number} right - The offset from the right.
     * @property {number} left - The offset from the left.
     */
  offset = {
    top:0,
    bottom:0,
    right:0,
    left:0
  }

      /**
     * The game world the object is part of.
     * @type {Object}
     */
  world;

      /**
     * Creates an instance of the `MovableObject` class.
     * 
     * @param {Object} world - The world where the object exists.
     */
  constructor(world) {
    super();
    this.world = world;
  }

    /**
     * Applies gravity to the object, causing it to fall if it is not above the ground.
     * The object's `speedY` is used to determine the fall speed, and the object's position (`y`) is updated accordingly.
     */
  applyGravity() { 
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 30);
  }

    /**
     * Checks if the object is above the ground. 
     * If the object is an instance of `ThrowableObject`, it will always return `true`. 
     * Otherwise, it checks if the object's `y` position is below a certain threshold.
     * 
     * @returns {boolean} - `true` if the object is above the ground, otherwise `false`.
     */
  isAboveGround(){
    if(this instanceof ThrowableObject){
      return true;
    }else{
      return this.y <  224;
    }
  }

  isAboveTheEnemy(mo){
      if(this instanceof ThrowableObject){
        return true;
      }else{
        return this.y + this.height - this.offset.bottom > mo.y + mo.height - mo.offset.top;
      }
  }


      /**
     * Checks if the object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The other object to check for a collision.
     * @returns {boolean} - `true` if the objects are colliding, otherwise `false`.
     */
  isColliding(mo){
    return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left <  mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }                        
  
  isCollidinigFromTop(mo){
    return this.y + this.height - this.offset.bottom < mo.y + mo.height - mo.offset.top;
  }
  /**
   * Moves the object to the right by a certain speed.
   */
  moveRight() {
    if(this.isGameOnPause()){
      return;
    }else{
      this.x += this.speed;
    }
  }

    /**
     * Moves the object to the left by a certain speed.
     */
  moveToLeft() {
    if(this.isGameOnPause()){
      return;
    }else{
      this.x -= this.speed;
    }
  }

    /**
     * Makes the object jump by applying an initial speed in the vertical direction (`speedY`).
     */
  jump(){
    if(this.isGameOnPause()){
      return;
    }else{
      this.speedY = 25;
    }
  }

    /**
     * Plays an animation by cycling through a list of image paths.
     * 
     * @param {string[]} images - An array of image paths to be used for the animation.
     */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    //i = 0, 1, 2, 3, 4, 5, 6, 0, 1,
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }



      /**
     * Checks if the object is hurt, based on the time since the last hit.
     * 
     * @returns {boolean} - `true` if the object was recently hurt (within 0.1 seconds), otherwise `false`.
     */
  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.1;
  }

    /**
     * Causes the object to take damage by updating its health and setting the last hit time.
     */
  hit(){    
    if(this.isGameOnPause()){
      return;
    }else{
      if(this.health < 0){
        this.health = 0;
      }else{
        this.lastHit = new Date().getTime();
      }
    }
  }

    /**
     * Checks if the game is paused by looking at the `gamePaused` flag in the world object.
     * 
     * @returns {boolean} - `true` if the game is paused, otherwise `false`.
     */
  isGameOnPause(){
    if(this.world){
      return this.world.gamePaused;
    }
  }
}