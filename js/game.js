let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initializes the game world and canvas.
 */
function init() {
  canvas = document.getElementById("canvas");

  world = new World(canvas, keyboard);
  loadVolume();
}

/**
 * Listens for keydown events and updates the keyboard object accordingly.
 * @param {KeyboardEvent} event - The keydown event object.
 */
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

/**
 * Listens for keyup events and updates the keyboard object accordingly.
 * @param {KeyboardEvent} event - The keyup event object.
 */
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

/**
 * Sets up event listeners for various UI elements when the document is ready.
 */

window.onload = function() {
};

document.addEventListener("DOMContentLoaded", () => {
  controlsMobile();
  clickOnPause();
  resummeGame();
  resummeGame2();
  clickOnControls();
  exitGame();
  fullscreen();
  sound();
});

/**
 * Toggles sound on and off.
 */
  function sound(){
    soundOn();
    soundOff();
  }

  // When the volume is updated, save it to localStorage
function updateVolume(newVolume) {
  world.sounds.volume = newVolume;
  world.sounds.backgroundMusic.volume = newVolume;
  localStorage.setItem('soundVolume', world.sounds.volume);
  localStorage.setItem('backgroundMusicVolume', world.sounds.backgroundMusic.volume);
}

  /**
 * Loads the volume settings from localStorage and sets the sound volume accordingly.
 */
function loadVolume() {
  if (world && world.sounds) {
    const savedSoundVolume = localStorage.getItem('soundVolume');

    if (savedSoundVolume !== null) {
        world.sounds.volume = savedSoundVolume;
        world.sounds.backgroundMusic.volume = savedSoundVolume;
        setUpdateImg(savedSoundVolume);
    } else {
        world.sounds.volume = 1; 
        world.sounds.backgroundMusic.volume = 1;
        setUpdateImg(1);
    }
    
  }
}

  /**
 * Set image for the sound button based on the key value.
 */

function setUpdateImg(key){
  let images = [ "./img/gui/btn/sound_off.png", "./img/gui/btn/sound.png"];
  let img = document.getElementById("btnSound");
  img.src = images[key];
}

  /**
 * Toggles sound on and off.
 */
  function soundOn(){
    let btnSound = document.getElementById("btnSound");
    btnSound.addEventListener("touchend", (e) => {
      e.preventDefault();
      let img = document.getElementById("btnSound");
      if(world.sounds.volume == 1){
        world.sounds.volume = 0;
        world.sounds.backgroundMusic.volume = 0;
        loadVolume(); 
        updateVolume(0);
        img.src = "./img/gui/btn/sound_off.png";
      }
      else{
        world.sounds.volume = 1;
        world.sounds.backgroundMusic.volume = 1;
        loadVolume(); 
        updateVolume(1);
        img.src = "./img/gui/btn/sound.png";
      }
    });
  }

  /**
 * Event listener for turning sound off.
 */
  function soundOff(){
    let btnSound = document.getElementById("btnSound");
    btnSound.addEventListener("click", (e) => {
      e.preventDefault();
      let img = document.getElementById("btnSound");
      if(world.sounds.volume == 1){
        world.sounds.volume = 0;
        world.sounds.backgroundMusic.volume = 0;
        updateVolume(0);
        img.src = "./img/gui/btn/sound_off.png";
      }
      else{
        world.sounds.volume = 1;
        world.sounds.backgroundMusic.volume = 1;
        updateVolume(1);
        img.src = "./img/gui/btn/sound.png";
      }
    });
  }

  /**
 * Event listener for exiting the game.
 */
function exitGame(){
  let exit = document.getElementById("btnExit");
  exit.addEventListener("click", (e) => {
    e.preventDefault();
    world.ui.currentUI = 'exit';
  });
}

/**
 * Event listeners for the pause button.
 */
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

/**
 * Event listener for the controls button during pause.
 */
function clickOnControls(){
  let onPause = document.getElementById("btnInfo");
  onPause.addEventListener("click", (e) => {
    e.preventDefault(); 
    world.gamePaused = true;
    document.getElementById("controlsOnPauseMenu").style.display = "flex";
  });
}

/**
 * Event listener for resuming the game from pause.
 */
function resummeGame(){
  let resumme = document.getElementById("btnResume");
  resumme.addEventListener("click", (e) => {
    e.preventDefault();
    world.putGameOnPause();
  });
}

/**
 * Event listener for resuming the game from pause (second button).
 */
function resummeGame2(){
  let resumme = document.getElementById("btnResume2");
  resumme.addEventListener("click", (e) => {
    e.preventDefault();
    world.putGameOnPause();
  });
}

/**
 * Sets up mobile controls for the game.
 */
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

/**
 * Event listener for the fullscreen button. Toggles fullscreen mode for the canvas.
 */
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

/**
 * Enters fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

