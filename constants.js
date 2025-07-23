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

// Fun myth colors (currently unused but kept for potential future use)
const MYTH_COLORS = [
  '#FF6B9D',  // Hot pink
  '#00D2D3',  // Bright cyan
  '#FF8A5B',  // Coral orange
  '#FDCB6E',  // Sunny yellow
  '#A29BFE',  // Soft purple
  '#FD79A8',  // Pink
  '#00B894',  // Emerald
  '#E17055'   // Terra cotta
];

// Game data
const MYTH_LIST = [
  { text: "Ageing\nalways means\nchronic pains", truth: false },
  { text: "Your brain can\ngrow new cells\n at any age", truth: true },
  { text: "Ageing\nmeans giving\nup on goals", truth: false },
  { text: "With ageing\ncomes freedom\nand wisdom", truth: true },
  { text: "Hair colour\ndoesn't define\nyour age", truth: true },
  { text: "You must act\nyour age", truth: false }
];

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

// Make constants globally available for p5.js compatibility and module access
window.GAME_CONFIG = GAME_CONFIG;
window.COLORS = COLORS;
window.MYTH_COLORS = MYTH_COLORS;
window.MYTH_LIST = MYTH_LIST;
window.SCORE_VALUES = SCORE_VALUES;
window.SCORING_CONFIG = SCORING_CONFIG;
window.SCORE_THRESHOLDS = SCORE_THRESHOLDS;
window.GAME_STATES = GAME_STATES;
window.TIMING = TIMING; 