// HTML Intermediate · Module 6 · Built-in interactive elements, and the final project: the Greenfield School site.
import type { Lesson, WebStep } from '../../types';
import { atWork, bugTask, challenge, check, explore, finalProject, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, xray } from './kit';
import { navFor, SCHOOL_PAGES, SITE_CSS } from './m3';

const UI_CSS = `${SITE_CSS} details{border:2px solid #E5E3F5;border-radius:10px;padding:8px 10px;margin:6px 0} summary{font-weight:bold;cursor:pointer} button{font:inherit;padding:8px 12px;border:0;border-radius:8px;background:#4B3FD8;color:white} [popover]{border:2px solid #4B3FD8;border-radius:10px;padding:10px} dialog{border:0;border-radius:12px;box-shadow:0 10px 30px rgb(0 0 0/.2)} label{display:block;margin:8px 0 2px}`;

// ── The final project: four pages’ worth of work, each step editing one page with the others in the preview ──
const HEAD = (title: string, desc: string, path: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://greenfield.example/${path}">
</head>`;
const HOME_START = `${HEAD('Greenfield School', 'Learning that lasts. Admissions open for 2027.', '')}
<body>
  <nav>
    <a href="index.html">Home</a>
    <a href="admissions.html">Admissions</a>
    <a href="fees.html">Fees</a>
  </nav>
  <h1>Greenfield School</h1>
  <img src="banner.svg" alt="The school gate in the morning">
  <img src="dish.svg" alt="Children at sports day">
</body>
</html>`;
const HOME_1 = HOME_START.replace('<a href="index.html">Home</a>', '<a href="index.html" aria-current="page">Home</a>');
const HOME_2 = HOME_1.replace('<img src="banner.svg" alt="The school gate in the morning">', '<img src="banner.svg" alt="The school gate in the morning" width="600" height="240" fetchpriority="high">')
  .replace('<img src="dish.svg" alt="Children at sports day">', '<img src="dish.svg" alt="Children at sports day" width="400" height="260" loading="lazy">');
const HOME_FINAL = HOME_2.replace('</body>', `  <script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "School", "name": "Greenfield School" }
  </script>
</body>`);
const ADMISSIONS_START = `${HEAD('Greenfield School · Admissions', 'Apply online for 2027.', 'admissions.html')}
<body>
  ${navFor('admissions.html')}
  <h1>Admissions</h1>
  <form>
    <label for="parent">Parent name</label>
    <input id="parent">
    <label for="phone">Phone</label>
    <input id="phone">
    <p id="phone-hint">10 digits, no spaces</p>
    <button>Apply</button>
  </form>
</body>
</html>`;
const ADMISSIONS_FINAL = ADMISSIONS_START.replace('  <form>\n', '  <form>\n    <fieldset>\n    <legend>Parent</legend>\n')
  .replace('<input id="parent">', '<input id="parent" autocomplete="name">')
  .replace('<input id="phone">', '<input id="phone" autocomplete="tel" inputmode="tel" aria-describedby="phone-hint">')
  .replace('    <p id="phone-hint">10 digits, no spaces</p>\n', '    <p id="phone-hint">10 digits, no spaces</p>\n    </fieldset>\n');
const FEES_START = `${HEAD('Greenfield School · Fees', 'Fees for 2027, class by class.', 'fees.html')}
<body>
  ${navFor('fees.html')}
  <h1>Fees</h1>
  <p>Class 1–5: ₹2,000 a month.</p>
  <p>Do you pay less for a second child?</p>
  <p>Yes: 20% off the second child’s fees.</p>
</body>
</html>`;
const FEES_FINAL = FEES_START.replace('  <p>Do you pay less for a second child?</p>\n  <p>Yes: 20% off the second child’s fees.</p>', '  <details>\n    <summary>Do you pay less for a second child?</summary>\n    <p>Yes: 20% off the second child’s fees.</p>\n  </details>');

const step = (n: number, title: string, instructions: string, starter: string, solution: string, checks: WebStep['checks'], hint: string, pages: Record<string, string>, current = 'index.html'): WebStep => ({
  ...finalProject({ title: `Step ${n} · ${title}`, instructions, starter: { html: starter, css: SITE_CSS }, solution: { html: solution, css: SITE_CSS }, checks, hint }),
  kicker: `FINAL PROJECT · STEP ${n} OF 4`,
  pages,
  current,
});

export const HTML_I_M6: Lesson[] = [
  lesson('html-i-6-1', 'FAQs with details and summary', 5, [
    atWork('Megan', ['Parents ask the same ten questions every week. Greenfield wants a tidy FAQ where each answer opens when you tap the question.', 'HTML can do that on its own, no JavaScript needed.']),
    tapPage('Tap a question', 'Tap each question to open its answer.', { html: '<details id="q1">\n  <summary>When does the school day start?</summary>\n  <p>8 am, Monday to Friday.</p>\n</details>\n<details id="q2">\n  <summary>Is there a school bus?</summary>\n  <p>Yes, on four routes.</p>\n</details>', css: UI_CSS, js: 'for (const s of document.querySelectorAll("summary")) {\n  s.addEventListener("click", () => console.log("Opened: " + s.textContent));\n}' }, 'Opened: Is there a school bus?', [{ click: '#q1 summary' }, { click: '#q2 summary' }], 'The open and close comes free with HTML. The small script only writes to the log.'),
    explore('The parts', ['<details open>', '  <summary>When does the school day start?</summary>', '  <p>8 am, Monday to Friday.</p>', '</details>'], [
      [1, '<details> holds a question and its answer. open makes it start opened.', 'details'],
      [2, '<summary> is the part you tap. It works with a keyboard and screen readers too.', 'summary'],
      [3, 'Everything else inside is hidden until it opens.', 'p'],
    ], { page: { html: '<details open><summary>When does the school day start?</summary><p>8 am, Monday to Friday.</p></details>', css: UI_CSS }, minTaps: 3 }),
    check('Which element is the clickable question?', ['<summary>', '<details>', '<legend>', '<button>'], 'summary is the visible, tappable part.', 'It sums up what is inside.'),
    tapbug('The question doesn’t open anything', ['<details>', '  <p>When does school start?</p>', '  <p>8 am.</p>', '</details>'], [[2, '<p>When does school start?</p>', '<summary>When does school start?</summary>']], 'Without a summary, the browser shows a default “Details” label. The question must be the summary.'),
    recap([
      ['❓', '<details> + <summary> make an FAQ'],
      ['🔓', 'open starts it opened'],
      ['♿', 'Works with keyboards and screen readers, no JavaScript'],
    ]),
  ]),

  lesson('html-i-6-2', 'Popovers and dialogs', 5, [
    reveal('Two kinds of pop-up, built in', [
      ['popover', 'A small panel (a tip or a menu) that opens over the page. <button popovertarget="fee-help"> opens <div id="fee-help" popover>. Tapping outside closes it.', '💬'],
      ['<dialog>', 'A box that asks for attention, like “Are you sure?”. Opened with JavaScript: dialog.showModal().', '🪟'],
      ['Why built-in?', 'Focus, the Esc key and screen readers are handled for you.', '♿'],
    ], { mono: true }),
    explore('A fee-help popover', ['<button popovertarget="fee-help">What is included?</button>', '<div id="fee-help" popover>', '  Books, uniform and the school bus.', '</div>'], [
      [1, 'popovertarget names the id of the panel to open.', 'button'],
      [2, 'The popover attribute makes this div hidden until opened, then shown on top of everything.'],
    ], { page: { html: '<button popovertarget="fee-help">What is included?</button><div id="fee-help" popover style="display:block;position:static;margin-top:8px">Books, uniform and the school bus.</div>', css: UI_CSS }, minTaps: 2 }),
    matchUp('Match the pop-up tool', [['A small tip about fees', 'popover'], ['“Cancel this application?”', '<dialog> + showModal()'], ['popovertarget', 'The button that opens a popover'], ['The Esc key', 'Closes either kind']], 'Popovers are light; dialogs ask for attention.'),
    check('How does a button open a popover?', ['popovertarget="the-id"', 'onclick="open()"', 'href="#the-id"', 'target="popover"'], 'No JavaScript needed.', 'An attribute naming the target.'),
    tapbug('The tip never opens', ['<button popovertarget="feehelp">What is included?</button>', '<div id="fee-help" popover>Books and uniform.</div>'], [[1, 'popovertarget="feehelp"', 'popovertarget="fee-help"']], 'popovertarget must match the panel’s id exactly.'),
    recap([
      ['💬', 'popover + popovertarget: light pop-ups'],
      ['🪟', '<dialog> + showModal(): pop-ups that need an answer'],
      ['♿', 'Focus and Esc are handled for you'],
    ]),
  ]),

  lesson('html-i-6-3', 'progress and meter', 4, [
    reveal('Two bars with different meanings', [
      ['<progress value="2" max="4">', 'How far a task has got: “Step 2 of 4” in the admission form.', '⏳'],
      ['<meter value="38" min="0" max="40">', 'A measurement in a range: “38 of 40 seats taken”, with low, high and optimum colours.', '📊'],
      ['Label them', 'Write the value in words too, for screen readers and clarity.', '🏷'],
    ], { mono: true }),
    live('Step through the form', 'Pick how far the parent has got.', ['<label for="p">Application: steps done out of 4</label>', '<progress id="p" value="{{v}}" max="4"></progress>'], ['1', '2', '3', '4'], { caption: 'progress shows how much of a task is done.' }),
    live('Seats left', 'Pick how many seats are taken.', ['<label for="m">Seats taken in Class 1</label>', '<meter id="m" value="{{v}}" min="0" max="40" low="30" high="36" optimum="10"></meter>'], ['10', '30', '38'], { caption: 'meter changes colour as the value goes past low and high: green, then amber, then red.' }),
    check('Which shows “38 of 40 seats taken”?', ['<meter>', '<progress>', '<range>', '<input type="range">'], 'A measurement in a known range is a meter.', 'It measures, it isn’t a task.'),
    tapbug('The progress bar is always empty', ['<progress value="3" max="four"></progress>'], [[1, 'max="four"', 'max="4"']], 'max must be a number. A word is ignored, so the bar can’t show progress.'),
    recap([
      ['⏳', 'progress: how far a task has got'],
      ['📊', 'meter: a value in a range'],
      ['🏷', 'Always label them'],
    ]),
  ]),

  challenge('h-i-project', 'Final: the Greenfield School website', { icon: '🏆', name: 'HTML Pro+' }, ['Build a multi-page site with shared, accurate navigation', 'Make pages fast, accessible and ready for search engines', 'Use forms and built-in interactive elements well'], [
    mcq(1, 'Which element makes a tap-to-open FAQ without JavaScript?', ['<details> with <summary>', '<dialog>', '<section>', '<fieldset>'], 'details and summary.', { mono: true }),
    mcq(2, 'Which marks the link to the current page?', ['aria-current="page"', 'class="active" only', 'target="_self"', 'rel="current"'], 'The standard way.', { mono: true }),
    mcq(3, 'Which image should load first?', ['The hero at the top, with fetchpriority="high"', 'The footer logo', 'Every gallery image', 'None'], 'The LCP image.'),
    mcq(4, 'What links an input to its hint for screen readers?', ['aria-describedby', 'placeholder', 'title', 'for'], 'aria-describedby.', { mono: true }),
    mcq(5, 'What does a canonical link do?', ['Names the main address of the page', 'Loads the page faster', 'Opens a new tab', 'Hides the page from search'], 'One main address.'),
    swipe([
      ['Each page of a site should have its own title', true, 'Tabs, results and shares use it.'],
      ['The hero image should be lazy-loaded', false, 'It is seen first.'],
      ['<dialog> needs showModal() to open as a modal', true, 'From JavaScript.'],
      ['meter is for showing how far a task has got', false, 'That is progress.'],
    ]),
    pairs([['aria-current', 'Current page'], ['loading="lazy"', 'Load later'], ['<legend>', 'Group title'], ['popovertarget', 'Open a popover']], 'Tools from the whole track.'),
    pickCode('Which is the best admission phone field?', ['<input id="phone" autocomplete="tel" inputmode="tel" aria-describedby="phone-hint">', '<input placeholder="phone">', '<input type="number" id="phone">', '<input id="phone" aria-describedby="hint">'], 'Fills from the phone, shows the phone keyboard, and links its hint.'),
    bugTask(['<nav>', '  <a href="index.html" aria-current="page">Home</a>', '  <a href="Fees Page.html">Fees</a>', '</nav>', '<img src="hero.jpg" alt="Gate" loading="lazy">'], [[3, 'Fees Page.html', 'fees.html'], [5, 'loading="lazy"', 'fetchpriority="high"']], 'File names without spaces, and the hero loads first.'),
    xray(
      { html: `${SCHOOL_PAGES['fees.html']}<details open><summary>Do you pay less for a second child?</summary><p>Yes: 20% off.</p></details><p><label for="m">Seats taken</label> <meter id="m" value="38" min="0" max="40" high="36"></meter></p>`, css: UI_CSS },
      [
        ['a[aria-current="page"]', 'The highlighted Fees link', 'aria-current="page"', ['aria-current="page"', 'target="_blank"', 'class only']],
        ['details', 'The question that opens', '<details> + <summary>', ['<details> + <summary>', '<dialog>', '<fieldset>']],
        ['meter', 'The seats bar', '<meter>', ['<meter>', '<progress>', '<input type="range">']],
      ],
    ),
    step(1, 'The site and its navigation', 'Megan: “Three pages, one nav. Mark Home as the current page so people know where they are.” Tap the links in the preview to visit the other pages.', HOME_START, HOME_1, [
      { label: 'A nav linking all three pages', file: 'html', pattern: /<nav>[\s\S]*href="index\.html"[\s\S]*href="admissions\.html"[\s\S]*href="fees\.html"[\s\S]*<\/nav>/ },
      { label: 'Home is marked as the current page', file: 'html', pattern: /<a href="index\.html" aria-current="page">/ },
    ], 'Add aria-current="page" to the Home link.', SCHOOL_PAGES),
    step(2, 'A home page that loads fast', 'Give both photos their size. The gate photo is seen first: give it high priority. The sports photo is lower down: make it lazy.', HOME_1, HOME_2, [
      { label: 'The hero has width, height and high priority', file: 'html', pattern: /<img src="banner\.svg"(?=[^>]*width="\d+")(?=[^>]*height="\d+")(?=[^>]*fetchpriority="high")[^>]*>/ },
      { label: 'The lower photo is lazy and sized', file: 'html', pattern: /<img src="dish\.svg"(?=[^>]*width="\d+")(?=[^>]*height="\d+")(?=[^>]*loading="lazy")[^>]*>/ },
    ], 'width="600" height="240" fetchpriority="high" on the gate photo; width="400" height="260" loading="lazy" on the sports photo.', SCHOOL_PAGES),
    step(3, 'An admissions form for everyone', 'Group the parent’s fields with a fieldset and legend, help phones fill them with autocomplete and inputmode, and link the phone hint.', ADMISSIONS_START, ADMISSIONS_FINAL, [
      { label: 'A fieldset with a legend', file: 'html', pattern: /<fieldset>\s*<legend>[^<]+<\/legend>[\s\S]*<\/fieldset>/ },
      { label: 'Names and phones fill themselves', file: 'html', pattern: /autocomplete="name"[\s\S]*autocomplete="tel"/ },
      { label: 'The phone hint is linked', file: 'html', pattern: /<input id="phone"[^>]*aria-describedby="phone-hint"/ },
    ], '<fieldset><legend>Parent</legend> … </fieldset>, autocomplete="name", autocomplete="tel" inputmode="tel" aria-describedby="phone-hint".', { 'index.html': HOME_FINAL, 'fees.html': SCHOOL_PAGES['fees.html'] }, 'admissions.html'),
    step(4, 'Fees with an FAQ', 'Turn the question and answer into an FAQ that opens when tapped.', FEES_START, FEES_FINAL, [
      { label: 'A details element with a summary', file: 'html', pattern: /<details>\s*<summary>[^<]+<\/summary>[\s\S]*<\/details>/ },
      { label: 'Every page has a title, a description and a canonical link', file: 'html', pattern: /<title>[^<]+<\/title>[\s\S]*name="description"[\s\S]*rel="canonical"/ },
    ], 'Wrap the question in <summary>, and both in <details>.', { 'index.html': HOME_FINAL, 'admissions.html': SCHOOL_PAGES['admissions.html'] }, 'fees.html'),
  ], 'project'),
];
