# Coverage Check — Discrete Mathematics, Semester 4 (BTech CSE)

**Notes PDF:** `~/workspace/handwritten_notes/sem4/Discrete-Mathematics-Sem4-Handwritten-Notes-Full.pdf`
**Pages:** 178 (A4) — Unit 1 pp 1–21, Unit 2 pp 22–43, Unit 3 pp 44–66, Unit 4 pp 67–96,
Unit 5 pp 97–124, 70 Most Important Questions pp 125–178.
**Rendered headings in the notes PDF:** 491 (source sections + full-depth expansion
sub-headings, tables and diagrams).
**Source:** `Bhavesh189/CollageNotes`, `notes-source/notes/sem4/discrete-mathematics/`
dm-unit-1.pdf (41 pp, scanned), dm-unit-2.pdf (39 pp, scanned), dm-unit-3.pdf (28 pp),
dm-unit-4.pdf (60 pp), dm-unit-5.pdf (39 pp). Total 207 source pages.
Units 1–2 are scanned/image PDFs — OCR'd with RapidOCR and repaired with a
vocabulary segmenter/rejoiner (`sem4-work/dm/segment_ocr.py`); Units 3–5 are text PDFs.
**Result: every distinct source section heading is covered — 426/426.**
(64 Unit 1 + 71 Unit 2 + 86 Unit 3 + 91 Unit 4 + 114 Unit 5 distinct headings;
a heading is listed once even when it repeats across lectures.)

## Method
1. Extracted every section heading from all 5 source units
   (`source_u1.json` … `source_u5.json` in `sem4-work/dm/`).
2. Built the notes with the DBMS-v2 pipeline (same approved style: Patrick Hand,
   blue ink, red key terms, unlined white A4, ~1.5 cm margins).
3. Checked the build output (491 headings rendered), ran a garble scan
   (zero tokens ≥ 22 characters in notes and in all 6 solution PDFs) and visually
   inspected rendered pages from every unit and every solution PDF.
4. Fixed everything found: source misprints corrected (K(m,n) planar condition,
   recurrence a_n = a_{n−1} + n, "Every factor group is abelian" NOT copied),
   quantifier glyphs restored (∀ / ∃), OCR joins repaired (biconditional,
   sentence, graphical, implied, orientation, increasing, n squared is,
   72 but 48 does, …).

## Unit 1 — Propositional Logic, Proofs & Induction (pp 1–21) — 64/64 ✓
- [x] Proposition / Propositional Variables (definition, examples: propositions
      and non-propositions)
- [x] Compound Statements; Implies / if…then; If and only if
- [x] Basic Logical Operations (negation, conjunction, disjunction, implication,
      biconditional) with truth tables
- [x] Derived Connectors (NAND, NOR, XOR — source misprints the NAND/NOR
      table headers; notes use the correct ~(p∧q) / ~(p∨q))
- [x] Conditional Statement; Bi-Conditional Statement
- [x] Principle of duality; Idempotent, Identity, Complement laws
- [x] De Morgan's laws (incl. Morgan's Law heading); truth-table verifications
      (solutions: construct the truth table for both propositions)
- [x] Predicate Logic; Predicate Logic — Definition; predicates E(x,y), M(x,y)
- [x] Existential Quantifier; Universal Quantifier; negating quantified
      propositions (quantifier glyphs ∃/∀ restored from OCR "3"/"×")
- [x] Normal Forms; Disjunctive Normal Form (DNF); minterms/maxterms; PDNF/PCNF
- [x] Logical Implication and Logical Equivalence; Idempotent / Commutative /
      Associative / Distributive / Identity / Complement / Double Negation
      (Involution) / De Morgan's / Absorption laws (PV(QVR), PV(Q~R), PVT, PVF,
      PAT, PAF, PV¬P, PV(PAQ) all covered)
- [x] Conditional and Biconditional Statements; valid argument ("Is the following
      a valid argument? … Therefore, a horse is a dog.")
- [x] Mathematical Induction (inductive step; 2^(2n)−1 divisible by 3;
      1+3+5+…+(2k−1) = k²)
- [x] Methods of Proofs; Types of Proofs; Direct Proof; Proof by contradiction;
      contrapositive (odd/even theorems: m, n odd ⇒ m+n odd; n² odd ⇔ n odd;
      divisible by 4 ⇒ divisible by 2; y+y=y ⇒ y=0)

## Unit 2 — Set Theory, Relations, Functions, Posets & Lattices (pp 22–43) — 71/71 ✓
- [x] Introduction of Sets; Sets Representation; Standard Notations
- [x] Types of Sets (improper/proper subset, universal, null, singleton,
      equal, equivalent, disjoint)
- [x] Properties of Subsets (S = {k, p, m})
- [x] Operations on Sets (union, intersection, difference, complement —
      A∪B, A∩B, A−B, A′ set-builder forms)
- [x] Algebra of Sets (table of laws); De Morgan's; Identity Laws; Involution Law
- [x] Bell Numbers; partitions (alternate partitions)
- [x] Problems on Sets; inclusion–exclusion word problems
      (n(A∪B) = n(A−B) + n(A∩B) + n(B−A); English/French numerical:
      15 both, 57 English only, 28 French only)
- [x] Relations — Domain and Range; Important Points; reflexive / symmetric /
      antisymmetric relations; Representing Relations (matrix, digraph);
      Combining Relations; Inverse Relation; Complementary Relation
- [x] Equivalence relation R = {(1,1),(1,3),(2,2),(2,4),(3,1),(3,3),(4,2),(4,4)}
      with classes {1,3}, {2,4}; union of two equivalence relations need not
      be transitive
- [x] Functions & types of functions; Injective (one-to-one); Surjective (onto);
      Bijective (one-to-one correspondence); inverse of a one-to-one
      correspondence; composition (g∘f)(x) = g(f(x)); facts about composition;
      composition worked out; Recursively Defined Functions
- [x] Partially Ordered Sets; Comparable / Non-Comparable Elements
- [x] Hasse diagrams (definition, rules, divisibility Hasse {3,4,12,24,48,72},
      divisors of 12, maximal/minimal/greatest/least elements, upper/lower
      bounds, lub/glb)
- [x] Bounded Lattices; Properties of Bounded Lattices; finite-lattice proof;
      lattice of positive integers under divisibility; Isomorphic Lattices;
      Distributive Lattice; Modular Lattice; Direct product of Lattices

## Unit 3 — Combinatorics, Recurrence Relations & Generating Functions (pp 44–66) — 86/86 ✓
- [x] Combinatorics; Basic Counting Principles
- [x] Mathematical Functions; Factorial (n! forms)
- [x] The Pigeonhole Principle
- [x] Permutations and Combinations and Binomial Coefficients; two types of
      permutations; two types of combinations; permutation/combination formula
      lists (P = n!/(n−r)!, C = n!/(n−r)!r!); letter-arrangement countings
      (vowels among themselves, required number of ways)
- [x] Binomial Theorem (n ∈ N, x,y ∈ R); expansions; properties of binomial
      coefficients; general term; middle term(s); determining a particular term;
      independent term
- [x] Introduction to Recurrence Relation and Recursive Algorithms; Recurrence
      Relation Definition / Formula / Examples; Factorial Representation;
      Fibonacci Numbers; Solving Recurrence Relations; Recurrence Relation
      Problem (source prints a_n = a_{n−1} − n but computes + n — notes use
      the correct + version, sequence 4, 5, 7, 10, 14, 19…)
- [x] Recursive Algorithm; recursive method laws; find_max(list)
- [x] Order of the Recurrence Relation; Degree of the Difference Equation
- [x] Linear Recurrence Relations with Constant Coefficients; Linear Homogeneous
      Recurrence Relations with Constant Coefficients (characteristic equation,
      homogeneous solutions, worked examples)
- [x] Non-Homogeneous Linear Difference Equations and Particular Solution;
      undetermined coefficients method (constant z, z^r, polynomial P(r));
      Total Solution
- [x] Generating Functions (definition, expression, G(t) derivations,
      uses: solving recurrences, proving combinatorial identities,
      asymptotic formulae for sequence terms)

## Unit 4 — Graph Theory & Trees (pp 67–96) — 91/91 ✓ (see exclusions below)
- [x] Graph G — definition; Degree of a Vertex (worked: degree of each vertex)
- [x] Types of Graphs (complete, regular, bipartite, complete bipartite, …)
- [x] Planar Graph; Properties of Planar Graphs; Non-Planar Graph;
      Properties of Non-Planar Graphs (K(m,n) planar ⇔ m < 3 or n < 3 —
      source misprints "n > 3"; corrected)
- [x] Representation of Graphs; Basic Properties of Graph Theory
- [x] Path; Connectivity; Cycles; Circuit / cycle; Directed circuit / cycle;
      paths from B to D
- [x] Dijkstra's Algorithm (shortest path in weighted graph; distance to all
      other vertices; K(c,a,b,d))
- [x] Complete Graph; Regular Graph; Bipartite Graph; Complete Bipartite Graph
- [x] Isomorphic Graphs; Homeomorphic Graphs; Subgraph; Spanning Subgraph;
      Isomorphism (which graphs are isomorphic? connected components,
      vertex-set / edge-set cardinalities); Homomorphism; Properties of
      Homomorphisms
- [x] Eulerian and Hamiltonian Paths, Circuits and Graphs; Euler's Path /
      Circuit / Circuit Theorem; Hamiltonian Path; Euler/Hamiltonian
      existence worked examples (path exists — false, circuit exists — false,
      Hamiltonian cycle — true, Hamiltonian path — true); Non-Euler Graph;
      Non-Hamiltonian Graph
- [x] Graph Coloring; Method to Color a Graph; applications (register
      allocation, map coloring, bipartite checking, mobile radio frequency
      assignment); chromatic number
- [x] Tree and its Properties; Centers and Bi-Centers of a Tree (algorithm);
      Labeled Trees; Unlabeled Trees; Rooted Tree; Binary Search Tree
      (left/right subtree value rules); Spanning Tree; Minimum Spanning Tree
      (Kruskal)

## Unit 5 — Algebraic Structures & Groups (pp 97–124) — 114/114 ✓
- [x] Algebraic Structure; Binary Operation of Set (addition, multiplication,
      subtraction, division examples); Properties of Algebraic structure
- [x] Types of Algebraic Structure: Semigroup; Monoid; Group; Abelian Group
      (incl. "Semi Group" duplicate heading); group axioms tables
- [x] Subgroups; Theorems on Subgroups (proofs); identity element in H and G;
      Difference between Groups and Subgroups; group laws (closure,
      associative, identity); order of a group; properties of subgroups
- [x] Order of an element; Order of an Element Formula; Properties of Order
      of Elements in a Group; Types of Groups
- [x] Abelian Group (definition, non-abelian, properties, examples);
      Definition of a Group; Examples / More Examples / Non-Examples of
      Groups; Order of Groups; Applications of Group Theory
- [x] Cyclic Group; Order of a Cyclic Group; Properties of Cyclic Groups;
      Problems and Solutions on Cyclic Groups (Is Z cyclic? examples of
      cyclic / non-cyclic groups)
- [x] Cosets: Left / Right Cosets (definitions, examples); Properties of
      Cosets; Applications of Cosets; Theorems on Cosets; Double Cosets
      (HgK = {hgk : h ∈ H, k ∈ K}); Properties of Double Cosets
- [x] Normal Subgroup; Examples / Properties / Solved Examples of Normal
      Subgroup; Quotient Group (example, G/N is a group check, properties,
      solved examples, G/N = {Na | a ∈ G}, G/N = {N, Ni})
      — the source's false claim "Every factor (quotient) group of a group
      is abelian" was NOT copied (only quotients of abelian groups are abelian)
- [x] Group Homomorphism (definition, examples, one-to-one, onto,
      properties, theorems); Kernel of a Homomorphism; Kernel is a Normal
      Subgroup; injectivity criteria
- [x] Isomorphism of Groups (G ≅ G′); Bijective; Example of Isomorphism;
      First Isomorphism Theorem (statement, proof, properties, application,
      G/ker(φ) ≅ G′); Second Isomorphism Theorem (proof); Third Isomorphism
      Theorem (statement, proof)
- [x] Group Permutation (permutation examples and problems)

## Deliberate exclusions (not source content — ticked off as checked, not missed)
- [x] Unit 1 pp 2–6 — Scope / Course Objectives / Course Outcomes boilerplate
      (not lecture content). Replaced by a short "Discrete Mathematics"
      definition + why it matters in CS (expansion).
- [x] Unit 1 p 1 and Unit 2 p 1 — cover pages + lecture plans (not content).
- [x] Unit 4 duplicate L24 Generating Functions (3 pages at the start of the
      Unit 4 file) — same lecture already covered in Unit 3; skipped to avoid
      duplication. Generating Functions is covered in Unit 3.
- [x] Unit 4 copy-pasted non-DM web junk headings (not Discrete Mathematics):
      "SQL CREATE TABLE", "Difference between JDK, JRE, and JVM",
      "HTML Tutorial", "Hello Java Program for Beginners",
      "Exception Handling in Java - Javatpoint". Dropped.
- [x] Running headers / watermarks: "UNIT-x (DISCRETE MATHEMATICAL STRUCTURE)",
      "CSE-IV SEM", "CamScanner" — dropped as headers, not content.
- [x] Unit 5 garbled math glyphs (e.g. "呸" where a symbol failed) — restored
      from context or dropped where unreadable; no content invented.

## Part B — 70 Most Important Questions (pp 125–178) ✓
- 70 questions, 14 per unit, drawn from the 6 PYQ papers below; questions
  repeated in 2+ papers marked with a red star. Answers sized by marks
  (2-mark 4–6 lines, 5-mark half to one page, 10-mark 1–2 pages).

## Part C — PYQ solution PDFs (all verified Discrete Mathematics, 22 questions each)
| Paper | File | Pages | Questions |
|---|---|---|---|
| DM-2024 (4CS1-01, 70 marks) | `pyq-solutions/sem4/DM-2024-solution.pdf` | 9 | 22 |
| DM-2025 (4CS1-01, 70 marks) | `pyq-solutions/sem4/DM-2025-solution.pdf` | 9 | 22 |
| DM-2026 (4CS1-01, 70 marks) | `pyq-solutions/sem4/DM-2026-solution.pdf` | 11 | 22 |
| DM-Aug-2023 (4CS1-01, 70 marks) | `pyq-solutions/sem4/DM-Aug-2023-solution.pdf` | 9 | 22 |
| DMS-2022 (120 marks) | `pyq-solutions/sem4/DMS-2022-solution.pdf` | 10 | 22 |
| DMS-2022-2 (120 marks) | `pyq-solutions/sem4/DMS-2022-2-solution.pdf` | 10 | 22 |
| **Total** | | **58** | **132 (110 unique)** |

DMS-2022-2 is a byte-identical duplicate of DMS-2022 (same paper, same
questions) — a solution PDF was still produced for it, noting the duplication.
Every question is written in handwriting first exactly as printed (with marks),
then the full answer below it, in paper order. Verified answers include:
Mississippi 11!/(4!4!2!) = 34,650; n−1 edges of a connected graph; Cayley
n^(n−2) spanning trees; bit strings 35; Kruskal MST weight 25; Fibonacci
generating functions 1/(1−x−x²) and x/(1−x−x²); a_n = 4^n; cosets of 6Z;
Q+ under a*b = ab/2 (abelian, identity 2, inverse 4/a).

### Unclear / problematic questions flagged (also flagged at the end of each solution PDF)
- DM-2026 B6 (isomorphic graphs): printed figure is faint/small; edge counts
  appear to differ (G ~6 edges, G' ~5). Solved as isomorphic with a
  degree-sequence check and an explicit caveat — if a clearer print shows
  different edge counts, the graphs are NOT isomorphic.
- DM-Aug-2023 B5 (complements): universal set not given; solution assumes
  U = {1,2,3,4} and states it.
- DMS-2022 C5 (and DMS-2022-2 C5): no initial conditions printed; only the
  general solution is possible (a_r = A(−2)^r + B(−3)^r + r²/4 + 13r/24 + 71/288),
  constants A and B undetermined.
- DM-2026 C5 (ii): printed as 'H^K'; read as H ∩ K (intersection), the
  standard result.

## Quality checks done
- pdfinfo on all 7 PDFs: valid, A4 (595.276 x 841.89 pts), page counts above.
- Garble scan (tokens ≥ 22 chars): zero in notes and in all 6 solution PDFs.
- Visual inspection of rendered pages: notes pp 2, 5, 6, 10, 13, 21, 31, 43, 46,
  61, 66, 101, 124, 133, 140; solutions DM-2024 p3, DM-2025 p9, DM-2026 p3,
  DM-Aug-2023 p8, DMS-2022 pp 3, 8–10. Pages are legible, handwriting style
  correct, red boxes / tables / diagrams (Venn, graphs, Hasse cube,
  divisibility Hasse, trees, Euler graph) render correctly.
- Known remaining imperfections (source OCR noise, not build errors): a few
  handwritten-proof lines in Unit 1 (pp ~20–21) still read with tight spacing
  ("ma nd", "as so ci at i ve") — the same proof methods are also covered
  cleanly in the expansion text; the Unit 2 Hasse Example-2 (divisors of 12)
  has mangled set notation from the source scan — the correct Hasse method
  and diagram are given in the expansion above it.
- An automated audit of every PYQ answer against its question (topic_blocks)
  found and fixed 38 cross-contamination cases (e.g. "relation" matching
  "recurrence relation", "function" matching "generating function"); 52
  question keys were re-pointed to targeted answers. Re-audit after the final
  rebuild: clean.
