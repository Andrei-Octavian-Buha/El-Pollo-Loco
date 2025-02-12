class Level {
  world;
  enemies;
  clouds;
  backgroundObjects;
  loot;
  level_end_x = (1024 * 6) + 150;
  enumber = 500;
  y = 430;
  characterX;
  constructor(enemies, clouds, loot,  backgroundObjects, world) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.loot = loot;
    this.backgroundObjects = backgroundObjects;
    this.world = world;
    this.addRandomEnemies();
  }

  addRandomEnemies(){
    let spawnEnemies = setInterval(() => {
      this.y  = 430 +  Math.random() * 30 - 20;
      this.characterX = this.world.character.x;
     if(this.isGameOnPause()){
       return;
     }else if(this.world && this.world.character.health >= 0){
       if(this.isEndGame()){
        this.enemies.push(new Endboss(this.characterX + 700, this.world)); 
        clearInterval(spawnEnemies);
      }else if(this.world.character.x > 350){
        this.enemies.push(new Chicken(this.y, this.characterX, this.world));
      }
    }
    }, 1500);
  }

  isEndGame(){
    if(this.world.character.x >= this.level_end_x){
      return true;
    }
  }

  isGameOnPause(){
    if(this.world){
      console.log("ADD-ENEMIES - This game is on PAUSE :",this.world.gamePaused);
      return this.world.gamePaused;
    }
  }
}
