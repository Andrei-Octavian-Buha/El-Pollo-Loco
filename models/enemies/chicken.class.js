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

  constructor(y, x, world) {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);  
    this.y = y;
    this.world = world;
    this.x = x + 700 + Math.random() * 700;
    this.speed = 5 + Math.random() * 1.45;
    this.animate();  
  }

  animate() {
    setInterval(() => {
      if(!this.isDead()){
        if(this.isGameOnPause()){
          return;
        }
        else{
          this.moveToLeft();
        }
      }
    }, 1000 /30);
    setInterval(() => {
      if(this.isDead()){
        this.playAnimation(this.IMAGES_DEAD);
      }else{
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000/ 10  / this.speed);
  }
}

 
 