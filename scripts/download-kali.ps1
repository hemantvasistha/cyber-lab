# CyberLab — download Kali 2026.2 VirtualBox image (resumable + hash-verified)
$ErrorActionPreference = "Stop"

$Url      = "https://cdimage.kali.org/kali-2026.2/kali-linux-2026.2-virtualbox-amd64.7z"
$OutDir   = "D:\CyberLab\downloads"
$OutFile  = Join-Path $OutDir "kali-linux-2026.2-virtualbox-amd64.7z"
$Expected = "41ed7ec51cdd3a5ca663ec09492261ba81acb26625fdda85ce7acb16909f3cee"
$ExpectedBytes = 3922416160
$Curl     = "$env:SystemRoot\System32\curl.exe"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

if (Test-Path $OutFile) {
    $cur = (Get-Item $OutFile).Length
    Write-Host ("[i] partial found: {0:N0} bytes - resuming" -f $cur)
}

$attempt = 0
while ($true) {
    $attempt++
    & $Curl -L -C - --retry 3 --retry-delay 3 -sS -o $OutFile $Url
    if ($LASTEXITCODE -eq 0) { break }
    if ($attempt -ge 5) { throw "download failed after $attempt attempts (exit $LASTEXITCODE)" }
    Write-Host "[!] attempt $attempt failed - retrying in 10s..."
    Start-Sleep -Seconds 10
}

$size = (Get-Item $OutFile).Length
if ($size -ne $ExpectedBytes) { throw "size mismatch: got $size, expected $ExpectedBytes" }
Write-Host "[ok] size verified: $size bytes"

Write-Host "[i] verifying SHA256 (takes a minute for 3.9 GB)..."
$hash = (Get-FileHash -Algorithm SHA256 -Path $OutFile).Hash.ToLower()
if ($hash -ne $Expected) {
    Remove-Item $OutFile -Force
    throw "SHA256 MISMATCH - file deleted for safety. Re-run this script."
}
Write-Host "[ok] SHA256 verified: $hash"
Write-Host "DOWNLOAD-STEP-COMPLETE"
