# 🛡️ Hemant's Cyber Lab

A beginner-built, fully local cybersecurity lab — Kali Linux VM on Windows,
GUI-first, one-command rebuild, documented in public. **This repo IS the lab's
brain**: dashboard, notes, and every automation script that built it.

![status](https://img.shields.io/badge/build-B.Tech%20Sem%201-4da3ff)
![platform](https://img.shields.io/badge/platform-Windows%2011%20%2B%20VirtualBox-2ea86b)
![ethics](https://img.shields.io/badge/use-lab--internal%20only-d99a2b)

## 🚀 Live dashboard
After enabling GitHub Pages, this lab's control center is viewable at:
`https://hemantvasistha.github.io/cyber-lab/`

## 🗂️ What's in here
| Path | Purpose |
|------|---------|
| `index.html` | The dashboard — lab progress, notes index, golden rules |
| `docs/PRD.md` | Product requirements: goals, acceptance criteria, constraints |
| `docs/supabase.md` | Optional live-progress sync setup |
| `notes/` | Roadmap, cheat sheet, lab guide, journal |
| `scripts/` | Everything that builds the lab automatically (see below) |
| `tools/cyberguideme-Tools/` | Curated security-tool reference collection |

## ⚙️ One-command rebuild (on a fresh Windows PC)
```powershell
# from repo root — one UAC prompt, then walk away
powershell -ExecutionPolicy Bypass -File scripts\setup-lab.ps1
```
1. `install-tools.ps1` → VirtualBox + 7-Zip + Wireshark + Burp Community
2. `download-kali.ps1` → official Kali 2026.2 image, resumable, **SHA256-verified**
3. `create-vm.ps1` → extract → register VM (4 GB / 4 vCPU) → snapshot `fresh-install`

## ⚖️ Ethics
Every tool here stays inside the lab's own VMs. Golden rules are baked into the
dashboard. Nothing in this repo is intended for use against systems the owner
doesn't own or have explicit written permission to test.

## 📜 License
MIT — see [LICENSE](LICENSE).
