class Coins extends DrawableObject{
percentage = 0;

IMAGES_COINS =[
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",

];
constructor() {
    super();
    this.x = 10;
    this.y = 90;
    this.width= 200;
    this.height= 40;
    this.loadImages(this.IMAGES_COINS);
    this.setPertange(60);
}

setPertange(percentage){
    this.percentage = percentage; //  =>0 5
    let path = this.IMAGES_COINS[this.resolvImageIndex()];
    this.img = this.imageCache[path];

}
resolvImageIndex(){
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