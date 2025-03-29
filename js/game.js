let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.key == "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.key == "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.key == "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.key == " ") {
    keyboard.SPACE = true;
  }
  if (event.key == "d") {
    keyboard.D = true;
  }
  if (event.key == "s") {
    keyboard.S = true;
  }
  if (event.key == "a") {
    keyboard.A = true;
  }
  if (event.key == "Escape") {
    keyboard.ESC = true;
    if (world.gamePaused == false) {
      world.putGameOnPause();
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.key == "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.key == "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.key == "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.key == " ") {
    keyboard.SPACE = false;
  }
  if (event.key == "d") {
    keyboard.D = false;
  }
  if (event.key == "Escape") {
    keyboard.ESC = false;
  }
  if (event.key == "s") {
    keyboard.S = false;
  }
  if (event.key == "a") {
    keyboard.A = false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  controlsMobile();
  clickOnPause();
  resummeGame();
  resummeGame2();
  clickOnControls();
  exitGame();
  sound();
  fullscreen();
});

  function sound(){
    soundOn();
    soundOff();
  }

  function soundOn(){
    let btnSound = document.getElementById("btnSound");
    btnSound.addEventListener("touchend", (e) => {
      e.preventDefault();
      let img = document.getElementById("btnSound");
      if(world.sounds.volume == 1){
        world.sounds.volume = 0;
        img.src = "./img/gui/btn/sound_off.png";
      }
      else{
        world.sounds.volume = 1;
        img.src = "./img/gui/btn/sound.png";
      }
    });
  }

  function soundOff(){
    let btnSound = document.getElementById("btnSound");
    btnSound.addEventListener("click", (e) => {
      e.preventDefault();
      let img = document.getElementById("btnSound");
      if(world.sounds.volume == 1){
        world.sounds.volume = 0;
        img.src = "./img/gui/btn/sound_off.png";
      }
      else{
        world.sounds.volume = 1;
        img.src = "./img/gui/btn/sound.png";
      }
    });
  }

function exitGame(){
  let exit = document.getElementById("btnExit");
  exit.addEventListener("click", (e) => {
    e.preventDefault();
    world.ui.currentUI = 'exit';
  });
}

function clickOnPause(){
  let onPause = document.getElementById("btnPause");
  onPause.addEventListener("touchstart", (e) => {
    e.preventDefault();
  });
  onPause.addEventListener("touchend", (e) => {
    e.preventDefault();
    world.gamePaused = true;
    document.getElementById("gameOnPauseMenu").style.display = "flex";
  });
  onPause.addEventListener("click", (e) => {
    e.preventDefault();
    world.gamePaused = true;
    document.getElementById("gameOnPauseMenu").style.display = "flex";
  });
}

function clickOnControls(){
  let onPause = document.getElementById("btnInfo");
  onPause.addEventListener("click", (e) => {
    e.preventDefault(); 
    world.gamePaused = true;
    document.getElementById("controlsOnPauseMenu").style.display = "flex";
  });
}


function resummeGame(){
  let resumme = document.getElementById("btnResume");
  resumme.addEventListener("click", (e) => {
    e.preventDefault();
    world.putGameOnPause();
  });
}

function resummeGame2(){
  let resumme = document.getElementById("btnResume2");
  resumme.addEventListener("click", (e) => {
    e.preventDefault();
    world.putGameOnPause();
  });
}

function controlsMobile(){
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btnJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("btnJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

function fullscreen(){
  let btnFullScreen = document.getElementById("btnFullscreen");
    btnFullScreen.addEventListener("click", (e) => {
      e.preventDefault();
      let fullscreenid = document.getElementById("fullscreen");
      let canvasfullscreen = document.getElementById("canvas");
      enterFullscreen(fullscreenid);
      canvasfullscreen.style.width = "100%";
      canvasfullscreen.style.height = "100%";
    });
}

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

