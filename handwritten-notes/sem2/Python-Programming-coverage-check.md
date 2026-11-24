# Python Programming (Sem 2) — Coverage Check

**Built from scattered Sem 4 Python notes; Sem 2 paper PY-Jun-2022.**

- Source notes: `Bhavesh189/CollageNotes`, `notes-source/notes/sem4/python-programming/py-unit-1.pdf` … `py-unit-5.pdf` (same subject, Sem 4 code 4CS4-05 Introduction to Python Programming). 246 source pages, 45,237 words.
- Sem 2 paper solved: `public/pyq/sem2/PY-Jun-2022.pdf` — B.Tech II Sem End-Term (Main), June 2022, 2FY3-04 Python Programming, 105 marks, 3 pages (scanned, read visually).
- Outputs: notes `~/workspace/handwritten_notes/sem2/Python-Programming-Sem2-Handwritten-Notes-Full.pdf` (**178 pages**, 44,213 words: Units pp. 2–102, 70 Questions pp. 103–178); solutions `~/workspace/handwritten_notes/pyq-solutions/sem2/PY-Jun-2022-solution.pdf` (**40 pages, 25 questions**).
- Style: Patrick Hand, blue body ink, black underlined headings, red key terms/definitions, unlined white A4 portrait, ~1.5 cm balanced margins, unit name top, page number bottom.
- Quality: every code snippet in the notes and solutions was executed and its claimed output verified (130 of 138 code blocks checked exactly; 6 are chart-drawing programs whose output is a chart, described, not literal text; 2 differ only by an invisible trailing space from `print(x, end=' ')`). Seven real errors found by that check were fixed before building (wrong NumPy std 9.35 → 9.57, wrong `count('a')` 2 → 1, wrong `find('give')` 13 → 12, `dtype='f'` is float32 not float64, nditer cast, swap print spacing, file-read blank lines). Garble scan on the built PDFs: no long joined words, no split-word artefacts (`NumPy`, `SciPy`, `PyGame` etc. intact). Sample pages visually inspected from every unit (pp. 5, 14, 23, 47, 67, 86, 110) and the solutions (pp. 2, 5, 15, 30): all legible, code boxes, flowchart and index diagram render correctly.

## Coverage — every source topic, ticked off

### Unit 1 — Introduction, Data Types and Operators (source 31 pp.)
- [x] What is Python? (Guido van Rossum, 1991, dynamic, interpreted, byte code-compiled)
- [x] What can Python do? (web, software, maths, scripting, databases, big data, prototyping)
- [x] Why Python? / Features of Python (simple, portable, interpreted, OOP, free/open source, large library, dynamically typed)
- [x] Python indentation (4 spaces, blocks, IndentationError)
- [x] Python comments (single-line #, multi-line triple quotes, docstrings)
- [x] The Python Standard Library (math, random, datetime, os, re — "batteries included")
- [x] Third-party libraries and how to use them (pip install, import, example)
- [x] Important Python libraries: NumPy, Pandas, Matplotlib, Requests, SciPy, BeautifulSoup, SQLAlchemy, Flask, Pygame, SymPy, Pillow, Scrapy, Twisted, iPython, Pyglet, Nose
- [x] Built-in data types (int, float, complex, str, bool, list, tuple, dict, set, NoneType) + type()
- [x] Python numbers (int, float, complex, .real/.imag, 0.1 + 0.2 quirk)
- [x] Python variables and variable names (naming rules, case-sensitive, keywords)
- [x] Multi-word variable names: camel case, Pascal case, snake case
- [x] Assign multiple values, one value to multiple variables, unpack a collection, output variables
- [x] Casting (int(), float(), str(), bool(), input() conversion)
- [x] Python strings (assign, multiline, slicing, modify, upper/lower, strip, concatenation, format, escape characters)
- [x] String methods (full list: capitalize, count, find, index, split, join, title, etc.) + count() method with syntax
- [x] Python booleans (True/False, truthiness of values)
- [x] Python operators: arithmetic, assignment, comparison, logical, identity, membership, bitwise + precedence

### Unit 2 — Decision Making, Loops and Functions (source 44 pp.)
- [x] Decision-making statements: if, if-else, if-elif ladder, nested if (with flowcharts)
- [x] Python loops: while loop, for loop, range(), working of for loop
- [x] break, continue, pass statements + loop else
- [x] Python math module (functions table incl. sqrt, factorial, ceil, floor, gcd, trig, log) + math constants (pi, e, inf, nan)
- [x] Python random module + randint() (randrange, random, choice, shuffle, seed)
- [x] Python functions: creating, calling, arguments, number of arguments, keyword arguments, default parameter value, passing a list, return values, pass statement
- [x] Recursion + recursion example (factorial, Fibonacci)
- [x] Python lambda (anonymous functions, map/filter/sorted)
- [x] User-defined functions + advantages + variable-length arguments (*args)
- [x] Find the largest item from a given list
- [x] Regular expressions: matching patterns, search/match/findall/sub/split, capturing groups, pattern table
- [x] Python string operations: access characters, multiline string, length, replace()
- [x] Program to print all positive numbers in a range; program to print multiples of 2; factorial using recursion

### Unit 3 — Lists, Tuples, Dictionaries and Sets (source 51 pp.)
- [x] Python lists: items, ordered/changeable/duplicates, length, data types, list() constructor
- [x] Access items, negative indexing, range of indexes, range of negative indexes, check if item exists
- [x] Change item value, change a range of item values, insert, append, extend, add any iterable
- [x] Remove specified item, remove specified index (pop), clear the list
- [x] Loop through a list, loop through index numbers, while loop, list comprehension
- [x] Sort list (alphanumeric, descending, custom key, case-insensitive), reverse order
- [x] Copy a list (copy() vs assignment sharing), join two lists
- [x] List methods table (append, clear, copy, count, extend, index, insert, pop, remove, reverse, sort)
- [x] List append(), pop(), sort() in detail
- [x] Tuples: items, unchangeable, length, one-item tuple comma, tuple() constructor, access, update via list conversion, add/remove items, unpacking, loop, join, multiply
- [x] Tuple methods count() and index(); slicing, deleting a tuple, repetition, membership test, iterating, immutability
- [x] Tuples vs lists (difference table)
- [x] Dictionaries: items, duplicates not allowed, length, data types, dict() constructor, accessing items, get keys/values/items, check key, change values, update, adding, removing, loop, copy, nested dictionaries
- [x] Dictionary methods table + pop() and update() in detail
- [x] Sets: items, unordered, change items, add, remove, loop, join (union, intersection, difference, symmetric difference), set methods table + union()/intersection() in detail

### Unit 4 — Functions in Depth and File Handling (source 42 pp.)
- [x] User-defined function, calling a function, return statement
- [x] Default argument values (incl. youngest-child keyword-argument example)
- [x] Python scope: local scope, function inside function, global scope, naming variables, global keyword
- [x] Lambda function, count down to zero, factorial with recursion
- [x] Practice programs: Fibonacci sequence using recursion, Armstrong number, kilometres to miles, select-operation calculator, number check (positive/negative/zero)
- [x] File handling: open a file, file modes, read only parts of the file, write to an existing file, create a new file, delete a file, delete a folder
- [x] Create file programs: if not exists, with permissions, empty text file, in a specific directory, with date-time, binary file, text mode
- [x] seek() and tell(): seek beginning/end/current position, seek backward with negative offset, summary table

### Unit 5 — NumPy, Sets and Data Visualization (source 78 pp.)
- [x] Unit 5's repeated functions/file-handling pages (~30 pp., same material as Unit 4) — covered once, in full, in Unit 4; not duplicated (see note below)
- [x] NumPy: installation, import as np, checking version, ndarray object, vectorized vs non-vectorized implementation, np.vectorize syntax
- [x] Creating arrays, dimensions (0-D/1-D/2-D/3-D/higher), ndmin, zeros/ones/arange/linspace/eye
- [x] Access array elements (1-D/2-D/3-D), negative indexing
- [x] NumPy array slicing (start/stop/step defaults, negative slicing, 2-D slicing)
- [x] NumPy data types (i, f, b, S, U, M, O, c, u), checking dtype, creating with defined dtype, astype() conversion
- [x] Iterating arrays (for, flat, 2-D/3-D loops), nditer(), ndenumerate(), iterating with different data types and step size
- [x] Universal functions (ufuncs): sqrt, add, multiply, power, sin, log, absolute, etc. + statistics example (sum/mean/max/min/std)
- [x] Advanced indexing: index arrays, integer indexing, boolean indexing, boolean array indexing
- [x] Operations on sets: union, intersection, difference, complement, symmetric difference, subset/superset, frozenset, set operators
- [x] Data visualization: why, packages (Matplotlib, Seaborn, Bokeh, Plotly, ggplot, Altair, Pygal)
- [x] Matplotlib: line plot, scatter plot, bar chart (+ title/labels/show)
- [x] Seaborn: lineplot, scatterplot, barplot (built on Matplotlib + Pandas)
- [x] Bokeh: line chart, adding widgets (Button, CheckboxGroup, RadioGroup, CustomJS)
- [x] Plotly: scatter plot with plotly.express, how it differs from Matplotlib

**Coverage result: 69 / 69 source topics covered (100%).** No source topic left out. The only source material not reproduced page-for-page is the Unit 5 repeat of Unit 4's functions/file-handling pages (identical material, covered once in Unit 4) and the Unit 2 repeat of Unit 1's string section (covered in Unit 1).

## 70 Most Important Questions
- 70 questions, all 5 units, answers sized by marks (3-mark short, 5–6-mark half–one page, 10-mark 1–2 pages). **28 starred** as most repeated (every topic asked in PY-Jun-2022 + the source's most important topics).
- Marks mix: 3-mark × 15, 5-mark × 23, 6-mark × 25, 10-mark × 7 (total 70).

## PY-Jun-2022 solutions — question count
- 25 questions solved in paper order, both options of every Part B choice and all five Part C questions (paper says attempt any 3 of 5): Part A Q.1 (a)–(g) = 7, Part B Q.2–Q.6 (A and B) = 10, Part C Q.7 (i)(ii), Q.8, Q.9 (i)(ii), Q.10 (i)(ii), Q.11 = 8. Total 25. No question left unsolved; no "similar to" cross-references.
- Unclear questions flagged in the solution PDF: (1) Q.2 (B) prints "maximum marks for each subject is 105" — solved exactly as printed (maximum total 525); 105 per subject is unusual and the intended figure was probably 100 (total 500). (2) Part C choice and Part B A/B choice noted — all options solved anyway.

## Mismatch: Sem 4 source notes vs the Sem 2 paper
1. **The Sem 2 paper asks only core Python.** Every question in PY-Jun-2022 is on: Python intro/libraries, identifiers, operators/expression evaluation, tuples vs lists, user-defined functions, features, file deletion, swapping, aggregate marks, break/continue, discount program, string slicing, leap year, dictionaries, parameter passing, sum_prod(), recursion types, data types, loops, operators, if-else/nested if, strings, Fibonacci recursion, nested functions, file modes. All of these are covered in the notes (Units 1–4).
2. **The Sem 4 source notes contain topics the Sem 2 paper never asks:** NumPy (arrays, indexing, slicing, dtypes, iteration, ufuncs, advanced indexing), data visualization (Matplotlib, Seaborn, Bokeh, Plotly), regular expressions, the math module, the random module, and sets in depth. These are included in the notes in full (Unit 5 + Unit 2/3) because the source notes are the content reference, but a student revising only for the Sem 2 paper can treat Unit 5 and the regex/math/random sections as extra.
3. **The BTU 2021-22 first-year syllabus has no Python theory course.** `public/syllabus/sem1/syllabus.pdf` (First Year 1st & 2nd Sem) was searched: it contains no "Python" and no course code 2FY3-04 — only a Computer Programming Lab. So the Sem 2 paper's course (2FY3-04) does not appear in that syllabus document; the Sem 4 source notes (4CS4-05 Introduction to Python Programming) are the de facto syllabus used for these notes.
4. **Q.2 (B) "105 marks per subject"** (see flagged items above) — solved as printed.

## Topics/papers not completed
- None. All 5 units, all 70 questions, and all 25 PY-Jun-2022 questions are complete. No other paper was assigned or solved.
