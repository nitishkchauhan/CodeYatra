// JavaScript Intermediate · Module 5 · Forms with JavaScript.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, DESK, explore, lesson, matchUp, mcq, pairs, pickCode, predictTask, recap, reveal, swipe, tapbug, tapPage, truth } from './kit';

const BOOK_HTML = `<form id="book">
  <label for="who">Your name</label>
  <input id="who" name="traveller" value="Ava Reed">
  <label for="no">Train number</label>
  <input id="no" name="train" value="90101">
  <label for="count">Passengers</label>
  <input id="count" name="passengers" type="number" value="2">
  <label for="seat">Seat</label>
  <select id="seat" name="seat"><option>Window</option><option>Aisle</option></select>
  <button>Book</button>
</form>
<p id="out" class="muted"></p>`;
const BOOK_JS = `document.querySelector("#book").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const booking = Object.fromEntries(data);
  booking.passengers = Number(booking.passengers);
  document.querySelector("#out").textContent = JSON.stringify(booking);
  console.log("Booking for " + booking.traveller + ": " + booking.passengers + " seats, " + booking.seat);
});`;

const RULE_HTML = `<form id="book">
  <label for="count">Passengers</label>
  <input id="count" name="passengers" type="number" min="1" value="12" required>
  <button>Book</button>
</form>
<p id="out" class="muted"></p>`;
const RULE_JS = `const count = document.querySelector("#count");
function checkCount() {
  const n = Number(count.value);
  count.setCustomValidity(n > 9 ? "9 passengers at most per booking" : "");
}
checkCount();
count.addEventListener("input", () => {
  checkCount();
  console.log(count.validity.valid ? "Looks good" : "Rule broken: " + count.validationMessage);
});
document.querySelector("#book").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#out").textContent = "Booked!";
  console.log("Booked " + count.value + " passengers");
});`;

const SAY_HTML = `<form id="f" novalidate>
  <label for="phone">Mobile number</label>
  <input id="phone" name="phone" inputmode="tel" aria-describedby="phone-err">
  <p id="phone-err" class="err" role="alert"></p>
  <button>Send</button>
</form>
<p id="sr" class="muted"></p>`;
const SAY_JS = `const phone = document.querySelector("#phone");
const message = document.querySelector("#phone-err");
document.querySelector("#f").addEventListener("submit", (e) => {
  e.preventDefault();
  const ok = /^\\d{10}$/.test(phone.value.trim());
  phone.setAttribute("aria-invalid", String(!ok));
  message.textContent = ok ? "" : "Enter a 10-digit mobile number";
  if (!ok) phone.focus();
  document.querySelector("#sr").textContent = "A screen reader says: “Mobile number, " + (ok ? phone.value : "invalid entry. " + message.textContent) + "”";
  console.log(ok ? "Sent" : "Read out: " + message.textContent);
});`;

export const JS_I_M5: Lesson[] = [
  lesson('js-i-5-1', 'Reading a whole form with FormData', 5, [
    atWork('Megan', ['City Travel Desk wants a booking form: name, train number, passengers and seat.', 'Reading every input one by one gets long. FormData reads the whole form in one go, using each field’s name.']),
    tapPage('Read the whole form', 'Change anything you like, then tap Book.', { html: BOOK_HTML, css: DESK, js: BOOK_JS }, 'Booking for', [{ submit: '#book' }], 'The keys come from each field’s name attribute: traveller, train, passengers, seat.'),
    explore('Reading it', ['const data = new FormData(e.target);', 'const booking = Object.fromEntries(data);', 'booking.passengers = Number(booking.passengers);', 'data.get("seat")'], [
      [1, 'Collect every field that has a name.', 'form'],
      [2, 'Turn it into a plain object: { traveller: "Ava Reed", train: "90101", … }.'],
      [3, 'Every value comes back as text, even from type="number". Convert it.', '#count'],
      [4, 'Or read just one field, by its name.', '#seat'],
    ], { page: { html: BOOK_HTML, css: DESK }, minTaps: 3 }),
    check('A field has no name attribute. What does FormData do with it?', ['Leaves it out', 'Uses its id instead', 'Throws an error', 'Adds it as "undefined"'], 'FormData only collects named fields.', 'The name is the key.', { mono: false }),
    tapbug('2 passengers plus 1 gives 21', ['const total = data.get("passengers") + 1;'], [[1, 'data.get("passengers")', 'Number(data.get("passengers"))']], 'Form values are always text, so + joins them. Convert to a number first.'),
    truth([
      ['FormData uses each field’s name as the key', true, 'No name, no entry.'],
      ['type="number" fields give back numbers', false, 'Text, always. Convert with Number().'],
      ['Without preventDefault the page reloads on submit', true, 'Stop it when JavaScript handles the form.'],
    ]),
    recap([
      ['📝', 'new FormData(form) reads every named field'],
      ['📦', 'Object.fromEntries turns it into an object'],
      ['🔢', 'Values are text: convert numbers'],
    ]),
  ]),

  lesson('js-i-5-2', 'Your own rules with setCustomValidity', 5, [
    atWork('Arden', ['I like the browser’s own error bubbles: they appear next to the field, in the user’s language.', 'But some rules are ours, like “9 passengers at most per booking”. Can those use the same bubbles?']),
    tapPage('Your own rule', 'Tap Book with 12 passengers: the browser shows your message. Then change it to 4.', { html: RULE_HTML, css: DESK, js: RULE_JS }, 'Looks good', [{ type: ['#count', '4'] }], 'The form can’t be sent while the field is invalid, so there is no extra check in the submit code.'),
    explore('Reading it', ['count.setCustomValidity("9 passengers at most per booking");', 'count.setCustomValidity("");', 'count.validity.valid', 'form.reportValidity()'], [
      [1, 'A message marks the field invalid, in your words.', '#count'],
      [2, 'An empty message means “fine again”. Forget it and the field stays invalid for ever.'],
      [3, 'true or false, for the built-in rules and yours together.'],
      [4, 'Show the bubbles now, without sending.', 'form'],
    ], { page: { html: RULE_HTML, css: DESK }, minTaps: 3 }),
    check('After setCustomValidity("Too many"), how do you make the field valid again?', ['setCustomValidity("")', 'setCustomValidity(false)', 'removeAttribute("invalid")', 'It clears itself'], 'An empty message clears your rule.', 'Give it an empty message.', { mono: true }),
    tapbug('The field stays invalid after fixing it', ['count.addEventListener("input", () => {', '  if (Number(count.value) > 9) count.setCustomValidity("9 at most");', '});'], [[2, 'count.setCustomValidity("9 at most");', 'count.setCustomValidity("9 at most"); else count.setCustomValidity("");']], 'Nothing ever clears the message, so the field stays invalid. Clear it when the value is fine.'),
    matchUp('Which tool?', [['required, min, max', 'Built-in rules, in HTML'], ['setCustomValidity', 'Your own rule and message'], ['validity.valid', 'Is the field OK now?'], ['reportValidity()', 'Show the bubbles']], 'HTML rules and your own, working together.'),
    recap([
      ['📏', 'setCustomValidity adds your own rule'],
      ['🧽', 'An empty message clears it'],
      ['💬', 'The browser shows it like its own errors'],
    ]),
  ]),

  lesson('js-i-5-3', 'Errors screen readers announce', 5, [
    atWork('Arden', ['A blind traveller filled in our form with a screen reader. The red error appeared, but nothing was read out, so they didn’t know why Send did nothing.', 'You used aria-describedby in HTML Intermediate. Now JavaScript must switch the error on and off, and make sure it is heard.']),
    reveal('Four things to do on an error', [
      ['aria-invalid="true"', 'Mark the field, so the screen reader says “invalid”.', '🚩'],
      ['aria-describedby', 'Point the field at its error text, so the message is read with it.', '🔗'],
      ['role="alert"', 'Text that appears in this box is read out at once.', '📢'],
      ['Move focus', 'Put the cursor in the first wrong field.', '🎯'],
    ]),
    tapPage('An error that is heard', 'Leave the number empty and tap Send. Then type 10 digits and send again.', { html: SAY_HTML, css: DESK, js: SAY_JS }, 'Read out:', [{ submit: '#f' }], 'The grey line shows what a screen reader would say. Without the ARIA parts it would only say “Mobile number”.'),
    check('Which makes an error message read out as soon as it appears?', ['role="alert" on the message', 'class="error"', 'color: red', 'title="error"'], 'An alert is announced the moment its text changes.', 'Which one is for screen readers?', { mono: true }),
    tapbug('The message isn’t read with the field', ['<input id="phone" aria-describedby="phone-error">', '<p id="phone-err" role="alert"></p>'], [[1, '"phone-error"', '"phone-err"']], 'aria-describedby must match the message’s id exactly.'),
    truth([
      ['Red text alone is enough for everyone', false, 'Screen readers don’t see colour.'],
      ['aria-invalid should go back to false when the value is fixed', true, 'Or the field is still called invalid.'],
      ['Moving focus to the wrong field helps keyboard and screen reader users', true, 'They land right where the fix is needed.'],
    ]),
    recap([
      ['🚩', 'aria-invalid marks the field'],
      ['🔗', 'aria-describedby links the message'],
      ['📢', 'role="alert" reads it out at once'],
    ]),
  ]),

  challenge('js-i-5-ch', 'Module 5 Challenge', { icon: '✅', name: 'Validator' }, ['Read whole forms with FormData', 'Add your own rules with setCustomValidity', 'Make errors that everyone can find and hear'], [
    mcq(1, 'What does new FormData(form) collect?', ['Every field that has a name', 'Every field with an id', 'Only text inputs', 'Only required fields'], 'The name is the key.'),
    mcq(2, 'What type are FormData values from text and number inputs?', ['Text (strings)', 'Numbers', 'True or false', 'It depends on the type'], 'Always text.'),
    mcq(3, 'Which clears a custom error?', ['setCustomValidity("")', 'setCustomValidity(null)', 'checkValidity()', 'reset()'], 'An empty message.', { mono: true }),
    mcq(4, 'Which attribute links a field to its error text?', ['aria-describedby', 'aria-label', 'for', 'role'], 'It points at the message’s id.', { mono: true }),
    mcq(5, 'Which role reads new text out straight away?', ['alert', 'button', 'note', 'banner'], 'role="alert".', { mono: true }),
    swipe([
      ['Object.fromEntries(new FormData(form)) gives a plain object', true, 'Keys are the field names.'],
      ['setCustomValidity("") marks a field invalid', false, 'An empty message makes it valid.'],
      ['aria-invalid tells screen readers a field is wrong', true, 'They say “invalid”.'],
      ['Colour alone is enough to show an error', false, 'Add text, ARIA and focus.'],
    ]),
    pairs([['FormData', 'Read the whole form'], ['setCustomValidity', 'Your own rule'], ['aria-invalid', 'Mark it wrong'], ['role="alert"', 'Read it out now']], 'Form tools.'),
    pickCode('Which turns a form into a plain object?', ['Object.fromEntries(new FormData(form))', 'form.values()', 'JSON.parse(form)', 'new Object(form)'], 'FormData, then fromEntries.'),
    bugTask(['const data = FormData(form);', 'field.setCustomValidity(true);', 'field.setAttribute("aria-invalid", ok);'], [[1, 'FormData(form)', 'new FormData(form)'], [2, 'true', '"9 passengers at most"'], [3, 'ok)', 'String(!ok))']], 'FormData needs new, setCustomValidity takes a message, and aria-invalid is "true" when the value is not ok.'),
    predictTask(['const entries = [["train", "90101"], ["passengers", "3"]];', 'const booking = Object.fromEntries(entries);', 'console.log(booking.passengers + 1);'], 'What does it print?', ['31', '4', 'NaN', '3 1'], '"3" is text, so + 1 joins them.'),
    arrange(['const booking = Object.fromEntries([["seat", "Window"], ["passengers", "2"]]);', 'booking.passengers = Number(booking.passengers);', 'console.log(booking.passengers + 1 + " seats, " + booking.seat);'], 'make the booking, convert the number, then add one seat', ['3 seats, Window']),
  ]),
];
