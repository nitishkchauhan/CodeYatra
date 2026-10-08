import { fill } from './helpers';
import type { Lesson } from './types';

export const pickSelectors = fill({
  kicker: 'PRACTICE · CSS SELECTORS',
  title: 'Target the right elements',
  instructions: 'Style every heading, then only things with class="price", then the one element with id="book".',
  lang: 'css',
  file: 'style.css',
  lines: [
    [{ gap: 0 }, ' { font-size: 24px; }'],
    [{ gap: 1 }, ' { color: #15803D; }'],
    [{ gap: 2 }, ' { background: #FF9F1C; }'],
  ],
  tokens: ['h1', '.price', '#book', 'price', 'book'],
  answers: [
    { value: 'h1', check: 'Tag selector: h1' },
    { value: '.price', check: 'Class selector starts with a dot' },
    { value: '#book', check: 'Id selector starts with #' },
  ],
  output: ['h1 → 24px heading', '.price → green text', '#book → saffron button'],
});

export const boxModel = fill({
  kicker: 'PRACTICE · BOX MODEL',
  title: 'Give the button room',
  instructions: 'Space inside the border is padding; space outside is margin. Pad the button and round its corners.',
  lang: 'css',
  file: 'style.css',
  lines: [['.btn {'], ['  background: #4B3FD8;'], ['  color: white;'], ['  ', { gap: 0 }, ': 14px;'], ['  ', { gap: 1 }, ': 999px;'], ['}']],
  tokens: ['padding', 'border-radius', 'margin', 'gap'],
  answers: [
    { value: 'padding', check: 'padding adds space inside the button' },
    { value: 'border-radius', check: 'border-radius rounds the corners' },
  ],
  preview: ([space, round]) => ({
    kind: 'button',
    background: '#4B3FD8',
    color: '#FFFFFF',
    radius: round === 'border-radius' ? 999 : 0,
    padding: space === 'padding' ? 14 : 2,
    label: 'Book now',
  }),
});

export const flexRow = fill({
  kicker: 'PRACTICE · FLEXBOX',
  title: 'Line up the ticket',
  instructions: 'Put the three parts side by side, push them to the edges, and centre them vertically.',
  lang: 'css',
  file: 'ticket.css',
  lines: [['.ticket {'], ['  display: ', { gap: 0 }, ';'], ['  justify-content: ', { gap: 1 }, ';'], ['  align-items: ', { gap: 2 }, ';'], ['}']],
  tokens: ['flex', 'space-between', 'center', 'block', 'left'],
  answers: [
    { value: 'flex', check: 'display: flex puts children in a row' },
    {
      value: 'space-between',
      check: 'space-between pushes items to the edges',
    },
    { value: 'center', check: 'align-items: center centres vertically' },
  ],
  preview: ([display, justify, align]) => ({
    kind: 'flex',
    row: display === 'flex',
    justify: justify === 'space-between' ? 'space-between' : 'flex-start',
    align: align === 'center' ? 'center' : 'flex-start',
    items: ['DEL', '→', 'JAI'],
  }),
});

export const mediaQuery = fill({
  kicker: 'PRACTICE · RESPONSIVE',
  title: 'Stack it on phones',
  instructions: 'On screens up to 600px wide, stack the ticket parts in a column.',
  lang: 'css',
  file: 'ticket.css',
  lines: [['@', { gap: 0 }, ' (max-width: 600px) {'], ['  .ticket {'], ['    flex-direction: ', { gap: 1 }, ';'], ['  }'], ['}']],
  tokens: ['media', 'column', 'row', 'screen', 'import'],
  answers: [
    { value: 'media', check: '@media applies rules to some screens' },
    { value: 'column', check: 'flex-direction: column stacks items' },
  ],
  preview: ([, dir]) => ({
    kind: 'flex',
    row: dir !== 'column',
    justify: 'flex-start',
    align: 'center',
    items: ['DEL', '→', 'JAI'],
  }),
});

export const CSS_LESSONS: Lesson[] = [
  {
    id: 'c-sel-1',
    title: 'Selectors',
    kind: 'lesson',
    minutes: 5,
    skill: 'css',
    learned: ['Tag selectors style every match', '.class styles a group', '#id styles exactly one element'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · CSS SELECTORS',
        title: 'Choose what to style',
        hindi: 'चुनें कि किसे स्टाइल करना है',
        body: 'A selector says which elements a rule applies to. p picks every paragraph, .price picks everything with class="price", and #book picks the single element with id="book".',
        code: [
          {
            lang: 'html',
            label: 'HTML',
            lines: ['<p class="price">₹450</p>', '<button id="book">Book</button>'],
          },
          {
            lang: 'css',
            label: 'CSS',
            lines: ['.price { color: green; }', '#book { background: orange; }'],
          },
        ],
        tip: 'Prefer classes. Ids must be unique, so they are hard to reuse.',
      },
      {
        type: 'quiz',
        prompt: 'Which selector matches class="seat"?',
        options: ['.seat', '#seat', 'seat', '*seat'],
        mono: true,
        answer: 0,
        right: 'A dot means “class”.',
        wrong: '# is for ids and a bare word is a tag. Classes start with a dot.',
      },
      pickSelectors,
    ],
  },
  {
    id: 'c-box-1',
    title: 'The box model',
    kind: 'lesson',
    minutes: 6,
    skill: 'css',
    learned: ['Every element is a box', 'padding is inside the border, margin is outside', 'border-radius rounds corners'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · BOX MODEL',
        title: 'Every element is a box',
        hindi: 'हर एलिमेंट एक डिब्बा है',
        body: 'From the inside out, a box has content, then padding, then a border, then margin. Padding gives the content breathing room; margin keeps other boxes away.',
        code: [
          {
            lang: 'css',
            label: 'CSS',
            lines: ['.card {', '  padding: 16px;', '  border: 1px solid #ddd;', '  margin: 12px;', '}'],
          },
        ],
        tip: 'Buttons need padding to be easy to tap: aim for at least 44px tall.',
      },
      {
        type: 'quiz',
        prompt: 'You want more space between two cards. Which property?',
        options: ['margin', 'padding', 'border', 'color'],
        mono: true,
        answer: 0,
        right: 'Margin is the space outside a box, between it and its neighbours.',
        wrong: 'Padding grows the inside of a card. Space between cards is margin.',
      },
      boxModel,
    ],
  },
  {
    id: 'c-flex-1',
    title: 'Flexbox layout',
    kind: 'lesson',
    minutes: 7,
    skill: 'css',
    learned: ['display: flex lays children in a row', 'justify-content spreads them along the row', 'align-items lines them up across it'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · FLEXBOX',
        title: 'Flexbox arranges things in a line',
        hindi: 'Flexbox चीज़ों को एक लाइन में सजाता है',
        body: 'Set display: flex on a parent and its children sit side by side. justify-content controls spacing along the line; align-items controls alignment across it.',
        code: [
          {
            lang: 'css',
            label: 'CSS',
            lines: ['.row {', '  display: flex;', '  justify-content: space-between;', '  align-items: center;', '  gap: 8px;', '}'],
          },
        ],
        tip: 'gap adds space between flex items without any margins.',
      },
      {
        type: 'quiz',
        prompt: 'Which value puts equal space between items, none at the edges?',
        options: ['space-between', 'center', 'flex-start', 'stretch'],
        mono: true,
        answer: 0,
        right: 'space-between pushes the first and last items to the edges.',
        wrong: 'center bunches items in the middle. space-between spreads them out.',
      },
      flexRow,
    ],
  },
  {
    id: 'c-resp-1',
    title: 'Responsive design',
    kind: 'lesson',
    minutes: 6,
    skill: 'css',
    learned: ['@media applies CSS on some screens', 'max-width targets small screens', 'Design for phones first'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · RESPONSIVE CSS',
        title: 'One page, every screen',
        hindi: 'एक पेज, हर स्क्रीन',
        body: 'Most people in India browse on phones. A media query changes your layout when the screen is narrow, so the same page works on a phone and a laptop.',
        code: [
          {
            lang: 'css',
            label: 'CSS',
            lines: ['@media (max-width: 600px) {', '  .row { flex-direction: column; }', '}'],
          },
        ],
        tip: 'Start with the phone layout, then add rules for wider screens.',
      },
      {
        type: 'quiz',
        prompt: '@media (max-width: 600px) applies when the screen is…',
        options: ['600px wide or less', 'wider than 600px', 'exactly 600px', 'always'],
        answer: 0,
        right: 'max-width means “up to this width”.',
        wrong: 'max-width: 600px matches screens up to 600px wide.',
      },
      mediaQuery,
    ],
  },
];
