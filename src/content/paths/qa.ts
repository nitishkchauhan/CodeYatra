import { docs, gitStop, interviewStop } from './shared';
import type { CareerPath } from './types';

export const QA: CareerPath = {
  id: 'qa',
  title: 'QA / Test Engineer',
  tagline: 'Catch bugs before users do, by hand and with code',
  job: 'Plans and runs tests on apps and websites, writes automated tests that run on every change, and works with developers so releases go out without bugs.',
  months: '5–7 months',
  icon: 'M9 3h6 M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3 M8 14h8',
  color: '#A16207',
  ink: '#854D0E',
  soft: '#FEF6D8',
  sections: [
    {
      title: 'Programming',
      stops: [
        {
          id: 'logic',
          title: 'Think like a programmer',
          why: 'Loops, conditions and functions, so you can read the code you test.',
          modules: ['f-seq-1', 'f-var-1', 'f-loop-1', 'f-if-1'],
        },
        {
          id: 'java',
          title: 'Java',
          why: 'The most used language for test automation in Indian companies.',
          choice: 'Language',
          modules: ['jv-hello', 'jv-vars', 'jv-if', 'jv-loops', 'jv-methods', 'jv-classes', 'jv-collections'],
        },
        {
          id: 'python',
          title: 'Python',
          why: 'A simpler choice, used with pytest and Playwright.',
          choice: 'Language',
          modules: ['p-var-1', 'p-loop-1', 'p-fn-1', 'p-dict-1', 'p-class-1', 'p-err-1'],
        },
      ],
    },
    {
      title: 'Testing fundamentals',
      stops: [
        {
          id: 'basics',
          title: 'Testing basics',
          why: 'Test cases, bug reports, test levels and types: the vocabulary of every QA team.',
          links: [docs('ISTQB Foundation Level', 'https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/')],
        },
        {
          id: 'web-basics',
          title: 'How web pages work',
          why: 'Read HTML and use the browser’s tools to find what broke.',
          modules: ['w-html-1', 'h-form-1', 'h-inputs-1'],
        },
        { id: 'sql', title: 'SQL for testers', why: 'Check that the right data was saved after each test.', modules: ['sql-select', 'sql-where', 'sql-join'] },
      ],
    },
    {
      title: 'Pick an automation tool',
      stops: [
        {
          id: 'selenium',
          title: 'Selenium',
          why: 'The long-standing standard for browser automation, most common in job posts.',
          choice: 'Automation tool',
          links: [docs('Selenium documentation', 'https://www.selenium.dev/documentation/')],
        },
        {
          id: 'playwright',
          title: 'Playwright',
          why: 'Modern, fast and reliable browser automation from Microsoft.',
          choice: 'Automation tool',
          links: [docs('Playwright intro', 'https://playwright.dev/docs/intro')],
        },
        {
          id: 'cypress',
          title: 'Cypress',
          why: 'Popular for testing JavaScript web apps.',
          choice: 'Automation tool',
          links: [docs('Cypress docs', 'https://docs.cypress.io/')],
        },
      ],
    },
    {
      title: 'More testing',
      stops: [
        {
          id: 'api',
          title: 'API testing with Postman',
          why: 'Test the server directly: send requests and check responses.',
          modules: ['n-json-1', 'n-rest-1'],
          links: [docs('Postman learning center', 'https://learning.postman.com/docs/introduction/overview/')],
        },
        {
          id: 'unit',
          title: 'Unit tests',
          why: 'Small automatic tests developers write, which QA reviews and extends.',
          links: [docs('pytest getting started', 'https://docs.pytest.org/en/stable/getting-started.html')],
        },
        gitStop,
        {
          id: 'ci',
          title: 'Tests in CI',
          why: 'Run your tests automatically on every change.',
          optional: true,
          links: [docs('GitHub Actions docs', 'https://docs.github.com/en/actions')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'project',
          title: 'Project: a test suite',
          why: 'Write manual test cases and an automated suite for a demo shop website, and put it on GitHub.',
          project: true,
          links: [docs('Playwright intro', 'https://playwright.dev/docs/intro')],
        },
        interviewStop('Testing theory, writing test cases on the spot, and a short automation or SQL task.'),
      ],
    },
  ],
};
