# Sem 2 — Progress — ✅ COMPLETE (2026-11-24)

Started: 2026-11-24. Pipeline copied from DBMS v2 (`full/`) to `sem2-work/`; each subject works in its own `sem2-work-<subject>/` copy. Style: Patrick Hand, blue/black/red, unlined white A4, ~1.5 cm margins.

**FINAL TOTALS (verified by parent with pdfinfo): 10 notes PDFs = 1,377 pages; 38 solution PDFs = 659 pages; all 38 Sem 2 PYQ papers solved (38/38).** No subject left incomplete. Nothing uploaded to GitHub, no token requested.

**Open items for the parent to decide (not blockers):**
1. Communication Skills: 3 small topics beyond the source file (~5p) — keep or remove?
2. CFP notes: inline code-as-prose fragments on Unit 2–5 pages (e.g. p65) — cleanup pass or leave (correct code blocks exist elsewhere)?
3. Chemistry notes: 3 near-empty pages (p55, p60, p84) — reflow pass or accept?
4. BEE p24: transformer caption/formula lines sit very tight (readable).
5. EM2 repair done and verified; Python p47 slice error fixed and verified.

SCOPE EXPANSION (2026-11-24): BHAVESH said build everything, including subjects with no Sem 2 notes folder — search the whole repo for scattered notes first, else build from the official BTU syllabus (`public/syllabus/sem1/syllabus.pdf` = First Year Sem 1+2, 32 pages; local copy in `sem2-work/scope/`).

## Subjects with Sem 2 notes folders (original batch)

| Subject | Source files | PYQs assigned | Status |
|---|---|---|---|
| Engineering Mathematics-2 | 5 (em2-unit-1..5) | EM2-2023, EM2-2024, EM2-2025, EM2-May-2019 | ✅ DONE — notes 81p (was 78, +3 after repair), coverage 52/52, solutions 8+8+8+8=32p, 22 questions each. ✅ REPAIR VERIFIED BY PARENT: notes pp33 & 39 re-checked visually — change-of-order examples now complete with correct limits/answers ((e−1)/2, a⁴/24, split at y=1), solenoidal/irrotational complete. Repair fixed broken integral notation across Units 1,2,4,5 + 70Q Q46/Q48/Q67/Q68 + 2024 Q4 + thin 2025 C1/C2 answers. Unit 3 source corrupt in repo — built from syllabus. EM2-May-2019 old-scheme (DEs/PDEs outside syllabus) — solved as printed and flagged. Flags: 2024 A5 "zero" faint; 2023 C5 φ last term read as cz²x² (alternative noted). |
| EME | 5 (Unit 1-5) | EME-2022, 2023, 2024, 2025 (+ BME-2022, BME-May-2019, ME-Jun-2022 if same subject) | ✅ DONE — notes 147p, coverage 83/83, solutions 7 papers, 120p total, 155 entries. Verified by parent (notes p70 + ME-Jun-2022 p5 clean). BME/ME confirmed same subject (old-scheme Basic Mechanical Engg, code 2FY3-07). Flags: EME-2025 Part A Q.5 wording unclear (read as "air standard cycle"); EME-2024 Part C Q.2 solved as reversible adiabatic compression, assumption stated. |
| MEFA | 5 (mefa-unit-1..5) | MEFA-2022, MEFA-2024, MEFA-2025 | ✅ DONE — notes 155p, coverage 332/333 headings (1 gap is only a lecture marker "LECTURE 33 / Net and Gross Profit Ratio:" whose content is covered; effective 333/333), solutions 25+16+16=57p, 66 questions. Verified by parent (notes p40 + MEFA-2024 p10 clean; ratio arithmetic checks out). Flags: 2022 C Q.3 Debtors "10,00,00" read as Rs. 1,00,000; 2024 C Q.1(x) repeats (vi) — solved as printed. Source error corrected: Unit 3 BEP 10,000 units → correct 1,000 units. |
| IBE | 7 (ibe-unit-1..5 + UNIT-1 NOTES + UNIT 3,2,4) | IBE-2022, IBE-2023 | ✅ DONE — notes 148p, coverage 105 headings + every BTU syllabus item ticked, solutions 26+18=44p, 44 questions, no unclear flags. BCE correctly NOT solved (different subject; overlap analysis in checklist). Verified by parent (notes p40 + IBE-2022 p10 clean; counts match). Judgement calls documented: Unit 5 "passive thermal control" source text is about spacecraft (copy-paste error) — notes teach building passive controls instead, with a tip noting this. |
| Physics | 6 (Units 1-5 + PhysicsIMP) | EP-2022, EP-2023, EP-2025, EP-May-2019 | ✅ DONE — notes 109p, coverage 61/61 headings + 15 extra sections, solutions 24+13+14+24=75p, 88 questions. PY-Jun-2022 correctly NOT solved (it is Python). Verified by parent (notes p12 + EP-2023 p5 clean; NA/intensity arithmetic checks out). 6 syllabus topics built from syllabus (diffraction, single-slit, grating, resolving power, particle in 3-D box, X-ray diffraction). Diagram defects found by agent and fixed (Young's slit, single-slit, grating, Hall, He-Ne). Flags: EP-2022 C5(b) Hall coefficient 10^-13 likely 10^-3; EP-2023 B1 Newton-ring λ=39200 Å likely misprinted; EP-2025 A4/A9/B4 as flagged. Caveat: background OCR died on /tmp full before finishing U4 pp23-24 and U5; agent read those pages visually instead — no content impact claimed. |
| Communication Skills | 1 (2ndseminpcomm.pdf) | CSK-2022, CSK-2022-2, CSK-2023, CSK-May-2019 | ✅ DONE — notes 115p, coverage 70/70, solutions 27+14+16+14=71p, 72 questions, no unclear flags. Verified by parent (p30 + CSK-2022 p1 clean). NOTE: 3 small topics beyond source disclosed in checklist (~5p: Formal Communication/Channels, Art of Persuasion, Obstacles to Reading) — parent to decide keep/remove. Source error corrected: "would buy" (source wrongly said "would have bought"). |

## Expansion subjects — built from scattered notes + syllabus

| Subject | Source found | PYQs assigned | Status |
|---|---|---|---|
| BEE (Basic Electrical Engineering) | Scattered: notes-source/notes/sem1/bee/ (5 files) + BTU syllabus §BEE | BEE-2022, BEE-2022-2, BEE-May-2019 | ✅ DONE — notes 99p, coverage: all 47 syllabus topics ticked (131 scattered source pages OCR'd); whole Unit 5 + alternator EMF eq + transformer on-load phasor + DC-machine EMF/torque eqs + TRIAC/UJT built from syllabus. 70Q 18 starred (strict rule). Solutions 17+17+11=45p, 62 questions. Verified by parent (notes p24 + BEE-2022 p9 clean; counts match). Minor cosmetic nit: p24 transformer diagram caption and formula lines sit very tight/near-overlapping — readable. Flags: BEE-2022 Part C 29 marks split 15+14 etc.; BEE-2022-2 bridge figure read as leads to A/B not a short (R_AB=4.5Ω); BEE-May-2019 Q.2(a) figure captioned Fig-7(b) vs "fig.4" in question. |
| CFP (Computer Fundamentals & Programming) | Scattered: notes-source/notes/sem1/computer/ (3 files) + BTU syllabus §CFP | CFP-2022, CFP-2023, CFP-2025 (+ PPS-May-2019 if same subject) | ✅ DONE — notes 160p, coverage 193/193 (155 source sections + 38 syllabus topics built from syllabus), solutions 26+18+16+16=76p, 80 questions. PPS confirmed SAME subject, solved. Verified by parent (notes p65 + CFP-2023 p1; counts match). ⚠️ QUALITY CAVEAT: notes p65 (and similar Unit 2-5 pages) embed source C programs as running prose — duplicated loops, lecturer footer inline, dangling "if (loc>=0) else" — legible but confusing as printed; agent says same programs also appear as proper code blocks in expansions. Parent to decide on a cleanup pass. Flags: CFP-2023 B Q.3 "in build" read as "in-built"; CFP-2025 B Q.3(i) z unassigned → garbage value. |
| Engineering Chemistry | Scattered: notes-source/notes/sem1/chemistry/ (13 files) + BTU syllabus §EC | EC-2025, EC-Jun-2022, EC-May-2019 | ✅ DONE — notes 185p, coverage 1,403 headings ticked; 9 syllabus topics built from syllabus (dry corrosion, Pilling-Bedworth, glass manufacture, lubricants, waste hierarchy etc.). Solutions 14+24+22=60p, 78 entries. Verified by parent (notes p60 + EC-Jun-2022 p12; counts match; NMR answers check out). ⚠️ LAYOUT CAVEAT: 3 near-empty content pages — p55 (69 chars), p60 (666 chars, "Unit of heat" only), p84 (447 chars) — topic page-breaks left mostly-blank pages; parent to decide on a reflow/cleanup pass. Flags: Jun-2022 Q.1(d) "Hook's Law" is a misprint for Beer's Law; Q.6(B) λ-max from structures only; May-2019 organic questions off-syllabus, solved in solutions only. |
| Python Programming (Sem 2) | Scattered: notes-source/notes/sem4/python-programming/ (5 files) | PY-Jun-2022 (PY = Python, confirmed from paper title page) | ✅ DONE — notes 178p, coverage 69/69, solution PY-Jun-2022 40p, 25 questions, all code executed/output-verified (7 errors caught & fixed pre-build). Verified by parent (notes p47 + solution p15 clean, code/output correct). p47 slice error FIXED and re-verified by parent: now reads "nums[-3:] gives the last three items [30, 40, 50]", 0 occurrences of [-4:-1] in PDF, still 178p. Mismatch noted: Sem 2 paper asks core Python only; Sem 4 source extras (NumPy, visualisation, regex) included in full and flagged in checklist; BTU 2021-22 syllabus has no Python theory course. |

## Old-scheme papers — solutions ONLY (no notes: no source notes anywhere, not in BTU 2021-22 syllabus)

| Paper | Subject | Reason |
|---|---|---|
| BCE-May-2019 | Basic Civil Engineering (2FY3-09) | Old scheme; IBE is its new-scheme successor but topics differ — ✅ solutions only DONE (14p, 14 questions, no unclear flags) |
| HV-May-2019 | Human Values (2FY1-05) | Old scheme HMSC; no notes anywhere — ✅ solutions only DONE (13p, 17 questions, English version solved, no unclear flags) |
| LADE-Jun-2022 | Linear Algebra & Differential Equations (2FV2-01) | Not EM2 (EM2 syllabus has no differential equations); no notes/syllabus section — ✅ solutions only DONE (12p, 25 questions, maths re-checked with SymPy; 1 flag: Part C Q.11 heat equation prints no initial temperature distribution, solved in general Fourier form) |

Verified by parent (LADE p1 + HV p5 clean). Note file: Old-Scheme-Papers-Note.md.

## Paper identifications verified by reading title pages
- PY-Jun-2022 = Python Programming (NOT Physics) — Physics agent corrected.
- LADE-Jun-2022 = Linear Algebra & Differential Equations, 140 marks — NOT EM2 — EM2 agent corrected.
- EC = Engineering Chemistry (2FY2-03). BME-2022 / ME-Jun-2022 = Basic/Mechanical Engineering = EME content (EME agent verifying). BCE-May-2019 = Basic Civil Engineering (IBE agent to report overlap only, NOT solve).

## Sem 2 PYQ inventory (38 papers in public/pyq/sem2/) — all now assigned
EM2 x4, EME x4 (+BME x2, ME x1), MEFA x3, IBE x2, EP x4, CSK x4, BEE x3, CFP x3 (+PPS x1 check), EC x3, PY x1, BCE x1, HV x1, LADE x1 = 38.

DBMS Sem 4 v2 (124 pages + 109 pages solutions) already delivered by parent — not part of this batch.
