/**
 * Represents the end boss character in the game.
 * The end boss moves, attacks, and reacts to the player's actions based on its health.
 * The end boss also spawns additional enemies as its health decreases.
 */
class Endboss extends MovableObject {
    /**
   * Height of the end boss character.
   * @type {number}
   */
  height = 256;

    /**
   * Width of the end boss character.
   * @type {number}
   */
  width = 128;

    /**
   * Y-coordinate of the end boss position.
   * @type {number}
   */
  y = 255;

    /**
   * X-coordinate of the end boss position.
   * @type {number}
   */
  x;

    /**
   * Reference to the game world the end boss belongs to.
   * @type {Object}
   */
  world;

    /**
   * Health of the end boss.
   * @type {number}
   */
  health = 100 ;

    /**
   * Speed of the end boss.
   * @type {number}
   */
  speed = 5;

   /**
   * Indicates if the end boss is currently attacking.
   * @type {boolean}
   */
  isAttacking = false;

    /**
   * Offset for collision detection of the end boss.
   * @type {Object}
   */
  offset = {
    top:0,
    bottom:0,
    right:0,
    left:0
  }

    /**
   * An object to track the moves performed by the end boss based on health thresholds.
   * @type {Object}
   */
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

    /**
   * Images representing the alert state of the end boss.
   * @type {string[]}
   */
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

   /**
   * Images representing the walking animation of the end boss.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

    /**
   * Images representing the attack animation of the end boss.
   * @type {string[]}
   */
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

    /**
   * Images representing the hurt animation of the end boss.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];


    /**
   * Images representing the dead animation of the end boss.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

    /**
   * Creates an instance of the `Endboss` class.
   * @param {number} x - The x-coordinate of the end boss.
   * @param {Object} world - The world object where the end boss exists.
   */
  constructor(x, world) {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.world = world;
    this.playIntroAnimation();
    this.checkEndBossHealth();
  }

  /**
   * Makes the end boss move towards or away from the player.
   * The movement is based on the x-coordinate of the player.
   */
  animate() {
    setInterval(() => {
      if(!this.isDead()){
        if(this.isGameOnPause()){
          return;
        }else{
            if(this.x > this.world.character.x + 20){
              this.x -= this.speed;
              this.otherDirection = false;
            }else if(this.x < this.world.character.x - 20){
              this.x += this.speed;
              this.otherDirection = true;
            }
          }
        }
    }, 1000 /30);
  }

    /**
   * Plays the intro animation of the end boss.
   * The intro animation displays an alert sequence before starting to walk.
   */
  playIntroAnimation(){
    let i = 0;
    let intv = setInterval(() => { 
      if(i >= this.IMAGES_ALERT.length){
        clearInterval(intv);
        this.endbosAnimation();
        this.animate();
      }else{
        this.playAnimation(this.IMAGES_ALERT);
        i++;
      }
    }, 150);
  }

  endbosAnimation() {
    const animationSpeed = 100;  // Setează viteza animației în milisecunde
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, animationSpeed); // Viteza este controlată de acest interval
  }

  /**
   * Plays the walking animation of the end boss.
   * If the end boss is hurt, the hurt animation is played instead.
   */
  playWalkAnimation(){
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }else{
        this.playAnimation(this.IMAGES_WALKING);
      }
    },334);
  }

    /**
   * Plays the walking animation of the end boss.
   * If the end boss is hurt, the hurt animation is played instead.
   */
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
      }
    }, 1000/30);
  }

    /**
   * Triggers specific attacks or movement actions based on the current health of the end boss.
   * This method is called when the health of the end boss changes.
   */
  endbossAtackMovemet(){ 
      if (this.health == 90 && this.moves[9] == false) {
        this.moves[9] = true;
      }else if (this.health == 80 && this.moves[8] == false) {
        this.spawnEnemies();
        this.moves[8] = true;
      }else if (this.health == 70 && this.moves[7] == false) {
        this.moves[7] = true;
      }else if (this.health == 60 && this.moves[6] == false) {
        this.spawnEnemies();
        this.moves[6] = true;
      }else if (this.health == 50 && this.moves[5] == false) {
        this.spawnEnemies();
        this.moves[5] = true;
      }else if (this.health == 40 && this.moves[4] == false) {
        this.spawnEnemies();
        this.moves[4] = true;
      }else if (this.health == 30 && this.moves[3] == false) {
        this.moves[3] = true;
      }else if (this.health == 20 && this.moves[2] == false) {
        this.health = 30;
        this.moves[2] = true;
      }else if (this.health >= 1 & this.health <=10) {
      
      }
    }



    /**
   * Spawns a random number of chickens at a random x position as additional enemies.
   */
  spawnEnemies(){
    let iEnemies = Math.floor(Math.random() * 3) +1;
    let xEnemies = Math.floor(Math.random() * 101) + 600;
    let xForNewEnemies = this.x + xEnemies;
    for (let i = 0; i <= iEnemies;  i++) {
      this.world.level.enemies.push(new Chicken(xForNewEnemies, this.world));
    }
  }

    /**
   * Checks if the end boss is colliding with the player character.
   * @returns {boolean} - True if the end boss is colliding with the player, false otherwise.
   */
  isColliding(){
    return  this.x < (this.world.character.x + this.world.character.width - this.world.character.offset.right);
  }
}