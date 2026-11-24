# Information Theory and Coding (Sem 5) — Coverage Check

Built from PYQ topics — no source notes or syllabus for this subject exist in the repo.
Papers: ITC-2022 (5CS3-01, B.Tech V Sem 2021-22, 14 questions),
ITC-Dec-2020 (5CS3-01, B.Tech V Sem Dec 2020, 14 questions),
ITC-May-2023 (5CS3-01, B.Tech V Sem May 2023, 14 questions).
Total 42 paper questions. All three papers: Max 80, 2 Hours, Part A 5 x 2,
Part B 4 x 10 (answer 4 of 6), Part C 2 x 15 (answer 2 of 3).

Notes: `Information-Theory-and-Coding-Sem5-Handwritten-Notes-Full.pdf` — 85 pages, A4.
Solutions: `pyq-solutions/sem5/ITC-2022-solution.pdf` — 16 pages, 14/14 solved;
`pyq-solutions/sem5/ITC-Dec-2020-solution.pdf` — 18 pages, 14/14 solved;
`pyq-solutions/sem5/ITC-May-2023-solution.pdf` — 20 pages, 14/14 solved.

All numerical answers were verified with a Python script (verify_nums.py)
before writing: Shannon-Fano and Huffman codes, (7,4) and (6,3) block codes
and syndromes, channel entropies, capacities, telegraph rate, cyclic codes
and the convolutional encoder output.

## Topics (24) — all covered

### Unit 1 — Foundations
- [x] Entropy: the Measure of Uncertainty (ITC-2022 A1; ITC-Dec-2020 A1, A2; ITC-May-2023 A1, A2)
- [x] Mutual Information and the Entropies of Two Variables (ITC-2022 A2, B1; ITC-Dec-2020 B2)
- [x] Shannon's Source Coding Theorem (ITC-2022 A3, B3b)
- [x] The Shannon-Hartley Theorem and Its Implications (ITC-Dec-2020 A5; ITC-May-2023 C3)
- [x] Channel Capacity of the Gaussian Channel (ITC-2022 C1; ITC-Dec-2020 C2; ITC-May-2023 B3b, C1)

### Unit 2 — Source Coding
- [x] The Shannon-Fano Code (ITC-2022 B2; ITC-Dec-2020 B1)
- [x] The Huffman Code (ITC-Dec-2020 B5; ITC-May-2023 B1)
- [x] Average Length, Coding Efficiency and Redundancy (ITC-2022 B2; ITC-Dec-2020 B1, B5; ITC-May-2023 B1)
- [x] Source Coding: the Discrete Memoryless Source (all papers, Part A/B)
- [x] The Telegraph Source: Information Rate of a Real Source (ITC-May-2023 B4)

### Unit 3 — Channels and Fields
- [x] The Discrete Memoryless Channel and Its Matrix (ITC-May-2023 B2)
- [x] Entropies and Mutual Information of a Channel (ITC-2022 C2; ITC-Dec-2020 B2; ITC-May-2023 B2)
- [x] Galois Fields (ITC-2022 A4; ITC-Dec-2020 A4; ITC-May-2023 A3)
- [x] BCH Codes (ITC-May-2023 A4; ITC-Dec-2020 C3c)

### Unit 4 — Block Codes and Cyclic Codes
- [x] Linear Block Codes (ITC-2022 B4; ITC-Dec-2020 C1; ITC-May-2023 C2)
- [x] Hamming Codes (ITC-Dec-2020 B3)
- [x] Cyclic Codes and the Encoder Circuit (ITC-2022 B5, B6; ITC-May-2023 B5)
- [x] Code Algebra and Cyclic Codes (ITC-Dec-2020 B6b)
- [x] Error Detection and Correction Capability (ITC-May-2023 C2c)

### Unit 5 — Convolutional Codes and Error Control
- [x] Convolutional Codes: Constraint Length and Code Rate (ITC-2022 A5; ITC-Dec-2020 A3; ITC-May-2023 A5)
- [x] State Diagram, Tree Diagram and Trellis Diagram (ITC-2022 C3; ITC-Dec-2020 C3a; ITC-May-2023 B6)
- [x] The Viterbi Algorithm (ITC-Dec-2020 B4)
- [x] The Code Tree (ITC-Dec-2020 B6a)
- [x] ARQ Methods of Error Control Coding (ITC-Dec-2020 C3b)

Coverage: 24/24 topics. 70 Most Important Questions: 70/70 (14 per unit).

## Flags (also listed at the end of the solution PDFs)
- ITC-May-2023 Part B Q.2 (b) prints "P(x1) = 0.6 and P(x1) = 0.4"; the second probability is read as P(x2) = 0.4.
- ITC-May-2023 Part C Q.1 does not state the number of quantization levels. The answer assumes 256 equally likely levels (8 bits per sample), as in the same question in ITC-2022; the assumption is stated in the answer.
- ITC-Dec-2020 Part B Q.3 (c): the received word [0 1 1 0 1 0] has syndrome [1, 1, 0], which matches no column of H, so it has two or more errors: detected but not correctable by the single-error-correcting (6,3) code. This is stated in the answer, not guessed.
- ITC-2022 Part B Q.6 and ITC-May-2023 Part B Q.5 use the same generator polynomial, written as g(x) = x cubed + x + 1 and g(x) = 1 + x + x cubed; both forms are the same polynomial.
