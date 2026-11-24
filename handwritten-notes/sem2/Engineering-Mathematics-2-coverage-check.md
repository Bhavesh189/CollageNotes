# Engineering Mathematics-2 (Sem 2) — Coverage Check

Notes PDF: `Engineering-Mathematics-2-Sem2-Handwritten-Notes-Full.pdf` — 81 pages
(Title p1; Unit 1 pp2–14; Unit 2 pp15–23; Unit 3 pp24–30; Unit 4 pp31–36; Unit 5 pp37–46;
70 Most Important Questions pp47–81.)

Coverage result: **52 / 52 topics listed below are covered** — 50 headings from the
cleaned source lists (16 + 8 + 6 + 6 + 14) plus 2 extra topics from the UNIT_EXTRA
expansions (general equation of a sphere; double integrals in Cartesian coordinates).
Nothing missing.

## Unit 1 — Matrices (source: em2-unit-1.pdf, 37 pages, Lectures 1–10)

| # | Topic | Covered |
|---|-------|---------|
| 1 | Rank of a Matrix | ✓ |
| 2 | Properties of Rank of the Matrices | ✓ |
| 3 | Echelon Form of a Matrix | ✓ |
| 4 | Normal Form of a Matrix | ✓ |
| 5 | Rank-Nullity Theorem | ✓ |
| 6 | System of Linear Equations | ✓ |
| 7 | Non-Homogeneous System | ✓ |
| 8 | Homogeneous System | ✓ |
| 9 | Consistency and Inconsistency | ✓ |
| 10 | Matrix Method | ✓ |
| 11 | Eigen Values and Eigen Vectors | ✓ |
| 12 | Properties of Eigen Values and Eigen Vectors | ✓ |
| 13 | Diagonalization of a Matrix | ✓ |
| 14 | Powers of a Matrix | ✓ |
| 15 | Cayley-Hamilton Theorem | ✓ |
| 16 | Inversion by Cayley-Hamilton Theorem | ✓ |

## Unit 2 — Coordinate Geometry of 3D (source: em2-unit-2.pdf, 33 pages, Lectures 11–18)

| # | Topic | Covered |
|---|-------|---------|
| 1 | Equation of a Sphere (general form) | ✓ |
| 2 | Diameter Form of the Equation of a Sphere | ✓ |
| 3 | Equations of a Circle | ✓ |
| 4 | Spheres Through a Given Circle | ✓ |
| 5 | Equation of a Tangent Plane to a Sphere | ✓ |
| 6 | Angle of Intersection of Two Spheres | ✓ |
| 7 | Touching Spheres | ✓ |
| 8 | Equation of a Right Circular Cone | ✓ |
| 9 | Equation of a Right Circular Cylinder | ✓ |

## Unit 3 — Integral Calculus: Solids of Revolution, Beta & Gamma Functions

**Source file `em2-unit-3.pdf` is corrupt in the GitHub repo itself** (no trailer/xref,
445,574 U+FFFD replacement sequences — a UTF-8 text round-trip destroyed all binary
streams; verified unrecoverable, no alternate copy anywhere in the repo). This unit
was therefore built **complete from the official BTU syllabus** (2FY1-01), which is
the authority for its topics. Lectures would be 19–26.

| # | Topic (syllabus) | Covered |
|---|-------|---------|
| 1 | Volume of a Solid of Revolution | ✓ |
| 2 | Surface Area of a Solid of Revolution | ✓ |
| 3 | Beta Function | ✓ |
| 4 | Gamma Function | ✓ |
| 5 | Relation between Beta and Gamma Functions | ✓ |
| 6 | Evaluation of Integrals using Beta and Gamma Functions | ✓ |

## Unit 4 — Double Integrals (source: em2-unit-4.pdf, 31 pages, Lectures 27–31)

| # | Topic | Covered |
|---|-------|---------|
| 1 | Volume under the Surface | ✓ |
| 2 | Properties of Double Integrals | ✓ |
| 3 | Double Integrals (Cartesian) | ✓ |
| 4 | Double Integrals (Polar) | ✓ |
| 5 | Double Integrals by Changing into Polar Form | ✓ |
| 6 | Change of Order of Integration in Double Integrals (Cartesian) | ✓ |
| 7 | Change of Order of Integration in Double Integrals (Polar) | ✓ |

## Unit 5 — Vector Calculus (source: em2-unit-5.pdf, 52 pages, Lectures 32–40)

| # | Topic | Covered |
|---|-------|---------|
| 1 | Scalar Fields | ✓ |
| 2 | Vector Fields | ✓ |
| 3 | Continuity of a Vector Function of a Single Variable | ✓ |
| 4 | Gradient of a Scalar Field | ✓ |
| 5 | Solenoidal Vector | ✓ |
| 6 | Irrotational Vector | ✓ |
| 7 | Laplace's Equation | ✓ |
| 8 | Scalar and Vector Line Integrals | ✓ |
| 9 | Scalar and Vector Surface Integrals | ✓ |
| 10 | Scalar and Vector Volume Integrals | ✓ |
| 11 | Green's Theorem in a Plane | ✓ |
| 12 | Stoke's Theorem | ✓ |
| 13 | Applications of Gauss's Divergence Theorem | ✓ |
| 14 | Applications of Stoke's Theorem | ✓ |

Additional Unit 5 expansions covered: Differentiation of Vector Functions,
Laplace Operator, Divergence of a Vector Field, Curl of a Vector Field,
Gauss's Divergence Theorem (statement + applications).

## 70 Most Important Questions — 70 / 70

14 questions per unit (2-mark, 5-mark and 10-mark mixed, most-repeated marked
with a red star), answers sized by marks. All 70 present in the notes PDF, pp47–81.

## Maths-notation repair pass (2026-11-24)

Parent spot-check found broken maths notation (missing integral signs/limits,
empty `()` placeholders, dot runs, `%` where a variable should be, empty
examples). All 78 original pages were rendered and read; the same failure mode
was found on pp4–6, 8–9, 11, 16, 18–20, 29–30, 35, 37–40 and in the 70Q
repeats (pp53–54, 57, 71, 75–77) and in several solution answers. The source
JSONs (`sem2-work-em2/source_u*.json`) and `expansions.py`/`papers.py` were
repaired and both PDFs rebuilt. Final garble scan (NUL, U+FFFD, `()`, dot runs
of 4+, `%`, `P!`, stray `& =`, empty "Example. Solution. Ans.", `=.`) returns
**0 hits** on the 81-page notes and all four solution PDFs.

### What was fixed (before → after, worst cases)

- **Unit 4 p30 Change of Order (was pp29–33 in old build):** double-integral
  formulas rendered as `() () (,) (,) ... = = ................ (1)` and
  `... (2)`; "P lies on the curve 4a x y =" and "Q lies on the curve y = 2√%";
  "Example 3. Solution. Ans." (empty); "Example 4. Evaluate a a a a x y dydx
  y x by changing order" (limits missing). → Section fully rewritten with
  both iterated forms in words and 4 worked examples: Ex. 1 ∫₀¹∫ₓ¹ e^(y²)
  dy dx = (e−1)/2; Ex. 2 (parabolas y²=4ax and x²=4ay, meeting at (0,0) and
  (4a,4a)) reversed to ∫₀^{4a}∫_{y²/4a}^{2√(ay)} f dx dy; Ex. 3 quarter-circle
  area πa²/4; Ex. 4 ∫₀^a∫₀^{a−x} xy dy dx = a⁴/24.
- **Unit 2 p16 Spheres Through a Given Circle:** centre-of-circle derivation
  destroyed (`P! − ( " # " # ")... %`); Ex. 4 line equations as `& = & = & = r`.
  → Derivation rewritten in words (foot of perpendicular, r² = R² − CP²);
  Ex. 4 fixed: line (x−1)/1=(y−2)/2=(z−3)/2=r, C2=(2,4,5), C1C2=3, r2=√7.
- **Unit 2 pp18–20 Cone/Cylinder:** axes missing (`= & =`), examples
  truncated, cylinder Ex. 2 plane printed **wrong** as `x + y + z = 0`.
  → Cone Ex. 1 re-derived (vertex origin, axis x=y=z, through (1,1,2):
  3(x+y+z)² = 8(x²+y²+z²)); cone Ex. 2 completed
  (8x²−4y²−4z²+5xy+5xz+yz=0); cylinder Ex. 1 completed
  (5x²+8y²+5z²−4xy+8xz+4yz−144=0); cylinder Ex. 2 plane corrected to
  **x+y+z=1**, centre (1/3,1/3,1/3), radius √(2/3),
  x²+y²+z²−xy−yz−zx=1.
- **Unit 5 p39 Green's/Stokes/Gauss:** statement rendered as
  `∫(°jH + ±jl) = ∬, L²`; Stokes statement truncated at "then ∫"; Gauss
  Ex. 13 truncated at `= ∫`. → Green's stated in words
  (∮(M dx+N dy) = ∬(∂N/∂x−∂M/∂y) dx dy); Stokes stated in words; Gauss
  Ex. 13 completed (div F = 6, volume 4π/3, integral = 8π); Stokes Ex. 9
  completed (line integral = −π).
- **Unit 1 pp4–6, 8–9, 11 Echelon/Normal Form, Systems, Diagonalization:**
  matrices rendered as bare number strings (`A ~ – 1 – 2`, `A =.`,
  `!!! ⋯! … ⋮ ⋮ ⋱!& & ⋮`). → All examples rebuilt with explicit `[[...]]`
  matrices and ranks checked with numpy (e.g. echelon Ex. 2 rank 2,
  Ex. 4 rank 3; normal-form Ex. 1 → [I2;O] rank 2, Ex. 2 det −2 → I3);
  Matrix Method Ex. 1 completed (x=1, y=2, z=3); diagonal matrix D
  described in words (λ1,…,λn on the diagonal).
- **Unit 5 pp35, 37–38:** derivative definition garbled; line/surface
  integral definitions truncated at "and ∫" and missing vector forms. →
  Rewritten: dF/dt = limit of (F(t+Δt)−F(t))/Δt; ∫F·dr = ∫(F1 dx+F2 dy+F3 dz);
  ∫F·dS = ∫F·n dS with n = grad f/|grad f|. Irrotational scalar-potential
  sentence fixed ("such that V = grad phi").
- **Unit 4 p29 Polar:** two example openings with no content. → Rewritten
  (cardioid r = a(1 − cos θ), θ 0→π; semicircle r = 2a cos θ, θ 0→π/2).
- **Expansions errors corrected:** cone formula `+...` gap; volume-integral
  example wrongly said curved-surface flux is zero because `F dot n = 0
  there` (actually F·n = 2xy/a, integral zero by symmetry); irrotational
  example k-component terms in wrong order.

### Examples re-derived (limits/equation not recoverable from source)

- U1 echelon Ex. 4 (source said rank 2, unrecoverable — rebuilt as rank 3
  with explicit matrices); U1 normal-form examples (matrices lost).
- U2 cone Ex. 1 (axis was missing); U2 cylinder practice Qs (axes missing).
- U4 change-of-order Ex. 3 (was empty — quarter-circle area) and Ex. 4
  (limits lost — re-derived as ∫₀^a∫₀^{a−x} xy dy dx = a⁴/24, checked in
  both orders). U4 Ex. 2 curves recovered from fragments (y²=4ax, x²=4ay).
- No different topic was invented; all re-derivations are standard textbook
  examples for the same syllabus topic.

### 70Q / solution answer-assembly fixes

- **Q67 (p80):** answer led with the Unit 5 Ex. 13 sphere solution
  (F = xi+2yj+3zk, 8π) — a different problem — before the correct cylinder
  verification. → Dedicated CUSTOM answer (`c:q67_divergence`): div F = 2z,
  volume integral πa²h², curved flux 0 by symmetry, bottom 0, top πa²h².
- **Q68 (p80):** definition box truncated mid-formula ("...such that
  dS vector =."). → Unit 5 §9 split so the first sentence is a complete
  definition; box now reads in full.
- **Q46 (p72):** answer never evaluated its own integral (the e^(y²)
  evaluation lived in the source para used only as the box's first
  sentence, and the other examples were dropped by the dedup check). →
  Dedicated CUSTOM answer (`c:q46_change_order`): (e−1)/2.
- **Q48 (p72–73):** same cause — answer showed the e^(−y)/y example
  instead of its own 2√x reversal. → Dedicated CUSTOM answer
  (`c:q48_change_order`): split at y=1, both parts with correct limits.
- **2024 solution Q4 "State Gauss divergence theorem" [2 marks]:** answer
  printed the Ex. 13 sphere solution and never stated the theorem. →
  Dedicated CUSTOM answer (`c:gauss_statement`) stating the theorem.
- **2025 solution C1/C2 (thinnest 10-mark answers, 171/179 words):**
  one explicit step para added to each; both now step-by-step.
- 2023 Q6 Stokes now states the theorem correctly (was polluted with the
  truncated Stokes Ex. 9); Q66 Stokes answer verified correct (statement +
  its own triangle example = 15).

### Pages visually re-checked after the repair

Notes pp4, 5, 16, 17, 19, 20, 21, 32, 33, 38, 39, 42, 43, 72, 73, 80
(and 2024 solution pp1–2 for the Gauss Q4 fix). All clean.
Cosmetic only, left as-is: the `⇒` glyph (U+F0DE) is stripped by
`sanitize.clean_text` wherever it survives in source; row-operation arrows
in Unit 1 render as ASCII `->`.

## PYQ Solutions — 4 / 4 papers, 22 questions each

| Paper | Solution PDF | Pages | Questions |
|---|---|---|---|
| EM2-2023 | EM2-2023-solution.pdf | 8 | 22 |
| EM2-2024 | EM2-2024-solution.pdf | 8 | 22 |
| EM2-2025 | EM2-2025-solution.pdf | 8 | 22 |
| EM2-May-2019 | EM2-May-2019-solution.pdf | 8 | 22 |

## Quality notes

- Garble scan on the notes PDF and all four solution PDFs: **0 hits** on the
  enhanced scan (NUL, U+FFFD, `()`, dot runs of 4+, `%`, `P!`, stray `& =`,
  empty "Example. Solution. Ans.", `=.`) — see the repair pass above.
  Sample pages visually inspected from every unit and every solution PDF —
  all legible, style correct (Patrick Hand, blue ink, black underlined
  headings, red key terms, 1.5 cm balanced margins).
- Repairs made during the build: source formula images in Units 4–5 lost their
  symbols in text extraction (e.g. θ rendered as a control character, "=" as a
  private-use glyph); these were repaired in the source JSONs and the affected
  pages re-checked. Two truncated fragment paragraphs were dropped.
- Known cosmetic limits (source's own wording, not errors): sphere diagram
  labels slightly overlap in one figure; the `⇒` glyph is stripped by
  `sanitize.clean_text` wherever it survives in source.
- Numerical answers were verified with numpy/scipy where checkable (ranks,
  eigenvalues, inverses, Gamma/Beta values, line/surface integrals, volumes).
- Two answers were corrected during final verification in this pass:
  May-2019 B2, A³ = [[14, 13, 13], [0, 1, 0], [13, 13, 14]] (was written with
  9s in the (1,2) and (3,2) entries); May-2019 C2, integrating factor is xy³
  (not xy²) — both re-verified numerically and the PDFs rebuilt.

## Flags carried in the solution PDFs

- EM2-2023, Part C Q5: the last term of φ was read from the scan as cz²x²;
  if it is cz²x instead, the values are a = 4, b = 16, c = −16.
- EM2-2024, Part A Q5: the word "zero" (velocity and displacement are zero
  at t = 0) is faint in the scan; it was read as zero.
- EM2-May-2019: old-scheme paper (MGSU, May 2019, 160 marks) whose questions
  are mostly differential equations / PDEs — outside the current EM2 syllabus.
  Solved exactly as printed; the matrix questions (A1, A2, B1, B2, C1) are
  in-syllabus.
