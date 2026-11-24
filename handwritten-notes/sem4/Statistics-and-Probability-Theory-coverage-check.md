# Statistics & Probability Theory (SPT) — Sem 4 — Coverage Check

**Subject:** Statistics & Probability Theory (4CS2-01), B.Tech IV Semester
**Status:** COMPLETE — built from syllabus (AEM probability units) + PYQ topics for queueing/Markov (no source notes in repo)
**Date:** 2026-11-24

## Authority (what this subject was built from)

1. **BTU syllabus 3CS1-01 Advanced Engineering Mathematics, Units 1–2 "Probability and Statistics-1/2"**
   (file: `sem4-work/extra/src/syllabus-sem3.pdf`, text lines ~384–410) — discrete and continuous
   random variables, probability distribution function, mathematical expectations, moments,
   moment generating functions, mean and variance, Binomial, Poisson, Normal, Uniform and
   Exponential distributions, curve fitting, correlation, Karl Pearson's and Spearman's
   coefficients, lines of regression.
2. **PYQ paper SPT-Jun-2022 (4CS2-01)** — for **queueing theory and Markov process only**,
   which are NOT in that syllabus. Those two topics come from the paper's questions only.
3. **No source notes exist anywhere in the repo for this subject** (old-scheme Sem 4 subject).
   No topic outside (1) + (2) was built.

## Outputs

| Output | Path | Pages |
|---|---|---|
| Notes (Units 1–5 + 70 Most Important Questions) | `sem4/Statistics-and-Probability-Theory-Sem4-Handwritten-Notes-Full.pdf` | 67 (A4, verified with pdfinfo) |
| PYQ solutions — SPT-Jun-2022 | `pyq-solutions/sem4/SPT-Jun-2022-solution.pdf` | 15 (A4, verified with pdfinfo) |
| This coverage file | `sem4/Statistics-and-Probability-Theory-coverage-check.md` | — |

Notes page map: cover p1; Unit 1 pp2–8; Unit 2 pp9–15; Unit 3 pp16–20; Unit 4 pp21–25;
Unit 5 pp26–29; 70 Most Important Questions pp30–67.

## Coverage checklist — every topic ticked

### Unit 1 — Probability and Random Variables (syllabus Unit 1) — 10 topics, all covered
- [x] Random experiment, sample space and events (types of events)
- [x] Probability: classical definition and axioms; addition and multiplication theorems
- [x] Conditional probability and Bayes theorem (statement; full proof in solutions Q.7(i))
- [x] Random variable: discrete and continuous
- [x] Probability distribution function: PMF, PDF and CDF, with properties
- [x] Mathematical expectation E(X), E(X^2), properties; worked PYQ Q.1(g): E(X) = 16, E(X^2) = 276
- [x] Moments: raw and central moments, relations, skewness, kurtosis
- [x] Moment generating function: definition, properties, Bernoulli check
- [x] Mean and variance: properties and standard results; five-distribution summary table
- [x] Worked numericals: leap-year 53 Sundays (2/7) and three groups of children (13/32)

### Unit 2 — Probability Distributions and Curve Fitting (syllabus Unit 2) — 7 topics, all covered
- [x] Binomial distribution (pmf, mean np, variance npq, MGF); worked PYQ Q.3(A): P(X >= 4) = 0.01696
- [x] Poisson distribution (pmf, mean = variance = λ, MGF derivation); applications (PYQ Q.1(b)); diagram
- [x] Normal distribution (pdf, mean μ, variance σ², standard normal, normal table); worked PYQ Q.8(ii): 528 bars
- [x] Uniform distribution (pdf, mean (a+b)/2, variance (b−a)²/12); diagram
- [x] Exponential distribution (pdf, mean 1/λ, variance 1/λ², memoryless property); worked PYQ Q.2(B)
- [x] Comparison table of the five distributions
- [x] Curve fitting: method of least squares, straight line, second-degree parabola; worked PYQ Q.4(A): y = 1.43 + 0.24x + 2.21x² (sums Σxy = 243, Σx²y = 851, verified in all three normal equations)

### Unit 3 — Correlation and Regression (syllabus Unit 2) — 5 topics, all covered
- [x] Correlation: meaning, types, scatter diagram
- [x] Karl Pearson coefficient: formula, properties, proof −1 ≤ r ≤ 1 (PYQ Q.1(d)); worked PYQ Q.4(B): r = 0.95
- [x] Spearman rank correlation: formula, tied ranks; worked PYQ Q.9(i): ρ₁₂ = 0.64, ρ₁₃ = −0.21, ρ₂₃ = −0.30
- [x] Lines of regression (x on y, y on x), regression coefficients, r² = b_yx·b_xy, angle between lines; proof of tan θ formula (PYQ Q.9(ii)); diagram
- [x] Correlation versus regression comparison table

### Unit 4 — Queueing Theory (PYQ topics only — NOT in the AEM syllabus) — 6 topics, all covered
- [x] Queueing system: elements, Kendall notation A/B/c; diagram
- [x] Queueing terminology: traffic intensity ρ = λ/μ, Little's law, balking, reneging, jockeying, collusion (PYQ Q.1(e))
- [x] M/M/1 queue: steady-state P_n = (1−ρ)ρⁿ, L_s, L_q, W_s, W_q
- [x] M/M/1 worked numericals: repairman PYQ Q.5(A) (idle 3 h/day, 1.67 jobs ahead); marshalling yard PYQ Q.5(B) (L_q = 2.25, P(N > 10) = 0.0422)
- [x] Multi-server queue M/M/c and Erlang C; worked PYQ Q.10 (P(wait) = 0.45, L_s = 1.88)
- [x] M/G/1 queue: Pollaczek–Khinchin formula, W_q and W_s (PYQ Q.11(i))

### Unit 5 — Markov Process and Stochastic Processes (PYQ topics only — NOT in the AEM syllabus) — 4 topics, all covered
- [x] Stochastic process and Markov process: definition, Markov property (PYQ Q.1(f)); diagram
- [x] Transition probability matrix, Chapman–Kolmogorov, n-step probabilities; worked PYQ Q.6(B): t=1 (0.35, 0.65), t=2 (0.375, 0.625), steady state (0.40, 0.60)
- [x] Steady state / stationary distribution, regular chain, absorbing/transient/recurrent states; worked PYQ Q.11(ii): scooter long run 2/3, bus on third day 11/24
- [x] Markov chains in the paper: housewife problem Q.6(A) (flagged — see below) and classification of states

**Coverage result: 32/32 topics covered, 0 missing, 0 thin topics left unaddressed.**

## 70 Most Important Questions — 70/70, all answered
- 14 per unit (Unit 1: Q.1–14; Unit 2: Q.15–28; Unit 3: Q.29–42; Unit 4: Q.43–56; Unit 5: Q.57–70).
- Marks mix: 20 × 2-mark (short answers), 21 × 5-mark (half-topic answers), 29 × 10-mark (full-topic answers).
- Starred as repeated most often: count in `spt_data.py` Q70 table (star flag per question).

## PYQ paper solved — SPT-Jun-2022 (26 question items, 15 pages)
- Part A (7 × 4 marks): Q.1 (a)–(g) — all solved.
- Part B (5 × 8 marks, A or B each — both options solved): Q.2 (A)(B), Q.3 (A)(B), Q.4 (A)(B), Q.5 (A)(B), Q.6 (A)(B).
- Part C (Q.7–Q.11, attempt any 3 of 5 — all solved): Q.7 (i)(ii), Q.8 (i)(ii), Q.9 (i)(ii), Q.10, Q.11 (i)(ii).
- Every question is written in handwriting first exactly as printed (including marks), then answered below it.
- Key answers re-checked against independent recomputation: Q.1(g) E(X)=16, E(X²)=276; Q.2(A) wrongly 0.495 / correctly 0.505;
  Q.3(A) 0.01696; Q.4(A) y = 1.43 + 0.24x + 2.21x²; Q.4(B) r = 0.95; Q.5(A) idle 3 h, L_s = 1.67;
  Q.5(B) L_q = 2.25, P(N>10) = 0.0422; Q.6(B) steady state (0.40, 0.60); Q.7(ii) 13/32;
  Q.8(ii) 528 bars; Q.9(i) ρ = 0.64 / −0.21 / −0.30; Q.10 P(wait) = 0.45, L_s = 1.88;
  Q.11(ii) scooter 2/3, bus day 3 = 11/24.

## Unclear questions flagged (also listed at the end of the solution PDF)
1. **Q.6 (A) — housewife / transition matrix: FLAGGED as unclear/incomplete.** The printed sentence giving
   the rules after buying food B and food C is garbled ("However if she buy A as the other brand") and the
   B/C rules are missing, so the full matrix cannot be determined from the paper as printed. Only the A row
   (0, 1, 0) is determined. The solution gives the method, the determined row, and a clearly labelled
   illustrative completion (NOT presented as the paper's data).
2. **Q.10** — a handwritten margin mark in the scan is a stray pen mark, not part of the question; ignored.
3. **Q.1 (g)** — a handwritten "275" in the margin of the scan is a stray pen mark; ignored. Correct E(X²) = 276.
4. **Q.2 (B)** — pdf printed as "λe^(−λt), t > 0"; read as f(t) = λe^(−λt) for t > 0 (standard exponential pdf).

## Topics NOT completed
- None. Every syllabus topic and every PYQ topic is covered. The only incompleteness is Q.6(A) above,
  where the paper itself does not supply the data — that is a defect in the printed paper, not in the notes.

## Quality checks performed
- Both PDFs verified with `pdfinfo`: valid, A4 (595.276 × 841.89 pts), notes 67 pp, solutions 15 pp.
- Garble scan on extracted text of both PDFs: no joined/split words found (only long token is the
  legitimate "first-come-first-served"); Greek letters λ, μ, σ, ρ, θ, π present and rendering.
- Visual inspection of rendered pages from every unit (cover, Unit 1–5 topics, 70Q section) and the
  solution PDF (Q.4(A) table, Q.4(B) table, Q.9(i) 11-column table, Q.9(ii), Q.10).
- **Defects found and fixed during checking:**
  (a) The inherited `sanitize.py` stripped a leading minus sign (`clean_text("-5")` → `"5"`), so the
      Q.9(i) and Q.4(B) tables lost all negative signs. Fixed in the SPT copy of `sanitize.py` (leading
      "-" now kept before a number) and both PDFs rebuilt; tables re-inspected and correct.
  (b) Normal-curve diagram axis labels overlapped and the σ glyph was missing (Patrick Hand has no σ
      in canvas text). Labels changed to spaced words ("mu − sigma", "mu", "mu + sigma"); re-inspected, clean.
  (c) An arithmetic slip in the Q.4(A) column sums in an early draft (Σxy = 240, Σx²y = 834) was caught
      by re-computation from the raw data before building: correct sums are Σxy = 243, Σx²y = 851, and
      the fitted parabola y = 1.43 + 0.24x + 2.21x² was verified in all three normal equations.
  (d) 70Q star marker wrapped onto its own line; moved next to the question number; rebuilt.
- Style: Patrick Hand, blue body ink, black underlined headings, red key terms/boxes, unlined white A4,
  ~1.5 cm balanced margins, unit name in header, page number in footer — same as DBMS v2.
- Work files (builders + content, reusable): `sem4-work/spt/spt_data.py`, `spt_render.py`,
  `build_spt.py`, `build_spt_solutions.py` (plus the DBMS pipeline files already in that folder, untouched
  except the SPT copy of `sanitize.py` noted above). `~/workspace/handwritten_notes/full/` was not modified.
  `~/workspace/handwritten_notes/sem4/PROGRESS-sem4.md` was not touched.
