import { logicStop, PYTHON_FOUNDATIONS } from './shared';
import type { CareerPath } from './types';

const [VAR, NUM, STR, IF, FOR, WHILE, LIST, DICT, FN, ERR, FILE, CLASS, PROJECT] = PYTHON_FOUNDATIONS;

/** The shared start of every path: one complete course, every stop a module in the app. */
export const PYTHON_FOUNDATIONS_PATH: CareerPath = {
  id: 'python',
  title: 'Python Foundations',
  tagline: 'Start here: write real programs, from print() to classes',
  job: 'Not a job on its own: the first step to every tech job. You learn to write, run and fix real Python programs, the language used most in data, AI and placement coding rounds.',
  months: '1–2 months',
  icon: 'M9 3h6a3 3 0 0 1 3 3v4H9a3 3 0 0 0-3 3v2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4V6a3 3 0 0 1 0-3z M15 21H9a3 3 0 0 1-3-3v-4h9a3 3 0 0 0 3-3V9h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4v1a3 3 0 0 1 0 3z',
  color: '#3776AB',
  ink: '#2B5E89',
  soft: '#E6F0F8',
  level: 'Beginner',
  before: 'Nothing',
  keywords: 'programming basics first language start',
  sections: [
    {
      title: 'The basics',
      stops: [
        logicStop,
        { id: 'first', needs: [], title: 'Your first program', why: 'print() and variables: store a value, use it, change it.', modules: [VAR] },
        { id: 'numbers', needs: ['first'], title: 'Numbers and maths', why: 'Do sums, split things into groups and leftovers, and turn text into numbers.', modules: [NUM] },
        { id: 'text', needs: ['numbers'], title: 'Text and f-strings', why: 'Build messages with values inside and tidy up text people type.', modules: [STR] },
        { id: 'decisions', needs: ['text'], title: 'Making decisions', why: 'Compare values and choose what happens next with if, elif and else.', modules: [IF] },
      ],
    },
    {
      title: 'Repeat and collect',
      stops: [
        { id: 'for', needs: ['decisions'], title: 'for loops and range()', why: 'Repeat work a set number of times, and keep running totals.', modules: [FOR] },
        { id: 'while', needs: ['for'], title: 'while loops', why: 'Keep going until something is true, and stop early with break.', modules: [WHILE] },
        { id: 'lists', needs: ['while'], title: 'Lists', why: 'Keep many values in order, change them and loop over them.', modules: [LIST] },
        { id: 'dicts', needs: ['lists'], title: 'Dictionaries', why: 'Look values up by name, like prices on a menu, and count things.', modules: [DICT] },
      ],
    },
    {
      title: 'Organise your code',
      stops: [
        { id: 'functions', needs: ['dicts'], title: 'Functions', why: 'Write code once and reuse it with different inputs.', modules: [FN] },
        { id: 'errors', needs: ['functions'], title: 'Handling errors', why: 'Read error messages and keep programs running when input is bad.', modules: [ERR] },
        { id: 'files', needs: ['errors'], title: 'Files', why: 'Save data so it is still there the next time your program runs.', modules: [FILE] },
        { id: 'classes', needs: ['files'], title: 'Classes and objects', why: 'Make your own types, like a Train or a Wallet, with their own data and actions.', modules: [CLASS] },
      ],
    },
    {
      title: 'Build it',
      stops: [
        {
          id: 'project',
          needs: ['classes'],
          title: 'Project: canteen billing app',
          why: 'A menu, an order, a discount, GST and a receipt, built in four tested steps. Finish it to earn your certificate.',
          modules: [PROJECT],
          project: true,
        },
      ],
    },
  ],
};
