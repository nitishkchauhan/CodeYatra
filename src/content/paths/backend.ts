import { course, docs, dsaBasicsStop, gitStop, interviewStop, linuxStop, logicStop, SQL_BASICS, SQL_MORE, webStop } from './shared';
import type { CareerPath } from './types';

export const BACKEND: CareerPath = {
  id: 'backend',
  title: 'Backend Developer',
  tagline: 'Build the servers, APIs and databases behind every app',
  job: 'Writes the server code that stores data, checks logins and answers every tap in an app. Designs APIs and databases and keeps them fast and secure.',
  months: '7–9 months',
  icon: 'M4 5h16v5H4z M4 14h16v5H4z M8 7.5h.01 M8 16.5h.01',
  color: '#3C873A',
  ink: '#2D6A2C',
  soft: '#E8F4E7',
  sections: [
    { title: 'Before you start', stops: [webStop, logicStop] },
    {
      title: 'JavaScript',
      stops: [
        {
          id: 'js-basics',
          title: 'JavaScript basics',
          why: 'Variables, conditions and functions, in the language Node.js runs.',
          modules: ['j-var-1', 'j-cond-1', 'w-js-1'],
        },
        { id: 'js-data', title: 'Arrays and objects', why: 'Almost all server work is shaping lists and objects of data.', modules: ['j-arr-1', 'j-arrow-1', 'j-obj-1'] },
        {
          id: 'js-async',
          title: 'Async code and errors',
          why: 'Servers wait on databases and other services all the time. async/await keeps them responsive.',
          modules: ['j-async-1', 'j-error-1', 'j-class-1'],
        },
      ],
    },
    {
      title: 'Node.js',
      stops: [
        {
          id: 'node-basics',
          title: 'Node.js basics',
          why: 'Run JavaScript on a server, use npm packages and work with files.',
          modules: ['n-intro-1', 'n-npm-1', 'n-async-1', 'n-fs-1'],
        },
        {
          id: 'express',
          title: 'Express and middleware',
          why: 'The most used Node.js web framework: routes, requests, responses and middleware.',
          modules: ['n-express-1', 'n-middleware-1'],
          links: [docs('Express guide', 'https://expressjs.com/en/starter/installing.html')],
        },
        {
          id: 'apis',
          title: 'REST APIs and JSON',
          why: 'How apps talk to servers: endpoints, HTTP methods, status codes and JSON.',
          modules: ['n-json-1', 'n-api-1', 'n-rest-1'],
        },
        { id: 'env', title: 'Config and secrets', why: 'Keep passwords and keys out of your code with environment variables.', modules: ['n-env-1'] },
      ],
    },
    {
      title: 'Databases',
      stops: [
        { id: 'sql-basics', title: 'SQL basics', why: 'Read data with SELECT, filter, sort and group. Asked in nearly every backend interview.', modules: SQL_BASICS },
        {
          id: 'sql-more',
          title: 'Joins and database design',
          why: 'Combine tables, change data safely and design tables that stay fast as data grows.',
          modules: SQL_MORE,
        },
        {
          id: 'mongodb',
          title: 'MongoDB',
          why: 'A popular document database, common in MERN-stack startups.',
          optional: true,
          links: [course('MongoDB University', 'https://learn.mongodb.com/', 'Free')],
        },
      ],
    },
    {
      title: 'Security and tools',
      stops: [
        {
          id: 'auth',
          title: 'Authentication and security',
          why: 'Passwords, sessions and tokens, plus the most common attacks on web servers and how to stop them.',
          links: [docs('OWASP Top 10', 'https://owasp.org/www-project-top-ten/'), docs('Introduction to JWT', 'https://jwt.io/introduction')],
        },
        gitStop,
        linuxStop,
        {
          id: 'docker',
          title: 'Docker',
          why: 'Package your server so it runs the same on your laptop and in the cloud.',
          optional: true,
          links: [docs('Docker get started', 'https://docs.docker.com/get-started/')],
        },
      ],
    },
    {
      title: 'Build and ship',
      stops: [
        {
          id: 'project-api',
          title: 'Project: a REST API with a database',
          why: 'Build an API for a to-do or notes app with sign-up, login and saved data. The project interviewers ask about.',
          project: true,
          links: [course('Back End Development and APIs (freeCodeCamp)', 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', 'Free')],
        },
        {
          id: 'deploy',
          title: 'Deploy your API',
          why: 'Put your server online so a frontend or app can use it.',
          links: [docs('Render docs', 'https://render.com/docs')],
        },
        {
          id: 'system-design',
          title: 'System design basics',
          why: 'Caching, load balancing and scaling: what senior interviews ask, and good to start early.',
          optional: true,
          links: [docs('System Design Primer', 'https://github.com/donnemartin/system-design-primer')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [dsaBasicsStop, interviewStop('Explain your API project, answer SQL and Node.js questions, and practise a DSA round.')],
    },
  ],
};
