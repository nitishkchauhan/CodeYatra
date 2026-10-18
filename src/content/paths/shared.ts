// Link helpers and stops that several career paths share.
import type { PathLink, PathStop } from './types';

export const docs = (label: string, url: string, note?: string): PathLink => ({ label, url, kind: 'docs', note });
export const course = (label: string, url: string, note?: string): PathLink => ({ label, url, kind: 'course', note });
export const video = (label: string, url: string, note?: string): PathLink => ({ label, url, kind: 'video', note });
export const practice = (label: string, url: string, note?: string): PathLink => ({ label, url, kind: 'practice', note });

export const HINDI_CHANNELS = [
  video('CodeWithHarry', 'https://www.youtube.com/@CodeWithHarry', 'Hindi'),
  video('Apna College', 'https://www.youtube.com/@ApnaCollegeOfficial', 'Hindi'),
];

/** Python Foundations: 12 modules, then the project. */
export const PYTHON_FOUNDATIONS = ['p-var-1', 'p-num-1', 'p-str-1', 'p-if-1', 'p-loop-1', 'p-while-1', 'p-loop-2', 'p-dict-1', 'p-fn-1', 'p-err-1', 'p-file-1', 'p-class-1', 'p-project'];
export const PYTHON_BASICS = PYTHON_FOUNDATIONS.slice(0, 9);
export const PYTHON_MORE = PYTHON_FOUNDATIONS.slice(9);
export const SQL_BASICS = ['sql-select', 'sql-where', 'sql-patterns', 'sql-order', 'sql-agg', 'sql-group'];
export const SQL_MORE = ['sql-join', 'sql-left', 'sql-sub', 'sql-window', 'sql-change', 'sql-design', 'sql-project'];
export const GIT = ['git-why', 'git-init', 'git-commit', 'git-history', 'git-branch', 'git-merge', 'git-remote', 'git-pr', 'git-ignore', 'git-undo'];

export const webStop: PathStop = {
  id: 'web',
  title: 'How the internet works',
  why: 'Browsers, servers, DNS and HTTP: what really happens when you open a website. Every web job builds on this.',
  links: [
    docs('How the web works (MDN)', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works'),
    docs('Cloudflare Learning Center', 'https://www.cloudflare.com/learning/'),
  ],
};

export const gitStop: PathStop = {
  id: 'git',
  title: 'Git and GitHub',
  why: 'Save versions of your code, work in a team and show your work on GitHub. Every company uses it.',
  modules: GIT,
};

export const linuxStop: PathStop = {
  id: 'linux',
  title: 'Linux and the command line',
  why: 'Most servers run Linux. Moving around folders, editing files and running programs from a terminal is an everyday skill.',
  links: [course('The Linux command line for beginners (Ubuntu)', 'https://ubuntu.com/tutorials/command-line-for-beginners', 'Free')],
};

export const logicStop: PathStop = {
  id: 'logic',
  title: 'Think like a programmer',
  why: 'Sequences, loops, conditions and functions with puzzles, before any syntax. Skip it if you have coded before.',
  modules: ['f-seq-1', 'f-var-1', 'f-loop-1', 'f-if-1', 'f-fn-1'],
  optional: true,
};

export const dsaBasicsStop: PathStop = {
  id: 'dsa-basics',
  title: 'DSA for interviews',
  why: 'Big-O, searching, sorting and hashing: the coding round in almost every Indian company’s hiring process.',
  modules: ['dsa-bigo', 'dsa-linear', 'dsa-binary', 'dsa-sort', 'dsa-hash'],
};

export const interviewStop = (why: string): PathStop => ({
  id: 'interviews',
  title: 'Interview preparation',
  why,
  links: HINDI_CHANNELS,
});
