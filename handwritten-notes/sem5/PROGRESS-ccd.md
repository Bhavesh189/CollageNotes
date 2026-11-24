# Cloud Computing & DevOps (Sem 5) — Progress

Started: 2026-11-24. Pipeline: copy of DBMS Sem 4 v2 pipeline in `~/workspace/handwritten_notes/full/`, adapted in `~/workspace/handwritten_notes/sem5-work-ccd/`. Style: Patrick Hand, blue body, black underlined headings, red key terms, unlined white A4, ~1.5 cm balanced margins, unit name top, page number bottom.

## Source

- Repo: Bhavesh189/CollageNotes, `notes-source/notes/sem5/cloud-computing-devops/`
- Unit 1: cc-dev-unit-1.pdf, 46 pages (handwritten scans, CamScanner)
- Unit 2: cc-dev-unit-2.pdf, 65 pages (handwritten scans, CamScanner)
- Unit 3: cc-dev-unit-3.pdf, 38 pages (handwritten scans, CamScanner)
- Unit 4: cc-dev-unit-4.pdf, 27 pages (pp 1-20 handwritten scans — Arya Institute lecture notes, Cloud Security; pp 21-27 typed text: BCP/DRP, risk management, threats, SLA)
- Unit 5: cc-dev-unit-5.pdf, 24 pages (typed text: AWS, Azure, Aneka, cloud applications)
- Total source: 200 pages

## PYQ papers (public/pyq/sem5/)

- CCD-2024.pdf (2 pages, 2023-24) — solved
- CCD-2025.pdf (3 pages, 2024-25) — same question set as 2024, different order — solved
- CCD-2026.pdf (4 pages, 2025-26) — new question set — solved

## Method notes

- Units 1-3 and Unit 4 pp 1-20 are handwritten scans with almost no embedded text, so they were OCR'd with RapidOCR (venv rapidocr_onnxruntime, 160 dpi). OCR of handwriting is fragmentary, so topics were catalogued by visual sampling of pages plus OCR keyword search; expansions were written to full depth against that topic list.
- PYQ-only topics (in papers but NOT in source notes, solved only in solution PDFs, never added to notes): Docker, Docker Cloud, Kubernetes, Microservices (definition, phases, modelling), Cloudonomics, Cloud ecosystem, Types of cloud security, Trust management, VMware (definition only; hypervisor itself is in source).
- VDI / microservices / implementation-levels placement vs source: verified against Unit 2-3 OCR after extraction. Unit 2 OCR (65 pp): no microservices, no VDI, no cloud ecosystem, no trust management, no implementation levels. Unit 3 OCR (38 pp): no VDI, no microservices, no memory/device virtualization. VDI therefore moved OUT of the notes into pyq_only.py (solved only in CCD-2026 Part B Q.3); 70Q Q36 changed to "Explain the virtualization structure and its mechanisms." Microservices, cloud ecosystem, trust management, types of cloud security, Cloudonomics, Docker, Docker Cloud, Kubernetes remain PYQ-only.

## Status — COMPLETE 2026-11-24

- [x] Sources + PYQs downloaded
- [x] OCR of PYQs (3 papers) + Unit 1 (46 pp) + Unit 2 (65 pp) + Unit 3 (38 pp) + Unit 4 (27 pp, incl. pp 21-27 typed text re-OCR'd)
- [x] Expansions written (76 keys after VDI moved to PYQ-only), 70Q bank, papers.py, pyq_only.py
- [x] Pipeline adapted (build_notes_v2, build_solutions, answers tables/diagrams, helpers diagrams, sanitize)
- [x] Source extraction to source_u1-u5.json
- [x] Notes PDF built + garble scan + visual inspection (samples from every unit: cover, U1 history, U1 migration + ladder diagram, U2 cloud architecture diagram, U3 virtualization structure + host-based, U4 auditing, U5 AWS history, 70Q deployment-models table, fat-tree numerical)
- [x] Solution PDFs built + visual inspection (CCD-2026 p1 Cloudonomics, p5 EC2 + cloud ecosystem, p7 VDI diagram, CCD-2024 p14 Kubernetes)
- [x] Coverage checklist saved

## Outputs (verified with pdfinfo, A4)

- Notes: ~/workspace/handwritten_notes/sem5/Cloud-Computing-and-DevOps-Sem5-Handwritten-Notes-Full.pdf — **154 pages** (Unit 1 pp 2–24, Unit 2 pp 25–36, Unit 3 pp 37–46, Unit 4 pp 47–65, Unit 5 pp 66–98, 70 Most Important Questions pp 99–154)
- Coverage: ~/workspace/handwritten_notes/sem5/Cloud-Computing-and-DevOps-coverage-check.md — every source topic ticked (76 expansion topics)
- Solutions: ~/workspace/handwritten_notes/pyq-solutions/sem5/CCD-2024-solution.pdf — **15 pages, 22 questions**; CCD-2025-solution.pdf — **16 pages, 22 questions**; CCD-2026-solution.pdf — **17 pages, 23 questions**. All questions solved, including the optional ones (Part B answer 5 of 7, Part C answer 3 of 5).

## Gaps / flags

- No paper left unsolved. No question was unclear or illegible in any of the three papers.
- CCD-2026 Part C Q.3 is printed as one 10-mark question with parts (a) Risk Mitigation and (b) Trust Management; solved as (a) 5 marks and (b) 5 marks (noted in the solution PDF).
- VDI is NOT in the source notes (verified by full OCR search of Unit 3) — solved only in CCD-2026 Part B Q.3, not in the notes; 70Q Q36 covers virtualization structure instead.
- Quality fixes made during the build: PROTECT words in sanitize.py were being deleted by clean_text (whitespace control chars \x09–\x0d, \x1c–\x1f) — all moved to private-use characters; a garbled OCR line was filtered by a new looks_garbled check; a stale DBMS source_u2/u3/u4.json from the copied pipeline was removed (it had leaked relational-algebra content into a dry run); the fat-tree edge-switch sentence was corrected (edge switches connect to aggregation switches, not core switches); 2-mark answers for short keys (EC2/S3/IAM) now take their definition box from the expansion when no source section matches.
