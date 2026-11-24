# Coverage Check — Introduction to Web Technology (IWT), Sem 4 (4CS4-04)

**Status: built from syllabus/PYQ topics (no source notes in repo).**

## How this subject was built

- IWT is an old-scheme Sem 4 subject (4CS4-04, June 2022). **No source notes exist
  anywhere in the repo** (checked: no `notes/sem4/introduction-to-web-technology`
  folder and no IWT notes in any other semester folder).
- It is **NOT in the current (2021-22) BTU syllabus**: in
  `public/syllabus/sem3/syllabus.pdf` (28 pages, Sem 3+4) code **4CS4-04 is
  Database Management System**, not Web Technology. Confirmed by reading the
  syllabus text.
- Authority used instead: the PYQ paper itself,
  `public/pyq/sem4/IWT-Jun-2022.pdf` (B.Tech IV Semester End-Term, CSE,
  4CS4-04, June 2022, 2 pages, Max Marks 105, Time 3 Hours). Every topic in
  the notes is a topic that paper asks about; no topic outside the paper's
  web-technology scope was added.

## Paper question inventory (all solved) — 22 questions

| Part | Questions | Marks each | Total (as attempted) |
|---|---|---|---|
| Part A | Q.1 (a)–(g), 7 questions, compulsory | 3 | 21 |
| Part B | Q.2–Q.6, both options (A) and (B) solved, 10 questions | 6 | 30 as attempted (exam: attempt one option per question) |
| Part C | Q.7–Q.11, all 5 solved (exam: attempt any 3 of 5) | 18 | 54 as attempted |
| **Total** | **22 questions** | | **105 (21 + 30 + 54)** |

## Topic coverage — paper-defined topic list vs notes (33/33 covered)

### Unit 1 — Internet and Web Basics (6 topics)
- [x] What is the Internet? (Q.2 (A) history context; Q.1 (a) principles context)
- [x] History of the Internet — 1969 ARPANET, 1983 TCP/IP, 1991 Web, 1993 Mosaic (Q.2 (A))
- [x] How the Web Works — Client and Server, HTTP, URL, DNS, with diagram (Q.2 (A) context)
- [x] URL and URL Encoding — percent-encoding table, %20, %2B, %3F (Q.1 (c))
- [x] MIME Types — 12 predefined MIME content types in a table (Q.1 (c))
- [x] Basic Principles of Developing a Website (Q.1 (a))

### Unit 2 — HTML (7 topics)
- [x] HTML Basics — Structure of a Web Page, tags, attributes, full skeleton code (Q.3 (A) context)
- [x] HTML Lists — Ordered Lists and Their Types (1, A, a, I, i), Name/Age/Sex example code (Q.3 (B))
- [x] Images in HTML and Background Image Tile — nature.jpg, background-repeat: repeat (Q.1 (b))
- [x] HTML Links and Tables (Q.3 (A) context)
- [x] HTML Forms in Detail — elements, attributes, GET vs POST, full form code (Q.3 (A))
- [x] HTML Frames, Frameset and Frame Tag — four equal parts code (Q.8)
- [x] Navigation Bar — Designs and Standard Code, full HTML + CSS (Q.2 (B))

### Unit 3 — CSS and JavaScript (9 topics)
- [x] Style Sheets — What Are They? (Q.1 (d))
- [x] How to Introduce Style in HTML — inline, internal, external, full example (Q.1 (e), Q.4 (A))
- [x] CSS Properties — Various Properties with Examples, 10-property table (Q.9)
- [x] Displaying, Positioning and Floating an Element in CSS (Q.4 (B))
- [x] JavaScript — Introduction and Advantages (Q.1 (d))
- [x] How to Insert JavaScript Code into an HTML Document (Q.10)
- [x] JavaScript Control Flow Statements — if/else, switch, for, while, do-while (Q.10)
- [x] JavaScript Arithmetic Calculator Program — full program + output (Q.5 (A))
- [x] Online Quiz Program with Validation in JavaScript — flow diagram + full program (Q.5 (B))

### Unit 4 — PHP and Server-Side (5 topics)
- [x] PHP — Introduction and How to Start a PHP Block — 5 ways, literal tags in table (Q.1 (f))
- [x] PHP Variables, Data Types, Operators and Control Statements (Q.11 context)
- [x] PHP String Functions and the stristr Example — output "student of BCA" (Q.1 (g))
- [x] Form Processing Using PHP — Validation and Tabular Display, full form + PHP (Q.11)
- [x] File Upload in PHP and Displaying the Uploaded File Details — $_FILES table (Q.6 (B))

### Unit 5 — Cookies, Sessions and Web Design (6 topics)
- [x] Cookies — What Is a Cookie? setcookie, $_COOKIE, delete (Q.1 (g))
- [x] Sessions in PHP — Register, Unregister and Delete a Session Variable, modern $_SESSION + old functions (Q.6 (A))
- [x] Cookies versus Sessions — comparison table (Q.6 (A) context)
- [x] Elements of Good Web Design (Q.2 (A))
- [x] Five Golden Rules of Web Designing and Web Standards — W3C, validator (Q.7)
- [x] Home Page Layout — Basic Requirements, layout diagram (Q.7)

**Coverage result: 33/33 topics covered, 0 missing, 0 thin topics left.**

## 70 Most Important Questions — coverage
- 70 questions: 14 per unit. Marks: 21 x 2-mark, 20 x 5-mark, 29 x 10-mark.
- 42 questions starred (*) as repeated in the paper.
- Answers sized by marks (2-mark = 4–6 lines; 5-mark = half to one page; 10-mark = 1–2 pages).

## Diagrams and tables in the notes
- 5 labelled diagrams: client-server model, navigation bar, frames (four equal parts),
  online quiz flow, home page layout.
- 16 tables (URL encoding, MIME types, ordered list types, form elements, CSS properties,
  display/position/float, PHP block ways, PHP data types, string functions, $_FILES,
  session actions, cookies vs sessions, navigation bar designs, and more).
- 25 full code blocks (HTML, CSS, JavaScript, PHP), each with its output explained.

## PYQ solution PDF — IWT-Jun-2022 (36 pages, 22 questions)
- Every question is written first exactly as printed, with marks, then answered below it.
- Part B: both options (A) and (B) of all 5 questions are solved.
- Part C: all 5 questions solved (exam says attempt any 3 of 5).
- Code correctness re-checked: stristr output "student of BCA"; calculator uses
  parseFloat and guards division by zero; quiz validates every question before
  scoring; file upload checks error, size and move_uploaded_file; form processing
  validates with filter_var and escapes output with htmlspecialchars.

## Unclear questions flagged (also listed at the end of the solution PDF)
1. Q.5 (B) — the text "https://www.btubikaner.com" is printed in the middle of the
   question in the scan. It is the website footer of the paper, not part of the
   question, so it is not answered as part of the question.
2. Q.1 (g) — the code is printed as `echo stristr (" I am the student of BCA", "STUD");`.
   The space before "I am" is a printing space inside the string; the output
   given, "student of BCA", is the same with or without that leading space.
3. Q.8 — HTML frames and the frameset tag were removed from HTML5. The answer gives
   the frames code exactly as the paper asks for it, and notes that a modern site
   would use CSS layout or the iframe tag instead.
4. Q.6 (A) — the functions session_register and session_unregister named in the
   question were removed in PHP 5.4. The answer gives the modern $_SESSION method
   first, and the old functions second, with the removal noted.

## Quality checks done
- Both PDFs verified with pdfinfo: valid, A4 (595.276 x 841.89 pts).
- Notes: 113 pages (Units 1–5 pp. 2–49, 70 Questions pp. 50–113), ~42,600 words.
- Solutions: 36 pages, 22 questions, ~11,600 words.
- Garble scan on extracted text: no joined/split words found
  (checked patterns: Rshould, Risin, FunctionalDependencies, "Relations hip",
  "Prim ary", "in the" joins, etc.).
- Visual inspection of rendered pages from every unit and the solution PDF:
  pp. 2 (Unit 1), 10 (Unit 2), 20 (Unit 3 code), 34 (Unit 4), 43 (Unit 5),
  51 (70Q, client-server diagram), and solution pp. 12, 20, 30 — all legible,
  no garbled words, code renders verbatim with angle brackets intact.
- Two garble-class bugs found during inspection and fixed before delivery:
  (a) the sanitiser split camelCase identifiers in prose ("querySelector" ->
  "query Selector"); (b) the first fix used whitespace control characters as
  placeholders, which the whitespace normaliser deleted ("document.querySelector"
  rendered as "document."). Both fixed by protecting identifiers with
  non-whitespace placeholders; re-verified by text extraction and re-rendering.

## Topics not completed
- None. Every paper-defined topic is covered in full depth.

## Files
- Notes: `~/workspace/handwritten_notes/sem4/Introduction-to-Web-Technology-Sem4-Handwritten-Notes-Full.pdf`
- Coverage: `~/workspace/handwritten_notes/sem4/Introduction-to-Web-Technology-coverage-check.md` (this file)
- Solution: `~/workspace/handwritten_notes/pyq-solutions/sem4/IWT-Jun-2022-solution.pdf`
- Work folder (pipeline + content): `~/workspace/handwritten_notes/sem4-work/iwt/`
  (`iwt_content.py`, `iwt_render.py`, `build_iwt_notes.py`, `build_iwt_solutions.py`)
- `~/workspace/handwritten_notes/sem4/PROGRESS-sem4.md` was NOT touched.
- Nothing was uploaded to GitHub; no token was requested.
