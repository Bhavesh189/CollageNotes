# Python Programming — Semester 4 — Coverage Check

**Subject:** Python Programming (4CS4-05), BTech CSE Semester 4
**Source repo:** `Bhavesh189/CollageNotes`, `notes-source/notes/sem4/python-programming/py-unit-1.pdf` … `py-unit-5.pdf`
**Notes PDF:** `~/workspace/handwritten_notes/sem4/Python-Programming-Sem4-Handwritten-Notes-Full.pdf` — **260 pages, A4**
**Page spans:** Unit 1 pp 1–30 · Unit 2 pp 31–68 · Unit 3 pp 69–114 · Unit 4 pp 115–149 · Unit 5 pp 150–185 · 70 Most Important Questions pp 186–260
**Builder report:** 391 covered headings
**Source totals (after extraction):** 40 lectures, 365 sections, 778 prose paragraphs, 390 code blocks
**PYQ solutions:** 4 papers, 58 pages total (see Part C below)

## How the check was done

1. Every source unit PDF was text-extracted (PyMuPDF) and split into lectures → sections.
2. The notes builder records every heading it renders in `covered.json`; final build: **391 headings covered**.
3. Every lecture below was ticked off against the rendered notes PDF (text search + visual spot-checks of sample pages from every unit and every solution PDF).
4. A garble scan (long tokens > 16 chars, digit-glued words) was run on the final notes PDF and on each solution PDF — clean (only legitimate names: `ZeroDivisionError`, `deg2rad`, `rad2deg`, `log1p`).

## Source quirks found and handled

- **Unit 5 PDF is mis-assembled in the repo:** its first 32 PDF pages duplicate Unit 4 pages 11–42 (Lectures 28–32). Only PDF pages 33–78 (source pages 1–46) were used for Unit 5.
- **Unit 5 actually has 8 lectures, not 5:** Lectures 38, 39 and 40 are headed `Lecture -38`, `Lecture- 39`, `Lecture 40` (no "No."), so an early extraction pass missed them and their content was swallowed into Lecture 37 as one giant code block. The extractor was fixed to accept all marker forms, and Lectures 38–40 are now proper lectures in the notes:
  - Lecture 38 — Arithmetic with NumPy Arrays: Indexing, Boolean Indexing, Transpose and Swap Axes
  - Lecture 39 — Mathematical and Statistical Methods: Sorting, Unique and Other Set Logic
  - Lecture 40 — Data Visualization (Matplotlib, Seaborn, Bokeh, Plotly — 5 programs)
- **Output-mode swallowing:** Lecture 40's prose was being swallowed into code blocks after an `Output` label. The extractor now exits output mode on long token-free prose lines; this also freed prose in Units 1–4 (sections 326 → 365).
- **Broken programs in the source itself were repaired** (never silently dropped): missing closing quote (`z="Jaipur"`), truncated triple-quote example, unescaped quotes in the Vikings string, pseudo-code lines in the even/odd and nested-if examples (incl. a mis-indented outer `else`), Python 2 `print` statements in the pass example, `print(result)` at the wrong indent in `tri_recursion`, the pattern program (`print("r")` artifact), `def f(a, b, ...)` templates, the factorial recursion missing its `return n * factorial(n - 1)`, and the Armstrong program calling undefined `power()` instead of `power_1()`. All fixes are in `fix_py.py` in the work folder and were re-verified block by block.
- **Joined-word spacing drops from the source PDF** were fixed where found: `# s1is superset` / `# s1is subset` → `# s1 is …`, `working# of` → `working of`, `My_Set1 | My_Set2# …` → `… # …`, `two givensets` → `two given sets`, `‘|’between` → `‘|’ between`.
- Remaining oddities are the **source's own wording**, kept as printed (e.g. Lecture 17 title "Create,Accesss, slicing,.", Lecture 19 "Indexing ans Slicing", the Armstrong definition "A positive number of "p" number of digits…", repeated "Tuple Tuples are used…" lead-ins, the `bool(input("Enter True or False"))` quirk in the student-result program). These are legible and faithful to the source.

## Lecture-by-lecture coverage — all 40 lectures covered ✔

### Unit 1 — Python Introduction, Data Types, Strings & Operators (pp 1–30)
- [x] Lecture 1: Python Introduction — 5 sections, 4 paras, 3 code blocks
- [x] Lecture 2: The Python Standard Library — 1 section, 1 para
- [x] Lecture 3: Built-in Data Types — 15 sections, 14 paras, 6 code blocks
- [x] Lecture 4: Python – Variable Names — 11 sections, 17 paras, 11 code blocks
- [x] Lecture 5: Multi Words Variable Names — 8 sections, 14 paras, 9 code blocks
- [x] Lecture 6: Python Strings — 11 sections, 21 paras, 11 code blocks
- [x] Lecture 7: Escape Character — 10 sections, 59 paras, 9 code blocks
- [x] Lecture 8: Python Operators — 7 sections, 24 paras, 5 code blocks

### Unit 2 — Decision Making, Loops, Functions & Regular Expressions (pp 31–68)
- [x] Lecture 9: Decision Making using if, if-else, if-elif and nested statements — 9 sections, 19 paras, 6 code blocks
- [x] Lecture 10: Python Loops — 11 sections, 17 paras, 10 code blocks
- [x] Lecture 11: Python math Module — 5 sections, 55 paras, 5 code blocks
- [x] Lecture 12: Python Functions — 15 sections, 27 paras, 19 code blocks
- [x] Lecture 13: Pattern Programs using Functions — 2 sections, 6 paras, 4 code blocks
- [x] Lecture 14: Python User-Defined Functions — 6 sections, 8 paras, 5 code blocks
- [x] Lecture 15: What is Regular Expression? — 4 sections, 18 paras, 6 code blocks
- [x] Lecture 16: Function Programs – Prime Number Check — 5 sections, 11 paras, 8 code blocks

### Unit 3 — Lists, Tuples, Dictionaries & Sets (pp 69–114)
- [x] Lecture 17: List — Create, Access, slicing, Negative indices, List Methods — 20 sections, 30 paras, 22 code blocks
- [x] Lecture 18: List Methods and Operations (continued) — 18 sections, 47 paras, 23 code blocks
- [x] Lecture 19: Tuples — Create, Indexing and Slicing, Operation on tuples — 18 sections, 34 paras, 21 code blocks
- [x] Lecture 20: Loop Through the Index Numbers — 15 sections, 21 paras, 16 code blocks
- [x] Lecture 21: Dictionary — Create, add, and replace values, operation on dictionaries — 14 sections, 19 paras, 18 code blocks
- [x] Lecture 22: Change Values — 13 sections, 42 paras, 20 code blocks
- [x] Lecture 23: Sets — Create and operations on set — 13 sections, 21 paras, 15 code blocks
- [x] Lecture 24: Set Operations – Examples — 7 sections, 29 paras, 12 code blocks

### Unit 4 — Functions, Recursion, Lambda & File Handling (pp 115–149)
- [x] Lecture 25: Functions — Types, parameters, positional/keyword/default arguments — 9 sections, 8 paras, 6 code blocks
- [x] Lecture 26: Functions with arbitrary arguments, scope of variables: local and global — 6 sections, 13 paras, 7 code blocks
- [x] Lecture 27: Functions related programs — 1 section, 1 para, 2 code blocks
- [x] Lecture 28: Recursion And Lambda Function — 10 sections, 15 paras, 8 code blocks
- [x] Lecture 29: Practice of function related programs — 9 sections, 7 paras, 5 code blocks
- [x] Lecture 30: Files — Open, read, write, append and close, Tell and seek methods — 9 sections, 15 paras, 9 code blocks
- [x] Lecture 31: Practice of file related programs — 5 sections, 12 paras, 9 code blocks
- [x] Lecture 32: Practice of file related programs — 14 sections, 20 paras, 9 code blocks

### Unit 5 — NumPy: Arrays & Vectorised Computation (pp 150–185)
- [x] Lecture 33: NumPy Basics — Arrays and Vectorized Computation — 11 sections, 17 paras, 12 code blocks
- [x] Lecture 34: The NumPy ND Array — Creation of ND arrays, Data Types for ND arrays — 10 sections, 20 paras, 11 code blocks
- [x] Lecture 35: Arithmetic with NumPy arrays — basic indexing and slicing, Boolean indexing, transposing array and swapping axes — 10 sections, 29 paras, 22 code blocks
- [x] Lecture 36: Universal Function — Fast Element-Wise array Function — 4 sections, 3 paras, 2 code blocks
- [x] Lecture 37: NumPy related Examples — 2 sections, 20 paras, 3 code blocks
- [x] Lecture 38: Arithmetic with NumPy Arrays — Indexing, Boolean Indexing, Transpose and Swap Axes — 5 sections, 12 paras, 6 code blocks
- [x] Lecture 39: Mathematical and Statistical Methods — Sorting, Unique and Other Set Logic — 11 sections, 23 paras, 10 code blocks
- [x] Lecture 40: Data Visualization — 6 sections, 5 paras, 5 code blocks (Matplotlib scatter + bar, Seaborn line, Bokeh line, Plotly scatter)

**Coverage result: 40 / 40 lectures covered, 365 / 365 sections rendered (391 headings incl. expansion headings). Nothing missing.**

## Part B — 70 Most Important Questions (pp 186–260, 75 pages)

- 70 questions, 14 per unit, verified `len(QUESTIONS70) == 70`.
- Most-repeated questions (asked in 2+ PYQ papers) are marked with a red star.
- Answers sized by marks: 2-mark 4–6 lines, 5-mark half to one page, 10-mark 1–2 pages.
- Includes the four PYQ-only topics as questions (they are **not** added to the unit notes, per the no-new-topics rule): generator functions (Q47), exception handling (Q54), data visualisation (Q68), random number generator (Q70).

## Part C — PYQ solution PDFs (all 4 papers, 88 questions)

All four papers are scanned images; questions were recovered by OCR (RapidOCR) + visual reading of the rendered pages. Each paper: Part A 10 × 2 marks, Part B 5 of 7 × 4 marks, Part C 3 of 5 × 10 marks (PYT-2026 Part C has (a)+(b) sub-parts, so its PDF counts 27 question entries for 22 numbered questions).

| Paper | File | Pages | Questions |
|---|---|---|---|
| 2023-24 (4CS4-05) | `PYT-2024-solution.pdf` | 13 | 22 |
| 2024-25 (4CS4-05) | `PYT-2025-solution.pdf` | 14 | 22 |
| 2025-26 (4CS4-05) | `PYT-2026-solution.pdf` | 15 | 22 (27 entries incl. Part C sub-parts) |
| August 2023 (4CS4-05) | `PYT-Aug-2023-solution.pdf` | 16 | 22 |
| **Total** | | **58** | **88** |

All solution PDFs verified with `pdfinfo` (valid, A4). Every question is solved in paper order with the question written in handwriting first, then the full answer; no "similar to Q2" shortcuts.

## PYQ-only topics (solved only in solutions / 70Q, NOT added to the unit notes)

- Exception handling — try/except/else/finally, common exceptions (`ZeroDivisionError`, `ValueError`, `FileNotFoundError`, …). Source mentions exceptions only in passing; never taught as a topic.
- Generator functions — `yield`, `next()`, lazy evaluation. Not in the source notes.
- Data visualisation — Matplotlib charts (line/bar/scatter/histogram). Source Lecture 40 covers it (now in the notes), but the PYQ answers use the dedicated `pyq_only` treatment.
- Random number generator — `randint`, `random`, `choice`, `shuffle`, `seed`. Not in the source notes.
- File built-in functions — see the flagged question below.

## Unclear / flagged questions

1. **PYT-Aug-2023, Part A Q7** — printed as "pile built-in function" in the scan. There is no `pile` function in Python; this is a misprint in the paper (almost certainly "file built-in function"). Answered as the file built-in functions (`open`, `read`, `readline`, `write`, `close`, …) with the misprint noted in the solution PDF.
2. **PYT-2026, Part C Q3 (a)** — wording in the scan was only partially legible; rendered as "Explain list slicing with a suitable example." This is the best reading of the scan, not fully verified.
3. All other 86 questions were read clearly (OCR + visual check of the rendered paper pages).

## Visual inspection log (rendered sample pages, 130 dpi)

- Notes p2 (Unit 1 intro), p40 (Unit 2 loops), p80 (Unit 3 tuples), p120/p122 (Unit 4 recursion/factorial), p177 (Unit 5 Lecture 40 Data Visualization), p200 (70Q loops) — clean, legible, correct handwriting style, code indentation correct, outputs in grey.
- Solutions: PYT-2024 p5 (scope answer) + p6, PYT-2025 p13, PYT-2026 p12 (list comprehension + dictionary), PYT-Aug-2023 p9 — clean and on-topic.
- One real defect was caught and fixed during inspection: an answer-matching bug (empty headings matched every topic, so the scope answer showed Unit 1 text) — fixed in `answers.py` (`_match` now rejects empty headings) and all PDFs rebuilt.
- Known cosmetic notes: a few definition boxes quote the source's own fragmented first sentences; the 70Q loops page quotes `print "Good bye!"` inside a prose paragraph describing the source's pass example (the actual code block uses `print()`); Lecture 40's program sections carry the source's own "Output" labels. None of these affect correctness.
