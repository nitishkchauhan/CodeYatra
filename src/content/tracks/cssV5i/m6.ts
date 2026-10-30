// CSS Intermediate · Module 6 · Responsive navigation, and the final project: your own portfolio site.
import type { Lesson, WebStep } from '../../types';
import { atWork, bugTask, challenge, check, explore, finalProject, lesson, matchUp, mcq, pairs, pickCode, recap, resize, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const NAV = '<header class="top">\n  <a class="skip" href="#main">Skip to content</a>\n  <strong>Alex Morgan</strong>\n  <button class="menu" aria-expanded="false" aria-controls="links">Menu</button>\n  <nav id="links"><a href="#work">Work</a> <a href="#about">About</a> <a href="#contact">Contact</a></nav>\n</header>\n<main id="main"><p>Projects, skills and how to reach me.</p></main>';
const NAV_CSS = `body{font-family:system-ui,sans-serif;margin:0}
.top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;background:#1F2937;color:white}
.top a{color:white}
.menu{font:inherit;padding:6px 12px;border:2px solid white;border-radius:8px;background:none;color:white}
#links{display:none;width:100%;flex-direction:column;gap:6px}
#links.open{display:flex}
.skip{position:absolute;left:-999px}
.skip:focus{left:8px;top:8px;background:white;color:#1F2937;padding:6px 10px;border-radius:8px}
main{padding:12px}
@media (min-width: 700px) {
  .menu{display:none}
  #links{display:flex;width:auto;flex-direction:row}
}`;
const MENU_JS = 'const btn = document.querySelector(".menu");\nconst links = document.querySelector("#links");\nbtn.addEventListener("click", () => {\n  const open = links.classList.toggle("open");\n  btn.setAttribute("aria-expanded", String(open));\n  console.log("Menu " + (open ? "open" : "closed"));\n});';

// ── The final project: the learner’s own portfolio, styled in four checked steps ──────────────────
const PORTFOLIO = `<header class="top">
  <a class="skip" href="#main">Skip to content</a>
  <strong>Your Name</strong>
  <nav><a href="#work">Work</a> <a href="#contact">Contact</a></nav>
</header>
<main id="main" class="page">
  <h1>Hi, I build websites</h1>
  <section id="work" class="grid">
    <article class="card"><img src="dish.svg" alt="Café menu site"><h3>Café menu</h3></article>
    <article class="card"><img src="banner.svg" alt="School website"><h3>School site</h3></article>
    <article class="card"><img src="portrait.svg" alt="Portfolio"><h3>This portfolio</h3></article>
  </section>
  <form id="contact" class="form">
    <label for="email">Email</label>
    <input id="email" type="email" required>
    <button>Send</button>
  </form>
</main>
<footer>© 2026</footer>`;
const C0 = `:root {
  --color-bg: #FFFFFF;
  --color-text: #1F2937;
  --color-brand: #4B3FD8;
}
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
}
`;
const C1 = `${C0}.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
`;
const C2 = `${C1}h1 {
  font-size: clamp(1.8rem, 5vw, 3rem);
}
.card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
`;
const C3 = `${C2}[data-theme="dark"] {
  --color-bg: #0F172A;
  --color-text: #F1F5F9;
}
`;
const C4 = `${C3}input:focus-visible {
  outline: 3px solid var(--color-brand);
}
.top {
  position: sticky;
  top: 0;
}
`;
const step = (n: number, title: string, instructions: string, starter: string, solution: string, checks: WebStep['checks'], hint: string): WebStep => ({
  ...finalProject({ title: `Step ${n} · ${title}`, instructions, starter: { html: PORTFOLIO, css: starter }, solution: { html: PORTFOLIO, css: solution }, checks, hint }),
  kicker: `FINAL PROJECT · STEP ${n} OF 4`,
});

export const CSS_I_M6: Lesson[] = [
  lesson('css-i-6-1', 'A row on laptops, a toggle on phones', 6, [
    atWork('Megan', ['Last job before your portfolio: the navigation.', 'Links in a row on laptops; on phones, a Menu button that opens them. It must work with a keyboard and a screen reader too.']),
    resize('The same nav, two shapes', 'Tap each width. Below 700px the links hide behind the Menu button.', { html: NAV, css: NAV_CSS }, 'One media query swaps the layout; the HTML is the same everywhere.'),
    tapPage('Open the menu', 'Make the preview phone-sized in your head, and tap Menu.', { html: NAV, css: NAV_CSS.replace(/@media[\s\S]*$/, ''), js: MENU_JS }, 'Menu open', [{ click: '.menu' }], 'aria-expanded tells screen readers whether the menu is open. JavaScript only switches a class; CSS does the showing.'),
    explore('The pieces', ['<button class="menu" aria-expanded="false" aria-controls="links">Menu</button>', '#links { display: none; }', '#links.open { display: flex; }', '@media (min-width: 700px) { .menu { display: none; } #links { display: flex; } }'], [
      [1, 'A real button (not a div), with aria-expanded and aria-controls for screen readers.', '.menu'],
      [3, 'The open class shows the links.'],
      [4, 'On wide screens the button hides and the links always show.'],
    ], { page: { html: NAV, css: NAV_CSS }, minTaps: 3 }),
    check('Why use a <button> for the menu, not a <div>?', ['It works with the keyboard and screen readers', 'It looks nicer', 'divs can’t have text', 'It loads faster'], 'Buttons can be focused and pressed with Enter or Space.', 'Think about keyboards.', { mono: false }),
    recap([
      ['📱', 'A Menu button on phones, a row on laptops'],
      ['🔘', 'A real <button> with aria-expanded'],
      ['🎨', 'JavaScript switches a class; CSS shows it'],
    ]),
  ]),

  lesson('css-i-6-2', 'A sticky header', 4, [
    toggle('Scroll the preview', [
      ['Normal', ['.top { }'], 'The header scrolls away with the page.', { html: `${NAV}${'<p style="padding:0 12px">More content…</p>'.repeat(12)}`, css: NAV_CSS }],
      ['Sticky', ['.top { position: sticky; top: 0; z-index: 10; }'], 'It scrolls with the page, then sticks at the top. z-index keeps it above the content.', { html: `${NAV}${'<p style="padding:0 12px">More content…</p>'.repeat(12)}`, css: `${NAV_CSS} .top{position:sticky;top:0;z-index:10}` }],
    ], 'Switch, then scroll inside the preview.'),
    reveal('Sticky header tips', [
      ['Keep it short', 'On phones a tall sticky header eats the screen.'],
      ['scroll-margin-top', 'Jump links land under the header unless targets have scroll-margin-top.'],
      ['z-index', 'Keeps it above the content that scrolls under it.'],
    ], { mono: true }),
    check('A link jumps to #about, but the heading hides under the sticky header. What helps?', ['#about { scroll-margin-top: 60px; }', 'position: fixed', 'z-index: -1', 'margin-bottom: 60px on the header'], 'scroll-margin-top leaves room above the target.', 'Margin for scrolling.'),
    tapbug('The header scrolls away', ['.top {', '  position: sticky;', '}'], [[2, 'position: sticky;', 'position: sticky; top: 0;']], 'sticky needs an offset like top: 0.'),
    truth([
      ['A sticky header needs an offset like top: 0', true, 'Otherwise it never sticks.'],
      ['A tall sticky header is fine on phones', false, 'It eats the small screen.'],
      ['scroll-margin-top stops jump targets hiding under it', true, 'It leaves room above the target.'],
    ]),
    recap([
      ['📌', 'position: sticky; top: 0'],
      ['🔝', 'z-index keeps it above content'],
      ['🎯', 'scroll-margin-top for jump links'],
    ]),
  ]),

  lesson('css-i-6-3', 'Skip links', 4, [
    reveal('Why skip links?', [
      ['The problem', 'Keyboard and screen-reader users must Tab through every nav link on every page before reaching the content.', '😩'],
      ['The fix', 'A “Skip to content” link first on the page, jumping to <main id="main">.', '⏭'],
      ['Hidden until needed', 'Off screen normally, it slides in when it gets keyboard focus.', '👀'],
    ]),
    explore('Building it', ['<a class="skip" href="#main">Skip to content</a>', '.skip { position: absolute; left: -999px; }', '.skip:focus { left: 8px; top: 8px; }'], [
      [1, 'The very first link on the page, pointing at the main content.', '.skip'],
      [2, 'Moved off screen, but still reachable (display: none would remove it for keyboards too).'],
      [3, 'When focused, it slides into view.'],
    ], { page: { html: NAV, css: `${NAV_CSS} .skip{left:8px;top:8px;background:white;color:#1F2937;padding:6px 10px;border-radius:8px}` }, minTaps: 3 }),
    matchUp('Hide it the right way', [['left: -999px', 'Off screen, still reachable'], ['display: none', 'Gone for keyboards too'], [':focus', 'When it should appear'], ['href="#main"', 'Where it jumps']], 'A skip link must stay in the Tab order.'),
    tapbug('Keyboard users never find the skip link', ['.skip { display: none; }', '.skip:focus { display: block; }'], [[1, 'display: none;', 'position: absolute; left: -999px;']], 'A display: none link can never get focus, so :focus never applies. Move it off screen instead.'),
    check('Why not hide a skip link with display: none?', ['It could never get keyboard focus', 'It would show all the time', 'It would break the page', 'Browsers don’t allow it'], 'Hidden with display: none, it is not in the Tab order at all.', 'Can a hidden element be focused?'),
    recap([
      ['⏭', 'A “Skip to content” link first on the page'],
      ['👀', 'Off screen until it gets focus'],
      ['♿', 'Saves keyboard users many Tab presses'],
    ]),
  ]),

  challenge('c-i-project', 'Final: your own portfolio site', { icon: '🏆', name: 'CSS Pro+' }, ['Lay out a full site with modern patterns', 'Build themes and components that fit anywhere', 'Make navigation and forms work for everyone'], [
    mcq(1, 'Which element should the phone Menu toggle be?', ['<button>', '<div>', '<span>', '<img>'], 'Real buttons work with keyboards.', { mono: true }),
    mcq(2, 'What does aria-expanded tell a screen reader?', ['Whether the menu is open', 'The menu’s colour', 'How many links there are', 'The page title'], 'Open or closed.'),
    mcq(3, 'Which makes a header stay at the top while scrolling?', ['position: sticky; top: 0', 'position: static', 'float: top', 'display: top'], 'Sticky with an offset.', { mono: true }),
    mcq(4, 'Where should a skip link point?', ['The main content', 'The footer', 'The logo', 'Another site'], 'Usually <main id="main">.'),
    mcq(5, 'Which hides a skip link but keeps it reachable by keyboard?', ['Moving it off screen', 'display: none', 'visibility: hidden', 'opacity: 0 with pointer-events: none'], 'Off screen, still in the Tab order.'),
    swipe([
      ['A sticky header should be very tall on phones', false, 'Keep it short.'],
      ['The same HTML can be a row or a toggle menu', true, 'CSS changes the layout.'],
      ['display: none skip links still work', false, 'They can’t get focus.'],
      ['aria-controls names the element the button opens', true, 'By its id.'],
    ]),
    pairs([['aria-expanded', 'Menu open or closed'], ['position: sticky', 'Stays in view'], ['.skip:focus', 'Show the skip link'], ['scroll-margin-top', 'Room above jump targets']], 'Navigation tools.'),
    pickCode('Which shows the links in a row from 700px up?', ['@media (min-width: 700px) { #links { display: flex; } .menu { display: none; } }', '@media (max-width: 700px) { #links { display: flex; } }', '#links:700px { display: flex; }', '@container (700px) { .menu { display: none; } }'], 'min-width for “700 and wider”.'),
    bugTask(['<div class="menu" onclick="toggle()">Menu</div>', '.top { position: sticky; }'], [[1, '<div class="menu" onclick="toggle()">Menu</div>', '<button class="menu" aria-expanded="false">Menu</button>'], [2, 'position: sticky;', 'position: sticky; top: 0;']], 'Use a real button, and sticky needs an offset.'),
    xray(
      { html: NAV, css: `${NAV_CSS} .skip{left:8px;top:48px;background:white;color:#1F2937;padding:6px 10px;border-radius:8px}` },
      [
        ['.menu', 'The Menu button', '<button aria-expanded>', ['<button aria-expanded>', '<div onclick>', '<a href>']],
        ['.skip', 'The “Skip to content” link', 'shown on :focus', ['shown on :focus', 'display: none', 'a tooltip']],
        ['.top', 'The dark bar at the top', 'a flex header', ['a flex header', 'a table', 'a float']],
      ],
    ),
    step(1, 'The layout', 'Brief from Megan: “Every new person at Brightline builds their own portfolio first: it’s what you send with internship applications.” Make the projects a grid that needs no media queries.', C0, C1, [
      { label: 'A grid of projects that fits any screen', file: 'css', pattern: /\.grid\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*repeat\(auto-(fit|fill),\s*minmax\(/ },
      { label: 'Colours come from tokens', file: 'css', pattern: /body\s*\{[^}]*var\(--color-bg\)[^}]*var\(--color-text\)/ },
    ], '.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }'),
    step(2, 'Components that fit', 'Make the heading grow smoothly, and keep every project picture the same shape without stretching.', C1, C2, [
      { label: 'A heading sized with clamp()', file: 'css', pattern: /h1\s*\{[^}]*font-size:\s*clamp\(/ },
      { label: 'Pictures keep their shape', file: 'css', pattern: /\.card img\s*\{(?=[^}]*aspect-ratio)(?=[^}]*object-fit:\s*cover)[^}]*\}/ },
    ], 'h1 { font-size: clamp(1.8rem, 5vw, 3rem); } and .card img { aspect-ratio: 16 / 9; object-fit: cover; }'),
    step(3, 'A dark theme', 'Add a dark theme that switches by redefining only the tokens.', C2, C3, [
      { label: 'A dark theme on data-theme', file: 'css', pattern: /\[data-theme="dark"\]\s*\{[^}]*--color-bg:[^}]*--color-text:/ },
    ], '[data-theme="dark"] { --color-bg: #0F172A; --color-text: #F1F5F9; }'),
    step(4, 'Focus and a sticky header', 'Give the email box a clear keyboard focus ring in the brand colour, and keep the header in view.', C3, C4, [
      { label: 'A visible keyboard focus ring', file: 'css', pattern: /input:focus-visible\s*\{[^}]*outline:/ },
      { label: 'A sticky header', file: 'css', pattern: /\.top\s*\{(?=[^}]*position:\s*sticky)(?=[^}]*top:\s*0)[^}]*\}/ },
    ], 'input:focus-visible { outline: 3px solid var(--color-brand); } and .top { position: sticky; top: 0; }'),
  ], 'project'),
];
