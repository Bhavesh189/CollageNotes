# COA Sem 5 — Add-on: 2 extra PYQ papers (COA-2022, COA-Aug-2023)

Task date: 2026-11-24. Papers taken from `public/pyq/sem6/` on GitHub raw main branch
(they are Sem 6-folder papers for the Sem 5 COA subject). Work folder (fresh pipeline copy):
`~/workspace/handwritten_notes/sem5-work-coa-add/` (copied from `full/`; `sem5-work-coa/` and
`full/` were not used or modified). No GitHub upload, no token requested.

## 1. Reuse check — both papers built fresh

- `ls ~/workspace/handwritten_notes/pyq-solutions/sem4/` shows the only COA solution there is
  `COA-Jun-2022-solution.pdf`. No solution for COA-2022 or COA-Aug-2023 existed there.
- `ls ~/workspace/handwritten_notes/pyq-solutions/sem5/` before building showed COA-2024,
  COA-2025, COA-2026 and COA-Jun-2022 only — neither add-on paper had been solved.
- Result: both built fresh, nothing reused or copied.

## 2. Outputs (same approved style: Patrick Hand, blue body, black underlined headings, red key terms, unlined white A4, ~1.5 cm margins)

| Paper | Source | Pages | Questions solved |
|---|---|---|---|
| COA-2022 (B.Tech VI Sem Main 2021-22, 6CS4-04/6IT4-04, 120 marks, 3 pp) | `public/pyq/sem6/COA-2022.pdf` | 16 | 22 (Part A 10 x 3, Part B 7 x 10, Part C 5 x 24) |
| COA-Aug-2023 (B.Tech VI Sem Main/Back Aug 2023, 6CS4-04, 120 marks, 4 pp) | `public/pyq/sem6/COA-Aug-2023.pdf` | 15 | 22 (Part A 10 x 2, Part B 7 x 8, Part C 5 x 15) |

- `~/workspace/handwritten_notes/pyq-solutions/sem5/COA-2022-solution.pdf` (MD5 b9e995aef262a85712983f36b2fdad5a)
- `~/workspace/handwritten_notes/pyq-solutions/sem5/COA-Aug-2023-solution.pdf` (MD5 5fcfec9d8e79b5fb0a7bed018e9f453e)

Every question is written first exactly as printed (including the papers' own typos, e.g.
"compliment" in COA-2022 Part B Q.2), then answered below it. No "similar to Q2", no question
photos, no "See the notes" fallbacks (0 found by scan). All questions solved, including the
ones a candidate could skip (Part A "answer 6 of 10", Part B "3 of 7", Part C "3 of 5" in
COA-2022; "5 of 7" / "4 of 5" in Aug-2023) — same convention as the earlier Sem 5 COA papers.

Key verified answers (re-checked by hand and by script):
- COA-2022: Booth A = -35, B = -41, product +1435 = (0000010110011011)2 (full 8-step table);
  effective access time 0.95 x 100 + 0.05 x 800 = 135 ns; two-level cache average 24.9 ns
  (reads 24.1 ns, writes 26.1 ns, weighted-sum model stated); direct-mapping fields TAG 8 /
  BLOCK 9 / WORD 2 bits (19-bit address); set-associative AB23C -> set 8, tag AB, 2 tags
  checked; RAM/ROM map: 8 RAM chips, 4 ROM chips, RAM 0000-07FF, ROM 4000-4FFF, interface
  8000-800F (14-bit bus, stated); 16-bit CLA final carry 3 gate delays, final sum 4.
- COA-Aug-2023: interrupt — address 1 holds BUN 230, routine ends ION then BUN 0;
  instruction format opcode 5 / mode 3 / register 6 / address 18 bits (32-bit word);
  basic computer AND: PC 022, AR 083, DR B8F2, AC A832, IR 0083; repeats ADD (AC 6229,
  E = 1), LDA (AC B8F2), ISZ (DR B8F3, M[083] = B8F3); RISC I jump to 3200: immediate
  JMP Z, #3200, relative offset -200 (PC = 3400); baud 1200: synchronous 150, async two
  stop bits 109, async one stop bit 120 characters per second.

## 3. Unclear / flagged questions (also listed at the end of each solution PDF)

- COA-2022 Part C Q.2 prints the memory size as "1M (220)" — read as 2 to the power 20 words.
- COA-2022 Part B Q.4 solved with the weighted-sum model for average access time (stated).
- COA-2022 Part A Q.7 solved for a single-level CLA with two-level AND-OR carry logic (stated).
- COA-Aug-2023 Part B Q.3: the paper says SC is cleared at T3 when C7 is active (C7T3: SC -> 0)
  but then says C7 is activated with the clock transition of T7 — contradictory, so the solution
  follows C7T3 (clearing at T3) and treats the T7 remark as a misprint.
- COA-Aug-2023 Part C Q.1: the paper asks to repeat the problem three more times without naming
  the three instructions — ADD, LDA and ISZ used (standard textbook set).
- COA-Aug-2023 Part B Q.7 / Part C Q.3: RISC I instructions use the usual textbook assembly form
  (R0 always 0); exact mnemonic spelling varies between textbooks.

## 4. Quality checks

- Garble scan run on both PDFs: no joined/split-word garble (only legitimate long words flagged
  by the heuristic, e.g. "instructions", "Differentiate"); 0 "See the notes" fallbacks.
- Visually inspected sample pages of each PDF: title page, Booth table (2022 p6), CPU schematic
  (2022 p9), associative-memory diagram (2022 p13), dual-MUX + function table (Aug-2023 p5),
  instruction-format table (Aug-2023 p8), baud + flags page (Aug-2023 p15). Clean handwriting,
  legible tables and diagrams. One fix applied during checks: a near-empty final page in
  Aug-2023 (one spilled flag line) was removed by shortening the third flag; final file is 15
  pages with a full last page.
- Other subjects' and papers' files were not touched (only the two new solution PDFs were
  written; existing COA-2024/2025/2026/Jun-2022 files unchanged).

## 5. Gaps / nothing left undone

- No paper could not be completed. Both papers solved in full, 22/22 questions each.
