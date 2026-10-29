// CSS track · Module 6 · Display and Position. Lesson 6.2 keeps the old positioning module id (c-pos-1).
import type { Lesson } from '../../types';
import { BASE, CARD } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const ITEMS = '<p>Our menu: <span class="item">Lemon Tea</span> <span class="item">Coffee</span> <span class="item">Toast</span> and more.</p>';
const ITEM_CSS = `${BASE} .item { background: #FFE08A; padding: 6px 10px; margin: 4px; border: 2px solid #C2410C; width: 110px; }`;
const STICKER = '<div class="card"><span class="new">NEW</span><h2>Cold Coffee</h2><p class="price">₹70</p></div>';
const STICKER_CSS = `${BASE} .card { background: #FFF1D6; padding: 14px; border-radius: 12px; margin: 26px 10px; } .card h2 { margin: 0; font-size: 18px; } .price { margin: 4px 0 0; color: #15803D; font-weight: bold; } .new { background: #C2410C; color: white; font-size: 12px; font-weight: bold; padding: 3px 8px; border-radius: 10px; }`;
const LONG = '<header class="top">Riya’s Café · Menu</header><p>Lemon Tea ₹40</p><p>Ginger Tea ₹45</p><p>Coffee ₹60</p><p>Cold Coffee ₹70</p><p>Cheese Toast ₹80</p><p>Veg Sandwich ₹90</p><p>Banana Cake ₹50</p><p>Cookies ₹20</p><p>Hot Chocolate ₹75</p>';
const LONG_CSS = `${BASE} body { margin: 0; } p { margin: 0; padding: 12px 14px; border-bottom: 1px solid #EEE; } .top { background: #C2410C; color: white; padding: 12px 14px; font-weight: bold; }`;

export const CSS_M6: Lesson[] = [
  lesson('css-6-1', 'Display', 6, [
    chat(['Some elements start on a new line and fill the width: headings, paragraphs, divs.', 'Others sit inside a line of text: links, spans, bold words. The display property decides which, and you can change it.']),
    toggle('block, inline, inline-block', [
      ['inline', ['.item { display: inline; }'], 'Sits in the line. Width and top/bottom margin are ignored.', { html: ITEMS, css: `${ITEM_CSS} .item { display: inline; }` }],
      ['block', ['.item { display: block; }'], 'Each one starts a new line. Width works.', { html: ITEMS, css: `${ITEM_CSS} .item { display: block; }` }],
      ['inline-block', ['.item { display: inline-block; }'], 'Best of both: stays in the line, but width, padding and margin all work. Handy for buttons and tags.', { html: ITEMS, css: `${ITEM_CSS} .item { display: inline-block; }` }],
    ]),
    toggle('Hide it: two ways', [
      ['Shown', ['/* all visible */'], 'Three cards.', { html: '<span class="item">Tea</span><span class="item gone">Coffee</span><span class="item">Toast</span>', css: `${ITEM_CSS} .item { display: inline-block; }` }],
      ['display: none', ['.gone { display: none; }'], 'Gone completely: no space is kept, the others close the gap.', { html: '<span class="item">Tea</span><span class="item gone">Coffee</span><span class="item">Toast</span>', css: `${ITEM_CSS} .item { display: inline-block; } .gone { display: none; }` }],
      ['visibility', ['.gone { visibility: hidden; }'], 'Invisible, but its space is kept, leaving a hole.', { html: '<span class="item">Tea</span><span class="item gone">Coffee</span><span class="item">Toast</span>', css: `${ITEM_CSS} .item { display: inline-block; } .gone { visibility: hidden; }` }],
    ]),
    matchUp('Match the behaviour', [['<div>', 'Starts a new line (block)'], ['<span>', 'Sits inside a line (inline)'], ['inline-block', 'In the line, sized like a box'], ['display: none', 'Removed completely']], 'div and p are blocks by default; span and a are inline.'),
    check('Which value keeps elements in a line but lets width and padding work?', ['inline-block', 'inline', 'block', 'none'], 'inline-block flows like text but sizes like a box.', 'It’s a mix of two.'),
    tapbug('The links ignore their width', ['nav a {', '  display: inline;', '  width: 120px;', '}'], [[2, 'inline', 'inline-block']], 'Inline elements ignore width. inline-block keeps them in a row and lets the width work.'),
    recap([
      ['🧱', 'block: new line, full width'],
      ['🔤', 'inline: in the line, no width'],
      ['🫥', 'none removes it; visibility: hidden keeps its space'],
    ]),
  ]),

  lesson('c-pos-1', 'Position: relative and absolute', 6, [
    chat(['Riya wants a small “NEW” sticker pinned to the corner of the Cold Coffee card.', 'Normal flow puts it in line with the text. position lets you lift it out and place it exactly.']),
    toggle('Four positions', [
      ['static', ['.new { position: static; }'], 'The default: normal flow. top/left do nothing.', { html: STICKER, css: STICKER_CSS }],
      ['relative', ['.new { position: relative;', '  top: -8px; left: 20px; }'], 'Nudged from where it would be. Its old space is kept.', { html: STICKER, css: `${STICKER_CSS} .new { position: relative; top: -8px; left: 20px; }` }],
      ['absolute', ['.card { position: relative; }', '.new { position: absolute;', '  top: -10px; right: -10px; }'], 'Lifted out of the flow and placed against the nearest positioned parent: the card.', { html: STICKER, css: `${STICKER_CSS} .card { position: relative; } .new { position: absolute; top: -10px; right: -10px; }` }],
    ]),
    explore('The parent pattern', ['.card {', '  position: relative;', '}', '.new {', '  position: absolute;', '  top: -10px;', '  right: -10px;', '}'], [
      [2, 'relative on the parent, with no offsets, just marks it as the “frame” for anything absolute inside.', '.card'],
      [5, 'absolute takes the sticker out of the flow. The heading moves up into its old place.', '.new'],
      [6, 'top and right measure from the card’s top-right corner. Negative values hang over the edge.', '.new'],
    ], { page: { html: STICKER, css: `${STICKER_CSS} .card { position: relative; } .new { position: absolute; top: -10px; right: -10px; }` }, minTaps: 3 }),
    live('Move the sticker', 'Tap a corner.', ['.new { position: absolute; {{v}} }'], ['top: -10px; right: -10px;', 'top: -10px; left: -10px;', 'bottom: 8px; right: 8px;', 'top: 50%; left: 50%;'], { html: STICKER, css: `${STICKER_CSS} .card { position: relative; }` }),
    check('An absolute element has no positioned parent. What is it placed against?', ['The page itself', 'Its own old spot', 'The nearest paragraph', 'Nothing; it disappears'], 'Without a positioned parent, it uses the page (the initial containing block).', 'Where does the search for a frame end?', { mono: false }),
    tapbug('The sticker flies to the page corner', ['.card {', '  padding: 14px;', '}', '.new {', '  position: absolute;', '  top: 0; right: 0;', '}'], [[2, 'padding: 14px;', 'padding: 14px; position: relative;']], 'The card isn’t positioned, so the sticker measures from the page. Add position: relative to the card.'),
    recap([
      ['📍', 'relative: nudge from its own spot'],
      ['🎯', 'absolute: place inside the nearest positioned parent'],
      ['🖼', 'Parent relative + child absolute is the classic pair'],
    ]),
  ]),

  lesson('css-6-3', 'Fixed and sticky', 5, [
    toggle('Scroll the preview', [
      ['static', ['.top { position: static; }'], 'Scroll inside the page: the header scrolls away.', { html: LONG, css: LONG_CSS }],
      ['sticky', ['.top { position: sticky; top: 0; }'], 'Scroll again: the header scrolls normally, then sticks to the top.', { html: LONG, css: `${LONG_CSS} .top { position: sticky; top: 0; }` }],
      ['fixed', ['.order { position: fixed;', '  bottom: 12px; right: 12px; }'], 'Fixed stays on the screen while everything scrolls under it, like an “Order” button.', { html: `${LONG}<a class="order">Order now</a>`, css: `${LONG_CSS} .order { position: fixed; bottom: 12px; right: 12px; background: #15803D; color: white; padding: 10px 16px; border-radius: 20px; font-weight: bold; }` }],
    ], 'Switch, then scroll the page inside the preview.'),
    reveal('Offsets: top, right, bottom, left', [
      ['top: 0', 'With sticky: where to stick. Without top, sticky does nothing.'],
      ['bottom: 12px; right: 12px', 'With fixed: 12px from the screen’s bottom-right corner.'],
      ['inset: 0', 'Shorthand for all four at once: covers the whole frame.'],
    ], { mono: true }),
    check('Which stays in place while the page scrolls under it, from the start?', ['position: fixed', 'position: sticky', 'position: relative', 'position: static'], 'fixed never moves with the page.', 'sticky only sticks after it reaches its offset.'),
    tapbug('The header won’t stick', ['.top {', '  position: sticky;', '  background: #C2410C;', '}'], [[2, 'position: sticky;', 'position: sticky; top: 0;']], 'sticky needs an offset like top: 0 to know where to stick.'),
    matchUp('Five positions', [['static', 'Normal flow'], ['relative', 'Nudged from its own spot'], ['absolute', 'Placed inside a positioned parent'], ['fixed', 'Pinned to the screen'], ['sticky', 'Scrolls, then sticks']], 'Each position value places an element in a different way.'),
    recap([
      ['📌', 'sticky: scrolls, then sticks at its offset'],
      ['🪟', 'fixed: always in the same spot on screen'],
      ['📏', 'top, right, bottom, left, or inset for all four'],
    ]),
  ]),

  lesson('css-6-4', 'Layers with z-index', 4, [
    live('Who is on top?', 'Tap a z-index for the orange card.', ['.orange { z-index: {{v}}; }'], ['1', '3', '0', '-1'], { html: '<div class="stack"><div class="c orange">Orange</div><div class="c teal">Teal (z-index 2)</div></div>', css: `${BASE} .stack { position: relative; height: 150px; } .c { position: absolute; width: 150px; height: 90px; padding: 8px; border-radius: 10px; color: white; font-weight: bold; } .orange { background: #C2410C; top: 0; left: 0; } .teal { background: #0F766E; top: 40px; left: 60px; z-index: 2; }`, caption: 'Higher numbers sit on top. -1 can even slide behind its parent’s background.' }),
    reveal('Rules of the stack', [
      ['Positioned only', 'z-index works on positioned elements (relative, absolute, fixed, sticky) and flex or grid children.'],
      ['Later on top', 'With no z-index, the element written later in the HTML is drawn on top.'],
      ['Stacks inside stacks', 'A child can never rise above its parent’s whole stack, however big its number.'],
    ]),
    check('Two absolute boxes overlap, neither has a z-index. Which is on top?', ['The one later in the HTML', 'The first one', 'The bigger one', 'Neither shows'], 'Later in the source paints on top.', 'Think about drawing order.', { mono: false }),
    tapbug('z-index does nothing', ['.badge {', '  z-index: 10;', '}'], [[2, 'z-index: 10;', 'position: relative; z-index: 10;']], 'A normal (static) element ignores z-index. Give it a position first.'),
    truth([
      ['z-index works on a static element', false, 'It needs a position (or a flex or grid parent).'],
      ['z-index: 5 is drawn above z-index: 2', true, 'Higher is on top.'],
      ['z-index can be negative', true, '-1 can slide behind the parent’s background.'],
    ]),
    recap([
      ['🥞', 'z-index: higher is on top'],
      ['📍', 'Needs a position (or a flex/grid child)'],
      ['⬇️', 'No z-index: later in the HTML is on top'],
    ]),
  ]),

  lesson('css-6-5', 'Float and clear', 4, [
    beforeAfter(
      'Text around a picture',
      [['<img src="dish.svg">', '<p>…</p>'], 'The picture sits on its own line, the text below.', { html: '<img src="dish.svg" alt="Cheese toast" width="120"><p>Our cheese toast is baked to order with two cheeses on thick bread, then cut into four. Best with a hot lemon tea on a rainy day.</p>', css: `${BASE} img { border-radius: 10px; }` }],
      [['img {', '  float: left;', '  margin-right: 12px;', '}'], 'float: left pushes the picture to the side and lets the text wrap around it, like a magazine.', { html: '<img src="dish.svg" alt="Cheese toast" width="120"><p>Our cheese toast is baked to order with two cheeses on thick bread, then cut into four. Best with a hot lemon tea on a rainy day.</p>', css: `${BASE} img { border-radius: 10px; float: left; margin-right: 12px; }` }],
    ),
    toggle('clear', [
      ['No clear', ['.note { }'], 'The note squeezes up next to the floated picture.', { html: '<img src="dish.svg" alt="Cheese toast" width="110"><p>Cheese toast, baked to order.</p><p class="note">Open 7 am to 9 pm</p>', css: `${BASE} img { float: left; margin-right: 12px; border-radius: 10px; } .note { background: #FFE08A; padding: 6px; }` }],
      ['clear: both', ['.note { clear: both; }'], 'clear makes it start below any floats.', { html: '<img src="dish.svg" alt="Cheese toast" width="110"><p>Cheese toast, baked to order.</p><p class="note">Open 7 am to 9 pm</p>', css: `${BASE} img { float: left; margin-right: 12px; border-radius: 10px; } .note { background: #FFE08A; padding: 6px; clear: both; }` }],
    ]),
    reveal('Float today', [
      ['Use it for', 'Wrapping text around a picture or a quote.', '✅'],
      ['Don’t use it for', 'Page layouts and columns. Older sites did; flexbox and grid (Modules 7 and 8) do it far better.', '🚫'],
      ['Clearfix', 'An old trick to stop a parent collapsing around floats. Today: display: flow-root on the parent.', '🧰'],
    ]),
    check('Which makes an element start below any floated elements?', ['clear: both', 'float: none', 'display: block', 'position: below'], 'clear pushes it past floats.', 'The word is in the lesson title.'),
    tapbug('The picture won’t move to the middle', ['img {', '  float: centre;', '}'], [[2, 'centre', 'left']], 'float only takes left, right or none. To centre a picture, use display: block and margin: 0 auto.'),
    recap([
      ['🌊', 'float lets text wrap around a picture'],
      ['🧹', 'clear starts below the floats'],
      ['🧭', 'Layouts: use flex and grid instead'],
    ]),
  ]),

  lesson('css-6-6', 'Centring anything', 6, [
    chat(['“How do I centre this?” is the most asked CSS question there is.', 'The answer depends on what you’re centring. Here are the four you’ll need.']),
    toggle('Pick what to centre', [
      ['Text', ['h2 { text-align: center; }'], 'Text and inline things inside a block.', { html: '<h2>Riya’s Café</h2>', css: `${BASE} h2 { text-align: center; background: #FFF1D6; }` }],
      ['A block', ['.card { width: 200px;', '  margin: 0 auto; }'], 'A box with a width: auto margins left and right.', { html: CARD, css: `${BASE} .card { width: 200px; margin: 0 auto; background: #FFF1D6; padding: 8px; }` }],
      ['Both ways', ['.box { display: grid;', '  place-items: center; }'], 'Grid’s place-items centres across and down in one line.', { html: '<div class="box"><span class="dot">☕</span></div>', css: `${BASE} .box { display: grid; place-items: center; height: 130px; background: #FFF1D6; border-radius: 12px; } .dot { font-size: 34px; }` }],
      ['With flex', ['.box { display: flex;', '  justify-content: center;', '  align-items: center; }'], 'Flexbox does the same in two lines (Module 7).', { html: '<div class="box"><span class="dot">☕</span></div>', css: `${BASE} .box { display: flex; justify-content: center; align-items: center; height: 130px; background: #FFF1D6; border-radius: 12px; } .dot { font-size: 34px; }` }],
    ]),
    reveal('Inside a line: vertical-align', [
      ['vertical-align: middle', 'Lines an icon up with the middle of the text next to it.'],
      ['Only inline and table cells', 'It doesn’t move block boxes up or down.'],
    ], { mono: true }),
    copy('Centre the cup', 'Put the cup in the exact middle, both ways.', '<div class="box"><span class="cup">☕</span></div>', `${BASE}\n.box { height: 140px; background: #FFF1D6; border-radius: 12px; }\n.cup { font-size: 34px; }\n.box {\n  display: {{0}};\n  place-items: {{1}};\n}`, [
      ['display', ['block', 'inline', 'grid'], 'grid'],
      ['place-items', ['start', 'end', 'center'], 'center'],
    ]),
    check('Which centres a 300px-wide block in its parent?', ['margin: 0 auto;', 'text-align: center;', 'vertical-align: middle;', 'float: center;'], 'Auto margins split the leftover space.', 'text-align only moves inline content.'),
    tapbug('The card won’t centre', ['.card {', '  text-align: center;', '}'], [[2, 'text-align: center;', 'width: 200px; margin: 0 auto;']], 'text-align centres the text inside the card, not the card itself. A block needs a width and auto margins.'),
    recap([
      ['🔤', 'Text: text-align: center'],
      ['📦', 'A block: width + margin: 0 auto'],
      ['🎯', 'Both ways: grid + place-items: center'],
    ]),
  ]),

  challenge('css-6-ch', 'Module 6 Challenge', { icon: '🧭', name: 'Placer' }, ['Switch elements between block, inline and inline-block', 'Place elements with relative, absolute, fixed and sticky', 'Layer, float and centre with confidence'], [
    mcq(1, 'Which hides an element but keeps its space?', ['visibility: hidden', 'display: none', 'opacity: 1', 'position: absolute'], 'visibility hides but keeps the space.', { mono: true }),
    mcq(2, 'An absolute element is placed against…', ['Its nearest positioned ancestor', 'Its next sibling', 'The first paragraph', 'Its own margin'], 'Usually the parent you gave position: relative.'),
    mcq(3, 'What does sticky need to work?', ['An offset like top: 0', 'A z-index', 'A width', 'display: block'], 'Without an offset there is nowhere to stick.'),
    mcq(4, 'Which is the modern way to put text around a picture?', ['float', 'z-index', 'sticky', 'display: none'], 'float still does this job well.'),
    mcq(5, 'Which centres a child across and down in one line?', ['place-items: center (on a grid)', 'text-align: middle', 'vertical-align: center', 'align: center'], 'Grid’s place-items does both.'),
    swipe([
      ['span is inline by default', true, 'It flows inside text.'],
      ['Inline elements respect width', false, 'They ignore width and height.'],
      ['fixed elements scroll with the page', false, 'They stay put on the screen.'],
      ['A higher z-index sits on top', true, 'When both are positioned.'],
    ]),
    pairs([['display: none', 'Gone, no space kept'], ['position: relative', 'Nudge from its own spot'], ['position: fixed', 'Pinned to the screen'], ['clear: both', 'Start below floats']], 'Display, position and float each place things differently.'),
    pickCode('Which pins a “Call us” button to the bottom-right of the screen?', ['position: fixed; bottom: 16px; right: 16px;', 'position: sticky; right: 16px;', 'float: right; bottom: 16px;', 'position: absolute; z-index: right;'], 'fixed with bottom and right offsets.'),
    bugTask(['.card {', '  position: relativ;', '}', '.tag {', '  position: absolute;', '  top: 0;', '  z-index: high;', '}'], [[2, 'relativ', 'relative'], [7, 'high', '5']], 'A misspelt value is skipped, and z-index takes a whole number.'),
    xray(
      { html: '<header class="top">Riya’s Café</header><div class="card"><span class="new">NEW</span><h2>Cold Coffee</h2></div><p><span class="tag">Tea</span><span class="tag">Coffee</span></p>', css: 'body{font-family:system-ui,sans-serif;margin:0} .top{position:sticky;top:0;background:#C2410C;color:white;padding:10px} .card{position:relative;margin:24px 14px;padding:14px;background:#FFF1D6;border-radius:12px} .card h2{margin:0} .new{position:absolute;top:-10px;right:-10px;background:#0F766E;color:white;padding:3px 8px;border-radius:10px;font-size:12px} p{margin:14px} .tag{display:inline-block;width:80px;padding:6px;margin-right:6px;background:#FFE08A;text-align:center}' },
      [
        ['.top', 'The header that stays at the top', 'position: sticky', ['position: sticky', 'position: static', 'float: top']],
        ['.new', 'The sticker on the corner', 'position: absolute', ['position: absolute', 'position: static', 'display: none']],
        ['.tag', 'The same-width tags in a line', 'display: inline-block', ['display: inline-block', 'display: inline', 'display: none']],
      ],
    ),
    arrange(['.card {\n  position: relative;\n}', '.new {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n}', '.card h2 {\n  text-align: center;\n}'], 'the card as the frame first, then the sticker pinned to its corner, then the centred heading', STICKER_CSS, STICKER),
  ]),
];
