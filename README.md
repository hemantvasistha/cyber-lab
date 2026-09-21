# 🛡️ CyberLab Academy

**A gated, level-based cybersecurity academy with a built-in terminal trainer —
beginner to professional — running entirely inside one repo.**
Built and used daily by a B.Tech first-semester student as a public proof of work.

![level](https://img.shields.io/badge/levels-5_gated-58a6ff)
![terminal](https://img.shields.io/badge/terminal_trainer-25%2B_commands-3fb950)
![tools](https://img.shields.io/badge/tools_documented-12-d29922)
![ethics](https://img.shields.io/badge/targets-lab--only-f85149)

## 🌐 Live site
Once GitHub Pages is enabled (Settings → Pages → `main` / root):
**https://hemantvasistha.github.io/cyber-lab/**

## What's inside
| Section | What you get |
|---|---|
| **Dashboard** | Hero, about, live architecture diagram, per-level progress + XP |
| **Academy** | 5 gated levels × 18 modules — lessons, knowledge checks, 80% exams |
| **Terminal** | Two-way command panel: simulated Kali with a virtual filesystem, guided missions, XP |
| **Tools** | 12 lab tools: purpose, unlock level, copy-ready commands |
| **Glossary** | 30 searchable terms — no jargon left unexplained |

## The 5 levels (strict gating)
```
L1 Initiate    → basics, ethics, lab architecture, terminal foundations
L2 Operator    → permissions, text processing, networking, FIRST REAL VM TASKS
L3 Explorer    → web security, vulnerability analysis, cracking, CTF craft
L4 Adversary   → exploitation, privesc, Python tooling, blue-team logs
L5 Professional→ methodology, reports, certifications, capstone
```
A level unlocks **only** after every module of the previous level is complete
**and** its exam is passed (≥ 80%). Progress saves in your browser (localStorage).

## The real lab behind the site
The site teaches; the machine hacks. `scripts/` builds a genuine Kali Linux VM
on this PC (VirtualBox, D: drive, snapshot-protected, SHA256-verified image):
```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup-lab.ps1
```

## Repo layout
```
index.html          the academy (single-page app)
assets/             style.css · app.js (course+gating) · terminal.js (simulator)
docs/               PRD · supabase live-sync guide
notes/              cheatsheet · roadmap · local-lab guide · journal
scripts/            setup-lab.ps1 + download/verify/create-vm + launcher
tools/              curated tool reference collection
```

## ⚖️ Ethics
Every technique here is taught and practiced **only against machines the owner
controls** — the browser simulator and the local VM. The gating itself is a
pedagogical statement: skills before access, ethics before skills.

## 📜 License
MIT — see [LICENSE](LICENSE).
