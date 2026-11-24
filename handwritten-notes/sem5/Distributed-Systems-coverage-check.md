# Distributed Systems (Sem 5) — Coverage Check

Built 2026-11-24. Source: `notes-source/notes/sem5/distributed-systems/ds-unit-1.pdf` … `ds-unit-5.pdf` (139 source pages).
Notes PDF: `Distributed-Systems-Sem5-Handwritten-Notes-Full.pdf` — 148 pages, 64,437 words.
Units pp2–97 (96 pages); "70 Most Important Questions" pp98–148 (51 pages).

Method: every section heading in the five extracted source JSONs was searched verbatim in the built notes text;
headings not found verbatim were checked by distinctive content keywords. All 91 expansion keys were checked
by first-sentence match of their definition paragraph/box. The build also wrote `covered.json` (126 headings).

## Unit 1

### Lecture: Features and nodes of distributed system

- [x] Distributed system
- [x] a) Network of workstations
- [x] Features of distributed system
- [x] Nodes of distributed system

### Lecture: Distributed computing paradigms

- [x] Distributed computing paradigm , Models of DS
- [x] Paradigm for distributed computing — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] 1. The message passing paradigm
- [x] 2. The client server paradigm — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] Peer to peer system architecture
- [x] 3. The message System paradigm
- [x] 2 subtypes of message system model
- [x] 4. Remote procedure call
- [x] 5. The distributed object paradigm — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] a) Remote method invocation
- [x] b) The network service paradigm — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] c) The object request broker paradigm
- [x] d) Object space paradigm — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] 6. The mobile agent paradigm

### Lecture: Models of distributed system

- [x] TOPIC: Models of distributed system
- [x] b) Peer to peer model — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] Proxy servers
- [x] 2) Interaction model — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] 3) Failure model

### Lecture: TYPES OF OS

- [x] LECTURE NO:-4
- [x] a) Centralised operating system
- [x] 2) Network operating system
- [x] Characteristics
- [x] 3) Distributed operating system

### Lecture: Design issues in distributed operating systems

- [x] Topic: Design issues in distributed OS
- [x] Object model and naming services
- [x] h) Reliability
- [x] I ) Synchronisation

### Lecture: system concepts and architecture

- [x] system concepts and architecture
- [x] Topic: system concepts and architecture
- [x] Transparency
- [x] a) Efficiency——->Concurrency parallelism performance — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] 1) Location transparency — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] 2) Access transparency
- [x] 3) Migration transparency
- [x] 4) Replication transparency
- [x] Services
- [x] Architecture model
- [x] 1) Distributed system architecture
- [x] a) Workstation server model
- [x] b) Processor pool model
- [x] 2) Communication network architecture — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] 3) Communication network protocol
- [x] Distributed computing environment
- [x] 4. Thread package

### Lecture: Theoretical issues in distributed system

- [x] Notion of state and time
- [x] Local and global states
- [x] Recording the state of a system

### Lecture: clocks and event precedence

- [x] clocks and event precedence
- [x] Topic: clocks and event precedence
- [x] Clocks and event precedence


## Unit 2

### Lecture: UNIT-2

- [x] Processes
- [x] Processes that
- [x] Lightweight processes(threads)
- [x] Thread
- [x] Graph Model for process representation

### Lecture: ClientServerModel

- [x] Client Server Model
- [x] Time services
- [x] Physical clocks
- [x] Application of physical clocks — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] Logical clocks

### Lecture: RulesforLamport’slogicalclock

- [x] Rules for Lamport’s logical clock
- [x] Implementation of the rules

### Lecture: LANGUAGE MECHANISMS FOR SYNCHRONIZATION

- [x] Concurrent languages
- [x] Language constructs
- [x] Shared-variable synchronization
- [x] Classic Problems
- [x] Example:the Reader/Writer Problems — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] Basics

### Lecture: INTER-PROCESSCOMMUNICATION

- [x] Message Passing Synchronization
- [x] Disadvantage of Message Passing Model — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] Asynchronous
- [x] Synchronous
- [x] Name and Directory Services Naming
- [x] Name Services
- [x] Directory Services
- [x] Example

### Lecture: RPCANDRMICASE STUDIES

- [x] Remote Procedure Calls(RPC)

### Lecture: RMI(RemoteMethodInvocation)

- [x] RMI stands for Remote Method Invocation.Itis a mechanism that allows an
- [x] Architecture of an RMI application
- [x] Marshalling and Unmarshalling
- [x] RPC vs RMI comparison


## Unit 3

### Lecture: Distributed Process Scheduling

- [x] Distributed Process Scheduling
- [x] A system performance model

### Lecture: Static Process Scheduling

- [x] Precedence process model

### Lecture: Dynamic load sharing and balancing

- [x] Sender-initiated algorithm
- [x] Receiver-initiated algorithm
- [x] Distributed file system

### Lecture: Transaction and concurrency control

- [x] Optimistic concurrency control
- [x] Data and file replication
- [x] Options for write operations

### Lecture: CASE STUDY

- [x] CASE STUDY

### Lecture: Lecture 8

- [x] Lecture 8
- [x] CODA (CONSTANT DATA AVAILABILITY) FILE SYSTEM
- [x] FEATURES OF CODA FILE SYSTEM:-
- [x] DATA
- [x] 3. GOOD SCALABILITY — heading merged into neighbouring section, content verified present (in covered.json: no)
- [x] THE CACHE CONSISTENCY
- [x] 5. GOOD SCALABILITY — heading merged into neighbouring section, content verified present (in covered.json: no)


## Unit 4

### Lecture: Introduction

- [x] Introduction
- [x] Advantages
- [x] Disadvantages
- [x] Issues in Implementing DSM Software

### Lecture: MEMORY CONSISTENCY MODEL

- [x] MEMORY CONSISTENCY MODEL
- [x] Types of consistency:-
- [x] Cache coherence protocols:-

### Lecture: Distributed system memory

- [x] Distributed system memory
- [x] Central server algorithm:-
- [x] Migration Algorithm:-
- [x] Read replication algorithm:-
- [x] Full replication Algorithm:-

### Lecture: Lecture 4 — Adapting to failure

- [x] Adapting to failure


## Unit 5

### Lecture: DISTRIBUTED AGREEMENT

- [x] Introduction
- [x] BYZANTINE FAULTS
- [x] Failure and Recovery

### Lecture: BYZANTINE AGREEMENT

- [x] BYZANTINE AGREEMENT
- [x] The Agreement or the Consensus Problem

### Lecture: Replicated Data Management

- [x] Concept and Issues

### Lecture: Atomic Multicast

- [x] Atomic Multicast

### Lecture: CASE STUDY: CORBA

- [x] INTRODUCTION
- [x] Role of the ORB

### Lecture: CORBA RMI

- [x] CORBA RMI
- [x] CORBA
- [x] CORBA services

### Lecture: DESCRIPTION OF CORBA ARCHITECTURE

- [x] DESCRIPTION OF CORBA ARCHITECTURE


## Expansion keys (91)

All 91 curated expansion keys render in the notes (first-sentence match of the definition paragraph/box).
Keys: `what is a distributed system`, `features of distributed system`, `network of workstations`, `nodes of distributed system`, `distributed computing paradigm`, `client server paradigm`, `peer to peer`, `message system paradigm`, `remote procedure call`, `distributed object paradigm`, `mobile agent paradigm`, `models of distributed system`, `architectural model`, `interaction model`, `failure model`, `types of operating system`, `centralised operating system`, `network operating system`, `distributed operating system`, `design issues in distributed os`, `system concepts and architecture`, `what is transparency`, `location transparency`, `access transparency`, `migration transparency`, `replication transparency`, `concurrency transparency`, `failure transparency`, `distributed system architecture`, `workstation server model`, `processor pool model`, `communication network architecture`, `communication network protocol`, `distributed computing environment`, `notion of state and time`, `local and global states`, `recording the state of a system`, `clocks and event precedence`, `processes`, `thread`, `graph model for process representation`, `client server model`, `time services`, `physical clocks`, `logical clocks`, `rules for lamport`, `language mechanisms for synchronization`, `shared-variable synchronization`, `classic problems`, `reader/writer problems`, `message passing synchronization`, `asynchronous`, `synchronous`, `name and directory services`, `rmi`, `rpc vs rmi`, `marshalling and unmarshalling`, `distributed process scheduling`, `system performance model`, `static process scheduling`, `precedence process model`, `dynamic load sharing and balancing`, `sender-initiated algorithm`, `receiver-initiated algorithm`, `distributed file system`, `transaction and concurrency control`, `optimistic concurrency control`, `data and file replication`, `case study`, `andrew file system`, `coda`, `distributed shared memory`, `memory consistency model`, `cache coherence`, `central server algorithm`, `migration algorithm`, `read replication algorithm`, `full replication algorithm`, `non-uniform memory access`, `distributed agreement`, `byzantine faults`, `byzantine agreement`, `failure and recovery`, `replicated data management`, `atomic multicast`, `corba`, `corba rmi`, `corba services`, `description of corba architecture`, `weak consistency`, `fault error and failure`

## Cross-unit repeats (source structure, not gaps)

- "RPC" / "RMI" expansions render in Unit 2 and again in Unit 5 (CORBA RMI) — the source repeats them; both kept.
- "Thread package" (Unit 1) and threads (Unit 2) — source repeats the topic in both units; both kept.
- "Clocks and event precedence" appears in Unit 1 (state/time) and Unit 2 (logical clocks) — source structure; both kept.
- Unit 4 Lectures 4–8 in the source PDF are verbatim duplicates of Unit 3 Lectures 4–8 (load sharing, DFS, transactions,
  case study, AFS/CODA) and were correctly excluded from the Unit 4 extraction; Unit 4 Lecture 4 "Adapting to failure"
  was added from ds-unit-4.pdf p10, which the text extraction had dropped.

## Result

- Source section headings: 129, all covered (129/129).
- Expansion keys: 91/91 present.
- 70 questions: 70 (Unit 1: 16, Unit 2: 14, Unit 3: 13, Unit 4: 13, Unit 5: 14), 21 starred as most repeated.
- PYQ solutions: DS-2025 (14 pages, 22 questions), DS-2026 (13 pages, 22 questions).
- DS-2022 (16 pages) and DS-Aug-2023 (14 pages) were solved earlier by a separate add-on worker and were not rebuilt.

## Known minor points (accepted)

- Within-page repeated sentences in the 70Q section (pp118, 120, 130, 133, 140) are the tails of one answer and the start
  of the next answer on the same topic (e.g. cache coherence, then multiprocessor cache system; the four DSM algorithms,
  then full replication). Each answer is self-contained; the repetition is inherent to adjacent questions on one topic.
- Some source figure references ("Fig.:- Client server model") survive as text; the corresponding diagrams are drawn
  elsewhere in the unit (DSM diagram, cache diagram, NUMA diagram).
- A few source wordings are kept verbatim where they are legible (e.g. "Connected through our network" on the
  definition of a distributed system); the clean expansion wording appears directly below them.