// Utility functions

// Language selection using button images

// Language selection system
const LANGUAGES = [
  { name: 'English', code: 'en', label: 'English' },
  { name: 'Bahasa Melayu', code: 'ms', label: 'Bahasa\nMelayu' },
  { name: 'Chinese', code: 'zh', label: '中文' },
  { name: 'Tamil', code: 'ta', label: 'தமிழ்' }
];

// SVG colors for language selection
const LANGUAGE_COLORS = {
  DEFAULT: '#4650a2',
  SELECTED: '#14a260'
};

// Current language selection state
let selectedLanguageIndex = 0;

/**
 * Draw language button at specified position
 */
function drawLanguageButton(index, x, y, w, h = null) {
  if (!buttonBlue || !buttonGreen) return;
  
  push();
  imageMode(CENTER);
  
  if (h === null && buttonBlue.width > 0) {
    // Maintain aspect ratio of button image
    h = w * (buttonBlue.height / buttonBlue.width);
  }
  
  // Choose button image based on selection
  const isSelected = index === selectedLanguageIndex;
  const buttonImage = isSelected ? buttonGreen : buttonBlue;
  
  image(buttonImage, x, y, w, h);
  pop();
}

/**
 * Cycle to next language
 */
function cycleLanguage() {
  selectedLanguageIndex = (selectedLanguageIndex + 1) % LANGUAGES.length;
  console.log('Language selected:', LANGUAGES[selectedLanguageIndex].name);
}

/**
 * Get current selected language
 */
function getSelectedLanguage() {
  return LANGUAGES[selectedLanguageIndex];
}

/**
 * Initialize language selection system
 */
function initializeLanguageSystem() {
  selectedLanguageIndex = 0;
  console.log('Language system initialized with:', LANGUAGES[selectedLanguageIndex].name);
}

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

// Make functions globally available for p5.js compatibility
window.drawBalloon = drawBalloon;
window.getAnimatedBalloon = getAnimatedBalloon;
window.drawButton = drawButton;

// Language selection functions
window.LANGUAGES = LANGUAGES;
window.LANGUAGE_COLORS = LANGUAGE_COLORS;
window.drawLanguageButton = drawLanguageButton;
window.cycleLanguage = cycleLanguage;
window.getSelectedLanguage = getSelectedLanguage;
window.initializeLanguageSystem = initializeLanguageSystem; 