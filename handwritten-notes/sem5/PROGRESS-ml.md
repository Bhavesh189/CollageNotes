# Machine Learning (Sem 5) — Progress

Completed: 2026-11-24. REUSE task — notes copied from the Sem 4 Introduction to Machine Learning build (same source folder), NOT rebuilt. Three new Sem 5 PYQ solution PDFs built fresh.

## 1. Source verification — REUSE VALID (byte-identical)

Fresh downloads from `https://raw.githubusercontent.com/Bhavesh189/CollageNotes/main/notes-source/notes/sem5/machine-learning/ml-unit-{1..5}.pdf` compared (md5) against the files the Sem 4 IML build used in `~/workspace/handwritten_notes/sem4-work/iml/src/`:

| Unit | Fresh download | Sem 4 build copy | Pages | md5 match |
|---|---|---|---|---|
| ml-unit-1.pdf | 2,206,658 B | 2,206,658 B | 32 | YES — b9cefe924ba4ab6a3a523f535136e949 |
| ml-unit-2.pdf | 2,339,893 B | 2,339,893 B | 34 | YES — 71fbc3a362afd3e56ffc66e93028a210 |
| ml-unit-3.pdf | 2,451,813 B | 2,451,813 B | 36 | YES — 6b0da873dd4bf9e57dd789bccda96e93 |
| ml-unit-4.pdf | 2,246,955 B | 2,246,955 B | 26 | YES — 3c4f845b0bb598acbed8f05148897223 |
| ml-unit-5.pdf | 2,084,247 B | 2,084,247 B | 32 | YES — 0e3d8d33738ffe870e5668143bf8a879 |

Total 160 source pages. All 5 units byte-identical, so the Sem 4 notes cover the Sem 5 subject exactly. (First parallel download of units 1–3 came down truncated; re-downloaded sequentially and then matched.)

## 2. Notes — REUSED (copied, not rebuilt)

- `~/workspace/handwritten_notes/sem5/Machine-Learning-Sem5-Handwritten-Notes-Full.pdf` — 211 pages, A4, md5-identical to the Sem 4 file.
- `~/workspace/handwritten_notes/sem5/Machine-Learning-coverage-check.md` — copy of the Sem 4 coverage check with a header noting it is the Sem 5 copy of the Sem 4 IML build. Coverage: 310/312 source sections (the 2 "gaps" are explained in the check: KNN heading covered under a spaced variant; Unit 4 Lecture No.8 is a content-free marker).
- **Title page says: "Introduction to Machine Learning" / "Semester 4 — Handwritten Notes (Full Depth)".** The Sem 5 subject is called "Machine Learning". The file was copied unchanged per the task (not silently rebuilt) — the title mismatch is noted here and in the coverage check header. The title-page source line itself correctly cites `notes-source/notes/sem5/machine-learning`.
- Visual check: title page + pages 30 (Unit 2, K-Means), 100 (Unit 5, Recommender Systems), 180 (70 Questions, Q-Learning) inspected — clean handwriting, no garbled joined/split words.

## 3. PYQ solutions

| Paper | Status | Pages | Questions solved |
|---|---|---|---|
| IML-Aug-2023 | REUSED (copied from sem4, md5-identical) | 20 | 23 (as built) |
| ML-2024 (B.Tech V Sem, 2023-24, 5CS4-05, 70 marks) | Built fresh | 21 | 22 (Part A 10×2, Part B 7×4, Part C 5×10) |
| ML-2025 (B.Tech V Sem Main/Back 2024-25, 5CS4-05, 70 marks) | Built fresh | 21 | 22 (Part A 10×2, Part B 7×4, Part C 5×10) |
| ML-2026 (B.Tech V Sem Main/Back 2025-26, 5CS4-05, 70 marks) | Built fresh | 19 | 22 (Part A 10×2, Part B 7×4, Part C 5×10) |

All three new papers are scanned-image PDFs (no text layer) — read visually page by page (Step 0). Every question is written first exactly as printed (incl. marks), then answered below it. All 22 question texts per paper verified present in the built PDFs (automated fragment check). Sample pages visually inspected per paper (incl. K-means table p15, MLP backprop p20, complete-link dendrogram p16, kNN table p5, Apriori/FP-growth p18) — clean, no garble.

Numericals re-checked by independent computation before writing:
- ML-2024 C1 K-means (m1=2, m2=4): converges in 5 iterations to Cluster 1 {2,3,4,10,11,12} centroid 7.0, Cluster 2 {20,25,30} centroid 25.0. (First hand pass was wrong — script-verified.)
- ML-2024 C2: covariance 12 (population; 15 sample), r = 0.9811.
- ML-2025 C1 complete-link dendrogram: merges at 0.12 (A,B), 0.14 (C,D), 0.61 (F joins AB), 0.70 (E joins CD), 0.93 (all). Custom dendrogram diagram drawn to scale.
- ML-2025 C2 neuron: z = 0.45, y = sigmoid = 0.6106.
- ML-2025 C5 perceptron AND (w1=0.5, w2=0, theta=0.4, alpha=0.2): after the two asked-for epochs w1=0.5, w2=0.4, theta=0.4 — NOT yet converged; converges after two more epochs (stated in the solution).
- ML-2026 B1 kNN (k=3): three-way distance tie at 1.4142; votes 2–1, predicted class 1.
- ML-2026 C4 Apriori/FP-growth (min support 2): frequent itemsets {A} (3), {C} (2), {A,C} (2).
- ML-2024 C5 MLP 4-2-1 backprop (assumed weights, lr=0.8): forward o=0.5644, E=0.0949; updated v=[0.4523, −0.2471], hidden weights/biases shown in full. Custom 4-2-1 diagram drawn (the generic 3-3-1 diagram was wrong for this question and was replaced).

## 4. Unclear / flagged questions (also printed at the end of each solution PDF)

- ML-2024: Part A Q.4 printed "feahres"/"become"; Part C Q.1 printed "ito two graps"/"distance fuction"; Part C Q.4 printed "valve iteration" (read as "value iteration"). K-means point 3 is equidistant (1) from both starting centroids — assigned to m1, tie stated.
- ML-2025: Part C Q.5 printed "with two iteration consider the perceptron having with..." — read as two full epochs over the four AND examples; bias theta=0.4 used as threshold (net = w·x − theta), convention stated in the solution.
- ML-2026: Part C Q.5 printed as one 10-mark question with (a) SVM [5] and (b) Random Forest [5] — solved as two 5-mark halves.
- No paper was left unsolved; no question was skipped. All 3 papers + the reused IML-Aug-2023 solution are complete.

## 5. Work folder / pipeline

- `~/workspace/handwritten_notes/sem5-work-ml/` — copy of `sem4-work/iml/` (the sem4-work copy was not modified). `build_solutions.py` OUTDIR changed to `pyq-solutions/sem5` (also fixed a path-depth bug: first build landed in `~/workspace/pyq-solutions/` and was moved to the right folder; rebuild confirmed landing in `pyq-solutions/sem5`). `pyq/` holds the three fresh PYQ PDFs.
- Added for these papers: 14 new PYQ_ONLY entries (covariance, hypothesis space, low bias, manifold/cluster assumptions, on/off-policy, policy, profile learner, filtering component, hinge loss, pattern base, bootstrap sample, without-Bellman), 8 CUSTOM numerical/design blocks, 3 PAPERS entries, a custom complete-link dendrogram flowable and a 4-2-1 neural-net flowable.

## 6. Gaps / notes for parent

- The notes PDF title says Semester 4 / Introduction to Machine Learning (see §2). If BHAVESH wants the title page to say Semester 5 / Machine Learning, that is a rebuild of the title page only — not done here, per the reuse instruction.
- No GitHub upload, no token requested.
