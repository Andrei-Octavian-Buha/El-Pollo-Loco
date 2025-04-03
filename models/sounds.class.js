/**
 * A class responsible for managing and playing sounds in the application.
 * The class handles preloading, playing, and cleaning up sound effects.
 */
class Sounds {
        /**
     * An array of audio file paths for different sound effects.
     * @type {string[]}
     */
    audios = [
        "./sounds/jump-up-245782.mp3",
        "./sounds/ouchmp3-14591.mp3",
        "./sounds/snow-step-3-81065.mp3",
        "./sounds/chicken-cluking-type-3-293320.mp3",
        "./sounds/collect-5930.mp3",
        "./sounds/collect-points-190037.mp3",
        "./sounds/game-over-38511.mp3",
        "./sounds/level-win-6416.mp3",
    ];

    backgroundMusic = new Audio("./sounds/funky-and-jazzy-gang-loop-275533.mp3");
        /**
     * The volume level for sound playback (default is 1).
     * @type {number}
     */
    volume = 1;
   
        /**
     * Creates an instance of the `Sounds` class and preloads the sound files.
     */
    constructor(){
        this.preloadSounds();
        this.setupBackgroundMusic();
    }

    setupBackgroundMusic() {
        this.backgroundMusic.loop = true; // Set the background music to loop indefinitely
        this.backgroundMusic.volume = this.volume; // Apply the volume setting
    }
    
        /**
     * Preloads all the audio files by creating Audio objects for each sound file.
     */
    preloadSounds() {
        this.audios = this.audios.map(src => new Audio(src));
    }

        /**
     * Stops the sound, resets its time to 0, and effectively "cleans up" the sound.
     * 
     * @param {HTMLAudioElement} sound - The audio element to be cleaned up.
     */
    cleanupSound(sound) {
        sound.pause();  // Stop the sound
        sound.currentTime = 0;  // Reset to the beginning
    }

    /**
     * Plays a sound for a specified duration, then stops it after the given time.
     * 
     * @param {number} index - The index of the sound to play in the `audios` array.
     * @param {number} duration - The duration in milliseconds for which the sound should play.
     * @param {number} [volume=this.volume] - The volume level at which to play the sound (default is the object's `volume`).
     */
    playSoundForDuration(index, duration, volume = this.volume) {
        let sounds = this.audios[index];
        sounds.play();
        sounds.volume = volume;
        setTimeout(() => {
            this.cleanupSound(sounds);
        }, duration);
    }

        /**
     * Plays the "jump" sound effect for 300 milliseconds.
     */
    playJump() {
        this.playSoundForDuration(0, 300, this.volume); 
    }

        /**
     * Plays the "take damage" sound effect for 500 milliseconds.
     */
    playTakeDamage() {
        this.playSoundForDuration(1, 500, this.volume);
    }

        /**
     * Plays the "walk" sound effect for 350 milliseconds.
     */
    playWalk() {
        this.playSoundForDuration(2, 350, this.volume);
    }

        /**
     * Plays the "chicken damage" sound effect for 450 milliseconds.
     */
    playChickenDamage() {
        this.playSoundForDuration(3, 450, this.volume);
    }

        /**
     * Plays the "collect bottle" sound effect for 200 milliseconds.
     */
    playCollectBottle() {
        this.playSoundForDuration(4, 200, this.volume);
    } 
    playCollectCoins() {
        this.playSoundForDuration(5, 150, this.volume);
    } 
    playGameOver() {
        this.playSoundForDuration(6, 5000, this.volume);
    } 
    playGameWin() {
        this.playSoundForDuration(7, 3000, this.volume);
    } 
}



