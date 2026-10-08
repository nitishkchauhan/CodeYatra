import { bug, lesson, predict, quiz, read, tap } from '../dsl';
import type { Lesson, WebStep } from '../types';

const K = 'CSS';

const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: `BUILD · ${K}`, ...o });

const CARD_HTML = '<div class="card">\n  <h2>Rajdhani</h2>\n  <p>Mumbai → Delhi</p>\n</div>\n';

export const CSS_MORE: Lesson[] = [
  lesson('c-text-1', 'Typography', 'css', ['font-size and font-weight shape text', 'line-height adds breathing room', 'Use rem for sizes that respect user settings'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Text people can read',
      body: 'Good typography is most of good design. Set font-size for size, font-weight for boldness (400 normal, 700 bold) and line-height for space between lines. 1.5 is a comfortable line-height for body text.',
      lang: 'css',
      code: ['body {', '  font-family: system-ui, sans-serif;', '  font-size: 1rem;', '  line-height: 1.5;', '}', 'h1 { font-weight: 800; }'],
      tip: '1rem is the user\'s default size, usually 16px.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Bolder headings',
      instructions: 'Tap the word in the property name that controls how bold the text is.',
      lang: 'css',
      lines: ['h2 {', '  font-size: 1.5rem;', '  font-weight: 700;', '}'],
      target: { line: 2, token: 'weight' },
      explain: 'font-weight sets boldness: 400 is normal, 700 is bold.',
    }),
    web({
      title: 'Style the ticket text',
      instructions: 'Make the h2 font-weight 800 and give paragraphs a line-height of 1.5.',
      starter: { html: CARD_HTML, css: 'h2 {\n  color: #4B3FD8;\n}\n' },
      solution: { html: CARD_HTML, css: 'h2 {\n  color: #4B3FD8;\n  font-weight: 800;\n}\np {\n  line-height: 1.5;\n}\n' },
      checks: [
        { label: 'h2 has font-weight: 800', file: 'css', pattern: /h2\s*\{[^}]*font-weight:\s*800/ },
        { label: 'p has line-height: 1.5', file: 'css', pattern: /p\s*\{[^}]*line-height:\s*1\.5/ },
      ],
      hint: 'p {\n  line-height: 1.5;\n}',
    }),
  ]),

  lesson('c-grid-1', 'CSS Grid', 'css', ['display: grid makes rows and columns', 'grid-template-columns sets the columns', '1fr shares the free space'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Two-dimensional layouts',
      body: 'Flexbox lays things out in one line. Grid does rows and columns at once. grid-template-columns: 1fr 1fr makes two equal columns; gap adds space between cells.',
      lang: 'css',
      code: ['.gallery {', '  display: grid;', '  grid-template-columns: 1fr 1fr 1fr;', '  gap: 12px;', '}'],
      tip: 'repeat(3, 1fr) is short for 1fr 1fr 1fr.',
    }),
    quiz({
      prompt: 'grid-template-columns: 2fr 1fr gives the first column…',
      options: ['Twice the width of the second', 'Half the width of the second', '2 pixels', 'The same width'],
      right: 'fr units share space in proportion: 2 parts and 1 part.',
      wrong: '2fr takes two shares of the free space, 1fr takes one.',
    }),
    web({
      title: 'A two-column grid',
      instructions: 'Make .grid a grid with two equal columns and a 10px gap.',
      starter: {
        html: '<div class="grid">\n  <div class="cell">Delhi</div>\n  <div class="cell">Agra</div>\n  <div class="cell">Jaipur</div>\n  <div class="cell">Pune</div>\n</div>\n',
        css: '.cell {\n  background: #EEECFD;\n  padding: 12px;\n}\n',
      },
      solution: {
        html: '<div class="grid">\n  <div class="cell">Delhi</div>\n  <div class="cell">Agra</div>\n  <div class="cell">Jaipur</div>\n  <div class="cell">Pune</div>\n</div>\n',
        css: '.cell {\n  background: #EEECFD;\n  padding: 12px;\n}\n.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n',
      },
      checks: [
        { label: '.grid uses display: grid', file: 'css', pattern: /\.grid\s*\{[^}]*display:\s*grid/ },
        { label: 'Two equal columns', file: 'css', pattern: /grid-template-columns:\s*(1fr\s+1fr|repeat\(\s*2\s*,\s*1fr\s*\))/ },
        { label: 'A 10px gap', file: 'css', pattern: /\bgap:\s*10px/ },
      ],
      hint: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}',
    }),
  ]),

  lesson('c-pos-1', 'Positioning', 'css', ['position: relative is the anchor', 'position: absolute places inside it', 'position: sticky stays on screen while scrolling'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Put it exactly there',
      body: 'Most elements flow down the page. position: absolute takes an element out of the flow and places it with top/right/bottom/left, measured from the nearest parent with position: relative.',
      lang: 'css',
      code: ['.card { position: relative; }', '.badge {', '  position: absolute;', '  top: 8px;', '  right: 8px;', '}'],
      tip: 'position: sticky; top: 0 keeps a header visible while scrolling.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'The badge flew away',
      instructions: 'The badge should sit in the card\'s corner but jumps to the page corner. Which line is missing a fix?',
      lang: 'css',
      lines: ['.card {', '  padding: 16px;', '}', '.badge {', '  position: absolute;', '  top: 8px;', '  right: 8px;', '}'],
      bug: 1,
      fix: '  padding: 16px; position: relative;',
      explain: 'Without position: relative on .card, the badge positions itself against the page.',
    }),
    web({
      title: 'Corner badge',
      instructions: 'Make .card the anchor (position: relative) and place .badge absolutely, 8px from the top and right.',
      starter: {
        html: '<div class="card">\n  <span class="badge">AC</span>\n  <h2>Shatabdi</h2>\n  <p>Delhi → Bhopal</p>\n</div>\n',
        css: '.card {\n  border: 1px solid #ddd;\n  border-radius: 12px;\n  padding: 16px;\n}\n.badge {\n  background: #FF9F1C;\n  padding: 2px 8px;\n  border-radius: 8px;\n}\n',
      },
      solution: {
        html: '<div class="card">\n  <span class="badge">AC</span>\n  <h2>Shatabdi</h2>\n  <p>Delhi → Bhopal</p>\n</div>\n',
        css: '.card {\n  border: 1px solid #ddd;\n  border-radius: 12px;\n  padding: 16px;\n  position: relative;\n}\n.badge {\n  background: #FF9F1C;\n  padding: 2px 8px;\n  border-radius: 8px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n',
      },
      checks: [
        { label: '.card has position: relative', file: 'css', pattern: /\.card\s*\{[^}]*position:\s*relative/ },
        { label: '.badge has position: absolute', file: 'css', pattern: /\.badge\s*\{[^}]*position:\s*absolute/ },
        { label: 'The badge is 8px from the top and right', file: 'css', pattern: /\.badge\s*\{(?=[^}]*top:\s*8px)(?=[^}]*right:\s*8px)[^}]*\}/ },
      ],
      hint: 'In .badge: position: absolute; top: 8px; right: 8px;',
    }),
  ]),

  lesson('c-motion-1', 'Hover and transitions', 'css', [':hover styles an element under the pointer', 'transition animates changes smoothly', 'Keep motion short: 150 to 300ms'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Feedback people can feel',
      body: ':hover applies styles while the pointer is over an element (and on tap on phones). transition: transform 200ms makes the change animate instead of jumping.',
      lang: 'css',
      code: ['.btn {', '  transition: transform 200ms ease;', '}', '.btn:hover {', '  transform: scale(1.05);', '}'],
      tip: 'Animate transform and opacity: they are the smoothest to render.',
    }),
    quiz({
      prompt: 'Where does the transition property go?',
      options: ['On the normal state (.btn)', 'Only on .btn:hover', 'In the HTML', 'In JavaScript'],
      right: 'Put it on the base rule so the change animates both in and out.',
      wrong: 'transition on the base rule animates going into and out of :hover.',
    }),
    web({
      title: 'A button that responds',
      instructions: 'Give .btn a transition on transform, and make .btn:hover scale to 1.05.',
      starter: { html: '<button class="btn">Book now</button>\n', css: '.btn {\n  background: #4B3FD8;\n  color: white;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 12px;\n}\n' },
      solution: {
        html: '<button class="btn">Book now</button>\n',
        css: '.btn {\n  background: #4B3FD8;\n  color: white;\n  border: 0;\n  padding: 12px 20px;\n  border-radius: 12px;\n  transition: transform 200ms ease;\n}\n.btn:hover {\n  transform: scale(1.05);\n}\n',
      },
      checks: [
        { label: '.btn has a transition on transform', file: 'css', pattern: /\.btn\s*\{[^}]*transition:[^;]*transform/ },
        { label: '.btn:hover scales to 1.05', file: 'css', pattern: /\.btn:hover\s*\{[^}]*transform:\s*scale\(\s*1\.05\s*\)/ },
      ],
      hint: '.btn:hover {\n  transform: scale(1.05);\n}',
    }),
  ]),

  lesson('c-vars-1', 'CSS variables', 'css', ['--name defines a custom property', 'var(--name) uses it', 'Change one value, update the whole theme'], [
    read({
      kicker: `READ · ${K}`,
      title: 'One place for your colours',
      body: 'Define a value once with --brand: #4B3FD8 on :root and use it anywhere with var(--brand). Change the variable, and every place that uses it updates. This is how dark mode is built.',
      lang: 'css',
      code: [':root {', '  --brand: #4B3FD8;', '  --radius: 12px;', '}', '.btn {', '  background: var(--brand);', '  border-radius: var(--radius);', '}'],
      tip: 'Design systems in big companies are mostly CSS variables.',
    }),
    predict({
      kicker: `PRACTICE · ${K}`,
      title: 'Which colour wins?',
      lang: 'css',
      lines: [':root { --brand: blue; }', '.dark { --brand: orange; }', '/* <div class="dark"><button style="color: var(--brand)"> */', '/* What colour is the button text? */'],
      answer: 'orange',
      explain: 'Variables inherit from the nearest ancestor that sets them: .dark sets orange.',
    }),
    web({
      title: 'Theme with variables',
      instructions: 'Add --brand: #FF9F1C on :root and use var(--brand) as the .btn background.',
      starter: { html: '<button class="btn">Pay ₹450</button>\n', css: '.btn {\n  background: gray;\n  border: 0;\n  padding: 12px 20px;\n}\n' },
      solution: { html: '<button class="btn">Pay ₹450</button>\n', css: ':root {\n  --brand: #FF9F1C;\n}\n.btn {\n  background: var(--brand);\n  border: 0;\n  padding: 12px 20px;\n}\n' },
      checks: [
        { label: ':root defines --brand: #FF9F1C', file: 'css', pattern: /:root\s*\{[^}]*--brand:\s*#FF9F1C/i },
        { label: '.btn uses var(--brand) for its background', file: 'css', pattern: /\.btn\s*\{[^}]*background:\s*var\(\s*--brand\s*\)/ },
      ],
      hint: '.btn { background: var(--brand); }',
    }),
  ]),
];
