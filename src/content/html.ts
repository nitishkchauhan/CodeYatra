import { fill } from './helpers';
import type { Lesson } from './types';

export const stationList = fill({
  kicker: 'PRACTICE · HTML',
  title: 'List the stops',
  instructions: 'Make a bulleted list of the stations on the route: the list wrapper, then one item per stop.',
  lang: 'html',
  file: 'route.html',
  lines: [['<h1>Delhi → Agra</h1>'], ['<', { gap: 0 }, '>'], ['  <', { gap: 1 }, '>New Delhi</li>'], ['  <li>Mathura</li>'], ['  <li>Agra Cantt</li>'], ['</ul>']],
  tokens: ['ul', 'li', 'ol', 'p'],
  answers: [
    { value: 'ul', check: 'The list is wrapped in <ul>' },
    { value: 'li', check: 'Each stop is a <li> item' },
  ],
  preview: ([wrap, item]) => ({
    kind: 'html',
    nodes: [
      { tag: 'h1', text: 'Delhi → Agra' },
      { tag: wrap === 'ul' && item === 'li' ? 'li' : 'p', text: 'New Delhi' },
      { tag: wrap === 'ul' ? 'li' : 'p', text: 'Mathura' },
      { tag: wrap === 'ul' ? 'li' : 'p', text: 'Agra Cantt' },
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

export const HTML_LESSONS: Lesson[] = [
  {
    id: 'h-list-1',
    title: 'Lists',
    kind: 'lesson',
    minutes: 5,
    skill: 'html',
    learned: ['<ul> makes a bulleted list', '<ol> makes a numbered list', 'Each item goes in <li>'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · HTML LISTS',
        title: 'Lists keep things in order',
        body: 'Menus, steps and stations are all lists. Wrap the list in <ul> for bullets or <ol> for numbers, and put every item in its own <li>.',
        code: [
          {
            lang: 'html',
            label: 'Bullets',
            lines: ['<ul>', '  <li>Chai</li>', '  <li>Samosa</li>', '</ul>'],
          },
          {
            lang: 'html',
            label: 'Numbers',
            lines: ['<ol>', '  <li>Board the train</li>', '  <li>Find your seat</li>', '</ol>'],
          },
        ],
        tip: 'Use <ol> when the order matters, like steps in a recipe.',
      },
      {
        type: 'quiz',
        prompt: 'Directions where order matters: which wrapper fits best?',
        options: ['<ol>', '<ul>', '<li>', '<p>'],
        mono: true,
        answer: 0,
        right: 'Ordered steps belong in <ol>, which numbers them for you.',
        wrong: '<ul> is for bullets when order does not matter. Steps need <ol>.',
      },
      stationList,
    ],
  },
  {
    id: 'h-form-1',
    title: 'Forms and inputs',
    kind: 'lesson',
    minutes: 6,
    skill: 'html',
    learned: ['<form> groups inputs', '<input> collects text', '<label for> links a name to its box'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · HTML FORMS',
        title: 'Forms let people talk to your site',
        body: 'Every search box and login screen is a form. An <input> collects what people type, a <label> says what to type, and a submit button sends it.',
        code: [
          {
            lang: 'html',
            label: 'HTML',
            lines: ['<form>', '  <label for="name">Name</label>', '  <input id="name" type="text">', '  <button type="submit">Go</button>', '</form>'],
          },
        ],
        tip: 'The label’s for must match the input’s id. Tapping the label then focuses the box.',
      },
      {
        type: 'quiz',
        prompt: 'Which input type hides what you type?',
        options: ['type="password"', 'type="text"', 'type="hidden"', 'type="secret"'],
        mono: true,
        answer: 0,
        right: 'password shows dots instead of letters.',
        wrong: 'hidden is never shown at all, and secret is not a type. Use password.',
      },
      searchForm,
    ],
  },
  {
    id: 'h-sem-1',
    title: 'Page layout',
    kind: 'lesson',
    minutes: 6,
    skill: 'html',
    learned: ['Semantic tags describe their content', '<header>, <main> and <footer> shape a page', 'Screen readers and search engines read them'],
    steps: [
      {
        type: 'concept',
        kicker: 'READ · SEMANTIC HTML',
        title: 'Name the parts of your page',
        body: 'A <div> says nothing about its content. Semantic tags do: <header> is the top banner, <nav> holds links, <main> is the content and <footer> sits at the bottom.',
        code: [
          {
            lang: 'html',
            label: 'HTML',
            lines: ['<header>Logo</header>', '<nav>Home · Trains</nav>', '<main>…</main>', '<footer>Contact</footer>'],
          },
        ],
        tip: 'A page should have only one <main>.',
      },
      {
        type: 'quiz',
        prompt: 'Where do the site’s menu links belong?',
        options: ['<nav>', '<main>', '<footer>', '<div>'],
        mono: true,
        answer: 0,
        right: '<nav> marks the navigation links.',
        wrong: 'Menu links go inside <nav>, so assistive tech can jump to them.',
      },
      pageLayout,
    ],
  },
];
