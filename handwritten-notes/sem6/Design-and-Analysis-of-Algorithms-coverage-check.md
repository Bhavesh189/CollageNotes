# DAA Sem 6 — Coverage Check

Subject: Design & Analysis of Algorithms (DAA), Semester 6
Source: `Bhavesh189/CollageNotes`, `notes-source/notes/sem6/design-and-analysis-of-algorithms/daa-unit-1.pdf` … `daa-unit-5.pdf`
Style: approved full-depth handwritten style (Patrick Hand, blue ink, red key terms, unlined white A4, ~1.5 cm margins)
Output: `~/workspace/handwritten_notes/sem6/Design-and-Analysis-of-Algorithms-Sem6-Handwritten-Notes-Full.pdf` — **239 pages, A4**
Build: `~/workspace/handwritten_notes/sem6-work-daa/` (`build_notes_v2.py`, `build_solutions.py`)
Coverage: **393 source headings rendered** (build's `covered.json`); all 52 curated expansions render; all 70 questions present (Q.1–Q.70); both PYQ papers solved, all 44 questions present.

Unit boundaries in the notes PDF: Unit 1 pp 2–59, Unit 2 pp 60–102, Unit 3 pp 103–130, Unit 4 pp 131–146, Unit 5 pp 147–165, 70 Most Important Questions pp 166–239.

## Unit 1 — Analysis of Algorithms & Divide and Conquer (13 lectures, 170 sections)
- [x] Analysis of Algorithms (Knuth; best/worst/average case; performance vs complexity)
- [x] Algorithmic Efficiency (Ada Lovelace 1843; bubble sort vs timsort; hidden constant; space-time trade-off)
- [x] Runtime Analysis (O(1)…O(n!) order; n=10 vs n=20 table; memory footprint) — log table standardised to log base 2 (see corrections)
- [x] Asymptotic Analysis (dominant term; Big-O / Big-Omega / Big-Theta with worked examples 3n+2=O(n), 8n²+2n−3=Ω(n²), 3n+2=Θ(n))
- [x] Master Method (3 cases; worked examples T(n)=8T(n/2)+1000n²→Θ(n³), T(n)=2T(n/2)+10n→Θ(n log n), T(n)=2T(n/2)+n²→Θ(n²))
- [x] Searching vs Sorting (linear/binary search; internal/external sorting; comparison table)
- [x] Divide and Conquer (DAC template; max-min array {70,250,50,80,140,12,14} → max 250, min 12; D&C vs DP; Karatsuba; binary search is decrease-and-conquer, not D&C)
- [x] Binary Search (steps; array [11,14,25,30,40,41,52,57,70], val=40 found at index 4 in 1 comparison) — source's K=56 corrected (56 is not in the array)
- [x] Quick Sort (last-element pivot; trace with pivot 24 and elements 27,19,9,29,14)
- [x] Merge Sort (array [12,31,25,8,32,17,40,42] → sorted [8,12,17,25,31,32,40,42]; recursion tree diagram)
- [x] Heap Sort (max-heap; extraction roots 89,81,76,54,22,14,11,9 verified by script; sorted [9,11,14,22,54,76,81,89])
- [x] Recurrence Analysis of Merge Sort + Recurrence Relations (Fibonacci, factorial, Tower of Hanoi; order/degree; linear/D&C/substitution/homogeneous/non-homogeneous types; substitution method, recurrence tree method T(n)=T(n/4)+T(n/2)+cn²→O(n²), Master Method)

## Unit 2 — Greedy Method & Single-Source Shortest Paths (9 lectures, 80 sections)
- [x] Greedy method (feasible vs optimal; A→B travel example, 12-hour constraint; candidate set, selection, feasibility, objective, solution functions; applications; greedy choice property)
- [x] Exact vs Approximate Solving (Simplex, Branch & Bound, cutting-plane, Lagrange, KKT, trust region, backtracking; heuristics vs metaheuristics)
- [x] Minimum Spanning Tree (E′=|V|−1; n^(n−2) spanning trees; 4-vertex complete graph 16 trees; MST example sums 12/14/11/10)
- [x] Knapsack types (fractional / 0-1 / bounded / unbounded; comparison table; variations)
- [x] Kruskal's algorithm (graph A–F; MST = BD2, DE2, AC3, CD3, AF7, cost 17 — verified by script; source typos "AF = 6"/"FC = 6" corrected to weights 7 and 8)
- [x] Prim's algorithm (start B; BD=4, DE=2, CD=1, CA=3; MST cost 10; complexity table: matrix O(V²), binary heap O(E log V), Fibonacci heap O(E+V log V))
- [x] Bellman-Ford (6-vertex graph A–F; final distances A0 B1 C3 D5 E0 F3 — source's iter-2 text for edge (E,F) wrongly used stale E=5; corrected F=3; negative-cycle example, cycle weight −1)
- [x] Dijkstra's algorithm (Dijkstra 1959; example A–F, final A=0,B=4,C=5,D=13,E=8,F=14; applications: Google Maps, OSPF, flights, robots)
- [x] Huffman Codes (100,000 chars, a45,b13,c12,d16,e9,f5; fixed 3-bit = 300,000 bits; variable code = 224,000 bits, ~25% saving; prefix codes)
- [x] Activity Selection (10 activities, s=(1,2,3,4,7,8,9,9,11,12), f=(3,5,4,7,10,9,11,13,12,14); selected A1,A3,A4,A6,A7,A9,A10 = 7 activities)

## Unit 3 — Dynamic Programming & All-Pairs Shortest Paths (8 lectures, 68 sections)
- [x] Dynamic Programming (characteristics; optimal substructure; DP vs recursion; tabulation vs memoisation; greedy vs DP; principle of optimality)
- [x] Rod Cutting (prices; n=4 best is 2+2; top-down and bottom-up code) — full price table is an image in the source and not extractable as text, so the classic CLRS price table was used for the complete worked example (consistent with the source's 2+2 conclusion for n=4); the source's mangled bottom-up code paragraph is reproduced as-is
- [x] Floyd-Warshall (Floyd & Warshall 1962; 4-vertex graph A–D, shortest A→D = 4; O(V³)/O(V²); why not Bellman-Ford/Dijkstra for all pairs) — heavy OCR garble in this lecture repaired via PHRASES (e.g. "set of rules"→"algorithm", "shortest direction"→"shortest distance", missing "+" restored in D[i][j] = min(D[i][j], D[i][k] + D[k][j])); source's "negative weight cycles" wording corrected to "negative weight edges"; graph diagram labels fixed so parallel edges (B↔C, A↔D, C↔D) no longer overlap
- [x] TSP using Branch and Bound (5-city matrix; row reduction 21, column reduction 4, root bound 25; tour 1→4→2→5→3→1 cost 28 verified)
- [x] Longest Common Subsequence (X=abaaba, Y=babbab; LCS length 4; full 6×6 table; source's "baba" used — "abab" is also valid)
- [x] 8-Queens + 0/1 Knapsack (capacity 30, 3 items, optimal items 2+3 value 200 = 140+60; source also prints "120" once — inconsistent, 200 is the arithmetic)
- [x] TSP / Approx-TSP (triangle inequality; MST-based 2-approximation)
- [x] Optimal Binary Search Tree — PYQ-only topic (no source section); worked example in the 2024 solution PDF (keys 10,12,20; expected cost 2.1, root key 12) and in the 70 Questions

## Unit 4 — Branch and Bound & Backtracking (7 lectures, 30 sections)
- [x] Branch and Bound (jobs j1–j4, P={10,5,8,3}, d={1,2,1,2}; variable-size vs fixed-size solutions; FIFO/BFS, LIFO/DFS, LC search; LC node costs 25,12,19,30 in first telling — second telling's inconsistent costs 12,16,10,315 not used)
- [x] B&B search techniques and when to apply
- [x] FIFO / LIFO / LC Branch and Bound on set {A,B,C,D}
- [x] Least Cost Branch and Bound
- [x] Applications (integer programming, TSP, QAP, MAX-SAT, 0/1 knapsack, set cover)
- [x] 0/1 Knapsack by DP (N=3,W=4, profit {1,2,3}, weight {4,5,1} → max 3; recursion tree; bottom-up table weight {1,2,3}, profit {10,15,40}, W=6 → max 65, all three items — matches source exactly)
- [x] Backtracking vs Branch and Bound comparison (added from PYQ — no source section; comparison table + worked 4-queens and 8-queens traces; 8-queens first solution (1,5,8,6,3,7,2,4), 92 solutions in all — verified by script)

## Unit 5 — NP-Hard, NP-Complete & Approximation Algorithms (8 lectures, 51 sections)
- [x] Computational Complexity Theory (P vs NP; solvable vs unsolvable; decidable vs undecidable; Halting problem; open problems)
- [x] P vs NP differences table
- [x] NP-Hard & NP-Complete (definition: in NP + every A in NP polynomial-time reducible to B; TSP NP-complete proof via Hamiltonian cycle)
- [x] Circuit-SAT / SAT (F = X + YZ; CIRCUIT-SAT ≤p SAT, SAT ≤p CIRCUIT-SAT)
- [x] Subset Sum NP-complete (Vertex Cover reduction, base-4 matrix, example V′={1,3}, k=2, k′=682 — arithmetic verified: 321+276+64+16+1+4=682)
- [x] String Matching (exact: naive, KMP, Boyer-Moore, Trie, automaton, Aho-Corasick O(n+m+z), Rabin-Karp; approximate: naive, Sellers, Shift-Or; applications: plagiarism, bioinformatics/DNA, forensics, spell checker, spam filters, search engines, intrusion detection)
- [x] Approximation Algorithms (performance ratio max(C/C*, C*/C) ≤ ρ(n); examples: vertex cover, TSP, set cover logarithmic ratio, subset sum)

## 70 Most Important Questions (Part B, pp 166–239)
- [x] 70 questions, 14 per unit (Unit 1: 3×2m, 4×5m, 7×10m; Unit 2: 2×2m, 5×5m, 7×10m; Unit 3: 3×2m, 3×5m, 8×10m; Unit 4: 1×2m, 7×5m, 6×10m; Unit 5: 4×2m, 4×5m, 6×10m)
- [x] Most-repeated questions marked with a red star; answers sized by marks (2-mark 4–6 lines, 5-mark half to one page, 10-mark 1–2 pages)
- [x] All 70 answers non-empty (verified at the `topic_blocks` level and in the built PDF: Q.1–Q.70 labels all present)

## PYQ Solutions (Part C)
- [x] `~/workspace/handwritten_notes/pyq-solutions/sem6/DAA-2024-solution.pdf` — **16 pages, 22 questions** (Part A 10×2, Part B 7×4, Part C 5×10). Every question in order, question written in handwriting first exactly as printed incl. marks, then the full answer.
- [x] `~/workspace/handwritten_notes/pyq-solutions/sem6/DAA-2025-solution.pdf` — **15 pages, 22 questions** (Part A 10×2, Part B 7×4, Part C 5×10). Same format.
- [x] Verified worked solutions: Strassen Θ(n^2.81) (source once prints the wrong O(n^2.8974)); Master Theorem T(n)=2T(n/2)+n → Θ(n log n); Huffman 2025 (codes F=0, C=100, D=101, E=110, A=1110, B=1111; 224 bits); Rabin-Karp 2025 (pattern "AB" in "ABABABA", matches at shifts 0, 2, 4); TSP DP 2025 (assumed 4-city matrix, optimal cost 80); Knapsack B&B 2025 (assumed instance, optimal items 1+2, profit 100); 4-queens trace (solution (2,4,1,3)); 8-queens constraints trace (first solution (1,5,8,6,3,7,2,4)); subset-sum 2024 complete state-space tree (A={3,5,6,7}, d=15, unique solution {3,5,7}); OBST 2024 (expected cost 2.1); subset-sum NP-completeness by reduction (2025 C5).

## Unclear questions flagged (in the solution PDFs, end of each)
DAA-2024:
- Part B Q.1 prints the symbol π where Big-Omega is meant; read as Ω throughout.
- Part C Q.3 prints "ASAP" for the All-pairs shortest path problem; read as APSP.

DAA-2025 (paper prints no data for these — a clearly stated assumed instance is used and flagged):
- Part B Q.2 prints no array — a 5-element array [24, 9, 29, 14, 19] is assumed and traced.
- Part B Q.3 prints no graph — an assumed graph is used for Prim's algorithm.
- Part B Q.4 text is faint but readable.
- Part C Q.2 gives no knapsack instance — an instance (items (w5,v60), (w4,v40), (w3,v30), W=10) is assumed.
- Part C Q.4 prints no distance matrix — a 4-city matrix is assumed.

## Corrections made to source errors (all verified by script, not by guessing)
- Runtime log table: source mixed log bases (log10(10)=1 but ln(20)=2.996) and printed 20! as "2.432902e+1818" — standardised to log base 2 (log2(10)=3.32, log2(20)=4.32, 10!=36,28,800, 20!=2.43×10^18).
- Binary search: source's K=56 is not in the array — corrected to K=40 (the source's own program value).
- Max-min code: source prints "Maximum: 120, Minimum: 11" for input {70,250,50,80,140,12,14} — correct values 250 and 12 used.
- Kruskal: source typos "AF = 6"/"FC = 6" — weights 7 and 8 used (MST cost 17 verified).
- Bellman-Ford: source's iteration-2 text for edge (E,F) used stale E=5 — correct F=3 (final distances A0 B1 C3 D5 E0 F3).
- Floyd-Warshall: ~30 OCR-garbled phrases repaired (see Unit 3); "negative weight cycles" corrected to "negative weight edges"; missing "+" restored in the update formula.
- LCS: "2max(m, n)" corrected to 2^max(m, n).
- Strassen: source once prints O(n^2.8974) — correct exponent 2.81 used (log2 7).
- 0/1 knapsack (Unit 3): source prints "120" once — correct optimum 200 (items 2+3) used.
- LC Branch & Bound node costs: two inconsistent tellings in the source (25,12,19,30 vs 12,16,10,315) — first telling used.
- 8-queens example: the first draft claimed row 3 had no safe column with rows 1–2 placed at (1,3) — wrong; row 3 col 5 is safe. Rewritten from a verified backtracking trace.

## Quality checks
- Garble scan (fitz text extraction over all 3 PDFs): 0 joined/split words. Only "long-token" hits are the source-path string on the title page and a binary set notation S={1001,1100,0110,0011} on p154. Camel-case hits are all legitimate notation (O(E + V log V), a1..aN, {wi1, wi2, …, wiM}).
- Visual inspection: notes pp 1, 5, 20, 35, 65, 85, 110 (incl. zoomed Floyd diagram), 125, 135, 150, 170, 200, 201, 237; 2024 solutions pp 3, 8, 12, 15, 16; 2025 solutions pp 3, 8, 12. All fixed pages re-inspected after rebuild: log table (p5), K=40 (p35), Floyd diagram labels + merged heading (p110), Q.33 definition box (p201), 2-mark definition boxes (2024 p3), complete subset-sum tree (2024 p16), 4-queens trace (2025 p8), Huffman + knapsack B&B (2025 p12).
- Known source-extraction artefacts left as-is (source's own wording, same class as DBMS p31): rod-cutting bottom-up code paragraph (p110), the "Backtracking | Set 3 (N Queen Problem)…" cross-reference fragment (p125), binary-search pseudocode running together (p35), duplicate headings where a lecture name equals its section heading (pp 20, 65, 135).

## Result
**COVERAGE: complete** — 393 source headings rendered, all 52 curated expansions rendered, all 70 questions answered, all 44 PYQ questions solved. Nothing missing, nothing thin.
