// Asset management
let balloonImages = [];
let explosionFrames = [];
let backgroundImage, gameFont, startBtn, logo, scoreBg, result, resultBg;
let report, reportBg, star, starShadow, instruction, instructionBg;
let backgroundMusic, popSound, wrongSound, correctSound;

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
  
  // Load background music
  backgroundMusic = loadSound('assets/slimetime_01.aac');
  
  // Load sound effects
  popSound = loadSound('assets/pop.aac');
  wrongSound = loadSound('assets/wrong.aac');
  correctSound = loadSound('assets/correct.aac');

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

// Music control functions
function startBackgroundMusic() {
  if (backgroundMusic && !backgroundMusic.isPlaying()) {
    backgroundMusic.setVolume(0.01); // Set volume to 10%
    backgroundMusic.loop(); // Loop the music continuously
  }
}



function stopBackgroundMusic() {
  if (backgroundMusic && backgroundMusic.isPlaying()) {
    backgroundMusic.stop();
  }
}

function pauseBackgroundMusic() {
  if (backgroundMusic && backgroundMusic.isPlaying()) {
    backgroundMusic.pause();
  }
}

function resumeBackgroundMusic() {
  if (backgroundMusic && backgroundMusic.isPaused()) {
    backgroundMusic.play();
  }
}

// Sound effect functions
function playPopSound() {
  // Play pop sound immediately for correct balloon hits
  if (popSound) {
    popSound.setVolume(1.0); // Set volume to 100%
    popSound.play();
  }
  // Delay correct sound by 10 frames (approximately 167ms at 60fps)
  if (correctSound) {
    setTimeout(() => {
      correctSound.setVolume(0.4);
      correctSound.play();
    }, 167); // 10 frames at 60fps = 167ms
  }
}

function playWrongSound() {
  if (wrongSound) {
    wrongSound.setVolume(0.6); // Set volume to 100%
    wrongSound.play();
  }
}

function playWrongWithPop() {
  // Play pop sound immediately for wrong button press
  if (popSound) {
    popSound.setVolume(1.0);
    popSound.play();
  }
  // Delay wrong sound by 10 frames (approximately 167ms at 60fps)
  if (wrongSound) {
    setTimeout(() => {
      wrongSound.setVolume(0.6);
      wrongSound.play();
    }, 120); // 10 frames at 60fps = 167ms
  }
}

function playUIProgressSound() {
  // Play pop sound for UI progression (button presses that advance screens)
  if (popSound) {
    popSound.setVolume(0.2); // Slightly quieter than gameplay for UI feedback
    popSound.play();
  }
} 