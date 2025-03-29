
/**
 * Represents a cloud object in the game world that moves horizontally.
 * @extends MovableObject
 */
class Wolken extends MovableObject {
    /** @type {number} Vertical position of the cloud (always 0). */
  y = 0;
    /** @type {number} Height of the cloud. */
  height = 150;

    /**
   * Creates a new cloud object.
   * @param {string} imagePath - Path to the cloud image.
   * @param {number} x - Initial x-coordinate of the cloud.
   */
  constructor(imagePath,x) {
    super().loadImage(imagePath);
    this.x = x;
    this.width = 1024;
    this.animate();
  }

  /**
   * Animates the cloud's horizontal movement.
   * Cloud loops from right to left when it goes off-screen.
   */
  animate() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -400) {
        this.x = 1100;
      }
    }, 1000 / 60);
  }
}
