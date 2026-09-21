# PRD — Hemant's Cyber Lab

**Owner:** Hemant Vashisht (`hemantvasistha`) · **Date:** 2026-09-21 · **Status:** v1.0 active

## 1. Problem
A 1st-semester B.Tech student needs a professional cybersecurity lab to build a
career portfolio, but: is a complete beginner (GUI-first, minimal manual steps),
has limited C: space (D: has 134 GB free), and wants the lab publicly visible on
GitHub as a portfolio piece.

## 2. Goals
| # | Goal | Metric |
|---|------|--------|
| G1 | Fully local Kali Linux lab on D: | VM boots, snapshot taken |
| G2 | One-command setup & rebuild | `setup-lab.ps1` runs end-to-end unattended |
| G3 | GUI-first for a beginner | Every task reachable by double-click; dashboard is the front door |
| G4 | Public portfolio on GitHub | Repo `hemantvasistha/cyber-lab` + live dashboard via Pages |
| G5 | Ethics enforced by design | Golden rules in UI; heavy binaries kept out of git; nothing leaves the VM network |

## 3. Non-goals
- No cloud lab dependencies (TryHackMe/AttackBox excluded by owner decision).
- No paid tooling; no VM images or GB-scale binaries in git.
- No Metasploit/malware tooling in v1 — added in later semesters per roadmap.

## 4. Components & acceptance criteria
| Component | File(s) | Acceptance |
|---|---|---|
| Dashboard UI | `index.html` | Renders offline via double-click AND via Pages; phase statuses visible |
| Repo hygiene | `.gitignore`, `LICENSE`, `README.md` | 4 GB binaries excluded; MIT license; repo front page explains the lab |
| Setup automation | `scripts/install-tools.ps1` | Installs VirtualBox 7.2.18 + 7-Zip 26.03 + Wireshark + Burp Community with one UAC prompt |
| Kali acquisition | `scripts/download-kali.ps1` | Resumable download; aborts if SHA256 ≠ `41ed7ec51cdd3a5ca663ec09492261ba81acb26625fdda85ce7acb16909f3cee` |
| VM creation | `scripts/create-vm.ps1` | Extracts image → registers VM → 4096 MB RAM / 4 vCPU → NAT → takes snapshot `fresh-install` |
| Orchestration | `scripts/setup-lab.ps1` | State-aware: skips completed steps; exits with clear message on any failure |
| Launcher | `scripts/START-CYBERLAB.bat` | Desktop double-click → opens dashboard + VM Manager |
| Notes | `notes/*.md` | Local-lab-first; golden rules; roadmap sem1→job |
| Optional live sync | `docs/supabase.md`, `config/supabase.json.example` | Dashboard hydrates statuses when config present; static otherwise |

## 5. Constraints
- Host: Windows 11, 8 threads, ~34 GB free on C:, 134 GB on D:. VM + downloads live ONLY on D:.
- Elevated installs: single batched UAC prompt. All commands pre-verified before execution (owner requirement).
- Git identity: `hemant vasist <getosaneditz@gmail.com>`; branch `main`; no push without owner's GitHub click.
- Kali 2026.2 VirtualBox image (3,922,416,160 bytes) from official `cdimage.kali.org`.

## 6. Risks
- Download interruption → mitigated by resumable script + hash verification.
- Windows PowerShell execution policy → `setup-lab.ps1` self-elevates with `-ExecutionPolicy Bypass`.
- Nested `.git` breaking push → removed; tools repo committed as plain files.

## 7. Future phases (documented, not built)
Sem 3–4: VulnHub/Metasploitable2 target VM (host-only network) · GPU hashcat ·
security tooling in Python · Supabase-backed live journal from the VM browser.
