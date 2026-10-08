import type { CodeStep, Lesson } from './types';

const KNOWN_TAGS = ['h1', 'p', 'button', 'div'];

export const ticketHtml: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · HTML',
  title: 'Build Yatri’s ticket',
  instructions: 'Fill the gaps so the ticket has a big main heading and a Book button.',
  lang: 'html',
  file: 'index.html',
  lines: [
    ['<div class="ticket">'],
    ['  <', { gap: 0 }, '>Delhi → Jaipur</', { gap: 0 }, '>'],
    ['  <p>Seat 42 · 7 Oct</p>'],
    ['  <', { gap: 1 }, '>Book</', { gap: 1 }, '>'],
    ['</div>'],
  ],
  tokens: ['h1', 'p', 'button', 'div'],
  solution: ['h1', 'button'],
  run: ([heading, action]) => {
    const tag = (t: string) => (KNOWN_TAGS.includes(t) ? t : 'div');
    const checks = [
      { label: 'Main heading uses <h1>', ok: heading === 'h1' },
      { label: 'Seat details are in a paragraph', ok: true },
      { label: 'Book is a <button>', ok: action === 'button' },
    ];
    return {
      pass: checks.every((c) => c.ok),
      checks,
      preview: {
        kind: 'html',
        nodes: [
          { tag: tag(heading), text: 'Delhi → Jaipur' },
          { tag: 'p', text: 'Seat 42 · 7 Oct' },
          { tag: tag(action), text: 'Book' },
        ],
      },
    };
  },
};

export const WEB_LESSONS: Lesson[] = [
  {
    id: 'w-html-1',
    title: 'Your first web page',
    kind: 'lesson',
    minutes: 6,
    skill: 'web',
    learned: ['Tags open and close an element', '<h1> is the main heading', 'A <button> is something you can click'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · HTML',
        title: 'HTML gives a page its structure',
        body: 'Every web page is built from elements. A tag like <h1> opens an element and </h1> closes it. The browser shows whatever is between them.',
        visual: 'htmlAnatomy',
        code: [
          {
            lang: 'html',
            label: 'HTML',
            lines: ['<h1>Delhi → Jaipur</h1>', '<p>Seat 42 · 7 Oct</p>', '<button>Book</button>'],
          },
        ],
        tip: '<h1> is the main heading. Use one per page, like the headline of a newspaper.',
      },
      {
        type: 'quiz',
        prompt: 'Which tag makes the biggest, most important heading?',
        options: ['<h1>', '<h6>', '<p>', '<head>'],
        mono: true,
        answer: 0,
        right: 'Headings go from <h1> (most important) down to <h6> (least).',
        wrong: '<h1> is the top-level heading. <head> is a different thing: page settings that are not shown.',
      },
      ticketHtml,
    ],
  },
];
