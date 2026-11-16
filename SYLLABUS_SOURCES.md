# Syllabus sources — CollageNotes

Official BTU (Bikaner Technical University) B.Tech CSE syllabus, 2021-22 scheme.
Files live in `public/syllabus/semN/syllabus.pdf` and are shown first on each
semester page via `src/data/syllabusData.js`.

## Included (verified BTU documents)

| Semesters | File | Source | Verified |
|---|---|---|---|
| 1 & 2 | `public/syllabus/sem1/syllabus.pdf` | B.Tech First Year (1st & 2nd Sem), common to all branches — BTU official document, approved 7th AC Meeting 1 Nov 2021. Downloaded from the GWECA (affiliated college) mirror hosting the BTU document: http://www.gweca.ac.in/files/section/department/150_B.Tech_First_Year_Scheme_%26_Syllabus_2021-22.pdf | 32 pages, PDF 1.5, author Dharmendra Singh, MD5 `fa108dafd4ad349ff20af860aa145eb0` |
| 1 & 2 | `public/syllabus/sem2/syllabus.pdf` | Same document as sem1 (one First-Year document covers both semesters) | Same MD5 as sem1 |
| 3 & 4 | `public/syllabus/sem3/syllabus.pdf` | B.Tech CSE 3rd & 4th Semester, Session 2021-22 — BTU official document, supplied by the site owner | 28 pages, PDF 1.7, MD5 `342b38909904edf8bd8ae6160f662e09` |
| 3 & 4 | `public/syllabus/sem4/syllabus.pdf` | Same document as sem3 (one document covers both semesters) | Same MD5 as sem3 |

## Not yet included (no verified document found)

| Semesters | Status |
|---|---|
| 5 & 6 | **Not found.** The plain-CSE BTU 5th & 6th semester 2021-22 document could not be located as a downloadable PDF. btu.ac.in itself was unreachable from the build machine. Nearby documents that were checked and REJECTED: the BKBiet-hosted `B.Tech_CSEDS_5__6` file is the CSE (Data Science) branch, not plain CSE; the Scribd document titled `B-Tech-CSE-CS-5-6-Semester-Session-2021-22-Scheme-Syllabus-Final` is the CSE (Cyber Security) branch (5CY codes); a Scribd `COMPUTER SCIENCE SYLLABUS` copy is the older RTU-adopted syllabus (2020-21 onwards), not the 2021-22 BTU scheme. The semester page shows a "coming soon" card until the correct file is added. |
| 7 & 8 | **Not found.** No BTU plain-CSE 7th & 8th semester 2021-22 scheme document was found in search (btu.ac.in unreachable; affiliated-college mirrors only carry other branches/years). Same "coming soon" card applies. |

## How to add a missing semester later

1. Obtain the official BTU document (ideally from btu.ac.in or a BTU-affiliated college mirror carrying the BTU header).
2. Save it as `public/syllabus/semN/syllabus.pdf`.
3. In `src/data/syllabusData.js`, flip that semester's entry to `available: true` and fill in `file`, `source`, `session`.
4. Add its byte size to `src/data/fileSizes.js` (key `/syllabus/semN/syllabus.pdf`).
5. Record the source URL in this file. Never label a document "official" unless it carries the BTU header or comes from btu.ac.in — btubikaner.com is an UNOFFICIAL portal and must not be cited as official.
