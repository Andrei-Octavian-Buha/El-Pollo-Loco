class Chicken extends MovableObject {
  height = 70;
  width = 48;
  y;
  health = 100;
  world;
  offset = {
    top:10,
    bottom:10,
    right:20,
    left:10 
  }

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(y, x) {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.y = y;
    this.x = x + 500 + Math.random() * 500;
    this.speed = 2 + Math.random() * 0.45;
    this.animate();  
  
  }

  animate() {
    setInterval(() => {
      if(!this.isDead()){
        this.moveToLeft();
      }
    }, 1000 / 25);
    setInterval(() => {
      if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
      }else{
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000/ 10  / this.speed);
  }
} 

 
 