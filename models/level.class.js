class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 700 * 4;
  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
