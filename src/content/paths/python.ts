import { course, docs, dsaBasicsStop, gitStop, interviewStop, SQL_BASICS } from './shared';
import type { CareerPath } from './types';

export const PYTHON_DEV: CareerPath = {
  id: 'python',
  title: 'Python Developer',
  tagline: 'Build web backends, scripts and automation in Python',
  job: 'Writes Python for web servers, data pipelines and automation that saves people hours of manual work. Python is also the doorway to data and AI roles.',
  months: '6–8 months',
  icon: 'M9 3h6a3 3 0 0 1 3 3v4H9a3 3 0 0 0-3 3v2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4V6a3 3 0 0 1 0-3z M15 21H9a3 3 0 0 1-3-3v-4h9a3 3 0 0 0 3-3V9h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4v1a3 3 0 0 1 0 3z',
  color: '#3776AB',
  ink: '#2B5E89',
  soft: '#E6F0F8',
  sections: [
    {
      title: 'Python basics',
      stops: [
        {
          id: 'basics',
          title: 'Variables, strings and f-strings',
          why: 'Store values and build text, the first thing every program does.',
          modules: ['p-var-1', 'p-str-1'],
        },
        { id: 'loops', title: 'Loops and lists', why: 'Repeat work and handle lists of data.', modules: ['p-loop-1', 'p-loop-2', 'p-comp-1'] },
        { id: 'functions', title: 'Functions and dictionaries', why: 'Organise code into reusable pieces and store data by key.', modules: ['p-fn-1', 'p-dict-1'] },
        { id: 'oop', title: 'Classes and errors', why: 'Model real things as objects and handle problems without crashing.', modules: ['p-class-1', 'p-err-1'] },
        { id: 'solving', title: 'Problem solving', why: 'Break a problem into steps, then code it.', modules: ['p-ps-1'] },
        {
          id: 'project-game',
          title: 'Project: number guessing game',
          why: 'Loops, conditions and input together in a small game.',
          modules: ['proj-guess'],
          project: true,
        },
      ],
    },
    {
      title: 'Working with data',
      stops: [
        { id: 'files', title: 'Files and exceptions', why: 'Read and write text and CSV files safely.', modules: ['cbse-files', 'cbse-exceptions'] },
        { id: 'sql', title: 'SQL databases', why: 'Store and query data with SQL; Python apps almost always need a database.', modules: SQL_BASICS },
        {
          id: 'venv',
          title: 'pip and virtual environments',
          why: 'Install packages and keep each project’s packages separate.',
          links: [docs('Virtual environments and packages', 'https://docs.python.org/3/tutorial/venv.html')],
        },
      ],
    },
    {
      title: 'Pick a web framework',
      stops: [
        {
          id: 'django',
          title: 'Django',
          why: 'Batteries included: admin panel, login and database built in. Common in Indian companies.',
          choice: 'Web framework',
          links: [docs('Django tutorial', 'https://docs.djangoproject.com/en/stable/intro/tutorial01/')],
        },
        {
          id: 'flask',
          title: 'Flask',
          why: 'Small and simple: you add only what you need.',
          choice: 'Web framework',
          links: [docs('Flask tutorial', 'https://flask.palletsprojects.com/en/stable/tutorial/')],
        },
        {
          id: 'fastapi',
          title: 'FastAPI',
          why: 'Modern and fast, made for building APIs, popular in AI startups.',
          choice: 'Web framework',
          links: [docs('FastAPI tutorial', 'https://fastapi.tiangolo.com/tutorial/')],
        },
      ],
    },
    {
      title: 'Automation and quality',
      stops: [
        {
          id: 'automation',
          title: 'Automate boring tasks',
          why: 'Rename files, fill spreadsheets and call web APIs with short scripts.',
          links: [
            course('Automate the Boring Stuff', 'https://automatetheboringstuff.com/', 'Free book'),
            docs('Requests quickstart', 'https://requests.readthedocs.io/en/latest/user/quickstart/'),
          ],
        },
        {
          id: 'testing',
          title: 'Testing with pytest',
          why: 'Write tests so your code keeps working as it grows.',
          links: [docs('pytest getting started', 'https://docs.pytest.org/en/stable/getting-started.html')],
        },
        gitStop,
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'project-web',
          title: 'Project: a web app or API',
          why: 'Build something real with your framework, a database and login, and put it on GitHub.',
          project: true,
          links: [docs('Render: deploy a Python app', 'https://render.com/docs')],
        },
        dsaBasicsStop,
        interviewStop('Practise Python output questions, explain your project, and solve DSA problems in Python.'),
      ],
    },
  ],
};
