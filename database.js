// Database utilities for Supabase integration
import { createClient } from '@supabase/supabase-js';
import { CSVDatabase } from './csvDatabase.js';

// Debug environment variables
console.log('Environment check:', {
  hasViteSupabaseUrl: !!import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  hasViteSupabaseKey: !!import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
  nodeEnv: import.meta.env.MODE,
  allEnvKeys: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
});

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;
let hasLoggedOfflineWarning = false;
let csvDatabase = null;

// Check database mode from constants
const getDatabaseMode = () => {
  // Access DEPLOYMENT_CONFIG from window (since constants.js sets it globally)
  return window.DEPLOYMENT_CONFIG?.databaseMode || 'supabase';
};

// Initialize database based on configuration
const databaseMode = getDatabaseMode();

if (databaseMode === 'csv') {
  // Use CSV database
  csvDatabase = new CSVDatabase();
  console.log('CSV Database mode enabled');
} else {
  // Original Supabase behavior
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Database connection available');
  } else {
    console.log('Running in offline mode - using localStorage for data storage');
    console.log('Missing env vars:', { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
    hasLoggedOfflineWarning = true;
  }
}

// Game session tracking
let currentGameSession = null;

// LocalStorage keys
const STORAGE_KEYS = {
  GAME_SESSIONS: 'whack_a_myth_sessions',
  CURRENT_SESSION: 'whack_a_myth_current_session',
  SESSION_COUNTER: 'whack_a_myth_session_counter'
};

// LocalStorage helper functions
function getLocalData(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

function setLocalData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
}

function getNextSessionId() {
  const counter = getLocalData(STORAGE_KEYS.SESSION_COUNTER, 0);
  const newId = counter + 1;
  setLocalData(STORAGE_KEYS.SESSION_COUNTER, newId);
  return newId;
}

function saveSessionToLocal(session) {
  const sessions = getLocalData(STORAGE_KEYS.GAME_SESSIONS, []);
  const existingIndex = sessions.findIndex(s => s.id === session.id);
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  setLocalData(STORAGE_KEYS.GAME_SESSIONS, sessions);
  setLocalData(STORAGE_KEYS.CURRENT_SESSION, session);
}

/**
 * Start a new game session and log start time to database or localStorage
 * @returns {number|null} Database record ID or null if both database and localStorage fail
 */
export async function startGameSession() {
  // Use CSV database if enabled
  if (csvDatabase) {
    try {
      const sessionId = csvDatabase.startGameSession();
      currentGameSession = csvDatabase.getCurrentSession();
      return sessionId;
    } catch (error) {
      console.error('CSV database error:', error);
      return null;
    }
  }

  // Original Supabase/localStorage logic
  const startTime = new Date().toISOString();
  
  // Try database first if available
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('data')
        .insert([{ start_time: startTime }])
        .select();

      if (!error && data) {
        currentGameSession = {
          id: data[0].id,
          startTime: startTime,
          source: 'database'
        };
        console.log('Game session started (database):', currentGameSession);
        return data[0].id;
      }
    } catch (error) {
      console.error('Database error, falling back to localStorage:', error);
    }
  }
  
  // Fallback to localStorage
  try {
    const sessionId = getNextSessionId();
    const session = {
      id: sessionId,
      start_time: startTime,
      source: 'localStorage'
    };
    
    currentGameSession = {
      id: sessionId,
      startTime: startTime,
      source: 'localStorage'
    };
    
    saveSessionToLocal(session);
    console.log('Game session started (localStorage):', currentGameSession);
    return sessionId;
  } catch (error) {
    console.error('Error starting game session (localStorage):', error);
    return null;
  }
}

/**
 * End the current game session and log end time and score
 * @param {number} finalScore - The final score of the game
 * @returns {boolean} Success status
 */
export async function endGameSession(finalScore) {
  // Use CSV database if enabled
  if (csvDatabase) {
    try {
      const success = await csvDatabase.endGameSession(finalScore);
      currentGameSession = null;
      return success;
    } catch (error) {
      console.error('CSV database error:', error);
      return false;
    }
  }

  // Original Supabase/localStorage logic
  if (!currentGameSession) {
    return false;
  }

  const endTime = new Date().toISOString();
  
  // Try database first if this session came from database
  if (supabase && currentGameSession.source === 'database') {
    try {
      const { error } = await supabase
        .from('data')
        .update({
          end_time: endTime,
          result: finalScore
        })
        .eq('id', currentGameSession.id);

      if (!error) {
        console.log('Game session ended (database):', {
          ...currentGameSession,
          endTime: endTime,
          finalScore: finalScore
        });
        currentGameSession = null;
        return true;
      }
    } catch (error) {
      console.error('Database error, falling back to localStorage:', error);
    }
  }
  
  // Use localStorage (either as fallback or primary)
  try {
    const sessions = getLocalData(STORAGE_KEYS.GAME_SESSIONS, []);
    const sessionIndex = sessions.findIndex(s => s.id === currentGameSession.id);
    
    if (sessionIndex >= 0) {
      sessions[sessionIndex] = {
        ...sessions[sessionIndex],
        end_time: endTime,
        result: finalScore
      };
      setLocalData(STORAGE_KEYS.GAME_SESSIONS, sessions);
    }
    
    console.log('Game session ended (localStorage):', {
      ...currentGameSession,
      endTime: endTime,
      finalScore: finalScore
    });
    
    currentGameSession = null;
    setLocalData(STORAGE_KEYS.CURRENT_SESSION, null);
    return true;
  } catch (error) {
    console.error('Error ending game session (localStorage):', error);
    return false;
  }
}

/**
 * Get the current game session
 * @returns {object|null} Current session data or null
 */
export function getCurrentSession() {
  if (csvDatabase) {
    return csvDatabase.getCurrentSession();
  }
  return currentGameSession;
}

/**
 * Check if database is available
 * @returns {boolean} Database availability status
 */
export function isDatabaseAvailable() {
  if (csvDatabase) {
    return csvDatabase.isDatabaseAvailable();
  }
  return supabase !== null;
}

/**
 * Get all stored game sessions from localStorage
 * @returns {Array} Array of game sessions
 */
export function getStoredSessions() {
  if (csvDatabase) {
    return csvDatabase.getStoredSessions();
  }
  return getLocalData(STORAGE_KEYS.GAME_SESSIONS, []);
}

/**
 * Get basic statistics from stored sessions
 * @returns {object} Statistics object
 */
export function getGameStats() {
  if (csvDatabase) {
    return csvDatabase.getGameStats();
  }
  
  const sessions = getLocalData(STORAGE_KEYS.GAME_SESSIONS, []);
  const completedSessions = sessions.filter(s => s.end_time && s.result !== undefined);
  
  if (completedSessions.length === 0) {
    return { totalGames: 0, averageScore: 0, highScore: 0, totalPlayTime: 0 };
  }
  
  const scores = completedSessions.map(s => s.result);
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const highScore = Math.max(...scores);
  
  // Calculate total play time
  const totalPlayTime = completedSessions.reduce((total, session) => {
    if (session.start_time && session.end_time) {
      const start = new Date(session.start_time);
      const end = new Date(session.end_time);
      return total + (end - start);
    }
    return total;
  }, 0);
  
  return {
    totalGames: completedSessions.length,
    averageScore: Math.round(totalScore / completedSessions.length),
    highScore: highScore,
    totalPlayTime: Math.round(totalPlayTime / 1000) // Convert to seconds
  };
}

/**
 * Clear all stored game data (useful for testing or reset)
 * @returns {boolean} Success status
 */
export function clearStoredData() {
  if (csvDatabase) {
    return csvDatabase.clearStoredData();
  }
  
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    localStorage.removeItem(STORAGE_KEYS.SESSION_COUNTER);
    console.log('All stored game data cleared');
    return true;
  } catch (error) {
    console.error('Error clearing stored data:', error);
    return false;
  }
} 