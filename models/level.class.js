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
  if (this.spawnEnemies) return;

    if (this.isEndGame()) {
      clearInterval(this.spawnEnemies); // Stop spawning enemies when the game ends
      this.spawnEnemies = null; // Reset the interval reference
      this.addEndBossToGame(); // Add the end boss
    } else {
      // Continue adding random enemies if the game is ongoing
      this.addRandomEnemies();
    }
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
    }, 1500);
  }

  isEndGame(){ 
      if(this.world && this.world.character.x <= (this.level_end_x-150) && !this.endgame){
        console.log("END GAME - This game is over :", this.endgame);
        this.endgame = true;
        return this.endgame;
      }    
}

  addEndBossToGame(){
    this.enemies.push(new Endboss(this.characterX + 400, this.world)); 
    this.world.statusbar.push(new HealthBarEndboss());   
  }

  isGameOnPause(){
    if(this.world){
      console.log("ADD-ENEMIES - This game is on PAUSE :",this.world.gamePaused);
      return this.world.gamePaused;
    }
  }
}
