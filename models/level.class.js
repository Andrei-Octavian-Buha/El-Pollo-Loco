class Level {
  world;
  enemies;
  clouds;
  backgroundObjects;
  loot;
  level_end_x = 1024 * 4;
  enumber = 500;
  y = 430;
  characterX;
  constructor(enemies, clouds, loot,  backgroundObjects, world) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.loot = loot;
    this.backgroundObjects = backgroundObjects;
    this.world = world;
    this.addRandomEnemies(this.world);
  }

  addRandomEnemies(){
    setInterval(() => {
     if(this.isGameOnPause()){
      return;
     }else if(this.world && this.world.character.health >= 0){
      this.y  = 430 +  Math.random() * 30 - 20;
      if(this.world.character.x > 350){
        this.characterX = this.world.character.x;
        this.enemies.push(new Chicken(this.y, this.characterX, this.world));
        console.log("ENEMY ADDED");
        
      }
    }
    }, 1000);
  }

  isGameOnPause(){
    if(this.world){
      console.log("ADD-ENEMIES - This game is on PAUSE :",this.world.gamePaused);
      return this.world.gamePaused;
    }
  }
}
