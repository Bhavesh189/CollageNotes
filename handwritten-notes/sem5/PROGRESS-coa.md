# COA Sem 5 — Progress

Subject: Computer Organization & Architecture (Sem 5, 5CS4-02).
Status: COMPLETE 2026-11-24. Notes REUSED from the Sem 4 build (same source folder), verified — NOT rebuilt. Three new PYQ solution PDFs built fresh.

## 1. Reuse verification — source match: YES

The Sem 5 source PDFs were re-downloaded fresh from GitHub (raw main branch,
`https://raw.githubusercontent.com/Bhavesh189/CollageNotes/main/notes-source/notes/sem5/computer-org-architecture/coa-unit-{1..5}.pdf`)
on 2026-11-24 and compared against the files the Sem 4 build used
(`~/workspace/handwritten_notes/sem4-work/coa/src/`). All five are BYTE-IDENTICAL (MD5):

| Unit | Fresh MD5 | Sem 4 build MD5 | Pages |
|---|---|---|---|
| coa-unit-1.pdf | 6641c3b43d34de28f3ec01df131b9e3f | same | 26 |
| coa-unit-2.pdf | 0820f81b5fc8c95b4725b2a1f2209bcc | same | 51 |
| coa-unit-3.pdf | 1adcefc09097145da4202bad7d330818 | same | 59 |
| coa-unit-4.pdf | 3e2b3f1553131b45acaf1f0c06727753 | same | 46 |
| coa-unit-5.pdf | df1bc6c993eb11a58d1794722f072701 | same | 75 |

Source: Dr. Neeraj Jain notes, 257 source pages, 563 headings covered (per the coverage check).
No unit differed, so nothing was rebuilt. Work folder (pipeline copy):
`~/workspace/handwritten_notes/sem5-work-coa/` (copied from `sem4-work/coa/`; the sem4-work copy was not modified).
Note: the pipeline needs `PYTHONPATH=$HOME/.local/lib/python3.12/site-packages` (user site-packages
are disabled by default in this VM) — reportlab/fitz live there.

## 2. Notes (reused, copied)

- `~/workspace/handwritten_notes/sem5/Computer-Organization-and-Architecture-Sem5-Handwritten-Notes-Full.pdf`
  — 258 pages, A4, byte-identical to the Sem 4 file (MD5 f89d09eb2d6d4ca3405a46babac2872a).
  Unit 1 pp 1–20, Unit 2 pp 21–56, Unit 3 pp 57–107, Unit 4 pp 108–140, Unit 5 pp 141–202,
  70 Most Important Questions pp 203–258.
- Visually inspected: title page + one sample page per unit (pp 1, 21, 57, 108, 141, 203).
  Clean handwriting style, dense, no garbled joined/split words. (Minor wording quirks such as
  "nonembedded" and "Input- output interface" are the source notes' own text.)
- **TITLE PAGE SAYS "Semester 4" — flagged, NOT silently rebuilt.** Page 1 reads:
  "Computer Organization & Architecture — Semester 4 — Handwritten Notes (Full Depth)" and
  "The paper is the old-scheme Sem 4 paper 4CS3-03 (June 2022); its source notes live in the Sem 5 folder."
  The content is the same for Sem 5 (same source, same syllabus topics), only the semester label
  says Semester 4. Parent to decide whether to relabel/rebuild the title page; this agent did not
  rebuild, per the task instruction.
- Coverage check (copied, header updated to note it is the Sem 5 copy of the Sem 4 build):
  `~/workspace/handwritten_notes/sem5/Computer-Organization-and-Architecture-coverage-check.md`
  — 564 headings covered, 6 unmatched (3 merged into "Computer Instructions", 3 assignment-cover metadata).

## 3. PYQ solutions (4 papers, 88 questions solved in total)

| Paper | Source | Pages | Questions |
|---|---|---|---|
| COA-Jun-2022 | Reused from Sem 4 (byte-identical copy, MD5 14f23b3f4fd8f914e6d328751918e1b3) | 26 | 24 |
| COA-2024 (Main Exam 2023-24, 5AM4-02) | Fresh — `public/pyq/sem5/COA-2024.pdf` (3 pp) | 18 | 22 (all: Part A 10 + Part B 7 + Part C 5) |
| COA-2025 (Main/Back 2024-25, 5CS4-02) | Fresh — `public/pyq/sem5/COA-2025.pdf` (3 pp) | 15 | 22 (all) |
| COA-2026 (Main/Back 2025-26, 5CS4-02) | Fresh — `public/pyq/sem5/COA-2026.pdf` (6 pp) | 18 | 22 (all) |

All in `~/workspace/handwritten_notes/pyq-solutions/sem5/`. All A4, same handwriting style as the notes
(Patrick Hand, blue body, black underlined headings, red key terms). Every question is written first
exactly as printed (including the papers' own typos, e.g. "airthmetic", "reigster", "CUP", "Stock
Organization"), then answered below it. No "similar to Q2", no question photos. Verified: every
question label present in each PDF, no "See the notes for this topic" fallbacks, flags sections present.
Sample pages visually inspected per PDF (title page, a numerical page, and the flags page for 2024;
Booth example p9 for 2025; pipeline speedup + Optimal page-replacement table pp 9–10 for 2026).

Key verified answers (re-checked by hand):
- 2024: 2's complement subtraction (1101.10)2 − (1000.10)2 = (101.00)2 = 5.0; shifts on 1101110 →
  logical left 1011100, circular right 0110111, arithmetic right 1110111; RPN of
  A x B + A x (B x D + C x E) = A B x A B D x C E x + x + (check: 84 with A=2,B=3,C=4,D=5,E=6);
  512 x 16 RAM = 9 address lines, 16 data lines; effective addresses: Direct 400, Immediate 301,
  Relative 701; Booth (+13) x (−7) = −91 = 1110100101 (10-bit).
- 2025: 16-bit masks — clear first 8 bits: AND 0000000011111111 → 0000000011001101; complement middle
  8 bits: XOR 0000111111110000 → 1001010100111101; (+35)+(+40) in 7-bit 2's complement overflows
  (+75 does not fit, −64..+63); (−35)+(+40) = +5; Booth example (+6) x (−3) = −18 = 11101110.
- 2026: Booth y=101011 (−21) x x=101100 (−20) = +420 = 000110100100; non-restoring division 23/5 →
  quotient 4, remainder 3; page replacement (seq 4,2,0,1,2,6,1,4,0,1,0,2,3,5,7, 4 frames):
  Optimal 9 faults / 6 hits, LRU 11 faults / 4 hits, final resident set {2,3,5,7} both;
  cache associativity: 2-way (16 sets, 32 blocks); pipeline: clock 60 ns, ideal speedup 2.58,
  actual speedup 2.5; average operand-fetch cycles 1.45.

## 4. Unclear / flagged questions (also listed at the end of each solution PDF)

- COA-2024 Part-B Q.4 — a faint handwritten working (the RPN of Q.3) is scribbled on the scan next
  to this question. A mark on the paper, not part of the printed question; ignored.
- COA-2025 Part-B Q.6 — the paper gives NO page table, so the frame for page 1 is not printed.
  Solved as: logical address (000110011)2 splits into page 1, offset 19; physical address given as
  (000110011)2 = 51 under the clearly stated assumption of identity mapping (page 1 in frame 1).
- COA-2025 Part-B Q.4 — printed with only parts (a) and (b); there is no part (c).
- COA-2026 Part-B Q.5 — the paper prints the frequency table and the three assumptions but NO final
  sentence asking what to calculate. Solved as the standard question it comes from: average clock
  cycles to fetch an operand = 1.45.
- COA-2026 Part-B Q.7 (b) — the printed non-pipelined time (150 ns) is 5 ns less than the sum of the
  stage delays (155 ns). The answer uses the printed 150 ns as given.
- COA-2026 Part-C Q.1 (i) — Optimal tie-break stated in the answer: when several pages are never
  used again, evict the one resident longest.
- COA-2026 Part-C Q.3 (B) — the paper literally prints "Stock Organization" (typo for Stack
  Organization); reproduced as printed, answered as stack organization.
- COA-2026 Part-C Q.5 (B) — the paper prints "Input-Output Processor (IOS)"; reproduced as printed.

## 5. Gaps / nothing left undone

- No paper could not be completed. All 3 new Sem 5 papers solved in full (22/22 questions each).
- No GitHub upload, no token requested.
- Other subjects' folders were not touched. (Other solution PDFs visible in
  `pyq-solutions/sem5/` — e.g. ML-2024/2025/2026, IML-Aug-2023 — were written by concurrent agents,
  not by this task.)
