class UI{
images = {};
pauseBtnX = 954;
pauseBtnY = 10;
width = 65;
height = 30;
world;
controlClicked = false;
currentUI = 'start';
baseX =180;
spacing = 10; 
uX;
uY;
uWidth;
uHeight;
images = {};

paths = {
  win: "img/9_intro_outro_screens/win/win_2.png",
  lose: "img/9_intro_outro_screens/game_over/game over.png",
};


  constructor(world){
    this.world = world;
    this.loadImages();
  }


  
  loadImages() {
    for (let key in this.paths) {
      let image = new Image();
      image.src = this.paths[key];
      this.images[key] = image;
    }
  }

  backgroundMenu(){
    this.currentUI = 'start';
  }

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