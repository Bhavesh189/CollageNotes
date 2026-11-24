# DE (Digital Electronics) Sem 3 — Coverage Check

**Subject:** Digital Electronics (3CS4-02), Semester 3
**Date:** 2026-11-24
**Notes PDF:** `~/workspace/handwritten_notes/sem3/DE-Sem3-Handwritten-Notes-Full.pdf` — **153 pages**
**Solutions:** `~/workspace/handwritten_notes/pyq-solutions/sem3/` — 8 PDFs, 119 pages total, 175 questions solved

## Source files and the file-to-unit mapping

Source notes downloaded from `Bhavesh189/CollageNotes`, `notes-source/notes/sem3/digital-electronics/`:

| File | Pages | What it actually contains (verified visually) |
|---|---|---|
| `de-unit-1.pdf` | 56 | Unit 1 — Number System (starts "Number System") |
| `de-unit-2.pdf` | 30 | **Unit 3** — Combinational Logic Circuits Design (p1: "Unit-3 Combinational logic circuit design") |
| `de-unit-3.pdf` | 27 | End of Unit 1 (IEEE 754 double precision) then **Unit 2** — Boolean Algebra / K-maps |
| `de-unit-4.pdf` | 22 | **Unit 4** — Sequential Circuits (p1: "Unit-4 Sequential circuit") |

The filenames do NOT match the units. Coverage below is by actual unit headings, not filenames.
All four source files are scanned handwritten notebook photos (no text layer); content was
authored clean from visual sampling of the pages, not from raw OCR.

## Unit 5 — built from syllabus (no source notes in repo)

**No Unit 5 source notes exist anywhere in the repo** (verified via GitHub API recursive
tree: only de-unit-1..4 under `digital-electronics/`, no scattered DE notes elsewhere).
Unit 5 = **Logic Families** was built from the official BTU Sem 3 syllabus
(`public/syllabus/sem3/syllabus.pdf`, section 3CS4-02, content block 6, 7 hours):
TTL NAND gate, Specifications, Noise margin, Propagation delay, fan-in, fan-out,
Tristate TTL, ECL, CMOS families and their electrical behavior.
No topic outside the syllabus was added. The notes PDF states this on the title page
and in the Unit 5 intro.

## Coverage — 70/70 topics rendered (from `covered.json`)

### Unit 1 — Number System, Codes and Logic Gates (pp. 2–18) — 14/14 ✓
- [x] Number System
- [x] Binary Number System
- [x] Binary Arithmetic
- [x] Number System Conversion
- [x] Complements: 1's, 2's, 9's and 10's Complements
- [x] Signed Numbers: Sign-Magnitude, 1's and 2's Complement Representation
- [x] Fixed Point and Floating Point Representation (IEEE 754)
- [x] Binary Codes
- [x] Weighted Codes: BCD 8421, 2421 and 5421
- [x] Non-Weighted Codes: Excess-3 Code
- [x] Gray Code
- [x] Error Detection and Correction Codes: Parity, Checksum and Hamming Code
- [x] Logic Gates
- [x] Universal Gates: NAND and NOR

### Unit 2 — Logic Simplification and Minimization (pp. 19–29) — 8/8 ✓
- [x] Boolean Algebra: Laws, Postulates and Theorems
- [x] De Morgan Theorem
- [x] SOP and POS Forms: Canonical Forms, Minterms and Maxterms
- [x] Karnaugh Map
- [x] Karnaugh Map 5 and 6 Variables
- [x] Dont Care Conditions in K-Maps
- [x] Quine Mc Cluskey Method (Tabulation Method)
- [x] Prime Implicants and Essential Prime Implicants

### Unit 3 — Combinational Logic Circuits Design (pp. 30–47) — 15/15 ✓
- [x] Combinational Circuits
- [x] Half Adder
- [x] Full Adder
- [x] Half Subtractor
- [x] Full Subtractor
- [x] Parallel Adder (Ripple Carry Adder)
- [x] Carry Look Ahead Adder
- [x] BCD Adder
- [x] Magnitude Comparator
- [x] Multiplexer
- [x] Demultiplexer
- [x] Decoder
- [x] Encoder
- [x] Seven Segment Display
- [x] Code Converters: BCD, Binary, Gray and Excess-3

### Unit 4 — Sequential Logic Circuits Design (pp. 48–77) — 23/23 ✓
- [x] Sequential Circuits
- [x] Latch and Flip Flop
- [x] SR Flip Flop
- [x] JK Flip Flop
- [x] D Flip Flop
- [x] T Flip Flop
- [x] Master Slave JK Flip Flop
- [x] Race Around Condition
- [x] Edge Triggered Flip Flop
- [x] Excitation Table
- [x] Counters
- [x] Ripple Counter
- [x] Synchronous Counter
- [x] MOD Counter: MOD-3, MOD-5, MOD-6 and MOD-10
- [x] Shift Registers
- [x] Finite State Machine
- [x] Design of Synchronous FSM
- [x] FSM Minimization
- [x] Algorithmic State Machine (ASM) Chart
- [x] Pulse Train Generator
- [x] Pseudo Random Binary Sequence Generator (PRBS)
- [x] Clock Generation
- [x] Asynchronous FSM

### Unit 5 — Logic Families (pp. 78–91) — 10/10 ✓ — built from syllabus
- [x] Logic Families
- [x] TTL NAND Gate
- [x] Noise Margin
- [x] Propagation Delay
- [x] Fan In Fan Out
- [x] Tristate TTL
- [x] ECL (Emitter Coupled Logic)
- [x] CMOS Families and Electrical Behaviour
- [x] TTL vs CMOS: Comparison
- [x] Figure of Merit

## Syllabus cross-check (BTU 3CS4-02, 6 content blocks)

| Syllabus block | Covered by |
|---|---|
| 1. Introduction (1 h) | Title page + Unit 1 intro |
| 2. Number System, Codes and Logic Gates (8 h) | Unit 1 — all 14 topics above |
| 3. Logic Simplification and Minimization (7 h) | Unit 2 — all 8 topics above |
| 4. Combinational Logic Circuits Design (8 h) | Unit 3 — all 15 topics above (Serial Adder and Driver & Multiplexed Display are covered in the PYQ solutions / Seven Segment Display section — see PYQ-only list) |
| 5. Sequential Logic Circuits Design (9 h) | Unit 4 — all 23 topics above |
| 6. Logic Families (7 h) | Unit 5 — all 10 topics above |

## 70 Most Important Questions (pp. 92–153) — 70/70 ✓
14 questions per unit, most repeated marked with a red star. Answers sized by marks
(2-mark 4–6 lines, 5-mark half to one page, 10-mark 1–2 pages).

## PYQ solutions — 8 papers, 175 questions, all solved

| Paper | Questions | Pages | Notes |
|---|---|---|---|
| DE-2022 (2021-22, 3CS3-04, 120 marks) | 22 | 20 | |
| DE-2024 (2023-24, 3AD4-02, 70 marks) | 22 | 15 | |
| DE-2025 (2024-25, 3CS4-02, 70 marks) | 22 | 14 | Reprint of May-2023 paper |
| DE-May-2023 (3CS4-02, 70 marks) | 22 | 14 | |
| DE-2026 (2025-26, 3CS4-02, 70 marks) | 22 | 15 | |
| DE-Dec-2019 (CS, 3CS3-04, 120 marks) | 22 | 15 | Same questions as IT version |
| DE-Dec-2019-2 (IT, 3IT3-04, 120 marks) | 22 | 15 | Same questions as CS version |
| DE-Feb-2021 (3CS3-04, 120 marks) | 21 | 11 | Part C Q.5 missing — see flag below |
| **Total** | **175** | **119** | |

### PYQ-only topics (solved in the solution PDFs only, not in the source notes)
NMOS inverter, open-collector output, totem-pole vs open-collector, staircase switching,
serial adder, positive/negative logic, self-dual functions, RAM element, ring vs Johnson
counter, limitations of fixed-point numbers. These are the one allowed exception:
PYQ solutions may cover PYQ-only topics.

### Questions flagged as unclear
- **DE-Feb-2021, Part C Q.5 — MISSING FROM THE SCAN.** The Feb-2021 PDF has only
  3 pages although the paper says 4 pages, so the fifth question of Part C could not
  be read or solved. Flagged at the end of `DE-Feb-2021-solution.pdf` under
  "Questions flagged as unclear in the scan". No other question in any paper was
  unclear or illegible.

## Quality checks performed (2026-11-24)
- **Garble scan** on all 9 PDFs (notes + 8 solutions, ~107,000 words): no joined/split
  words, no digit-in-word garble. Only hit was the false positive "lengths".
- **Visual inspection** of rendered pages from every unit (pp. 2, 10, 24, 25, 38, 46, 60,
  80, 82, 85, 87, 90, 100, 150) and every solution PDF (p2 and p8 of each, plus
  DE-2022 p17): all legible, style correct (Patrick Hand, blue ink, black underlined
  headings, red key terms), tables and diagrams correct.
- **Defects found and fixed before delivery:**
  1. `KMap4` diagram declared height 150 pt but drew ~305 pt — it overflowed the
     frame and overlapped the running header (notes p25 in the first build). Fixed
     height to 310 pt; also bumped CMOSInverter 150→156, TTLNAND 160→168,
     SevenSeg 118→124 for the same reason. Verified the K-map now renders whole
     with the correct 1s (m1, m3, m7, m11, m15) and circled CD row.
  2. Diagrams were rendered twice in several places: expansions embedded
     `("diagram", ...)` blocks AND `build_notes_v2.py` / `build_solutions.py`
     appended the same diagram via `topic_extras` / `DIAGRAM_MAP`. Removed the 14
     `("diagram", ...)` lines from `expansions.py`; each diagram now appears
     exactly once (via `DIAGRAM_MAP` in unit sections, via `topic_extras` in the
     70Q section and solutions). Notes went from 156 → 153 pages.
- **Verified numerical/design answers** (spot-checked during authoring, all
  simulation- or K-map-checked where applicable): DE-2022 QM, state diagram,
  MOD-3 T counter; DE-2024/2025/2026 K-maps and MUX implementations; DE-2025
  synchronous counter (JA = BC', KA = B + AC', JB = A'C' + AC, KB = B,
  JC = A'B, KC = C); DE-2026 MOD-5 counter and De Morgan reductions;
  Dec-2019 MOD-6 T counter and Excess-3 addition; Feb-2021 QM and 40-gate
  XOR chain. DE-2025 C Q4(b) confirmed as D' (identity holds for D', fails for D).
