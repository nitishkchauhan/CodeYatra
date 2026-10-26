// HTML, Lesson v3, Basic level, modules 4–12 and the project, built from the owner-approved draft
// (project-docs/content-drafts/html-basic-2.md). Same shape as modules 1–3 in htmlV3.ts.
import { group, hook, lesson, match, mistake, pageBuild, quiz, read, scenario, tryIt } from '../dsl';
import type { Lesson, Reading, WebStep } from '../types';

const LEARN = (n: number) => `LEARN · ${n} OF 3`;
const CHECK = 'QUICK CHECK';
const OOPS = 'COMMON MISTAKE';
const BUILD = 'SEE IT BUILD';
const REVIEWED = '2026-10-26';

const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: 'BUILD IT · HTML', ...o });
const mdn = (title: string, page: string): Reading => ({ title, url: `https://developer.mozilla.org/en-US/docs/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'MDN' });
const play = (title: string, instructions: string, html: string, ideas: string[], css?: string) =>
  tryIt({ kicker: 'TRY IT', title, instructions, lang: 'web', file: 'index.html', starter: html, files: css ? { html, css } : { html }, ideas });
const mod = (id: string, title: string, learned: [string, string, string], steps: Lesson['steps'], reading: Reading[], minutes = 8): Lesson => ({
  ...lesson(id, title, 'html', learned, steps, minutes),
  level: 'basic',
  reading,
});

// 4 ─────────────────────────────────────────────
const M4 = mod('h-attr-1', 'Attributes, ids and classes', ['Attributes add details inside the opening tag: name="value"', 'id names one unique element; class groups many', 'data-* attributes store extra information for JavaScript'], [
  hook({ kicker: 'MODULE 4 · HTML', title: 'Names for the parts of a page', story: 'In a class, every student has a unique roll number, and many students share a house colour. Web pages need the same idea: a unique name for one element and group names for many, so styles and buttons can find the right parts.', goal: 'Add attributes, and use id and class correctly.', lang: 'html', code: ['<p id="intro" class="note">Welcome!</p>'] }),
  read({ kicker: LEARN(1), title: 'What are attributes?', body: 'Attributes are extra details inside an opening tag, written name="value". You’ve used two already: href on links and src on images. id gives one element a unique name, and class puts elements into a group.', lang: 'html', code: ['<a href="fees.html">Fees</a>', '<p id="intro" class="note">Welcome!</p>'], anim: 'htmlTags' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Every “Add to cart” button on a shopping site shares a class, so they all look the same. “Jump to section” links on long FAQ pages use ids, like href="#refunds". Apps keep hidden details for scripts, such as a product’s ID, in data- attributes.', anim: 'linkJump' }),
  read({ kicker: LEARN(3), title: 'How they work', body: 'An id must be unique on the page; CSS finds it with #fees. A class can be shared, and one element can have several classes separated by spaces; CSS finds them with .price. data-… attributes hold your own information for JavaScript.', lang: 'html', code: ['<section id="fees">', '  <p class="price highlight">₹2,000 a month</p>', '  <p class="price">₹5,500 a term</p>', '</section>'], anim: 'htmlTags' }),
  play('Classes at work', 'This page has a little CSS, so you can see classes and ids in action. Tap a value to change it.', '<p class="price">₹2,000 a month</p>\n<p class="price highlight">₹5,500 a term</p>\n<p id="note">Fees include books.</p>\n', ['Which paragraphs share a style, and why?', 'What makes the last line a different colour?'], '.price { font-weight: bold; }\n.highlight { background: #FFF3CD; }\n#note { color: #4B3FD8; }\n'),
  pageBuild({ kicker: BUILD, title: 'Styles find their elements', instructions: 'Tap Next line and watch each class and id pick up its style.', html: ['<style>', '  .price { font-weight: bold; }', '  .highlight { background: #FFF3CD; }', '  #note { color: #4B3FD8; }', '</style>', '<p class="price">₹2,000 a month</p>', '<p class="price highlight">₹5,500 a term</p>', '<p id="note">Fees include books.</p>'], steps: [
    { line: 5, note: 'Three style rules: .price and .highlight for classes, #note for one id. Nothing shows yet.' },
    { line: 6, note: 'class="price": the .price rule makes it bold.' },
    { line: 7, note: 'Two classes at once, separated by a space: bold and highlighted.' },
    { line: 8, note: 'id="note": only this one element gets the #note colour.' },
  ] }),
  mistake({ kicker: OOPS, title: 'The same id twice', lang: 'html', note: 'What happens:', wrong: ['<p id="price">₹2,000</p>', '<p id="price">₹5,500</p>'], error: 'The page looks fine, but scripts and #price links only ever find the first one.', right: ['<p class="price">₹2,000</p>', '<p class="price">₹5,500</p>'], explain: 'An id must be unique. For a group of similar elements, use a class.' }),
  group({ kicker: CHECK, title: 'id or class?', instructions: 'Which fits each job?', groups: ['id', 'class'], items: [
    { text: 'The one main menu of the page', group: 0 },
    { text: 'All the “Buy” buttons', group: 1 },
    { text: 'A “Back to top” jump target', group: 0 },
    { text: 'Every price on the page', group: 1 },
    { text: 'The single sign-up form', group: 0 },
    { text: 'All the error messages', group: 1 },
  ], explain: 'One unique thing: id. Many things that share a style or behaviour: class.' }),
  quiz({ prompt: 'Several fee lines should share one style. What do you give them?', options: ['The same class', 'The same id', 'The same tag name only', 'A data-style attribute'], right: 'Right. A class can be shared by any number of elements.', wrong: 'ids must be unique. A shared class is how you group elements.' }),
  web({
    title: 'Label the route',
    instructions: 'Give the heading id="title", and give both station paragraphs class="stop".',
    starter: { html: '<h1>Route</h1>\n<p>Delhi</p>\n<p>Agra</p>\n' },
    solution: { html: '<h1 id="title">Route</h1>\n<p class="stop">Delhi</p>\n<p class="stop">Agra</p>\n' },
    checks: [
      { label: 'The heading has id="title"', file: 'html', pattern: /<h1[^>]*id="title"[^>]*>/ },
      { label: 'Both stations have class="stop"', file: 'html', pattern: /<p[^>]*class="stop"[^>]*>[\s\S]*<p[^>]*class="stop"[^>]*>/ },
    ],
    hint: '<h1 id="title">Route</h1> and <p class="stop">…</p> twice.',
  }),
], [mdn('HTML attribute reference', 'Web/HTML/Reference/Attributes'), mdn('Using data attributes', 'Web/HTML/How_to/Use_data_attributes')]);

// 5 ─────────────────────────────────────────────
const ROUTE = ['<h2>Rajdhani route</h2>', '<ol>', '  <li>New Delhi', '    <ul>', '      <li>Platform 16</li>', '    </ul>', '  </li>', '  <li>Kanpur</li>', '  <li>Prayagraj</li>', '  <li>Howrah</li>', '</ol>'];
const M5 = mod('h-list-1', 'Lists', ['<ul> for bullets, <ol> for numbered steps', 'Every item is an <li>', 'Lists can be nested for sub-points'], [
  hook({ kicker: 'MODULE 5 · HTML', title: 'Easy to scan', story: 'A recipe has ingredients (any order) and steps (in order). A train timetable has its stops in order. Lists make this kind of information quick to scan on a phone.', goal: 'Make bulleted, numbered and nested lists.', lang: 'html', code: ['<ol>', '  <li>Wash the poha</li>', '  <li>Fry the onion</li>', '</ol>'] }),
  read({ kicker: LEARN(1), title: 'What are lists?', body: 'HTML has two main lists. <ul>, an unordered list, shows bullets because order doesn’t matter. <ol>, an ordered list, shows numbers because it does. Each item inside either one is an <li>, a list item.', lang: 'html', code: ['<ul>', '  <li>Poha</li>', '  <li>Onion</li>', '</ul>'], anim: 'outline' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'The menu bar at the top of most websites is a <ul> of links. Step-by-step guides, like applying for a PAN card, use <ol>. Product features, search results and comment threads are lists too, and screen readers announce how many items they have.', anim: 'outline' }),
  read({ kicker: LEARN(3), title: 'How they work', body: 'Put each item in <li> inside the <ul> or <ol>. For sub-points, put a whole new list inside an <li>. <ol start="5"> begins counting at 5, which is handy when a list continues after a break.', lang: 'html', code: ['<ol>', '  <li>New Delhi', '    <ul><li>Platform 16</li></ul>', '  </li>', '  <li>Kanpur</li>', '</ol>'], anim: 'outline' }),
  play('A recipe', 'Tap a value to change it and watch the list.', '<h2>Poha</h2>\n<ul>\n  <li>2 cups poha</li>\n  <li>1 onion</li>\n</ul>\n<ol start="1">\n  <li>Wash the poha</li>\n  <li>Fry the onion</li>\n  <li>Mix and serve</li>\n</ol>\n', ['Why are the ingredients bullets but the steps numbers?', 'What does the start number change?']),
  pageBuild({ kicker: BUILD, title: 'A nested route', instructions: 'Tap Next line and watch the numbering and indentation appear.', html: ROUTE, steps: [
    { line: 2, note: '<ol> starts a numbered list.' },
    { line: 3, note: 'The first item, number 1: New Delhi.' },
    { line: 5, note: 'A whole <ul> inside that item: a bulleted sub-point, indented under it.' },
    { line: 8, note: 'Back in the main list: Kanpur is number 2.' },
    { line: 11, note: 'Four stops, in order, with one sub-point.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Text straight inside <ul>', lang: 'html', note: 'What the browser shows:', wrong: ['<ul>Poha Onion Salt</ul>'], error: 'No bullets, all on one line, and screen readers don’t announce a list.', right: ['<ul>', '  <li>Poha</li>', '  <li>Onion</li>', '  <li>Salt</li>', '</ul>'], explain: 'Every item needs its own <li>.' }),
  group({ kicker: CHECK, title: 'Ordered or unordered?', instructions: 'Sort each list.', groups: ['Ordered <ol>', 'Unordered <ul>'], items: [
    { text: 'Recipe steps', group: 0 },
    { text: 'Ingredients', group: 1 },
    { text: 'Train stops in order', group: 0 },
    { text: 'Features of a phone', group: 1 },
    { text: 'Top 10 rankings', group: 0 },
    { text: 'Things to pack for a trip', group: 1 },
  ], explain: 'If the order matters, number it.' }),
  quiz({ prompt: 'Which tag holds one item in a list?', options: ['<li>', '<item>', '<ul>', '<list>'], right: 'Right.', wrong: 'Each item is an <li>, inside a <ul> or <ol>.', mono: true }),
  web({
    title: 'The Rajdhani route',
    instructions: 'Make an ordered list of 4 stops: New Delhi, Kanpur, Prayagraj and Howrah. Under New Delhi, add a bulleted sub-list with “Platform 16”.',
    starter: { html: '<h2>Rajdhani route</h2>\n' },
    solution: { html: ROUTE.join('\n') + '\n' },
    checks: [
      { label: 'An ordered list with 4 stops', file: 'html', pattern: /<ol>(?:[\s\S]*?<li>){4}[\s\S]*<\/ol>/ },
      { label: 'A sub-list inside one stop', file: 'html', pattern: /<li>[^<]*<ul>[\s\S]*<li>[\s\S]*<\/ul>[\s\S]*<\/li>/ },
    ],
    hint: '<ol> with an <li> for each stop; inside the first <li>, put <ul><li>Platform 16</li></ul>.',
  }),
], [mdn('Lists', 'Learn_web_development/Core/Structuring_content/Lists')], 7);

// 6 ─────────────────────────────────────────────
const FARES = ['<table>', '  <caption>Fares from Delhi</caption>', '  <tr><th>Route</th><th>Fare</th></tr>', '  <tr><td>Delhi–Agra</td><td>₹450</td></tr>', '  <tr><td>Delhi–Jaipur</td><td>₹600</td></tr>', '</table>'];
const M6 = mod('h-table-1', 'Tables', ['<tr> rows, <th> header cells, <td> data cells', '<thead>, <tbody> and <caption> make tables clear and accessible', 'Tables are for data, never for page layout'], [
  hook({ kicker: 'MODULE 6 · HTML', title: 'Rows and columns', story: 'A school timetable, a mark sheet, an IRCTC fare chart: rows and columns are the clearest way to compare information, and HTML tables are built for exactly that.', goal: 'Build a clear table of data with headers and a caption.', lang: 'html', code: ['<tr><th>Name</th><th>Maths</th></tr>', '<tr><td>Asha</td><td>91</td></tr>'] }),
  read({ kicker: LEARN(1), title: 'What is a table?', body: 'A table arranges data in rows and columns. Each row is a <tr>. Inside rows are cells: <th> for header cells and <td> for data cells. <thead> and <tbody> group the header row and the data rows.', lang: 'html', code: ['<table>', '  <tr><th>Name</th><th>Maths</th></tr>', '  <tr><td>Asha</td><td>91</td></tr>', '</table>'], anim: 'outline' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Bank statements, exam results pages, cricket scorecards, price comparison pages and the dashboards companies use every day are all tables. Screen readers can read a cell together with its header, like “Maths, 91”, when the table is built properly.', anim: 'outline' }),
  read({ kicker: LEARN(3), title: 'How they work', body: '<caption> gives the table a title. Header cells label their column or row. colspan="2" makes a cell stretch across two columns. Keep tables for data only: for laying out a page, CSS is the right tool.', lang: 'html', code: ['<caption>Class 10 marks</caption>', '<tr><th>Name</th><th>Maths</th></tr>', '<tr><td colspan="2">No marks yet</td></tr>'], anim: 'htmlTags' }),
  play('A mark sheet', 'Tap a value to change a mark.', '<table>\n  <caption>Class 10 marks</caption>\n  <tr><th>Name</th><th>Maths</th><th>Science</th></tr>\n  <tr><td>Asha</td><td>91</td><td>88</td></tr>\n  <tr><td>Ravi</td><td>72</td><td>79</td></tr>\n</table>\n', ['Which row is the header, and how is it different?', 'What would colspan="3" do on one cell?']),
  pageBuild({ kicker: BUILD, title: 'Row by row', instructions: 'Tap Next line and watch the table grow.', html: FARES, steps: [
    { line: 2, note: 'The caption: a title for the whole table.' },
    { line: 3, note: 'The header row: <th> cells, shown bold.' },
    { line: 4, note: 'A data row: one <td> per column.' },
    { line: 6, note: 'Another row, and the table is complete.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A table for page layout', lang: 'html', note: 'What happens:', wrong: ['<table>', '  <tr><td>Menu links</td><td>Page content</td></tr>', '</table>'], error: 'On a phone the two columns squeeze or overflow, and screen readers read the whole page as a data grid.', right: ['<nav>Menu links</nav>', '<main>Page content</main>'], explain: 'Use meaningful tags for page parts and CSS for layout. Tables are only for data.' }),
  match({ kicker: CHECK, title: 'Match each tag', instructions: 'Tap a tag, then its job.', pairs: [['<table>', 'the whole grid'], ['<tr>', 'a row'], ['<th>', 'a header cell'], ['<td>', 'a data cell'], ['<caption>', 'the table’s title']], mono: true, explain: 'Rows hold cells; header cells label the data.' }),
  quiz({ prompt: 'What does <th> mark?', options: ['A header cell', 'A heading above the table', 'A table row', 'The top of the page'], right: 'Right. It labels a column or row.', wrong: '<th> is a header cell inside a row.', mono: true }),
  web({
    title: 'A fare table',
    instructions: 'Build a table with the caption “Fares from Delhi”, a header row (Route, Fare) and two data rows.',
    starter: { html: '<table>\n</table>\n' },
    solution: { html: FARES.join('\n') + '\n' },
    checks: [
      { label: 'A caption', file: 'html', pattern: /<caption>[^<]+<\/caption>/ },
      { label: 'A header row with two header cells', file: 'html', pattern: /<tr>\s*<th>[^<]+<\/th>\s*<th>[^<]+<\/th>\s*<\/tr>/ },
      { label: 'Two data rows', file: 'html', pattern: /<tr>\s*<td>[\s\S]*?<\/tr>[\s\S]*<tr>\s*<td>[\s\S]*?<\/tr>/ },
    ],
    hint: '<caption>…</caption>, then <tr><th>Route</th><th>Fare</th></tr>, then two <tr> rows of <td> cells.',
  }),
], [mdn('HTML table basics', 'Learn_web_development/Core/Structuring_content/HTML_table_basics'), mdn('Table accessibility', 'Learn_web_development/Core/Structuring_content/Table_accessibility')]);

// 7 ─────────────────────────────────────────────
const ORDER_FORM = ['<form action="/order" method="post">', '  <label for="name">Your name</label>', '  <input id="name" name="name" type="text">', '  <label for="phone">Phone</label>', '  <input id="phone" name="phone" type="tel">', '  <button type="submit">Place order</button>', '</form>'];
const M7 = mod('h-form-1', 'Forms and inputs', ['<form> collects input and sends it to action', 'Every input needs a <label>; name is what gets sent', 'The right type gives the right keyboard and basic checks'], [
  hook({ kicker: 'MODULE 7 · HTML', title: 'Let customers talk to you', story: 'Every sign-up, login, search box and order form is an HTML form. Riya’s customers should be able to send their name, phone number and order straight from her page.', goal: 'Build a form with labelled inputs that sends data.', lang: 'html', code: ['<label for="phone">Phone</label>', '<input id="phone" name="phone" type="tel">'] }),
  read({ kicker: LEARN(1), title: 'What is a form?', body: 'A form, <form>, collects information from the user and sends it somewhere. Inside it are inputs, <input>, for typing; each has a <label> saying what it is for; and a <button> sends everything.', lang: 'html', code: ['<form>', '  <label for="name">Your name</label>', '  <input id="name" name="name">', '  <button>Send</button>', '</form>'], anim: 'api' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Login pages, Google search, UPI payment screens, college admission forms, OTP boxes and the comment box under a video are all forms. On phones, the input’s type decides which keyboard appears: numbers for a phone field, @ for email.', anim: 'api' }),
  read({ kicker: LEARN(3), title: 'How they work', body: 'for on a label matches the input’s id, so tapping the label focuses the field. name is the key sent with each value. type (text, email, tel, number, password, date) changes the keyboard and adds simple checks. action says where the data goes.', lang: 'html', code: ORDER_FORM, anim: 'htmlTags' }),
  play('An order form', 'Tap a value to change it and look at the form.', '<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name" type="text">\n  <label for="seats">Tiffins</label>\n  <input id="seats" name="seats" type="number" min="1" max="10">\n  <button type="submit">Place order</button>\n</form>\n', ['What keyboard would a phone show for type="number"?', 'What is sent: the label text or the name?']),
  pageBuild({ kicker: BUILD, title: 'The form takes shape', instructions: 'Tap Next line to build the form.', html: ORDER_FORM, steps: [
    { line: 1, note: '<form> with action (where to send) and method (how).' },
    { line: 3, note: 'A label and its input, joined by for="name" and id="name".' },
    { line: 5, note: 'type="tel" makes phones show a number keypad.' },
    { line: 7, note: 'The submit button sends name=… and phone=… to /order.' },
  ] }),
  mistake({ kicker: OOPS, title: 'A placeholder instead of a label', lang: 'html', note: 'What happens:', wrong: ['<input type="text" placeholder="Name">'], error: 'The hint disappears as soon as you start typing, and screen readers may not say what the field is.', right: ['<label for="name">Name</label>', '<input id="name" name="name" type="text">'], explain: 'Every input needs a real <label>. A placeholder can add an example, but never replaces the label.' }),
  match({ kicker: CHECK, title: 'Which input type?', instructions: 'Tap what is collected, then the best type.', pairs: [['Email address', 'email'], ['Phone number', 'tel'], ['Password', 'password'], ['Date of birth', 'date'], ['Number of seats', 'number']], explain: 'The right type gives the right keyboard and basic checks for free.' }),
  quiz({ prompt: 'What does the name attribute do?', options: ['It is the key sent with the value to the server', 'It shows text on the page', 'It sets the field’s colour', 'It makes the field required'], right: 'Right. The server receives name=value.', wrong: 'name is the key the value is sent under.' }),
  web({
    title: 'Riya’s order form',
    instructions: 'Add a labelled name field, a labelled phone field with type="tel", and a submit button that says “Place order”.',
    starter: { html: '<form action="/order" method="post">\n</form>\n' },
    solution: { html: ORDER_FORM.join('\n') + '\n' },
    checks: [
      { label: 'A label linked to the name field', file: 'html', pattern: /<label for="name">[\s\S]*<input[^>]*id="name"/ },
      { label: 'A phone field with type="tel"', file: 'html', pattern: /<input[^>]*type="tel"/ },
      { label: 'A submit button', file: 'html', pattern: /<button[^>]*>\s*Place order\s*<\/button>/ },
    ],
    hint: '<label for="name">…</label><input id="name" name="name">, the same for phone with type="tel", then <button type="submit">Place order</button>.',
  }),
], [mdn('Your first form', 'Learn_web_development/Extensions/Forms/Your_first_form'), mdn('The <input> element', 'Web/HTML/Reference/Elements/input')], 9);

// 8 ─────────────────────────────────────────────
const BOOKING = ['<form>', '  <fieldset>', '    <legend>Class</legend>', '    <label><input type="radio" name="class" value="SL"> Sleeper</label>', '    <label><input type="radio" name="class" value="3A"> AC 3-tier</label>', '  </fieldset>', '  <label><input type="checkbox" name="meal" value="veg"> Veg meal</label>', '  <label for="mobile">Mobile</label>', '  <input id="mobile" name="mobile" type="tel" required pattern="[6-9][0-9]{9}">', '  <button type="submit">Book</button>', '</form>'];
const M8 = mod('h-inputs-1', 'Choices and validation', ['Radio: one choice (same name); checkbox: any number; select: pick from a list', 'required, types, min/max and pattern check input in the browser', 'Always check again on the server'], [
  hook({ kicker: 'MODULE 8 · HTML', title: 'Make the right answer easy', story: 'A train booking form asks for the coach class (one choice), meal preferences (several) and a valid mobile number. Good forms make choosing easy and catch mistakes before you press Book.', goal: 'Offer choices and check input before it is sent.', lang: 'html', code: ['<input type="radio" name="class" value="SL"> Sleeper', '<input type="tel" required pattern="[6-9][0-9]{9}">'] }),
  read({ kicker: LEARN(1), title: 'What are choices and validation?', body: 'Radio buttons pick one option from a group; checkboxes pick any number; a <select> dropdown picks from a list. Validation means checking answers: required, min and max, pattern, and types like email let the browser stop bad input.', lang: 'html', code: ['<select name="city">', '  <option>Pune</option>', '  <option>Jaipur</option>', '</select>'], anim: 'branch' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Size and colour pickers on shopping sites, survey forms, train class selection, “I agree to the terms” boxes, and OTP fields that must be exactly 6 digits all use these inputs and checks.', anim: 'error' }),
  read({ kicker: LEARN(3), title: 'How they work', body: 'Radio buttons in one group share the same name, so only one can be chosen. Wrap each in a <label> so tapping the words works. required blocks an empty field and pattern checks the format. People can switch browser checks off, so the server must check too.', lang: 'html', code: BOOKING.slice(1, 6), anim: 'branch' }),
  play('A booking form', 'Tap a value to change it, then try the form in the preview.', '<form>\n  <label><input type="radio" name="class" value="SL" checked> Sleeper</label>\n  <label><input type="radio" name="class" value="3A"> AC 3-tier</label>\n  <label for="seats">Seats</label>\n  <input id="seats" name="seats" type="number" min="1" max="6" required>\n  <button type="submit">Book</button>\n</form>\n', ['Can you choose both classes at once? Why not?', 'What happens if you type 9 seats and press Book?']),
  pageBuild({ kicker: BUILD, title: 'Choices and checks', instructions: 'Tap Next line to build the booking form.', html: BOOKING, steps: [
    { line: 3, note: '<fieldset> and <legend> group the class options under a title.' },
    { line: 5, note: 'Two radio buttons with the same name: picking one un-picks the other.' },
    { line: 7, note: 'A checkbox: on or off, on its own.' },
    { line: 9, note: 'required and pattern: an Indian mobile number, 10 digits starting 6 to 9.' },
    { line: 11, note: 'The browser checks everything when Book is pressed, before sending.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Radio buttons with different names', lang: 'html', note: 'What happens:', wrong: ['<input type="radio" name="class1" value="SL"> Sleeper', '<input type="radio" name="class2" value="3A"> AC'], error: 'Both can be selected at the same time, so the form sends two classes.', right: ['<input type="radio" name="class" value="SL"> Sleeper', '<input type="radio" name="class" value="3A"> AC'], explain: 'A group of radio buttons must share one name.' }),
  group({ kicker: CHECK, title: 'Radio, checkbox or select?', instructions: 'Which input fits each question?', groups: ['Radio', 'Checkbox', 'Select'], items: [
    { text: 'Pick one coach class (of 3)', group: 0 },
    { text: 'Choose any toppings', group: 1 },
    { text: 'Your state (of 28)', group: 2 },
    { text: 'I accept the terms', group: 1 },
    { text: 'Delivery: morning or evening', group: 0 },
    { text: 'Your city, from a long list', group: 2 },
  ], explain: 'Few options, one answer: radio. Any number: checkbox. A long list: select.' }),
  quiz({ prompt: 'A user switches off browser checks and submits bad data. What stops it?', options: ['Checks on the server', 'The required attribute', 'The placeholder', 'The label'], right: 'Right. Browser checks help honest users; the server protects the system.', wrong: 'Anything in the browser can be bypassed. The server must check again.' }),
  web({
    title: 'The booking form',
    instructions: 'Add a class choice with two radio buttons sharing name="class", a veg-meal checkbox, and a required mobile field (type="tel") with a 10-digit pattern.',
    starter: { html: '<form>\n  <button type="submit">Book</button>\n</form>\n' },
    solution: { html: BOOKING.join('\n') + '\n' },
    checks: [
      { label: 'Two radio buttons sharing name="class"', file: 'html', pattern: /type="radio" name="class"[\s\S]*type="radio" name="class"/ },
      { label: 'A checkbox', file: 'html', pattern: /<input[^>]*type="checkbox"/ },
      { label: 'A required mobile field with a pattern', file: 'html', pattern: /<input(?=[^>]*type="tel")(?=[^>]*required)(?=[^>]*pattern=")[^>]*>/ },
    ],
    hint: 'Two <input type="radio" name="class" …> in labels, an <input type="checkbox">, and <input type="tel" required pattern="[6-9][0-9]{9}">.',
  }),
], [mdn('Client-side form validation', 'Learn_web_development/Extensions/Forms/Form_validation'), mdn('Basic native form controls', 'Learn_web_development/Extensions/Forms/Basic_native_form_controls')], 9);

// 9 ─────────────────────────────────────────────
const LAYOUT = ['<header><h1>Riya’s Tiffins</h1></header>', '<nav><a href="#menu">Menu</a> <a href="#contact">Contact</a></nav>', '<main>', '  <section id="menu"><h2>Menu</h2><p>Dal rice ₹80</p></section>', '  <aside>Free delivery above ₹300</aside>', '</main>', '<footer>© 2026 Riya’s Tiffins, Pune</footer>'];
const M9 = mod('h-sem-1', 'Semantic page layout', ['Semantic tags describe what each part of the page is', 'One <main>; <section> groups, <article> stands alone', 'Use <div> only when no meaningful tag fits'], [
  hook({ kicker: 'MODULE 9 · HTML', title: 'A page with named parts', story: 'A newspaper has a masthead, sections, articles and a footer with its address. Websites have the same parts, and HTML has tags that say exactly what each part is.', goal: 'Structure a page with meaningful layout tags.', lang: 'html', code: ['<header> · <nav> · <main> · <footer>'] }),
  read({ kicker: LEARN(1), title: 'What is semantic HTML?', body: 'Semantic means “with meaning”. Instead of wrapping everything in <div>, semantic tags say what each part is for: <header>, <nav>, <main>, <section>, <article>, <aside> and <footer>.', lang: 'html', code: ['<header>…</header>', '<nav>…</nav>', '<main>…</main>', '<footer>…</footer>'], anim: 'outline' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'News and blog sites use <article> for each story, and every site’s menu is a <nav>. Google and screen readers use these regions to understand the page and jump around it, and the “reader mode” in browsers relies on them.', anim: 'outline' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'A page has one <main> for its unique content. <section> groups content on one theme; <article> is something that makes sense on its own, like a post; <aside> holds related side content. <div> is still fine for styling when nothing else fits.', lang: 'html', code: LAYOUT.slice(2, 6), anim: 'htmlTags' }),
  play('Riya’s page layout', 'Tap a value to change it and watch the page.', LAYOUT.join('\n') + '\n', ['Which part would a screen reader call “navigation”?', 'Why is the offer an <aside>?']),
  pageBuild({ kicker: BUILD, title: 'The landmark map', instructions: 'Tap Next line and watch each region of the page appear.', html: LAYOUT, steps: [
    { line: 1, note: '<header>: the top of the page, with the main heading.' },
    { line: 2, note: '<nav>: the main links. Screen readers announce it as “navigation”.' },
    { line: 4, note: 'Inside <main>, a <section> for the menu.' },
    { line: 5, note: '<aside>: related, but not the main content.' },
    { line: 7, note: '<footer>: the bottom information. Every region is named.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Everything in divs', lang: 'html', note: 'What happens:', wrong: ['<div class="header"><h1>Riya’s Tiffins</h1></div>', '<div class="menu"><a href="#menu">Menu</a></div>'], error: 'It looks the same, but screen readers and search engines see no structure: no header, no navigation.', right: ['<header><h1>Riya’s Tiffins</h1></header>', '<nav><a href="#menu">Menu</a></nav>'], explain: 'Use the tag that says what the part is.' }),
  match({ kicker: CHECK, title: 'Match each landmark', instructions: 'Tap a tag, then its job.', pairs: [['<header>', 'the top of the page'], ['<nav>', 'the main links'], ['<main>', 'the unique main content'], ['<article>', 'a stand-alone piece'], ['<aside>', 'related side content'], ['<footer>', 'the bottom information']], mono: true, explain: 'Each landmark tells everyone what that part of the page is.' }),
  quiz({ prompt: 'How many <main> elements should a page have?', options: ['One', 'One per section', 'None', 'As many as you like'], right: 'Right. It holds the page’s unique content.', wrong: 'A page has exactly one <main>.' }),
  web({
    title: 'From divs to meaning',
    instructions: 'Rebuild this page with <header>, <nav>, <main> and <footer> instead of divs.',
    starter: { html: '<div class="header"><h1>Riya’s Tiffins</h1></div>\n<div class="menu"><a href="#menu">Menu</a></div>\n<div class="content"><p>Fresh food daily.</p></div>\n<div class="bottom">© 2026</div>\n' },
    solution: { html: '<header><h1>Riya’s Tiffins</h1></header>\n<nav><a href="#menu">Menu</a></nav>\n<main><p>Fresh food daily.</p></main>\n<footer>© 2026</footer>\n' },
    checks: [
      { label: 'A <header>', file: 'html', pattern: /<header>[\s\S]*<\/header>/ },
      { label: 'The links inside <nav>', file: 'html', pattern: /<nav>[\s\S]*<a[\s\S]*<\/nav>/ },
      { label: 'A <main>', file: 'html', pattern: /<main>[\s\S]*<\/main>/ },
      { label: 'A <footer>', file: 'html', pattern: /<footer>[\s\S]*<\/footer>/ },
    ],
    hint: 'Replace each div with the landmark it really is: header, nav, main, footer.',
  }),
], [mdn('Structuring documents', 'Learn_web_development/Core/Structuring_content/Structuring_documents')]);

// 10 ────────────────────────────────────────────
const MEDIA = ['<h2>Welcome</h2>', '<video src="welcome.mp4" controls width="320" poster="cover.jpg"></video>', '<svg width="80" height="80" role="img" aria-label="Orange circle">', '  <circle cx="40" cy="40" r="36" fill="#FF9F1C" />', '</svg>'];
const M10 = mod('h-media', 'Audio, video and SVG', ['<video> and <audio> with controls play media', '<iframe> embeds YouTube videos and maps; give it a title', 'SVG draws sharp, scalable graphics with code'], [
  hook({ kicker: 'MODULE 10 · HTML', title: 'Sound, video and sharp icons', story: 'A coaching centre wants a short welcome video, a pronunciation clip for its English batch, and crisp icons that look sharp on every phone, from a cheap Android to a big tablet.', goal: 'Add video, audio, embeds and SVG graphics.', lang: 'html', code: ['<video src="welcome.mp4" controls></video>', '<svg><circle cx="20" cy="20" r="18" /></svg>'] }),
  read({ kicker: LEARN(1), title: 'What are media elements?', body: '<video> and <audio> play media files with built-in controls. <iframe> shows another page inside yours, like a YouTube video or a Google Map. SVG is a picture described with shapes in code, so it stays sharp at any size.', lang: 'html', code: ['<audio src="hello.mp3" controls></audio>'], anim: 'imageLoad' }),
  read({ kicker: LEARN(2), title: 'Where are they used?', body: 'Online course sites stream video lessons, podcasts use audio players, shops show product demo videos, and “Find us” pages embed maps. Almost every app’s menu icons are SVG, because one small file looks crisp on every screen.', anim: 'imageLoad' }),
  read({ kicker: LEARN(3), title: 'How they work', body: 'controls shows play and pause; poster shows an image before the video plays. Don’t autoplay with sound. Give every <iframe> a title saying what it is. An <svg> has a size, and shapes like <circle> and <rect> are placed with coordinates inside it.', lang: 'html', code: MEDIA.slice(1), anim: 'htmlTags' }),
  play('Draw with SVG', 'Tap a value to change the circle and watch it redraw.', '<svg width="200" height="120" role="img" aria-label="An orange circle and a blue square">\n  <circle cx="60" cy="60" r="45" fill="#FF9F1C" />\n  <rect x="120" y="25" width="65" height="70" fill="#4B3FD8" />\n</svg>\n', ['Which numbers move the square, and which resize it?', 'Why does SVG stay sharp when you zoom in?']),
  pageBuild({ kicker: BUILD, title: 'Media on the page', instructions: 'Tap Next line to add each piece.', html: MEDIA, steps: [
    { line: 1, note: 'A heading.' },
    { line: 2, note: 'A video box with play controls and a poster image (the files aren’t here, so the box is empty).' },
    { line: 4, note: 'An SVG canvas and a circle at (40, 40) with radius 36.' },
    { line: 5, note: 'The SVG is closed. One line of code drew a sharp shape.' },
  ] }),
  mistake({ kicker: OOPS, title: 'Autoplaying video with sound', lang: 'html', note: 'What happens:', wrong: ['<video src="ad.mp4" autoplay></video>'], error: 'Most phones block it, and the ones that don’t surprise users and use up their mobile data.', right: ['<video src="ad.mp4" controls poster="cover.jpg"></video>'], explain: 'Let people press play. Autoplay only muted, short clips, if at all.' }),
  match({ kicker: CHECK, title: 'Match each piece', instructions: 'Tap a tag or attribute, then its job.', pairs: [['<video>', 'plays a video file'], ['<audio>', 'plays a sound file'], ['<iframe>', 'another page inside this one'], ['<svg>', 'a drawing made of shapes'], ['controls', 'play and pause buttons']], mono: true, explain: 'Built-in elements give you working players with no extra code.' }),
  quiz({ prompt: 'Why use SVG for an icon?', options: ['It stays sharp at any size', 'It plays sound', 'It only loads on Wi-Fi', 'It can’t be styled'], right: 'Right. Shapes are redrawn at every size.', wrong: 'SVG is drawn from shapes, so it never gets blurry.' }),
  web({
    title: 'A welcome section',
    instructions: 'Add a video welcome.mp4 with controls and a poster cover.jpg, and an SVG with a circle in it.',
    starter: { html: '<h2>Welcome</h2>\n' },
    solution: { html: MEDIA.join('\n') + '\n' },
    checks: [
      { label: 'A video with controls and a poster', file: 'html', pattern: /<video(?=[^>]*controls)(?=[^>]*poster=")[^>]*>/ },
      { label: 'An SVG with a shape inside', file: 'html', pattern: /<svg[\s\S]*<(circle|rect)[\s\S]*<\/svg>/ },
    ],
    hint: '<video src="welcome.mp4" controls poster="cover.jpg"></video> and <svg …><circle cx="40" cy="40" r="36" /></svg>.',
  }),
], [mdn('Video and audio content', 'Learn_web_development/Core/Structuring_content/HTML_video_and_audio'), mdn('SVG tutorial', 'Web/SVG/Tutorials/SVG_from_scratch')]);

// 11 ────────────────────────────────────────────
const FIXED = ['<img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi">', '<label for="name">Name</label>', '<input id="name" name="name" type="text">', '<button type="button">Order now</button>', '<a href="menu.pdf">Download the menu (PDF)</a>'];
const M11 = mod('h-a11y-1', 'Accessible pages', ['Accessibility means everyone can use the page; correct HTML does most of the work', 'Alt text, labels, heading order, clear links, contrast and keyboard use are the core checks', 'Use real <button> and <a> elements, never clickable divs'], [
  hook({ kicker: 'MODULE 11 · HTML', title: 'A page for everyone', story: 'Millions of people in India and around the world use phones with screen readers, larger text or only a keyboard. A page built carefully works for all of them, and turns out easier for everyone else too.', goal: 'Find and fix the most common accessibility problems.', lang: 'html', code: ['<img src="thali.jpg" alt="A thali with dal and rice">', '<button>Order now</button>'] }),
  read({ kicker: LEARN(1), title: 'What is accessibility?', body: 'Accessibility, often written a11y, means building pages everyone can use: people who are blind or have low vision, can’t use a touch screen or mouse, are hard of hearing, or are reading in bright sunlight on an old phone. Most of it comes from writing correct HTML.', anim: 'outline' }),
  read({ kicker: LEARN(2), title: 'Where does it matter?', body: 'Government websites are expected to follow accessibility guidelines, and large companies test every release for them. Features made for accessibility, like captions and clear contrast, help everyone: watching a video on a noisy train, or reading outdoors.', anim: 'imageLoad' }),
  read({ kicker: LEARN(3), title: 'The core checks', body: 'Every meaningful image has alt text. Every input has a label. Headings go in order, with one h1. Link text says where it goes. Text contrasts with its background. Everything works with a keyboard, so actions use <button>, not a clickable <div>. And <html lang="en"> is set.', lang: 'html', code: FIXED, anim: 'htmlTags' }),
  play('Hear the page', 'Tap a value to change it. A screen reader reads the alt text and link text aloud.', '<h1>Riya’s Tiffins</h1>\n<img src="https://placehold.co/240x120/png?text=Thali" alt="A thali with dal, rice, roti and sabzi" width="240" height="120">\n<p><a href="menu.pdf">Download the menu (PDF)</a></p>\n<button type="button">Order now</button>\n', ['What would a screen reader say for the image?', 'Would “click here” make sense in a list of all the links?']),
  pageBuild({ kicker: BUILD, title: 'What a screen reader hears', instructions: 'Tap Next line. Each note is what a screen reader announces for that line.', html: FIXED, steps: [
    { line: 1, note: '“Image, a thali with dal, rice, roti and sabzi.”' },
    { line: 3, note: '“Name, edit text.” The label gives the field its name.' },
    { line: 4, note: '“Order now, button.” A real button can be reached with Tab and pressed with Enter.' },
    { line: 5, note: '“Link, download the menu (PDF).” It makes sense on its own.' },
  ] }),
  mistake({ kicker: OOPS, title: '“Click here” links', lang: 'html', note: 'What a screen-reader user hears in the list of links:', wrong: ['<a href="fees.pdf">Click here</a> for fees.', '<a href="menu.pdf">Click here</a> for the menu.'], error: '“Click here, click here”: no way to tell which link goes where.', right: ['<a href="fees.pdf">Download the fee list (PDF)</a>', '<a href="menu.pdf">Download the menu (PDF)</a>'], explain: 'Link text should say where the link goes, so it makes sense out of context.' }),
  group({ kicker: CHECK, title: 'Accessible or not?', instructions: 'Sort each one.', groups: ['Accessible', 'Needs a fix'], items: [
    { text: 'An image with alt describing it', group: 0 },
    { text: 'An input with only a placeholder', group: 1 },
    { text: 'A “button” made from a <div>', group: 1 },
    { text: 'Link text “Download the timetable”', group: 0 },
    { text: 'Light grey text on white', group: 1 },
    { text: '<html lang="en">', group: 0 },
  ], explain: 'Labels, real buttons, clear link text and good contrast make a page usable for everyone.' }),
  quiz({ prompt: 'What helps screen-reader users most on a link?', options: ['Text that says where it goes', 'Making it bold', 'A title attribute only', 'Making it red'], right: 'Right.', wrong: 'Clear link text is what gets read aloud.' }),
  web({
    title: 'Fix this page',
    instructions: 'This page has four problems. Give the image a real alt text, give the input a label, use a real <button>, and change the “Click here” link text.',
    starter: { html: '<img src="thali.jpg">\n<input type="text" placeholder="Name">\n<div class="button">Order now</div>\n<a href="menu.pdf">Click here</a>\n' },
    solution: { html: FIXED.join('\n') + '\n' },
    checks: [
      { label: 'The image has a real alt text', file: 'html', pattern: /<img[^>]*alt="[^"]{5,}"/ },
      { label: 'The input has a label', file: 'html', pattern: /<label for="name">[\s\S]*<input[^>]*id="name"/ },
      { label: 'A real <button>', file: 'html', pattern: /<button[^>]*>\s*Order now\s*<\/button>/ },
      { label: 'No “Click here” link', file: 'html', pattern: /^(?![\s\S]*>\s*[Cc]lick here\s*<)[\s\S]*<a [^>]*>[^<]+<\/a>/ },
    ],
    hint: 'alt="A thali with…", <label for="name">Name</label><input id="name">, <button type="button">Order now</button>, and link text like “Download the menu (PDF)”.',
  }),
], [mdn('HTML: a good basis for accessibility', 'Learn_web_development/Core/Accessibility/HTML'), mdn('WAI-ARIA basics', 'Learn_web_development/Core/Accessibility/WAI-ARIA_basics')], 9);

// 12 ────────────────────────────────────────────
const HEAD = ['<!DOCTYPE html>', '<html lang="en">', '<head>', '  <meta charset="utf-8">', '  <meta name="viewport" content="width=device-width, initial-scale=1">', '  <title>Riya’s Tiffins · Home food in Kothrud, Pune</title>', '  <meta name="description" content="Fresh veg tiffins delivered by 1 pm. Order on WhatsApp.">', '  <meta property="og:image" content="https://example.com/thali.jpg">', '</head>', '<body>', '  <h1>Riya’s Tiffins</h1>', '</body>', '</html>'];
const M12 = mod('h-head-1', 'The head, metadata and SEO', ['<head> describes the page; it isn’t shown in it', 'charset and viewport are needed on every page', 'A clear title, description and og: tags help search and sharing'], [
  hook({ kicker: 'MODULE 12 · HTML', title: 'Found on Google, nice on WhatsApp', story: 'When someone shares Riya’s page on WhatsApp, it should show a title, a short description and a photo, not a bare link. When someone searches “tiffin service Kothrud”, it should show up with a clear title. All of that comes from the head.', goal: 'Fill the head so a page fits phones, shows correctly and is found and shared.', lang: 'html', code: ['<title>Riya’s Tiffins · Home food in Kothrud, Pune</title>'] }),
  read({ kicker: LEARN(1), title: 'What is the head?', body: 'The <head> holds information about the page that isn’t shown in it: the title in the tab, the character set, how it fits on phones, a description, and details for link previews. SEO, search engine optimisation, means making a page easy for search engines to understand and show.', lang: 'html', code: ['<head>', '  <title>Riya’s Tiffins</title>', '</head>'], anim: 'webRequest' }),
  read({ kicker: LEARN(2), title: 'Where is it used?', body: 'The blue title and grey snippet of every Google result, every link preview on WhatsApp, Instagram and LinkedIn, and the icon when you add a site to your home screen all come from the head.', anim: 'webRequest' }),
  read({ kicker: LEARN(3), title: 'How it works', body: 'charset="utf-8" shows ₹ and Hindi correctly, and the viewport tag makes the page fit phones. A clear <title> and description help people choose your result. og: (Open Graph) tags control link previews, and rel="icon" sets the tab icon.', lang: 'html', code: HEAD.slice(3, 8), anim: 'htmlTags' }),
  play('Your search result', 'Tap a value to change it. The page itself stays the same: these lines only show in tabs, search and previews.', '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Riya’s Tiffins · Home food in Kothrud, Pune</title>\n</head>\n<body>\n  <h1>Riya’s Tiffins</h1>\n  <p>Open 9 am to 1 pm, 7 days a week.</p>\n</body>\n', ['Where would the title appear?', 'Why does a phone need the viewport line?']),
  pageBuild({ kicker: BUILD, title: 'Filling the head', instructions: 'Tap Next line. Most head lines change nothing you can see on the page: they work in the tab, search and previews.', html: HEAD, steps: [
    { line: 4, note: 'charset: ₹ and every language’s letters show correctly.' },
    { line: 5, note: 'viewport: the page fits the phone’s width instead of showing zoomed out.' },
    { line: 6, note: 'title: the tab name and the blue link in search results.' },
    { line: 7, note: 'description: the grey snippet under the result.' },
    { line: 8, note: 'og:image: the picture in WhatsApp and social previews.' },
    { line: 13, note: 'Only the body shows on the page itself.' },
  ] }),
  mistake({ kicker: OOPS, title: 'No viewport tag', lang: 'html', note: 'What happens on a phone:', wrong: ['<head>', '  <title>Riya’s Tiffins</title>', '</head>'], error: 'The page is drawn for a big screen and shrunk: tiny text that people have to pinch to read.', right: ['<head>', '  <meta name="viewport" content="width=device-width, initial-scale=1">', '  <title>Riya’s Tiffins</title>', '</head>'], explain: 'Add the viewport tag to every page.' }),
  match({ kicker: CHECK, title: 'Match each head tag', instructions: 'Tap a tag, then what it does.', pairs: [['<title>', 'tab and search-result title'], ['description', 'the search snippet'], ['viewport', 'fits the screen'], ['charset', 'shows all characters'], ['og:image', 'link-preview picture'], ['rel="icon"', 'the tab icon']], mono: true, explain: 'None of these show on the page, but all of them matter.' }),
  quiz({ prompt: 'What makes a page fit a phone screen?', options: ['The viewport meta tag', 'The title', 'charset', 'og:image'], right: 'Right.', wrong: 'The viewport tag tells phones to use the real screen width.', mono: true }),
  web({
    title: 'Complete the head',
    instructions: 'Add charset utf-8, the viewport tag, a descriptive title (not just “Home”), a description and an og:image.',
    starter: { html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n</head>\n<body>\n  <h1>Riya’s Tiffins</h1>\n</body>\n</html>\n' },
    solution: { html: HEAD.join('\n') + '\n' },
    checks: [
      { label: 'charset utf-8', file: 'html', pattern: /<meta charset="utf-8">/i },
      { label: 'The viewport tag', file: 'html', pattern: /name="viewport" content="width=device-width/ },
      { label: 'A descriptive title', file: 'html', pattern: /<title>(?!\s*Home\s*<)[^<]{8,}<\/title>/ },
      { label: 'A description', file: 'html', pattern: /<meta name="description" content="[^"]{10,}">/ },
      { label: 'A preview image', file: 'html', pattern: /<meta property="og:image" content="https?:\/\/[^"]+">/ },
    ],
    hint: '<meta charset="utf-8">, <meta name="viewport" content="width=device-width, initial-scale=1">, <title>…</title>, <meta name="description" content="…">, <meta property="og:image" content="https://…">.',
  }),
], [mdn('Webpage metadata', 'Learn_web_development/Core/Structuring_content/Webpage_metadata'), mdn('Viewport meta tag', 'Web/HTML/Guides/Viewport_meta_element')]);

export const HTML_BASIC_MORE: Record<string, Lesson> = { 'h-attr-1': M4, 'h-list-1': M5, 'h-table-1': M6, 'h-form-1': M7, 'h-inputs-1': M8, 'h-sem-1': M9, 'h-media': M10, 'h-a11y-1': M11, 'h-head-1': M12 };

// Project ───────────────────────────────────────
const P1 = ['<!DOCTYPE html>', '<html lang="en">', '<head>', '  <meta charset="utf-8">', '  <meta name="viewport" content="width=device-width, initial-scale=1">', '  <title>Sharma Classes · Maths and Science coaching in Jaipur</title>', '  <meta name="description" content="Class 9 to 12 coaching in Malviya Nagar, Jaipur. Small batches, weekly tests.">', '</head>', '<body>', '  <header><h1>Sharma Classes</h1></header>', '  <nav><a href="#courses">Courses</a> <a href="#enquire">Enquire</a></nav>', '  <main></main>', '  <footer>© 2026 Sharma Classes, Jaipur</footer>', '</body>', '</html>'];
const P2 = ['<main>', '  <section id="about">', '    <h2>About us</h2>', '    <p>Small batches for Class 9 to 12, with a test every week.</p>', '  </section>', '  <section id="courses">', '    <h2>Courses</h2>', '    <ul>', '      <li>Maths, Class 10</li>', '      <li>Physics, Class 12</li>', '    </ul>', '    <table>', '      <caption>Monthly fees</caption>', '      <tr><th>Course</th><th>Fee</th></tr>', '      <tr><td>Maths, Class 10</td><td>₹2,000</td></tr>', '      <tr><td>Physics, Class 12</td><td>₹2,500</td></tr>', '    </table>', '  </section>', '</main>'];
const P3 = ['<section id="enquire">', '  <h2>Enquire</h2>', '  <p><a href="tel:+919800000000">Call 98000 00000</a></p>', '  <form action="/enquire" method="post">', '    <label for="parent">Parent’s name</label>', '    <input id="parent" name="parent" type="text" required>', '    <label for="phone">Phone</label>', '    <input id="phone" name="phone" type="tel" required pattern="[6-9][0-9]{9}">', '    <label for="course">Course</label>', '    <select id="course" name="course">', '      <option>Maths, Class 10</option>', '      <option>Physics, Class 12</option>', '    </select>', '    <button type="submit">Send enquiry</button>', '  </form>', '</section>'];
const P4 = ['<h2>Our toppers</h2>', '<img src="toppers.jpg" alt="Three Class 12 toppers holding their result sheets" width="320" height="200">', '<p><a href="results-2026.pdf">Download the 2026 results (PDF)</a></p>', '<iframe src="https://www.google.com/maps?q=Malviya+Nagar+Jaipur&output=embed" title="Map of Sharma Classes in Malviya Nagar, Jaipur" width="320" height="200"></iframe>'];

export const HTML_PROJECT_V3: Lesson = {
  id: 'h-project',
  title: 'Project: a coaching centre landing page',
  kind: 'project',
  level: 'basic',
  minutes: 25,
  skill: 'html',
  learned: ['Built a complete, phone-friendly page from scratch', 'Added an accessible enquiry form with checks', 'Made it findable, shareable and usable by everyone'],
  reading: [mdn('Structuring a page of content', 'Learn_web_development/Core/Structuring_content/Structuring_a_page_of_content')],
  steps: [
    hook({ kicker: 'PROJECT · HTML', title: 'Sharma Classes goes online', story: 'Mr Sharma runs Sharma Classes in Jaipur. Parents keep asking about courses and fees on WhatsApp, and he wants one page he can share as a link. You’ll build it in four checked steps, using everything from the HTML track.', goal: 'A complete, accessible, phone-friendly landing page.', lang: 'html', code: ['<header> · <nav> · <main> (about, courses, enquiry) · <footer>'] }),
    scenario({ kicker: 'YOUR CLIENT', title: 'The brief', from: 'Mr Sharma · Sharma Classes, Jaipur', message: 'Parents should see who we are, our courses and fees, and be able to send an enquiry or call us. It must work well on their phones, and look good when I share the link on WhatsApp.', artifact: { kind: 'ticket', title: 'What the page needs', lines: ['A title and description for Google and WhatsApp', 'About us, courses and a fee table', 'Call button and an enquiry form', 'Photos with descriptions, and a map'] }, task: 'Step 1: the page skeleton, with a head that fits phones and a semantic body.' }),
    web({
      title: 'Step 1 · The skeleton',
      instructions: 'Fill the head (charset, viewport, a descriptive title, a description), then a body with a <header> containing an <h1>, a <nav> with links to #courses and #enquire, a <main> and a <footer>.',
      starter: { html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n</head>\n<body>\n</body>\n</html>\n' },
      solution: { html: P1.join('\n') + '\n' },
      checks: [
        { label: 'charset and viewport', file: 'html', pattern: /<meta charset="utf-8">[\s\S]*name="viewport"/i },
        { label: 'A title and description', file: 'html', pattern: /<title>[^<]{8,}<\/title>[\s\S]*<meta name="description" content="[^"]{10,}">/ },
        { label: '<header> with an <h1>', file: 'html', pattern: /<header>[\s\S]*<h1>[^<]+<\/h1>[\s\S]*<\/header>/ },
        { label: 'Links to #courses and #enquire in <nav>', file: 'html', pattern: /<nav>[\s\S]*href="#courses"[\s\S]*href="#enquire"[\s\S]*<\/nav>/ },
        { label: '<main> and <footer>', file: 'html', pattern: /<main>[\s\S]*<\/main>[\s\S]*<footer>[\s\S]*<\/footer>/ },
      ],
      hint: 'Head: charset, viewport, title, description. Body: header > h1, nav with two links, main, footer.',
    }),
    web({
      title: 'Step 2 · About, courses and fees',
      instructions: 'Inside <main>, add an About section with a heading and a paragraph, and a Courses section (id="courses") with a list of courses and a fee table that has a caption and a header row.',
      starter: { html: '<main>\n</main>\n' },
      solution: { html: P2.join('\n') + '\n' },
      checks: [
        { label: 'An About section with a heading and paragraph', file: 'html', pattern: /<section[^>]*>\s*<h2>[^<]+<\/h2>\s*<p>[^<]+<\/p>/ },
        { label: 'A Courses section with id="courses"', file: 'html', pattern: /<section id="courses">/ },
        { label: 'A list of courses', file: 'html', pattern: /<ul>(?:[\s\S]*?<li>){2}[\s\S]*<\/ul>/ },
        { label: 'A fee table with caption and header row', file: 'html', pattern: /<table>[\s\S]*<caption>[^<]+<\/caption>[\s\S]*<th>[\s\S]*<\/table>/ },
      ],
      hint: 'Two <section>s. In the second: <ul> with <li> items, then <table> with <caption>, a <tr> of <th>, and <tr> rows of <td>.',
    }),
    web({
      title: 'Step 3 · Call and enquire',
      instructions: 'Make the enquiry section (id="enquire"): a tap-to-call link, and a form with a labelled required parent’s name, a labelled required phone (type="tel" with a 10-digit pattern), a course <select>, and a submit button.',
      starter: { html: '<section id="enquire">\n  <h2>Enquire</h2>\n</section>\n' },
      solution: { html: P3.join('\n') + '\n' },
      checks: [
        { label: 'A tap-to-call link', file: 'html', pattern: /<a[^>]*href="tel:\+91\d{10}"/ },
        { label: 'Labelled, required name and phone', file: 'html', pattern: /<label for="parent">[\s\S]*<input(?=[^>]*id="parent")(?=[^>]*required)[^>]*>[\s\S]*<label for="phone">[\s\S]*<input(?=[^>]*type="tel")(?=[^>]*required)(?=[^>]*pattern=")[^>]*>/ },
        { label: 'A course dropdown', file: 'html', pattern: /<select[^>]*>[\s\S]*<option>[\s\S]*<\/select>/ },
        { label: 'A submit button', file: 'html', pattern: /<button type="submit">[^<]+<\/button>/ },
      ],
      hint: '<a href="tel:+91…">, then a <form> with label + input pairs, a <select> of <option>s and <button type="submit">.',
    }),
    web({
      title: 'Step 4 · The accessibility pass',
      instructions: 'Add the toppers photo with a real description, a results link whose text says what it is, and a map iframe with a title.',
      starter: { html: '<h2>Our toppers</h2>\n<img src="toppers.jpg">\n<p><a href="results-2026.pdf">Click here</a></p>\n' },
      solution: { html: P4.join('\n') + '\n' },
      checks: [
        { label: 'The photo has a real description', file: 'html', pattern: /<img[^>]*alt="[^"]{10,}"/ },
        { label: 'The link says what it opens', file: 'html', pattern: /<a href="results-2026\.pdf">(?!\s*[Cc]lick here)[^<]{8,}<\/a>/ },
        { label: 'A map with a title', file: 'html', pattern: /<iframe(?=[^>]*title="[^"]{5,}")[^>]*>/ },
      ],
      hint: 'alt="Three Class 12 toppers…", link text “Download the 2026 results (PDF)”, and <iframe … title="Map of …">.',
    }),
  ],
};
