// CSS track · Module 4 · Text and Fonts. Lesson 4.1 keeps the old typography module id (c-text-1).
import type { Lesson } from '../../types';
import { BASE } from './cafe';
import { arrange, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const ABOUT = '<h1>Riya’s Café</h1>\n<p>We brew fresh lemon tea and filter coffee every morning, and bake cheese toast to order. Come in, sit down, stay a while.</p>';
const T = 'body { margin: 14px; color: #2B2118; }';
const ICON = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h14v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM17 11h2a3 3 0 0 1 0 6h-2" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

export const CSS_M4: Lesson[] = [
  lesson('c-text-1', 'Fonts and fallbacks', 5, [
    chat(['Fonts set the voice of a page. A café, a bank and a school all “sound” different before you read a word.', 'But a font only shows if the visitor’s device has it, so we always list backups.']),
    toggle('Five font families', [
      ['serif', ['font-family: Georgia, serif;'], 'Small “feet” on the letters. Feels classic, like a newspaper.', { html: ABOUT, css: `${T} body { font-family: Georgia, serif; }` }],
      ['sans-serif', ['font-family: system-ui, sans-serif;'], 'No feet. Clean and easy on screens. Most apps use one.', { html: ABOUT, css: `${T} body { font-family: system-ui, sans-serif; }` }],
      ['monospace', ['font-family: "Courier New", monospace;'], 'Every letter the same width. Used for code.', { html: ABOUT, css: `${T} body { font-family: "Courier New", monospace; }` }],
      ['cursive', ['font-family: cursive;'], 'Like handwriting. Fun for a heading, hard to read in long text.', { html: ABOUT, css: `${T} body { font-family: cursive; }` }],
    ]),
    explore('A font stack', ['body {', '  font-family: "Trebuchet MS",', '    Verdana,', '    sans-serif;', '}'], [
      [2, 'The first choice. The browser uses it if the device has it. Names with spaces go in quotes.', 'p'],
      [3, 'The backup, used only if the first one is missing.', 'p'],
      [4, 'The generic family last: if every named font is missing, the device’s own sans-serif is used. Something sensible always shows.', 'p'],
    ], { page: { html: ABOUT, css: `${T} body { font-family: "Trebuchet MS", Verdana, sans-serif; }` }, minTaps: 3 }),
    place('Build a safe stack', 'Use Georgia, then Times New Roman, then any serif.', [['h1 { font-family: Georgia, ', { gap: 0 }, ', ', { gap: 1 }, '; }']], ['"Times New Roman"', 'serif', 'Times New Roman', 'sans-serif'], ['"Times New Roman"', 'serif'], 'Quote names with spaces, and end with the generic family.', { html: ABOUT, css: T }),
    check('Why end a font stack with sans-serif or serif?', ['So something sensible shows if the named fonts are missing', 'To make the text bold', 'Because the browser needs exactly three fonts'], 'The generic family is the safety net.', 'Think about a phone that has none of the fonts.', { mono: false }),
    tapbug('The font is ignored', ['p {', '  font-family: Times New Roman, serif;', '}'], [[2, 'Times New Roman', '"Times New Roman"']], 'Font names with spaces should be quoted, so the browser reads them as one name.'),
    recap([
      ['🔤', 'serif, sans-serif, monospace, cursive'],
      ['🪜', 'A stack lists backups in order'],
      ['🛟', 'Always end with a generic family'],
    ]),
  ]),

  lesson('css-4-2', 'Size, weight and style', 5, [
    live('Weight', 'Tap a weight. 400 is normal, 700 is bold.', ['h2 { font-weight: {{v}}; }'], ['400', '700', '300', '900'], { html: '<h2>Cheese Toast ₹80</h2>', css: `${BASE} h2 { font-size: 28px; }`, caption: 'Thin and very heavy weights only show if the font includes them.' }),
    live('Line height', 'Find the line spacing that is easiest to read.', ['p { line-height: {{v}}; }'], ['1', '1.5', '2', '1.2'], { html: ABOUT, css: `${BASE} p { font-size: 16px; }`, caption: 'About 1.5 is comfortable for long text. A number with no unit scales with the font size.' }),
    reveal('More text settings', [
      ['font-style', 'italic or normal.'],
      ['font-size', 'Use rem for body text so it respects the reader’s settings.'],
      ['font-variant', 'small-caps: capital letters in a small size.'],
      ['font (shorthand)', 'font: italic 700 1.25rem/1.4 Georgia, serif; style, weight, size/line-height, family.'],
    ], { mono: true }),
    copy('Match the price tag', 'Make your price look like the target.', '<p class="price">₹80 · fresh today</p>', `${BASE}\n.price {\n  font-size: {{0}};\n  font-weight: {{1}};\n  font-style: {{2}};\n}`, [
      ['font-size', ['14px', '18px', '26px'], '26px'],
      ['font-weight', ['400', '700'], '700'],
      ['font-style', ['normal', 'italic'], 'italic'],
    ]),
    tapbug('The shorthand is skipped', ['p {', '  font: Georgia 18px;', '}'], [[2, 'Georgia 18px', '18px Georgia']], 'In the font shorthand, the size comes before the family, and both are required.'),
    recap([
      ['🏋️', 'font-weight: 400 normal, 700 bold'],
      ['📏', 'line-height around 1.5 for reading'],
      ['🧾', 'font: style weight size/line-height family'],
    ]),
  ]),

  lesson('css-4-3', 'Your own fonts', 5, [
    chat(['Riya found a rounded font that matches her café’s sign.', 'Her visitors don’t have it installed, so the site has to bring the font file with it.']),
    explore('@font-face', ['@font-face {', '  font-family: "Cafe Round";', '  src: url(fonts/cafe-round.woff2) format("woff2");', '  font-display: swap;', '}', 'h1 { font-family: "Cafe Round", system-ui, sans-serif; }'], [
      [2, 'The name you choose. You use this name in font-family later.'],
      [3, 'Where the font file is. woff2 is the small, modern web font format.'],
      [4, 'swap shows the fallback straight away, then swaps when the font arrives. No invisible text while it loads.'],
      [6, 'Use it like any font, with fallbacks. This preview can’t load the file, so you see the fallback: exactly why fallbacks matter.', 'h1'],
    ], { page: { html: '<h1>Riya’s Café</h1>', css: `${BASE} h1 { font-family: "Cafe Round", system-ui, sans-serif; color: #C2410C; }` }, minTaps: 3 }),
    reveal('Font services and pairing', [
      ['Font libraries', 'Free font libraries give you a <link> or @import line to paste in. It loads the font from their server.', '📚'],
      ['Pairing', 'Two fonts at most: one with character for headings, one plain one for body text.', '👯'],
      ['Speed', 'Every font file is a download. Load only the weights you use.', '⚡'],
    ]),
    toggle('Two fonts that work together', [
      ['One font', ['h1, p { font-family: system-ui, sans-serif; }'], 'Clean, but the heading has no personality.', { html: ABOUT, css: `${T} h1, p { font-family: system-ui, sans-serif; }` }],
      ['A pair', ['h1 { font-family: Georgia, serif; }', 'p { font-family: system-ui, sans-serif; }'], 'A serif heading with a sans-serif body: a classic pair.', { html: ABOUT, css: `${T} h1 { font-family: Georgia, serif; } p { font-family: system-ui, sans-serif; }` }],
      ['Too many', ['h1 { font-family: cursive; }', 'p { font-family: monospace; }'], 'Two loud fonts fight each other. Keep body text plain.', { html: ABOUT, css: `${T} h1 { font-family: cursive; } p { font-family: monospace; }` }],
    ]),
    check('Which font-display value shows fallback text while the font loads?', ['swap', 'block', 'hidden', 'none'], 'swap shows the fallback, then swaps in the real font.', 'You want text visible straight away.'),
    recap([
      ['📦', '@font-face brings your own font file'],
      ['🔁', 'font-display: swap avoids invisible text'],
      ['👯', 'Pair at most two fonts'],
    ]),
  ]),

  lesson('css-4-4', 'Arranging text', 5, [
    live('Align', 'Tap an alignment.', ['p { text-align: {{v}}; }'], ['left', 'center', 'right', 'justify'], { html: ABOUT, css: `${BASE} p { border: 1px dashed #ccc; padding: 6px; }`, caption: 'justify stretches lines to both edges. It can leave big gaps on narrow phones.' }),
    live('Decorate', 'Underlines and lines through text.', ['.old { text-decoration: {{v}}; }'], ['line-through', 'underline', 'underline wavy red', 'none'], { html: '<p>Lemon Tea <span class="old">₹50</span> <b>₹40</b></p>', css: `${BASE} p { font-size: 22px; }`, caption: 'none is often used to remove the underline from links.' }),
    matchUp('Match the effect', [['text-transform: uppercase', 'ALL CAPITALS'], ['text-indent: 2em', 'First line pushed in'], ['letter-spacing: 3px', 'Space between letters'], ['word-spacing: 10px', 'Space between words']], 'Each property changes one thing about how lines and letters sit.'),
    copy('Style the shop sign', 'Match the sign on the target.', '<p class="sign">open till nine</p>', `${BASE}\n.sign {\n  text-transform: {{0}};\n  letter-spacing: {{1}};\n  text-align: {{2}};\n}`, [
      ['text-transform', ['none', 'capitalize', 'uppercase'], 'uppercase'],
      ['letter-spacing', ['0', '6px'], '6px'],
      ['text-align', ['left', 'center'], 'center'],
    ]),
    tapbug('The link still has an underline', ['a {', '  text-decoration: hidden;', '}'], [[2, 'hidden', 'none']], 'To remove an underline, use text-decoration: none.'),
    recap([
      ['↔️', 'text-align: left, center, right, justify'],
      ['〰️', 'text-decoration adds or removes lines'],
      ['🔠', 'text-transform, letter-spacing, word-spacing, text-indent'],
    ]),
  ]),

  lesson('css-4-5', 'Text effects', 5, [
    live('Text shadow', 'x offset, y offset, blur, colour.', ['h1 { text-shadow: {{v}}; }'], ['2px 2px 0 #FDBA74', '0 0 8px #FB923C', '3px 3px 4px rgb(0 0 0 / 0.4)', 'none'], { html: '<h1>Riya’s Café</h1>', css: `${BASE} h1 { color: #C2410C; font-size: 40px; }` }),
    live('Too long for the card', 'A long dish name in a narrow card. Tap a fix.', ['.name { {{v}} }'], ['white-space: normal;', 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;', 'overflow-wrap: anywhere;'], { html: '<div class="card"><p class="name">Extra-large cheese and corn toast with mint mayo</p></div><div class="card"><p class="name">https://riyas-cafe.example/menu/specials/today</p></div>', css: `${BASE} .card { width: 170px; border: 2px solid #E5D3B3; border-radius: 10px; padding: 6px 10px; margin: 6px 0; } .name { margin: 0; }`, caption: 'The ellipsis (…) needs all three: nowrap, overflow: hidden and text-overflow: ellipsis. overflow-wrap breaks long links.' }),
    reveal('When to use each', [
      ['text-overflow: ellipsis', 'One-line titles in cards and lists.'],
      ['overflow-wrap: anywhere', 'Long links and codes that would burst out of the box.'],
      ['white-space: nowrap', 'Keep a short label on one line, like “₹40 / cup”.'],
      ['writing-mode', 'vertical-rl turns text sideways, for side labels.'],
    ], { mono: true }),
    check('Which three together give a one-line title ending in “…”?', ['white-space: nowrap; overflow: hidden; text-overflow: ellipsis;', 'text-overflow: ellipsis;', 'overflow-wrap: anywhere;'], 'Ellipsis only works on one line (nowrap) that is cut off (overflow: hidden).', 'One property alone isn’t enough.'),
    tapbug('No shadow appears', ['h1 {', '  text-shadow: gray;', '}'], [[2, 'gray', '2px 2px 4px gray']], 'A shadow needs at least an x and a y offset. A colour alone draws nothing.'),
    recap([
      ['🌫', 'text-shadow: x y blur colour'],
      ['…', 'Ellipsis needs nowrap + hidden + ellipsis'],
      ['🔗', 'overflow-wrap stops long words bursting out'],
    ]),
  ]),

  lesson('css-4-6', 'Icons', 4, [
    reveal('Two kinds of icon', [
      ['Icon fonts', 'A font whose “letters” are pictures. Icon libraries give you a <link> and class names like class="icon-cup".', '🔣'],
      ['SVG icons', 'Small drawings written in code. Sharp at any size and easy to colour. The modern choice.', '✏️'],
      ['Emoji', 'Quick, but they look different on every phone and can’t be recoloured.', '😀'],
    ]),
    explore('Style an SVG icon', ['.icon {', '  width: 32px;', '  height: 32px;', '  color: #C2410C;', '}'], [
      [2, 'Size it like any box.', '.icon'],
      [4, 'The drawing uses stroke="currentColor", so it takes the text colour. Change color, the icon changes.', '.icon'],
    ], { page: { html: `<p>${ICON} Fresh tea</p>`, css: `${BASE} p { display: flex; gap: 8px; align-items: center; font-size: 20px; } .icon { width: 32px; height: 32px; color: #C2410C; }` }, minTaps: 2 }),
    copy('Match the icon button', 'Size and colour the icon to match.', `<button class="btn">${ICON} Order</button>`, `${BASE}\n.btn { display: flex; gap: 8px; align-items: center; font-size: 18px; padding: 8px 14px; border-radius: 10px; border: 2px solid currentColor; background: white; }\n.btn {\n  color: {{0}};\n}\n.icon {\n  width: {{1}};\n  height: {{1}};\n}`, [
      ['color', ['black', '#15803D', '#C2410C'], '#15803D'],
      ['icon size', ['16px', '28px', '48px'], '28px'],
    ]),
    check('Why give an SVG icon stroke="currentColor"?', ['It takes the text colour, so CSS color recolours it', 'It makes the icon bigger', 'It loads faster'], 'One color rule styles the text and the icon together.', 'Think about how to change its colour.', { mono: false }),
    tapbug('The icon stays black', ['.icon {', '  colour: #C2410C;', '}'], [[2, 'colour', 'color']], 'CSS uses the American spelling: color. colour is skipped silently.'),
    recap([
      ['✏️', 'SVG icons stay sharp at any size'],
      ['🎨', 'currentColor lets CSS recolour them'],
      ['🔣', 'Icon fonts come from a library link'],
    ]),
  ]),

  challenge('css-4-ch', 'Module 4 Challenge', { icon: '🔤', name: 'Type Setter' }, ['Choose fonts with safe fallbacks', 'Set size, weight, spacing and alignment', 'Add text effects and icons'], [
    mcq(1, 'What is the last font in a good font stack?', ['A generic family like sans-serif', 'The fanciest font', 'Arial, always', 'The font file name'], 'The generic family is the safety net.'),
    mcq(2, 'Which weight is bold?', ['700', '400', '100', 'heavy'], '400 is normal, 700 is bold.', { mono: true }),
    mcq(3, 'What does @font-face do?', ['Loads your own font file', 'Makes text bigger', 'Picks the heading font', 'Adds an icon'], 'It defines a font from a file.'),
    mcq(4, 'Which removes a link’s underline?', ['text-decoration: none', 'underline: false', 'text-style: plain', 'font-decoration: none'], 'text-decoration controls underlines.', { mono: true }),
    mcq(5, 'Which line height is most comfortable for long text?', ['About 1.5', '0.8', '3', '1px'], 'About 1.5 gives lines room to breathe.'),
    swipe([
      ['Font names with spaces should be in quotes', true, 'So they are read as one name.'],
      ['text-overflow: ellipsis works on its own', false, 'It needs nowrap and overflow: hidden.'],
      ['SVG icons can be recoloured with CSS', true, 'With currentColor or fill.'],
      ['Using five different fonts looks professional', false, 'Two is plenty.'],
    ]),
    pairs([['text-transform', 'Capital letters'], ['letter-spacing', 'Gap between letters'], ['text-shadow', 'A shadow behind text'], ['text-align', 'Left, centre or right']], 'Each property controls one thing about text.'),
    pickCode('Which gives a bold, italic, 20px Georgia heading?', ['font: italic 700 20px Georgia, serif;', 'font: Georgia 20px bold italic;', 'font-style: bold italic 20px;', 'text: italic bold 20px Georgia;'], 'The shorthand order: style, weight, size, family.'),
    bugTask(['h1 {', '  font-family: Courier New, monospace;', '  text-decoration: line;', '}'], [[2, 'Courier New', '"Courier New"'], [3, 'line', 'underline']], 'Quote names with spaces; text-decoration takes underline, line-through, overline or none.'),
    xray(
      { html: '<h1>Riya’s Café</h1><p class="tagline">open till nine</p><p class="old">₹50</p><p class="title">Extra-large cheese and corn toast with mint mayo</p>', css: 'body{font-family:system-ui,sans-serif;margin:14px} h1{font-family:Georgia,serif;text-shadow:2px 2px 0 #FDBA74;color:#C2410C} .tagline{text-transform:uppercase;letter-spacing:5px} .old{text-decoration:line-through} .title{width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' },
      [
        ['h1', 'The glow behind the name', 'text-shadow', ['text-shadow', 'box-shadow', 'opacity']],
        ['.tagline', 'The spaced-out capitals', 'letter-spacing', ['letter-spacing', 'word-spacing', 'font-size']],
        ['.old', 'The crossed-out price', 'text-decoration', ['text-decoration', 'text-transform', 'border']],
        ['.title', 'The title ending in …', 'text-overflow', ['text-overflow', 'overflow-wrap', 'font-style']],
      ],
    ),
    arrange(['body {\n  font-family: system-ui, sans-serif;\n  line-height: 1.5;\n}', 'h1 {\n  font-family: Georgia, serif;\n}', '.tagline {\n  text-transform: uppercase;\n}'], 'body text settings first, then the serif heading, then the capital tagline', 'body { margin: 14px; }', '<h1>Riya’s Café</h1><p class="tagline">open till nine</p><p>Fresh lemon tea and coffee every morning.</p>'),
  ]),
];
