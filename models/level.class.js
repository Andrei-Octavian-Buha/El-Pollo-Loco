class Level {
  world;
  enemies;
  clouds;
  backgroundObjects;
  loot;
  level_end_x = 1024 * 4;
  constructor(enemies, clouds, loot,  backgroundObjects,world) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.loot = loot;
    this.backgroundObjects = backgroundObjects;
    this.world = world;
  }
}
