# Data Mining & Warehousing (Sem 5) — Coverage Check

**Subject:** Data Mining & Warehousing, Semester 5
**Source:** `notes-source/notes/sem5/data-mining-warehousing/dmw-unit-1.pdf` … `dmw-unit-5.pdf`
(157 source pages: U1 37, U2 31, U3 40, U4 23, U5 26)
**Notes PDF:** `Data-Mining-and-Warehousing-Sem5-Handwritten-Notes-Full.pdf` — **186 pages, A4**
**Date:** 2026-11-24

## Method
Every heading from `source_u1.json` … `source_u5.json` (592 sections total) was checked
two ways: (1) heading string present in `covered.json` (the build's own record — 591 entries);
(2) first-paragraph content probe against the built PDF text. Remaining items were then
checked by hand with distinctive-word searches.

## Result: 592 / 592 source sections covered

| Unit | Source sections | Covered |
|------|----------------|---------|
| Unit 1 — Introduction to Data Mining & Data Warehousing | 138 | 138 |
| Unit 2 — Classification | 108 | 108 |
| Unit 3 — Clustering & Outlier Analysis | 205 | 205 |
| Unit 4 — Frequent Pattern Mining & Association Rules | 52 | 52 |
| Unit 5 — Advanced Topics, Applications & Social Impacts | 89 | 89 |
| **Total** | **592** | **592** |

Plus 63 curated expansions (worked examples, diagrams, tables, Exam Tips), the
70 Most Important Questions section (14 per unit, 36 starred as repeated in 2+ PYQ papers),
and 3 PYQ solution PDFs (66 questions solved).

## Items that needed a fix during the check (all fixed and rebuilt)
1. **Feature selection techniques (U1 L3)** — the source's `Techniques` fragment listed
   "filter methods, wrapper methods, and embedded methods" but the three methods were
   not explained anywhere in the notes. Added expansion `feature selection` (filter /
   wrapper / embedded, with example, Exam Tip, common mistake). Now present (p13).
2. **Contingency table for binary data (U3)** — the source section is only the intro line
   "Let us consider binary values 0 and 1"; the 2×2 table (a, b, c, d) and the
   simple-matching / Jaccard coefficients were missing. Added expansion
   `contingency table for binary data` with the table. Now present (p90).

## Deliberately not carried over (not topics)
- **Unit 1 Lecture 10** — near-duplicate of Lectures 8+9 (Data Transformation / Data
  Reduction / Discretization); dropped during extraction, content already covered.
- **Unit 5 `ADVERTISEMENT` section** — a pasted advert, not notes; dropped.
- **Unit 1 `User Interfaces, forms and reports` para** — list fragment "6) Query Processing
  and Query Optimization 7) Transactions…" continuing the DBMS-evolution timeline; the
  timeline itself is covered, the fragment is not a topic.
- **Unit 1 `Below are some data mining functionalities:` para** — para is only a bullet
  glyph; the functionalities are covered by the following sections and the expansion.
- **Unit 1 `Attribute` para** — raw table fragment "Age Age Age Age 1,5,4,9,7 …" (a figure
  that did not extract as a table); the attribute-values concept is covered in the
  surrounding discretization sections.
- **Unit 3 `Contingency Table` intro line** — covered by the new expansion above.

## Source quirks (kept as-is, noted here)
- **Unit 2 Lecture 4** contains a pasted remote-sensing / image-classification chunk
  (per-pixel classification, texture/context, different sensors — ~1,000 words, off-topic
  for DMW but in the source). It is rendered in the notes under the source's own
  "advanced classification method" headings; the expansion for that key covers it briefly.
- **Unit 1 Lecture 1** opens with leftover DBMS-evolution diagram text (1970s–1990s
  timeline). Rendered as the source has it.
- **Unit 4** is largely blog pastes (GeeksforGeeks-style Apriori / FP-Growth text) with
  broken English in places ("repeating arrangement prospecting" → corrected to
  "frequent pattern mining" at render time). Wording is the source's own.
- **Unit 5** repeats the Unit 1 data-mining introduction in places (source's own
  repetition); kept, not deduplicated beyond the pipeline's duplicate-para filter.

## Heading renames made during the build (same content, correct heading)
- U4 `DATA MINING?` → `Multilevel and multidimensional association rule mining`
  (its paragraph is the multilevel/multidimensional blog intro; the old generic heading
  was cross-matching every "… data mining" question in answers).
- U4 `Mining)` → `Apriori algorithm` (its paragraph is the Apriori introduction).
- U3 `Algorithm` → `ROCK algorithm` (its paragraph is the ROCK steps).

## Quality checks done (2026-11-24)
- Garble scan over all 4 built PDFs (long-token scan + short-join scan + known-join list):
  **0 joined/split words remaining.** Fixed ~90 joined words found in the source
  (e.g. `includebinning`, `categoricalattributes`, `appropriatefor`, `ofthe`,
  `themost`, `optimallysimilar`, `ofinterpretation`, `repeating arrangement prospecting`).
  Short-join fixes are applied with word boundaries only — an early plain-replace
  version corrupted `Histogram` into `His togram`; fixed and verified.
- Visual inspection of rendered pages from every unit and every solution PDF:
  title, U1 (KDD ladder p4, architecture, feature selection p13, histogram p26),
  U2 start p30, decision tree p36, backpropagation p53, U3 dendrogram area p69–70,
  contingency table p90, U4 Apriori, U5 p120, 70Q p150/p184, solutions 2024 p4–5,
  2025 p8, 2026 p9/p12. Diagrams verified: KDD ladder, decision tree, tables.
- Two answer-assembly bugs found and fixed: generic headings (`DATA MINING?`,
  `Algorithm`) were leaking into unrelated answers (Q.70 audio mining and Q.B2 ethics
  showed Apriori text; Apriori showed ROCK steps). Fixed by tightening `_match`
  (generic-heading stoplist) and scoring `_box_para` by distinctive topic words, plus
  the heading renames above. Re-verified: Q.70, 2024 B2, 2026 Q.7 all on-topic.
- Verified numbers re-checked: Bayes disease example 16.52%; BBN joint 0.000758;
  Apriori L1/L2/L3 with strong rules at 75%; closed vs maximal mini-example;
  K-means 2-iteration convergence; PlayTennis entropy 0.940, gains
  Outlook 0.246 / Humidity 0.151 / Wind 0.048 / Temperature 0.029; Naive Bayes
  PlayTennis predicts No (20.5% Yes / 79.5% No).

## PYQ papers solved (3/3, 66 questions, 0 unclear)
- DMW-2024 (5AD5-16, 2023-24, 70 marks): 22/22 solved — 17 pages.
- DMW-2025 (5CS5-16, 2024-25, 70 marks): 22/22 solved — 16 pages.
- DMW-2026 (5CS5-16, 2025-26, 70 marks): 22/22 solved — 17 pages.
- No unclear or illegible questions in any paper; nothing flagged.
