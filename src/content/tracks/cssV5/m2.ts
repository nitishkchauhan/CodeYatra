// CSS track · Module 2 · Selectors. Lesson 2.1 keeps the old selectors module id (c-sel-1).
import type { Lesson } from '../../types';
import { BASE, MENU } from './cafe';
import { arrange, bugTask, challenge, chat, check, explore, lesson, live, matchUp, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const FAMILY = '<div class="menu">\n  <h2>Teas</h2>\n  <p>Lemon Tea</p>\n  <p>Ginger Tea</p>\n  <div class="box"><p>Iced Tea (inside a box)</p></div>\n</div>';
const LINKS = '<p><a href="https://maps.example.com">Find us</a> · <a href="menu.pdf">Menu (PDF)</a> · <a href="tel:+919800000000">Call</a></p>\n<input type="text" placeholder="Your name">\n<input type="email" placeholder="Your email">';

export const CSS_M2: Lesson[] = [
  lesson('c-sel-1', 'Element, class and id', 5, [
    chat(['A selector is how you point at things on a page.', 'Rosa wants every price green, only the special card highlighted, and one heading bigger than the rest. Each needs a different kind of pointing.']),
    explore('Four ways to point', ['h2 { color: #7C2D12; }', '.price { color: green; }', '#special { border: 3px solid gold; }', '* { box-sizing: border-box; }'], [
      [1, 'A type selector: every <h2> on the page.', 'h2'],
      [2, 'A class selector starts with a dot: every element with class="price".', '.price'],
      [3, 'An id selector starts with #: the one element with id="special". An id is used once per page.', '#special'],
      [4, 'The universal selector * picks every element. Often used for page-wide settings.'],
    ], { page: { html: MENU.replace('<div class="card"><h2>Coffee', '<div class="card" id="special"><h2>Coffee'), css: `${BASE} h2{color:#7C2D12;margin:0} .price{color:green} #special{border:3px solid gold} .card{padding:8px;margin:4px 0}` }, minTaps: 3 }),
    reveal('Class or id?', [
      ['class', 'For groups. Many elements can share a class, and one element can have several: class="card offer".', '👥'],
      ['id', 'For one unique element, like the page header or a link target. Never reuse it.', '☝️'],
      ['Grouping', 'h1, h2, h3 { … } styles all three with one rule. Commas separate the selectors.', '🧺'],
    ]),
    place('Point at the prices', 'Every price has class="price". Fill the gap.', [[{ gap: 0 }, ' { color: green; }']], ['.price', '#price', 'price', '<price>'], ['.price'], 'A class selector starts with a dot.', { html: MENU, css: BASE }),
    check('Which selector picks the one element with id="today"?', ['#today', '.today', 'today', '*today'], 'A hash means id.', 'Dot is for classes.'),
    tapbug('The headings won’t change', ['h1 h2 h3 {', '  font-family: Georgia, serif;', '}'], [[1, 'h1 h2 h3', 'h1, h2, h3']], 'To style several selectors with one rule, separate them with commas. Without commas it means something else: an h3 inside an h2 inside an h1.'),
    recap([
      ['🏷', 'p picks tags, .name picks classes, #name picks one id'],
      ['⭐', '* picks everything'],
      ['🧺', 'Commas group selectors: h1, h2 { … }'],
    ]),
  ]),

  lesson('css-2-2', 'Family selectors', 5, [
    reveal('Elements have families', [
      ['Parent', 'The element something sits directly inside.', '👪'],
      ['Child', 'An element directly inside another.', '🧒'],
      ['Descendant', 'Anywhere inside: a child, a grandchild and so on.', '🌳'],
      ['Sibling', 'Elements side by side, with the same parent.', '👫'],
    ], { code: [FAMILY], mono: true }),
    live('Who gets picked?', 'Tap a selector. The picked paragraphs turn yellow.', ['{{v}} { background: #FFE08A; }'], ['.menu p', '.menu > p', 'h2 + p', 'h2 ~ p'], { html: FAMILY, css: `${BASE} .box{border:1px dashed #999;padding:4px}`, caption: 'space = anywhere inside · > = direct child · + = the very next sibling · ~ = every later sibling' }),
    matchUp('Read the symbol', [['.menu p', 'Any p inside .menu'], ['.menu > p', 'A p directly inside .menu'], ['h2 + p', 'The p right after an h2'], ['h2 ~ p', 'Every p after an h2']], 'The symbol between two selectors says how they are related.'),
    check('Which picks only the paragraph straight after each h2?', ['h2 + p', 'h2 p', 'h2 > p', 'h2 ~ p'], '+ means the very next sibling.', 'Look for the “next door” symbol.'),
    tapbug('The iced tea is still yellow', ['/* Only the direct children */', '.menu p { background: #FFE08A; }'], [[2, '.menu p', '.menu > p']], 'A space means “anywhere inside”, so the paragraph inside .box is picked too. > limits it to direct children.'),
    recap([
      ['🌳', 'Space: descendant, anywhere inside'],
      ['🧒', '>: direct child only'],
      ['👫', '+ next sibling, ~ every later sibling'],
    ]),
  ]),

  lesson('css-2-3', 'Attribute selectors', 4, [
    explore('Select by attribute', ['[type="email"] { border-color: teal; }', 'a[href^="https"] { color: green; }', 'a[href$=".pdf"] { font-weight: bold; }', 'a[href*="tel"] { color: crimson; }'], [
      [1, '[attr="value"]: the attribute has exactly this value. Here, the email box.', '[type="email"]'],
      [2, '^= means “starts with”: links that start with https.', 'a[href^="https"]'],
      [3, '$= means “ends with”: links to PDF files.', 'a[href$=".pdf"]'],
      [4, '*= means “contains”: here, the phone link.', 'a[href*="tel"]'],
    ], { page: { html: LINKS, css: `${BASE} input{display:block;margin:6px 0;padding:6px;border:2px solid #ccc}` }, minTaps: 3 }),
    live('Try the patterns', 'Tap a selector and watch what turns orange.', ['{{v}} { outline: 3px solid orange; }'], ['[type="email"]', 'a[href^="https"]', 'a[href$=".pdf"]', 'a[href*="tel"]', '[placeholder]'], { html: LINKS, css: `${BASE} input{display:block;margin:6px 0;padding:6px}`, caption: '[placeholder] with no value picks anything that has that attribute at all.' }),
    matchUp('Match the symbol', [['^=', 'Starts with'], ['$=', 'Ends with'], ['*=', 'Contains'], ['=', 'Is exactly']], 'A small symbol before = changes the kind of match.'),
    check('Which picks every link to a PDF?', ['a[href$=".pdf"]', 'a[href^=".pdf"]', 'a.pdf', 'a[pdf]'], '$= checks how the value ends.', 'PDF links end with .pdf.'),
    tapbug('The email box isn’t teal', ['input[type=="email"] {', '  border-color: teal;', '}'], [[1, '==', '=']], 'Attribute selectors use a single = sign.'),
    recap([
      ['🔖', '[attr] has it · [attr="x"] equals x'],
      ['🔤', '^= starts · $= ends · *= contains'],
      ['📝', 'Great for styling form inputs and file links'],
    ]),
  ]),

  lesson('css-2-4', 'Inheritance', 4, [
    chat(['Set a font on <body> and every paragraph, heading and list inside gets it too.', 'That’s inheritance: some styles flow down from parent to child, like a family surname.']),
    toggle('Set it once, at the top', [
      ['Nothing set', ['/* no rules */'], 'The browser’s default font and colour.', { html: MENU, css: 'body{margin:14px}' }],
      ['On body', ['body {', '  font-family: system-ui, sans-serif;', '  color: #7C2D12;', '}'], 'Every element inside body inherits the font and colour.', { html: MENU, css: 'body{margin:14px;font-family:system-ui,sans-serif;color:#7C2D12}' }],
      ['A border on body', ['body {', '  border: 3px solid teal;', '}'], 'Borders are not inherited. Only body gets one, not every card inside.', { html: MENU, css: 'body{margin:14px;border:3px solid teal}' }],
    ]),
    reveal('What flows down, what doesn’t', [
      ['Inherited', 'Text things: color, font-family, font-size, line-height, text-align.', '⬇️'],
      ['Not inherited', 'Box things: border, padding, margin, background, width.', '⛔'],
      ['inherit', 'Force it: border: inherit; takes the parent’s value anyway.', '🔗'],
    ]),
    truth([
      ['color is inherited', true, 'Text colour flows down to children.'],
      ['padding is inherited', false, 'Box spacing stays on its own element.'],
      ['Setting a font on body is a good habit', true, 'One rule styles the whole page.'],
    ]),
    check('body has color: navy. A <p> inside has no colour rule. What colour is it?', ['navy', 'black', 'blue', 'none'], 'color is inherited from body.', 'Does colour flow down?', { mono: false }),
    recap([
      ['⬇️', 'Text styles flow down to children'],
      ['⛔', 'Boxes, borders and spacing don’t'],
      ['🏠', 'Set fonts and colours once, on body'],
    ]),
  ]),

  lesson('css-2-5', 'Which rule wins?', 6, [
    chat(['Two rules want different colours for one price. Order isn’t the whole story.', 'A more exact selector beats a general one, wherever it is written. This is called specificity.']),
    reveal('The specificity scoreboard', [
      ['Inline style', 'style="…" on the tag. Beats any selector.', '🥇'],
      ['id', '#special. Very strong.', '🥈'],
      ['class, attribute, :hover', '.price, [type="email"], :hover. Medium.', '🥉'],
      ['type', 'p, h2. The weakest.', '🏅'],
    ], { intro: 'Strongest first. Tap each.' }),
    check('Which colour is the price?', ['green', 'red'], '.price (a class) beats p (a type), even though p is written later.', 'Compare the selectors, not the order.', { code: ['.price { color: green; }', 'p { color: red; }', '<p class="price">₹40</p>'] }),
    check('Which colour is the heading?', ['purple', 'orange'], 'The id is more specific than two classes.', 'An id beats any number of classes.', { code: ['#today { color: purple; }', '.menu .title { color: orange; }', '<div class="menu"><h2 class="title" id="today">…</h2></div>'] }),
    toggle('!important', [
      ['Normal', ['#special .price { color: green; }', '.price { color: red; }'], 'The more specific rule wins: green.', { html: '<div id="special"><p class="price">₹60</p></div>', css: `${BASE} #special .price{color:green} .price{color:red}` }],
      ['!important', ['#special .price { color: green; }', '.price { color: red !important; }'], '!important jumps the queue: red. Use it as a last resort, because it makes styles hard to change later.', { html: '<div id="special"><p class="price">₹60</p></div>', css: `${BASE} #special .price{color:green} .price{color:red !important}` }],
    ]),
    tapbug('The sale price stays black', ['#menu p { color: black; }', '.sale { color: red; }', '<div id="menu"><p class="sale">₹30</p></div>'], [[2, '.sale', '#menu .sale']], '#menu p has an id, so it beats the class alone. Make the sale rule at least as specific: #menu .sale.'),
    recap([
      ['🏆', 'Inline > id > class > type'],
      ['⬇️', 'Equal strength: the later rule wins'],
      ['⚠️', '!important wins, but use it rarely'],
    ]),
  ]),

  challenge('css-2-ch', 'Module 2 Challenge', { icon: '🎯', name: 'Sharp Shooter' }, ['Pick elements by tag, class, id and attribute', 'Use family selectors to aim precisely', 'Predict the winner with specificity and inheritance'], [
    mcq(1, 'Which selector picks elements with class="offer"?', ['.offer', '#offer', 'offer', '[offer]'], 'Classes start with a dot.', { mono: true }),
    mcq(2, 'What does .menu > li pick?', ['li elements directly inside .menu', 'Every li anywhere in .menu', 'The li right after .menu', 'All li on the page'], '> means direct child.'),
    mcq(3, 'Which wins: #top p or .menu p?', ['#top p', '.menu p', 'The one written later', 'Neither'], 'An id beats a class.', { mono: true }),
    mcq(4, 'Which of these is inherited?', ['font-family', 'border', 'margin', 'padding'], 'Text styles flow down; box styles don’t.'),
    mcq(5, 'Which picks inputs where type is exactly "email"?', ['input[type="email"]', 'input.email', 'input#email', 'input:email'], 'Square brackets check attributes.', { mono: true }),
    swipe([
      ['An id should be used only once per page', true, 'Classes are for groups.'],
      ['h1, h2 styles both h1 and h2', true, 'Commas group selectors.'],
      ['A later rule always wins', false, 'Only when the selectors are equally specific.'],
      ['!important is a good everyday fix', false, 'It makes styles hard to change. Use it rarely.'],
    ]),
    pairs([['*', 'Every element'], ['h2 + p', 'Next sibling'], ['a[href^="https"]', 'Starts with'], ['#logo', 'One element by id']], 'Each symbol aims the selector a different way.'),
    pickCode('Which turns only the links inside the nav orange?', ['nav a { color: orange; }', 'nav, a { color: orange; }', 'a nav { color: orange; }', '.nav.a { color: orange; }'], 'A space means “inside”. A comma would style every nav and every link.'),
    bugTask(['.Price { color: green; }', '#special, { border: 2px solid gold; }', '<p class="price">₹40</p>'], [[1, '.Price', '.price'], [2, '#special,', '#special']], 'Class names are case-sensitive, and a trailing comma makes the whole selector invalid.'),
    xray(
      { html: '<nav><a href="#">Menu</a> <a href="#">Visit</a></nav><h2 id="today">Today’s special</h2><p class="price">₹60</p><input type="email" placeholder="Email">', css: 'body{font-family:system-ui,sans-serif;margin:14px} nav a{color:#C2410C} #today{text-decoration:underline} .price{color:green;font-weight:bold} input[type="email"]{border:2px solid teal;padding:6px}' },
      [
        ['nav a', 'The orange links', 'nav a', ['nav a', 'a nav', '#nav']],
        ['#today', 'The underlined heading', '#today', ['#today', '.today', 'h2 + p']],
        ['.price', 'The green price', '.price', ['.price', 'p > .price', '#price']],
        ['input', 'The teal input box', 'input[type="email"]', ['input[type="email"]', 'input.email', 'email']],
      ],
    ),
    arrange(['body {\n  color: #3B2A1A;\n}', '.price {\n  color: green;\n}', '#special .price {\n  color: crimson;\n}'], 'a text colour on body first, then every price green, then the special card’s price crimson', BASE, '<div class="card"><p class="price">₹40</p></div><div class="card" id="special"><p class="price">₹60</p></div>'),
  ]),
];
