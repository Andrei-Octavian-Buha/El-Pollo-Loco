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

  constructor(world){
    this.world = world;
  }
  backgroundMenu(){
  }

  youwin(){
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
      case 'about':
        break;
      default:
        break;
    }
  }
}