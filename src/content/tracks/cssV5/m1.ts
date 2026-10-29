// CSS track · Module 1 · Getting Started. Lesson 1.1 keeps the old first-module id (w-css-1).
import type { Lesson } from '../../types';
import { BASE, CAFE_CSS, MENU } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const P = '<h1>Riya’s Café</h1><p>Fresh tea all day.</p>';

export const CSS_M1: Lesson[] = [
  lesson('w-css-1', 'What is CSS?', 4, [
    chat(['Riya opened a small café in Pune and built its menu page in HTML.', 'It works, but it looks like a school notice. Let’s give it a real look, without changing a word of the HTML.'], { page: { html: MENU } }),
    beforeAfter(
      'Same HTML, new look',
      [['<h1>Riya’s Café</h1>', '<div class="card">…</div>'], 'Plain HTML: every browser shows it in black serif text on white.', { html: MENU }],
      [['h1 { color: #C2410C; }', '.card { background: white;', '  border-radius: 12px; }'], 'The same HTML with a few CSS rules: colours, fonts, space and cards.', { html: MENU, css: CAFE_CSS }],
      'Tap After. The words don’t change, only the look.',
    ),
    reveal('Two languages, two jobs', [
      ['HTML', 'The content and what it means: a heading, a price, a list.', '🧱'],
      ['CSS', 'How it looks: colours, fonts, sizes, spacing and layout.', '🎨'],
      ['Cascading Style Sheets', 'The full name. “Cascading” means many rules can apply to one element, and CSS has clear rules for which one wins.', '🌊'],
    ]),
    reveal('CSS is everywhere', [
      ['Dark mode', 'One switch, every colour changes. The page is the same; the stylesheet swaps.', '🌙'],
      ['Phone and laptop', 'The same page lays out in one column on a phone and three on a laptop.', '📱'],
      ['Brand colours', 'A shop’s colours and fonts are set once in CSS and used on every page.', '🏷'],
    ], { intro: 'Tap each card: where you meet CSS every day.' }),
    live('Set the mood', 'Tap a background for Riya’s page.', ['body { background: {{v}}; }'], ['white', '#FFF8EC', '#E7F5EA', '#1F1B2E'], { html: P, css: BASE, caption: 'On the dark one, the text is hard to read. Good CSS keeps text readable, not just pretty.' }),
    check('What does CSS decide?', ['How the page looks', 'What the page says', 'Where the page is saved'], 'Yes. HTML is the content, CSS is the look.', 'Think paint, not bricks.', { mono: false }),
    recap([
      ['🎨', 'CSS decides how a page looks'],
      ['🧱', 'HTML is the content, CSS is the style'],
      ['🌊', 'Many rules can apply; CSS decides which wins'],
    ]),
  ]),

  lesson('css-1-2', 'Your first rule', 5, [
    explore('Inside a rule', ['h1 {', '  color: tomato;', '  font-size: 32px;', '}'], [
      [1, 'h1 is the selector: it picks every <h1> on the page. The { opens the rule.', 'h1'],
      [2, 'color is the property, tomato is the value. A colon joins them and a semicolon ends the line.', 'h1'],
      [3, 'A second declaration in the same rule: the text size.', 'h1'],
      [4, 'The } closes the rule.'],
    ], { page: { html: P, css: `${BASE} h1 { color: tomato; font-size: 32px; }` }, minTaps: 3 }),
    reveal('The words to know', [
      ['Selector', 'Which elements to style, like h1 or p.'],
      ['Property', 'What to change, like color or font-size.'],
      ['Value', 'The new setting, like tomato or 32px.'],
      ['Declaration', 'One property: value; pair.'],
      ['Rule', 'A selector and its declarations inside { }.'],
    ]),
    place('Make the text green', 'Fill the gaps so every paragraph turns green.', [['p ', { gap: 0 }], ['  color', { gap: 1 }, ' green', { gap: 2 }], [{ gap: 3 }]], ['{', ':', ';', '}', '=', '('], ['{', ':', ';', '}'], 'Selector, {, property, colon, value, semicolon, }. That is every CSS rule.', { html: P, css: BASE }),
    live('One rule, many values', 'Tap a size for the heading.', ['h1 { font-size: {{v}}; }'], ['32px', '20px', '48px', '64px'], { html: P, css: BASE }),
    check('In p { color: navy; }, which part is the property?', ['color', 'p', 'navy', '{ }'], 'color is the property; navy is its value; p is the selector.', 'The property is the thing being changed.'),
    tapbug('Nothing turns blue', ['h2 {', '  color = blue;', '}'], [[2, '=', ':']], 'CSS joins a property and its value with a colon, never an equals sign.'),
    recap([
      ['🎯', 'Selector: which elements'],
      ['🔧', 'property: value; is one declaration'],
      ['📦', 'A rule wraps declarations in { }'],
    ]),
  ]),

  lesson('css-1-3', 'Three ways to add CSS', 5, [
    chat(['Riya’s site has five pages: menu, about, offers, contact and jobs.', 'If each page holds its own styles, changing one colour means editing five files. Let’s see the three places CSS can live.']),
    reveal('Three homes for CSS', [
      ['Inline', 'A style="…" attribute on one tag. Quick, but it styles only that tag.', '📍'],
      ['Internal', 'A <style> block in the page’s <head>. Styles that one page.', '📄'],
      ['External', 'A separate .css file, linked from every page. Change it once, every page updates.', '🗂'],
    ]),
    explore('Linking stylesheets', ['<head>', '  <link rel="stylesheet" href="cafe.css">', '  <link rel="stylesheet" href="offers.css">', '</head>'], [
      [2, 'rel="stylesheet" says what the file is; href says where it is.'],
      [3, 'A page can link several files. They are read from top to bottom, so when two clash, the later file wins.'],
    ], { page: { html: '<p>Two stylesheets, one page.</p>', css: BASE }, minTaps: 2 }),
    matchUp('Which is which?', [['style="color:red"', 'Inline'], ['<style> … </style>', 'Internal'], ['<link href="cafe.css">', 'External']], 'Inline sits on the tag, internal sits in the head, external is its own file.'),
    check('Riya wants all five pages to share one look. What should she use?', ['One external .css file', 'Inline styles on every tag', 'A <style> block on each page'], 'One file, linked from every page: change it once and the whole site changes.', 'Which one means editing only one place?', { mono: false }),
    truth([
      ['A page can link more than one stylesheet', true, 'They are read top to bottom.'],
      ['Inline styles are the easiest to keep tidy on a big site', false, 'They are scattered across every tag.'],
      ['<link> goes inside <head>', true, 'So the styles load before the page shows.'],
    ]),
    recap([
      ['📍', 'Inline: one tag'],
      ['📄', 'Internal: one page'],
      ['🗂', 'External: the whole site, the usual choice'],
    ]),
  ]),

  lesson('css-1-4', 'Comments and mistakes', 4, [
    reveal('Notes for people', [
      ['/* … */', 'A comment. The browser skips it; people read it.'],
      ['Label sections', '/* Menu cards */ above a group of rules helps anyone find them.'],
      ['Switch a rule off', 'Wrap a rule in /* */ to test the page without it.'],
    ], { code: ['/* Menu cards */', '.card { padding: 12px; }'], mono: true }),
    toggle('Switch a rule off', [
      ['On', ['p { color: tomato; }'], 'The rule is working.', { html: P, css: `${BASE} p { color: tomato; }` }],
      ['Off', ['/* p { color: tomato; } */'], 'Now it is a comment, so the browser skips it.', { html: P, css: BASE }],
    ]),
    reveal('When CSS has a mistake', [
      ['The page still loads', 'The browser never stops. It skips what it can’t understand and carries on.', '🙂'],
      ['A misspelt property', 'colr: red; is skipped, silently. No error message.', '🔍'],
      ['A missing semicolon', 'The next line gets glued on, and both lines are lost.', '🧩'],
    ]),
    toggle('One missing semicolon', [
      ['With ;', ['h1 {', '  color: tomato;', '  font-size: 40px;', '}'], 'Both lines work.', { html: P, css: `${BASE} h1 { color: tomato; font-size: 40px; }` }],
      ['Without ;', ['h1 {', '  color: tomato', '  font-size: 40px;', '}'], 'The browser reads “tomato font-size: 40px” as one value. That makes no sense, so both lines are dropped.', { html: P, css: `${BASE} h1 { color: tomato font-size: 40px; }` }],
    ]),
    tapbug('Two silent mistakes', ['p {', '  colr: green;', '  font-size: 18px', '  margin: 8px;', '}'], [[2, 'colr', 'color'], [3, '18px', '18px;']], 'colr isn’t a property, so it is skipped. The missing ; after 18px glues it to the margin line, so both are lost.'),
    recap([
      ['💬', '/* */ is a comment'],
      ['🙈', 'Broken CSS is skipped silently'],
      ['🔎', 'Check spelling and semicolons first'],
    ]),
  ]),

  lesson('css-1-5', 'The cascade: who wins?', 5, [
    chat(['Two rules can both try to colour the same heading.', 'CSS doesn’t panic. It has an order for deciding, and the first part is simple: the later rule wins.']),
    toggle('Two rules, one heading', [
      ['Only blue', ['h1 { color: blue; }'], 'One rule, so the heading is blue.', { html: P, css: `${BASE} h1 { color: blue; }` }],
      ['Then orange', ['h1 { color: blue; }', 'h1 { color: orange; }'], 'Both rules match. Same strength, so the one written later wins.', { html: P, css: `${BASE} h1 { color: blue; } h1 { color: orange; }` }],
      ['Different properties', ['h1 { color: blue; }', 'h1 { font-size: 40px; }'], 'No clash here: they change different things, so both apply.', { html: P, css: `${BASE} h1 { color: blue; } h1 { font-size: 40px; }` }],
    ], 'Tap each version.'),
    reveal('How the browser decides', [
      ['1. Importance', 'A rule marked !important beats normal rules. Use it rarely.'],
      ['2. Specificity', 'A more exact selector beats a general one (an id beats a class beats a tag). Module 2 goes deeper.'],
      ['3. Order', 'If they are equal, the later rule wins.'],
    ]),
    check('What colour is the paragraph?', ['red', 'green', 'both', 'black'], 'Same selector, same strength: the later rule, red, wins.', 'Read from top to bottom.', { code: ['p { color: green; }', 'p { color: red; }'] }),
    copy('Match Riya’s heading', 'Pick values until your heading matches the target.', P, `${BASE}\nh1 {\n  color: {{0}};\n  font-size: {{1}};\n}`, [
      ['color', ['black', 'teal', 'tomato'], 'tomato'],
      ['font-size', ['16px', '28px', '44px'], '44px'],
    ]),
    recap([
      ['🌊', 'Many rules can match one element'],
      ['⬇️', 'Equal rules: the later one wins'],
      ['🤝', 'Different properties never clash'],
    ]),
  ]),

  challenge('css-1-ch', 'Module 1 Challenge', { icon: '🎨', name: 'First Style' }, ['Explain what CSS does next to HTML', 'Write a rule with a selector and declarations', 'Add CSS to a page and predict which rule wins'], [
    mcq(1, 'What does CSS stand for?', ['Cascading Style Sheets', 'Creative Style System', 'Computer Styled Sections', 'Colourful Sheet Style'], 'Cascading Style Sheets: rules that flow down and stack.'),
    mcq(2, 'Which line is a correct CSS rule?', ['p { color: red; }', 'p ( color = red )', '<p color="red">', 'p: color { red }'], 'Selector, then { property: value; }.', { mono: true }),
    mcq(3, 'Where does a <link> to a stylesheet go?', ['Inside <head>', 'At the end of <body>', 'Inside every <p>', 'In the .css file'], 'The head, so styles load before the page shows.'),
    mcq(4, 'What happens to a rule with a misspelt property?', ['The browser skips it', 'The page stops loading', 'An error box opens', 'The whole stylesheet breaks'], 'Browsers silently skip what they can’t read.'),
    mcq(5, 'Two equal rules set different colours on h2. Which wins?', ['The one written later', 'The one written first', 'Neither', 'The darker colour'], 'Same strength, so order decides.'),
    swipe([
      ['/* */ makes a comment in CSS', true, 'The browser ignores it.'],
      ['One external file can style every page of a site', true, 'Link it from each page.'],
      ['A missing semicolon only breaks its own line', false, 'It glues the next line on, so both are lost.'],
      ['HTML decides the colours of a page', false, 'That is CSS’s job.'],
    ]),
    pairs([['h1', 'Selector'], ['color', 'Property'], ['tomato', 'Value'], ['color: tomato;', 'Declaration']], 'A rule is a selector plus declarations; each declaration is property: value;.'),
    pickCode('Which makes every paragraph 18px?', ['p { font-size: 18px; }', 'p { font size: 18px; }', 'p = { font-size: 18px }', '.p { font-size 18px; }'], 'One hyphenated property, a colon, a value, a semicolon.'),
    bugTask(['h1 {', '  color: navy', '  text-align: center;', '}', 'p {', '  font-sise: 16px;', '}'], [[2, 'navy', 'navy;'], [6, 'font-sise', 'font-size']], 'A missing semicolon and a misspelt property: both silently switch styles off.'),
    xray(
      { html: '<h1>Riya’s Café</h1><p class="tag">Fresh tea all day</p><div class="card">Lemon Tea ₹40</div>', css: 'body{font-family:system-ui,sans-serif;margin:14px} h1{color:#C2410C} .tag{font-size:20px} .card{background:#FFF1D6;padding:12px}' },
      [
        ['h1', 'The orange heading', 'color', ['color', 'font-size', 'background']],
        ['.tag', 'The bigger line of text', 'font-size', ['font-size', 'color', 'padding']],
        ['.card', 'The cream box behind Lemon Tea', 'background', ['background', 'color', 'font-size']],
      ],
    ),
    arrange(['body {\n  font-family: system-ui, sans-serif;\n}', 'h1 {\n  color: tomato;\n}', 'p {\n  color: gray;\n}'], 'the page font on body first, then a tomato heading, then grey paragraphs', 'body { margin: 14px; }', P),
  ]),
];
