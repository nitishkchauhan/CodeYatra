import { fill } from './helpers';

export const stationList = fill({
  kicker: 'PRACTICE · HTML',
  title: 'List the stops',
  instructions: 'Make a bulleted list of the stations on the route: the list wrapper, then one item per stop.',
  lang: 'html',
  file: 'route.html',
  lines: [['<h1>Dublin → Athens</h1>'], ['<', { gap: 0 }, '>'], ['  <', { gap: 1 }, '>New Dublin</li>'], ['  <li>Milan</li>'], ['  <li>Athens Cantt</li>'], ['</ul>']],
  tokens: ['ul', 'li', 'ol', 'p'],
  answers: [
    { value: 'ul', check: 'The list is wrapped in <ul>' },
    { value: 'li', check: 'Each stop is a <li> item' },
  ],
  preview: ([wrap, item]) => ({
    kind: 'html',
    nodes: [
      { tag: 'h1', text: 'Dublin → Athens' },
      { tag: wrap === 'ul' && item === 'li' ? 'li' : 'p', text: 'New Dublin' },
      { tag: wrap === 'ul' ? 'li' : 'p', text: 'Milan' },
      { tag: wrap === 'ul' ? 'li' : 'p', text: 'Athens Cantt' },
    ],
  }),
});

export const searchForm = fill({
  kicker: 'PRACTICE · HTML FORMS',
  title: 'Build the search form',
  instructions: 'Add a label, a text box for the city, and a button that submits the form.',
  lang: 'html',
  file: 'search.html',
  lines: [
    ['<form action="/search">'],
    ['  <', { gap: 0 }, ' for="city">From city</label>'],
    ['  <', { gap: 1 }, ' id="city" type="text">'],
    ['  <button type="', { gap: 2 }, '">Search trains</button>'],
    ['</form>'],
  ],
  tokens: ['label', 'input', 'submit', 'text', 'p'],
  answers: [
    { value: 'label', check: '<label> names the box for screen readers' },
    { value: 'input', check: '<input> lets people type' },
    { value: 'submit', check: 'The button submits the form' },
  ],
  preview: ([label, input, kind]) => ({
    kind: 'html',
    nodes: [
      { tag: label === 'label' ? 'label' : 'p', text: 'From city' },
      ...(input === 'input' ? [{ tag: 'input', text: 'Type a city' }] : []),
      {
        tag: 'button',
        text: kind === 'submit' ? 'Search trains' : 'Search trains (does nothing)',
      },
    ],
  }),
});

export const pageLayout = fill({
  kicker: 'PRACTICE · SEMANTIC HTML',
  title: 'Lay out the page',
  instructions: 'Use the tag that says what each part is: the top banner, the main content and the bottom strip.',
  lang: 'html',
  file: 'index.html',
  lines: [
    ['<', { gap: 0 }, '>'],
    ['  <h1>CodeYatra Rail</h1>'],
    ['</header>'],
    ['<', { gap: 1 }, '>'],
    ['  <p>Find trains across India.</p>'],
    ['</main>'],
    ['<', { gap: 2 }, '>© 2026 CodeYatra</footer>'],
  ],
  tokens: ['header', 'main', 'footer', 'div', 'section'],
  answers: [
    { value: 'header', check: 'The banner is a <header>' },
    { value: 'main', check: 'The page content is in <main>' },
    { value: 'footer', check: 'The bottom strip is a <footer>' },
  ],
  preview: () => ({
    kind: 'html',
    nodes: [
      { tag: 'h1', text: 'CodeYatra Rail' },
      { tag: 'p', text: 'Find trains across India.' },
      { tag: 'small', text: '© 2026 CodeYatra' },
    ],
  }),
});
