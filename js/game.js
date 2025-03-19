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

// document.addEventListener("DOMContentLoaded", () => {
//   // controlsMobile();
//   document.getElementById("startGame").addEventListener("click", (e) => {
//     e.preventDefault();
//     // world.ui.currentUI = "start";
//   });
//   document.getElementById("startGame").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     world.ui.currentUI = "start";
//   });

//   let btnSound = document.getElementById("btnSound");

//     btnSound.addEventListener("touchend", (e) => {
//     e.preventDefault();
//     let img = document.getElementById("btnSound");
//     if(world.sounds.volume == 1){
//       world.sounds.volume = 0;
//       img.src = "./img/gui/btn/sound_off.png";
//     }
//     else{
//       world.sounds.volume = 1;
//       img.src = "./img/gui/btn/sound.png";
//     }
//   });

//     btnSound.addEventListener("click", (e) => {
//       e.preventDefault();
//       let img = document.getElementById("btnSound");
//       if(world.sounds.volume == 1){
//         world.sounds.volume = 0;
//         img.src = "./img/gui/btn/sound_off.png";
//       }
//       else{
//         world.sounds.volume = 1;
//         img.src = "./img/gui/btn/sound.png";
//       }
//     });
//   });

// function controlsMobile(){
//   document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.LEFT = true;
//   });
//   document.getElementById("btnLeft").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.LEFT = false;
//   });

//   document.getElementById("btnRight").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.RIGHT = true;
//   });
//   document.getElementById("btnRight").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.RIGHT = false;
//   });

//   document.getElementById("btnJump").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.SPACE = true;
//   });
//   document.getElementById("btnJump").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.SPACE = false;
//   });

//   document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
//     e.preventDefault();
//     keyboard.D = true;
//   });
//   document.getElementById("btnThrow").addEventListener("touchend", (e) => {
//     e.preventDefault();
//     keyboard.D = false;
//   });
// }

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
