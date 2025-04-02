/**
 * Represents the game world containing characters, objects, and game logic.
 */
class World {
/** 
 *  The main character of the game. */
character = new Character();

mobj = new MovableObject();

level = level1;

canvas;
/** 
 * The canvas element for rendering the game.
 *  */
ctx;
/** 
 * The keyboard object for handling user input.
 *  */
keyboard;
/** 
 * The x-coordinate of the camera. 
 * */
camera_x = 350;
/** 
 * An array of status bar objects. */
statusBar = [new HealthBar(), new BottleLootBar(), new Coins()];
/** 
 * An array of enemy objects. */
gamePaused = true;
/** 
 * The UI object for managing the user interface. */
ui = new UI();
/** 
 * An array of throwable objects (bottles). */
botles = [new ThrowableObject()];
/** 
 * A flag indicating whether the game is in cooldown state. */
sounds = new Sounds();
/** 
 *  A flag indicating whether the game is over. */
cooldown = false;
/** 
 * A flag indicating whether the player has lost the game. */
gameOver = false;
/** 
 * A flag indicating whether the player has won the game. */
youLose = false;
/** 
 * A flag indicating whether the game is in a paused state. */
collisionWithEndBoss = false;


/**
 * Creates a new World instance.
 * @param {HTMLCanvasElement} canvas - The game canvas.
 * @param {Keyboard} keyboard - The keyboard input handler.
 */
constructor(canvas, keyboard) {
  this.ctx = canvas.getContext("2d");
  this.canvas = canvas;
  this.keyboard = keyboard;
    this.setWorld(); 
    this.draw();
}

/**
 * Adds an enemy health bar to the status bar array (testing purposes).
 */
testLevelToWorld(){
  this.statusBar.push(new EnemyBar());
}

/**
 * Sets the world reference for the character, level, enemies, and UI.
 */
setWorld() {
  this.character.world = this;
  this.level.world = this;
  this.level.enemies.forEach(enemy => enemy.world = this);
  this.mobj.world = this;
  this.ui.world = this;
}

/**
 * Checks if the character collects coins and updates the status bar.
 */
checkCoinsLoot(){
  this.level.coins.forEach((coin, coinIndex) => {
    if(this.character.isColliding(coin)){
      this.character.coinsLoot += 2;
      this.statusBar[2].setPertange(this.character.coinsLoot);
      this.level.coins.splice(coinIndex,1);
      this.sounds.playCollectBottle(); 
    }
  });
}

/**
 * Checks if the character collects bottles and updates the status bar.
 */
checkBotleLoot(){
  this.level.loot.forEach((botle, bottleIndex )=>{
    if(this.character.isColliding(botle)){
      this.character.botleLoot += 10;
      this.statusBar[1].setPertange(this.character.botleLoot);
      this.level.loot.splice(bottleIndex,1);
      this.sounds.playCollectBottle();
    }
  });
}

/**
 * Checks collisions between thrown bottles and enemies.
 */
checkBottleCollision() {
  this.botles.forEach((bottle, bottleIndex) => {
    this.level.enemies.forEach((enemy) => {
      if (bottle.isColliding(enemy)) {
        this.sounds.playChickenDamage();
            enemy.health -= 100;
            this.botles.splice(bottleIndex, 1);
          }
        });
      });
}

/**
 * Checks collisions between thrown bottles and the end boss.
 */
checkBottleEndboossCollision() {
  this.botles.forEach((bottle, bottleIndex) => {
    this.level.endbosss.forEach((enemy) => {
      if (bottle.isColliding(enemy)) {
        this.sounds.playChickenDamage();
        if(enemy.health > 0){
          enemy.hit();
          enemy.health -= 10;
          this.statusBar[3].setPertange(enemy.health);
          this.botles.splice(bottleIndex, 1);
        }else{
          if(this.level.endgame == true){
            this.gameOver = true;
          }
        }
        }
    });
  });
}

/**
 * Checks collisions between the character and enemies.
 */
hitEnemies = {}; 
checkCollisions() {
  this.level.enemies.forEach((enemy, enemyIndex) => {
    if (this.character.isColliding(enemy)){
      
      if((this.character.isCollidinigFromTop(enemy) && this.character.speedY == -22.5) ||
          (this.character.isCollidinigFromTop(enemy) && this.character.speedY == -25)){
        enemy.health -= 100;
      }
      if (enemy.health > 0 && !this.hitEnemies[enemyIndex]) {
        if(this.character.health > 0 ){ 
          this.hitEnemies[enemyIndex] = true;
          this.character.hit();
          this.character.health -= 20;
          this.statusBar[0].setPertange(this.character.health);
          this.sounds.playTakeDamage();
          this.checkInterval(450);
          setTimeout(() => {
            this.hitEnemies[enemyIndex] = false;
          }, 2000);
        } else {
          this.gameOver = true;
          this.youLose = true;
        }
      }
    }

  });
}


/**
 * Checks collisions between the character and the end boss.
 */
checkEndbossCollisons(){
  this.level.endbosss.forEach((enemy)=>{
    if(this.character.isColliding(enemy) ){
      if(this.character.isAboveGround() && this.character.isCollidingFromBottomtoTop(enemy) && this.collisionWithEndBoss){
        enemy.health -= 10;
        this.statusBar[3].setPertange(enemy.health);
        this.collisionWithEndBoss = false; 
      }else if(enemy.health > 0){
        if(this.character.health >= 0){
          this.character.hit(); 
          this.character.health -= 1;
          this.statusBar[0].setPertange(this.character.health);
          this.sounds.playTakeDamage();
          this.checkInterval(450); 
        }else {
          this.gameOver = true;
          this.youLose = true;
        }
      }
    }
  });
}

/**
 * Main game draw loop. Renders the game world and checks game states.
 */
draw() {
  if(this.gameOver){
    if(this.youLose){
      this.ui.youLose();
    }else {
      this.ui.youWin();
    }
  }else{
    if (this.gamePaused) {
      this.ui.drawUI();
    }else{
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.checkBottleCollision();
      this.checkBottleEndboossCollision();
      this.checkCollisions(); 
      this.checkEndbossCollisons();
      this.checkCoinsLoot();
      this.checkBotleLoot();
      this.ctx.translate(this.camera_x, 0);
      this.addArrayObjectToGame();
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
      this.addObjectsToMap(this.statusBar);

    }
    //draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}

/**
 * Adds all game objects to the map (background, enemies, items, etc.).
 */
addArrayObjectToGame(){
  this.addObjectsToMap(this.level.backgroundObjects);
  this.addObjectsToMap(this.level.clouds);
  this.addObjectsToMap(this.level.loot);
  this.addObjectsToMap(this.level.coins);
  this.addObjectsToMap(this.level.enemies);
  this.addObjectsToMap(this.level.endbosss);
  this.addObjectsToMap(this.botles);
}

/**
 * Draws an array of objects on the map.
 * @param {DrawableObject[]} objects - Array of objects to draw.
 */
addObjectsToMap(objects) {
  objects.forEach((o) => {
    this.addToMap(o);
  });
}

/**
 * Draws a single object on the map, handling flipped sprites.
 * @param {DrawableObject} mo - The object to draw.
 */
addToMap(mo) {
  if (mo.otherDirection) {
    this.flipImage(mo);
  }
  mo.draw(this.ctx);
  if (mo.otherDirection) {
    this.flipImageBack(mo);
  }
}


/**
 * Flips an image horizontally (for sprite direction changes).
 * @param {DrawableObject} mo - The object to flip.
 */
flipImage(mo){
  this.ctx.save();
  this.ctx.translate(mo.width, 0);
  this.ctx.scale(-1, 1);
  mo.x = mo.x * -1;
}

/**
 * Restores a flipped image to its original state.
 * @param {DrawableObject} mo - The object to restore.
 */
flipImageBack(mo){
  mo.x = mo.x * -1;
  this.ctx.restore();
}


/**
 * Toggles the game's paused state.
 */
putGameOnPause() {
  this.gamePaused = !this.gamePaused; 
  if (this.gamePaused) {
    this.ui.currentUI = 'pause';
    this.ui.drawUI(); 
  } else {
    this.ui.currentUI = 'resume'; 
    document.getElementById("gameOnPauseMenu").style.display = "none";
    document.getElementById("controlsOnPauseMenu").style.display = "none";
  }
}

/**
 * Throws a bottle from the character's position.
 * @param {number} x - The throw direction/distance.
 */
throwBottle(x){
  let distance = x;
  let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.otherDirection, distance);
  this.botles.push(bottle);
}

/**
 * Sets a cooldown period for actions.
 * @param {number} x - Cooldown duration in milliseconds.
 */
checkInterval(x){
  this.cooldown = true;
  setTimeout(() => {
    this.cooldown = false;
  }, x);
}

/**
 * Resets the game to its initial state.
 */
restartGame() {
  if(this.character.health == 0 || this.ui.currentUI == 'exit'){
    this.ui.currentUI = 'start';
    this.gameOver = false;
    this.gamePaused = true;
    this.youLose = false;
    this.level.endgame = false;
    this.botles = [];
    this.camera_x = 350;
    this.character.x = 350;
    this.character.y = 224;
    this.character.health = 100;
    this.character.botleLoot = 1;
    this.character.coinsLoot = 0;
    this.character.currentImage = 0;
    this.statusBar[0].setPertange(this.character.health); 
    this.statusBar[1].setPertange(this.character.botleLoot); 
    this.statusBar[2].setPertange(this.character.coinsLoot); 
    this.statusBar.splice(3,1);[]
    this.level.enemies = [];
    this.level.endbosss = [];
    this.level.coins = [];
    this.level.loot = [];
    this.level.addEnemiesToGame();
    this.level.addBottleToLevel();
    this.level.addCoinsToLevel();
    this.draw();
  }
}
}
