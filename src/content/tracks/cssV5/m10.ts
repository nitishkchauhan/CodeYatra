// CSS track · Module 10 · States and Extras. Lesson 10.1 keeps the old pseudo-classes module id (c-pseudo).
import type { Lesson } from '../../types';
import { BASE } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const PRICES = '<table class="t">\n  <tr><td>Lemon Tea</td><td>₹40</td></tr>\n  <tr><td>Ginger Tea</td><td>₹45</td></tr>\n  <tr><td>Coffee</td><td>₹60</td></tr>\n  <tr><td>Cold Coffee</td><td>₹70</td></tr>\n  <tr><td>Cheese Toast</td><td>₹80</td></tr>\n  <tr><td>Cake</td><td>₹50</td></tr>\n</table>';
const PRICES_CSS = `${BASE} .t { border-collapse: collapse; width: 100%; } .t td { padding: 6px 8px; }`;
const STEPS = '<ol class="recipe">\n  <li>Boil water</li>\n  <li>Add lemon and ginger</li>\n  <li>Stir in honey</li>\n</ol>';

export const CSS_M10: Lesson[] = [
  lesson('c-pseudo', 'Pseudo-classes', 5, [
    chat(['A button looks different when you hover it, press it, or tab to it with a keyboard.', 'Those moments are called states, and pseudo-classes let you style each one. They start with a single colon.']),
    reveal('Interactive states', [
      [':hover', 'The mouse is over it.'],
      [':active', 'It is being pressed.'],
      [':focus', 'It has the keyboard: typing or pressing Enter goes here.'],
      [':focus-visible', 'Focus, but only when a keyboard is being used. The modern way to show focus rings.'],
      [':checked / :disabled', 'A ticked checkbox; a field that can’t be used.'],
    ], { mono: true }),
    toggle('One button, four states', [
      ['Normal', ['.btn { background: #C2410C; }'], 'At rest.', { html: '<button class="btn">Order</button>', css: `${BASE} .btn { background: #C2410C; color: white; border: 0; padding: 12px 20px; border-radius: 10px; font-size: 16px; }` }],
      [':hover', ['.btn:hover { background: #9A3412; }'], 'Darker under the mouse.', { html: '<button class="btn">Order</button>', css: `${BASE} .btn { background: #9A3412; color: white; border: 0; padding: 12px 20px; border-radius: 10px; font-size: 16px; }` }],
      [':active', ['.btn:active { transform: scale(0.96); }'], 'Shrinks slightly while pressed, like a real button.', { html: '<button class="btn">Order</button>', css: `${BASE} .btn { background: #9A3412; color: white; border: 0; padding: 12px 20px; border-radius: 10px; font-size: 16px; transform: scale(0.96); }` }],
      [':focus-visible', ['.btn:focus-visible {', '  outline: 3px solid #4B3FD8;', '  outline-offset: 3px; }'], 'A clear ring for keyboard users.', { html: '<button class="btn">Order</button>', css: `${BASE} .btn { background: #C2410C; color: white; border: 0; padding: 12px 20px; border-radius: 10px; font-size: 16px; outline: 3px solid #4B3FD8; outline-offset: 3px; }` }],
    ]),
    explore('States on a live form', ['input:focus { border-color: #4B3FD8; }', 'input:checked + label { color: #15803D; }', 'button:disabled { opacity: 0.4; }'], [
      [1, 'Tap the name box: its border changes while it has focus.', 'input[type="text"]'],
      [2, 'The label after a ticked checkbox turns green. + is the next-sibling selector from Module 2.', 'label'],
      [3, 'A disabled button fades, so people know it can’t be used yet.', 'button'],
    ], { page: { html: '<input type="text" placeholder="Name"><br><input type="checkbox" id="hot" checked><label for="hot">Extra hot</label><br><button disabled>Pay</button>', css: `${BASE} input[type="text"] { padding: 8px; border: 2px solid #E5D3B3; border-radius: 8px; margin-bottom: 8px; } input:focus { border-color: #4B3FD8; outline: none; } input:checked + label { color: #15803D; font-weight: bold; } button { margin-top: 8px; padding: 8px 14px; } button:disabled { opacity: 0.4; }` }, minTaps: 3 }),
    check('Which shows a focus ring only for keyboard users?', [':focus-visible', ':focus', ':hover', ':active'], ':focus-visible skips the ring for mouse and touch clicks.', 'The name has “visible” in it.'),
    tapbug('No hover colour', ['.btn : hover {', '  background: #9A3412;', '}'], [[1, '.btn : hover', '.btn:hover']], 'No spaces around the colon. With a space it means “a hovered element inside .btn”.'),
    recap([
      ['🖱', ':hover, :active for mouse and touch'],
      ['⌨️', ':focus-visible for keyboard rings'],
      ['☑️', ':checked and :disabled for form states'],
    ]),
  ]),

  lesson('css-10-2', 'Picking by position', 5, [
    live('nth-child', 'Tap a pattern. The picked rows turn orange.', ['.t tr:nth-child({{v}}) { background: #FFE08A; }'], ['odd', 'even', '3', '3n', 'n+4', '-n+2'], { html: PRICES, css: PRICES_CSS, caption: '3n = every third row. n+4 = from the 4th onwards. -n+2 = the first two.' }),
    reveal('More position selectors', [
      [':first-child / :last-child', 'The first or last child of its parent.'],
      [':nth-of-type(2)', 'The second element of that type, ignoring other tags.'],
      [':not(.sold-out)', 'Everything except what matches.'],
      [':has(img)', 'A parent that contains something. Here: cards that have a picture.'],
      [':empty', 'An element with nothing inside.'],
    ], { mono: true }),
    toggle(':not and :has', [
      [':not', ['.card:not(.sold-out) { border-color: #15803D; }'], 'Every card except the sold-out one gets a green border.', { html: '<div class="card">Tea</div><div class="card sold-out">Cold Coffee</div><div class="card">Toast</div>', css: `${BASE} .card { border: 3px solid #DDD; padding: 8px; border-radius: 8px; margin: 4px 0; } .card:not(.sold-out) { border-color: #15803D; }` }],
      [':has', ['.card:has(img) { background: #FFF1D6; }'], 'Only the card that contains a picture is coloured. :has looks inside.', { html: '<div class="card">Tea</div><div class="card"><img src="cup.svg" alt="" width="28"> Coffee</div><div class="card">Toast</div>', css: `${BASE} .card { border: 3px solid #DDD; padding: 8px; border-radius: 8px; margin: 4px 0; display: flex; gap: 8px; align-items: center; } .card:has(img) { background: #FFF1D6; }` }],
    ]),
    check('Which picks every row except the first one?', ['tr:not(:first-child)', 'tr:first-child', 'tr:nth-child(1)', 'tr:last-child'], ':not() turns the selection around.', 'Except = not.'),
    tapbug('No line after the last item', ['.menu li {', '  border-bottom: 1px solid #E5D3B3;', '}', '.menu li:last {', '  border-bottom: 0;', '}'], [[4, ':last', ':last-child']], 'The pseudo-class is :last-child.'),
    recap([
      ['🔢', ':nth-child(odd / 3n / n+4)'],
      ['🚫', ':not() excludes'],
      ['🔍', ':has() styles a parent by what is inside'],
    ]),
  ]),

  lesson('css-10-3', 'Pseudo-elements', 5, [
    chat(['Pseudo-elements style a part of an element, or add a small extra part, without changing the HTML.', 'They start with two colons: ::before, ::after, ::first-letter.']),
    explore('Add without HTML', ['.price::before {', '  content: "Only ";', '}', '.new::after {', '  content: " ★";', '  color: gold;', '}'], [
      [2, 'content is required. ::before inserts it at the start of the element.', '.price'],
      [5, '::after inserts at the end. Good for icons and decorations.', '.new'],
      [6, 'Style the inserted part like any text.', '.new'],
    ], { page: { html: '<p class="price">₹40</p><h2 class="new">Cold Coffee</h2>', css: `${BASE} .price::before { content: "Only "; color: #7C5E45; } .new::after { content: " ★"; color: gold; }` }, minTaps: 3 }),
    live('Style a part', 'Tap a pseudo-element.', ['.story{{v}} { color: #C2410C; font-weight: bold; font-size: 1.4em; }'], ['::first-letter', '::first-line', '::selection'], { html: '<p class="story">Rosa started the café with one kettle and four chairs. Students from the college nearby came for the lemon tea and stayed for the toast.</p>', css: BASE, caption: '::selection styles text when someone selects it. Try pressing and holding the text.' }),
    matchUp('Match the part', [['::placeholder', 'Hint text in an input'], ['::marker', 'A list bullet'], ['::first-letter', 'A big opening letter'], ['::after', 'Added at the end']], 'Each pseudo-element is one part of an element.'),
    tapbug('The star doesn’t appear', ['.new::after {', '  color: gold;', '}'], [[2, 'color: gold;', 'content: "★"; color: gold;']], '::before and ::after show nothing without a content property.'),
    recap([
      ['✨', '::before and ::after add content (content is required)'],
      ['🔠', '::first-letter, ::first-line, ::selection style a part'],
      ['➕', 'Two colons for pseudo-elements, one for pseudo-classes'],
    ]),
  ]),

  lesson('css-10-4', 'Counters', 4, [
    beforeAfter(
      'Number the steps yourself',
      [[STEPS], 'An ordered list numbers itself, in the browser’s plain style.', { html: STEPS, css: BASE }],
      [['.recipe { counter-reset: step; list-style: none; }', '.recipe li { counter-increment: step; }', '.recipe li::before {', '  content: "Step " counter(step); }'], 'A CSS counter: start it, count each item, show it with ::before. Now the numbers can look any way you like.', { html: STEPS, css: `${BASE} .recipe { counter-reset: step; list-style: none; padding: 0; } .recipe li { counter-increment: step; margin: 6px 0; } .recipe li::before { content: "Step " counter(step); background: #C2410C; color: white; border-radius: 12px; padding: 2px 8px; margin-right: 8px; font-size: 13px; font-weight: bold; }` }],
    ),
    reveal('Three parts of a counter', [
      ['counter-reset: step', 'Create the counter (at 0) on the parent.'],
      ['counter-increment: step', 'Add 1 on each item.'],
      ['counter(step)', 'Show the number inside content.'],
      ['counters(step, ".")', 'Nested lists: shows 1.1, 1.2, 2.1…'],
    ], { mono: true }),
    check('Where does counter-reset usually go?', ['On the parent', 'On every item', 'On ::after', 'On body only'], 'Start the count once, on the container.', 'Where should the count begin?', { mono: false }),
    truth([
      ['A counter needs ::before or ::after to be seen', true, 'It is shown through content.'],
      ['counter-increment goes on each item', true, 'Each one adds 1.'],
      ['Counters change the HTML', false, 'They only change what is shown.'],
    ]),
    tapbug('The steps show no numbers', ['.recipe { counter-reset: step; }', '.recipe li { counter-increment: step; }', '.recipe li::before { content: counter(steps); }'], [[3, 'steps', 'step']], 'The counter is called step. counter(steps) reads a counter that doesn’t exist.'),
    recap([
      ['0️⃣', 'counter-reset starts it'],
      ['➕', 'counter-increment counts'],
      ['🔢', 'content: counter(name) shows it'],
    ]),
  ]),

  lesson('css-10-5', 'Comfort and access', 6, [
    chat(['Good CSS is not only pretty. It has to work for someone using a keyboard, someone with low vision, and someone who feels sick watching motion.', 'Here are the habits that make that happen.']),
    reveal('Small habits, big difference', [
      ['Contrast', 'Text needs strong contrast with its background. Light grey on white is hard for many people to read.', '🌓'],
      ['Focus rings', 'Never outline: none without a :focus-visible style in its place.', '⌨️'],
      ['Tap targets', 'Buttons at least about 44px tall, with space between them.', '👆'],
      ['Reduced motion', '@media (prefers-reduced-motion: reduce) lets people who get dizzy turn animation down.', '🌀'],
    ]),
    live('Readable or not?', 'Tap a text colour on white.', ['p { color: {{v}}; }'], ['#2B2118', '#7C5E45', '#BBBBBB', '#E5E5E5'], { html: '<p>Open every day, 7 am to 9 pm. Free water for everyone.</p>', css: `${BASE} p { font-size: 18px; }`, caption: 'The two light greys fail: many people can’t read them, especially outdoors in sunlight.' }),
    reveal('Helpful UI properties', [
      ['cursor: pointer', 'Shows the hand cursor over clickable things.'],
      ['resize: vertical', 'Lets people make a text box taller.'],
      ['user-select: none', 'Stops text being selected, for buttons only. Don’t block copying content.'],
      ['scroll-behavior: smooth', 'Glides to links on the same page, unless reduced motion is on.'],
    ], { mono: true }),
    check('Rosa wants outline: none on buttons because the ring looks odd. What should she do?', ['Replace it with a :focus-visible style', 'Just remove it', 'Hide the buttons from keyboards', 'Make the text bigger'], 'Keyboard users need to see where they are. Restyle the ring, don’t remove it.', 'Who relies on the ring?', { mono: false }),
    tapbug('Keyboard users are lost', ['button:focus {', '  outline: none;', '}'], [[2, 'outline: none;', 'outline: 3px solid #4B3FD8;']], 'Removing the focus ring with nothing in its place hides where the keyboard is.'),
    recap([
      ['🌓', 'Strong text contrast'],
      ['⌨️', 'Visible focus, always'],
      ['🌀', 'Respect prefers-reduced-motion'],
    ]),
  ]),

  challenge('css-10-ch', 'Module 10 Challenge', { icon: '✨', name: 'State Shifter' }, ['Style hover, active, focus and form states', 'Pick elements by position and content', 'Add parts with pseudo-elements and counters, accessibly'], [
    mcq(1, 'How many colons does a pseudo-element use?', ['Two', 'One', 'None', 'Three'], '::before, ::after. Pseudo-classes use one.'),
    mcq(2, 'Which picks every third row?', ['tr:nth-child(3n)', 'tr:nth-child(3)', 'tr:third', 'tr:every(3)'], '3n means 3, 6, 9…', { mono: true }),
    mcq(3, 'What must ::after have to show anything?', ['A content property', 'A width', 'A z-index', 'An id'], 'No content, no ::after.'),
    mcq(4, 'Which styles a card that contains an image?', ['.card:has(img)', '.card img', '.card:not(img)', 'img:parent'], ':has() looks inside.', { mono: true }),
    mcq(5, 'Which media feature lets users ask for less animation?', ['prefers-reduced-motion', 'max-motion', 'animation: off', 'motion-safe-mode'], 'It is a user setting your CSS can respect.', { mono: true }),
    swipe([
      [':focus-visible shows rings for keyboard users', true, 'And skips them for clicks.'],
      ['outline: none is fine on its own', false, 'Always provide a visible focus style.'],
      ['counter-reset adds 1 each time', false, 'counter-increment does that.'],
      [':not(.sold-out) skips sold-out cards', true, ':not excludes.'],
    ]),
    pairs([[':disabled', 'A field that can’t be used'], ['::first-letter', 'The opening letter'], [':last-child', 'The final child'], ['counter(step)', 'Shows the number']], 'States, parts and counters.'),
    pickCode('Which adds “New” in front of every .new heading?', ['.new::before { content: "New "; }', '.new::before { text: "New "; }', '.new:before-text { "New " }', '.new { before: "New "; }'], '::before with content.'),
    bugTask(['.btn:hover {', '  background: #9A3412;', '}', '.btn:focus {', '  outline: none;', '}', 'li:nth-child(odd {', '  background: #FFF1D6;', '}'], [[5, 'outline: none;', 'outline: 3px solid #4B3FD8;'], [7, 'li:nth-child(odd {', 'li:nth-child(odd) {']], 'Never remove focus without a replacement, and close the bracket in :nth-child().'),
    xray(
      { html: '<ol class="recipe"><li>Boil water</li><li>Add lemon</li></ol><p class="story">Rosa started the café with one kettle.</p><button class="btn" disabled>Pay</button>', css: 'body{font-family:system-ui,sans-serif;margin:12px} .recipe{counter-reset:s;list-style:none;padding:0} .recipe li{counter-increment:s;margin:4px 0} .recipe li::before{content:"Step " counter(s);background:#C2410C;color:white;border-radius:10px;padding:1px 8px;margin-right:8px;font-size:12px} .story::first-letter{font-size:2em;color:#C2410C;font-weight:bold} .btn{padding:10px 16px} .btn:disabled{opacity:0.4}' },
      [
        ['.recipe', 'The “Step 1” labels', 'counter + ::before', ['counter + ::before', 'list-style: decimal', ':first-child']],
        ['.story', 'The big orange first letter', '::first-letter', ['::first-letter', '::first-line', ':first-child']],
        ['.btn', 'The faded Pay button', ':disabled', [':disabled', ':hover', ':checked']],
      ],
    ),
    arrange(['.btn {\n  background: #C2410C;\n}', '.btn:hover {\n  background: #9A3412;\n}', '.btn:focus-visible {\n  outline: 3px solid #4B3FD8;\n}'], 'the normal button first, then its hover shade, then its keyboard focus ring', `${BASE} .btn { color: white; border: 0; padding: 12px 20px; border-radius: 10px; font-size: 16px; }`, '<button class="btn">Order</button>'),
  ]),
];
