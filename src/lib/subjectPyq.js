// Maps a notes subject (notesData id) to the PYQ Finder subject name(s)
// for the same subject, so "Get PYQ" can open the PYQ view pre-filtered.
// Subjects with no PYQ papers map to [] — the button is hidden for them.
import { pyqPapers } from '../data/pyqData';

export const PYQ_SUBJECTS = {
  // Semester 1
  computer: ['Computer Fundamentals and Programming'],
  chemistry: ['Engineering Chemistry'],
  maths: ['Engineering Mathematics-1'],
  bee: ['Basic Electrical Engineering'],
  mefa: ['Managerial Economics and Financial Accounting'],
  practical: [],
  midsem: [],
  // Semester 2
  comm_skills: ['Communication Skills'],
  built_env: ['Introduction to Built Environment'],
  physics: ['Engineering Physics'],
  maths2: ['Engineering Mathematics-2'],
  mech_eng: ['Elements of Mechanical Engineering', 'Mechanical Engineering'],
  mefa2: ['Managerial Economics and Financial Accounting'],
  // Semester 3
  tech_comm: ['Technical Communication'],
  adv_maths: ['Advanced Engineering Mathematics'],
  digital_elec: ['Digital Electronics'],
  dsa: ['Data Structures and Algorithms'],
  oop: ['Object Oriented Programming'],
  software_eng: ['Software Engineering'],
  linux_shell: ['Linux and Shell Programming'],
  // Semester 4
  discrete_maths: ['Discrete Mathematics', 'Discrete Mathematics Structure'],
  mpi: ['Microprocessor and Interfaces'],
  toc: ['Theory of Computation'],
  dbms: ['Database Management System'],
  python_prog: ['Introduction to Python Programming'],
  java_prog: ['Introduction to Java Programming'],
  // Semester 5
  os: ['Operating Systems'],
  coa: ['Computer Organization and Architecture'],
  cn: ['Computer Networks'],
  cc_devops: ['Cloud Computing and DevOps Tools'],
  ml: ['Machine Learning', 'Machine Learning and Its Applications'],
  dmw: ['Data Mining and Warehousing'],
  ds_systems: ['Distributed Systems'],
  // Semester 6
  cd: ['Compiler Design'],
  daa: ['Design and Analysis of Algorithms'],
  iss: ['Information Security Systems'],
  dip: ['Digital Image Processing'],
  iot: ['Introduction to Internet of Things', 'Internet of Things'],
  nlp: ['Natural Language Processing'],
  // Semester 7
  dl: ['Deep Learning'],
  disaster_mgmt: [],
  gen_ai: ['Generative AI'],
  // Semester 8
  fhi: [],
};

export function pyqSubjectsFor(subjectId) {
  return PYQ_SUBJECTS[subjectId] || [];
}

export function pyqCountFor(subjectId) {
  const names = pyqSubjectsFor(subjectId);
  if (names.length === 0) return 0;
  return pyqPapers.filter((p) => names.includes(p.subject)).length;
}

// Newest PYQ year for a subject (0 when it has none) — used by the
// "Recently added" sort on the subjects grid.
export function latestPyqYear(subjectId) {
  const names = pyqSubjectsFor(subjectId);
  let y = 0;
  for (const p of pyqPapers) {
    if (names.includes(p.subject) && p.year > y) y = p.year;
  }
  return y;
}
