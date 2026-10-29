// CSS track · Module 7 · Flexbox. Lesson 7.1 keeps the old flexbox module id (c-flex-1).
import type { Lesson } from '../../types';
import { BASE } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, resize, reveal, swipe, tapbug, xray } from './kit';

const HEADER = '<header class="top">\n  <strong>Rosa’s Café</strong>\n  <nav>Menu · Visit</nav>\n  <a class="btn">Order</a>\n</header>';
const HEAD_CSS = `${BASE} .top { background: #FFF1D6; border-radius: 12px; padding: 10px; gap: 10px; } .top > * { background: white; border: 2px solid #E5D3B3; border-radius: 8px; padding: 6px 10px; } .btn { color: white; background: #C2410C !important; }`;
const ROW = '<div class="row"><div class="i">Tea</div><div class="i tall">Coffee<br>and cake</div><div class="i">Toast</div></div>';
const ROW_CSS = `${BASE} .row { display: flex; height: 150px; background: #FFF1D6; border-radius: 12px; padding: 6px; gap: 6px; } .i { background: #C2410C; color: white; padding: 8px; border-radius: 8px; }`;
const CARDS = '<div class="menu"><div class="c">Lemon Tea</div><div class="c">Coffee</div><div class="c">Cheese Toast</div><div class="c">Sandwich</div><div class="c">Cake</div></div>';
const CARDS_CSS = 'body { font-family: system-ui, sans-serif; margin: 12px; }\n.menu {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.c {\n  flex: 1 1 160px;\n  background: #FFF1D6;\n  padding: 14px;\n  border-radius: 10px;\n}';

export const CSS_M7: Lesson[] = [
  lesson('c-flex-1', 'Lining things up', 5, [
    chat(['Rosa’s header has three things: the café name, the links and an Order button. Right now they sit on top of each other.', 'One line of flexbox puts them in a row.']),
    beforeAfter(
      'One line of CSS',
      [['.top { }'], 'Block children stack up.', { html: HEADER, css: `${HEAD_CSS} .top > * { display: block; margin-bottom: 6px; }` }],
      [['.top { display: flex; }'], 'display: flex on the parent lines its children up in a row.', { html: HEADER, css: `${HEAD_CSS} .top { display: flex; }` }],
    ),
    reveal('Two kinds of box', [
      ['Flex container', 'The parent with display: flex.', '📦'],
      ['Flex items', 'Its direct children. They line up along the main axis.', '🧩'],
      ['Main axis', 'The direction they line up: a row by default.', '➡️'],
      ['Cross axis', 'The other direction, at right angles.', '⬇️'],
    ]),
    live('Change the direction', 'Tap a flex-direction.', ['.top { display: flex; flex-direction: {{v}}; }'], ['row', 'column', 'row-reverse', 'column-reverse'], { html: HEADER, css: HEAD_CSS, caption: 'The direction decides which way is the main axis.' }),
    check('Where does display: flex go?', ['On the parent', 'On each child', 'On the body only', 'On the last child'], 'The parent becomes the flex container; its children become flex items.', 'Who arranges whom?', { mono: false }),
    tapbug('The links still stack', ['nav a {', '  display: flex;', '}'], [[1, 'nav a', 'nav']], 'flex goes on the parent. Here the links are the children, so nav needs display: flex.'),
    recap([
      ['📦', 'display: flex on the parent'],
      ['➡️', 'Children line up along the main axis'],
      ['🔄', 'flex-direction: row or column'],
    ]),
  ]),

  lesson('css-7-2', 'Along the line', 5, [
    live('justify-content', 'It spreads items along the main axis.', ['.top { display: flex; justify-content: {{v}}; }'], ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'], { html: HEADER, css: HEAD_CSS }),
    matchUp('Match the spacing', [['space-between', 'Ends touch the edges'], ['space-around', 'Half-size gaps at the ends'], ['space-evenly', 'Every gap the same'], ['center', 'Bunched in the middle']], 'All the space values share the leftover room differently.'),
    copy('Match Rosa’s header', 'Name on the left, button on the right, links in between.', HEADER, `${HEAD_CSS}\n.top {\n  display: {{0}};\n  justify-content: {{1}};\n}`, [
      ['display', ['block', 'flex'], 'flex'],
      ['justify-content', ['flex-start', 'center', 'space-between'], 'space-between'],
    ]),
    check('Which puts equal gaps everywhere, including the ends?', ['space-evenly', 'space-between', 'space-around', 'stretch'], 'evenly means every gap is the same.', 'between has no gap at the ends.'),
    tapbug('Nothing spreads out', ['.top {', '  justify-content: space-between;', '}'], [[2, 'justify-content: space-between;', 'display: flex; justify-content: space-between;']], 'justify-content only works on a flex (or grid) container. Add display: flex.'),
    recap([
      ['↔️', 'justify-content: along the main axis'],
      ['🧷', 'space-between pushes the ends to the edges'],
      ['🎯', 'center bunches them in the middle'],
    ]),
  ]),

  lesson('css-7-3', 'Across the line', 5, [
    live('align-items', 'It lines items up across the main axis. The row is 150px tall.', ['.row { align-items: {{v}}; }'], ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'], { html: ROW, css: ROW_CSS, caption: 'stretch is the default: items fill the height. baseline lines up the first line of text.' }),
    live('gap', 'Space between items, never at the edges.', ['.row { gap: {{v}}; }'], ['0', '6px', '20px', '40px'], { html: ROW, css: ROW_CSS }),
    reveal('Wrapped lines: align-content', [
      ['align-content', 'When items wrap onto several lines, this spreads the lines themselves, like justify-content but across.'],
      ['Only with wrap', 'One line? align-content does nothing.'],
    ], { mono: true }),
    copy('Centre the button in the bar', 'Middle across and along.', '<div class="bar"><a class="btn">Order now</a></div>', `${BASE}\n.bar { display: flex; height: 120px; background: #FFF1D6; border-radius: 12px; }\n.btn { background: #C2410C; color: white; padding: 10px 16px; border-radius: 20px; }\n.bar {\n  justify-content: {{0}};\n  align-items: {{1}};\n}`, [
      ['justify-content', ['flex-start', 'center', 'flex-end'], 'center'],
      ['align-items', ['stretch', 'flex-start', 'center'], 'center'],
    ]),
    check('In a row, which property moves items up and down?', ['align-items', 'justify-content', 'flex-direction', 'gap'], 'Across the main axis is align-items.', 'justify-content is along the row.'),
    recap([
      ['↕️', 'align-items: across the main axis'],
      ['🧱', 'stretch fills; center centres'],
      ['📏', 'gap: space between items only'],
    ]),
  ]),

  lesson('css-7-4', 'Wrapping', 5, [
    live('Wrap or squash?', 'Five cards, each wanting 160px.', ['.menu { flex-wrap: {{v}}; }'], ['nowrap', 'wrap', 'wrap-reverse'], { html: CARDS, css: `${BASE} .menu { display: flex; gap: 8px; } .c { width: 160px; flex-shrink: 0; background: #FFF1D6; padding: 12px; border-radius: 10px; }`, caption: 'nowrap (the default) keeps one line, even if it spills out. wrap starts a new line.' }),
    resize('Cards that reflow', 'Tap each width. The cards wrap to fit.', { html: CARDS, css: CARDS_CSS }, 'No media query needed: wrap plus a starting width of 160px does it.'),
    reveal('flex-flow', [
      ['flex-flow: row wrap', 'Shorthand for flex-direction and flex-wrap in one line.'],
    ], { mono: true }),
    check('Which lets flex items move onto a new line?', ['flex-wrap: wrap', 'flex-direction: column', 'gap: 10px', 'align-items: wrap'], 'Without wrap, flex items stay in one line.', 'The word is in the lesson title.'),
    tapbug('The cards still squash', ['.menu {', '  display: flex;', '  flex-wrap: true;', '}'], [[3, 'true', 'wrap']], 'flex-wrap takes nowrap, wrap or wrap-reverse, not true.'),
    recap([
      ['↩️', 'flex-wrap: wrap starts new lines'],
      ['📱', 'Wrap + a starting size = cards that fit any screen'],
      ['🧾', 'flex-flow: direction and wrap together'],
    ]),
  ]),

  lesson('css-7-5', 'Flex items', 6, [
    explore('Three numbers for each item', ['.c {', '  flex-grow: 1;', '  flex-shrink: 1;', '  flex-basis: 160px;', '  /* same as: flex: 1 1 160px; */', '}'], [
      [2, 'grow 1: take a share of any leftover space.', '.c'],
      [3, 'shrink 1: give some space back when the row is tight.', '.c'],
      [4, 'basis 160px: the starting size, before any growing or shrinking.', '.c'],
      [5, 'The flex shorthand sets all three in one line: grow, shrink, basis.', '.menu'],
    ], { page: { html: CARDS, css: CARDS_CSS }, minTaps: 3 }),
    live('Grow one item', 'Only the search box grows. Tap a value.', ['.search { flex-grow: {{v}}; }'], ['0', '1', '3'], { html: '<div class="bar"><span class="logo">☕</span><input class="search" placeholder="Search the menu"><a class="btn">Go</a></div>', css: `${BASE} .bar { display: flex; gap: 8px; align-items: center; background: #FFF1D6; padding: 8px; border-radius: 12px; } .logo { font-size: 24px; } .search { padding: 8px; border: 2px solid #E5D3B3; border-radius: 8px; min-width: 0; } .btn { background: #C2410C; color: white; padding: 8px 14px; border-radius: 8px; }`, caption: 'flex-grow shares the leftover space. 0 means “don’t grow”.' }),
    live('Change the order', 'Move the special to the front without touching the HTML.', ['.special { order: {{v}}; }'], ['0', '-1', '5'], { html: '<div class="row"><div class="i">Tea</div><div class="i special">★ Special</div><div class="i">Toast</div></div>', css: `${BASE} .row { display: flex; gap: 6px; } .i { background: #FFF1D6; padding: 10px; border-radius: 8px; } .special { background: #FFE08A; }`, caption: 'Lower order comes first. All items start at 0. Screen readers still read the HTML order, so keep the content order sensible.' }),
    matchUp('Item properties', [['flex-grow', 'Take a share of extra space'], ['flex-shrink', 'Give space back when tight'], ['flex-basis', 'The starting size'], ['align-self', 'Align just this one item']], 'These go on the items, not the container.'),
    check('Which makes one item fill all the leftover space?', ['flex-grow: 1', 'flex-shrink: 1', 'order: 1', 'flex-wrap: grow'], 'grow takes the spare room.', 'Which one grows?'),
    tapbug('The search box won’t stretch', ['.bar {', '  display: flex;', '  flex-grow: 1;', '}'], [[3, 'flex-grow: 1;', '(move to .search)']], 'flex-grow belongs on the item that should grow (.search), not on the container.'),
    recap([
      ['🌱', 'flex-grow / shrink / basis, or flex: 1 1 160px'],
      ['🔢', 'order moves an item visually'],
      ['🎯', 'align-self overrides align-items for one item'],
    ]),
  ]),

  challenge('css-7-ch', 'Module 7 Challenge', { icon: '💪', name: 'Flex Pro' }, ['Turn a parent into a flex container', 'Space and align items in both directions', 'Make items wrap, grow and reorder'], [
    mcq(1, 'Which line makes the children of .nav sit in a row?', ['.nav { display: flex; }', '.nav a { display: flex; }', '.nav { flex: row; }', '.nav { align: row; }'], 'flex goes on the parent.', { mono: true }),
    mcq(2, 'In a row, justify-content works…', ['Left to right (main axis)', 'Top to bottom', 'Only on wrapped lines', 'On the text only'], 'justify-content follows the main axis.'),
    mcq(3, 'Which stops flex items squeezing into one line?', ['flex-wrap: wrap', 'flex-shrink: 1', 'gap: 0', 'order: 1'], 'wrap allows new lines.', { mono: true }),
    mcq(4, 'What does flex: 1 1 200px mean?', ['Grow, shrink, start at 200px', 'Width 1px, height 200px', 'One row, one column, 200px gap', 'Order 1, z-index 1'], 'grow shrink basis.'),
    mcq(5, 'Which aligns just one item differently?', ['align-self', 'align-items', 'justify-content', 'align-content'], 'align-self is set on the item.', { mono: true }),
    swipe([
      ['gap adds space at the outer edges too', false, 'Only between items.'],
      ['flex-direction: column stacks items', true, 'The main axis becomes vertical.'],
      ['order changes the HTML order', false, 'Only how it looks; the HTML stays the same.'],
      ['align-items: stretch is the default', true, 'Items fill the cross axis.'],
    ]),
    pairs([['justify-content', 'Along the main axis'], ['align-items', 'Across the main axis'], ['flex-wrap', 'Allow new lines'], ['flex-grow', 'Share the spare space']], 'Container properties and item properties work together.'),
    pickCode('Which puts the logo left and the button right in a header?', ['.top { display: flex; justify-content: space-between; }', '.top { display: flex; align-items: space-between; }', '.top { justify-content: space-between; }', '.top { display: flex; flex-wrap: between; }'], 'flex, then space-between along the row.'),
    bugTask(['.menu {', '  display: flexbox;', '  justify-content: centre;', '}'], [[2, 'flexbox', 'flex'], [3, 'centre', 'center']], 'The value is flex, not flexbox, and CSS spells center the American way.'),
    xray(
      { html: '<header class="top"><strong>Rosa’s Café</strong><a class="btn">Order</a></header><div class="row"><div class="i">Tea</div><div class="i">Coffee</div></div><div class="bar"><input class="search" placeholder="Search"><a class="go">Go</a></div>', css: 'body{font-family:system-ui,sans-serif;margin:12px} .top{display:flex;justify-content:space-between;align-items:center;background:#FFF1D6;padding:10px;border-radius:12px} .btn{background:#C2410C;color:white;padding:6px 12px;border-radius:8px} .row{display:flex;gap:24px;margin:12px 0} .i{background:#FFE08A;padding:10px;border-radius:8px} .bar{display:flex;gap:6px} .search{flex-grow:1;padding:8px} .go{background:#15803D;color:white;padding:8px 12px;border-radius:8px}' },
      [
        ['.top', 'Name and button pushed to the ends', 'justify-content: space-between', ['justify-content: space-between', 'align-items: center', 'flex-wrap: wrap']],
        ['.row', 'The wide space between Tea and Coffee', 'gap', ['gap', 'margin: auto', 'flex-grow']],
        ['.search', 'The box that fills the bar', 'flex-grow: 1', ['flex-grow: 1', 'flex-shrink: 1', 'order: 1']],
      ],
    ),
    arrange(['.top {\n  display: flex;\n}', '.top {\n  justify-content: space-between;\n  align-items: center;\n}', '.btn {\n  order: -1;\n}'], 'turn the header into a flex row first, then spread and centre it, then move the button to the front', HEAD_CSS, HEADER),
  ]),
];
