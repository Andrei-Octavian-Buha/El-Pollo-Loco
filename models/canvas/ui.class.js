class UI{
images = {};
pauseBtnX = 954;
pauseBtnY = 10;
width = 65;
height = 30;
world;
controlClicked = false;
currentUI = 'pause';

uX;
uY;
uWidth;
uHeight;
 
paths = {
    backArrow: "img/gui/btn/prew.png",
    bg: "img/gui/pause/bg.png",
    pauseHeader: "img/gui/pause/header.png",
    pauseTable: "img/gui/pause/table.png",
    btnAbout:"/img/gui/buttons-text/about.png",
    btnControls:"img/gui/buttons-text/controls.png",
    btnExit:"img/gui/buttons-text/exit.png",
    btnResume:"img/gui/buttons-text/resume.png",
    btnSetting:"img/gui/buttons-text/setting.png",
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

  drawUI() {
    this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    switch (this.currentUI) {
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

  drawPauseMenu() {
    this.backgroundMenu();
    this.resumeBtn()
    this.controlsBtn();
    this.settingsBtn();
    this.exitBtn();
  }

  // Controls Menu
  drawControlsMenu() {
    this.world.ctx.drawImage(this.images.bg, 0, 0, 1024, 576);
    this.world.ctx.drawImage(this.images.pauseTable, 20, 20, 1004, 556);
    this.world.ctx.drawImage(this.images.btnControls, 434, 40, 156, 56);
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
  }
// BUTTON MENU




// MOUSE EVENT 
  handleMouseClick(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

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
      this.currentUI = 'pause'; // Go back to the pause menu
    }

  }
  // Check if the mouse is over a button
  isMouseOverButton(mouseX, mouseY, buttonX, buttonY, buttonWidth, buttonHeight) {
    return mouseX > buttonX && mouseX < buttonX + buttonWidth &&
           mouseY > buttonY && mouseY < buttonY + buttonHeight;
  }
}