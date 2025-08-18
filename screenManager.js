// Screen drawing functions

function drawStartScreen() {
  // This function conditionally shows either:
  // - Full language selection interface (when DEPLOYMENT_CONFIG.enableLanguageSelection = true)
  // - Simple start.png image with English-only text (when DEPLOYMENT_CONFIG.enableLanguageSelection = false)

  push();
  imageMode(CENTER);

  if (DEPLOYMENT_CONFIG.enableLanguageSelection) {
    // Title logo (original behavior)
    let logoX = width / 2;
    let logoY = height * 0.35 + sin(frameCount * 0.05) * 5;
    let logoWidth = width * 0.6;
    let logoHeight = logoWidth * logo.height / logo.width;
    image(logo, logoX, logoY, logoWidth, logoHeight);

    // Subtitle
    textAlign(CENTER, CENTER);
    textSize(getFontSize(0.016));
    textStyle(NORMAL);
    fill(COLORS.white);
    
    // Set appropriate font for current language
    const subtitleFont = getCurrentFont();
    if (subtitleFont) {
      textFont(subtitleFont);
    }
    
    text(getText('startSubtitle'), width / 2, height * 0.66);

    // Language selection SVGs
    drawLanguageSelection();

    // Instructions
    textAlign(CENTER, CENTER);
    textSize(getFontSize(0.016));
    textStyle(BOLD);
    fill(COLORS.white);
    
    // Top line: Always English (use default font)
    textFont(gameFont);
    text(UI_TEXT.en.startInstruction, width / 2, height * 0.89);
    
    // Bottom line: Only show if language is not English
    const currentLang = getSelectedLanguage ? getSelectedLanguage().code : 'en';
    if (currentLang !== 'en') {
      // Set appropriate font for current language
      const instructionFont = getCurrentFont();
      if (instructionFont) {
        textFont(instructionFont);
      }
      textAlign(CENTER, TOP);
      text(getText('startInstruction'), width / 2, height * 0.92);
    }
  } else {

    imageMode(CENTER);

    let startX = width / 2;
    let startY = height * 0.765;
    let startWidth = width * 0.25; // Adjust size as needed
    let startHeight = startWidth * (startBtn ? startBtn.height / startBtn.width : 0.6);
    image(startBtn, startX, startY, startWidth, startHeight);

    let logoX = width / 2;
    let logoY = height * 0.4 + sin(frameCount * 0.05) * 5;
    let logoWidth = width * 0.7;
    let logoHeight = logoWidth * logo.height / logo.width;
    image(logo, logoX, logoY, logoWidth, logoHeight);

    // Simple English-only instructions
    textAlign(CENTER, CENTER);
    textSize(getFontSize(0.02));
    textStyle(BOLD);
    fill(COLORS.white);
    text("HAMMER ANY BUTTON TO START!", width / 2, height * 0.86);
  }

  pop();
}

// Draw the 4 language selection options
function drawLanguageSelection() {
  let buttonWidth = width * 0.15;
  let spacing = width * 0.16;
  let totalWidth = (LANGUAGES.length - 1) * spacing;
  let startX = width / 2 - totalWidth / 2;
  let buttonY = height * 0.779;

  for (let i = 0; i < LANGUAGES.length; i++) {
    let x = startX + i * spacing;

    // Draw language button
    drawLanguageButton(i, x, buttonY, buttonWidth);

    // Draw language label
    textAlign(CENTER, CENTER);
    
    // Use font size specific to this language, not the currently selected language
    textSize(getFontSizeForLanguage(LANGUAGES[i].code, 0.014));
    textStyle(BOLD);

    // Highlight selected language text
    let selectedIndex = LANGUAGES.findIndex(lang => lang.code === getSelectedLanguage().code);
    if (i === selectedIndex) {
      fill(LANGUAGE_COLORS.SELECTED);
    } else {
      fill(COLORS.white);
    }

    // Calculate button height for text positioning
    let buttonHeight = buttonWidth * (buttonBlue ? buttonBlue.height / buttonBlue.width : 0.45);

    // Handle multi-line labels
    let lines = LANGUAGES[i].label.split('\n');
    let lineHeight = height * 0.03;
    let totalTextHeight = (lines.length - 1) * lineHeight;
    let centerY = buttonY - height * 0.012;
    let startY = centerY - totalTextHeight / 2;

    for (let j = 0; j < lines.length; j++) {
      // Set the appropriate font for this language
      const languageFont = getFontForLanguage(LANGUAGES[i].code);
      if (languageFont) {
        textFont(languageFont);
      }
      
      fill(COLORS.white);
      text(lines[j], x + width * 0.006, startY + (j * lineHeight));
    }
  }
}



function drawInstructionScreen() {
  push();
  imageMode(CENTER);

  // Instruction image
  let instructionX = width / 2;
  let instructionY = height / 2;
  let instructionWidth = width * 1;
  let instructionHeight = instructionWidth * instruction.height / instruction.width;
  image(instructionBg, instructionX, instructionY, instructionWidth, instructionHeight)
  image(instruction, instructionX, instructionY, instructionWidth, instructionHeight);

  // Yellow balloon (main balloon) - smooth upward floating
  let yellowBalloon = getAnimatedBalloon(width * 0.85, width * 0.3, 'yellow', 1.5, 1, 0, 5);
  drawBalloon(yellowBalloon.x, yellowBalloon.y, yellowBalloon.size, yellowBalloon.color, yellowBalloon.rotation);

  // Red balloon (0.6x size, milder motion, slightly to the right, offset timing)
  let redBalloon = getAnimatedBalloon(width * 0.9, width * 0.3 * 0.6, 'red', 2, 0.6, 80, 7);
  drawBalloon(redBalloon.x, redBalloon.y, redBalloon.size, redBalloon.color, redBalloon.rotation);

  // Violet balloon (1.2x size, slightly offset motion, at width*0.2, different timing)
  let violetBalloon = getAnimatedBalloon(width * 0.1, width * 0.3 * 1.2, 'violet', 1.1, 0.8, 300, 8);
  drawBalloon(violetBalloon.x, violetBalloon.y, violetBalloon.size, violetBalloon.color, violetBalloon.rotation);

  // Continue prompt
  textSize(getFontSize(0.02));
  textStyle(BOLD);
  fill(COLORS.white);
  textAlign(CENTER, CENTER);
  text(getText('instructionPrompt'), width / 2, height * 0.86);

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
        feedbackTimer = TIMING.ESCAPE_FEEDBACK_DURATION;

        // Track this as a missed balloon
        missedBalloons.push({
          text: currentMyth.text,
          truth: currentMyth.truth,
          color: currentMyth.color,
          missType: 'FLY_AWAY'
        });

        // Play wrong sound for balloon that flew away
        playWrongSound();
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
      gameState = GAME_STATES.END;
      endScreenTimer = TIMING.END_SCREEN_DURATION;
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
  
  // Set appropriate font for score display (use number-safe font)
  const scoreFont = getFontForNumbers();
  if (scoreFont) {
    textFont(scoreFont);
  }
  
  textSize(getFontSize(0.0292));
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(COLORS.white);
  text(score, width * (0.85 + 0.068), height * (0.1 - 0.017));
  pop();
}

function drawEndScreen() {
  push();
  imageMode(CENTER);

  // Determine if we have a perfect score (no missed balloons)
  let isPerfectScore = missedBalloons.length === 0;

  if (isPerfectScore) {
    // Perfect score - center the result section
    image(resultBg, width * 0.5, height / 2, height * 0.7 * (resultBg.width / resultBg.height), height * 0.7);
    image(result, width * 0.5, height / 2, height * 0.7 * (result.width / result.height), height * 0.7);
  } else {
    // Has missed balloons - show both result and report sections
    // Result section - centered on width * 0.3
    image(resultBg, width * 0.3, height / 2, height * 0.7 * (resultBg.width / resultBg.height), height * 0.7);
    image(result, width * 0.3, height / 2, height * 0.7 * (result.width / result.height), height * 0.7);

    // Report section - centered on width * 0.75
    image(reportBg, width * 0.75, height / 2, height * 0.7 * (reportBg.width / reportBg.height), height * 0.7);
    image(report, width * 0.75, height / 2, height * 0.7 * (report.width / report.height), height * 0.7);
  }

  pop();

  // Draw star rating at top of screen - adjust position based on layout
  let starX = isPerfectScore ? width * 0.5 : width * 0.3;
  drawStarRating(starX, height * 0.15);

  // Display score - adjust position based on layout
  // Set appropriate font for end screen score (use number-safe font)
  const endScoreFont = getFontForNumbers();
  if (endScoreFont) {
    textFont(endScoreFont);
  }
  
  fill(COLORS.white);
  textSize(getFontSize(0.0375));
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  let scoreX = isPerfectScore ? width * 0.505 : width * 0.305;
  text(score, scoreX, height * 0.485);

  // Draw missed balloons in report section (only if there are any)
  if (!isPerfectScore) {
    drawMissedBalloons();
  }

  // Idle timer display
  // Set appropriate font for timer text
  const timerFont = getCurrentFont();
  if (timerFont) {
    textFont(timerFont);
  }
  
  fill(COLORS.white);
  textSize(getFontSize(0.02));
  text(getText('endRestartPrompt'), width / 2, height * 0.92);
  
  // Timer countdown - handle numbers specially for Chinese and Tamil
  textSize(getFontSize(0.01));
  textAlign(CENTER, CENTER);
  let timeLeft = Math.ceil((TIMING.END_SCREEN_DURATION - (TIMING.END_SCREEN_DURATION - endScreenTimer)) / 60);
  
  const currentLang = window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en';
  if (currentLang === 'zh') {
    // For Chinese, split the timer message to render number and text separately
    const beforeText = "将于";
    const afterText = "秒后自动重启";
    
    // Calculate positions for centered text
    const numberFont = getFontForNumbers();
    const languageFont = getCurrentFont();
    
    // Measure text widths to center properly
    if (languageFont) textFont(languageFont);
    const beforeWidth = textWidth(beforeText);
    const afterWidth = textWidth(afterText);
    
    if (numberFont) textFont(numberFont);
    const numberWidth = textWidth(timeLeft.toString());
    
    const totalWidth = beforeWidth + numberWidth + afterWidth;
    const startX = width / 2 - totalWidth / 2;
    
    // Draw the three parts
    if (languageFont) textFont(languageFont);
    text(beforeText, startX + beforeWidth/2, height * 0.965);
    
    if (numberFont) textFont(numberFont);
    text(timeLeft, startX + beforeWidth + numberWidth/2, height * 0.965);
    
    if (languageFont) textFont(languageFont);
    text(afterText, startX + beforeWidth + numberWidth + afterWidth/2, height * 0.965);
    
  } else if (currentLang === 'ta') {
    // For Tamil, render timer message with current font (numbers will use default via getFontForNumbers already set above)
    const timerMessage = getText('autoRestartMessage', { timeLeft });
    text(timerMessage, width / 2, height * 0.965);
  } else {
    // For other languages, use regular font
    text(getText('autoRestartMessage', { timeLeft }), width / 2, height * 0.965);
  }

  // Handle idle timer
  endScreenTimer--;
  if (endScreenTimer <= 0) {
    gameState = GAME_STATES.START;
  }
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
    const bounceY = sin((frameCount + timeOffset) * 0.06) * 8;
    const bounceX = cos((frameCount + timeOffset) * 0.04) * 4;

    const x = baseX + bounceX;
    const y = baseY + bounceY;

    // Draw balloon
    push();
    imageMode(CENTER);

    // Get balloon image index
    const balloonImageIndex = GAME_CONFIG.balloonColors.indexOf(balloon.color);
    if (balloonImageIndex >= 0) {
      image(balloonImages[balloonImageIndex], x, y, balloonSize * 0.8, balloonSize * 0.8);
    }

    // Draw myth/truth text on balloon
    // Set appropriate font for balloon text
    const balloonTextFont = getCurrentFont();
    if (balloonTextFont) {
      textFont(balloonTextFont);
    }
    
    textAlign(CENTER, CENTER);
    textSize(getFontSizeFromObject(balloonSize, 0.035));

    // Text shadow
    fill(0, 0, 0, 100);
    textStyle(BOLD);
    text(balloon.text, x + 1, y - balloonSize * 0.1 + 1);

    // Main text
    fill(COLORS.white);
    text(balloon.text, x, y - balloonSize * 0.1);

    pop();

    // Draw label top left of balloon
    push();
    const labelX = x - balloonSize * 0.1;
    const labelY = y - balloonSize * 0.225;

    // Move to label position first, then rotate
    translate(labelX, labelY);
    rotate(-PI / 6); // Slightly less rotation for better readability

    // Set appropriate font for label text
    const labelFont = getCurrentFont();
    if (labelFont) {
      textFont(labelFont);
    }

    textAlign(CENTER, CENTER);
    textSize(getFontSizeFromObject(balloonSize, 0.03));
    textStyle(BOLD);

    // Label with stroke
    stroke(COLORS.white);
    strokeWeight(width * 0.0015);
    fill('#2e3192');

    if (balloon.truth) {
      text(getText('truthLabel'), 0, 0);
    } else {
      text(getText('mythLabel'), 0, 0);
    }

    pop();
  }

  pop();
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
  feedbackX = constrain(feedbackX, width * 0.05, width - width * 0.05);
  feedbackY = constrain(feedbackY, height * 0.05, height - height * 0.05);

  // Feedback text with smooth fade using COLORS.accent
  textAlign(CENTER, CENTER);
  fill(red(color(COLORS.accent)), green(color(COLORS.accent)), blue(color(COLORS.accent)), fadeAlpha);

  if (feedbackData.isCorrect) {
    // Correct feedback text
    const feedbackTextFont = getCurrentFont();
    if (feedbackTextFont) {
      textFont(feedbackTextFont);
    }
    textSize(getFontSize(0.0208));
    textStyle(BOLD);
    text(getText('correctFeedback'), feedbackX, feedbackY - width * 0.011);

    // Points display - use number-safe font for the score part
    textSize(getFontSize(0.025));
    const pointsText = `+${SCORE_VALUES.CORRECT} ${getText('pointsSuffix')}`;
    
    // For Chinese and Tamil, render the number and text parts separately
    const currentLang = window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en';
    if (currentLang === 'zh' || currentLang === 'ta') {
      // Split into number and text parts
      const numberPart = `+${SCORE_VALUES.CORRECT}`;
      const textPart = ` ${getText('pointsSuffix')}`;
      
      // Measure text to position properly
      const numberFont = getFontForNumbers();
      const languageFont = getCurrentFont();
      
      // Draw number part
      if (numberFont) textFont(numberFont);
      const numberWidth = textWidth(numberPart);
      text(numberPart, feedbackX - textWidth(textPart)/2, feedbackY + width * 0.011);
      
      // Draw text part
      if (languageFont) textFont(languageFont);
      text(textPart, feedbackX + numberWidth/2, feedbackY + width * 0.011);
    } else {
      // For other languages, use regular font
      text(pointsText, feedbackX, feedbackY + width * 0.011);
    }
  } else {
    // Wrong feedback - use current font for all text
    const feedbackFont = getCurrentFont();
    if (feedbackFont) {
      textFont(feedbackFont);
    }
    
    textSize(getFontSize(0.0208));
    textStyle(BOLD);
    text(getText('wrongFeedback'), feedbackX, feedbackY - width * 0.011);

    textSize(getFontSize(0.018));
    textStyle(NORMAL);
    let truthType = feedbackData.wasTruth ? getText('truthWord') : getText('mythWord');

    if (feedbackData.isEscapePenalty) {
      text(getText('escapeMessage', { truthType }), feedbackX, feedbackY + width * 0.011);
    } else {
      text(getText('wrongChoiceMessage', { truthType }), feedbackX, feedbackY + width * 0.011);
    }
  }

  textStyle(NORMAL);
  pop();
}

// Make functions globally available for p5.js compatibility
window.drawStartScreen = drawStartScreen;
window.drawInstructionScreen = drawInstructionScreen;
window.drawGameScreen = drawGameScreen;
window.drawEndScreen = drawEndScreen;
window.drawStarRating = drawStarRating;
window.drawMissedBalloons = drawMissedBalloons;
window.drawFeedback = drawFeedback; 