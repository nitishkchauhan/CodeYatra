// HTML Intermediate · Module 4 · Telling search engines (and chat apps) what the page is.
import type { Lesson } from '../../types';
import { arrange, atWork, beforeAfter, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, truth, xray } from './kit';

const CARD_CSS = 'body{font-family:system-ui,sans-serif;margin:12px} .chat{background:#E7F7EE;border-radius:12px;padding:10px} .card{background:white;border-radius:10px;overflow:hidden;border:1px solid #ddd;margin-top:6px} .card .img{height:90px;background:url(banner.svg) center/cover} .card p{margin:6px 8px} .site{color:#666;font-size:12px} .t{font-weight:bold} .result{border:1px solid #eee;border-radius:10px;padding:8px} .result .url{color:#15803D;font-size:12px} .result .h{color:#1A0DAB;font-size:17px}';

export const HTML_I_M4: Lesson[] = [
  lesson('html-i-4-1', 'Titles, descriptions and share previews', 6, [
    atWork('Megan', ['When parents share the Greenfield link in a chat app, it shows as a bare address. No picture, no title.', 'And on search results, the description is a random line from the page. Let’s fix both.']),
    beforeAfter('Sharing the link in a chat', [['<title>index</title>'], 'No preview: just an address nobody wants to tap.', { html: '<div class="chat">greenfield.example</div>', css: CARD_CSS }], [['<title>Greenfield School · Admissions open</title>', '<meta name="description" content="…">', '<meta property="og:image" content="hall.jpg">'], 'A card with a picture, a title and a line of text. Many more taps.', { html: '<div class="chat">greenfield.example<div class="card"><div class="img"></div><p class="t">Greenfield School · Admissions open</p><p class="site">Apply online for 2027. Small classes, caring teachers.</p></div></div>', css: CARD_CSS }]),
    explore('The tags behind the card', ['<title>Greenfield School · Admissions open</title>', '<meta name="description"', '  content="Apply online for 2027. Small classes, caring teachers.">', '<meta property="og:title" content="Greenfield School">', '<meta property="og:image" content="https://greenfield.example/hall.jpg">'], [
      [1, 'The title: shown in the tab, on search results and in shares. Make each page’s title different.'],
      [2, 'The description: the line under the title in search results. About 150 characters.'],
      [4, 'Open Graph (og:) tags control the share card in chat and social apps.'],
      [5, 'og:image needs the full https:// address of a picture.'],
    ], { page: { html: '<div class="result"><div class="url">greenfield.example › admissions</div><div class="h">Greenfield School · Admissions open</div><div>Apply online for 2027. Small classes, caring teachers.</div></div>', css: CARD_CSS }, minTaps: 3 }),
    matchUp('Which tag controls it?', [['The browser tab text', '<title>'], ['The line under a search result', 'meta description'], ['The picture in a chat share', 'og:image'], ['The share card’s heading', 'og:title']], 'Each tag shapes how the page looks somewhere else.'),
    check('Where do these tags go?', ['In the <head>', 'At the end of <body>', 'In a <footer>', 'In the CSS file'], 'They describe the page, so they live in the head.', 'Not on the visible page.'),
    tapbug('The chat preview shows no picture', ['<meta property="og:image" content="hall.jpg">'], [[1, 'hall.jpg', 'https://greenfield.example/hall.jpg']], 'Chat apps fetch the picture from outside your site, so og:image needs the full address.'),
    recap([
      ['🏷', 'A different title on every page'],
      ['📝', 'A meta description for search results'],
      ['🖼', 'og: tags shape share cards (full image address)'],
    ]),
  ]),

  lesson('html-i-4-2', 'Structured data (JSON-LD)', 5, [
    reveal('Facts search engines can read', [
      ['What', 'A small block of data in a <script type="application/ld+json"> that says what the page is about.', '🧾'],
      ['Why', 'Search engines can show extra details: the school’s address, phone and opening hours.', '🔎'],
      ['Vocabulary', 'The words (School, address, telephone) come from schema.org, shared by the big search engines.', '📚'],
    ]),
    explore('A school’s data', ['<script type="application/ld+json">', '{', '  "@context": "https://schema.org",', '  "@type": "School",', '  "name": "Greenfield School",', '  "telephone": "+91 12345 67890",', '  "url": "https://greenfield.example"', '}', '</script>'], [
      [1, 'A script that holds data, not code to run.'],
      [3, 'Use the schema.org vocabulary.'],
      [4, 'What kind of thing this is: a School.'],
      [6, 'Facts about it, as key–value pairs (it’s JSON).'],
    ], { page: { html: '<div class="result"><div class="url">greenfield.example</div><div class="h">Greenfield School</div><div>📞 +91 12345 67890 · Open 8 am – 2 pm</div></div>', css: CARD_CSS }, minTaps: 3 }),
    truth([
      ['JSON-LD shows on the page for visitors', false, 'It is hidden data for search engines.'],
      ['The @type says what kind of thing the page describes', true, 'School, Product, Event…'],
      ['JSON-LD uses double quotes around keys', true, 'It is JSON.'],
    ]),
    check('Which script type holds structured data?', ['application/ld+json', 'text/javascript', 'module', 'text/json-data'], 'ld+json means linked-data JSON.', 'It ends in json.'),
    tapbug('Search engines ignore the data', ['<script type="application/ld+json">', "{ '@type': 'School', 'name': 'Greenfield School' }", '</script>'], [[2, "{ '@type': 'School', 'name': 'Greenfield School' }", '{ "@type": "School", "name": "Greenfield School" }']], 'JSON needs double quotes. Single quotes make it invalid, so it is ignored.'),
    recap([
      ['🧾', 'JSON-LD describes the page as data'],
      ['📚', 'Words come from schema.org'],
      ['🔎', 'Search engines may show richer results'],
    ]),
  ]),

  lesson('html-i-4-3', 'Canonical links, robots and sitemaps', 4, [
    reveal('Three helpers for search engines', [
      ['rel="canonical"', '<link rel="canonical" href="https://greenfield.example/fees.html">: “this is the main address of this page”, when the same page has several addresses.', '⭐'],
      ['robots.txt', 'A text file at the top of the site saying which parts crawlers may visit.', '🤖'],
      ['sitemap.xml', 'A list of every page you want found, with when it last changed.', '🗺'],
    ]),
    matchUp('Which helper?', [['The same page at two addresses', 'rel="canonical"'], ['Keep crawlers out of /admin/', 'robots.txt'], ['List every page to be found', 'sitemap.xml'], ['A page that should not be listed', '<meta name="robots" content="noindex">']], 'Each one tells search engines something different.'),
    check('Where does robots.txt live?', ['At the top of the site: /robots.txt', 'In the head of every page', 'Inside images/', 'In the CSS file'], 'Crawlers always look for it at the top.', 'One file for the whole site.'),
    tapbug('Two addresses compete in search', ['<link rel="canonical" href="fees.html?from=ad">'], [[1, 'fees.html?from=ad', 'https://greenfield.example/fees.html']], 'The canonical link should be the clean, full address of the main version.'),
    truth([
      ['robots.txt can stop people visiting a page', false, 'It only asks crawlers to stay away; anyone can still open the page.'],
      ['A canonical link helps when a page has several addresses', true, 'It names the main one.'],
      ['A sitemap lists the pages you want found', true, 'With when each last changed.'],
    ]),
    recap([
      ['⭐', 'canonical: the main address of a page'],
      ['🤖', 'robots.txt: where crawlers may go'],
      ['🗺', 'sitemap.xml: every page to be found'],
    ]),
  ]),

  challenge('html-i-4-ch', 'Module 4 Challenge', { icon: '🔎', name: 'Search Ready' }, ['Write titles, descriptions and share tags', 'Describe a page with JSON-LD', 'Use canonical links, robots.txt and sitemaps'], [
    mcq(1, 'Which tag sets the line under a search result?', ['<meta name="description">', '<title>', '<h1>', '<meta charset>'], 'The description.', { mono: true }),
    mcq(2, 'What do og: tags control?', ['Share cards in chat and social apps', 'Fonts', 'The page’s language', 'Image sizes'], 'Open Graph.'),
    mcq(3, 'What kind of data is JSON-LD?', ['Facts about the page for search engines', 'A stylesheet', 'A list of images', 'A password'], 'Hidden, structured data.'),
    mcq(4, 'What does rel="canonical" say?', ['This is the main address of this page', 'Open in a new tab', 'Load this first', 'Don’t follow this link'], 'It picks one address.'),
    mcq(5, 'Which file lists every page you want found?', ['sitemap.xml', 'robots.txt', 'index.html', 'manifest.json'], 'A sitemap.'),
    swipe([
      ['Every page should have its own title', true, 'Titles show in tabs, results and shares.'],
      ['og:image can be a short relative path', false, 'It needs the full address.'],
      ['JSON-LD is shown to visitors', false, 'It is for search engines.'],
      ['robots.txt sits at the top of the site', true, '/robots.txt'],
    ]),
    pairs([['<title>', 'Tab and result heading'], ['og:image', 'Share picture'], ['@type', 'What the page is'], ['noindex', 'Keep out of results']], 'Search and share tags.'),
    pickCode('Which share picture tag is right?', ['<meta property="og:image" content="https://greenfield.example/hall.jpg">', '<meta name="image" content="hall.jpg">', '<og:image src="hall.jpg">', '<link rel="og" href="hall.jpg">'], 'property="og:image" with a full address.'),
    bugTask(['<title>Page</title>', '<meta name="description" content="Admissions are open for 2027.">', '<link rel="canonical" href="fees.html">'], [[1, 'Page', 'Greenfield School · Admissions'], [3, 'fees.html', 'https://greenfield.example/fees.html']], 'Titles should describe the page, and canonical links use the full address.'),
    xray(
      { html: '<div class="chat">greenfield.example<div class="card"><div class="img"></div><p class="t">Greenfield School · Admissions open</p><p class="site">Apply online for 2027.</p></div></div>', css: CARD_CSS },
      [
        ['.img', 'The picture in the share card', 'og:image', ['og:image', '<img> on the page', 'favicon']],
        ['.t', 'The bold heading', 'og:title (or <title>)', ['og:title (or <title>)', '<h1>', 'alt text']],
        ['.site', 'The short line of text', 'og:description (or meta description)', ['og:description (or meta description)', 'a <p> on the page', 'JSON-LD']],
      ],
    ),
    arrange(['<head>', '<title>Greenfield School · Fees</title>', '<meta name="description" content="Fees for 2027, class by class.">', '<link rel="canonical" href="https://greenfield.example/fees.html">', '</head>'], 'open the head, the title, the description, the canonical link, then close it', CARD_CSS),
  ]),
];
