import { course, docs, gitStop, PYTHON_BASICS, practice, SQL_BASICS, SQL_MORE, video } from './shared';
import type { CareerPath } from './types';

const KHAN_STATS = course('Statistics and probability (Khan Academy)', 'https://www.khanacademy.org/math/statistics-probability', 'Free');

export const DATA_ANALYST: CareerPath = {
  id: 'data-analyst',
  title: 'Data Analyst',
  tagline: 'Turn data into decisions with SQL, Excel and dashboards',
  job: 'Answers business questions with data: which product sells, why sign-ups dropped, where to spend money. Works in SQL, Excel, Python and dashboard tools.',
  months: '5–7 months',
  icon: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2',
  color: '#D97706',
  ink: '#975008',
  soft: '#FDF0DC',
  sections: [
    {
      title: 'Foundations',
      stops: [
        {
          id: 'excel',
          title: 'Excel and spreadsheets',
          why: 'Formulas, sorting, filters, pivot tables and charts: still the most used analysis tool in Indian offices.',
          links: [docs('Excel help and learning (Microsoft)', 'https://support.microsoft.com/en-us/excel')],
        },
        { id: 'stats', title: 'Statistics basics', why: 'Mean, median, spread, percentages and probability, so your numbers mean what you think.', links: [KHAN_STATS] },
      ],
    },
    {
      title: 'SQL',
      stops: [
        { id: 'sql-basics', title: 'SQL queries', why: 'SELECT, WHERE, ORDER BY, GROUP BY: the analyst’s daily tool.', modules: SQL_BASICS },
        { id: 'sql-more', title: 'Joins and subqueries', why: 'Combine tables and answer harder questions in one query.', modules: SQL_MORE },
      ],
    },
    {
      title: 'Python for data',
      stops: [
        { id: 'python', title: 'Python basics', why: 'Enough Python to clean and reshape data that’s too big for Excel.', modules: PYTHON_BASICS },
        {
          id: 'pandas',
          title: 'pandas',
          why: 'Load, clean, filter and summarise tables of data in a few lines.',
          links: [course('Kaggle Learn: pandas', 'https://www.kaggle.com/learn/pandas', 'Free')],
        },
        {
          id: 'viz',
          title: 'Charts and visualisation',
          why: 'Pick the right chart and make it clear, in Python or a spreadsheet.',
          links: [course('Kaggle Learn: data visualisation', 'https://www.kaggle.com/learn/data-visualization', 'Free')],
        },
      ],
    },
    {
      title: 'Pick a dashboard tool',
      stops: [
        {
          id: 'powerbi',
          title: 'Power BI',
          why: 'Microsoft’s dashboard tool, the most asked-for in Indian analyst job posts.',
          choice: 'Dashboard tool',
          links: [course('Power BI training (Microsoft Learn)', 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi')],
        },
        {
          id: 'tableau',
          title: 'Tableau',
          why: 'A popular alternative for interactive dashboards.',
          choice: 'Dashboard tool',
          links: [course('Tableau Public how-to videos', 'https://public.tableau.com/app/learn/how-to-videos', 'Free')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'case-study',
          title: 'Project: a data case study',
          why: 'Pick a real dataset, ask three business questions, answer them with SQL or pandas, and present a dashboard.',
          project: true,
          links: [practice('Kaggle datasets', 'https://www.kaggle.com/datasets')],
        },
        gitStop,
        {
          id: 'interviews',
          title: 'Interview preparation',
          why: 'SQL rounds, Excel tasks and explaining your case study to a non-technical manager.',
          modules: ['pl-sql'],
          links: [video('Codebasics', 'https://www.youtube.com/@codebasics')],
        },
      ],
    },
  ],
};

export const DATA_SCIENTIST: CareerPath = {
  id: 'data-scientist',
  title: 'Data Scientist / ML Engineer',
  tagline: 'Build models that predict, recommend and classify',
  job: 'Trains machine-learning models on data to predict prices, spot fraud or recommend products, and checks that they really work before they ship.',
  months: '10–14 months',
  icon: 'M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0-2 7 4 4 0 0 0 6 4 4 4 0 0 0 6-4 4 4 0 0 0-2-7V7a4 4 0 0 0-4-4z M12 3v18',
  color: '#DB2777',
  ink: '#B01C5F',
  soft: '#FCE7F3',
  sections: [
    {
      title: 'Python',
      stops: [
        { id: 'python', title: 'Python basics', why: 'The language of almost all data science work.', modules: PYTHON_BASICS },
        {
          id: 'python-more',
          title: 'Comprehensions, classes and errors',
          why: 'Write cleaner data code and read other people’s libraries.',
          modules: ['p-comp-1', 'p-class-1', 'p-err-1', 'p-ps-1'],
        },
      ],
    },
    {
      title: 'Maths',
      stops: [
        { id: 'stats', title: 'Statistics and probability', why: 'Distributions, sampling and hypothesis tests: how you know a result is real.', links: [KHAN_STATS] },
        {
          id: 'linear-algebra',
          title: 'Linear algebra',
          why: 'Vectors and matrices, the language models are written in.',
          links: [course('Linear algebra (Khan Academy)', 'https://www.khanacademy.org/math/linear-algebra', 'Free')],
        },
        {
          id: 'calculus',
          title: 'Calculus intuition',
          why: 'Derivatives explain how models learn by gradient descent.',
          optional: true,
          links: [video('Essence of calculus (3Blue1Brown)', 'https://www.3blue1brown.com/topics/calculus')],
        },
      ],
    },
    {
      title: 'Data handling',
      stops: [
        {
          id: 'pandas',
          title: 'pandas',
          why: 'Clean and explore data before any model sees it.',
          links: [course('Kaggle Learn: pandas', 'https://www.kaggle.com/learn/pandas', 'Free')],
        },
        { id: 'sql', title: 'SQL', why: 'Most company data lives in databases; you query it yourself.', modules: SQL_BASICS },
        {
          id: 'viz',
          title: 'Visualisation',
          why: 'Plot data to spot patterns and explain results.',
          links: [course('Kaggle Learn: data visualisation', 'https://www.kaggle.com/learn/data-visualization', 'Free')],
        },
      ],
    },
    {
      title: 'Machine learning',
      stops: [
        {
          id: 'ml-basics',
          title: 'Machine learning basics',
          why: 'Regression, classification, training versus testing, and overfitting.',
          links: [course('Machine Learning Crash Course (Google)', 'https://developers.google.com/machine-learning/crash-course', 'Free')],
        },
        {
          id: 'sklearn',
          title: 'scikit-learn',
          why: 'Train and evaluate real models in a few lines of Python.',
          links: [
            course('Kaggle Learn: intro to machine learning', 'https://www.kaggle.com/learn/intro-to-machine-learning', 'Free'),
            docs('scikit-learn getting started', 'https://scikit-learn.org/stable/getting_started.html'),
          ],
        },
        {
          id: 'deep-learning',
          title: 'Deep learning',
          why: 'Neural networks for images, text and speech.',
          optional: true,
          links: [course('Practical Deep Learning (fast.ai)', 'https://course.fast.ai/', 'Free')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'kaggle',
          title: 'Project: a Kaggle competition',
          why: 'Start with Titanic, then a real competition. Rankings and notebooks make a strong portfolio.',
          project: true,
          links: [practice('Titanic competition (Kaggle)', 'https://www.kaggle.com/competitions/titanic')],
        },
        gitStop,
        {
          id: 'interviews',
          title: 'Interview preparation',
          why: 'Explain your projects, ML basics, statistics, SQL and a Python coding round.',
          modules: ['pl-sql'],
          links: [video('Krish Naik', 'https://www.youtube.com/@krishnaik06', 'Hindi')],
        },
      ],
    },
  ],
};
