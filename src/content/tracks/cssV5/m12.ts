// CSS track · Module 12 · Responsive and Modern CSS, and the final challenge. Lessons 12.1 and 12.4 keep the old
// responsive and variables module ids (c-resp-1, c-vars-1); the final challenge keeps the project id (c-project)
// and its four checked build steps for Sharma Classes.
import type { Lesson, WebStep } from '../../types';
import { CSS_PROJECT_V3 } from '../cssV3';
import { BASE, MENU } from './cafe';
import { beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, resize, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const BRIEF = 'Mr Sharma (Sharma Classes, Jaipur): “Make our page look professional. Deep blue and gold, easy on phones, and an enquiry button that stands out.”';
const LAYOUT ='<header>Riya’s Café</header>\n<div class="wrap">\n  <main>Today’s menu</main>\n  <aside>Offers</aside>\n</div>';
const LAYOUT_CSS = 'body { font-family: system-ui, sans-serif; margin: 10px; }\nheader, main, aside { padding: 14px; border-radius: 10px; color: white; font-weight: bold; margin-bottom: 8px; }\nheader { background: #C2410C; }\nmain { background: #4B3FD8; }\naside { background: #0F766E; }';
const THEME = '<div class="card"><h2>Lemon Tea</h2><p>Fresh every morning.</p><a class="btn">Order ₹40</a></div>';
const THEME_CSS = (vars: string) => `:root { ${vars} } body { font-family: system-ui, sans-serif; margin: 12px; background: var(--bg); color: var(--text); } .card { border: 2px solid var(--brand); border-radius: 12px; padding: 12px; } .card h2 { margin: 0; color: var(--brand); } .btn { display: inline-block; background: var(--brand); color: white; padding: 8px 14px; border-radius: 8px; }`;

export const CSS_M12: Lesson[] = [
  lesson('c-resp-1', 'Responsive design', 6, [
    chat(['Most of Riya’s customers open her site on a phone. Some on a laptop at work. A few on a tablet.', 'Responsive design means one page that fits all of them. The usual plan: design for the phone first, then add rules for bigger screens.']),
    reveal('Three building blocks', [
      ['The viewport tag', '<meta name="viewport" content="width=device-width, initial-scale=1"> tells phones to use their real width instead of pretending to be a laptop.', '📱'],
      ['Flexible layouts', 'Flex, grid, % and max-width stretch and wrap by themselves.', '🧩'],
      ['Media queries', 'Extra rules that switch on at certain widths.', '📐'],
    ]),
    beforeAfter(
      'Without the viewport tag',
      [['<!-- no viewport tag -->'], 'Phones pretend to be about 980px wide and shrink the page: tiny text you have to pinch to read.', { html: `<div style="width:980px;transform:scale(.35);transform-origin:0 0">${MENU}</div>`, css: `${BASE} h1 { font-size: 32px; }` }],
      [['<meta name="viewport"', '  content="width=device-width, initial-scale=1">'], 'With it, the page uses the phone’s real width and the text is readable.', { html: MENU, css: BASE }],
      undefined,
      ['Missing', 'Added'],
    ),
    resize('Phone first', 'Tap each width. One column on a phone; two side by side from 700px.', { html: LAYOUT, css: `${LAYOUT_CSS}\n@media (min-width: 700px) {\n  .wrap {\n    display: grid;\n    grid-template-columns: 2fr 1fr;\n    gap: 8px;\n  }\n}` }, 'The phone layout needs no special rules. The media query only adds the wider layout.'),
    check('What does “mobile first” mean?', ['Write the phone layout first, then add rules for bigger screens', 'Build a separate phone website', 'Hide content on phones', 'Only support phones'], 'Phone styles are the default; min-width queries add more.', 'Which screen is the starting point?', { mono: false }),
    recap([
      ['📱', 'Add the viewport meta tag'],
      ['🧩', 'Use flexible layouts'],
      ['📐', 'Start with phones, add min-width rules'],
    ]),
  ]),

  lesson('css-12-2', 'Media queries', 6, [
    explore('Reading a media query', ['@media (min-width: 700px) {', '  .wrap {', '    display: grid;', '    grid-template-columns: 2fr 1fr;', '  }', '}'], [
      [1, 'min-width: 700px means “when the screen is 700px wide or more”.'],
      [2, 'Inside are normal rules. They only apply when the condition is true.', '.wrap'],
      [6, 'The closing brace ends the query.'],
    ], { page: { html: LAYOUT, css: LAYOUT_CSS }, minTaps: 3 }),
    resize('Two breakpoints', 'Tap each width: one, two, then three columns.', { html: '<div class="grid"><div>Tea</div><div>Coffee</div><div>Toast</div><div>Cake</div><div>Sandwich</div><div>Cookies</div></div>', css: 'body { font-family: system-ui, sans-serif; margin: 10px; }\n.grid { display: grid; gap: 8px; }\n.grid > div { background: #FFF1D6; padding: 14px; border-radius: 10px; text-align: center; }\n@media (min-width: 600px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n@media (min-width: 900px) {\n  .grid { grid-template-columns: 1fr 1fr 1fr; }\n}' }, 'Breakpoints are the widths where the layout changes. Choose them where your content starts to look squashed, not for particular phones.'),
    reveal('Other things you can ask', [
      ['(max-width: 599px)', 'Up to 599px wide. Used for desktop-first designs.'],
      ['(orientation: landscape)', 'The phone is turned sideways.'],
      ['(prefers-color-scheme: dark)', 'The user’s phone is in dark mode.'],
      ['(prefers-reduced-motion: reduce)', 'The user asked for less motion.'],
      ['print', '@media print { … } styles for printing.'],
    ], { mono: true }),
    matchUp('Read the condition', [['min-width: 600px', '600px and wider'], ['max-width: 600px', '600px and narrower'], ['orientation: portrait', 'Taller than wide'], ['prefers-color-scheme: dark', 'Dark mode is on']], 'Media queries test the screen and the user’s settings.'),
    tapbug('The two columns show on phones too', ['/* phone first */', '@media (max-width: 700px) {', '  .wrap { display: grid; grid-template-columns: 2fr 1fr; }', '}'], [[2, 'max-width', 'min-width']], 'max-width means 700px and narrower: exactly the phones. Mobile first adds the wide layout with min-width.'),
    recap([
      ['📐', '@media (min-width: …) { rules }'],
      ['📍', 'Breakpoints go where the content needs them'],
      ['🌙', 'Queries can test settings like dark mode'],
    ]),
  ]),

  lesson('css-12-3', 'Responsive images and video', 5, [
    beforeAfter(
      'The image that breaks the page',
      [['img { }'], 'A 400px picture on a narrower screen sticks out and makes the page scroll sideways.', { html: '<div class="box"><img src="dish.svg" alt="Cheese toast"></div>', css: `${BASE} .box { width: 260px; border: 2px dashed #C2410C; }` }],
      [['img {', '  max-width: 100%;', '  height: auto;', '}'], 'max-width: 100% lets it shrink to fit; height: auto keeps its shape.', { html: '<div class="box"><img src="dish.svg" alt="Cheese toast"></div>', css: `${BASE} .box { width: 260px; border: 2px dashed #C2410C; } img { max-width: 100%; height: auto; display: block; }` }],
    ),
    live('aspect-ratio', 'Keep a box’s shape at any width. Tap a ratio.', ['.video { aspect-ratio: {{v}}; }'], ['16 / 9', '4 / 3', '1', '9 / 16'], { html: '<div class="video">▶ Café tour video</div>', css: `${BASE} .video { width: 100%; background: #3B2A1A; color: white; display: grid; place-items: center; border-radius: 12px; font-weight: bold; }`, caption: 'Videos and video frames (like a YouTube embed) use aspect-ratio: 16 / 9 with width: 100%.' }),
    reveal('Bigger tricks', [
      ['<picture>', 'Different picture files for different widths, chosen by the browser (from the HTML track).'],
      ['srcset', 'Lets the phone download a smaller file. Faster on mobile data.'],
      ['object-fit: cover', 'Fills a fixed-shape box without stretching (Module 11).'],
    ], { mono: true }),
    check('Which stops an image being wider than its container?', ['max-width: 100%', 'width: 400px', 'overflow: visible', 'min-width: 100%'], 'It may shrink but never grow beyond the container.', 'An upper limit.'),
    tapbug('The photo looks squashed', ['img {', '  max-width: 100%;', '  height: 100%;', '}'], [[3, '100%', 'auto']], 'height: 100% stretches the picture. height: auto keeps its shape as it shrinks.'),
    recap([
      ['🖼', 'img { max-width: 100%; height: auto; }'],
      ['📺', 'aspect-ratio keeps video boxes in shape'],
      ['📦', 'srcset and <picture> save data'],
    ]),
  ]),

  lesson('c-vars-1', 'CSS variables', 6, [
    chat(['Riya’s orange appears 23 times in her stylesheet. Now she wants a slightly deeper orange.', 'With a variable, she changes it in one place and all 23 follow.']),
    explore('Set once, use everywhere', [':root {', '  --brand: #C2410C;', '  --space: 12px;', '}', '.btn { background: var(--brand); padding: var(--space); }'], [
      [1, ':root is the top of the page, so variables set here work everywhere.'],
      [2, 'A custom property: two dashes, your own name, a value.'],
      [5, 'var(--brand) reads it. Change the value once, every use updates.', '.btn'],
    ], { page: { html: THEME, css: THEME_CSS('--brand: #C2410C; --bg: white; --text: #2B2118;') }, minTaps: 3 }),
    live('Rebrand in one line', 'Change only --brand.', [':root { --brand: {{v}}; }'], ['#C2410C', '#15803D', '#4B3FD8', '#BE185D'], { html: THEME, css: THEME_CSS('--bg: white; --text: #2B2118;'), caption: 'The heading, border and button all change together.' }),
    toggle('Override and fall back', [
      ['Override', ['.card.special { --brand: #15803D; }'], 'Set the variable again on an element: it changes only inside that element.', { html: `${THEME}<div class="card special"><h2>Special</h2><p>Just today.</p><a class="btn">Order ₹30</a></div>`, css: `${THEME_CSS('--brand: #C2410C; --bg: white; --text: #2B2118;')} .card { margin-bottom: 8px; } .card.special { --brand: #15803D; }` }],
      ['Fallback', ['color: var(--accent, teal);'], 'If --accent isn’t set, use teal.', { html: '<p class="note">No --accent here, so this is teal.</p>', css: `${BASE} .note { color: var(--accent, teal); font-weight: bold; }` }],
      ['In a media query', ['@media (min-width: 700px) {', '  :root { --space: 24px; }', '}'], 'Change a variable at a breakpoint: every padding that uses it grows on bigger screens.', { html: THEME, css: THEME_CSS('--brand: #C2410C; --bg: white; --text: #2B2118; --space: 24px;') + ' .card { padding: var(--space); }' }],
    ]),
    reveal('Variables and JavaScript', [
      ['Read and write', 'JavaScript can change a variable: document.documentElement.style.setProperty("--brand", "#15803D");'],
      ['Why it helps', 'A theme switch or colour picker updates the whole page by changing one value (the JS track shows this).'],
    ], { mono: true }),
    tapbug('The button has no colour', [':root {', '  --brand: #C2410C;', '}', '.btn { background: var(brand); }'], [[4, 'var(brand)', 'var(--brand)']], 'Keep the two dashes when you read a variable: var(--brand).'),
    recap([
      ['🧪', '--name: value; sets a variable'],
      ['📖', 'var(--name, fallback) reads it'],
      ['🎯', 'Override it on an element or in a media query'],
    ]),
  ]),

  lesson('css-12-5', 'Dark mode', 5, [
    chat(['Many people keep their phone in dark mode, especially at night.', 'With variables, a whole dark theme is just a second set of values.']),
    explore('A dark theme in one block', [':root {', '  --bg: #FFFFFF;', '  --text: #2B2118;', '}', '@media (prefers-color-scheme: dark) {', '  :root { --bg: #1F1B2E; --text: #F3EDE4; }', '}'], [
      [2, 'The light colours are the default.'],
      [5, 'This query is true when the phone is set to dark mode.'],
      [6, 'Only the variables change. Every rule that uses them follows.', '.card'],
    ], { page: { html: THEME, css: THEME_CSS('--brand: #C2410C; --bg: #FFFFFF; --text: #2B2118;') }, minTaps: 3 }),
    toggle('Light and dark', [
      ['Light', [':root { --bg: #FFFFFF; --text: #2B2118; }'], 'Day mode.', { html: THEME, css: THEME_CSS('--brand: #C2410C; --bg: #FFFFFF; --text: #2B2118;') }],
      ['Dark', [':root { --bg: #1F1B2E; --text: #F3EDE4;', '  --brand: #FB923C; }'], 'Night mode: dark background, light text, and a brighter orange so it still stands out.', { html: THEME, css: THEME_CSS('--brand: #FB923C; --bg: #1F1B2E; --text: #F3EDE4;') }],
    ]),
    reveal('Dark mode tips', [
      ['Not pure black', 'Very dark grey or navy is easier on the eyes than #000.', '🌑'],
      ['Brighter accents', 'Colours look darker on dark backgrounds, so lighten your brand colour.', '🔆'],
      ['color-scheme: light dark', 'Tells the browser to darken its own parts too, like scrollbars and form fields.', '🧰'],
    ]),
    check('What does prefers-color-scheme: dark test?', ['Whether the user’s device is in dark mode', 'Whether the room is dark', 'Whether the page has a dark background', 'The time of day'], 'It reads the device setting.', 'It is a user preference.', { mono: false }),
    recap([
      ['🌙', '@media (prefers-color-scheme: dark)'],
      ['🧪', 'Swap variable values, not every rule'],
      ['🔆', 'Lighten accents for dark backgrounds'],
    ]),
  ]),

  lesson('css-12-6', 'Modern extras', 5, [
    explore('@supports', ['@supports (display: grid) {', '  .menu { display: grid; }', '}'], [
      [1, 'Only use these rules if the browser understands display: grid. Older browsers skip the block safely.'],
      [2, 'Inside, normal rules.', '.menu'],
    ], { page: { html: '<div class="menu"><div>Tea</div><div>Toast</div></div>', css: `${BASE} @supports (display: grid) { .menu { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; } } .menu > div { background: #FFF1D6; padding: 10px; border-radius: 8px; }` }, minTaps: 2 }),
    reveal('Newer tools worth knowing', [
      ['@property', 'Registers a variable with a type (like a colour or an angle), so it can be animated smoothly.'],
      [':has()', 'Style a parent by what it contains (Module 10).'],
      ['Container queries', '@container (min-width: 400px) changes a card by the width of its box, not the screen.'],
      ['Nesting', '.card { & h2 { … } } writes child rules inside the parent rule.'],
    ], { mono: true }),
    reveal('Sass and frameworks', [
      ['Sass', 'A tool that adds extras (nesting, loops, mixins) and turns them into normal CSS. Many teams use it.', '🧰'],
      ['Frameworks', 'Ready-made styles and class names, for building fast. You still need real CSS to change or fix them.', '📦'],
      ['Learn CSS first', 'Every tool ends up as plain CSS in the browser.', '🎓'],
    ]),
    truth([
      ['Browsers skip @supports blocks they don’t support', true, 'That’s the point: safe new features.'],
      ['Sass runs in the browser', false, 'It is turned into normal CSS before the page is published.'],
      ['Container queries look at the box, not the screen', true, 'Great for reusable cards.'],
    ]),
    check('Which rule applies styles only if the browser understands them?', ['@supports', '@media', '@import', '@font-face'], '@supports tests a feature.', 'Which one tests support?', { mono: true }),
    recap([
      ['🧪', '@supports for safe new features'],
      ['📦', 'Container queries and nesting are modern CSS'],
      ['🧰', 'Sass and frameworks still produce plain CSS'],
    ]),
  ]),

  lesson('css-12-7', 'Clean, fast CSS', 6, [
    chat(['Riya’s stylesheet has grown to 600 lines. Some rules fight each other, some are never used.', 'A little order keeps CSS easy to change, and fast to load.']),
    reveal('A tidy stylesheet, top to bottom', [
      ['1. Variables', ':root with colours, fonts and spacing.'],
      ['2. Base', 'body, headings, links: the defaults.'],
      ['3. Layout', 'Header, main, grid, sidebar.'],
      ['4. Components', 'Cards, buttons, forms.'],
      ['5. States and media', 'Hover, focus, then media queries.'],
    ]),
    toggle('Shorter is clearer', [
      ['Long', ['.card {', '  margin-top: 8px; margin-right: 0;', '  margin-bottom: 8px; margin-left: 0;', '}'], 'Four lines for one idea.', { html: '<div class="card">Tea</div><div class="card">Toast</div>', css: `${BASE} .card { margin-top: 8px; margin-right: 0; margin-bottom: 8px; margin-left: 0; background: #FFF1D6; padding: 8px; }` }],
      ['Shorthand', ['.card { margin: 8px 0; }'], 'One line, same result.', { html: '<div class="card">Tea</div><div class="card">Toast</div>', css: `${BASE} .card { margin: 8px 0; background: #FFF1D6; padding: 8px; }` }],
    ]),
    reveal('Fast CSS', [
      ['Short selectors', '.price beats body div.menu > div.card p.price: easier to read and to override.', '🎯'],
      ['Remove unused rules', 'Every line is downloaded by every visitor.', '🧹'],
      ['Minify for the live site', 'Tools strip spaces and comments from the published file. Keep the readable one for editing.', '🗜'],
      ['Few fonts and pictures', 'They are the heaviest downloads.', '⚡'],
    ]),
    check('Which selector is easiest to read and to override later?', ['.price', 'body div.menu > div.card p.price', '#page #menu .card p.price', 'html body div div p'], 'Short, class-based selectors stay flexible.', 'Shorter is stronger here.'),
    tapbug('A rule that fights the rest', ['.price { color: green; }', '#menu .card .price { color: green !important; }'], [[2, '#menu .card .price', '.price']], 'The long selector plus !important does the same job and makes every later change harder. One short rule is enough.'),
    recap([
      ['🗂', 'Order: variables, base, layout, components, states'],
      ['✂️', 'Shorthands and short selectors'],
      ['⚡', 'Remove unused CSS and minify for the live site'],
    ]),
  ]),

  challenge('c-project', 'Final: the CSS Pro challenge', { icon: '📱', name: 'CSS Pro' }, ['Build pages that fit every screen', 'Theme a site with variables and dark mode', 'Style a real client page from start to finish'], [
    mcq(1, 'Which tag stops phones shrinking the page?', ['<meta name="viewport" content="width=device-width, initial-scale=1">', '<meta charset="UTF-8">', '<link rel="stylesheet">', '<meta name="phone">'], 'The viewport tag uses the device’s real width.', { mono: true }),
    mcq(2, 'Mobile first uses which kind of query to add the wide layout?', ['min-width', 'max-width', 'orientation', 'print'], 'Start small, add rules as the screen grows.', { mono: true }),
    mcq(3, 'How do you read the variable --space?', ['var(--space)', '$space', 'var(space)', '--space()'], 'var() with both dashes.', { mono: true }),
    mcq(4, 'Which keeps a video box 16:9 at any width?', ['aspect-ratio: 16 / 9', 'height: 16px', 'ratio: 16:9', 'object-fit: 16 / 9'], 'aspect-ratio keeps the shape.', { mono: true }),
    mcq(5, 'Why choose breakpoints by content, not by phone model?', ['New phones keep coming; the content is what squashes', 'CSS only knows three phones', 'It loads faster', 'Phones ignore breakpoints'], 'Change the layout where it starts to look wrong.'),
    swipe([
      ['img { max-width: 100%; } stops images bursting out', true, 'They shrink to fit.'],
      ['Dark mode needs a second stylesheet', false, 'Swapping variables in one media query is enough.'],
      ['@supports skips rules the browser can’t use', true, 'Safe new features.'],
      ['Minified CSS is the file you edit', false, 'Edit the readable one; publish the minified one.'],
    ]),
    pairs([['@media (min-width: 700px)', '700px and wider'], ['--brand: #C2410C', 'Set a variable'], ['prefers-color-scheme: dark', 'Dark mode is on'], ['aspect-ratio: 1', 'A square']], 'Responsive and modern CSS.'),
    pickCode('Which switches to two columns from 800px?', ['@media (min-width: 800px) { .wrap { display: grid; grid-template-columns: 1fr 1fr; } }', '@media (max-width: 800px) { .wrap { columns: 2; } }', '@screen 800px { .wrap { grid: 2; } }', '.wrap:800px { display: grid; }'], 'min-width for “800 and up”, then a two-column grid.'),
    bugTask([':root {', '  --brand #C2410C;', '}', '@media (min-width 700px) {', '  .wrap { display: grid; }', '}'], [[2, '--brand #C2410C;', '--brand: #C2410C;'], [4, 'min-width 700px', 'min-width: 700px']], 'Variables and media conditions both need a colon.'),
    xray(
      { html: '<header class="top">Sharma Classes</header><div class="wrap"><main>Courses</main><aside>Enquire</aside></div><img src="banner.svg" alt="Our classroom">', css: ':root{--blue:#1E3A8A;--gold:#F59E0B} body{font-family:system-ui,sans-serif;margin:10px} .top{background:var(--blue);color:white;padding:10px;border-radius:8px;position:sticky;top:0} .wrap{display:grid;grid-template-columns:2fr 1fr;gap:8px;margin:8px 0} main{background:#EFF6FF;padding:12px;border-radius:8px} aside{background:var(--gold);padding:12px;border-radius:8px} img{max-width:100%;height:auto;border-radius:8px;display:block}' },
      [
        ['.top', 'The blue from the brand colours', 'var(--blue)', ['var(--blue)', 'color: blue', '--blue()']],
        ['.wrap', 'The two side-by-side columns', 'grid-template-columns: 2fr 1fr', ['grid-template-columns: 2fr 1fr', 'float: left', 'columns: 2']],
        ['img', 'The picture that never overflows', 'max-width: 100%', ['max-width: 100%', 'width: 600px', 'overflow: hidden']],
      ],
    ),
    // The old project's four checked steps. The first one carries Mr Sharma's brief.
    ...CSS_PROJECT_V3.steps
      .filter((s): s is WebStep => s.type === 'web')
      .map((s, i) => ({ ...s, kicker: `FINAL PROJECT · STEP ${i + 1} OF 4`, instructions: i === 0 ? `${BRIEF} ${s.instructions}` : s.instructions })),
  ], 'project'),
];
