/**
 * Represents a status bar that displays the amount of bottle loot the player has.
 * The bar updates based on the percentage of available bottles.
 */
class BottleLootBar extends DrawableObject{

      /**
   * The current percentage of bottle loot available.
   * @type {number}
   */
    percentage = 1;

      /**
   * Array of image paths representing the bottle loot status bar at various levels (0%, 20%, 40%, etc.).
   * @type {string[]}
   */
    IMAGES_BOTTLE =[
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ];

      /**
   * Creates an instance of the BottleLootBar class.
   * Initializes the bottle loot bar at the specified position and size.
   * Loads the appropriate images for the bottle loot bar and sets the initial percentage.
   */
    constructor() {
        super();
        this.x = 10;
        this.y = 50;
        this.width= 200;
        this.height= 40;
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPertange(this.bo);
    }

      /**
   * Sets the percentage of the bottle loot bar.
   * Updates the bar's image based on the current percentage.
   * @param {number} percentage - The percentage (0-100) of the bottle loot available.
   */
    setPertange(percentage){
        this.percentage = percentage; //  =>0 5
        let path = this.IMAGES_BOTTLE[this.resolvImageIndex()];
        this.img = this.imageCache[path];
    }

      /**
   * Resolves the appropriate image index based on the current bottle loot percentage.
   * @returns {number} The index of the image that corresponds to the current percentage.
   */
    resolvImageIndex(){
        if(this.percentage >= 80){
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