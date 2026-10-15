import type { CareerPath } from './types';

export const FRONTEND: CareerPath = {
  id: 'frontend',
  title: 'Frontend Developer',
  tagline: 'Build the websites and apps people see and tap',
  job: 'Turns designs into fast, accessible web pages and apps with HTML, CSS, JavaScript and React. Works with designers and backend developers on everything a user sees.',
  months: '6–8 months',
  icon: 'M3 5h18v14H3z M3 9h18 M6.5 7h.01 M9 7h.01',
  color: '#E34F26',
  ink: '#B03A16',
  soft: '#FDEDE7',
  sections: [
    {
      title: 'Before you start',
      stops: [
        {
          id: 'web',
          title: 'How the web works',
          why: 'What happens between typing a website address and seeing the page: browsers, servers, DNS and HTTP. Every frontend bug is easier once this clicks.',
          links: [
            {
              label: 'How the web works (MDN)',
              url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works',
              kind: 'docs',
            },
            { label: 'How DNS works (comic)', url: 'https://howdns.works/', kind: 'docs' },
          ],
        },
        {
          id: 'logic',
          title: 'Think like a programmer',
          why: 'Sequences, loops, conditions and functions with puzzles, before any syntax. Skip it if you have coded before.',
          modules: ['f-seq-1', 'f-var-1', 'f-loop-1', 'f-if-1', 'f-fn-1'],
          optional: true,
        },
      ],
    },
    {
      title: 'HTML',
      stops: [
        {
          id: 'html-basics',
          title: 'HTML basics',
          why: 'Tags, attributes and the head of a page: the skeleton every website is built on.',
          modules: ['w-html-1', 'w-html-2', 'h-attr-1', 'h-head-1'],
        },
        { id: 'html-content', title: 'Lists and tables', why: 'Structure real content: menus, steps, timetables and price lists.', modules: ['h-list-1', 'h-table-1'] },
        { id: 'html-forms', title: 'Forms and inputs', why: 'Sign-up, login and search boxes: how pages collect what users type.', modules: ['h-form-1', 'h-inputs-1'] },
        {
          id: 'html-semantic',
          title: 'Semantic HTML and accessibility',
          why: 'Using the right tag for the job so screen readers, search engines and every user can understand your page.',
          modules: ['h-sem-1', 'h-a11y-1'],
          links: [{ label: 'Learn accessibility (web.dev)', url: 'https://web.dev/learn/accessibility', kind: 'course' }],
        },
      ],
    },
    {
      title: 'CSS',
      stops: [
        {
          id: 'css-basics',
          title: 'CSS basics',
          why: 'Selectors, colours, text and the box model: how every element gets its look and size.',
          modules: ['w-css-1', 'c-sel-1', 'c-text-1', 'c-box-1'],
        },
        {
          id: 'css-layout',
          title: 'Layout: Flexbox, Grid, position',
          why: 'Put things side by side, in grids and on top of each other. The skill interviewers test most in CSS.',
          modules: ['c-flex-1', 'c-grid-1', 'c-pos-1'],
          links: [{ label: 'Learn CSS (web.dev)', url: 'https://web.dev/learn/css', kind: 'course' }],
        },
        {
          id: 'css-responsive',
          title: 'Responsive design',
          why: 'One page that works on a ₹8,000 phone and a laptop, with media queries and flexible units.',
          modules: ['c-resp-1'],
        },
        {
          id: 'css-polish',
          title: 'Animations and CSS variables',
          why: 'Transitions, animations and reusable design tokens that make a site feel finished.',
          modules: ['c-motion-1', 'c-vars-1'],
        },
        {
          id: 'tailwind',
          title: 'Tailwind CSS',
          why: 'A popular way to style with ready-made classes. Many Indian startups use it; learn it after plain CSS feels easy.',
          optional: true,
          links: [{ label: 'Tailwind CSS docs', url: 'https://tailwindcss.com/docs', kind: 'docs' }],
        },
        {
          id: 'project-portfolio',
          title: 'Project: your portfolio page',
          why: 'Build and style a one-page portfolio. It becomes the first link on your resume.',
          modules: ['proj-portfolio'],
          project: true,
        },
      ],
    },
    {
      title: 'JavaScript',
      stops: [
        {
          id: 'js-basics',
          title: 'JavaScript basics',
          why: 'Variables, conditions and functions: making pages react to the user.',
          modules: ['j-var-1', 'j-cond-1', 'w-js-1'],
        },
        {
          id: 'js-data',
          title: 'Arrays, objects and arrow functions',
          why: 'Working with lists of data, the everyday work of a frontend developer.',
          modules: ['j-arr-1', 'j-arrow-1', 'j-obj-1'],
        },
        { id: 'js-classes', title: 'Classes and errors', why: 'Organising bigger programs and handling things that go wrong.', modules: ['j-class-1', 'j-error-1'] },
        { id: 'js-dom', title: 'The DOM and events', why: 'Changing the page from JavaScript when users click, type and scroll.', modules: ['j-dom-1'] },
        {
          id: 'js-async',
          title: 'Async JavaScript and fetch',
          why: 'Promises, async/await and loading data from APIs without freezing the page.',
          modules: ['j-async-1'],
          links: [{ label: 'The Modern JavaScript Tutorial', url: 'https://javascript.info/', kind: 'docs' }],
        },
        {
          id: 'project-todo',
          title: 'Project: a to-do app',
          why: 'Add, tick and delete tasks with plain JavaScript. Proves you can build something interactive.',
          modules: ['proj-todo'],
          project: true,
        },
      ],
    },
    {
      title: 'Developer tools',
      stops: [
        {
          id: 'git',
          title: 'Git and GitHub',
          why: 'Save versions of your code, work in teams and show your work on GitHub. Every company uses it.',
          modules: ['git-why', 'git-init', 'git-commit', 'git-branch', 'git-remote', 'git-pr'],
        },
        { id: 'npm', title: 'npm and packages', why: 'Install and use other people’s code. You need it for React and every modern project.', modules: ['n-npm-1'] },
        {
          id: 'devtools',
          title: 'Browser DevTools',
          why: 'Inspect elements, debug JavaScript and find slow parts of a page in Chrome.',
          links: [{ label: 'Chrome DevTools overview', url: 'https://developer.chrome.com/docs/devtools/overview', kind: 'docs' }],
        },
      ],
    },
    {
      title: 'React',
      stops: [
        {
          id: 'react-basics',
          title: 'Components, props and state',
          why: 'Build pages from small reusable pieces that update themselves when data changes.',
          modules: ['r-comp-1', 'r-state-1', 'r-cond-1', 'r-list-1', 'r-event-1'],
        },
        {
          id: 'react-more',
          title: 'Effects, hooks and context',
          why: 'Loading data, custom hooks and sharing state across an app.',
          modules: ['r-children-1', 'r-lift-1', 'r-effect-1', 'r-hooks-1', 'r-context-1'],
          links: [{ label: 'Learn React (react.dev)', url: 'https://react.dev/learn', kind: 'docs' }],
        },
        {
          id: 'typescript',
          title: 'TypeScript',
          why: 'JavaScript with types, so mistakes show up while you type. Most React jobs now ask for it.',
          optional: true,
          links: [{ label: 'TypeScript handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', kind: 'docs' }],
        },
        {
          id: 'nextjs',
          title: 'Next.js',
          why: 'The most popular React framework: routing, layouts and server rendering for fast, searchable sites.',
          modules: ['nx-1', 'nx-link-1', 'nx-layout-1', 'nx-dyn-1', 'nx-meta-1', 'nx-data-1', 'nx-loading-1', 'nx-api-1', 'nx-actions-1', 'nx-deploy-1'],
          links: [{ label: 'Learn Next.js', url: 'https://nextjs.org/learn', kind: 'course' }],
        },
        {
          id: 'project-quiz',
          title: 'Project: a quiz game',
          why: 'Questions, score and a results screen: state and components working together.',
          modules: ['proj-quiz'],
          project: true,
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'deploy',
          title: 'Put your projects online',
          why: 'Free hosting with GitHub Pages or Vercel, so recruiters can open your work with one link.',
          links: [
            { label: 'GitHub Pages quickstart', url: 'https://docs.github.com/en/pages/quickstart', kind: 'docs' },
            { label: 'Deploy on Vercel', url: 'https://vercel.com/docs/getting-started-with-vercel', kind: 'docs' },
          ],
        },
        {
          id: 'practice-ui',
          title: 'Build from real designs',
          why: 'Recreate professional designs to sharpen your eye and fill your portfolio.',
          links: [{ label: 'Frontend Mentor challenges', url: 'https://www.frontendmentor.io/challenges', kind: 'practice', note: 'Free' }],
        },
        {
          id: 'interviews',
          title: 'Interview preparation',
          why: 'Practise JavaScript output questions, CSS layout questions and explaining your projects out loud.',
          links: [
            { label: 'CodeWithHarry (YouTube)', url: 'https://www.youtube.com/@CodeWithHarry', kind: 'video', note: 'Hindi' },
            { label: 'Apna College (YouTube)', url: 'https://www.youtube.com/@ApnaCollegeOfficial', kind: 'video', note: 'Hindi' },
          ],
        },
      ],
    },
  ],
};
