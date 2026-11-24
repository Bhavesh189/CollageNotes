# Big Data Analytics — Sem 6 — Coverage Check

Source: built from PYQ topics — there are NO source notes and NO Sem 5–8 syllabus for this subject anywhere in the repo (Bhavesh189/CollageNotes). The notes were built from the topics asked across its own 5 PYQ papers: BDA-2025 (Sem 6, 6CS5-12, 70 marks), BDA-2022 (Sem 7, 7IT4-01, 120 marks), BDA-2022 (Sem 8, 8CS4-01, 120 marks), BDA-2025 (Sem 8 Back, 8CS4-01, 120 marks), BDA-Jul-2023 (Sem 8, 8CS4-01, 120 marks). 110 paper questions in total (22 per paper).
Notes PDF: ~/workspace/handwritten_notes/sem6/Big-Data-Analytics-Sem6-Handwritten-Notes-Full.pdf — 127 pages, ~56,078 words.
Expansions: 56/56 present in the notes PDF (55 verified by exact text search; the 'writable class hierarchy' expansion is present in equivalent source wording on notes pp 35 and 99 — see notes below). 70 Questions: 70/70, all answers resolved with adequate depth, 34 starred (repeated in 2+ papers). PYQ solutions: 110/110 questions solved across 5 solution PDFs, 96 pages total; every paper question's text verified present in its solution PDF.

## Per-section coverage (every topic from the papers, grouped into Units 1–5)

### Unit 1 — Big Data Foundations

- [✓] What is Big Data
- [✓] Characteristics of Big Data
- [✓] Types of Data
- [✓] Sources of Big Data
- [✓] Features of Big Data
- [✓] Benefits of Big Data
- [✓] Challenges of Big Data
- [✓] Big Data Analytics and the Importance of Hadoop

### Unit 2 — Hadoop, HDFS and YARN

- [✓] Google File System (GFS)
- [✓] HDFS Architecture
- [✓] NameNode, DataNode and Secondary NameNode
- [✓] Metadata of the NameNode
- [✓] Building Blocks of Hadoop
- [✓] Hadoop Architecture
- [✓] Modes of Running Hadoop
- [✓] Configuring a Hadoop Cluster
- [✓] core-site.xml — the Core Configuration File
- [✓] YARN — Yet Another Resource Negotiator
- [✓] Federation and High Availability
- [✓] ZooKeeper
- [✓] Rack Awareness Policy
- [✓] The Small Files Problem

### Unit 3 — MapReduce and Hadoop I/O

- [✓] What is MapReduce
- [✓] Phases in a MapReduce Job
- [✓] Data Flow in MapReduce
- [✓] Word Count in MapReduce
- [✓] Combiner in MapReduce
- [✓] Partitioner in MapReduce
- [✓] Writable Interface in Hadoop I/O
- [✓] Writable Classes and Class Hierarchy
- [✓] RawComparator
- [✓] Input and Output Formats in Hadoop
- [✓] Map-Side Join and Reduce-Side Join
- [✓] Why MapReduce is Slower than Other Frameworks
- [✓] Hadoop API for MapReduce Framework

### Unit 4 — Pig and Pig Latin

- [✓] What is Pig and Pig Latin
- [✓] ABCs of Pig Latin
- [✓] Pig Architecture
- [✓] Pig Execution Environment
- [✓] Pig Script Interfaces
- [✓] Pig Data Types
- [✓] Relational Operators in Pig
- [✓] Scripting with Pig Latin
- [✓] Local and Distributed Modes of Pig

### Unit 5 — Hive, HBase and Sqoop

- [✓] What is Apache Hive
- [✓] Hive Architecture and Services
- [✓] HiveQL — Hive Query Language
- [✓] Hive Clients
- [✓] Hive Data Types
- [✓] Partitions in Hive
- [✓] Buckets in Hive
- [✓] Querying and Analysing Data in Hive
- [✓] HBase — Key Components
- [✓] Sqoop — Import and Export

**Total: 54/54 topics in the notes.**

## Gaps / fixes

- 'Writable class hierarchy' expansion: the expansion's first paragraph ("The Writable hierarchy has Writable at the top. Under it are two branches…") was deduplicated against the Unit 3 section's own paragraph, which says the same thing in slightly different words ("The Writable class hierarchy has Writable at the top, with two children: WritableComparable…"). The content is fully present on notes p35 and again in 70Q Q.38 (p99), with the Writable tree diagram. No content is missing.
- Garble fix (2026-11-24): the sanitize PROTECT list had overlapping keys, so `KeyValueTextInputFormat` rendered as "Key ValueTextInputFormat". Fixed by replacing PROTECT entries longest-first; re-scan confirms 0 occurrences remain.
- Angle-bracket fix (2026-11-24): ReportLab's paragraph parser was silently eating Java generics and Hive complex types — `Mapper<LongWritable, Text, Text, IntWritable>` rendered as bare `Mapper`, and `ARRAY<INT>` as bare `ARRAY`. Added an `esc()` step in `helpers.py sym()` that escapes `<`/`>` except inside `<b>`/`<u>`/`<font>` tags. Verified visually: word-count Mapper/Reducer code and `ARRAY<INT>` / `STRUCT<city:STRING, pin:INT>` now render in full in the notes and all solution PDFs.
- Definition-box fix (2026-11-24): `_defn` truncated long definitions at 380 characters and appended ".", which could end a box mid-phrase ("…not to HDFS,.", "…(usually MySQL or."). It now strips trailing punctuation, extends to the next sentence end (or the end of the paragraph when close) when the cut lands on a weak word, and returns the cut as-is when it lands on a sentence boundary. A check over every source + expansion paragraph confirms 0 punctuation-defect boxes remain.
- Star fix (2026-11-24): repeated 70Q questions were marked with a plain red `*`; they now show a red star ★, as specified.
- No topic from any paper was left out. Every one of the 110 paper questions resolves to full-depth content (verified programmatically: no thin or unresolved answers).

## Verification performed

- Headings: 54/54 present in the notes PDF (text search). Expansions: 56/56 present (55 exact-phrase, 1 in equivalent wording — see above). 70 Questions: 70/70 question texts present in the notes PDF; 34 starred.
- Paper questions: 110/110 resolve to content with adequate depth, and all 110 question texts appear in their solution PDFs (verified programmatically per paper).
- Garble scan of all 6 final PDFs: 153 suspicious hits, all false positives — the only distinct tokens are legitimate plurals (DataNodes, NodeManagers, TaskTrackers, NameNodes) and the real Hadoop property name `fs.defaultFS`. Zero joined/split-word tokens, zero long tokens, zero devanagari, zero missing glyphs.
- Visual inspection of rendered pages: notes pp 1 (title), 12 (U2 HDFS table + NameNode/DataNode diagram), 30 (U3 word count), 65 (70Q start, red ★), 82 (U2 layer-stack diagram), 90 (U3 MapReduce flow diagram); solutions BDA-2025 p15 (word-count Java code with generics), BDA-2022 p9 (Hive small-CSV scenario), BDA-2022-Sem8 p19 (Hive architecture + data types), BDA-2025-Sem8 p13 (Driver/Mapper code + HDFS diagram). All legible, correct style (Patrick Hand, blue ink, red definition boxes, black underlined headings, unit header + page number).

## Flags carried into the solution PDFs

- BDA-2022 (Sem 8), Part B Q.7 is printed as "Explain how the hive client can be examine." — solved as printed; the flag is listed in that solution PDF's flags section.
- BDA-2025 (Sem 8 Back), Part C instructions print "4 x 15 marks = 60 marks. Candidates have to answer 3 questions out of 5" — the "3" contradicts the 4×15 total; all 5 Part C questions are solved as printed; the flag is listed in that solution PDF's flags section.
- BDA-Jul-2023, Part A Q.1 and Q.6 both ask "Explain secondary Namenode" — the repeat is inside the paper itself; both are solved as printed; the flag is listed in that solution PDF's flags section.
- No question was unclear, illegible or unsolvable. All 110 PYQ questions solved.
