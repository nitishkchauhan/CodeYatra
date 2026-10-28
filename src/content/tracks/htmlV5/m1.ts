// HTML track · Module 1 · Getting Started. Lessons that replace an older module keep its id (progress is kept).
import type { Lesson } from '../../types';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pic, pickCode, place, recap, reveal, steps, swipe, tapbug, toggle, xray } from './kit';

const SHOP = {
  html: `<h1>Happy Feet Shoes</h1><img src="${pic(260, 110, 'Shoes')}" alt="Running shoes" width="260" height="110"><p>Fresh styles every week.</p><button>Shop now</button>`,
};

export const HTML_M1: Lesson[] = [
  lesson('w-html-1', 'What is HTML?', 4, [
    chat(['Every website you use has a hidden skeleton.', 'Want to see it?'], { button: 'Show me', page: SHOP }),
    reveal('That skeleton is called HTML', [
      ['HyperText', 'Text that links to other pages.', '🔗'],
      ['Markup', 'Labels that say what each part of a page is.', '🏷'],
      ['Language', 'Rules the browser understands.', '📖'],
    ]),
    place('Label these two lines', 'Tap the labels in order: a heading for line 1, a paragraph for line 2.', [[{ gap: 0 }, 'Welcome to my shop', { gap: 1 }], [{ gap: 2 }, 'We sell shoes.', { gap: 3 }]], ['<h1>', '</h1>', '<p>', '</p>'], ['<h1>', '</h1>', '<p>', '</p>'], 'You just wrote markup. In HTML these labels are called tags: <h1> makes a heading, <p> a paragraph.'),
    check('Which one is an HTML tag?', ['<p>', '(p)', '[p]'], 'Tags always sit inside angle brackets < >.', 'Look for the angle brackets.'),
    toggle('HTML doesn’t work alone', [
      ['🧱 HTML', ['<h1>My House</h1>', '<button>Lights</button>'], 'HTML is the structure: the walls. It says what each part is, but it doesn’t paint or decide anything.'],
      ['🎨 CSS', ['<h1>My House</h1>', '<button>Lights</button>', '<!-- + CSS: colours and spacing -->'], 'CSS is the look: paint and furniture.', { html: '<h1>My House</h1><button>Lights</button>', css: 'body{background:#FFF7E8;font-family:sans-serif} h1{color:#4B3FD8} button{background:#FF9F1C;border:0;padding:10px 18px;border-radius:10px;color:#fff}' }],
      ['⚡ JS', ['<h1>My House</h1>', '<button onclick="…">Lights</button>'], 'JavaScript is the behaviour: tap Lights in the page and they switch on. HTML is a markup language, not a programming language.', { html: '<h1 id="h">My House</h1><button onclick="document.body.style.background=document.body.style.background?\'\':\'#FFE8A3\';document.getElementById(\'h\').textContent=\'Lights on!\'">Lights</button>', css: 'body{font-family:sans-serif} h1{color:#4B3FD8} button{background:#FF9F1C;border:0;padding:10px 18px;border-radius:10px;color:#fff}' }],
    ], 'Tap each one to build the house.'),
    explore('Here is a real page', ['<html>', '  <head><title>My Page</title></head>', '  <body>', '    <h1>Hello!</h1>', '    <p>My first page.</p>', '  </body>', '</html>'], [
      [2, '<title> is the text on the browser tab. It is not shown inside the page.'],
      [3, '<body> holds everything you see.', 'body'],
      [4, '<h1> makes the big heading.', 'h1'],
      [5, '<p> makes a paragraph.', 'p'],
    ], { page: { html: '<h1>Hello!</h1><p>My first page.</p>' } }),
    toggle('A page has two rooms', [
      ['Hello in the 🙈 head', ['<head><title>Hello</title></head>', '<body></body>'], 'In the head, Hello disappears from the page: the head holds information about the page.', { html: '' }],
      ['Hello in the 👁 body', ['<head></head>', '<body><h1>Hello</h1></body>'], 'In the body, Hello appears: the body holds what you see.', { html: '<h1>Hello</h1>' }],
    ], 'Put Hello in each room and watch the page.'),
    toggle('The browser hides the tags', [
      ['Page', ['<h1>Hello</h1>'], 'This is what visitors see: just Hello, big and bold.', { html: '<h1>Hello</h1>' }],
      ['Show tags', ['<h1>Hello</h1>'], 'The tags are there in the code, but the browser reads them and never shows them.', { html: '<h1><span style="color:#4B3FD8">&lt;h1&gt;</span>Hello<span style="color:#FF9F1C">&lt;/h1&gt;</span></h1>' }],
    ]),
    reveal('Did you know?', [
      ['💻 1989–1991', 'Tim Berners-Lee invents the web and HTML at CERN so scientists can share linked documents.'],
      ['🌐 1990s–2000s', 'The web grows from a few pages to millions of sites.'],
      ['📱 HTML5 today', 'Video, audio, graphics and pages that work on phones, all built in.'],
    ], { kicker: 'TIMELINE', intro: 'Tap each date.' }),
    recap([
      ['🧱', 'HTML gives structure to every web page'],
      ['🏷', 'Tags label content inside < >'],
      ['🙈', 'The head is page information; the body is what you see'],
      ['🎨', 'CSS styles it; JavaScript makes it interactive'],
    ]),
  ]),

  lesson('html-1-2', 'Editors and your first file', 4, [
    chat(['To write HTML you only need two things: a text editor and a browser.', 'You already have both.']),
    reveal('Pick an editor', [
      ['📝 Notepad / TextEdit', 'Built into every computer. On a Mac, switch TextEdit to plain text first.'],
      ['💻 VS Code', 'Free, colours your code and suggests tags as you type. Used by professionals.'],
      ['📱 This app', 'Practise anywhere on your phone.'],
    ]),
    beforeAfter('Same code, two editors', [['<h1>Hello</h1>', '<p>My first page.</p>'], 'In Notepad the code is plain black text. It works, but mistakes are easy to miss.'], [['<h1>Hello</h1>', '<p>My first page.</p>'], 'A code editor colours tags and closes them for you, so mistakes stand out.'], undefined, ['Notepad', 'VS Code']),
    steps('Your first web page', ['Open a text editor', 'Type the HTML code', 'Save the file as index.html', 'Double-click the file to open it in a browser'], 'Write it, save it as .html, then open it in a browser.'),
    reveal('Saving matters', [
      ['📄 .html at the end', 'The file name must end in .html (or .htm), or it won’t open as a web page.'],
      ['🔤 UTF-8', 'Choose UTF-8 encoding so every language and symbol shows correctly.'],
      ['🏠 index.html', 'The name browsers and web servers look for first in a folder.'],
    ]),
    check('Which file will open as a web page?', ['page.html', 'page.txt', 'page.doc'], 'The .html ending tells the computer to open it in a browser.', 'Look at the ending after the dot.'),
    live('Make it yours', 'Tap a greeting, or type your own name below.', ['<h1>{{v}}</h1>'], ['Hello, world!', 'Hello, Riya!', 'My first page'], { free: true }),
    reveal('See the code of any website', [['🔍 View Page Source', 'On a computer, right-click any page and choose View Page Source. Every site’s HTML is open for you to learn from.']]),
    recap([
      ['📝', 'Any plain text editor can write HTML'],
      ['📄', 'Save with the .html ending, in UTF-8'],
      ['🌐', 'Open the file in a browser to see the page'],
      ['🔍', 'View Page Source shows any site’s HTML'],
    ]),
  ]),

  lesson('html-1-3', 'The page skeleton', 4, [
    chat(['Every HTML page, from a school project to a giant website, starts with the same skeleton.']),
    explore('Tap each line', ['<!DOCTYPE html>', '<html lang="en">', '<head>', '  <title>Page Title</title>', '</head>', '<body><h1>Visible part</h1></body>', '</html>'], [
      [1, '<!DOCTYPE html> tells the browser this is an HTML5 page. Always the very first line.'],
      [2, '<html> wraps the whole page; lang="en" says the page is in English.'],
      [3, '<head> holds information about the page that isn’t shown on it.'],
      [4, '<title> is the text on the browser tab.'],
      [6, '<body> holds everything you can see.', 'h1'],
    ], { page: { html: '<h1>Visible part</h1>' } }),
    reveal('Boxes inside boxes', [
      ['📦 html', 'The biggest box: it holds the whole page.'],
      ['🙈 head', 'A small box inside html, for information like the title.'],
      ['👁 body', 'A big box inside html, for everything visible.'],
    ]),
    check('Where does <!DOCTYPE html> go?', ['At the very top', 'Inside the body', 'At the end'], 'It is always the first line of the page.', 'It tells the browser what it is reading, before anything else.', { mono: false }),
    reveal('Four elements you’ll use everywhere', [
      ['<h1> to <h6>', 'Headings, from biggest to smallest.'],
      ['<p>', 'A paragraph of text.'],
      ['<a href="…">', 'A link to another page.'],
      ['<img src="…" alt="…">', 'An image.'],
    ], { mono: true }),
    place('Build a page body', 'Tap the pieces in order: heading, paragraph, image.', [['<body>'], ['  ', { gap: 0 }], ['  ', { gap: 1 }], ['  ', { gap: 2 }], ['</body>']], ['<h1>My Pet</h1>', '<p>I have a dog.</p>', `<img src="${pic(160, 90, 'Dog')}" alt="My dog">`], ['<h1>My Pet</h1>', '<p>I have a dog.</p>', `<img src="${pic(160, 90, 'Dog')}" alt="My dog">`], 'Heading, paragraph and image: the page fills in as each one lands.'),
    tapbug('Something’s out of place', ['<html>', '<title>My Page</title>', '<body><h1>Hi</h1></body>', '</html>'], [[2, '<title>My Page</title>', '<head><title>My Page</title></head>']], 'The title belongs inside the head.'),
    recap([
      ['📜', '<!DOCTYPE html> comes first'],
      ['🧱', '<html> wraps everything'],
      ['🙈', '<head> holds information and the title'],
      ['👁', '<body> holds what you see'],
    ]),
  ]),

  lesson('html-1-4', 'Elements', 4, [
    reveal('The parts of an element', [
      ['<p>', 'Opening tag.'],
      ['Hello', 'Content.'],
      ['</p>', 'Closing tag: the same name with a slash.'],
    ], { code: ['<p>Hello</p>'], mono: true, intro: 'Tap each part of <p>Hello</p>.' }),
    chat(['An element is everything from the opening tag to the closing tag.', 'The tag is the label; the element is the whole package.']),
    place('Boxes inside boxes', 'Nest strong inside p: tap the tags in the order they open and close.', [[{ gap: 0 }, 'This is ', { gap: 1 }, 'important', { gap: 2 }, '.', { gap: 3 }]], ['<p>', '<strong>', '</strong>', '</p>'], ['<p>', '<strong>', '</strong>', '</p>'], 'Last opened, first closed: <strong> opened after <p>, so it closes before </p>.'),
    explore('Last opened, first closed', ['<p>This is <strong>important</strong>.</p>'], [[1, '<strong> opened inside <p>, so </strong> comes before </p>.', 'strong']], { minTaps: 1 }),
    tapbug('Closed in the wrong order', ['<p>This is <strong>important</p></strong>'], [[1, '</p></strong>', '</strong></p>']], 'The last tag opened (<strong>) must be the first one closed.'),
    reveal('Empty elements', [
      ['<br>', 'A line break.'],
      ['<hr>', 'A horizontal line.'],
      ['<img>', 'An image.'],
    ], { mono: true, intro: 'Some elements have no content and no closing tag. Tap each.' }),
    toggle('A missing closing tag', [
      ['With </p>', ['<p>First</p>', '<p>Second</p>'], 'Two neat paragraphs.'],
      ['Remove </p>', ['<p>First', '<p>Second'], 'It may still look fine: browsers guess and fix small mistakes. Don’t rely on it; always close your elements.'],
    ]),
    check('Tags work in any case: <P> works like <p>. Which should you write?', ['Lowercase <p>', 'Uppercase <P>', 'A mix of both'], 'Lowercase is the standard and easier to read.', 'Think about what most code you’ll read uses.', { mono: false }),
    recap([
      ['📦', 'Element = opening tag + content + closing tag'],
      ['🪆', 'Last opened, first closed'],
      ['➖', 'Empty elements like <br> have no closing tag'],
      ['🔡', 'Write tags in lowercase'],
    ]),
  ]),

  lesson('h-attr-1', 'Attributes', 4, [
    chat(['Attributes give an element extra information, like settings on a phone.']),
    reveal('The parts of an attribute', [
      ['href', 'The attribute name.'],
      ['=', 'Joins the name and the value.'],
      ['"https://example.com"', 'The value, in quotes.'],
    ], { code: ['<a href="https://example.com">Visit</a>'], mono: true, intro: 'Attributes always go inside the opening tag. Tap each part.' }),
    reveal('Attributes you’ll use a lot', [
      ['href', 'Where a link goes.'],
      ['src', 'The file an image comes from.'],
      ['alt', 'Text shown if an image fails, and read aloud by screen readers.'],
      ['width / height', 'The size of an image in pixels.'],
      ['title', 'A tooltip shown on hover.'],
      ['lang', 'The language of the page.'],
    ], { mono: true }),
    live('Resize the picture', 'Tap a width and watch the image change.', [`<img src="${pic(300, 180, 'Cat')}" alt="A sleeping cat" width="{{v}}">`], ['200', '100', '300']),
    toggle('Why alt matters', [
      ['Image loads', [`<img src="cat.jpg" alt="A sleeping cat">`], 'The picture shows.', { html: `<img src="${pic(220, 120, 'Cat')}" alt="A sleeping cat" width="220">` }],
      ['Break the image', [`<img src="cat.jpg" alt="A sleeping cat">`], 'The picture fails and “A sleeping cat” appears instead. alt describes the image for anyone who can’t see it.', { html: '<img src="missing-file.jpg" alt="A sleeping cat" width="220" height="60">' }],
    ]),
    place('Add a tooltip', 'Pick the attribute that shows a tooltip.', [['<p ', { gap: 0 }, '>Hover me</p>']], ['title="Tap to learn more"', 'alt="Tap to learn more"', 'href="Tap to learn more"'], ['title="Tap to learn more"'], 'title shows as a tooltip on a computer when you hover (on a phone, long-press).'),
    reveal('Good habits', [
      ['🔡 Lowercase names', 'Write attribute names in lowercase.'],
      ['❝❞ Double quotes', 'Always put values in double quotes.'],
      ['💬 Quotes inside', 'If the value has double quotes in it, wrap it in single quotes instead.'],
    ]),
    tapbug('A missing quote', ['<img src="dog.jpg alt="My dog">'], [[1, '"dog.jpg alt="', '"dog.jpg" alt="']], 'The value dog.jpg needs its closing quote before alt starts.'),
    recap([
      ['⚙️', 'Attributes add information to elements'],
      ['📍', 'They go in the opening tag'],
      ['🔤', 'Format: name="value"'],
      ['🖼', 'Always give images an alt'],
    ]),
  ]),

  challenge('html-1-ch', 'Module 1 Challenge', { icon: '🏷', name: 'First Tag' }, ['Explain what HTML is and how a page is built', 'Write elements that open, close and nest correctly', 'Add attributes like href, src and alt'], [
    mcq(1, 'What does HTML stand for?', ['HyperText Markup Language', 'HighText Machine Language', 'HyperTool Multi Language', 'Home Text Making Language'], 'HyperText means linked text; Markup means labelling content.'),
    mcq(2, 'Which part of a page holds the content the user sees?', ['<body>', '<head>', '<title>', '<!DOCTYPE html>'], 'The head holds page information; the body holds visible content.', { mono: true }),
    mcq(3, 'Which file name will open as a web page?', ['home.html', 'home.txt', 'home.docx', 'home.css'], 'HTML files end in .html.', { mono: true }),
    mcq(4, 'Which of these is an empty element (no closing tag)?', ['<br>', '<p>', '<h1>', '<body>'], '<br>, <hr> and <img> have no content and no closing tag.', { mono: true }),
    mcq(5, 'Where are attributes written?', ['In the opening tag', 'In the closing tag', 'Between the tags, with the content', 'In a separate file'], 'Attributes always go inside the opening tag.'),
    swipe([
      ['HTML is a programming language', false, 'It is a markup language: it labels content and doesn’t calculate.'],
      ['The browser shows tags on the screen', false, 'It reads the tags and shows only the content.'],
      ['<!DOCTYPE html> is the first line of a page', true, 'It always comes first.'],
      ['The alt attribute describes an image', true, 'It is read aloud and shown when the image fails.'],
    ]),
    pairs([['<title>', 'Text on the browser tab'], ['<body>', 'Visible content'], ['href', 'Where a link goes'], ['src', 'Where an image file is']], 'title names the tab, body holds the page, href and src point to places and files.'),
    pickCode('Which line nests correctly?', ['<p><strong>Hi</strong></p>', '<p><strong>Hi</p></strong>', '<strong><p>Hi</strong></p>'], 'Last opened, first closed: </strong> before </p>.'),
    bugTask(['<html>', '  <body>', '    <h1>My Shop</h1>', '    <p>Open today</p>', '  </bdy>', '</html>'], [[5, '</bdy>', '</body>']], 'A misspelt closing tag doesn’t close anything: </bdy> should be </body>.'),
    xray(
      { html: `<div class="tab">🐾 Pet Shop</div><h1>Welcome</h1><p>We sell happy pets.</p><img src="${pic(220, 110, 'Puppy')}" alt="A puppy" width="220">`, css: '.tab{display:inline-block;background:#E4E1F5;border-radius:8px 8px 0 0;padding:6px 12px;font:13px sans-serif;margin-bottom:8px}' },
      [
        ['.tab', 'The tab text', '<title>', ['<title>', '<h1>', '<head>']],
        ['h1', 'The big heading', '<h1>', ['<h1>', '<p>', '<title>']],
        ['p', 'The sentence', '<p>', ['<p>', '<h1>', '<br>']],
        ['img', 'The photo', '<img>', ['<img>', '<a>', '<p>']],
      ],
    ),
    arrange(['<!DOCTYPE html>', '<html>', '<head>', '<title>My Page</title>', '</head>', '<body>', '<h1>Hello</h1>', `<img src="${pic(120, 60, 'Yatri')}" alt="Yatri">`, '</body>', '</html>'], 'the tab says My Page; the page shows the heading and the image'),
  ]),
];
