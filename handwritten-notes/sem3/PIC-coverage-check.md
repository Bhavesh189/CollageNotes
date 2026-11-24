# PIC — Principles of Imperative Computation, Sem 3 (AI) — Coverage Check

**Basis: built from PYQ topics — no source notes or syllabus in repo.**
There are no PIC source notes anywhere in Bhavesh189/CollageNotes, and the repo's
syllabus PDFs (First Year; CSE 3rd & 4th Sem only) contain no Principles of
Imperative Computation syllabus. The ONLY authoritative topic list is the single
PYQ paper PIC-2022 (paper code 311407, B.Tech III Sem, AI branch, 2021-22,
3AI4-07, Max Marks 120). The 22 questions of that paper ARE the topic list.
No topic outside the paper was built, except the Unit 1 framing topic
"What is Imperative Computation?" (the subject's own name — the frame every
paper question sits in).

Paper transcription (visually read from both scanned pages):
`~/workspace/handwritten_notes/sem3-work/pic/pyq_transcription.md`

## Part A — 10 questions, 3 marks each (answer 6 of 10) — 10/10 covered

| # | Paper question | Notes topic (Unit) | Covered |
|---|---|---|---|
| A1 | Explain the difference between Constant and Variable. | Constant vs Variable (U1) | ✓ |
| A2 | Differentiate among algorithm and program. | Algorithm vs Program (U1) | ✓ |
| A3 | What is an abstraction in programming? | Abstraction in Programming (U1) | ✓ |
| A4 | Differentiate between coding and programming. | Coding vs Programming (U1) | ✓ |
| A5 | Define Binary search tree. | Binary Search Tree (U2) | ✓ |
| A6 | What is the hash table? | Hash Table (U2) | ✓ |
| A7 | What is a data structure invariant? | Data Structure Invariant (U2) | ✓ |
| A8 | What is dividing and conquer approach? | Divide and Conquer Approach (U2) | ✓ |
| A9 | What are external libraries in programming? | External Libraries in Programming (U5) | ✓ |
| A10 | What is void pointer? | Void Pointer (U4) | ✓ |

## Part B — 7 questions, 10 marks each (answer 3 of 7) — 7/7 covered

| # | Paper question | Notes topic (Unit) | Covered |
|---|---|---|---|
| B1 | What is a loop invariant? How is a loop invariant used? | Loop Invariant and How It Is Used (U3) | ✓ |
| B2 | How modularity can reduce the complexity? | Modularity: How It Reduces Complexity (U5) | ✓ |
| B3 | What is bit manipulation and why bit manipulation is important? | Bit Manipulation and Why It Is Important (U4) | ✓ |
| B4 | What is garbage collection in memory management? | Garbage Collection in Memory Management (U5) | ✓ |
| B5 | Differentiate between specification and implementation. | Specification vs Implementation (U5) | ✓ |
| B6 | What is a recursive case in a recursive function? Explain with example. | Recursive Case in a Recursive Function (U3) | ✓ |
| B7 | What is the basic structure of C programming? Also explain basic features of C. | Basic Structure of a C Program + Basic Features of C (U4) | ✓ |

## Part C — 5 questions, 24 marks each (answer 3 of 5) — 5/5 covered

| # | Paper question | Notes topic (Unit) | Covered |
|---|---|---|---|
| C1 | Compute the addresses of a 3D array in column major and row major form. | Arrays and Addressing: 3D Array in Row Major and Column Major Form (U2) | ✓ |
| C2 | Explain key elements of a performance monitoring evaluation. | Performance Monitoring Evaluation: Key Elements (U3) | ✓ |
| C3 | Why time and space complexity must be considered while writing a code? | Time and Space Complexity (U3) | ✓ |
| C4 | Explain undefined and implementation defined behavior in C. | Undefined and Implementation Defined Behaviour in C (U4) | ✓ |
| C5 | Explain abstractions and interface in the presentation of algorithms and data structures. | Abstractions and Interface in Algorithms and Data Structures (U2) | ✓ |

## Additional note topics (framing only)

| Topic | Why it is there |
|---|---|
| What is Imperative Computation? (U1) | Framing topic: the subject's own name; every paper question is an aspect of it. No new examinable topic added. |

## Result

- **Paper questions listed: 22. Paper questions covered in notes: 22/22.**
- **Note topics: 24** (22 paper topics + B7 split into two topics + 1 framing topic).
- **70 Most Important Questions: 70** (14 per unit), 24 starred entries marking the
  paper's own questions (B1 and B7 are split into two entries each, so 24 starred
  entries cover the 22 paper questions).
- **PYQ solutions: 22/22 solved** in `PIC-2022-solution.pdf` (31 pages), every
  question in paper order, question written first exactly as printed incl. marks,
  then the full answer below.
- **Questions not completed: none.**
- **Unclear/illegible questions: none.** One note, also flagged at the end of the
  solution PDF: Part C Q.1 gives no array name, dimensions, base address or
  element size, so the solution states assumed standard data clearly
  (int A[3][4][5], base address 1000, element size 4 bytes, address of A[2][1][3])
  as the paper's own instructions permit ("Any data you feel missing may suitably
  be assumed and stated clearly"). The words "raw major" in C Q.1 are read as
  "row major". Worked answers: row major 1192, column major 1164 (re-checked:
  row major ((2*4+1)*5+3)*4 = 192 offset; column major ((3*4+1)*3+2)*4 = 164 offset).
- **Quality checks:** garble scan on all authored text and on the extracted PDF
  text (joined/split words, camelCase joins, digit-letter glue): zero hits.
  Sample pages visually inspected from every unit (pp. 2, 12, 14, 16, 22, 27, 36)
  and from the solution PDF (pp. 2, 24): clean, legible, no garbled words.
  One diagram defect found and fixed before delivery (recursion stack arrows
  overlapping box borders, p. 22) — rebuilt and re-checked. Code blocks are
  rendered in DejaVu (exact text, bypassing the prose sanitiser) so C syntax
  such as `printf("%d", sum)` and `int *p = (int *)malloc(sizeof(int));` is exact.
- **Style:** Patrick Hand font, blue body ink, black underlined headings, red key
  terms and definition boxes, unlined white A4 portrait, 1.5 cm balanced margins,
  unit name top, page number bottom — same as the approved DBMS v2 style.
- **Environment note:** this VM had no reportlab/pymupdf installed; they were
  installed with `pip3 install --user --break-system-packages` (user site is
  disabled by default here, so builds were run with
  `PYTHONPATH=/home/hatch/.local/lib/python3.12/site-packages`).
