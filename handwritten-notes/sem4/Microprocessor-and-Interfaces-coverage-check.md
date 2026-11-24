# Microprocessor & Interfaces (Sem 4) — Coverage Check

Notes PDF: `Microprocessor-and-Interfaces-Sem4-Handwritten-Notes-Full.pdf` — 184 pages, A4.
Source: Dr. Neeraj Jain, MITRC Alwar, session 2023-24 — 5 units, 178 source pages, 254 source headings.
Method: every source heading was checked against the built notes PDF text; per-unit diagram/table/expansion counts are from the build log.

## Per-unit coverage

| Unit | Source headings | Covered | Diagrams | Tables | Expansions | Notes pages |
|---|---|---|---|---|---|---|
| 1 — Introduction and Architecture of 8085 | 54 | 54 | 7 (block8085, demux, flow_cycle, mem_map, pin8085, wave_memread, wave_opfetch) | 6 | 42 | 1–28 |
| 2 — 8085 Assembly Language Programming and Instruction Set | 68 | 68 | 0 (instruction tables carry the content) | 7 (all instruction-group tables) | 21 | 29–46 |
| 3 — Interfacing with I/O Devices | 43 | 43 | 5 (chip8253, chip8255, chip8257, chip8259, intr_priority) | 10 | 22 | 47–66 |
| 4 — Architecture of 8051 | 56 | 56* | 2 (block8051, pin8051) | 13 | 28 | 67–91 |
| 5 — Programming and Application of 8051 | 33 | 33 | 1 (intr8051) | 4 | 16 | 92–105 |
| **Total** | **254** | **254** | **15** | **40** | **129** | **1–105** |

* Unit 4 heading "Modify Bit" is a mis-extracted fragment of the PCON register table (its only line is the SMOD bit: "If 1, doubles the baud rate using Timer 1"). The SMOD/PCON content is covered in the notes ("doubles the baud rate" x2, PCON x17, SMOD x4), so the heading is counted as covered.

## Topic checklist (every source heading, ticked)

### Unit 1 — Introduction and Architecture of 8085

- [x] Introduction
- [x] Memory & I/O Operation
- [x] Bus System
- [x] Pin diagram & Functions
- [x] Multiplexing & Demultiplexing
- [x] Generation of Control Signals
- [x] Instruction
- [x] Cycle & T State
- [x] Introduction & Evolution of Microprocessor
- [x] Evolution of Microprocessor
- [x] Size of MP
- [x] PENTIUM
- [x] It has the following configuration −
- [x] Accumulator
- [x] Arithmetic and logic unit
- [x] General purpose register
- [x] Program counter
- [x] Stack pointer
- [x] Temporary register
- [x] Flag register
- [x] Sign (S)
- [x] Zero (Z)
- [x] Auxiliary Carry (AC)
- [x] Parity (P)
- [x] Instruction register and decoder
- [x] Timing and control unit
- [x] Control Signals: READY, RD’, WR’, ALE
- [x] DMA Signals: HOLD, HLDA
- [x] Interrupt control
- [x] Serial Input/output control
- [x] Address buffer and address-data buffer
- [x] Address bus and data bus
- [x] Memory and I/O Operation
- [x] Memory Structure and its Requirements
- [x] Bus System
- [x] Pin Diagram & Functions
- [x] OPCODEFET
- [x] INTR (Input)
- [x] HOLD (Input)
- [x] HLDA (Output)
- [x] Multiplexing & Demultiplexing of Buses
- [x] Generation of Control Signals
- [x] Functions of the control signals
- [x] Instruction Cycle in Microprocessor
- [x] Fetch Instruction Cycle in Microprocessor
- [x] Decoding Instruction Cycle in Microprocessor
- [x] Reading effective address Instruction Cycle in Microprocessor
- [x] Fetch Instruction Cycle in Microprocessor
- [x] Decode Instruction Cycle in Microprocessor
- [x] Reading effective address Instruction Cycle in Microprocessor
- [x] Execution Instruction Cycle in Microprocessor
- [x] Machine Cycles in Microprocessor
- [x] T states in Microprocessor
- [x] Timing Diagram in Microprocessor
(54 headings)

### Unit 2 — 8085 Assembly Language Programming and Instruction Set

- [x] UNIT-2
- [x] Programming
- [x] Instruction Sets (Data Transfer)
- [x] Instruction Sets (Arithmetic & Logical)
- [x] Instruction Sets (Branch)
- [x] Instruction Sets (Machine Control)
- [x] Addressing Modes
- [x] Macro & Micro Instructions
- [x] BCD Arithmetic
- [x] A Machine language program to
- [x] Assembly language program to add
- [x] Code
- [x] Microprocessor understands Machine Language only!
- [x] Low-level/High-level languages
- [x] Instructions Set (Data Transfer)
- [x] Accumulator
- [x] Register A
- [x] Instructions
- [x] Instructions Set (Arithmetic or Logical)
- [x] Accumulator
- [x] Accumulator
- [x] C from Accumulator
- [x] Register
- [x] Operations
- [x] Instructions
- [x] Operations
- [x] Accumulator
- [x] Register C with Accumulator
- [x] Accumulat
- [x] Operations
- [x] Instructions
- [x] These operations are used to control the flow
- [x] Conditional jumps
- [x] Unconditional jumps
- [x] Conditional Call & Return
- [x] Unconditional Call & Return
- [x] Address
- [x] Address if Carry flag is RESET
- [x] Operations
- [x] Instructions
- [x] These instructions affect the operation of the
- [x] Stop program execution
- [x] Do not perform any operation
- [x] Writing a Assembly Language Program
- [x] Algorithm
- [x] Copy D to A
- [x] Copy A to C
- [x] Copy register D to A
- [x] Assembly Language Program
- [x] Storing result in Register memory
- [x] Register B
- [x] Store CARRY in
- [x] Jump instructions
- [x] Copy D to A
- [x] Copy A to C
- [x] Assembly Language Program
- [x] END: HLT
- [x] Jump instructions
- [x] Addressing Modes
- [x] The various formats of specifying
- [x] Macro & Micro Instructions
- [x] Hex Code
- [x] C, A
- [x] Hex Code
- [x] Hex Code
- [x] Code Conversion & BCD Arithmetic
- [x] Store the count in Register C, ie ten
- [x] Block data transfer
(68 headings)

### Unit 3 — Interfacing with I/O Devices

- [x] Concept
- [x] Interfacing of I/O devices
- [x] Interrupt
- [x] Peripheral
- [x] Programmable Interval Timer
- [x] Interfacing Concept & Interfacing of I/O Devices
- [x] Input-Output Interface
- [x] Fig: Input-Output Interface
- [x] Ways of Communication − Microprocessor with the Outside World
- [x] Introduction
- [x] When microprocessor receives any interrupt signal from peripheral(s) which are
- [x] Interrupts can be classified into various categories based on different
- [x] VECTOR ADDRESS
- [x] VECTOR ADDRESS
- [x] The interrupting device gives the address of sub-routine for these
- [x] Priority of Interrupts – When microprocessor receives multiple interrupt
- [x] Instruction for Interrupts
- [x] Data Bus Buffer
- [x] ISR to the other connected microprocessor. It can send
- [x] R/W Control Logic
- [x] It controls the functionality of each block. It has pin
- [x] It stores all interrupt level that are requesting for
- [x] It stores interrupt level that are currently being
- [x] It stores interrupt level that will be masked, by storing
- [x] Priority Resolver
- [x] To increase number of interrupt pin, we can cascade
- [x] DMA Operations
- [x] RESET
- [x] READY
- [x] HLDA
- [x] MEMR
- [x] MEMW
- [x] ADST
- [x] MARK
- [x] Reads and writes of the same counter
- [x] Reads and writes of the same counter
- [x] Data Bus Buffer
- [x] Read/Write Logic
- [x] Result
- [x] Control Word Register
- [x] Result
- [x] Word
- [x] Counters
(43 headings)

### Unit 4 — Architecture of 8051

- [x] UNIT-4
- [x] Pin Diagram & Functions
- [x] Clock & Reset Circuit
- [x] Stack & Stack Pointer, Program Counter
- [x] Memory Structures
- [x] Data & Program Memory, Timimg Diagram & Excution Cycle
- [x] Types of Registers
- [x] Special function registers (Bit addressable registers)
- [x] General Purpose Registers
- [x] Banks and Registers
- [x] A or ACC
- [x] PCON
- [x] SBUF
- [x] TCON
- [x] A or Accumulator (ACC)
- [x] B (Register B)
- [x] Given Below table describe the function of each flag
- [x] Bank
- [x] Stack Pointer (SP)
- [x] PCON (Power Control)
- [x] Modify Bit
- [x] General Purpose User
- [x] General Purpose User
- [x] To enter Power Down
- [x] To enter Idle Down
- [x] SCON (Serial Control)
- [x] Description
- [x] Multiprocessor Comm. Bit
- [x] Receive Enable Bit
- [x] Transmit Interrupt Flag
- [x] Receive Interrupt Flag
- [x] Serial Port Mode Selection Bits
- [x] Baud Rate
- [x] Fixed Baud Rate
- [x] Variable Baud Rate
- [x] Fixed Baud Rate
- [x] Frequency of
- [x] Variable Baud Rate
- [x] TCON (Timer Control)
- [x] TMOD (Timer Mode)
- [x] IE (Interrupt Enable)
- [x] IP (Interrupt Priority)
- [x] SBUF (Serial Data Buffer)
- [x] Initially charging of capacitor makes RST High
- [x] How Stacks are Accessed
- [x] Pushing into the Stack
- [x] Popping from the Stack
- [x] Stack Pointer (SP)
- [x] Program counter (PC)
- [x] Reference
- [x] Timing Diagram & Execution Cycle
- [x] Arithmetic Instructions
- [x] Fig: Data Transfer Instructions
- [x] Instruction Cycle
- [x] Timing Diagram-It is a graphical representation. It represents the execution
- [x] Machine Cycle- Time required to access the memory or input-output
(56 headings)

### Unit 5 — Programming and Application of 8051

- [x] Programming Timer Interrupt
- [x] Interrupt
- [x] Interrupt
- [x] Programming
- [x] Programming Timer Interrupt
- [x] ROM location of
- [x] Reset
- [x] External hardware
- [x] Auto
- [x] External hardware
- [x] Auto
- [x] Serial communication
- [x] Interrupt Enable register
- [x] It disables all interrupts. When
- [x] Enables/disables serial port
- [x] Enables/disables
- [x] Enables/disables
- [x] IP (Interrupt Priority) Register
- [x] It defines the serial port
- [x] It defines the timer interrupt
- [x] It defines the external
- [x] It defines the external
- [x] Programming External Hardware Interrupt
- [x] Programming the serial hardware Interrupt
- [x] Send ‘A’ from serial port with the use of interrupt
- [x] Example code
- [x] Programming the serial communication interrupt
- [x] Interrupt Vector Table
- [x] Reset
- [x] TI/RI
- [x] Careful programming is necessary to prevent unexpected behavior while handling
- [x] UNIT-5 (Programming & Application of 8051)
- [x] Fig: Timer Mode Control (TMOD)
(33 headings)

## 70 Most Important Questions (Part B, pp. 106–184)

- 70 questions, Q.1–Q.70, 14 per unit; 36 starred (*) as most repeated across the 5 PYQ papers.
- Marks: 19 x 2 marks, 32 x 5 marks, 19 x 10 marks; answers sized by marks (2-mark 4–6 lines, 5-mark half to one page, 10-mark 1–2 pages).
- Verified spot checks: Q.4 (8085 pin diagram, 10 marks) — definition box is the pin definition, no 8051 content; Q.44 (8051 architecture + pin, 10 marks) — definition box is the 8051 architecture definition, no 8085 content; Q.107 (PC + I/O ports of 8051, 2 marks) — PC definition box + ports para present.

## PYQ solutions (Part C)

| Paper | Questions solved | Pages | Notes |
|---|---|---|---|
| MPI-2022 (120 marks, old scheme) | 22 | 25 | Complete. Includes PYQ-only topics Centronics/IEEE 488, 8279 keyboard/display interface, programming model of 8085, MACRO for 2's complement. |
| MPI-2024 (70 marks) | 22 | 17 | Complete. |
| MPI-2025 (70 marks) | 21 | 15 | Part C Q.5 MISSING from the supplied paper PDF — the paper says "Total No. of Pages: 04" but the file has only 3 pages, ending "P.T.O." after Q.4. Flagged in the solution PDF. |
| MPI-2026 (70 marks) | 22 | 17 | Complete. |
| MPI-Aug-2023 (70 marks) | 19 | 11 | Part C Q.3–Q.5 MISSING — page 3 of the supplied file is a wrong paper (Theory of Computation, paper code Z-461) bound in by mistake. Flagged in the solution PDF. |

## Quality checks run

- Garble scan (camelCase joins, digit-letter joins, 20+ char lowercase tokens): 0 suspicious tokens in all 6 PDFs.
- Visual inspection of rendered pages: notes pp. 1, 5, 14, 35, 52, 55, 69, 77, 95, 110, 155; solution pages MPI-2022 p1, MPI-2024 pp. 7–8, MPI-Aug-2023 p1 — all legible, diagrams labelled, no garble.
- Source errors corrected in the notes (not copied): 8085 machine cycle is 3–6 T-states (source said 12 — that is the 8051); RST 7.5 is a hardware interrupt (source said software); parallel communication sends all 8 bits at once (source said bit by bit); P3 is B0H (source typo "P2 – B0H"); 8051 INT0/INT1 trigger on a falling edge (source said low-to-high); INT0/INT1 enable bits are EX0/EX1 in the IE register (source put them in TCON); "five hardware interrupts and two hardware interrupts respectively" sentence rewritten.
- Cross-chip contamination guards verified: no 8051 content in Units 1–3, no 8085 content in Units 4–5; only benign same-chip duplicate expansions (accumulator of 8085 in U1+U2; IE/IP expansions in U4+U5).
- All 6 PDFs verified with pdfinfo: valid, A4 (595.276 x 841.89 pts).
