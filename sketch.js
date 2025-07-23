// Main game coordinator - imports all modules and manages p5.js lifecycle
import { startGameSession, endGameSession, isDatabaseAvailable } from './database.js';

// Serial communication variables
let serial;
let latestData = "waiting for data";

// Database event handlers
window.onGameStart = async function() {
  const sessionId = await startGameSession();
  // Only log if database is actually available
  if (sessionId && isDatabaseAvailable()) {
    console.log('New game session started:', sessionId);
  }
};

window.onGameEnd = async function(finalScore) {
  const success = await endGameSession(finalScore);
  // Only log if database is actually available
  if (success && isDatabaseAvailable()) {
    console.log('Game session ended successfully with score:', finalScore);
  }
};

// Make p5.js functions globally available
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.windowResized = windowResized;
window.preload = preload;

function setup() {
  console.log('Setup started, gameState:', gameState);
  
  if (windowWidth / windowHeight > GAME_CONFIG.aspectRatio) {
    currentWidth = windowHeight * GAME_CONFIG.aspectRatio;
    currentHeight = windowHeight;
    createCanvas(currentWidth, currentHeight);
  } else {
    currentWidth = windowWidth;
    currentHeight = windowWidth / GAME_CONFIG.aspectRatio;
    createCanvas(currentWidth, currentHeight);
  }

  mythSize = width * 0.6;

  // Apply the custom font
  if (gameFont) {
    textFont(gameFont);
  }

  // Initialize serial communication
  initializeSerial();
  
  // Log database availability status only once
  if (isDatabaseAvailable()) {
    console.log('Database features enabled');
  }
  
  console.log('Setup completed, gameState:', gameState);
}

function windowResized() {
  if (windowWidth / windowHeight > GAME_CONFIG.aspectRatio) {
    currentWidth = windowHeight * GAME_CONFIG.aspectRatio;
    currentHeight = windowHeight;
  } else {
    currentWidth = windowWidth;
    currentHeight = windowWidth / GAME_CONFIG.aspectRatio;
  }
  resizeCanvas(currentWidth, currentHeight);
}

function draw() {
  // Draw background
  if (backgroundImage) {
    image(backgroundImage, 0, 0, width, height);
  } else {
    background(COLORS.background);
  }

  // Route to appropriate screen based on game state
  switch (gameState) {
    case GAME_STATES.START:
      drawStartScreen();
      break;
    case GAME_STATES.INSTRUCTION:
      drawInstructionScreen();
      break;
    case GAME_STATES.PLAYING:
      drawGameScreen();
      break;
    case GAME_STATES.END:
      drawEndScreen();
      break;
  }
}

// Handle AudioContext startup with user interaction
function startAudioContext() {
  if (getAudioContext().state !== 'running') {
    userStartAudio().then(() => {
      console.log('Audio context started');
      // Start background music on first user interaction (if not already playing)
      if (backgroundMusic && !backgroundMusic.isPlaying()) {
        startBackgroundMusic();
      }
    }).catch(err => {
      console.log('Failed to start audio context:', err);
    });
  } else {
    // Start background music on first user interaction (if not already playing)
    if (backgroundMusic && !backgroundMusic.isPlaying()) {
      startBackgroundMusic();
    }
  }
}

function keyPressed() {
  // Start audio context and background music on first user interaction
  startAudioContext();
  
  if (key === ' ' || keyCode === ENTER) {
    switch (gameState) {
      case GAME_STATES.START:
        gameState = GAME_STATES.INSTRUCTION;
        playUIProgressSound(); // Play pop sound for UI progression
        break;
      case GAME_STATES.INSTRUCTION:
        startGame();
        playUIProgressSound(); // Play pop sound for UI progression
        break;
      case GAME_STATES.PLAYING:
        if (key === ' ') {
          handleBalloonHit(true); // Space pressed
        } else if (keyCode === ENTER) {
          handleBalloonHit(false); // Enter pressed
        }
        break;
      case GAME_STATES.END:
        gameState = GAME_STATES.START;
        playUIProgressSound(); // Play pop sound for UI progression
        break;
    }
  }
}

// Serial communication functions
function initializeSerial() {
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  serial.list();

  // Open connection to Arduino on COM5
  serial.open("COM5");

  // Set up event callbacks
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  console.log(currentString);
  latestData = currentString;
  
  // Handle Arduino input for all game states
  if (currentString === "0" || currentString === "1") {
    // Start audio context and background music on first Arduino interaction
    startAudioContext();
    
    switch (gameState) {
      case GAME_STATES.START:
        gameState = GAME_STATES.INSTRUCTION;
        playUIProgressSound(); // Play pop sound for UI progression
        break;
      case GAME_STATES.INSTRUCTION:
        startGame();
        playUIProgressSound(); // Play pop sound for UI progression
        break;
      case GAME_STATES.PLAYING:
        if (currentString === "0") {
          handleBalloonHit(true); // Button 1 (wrong) should act like spacebar for MYTHS
        } else if (currentString === "1") {
          handleBalloonHit(false); // Button 2 (correct) should act like enter for TRUTHS
        }
        break;
      case GAME_STATES.END:
        gameState = GAME_STATES.START;
        playUIProgressSound(); // Play pop sound for UI progression
        break;
    }
  }
}



