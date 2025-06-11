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

const mythSize = 80;

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
  background(colors.background);
  
  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAYING") {
    drawGameScreen();
  } else if (gameState === "END") {
    drawEndScreen();
  }
}

function drawStartScreen() {
  // Gradient background effect
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(colors.secondary), color(colors.primary), inter);
    stroke(c);
    line(0, i, width, i);
  }
  noStroke(); // Reset stroke
  
  // Title
  fill(colors.white);
  textAlign(CENTER, CENTER);
  textSize(36);
  textStyle(BOLD);
  text("WHACK-A-MYTH", width/2, height/3);
  
  // Subtitle
  textSize(18);
  textStyle(NORMAL);
  fill(colors.background);
  text("Bust the myths, let truths pass!", width/2, height/3 + 50);
  
  // Instructions
  textSize(16);
  text("• Press SPACEBAR to bust myths\n• Let truths float by untouched\n• Each correct action = +1 point\n• Each mistake = -1 point", width/2, height/2 + 20);
  
  // Start button
  drawButton(width/2, height*0.75, 200, 50, "PRESS SPACEBAR TO START", colors.accent, colors.white);
  
  // Floating myth animation
  push();
  translate(width*0.8, height*0.2 + sin(frameCount*0.05)*10);
  rotate(sin(frameCount*0.03)*0.1);
  fill(colors.accent + '80');
  ellipse(0, 0, 60, 60);
  fill(colors.white);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("MYTH", 0, 0);
  pop();
}

function drawGameScreen() {
  // Gradient background effect
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(colors.background), color(colors.primary), inter);
    stroke(c);
    line(0, i, width, i);
  }
  noStroke(); // Reset stroke to prevent bleeding
  
  // Draw current myth if it exists
  if (currentMyth) {
    currentMyth.draw();
    
    // Check if current myth is off screen and create next one
    if (currentMyth.isOffScreen()) {
      // Handle scoring for myths that passed by
      if (!currentMyth.busted) {
        if (currentMyth.truth) {
          // Truth passed by correctly - gain a point
          score++;
          feedback = "Good! You let a TRUTH pass!\n+1 point";
          feedbackTimer = 120;
        } else {
          // False myth escaped - lose a point
          score--;
          feedback = "You let a MYTH escape!\n-1 point";
          feedbackTimer = 120;
        }
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
  text((currentMythIndex) + "/" + shuffledMythList.length, width-20, 40);
  
  // Instructions
  fill(colors.text);
  textSize(14);
  textAlign(CENTER, TOP);
  text("Press SPACEBAR to bust myths! Let truths pass by.", width/2, 90);
  
  // Display feedback
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }
}

function drawEndScreen() {
  // Gradient background
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(colors.success), color(colors.primary), inter);
    stroke(c);
    line(0, i, width, i);
  }
  noStroke(); // Reset stroke
  
  // Game Over title
  fill(colors.white);
  textAlign(CENTER, CENTER);
  textSize(32);
  textStyle(BOLD);
  text("GAME COMPLETE!", width/2, height/4);
  
  // Final score
  textSize(48);
  text(score, width/2, height/2 - 20);
  textSize(18);
  text("Final Score", width/2, height/2 + 20);
  
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
  text(message, width/2, height/2 + 50);
  
  // Restart button
  drawButton(width/2, height*0.75, 250, 50, "PRESS SPACEBAR TO RESTART", colors.accent, colors.white);
  
  // Idle timer display
  fill(colors.white);
  textSize(12);
  let timeLeft = Math.ceil((1800 - (1800 - endScreenTimer)) / 60);
  text("Returning to start in " + timeLeft + "s", width/2, height*0.9);
  
  // Handle idle timer
  endScreenTimer--;
  if (endScreenTimer <= 0) {
    gameState = "START";
  }
}

function drawButton(x, y, w, h, label, bgColor, textColor) {
  // Button shadow
  fill(0, 0, 0, 30);
  rect(x - w/2 + 3, y - h/2 + 3, w, h, 8);
  
  // Button background
  fill(bgColor);
  rect(x - w/2, y - h/2, w, h, 8);
  
  // Button text
  fill(textColor);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(label, x, y);
  textStyle(NORMAL);
}

function drawFeedback() {
  // Smooth fading animation
  let fadeAlpha = map(feedbackTimer, 0, 120, 0, 255);
  fadeAlpha = constrain(fadeAlpha, 0, 255);
  
  // Feedback background with smooth fade
  fill(red(color(colors.white)), green(color(colors.white)), blue(color(colors.white)), fadeAlpha);
  rect(width/4, height/3, width/2, 80, 10);
  
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
  text(feedback, width/2, height/3 + 40);
  textStyle(NORMAL);
}

function createNextMyth() {
  if (currentMythIndex < shuffledMythList.length) {
    const mythItem = shuffledMythList[currentMythIndex];
    currentMyth = new Myth(random(width*0.2, width*0.8), currentHeight + mythSize, mythSize, mythItem.truth, mythItem.text);
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
  if (key === ' ') {
    if (gameState === "START") {
      startGame();
    } else if (gameState === "PLAYING") {
      if (currentMyth && !currentMyth.isOffScreen()) {
        // There's an active myth on screen
        if (currentMyth.truth) {
          // User tried to bust a truth - lose a point
          score--;
          feedback = "Wrong! That was a TRUTH!\n-1 point";
          feedbackTimer = 120; // Show feedback longer
          currentMyth.busted = true; // Mark as busted
          // Immediately move to next myth
          createNextMyth();
        } else {
          // User correctly busted a myth - gain a point
          score++;
          feedback = "Great! You busted a MYTH!\n+1 point";
          feedbackTimer = 120;
          currentMyth.busted = true; // Mark as busted
          // Move to next myth
          createNextMyth();
        }
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
    this.speed = random(2, 3);
    this.baseSpeed = this.speed;
    this.color = random(mythColors); // Random colorful color
    this.driftX = 0; // For brownian motion
    this.driftSpeed = random(0.5, 1.5); // How fast the drift changes
    this.busted = false; // Track if this myth was busted
  }

  draw() {
    // Brownian motion - floating balloon effect
    this.driftX += random(-this.driftSpeed, this.driftSpeed);
    this.driftX = constrain(this.driftX, -30, 30); // Limit horizontal drift
    this.x += this.driftX * 0.1; // Apply gentle drift
    
    // Keep balloons within screen bounds
    this.x = constrain(this.x, this.size/2, width - this.size/2);
    
    // Speed up truths when they're 2/3 of the way up
    if (this.truth && this.y < height * 0.33) {
      this.speed = this.baseSpeed * 1.5;
    }
    
    // Myth shadow
    fill(0, 0, 0, 30);
    ellipse(this.x + 4, this.y + 4, this.size, this.size);
    
    // Myth background - colorful and vibrant!
    fill(this.color + 'E6'); // Semi-transparent
    ellipse(this.x, this.y, this.size, this.size);
    
    // Myth border
    stroke(colors.white);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.size, this.size);
    noStroke();
    
    // Inner glow effect
    fill(this.color + '40');
    ellipse(this.x, this.y, this.size * 0.7, this.size * 0.7);
    
    // Myth text
    fill(colors.white);
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.text, this.x, this.y);
    textStyle(NORMAL);

    this.y -= this.speed;
  }

  isOffScreen() {
    return this.y < -this.size;
  }
}



