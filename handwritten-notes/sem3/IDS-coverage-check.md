# IDS Sem 3 — Coverage Check

**Subject:** Introduction to Data Science (IDS), Semester 3, AI & Data Science branches
**Paper code:** 3AD4-06 / 3DS4-06 / 3CD4-06, Common to DS, CD, AD
**Date:** 2026-11-24
**Source status: BUILT FROM PYQ TOPICS — NO SOURCE NOTES OR SYLLABUS IN REPO.**
There are no IDS source notes anywhere in the repo Bhavesh189/CollageNotes, and the
repo's syllabus PDFs (public/syllabus/sem1/syllabus.pdf = First Year; public/syllabus/sem3/syllabus.pdf
= CSE 3rd & 4th Sem, 2021-22 scheme) contain no Introduction to Data Science syllabus
(this is a new-scheme 2023-24 subject). The ONLY authoritative topic list available is the
PYQ papers themselves. The Unit 1–5 topic list below is therefore every topic examined in
the 3 papers, organised into 5 units following the papers' own structure. No topic that no
paper examines has been invented.

## Step 0 — Papers read in full (visual read of the scans + OCR cross-check)

- IDS-2024.pdf — B.Tech. III Sem Main/Back (New Scheme), 2023-24, 4 pages, 22 questions (Part A 10x2, Part B 7x4 answer 5, Part C 5x10 answer 3)
- IDS-2025.pdf — B.Tech. III Sem Main/Back, 2024-25, 3 pages, 22 questions (same pattern)
- IDS-2026.pdf — B.Tech. III Sem Main/Back, 2025-26, 4 pages, 22 questions (same pattern)

Total: 66 questions examined. Every one is solved in its solution PDF and covered in the notes.

## Coverage — every paper question vs the notes (66/66 covered)

Verified programmatically: each topic's key phrases were searched in the extracted text of
IDS-Sem3-Handwritten-Notes-Full.pdf. Result: 66/66 found. Two items were caught by this check
and fixed before delivery: (a) "How are data science and machine learning related" (2025 Part A Q9)
was only in the solutions — a full topic "How Data Science and Machine Learning Are Related" was
added to Unit 1; (b) "BeautifulSoup" was being split to "Beautiful Soup" by the inherited
camelCase sanitiser — the word is now protected and appears correctly (22 occurrences).

### IDS-2024 (22/22)
- [x] A1 Smallest and largest unit of data (bit / yottabyte) — Unit 1
- [x] A2 Data type in weather forecasting and air traffic control (real-time streaming time-series) — Unit 1
- [x] A3 N-gram representation with example — Unit 3
- [x] A4 Three Vs of Big Data — Unit 1
- [x] A5 Quartiles Q1=3.5, Q2=5, Q3=10.5 (data 1,4,12,4,2,5,7,13,5,17,8,9,3) — Unit 3
- [x] A6 Data profiling vs data analytics — Unit 2
- [x] A7 Cosine similarity superior to Euclidean distance — Unit 4
- [x] A8 Big data challenges + techniques — Unit 1
- [x] A9 REST API and data collection — Unit 2
- [x] A10 Cross-validation and its types — Unit 4
- [x] B1 Handling missing data + imputation techniques — Unit 3
- [x] B2 Regression coefficient of X on Y = 0.857 (X 1-7, Y 9,8,10,12,13,11,14) — Unit 4
- [x] B3 Data analytics, capabilities, pyramid architecture — Unit 1
- [x] B4 SVMs for classification, regression, outlier detection + polynomial kernel — Unit 4
- [x] B5 Gradient in machine learning — Unit 4
- [x] B6 TP, TN, FP, FN in confusion matrix — Unit 4
- [x] B7 Machine learning in day-to-day life — Unit 4
- [x] C1 Decision tree: entropy H(Result) = 0.971 bits; gains Cheated 0.420, Studied 0.171, Slept 0.020; tree drawn — Unit 4
- [x] C2 Euclidean distance P(0,4), Q(6,2) = 6.32 units — Unit 4
- [x] C3 Range / central tendency, population data: range 7,017,200; mean 8,061,375.2; median 7,321,211 — Unit 3
- [x] C4 REST vs SOAP + JSON objects and structure — Unit 2
- [x] C5 Mapping problems to ML + Poisson and normal distributions — Units 4 and 3

### IDS-2025 (22/22)
- [x] A1 What is data science — Unit 1
- [x] A2 Data analytics vs data science — Unit 1
- [x] A3 Logistic regression — Unit 4
- [x] A4 Confusion matrix — Unit 4
- [x] A5 Data science vs traditional programming — Unit 1
- [x] A6 Bias in data science — Unit 4
- [x] A7 Decision tree — Unit 4
- [x] A8 Precision — Unit 4
- [x] A9 Data science vs machine learning relation — Unit 1 (added after coverage check)
- [x] A10 Handling missing data — Unit 3
- [x] B1 Big data + big data framework — Unit 1
- [x] B2 Central limit theorem — Unit 3
- [x] B3 Data analytics lifecycle — Unit 2
- [x] B4 Data reduction vs data transformation — Unit 3
- [x] B5 Twitter and Reddit — Unit 2
- [x] B6 Cross-validation — Unit 4
- [x] B7 Multiple vs partial correlation — Unit 5
- [x] C1 Matrix decomposition, SVD, PCA — Unit 5
- [x] C2 Classification vs regression — Unit 4
- [x] C3 Feature selection advantages + example — Unit 5
- [x] C4 Naive Bayes algorithm — Unit 4
- [x] C5 Data visualization + linear vs logistic regression — Units 5 and 4

### IDS-2026 (22/22)
- [x] A1 Big data vs business intelligence — Unit 1
- [x] A2 Discovery in data analytics — Unit 1
- [x] A3 Purpose of identifying potential data sources — Unit 2
- [x] A4 Testing hypothesis on proportions — Unit 3
- [x] A5 Linear transformation — Unit 3
- [x] A6 PCA and dimensionality reduction — Unit 5
- [x] A7 Importance of data pre-processing + example — Unit 3
- [x] A8 Filter vs wrapper methods — Unit 5
- [x] A9 Purpose of data acquisition — Unit 2
- [x] A10 BeautifulSoup uses in websites — Unit 2
- [x] B1 Major components of the big data framework — Unit 1
- [x] B2 Principles of effective data visualization — Unit 5
- [x] B3 Hypothesis testing, steps, example — Unit 3
- [x] B4 Linear vs logistic regression + cross-validation in regression — Unit 4
- [x] B5 Eigenvalues, eigenvectors, SVD — Unit 5
- [x] B6 Encoding methods for categorical data + data cleaning steps — Unit 3
- [x] B7 Web scraping process + JSON format — Unit 2
- [x] C1 Data analytics lifecycle with diagram + statistical measures — Units 2 and 3
- [x] C2 Model generalizability + validation + least squares principle — Unit 4
- [x] C3 Matrix decomposition efficiency + covariance matrix impact on PCA — Unit 5
- [x] C4 Correlated features on model accuracy + random forest in feature selection — Unit 5
- [x] C5 SVM vs decision tree vs K-means + API data in ML workflows — Unit 5

## Unit structure (notes)
- Unit 1 — Introduction to Data Science & Big Data (10 topics)
- Unit 2 — Data Collection & the Data Analytics Lifecycle (8 topics)
- Unit 3 — Data Pre-processing & Statistics (12 topics)
- Unit 4 — Machine Learning Foundations (13 topics)
- Unit 5 — Dimensionality Reduction, Feature Selection & Evaluation (9 topics)
- Part B — 70 Most Important Questions (14 + 14 + 16 + 14 + 12 = 70; starred = repeated across papers)

## Numerical answers re-checked (all verified with Python)
- 2024 A5 quartiles: Q1 = 3.5, Q2 = 5, Q3 = 10.5 (sorted data: 1,2,3,4,4,5,5,7,8,9,12,13,17; (n+1) method)
- 2024 B2 regression coefficient X on Y: b_xy = 24/28 = 0.857; line X - 4 = 0.857(Y - 11)
- 2024 C1 decision tree: H(Result) = 0.971 bits; gains Cheated 0.420, Studied 0.171, Slept 0.020; tree classifies all 5 students correctly
- 2024 C2 Euclidean distance: root(40) = 6.32 units
- 2024 C3 population: range = 12,231,221 - 5,214,021 = 7,017,200; mean = 8,061,375.2; median = 7,321,211
- Confusion matrix worked example: accuracy 0.85, precision 0.778, recall 0.875, F1 0.824
- Hypothesis-on-proportions worked example: z = -1.63, do not reject H0 at 5%

## Quality checks done
- Garble scan on all 4 PDFs (extracted text): no words longer than 18 letters; only legitimate
  camelCase terms (IoT, MongoDB, NoSQL, BeautifulSoup). No joined/split words.
- Visual inspection of sample pages: notes pp. 1, 2, 5, 15, 30, 45, 60, 75, 90, 105, 113;
  solutions 2024 pp. 1, 10, 21; 2025 pp. 1, 12; 2026 pp. 1, 15, 26. All legible, style correct
  (Patrick Hand, blue ink, black underlined headings, red key terms/boxes, unlined white A4,
  1.5 cm margins, unit header, page numbers).
- One defect found and fixed: the analytics-pyramid diagram's top label overflowed its box
  ("Prescriptive — What should we do?"); shortened to "Prescriptive — What to do?" and all
  PDFs rebuilt; re-inspected clean.
- Diagrams included: analytics pyramid, data analytics lifecycle ladder, ML pipeline,
  decision tree (2024 C1 data), confusion matrix, SVM margin, normal (bell) curve.

## Unclear / flagged questions
- 2024 Part C Q3: the population figures are printed with irregular commas (e.g. 6,32,4014).
  Solved by reading the digits (6,324,014 etc.); flagged in the IDS-2024 solution PDF, with the
  method stated so the answer holds whatever the intended figures are.
- 2026 Part A Q10: printed as "beautiful Soup" (lower-case b); answered as BeautifulSoup, the
  Python HTML-parsing library; flagged in the IDS-2026 solution PDF.
- No question was left unsolved. All 3 papers: 22/22 questions each.

## Outputs
- Notes: ~/workspace/handwritten_notes/sem3/IDS-Sem3-Handwritten-Notes-Full.pdf — 114 pages
- Solutions: ~/workspace/handwritten_notes/pyq-solutions/sem3/IDS-2024-solution.pdf — 21 pages, 22 questions
- Solutions: ~/workspace/handwritten_notes/pyq-solutions/sem3/IDS-2025-solution.pdf — 21 pages, 22 questions
- Solutions: ~/workspace/handwritten_notes/pyq-solutions/sem3/IDS-2026-solution.pdf — 26 pages, 22 questions
- Working files (pipeline copy + content): ~/workspace/handwritten_notes/sem3-work/ids/
