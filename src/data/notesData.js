export const semestersData = {
  sem1: {
    id: 'sem1',
    name: 'Semester 1',
    subjects: [
      {
        id: 'computer',
        name: 'Computer',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: '1. C ALL notes 1,2,3 Merged', file: '/cin1.pdf' },
          { title: '2. Previous Year Full Book', file: '/pc.pdf' },
          { title: '!!! 70 IMP QUES !!!', file: '/70 CF&P Updated Importnt question (1)BCA.pdf' }
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        image: '/chem.jpg',
        colorClass: 'color-chemistry',
        notes: [
          { title: '1. Corrosion', file: '/co.pdf' },
          { title: '1. Corrosion part 2', file: '/U2[CORROSION].pdf' },
          { title: '2. Lubricants', file: '/lc.pdf' },
          { title: '2. Engineering Materials one shot', file: '/U1[Engineering Materials].pdf' },
          { title: '3. Water + Boiler Troubles', file: '/ce1.pdf' },
          { title: '4. Fuel', file: '/chemfuel.pdf' },
          { title: '5. Green Chemistry', file: '/g.docx' },
          { title: '6. All Unit 1', file: '/CHEMISTRY UNIT 1.pdf' },
          { title: '7. All Unit 2', file: '/CHEMISTRY UNIT 2.pdf' },
          { title: '8. All Unit 3', file: '/CHEMISTRY UNIT 3.pdf' },
          { title: '9. All Unit 4', file: '/CHEMISTRY UNIT 4.pdf' },
          { title: '10. All Unit 5', file: '/CHEMISTRY UNIT 5.pdf' },
          { title: '!!! IMP QUES 70 QUES !!!', file: '/Engg. Chemistry Imp. 70 question (1).docx' },
          { title: '!!! PYQ Practice !!!', file: '/CIT-PYQ-2023-24.pdf' }
        ]
      },
      {
        id: 'maths',
        name: 'Maths',
        image: '/math.jpg',
        colorClass: 'color-maths',
        notes: [
          { title: '1. Mathematics 1', file: '/ma111.pdf' },
          { title: '2. Maths Full Book Answers', file: '/f.pdf' },
          { title: '3. Maths Assignment', file: 'https://acrobat.adobe.com/id/urn:aaid:sc:AP:9c2918d3-b1b4-4410-9ddf-2162308daee1', isExternal: true },
          { title: '3. Maths Assignment Answers', file: '/mi.pdf' },
          { title: '3. Maths 10 Minutes Revision', file: '/Mathsimp.pdf' }
        ]
      },
      {
        id: 'bee',
        name: 'BEE',
        image: '/bee.jpg',
        colorClass: 'color-bee',
        notes: [
          { title: '1. 1st Chapter in Normal Handwritten', file: '/bee.pdf.docx.pdf' },
          { title: '2. 2nd Chapter in Normal Handwritten', file: '/bee2.docx.pdf' },
          { title: '3. 3rd Chapter in Normal Handwritten', file: '/3b.pdf' },
          { title: '4. 4th Chapter in Normal Handwritten', file: '/4b.pdf' },
          { title: '5. Important Notes', file: '/imp.pdf' },
          { title: '6. All Syllabus Notes', file: '/Bee Full syllabus.pdf' }
        ]
      },
      {
        id: 'mefa',
        name: 'MEFA',
        image: '/mefa.jpg',
        colorClass: 'color-mefa',
        notes: [
          { title: '1. 1st Chapter Sir wala', file: '/mefa1.docx' },
          { title: '1.1 1st Chapter Sir wala (Part 2)', file: '/mefa1p.docx' },
          { title: '2. 2nd Chapter Sir wala', file: '/mefa2.docx' },
          { title: '3. Cost', file: '/cost.pdf.docx' },
          { title: '3. Unit 3 Production', file: '/m3p.docx' },
          { title: '4. 4th Chapter Sir wala', file: '/m4.docx' },
          { title: '5. 5th Chapter Sir wala', file: '/m51.docx' },
          { title: '5. Part 2 Chapter 5', file: '/m52.docx' },
          { title: '5. Part 3 Chapter 5', file: '/m53.docx' },
          { title: '5. Part 4 Chapter 5', file: '/m54.docx' },
          { title: '!!! MEFA IMP 70 QUES !!!', file: '/MEFA_imp_Q & A_Merged.pdf' }
        ]
      },
      {
        id: 'practical',
        name: 'Practical',
        image: '/p.jpg',
        colorClass: 'color-practical',
        secured: true,
        notes: [
          {
            title: 'Computer Fundamentals Practicals',
            subnotes: [
              { title: '1. Normal Pdf Sir wala', file: '/c.pdf.docx' },
              { title: '2. Handwritten', file: '/ch1.pdf' }
            ]
          },
          {
            title: 'Chemistry Practicals',
            subnotes: [
              { title: '1. Experiment 1 to 4 in Normal Handwritten', file: '/chemq.pdf.docx' },
              { title: '2. Alternate File (Communication File)', file: '/chamq.pdf' }
            ]
          },
          {
            title: 'Communication Practicals',
            subnotes: [
              { title: '1. FULL FILE Normal Handwritten', file: '/commu.pdf' },
              { title: '2. Communication File', file: '/chamq.pdf' }
            ]
          },
          {
            title: 'BEE Practicals',
            subnotes: [
              { title: '1. BEE file', file: '/beep.pdf' },
              { title: '2. Practical 1 to 4 Handwritten', file: '/beep.pdf.docx' }
            ]
          }
        ]
      },
      {
        id: 'midsem',
        name: 'Mid-Sem',
        image: '/t.jpg',
        colorClass: 'color-midsem',
        notes: [
          { title: '1. 1st Mid Term 2025–26', file: '/1midsemp.pdf' },
          { title: '2. 2nd Mid Term 2025–26', file: '/smid.pdf' },
          { title: '3. Pre-University-Exam 2025–26', file: '/All.pdf' }
        ]
      }
    ]
  },
  sem2: {
    id: 'sem2',
    name: 'Semester 2',
    subjects: [
      {
        id: 'comm_skills',
        name: 'Communication Skills',
        image: '/commu.jpg',
        colorClass: 'color-comm_skills',
        notes: [
          { title: '70 IMP + All Syllabus', file: '/2ndseminpcomm.pdf' }
        ]
      },
      {
        id: 'built_env',
        name: 'Built Environment',
        image: '/chem.jpg',
        colorClass: 'color-built_env',
        notes: [
          { title: 'Unit 1 - Notes', file: '/UNIT-1 NOTES.pdf' },
          { title: 'Unit 2, 3, 4 Merge', file: '/UNIT 3,2,4.pdf.pdf' },
          { title: 'Unit 1', file: '/notes/sem2/introduction-to-build-enviroment/ibe-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem2/introduction-to-build-enviroment/ibe-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem2/introduction-to-build-enviroment/ibe-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem2/introduction-to-build-enviroment/ibe-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem2/introduction-to-build-enviroment/ibe-unit-5.pdf' },
        ]
      },
      {
        id: 'physics',
        name: 'Physics',
        image: '/bee.jpg',
        colorClass: 'color-physics',
        notes: [
          { title: '70 IMP and Full syllabus', file: '/PhysicsIMP.pdf' },
          { title: 'Previous Year Questions', file: '/PYQ Physics.pdf' },
          { title: 'Unit 1 - Wave Optics', file: '/UNIT-1(WAVE OPTICS).pdf' },
          { title: 'Unit 2', file: '/PHYSICS U2.pdf' },
          { title: 'Unit 3 - Laser', file: '/UNIT-3(LASER).pdf' },
          { title: 'Unit 4 - Semiconductors', file: '/UNIT-4(SEMICONDUUCTORS).pdf' },
          { title: 'Unit 5 - Electromagnetism', file: '/UNIT-5(INTRO TO ELECTROMAGNETISM).pdf' }
        ]
      },
      {
        id: 'maths2',
        name: 'Maths',
        image: '/math.jpg',
        colorClass: 'color-maths2',
        notes: [
          { title: 'Unit 1', file: '/notes/sem2/engineering-mathematics-2/em2-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem2/engineering-mathematics-2/em2-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem2/engineering-mathematics-2/em2-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem2/engineering-mathematics-2/em2-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem2/engineering-mathematics-2/em2-unit-5.pdf' },
        ]
      },
      {
        id: 'mech_eng',
        name: 'Mechanical Engineering',
        image: '/com.jpg',
        colorClass: 'color-mech_eng',
        notes: [
          { title: 'Unit 1 - Notes', file: '/EME- UNIT 01.pdf' },
          { title: 'Unit 2', file: '/notes/sem2/element-of-mecnanical-engineering/eme-unit-2.pdf' },
          { title: 'Unit 3', file: '/EME UNIT - III.pdf' },
          { title: 'Unit 4', file: '/EME Unit-IV.pdf' },
          { title: 'Unit 5', file: '/EME-UNIT-5.pdf' }
        ]
      },
      {
        id: 'mefa2',
        name: 'Managerial Economics and Financial Accounting',
        image: '/mefa.jpg',
        colorClass: 'color-mefa',
        notes: [
          { title: 'Unit 1', file: '/notes/sem2/managerial-economics-and-financial-accounting/mefa-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem2/managerial-economics-and-financial-accounting/mefa-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem2/managerial-economics-and-financial-accounting/mefa-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem2/managerial-economics-and-financial-accounting/mefa-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem2/managerial-economics-and-financial-accounting/mefa-unit-5.pdf' },
        ]
      },
    ]
  },
  sem3: {
    id: 'sem3',
    name: 'Semester 3',
    subjects: [
      {
        id: 'tech_comm',
        name: 'Technical Communication',
        image: '/commu.jpg',
        colorClass: 'color-comm_skills',
        notes: [
          { title: 'PYQ 2022', file: '/pyq/sem3/TC-2022.pdf' },
          { title: 'PYQ Feb 2021', file: '/pyq/sem3/TC-Feb-2021.pdf' },
          { title: 'PYQ Dec 2019', file: '/pyq/sem3/TC-Dec-2019.pdf' }
        ]
      },
      {
        id: 'adv_maths',
        name: 'Advanced Engineering Mathematics',
        image: '/math.jpg',
        colorClass: 'color-maths',
        notes: [
          { title: 'PYQ 2026', file: '/pyq/sem3/AEM-2026.pdf' },
          { title: 'PYQ 2025', file: '/pyq/sem3/AEM-2025.pdf' },
          { title: 'PYQ 2024', file: '/pyq/sem3/AEM-2024.pdf' },
          { title: 'PYQ May 2023', file: '/pyq/sem3/AEM-May-2023.pdf' },
          { title: 'PYQ 2023 (310001)', file: '/pyq/sem3/AEM-2023.pdf' },
          { title: 'PYQ 2022 (310401)', file: '/pyq/sem3/AEM-2022.pdf' },
          { title: 'PYQ 2022 (310001)', file: '/pyq/sem3/AEM-2022-2.pdf' },
          { title: 'PYQ Feb 2021 (310001)', file: '/pyq/sem3/AEM-Feb-2021.pdf' },
          { title: 'PYQ Feb 2021 (310401)', file: '/pyq/sem3/AEM-Feb-2021-2.pdf' },
          { title: 'PYQ Dec 2019 (310401)', file: '/pyq/sem3/AEM-Dec-2019.pdf' },
          { title: 'PYQ Dec 2019 (310901)', file: '/pyq/sem3/AEM-Dec-2019-2.pdf' },
          { title: 'Unit 1', file: '/notes/sem3/adv-engineering-mathematics/aem-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem3/adv-engineering-mathematics/aem-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem3/adv-engineering-mathematics/aem-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem3/adv-engineering-mathematics/aem-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem3/adv-engineering-mathematics/aem-unit-5.pdf' },
        ]
      },
      {
        id: 'digital_elec',
        name: 'Digital Electronics',
        image: '/bee.jpg',
        colorClass: 'color-bee',
        notes: [
          { title: 'PYQ 2026', file: '/pyq/sem3/DE-2026.pdf' },
          { title: 'PYQ 2025', file: '/pyq/sem3/DE-2025.pdf' },
          { title: 'PYQ 2024', file: '/pyq/sem3/DE-2024.pdf' },
          { title: 'PYQ May 2023', file: '/pyq/sem3/DE-May-2023.pdf' },
          { title: 'PYQ 2022', file: '/pyq/sem3/DE-2022.pdf' },
          { title: 'PYQ Feb 2021', file: '/pyq/sem3/DE-Feb-2021.pdf' },
          { title: 'PYQ Dec 2019 (310404)', file: '/pyq/sem3/DE-Dec-2019.pdf' },
          { title: 'PYQ Dec 2019 (310904)', file: '/pyq/sem3/DE-Dec-2019-2.pdf' },
          { title: 'Unit 1', file: '/notes/sem3/digital-electronics/de-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem3/digital-electronics/de-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem3/digital-electronics/de-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem3/digital-electronics/de-unit-4.pdf' },
        ]
      },
      {
        id: 'dsa',
        name: 'Data Structures and Algorithms',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'PYQ 2026', file: '/pyq/sem3/DSA-2026.pdf' },
          { title: 'PYQ 2025', file: '/pyq/sem3/DSA-2025.pdf' },
          { title: 'PYQ 2024', file: '/pyq/sem3/DSA-2024.pdf' },
          { title: 'PYQ May 2023', file: '/pyq/sem3/DSA-May-2023.pdf' },
          { title: 'PYQ 2022', file: '/pyq/sem3/DSA-2022.pdf' },
          { title: 'PYQ Feb 2021', file: '/pyq/sem3/DSA-2021.pdf' },
          { title: 'PYQ Dec 2019', file: '/pyq/sem3/DSA-Dec-2019.pdf' },
          { title: 'Unit 1', file: '/notes/sem3/data-structures-algorithms/dsa-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem3/data-structures-algorithms/dsa-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem3/data-structures-algorithms/dsa-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem3/data-structures-algorithms/dsa-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem3/data-structures-algorithms/dsa-unit-5.pdf' },
        ]
      },
      {
        id: 'oop',
        name: 'Object Oriented Programming',
        image: '/com.jpg',
        colorClass: 'color-mech_eng',
        notes: [
          { title: 'PYQ 2026', file: '/pyq/sem3/OOP-2026.pdf' },
          { title: 'PYQ 2025', file: '/pyq/sem3/OOP-2025.pdf' },
          { title: 'PYQ 2024 (310406)', file: '/pyq/sem3/OOP-2024.pdf' },
          { title: 'PYQ 2024 (31N0404)', file: '/pyq/sem3/OOP-2024-2.pdf' },
          { title: 'PYQ May 2023', file: '/pyq/sem3/OOP-May-2023.pdf' },
          { title: 'PYQ 2022', file: '/pyq/sem3/OOP-2022.pdf' },
          { title: 'PYQ Feb 2021', file: '/pyq/sem3/OOP-Feb-2021.pdf' },
          { title: 'PYQ Dec 2019', file: '/pyq/sem3/OOP-Dec-2019.pdf' },
          { title: 'Unit 1', file: '/notes/sem3/oop-using-c/oop-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem3/oop-using-c/oop-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem3/oop-using-c/oop-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem3/oop-using-c/oop-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem3/oop-using-c/oop-unit-5.pdf' },
        ]
      },
      {
        id: 'software_eng',
        name: 'Software Engineering',
        image: '/bs.jpeg',
        colorClass: 'color-mefa',
        notes: [
          { title: 'PYQ 2026', file: '/pyq/sem3/SE-2026.pdf' },
          { title: 'PYQ 2025', file: '/pyq/sem3/SE-2025.pdf' },
          { title: 'PYQ 2024', file: '/pyq/sem3/SE-2024.pdf' },
          { title: 'PYQ May 2023', file: '/pyq/sem3/SE-May-2023.pdf' },
          { title: 'PYQ 2022', file: '/pyq/sem3/SE-2022.pdf' },
          { title: 'PYQ Feb 2021', file: '/pyq/sem3/SE-Feb-2021.pdf' },
          { title: 'PYQ Dec 2019', file: '/pyq/sem3/SE-Dec-2019.pdf' },
          { title: 'Unit 1', file: '/notes/sem3/software-engineering/se-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem3/software-engineering/se-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem3/software-engineering/se-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem3/software-engineering/se-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem3/software-engineering/se-unit-5.pdf' },
        ]
      },
      {
        id: 'linux_shell',
        name: 'Linux and Shell Programming',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem3/linux-and-shell-programming/lsp-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem3/linux-and-shell-programming/lsp-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem3/linux-and-shell-programming/lsp-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem3/linux-and-shell-programming/lsp-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem3/linux-and-shell-programming/lsp-unit-5.pdf' },
        ]
      },
    ]
  },
  sem4: { id: 'sem4', name: 'Semester 4', subjects: [
      {
        id: 'discrete_maths',
        name: 'Discrete Mathematics',
        image: '/math.jpg',
        colorClass: 'color-maths',
        notes: [
          { title: 'Unit 1', file: '/notes/sem4/discrete-mathematics/dm-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem4/discrete-mathematics/dm-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem4/discrete-mathematics/dm-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem4/discrete-mathematics/dm-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem4/discrete-mathematics/dm-unit-5.pdf' },
        ]
      },
      {
        id: 'mpi',
        name: 'Microprocessor and Interfaces',
        image: '/bee.jpg',
        colorClass: 'color-bee',
        notes: [
          { title: 'Unit 1', file: '/notes/sem4/microprocessor-and-interfaces/mpi-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem4/microprocessor-and-interfaces/mpi-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem4/microprocessor-and-interfaces/mpi-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem4/microprocessor-and-interfaces/mpi-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem4/microprocessor-and-interfaces/mpi-unit-5.pdf' },
        ]
      },
      {
        id: 'toc',
        name: 'Theory of Computation',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem4/theory-of-computation/toc-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem4/theory-of-computation/toc-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem4/theory-of-computation/toc-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem4/theory-of-computation/toc-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem4/theory-of-computation/toc-unit-5.pdf' },
        ]
      },
      {
        id: 'dbms',
        name: 'Database Management Systems',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem4/database-management-systems/dbms-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem4/database-management-systems/dbms-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem4/database-management-systems/dbms-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem4/database-management-systems/dbms-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem4/database-management-systems/dbms-unit-5.pdf' },
        ]
      },
      {
        id: 'python_prog',
        name: 'Python Programming',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem4/python-programming/py-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem4/python-programming/py-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem4/python-programming/py-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem4/python-programming/py-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem4/python-programming/py-unit-5.pdf' },
        ]
      },
      {
        id: 'java_prog',
        name: 'Java Programming',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem4/java-programming/jav-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem4/java-programming/jav-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem4/java-programming/jav-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem4/java-programming/jav-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem4/java-programming/jav-unit-5.pdf' },
        ]
      },
    ] },
  sem5: { id: 'sem5', name: 'Semester 5', subjects: [
      {
        id: 'os',
        name: 'Operating Systems',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/operating-systems/os-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/operating-systems/os-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/operating-systems/os-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/operating-systems/os-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/operating-systems/os-unit-5.pdf' },
        ]
      },
      {
        id: 'coa',
        name: 'Computer Org. & Architecture',
        image: '/bee.jpg',
        colorClass: 'color-bee',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/computer-org-architecture/coa-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/computer-org-architecture/coa-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/computer-org-architecture/coa-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/computer-org-architecture/coa-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/computer-org-architecture/coa-unit-5.pdf' },
        ]
      },
      {
        id: 'cn',
        name: 'Computer Networks',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/computer-networks/cn-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/computer-networks/cn-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/computer-networks/cn-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/computer-networks/cn-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/computer-networks/cn-unit-5.pdf' },
        ]
      },
      {
        id: 'cc_devops',
        name: 'Cloud Computing & DevOps',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/cloud-computing-devops/cc-dev-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/cloud-computing-devops/cc-dev-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/cloud-computing-devops/cc-dev-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/cloud-computing-devops/cc-dev-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/cloud-computing-devops/cc-dev-unit-5.pdf' },
        ]
      },
      {
        id: 'ml',
        name: 'Machine Learning',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/machine-learning/ml-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/machine-learning/ml-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/machine-learning/ml-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/machine-learning/ml-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/machine-learning/ml-unit-5.pdf' },
        ]
      },
      {
        id: 'dmw',
        name: 'Data Mining & Warehousing',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/data-mining-warehousing/dmw-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/data-mining-warehousing/dmw-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/data-mining-warehousing/dmw-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/data-mining-warehousing/dmw-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/data-mining-warehousing/dmw-unit-5.pdf' },
        ]
      },
      {
        id: 'ds_systems',
        name: 'Distributed Systems',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem5/distributed-systems/ds-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem5/distributed-systems/ds-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem5/distributed-systems/ds-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem5/distributed-systems/ds-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem5/distributed-systems/ds-unit-5.pdf' },
        ]
      },
    ] },
  sem6: { id: 'sem6', name: 'Semester 6', subjects: [
      {
        id: 'cd',
        name: 'Compiler Design',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem6/compiler-design/cd-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem6/compiler-design/cd-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem6/compiler-design/cd-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem6/compiler-design/cd-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem6/compiler-design/cd-unit-5.pdf' },
        ]
      },
      {
        id: 'daa',
        name: 'Design and Analysis of Algorithms',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem6/design-and-analysis-of-algorithms/daa-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem6/design-and-analysis-of-algorithms/daa-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem6/design-and-analysis-of-algorithms/daa-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem6/design-and-analysis-of-algorithms/daa-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem6/design-and-analysis-of-algorithms/daa-unit-5.pdf' },
        ]
      },
      {
        id: 'iss',
        name: 'Information Security Systems',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem6/information-security-systems/iss-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem6/information-security-systems/iss-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem6/information-security-systems/iss-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem6/information-security-systems/iss-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem6/information-security-systems/iss-unit-5.pdf' },
        ]
      },
      {
        id: 'dip',
        name: 'Digital Image Processing',
        image: '/com.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem6/digital-image-processing/dip-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem6/digital-image-processing/dip-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem6/digital-image-processing/dip-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem6/digital-image-processing/dip-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem6/digital-image-processing/dip-unit-5.pdf' },
        ]
      },
      {
        id: 'iot',
        name: 'Internet of Things',
        image: '/bee.jpg',
        colorClass: 'color-bee',
        notes: [
          { title: 'Unit 1', file: '/notes/sem6/internet-of-things/iot-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem6/internet-of-things/iot-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem6/internet-of-things/iot-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem6/internet-of-things/iot-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem6/internet-of-things/iot-unit-5.pdf' },
        ]
      },
      {
        id: 'nlp',
        name: 'Natural Language Processing',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem6/natural-language-processing/nlp-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem6/natural-language-processing/nlp-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem6/natural-language-processing/nlp-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem6/natural-language-processing/nlp-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem6/natural-language-processing/nlp-unit-5.pdf' },
        ]
      },
    ] },
  sem7: { id: 'sem7', name: 'Semester 7', subjects: [
      {
        id: 'dl',
        name: 'Deep Learning',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 1', file: '/notes/sem7/deep-learning/dl-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem7/deep-learning/dl-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem7/deep-learning/dl-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem7/deep-learning/dl-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem7/deep-learning/dl-unit-5.pdf' },
        ]
      },
      {
        id: 'disaster_mgmt',
        name: 'Disaster Management',
        image: '/bs.jpeg',
        colorClass: 'color-mefa',
        notes: [
          { title: 'Unit 1', file: '/notes/sem7/disaster-management/dm-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem7/disaster-management/dm-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem7/disaster-management/dm-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem7/disaster-management/dm-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem7/disaster-management/dm-unit-5.pdf' },
        ]
      },
      {
        id: 'gen_ai',
        name: 'Generative AI',
        image: '/dsa.jpg',
        colorClass: 'color-computer',
        notes: [
          { title: 'Unit 2', file: '/notes/sem7/generative-ai/gai-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem7/generative-ai/gai-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem7/generative-ai/gai-unit-4.pdf' },
        ]
      },
    ] },
  sem8: { id: 'sem8', name: 'Semester 8', subjects: [
      {
        id: 'fhi',
        name: 'FHI Subject',
        image: '/bs.jpeg',
        colorClass: 'color-mefa',
        notes: [
          { title: 'Unit 1', file: '/notes/sem8/fhi-subject/fhi-unit-1.pdf' },
          { title: 'Unit 2', file: '/notes/sem8/fhi-subject/fhi-unit-2.pdf' },
          { title: 'Unit 3', file: '/notes/sem8/fhi-subject/fhi-unit-3.pdf' },
          { title: 'Unit 4', file: '/notes/sem8/fhi-subject/fhi-unit-4.pdf' },
          { title: 'Unit 5', file: '/notes/sem8/fhi-subject/fhi-unit-5.pdf' },
          { title: 'Unit 6', file: '/notes/sem8/fhi-subject/fhi-unit-6.pdf' },
          { title: 'Unit 7', file: '/notes/sem8/fhi-subject/fhi-unit-7.pdf' },
        ]
      },
    ] }
};
