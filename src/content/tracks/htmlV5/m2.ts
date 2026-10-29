// HTML track · Module 2 · Working with Text.
import { match } from '../../dsl';
import type { Lesson } from '../../types';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

export const HTML_M2: Lesson[] = [
  lesson('h-text', 'Headings', 4, [
    chat(['Headings are like chapter titles.', 'They tell readers, and search engines, what each part of the page is about.']),
    explore('Six sizes of heading', ['<h1>Heading 1</h1>', '<h2>Heading 2</h2>', '<h3>Heading 3</h3>', '<h6>Heading 6</h6>'], [
      [1, 'h1 is the biggest and most important: the page’s main title.', 'h1'],
      [2, 'h2 is a section title.', 'h2'],
      [3, 'h3 is a title inside a section.', 'h3'],
      [4, 'h6 is the smallest of the six.', 'h6'],
    ]),
    place('Outline a recipe page', 'Tap the lines in order: the page title, then two section titles.', [[{ gap: 0 }], [{ gap: 1 }], [{ gap: 2 }]], ['<h1>Lemon Tea</h1>', '<h2>Ingredients</h2>', '<h2>Steps</h2>', '<h6>Lemon Tea</h6>', '<h1>Steps</h1>'], ['<h1>Lemon Tea</h1>', '<h2>Ingredients</h2>', '<h2>Steps</h2>'], 'One h1 for the page title, h2 for each section under it.'),
    reveal('Rules for headings', [
      ['1️⃣ One h1', 'Use one h1 per page, for the main title.'],
      ['🪜 In order', 'h2 under h1, h3 under h2. Don’t skip levels.'],
      ['🔍 For search', 'Search engines read headings to understand the page.'],
      ['🚫 Not for size', 'Don’t use a heading just to make text big or bold. Use CSS for that.'],
    ]),
    live('Size is style, not importance', 'Tap a size. The heading stays an h1, as important as before.', ['<h1 style="font-size:{{v}};">Big Title</h1>'], ['60px', '30px', '44px'], { caption: 'CSS changes the size; the heading level keeps its meaning.' }),
    check('Which heading is the most important?', ['<h1>', '<h6>', '<head>'], '<head> is the page’s information section, not a heading.', 'The smaller the number, the more important.'),
    recap([
      ['📰', 'Six heading levels, h1 to h6'],
      ['1️⃣', 'One h1 per page'],
      ['🪜', 'Don’t skip levels'],
      ['🔍', 'Headings help search engines'],
    ]),
  ]),

  lesson('html-2-2', 'Paragraphs, line breaks and lines', 4, [
    explore('Paragraphs', ['<p>This is a paragraph.</p>', '<p>This is another paragraph.</p>'], [
      [1, 'Each paragraph starts on a new line, with space above and below.', 'p:first-of-type'],
      [2, 'A second <p> starts a new block of text.', 'p:last-of-type'],
    ], { minTaps: 2 }),
    beforeAfter('Extra spaces disappear', [['<p>Hello      world,', '      how   are   you?</p>'], 'This is how it looks in the code: lots of spaces and a new line.'], [['<p>Hello      world,', '      how   are   you?</p>'], 'The browser squeezes every run of spaces and new lines into one space.'], undefined, ['The code', 'The page']),
    place('Write an address on three lines', 'Tap a line break into each gap.', [['<p>Yatri House', { gap: 0 }, 'Coding Street', { gap: 1 }, 'Punjab</p>']], ['<br>', '<br>', '</br>', '<hr>'], ['<br>', '<br>'], '<br> breaks the line without starting a new paragraph. It has no closing tag.'),
    toggle('A line between topics', [
      ['Without <hr>', ['<h2>Breakfast</h2>', '<p>Toast and tea</p>', '<h2>Lunch</h2>'], 'The two sections run together.'],
      ['With <hr>', ['<h2>Breakfast</h2>', '<p>Toast and tea</p>', '<hr>', '<h2>Lunch</h2>'], '<hr> draws a line to mark a change of topic. It has no closing tag.'],
    ]),
    beforeAfter('Keep every space', [['<p>Roses are red,', '   violets are blue.</p>'], 'Inside <p> the poem collapses onto one line.'], [['<pre>Roses are red,', '   violets are blue.</pre>'], '<pre> shows text exactly as typed, spaces and lines included, in a monospace font.'], undefined, ['<p>', '<pre>']),
    tapbug('A wrong line break', ['<p>Line one</br>Line two</p>'], [[1, '</br>', '<br>']], 'Line breaks have no closing tag: write <br>.'),
    recap([
      ['¶', '<p> for paragraphs'],
      ['↩️', '<br> for a line break'],
      ['➖', '<hr> for a change of topic'],
      ['📐', '<pre> keeps spaces and lines'],
    ]),
  ]),

  lesson('html-2-3', 'Text formatting', 4, [
    chat(['Formatting tags change how a word looks, or what it means.', 'Let’s try them all.']),
    reveal('Ten formatting tags', [
      ['<b>', 'Bold: looks bold only.'],
      ['<strong>', 'Important: bold, and marked as important.'],
      ['<i>', 'Italic: a different voice, like a technical term.'],
      ['<em>', 'Emphasised: stressed when spoken.'],
      ['<mark>', 'Highlighted, like a marker pen.'],
      ['<small>', 'Smaller text, like fine print.'],
      ['<del>', 'Deleted: crossed out.'],
      ['<ins>', 'Inserted: underlined.'],
      ['<sub>', 'Subscript: the 2 in H₂O.'],
      ['<sup>', 'Superscript: the 2 in x².'],
    ], { mono: true }),
    reveal('Same look, different meaning', [
      ['<b> vs <strong>', 'They look the same. <strong> tells screen readers and search engines the text is important; <b> only changes the look.'],
      ['<i> vs <em>', '<em> means stressed when spoken; <i> only changes the look.'],
    ], { mono: true }),
    place('Fix the chemistry note', 'Put the 2 in H2O below the line, and the 2 in mc2 above it.', [['<p>H', { gap: 0 }, '2', { gap: 1 }, 'O and E = mc', { gap: 2 }, '2', { gap: 3 }, '</p>']], ['<sub>', '</sub>', '<sup>', '</sup>'], ['<sub>', '</sub>', '<sup>', '</sup>'], 'sub sits below the line (H₂O); sup sits above it (mc²).'),
    place('Show a sale price', 'Cross out the old price and mark the new one.', [['<p>', { gap: 0 }, '₹999', { gap: 1 }, ' ', { gap: 2 }, '₹499', { gap: 3 }, '</p>']], ['<del>', '</del>', '<ins>', '</ins>'], ['<del>', '</del>', '<ins>', '</ins>'], '<del> crosses out what was removed; <ins> marks what was added.'),
    check('Which tag highlights text like a marker pen?', ['<mark>', '<small>', '<em>'], '<mark> gives text a highlighter background.', 'Think of a highlighter.'),
    reveal('Tags for computer code', [
      ['<code>', 'A piece of code inside a sentence: shown in a monospace font.'],
      ['<kbd>', 'Keys to press, like Ctrl + S.'],
      ['<samp>', 'What a program prints back.'],
      ['<var>', 'A variable name in maths or code.'],
      ['<pre>', 'Pre-formatted text: keeps every space and line break, for code blocks.'],
    ], { mono: true }),
    explore('Code on a page', ['<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>', '<p>Type <code>print("Hi")</code> and you see <samp>Hi</samp>.</p>', '<pre><code>for i in range(3):', '    print(i)</code></pre>'], [
      [1, '<kbd> shows keys on the keyboard.', 'kbd'],
      [2, '<code> is code inside a sentence; <samp> is what the program shows.', 'code'],
      [3, '<pre> keeps the line break and the four spaces exactly as typed. Wrap code blocks in <pre><code>.', 'pre'],
    ], { page: { html: '<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p><p>Type <code>print("Hi")</code> and you see <samp>Hi</samp>.</p><pre><code>for i in range(3):\n    print(i)</code></pre>', css: 'body{font-family:sans-serif;margin:12px} kbd{border:1px solid #999;border-bottom-width:3px;border-radius:4px;padding:1px 5px} pre{background:#F3F0FF;padding:8px;border-radius:8px}' }, minTaps: 3 }),
    tapbug('The 2 is in the wrong place', ['<p>Water is H<sup>2</sup>O</p>'], [[1, '<sup>2</sup>', '<sub>2</sub>']], 'The 2 in H₂O sits below the line, so it needs <sub>.'),
    recap([
      ['🅱️', 'b and strong for bold (strong means important)'],
      ['🔤', 'i and em for italic (em means emphasis)'],
      ['🖍', 'mark, small, del and ins'],
      ['⬇️', 'sub below the line, sup above it'],
    ]),
  ]),

  lesson('html-2-4', 'Quotations and citations', 4, [
    beforeAfter('Short quote or long quote?', [['<p>She said <q>Practice daily</q> and smiled.</p>'], '<q> is a short quote inside a sentence. The browser adds the quotation marks.'], [['<blockquote>', '  Learning never exhausts the mind.', '</blockquote>'], '<blockquote> is a longer quote from another source, shown as an indented block.'], undefined, ['<q>', '<blockquote>']),
    explore('Where the quote came from', ['<blockquote cite="https://example.com/speech">', '  Learning never exhausts the mind.', '</blockquote>'], [
      [1, 'cite gives the source address. It isn’t shown on the page, but browsers and search engines can read it.', 'blockquote'],
      [2, 'The quote itself, shown indented.', 'blockquote'],
    ], { minTaps: 2 }),
    reveal('Short forms', [['<abbr title="World Health Organization">WHO</abbr>', '<abbr> marks a short form. Its title holds the full form, shown when you hover (long-press on a phone).']], { mono: true }),
    reveal('Three more', [
      ['📮 <address>', 'Contact details of the author or owner, usually shown in italic.'],
      ['📚 <cite>', 'The title of a book, film or song, shown in italic.'],
      ['↔️ <bdo dir="rtl">', 'Shows text right to left.'],
    ]),
    toggle('Flip the direction', [
      ['dir="ltr"', ['<bdo dir="ltr">Yatri</bdo>'], 'Left to right: the normal way for English.'],
      ['dir="rtl"', ['<bdo dir="rtl">Yatri</bdo>'], 'Right to left: Yatri becomes irtaY. Languages like Arabic and Urdu are written this way.'],
    ]),
    check('Which tag adds quotation marks for you?', ['<q>', '<blockquote>', '<cite>'], '<q> wraps a short quote in quotation marks.', 'Think short quote, inside a sentence.'),
    recap([
      ['💬', '<q> for short quotes'],
      ['📜', '<blockquote> for long quotes'],
      ['🔤', '<abbr> for short forms'],
      ['📚', '<cite> for titles of works; <address> for contact details'],
    ]),
  ]),

  lesson('html-2-5', 'Comments', 3, [
    chat(['Comments are notes for people who read your code.', 'The browser ignores them.']),
    explore('A comment in the code', ['<!-- This is the main heading -->', '<h1>Welcome</h1>'], [
      [1, 'A comment starts with <!-- and ends with -->. Nothing inside it shows on the page.'],
      [2, 'Only Welcome appears.', 'h1'],
    ], { minTaps: 2 }),
    toggle('Hide code while testing', [
      ['Shown', ['<h1>Shoe Shop</h1>', '<p>Sale ends today!</p>'], 'Both lines show.'],
      ['Commented out', ['<h1>Shoe Shop</h1>', '<!-- <p>Sale ends today!</p> -->'], 'The paragraph vanishes from the page but stays in the code, ready to bring back.'],
    ]),
    reveal('Good to know', [
      ['📝 Many lines', 'A comment can cover many lines.'],
      ['👀 Not secret', 'Anyone can read comments with View Page Source. Never write passwords or private notes in them.'],
      ['⌨️ Shortcut', 'In VS Code, Ctrl + / adds or removes a comment.'],
    ]),
    tapbug('A broken comment', ['<!- Navigation menu -->'], [[1, '<!-', '<!--']], 'A comment opens with <!-- : two dashes.'),
    recap([
      ['🗒', '<!-- --> writes a comment'],
      ['🚫', 'The browser doesn’t show it'],
      ['👀', 'It is still visible in the page source'],
    ]),
  ]),

  lesson('html-2-6', 'Entities, symbols and emojis', 4, [
    chat(['Try writing 5 < 10 in HTML.', 'The browser may think < starts a tag! Entities solve this.']),
    reveal('The parts of an entity', [
      ['&', 'Start.'],
      ['lt', 'The name: less than.'],
      [';', 'End. The result shows as <'],
    ], { code: ['&lt;'], mono: true, intro: 'An entity starts with & and ends with ;. Names are case sensitive.' }),
    match({ kicker: 'MATCH', title: 'Common entities', instructions: 'Tap an entity, then what it shows.', pairs: [['&lt;', '<'], ['&gt;', '>'], ['&amp;', '&'], ['&quot;', '"'], ['&copy;', '©'], ['&nbsp;', 'a space that never breaks']], mono: true, explain: 'Each entity shows one character the browser would otherwise misread.' }),
    beforeAfter('Keep words together', [['<p>The shop is 10 km away.</p>'], 'At the edge of a narrow screen, “10” and “km” can end up on different lines.', { html: '<p style="width:150px;border:1px dashed #ccc">The shop is about 10 km away.</p>' }], [['<p>The shop is 10&nbsp;km away.</p>'], 'A non-breaking space keeps 10 and km together, and is never collapsed.', { html: '<p style="width:150px;border:1px dashed #ccc">The shop is about 10&nbsp;km away.</p>' }], undefined, ['Normal space', '&nbsp;']),
    reveal('Symbols by name or number', [
      ['&#8377;', 'Shows ₹'],
      ['&euro;', 'Shows €'],
      ['&times;', 'Shows ×'],
      ['&rarr;', 'Shows →'],
      ['&pi;', 'Shows π'],
    ], { mono: true }),
    live('Emojis are characters too', 'Tap a number to change the emoji.', ['<p style="font-size:28px">I love coding &#{{v}};</p>'], ['128512', '128640', '127881'], { caption: 'Each emoji has a number. You can also type emojis directly; <meta charset="UTF-8"> makes sure they show.' }),
    tapbug('A broken entity', ['<p>Tom &amp Jerry</p>'], [[1, '&amp', '&amp;']], 'Every entity ends with a semicolon: &amp;'),
    recap([
      ['🔣', 'Entities start with & and end with ;'],
      ['⬅️', '&lt; and &gt; show < and >'],
      ['␣', '&nbsp; is a space that never breaks'],
      ['😀', 'Emojis are characters with numbers'],
    ]),
  ]),

  challenge('html-2-ch', 'Module 2 Challenge', { icon: '✍️', name: 'Wordsmith' }, ['Structure text with headings and paragraphs', 'Format text with the right tag for the meaning', 'Use comments and entities'], [
    mcq(1, 'How many heading levels does HTML have?', ['6', '3', '5', '10'], '<h1> to <h6>.'),
    mcq(2, 'What does the browser do with extra spaces inside a <p>?', ['Collapses them into one space', 'Shows all of them', 'Turns them into line breaks', 'Shows an error'], 'Use <pre> or &nbsp; to keep extra spaces.'),
    mcq(3, 'Which tag marks text as important, not just bold?', ['<strong>', '<b>', '<mark>', '<big>'], '<strong> adds meaning; <b> only changes the look.', { mono: true }),
    mcq(4, 'Which tag shows the full form of a short form on hover?', ['<abbr> with a title', '<q>', '<cite>', '<address>'], 'The title attribute holds the full form.', { mono: true }),
    mcq(5, 'Which entity displays the < sign?', ['&lt;', '&gt;', '&amp;', '&nbsp;'], 'lt means less than.', { mono: true }),
    swipe([
      ['<br> needs a closing tag', false, '<br> is an empty element.'],
      ['A page should have one main <h1>', true, 'One h1 for the main title.'],
      ['Comments are shown on the web page', false, 'The browser ignores them.'],
      ['<pre> keeps spaces and line breaks', true, 'It shows text exactly as typed.'],
    ]),
    pairs([['<sub>', 'H₂O'], ['<sup>', 'x²'], ['<del>', 'Crossed-out text'], ['<blockquote>', 'Long quote from a source']], 'sub below, sup above, del crossed out, blockquote for long quotes.'),
    pickCode('Which line is a correct comment?', ['<!-- Menu -->', '<-- Menu -->', '<!-- Menu ->'], 'A comment opens with <!-- and closes with -->.'),
    bugTask(['<h1>My Blog</h1>', '<h2>Latest Posts</h3>', '<p>Price: 5 &lt 10</p>'], [[2, '</h3>', '</h2>'], [3, '&lt', '&lt;']], 'The closing tag must match the opening one, and every entity ends with a semicolon.'),
    xray(
      { html: '<h1>Coding Diary</h1><h2>Day 1</h2><p>Today I learned <mark>HTML</mark>.</p><blockquote>Learning never exhausts the mind.</blockquote><p>Reading: <cite>The Art of Code</cite></p>' },
      [
        ['h1', 'The big title', '<h1>', ['<h1>', '<h2>', '<p>']],
        ['h2', 'The section title', '<h2>', ['<h2>', '<h1>', '<strong>']],
        ['mark', 'The highlighted word', '<mark>', ['<mark>', '<em>', '<b>']],
        ['blockquote', 'The indented quote', '<blockquote>', ['<blockquote>', '<q>', '<pre>']],
        ['cite', 'The book name', '<cite>', ['<cite>', '<i>', '<abbr>']],
      ],
    ),
    arrange(['<h2>Smart Watch</h2>', '<p>', 'Price: <del>&#8377;2999</del>', '<ins>&#8377;1999</ins>', '<br>', '<mark>Sale ends today!</mark>', '</p>'], 'the heading, the crossed-out old price, the new price, then the highlighted sale line on its own line'),
  ]),
];
