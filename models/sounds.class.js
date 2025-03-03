class Sounds {

    audios = [
        "./sounds/jump-up-245782.mp3",
        "./sounds/ouchmp3-14591.mp3",
        "./sounds/snow-step-3-81065.mp3",
        "./sounds/chicken-cluking-type-3-293320.mp3",
        "./sounds/collect-5930.mp3",
    ];
    volume = 1;
    
    constructor(){
        this.preloadSounds();
    }

    preloadSounds() {
        this.audios = this.audios.map(src => new Audio(src));
    }
    cleanupSound(sound) {
        sound.pause();  // Stop the sound
        sound.currentTime = 0;  // Reset to the beginning
    }

     playSoundForDuration(index, duration, volume = this.volume) {
        let sounds = this.audios[index];
        sounds.play();
        sounds.volume = volume;
        setTimeout(() => {
            this.cleanupSound(sounds);
        }, duration);
    }

    playJump() {
        this.playSoundForDuration(0, 300, this.volume); 
    }

    playTakeDamage() {
        this.playSoundForDuration(1, 500, this.volume);
    }

    playWalk() {
        this.playSoundForDuration(2, 350, this.volume);
    }

    playChickenDamage() {
        this.playSoundForDuration(3, 450, this.volume);
    }
    playCollectBottle() {
        this.playSoundForDuration(4, 200, this.volume);
    } 
}

