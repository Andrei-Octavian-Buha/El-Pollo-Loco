/**
 * Represents a health bar in the game.
 * The health bar visually represents the player's health using images that change based on the percentage of health remaining.
 */
class HealthBar extends DrawableObject{

    /**
 * The percentage of health remaining, represented as a value between 0 and 100.
 * @type {number}
 */
percentage = 100;

  /**
   * Array of image paths representing different stages of the health bar.
   * The images are in intervals of 20% health (e.g., 100%, 80%, 60%, etc.).
   * @type {string[]}
   */
IMAGES_HEATH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
];

  /**
   * Creates an instance of the HealthBar class.
   * Initializes the health bar with the specified position, size, and images.
   */
    constructor() {
        super();
        this.x = 10;
        this.y = 10;
        this.width= 200;
        this.height= 40;
        this.loadImages(this.IMAGES_HEATH);
        this.setPertange(100); 
    }

      /**
   * Updates the health bar's percentage and the corresponding image.
   * @param {number} percentage - The new health percentage (0-100).
   */
    setPertange(percentage){
        this.percentage = percentage; //  =>0 5
        let path = this.IMAGES_HEATH[this.resolvII()];
        this.img = this.imageCache[path];

    }
    
      /**
   * Resolves the index of the health bar image based on the current health percentage.
   * @returns {number} - The index of the image in the `IMAGES_HEATH` array.
   */
    resolvII(){
        if(this.percentage >= 80 && this.percentage <= 100){
            return 5;
        }else if(this.percentage >= 60 && this.percentage <= 80){
            return 4;
        }else if(this.percentage >= 40 && this.percentage <= 60){
            return 3;
        }else if(this.percentage >= 20 && this.percentage <= 40){
            return 2;
        }else if(this.percentage >= 1 && this.percentage <= 20){
            return 1;
        }else{
            return 0;
        }
    }
}