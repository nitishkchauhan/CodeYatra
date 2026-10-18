import { fill } from './helpers';

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
