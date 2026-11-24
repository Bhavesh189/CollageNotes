# DSA Sem 3 — Coverage Check

Subject: **Data Structures and Algorithms (3CS4-03), Semester 3**
Source: `Bhavesh189/CollageNotes`, `notes-source/notes/sem3/data-structures-algorithms/` (13 files, 480 raw pages) + BTU syllabus `public/syllabus/sem3/syllabus.pdf` (DSA = 3CS4-03).
Notes: `~/workspace/handwritten_notes/sem3/DSA-Sem3-Handwritten-Notes-Full.pdf` — **112 pages** (Units 1–5: pp 2–62; 70 Most Important Questions: pp 63–112).
Solutions: `~/workspace/handwritten_notes/pyq-solutions/sem3/` — 7 PDFs, **98 pages total**, **154 questions solved (22 per paper)**.

## Duplicates found (dedupe by page-image hash, `dedupe.log`)

- **Unit 2**: `dsa-unit-2-part-1/2/3.pdf` (109 pp) are **fully contained** in `dsa-unit-2-complete-part-1/2/3/4.pdf` (128 pp). The complete set adds 5 pages (part 4, pp 28–32 — queue operations). Plain parts used as cross-check only; no topic repeated.
- **Unit 3**: `dsa-unit-3.pdf` (18 pp) is **fully contained** in `dsa-unit-3-complete.pdf` (33 pp). The complete file adds 15 pages (pp 19–33 — heap sort and later topics). Plain file used as cross-check only; no topic repeated.
- **Prerequisite file** (`dsa-prerequisite-linked-list.pdf`, 61 pp — C functions, pointers, strings, malloc): **folded into Unit 1 (functions/recursion) and Unit 2 (linked lists/dynamic memory)**; not a separate unit.
- No other duplicate files. Total unique source content after dedupe ≈ 366 pages (28 + 128 + 33 + 50 + 53 + 61 prerequisite, minus overlaps already counted inside the complete sets).

## Coverage — 66/66 topics

Every syllabus topic and every source topic is covered. Each topic below is a heading in the notes with a full-depth treatment (definition, explanation, why it matters, worked example, diagram/table where it fits, key exam points, common mistakes, Exam Tip).

### Unit 1 — Introduction to Algorithms and Analysis (16 topics) ✓
- [x] What is a data structure? — source U1 + syllabus
- [x] Classification of data structures (linear/non-linear, static/dynamic, primitive/non-primitive) — source U1 + syllabus
- [x] What is an algorithm? (characteristics, steps) — source U1 + syllabus
- [x] Algorithm analysis — source U1 + syllabus
- [x] Time complexity — source U1 + syllabus
- [x] Space complexity — source U1 + syllabus
- [x] Asymptotic notations (Big-O, Big-Omega, Big-Theta, little-o, little-omega) — source U1 + syllabus
- [x] Orders of growth — source U1 + syllabus
- [x] Best, worst and average case analysis — source U1 + syllabus
- [x] Analysis of non-recursive algorithms — source U1 + syllabus
- [x] Recurrence relations — source U1
- [x] Solving recurrences (substitution, recursion tree, Master method) — source U1 + syllabus
- [x] Linear search — source U1/U3
- [x] Binary search (recursive, T(n) = T(n/2) + c) — source U1/U3 + syllabus
- [x] Functions and recursion (incl. call by value/address) — prerequisite file
- [x] Pointers and dynamic memory (malloc, calloc, free) — prerequisite file

### Unit 2 — Linear Data Structures (15 topics) ✓
- [x] Arrays — 1D/2D, address calculation (row-major/column-major) — source U2 + syllabus
- [x] Stack (PUSH/POP/PEEK, array implementation) — source U2 + syllabus
- [x] Applications of stack — source U2
- [x] Infix, postfix and prefix expressions (conversion, evaluation) — source U2 + syllabus
- [x] Tower of Hanoi (recursive algorithm, 2^n − 1 moves) — source U2 + syllabus
- [x] Queue (enqueue/dequeue, array implementation) — source U2 + syllabus
- [x] Circular queue (wrap-around, full/empty tests, worked F/R trace) — source U2 + syllabus
- [x] Double-ended queue (deque, input/output-restricted) — source U2 + syllabus
- [x] Priority queue (array + heap implementations, applications) — source U2 + syllabus
- [x] Linked list (concept, node structure, vs array) — source U2 + prerequisite
- [x] Singly linked list — operations (insert/delete/search at all positions) — source U2 + syllabus
- [x] Doubly linked list — source U2 + syllabus
- [x] Circular linked list — source U2 + syllabus
- [x] Polynomial addition/subtraction using linked lists — source U2 + syllabus
- [x] Linked list vs array (comparison table) — source U2

### Unit 3 — Sorting and Search Techniques (11 topics) ✓
- [x] Sorting basics (internal/external, stable/unstable, in-place) — source U3 + syllabus
- [x] Bubble sort — source U3 + syllabus
- [x] Selection sort — source U3 + syllabus
- [x] Insertion sort — source U3 + syllabus
- [x] Merge sort (recurrence, Master method, traces) — source U3 + syllabus
- [x] Quick sort (partition, average-case analysis) — source U3 + syllabus
- [x] Heap sort (max-heap build, extraction traces) — source U3-complete + syllabus
- [x] Shell sort — source U3 + syllabus
- [x] Counting sort — source U3 + syllabus
- [x] Stable and unstable sorting — syllabus (exam questions in 2023/2026 PYQs)
- [x] Comparison of sorting algorithms (table) — syllabus

### Unit 4 — Trees (8 topics) ✓
- [x] Tree terminology (root, leaf, depth, height, level, degree) — source U4 + syllabus
- [x] Binary tree (types: full/complete/perfect/skewed, representations) — source U4 + syllabus
- [x] Properties of a binary tree (level/node counts, leaves = internal + 1) — source U4 + syllabus
- [x] Tree traversals (inorder/preorder/postorder/level order, construction from preorder+inorder) — source U4 + syllabus
- [x] Expression trees — source U4 + syllabus
- [x] Binary search tree (insert, delete 3 cases, search) — source U4 + syllabus
- [x] AVL trees (balance factor, LL/RR/LR/RL rotations, insert/delete) — source U4 + syllabus
- [x] B-tree and B+ tree — PYQ topic (DSA-2021 Part B Q.5), not in the source notes or the syllabus. Included in the notes as one short topic (7 blocks) because the PYQ asks for it and it completes the Trees unit; solved in full in the DSA-2021 solution PDF. (See "PYQ-only topic" below.)

### Unit 5 — Graphs and Hashing (16 topics) ✓
- [x] Graph terminology (vertex, edge, degree, path, cycle, connected, complete, strongly/weakly connected) — source U5 + syllabus
- [x] Representation of graphs (adjacency matrix, adjacency list) — source U5 + syllabus
- [x] Breadth-first search (BFS, queue, shortest path) — source U5 + syllabus
- [x] Depth-first search (DFS, stack/recursion, backtracking) — source U5 + syllabus
- [x] Spanning tree and minimum spanning tree — source U5 + syllabus
- [x] Prim's algorithm — source U5 + syllabus
- [x] Kruskal's algorithm — source U5 + syllabus
- [x] Dijkstra's algorithm (single-source shortest path) — source U5 + syllabus
- [x] Hashing — introduction, hash functions (division, mid-square, folding, multiplication) — source U5 + syllabus
- [x] Separate chaining (open hashing / closed addressing) — source U5 + syllabus
- [x] Linear probing (closed hashing / open addressing) — source U5 + syllabus
- [x] Quadratic probing — source U5 + syllabus
- [x] Double hashing — source U5 + syllabus
- [x] Random probing and rehashing — source U5 + syllabus
- [x] Primary clustering — source U5 (PYQ 2022 Part C Q.5)
- [x] Recent trends in data structures and algorithms — source U5 + syllabus

**Terminology note (source confusion, fixed in notes):** the source notes write "Closed Addressing (open Hashing): Chaining". The notes present the standard terms and explain them: chaining = open hashing = closed addressing; probing = closed hashing = open addressing. The source's confusion is not copied.

## 70 Most Important Questions — 70/70, 14 per unit
- Marks: 8 × 2-mark, 45 × 5-mark, 17 × 10-mark. **46 starred** (repeated in 2+ papers).
- Answers sized by marks (2-mark: 4–6 lines; 5-mark: half to one page; 10-mark: 1–2 pages).

## PYQ solutions — 154/154 questions, 7 papers
| Paper | Pages | Questions |
|---|---|---|
| DSA-2021-solution.pdf | 16 | 22/22 |
| DSA-2022-solution.pdf | 20 | 22/22 |
| DSA-2024-solution.pdf | 11 | 22/22 |
| DSA-2025-solution.pdf | 12 | 22/22 |
| DSA-2026-solution.pdf | 14 | 22/22 |
| DSA-Dec-2019-solution.pdf | 13 | 22/22 |
| DSA-May-2023-solution.pdf | 12 | 22/22 |

All questions solved in paper order, question written first exactly as printed (incl. marks), then the full answer. No question skipped, no "similar to Q2".

## PYQ-only topic (solved in full in the solution PDF; short version in the notes)
- **B-tree vs B+ tree** (DSA-2021 Part B Q.5) — not in the source notes or the syllabus; solved in full in the DSA-2021 solution PDF. It also appears as one short topic in the Unit 4 notes (a deliberate, disclosed exception to the no-new-topics rule, because the PYQ asks for it and it completes the Trees unit).

## Unclear / flagged questions (also flagged at the end of each solution PDF)
- **DSA-2021 Part B Q.4**: asks for Dijkstra's algorithm "with suitable data" — no graph is printed; a suitable graph was assumed and stated in the solution.
- **DSA-2022 Part B Q.5**: numbers printed as "348, 14, 614, 5381, 47" — 5381 taken as printed (verified at 300 dpi); possibly a misprint for 538, 1.
- **DSA-2024 Part C Q.5**: first code line has an ink blot over the operator — reads "x = x + [blot] y++;". Solved as `x = x + y++;`, assumption stated in the solution and in the question text as `[?]`.
- **DSA-2024 / DSA-2025 Part C Q.2 (printv)**: the five sub-parts are marked [3] each (15 marks) inside a 10-mark question — reproduced as printed.
- **DSA-2025 Part B Q.4**: paper prints "samplex(x-1)" — typo for sample(x-1); solved as sample(x-1). The function is void, so the answer is the printed output (1 3 3 5 7 7 7).
- **DSA-2025 Part C Q.5**: code uses `x = x++ * y++;` and `x = x++ - y;` — undefined behaviour in strict C; solved with the textbook left-to-right post-increment convention, stated explicitly in the solution.
- **DSA-May-2023 Part B Q.5**: one diagonal line in the Kruskal graph looks like a scan crease and carries no label; the MST (total 99) is computed from the 9 labelled edges only.
- **DSA-May-2023 Part A Q.3**: question text partly smudged; read as "Insert the keys 10, 1, 3, 5, 15, 12, 16 into a BST. What is the height of the tree?"

## Corrections made during QA (after first build)
1. **Tower of Hanoi 4-disk move list** (notes, Unit 2): the first draft listed the moves for the wrong destination peg. Corrected to the verified sequence S→D, S→A, D→A, S→D, D→S, D→A, S→A, S→D, A→S, A→D, S→D, A→S, D→A, D→S, A→D.
2. **Heap-sort traces** (notes Unit 3; DSA-2021 C.4; DSA-Dec-2019 B.5): the built max-heap arrays were wrong in the first draft (28 and 56 swapped in the 28-heap; the 25-heap was built incorrectly). Both heaps and their full extraction traces were recomputed step by step and corrected: 28-heap = 85, 67, 71, 36, 18, 56, 28; 25-heap = 25, 19, 18, 7, 15, 10, 1, 5, 6, 13. Final sorted arrays were already correct and are unchanged.
3. **DSA-2024 B.4 (sam) explanation**: the first draft wrongly suggested the recursion might not end without `static`. Corrected: the answer is 6 either way; the point is that a static variable is initialised once.
4. **DSA-2024 B.3 stack result**: corrected to S top→bottom 4, 5, 2, 1 (recomputed from the 3 pops / 2 deques in the question); Q front→rear 3, 4, 5.

## QA performed
- Garble scan over all 8 PDFs (long joined words, digit-in-word, camel-joins): **0 issues**.
- Visual inspection of rendered pages from every unit (title, U1 p3, U2 p15, U3 p30, U4 p40, U5 p50, 70Q pp 65/100) and one page from every solution PDF, plus re-inspection of all four corrected pages after the rebuild. Style confirmed: Patrick Hand, blue body ink, black underlined headings, red key terms/definition boxes, unlined white A4, ~1.5 cm balanced margins, unit name top, page number bottom.
- Every key in `papers.py` checked to resolve (66 CUSTOM blocks, all topic keys non-empty); all 7 papers × 22 questions present.
