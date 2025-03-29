/**
 * Represents the state of the keyboard input for controlling a character in the game.
 * Tracks the status of various keys and whether they are pressed or released.
 */
class Keyboard {

      /**
     * Tracks whether the ESC key is pressed.
     * @type {boolean}
     */
  ESC = false;

    /**
     * Tracks whether the LEFT arrow key is pressed.
     * @type {boolean}
     */
  LEFT = false;

      /**
     * Tracks whether the RIGHT arrow key is pressed.
     * @type {boolean}
     */
  RIGHT = false;

      /**
     * Tracks whether the UP arrow key is pressed.
     * @type {boolean}
     */
  UP = false;

      /**
     * Tracks whether the DOWN arrow key is pressed.
     * @type {boolean}
     */
  DOWN = false;

      /**
     * Tracks whether the SPACE key is pressed.
     * @type {boolean}
     */
  SPACE = false;

      /**
     * Tracks whether the 'D' key is pressed.
     * @type {boolean}
     */
  D = false;

      /**
     * Tracks whether the 'S' key is pressed.
     * @type {boolean}
     */
  S = false;

      /**
     * Tracks whether the 'A' key is pressed.
     * @type {boolean}
     */
  A = false;

      /**
     * Creates an instance of the `Keyboard` class.
     * The constructor initializes the state of all keys to `false`, indicating that no key is pressed initially.
     */
  constructor() {
  }
}

