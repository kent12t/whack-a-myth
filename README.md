# Whack-a-Myth

A fact-or-myth arcade game about ageing, played on two physical buttons. Statements about ageing rise on balloons, and the player presses one button for fact and the other for myth before the balloon escapes. It is multilingual (English, Chinese, Malay, Tamil) and logs each session for the organisers.

Whack-a-Myth was one of the games at the **Life Unstoppable Roadshow** for the Agency for Integrated Care, which ran in four Singapore venues in 2025 and 2026. The roadshow team reported 4,000+ interactions across this game and Ideal Pursuit.

Case study: [kentlimanza.co/work/aic-life-unstoppable-2025](https://kentlimanza.co/work/aic-life-unstoppable-2025)

## How it plays

- Six shuffled statements per round. A correct answer scores +20, a wrong button −10, and a balloon that escapes −5.
- The result screen gives a star rating and lists the statements the player missed.
- Languages can be switched in the game. Set `enableLanguageSelection: false` in `constants.js` for English only.

## Hardware

Two arcade buttons are wired to an Arduino (`WhackAMyth/WhackAMyth.ino`). Each press sends a newline-terminated `0` or `1` over serial at 9,600 baud, with an LED flash and a 400 ms debounce delay. The browser reads them through the Web Serial API (`p5.webserial.js`), asks for the port once, and tries to reopen it automatically if the connection drops. The same buttons start and restart the game and change language.

Without the hardware, the keyboard works: Space and Enter are the two answer buttons, and `C` opens the serial connection.

## Running it

```bash
npm install
npm run dev:csv   # game on http://localhost:3000, CSV logging server on :3001
```

Use Chrome or Edge for Web Serial. For a booth, build and preview with `npm run build` then `npm run preview:csv`. `EdgeKioskLauncher.bat`, `WhackAMyth-Autorun.bat`, and `ClickDeviceConnect.ps1` start it unattended on Windows (they open the browser in kiosk mode, then `ClickDeviceConnect.ps1` clicks the page and picks the Arduino in the browser's serial-port chooser); edit the paths inside them first.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite only. Use with `databaseMode: 'supabase'`, or with CSV logging switched off |
| `npm run dev:csv` | Vite plus the CSV server |
| `npm run csv-server` | CSV server only (port 3001) |
| `npm run build` | Production build |
| `npm run preview` / `npm run preview:csv` | Preview the build, without or with the CSV server |

## Logging

Set `databaseMode` in `constants.js`:

- **`'csv'`** (the value in the repo). Sessions are posted to `simple-csv-server.js`, an Express server that appends to `public/game_sessions_<DEVICE_ID>_<session date>.csv`. Columns: `id, start_time, end_time, result, session_date, device_id, question_results`, where `question_results` lists each statement's outcome in order (correct, wrong, or skipped). Each browser also keeps a copy in localStorage.
- **`'supabase'`**. Session start, end, and score go to a Supabase table named `data`, with a localStorage fallback. Copy your project's URL and anon key into `VITE_PUBLIC_SUPABASE_URL` and `VITE_PUBLIC_SUPABASE_ANON_KEY`. Per-question outcomes are not recorded in this mode.

`deviceId.js` makes an 8-character ID from browser and system characteristics and keeps it in localStorage, so each booth computer writes its own file and results from several machines can be collected without clashes. It is a device ID, not a person ID, and no names or other personal details are collected.

## Stack

JavaScript, p5.js and p5.sound, Vite, Arduino, Web Serial, Express, Supabase.

## Credits

A team-built roadshow. Clarita made the graphics and the UI of the game. Teammates handled the soldering, enclosures, and physical connections, `elnathanhung` contributed an audio update, and Raja and Isaac handled client servicing and the event.

I (Kent, [@kent12t](https://github.com/kent12t)) pitched an early version of the game, built it, rendered the background and balloons, wrote the Arduino firmware and browser serial integration, tuned the scoring, and added the language switcher and logging.
