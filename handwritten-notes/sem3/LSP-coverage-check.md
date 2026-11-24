# LSP Sem 3 — Coverage Check

**Subject:** Linux & Shell Programming (LSP), Semester 3
**Source:** Bhavesh189/CollageNotes, `notes-source/notes/sem3/linux-and-shell-programming/`
**Source files:** lsp-unit-1.pdf (40 pp), lsp-unit-2.pdf (37 pp), lsp-unit-3.pdf (32 pp),
lsp-unit-4.pdf (40 pp), lsp-unit-5.pdf (39 pp) — 188 pages, 45,669 words
**Notes:** `LSP-Sem3-Handwritten-Notes-Full.pdf` — **168 pages**, 54,835 words
(notes are longer than the source, as required by the Golden Rule)
**70 Questions:** 70 (14 per unit), 21 starred as repeated in 2+ of the 4 PYQ papers
**Solutions:** 4 papers x 22 questions = 88 questions solved
(LSP-2024 17 pp, LSP-2025 17 pp, LSP-2026 15 pp, LSP-May-2023 17 pp)

## Method

The source PDFs have a text layer (no OCR needed for the notes). Every heading
(size >= 14 pt bold) was listed from the source, and every one is ticked below
against a notes topic. Content was written as curated full-depth blocks
(definition box, explanation, why it matters, worked example with real
command output, table/diagram where it fits, Exam Tip, common mistake).
Every shell script and C program in the notes and solutions was actually run
(see "Verification" below) — no output was copied from the source unchecked.

## Unit 1 — Linux Operating System & Basic Commands (notes pp. 2-28)

| # | Source topic / heading | Notes topic | Covered |
|---|---|---|---|
| 1 | Linux operating system, what is an OS | What is Linux? What is an Operating System? | ✓ |
| 2 | Linux operating system history (1991, Linus Torvalds) | History and Evolution of Linux and Unix | ✓ |
| 3 | Architecture of Linux system (kernel, libs, shell, hardware) | Architecture of the Linux System (+ shell flow diagram) | ✓ |
| 4 | Kernel types (monolithic, micro, exo, hybrid) | Types of Kernel (+ comparison table) | ✓ |
| 5 | User mode vs Kernel mode | User Mode vs Kernel Mode | ✓ |
| 6 | Linux OS features (10 features) + disadvantages | Features of the Linux Operating System | ✓ |
| 7 | Linux applications, distributions, Ubuntu vs Linux | Linux Distributions — Ubuntu and Linux | ✓ |
| 8 | Shells: Bourne, C, Korn, POSIX, bash; CLI vs GUI | The Shell and its Types | ✓ |
| 9 | Linux terminal, case-sensitive commands | The Linux Terminal | ✓ |
| 10 | man (syntax, options, sections) | man — the Manual Command | ✓ |
| 11 | sudo command | sudo — the Superuser Command | ✓ |
| 12 | echo command (options, escapes, examples) | echo and printf Commands | ✓ |
| 13 | printf command (specifiers %s %d %f %b) | echo and printf Commands | ✓ |
| 14 | script command (typescript) | script and passwd Commands | ✓ |
| 15 | passwd command (options -l -u -d -e -S) | script and passwd Commands | ✓ |
| 16 | uname command | uname, who and date Commands | ✓ |
| 17 | who command | uname, who and date Commands | ✓ |
| 18 | date command (formats, -d, -u) | uname, who and date Commands | ✓ |
| 19 | stty command | stty Command | ✓ |
| 20 | pwd, cd, mkdir, rmdir, ls commands | Directory Commands: pwd, cd, mkdir, rmdir, ls | ✓ |
| 21 | cp, mv commands (+ rm) | cp, mv and rm Commands | ✓ |
| 22 | more, cat, head, tail, less, pg | more, less, cat, head and tail | ✓ |
| 23 | wc command | wc and od Commands | ✓ |
| 24 | od command | wc and od Commands | ✓ |
| 25 | tar command (archive, -c -x -t -z) | tar, du and df Commands | ✓ |
| 26 | du command | tar, du and df Commands | ✓ |
| 27 | df command | tar, du and df Commands | ✓ |
| 28 | find command (-name -type -size -mtime -exec) | find and ulimit Commands | ✓ |
| 29 | ulimit command | find and ulimit Commands | ✓ |
| 30 | ps, w, finger commands | ps, w and finger Commands | ✓ |
| 31 | arp command | Network Commands: arp, ftp, sftp and telnet | ✓ |
| 32 | ftp and sftp, ftp prompt/help | Network Commands: arp, ftp, sftp and telnet | ✓ |
| 33 | telnet command, commands in telnet, install | Network Commands: arp, ftp, sftp and telnet | ✓ |
| 34 | sort command | sort, nl and uniq Commands | ✓ |
| 35 | nl command | sort, nl and uniq Commands | ✓ |
| 36 | uniq command | sort, nl and uniq Commands | ✓ |
| 37 | egrep command | grep, egrep and fgrep Commands | ✓ |
| 38 | fgrep command | grep, egrep and fgrep Commands | ✓ |
| 39 | join command | join, tee, cut, paste and tr | ✓ |
| 40 | tee command | join, tee, cut, paste and tr | ✓ |
| 41 | paste command | join, tee, cut, paste and tr | ✓ |
| 42 | lp and lpr commands (printing) | lp and lpr — Printing Commands | ✓ |

## Unit 2 — Linux File System, System Calls & Users (notes pp. 29-46)

| # | Source topic / heading | Notes topic | Covered |
|---|---|---|---|
| 1 | Linux file system, what it is, why it is needed | Linux File System | ✓ |
| 2 | File system structure, VFS | Linux File System | ✓ |
| 3 | Directory structure, top-level directories table | File System Structure and Directory Structure (+ tree diagram, table) | ✓ |
| 4 | File system features | Linux File System | ✓ |
| 5 | Types of Linux file system (ext2/3/4, XFS, BTRFS, NFS, FAT) | Types of Linux File System | ✓ |
| 6 | inode (index node) | The inode (Index Node) | ✓ |
| 7 | Device drivers in Linux, disk and driver commands | Device Drivers in Linux | ✓ |
| 8 | The system call, how it works, types of system calls | The System Call (+ shell flow diagram, table) | ✓ |
| 9 | Different ways to create a file (touch, vi, vim, nano, gedit, printf, cat) | Different Ways to Create a File in Linux | ✓ |
| 10 | Open file in Linux, cat, lseek function | File Input and Output: open, read, write, close, lseek | ✓ |
| 11 | Linux file links, hard vs soft, advantages/disadvantages | File Links — Hard Links and Soft Links (+ table) | ✓ |
| 12 | stat command, stat/fstat/lstat differences | stat, fstat and lstat (+ table) | ✓ |
| 13 | chmod command (symbolic + octal, mode) | chmod — Changing File Permissions (+ octal table) | ✓ |
| 14 | chown command (+ examples) | chown, chgrp and umask | ✓ |
| 15 | opendir — open a directory (readdir, closedir, mkdir, rmdir) | Opening a Directory: opendir, readdir, closedir | ✓ |
| 16 | Environment & PATH setting, shell config files | Environment and Path Setting | ✓ |
| 17 | Linux passwd/groups, password & shadow file formats | Linux Password and Shadow File Formats | ✓ |
| 18 | Ways to add a user to a group, add/change group, change password, modify user, user ID, default shell/group | Adding and Managing Users and Groups | ✓ |

## Unit 3 — Shell, Redirection, Pipes, Filters & Processes (notes pp. 47-58)

| # | Source topic / heading | Notes topic | Covered |
|---|---|---|---|
| 1 | Introduction to Linux shell and shell scripting | Introduction to the Linux Shell and Shell Scripting | ✓ |
| 2 | Command-line shell, GUI shell | Introduction to the Linux Shell and Shell Scripting | ✓ |
| 3 | Linux directory commands, file commands (recap) | Shell Scripting — Writing and Running a Script | ✓ |
| 4 | Input/output redirection, types of redirection (>, >>, <, <<, 2>, 2>&1) | Input and Output Redirection in Linux (+ table) | ✓ |
| 5 | Piping in Unix/Linux | Piping in Unix or Linux (+ pipeline diagram) | ✓ |
| 6 | Filters in Linux (cat, head, tail, sort, uniq, wc, grep, tac, sed, nl) | Filters in Linux (+ table) | ✓ |
| 7 | Special characters (# ; ;; . * ? [ ] $ ` \ " ' \| & < > ( ) { }) | Special Characters and Wildcards (+ table) | ✓ |
| 8 | The directory stack, pushd command (advantage over cd) | The Directory Stack — pushd, popd and dirs | ✓ |
| 9 | Unix/Linux processes management, five-digit PID | Unix / Linux — Processes Management | ✓ |
| 10 | Starting a process, foreground/background processes | Unix / Linux — Processes Management | ✓ |
| 11 | Listing running processes, stopping processes (ps, kill) | Process Management Commands | ✓ |
| 12 | Parent and child processes, initialising a process (init, PID 1) | Unix / Linux — Processes Management | ✓ |
| 13 | Types of processes (foreground, background, daemon, zombie, orphan) | Unix / Linux — Processes Management (+ states diagram) | ✓ |

## Unit 4 — Shell Programming (notes pp. 59-83)

| # | Source topic / heading | Notes topic | Covered |
|---|---|---|---|
| 1 | Steps to write and execute a script, shell programming | Shell Scripting — Writing and Running a Script (Unit 3) + Variables in Linux | ✓ |
| 2 | Shell script to demonstrate special parameters ($0 $# $@ $* $? $$ $!) | Special Parameters in Shell Scripting (+ table) | ✓ |
| 3 | Shell script parameters, command-line arguments, read | Special Parameters / The read and exit Commands | ✓ |
| 4 | Variables in Linux, system variable, user-defined variable | Variables in Linux (+ table) | ✓ |
| 5 | Shell keywords | Variables in Linux (naming rules) | ✓ |
| 6 | Linux exit command | The read and exit Commands | ✓ |
| 7 | Local variable, global variables, env command, scope | Local and Global Variables | ✓ |
| 8 | Arithmetic operators (expr, $(( )), let) | Arithmetic Operators (+ table) | ✓ |
| 9 | Relational operators (-eq -ne -gt -lt -ge -le) | Relational and Boolean Operators (+ table) | ✓ |
| 10 | Boolean operators (! -o -a) | Relational and Boolean Operators | ✓ |
| 11 | String operators (= != -z -n) | String Operators and File Test Operators (+ table) | ✓ |
| 12 | File test operators (-b -c -d -f -g -k -p -t -u -r -w -x -s -e) | String Operators and File Test Operators (+ table) | ✓ |
| 13 | Conditional statements: if, if-else, elif ladder, nested if, switch/case | Conditional Statements / The case Statement | ✓ |
| 14 | set command, set command options (-x -e -u -v) | The set, unset and shift Commands (+ table) | ✓ |
| 15 | Shift command | The set, unset and shift Commands | ✓ |
| 16 | Alias in Linux, alias syntax, create/remove aliases, temporary vs permanent | Alias in Linux | ✓ |
| 17 | Shell script: odd and even numbers, first n natural numbers | Pattern Programs (Unit 5) + for/while loops | ✓ |
| 18 | for loop with break statement | The for Loop | ✓ |
| 19 | Variable names, defining variables, accessing values, read-only variables, unsetting variables | Variables in Linux | ✓ |
| 20 | Shell functions, creating functions, pass parameters | Shell Functions | ✓ |
| 21 | break command in a loop, continue | The for Loop / The while Loop and the until Loop | ✓ |
| 22 | Arrays in shell scripting, declare array, array iteration | Arrays in Shell Scripting | ✓ |

## Unit 5 — Compiling, Packages, Version Control & awk (notes pp. 84-99)

| # | Source topic / heading | Notes topic | Covered |
|---|---|---|---|
| 1 | Compiling & linking C, C++ programs (cc, gcc, g++) | Compiling and Linking C and C++ Programs | ✓ |
| 2 | GDB step-by-step introduction (break, run, print, next, continue) | GDB — the GNU Debugger (+ table) | ✓ |
| 3 | Installing, updating and deleting software packages (dpkg, APT, DNF) | Installing, Updating and Deleting Software Packages (+ table) | ✓ |
| 4 | apt-get update, installing APT, apt-get command and options | The apt-get Command in Linux (+ table) | ✓ |
| 5 | Method for finding installed software, primary methods for uninstalling | Installing, Updating and Deleting Software Packages | ✓ |
| 6 | Practice of programs: swap, multiply, $# demo, compare two numbers | Shell Script Programs — Swap, Multiply, Compare, $# | ✓ |
| 7 | Shell scripting for loop, while loop, until loop, difference while vs until | The for Loop / The while Loop and the until Loop (Unit 4) | ✓ |
| 8 | cvs command, syntax, essential CVS commands | CVS and RCS — Version Control (+ table) | ✓ |
| 9 | RCS | CVS and RCS — Version Control | ✓ |
| 10 | Programs for printing different patterns (star triangle, hollow square) | Pattern Programs — Stars, Hollow Square, Odd and Even | ✓ |
| 11 | AWK command, sample commands, record/field buffers | The awk Command (+ awk view diagram) | ✓ |
| 12 | Text processing commands (head, tail, sort, grep, sed, cut, paste, comm, cmp, diff, cpio) | Text Processing Commands in Linux (+ table) | ✓ |

## Diagrams in the notes

- User -> Shell -> Kernel -> Hardware flow (Units 1 and 2)
- Linux directory tree / (Unit 2, and again in 70Q Q.15)
- Process states: Created -> Ready -> Running -> Waiting -> Terminated, with zombie note (Unit 3)
- Pipeline: ls -l | grep txt | wc -l (Unit 3)
- awk view: input file -> record buffer -> field buffers -> output (Unit 5)

## 70 Most Important Questions (notes pp. 100-168)

70 questions, 14 per unit. Marks: 32 x 10 marks, 31 x 5 marks, 7 x 2 marks.
Starred (repeated in 2 or more of the 4 PYQ papers): 21 questions.
2-mark answers are 4-6 lines; 5-mark answers about half a page; 10-mark answers
1-2 pages with definition box, full explanation, example, table/diagram and tip.

## PYQ solutions (88 questions, all solved)

| Paper | Questions | Pages | Notes |
|---|---|---|---|
| LSP-2024 | 22 (A 10x2, B 7x4, C 5x10) | 17 | All solved. Q.8 Part A printed "Who mathematical expressions..." — read as "How..." (flagged in the PDF). |
| LSP-2025 | 22 (A 10x2, B 7x4, C 5x10) | 17 | All solved. |
| LSP-2026 | 22 (A 10x2, B 7x4, C 5x10) | 15 | All solved. Part C has two-part (a)/(b) questions; both parts solved. |
| LSP-May-2023 | 22 (A 10x2, B 7x4, C 5x10) | 17 | All solved. Part B Q.2 wording is faint in the scan ("file manipulation commands") — flagged in the PDF. |

PYQ-only topics (not in the source notes, solved only in the solution PDFs):
vi editor full command set, mail/write/wall/mesg commands, distributed file
systems, file descriptor details, file system blocks (boot block, superblock,
inode list, data blocks). No paper or question was left incomplete.

## Verification done

- **Scripts run:** swap, multiply (10x5=50), compare (10=10), star triangle,
  hollow square, odd/even (7 odd), first 5 natural numbers, add (10+20=30),
  local/global variables, functions (add 10+20=30, multiply 6x7=42),
  arrays (total 433, average 86; sort 1 2 5 8 9; search 8 at index 2),
  2's table, while 1-5, until 5-15, calculator (10*5=50), $# demo (5 args),
  shift loop (a b c), grade (85 = Grade B), backup script — every claimed
  output in the notes matches the real output.
- **C programs compiled and run:** lseek demo (first read "Hello Linu",
  file size 18 bytes), statvfs file-system statistics, dir listing
  (opendir/readdir), hello.c with gcc. The statvfs sample numbers are labelled
  as from a 50 GB ext4 disk (values depend on the disk).
- **Source errors corrected (not copied):** the source's swap program output
  is wrong in the source (it prints "Num1: num2"); the notes give the correct
  output (Num1: 20, Num2: 10), verified by running it. The source says an
  until loop "always executes at least once" — wrong; the notes correct it
  (until checks first, like while, and can run zero times). The source's
  "Are Ubuntu and Linux Differ?" paragraph wrongly says Windows is open
  source; the notes give the correct Ubuntu-vs-Linux distinction.
- **Weekday check:** all example dates use Tue 24 Nov 2026 (verified with
  `date -d 2026-11-24`), and Thu 1 Jan 2026.
- **Garble scan:** extracted text from all 5 PDFs and scanned for joined
  words (tokens >= 14 letters with no spaces), split words and missing
  spaces after full stops. Only legitimate long words remain
  (alphabetically, multiplication, functionalities). No garbled pages.
- **Visual inspection:** sample pages read from every unit (pp. 2, 5, 35, 40,
  52, 70, 95, 100, 110, 130, 150, 160, 166-168) and from every solution PDF
  (2024 pp. 1, 5, 10, 16; 2025 pp. 1, 8, 16-17; 2026 pp. 1, 7, 14;
  May-2023 pp. 1, 9, 16-17). All legible, style correct (Patrick Hand, blue
  ink, black underlined headings, red definition boxes and key terms, unlined
  white A4, ~1.5 cm balanced margins, unit name top, page number bottom).
- **Bugs found and fixed during QA:**
  1. The DBMS sanitiser stripped a leading "-" and collapsed "--", so table
     cells showed "e file" instead of "-e file" and "set -- a b c" became
     "set - a b c". Fixed in the LSP sanitiser and rebuilt; verified "-eq",
     "-e", "-z" and "set --" now render correctly.
  2. Large tables were KeepTogether and jumped to the next page, leaving
     half a page blank (notes p. 52). Tables now split across pages with
     the header row repeated; notes went from 170 to 166-168 pages.
  3. A 4-mark solution tip said "learn the table above" but the table was
     omitted from 4-mark answers; tables are now included in 4-mark answers.

## Coverage result

**78 / 78 notes topics covered. 0 topics missing. 0 thin topics.**
Source headings: 175 headings listed (including repeated "Syntax"/"Options"
sub-headings); every distinct source topic is covered above.
