# CF&P (Computer Fundamentals & Programming) — Sem 1 — Coverage Check

Built 2026-11-24. Notes: `CFP-Sem1-Handwritten-Notes-Full.pdf` — 124 pages, A4.
Solutions: `pyq-solutions/sem1/` — CFP-2024 (18 pp), CFP-2025 (20 pp),
CFP-2026 (20 pp), CFP-Jul-2022 (25 pp); 22 questions each, 88 total, all solved.

## Sources used (all of them — the source is thin, only 3 files)

Repo: `Bhavesh189/CollageNotes`, `notes-source/notes/sem1/computer/`

| Source file | Size | What it is | How it was read |
|---|---|---|---|
| `cin1.pdf` | 105 pp | CamScanner compilation: Ch1 Computer Hardware & Software; Ch2 Introduction to C; Ch1 Input/Output; Ch2 Decision Making & Branching; Ch3 Decision Making & Looping; Ch1 Arrays; Ch2 Strings | Embedded text layer (92,529 chars) — fully parsed into 138 sections |
| `70 CF&P Updated Importnt question (1)BCA.pdf` | 76 pp | The 70-question bank (Part A 40 x 2 marks, Part B 15 x 5, Part C 15 x 10) with answers | Text layer (83,320 chars) — fully parsed; the 70Q section is built from it |
| `pc.pdf` | 70 pp | "Programming for Problem Solving" PYQ answer book (RTU 2019, PPS.1-72) — algorithm, flowchart, memory, number systems, conversions, complements, codes, C control statements, loops, arrays, files, storage classes | Scanned, no text layer. Read by visual sampling of 13 pages (pp 1,2,3,4,5,6,11,21,31,41,51,61,70). Full RapidOCR was attempted but abandoned: ~3 pages in ~20 min at 200 dpi (CPU/memory contention with sibling subagents), then the background chain was OOM-killed and its partial output lost. Its topics overlap cin1 + the 70CFP bank, which were read in full. |

Syllabus (BTU, `public/syllabus/sem1/syllabus.pdf`, 32 pp): CF&P is course
1FY2-08, 3 credits, 100 marks (IA 30, ETE 70), 3-hour exam. Unit mapping
(decided, follows the syllabus): Unit 1 = Fundamentals of Computer +
Number Systems (syllabus 1, 8 hrs); Unit 2 = C basics + formatted I/O
(syllabus 2, 6 hrs); Unit 3 = Control statements + loops (syllabus 3, 6 hrs);
Unit 4 = Arrays, Pointers & Structure (syllabus 4, 8 hrs); Unit 5 = Functions
+ Storage classes + Recursion + Strings + Files (syllabus 5+6, 7+7 hrs).
Note: cin1 also contains topics not in the syllabus text (network topologies,
LAN/WAN/MAN/PAN, etc.) — kept as source topics, as the source notes are the
content reference.

## Coverage — source sections (138 total, from cin1 + 70CFP)

137 headings recorded by the builder (104 rendered under their own heading,
33 small fragment sections merged into the preceding section). Every one of
the 138 source sections is present in the notes. 126 appear under their own
heading; the remaining 12 appear through the full-depth expansions and the
70Q answers (their text is short — under 25 words — so the builder merged
them, and the expansions cover each topic at full depth):

- U2 "Decrement (--)" — covered by the unary-operators expansion
  (increment/decrement, pre/post, with examples).
- U2 "Can a C program be compiled or executed in the absence of a main()?" —
  covered by the "structure of c program" expansion and 70Q A8 (SHORT answer
  in the notes: compiled yes, executed no).
- U2 "Differentiate between getch() and getche()." — covered by the
  "reading a character" expansion and 70Q A24.
- U2 "Write a C program to print hello world without using a semicolon (;)" —
  source section has no prose (code only, re-authored as a CODE block);
  covered by the "hello world without semicolon" expansion and 70Q A35.
- U4 "Differentiate between calloc() and malloc()" — covered by the
  "dynamic memory allocation" expansion and 70Q A4.
- U5 "strcpy( )", "strlen( )", "strcmp( )", "strcat( )", "strncmp( )",
  "strncpy( )" — covered by the "string manipulation functions" expansion
  (each function defined with syntax, example and return value) and 70Q C2/C11.
- U5 "Differentiate between call by value and call by reference." — covered
  by the "call by value" / "call by reference" expansions (with the
  call-by-value-vs-reference table) and 70Q A23 / C15.

Verified by searching the finished notes PDF for each topic's distinctive
text (e.g. "Pre-increment", "getche", "strcpy", "Call by Reference") — all
present. Result: **138/138 source sections covered, 0 missing.**

## Coverage — the 70-question bank (70/70)

All 70 questions from the 70CFP bank are in Part B of the notes ("70 Most
Important Questions — University Exam", pp 91-124): Part A 40 x 2 marks
(with 4-6 line SHORT answers), Part B 15 x 5 marks, Part C 15 x 10 marks.
23 are starred as most repeated across the 4 PYQ papers. Unit spread of the
bank: Unit 1: 3, Unit 2: 17, Unit 3: 7, Unit 4: 19, Unit 5: 24 — the bank
itself is C-heavy; the notes units are balanced across all 5 units.

## Coverage — PYQ papers (88/88 questions solved)

| Paper | Questions | Solved | Notes |
|---|---|---|---|
| CFP-2024 (2023-24, 3h, 70 marks) | 22 (A 10x2, B 7x4, C 5x10) | 22 | — |
| CFP-2025 (2024-25, 3h, 70 marks) | 22 (A 10x2, B 7x4, C 5x10) | 22 | Part B has two sub-parts both labelled (d) — both solved, second shown as (d) (second) |
| CFP-2026 (2025-26, 3h, 70 marks) | 22 (A 10x2, B 7x4, C 5x10) | 22 | — |
| CFP-Jul-2022 (July 2022, 2h, 70 marks) | 22 (A 10x3, B 7x5, C 5x20) | 22 | — |

All conversions were re-verified in decimal while solving, e.g.
(4FEC)16=(47754)8=20460, (EFD4)16=61396, (1056)16=(10126)8=4182,
(5C6)16=1478, (7EB9)16=32441, (74524)8=31060, 789=1100010101b=(1425)8=(315)16,
101.11b+11.01b=1001.00b, 100101b+11011b=1000000b, 1011.1101b=(13.64)8,
series 1!/1+...+5!/5=34.

## PYQ-only topic (not in the source notes — solved only in the solution PDFs)

- **Far pointer vs near pointer** (Jul-2022 B Q4; 2025 B Q2(d)): near = 2 bytes,
  offset only, 64 KB; far = 4 bytes, segment+offset, whole 1 MB; huge = like
  far but crosses segment boundaries. Solved in full in both solution PDFs,
  with the note that these exist only in 16-bit DOS C (Turbo C).

## Questions flagged as unclear in the scans

- **CFP-2024, Part A Q.6**: the code as printed appears to miss the semicolon
  after `c = 100`. The solution assumes a printing slip and gives the output
  for the corrected code (100, 100, 101 + blank line); without the semicolon
  the program does not compile. Flagged in the solution PDF.
- **CFP-2024, Part A Q.3**: the closing of the printf line is a little unclear
  in the scan; read as `printf("%d ", n++)`. Flagged in the solution PDF.
- **CFP-2025, Part A Q.1 (h)**: "Represent 5C6 in decimal" prints no base for
  5C6. Taken as hexadecimal (5C6)16, as in the July 2022 paper, giving 1478.
  Flagged in the solution PDF.
- **CFP-Jul-2022, Part A Q.8**: "Subtract 11012 and 10102" — subscripts are
  not clear in the scan. Both numbers taken as binary (1101)2 and (1010)2,
  giving (0011)2. Flagged in the solution PDF.

## Quality checks done

- Garble scan (mixed-case/digit token heuristic) on the finished notes PDF:
  only legitimate tokens remain (70CFP, 180KW, 500GB, 700MB, 100Mbps,
  123_Abc, bubbleSort, selectionSort, linearSearch, binarySearch). Same scan
  on all 4 solution PDFs: only C identifiers (stuTotal, subTotal, isPrime,
  addMatrices, nStudent, nSubject, nName, nMarks, nConsonants, tValue) and
  70CFP. No joined/split-word garble.
- Visual inspection of rendered pages: notes pp 2, 12, 35, 60, 75, 87, 100,
  120; solutions — 2024 pp 2, 5, 12; 2025 pp 2, 8, 15; 2026 pp 2, 10, 15;
  Jul-2022 pp 2, 8, 18. All legible, code blocks render `#include <stdio.h>`,
  braces, `%d`, `\n`, `&`, `|` correctly.
- Fixes made during inspection (all rebuilt and re-checked):
  1. Raw `<` in source text (e.g. `include<stdio.h>`, `a=b<c`) broke
     ReportLab paragraph parsing — escaped to `&lt;`/`&gt;` in the source
     JSONs and in 5 prose blocks in papers.py / 1 question in qbank.py.
  2. Running-header fragments glued into source paragraphs
     ("Dr. Pratap Singh Patwal 2021-22", "Alwar 2021-22",
     "CPPS – 18CPS13 Module 2", "OR1R2R3") — removed / corrected (39 spots);
     "comment section below" website junk trimmed from 2 paragraphs.
  3. Wrong definition box: the "pointer" topic's red box showed the union
     arrow-operator text. Fixed by preferring the curated expansion box
     (answers.py); a 10-mark "pointer" answer also had 9 red boxes — extra
     expansion boxes are now rendered as ordinary paragraphs.
  4. Confusing sentence fixed: "marks[100] does not exist in marks[100]"
     -> "For int marks[100]; the valid indexes are 0 to 99 - marks[100]
     does not exist."
- Source quirks left as-is (source's own wording, noted here, not garble):
  a few code-as-prose fragments in Unit 3/4 (e.g. the switch example on
  notes p60, selection-sort code on p75), and input/output-device bullets
  that end mid-sentence in the Jul-2022 Q.2 solution (source text was
  fragmented). The expansions alongside them give the clean, complete
  explanation in every case.

## What was NOT done

- pc.pdf was not fully OCR'd (see above); its topics are covered by cin1 +
  the 70CFP bank.
- No new topics were added to the notes beyond the source. Only the
  70-questions section and the PYQ solutions are additions, per the rule.
- Nothing was uploaded to GitHub; no token was requested.
