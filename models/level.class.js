class Level {
  enemies;
  clouds;
  backgroundObjects;
  loot;
  level_end_x = 700 * 4;
  constructor(enemies, clouds, loot,  backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.loot = loot;
    this.backgroundObjects = backgroundObjects;

  }
}
