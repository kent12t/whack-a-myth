// Image variables
let backgroundImage;
let balloonImages = [];
let gameFont;
const balloonColors = ['darkblue', 'green', 'lightblue', 'midblue', 'orange', 'red', 'violet', 'yellow'];

// Preload function to load all images and font
function preload() {
  backgroundImage = loadImage('assets/city4d.jpg');
  gameFont = loadFont('assets/CircularStd-Bold.otf');

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
let gameState = "START"; // START, PLAYING, END
let endScreenTimer = 0;
let idleTimer = 0;
let gameEnding = false; // Track if we're waiting for final feedback to finish

// Color palette - Vibrant and happy!
const colors = {
  primary: '#6C5CE7',      // Vibrant purple
  secondary: '#FF6B9D',    // Hot pink
  accent: '#FF8A5B',       // Coral orange
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
  { text: "Aging always means\nchronic pains", truth: false },
  { text: "Your brain can grow\nnew cells at any age", truth: true },
  { text: "Aging means giving\nup on goals", truth: false },
  { text: "With aging comes\nfreedom and wisdom", truth: true },
  { text: "Hair colour doesn't\ndefine your age", truth: true },
  { text: "You must act\nyour age", truth: false }
];

const mythSize = 600;

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

  // Apply the custom font
  if (gameFont) {
    textFont(gameFont);
  }

  frameRate(60);
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
  } else if (gameState === "PLAYING") {
    drawGameScreen();
  } else if (gameState === "END") {
    drawEndScreen();
  }
}

function drawStartScreen() {
  // Semi-transparent overlay for better text readability
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);

  // Title
  fill(colors.white);
  textAlign(CENTER, CENTER);
  textSize(36);
  textStyle(BOLD);
  text("WHACK-A-MYTH", width / 2, height / 3);

  // Subtitle
  textSize(18);
  textStyle(NORMAL);
  fill(colors.background);
  text("Bust the myths, let truths pass!", width / 2, height / 3 + 50);

  // Instructions
  textSize(16);
  text("• Press SPACEBAR to whack MYTHS\n• Press ENTER to whack TRUTHS\n• Correct action = +1 point\n• Wrong action or letting balloons pass = -1 point", width / 2, height / 2 + 20);

  // Start button
  drawButton(width / 2, height * 0.75, 250, 50, "PRESS SPACEBAR OR ENTER TO START", colors.accent, colors.white);

  // Floating myth animation
  push();
  translate(width * 0.8, height * 0.2 + sin(frameCount * 0.05) * 10);
  rotate(sin(frameCount * 0.03) * 0.1);
  fill(colors.accent + '80');
  ellipse(0, 0, 60, 60);
  fill(colors.white);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("MYTH", 0, 0);
  pop();
}

function drawGameScreen() {
  // No additional background processing needed - using city4d image

  // Draw current myth if it exists
  if (currentMyth) {
    currentMyth.draw();

    // Check if current myth is off screen and create next one
    if (currentMyth.isOffScreen()) {
      // Handle scoring for balloons that passed by
      if (!currentMyth.busted) {
        // Any balloon that passes by without being hit is now penalized
        score--;
        if (currentMyth.truth) {
          feedback = "You let a TRUTH escape!\nYou should have pressed ENTER\n-1 point";
        } else {
          feedback = "You let a MYTH escape!\nYou should have pressed SPACEBAR\n-1 point";
        }
        feedbackTimer = 120;
      }

      // Always create next myth (or trigger end if no more myths)
      createNextMyth();
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

  // UI Header
  fill(colors.primary);
  rect(0, 0, width, 80);

  // Score display
  fill(colors.white);
  textSize(24);
  textAlign(LEFT, CENTER);
  text("Score: " + score, 20, 40);

  // Progress indicator
  textAlign(RIGHT, CENTER);
  text((currentMythIndex) + "/" + shuffledMythList.length, width - 20, 40);

  // Instructions
  fill(colors.text);
  textSize(14);
  textAlign(CENTER, TOP);
  text("SPACEBAR for MYTHS | ENTER for TRUTHS", width / 2, 90);

  // Display feedback
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }
}

function drawEndScreen() {
  // Semi-transparent overlay for better text readability
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  // Game Over title
  fill(colors.white);
  textAlign(CENTER, CENTER);
  textSize(32);
  textStyle(BOLD);
  text("GAME COMPLETE!", width / 2, height / 4);

  // Final score
  textSize(48);
  text(score, width / 2, height / 2 - 20);
  textSize(18);
  text("Final Score", width / 2, height / 2 + 20);

  // Performance message
  textSize(16);
  let message = "";
  if (score >= shuffledMythList.length * 0.8) {
    message = "Excellent myth-busting skills!";
    fill(colors.success);
  } else if (score >= shuffledMythList.length * 0.5) {
    message = "Good job! Keep practicing.";
    fill(colors.warning);
  } else {
    message = "Room for improvement!";
    fill(colors.accent);
  }
  text(message, width / 2, height / 2 + 50);

  // Restart button
  drawButton(width / 2, height * 0.75, 280, 50, "PRESS SPACEBAR OR ENTER TO RESTART", colors.accent, colors.white);

  // Idle timer display
  fill(colors.white);
  textSize(12);
  let timeLeft = Math.ceil((1800 - (1800 - endScreenTimer)) / 60);
  text("Returning to start in " + timeLeft + "s", width / 2, height * 0.9);

  // Handle idle timer
  endScreenTimer--;
  if (endScreenTimer <= 0) {
    gameState = "START";
  }
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
  textSize(14);
  textStyle(BOLD);
  text(label, x, y);
  textStyle(NORMAL);
}

function drawFeedback() {

  push();

  noStroke();
  // Smooth fading animation
  let fadeAlpha = map(feedbackTimer, 0, 120, 0, 255);
  fadeAlpha = constrain(fadeAlpha, 0, 255);

  // Feedback background with smooth fade
  fill(red(color(colors.white)), green(color(colors.white)), blue(color(colors.white)), fadeAlpha);
  rect(width / 4, height / 3, width / 2, 80, 10);

  // Feedback text with smooth fade
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);

  let textColor;
  if (feedback.includes("Wrong") || feedback.includes("escape")) {
    textColor = color(colors.accent);
  } else {
    textColor = color(colors.success);
  }

  fill(red(textColor), green(textColor), blue(textColor), fadeAlpha);
  text(feedback, width / 2, height / 3 + 40);
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
  gameEnding = false; // Reset the ending flag
  shuffledMythList = shuffle(mythList);
  createNextMyth();
}

function keyPressed() {
  if (key === ' ' || keyCode === ENTER) {
    if (gameState === "START") {
      startGame();
    } else if (gameState === "PLAYING") {
      if (currentMyth && !currentMyth.isOffScreen()) {
        // There's an active balloon on screen
        let correctAction = false;

        if (key === ' ') {
          // Spacebar pressed - should be used for MYTHS (false)
          if (!currentMyth.truth) {
            // Correctly whacked a myth
            score++;
            feedback = "Great! You whacked a MYTH!\n+1 point";
            correctAction = true;
          } else {
            // Wrong - tried to whack a truth with spacebar
            score--;
            feedback = "Wrong! That was a TRUTH!\nUse ENTER for truths\n-1 point";
          }
        } else if (keyCode === ENTER) {
          // Enter pressed - should be used for TRUTHS (true)
          if (currentMyth.truth) {
            // Correctly whacked a truth
            score++;
            feedback = "Excellent! You whacked a TRUTH!\n+1 point";
            correctAction = true;
          } else {
            // Wrong - tried to whack a myth with enter
            score--;
            feedback = "Wrong! That was a MYTH!\nUse SPACEBAR for myths\n-1 point";
          }
        }

        feedbackTimer = 120;
        currentMyth.busted = true; // Mark as busted
        createNextMyth(); // Move to next balloon
      }
    } else if (gameState === "END") {
      startGame();
    }
  }
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
    this.x = x;
    this.y = y;
    this.size = size;
    this.truth = truth;
    this.text = text;
    this.speed = random(2, 4);
    this.baseSpeed = this.speed;
    this.color = random(mythColors); // Keep for fallback
    this.balloonImage = random(balloonImages); // Random balloon image
    this.driftX = 0; // For brownian motion
    this.driftSpeed = random(0.5, 1.5); // How fast the drift changes
    this.busted = false; // Track if this myth was busted
    this.driftAmount = 0.5;
  }

  draw() {

    // Apply drift
    if (0.1 > random(0, 1)) {
      // Brownian motion - floating balloon effect change with random 10% chance
      this.driftX += random(-this.driftSpeed, this.driftSpeed);
      this.driftX = constrain(this.driftX, -this.driftAmount, this.driftAmount); // Limit horizontal drift
    }

    this.x += this.driftX;

    // Keep balloons within screen bounds
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);

    // Draw balloon image if available, otherwise fallback to circles
    if (this.balloonImage && balloonImages.length > 0) {
      // Main balloon image
      tint(255, 255, 255, 230);
      image(this.balloonImage, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      noTint(); // Reset tint
    } else {
      // Fallback to original circle drawing
      fill(0, 0, 0, 30);
      ellipse(this.x + 4, this.y + 4, this.size, this.size);

      fill(this.color + 'E6');
      ellipse(this.x, this.y, this.size, this.size);

      stroke(colors.white);
      strokeWeight(4);
      noFill();
      ellipse(this.x, this.y, this.size, this.size);
      noStroke();

      fill(this.color + '40');
      ellipse(this.x, this.y, this.size * 0.7, this.size * 0.7);
    }


    // Add text shadow effect
    fill(0, 0, 0, 100);
    textSize(20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.text, this.x + 2, this.y - this.size /7 + 2);

    // Myth text
    fill(colors.white);
    textSize(20); 
    text(this.text, this.x, this.y - this.size /7);
    textStyle(NORMAL);

    this.y -= this.speed;
  }

  isOffScreen() {
    // Consider balloons off-screen earlier (when they're still partially visible)
    return this.y < -this.size*0.1;
  }
}



