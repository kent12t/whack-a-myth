# automate.ps1
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Wait for Edge to fully load
Start-Sleep -Seconds 3

# Get screen dimensions
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$centerX = $screen.Width / 2
$centerY = $screen.Height / 2

# Click center of screen
[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($centerX, $centerY)
[System.Windows.Forms.Application]::DoEvents()

# Simulate left mouse click
Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;
[W.U32]::mouse_event(2, 0, 0, 0, 0); # Mouse down
[W.U32]::mouse_event(4, 0, 0, 0, 0); # Mouse up

Start-Sleep -Milliseconds 500

# Send Tab key
[System.Windows.Forms.SendKeys]::SendWait("{TAB}")

Start-Sleep -Milliseconds 200

# Send Down arrow key
[System.Windows.Forms.SendKeys]::SendWait("{DOWN}")

Start-Sleep -Milliseconds 200

# Send Enter key
[System.Windows.Forms.SendKeys]::SendWait("{ENTER}")