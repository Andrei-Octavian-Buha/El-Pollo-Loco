class ThrowableObject extends MovableObject {
    offset = {
        top:20,
        bottom:20,
        right:10,
        left:10,
      }
    IMAGES_BOTTLE_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ]
    IMAGES_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    constructor(x, y, otherDirection) {
        super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.speedY= 30;
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 80;
        this.otherDirection = otherDirection;
        this.throw(this.x, this.y , this.otherDirection);
    }

    throw(x, y, otherDirection) {
        this.otherDirection = otherDirection;
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            if (!this.otherDirection) {
            this.x += 20;
            } else {
            this.x -= 20;
            }
        }, 25);
    }
}