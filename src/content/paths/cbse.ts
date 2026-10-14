import { docs } from './shared';
import type { CareerPath } from './types';

export const CBSE_PATH: CareerPath = {
  id: 'cbse',
  title: 'CBSE Computer Science (11–12)',
  tagline: 'Score well in board exams and get ahead for college',
  job: 'Not a job yet: this path takes a Class 11–12 student through the CBSE Computer Science syllabus in Python, then shows what to learn next for engineering or BCA.',
  months: '2 school years',
  icon: 'M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z M4 21V5 M8 7h6 M8 11h6',
  color: '#0F766E',
  ink: '#0E6B63',
  soft: '#DDF5F2',
  sections: [
    {
      title: 'Class 11',
      stops: [
        { id: 'types', title: 'Python basics and data types', why: 'Tokens, data types, operators and expressions: the start of the syllabus.', modules: ['cbse-types'] },
        { id: 'flow', title: 'Flow of control', why: 'if-else and loops, asked in every board paper.', modules: ['cbse-flow'] },
        { id: 'strings', title: 'Strings', why: 'Slicing and string methods, a favourite of find-the-output questions.', modules: ['cbse-strings'] },
        { id: 'lists', title: 'Lists, tuples and dictionaries', why: 'Store and process collections of data.', modules: ['cbse-lists', 'cbse-dict'] },
      ],
    },
    {
      title: 'Class 12',
      stops: [
        { id: 'functions', title: 'Functions', why: 'Parameters, return values and scope.', modules: ['cbse-functions'] },
        { id: 'exceptions', title: 'Exception handling', why: 'try-except-finally and common errors.', modules: ['cbse-exceptions'] },
        { id: 'files', title: 'File handling', why: 'Text, binary and CSV files: a big part of the practical exam.', modules: ['cbse-files'] },
        { id: 'stack', title: 'Data structures: stack', why: 'Push and pop with lists, a regular 3-mark question.', modules: ['cbse-stack'] },
        {
          id: 'networks',
          title: 'Computer networks',
          why: 'Network types, topologies, devices and protocols: theory marks you can bank.',
          links: [docs('NCERT textbooks', 'https://ncert.nic.in/textbook.php')],
        },
        {
          id: 'sql',
          title: 'Databases and SQL',
          why: 'Relational model, SQL queries and Python–MySQL connectivity.',
          modules: ['cbse-sql', 'sql-select', 'sql-where', 'sql-group', 'sql-join'],
        },
      ],
    },
    {
      title: 'Board exam',
      stops: [
        {
          id: 'papers',
          title: 'Sample papers and marking schemes',
          why: 'Solve CBSE’s official sample papers under time; the pattern repeats every year.',
          links: [docs('CBSE Academic (sample papers)', 'https://cbseacademic.nic.in/')],
        },
        {
          id: 'practical',
          title: 'Practical file and project',
          why: 'Programs for your practical file and a small Python–SQL project for the viva.',
          project: true,
          modules: ['proj-guess'],
        },
      ],
    },
    {
      title: 'Beyond the board',
      stops: [
        {
          id: 'dsa',
          title: 'Start DSA early',
          why: 'Searching, sorting and Big-O give you a head start for college placements.',
          modules: ['dsa-bigo', 'dsa-linear', 'dsa-binary', 'dsa-sort'],
          optional: true,
        },
        {
          id: 'web',
          title: 'Build a website',
          why: 'HTML and CSS let you make something you can show friends this weekend.',
          modules: ['w-html-1', 'w-html-2', 'w-css-1'],
          optional: true,
        },
      ],
    },
  ],
};
