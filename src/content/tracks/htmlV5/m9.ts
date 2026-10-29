// HTML track · Module 9 · Going Further, and the final project (it keeps the old project's id, h-project, so the
// certificate and progress carry over). Lesson 9.3 (accessible pages) is added to the owner's outline.
import type { Lesson } from '../../types';
import { beforeAfter, bugTask, challenge, chat, check, finalProject, lesson, mcq, pairs, pic, pickCode, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const PORTFOLIO = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rosa Sutton · Portfolio</title>
  <link rel="icon" href="favicon.png">
  <style>
    body { font-family: Verdana, sans-serif; color: #16142B; }
    h1 { color: #4B3FD8; }
  </style>
</head>
<body>
  <header>
    <h1>Rosa Sutton</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <img src="${pic(120, 120, 'Rosa')}" alt="Rosa smiling" width="120" height="120">
  <section id="about">
    <p>I am a <strong>Class 11</strong> student who <em>loves</em> building web pages.</p>
  </section>
  <section id="skills">
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </section>
  <section id="projects">
    <table>
      <tr><th>Project</th><th>Year</th><th>Link</th></tr>
      <tr><td>Tea stall menu</td><td>2026</td><td><a href="menu.html">Open</a></td></tr>
    </table>
  </section>
  <section id="contact">
    <form action="/contact" method="post">
      <label for="name">Name</label>
      <input id="name" name="name" type="text">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>
      <label for="msg">Message</label>
      <textarea id="msg" name="msg"></textarea>
      <button type="submit">Send</button>
    </form>
  </section>
  <footer>&copy; 2026 Rosa Sutton</footer>
</body>
</html>`;

const STARTER = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Portfolio</title>
</head>
<body>
  <h1>Your name</h1>
</body>
</html>`;

export const HTML_M9: Lesson[] = [
  lesson('html-9-1', 'Clean code, character sets and URLs', 5, [
    beforeAfter('Messy or clean?', [['<H1>My page</h1>', '<P>Hello', '<IMG SRC=photo.jpg>'], 'Mixed capitals, no quotes, unclosed tags. It may still show, but it’s hard to read and fix.', { html: '<h1>My page</h1><p>Hello</p>' }], [['<h1>My page</h1>', '<p>Hello</p>', '<img src="photo.jpg" alt="Team photo">'], 'Lowercase, quoted, indented and closed: easy to read, fix and share.', { html: '<h1>My page</h1><p>Hello</p>' }], undefined, ['Messy', 'Clean']),
    reveal('Ten rules for clean HTML', [
      ['1', 'Start with <!DOCTYPE html>.'],
      ['2', 'Add lang to <html>, like lang="en".'],
      ['3', 'Put <meta charset="UTF-8"> and the viewport tag early in the head.'],
      ['4', 'Always include a <title>.'],
      ['5', 'Write element and attribute names in lowercase.'],
      ['6', 'Close every element that needs closing.'],
      ['7', 'Quote every attribute value.'],
      ['8', 'Give every image alt, width and height.'],
      ['9', 'Indent nested code by two spaces; no spaces around =.'],
      ['10', 'Name files in lowercase, like about.html, never About Page.HTML.'],
    ]),
    tapbug('Three problems in one tag', ['<IMG SRC = photo.jpg>'], [[1, 'IMG', 'img'], [1, 'SRC', 'src'], [1, ' = photo.jpg', '="photo.jpg" alt="Team photo"']], 'Lowercase names, no spaces around =, quotes around the value, and an alt.'),
    reveal('Character sets', [
      ['ASCII', 'The first set: 128 characters (English letters, digits, basic symbols).'],
      ['Windows-1252', '256 characters.'],
      ['ISO-8859-1', '256 characters; the default in HTML 4.'],
      ['UTF-8', 'Almost every character and symbol in the world; the default in HTML5. Always use it.'],
    ]),
    toggle('The wrong character set', [
      ['UTF-8', ['<meta charset="UTF-8">'], 'Every symbol shows correctly.', { html: '<p style="font-size:22px">₹500 · café · © · 😀</p>' }],
      ['ISO-8859-1', ['<meta charset="ISO-8859-1">'], 'The same bytes read the wrong way turn into garbled symbols. Switch back to UTF-8 to fix it.', { html: '<p style="font-size:22px">â‚¹500 Â· cafÃ© Â· Â© Â· ðŸ˜€</p>' }],
    ]),
    reveal('Special characters in web addresses', [
      ['space → %20', 'Form data sometimes uses + instead.'],
      ['& → %26', 'An ampersand.'],
      ['# → %23', 'A hash.'],
      ['€ → %E2%82%AC', 'Its UTF-8 bytes, each written as % and two hex digits.'],
    ], { mono: true, intro: 'Addresses can only use a limited set of characters. Others become % and two hex digits.' }),
    check('Which file name is the safest?', ['my-cat-photo.jpg', 'My Cat Photo.JPG', 'my cat photo.jpg'], 'Lowercase with hyphens: no spaces to encode, no capitals to get wrong.', 'Spaces become %20 in addresses.'),
    recap([
      ['🧹', 'Lowercase, quoted, indented, closed'],
      ['🌏', 'Always UTF-8'],
      ['🔣', 'Addresses encode special characters as % codes'],
      ['📁', 'Lowercase file names with hyphens'],
    ]),
  ]),

  lesson('html-9-2', 'Browser superpowers (APIs)', 4, [
    chat(['Browsers come with built-in superpowers called APIs.', 'With a little JavaScript, your page can use them.']),
    reveal('📍 Geolocation', [
      ['navigator.geolocation.getCurrentPosition(show);', 'Finds where the user is.'],
      ['Permission first', 'The browser always asks the user before sharing their location.'],
      ['Secure pages only', 'It works only on https pages.'],
    ], { mono: true, intro: 'Tap each card.' }),
    reveal('✋ Drag and drop', [
      ['draggable="true"', 'Makes any element draggable.'],
      ['ondragstart, ondrop', 'JavaScript events that handle the move.'],
    ], { mono: true }),
    toggle('📦 Saving in the browser', [
      ['localStorage', ['localStorage.setItem("name", "Rosa");', 'localStorage.getItem("name");  // "Rosa"'], 'Close the tab and come back: the data is still there. It has no expiry.'],
      ['sessionStorage', ['sessionStorage.setItem("name", "Rosa");'], 'Close the tab and it’s gone: it is cleared when the tab closes.'],
    ]),
    reveal('Two more', [
      ['⚙️ Web Workers', 'Run heavy JavaScript in the background, so the page doesn’t freeze.'],
      ['📡 Server-Sent Events', 'The server pushes live updates to the page, like scores or news, using EventSource.'],
    ]),
    check('Which storage keeps data after the browser is closed?', ['localStorage', 'sessionStorage', '<input type="hidden">'], 'localStorage has no expiry; sessionStorage is cleared with the tab.', 'One of them lasts only as long as the tab.'),
    recap([
      ['📍', 'Geolocation asks permission first'],
      ['✋', 'Drag and drop starts with draggable'],
      ['📦', 'localStorage stays; sessionStorage clears'],
      ['⚙️', 'Workers run in the background; Server-Sent Events push updates'],
    ]),
  ]),

  lesson('h-a11y-1', 'Pages for everyone', 4, [
    chat(['Millions of people use screen readers, bigger text, or only a keyboard.', 'A page built carefully works for all of them, and is easier for everyone else too.']),
    reveal('The core checks', [
      ['🖼 Images', 'Every meaningful image has alt text.'],
      ['🏷 Inputs', 'Every input has a label.'],
      ['🪜 Headings', 'Headings go in order, with one h1.'],
      ['🔗 Links', 'Link text says where it goes.'],
      ['🌗 Contrast', 'Text stands out from its background.'],
      ['⌨️ Keyboard', 'Everything works with a keyboard, so actions use <button>.'],
    ]),
    toggle('A clickable box or a real button?', [
      ['<div onclick>', ['<div onclick="order()">Order now</div>'], 'It looks like a button, but the keyboard can’t reach it, and screen readers don’t call it a button.', { html: '<div style="display:inline-block;background:#FF9F1C;color:#fff;padding:10px 16px;border-radius:10px">Order now</div>' }],
      ['<button>', ['<button type="button" onclick="order()">Order now</button>'], 'A real button: reachable with Tab, works with Enter, and announced as “Order now, button”.', { html: '<button type="button" style="background:#FF9F1C;color:#fff;border:0;padding:10px 16px;border-radius:10px">Order now</button>' }],
    ]),
    beforeAfter('Links that make sense', [['<a href="fees.pdf">Click here</a> for fees.'], 'A screen reader listing the links hears “Click here, click here”: no idea where each goes.'], [['<a href="fees.pdf">Download the fee list (PDF)</a>'], 'The link text alone says where it goes.']),
    tapbug('A picture nobody can hear', ['<img src="plate.jpg">'], [[1, '<img src="plate.jpg">', '<img src="plate.jpg" alt="A plate of rice and vegetables">']], 'Without alt, a screen reader just says “image”, and nothing shows if it fails to load.'),
    check('What does <html lang="en"> help with?', ['Screen readers pronounce the page correctly', 'The page loads faster', 'It translates the page'], 'lang tells screen readers which language voice to use.', 'Think about who reads the page aloud.', { mono: false }),
    recap([
      ['♿', 'Accessible pages work for everyone'],
      ['🖼', 'alt on images, labels on inputs'],
      ['⌨️', 'Real buttons and clear link text'],
      ['🌐', 'Set lang on <html>'],
    ]),
  ]),

  challenge('h-project', 'Final: the HTML Pro challenge', { icon: '🏆', name: 'HTML Pro' }, ['Write clean, professional HTML', 'Know what the browser’s built-in APIs can do', 'Build a complete portfolio page from scratch'], [
    mcq(1, 'Which character set should modern pages use?', ['UTF-8', 'ASCII', 'ISO-8859-1', 'Windows-1252'], 'UTF-8 covers almost every character and is the HTML5 default.'),
    mcq(2, 'Which line follows the clean-code rules?', ['<img src="photo.jpg" alt="Team photo">', '<IMG SRC=photo.jpg>', '<img src = "photo.jpg">', '<Img Src=\'photo.jpg\'>'], 'Lowercase, quoted, no spaces around =, and an alt.', { mono: true }),
    mcq(3, 'How is a space written in a web address?', ['%20', '&nbsp;', '\\s', '#20'], 'Address encoding uses % and two hex digits.', { mono: true }),
    mcq(4, 'What must happen before a site can get the user’s location?', ['The user must give permission', 'Nothing', 'The page must use canvas', 'The page must have a form'], 'Geolocation always asks first.'),
    mcq(5, 'What happens to sessionStorage data when the tab is closed?', ['It is cleared', 'It is kept forever', 'It is sent to the server', 'It moves to localStorage'], 'sessionStorage lasts only as long as the tab.'),
    swipe([
      ['File names should be lowercase', true, 'And use hyphens instead of spaces.'],
      ['UTF-8 can display emojis', true, 'It covers almost every character.'],
      ['localStorage data is shared with every website', false, 'Each site gets its own storage.'],
      ['draggable="true" makes an element draggable', true, 'JavaScript handles the drop.'],
    ]),
    pairs([['%26', '& in an address'], ['Geolocation', 'Finds the user’s position'], ['Web Worker', 'Runs JavaScript in the background'], ['lang="en"', 'States the page language']], 'Clean code and browser superpowers.'),
    pickCode('Which is the best start of a page?', ['<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">', '<html><body>', '<HTML><HEAD><META CHARSET=UTF-8>'], 'DOCTYPE first, a language, and UTF-8 early in the head.'),
    bugTask(['<!DOCTYPE html>', '<html lang="en">', '<head>', '  <meta charset="UTF-8">', '  <title>My Portfolio</title>', '</head>', '<body>', '  <img src="Profile Photo.JPG" alt="Rosa smiling">', '</body>', '</html>'], [[8, '"Profile Photo.JPG"', '"profile-photo.jpg"']], 'File names: lowercase, with hyphens instead of spaces.'),
    xray(
      { html: `<header><h1>Rosa Sutton</h1><nav><a href="#">About</a> · <a href="#">Skills</a></nav></header><img src="${pic(90, 90, 'Rosa')}" alt="Rosa" width="90"><ul class="skills"><li>HTML</li><li>CSS</li></ul><table><tr><th>Project</th><th>Year</th></tr><tr><td>Menu</td><td>2026</td></tr></table><form onsubmit="return false"><input placeholder="Email"> <button>Send</button></form><footer>© 2026 Rosa</footer>`, css: 'table,th,td{border:1px solid #999;border-collapse:collapse} header{background:#4B3FD8;color:#fff;padding:6px} footer{background:#16142B;color:#fff;padding:6px;margin-top:6px}' },
      [
        ['header', 'The top bar', '<header>', ['<header>', '<head>', '<nav>']],
        ['nav', 'The links row', '<nav>', ['<nav>', '<ul>', '<aside>']],
        ['img', 'The profile photo', '<img>', ['<img>', '<figure>', '<svg>']],
        ['h1', 'The name', '<h1>', ['<h1>', '<title>', '<p>']],
        ['.skills', 'The skills list', '<ul>', ['<ul>', '<ol>', '<table>']],
        ['table', 'The projects grid', '<table>', ['<table>', '<div>', '<ul>']],
        ['form', 'The contact box', '<form>', ['<form>', '<fieldset>', '<input>']],
        ['footer', 'The bottom bar', '<footer>', ['<footer>', '<header>', '<section>']],
      ],
      6,
    ),
    finalProject({
      title: 'My portfolio',
      instructions: 'Build your own portfolio page using everything from the track. Each item on the checklist ticks off when it is in your page.',
      starter: { html: STARTER },
      solution: { html: PORTFOLIO },
      checks: [
        { label: 'DOCTYPE, lang, charset, viewport and title', file: 'html', pattern: /<!DOCTYPE html>[\s\S]*<html lang="[a-z]+"[\s\S]*charset="UTF-8"[\s\S]*name="viewport"[\s\S]*<title>[^<]+<\/title>/i },
        { label: 'A favicon link', file: 'html', pattern: /<link[^>]*rel="icon"/ },
        { label: 'A header with your name and a nav of three jump links', file: 'html', pattern: /<header>[\s\S]*<h1>[^<]+<\/h1>[\s\S]*<nav>(?:[\s\S]*?<a href="#[\w-]+">){3}/ },
        { label: 'A profile photo with alt, width and height', file: 'html', pattern: /<img(?=[^>]*\balt="[^"]+")(?=[^>]*\bwidth="\d+")(?=[^>]*\bheight="\d+")[^>]*>/ },
        { label: 'An About section using <strong> and <em>', file: 'html', pattern: /<section id="about">(?=[\s\S]*?<strong>)(?=[\s\S]*?<em>)/ },
        { label: 'A Skills section with a list', file: 'html', pattern: /<section id="skills">[\s\S]*?<ul>[\s\S]*?<li>/ },
        { label: 'A Projects section with a table', file: 'html', pattern: /<section id="projects">[\s\S]*?<table>[\s\S]*?<th>/ },
        { label: 'A contact form: email required, a message box and a Send button', file: 'html', pattern: /<form(?=[\s\S]*<input(?=[^>]*type="email")(?=[^>]*required)[^>]*>)(?=[\s\S]*<textarea)(?=[\s\S]*type="submit")/ },
        { label: 'A footer with © and the year', file: 'html', pattern: /<footer>[^<]*&copy;[^<]*20\d\d[^<]*<\/footer>/ },
        { label: 'Internal CSS with a colour and a font', file: 'html', pattern: /<style>(?=[\s\S]*?color\s*:)(?=[\s\S]*?font-family\s*:)[\s\S]*?<\/style>/ },
      ],
      hint: 'Work down the checklist: the head first, then header, photo, the three sections, the form and the footer, and the <style> last.',
    }),
  ], 'project'),
];
