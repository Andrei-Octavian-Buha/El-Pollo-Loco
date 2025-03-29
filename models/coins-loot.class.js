
/**
 * Represents a coin loot object that can be collected in the game.
 * This class handles the animation of the coin and its properties.
 */
class CoinsLoot extends MovableObject{
    /**
   * The x-coordinate of the coin.
   * @type {number}
   */
  x;

    /**
   * The y-coordinate of the coin.
   * @type {number}
   */
  y;

    /**
   * The offset values for the coin, used for collision detection.
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
   * An array containing the paths to the images used for coin animation.
   * @type {string[]}
   */
  IMAGES_COINS = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];


    /**
   * Creates an instance of the `CoinsLoot` class.
   * @param {number} x - The x-coordinate where the coin is placed in the game world.
   * @param {number} y - The y-coordinate where the coin is placed in the game world.
   */
    constructor(x, y) {
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.animation();
    }

      /**
   * Starts the coin's animation by cycling through the coin images at regular intervals.
   * This method is called in the constructor.
   * @private
   */
    animation(){
      setInterval(() => {
        this.playAnimation(this.IMAGES_COINS);
      }, 500);
    }
}

