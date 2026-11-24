# Machine Learning (Sem 5) — Add-on: ML-2022 and ML-Aug-2023 solutions

Completed: 2026-11-24. Two extra PYQ papers solved as Part C solutions (same approved style: Patrick Hand, blue ink, black underlined headings, red key terms, unlined white A4, 1.5 cm balanced margins). Both papers are old-scheme VI Sem papers (120 marks) from `public/pyq/sem6/` — they are Machine Learning papers for the Sem 5 subject Machine Learning.

## Papers

| Paper | Pages | Questions solved |
|---|---|---|
| ML-2022 (B.Tech VI Sem Main 2021-22, 6CS4-02/6IT-02, 120 marks, 2.5 hours) | 35 | 22 (Part A 10x3, Part B 7x10, Part C 5x24) |
| ML-Aug-2023 (B.Tech VI Sem Main/Back Aug 2023, 6CS4-02, 120 marks, 3 hours) | 24 | 22 (Part A 10x2, Part B 7x8, Part C 5x15) |

Outputs:
- `~/workspace/handwritten_notes/pyq-solutions/sem5/ML-2022-solution.pdf` — 35 pages, A4
- `~/workspace/handwritten_notes/pyq-solutions/sem5/ML-Aug-2023-solution.pdf` — 24 pages, A4

Both papers are scanned-image PDFs (no text layer) — read visually page by page (Step 0). Every question is written first exactly as printed (incl. marks), then answered below it. All 22 question texts per paper verified present in the built PDFs (automated distinctive-word check). Sample pages visually inspected per paper — clean, no garbled joined/split words.

## Numericals re-checked by independent computation before writing

- ML-2022 C3 K-means (farthest-apart starts (1,1) and (5,7)): converges in 3 iterations to Cluster 1 {1, 2} centroid (1.25, 1.50), Cluster 2 {3, 4, 5, 6, 7} centroid (3.90, 5.10). Point 3 is equidistant (3.61) from both starting centres — tie assigned to C1, stated.
- ML-2022 C1 Naive Bayes (R, N, 3): raw scores H 0.0711 vs S 0; Laplace-smoothed H 0.0709 vs S 0.00705, normalised 91% vs 9% — predict Happy.
- ML-2022 C2 FP-growth: min-support 33.34% of 6 = 2.0004, so min count is 3, not 2 — Buns and Ketchup (count 2) are dropped. Frequent itemsets: {Hotdogs} (4), {Chips} (4), {Coke} (3), {Chips, Coke} (3). Strong rules (60%): Coke -> Chips 100%, Chips -> Coke 75%.
- ML-2022 B2 confusion matrix (golf, 3 classes): accuracy 7/10 = 70%. Per-class AUC (single-point, one-against-rest): Full 0.6667, Half 0.6905, No 1.00, macro 0.7857.
- ML-2022 C5 perceptron (w0=0.03, w1=0.01, w2=-0.04, eta=0.3, bias input -1): converges in 2 epochs, final weights (-0.27, 0.31, -0.34), boundary Y = 0.79 + 0.91X.
- ML-Aug-2023 C5 perceptron (w0=0.03, w1=-0.04, w2=0.04, eta=0.4, bias input -1): converges in 3 epochs, final weights (-0.37, -0.44, 0.04), boundary Y = 11X - 9.25 (NOT X).
- ML-Aug-2023 B7 Gini tree: root = Is there a party? (weighted Gini 0.28 vs Deadline 0.5167, Lazy 0.60); No branch splits on Deadline (0.20), then Lazy; all leaves pure, training error 0%.
- ML-Aug-2023 C1 entropy: H(Emotion) = 0.9911 bits; (i) H(Emotion | Wig=Y) = 1.00 bit; (ii) H(Emotion | Masks=3) = 0 bits; (iii) root = Color (gain 0.7689 vs Masks 0.1022, Wig 0.0026); (v) training error 1/9 = 11.11% (the two B records have identical inputs, opposite outputs); (vi) maximum training error 50%; (vii) 4-record, 1-input example achieving 50%.
- ML-Aug-2023 C4 Apriori: min count 2 (22% of 9 = 1.98). 13 frequent itemsets (5 singles, 6 pairs, 2 triples). Six strong rules at 70% confidence, all 100%: L4 -> L2, L5 -> L1, L5 -> L2, L5 -> {L1, L2}, {L1, L5} -> L2, {L2, L5} -> L1. {L1} -> {L2} is only 66.67% and fails.

## Unclear / flagged questions (also printed at the end of each solution PDF)

- ML-2022: Part C Q.2 says "five transactions" but the table lists six (T1–T6) — all six used. Part C Q.3 point (3.0, 4.0) tie (see above). Part C Q.5 "bias as -1" read as the bias input value, h = w0 x (-1) + w1 x X + w2 x Y (source-notes convention; converges in 2 passes). Part B Q.2 has three classes, so the matrix is 3x3 and AUC values are single-point estimates from hard predictions.
- ML-Aug-2023: Part C Q.4 every TID is printed as "T100" — read as T1–T9 in order. Part C Q.1 last two table rows are faint in the scan (R, N, 2, H and R, Y, 3, H) — readings cross-checked against the same dataset in ML-2022, where it is printed clearly. Part C Q.5 "bias as -1" read as the bias input value (same convention; converges in 3 passes). Part C Q.1 (vi)–(vii) do not use the example dataset, as the paper itself says.
- No paper was left unsolved; no question was skipped.

## Work folder / pipeline

- `~/workspace/handwritten_notes/sem5-work-ml-add/` — fresh folder. Seeded from `~/workspace/handwritten_notes/full/` as instructed, then overlaid with a read-only copy of the ML pipeline from `~/workspace/handwritten_notes/sem5-work-ml/` (answers/expansions/source for ML) — the `full/` copy is the DBMS pipeline, so ML topic answers would otherwise have drawn on DBMS content. Neither `full/` nor `sem5-work-ml/` was modified. `build_solutions.py` builds only the papers named on its command line, so no other solution PDF was touched.
- Added for these papers: 11 new CUSTOM blocks, 3 new PYQ_ONLY entries (type I/II errors, collaborative-filtering applications, recommender similarity techniques), 5 new diagram flowables (perceptron decision-boundary graph, FP-tree, Gini tree, entropy tree, ROC-curve plot).
- Two defects found by visual inspection and fixed before delivery: (1) the pipeline's `sanitize.clean_text` stripped a leading "-" from any text, turning table cells like "-0.07" into "0.07" — the rule in the fresh copy is now narrowed to strip a leading "- " bullet only before a letter, so negative numbers survive; (2) the new ROC-curve diagram's axis titles collided with the "No" point label and its own caption — redrawn with a vertical y-axis title and separated labels. Both PDFs were rebuilt and re-inspected after the fixes.
- No GitHub upload, no token requested.
