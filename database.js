// Database utilities for Supabase integration
import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase client if environment variables are available
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Database connection available');
} else {
  console.log('Running in offline mode - database features disabled');
  console.log('Missing env vars:', { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
  hasLoggedOfflineWarning = true;
}

// Game session tracking
let currentGameSession = null;

/**
 * Start a new game session and log start time to database
 * @returns {number|null} Database record ID or null if database is not available
 */
export async function startGameSession() {
  if (!supabase) {
    return null; // Silently return null when offline
  }

  try {
    const startTime = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('data')
      .insert([
        {
          start_time: startTime
        }
      ])
      .select();

    if (error) {
      console.error('Error starting game session:', error);
      return null;
    }

    currentGameSession = {
      id: data[0].id,
      startTime: startTime
    };

    console.log('Game session started:', currentGameSession);
    return data[0].id;
  } catch (error) {
    console.error('Error starting game session:', error);
    return null;
  }
}

/**
 * End the current game session and log end time and score
 * @param {number} finalScore - The final score of the game
 * @returns {boolean} Success status
 */
export async function endGameSession(finalScore) {
  if (!supabase || !currentGameSession) {
    return false; // Silently return false when offline or no session
  }

  try {
    const endTime = new Date().toISOString();
    
    const { error } = await supabase
      .from('data')
      .update({
        end_time: endTime,
        result: finalScore
      })
      .eq('id', currentGameSession.id);

    if (error) {
      console.error('Error ending game session:', error);
      return false;
    }

    console.log('Game session ended:', {
      ...currentGameSession,
      endTime: endTime,
      finalScore: finalScore
    });

    currentGameSession = null;
    return true;
  } catch (error) {
    console.error('Error ending game session:', error);
    return false;
  }
}

/**
 * Get the current game session
 * @returns {object|null} Current session data or null
 */
export function getCurrentSession() {
  return currentGameSession;
}

/**
 * Check if database is available
 * @returns {boolean} Database availability status
 */
export function isDatabaseAvailable() {
  return supabase !== null;
} 