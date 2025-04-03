/**
 * Represents a game level, including enemies, loot, coins, and other level-related entities.
 * Manages the progression of the level, including spawning enemies, the end boss, and collectibles.
 */
class Level {
    /**
     * The game world associated with this level.
     * @type {Object}
     */
  world;

    /**
     * The list of enemies in the level.
     * @type {Array}
     */
  enemies;

    /**
     * The list of end bosses in the level.
     * @type {Array}
     */
  endbosss;

    /**
     * The clouds in the level.
     * @type {Array}
     */
  clouds;

    /**
     * The background objects in the level.
     * @type {Array}
     */
  backgroundObjects;

    /**
     * The loot items in the level.
     * @type {Array}
     */
  loot;

    /**
     * The coins in the level.
     * @type {Array}
     */
  coins;

    /**
     * The x position where the level ends (end of the level).
     * @type {number}
     */
  level_end_x = 1024 * 6;

    /**
     * The y position for the level's ground or initial spawn area.
     * @type {number}
     */
  y = 430;

    /**
     * The x position of the character (used for spawning enemies).
     * @type {number}
     */
  characterX;

    /**
     * Flag to track whether enemies are being spawned.
     * @type {boolean}
     */
  spawnEnemies;

    /**
     * Interval for spawning the end boss.
     * @type {NodeJS.Timeout | null}
     */
  endGameBossIntverval;

    /**
     * Flag to track whether the end game boss should be added.
     * @type {boolean}
     */
  endgame = false;

    /**
     * The last x position used for spawning loot.
     * @type {number}
     */
  lastX = 0;

    /**
     * The last y position used for spawning loot.
     * @type {number}
     */
  lastY = 420;

      /**
     * Creates an instance of the `Level` class.
     * 
     * @param {Array} endbosss - The list of end bosses in the level.
     * @param {Array} enemies - The list of enemies in the level.
     * @param {Array} clouds - The list of clouds in the level.
     * @param {Array} loot - The list of loot items in the level.
     * @param {Array} coins - The list of coins in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Object} world - The world object that manages the game state.
     */
  constructor(endbosss, enemies, clouds, loot, coins,  backgroundObjects, world) {
    this.endbosss = endbosss;
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

      /**
     * Adds enemies to the game. If the end game flag is true, the end boss is added instead.
     * Enemies are added at a regular interval.
     */
  addEnemiesToGame() {
      let endGameBossInterval = setInterval(() => {
      if(this.endgame == true) {
        this.addEndBossToGame();
        clearInterval(endGameBossInterval);
      } else {
        this.addRandomEnemies();
      }
    }, 1000/30);
  }

      /**
     * Adds random enemies to the level at a set interval.
     * Enemies are only spawned when the character's x position is greater than 350.
     */
  addRandomEnemies(){
    if(this.spawnEnemies) return;
     this.spawnEnemies = setInterval(() => {
        this.characterX = this.world.character.x;
        if(this.isGameOnPause()){
          return;
        }else if(this.world && this.world.character.health > 0){
          let randomEnemyType = Math.random() < 0.3 ? Chicken : BabyChicken;
          let mobs = new randomEnemyType(this.characterX, this.world);
          if(this.world.character.x > 350){
            this.enemies.push(mobs);
          }
        }
        if(this.world.character.x >= 5500){
          this.endgame = true;
        }
    }, 1000);
  }

  /**
  * Adds the end boss to the game and stops enemy spawning.
  * Clears the current intervals for spawning enemies and the end boss.
  */
  addEndBossToGame(){
    this.spawnEnemies = null;
    this.endbosss.push(new Endboss(this.characterX + 750, this.world)); 
    if(this.world){
      this.world.testLevelToWorld();
    }
  }

      /**
     * Adds bottles (loot items) to the level at random x positions.
     * 
     * @param {number} [count=4] - The number of bottles to add to the level.
     */
  addBottleToLevel(){
    for (let i = 0; i <= 4; i++) {
      let x = this.lastX + 800 + Math.random() * (6000-400);
      this.loot.push(new BotleLoot(x));
    }
  }

      /**
     * Adds coins to the level at random x and y positions.
     * 
     * @param {number} [count=50] - The number of coins to add to the level.
     */
  addCoinsToLevel(){
    for (let i = 0; i <= 50; i++) {
      let x = this.lastX + 800 + Math.random() * (6000-400);
      let y = this.lastY - Math.random() * 80;
      this.coins.push(new CoinsLoot(x, y));
    }
  }

    /**
     * Checks if the game is currently paused by checking the `gamePaused` flag in the world.
     * 
     * @returns {boolean} - `true` if the game is paused, otherwise `false`.
     */
  isGameOnPause(){
    if(this.world){
      return this.world.gamePaused;
    }
    return  false;
  }
}
