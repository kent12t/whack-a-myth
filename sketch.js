// Image variables
let backgroundImage;
let balloonImages = [];
let gameFont;
let explosionFrames = [];
const balloonColors = ['darkblue', 'green', 'midblue', 'orange', 'red', 'violet', 'yellow'];



// Explosion system
let explosions = [];

// Custom p5.js loading content
window.addEventListener('DOMContentLoaded', function () {
  // Override p5.js loading content
  const loadingElement = document.getElementById('p5_loading');
  if (loadingElement) {
    loadingElement.textContent = 'Loading...';
  }
});

// Preload function to load all images, font and explosion frames
function preload() {
  backgroundImage = loadImage('assets/city.jpg');
  gameFont = loadFont('assets/CircularStd-Bold.otf');
  startBtn = loadImage('assets/start.png');
  logo = loadImage('assets/logo.png');
  scoreBg = loadImage('assets/score.png');
  result = loadImage('assets/result.png');
  resultBg = loadImage('assets/result-bg.png');
  report = loadImage('assets/report.png');
  reportBg = loadImage('assets/report-bg.png');
  star = loadImage('assets/star.png');
  starShadow = loadImage('assets/star-shadow.png');
  instruction = loadImage('assets/instruction.png');
  instructionBg = loadImage('assets/instruction-bg.png');

  // Load explosion animation frames
  for (let i = 1; i <= 36; i++) {
    let frameNumber = str(i).padStart(3, '0'); // Convert to 3-digit format (004, 005, etc.)
    explosionFrames.push(loadImage(`assets/balloonpop2/frame_${frameNumber}.png`));
  }

  // Load all balloon images
  for (let color of balloonColors) {
    balloonImages.push(loadImage(`assets/${color}.png`));
  }
}

const myths = [];
const aspectRatio = 16 / 9;

let currentWidth;
let currentHeight;
let currentMythIndex = 0;
let currentMyth = null;
let shuffledMythList = [];
let score = 0;
let feedback = "";
let feedbackTimer = 0;
let feedbackData = null;
let gameState = "START"; // START, PLAYING, END
let endScreenTimer = 0;
let idleTimer = 0;
let gameEnding = false; // Track if we're waiting for final feedback to finish
let missedBalloons = []; // Track balloons that were missed (wrong button or flew away)

// Color palette - Vibrant and happy!
const colors = {
  primary: '#6C5CE7',      // Vibrant purple
  secondary: '#FF6B9D',    // Hot pink
  accent: '#ea5628',       // Coral orange
  success: '#00D2D3',      // Bright cyan
  warning: '#FDCB6E',      // Sunny yellow
  background: '#DDA0DD',   // Plum
  text: '#2D3436',         // Dark gray
  white: '#FFFFFF'
};

// Fun myth colors
const mythColors = [
  '#FF6B9D',  // Hot pink
  '#00D2D3',  // Bright cyan
  '#FF8A5B',  // Coral orange
  '#FDCB6E',  // Sunny yellow
  '#A29BFE',  // Soft purple
  '#FD79A8',  // Pink
  '#00B894',  // Emerald
  '#E17055'   // Terra cotta
];

const mythList = [
  { text: "Ageing always\nmeans\nchronic pains", truth: false },
  { text: "Your brain can\ngrow new cells\n at any age", truth: true },
  { text: "Ageing\nmeans giving\nup on goals", truth: false },
  { text: "With ageing\ncomes freedom\nand wisdom", truth: true },
  { text: "Hair colour\ndoesn't define\nyour age", truth: true },
  { text: "You must act\nyour age", truth: false }
];

// Scoring values
const SCORE_VALUES = {
  CORRECT: 20,
  WRONG_BUTTON: -10,
  FLY_AWAY: -5
};

// Game constants
const MAX_POSSIBLE_SCORE = SCORE_VALUES.CORRECT * 6;
const MIN_POSSIBLE_SCORE = SCORE_VALUES.WRONG_BUTTON * 6;
const SCORE_RANGE = MAX_POSSIBLE_SCORE - MIN_POSSIBLE_SCORE;

// Score thresholds for star rating
const SCORE_THRESHOLDS = {
  THREE_STARS: 40,
  TWO_STARS: 10,
  ONE_STAR: -15
};

// Track used balloon colors to ensure no repeats
let usedBalloonColors = [];

let mythSize;

function setup() {
  if (windowWidth / windowHeight > aspectRatio) {
    currentWidth = windowHeight * aspectRatio;
    currentHeight = windowHeight;
    createCanvas(currentWidth, currentHeight);
  } else {
    currentWidth = windowWidth;
    currentHeight = windowWidth / aspectRatio;
    createCanvas(currentWidth, currentHeight);
  }

  mythSize = width * 0.6;

  // Apply the custom font
  if (gameFont) {
    textFont(gameFont);
  }
}

function windowResized() {
  if (windowWidth / windowHeight > aspectRatio) {
    currentWidth = windowHeight * aspectRatio;
    currentHeight = windowHeight;
  } else {
    currentWidth = windowWidth;
    currentHeight = windowWidth / aspectRatio;
  }
  resizeCanvas(currentWidth, currentHeight);
}

function draw() {
  if (backgroundImage) {
    image(backgroundImage, 0, 0, width, height);
  } else {
    background(colors.background);
  }

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "INSTRUCTION") {
    drawInstructionScreen();
  } else if (gameState === "PLAYING") {
    drawGameScreen();
  } else if (gameState === "END") {
    drawEndScreen();
  }
}

function drawStartScreen() {
  push();
  imageMode(CENTER);

  // Start button
  let startBtnX = width / 2;
  let startBtnY = height * 0.8;
  let startBtnWidth = width * 0.25;
  let startBtnHeight = startBtnWidth * startBtn.height / startBtn.width;
  image(startBtn, startBtnX, startBtnY, startBtnWidth, startBtnHeight);

  // Title
  let logoX = width / 2;
  let logoY = height * 0.4 + sin(frameCount * 0.05) * 10;
  let logoWidth = width * 0.7;
  let logoHeight = logoWidth * logo.height / logo.width;
  image(logo, logoX, logoY, logoWidth, logoHeight);

  textSize(width * 0.02);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(colors.white);
  text("HAMMER ANY BUTTON TO START!", width / 2, height * 0.935);

  pop();
}

function drawInstructionScreen() {
  push();
  imageMode(CENTER);

  // Instruction image
  let instructionX = width / 2;
  let instructionY = height * 0.45;
  let instructionWidth = width * 0.85;
  let instructionHeight = instructionWidth * instruction.height / instruction.width;
  blendMode(MULTIPLY);
  image(instructionBg, instructionX, instructionY, instructionWidth, instructionHeight);
  blendMode(BLEND);
  image(instruction, instructionX, instructionY, instructionWidth, instructionHeight);


  // Yellow balloon (main balloon) - smooth upward floating
  let yellowBalloon = getAnimatedBalloon(width * 0.85, width * 0.3, 'yellow', 1, 1, 0, 5);
  drawBalloon(yellowBalloon.x, yellowBalloon.y, yellowBalloon.size, yellowBalloon.color, yellowBalloon.rotation);

  // Red balloon (0.6x size, milder motion, slightly to the right, offset timing)
  let redBalloon = getAnimatedBalloon(width * 0.9, width * 0.3 * 0.6, 'red', 0.8, 0.6, 80, 7);
  drawBalloon(redBalloon.x, redBalloon.y, redBalloon.size, redBalloon.color, redBalloon.rotation);

  // Violet balloon (1.2x size, slightly offset motion, at width*0.2, different timing)
  let violetBalloon = getAnimatedBalloon(width * 0.1, width * 0.3 * 1.2, 'violet', 0.9, 0.8, 300, 8);
  drawBalloon(violetBalloon.x, violetBalloon.y, violetBalloon.size, violetBalloon.color, violetBalloon.rotation);

  // Continue prompt
  textSize(width * 0.02);
  textStyle(BOLD);
  fill(colors.white);
  textAlign(CENTER, CENTER);
  text("HAMMER ANY BUTTON TO START!", width / 2, height * 0.935);

  pop();
}

function drawGameScreen() {
  push();
  // Draw current myth if it exists and hasn't been busted
  if (currentMyth && !currentMyth.busted) {
    currentMyth.draw();

    // Check if current myth is off screen and create next one
    if (currentMyth.isOffScreen()) {
      // Handle scoring for balloons that passed by
      if (!currentMyth.busted) {
        // Any balloon that passes by without being hit is now penalized
        score += SCORE_VALUES.FLY_AWAY;
        feedbackData = {
          balloonX: currentMyth.x,
          balloonY: currentMyth.y,
          balloonSize: currentMyth.size,
          isCorrect: false,
          wasTruth: currentMyth.truth,
          isEscapePenalty: true // Flag to indicate this is an escape penalty
        };
        feedbackTimer = 120;
        
        // Track this as a missed balloon
        missedBalloons.push({
          text: currentMyth.text,
          truth: currentMyth.truth,
          color: currentMyth.color,
          missType: 'FLY_AWAY'
        });
      }

      // Always create next myth (or trigger end if no more myths)
      createNextMyth();
    }
  }

  // Draw and update explosions
  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].draw();
    if (explosions[i].isComplete) {
      explosions.splice(i, 1); // Remove completed explosions
    }
  }

  // Check if game should end (when no feedback is showing and all myths processed)
  if (gameEnding) {
    if (feedbackTimer <= 0) {
      gameState = "END";
      endScreenTimer = 1800; // 30 seconds at 60fps
      gameEnding = false; // Reset flag
    }
  }

  // Display feedback
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }

  // Draw score
  imageMode(CENTER);
  image(scoreBg, width * 0.85, height * 0.1, width * 0.2, width * 0.2 * (scoreBg.height / scoreBg.width));
  textSize(width * 0.0292);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(colors.white);
  text(score, width * (0.85 + 0.068), height * (0.1 - 0.017));
  pop();
}

function drawStarRating(xPos, yPos) {
  let starCount = 0;

  // Evaluate from highest star rating down to lowest
  if (score >= SCORE_THRESHOLDS.THREE_STARS) {
    starCount = 3;
  } else if (score >= SCORE_THRESHOLDS.TWO_STARS) {
    starCount = 2;
  } else if (score >= SCORE_THRESHOLDS.ONE_STAR) {
    starCount = 1;
  }

  // Star positioning
  let starY = yPos;
  let starSize = width * 0.11;
  let starSpacing = starSize * 1.2;
  let centerX = xPos;

  // Star positions (left, center, right)
  let starPositions = [
    { x: centerX - starSpacing, rotation: -0.15, y: starY + starSize * 0.1 }, // Left star (counter-clockwise)
    { x: centerX, rotation: 0, y: starY - starSize * 0.1 },                   // Center star (no rotation)
    { x: centerX + starSpacing, rotation: 0.15, y: starY + starSize * 0.1 }   // Right star (clockwise)
  ];

  push();
  imageMode(CENTER);

  // Draw all star shadows first
  for (let i = 0; i < 3; i++) {
    let pos = starPositions[i];
    push();
    translate(pos.x, pos.y);
    rotate(pos.rotation);
    image(starShadow, 0, 0, starSize, starSize);
    pop();
  }

  // Draw actual stars based on score
  for (let i = 0; i < starCount; i++) {
    let pos = starPositions[i];
    push();
    translate(pos.x, pos.y);
    rotate(pos.rotation);
    image(star, 0, 0, starSize, starSize);
    pop();
  }

  pop();
}

function drawEndScreen() {
  push();
  imageMode(CENTER);

  // Determine if we have a perfect score (no missed balloons)
  let isPerfectScore = missedBalloons.length === 0;
  
  if (isPerfectScore) {
    // Perfect score - center the result section
    blendMode(MULTIPLY);
    image(resultBg, width * 0.5, height / 2, height * 0.7 * (resultBg.width / resultBg.height), height * 0.7);
    blendMode(BLEND);
    image(result, width * 0.5, height / 2, height * 0.7 * (result.width / result.height), height * 0.7);
  } else {
    // Has missed balloons - show both result and report sections
    // Result section - centered on width * 0.3
    blendMode(MULTIPLY);
    image(resultBg, width * 0.3, height / 2, height * 0.7 * (resultBg.width / resultBg.height), height * 0.7);
    blendMode(BLEND);
    image(result, width * 0.3, height / 2, height * 0.7 * (result.width / result.height), height * 0.7);

    // Report section - centered on width * 0.75
    blendMode(MULTIPLY);
    image(reportBg, width * 0.75, height / 2, height * 0.7 * (reportBg.width / reportBg.height), height * 0.7);
    blendMode(BLEND);
    image(report, width * 0.75, height / 2, height * 0.7 * (report.width / report.height), height * 0.7);
  }

  pop();

  // Draw star rating at top of screen - adjust position based on layout
  let starX = isPerfectScore ? width * 0.5 : width * 0.3;
  drawStarRating(starX, height * 0.15);

  // Display score - adjust position based on layout
  fill(colors.white);
  textSize(width * 0.0375);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  let scoreX = isPerfectScore ? width * 0.505 : width * 0.305;
  text(score, scoreX, height * 0.485);

  // Draw missed balloons in report section (only if there are any)
  if (!isPerfectScore) {
    drawMissedBalloons();
  }

  // Idle timer display
  fill(colors.white);
  textSize(width * 0.02);
  text("HAMMER ANY BUTTON TO RESTART", width / 2, height * 0.92);
  textSize(width * 0.01);
  textAlign(CENTER, CENTER);
  let timeLeft = Math.ceil((1800 - (1800 - endScreenTimer)) / 60);
  text("Auto-restarting in " + timeLeft + "s", width / 2, height * 0.965);

  // Handle idle timer
  endScreenTimer--;
  if (endScreenTimer <= 0) {
    gameState = "START";
  }
}

function drawMissedBalloons() {
  if (missedBalloons.length === 0) return;

  // Calculate grid layout (2 columns, up to 3 rows)
  const cols = 2;
  const maxRows = 3;
  const maxBalloons = cols * maxRows;
  
  // Use only the first 6 missed balloons if there are more
  const balloonsToShow = missedBalloons.slice(0, maxBalloons);
  
  // Calculate balloon size and spacing
  const reportCenterX = width * 0.75;
  const reportCenterY = height / 2;
  const reportWidth = height * 0.7 * (reportBg.width / reportBg.height) * 0.9;
  const reportHeight = height * 0.7 * 0.8;
  
  // Calculate rows needed
  const rows = Math.ceil(balloonsToShow.length / cols);
  
  // Balloon size - make them larger and account for overlap zones
  // Balloons can overlap: 10% top, 30% left/right, 40% bottom
  let balloonSize = reportWidth * 1.5; // Start with a more reasonable base size
  
  // Spacing between balloon centers (accounting for safe overlap)
  let verticalSpacing = balloonSize * 0.45;   // Slightly more vertical gap for better appearance
  
  // Calculate total grid height and ensure it fits in safe zone
  let gridHeight = (rows - 1) * verticalSpacing + balloonSize;
  
  // If grid is too tall, reduce spacing first, then balloon size as last resort
  if (gridHeight > reportHeight) {
    // First try reducing vertical spacing more aggressively with honeycomb packing
    verticalSpacing = balloonSize * 0.35; // More conservative overlap to maintain gap
    gridHeight = (rows - 1) * verticalSpacing + balloonSize;
    
    // If still too tall, then scale balloon size but less aggressively
    if (gridHeight > reportHeight) {
      const scaleFactor = reportHeight / gridHeight * 0.98; // 95% instead of 90% for less aggressive scaling
      balloonSize *= scaleFactor;
      verticalSpacing = balloonSize * 0.35;
      gridHeight = (rows - 1) * verticalSpacing + balloonSize;
    }
  }
  
  // Grid positioning - center the entire grid accounting for honeycomb offset
  const gridWidth = (cols - 1) * (balloonSize * 0.7);
  
  // Calculate horizontal offset adjustment for honeycomb pattern
  let horizontalAdjustment = 0;
  if (balloonsToShow.length >= 4) {
    // For 4+ balloons, shift left to compensate for honeycomb offset pushing right
    horizontalAdjustment = -(balloonSize * 0.7) / 4; // Quarter of the offset back to left
  }
  
  const startX = reportCenterX - gridWidth / 2 + horizontalAdjustment;
  const startY = reportCenterY - gridHeight / 2 + reportHeight * 0.35; // Shift down
  
  push();
  
  for (let i = 0; i < balloonsToShow.length; i++) {
    const balloon = balloonsToShow[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    // Calculate position using the updated spacing with honeycomb offset
    let baseX = startX + col * (balloonSize * 0.7);
    
    // Offset odd rows horizontally for tighter packing (honeycomb pattern)
    if (row % 2 === 1) {
      baseX += (balloonSize * 0.7) / 2; // Shift odd rows by half the horizontal spacing
    }
    
    const baseY = startY + row * verticalSpacing;
    
    // Add animated sine wave bounce with offset for each balloon
    const timeOffset = i * 30; // Different phase for each balloon
    const bounceY = sin((frameCount + timeOffset) * 0.08) * 8;
    const bounceX = cos((frameCount + timeOffset) * 0.06) * 4;
    
    const x = baseX + bounceX;
    const y = baseY + bounceY;
    
    // Draw balloon
    push();
    imageMode(CENTER);
    
    // Get balloon image index
    const balloonImageIndex = balloonColors.indexOf(balloon.color);
    if (balloonImageIndex >= 0) {
      image(balloonImages[balloonImageIndex], x, y, balloonSize * 0.8, balloonSize * 0.8);
    }
    
    // Draw myth/truth text on balloon
    textAlign(CENTER, CENTER);
    textSize(balloonSize * 0.035);
    
    // Text shadow
    fill(0, 0, 0, 100);
    textStyle(BOLD);
    text(balloon.text, x + 1, y - balloonSize * 0.1 + 1);
    
         // Main text
     fill(colors.white);
     text(balloon.text, x, y - balloonSize * 0.1);
     
     pop();

     // Draw label top left of balloon
     push();
     const labelX = x - balloonSize * 0.1;
     const labelY = y - balloonSize * 0.225;
     
     // Move to label position first, then rotate
     translate(labelX, labelY);
     rotate(-PI / 6); // Slightly less rotation for better readability
     
     textAlign(CENTER, CENTER);
     textSize(balloonSize * 0.03);
     textStyle(BOLD);
     
     // Label with stroke
     stroke(colors.white);
     strokeWeight(width* 0.0015);
     fill('#2e3192');
     
     if (balloon.truth) {
       text("THIS IS\nTHE TRUTH!", 0, 0);
     } else {
       text("THIS IS\nA MYTH!", 0, 0);
     }
     
     pop();
  }
  
  pop();
}

function drawButton(x, y, w, h, label, bgColor, textColor) {
  // Button shadow
  fill(0, 0, 0, 30);
  rect(x - w / 2 + 3, y - h / 2 + 3, w, h, 8);

  // Button background
  fill(bgColor);
  rect(x - w / 2, y - h / 2, w, h, 8);

  // Button text
  fill(textColor);
  textAlign(CENTER, CENTER);
  textSize(width * 0.0073);
  textStyle(BOLD);
  text(label, x, y);
  textStyle(NORMAL);
}

function drawFeedback() {
  if (!feedbackData) return;

  push();
  noStroke();

  // Smooth fading animation
  let fadeAlpha = map(feedbackTimer, 0, 120, 0, 255);
  fadeAlpha = constrain(fadeAlpha, 0, 255);

  // Calculate feedback position based on balloon position
  let feedbackX = feedbackData.balloonX;
  let feedbackY = feedbackData.balloonY - feedbackData.balloonSize * 0.2; // Slightly above balloon

  // Adjust X position to avoid going off screen
  if (feedbackData.balloonX > width / 2) {
    // Balloon on right side, show feedback to the left
    feedbackX = feedbackData.balloonX - feedbackData.balloonSize * 0.2;
  } else {
    // Balloon on left side, show feedback to the right
    feedbackX = feedbackData.balloonX + feedbackData.balloonSize * 0.2;
  }

  // Scoreboard bounds (center at width * 0.85, height * 0.1, size width * 0.2)
  let scoreboardLeft = width * 0.85 - (width * 0.2) / 2;
  let scoreboardRight = width * 0.85 + (width * 0.2) / 2;
  let scoreboardTop = height * 0.1 - (width * 0.2 * (scoreBg.height / scoreBg.width)) / 2;
  let scoreboardBottom = height * 0.1 + (width * 0.2 * (scoreBg.height / scoreBg.width)) / 2;

  // Check if feedback would overlap with scoreboard and adjust
  if (feedbackX > scoreboardLeft - 100 && feedbackX < scoreboardRight + 100 &&
    feedbackY > scoreboardTop - 50 && feedbackY < scoreboardBottom + 50) {
    // Move feedback away from scoreboard
    if (feedbackData.balloonX > width * 0.75) {
      feedbackX = scoreboardLeft - 120; // Move to left of scoreboard
    } else {
      feedbackY = scoreboardBottom + 80; // Move below scoreboard
    }
  }

  // Keep feedback within screen bounds
  feedbackX = constrain(feedbackX, 80, width - 80);
  feedbackY = constrain(feedbackY, 60, height - 60);

  // Feedback text with smooth fade using colors.accent
  textAlign(CENTER, CENTER);
  fill(red(color(colors.accent)), green(color(colors.accent)), blue(color(colors.accent)), fadeAlpha);

  if (feedbackData.isCorrect) {
    // Correct feedback
    textSize(width * 0.0208);
    textStyle(BOLD);
    text("You got it!", feedbackX, feedbackY - width * 0.011);

    textSize(width * 0.025);
    text(`+${SCORE_VALUES.CORRECT} points`, feedbackX, feedbackY + width * 0.011);
  } else {
    // Wrong feedback
    textSize(width * 0.0208);
    textStyle(BOLD);
    text("Oops!", feedbackX, feedbackY - width * 0.011);

    textSize(width * 0.018);
    textStyle(NORMAL);
    let truthType = feedbackData.wasTruth ? "Truth" : "Myth";

    if (feedbackData.isEscapePenalty) {
      text(`You let a ${truthType} fly away`, feedbackX, feedbackY + width * 0.011);
    } else {
      text(`This one's actually a ${truthType}`, feedbackX, feedbackY + width * 0.011);
    }
  }

  textStyle(NORMAL);
  pop();
}

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
  gameState = "PLAYING";
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
  shuffledMythList = shuffle(mythList);
  createNextMyth();
}

function keyPressed() {
  if (key === ' ' || keyCode === ENTER) {
    if (gameState === "START") {
      gameState = "INSTRUCTION";
    } else if (gameState === "INSTRUCTION") {
      startGame();
    } else if (gameState === "PLAYING") {
      if (currentMyth && !currentMyth.isOffScreen()) {
        // There's an active balloon on screen
        let correctAction = false;

        if (key === ' ') {
          // Spacebar pressed - should be used for MYTHS (false)
          if (!currentMyth.truth) {
            // Correctly whacked a myth
            score += SCORE_VALUES.CORRECT;
            feedbackData = {
              balloonX: currentMyth.x,
              balloonY: currentMyth.y,
              balloonSize: currentMyth.size,
              isCorrect: true,
              wasTruth: currentMyth.truth
            };
            correctAction = true;
          } else {
            // Wrong - tried to whack a truth with spacebar
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
          }
        } else if (keyCode === ENTER) {
          // Enter pressed - should be used for TRUTHS (true)
          if (currentMyth.truth) {
            // Correctly whacked a truth
            score += SCORE_VALUES.CORRECT;
            feedbackData = {
              balloonX: currentMyth.x,
              balloonY: currentMyth.y,
              balloonSize: currentMyth.size,
              isCorrect: true,
              wasTruth: currentMyth.truth
            };
            correctAction = true;
          } else {
            // Wrong - tried to whack a myth with enter
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
          }
        }

        // Create explosion at balloon location
        explosions.push(new Explosion(currentMyth.x, currentMyth.y, currentMyth.size));

        feedbackTimer = 90;
        currentMyth.busted = true; // Mark as busted
        createNextMyth(); // Move to next balloon
      }
    } else if (gameState === "END") {
      startGame();
    }
  }
}

function drawBalloon(x, y, size, color, rotation = 0) {
  push();
  translate(x, y);
  rotate(rotation);
  imageMode(CENTER);
  image(balloonImages[balloonColors.indexOf(color)], 0, 0, size, size);
  pop();
}

function getAnimatedBalloon(baseX, baseSize, color, speedMultiplier = 1, motionMultiplier = 1, heightOffset = 0, rotationLag = 5, currentY = null) {
  let x = baseX + sin(frameCount * 0.04 * speedMultiplier) * (10 * motionMultiplier);
  
  let y;
  if (currentY !== null) {
    // For game balloons, use the provided Y position
    y = currentY;
  } else {
    // For instruction screen balloons, create smooth upward movement with respawning
    let totalHeight = height + baseSize * 0.5; // Reduce the cycle height for faster respawn
    let rawY = (frameCount * 2 * speedMultiplier + heightOffset) % (totalHeight + 50);
    y = height + baseSize * 0.3 - rawY; // Start closer to screen bottom for quicker appearance
  }
  
  let rotation = cos((frameCount - rotationLag) * 0.04 * speedMultiplier) * (0.1 * motionMultiplier);

  return { x, y, size: baseSize, color, rotation };
}

class Myth {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} size
   * @param {boolean} truth
   * @param {string} text
   */

  constructor(x, y, size, truth, text) {
    this.baseX = x; // Store original X position for animation
    this.x = x;
    this.y = y;
    this.size = size;
    this.truth = truth;
    this.text = text;
    this.normalSpeed = random(2 * (height / 1080), 3 * (height / 1080)); // Normal speed for upper screen
    this.fastSpeed = 4 * (height / 1080); // Fast speed for lower 10% of screen
    this.speed = this.fastSpeed; // Start with fast speed since balloons spawn from bottom
    
    // Select a unique balloon color
    let availableColors = balloonColors.filter(color => !usedBalloonColors.includes(color));
    
    // If all colors have been used, reset the used colors array
    if (availableColors.length === 0) {
      usedBalloonColors = [];
      availableColors = [...balloonColors];
    }
    
    this.color = random(availableColors);
    usedBalloonColors.push(this.color);
    
    this.busted = false; // Track if this myth was busted
    this.motionMultiplier = random(0.4, 0.8); // Random motion intensity
    this.rotationLag = random(3, 8); // Random rotation lag
  }

  draw() {
    // Adjust speed based on Y position - use fast speed in lower 10% of screen
    if (this.y > height * 0.93) {
      this.speed = this.fastSpeed; // Fast speed in lower 10%
    } else {
      this.speed = this.normalSpeed; // Normal speed in upper 90%
    }
    
    // Update position using getAnimatedBalloon for consistent motion
    this.y -= this.speed; // Continue upward movement

    // Get animated balloon properties (swaying and rotation)
    let animatedProps = getAnimatedBalloon(this.baseX, this.size, this.color, 1, this.motionMultiplier, 0, this.rotationLag, this.y);
    this.x = animatedProps.x;

    // Keep balloons within screen bounds
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);

    // Draw both balloon and text with rotation around text center (this.y - this.size / 7)
    push();
    translate(this.x, this.y - this.size / 7); // Move to text center (the pivot point)
    rotate(animatedProps.rotation); // Apply rotation

    // Draw balloon offset from the text center
    push();
    translate(0, this.size / 7); // Move balloon back to its position relative to text
    imageMode(CENTER);
    image(balloonImages[balloonColors.indexOf(this.color)], 0, 0, this.size, this.size);
    pop();

    // Add text shadow effect
    blendMode(MULTIPLY);
    fill(0, 0, 0, 100);
    textSize(this.size * 0.04);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.text, 2, 2); // Offset for shadow effect

    // Myth text
    blendMode(BLEND);
    fill(colors.white);
    textSize(this.size * 0.04);
    text(this.text, 0, 0); // Centered at origin after translate
    textStyle(NORMAL);

    pop();
  }

  isOffScreen() {
    // Consider balloons off-screen earlier (when they're still partially visible)
    return this.y < -this.size * 0.1;
  }
}

class Explosion {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.startTime = millis();
    this.frameDuration = 12;
    this.totalFrames = explosionFrames.length;
    this.duration = this.totalFrames * this.frameDuration;
    this.isComplete = false;
  }

  draw() {
    if (this.isComplete) return;

    let elapsed = millis() - this.startTime;
    if (elapsed >= this.duration) {
      this.isComplete = true;
      return;
    }

    // Calculate which frame to show
    let frameIndex = Math.floor(elapsed / this.frameDuration);
    frameIndex = constrain(frameIndex, 0, this.totalFrames - 1);

    // Draw the current explosion frame
    if (explosionFrames[frameIndex]) {
      push();
      translate(this.x, this.y);

      // Calculate proper 16:9 aspect ratio dimensions
      let explosionScale = this.size * 0.6; // Scale factor for explosion size
      let explosionWidth = explosionScale * (16 / 9); // Width based on 16:9 ratio
      let explosionHeight = explosionScale; // Height

      // Draw explosion frame centered at the explosion point with correct aspect ratio
      image(explosionFrames[frameIndex], -explosionWidth / 2, -explosionHeight * 0.7, explosionWidth, explosionHeight);

      pop();
    }
  }
}



