# CyberLab — extract Kali image, register VM, tune, snapshot
$ErrorActionPreference = "Stop"

$LabRoot  = "D:\CyberLab"
$ArchDir  = Join-Path $LabRoot "downloads"
$VmDir    = Join-Path $LabRoot "vm\kali"
$SevenZip = "C:\Program Files\7-Zip\7z.exe"
$VBox     = "C:\Program Files\Oracle\VirtualBox\VBoxManage.exe"

foreach ($tool in @($SevenZip, $VBox)) {
    if (-not (Test-Path $tool)) { throw "required tool missing: $tool (run install step first)" }
}

# --- extract (idempotent) ---
if (-not (Test-Path $VmDir)) {
    $archive = Get-ChildItem $ArchDir -Filter "kali-linux-*-virtualbox-amd64.7z" |
               Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $archive) { throw "no Kali .7z archive found in $ArchDir" }
    Write-Host "[i] extracting $($archive.Name) -> $VmDir (this takes several minutes)..."
    New-Item -ItemType Directory -Force -Path $VmDir | Out-Null
    & $SevenZip x "`"$($archive.FullName)`"" -o"`"$VmDir`"" -y
    if ($LASTEXITCODE -ne 0) { throw "7-Zip extraction failed (exit $LASTEXITCODE)" }
    Write-Host "[ok] extracted"
} else { Write-Host "[=] $VmDir exists - skipping extraction" }

# --- find the .vbox and get the VM's real name from it ---
$vboxFile = Get-ChildItem $VmDir -Recurse -Filter *.vbox | Select-Object -First 1
if (-not $vboxFile) { throw "no .vbox file found after extraction" }
$vboxPath = $vboxFile.FullName
[xml]$xml = Get-Content $vboxPath
$vmName = $xml.VirtualBox.Machine.name
Write-Host "[i] VM name: $vmName"

# --- register (idempotent) ---
$registered = ((& $VBox list vms) -match [regex]::Escape("`"$vmName`"")).Count -gt 0
if ($registered) {
    Write-Host "[=] already registered"
} else {
    & $VBox registervm $vboxPath
    if ($LASTEXITCODE -ne 0) { throw "registervm failed (exit $LASTEXITCODE)" }
    Write-Host "[ok] registered"
}

# --- tune for this host (8 threads / beginner-safe defaults) ---
& $VBox modifyvm $vmName --memory 4096 --cpus 4 --vram 32 --usb-xhci on
Write-Host "[ok] tuned: 4096 MB RAM, 4 vCPU (NAT is the image default = safe internet)"

# --- snapshot: the undo button ---
$snapshots = & $VBox snapshot $vmName list
if (($snapshots | Out-String) -notmatch "fresh-install") {
    & $VBox snapshot $vmName take "fresh-install" --description "pristine state after first setup"
    if ($LASTEXITCODE -ne 0) { throw "snapshot failed (exit $LASTEXITCODE)" }
    Write-Host "[ok] snapshot 'fresh-install' taken"
} else { Write-Host "[=] snapshot 'fresh-install' already exists" }

Write-Host "VM-STEP-COMPLETE - start it from VirtualBox Manager (or the desktop launcher)"
