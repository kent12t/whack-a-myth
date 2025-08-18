// Game constants and configuration
const DEPLOYMENT_CONFIG = {
  // Set to false to disable language switching for deployment
  // Set to true to re-enable full language selection functionality
  // When false: only English is used, language buttons are hidden, both 0/spacebar and 1/enter proceed from start screen
  // When true: original behavior with language cycling and selection
  enableLanguageSelection: true,
  
  // Database configuration
  // Set to 'csv' to use local CSV file storage instead of Supabase/localStorage
  // Set to 'supabase' to use original Supabase + localStorage fallback behavior
  databaseMode: 'csv'
};

const GAME_CONFIG = {
  aspectRatio: 16 / 9,
  balloonColors: ['darkblue', 'green', 'orange', 'red', 'violet', 'yellow']
};

// Color palette - Vibrant and happy!
const COLORS = {
  primary: '#6C5CE7',      // Vibrant purple
  secondary: '#FF6B9D',    // Hot pink
  accent: '#ea5628',       // Coral orange
  success: '#00D2D3',      // Bright cyan
  warning: '#FDCB6E',      // Sunny yellow
  background: '#DDA0DD',   // Plum
  text: '#2D3436',         // Dark gray
  white: '#FFFFFF'
};

// Language selection system
const LANGUAGES = [
  { name: 'English', code: 'en', label: 'English' },
  { name: 'Bahasa Melayu', code: 'ms', label: 'Bahasa\nMelayu' },
  { name: 'Chinese', code: 'zh', label: '华语' },
  { name: 'Tamil', code: 'ta', label: 'தமிழ்' }
];

// SVG colors for language selection
const LANGUAGE_COLORS = {
  DEFAULT: '#4650a2',
  SELECTED: '#14a260'
};

// UI Text content by language
const UI_TEXT = {
  en: {
    // Start screen
    startSubtitle: "Ready to bust some myths?",
    startInstruction: "HAMMER RED BUTTON TO SELECT LANGUAGE AND HAMMER GREEN BUTTON TO START!",
    
    // Instruction screen
    instructionPrompt: "HAMMER ANY BUTTON TO START!",
    
    // End screen
    endRestartPrompt: "HAMMER ANY BUTTON TO RESTART!",
    autoRestartMessage: "Auto-restarting in ${timeLeft}s",
    
    // Missed balloons labels
    truthLabel: "THIS IS\nA TRUTH!",
    mythLabel: "THIS IS\nA MYTH!",
    
    // Feedback messages
    correctFeedback: "You got it!",
    pointsSuffix: "points",
    wrongFeedback: "Oops!",
    truthWord: "truth",
    mythWord: "myth",
    escapeMessage: "You let a ${truthType} fly away",
    wrongChoiceMessage: "This one's actually a ${truthType}",
    
    // Myths content
    myths: [
      "Ageing\nalways means\nchronic pains.",
      "Your brain can\ngrow new cells\n at any age.",
      "Ageing\nmeans giving\nup on goals.",
      "With ageing\ncomes freedom\nand wisdom.",
      "Hair colour\ndoesn't define\nyour age.",
      "You must act\nyour age!"
    ]
  },
  ms: {
    // Start screen
    startSubtitle: "Adakah anda bersedia untuk membongkar beberapa mitos dan mendedahkan fakta?",
    startInstruction: "PUKUL BUTANG MERAH UNTUK MEMILIH BAHASA DAN PUKUL BUTANG HIJAU UNTUK BERMULA!",
    
    // Instruction screen
    instructionPrompt: "PUKUL MANA-MANA BUTANG UNTUK BERMULA!",
    
    // End screen
    endRestartPrompt: "PUKUL MANA-MANA BUTANG UNTUK BERMULA SEMULA!",
    autoRestartMessage: "Permainan akan bermula dalam ${timeLeft} saat",
    
    // Missed balloons labels
    truthLabel: "INI ADALAH\nFAKTA!",
    mythLabel: "INI ADALAH\nMITOS!",
    
    // Feedback messages
    correctFeedback: "Anda berjaya!",
    pointsSuffix: "mata",
    wrongFeedback: "Alamak!",
    truthWord: "fakta",
    mythWord: "mitos",
    escapeMessage: "Anda membiarkan ${truthType} terbang",
    wrongChoiceMessage: "Ini sebenarnya ${truthType}!",
    
    // Myths content
    myths: [
      "Penuaan\nsentiasa\nmembawa\nkesakitan\nkronik.",
      "Sel otak anda\nboleh tumbuh\npada sebarang\nperingkat usia.",
      "Penuaan\nbermakna\nberhenti\nmengejar\ncita-cita.",
      "Penuaan\nmembawa\nkebebasan dan\nkebijaksanaan.",
      "Warna\nrambut tidak\nmelambangkan\nusia anda.",
      "Anda mesti\nbertingkah-laku\nsepadan dengan\nusia anda!"
    ]
  },
  zh: {
    // Start screen
    startSubtitle: "准备好打破迷思，揭开真相了吗？",
    // startInstruction: "锤击红色选择语言，锤击绿色开始游戏！",
    startInstruction: "锤击红色按钮选择语言，锤击绿色按钮开始游戏！！",
    
    // Instruction screen
    instructionPrompt: "敲击任意按钮开始游戏！",
    
    // End screen
    endRestartPrompt: "敲击任意按钮重新开始！",
    autoRestartMessage: "将于${timeLeft}秒后自动重启",
    
    // Missed balloons labels
    truthLabel: "这是\n真相！",
    mythLabel: "这是\n迷思！",
    
    // Feedback messages
    correctFeedback: "恭喜您答对了！",
    pointsSuffix: "分",
    wrongFeedback: "哎呀！",
    truthWord: "真相",
    mythWord: "迷思",
    escapeMessage: "你让${truthType}飞走了",
    wrongChoiceMessage: "这其实是个${truthType}",
    
    // Myths content
    myths: [
      "衰老总伴随\n着慢性疼痛。",
      "大脑在任何\n年龄都能生成\n新细胞。",
      "衰老意味着\n放弃目标。",
      "年龄越大，\n自由与智慧越深。",
      "发色，不能定\n义年龄。",
      "行为应与年\n龄相称！"
    ]
  },
  ta: {
    // Start screen
    startSubtitle: "சில கட்டுக்கதைகளை உடைத்து உண்மையை வெளிக்கொணர நீங்கள் தயாரா?",
    // startInstruction: "மொழியைத் தேர்வு செய்ய 'MYTH' மீது சுத்தியலைப் பிடித்துத் தட்டவும். ஆரம்பிக்க 'TRUTH' மீது சுத்தியலால் தட்டவும்.",
    startInstruction: "மொழியைத் தேர்வு செய்ய சிவப்பு பொத்தான் மீது சுத்தியலைப் பிடித்துத் தட்டவும்.\nஆரம்பிக்க பச்சை பொத்தான் மீது சுத்தியலால் தட்டவும்.",
    
    // Instruction screen
    instructionPrompt: "தொடங்குவதற்கு ஏதேனும் ஒரு பொத்தானை சுத்தியால் தட்டவும்!",
    
    // End screen
    endRestartPrompt: "தொடங்குவதற்கு ஏதேனும் ஒரு பொத்தானை சுத்தியால் தட்டவும்.",
    autoRestartMessage: "${timeLeft}  நொடிகளில் தானாக மீண்டும் தொடங்கும்",
    
    // Missed balloons labels
    truthLabel: "இது\nஓர் உண்மை.",
    mythLabel: "இது\nஒரு கட்டுக்கதை.",
    
    // Feedback messages
    correctFeedback: "நீங்கள் வென்று விட்டீர்கள்!",
    pointsSuffix: " புள்ளிகள்",
    wrongFeedback: "இல்லை!",
    truthWord: "ஓர் உண்மை",
    mythWord: "ஒரு கட்டுக்கதை",
    escapeMessage: "நீங்கள் ${truthType} தப்பிச் செல்ல விட்டீர்கள",
    wrongChoiceMessage: "இது உண்மையாகவே ${truthType} தான்",
    
    // Myths content
    myths: [
      "நாள்பட்ட வலி\nஎன்பது\nமுதுமையைக்\nகுறிக்கிறது.",
      "உங்கள்\nமூளை எந்த\nவயதிலும் புதிய\nசெல்களை\nஉருவாக்க\nமுடியும்.",
      "முதுமை என்பது\nஇலக்குகளை\nவிட்டுக்கொடுப்பதைக்\nகுறிக்கிறது.",
      "முதுமையுடன்\nசுதந்திரமும்\nஞானமும்\nவளர்கிறது.",
      "தலை முடியின்\nநிறம் உங்கள்\nவயதை\nவரையறுக்காது.",
      "உங்கள்\nவயதிற்கேற்றப்படி\nசெயல்பட\nவேண்டும்."
    ]
  }
};

// Game data - truth values for each myth (language-independent)
const MYTH_TRUTH_VALUES = [false, true, false, true, true, false];

// Scoring values
const SCORE_VALUES = {
  CORRECT: 20,
  WRONG_BUTTON: -10,
  FLY_AWAY: -5
};

// Game constants derived from scoring
const SCORING_CONFIG = {
  MAX_POSSIBLE_SCORE: SCORE_VALUES.CORRECT * 6,
  MIN_POSSIBLE_SCORE: SCORE_VALUES.WRONG_BUTTON * 6,
  get SCORE_RANGE() { return this.MAX_POSSIBLE_SCORE - this.MIN_POSSIBLE_SCORE; }
};

// Score thresholds for star rating
const SCORE_THRESHOLDS = {
  THREE_STARS: 40,
  TWO_STARS: 10,
  ONE_STAR: -15
};

// Game states
const GAME_STATES = {
  START: "START",
  INSTRUCTION: "INSTRUCTION", 
  PLAYING: "PLAYING",
  END: "END"
};

// Timing constants
const TIMING = {
  FEEDBACK_DURATION: 90,
  ESCAPE_FEEDBACK_DURATION: 120,
  END_SCREEN_DURATION: 1800  // 30 seconds at 60fps
};

// Helper function to get text in current language
function getText(key, variables = {}) {
  // In deployment mode, always use English
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  let text = UI_TEXT[lang] ? UI_TEXT[lang][key] : UI_TEXT.en[key];
  
  // Replace template variables
  Object.keys(variables).forEach(varKey => {
    text = text.replace(new RegExp(`\\$\\{${varKey}\\}`, 'g'), variables[varKey]);
  });
  
  return text;
}

// Helper function to get localized myth list
function getLocalizedMythList() {
  // In deployment mode, always use English
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  const mythTexts = UI_TEXT[lang] ? UI_TEXT[lang].myths : UI_TEXT.en.myths;
  
  return mythTexts.map((text, index) => ({
    text: text,
    truth: MYTH_TRUTH_VALUES[index]
  }));
}

// Legacy MYTH_LIST for backward compatibility (returns localized version)
function getMythList() {
  return getLocalizedMythList();
}

// Helper function to check if a font is properly loaded
function isFontLoaded(font) {
  return font && typeof font === 'object' && font.font;
}

// Debug function to log font status
function debugFontStatus() {
  console.log('🔍 Font Debug Status:');
  console.log('  gameFont loaded:', isFontLoaded(window.gameFont));
  console.log('  notoSansFont loaded:', isFontLoaded(window.notoSansFont));
  console.log('  notoSansSCFont loaded:', isFontLoaded(window.notoSansSCFont));
  
  if (window.getSelectedLanguage) {
    const currentLang = window.getSelectedLanguage().code;
    console.log('  Current language:', currentLang);
    console.log('  Current font should be:', getCurrentFont() === window.gameFont ? 'gameFont' : 
                getCurrentFont() === window.notoSansFont ? 'notoSansFont' : 
                getCurrentFont() === window.notoSansSCFont ? 'notoSansSCFont' : 'unknown');
  }
}

// Helper function to get appropriate font based on current language
function getCurrentFont() {
  // In deployment mode, always use English (default font)
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil
      if (isFontLoaded(window.notoSansFont)) {
        return window.notoSansFont;
      } else {
        console.warn('⚠️ Tamil font not loaded, using fallback');
        return window.gameFont;
      }
    case 'zh': // Chinese
      if (isFontLoaded(window.notoSansSCFont)) {
        return window.notoSansSCFont;
      } else {
        console.warn('⚠️ Chinese font (NotoSansSC) not loaded, using fallback');
        return window.gameFont;
      }
    case 'en': // English
    case 'ms': // Bahasa Melayu
    default:
      return window.gameFont; // Default font for English and Malay
  }
}

// Helper function to get font for numbers - Chinese and Tamil use default font for numbers
function getFontForNumbers() {
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  // Always use default font for numbers in Chinese and Tamil to avoid rendering issues
  if (lang === 'zh') {
    // console.log('🔢 Using default font for numbers in Chinese mode');
    return window.gameFont;
  } else if (lang === 'ta') {
    // console.log('🔢 Using default font for numbers in Tamil mode');
    return window.gameFont;
  }
  
  // For other languages, use the same logic as getCurrentFont
  return getCurrentFont();
}

// Helper function to get appropriate font for a specific language code
function getFontForLanguage(languageCode) {
  switch (languageCode) {
    case 'ta': // Tamil
      if (isFontLoaded(window.notoSansFont)) {
        return window.notoSansFont;
      } else {
        console.warn('⚠️ Tamil font not available for language selection');
        return window.gameFont;
      }
    case 'zh': // Chinese
      if (isFontLoaded(window.notoSansSCFont)) {
        return window.notoSansSCFont;
      } else {
        console.warn('⚠️ Chinese font (NotoSansSC) not available for language selection');
        return window.gameFont;
      }
    case 'en': // English
    case 'ms': // Bahasa Melayu
    default:
      return window.gameFont;
  }
}

// Helper function to get language-specific font size based on width multiplier
function getFontSize(baseMultiplier) {
  // In deployment mode, always use English (default sizing)
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil - slightly smaller font
      return width * baseMultiplier * 0.9;
    case 'zh': // Chinese - larger font
      return width * baseMultiplier * 1.15;
    case 'en': // English
    case 'ms': // Bahasa Melayu
    default:
      return width * baseMultiplier; // Default size
  }
}

// Helper function to get language-specific font size based on object size multiplier (for balloons, etc.)
function getFontSizeFromObject(objectSize, baseMultiplier) {
  // In deployment mode, always use English (default sizing)
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil - slightly smaller font
      return objectSize * baseMultiplier * 0.9;
    case 'zh': // Chinese - larger font
      return objectSize * baseMultiplier * 1.15;
    case 'en': // English
    case 'ms': // Bahasa Melayu
    default:
      return objectSize * baseMultiplier; // Default size
  }
}

// Helper function to get font size for a specific language (for language selector buttons)
function getFontSizeForLanguage(languageCode, baseMultiplier) {
  switch (languageCode) {
    case 'ta': // Tamil - slightly smaller font
      return width * baseMultiplier * 0.9;
    case 'zh': // Chinese - larger font
      return width * baseMultiplier * 1.15;
    case 'en': // English
    case 'ms': // Bahasa Melayu
    default:
      return width * baseMultiplier; // Default size
  }
}

// Helper function to get language-specific instruction image
function getInstructionImage() {
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil
      return (window.instructionTa && window.instructionTa.width > 0) ? window.instructionTa : window.instruction;
    case 'zh': // Chinese
      return (window.instructionZh && window.instructionZh.width > 0) ? window.instructionZh : window.instruction;
    case 'ms': // Bahasa Melayu
      return (window.instructionMs && window.instructionMs.width > 0) ? window.instructionMs : window.instruction;
    case 'en': // English
    default:
      return window.instruction;
  }
}

// Helper function to get language-specific score background image
function getScoreBgImage() {
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil
      return (window.scoreBgTa && window.scoreBgTa.width > 0) ? window.scoreBgTa : window.scoreBg;
    case 'zh': // Chinese
      return (window.scoreBgZh && window.scoreBgZh.width > 0) ? window.scoreBgZh : window.scoreBg;
    case 'ms': // Bahasa Melayu
      return (window.scoreBgMs && window.scoreBgMs.width > 0) ? window.scoreBgMs : window.scoreBg;
    case 'en': // English
    default:
      return window.scoreBg;
  }
}

// Helper function to get language-specific result images
function getResultImages() {
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil
      return {
        result: (window.resultTa && window.resultTa.width > 0) ? window.resultTa : window.result,
        resultBg: (window.resultBgTa && window.resultBgTa.width > 0) ? window.resultBgTa : window.resultBg
      };
    case 'zh': // Chinese
      return {
        result: (window.resultZh && window.resultZh.width > 0) ? window.resultZh : window.result,
        resultBg: window.resultBg  // Always use the same result background
      };
    case 'ms': // Bahasa Melayu
      return {
        result: (window.resultMs && window.resultMs.width > 0) ? window.resultMs : window.result,
        resultBg: window.resultBg  // Always use the same result background
      };
    case 'en': // English
    default:
      return {
        result: window.result,
        resultBg: window.resultBg
      };
  }
}

// Helper function to get language-specific report images
function getReportImages() {
  const lang = DEPLOYMENT_CONFIG.enableLanguageSelection 
    ? (window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en')
    : 'en';
  
  switch (lang) {
    case 'ta': // Tamil
      return {
        report: (window.reportTa && window.reportTa.width > 0) ? window.reportTa : window.report,
        reportBg: window.reportBg  // Always use the same report background
      };
    case 'zh': // Chinese
      return {
        report: (window.reportZh && window.reportZh.width > 0) ? window.reportZh : window.report,
        reportBg: window.reportBg  // Always use the same report background
      };
    case 'ms': // Bahasa Melayu
      return {
        report: (window.reportMs && window.reportMs.width > 0) ? window.reportMs : window.report,
        reportBg: window.reportBg  // Always use the same report background
      };
    case 'en': // English
    default:
      return {
        report: window.report,
        reportBg: window.reportBg
      };
  }
}

// Make constants globally available for p5.js compatibility and module access
window.GAME_CONFIG = GAME_CONFIG;
window.DEPLOYMENT_CONFIG = DEPLOYMENT_CONFIG;
window.COLORS = COLORS;
window.LANGUAGES = LANGUAGES;
window.LANGUAGE_COLORS = LANGUAGE_COLORS;
window.UI_TEXT = UI_TEXT;
window.getText = getText;
window.isFontLoaded = isFontLoaded;
window.debugFontStatus = debugFontStatus;
window.getCurrentFont = getCurrentFont;
window.getFontForNumbers = getFontForNumbers;
window.getFontForLanguage = getFontForLanguage;
window.getFontSize = getFontSize;
window.getFontSizeFromObject = getFontSizeFromObject;
window.getFontSizeForLanguage = getFontSizeForLanguage;
window.getInstructionImage = getInstructionImage;
window.getScoreBgImage = getScoreBgImage;
window.getResultImages = getResultImages;
window.getReportImages = getReportImages;
window.MYTH_TRUTH_VALUES = MYTH_TRUTH_VALUES;
window.getLocalizedMythList = getLocalizedMythList;
window.getMythList = getMythList;
// Legacy support - MYTH_LIST now returns localized version
Object.defineProperty(window, 'MYTH_LIST', {
  get: function() {
    return getLocalizedMythList();
  }
});
window.SCORE_VALUES = SCORE_VALUES;
window.SCORING_CONFIG = SCORING_CONFIG;
window.SCORE_THRESHOLDS = SCORE_THRESHOLDS;
window.GAME_STATES = GAME_STATES;
window.TIMING = TIMING; 