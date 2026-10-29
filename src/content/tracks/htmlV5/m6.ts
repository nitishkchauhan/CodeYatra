// HTML track · Module 6 · Page Building.
import type { Lesson } from '../../types';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pic, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const LAYOUT_CSS = 'header,nav,main,article,aside,footer,section{display:block;border-radius:8px;padding:6px 10px;margin:4px 0;font:14px sans-serif} header{background:#4B3FD8;color:#fff} nav{background:#E4E1F5} main{background:#FFF7E8} article{background:#fff;border:1px solid #ddd} aside{background:#E3F8F4} footer{background:#16142B;color:#fff}';

export const HTML_M6: Lesson[] = [
  lesson('h-head-1', 'The head section', 4, [
    chat(['The head is the backstage of a page.', 'Visitors don’t see it, but browsers and search engines read it first.']),
    reveal('What goes in the head', [
      ['<title>', 'The tab name.'],
      ['<meta>', 'Information about the page.'],
      ['<link>', 'CSS files and the favicon.'],
      ['<style>', 'Internal CSS.'],
      ['<script>', 'JavaScript.'],
      ['<base>', 'A starting address for every relative link on the page.'],
    ], { mono: true }),
    explore('Meta tags', ['<meta charset="UTF-8">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="description" content="Free HTML lessons">', '<meta name="author" content="Yatri">'], [
      [1, 'charset sets the character set. UTF-8 shows almost every language, ₹ and emojis.'],
      [2, 'viewport makes the page fit phone screens.'],
      [3, 'description is the summary search engines may show under your title.'],
      [4, 'author says who wrote the page.'],
    ], { page: { html: '<p>Meta tags change nothing you can see here: they tell browsers and search engines about the page.</p>' } }),
    beforeAfter('The viewport tag', [['<head>', '  <title>Shop</title>', '</head>'], 'Without it, a phone draws the page for a big screen and shrinks it: tiny text you have to pinch.', { html: '<div style="width:980px;font-size:12px"><h1>Happy Feet Shoes</h1><p>Fresh styles every week.</p></div>', css: 'body{zoom:0.38}' }], [['<head>', '  <meta name="viewport" content="width=device-width, initial-scale=1.0">', '</head>'], 'With it, the page fits the phone and text is readable.', { html: '<h1>Happy Feet Shoes</h1><p>Fresh styles every week.</p>' }]),
    place('Look good in search', 'Put a title and a description into the head.', [['<head>'], ['  ', { gap: 0 }], ['  ', { gap: 1 }], ['</head>']], ['<title>Free HTML Lessons</title>', '<meta name="description" content="Learn HTML on your phone.">', '<h1>Free HTML Lessons</h1>'], ['<title>Free HTML Lessons</title>', '<meta name="description" content="Learn HTML on your phone.">'], 'In search results, the title shows in blue and the description below it.', { preview: false }),
    tapbug('Information in the wrong room', ['<body>', '  <meta charset="UTF-8">', '  <h1>Hello</h1>', '</body>'], [[2, '<meta charset="UTF-8">', '']], 'Meta tags belong in the head, not the body.'),
    recap([
      ['🎭', 'The head is backstage information'],
      ['🔤', 'charset="UTF-8" for every character'],
      ['📱', 'viewport for phones; description for search results'],
    ]),
  ]),

  lesson('h-sem-1', 'Semantic layout', 4, [
    beforeAfter('Boxes with names', [['<div>…</div>', '<div>…</div>', '<div>…</div>'], 'All divs: people and machines can’t tell the parts apart.', { html: '<div>Logo</div><div>Menu</div><div>Story</div><div>Contact</div>', css: 'div{background:#eee;margin:4px 0;padding:8px;border-radius:8px;font:14px sans-serif}' }], [['<header>…</header>', '<nav>…</nav>', '<main>…</main>', '<footer>…</footer>'], 'Semantic elements say what each part is. Both people and machines understand them better.', { html: '<header>Logo</header><nav>Menu</nav><main>Story</main><footer>Contact</footer>', css: LAYOUT_CSS }], undefined, ['All divs', 'Semantic']),
    reveal('The parts of a page', [
      ['<header>', 'The top: logo and title.'],
      ['<nav>', 'The main navigation links.'],
      ['<main>', 'The main content. Only one per page.'],
      ['<section>', 'A group of content on one theme.'],
      ['<article>', 'Something that makes sense on its own, like a news story.'],
      ['<aside>', 'Side content, like related links.'],
      ['<footer>', 'The bottom: copyright and contacts.'],
    ], { mono: true }),
    place('Build a news site', 'Tap the parts in order, top to bottom.', [[{ gap: 0 }], [{ gap: 1 }], [{ gap: 2 }], [{ gap: 3 }]], ['<header>Yatri Times</header>', '<nav>Home · Sport · Tech</nav>', '<main>Today’s top story</main>', '<footer>© 2026 Yatri Times</footer>', '<aside>Yatri Times</aside>'], ['<header>Yatri Times</header>', '<nav>Home · Sport · Tech</nav>', '<main>Today’s top story</main>', '<footer>© 2026 Yatri Times</footer>'], 'header, nav, main, footer: the page reads like a map of itself.', { css: LAYOUT_CSS }),
    explore('A picture with a caption', ['<figure>', '  <img src="taj.jpg" alt="Taj Mahal at sunrise">', '  <figcaption>The Taj Mahal, Athens</figcaption>', '</figure>'], [
      [1, '<figure> groups a picture with its caption.', 'figure'],
      [3, '<figcaption> is the caption.', 'figcaption'],
    ], { page: { html: `<figure><img src="${pic(240, 120, 'Taj Mahal')}" alt="Taj Mahal at sunrise" width="240"><figcaption>The Taj Mahal, Athens</figcaption></figure>` }, minTaps: 2 }),
    reveal('Why it matters', [
      ['🔊 Screen readers', 'They can jump straight to the nav or the main content.'],
      ['🔍 Search engines', 'They understand how the page is built.'],
      ['🧑‍💻 Other developers', 'The code is easier to read.'],
    ]),
    check('Which element holds a blog post that makes sense on its own?', ['<article>', '<aside>', '<nav>'], 'An article stands on its own, like a news story or a post.', 'Think of something you could share by itself.'),
    recap([
      ['🏷', 'Semantic tags say what their content is'],
      ['🗺', 'header, nav, main, section, article, aside, footer'],
      ['🖼', 'figure and figcaption for captioned pictures'],
      ['1️⃣', 'Only one main per page'],
    ]),
  ]),

  lesson('html-6-3', 'Pages for every screen', 4, [
    chat(['Your page will open on phones, tablets and laptops.', 'A responsive page adjusts to every screen.']),
    reveal('Four tools', [
      ['📱 The viewport tag', 'Makes the page use the phone’s real width.'],
      ['🖼 Images that shrink', 'max-width: 100% keeps pictures inside the screen.'],
      ['📏 Percentages', 'Widths in % instead of fixed pixels.'],
      ['📐 Media queries', 'CSS that changes the layout for different screen sizes.'],
    ]),
    toggle('A picture that’s too wide', [
      ['Fixed width', ['<img src="wide.jpg" width="900">'], 'The picture is wider than the phone and spills off the screen.', { html: `<img src="${pic(900, 200, 'Wide photo')}" width="900" alt="A wide photo">` }],
      ['max-width: 100%', ['<img src="wide.jpg" style="max-width:100%; height:auto;">'], 'It shrinks to fit and keeps its shape. It never grows past its real size.', { html: `<img src="${pic(900, 200, 'Wide photo')}" style="max-width:100%;height:auto" alt="A wide photo">` }],
    ]),
    toggle('A media query', [
      ['Wide screen', ['.box { width: 48%; }'], 'On a wide screen the two boxes sit side by side.', { html: '<div class="box">One</div><div class="box">Two</div>', css: '.box{display:inline-block;width:46%;margin:1%;background:#E4E1F5;padding:20px 0;text-align:center}' }],
      ['Phone (under 600px)', ['@media (max-width: 600px) {', '  .box { width: 100%; }', '}'], 'Below 600px the media query wins and the boxes stack into one column.', { html: '<div class="box">One</div><div class="box">Two</div>', css: '.box{display:block;width:100%;margin:6px 0;background:#E4E1F5;padding:20px 0;text-align:center}' }],
    ]),
    reveal('Ready-made help', [['🧰 Frameworks', 'Big sites often use ready-made responsive styles, such as Bootstrap or Tailwind CSS, instead of writing every rule themselves.']]),
    check('Which CSS makes an image fit its container on small screens?', ['max-width:100%;', 'width:900px;', 'position:fixed;'], 'It lets the image shrink but never grow past its real size.', 'You want it to shrink when the screen is small.'),
    recap([
      ['📱', 'Add the viewport tag first'],
      ['🖼', 'max-width: 100% for images'],
      ['📏', 'Prefer % widths'],
      ['📐', 'Media queries change the layout by screen size'],
    ]),
  ]),

  lesson('html-6-4', 'Iframes', 3, [
    chat(['An iframe is a window on your page', 'that shows another web page.']),
    explore('An iframe', ['<iframe src="map.html" width="300" height="160"', '        title="Shop location map"></iframe>'], [
      [1, 'src is the page to show; width and height set the window size.', 'iframe'],
      [2, 'title describes the frame for screen readers. Always add one.', 'iframe'],
    ], { page: { html: '<iframe srcdoc="<h3 style=&quot;font-family:sans-serif&quot;>📍 Shop map</h3><p style=&quot;font-family:sans-serif&quot;>12 MG Road</p>" width="300" height="160" title="Shop location map"></iframe>' }, minTaps: 2 }),
    toggle('The frame’s border', [
      ['Default', ['<iframe src="map.html"></iframe>'], 'Browsers draw a line around an iframe.', { html: '<iframe srcdoc="<p>Shop map</p>" width="260" height="90" title="Shop map"></iframe>' }],
      ['border:none', ['<iframe src="map.html" style="border:none;"></iframe>'], 'style="border:none;" removes it.', { html: '<iframe srcdoc="<p>Shop map</p>" width="260" height="90" title="Shop map" style="border:none"></iframe>' }],
    ]),
    place('Open links inside the frame', 'Make the Menu link open in the iframe called viewer.', [['<a href="menu.html" ', { gap: 0 }, '>Menu</a>'], ['<iframe ', { gap: 1 }, ' title="Viewer"></iframe>']], ['target="viewer"', 'name="viewer"', 'id="target"'], ['target="viewer"', 'name="viewer"'], 'The iframe gets a name; the link’s target uses that name, so only the frame changes.', { preview: false }),
    reveal('Limits', [
      ['🔒 Blocked', 'Many websites refuse to be shown inside other sites’ iframes.'],
      ['🐢 Slow', 'Too many iframes make a page slow.'],
      ['🎬 Common uses', 'Maps and videos. YouTube comes in Module 8.'],
    ]),
    check('Which attribute describes an iframe for screen readers?', ['title', 'name', 'src'], 'title tells screen reader users what the frame shows.', 'It’s the same attribute that makes tooltips.'),
    recap([
      ['🪟', '<iframe src> shows another page'],
      ['🏷', 'Always add a title'],
      ['🎯', 'Links can open inside a frame by its name'],
    ]),
  ]),

  lesson('html-6-5', 'Adding JavaScript', 4, [
    chat(['Remember the house?', 'JavaScript is the electricity: it makes the page react.']),
    explore('A first script', ['<p id="demo">Hello</p>', '<script>', '  document.getElementById("demo").innerHTML = "Hello JavaScript!";', '</script>'], [
      [1, 'A paragraph with the id demo. It started as Hello.', '#demo'],
      [3, 'The script finds the element by its id and changes what’s inside. That’s why the page says Hello JavaScript!', '#demo'],
    ], { minTaps: 2 }),
    reveal('Three things JavaScript can change', [
      ['📝 Content', '.innerHTML = "New text"'],
      ['🎨 Style', '.style.color = "red"'],
      ['⚙️ Attributes', '.src = "lamp-on.png"'],
    ]),
    live('A button that does something', 'Tap a colour, then tap the button in the page.', ['<p id="demo">Hello</p>', "<button onclick=\"document.getElementById('demo').style.color='{{v}}'\">", '  Change the colour', '</button>'], ['red', 'green', 'blue']),
    reveal('Where scripts go', [
      ['📄 <script> tags', 'In the head or the body.'],
      ['🗂 A separate file', '<script src="app.js"></script>'],
      ['⬇️ At the end of the body', 'The page shows its content first, then the script runs.'],
      ['🚫 <noscript>', 'A message for when JavaScript is turned off.'],
    ]),
    tapbug('Nothing changes', ['<p id="msg">Hi</p>', '<script>', '  document.getElementById("message").innerHTML = "Bye";', '</script>'], [[3, '"message"', '"msg"']], 'The id in the script must match the element: msg, not message.'),
    recap([
      ['⚡', '<script> adds JavaScript'],
      ['🆔', 'getElementById finds an element'],
      ['📝', 'It can change content, style and attributes'],
      ['🗂', 'Separate script files use src'],
    ]),
  ]),

  challenge('html-6-ch', 'Module 6 Challenge', { icon: '🏗', name: 'Page Architect' }, ['Fill the head with the right information', 'Build a semantic page that works on phones', 'Add iframes and a little JavaScript'], [
    mcq(1, 'Which meta tag makes a page fit mobile screens?', ['<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta charset="UTF-8">', '<meta name="author" content="…">', '<meta name="mobile">'], 'The viewport tag sets the page width to the device width.', { mono: true }),
    mcq(2, 'Which element holds the main navigation links?', ['<nav>', '<header>', '<aside>', '<link>'], 'nav is for navigation menus.', { mono: true }),
    mcq(3, 'How many <main> elements should a page have?', ['One', 'Two', 'One per section', 'As many as needed'], 'main holds the page’s own main content.'),
    mcq(4, 'What does max-width:100% do to an image?', ['Lets it shrink to fit but not grow past its real size', 'Makes it 100 pixels wide', 'Always stretches it to the full screen', 'Hides it on phones'], 'It keeps images inside small screens.'),
    mcq(5, 'Which line finds the element with id="demo" in JavaScript?', ['document.getElementById("demo")', 'document.getId("demo")', 'html.find("#demo")', 'document.id("demo")'], 'getElementById looks an element up by its id.', { mono: true }),
    swipe([
      ['Meta tags go in the head', true, 'They describe the page.'],
      ['<article> is for content that makes sense on its own', true, 'Like a news story.'],
      ['Every website can be shown in an iframe', false, 'Many sites block it.'],
      ['JavaScript can change an element’s style', true, 'With .style.'],
    ]),
    pairs([['<footer>', 'Copyright and contacts at the bottom'], ['<aside>', 'Side content like related links'], ['<figcaption>', 'Caption for a picture'], ['<noscript>', 'Message when JavaScript is off']], 'Each element names one part of a page.'),
    pickCode('Which line links an external JavaScript file?', ['<script src="app.js"></script>', '<script href="app.js"></script>', '<link rel="script" href="app.js">'], 'Scripts use src, like images.'),
    bugTask(['<head>', '  <meta name="viewport" content="width=device-width, initial-scale=1.0">', '</head>', '<body>', '  <main>Shop</main>', '  <main>Blog</main>', '</body>'], [[6, '<main>Blog</main>', '<section>Blog</section>']], 'A page has one main. Put Shop and Blog in sections inside it.'),
    xray(
      { html: `<header>🗞 Yatri Times</header><nav>Home · Sport · Tech</nav><article><h3>Robots learn HTML</h3><figure><img src="${pic(160, 70, 'Robot')}" alt="A robot" width="160"><figcaption>Yatri at work</figcaption></figure></article><aside>Related: CSS tips</aside><footer>© 2026 Yatri Times</footer>`, css: LAYOUT_CSS },
      [
        ['header', 'The top bar', '<header>', ['<header>', '<head>', '<nav>']],
        ['nav', 'The menu links', '<nav>', ['<nav>', '<footer>', '<aside>']],
        ['article', 'The news story', '<article>', ['<article>', '<aside>', '<section>']],
        ['figure', 'The photo with its caption', '<figure>', ['<figure>', '<img>', '<picture>']],
        ['aside', 'The sidebar', '<aside>', ['<aside>', '<nav>', '<footer>']],
        ['footer', 'The bottom bar', '<footer>', ['<footer>', '<header>', '<main>']],
      ],
    ),
    arrange(['<header><h1>Yatri Times</h1></header>', '<nav><a href="#">Home</a></nav>', '<main>', '<article><h2>Robots learn HTML</h2></article>', '</main>', '<footer>&copy; 2026 Yatri Times</footer>'], 'a page that reads top to bottom: header, navigation, the main article, footer', LAYOUT_CSS),
  ]),
];
