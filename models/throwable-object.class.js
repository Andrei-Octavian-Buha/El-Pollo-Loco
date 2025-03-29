/**
 * Represents a throwable object that moves on the screen and can perform rotation and splash animations.
 * The class extends the `MovableObject` class and includes specific functionality for handling throwable objects.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

        /**
     * Defines the offset for the throwable object.
     * @type {Object}
     * @property {number} top - The distance from the top of the object.
     * @property {number} bottom - The distance from the bottom of the object.
     * @property {number} right - The distance from the right of the object.
     * @property {number} left - The distance from the left of the object.
     */
    offset = {
        top:20,
        bottom:20,
        right:10,
        left:10,
      }

          /**
     * The distance the object will travel.
     * @type {number}
     */
    distance = 0;

    /**
     * Array of images for the bottle rotation animation.
     * @type {string[]}
     */
    IMAGES_BOTTLE_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    /**
     * Array of images for the bottle splash animation.
     * @type {string[]}
     */
    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];
    
        /**
     * Creates a throwable object and initializes its properties.
     * 
     * @param {number} x - The position on the X axis where the object is located.
     * @param {number} y - The position on the Y axis where the object is located.
     * @param {boolean} otherDirection - The direction in which the object moves (left or right).
     * @param {number} distance - The distance the object will travel.
     */
    constructor(x, y, otherDirection, distance) {
        super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.distance = distance;
        this.speedY= 20;
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 80;
        this.otherDirection = otherDirection;
        this.throw(this.x, this.y , this.otherDirection, this.distance);
    }

        /**
     * Throws the object in a given direction and with a specified distance.
     * 
     * @param {number} x - The position on the X axis where the object is thrown from.
     * @param {number} y - The position on the Y axis where the object is thrown from.
     * @param {boolean} otherDirection - The direction in which the object moves (left or right).
     * @param {number} distance - The distance the object will travel.
     */
    throw(x, y, otherDirection, distance) {
        this.distance = distance;
        this.otherDirection = otherDirection;
        this.x = x;
        this.y = y;
        this.speedY = this.distance;    
        this.applyGravity();
        setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            if (!this.otherDirection) {
            this.x += this.distance;
            } else {
            this.x -= this.distance;
            }
        }, 25);
    }
}