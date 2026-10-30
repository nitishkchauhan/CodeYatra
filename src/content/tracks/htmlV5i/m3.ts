// HTML Intermediate · Module 3 · Sites with many pages (uses the multi-page preview).
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

export const SITE_CSS = 'body{font-family:system-ui,sans-serif;margin:0 12px 12px} nav{display:flex;gap:6px;margin:8px 0} nav a{padding:6px 10px;border-radius:8px;background:#F1EFFF;color:#4B3FD8;text-decoration:none} nav a[aria-current="page"]{background:#4B3FD8;color:white} h1{font-size:22px;margin:6px 0}';
export const navFor = (current: string) =>
  `<nav>${[['index.html', 'Home'], ['admissions.html', 'Admissions'], ['fees.html', 'Fees']].map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ''}>${label}</a>`).join(' ')}</nav>`;
export const SCHOOL_PAGES = {
  'admissions.html': `${navFor('admissions.html')}<h1>Admissions</h1><p>Apply online for 2027.</p>`,
  'fees.html': `${navFor('fees.html')}<h1>Fees</h1><p>Class 1–5: ₹2,000 a month.</p>`,
};
const HOME = `${navFor('index.html')}<h1>Greenfield School</h1><p>Learning that lasts.</p>`;

export const HTML_I_M3: Lesson[] = [
  lesson('html-i-3-1', 'Relative paths and folders', 6, [
    atWork('Megan', ['Greenfield needs three pages: Home, Admissions and Fees, with photos in their own folder.', 'Let’s plan the files and link them so they work on any computer or server.']),
    reveal('Two kinds of link address', [
      ['Absolute', 'https://greenfield.example/fees.html: the full address, used for other sites.', '🌍'],
      ['Relative', 'fees.html or images/hall.jpg: a path from the current file. Used inside your own site, so it still works when the site moves.', '🧭'],
    ]),
    explore('Reading relative paths', ['<!-- this page: admissions/apply.html -->', '<a href="form.html">Form</a>', '<a href="../fees.html">Fees</a>', '<img src="../images/hall.jpg" alt="Hall">', '<a href="/index.html">Home</a>'], [
      [2, 'Same folder as this page: admissions/form.html.'],
      [3, '../ climbs up one folder first: the fees.html at the top.'],
      [4, 'Up one folder, then into images/.'],
      [5, 'A leading / starts from the very top of the site. Handy, but it breaks when the site is opened as files on a computer.'],
    ], { page: { html: '<pre style="font:13px monospace;background:#F7F6FF;padding:10px;border-radius:8px">greenfield/\n  index.html\n  fees.html\n  images/\n    hall.jpg\n  admissions/\n    apply.html   ← you are here\n    form.html</pre>' }, minTaps: 3 }),
    matchUp('From admissions/apply.html, which path?', [['form.html', 'admissions/form.html'], ['../fees.html', 'fees.html at the top'], ['../images/hall.jpg', 'The hall photo'], ['../index.html', 'The home page']], '../ goes up one folder; a plain name stays in the same folder.'),
    check('From pages/about.html, how do you link to the top-level index.html?', ['../index.html', 'index.html', 'pages/index.html', './index.html'], 'Climb up out of pages/ first.', 'Which way is up?'),
    tapbug('The photo is broken on the Fees page', ['<!-- this page: fees/index.html -->', '<img src="images/fees-chart.png" alt="Fees chart">'], [[2, 'images/fees-chart.png', '../images/fees-chart.png']], 'From inside fees/, the images folder is one level up: ../images/.'),
    recap([
      ['🧭', 'Relative paths start from the current file'],
      ['⬆️', '../ climbs up one folder'],
      ['🌍', 'Full https:// addresses for other sites'],
    ]),
  ]),

  lesson('html-i-3-2', 'Shared navigation and the current page', 5, [
    tapPage('Walk around the site', 'Tap Admissions, then Fees, then Home. The bar shows which file is open.', { html: HOME, css: SITE_CSS, pages: SCHOOL_PAGES }, 'Page: fees.html', [{ click: 'a[href="admissions.html"]' }, { click: 'a[href="fees.html"]' }], 'Each page has the same nav, so people always know how to move around.'),
    explore('Marking the current page', ['<nav>', '  <a href="index.html">Home</a>', '  <a href="admissions.html" aria-current="page">Admissions</a>', '  <a href="fees.html">Fees</a>', '</nav>'], [
      [1, 'The same <nav> goes on every page.'],
      [3, 'aria-current="page" marks where you are: screen readers say “current page”, and CSS can highlight it.', 'a[aria-current="page"]'],
    ], { page: { html: SCHOOL_PAGES['admissions.html'], css: SITE_CSS }, minTaps: 2 }),
    reveal('Why the same nav everywhere?', [
      ['Predictable', 'Links in the same place on every page, in the same order.'],
      ['One change, every page', 'Real sites build the nav once with a template or a component (the React track).'],
      ['Highlight with CSS', 'nav a[aria-current="page"] { … } styles only the current link.'],
    ], { mono: true }),
    check('What does aria-current="page" do?', ['Marks the link to the page you are on', 'Opens the link in a new tab', 'Makes the link bold', 'Hides the link'], 'Screen readers announce it, and CSS can style it.', 'Where am I?'),
    tapbug('Every link looks current', ['<a href="index.html" aria-current="page">Home</a>', '<a href="fees.html" aria-current="page">Fees</a>'], [[2, ' aria-current="page"', '']], 'Only the link to the page you are on gets aria-current. On the Home page, that is the Home link.'),
    recap([
      ['🧭', 'The same nav on every page'],
      ['📍', 'aria-current="page" marks where you are'],
      ['🎨', 'Style it with nav a[aria-current="page"]'],
    ]),
  ]),

  lesson('html-i-3-3', 'Planning a real site', 4, [
    reveal('A tidy site plan', [
      ['index.html at the top', 'Servers open index.html when someone visits the address with no file name.', '🏠'],
      ['Folders by type', 'images/, css/, js/ keep files easy to find.', '🗂'],
      ['Simple file names', 'lowercase, hyphens, no spaces: fee-structure.html, not Fee Structure.html.', '🔤'],
    ]),
    place('Link the stylesheet from a page in a folder', 'This page is admissions/apply.html; the CSS is css/site.css at the top.', [['<link rel="stylesheet" href="', { gap: 0 }, 'css/site.css">']], ['../', './', '/admissions/', 'css/'], ['../'], 'Climb out of admissions/ first, then into css/.', { preview: false }),
    truth([
      ['index.html opens by default when a folder’s address is visited', true, 'That’s why the home page is called index.html.'],
      ['Spaces in file names are fine on the web', false, 'They become %20 and break easily. Use hyphens.'],
      ['Relative links keep working when the site moves to a new address', true, 'They start from the current file.'],
    ]),
    check('Which is the best file name?', ['fee-structure.html', 'Fee Structure.html', 'FEE_STRUCTURE.HTML', 'fees page.html'], 'Lowercase with hyphens.', 'No spaces, no capitals.'),
    tapbug('The home page shows a list of files instead', ['greenfield/', '  home.html', '  fees.html'], [[2, 'home.html', 'index.html']], 'Servers open index.html when someone visits the site’s address. Name the home page index.html.'),
    recap([
      ['🏠', 'index.html is the home page'],
      ['🗂', 'Folders for images, css and js'],
      ['🔤', 'Lowercase names with hyphens'],
    ]),
  ]),

  challenge('html-i-3-ch', 'Module 3 Challenge', { icon: '🗺', name: 'Site Planner' }, ['Link pages and files with relative paths', 'Share one navigation and mark the current page', 'Plan a site’s folders and file names'], [
    mcq(1, 'From blog/post.html, what is ../index.html?', ['The index.html one folder up', 'blog/index.html', 'A broken link', 'The current page'], '../ climbs up one folder.'),
    mcq(2, 'Which link is relative?', ['images/gate.jpg', 'https://greenfield.example/images/gate.jpg', 'mailto:office@greenfield.example', 'tel:+911234567890'], 'It starts from the current file.', { mono: true }),
    mcq(3, 'Which file does a server open for a folder address?', ['index.html', 'home.html', 'main.html', 'default.htm only'], 'index.html is the default.', { mono: true }),
    mcq(4, 'What marks the link to the page you are on?', ['aria-current="page"', 'class="here"', 'rel="current"', 'target="_self"'], 'A standard attribute screen readers understand.', { mono: true }),
    mcq(5, 'Why use the same nav on every page?', ['People always know where links are', 'It loads faster', 'Search engines require it', 'It hides the URL'], 'Predictable navigation.'),
    swipe([
      ['../ goes into a folder', false, 'It goes up out of one.'],
      ['Spaces in file names cause problems', true, 'Use hyphens.'],
      ['aria-current should be on only one link', true, 'The current page.'],
      ['Relative links break when the site moves', false, 'They keep working.'],
    ]),
    pairs([['../', 'Up one folder'], ['images/', 'Into a folder'], ['index.html', 'The default page'], ['aria-current', 'The current page']], 'Site structure tools.'),
    pickCode('From pages/fees.html, which shows images/logo.png at the top level?', ['<img src="../images/logo.png" alt="Greenfield School">', '<img src="images/logo.png" alt="Greenfield School">', '<img src="pages/images/logo.png" alt="Greenfield School">', '<img src="logo.png" alt="Greenfield School">'], 'Climb up, then into images/.'),
    bugTask(['<!-- this page: admissions/apply.html -->', '<a href="Fees Page.html">Fees</a>', '<link rel="stylesheet" href="css/site.css">'], [[2, 'Fees Page.html', '../fees.html'], [3, 'css/site.css', '../css/site.css']], 'Avoid spaces in file names, and climb out of the folder first.'),
    xray(
      { html: SCHOOL_PAGES['admissions.html'], css: SITE_CSS },
      [
        ['nav', 'The links at the top', '<nav>', ['<nav>', '<header>', '<menu>']],
        ['a[aria-current="page"]', 'The highlighted link', 'aria-current="page"', ['aria-current="page"', 'target="_blank"', 'rel="next"']],
        ['h1', 'The page’s title', '<h1>', ['<h1>', '<title>', '<legend>']],
      ],
    ),
    arrange(['<nav>', '<a href="index.html">Home</a>', '<a href="admissions.html">Admissions</a>', '<a href="fees.html" aria-current="page">Fees</a>', '</nav>'], 'open the nav, Home, Admissions, then Fees marked as the current page, then close it', SITE_CSS),
  ]),
];
