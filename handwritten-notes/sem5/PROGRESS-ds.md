# Distributed Systems — Sem 5 — Progress

Completed 2026-11-24.

## Deliverables

- **Notes:** `Distributed-Systems-Sem5-Handwritten-Notes-Full.pdf` — **148 pages, A4**, 64,437 words.
  Unit 1 pp2–36, Unit 2 pp37–56, Unit 3 pp57–70, Unit 4 pp71–81, Unit 5 pp82–97,
  "70 Most Important Questions — University Exam" pp98–148 (70 questions, 21 starred).
- **Coverage:** `Distributed-Systems-coverage-check.md` — 129/129 source headings covered, 91/91 expansion keys present.
- **PYQ solutions** (`~/workspace/handwritten_notes/pyq-solutions/sem5/`):
  - `DS-2025-solution.pdf` — **14 pages, 22 questions** (Part A 10×2, Part B 7×4, Part C 5×10, all solved).
  - `DS-2026-solution.pdf` — **13 pages, 22 questions** (same structure, all solved).
  - DS-2022 (16 pages) and DS-Aug-2023 (14 pages) were solved earlier by a separate add-on worker; not rebuilt here.

## Sources

- `notes-source/notes/sem5/distributed-systems/ds-unit-1.pdf` (44p) through `ds-unit-5.pdf` (19p) — 139 source pages total.
- PYQs read in full from scans: DS-2025 (3 pages), DS-2026 (4 pages).

## Quality checks run

- Garble scan on all three PDFs: 0 camelCase joins, 0 comma-joins, none of the known bad patterns
  (ofthe/tothe/Whenevery/moreoverhead/Specifications/Cycle = deadlock/Casual consistency/itis/butin/rely ona/Timestamp ing).
- Visual inspection of rendered pages: notes pp2, 30, 45, 60, 75, 90, 110; solutions DS-2025 pp1, 3, 8, 13–14;
  DS-2026 pp1, 7, 13. Style confirmed: Patrick Hand, blue ink, black underlined headings, red key terms/boxes,
  unlined white A4, ~1.5 cm margins, unit header top, page number bottom; diagrams labelled and legible
  (snapshot timeline, RMI/CORBA chains, cache, DSM, NUMA, DCE, Byzantine, failure chain).
- All 105 topic keys used across the 70Q bank and both solution papers return non-empty answers.
- Defects found and fixed during this build: "moreoverhead" sanitizer prefix bug; duplicated lecture/section
  headings ("CORBA RMI", "Distributed system memory"); 2-mark answers that had only an example and no
  definition box (definition fallback from expansions added); "Common mistake: Common mistake:" duplicated
  label; garbled source sentences repaired (central-server bullet, full-replication bullet, physical-clocks
  bullet, memory-consistency-model paragraph).

## Flags printed in the solution PDFs

- **DS-2025:** Part A Q.9 is printed as "Distinguish between fault and facture." — answered as fault and failure.
  Minimum passing marks left blank in the paper.
- **DS-2026:** Part A Q.8 printed as "What is week consistency?" — answered as weak consistency.
  Part A Q.10 printed as "What is the main purpose of COBRA?" — answered as CORBA.
  Part C Q.4 and Q.5 have no marks printed — solved as 10-mark questions (Part C scheme 3×10=30).
  Minimum passing marks left blank in the paper.

## Gaps

None. Every question in both papers is solved; no paper was left incomplete.
