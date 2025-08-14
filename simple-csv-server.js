// Simple CSV server - just appends to a file, that's it!
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3001;
const CSV_FILE_PATH = path.join(process.cwd(), 'public', 'game_sessions.csv');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure CSV file exists with headers
function ensureCSVFile() {
  if (!fs.existsSync(CSV_FILE_PATH)) {
    const headers = 'id,start_time,end_time,result,session_date\n';
    fs.writeFileSync(CSV_FILE_PATH, headers);
    console.log('Created CSV file:', CSV_FILE_PATH);
  } else {
    console.log('CSV file exists:', CSV_FILE_PATH);
  }
}

// Single endpoint - just append a CSV row
app.post('/append-csv', (req, res) => {
  try {
    const { id, start_time, end_time, result, session_date } = req.body;
    
    // Create CSV row
    const csvRow = `${id},${start_time},${end_time},${result},${session_date}\n`;
    
    // Append to file
    fs.appendFileSync(CSV_FILE_PATH, csvRow);
    
    console.log('Appended to CSV:', { id, result });
    res.json({ success: true });
  } catch (error) {
    console.error('Error appending to CSV:', error);
    res.status(500).json({ error: 'Failed to append to CSV' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    csvFile: CSV_FILE_PATH,
    fileExists: fs.existsSync(CSV_FILE_PATH)
  });
});

// Start server
ensureCSVFile();
app.listen(PORT, () => {
  console.log(`Simple CSV Server running on http://localhost:${PORT}`);
  console.log(`CSV file: ${CSV_FILE_PATH}`);
});
