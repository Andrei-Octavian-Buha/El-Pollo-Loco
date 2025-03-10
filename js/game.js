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
    world.putGameOnPause();
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

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
