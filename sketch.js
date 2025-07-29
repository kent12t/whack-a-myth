// Main game coordinator - imports all modules and manages p5.js lifecycle
import { startGameSession, endGameSession, isDatabaseAvailable } from './database.js';

// Serial communication variables
let port;
let latestData = "";
let connectionAttempted = false;
let lastConnectionCheck = 0;

// Database event handlers
window.onGameStart = async function () {
  const sessionId = await startGameSession();
  // Only log if database is actually available
  if (sessionId && isDatabaseAvailable()) {
    console.log('New game session started:', sessionId);
  }
};

window.onGameEnd = async function (finalScore) {
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
window.mousePressed = mousePressed;
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

  // Check for serial data every frame
  checkSerialData();
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

  // Arduino connection shortcut - press 'C' to connect (for debugging)
  if (key === 'c' || key === 'C') {
    if (!port.opened()) {
      console.log("⌨️ 'C' pressed - Opening Arduino connection...");
      connectArduino();
    } else {
      console.log("✅ Arduino already connected!");
    }
    return; // Don't process other game logic
  }

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
  // Create a new serial port instance
  port = createSerial();

  // Try to automatically connect to previously used Arduino
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    console.log("Connecting to previously used port:", usedPorts[0]);
    port.open(usedPorts[0], 9600);
    connectionAttempted = true;
  }

  // Set up connection monitoring
  setInterval(monitorConnection, 5000); // Check every 5 seconds
}

function monitorConnection() {
  if (!port.opened() && connectionAttempted) {
    console.log("Connection lost. Attempting to reconnect...");
    attemptReconnection();
  }
}

function attemptReconnection() {
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    console.log("Trying to reconnect to:", usedPorts[0]);
    port.open(usedPorts[0], 9600);
  }
}

function connectArduino() {
  console.log("🔌 Attempting to connect to Arduino...");
  try {
    port.open(9600);
    connectionAttempted = true;
    console.log("✅ Port.open() called successfully");
  } catch (error) {
    console.error("❌ Error opening port:", error);
    try {
      port.open('Arduino', 9600);
      console.log("✅ Arduino-filtered port.open() called");
    } catch (error2) {
      console.error("❌ Error with Arduino filter:", error2);
    }
  }
}

// Mouse handler - no automatic Arduino connection prompts
function mousePressed() {
  // Arduino connection shortcut - press 'C' to connect (for debugging)

  if (!port.opened()) {
    console.log("⌨️ 'C' pressed - Opening Arduino connection...");
    connectArduino();
  } else {
    console.log("✅ Arduino already connected!");
  }
  return; // Don't process other game logic

}

// Enhanced serial data checking with connection status
function checkSerialData() {
  if (port.opened()) {
    // Reset connection check timer when we have an active connection
    lastConnectionCheck = millis();

    if (port.available() > 0) {
      let currentString = port.readUntil('\n');

      if (currentString.length > 0) {
        // Remove whitespace and newline characters
        currentString = currentString.trim();

        if (currentString) {
          console.log("Received:", currentString);
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
      }
    }

  } else {
    // No UI prompts - connection handled silently
  }
}



