# Sem 6 — Progress

Started: 2026-11-24. Pipeline copied from DBMS v2 (`full/`) to `sem6-work/`; each subject works in its own `sem6-work-<slug>/` copy. Style: Patrick Hand, blue/black/red, unlined white A4, ~1.5 cm margins.

Source: Bhavesh189/CollageNotes, `notes-source/notes/sem6/` (30 files, 6 subjects x 5 units) + `public/pyq/sem6/` (32 papers).

| Subject | Source files | PYQ papers matched | Status |
|---|---|---|---|
| Compiler Design (CD) | 5 (cd-unit-1..5) | CD-2024, CD-2025 (2) | DONE — notes 186p, solutions 17p + 19p, coverage 243/244 (1 fig-only section expanded via fallback) |
| Design & Analysis of Algorithms (DAA) | 5 (daa-unit-1..5) | DAA-2024, DAA-2025 (2) | In progress (subagent) |
| Digital Image Processing (DIP) | 5 (dip-unit-1..5) | DIP-2022, DIP-2024, DIP-2025, DIP-Aug-2023 (4) | DONE — notes 141p, solutions 11+16+15+11=53p, coverage 252/252 (14 non-syllabus fragments dropped) |
| Information & System Security (ISS) | 5 (iss-unit-1..5) | ISS-2022, ISS-2025, ISS-Aug-2023 (3) | DONE — notes 187p, solutions 15+15+10=40p, coverage 199/199 |
| Internet of Things (IoT) | 5 (iot-unit-1..5) | IIOT-2025 (1) + ADD-ON: IOT-Jul-2023 (found in public/pyq/sem8/) | DONE — notes 209p, solutions IIOT-2025 15p + IOT-Jul-2023 19p, coverage 481/481 |
| Natural Language Processing (NLP) | 5 (nlp-unit-1..5) | NONE in sem6 — solved NLP-2026 found in public/pyq/sem7/ (1) | DONE — notes 251p, solution NLP-2026 20p, coverage 255/255 |

| Design & Analysis of Algorithms (DAA) | 5 (daa-unit-1..5) | DAA-2024, DAA-2025 (2) | DONE — notes 239p, solutions 16+15=31p, coverage 393 headings, all 52 expansions present |

Total PYQ papers matched: 12 of 32 + 1 add-on (IOT-Jul-2023 from sem8) + NLP-2026 from sem7 = 14 solution PDFs, 214 pages.

## SEM 6 COMPLETE — all 6 subjects done
Notes total: 1,213 pages (CD 186, DAA 239, DIP 141, ISS 187, IoT 209, NLP 251). Solutions total: 214 pages, 14 PDFs.
Unmatched sem6 PYQ papers (20, other subjects): AI-2022, AI-2025, AI-Aug-2023, ANSF-2025, BDA-2025, CC-2022, CC-Aug-2023, COA-2022, COA-Aug-2023, DL-2024, DL-2025, DS-2022, DS-Aug-2023, GPU-2024, ICCL-2025, MC-2024, ML-2022, ML-Aug-2023, NSVA-2025, SMF-2024.

## Sem 6 PYQ papers NOT matched to any of the 6 subjects (20)

Belong to other subjects (electives / other semesters), not built here: AI-2022, AI-2025, AI-Aug-2023, ANSF-2025, BDA-2025, CC-2022, CC-Aug-2023, COA-2022, COA-Aug-2023, DL-2024, DL-2025, DS-2022, DS-Aug-2023, GPU-2024, ICCL-2025, MC-2024, ML-2022, ML-Aug-2023, NSVA-2025, SMF-2024.

No GitHub upload done — BHAVESH will give a token later; upload only after that.

## Cleanup round B2 — Artificial Intelligence (2026-11-24)
| Artificial Intelligence (AI) | None anywhere in repo (PYQ-built) | AI-2022, AI-2025, AI-Aug-2023 (3) | DONE — notes 102p (46 topics, 5 units + 70Q), solutions 13p + 14p + 15p = 42p, coverage 50/50 topics, questions solved 62/62 (15+22+25). Built from PYQ topics only. One defect found in verification and fixed: ∨/∧ symbols were missing from the symbol fallback map (blank in Aug-2023 Q5); fixed, rebuilt, re-verified. |

## Cleanup round B3 — Big Data Analytics (2026-11-24)
| Big Data Analytics (BDA) | None anywhere in repo (PYQ-built) | BDA-2025 (Sem 6, 6CS5-12), BDA-2022 (Sem 7, 7IT4-01), BDA-2022 (Sem 8, 8CS4-01), BDA-2025 (Sem 8 Back, 8CS4-01), BDA-Jul-2023 (Sem 8, 8CS4-01) (5) | DONE — notes 127p, ~56,078 words (54 topics, 5 units + 70Q, 34 starred), solutions 18p + 16p + 27p + 17p + 18p = 96p, coverage 54/54 topics, 56/56 expansions, questions solved 110/110 (22 each). Semester 6 chosen (current BTU code 6CS5-12; newest Main paper is the Sem 6 paper). All 5 papers verified distinct — no duplicates. Built from PYQ topics only. Three defects found in verification and fixed: (1) Java generics / Hive complex types silently eaten by ReportLab (`Mapper<LongWritable,…>` rendered as `Mapper`) — fixed with an `esc()` step in `helpers.py sym()`; (2) definition boxes cut mid-phrase ("…MySQL or.") — `_defn` now extends to the next sentence end; (3) repeated 70Q marked with `*` instead of ★. Garble scan clean (153 hits, all false positives: DataNodes/NodeManagers/TaskTrackers/NameNodes plurals, `fs.defaultFS`). Flags: BDA-2022-Sem8 Part B Q.7 printed "Explain how the hive client can be examine." (solved as printed); BDA-2025-Sem8 Part C instructions contradict themselves (4×15 vs "answer 3 of 5" — all 5 solved); BDA-Jul-2023 Part A Q.1 and Q.6 both ask "Explain secondary Namenode" (both solved). |

## Cleanup round B1 — leftover PYQ solutions (2026-11-24)
Solved 7 leftover papers for subjects whose notes already exist (no new notes built). Solutions total 119 pages, 154 questions solved (22 per paper), all verified by pdfinfo (A4) + garble scan (clean) + visual page checks.
- CD (Sem 6 Compiler Design, 5CS4-02, 120 marks): CD-2022 20p (26 entries/22 questions), CD-Dec-2020 17p (23 entries/22 questions), CD-May-2023 16p (22 questions). Flag: CD-Dec-2020 Part B Q.6 prints `int fun (in + N)` / `return o` — printing error for `int fun (int N)` / `return 0`; solved as the Fibonacci function.
- IoT (Sem 6 Internet of Things, 7CS4-01, 120 marks): IOT-2022 16p (22 questions), IOT-2025 20p (27 entries/22 questions), IOT-Feb-2023 14p (22 questions). Flags: IOT-2022 Part B Q.3 prints `NQTT` for MQTT; IOT-2025 Part A Q.8 prints `MOJT` for MQTT, Part C Q.1(a) prints `over N2M` for `over M2M`, Part C Q.2(a) has an extra word `of` in the question.
- DIP (Sem 6 Digital Image Processing): the sem7 DIP-2025 paper (B.Tech VII Sem IT, 7IT5-11, 70 marks) is a DIFFERENT paper from the already-solved Sem 6 DIP-2025 (VI Sem, 6CS4-04) — different semester, course code and all 22 questions — so it was solved as DIP-2025-2-solution.pdf, 16p (22 questions: Part A 10x2, Part B 7x4, Part C 5x10). Existing DIP-2025-solution.pdf (15p) untouched.
- Verification fixes made before delivery: (1) a fragmented IoT-A reference-model paragraph and an off-topic M2M paragraph had leaked into 7 IoT answers via the loose section matcher — replaced with clean customs (iot_ref_model, iot_layered_arch, sdn_advantages, sdn_arch_nfv, rest_adv_disadv, iot_security_challenges, contiki_features); (2) the definition-box picker (`_box_para`/`_defn` in answers.py) now scores paragraphs by key-word coverage and picks the on-topic sentence, and no longer splits sentences after `e.g.`/`i.e.`; (3) CD-2022 Q.1 now contrasts compiler vs interpreter (was a translator-only answer); CD-Dec-2020 DAG answer no longer mentions the CD-2024 paper's `c` printing error; CD-May-2023 compiler-phases answer rebuilt as a custom (six phases + symbol table + error handler). Existing solutions (CD-2024, CD-2025, DIP-2025, IOT-Jul-2023) not rebuilt or overwritten.
- Note for a later round: the pre-existing IIOT-2025 solution (not a B1 paper) has the same LiteOS-box defect in its Part C Q.3 security-challenges answer; it was left as-is because B1 only covers the 7 papers above.

## Cleanup round B6 — orphan subjects (2026-11-24)
Five single-paper subjects built from PYQ topics only (no source notes, no Sem 5-8 syllabus anywhere in the repo). Each: notes (Unit 1-5 + 70Q section, 50 questions — one paper asks 22 distinct questions, section adds closely-related questions from the same topics) + one solution PDF per paper. All verified: garble scan clean, pdfinfo A4, pages visually inspected.
| Application and Network Security Fundamentals (ANSF) | None (PYQ-built) | ANSF-2025 (1) | DONE — notes 65p (22 topics), solution 16p, coverage 22/22, questions solved 22/22. No flags. |
| GPU Computing (GPU) | None (PYQ-built) | GPU-2024 (1) | DONE — notes 66p (23 topics), solution 16p, coverage 22/22, questions solved 22/22. Flag: Part B Q.7 says "SVM algorithm of vector addition kernel method" as printed. |
| Introduction to Cyber Crime, Law and Investigation (ICCL) | None (PYQ-built) | ICCL-2025 (1) | DONE — notes 66p (17 topics), solution 18p, coverage 19/19 visible, questions solved 19/19. Flags: Part A Q.10 and Part B Q.6-Q.7 are missing from the scan (scan ends after Part B Q.5). |
| Network System Vulnerability Assessment (NSVA) | None (PYQ-built) | NSVA-2025 (1) | DONE — notes 70p (22 topics), solution 16p, coverage 22/22, questions solved 22/22. Flag: Part B Q.3 says "this test" without naming which test (answered as penetration-test methodology + session hijacking). |
| Statistical Modeling and Forecasting (SMF) | None (PYQ-built) | SMF-2024 (1) | DONE — notes 69p (22 topics), solution 16p, coverage 22/22, questions solved 22/22. Flags: Part B Q.3 printed "Error Correlation Models (ECM)" (standard name Error Correction Model); Part B Q.7 printed with broken grammar. Numerical answers verified: exponential smoothing {5,6,7,8,9} alpha=0.3 gives 5, 5.3, 5.81, 6.47, 7.23; Dickey-Fuller on {10,20,30,40,50} gives gamma=0 (unit root not rejected); BIC mean-only 22.78, linear-trend wins (RSS 0, degenerate). |
| Mobile Computing (MC-2024) | None (PYQ-built) | MC-2024 (1) | Solved under Sem 7 Mobile Computing — see PROGRESS-sem7.md (MC-2024 and MC-2026 are the same subject; one Sem 7 notes PDF, both solutions in pyq-solutions/sem7/). |
