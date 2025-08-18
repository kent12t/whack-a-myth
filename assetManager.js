// Asset management
const assets = {
  balloonImages: [],
  explosionFrames: [],
  backgroundImage: null,
  gameFont: null,
  notoSansFont: null,
  notoSansSCFont: null,
  startBtn: null,
  logo: null,
  scoreBg: null,
  result: null,
  resultBg: null,
  report: null,
  reportBg: null,
  star: null,
  starShadow: null,
  instruction: null,
  instructionBg: null,
  backgroundMusic: null,
  popSound: null,
  wrongSound: null,
  correctSound: null,
  buttonBlue: null,
  buttonGreen: null
};

// Make assets globally accessible with synchronization
Object.defineProperty(window, 'balloonImages', {
  get: () => assets.balloonImages,
  set: (value) => assets.balloonImages = value
});

Object.defineProperty(window, 'explosionFrames', {
  get: () => assets.explosionFrames,
  set: (value) => assets.explosionFrames = value
});

Object.defineProperty(window, 'backgroundImage', {
  get: () => assets.backgroundImage,
  set: (value) => assets.backgroundImage = value
});

Object.defineProperty(window, 'gameFont', {
  get: () => assets.gameFont,
  set: (value) => assets.gameFont = value
});

Object.defineProperty(window, 'notoSansFont', {
  get: () => assets.notoSansFont,
  set: (value) => assets.notoSansFont = value
});

Object.defineProperty(window, 'notoSansSCFont', {
  get: () => assets.notoSansSCFont,
  set: (value) => assets.notoSansSCFont = value
});

Object.defineProperty(window, 'startBtn', {
  get: () => assets.startBtn,
  set: (value) => assets.startBtn = value
});

Object.defineProperty(window, 'logo', {
  get: () => assets.logo,
  set: (value) => assets.logo = value
});

Object.defineProperty(window, 'scoreBg', {
  get: () => assets.scoreBg,
  set: (value) => assets.scoreBg = value
});

Object.defineProperty(window, 'result', {
  get: () => assets.result,
  set: (value) => assets.result = value
});

Object.defineProperty(window, 'resultBg', {
  get: () => assets.resultBg,
  set: (value) => assets.resultBg = value
});

Object.defineProperty(window, 'report', {
  get: () => assets.report,
  set: (value) => assets.report = value
});

Object.defineProperty(window, 'reportBg', {
  get: () => assets.reportBg,
  set: (value) => assets.reportBg = value
});

Object.defineProperty(window, 'star', {
  get: () => assets.star,
  set: (value) => assets.star = value
});

Object.defineProperty(window, 'starShadow', {
  get: () => assets.starShadow,
  set: (value) => assets.starShadow = value
});

Object.defineProperty(window, 'instruction', {
  get: () => assets.instruction,
  set: (value) => assets.instruction = value
});

Object.defineProperty(window, 'instructionBg', {
  get: () => assets.instructionBg,
  set: (value) => assets.instructionBg = value
});

Object.defineProperty(window, 'backgroundMusic', {
  get: () => assets.backgroundMusic,
  set: (value) => assets.backgroundMusic = value
});

Object.defineProperty(window, 'popSound', {
  get: () => assets.popSound,
  set: (value) => assets.popSound = value
});

Object.defineProperty(window, 'wrongSound', {
  get: () => assets.wrongSound,
  set: (value) => assets.wrongSound = value
});

Object.defineProperty(window, 'correctSound', {
  get: () => assets.correctSound,
  set: (value) => assets.correctSound = value
});

Object.defineProperty(window, 'buttonBlue', {
  get: () => assets.buttonBlue,
  set: (value) => assets.buttonBlue = value
});

Object.defineProperty(window, 'buttonGreen', {
  get: () => assets.buttonGreen,
  set: (value) => assets.buttonGreen = value
});

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
  assets.backgroundImage = loadImage('assets/city.jpg');
  
  // Load fonts with error handling
  assets.gameFont = loadFont('assets/CircularStd-Bold.otf', 
    () => console.log('✅ Default font loaded successfully'),
    (err) => console.error('❌ Failed to load default font:', err)
  );
  
  assets.notoSansFont = loadFont('assets/NotoSansTamil-Bold.ttf',
    () => console.log('✅ Tamil font loaded successfully'),
    (err) => {
      console.error('❌ Failed to load Tamil font:', err);
      console.log('📝 Tamil text will fallback to default font');
    }
  );
  
  assets.notoSansSCFont = loadFont('assets/NotoSansSC-Bold.otf',
    () => {
      console.log('✅ Chinese font (NotoSansSC) loaded successfully');
      console.log('🔍 NotoSansSC font object:', assets.notoSansSCFont);
      // Test if the font can render numbers
      if (assets.notoSansSCFont && assets.notoSansSCFont.font) {
        console.log('🔤 NotoSansSC font has glyph support');
      }
    },
    (err) => {
      console.error('❌ Failed to load Chinese font (NotoSansSC):', err);
      console.log('📝 Chinese text will fallback to default font');
    }
  );
  assets.startBtn = loadImage('assets/start.png');
  assets.logo = loadImage('assets/logo.png');
  assets.scoreBg = loadImage('assets/score.png');
  assets.result = loadImage('assets/result.png');
  assets.resultBg = loadImage('assets/result-bg.png');
  assets.report = loadImage('assets/report.png');
  assets.reportBg = loadImage('assets/report-bg.png');
  assets.star = loadImage('assets/star.png');
  assets.starShadow = loadImage('assets/star-shadow.png');
  assets.instruction = loadImage('assets/instruction.png');
  assets.instructionBg = loadImage('assets/instruction-bg.png');
  
  // Load language selection buttons
  assets.buttonBlue = loadImage('assets/button-blue.png');
  assets.buttonGreen = loadImage('assets/button-green.png');
  
  // Load background music
  assets.backgroundMusic = loadSound('assets/slimetime_01.aac');
  
  // Load sound effects
  assets.popSound = loadSound('assets/pop.aac');
  assets.wrongSound = loadSound('assets/wrong.aac');
  assets.correctSound = loadSound('assets/correct.aac');

  // Load explosion animation frames
  for (let i = 1; i <= 36; i++) {
    let frameNumber = str(i).padStart(3, '0'); // Convert to 3-digit format (004, 005, etc.)
    assets.explosionFrames.push(loadImage(`assets/balloonpop2/frame_${frameNumber}.png`));
  }

  // Load all balloon images
  for (let color of GAME_CONFIG.balloonColors) {
    assets.balloonImages.push(loadImage(`assets/${color}.png`));
  }
}

// Music control functions
function startBackgroundMusic() {
  if (assets.backgroundMusic && !assets.backgroundMusic.isPlaying()) {
    assets.backgroundMusic.setVolume(0.06); // Set volume to 10%
    assets.backgroundMusic.loop(); // Loop the music continuously
  }
}

function stopBackgroundMusic() {
  if (assets.backgroundMusic && assets.backgroundMusic.isPlaying()) {
    assets.backgroundMusic.stop();
  }
}

function pauseBackgroundMusic() {
  if (assets.backgroundMusic && assets.backgroundMusic.isPlaying()) {
    assets.backgroundMusic.pause();
  }
}

function resumeBackgroundMusic() {
  if (assets.backgroundMusic && assets.backgroundMusic.isPaused()) {
    assets.backgroundMusic.play();
  }
}

// Sound effect functions
function playPopSound() {
  // Play pop sound immediately for correct balloon hits
  if (assets.popSound) {
    assets.popSound.setVolume(1.0); // Set volume to 100%
    assets.popSound.play();
  }
  // Delay correct sound by 10 frames (approximately 167ms at 60fps)
  if (assets.correctSound) {
    setTimeout(() => {
      assets.correctSound.setVolume(0.25);
      assets.correctSound.play();
    }, 167); // 10 frames at 60fps = 167ms
  }
}

function playWrongSound() {
  if (assets.wrongSound) {
    assets.wrongSound.setVolume(0.6); // Set volume to 100%
    assets.wrongSound.play();
  }
}

function playWrongWithPop() {
  // Play pop sound immediately for wrong button press
  if (assets.popSound) {
    assets.popSound.setVolume(1.0);
    assets.popSound.play();
  }
  // Delay wrong sound by 10 frames (approximately 167ms at 60fps)
  if (assets.wrongSound) {
    setTimeout(() => {
      assets.wrongSound.setVolume(0.6);
      assets.wrongSound.play();
    }, 120); // 10 frames at 60fps = 167ms
  }
}

function playUIProgressSound() {
  // Play pop sound for UI progression (button presses that advance screens)
  if (assets.popSound) {
    assets.popSound.setVolume(0.2); // Slightly quieter than gameplay for UI feedback
    assets.popSound.play();
  }
}

// Make functions globally available
window.preload = preload;
window.startBackgroundMusic = startBackgroundMusic;
window.stopBackgroundMusic = stopBackgroundMusic;
window.pauseBackgroundMusic = pauseBackgroundMusic;
window.resumeBackgroundMusic = resumeBackgroundMusic;
window.playPopSound = playPopSound;
window.playWrongSound = playWrongSound;
window.playWrongWithPop = playWrongWithPop;
window.playUIProgressSound = playUIProgressSound; 