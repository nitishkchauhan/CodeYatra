// CSS track · Module 8 · Grid. Lesson 8.1 keeps the old grid module id (c-grid-1).
import type { Lesson } from '../../types';
import { BASE } from './cafe';
import { arrange, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, place, recap, resize, reveal, swipe, tapbug, toggle, xray } from './kit';

const SIX = '<div class="grid"><div>Lemon Tea</div><div>Coffee</div><div>Cheese Toast</div><div>Sandwich</div><div>Cake</div><div>Cookies</div></div>';
const SIX_CSS = `${BASE} .grid { display: grid; gap: 8px; } .grid > div { background: #FFF1D6; border: 2px solid #E5D3B3; padding: 12px 6px; border-radius: 10px; text-align: center; }`;
const PAGE = '<div class="page">\n  <header>Header</header>\n  <nav>Menu</nav>\n  <main>Today’s dishes</main>\n  <footer>Footer</footer>\n</div>';
const PAGE_CSS = `${BASE} .page { display: grid; gap: 6px; height: 220px; } .page > * { border-radius: 8px; padding: 8px; color: white; font-weight: bold; } header { background: #C2410C; } nav { background: #0F766E; } main { background: #4B3FD8; } footer { background: #7C5E45; }`;

export const CSS_M8: Lesson[] = [
  lesson('c-grid-1', 'Grid basics', 5, [
    chat(['Flexbox lines things up in one direction. Grid works in two at once: rows and columns.', 'Rosa’s menu has six dishes. She wants neat cards that line up both ways, like an ice cube tray.']),
    live('How many columns?', 'Tap a column setting.', ['.grid { grid-template-columns: {{v}}; }'], ['1fr', '1fr 1fr', '1fr 1fr 1fr', '100px 1fr', '2fr 1fr'], { html: SIX, css: SIX_CSS, caption: 'fr means a fraction of the free space. 2fr 1fr gives the first column twice as much.' }),
    explore('A grid in three lines', ['.grid {', '  display: grid;', '  grid-template-columns: 1fr 1fr 1fr;', '  gap: 8px;', '}'], [
      [2, 'The parent becomes a grid container. Its children are grid items.', '.grid'],
      [3, 'Three columns, each one equal fraction. Rows are made automatically.', '.grid'],
      [4, 'gap: the space between cells, both ways.', '.grid'],
    ], { page: { html: SIX, css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; }` }, minTaps: 3 }),
    place('Make a two-column menu', 'Fill the gaps for two equal columns.', [['.grid {'], ['  display: ', { gap: 0 }, ';'], ['  grid-template-columns: ', { gap: 1 }, ';'], ['}']], ['grid', '1fr 1fr', 'flex', '2', 'two'], ['grid', '1fr 1fr'], 'display: grid, then one value per column.', { html: SIX, css: SIX_CSS }),
    check('What does 1fr mean?', ['One share of the free space', 'One pixel', 'One row', 'One font size'], 'fr is a fraction of the leftover room.', 'Think “fraction”.', { mono: false }),
    recap([
      ['🔲', 'display: grid on the parent'],
      ['📊', 'grid-template-columns sets the columns'],
      ['🍰', 'fr shares out the free space'],
    ]),
  ]),

  lesson('css-8-2', 'Tracks that fit any screen', 6, [
    reveal('Helpers for columns and rows', [
      ['repeat(4, 1fr)', 'Four equal columns, without writing 1fr four times.'],
      ['minmax(150px, 1fr)', 'At least 150px, at most one share.'],
      ['repeat(auto-fill, minmax(150px, 1fr))', 'As many 150px+ columns as fit. The most useful line in grid.'],
      ['grid-template-rows: 80px auto', 'Rows work the same way.'],
    ], { mono: true }),
    resize('The menu that fits', 'Tap each width. The number of columns changes by itself.', { html: SIX, css: 'body { font-family: system-ui, sans-serif; margin: 12px; }\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 8px;\n}\n.grid > div { background: #FFF1D6; padding: 14px 6px; border-radius: 10px; text-align: center; }' }, 'One column on a phone, up to six on a wide screen, with no media query.'),
    live('auto-fill or auto-fit?', 'Only two dishes today. Watch the empty space.', ['.grid { grid-template-columns: repeat({{v}}, minmax(100px, 1fr)); }'], ['auto-fill', 'auto-fit'], { html: '<div class="grid"><div>Tea</div><div>Toast</div></div>', css: SIX_CSS, caption: 'auto-fill keeps empty columns; auto-fit folds them away so the items stretch.' }),
    check('Which makes four equal columns?', ['repeat(4, 1fr)', 'columns(4)', '4fr', 'repeat(1fr, 4)'], 'repeat(how many, size).', 'Count first, then the size.'),
    tapbug('The grid has one column', ['.grid {', '  display: grid;', '  grid-template-columns: repeat(auto-fill, 150px 1fr);', '}'], [[3, '150px 1fr', 'minmax(150px, 1fr)']], 'The flexible size needs minmax(): at least 150px, at most 1fr.'),
    recap([
      ['🔁', 'repeat() saves typing'],
      ['📏', 'minmax() sets a smallest and largest size'],
      ['📱', 'auto-fill + minmax = columns that fit any screen'],
    ]),
  ]),

  lesson('css-8-3', 'Gaps and alignment', 4, [
    live('Gaps', 'Tap a gap.', ['.grid { gap: {{v}}; }'], ['0', '8px', '20px', '4px 24px'], { html: SIX, css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; }`, caption: 'Two values: the row gap, then the column gap.' }),
    live('Line up inside the cells', 'Each cell is 80px tall. Tap a value.', ['.grid { place-items: {{v}}; }'], ['stretch', 'center', 'start', 'end', 'start center'], { html: SIX, css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; grid-auto-rows: 80px; } .grid > div { padding: 6px; }`, caption: 'place-items sets align-items (up and down) and justify-items (across) together.' }),
    matchUp('Match the alignment', [['justify-items', 'Across, inside each cell'], ['align-items', 'Up and down, inside each cell'], ['place-items', 'Both at once'], ['justify-content', 'The whole grid inside its box']], 'items move things inside cells; content moves the whole grid.'),
    check('Which sets both the row gap and the column gap?', ['gap', 'margin', 'padding', 'space'], 'One gap value sets both; two values set them separately.', 'It’s a three-letter word.'),
    copy('Centre every dish', 'Match the target: roomy gaps, dishes in the middle of tall cells.', SIX, `${SIX_CSS}\n.grid { grid-template-columns: 1fr 1fr 1fr; grid-auto-rows: 70px; }\n.grid > div { padding: 4px; }\n.grid {\n  gap: {{0}};\n  place-items: {{1}};\n}`, [
      ['gap', ['0', '16px'], '16px'],
      ['place-items', ['stretch', 'start', 'center'], 'center'],
    ]),
    recap([
      ['↔️', 'gap: row gap, column gap'],
      ['🎯', 'place-items centres content in every cell'],
      ['📦', 'justify-content moves the whole grid'],
    ]),
  ]),

  lesson('css-8-4', 'Placing items', 5, [
    explore('Span lines', ['.special {', '  grid-column: span 2;', '}', '.board {', '  grid-row: 1 / 3;', '}'], [
      [2, 'span 2: this cell takes two columns.', '.special'],
      [5, 'Grid lines are numbered from 1. 1 / 3 means from line 1 to line 3: two rows.', '.board'],
    ], { page: { html: '<div class="grid"><div class="board">Specials board</div><div class="special">★ Today’s special</div><div>Tea</div><div>Coffee</div><div>Toast</div></div>', css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; } .special { grid-column: span 2; background: #FFE08A; } .board { grid-row: 1 / 3; background: #E0E7FF; }` }, minTaps: 2 }),
    live('Make it wide', 'Tap how many columns the special takes.', ['.special { grid-column: {{v}}; }'], ['auto', 'span 2', 'span 3', '1 / -1'], { html: '<div class="grid"><div>Tea</div><div class="special">★ Special</div><div>Coffee</div><div>Toast</div><div>Cake</div></div>', css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; } .special { background: #FFE08A; }`, caption: '1 / -1 means from the first line to the last: the full width.' }),
    toggle('order in a grid', [
      ['HTML order', ['/* no order */'], 'Items fill the cells in the order they are written.', { html: '<div class="grid"><div>Tea</div><div>Coffee</div><div class="hot">🔥 Hot pick</div></div>', css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; } .hot { background: #FFE08A; }` }],
      ['order: -1', ['.hot { order: -1; }'], 'Like flexbox: a lower order comes first.', { html: '<div class="grid"><div>Tea</div><div>Coffee</div><div class="hot">🔥 Hot pick</div></div>', css: `${SIX_CSS} .grid { grid-template-columns: 1fr 1fr 1fr; } .hot { background: #FFE08A; order: -1; }` }],
    ]),
    check('In a 3-column grid, which makes an item fill the whole row?', ['grid-column: 1 / -1;', 'grid-column: 3;', 'grid-row: span 3;', 'width: 3fr;'], 'From the first line to the last line.', '-1 means the last line.'),
    tapbug('The special stays one cell wide', ['.special {', '  grid-column: 2;', '}'], [[2, '2', 'span 2']], 'grid-column: 2 puts it in column 2. span 2 makes it two columns wide.'),
    recap([
      ['↔️', 'grid-column: span 2 takes two columns'],
      ['🔢', 'Lines are numbered from 1; -1 is the last'],
      ['🔀', 'order moves items, as in flexbox'],
    ]),
  ]),

  lesson('css-8-5', 'Named areas', 6, [
    chat(['Grid can draw a whole page layout from a little map made of words.', 'You name the areas, then draw them in the CSS like a picture.']),
    explore('Draw the layout', ['.page {', '  display: grid;', '  grid-template-columns: 1fr 3fr;', '  grid-template-areas:', '    "head head"', '    "side main"', '    "foot foot";', '}', 'header { grid-area: head; }'], [
      [3, 'Two columns: a thin one and a wide one.', '.page'],
      [5, 'Row one: the header across both columns.', 'header'],
      [6, 'Row two: the menu on the side, the main part on the right.', 'main'],
      [9, 'Each element joins an area by name.', 'header'],
    ], { page: { html: PAGE, css: `${PAGE_CSS} .page { grid-template-columns: 1fr 3fr; grid-template-rows: auto 1fr auto; grid-template-areas: "head head" "side main" "foot foot"; } header { grid-area: head; } nav { grid-area: side; } main { grid-area: main; } footer { grid-area: foot; }` }, minTaps: 3 }),
    live('Redraw the map', 'Tap a layout. Only the map changes.', ['.page { grid-template-areas: {{v}}; }'], ['"head head" "side main" "foot foot"', '"head head" "main side" "foot foot"', '"side head" "side main" "side foot"', '"head head" "main main" "side foot"'], { html: PAGE, css: `${PAGE_CSS} .page { grid-template-columns: 1fr 3fr; } header { grid-area: head; } nav { grid-area: side; } main { grid-area: main; } footer { grid-area: foot; }` }),
    reveal('The 12-column layout', [
      ['What it is', 'Many sites split the page into 12 equal columns: repeat(12, 1fr).', '📐'],
      ['Why 12', 'It divides into halves, thirds, quarters and sixths.', '➗'],
      ['Using it', 'A sidebar takes span 3, the main part span 9.', '🧱'],
    ]),
    check('In grid-template-areas, how do you make an area span two columns?', ['Write its name twice in the row', 'Use span 2 in the name', 'Write it in capitals', 'Add a * after it'], '"head head" puts head in both columns.', 'Look at the header row.', { mono: false }),
    tapbug('The layout is broken', ['.page {', '  grid-template-areas:', '    "head head"', '    "side main main"', '    "foot foot";', '}'], [[4, '"side main main"', '"side main"']], 'Every row in the map must have the same number of columns.'),
    recap([
      ['🗺', 'grid-template-areas draws the layout'],
      ['🏷', 'grid-area: name puts an element in its area'],
      ['📐', 'Same number of columns in every row'],
    ]),
  ]),

  challenge('css-8-ch', 'Module 8 Challenge', { icon: '🧱', name: 'Grid Builder' }, ['Build grids with columns, rows and gaps', 'Make grids that fit every screen', 'Place items by line, span and named area'], [
    mcq(1, 'What does grid-template-columns: 1fr 2fr make?', ['Two columns; the second twice as wide', 'Three equal columns', 'One column, two rows', 'Two rows'], 'One value per column; fr shares the space.'),
    mcq(2, 'Which gives as many 120px-or-wider columns as fit?', ['repeat(auto-fill, minmax(120px, 1fr))', 'repeat(120px)', 'auto-columns: 120px', 'columns: fit 120px'], 'auto-fill with minmax.', { mono: true }),
    mcq(3, 'What does grid-column: span 2 do?', ['Makes the item two columns wide', 'Moves it to column 2', 'Adds two columns', 'Makes two copies'], 'span = stretch across.'),
    mcq(4, 'In a grid, what does -1 refer to?', ['The last line', 'Nothing', 'The first line', 'A hidden column'], 'Negative numbers count from the end.'),
    mcq(5, 'Why is a 12-column grid popular?', ['12 divides into halves, thirds, quarters and sixths', 'Phones have 12 columns', 'CSS requires it', 'It loads faster'], 'It splits up many ways.'),
    swipe([
      ['Grid works in two directions at once', true, 'Rows and columns.'],
      ['gap adds space around the outside of the grid', false, 'Only between cells.'],
      ['Each row of grid-template-areas needs the same number of columns', true, 'Otherwise the rule is ignored.'],
      ['fr is the same as px', false, 'fr is a share of the free space.'],
    ]),
    pairs([['repeat(3, 1fr)', 'Three equal columns'], ['grid-row: 1 / 3', 'From row line 1 to 3'], ['grid-area: main', 'Join the main area'], ['place-items: center', 'Centre in every cell']], 'Grid properties for the container and its items.'),
    pickCode('Which makes a header span the full width of a 4-column grid?', ['header { grid-column: 1 / -1; }', 'header { grid-column: 4; }', 'header { width: 4fr; }', 'header { grid-row: span 4; }'], 'From the first line to the last.'),
    bugTask(['.menu {', '  display: grid;', '  grid-template-columns: 1fr, 1fr, 1fr;', '  grid-gap 10px;', '}'], [[3, '1fr, 1fr, 1fr', '1fr 1fr 1fr'], [4, 'grid-gap 10px', 'gap: 10px']], 'Track sizes are separated by spaces, not commas. And every declaration needs a colon (gap is the modern name).'),
    xray(
      { html: '<div class="page"><header>Rosa’s Café</header><nav>Menu</nav><main><div class="dishes"><div>Tea</div><div class="wide">★ Special</div><div>Coffee</div><div>Toast</div></div></main></div>', css: 'body{font-family:system-ui,sans-serif;margin:10px} .page{display:grid;grid-template-columns:1fr 3fr;grid-template-areas:"head head" "side main";gap:6px} header{grid-area:head;background:#C2410C;color:white;padding:8px;border-radius:8px} nav{grid-area:side;background:#0F766E;color:white;padding:8px;border-radius:8px} .dishes{display:grid;grid-template-columns:repeat(3,1fr);gap:6px} .dishes>div{background:#FFF1D6;padding:10px 4px;border-radius:8px;text-align:center} .wide{grid-column:span 2;background:#FFE08A !important}' },
      [
        ['header', 'The bar across both columns', 'grid-area: head', ['grid-area: head', 'position: sticky', 'float: top']],
        ['.dishes', 'The three equal columns of dishes', 'repeat(3, 1fr)', ['repeat(3, 1fr)', 'flex-wrap: wrap', '3fr']],
        ['.wide', 'The special, two cells wide', 'grid-column: span 2', ['grid-column: span 2', 'grid-row: 2', 'width: 200%']],
      ],
    ),
    arrange(['.page {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n}', '.page {\n  grid-template-areas: "head head" "side main" "foot foot";\n}', 'header {\n  grid-area: head;\n}'], 'make the page a two-column grid first, then draw the map, then put the header in its area', `${PAGE_CSS} nav { grid-area: side; } main { grid-area: main; } footer { grid-area: foot; }`, PAGE),
  ]),
];
