// CSS track · Module 5 · The Box Model. Lesson 5.1 keeps the old box model module id (c-box-1).
import type { Lesson } from '../../types';
import { BASE, CARD } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

// The box drawn like a browser's inspector: margin, border, padding and content in four colours.
const LAYERS = '<div class="m"><div class="b"><div class="p"><div class="c">Lemon Tea ₹40</div></div></div></div>';
const LAYERS_CSS = `${BASE} .m { background: #FDE2C4; padding: 22px; border-radius: 6px; } .b { background: #3B2A1A; padding: 8px; } .p { background: #BFE3C7; padding: 22px; } .c { background: #BFD4FF; padding: 14px; text-align: center; font-weight: bold; }`;
const CARD_CSS = `${BASE} .card { background: #FFF1D6; } .card h2 { margin: 0; font-size: 18px; } .price { margin: 4px 0 0; color: #15803D; font-weight: bold; }`;

export const CSS_M5: Lesson[] = [
  lesson('c-box-1', 'Every element is a box', 5, [
    chat(['Here’s the secret behind every layout: each element is a rectangle.', 'Even round buttons and single words. Each box has four layers, like a framed photo on a wall.']),
    reveal('The four layers, inside out', [
      ['Content', 'The text or picture itself.', '🖼'],
      ['Padding', 'Space inside the frame, around the content. It takes the box’s background colour.', '🟩'],
      ['Border', 'The frame.', '🟫'],
      ['Margin', 'Space outside the frame, pushing other boxes away. Always see-through.', '🟧'],
    ]),
    { ...xray({ html: LAYERS, css: LAYERS_CSS }, [
      ['.c', 'The blue middle', 'content', ['content', 'padding', 'margin']],
      ['.p', 'The green ring', 'padding', ['padding', 'border', 'margin']],
      ['.b', 'The dark frame', 'border', ['border', 'padding', 'content']],
      ['.m', 'The orange outer ring', 'margin', ['margin', 'padding', 'border']],
    ]), kicker: 'BOX X-RAY', title: 'Peel the box', instructions: 'Tap each layer and name it.' },
    live('Space inside', 'Tap a padding.', ['.card { padding: {{v}}; }'], ['0', '8px', '20px', '36px'], { html: CARD, css: `${CARD_CSS} .card { border: 3px solid #C2410C; }`, caption: 'Padding grows the space between the text and the border.' }),
    check('Which layer is always see-through?', ['Margin', 'Padding', 'Border', 'Content'], 'Margin is empty space outside the border.', 'Padding shows the background colour.'),
    recap([
      ['📦', 'Every element is a box'],
      ['🧅', 'Content, padding, border, margin'],
      ['🎨', 'Padding shows the background; margin never does'],
    ]),
  ]),

  lesson('css-5-2', 'Padding and margin', 6, [
    explore('One side or all four', ['.card {', '  padding: 10px;', '  padding: 10px 20px;', '  padding: 5px 10px 15px 20px;', '  margin-top: 24px;', '}'], [
      [2, 'One value: all four sides.'],
      [3, 'Two values: top and bottom, then left and right.'],
      [4, 'Four values go clockwise from the top: top, right, bottom, left.'],
      [5, 'Or set one side by name: margin-top, padding-left and so on.'],
    ], { page: { html: CARD, css: `${CARD_CSS} .card { border: 2px solid #C2410C; padding: 5px 10px 15px 20px; margin-top: 24px; }` }, minTaps: 3 }),
    live('Space between cards', 'Tap a margin.', ['.card { margin: {{v}}; }'], ['0', '8px', '20px 0', '0 0 30px'], { html: `${CARD}${CARD}`, css: `${CARD_CSS} .card { border: 2px solid #C2410C; padding: 8px; }` }),
    toggle('Centre a box with auto', [
      ['No auto', ['.card { width: 200px; }'], 'A fixed-width box sits on the left.', { html: CARD, css: `${CARD_CSS} .card { width: 200px; border: 2px solid #C2410C; padding: 8px; }` }],
      ['margin: 0 auto', ['.card { width: 200px;', '  margin: 0 auto; }'], 'auto splits the leftover space equally on both sides, so the box is centred.', { html: CARD, css: `${CARD_CSS} .card { width: 200px; margin: 0 auto; border: 2px solid #C2410C; padding: 8px; }` }],
    ]),
    beforeAfter(
      'When margins collapse',
      [['.a { margin-bottom: 30px; }', '.b { margin-top: 20px; }'], 'You might expect a 50px gap…', { html: '<div class="a">Lemon Tea</div><div class="b">Coffee</div>', css: `${BASE} .a, .b { background: #FFF1D6; padding: 8px; } .a { margin-bottom: 30px; } .b { margin-top: 20px; }` }],
      [['/* the gap is 30px, not 50px */'], '…but the gap is only 30px. When two vertical margins meet, they collapse: the bigger one wins. Side margins and padding never collapse.', { html: '<div class="a">Lemon Tea</div><div class="b">Coffee</div>', css: `${BASE} .a, .b { background: #FFF1D6; padding: 8px; } .a { margin-bottom: 30px; } .b { margin-top: 20px; } .b { outline: 1px dashed #C2410C; }` }],
      undefined,
      ['Expect', 'Really'],
    ),
    check('What does padding: 10px 20px; set?', ['10px top and bottom, 20px left and right', '10px left, 20px right', '10px on all sides', '20px top, 10px bottom'], 'Two values: vertical first, then horizontal.', 'The first value is for top and bottom.', { mono: false }),
    tapbug('The box won’t centre', ['.card {', '  width: 200px;', '  margin: auto 0;', '}'], [[3, 'auto 0', '0 auto']], 'The first value is top and bottom; the second is left and right. Centring needs auto on the left and right.'),
    recap([
      ['🧭', 'Four values go clockwise: top, right, bottom, left'],
      ['🎯', 'margin: 0 auto centres a box with a width'],
      ['🤝', 'Touching vertical margins collapse to the bigger one'],
    ]),
  ]),

  lesson('css-5-3', 'Width, height and box-sizing', 6, [
    chat(['Rosa set her card to width: 200px, added padding and a border… and the card got wider than 200px.', 'That surprise has a one-line fix that almost every site uses.']),
    toggle('content-box or border-box?', [
      ['content-box', ['.card {', '  width: 200px;', '  padding: 20px;', '  border: 5px solid;', '}'], 'The default: width is only the content. Real width = 200 + 40 + 10 = 250px.', { html: '<div class="ruler">200px</div><div class="card">Card</div>', css: `${BASE} .ruler { width: 200px; background: #4B3FD8; color: #fff; font-size: 12px; text-align: center; margin-bottom: 6px; } .card { width: 200px; padding: 20px; border: 5px solid #C2410C; box-sizing: content-box; }` }],
      ['border-box', ['.card {', '  box-sizing: border-box;', '  width: 200px;', '  padding: 20px;', '  border: 5px solid;', '}'], 'width now includes padding and border. The card is exactly 200px.', { html: '<div class="ruler">200px</div><div class="card">Card</div>', css: `${BASE} .ruler { width: 200px; background: #4B3FD8; color: #fff; font-size: 12px; text-align: center; margin-bottom: 6px; } .card { width: 200px; padding: 20px; border: 5px solid #C2410C; box-sizing: border-box; }` }],
    ]),
    explore('The everyday fix', ['*, *::before, *::after {', '  box-sizing: border-box;', '}'], [
      [1, 'Every element (and its ::before and ::after parts, Module 10).'],
      [2, 'Widths include padding and border. Most stylesheets start with this.'],
    ], { page: { html: '<p>One rule, no more width surprises.</p>', css: BASE }, minTaps: 2 }),
    live('Never too wide', 'max-width sets an upper limit. Tap a value.', ['.card { max-width: {{v}}; }'], ['none', '300px', '60%', '150px'], { html: '<div class="card">A long paragraph about Rosa’s café, her fresh lemon tea and the toast she bakes to order every morning.</div>', css: `${BASE} .card { background: #FFF1D6; padding: 10px; border-radius: 10px; }`, caption: 'min-width and min-height set a lower limit the same way. max-width is great for readable line lengths.' }),
    check('With box-sizing: border-box, width 300px, padding 20px. How wide is the box?', ['300px', '340px', '320px', '260px'], 'border-box counts padding and border inside the width.', 'What does border-box include?'),
    tapbug('The card is wider than the screen', ['.card {', '  width: 100%;', '  padding: 20px;', '  box-sizing: content-box;', '}'], [[4, 'content-box', 'border-box']], 'With content-box, 100% plus 40px of padding is wider than the parent. border-box keeps it inside.'),
    recap([
      ['📐', 'width and height size the content (by default)'],
      ['✅', 'box-sizing: border-box includes padding and border'],
      ['↔️', 'min- and max- set limits'],
    ]),
  ]),

  lesson('css-5-4', 'Borders and corners', 5, [
    live('Border style', 'Tap a style.', ['.card { border: 4px {{v}} #C2410C; }'], ['solid', 'dashed', 'dotted', 'double', 'groove'], { html: CARD, css: `${CARD_CSS} .card { padding: 10px; }` }),
    explore('Longhand and shorthand', ['.card {', '  border-width: 3px;', '  border-style: solid;', '  border-color: teal;', '  border-bottom: 6px solid #C2410C;', '}'], [
      [2, 'Each part can be set alone…', '.card'],
      [3, 'The style is required: without it there is no border at all.', '.card'],
      [5, 'One side can be different. border: 3px solid teal; would set all three parts in one line.', '.card'],
    ], { page: { html: CARD, css: `${CARD_CSS} .card { padding: 10px; border-width: 3px; border-style: solid; border-color: teal; border-bottom: 6px solid #C2410C; }` }, minTaps: 3 }),
    live('Round the corners', 'Tap a radius.', ['.card { border-radius: {{v}}; }'], ['0', '8px', '20px', '50%', '30px 0'], { html: CARD, css: `${CARD_CSS} .card { padding: 14px; border: 3px solid #C2410C; width: 140px; height: 90px; }`, caption: '50% on a square makes a circle. Two values round opposite corners.' }),
    reveal('Border pictures', [
      ['border-image', 'Uses a picture or gradient as the border, sliced into corners and edges.'],
      ['Example', 'border: 8px solid; border-image: linear-gradient(45deg, orange, purple) 1;'],
      ['When', 'Fancy frames. Note: border-radius doesn’t round a border-image.'],
    ], { mono: true }),
    copy('Match the offer badge', 'Make your badge look like the target.', '<span class="badge">10% off</span>', `${BASE}\n.badge {\n  display: inline-block;\n  padding: 6px 14px;\n  border: {{0}};\n  border-radius: {{1}};\n}`, [
      ['border', ['1px solid black', '2px dashed #C2410C', '4px double teal'], '2px dashed #C2410C'],
      ['border-radius', ['0', '6px', '999px'], '999px'],
    ]),
    tapbug('No border shows', ['.card {', '  border-width: 3px;', '  border-color: teal;', '}'], [[2, 'border-width: 3px;', 'border: 3px solid teal;']], 'A border needs a style. Without border-style (solid, dashed…) nothing is drawn.'),
    recap([
      ['🖼', 'border: width style colour'],
      ['⚠️', 'No style, no border'],
      ['⭕', 'border-radius rounds corners; 50% makes a circle'],
    ]),
  ]),

  lesson('css-5-5', 'Outlines and shadows', 5, [
    beforeAfter(
      'Border or outline?',
      [['.card { border: 6px solid teal; }'], 'A border takes up space and pushes the content in.', { html: `${CARD}<p>Next line</p>`, css: `${CARD_CSS} .card { border: 6px solid teal; padding: 8px; }` }],
      [['.card { outline: 6px solid teal;', '  outline-offset: 4px; }'], 'An outline is drawn outside and takes no space, so nothing moves. outline-offset adds a gap.', { html: `${CARD}<p>Next line</p>`, css: `${CARD_CSS} .card { outline: 6px solid teal; outline-offset: 4px; padding: 8px; }` }],
      undefined,
      ['border', 'outline'],
    ),
    reveal('Outlines are for focus', [
      ['Keyboard users', 'People who move with Tab see an outline around the button they are on.', '⌨️'],
      ['Never just remove it', 'outline: none with nothing in its place leaves keyboard users lost.', '🚫'],
      ['Style it instead', 'Make the outline match your brand (Module 10).', '🎨'],
    ]),
    live('Box shadow', 'x, y, blur, spread, colour.', ['.card { box-shadow: {{v}}; }'], ['0 2px 6px rgb(0 0 0 / 0.15)', '0 10px 24px rgb(0 0 0 / 0.25)', '4px 4px 0 #C2410C', 'inset 0 0 0 3px teal', 'none'], { html: CARD, css: `${CARD_CSS} .card { background: white; padding: 12px; border-radius: 12px; margin: 14px; }`, caption: 'inset puts the shadow inside the box.' }),
    copy('Lift the card', 'Make your card float like the target.', CARD, `${CARD_CSS}\n.card {\n  background: white;\n  padding: 12px;\n  border-radius: {{0}};\n  box-shadow: {{1}};\n}`, [
      ['border-radius', ['0', '14px'], '14px'],
      ['box-shadow', ['none', '4px 4px 0 black', '0 8px 20px rgb(0 0 0 / 0.2)'], '0 8px 20px rgb(0 0 0 / 0.2)'],
    ]),
    check('Which never changes the size or position of anything?', ['outline', 'border', 'padding', 'margin'], 'Outlines are drawn on top and take no space.', 'Which one is drawn outside without pushing?'),
    recap([
      ['⭕', 'outline takes no space; good for focus rings'],
      ['🌫', 'box-shadow: x y blur spread colour'],
      ['🔲', 'inset puts the shadow inside'],
    ]),
  ]),

  lesson('css-5-6', 'Overflow', 4, [
    live('Too much content', 'The box is 90px tall. Tap an overflow value.', ['.box { overflow: {{v}}; }'], ['visible', 'hidden', 'scroll', 'auto'], { html: '<div class="box">Today: lemon tea, ginger tea, filter coffee, cold coffee, cheese toast, veg sandwich, banana cake, and a free cookie with every coffee after 6 pm.</div><p>Next section</p>', css: `${BASE} .box { height: 90px; background: #FFF1D6; padding: 8px; border: 2px solid #C2410C; }`, caption: 'visible spills out, hidden cuts it off, scroll always shows scrollbars, auto shows them only when needed.' }),
    reveal('One direction at a time', [
      ['overflow-x', 'Sideways. overflow-x: auto lets a wide table scroll on a phone.'],
      ['overflow-y', 'Up and down.'],
      ['Careful with hidden', 'Hidden content can’t be reached at all. Only hide what is decoration.'],
    ], { mono: true }),
    check('Which shows scrollbars only when the content doesn’t fit?', ['auto', 'scroll', 'visible', 'hidden'], 'auto adds scrollbars only when needed.', 'scroll shows them always.'),
    truth([
      ['overflow: visible is the default', true, 'Content spills out unless you say otherwise.'],
      ['overflow: hidden makes the box taller', false, 'It cuts the content off at the box edge.'],
      ['overflow-x: auto helps wide tables on phones', true, 'They scroll sideways inside their box.'],
    ]),
    tapbug('No scrollbar appears', ['.menu {', '  height: 120px;', '  overflow: scrol;', '}'], [[3, 'scrol', 'auto']], 'scrol isn’t a value, so it is skipped. auto shows a scrollbar when the list is too long.'),
    recap([
      ['🌊', 'visible spills, hidden cuts'],
      ['📜', 'auto scrolls only when needed'],
      ['↔️', 'overflow-x and overflow-y for one direction'],
    ]),
  ]),

  challenge('css-5-ch', 'Module 5 Challenge', { icon: '📦', name: 'Box Master' }, ['Name the four layers of every box', 'Space boxes with padding and margin', 'Size boxes safely and decorate them'], [
    mcq(1, 'Which layer sits between the content and the border?', ['Padding', 'Margin', 'Outline', 'Shadow'], 'Padding is inside the border.'),
    mcq(2, 'What does margin: 10px 0 20px 5px set first?', ['Top', 'Left', 'Bottom', 'Right'], 'Clockwise from the top.'),
    mcq(3, 'Two boxes: margin-bottom 40px above, margin-top 10px below. How big is the gap?', ['40px', '50px', '10px', '30px'], 'Vertical margins collapse to the larger one.'),
    mcq(4, 'Which rule stops padding making boxes wider?', ['box-sizing: border-box', 'overflow: hidden', 'margin: 0', 'width: auto'], 'border-box includes padding and border in the width.', { mono: true }),
    mcq(5, 'Which turns a square image into a circle?', ['border-radius: 50%', 'border: circle', 'outline: round', 'shape: circle'], '50% rounding on all corners makes a circle.', { mono: true }),
    swipe([
      ['Margin shows the background colour', false, 'Margin is always see-through.'],
      ['An outline takes no space', true, 'It is drawn on top.'],
      ['A border needs a style to show', true, 'solid, dashed, dotted…'],
      ['overflow: scroll hides scrollbars', false, 'It always shows them.'],
    ]),
    pairs([['padding', 'Space inside the border'], ['margin', 'Space outside the border'], ['box-shadow', 'A shadow around the box'], ['max-width', 'An upper limit on width']], 'Each property shapes the box a different way.'),
    pickCode('Which centres a 300px-wide box?', ['width: 300px; margin: 0 auto;', 'width: 300px; padding: auto;', 'width: 300px; align: center;', 'width: 300px; margin: auto 0;'], 'auto on the left and right splits the space.'),
    bugTask(['.card {', '  border: 2px teal;', '  padding: 10px 20px 10px;', '  box-sizing: borderbox;', '}'], [[2, '2px teal', '2px solid teal'], [4, 'borderbox', 'border-box']], 'Borders need a style, and the value is border-box with a hyphen. (Three padding values are allowed: top, sides, bottom.)'),
    xray(
      { html: '<div class="card"><h2>Coffee</h2><p class="price">₹60</p></div><div class="lift">Today’s special</div><div class="box">Lemon tea, ginger tea, filter coffee, cold coffee, cheese toast, veg sandwich, banana cake</div>', css: 'body{font-family:system-ui,sans-serif;margin:14px} .card{padding:12px;border:4px dashed #C2410C;border-radius:16px;margin-bottom:16px} .card h2{margin:0} .price{margin:0;color:green} .lift{padding:10px;border-radius:12px;background:white;box-shadow:0 8px 18px rgb(0 0 0 / 0.25);margin-bottom:18px} .box{height:50px;overflow:auto;background:#FFF1D6;padding:6px}' },
      [
        ['.card', 'The dashed frame', 'border', ['border', 'outline', 'margin']],
        ['.lift', 'The card that seems to float', 'box-shadow', ['box-shadow', 'text-shadow', 'padding']],
        ['.box', 'The scrolling list', 'overflow: auto', ['overflow: auto', 'overflow: visible', 'max-width']],
      ],
    ),
    arrange(['*, *::before, *::after {\n  box-sizing: border-box;\n}', '.card {\n  padding: 16px;\n  border: 2px solid #C2410C;\n}', '.card + .card {\n  margin-top: 12px;\n}'], 'the box-sizing fix for everything first, then the card’s padding and border, then the gap between cards', BASE, '<div class="card">Lemon Tea</div><div class="card">Coffee</div>'),
  ]),
];
