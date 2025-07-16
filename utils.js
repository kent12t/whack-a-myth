// Utility functions

function drawBalloon(x, y, size, color, rotation = 0) {
  push();
  translate(x, y);
  rotate(rotation);
  imageMode(CENTER);
  image(balloonImages[GAME_CONFIG.balloonColors.indexOf(color)], 0, 0, size, size);
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