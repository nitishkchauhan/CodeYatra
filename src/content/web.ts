import type { CodeStep } from './types';

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
    ['  <', { gap: 0 }, '>Dublin → Jersey</', { gap: 0 }, '>'],
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
          { tag: tag(heading), text: 'Dublin → Jersey' },
          { tag: 'p', text: 'Seat 42 · 7 Oct' },
          { tag: tag(action), text: 'Book' },
        ],
      },
    };
  },
};
