class World {
character = new Character();
mobj = new MovableObject();
level = level1;
canvas;
ctx;
keyboard;
camera_x = 350;
statusBar = [new HealthBar(), new BottleLootBar(), new Coins()];
gamePaused = true;
ui = new UI();
botles = [new ThrowableObject()];


cooldown = false;
cooldownTimer = 500;

constructor(canvas, keyboard) {
  this.ctx = canvas.getContext("2d");
  this.canvas = canvas;
  this.keyboard = keyboard;
    this.setWorld(); 
    this.draw();
    this.checkCollisions();
    this.checkBottleCollision();
    this.run();
    this.canvas.addEventListener('click', (event) => this.ui.handleMouseClick(event));
}

setWorld() {
  this.character.world = this;
  this.level.enemies.forEach(enemy => enemy.world = this);
  this.mobj.world = this;
  this.ui.world = this;
}

run(){
  setInterval(() => {
    this.checkBotleLoot();
  }, 200);
}

checkBotleLoot(){
  this.level.loot.forEach((botle)=>{
    if(this.character.isColliding(botle)){
      this.character.botleLoot += 20;
      // this.mobj.sound.playCollectBottle();
      console.log("Ai adunat", this.character.botleLoot);
      this.statusBar[1].setPertange(this.character.botleLoot);
      botle.y = -100;
    }
  });
}

checkBottleCollision() {
  setInterval(() => {
    this.botles.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if(enemy.health >0){
            enemy.health -= 50; 
            this.botles.splice(bottleIndex, 1);
            if (enemy.health <= 0) {
            }
          }
        }
      });
    });
  }, 1000/30);

}

checkCollisions(){
  setInterval(() => {
    this.level.enemies.forEach((enemy)=>{
        if(this.character.isColliding(enemy)){
          if(this.character.isAboveGround() && this.character.isCollidingFromBottomtoTop(enemy)){
            // if(enemy.health > 0){
            //   // this.mobj.sound.playChickenDamage();
            // }
            enemy.health = 0; 
        }else if(enemy.health > 0){              
            this.character.hit();
            this.statusBar[0].setPertange(this.character.health);
            console.log("Health", this.character.health);
          }
        }
    });
  }, 1000/30);
}



draw() {
    if (this.gamePaused) {
      this.ui.drawUI();
    }else{
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addArrayObjectToGame();
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
      this.addObjectsToMap(this.statusBar);
      this.restartGame();
    }
  //draw wird immer wieder aufgerufen
  let self = this;
  requestAnimationFrame(function () {
    self.draw();
  });
}


addArrayObjectToGame(){
  this.addObjectsToMap(this.level.backgroundObjects);
  this.addObjectsToMap(this.level.clouds);
  this.addObjectsToMap(this.level.loot);
  this.addObjectsToMap(this.level.enemies);
  this.addObjectsToMap(this.botles);
}

addObjectsToMap(objects) {
  objects.forEach((o) => {
    this.addToMap(o);
  });
}

addToMap(mo) {
  if (mo.otherDirection) {
    this.flipImage(mo);
  }
  mo.draw(this.ctx);
  mo.drawFrameOffset(this.ctx);
  if (mo.otherDirection) {
    this.flipImageBack(mo);
  }
}

flipImage(mo){
  this.ctx.save();
  this.ctx.translate(mo.width, 0);
  this.ctx.scale(-1, 1);
  mo.x = mo.x * -1;
}

flipImageBack(mo){
  mo.x = mo.x * -1;
  this.ctx.restore();
}

putGameOnPause() {
  if (this.keyboard.ESC) { // Verifică dacă ESC este apăsat
    this.gamePaused = !this.gamePaused; // Comută starea jocului
    if (this.gamePaused) {
      this.ui.currentUI = 'pause'; // Către meniul de pauză
      this.ui.drawUI(); // Re-desenează UI-ul de pauză
    } else {
      this.ui.currentUI = 'resume'; // Reia jocul
    }
  }
}



// CHARACTER - METHODEN 
throwBottle(x){
  console.log(x);
  
  let distance = x;
    let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.otherDirection, distance);
    this.botles.push(bottle);
}

checkInterval(){
  this.cooldown = true;
  setTimeout(() => {
          this.cooldown = false;
  }, this.cooldownTimer);
}


restartGame() {
  if(this.character.health == 0 || this.ui.currentUI == 'exit'){
    this.character.health = 100;
    this.character.botleLoot = 10;
    this.character.x = 350;
    this.character.y = 224;
    this.level.enemies.forEach(enemy => {
      enemy.health = 100;
      enemy.x = 500 + Math.random() * 500; 
    });
    this.botles = [];
    this.gamePaused = true;
    this.camera_x = 350;
    this.statusBar[0].setPertange(this.character.health); 
    this.statusBar[1].setPertange(this.character.botleLoot); 
    this.ui.currentUI = 'start';
  
    this.level.loot.forEach(loot => {
      loot.y = 330; 
    });
  
  
    // Resetează starea obiectelor de fundal și a norilor
    this.level.backgroundObjects.forEach(background => {
      background.x = background.initialX; 
    });
  
    this.level.clouds.forEach(cloud => {
      cloud.x = 0 + Math.random() * 500; // Resetează poziția inițială a norilor
    });
    this.draw();
  }
}
}
