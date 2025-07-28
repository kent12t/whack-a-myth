// Game object classes

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
    this.normalSpeed = random(2.5 * (height / 1080), 3 * (height / 1080)); // Normal speed for upper screen
    this.fastSpeed = 4 * (height / 1080); // Fast speed for lower 10% of screen
    this.speed = this.fastSpeed; // Start with fast speed since balloons spawn from bottom
    
    // Select a unique balloon color
    let availableColors = GAME_CONFIG.balloonColors.filter(color => !usedBalloonColors.includes(color));
    
    // If all colors have been used, reset the used colors array
    if (availableColors.length === 0) {
      usedBalloonColors = [];
      availableColors = [...GAME_CONFIG.balloonColors];
    }
    
    this.color = random(availableColors);
    usedBalloonColors.push(this.color);
    
    this.busted = false; // Track if this myth was busted
    this.motionMultiplier = random(0.4, 0.8); // Random motion intensity
    this.rotationLag = random(3, 8); // Random rotation lag
  }

  draw() {
    // Adjust speed based on Y position - use fast speed in lower 10% of screen
    if (this.y > height * 0.95) {
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
    image(balloonImages[GAME_CONFIG.balloonColors.indexOf(this.color)], 0, 0, this.size, this.size);
    pop();

    // Add text shadow effect

    fill(0, 0, 0, 100);
    textSize(this.size * 0.04);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.text, 2, 2); // Offset for shadow effect

    // Myth text
    blendMode(BLEND);
    fill(COLORS.white);
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

// Make classes globally available for p5.js compatibility
window.Myth = Myth;
window.Explosion = Explosion; 