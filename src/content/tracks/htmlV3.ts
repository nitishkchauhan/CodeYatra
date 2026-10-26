// HTML, Lesson v3, Basic level. Modules 1–3 are rewritten from the owner-approved draft
// (project-docs/content-drafts/html-basic.md): what it is → where it’s used → how it works → try it →
// see it build → mistake → sort or match → check → build it. The other modules keep their v2 lessons
// for now, marked Basic, until their drafts are approved.
import { group, hook, lesson, match, mistake, pageBuild, quiz, read, tryIt } from '../dsl';
import type { Lesson, Reading, WebStep } from '../types';
import { HTML_FOUNDATIONS } from './htmlFoundations';

const LEARN = (n: number) => `LEARN · ${n} OF 3`;
const CHECK = 'QUICK CHECK';
const REVIEWED = '2026-10-26';

const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: 'BUILD IT · HTML', ...o });
const mdn = (title: string, page: string): Reading => ({ title, url: `https://developer.mozilla.org/en-US/docs/${page}`, kind: 'docs', reviewed: REVIEWED, version: 'MDN' });
const play = (title: string, instructions: string, html: string, ideas: string[]) => tryIt({ kicker: 'TRY IT', title, instructions, lang: 'web', file: 'index.html', starter: html, files: { html }, ideas });
const mod = (id: string, title: string, learned: [string, string, string], steps: Lesson['steps'], reading: Reading[], minutes = 8): Lesson => ({
  ...lesson(id, title, 'html', learned, steps, minutes),
  level: 'basic',
  reading,
});

const MENU_PAGE = ['<!DOCTYPE html>', '<html lang="en">', '  <head>', '    <title>Riya’s Tiffins</title>', '  </head>', '  <body>', '    <h1>Riya’s Tiffins</h1>', '    <p>Dal rice ₹80</p>', '    <p>Order on WhatsApp</p>', '  </body>', '</html>'];

const M1 = mod('w-html-1', 'What is HTML? Your first web page', ['HTML labels content so the browser knows what each part is', 'A tag has an opening and a closing part: <p>…</p>', 'A page has <!DOCTYPE html>, <html>, <head> (about the page) and <body> (what you see)'], [
  hook({
    kicker: 'MODULE 1 · HTML',
    title: 'A menu everyone can open',
    story: 'Riya’s mother runs a tiffin service in Pune. Customers keep asking on WhatsApp for the menu and prices. One simple web page, which anyone can open on their phone, would answer them all. Every web page in the world starts the same way, and today you’ll build one.',
    goal: 'Say what HTML and a browser are, and build a complete small page.',
    lang: 'html',
    code: ['<h1>Riya’s Tiffins</h1>', '<p>Dal rice ₹80</p>'],
  }),
  read({
    kicker: LEARN(1),
    title: 'What is HTML?',
    body: 'HTML (HyperText Markup Language) tells a browser what each part of a page is: this is a heading, this is a paragraph, this is a picture. It doesn’t calculate anything. It labels content, so the browser knows how to show it.',
    lang: 'html',
    code: ['<h1>Riya’s Tiffins</h1>', '<p>Fresh home food, delivered by 1 pm.</p>'],
    anim: 'htmlTags',
  }),
  read({
    kicker: LEARN(2),
    title: 'Where is it used?',
    body: 'Every website is built on HTML: the IRCTC booking page, a YouTube video page, your school’s website, the Zomato menu you scroll, even emails from your bank. Many apps show HTML inside them too. On a computer, “View page source” shows the HTML behind any page.',
    anim: 'htmlTags',
  }),
  read({
    kicker: LEARN(3),
    title: 'Tags and the browser',
    body: 'Content goes between an opening tag and a closing tag with a slash: <p>Dal rice ₹80</p>. When you open a site, your browser (Chrome, Safari) asks a server for the page, gets this HTML text back and draws it.',
    lang: 'html',
    code: ['<p>Dal rice ₹80</p>', '<!-- opening tag, content, closing tag -->'],
    anim: 'webRequest',
  }),
  play('Riya’s menu', 'Tap a highlighted value to change it and watch the page update.', '<h1>Riya’s Tiffins</h1>\n<p>Dal rice ₹80</p>\n<p>Rajma chawal ₹90</p>\n<p>Order on WhatsApp</p>\n', ['Which line is the heading, and how can you tell?', 'What would change if the heading were a <p>?']),
  pageBuild({
    kicker: 'SEE IT BUILD',
    title: 'How the browser builds the page',
    instructions: 'Tap Next line to watch the browser read the page from the top, one line at a time.',
    html: MENU_PAGE,
    steps: [
      { line: 1, note: '<!DOCTYPE html> tells the browser this is a modern HTML page.' },
      { line: 2, note: '<html> starts the whole page. lang="en" says it’s in English, for screen readers.' },
      { line: 4, note: 'Inside <head>, the <title> is the name shown in the browser tab, not on the page.' },
      { line: 6, note: '<body> starts everything you actually see.' },
      { line: 7, note: 'The <h1> heading appears, big and bold: the page’s main title.' },
      { line: 8, note: 'A <p> paragraph appears below it.' },
      { line: 9, note: 'Another paragraph. Each <p> starts on its own line.' },
      { line: 11, note: '</html> closes the page. That’s a complete web page.' },
    ],
  }),
  mistake({
    kicker: 'COMMON MISTAKE',
    title: 'Forgetting the closing tag',
    lang: 'html',
    note: 'What the browser shows:',
    wrong: ['<h1>Riya’s Tiffins', '<p>Dal rice ₹80</p>'],
    error: 'The price shows up huge and bold, as part of the heading, because the browser never saw where the heading ends.',
    right: ['<h1>Riya’s Tiffins</h1>', '<p>Dal rice ₹80</p>'],
    explain: 'The closing tag, with its slash, tells the browser where the heading stops.',
  }),
  group({
    kicker: CHECK,
    title: 'In the head or in the body?',
    instructions: 'Tap where each item belongs.',
    groups: ['<head>', '<body>'],
    items: [
      { text: 'The title in the browser tab', group: 0 },
      { text: 'The menu heading', group: 1 },
      { text: 'A paragraph about delivery times', group: 1 },
      { text: 'Information for search engines', group: 0 },
      { text: 'A photo of the thali', group: 1 },
      { text: 'The character set (<meta charset="utf-8">)', group: 0 },
    ],
    explain: '<head> is information about the page; <body> is everything people see.',
  }),
  quiz({
    prompt: 'What does this page show?',
    lang: 'html',
    code: ['<h1>Menu</h1>', '<p>Poha ₹30</p>'],
    options: ['A big heading “Menu” with “Poha ₹30” below it', 'The text <h1>Menu</h1> exactly as typed', 'Only “Poha ₹30”', 'An error message'],
    right: 'Right. Tags are instructions; the browser shows the content, not the tags.',
    wrong: 'The browser reads the tags and shows only the content inside them.',
  }),
  web({
    title: 'Riya’s menu page',
    instructions: 'Finish the page: “Riya’s Tiffins” as the title in the tab, one main heading, and two menu lines as paragraphs, all inside the body.',
    starter: { html: '<!DOCTYPE html>\n<html lang="en">\n  <head></head>\n  <body></body>\n</html>\n' },
    solution: { html: MENU_PAGE.join('\n') + '\n' },
    checks: [
      { label: 'The tab title says Riya’s Tiffins', file: 'html', pattern: /<head>[\s\S]*<title>\s*Riya’s Tiffins\s*<\/title>[\s\S]*<\/head>/ },
      { label: 'Exactly one main heading', file: 'html', pattern: /^(?![\s\S]*<h1>[\s\S]*<h1>)[\s\S]*<body>[\s\S]*<h1>[^<]+<\/h1>[\s\S]*<\/body>/ },
      { label: 'Two paragraphs', file: 'html', pattern: /<body>[\s\S]*<p>[^<]+<\/p>[\s\S]*<p>[^<]+<\/p>[\s\S]*<\/body>/ },
    ],
    hint: 'Put <title>Riya’s Tiffins</title> in the head, then <h1>…</h1> and two <p>…</p> in the body.',
  }),
], [mdn('What is HTML? (Basic HTML syntax)', 'Learn_web_development/Core/Structuring_content/Basic_HTML_syntax'), mdn('How the web works', 'Learn_web_development/Getting_started/Web_standards/How_the_web_works')]);

const NOTICE = ['<h1>Annual Day 2026</h1>', '<h2>Timings</h2>', '<p>Gates open at <strong>5 pm</strong>.</p>', '<h2>Dress code</h2>', '<h3>Juniors</h3>', '<p>School uniform, <em>please</em>.</p>'];

const M2 = mod('h-text', 'Headings, paragraphs and text', ['Headings h1–h6 form the page’s outline: one h1, then levels in order', '<p> for paragraphs; <br> only for real line breaks', '<strong> means important, <em> means stressed'], [
  hook({
    kicker: 'MODULE 2 · HTML',
    title: 'Easy to read at a glance',
    story: 'A school notice board is easy to read because it has a big title, smaller section titles and short paragraphs. A web page works the same way, and students, Google and people who use screen readers all rely on that structure to find what they need.',
    goal: 'Structure text with headings, paragraphs and meaningful emphasis.',
    lang: 'html',
    code: ['<h1>Annual Day 2026</h1>', '<h2>Timings</h2>', '<p>Gates open at <strong>5 pm</strong>.</p>'],
  }),
  read({
    kicker: LEARN(1),
    title: 'What are headings and paragraphs?',
    body: 'Headings are titles for the page and its sections. HTML has six sizes, from <h1> (most important) to <h6>. Paragraphs, <p>, hold blocks of normal text. Together they form an outline, like a book’s chapters and sub-chapters.',
    lang: 'html',
    code: ['<h1>Annual Day 2026</h1>', '<h2>Timings</h2>', '<p>Gates open at 5 pm.</p>'],
    anim: 'outline',
  }),
  read({
    kicker: LEARN(2),
    title: 'Where is it used?',
    body: 'On news sites the headline is the h1 and each section an h2. Google reads headings to understand what a page is about. Blind users’ screen readers let them jump from heading to heading, like skipping through chapters.',
    anim: 'outline',
  }),
  read({
    kicker: LEARN(3),
    title: 'Using them well',
    body: 'Use one <h1> for the main title, then <h2> for sections and <h3> inside them; don’t skip levels to get a smaller size. Browsers ignore extra spaces and new lines, so use <br> only for real line breaks. <strong> means important; <em> means stressed.',
    lang: 'html',
    code: ['<p>Gates open at <strong>5 pm</strong>.</p>', '<p>Please <em>don’t</em> be late.</p>', '<p>12 MG Road<br>Indore</p>'],
    anim: 'htmlTags',
  }),
  play('A school notice', 'Tap a highlighted value to change it and watch the notice update.', NOTICE.join('\n') + '\n', ['Which headings belong to which section?', 'What does <strong> change, besides making text bold?']),
  pageBuild({
    kicker: 'SEE IT BUILD',
    title: 'The outline grows',
    instructions: 'Tap Next line and watch the notice and its outline build up.',
    html: NOTICE,
    steps: [
      { line: 1, note: 'One <h1>: the main title of the whole page.' },
      { line: 2, note: 'An <h2> starts the first section.' },
      { line: 3, note: 'A paragraph in that section. <strong> marks the time as important.' },
      { line: 4, note: 'Another <h2>: a second section at the same level.' },
      { line: 5, note: 'An <h3> is a sub-section inside “Dress code”.' },
      { line: 6, note: '<em> stresses “please”, the way you’d say it aloud.' },
    ],
  }),
  mistake({
    kicker: 'COMMON MISTAKE',
    title: 'Using headings for size',
    lang: 'html',
    note: 'What a screen reader user hears:',
    wrong: ['<h1>Annual Day 2026</h1>', '<h4>Important: fees due Friday</h4>', '<p>Pay at the office.</p>'],
    error: 'A new section seems to start four levels deep, so the outline breaks, just to make text small and bold.',
    right: ['<h1>Annual Day 2026</h1>', '<p><strong>Important:</strong> fees due Friday.</p>', '<p>Pay at the office.</p>'],
    explain: 'Headings are for structure. To mark something as important, use <strong>; sizes come from CSS.',
  }),
  match({
    kicker: CHECK,
    title: 'Match each tag to its meaning',
    instructions: 'Tap a tag, then what it means.',
    pairs: [
      ['<h1>', 'the main title of the page'],
      ['<h2>', 'a section title'],
      ['<p>', 'a paragraph'],
      ['<strong>', 'important text'],
      ['<em>', 'stressed text'],
      ['<br>', 'a line break inside text'],
    ],
    mono: true,
    explain: 'Each tag says what the text is, not just how it looks.',
  }),
  quiz({
    prompt: 'How many <h1> headings should a normal page have?',
    options: ['One', 'As many as you like', 'None', 'One per paragraph'],
    right: 'Right. Sections below it use <h2>, <h3> and so on.',
    wrong: 'One <h1> names the page; sections use <h2> and below.',
  }),
  web({
    title: 'An exam notice',
    instructions: 'Make an <h1> “Exam Notice”, an <h2> “Timetable” and an <h2> “Rules”. Under Rules add a paragraph with <strong>No phones</strong>.',
    starter: { html: '<h1>Exam Notice</h1>\n' },
    solution: { html: '<h1>Exam Notice</h1>\n<h2>Timetable</h2>\n<p>Maths on Monday.</p>\n<h2>Rules</h2>\n<p><strong>No phones</strong> in the hall.</p>\n' },
    checks: [
      { label: 'An <h2> “Timetable”', file: 'html', pattern: /<h2>\s*Timetable\s*<\/h2>/ },
      { label: 'An <h2> “Rules”', file: 'html', pattern: /<h2>\s*Rules\s*<\/h2>/ },
      { label: 'A paragraph with <strong>No phones</strong>', file: 'html', pattern: /<p>[^]*<strong>\s*No phones\s*<\/strong>[^]*<\/p>/ },
    ],
    hint: '<h2>Rules</h2> then <p><strong>No phones</strong> in the hall.</p>',
  }),
], [mdn('Headings and paragraphs', 'Learn_web_development/Core/Structuring_content/Headings_and_paragraphs'), mdn('Emphasis and importance', 'Learn_web_development/Core/Structuring_content/Emphasis_and_importance')]);

const CONTACT = ['<h2>Contact</h2>', '<p><a href="menu.html">See today’s menu</a></p>', '<p><a href="tel:+919800000000">Call us</a></p>', '<img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi" width="300" height="200">'];

const M3 = mod('w-html-2', 'Links and images', ['<a href="…"> makes a link; relative addresses link within your site, full ones go to other sites', '<img src="…" alt="…"> shows an image, and alt describes it', 'tel: and mailto: links call or email with one tap'], [
  hook({
    kicker: 'MODULE 3 · HTML',
    title: 'The “web” part',
    story: 'Riya’s tiffin page needs a “Call us” link, a link to her menu page and a photo of the thali, so customers can see what they’re ordering. Links are what make the web a web: every page connects to others.',
    goal: 'Link pages together and add images that everyone can understand.',
    lang: 'html',
    code: ['<a href="menu.html">See today’s menu</a>', '<img src="thali.jpg" alt="A thali with dal and rice">'],
  }),
  read({
    kicker: LEARN(1),
    title: 'What are links and images?',
    body: 'A link, <a> for “anchor”, is text you tap to go somewhere: another page, another site, a phone number or an email. An image, <img>, shows a picture. Both use attributes, extra details inside the opening tag like href="…" and src="…".',
    lang: 'html',
    code: ['<a href="menu.html">See today’s menu</a>', '<img src="thali.jpg" alt="A thali">'],
    anim: 'linkJump',
  }),
  read({
    kicker: LEARN(2),
    title: 'Where are they used?',
    body: 'Menus and every “Read more” on news sites are links. Product photos on shopping sites are <img> tags. tel: and mailto: links let you tap to call or email, common on Indian business pages. Alt text is read aloud to blind users and shown when an image fails on slow internet.',
    anim: 'imageLoad',
  }),
  read({
    kicker: LEARN(3),
    title: 'How they work',
    body: 'href is where a link goes. menu.html is a relative address (a page next to this one); https://… is a full address (another site). <img> has no closing tag: src is the file and alt describes it in words. Use target="_blank" only when a new tab really helps.',
    lang: 'html',
    code: ['<a href="https://www.irctc.co.in">Book a train</a>', '<a href="tel:+919800000000">Call us</a>', '<img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi">'],
    anim: 'linkJump',
  }),
  play('Links and a photo', 'Tap a highlighted value to change it and watch the page.', '<p><a href="https://developer.mozilla.org">Learn on MDN</a></p>\n<p><a href="tel:+919800000000">Call the office</a></p>\n<img src="https://placehold.co/300x150/png?text=Thali" alt="A placeholder picture of a thali" width="300" height="150">\n', ['What does the alt text say, and who hears it?', 'Which link opens the phone app?']),
  pageBuild({
    kicker: 'SEE IT BUILD',
    title: 'Links and an image appear',
    instructions: 'Tap Next line to watch the contact section build.',
    html: CONTACT,
    steps: [
      { line: 1, note: 'A section heading.' },
      { line: 2, note: 'A link. menu.html is relative: the browser looks for it next to this page.' },
      { line: 3, note: 'A tel: link. On a phone, tapping it opens the dialler with the number.' },
      { line: 4, note: 'The browser downloads thali.jpg. If it can’t (it isn’t here), it shows the alt text instead.' },
    ],
  }),
  mistake({
    kicker: 'COMMON MISTAKE',
    title: 'Missing or useless alt text',
    lang: 'html',
    note: 'What a screen reader announces:',
    wrong: ['<img src="thali.jpg">', '<img src="thali.jpg" alt="image">'],
    error: '“image, thali.jpg” and “image, image”: neither says what the picture shows. On slow internet the customer sees a broken box.',
    right: ['<img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi">'],
    explain: 'Alt text should say what the picture shows and why it’s there.',
  }),
  group({
    kicker: CHECK,
    title: 'Relative or full address?',
    instructions: 'Sort each address.',
    groups: ['Relative (my site)', 'Full (another site)'],
    items: [
      { text: 'menu.html', group: 0 },
      { text: 'https://www.google.com', group: 1 },
      { text: 'images/thali.jpg', group: 0 },
      { text: 'https://maps.google.com/?q=Pune', group: 1 },
      { text: '../index.html', group: 0 },
      { text: 'https://wa.me/919800000000', group: 1 },
    ],
    mono: true,
    explain: 'Full addresses start with https:// and go to another site; relative ones find files from this page.',
  }),
  quiz({
    prompt: 'Which tag shows an image?',
    options: ['<img src="thali.jpg" alt="Thali">', '<image href="thali.jpg">', '<a src="thali.jpg">', '<picture="thali.jpg">'],
    right: 'Right. <img> with src for the file and alt for the description.',
    wrong: 'Images use <img>, with src and alt.',
    mono: true,
  }),
  web({
    title: 'A contact section',
    instructions: 'Add a link with the text “See today’s menu” to menu.html, a tap-to-call link to tel:+919800000000, and the image thali.jpg with alt text that describes the thali.',
    starter: { html: '<h2>Contact</h2>\n' },
    solution: { html: CONTACT.join('\n') + '\n' },
    checks: [
      { label: 'A link to menu.html', file: 'html', pattern: /<a[^>]*href="menu\.html"[^>]*>\s*See today’s menu\s*<\/a>/ },
      { label: 'A tap-to-call link', file: 'html', pattern: /<a[^>]*href="tel:\+919800000000"/ },
      { label: 'The photo with a real description', file: 'html', pattern: /<img(?=[^>]*src="thali\.jpg")(?=[^>]*alt="(?!image")[^"]{8,}")[^>]*>/ },
    ],
    hint: '<a href="menu.html">See today’s menu</a>, <a href="tel:+919800000000">Call us</a>, <img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi">',
  }),
], [mdn('Creating links', 'Learn_web_development/Core/Structuring_content/Creating_links'), mdn('HTML images', 'Learn_web_development/Core/Structuring_content/HTML_images')], 9);

const REWRITTEN: Record<string, Lesson> = { 'w-html-1': M1, 'h-text': M2, 'w-html-2': M3 };

/** The HTML Basic level: modules 1–3 rewritten for v3, the rest kept as they are and marked Basic. */
export const HTML_BASIC: Lesson[] = HTML_FOUNDATIONS.map((l) => REWRITTEN[l.id] ?? { ...l, level: 'basic' });
