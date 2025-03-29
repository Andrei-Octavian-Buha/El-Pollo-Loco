/**
 * Represents the user interface (UI) of the game, handling menu screens, win/lose screens, and game pause states.
 */
class UI{

  /**
   * Object to store image resources for different UI elements.
   * @type {Object}
   */
images = {};

  /**
   * Reference to the game world.
   * @type {World}
   */
world;

  /**
   * Current UI screen state.
   * @type {string}
   */
currentUI = 'start'; 

  /**
   * Object containing paths to the win and lose screen images.
   * @type {Object}
   */
paths = {
  win: "img/9_intro_outro_screens/win/win_2.png",
  lose: "img/9_intro_outro_screens/game_over/game over.png",
};

  /**
   * Creates an instance of the UI class.
   * @param {World} world - The reference to the game world.
   */
  constructor(world){
    this.world = world;
    this.loadImages();
  }

    /**
   * Loads all necessary images for the UI (win, lose, etc.).
   */
  loadImages() {
    for (let key in this.paths) {
      let image = new Image();
      image.src = this.paths[key];
      this.images[key] = image;
    }
  }

  /**
   * Displays the background menu UI screen.
   * Sets the current UI state to 'start'.
   */
  backgroundMenu(){
    this.currentUI = 'start';
  }

  /**
   * Handles the win condition screen.
   * Displays the win screen after a brief delay, and transitions to the exit screen after another delay.
   */
  youWin(){
    setTimeout(() => {
      document.getElementById("guiId").style.display = "none";
      this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
      this.world.ctx.drawImage(this.images.win, 0, 0, 1024, 576);
    } , 1000);
    setTimeout(() => {
      this.currentUI = 'exit';
      this.drawUI();
    }, 5000);
  }

  /**
   * Handles the lose condition screen.
   * Displays the lose screen after a brief delay, and transitions to the exit screen after another delay.
   */
  youLose(){  
    setTimeout(() => {
      document.getElementById("guiId").style.display = "none";
      this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
      this.world.ctx.drawImage(this.images.lose, 0, 0, 1024, 576);
    } , 1000);
    setTimeout(() => {
      this.currentUI = 'exit';
      this.drawUI();
    }, 5000);
  }

  /**
   * Draws the appropriate UI based on the current state.
   * Handles interactions like starting the game, displaying controls, and handling exit.
   */
  drawUI() {
    switch (this.currentUI) {
      case 'start':
        document.getElementById("startGame").addEventListener("click", (e) => {
          e.preventDefault();
          this.world.gamePaused = false;
          document.getElementById("startGameLayoutId").style.display = "none";
          document.getElementById("mobileControlsBarId").style.display = "flex";
          document.getElementById("guiId").style.display = "flex";
        });
        document.getElementById("startGameControls").addEventListener("click", (e) => {
          e.preventDefault();
          document.getElementById("startGameLayoutId").style.display = "none";
          document.getElementById("controlsLayoutId").style.display = "flex";
        });
        document.getElementById("backToStartGame").addEventListener("click", (e) => {
          e.preventDefault();
          document.getElementById("controlsLayoutId").style.display = "none";
          document.getElementById("startGameLayoutId").style.display = "flex";
        });
        break;
      case 'startControls':

        break;
      case 'pause':
        document.getElementById("gameOnPauseMenu").style.display = "flex";
        break;
      case 'controls':
        break;
      case 'settings':
        break;
      case 'exit':
        this.world.restartGame();
        document.getElementById("gameOnPauseMenu").style.display = "none";
        document.getElementById("startGameLayoutId").style.display = "flex";
        document.getElementById("guiId").style.display = "none";
        document.getElementById("mobileControlsBarId").style.display = "none";
        break;
      default:
        break;
    }
  }
}