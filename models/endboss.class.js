class Endboss extends MovableObject {
  height = 256;
  width = 128;
  y = 240;
  x;
  world;
  health = 100;
  speed = 5;
  isAttacking = false;

  offset = {
    top:0,
    bottom:0,
    right:0,
    left:0
  }
  moves = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  }
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png"
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png"
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

  constructor(x, world) {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.world = world;
    this.walk(); 
    this.changesize();
    this.checkEndBossHealth();
    this.playWalkAnimation();
  }

  changesize(){
    setInterval(() => {
      this.width = 40;
      this.height= 70;
      this.y = 420;
      this.world.collisionWithEndBoss = true;
      setTimeout(() => {
        this.width = 128;
        this.height = 256;
        this.y = 240;
        this.world.collisionWithEndBoss = false;
      },2000 );
    }, 5000);
  }

  walk() {
    setInterval(() => {
      if(this.isAttacking){
        return;
      }else {
        if(this.x > this.world.character.x + 20){
          this.x -= this.speed;
          this.otherDirection = false;
        }else if(this.x < this.world.character.x - 20){
          this.x += this.speed;
          this.otherDirection = true;
        }
      }
    }, 1000/30);
  }

  playWalkAnimation(){
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }else{
        this.playAnimation(this.IMAGES_WALKING);
      }
    },334);
  }

  checkEndBossHealth() {
    let lastHealth = this.health;
    let intv = setInterval(() => {
      if (lastHealth != this.health) {
        this.endbossAtackMovemet();
        lastHealth = this.health;
      }
      if (this.health <= 0) {
        clearInterval(intv);
        this.playAnimation(this.IMAGES_DEAD);
        this.world.endgame = false;
        this.world.enemies = [];
      }
    }, 1000/30);
  }

  endbossAtackMovemet(){ 
      if (this.health == 90 && this.moves[9] == false) {
        this.isHealth90();
        this.spawnEnemies();
      }else if (this.health == 70 && this.moves[8] == false) {
        this.spawnEnemies()
      }else if (this.health == 70 && this.moves[7] == false) {
        this.isHealth70();
      }else if (this.health == 70 && this.moves[6] == false) {
        this.spawnEnemies()
      }else if (this.health == 70 && this.moves[5] == false) {
        this.spawnEnemies()
      }else if (this.health == 70 && this.moves[4] == false) {
        this.spawnEnemies()
      }else if (this.health == 70 && this.moves[3] == false) {
        this.spawnEnemies()
      }else if (this.health == 20 && this.moves[2] == false) {
        this.health = 30;
        this.moves[2] = true;
      }else if (this.health >= 1 & this.health <=10) {
      console.log(`Endboss health is ${this.health}`);
      }
    }

  isHealth90(){
    this.speed = 10;
    let hpAttack = setInterval(() => {
      if(this.x < (this.world.character.x + this.world.character.width - this.world.character.offset.right)){
        this.isAttacking == true;
        this.moves[9] == true;
        this.x += 500;
        setTimeout(() => {
          this.speed = 0.5;
        }, 3000);
        this.speed = 5;
        clearInterval(hpAttack);
        }
    }, 1000/30);
  }

  spawnEnemies(){
    let iEnemies = Math.floor(Math.random() * 10) +1;
    let xEnemies = Math.floor(Math.random() * 101) +200;
    this.x += xEnemies
    for (let i = 0; i <= iEnemies;  i++) {
      this.world.level.enemies.push(new Chicken(430,this.x,this.world));
    }
  }

  isHealth70(){
      this.speed = 10;
      let hpAttack = setInterval(() => {
      if(this.isColliding()){
        this.isAttacking == true;
        this.moves[7] == true;
        this.x += 300;
        setTimeout(() => {
          this.speed = 0.5;
        }, 5000);
        this.speed = 5;
        clearInterval(hpAttack);
      }
    }, 1000/30);
  }

  isColliding(){
    return  this.x < (this.world.character.x + this.world.character.width - this.world.character.offset.right);
  }
}