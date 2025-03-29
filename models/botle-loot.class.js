
/**
 * Represents a bottle loot object that can be collected in the game.
 * This class handles the animation of the bottle and its properties.
 */
class BotleLoot extends MovableObject{

    /**
   * The x-coordinate of the bottle.
   * @type {number}
   */
  x;

    /**
   * The offset values for the bottle, used for collision detection.
   * @type {Object}
   * @property {number} top - The top offset for collision detection.
   * @property {number} bottom - The bottom offset for collision detection.
   * @property {number} right - The right offset for collision detection.
   * @property {number} left - The left offset for collision detection.
   */
  offset = {
        top:30,
        bottom:30,
        right:30,
        left:30
      };

        /**
   * An array containing the paths to the images used for bottle animation.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
  ];

    /**
   * Creates an instance of the `BotleLoot` class.
   * @param {number} x - The x-coordinate where the bottle is placed in the game world.
   */
    constructor(x) {
        super();
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = 444;
        this.height = 90;
        this.animation();
    }

      /**
   * Starts the bottle's animation by cycling through the bottle images at regular intervals.
   * This method is called in the constructor.
   * @private
   */
    animation(){
      setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE);
      }, 500);
    }
}
