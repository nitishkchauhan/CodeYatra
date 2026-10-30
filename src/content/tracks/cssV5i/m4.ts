// CSS Intermediate · Module 4 · Design tokens and themes.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

export const TOKENS = `:root {
  --color-bg: #FFFFFF;
  --color-text: #1F2937;
  --color-brand: #4B3FD8;
  --space-2: 8px;
  --space-4: 16px;
  --radius: 12px;
}
[data-theme="dark"] {
  --color-bg: #0F172A;
  --color-text: #F1F5F9;
  --color-brand: #A5B4FC;
}`;
const UI = `${TOKENS}
body { font-family: system-ui, sans-serif; margin: 0; padding: var(--space-4); background: var(--color-bg); color: var(--color-text); }
.card { border: 2px solid var(--color-brand); border-radius: var(--radius); padding: var(--space-4); }
.card h3 { margin: 0 0 var(--space-2); color: var(--color-brand); }
button { font: inherit; padding: var(--space-2) var(--space-4); border: 0; border-radius: var(--radius); background: var(--color-brand); color: var(--color-bg); }`;
const CARD = '<div class="card"><h3>Rosa’s Café site</h3><p>A menu page that works on every phone.</p></div>';

export const CSS_I_M4: Lesson[] = [
  lesson('css-i-4-1', 'Design tokens', 5, [
    atWork('Arden', ['Our colours, spaces and corners are typed by hand in 40 places. I changed the brand purple and half the site didn’t follow.', 'Let’s set them up as design tokens: named values, defined once.']),
    explore('Tokens are named decisions', TOKENS.split('\n').slice(0, 8), [
      [2, 'Name tokens by their job (bg, text, brand), not their colour, so a theme can change the colour without renaming.'],
      [5, 'Spacing on a scale: 8, 16, 24…, so gaps look consistent.'],
      [7, 'One radius for the whole design.'],
    ], { page: { html: CARD, css: UI }, minTaps: 3 }),
    live('Rebrand in one place', 'Change only the brand token.', [':root { --color-brand: {{v}}; }'], ['#4B3FD8', '#C2410C', '#15803D', '#BE185D'], { html: `${CARD}<p><button>Contact me</button></p>`, css: UI, caption: 'Every border, heading and button follows, because they all read the token.' }),
    matchUp('Good token names', [['--color-brand', 'The main brand colour'], ['--color-text', 'Normal text'], ['--space-4', 'A step on the spacing scale'], ['--radius', 'Corner roundness']], 'Name by job, not by look (not --purple).'),
    check('Why name a token --color-brand instead of --purple?', ['A theme can change its colour without renaming it', 'Purple is not allowed', 'It is shorter', 'Browsers need it'], 'In dark mode the brand might be a lighter purple, or not purple at all.', 'Think about themes.', { mono: false }),
    recap([
      ['🎨', 'Tokens: named values defined once'],
      ['🏷', 'Name them by job, not by look'],
      ['📏', 'Spacing on a scale'],
    ]),
  ]),

  lesson('css-i-4-2', 'Light and dark themes', 5, [
    tapPage('Switch the theme', 'Tap the button to switch themes.', { html: `${CARD}\n<p><button id="t">Dark theme</button></p>`, css: UI, js: 'const btn = document.querySelector("#t");\nbtn.addEventListener("click", () => {\n  const dark = document.documentElement.dataset.theme !== "dark";\n  document.documentElement.dataset.theme = dark ? "dark" : "light";\n  btn.textContent = dark ? "Light theme" : "Dark theme";\n  console.log("Theme: " + (dark ? "dark" : "light"));\n});' }, 'Theme: dark', [{ click: '#t' }], 'One attribute on <html> swaps every token at once. The components never change.'),
    explore('How the switch works', ['[data-theme="dark"] {', '  --color-bg: #0F172A;', '  --color-text: #F1F5F9;', '}', 'document.documentElement.dataset.theme = "dark";'], [
      [1, 'When <html data-theme="dark">, these token values win.'],
      [2, 'Only the tokens change. No component rule is touched.'],
      [5, 'JavaScript (or a saved setting) sets the attribute.'],
    ], { page: { html: CARD, css: UI }, minTaps: 3 }),
    reveal('Follow the phone’s setting too', [
      ['prefers-color-scheme', '@media (prefers-color-scheme: dark) { :root { … } } uses the phone’s dark mode by default.'],
      ['Let people choose', 'A button that sets data-theme overrides it, and localStorage remembers the choice (JavaScript track).'],
      ['color-scheme: light dark', 'Lets the browser darken its own parts: scrollbars and form fields.'],
    ], { mono: true }),
    tapbug('The dark theme never applies', ['[data-theme=dark] {', '  --color-bg: #0F172A;', '}', '<html data-mode="dark">'], [[4, 'data-mode', 'data-theme']], 'The attribute in the HTML must match the one the CSS looks for: data-theme.'),
    check('Where does data-theme="dark" usually go?', ['On <html>', 'On every element', 'In <head>', 'In the CSS file'], 'On the root, so every token below it changes.', 'At the very top of the page.'),
    recap([
      ['🌗', '[data-theme="dark"] redefines the tokens'],
      ['🧩', 'Components only read tokens'],
      ['📱', 'prefers-color-scheme for the default'],
    ]),
  ]),

  lesson('css-i-4-3', 'Who wins: @layer', 5, [
    reveal('Cascade layers', [
      ['The problem', 'A reset, a library and your own styles all fight. Winning by longer selectors or !important gets messy.', '🥊'],
      ['@layer', 'Name layers in order: @layer reset, base, components, utilities; Later layers win, whatever the selector.', '🧅'],
      ['Unlayered styles', 'Styles outside any layer beat all layers.', '⭐'],
    ], { mono: true }),
    toggle('Order beats specificity', [
      ['No layers', ['#app .card h3 { color: gray; }', 'h3 { color: purple; }'], 'The long selector wins: grey, even though purple was written later.', { html: '<div id="app"><div class="card"><h3>Project</h3></div></div>', css: '#app .card h3{color:gray} h3{color:purple} body{font-family:system-ui,sans-serif}' }],
      ['With layers', ['@layer base, components;', '@layer base { #app .card h3 { color: gray; } }', '@layer components { h3 { color: purple; } }'], 'components is a later layer, so it wins, however long the base selector is.', { html: '<div id="app"><div class="card"><h3>Project</h3></div></div>', css: '@layer base, components; @layer base{#app .card h3{color:gray}} @layer components{h3{color:purple}} body{font-family:system-ui,sans-serif}' }],
    ]),
    check('In @layer reset, base, components; which layer wins a clash?', ['components', 'reset', 'base', 'The longest selector'], 'Later layers win.', 'Last in the list.'),
    tapbug('The utility class loses', ['@layer utilities, components;', '@layer utilities { .hidden { display: none; } }', '@layer components { .card { display: grid; } }'], [[1, 'utilities, components', 'components, utilities']], 'Utilities should win, so their layer must come last in the order.'),
    truth([
      ['A later layer beats an earlier one, whatever the selector', true, 'That is the point of layers.'],
      ['!important is the best way to win a clash', false, 'Layers keep the order clear without it.'],
      ['Styles outside any layer beat layered styles', true, 'Unlayered wins.'],
    ]),
    recap([
      ['🧅', '@layer sets the order of style groups'],
      ['🏁', 'Later layers win, whatever the selector'],
      ['⭐', 'Unlayered styles beat every layer'],
    ]),
  ]),

  challenge('css-i-4-ch', 'Module 4 Challenge', { icon: '🎨', name: 'Theme Builder' }, ['Organise variables into design tokens', 'Switch light and dark themes with data-theme', 'Control which rules win with @layer'], [
    mcq(1, 'What is a design token?', ['A named design value, defined once', 'A password', 'A CSS file', 'A font'], 'Like --color-brand.'),
    mcq(2, 'Which name is best for a token?', ['--color-brand', '--purple', '--x1', '--myColor2'], 'By job, not look.', { mono: true }),
    mcq(3, 'What does [data-theme="dark"] select?', ['An element with data-theme="dark"', 'Dark-coloured elements', 'The phone’s dark mode', 'All elements'], 'An attribute selector.'),
    mcq(4, 'In @layer a, b; which wins?', ['b', 'a', 'The more specific selector', 'Neither'], 'Later layers win.', { mono: true }),
    mcq(5, 'Which follows the phone’s dark mode by default?', ['@media (prefers-color-scheme: dark)', '[data-theme="dark"]', '@layer dark', ':root:dark'], 'A media query reads the setting.', { mono: true }),
    swipe([
      ['Components should read tokens, not raw colours', true, 'So themes can change them.'],
      ['A dark theme needs a second set of components', false, 'Only the tokens change.'],
      ['Styles outside any layer beat layered styles', true, 'Unlayered wins.'],
      ['@layer order doesn’t matter', false, 'Later layers win.'],
    ]),
    pairs([['--space-4', 'A spacing step'], ['data-theme', 'Which theme is on'], ['@layer', 'Order of style groups'], ['color-scheme', 'Dark browser parts']], 'Theme tools.'),
    pickCode('Which defines the dark theme’s background?', ['[data-theme="dark"] { --color-bg: #0F172A; }', '.dark { background: #0F172A; }', '@dark { --bg: #0F172A; }', ':root { --dark-bg: #0F172A; }'], 'Redefine the same token under the theme attribute.'),
    bugTask(['.card { border-color: #4B3FD8; }', 'h3 { color: var(--colour-brand); }'], [[1, '#4B3FD8', 'var(--color-brand)'], [2, '--colour-brand', '--color-brand']], 'Use the token instead of a raw colour, and spell the token’s name exactly.'),
    xray(
      { html: `${CARD}<p><button>Contact me</button></p>`, css: UI },
      [
        ['.card', 'The purple border', 'var(--color-brand)', ['var(--color-brand)', '#purple', 'border: brand']],
        ['button', 'The rounded button', 'var(--radius)', ['var(--radius)', 'border-radius: 50%', '@layer']],
        ['h3', 'The heading colour', 'var(--color-brand)', ['var(--color-brand)', 'var(--color-text)', 'currentColor only']],
      ],
    ),
    arrange([':root {\n  --color-brand: #4B3FD8;\n}', '[data-theme="dark"] {\n  --color-brand: #A5B4FC;\n}', '.card {\n  border-color: var(--color-brand);\n}'], 'the light token first, then the dark theme’s value, then a component that reads it', 'body{font-family:system-ui,sans-serif;margin:12px} .card{border:3px solid;border-radius:12px;padding:12px}', CARD),
  ]),
];
