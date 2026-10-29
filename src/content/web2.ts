import type { CodeStep, EditorStep } from './types';

export const linkAndImage: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · HTML',
  title: 'Link to the timetable',
  instructions: 'Make the text a link with <a>, and add the train picture with <img>.',
  lang: 'html',
  file: 'index.html',
  lines: [
    ['<', { gap: 0 }, ' href="timetable.html">See timetable</a>'],
    ['<', { gap: 1 }, ' src="train.png" alt="Royal">'],
  ],
  tokens: ['a', 'img', 'p', 'link'],
  solution: ['a', 'img'],
  run: ([link, image]) => {
    const checks = [
      { label: 'Uses <a href> for the link', ok: link === 'a' },
      { label: 'Uses <img src> for the picture', ok: image === 'img' },
      { label: 'Image has alt text for screen readers', ok: true },
    ];
    return { pass: checks.every((c) => c.ok), checks };
  },
};

const COLORS: Record<string, string> = { '#FF9F1C': '#FF9F1C', white: '#FFFFFF', '#16142B': '#16142B', '12px': '#E5E7EB' };

export const styleButton: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · CSS',
  title: 'Style the Book button',
  instructions: 'Give the button a saffron background, dark text and rounded corners. Watch the preview change.',
  lang: 'css',
  file: 'style.css',
  lines: [
    ['.btn {'],
    ['  background: ', { gap: 0 }, ';'],
    ['  color: ', { gap: 1 }, ';'],
    ['  border-radius: ', { gap: 2 }, ';'],
    ['}'],
  ],
  tokens: ['#FF9F1C', '#16142B', '12px', 'white'],
  solution: ['#FF9F1C', '#16142B', '12px'],
  run: ([bg, fg, radius]) => {
    const checks = [
      { label: 'Background is saffron (#FF9F1C)', ok: bg === '#FF9F1C' },
      { label: 'Text is dark (#16142B) for contrast', ok: fg === '#16142B' },
      { label: 'Corners are rounded (12px)', ok: radius === '12px' },
    ];
    return {
      pass: checks.every((c) => c.ok),
      checks,
      preview: {
        kind: 'button',
        background: COLORS[bg] ?? '#E5E7EB',
        color: COLORS[fg] ?? '#000000',
        radius: radius === '12px' ? 12 : 2,
        padding: 8,
        label: 'Book',
      },
    };
  },
};

export const countSeats: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · JAVASCRIPT',
  title: 'Count the free seats',
  instructions: 'freeSeats(coaches) gets an array of seat counts. Return the total, but skip any negative numbers (sensor errors).',
  lang: 'javascript',
  file: 'seats.js',
  starter: 'function freeSeats(coaches) {\n  let total = 0;\n  // loop over coaches and add each count\n  return total;\n}\n',
  tests: [
    { call: 'freeSeats([12, 0, 7])', expect: '19' },
    { call: 'freeSeats([5, -1, 3])', expect: '8' },
    { call: 'freeSeats([])', expect: '0' },
  ],
  hint: 'for (const c of coaches) { if (c > 0) total += c; }',
  solution: 'function freeSeats(coaches) {\n  let total = 0;\n  for (const c of coaches) {\n    if (c > 0) total += c;\n  }\n  return total;\n}\n',
};
