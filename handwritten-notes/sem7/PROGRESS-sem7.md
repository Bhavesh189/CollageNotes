# Sem 7 — Progress — ✅ ALL 3 SUBJECTS COMPLETE (verified by coordinator with pdfinfo + visual checks)

Source: Bhavesh189/CollageNotes, `notes-source/notes/sem7/` + `public/pyq/sem7/` (11 papers) + add-on papers found in sem6/sem8 folders.
Pipeline: copy of DBMS Sem 4 v2 pipeline in `~/workspace/handwritten_notes/sem7-work/`, adapted per subject in `sem7-work/<subject>/`.
Style: Patrick Hand, blue body, black underlined headings, red key terms, unlined white A4, ~1.5 cm balanced margins, unit name top, page number bottom.
No syllabus exists for Sem 7 in the repo (SYLLABUS_SOURCES.md) — fallback for any missing unit/subject is PYQ topics, clearly marked.

## FINAL TOTALS (verified by coordinator)
- **3 notes PDFs, 630 pages** in `~/workspace/handwritten_notes/sem7/` (DL 201 + DM 324 + GAI 105)
- **3 coverage checklists** in `~/workspace/handwritten_notes/sem7/`
- **6 solution PDFs, 100 pages** in `~/workspace/handwritten_notes/pyq-solutions/sem7/` (DL-2024 17, DL-2025-Sem6 21, DL-2025 12, DL-2026 15, DMG-Jul-2023 19, GAI-2025 16) — 127 questions solved in total
- **Grand total: 730 pages**

## Subjects (3) — all ✅ DONE

| Subject | Source files | PYQ papers matched | Status |
|---|---|---|---|
| Deep Learning | 5 (dl-unit-1..5, 165 pp) | DL-2025, DL-2026 | ✅ DONE — notes 201p (U1 pp 3–27, U2 pp 28–60, U3 pp 61–92, U4 pp 93–107, U5 pp 108–136, 70Q pp 137–201, 52 starred), coverage 271/271 headings, solutions DL-2025 12p/17Q, DL-2026 15p/22Q. Verified by coordinator (pdfinfo + visual p3/solution p1). FLAG: DL-2025 Part C Q.1–Q.5 NOT solved — p3 of the scan is a wrongly-bound Disaster Management paper; the real DL Part C is missing from the scan (questions listed verbatim in the solution's flags). DL-2025 Part A Q.4 wording unclear, answered as "What are hidden layers used for?", flagged. |
| Disaster Management | 5 (dm-unit-1..5, 243 pp) | DMG-Jul-2023 (found in public/pyq/sem8/, not sem7/) | ✅ DONE — notes 324p (Units 1–5 pp 1–261, 70Q pp 262–324), coverage 1,148/1,148 sections, solution DMG-Jul-2023 19p, 22/22 questions, 0 unclear. Verified by coordinator (pdfinfo + visual p5/solution p4). Flags: B-Q7 road accidents + C-Q2 textile industry + C-Q5(c) cloud burst not in source notes — solved in full in the solution PDF only, flagged there. 70Q draws on the paper (all 22 paper questions starred). |
| Generative AI | 3 (gai-unit-2..4, 87 pp; Units 1 & 5 missing) | GAI-2025 | ✅ DONE — notes 105p (U1 pp 2–9, U2 pp 10–27, U3 pp 28–35, U4 pp 36–43, U5 pp 44–52, 70Q pp 53–105, 45 starred), coverage 50/50 (33 source + 17 PYQ-built), solution GAI-2025 16p, 22/22 questions, 0 unclear. Verified by coordinator (pdfinfo + visual p2/solution p1). Note: gai-unit-3 is ~90% a repeat of gai-unit-2, covered once in Unit 2, not duplicated. |

Total PYQ papers in sem7/: 11. Matched to Sem 7 subjects: 3 (DL-2025, DL-2026, GAI-2025). Unmatched (other subjects — BDA/DIP/IoT/MC/NLP/SCEA, not Sem 7 subjects): BDA-2022, DIP-2025, IOT-2022, IOT-2025, IOT-Feb-2023, MC-2026, NLP-2026, SCEA-2026.
Repo-wide check (full git tree listing): no other generative-ai / gai-unit-1 / gai-unit-5 files exist anywhere in the repo; no Sem 7 syllabus exists.

## Add-ons (papers found in other semesters' PYQ folders)
- **DMG-Jul-2023** (public/pyq/sem8/, 3p, scanned) — Disaster Management paper; solution to be saved as pyq-solutions/sem7/DMG-Jul-2023-solution.pdf (DM worker).
- **DL-2024** (public/pyq/sem6/, 2p, VI Sem 2023-24, 61N2005, 6AD4-05 Deep Learning) and **DL-2025 Sem 6** (public/pyq/sem6/, 6p, VI Sem 2024-25, 61N2005, 6AD4-05 Deep Learning) — both genuine DL papers; solutions DL-2024-solution.pdf (17p, 22Q) and DL-2025-Sem6-solution.pdf (21p, 22Q) in pyq-solutions/sem7/, all 44 questions solved, 0 unsolved. NOTE: the Sem 6 DL-2025 is a DIFFERENT paper from the Sem 7 DL-2025 (VII Sem, 7CS4-01, 12p solution already exists as DL-2025-solution.pdf) — the Sem6 file is named DL-2025-Sem6-solution.pdf to avoid overwriting it. Flags (in the Sem6 PDFs): Part B Q.3 dataset is cats/dogs though the question says car vs. bike — solved per the dataset; Part C Q.2 no padding/stride stated — solved as valid convolution, stride 1; Part C Q.3 Fig. 1 node 5 output label faint, read as O1.
- **AI-2022, AI-2025, AI-Aug-2023** (public/pyq/sem6/) — checked visually: all three are "Artificial Intelligence" (6CS4-05/6CS5-11), B.Tech VI Sem — a Sem 6 subject, NOT a Sem 7 subject (Sem 7 has DL, DM, GAI only). NOT solved here; listed as unmatched. They belong to the Sem 6 Artificial Intelligence subject's scope.
- **Post-delivery fix by coordinator:** the add-on worker found a sanitizer bug ("Long Short-Term" protected with a tab that whitespace-collapse destroyed → "LSTM ( Memory)") that also affected the delivered DL-2026-solution.pdf. Coordinator rebuilt DL-2026-solution.pdf with the fixed sanitizer — still 15 pages, "LSTM ( Memory)" 0, "Long Short-Term Memory" 2×, visually re-checked. DL-2025-solution.pdf has no LSTM mentions and was unaffected. The same sanitizer fix is in sem7-work/dl/sanitize.py.
- **AI-2022, AI-2025, AI-Aug-2023** (public/pyq/sem6/) — checked visually: all three are "Artificial Intelligence" (6CS4-05/6CS5-11), B.Tech VI Sem — a Sem 6 subject, NOT a Sem 7 subject (Sem 7 has DL, DM, GAI only). NOT solved here; listed as unmatched. They belong to the Sem 6 Artificial Intelligence subject's scope.

## Notes
- GitHub API rate-limited during fetch (2026-11-24); sources fetched via sparse git clone / raw.githubusercontent.com instead.

## Cleanup round B6 — orphan subjects (2026-11-24)
Single-paper subjects built from PYQ topics only (no source notes, no Sem 5-8 syllabus anywhere in the repo). Each: notes (Unit 1-5 + 70Q section, 50 questions) + one solution PDF per paper. All verified: garble scan clean, pdfinfo A4, pages visually inspected.
| Mobile Computing (MC) | None (PYQ-built) | MC-2024 (Sem 6, 6IT4-04) + MC-2026 (Sem 7, 7CS5-11) (2) | DONE — one subject (both papers are Mobile Computing; notes in Sem 7, semester of the later paper), notes 90p (25 topics), solutions MC-2024 21p + MC-2026 16p, coverage 44/44, questions solved 44/44. Flags: "database hoarding", "existing solution.", "SDMA", "advantages and limitation" as printed. |
| Soft Computing and Evolutionary Algorithms (SCEA) | None (PYQ-built) | SCEA-2026 (1) | DONE — notes 68p (24 topics), solution 18p, coverage 22/22, questions solved 22/22. No flags. Part C Q.1 and Q.5 each cover two topics; both parts answered in full. |
