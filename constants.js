// Game constants and configuration
const GAME_CONFIG = {
  aspectRatio: 16 / 9,
  balloonColors: ['darkblue', 'green', 'midblue', 'orange', 'red', 'violet', 'yellow']
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
  { name: 'Chinese', code: 'zh', label: '中文' },
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
    startSubtitle: "Ready to bust some myths and uncover the truth?",
    startInstruction: "HAMMER MYTH TO SELECT LANGUAGE AND HAMMER TRUTH TO START!",
    
    // Instruction screen
    instructionPrompt: "HAMMER ANY BUTTON TO START!",
    
    // End screen
    endRestartPrompt: "HAMMER ANY BUTTON TO RESTART",
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
      "Ageing\nalways means\nchronic pains",
      "Your brain can\ngrow new cells\n at any age",
      "Ageing\nmeans giving\nup on goals",
      "With ageing\ncomes freedom\nand wisdom",
      "Hair colour\ndoesn't define\nyour age",
      "You must act\nyour age"
    ]
  },
  ms: {
    // Start screen
    startSubtitle: "Sedia untuk menghancurkan mitos dan mencari kebenaran?",
    startInstruction: "TUKUL MITOS UNTUK PILIH BAHASA DAN TUKUL KEBENARAN UNTUK MULA!",
    
    // Instruction screen
    instructionPrompt: "TUKUL MANA-MANA BUTANG UNTUK MULA!",
    
    // End screen
    endRestartPrompt: "TUKUL MANA-MANA BUTANG UNTUK MULA SEMULA",
    autoRestartMessage: "Auto-mula semula dalam ${timeLeft}s",
    
    // Missed balloons labels
    truthLabel: "INI ADALAH\nKEBENARAN!",
    mythLabel: "INI ADALAH\nMITOS!",
    
    // Feedback messages
    correctFeedback: "Betul!",
    pointsSuffix: "mata",
    wrongFeedback: "Alamak!",
    truthWord: "kebenaran",
    mythWord: "mitos",
    escapeMessage: "Anda biarkan ${truthType} terbang",
    wrongChoiceMessage: "Ini sebenarnya ${truthType}",
    
    // Myths content
    myths: [
      "Penuaan\nsentiasa bermakna\nsakit kronik",
      "Otak anda boleh\nmenumbuhkan sel baru\n pada usia berapa pun",
      "Penuaan\nbermakna melepaskan\nmatlamat",
      "Dengan penuaan\ndatang kebebasan\ndan kebijaksanaan",
      "Warna rambut\ntidak menentukan\nusia anda",
      "Anda mesti bertindak\nmengikut usia anda"
    ]
  },
  zh: {
    // Start screen
    startSubtitle: "准备好打破迷思，发现真相了吗？",
    startInstruction: "用锤子敲击迷思选择语言，敲击真相开始游戏！",
    
    // Instruction screen
    instructionPrompt: "敲击任意按钮开始！",
    
    // End screen
    endRestartPrompt: "敲击任意按钮重新开始",
    autoRestartMessage: "将在${timeLeft}秒后自动重启",
    
    // Missed balloons labels
    truthLabel: "这是\n真相！",
    mythLabel: "这是\n迷思！",
    
    // Feedback messages
    correctFeedback: "答对了！",
    pointsSuffix: "分",
    wrongFeedback: "哎呀！",
    truthWord: "真相",
    mythWord: "迷思",
    escapeMessage: "你让${truthType}飞走了",
    wrongChoiceMessage: "这实际上是${truthType}",
    
    // Myths content
    myths: [
      "衰老\n总是意味着\n慢性疼痛",
      "您的大脑可以\n在任何年龄\n生长新细胞",
      "衰老\n意味着放弃\n目标",
      "随着衰老\n而来的是自由\n和智慧",
      "头发颜色\n不能定义\n您的年龄",
      "您必须\n表现得符合\n自己的年龄"
    ]
  },
  ta: {
    // Start screen
    startSubtitle: "கட்டுக்கதைகளை உடைத்து உண்மையை கண்டறிய தயாரா?",
    startInstruction: "மொழி தேர்வுக்கு கட்டுக்கதையை அடித்து, ஆரம்பிக்க உண்மையை அடிக்கவும்!",
    
    // Instruction screen
    instructionPrompt: "ஆரம்பிக்க எந்த பொத்தானையும் அடிக்கவும்!",
    
    // End screen
    endRestartPrompt: "மீண்டும் ஆரம்பிக்க எந்த பொத்தானையும் அடிக்கவும்",
    autoRestartMessage: "${timeLeft}வி-ல் தானாக மீண்டும் ஆரம்பிக்கும்",
    
    // Missed balloons labels
    truthLabel: "இது\nஉண்மை!",
    mythLabel: "இது\nகட்டுக்கதை!",
    
    // Feedback messages
    correctFeedback: "சரி!",
    pointsSuffix: "புள்ளிகள்",
    wrongFeedback: "அய்யோ!",
    truthWord: "உண்மை",
    mythWord: "கட்டுக்கதை",
    escapeMessage: "நீங்கள் ${truthType} பறக்க விட்டீர்கள்",
    wrongChoiceMessage: "இது உண்மையில் ${truthType}",
    
    // Myths content
    myths: [
      "வயதாகுதல்\nஎப்போதும்\nநாள்பட்ட வலி",
      "உங்கள் மூளை\nஎந்த வயதிலும்\nபுதிய செல்களை வளர்க்கும்",
      "வயதாகுதல்\nஇலக்குகளை\nவிட்டுவிடுவது",
      "வயதாகுதலுடன்\nசுதந்திரமும்\nஞானமும் வரும்",
      "முடியின் நிறம்\nஉங்கள் வயதை\nவரையறுக்காது",
      "நீங்கள் உங்கள்\nவயதுக்கு ஏற்ப\nநடந்துகொள்ள வேண்டும்"
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
  const lang = window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en';
  let text = UI_TEXT[lang] ? UI_TEXT[lang][key] : UI_TEXT.en[key];
  
  // Replace template variables
  Object.keys(variables).forEach(varKey => {
    text = text.replace(new RegExp(`\\$\\{${varKey}\\}`, 'g'), variables[varKey]);
  });
  
  return text;
}

// Helper function to get localized myth list
function getLocalizedMythList() {
  const lang = window.getSelectedLanguage ? window.getSelectedLanguage().code : 'en';
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

// Make constants globally available for p5.js compatibility and module access
window.GAME_CONFIG = GAME_CONFIG;
window.COLORS = COLORS;
window.LANGUAGES = LANGUAGES;
window.LANGUAGE_COLORS = LANGUAGE_COLORS;
window.UI_TEXT = UI_TEXT;
window.getText = getText;
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