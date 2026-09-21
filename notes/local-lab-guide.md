# 💻 Local Lab Guide — how this lab works

## The 60-second tour
- **Windows = host. Kali Linux = guest VM** — a full computer inside your computer.
- VirtualBox runs the VM. All VM files live on `D:\CyberLab\vm` (never on C:).
- The dashboard (`index.html`) tracks progress. `scripts/` can rebuild everything.

## Daily use
1. Double-click the desktop launcher (or `scripts\START-CYBERLAB.bat`)
2. VirtualBox Manager opens → select **Kali** → **Start**
3. Log in: `kali` / `kali` — **change it on first login**: `passwd`
4. Work inside the VM; save notes to `~/CyberLab` (mirrors the repo folders)

## Snapshots — your undo button
- A `fresh-install` snapshot is taken right after the VM is created.
- Before any risky experiment: **Machine → Take Snapshot** → name it what you're about to try.
- Broke something? **Machine → Snapshots → restore.** 10 seconds, zero damage.

## Rebuilding from zero (new PC or after disaster)
1. Install git, clone this repo to `D:\CyberLab`
2. `powershell -ExecutionPolicy Bypass -File scripts\setup-lab.ps1`
3. Done — the script installs tools, downloads + verifies Kali, creates the VM.

## Manual fallback (if scripts ever fail)
- VirtualBox: virtualbox.org · 7-Zip: 7-zip.org
- Kali image: kali.org/get-kali → Virtual Machines → VirtualBox `.7z`
- Extract with 7-Zip → double-click the `.vbox` → VM → Snapshot → `fresh-install`

## What's inside Kali (preinstalled)
nmap · wireshark · gobuster · sqlmap · john · hydra · metasploit · firefox.
Add the big wordlist collection: `sudo apt install wordlists` → `/usr/share/wordlists`.

## Legal box (read once, remember forever)
The VM can reach the internet (NAT), but every practice target must be a machine
YOU own: your own VMs, VulnHub images, CTF lab networks. Nothing else. Ever.
