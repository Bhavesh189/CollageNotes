# Distributed Systems — ADD-ON: DS-2022 + DS-Aug-2023 solutions

Work folder: `~/workspace/handwritten_notes/sem5-work-ds-add/` (fresh copy of the
`full/` pipeline + DS source/expansions/answers/helpers copied read-only from
`sem5-work-ds/`; that folder and its outputs were NOT touched). Papers downloaded
from `public/pyq/sem6/` (GitHub raw, main branch). Style: approved Sem 5 style —
Patrick Hand, blue body ink, black underlined headings, red key terms, unlined
white A4 portrait, ~1.5 cm balanced margins. No GitHub upload, no token.

## DS-2022 — 16 pages, 14/14 questions solved

- `~/workspace/handwritten_notes/pyq-solutions/sem5/DS-2022-solution.pdf`
- Paper: B.Tech VI Sem (Main) 2021-22, 6CS5-11, Max Marks 80, Time 2 Hours.
- Part A (3 marks x 5), Part B (15 marks x 6), Part C (29 marks x 3) — all solved,
  although the paper asks candidates to answer 2 of 5 / 3 of 6 / 1 of 3 (noted in flags).
- No unclear/illegible questions. No questions left unsolved.

## DS-Aug-2023 — 14 pages, 14/14 questions solved

- `~/workspace/handwritten_notes/pyq-solutions/sem5/DS-Aug-2023-solution.pdf`
- Paper: B.Tech VI Sem (Main/Back) August 2023, 6CS5-11, Max Marks 80, Time 3 Hours.
- Part A (2 marks x 5, all compulsory), Part B (10 marks x 6, answer 4), Part C
  (15 marks x 3, answer 2) — all solved.
- Flags (also printed at the end of the solution PDF):
  - Part C Q.1 is printed as "selling time limits" — answered as "setting time
    limits" (the standard interaction-model difficulty).
  - Part C Q.2 is printed as "Lamparts algorithm" — answered as Lamport's algorithm.
  - Minimum passing marks are printed as "??" in the paper, so they are not stated.

## Quality checks (both PDFs)

- Garble scan on extracted text: 0 camelCase joined words, 0 split words
  ("ofthe", "Whenevery" etc. all 0 after one reword + rebuild). All 14 question
  labels present in each PDF, in paper order, with marks as printed.
- Visually inspected sample pages of each PDF (p1, Part B, Part C, diagrams,
  flags page) — fully legible, Patrick Hand, diagrams render correctly
  (snapshot timeline, Byzantine generals boxes, comparison tables).
- Note: the first build used the shared DS source-assembly for 9 answers and
  showed source-fragment defects (duplicated sentences, a stray "services are
  described by function Specifications." box, a wrong Fault/Error "Cycle =
  deadlock" diagram, a duplicated Byzantine diagram). All 9 answers were
  rewritten as hand-checked custom blocks and rebuilt; the defects are gone
  in the delivered PDFs. The same defects exist in the shared DS
  `answers.py`/`expansions.py` source-assembly path, so the main DS worker's
  DS-2025/DS-2026 builds should be checked for them (not my folder to fix).
