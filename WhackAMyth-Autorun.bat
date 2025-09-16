@echo off
REM Change this to your project directory path
cd /d C:\Users\Admin\Documents\GitHub\whack-a-myth

REM Run npm dev command
echo Starting Web Server...
start /b npm run preview:csv

REM Wait for 10 seconds
echo Waiting...
timeout /t 2 /nobreak

REM Open another batch file - replace with the actual path
echo Opening second batch file...
start "" ".\EdgeKioskLauncher.bat"

REM Wait a bit and click the device connect button
echo Clicking device connect button...
timeout /t 3 /nobreak
powershell -ExecutionPolicy Bypass -File "ClickDeviceConnect.ps1"

REM Close this batch file
echo Closing this batch file...
exit