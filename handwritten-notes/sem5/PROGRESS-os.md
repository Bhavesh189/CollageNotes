# Operating Systems — Semester 5 — Progress

**Status: COMPLETE (2026-11-24)**

## Outputs

- **Notes:** `~/workspace/handwritten_notes/sem5/Operating-Systems-Sem5-Handwritten-Notes-Full.pdf`
  — **185 pages**, A4, Patrick Hand, approved full-depth style.
  Unit 1 pp 2–38 (Introduction & Processor Management), Unit 2 pp 39–62 (Memory Management),
  Unit 3 pp 63–85 (Deadlock & Device Management), Unit 4 pp 86–108 (File Management),
  Unit 5 pp 109–131 (Linux and Unix Case Study), 70 Most Important Questions pp 132–185.
- **Coverage:** `~/workspace/handwritten_notes/sem5/Operating-Systems-coverage-check.md`
  — 390 source sections, 385 covered headings (98.7%); 302 meaningful topics, all verified
  in the notes PDF (270 by exact phrase search, 32 by hand — table fragments / glued-heading
  search artefacts). No source topic missing.
- **PYQ solutions** (`~/workspace/handwritten_notes/pyq-solutions/sem5/`, 6 papers, 22 questions
  each, 132 total, 108 pages):
  - OS-2022 — 22 pp
  - OS-2024 — 17 pp
  - OS-2025 — 16 pp
  - OS-2026 — 12 pp
  - OS-Dec-2020 — 19 pp
  - OS-May-2023 — 22 pp
- **70 Questions:** 70 questions, 14 per unit; 7 × 2-mark, 34 × 5-mark, 29 × 10-mark;
  48 starred (repeated in 2+ papers).

## Source

Bhavesh189/CollageNotes, `notes-source/notes/sem5/operating-systems/os-unit-1.pdf` … `os-unit-5.pdf`
(164 source pages, 27,006 words). PYQs from `public/pyq/sem5/`: OS-2022, OS-2024, OS-2025,
OS-2026, OS-Dec-2020, OS-May-2023. All 6 papers are scanned images (no text layer); questions
were transcribed from the scans.

## Quality

- All numerical answers verified by simulation scripts (`verify*.py` in the work dir).
- Garble sweep of all 7 PDFs (20 known bad patterns + long-token scan): zero hits.
- Visual inspection of sample pages from every unit, the 70Q section, and every solution PDF
  (Gantt, disk, Banker's, page-fault, directory-tree pages): clean.
- Source errors corrected, not copied: Unit 3 FCFS disk total 376 → **403**; SSTF vs SCAN
  135 → **140**, extra distance 10 tracks, option **(C)** not (A).
- Sanitiser traps fixed in the work-dir `sanitize.py` (see coverage file): the `"More over"` →
  `"Moreoverhead"` trap, the `"Distributio"` → `"Distributionn"` trap, the CamelCase split
  breaking product names (BitKeeper, GitHub, TestAndSet, iPhone, … — now PROTECTed), and a
  regex fix that briefly corrupted Multiprogramming/Characteristics/Classifications (repaired).

## Flags (also noted inside the solution PDFs)

- OS-2024 C Q1: P5 burst printed as **8**, not the textbook's 5 — solutions use 8.
- OS-2026 Part B Q3/Q4: total resource count partly obscured by a pen mark; assumed total **10**
  (standard form); method shown so any total can be substituted.
- OS-2024 B Q6: Solaris dispatch table NOT printed in the paper; standard Silberschatz values used.
- OS-May-2023 B Q5(b): physical memory size not printed — only the virtual address can be divided.
- OS-2022 C Q4 is an exact repeat of C Q1 — solved in full again.

## Work dir

`~/workspace/handwritten_notes/sem5-work-os/` (sources, extractor, cleaner, builders, verify scripts).
No GitHub upload done and no token requested (upload only after BHAVESH gives a token).
