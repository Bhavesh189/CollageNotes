# Statistical Modeling and Forecasting (Sem 6) — Coverage Check

Source: built from PYQ topics only. Paper: SMF-2024 (B.Tech VI Sem Main
(New Scheme) Examination 2023-24, AI & DS, (6AD4-03), 61N2003, 2 pages,
22 questions). No source notes and no Sem 5-8 syllabus exist in the repo
for this subject.

Notes PDF: ~/workspace/handwritten_notes/sem6/Statistical-Modeling-and-Forecasting-Sem6-Handwritten-Notes-Full.pdf — 69 pages (Unit 1–5 + 70 Most Important Questions section, 50 questions).
Solution PDF: ~/workspace/handwritten_notes/pyq-solutions/sem6/SMF-2024-solution.pdf — 16 pages, 22/22 questions solved.

Method: every question of SMF-2024 was transcribed from the scan (OCR +
visual check of both pages) and mapped to a notes topic below. All 22
topics are covered at full depth. Garble scan run on all text and on the
built PDFs (0 hits; "Heteroscedasticity" is whitelisted as a legitimate
18-letter word). Sample pages from Units 1, 3 and 5 and the solution PDF
visually inspected. Numerical answers verified: exponential smoothing
{5,6,7,8,9} alpha=0.3 gives 5, 5.3, 5.81, 6.47, 7.23; Dickey-Fuller on
{10,20,30,40,50} gives gamma=0, statistic 0, unit root not rejected;
BIC mean-only model 22.78, linear-trend model wins (RSS 0, degenerate);
series {100,...,160} has trend about +6.7 per step, period-3 seasonality
in the increments (5, 5, 10 repeating), minimal noise.

## Paper questions -> notes topic (all covered)
- [x] Part A Q.1 What is heteroscedasticity? -> Heteroscedasticity
- [x] Part A Q.2 Purpose of time series analysis? -> Purpose of Time Series Analysis
- [x] Part A Q.3 Different types of data in time-series analysis -> Types of Data in Time-Series Analysis
- [x] Part A Q.4 What types of data are suitable for forecasting? -> Data Suitable for Forecasting
- [x] Part A Q.5 Why is a random walk model considered non-stationary? -> Random Walk and Non-Stationarity
- [x] Part A Q.6 What are ARMA models? -> ARMA Models
- [x] Part A Q.7 What are VAR models? -> VAR Models
- [x] Part A Q.8 What is co-integration in the context of VAR models? -> Co-integration in the Context of VAR Models
- [x] Part A Q.9 What are multivariate time series models? -> Multivariate Time Series Models
- [x] Part A Q.10 Role of Neural Networks in time series forecasting? -> Neural Networks in Time Series Forecasting
- [x] Part B Q.1 Autocorrelation and its significance -> Autocorrelation and Its Significance
- [x] Part B Q.2 Unit-root process -> Unit-Root Process
- [x] Part B Q.3 Error Correlation Models (ECM) and their use -> Error Correction Model (ECM) (see flag below)
- [x] Part B Q.4 Least squares estimation in linear regression -> Least Squares Estimation in Linear Regression
- [x] Part B Q.5 Fixed-Effect vs Random-Effect models in panel data -> Fixed-Effect vs Random-Effect Models in Panel Data
- [x] Part B Q.6 Bayesian Methods in time series forecasting -> Bayesian Methods in Time Series Forecasting
- [x] Part B Q.7 PCA and Factor Analysis used for in time series analysis? -> Principal Component Analysis (PCA) and Factor Analysis (see flag below)
- [x] Part C Q.1 Internal structure (trend, seasonality, noise) of {100, 105, 110, 120, 125, 130, 140, 145, 150, 160} -> Internal Structure of a Time Series — Trend, Seasonality and Noise
- [x] Part C Q.2 Significance of a unit root + Dickey-Fuller test on {10, 20, 30, 40, 50} -> Dickey-Fuller Test
- [x] Part C Q.3 Impulse Response Function in VAR(2) with two variables -> Impulse Response Function in a VAR(2) Model
- [x] Part C Q.4 Exponential smoothing on {5, 6, 7, 8, 9} with alpha = 0.3 -> Exponential Smoothing
- [x] Part C Q.5 Best model using BIC criterion for {5, 10, 15, 20, 25} -> BIC Criterion for Model Selection

Coverage: 22/22 paper questions, 22/22 topics. Flags: Part B Q.3 is
printed as "Error Correlation Models (ECM)"; the standard name is Error
Correction Model, and the answer covers it under that name while noting
the printed wording. Part B Q.7 is printed with broken grammar ("used for
in time series analysis?") and is reproduced as printed. Both are flagged
at the end of the solution PDF. No topic outside the paper was built. The
70Q section has 50 questions (one paper asks 22 distinct questions; the
section adds closely-related questions from the same topics, as noted on
its title page).
