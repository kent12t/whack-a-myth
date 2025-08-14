# Simple CSV Database for Whack-a-Myth

## Quick Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set CSV mode** in `constants.js`:
   ```javascript
   const DEPLOYMENT_CONFIG = {
     databaseMode: 'csv'  // Change from 'supabase' to 'csv'
   };
   ```

3. **Run with CSV server**:
   ```bash
   npm run dev:csv
   # or
   npm run preview:csv
   ```

4. **CSV file appears in `public/game_sessions.csv`** - directly in your project folder!

## How It Works

- **Simple Express server** appends to CSV file in your project directory
- **Real file appending** - no downloads, no multiple files
- **CSV file location**: `public/game_sessions.csv`
- **Data persists** in localStorage for backup

## File Format
```csv
id,start_time,end_time,result,session_date
1,2024-01-15T10:30:00.000Z,2024-01-15T10:32:30.000Z,45,1/15/2024
```

## Testing
1. Run `npm run dev:csv`
2. Open `http://localhost:3000/test-csv.html`
3. Click "Start Game Session" → "End Game Session"  
4. Check `public/game_sessions.csv` in your project folder!

## Toggle Back to Supabase
```javascript
const DEPLOYMENT_CONFIG = {
  databaseMode: 'supabase'  // Back to original behavior
};
```

**That's it!** Simple, clean, no complexity. 🎯
