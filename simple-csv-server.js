// Simple CSV server - just appends to device-specific files, that's it!
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure device-specific CSV file exists with headers
function ensureCSVFile(deviceId) {
  const csvFilePath = path.join(process.cwd(), 'public', `game_sessions_${deviceId}.csv`);
  
  if (!fs.existsSync(csvFilePath)) {
    const headers = 'id,start_time,end_time,result,session_date,device_id\n';
    fs.writeFileSync(csvFilePath, headers);
    console.log('Created CSV file for device:', csvFilePath);
  } else {
    console.log('CSV file exists for device:', csvFilePath);
  }
  
  return csvFilePath;
}

// Single endpoint - just append a CSV row to device-specific file
app.post('/append-csv', (req, res) => {
  try {
    const { id, start_time, end_time, result, session_date, device_id } = req.body;
    
    if (!device_id) {
      return res.status(400).json({ error: 'Device ID is required' });
    }
    
    // Ensure the device-specific CSV file exists
    const csvFilePath = ensureCSVFile(device_id);
    
    // Create CSV row with device ID
    const csvRow = `${id},${start_time},${end_time},${result},${session_date},${device_id}\n`;
    
    // Append to device-specific file
    fs.appendFileSync(csvFilePath, csvRow);
    
    console.log(`Appended to CSV for device ${device_id}:`, { id, result });
    res.json({ success: true, file: path.basename(csvFilePath) });
  } catch (error) {
    console.error('Error appending to CSV:', error);
    res.status(500).json({ error: 'Failed to append to CSV' });
  }
});

// Health check
app.get('/health', (req, res) => {
  const publicDir = path.join(process.cwd(), 'public');
  const csvFiles = fs.readdirSync(publicDir).filter(file => file.startsWith('game_sessions_') && file.endsWith('.csv'));
  
  res.json({ 
    status: 'ok', 
    csvFiles: csvFiles,
    publicDir: publicDir
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple CSV Server running on http://localhost:${PORT}`);
  console.log(`CSV files will be created in: ${path.join(process.cwd(), 'public')}`);
  console.log(`Format: game_sessions_[DEVICE_ID].csv`);
});
