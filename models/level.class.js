class Level {
  world;
  enemies;
  clouds;
  backgroundObjects;
  loot;
  coins;
  level_end_x = 1024 * 6;
  y = 430;
  characterX;
  spawnEnemies;
  endGameBossIntverval;
  endgame = false;
  lastX = 0;
  lastY = 420;

  constructor(enemies, clouds, loot, coins,  backgroundObjects, world) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.loot = loot;
    this.coins = coins;
    this.backgroundObjects = backgroundObjects;
    this.world = world;
    this.addEnemiesToGame();
    this.addBottleToLevel();
    this.addCoinsToLevel();
  }

  addEnemiesToGame() {
      this.endGameBossInterval = setInterval(() => {
      if(this.endgame == true) {
        this.enemies =[];
        this.addEndBossToGame();
      } else {
        this.addRandomEnemies();
      }
    }, 1000/30);
  }

  addRandomEnemies(){
    if(this.spawnEnemies) return;
     this.spawnEnemies = setInterval(() => {
      this.y = Math.floor(Math.random() * 10) + 420; // this.y  = 430 +  Math.random() * 30 - 20;
      this.characterX = this.world.character.x;
     if(this.isGameOnPause()){
       return;
     }else if(this.world && this.world.character.health > 0){
        if(this.world.character.x > 350){
          this.enemies.push(new Chicken(this.y, this.characterX, this.world));
        }
      }
      if(this.world.character.x >= 400){
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

  addBottleToLevel(){
    for (let i = 0; i <= 4; i++) {
      let x = this.lastX + 800 + Math.random() * (6000-400);
      this.loot.push(new BotleLoot(x));
    }
  }

  addCoinsToLevel(){
    for (let i = 0; i <= 50; i++) {
      let x = this.lastX + 800 + Math.random() * (6000-400);
      let y = this.lastY - Math.random() * 80;
      this.coins.push(new CoinsLoot(x, y));
    }
  }


  isGameOnPause(){
    if(this.world){
      return this.world.gamePaused;
    }
    return  false;
  }
}
