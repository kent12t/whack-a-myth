// Main game coordinator - imports all modules and manages p5.js lifecycle

function setup() {
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

function keyPressed() {
  if (key === ' ' || keyCode === ENTER) {
    switch (gameState) {
      case GAME_STATES.START:
        gameState = GAME_STATES.INSTRUCTION;
        break;
      case GAME_STATES.INSTRUCTION:
        startGame();
        break;
      case GAME_STATES.PLAYING:
        if (key === ' ') {
          handleBalloonHit(true); // Space pressed
        } else if (keyCode === ENTER) {
          handleBalloonHit(false); // Enter pressed
        }
        break;
      case GAME_STATES.END:
        startGame();
        break;
    }
  }
}



