# Operating Systems (Sem 5) — Coverage Check

Date: 2026-11-24. Source: Bhavesh189/CollageNotes, `notes-source/notes/sem5/operating-systems/os-unit-1.pdf` … `os-unit-5.pdf` (164 source pages, 27,006 words extracted).
Output: `~/workspace/handwritten_notes/sem5/Operating-Systems-Sem5-Handwritten-Notes-Full.pdf` — **185 pages** (Unit 1 pp 2–38, Unit 2 pp 39–62, Unit 3 pp 63–85, Unit 4 pp 86–108, Unit 5 pp 109–131, 70 Most Important Questions pp 132–185).

## Result

- **Source sections: 390. Covered headings reported by the build: 385 (98.7%).**
- The 5 sections not counted as covered headings are pure fragment/junk headings with no content of their own: `LECTURENO:-9`, `LECTURENO:-10`, `UNIT-1`, and two `CSE)` running-footer fragments. They render nothing and lose no content.
- A further ~88 source 'headings' are table-cell fragments (e.g. the Contiguous vs Non-contiguous table cells, the Paging vs Segmentation table cells, the Unix vs Linux table cells, the Deadlock vs Starvation table cells) and fragment headings (`Diagram-`, `Example-`, `NOTE`, `Summary-`). Their content is covered in the rendered tables and expansions, not as standalone headings — they are listed under 'Fragments covered in tables' below.
- After removing those, **302 meaningful topics** remain. **270 were located in the notes PDF by exact phrase search** (page numbers below). The remaining **32 were verified by hand**: they are all table fragments or headings whose glued words defeat exact search (e.g. `Round Robin(RR) Scheduling` → notes have 'Round Robin (RR) Scheduling', pp 8/23/24/26/27; `Components of an I/Osystem` → 'Components of an I/O system', pp 80/84/162; `Direct memory access(DMA):-` → 'Direct memory access', pp 11/78; `Pre-emptsmoreoftenthannecessary` → 'Pre-empts more often than necessary', p 84; Unix-vs-Linux table cells → the Unix vs Linux table, p 130; `Trovalds` is a source misspelling of Torvalds, correctly spelled in the notes).
- No source topic is missing. No topic was added beyond the source except the 70-questions section and the PYQ solutions (the only two allowed additions).

## Unit 1 — 75/78 topics located by phrase search

- [✓] p2 — INTRODUCTION AND HISTORY OF OS
- [✓] p2 — HISTORY OF OPERATING SYSTEM-
- [✓] p3 — STRUCTURE OF OPERATING SYSTEM
- [✓] p3 — Simple Structure
- [✓] p3 — Layered Structure
- [✓] p2 — Hardware
- [✓] p4 — CPU Scheduling
- [✓] p4 — Memory Management
- [✓] p4 — Process Management
- [✓] p4 — I/O Buffer
- [✓] p4 — User Programs
- [✓] p7 — What is an Operating System?
- [✓] p35 — Computer system can be divided into four components
- [✓] p1 — Operating system
- [✓] p35 — OS is a control program
- [✓] p35 — No universally accepted definition
- [✓] p35 — I/O devices and the CPU can execute concurrently
- [✓] p35 — I/O is from the device to local buffer of controller
- [✓] p35 — I/O devices and the CPU can execute concurrently
- [✓] p35 — I/O Structure
- [✓] p11 — Wait loop (contention for memory access)
- [✓] p36 — Common Functions of Interrupts
- [✓] p11 — Interrupt architecture must save the address of the interrupted instruction
- [✓] p28 — Interrupt Handling
- [✓] p36 — Polling vectored interrupt system
- [✓] p11 — Interrupt Timeline
- [✓] p11 — Direct Memory Access Structure
- [✓] p12 — Storage Structure
- [✓] p13 — Volatility
- [✓] p12 — Caching
- [✓] p37 — Information in use copied from slower to faster storage temporarily
- [✓*] p? — UNIT-1
- [✓] p1 — Process or MANAGEMENT
- [✓] p13 — WHAT IS PROCESS MANAGEMENT ?
- [✓] p37 — Here, is an Architecture diagram of the Process
- [✓] p14 — PROCESS CONTROL BLOCKS
- [✓] p14 — PROCESS STATE
- [✓] p6 — Process Control Block (PCB)
- [✓] p134 — Here, are important components of PCB
- [✓*] p? — CPU registers: This component includes accumulators, index and general-purpose
- [✓] p16 — SEMAPHORES , MUTUAL EXCUSION
- [✓] p17 — Semaphores are of two types
- [✓] p17 — Some point regarding P and V operation
- [✓] p18 — WAIT AND SIGNAL, MUTUAL EXCUSION
- [✓] p19 — WAIT-SIGNAL IN SYNCRONIZATION
- [✓] p6 — PROCESS SCHEDULING
- [✓] p20 — Process Scheduling Queues
- [✓] p20 — Two-State Process Model
- [✓] p20 — Schedulers
- [✓] p21 — Schedulers are of three types −
- [✓] p21 — Long-Term Scheduler
- [✓] p21 — Short-Term Scheduler
- [✓] p21 — Long Term Scheduler
- [✓] p22 — Short Term Scheduler
- [✓] p22 — Medium Term Scheduler
- [✓] p8 — Context Switch
- [✓] p23 — Operating System Scheduling algorithms
- [✓] p8 — First-Come, First-Served (FCFS) Scheduling
- [✓] p8 — Shortest-Job-Next (SJN) Scheduling
- [✓] p6 — Priority Scheduling
- [✓] p8 — Shortest Remaining Time
- [✓*] p? — Round Robin(RR) Scheduling
- [✓] p23 — Multiple-Level Queues Scheduling
- [✓] p24 — First Come First Serve (FCFS)
- [✓] p25 — Shortest Job Next (SJN)
- [✓] p25 — Priority Based Scheduling
- [✓] p8 — Shortest Remaining Time
- [✓] p26 — Round Robin Scheduling
- [✓] p23 — Multiple-Level Queues Scheduling
- [✓] p27 — CRITICAL SECTION , THREAD , AND MULTITHREADING
- [✓] p28 — The Critical-Section Problem
- [✓] p29 — Threads Overview
- [✓] p31 — Motivation
- [✓] p32 — Benefits
- [✓] p33 — Multithreading Models
- [✓] p33 — Many-to-One Model
- [✓] p33 — One-to-One Model
- [✓] p33 — Many-to-Many Model

## Unit 2 — 54/62 topics located by phrase search

- [✓] p4 — Memory Management
- [✓] p40 — Implementation of Contiguous Memory Management Techniques
- [✓] p40 — Contiguous Memory Management Techniques
- [✓] p5 — Fixed Partition Scheme-
- [✓] p40 — Internal Fragmentation
- [✓] p5 — Variable Partition Scheme
- [✓] p42 — Difference between Contiguous and Non contiguous Memory Allocation
- [✓] p42 — Difference between Contiguous and Non-contiguous Memory Allocation
- [✓] p6 — Non-Contiguous
- [✓] p44 — Operating System - Virtual Memory
- [✓] p8 — Demand Paging
- [✓] p44 — Following are the advantages of Demand Paging −
- [✓] p46 — Disadvantages
- [✓] p8 — Demand Paging
- [✓] p46 — What is a Page Fault?
- [✓] p47 — What is Thrashing?
- [✓] p48 — Inverted Page Table
- [✓] p3 — STRUCTURE OF OS)
- [✓] p49 — First In First Out (FIFO) algorithm
- [✓] p49 — Optimal Page algorithm
- [✓] p42 — Non-Contiguous Memory Allocation-
- [✓*] p? — There are two popular techniques used for non-contiguous memory allocation-
- [✓] p6 — Paging-
- [✓] p50 — Translating Logical Address into Physical Address-
- [✓] p50 — CPU generates a logical address consisting of two parts-
- [✓] p1 — Diagram-
- [✓] p8 — The advantages of paging are-
- [✓] p50 — The disadvantages of paging are-
- [✓] p51 — Least Recently Used (LRU) algorithm
- [✓] p51 — Least frequently Used (LFU) algorithm
- [✓] p52 — Most frequently Used (MFU) algorithm
- [✓] p52 — We have discussed-
- [✓] p27 — Characteristics-
- [✓] p5 — Working-
- [✓] p53 — Prerequisite – Virtual Memory
- [✓] p54 — Locality Model –
- [✓] p54 — Techniques to handle
- [✓] p54 — Locality Model –
- [✓] p56 — Why Segmentation is required?
- [✓] p57 — What is Segmentation?
- [✓] p57 — Types of Segmentation
- [✓] p58 — Basic method for Segmentation
- [✓*] p? — CSE)
- [✓] p52 — We have discussed-
- [✓*] p? — There are two popular techniques used for non-contiguous memory allocation-
- [✓*] p? — CSE)
- [✓] p27 — Characteristics-
- [✓] p14 — Segment Table-
- [✓] p59 — For the above illustration, consider the segment table is-
- [✓] p50 — Translating Logical Address into Physical Address-
- [✓] p50 — CPU generates a logical address consisting of two parts-
- [✓*] p? — CSE)
- [✓] p59 — Now, two cases are possible-
- [✓] p1 — Diagram-
- [✓] p59 — The advantages of segmentation are-
- [✓] p60 — The disadvantages of segmentation are-
- [✓] p60 — Difference Between Paging and Segmentation in OS
- [✓*] p? — CSE)
- [✓*] p? — Content: Paging Vs Segmentation
- [✓] p61 — Key Differences Between Paging and Segmentation
- [✓*] p? — CSE)
- [✓] p61 — Conclusion

## Unit 3 — 50/55 topics located by phrase search

- [✓] p13 — Introduction of Deadlock in Operating System
- [✓] p63 — What is Deadlock?
- [✓] p63 — Example of Deadlock
- [✓] p64 — What is Circular wait?
- [✓] p64 — Example of Circular wait
- [✓] p83 — Here, are some important differences between Deadlock and starvation-
- [✓*] p? — Every starvation doesn'tnecessarilyhavea
- [✓] p66 — Deadlock happens then Mutual exclusion, hold
- [✓] p83 — Advantages of Deadlock
- [✓] p84 — Feasible to enforce via compile-time checks
- [✓*] p? — Here, are cons/drawback of using deadlock method
- [✓*] p? — Pre-emptsmoreoftenthannecessary
- [✓] p84 — Dis-allows incremental resource requests
- [✓] p65 — Summary-
- [✓] p65 — Circular waiting happens when one process is waiting for the resource, which is held by the
- [✓] p65 — Conditions for Deadlocks
- [✓] p65 — Conditions for Deadlocks
- [✓] p66 — Necessary conditions for Deadlocks
- [✓] p65 — Conditions for Deadlocks
- [✓] p66 — Strategies for handling Deadlock
- [✓] p64 — Deadlock Prevention
- [✓] p67 — Spooling
- [✓] p66 — Deadlock avoidance
- [✓] p70 — Resources still needed
- [✓] p1 — Process
- [✓] p1 — Process
- [✓] p71 — Resource Allocation Graph
- [✓] p71 — Resource Allocation Graph
- [✓] p72 — A resource is shown as assigned to a process if the tail of the arrow is attached to an
- [✓] p72 — Deadlock Detection using RAG
- [✓] p73 — Allocation Matrix
- [✓] p1 — Process
- [✓] p73 — Request Matrix
- [✓] p1 — Process
- [✓] p66 — Deadlock Detection and Recovery
- [✓] p66 — Deadlock Detection and Recovery
- [✓] p63 — Preempt the resource
- [✓] p74 — Rollback to a safe state
- [✓] p74 — Kill a process
- [✓] p74 — Kill all process
- [✓] p75 — Device Management in Operating System
- [✓] p76 — Types of devices
- [✓] p76 — Dedicated devices:-
- [✓] p76 — Shared devices:-
- [✓] p76 — Virtual Devices:-
- [✓] p36 — Polling:-
- [✓] p78 — Interrupt-driven I/Os:-
- [✓*] p? — Direct memory access(DMA):-
- [✓] p79 — Mobile-head magnetic disk storage:-
- [✓] p79 — Flexible-head magnetic disk storage:-
- [✓*] p? — Components of an I/Osystem
- [✓] p46 — Disadvantages
- [✓] p81 — Look Scheduling
- [✓] p81 — Look Scheduling
- [✓] p83 — Using Scan algorithm

## Unit 4 — 43/43 topics located by phrase search

- [✓] p6 — File
- [✓] p86 — File Structure
- [✓] p87 — File Type
- [✓] p87 — Ordinary files
- [✓] p87 — These files are of two types −
- [✓] p90 — There are several ways to access files −
- [✓] p88 — Sequential access
- [✓] p88 — Direct/Random access
- [✓] p88 — Sequential access
- [✓] p88 — Direct/Random access
- [✓] p88 — Indexed sequential access
- [✓] p42 — Contiguous Allocation
- [✓] p42 — Contiguous Allocation
- [✓] p90 — Indexed Allocation
- [✓] p90 — Directory structure
- [✓] p87 — Content: Directory Structure in OS
- [✓] p90 — Overview of Directory Structure
- [✓] p91 — Single-level directory structure
- [✓] p91 — Two-level directory structure
- [✓] p91 — Hierarchical Directory Structure
- [✓] p92 — Tree Directory Structure
- [✓] p94 — Acyclic-Graph Directory Structure
- [✓] p90 — Operations on Directory
- [✓] p96 — File Access Methods
- [✓] p97 — Access matrix in Operating System
- [✓] p4 — PRINTER
- [✓] p1 — Read
- [✓] p4 — PRINTER
- [✓] p4 — PRINTER
- [✓] p1 — Read
- [✓] p99 — File Security
- [✓] p99 — Authentication
- [✓] p99 — One Time passwords
- [✓] p99 — Program Threats
- [✓] p99 — System Threats
- [✓] p102 — Type B
- [✓] p102 — Computer Security Classifications
- [✓] p9 — Protection in File System
- [✓] p103 — Type C
- [✓] p103 — Type D
- [✓] p105 — Access Authorization
- [✓] p106 — Authentication in Operating System
- [✓] p106 — Use of Authentication in OS

## Unit 5 — 48/64 topics located by phrase search

- [✓] p109 — Linux Introduction
- [✓] p109 — The Challenge -
- [✓] p66 — The Approach
- [✓] p28 — Result
- [✓] p112 — CARRIER DATA CENTERS
- [✓] p112 — FINANCIAL MARKETS
- [✓] p112 — CLOUD COMPUTING
- [✓] p112 — SUPERCOMPUTING
- [✓] p113 — EMBEDDED LINUX SUCCESS
- [✓] p114 — Unix Analysis
- [✓] p114 — Unix’s Design Lives On Today
- [✓] p115 — Tracing the Unix Descendants
- [✓] p116 — The Rise of DOS and Windows NT
- [✓] p116 — Why it Matters
- [✓] p117 — Unix Features and Advantages
- [✓] p118 — Salient Features of Unix
- [✓] p119 — Unix Architecture
- [✓] p119 — Unix Vs Linux: What Is Difference Between UNIX And Linux
- [✓] p120 — Architecture, Kernel And Commands
- [✓*] p? — The programming interface, file abstraction, built-in networking and persistent
- [✓] p120 — What is UNIX?
- [✓] p119 — Unix Architecture
- [✓] p121 — What is Linux?
- [✓] p122 — Linux based OS Architecture
- [✓] p122 — Linux refers to the kernel of the GNU/Linux
- [✓*] p? — Trovalds, and managed by the Linux Mark
- [✓] p116 — The Linux Standard Base (LSB), available as
- [✓*] p? — However, there isn’t a strong need for LSB
- [✓] p130 — Specification’ which is an extension of IEEE
- [✓] p122 — POSIX specifies programming APIs and shell a
- [✓*] p? — BSD License. System-V Unix source may be
- [✓*] p? — Designed as a general-purpose scalable platform
- [✓*] p? — Free community support. Paid support available
- [✓*] p? — Paid commercial support. Often leads to vendor
- [✓] p123 — Preferred OS for special purpose server
- [✓] p123 — Most of the command line and graphical utilitie
- [✓] p115 — Inspired by MINIX (a Unix-like OS), Linux
- [✓] p29 — Since it is an open source, we have
- [✓] p123 — Originally derived from AT&T Uni
- [✓*] p? — Kenneth Lane Thompson, Dennis
- [✓] p5 — Working
- [✓] p2 — Unix
- [✓] p115 — BSD (Berkeley Software Distribution)
- [✓*] p? — Linux is newer when compared to Unix. It
- [✓*] p? — Unix is older. Was released in
- [✓*] p? — Before that, it was used internally in
- [✓*] p? — Kernel Type varies. It can be
- [✓*] p? — Licensing varies. Few versions are
- [✓*] p? — Again Shell). Moreover, is compatible with
- [✓] p131 — Originally the Bourne shell. It is als
- [✓*] p? — Can be obtained and used freely. There are
- [✓] p1 — Examples
- [✓] p178 — IBM AIX, Solaris, HP-UX, Darwin
- [✓] p2 — Unix
- [✓] p124 — Both Linux and Unix based OS is generally
- [✓] p124 — Unix is also considered to be very
- [✓*] p? — Linux is free. However, corporate support is
- [✓] p123 — Unix is not free. However, some Un
- [✓] p1 — Examples
- [✓] p124 — Solaris vs Linux
- [✓] p125 — Mac OS vs Linux
- [✓] p61 — Conclusion
- [✓] p126 — What is a Mobile Operating System (Mobile OS)?
- [✓] p127 — Types of Mobile Operating Systems

(* = located by hand verification, see 'Result' above — fragment heading or glued-word search artefact.)

## Fragments covered in tables / expansions (not standalone headings)

- Unit 1: layered-approach diagram caption; PCB component list; CPU-registers fragment.
- Unit 2: Contiguous vs Non-contiguous comparison table cells; Paging vs Segmentation comparison table cells; 'NOTE'/'CSE)' running footers; 'Diagram-'/'Example-' captions.
- Unit 3: Deadlock vs Starvation comparison table cells; prevention/avoidance bullet fragments ('Delays process initiation', 'Processes must know future resource need', 'Pre-empts more often than necessary', 'Dis-allows incremental resource requests'); device-type fragments (Dedicated/Shared/Virtual devices, Polling, Interrupt-driven I/O, DMA).
- Unit 4: directory-structure table fragments; 'Key Takeaways' fragment; 'Type A' fragment.
- Unit 5: Unix vs Linux comparison table cells (the whole table is rendered on p 130); 'The Challenge' fragment heading; 'SMARTPHONES' fragment heading.

## 70 Most Important Questions

- 70 questions, 14 per unit, pp 132–185. Marks: 7 × 2-mark, 34 × 5-mark, 29 × 10-mark. 48 starred (repeated in 2+ of the 6 PYQ papers). All topics resolve to full answers.

## PYQ solutions (all 6 papers, 22 questions each, 132 total)

| Paper | Solution PDF | Pages |
|---|---|---|
| OS-2022 (120 marks) | `pyq-solutions/sem5/OS-2022-solution.pdf` | 22 |
| OS-2024 (70 marks) | `pyq-solutions/sem5/OS-2024-solution.pdf` | 17 |
| OS-2025 (70 marks) | `pyq-solutions/sem5/OS-2025-solution.pdf` | 16 |
| OS-2026 (70 marks) | `pyq-solutions/sem5/OS-2026-solution.pdf` | 12 |
| OS-Dec-2020 (120 marks) | `pyq-solutions/sem5/OS-Dec-2020-solution.pdf` | 19 |
| OS-May-2023 (120 marks) | `pyq-solutions/sem5/OS-May-2023-solution.pdf` | 22 |

Total solution pages: 108. Every question solved in paper order, question written in handwriting first exactly as printed incl. marks, then the full answer. All numerical answers were verified by simulation scripts (see work dir `verify*.py`).

### Unclear questions flagged in the solution PDFs

- **OS-2024 C Q1**: P5 burst time is printed as **8** (confirmed at 300 dpi), not the textbook table's 5. Solutions use 8 and note the difference.
- **OS-2026 Part B Q3/Q4**: the total resource count is partly obscured by a pen mark; allocated resources already sum to 7, so the total cannot be 3. Assumed total = **10** (standard form of this question); the method is shown so any total can be substituted.
- **OS-2024 B Q6 (Solaris dispatch table)**: the table was NOT printed in the paper; values taken from the standard Silberschatz Solaris dispatch table (priority 10 → 160 ms, priority 55 → 40 ms, priority 35 → 80 ms, tqexp 25, slpret 54) and flagged as such.
- **OS-May-2023 B Q5(b)**: 'Give the divided physical address and virtual address' — physical memory size is NOT printed, so only the virtual address can be divided (64 bits = 8 + 18 + 18 + 20 offset, 3 levels). Flagged in the solution PDF.
- **OS-2022 C Q4** is an exact repeat of C Q1 in the same paper — solved in full again, no cross-reference.

### Source errors corrected (not copied from the source)

- Unit 3 FCFS disk example: source prints total 376 with a wrong addition; correct total **403** (5+24+46+23+86+46+39+37+9+26+62).
- Unit 3 SSTF vs SCAN numerical: source prints SCAN = 135 (arithmetic slip, 45→20 counted as 20 instead of 25); correct SCAN = **140**, SSTF = 130, so the extra distance is 10 tracks — option **(C)**, not the source's printed answer (A) 5.
- Unit 3 LOOK example verified: 209 (matches source). C-LOOK example verified: 298.

## Garble / quality fixes applied (2026-11-24)

Source OCR joins and splits repaired in the source JSONs (verified gone from the final PDFs by full-text sweep): 'More overhead' trap, 'in side' → 'inside' (all units), 'do main' → 'domain' (Unit 4 access matrix), 'dead lock(s)' → 'deadlock(s)', 'to day' → 'today', 'on line' → 'online', 'be coming' → 'becoming', 'bas is' → 'basis', 'us able' → 'usable', 'there by' → 'thereby', 'Bit Keeper' → 'BitKeeper', 'Git Hub' → 'GitHub', 'Mee Go' → 'MeeGo', 'i Phone/i Pad/i Pod' → 'iPhone/iPad/iPod', 'Lot us Domino' → 'Lotus Domino', 'Group Wise' → 'GroupWise', 'Power PC' → 'PowerPC', 'My SQL' → 'MySQL', 'Free/Net/Open BSD' → 'FreeBSD/NetBSD/OpenBSD', 'Ne XTStep' → 'NeXTStep', 'Berkley' → 'Berkeley', 'Black Berry' → 'BlackBerry', 'fulfillthedemandofat', 'systemcannotfulfilltherequestofallprocesses…', 'thesystemiscalledunsafe', 'Avial=(0,0,0)' → 'Avail = (0, 0, 0)', 'LECTURENO:-7' fragments, FCFS/LOOK/SSTF/SCAN numerical spacing and the C-LOOK total, '5MP' → 'SMP', 'Djikstra' → 'Dijkstra'.

Sanitiser traps found and fixed in `sanitize.py` (work dir):

- `"More over": "Moreover"` (line 266) was a plain substring replacement that ate the space in 'More overhead' → 'Moreoverhead'. Both capital and lowercase entries are now comma-anchored (`"More over,"`, `"more over,"`).
- `"Distributio": "Distribution"` matched inside the correct word 'Distribution' and rendered 'Distributionn'. Entry deleted; the one truncated occurrence (a Unit 5 heading) was fixed in the source JSON instead.
- The line-496 CamelCase split (`([a-z])([A-Z][a-z])`) was splitting real product names ('BitKeeper' → 'Bit Keeper', 'GitHub' → 'Git Hub', 'UnixWare', 'BlackBerry', 'TestAndSet', 'JavaScript', 'MeeGo', 'iPhone', 'iPad', 'iPod', 'WebKit', 'GroupWise'). All 12 added to the PROTECT placeholder dict (non-whitespace control chars only — \x09–\x0d placeholders are whitespace and get eaten by the \s+ normaliser).
- A guarded regex fix (`(?<!m)ultiprocessing` etc.) briefly corrupted 'Multiprogramming' → 'Mmultiprogramming', 'Characteristics' → 'Ccharacteristics', 'Classifications' → 'Cclassifications' (the lookbehind is case-sensitive, so capitalised words matched). All three corruptions were found by the final sweep and repaired in the source JSONs; final sweep confirms zero occurrences in any PDF.

Final verification: full-text sweep of all 7 PDFs for 20 known bad patterns (LECTURENO, Moreoverhead, Distributionn, Mmulti, Ccharacteristics, Bit Keeper, Git Hub, Black Berry, Unix Ware, i Phone/Pad/Pod, Mee Go, Web Kit, Test AndSet, Lot us, Group Wise) — **zero hits**. Long-token scan (≥14 lowercase letters) — only real words remain. Visual inspection: title p1, Unit 1 p2/p29, Unit 2 p43, Unit 3 pp 74/79/80, Unit 4 p96, Unit 5 pp 110/125/128, 70Q pp 132/185, and one Gantt/disk/Banker's/page-fault/directory page from every solution PDF — all clean.
