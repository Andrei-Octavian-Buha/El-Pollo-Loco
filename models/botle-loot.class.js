class BotleLoot extends MovableObject{
    offset = {
        top:30,
        bottom:30,
        right:30,
        left:30
      }
    constructor(imgpath) {
        super().loadImage(imgpath);
        this.x = 500 + Math.random() * 500;
        this.y = 330;
        this.height = 90;
    }
}