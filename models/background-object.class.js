
/**
 * Represents a background object in the game world.
 * This class is used to create and manage the background elements that move along with the game.
 * The background object can be an image that moves horizontally based on the game state.
 */
class BackgroundObject extends MovableObject {
    /**
   * The width of the background object.
   * @type {number}
   */
  width = 1024;

    /**
   * The height of the background object.
   * @type {number}
   */
  height = 576;

    /**
   * The initial x-coordinate of the background object when it is first created.
   * @type {number}
   */
  initialX;

    /**
   * Creates an instance of the `BackgroundObject` class.
   * @param {string} imagePath - The path to the image representing the background object.
   * @param {number} x - The x-coordinate where the background object is placed in the game world.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 576 - this.height;
    this.initialX = x;
  }
}

