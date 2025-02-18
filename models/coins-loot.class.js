class CoinsLoot extends MovableObject{
  x;
  y;
  offset = {
        top:30,
        bottom:30,
        right:30,
        left:30
      };

  IMAGES_COINS = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];

    constructor(x, y) {
        super();
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.animation();
    }
    animation(){
      setInterval(() => {
        this.playAnimation(this.IMAGES_COINS);
      }, 500);
    }
}

