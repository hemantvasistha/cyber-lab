/* ============================================================
   CyberLab Terminal Trainer — simulated Linux (two-way panel)
   ============================================================ */
"use strict";

const VFS = {
  "/": ["bin/","etc/","home/","tmp/","var/"],
  "/bin": ["ls","cat","grep","nmap"],
  "/etc": ["passwd","hosts","hostname"],
  "/etc/passwd": "root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali,,,:/home/kali:/bin/bash",
  "/etc/hosts": "127.0.0.1 localhost\n10.0.2.15 kali",
  "/etc/hostname": "kali",
  "/home": ["kali/"],
  "/home/kali": ["notes.txt","recon/","flag.txt"],
  "/home/kali/notes.txt": "Lab notes - day 1\n- VM works\n- gateway is 10.0.2.2\n- TODO: first nmap scan",
  "/home/kali/recon": ["scan1.txt"],
  "/home/kali/recon/scan1.txt": "PORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http",
  "/home/kali/flag.txt": "flag{you_are_learning_fast}",
  "/home/kali/.bash_history": "ip a\nnmap -sV 10.0.2.2\ncat /etc/passwd",
  "/tmp": [],
  "/var": ["log/"],
  "/var/log": ["auth.log"],
  "/var/log/auth.log": "Sep 21 14:00:01 kali sudo: kali : TTY=pts/0 ; PWD=/home/kali ; COMMAND=/usr/bin/nmap"
};

const USER = "kali";
const HOME = "/home/kali";
let CWD = HOME;

const termEl = () => $("#term");
function tprint(html, cls){
  const t = termEl(); if (!t) return;
  const d = document.createElement("div");
  if (cls) d.className = cls;
  d.innerHTML = html;
  t.appendChild(d); t.scrollTop = t.scrollHeight;
}
const tprintEsc = (s, cls) => tprint(esc(s), cls);

/* ---------- mission definitions (gated by course level progress) ---------- */
const MISSIONS = [
  { id:"T1", lvl:"L1", cmd:"pwd",        why:"print where you are" },
  { id:"T2", lvl:"L1", cmd:"ls",         why:"list files here" },
  { id:"T3", lvl:"L1", cmd:"cd /etc",    why:"change into /etc" },
  { id:"T4", lvl:"L1", cmd:"cat /etc/hostname", why:"read a config file" },
  { id:"T5", lvl:"L1", cmd:"cd ~",       why:"return home" },
  { id:"T6", lvl:"L2", cmd:"ls -l /etc/passwd", why:"long listing (permissions)" },
  { id:"T7", lvl:"L2", cmd:"cat /etc/passwd",   why:"read the password file" },
  { id:"T8", lvl:"L2", cmd:"grep kali /etc/passwd", why:"filter a file with grep" },
  { id:"T9", lvl:"L2", cmd:"mkdir ~/recon2",    why:"create a folder" },
  { id:"T10",lvl:"L2", cmd:"cp /home/kali/notes.txt /tmp/n.txt", why:"copy a file" },
  { id:"T11",lvl:"L2", cmd:"rm /tmp/n.txt",     why:"delete it again" },
  { id:"T12",lvl:"L3", cmd:"cat /home/kali/recon/scan1.txt", why:"read a scan result" },
  { id:"T13",lvl:"L3", cmd:"grep open /home/kali/recon/scan1.txt", why:"grep scan output" },
  { id:"T14",lvl:"L3", cmd:"nc -nv 10.0.2.2 22", why:"banner grab with netcat" },
  { id:"T15",lvl:"L3", cmd:"sudo whoami",        why:"elevate briefly" },
  { id:"T16",lvl:"L4", cmd:"nmap -sV 10.0.2.2",  why:"run the simulated scanner" },
  { id:"L4extra", lvl:"L4", cmd:"find / -name '*.txt'", why:"find all text files" },
  { id:"L5m",    lvl:"L5", cmd:"whoami",  why:"confirm your identity" }
];
const T_MISSIONS = MISSIONS; // alias

/* ---------- state ---------- */
let doneMissions = JSON.parse(localStorage.getItem("cl-missions") || "[]");
function saveMissions(){ localStorage.setItem("cl-missions", JSON.stringify(doneMissions)); }

/* ---------- rendering ---------- */
function renderMissions(){
  const host = $("#missions"); if (!host) return;
  const unlockedLvls = COURSE.filter(l => levelUnlocked(l)).map(l => l.id);
  host.innerHTML = MISSIONS.map(m => {
    const locked = !unlockedLvls.includes(m.lvl);
    const done = doneMissions.includes(m.id);
    return `<div class="mission ${done?"done":""}">
      <span class="check">${done?"✅":"⬜"}</span>
      <span><code>${esc(m.cmd)}</code> <span class="muted">— ${m.why}</span>
      ${locked?`<span class="badge b-lock" style="margin-left:6px">🔒 ${m.lvl}</span>`:""}</span></div>`;
  }).join("");
}

function completeMission(m){
  if (doneMissions.includes(m.id)) return;
  doneMissions.push(m.id); saveMissions(); renderMissions();
  tprint(`✅ mission complete: ${m.why} (+25 XP)`, "okc");
  if (typeof renderDashboard === "function") renderDashboard();
}

/* ---------- help ---------- */
function help(){
  tprint(`commands: pwd ls cd cat grep find mkdir cp mv rm touch whoami id uname history clear echo wc head tail chmod sudo ping ip nc nmap john hydra help`, "dimt");
  tprint(`tips: Tab completes · ↑ recalls · 'missions' lists your tasks`, "dimt");
}

/* ---------- fake tools ---------- */
function fakeNmap(args){
  const target = args.find(a => !a.startsWith("-")) || "10.0.2.2";
  if (target === "10.0.2.15" || target === "localhost" || target === "127.0.0.1"){
    tprint("Starting Nmap 7.95 ( https://nmap.org )");
    tprint("Nmap scan report for " + esc(target));
    tprint("Host is up (0.00012s latency).");
    tprint("PORT     STATE  SERVICE      VERSION");
    tprint("22/tcp   open   ssh          OpenSSH 9.6p1");
    tprint("80/tcp   open   http         nginx 1.24.0");
    tprint("3389/tcp closed rdp");
    tprint("Nmap done: 1 IP address (1 host up) scanned in 0.42s");
  } else if (target === "10.0.2.2"){
    tprint("Starting Nmap 7.95 ( https://nmap.org )");
    tprint("Nmap scan report for 10.0.2.2");
    tprint("Host is up (0.00035s latency).");
    tprint("PORT     STATE  SERVICE      VERSION");
    tprint("22/tcp   open   ssh          OpenSSH 9.6p1");
    tprint("80/tcp   open   http         nginx 1.24.0");
    tprint("443/tcp  open   ssl/http     nginx 1.24.0");
    tprint("Nmap done: 1 IP address (1 host up) scanned in 0.51s");
  } else {
    tprint("Note: Host seems down. If it is really up, but blocking our ping probes, try -Pn");
    tprint("Nmap done: 256 IP addresses (0 hosts up) scanned in 3.05s");
  }
}
const fakeNmapScan = fakeNmap; // alias

/* ---------- command execution ---------- */
function runCmd(raw){
  const line = raw.trim();
  tprint(`<span class="cmd">${USER}@kali:${esc(CWD)}$ ${esc(line)}</span>`);
  if (!line) return;
  histPush(line);

  // mission check (exact or alt)
  const m = T_MISSIONS.find(x => x.cmd === line || (x.alt && x.alt === line));
  if (m) completeMission(m);

  const [cmd, ...args] = line.split(/\s+/);
  const arg = args.filter(a => !a.startsWith("-"));
  const flags = args.filter(a => a.startsWith("-"));

  switch (cmd) {
    case "help": case "?": help(); break;
    case "missions": renderMissions(); tprint("mission list refreshed (see right panel)", "dimt"); break;
    case "pwd": tprintEsc(CWD); break;
    case "whoami": tprintEsc(USER); break;
    case "id": tprint(`uid=1000(${USER}) gid=1000(${USER}) groups=1000(${USER}),27(sudo)`); break;
    case "uname": tprint(flags.includes("-a") ? "Linux kali 6.12.0-kali #1 SMP x86_64 GNU/Linux" : "Linux"); break;
    case "ls": {
      const target = arg[0] ? resolve(arg[0]) : CWD;
      const node = VFS[target];
      if (node === undefined) { tprint(`ls: cannot access '${esc(arg[0])}': No such file or directory`, "err"); break; }
      if (Array.isArray(node)) {
        const long = flags.some(f => f.includes("l"));
        const all = flags.some(f => f.includes("a"));
        const items = node.map(n => long ? `drwxr-xr-x 1 kali kali 4096 Sep 21 10:00 ${n}` : n);
        items.sort();
        if (all) items.unshift(".", "..");
        tprintEsc(items.join(long?"\n":"  "));
      } else tprintEsc(target);
      break;
    }
    case "cd": {
      const dest = arg[0] ? resolve(arg[0]) : HOME;
      if (VFS[dest] !== undefined && Array.isArray(VFS[dest])) CWD = dest;
      else if (VFS[dest] !== undefined) tprint(`cd: not a directory: ${esc(dest)}`, "err");
      else tprint(`cd: no such file or directory: ${esc(arg[0]||"")}`, "err");
      break;
    }
    case "cat": {
      if (!arg[0]) { tprint("cat: missing file", "err"); break; }
      const p = resolve(arg[0]);
      const node = VFS[p];
      if (node === undefined) tprint(`cat: ${esc(arg[0])}: No such file or directory`, "err");
      else if (Array.isArray(node)) tprint(`cat: ${esc(arg[0])}: Is a directory`, "err");
      else tprintEsc(node);
      break;
    }
    case "head": case "tail": {
      const p = arg[0] ? resolve(arg[0]) : null;
      const node = p && VFS[p];
      if (typeof node !== "string") { tprint(`${cmd}: cannot open '${esc(arg[0]||"")}'`, "err"); break; }
      const lines = node.split("\n");
      tprintEsc((cmd === "head" ? lines.slice(0,10) : lines.slice(-10)).join("\n"));
      break;
    }
    case "wc": {
      const p = arg[0] ? resolve(arg[0]) : null;
      const node = p && VFS[p];
      if (typeof node !== "string") { tprint(`wc: cannot open '${esc(arg[0]||"")}'`, "err"); break; }
      const l = node.split("\n").length, w = node.split(/\s+/).filter(Boolean).length;
      tprint(`${l} ${w} ${node.length} ${esc(arg[0])}`);
      break;
    }
    case "grep": {
      if (args.length < 1) { tprint("usage: grep PATTERN FILE", "err"); break; }
      const pat = args[0];
      const files = arg[0] === pat ? [resolve(arg[1])] : arg.map(resolve);
      let any = false;
      files.filter(Boolean).forEach(fp => {
        const node = VFS[fp];
        if (typeof node === "string") {
          node.split("\n").forEach((ln,i) => {
            if (ln.toLowerCase().includes(String(pat).toLowerCase())) { any = true;
              tprintEsc(`${files.length>1?fp+":":""}${i+1}:${ln}`); }
          });
        } else if (Array.isArray(node)) {
          tprint(`grep: ${esc(fp)}: Is a directory`, "err");
        }
      });
      if (!any) tprint("(no matches)", "dimt");
      break;
    }
    case "find": {
      const start = arg[0] ? resolve(arg[0]) : CWD;
      const nameIdx = args.indexOf("-name");
      const pat = nameIdx >= 0 ? args[nameIdx+1].replace(/['"]/g,"") : null;
      const re = pat ? new RegExp("^" + pat.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$") : null;
      const hits = Object.keys(VFS).filter(k => k.startsWith(start) && (!re || re.test(k.split("/").pop())));
      tprintEsc(hits.length ? hits.join("\n") : "(no results)");
      break;
    }
    case "mkdir": {
      if (!arg[0]) { tprint("mkdir: missing operand", "err"); break; }
      const p = resolve(arg[0]);
      if (VFS[p]) { tprint(`mkdir: cannot create '${esc(arg[0])}': File exists`, "err"); break; }
      VFS[p] = [];
      const parent = p.slice(0, p.lastIndexOf("/")) || "/";
      if (Array.isArray(VFS[parent])) VFS[parent].push(p.slice(p.lastIndexOf("/")+1) + "/");
      tprint(`(created ${esc(p)})`, "okc");
      break;
    }
    case "touch": {
      if (!arg[0]) { tprint("touch: missing operand", "err"); break; }
      const p = resolve(arg[0]);
      if (!VFS[p]) {
        VFS[p] = "";
        const parent = p.slice(0, p.lastIndexOf("/")) || "/";
        if (Array.isArray(VFS[parent])) VFS[parent].push(p.slice(p.lastIndexOf("/")+1));
      }
      tprint(`(created ${esc(p)})`, "okc");
      break;
    }
    case "cp": {
      if (arg.length < 2) { tprint("usage: cp SRC DST", "err"); break; }
      const s = resolve(arg[0]), d = resolve(arg[1]);
      if (typeof VFS[s] !== "string") { tprint(`cp: cannot stat '${esc(arg[0])}'`, "err"); break; }
      VFS[d] = VFS[s];
      const parent = d.slice(0, d.lastIndexOf("/")) || "/";
      if (Array.isArray(VFS[parent]) && !VFS[parent].includes(d.slice(d.lastIndexOf("/")+1)))
        VFS[parent].push(d.slice(d.lastIndexOf("/")+1));
      tprint(`(copied ${esc(arg[0])} → ${esc(arg[1])})`, "okc");
      break;
    }
    case "mv": {
      if (arg.length < 2) { tprint("usage: mv SRC DST", "err"); break; }
      const s = resolve(arg[0]), d = resolve(arg[1]);
      if (VFS[s] === undefined) { tprint(`mv: cannot stat '${esc(arg[0])}'`, "err"); break; }
      VFS[d] = VFS[s]; delete VFS[s];
      const sp = s.slice(0, s.lastIndexOf("/")) || "/";
      const dp = d.slice(0, d.lastIndexOf("/")) || "/";
      if (Array.isArray(VFS[sp])) VFS[sp] = VFS[sp].filter(x => x !== s.slice(s.lastIndexOf("/")+1) && x !== s.slice(s.lastIndexOf("/")+1)+"/");
      if (Array.isArray(VFS[dp]) && !VFS[dp].includes(d.slice(d.lastIndexOf("/")+1)))
        VFS[dp].push(d.slice(d.lastIndexOf("/")+1));
      tprint(`(moved ${esc(arg[0])} → ${esc(arg[1])})`, "okc");
      break;
    }
    case "rm": {
      if (!arg[0]) { tprint("rm: missing operand", "err"); break; }
      const p = resolve(arg[0]);
      if (VFS[p] === undefined) { tprint(`rm: cannot remove '${esc(arg[0])}': No such file or directory`, "err"); break; }
      if (Array.isArray(VFS[p]) && VFS[p].length && !flags.includes("-r")) { tprint(`rm: cannot remove '${esc(arg[0])}': Is a directory`, "err"); break; }
      delete VFS[p];
      const parent = p.slice(0, p.lastIndexOf("/")) || "/";
      if (Array.isArray(VFS[parent])) VFS[parent] = VFS[parent].filter(x => x !== p.slice(p.lastIndexOf("/")+1) && x !== p.slice(p.lastIndexOf("/")+1)+"/");
      tprint(`(removed ${esc(p)})`, "okc");
      break;
    }
    case "chmod": tprint(`(mode of '${esc(arg[1]||arg[0]||"file")}' updated)`, "okc"); break;
    case "echo": tprintEsc(args.filter(a=>a!==">").join(" ").replace(/["']/g,"")); break;
    case "history": histPrint(); break;
    case "sudo":
      if (args[0] === "whoami") { tprint("root", "okc"); }
      else if (args.length) { tprint(`[sudo] password for ${USER}: `); tprintEsc("(simulated — command output above)"); }
      else tprint("usage: sudo <command>", "err");
      break;
    case "ip": tprint("1: lo: <LOOPBACK,UP> mtu 65536\n   inet 127.0.0.1/8\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n   inet 10.0.2.15/24 brd 10.0.2.255 scope global eth0"); break;
    case "ping": {
      const h = arg[0] || "";
      if (!h) { tprint("ping: usage error", "err"); break; }
      tprint(`PING ${esc(h)} (${esc(h)}) 56(84) bytes of data.`);
      if (h === "10.0.2.2" || h === "localhost" || h === "127.0.0.1") {
        tprint("64 bytes from " + esc(h) + ": icmp_seq=1 ttl=64 time=0.31 ms");
        tprint("64 bytes from " + esc(h) + ": icmp_seq=2 ttl=64 time=0.27 ms");
        tprint("--- " + esc(h) + " ping statistics --- 2 transmitted, 2 received, 0% loss");
      } else tprint("ping: " + esc(h) + ": Name or service not known", "err");
      break;
    }
    case "nc": {
      if (flags.includes("-nv") || (arg[0] && arg[1])) {
        tprint(`Connection to ${esc(arg[0])} ${esc(arg[1])} port [tcp/*] succeeded!`);
        tprint("SSH-2.0-OpenSSH_9.6p1");
      } else { tprint("usage: nc -nv HOST PORT  |  nc -lvnp PORT", "err"); }
      break;
    }
    case "nmap": fakeNmap(args); break;
    case "john": tprint("Created directory: /root/.john\nLoaded 1 password hash (SHA512)\nSession completed. (use --show to list cracked)", "dimt"); break;
    case "hydra": tprint("[WARNING] lab-only target expected.\n[22][ssh] host: 10.0.2.15  login: kali  password: (simulated)", "dimt"); break;
    case "clear": $("#term").innerHTML = ""; break;
    default: tprint(`${esc(cmd)}: command not found — type 'help'`, "err");
  }
}

/* ---------- path resolution ---------- */
function resolve(p){
  if (!p) return CWD;
  let base = p.startsWith("/") ? [] : CWD.split("/").filter(Boolean);
  const parts = base.concat(p.split("/"));
  const out = [];
  for (const s of parts) {
    if (!s || s === ".") continue;
    if (s === "..") { out.pop(); continue; }
    if (s === "~") { out.length = 0; out.push("home","kali"); continue; }
    out.push(s);
  }
  return "/" + out.join("/");
}
const resolvePath = resolve; // alias

/* ---------- history ---------- */
const hist = [];
function histPush(c){ hist.push(c); }
function histPrint(){ tprintEsc(hist.slice(-20).map((c,i)=>`  ${i+1}  ${c}`).join("\n") || "(empty)"); }

/* ---------- input wiring ---------- */
let histCursor = null; // null = live input; number = index into hist
function wireTerminal(){
  const inp = $("#terminput"); if (!inp) return;
  inp.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      runCmd(inp.value);
      inp.value = "";
      histCursor = null;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      histCursor = histCursor === null ? hist.length - 1 : Math.max(0, histCursor - 1);
      inp.value = hist[histCursor];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histCursor === null) return;
      histCursor++;
      if (histCursor >= hist.length) { histCursor = null; inp.value = ""; }
      else inp.value = hist[histCursor];
    } else if (e.key === "Tab") {
      e.preventDefault();
      const val = inp.value;
      const parts = val.split(/\s+/);
      const last = parts[parts.length-1] || "";
      let pool, prefix;
      if (parts.length <= 1) {
        pool = ["pwd","ls","cd","cat","grep","find","mkdir","cp","mv","rm","touch","whoami","id","uname","history","clear","echo","wc","head","tail","chmod","sudo","ping","ip","nc","nmap","john","hydra","help","missions"];
        prefix = last;
      } else {
        // path completion against the VFS from the resolved parent dir
        const slash = last.lastIndexOf("/");
        const dirPart = slash >= 0 ? last.slice(0, slash+1) : "";
        const base = slash >= 0 ? last.slice(slash+1) : last;
        const dir = resolve(dirPart || ".");
        const entries = VFS[dir];
        if (!Array.isArray(entries)) return;
        pool = entries.filter(n => n.startsWith(base)).map(n => dirPart + n);
        prefix = dirPart + base;
      }
      const hits = [...new Set(pool.filter(p => p.startsWith(prefix)))];
      if (hits.length === 1) {
        parts[parts.length-1] = hits[0];
        inp.value = parts.join(" ");
      } else if (hits.length > 1) {
        tprint(hits.join("  "), "dimt");
        // extend to the longest common prefix
        let lcp = hits[0];
        for (const h of hits) { let i=0; while(i<lcp.length && lcp[i]===h[i]) i++; lcp = lcp.slice(0,i); }
        parts[parts.length-1] = lcp;
        inp.value = parts.join(" ");
      }
    }
  });
  tprint("CyberLab Terminal Trainer — simulated Kali. Type <b>help</b> for commands, <b>missions</b> for tasks.", "dimt");
  tprint(`You are <b>${USER}</b> on a simulated Kali box. Missions complete: ${doneMissions.length}/${MISSIONS.length}`, "dimt");
}
const initTerminal = wireTerminal; // alias
document.addEventListener("DOMContentLoaded", wireTerminal);
