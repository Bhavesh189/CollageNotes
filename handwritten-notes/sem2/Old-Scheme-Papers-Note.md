# Old-Scheme Semester 2 Papers — Solutions Only

Three Semester 2 PYQ papers were solved as **solution PDFs only**. No handwritten
notes PDF (and no 70-questions section) was built for any of them, for the same
reason in each case:

- **No source notes exist anywhere in the repo** for these subjects — no unit
  notes in their own semester folder, and no scattered notes found in other
  semesters' folders.
- **They are not in the official BTU 2021-22 syllabus**
  (`public/syllabus/sem1/syllabus.pdf`, First Year 1st & 2nd Sem). Their paper
  codes — 2FY3-09, 2FY1-05, 2FV2-01 — do not appear in that syllabus at all.
  The closest 2021-22 subjects are different courses (e.g. "Introduction to
  Built Environment" instead of Basic Civil Engineering, and "Engineering
  Mathematics" instead of Linear Algebra & Differential Equations). Building
  full notes would therefore mean inventing topics, which the Golden Rule
  forbids. The solutions below answer only what the papers themselves ask.

All three solution PDFs use the approved style (Patrick Hand, blue body ink,
black underlined headings, red key terms, unlined white A4, ~1.5 cm balanced
margins). Every question is written first, exactly as printed, then answered
below it in the same handwriting, in the paper's own order. All questions were
solved, including every OR-choice option in LADE Part B.

## 1. BCE — May 2019

- Paper: 2FY3-09 Basic Civil Engineering, B.Tech II Sem (Main) Exam, May 2019,
  80 marks. Parts A (5 x 2), B (6 x 10, attempt 4), C (3 x 15, attempt 2).
- Output: `~/workspace/handwritten_notes/pyq-solutions/sem2/BCE-May-2019-solution.pdf`
- Pages: 14. Questions solved: 14 (all — 5 + 6 + 3).
- Unclear/illegible questions: none. The whole paper was legible.
- Notes: includes a hand-drawn hydrological-cycle diagram and a
  well-conditioned vs ill-conditioned triangle diagram, plus comparison tables
  (surveying vs levelling, transport modes, foundations, angular instruments,
  water-quality limits).

## 2. HV — May 2019

- Paper: 2FY1-05 Human Values, B.Tech II Sem (Main) Exam, May 2019, 80 marks.
  Parts A (5 x 2), B (6 questions, 10 marks each, two with (a)/(b) parts of
  5 marks), C (3 questions, 15 marks each, Q.3 split 8 + 7).
- Output: `~/workspace/handwritten_notes/pyq-solutions/sem2/HV-May-2019-solution.pdf`
- Pages: 13. Questions solved: 17 (all — 5 + 8 + 4, counting the (a)/(b)
  sub-questions separately).
- Unclear/illegible questions: none. The paper is printed in English and
  Hindi; the English version of each question was solved, as instructed.
- Notes: Q.2 of Part C ("five dimensions of human goal") is answered as the
  goal expressed at the five levels — individual, family, society, nature,
  existence — with the content of the goal at each level (right understanding,
  prosperity, fearlessness, co-existence in nature, co-existence in existence).

## 3. LADE — June 2022

- Paper: 2FV2-01 Linear Algebra & Differential Equations, B.Tech II Semester
  End-Term Exam, June 2022, 140 marks. Part A (7 x 4, compulsory), Part B
  (5 questions x 8, each with an A OR B choice), Part C (attempt any 3 of 5;
  Q.7 24, Q.8 8 + 16, Q.9 12 + 12, Q.10 8 + 16, Q.11 24).
- Output: `~/workspace/handwritten_notes/pyq-solutions/sem2/LADE-Jun-2022-solution.pdf`
- Pages: 12. Questions solved: 25 (all — 7 + 10 + 8, counting both options of
  every Part B OR-choice and both sub-parts of Q.8, Q.9 and Q.10).
- Unclear/illegible questions: one, flagged in the PDF itself —
  **Part C, Q.11 (heat equation)**: the paper prints the equation
  d^2z/dx^2 = (1/k) dz/dt with z(0, t) = 0 and z(l, t) = 0, but **no initial
  temperature distribution z(x, 0) is printed**. The solution is therefore
  given in the general Fourier-series form, with the coefficients B_n left in
  terms of the initial distribution f(x) = z(x, 0). If the initial condition
  is supplied, B_n follows from B_n = (2/l) x integral 0 to l of
  f(x) sin(n pi x / l) dx.
- Notes: this is a mathematics paper, so every numerical is solved in full
  steps (Given -> formula -> substitution -> steps -> boxed answer). Key
  results were re-checked with SymPy before finishing: rank 2; A not
  orthogonal (det -11); characteristic polynomial lambda^3 - 4 lambda^2 +
  4 lambda - 12 with A inverse [[1/12, 1/12, -1/3], [-5/12, 7/12, 2/3],
  [7/12, -5/12, -1/3]]; the Q.3(A) particular integral
  x^2 e^x / 8 + 1/2 - x^2 sin x / 32; the Q.3(B) particular integral
  e^{2x}(2 sin x - cos x)/10; the Q.4(A) particular integral
  -x^2 log x / 3 - 2x^2/9; the Q.4(B) series
  1 - 3x + x^2 + x^3/5 + 3x^4/35 + x^5/21 + x^6/33 + ...; the Q.8(i)
  particular integral (1/2) cos x + (x - 1)/2 sin x; the Q.8(ii) particular
  integral (x/a) sin a x + (cos a x / a^2) log |cos a x|; and the eigenvalues
  -1, -2, -3 with eigenvectors (1, 0, 0), (1, -1, 0), (1, 2, -2).

## Quality check

- Garble scan (extracted text of all three PDFs): no long joined tokens, no
  camel-case joins — clean.
- Sample pages visually inspected from each PDF (BCE pp. 1-3, 7; HV pp. 1, 5, 9;
  LADE pp. 1, 4, 7, 10): fully legible, correct style, no garbled or
  split words.
- Working files (pipeline copy + content): `~/workspace/handwritten_notes/sem2-work-oldscheme/`
  (`oldscheme_papers.py`, `build_oldscheme.py`). The shared
  `~/workspace/handwritten_notes/sem2-work/` copy was not edited.
- Nothing was uploaded to GitHub and no token was requested.
