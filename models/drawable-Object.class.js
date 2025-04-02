/**
 * Represents a drawable object in the game.
 * This class handles the loading and drawing of images, as well as caching images for animation.
 */
class DrawableObject{
    /**
   * The y-coordinate of the drawable object.
   * @type {number}
   */
  y = 300;

    /**
   * The height of the drawable object.
   * @type {number}
   */
  height = 150;

    /**
   * The width of the drawable object.
   * @type {number}
   */
  width = 100;

    /**
   * The image associated with the drawable object.
   * @type {HTMLImageElement}
   */
  img;

    /**
   * A cache for storing multiple images used for animation.
   * @type {Object<string, HTMLImageElement>}
   */
  imageCache = [];

    /**
   * A cache for storing multiple images used for animation.
   * @type {Object<string, HTMLImageElement>}
   */
  currentImage = 0;

    /**
   * Creates an instance of the `DrawableObject` class.
   */
  constructor() {}

    /**
   * Loads an image from the given path and assigns it to the object's `img` property.
   * @param {string} path - The path to the image to be loaded.
   */
  loadImage(path) {
      this.img = new Image();
      this.img.src = path;
  }

    /**
   * Draws the image of the object onto the canvas at its current position.
   * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas where the image will be drawn.
   */
  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // this.drawFrameOffset(ctx);
  }

    /**
   * Checks if the object is "dead" by comparing its health to 0.
   * @returns {boolean} - `true` if the object is dead (health <= 0), `false` otherwise.
   */
  isDead(){
    return this.health <= 0;
  }

    /**
   * Loads multiple images from an array of image paths into the image cache.
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
    
    /**
   * (Optional) Draws a visual frame around the object to help with debugging.
   * This method is currently commented out but is intended for visualizing collision boxes.
   * 
   * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
   */

  drawFrameOffset(ctx) { 
    if(this instanceof Character || this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss || this instanceof CoinsLoot || this instanceof BotleLoot || this instanceof ThrowableObject){
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = 'red'; // Poți schimba culoarea
        ctx.rect(this.x + this.offset.left,
          this.y + this.offset.top,
          this.width - this.offset.right - this.offset.left,
          this.height -this.offset.top - this.offset.bottom); // Desenează pătratul în zona de intersecție
        ctx.stroke();
    }
  }
}