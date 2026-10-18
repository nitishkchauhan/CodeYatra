// Extra practice for each HTML module.
import { bug, order, quiz, tap } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · HTML';

export const HTML_DRILLS: Record<string, Step[]> = {
  'w-html-1': [
    quiz({ prompt: 'What does the server send back when you open a web page?', options: ['An HTML file (plus CSS, JS and images it links to)', 'A picture of the page', 'Only the page title', 'A PDF'], right: 'Right. The browser draws the page from the HTML.', wrong: 'The server sends HTML text; the browser turns it into what you see.' }),
    quiz({ prompt: 'Where does <title> go?', options: ['Inside <head>', 'Inside <body>', 'Before <!DOCTYPE html>', 'After </html>'], right: 'Right. It names the page in the tab and in search results.', wrong: '<title> is information about the page, so it belongs in <head>.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Tags are closed in the wrong order. Tap the line.', lang: 'html', lines: ['<p>Classes start on <strong>Monday</p></strong>'], bug: 0, fix: '<p>Classes start on <strong>Monday</strong></p>', explain: 'Close the inner tag first: </strong>, then </p>.' }),
    order({ kicker: K, title: 'Put it in order', instructions: 'Arrange the skeleton.', lang: 'html', lines: ['<!DOCTYPE html>', '<html lang="en">', '<head><title>Fees</title></head>', '<body><h1>Fees</h1></body>', '</html>'], explain: 'DOCTYPE, then html containing head and body.' }),
  ],
  'h-text': [
    quiz({ prompt: 'Your page has the title, then sections. Which headings?', options: ['One <h1>, then <h2> for sections', '<h1> for every section', '<h3> for the title', 'Only <p> with bold text'], right: 'Right. Headings form the outline.', wrong: 'The page title is the single h1; sections use h2.' }),
    quiz({ prompt: 'You press Enter three times between two words in your HTML. What does the page show?', options: ['One space', 'Three blank lines', 'An error', 'Three spaces'], right: 'Right. HTML collapses spaces and new lines.', wrong: 'Browsers collapse whitespace into a single space. Use <p> or <br> for breaks.' }),
    quiz({ prompt: 'Which tag means stress, the way you’d say a word with emphasis?', options: ['<em>', '<strong>', '<mark>', '<b>'], right: 'Right. <em> is stress emphasis, shown in italics.', wrong: '<em> is stress emphasis; <strong> is importance.', mono: true }),
    quiz({ prompt: 'When is <br> the right choice?', options: ['Lines of an address or a poem', 'Spacing out paragraphs', 'Making a gap above a heading', 'Every new sentence'], right: 'Right. Use it only when the line break is part of the content.', wrong: 'For spacing use CSS and paragraphs; <br> is for real line breaks like addresses.' }),
  ],
  'w-html-2': [
    quiz({ prompt: 'What should alt text say for a photo of the school building?', options: ['Sunrise school building from the front gate', 'image', 'photo.jpg', 'Click here'], right: 'Right. Describe what the picture shows.', wrong: 'alt should describe the image for someone who can’t see it.', mono: true }),
    quiz({ prompt: 'A decorative swirl adds nothing to the meaning. Its alt should be…', options: ['alt="" (empty)', 'alt="swirl"', 'Left out entirely', 'alt="decoration image"'], right: 'Right. Empty alt tells screen readers to skip it.', wrong: 'Decorative images get alt="" so screen readers skip them. Leaving alt out makes them read the file name.', mono: true }),
    tap({ kicker: K, title: 'Where does the link go?', instructions: 'Tap the attribute that holds the address.', lang: 'html', lines: ['<a href="fees.html">See the fees</a>'], target: { line: 0, token: 'href' }, explain: 'href holds the link’s destination.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This link should open the phone app. Tap the buggy line.', lang: 'html', lines: ['<a href="98200 00000">Call us</a>'], bug: 0, fix: '<a href="tel:+919820000000">Call us</a>', explain: 'Phone links need the tel: scheme and no spaces.' }),
  ],
  'h-attr-1': [
    quiz({ prompt: 'How many elements on a page may share one id?', options: ['Only one', 'Up to three', 'Any number', 'One per section'], right: 'Right. Use a class for groups.', wrong: 'An id must be unique on the page.' }),
    quiz({ prompt: 'How do you give one element two classes?', options: ['class="price highlight"', 'class="price" class="highlight"', 'class="price,highlight"', 'classes="price highlight"'], right: 'Right. Separate class names with spaces.', wrong: 'Put both names in one class attribute, separated by a space.', mono: true }),
    quiz({ prompt: 'Which attribute stores custom data for JavaScript?', options: ['data-seats="4"', 'seats="4"', 'class="seats-4"', 'id="4"'], right: 'Right. JavaScript reads it as element.dataset.seats.', wrong: 'Custom data goes in data-* attributes, read with element.dataset.', mono: true }),
    quiz({ prompt: 'Which attribute turns a button off?', options: ['disabled', 'off', 'hidden="button"', 'stop'], right: 'Right. It is on just by being there.', wrong: 'disabled is a boolean attribute: writing it disables the button.', mono: true }),
  ],
  'h-list-1': [
    quiz({ prompt: 'Which list for “things to bring: pen, ID card, admit card”?', options: ['<ul>', '<ol>', '<table>', '<dl>'], right: 'Right. Order doesn’t matter, so bullets.', wrong: 'Order doesn’t matter here, so an unordered list.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'One item isn’t shown as a list item. Tap it.', lang: 'html', lines: ['<ul>', '  <li>Python</li>', '  Web', '  <li>Data</li>', '</ul>'], bug: 2, fix: '  <li>Web</li>', explain: 'Every item must be in its own <li>.' }),
    quiz({ prompt: 'How do you start a numbered list at 5?', options: ['<ol start="5">', '<ol begin="5">', '<ol>5.</ol>', '<li value="start-5">'], right: 'Right.', wrong: 'The start attribute on <ol> sets the first number.', mono: true }),
    quiz({ prompt: 'Where does a nested list go?', options: ['Inside an <li>, before its closing tag', 'Directly inside <ul>, between items', 'After the outer list', 'In <head>'], right: 'Right. It belongs to that item.', wrong: 'A sub-list sits inside the <li> it belongs to.' }),
  ],
  'h-table-1': [
    quiz({ prompt: 'Which tag is a table row?', options: ['<tr>', '<td>', '<th>', '<row>'], right: 'Right: table row.', wrong: '<tr> is a row; <td> and <th> are cells.', mono: true }),
    quiz({ prompt: 'A cell should span two columns. Which attribute?', options: ['colspan="2"', 'rowspan="2"', 'span="2"', 'width="2"'], right: 'Right.', wrong: 'colspan stretches across columns; rowspan across rows.', mono: true }),
    quiz({ prompt: 'Which element gives a table its title?', options: ['<caption>', '<title>', '<th>', '<thead>'], right: 'Right. <caption> titles the table for everyone, including screen readers.', wrong: '<title> is the page title. A table’s title is its <caption>.', mono: true }),
    quiz({ prompt: 'Should you use a table to put a sidebar next to the content?', options: ['No, use CSS for layout', 'Yes, it is the easiest way', 'Only on phones', 'Only with colspan'], right: 'Right. Tables are for data.', wrong: 'Layout tables confuse screen readers and don’t adapt to phones. Use CSS.' }),
  ],
  'h-form-1': [
    quiz({ prompt: 'Which input type shows a number keypad on phones for a mobile number?', options: ['type="tel"', 'type="text"', 'type="phone"', 'type="password"'], right: 'Right.', wrong: 'type="tel" brings up the phone keypad.', mono: true }),
    quiz({ prompt: 'Which method suits a search form whose results can be bookmarked?', options: ['get', 'post', 'put', 'send'], right: 'Right. GET puts the query in the address.', wrong: 'GET sends data in the URL, good for searches; POST for submitting data.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This field isn’t sent with the form. Tap the buggy line.', lang: 'html', lines: ['<label for="city">City</label>', '<input id="city">'], bug: 1, fix: '<input id="city" name="city">', explain: 'Only fields with a name are sent.' }),
    tap({ kicker: K, title: 'Tap the link to the label', instructions: 'Which attribute on the label connects it to the input?', lang: 'html', lines: ['<label for="email">Email</label>'], target: { line: 0, token: 'for' }, explain: 'for must match the input’s id.' }),
  ],
  'h-inputs-1': [
    quiz({ prompt: 'Pick one batch from Morning, Afternoon and Evening. Which control?', options: ['Radio buttons with the same name', 'Checkboxes', 'A textarea', 'Three separate forms'], right: 'Right. Radios allow exactly one choice.', wrong: 'One choice from a few options means radio buttons sharing a name.' }),
    quiz({ prompt: 'Which attribute makes a field mandatory?', options: ['required', 'mandatory', 'needed', 'must'], right: 'Right.', wrong: 'required stops the form being sent while the field is empty.', mono: true }),
    quiz({ prompt: 'Which element holds the question for a group of radio buttons?', options: ['<legend> inside <fieldset>', '<label>', '<caption>', '<title>'], right: 'Right. The legend labels the whole group.', wrong: 'Wrap the group in <fieldset> and put the question in its <legend>.', mono: true }),
    quiz({ prompt: 'Is HTML validation enough to protect your database?', options: ['No, the server must validate too', 'Yes, browsers enforce it', 'Yes, if pattern is used', 'Only on phones'], right: 'Right. Anyone can bypass it.', wrong: 'Browser checks help users but can be skipped. Always validate on the server.' }),
  ],
  'h-sem-1': [
    quiz({ prompt: 'How many <main> elements should a page have?', options: ['One', 'One per section', 'None', 'As many as needed'], right: 'Right.', wrong: 'There is one <main> per page, for its main content.' }),
    quiz({ prompt: 'Which element holds the site’s main menu?', options: ['<nav>', '<menu-bar>', '<header> only', '<aside>'], right: 'Right.', wrong: 'Main navigation links go in <nav>.', mono: true }),
    quiz({ prompt: 'A “Did you know?” box next to an article is best as…', options: ['<aside>', '<article>', '<main>', '<footer>'], right: 'Right. Related, but separate from the main flow.', wrong: '<aside> is for content related to, but separate from, the main content.', mono: true }),
    order({ kicker: K, title: 'Nest it right', instructions: 'Arrange a news section.', lang: 'html', lines: ['<section>', '  <h2>News</h2>', '  <article><h3>Results out</h3></article>', '</section>'], explain: 'A section with its heading, containing an article.' }),
  ],
  'h-media': [
    quiz({ prompt: 'What adds subtitles to a <video>?', options: ['<track kind="captions">', '<caption>', '<subtitle>', 'alt=""'], right: 'Right.', wrong: 'A <track kind="captions"> file adds captions.', mono: true }),
    quiz({ prompt: 'Which is best for a photo of students?', options: ['A JPG or WebP image', 'SVG', 'A table', 'An audio file'], right: 'Right. SVG is for shapes and icons.', wrong: 'Photos are images like JPG or WebP; SVG suits drawings and icons.' }),
    tap({ kicker: K, title: 'Tap the circle’s radius', instructions: 'Which attribute sets how big the circle is?', lang: 'html', lines: ['<circle cx="60" cy="60" r="50" fill="#FF9F1C" />'], target: { line: 0, token: 'r' }, explain: 'r is the radius; cx and cy are the centre.' }),
    quiz({ prompt: 'Why avoid autoplaying video with sound?', options: ['It startles people and most browsers block it', 'It is illegal', 'It makes the video sharper', 'It breaks SVG'], right: 'Right. Let people press play.', wrong: 'Autoplay with sound is disruptive and usually blocked; show controls instead.' }),
  ],
  'h-a11y-1': [
    quiz({ prompt: 'What should do an action, like opening a menu?', options: ['<button>', '<a href="#">', '<div onclick>', '<span>'], right: 'Right. Buttons do things; links go places.', wrong: 'Actions use <button>; it is keyboard-accessible and announced correctly.', mono: true }),
    quiz({ prompt: '“Fields in red are wrong.” What is the problem?', options: ['Colour-blind users can’t tell which are red', 'Red is too bright', 'Nothing', 'Red slows the page'], right: 'Right. Add text or an icon too.', wrong: 'Never rely on colour alone: add a word like “Required” or an icon.' }),
    quiz({ prompt: 'What is the first rule of ARIA?', options: ['Use a native HTML element if one exists', 'Add ARIA to every element', 'Use role="button" on divs', 'Hide everything with aria-hidden'], right: 'Right. Native elements come with accessibility built in.', wrong: 'Prefer real HTML elements; ARIA is for gaps HTML can’t fill.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'This button has no accessible name. Tap it.', lang: 'html', lines: ['<button>🔍</button>'], bug: 0, fix: '<button aria-label="Search">🔍</button>', explain: 'An icon-only button needs aria-label (or visible text).' }),
  ],
  'h-head-1': [
    quiz({ prompt: 'Which tag makes a page fit a phone screen?', options: ['<meta name="viewport" content="width=device-width, initial-scale=1">', '<meta charset="utf-8">', '<title>', '<link rel="icon">'], right: 'Right.', wrong: 'The viewport meta tag sets the page width to the device width.', mono: true }),
    quiz({ prompt: 'What does <meta charset="utf-8"> do?', options: ['Makes characters like ₹ and Hindi show correctly', 'Speeds up the page', 'Adds a logo', 'Sets the language'], right: 'Right.', wrong: 'charset tells the browser how to read the text, so ₹ and हिंदी display properly.' }),
    quiz({ prompt: 'Which tag loads your CSS file?', options: ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<script href="style.css">', '<css>style.css</css>'], right: 'Right. rel="stylesheet" marks the linked file as CSS.', wrong: 'External CSS is loaded with <link rel="stylesheet" href="…">.', mono: true }),
    quiz({ prompt: 'Which helps search engines most?', options: ['Clear headings, useful text and good alt text', 'Repeating keywords 50 times', 'Hidden text', 'A long title with every keyword'], right: 'Right. Good content and structure win.', wrong: 'Keyword stuffing and hidden text hurt rankings. Clear, useful content helps.' }),
  ],
};
