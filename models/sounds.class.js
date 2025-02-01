class Sounds {
    constructor(){
        this.jump = new Audio ("sounds/jump-up-245782.mp3");
        this.takeDamage = new Audio ("sounds/ouchmp3-14591.mp3");
        this.walk = new Audio("sounds/snow-step-3-81065.mp3");
        this.chickenDamage = new Audio("sounds/chicken-cluking-type-3-293320.mp3");
        this.collectBottle = new Audio("sounds/collect-5930.mp3");
    }
    playSoundForDuration(sound, duration = 500) {
        sound.play();
        setTimeout(() => {
            sound.pause();  
            sound.currentTime = 0;
        }, duration);
    }

    playJump() {
        this.playSoundForDuration(this.jump, 300); 
    }

    playTakeDamage() {
        this.playSoundForDuration(this.takeDamage, 500);
    }

    playWalk() {
        this.playSoundForDuration(this.walk, 500);
    }

    playChickenDamage() {
        this.playSoundForDuration(this.chickenDamage, 200);
    }
    playCollectBottle() {
        this.playSoundForDuration(this.collectBottle, 200);
    } 
}

