/**
 * Represents a health bar for the enemy in the game.
 * This class is used to visually display the health of the enemy (e.g., Endboss).
 */
class EnemyBar extends DrawableObject{
      /**
   * The current health percentage of the enemy.
   * @type {number}
   */
    percentage = 100;

      /**
   * The images for the health bar in different health percentage states.
   * These images visually represent the health level from full (100%) to empty (0%).
   * @type {string[]}
   */
    IMAGES_BOTTLE =[
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

      /**
   * Creates an instance of the `EnemyBar` class.
   * @param {number} health - The initial health of the enemy, which will set the health bar's percentage.
   */
    constructor(health) {
      super();
      this.percentage = health;
        this.x = 750;
        this.y = 0;
        this.width= 256;
        this.height= 64;
        this.loadImage("img/7_statusbars/2_statusbar_endboss/blue/blue100.png");
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPertange(100);
    }

      /**
   * Sets the health percentage and updates the health bar image.
   * @param {number} percentage - The health percentage to be set (0 to 100).
   */
    setPertange(percentage){
        this.percentage = percentage; //  =>0 5
        let path = this.IMAGES_BOTTLE[this.resolvII()];
        this.img = this.imageCache[path];
    }

      /**
   * Resolves the correct image index based on the current health percentage.
   * @returns {number} The index for the health bar image to be displayed.
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