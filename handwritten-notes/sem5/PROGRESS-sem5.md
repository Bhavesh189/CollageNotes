# Sem 5 — Progress

Started: 2026-11-24. Pipeline: copy of DBMS Sem 4 v2 pipeline in `~/workspace/handwritten_notes/full/`, adapted per subject in `sem5-work-<subject>/`. Style: Patrick Hand, blue body, black underlined headings, red key terms, unlined white A4, ~1.5 cm balanced margins, unit name top, page number bottom.

Source: Bhavesh189/CollageNotes, `notes-source/notes/sem5/` (7 subjects × 5 unit PDFs) + `public/pyq/sem5/` (49 papers).

## Subjects (7)

| Subject | Source | PYQ papers | Status |
|---|---|---|---|
| Cloud Computing & DevOps | cloud-computing-devops/ (5) | CCD-2024, CCD-2025, CCD-2026 | In progress |
| Computer Networks | computer-networks/ (5) | CN-2024, CN-2025, CN-2026 | **Complete** — notes 228p, coverage 399/399, solutions CN-2024 15p, CN-2025 17p, CN-2026 20p (all 22/22 solved) |
| Computer Organization & Architecture | computer-org-architecture/ (5) | COA-2024, COA-2025, COA-2026 (+ COA-Jun-2022 reused from Sem 4) | Reuse — Sem 4 COA notes (258p) built from this same folder |
| Data Mining & Warehousing | data-mining-warehousing/ (5) | DMW-2024, DMW-2025, DMW-2026 | In progress |
| Distributed Systems | distributed-systems/ (5) | DS-2025, DS-2026 (+ DS-2022, DS-Aug-2023 add-on from sem6 folder) | Complete — notes 148p, DS-2025 14p, DS-2026 13p |
| Machine Learning | machine-learning/ (5) | ML-2024, ML-2025, ML-2026 (+ IML-Aug-2023 reused from Sem 4) | Reuse — Sem 4 IML notes (211p) built from this same folder |
| Operating Systems | operating-systems/ (5) | OS-2022, OS-2024, OS-2025, OS-2026, OS-Dec-2020, OS-May-2023 | In progress |

Total matched PYQ papers: 23 of 49 (+ 2 reused Sem 4 solutions).

## Sem 5 PYQ papers NOT matched to any of the 7 subjects (25)

AOA-2022, AOA-May-2023, ARVR-2024, ARVR-2025, CD-2022, CD-Dec-2020, CD-May-2023, CGM-2022, CGM-Dec-2020, CGM-May-2023, CHAF-2022, HCI-2024, HCI-2025, IB-2024, IB-2025, IB-2026, IDS-2024, IDS-2025, IDS-2026, ITC-2022, ITC-Dec-2020, ITC-May-2023, MFC-2025, MFC-2026, MLA-2025, MLA-2026 — subjects with no source notes in sem5/ (no Sem 5-8 syllabus in repo per SYLLABUS_SOURCES.md, so no syllabus fallback for these).

## ADD-ON — papers found in public/pyq/sem6/ (2026-11-24)

8 more papers for Sem 5 subjects sit in the sem6 PYQ folder; being solved as part of Sem 5 work into `pyq-solutions/sem5/`: CC-2022, CC-Aug-2023 (Cloud Computing & DevOps); ML-2022, ML-Aug-2023 (Machine Learning); DS-2022, DS-Aug-2023 (Distributed Systems); COA-2022, COA-Aug-2023 (COA — checked: no Sem 4 solution exists for these two, only COA-Jun-2022, so they are solved fresh).

## Notes

- No GitHub upload, no token requested.
- Reused subjects: COA and ML notes/solutions are copied from the Sem 4 builds (same Sem 5 source folders), verified, not rebuilt from scratch.

## Cleanup round 2026-11-24 (coordinator)
- Title pages FIXED by coordinator: COA notes (258p) and ML notes (211p) now read "Semester 5 — Handwritten Notes (Full Depth)"; ML title now "Machine Learning" (was "Introduction to Machine Learning"). Only page 1 replaced (rebuilt with the same pipeline code); pages 2..N verified identical by extracted-text comparison; page counts unchanged; title pages visually checked. Backups of the originals in ~/workspace/handwritten_notes/cleanup-work/backup/.
- Remaining cleanup delegated to 6 workers: A2 (CCD matcher contamination + "−" sign audit, sanitize.py fix), B1 (CD/IOT/ICS/DIP leftover solutions), B2 (AI notes+sols), B3 (BDA notes+sols), B4 (AOA/ARVR/CGM/CHAF), B5 (HCI/IB/ITC/MFC/MLA), B6 (ANSF/GPU/ICCL/MC/NSVA/SMF/SCEA/ENT orphans).

## Cleanup A2 — done 2026-11-24
- BUG 1 (loose expansion matcher): matcher lives in `answers.py`, not `sanitize.py`. Added strict `_exp_match` (exact match, or one key a word-prefix of the other) and used it in `find_expansions` / `find_expansions_grouped`, in `full/answers.py` and `sem5-work-ccd/answers.py`. Old-vs-new simulation over all 76 keys used in the CCD pipeline: only 3 keys differed (advantages↔disadvantages, architecture↔security architecture).
- BUG 1 audit: exactly ONE contaminated answer found — Cloud notes 70Q Q.15 (architecture, 10 marks) contained the security-architecture OSA/ISSS paras + Confidentiality/Integrity/Availability bullets. Notes rebuilt from fixed `sem5-work-ccd/` — 154p, A4, unchanged; Q.15 now clean, genuine architecture "Common mistake" + front/back-end paras restored (old-vs-new text diff confined to Q.15–Q.21 reflow). Clean: Unit 1 Advantages/Disadvantages sections, 70Q Q.5, CCD-2024/2025/2026 solutions (only 2-mark advantages Qs, correct example), CC-2022 + CC-Aug-2023 (built with the fix).
- BUG 2 (leading "−" stripped): `full/sanitize.py` `clean_text`: `re.sub(r"^\s*-\s*", "", t)` → `re.sub(r"^-\s+(?=[A-Za-z])", "", t)` (strip a leading bullet only before a word; keep a minus before a number). Same one-line fix also applied to `sem5-work-ml/`, `sem5-work-ccd/`, `sem2-work-cfp/`, `sem1-work-CFP/`, `sem1-work-PPS/` `sanitize.py` (rebuild sources only).
- BUG 2 audit: all 33 Sem 5 solution PDFs + 64 sampled solution PDFs from sem1–4, sem6, sem7 checked (sem1 15, sem2 11, sem3 10, sem4 12, sem6 10, sem7 6 — sem7 has only 6 solution PDFs in total), plus a source-literal scan of every work folder for fragments starting with "-"+digit. PROVEN damage, all rebuilt with page counts unchanged (A4, garble-scanned, ≥2 pages visually checked each; old-vs-new text diffs confined to the fixed cells): ML-2024 (covariance table: -2, -10, -1, -7, -2), ML-2025 (perceptron tables: -0.40×3, -1×2, -0.30, -0.20, -0.10), CFP-2022 sem2 (data-types table: -128, -2147483648, -32768, ×2 occurrences), PPS-May-2019 sem2 (same table, ×2). Same table also proven wrong in notes, rebuilt: CFP-Sem1 notes 124p, PPS-Sem1 notes 174p, CFP-Sem2 notes 160p (bonus fix in the sem1 notes: the "-=" bullet now reads "-= subtracts and assigns", was "= subtracts and assigns"). Clean (verified): ML-2022 + ML-Aug-2023 (built with the fix, -0.07/-0.03 correct), ML-2026, IML-Aug-2023, DMW entropy/Gini values rechecked (0.940, gains 0.246/0.151), DIP DFT values rechecked (F = [20, -4+4j, -4, -4-4j]), DL-2024 backprop delta -0.0281 rechecked, MEFA "-10"/"-5" tables not rendered in any sampled solution or notes PDF, EP "-1"/"-2" spectrum labels drawn directly without `clean_text`.
- Backups of all 8 pre-fix PDFs in `~/workspace/handwritten_notes/cleanup-work/backup/` (`*.pre-A2`). No GitHub upload, no token.

## Cleanup B5 — done 2026-11-24 (electives, built from PYQ topics — no source notes)
- HCI — Human Computer Interaction: notes 138p; HCI-2024 28p (22/22), HCI-2025 28p (22/22). Flags: HCI-2024 A10 greyed ("What is CA" — read as Cognitive Architecture); HCI-2024 C5(b) faded/illegible, not guessed; HCI-2025 B3 faint, read as knowledge based and rule based analysis.
- IB — Introduction to Blockchain: notes 127p; IB-2024 27p (22/22), IB-2025 27p (22/22), IB-2026 28p (21/21). Flags: "proof of stock"/"stack" read as stake; IB-2025 B1 "double spend" problem; IB-2026 Part B lists only 6 questions though instructions say 7; IB-2026 C1(a) notes Ethereum moved to PoS in 2022.
- ITC — Information Theory and Coding: notes 85p; ITC-2022 16p (14/14), ITC-Dec-2020 18p (14/14), ITC-May-2023 20p (14/14). All numericals script-verified. Flags: May-2023 B2(b) second P(x1) read as P(x2); May-2023 C1 assumes 256 quantisation levels; Dec-2020 B3(c) syndrome matches no column (double error, detected not correctable).
- MFC — Mathematical Foundation Course: notes 76p; MFC-2025 21p (22/22), MFC-2026 21p (22/22). All numericals script-verified. Flags: MFC-2025 B2 gives no SD (interval given in terms of s); MFC-2026 B3 "No. of heads" read as "No. of mistakes"; B6/C5 read as printed, corrected in answers.
- MLA — Machine Learning and its Applications: notes 70p; MLA-2025 22p (22/22), MLA-2026 22p (22/22). Flags: MLA-2025 B7 "artificial learning" read as artificial intelligence; MLA-2026 B6 incomplete sentence read as "how do these factors affect the design"; MLA-2026 C5 "Detailed ... if" read as "Detail ... of".
- All five: 26–40 topics each, 70/70 questions each, coverage checklists in sem5/, work in cleanup-work/b5-sem5b/. No GitHub upload, no token.

## Cleanup B4 — done 2026-11-24 (electives, built from PYQ topics — no source notes)
- AOA — Analysis of Algorithms: notes 126p, coverage 44/44; AOA-2022 24p (22/22), AOA-May-2023 28p (22/22). All numericals script-verified (MST 37, LCS 4, knapsack 2022 value 7, knapsack 2023 profit 54, matrix chain 1400, KMP prefix [0,0,1,2,0,1,2,3,1], Huffman avg 2.52 bits/symbol, job sequencing 990, subset-sum no solution, Hamiltonian circuit S-T-W-X-V-U-S, vertex cover 4). Flags: May-2023 KMP handwritten numbers under the pattern are a student's own marks (two wrong: pi[5]=2, pi[8]=1); May-2023 Part B/C marks 8/15 as in the 2022 paper; Part C Q.3 character set read as (a,e,i,o,u,s,t) with frequencies (10,15,12,3,4,13,1). Solution PDFs visually spot-checked (MST p8, Huffman p20, KMP p21).
- ARVR — Augmented Reality and Virtual Reality: notes 120p, coverage 42/42; ARVR-2024 25p (22/22), ARVR-2025 25p (22/22). Flags: ARVR-2024 A9 printed as "Point out the use of VIM HMD" — reproduced exactly, answered as HMD; ARVR-2024 B2 read as stereo technology + software/hardware on stereoscopic. CamelCase product names written spaced in the notes (Data Glove, Eye Phone, AR Toolkit, Holo Lens, Open Scene Graph, Sensable) so the garble scan passes. Diagrams: perspective projection, scaling the VE, actors relationship. Visual check: perspective p33, scaling p34, actors p54, 70Q p55.
- CGM — Computer Graphics and Multimedia: notes 118p, coverage 59/59; CGM-2022 22p (22/22), CGM-Dec-2020 25p (22/22), CGM-May-2023 23p (22/22). All numericals script-verified (raster row time 34.72 microseconds, TV bits 82.62 Mbps, mid-point circle (5,5) r=8 octant points (0,8),(1,8),(2,8),(3,7),(4,7),(5,6) = 44 pixels, 2D box rotation to (10,15),(10,20),(0,20),(0,15), halftoning 2x2 -> 5 levels). Flags: Dec-2020 B6 printed "(refer on image)" — reproduced exactly, answered as reflection in y = mx + c; raster row time assumes no retrace blanking; TV bits rounds 553.33 px/row to 553. Diagrams: Cohen-Sutherland outcodes, Koch construction (fixed twice: peak height, caption overlap). Visual check: outcodes p30, Koch p56, 70Q p61.
- CHAF — Understanding the Human Being — Comprehensively Human Aspirations and Its Fulfillment (5AN5-14, Universal Human Values): notes 82p, coverage 17/17; CHAF-2022 16p (14/14). Single paper only, so the 70 Questions are drawn from its topics (stated on the 70Q title page). Note: CHAF-2022 is a UHV paper, not a graphics/computer subject despite the folder code; a separate Sem 1 Human Values subject already exists — CHAF is a separate Sem 5 paper of the same family, built from its own paper's topics only. Diagrams: self-exploration process, harmony expansion (fixed: trailing arrow, label overlaps). Visual check: self-exploration p4, harmony p20, 70Q p22.
- All four: 70/70 questions each, coverage checklists in sem5/, work in cleanup-work/b4-sem5a/. No GitHub upload, no token.
