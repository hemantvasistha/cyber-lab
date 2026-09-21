/* ============================================================
   CyberLab Academy — course data, gating engine, tabs
   ============================================================ */
"use strict";

/* ---------- persistence ---------- */
const PKEY = "cyberlab-academy-v1";
const prog = JSON.parse(localStorage.getItem(PKEY) || "{}");
function saveProg() { localStorage.setItem(PKEY, JSON.stringify(prog)); }

/* ---------- course data: 5 gated levels ---------- */
const COURSE = [
{
  id: "L1", name: "Initiate", tag: "Beginner", icon: "🌱",
  blurb: "Zero knowledge to confident first steps.",
  requires: null,
  modules: [
    { id: "L1M1", title: "What Cybersecurity Actually Is", lessons: [
        ["The three jobs of security", "Security does three things: <b>protect</b> data (confidentiality), keep systems <b>working</b> (availability), and keep data <b>truthful</b> (integrity). Every tool you'll ever use maps to one of these."],
        ["Who the good and bad actors are", "<b>White hats</b> are paid to break systems legally. <b>Black hats</b> are criminals. <b>Grey hats</b> break rules without malice — and often end up in jail. Your career starts by picking a side and staying there."],
        ["Why attackers win", "Humans are the weakest link: reused passwords, missed updates, phishing. Technology helps, but habits decide breaches — yours and your future employer's."],
        ["Ethics & the law", "Everything in this lab is legal because it only touches machines you own. The moment a tool points at someone else's system without permission, it becomes a crime (IT Act / CFAA). Golden rule forever: <b>scan only what you own.</b>"]
      ], quiz: [
        { q: "Keeping data truthful is called…", a: ["Confidentiality", "Integrity", "Availability", "Anonymity"], c: 1,
          why: "Integrity = data isn't tampered. Confidentiality = secrecy. Availability = up & running." },
        { q: "You find a flaw in a company's website. First legal step?", a: ["Post it online", "Sell it", "Report via their security/responsible disclosure contact", "Test it deeper"], c: 2,
          why: "Responsible disclosure is the legal path. Testing further without permission is already a crime." }
      ] },
    { id: "L1M2", title: "Your Lab Explained", lessons: [
        ["Host vs Guest", "Windows is the <b>host</b>. Kali Linux runs inside VirtualBox as a <b>guest VM</b> — a complete separate computer that exists as files on D:\\CyberLab\\vm."],
        ["Why a VM and not your PC", "Hackers break things. On your real PC, that's catastrophic; in a VM it's Tuesday. Snapshots make every experiment reversible."],
        ["Snapshots = time travel", "A snapshot freezes the VM's exact state. Broke it? Restore in 10 seconds. Take one before every risky action — this habit separates professionals from tourists."],
        ["The terminal is home", "Pros drive Linux from a command line. That's why your trainer here (Terminal tab) exists — same commands, zero risk."]
      ], quiz: [
        { q: "A snapshot lets you…", a: ["Delete the VM", "Restore the VM to a frozen past state", "Copy files to Windows", "Speed up the VM"], c: 1,
          why: "Snapshots freeze state; restoring rewinds to it — your undo button." },
        { q: "Where do the VM's files live?", a: ["C:\\Windows", "D:\\CyberLab\\vm", "The cloud", "Inside the browser"], c: 1,
          why: "Everything VM lives on D: per lab design — C: stays clean." }
      ] },
    { id: "L1M3", title: "Terminal Basics I", lessons: [
        ["pwd & ls", "You are always inside one folder. <b>pwd</b> prints where; <b>ls</b> lists what's here. Do both missions in the Terminal tab."],
        ["cd", "<b>cd</b> changes directory: cd /tmp, cd .., cd ~. Like double-clicking folders, but faster."],
        ["Reading files", "<b>cat</b> prints a whole file; <b>less</b> pages through big ones; <b>head</b>/<b>tail</b> take the edges."],
        ["Creating & copying", "<b>touch</b> makes empty files, <b>mkdir</b> makes folders, <b>cp</b> copies, <b>mv</b> moves/renames."]
      ], quiz: [
        { q: "Which prints your current folder?", a: ["ls", "cd", "pwd", "cat"], c: 2, why: "pwd = print working directory." },
        { q: "To rename notes.txt → notes-old.txt:", a: ["cp notes.txt notes-old.txt", "mv notes.txt notes-old.txt", "rm notes.txt", "cat notes.txt"], c: 1,
          why: "mv renames in place (cp would leave the original)." }
      ] },
    { id: "L1M4", title: "Networks & The Internet", lessons: [
        ["IP addresses", "Every machine gets an IP — its postal address. Yours in the VM is private (10.x / 172.x / 192.168.x)."],
        ["Ports", "An IP is the building; <b>ports</b> are the doors (0–65535). Web=443/80, SSH=22. Scanners knock on doors."],
        ["DNS", "Names (kali.org) resolve to IPs via DNS — the internet's phonebook."],
        ["Packets", "Traffic travels in packets. Wireshark (later level) reads them like mail."
      ]], quiz: [
        { q: "SSH normally listens on port…", a: ["443", "22", "8080", "21"], c: 1, why: "SSH=22; HTTP=80, HTTPS=443." },
        { q: "192.168.1.50 is…", a: ["A public IP", "A private/internal IP", "A DNS server", "A MAC address"], c: 1, why: "192.168.x.x is reserved for internal networks." }
      ] }
  ],
  exam: [
    { q: "The three pillars (CIA) are…", a: ["Control, Internet, Access", "Confidentiality, Integrity, Availability", "Cyber, Info, Audit", "None"], c: 1 },
    { q: "Safest place to practice attacks?", a: ["College WiFi", "Your own VM", "A friend's router", "Any website"], c: 1 },
    { q: "Command to list files:", a: ["ls", "pwd", "cd", "man"], c: 0 },
    { q: "VM snapshots are taken…", a: ["Never", "Before risky actions", "Only by admins", "After deleting files"], c: 1 },
    { q: "Port 443 is usually…", a: ["SSH", "HTTPS", "FTP", "DNS"], c: 1 }
  ]
},
{
  id: "L2", name: "Operator", tag: "Beginner+", icon: "⚡",
  blurb: "Real Linux control + your first true lab missions.",
  requires: "L1",
  modules: [
    { id: "L2M1", title: "Filesystem Mastery & Permissions", lessons: [
        ["The Linux tree", "Everything starts at /: /etc configs, /home users, /var logs, /tmp scratch. Know the map, never get lost."],
        ["Reading permissions", "rwxr-xr-- = owner read/write/execute, group read/execute, others read. Learn to read it cold."],
        ["chmod & chown", "<b>chmod +x script.sh</b> makes scripts executable. Numbers: r=4, w=2, x=1 → 755 = rwxr-xr-x."],
        ["sudo", "sudo = one command as admin. With great power: it can delete everything. Think, then press Enter."]
      ], quiz: [
        { q: "chmod 755 grants…", a: ["rwxr-xr-x", "rw-r--r--", "rwx------", "r--r--r--"], c: 0, why: "7=rwx,5=r-x,5=r-x." },
        { q: "Config files typically live in…", a: ["/etc", "/home", "/tmp", "/mnt"], c: 0, why: "/etc is the config home." }
      ] },
    { id: "L2M2", title: "Text Processing", lessons: [
        ["grep", "Search inside files: grep -i password notes.txt. -r for folders, -n for line numbers."],
        ["find", "Find by name: find / -name '*.pcap' 2>/dev/null. The 2>/dev/null hides the noise."],
        ["head/tail", "First/last lines. tail -f /var/log/syslog watches logs live — blue-team eyes."],
        ["pipes", "cmd1 | cmd2 feeds output forward: cat access.log | grep 404 | wc -l. Pipelines are Linux's superpower."]
      ], quiz: [
        { q: "Search a whole folder recursively:", a: ["grep -r", "grep -1", "find . ", "cat -A"], c: 0, why: "-r = recursive." },
        { q: "cat log | grep fail | wc -l shows…", a: ["All lines", "Count of lines containing 'fail'", "File size", "Errors only"], c: 1, why: "wc -l counts the filtered lines." }
      ] },
    { id: "L2M3", title: "Networking Deep", lessons: [
        ["Your own IPs", "ip a shows addresses; your VM is 10.0.2.15 on NAT — private, safe."],
        ["Ping & why it fails", "ping tests reachability. Modern hosts may block it — silence ≠ dead host."],
        ["What scanners do", "A port scanner knocks every door and reports which answer. That's all nmap is — door-knocking, automated."],
        ["Reading a scan", "22/open means an SSH door is unlocked. Open ≠ vulnerable; it's just where you'd look next."]
      ], quiz: [
        { q: "22/open means…", a: ["Server is broken", "SSH is reachable", "You're hacked", "Firewall blocks all"], c: 1, why: "Open = service answering on that port." },
        { q: "A host that ignores ping may still be…", a: ["Offline", "Online with ping blocked", "A printer", "IPv6 only"], c: 1, why: "ICMP filtering is common." }
      ] },
    { id: "L2M4", title: "🔓 First Real VM Missions", lessons: [
        ["Open the VM", "Desktop launcher or VirtualBox → Kali → Start. Login kali/kali, then change it: passwd."],
        ["Mission: recon yourself", "In the VM terminal: ip a and man nmap — meet your machine as an adversary would."],
        ["Mission: your first scan", "Scan YOUR VM's gateway only: nmap -sV 10.0.2.2 (the NAT host). Watch services appear."],
        ["Log it", "Open notes/lab-journal.md and write the entry. Journaling is a professional habit."]
      ], quiz: [
        { q: "First thing to change in a new Kali VM:", a: ["Wallpaper", "Default password", "Browser", "Hostname"], c: 1, why: "kali/kali is public knowledge — change it day one." },
        { q: "nmap -sV does…", a: ["Deletes logs", "Finds service versions on open ports", "Blocks ports", "Sends email"], c: 1, why: "-sV fingerprints versions." }
      ] }
  ],
  exam: [
    { q: "r=4 w=2 x=1 → 644 equals…", a: ["rw-r--r--", "rwxr-xr-x", "r--r--r--", "rwx------"], c: 0 },
    { q: "Which watches a log live?", a: ["tail -f", "head -1", "cat -v", "ls -t"], c: 0 },
    { q: "grep -rn 'flag{' ~/ctf does what?", a: ["Deletes matches", "Recursive search showing line numbers", "Copies files", "Zips the folder"], c: 1 },
    { q: "Your NAT VM's IP will look like…", a: ["8.8.8.8", "10.0.2.15", "127.0.0.1", "192.168.1.1 is the VM"], c: 1 },
    { q: "Open port means…", a: ["System compromised", "A service is listening — a lead, not a victory", "Firewall dead", "Virus"], c: 1 }
  ]
},
{
  id: "L3", name: "Explorer", tag: "Intermediate", icon: "🧭",
  blurb: "Web security, vulnerability analysis, CTF craft.",
  requires: "L2",
  modules: [
    { id: "L3M1", title: "Web Security Fundamentals", lessons: [
        ["HTTP in 10 lines", "Request: method, path, headers. Response: status, headers, body. Read them like sentences — Burp later edits them."],
        ["Cookies & sessions", "Servers remember you via session cookies. Steal a cookie, sometimes steal a login (that's why HTTPS matters)."],
        ["The OWASP mindset", "Injection, broken auth, XSS, misconfig — the same 10 classes cause most breaches. Learn classes, not tricks."],
        ["Burp Suite intro", "Burp sits between your browser and the site — see, repeat, modify requests. Community edition is in your lab."]
      ], quiz: [
        { q: "404 means…", a: ["Server error", "Not found", "Redirect", "Unauthorized"], c: 1, why: "4xx=client-side: 404=not found, 403=forbidden, 401=unauthenticated." },
        { q: "XSS injects…", a: ["SQL", "JavaScript into pages viewed by others", "Rootkits", "Firewalls"], c: 1, why: "Cross-Site Scripting runs attacker JS in victims' browsers." }
      ] },
    { id: "L3M2", title: "Vulnerability Analysis", lessons: [
        ["CVEs & CVSS", "CVE = public flaw ID; CVSS 0–10 = severity score. Reading advisories is a core daily skill."],
        ["Version ≠ vulnerability", "-sV shows versions. A version is a suspect, not a conviction — confirm before claiming."],
        ["From scan to lead", "Open port → service+version → search advisories → confirm safely. That loop is recon 101."],
        ["Reporting honestly", "A finding without proof is a rumor. Reproduce, capture, severity, fix advice — the professional format."]
      ], quiz: [
        { q: "CVSS 9.8 is…", a: ["Low", "Critical", "Informational", "A port"], c: 1, why: "0–10 scale; 9.0+ = critical." },
        { q: "Before reporting a vuln you must…", a: ["Tweet it", "Reproduce & capture evidence", "Patch it yourself", "Email the CEO"], c: 1, why: "Evidence first — always." }
      ] },
    { id: "L3M3", title: "Passwords & Cracking Concepts", lessons: [
        ["Hashes", "Hashing is one-way: password → fixed fingerprint. Sites store hashes, not passwords."],
        ["Salt", "A random extra added before hashing so identical passwords look different — defeats rainbow tables."],
        ["Why cracking works", "Humans choose guessable passwords. Attackers use wordlists + rules against hashes — not magic."],
        ["Defense is the point", "Long passphrases + manager + MFA beat any cracking you'll learn. You study attacks to build defenses."]
      ], quiz: [
        { q: "Salts defeat…", a: ["Firewalls", "Precomputed rainbow tables", "HTTPS", "VPNs"], c: 1, why: "Unique salt → precomputation useless." },
        { q: "Strongest password below:", a: ["P@ssw0rd!", "Correct-horse-battery-staple-9!", "1234567890", "Name+birthyear"], c: 1, why: "Length beats symbol-soup." }
      ] },
    { id: "L3M4", title: "CTF Methodology", lessons: [
        ["What a CTF is", "Puzzles hiding flags (flag{...}). Safe, legal, the fastest skill builder that exists."],
        ["Recon loop", "Read everything → enumerate → Google everything weird → try the simplest thing first."],
        ["Take notes or lose", "Flags vanish from memory. Every attempt, every dead end, journaled."],
        ["Stuck protocol", "15 min: re-read. 30 min: hint. 1 hr: walkthrough — then REDO it solo. Pain now, skill forever."]
      ], quiz: [
        { q: "First step in any CTF box:", a: ["Run exploits", "Thorough enumeration", "Brute force", "Restart the VM"], c: 1, why: "Enumeration before exploitation. Always." }
      ] }
  ],
  exam: [
    { q: "Burp Suite is mainly used for…", a: ["Web traffic interception & testing", "Password cracking", "Firewalls", "VM snapshots"], c: 0 },
    { q: "Salt in hashing…", a: ["Speeds login", "Defeats precomputed tables", "Compresses", "Encrypts"], c: 1 },
    { q: "Enumeration comes…", a: ["After exploitation", "Before exploitation", "Never", "Only on Windows"], c: 1 },
    { q: "A 3xx response means…", a: ["Error", "Redirect", "Success", "Crash"], c: 1 }
  ]
},
{
  id: "L4", name: "Adversary", tag: "Advanced", icon: "⚔️",
  blurb: "Exploitation, privilege escalation, scripting, blue-team eyes.",
  requires: "L3",
  modules: [
    { id: "L4M1", title: "Exploitation Concepts", lessons: [
        ["Exploit vs payload", "Exploit = the lockpick; payload = what you do inside. Metasploit pairs them."],
        ["msfconsole", "search → use → set RHOSTS → run. Learn the rhythm on lab targets only."],
        ["Meterpreter", "A post-exploitation shell: hashdump, screenshot, pivot. Powerful = responsibility."],
        ["Shells", "bind waits for you; reverse calls home. Firewalls hate reverse — that's why egress filtering matters."]
      ], quiz: [
        { q: "The payload is…", a: ["The bug", "What runs after entry", "A scanner", "A hash"], c: 1 },
        { q: "Metasploit may be used on…", a: ["Any website", "Lab VMs you own only", "College servers", "Public WiFi devices"], c: 1 }
      ] },
    { id: "L4M2", title: "Privilege Escalation", lessons: [
        ["Why escalate", "A foothold as user 'www' isn't root. Escalation is the art of legal shortcuts to admin."],
        ["Linux SUID", "find / -perm -4000 finds SUID binaries — occasionally a root shortcut."],
        ["sudo -l", "Lists what your user may run as root. Misconfigurations are gold."],
        ["Windows notes", "Unquoted service paths, always-install-elevated — same idea, different OS."]
      ], quiz: [
        { q: "sudo -l shows…", a: ["Log size", "Your sudo permissions", "Locked files", "Load average"], c: 1 },
        { q: "SUID means…", a: ["Runs as file owner's rights", "Secret UID", "A virus", "A symlink"], c: 0 }
      ] },
    { id: "L4M3", title: "Python for Hackers", lessons: [
        ["sockets", "A port scanner is ~20 lines of Python connecting to ports and reporting who answers."],
        ["requests", "Script web checks: status codes, headers, login forms — automation begins here."],
        ["Build, don't just use", "Writing your own scanner teaches more than ten tutorials on using others'."],
        ["Clean code matters", "Future-you (and employers reading your GitHub) judge the code, not just the result."]
      ], quiz: [
        { q: "Python socket.connect() returns…", a: ["Always true", "Exception if refused, success if open", "The banner", "A hash"], c: 1 }
      ] },
    { id: "L4M4", title: "Blue-Team View: Logs", lessons: [
        ["Reading attacks", "The same nmap you ran is visible in logs. Now read the other side."],
        ["What stands out", "Off-hours logins, mass 404s (scanning), new SUID files, odd outbound traffic."],
        ["Baseline first", "You can't spot abnormal before you know normal. Week-one baselining is real SOC work."],
        ["Tell the story", "Timeline: initial access → actions → evidence. Reports win SOC jobs."]
      ], quiz: [
        { q: "Mass 404s in a web log usually indicate…", a: ["A popular site", "Directory scanning", "Server crash", "DNS failure"], c: 1 }
      ] }
  ],
  exam: [
    { q: "Reverse shells are blocked mainly by…", a: ["Egress filtering", "DNS", "DHCP", "RAID"], c: 0 },
    { q: "find / -perm -4000 hunts…", a: ["SUID binaries", "Symlinks", "Empty files", "Dead links"], c: 0 },
    { q: "A port scanner's core is…", a: ["A socket connect attempt", "A hash", "A packet dump", "A firewall rule"], c: 0 }
  ]
},
{
  id: "L5", name: "Professional", tag: "Career", icon: "🎓",
  blurb: "Method, reports, certification, capstone.",
  requires: "L4",
  modules: [
    { id: "L5M1", title: "Engagement Methodology", lessons: [
        ["Scope & permission", "Written scope, signed. Outside it = crime, regardless of intent."],
        ["Phases", "Recon → enumerate → exploit (in scope) → document → report → retest. Discipline beats flash."],
        ["Time boxing", "Deadlines force priorities: which 20% of findings matter? Learn triage."],
        ["Deconfliction", "Something unexpected? Stop, contact the client. Heroes make headlines; pros make calls."]
      ], quiz: [
        { q: "First document in an engagement:", a: ["Exploit list", "Signed scope/permission", "Invoice", "Slack channel"], c: 1 }
      ] },
    { id: "L5M2", title: "Report Writing", lessons: [
        ["Executive summary", "One page: what was tested, biggest risks, business impact. Managers read only this."],
        ["Finding format", "Title, severity (CVSS), evidence, reproduction steps, remediation. Repeatable = professional."],
        ["Risk language", "'Could allow account takeover' beats 'totally broken'. Precise > dramatic."],
        ["Retest culture", "Fixes get verified. Your name is on accuracy."]
      ], quiz: [
        { q: "An executive summary is written for…", a: ["Other hackers", "Management (business impact)", "The firewall", "Nobody"], c: 1 }
      ] },
    { id: "L5M3", title: "Certification Track", lessons: [
        ["Security+", "The HR filter: vocabulary + breadth. Study alongside L3–L4; exam in sem 4."],
        ["eJPT", "Hands-on pentest cert — practical, affordable, respected for juniors."],
        ["Later: OSCP/CISSP", "OSCP when your lab hours hit hundreds; CISSP after 5 years pro. Don't rush."],
        ["Portfolio > paper", "This repo — missions, writeups, tools — is proof of work recruiters actually open."]
      ], quiz: [
        { q: "Best first hands-on cert:", a: ["OSCP", "eJPT", "CISSP", "CCNA"], c: 1, why: "eJPT fits junior practical skills." }
      ] },
    { id: "L5M4", title: "Capstone", lessons: [
        ["The chain", "Scan → find → exploit → escalate → document, inside the lab, start to finish."],
        ["The writeup", "Professional report on your GitHub. This becomes your interview centerpiece."],
        ["Teach it", "Present to your college club. Teaching cements mastery — and builds reputation."],
        ["Next horizon", "Specialize: red, blue, cloud, appsec. The fundamentals you built transfer everywhere."]
      ], quiz: [
        { q: "The capstone proves…", a: ["You memorized terms", "A full chain + professional documentation", "You can type fast", "Nothing"], c: 1 }
      ] }
  ],
  exam: [
    { q: "Scope is…", a: ["Optional", "The legal boundary of testing", "A network tool", "A report section only"], c: 1 },
    { q: "Severity uses…", a: ["CVSS", "TCP", "UUID", "ASCII"], c: 0 },
    { q: "Your strongest career asset from this lab:", a: ["Wallpaper", "Public portfolio of real work", "Password list", "Fake titles"], c: 1 }
  ]
}
];

/* ---------- tools reference (list + per-tool commands) ---------- */
const TOOLS = [
  { n: "nmap", cat: "Recon", lvl: "L2", desc: "Port scanner — discovers live hosts, open ports, service versions.",
    cmds: [["Scan your lab gateway", "nmap -sV 10.0.2.2"], ["Quick top-1000 ports", "nmap 10.0.2.2"], ["Save output", "nmap -sV -oN scan.txt 10.0.2.2"]] },
  { n: "Wireshark", cat: "Network", lvl: "L2", desc: "GUI packet analyzer — read the traffic flowing through an interface.",
    cmds: [["Start capture (GUI)", "wireshark &"], ["CLI capture", "tshark -i eth0"], ["Filter HTTP traffic", "tshark -Y http -i eth0"]] },
  { n: "Burp Suite", cat: "Web", lvl: "L3", desc: "Intercept, inspect and modify web traffic; the web-hacker cockpit.",
    cmds: [["Launch (Community)", "burpsuite &"], ["CLI variant", "java -jar burpsuite_community.jar"]] },
  { n: "gobuster", cat: "Web", lvl: "L3", desc: "Directory/file brute-forcer for websites.",
    cmds: [["Find hidden dirs", "gobuster dir -u http://10.0.2.2 -w /usr/share/wordlists/dirb/common.txt"]] },
  { n: "sqlmap", cat: "Web", lvl: "L3", desc: "Automated SQL-injection detection/exploitation — lab targets only.",
    cmds: [["Test a parameter", "sqlmap -u 'http://10.0.2.2/item.php?id=1' --batch"]] },
  { n: "john", cat: "Cracking", lvl: "L3", desc: "Password hash cracker — concepts: wordlists, rules, salts.",
    cmds: [["Crack with wordlist", "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt"], ["Show results", "john --show hashes.txt"]] },
  { n: "hydra", cat: "Cracking", lvl: "L4", desc: "Online login brute-forcer (SSH/FTP/HTTP forms).",
    cmds: [["SSH brute (lab only)", "hydra -l kali -P /usr/share/wordlists/rockyou.txt 10.0.2.15 ssh"]] },
  { n: "Metasploit", cat: "Exploitation", lvl: "L4", desc: "Exploit framework — pairs exploits with payloads (lab VMs only).",
    cmds: [["Console", "msfconsole"], ["Find a module", "search type:exploit vsftpd"], ["Run a module", "use 0; set RHOSTS 10.0.2.15; run"]] },
  { n: "Nikto", cat: "Web", lvl: "L3", desc: "Web server scanner for dangerous files and misconfigurations.",
    cmds: [["Basic scan", "nikto -h http://10.0.2.2"]] },
  { n: "tcpdump", cat: "Network", lvl: "L2", desc: "Command-line packet capture.",
    cmds: [["Capture on eth0", "sudo tcpdump -i eth0 -nn"], ["Save to file", "sudo tcpdump -i eth0 -w /tmp/cap.pcap"]] },
  { n: "netcat", cat: "Utility", lvl: "L3", desc: "TCP/UDP swiss-army knife — banners, transfers, shells.",
    cmds: [["Grab a banner", "nc -nv 10.0.2.2 22"], ["Listen", "nc -lvnp 4444"]] },
  { n: "searchsploit", cat: "Recon", lvl: "L4", desc: "Offline Exploit-DB search — find public exploits for versions you discover.",
    cmds: [["Search", "searchsploit vsftpd 2.3.4"]] }
];

/* ---------- glossary ---------- */
const GLOSS = [
  ["IP address", "A machine's network address (e.g. 192.168.1.5)."],
  ["Port", "A numbered 'door' on an IP where services listen (0–65535)."],
  ["VM", "Virtual machine — a full computer running inside another."],
  ["Snapshot", "A frozen saved state of a VM you can restore anytime."],
  ["Shell", "A text interface to control a system (bash is the classic)."],
  ["Root", "The Linux superuser — full power, full danger."],
  ["sudo", "Run one command with root privileges."],
  ["Hash", "One-way fingerprint of data (like a password)."],
  ["Salt", "Random data added to hashing to defeat precomputed tables."],
  ["CVE", "Public ID for a known vulnerability."],
  ["CVSS", "Severity score 0–10 for vulnerabilities."],
  ["Payload", "Code that runs after an exploit succeeds."],
  ["Recon", "Reconnaissance — information gathering on a target."],
  ["Enumeration", "Deep listing of what a target exposes (users, shares, dirs)."],
  ["XSS", "Cross-Site Scripting — injecting JS into pages others view."],
  ["SQLi", "SQL Injection — smuggling database commands through inputs."],
  ["Firewall", "Filter that allows/blocks traffic by rules."],
  ["NAT", "Network Address Translation — VMs share the host's internet safely."],
  ["Payload URL", "The exact crafted link/request that triggers a flaw."],
  ["CTF", "Capture The Flag — legal hacking puzzle competitions."],
  ["Flag", "The secret string proving you solved a CTF task (flag{...})."],
  ["SOC", "Security Operations Center — the blue-team's home."],
  ["Red team", "Offensive security professionals."],
  ["Blue team", "Defensive security professionals."],
  ["OSINT", "Open-Source Intelligence — public-info reconnaissance."],
  ["Exploit", "Code/technique that takes advantage of a flaw."],
  ["Privilege escalation", "Gaining higher permissions than granted."],
  ["Wordlist", "A list of candidate passwords/directories used by tools."],
  ["Banner grabbing", "Reading a service's self-announcement (version info)."],
  ["Baseline", "The 'normal' profile against which anomalies are detected."]
];

/* ---------- tiny helpers ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

/* ---------- gating engine ---------- */
const modKey = m => m.id;
const isModDone = (lvl, m) => (prog[lvl.id]||{}).mods?.[m.id] === true;
function lessonsDone(lvl, m){ return ((prog[lvl.id]||{}).les||{})[m.id]?.length === m.lessons.length; }
function quizPassed(lvl, m){ return ((prog[lvl.id]||{}).quiz||[]).includes(m.id); }
function examPassed(lvl){ return ((prog[lvl.id]||{}).exam||[]).length > 0; }
function levelUnlocked(lvl){
  if (!lvl.requires) return true;
  const prev = COURSE.find(l => l.id === lvl.requires);
  const allMods = prev.modules.every(m => isModDone(prev, m));
  return allMods && examPassed(prev);
}
function modComplete(lvl, m){ return lessonsDone(lvl,m) && quizPassed(lvl,m); }
function levelProgress(lvl){
  const total = lvl.modules.length + 1; // + exam
  const done = lvl.modules.filter(m => modComplete(lvl,m)).length + (examPassed(lvl)?1:0);
  return { done, total, pct: Math.round(done/total*100) };
}

/* ---------- TABS ---------- */
const TABS = ["dashboard","academy","terminal","tools","glossary"];
function showTab(name){
  TABS.forEach(t => $("#tab-"+t).hidden = (t !== name));
  $$("#navlinks button").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
  if (name === "dashboard") renderDashboard();
  if (name === "academy") renderAcademy();
  if (name === "tools") renderTools();
  if (name === "glossary") renderGlossary();
}

/* ---------- DASHBOARD ---------- */
function renderDashboard(){
  const grid = $("#dashlevels"); if (!grid) return;
  grid.innerHTML = COURSE.map(l => {
    const p = levelProgress(l), unlocked = levelUnlocked(l);
    return `<div class="card level ${unlocked?"":"locked"}" data-lvl="${l.id}">
      <div class="lvlhead"><span class="lnum">${l.icon}</span>
      <h3>${l.name} <span class="muted">· ${l.tag}</span></h3>
      <span class="badge ${p.done===p.total?"b-done":(unlocked?"b-pend":"b-lock")}">${unlocked ? p.done+"/"+p.total : "🔒 locked"}</span></div>
      <div class="bar"><i style="width:${unlocked?p.pct:0}%"></i></div>
      <p class="muted">${l.blurb}</p></div>`;
  }).join("");
  const xpEl = $("#dash-xp"); if (xpEl) xpEl.textContent = xp();
  const nvEl = $("#navxpv"); if (nvEl) nvEl.textContent = xp();
  const nextLvl = COURSE.find(l => levelUnlocked(l) && levelProgress(l).done < levelProgress(l).total);
  $("#dash-next").textContent = nextLvl ? `${nextLvl.icon} ${nextLvl.name}: keep going — modules on the Academy tab.` : "All levels complete — capstone time!";
}
function xp(){
  let x = 0;
  COURSE.forEach(l => (l.modules||[]).forEach(m => { if (modComplete(l,m)) x += 50; }));
  COURSE.forEach(l => { if (examPassed(l)) x += 150; });
  return x;
}

/* ---------- ACADEMY ---------- */
function renderAcademy(){
  const host = $("#levels"); if (!host) return;
  host.innerHTML = COURSE.map(l => {
    const unlocked = levelUnlocked(l), p = levelProgress(l);
    const mods = l.modules.map(m => {
      const done = modComplete(l,m);
      return `<div class="mod" data-lvl="${l.id}" data-mod="${m.id}">
        <span class="check">${done?"✅":"⬜"}</span><span>${m.title}</span>
        <span class="badge ${done?"b-done":"b-pend"}" style="margin-left:auto">${done?"done":"open"}</span></div>`;
    }).join("");
    return `<div class="card level ${unlocked?"":"locked"}" id="level-${l.id}">
      <div class="lvlhead"><span class="lnum">${l.icon}</span>
        <div><h3>${l.name} <span class="muted">· ${l.tag}</span></h3><p class="muted">${l.blurb}</p></div>
        <span class="badge ${p.done===p.total?"b-done":(unlocked?"b-pend":"b-lock")}">
          ${unlocked ? p.done+"/"+p.total : "🔒 complete "+l.requires+" first"}</span></div>
      <div class="bar"><i style="width:${unlocked?p.pct:0}%"></i></div>
      <div class="modules">${mods}
        <div class="examrow"><span class="muted">Level Exam (80% to pass)</span>
          <button data-exam="${l.id}" ${(!unlocked || examPassed(l))?"disabled":""}>${examPassed(l)?"✅ passed":"Take exam"}</button></div>
      </div></div>`;
  }).join("");

  $$("#levels .level").forEach(el => el.addEventListener("click", e => {
    if (e.target.closest(".examrow")) return;
    if (el.classList.contains("locked")) { flashLock(el); return; }
    el.classList.toggle("open");
  }));
  $$("#levels .mod").forEach(el => el.addEventListener("click", e => {
    e.stopPropagation();
    const lvl = COURSE.find(l => l.id === el.dataset.lvl);
    if (!levelUnlocked(lvl)) { flashLock(el.closest(".level")); return; }
    openModule(lvl, lvl.modules.find(m => m.id === el.dataset.mod));
  }));
  $$("#levels [data-exam]").forEach(btn => btn.addEventListener("click", e => {
    e.stopPropagation();
    const lvl = COURSE.find(l => l.id === btn.dataset.exam);
    if (levelUnlocked(lvl) && !examPassed(lvl)) openExam(lvl);
  }));
}
function flashLock(el){
  el.animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:250});
}

/* ---------- MODULE MODAL (lessons + quiz) ---------- */
let ctx = null;
function openModule(lvl, m){
  ctx = { lvl, m, step: 0, done: new Set() };
  drawModule();
  $("#modal").classList.add("open");
}
function drawModule(){
  const { lvl, m, step } = ctx;
  const total = m.lessons.length + 1;
  if (step < m.lessons.length){
    const [t, html] = m.lessons[step];
    $("#modalbox").innerHTML = `<h3>${m.title}</h3>
      <p class="muted">Lesson ${step+1} of ${m.lessons.length} · ${lvl.name}</p>
      <div class="lessonstep"><b>${t}</b><br><br>${html}</div>
      <button class="btn primary" id="nextles">${step===0?"Start lessons":"Next lesson"} →</button>
      <button class="btn modalclose" onclick="closeModal()">Close</button>`;
    $("#nextles").onclick = () => {
      const rec = prog[lvl.id] = prog[lvl.id] || { mods:{}, les:{}, quiz:[], exam:[] };
      rec.les[m.id] = rec.les[m.id] || [];
      if (!rec.les[m.id].includes(step)) rec.les[m.id].push(step);
      saveProg(); ctx.step++; drawModule();
    };
  } else if (!quizPassed(lvl, m)){
    $("#modalbox").innerHTML = `<h3>${m.title} — Knowledge Check</h3>
      <div class="quiz" id="quizbox"></div>
      <button class="btn modalclose" onclick="closeModal()">Close</button>`;
    drawQuiz(lvl, m);
  } else {
    $("#modalbox").innerHTML = `<h3>✅ Module complete</h3>
      <p class="score">Module marked done — progress saved.</p>
      <button class="btn primary" onclick="closeModal()">Back to Academy</button>`;
  }
}
function drawQuiz(lvl, m){
  const box = $("#quizbox"); let qi = 0, correct = 0;
  function q(){
    if (qi >= m.quiz.length){
      if (correct === m.quiz.length){
        const rec = prog[lvl.id] = prog[lvl.id] || { mods:{}, les:{}, quiz:[], exam:[] };
        if (!rec.quiz.includes(m.id)) rec.quiz.push(m.id);
        if (rec.les[m.id]?.length === m.lessons.length) rec.mods[m.id] = true;
        saveProg();
        box.innerHTML = `<p class="score okc" style="color:var(--green)">✅ Perfect — module complete!</p>
          <button class="btn primary" onclick="closeModal()">Back to Academy</button>`;
        renderAcademy();
      } else {
        box.innerHTML = `<p class="score" style="color:var(--amber)">${correct}/${m.quiz.length} — review the lessons and retry.</p>
          <button class="btn" onclick="location.reload()">Retry quiz</button>`;
      }
      return;
    }
    const Q = m.quiz[qi];
    box.innerHTML = `<p class="muted">Question ${qi+1}/${m.quiz.length}</p><h3 style="margin:8px 0 4px">${Q.q}</h3>` +
      Q.a.map((ans,i)=>`<button data-i="${i}">${ans}</button>`).join("") + `<div id="why" class="callout" style="display:none"></div>`;
    box.querySelectorAll("button").forEach(b => b.onclick = () => {
      const ok = +b.dataset.i === Q.c;
      b.classList.add(ok?"ok":"no");
      if (!ok) box.children[+b.dataset.i+2].classList.add("no");
      if (ok) correct++;
      const why = $("#why"); why.style.display="block";
      why.innerHTML = `<b>${ok?"Correct.":"Not quite."}</b> ${Q.why}`;
      box.querySelectorAll("button").forEach(x=>x.disabled=true);
      setTimeout(()=>{ qi++; q(); }, 1400);
    });
  }
  q();
}

/* ---------- EXAM MODAL ---------- */
function openExam(lvl){
  let qi = 0, correct = 0;
  $("#modal").classList.add("open");
  function q(){
    if (qi >= lvl.exam.length){
      const pass = correct/lvl.exam.length >= 0.8;
      if (pass){
        const rec = prog[lvl.id] = prog[lvl.id] || { mods:{}, les:{}, quiz:[], exam:[] };
        rec.exam.push("passed"); saveProg();
        $("#modalbox").innerHTML = `<h3>🎓 ${lvl.name} cleared!</h3>
          <p class="score" style="color:var(--green)">${correct}/${lvl.exam.length} — next level unlocked.</p>
          <button class="btn primary" onclick="closeModal()">Continue</button>`;
        renderAcademy(); renderDashboard();
      } else {
        $("#modalbox").innerHTML = `<h3>Not yet</h3>
          <p class="score" style="color:var(--amber)">${correct}/${lvl.exam.length} — need 80%. Review the modules and retake.</p>
          <button class="btn" onclick="closeModal()">Back</button>`;
      }
      return;
    }
    const Q = lvl.exam[qi];
    $("#modalbox").innerHTML = `<h3>${lvl.icon} ${lvl.name} Exam — ${qi+1}/${lvl.exam.length}</h3>
      <p style="margin-bottom:10px">${Q.q}</p>` +
      Q.a.map((a,i)=>`<div class="quiz"><button data-i="${i}">${a}</button></div>`).join("");
    $$("#modalbox .quiz button").forEach(b => b.onclick = () => {
      if (+b.dataset.i === Q.c) correct++;
      b.classList.add(+b.dataset.i===Q.c?"ok":"no");
      $$("#modalbox .quiz button").forEach(x=>x.disabled=true);
      setTimeout(()=>{ qi++; q(); }, 700);
    });
  }
  q();
}
function closeModal(){ $("#modal").classList.remove("open"); }

/* ---------- TOOLS ---------- */
function renderTools(){
  const host = $("#toollist"); if (!host) return;
  host.innerHTML = TOOLS.map(t => `
    <div class="card tool">
      <div class="toolhead"><h3>${t.n}</h3>
        <span class="badge">${t.cat}</span>
        <span class="badge ${levelUnlocked(COURSE.find(l=>l.id===t.lvl))?"b-done":"b-lock"}">${t.lvl} ${levelUnlocked(COURSE.find(l=>l.id===t.lvl))?"unlocked":"locked"}</span></div>
      <p class="muted">${t.desc}</p>
      ${t.cmds.map(([lbl,cmd])=>`<div class="cmdrow"><code>${esc(cmd)}</code><button class="copy" data-cmd="${esc(cmd)}">copy</button></div>`).join("")}
    </div>`).join("");
  $$("#toollist .copy").forEach(b => b.onclick = () => {
    navigator.clipboard.writeText(b.dataset.cmd).then(()=>{ b.textContent="copied!"; setTimeout(()=>b.textContent="copy",1200); });
  });
}

/* ---------- GLOSSARY ---------- */
function renderGlossary(filter){
  const host = $("#gloslist"); if (!host) return;
  const f = (filter||"").toLowerCase();
  host.innerHTML = GLOSS.filter(([t]) => t.toLowerCase().includes(f) || f==="")
    .map(([t,d]) => `<div class="card"><b>${t}</b><br><span class="muted">${d}</span></div>`).join("")
    || `<p class="muted">No terms match "${esc(filter)}".</p>`;
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $$("#navlinks button").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
  $("#gsearch")?.addEventListener("input", e => renderGlossary(e.target.value));
  const first = COURSE.find(l => levelUnlocked(l) && levelProgress(l).done < levelProgress(l).total);
  if (first) prog.lastOpened = first.id; saveProg();
  showTab("dashboard");
});
