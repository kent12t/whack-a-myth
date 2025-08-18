@echo off
REM Change this to your project directory path
cd /d C:\Users\Admin\Documents\GitHub\whack-a-myth

REM Run npm dev command
echo Starting Web Server...
start /b npm run preview:csv

REM Wait for 10 seconds
echo Waiting...
timeout /t 3 /nobreak

REM Open another batch file - replace with the actual path
echo Opening second batch file...
start "" "C:\Users\Kent\Desktop\Onedrive\OneDrive - OFF THE BEATEN TRACK PTE. LTD\Documents\Github\whack-a-myth\EdgeKioskLauncher.bat"

REM Close this batch file
echo Closing this batch file...
exit