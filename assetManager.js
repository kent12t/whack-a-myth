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
  
  // Score images
  scoreBg: null,
  scoreBgMs: null,
  scoreBgTa: null,
  scoreBgZh: null,
  
  // Result images
  result: null,
  resultMs: null,
  resultTa: null,
  resultZh: null,
  resultBg: null,
  
  // Report images
  report: null,
  reportMs: null,
  reportTa: null,
  reportZh: null,
  reportBg: null,
  
  star: null,
  starShadow: null,
  
  // Instruction images
  instruction: null,
  instructionBg: null,
  instructionTa: null,
  instructionZh: null,
  instructionMs: null,
  
  backgroundMusic: null,
  popSound: null,
  wrongSound: null,
  correctSound: null,
  buttonBlue: null,
  buttonGreen: null,
  
  // Tamil-specific assets
  balloonImagesTa: [],
  correctTa: null,
  wrongMythTa: null,
  wrongTruthTa: null,
  flyMythTa: null,
  flyTruthTa: null,
  buttonTaBlue: null,
  buttonTaGreen: null,
  thisTruthTa: null,
  thisMythTa: null,
  restartTa: null,
  startTa: null,
  resultBgTa: null
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

// Language-specific instruction images
Object.defineProperty(window, 'instructionTa', {
  get: () => assets.instructionTa,
  set: (value) => assets.instructionTa = value
});

Object.defineProperty(window, 'instructionZh', {
  get: () => assets.instructionZh,
  set: (value) => assets.instructionZh = value
});

Object.defineProperty(window, 'instructionMs', {
  get: () => assets.instructionMs,
  set: (value) => assets.instructionMs = value
});

// Language-specific score images
Object.defineProperty(window, 'scoreBgMs', {
  get: () => assets.scoreBgMs,
  set: (value) => assets.scoreBgMs = value
});

Object.defineProperty(window, 'scoreBgTa', {
  get: () => assets.scoreBgTa,
  set: (value) => assets.scoreBgTa = value
});

Object.defineProperty(window, 'scoreBgZh', {
  get: () => assets.scoreBgZh,
  set: (value) => assets.scoreBgZh = value
});

// Language-specific result images
Object.defineProperty(window, 'resultMs', {
  get: () => assets.resultMs,
  set: (value) => assets.resultMs = value
});

Object.defineProperty(window, 'resultTa', {
  get: () => assets.resultTa,
  set: (value) => assets.resultTa = value
});

Object.defineProperty(window, 'resultZh', {
  get: () => assets.resultZh,
  set: (value) => assets.resultZh = value
});



// Language-specific report images
Object.defineProperty(window, 'reportMs', {
  get: () => assets.reportMs,
  set: (value) => assets.reportMs = value
});

Object.defineProperty(window, 'reportTa', {
  get: () => assets.reportTa,
  set: (value) => assets.reportTa = value
});

Object.defineProperty(window, 'reportZh', {
  get: () => assets.reportZh,
  set: (value) => assets.reportZh = value
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

// Tamil-specific assets global properties
Object.defineProperty(window, 'balloonImagesTa', {
  get: () => assets.balloonImagesTa,
  set: (value) => assets.balloonImagesTa = value
});

Object.defineProperty(window, 'correctTa', {
  get: () => assets.correctTa,
  set: (value) => assets.correctTa = value
});

Object.defineProperty(window, 'wrongMythTa', {
  get: () => assets.wrongMythTa,
  set: (value) => assets.wrongMythTa = value
});

Object.defineProperty(window, 'wrongTruthTa', {
  get: () => assets.wrongTruthTa,
  set: (value) => assets.wrongTruthTa = value
});

Object.defineProperty(window, 'flyMythTa', {
  get: () => assets.flyMythTa,
  set: (value) => assets.flyMythTa = value
});

Object.defineProperty(window, 'flyTruthTa', {
  get: () => assets.flyTruthTa,
  set: (value) => assets.flyTruthTa = value
});

Object.defineProperty(window, 'buttonTaBlue', {
  get: () => assets.buttonTaBlue,
  set: (value) => assets.buttonTaBlue = value
});

Object.defineProperty(window, 'buttonTaGreen', {
  get: () => assets.buttonTaGreen,
  set: (value) => assets.buttonTaGreen = value
});

Object.defineProperty(window, 'thisTruthTa', {
  get: () => assets.thisTruthTa,
  set: (value) => assets.thisTruthTa = value
});

Object.defineProperty(window, 'thisMythTa', {
  get: () => assets.thisMythTa,
  set: (value) => assets.thisMythTa = value
});

Object.defineProperty(window, 'restartTa', {
  get: () => assets.restartTa,
  set: (value) => assets.restartTa = value
});

Object.defineProperty(window, 'startTa', {
  get: () => assets.startTa,
  set: (value) => assets.startTa = value
});

Object.defineProperty(window, 'resultBgTa', {
  get: () => assets.resultBgTa,
  set: (value) => assets.resultBgTa = value
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
  
  // Language-specific score images
  assets.scoreBg = loadImage('assets/score.png');
  assets.scoreBgMs = loadImage('assets/score-ms.png',
    () => console.log('✅ Malay score image loaded'),
    () => console.log('⚠️ Malay score image not found, will use fallback')
  );
  assets.scoreBgTa = loadImage('assets/score-ta.png',
    () => console.log('✅ Tamil score image loaded'),
    () => console.log('⚠️ Tamil score image not found, will use fallback')
  );
  assets.scoreBgZh = loadImage('assets/score-zh.png',
    () => console.log('✅ Chinese score image loaded'),
    () => console.log('⚠️ Chinese score image not found, will use fallback')
  );
  
  // Language-specific result images
  assets.result = loadImage('assets/result.png');
  assets.resultMs = loadImage('assets/result-ms.png',
    () => console.log('✅ Malay result image loaded'),
    () => console.log('⚠️ Malay result image not found, will use fallback')
  );
  assets.resultTa = loadImage('assets/result-ta.png',
    () => console.log('✅ Tamil result image loaded'),
    () => console.log('⚠️ Tamil result image not found, will use fallback')
  );
  assets.resultZh = loadImage('assets/result-zh.png',
    () => console.log('✅ Chinese result image loaded'),
    () => console.log('⚠️ Chinese result image not found, will use fallback')
  );
  assets.resultBg = loadImage('assets/result-bg.png');
  
  // Language-specific report images
  assets.report = loadImage('assets/report.png');
  assets.reportMs = loadImage('assets/report-ms.png',
    () => console.log('✅ Malay report image loaded'),
    () => console.log('⚠️ Malay report image not found, will use fallback')
  );
  assets.reportTa = loadImage('assets/report-ta.png',
    () => console.log('✅ Tamil report image loaded'),
    () => console.log('⚠️ Tamil report image not found, will use fallback')
  );
  assets.reportZh = loadImage('assets/report-zh.png',
    () => console.log('✅ Chinese report image loaded'),
    () => console.log('⚠️ Chinese report image not found, will use fallback')
  );
  assets.reportBg = loadImage('assets/report-bg.png');
  assets.star = loadImage('assets/star.png');
  assets.starShadow = loadImage('assets/star-shadow.png');
  assets.instruction = loadImage('assets/instruction.png');
  assets.instructionBg = loadImage('assets/instruction-bg.png');
  
  // Language-specific instruction images (with error handling)
  assets.instructionTa = loadImage('assets/instruction-ta.png', 
    () => console.log('✅ Tamil instruction image loaded'),
    () => console.log('⚠️ Tamil instruction image not found, will use fallback')
  );
  assets.instructionZh = loadImage('assets/instruction-zh.png',
    () => console.log('✅ Chinese instruction image loaded'),
    () => console.log('⚠️ Chinese instruction image not found, will use fallback')
  );
  assets.instructionMs = loadImage('assets/instruction-ms.png',
    () => console.log('✅ Malay instruction image loaded'),
    () => console.log('⚠️ Malay instruction image not found, will use fallback')
  );
  
  // Load language selection buttons
  assets.buttonBlue = loadImage('assets/button-blue.png');
  assets.buttonGreen = loadImage('assets/button-green.png');
  
  // Load Tamil-specific buttons
  assets.buttonTaBlue = loadImage('assets/button-ta-blue.png',
    () => console.log('✅ Tamil blue button loaded'),
    () => console.log('⚠️ Tamil blue button not found, will use fallback')
  );
  assets.buttonTaGreen = loadImage('assets/button-ta-green.png',
    () => console.log('✅ Tamil green button loaded'),
    () => console.log('⚠️ Tamil green button not found, will use fallback')
  );
  
  // Load Tamil feedback images
  assets.correctTa = loadImage('assets/correct-ta.png',
    () => console.log('✅ Tamil correct feedback image loaded'),
    () => console.log('⚠️ Tamil correct feedback image not found, will use fallback')
  );
  assets.wrongMythTa = loadImage('assets/wrong-myth-ta.png',
    () => console.log('✅ Tamil wrong myth feedback image loaded'),
    () => console.log('⚠️ Tamil wrong myth feedback image not found, will use fallback')
  );
  assets.wrongTruthTa = loadImage('assets/wrong-truth-ta.png',
    () => console.log('✅ Tamil wrong truth feedback image loaded'),
    () => console.log('⚠️ Tamil wrong truth feedback image not found, will use fallback')
  );
  assets.flyMythTa = loadImage('assets/fly-myth-ta.png',
    () => console.log('✅ Tamil fly myth feedback image loaded'),
    () => console.log('⚠️ Tamil fly myth feedback image not found, will use fallback')
  );
  assets.flyTruthTa = loadImage('assets/fly-truth-ta.png',
    () => console.log('✅ Tamil fly truth feedback image loaded'),
    () => console.log('⚠️ Tamil fly truth feedback image not found, will use fallback')
  );
  
  // Load Tamil label images for missed balloons
  assets.thisTruthTa = loadImage('assets/this-truth-ta.png',
    () => console.log('✅ Tamil truth label image loaded'),
    () => console.log('⚠️ Tamil truth label image not found, will use fallback')
  );
  assets.thisMythTa = loadImage('assets/this-myth-ta.png',
    () => console.log('✅ Tamil myth label image loaded'),
    () => console.log('⚠️ Tamil myth label image not found, will use fallback')
  );
  
  // Load Tamil restart and start images
  assets.restartTa = loadImage('assets/restart-ta.png',
    () => console.log('✅ Tamil restart image loaded'),
    () => console.log('⚠️ Tamil restart image not found, will use fallback')
  );
  assets.startTa = loadImage('assets/start-ta.png',
    () => console.log('✅ Tamil start image loaded'),
    () => console.log('⚠️ Tamil start image not found, will use fallback')
  );
  assets.resultBgTa = loadImage('assets/result-bg-ta.png',
    () => console.log('✅ Tamil result background image loaded'),
    () => console.log('⚠️ Tamil result background image not found, will use fallback')
  );
  
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
  
  // Load Tamil balloon images
  for (let color of GAME_CONFIG.balloonColors) {
    assets.balloonImagesTa.push(loadImage(`assets/${color}-ta.png`,
      () => console.log(`✅ Tamil balloon image ${color}-ta.png loaded`),
      () => console.log(`⚠️ Tamil balloon image ${color}-ta.png not found, will use fallback`)
    ));
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