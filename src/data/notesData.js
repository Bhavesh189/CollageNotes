export const semestersData = {
  sem1: {
    id: 'sem1',
    name: 'Semester 1',
    subjects: [
      {
        id: 'computer',
        name: 'Computer',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Fundamentals of Computer & Number Systems', file: '/notes/sem1/computer/CFP-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — C Language Basics & Formatted Input-Output', file: '/notes/sem1/computer/CFP-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Control Statements & Loops', file: '/notes/sem1/computer/CFP-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Arrays, Pointers & Structures', file: '/notes/sem1/computer/CFP-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Functions, Strings & Files', file: '/notes/sem1/computer/CFP-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/computer/CFP-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        image: '/subjects/chemistry.jpg',
        colorClass: 'color-chemistry',
        notes: [
                    { title: 'Unit 1 — Water', file: '/notes/sem1/chemistry/Chemistry-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Organic Fuels', file: '/notes/sem1/chemistry/Chemistry-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Corrosion', file: '/notes/sem1/chemistry/Chemistry-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Engineering Materials', file: '/notes/sem1/chemistry/Chemistry-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Green Chemistry', file: '/notes/sem1/chemistry/Chemistry-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/chemistry/Chemistry-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'maths',
        name: 'Maths',
        image: '/subjects/maths.jpg',
        colorClass: 'color-maths',
        notes: [
                    { title: 'Unit 1 — Differential Calculus-I: Asymptotes, Curvature, Concavity and Curve Tracing', file: '/notes/sem1/maths/Maths-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Differential Calculus-II: Partial Differentiation, Euler\'s Theorem, Maxima and Minima', file: '/notes/sem1/maths/Maths-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Differential Equations-I: First Order Equations and Constant-Coefficient Equations', file: '/notes/sem1/maths/Maths-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Differential Equations-II: Second Order Equations with Variable Coefficients', file: '/notes/sem1/maths/Maths-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Partial Differential Equations: Lagrange\'s Form, Standard Forms and Charpit\'s Method', file: '/notes/sem1/maths/Maths-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/maths/Maths-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'bee',
        name: 'BEE',
        image: '/subjects/bee.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — DC Circuits', file: '/notes/sem1/bee/BEE-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — AC Circuits', file: '/notes/sem1/bee/BEE-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Transformer and Electrical Machines', file: '/notes/sem1/bee/BEE-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Basic Electronic Devices', file: '/notes/sem1/bee/BEE-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Communication System', file: '/notes/sem1/bee/BEE-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/bee/BEE-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mefa',
        name: 'MEFA',
        image: '/subjects/mefa.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction to Managerial Economics', file: '/notes/sem1/mefa/MEFA-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Demand Analysis, Elasticity and Forecasting', file: '/notes/sem1/mefa/MEFA-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Production, Cost and Break-Even Analysis', file: '/notes/sem1/mefa/MEFA-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Market Structures and Price Determination', file: '/notes/sem1/mefa/MEFA-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Business Organisations, Business Cycles and Financial Accounting', file: '/notes/sem1/mefa/MEFA-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/mefa/MEFA-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'practical',
        name: 'Practical',
        image: '/subjects/practical.jpg',
        colorClass: 'color-practical',
        secured: true,
        notes: [
          {
            title: 'Computer Fundamentals Practicals',
            subnotes: [
              { title: '1. Normal Pdf Sir wala', file: '/notes/sem1/practical/c.pdf' },
              { title: '2. Handwritten', file: '/notes/sem1/practical/ch1.pdf' }
            ]
          },
          {
            title: 'Chemistry Practicals',
            subnotes: [
              { title: '1. Experiment 1 to 4 in Normal Handwritten', file: '/chemq.pdf.docx' },
              { title: '2. Alternate File (Communication File)', file: '/notes/sem1/practical/chamq.pdf' }
            ]
          },
          {
            title: 'Communication Practicals',
            subnotes: [
              { title: '1. FULL FILE Normal Handwritten', file: '/notes/sem1/practical/commu.pdf' },
              { title: '2. Communication File', file: '/notes/sem1/practical/chamq.pdf' }
            ]
          },
          {
            title: 'BEE Practicals',
            subnotes: [
              { title: '1. BEE file', file: '/notes/sem1/practical/beep.pdf' },
              { title: '2. Practical 1 to 4 Handwritten', file: '/beep.pdf.docx' }
            ]
          }
        ]
      },
      {
        id: 'midsem',
        name: 'Mid-Sem',
        image: '/subjects/midsem.jpg',
        colorClass: 'color-midsem',
        notes: [
          { title: '1. 1st Mid Term 2025–26', file: '/notes/sem1/midsem/1midsemp.pdf' },
          { title: '2. 2nd Mid Term 2025–26', file: '/notes/sem1/midsem/smid.pdf' },
          { title: '3. Pre-University-Exam 2025–26', file: '/notes/sem1/midsem/All.pdf' }
        ]
      },
      {
        id: 'bce',
        name: 'Basic Civil Engineering',
        image: '/subjects/built_env.jpg',
        colorClass: 'color-built_env',
        notes: [
                    { title: 'Unit 1 — Civil Engineering and Society', file: '/notes/sem1/basic-civil-engineering/BCE-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Surveying', file: '/notes/sem1/basic-civil-engineering/BCE-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Building Construction', file: '/notes/sem1/basic-civil-engineering/BCE-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Transportation Engineering', file: '/notes/sem1/basic-civil-engineering/BCE-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Environment, Water and Waste', file: '/notes/sem1/basic-civil-engineering/BCE-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/basic-civil-engineering/BCE-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'bme',
        name: 'Basic Mechanical Engineering',
        image: '/subjects/mech_eng.jpg',
        colorClass: 'color-mech_eng',
        notes: [
                    { title: 'Unit 1 — Thermal Engineering Fundamentals', file: '/notes/sem1/basic-mechanical-engineering/BME-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Internal Combustion Engines', file: '/notes/sem1/basic-mechanical-engineering/BME-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Refrigeration, Air Conditioning and Psychrometrics', file: '/notes/sem1/basic-mechanical-engineering/BME-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Engineering Materials and Manufacturing Processes', file: '/notes/sem1/basic-mechanical-engineering/BME-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Power Transmission and Fluid Machines', file: '/notes/sem1/basic-mechanical-engineering/BME-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/basic-mechanical-engineering/BME-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'csk',
        name: 'Communication Skills',
        image: '/subjects/comm_skills.jpg',
        colorClass: 'color-comm_skills',
        notes: [
                    { title: 'Unit 1 — Communication Skills I (Speaking)', file: '/notes/sem1/communication-skills/CSK-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Communication Skills II (Listening and Reading)', file: '/notes/sem1/communication-skills/CSK-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Communication Skills III (Writing)', file: '/notes/sem1/communication-skills/CSK-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Essentials of Grammar', file: '/notes/sem1/communication-skills/CSK-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Communication through Poems and Short Stories', file: '/notes/sem1/communication-skills/CSK-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/communication-skills/CSK-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'eme',
        name: 'Elements of Mechanical Engineering',
        image: '/subjects/mech_eng.jpg',
        colorClass: 'color-mech_eng',
        notes: [
                    { title: 'Unit 1 — Thermodynamics: Systems, Properties and Laws', file: '/notes/sem1/elements-of-mechanical-engineering/EME-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Vapour Power Cycles, Refrigeration and Air Conditioning', file: '/notes/sem1/elements-of-mechanical-engineering/EME-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Gas Power Cycles and I.C. Engines', file: '/notes/sem1/elements-of-mechanical-engineering/EME-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Engineering Materials and Manufacturing Processes', file: '/notes/sem1/elements-of-mechanical-engineering/EME-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Belt, Rope and Chain Drives, Gears and Gear Trains', file: '/notes/sem1/elements-of-mechanical-engineering/EME-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/elements-of-mechanical-engineering/EME-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ep',
        name: 'Engineering Physics',
        image: '/subjects/physics.jpg',
        colorClass: 'color-physics',
        notes: [
                    { title: 'Unit 1 — Wave Optics', file: '/notes/sem1/engineering-physics/EP-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Lasers and Optical Fibres', file: '/notes/sem1/engineering-physics/EP-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Quantum Mechanics', file: '/notes/sem1/engineering-physics/EP-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Physics of Advanced Materials', file: '/notes/sem1/engineering-physics/EP-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Introduction to Electromagnetism', file: '/notes/sem1/engineering-physics/EP-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/engineering-physics/EP-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'hv',
        name: 'Human Values',
        image: '/subjects/human-interaction.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Value Education, Self-Exploration and Human Aspirations', file: '/notes/sem1/human-values/HV-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Harmony in the Human Being (Self and Body)', file: '/notes/sem1/human-values/HV-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Harmony in the Family and in Society', file: '/notes/sem1/human-values/HV-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Harmony in Nature and Existence', file: '/notes/sem1/human-values/HV-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Professional Ethics and Harmony in Practice', file: '/notes/sem1/human-values/HV-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/human-values/HV-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ibe',
        name: 'Introduction to Built Environment',
        image: '/subjects/built_env.jpg',
        colorClass: 'color-built_env',
        notes: [
                    { title: 'Unit 1 — Built Environment: Definition, Need and Elements', file: '/notes/sem1/introduction-to-built-environment/IBE-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Modern World Approach: IoT and the Smart Concept', file: '/notes/sem1/introduction-to-built-environment/IBE-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Engineering Divisions and Roles in Built Environment', file: '/notes/sem1/introduction-to-built-environment/IBE-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Historical Architecture and Modern Structural Design', file: '/notes/sem1/introduction-to-built-environment/IBE-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Building Physics, Ergonomics and Comfort', file: '/notes/sem1/introduction-to-built-environment/IBE-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/introduction-to-built-environment/IBE-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'pps',
        name: 'Programming for Problem Solving',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Fundamentals of Computer, Memory & Number Systems', file: '/notes/sem1/programming-for-problem-solving/PPS-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Problem Solving: Algorithms, Flowcharts & Languages', file: '/notes/sem1/programming-for-problem-solving/PPS-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — C Language Basics, Control Statements & Loops', file: '/notes/sem1/programming-for-problem-solving/PPS-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Arrays, Pointers & Structures', file: '/notes/sem1/programming-for-problem-solving/PPS-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Functions, Strings & Files', file: '/notes/sem1/programming-for-problem-solving/PPS-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/programming-for-problem-solving/PPS-Sem1-Important-Questions.pdf' },
        ]
      },
      {
        id: 'tc1',
        name: 'Technical Communication',
        image: '/subjects/tech_comm.jpg',
        colorClass: 'color-comm_skills',
        notes: [
                    { title: 'Unit 1 — Value Education and Self-Exploration', file: '/notes/sem1/technical-communication/TC-Sem1-Unit-1.pdf' },
          { title: 'Unit 2 — Harmony in the Human Being (the Self)', file: '/notes/sem1/technical-communication/TC-Sem1-Unit-2.pdf' },
          { title: 'Unit 3 — Harmony in the Family and Society', file: '/notes/sem1/technical-communication/TC-Sem1-Unit-3.pdf' },
          { title: 'Unit 4 — Harmony in Nature and Existence', file: '/notes/sem1/technical-communication/TC-Sem1-Unit-4.pdf' },
          { title: 'Unit 5 — Right Understanding, Relationship and Physical Facility', file: '/notes/sem1/technical-communication/TC-Sem1-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem1/technical-communication/TC-Sem1-Important-Questions.pdf' },
        ]
      },
    ]
  },
  sem2: {
    id: 'sem2',
    name: 'Semester 2',
    subjects: [
      {
        id: 'comm_skills',
        name: 'Communication Skills',
        image: '/subjects/comm_skills.jpg',
        colorClass: 'color-comm_skills',
        notes: [
                    { title: 'Unit 1 — Communication: Meaning, Process and Importance', file: '/notes/sem2/communication-skills/Communication-Skills-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Barriers, Listening and Assertiveness', file: '/notes/sem2/communication-skills/Communication-Skills-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Non-Verbal Communication and Reading', file: '/notes/sem2/communication-skills/Communication-Skills-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Writing Skills: Letters, Reports, Resume and Precis', file: '/notes/sem2/communication-skills/Communication-Skills-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — English Grammar and Literature', file: '/notes/sem2/communication-skills/Communication-Skills-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/communication-skills/Communication-Skills-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'built_env',
        name: 'Built Environment',
        image: '/subjects/built_env.jpg',
        colorClass: 'color-built_env',
        notes: [
                    { title: 'Unit 1 — Built Environment: Definition, Need & Elements', file: '/notes/sem2/introduction-to-build-enviroment/IBE-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Modern World Approach: IoT & the Smart Concept', file: '/notes/sem2/introduction-to-build-enviroment/IBE-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Engineering Divisions & Their Roles', file: '/notes/sem2/introduction-to-build-enviroment/IBE-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Building Planning, Bye-laws & Construction', file: '/notes/sem2/introduction-to-build-enviroment/IBE-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Building Physics: Thermal, Lighting & Acoustic Comfort', file: '/notes/sem2/introduction-to-build-enviroment/IBE-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/introduction-to-build-enviroment/IBE-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'physics',
        name: 'Physics',
        image: '/subjects/physics.jpg',
        colorClass: 'color-physics',
        notes: [
                    { title: 'Unit 1 — Wave Optics', file: '/notes/sem2/physics/Physics-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Quantum Mechanics', file: '/notes/sem2/physics/Physics-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Laser & Optical Fibre', file: '/notes/sem2/physics/Physics-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Semiconductors & Advanced Materials', file: '/notes/sem2/physics/Physics-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Intro to Electromagnetism', file: '/notes/sem2/physics/Physics-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/physics/Physics-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'maths2',
        name: 'Maths',
        image: '/subjects/maths2.jpg',
        colorClass: 'color-maths2',
        notes: [
                    { title: 'Unit 1 — Matrices', file: '/notes/sem2/engineering-mathematics-2/Engineering-Mathematics-2-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Coordinate Geometry of 3D', file: '/notes/sem2/engineering-mathematics-2/Engineering-Mathematics-2-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Solids of Revolution, Beta and Gamma Functions', file: '/notes/sem2/engineering-mathematics-2/Engineering-Mathematics-2-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Double Integrals', file: '/notes/sem2/engineering-mathematics-2/Engineering-Mathematics-2-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Vector Calculus', file: '/notes/sem2/engineering-mathematics-2/Engineering-Mathematics-2-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/engineering-mathematics-2/Engineering-Mathematics-2-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mech_eng',
        name: 'Mechanical Engineering',
        image: '/subjects/mech_eng.jpg',
        colorClass: 'color-mech_eng',
        notes: [
                    { title: 'Unit 1 — Thermodynamics: Systems, Properties and Laws', file: '/notes/sem2/element-of-mecnanical-engineering/EME-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Vapour Power Cycles, Refrigeration and Air Conditioning', file: '/notes/sem2/element-of-mecnanical-engineering/EME-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Gas Power Cycles and I.C. Engines', file: '/notes/sem2/element-of-mecnanical-engineering/EME-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Engineering Materials and Manufacturing Processes', file: '/notes/sem2/element-of-mecnanical-engineering/EME-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Belt, Rope and Chain Drives, Gears and Gear Trains', file: '/notes/sem2/element-of-mecnanical-engineering/EME-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/element-of-mecnanical-engineering/EME-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mefa2',
        name: 'Managerial Economics and Financial Accounting',
        image: '/subjects/mefa2.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction to Managerial Economics', file: '/notes/sem2/managerial-economics-and-financial-accounting/MEFA-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Demand, Elasticity, Forecasting & Supply', file: '/notes/sem2/managerial-economics-and-financial-accounting/MEFA-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Production, Costs & Break-Even Analysis', file: '/notes/sem2/managerial-economics-and-financial-accounting/MEFA-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Market Structures & Price Determination', file: '/notes/sem2/managerial-economics-and-financial-accounting/MEFA-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Business Organisation, Final Accounts & Ratio Analysis', file: '/notes/sem2/managerial-economics-and-financial-accounting/MEFA-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/managerial-economics-and-financial-accounting/MEFA-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'bee2',
        name: 'Basic Electrical Engineering',
        image: '/subjects/bee.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — DC Circuits', file: '/notes/sem2/basic-electrical-engineering/BEE-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — AC Circuits', file: '/notes/sem2/basic-electrical-engineering/BEE-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Transformer and Electrical Machines', file: '/notes/sem2/basic-electrical-engineering/BEE-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Basic Electronic Devices', file: '/notes/sem2/basic-electrical-engineering/BEE-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Communication System', file: '/notes/sem2/basic-electrical-engineering/BEE-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/basic-electrical-engineering/BEE-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'cfp',
        name: 'Computer Fundamentals & Programming',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Fundamentals of Computer & Number System', file: '/notes/sem2/computer-fundamentals-programming/CFP-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — C Language: Basics, Operators & Input-Output', file: '/notes/sem2/computer-fundamentals-programming/CFP-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Control Statements & Loops in C', file: '/notes/sem2/computer-fundamentals-programming/CFP-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Arrays, Pointers & Structures in C', file: '/notes/sem2/computer-fundamentals-programming/CFP-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Functions, Strings & Files in C', file: '/notes/sem2/computer-fundamentals-programming/CFP-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/computer-fundamentals-programming/CFP-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'eng_chem',
        name: 'Engineering Chemistry',
        image: '/subjects/chemistry.jpg',
        colorClass: 'color-chemistry',
        notes: [
                    { title: 'Unit 1 — Water', file: '/notes/sem2/engineering-chemistry/Engineering-Chemistry-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Organic Fuels', file: '/notes/sem2/engineering-chemistry/Engineering-Chemistry-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Corrosion', file: '/notes/sem2/engineering-chemistry/Engineering-Chemistry-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Engineering Materials', file: '/notes/sem2/engineering-chemistry/Engineering-Chemistry-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — Green Chemistry', file: '/notes/sem2/engineering-chemistry/Engineering-Chemistry-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/engineering-chemistry/Engineering-Chemistry-Sem2-Important-Questions.pdf' },
        ]
      },
      {
        id: 'python2',
        name: 'Python Programming',
        image: '/subjects/python_prog.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Python, Data Types and Operators', file: '/notes/sem2/python-programming/Python-Programming-Sem2-Unit-1.pdf' },
          { title: 'Unit 2 — Decision Making, Loops and Functions', file: '/notes/sem2/python-programming/Python-Programming-Sem2-Unit-2.pdf' },
          { title: 'Unit 3 — Lists, Tuples, Dictionaries and Sets', file: '/notes/sem2/python-programming/Python-Programming-Sem2-Unit-3.pdf' },
          { title: 'Unit 4 — Functions in Depth and File Handling', file: '/notes/sem2/python-programming/Python-Programming-Sem2-Unit-4.pdf' },
          { title: 'Unit 5 — NumPy, Sets and Data Visualization', file: '/notes/sem2/python-programming/Python-Programming-Sem2-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem2/python-programming/Python-Programming-Sem2-Important-Questions.pdf' },
        ]
      },
    ]
  },
  sem3: {
    id: 'sem3',
    name: 'Semester 3',
    subjects: [
      {
        id: 'adv_maths',
        name: 'Advanced Engineering Mathematics',
        image: '/subjects/adv_maths.jpg',
        colorClass: 'color-maths',
        notes: [
                    { title: 'Unit 1 — Random Variables, Expectation and Moments', file: '/notes/sem3/adv-engineering-mathematics/AEM-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Probability Distributions, Curve Fitting and Correlation', file: '/notes/sem3/adv-engineering-mathematics/AEM-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Optimization', file: '/notes/sem3/adv-engineering-mathematics/AEM-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Linear Programming, Transportation and Assignment', file: '/notes/sem3/adv-engineering-mathematics/AEM-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Numerical Methods', file: '/notes/sem3/adv-engineering-mathematics/AEM-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/adv-engineering-mathematics/AEM-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'digital_elec',
        name: 'Digital Electronics',
        image: '/subjects/digital_elec.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — Number System, Codes and Logic Gates', file: '/notes/sem3/digital-electronics/DE-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Logic Simplification and Minimization', file: '/notes/sem3/digital-electronics/DE-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Combinational Logic Circuits Design', file: '/notes/sem3/digital-electronics/DE-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Sequential Logic Circuits Design', file: '/notes/sem3/digital-electronics/DE-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Logic Families', file: '/notes/sem3/digital-electronics/DE-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/digital-electronics/DE-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'dsa',
        name: 'Data Structures and Algorithms',
        image: '/subjects/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Algorithms and Analysis', file: '/notes/sem3/data-structures-algorithms/DSA-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Linear Data Structures', file: '/notes/sem3/data-structures-algorithms/DSA-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Sorting and Search Techniques', file: '/notes/sem3/data-structures-algorithms/DSA-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Trees', file: '/notes/sem3/data-structures-algorithms/DSA-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Graphs and Hashing', file: '/notes/sem3/data-structures-algorithms/DSA-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/data-structures-algorithms/DSA-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'oop',
        name: 'Object Oriented Programming',
        image: '/subjects/oop.jpg',
        colorClass: 'color-mech_eng',
        notes: [
                    { title: 'Unit 1 — Introduction to Object Oriented Programming', file: '/notes/sem3/oop-using-c/OOP-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Polymorphism', file: '/notes/sem3/oop-using-c/OOP-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Operator Overloading & Exception Handling', file: '/notes/sem3/oop-using-c/OOP-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Memory Management', file: '/notes/sem3/oop-using-c/OOP-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Templates, STL, Iostreams, Namespaces & OOD', file: '/notes/sem3/oop-using-c/OOP-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/oop-using-c/OOP-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'software_eng',
        name: 'Software Engineering',
        image: '/subjects/software_eng.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction to Software Engineering & Life Cycle Models', file: '/notes/sem3/software-engineering/SE-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Software Project Management, Estimation & Risk', file: '/notes/sem3/software-engineering/SE-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Requirement Analysis & Modelling', file: '/notes/sem3/software-engineering/SE-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Software Design', file: '/notes/sem3/software-engineering/SE-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Object-Oriented Analysis, Design & UML', file: '/notes/sem3/software-engineering/SE-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/software-engineering/SE-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'linux_shell',
        name: 'Linux and Shell Programming',
        image: '/subjects/linux_shell.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Linux Operating System & Basic Commands', file: '/notes/sem3/linux-and-shell-programming/LSP-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Linux File System, System Calls & Users', file: '/notes/sem3/linux-and-shell-programming/LSP-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Shell, Redirection, Pipes, Filters & Processes', file: '/notes/sem3/linux-and-shell-programming/LSP-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Shell Programming: Variables, Operators & Control', file: '/notes/sem3/linux-and-shell-programming/LSP-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Compiling, Packages, Version Control & awk', file: '/notes/sem3/linux-and-shell-programming/LSP-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/linux-and-shell-programming/LSP-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'iai',
        name: 'Introduction to Artificial Intelligence',
        image: '/subjects/machine-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to AI and Intelligent Agents', file: '/notes/sem3/introduction-to-artificial-intelligence/IAI-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Problem Solving and Search', file: '/notes/sem3/introduction-to-artificial-intelligence/IAI-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Knowledge Representation and Reasoning', file: '/notes/sem3/introduction-to-artificial-intelligence/IAI-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Uncertainty and Fuzzy Logic', file: '/notes/sem3/introduction-to-artificial-intelligence/IAI-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Machine Learning', file: '/notes/sem3/introduction-to-artificial-intelligence/IAI-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/introduction-to-artificial-intelligence/IAI-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ics',
        name: 'Introduction to Cyber Security',
        image: '/subjects/information-security.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Cyber Security, Cyber Crime and Risk Assessment', file: '/notes/sem3/introduction-to-cyber-security/ICS-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Classical and Symmetric Cryptography: Ciphers, DES, AES and RC5', file: '/notes/sem3/introduction-to-cyber-security/ICS-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Public Key Cryptography and Hashing: Euclid, RSA, Diffie-Hellman, MD5 and SHA-1', file: '/notes/sem3/introduction-to-cyber-security/ICS-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Authentication, Web and Email Security: X.509, SSL, PGP, S/MIME and Replay', file: '/notes/sem3/introduction-to-cyber-security/ICS-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Network Security, Attacks and Malware: Firewall, IDS, Buffer Overflow, DoS and DDoS', file: '/notes/sem3/introduction-to-cyber-security/ICS-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/introduction-to-cyber-security/ICS-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ids',
        name: 'Introduction to Data Science',
        image: '/subjects/data-mining-warehousing.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Data Science & Big Data', file: '/notes/sem3/introduction-to-data-science/IDS-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Data Collection & the Data Analytics Lifecycle', file: '/notes/sem3/introduction-to-data-science/IDS-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Data Pre-processing & Statistics', file: '/notes/sem3/introduction-to-data-science/IDS-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Machine Learning Foundations', file: '/notes/sem3/introduction-to-data-science/IDS-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Dimensionality Reduction, Feature Selection & Evaluation', file: '/notes/sem3/introduction-to-data-science/IDS-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/introduction-to-data-science/IDS-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mefa3',
        name: 'Managerial Economics & Financial Accounting',
        image: '/subjects/mefa.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction to Managerial Economics', file: '/notes/sem3/managerial-economics-and-financial-accounting/MEFA-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Demand, Elasticity, Forecasting & Supply', file: '/notes/sem3/managerial-economics-and-financial-accounting/MEFA-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Production, Costs & Break-Even Analysis', file: '/notes/sem3/managerial-economics-and-financial-accounting/MEFA-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Market Structures & Price Determination', file: '/notes/sem3/managerial-economics-and-financial-accounting/MEFA-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Business Organisation, Final Accounts & Ratio Analysis', file: '/notes/sem3/managerial-economics-and-financial-accounting/MEFA-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/managerial-economics-and-financial-accounting/MEFA-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'pic',
        name: 'Principles of Imperative Computation',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Imperative Computation: Constants, Variables, Algorithms and Programs', file: '/notes/sem3/principles-of-imperative-computation/PIC-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Algorithms and Data Structures: Abstraction, Invariants and Classic Structures', file: '/notes/sem3/principles-of-imperative-computation/PIC-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Correctness and Complexity: Loop Invariants, Recursion and Performance', file: '/notes/sem3/principles-of-imperative-computation/PIC-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — The C Language: Structure, Features, Pointers and Behaviour', file: '/notes/sem3/principles-of-imperative-computation/PIC-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Memory, Modularity and Libraries: Building Large Programs', file: '/notes/sem3/principles-of-imperative-computation/PIC-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/principles-of-imperative-computation/PIC-Sem3-Important-Questions.pdf' },
        ]
      },
      {
        id: 'tc3',
        name: 'Technical Communication',
        image: '/subjects/tech_comm.jpg',
        colorClass: 'color-comm_skills',
        notes: [
                    { title: 'Unit 1 — Foundations of Technical Communication', file: '/notes/sem3/technical-communication/TC-Sem3-Unit-1.pdf' },
          { title: 'Unit 2 — Reading and Note-Making', file: '/notes/sem3/technical-communication/TC-Sem3-Unit-2.pdf' },
          { title: 'Unit 3 — Technical Writing and Style', file: '/notes/sem3/technical-communication/TC-Sem3-Unit-3.pdf' },
          { title: 'Unit 4 — Technical Reports and Project Proposals', file: '/notes/sem3/technical-communication/TC-Sem3-Unit-4.pdf' },
          { title: 'Unit 5 — Business Communication in Practice', file: '/notes/sem3/technical-communication/TC-Sem3-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem3/technical-communication/TC-Sem3-Important-Questions.pdf' },
        ]
      },
    ]
  },
  sem4: { id: 'sem4', name: 'Semester 4', subjects: [
      {
        id: 'discrete_maths',
        name: 'Discrete Mathematics',
        image: '/subjects/discrete_maths.jpg',
        colorClass: 'color-maths',
        notes: [
                    { title: 'Unit 1 — Propositional Logic, Proofs & Induction', file: '/notes/sem4/discrete-mathematics/Discrete-Mathematics-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Set Theory, Relations, Functions, Posets & Lattices', file: '/notes/sem4/discrete-mathematics/Discrete-Mathematics-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Combinatorics, Recurrence Relations & Generating Functions', file: '/notes/sem4/discrete-mathematics/Discrete-Mathematics-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Graph Theory & Trees', file: '/notes/sem4/discrete-mathematics/Discrete-Mathematics-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Algebraic Structures & Groups', file: '/notes/sem4/discrete-mathematics/Discrete-Mathematics-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/discrete-mathematics/Discrete-Mathematics-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mpi',
        name: 'Microprocessor and Interfaces',
        image: '/subjects/mpi.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — Introduction and Architecture of 8085', file: '/notes/sem4/microprocessor-and-interfaces/Microprocessor-and-Interfaces-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — 8085 Assembly Language Programming and Instruction Set', file: '/notes/sem4/microprocessor-and-interfaces/Microprocessor-and-Interfaces-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Interfacing with I/O Devices', file: '/notes/sem4/microprocessor-and-interfaces/Microprocessor-and-Interfaces-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Architecture of 8051', file: '/notes/sem4/microprocessor-and-interfaces/Microprocessor-and-Interfaces-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Programming and Application of 8051', file: '/notes/sem4/microprocessor-and-interfaces/Microprocessor-and-Interfaces-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/microprocessor-and-interfaces/Microprocessor-and-Interfaces-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'toc',
        name: 'Theory of Computation',
        image: '/subjects/toc.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Finite Automata and Regular Languages', file: '/notes/sem4/theory-of-computation/Theory-of-Computation-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Context-Free Grammars and Normal Forms', file: '/notes/sem4/theory-of-computation/Theory-of-Computation-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Pushdown Automata', file: '/notes/sem4/theory-of-computation/Theory-of-Computation-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Turing Machines', file: '/notes/sem4/theory-of-computation/Theory-of-Computation-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Decidability and Computational Complexity', file: '/notes/sem4/theory-of-computation/Theory-of-Computation-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/theory-of-computation/Theory-of-Computation-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'dbms',
        name: 'Database Management Systems',
        image: '/subjects/dbms.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to DBMS & ER Model', file: '/notes/sem4/database-management-systems/DBMS-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Relational Algebra, Calculus & SQL', file: '/notes/sem4/database-management-systems/DBMS-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Schema Refinement & Normalization', file: '/notes/sem4/database-management-systems/DBMS-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Transactions & Serializability', file: '/notes/sem4/database-management-systems/DBMS-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Concurrency Control, Deadlock & Recovery', file: '/notes/sem4/database-management-systems/DBMS-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/database-management-systems/DBMS-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'python_prog',
        name: 'Python Programming',
        image: '/subjects/python_prog.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Python Introduction, Data Types, Strings & Operators', file: '/notes/sem4/python-programming/Python-Programming-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Decision Making, Loops, Functions & Regular Expressions', file: '/notes/sem4/python-programming/Python-Programming-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Lists, Tuples, Dictionaries & Sets', file: '/notes/sem4/python-programming/Python-Programming-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Functions, Recursion, Lambda & File Handling', file: '/notes/sem4/python-programming/Python-Programming-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — NumPy: Arrays & Vectorised Computation', file: '/notes/sem4/python-programming/Python-Programming-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/python-programming/Python-Programming-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'java_prog',
        name: 'Java Programming',
        image: '/subjects/java_prog.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Java & OOP Principles', file: '/notes/sem4/java-programming/Java-Programming-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Classes, Methods & Constructors', file: '/notes/sem4/java-programming/Java-Programming-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Inheritance, Interfaces & Exception Handling', file: '/notes/sem4/java-programming/Java-Programming-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Multithreaded Programming', file: '/notes/sem4/java-programming/Java-Programming-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — I/O, Applets, Networking & JDBC', file: '/notes/sem4/java-programming/Java-Programming-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/java-programming/Java-Programming-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'coa4',
        name: 'Computer Organization and Architecture',
        image: '/subjects/computer-architecture.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — Register Transfer and Micro Operations', file: '/notes/sem4/computer-organization-and-architecture/Computer-Organization-and-Architecture-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Basic Computer Organization & Design', file: '/notes/sem4/computer-organization-and-architecture/Computer-Organization-and-Architecture-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Central Processing Unit', file: '/notes/sem4/computer-organization-and-architecture/Computer-Organization-and-Architecture-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Pipeline and Vector Processing & Computer Arithmetic', file: '/notes/sem4/computer-organization-and-architecture/Computer-Organization-and-Architecture-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Input-Output and Memory Organization', file: '/notes/sem4/computer-organization-and-architecture/Computer-Organization-and-Architecture-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/computer-organization-and-architecture/Computer-Organization-and-Architecture-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'iml',
        name: 'Introduction to Machine Learning',
        image: '/subjects/machine-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Supervised Learning', file: '/notes/sem4/introduction-to-machine-learning/Introduction-to-Machine-Learning-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Unsupervised Learning', file: '/notes/sem4/introduction-to-machine-learning/Introduction-to-Machine-Learning-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Statistical Learning Theory', file: '/notes/sem4/introduction-to-machine-learning/Introduction-to-Machine-Learning-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Semi-Supervised & Reinforcement Learning', file: '/notes/sem4/introduction-to-machine-learning/Introduction-to-Machine-Learning-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Recommender Systems & Neural Networks', file: '/notes/sem4/introduction-to-machine-learning/Introduction-to-Machine-Learning-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/introduction-to-machine-learning/Introduction-to-Machine-Learning-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'iwt',
        name: 'Introduction to Web Technology',
        image: '/subjects/computer-networks.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Internet and Web Basics', file: '/notes/sem4/introduction-to-web-technology/Introduction-to-Web-Technology-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — HTML', file: '/notes/sem4/introduction-to-web-technology/Introduction-to-Web-Technology-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — CSS and JavaScript', file: '/notes/sem4/introduction-to-web-technology/Introduction-to-Web-Technology-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — PHP and Server-Side', file: '/notes/sem4/introduction-to-web-technology/Introduction-to-Web-Technology-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Cookies, Sessions and Web Design', file: '/notes/sem4/introduction-to-web-technology/Introduction-to-Web-Technology-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/introduction-to-web-technology/Introduction-to-Web-Technology-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mefa4',
        name: 'Managerial Economics & Financial Accounting',
        image: '/subjects/mefa.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction to Managerial Economics', file: '/notes/sem4/managerial-economics-and-financial-accounting/Managerial-Economics-and-Financial-Accounting-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Demand, Elasticity, Forecasting & Supply', file: '/notes/sem4/managerial-economics-and-financial-accounting/Managerial-Economics-and-Financial-Accounting-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Production, Costs & Break-Even Analysis', file: '/notes/sem4/managerial-economics-and-financial-accounting/Managerial-Economics-and-Financial-Accounting-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Market Structures & Price Determination', file: '/notes/sem4/managerial-economics-and-financial-accounting/Managerial-Economics-and-Financial-Accounting-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Business Organisation, Final Accounts & Ratio Analysis', file: '/notes/sem4/managerial-economics-and-financial-accounting/Managerial-Economics-and-Financial-Accounting-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/managerial-economics-and-financial-accounting/Managerial-Economics-and-Financial-Accounting-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'spt',
        name: 'Statistics and Probability Theory',
        image: '/subjects/maths.jpg',
        colorClass: 'color-maths',
        notes: [
                    { title: 'Unit 1 — Probability and Random Variables', file: '/notes/sem4/statistics-and-probability-theory/Statistics-and-Probability-Theory-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Probability Distributions and Curve Fitting', file: '/notes/sem4/statistics-and-probability-theory/Statistics-and-Probability-Theory-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Correlation and Regression', file: '/notes/sem4/statistics-and-probability-theory/Statistics-and-Probability-Theory-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Queueing Theory', file: '/notes/sem4/statistics-and-probability-theory/Statistics-and-Probability-Theory-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Markov Process and Stochastic Processes', file: '/notes/sem4/statistics-and-probability-theory/Statistics-and-Probability-Theory-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/statistics-and-probability-theory/Statistics-and-Probability-Theory-Sem4-Important-Questions.pdf' },
        ]
      },
      {
        id: 'tc4',
        name: 'Technical Communication',
        image: '/subjects/tech_comm.jpg',
        colorClass: 'color-comm_skills',
        notes: [
                    { title: 'Unit 1 — Communication and Technical Communication', file: '/notes/sem4/technical-communication/Technical-Communication-Sem4-Unit-1.pdf' },
          { title: 'Unit 2 — Listening, Reading and Note Taking', file: '/notes/sem4/technical-communication/Technical-Communication-Sem4-Unit-2.pdf' },
          { title: 'Unit 3 — Writing Skills and Technical Writing', file: '/notes/sem4/technical-communication/Technical-Communication-Sem4-Unit-3.pdf' },
          { title: 'Unit 4 — Business Letters, Email and Job Applications', file: '/notes/sem4/technical-communication/Technical-Communication-Sem4-Unit-4.pdf' },
          { title: 'Unit 5 — Reports, Proposals and Literature', file: '/notes/sem4/technical-communication/Technical-Communication-Sem4-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem4/technical-communication/Technical-Communication-Sem4-Important-Questions.pdf' },
        ]
      },
    ] },
  sem5: { id: 'sem5', name: 'Semester 5', subjects: [
      {
        id: 'os',
        name: 'Operating Systems',
        image: '/subjects/operating-systems.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction of Operating System & Processor Management', file: '/notes/sem5/operating-systems/Operating-Systems-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Memory Management', file: '/notes/sem5/operating-systems/Operating-Systems-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Deadlock & Device Management', file: '/notes/sem5/operating-systems/Operating-Systems-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — File Management', file: '/notes/sem5/operating-systems/Operating-Systems-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Linux and Unix Case Study', file: '/notes/sem5/operating-systems/Operating-Systems-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/operating-systems/Operating-Systems-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'coa',
        name: 'Computer Org. & Architecture',
        image: '/subjects/computer-architecture.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — Register Transfer and Micro Operations', file: '/notes/sem5/computer-org-architecture/Computer-Organization-and-Architecture-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Basic Computer Organization & Design', file: '/notes/sem5/computer-org-architecture/Computer-Organization-and-Architecture-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Central Processing Unit', file: '/notes/sem5/computer-org-architecture/Computer-Organization-and-Architecture-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Pipeline and Vector Processing & Computer Arithmetic', file: '/notes/sem5/computer-org-architecture/Computer-Organization-and-Architecture-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Input-Output and Memory Organization', file: '/notes/sem5/computer-org-architecture/Computer-Organization-and-Architecture-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/computer-org-architecture/Computer-Organization-and-Architecture-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'cn',
        name: 'Computer Networks',
        image: '/subjects/computer-networks.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Computer Networks', file: '/notes/sem5/computer-networks/Computer-Networks-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Data Link Layer', file: '/notes/sem5/computer-networks/Computer-Networks-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Network Layer', file: '/notes/sem5/computer-networks/Computer-Networks-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Transport Layer', file: '/notes/sem5/computer-networks/Computer-Networks-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Application Layer', file: '/notes/sem5/computer-networks/Computer-Networks-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/computer-networks/Computer-Networks-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'cc_devops',
        name: 'Cloud Computing & DevOps',
        image: '/subjects/cloud-computing-devops.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Cloud Computing', file: '/notes/sem5/cloud-computing-devops/Cloud-Computing-and-DevOps-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Cloud Architecture, Service Models & Data Centers', file: '/notes/sem5/cloud-computing-devops/Cloud-Computing-and-DevOps-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Virtualization Technology', file: '/notes/sem5/cloud-computing-devops/Cloud-Computing-and-DevOps-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Cloud Security, BCP/DRP, Risk & SLA', file: '/notes/sem5/cloud-computing-devops/Cloud-Computing-and-DevOps-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — AWS, Azure, Aneka & Cloud Applications', file: '/notes/sem5/cloud-computing-devops/Cloud-Computing-and-DevOps-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/cloud-computing-devops/Cloud-Computing-and-DevOps-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ml',
        name: 'Machine Learning',
        image: '/subjects/machine-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Supervised Learning', file: '/notes/sem5/machine-learning/Machine-Learning-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Unsupervised Learning', file: '/notes/sem5/machine-learning/Machine-Learning-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Statistical Learning Theory', file: '/notes/sem5/machine-learning/Machine-Learning-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Semi-Supervised & Reinforcement Learning', file: '/notes/sem5/machine-learning/Machine-Learning-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Recommender Systems & Neural Networks', file: '/notes/sem5/machine-learning/Machine-Learning-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/machine-learning/Machine-Learning-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'dmw',
        name: 'Data Mining & Warehousing',
        image: '/subjects/data-mining-warehousing.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Data Mining & Data Warehousing', file: '/notes/sem5/data-mining-warehousing/Data-Mining-and-Warehousing-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Classification', file: '/notes/sem5/data-mining-warehousing/Data-Mining-and-Warehousing-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Clustering & Outlier Analysis', file: '/notes/sem5/data-mining-warehousing/Data-Mining-and-Warehousing-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Frequent Pattern Mining & Association Rules', file: '/notes/sem5/data-mining-warehousing/Data-Mining-and-Warehousing-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Advanced Topics, Applications & Social Impacts', file: '/notes/sem5/data-mining-warehousing/Data-Mining-and-Warehousing-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/data-mining-warehousing/Data-Mining-and-Warehousing-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ds_systems',
        name: 'Distributed Systems',
        image: '/subjects/distributed-systems.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Distributed Systems', file: '/notes/sem5/distributed-systems/Distributed-Systems-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Processes, Clocks and Communication', file: '/notes/sem5/distributed-systems/Distributed-Systems-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Distributed Process Scheduling and File Systems', file: '/notes/sem5/distributed-systems/Distributed-Systems-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Distributed Shared Memory', file: '/notes/sem5/distributed-systems/Distributed-Systems-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Distributed Agreement and CORBA', file: '/notes/sem5/distributed-systems/Distributed-Systems-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/distributed-systems/Distributed-Systems-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'aoa',
        name: 'Analysis of Algorithms',
        image: '/subjects/design-analysis-algorithms.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Analysis of Algorithms: Effectiveness, Asymptotic Notation and Complexity Classes', file: '/notes/sem5/analysis-of-algorithms/Analysis-of-Algorithms-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Divide and Conquer, Sorting and String Matching', file: '/notes/sem5/analysis-of-algorithms/Analysis-of-Algorithms-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Greedy Method, Spanning Trees, Compression and Flow', file: '/notes/sem5/analysis-of-algorithms/Analysis-of-Algorithms-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Dynamic Programming: Knapsack, LCS and Matrix Chains', file: '/notes/sem5/analysis-of-algorithms/Analysis-of-Algorithms-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Backtracking, Branch and Bound, Randomised and NP-Complete Problems', file: '/notes/sem5/analysis-of-algorithms/Analysis-of-Algorithms-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/analysis-of-algorithms/Analysis-of-Algorithms-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'avr',
        name: 'Augmented Reality and Virtual Reality',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Virtual Reality, Augmented Reality and Their Impact', file: '/notes/sem5/augmented-and-virtual-reality/Augmented-and-Virtual-Reality-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — AR Systems, Devices, Tracking, Displays and Toolkits', file: '/notes/sem5/augmented-and-virtual-reality/Augmented-and-Virtual-Reality-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — VR Interfaces, Devices, Latency and Quality', file: '/notes/sem5/augmented-and-virtual-reality/Augmented-and-Virtual-Reality-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Rendering the Virtual World: Projection, Light and Depth', file: '/notes/sem5/augmented-and-virtual-reality/Augmented-and-Virtual-Reality-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Tools and Applications: Games, Film, Engineering, Education and Therapy', file: '/notes/sem5/augmented-and-virtual-reality/Augmented-and-Virtual-Reality-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/augmented-and-virtual-reality/Augmented-and-Virtual-Reality-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'cgm',
        name: 'Computer Graphics and Multimedia',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Graphics Foundations: Pixels, Displays and Standards', file: '/notes/sem5/computer-graphics-and-multimedia/Computer-Graphics-and-Multimedia-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Curves, Transformations and Surfaces', file: '/notes/sem5/computer-graphics-and-multimedia/Computer-Graphics-and-Multimedia-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Scan Conversion, Clipping and Filling', file: '/notes/sem5/computer-graphics-and-multimedia/Computer-Graphics-and-Multimedia-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Colour, Light, Shading and Shadows', file: '/notes/sem5/computer-graphics-and-multimedia/Computer-Graphics-and-Multimedia-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Animation, Fractals and Projections', file: '/notes/sem5/computer-graphics-and-multimedia/Computer-Graphics-and-Multimedia-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/computer-graphics-and-multimedia/Computer-Graphics-and-Multimedia-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'hci',
        name: 'Human Computer Interaction',
        image: '/subjects/human-interaction.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Foundations: What HCI Is, Usability and the HCI Framework', file: '/notes/sem5/human-computer-interaction/Human-Computer-Interaction-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — The Human: Cognition, Reasoning and the Laws of Pointing', file: '/notes/sem5/human-computer-interaction/Human-Computer-Interaction-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Models of Interaction: Norman, GOMS, KLM, MHP and CCT', file: '/notes/sem5/human-computer-interaction/Human-Computer-Interaction-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Design: Task Analysis, Interface Design, Prototyping and Dialog Design', file: '/notes/sem5/human-computer-interaction/Human-Computer-Interaction-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Evaluation and Methods: Heuristics, Experiments and Formal Models', file: '/notes/sem5/human-computer-interaction/Human-Computer-Interaction-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/human-computer-interaction/Human-Computer-Interaction-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'itc',
        name: 'Information Theory and Coding',
        image: '/subjects/computer-networks.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Foundations: Entropy, Mutual Information and Shannon\'s Theorems', file: '/notes/sem5/information-theory-and-coding/Information-Theory-and-Coding-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Source Coding: Shannon-Fano, Huffman and Coding Efficiency', file: '/notes/sem5/information-theory-and-coding/Information-Theory-and-Coding-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Channels and Fields: Discrete Channels, Galois Fields and BCH Codes', file: '/notes/sem5/information-theory-and-coding/Information-Theory-and-Coding-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Block Codes and Cyclic Codes: Linear Codes, Hamming and Cyclic Codes', file: '/notes/sem5/information-theory-and-coding/Information-Theory-and-Coding-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Convolutional Codes and Error Control: State Diagrams, Viterbi and ARQ', file: '/notes/sem5/information-theory-and-coding/Information-Theory-and-Coding-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/information-theory-and-coding/Information-Theory-and-Coding-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'blockchain',
        name: 'Introduction to Blockchain',
        image: '/subjects/information-security.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Foundations: What Blockchain Is, Cryptography and Hashing', file: '/notes/sem5/introduction-to-blockchain/Introduction-to-Blockchain-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Bitcoin and Ethereum: Structure, Currency and Smart Contracts', file: '/notes/sem5/introduction-to-blockchain/Introduction-to-Blockchain-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Consensus: How the Network Agrees', file: '/notes/sem5/introduction-to-blockchain/Introduction-to-Blockchain-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Architecture and Cryptography in Depth', file: '/notes/sem5/introduction-to-blockchain/Introduction-to-Blockchain-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Applications: Supply Chains, Healthcare, Trading and the Economy', file: '/notes/sem5/introduction-to-blockchain/Introduction-to-Blockchain-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/introduction-to-blockchain/Introduction-to-Blockchain-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ml_apps',
        name: 'Machine Learning and its Applications',
        image: '/subjects/machine-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Foundations: What Machine Learning Is and How Neural Networks Learn', file: '/notes/sem5/machine-learning-and-its-applications/Machine-Learning-and-its-Applications-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Decision Trees: Representation, Learning and Inductive Bias', file: '/notes/sem5/machine-learning-and-its-applications/Machine-Learning-and-its-Applications-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Deep Networks: Convolutional and Recurrent Networks', file: '/notes/sem5/machine-learning-and-its-applications/Machine-Learning-and-its-Applications-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Bayesian Learning: Bayes, Naive Bayes and Belief Networks', file: '/notes/sem5/machine-learning-and-its-applications/Machine-Learning-and-its-Applications-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Evolution, Evaluation and Experiments: Genetic Algorithms and Model Assessment', file: '/notes/sem5/machine-learning-and-its-applications/Machine-Learning-and-its-Applications-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/machine-learning-and-its-applications/Machine-Learning-and-its-Applications-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mfc',
        name: 'Mathematical Foundation Course',
        image: '/subjects/maths.jpg',
        colorClass: 'color-maths',
        notes: [
                    { title: 'Unit 1 — Foundations: Sampling, Estimation and Hypothesis Testing', file: '/notes/sem5/mathematical-foundation-course/Mathematical-Foundation-Course-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — Tests and Distributions: Z, T, Chi-Square, ANOVA and Poisson', file: '/notes/sem5/mathematical-foundation-course/Mathematical-Foundation-Course-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Data: Missing Values, Outliers, PCA and Variance', file: '/notes/sem5/mathematical-foundation-course/Mathematical-Foundation-Course-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Linear Algebra: Vectors, Vector Spaces and Linear Maps', file: '/notes/sem5/mathematical-foundation-course/Mathematical-Foundation-Course-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Advanced Topics: MLE Proofs, Heteroscedasticity, Entropy and Normality', file: '/notes/sem5/mathematical-foundation-course/Mathematical-Foundation-Course-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/mathematical-foundation-course/Mathematical-Foundation-Course-Sem5-Important-Questions.pdf' },
        ]
      },
      {
        id: 'uhb',
        name: 'Understanding the Human Being',
        image: '/subjects/human-interaction.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Human Values, Self-Exploration and Natural Acceptance', file: '/notes/sem5/understanding-the-human-being/Understanding-the-Human-Being-Comprehensive-Human-Aspirations-Sem5-Unit-1.pdf' },
          { title: 'Unit 2 — The Self, the Body, and Consciousness', file: '/notes/sem5/understanding-the-human-being/Understanding-the-Human-Being-Comprehensive-Human-Aspirations-Sem5-Unit-2.pdf' },
          { title: 'Unit 3 — Values, Skills, Resolution and Personality', file: '/notes/sem5/understanding-the-human-being/Understanding-the-Human-Being-Comprehensive-Human-Aspirations-Sem5-Unit-3.pdf' },
          { title: 'Unit 4 — Happiness, Prosperity and the Vision of a Happy Life', file: '/notes/sem5/understanding-the-human-being/Understanding-the-Human-Being-Comprehensive-Human-Aspirations-Sem5-Unit-4.pdf' },
          { title: 'Unit 5 — Relationship, Trust and the Expansion of Harmony', file: '/notes/sem5/understanding-the-human-being/Understanding-the-Human-Being-Comprehensive-Human-Aspirations-Sem5-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem5/understanding-the-human-being/Understanding-the-Human-Being-Comprehensive-Human-Aspirations-Sem5-Important-Questions.pdf' },
        ]
      },
    ] },
  sem6: { id: 'sem6', name: 'Semester 6', subjects: [
      {
        id: 'cd',
        name: 'Compiler Design',
        image: '/subjects/compiler-design.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Compilers & Lexical Analysis', file: '/notes/sem6/compiler-design/Compiler-Design-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Context-Free Grammars & Parsing', file: '/notes/sem6/compiler-design/Compiler-Design-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Syntax-Directed Translation & Intermediate Code', file: '/notes/sem6/compiler-design/Compiler-Design-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Storage Allocation & Symbol Tables', file: '/notes/sem6/compiler-design/Compiler-Design-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Code Optimisation & Code Generation', file: '/notes/sem6/compiler-design/Compiler-Design-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/compiler-design/Compiler-Design-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'daa',
        name: 'Design and Analysis of Algorithms',
        image: '/subjects/design-analysis-algorithms.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Analysis of Algorithms & Divide and Conquer', file: '/notes/sem6/design-and-analysis-of-algorithms/Design-and-Analysis-of-Algorithms-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Greedy Method & Single-Source Shortest Paths', file: '/notes/sem6/design-and-analysis-of-algorithms/Design-and-Analysis-of-Algorithms-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Dynamic Programming & All-Pairs Shortest Paths', file: '/notes/sem6/design-and-analysis-of-algorithms/Design-and-Analysis-of-Algorithms-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Branch and Bound & Backtracking', file: '/notes/sem6/design-and-analysis-of-algorithms/Design-and-Analysis-of-Algorithms-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — NP-Hard, NP-Complete & Approximation Algorithms', file: '/notes/sem6/design-and-analysis-of-algorithms/Design-and-Analysis-of-Algorithms-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/design-and-analysis-of-algorithms/Design-and-Analysis-of-Algorithms-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'iss',
        name: 'Information Security Systems',
        image: '/subjects/information-security.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Security & Classical Encryption', file: '/notes/sem6/information-security-systems/Information-Security-Systems-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Conventional Encryption: DES, AES & Modes of Operation', file: '/notes/sem6/information-security-systems/Information-Security-Systems-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Public Key Cryptography & Number Theory', file: '/notes/sem6/information-security-systems/Information-Security-Systems-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Message Authentication, Hash Functions & Digital Signatures', file: '/notes/sem6/information-security-systems/Information-Security-Systems-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Key Management, Web Security, SSL/TLS & Kerberos', file: '/notes/sem6/information-security-systems/Information-Security-Systems-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/information-security-systems/Information-Security-Systems-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'dip',
        name: 'Digital Image Processing',
        image: '/subjects/digital-image-processing.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Digital Image Fundamentals', file: '/notes/sem6/digital-image-processing/Digital-Image-Processing-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Image Transformation & Filtering', file: '/notes/sem6/digital-image-processing/Digital-Image-Processing-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Image Restoration', file: '/notes/sem6/digital-image-processing/Digital-Image-Processing-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Image Compression', file: '/notes/sem6/digital-image-processing/Digital-Image-Processing-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Image Segmentation & Representation', file: '/notes/sem6/digital-image-processing/Digital-Image-Processing-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/digital-image-processing/Digital-Image-Processing-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'iot',
        name: 'Internet of Things',
        image: '/subjects/internet-of-things.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — Introduction to IoT', file: '/notes/sem6/internet-of-things/Internet-of-Things-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Sensors, Actuators & IoT Hardware', file: '/notes/sem6/internet-of-things/Internet-of-Things-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — IoT Reference Architectures', file: '/notes/sem6/internet-of-things/Internet-of-Things-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — M2M, SDN & NFV for IoT', file: '/notes/sem6/internet-of-things/Internet-of-Things-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Domain-Specific IoT Applications', file: '/notes/sem6/internet-of-things/Internet-of-Things-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/internet-of-things/Internet-of-Things-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'nlp',
        name: 'Natural Language Processing',
        image: '/subjects/natural-language-processing.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to NLP', file: '/notes/sem6/natural-language-processing/Natural-Language-Processing-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Word Level & Syntactic Analysis', file: '/notes/sem6/natural-language-processing/Natural-Language-Processing-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Semantic Analysis, Discourse & Knowledge Representation', file: '/notes/sem6/natural-language-processing/Natural-Language-Processing-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Natural Language Generation & Machine Translation', file: '/notes/sem6/natural-language-processing/Natural-Language-Processing-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Information Retrieval & Lexical Resources', file: '/notes/sem6/natural-language-processing/Natural-Language-Processing-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/natural-language-processing/Natural-Language-Processing-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ansf',
        name: 'Application and Network Security Fundamentals',
        image: '/subjects/information-security.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Foundations of Security', file: '/notes/sem6/application-and-network-security-fundamentals/Application-and-Network-Security-Fundamentals-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Network Models and TCP', file: '/notes/sem6/application-and-network-security-fundamentals/Application-and-Network-Security-Fundamentals-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Authentication of People', file: '/notes/sem6/application-and-network-security-fundamentals/Application-and-Network-Security-Fundamentals-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Web Security, SSL and SET', file: '/notes/sem6/application-and-network-security-fundamentals/Application-and-Network-Security-Fundamentals-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — IP Security, Firewalls and Intrusion Detection', file: '/notes/sem6/application-and-network-security-fundamentals/Application-and-Network-Security-Fundamentals-Sem6-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem6/application-and-network-security-fundamentals/Application-and-Network-Security-Fundamentals-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'ai',
        name: 'Artificial Intelligence',
        image: '/subjects/deep-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to AI and Intelligent Agents', file: '/notes/sem6/artificial-intelligence/Artificial-Intelligence-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Search Strategies and Game Playing', file: '/notes/sem6/artificial-intelligence/Artificial-Intelligence-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Knowledge Representation and Reasoning', file: '/notes/sem6/artificial-intelligence/Artificial-Intelligence-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Machine Learning', file: '/notes/sem6/artificial-intelligence/Artificial-Intelligence-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Expert Systems, NLP and Robotics', file: '/notes/sem6/artificial-intelligence/Artificial-Intelligence-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/artificial-intelligence/Artificial-Intelligence-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'bda',
        name: 'Big Data Analytics',
        image: '/subjects/data-mining-warehousing.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Big Data Foundations', file: '/notes/sem6/big-data-analytics/Big-Data-Analytics-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Hadoop, HDFS and YARN', file: '/notes/sem6/big-data-analytics/Big-Data-Analytics-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — MapReduce and Hadoop I/O', file: '/notes/sem6/big-data-analytics/Big-Data-Analytics-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Pig and Pig Latin', file: '/notes/sem6/big-data-analytics/Big-Data-Analytics-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Hive, HBase and Sqoop', file: '/notes/sem6/big-data-analytics/Big-Data-Analytics-Sem6-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem6/big-data-analytics/Big-Data-Analytics-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'gpu',
        name: 'GPU Computing',
        image: '/subjects/computer.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — The GPU and Its Programming Model', file: '/notes/sem6/gpu-computing/GPU-Computing-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — The Graphics Pipeline', file: '/notes/sem6/gpu-computing/GPU-Computing-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Parallelism and Thread Execution', file: '/notes/sem6/gpu-computing/GPU-Computing-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — CUDA Architecture and Memory', file: '/notes/sem6/gpu-computing/GPU-Computing-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — CUDA Kernels and Memory Efficiency', file: '/notes/sem6/gpu-computing/GPU-Computing-Sem6-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem6/gpu-computing/GPU-Computing-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'iccl',
        name: 'Introduction to Cyber Crime, Law and Investigation',
        image: '/subjects/information-security.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Foundations of Cyber Crime and Law', file: '/notes/sem6/introduction-to-cyber-crime-law-and-investigation/Introduction-to-Cyber-Crime-Law-and-Investigation-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Digital Signatures and Electronic Records', file: '/notes/sem6/introduction-to-cyber-crime-law-and-investigation/Introduction-to-Cyber-Crime-Law-and-Investigation-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — E-Commerce, E-Governance and Data Protection', file: '/notes/sem6/introduction-to-cyber-crime-law-and-investigation/Introduction-to-Cyber-Crime-Law-and-Investigation-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Cyber Forensics and Investigation', file: '/notes/sem6/introduction-to-cyber-crime-law-and-investigation/Introduction-to-Cyber-Crime-Law-and-Investigation-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Law in Action: Blocking, Privacy and the Digital Age', file: '/notes/sem6/introduction-to-cyber-crime-law-and-investigation/Introduction-to-Cyber-Crime-Law-and-Investigation-Sem6-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem6/introduction-to-cyber-crime-law-and-investigation/Introduction-to-Cyber-Crime-Law-and-Investigation-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'nsva',
        name: 'Network System Vulnerability Assessment',
        image: '/subjects/information-security.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Secure Development and the OWASP Top Ten', file: '/notes/sem6/network-system-vulnerability-assessment/Network-System-Vulnerability-Assessment-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Input, Output and Injection Attacks', file: '/notes/sem6/network-system-vulnerability-assessment/Network-System-Vulnerability-Assessment-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — Wireless Attacks', file: '/notes/sem6/network-system-vulnerability-assessment/Network-System-Vulnerability-Assessment-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Finding Vulnerabilities and Penetration Testing', file: '/notes/sem6/network-system-vulnerability-assessment/Network-System-Vulnerability-Assessment-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Defence in Depth', file: '/notes/sem6/network-system-vulnerability-assessment/Network-System-Vulnerability-Assessment-Sem6-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem6/network-system-vulnerability-assessment/Network-System-Vulnerability-Assessment-Sem6-Important-Questions.pdf' },
        ]
      },
      {
        id: 'smf',
        name: 'Statistical Modeling and Forecasting',
        image: '/subjects/maths.jpg',
        colorClass: 'color-maths',
        notes: [
                    { title: 'Unit 1 — Foundations of Time Series Analysis', file: '/notes/sem6/statistical-modeling-and-forecasting/Statistical-Modeling-and-Forecasting-Sem6-Unit-1.pdf' },
          { title: 'Unit 2 — Stationarity, Unit Roots and Error Correction', file: '/notes/sem6/statistical-modeling-and-forecasting/Statistical-Modeling-and-Forecasting-Sem6-Unit-2.pdf' },
          { title: 'Unit 3 — ARMA, VAR and Co-integration', file: '/notes/sem6/statistical-modeling-and-forecasting/Statistical-Modeling-and-Forecasting-Sem6-Unit-3.pdf' },
          { title: 'Unit 4 — Estimation Methods', file: '/notes/sem6/statistical-modeling-and-forecasting/Statistical-Modeling-and-Forecasting-Sem6-Unit-4.pdf' },
          { title: 'Unit 5 — Forecasting in Practice', file: '/notes/sem6/statistical-modeling-and-forecasting/Statistical-Modeling-and-Forecasting-Sem6-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem6/statistical-modeling-and-forecasting/Statistical-Modeling-and-Forecasting-Sem6-Important-Questions.pdf' },
        ]
      },
    ] },
  sem7: { id: 'sem7', name: 'Semester 7', subjects: [
      {
        id: 'dl',
        name: 'Deep Learning',
        image: '/subjects/deep-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Neural Networks', file: '/notes/sem7/deep-learning/Deep-Learning-Sem7-Unit-1.pdf' },
          { title: 'Unit 2 — Convolutional Neural Networks & Optimisation', file: '/notes/sem7/deep-learning/Deep-Learning-Sem7-Unit-2.pdf' },
          { title: 'Unit 3 — Data Splitting, Bias-Variance & Regression', file: '/notes/sem7/deep-learning/Deep-Learning-Sem7-Unit-3.pdf' },
          { title: 'Unit 4 — Optimisation, Learning Rate & Batch Normalisation', file: '/notes/sem7/deep-learning/Deep-Learning-Sem7-Unit-4.pdf' },
          { title: 'Unit 5 — RNN, LSTM, GANs & Deep Learning Frameworks', file: '/notes/sem7/deep-learning/Deep-Learning-Sem7-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem7/deep-learning/Deep-Learning-Sem7-Important-Questions.pdf' },
        ]
      },
      {
        id: 'disaster_mgmt',
        name: 'Disaster Management',
        image: '/subjects/disaster-management.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction, Hazard and Natural Disasters', file: '/notes/sem7/disaster-management/Disaster-Management-Sem7-Unit-1.pdf' },
          { title: 'Unit 2 — Man-made Hazards and Disasters', file: '/notes/sem7/disaster-management/Disaster-Management-Sem7-Unit-2.pdf' },
          { title: 'Unit 3 — Disaster Management Cycle, Preparedness and Relief', file: '/notes/sem7/disaster-management/Disaster-Management-Sem7-Unit-3.pdf' },
          { title: 'Unit 4 — Disaster Risk Reduction, Prediction and Institutions', file: '/notes/sem7/disaster-management/Disaster-Management-Sem7-Unit-4.pdf' },
          { title: 'Unit 5 — Regional Surveys, Sustainability and Governance in India', file: '/notes/sem7/disaster-management/Disaster-Management-Sem7-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem7/disaster-management/Disaster-Management-Sem7-Important-Questions.pdf' },
        ]
      },
      {
        id: 'gen_ai',
        name: 'Generative AI',
        image: '/subjects/generative-ai.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Introduction to Generative AI  [built from PYQ topics]', file: '/notes/sem7/generative-ai/Generative-AI-Sem7-Unit-1.pdf' },
          { title: 'Unit 2 — Convolutional and Recurrent Neural Networks', file: '/notes/sem7/generative-ai/Generative-AI-Sem7-Unit-2.pdf' },
          { title: 'Unit 3 — Generative Models for Computer Vision', file: '/notes/sem7/generative-ai/Generative-AI-Sem7-Unit-3.pdf' },
          { title: 'Unit 4 — Advanced Generative AI Topics', file: '/notes/sem7/generative-ai/Generative-AI-Sem7-Unit-4.pdf' },
          { title: 'Unit 5 — Generative AI for Language and Applications  [built from PYQ topics]', file: '/notes/sem7/generative-ai/Generative-AI-Sem7-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem7/generative-ai/Generative-AI-Sem7-Important-Questions.pdf' },
        ]
      },
      {
        id: 'mc',
        name: 'Mobile Computing',
        image: '/subjects/internet-of-things.jpg',
        colorClass: 'color-bee',
        notes: [
                    { title: 'Unit 1 — Foundations of Mobile Computing', file: '/notes/sem7/mobile-computing/Mobile-Computing-Sem7-Unit-1.pdf' },
          { title: 'Unit 2 — Mobile Devices and Wireless LAN', file: '/notes/sem7/mobile-computing/Mobile-Computing-Sem7-Unit-2.pdf' },
          { title: 'Unit 3 — GSM, Multiple Access and Wireless MAC', file: '/notes/sem7/mobile-computing/Mobile-Computing-Sem7-Unit-3.pdf' },
          { title: 'Unit 4 — Mobile IP and Mobile Transport Protocols', file: '/notes/sem7/mobile-computing/Mobile-Computing-Sem7-Unit-4.pdf' },
          { title: 'Unit 5 — Mobile Databases, Dissemination, Security and Ethics', file: '/notes/sem7/mobile-computing/Mobile-Computing-Sem7-Unit-5.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem7/mobile-computing/Mobile-Computing-Sem7-Important-Questions.pdf' },
        ]
      },
      {
        id: 'soft_comp',
        name: 'Soft Computing and Evolutionary Algorithms',
        image: '/subjects/machine-learning.jpg',
        colorClass: 'color-computer',
        notes: [
                    { title: 'Unit 1 — Foundations of Soft Computing and Fuzzy Sets', file: '/notes/sem7/soft-computing-and-evolutionary-algorithms/Soft-Computing-and-Evolutionary-Algorithms-Sem7-Unit-1.pdf' },
          { title: 'Unit 2 — Fuzzy Logic Systems: Structure and Working', file: '/notes/sem7/soft-computing-and-evolutionary-algorithms/Soft-Computing-and-Evolutionary-Algorithms-Sem7-Unit-2.pdf' },
          { title: 'Unit 3 — Fuzzy Logic Applications: Robotics, Patterns and Control', file: '/notes/sem7/soft-computing-and-evolutionary-algorithms/Soft-Computing-and-Evolutionary-Algorithms-Sem7-Unit-3.pdf' },
          { title: 'Unit 4 — Genetic Algorithms', file: '/notes/sem7/soft-computing-and-evolutionary-algorithms/Soft-Computing-and-Evolutionary-Algorithms-Sem7-Unit-4.pdf' },
          { title: 'Unit 5 — Evolutionary Algorithms, Particle Swarm Optimisation and Neuro-Fuzzy Systems', file: '/notes/sem7/soft-computing-and-evolutionary-algorithms/Soft-Computing-and-Evolutionary-Algorithms-Sem7-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem7/soft-computing-and-evolutionary-algorithms/Soft-Computing-and-Evolutionary-Algorithms-Sem7-Important-Questions.pdf' },
        ]
      },
    ] },
  sem8: { id: 'sem8', name: 'Semester 8', subjects: [
      {
        id: 'fhi',
        name: 'FHI Subject',
        image: '/subjects/human-interaction.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Introduction to Human Factors', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-1.pdf' },
          { title: 'Unit 2 — Human Performance and Limitations', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-2.pdf' },
          { title: 'Unit 3 — Social Psychology', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-3.pdf' },
          { title: 'Unit 4 — Factors Affecting Performance', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-4.pdf' },
          { title: 'Unit 5 — Physical Environment and Task', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-5.pdf' },
          { title: 'Unit 6 — Communication', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-6.pdf' },
          { title: 'Unit 7 — Human Error and Hazards in the Workplace', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Unit-7.pdf' },
          { title: '70 Most Important Questions', file: '/notes/sem8/fhi-subject/Factor-of-Human-Interaction-Sem8-Important-Questions.pdf' },
        ]
      },
      {
        id: 'entrepreneurship',
        name: 'Entrepreneurship',
        image: '/subjects/mefa.jpg',
        colorClass: 'color-mefa',
        notes: [
                    { title: 'Unit 1 — Foundations of Entrepreneurship', file: '/notes/sem8/entrepreneurship/Entrepreneurship-Sem8-Unit-1.pdf' },
          { title: 'Unit 2 — Starting a Small Business', file: '/notes/sem8/entrepreneurship/Entrepreneurship-Sem8-Unit-2.pdf' },
          { title: 'Unit 3 — Finance and Institutions', file: '/notes/sem8/entrepreneurship/Entrepreneurship-Sem8-Unit-3.pdf' },
          { title: 'Unit 4 — Business Environment and Management', file: '/notes/sem8/entrepreneurship/Entrepreneurship-Sem8-Unit-4.pdf' },
          { title: 'Unit 5 — Business Planning, Growth and Special Topics', file: '/notes/sem8/entrepreneurship/Entrepreneurship-Sem8-Unit-5.pdf' },
          { title: 'Most Important Questions (50)', file: '/notes/sem8/entrepreneurship/Entrepreneurship-Sem8-Important-Questions.pdf' },
        ]
      },
    ] }
};
