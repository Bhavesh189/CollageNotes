# Computer Networks — Sem 5 — Coverage Check

**Date:** 2026-11-24
**Notes PDF:** `~/workspace/handwritten_notes/sem5/Computer-Networks-Sem5-Handwritten-Notes-Full.pdf` — **228 pages, A4**
**Sources:** `notes-source/notes/sem5/computer-networks/cn-unit-1.pdf` (44 pp) through `cn-unit-5.pdf` (22 pp) — 167 source pages total.
**Style:** approved final balanced style (Patrick Hand, blue ink, ~1.5 cm margins, unlined white A4).

## Page map (final build)

| Part | Pages | Pages |
|---|---|---|
| Title page | 1 | 1 |
| Unit 1 — Introduction to Computer Networks | 2–41 | 40 |
| Unit 2 — Data Link Layer | 42–73 | 32 |
| Unit 3 — Network Layer | 74–125 | 52 |
| Unit 4 — Transport Layer | 126–149 | 24 |
| Unit 5 — Application Layer | 150–175 | 26 |
| 70 Most Important Questions | 176–228 | 53 |

## Coverage result: 399 / 399 source headings covered

Every heading from the five source PDFs is in the notes (checked mechanically:
`covered.json` from the build vs all source headings, after heading cleaning).
Breakdown: Unit 1: 64, Unit 2: 66, Unit 3: 172, Unit 4: 40, Unit 5: 57.

- 397 headings render as their own section (source text + expansion where written).
- 2 headings were fragmentary and their content was merged into the previous
  section (build rule: sections under 25 words fold into the previous section):
  - U3 "Configuration – To configure a host means to provide network information (IP…" (truncated sentence fragment; content kept under the DHCP section).
  - U4 "Accept()" (one-word heading; content kept under the socket section).
- 1 source section was a truncated duplicate and was removed, not lost:
  U4 "Flow Control and Error Control" (198 words) repeated the start of the
  following section "Flow Control, Error Control and Congestion Control";
  its content is fully present in that section.

### Expansions written (169 keys, all matched to a heading)
Unit 1: ~35 (network, data flow, topologies, LAN/MAN/WAN, OSI layers, TCP/IP,
multiplexing, switching, transmission media). Unit 2: ~30 (errors, parity,
checksum with worked 4-bit example, CRC with worked example 100100/1101 → 001,
Hamming rule, framing, simplex/stop-and-wait, sliding window, HDLC, PPP, SLIP,
ALOHA, CSMA, CDMA, WLAN, bridges). Unit 3: ~25 (routing classification,
DVR with count-to-infinity, LSR with Dijkstra, hierarchical routing 720-router
numerical, broadcast/multicast, congestion, leaky/token bucket, QoS,
fragmentation 4000-byte/MTU-1500 worked example, IP, classful, CIDR, NAT,
ARP, DHCP DORA, ICMP). Unit 4: ~30 (transport services, flow/error/sequence/
loss/duplication control, multiplexing, addressing, TCP/UDP/SCTP, three-way
handshake, slow start, congestion avoidance/detection, AIMD, sockets).
Unit 5: ~30 (application layer, TELNET, SNMP, DNS hierarchy and resolution,
email, WWW, HTTP methods/status codes, FTP two connections/commands,
audio/video conferencing).

### 70 Most Important Questions — verified
70 questions, 14 per unit, marks 35×5, 31×10, 4×2. 17 starred (repeated in
2+ PYQ papers or twice in one paper). Every topic key verified to resolve to
at least one source section or expansion before building.

## PYQ-only topics — deliberately NOT in the notes (solutions only)
Per the no-new-topics rule, these appear only in the PYQ solution PDFs:
Hamming code, LRC/VRC, IPv4 header field-by-field, TCP header fields,
noiseless channel (Nyquist), default masks, Software Defined Networks,
Wireless Sensor Networks, IoT + Cyber-physical systems, streaming media
(RTP/RTCP, jitter buffer), DNS name-server management, AIMD fairness.

## Source garbles found and fixed (all re-verified)
- U2 "Ele men try DATA LINK PROTOCOLS" heading → "Elementary Data Link Protocols".
- U2 "T(FDM) = Frequency Division Multiplexing Time" heading → "Dynamic Channel Allocation".
- U2 "Balanced), LAPD (Link Access Procedure D-Channel), and LAPF (Link Access" heading → "Link Access Procedures — LAPB, LAPD and LAPF".
- U2 "Channel allocation problem can be solved by two schemes: Static Channel" heading → "Static and Dynamic Channel Allocation".
- U5 "TELNET: Telnet stands for Telecommunications Network. This protocol is used for" heading → "TELNET".
- U5 "Hyper-Text Transfer Protocol QUIC which is a transport layer network protocol" heading → "HTTP and QUIC".
- U2 "its value is reverted(from0to1or1to0)" → "(from 0 to 1 or 1 to 0)".
- U2 "The parity bit can beset to0and1depending…" → "The parity bit can be set to 0 or 1 depending…".
- U2 "corrupted an dis therefore rejected" → "corrupted and is therefore rejected".
- U1 "tW<D-way street" → "two-way street"; "Frequency Range:3KHz" → "Range: 3KHz" (etc.).
- U3 "maximum size of IP datagram = 216 – = 65, bytes" → "2^16 - 1 = 65,535 bytes".
- U4 "Mss receiver < Mss sender" → "Mss receiver is less than Mss sender" (bare `<` broke the PDF builder).
- U4 "ROHINI COLLEGE OF ENGINEERING AND TECHNOLOGY CS8591 COMPUTER NETWORKS" page-header watermark removed wherever it appeared; the 537-word duplicated/garbled "Flow Control, Error Control and Congestion Control" paragraph rewritten cleanly (consumer/producer roles, decapsulates, resend/resending) — standard Forouzan text, no new content.
- U5 "User agent app ends outgoing mails" → "User agent appends outgoing mails".
- ALOHA throughput line in source ("Throughput = G exp{-*G}") was garbled; expansions state the correct formulas (pure ALOHA max 18.4% at G=0.5, slotted 36.8% at G=1).

## Numericals verified in code before building
- CRC 100100 / 1101 → remainder 001, codeword 100100001 (remainder 000 on re-division).
- Checksum 4-bit example 1010, 1100, 1110, 0010 → sum 1000, checksum 0111, receiver sum 1111.
- Hamming (7,4) data 1011 → codeword 0110011; syndrome 101 points to bit 5.
- LRC example bytes 10110101, 01101010, 11001010 → LRC byte 00010101; receiver XOR 00000000.
- Subnet 255.255.240.0 → 12 host bits → 4094 hosts.
- CN-2025 C3 five-part host-ID numerical — all five network/broadcast/host-ID values verified (see solution PDF).
- Fragmentation 4000-byte packet, MTU 1500 → fragments 1480/1480/1020, offsets 0/185/370.
- Hierarchical routing 720-router example: 10+8+7 = 25 entries. T1: 193 bits × 8000 = 1.544 Mbps. Mesh n=5 → 10 links.

## QA performed
- Garble scan on all 4 output PDFs (long-word scan vs wordfreq + digit-in-word scan + known-fragment scan): clean — only real English/CN terms remain.
- Visual inspection of sample pages from every unit (pp 1, 5, 20, 45, 60, 80, 100, 130, 155, 180, 199, 200, 229) and every solution PDF (CN-2024 pp 1, 8, 15; CN-2025 pp 1, 9, 17; CN-2026 pp 1, 9, 10, 20): legible, approved style, tables and diagrams render (topology diagram, flow-vs-congestion table, SMTP/POP3/IMAP table).
- Two defects found in the first build and fixed before delivery: the garbled U4 flow-control blob (p200) and the thin Q.7 LAN/MAN/WAN answer (topic key changed to the three explicit LAN/MAN/WAN keys).

## PYQ solutions
- CN-2024 — 15 pages, 22/22 questions solved.
- CN-2025 — 17 pages, 22/22 questions solved.
- CN-2026 — 20 pages, 22/22 questions solved.
- Flags: CN-2026 Part C Q.4 prints "additive AIMD algorithm" (reproduced as printed; AIMD = Additive Increase, Multiplicative Decrease). CN-2025 Part C Q.3 "host-ID" wording is ambiguous — answered as network address, broadcast address and host-ID (the IP with network bits zeroed) for each of the five parts.
