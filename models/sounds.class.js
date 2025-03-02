class Sounds {

    audios = [
        "../sounds/jump-up-245782.mp3",
        "../sounds/ouchmp3-14591.mp3",
        "../sounds/snow-step-3-81065.mp3",
        "../sounds/chicken-cluking-type-3-293320.mp3",
        "../sounds/collect-5930.mp3",
    ];

    constructor(){


    }

    cleanupSound(sound) {
        sound.pause();  // Stop the sound
        sound.currentTime = 0;  // Reset to the beginning
        sound.src = "";  // Clear the source to help release memory
    }

     playSoundForDuration(sound, duration) {
        let sounds = new Audio(sound);
        sounds.play();
        setTimeout(() => {
            this.cleanupSound(sounds);
        }, duration);
    }

    playJump() {
        this.playSoundForDuration(this.audios[0], 300); 
    }

    playTakeDamage() {
        this.playSoundForDuration(this.audios[1], 500);
    }

    playWalk() {
        this.playSoundForDuration(this.audios[2], 500);
    }

    playChickenDamage() {
        this.playSoundForDuration(this.audios[3], 200);
    }
    playCollectBottle() {
        this.playSoundForDuration(this.audios[4], 200);
    } 
}

