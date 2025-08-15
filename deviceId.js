// Device ID generation for unique CSV files per device
// Creates a unique identifier based on browser/system characteristics

/**
 * Generate a unique device ID based on browser and system characteristics
 * @returns {string} Unique device identifier (8 characters)
 */
function generateDeviceId() {
  try {
    // Collect various browser/system characteristics
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const characteristics = [
      navigator.userAgent,
      navigator.language,
      navigator.platform,
      navigator.hardwareConcurrency || 0,
      navigator.maxTouchPoints || 0,
      screen.width,
      screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
      navigator.cookieEnabled ? 1 : 0,
      typeof(Worker) !== 'undefined' ? 1 : 0,
      navigator.doNotTrack || 'unknown'
    ].join('|');
    
    // Create hash of characteristics
    let hash = 0;
    for (let i = 0; i < characteristics.length; i++) {
      const char = characteristics.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to positive hex string (8 characters)
    const deviceId = Math.abs(hash).toString(16).substring(0, 8).toUpperCase().padStart(8, '0');
    
    console.log('Generated device ID:', deviceId);
    return deviceId;
  } catch (error) {
    console.error('Error generating device ID:', error);
    // Fallback to random ID if fingerprinting fails
    return Math.random().toString(16).substring(2, 10).toUpperCase();
  }
}

/**
 * Get or create persistent device ID (stored in localStorage)
 * @returns {string} Device ID
 */
function getDeviceId() {
  let deviceId = localStorage.getItem('device_id');
  
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem('device_id', deviceId);
    console.log('Created new device ID:', deviceId);
  } else {
    console.log('Using existing device ID:', deviceId);
  }
  
  return deviceId;
}

/**
 * Get device-specific CSV filename
 * @returns {string} CSV filename with device ID
 */
function getDeviceCSVFilename() {
  const deviceId = getDeviceId();
  return `game_sessions_${deviceId}.csv`;
}

// Make functions globally available
window.getDeviceId = getDeviceId;
window.getDeviceCSVFilename = getDeviceCSVFilename;

// Export for module usage
export { getDeviceId, getDeviceCSVFilename };
