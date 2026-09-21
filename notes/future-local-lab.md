# ☁️ Future & Advanced Options (later semesters)

The local Kali VM on D: is the lab. Everything here is **optional** — revisit
when the fundamentals are solid (sem 3–4).

## 1. Add a target VM (your legal "victim")
- Download **Metasploitable2** or a VulnHub image (they exist to be attacked).
- In VirtualBox: create a **Host-only network**; attach the target VM and Kali to it.
- Now Kali and the target talk to each other but the target has no internet —
  the safest possible practice setup.
- Snapshot the target immediately: `pristine` — you'll restore it after every session.

## 2. Cloud lab alternatives (no local disk used)
- **GitHub Codespaces** — free tier, browser VS Code: good for Python security
  tooling development (not for running VMs).
- **Google Cloud free tier** — small Linux instance for network experiments.
- Paid platforms (HackTheBox etc.) belong to sem 3+ per the roadmap.

## 3. Supabase live-sync (this repo is already wired for it)
When this lab is on GitHub Pages, follow `docs/supabase.md` to add:
- dashboard progress that updates from anywhere (phone included)
- a lab journal you can write from the VM browser
Config template: `config/supabase.json.example`. Static fallback stays active
until you add the config — nothing breaks without it.

## 4. Hardware-level extras (much later)
- USB Wi-Fi adapter with monitor mode (Alfa) → wireless labs
- GPU passthrough → hashcat experiments
- Second monitor → VM fullscreen while taking notes on the host
