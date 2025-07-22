// Game logic and state management

// Game state variables
let currentWidth;
let currentHeight;
let currentMythIndex = 0;
let currentMyth = null;
let shuffledMythList = [];
let score = 0;
let feedback = "";
let feedbackTimer = 0;
let feedbackData = null;
let gameState = GAME_STATES.START;
let endScreenTimer = 0;
let idleTimer = 0;
let gameEnding = false; // Track if we're waiting for final feedback to finish
let missedBalloons = []; // Track balloons that were missed (wrong button or flew away)
let usedBalloonColors = []; // Track used balloon colors to ensure no repeats
let mythSize;

// Explosion system
let explosions = [];

function createNextMyth() {
  if (currentMythIndex < shuffledMythList.length) {
    const mythItem = shuffledMythList[currentMythIndex];
    // Spawn balloons further below the screen (mythSize * 1.5 instead of just mythSize)
    currentMyth = new Myth(random(width * 0.2, width * 0.8), currentHeight + mythSize * 0.5, mythSize, mythItem.truth, mythItem.text);
    currentMythIndex++;
  } else {
    currentMyth = null;
    gameEnding = true;
  }
}

function startGame() {
  gameState = GAME_STATES.PLAYING;
  score = 0;
  currentMythIndex = 0;
  currentMyth = null;
  feedback = "";
  feedbackTimer = 0;
  feedbackData = null;
  gameEnding = false; // Reset the ending flag
  explosions = []; // Clear any existing explosions
  missedBalloons = []; // Clear missed balloons tracking
  usedBalloonColors = []; // Reset used colors for new game
  shuffledMythList = shuffle(MYTH_LIST);
  createNextMyth();
}

function handleBalloonHit(isSpacePressed) {
  if (!currentMyth || currentMyth.isOffScreen()) return;

  let correctAction = false;
  let isCorrectInput = false;

  if (isSpacePressed) {
    // Spacebar pressed - should be used for MYTHS (false)
    isCorrectInput = !currentMyth.truth;
  } else {
    // Enter pressed - should be used for TRUTHS (true)  
    isCorrectInput = currentMyth.truth;
  }

  if (isCorrectInput) {
    // Correct action
    score += SCORE_VALUES.CORRECT;
    feedbackData = {
      balloonX: currentMyth.x,
      balloonY: currentMyth.y,
      balloonSize: currentMyth.size,
      isCorrect: true,
      wasTruth: currentMyth.truth
    };
    correctAction = true;
    
    // Play pop sound for correct hit
    playPopSound();
  } else {
    // Wrong action
    score += SCORE_VALUES.WRONG_BUTTON;
    feedbackData = {
      balloonX: currentMyth.x,
      balloonY: currentMyth.y,
      balloonSize: currentMyth.size,
      isCorrect: false,
      wasTruth: currentMyth.truth,
      isEscapePenalty: false // This is a wrong button press, not escape
    };
    
    // Track this as a missed balloon
    missedBalloons.push({
      text: currentMyth.text,
      truth: currentMyth.truth,
      color: currentMyth.color,
      missType: 'WRONG_BUTTON'
    });
    
    // Play both pop (softer) and wrong sound for wrong button press
    playWrongWithPop();
  }

  // Create explosion at balloon location
  explosions.push(new Explosion(currentMyth.x, currentMyth.y, currentMyth.size));

  feedbackTimer = TIMING.FEEDBACK_DURATION;
  currentMyth.busted = true; // Mark as busted
  createNextMyth(); // Move to next balloon
} 