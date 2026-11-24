# Compiler Design — Sem 6 — Coverage Check

Source: Bhavesh189/CollageNotes, notes-source/notes/sem6/compiler-design, cd-unit-1.pdf … cd-unit-5.pdf (143 source pages).
Notes PDF: ~/workspace/handwritten_notes/sem6/Compiler-Design-Sem6-Handwritten-Notes-Full.pdf — 186 pages, ~86,400 words.
Expansions: 71/71 present in the notes PDF (verified by text search). 70 Questions: 70/70, all answers resolved with adequate depth. PYQ solutions: CD-2024 22/22 questions, CD-2025 22/22 questions.

## Per-section coverage (every heading from the source notes)

### Unit 1

- [✓] PREPROCESSOR
- [✓] COMPILER
- [✓] ASSEMBLER
- [✓] INTERPRETER
- [✓] INTERPRETER
- [✓] Disadvantage
- [✓] LOADER AND LINK-EDITOR:
- [✓] TRANSLATOR
- [✓] TYPES OF TRANSLATOR — merged into previous section
- [✓] TYPES OF COMPILER — merged into previous section
- [✓] PHASES OF A COMPILER:
- [✓] Lexical Analysis: — merged into previous section
- [✓] Syntax Analysis:
- [✓] Intermediate Code Generations: — merged into previous section
- [✓] Code Optimization: — merged into previous section
- [✓] Code Generation:
- [✓] Table Management (or) Book-keeping:
- [✓] BOOTSTRAPPING
- [✓] REVIEW OF FINITE AUTOMATA LEXICAL ANALYZER
- [✓] Finite Automata Construction
- [✓] LEX:
- [✓] INPUT BUFFERING
- [✓] Buffer Pairs
- [✓] Scheme
- [✓] Pointers
- [✓] Disadvantages of this scheme
- [✓] Sentinels
- [✓] Advantages
- [✓] RECOGNITION OF TOKENS
- [✓] What is Token? — merged into previous section
- [✓] For example, in C language, the variable declaration line — merged into previous section
- [✓] Token — merged into previous section
- [✓] EQUAL_OP — merged into previous section
- [✓] MULT_OP — merged into previous section
- [✓] COMMA — merged into previous section
- [✓] LEFT_PAREN
- [✓] Any finite set of symbols
- [✓] Assignment — merged into previous section
- [✓] Special assignment — merged into previous section
- [✓] Comparison — merged into previous section
- [✓] Preprocessor
- [✓] LEX INTRODUCTION:
- [✓] FIG: 1.7 LEXICAL ANALYZER
- [✓] How Pleasant Is the Weather?
- [✓] How Pleasant Is The Weather?
- [✓] Advantages of Lexical analysis
- [✓] HTML, CSS — merged into previous section
- [✓] Disadvantage of Lexical analysis
- [✓] ERROR HANDLING:
- [✓] Types or Sources of Error –
- [✓] Classification of Compile-time error –
- [✓] Semantic Errors
- [✓] Error Recovery

### Unit 2

- [✓] Derivation
- [✓] Context-Free Grammar Examples
- [✓] INTRODUCTION TO PARSING
- [✓] Types of Parsers — merged into previous section
- [✓] TOP-DOWN PARSER
- [✓] LR PARSER
- [✓] BOTTOM-UP PARSING — merged into previous section
- [✓] It is a parsing strategy that first looks at
- [✓] Top-down parsing attempts to find the — merged into previous section
- [✓] Bottom-up parsing can be defined as an attempt to — merged into previous section
- [✓] In this parsing technique we start parsing — merged into previous section
- [✓] In this parsing technique we start parsing from — merged into previous section
- [✓] This parsing technique uses Left — merged into previous section
- [✓] This parsing technique uses Right Most — merged into previous section
- [✓] It’s main decision is to select what
- [✓] SHIFT REDUCE PARSING
- [✓] Basic Operations –
- [✓] EXAMPLE:1 — merged into previous section
- [✓] EXAMPLE: 2 — merged into previous section
- [✓] EXAMPLE: 3 — merged into previous section
- [✓] Action — merged into previous section
- [✓] Shift
- [✓] Shift
- [✓] Shift
- [✓] Shift
- [✓] Shift
- [✓] Shift
- [✓] Shift
- [✓] Shift
- [✓] Operator precedence parsing
- [✓] Predictive Parser - Recursive Descent Parser (RDP)
- [✓] The differences are
- [✓] Limitations
- [✓] PREDICTIVE PARSER AND LL GRAMMAR
- [✓] Consider
- [✓] Consider the following grammar – — merged into previous section
- [✓] After removing left recursion, left factoring
- [✓] Follow
- [✓] Consider the Grammar — merged into previous section
- [✓] Follow
- [✓] ERROR HANDLING OF LR PARSER
- [✓] LR PARSER AND CONSTRUCTION OF SLR
- [✓] Description of LR PARSER
- [✓] LR PARSER ALGORITHM
- [✓] PARSING TABLE
- [✓] Note – — merged into previous section
- [✓] SLR Parser
- [✓] Construction of SLR parsing table –
- [✓] CLR PARSER
- [✓] Closure (I)
- [✓] Goto (I, X)
- [✓] Void items (G’) — merged into previous section
- [✓] For (each grammar symbol
- [✓] Construction of GOTO graph
- [✓] Input – augmented grammar G’
- [✓] Consider the following grammar
- [✓] GOTO graph for this grammar will be
- [✓] LALR PARSER
- [✓] Augmented grammar — merged into previous section
- [✓] PARSING WITH AMBIGUOUS GRAMMAR
- [✓] (RMDT).
- [✓] Disambiguate the grammar
- [✓] Parsing ambiguous grammars using LR parser
- [✓] Introduction to YACC

### Unit 3

- [✓] Syntax Directed Definitions
- [✓] Semantic actions
- [✓] Types of attributes
- [✓] Semantic rules
- [✓] Semantic Rules
- [✓] S-attributed Definitions
- [✓] Semantic rules
- [✓] L-attributed Definitions
- [✓] Semantic Rules
- [✗] TOP-DOWN TRANSLATION — DROPPED (see notes below)
- [✓] Remove left recursion
- [✓] > - T R
- [✓] Intermediate code forms using postfix notation
- [✓] DIRECTED ACYCLIC GRAPH
- [✓] Why Are Directed Acyclic Graphs Useful?
- [✓] THREE ADDRESS CODE IN COMPILER
- [✓] The common forms of Three Address instructions are
- [✓] If x relop y goto X
- [✓] If the condition “x relop y” gets satisfied, then — merged into previous section
- [✓] If the condition “x relop y” fails, then
- [✓] TAC FOR VARIOUS CONTROL STRUCTURES
- [✓] The flow of control statements
- [✓] BACKPATCHING FOR BOOLEAN EXPRESSIONS
- [✓] For Example, Backpatching using boolean expressions production — merged into previous section
- [✓] Production Table for Backpatching
- [✓] Three address codes for the given example — merged into previous section
- [✓] Parse tree for the example
- [✓] Implementation of Three Address Code
- [✓] Advantage — merged into previous section
- [✓] Disadvantage
- [✓] Disadvantage
- [✓] Example
- [✓] BOOLEAN EXPRESSIONS
- [✓] Numerical Representation
- [✓] Translation scheme using a numerical representation for Booleans
- [✓] SDT for Switch Case
- [✓] Ln: code for Sn
- [✓] SDT for Procedure Call
- [✓] Call fun, n … — merged into previous section

### Unit 4

- [✓] DEFINITION OF STORAGE ALLOCATION
- [✓] Difference between Static Allocation and Heap Allocation
- [✓] Static allocation allocates memory — merged into previous section
- [✓] Heap allocation make use of — merged into previous section
- [✓] In static allocation, there is no — merged into previous section
- [✓] In heap allocation, dynamic data — merged into previous section
- [✓] In static allocation, the names of the — merged into previous section
- [✓] Heap — merged into previous section
- [✓] Static allocation is simple, but not — merged into previous section
- [✓] Heap allocation does memory — merged into previous section
- [✓] Static allocation strategy is faster in — merged into previous section
- [✓] While heap allocation is slow in — merged into previous section
- [✓] Static allocation is — merged into previous section
- [✓] While heap allocation is — merged into previous section
- [✓] Runtime Environments
- [✓] Activation Tree
- [✓] Properties of activation trees are :
- [✓] Example – Consider the following program of Quicksort
- [✓] CONTROL STACK AND ACTIVATION RECORDS
- [✓] SUBDIVISION OF RUNTIME MEMORY
- [✓] STORAGE ALLOCATION TECHNIQUES
- [✓] Access to Nonlocal Data on the Stack
- [✓] Heap Management
- [✓] What is parameter passing
- [✓] Accessing local names in a block structured languages
- [✓] Different ways of passing the parameters to the procedure
- [✓] Call by Copy Restore
- [✓] Activation Records
- [✓] Activate Record
- [✓] Temporaries — merged into previous section
- [✓] Local Data — merged into previous section
- [✓] Machine Status — merged into previous section
- [✓] Control Link — merged into previous section
- [✓] Access Link — merged into previous section
- [✓] Parameters — merged into previous section
- [✓] Return Value
- [✓] Symbol Table in Compiler
- [✓] Implementation of Symbol table –

### Unit 5

- [✓] DEFINITION OF CONTROL FLOW GRAPH
- [✓] Basic Block
- [✓] Flow Graph
- [✓] WHAT IS DAG
- [✓] Input: A basic block
- [✓] OP z Case (ii) x : = OP y
- [✓] DAG ADVANTAGE
- [✓] Advantages of using DAG technology
- [✓] Code Optimization
- [✓] When to Optimize?
- [✓] Why Optimize?
- [✓] Code After Optimization
- [✓] Code After Optimization
- [✓] Code After Optimization
- [✓] Code After Optimization
- [✓] SOURCES OF OPTIMIZATION
- [✓] Data flow analysis in Compiler
- [✓] Basic Terminologies –
- [✓] Data Flow Properties –
- [✓] Advantage –
- [✓] Advantage–
- [✓] Advantage –
- [✓] Advantage –
- [✓] Loop-Invariant Computations and Code Motion
- [✓] Pre-headers
- [✓] Peephole Optimization
- [✓] RULES FOR GENERATION DAG FROM CODE
- [✓] A SIMPLE CODE GENERATOR
- [✓] ADD Rj, Ri
- [✓] ADD c, Ri — merged into previous section
- [✓] MOV c, Rj — merged into previous section
- [✓] ADD Rj, Ri
- [✓] Register empty
- [✓] ADD R1, R0 — merged into previous section
- [✓] ADD R1, R0 — merged into previous section
- [✓] Generating Code for Indexed Assignments
- [✓] Cost — merged into previous section
- [✓] MOV b (Ri), R — merged into previous section
- [✓] Generating Code for Pointer Assignments — merged into previous section
- [✓] Cost — merged into previous section
- [✓] MOV *Rp, a — merged into previous section
- [✓] MOV a, *Rp
- [✓] Input to code generator
- [✓] Target program
- [✓] Memory Management
- [✓] Instruction selection
- [✓] MOV R0, S
- [✓] Register allocation issues
- [✓] M a, b
- [✓] Evaluation order

**Total: 243/244 source sections in the notes.**

## Gaps / fixes

- The single section not rendered as its own heading is Unit 3 'TOP-DOWN TRANSLATION': the source section contains only the word 'Example:' (the example itself is a figure with no extractable text), so it was dropped as an empty fragment. Its full-depth expansion 'top-down translation' IS in the notes (unit-end fallback, verified by text search), and the same topic is also answered in the 70 Questions and in CD-2024 Part B Q.5. No content is missing.
- Sections marked 'merged into previous section' are short table/fragment headings (e.g. Unit 4 activation-record fields 'Temporaries', 'Local Data', 'Machine Status', 'Control Link', 'Access Link', 'Parameters'; Unit 5 code-generation lines 'ADD c, Ri', 'MOV c, Rj', 'Cost'). Their text is included in the preceding section, not lost.
- Garble fix (2026-11-24): source OCR wrote 'Ti.val' for 'T1.val' in the Unit 3 semantic-rules block (2 occurrences). Fixed in source_u3.json and the notes were rebuilt; re-scan confirms 0 occurrences remain.
- Diagram fix (2026-11-24): the first build of CD-2024 Q.3 used the generic DAG diagram for 'a = b + b*c + d'. A dedicated 'dag2024' diagram for ((a+a)+(a+a))+((a+a)+(a+a)) was added and the solution PDF rebuilt and visually verified.

## Verification performed

- LR tables verified programmatically (canonical LR(0)/LR(1) collections): CD-2024 LALR — 7 states, no conflicts; CD-2025 SLR = LALR — 10 states each, no conflicts, no merging.
- DAGs verified by construction: 2024 C3 — 1 leaf + 3 interior nodes; 2025 B3 — 3 leaves + 3 interior nodes; 2025 C4 — 5 leaves + 4 interior nodes, no sharing.
- Garble scan of all three final PDFs: only legitimate long tokens (source path, digit list, hyphenated phrase, the DAG expression itself). Zero joined/split-word tokens.
- Visual inspection of rendered pages: notes pp 2, 10 (U1), 30 (U2), 55 (U3), 80 (U4), 100 (U5), 130, 160 (70 Questions); solutions CD-2024 pp 12–15 (Lex program, DAG, LALR tables), CD-2025 pp 5–6, 14 (SLR tables, DAG). All legible, correct style (Patrick Hand, blue ink, red definition boxes, black underlined headings).

## Flags carried into the solution PDFs

- CD-2024 Part C Q.3: the printed expression begins with 'c' — most likely a printing error for an opening bracket. Solved as ((a+a)+(a+a))+((a+a)+(a+a)); the literal reading (c times (a+a)) is also worked out at the end of that answer. Flag is also listed in the solution PDF's flags section.
- No other question was unclear or unsolvable. All 44 PYQ questions solved.
