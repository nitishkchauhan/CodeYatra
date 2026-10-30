// CSS Intermediate · Module 5 · Forms that look good.
import type { Lesson } from '../../types';
import { arrange, atWork, beforeAfter, bugTask, challenge, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const FORM = '<form class="f">\n  <label for="n">Name</label>\n  <input id="n" placeholder="Your name">\n  <label for="e">Email</label>\n  <input id="e" type="email" placeholder="you@example.com">\n  <label><input type="checkbox" checked> Send me updates</label>\n  <button>Send</button>\n</form>';
const PLAIN = 'body{font-family:system-ui,sans-serif;margin:12px}';
const STYLED = `${PLAIN} .f{display:grid;gap:6px;max-width:300px} label{font-size:14px;font-weight:600} input:not([type="checkbox"]){font:inherit;padding:10px;border:2px solid #D1D5DB;border-radius:10px;background:white} input[type="checkbox"]{accent-color:#4B3FD8;width:18px;height:18px;vertical-align:middle} button{font:inherit;font-weight:bold;padding:10px;border:0;border-radius:10px;background:#4B3FD8;color:white}`;

export const CSS_I_M5: Lesson[] = [
  lesson('css-i-5-1', 'Consistent inputs, checkboxes and buttons', 5, [
    atWork('Arden', ['The contact form looks different on every phone: tiny boxes, grey buttons, blue checkboxes that clash with our purple.', 'Let’s give every control the same calm, clear style.']),
    beforeAfter('The contact form', [[FORM.split('\n')[1]], 'The browser’s default look: small, cramped, a different blue on every phone.', { html: FORM, css: PLAIN }], [['input { padding: 10px; border: 2px solid #D1D5DB; border-radius: 10px; }', 'input[type="checkbox"] { accent-color: #4B3FD8; }'], 'Bigger tap targets, clear borders, and the checkbox in the brand colour.', { html: FORM, css: STYLED }]),
    explore('The key rules', ['input, select, textarea, button { font: inherit; }', 'input[type="checkbox"] { accent-color: #4B3FD8; }', 'select { appearance: none; }'], [
      [1, 'Form controls don’t inherit the page font by default. font: inherit fixes it in one line.', 'input'],
      [2, 'accent-color paints checkboxes, radios, range sliders and progress bars in your colour.', 'input[type="checkbox"]'],
      [3, 'appearance: none removes the built-in look, so you can style a select from scratch.'],
    ], { page: { html: FORM, css: STYLED }, minTaps: 3 }),
    copy('Match the button', 'Make the Send button match Arden’s design.', '<button class="b">Send</button>', `${PLAIN}\n.b { font: inherit; font-weight: bold; color: white; border: 0; }\n.b {\n  background: {{0}};\n  padding: {{1}};\n  border-radius: {{2}};\n}`, [
      ['background', ['#E5E7EB', '#4B3FD8'], '#4B3FD8'],
      ['padding', ['2px 6px', '12px 24px'], '12px 24px'],
      ['border-radius', ['0', '10px'], '10px'],
    ]),
    check('Why add font: inherit to form controls?', ['They don’t use the page font by default', 'It makes them required', 'It adds a border', 'It is needed for checkboxes to work'], 'Otherwise they use a small system font.', 'Inherit from whom?'),
    recap([
      ['🔤', 'font: inherit on all controls'],
      ['🎨', 'accent-color for checkboxes and radios'],
      ['👆', 'Bigger padding means easier tapping'],
    ]),
  ]),

  lesson('css-i-5-2', 'Focus rings for keyboard users', 4, [
    reveal('Who needs a focus ring', [
      ['Keyboard users', 'Moving with Tab, the ring shows where they are. Without it, they are lost.', '⌨️'],
      [':focus-visible', 'Shows the ring for keyboard use, but not after a mouse click or tap. The best of both.', '✅'],
      ['Never just remove it', 'outline: none with nothing else hides where the keyboard is.', '🚫'],
    ], { mono: true }),
    live('Design the ring', 'Pick a focus style.', ['input:focus-visible { {{v}} }'], ['outline: 3px solid #4B3FD8; outline-offset: 2px;', 'outline: 3px dashed #C2410C;', 'box-shadow: 0 0 0 4px #C7D2FE; outline: none; border-color: #4B3FD8;'], { html: '<input class="always" placeholder="This box shows the ring">', css: `${STYLED} .always{outline:3px solid #4B3FD8;outline-offset:2px}`, caption: 'A box-shadow ring is fine, as long as something clearly shows the focus.' }),
    check('Which shows a ring for keyboard users but not after a tap?', [':focus-visible', ':focus', ':hover', ':active'], 'focus-visible is smart about the input device.', 'It has “visible” in it.'),
    tapbug('Keyboard users can’t see where they are', ['input:focus {', '  outline: none;', '}'], [[2, 'outline: none;', 'outline: 3px solid #4B3FD8;']], 'Removing the ring with nothing in its place hides the focus. Give it a clear style instead.'),
    matchUp('Focus words', [[':focus', 'Any focus, even after a tap'], [':focus-visible', 'Focus from a keyboard'], ['outline-offset', 'A gap around the ring'], ['outline: none alone', 'Hides where you are']], 'Style :focus-visible; never just remove the ring.'),
    recap([
      ['⌨️', 'Keyboard users need a visible focus'],
      ['✅', 'Style :focus-visible'],
      ['🚫', 'Never outline: none on its own'],
    ]),
  ]),

  lesson('css-i-5-3', 'Show errors only after a mistake', 5, [
    toggle(':invalid or :user-invalid?', [
      [':invalid', ['input:invalid { border-color: crimson; }'], 'Red before the person has typed anything: it looks like they already did something wrong.', { html: '<label>Email <input type="email" required></label>', css: `${STYLED} input:invalid{border-color:crimson}` }],
      [':user-invalid', ['input:user-invalid { border-color: crimson; }'], 'Red only after they have typed and left the field (or tried to send). Much kinder.', { html: '<label>Email <input type="email" required></label>', css: `${STYLED} input:user-invalid{border-color:crimson}` }],
    ]),
    explore('Style the whole field with :has()', ['.field:has(input:user-invalid) {', '  color: crimson;', '}', '.field:has(input:user-invalid) .msg {', '  display: block;', '}'], [
      [1, ':has() styles a parent by what it contains: the field wrapper turns red when its input is wrong.', '.field'],
      [4, 'And reveals its message, with no JavaScript.', '.msg'],
    ], { page: { html: '<div class="field"><label for="m">Email</label><input id="m" type="email" required value="not-an-email"><p class="msg">Please enter an email like you@example.com</p></div>', css: `${STYLED} .field{display:grid;gap:4px;color:crimson} .msg{display:block;margin:0;font-size:13px}` }, minTaps: 2 }),
    truth([
      [':invalid shows red before anyone types', true, 'That’s why :user-invalid is kinder.'],
      [':has() can style a parent', true, 'By what it contains.'],
      ['Error colours alone are enough', false, 'Also show a message: not everyone sees colour.'],
    ]),
    tapbug('The message never shows', ['.msg { display: none; }', '.field:has(input:user-invalid) .message { display: block; }'], [[2, '.message', '.msg']], 'The class in the selector must match the element’s class: msg.'),
    check('Which shows red only after the user has tried?', [':user-invalid', ':invalid', ':valid', ':required'], ':user-invalid waits for typing and leaving the field.', 'It has “user” in it.'),
    recap([
      ['🙂', ':user-invalid waits until the user has tried'],
      ['🔍', ':has() styles the field around a wrong input'],
      ['📝', 'Show a message, not just a colour'],
    ]),
  ]),

  challenge('css-i-5-ch', 'Module 5 Challenge', { icon: '✍️', name: 'Form Stylist' }, ['Style inputs, checkboxes and buttons consistently', 'Show clear focus rings for keyboard users', 'Show errors kindly with :user-invalid and :has()'], [
    mcq(1, 'Which recolours checkboxes and radios?', ['accent-color', 'color', 'background', 'fill'], 'One line for all of them.', { mono: true }),
    mcq(2, 'Which shows focus only for keyboard users?', [':focus-visible', ':focus', ':active', ':checked'], 'Smart focus.', { mono: true }),
    mcq(3, 'Why prefer :user-invalid over :invalid?', ['It waits until the user has tried', 'It is faster', 'It works without a form', 'It adds a message'], 'No red before typing.'),
    mcq(4, 'What does .field:has(input:user-invalid) select?', ['A field that contains a wrong input', 'Every input', 'Inputs inside .field', 'Valid fields'], ':has() looks inside.'),
    mcq(5, 'What does font: inherit fix on form controls?', ['They use the page font', 'They become required', 'They get borders', 'They get bigger tap targets'], 'Controls don’t inherit fonts by default.'),
    swipe([
      ['outline: none alone is fine', false, 'It hides the focus.'],
      ['appearance: none removes the built-in look', true, 'So you can restyle it.'],
      ['Colour alone is enough to show an error', false, 'Add a message too.'],
      [':user-invalid waits for the user', true, 'Kinder than :invalid.'],
    ]),
    pairs([['accent-color', 'Checkbox colour'], [':focus-visible', 'Keyboard ring'], [':user-invalid', 'Wrong after trying'], [':has()', 'Style the parent']], 'Form styling tools.'),
    pickCode('Which gives a clear keyboard focus ring?', ['input:focus-visible { outline: 3px solid #4B3FD8; outline-offset: 2px; }', 'input:focus { outline: none; }', 'input:hover { outline: 3px solid; }', 'input { outline: 0; }'], 'A visible outline on :focus-visible.'),
    bugTask(['input { font: inheritt; }', 'input[type="checkbox"] { accent: #4B3FD8; }'], [[1, 'inheritt', 'inherit'], [2, 'accent:', 'accent-color:']], 'A misspelt value and the wrong property name are both ignored.'),
    xray(
      { html: '<div class="field"><label for="m">Email</label><input id="m" type="email" value="oops"><p class="msg">Please enter an email</p></div><label><input type="checkbox" checked> Updates</label>', css: `${STYLED} .field{display:grid;gap:4px;color:crimson;margin-bottom:8px} .field input{border-color:crimson} .msg{margin:0;font-size:13px}` },
      [
        ['.field', 'The red email field', '.field:has(input:user-invalid)', ['.field:has(input:user-invalid)', 'input:focus', 'color: red on body']],
        ['.msg', 'The error message', 'revealed by :has()', ['revealed by :has()', 'a placeholder', 'an alert']],
        ['input[type="checkbox"]', 'The purple checkbox', 'accent-color', ['accent-color', 'background', 'border-color']],
      ],
    ),
    arrange(['input, button {\n  font: inherit;\n}', 'input[type="checkbox"] {\n  accent-color: #4B3FD8;\n}', 'input:focus-visible {\n  outline: 3px solid #4B3FD8;\n}'], 'inherit the font first, then the checkbox colour, then the focus ring', PLAIN, FORM),
  ]),
];
