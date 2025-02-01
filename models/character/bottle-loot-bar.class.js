class BottleLootBar extends DrawableObject{
    percentage = 0;

    IMAGES_BOTTLE =[
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ];
    constructor() {
        super();
        this.x = 10;
        this.y = 50;
        this.width= 200;
        this.height= 40;
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPertange(this.bo);
    }

    setPertange(percentage){
        this.percentage = percentage; //  =>0 5
        let path = this.IMAGES_BOTTLE[this.resolvImageIndex()];
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