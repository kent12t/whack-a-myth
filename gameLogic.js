// Game logic and state management

// Game state object to maintain state across modules
const gameState = {
  currentWidth: 0,
  currentHeight: 0,
  currentMythIndex: 0,
  currentMyth: null,
  shuffledMythList: [],
  score: 0,
  feedback: "",
  feedbackTimer: 0,
  feedbackData: null,
  state: GAME_STATES.START,
  endScreenTimer: 0,
  idleTimer: 0,
  gameEnding: false,
  missedBalloons: [],
  usedBalloonColors: [],
  mythSize: 0,
  explosions: []
};

// Make individual variables globally accessible for p5.js compatibility
Object.defineProperty(window, 'currentWidth', {
  get: () => gameState.currentWidth,
  set: (value) => gameState.currentWidth = value
});

Object.defineProperty(window, 'currentHeight', {
  get: () => gameState.currentHeight,
  set: (value) => gameState.currentHeight = value
});

Object.defineProperty(window, 'currentMythIndex', {
  get: () => gameState.currentMythIndex,
  set: (value) => gameState.currentMythIndex = value
});

Object.defineProperty(window, 'currentMyth', {
  get: () => gameState.currentMyth,
  set: (value) => gameState.currentMyth = value
});

Object.defineProperty(window, 'shuffledMythList', {
  get: () => gameState.shuffledMythList,
  set: (value) => gameState.shuffledMythList = value
});

Object.defineProperty(window, 'score', {
  get: () => gameState.score,
  set: (value) => gameState.score = value
});

Object.defineProperty(window, 'feedback', {
  get: () => gameState.feedback,
  set: (value) => gameState.feedback = value
});

Object.defineProperty(window, 'feedbackTimer', {
  get: () => gameState.feedbackTimer,
  set: (value) => gameState.feedbackTimer = value
});

Object.defineProperty(window, 'feedbackData', {
  get: () => gameState.feedbackData,
  set: (value) => gameState.feedbackData = value
});

Object.defineProperty(window, 'gameState', {
  get: () => gameState.state,
  set: (value) => gameState.state = value
});

Object.defineProperty(window, 'endScreenTimer', {
  get: () => gameState.endScreenTimer,
  set: (value) => gameState.endScreenTimer = value
});

Object.defineProperty(window, 'idleTimer', {
  get: () => gameState.idleTimer,
  set: (value) => gameState.idleTimer = value
});

Object.defineProperty(window, 'gameEnding', {
  get: () => gameState.gameEnding,
  set: (value) => gameState.gameEnding = value
});

Object.defineProperty(window, 'missedBalloons', {
  get: () => gameState.missedBalloons,
  set: (value) => gameState.missedBalloons = value
});

Object.defineProperty(window, 'usedBalloonColors', {
  get: () => gameState.usedBalloonColors,
  set: (value) => gameState.usedBalloonColors = value
});

Object.defineProperty(window, 'mythSize', {
  get: () => gameState.mythSize,
  set: (value) => gameState.mythSize = value
});

Object.defineProperty(window, 'explosions', {
  get: () => gameState.explosions,
  set: (value) => gameState.explosions = value
});

function createNextMyth() {
  if (gameState.currentMythIndex < gameState.shuffledMythList.length) {
    const mythItem = gameState.shuffledMythList[gameState.currentMythIndex];
    // Spawn balloons further below the screen (mythSize * 1.5 instead of just mythSize)
    gameState.currentMyth = new Myth(random(width * 0.2, width * 0.8), gameState.currentHeight + gameState.mythSize * 0.5, gameState.mythSize, mythItem.truth, mythItem.text);
    gameState.currentMythIndex++;
  } else {
    gameState.currentMyth = null;
    gameState.gameEnding = true;
    // Signal end game to main sketch
    if (window.onGameEnd) {
      window.onGameEnd(gameState.score);
    }
  }
}

function startGame() {
  gameState.state = GAME_STATES.PLAYING;
  gameState.score = 0;
  gameState.currentMythIndex = 0;
  gameState.currentMyth = null;
  gameState.feedback = "";
  gameState.feedbackTimer = 0;
  gameState.feedbackData = null;
  gameState.gameEnding = false; // Reset the ending flag
  gameState.explosions = []; // Clear any existing explosions
  gameState.missedBalloons = []; // Clear missed balloons tracking
  gameState.usedBalloonColors = []; // Reset used colors for new game
  gameState.shuffledMythList = shuffle(MYTH_LIST);
  
  // Signal start game to main sketch
  if (window.onGameStart) {
    window.onGameStart();
  }
  
  createNextMyth();
}

function handleBalloonHit(isSpacePressed) {
  if (!gameState.currentMyth || gameState.currentMyth.isOffScreen()) return;

  let correctAction = false;
  let isCorrectInput = false;

  if (isSpacePressed) {
    // Spacebar pressed - should be used for MYTHS (false)
    isCorrectInput = !gameState.currentMyth.truth;
  } else {
    // Enter pressed - should be used for TRUTHS (true)  
    isCorrectInput = gameState.currentMyth.truth;
  }

  if (isCorrectInput) {
    // Correct action
    gameState.score += SCORE_VALUES.CORRECT;
    gameState.feedbackData = {
      balloonX: gameState.currentMyth.x,
      balloonY: gameState.currentMyth.y,
      balloonSize: gameState.currentMyth.size,
      isCorrect: true,
      wasTruth: gameState.currentMyth.truth
    };
    correctAction = true;
    
    // Play pop sound for correct hit
    playPopSound();
  } else {
    // Wrong action
    gameState.score += SCORE_VALUES.WRONG_BUTTON;
    gameState.feedbackData = {
      balloonX: gameState.currentMyth.x,
      balloonY: gameState.currentMyth.y,
      balloonSize: gameState.currentMyth.size,
      isCorrect: false,
      wasTruth: gameState.currentMyth.truth,
      isEscapePenalty: false // This is a wrong button press, not escape
    };
    
    // Track this as a missed balloon
    gameState.missedBalloons.push({
      text: gameState.currentMyth.text,
      truth: gameState.currentMyth.truth,
      color: gameState.currentMyth.color,
      missType: 'WRONG_BUTTON'
    });
    
    // Play both pop (softer) and wrong sound for wrong button press
    playWrongWithPop();
  }

  // Create explosion at balloon location
  gameState.explosions.push(new Explosion(gameState.currentMyth.x, gameState.currentMyth.y, gameState.currentMyth.size));

  gameState.feedbackTimer = TIMING.FEEDBACK_DURATION;
  gameState.currentMyth.busted = true; // Mark as busted
  createNextMyth(); // Move to next balloon
}

// Make functions globally available
window.createNextMyth = createNextMyth;
window.startGame = startGame;
window.handleBalloonHit = handleBalloonHit; 