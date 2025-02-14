class EnemyBar extends DrawableObject{
    percentage = 100;

    IMAGES_BOTTLE =[
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];
    constructor(health) {
      super();
      this.percentage = health;
        this.x = 700;
        this.y = 50;
        this.width= 200;
        this.height= 40;
        this.loadImage("img/7_statusbars/2_statusbar_endboss/blue/blue100.png");
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPertange(100);
    }

    setPertange(percentage){
        this.percentage = percentage; //  =>0 5
        let path = this.IMAGES_BOTTLE[this.resolvII()];
        this.img = this.imageCache[path];
    }

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