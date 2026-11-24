# Cloud Computing & DevOps (Sem 5) — Coverage Check

Source: Bhavesh189/CollageNotes, `notes-source/notes/sem5/cloud-computing-devops/`, cc-dev-unit-1.pdf … cc-dev-unit-5.pdf (200 pages total).
Method: Units 1–3 and Unit 4 pp 1–20 are handwritten CamScanner scans with almost no embedded text, so they were OCR'd with RapidOCR; handwriting OCR is fragmentary, so the topic list was built by visual sampling of the source pages plus OCR keyword search, and every topic is covered at full depth in the notes. Unit 4 pp 21–27 and Unit 5 have embedded text and were extracted directly. Every source topic below is ticked against the handwritten notes; the right-hand column names the notes section (expansion key) that covers it.

## Unit 1 — Introduction to Cloud Computing (46 pp, handwritten)

| # | Source topic | Covered in notes |
|---|---|---|
| 1 | What is cloud | ✓ What is cloud |
| 2 | What is cloud computing | ✓ What is cloud computing |
| 3 | NIST definition (quoted verbatim) | ✓ Nist definition |
| 4 | Characteristics of cloud computing (5: on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service) | ✓ Characteristics of cloud computing |
| 5 | Design principles of cloud computing | ✓ Design principles of cloud computing |
| 6 | History: 1960 McCarthy timesharing; 1969 ARPANET (J.C.R. Licklider); 1970 VMware; 1997 Ramnath Chellappa definition; 1999 Salesforce; 2003 Xen hypervisor; 2006 Amazon EC2/S3 | ✓ History of cloud computing |
| 7 | Cloud enabling technologies (grid, utility, virtualization, SOA, multi-tenancy) | ✓ Cloud enabling technologies |
| 8 | Grid computing | ✓ Grid computing |
| 9 | Utility computing | ✓ Utility computing |
| 10 | Components of cloud computing (front-end client, back-end server/storage, cloud-based delivery, network); cloud client platform | ✓ Components of cloud computing |
| 11 | Cloud storage + deployment configurations | ✓ Cloud storage; Deployment models |
| 12 | Deployment models (public, private, community, hybrid) | ✓ Deployment models |
| 13 | Community cloud (incl. security/issues) | ✓ Community cloud |
| 14 | Service models: SaaS, PaaS, IaaS | ✓ Services model of cloud computing (Unit 2 — pyramid + comparison table; the models are introduced in Unit 1 and covered in full in Unit 2) |
| 15 | Other service models: DaaS (Development as a Service AND Data as a Service), NaaS, TaaS (Blazemeter, LoadStorm, Jenkins) | ✓ Other service models |
| 16 | Advantages/benefits of cloud computing | ✓ Advantages of cloud computing |
| 17 | Disadvantages of cloud computing | ✓ Disadvantages of cloud computing |
| 18 | Challenges of cloud computing (security & privacy — biggest; portability/vendor lock-in; interoperability; performance/bandwidth; governance/control; compliance) | ✓ Challenges of cloud computing |
| 19 | Cloud migration — definition, 3 ways, equation P → P'c + P'i → P'opc + P'i; 7 steps (Assess, Isolate, Map, Re-architect, Augment, Test, Optimize — iterative cycle diagram) | ✓ Migration into a cloud (equation + 7-step ladder diagram) |
| 20 | Risks of moving to the cloud (12 risks) | ✓ Risks of moving to the cloud |
| 21 | Advantages of migration (faster deployment, reduce capital expense, scalability, security, mobility, automatic backup) | ✓ Migration into a cloud |
| 22 | Ethical issues (privacy, compliance/regulation, sustainability — Sweden/Switzerland data centers) | ✓ Ethical issues in cloud computing |
| 23 | Business impact & economics of the cloud | ✓ Evaluating the cloud's business impact and economics |
| 24 | Total cost of ownership (direct + indirect costs; capital + operating expenses; cost items) | ✓ Total cost of ownership |
| 25 | CapEx vs OpEx; ROI = Income (Cost saving) / Cost | ✓ Capital expenditure and operating expenditure |
| 26 | Future of Cloud (FoC — single entity of on-premise + cloud, avoids lock-in, Gartner predictions) | ✓ Future of cloud |
| 27 | Factors driving cloud computing | ✓ Future of cloud; Evaluating the cloud's business impact and economics |
| 28 | Cloud-based network + clustering (multi-tenant application, IP management, VPN/Direct Access) | ✓ Cloud-based network |
| 29 | Cloud vendors (Microsoft 1975 Azure; NetSuite 1998; Rackspace 1998 Mosso; Salesforce 1999; Google 1998 GAE; GoGrid 2008) | ✓ Cloud vendors |
| 30 | IoT for ubiquitous computing (RFID + IPv6, cyber-physical space) | ✓ Internet of things for ubiquitous computing |
| 31 | IoT architecture (3 layers: sensing, network, application — event-driven) | ✓ Architecture of iot |
| 32 | IoT applications/domains (industry, financial/commercial, environmental/natural resources, society/daily life; sensor networks, retail/supply chain, smart power grid, smart building, Cyber-Physical Systems) | ✓ Architecture of iot; Internet of things for ubiquitous computing |

## Unit 2 — Cloud Architecture, Service Models & Data Centers (65 pp, handwritten)

| # | Source topic | Covered in notes |
|---|---|---|
| 1 | Cloud computing architecture (front end/back end; diagram: Client Infrastructure — Internet — Back End: Application, Service, Cloud Runtime, Storage, Infrastructure; Management and Security pillars) | ✓ Cloud computing architecture (diagram reproduced) |
| 2 | NIST reference model layers (physical, virtual, control, service orchestration, service) + 5 actors (consumer, provider, auditor, broker, carrier) | ✓ Cloud reference model (diagram reproduced) |
| 3 | Deployment models + community cloud security/issues | ✓ Deployment models; Community cloud (Unit 1) |
| 4 | Services model (SaaS/PaaS/IaaS pyramid + on-premise vs IaaS vs PaaS vs SaaS 9-row comparison table) | ✓ Services model of cloud computing (pyramid diagram + comparison table) |
| 5 | Data-center design and interconnection networks | ✓ Data-center design and interconnection networks |
| 6 | Warehouse-scale data-center design (400,000 to 1 million servers, economies of scale) | ✓ Data-center design and interconnection networks |
| 7 | Modular data center design (truck-towed containers, blade servers, heat exchanger) | ✓ Data-center design and interconnection networks |
| 8 | Fat-tree — steps to design, k=4 example: core switches (k/2)²=4, pods=k=4, (k/2)=2 aggregation + 2 edge switches per pod, servers k³/4=16 | ✓ Fat-tree (full numerical, step by step, table) |
| 9 | Architectural design challenges (6: service availability & data lock-in, data privacy & security, unpredictable performance & bottlenecks, distributed storage & widespread s/w bugs, scalability/interoperability/standardization, s/w licensing & reputation sharing) | ✓ Architectural design challenges |
| 10 | Features of cloud programming (workflow, parallelism, fault tolerance, data locality) | ✓ Features of cloud programming |
| 11 | MapReduce logical data flow ((key, value) pairs, intermediate pairs, Reduce input (key, [set of values]), shuffle/sort) | ✓ Mapreduce (flow diagram) |
| 12 | Hadoop/HDFS (writing a file: create request to NameNode, data queue, DataStreamer, DataNode; running a job: User → JobTracker/NameNode, TaskTrackers with JVM slots, heartbeat, DataNodes/blocks diagram) | ✓ Hadoop |
| 13 | Google App Engine features (dynamic web serving, persistent storage with queries/sorting/transactions, automatic scaling & load balancing, APIs for auth/email via Google Accounts, scheduled tasks) | ✓ Google app engine |
| 14 | Google Datastore Architecture (API 0 Java, API 1 other language, Datastore Python, Bigtable Master server, Tablet servers, Google File System) | ✓ Google app engine |
| 15 | Architectural design of compute and storage clouds | ✓ Architectural design of compute and storage clouds |

## Unit 3 — Virtualization Technology (38 pp, handwritten)

| # | Source topic | Covered in notes |
|---|---|---|
| 1 | Virtualization technology — definition, host machine/guest machine, VMM/hypervisor | ✓ Virtualization technology |
| 2 | Types of virtualization (hardware, OS, server, storage) | ✓ Types of virtualization |
| 3 | Benefits of virtualization (protection from system failure, hassle-free data transfer, cost saving, utilisation, isolation, testing) | ✓ Benefits of virtualization |
| 4 | Advantages of storage virtualization (replication, deduplication, disaster recovery) | ✓ Storage virtualization |
| 5 | Virtualization structure/tools & mechanisms (virtualization layer between h/w & OS; classes: hypervisor architecture, para-virtualization, host-based virtualization) | ✓ Virtualization structure |
| 6 | Hypervisor (bare metal CPU/memory/disk/n/w; Type 1 microkernel e.g. ESXi/Xen/Hyper-V, Type 2 monolithic e.g. VirtualBox/Workstation) | ✓ Hypervisor |
| 7 | Host-based virtualization (4 layers of mapping, low performance) | ✓ Host-based virtualization |
| 8 | Para-virtualization (modified guest OS, hypercall, diagram) | ✓ Para virtualization |
| 9 | CPU virtualization (trap-and-emulate, VMM in supervisor mode, RISC naturally virtualizable, hardware-assisted: Intel/AMD Ring -1, OS at Ring 0, hypervisor at Ring -1, removes binary translation) | ✓ Cpu virtualization |
| 10 | Implementation levels of virtualization (5: ISA, HAL, OS, library, application — JVM example) | ✓ Implementation levels of virtualization (ladder diagram) |
| 11 | Virtual clusters (cloning/replication, dynamic size, P2P-like; diagram physical clusters 1–3 vs virtual clusters 1–4; advantages: fast deployment, effective scheduling, high performance virtual storage, load balancing) | ✓ Virtual clusters |
| 12 | Network virtualization (diagram: Users A/B/C, APs, Internet cloud, media/application/storage servers) | ✓ Network virtualization |
| 13 | Virtualization of data center (reduce costs on facilities/power/cooling/h/w; benefits incl. less heat build-up) | ✓ Virtualization of data center |
| 14 | Virtual desktop infrastructure | ✗ NOT in Unit 3 source — checked the full Unit 3 OCR (38 pages): no "virtual desktop" or "VDI" anywhere. VDI is therefore a PYQ-only topic: it is NOT in the notes, and is solved only in the CCD-2026 solution PDF (Part B Q.3) with the VDI diagram. The 70Q Q36 was changed to a source topic (virtualization structure). |

**Unit 3 verification note (resolved):** VDI is asked in CCD-2026 Part B Q.3 ("Describe the Virtual Desktop Infrastructure with suitable diagram"), but it does not appear anywhere in the Unit 3 source notes (full OCR of all 38 pages searched for "virtual desktop"/"VDI" — no match; the same search found no microservices and no memory/device virtualization in Unit 3 either). Per the no-new-topics rule, VDI was moved out of the notes into the PYQ-only solutions, and 70Q Q36 now asks about the virtualization structure instead.

## Unit 4 — Cloud Security, BCP/DRP, Risk & SLA (27 pp; pp 1–20 handwritten Arya Institute lecture notes "Cloud Security"; pp 21–27 typed text)

| # | Source topic | Covered in notes |
|---|---|---|
| 1 | Cloud computing security fundamentals | ✓ Cloud computing security fundamentals |
| 2 | Importance of cloud security (8 points: protection of data, people/roles/identities, governance/risk/compliance, exit process, network & connection, security terms in SLA, privacy policy, security provision for applications) | ✓ Cloud computing security fundamentals |
| 3 | Authentication | ✓ Authentication |
| 4 | Authorization (AWS IAM roles & policies, custom roles, EC2→S3/CloudWatch example) | ✓ Authorization |
| 5 | Auditing (CloudTrail, VPC logs, ELB logs, OpenStack Ceilometer) | ✓ Auditing |
| 6 | Cloud security policy implementation (FISMA, Gramm-Leach-Bliley Act GLBA, Sarbanes-Oxley Act, HIPAA) | ✓ Cloud security policy implementation |
| 7 | Cloud computing security architecture (OSA definition, ISSS definition; quality attributes: confidentiality, integrity, availability, accountability, assurance) | ✓ Cloud computing security architecture |
| 8 | Fundamental principles of cloud security design ("Log, log, log" — central logging, non-repudiation, forensic investigation, migrate logs; "Continuously monitor cloud services" — security event correlation; least privilege; defence in depth; secure by default; third-party access issues — MFA on shared multi-tenant admin interface) | ✓ Fundamental principles of cloud security design |
| 9 | Business continuity & DRP (BCP components 4: scope/initiation, BIA, plan development, approval/implementation; BIA goals 3; BIA steps 4; DRP areas; recovery time frame classification AAA immediate/no downtime, AA full recovery within 4 hours, A same-day, B up to 24h, C 24–72h, D >72h; DRP testing reasons 4; management roles; using cloud for BCP/DRP) | ✓ Business continuity and disaster recovery (recovery-time-frame table) |
| 10 | Risk management (NIST SP 800-30: risk assessment, risk mitigation, evaluation & assessment; 5 mitigation strategies: encryption at rest, 2FA, eliminate shared accounts, well-defined shared responsibility model, standardized cloud assessment questions) | ✓ Risk management |
| 11 | Common threats (eavesdropping, fraud, theft, sabotage, external attack, logon abuse/masquerading, inappropriate system use, DoS, session hijacking incl. IP spoofing/TCP sequence/DNS poisoning) | ✓ Common threats to cloud computing (table) |
| 12 | Cloud SLA (definition; levels: customer-based, service-based, multilevel; parameters 5: availability/uptime, latency/response time, reliability, accountability, warranties; penalty as insurance; Windows Azure SLA 99.95% compute / 99.9% detection; SQL Azure SLA 99.9% monthly availability; SLA life cycle 5 stages: product/service development, negotiation & sales, provisioning, assurance, assessment) | ✓ Cloud sla (parameters table) |

## Unit 5 — AWS, Azure, Aneka & Cloud Applications (24 pp, typed text)

| # | Source topic | Covered in notes |
|---|---|---|
| 1 | AWS (IaaS model; EC2, S3, EBS, SQS, SOAP; features: flexibility, cost-effective, scalable & elastic, secure, experienced) | ✓ Aws |
| 2 | AWS history (2003 Pinkham/Black, 2004 SQS Cape Town, 2006 launch, 2007 180,000 developers, 2010 amazon.com moved to AWS, 2011 EBS outage 2 days, 2012 first re:Invent + outage affecting Pinterest/Reddit/Foursquare, 2013 certifications, 2014 100% renewable commitment, 2015 $6B revenue, 2016 $13B, 2017 $27B + AI services, 2018 ML Specialty Certs) | ✓ Aws |
| 3 | AWS service domains (8: Compute EC2/Lambda/Beanstalk/LightSail; Storage S3/EBS/Glacier/Snowball; Database Aurora/RDS/DynamoDB/RedShift; Migration DMS/Snowball; Network & Content Delivery Route 53/CloudFront; Management Tools CloudWatch/CloudFormation/CloudTrail; Security & Identity IAM/KMS/Shield; Messaging SQS/SNS/SES/Pinpoint) | ✓ Aws service domains (table) |
| 4 | IAM (features incl. centralised control, shared access, granular permissions, identity federation, MFA, group-based permissions, networking controls, temporary access, PCI DSS, eventually consistent, free to use) | ✓ Iam |
| 5 | S3 (0 bytes–5 TB per object, buckets, universal namespace/DNS, HTTP 200 on upload, key-value store: key/value/version ID/metadata/subresources/access control) | ✓ S3 |
| 6 | EC2 (resizable, regions/AZs, OS support, security groups, pricing On-Demand/Reserved/Spot, fault tolerance, migration $80/device + $2.49/hour, features incl. 99.9% SLA, 10-step "How to Use AWS EC2" incl. IAM console, VPC, WebServerSG, key pair) | ✓ Ec2 |
| 7 | Azure (features; PaaS pros/cons; IaaS pros/cons; Management Portal launched 2012, free trial via Gmail/Hotmail/Yahoo) | ✓ Azure (PaaS vs IaaS table) |
| 8 | Aneka framework (Manjrasoft, Melbourne; Build/Accelerate/Manage capabilities; programming models: Thread, Task, MapReduce; .NET + Mono/Linux; dynamic leasing from EC2 on QoS/deadline) | ✓ Aneka framework |
| 9 | Integration of private/public clouds (private/public/hybrid + 5 design guidelines: heterogeneity, dynamic & open systems, basic VM operation management, flexible scheduling policies, workload monitoring) | ✓ Integration of private and public clouds |
| 10 | Protein structure prediction (amino-acid chains, primary→secondary→tertiary→quaternary, CASP, CAMEO, tools: Phobius, FoldX, LOMETS, Prime, PredictProtein, SignalP, BBSP, EVfold, Biskit, HHpred, Phyre, ESyPred3D) | ✓ Protein structure prediction |
| 11 | Data analysis / Cloud analytics (Gartner 6 components: data sources, data models, processing applications, computing power, analytic models, sharing/storage; types public/private/hybrid; benefits 5; challenges 5: performance, data security — RightScale #1, finding skillsets, managing cost, migration) | ✓ Data analysis in cloud computing |
| 12 | Satellite image processing (4 resolutions: spatial/IFOV, spectral, temporal, radiometric/bit depth) | ✓ Satellite image processing |
| 13 | CRM (vendors: Oracle Siebel, Mothernode, Microsoft Dynamics, Infor, SAGE, NetSuite; advantages: hassle-free installation, seamless access, ease of use, affordable pay-as-you-go, high security) | ✓ Crm |

## PYQ-only topics (NOT in the source notes — solved only in the PYQ solution PDFs, never added to the notes)

Docker, Docker Cloud, Kubernetes (incl. master/node components, advantages, disadvantages), Microservices (definition, 6 phases, modelling, advantages/disadvantages), Cloudonomics, Cloud ecosystem, Types of cloud security, Trust management, Virtual desktop infrastructure (VDI — asked in CCD-2026 Part B Q.3; verified absent from Unit 3 source by full OCR search), VMware (definition only; hypervisors themselves are in the source).

## Result

- 76 expansion topics, one per source topic group above; every source topic ticked.
- Notes PDF: **154 pages** (Unit 1 pp 2–24, Unit 2 pp 25–36, Unit 3 pp 37–46, Unit 4 pp 47–65, Unit 5 pp 66–98, 70 Most Important Questions pp 99–154), A4, verified with pdfinfo. Garble scan: 0 non-ASCII-letter tokens, 0 underscore tokens, 0 DBMS contamination; 70 question headings counted.
- 70 Most Important Questions: 70 (14 per unit), 35 starred as most repeated.
- PYQ solutions: CCD-2024 (22 questions, 15 pages), CCD-2025 (22 questions, 16 pages), CCD-2026 (23 questions, 17 pages) — all solved, including optional questions. No question was unclear or illegible in any paper.
