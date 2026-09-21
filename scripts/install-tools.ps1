# CyberLab — install core tools (run by setup-lab.ps1; expects admin)
$ErrorActionPreference = "Stop"

$wingetCandidates = @(
    (Get-Command winget -ErrorAction SilentlyContinue)?.Source,
    "$env:LOCALAPPDATA\Microsoft\WindowsApps\winget.exe"
)
$WINGET = $wingetCandidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $WINGET) { throw "winget.exe not found - update Windows Store 'App Installer' first." }
Write-Host "[i] winget: $WINGET"

$packages = @(
    @{ Id = "Oracle.VirtualBox";              Name = "VirtualBox 7.2" },
    @{ Id = "7zip.7zip";                      Name = "7-Zip" },
    @{ Id = "WiresharkFoundation.Wireshark";  Name = "Wireshark" },
    @{ Id = "PortSwigger.BurpSuite.Community"; Name = "Burp Suite Community" }
)

foreach ($p in $packages) {
    $installed = & $WINGET list --id $p.Id -e --accept-source-agreements |
                 Select-String -SimpleMatch $p.Id -Quiet
    if ($installed) {
        Write-Host "[=] $($p.Name): already installed - skipping"
        continue
    }
    Write-Host "[+] Installing $($p.Name)..."
    & $WINGET install --id $p.Id -e --silent `
        --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) { throw "FAILED to install $($p.Name) (exit $LASTEXITCODE)" }
    Write-Host "[ok] $($p.Name) installed"
}
Write-Host "INSTALL-STEP-COMPLETE"
