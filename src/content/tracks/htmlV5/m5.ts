// HTML track · Module 5 · Organising Content.
import { group } from '../../dsl';
import type { Lesson } from '../../types';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const BORDER = 'table,th,td{border:1px solid #444} table{border-collapse:collapse} th,td{padding:6px 10px}';

export const HTML_M5: Lesson[] = [
  lesson('h-list-1', 'Lists', 4, [
    reveal('Three kinds of list', [
      ['• Unordered list <ul>', 'Order doesn’t matter, like a shopping list.'],
      ['1️⃣ Ordered list <ol>', 'Order matters, like recipe steps.'],
      ['📖 Description list <dl>', 'Terms with their meanings, like a glossary.'],
    ]),
    explore('A list, item by item', ['<ul>', '  <li>Milk</li>', '  <li>Bread</li>', '</ul>'], [
      [1, '<ul> starts a bulleted list.', 'ul'],
      [2, 'Every item goes in its own <li> (list item).', 'li'],
      [3, 'Change ul to ol and the bullets become numbers.', 'li:last-child'],
    ]),
    toggle('Ordered list options', [
      ['type="1"', ['<ol type="1">', '  <li>Wash</li><li>Boil</li><li>Pour</li>', '</ol>'], '1, 2, 3: the default.'],
      ['type="A"', ['<ol type="A">', '  <li>Wash</li><li>Boil</li><li>Pour</li>', '</ol>'], 'A, B, C. Also a, I and i for small letters and Roman numbers.'],
      ['start="5"', ['<ol start="5">', '  <li>Wash</li><li>Boil</li><li>Pour</li>', '</ol>'], 'Counting starts at 5, handy when a list continues after a break.'],
      ['reversed', ['<ol reversed>', '  <li>Wash</li><li>Boil</li><li>Pour</li>', '</ol>'], 'Counts down instead of up.'],
    ]),
    live('Bullet styles', 'Tap a bullet style. none is common for menus.', ['<ul style="list-style-type:{{v}};">', '  <li>Home</li>', '  <li>Shop</li>', '  <li>Contact</li>', '</ul>'], ['disc', 'circle', 'square', 'none'], { caption: 'Bullet styles come from CSS.' }),
    place('A list inside a list', 'Put Tea and Coffee under Drinks.', [['<ul>'], ['  <li>Drinks'], ['    ', { gap: 0 }], ['  </li>'], ['  <li>Snacks</li>'], ['</ul>']], ['<ul><li>Tea</li><li>Coffee</li></ul>', '<li>Tea</li><li>Coffee</li>', '<p>Tea, Coffee</p>'], ['<ul><li>Tea</li><li>Coffee</li></ul>'], 'A whole new list goes inside the <li>, and it shows indented with its own bullets.'),
    explore('A description list', ['<dl>', '  <dt>HTML</dt>', '  <dd>Structure of a web page</dd>', '</dl>'], [
      [2, '<dt> is the term.', 'dt'],
      [3, '<dd> is its description, shown indented below.', 'dd'],
    ], { minTaps: 2 }),
    tapbug('Something isn’t a list item', ['<ul>', '  <li>Pens</li>', '  <p>Pencils</p>', '</ul>'], [[3, '<p>Pencils</p>', '<li>Pencils</li>']], 'Only <li> can sit directly inside <ul> or <ol>.'),
    recap([
      ['•', 'ul for bullets'],
      ['1️⃣', 'ol for numbers (type, start, reversed)'],
      ['📌', 'li for every item; lists can nest'],
      ['📖', 'dl, dt and dd for terms'],
    ]),
  ]),

  lesson('h-table-1', 'Tables', 5, [
    chat(['Tables arrange data in rows and columns,', 'like a timetable or a mark sheet.']),
    reveal('Table building blocks', [
      ['<table>', 'The whole table.'],
      ['<tr>', 'A table row.'],
      ['<th>', 'A header cell: bold and centred by default.'],
      ['<td>', 'A data cell.'],
      ['<caption>', 'The table’s title.'],
    ], { mono: true }),
    explore('A mark sheet', ['<table>', '  <tr><th>Name</th><th>Marks</th></tr>', '  <tr><td>Aman</td><td>92</td></tr>', '  <tr><td>Riya</td><td>88</td></tr>', '</table>'], [
      [2, 'The first row holds header cells: Name and Marks.', 'tr:first-child'],
      [3, 'Aman’s row: two data cells.', 'tr:nth-child(2)'],
      [4, 'Riya’s row.', 'tr:nth-child(3)'],
    ], { page: { html: '<table><tr><th>Name</th><th>Marks</th></tr><tr><td>Aman</td><td>92</td></tr><tr><td>Riya</td><td>88</td></tr></table>', css: BORDER } }),
    toggle('Borders come from CSS', [
      ['No borders', ['<table>…</table>'], 'Tables have no borders by default.', { html: '<table><tr><th>Name</th><th>Marks</th></tr><tr><td>Aman</td><td>92</td></tr></table>' }],
      ['Add borders', ['table, th, td { border: 1px solid black; }'], 'Every cell gets its own border, so the lines look doubled.', { html: '<table><tr><th>Name</th><th>Marks</th></tr><tr><td>Aman</td><td>92</td></tr></table>', css: 'table,th,td{border:1px solid black}' }],
      ['Collapse', ['table { border-collapse: collapse; }'], 'border-collapse merges the double lines into single ones.', { html: '<table><tr><th>Name</th><th>Marks</th></tr><tr><td>Aman</td><td>92</td></tr></table>', css: 'table,th,td{border:1px solid black} table{border-collapse:collapse}' }],
    ]),
    place('Stretch a cell', 'Make Lunch cover both columns.', [['<table>'], ['  <tr><th>Mon</th><th>Tue</th></tr>'], ['  <tr><td ', { gap: 0 }, '>Lunch</td></tr>'], ['</table>']], ['colspan="2"', 'rowspan="2"', 'span="2"'], ['colspan="2"'], 'colspan stretches a cell across columns; rowspan stretches it down rows.', { css: BORDER }),
    reveal('Table sections', [
      ['<thead>', 'Header rows.'],
      ['<tbody>', 'The main data rows.'],
      ['<tfoot>', 'Footer rows, like totals.'],
    ], { mono: true, intro: 'Sections help screen readers and make styling easier.' }),
    tapbug('A row that never ends', ['<table>', '  <tr><td>Pen</td><td>10</td>', '  <tr><td>Book</td><td>50</td></tr>', '</table>'], [[2, '<td>10</td>', '<td>10</td></tr>']], 'The first row is missing its </tr>.'),
    recap([
      ['📊', 'table holds tr rows, which hold th and td cells'],
      ['🏷', 'caption titles the table'],
      ['↔️', 'colspan and rowspan merge cells'],
      ['🔲', 'Borders come from CSS'],
    ]),
  ]),

  lesson('html-5-3', 'Block and inline elements', 3, [
    beforeAfter('Lines or beads?', [['<p>One</p>', '<p>Two</p>', '<p>Three</p>'], 'Block elements: each <p> starts on a new line and takes the full width.', { html: '<p>One</p><p>Two</p><p>Three</p>', css: 'p{background:#E4E1F5;margin:4px 0}' }], [['<span>One</span>', '<span>Two</span>', '<span>Three</span>'], 'Inline elements: the spans sit side by side, as wide as their text.', { html: '<span>One</span> <span>Two</span> <span>Three</span>', css: 'span{background:#FFE3B8}' }], undefined, ['<p> (block)', '<span> (inline)']),
    reveal('Block and inline', [
      ['🧱 Block', 'Always starts on a new line and takes the full width available.'],
      ['📿 Inline', 'Stays in the line of text and takes only the width it needs.'],
    ]),
    group({ kicker: 'SORT', title: 'Block or inline?', instructions: 'Tap the group for each element.', groups: ['Block', 'Inline'], items: [{ text: '<p>', group: 0 }, { text: '<h1>', group: 0 }, { text: '<div>', group: 0 }, { text: '<ul>', group: 0 }, { text: '<span>', group: 1 }, { text: '<a>', group: 1 }, { text: '<strong>', group: 1 }, { text: '<img>', group: 1 }], mono: true, explain: 'Paragraphs, headings, divs and lists are blocks; span, a, strong and img stay in the line.' }),
    toggle('Show the boxes', [
      ['Normal', ['<h2>Menu</h2>', '<p>Tea <a href="#">order</a> now</p>'], 'The page as visitors see it.', { html: '<h2>Menu</h2><p>Tea <a href="#">order</a> now</p>' }],
      ['Show boxes', ['<h2>Menu</h2>', '<p>Tea <a href="#">order</a> now</p>'], 'Block boxes stretch edge to edge; the inline link hugs its text.', { html: '<h2>Menu</h2><p>Tea <a href="#">order</a> now</p>', css: '*{outline:2px dashed #FF9F1C}' }],
    ]),
    check('Which element starts on a new line?', ['<p>', '<span>', '<a>'], '<p> is a block element.', 'Think block, not inline.'),
    recap([
      ['🧱', 'Block: a new line, full width'],
      ['📿', 'Inline: same line, only the width it needs'],
      ['🔍', 'Outlines show the difference'],
    ]),
  ]),

  lesson('html-5-4', 'Div and span', 4, [
    chat(['<div> and <span> are empty containers.', 'They change nothing until you style them.']),
    explore('A div groups things', ['<div style="background-color:lightblue; padding:10px;">', '  <h2>Pune</h2>', '  <p>A city in Maharashtra, known for its colleges.</p>', '</div>'], [
      [1, '<div> is a block container: it groups elements so you can style or move them together.', 'div'],
      [2, 'Everything inside the div gets its blue background.', 'h2'],
    ], { minTaps: 2 }),
    place('Make two city cards', 'Put each city’s heading and paragraph into its own card.', [['<div class="card">', { gap: 0 }, '</div>'], ['<div class="card">', { gap: 1 }, '</div>']], ['<h2>Delhi</h2><p>The capital.</p>', '<h2>Mumbai</h2><p>Home to the film industry.</p>'], ['<h2>Delhi</h2><p>The capital.</p>', '<h2>Mumbai</h2><p>Home to the film industry.</p>'], 'Each div becomes a card holding one city.', { css: '.card{background:#F3F1FF;border-radius:12px;padding:10px;margin:6px 0}' }),
    explore('A span colours part of a line', ['<p>The sky is <span style="color:blue;">blue</span> today.</p>'], [[1, '<span> is an inline container for styling part of a line.', 'span']], { minTaps: 1 }),
    toggle('Side by side', [
      ['Stacked', ['<div><div class="card">Delhi</div><div class="card">Mumbai</div></div>'], 'Divs stack, one under the other.', { html: '<div><div class="card">Delhi</div><div class="card">Mumbai</div></div>', css: '.card{background:#F3F1FF;border-radius:12px;padding:16px;margin:6px}' }],
      ['Side by side', ['<div style="display:flex;">', '  <div class="card">Delhi</div><div class="card">Mumbai</div>', '</div>'], 'display:flex on the outer div lines them up. Divs are the building blocks of layouts; the CSS track goes further.', { html: '<div style="display:flex"><div class="card">Delhi</div><div class="card">Mumbai</div></div>', css: '.card{background:#F3F1FF;border-radius:12px;padding:16px;margin:6px;flex:1}' }],
    ]),
    check('You want to colour one word inside a paragraph. Use:', ['<span>', '<div>', '<table>'], 'A span stays in the line, around just that word.', 'You need an inline container.'),
    recap([
      ['📦', '<div> is a block container'],
      ['📎', '<span> is an inline container'],
      ['🎨', 'Both are for grouping and styling'],
    ]),
  ]),

  lesson('html-5-5', 'Class and id', 4, [
    reveal('Two kinds of name', [
      ['👥 class', 'A group name. Many elements can share it, and one element can have several.'],
      ['🪪 id', 'A unique name. Only one element on the page can have it.'],
    ]),
    explore('A class styles a group', ['<h2 class="city">Delhi</h2>', '<h2 class="city">Mumbai</h2>'], [
      [1, 'In CSS a class is picked with a dot: .city { … }', 'h2:first-of-type'],
      [2, 'Every element with class="city" gets the same look.', 'h2:last-of-type'],
    ], { page: { html: '<h2 class="city">Delhi</h2><h2 class="city">Mumbai</h2>', css: '.city{background:tomato;color:white;padding:6px}' }, minTaps: 2 }),
    place('Two classes at once', 'Give Delhi both classes, so only Delhi is centred.', [['<h2 class="', { gap: 0 }, '">Delhi</h2>'], ['<h2 class="city">Mumbai</h2>']], ['city main', 'city, main', 'city.main'], ['city main'], 'Separate several classes with a space.', { css: '.city{background:tomato;color:white;padding:6px}.main{text-align:center}' }),
    explore('An id names one element', ['<h1 id="banner">Big Sale</h1>'], [[1, 'In CSS an id is picked with a hash: #banner { … }', '#banner']], { page: { html: '<h1 id="banner">Big Sale</h1>', css: '#banner{background:black;color:gold;padding:8px}' }, minTaps: 1 }),
    reveal('What ids are for', [
      ['🎨 Styling', 'Style one specific element.'],
      ['🔗 Jump links', 'href="#banner" jumps to it.'],
      ['⚡ JavaScript', 'getElementById("banner") finds it.'],
    ]),
    reveal('Naming rules', [
      ['🔡 Capitals matter', 'City and city are different names.'],
      ['🚫 No spaces', 'An id can’t contain spaces.'],
      ['1️⃣ No number first', 'Don’t start a name with a number.'],
    ]),
    tapbug('Two notes, one id', ['<p id="note">First note</p>', '<p id="note">Second note</p>'], [[2, 'id="note"', 'class="note"']], 'An id must be unique. Use a class for a look that repeats.'),
    recap([
      ['👥', 'class: shared, picked with .'],
      ['🪪', 'id: unique, picked with #'],
      ['⚡', 'JavaScript and jump links use ids'],
    ]),
  ]),

  challenge('html-5-ch', 'Module 5 Challenge', { icon: '🗂', name: 'Organiser' }, ['Organise content with lists and tables', 'Tell block and inline elements apart', 'Group and name elements with div, span, class and id'], [
    mcq(1, 'Which tag makes a numbered list?', ['<ol>', '<ul>', '<li>', '<dl>'], 'ol = ordered list.', { mono: true }),
    mcq(2, 'Which tag makes a header cell in a table?', ['<th>', '<td>', '<tr>', '<thead>'], 'th = table header cell; thead groups header rows.', { mono: true }),
    mcq(3, 'Which attribute makes a cell span two columns?', ['colspan="2"', 'rowspan="2"', 'span="2"', 'cols="2"'], 'colspan merges across columns.', { mono: true }),
    mcq(4, 'Which is an inline element?', ['<span>', '<div>', '<p>', '<h2>'], 'Inline elements stay in the line of text.', { mono: true }),
    mcq(5, 'How do you select class="card" in CSS?', ['.card', '#card', 'card', '*card'], 'Dot for class, hash for id.', { mono: true }),
    swipe([
      ['Two elements can share the same id', false, 'An id must be unique.'],
      ['One element can have more than one class', true, 'Separate them with spaces.'],
      ['Tables have borders by default', false, 'Borders come from CSS.'],
      ['A <div> is a block element', true, 'It starts on a new line.'],
    ]),
    pairs([['<li>', 'One list item'], ['<tr>', 'One table row'], ['<dt>', 'A term in a description list'], ['<span>', 'Inline container']], 'Each tag has one job.'),
    pickCode('Which ordered list starts counting at 10?', ['<ol start="10">', '<ol begin="10">', '<ul start="10">'], 'start sets the first number of an ol.'),
    bugTask(['<table>', '  <tr><th>Item</th><th>Price</th></tr>', '  <tr><td>Tea</td><th>20</td></tr>', '</table>'], [[3, '<th>20</td>', '<td>20</td>']], 'A data cell opens and closes with td.'),
    xray(
      { html: '<ul class="menu"><li>Home</li><li>Shop</li></ul><ol><li>Pick</li><li>Pay</li></ol><table><tr><th>Item</th><th>Price</th></tr><tr><td>Tea</td><td>20</td></tr></table><div class="card"><h3>Offer</h3><p>Two for one.</p></div>', css: `${BORDER} .card{background:#F3F1FF;border-radius:12px;padding:8px;margin-top:8px}` },
      [
        ['ul', 'The bulleted menu', '<ul>', ['<ul>', '<ol>', '<dl>']],
        ['ol', 'The numbered steps', '<ol>', ['<ol>', '<ul>', '<li>']],
        ['th', 'A header cell', '<th>', ['<th>', '<td>', '<tr>']],
        ['.card', 'The coloured card', '<div>', ['<div>', '<span>', '<table>']],
      ],
    ),
    arrange(['<table>', '<caption>Class Test</caption>', '<tr><th>Name</th><th>Marks</th></tr>', '<tr><td>Aman</td><td>92</td></tr>', '<tr><td>Riya</td><td>88</td></tr>', '</table>'], 'the caption on top, the header row, then the two students', BORDER),
  ]),
];
