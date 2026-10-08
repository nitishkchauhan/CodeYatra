import type { CodeStep, EditorStep, Lesson } from './types';

export const linkAndImage: CodeStep = {
  type: 'code',
  kicker: 'PRACTICE · HTML',
  title: 'Link to the timetable',
  instructions: 'Make the text a link with <a>, and add the train picture with <img>.',
  lang: 'html',
  file: 'index.html',
  lines: [
    ['<', { gap: 0 }, ' href="timetable.html">See timetable</a>'],
    ['<', { gap: 1 }, ' src="train.png" alt="Rajdhani Express">'],
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

export const WEB_MORE: Lesson[] = [
  {
    id: 'w-html-2',
    title: 'Links and images',
    kind: 'lesson',
    minutes: 6,
    skill: 'web',
    learned: ['<a href> links pages together', '<img src> shows pictures', 'alt text describes images for everyone'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · HTML',
        title: 'Links connect the web',
        body: 'An <a> tag with href takes you to another page. An <img> tag with src shows a picture. Always add alt text so screen readers can describe it.',
        code: [{ lang: 'html', label: 'HTML', lines: ['<a href="timetable.html">See timetable</a>', '<img src="train.png" alt="Rajdhani Express">'] }],
        tip: '<img> has no closing tag: everything it needs is in its attributes.',
      },
      {
        type: 'quiz',
        prompt: 'Which attribute tells a link where to go?',
        options: ['href', 'src', 'alt', 'link'],
        mono: true,
        answer: 0,
        right: 'href stands for “hypertext reference”: the address of the page.',
        wrong: 'src is for images, alt is the description. Links use href.',
      },
      linkAndImage,
    ],
  },
  {
    id: 'w-css-1',
    title: 'Colours and spacing',
    kind: 'lesson',
    minutes: 7,
    skill: 'web',
    learned: ['CSS styles HTML by selector', 'Colours can be hex codes', 'Good contrast keeps text readable'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · CSS',
        title: 'CSS makes pages look good',
        body: 'A CSS rule picks elements with a selector, like .btn, then sets properties such as background, color and border-radius.',
        code: [{ lang: 'css', label: 'CSS', lines: ['.btn {', '  background: #4B3FD8;', '  color: white;', '  border-radius: 12px;', '}'] }],
        tip: 'Pick text colours that stand out from the background. Dark on saffron, white on indigo.',
      },
      {
        type: 'quiz',
        prompt: 'Which property changes the text colour?',
        options: ['color', 'background', 'font', 'text'],
        mono: true,
        answer: 0,
        right: 'color sets the text colour. background sets what is behind it.',
        wrong: 'In CSS, text colour is simply color.',
      },
      styleButton,
    ],
  },
  {
    id: 'w-js-1',
    title: 'Make the page think',
    kind: 'lesson',
    minutes: 8,
    skill: 'web',
    learned: ['JavaScript adds logic to pages', 'Loop over an array with for…of', 'Return a result from a function'],
    steps: [
      {
        type: 'concept',
        kicker: 'CONCEPT · JAVASCRIPT',
        title: 'JavaScript brings pages to life',
        body: 'HTML is the structure and CSS is the look. JavaScript is the brain: it can count, decide and react when someone taps a button.',
        code: [{ lang: 'javascript', label: 'JavaScript', lines: ['const seats = [12, 0, 7];', 'let total = 0;', 'for (const s of seats) {', '  total += s;', '}', 'console.log(total); // 19'] }],
        tip: 'Use const for values that never change and let for ones that do.',
      },
      {
        type: 'quiz',
        prompt: 'What does this print?',
        code: { lang: 'javascript', label: 'JavaScript', lines: ['let total = 0;', 'for (const n of [2, 3, 4]) {', '  total += n;', '}', 'console.log(total);'] },
        options: ['9', '234', '4', '0'],
        mono: true,
        answer: 0,
        right: '2 + 3 + 4 = 9. += adds each number to total.',
        wrong: 'total starts at 0 and each loop adds n: 2 + 3 + 4 = 9.',
      },
      countSeats,
    ],
  },
];
