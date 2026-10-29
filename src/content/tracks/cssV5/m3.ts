// CSS track · Module 3 · Colours, Backgrounds and Units. Lesson 3.1 keeps the old units module id (c-units).
import type { Lesson } from '../../types';
import { BASE, CARD } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, place, recap, resize, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const SWATCH = '<div class="swatch">Rosa’s Café</div>';
const SW_CSS = `${BASE} .swatch { height: 90px; border-radius: 14px; display: grid; place-items: center; color: white; font: bold 20px system-ui, sans-serif; }`;
const STRIPES = 'background: repeating-linear-gradient(45deg, #4B3FD8 0 12px, #fff 12px 24px);';
const BANNER = '<div class="banner"><h2>Rosa’s Café</h2></div>';
const BANNER_CSS = `${BASE} .banner { height: 160px; border-radius: 14px; border: 2px solid #E5D3B3; display: grid; place-items: center; } .banner h2 { margin: 0; color: #7C2D12; background: rgba(255,255,255,.75); padding: 4px 10px; border-radius: 8px; }`;

export const CSS_M3: Lesson[] = [
  lesson('c-units', 'Colours in CSS', 5, [
    chat(['Rosa’s brand colour is a warm orange, like the evening sun on her shop sign.', 'Let’s learn every way CSS can write that colour, and when to use each.']),
    reveal('Five ways to write one colour', [
      ['orangered', 'A name. About 140 are built in. Easy to read, but only a few choices.'],
      ['#FF4500', 'Hex: red, green and blue as pairs from 00 to FF.'],
      ['#F40', 'Short hex: each digit is doubled, so #F40 is #FF4400.'],
      ['rgb(255 69 0)', 'RGB: the same three amounts, from 0 to 255.'],
      ['hsl(16 100% 50%)', 'HSL: hue (0–360 on a colour wheel), saturation, lightness. Easiest to tweak by hand.'],
    ], { mono: true }),
    live('Tweak with HSL', 'Same hue, different lightness. Tap each.', ['.swatch { background: {{v}}; }'], ['hsl(16 100% 50%)', 'hsl(16 100% 30%)', 'hsl(16 100% 75%)', 'hsl(16 30% 50%)'], { html: SWATCH, css: SW_CSS, caption: 'With HSL you can make a darker or softer shade of your brand colour by changing one number.' }),
    toggle('See-through colours', [
      ['Solid', ['background: rgb(255 69 0);'], 'Solid: you can’t see the stripes behind.', { html: '<div class="bg"><div class="swatch" style="background: rgb(255 69 0)">Solid</div></div>', css: `${SW_CSS} .bg { ${STRIPES} padding: 16px; border-radius: 14px; }` }],
      ['Alpha 0.5', ['background: rgb(255 69 0 / 0.5);'], 'The fourth value, alpha, sets how see-through it is: 0 is invisible, 1 is solid.', { html: '<div class="bg"><div class="swatch" style="background: rgb(255 69 0 / 0.5)">Half</div></div>', css: `${SW_CSS} .bg { ${STRIPES} padding: 16px; border-radius: 14px; }` }],
      ['Hex with alpha', ['background: #FF450080;'], 'Hex can carry alpha too: a fourth pair. 80 is about half.', { html: '<div class="bg"><div class="swatch" style="background: #FF450080">Hex 80</div></div>', css: `${SW_CSS} .bg { ${STRIPES} padding: 16px; border-radius: 14px; }` }],
    ]),
    explore('currentColor', ['.badge {', '  color: teal;', '  border: 2px solid currentColor;', '}'], [
      [2, 'The text colour is teal.', '.badge'],
      [3, 'currentColor means “whatever my text colour is”. Change color once and the border follows.', '.badge'],
    ], { page: { html: '<span class="badge">New</span>', css: `${BASE} .badge { color: teal; border: 2px solid currentColor; padding: 4px 10px; border-radius: 20px; }` }, minTaps: 2 }),
    check('Which is the same colour as #FFFFFF?', ['white', 'black', '#000', 'rgb(0 0 0)'], 'FF is the most of each light; all three together make white.', 'Zero light is black.'),
    recap([
      ['🎨', 'Names, hex, rgb() and hsl() all describe colours'],
      ['🌗', 'HSL makes lighter and darker shades easy'],
      ['🔍', 'Alpha (0 to 1) makes a colour see-through'],
    ]),
  ]),

  lesson('css-3-2', 'Opacity', 4, [
    beforeAfter(
      'Fade the whole box, or just its colour?',
      [['.box { opacity: 0.5; }'], 'opacity fades everything: the background, the text and anything inside.', { html: '<div class="bg"><div class="swatch box">Lemon Tea</div></div>', css: `${SW_CSS} .bg { ${STRIPES} padding: 16px; border-radius: 14px; } .box { background: #C2410C; opacity: 0.5; }` }],
      [['.box { background: rgb(194 65 12 / 0.5); }'], 'An alpha colour fades only the background. The text stays crisp.', { html: '<div class="bg"><div class="swatch box">Lemon Tea</div></div>', css: `${SW_CSS} .bg { ${STRIPES} padding: 16px; border-radius: 14px; } .box { background: rgb(194 65 12 / 0.5); }` }],
      undefined,
      ['opacity', 'alpha colour'],
    ),
    live('How faded?', 'Tap an opacity.', ['.sold-out { opacity: {{v}}; }'], ['1', '0.6', '0.3', '0'], { html: `${CARD}<div class="card sold-out"><h2>Iced Coffee</h2><p class="price">Sold out</p></div>`, css: `${BASE} .card { background: #FFF1D6; padding: 10px; border-radius: 10px; margin: 6px 0; } .card h2 { margin: 0; font-size: 18px; }`, caption: 'At 0 it is invisible but still takes up space.' }),
    check('Rosa wants a see-through banner background but sharp text. Which?', ['background: rgb(0 0 0 / 0.4);', 'opacity: 0.4;'], 'Alpha on the background colour only fades the background.', 'opacity fades the text too.'),
    truth([
      ['opacity: 0 removes the element from the layout', false, 'It is invisible but still takes up its space.'],
      ['opacity goes from 0 to 1', true, '1 is fully visible.'],
      ['opacity also fades the element’s children', true, 'Everything inside fades with it.'],
    ]),
    place('Half see-through', 'Fade the sold-out card to half.', [['.sold-out { opacity: ', { gap: 0 }, '; }']], ['0.5', '50', 'half', '5'], ['0.5'], 'opacity is a number from 0 (invisible) to 1 (solid).', { html: '<div class="card sold-out"><h2>Iced Coffee</h2><p>Sold out</p></div>', css: `${BASE} .card { background: #FFF1D6; padding: 10px; border-radius: 10px; } .card h2 { margin: 0; font-size: 18px; }` }),
    recap([
      ['👻', 'opacity fades the whole element and its children'],
      ['🎯', 'An alpha colour fades only that colour'],
      ['📦', 'Invisible still takes up space'],
    ]),
  ]),

  lesson('css-3-3', 'Backgrounds', 6, [
    chat(['Rosa wants a picture of her café behind the name on the home page.', 'Backgrounds can be a colour, a picture, or both, and you control how the picture repeats, sits and scales.']),
    live('Repeat or not?', 'A small cup picture, repeated in different ways.', ['.banner { background-image: url(cup.svg); background-repeat: {{v}}; }'], ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'], { html: BANNER, css: BANNER_CSS, caption: 'By default a background picture repeats to fill the box, like tiles.' }),
    live('Cover or contain?', 'A wide picture in a box. Tap a size.', ['.banner { background: url(banner.svg) center / {{v}} no-repeat #FFF8EC; }'], ['auto', 'cover', 'contain', '100% 100%'], { html: BANNER, css: BANNER_CSS, caption: 'cover fills the box and may crop. contain shows the whole picture and may leave gaps. 100% 100% stretches it.' }),
    reveal('The other background settings', [
      ['background-position', 'Where it sits: center, top right, or 20px 40px.'],
      ['background-attachment', 'fixed keeps it still while the page scrolls.'],
      ['background-origin / clip', 'Whether it starts at the border, the padding or the content.'],
      ['Several layers', 'background-image: url(cup.svg), url(banner.svg); The first one is on top.'],
    ], { mono: true }),
    explore('The shorthand', ['.banner {', '  background: #FFF8EC url(banner.svg) center / cover no-repeat;', '}'], [
      [2, 'One line: colour, picture, position / size, repeat. The colour shows while the picture loads, or if it fails.', '.banner'],
    ], { page: { html: BANNER, css: `${BANNER_CSS} .banner { background: #FFF8EC url(banner.svg) center / cover no-repeat; }` }, minTaps: 1 }),
    copy('Match the hero banner', 'Fill the banner without stretching or tiling.', BANNER, `${BANNER_CSS}\n.banner {\n  background-image: url(banner.svg);\n  background-size: {{0}};\n  background-repeat: {{1}};\n}`, [
      ['background-size', ['auto', 'contain', 'cover'], 'cover'],
      ['background-repeat', ['repeat', 'no-repeat'], 'no-repeat'],
    ]),
    recap([
      ['🖼', 'background-image: url(…) adds a picture'],
      ['🧱', 'Pictures repeat unless you say no-repeat'],
      ['📐', 'cover fills, contain shows it all'],
    ]),
  ]),

  lesson('css-3-4', 'Gradients', 4, [
    reveal('Three kinds of gradient', [
      ['linear-gradient', 'Colours change along a straight line.', '➡️'],
      ['radial-gradient', 'Colours spread out from the centre, like a ripple.', '⭕'],
      ['conic-gradient', 'Colours turn around a point, like a pie chart.', '🥧'],
    ]),
    live('Pick a gradient', 'Gradients are backgrounds, so they go in background.', ['.swatch { background: {{v}}; }'], ['linear-gradient(#FDBA74, #C2410C)', 'linear-gradient(90deg, #FDBA74, #C2410C)', 'radial-gradient(#FDE68A, #C2410C)', 'conic-gradient(#C2410C 0 40%, #FDBA74 0 75%, #FDE68A 0)'], { html: SWATCH, css: SW_CSS }),
    live('Change the angle', 'The angle sets the direction of a linear gradient.', ['.swatch { background: linear-gradient({{v}}, #4B3FD8, #22C55E); }'], ['0deg', '90deg', '135deg', '180deg', 'to right'], { html: SWATCH, css: SW_CSS, caption: '0deg goes upwards, 90deg to the right, 180deg downwards (the default).' }),
    place('A sunset strip', 'Make a gradient from orange to purple, left to right.', [['.swatch { background: ', { gap: 0 }, '(', { gap: 1 }, ', orange, purple); }']], ['linear-gradient', 'to right', 'gradient', 'right', 'radial'], ['linear-gradient', 'to right'], 'Name the gradient, then the direction, then the colours.', { html: SWATCH, css: SW_CSS }),
    tapbug('No gradient shows', ['.swatch {', '  color: linear-gradient(#FDBA74, #C2410C);', '}'], [[2, 'color', 'background']], 'A gradient is a picture, so it can only be a background, never a text colour.'),
    recap([
      ['➡️', 'linear: along a line, at an angle'],
      ['⭕', 'radial: from the centre out'],
      ['🥧', 'conic: around a point'],
    ]),
  ]),

  lesson('css-3-5', 'Units: px, %, em, rem', 6, [
    reveal('Absolute and relative', [
      ['px', 'A fixed size. 16px is always 16px.', '📏'],
      ['%', 'A share of the parent. width: 50% is half the parent’s width.', '🍰'],
      ['em', 'Relative to this element’s font size. 2em = twice the text size.', '🔠'],
      ['rem', 'Relative to the root (<html>) font size. Usually 1rem = 16px.', '🌱'],
      ['vw / vh', '1% of the screen’s width / height. 100vh is the full screen height.', '🖥'],
    ]),
    live('Grow the root', 'Change the root font size. Watch which line grows.', ['html { font-size: {{v}}; }'], ['16px', '20px', '12px', '24px'], { html: '<p class="px">24px stays the same</p><p class="rem">1.5rem grows with the root</p>', css: 'body { font-family: system-ui, sans-serif; margin: 14px; } .px { font-size: 24px; } .rem { font-size: 1.5rem; color: #4B3FD8; }', caption: 'When someone sets bigger text on their phone, rem sizes grow with it. That’s why rem is a good choice for text.' }),
    live('Percent of the parent', 'Tap a width for the inner bar.', ['.bar { width: {{v}}; }'], ['50%', '25%', '100%', '80%'], { html: '<div class="track"><div class="bar"></div></div>', css: `${BASE} .track { width: 80%; background: #EEE; border-radius: 8px; } .bar { height: 30px; background: #22C55E; border-radius: 8px; }` }),
    matchUp('Which unit fits?', [['font-size: 1rem', 'Text that respects the user’s settings'], ['width: 50%', 'Half the parent'], ['height: 100vh', 'The full screen height'], ['border: 1px', 'A thin fixed line']], 'Use rem for text, % and vw for flexible widths, px for fine details.'),
    check('The root font size is 16px. How big is 2rem?', ['32px', '16px', '2px', '18px'], '2 × 16px = 32px.', 'rem multiplies the root size.'),
    tapbug('The box has no width', ['.card {', '  width: 300;', '}'], [[2, '300', '300px']], 'Lengths need a unit (only 0 can go without one). 300 alone is skipped.'),
    recap([
      ['📏', 'px is fixed; %, em, rem, vw and vh are relative'],
      ['🌱', 'rem for text: it follows the user’s settings'],
      ['⚠️', 'Lengths need a unit, except 0'],
    ]),
  ]),

  lesson('css-3-6', 'CSS maths', 5, [
    explore('Four maths functions', ['width: calc(100% - 40px);', 'width: min(100%, 600px);', 'height: max(50vh, 300px);', 'font-size: clamp(1.25rem, 4vw, 2.5rem);'], [
      [1, 'calc() mixes units: the full width minus 40 pixels.'],
      [2, 'min() picks the smaller: full width on a phone, but never wider than 600px.'],
      [3, 'max() picks the larger: half the screen, but at least 300px.'],
      [4, 'clamp(smallest, ideal, largest): grows with the screen but stays between the two limits.'],
    ], { page: { html: '<p>Maths lets one rule work on every screen size.</p>', css: BASE }, minTaps: 3 }),
    resize('A heading that scales', 'Tap each width. The heading grows with the screen, but never too small or too big.', { html: '<h1>Rosa’s Café</h1><p>Open 7 am to 9 pm</p>', css: 'body { font-family: system-ui, sans-serif; margin: 16px; }\nh1 {\n  font-size: clamp(1.5rem, 6vw, 3.5rem);\n  color: #C2410C;\n}' }, 'Without clamp, 6vw would be tiny on a phone and huge on a big screen.'),
    live('Room for a sidebar', 'The main area fills the width, minus a gap for the sidebar.', ['.main { width: calc(100% - {{v}}); }'], ['100px', '40px', '160px'], { html: '<div class="row"><div class="main">Menu</div><div class="side">Offers</div></div>', css: `${BASE} .row { display: flex; } .main { background: #FFF1D6; padding: 10px; } .side { flex: 1; background: #E0E7FF; padding: 10px; }` }),
    check('What does min(100%, 600px) give on a 360px-wide phone?', ['360px (100%)', '600px', '0px', '960px'], 'min() picks the smaller of the two.', 'Which is smaller on a phone?', { mono: false }),
    tapbug('calc() is ignored', ['.main {', '  width: calc(100%-40px);', '}'], [[2, '100%-40px', '100% - 40px']], 'In calc(), + and - need a space on each side. Without spaces, 100%-40px isn’t read as a sum.'),
    recap([
      ['➗', 'calc() mixes units'],
      ['↕️', 'min() and max() set limits'],
      ['🗜', 'clamp() grows between a smallest and a largest'],
    ]),
  ]),

  challenge('css-3-ch', 'Module 3 Challenge', { icon: '🌈', name: 'Colour Mixer' }, ['Write colours as names, hex, rgb() and hsl()', 'Style backgrounds with pictures and gradients', 'Choose the right unit and use CSS maths'], [
    mcq(1, 'Which is short hex for #FF6600?', ['#F60', '#FF6', '#606', '#F66'], 'Each digit doubles: F→FF, 6→66, 0→00.', { mono: true }),
    mcq(2, 'What does the 0.3 in rgb(0 0 0 / 0.3) set?', ['How see-through it is', 'How bright it is', 'Its size', 'Its hue'], 'The fourth value is alpha.'),
    mcq(3, 'Which background-size fills the box and may crop the picture?', ['cover', 'contain', 'auto', 'repeat'], 'cover always fills; contain always shows all of it.', { mono: true }),
    mcq(4, 'The root font size is 20px. What is 1.5rem?', ['30px', '20px', '1.5px', '15px'], '1.5 × 20px.'),
    mcq(5, 'Which keeps a heading between 1rem and 3rem?', ['clamp(1rem, 5vw, 3rem)', 'calc(1rem, 3rem)', 'min(1rem)', 'max(3rem, 1rem)'], 'clamp(smallest, ideal, largest).', { mono: true }),
    swipe([
      ['opacity fades the text inside too', true, 'Everything inside fades.'],
      ['A gradient can be used as a text color', false, 'Gradients are backgrounds.'],
      ['width: 50% means half the parent’s width', true, '% is a share of the parent.'],
      ['calc(100%-20px) works without spaces', false, '+ and - need spaces around them.'],
    ]),
    pairs([['#FFFFFF', 'White'], ['hsl(120 100% 50%)', 'Pure green'], ['100vh', 'Full screen height'], ['no-repeat', 'Show the picture once']], 'Colours, units and background settings.'),
    pickCode('Which gives a top-to-bottom orange-to-red background?', ['background: linear-gradient(orange, red);', 'color: linear-gradient(orange, red);', 'background: gradient(orange to red);', 'background-color: orange red;'], 'linear-gradient goes top to bottom by default, and it is a background.'),
    bugTask(['.banner {', '  background-image: url(banner.svg)', '  background-size: cover;', '  height: 200;', '}'], [[2, 'url(banner.svg)', 'url(banner.svg);'], [4, '200', '200px']], 'A missing semicolon swallows the next line, and a length needs a unit.'),
    xray(
      { html: '<div class="hero"><h2>Rosa’s Café</h2></div><div class="tag">Today: 10% off</div><div class="strip"></div>', css: 'body{font-family:system-ui,sans-serif;margin:14px} .hero{height:120px;background:url(banner.svg) center/cover;border-radius:12px;display:grid;place-items:center} .hero h2{margin:0;background:rgb(255 255 255 / 0.7);padding:4px 10px;border-radius:8px} .tag{margin:10px 0;padding:8px;color:white;background:hsl(16 100% 45%);border-radius:8px} .strip{height:30px;border-radius:8px;background:linear-gradient(90deg,#FDBA74,#C2410C)}' },
      [
        ['.hero', 'The café picture', 'background: url(banner.svg)', ['background: url(banner.svg)', 'img', 'color: banner']],
        ['.tag', 'The orange label', 'background: hsl(16 100% 45%)', ['background: hsl(16 100% 45%)', 'opacity: 0.5', 'border: orange']],
        ['.strip', 'The fading strip', 'linear-gradient', ['linear-gradient', 'radial-gradient', 'opacity']],
      ],
    ),
    arrange(['.hero {\n  background: url(banner.svg) center / cover;\n}', '.hero h2 {\n  background: rgb(255 255 255 / 0.7);\n}', '.tag {\n  background: hsl(16 100% 45%);\n}'], 'the picture on .hero first, then the see-through label behind the heading, then the orange tag', `${BASE} .hero{height:140px;border-radius:12px;display:grid;place-items:center} .hero h2{margin:0;padding:4px 10px;border-radius:8px} .tag{margin-top:10px;padding:8px;color:white;border-radius:8px}`, '<div class="hero"><h2>Rosa’s Café</h2></div><div class="tag">Today: 10% off</div>'),
  ]),
];
