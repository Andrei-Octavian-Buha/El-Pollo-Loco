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
 
paths = {
  youWin: "img/9_intro_outro_screens/win/win_2.png",
  gameOver: "img/9_intro_outro_screens/game_over/game over.png",
  startBtn: "img/2.png",
  controlsBtn: "img/1.png",
  bgStart: "img/9_intro_outro_screens/start/startscreen_1.png",
    backArrow: "img/gui/btn/prew.png",
    bg: "img/gui/pause/bg.png",
    pauseHeader: "img/gui/pause/header.png",
    pauseTable: "img/gui/pause/table.png",
    btnAbout:"/img/gui/buttons-text/about.png",
    btnControls:"img/gui/buttons-text/controls.png",
    btnExit:"img/gui/buttons-text/exit.png",
    btnResume:"img/gui/buttons-text/resume.png",
    btnSetting:"img/gui/buttons-text/setting.png",
    btnA:"img/keys/A.png",
    btnS:"img/keys/S.png",
    btnD:"img/keys/D.png",
    btnArrowLeft:"img/keys/ARROWLEFT.png",
    btnArrowRight:"img/keys/ARROWRIGHT.png",
    btnSpace:"img/keys/SPACE.png",
    btnEscape:"img/keys/ESC.png",
};

  constructor(world){
    this.world = world;
    this.loadImages();
  }

  loadImages() {
    // Iterează prin toate căile și încarcă imaginile
    for (let key in this.paths) {
      let image = new Image();
      image.src = this.paths[key];
      this.images[key] = image;  // Stochează fiecare imagine în obiectul `images`
    }
  }
  backgroundMenu(){
    this.world.ctx.drawImage(this.images.bg, 0, 0, 1024, 576);
    this.world.ctx.drawImage(this.images.pauseTable, 20, 20, 1004, 556);
  }

  youwin(){
    this.world.ctx.fillStyle = "#FFFFFF";
    this.world.ctx.fillRect(0,0,1024,576);
    this.world.ctx.drawImage(this.images.youWin, 0, 0, 1024, 576);
  }


  drawUI() {
    this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    switch (this.currentUI) {
      case 'start':
        this.drawStartMenu();
        break;
      case 'startControls':
        this.startControlsMenu();
        break;
      case 'pause':
        this.drawPauseMenu();
        break;
      case 'controls':
        this.drawControlsMenu();
        break;
      case 'settings':
        this.drawSettingsMenu();
        break;
      case 'about':
        this.drawAboutMenu();
        break;
      default:
        this.drawPauseMenu();
        break;
    }
  }

  drawStartMenu() {
     this.world.ctx.drawImage(this.images.bgStart, 0, 0, 1024, 576);
     this.world.ctx.drawImage(this.images.controlsBtn, 720, 520, 256, 48);
      this.world.ctx.drawImage(this.images.startBtn, 354, 500, 316, 64);
  }

  drawPauseMenu() {
    this.backgroundMenu();
    this.resumeBtn()
    this.controlsBtn();
    this.settingsBtn();
    this.exitBtn();
  }

  // Controls Menu
  drawControlsMenu() {
    this.world.ctx.font = '32px zabras';
    this.world.ctx.drawImage(this.images.bg, 0, 0, 1024, 576);
    this.world.ctx.drawImage(this.images.pauseTable, 20, 20, 1004, 556);
    this.world.ctx.drawImage(this.images.btnControls, 434, 40, 156, 56);
    this.world.ctx.drawImage(this.images.btnA, this.baseX, 80, 48,48);
        this.world.ctx.fillText('Trow Short Shot', 234, 120);
    this.world.ctx.drawImage(this.images.btnS, this.baseX, 80 + 48 + this.spacing, 48, 48);
    this.world.ctx.fillText('Throw NORMAL shot', 234, 170);
    this.world.ctx.drawImage(this.images.btnD, this.baseX, 80 + 2 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Throw LONG shot', 234, 230);
    this.world.ctx.drawImage(this.images.btnSpace,this.baseX , 80 + 3 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Press to JUMP', 234, 285);
    this.world.ctx.drawImage(this.images.btnArrowLeft, this.baseX, 80 + 4 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Move to Left', 234, 340);
    this.world.ctx.drawImage(this.images.btnArrowRight, this.baseX, 80 + 5 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Move to Right', 234, 400);
    this.world.ctx.drawImage(this.images.btnEscape, this.baseX, 80 + 6 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Press to ESCAPE', 234, 460);
    this.backArrowBtn();
  }
    startControlsMenu() {
    this.world.ctx.font = '32px zabras';
    this.world.ctx.drawImage(this.images.bg, 0, 0, 1024, 576);
    this.world.ctx.drawImage(this.images.pauseTable, 20, 20, 1004, 556);
    this.world.ctx.drawImage(this.images.btnControls, 434, 40, 156, 56);
    this.world.ctx.drawImage(this.images.btnA, this.baseX, 80, 48,48);
        this.world.ctx.fillText('Trow Short Shot', 234, 120);
    this.world.ctx.drawImage(this.images.btnS, this.baseX, 80 + 48 + this.spacing, 48, 48);
    this.world.ctx.fillText('Throw NORMAL shot', 234, 170);
    this.world.ctx.drawImage(this.images.btnD, this.baseX, 80 + 2 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Throw LONG shot', 234, 230);
    this.world.ctx.drawImage(this.images.btnSpace,this.baseX , 80 + 3 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Press to JUMP', 234, 285);
    this.world.ctx.drawImage(this.images.btnArrowLeft, this.baseX, 80 + 4 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Move to Left', 234, 340);
    this.world.ctx.drawImage(this.images.btnArrowRight, this.baseX, 80 + 5 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Move to Right', 234, 400);
    this.world.ctx.drawImage(this.images.btnEscape, this.baseX, 80 + 6 * (48 + this.spacing), 48, 48);
        this.world.ctx.fillText('Press to ESCAPE', 234, 460);
    this.backArrowBtn();
  }

  // Settings Menu
  drawSettingsMenu() {
    this.world.ctx.drawImage(this.images.bg, 0, 0, 1024, 576);
    this.world.ctx.drawImage(this.images.pauseTable, 20, 20, 1004, 556);
    this.world.ctx.drawImage(this.images.btnSetting, 434, 40, 156, 56);
    this.backArrowBtn();
  }

  // About Menu
  drawAboutMenu() {
    this.world.ctx.fillText("About UI", 500, 200); 
    this.backArrowBtn();
  }

  // Back arrow button (common for all menus)
  backArrowBtn() {
    this.world.ctx.drawImage(this.images.backArrow, 40, 40, 56, 56);
  }

  //Resume button
  resumeBtn() {
    this.world.ctx.drawImage(this.images.btnResume, 434, 131, 156, 56);
  }
  // Controls button
  controlsBtn() {
    this.world.ctx.drawImage(this.images.btnControls, 434, 187, 156, 56);
  }

  // Settings button
  settingsBtn() {
    this.world.ctx.drawImage(this.images.btnSetting, 434, 243, 156, 56);
  }

  // Exit button
  exitBtn() {
    this.world.ctx.drawImage(this.images.btnExit, 434, 299, 156, 56);
    this.world.restartGame();
  }
// BUTTON MENU




// MOUSE EVENT 
  handleMouseClick(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    if (this.isMouseOverButton(mouseX, mouseY, 354, 500, 316, 64)) {
      this.world.gamePaused = false; 
      this.currentUI = 'start'; 
    }else if(this.isMouseOverButton(mouseX, mouseY, 720, 520, 256, 48)){
      this.currentUI = 'startControls'; // Switch to controls screen
    }
    if(this.currentUI != 'start'){
        // Check if the controls button was clicked
        if (this.isMouseOverButton(mouseX, mouseY, 434, 131, 158, 56)) {
          this.world.gamePaused = false; // Reia jocul
          this.currentUI = 'resume'; // Switch to controls screen
        }
        if (this.isMouseOverButton(mouseX, mouseY, 434, 187, 158, 56)) {
          this.currentUI = 'controls'; // Switch to controls screen
        }
        // Check if the settings button was clicked
        if (this.isMouseOverButton(mouseX, mouseY, 434, 243, 158, 56)) {
          this.currentUI = 'settings'; // Switch to settings screen
        }
        // Check if the exit button was clicked
        if (this.isMouseOverButton(mouseX, mouseY, 434, 299, 158, 56)) {
          this.currentUI = 'exit'; // Exit the game or go to a different screen (implement as needed)
        }
        // Check if the back arrow button was clicked (common for all menus)
        if (this.isMouseOverButton(mouseX, mouseY, 40, 40, 56, 56)) {
          if (this.currentUI === 'controls') {
            this.currentUI = 'pause'; // Go back to the pause menu
          } else if (this.currentUI === 'startControls') {
            this.currentUI = 'start'; // Go back to the pause menu
          }
        }
    }
  }

  // Check if the mouse is over a button
  isMouseOverButton(mouseX, mouseY, buttonX, buttonY, buttonWidth, buttonHeight) {
    return mouseX > buttonX && mouseX < buttonX + buttonWidth &&
           mouseY > buttonY && mouseY < buttonY + buttonHeight;
  }
}