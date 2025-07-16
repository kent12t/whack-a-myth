// Asset management
let balloonImages = [];
let explosionFrames = [];
let backgroundImage, gameFont, startBtn, logo, scoreBg, result, resultBg;
let report, reportBg, star, starShadow, instruction, instructionBg;

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
  for (let color of GAME_CONFIG.balloonColors) {
    balloonImages.push(loadImage(`assets/${color}.png`));
  }
} 