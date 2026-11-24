# TC Sem 1 — Coverage Check

**Subject:** Technical Communication (TC), Semester 1 — **built from PYQ paper — legacy subject, no source notes in repo; theory not in current syllabus (lab only)**.
**Source:** `Bhavesh189/CollageNotes`, `public/pyq/sem1/TC-Dec-2019.pdf` (B.Tech. I/II Sem. (Main/Back) Exam., Dec. 2019, paper code 21505/11505, Max. Marks 80, Time 2 Hours, 3 pages, scanned).
**Notes PDF:** `~/workspace/handwritten_notes/sem1/TC-Sem1-Handwritten-Notes-Full.pdf` — **124 pages, A4**.
**Solution PDF:** `~/workspace/handwritten_notes/pyq-solutions/sem1/TC-Dec-2019-solution.pdf` — **19 pages, A4, 14/14 questions solved**.
**Work folder:** `~/workspace/handwritten_notes/sem1-work-TC/` (copied from `sem1-work/`, adapted; CSK Sem 1 framework reused: `content.py` / `answers.py` / `diagrams.py` / `build_notes_v2.py` / `build_solutions.py` / `garble_scan.py`).

## 0. The paper is not what its filename says — read this first

The paper's header carries **two codes**: `1FY1-05 Human Values` **and** `3AN1-02 Technical Communication`. **Every one of its 14 questions is a Human Values question.** There is not a single Technical Communication question in it (no report writing, no business letter, no presentation, no interview, no email etiquette — none of the Technical Communication Lab syllabus topics appear). A whole-repo search found **no theory source notes for Technical Communication anywhere**, and the current official BTU First Year syllabus (`public/syllabus/sem1/syllabus.pdf`) has Technical Communication **only as a lab** (Technical Communication Lab, pp. 19–20; lab syllabus section at `sem1-work-syllabus/syllabus-TC-lab-and-CProg-lab.txt`).

So, per the task's rule (build from the topics asked in the paper; use the lab syllabus only where its topics match the paper's; invent no topic that appears in neither), these notes cover **exactly the topics the paper asks** — which are Human Values topics — and **no lab-syllabus topic has been added as a notes topic**. The cover page of the notes PDF states this plainly. The parent should note the overlap: a separate Human Values (HV) subject is being built in parallel from the HV papers (`sem1-work-HV/` exists); this TC file covers the same *kind* of content because the paper filed under TC is itself a Human Values paper. The repo also holds a separate `HV-Dec-2019.pdf` (4 pages, different file from this 3-page paper).

## 1. Step 0 — the paper, read in full (OCR + visual check of all 3 pages)

| Part | Q | Question (as printed) | Marks | Topic in notes |
|---|---|---|---|---|
| A | 1 | Describe Trust and Respect as a human value. | 2 | Trust and Respect as Human Values |
| A | 2 | Explain four orders of nature. | 2 | The Four Orders in Nature |
| A | 3 | Harmony in family and society. Explain. | 2 | Harmony in the Family and Harmony in Society |
| A | 4 | Explain "Sadhan Viheen Dukhi Daridra" and "Sadhan Sampan Dukhi Daridra". | 2 | Sadhan Viheen Dukhi Daridra and Sadhan Sampan Dukhi Daridra |
| A | 5 | What do you understand by Right Understanding? | 2 | Right Understanding |
| B | 1 | Define Self Exploration. Explain the process of self-exploration with a diagram. | 10 | Self-Exploration: Meaning and Process |
| B | 2 | Explain the relationship between "Relationship", "Physical Facilities" and "Right Understanding". Distinguish these on the basis of Animal Consciousness and Human Consciousness. | 10 | Relationship, Physical Facility and Right Understanding + Animal Consciousness and Human Consciousness |
| B | 3 | What is Sanyam (self-control), and Swasthya (Health)? Discuss the aspects of Sanyam and Swasthya. | 10 | Sanyam (Self-Control) and Swasthya (Health) |
| B | 4 | Explain all values in human in human relationships. | 10 | Values in Human Relationships: All Nine Values |
| B | 5 | "The state of harmony or lack of it in the self has a strong influence on the health of the body". Explain. | 10 | Harmony in the Self and the Health of the Body |
| B | 6 | What are the basic guidelines of value education? | 10 | Basic Guidelines of Value Education |
| C | 1 | What do you mean by the statement existence as co-existence? | 15 | Existence as Co-existence |
| C | 2 | Critically examine the state of the society today in context with the fulfilment of comprehensive human goal. | 15 | The Comprehensive Human Goal + The State of Society Today |
| C | 3 | What are the four orders in nature? Briefly explain them. | 15 | The Four Orders in Nature |

All 14 questions solved in the solution PDF, in the paper's own order, question written in handwriting first exactly as printed incl. marks, then the full answer below. **No question is unclear or illegible** — all 14 were read clearly from the scan and verified by RapidOCR. One printing error is flagged at the end of the solution PDF: Part B Q.4 prints "in human" twice ("Explain all values in human in human relationships."). It is answered as "Explain all values in human relationships."

## 2. Unit grouping (no syllabus unit structure exists for this subject)

The five units follow the paper's own topic groupings — the standard Universal Human Values course structure the paper itself follows (Self → Family → Society → Nature → Existence):

- **Unit 1 — Value Education and Self-Exploration (pp. 2–11, 6 topics):** Why Value Education is Needed; Basic Guidelines of Value Education; Self-Exploration: Meaning and Process; Natural Acceptance; Right Understanding; Basic Human Aspirations: Happiness and Prosperity.
- **Unit 2 — Harmony in the Human Being (the Self) (pp. 12–20, 5 topics):** The Human Being: Co-existence of Self (I) and Body; Activities of the Self: Desire, Thought and Expectation; Sanyam (Self-Control) and Swasthya (Health); Harmony in the Self and the Health of the Body; Needs of the Self and Needs of the Body.
- **Unit 3 — Harmony in the Family and Society (pp. 21–31, 6 topics):** Family: The Basic Unit of Human Organisation; Values in Human Relationships: All Nine Values; Trust and Respect as Human Values; Harmony in the Family and Harmony in Society; The Comprehensive Human Goal; The State of Society Today: A Critical Examination.
- **Unit 4 — Harmony in Nature and Existence (pp. 32–38, 4 topics):** The Four Orders in Nature; Interconnection and Mutual Fulfilment in Nature; Existence as Co-existence; Self-Regulation and Recyclability in Nature.
- **Unit 5 — Right Understanding, Relationship and Physical Facility (pp. 39–48, 5 topics):** Relationship, Physical Facility and Right Understanding; Animal Consciousness and Human Consciousness; Sadhan Viheen Dukhi Daridra and Sadhan Sampan Dukhi Daridra; Prosperity and Wealth; Living with Human Consciousness: The Journey Ahead.

**Total: 26 topics, 26/26 covered.**

## 3. Coverage check — every paper topic ticked

- [x] Trust and Respect → "Trust and Respect as Human Values" (Unit 3)
- [x] Four orders of nature → "The Four Orders in Nature" (Unit 4) — asked twice (A2 + C3)
- [x] Harmony in family and society → "Harmony in the Family and Harmony in Society" (Unit 3)
- [x] Sadhan Viheen / Sadhan Sampan Dukhi Daridra → Unit 5
- [x] Right Understanding → Unit 1 (also the foundation of B2, Unit 5)
- [x] Self Exploration + process + diagram → Unit 1 (diagram on p. 6)
- [x] Relationship / Physical Facility / Right Understanding → Unit 5 (diagram on p. 40)
- [x] Animal Consciousness vs Human Consciousness → Unit 5
- [x] Sanyam and Swasthya + aspects → Unit 2 (diagram p. 15–16)
- [x] All nine values in human relationships → Unit 3 (Trust, Respect, Affection, Care, Guidance, Reverence, Glory, Gratitude, Love; ladder diagram p. 24)
- [x] Harmony in the Self → health of the body → Unit 2
- [x] Basic guidelines of value education (all seven) → Unit 1
- [x] Existence as co-existence → Unit 4 (diagram p. 35–36)
- [x] Comprehensive human goal (4 goals + 5 dimensions) → Unit 3
- [x] State of society today, critically examined → Unit 3
- [x] Supporting topics that the paper's questions depend on (no new topics — all are sub-parts of the paper's questions): Need for value education, Natural acceptance, Basic human aspirations, Activities of the Self, Needs of Self vs Body, Family as basic unit, Interconnection and mutual fulfilment, Self-regulation and recyclability in nature, Prosperity vs wealth, Living with human consciousness.

**Topics not built, and why:** every topic of the Technical Communication Lab syllabus (conversation/interview skills, presentation skills, business etiquette, email etiquette/Netiquette, technical report writing, business letter/resume writing, group discussion, life skills) — **none of these is asked in the paper**, so per the no-new-topics rule none is a notes topic. If the parent wants a lab-syllabus companion, that is a separate build.

## 4. Part B — 70 Most Important Questions (pp. 49–124)

- **70/70 questions**, drawn from the paper's 14 questions plus closely-related variants on the **same topics only**. Distribution: Unit 1: 16, Unit 2: 12, Unit 3: 16, Unit 4: 12, Unit 5: 14. Marks: 2-mark: 9, 5-mark: 32, 10-mark: 25, 15-mark: 4. **49 starred** (red star = asked in the Dec 2019 paper or a direct repeat of it). Answers sized by marks via the same topic-block slicing used for CSK (2-mark = definition + core lines, 5-mark ≈ 300 words, 10/15-mark = full topic).

## 5. Quality checks

- **Garble scan** (`garble_scan.py`, same as DBMS/CSK): **0 suspicious tokens** in the notes PDF and **0** in the solution PDF. One real defect was found and fixed before delivery: the three-box "Right Understanding / Relationship / Physical Facility" diagram rendered "RightUnderstanding" as one word (a newline inside a SimpleBoxes title collapses), and a third sub-line spilled outside its box; both were fixed and the PDFs rebuilt and re-scanned.
- **Visual inspection** of rendered pages from every unit and the solutions: cover p. 1, Unit 1 pp. 5–6 (self-exploration diagram), Unit 2 pp. 12, 15, Unit 3 pp. 22, 24 (nine-values ladder), 28, Unit 4 p. 33 (table + four-orders ladder), Unit 5 p. 40 (fixed diagram), 70Q p. 50, solutions pp. 1, 10, 19 — all legible, correct approved style (Patrick Hand, blue body ink, black underlined headings, red key terms/definitions, unlined white A4, ~1.5 cm balanced margins, unit name top, page number bottom), no garbled or joined words, no overflowing diagram text.
- **pdfinfo:** notes 124 pages A4 (595.276 x 841.89 pts); solutions 19 pages A4.
- **Spelling/terminology re-checked** against the paper scan: "Sadhan Viheen Dukhi Daridra", "Sadhan Sampan Dukhi Daridra", "Sanyam", "Swasthya", "Vishwas/Samman/Sneh/Mamata/Vatsalya/Shraddha/Gaurav/Kritagyata/Prem" — transliterations only, no Devanagari (Patrick Hand has no Devanagari glyphs).

## 6. Open items / notes for the parent

- **Nothing is incomplete within the task's scope** — all 14 paper questions are covered in the notes and solved. The only deliberate omission is the TC Lab syllabus topics (see §3), which the paper never asks.
- **Overlap flag:** this TC file's content is Human Values content, because the paper filed under TC is a Human Values paper. The parallel HV build (`sem1-work-HV/`, from HV-Dec-2018/2019/Jan-2020) will cover the same ground from its own papers; the parent may want to cross-check for duplication before delivery, and to decide whether a TC Lab-syllabus companion should be built as a separate item.
- The shared `PROGRESS-sem1.md` was **not** touched, as instructed.
