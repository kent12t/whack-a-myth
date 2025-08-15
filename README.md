# Whack-a-Myth Game

A multilingual myth-busting arcade game with device-specific CSV data logging.

## 🎮 Game Overview

An interactive game where players hammer balloons containing myths or truths about aging. Supports multiple languages (English, Bahasa Melayu, Chinese, Tamil) and features comprehensive data logging for analytics.

## 🗄️ Database Modes

The game supports two database modes that can be toggled in `constants.js`:

### Supabase Mode (Default)
```javascript
const DEPLOYMENT_CONFIG = {
  databaseMode: 'supabase'  // Uses Supabase + localStorage fallback
};
```

### CSV Mode (Offline Local Files)
```javascript
const DEPLOYMENT_CONFIG = {
  databaseMode: 'csv'  // Creates device-specific CSV files
};
```

---

## 📊 CSV Database System

### Quick Setup

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

4. **Device-specific CSV files appear in `public/`** - each device gets its own file!

### How It Works

- **Device-specific CSV files** - each device gets its own unique file
- **Hardware fingerprinting** - creates unique device ID based on browser/system characteristics
- **Simple Express server** appends to device-specific CSV files
- **Real file appending** - no downloads, no conflicts between devices
- **CSV file location**: `public/game_sessions_[DEVICE_ID].csv`
- **Data persists** in localStorage for backup

### Device ID Generation

The system automatically generates unique device IDs using browser fingerprinting based on:
- User agent, language, platform
- Hardware concurrency, screen dimensions  
- Canvas fingerprint, timezone offset
- Cookie/Worker support, Do Not Track setting
- And more...

Results in unique 8-character hex ID like: `A1B2C3D4`

This ID is:
- **Persistent** - same device always gets same ID (stored in localStorage)
- **Unique** - virtually impossible for two devices to get same ID
- **Anonymous** - no personal information collected

### CSV File Format
```csv
id,start_time,end_time,result,session_date,device_id
1,2024-01-15T10:30:00.000Z,2024-01-15T10:32:30.000Z,45,1/15/2024,A1B2C3D4
2,2024-01-15T10:35:00.000Z,2024-01-15T10:37:15.000Z,60,1/15/2024,A1B2C3D4
```

### Express Server API

The CSV system uses a minimal Express server with two endpoints:

#### **POST /append-csv**
Appends a new game session to device-specific CSV file.

**Request Body:**
```json
{
  "id": "1",
  "start_time": "2024-01-15T10:30:00.000Z",
  "end_time": "2024-01-15T10:32:30.000Z", 
  "result": "45",
  "session_date": "1/15/2024",
  "device_id": "A1B2C3D4"
}
```

**Response:**
```json
{
  "success": true,
  "file": "game_sessions_A1B2C3D4.csv"
}
```

#### **GET /health**
Returns server status and available CSV files.

**Response:**
```json
{
  "status": "ok",
  "csvFiles": ["game_sessions_A1B2C3D4.csv", "game_sessions_B5F6E7D8.csv"],
  "publicDir": "/path/to/project/public"
}
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Standard Vite development (Supabase mode) |
| `npm run dev:csv` | Development with CSV server + Vite |
| `npm run preview:csv` | Preview mode with CSV server + Vite |
| `npm run csv-server` | Run only the CSV server (port 3001) |
| `npm run build` | Build for production |
| `npm run preview` | Preview built version (Supabase mode) |

### Multi-Device Benefits

- ✅ **Each PC gets unique file** - no data mixing
- ✅ **Easy to identify** which device generated which data  
- ✅ **No file conflicts** when copying between PCs
- ✅ **Perfect for multi-PC arcade setups**
- ✅ **Automatic device detection** - no manual configuration needed

### File Structure

After running CSV mode, your project will contain:
```
public/
├── game_sessions_A1B2C3D4.csv  ← Device 1 data
├── game_sessions_B5F6E7D8.csv  ← Device 2 data
└── assets/                     ← Game assets
```

### Server Architecture

- **Frontend**: Game runs on `localhost:3000` (Vite)
- **Backend**: CSV API server runs on `localhost:3001` (Express)  
- **Data Storage**: Local CSV files in `public/` directory
- **Proxy**: Vite proxies `/append-csv` and `/health` to Express server

---

## 🚀 Development

### Regular Development (Supabase)
```bash
npm run dev
```

### CSV Development  
```bash
npm run dev:csv
```

### Production Build
```bash
npm run build
npm run preview
```

### CSV Production
```bash
npm run build  
npm run preview:csv
```

---

## 🔧 Configuration

### Language Selection
Enable/disable language selection in `constants.js`:
```javascript
const DEPLOYMENT_CONFIG = {
  enableLanguageSelection: true,  // false for English-only
  databaseMode: 'csv'            // 'supabase' or 'csv'
};
```

### Database Toggle
Switch between database modes anytime by changing `databaseMode`:
- `'supabase'` - Original Supabase + localStorage behavior
- `'csv'` - Device-specific CSV files in project directory

---

## 🎯 Perfect for Arcade Setups

The CSV system is ideal for:
- **Offline arcade machines** - no internet required
- **Multi-PC setups** - each PC gets unique data files
- **Data analysis** - easy to open CSV files in Excel/Google Sheets
- **Local control** - all data stays in your project directory
- **No conflicts** - device fingerprinting prevents data mixing

No complex setup required - just set `databaseMode: 'csv'` and run `npm run dev:csv`!