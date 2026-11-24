# Cloud Computing & DevOps (Sem 5) — ADD-ON: CC-2022 + CC-Aug-2023 solutions

Add-on task, 2026-11-24. Two old-scheme VI-Semester Cloud Computing papers from
`public/pyq/sem6/` (not sem5), solved as Part C solutions for the Sem 5 subject
Cloud Computing & DevOps. Work folder: `~/workspace/handwritten_notes/sem5-work-ccd-add/`
(fresh copy of the pipeline; `~/workspace/handwritten_notes/sem5-work-ccd/` was NOT
modified — only read/copied from). Build script `build_add.py` builds ONLY these
two papers, so no other subject's or paper's output file was touched. No GitHub
upload, no token asked for. Style: Patrick Hand, blue body, black underlined
headings, red key terms, unlined white A4, ~1.5 cm balanced margins.

## Papers (Step 0 — read whole paper first, every question listed)

### CC-2022 — B.Tech VI Sem (Main), 2021-22, 6CS4-06 Cloud Computing, Max 120, 2.5 hrs
- Part A: answer 6 of 10, 3 marks each. Part B: answer 3 of 7, 10 marks each.
  Part C: answer 3 of 5, 24 marks each. All 22 questions solved.
- Part C Q.3 is the MapReduce word-length counting problem (input lines
  "Most people ignore most poetry" / "Most poetry ignores most people").
  Worked fully: (4, 4), (6, 5), (7, 1); total 10 words — verified.
- Flags (in the PDF): student's handwritten circles/ticks on the scan are not
  part of the paper; old-scheme paper, same cloud syllabus as Sem 5 CCD.
- No unclear/illegible questions. Every question is legible in the scan.

### CC-Aug-2023 — B.Tech VI Sem Main/Back, August 2023, 6CS4-06, Max 120, 3 hrs
- Common to CSE, AI & DS, AI & ML. Part A: all 10 compulsory, 2 marks each.
  Part B: answer 5 of 7, 8 marks each. Part C: answer 4 of 5, 15 marks each.
  All 22 questions solved.
- Flags (in the PDF): Part B Q.1 prints 'sevice models' — misprint for
  'service models' (solved as service models); the 'btubikaner.com' text
  across Part B Q.4 is a website watermark, not part of the question;
  old-scheme paper, same cloud syllabus as Sem 5 CCD.
- No unclear/illegible questions. Every question is legible in the scan.

## Outputs

- `~/workspace/handwritten_notes/pyq-solutions/sem5/CC-2022-solution.pdf` — 24 pages, 22 questions, 9,509 words
- `~/workspace/handwritten_notes/pyq-solutions/sem5/CC-Aug-2023-solution.pdf` — 22 pages, 22 questions, 8,552 words

## Method notes

- Answers assembled from the CCD source notes + expansions + 17 new PYQ-only
  entries (pyq_only.py, this folder only) for topics the source does not cover:
  traditional data center, traditional DC vs cloud, customization, Web 2.0,
  multi-tenancy, legal issues, native vs hosted VM, virtualization pros/cons,
  large-scale platforms, hybrid cloud vs hybrid IT, cloud security
  challenges + mitigations, SLA violation, elasticity vs scalability,
  SLA standardization, XaaS, cluster/grid/cloud, security infrastructure.
  Two CUSTOM worked answers (papers.py): MapReduce word-length counting,
  e-commerce website cloud design. Expansions extended (this folder only):
  protein structure prediction (+pipeline/tools), migration (+Xen live
  migration), Aneka (+data movement for task-based apps), data-center design
  (+network requirements/designs), types of virtualization (+desktop/VDI).
- Answer sizing by marks (answers.py, this folder only): new <=3-mark short
  branch (~half page); caps 10→450, 15→650, 18→750, >18→1000 words
  (24-mark ≈ 3 pages).

## QA — problems found and fixed (all in this folder's copy only)

1. Wrong-expansion matching (found by visual check of CC-2022 p5): the loose
   substring matcher pulled 'cloud computing security architecture' into the
   'cloud computing architecture' answer (OSA definition in the wrong answer)
   and 'disadvantages of cloud computing' into 'advantages of cloud computing'
   answers. Fixed: find_expansions/find_expansions_grouped now use exact or
   word-prefix matching only. NOTE: the same loose matcher is still in the
   shared pipeline (`full/`, `sem5-work-ccd/`) — other subjects' builds that
   use these keys may carry the same contamination; worth checking.
2. OCR soup line in CC-2022 Part B Q.7: source_u2.json section headed "Ling"
   ("modely built uithothenplatform are eatiuney and arerelatedtofamilior wreb
   yid models.") matched 'cloud enabling technologies' because 'ling' is a
   substring of 'enabling'. Section deleted from this folder's source_u2.json.
3. Source typo in Unit 5 protein section: "Phre, ESyired3D" corrected to
   "Phyre, ESyPred3D" (verified against the expansion and the real tool names).
4. VirtStack diagram caption overlapped the Hardware box edge (drawn at y=0);
   diagram height raised 132→142, caption moved to y=6. Fixed on Aug-2023 p22.
- "demon dialing" in the threats answer is a real term (war dialing), kept.
- Garble scan after fixes: zero suspicious tokens (only 'Pred3D', part of the
  tool name ESyPred3D); zero non-ASCII letters; 22 "Answer:" in each PDF.
- Visual inspection: 10+ sample pages across both PDFs (title, Part A, Part B
  with tables/diagrams, Part C, flags pages) — all fully legible, no joined/
  split words, diagrams render correctly (cloud architecture, MapReduce flow,
  migration ladder, virtualization stack, service/deployment tables).

## Status

- [x] Papers downloaded (GitHub raw, public/pyq/sem6/), read in full
- [x] New PYQ-only entries, CUSTOM answers, expansion top-ups written
- [x] Both solution PDFs built (build_add.py, venv python)
- [x] Garble scan + visual inspection, fixes applied, rebuilt, re-verified
- [x] No other output files touched; nothing uploaded to GitHub
