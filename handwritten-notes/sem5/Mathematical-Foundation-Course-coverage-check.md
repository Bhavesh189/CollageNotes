# Mathematical Foundation Course (Sem 5) — Coverage Check

Built from PYQ topics — no source notes or syllabus for this subject exist in the repo.
Papers: MFC-2025 (5AI4-05, B.Tech V Sem 2024-25, 22 questions),
MFC-2026 (5AI4-05, B.Tech V Sem 2025-26, 22 questions).
Total 44 paper questions. Both papers: Max 70, 3 Hours, Part A 10 x 2,
Part B 5 x 4 (answer 5 of 7), Part C 3 x 10 (answer 3 of 5).

Notes: `Mathematical-Foundation-Course-Sem5-Handwritten-Notes-Full.pdf` — 76 pages, A4.
Solutions: `pyq-solutions/sem5/MFC-2025-solution.pdf` — 21 pages, 22/22 solved;
`pyq-solutions/sem5/MFC-2026-solution.pdf` — 21 pages, 22/22 solved.

All numerical answers were verified with a Python script (verify_nums.py)
before writing: z and t tests, chi-square tests, Poisson fit, one-way ANOVA,
eigenvalues and eigenvectors, inner products, matrix representation.

## Topics (29) — all covered

### Unit 1 — Foundations
- [x] Random Sampling and Its Uses (MFC-2026 A1)
- [x] Sampling Distributions and the Mean of the Sample Mean (MFC-2025 A5, A6, C5)
- [x] Confidence Intervals and Fiducial Limits (MFC-2025 A2, B2; MFC-2026 A2)
- [x] Hypothesis Testing: Errors and Decisions (MFC-2025 A4, A7, C4)
- [x] Estimation and Maximum Likelihood Estimation (MFC-2026 A3, B1)
- [x] The One-Sample T Test (MFC-2025 A1)

### Unit 2 — Tests and Distributions
- [x] The Z Test (MFC-2025 C4; MFC-2026 B2)
- [x] The T Test for a Small Sample (MFC-2025 B1; MFC-2026 B4)
- [x] The Chi-Square Test (MFC-2025 A3, B4)
- [x] One-Way Analysis of Variance (MFC-2025 C2)
- [x] Student's T Distribution and the Chi-Square Distribution (MFC-2026 A5, A6)
- [x] The Poisson Distribution and the Goodness of Fit Test (MFC-2026 B3)

### Unit 3 — Data
- [x] Imputation of Missing Data (MFC-2025 B3, B6)
- [x] Outliers and How to Identify Them (MFC-2025 A10)
- [x] Low-Rank Approximations (MFC-2025 B5)
- [x] Principal Component Analysis (MFC-2025 A8)
- [x] Sample Variance versus Population Variance (MFC-2025 C3)
- [x] Bivariate Statistical Techniques (MFC-2026 A4)

### Unit 4 — Linear Algebra
- [x] Vectors and the Inner Product (MFC-2025 B7)
- [x] Vector Spaces and Basis (MFC-2026 A7, B5)
- [x] Linear Transformations and Their Kernel (MFC-2026 A8, A10)
- [x] Eigenvalues and Eigenvectors (MFC-2025 A9, C1; MFC-2026 A9, C5)
- [x] Inner Product Spaces (MFC-2026 B6)
- [x] Finding a Linear Map and Its Matrix Representation (MFC-2026 B7, C4)

### Unit 5 — Advanced Topics
- [x] Maximum Likelihood Estimation for the Binomial Distribution (MFC-2026 C1)
- [x] Homoscedasticity and Heteroscedasticity (MFC-2026 C2)
- [x] Entropy, Cross-Entropy and KL Divergence (MFC-2026 C5)
- [x] Comparing Several Algorithms: ANOVA and Multiple Comparisons (MFC-2025 C2; MFC-2026 B7/C4 context)
- [x] Testing Normality with the Chi-Square Test (MFC-2026 C3)

Coverage: 29/29 topics. 70 Most Important Questions: 70/70 (14 per unit).

## Flags (also listed at the end of the solution PDFs)
- MFC-2025 Part B Q.2 gives no standard deviation, so a numerical confidence interval cannot be completed without it. The method is given in full, the interval is given in terms of s, and an illustration with an assumed s = 3 hours is shown separately.
- MFC-2026 Part B Q.3 prints "No. of heads" for the row of mistake counts; it is read as "No. of mistakes".
- MFC-2026 Part B Q.6 prints "How do factors such as dataset size, feature selection, and model complexity?" with no verb; it is answered as "how do these factors affect the design of the experiments".
- MFC-2026 Part C Q.1 prints the binomial range as x = 1, 2, ..., n; the range is 0, 1, ..., n.
- MFC-2026 Part C Q.5 prints "Detailed the factors ... if machine learning experiments"; it is read as "Detail the factors ... of machine learning experiments".
- MFC-2026 Part C Q.5 and MFC-2025 Part C Q.1 use the same matrix [[-2, 2, -3], [2, 1, -6], [-1, -2, 0]]; its eigenvalues are 5, -3, -3.
