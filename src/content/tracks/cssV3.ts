// CSS, Lesson v3, Basic level, built from the owner-approved draft (project-docs/content-drafts/css-basic.md).
// Every module styles Riya’s Tiffins; the project styles the Sharma Classes page from the HTML project.
// The web checks read the CSS; tests confirm each starter fails them and each solution passes.
import { group, hook, lesson, match, mistake, pageBuild, quiz, read, scenario, tryIt } from '../dsl';
import type { Lesson, Reading, WebStep } from '../types';

const LEARN = (n: number) => `LEARN · ${n} OF 3`;
const CHECK = 'QUICK CHECK';
const OOPS = 'COMMON MISTAKE';
const BUILD = 'SEE IT BUILD';
const SHOWS = 'What you see:';
const REVIEWED = '2026-10-27';

const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: 'BUILD IT · CSS', ...o });
const mdn = (title: string, page: string): Reading => ({ title, url: `https://developer.mozilla.org/en-US/docs/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'MDN' });
const play = (title: string, instructions: string, html: string, css: string, ideas: string[]) =>
  tryIt({ kicker: 'TRY IT', title, instructions, lang: 'web', file: 'style.css', starter: html, files: { html, css }, ideas });
const mod = (id: string, title: string, learned: [string, string, string], steps: Lesson['steps'], reading: Reading[], minutes = 8): Lesson => ({
  ...lesson(id, title, 'css', learned, steps, minutes),
  level: 'basic',
  reading,
});
const lines = (s: string) => s.replace(/\n$/, '').split('\n');

// Riya’s menu page, the HTML most modules style.
const MENU = '<main class="page">\n  <h1>Today’s menu</h1>\n  <p class="price">Dal rice ₹80</p>\n  <p class="price">Poha ₹30</p>\n  <p id="offer">Free delivery above ₹300</p>\n</main>\n';
const HEADER = '<header class="top">\n  <strong>Riya’s Tiffins</strong>\n  <nav><a href="#menu">Menu</a> <a href="#order">Order</a></nav>\n</header>\n';
const DISHES = '<div class="menu">\n  <div class="dish">Dal rice ₹80</div>\n  <div class="dish">Poha ₹30</div>\n  <div class="dish">Rajma chawal ₹90</div>\n  <div class="dish">Veg pulao ₹85</div>\n  <div class="dish">Aloo paratha ₹60</div>\n  <div class="dish">Thali ₹120</div>\n</div>\n';
const BTN = '.btn {\n  background: #E8590C;\n  color: white;\n  border: 0;\n  padding: 10px 16px;\n}\n';

// 1 ─────────────────────────────────────────────
const S1 = 'body {\n  background: #FFF7ED;\n  font-family: system-ui, sans-serif;\n}\nh1 {\n  color: #C2410C;\n}\np {\n  font-size: 18px;\n}\n';
const M1 = mod('w-css-1', 'What is CSS? Your first styles', ['CSS decides how a page looks; HTML says what things are', 'A rule is a selector plus declarations: h1 { color: orange; }', 'When two rules clash, the later one wins (the cascade)'], [
  hook({ kicker: 'MODULE 1 · CSS', title: 'From plain to polished', story: 'Riya’s menu page works, but it is black text on white, like a form from 1995. Customers judge a business in seconds. Today the same page gets colours, a nicer font and room to breathe, without changing a word of the HTML.', goal: 'Write your first CSS rules and see the page change.', lang: 'css', code: ['h1 {', '  color: #C2410C;', '}'] }),
  read({ kicker: LEARN(1), title: 'What is CSS?', body: 'CSS, Cascading Style Sheets, is the language that decides how a page looks: colours, fonts, sizes, spacing and layout. HTML says what each part is; CSS says how it looks. The same HTML can look completely different with different CSS.', lang: 'css', code: ['h1 { color: #C2410C; }', 'p  { font-size: 18px; }'], anim: 'htmlTags' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Every website you use: Zomato’s red, Swiggy’s orange, Instagram’s layout, and the dark mode in your apps are all CSS. That is how one site can have a light and a dark theme from the same HTML.', anim: 'cascade' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'A rule is a selector (what to style) and declarations in braces, each property: value; with a semicolon. CSS usually lives in its own file, linked in the head with <link rel="stylesheet" href="style.css">. If two rules set the same thing, the later one wins.', lang: 'css', code: ['h1 {', '  color: #C2410C;', '  font-size: 32px;', '}'], anim: 'cascade' }),
  play('Riya’s first styles', 'Tap a value to change it and watch the page.', MENU, S1, ['Make the background dark. Is the text still readable?', 'Try font-size 24px on the paragraphs.']),
  pageBuild({ kicker: BUILD, title: 'One rule at a time', instructions: 'The HTML stays the same. Tap Next line and watch each rule restyle the page.', html: lines(MENU), css: lines(S1), steps: [
    { line: 4, note: 'body: a warm background and a cleaner font for the whole page.' },
    { line: 7, note: 'h1: the heading turns saffron. Only the h1 changes.' },
    { line: 10, note: 'p: every paragraph gets bigger. Same HTML, new look.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A missing semicolon', lang: 'css', note: SHOWS, wrong: ['h1 {', '  color: orange', '  font-size: 32px;', '}'], error: 'The heading stays black and normal size: the browser reads “orange font-size: 32px” as one broken value and drops both.', right: ['h1 {', '  color: orange;', '  font-size: 32px;', '}'], explain: 'End every declaration with a semicolon.' }),
  match({ kicker: CHECK, title: 'Name the parts', instructions: 'In h1 { color: orange; }, tap a part, then its name.', pairs: [['h1', 'selector'], ['color', 'property'], ['orange', 'value'], ['color: orange;', 'declaration'], ['h1 { color: orange; }', 'rule']], mono: true, explain: 'A rule is a selector plus declarations; each declaration is property: value;' }),
  quiz({ prompt: 'p { color: green; } then p { color: red; }. What colour are paragraphs?', options: ['Red', 'Green', 'Both, mixed', 'Black'], right: 'Right. When two rules clash equally, the later one wins.', wrong: 'The later rule wins: that is the cascade.', mono: true }),
  web({
    title: 'Style Riya’s menu',
    instructions: 'Give the body a background and a font, the h1 a colour, and the paragraphs a font-size.',
    starter: { html: MENU, css: '/* Riya’s styles */\n' },
    solution: { html: MENU, css: S1 },
    checks: [
      { label: 'The body has a background', file: 'css', pattern: /body\s*\{[^}]*background(-color)?:\s*[^;]+;/ },
      { label: 'The h1 has a colour', file: 'css', pattern: /h1\s*\{[^}]*color:\s*[^;]+;/ },
      { label: 'Paragraphs have a font-size', file: 'css', pattern: /\bp\s*\{[^}]*font-size:\s*\d+(px|rem)/ },
    ],
    hint: 'body { background: #FFF7ED; } h1 { color: #C2410C; } p { font-size: 18px; }',
  }),
], [mdn('CSS syntax', 'Learn_web_development/Core/Styling_basics/What_is_CSS'), mdn('Cascade, specificity and inheritance', 'Learn_web_development/Core/Styling_basics/Handling_conflicts')]);

// 2 ─────────────────────────────────────────────
const S2 = 'p {\n  color: #333333;\n}\n.price {\n  color: #C2410C;\n  font-weight: bold;\n}\n#offer {\n  color: #15803D;\n}\n';
const M2 = mod('c-sel-1', 'Selectors and specificity', ['Pick elements by tag, .class, #id or inside another (.menu p)', 'When rules clash, id beats class beats tag', 'Prefer classes; avoid !important'], [
  hook({ kicker: 'MODULE 2 · CSS', title: 'Point at exactly the right thing', story: 'Riya wants only the prices orange, not every paragraph, and one “Free delivery” line in green. You need ways to point at exactly the right elements.', goal: 'Choose the right selector, and know which rule wins.', lang: 'css', code: ['.price { color: #C2410C; }', '#offer { color: #15803D; }'] }),
  read({ kicker: LEARN(1), title: 'What are selectors?', body: 'A selector is the “who” of a rule. p picks every paragraph. .price picks everything with class="price". #offer picks the one element with id="offer". .menu p picks paragraphs inside .menu. h1, h2 picks both.', lang: 'css', code: ['p      { color: #333; }', '.price { color: #C2410C; }', '#offer { color: #15803D; }'], anim: 'specificity' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Every button style, every highlighted search result, the red border on a wrong form field. Big sites style thousands of elements with a few hundred classes, so one change to .btn updates every button.', anim: 'cascade' }),
  read({ kicker: LEARN(3), title: 'Which rule wins?', body: 'When rules clash, the more specific selector wins, whatever the order. Think of a score: an id is 1-0-0, a class is 0-1-0, a tag is 0-0-1. Only when scores are equal does the later rule win.', lang: 'css', code: ['p      { color: black; }   /* 0-0-1 */', '.price { color: orange; }  /* 0-1-0 */', '#offer { color: green; }   /* 1-0-0 */'], anim: 'specificity' }),
  play('Prices and offers', 'Tap a selector or a colour and see what changes.', MENU, S2, ['Why doesn’t the offer turn orange?', 'Change .price to p. What happens to the offer?']),
  pageBuild({ kicker: BUILD, title: 'Rules that aim', instructions: 'Tap Next line and watch each selector pick its elements.', html: lines(MENU), css: lines(S2), steps: [
    { line: 3, note: 'p: every paragraph turns dark grey.' },
    { line: 7, note: '.price: only the two prices turn orange and bold. Class beats tag.' },
    { line: 10, note: '#offer: the one element with that id turns green.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Forgetting the dot', lang: 'css', note: SHOWS, wrong: ['price {', '  color: #C2410C;', '}'], error: 'Nothing changes: the browser looks for a <price> tag, and there isn’t one.', right: ['.price {', '  color: #C2410C;', '}'], explain: 'A class selector starts with a dot, an id with #. And don’t reach for !important to win a fight; use a class.' }),
  group({ kicker: CHECK, title: 'Weak or strong?', instructions: 'Which selectors win most fights?', groups: ['Weaker (tag)', 'Stronger (class or id)'], items: [
    { text: 'p', group: 0 },
    { text: '.price', group: 1 },
    { text: 'h1', group: 0 },
    { text: '#offer', group: 1 },
    { text: 'li', group: 0 },
    { text: '.menu .price', group: 1 },
  ], explain: 'Tags score lowest; classes beat them; ids beat classes.' }),
  quiz({ prompt: '.price { color: orange; } then p { color: blue; }. What colour is <p class="price">?', options: ['Orange', 'Blue', 'Black', 'Both'], right: 'Right. The class is more specific, even though p comes later.', wrong: 'Specificity first: a class beats a tag, whatever the order.', mono: true }),
  web({
    title: 'Aim the colours',
    instructions: 'Make the prices orange and bold with .price, and the offer green with #offer. No !important.',
    starter: { html: MENU, css: 'p {\n  color: #333333;\n}\n' },
    solution: { html: MENU, css: S2 },
    checks: [
      { label: 'A .price rule with a colour', file: 'css', pattern: /\.price\s*\{[^}]*color:/ },
      { label: 'Prices are bold', file: 'css', pattern: /\.price\s*\{[^}]*font-weight:\s*(bold|[6-9]00)/ },
      { label: 'An #offer rule with a colour', file: 'css', pattern: /#offer\s*\{[^}]*color:/ },
      { label: 'No !important', file: 'css', pattern: /^(?![\s\S]*!important)[\s\S]+$/ },
    ],
    hint: '.price { color: #C2410C; font-weight: bold; } #offer { color: #15803D; }',
  }),
], [mdn('Basic selectors', 'Learn_web_development/Core/Styling_basics/Basic_selectors'), mdn('Specificity', 'Web/CSS/CSS_cascade/Specificity')]);

// 3 ─────────────────────────────────────────────
const S3 = 'body {\n  font-size: 1rem;\n  color: #1F2933;\n}\n.page {\n  max-width: 40rem;\n  margin: 0 auto;\n}\nh1 {\n  color: #E8590C;\n  font-size: clamp(1.75rem, 5vw, 3rem);\n}\n#offer {\n  background: rgb(232 89 12 / 15%);\n}\n';
const M3 = mod('c-units', 'Colours, units and sizes', ['Colours as hex, rgb() or hsl(), with transparency', 'px is fixed; rem follows the user’s text size; % and vw follow the space', 'max-width and clamp() keep sizes sensible on any screen'], [
  hook({ kicker: 'MODULE 3 · CSS', title: 'Right on every screen', story: 'Riya’s brand colour is a warm saffron. On her friend’s phone, with large text switched on, the page should grow with it; on a tablet it shouldn’t stretch edge to edge. Colours and sizes need to work everywhere.', goal: 'Write colours, and choose units that adapt.', lang: 'css', code: ['.page { max-width: 40rem; margin: 0 auto; }'] }),
  read({ kicker: LEARN(1), title: 'What are colours and units?', body: 'Colours can be names (orange), hex (#E8590C), rgb(232 89 12) or hsl(24 90% 48%), and can be see-through: rgb(0 0 0 / 50%). Units: px is fixed, rem follows the user’s text-size setting, % is a share of the parent, vw a share of the screen width.', lang: 'css', code: ['color: #E8590C;', 'background: rgb(232 89 12 / 15%);'], anim: 'cascade' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Every brand has exact colour codes. Phones let people set larger text, and sites sized in rem respect it. News sites cap the width of their text so lines don’t stretch across a big screen.', anim: 'imageLoad' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'max-width stops a box getting too wide, and margin: 0 auto centres it. clamp(min, preferred, max) lets a size grow with the screen but stay within limits. Every number needs a unit, except 0.', lang: 'css', code: ['.page { max-width: 40rem; margin: 0 auto; }', 'h1 { font-size: clamp(1.75rem, 5vw, 3rem); }'], anim: 'boxModel' }),
  play('Brand colours and sizes', 'Tap a colour or a size and watch the page.', MENU, S3, ['Change max-width to 20rem. What happens?', 'Make the offer background 50% instead of 15%.']),
  pageBuild({ kicker: BUILD, title: 'Sizes that adapt', instructions: 'Tap Next line and watch each rule.', html: lines(MENU), css: lines(S3), steps: [
    { line: 4, note: 'body: 1rem text, so it grows if the user sets larger text.' },
    { line: 8, note: '.page: at most 40rem wide, centred. On a wide screen the column stops growing.' },
    { line: 12, note: 'h1: the brand colour, and a size between 1.75rem and 3rem.' },
    { line: 15, note: '#offer: a see-through saffron background, 15% strong.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A number without a unit', lang: 'css', note: SHOWS, wrong: ['.page {', '  max-width: 600;', '}'], error: 'Nothing happens: the browser doesn’t know if 600 means pixels, rem or something else, so it drops the line.', right: ['.page {', '  max-width: 40rem;', '}'], explain: 'Every length needs a unit. Only 0 can go without one.' }),
  match({ kicker: CHECK, title: 'Match each unit', instructions: 'Tap a unit, then what it means.', pairs: [['px', 'a fixed size'], ['rem', 'follows the text-size setting'], ['%', 'a share of the parent'], ['vw', 'a share of the screen width'], ['#E8590C', 'a hex colour']], mono: true, explain: 'Pick the unit for how the size should behave.' }),
  quiz({ prompt: 'Which unit respects a user who has set large text on their phone?', options: ['rem', 'px', 'vw', 'cm'], right: 'Right. rem is based on the user’s chosen text size.', wrong: 'rem follows the user’s text-size setting.', mono: true }),
  web({
    title: 'A centred column',
    instructions: 'Set the body text to 1rem, make .page at most 40rem wide and centred, and give the h1 a hex colour.',
    starter: { html: MENU, css: 'body {\n  font-size: 16px;\n}\n' },
    solution: { html: MENU, css: 'body {\n  font-size: 1rem;\n}\n.page {\n  max-width: 40rem;\n  margin: 0 auto;\n}\nh1 {\n  color: #E8590C;\n}\n' },
    checks: [
      { label: 'Body text in rem', file: 'css', pattern: /body\s*\{[^}]*font-size:\s*1rem/ },
      { label: '.page has a max-width in rem', file: 'css', pattern: /\.page\s*\{[^}]*max-width:\s*\d+(\.\d+)?rem/ },
      { label: '.page is centred', file: 'css', pattern: /\.page\s*\{[^}]*margin:\s*0 auto/ },
      { label: 'The h1 has a hex colour', file: 'css', pattern: /h1\s*\{[^}]*color:\s*#[0-9a-fA-F]{3,6}\b/ },
    ],
    hint: 'body { font-size: 1rem; } .page { max-width: 40rem; margin: 0 auto; } h1 { color: #E8590C; }',
  }),
], [mdn('Values and units', 'Learn_web_development/Core/Styling_basics/Values_and_units')]);

// 4 ─────────────────────────────────────────────
const S4 = 'body {\n  font-family: "Poppins", system-ui, sans-serif;\n  line-height: 1.5;\n}\nh1 {\n  font-weight: 700;\n  letter-spacing: -0.01em;\n}\n.page {\n  max-width: 65ch;\n}\n';
const ABOUT = '<main class="page">\n  <h1>About Riya’s Tiffins</h1>\n  <p>We cook fresh home food every morning in Kothrud, Pune, and deliver it hot by 1 pm. Every tiffin has dal, rice, two rotis and a seasonal sabzi.</p>\n  <p>Order on WhatsApp by 10 am for same-day delivery.</p>\n</main>\n';
const M4 = mod('c-text-1', 'Typography', ['font-family with a fallback, like "Poppins", sans-serif', 'line-height around 1.5 and lines of about 65 characters read best', 'font-weight, letter-spacing and text-align shape the text'], [
  hook({ kicker: 'MODULE 4 · CSS', title: 'Easy to read', story: 'People read menus and fee lists on small phone screens, often in the sun. Good typography is the difference between “easy to read” and “I gave up”.', goal: 'Set fonts and spacing so text is easy to read.', lang: 'css', code: ['body {', '  font-family: "Poppins", sans-serif;', '  line-height: 1.5;', '}'] }),
  read({ kicker: LEARN(1), title: 'What is typography?', body: 'Typography is how text looks: the font (font-family), size, weight (bold), line spacing (line-height), alignment and letter spacing. Good choices make text faster to read and a page feel trustworthy.', lang: 'css', code: ['font-family: "Poppins", sans-serif;', 'font-weight: 700;'], anim: 'htmlTags' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'News apps tune line height and width for long reading. Apps like Zomato use one font family everywhere for a consistent brand. Google Fonts serves fonts to millions of sites, including Hindi ones like Mukta.', anim: 'outline' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'List fonts in order and end with a generic fallback like sans-serif, used if the others can’t load. line-height: 1.5 opens up paragraphs. max-width: 65ch keeps lines about 65 characters long. Use one or two web fonts at most: each one is a download.', lang: 'css', code: lines(S4).slice(0, 4), anim: 'outline' }),
  play('Readable text', 'Tap a font, a line-height or a weight.', ABOUT, S4, ['Try line-height 1 and then 2. Which is easiest to read?', 'Swap sans-serif for serif.']),
  pageBuild({ kicker: BUILD, title: 'Text that breathes', instructions: 'Tap Next line and watch the text change.', html: lines(ABOUT), css: lines(S4), steps: [
    { line: 3, note: 'font-family: Poppins if it is there, otherwise the system font, otherwise any sans-serif.' },
    { line: 4, note: 'line-height 1.5: the paragraph lines open up.' },
    { line: 8, note: 'h1: bold, with letters pulled slightly closer.' },
    { line: 11, note: 'max-width in ch: lines stay a comfortable length on wide screens.' },
  ] }),
  mistake({ kicker: OOPS, title: 'No fallback font', lang: 'css', note: SHOWS, wrong: ['body {', '  font-family: Poppins;', '}'], error: 'On phones without Poppins, the page falls back to the browser’s default, often an old-fashioned serif.', right: ['body {', '  font-family: "Poppins", system-ui, sans-serif;', '}'], explain: 'Always end a font list with a generic family.' }),
  group({ kicker: CHECK, title: 'Easy or hard to read?', instructions: 'Sort each choice.', groups: ['Easy to read', 'Hard to read'], items: [
    { text: 'line-height: 1.5', group: 0 },
    { text: 'Whole paragraphs in capitals', group: 1 },
    { text: '16px or larger body text', group: 0 },
    { text: '120-character lines', group: 1 },
    { text: 'One font family', group: 0 },
    { text: 'Light grey text on white', group: 1 },
  ], explain: 'Comfortable size, spacing and line length, with strong contrast.' }),
  quiz({ prompt: 'What does sans-serif do at the end of a font list?', options: ['It is the fallback if the others aren’t available', 'It makes the text bold', 'It downloads a font', 'Nothing'], right: 'Right.', wrong: 'The browser uses the first font it has; the generic family is the safety net.' }),
  web({
    title: 'Readable about page',
    instructions: 'Give the body a font list ending in a generic family and a line-height of 1.5, and make the h1 bold.',
    starter: { html: ABOUT, css: 'body {\n  font-family: Poppins;\n}\n' },
    solution: { html: ABOUT, css: 'body {\n  font-family: "Poppins", system-ui, sans-serif;\n  line-height: 1.5;\n}\nh1 {\n  font-weight: 700;\n}\n' },
    checks: [
      { label: 'A font list with a fallback', file: 'css', pattern: /font-family:[^;]*,\s*(sans-serif|serif|monospace|system-ui)\s*;/ },
      { label: 'line-height between 1.4 and 1.8', file: 'css', pattern: /body\s*\{[^}]*line-height:\s*1\.[4-8]\b/ },
      { label: 'A bold h1', file: 'css', pattern: /h1\s*\{[^}]*font-weight:\s*(bold|[6-9]00)/ },
    ],
    hint: 'font-family: "Poppins", system-ui, sans-serif; line-height: 1.5; and h1 { font-weight: 700; }',
  }),
], [mdn('Fundamental text and font styling', 'Learn_web_development/Core/Text_styling/Fundamentals')], 7);

// 5 ─────────────────────────────────────────────
const CARDS = '<div class="card">\n  <h2>Dal rice</h2>\n  <p>₹80 · serves one</p>\n</div>\n<div class="card">\n  <h2>Thali</h2>\n  <p>₹120 · dal, rice, roti, sabzi</p>\n</div>\n';
const S5 = '.card {\n  border: 2px solid #E8590C;\n  padding: 16px;\n  margin-bottom: 24px;\n}\n* {\n  box-sizing: border-box;\n}\n';
const M5 = mod('c-box-1', 'The box model', ['Every element is a box: content, padding, border, margin', 'box-sizing: border-box makes width include padding and border', 'Block boxes stack; inline boxes flow in a line'], [
  hook({ kicker: 'MODULE 5 · CSS', title: 'Everything is a box', story: 'Riya’s menu cards are squashed together and the text touches the edges. Every spacing problem on the web comes down to one idea: boxes.', goal: 'Space things out with padding, border and margin.', lang: 'css', code: ['.card {', '  padding: 16px;', '  margin-bottom: 24px;', '}'] }),
  read({ kicker: LEARN(1), title: 'What is the box model?', body: 'Every element is a rectangle with four layers: the content, padding (space inside the border), the border, and margin (space outside, pushing other boxes away).', lang: 'css', code: ['padding: 16px;', 'border: 2px solid #E8590C;', 'margin: 24px;'], anim: 'boxModel' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Cards on Flipkart, chat bubbles in WhatsApp Web and buttons everywhere are padding, border and margin. Press F12 in a desktop browser and DevTools shows this exact box diagram for any element.', anim: 'boxModel' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'Normally width means only the content, so padding and border make a box wider. box-sizing: border-box makes width include them, so a 300px card really is 300px. Block elements like div and p stack and fill the width; inline ones like a and strong flow in a line.', lang: 'css', code: ['* { box-sizing: border-box; }', '.card { width: 300px; padding: 16px; }'], anim: 'boxModel' }),
  play('Card spacing', 'Tap a padding, border or margin value.', CARDS, S5, ['Set padding to 0. What happens to the text?', 'Make margin-bottom 0. Where did the gap go?']),
  pageBuild({ kicker: BUILD, title: 'Layer by layer', instructions: 'Tap Next line and watch each layer of the box.', html: lines(CARDS), css: lines(S5), steps: [
    { line: 2, note: 'A border: you can now see each box.' },
    { line: 3, note: 'Padding: the text moves in, away from the border.' },
    { line: 5, note: 'Margin: the second card moves away from the first.' },
    { line: 8, note: 'border-box: widths now include padding and border. Here the cards fill the width either way, but fixed widths now stay exact.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A card wider than the phone', lang: 'css', note: SHOWS, wrong: ['.card {', '  width: 320px;', '  padding: 20px;', '}'], error: 'The card is 360px wide (320 + 20 + 20) and spills off a 360px phone screen with its border.', right: ['* {', '  box-sizing: border-box;', '}'], explain: 'With border-box, width includes the padding and border.' }),
  match({ kicker: CHECK, title: 'Match each layer', instructions: 'Tap a layer, then what it is.', pairs: [['content', 'the text or image'], ['padding', 'space inside the border'], ['border', 'the line around'], ['margin', 'space outside the border']], explain: 'Inside to outside: content, padding, border, margin.' }),
  quiz({ prompt: 'With box-sizing: border-box, how wide is width: 200px; padding: 20px;?', options: ['200px', '240px', '220px', '160px'], right: 'Right. The padding fits inside the 200px.', wrong: 'border-box includes padding and border in the width.', mono: true }),
  web({
    title: 'Give the cards room',
    instructions: 'Add box-sizing: border-box for everything, and give .card padding, a solid border and a bottom margin.',
    starter: { html: CARDS, css: '.card {\n  background: #FFF7ED;\n}\n' },
    solution: { html: CARDS, css: '* {\n  box-sizing: border-box;\n}\n.card {\n  background: #FFF7ED;\n  padding: 16px;\n  border: 2px solid #E8590C;\n  margin-bottom: 24px;\n}\n' },
    checks: [
      { label: 'box-sizing: border-box', file: 'css', pattern: /\*\s*\{[^}]*box-sizing:\s*border-box/ },
      { label: '.card has padding', file: 'css', pattern: /\.card\s*\{[^}]*padding:/ },
      { label: '.card has a solid border', file: 'css', pattern: /\.card\s*\{[^}]*border:\s*\d+px solid/ },
      { label: '.card has a bottom margin', file: 'css', pattern: /\.card\s*\{[^}]*margin(-bottom)?:/ },
    ],
    hint: '* { box-sizing: border-box; } then padding: 16px; border: 2px solid #E8590C; margin-bottom: 24px; in .card.',
  }),
], [mdn('The box model', 'Learn_web_development/Core/Styling_basics/Box_model')]);

// 6 ─────────────────────────────────────────────
const TOP = '.top {\n  padding: 12px;\n  background: #7C2D12;\n  color: white;\n}\n.top a {\n  color: white;\n}\n';
const S6 = '.top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  background: #7C2D12;\n  color: white;\n}\nnav {\n  display: flex;\n  gap: 1rem;\n}\n.top a {\n  color: white;\n}\n';
const M6 = mod('c-flex-1', 'Flexbox', ['display: flex on a parent lines its children up in a row (or a column)', 'justify-content spaces them along the line; align-items across it', 'gap sets the space between items; flex-wrap lets them wrap'], [
  hook({ kicker: 'MODULE 6 · CSS', title: 'Line things up', story: 'Riya wants her name on the left and her links on the right, neatly lined up, on any screen. For years this was hard. Flexbox made it a few lines.', goal: 'Line items up and space them with flexbox.', lang: 'css', code: ['.top {', '  display: flex;', '  justify-content: space-between;', '}'] }),
  read({ kicker: LEARN(1), title: 'What is flexbox?', body: 'display: flex on a parent lines up its children along a line, a row by default. You then control how they spread out along that line and how they line up across it.', lang: 'css', code: ['.top { display: flex; }'], anim: 'flexAxis' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Almost every navigation bar, button group, chat message row and card footer. Instagram’s top bar, logo on the left and icons on the right, is a flex row.', anim: 'flexAxis' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'justify-content spaces items along the line: flex-start, center, space-between. align-items lines them up across it, like center. gap sets the space between items. flex-direction: column stacks them, and flex-wrap: wrap lets them move to the next line.', lang: 'css', code: [...lines(S6).slice(0, 4), '}'], anim: 'flexAxis' }),
  play('Riya’s header', 'Tap justify-content, align-items or gap.', HEADER, S6, ['Change space-between to center.', 'Set flex-direction: column on .top.']),
  pageBuild({ kicker: BUILD, title: 'Into a row', instructions: 'Tap Next line and watch the header line up.', html: lines(HEADER), css: lines(S6), steps: [
    { line: 2, note: 'display: flex: the name and the nav sit side by side.' },
    { line: 3, note: 'space-between: the name goes left, the links go right.' },
    { line: 8, note: 'align-items: center and the colours: everything lines up in the middle of the bar.' },
    { line: 12, note: 'The nav is a flex row too, with a 1rem gap between links.' },
    { line: 15, note: 'White links on the dark bar.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Flex on the wrong element', lang: 'css', note: SHOWS, wrong: ['.top strong {', '  display: flex;', '}'], error: 'Nothing lines up: flex arranges the children of the element you put it on, and strong has only text inside.', right: ['.top {', '  display: flex;', '}'], explain: 'Put display: flex on the parent of the things you want to line up.' }),
  match({ kicker: CHECK, title: 'Match each property', instructions: 'Tap a property, then its job.', pairs: [['justify-content', 'spaces items along the line'], ['align-items', 'lines them up across it'], ['gap', 'space between items'], ['flex-wrap', 'lets items move to a new line'], ['flex-direction', 'row or column']], mono: true, explain: 'Along the line: justify. Across it: align.' }),
  quiz({ prompt: 'Name on the left, links on the right. Which property?', options: ['justify-content: space-between', 'align-items: center', 'text-align: right', 'float: right'], right: 'Right.', wrong: 'space-between pushes the first item left and the last right.', mono: true }),
  web({
    title: 'Line up the header',
    instructions: 'Make .top a flex row with the name on the left and the links on the right, centred vertically, with a gap.',
    starter: { html: HEADER, css: TOP },
    solution: { html: HEADER, css: '.top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 12px;\n  background: #7C2D12;\n  color: white;\n}\n.top a {\n  color: white;\n}\n' },
    checks: [
      { label: '.top is a flex container', file: 'css', pattern: /\.top\s*\{[^}]*display:\s*flex/ },
      { label: 'Name left, links right', file: 'css', pattern: /\.top\s*\{[^}]*justify-content:\s*space-between/ },
      { label: 'Centred vertically', file: 'css', pattern: /\.top\s*\{[^}]*align-items:\s*center/ },
      { label: 'A gap', file: 'css', pattern: /\.top\s*\{[^}]*gap:/ },
    ],
    hint: '.top { display: flex; justify-content: space-between; align-items: center; gap: 1rem; … }',
  }),
], [mdn('Flexbox', 'Learn_web_development/Core/CSS_layout/Flexbox')], 9);

// 7 ─────────────────────────────────────────────
const DISH = '.dish {\n  padding: 12px;\n  border: 1px solid #FED7AA;\n}\n';
const S7 = DISH + '.menu {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.menu {\n  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));\n}\n';
const M7 = mod('c-grid-1', 'CSS Grid', ['display: grid lays children out in rows and columns', 'repeat(3, 1fr) makes three equal columns; fr is a share of the space', 'repeat(auto-fill, minmax(8rem, 1fr)) adapts to any screen'], [
  hook({ kicker: 'MODULE 7 · CSS', title: 'Rows and columns of dishes', story: 'Riya’s menu has six dishes. On a phone they should sit two to a row; on a tablet, four or five, all the same width. Grid does this in one line.', goal: 'Lay out cards in a grid that adapts to the screen.', lang: 'css', code: ['.menu {', '  display: grid;', '  grid-template-columns: repeat(3, 1fr);', '}'] }),
  read({ kicker: LEARN(1), title: 'What is grid?', body: 'display: grid on a parent arranges its children in rows and columns. You describe the columns, and the browser places each child in the next cell.', lang: 'css', code: ['.menu { display: grid; }'], anim: 'gridTracks' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Product listings on shopping sites, photo galleries, YouTube’s video grid and dashboards. Whole page layouts, with a header, sidebar and content, are often grids too.', anim: 'gridTracks' }),
  read({ kicker: LEARN(3), title: 'How it works', body: '1fr is one share of the free space, so repeat(3, 1fr) makes three equal columns. repeat(auto-fill, minmax(8rem, 1fr)) fits as many columns of at least 8rem as there is room for, so the grid adapts without any extra rules. gap sets the space between cells.', lang: 'css', code: ['grid-template-columns: repeat(3, 1fr);', 'grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));'], anim: 'gridTracks' }),
  play('The dish grid', 'Tap the number of columns, the fr values or the minmax size.', DISHES, S7, ['Try 1fr 2fr 1fr in the first rule (and remove the second).', 'Change 8rem to 12rem.']),
  pageBuild({ kicker: BUILD, title: 'Cells fill in', instructions: 'Tap Next line and watch the grid form.', html: lines(DISHES), css: lines(S7), steps: [
    { line: 4, note: 'Each dish gets padding and a border. They still stack.' },
    { line: 6, note: 'display: grid. One column so far, so it looks the same.' },
    { line: 7, note: 'Three equal columns: the dishes fill them in order.' },
    { line: 9, note: 'A 1rem gap between cells.' },
    { line: 12, note: 'auto-fill: as many 8rem columns as fit. On a phone that is two; on a tablet, more.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Fixed-width columns', lang: 'css', note: SHOWS, wrong: ['.menu {', '  display: grid;', '  grid-template-columns: 300px 300px 300px;', '}'], error: 'On a phone the grid is 900px wide and the page scrolls sideways.', right: ['.menu {', '  display: grid;', '  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));', '}'], explain: 'Let the browser fit the columns with auto-fill and minmax.' }),
  group({ kicker: CHECK, title: 'Flexbox or grid?', instructions: 'Which fits each layout best?', groups: ['Flexbox (one line)', 'Grid (rows and columns)'], items: [
    { text: 'A nav bar', group: 0 },
    { text: 'A photo gallery', group: 1 },
    { text: 'A row of buttons', group: 0 },
    { text: 'A product listing', group: 1 },
    { text: 'Name left, links right', group: 0 },
    { text: 'A dashboard of tiles', group: 1 },
  ], explain: 'One row or column: flexbox. Rows and columns together: grid.' }),
  quiz({ prompt: 'What does repeat(3, 1fr) make?', options: ['Three equal columns', 'Three rows', 'Columns 3px wide', 'One column three times wider'], right: 'Right.', wrong: 'repeat(3, 1fr) means three columns, each one share of the space.', mono: true }),
  web({
    title: 'A grid that adapts',
    instructions: 'Make .menu a grid with auto-fill columns of at least 8rem, and a gap.',
    starter: { html: DISHES, css: DISH },
    solution: { html: DISHES, css: DISH + '.menu {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));\n  gap: 1rem;\n}\n' },
    checks: [
      { label: '.menu is a grid', file: 'css', pattern: /\.menu\s*\{[^}]*display:\s*grid/ },
      { label: 'Columns that adapt', file: 'css', pattern: /repeat\(auto-(fill|fit),\s*minmax\(/ },
      { label: 'A gap', file: 'css', pattern: /\.menu\s*\{[^}]*gap:/ },
    ],
    hint: '.menu { display: grid; grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr)); gap: 1rem; }',
  }),
], [mdn('Grids', 'Learn_web_development/Core/CSS_layout/Grids')], 9);

// 8 ─────────────────────────────────────────────
const BADGE_HTML = '<header class="top">Riya’s Tiffins</header>\n<div class="card">\n  <span class="badge">Bestseller</span>\n  <h2>Thali</h2>\n  <p>₹120 · dal, rice, roti, sabzi</p>\n</div>\n';
const POS = '.top {\n  background: #7C2D12;\n  color: white;\n  padding: 8px;\n}\n.card {\n  padding: 24px 12px 12px;\n  border: 1px solid #FED7AA;\n}\n.badge {\n  background: #C2410C;\n  color: white;\n  padding: 2px 8px;\n}\n';
const S8 = '.badge {\n  background: #C2410C;\n  color: white;\n  padding: 2px 8px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}\n.card {\n  position: relative;\n  padding: 24px 12px 12px;\n  border: 1px solid #FED7AA;\n}\n.top {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  background: #7C2D12;\n  color: white;\n  padding: 8px;\n}\n';
const M8 = mod('c-pos-1', 'Positioning and stacking', ['position: relative makes an anchor; absolute places inside it', 'fixed stays on screen; sticky sticks once you scroll to it', 'z-index decides what sits on top'], [
  hook({ kicker: 'MODULE 8 · CSS', title: 'Badges and sticky bars', story: 'Riya wants a “Bestseller” badge in the corner of one card, and her header to stay visible while customers scroll the menu. Both need positioning.', goal: 'Place a badge exactly, and keep a header on screen.', lang: 'css', code: ['.badge {', '  position: absolute;', '  top: 8px;', '  right: 8px;', '}'] }),
  read({ kicker: LEARN(1), title: 'What is positioning?', body: 'Normally boxes flow one after another. position takes control: relative nudges a box and makes it an anchor; absolute places a box exactly inside the nearest positioned parent; fixed sticks it to the screen; sticky sticks it once you scroll to it.', lang: 'css', code: ['.card  { position: relative; }', '.badge { position: absolute; top: 8px; right: 8px; }'], anim: 'boxModel' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: '“Sale” badges on product cards, the floating chat button on many shop sites (fixed), sticky table headers, the red dot on an app icon, and pop-ups that sit above the page (z-index).', anim: 'imageLoad' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'top, right, bottom and left set the position. An absolute box looks for the nearest parent with a position, so put position: relative on the card. sticky needs a top value, like top: 0. A higher z-index sits on top.', lang: 'css', code: ['.top {', '  position: sticky;', '  top: 0;', '  z-index: 10;', '}'], anim: 'boxModel' }),
  play('The bestseller badge', 'Tap top, right or a position value.', BADGE_HTML, S8, ['Remove position: relative from .card. Where does the badge go?', 'Change right: 8px to left: 8px.']),
  pageBuild({ kicker: BUILD, title: 'Into the corner', instructions: 'Tap Next line and follow the badge.', html: lines(BADGE_HTML), css: lines(S8), steps: [
    { line: 4, note: 'The badge is styled, but sits in the normal flow above the heading.' },
    { line: 7, note: 'absolute with top and right: it jumps to the corner of the whole page!' },
    { line: 10, note: '.card { position: relative }: now the badge sits in the card’s corner.' },
    { line: 13, note: 'The card’s padding and border.' },
    { line: 21, note: 'The header is sticky at the top. Scroll a long page and it stays.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A badge that flies away', lang: 'css', note: SHOWS, wrong: ['.badge {', '  position: absolute;', '  top: 8px;', '  right: 8px;', '}'], error: 'The badge lands in the corner of the whole page, not the card, because the card has no position.', right: ['.card {', '  position: relative;', '}'], explain: 'Give the parent position: relative to make it the anchor.' }),
  match({ kicker: CHECK, title: 'Match each position', instructions: 'Tap a value, then what it does.', pairs: [['relative', 'nudges, and becomes an anchor'], ['absolute', 'an exact spot inside the anchor'], ['fixed', 'stays on the screen'], ['sticky', 'sticks while you scroll'], ['z-index', 'what sits on top']], mono: true, explain: 'Use flexbox and grid for layout; positioning for the special cases.' }),
  quiz({ prompt: 'A “Chat with us” button should stay in the corner of the screen while scrolling. Which?', options: ['position: fixed', 'position: relative', 'position: static', 'float: right'], right: 'Right.', wrong: 'fixed keeps an element in the same place on the screen.', mono: true }),
  web({
    title: 'Badge and sticky header',
    instructions: 'Put the badge in the card’s top-right corner, and make the header sticky at the top.',
    starter: { html: BADGE_HTML, css: POS },
    solution: { html: BADGE_HTML, css: S8 },
    checks: [
      { label: 'The card is the anchor', file: 'css', pattern: /\.card\s*\{[^}]*position:\s*relative/ },
      { label: 'The badge is placed top-right', file: 'css', pattern: /\.badge\s*\{(?=[^}]*position:\s*absolute)(?=[^}]*top:)(?=[^}]*right:)[^}]*\}/ },
      { label: 'A sticky header', file: 'css', pattern: /\.top\s*\{(?=[^}]*position:\s*sticky)(?=[^}]*top:\s*0)[^}]*\}/ },
    ],
    hint: '.card { position: relative; } .badge { position: absolute; top: 8px; right: 8px; } .top { position: sticky; top: 0; }',
  }),
], [mdn('Positioning', 'Learn_web_development/Core/CSS_layout/Positioning')]);

// 9 ─────────────────────────────────────────────
const FEES = '<table>\n  <tr><th>Plan</th><th>Price</th></tr>\n  <tr><td>Daily</td><td>₹80</td></tr>\n  <tr><td>Weekly</td><td>₹520</td></tr>\n  <tr><td>Monthly</td><td>₹2,000</td></tr>\n</table>\n<p><label class="required">Phone</label></p>\n<button class="btn">Order now</button>\n';
const S9 = BTN + 'tr:nth-child(even) {\n  background: #FFF7ED;\n}\n.btn:hover {\n  background: #C2410C;\n}\n.btn:focus-visible {\n  outline: 3px solid #1D4ED8;\n}\n.required::after {\n  content: " *";\n  color: #B91C1C;\n}\n';
const M9 = mod('c-pseudo', 'States and decorations', [':hover, :focus-visible and :disabled style states', ':nth-child and :first-child select by position', '::before and ::after add decoration without extra HTML'], [
  hook({ kicker: 'MODULE 9 · CSS', title: 'Pages that respond', story: 'When you press a button it should feel pressed. When you Tab through a form you need to see where you are. And striped tables are easier to read. These are states and positions CSS can style.', goal: 'Style states, positions and small decorations.', lang: 'css', code: ['.btn:hover { background: #C2410C; }', 'tr:nth-child(even) { background: #FFF7ED; }'] }),
  read({ kicker: LEARN(1), title: 'What are they?', body: 'A pseudo-class, with one colon, selects an element in a state or position: :hover, :focus-visible, :disabled, :first-child, :nth-child(even). A pseudo-element, with two colons, styles a part or adds content: ::before, ::after, ::placeholder.', lang: 'css', code: ['.btn:hover { … }', '.required::after { content: " *"; }'], anim: 'specificity' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Button hover colours, the focus ring when you Tab, striped bank statements, the red star after required field labels, and a greyed-out Pay button until a form is complete.', anim: 'branch' }),
  read({ kicker: LEARN(3), title: 'How they work', body: 'Write the state after the selector, with no space: .btn:hover. :nth-child(even) picks rows 2, 4, 6; :nth-child(3n) every third. ::after needs a content value, even an empty one. Never remove the focus outline without adding a clear :focus-visible style.', lang: 'css', code: ['tr:nth-child(even) { background: #FFF7ED; }', '.btn:focus-visible { outline: 3px solid #1D4ED8; }'], anim: 'outline' }),
  play('Stripes and states', 'Tap even, odd or a colour. Tab to the button to see its focus ring.', FEES, S9, ['Change even to odd.', 'Change the ::after content to " (required)".']),
  pageBuild({ kicker: BUILD, title: 'States and stripes', instructions: 'Tap Next line and watch each rule.', html: lines(FEES), css: lines(S9), steps: [
    { line: 6, note: 'The button’s normal look.' },
    { line: 9, note: 'Every even row gets a light stripe.' },
    { line: 12, note: ':hover: a darker orange when a mouse is over it. On a phone you won’t see this one.' },
    { line: 15, note: ':focus-visible: a clear blue ring when someone reaches it with the keyboard.' },
    { line: 19, note: '::after adds a red star after the label, with no extra HTML.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Removing the focus ring', lang: 'css', note: SHOWS, wrong: [':focus {', '  outline: none;', '}'], error: 'Keyboard users can’t see where they are on the page.', right: ['.btn:focus-visible {', '  outline: 3px solid #1D4ED8;', '}'], explain: 'Style :focus-visible with a clear outline instead of hiding it.' }),
  group({ kicker: CHECK, title: 'One colon or two?', instructions: 'Sort each selector.', groups: ['Pseudo-class (state)', 'Pseudo-element (part)'], items: [
    { text: ':hover', group: 0 },
    { text: '::before', group: 1 },
    { text: ':nth-child(2)', group: 0 },
    { text: '::placeholder', group: 1 },
    { text: ':disabled', group: 0 },
    { text: '::after', group: 1 },
  ], explain: 'States and positions: one colon. Parts and added content: two.' }),
  quiz({ prompt: 'tr:nth-child(even) selects which rows?', options: ['Rows 2, 4, 6…', 'Rows 1, 3, 5…', 'Only row 2', 'Every row'], right: 'Right.', wrong: 'even means the 2nd, 4th, 6th and so on.', mono: true }),
  web({
    title: 'A friendlier fee table',
    instructions: 'Stripe the even rows, give the button a hover colour, and a visible focus outline.',
    starter: { html: FEES, css: BTN },
    solution: { html: FEES, css: BTN + 'tr:nth-child(even) {\n  background: #FFF7ED;\n}\n.btn:hover {\n  background: #C2410C;\n}\n.btn:focus-visible {\n  outline: 3px solid #1D4ED8;\n}\n' },
    checks: [
      { label: 'Striped rows with :nth-child', file: 'css', pattern: /:nth-child\([^)]+\)\s*\{/ },
      { label: 'A hover colour', file: 'css', pattern: /\.btn:hover\s*\{[^}]*background/ },
      { label: 'A visible focus outline', file: 'css', pattern: /\.btn:focus-visible\s*\{[^}]*outline:\s*\d+px/ },
    ],
    hint: 'tr:nth-child(even) { … } .btn:hover { background: … } .btn:focus-visible { outline: 3px solid #1D4ED8; }',
  }),
], [mdn('Pseudo-classes and pseudo-elements', 'Learn_web_development/Core/Styling_basics/Pseudo_classes_and_elements')]);

// 10 ────────────────────────────────────────────
const RESP_HTML = '<img src="https://placehold.co/800x300/png?text=Riya%E2%80%99s+Tiffins" alt="Riya’s Tiffins kitchen">\n' + DISHES;
const RESP_BASE = '.menu {\n  display: grid;\n  gap: 1rem;\n}\n';
const S10 = RESP_BASE + '.dish {\n  padding: 12px;\n  border: 1px solid #FED7AA;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\n@media (min-width: 40rem) {\n  .menu {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n';
const M10 = mod('c-resp-1', 'Responsive design', ['Write the phone styles first; they apply everywhere', '@media (min-width: 40rem) { … } adds rules from that width up', 'img { max-width: 100%; } keeps images inside the screen'], [
  hook({ kicker: 'MODULE 10 · CSS', title: 'One page, every screen', story: 'Most of Riya’s customers open the page on a phone; her son checks it on a laptop. One page has to look right on both.', goal: 'Make a page that adapts from phone to laptop.', lang: 'css', code: ['@media (min-width: 40rem) {', '  .menu { grid-template-columns: 1fr 1fr; }', '}'] }),
  read({ kicker: LEARN(1), title: 'What is responsive design?', body: 'Responsive design means one page that adapts to the screen. Write the styles for phones first, then use media queries to add rules from a certain width up.', lang: 'css', code: ['@media (min-width: 40rem) {', '  …', '}'], anim: 'gridTracks' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'Every modern site. Open a shopping site on a phone and a laptop: the same HTML, different layouts. Most people in India browse on phones, so phone-first is the normal way to work.', anim: 'webRequest' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'Rules outside any media query apply to every screen, so make them work on a phone. @media (min-width: 40rem) { … } adds rules only on screens at least 40rem wide. img { max-width: 100%; height: auto; } stops pictures overflowing. And the page needs the viewport tag from HTML module 12.', lang: 'css', code: lines(S10).slice(8), anim: 'gridTracks' }),
  play('Phone first', 'Tap the breakpoint or the columns. Your phone shows the narrow version.', RESP_HTML, S10, ['Change min-width to 20rem. Does the two-column layout appear on your phone now?', 'Remove max-width: 100% from img.']),
  pageBuild({ kicker: BUILD, title: 'Phone styles first', instructions: 'Tap Next line. The preview is phone-width, like most of Riya’s customers.', html: lines(RESP_HTML), css: lines(S10), steps: [
    { line: 4, note: 'Phone styles: one column with a gap.' },
    { line: 8, note: 'Each dish gets a border.' },
    { line: 12, note: 'The image shrinks to fit the screen instead of overflowing.' },
    { line: 17, note: 'From 40rem (about 640px) up: two columns. A phone is narrower, so here it stays one column; on a tablet it splits.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A fixed desktop width', lang: 'css', note: SHOWS, wrong: ['.page {', '  width: 960px;', '}'], error: 'Every phone gets a sideways scroll bar and tiny, cut-off content.', right: ['.page {', '  max-width: 60rem;', '  margin: 0 auto;', '}'], explain: 'Use fluid widths and max-width, then add layout with min-width media queries.' }),
  match({ kicker: CHECK, title: 'Match each piece', instructions: 'Tap a piece, then what it does.', pairs: [['@media (min-width: 40rem)', 'rules from 40rem wide up'], ['max-width: 100%', 'images never overflow'], ['viewport meta tag', 'the phone uses its real width'], ['mobile-first', 'phone styles are the default']], explain: 'Start small, then add.' }),
  quiz({ prompt: 'In mobile-first CSS, the rules outside any media query are for…', options: ['Every screen, starting with phones', 'Only desktops', 'Only tablets', 'Printing'], right: 'Right. Media queries then add to them for bigger screens.', wrong: 'Rules outside a media query apply everywhere, so they are the phone styles.' }),
  web({
    title: 'Two columns on bigger screens',
    instructions: 'Make images fluid, and add a media query from 40rem that gives .menu two columns.',
    starter: { html: RESP_HTML, css: RESP_BASE },
    solution: { html: RESP_HTML, css: RESP_BASE + 'img {\n  max-width: 100%;\n  height: auto;\n}\n@media (min-width: 40rem) {\n  .menu {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n' },
    checks: [
      { label: 'Fluid images', file: 'css', pattern: /img\s*\{[^}]*max-width:\s*100%/ },
      { label: 'A min-width media query', file: 'css', pattern: /@media\s*\(min-width:\s*[\d.]+(rem|px|em)\)\s*\{/ },
      { label: 'Two columns inside it', file: 'css', pattern: /@media[^{]*\{\s*\.menu\s*\{[^}]*grid-template-columns:\s*(1fr 1fr|repeat\(2,\s*1fr\))/ },
    ],
    hint: 'img { max-width: 100%; height: auto; } @media (min-width: 40rem) { .menu { grid-template-columns: 1fr 1fr; } }',
  }),
], [mdn('Responsive web design', 'Learn_web_development/Core/CSS_layout/Responsive_Design'), mdn('Using media queries', 'Web/CSS/CSS_media_queries/Using_media_queries')], 9);

// 11 ────────────────────────────────────────────
const MOTION_HTML = '<p class="offer">Free delivery above ₹300</p>\n<button class="btn">Order now</button>\n';
const MOTION_BASE = BTN + '.btn:hover {\n  transform: translateY(-2px);\n}\n';
const S11 = '.btn {\n  background: #E8590C;\n  color: white;\n  border: 0;\n  padding: 10px 16px;\n  transition: transform 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n}\n@keyframes pulse {\n  50% {\n    transform: scale(1.05);\n  }\n}\n.offer {\n  animation: pulse 2s ease-in-out infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .offer {\n    animation: none;\n  }\n}\n';
const M11 = mod('c-motion-1', 'Transitions and animations', ['transition smooths a change, like a hover', '@keyframes with animation runs a movement on its own', 'Animate transform or opacity, and respect prefers-reduced-motion'], [
  hook({ kicker: 'MODULE 11 · CSS', title: 'A little motion', story: 'A button that changes instantly feels cheap; one that eases over 0.2 seconds feels polished. A gentle pulse can draw the eye to “Free delivery”. Small motion, used well, makes a page feel alive.', goal: 'Add smooth transitions and a gentle animation.', lang: 'css', code: ['.btn {', '  transition: transform 0.2s ease;', '}'] }),
  read({ kicker: LEARN(1), title: 'What are they?', body: 'A transition smooths the change between two states, like normal and hover. An animation, defined with @keyframes, runs a movement by itself, once or on repeat.', lang: 'css', code: ['transition: transform 0.2s ease;', 'animation: pulse 2s infinite;'], anim: 'flexAxis' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'The heart that pops when you like a post, loading spinners, menus that slide open, and the grey “skeleton” boxes that shimmer while content loads.', anim: 'imageLoad' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'transition: property duration easing goes on the normal state. @keyframes name { 50% { … } } describes the steps; animation: name 2s infinite runs them. transform and opacity animate smoothly even on cheap phones. Some people get dizzy from motion, so switch it off for prefers-reduced-motion.', lang: 'css', code: lines(S11).slice(10, 15), anim: 'flexAxis' }),
  play('Motion', 'Tap the duration, easing or scale.', MOTION_HTML, S11, ['Change 2s to 0.5s. Is it still gentle?', 'Change scale(1.05) to scale(1.3).']),
  pageBuild({ kicker: BUILD, title: 'Setting things in motion', instructions: 'Tap Next line and watch the offer.', html: lines(MOTION_HTML), css: lines(S11), steps: [
    { line: 7, note: 'The button, with a 0.2s transition on transform.' },
    { line: 10, note: 'On hover it lifts 2px, smoothly. On a phone, the next steps are easier to see.' },
    { line: 15, note: '@keyframes pulse: halfway through, 5% bigger. Nothing moves yet.' },
    { line: 18, note: 'animation: the offer pulses every 2 seconds, forever.' },
    { line: 23, note: 'For people who asked for less motion, the pulse is switched off.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Animating layout properties', lang: 'css', note: SHOWS, wrong: ['@keyframes grow {', '  to { width: 300px; }', '}'], error: 'On low-end phones the movement is jerky, because the browser re-lays out the page every frame.', right: ['@keyframes grow {', '  to { transform: scale(1.2); }', '}'], explain: 'Animate transform and opacity. And always add a reduced-motion rule.' }),
  match({ kicker: CHECK, title: 'Match each piece', instructions: 'Tap a piece, then its job.', pairs: [['transition', 'smooths a change'], ['@keyframes', 'defines the steps'], ['animation', 'runs the steps'], ['prefers-reduced-motion', 'the user asked for less motion'], ['transform', 'moves or scales cheaply']], mono: true, explain: 'Gentle, short and optional.' }),
  quiz({ prompt: 'Which is smoothest to animate?', options: ['transform', 'width', 'margin', 'top'], right: 'Right. The browser can move it without re-laying out the page.', wrong: 'transform and opacity are the cheap ones.', mono: true }),
  web({
    title: 'Smooth and gentle',
    instructions: 'Add a transition to .btn, a pulse @keyframes, run it on .offer, and switch it off for reduced motion.',
    starter: { html: MOTION_HTML, css: MOTION_BASE },
    solution: { html: MOTION_HTML, css: S11 },
    checks: [
      { label: 'A transition on .btn', file: 'css', pattern: /\.btn\s*\{[^}]*transition:/ },
      { label: 'An @keyframes rule', file: 'css', pattern: /@keyframes\s+[\w-]+\s*\{/ },
      { label: 'The offer is animated', file: 'css', pattern: /\.offer\s*\{[^}]*animation:\s*[\w-]+/ },
      { label: 'Respects reduced motion', file: 'css', pattern: /@media\s*\(prefers-reduced-motion:\s*reduce\)/ },
    ],
    hint: 'transition: transform 0.2s ease; then @keyframes pulse { 50% { transform: scale(1.05); } } and .offer { animation: pulse 2s infinite; }',
  }),
], [mdn('Using CSS transitions', 'Web/CSS/CSS_transitions/Using_CSS_transitions'), mdn('prefers-reduced-motion', 'Web/CSS/@media/prefers-reduced-motion')]);

// 12 ────────────────────────────────────────────
const VARS_HTML = '<h1>Riya’s Tiffins</h1>\n<div class="card">\n  <h2>Thali</h2>\n  <p>₹120 · dal, rice, roti, sabzi</p>\n</div>\n';
const VARS_BASE = 'h1 {\n  color: #E8590C;\n}\n.card {\n  padding: 16px;\n  background: white;\n}\n';
const S12 = ':root {\n  --brand: #E8590C;\n  --space: 1rem;\n  --bg: #FFFFFF;\n  --text: #1F2933;\n}\nh1 {\n  color: var(--brand);\n}\n.card {\n  padding: var(--space);\n  background: var(--bg);\n  color: var(--text);\n  border: 2px solid var(--brand);\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --bg: #111827;\n    --text: #F9FAFB;\n  }\n}\n';
const M12 = mod('c-vars-1', 'CSS variables and tidy CSS', ['--brand: #E8590C; defines a variable; var(--brand) uses it', 'Change a variable once and every use updates, including for dark mode', 'Reusable classes and a small set of values keep CSS tidy'], [
  hook({ kicker: 'MODULE 12 · CSS', title: 'Change once, update everywhere', story: 'Riya decides to change her brand colour from saffron to green. Her stylesheet uses it in 14 places. With variables it is a one-line change, and dark mode comes almost free.', goal: 'Store your design choices in variables and switch themes.', lang: 'css', code: [':root { --brand: #E8590C; }', 'h1 { color: var(--brand); }'] }),
  read({ kicker: LEARN(1), title: 'What are CSS variables?', body: 'Custom properties, or CSS variables, store a value under a name starting with two dashes: --brand: #E8590C;. Use it anywhere with var(--brand). Change the value once and every use updates.', lang: 'css', code: [':root {', '  --brand: #E8590C;', '}'], anim: 'variable' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Every design system keeps its colours, spacing and fonts as variables, often called design tokens. Dark mode on sites like YouTube switches a set of variables, and white-label apps give each customer their own colours this way.', anim: 'cascade' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'Define variables on :root, the whole page, so every rule can use them. For dark mode, redefine just the colour variables inside @media (prefers-color-scheme: dark). Keep a small set of values, like a spacing scale, and reusable classes like .card instead of one-off styles.', lang: 'css', code: lines(S12).slice(15), anim: 'cascade' }),
  play('One brand colour', 'Tap --brand and watch everything that uses it change at once.', VARS_HTML, S12, ['Change --brand to a green like #15803D.', 'Change --space to 2rem.']),
  pageBuild({ kicker: BUILD, title: 'A tiny design system', instructions: 'Tap Next line and watch the variables at work.', html: lines(VARS_HTML), css: lines(S12), steps: [
    { line: 6, note: 'Four variables on :root. Defining them changes nothing on its own.' },
    { line: 9, note: 'The heading uses var(--brand).' },
    { line: 15, note: 'The card uses the spacing, colours and brand border.' },
    { line: 21, note: 'Dark mode: only the variables change. If your phone is in dark mode, the card turns dark.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Using a variable without var()', lang: 'css', note: SHOWS, wrong: ['h1 {', '  color: --brand;', '}'], error: 'The heading stays the default colour: --brand on its own isn’t a colour.', right: ['h1 {', '  color: var(--brand);', '}'], explain: 'Define with --name, use with var(--name).' }),
  group({ kicker: CHECK, title: 'Tidy or messy?', instructions: 'Sort each habit.', groups: ['Tidy', 'Messy'], items: [
    { text: 'One variable for the brand colour', group: 0 },
    { text: 'The same hex typed 14 times', group: 1 },
    { text: 'A spacing scale: 0.5, 1, 2rem', group: 0 },
    { text: '!important everywhere', group: 1 },
    { text: 'A reusable .card class', group: 0 },
    { text: 'Styling by long id chains', group: 1 },
  ], explain: 'Variables and reusable classes make CSS easy to change.' }),
  quiz({ prompt: 'What does var(--brand) do?', options: ['Uses the value stored in --brand', 'Creates a variable', 'Makes the colour random', 'Nothing in CSS'], right: 'Right.', wrong: 'var() reads a variable defined with --.', mono: true }),
  web({
    title: 'Theme with variables',
    instructions: 'Define --brand and --space on :root, use them on the h1 and .card, and add dark-mode values.',
    starter: { html: VARS_HTML, css: VARS_BASE },
    solution: { html: VARS_HTML, css: S12 },
    checks: [
      { label: ':root defines at least two variables', file: 'css', pattern: /:root\s*\{[^}]*--[\w-]+\s*:[^;]+;[^}]*--[\w-]+\s*:[^;]+;/ },
      { label: 'The h1 uses var(--brand)', file: 'css', pattern: /h1\s*\{[^}]*color:\s*var\(--brand\)/ },
      { label: 'The card uses a variable', file: 'css', pattern: /\.card\s*\{[^}]*var\(--/ },
      { label: 'Dark-mode values', file: 'css', pattern: /@media\s*\(prefers-color-scheme:\s*dark\)/ },
    ],
    hint: ':root { --brand: #E8590C; --space: 1rem; } h1 { color: var(--brand); } .card { padding: var(--space); } and a prefers-color-scheme: dark block.',
  }),
], [mdn('Using CSS custom properties', 'Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties'), mdn('Organizing your CSS', 'Learn_web_development/Core/Styling_basics/Organizing')]);

const REWRITTEN: Record<string, Lesson> = { 'w-css-1': M1, 'c-sel-1': M2, 'c-units': M3, 'c-text-1': M4, 'c-box-1': M5, 'c-flex-1': M6, 'c-grid-1': M7, 'c-pos-1': M8, 'c-pseudo': M9, 'c-resp-1': M10, 'c-motion-1': M11, 'c-vars-1': M12 };
/** The CSS Basic level, in module order. */
export const CSS_BASIC: Lesson[] = Object.values(REWRITTEN);

// Project ───────────────────────────────────────
const SHARMA = '<header class="top">\n  <strong>Sharma Classes</strong>\n  <nav><a href="#courses">Courses</a> <a href="#enquire">Enquire</a></nav>\n</header>\n<main class="page">\n  <div class="split">\n    <section id="about">\n      <h2>About us</h2>\n      <p>Small batches for Class 9 to 12, with a test every week.</p>\n    </section>\n    <section id="courses">\n      <h2>Courses</h2>\n      <div class="courses">\n        <div class="course">Maths, Class 10</div>\n        <div class="course">Physics, Class 12</div>\n        <div class="course">Chemistry, Class 12</div>\n      </div>\n      <table>\n        <tr><th>Course</th><th>Fee</th></tr>\n        <tr><td>Maths, Class 10</td><td>₹2,000</td></tr>\n        <tr><td>Physics, Class 12</td><td>₹2,500</td></tr>\n      </table>\n    </section>\n  </div>\n  <img src="https://placehold.co/640x320/png?text=Our+toppers" alt="Three Class 12 toppers holding their result sheets">\n  <section id="enquire">\n    <a class="btn" href="tel:+919800000000">Call to enquire</a>\n  </section>\n</main>\n';
const P1 = ':root {\n  --blue: #1E3A8A;\n  --gold: #F59E0B;\n  --text: #1F2937;\n  --bg: #FFFFFF;\n  --space: 1rem;\n}\n* {\n  box-sizing: border-box;\n}\nbody {\n  margin: 0;\n  font-family: "Poppins", system-ui, sans-serif;\n  line-height: 1.5;\n  color: var(--text);\n  background: var(--bg);\n}\nh2 {\n  color: var(--blue);\n}\n';
const P2 = P1 + '.top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space);\n  background: var(--blue);\n  color: white;\n}\n.top a {\n  color: white;\n}\n.page {\n  max-width: 60rem;\n  margin: 0 auto;\n  padding: var(--space);\n}\n.courses {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));\n  gap: var(--space);\n}\ntr:nth-child(even) {\n  background: #EFF6FF;\n}\n';
const P3 = P2 + 'img {\n  max-width: 100%;\n  height: auto;\n}\n@media (min-width: 48rem) {\n  .split {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n    gap: 2rem;\n  }\n}\n';
const P4 = P3 + '.btn {\n  display: inline-block;\n  padding: 12px 20px;\n  background: var(--gold);\n  color: #1F2937;\n  border-radius: 8px;\n  transition: transform 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n}\n.btn:focus-visible {\n  outline: 3px solid var(--blue);\n}\n.top {\n  position: sticky;\n  top: 0;\n}\n@media (prefers-reduced-motion: reduce) {\n  .btn {\n    transition: none;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --text: #F9FAFB;\n    --bg: #0F172A;\n  }\n}\n';

export const CSS_PROJECT_V3: Lesson = {
  id: 'c-project',
  title: 'Project: style Sharma Classes',
  kind: 'project',
  level: 'basic',
  minutes: 25,
  skill: 'css',
  learned: ['Styled a real page with a design system of variables', 'Laid it out phone first with flexbox and grid', 'Added accessible states, motion and dark mode'],
  reading: [mdn('CSS layout', 'Learn_web_development/Core/CSS_layout')],
  steps: [
    hook({ kicker: 'PROJECT · CSS', title: 'Sharma Classes, looking professional', story: 'You built the Sharma Classes page in the HTML project. Now it needs to look the part, on the phones most parents use. You’ll style it in four checked steps, using everything from the CSS track.', goal: 'A polished, phone-first, accessible page with a light and dark theme.', lang: 'css', code: [':root { --blue: #1E3A8A; --gold: #F59E0B; }'] }),
    scenario({ kicker: 'YOUR CLIENT', title: 'The brief', from: 'Mr Sharma · Sharma Classes, Jaipur', message: 'The page works, thank you! Now it needs to look professional. Our colours are deep blue and gold. Parents mostly open it on their phones. The enquiry button should stand out.', artifact: { kind: 'ticket', title: 'What the styles need', lines: ['Blue and gold, set once as variables', 'A neat header and a course grid on phones', 'Two columns on tablets and laptops', 'A gold button that is easy to use, light and dark'] }, task: 'Step 1: the design system, as variables, with fonts and colours for the whole page.' }),
    web({
      title: 'Step 1 · The design system',
      instructions: 'On :root, define at least 4 variables (blue, gold, text, background, spacing). Give the body a font list with a fallback, a line-height, and colours from your variables.',
      starter: { html: SHARMA, css: '/* Sharma Classes styles */\n' },
      solution: { html: SHARMA, css: P1 },
      checks: [
        { label: 'At least 4 variables on :root', file: 'css', pattern: /:root\s*\{(?:[^}]*?--[\w-]+\s*:){4}/ },
        { label: 'The body uses your variables', file: 'css', pattern: /body\s*\{[^}]*var\(--/ },
        { label: 'A font list with a fallback', file: 'css', pattern: /font-family:[^;]*,\s*(sans-serif|serif|system-ui)\s*;/ },
        { label: 'A comfortable line-height', file: 'css', pattern: /body\s*\{[^}]*line-height:\s*1\.[4-8]\b/ },
      ],
      hint: ':root { --blue: …; --gold: …; --text: …; --bg: …; } body { font-family: "Poppins", sans-serif; line-height: 1.5; color: var(--text); }',
    }),
    web({
      title: 'Step 2 · Layout, phone first',
      instructions: 'Make the header a flex row (name left, links right), give .page a max-width and centre it, make .courses a grid that adapts, and stripe the fee table.',
      starter: { html: SHARMA, css: P1 },
      solution: { html: SHARMA, css: P2 },
      checks: [
        { label: 'A flex header with space-between', file: 'css', pattern: /\.top\s*\{(?=[^}]*display:\s*flex)(?=[^}]*justify-content:\s*space-between)[^}]*\}/ },
        { label: 'A centred page with a max-width', file: 'css', pattern: /\.page\s*\{(?=[^}]*max-width:)(?=[^}]*margin:\s*0 auto)[^}]*\}/ },
        { label: 'A course grid that adapts', file: 'css', pattern: /\.courses\s*\{[^}]*repeat\(auto-(fill|fit),\s*minmax\(/ },
        { label: 'Striped fee rows', file: 'css', pattern: /tr:nth-child\([^)]+\)\s*\{/ },
      ],
      hint: '.top { display: flex; justify-content: space-between; } .page { max-width: 60rem; margin: 0 auto; } .courses { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); } tr:nth-child(even) { … }',
    }),
    web({
      title: 'Step 3 · Bigger screens and images',
      instructions: 'Make images fluid, and add a min-width media query that puts About and Courses (.split) side by side.',
      starter: { html: SHARMA, css: P2 },
      solution: { html: SHARMA, css: P3 },
      checks: [
        { label: 'Fluid images', file: 'css', pattern: /img\s*\{[^}]*max-width:\s*100%/ },
        { label: 'A min-width media query', file: 'css', pattern: /@media\s*\(min-width:\s*[\d.]+(rem|px|em)\)/ },
        { label: 'Two columns for .split inside it', file: 'css', pattern: /@media\s*\(min-width[^{]*\{\s*\.split\s*\{[^}]*grid-template-columns:/ },
      ],
      hint: 'img { max-width: 100%; height: auto; } @media (min-width: 48rem) { .split { display: grid; grid-template-columns: 1fr 2fr; } }',
    }),
    web({
      title: 'Step 4 · Polish and access',
      instructions: 'A gold .btn with a transition and a hover, a visible focus outline, a sticky header, a reduced-motion rule and dark-mode colours.',
      starter: { html: SHARMA, css: P3 },
      solution: { html: SHARMA, css: P4 },
      checks: [
        { label: 'A button with a transition', file: 'css', pattern: /\.btn\s*\{[^}]*transition:/ },
        { label: 'A hover style', file: 'css', pattern: /\.btn:hover\s*\{/ },
        { label: 'A visible focus outline', file: 'css', pattern: /\.btn:focus-visible\s*\{[^}]*outline:/ },
        { label: 'A sticky header', file: 'css', pattern: /\.top\s*\{(?=[^}]*position:\s*sticky)(?=[^}]*top:\s*0)[^}]*\}/ },
        { label: 'Reduced motion and dark mode', file: 'css', pattern: /prefers-reduced-motion:\s*reduce[\s\S]*prefers-color-scheme:\s*dark|prefers-color-scheme:\s*dark[\s\S]*prefers-reduced-motion:\s*reduce/ },
      ],
      hint: '.btn { background: var(--gold); transition: transform 0.2s ease; } .btn:hover { … } .btn:focus-visible { outline: 3px solid var(--blue); } .top { position: sticky; top: 0; } and the two @media blocks.',
    }),
  ],
};
