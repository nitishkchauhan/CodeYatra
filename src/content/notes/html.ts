// Module notes for the HTML track. Each worked example's `output` is the text the page shows; tests check it.
import type { ModuleNotes } from '../types';

export const HTML_NOTES: Record<string, ModuleNotes> = {
  'w-html-1': {
    minutes: 5,
    lang: 'html',
    sections: [
      { heading: 'Markup, not programming', body: 'HTML labels content: a heading, a paragraph, a list, a link. It doesn’t add numbers or make decisions; that is JavaScript’s job. CSS decides how things look. Think of a web page as a house: HTML is the walls and rooms, CSS is the paint and furniture, and JavaScript is the electricity that makes things work.', code: ['<h1>Riya’s Tiffins</h1>', '<p>Fresh home food, delivered by 1 pm.</p>'], anim: 'htmlTags' },
      { heading: 'What happens when you open a site', body: 'You type an address (a URL) or tap a link. Your browser finds the server for that address and sends a request. The server sends back an HTML file. The browser reads it from top to bottom, fetches any images, styles and scripts it mentions, and draws the page. All of this usually takes less than a second.', anim: 'webRequest' },
      { heading: 'The skeleton of every page', body: '<!DOCTYPE html> comes first and says “modern HTML”. <html lang="en"> wraps everything. <head> holds information about the page that isn’t shown on it, like the <title> in the browser tab. <body> holds everything visitors see. Elements sit inside each other like boxes inside boxes, and must close in the reverse order they opened.', code: ['<!DOCTYPE html>', '<html lang="en">', '  <head><title>…</title></head>', '  <body>…</body>', '</html>'], anim: 'outline' },
    ],
    example: {
      title: 'Riya’s menu page',
      code: ['<!DOCTYPE html>', '<html lang="en">', '  <head>', '    <title>Riya’s Tiffins</title>', '  </head>', '  <body>', '    <h1>Riya’s Tiffins</h1>', '    <p>Dal rice ₹80</p>', '    <p>Order on WhatsApp</p>', '  </body>', '</html>'],
      walk: [
        { line: 1, text: 'The doctype tells the browser to use modern HTML rules.' },
        { line: 4, text: 'The title appears in the browser tab and in search results, not on the page.' },
        { line: 7, text: 'One main heading: the name of the page.' },
        { line: 8, text: 'Each paragraph starts on a new line.' },
      ],
      output: ['Riya’s Tiffins', 'Dal rice ₹80', 'Order on WhatsApp'],
    },
    industry: 'Front-end developers write HTML in every project, often inside frameworks like React. Search engines, screen readers and browser features such as reader mode all depend on correct HTML, so teams check it in code reviews and automated tests.',
    interview: [
      { q: 'What is the difference between HTML, CSS and JavaScript?', a: 'HTML gives structure and meaning, CSS controls how it looks, and JavaScript adds behaviour.' },
      { q: 'Why do we write <!DOCTYPE html>?', a: 'It makes the browser use standard, modern rules instead of old “quirks” behaviour.' },
      { q: 'What goes in <head>?', a: 'Information about the page: the title, character set, viewport, description and links to styles.' },
    ],
    cheat: [
      { code: '<!DOCTYPE html>', meaning: 'modern HTML page' },
      { code: '<html lang="en">', meaning: 'wraps the page, sets the language' },
      { code: '<head>…</head>', meaning: 'about the page (not shown)' },
      { code: '<title>…</title>', meaning: 'browser tab title' },
      { code: '<body>…</body>', meaning: 'everything visitors see' },
      { code: '<h1>, <p>', meaning: 'main heading, paragraph' },
    ],
  },
  'h-text': {
    minutes: 5,
    lang: 'html',
    sections: [
      { heading: 'Why structure matters', body: 'People rarely read a page word by word; they scan the headings to find their part. Search engines use headings to understand the topic, and screen readers let blind users jump from heading to heading. A clear outline (one h1, then h2 sections, then h3 inside them) helps all three at once.', anim: 'outline' },
      { heading: 'Paragraphs, spaces and line breaks', body: 'Browsers collapse extra spaces and ignore new lines in your code, so pressing Enter doesn’t make a new line on the page. Each block of text gets its own <p>. Use <br> only when the line break is part of the content, like in an address or a poem, never to add space between paragraphs.', code: ['<p>12 MG Road<br>Indore 452001</p>'], anim: 'htmlTags' },
      { heading: 'Meaning, not just looks', body: '<strong> says “this is important” and <em> says “stress this word”. Browsers show them bold and italic, but screen readers can announce them too. <b> and <i> only change the look. Choose tags for what the text means; how big or bold it looks is CSS’s job.', code: ['<p><strong>Last date:</strong> 5 November.</p>', '<p>Bring <em>your own</em> laptop.</p>'], anim: 'htmlTags' },
    ],
    example: {
      title: 'A school notice',
      code: ['<h1>Annual Day 2026</h1>', '<h2>Timings</h2>', '<p>Gates open at <strong>5 pm</strong>.</p>', '<h2>Dress code</h2>', '<h3>Juniors</h3>', '<p>School uniform, <em>please</em>.</p>'],
      walk: [
        { line: 1, text: 'The one main title.' },
        { line: 2, text: 'Sections are h2, all at the same level.' },
        { line: 3, text: '<strong> marks the time as important.' },
        { line: 5, text: 'h3 is a sub-section inside “Dress code”.' },
      ],
      output: ['Annual Day 2026', 'Timings', 'Gates open at 5 pm.', 'Dress code', 'Juniors', 'School uniform, please.'],
    },
    industry: 'Accessibility audits check the heading order first, and search ranking tools flag pages with a missing or repeated h1. In big teams, design systems style headings with CSS so developers never pick a heading level just for its size.',
    interview: [
      { q: 'Why only one h1 on a page?', a: 'It is the page’s main title; one clear h1 helps search engines and screen-reader users understand the page.' },
      { q: 'What is the difference between <strong> and <b>?', a: '<strong> means important; <b> only makes text bold with no extra meaning.' },
      { q: 'When is <br> the right choice?', a: 'When the line break is part of the content, like an address or a poem.' },
    ],
    cheat: [
      { code: '<h1>…<h6>', meaning: 'headings, most to least important' },
      { code: '<p>', meaning: 'paragraph' },
      { code: '<br>', meaning: 'line break inside text' },
      { code: '<strong>', meaning: 'important' },
      { code: '<em>', meaning: 'stressed' },
      { code: '<hr>', meaning: 'a change of topic' },
    ],
  },
  'w-html-2': {
    minutes: 6,
    lang: 'html',
    sections: [
      { heading: 'How addresses work', body: 'A full address (a URL) such as https://www.irctc.co.in/ names the site and the page. A relative address like menu.html or images/thali.jpg is found starting from the current page’s folder, and ../ goes up one folder. Relative links keep working when the whole site moves to a new domain, which is why sites use them for their own pages.', code: ['<a href="https://www.irctc.co.in/">Book a train</a>', '<a href="menu.html">Menu</a>'], anim: 'linkJump' },
      { heading: 'Links that do more', body: 'href="#fees" jumps to the element with id="fees" on the same page. tel:+91… opens the phone’s dialler and mailto:… the email app, very handy on mobile. Link text should say where it goes, like “See the fee list”, so it makes sense on its own when a screen reader lists all the links.', code: ['<a href="#fees">Jump to fees</a>', '<a href="tel:+919800000000">Call us</a>'], anim: 'linkJump' },
      { heading: 'Images people can understand', body: '<img src="…" alt="…"> shows a picture. alt is read aloud to blind users and shown when the image can’t load, so describe what matters: “A thali with dal, rice, roti and sabzi”. Purely decorative images get alt="". Giving width and height lets the browser keep space for the image, so the page doesn’t jump as it loads.', code: ['<img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi" width="300" height="200">'], anim: 'imageLoad' },
    ],
    example: {
      title: 'Riya’s contact section',
      code: ['<h2>Contact</h2>', '<p><a href="menu.html">See today’s menu</a></p>', '<p><a href="tel:+919800000000">Call us</a></p>', '<p><a href="mailto:orders@riyastiffins.in">Email an order</a></p>'],
      walk: [
        { line: 2, text: 'A relative link to another page of the same site.' },
        { line: 3, text: 'tel: opens the dialler on a phone.' },
        { line: 4, text: 'mailto: opens a new email to that address.' },
      ],
      output: ['Contact', 'See today’s menu', 'Call us', 'Email an order'],
    },
    industry: 'Broken links and missing alt text are found automatically by tools like Lighthouse in every serious project. Images are often the heaviest part of a page, so teams compress them and set their sizes; e-commerce sites test that product photos have good alt text for accessibility and search.',
    interview: [
      { q: 'Relative versus absolute URLs?', a: 'An absolute URL includes the protocol and domain; a relative one is found from the current page and keeps working if the site moves.' },
      { q: 'What is alt text for?', a: 'It describes an image for screen readers and when the image can’t load.' },
      { q: 'When should a link open a new tab?', a: 'Rarely: for things like PDFs or help pages, and with rel="noopener" for safety.' },
    ],
    cheat: [
      { code: '<a href="page.html">', meaning: 'link within your site' },
      { code: '<a href="https://…">', meaning: 'link to another site' },
      { code: 'href="#id"', meaning: 'jump on the same page' },
      { code: 'tel: / mailto:', meaning: 'call or email' },
      { code: '<img src alt>', meaning: 'image with a description' },
      { code: 'alt=""', meaning: 'decorative image' },
    ],
  },
};
