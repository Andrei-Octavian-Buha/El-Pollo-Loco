class Level {
  world;
  enemies;
  clouds;
  backgroundObjects;
  loot;
  level_end_x = (1024 * 6) + 150;
  y = 430;
  characterX;
  spawnEnemies;
  endGameBossIntverval;
  endgame = false;
  constructor(enemies, clouds, loot,  backgroundObjects, world) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.loot = loot;
    this.backgroundObjects = backgroundObjects;
    this.world = world;
    this.addEnemiesToGame();
  }


addEnemiesToGame() {
    this.endGameBossInterval = setInterval(() => {
     if(this.endgame == true) {
      this.addEndBossToGame();
    } else {
      this.addRandomEnemies();
    }
  }, 1000/30);
}


  addRandomEnemies(){
    if(this.spawnEnemies) return;
     this.spawnEnemies = setInterval(() => {
      this.y = Math.floor(Math.random() * 50) + 410; // this.y  = 430 +  Math.random() * 30 - 20;
      this.characterX = this.world.character.x;
     if(this.isGameOnPause()){
       return;
     }else if(this.world && this.world.character.health >= 0){
        if(this.world.character.x > 350){
          this.enemies.push(new Chicken(this.y, this.characterX, this.world));
        }
      }
      if(this.world.character.x > 1024 * 5){
        this.endgame = true;
      }
    }, 1500);
  }



  addEndBossToGame(){
    clearInterval(this.spawnEnemies);
    clearInterval(this.endGameBossInterval);
    this.spawnEnemies = null;
    this.enemies.push(new Endboss(this.characterX + 300, this.world)); 
    if(this.world){
      this.world.testLevelToWorld();
    }
  }

  isGameOnPause(){
    if(this.world){
      return this.world.gamePaused;
    }
  }
}
