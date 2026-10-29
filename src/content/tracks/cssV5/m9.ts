// CSS track · Module 9 · Styling Page Parts: links, buttons, lists, tables, forms, menus and small parts.
import type { Lesson } from '../../types';
import { BASE } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const BTN_CSS = `${BASE} .btn { display: inline-block; padding: 10px 18px; border-radius: 10px; background: #C2410C; color: white; text-decoration: none; font-weight: bold; }`;
const LIST = '<ul class="menu">\n  <li>Lemon Tea</li>\n  <li>Coffee</li>\n  <li>Cheese Toast</li>\n</ul>';
const TABLE = '<table>\n  <tr><th>Dish</th><th>Price</th></tr>\n  <tr><td>Lemon Tea</td><td>₹40</td></tr>\n  <tr><td>Coffee</td><td>₹60</td></tr>\n  <tr><td>Cheese Toast</td><td>₹80</td></tr>\n  <tr><td>Veg Sandwich</td><td>₹90</td></tr>\n</table>';
const FORM = '<form class="order">\n  <label>Name <input type="text" placeholder="Your name"></label>\n  <label>Dish <select><option>Lemon Tea</option><option>Coffee</option></select></label>\n  <label><input type="checkbox" checked> Extra hot</label>\n  <button>Place order</button>\n</form>';
const NAV = '<nav class="nav">\n  <a href="#">Home</a>\n  <a href="#" class="on">Menu</a>\n  <a href="#">Visit</a>\n</nav>';

export const CSS_M9: Lesson[] = [
  lesson('css-9-1', 'Links and buttons', 6, [
    chat(['A link can be in one of four states: not yet visited, visited, under the finger or mouse, and being pressed.', 'Good sites style each one, so people know what’s clickable and what just happened.']),
    reveal('The four link states', [
      ['a:link', 'Not visited yet.'],
      ['a:visited', 'Already visited.'],
      ['a:hover', 'The mouse is over it.'],
      ['a:active', 'Being clicked or tapped right now.'],
      ['The order', 'Write them in this order: link, visited, hover, active. Later rules win, so the wrong order hides hover or active.'],
    ], { mono: true }),
    toggle('Make a link look like a button', [
      ['Plain link', ['<a href="#">Order now</a>'], 'Blue and underlined: the browser default.', { html: '<a href="#">Order now</a>', css: BASE }],
      ['Button style', ['.btn { display: inline-block;', '  padding: 10px 18px;', '  background: #C2410C; color: white;', '  border-radius: 10px;', '  text-decoration: none; }'], 'Padding, colour, rounded corners and no underline. Still a link underneath.', { html: '<a href="#" class="btn">Order now</a>', css: BTN_CSS }],
      ['Hovered', ['.btn:hover { background: #9A3412; }'], 'A darker shade on hover tells the user it will respond.', { html: '<a href="#" class="btn">Order now</a>', css: `${BTN_CSS} .btn { background: #9A3412; }` }],
    ]),
    live('Button styles', 'Tap a style.', ['.btn { {{v}} }'], ['background: #C2410C; color: white;', 'background: white; color: #C2410C; border: 2px solid #C2410C;', 'background: none; color: #C2410C; text-decoration: underline;'], { html: '<a href="#" class="btn">Order now</a>', css: `${BASE} .btn { display: inline-block; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-weight: bold; }`, caption: 'Filled for the main action, outlined for the second, a plain link for the third.' }),
    reveal('Button groups', [
      ['Side by side', 'Put buttons in a flex row with a small gap.'],
      ['Joined', 'gap: 0 and round only the outer corners, like a segmented switch.'],
    ]),
    check('In which order should link states be written?', [':link, :visited, :hover, :active', ':hover, :active, :link, :visited', ':active, :hover, :visited, :link', 'Any order'], 'Later rules win, so hover and active must come after link and visited.', 'Remember: later wins.'),
    recap([
      ['🔗', ':link, :visited, :hover, :active, in that order'],
      ['🔘', 'Padding + background + no underline = a link button'],
      ['🌗', 'Change the shade on hover'],
    ]),
  ]),

  lesson('css-9-2', 'Lists', 4, [
    live('Bullet style', 'Tap a marker.', ['.menu { list-style-type: {{v}}; }'], ['disc', 'circle', 'square', 'decimal', 'none'], { html: LIST, css: BASE }),
    explore('Custom markers', ['.menu li::marker {', '  color: #C2410C;', '}', '.menu { list-style: "☕ "; }'], [
      [1, '::marker is the bullet itself. You can colour and size it.', 'li'],
      [4, 'list-style can even take your own text or emoji as the bullet.', '.menu'],
    ], { page: { html: LIST, css: `${BASE} .menu li::marker { color: #C2410C; } .menu { list-style: "☕ "; }` }, minTaps: 2 }),
    beforeAfter(
      'A list becomes a menu bar',
      [[LIST], 'A normal list: bullets, one item per line.', { html: LIST, css: BASE }],
      [['.menu { list-style: none;', '  padding: 0; display: flex; gap: 8px; }', '.menu li { background: #FFF1D6;', '  padding: 6px 12px; border-radius: 20px; }'], 'No bullets, no indent, a flex row of rounded tags. Menus are lists underneath.', { html: LIST, css: `${BASE} .menu { list-style: none; padding: 0; display: flex; gap: 8px; } .menu li { background: #FFF1D6; padding: 6px 12px; border-radius: 20px; }` }],
    ),
    tapbug('The bullets are still there', ['.menu {', '  list-style: hidden;', '}'], [[2, 'hidden', 'none']], 'Bullets are removed with list-style: none.'),
    matchUp('Match the marker', [['disc', 'A filled circle'], ['square', 'A small square'], ['decimal', '1. 2. 3.'], ['none', 'No marker at all']], 'list-style-type picks the bullet.'),
    recap([
      ['•', 'list-style-type sets the bullet'],
      ['🎨', '::marker styles the bullet itself'],
      ['📋', 'list-style: none + flex turns a list into a menu'],
    ]),
  ]),

  lesson('css-9-3', 'Tables', 5, [
    beforeAfter(
      'From plain to neat',
      [['table, td, th { border: 1px solid #999; }'], 'Double lines: every cell has its own border.', { html: TABLE, css: `${BASE} table, td, th { border: 1px solid #999; }` }],
      [['table { border-collapse: collapse; width: 100%; }', 'th, td { padding: 8px; border-bottom: 1px solid #E5D3B3; }'], 'border-collapse merges the double lines; padding gives each cell room.', { html: TABLE, css: `${BASE} table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; border-bottom: 1px solid #E5D3B3; text-align: left; }` }],
    ),
    live('Stripe the rows', 'Tap a stripe rule.', ['tr:nth-child({{v}}) { background: #FFF1D6; }'], ['even', 'odd', '3n'], { html: TABLE, css: `${BASE} table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; text-align: left; }`, caption: 'Stripes help the eye follow a row across. :nth-child is covered properly in Module 10.' }),
    reveal('More table settings', [
      ['text-align: right', 'Line numbers and prices up on the right.'],
      ['vertical-align', 'Top, middle or bottom inside a cell.'],
      ['th { position: sticky; top: 0; }', 'A header row that stays while the table scrolls.'],
      ['overflow-x: auto on a wrapper', 'A wide table scrolls sideways on a phone instead of breaking the page.'],
    ], { mono: true }),
    copy('Match the price list', 'Style the table like the target.', TABLE, `${BASE}\ntable { width: 100%; }\nth { background: #C2410C; color: white; }\nth, td { padding: 8px; text-align: left; }\ntable {\n  border-collapse: {{0}};\n}\ntr:nth-child(even) {\n  background: {{1}};\n}`, [
      ['border-collapse', ['separate', 'collapse'], 'collapse'],
      ['even rows', ['white', '#FFF1D6'], '#FFF1D6'],
    ]),
    check('Which removes the double borders between cells?', ['border-collapse: collapse', 'border: none', 'cell-spacing: 0', 'table-border: single'], 'collapse merges neighbouring borders.', 'The name says it.'),
    recap([
      ['🧾', 'border-collapse: collapse for single lines'],
      ['🦓', 'tr:nth-child(even) for stripes'],
      ['📱', 'Wrap wide tables in overflow-x: auto'],
    ]),
  ]),

  lesson('css-9-4', 'Forms', 6, [
    beforeAfter(
      'Riya’s order form',
      [[FORM], 'The browser’s default form: small, cramped and grey.', { html: FORM, css: BASE }],
      [['label { display: block; margin-bottom: 10px; }', 'input, select { width: 100%; padding: 10px;', '  border: 2px solid #E5D3B3; border-radius: 8px; }', 'button { padding: 12px; width: 100%; … }'], 'Full-width fields, big tap targets and clear borders: easy on a phone.', { html: FORM, css: `${BASE} label { display: block; margin-bottom: 10px; } input[type="text"], select { display: block; width: 100%; box-sizing: border-box; padding: 10px; border: 2px solid #E5D3B3; border-radius: 8px; font-size: 16px; } button { width: 100%; padding: 12px; background: #C2410C; color: white; border: 0; border-radius: 10px; font-size: 16px; font-weight: bold; }` }],
    ),
    explore('Style the focus', ['input:focus {', '  border-color: #C2410C;', '  outline: 3px solid #FDBA74;', '}'], [
      [1, ':focus applies while the field is being typed in.', 'input'],
      [3, 'A clear ring shows exactly where the typing will go. Never remove focus styles without a replacement.', 'input'],
    ], { page: { html: '<input type="text" placeholder="Tap here, then look">', css: `${BASE} input { padding: 10px; border: 2px solid #E5D3B3; border-radius: 8px; font-size: 16px; } input:focus { border-color: #C2410C; outline: 3px solid #FDBA74; }` }, minTaps: 2 }),
    live('Brand the checkboxes', 'accent-color recolours checkboxes, radios and sliders in one line.', ['input { accent-color: {{v}}; }'], ['auto', '#C2410C', '#15803D', '#4B3FD8'], { html: '<label><input type="checkbox" checked> Extra hot</label><br><label><input type="radio" name="s" checked> Small</label> <label><input type="radio" name="s"> Large</label><br><input type="range">', css: `${BASE} label { font-size: 18px; }` }),
    reveal('Little things that help', [
      ['font-size: 16px or more', 'Phones zoom in on smaller text boxes. 16px stops the jump.'],
      ['textarea { resize: vertical; }', 'Let people make the box taller, but not wider than the page.'],
      ['::placeholder', 'Style the hint text, but keep it readable.'],
      ['Search icons', 'A background-image on the input, with padding-left to make room.'],
    ], { mono: true }),
    check('Which pseudo-class styles the field someone is typing in?', [':focus', ':hover', ':active', ':typing'], ':focus is the field that has the keyboard.', 'Which one has the keyboard’s attention?'),
    tapbug('The fields spill out of the form', ['input {', '  width: 100%;', '  padding: 10px;', '  box-sizing: content-box;', '}'], [[4, 'content-box', 'border-box']], 'With content-box, 100% plus padding is wider than the form. border-box keeps it inside.'),
    recap([
      ['📝', 'Full-width fields with padding are easy to tap'],
      ['🎯', ':focus shows where typing goes'],
      ['🎨', 'accent-color brands checkboxes and radios'],
    ]),
  ]),

  lesson('css-9-5', 'Navigation bars and dropdowns', 6, [
    toggle('Two kinds of navigation bar', [
      ['Horizontal', ['.nav { display: flex; gap: 4px; }', '.nav a { padding: 10px 14px; }'], 'A row of links across the top.', { html: NAV, css: `${BASE} .nav { display: flex; gap: 4px; background: #3B2A1A; padding: 4px; border-radius: 10px; } .nav a { color: white; text-decoration: none; padding: 10px 14px; border-radius: 8px; } .nav .on { background: #C2410C; }` }],
      ['Vertical', ['.nav { display: flex;', '  flex-direction: column; }'], 'A column of links, like a side menu.', { html: NAV, css: `${BASE} .nav { display: flex; flex-direction: column; width: 160px; background: #3B2A1A; padding: 4px; border-radius: 10px; } .nav a { color: white; text-decoration: none; padding: 10px 14px; border-radius: 8px; } .nav .on { background: #C2410C; }` }],
    ]),
    explore('Show the current page', ['.nav a.on {', '  background: #C2410C;', '}', '.nav a:hover {', '  background: #5B4433;', '}'], [
      [1, 'A class on the current page’s link…', '.on'],
      [2, '…gives it a different look, so people know where they are.', '.on'],
      [4, 'Hover gives a gentler change, for the other links.'],
    ], { page: { html: NAV, css: `${BASE} .nav { display: flex; gap: 4px; background: #3B2A1A; padding: 4px; border-radius: 10px; } .nav a { color: white; text-decoration: none; padding: 10px 14px; border-radius: 8px; } .nav a.on { background: #C2410C; } .nav a:hover { background: #5B4433; }` }, minTaps: 2 }),
    toggle('A dropdown', [
      ['Closed', ['.drop .list { display: none; }'], 'The list is hidden until it’s needed.', { html: '<div class="drop"><button>Drinks ▾</button><div class="list"><a>Lemon Tea</a><a>Coffee</a><a>Cold Coffee</a></div></div>', css: `${BASE} .drop { position: relative; display: inline-block; } button { padding: 8px 14px; border-radius: 8px; border: 2px solid #E5D3B3; background: white; } .list { display: none; position: absolute; top: 100%; left: 0; background: white; box-shadow: 0 6px 16px rgb(0 0 0 / 0.15); border-radius: 8px; min-width: 150px; } .list a { display: block; padding: 8px 12px; }` }],
      ['Open', ['.drop:hover .list,', '.drop:focus-within .list {', '  display: block; }'], 'Hovering, or tabbing into it with a keyboard, shows the list. position: absolute floats it over the page.', { html: '<div class="drop"><button>Drinks ▾</button><div class="list"><a>Lemon Tea</a><a>Coffee</a><a>Cold Coffee</a></div></div><p>The rest of the page stays where it is.</p>', css: `${BASE} .drop { position: relative; display: inline-block; } button { padding: 8px 14px; border-radius: 8px; border: 2px solid #E5D3B3; background: white; } .list { display: block; position: absolute; top: 100%; left: 0; background: white; box-shadow: 0 6px 16px rgb(0 0 0 / 0.15); border-radius: 8px; min-width: 150px; } .list a { display: block; padding: 8px 12px; }` }],
    ]),
    reveal('Phones don’t hover', [
      ['Touch screens', 'There is no mouse to hover with, so a tap usually opens menus. JavaScript handles the tap (the JS track).', '👆'],
      ['focus-within', 'Opens the dropdown for keyboard users too.', '⌨️'],
    ]),
    check('Which keeps a dropdown list from pushing the page down when it opens?', ['position: absolute on the list', 'display: inline on the list', 'z-index on the page', 'float on the button'], 'absolute lifts it out of the flow, so it floats over the page.', 'Which takes it out of the flow?'),
    tapbug('The dropdown never opens', ['.drop .list { display: none; }', '.drop:hover { display: block; }'], [[2, '.drop:hover', '.drop:hover .list']], 'The rule shows .drop itself, which is already visible. It must target the list inside: .drop:hover .list.'),
    recap([
      ['🧭', 'A nav is a flex row (or column) of links'],
      ['📍', 'Mark the current page with a class'],
      ['🔽', 'Dropdown: hidden list, shown on hover or focus-within'],
    ]),
  ]),

  lesson('css-9-6', 'Small parts', 6, [
    toggle('Four small patterns', [
      ['Tooltip', ['.tip { position: relative; }', '.tip::after { content: attr(data-tip);', '  position: absolute; bottom: 120%; }'], 'A small label above an element, made from ::after (Module 10). attr() reads the text from the HTML.', { html: '<p style="margin-top:50px">Try our <span class="tip" data-tip="Ginger, lemon and honey">house tea</span> today.</p>', css: `${BASE} .tip { position: relative; border-bottom: 2px dotted #C2410C; } .tip::after { content: attr(data-tip); position: absolute; bottom: 120%; left: 0; white-space: nowrap; background: #3B2A1A; color: white; font-size: 13px; padding: 4px 8px; border-radius: 6px; }` }],
      ['Pagination', ['.pages { display: flex; gap: 6px; }', '.pages a.on { background: #C2410C; }'], 'Page numbers in a row, the current one highlighted.', { html: '<div class="pages"><a>‹</a><a>1</a><a class="on">2</a><a>3</a><a>›</a></div>', css: `${BASE} .pages { display: flex; gap: 6px; } .pages a { width: 36px; height: 36px; display: grid; place-items: center; border: 2px solid #E5D3B3; border-radius: 8px; } .pages a.on { background: #C2410C; color: white; border-color: #C2410C; }` }],
      ['Gallery', ['.gallery { display: grid;', '  grid-template-columns: repeat(3, 1fr); }', '.gallery img { width: 100%;', '  aspect-ratio: 1; object-fit: cover; }'], 'A grid of square photos (Modules 8 and 11).', { html: '<div class="gallery"><img src="dish.svg" alt="Toast"><img src="banner.svg" alt="Café"><img src="riya.svg" alt="Riya"><img src="banner.svg" alt="Café"><img src="dish.svg" alt="Toast"><img src="riya.svg" alt="Riya"></div>', css: `${BASE} .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; } .gallery img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; }` }],
      ['Columns', ['.story { columns: 2;', '  column-gap: 20px;', '  column-rule: 1px solid #E5D3B3; }'], 'Text that flows into newspaper columns.', { html: '<p class="story">Riya started the café in 2024 with one kettle and four chairs. Students from the college nearby came for the lemon tea and stayed for the cheese toast. Today there are twelve tables, a garden corner and a shelf of books anyone can borrow. The kettle is still the same one.</p>', css: `${BASE} .story { columns: 2; column-gap: 20px; column-rule: 1px solid #E5D3B3; }` }],
    ], 'Tap each pattern.'),
    matchUp('Which pattern?', [['attr(data-tip)', 'Tooltip'], ['columns: 2', 'Newspaper columns'], ['object-fit: cover', 'Photo gallery'], ['a.on', 'Current page number']], 'Each small pattern combines things you already know.'),
    live('How many columns?', 'Tap a value.', ['.story { columns: {{v}}; }'], ['1', '2', '3', '12em'], { html: '<p class="story">Riya started the café in 2024 with one kettle and four chairs. Students from the college nearby came for the lemon tea and stayed for the cheese toast. Today there are twelve tables, a garden corner and a shelf of books anyone can borrow.</p>', css: `${BASE} .story { column-gap: 16px; column-rule: 1px solid #E5D3B3; }`, caption: '12em means “as many columns as fit, each at least 12em wide”.' }),
    check('Where does a tooltip’s text usually come from in a CSS-only tooltip?', ['content: attr(data-tip)', 'The title of the page', 'A <tooltip> tag', 'font-family'], 'attr() copies an attribute’s text into content.', 'Look at the ::after rule.'),
    tapbug('The tooltip shows nowhere', ['.tip::after {', '  content: attr(data-tip);', '  position: absolute;', '}', '.tip { position: static; }'], [[5, 'static', 'relative']], 'The tooltip is absolute, so its parent must be positioned (relative) to keep it next to the word.'),
    recap([
      ['💬', 'Tooltip: ::after + attr() + absolute'],
      ['🔢', 'Pagination and galleries: flex and grid'],
      ['📰', 'columns flows text into newspaper columns'],
    ]),
  ]),

  challenge('css-9-ch', 'Module 9 Challenge', { icon: '🧩', name: 'Page Stylist' }, ['Style links, buttons, lists and tables', 'Make forms easy to use on a phone', 'Build menus, dropdowns and small page parts'], [
    mcq(1, 'Which state styles a link while it is being pressed?', [':active', ':hover', ':visited', ':focus'], 'active is the moment of the press.', { mono: true }),
    mcq(2, 'Which removes list bullets?', ['list-style: none', 'bullets: off', 'list-type: hidden', 'marker: 0'], 'list-style: none.', { mono: true }),
    mcq(3, 'Why use font-size: 16px on phone inputs?', ['So the phone doesn’t zoom in', 'To make them bold', 'It is required by HTML', 'To hide the keyboard'], 'Smaller text makes many phones zoom in.'),
    mcq(4, 'What does accent-color change?', ['Checkboxes, radios and sliders', 'Every text colour', 'Link colours', 'The page background'], 'One line brands form controls.'),
    mcq(5, 'Which shows a dropdown to keyboard users who tab into it?', [':focus-within', ':hover', ':visited', ':empty'], 'focus-within matches when anything inside has focus.', { mono: true }),
    swipe([
      ['Menus are usually lists underneath', true, 'ul and li, styled as a row.'],
      ['Touch screens hover just like a mouse', false, 'Phones usually need a tap.'],
      ['border-collapse merges double table borders', true, 'One line between cells.'],
      ['Removing focus outlines is good practice', false, 'Keyboard users need them.'],
    ]),
    pairs([['a:hover', 'Under the mouse'], ['tr:nth-child(even)', 'Striped rows'], ['::marker', 'The list bullet'], ['columns: 2', 'Two text columns']], 'Selectors and properties for page parts.'),
    pickCode('Which makes a link look like a filled button?', ['display: inline-block; padding: 10px 16px; background: #C2410C; color: white; text-decoration: none;', 'button: true; color: orange;', 'display: button; fill: orange;', 'padding: button; background: link;'], 'Padding, a background, white text and no underline.'),
    bugTask(['a:hover { color: #C2410C; }', 'a:visited { color: purple; }', 'table { border-collapse: merge; }'], [[2, 'a:visited', 'a:visited (move above a:hover)'], [3, 'merge', 'collapse']], 'Visited written after hover hides the hover colour on visited links (link, visited, hover, active). The value is collapse.'),
    xray(
      { html: '<nav class="nav"><a>Home</a><a class="on">Menu</a></nav><ul class="tags"><li>Tea</li><li>Coffee</li></ul><table><tr><th>Dish</th><th>₹</th></tr><tr><td>Tea</td><td>40</td></tr><tr><td>Toast</td><td>80</td></tr></table>', css: 'body{font-family:system-ui,sans-serif;margin:12px} .nav{display:flex;gap:4px;background:#3B2A1A;padding:4px;border-radius:10px} .nav a{color:white;padding:8px 12px;border-radius:8px} .nav .on{background:#C2410C} .tags{list-style:none;padding:0;display:flex;gap:6px} .tags li{background:#FFF1D6;padding:4px 10px;border-radius:20px} table{border-collapse:collapse;width:100%} td,th{padding:6px;border-bottom:1px solid #E5D3B3;text-align:left} tr:nth-child(even){background:#FFF1D6}' },
      [
        ['.on', 'The highlighted link', 'a.on (current page)', ['a.on (current page)', 'a:visited', 'a:active']],
        ['.tags', 'The list with no bullets', 'list-style: none', ['list-style: none', 'display: none', 'marker: hidden']],
        ['table', 'The single lines between rows', 'border-collapse: collapse', ['border-collapse: collapse', 'border: none', 'overflow: hidden']],
      ],
    ),
    arrange(['a:link {\n  color: #C2410C;\n}', 'a:visited {\n  color: #7C2D12;\n}', 'a:hover {\n  color: #15803D;\n}', 'a:active {\n  color: #4B3FD8;\n}'], 'the four link states in the right order, so every one of them works', BASE, '<p><a href="#">See the menu</a> · <a href="#">Find us</a></p>'),
  ]),
];
