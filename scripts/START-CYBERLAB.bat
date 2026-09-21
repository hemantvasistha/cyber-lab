@echo off
REM ============================================
REM  CyberLab launcher - double-click friendly
REM ============================================
if exist "C:\Program Files\Oracle\VirtualBox\VirtualBox.exe" (
    start "" "C:\Program Files\Oracle\VirtualBox\VirtualBox.exe"
) else (
    echo [!] VirtualBox not installed yet.
    echo     Run: powershell -ExecutionPolicy Bypass -File D:\CyberLab\scripts\setup-lab.ps1
    pause
)
start "" "D:\CyberLab\index.html"
exit
