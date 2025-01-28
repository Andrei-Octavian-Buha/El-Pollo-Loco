class StatusBar extends DrawableObject{
    percentage = 100;
IMAGES_HEATH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
]
    constructor() {
        super();
        this.x = 50;
        this.y = 20;
        this.width= 250;
        this.height= 40;
        this.loadImages(this.IMAGES_HEATH);
        this.setPertange(100);
    }
    setPertange(percentage){
        this.percentage = percentage; //  =>0 5
        let path = this.IMAGES_HEATH[this.resolvImageIndex()];
        this.img = this.imageCache[path];

    }
    resolvImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage == 80){
            return 4;
        }else if(this.percentage == 60){
            return 3;
        }else if(this.percentage == 40){
            return 2;
        }else if(this.percentage == 20){
            return 1;
        }else{
            return 0;
        }
    }
}