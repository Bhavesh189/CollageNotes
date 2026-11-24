# GPU Computing (Sem 6) — Coverage Check

Source: built from PYQ topics only. Paper: GPU-2024 (B.Tech VI Sem Main
(New Scheme) Examination 2023-24, AI & DS, (6AD5-13), 61N2008, 2 pages,
22 questions). No source notes and no Sem 5-8 syllabus exist in the repo
for this subject.

Notes PDF: ~/workspace/handwritten_notes/sem6/GPU-Computing-Sem6-Handwritten-Notes-Full.pdf — 66 pages (Unit 1–5 + 70 Most Important Questions section, 50 questions).
Solution PDF: ~/workspace/handwritten_notes/pyq-solutions/sem6/GPU-2024-solution.pdf — 16 pages, 22/22 questions solved.

Method: every question of GPU-2024 was transcribed from the scan (OCR +
visual check of both pages) and mapped to a notes topic below. All 23
topics are covered at full depth. Garble scan run on all text and on the
built PDFs (0 hits; CUDA identifiers blockIdx/threadIdx/blockDim are
whitelisted as legitimate code names). Sample pages from Units 1 and 4 and
the solution PDF visually inspected.

## Paper questions -> notes topic (all covered)
- [x] Part A Q.1 What are capabilities of modern GPU? -> Capabilities of a Modern GPU
- [x] Part A Q.2 What is the GPU programming model? -> GPU Programming Model
- [x] Part A Q.3 What are the main components of a graphics pipeline? -> Main Components of the Graphics Pipeline
- [x] Part A Q.4 What is GPGPU used for? -> GPGPU — General-Purpose Computing on GPU
- [x] Part A Q.5 Define Data Parallelism with its advantages. -> Data Parallelism
- [x] Part A Q.6 What is the difference between parallelism and threading? -> Parallelism vs Threading
- [x] Part A Q.7 What do you understand about Latency Tolerance? -> Latency Tolerance
- [x] Part A Q.8 Briefly explain about multidimensional data mapping. -> Multidimensional Data Mapping
- [x] Part A Q.9 What is the importance of memory access efficiency? -> Memory Access Efficiency
- [x] Part A Q.10 What is the kernel of matrix multiplication? -> Matrix Multiplication Kernel
- [x] Part B Q.1 Differentiate between GPU and CPU architecture with advantage of GPU and CPU. -> GPU vs CPU Architecture
- [x] Part B Q.2 Explain in detail about working steps of graphic pipeline. -> Working Steps of the Graphics Pipeline
- [x] Part B Q.3 Discuss in detail about unified graphics and computing processors. -> Unified Graphics and Computing Processors
- [x] Part B Q.4 Explain CUDA architecture with schematic diagram. -> CUDA Architecture
- [x] Part B Q.5 Explain the process of assigning resources to blocks in parallel execution model. -> Assigning Resources to Blocks in Parallel Execution
- [x] Part B Q.6 Discuss how memory as a limiting factor parallelism. -> Memory as a Limiting Factor for Parallelism
- [x] Part B Q.7 Explain the SVM algorithm of vector addition kernel method. -> Vector Addition Kernel — the SVM Algorithm of Vector Addition
- [x] Part C Q.1 Advantages of GPU architecture + architecture of modern GPU with diagram -> GPU vs CPU Architecture + Architecture of a Modern GPU
- [x] Part C Q.2 Short notes: (a) Programmable Real-Time Graphics (b) Scalable GPU's -> Programmable Real-Time Graphics + Scalable GPUs
- [x] Part C Q.3 Global memory and data transfer in CUDA -> Global Memory and Data Transfer in CUDA
- [x] Part C Q.4 Threading in parallel system + time-slicing and preemptive-priority scheduling -> Threading in a Parallel System — Time-Slicing and Preemptive-Priority Scheduling
- [x] Part C Q.5 CUDA memory model with different types of memory and uses -> CUDA Memory Model

Coverage: 22/22 paper questions, 23/23 topics. Flag: Part B Q.7 says "SVM
algorithm of vector addition kernel method" as printed; the notes and the
solution explain the vector addition kernel (the standard CUDA example) and
keep the printed wording, flagged at the end of the solution PDF. No topic
outside the paper was built. The 70Q section has 50 questions (one paper
asks 22 distinct questions; the section adds closely-related questions from
the same topics, as noted on its title page).
