import { bug, lesson, order, quiz, read, tap } from '../dsl';
import type { Lesson, WebStep } from '../types';

const K = 'HTML';

const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: `BUILD · ${K}`, ...o });

export const HTML_MORE: Lesson[] = [
  lesson('h-attr-1', 'Attributes, ids and classes', 'html', ['Attributes add details to a tag', 'id names one element', 'class groups many elements'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Tags with extra details',
      body: 'Attributes go inside the opening tag as name="value". id gives one element a unique name; class puts elements into a group that CSS and JavaScript can target.',
      lang: 'html',
      code: ['<p id="intro" class="note">Welcome aboard!</p>', '<p class="note">Seats fill fast.</p>'],
      tip: 'Use an id once per page. Classes can repeat.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Find the attribute',
      instructions: 'Tap the attribute that puts this paragraph in a group.',
      lang: 'html',
      lines: ['<p id="fare" class="price">₹450</p>'],
      target: { line: 0, token: 'class' },
      explain: 'class groups elements; id names exactly one.',
    }),
    web({
      title: 'Label your elements',
      instructions: 'Give the heading id="title", and give both paragraphs class="stop".',
      starter: { html: '<h1>Route</h1>\n<p>Delhi</p>\n<p>Agra</p>\n' },
      solution: { html: '<h1 id="title">Route</h1>\n<p class="stop">Delhi</p>\n<p class="stop">Agra</p>\n' },
      checks: [
        { label: 'The heading has id="title"', file: 'html', pattern: /<h1[^>]*\bid="title"/ },
        { label: 'Delhi has class="stop"', file: 'html', pattern: /<p[^>]*\bclass="stop"[^>]*>\s*Delhi/ },
        { label: 'Agra has class="stop"', file: 'html', pattern: /<p[^>]*\bclass="stop"[^>]*>\s*Agra/ },
      ],
      hint: '<p class="stop">Delhi</p>',
    }),
  ]),

  lesson('h-table-1', 'Tables', 'html', ['<table> holds rows of data', '<tr> is a row, <td> a cell', '<th> is a header cell'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Data in rows and columns',
      body: 'Timetables and price lists are tables. <table> wraps it, <tr> makes each row, <th> marks header cells and <td> holds ordinary cells.',
      lang: 'html',
      code: ['<table>', '  <tr><th>Train</th><th>Fare</th></tr>', '  <tr><td>Rajdhani</td><td>₹2900</td></tr>', '</table>'],
      tip: 'Use tables for data, not for page layout.',
    }),
    order({
      kicker: `PRACTICE · ${K}`,
      title: 'Build the table',
      instructions: 'Put the lines in order to make a table with a header row and one data row.',
      lang: 'html',
      lines: ['<table>', '  <tr><th>Station</th><th>Time</th></tr>', '  <tr><td>Agra</td><td>08:10</td></tr>', '</table>'],
      explain: 'The header row comes first, inside <table>.',
    }),
    web({
      title: 'Add a row',
      instructions: 'Add a second data row for Mathura at 07:15 using <tr> and two <td> cells.',
      starter: { html: '<table border="1">\n  <tr><th>Station</th><th>Time</th></tr>\n  <tr><td>Agra</td><td>08:10</td></tr>\n</table>\n' },
      solution: { html: '<table border="1">\n  <tr><th>Station</th><th>Time</th></tr>\n  <tr><td>Agra</td><td>08:10</td></tr>\n  <tr><td>Mathura</td><td>07:15</td></tr>\n</table>\n' },
      checks: [
        { label: 'There is a row for Mathura', file: 'html', pattern: /<tr>\s*<td>\s*Mathura\s*<\/td>/ },
        { label: 'Mathura shows 07:15 in its own cell', file: 'html', pattern: /<td>\s*07:15\s*<\/td>\s*<\/tr>/ },
      ],
      hint: '<tr><td>Mathura</td><td>07:15</td></tr>',
    }),
  ]),

  lesson('h-inputs-1', 'More form controls', 'html', ['<select> makes a dropdown', 'Radio buttons pick one option', 'Checkboxes pick any number'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Choices, not typing',
      body: 'Let people choose instead of type: <select> with <option>s for a dropdown, type="radio" (same name) to pick one, type="checkbox" to pick many.',
      lang: 'html',
      code: ['<select name="class">', '  <option>Sleeper</option>', '  <option>3A</option>', '</select>', '<label><input type="checkbox" name="meal"> Add meal</label>'],
      tip: 'Radio buttons in one group must share the same name.',
    }),
    quiz({
      prompt: 'Which control lets a passenger pick exactly one of Sleeper, 3A or 2A?',
      options: ['Radio buttons with the same name', 'Checkboxes', 'A text input', 'A <p> tag'],
      right: 'Radio buttons sharing a name allow one choice.',
      wrong: 'Checkboxes allow many choices. One-of-many is radio buttons with the same name.',
    }),
    web({
      title: 'Pick a class',
      instructions: 'Add a <select> named "class" with three <option>s: Sleeper, 3A and 2A.',
      starter: { html: '<form>\n  <label>Class</label>\n</form>\n' },
      solution: { html: '<form>\n  <label>Class</label>\n  <select name="class">\n    <option>Sleeper</option>\n    <option>3A</option>\n    <option>2A</option>\n  </select>\n</form>\n' },
      checks: [
        { label: 'There is a <select name="class">', file: 'html', pattern: /<select[^>]*name="class"/ },
        { label: 'It has a Sleeper option', file: 'html', pattern: /<option[^>]*>\s*Sleeper\s*<\/option>/ },
        { label: 'It has 3A and 2A options', file: 'html', pattern: /<option[^>]*>\s*3A[\s\S]*<option[^>]*>\s*2A/ },
      ],
      hint: '<select name="class"><option>Sleeper</option>…</select>',
    }),
  ]),

  lesson('h-a11y-1', 'Accessible pages', 'html', ['alt text describes images', 'Buttons should be <button>', 'Headings should go in order'], [
    read({
      kicker: `READ · ${K}`,
      title: 'Pages for everyone',
      body: 'Screen readers read your HTML aloud to blind users. Give every image alt text, use real <button> elements for actions, and use headings in order (h1, then h2) so people can jump around.',
      lang: 'html',
      code: ['<img src="map.png" alt="Route map from Delhi to Agra">', '<button>Book seat</button>'],
      tip: 'Decorative images can use alt="" so screen readers skip them.',
    }),
    bug({
      kicker: `PRACTICE · ${K}`,
      title: 'Not really a button',
      instructions: 'Keyboard and screen reader users cannot use one of these. Which line?',
      lang: 'html',
      lines: ['<h1>Book a ticket</h1>', '<img src="train.png" alt="Vande Bharat train">', '<div onclick="book()">Book now</div>'],
      bug: 2,
      fix: '<button onclick="book()">Book now</button>',
      explain: 'A <div> is not focusable or announced as a button. Use <button>.',
    }),
    web({
      title: 'Describe the image',
      instructions: 'Add alt text to the image: "Map of the Delhi to Agra route".',
      starter: { html: '<h1>Your route</h1>\n<img src="map.png">\n' },
      solution: { html: '<h1>Your route</h1>\n<img src="map.png" alt="Map of the Delhi to Agra route">\n' },
      checks: [{ label: 'The image has descriptive alt text', file: 'html', pattern: /<img[^>]*alt="[^"]{8,}"/ }],
      hint: '<img src="map.png" alt="…">',
    }),
  ]),

  lesson('h-head-1', 'The head and SEO', 'html', ['<head> holds info about the page', '<title> shows in the browser tab and Google', 'The viewport meta tag makes pages fit phones'], [
    read({
      kicker: `READ · ${K}`,
      title: 'What search engines see',
      body: 'Everything in <head> describes the page instead of showing on it. <title> appears in the tab and in Google results. The viewport meta tag tells phones not to zoom out.',
      lang: 'html',
      code: ['<head>', '  <meta charset="utf-8">', '  <meta name="viewport" content="width=device-width, initial-scale=1">', '  <title>CodeYatra Rail · Book trains</title>', '  <meta name="description" content="Book trains across India">', '</head>'],
      tip: 'Every page should have a unique, descriptive title.',
    }),
    tap({
      kicker: `PRACTICE · ${K}`,
      title: 'Google result title',
      instructions: 'Tap the tag whose text appears as the title in Google results.',
      lang: 'html',
      lines: ['<head>', '  <title>Book trains</title>', '</head>'],
      target: { line: 1, token: '<title' },
      explain: 'The <title> text is what browsers and search engines show.',
    }),
    quiz({
      prompt: 'Without the viewport meta tag, what happens on phones?',
      options: ['The page renders desktop-width and looks tiny', 'The page will not load', 'Images disappear', 'Nothing changes'],
      right: 'Phones assume a ~980px desktop page and zoom out.',
      wrong: 'Phones then render the page as if it were a desktop and shrink it.',
    }),
  ]),
];
