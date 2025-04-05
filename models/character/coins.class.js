/**
 * Represents a coin status bar in the game.
 * The coin bar visually represents the player's coin collection, using images that change based on the percentage of coins collected.
 */
class Coins extends DrawableObject{
/**
 * The percentage of coins collected, represented as a value between 0 and 100.
 * @type {number}
 */
percentage = 0;

/**
 * Array of image paths representing different stages of the coin status bar.
 * The images are in intervals of 20% coin collection (e.g., 100%, 80%, 60%, etc.).
 * @type {string[]}
 */
IMAGES_COINS =[
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",

];

/**
 * Creates an instance of the Coins class.
 * Initializes the coin bar with the specified position, size, and images.
 */
constructor() {
    super();
    this.x = 10;
    this.y = 90;
    this.width= 200;
    this.height= 40;
    this.loadImages(this.IMAGES_COINS);
    this.setPertange(0);
}

/**
 * Updates the coin bar's percentage and the corresponding image.
 * @param {number} percentage - The new coin percentage (0-100).
 */
setPertange(percentage){
    this.percentage = percentage; //  =>0 5
    let path = this.IMAGES_COINS[this.resolvImageIndex()];
    this.img = this.imageCache[path];

}

/**
 * Resolves the index of the coin bar image based on the current coin percentage.
 * @returns {number} - The index of the image in the `IMAGES_COINS` array.
 */
resolvImageIndex(){
    if(this.percentage >= 90){
        return 5;
    }else if(this.percentage >= 80){
        return 4;
    }else if(this.percentage >= 60){
        return 3;
    }else if(this.percentage >= 40){
        return 2;
    }else if(this.percentage >= 20){
        return 1;
    }else{
        return 0;
    }
}
}