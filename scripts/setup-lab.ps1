# CyberLab — one-command orchestrator (double-click friendly)
# Usage: powershell -ExecutionPolicy Bypass -File scripts\setup-lab.ps1
$ErrorActionPreference = "Stop"
$LabRoot = "D:\CyberLab"
$LogDir  = Join-Path $LabRoot "logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
Start-Transcript -Path (Join-Path $LogDir "setup.log") -Append | Out-Null

# --- self-elevate (one UAC prompt for the whole run) ---
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
           ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[i] requesting admin rights (one popup - click Yes)..."
    Start-Process powershell -Verb RunAs -Wait -ArgumentList `
        "-ExecutionPolicy Bypass -NoProfile -File `"$PSCommandPath`""
    exit
}

function Step($name, $scriptPath) {
    Write-Host "`n========== $name ==========" -ForegroundColor Cyan
    & powershell -ExecutionPolicy Bypass -NoProfile -File $scriptPath
    if ($LASTEXITCODE -ne 0) { throw "$name FAILED (exit $LASTEXITCODE) - see $LogDir\setup.log" }
}

# --- state-aware: each step skips itself if already done ---
Step "1/3 tools (VirtualBox, 7-Zip, Wireshark, Burp)" (Join-Path $LabRoot "scripts\install-tools.ps1")
Step "2/3 Kali image (download + verify)"             (Join-Path $LabRoot "scripts\download-kali.ps1")
Step "3/3 VM (extract, register, snapshot)"           (Join-Path $LabRoot "scripts\create-vm.ps1")

Stop-Transcript | Out-Null
Write-Host "`nSETUP-COMPLETE - opening your dashboard..."
Start-Process "D:\CyberLab\index.html"
