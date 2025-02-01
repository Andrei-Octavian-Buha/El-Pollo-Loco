class World {
  character = new Character();
  mobj = new MovableObject();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 350;
  statusBar = [new HealthBar(), new BottleLootBar(), new Coins()];
  gamePaused = false;
  ui = new UI();
  sound = new Sounds();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld(); 
    this.draw();
    this.checkCollisions();
    this.checkBotleLoot();
    this.checkPause();
    this.canvas.addEventListener('click', (event) => this.handleMouseClick(event));
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => enemy.world = this);
    this.mobj.world = this;
  }

  checkBotleLoot(){
    setInterval(() => {
      this.level.loot.forEach((botle)=>{
        if(this.character.isColliding(botle)){
            this.character.botleLoot += 20;
            this.sound.playCollectBottle();
            console.log("Ai adunat", this.character.botleLoot);
            this.statusBar[1].setPertange(this.character.botleLoot);
            botle.y = -100;
        }
      })
    }, 200);
  }

  checkCollisions(){
    setInterval(() => {
      this.level.enemies.forEach((enemy)=>{
          if(this.character.isColliding(enemy)){
            if(this.character.isAboveGround() && this.character.isCollidingFromBottomtoTop(enemy)){
              if(enemy.health > 0){
                this.sound.playChickenDamage();
              }
              enemy.health = 0; 
          } else if(enemy.health > 0){              
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
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);  // Să umplem ecranul cu un fundal semi-transparent
      this.ctx.fillStyle = "white";
      this.ctx.font = "30px Arial";
      this.ctx.fillText("Game Paused", this.canvas.width / 2 - 75, this.canvas.height / 2);
      this.drawPauseButton();// Oprești restul desenării dacă jocul este în pauză
    }else{
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addBackgroundToMap();
      this.addObjectsToMap(this.level.loot);
      this.addObjectsToMap(this.level.enemies);
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
      this.drawPauseButton();
      this.addObjectsToMap(this.statusBar);
    }
    //draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addBackgroundToMap(){
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
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

  putGameOnPause(){
      if(this.keyboard.ESC){
        this.gamePaused = !this.gamePaused;
        this.draw();
        console.log("Ai apasat pe ESC si valoarea lui GAME PAUSED ii ",this.gamePaused);
      }
  }
  
  checkPause(){ 
    setInterval(() => {
      this.putGameOnPause();
    }, 150);
  }

  drawPauseButton() {
    const isHovered = this.isMouseOverButton(); // Check if the mouse is over the button

    this.ctx.fillStyle = isHovered ? "lightgreen" : "lightblue"; // Change color on hover
    this.ctx.fillRect(this.ui.pauseBtnX, this.ui.pauseBtnY, this.ui.width, this.ui.height);
  
    this.ctx.fillStyle = "black";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("Pause", this.ui.pauseBtnX + 5, this.ui.pauseBtnY + 22);
  }

  handleMouseClick(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    if (mouseX > this.ui.pauseBtnX && mouseX < this.ui.pauseBtnX + this.ui.width &&
        mouseY > this.ui.pauseBtnY && mouseY < this.ui.pauseBtnY + this.ui.height) {
      this.gamePaused = !this.gamePaused;
      console.log("Game Paused:", this.gamePaused);
    }
  }

  isMouseOverButton() {
    const mouseX = this.mouseX;
    const mouseY = this.mouseY;
  
    return mouseX > this.ui.pauseBtnX && mouseX < this.ui.pauseBtnX + this.ui.width &&
    mouseY > this.ui.pauseBtnY && mouseY < this.ui.pauseBtnY + this.ui.height;
  }

}
