// CSS Intermediate · Module 1 · Layout patterns.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, cards, challenge, check, copy, explore, lesson, live, mcq, pairs, pickCode, recap, resize, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const BASE = 'body{font-family:system-ui,sans-serif;margin:10px;color:#1F2937} .c{background:#EEF2FF;border:2px solid #C7D2FE;border-radius:10px;padding:14px 8px;text-align:center}';
const PAGE = '<div class="page">\n  <header>Header</header>\n  <nav>Side</nav>\n  <main>Main</main>\n  <footer>Footer</footer>\n</div>';
const PAGE_CSS = `${BASE} .page>*{padding:10px;border-radius:8px;color:white;font-weight:bold} header{background:#4B3FD8} nav{background:#0F766E} main{background:#C2410C;min-height:60px} footer{background:#374151}`;

export const CSS_I_M1: Lesson[] = [
  lesson('css-i-1-1', 'Card grids with no media queries', 5, [
    atWork('Arden', ['Hi, I’m Arden, the designer. Here’s the projects page: cards in a grid.', 'One column on phones, as many as fit on bigger screens, and no breakpoints to maintain. Can you do it in one line?']),
    resize('One line, every screen', 'Tap each width. The number of columns changes by itself.', { html: cards(6), css: `${BASE}\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 10px;\n}` }, 'Each card is at least 160px wide and shares the spare space. No media query needed.'),
    explore('Reading the magic line', ['grid-template-columns: repeat(', '  auto-fit,', '  minmax(160px, 1fr)', ');'], [
      [2, 'auto-fit: as many columns as fit in the row.', '.grid'],
      [3, 'minmax(160px, 1fr): never narrower than 160px, and share the leftover space equally.', '.c'],
    ], { page: { html: cards(4), css: `${BASE} .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px}` }, minTaps: 2 }),
    live('Change the smallest width', 'Tap a minimum width for each card.', ['.grid { grid-template-columns: repeat(auto-fit, minmax({{v}}, 1fr)); }'], ['160px', '100px', '240px', '320px'], { html: cards(6), css: `${BASE} .grid{display:grid;gap:10px}`, caption: 'Smaller minimums fit more columns; bigger ones fewer.' }),
    check('What does auto-fit do when there are only 2 cards on a wide screen?', ['Stretches the 2 cards to fill the row', 'Leaves empty columns', 'Shows 1 card', 'Breaks the grid'], 'auto-fit folds empty tracks away (auto-fill would keep them).', 'fit = fit the cards to the space.', { mono: false }),
    recap([
      ['🧱', 'repeat(auto-fit, minmax(160px, 1fr))'],
      ['📱', 'One column on phones, more on big screens'],
      ['🚫', 'No media queries to maintain'],
    ]),
  ]),

  lesson('css-i-1-2', 'Page layouts with grid areas', 5, [
    explore('Draw the page', ['.page {', '  display: grid;', '  grid-template-columns: 140px 1fr;', '  grid-template-areas:', '    "head head"', '    "side main"', '    "foot foot";', '}'], [
      [3, 'Two columns: a narrow side and a wide main.', '.page'],
      [5, 'The header spans both columns.', 'header'],
      [6, 'Side and main sit next to each other.', 'main'],
      [7, 'The footer spans both again.', 'footer'],
    ], { page: { html: PAGE, css: `${PAGE_CSS} .page{display:grid;gap:6px;grid-template-columns:140px 1fr;grid-template-areas:"head head" "side main" "foot foot"} header{grid-area:head} nav{grid-area:side} main{grid-area:main} footer{grid-area:foot}` }, minTaps: 3 }),
    resize('Rearrange for phones', 'Tap each width. On phones everything stacks; from 700px the side column appears.', { html: PAGE, css: `${PAGE_CSS}\n.page { display: grid; gap: 6px; grid-template-areas: "head" "main" "side" "foot"; }\nheader { grid-area: head; } nav { grid-area: side; } main { grid-area: main; } footer { grid-area: foot; }\n@media (min-width: 700px) {\n  .page {\n    grid-template-columns: 160px 1fr;\n    grid-template-areas: "head head" "side main" "foot foot";\n  }\n}` }, 'Only the map changes at the breakpoint. On phones, main comes before side, so the content is first.'),
    copy('Match Arden’s layout', 'Pick the map that matches the design.', PAGE, `${PAGE_CSS}\n.page { display: grid; gap: 6px; grid-template-columns: 1fr 140px; }\nheader { grid-area: head; } nav { grid-area: side; } main { grid-area: main; } footer { grid-area: foot; }\n.page {\n  grid-template-areas: {{0}};\n}`, [
      ['grid-template-areas', ['"head head" "side main" "foot foot"', '"head head" "main side" "foot foot"', '"head side" "main side" "foot foot"'], '"head head" "main side" "foot foot"'],
    ]),
    check('How do you make the header span both columns?', ['Write its name twice: "head head"', 'grid-column: all', 'width: 200%', 'span="2"'], 'Repeat the area name across the row.', 'Look at the map.'),
    tapbug('The layout falls apart', ['.page {', '  grid-template-areas: "head head" "side main" "foot";', '}'], [[2, '"foot"', '"foot foot"']], 'Every row of the map needs the same number of columns. The footer row needs two names.'),
    recap([
      ['🗺', 'grid-template-areas draws the page'],
      ['📱', 'Change only the map at a breakpoint'],
      ['🥇', 'Put main before side on phones'],
    ]),
  ]),

  lesson('css-i-1-3', 'A footer that stays at the bottom', 4, [
    toggle('Short pages', [
      ['Floating footer', ['body { margin: 0; }'], 'On a short page the footer floats in the middle of the screen, with empty space below.', { html: '<div class="wrap"><header>Header</header><main>A short page.</main><footer>Footer</footer></div>', css: `${BASE} body{margin:0} .wrap{height:260px;background:#F9FAFB} header,footer{background:#374151;color:white;padding:8px} main{padding:8px}` }],
      ['Stuck to the bottom', ['.wrap {', '  min-height: 100vh;', '  display: grid;', '  grid-template-rows: auto 1fr auto;', '}'], 'The middle row takes all the spare space (1fr), so the footer sits at the bottom however short the page is.', { html: '<div class="wrap"><header>Header</header><main>A short page.</main><footer>Footer</footer></div>', css: `${BASE} body{margin:0} .wrap{height:260px;display:grid;grid-template-rows:auto 1fr auto;background:#F9FAFB} header,footer{background:#374151;color:white;padding:8px} main{padding:8px}` }],
    ]),
    reveal('How it works', [
      ['min-height: 100vh', 'The page is at least as tall as the screen.'],
      ['grid-template-rows: auto 1fr auto', 'Header and footer take their own height; the main row takes the rest.'],
      ['Flex version', 'display: flex; flex-direction: column; and main { flex: 1; } does the same.'],
    ], { mono: true }),
    check('Which row value makes main take the spare space?', ['1fr', 'auto', '100%', 'min-content'], '1fr is “one share of what is left”.', 'A fraction.'),
    tapbug('The footer still floats', ['.wrap {', '  display: grid;', '  grid-template-rows: auto 1fr auto;', '}'], [[2, 'display: grid;', 'display: grid; min-height: 100vh;']], 'Without min-height the wrapper is only as tall as its content, so there is no spare space to fill.'),
    truth([
      ['1fr takes the spare space in a grid', true, 'One share of what is left.'],
      ['min-height: 100vh makes the wrapper at least as tall as the screen', true, 'So there is space to fill.'],
      ['position: fixed is the best way to keep a footer at the bottom', false, 'It covers content on long pages. The grid trick doesn’t.'],
    ]),
    recap([
      ['📏', 'min-height: 100vh on the wrapper'],
      ['🧱', 'rows: auto 1fr auto'],
      ['⬇️', 'The footer sits at the bottom on short pages'],
    ]),
  ]),

  challenge('css-i-1-ch', 'Module 1 Challenge', { icon: '🧱', name: 'Layout Pro' }, ['Build card grids with no media queries', 'Lay out pages with grid areas', 'Keep the footer at the bottom'], [
    mcq(1, 'Which makes as many 200px+ columns as fit?', ['repeat(auto-fit, minmax(200px, 1fr))', 'repeat(200px)', 'columns: auto', 'grid: fit 200px'], 'auto-fit with minmax.', { mono: true }),
    mcq(2, 'What is the difference between auto-fit and auto-fill?', ['auto-fit folds empty columns away; auto-fill keeps them', 'None', 'auto-fill is for flexbox', 'auto-fit needs JavaScript'], 'With few items, auto-fit stretches them.'),
    mcq(3, 'How do you put an element in the "main" area?', ['grid-area: main', 'area: main', 'grid-template: main', 'place: main'], 'grid-area names the area.', { mono: true }),
    mcq(4, 'Which rows keep the footer at the bottom?', ['auto 1fr auto', '1fr 1fr 1fr', 'auto auto auto', '100% auto'], 'The middle row takes the space.', { mono: true }),
    mcq(5, 'On phones, which should come first in a stacked layout?', ['The main content', 'The sidebar', 'The footer', 'It doesn’t matter'], 'Content first.'),
    swipe([
      ['auto-fit + minmax needs media queries', false, 'It adapts on its own.'],
      ['grid-template-areas rows must have the same number of columns', true, 'Or the rule is ignored.'],
      ['min-height: 100vh makes a wrapper at least screen height', true, 'So 1fr has space to fill.'],
      ['A footer sticks to the bottom automatically', false, 'You need the layout trick.'],
    ]),
    pairs([['auto-fit', 'Fold empty columns'], ['minmax()', 'Smallest and largest size'], ['grid-area', 'Join a named area'], ['1fr', 'The spare space']], 'Layout tools.'),
    pickCode('Which sticks a footer to the bottom of short pages?', ['.wrap { min-height: 100vh; display: grid; grid-template-rows: auto 1fr auto; }', '.wrap { height: 100%; }', 'footer { position: bottom; }', 'footer { margin-top: 100vh; }'], 'A full-height grid where the middle row grows.'),
    bugTask(['.grid { grid-template-columns: repeat(auto-fit, minmax(160px 1fr)); }', '.page { grid-template-areas: "head head" "side main main"; }'], [[1, 'minmax(160px 1fr)', 'minmax(160px, 1fr)'], [2, '"side main main"', '"side main"']], 'minmax needs a comma, and every row of the map needs the same number of columns.'),
    xray(
      { html: `${cards(3)}<div class="foot">Footer</div>`, css: `${BASE} .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:8px} .foot{margin-top:10px;background:#374151;color:white;padding:8px;border-radius:8px}` },
      [
        ['.grid', 'The cards that rearrange', 'repeat(auto-fit, minmax())', ['repeat(auto-fit, minmax())', 'float: left', 'display: inline']],
        ['.c', 'One card', 'a grid item', ['a grid item', 'a table cell', 'a flex container']],
        ['.foot', 'The dark bar at the end', 'a normal block after the grid', ['a normal block after the grid', 'position: fixed', 'a grid area']],
      ],
    ),
    arrange(['.page {\n  display: grid;\n}', '.page {\n  grid-template-areas: "head" "main" "foot";\n}', 'header { grid-area: head; }\nmain { grid-area: main; }\nfooter { grid-area: foot; }'], 'make it a grid first, then draw the map, then place each part', PAGE_CSS, '<div class="page"><header>Header</header><main>Main</main><footer>Footer</footer></div>'),
  ]),
];
