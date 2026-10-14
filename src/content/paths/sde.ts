import { docs, practice, SQL_BASICS, video } from './shared';
import type { CareerPath } from './types';

export const SDE: CareerPath = {
  id: 'sde',
  title: 'Software Engineer (Placements)',
  tagline: 'Crack campus placements and product-company interviews',
  job: 'Writes and maintains software at a product or service company. Getting in means clearing an aptitude test, coding rounds on DSA, and interviews on CS fundamentals.',
  months: '6–10 months',
  icon: 'M12 3l9 4.5-9 4.5-9-4.5z M6 10v5c3 2.5 9 2.5 12 0v-5 M21 7.5v5',
  color: '#2563EB',
  ink: '#1D4FD8',
  soft: '#E8EFFD',
  sections: [
    {
      title: 'Pick one language',
      stops: [
        {
          id: 'lang-c',
          title: 'C',
          why: 'Classic for written tests and output questions; teaches how memory really works.',
          modules: ['c-hello', 'c-vars', 'c-if', 'c-loops', 'c-func', 'c-arrays', 'c-strings', 'c-pointers', 'c-struct', 'c-memory'],
          choice: 'Language',
        },
        {
          id: 'lang-java',
          title: 'Java',
          why: 'The most common interview language in Indian service and product companies.',
          modules: ['jv-hello', 'jv-vars', 'jv-if', 'jv-loops', 'jv-methods', 'jv-arrays', 'jv-strings', 'jv-classes', 'jv-oop', 'jv-collections'],
          choice: 'Language',
        },
        {
          id: 'lang-python',
          title: 'Python',
          why: 'The shortest code for DSA rounds; great if you want to move fast.',
          modules: ['p-var-1', 'p-str-1', 'p-loop-1', 'p-loop-2', 'p-comp-1', 'p-fn-1', 'p-dict-1', 'p-class-1', 'p-err-1', 'p-ps-1'],
          choice: 'Language',
        },
      ],
    },
    {
      title: 'Problem solving',
      stops: [
        {
          id: 'classics',
          title: 'Classic coding questions',
          why: 'FizzBuzz, reversing, primes, second largest and anagrams: asked in almost every first round.',
          modules: ['pl-fizzbuzz', 'pl-reverse', 'pl-prime', 'pl-second', 'pl-anagram'],
        },
        { id: 'outputs', title: 'Find-the-output questions', why: 'Tricky C and Python output questions from written tests.', modules: ['pl-output-c', 'pl-output-py'] },
      ],
    },
    {
      title: 'Data structures and algorithms',
      stops: [
        {
          id: 'dsa-core',
          title: 'Complexity, searching and sorting',
          why: 'Big-O and the searching and sorting ideas every other topic builds on.',
          modules: ['dsa-bigo', 'dsa-linear', 'dsa-binary', 'dsa-sort', 'pl-complexity'],
        },
        {
          id: 'dsa-structures',
          title: 'Stacks, queues, hashing, linked lists',
          why: 'The data structures behind half of all interview questions.',
          modules: ['dsa-stack', 'dsa-queue', 'dsa-hash', 'dsa-linked', 'dsa-pointers', 'dsa-recursion'],
        },
        {
          id: 'trees',
          title: 'Trees and heaps',
          why: 'Binary trees, BSTs and heaps: favourites of product-company interviews.',
          modules: ['dsa2-tree', 'dsa2-bst', 'dsa2-heap'],
        },
        {
          id: 'graphs',
          title: 'Graphs and backtracking',
          why: 'BFS, DFS and backtracking for grid, path and puzzle problems.',
          modules: ['dsa2-bfs', 'dsa2-dfs', 'dsa2-backtrack'],
        },
        {
          id: 'dp',
          title: 'Dynamic programming and greedy',
          why: 'The topic that separates good candidates from great ones.',
          modules: ['dsa2-dp1', 'dsa2-dp2', 'dsa2-greedy', 'dsa2-merge'],
        },
        {
          id: 'leetcode',
          title: 'Practise daily',
          why: 'Solve one or two problems a day on a judge, by topic, to build speed.',
          links: [practice('LeetCode problem set', 'https://leetcode.com/problemset/'), practice('GeeksforGeeks practice', 'https://www.geeksforgeeks.org/explore')],
        },
      ],
    },
    {
      title: 'CS fundamentals',
      stops: [
        {
          id: 'oop',
          title: 'Object-oriented programming',
          why: 'Classes, inheritance and polymorphism, asked in every technical interview.',
          modules: ['pl-oops', 'jv-oop'],
        },
        { id: 'dbms', title: 'DBMS and SQL', why: 'Keys, normalisation, transactions and SQL queries.', modules: [...SQL_BASICS, 'sql-join', 'pl-sql'] },
        {
          id: 'os-cn',
          title: 'Operating systems and networks',
          why: 'Processes, threads, memory, deadlocks, and how the internet works: standard interview theory.',
          links: [
            video('Gate Smashers', 'https://www.youtube.com/@GateSmashers', 'Hindi'),
            docs('Operating systems (GeeksforGeeks)', 'https://www.geeksforgeeks.org/operating-systems/'),
          ],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'aptitude',
          title: 'Aptitude and reasoning',
          why: 'The first filter in most campus drives: quant, logic and verbal.',
          links: [practice('IndiaBIX aptitude', 'https://www.indiabix.com/')],
        },
        {
          id: 'project',
          title: 'One solid project',
          why: 'A project you can explain well beats five copied ones. Build something useful and put it on GitHub.',
          project: true,
          modules: ['proj-todo'],
        },
        {
          id: 'mock',
          title: 'Mock interviews',
          why: 'Practise explaining your solution out loud while you code. Use the mock tests in the Practice tab for timed rounds.',
          links: [video('Apna College', 'https://www.youtube.com/@ApnaCollegeOfficial', 'Hindi'), video('take U forward', 'https://www.youtube.com/@takeUforward')],
        },
      ],
    },
  ],
};
