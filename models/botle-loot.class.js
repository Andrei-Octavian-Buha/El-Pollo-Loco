class BotleLoot extends MovableObject{
  x;
  offset = {
        top:30,
        bottom:30,
        right:30,
        left:30
      };

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
  ];
    constructor(x) {
        super();
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = 444;
        this.height = 90;
        this.animation();
    }
    animation(){
      setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE);
      }, 500);
    }
}
