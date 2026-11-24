# Analysis of Algorithms (Sem 5) — Coverage Check

Built from PYQ topics — no source notes or syllabus for this subject exist in the repo.
Papers: AOA-2022 (B.Tech V Sem 2021-22, 5CS4-05, 120 marks) and AOA-May-2023
(B.Tech V Sem May 2023, 5CS4-05, 120 marks). 44 topics, 22 + 22 questions.
Notes: `Analysis-of-Algorithms-Sem5-Handwritten-Notes-Full.pdf`, 126 pages.
Solutions: `pyq-solutions/sem5/AOA-2022-solution.pdf` (24p, 22/22 solved),
`pyq-solutions/sem5/AOA-May-2023-solution.pdf` (28p, 22/22 solved).

## Unit 1 — Analysis (8 topics)
- [x] Criteria for the effectiveness of an algorithm (May-2023 A1)
- [x] Asymptotic notation (May-2023 A2)
- [x] Exponential vs polynomial running time (2022 A1)
- [x] Divide and conquer method (May-2023 C4)
- [x] Lower bound theory (May-2023 B3)
- [x] Master theorem, incl. T(n) = 3T(n/3) + n/2 (2022 B4)
- [x] P, NP, NP-hard, NP-complete (2022 A6, May-2023 A6)
- [x] Cook's theorem (May-2023 B6)

## Unit 2 — Divide and conquer, sorting, string matching (12 topics)
- [x] Merge sort (May-2023 C4)
- [x] Quick sort (May-2023 C4)
- [x] Randomised quick sort (2022 B5)
- [x] Merge sort vs quick sort (May-2023 A3)
- [x] Strassen's matrix multiplication (May-2023 B1)
- [x] Matrix multiplication complexity, conventional vs Strassen (May-2023 A5)
- [x] Binary search tree and three traversals (2022 C5)
- [x] Breadth-first and depth-first search (2022 C4)
- [x] Pattern matching, general principle (May-2023 A4)
- [x] Rabin-Karp algorithm and complexity (2022 A7)
- [x] Boyer-Moore algorithm (2022 C2)
- [x] KMP algorithm, prefix function for "ababbabaa" (May-2023 C3)

## Unit 3 — Greedy, spanning trees, compression, flow (7 topics)
- [x] Greedy applications (2022 A9)
- [x] Minimum spanning tree, Kruskal/Prim, MST graph (2022 B1)
- [x] Job sequencing with deadlines, 6-job instance (2022 C1)
- [x] Huffman coding, frequencies (10,15,12,3,4,13,1) (2022 C3)
- [x] Assignment problem (2022 A10)
- [x] Maximum network flow problem (2022 C2)
- [x] Multicommodity flow and flow shop scheduling (May-2023 B7)

## Unit 4 — Dynamic programming (6 topics)
- [x] Principle of optimality (2022 A2)
- [x] Dynamic programming, meaning (May-2023 A8)
- [x] 0/1 knapsack, 4-item and 7-item instances (2022 B3, May-2023 B4)
- [x] Longest common subsequence, AGGTAB/GXTXAYB (2022 B2)
- [x] Matrix chain multiplication, array 30,1,40,10,25 (May-2023 C5)
- [x] When and how DP applies (May-2023 C5)

## Unit 5 — Backtracking, randomised, NP-complete (11 topics)
- [x] Backtracking, 4-Queen problem (2022 A8)
- [x] Branch and bound, 8-Queen problem (May-2023 B2)
- [x] Hamiltonian circuit by backtracking (2022 B7)
- [x] Subset-sum problem, S = {1,3,4,5}, d = 11 (May-2023 C2)
- [x] Travelling salesman problem (2022 C2, May-2023 B3)
- [x] Approximation algorithms and accuracy (2022 A3)
- [x] Vertex cover and set cover approximations (2022 B6, May-2023 B6)
- [x] Satisfiability, 2-SAT, vertex cover problem (2022 A4, May-2023 A10)
- [x] Bipartite graph (2022 A5)
- [x] Randomised algorithms, strategy, pros/cons (May-2023 A7, B5)
- [x] Las Vegas and Monte Carlo, min-cut and 2-SAT (May-2023 C1)

Coverage: 44/44 topics. No topic from either paper left out.
Numerical answers verified by code: MST 37; LCS length 4 (GTAB); knapsack 2022 value 7
(items 1,2); knapsack 2023 profit 54 (items 1,2,3,5,6); Huffman avg 2.52 bits/symbol;
KMP pi = 0,0,1,2,0,1,2,3,1; matrix chain 1400; job sequencing profit 990; subset-sum
no solution; Hamiltonian circuit S-T-W-X-V-U-S; min vertex cover size 4.
Flags: handwritten numbers under the KMP pattern on the May-2023 scan are a student's
marks, not the printed question (two are wrong); Part B/C marks for May-2023 are 8/15
as in the 2022 paper (not printed beside the questions on that scan).
