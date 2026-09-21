# 🐧 Linux Commands Cheat Sheet — the ones you'll actually use

Every command below shows: what it does → how you'd realistically use it.
Type them exactly as shown; `$` is the prompt, don't type it.

## 1. Finding your way around
```bash
pwd                  # "where am I?" — prints the current folder path
ls                   # list files here
ls -lah              # list ALL files, human-readable sizes  ← your new default
cd ~/CyberLab        # go to your lab folder
cd ..                # up one level
cd -                 # jump back to the previous folder you were in
```

## 2. Looking inside things
```bash
cat notes.txt              # print a whole small file
less bigfile.log           # scroll through a big file (q to quit, /word to search)
head -20 file.txt          # first 20 lines
tail -20 file.txt          # last 20 lines
tail -f /var/log/syslog    # follow a log live — Ctrl+C to stop
file mystery.dat           # what TYPE of file is this really? (first tool for unknown files)
```

## 3. Finding files & text
```bash
find / -name "*.pcap" 2>/dev/null        # find files by name anywhere (errors hidden)
grep -i "password" notes.txt             # search inside a file, ignore case
grep -rn "flag{" ~/ctf/                  # search a whole folder, show line numbers
```

## 4. Creating & organizing
```bash
mkdir -p recon/target1           # make nested folders in one go
cp file.txt backup/              # copy
mv file.txt newname.txt          # move OR rename
rm file.txt                      # delete a file (no recycle bin!)
rm -r oldfolder                  # delete a folder — double-check before Enter
touch notes.md                   # create an empty file
```

## 5. Reading help like a pro
```bash
man nmap                # the full manual for any command (q to quit)
nmap --help             # shorter quick-help for most tools
whatis netcat           # one-line description
```
When a tool's flags confuse you: `man <tool>`, then `/` + keyword to search the page.

## 6. Permissions (you WILL hit this)
```bash
ls -l                   # shows rwxr-xr-x style strings
chmod +x script.sh      # make a script executable — you'll need this constantly
sudo command            # run one command as administrator
```
`sudo` asks for YOUR password, prints nothing while typing — that's normal.

## 7. Text processing (superpower tier — start with just these)
```bash
echo "hello" > f.txt        # write to file (overwrites)
echo "more" >> f.txt        # append to file
wc -l file.txt              # count lines
sort names.txt | uniq       # sort, then drop duplicates
cut -d: -f1 /etc/passwd     # split lines by ":" show field 1 (usernames)
```

## 8. Networking basics
```bash
ip a                        # your own IP addresses
ping -c 4 tryhackme.com     # is it reachable? (Ctrl+C stops it)
```
(Nmap, netcat and friends live in the roadmap — one step at a time.)

## 9. Quality-of-life
```bash
clear                        # clean screen (Ctrl+L does the same)
history                      # everything you typed — gold when you forget a command
!!                           # re-run the last command (classic: sudo !!)
Tab                          # autocomplete filenames — USE IT, it prevents typos
Ctrl+C                       # stop a running command
Ctrl+R                       # search your history as you type
```

## Muscle-memory drill (do this in your Kali VM on day 1)
```bash
pwd; ls -lah; cd /tmp; touch drill.txt; echo "day 1" > drill.txt; cat drill.txt;
cp drill.txt drill2.txt; mv drill2.txt ../drill2.txt; cd ..; ls -lah; history
```
If you can predict what each step prints before pressing Enter — you're ready for
Linux Fundamentals 1.
