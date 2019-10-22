/**
 * SPACE INVADERS BY TYLER EIKENBERG
 */

//Initialize game space
const KEY_CODE_LEFT = 37; //get keycode for left key
const KEY_CODE_RIGHT = 39; //get keycode for right key
const KEY_CODE_SPACE = 32; //get keycode for spacebar
const GAME_SPACE_WIDTH = 1000; //set game space width
const GAME_SPACE_HEIGHT = 600; //set game space height
const PLAYER_WIDTH = 40; //set players ship width
const PLAYER_MAX_SPEED = 350;

//GAME_STATE sets the default players ship position
const GAME_STATE = {
  lastTime: Date.now(),
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
};

/**
 * function init creates the game container
 */
gameContainer = () => {
  const $container = document.querySelector('.game');
  createPlayer($container);
};

constrain = (input, min, max) => {
  if (input < min) {
    return min;
  } else if (input > max) {
    return max;
  } else {
    return input;
  }
};

updatePlayer = dt => {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
  }

  const $player = document.querySelector('.player');
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
  GAME_STATE.playerX = constrain(GAME_STATE.playerX, PLAYER_WIDTH, GAME_SPACE_WIDTH - PLAYER_WIDTH);
};

update = () => {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000;
  updatePlayer(dt);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
};

//function set position takes the element to be moved as an argument, and its x and y values
setPosition = (element, x, y) => {
  element.style.transform = `translate(${x}px, ${y}px)`;
};

/**
 * function createPlayer creates the players ship and sets them
 * in the middle of the game space.
 */
createPlayer = $container => {
  const $player = document.createElement('img');
  $player.src = 'images/spaceship.png';
  $player.className = 'player'; //adds class name 'player' to $player element
  $container.appendChild($player); //appends the $player element to the $container
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY); //calls setPosition to set the players default position
  GAME_STATE.playerX = GAME_SPACE_WIDTH / 2; //sets ship in the middle of the game space
  GAME_STATE.playerY = GAME_SPACE_HEIGHT - 100;
};

/**
 * Function onKeyDown checks to see which key is being pressed down
 * Left key, right key, or Spacebar
 */
onKeyDown = e => {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  }
};
/**
 * Function onKeyUp checks to see which key is being released
 * Left key, right key, or Spacebar
 */
onKeyUp = e => {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
};

gameContainer();
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
window.requestAnimationFrame(update);
