import { course, docs, dsaBasicsStop, gitStop, interviewStop, SQL_BASICS, SQL_MORE, webStop } from './shared';
import type { CareerPath } from './types';

export const FULLSTACK: CareerPath = {
  id: 'fullstack',
  title: 'Full-Stack Developer',
  tagline: 'Build complete apps, from the screen to the database',
  job: 'Builds both the part users see and the server behind it. Common in startups, where one developer often ships a whole feature end to end.',
  months: '9–12 months',
  icon: 'M3 5h18v10H3z M8 19h8 M12 15v4 M7 9l2 2-2 2 M12 13h4',
  color: '#7C3AED',
  ink: '#6227C9',
  soft: '#F1EAFE',
  sections: [
    { title: 'Before you start', stops: [webStop] },
    {
      title: 'Frontend',
      stops: [
        {
          id: 'html',
          title: 'HTML',
          why: 'The structure of every page: text, links, lists, tables and forms.',
          modules: ['w-html-1', 'w-html-2', 'h-attr-1', 'h-list-1', 'h-form-1', 'h-sem-1'],
        },
        {
          id: 'css',
          title: 'CSS and layout',
          why: 'Colours, the box model, Flexbox, Grid and responsive design.',
          modules: ['w-css-1', 'c-sel-1', 'c-box-1', 'c-flex-1', 'c-grid-1', 'c-resp-1'],
        },
        {
          id: 'js',
          title: 'JavaScript',
          why: 'The one language that runs in the browser and on the server, so you learn it once for both.',
          modules: ['j-var-1', 'j-cond-1', 'w-js-1', 'j-arr-1', 'j-arrow-1', 'j-obj-1', 'j-dom-1', 'j-async-1'],
        },
        {
          id: 'react',
          title: 'React',
          why: 'Build interfaces from components with state, effects and context.',
          modules: ['r-comp-1', 'r-state-1', 'r-cond-1', 'r-list-1', 'r-event-1', 'r-effect-1', 'r-hooks-1', 'r-context-1'],
        },
      ],
    },
    {
      title: 'Backend',
      stops: [
        {
          id: 'node',
          title: 'Node.js and Express',
          why: 'Run JavaScript on the server and build routes with middleware.',
          modules: ['n-intro-1', 'n-npm-1', 'n-async-1', 'n-express-1', 'n-middleware-1'],
        },
        { id: 'apis', title: 'REST APIs', why: 'Connect your React app to your server with JSON APIs.', modules: ['n-json-1', 'n-api-1', 'n-rest-1', 'n-env-1'] },
        { id: 'sql', title: 'SQL databases', why: 'Store users, posts and orders in tables, and query them.', modules: [...SQL_BASICS, ...SQL_MORE] },
        {
          id: 'auth',
          title: 'Login and security',
          why: 'Sign-up, login, sessions and the common attacks every full-stack developer must block.',
          links: [docs('OWASP Top 10', 'https://owasp.org/www-project-top-ten/')],
        },
      ],
    },
    {
      title: 'Frameworks and tools',
      stops: [
        {
          id: 'nextjs',
          title: 'Next.js',
          why: 'Frontend and backend in one React framework, with routing, server actions and API routes.',
          modules: ['nx-1', 'nx-link-1', 'nx-layout-1', 'nx-dyn-1', 'nx-meta-1', 'nx-data-1', 'nx-loading-1', 'nx-api-1', 'nx-actions-1', 'nx-deploy-1'],
        },
        gitStop,
        {
          id: 'typescript',
          title: 'TypeScript',
          why: 'Types catch mistakes before you run the code. Most full-stack job posts ask for it.',
          optional: true,
          links: [docs('TypeScript handbook', 'https://www.typescriptlang.org/docs/handbook/intro.html')],
        },
      ],
    },
    {
      title: 'Projects',
      stops: [
        { id: 'project-todo', title: 'Project: a to-do app', why: 'A frontend warm-up: add, tick and delete tasks.', modules: ['proj-todo'], project: true },
        {
          id: 'project-full',
          title: 'Project: a full-stack app',
          why: 'React frontend, Node or Next.js backend, a database and login, deployed online. Your main portfolio piece.',
          project: true,
          links: [course('Full Stack Open', 'https://fullstackopen.com/en/', 'Free course')],
        },
        {
          id: 'deploy',
          title: 'Deploy it',
          why: 'Put the frontend and backend online with a link you can share.',
          links: [docs('Deploy on Vercel', 'https://vercel.com/docs/getting-started-with-vercel')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [dsaBasicsStop, interviewStop('Walk through your full-stack project, and answer React, Node.js and SQL questions.')],
    },
  ],
};
