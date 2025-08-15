// Simple CSV Database implementation using device-specific files
// This provides an offline-only alternative to the Supabase/localStorage approach

import { getDeviceId } from './deviceId.js';

class CSVDatabase {
  constructor() {
    this.deviceId = getDeviceId();
    this.csvFileName = `game_sessions_${this.deviceId}.csv`;
    this.currentSession = null;
    this.sessionCounter = 0;
    this.csvData = []; // Cache for CSV data
    
    // Initialize CSV data
    this.loadCSVData();
  }

  /**
   * Load existing CSV data from localStorage and set session counter
   */
  loadCSVData() {
    try {
      // Load data from device-specific localStorage key
      const storageKey = `csv_game_sessions_data_${this.deviceId}`;
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        this.csvData = JSON.parse(storedData);
        console.log(`CSV database loaded from localStorage for device ${this.deviceId}:`, this.csvData.length, 'sessions');
        
        // Set session counter to highest ID + 1
        if (this.csvData.length > 0) {
          const maxId = Math.max(...this.csvData.map(row => parseInt(row.id) || 0));
          this.sessionCounter = maxId;
        }
      } else {
        console.log(`No existing CSV data found for device ${this.deviceId}, starting fresh`);
        this.csvData = [];
        this.sessionCounter = 0;
      }
    } catch (error) {
      console.error('Error loading CSV data from localStorage:', error);
      this.csvData = [];
      this.sessionCounter = 0;
    }
  }



  /**
   * Save CSV data to localStorage (for backup) 
   */
  saveToLocalStorage() {
    try {
      const storageKey = `csv_game_sessions_data_${this.deviceId}`;
      localStorage.setItem(storageKey, JSON.stringify(this.csvData));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  /**
   * Add new session to CSV file via server
   */
  async addSessionToCSV(sessionData) {
    try {
      // Add device ID to session data
      const sessionWithDevice = {
        ...sessionData,
        device_id: this.deviceId
      };

      // Send to server to append to device-specific CSV file
      const response = await fetch('/append-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionWithDevice)
      });

      if (response.ok) {
        const result = await response.json();
        // Also add to local cache and localStorage
        this.csvData.push(sessionData);
        this.saveToLocalStorage();
        console.log(`Session added to CSV file: ${result.file}`, sessionData);
        return true;
      } else {
        console.error('Failed to append to CSV file');
        return false;
      }
    } catch (error) {
      console.error('Error appending to CSV file:', error);
      return false;
    }
  }

  /**
   * Start a new game session
   */
  startGameSession() {
    try {
      this.sessionCounter++;
      const sessionId = this.sessionCounter;
      const startTime = new Date().toISOString();
      
      this.currentSession = {
        id: sessionId,
        startTime: startTime,
        source: 'csv'
      };
      
      console.log('CSV game session started:', this.currentSession);
      return sessionId;
    } catch (error) {
      console.error('Error starting CSV game session:', error);
      return null;
    }
  }

  /**
   * End the current game session
   */
  async endGameSession(finalScore) {
    if (!this.currentSession) {
      console.error('No current session to end');
      return false;
    }

    try {
      const endTime = new Date().toISOString();
      const sessionData = {
        id: this.currentSession.id.toString(),
        start_time: this.currentSession.startTime,
        end_time: endTime,
        result: finalScore.toString(),
        session_date: new Date().toLocaleDateString()
      };
      
      const success = await this.addSessionToCSV(sessionData);
      
      if (success) {
        console.log('CSV game session ended:', {
          ...this.currentSession,
          endTime: endTime,
          finalScore: finalScore
        });
        
        this.currentSession = null;
        return true;
      } else {
        console.error('Failed to save session to CSV');
        return false;
      }
    } catch (error) {
      console.error('Error ending CSV game session:', error);
      return false;
    }
  }

  /**
   * Get current session
   */
  getCurrentSession() {
    return this.currentSession;
  }

  /**
   * Get all stored sessions
   */
  getStoredSessions() {
    return this.csvData.map(row => ({
      id: parseInt(row.id),
      start_time: row.start_time,
      end_time: row.end_time,
      result: row.result ? parseInt(row.result) : undefined
    }));
  }

  /**
   * Get game statistics
   */
  getGameStats() {
    try {
      const sessions = this.getStoredSessions();
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
    } catch (error) {
      console.error('Error getting game stats:', error);
      return { totalGames: 0, averageScore: 0, highScore: 0, totalPlayTime: 0 };
    }
  }

  /**
   * Clear all stored data
   */
  clearStoredData() {
    try {
      this.csvData = [];
      this.sessionCounter = 0;
      
      // Clear from device-specific localStorage
      const storageKey = `csv_game_sessions_data_${this.deviceId}`;
      localStorage.removeItem(storageKey);
      
      console.log('All CSV game data cleared from memory and localStorage');
      console.log('Note: CSV file in public/ folder still exists - delete manually if needed');
      return true;
    } catch (error) {
      console.error('Error clearing CSV data:', error);
      return false;
    }
  }

  /**
   * Check if CSV database is available
   */
  isDatabaseAvailable() {
    return typeof saveStrings !== 'undefined';
  }
}

// Export the CSV database class
export { CSVDatabase };
