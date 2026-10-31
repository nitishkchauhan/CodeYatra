// React · Module 7 · Forms. Lesson 7.1 keeps the old module id (r-form).
// Pages log what they draw, so each typed value and each send can be checked in tests.
import type { Lesson } from '../../types';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, truth, xray } from './kit';

const NAME = ['import { useState } from "react";', '', 'function App() {', '  const [name, setName] = useState("");', '  console.log("Typed: " + name);', '  return (', '    <div className="card">', '      <label htmlFor="who">Your name</label>', '      <input id="who" value={name} onChange={(e) => setName(e.target.value)} />', '      <p>{name ? "Hello, " + name + "!" : "Type your name"}</p>', '    </div>', '  );', '}'];

const BOOKING = `import { useState } from "react";

function App() {
  const [form, setForm] = useState({ name: "", cups: "1", seat: "Window" });
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  console.log("Booking: " + form.name + ", " + form.cups + " cups, " + form.seat);
  return (
    <form className="card">
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={form.name} onChange={change} />
      <label htmlFor="cups">Cups</label>
      <input id="cups" name="cups" type="number" value={form.cups} onChange={change} />
      <label htmlFor="seat">Seat</label>
      <select id="seat" name="seat" value={form.seat} onChange={change}>
        <option>Window</option>
        <option>Aisle</option>
      </select>
    </form>
  );
}`;

const CHECKED = `import { useState } from "react";

function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  function send(e) {
    e.preventDefault();
    if (!/^\\d{10}$/.test(phone)) {
      setError("Enter a 10-digit mobile number");
      console.log("Not sent: " + phone);
      return;
    }
    setError("");
    console.log("Sent: " + phone);
  }
  return (
    <form id="f" className="card" onSubmit={send} noValidate>
      <label htmlFor="phone">Mobile number</label>
      <input id="phone" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={error ? "true" : "false"} aria-describedby="phone-err" />
      <p id="phone-err" className="err" role="alert">{error}</p>
      <button>Send</button>
    </form>
  );
}`;

export const R_M7: Lesson[] = [
  lesson('r-form', 'Controlled inputs', 5, [
    chat(['In React, an input’s value usually lives in state. The input shows the state, and typing updates the state.', 'This is called a controlled input: React is always in charge of what it shows.']),
    tapPage('Type and see', 'Type a name.', app(NAME.join('\n')), 'Typed: Ava', [{ type: ['#who', 'Ava'] }], 'Every key press updates name, and the greeting draws again.'),
    explore('The controlled input', NAME, [
      [4, 'State holds the text, starting empty.'],
      [9, 'value={name} shows the state; onChange saves each change.', '#who'],
      [10, 'Anything else can use the same state straight away.', 'p'],
    ], { page: app(NAME.join('\n')), minTaps: 2 }),
    check('An input has value={name} but no onChange. What happens when you type?', ['Nothing changes: React keeps showing name', 'It works normally', 'The page reloads', 'name updates by itself'], 'Without onChange, nothing updates the state.', 'Who changes name?'),
    tapbug('You can’t type in the box', ['<input value={name} />'], [[1, '<input value={name} />', '<input value={name} onChange={(e) => setName(e.target.value)} />']], 'A controlled input needs onChange to save what is typed.'),
    recap([
      ['🎛', 'value={state} shows the state'],
      ['⌨️', 'onChange saves each change'],
      ['🧠', 'The rest of the page can use it at once'],
    ]),
  ]),

  lesson('r-b-7-2', 'Several fields in one state', 5, [
    tapPage('A booking form', 'Fill in a name and choose 3 cups.', app(BOOKING), 'Booking: Ava, 3 cups, Window', [{ type: ['#name', 'Ava'] }, { type: ['#cups', '3'] }], 'One change function updates whichever field you typed in.'),
    reveal('One function for every field', [
      ['useState({ name: "", cups: "1", seat: "Window" })', 'One object holds every field.'],
      ['name="cups"', 'Each input’s name matches a key in the object.'],
      ['{ ...form, [e.target.name]: e.target.value }', 'Copy the form, and replace only the field that changed.'],
    ], { mono: true }),
    check('Why { ...form, … } instead of changing form.cups?', ['React needs a new object to notice the change', 'It is shorter', 'Objects can’t be changed', 'It saves memory'], 'Copy, then change the copy.', 'How does React know something changed?'),
    tapbug('Typing in Cups wipes the name', ['setForm({ [e.target.name]: e.target.value });'], [[1, '{ [e.target.name]', '{ ...form, [e.target.name]']], 'Without ...form, the new object has only the field you typed in.'),
    truth([
      ['Input values are text, even for type="number"', true, 'Convert with Number() when you need maths.'],
      ['A select can be controlled with value and onChange too', true, 'Just like an input.'],
      ['Every field needs its own change function', false, 'One function can use e.target.name.'],
    ]),
    recap([
      ['📦', 'One object can hold every field'],
      ['🏷', 'name on each input matches a key'],
      ['📋', '{ ...form, [name]: value } updates one field'],
    ]),
  ]),

  lesson('r-b-7-3', 'Checking a form before sending', 5, [
    tapPage('Check, then send', 'Send it empty first, then type 9876543210 and send again.', app(CHECKED), 'Sent: 9876543210', [{ submit: '#f' }, { type: ['#phone', '9876543210'] }, { submit: '#f' }], 'The error is in state, so it shows and hides by itself, and screen readers hear it.'),
    explore('How it checks', ['e.preventDefault();', 'if (!/^\\d{10}$/.test(phone)) {', '  setError("Enter a 10-digit mobile number");', '  return;', '}', 'setError("");'], [
      [1, 'Stay on the page.'],
      [2, 'Check the number: exactly 10 digits.'],
      [3, 'Save the message in state, so it is shown.'],
      [4, 'Stop: don’t send.'],
      [6, 'All good: clear the message and send.'],
    ], { minTaps: 3 }),
    matchUp('Accessible errors', [['aria-invalid', 'Marks the field as wrong'], ['aria-describedby', 'Links the field to its message'], ['role="alert"', 'Reads the message out'], ['inputMode="tel"', 'Shows a phone keypad']], 'Errors everyone can find and hear.'),
    check('Where should the error message live?', ['In state, so it shows when set', 'In a normal variable', 'In the CSS', 'In the label'], 'Changing state draws it.', 'What draws again?'),
    tapbug('The error never goes away', ['if (ok) {', '  console.log("Sent");', '}'], [[2, 'console.log("Sent");', 'setError(""); console.log("Sent");']], 'Clear the error when the form is fine.'),
    recap([
      ['🔍', 'Check in onSubmit before sending'],
      ['💬', 'Keep the error message in state'],
      ['♿', 'aria-invalid, aria-describedby, role="alert"'],
    ]),
  ]),

  challenge('r-b-7-ch', 'Module 7 Challenge', { icon: '📝', name: 'Form Builder' }, ['Control inputs with state', 'Handle many fields with one function', 'Check forms and show errors everyone can hear'], [
    mcq(1, 'What makes an input “controlled”?', ['value comes from state, and onChange updates it', 'It has an id', 'It is inside a form', 'It has a label'], 'React is in charge of its value.'),
    mcq(2, 'Which reads what was typed?', ['e.target.value', 'e.value', 'e.target.text', 'e.input'], 'From the event object.', { mono: true }),
    mcq(3, 'Which updates one field of a form object?', ['setForm({ ...form, cups: "3" })', 'form.cups = "3"', 'setForm({ cups: "3" })', 'setForm(form.cups = "3")'], 'Copy, then replace.', { mono: true }),
    mcq(4, 'What type is an input’s value?', ['Text', 'A number', 'It depends on type', 'A boolean'], 'Always text.'),
    mcq(5, 'Where does a form check go?', ['In onSubmit, before sending', 'In the CSS', 'In the label', 'After the page reloads'], 'Check, then send or show an error.'),
    swipe([
      ['value without onChange makes a box you can’t type in', true, 'Nothing updates the state.'],
      ['One change function can handle many fields', true, 'With e.target.name.'],
      ['setForm({ cups: "3" }) keeps the other fields', false, 'Spread ...form first.'],
      ['Error messages belong in state', true, 'So they show and hide.'],
    ]),
    pairs([['value={name}', 'Show the state'], ['onChange', 'Save each change'], ['...form', 'Keep the other fields'], ['role="alert"', 'Read errors out']], 'Form tools.'),
    pickCode('Which is a working controlled input?', ['<input value={name} onChange={(e) => setName(e.target.value)} />', '<input value={name} />', '<input onChange={setName} />', '<input value="name" onChange={name} />'], 'Value from state, and onChange to update it.'),
    bugTask(['<input value={name} />', 'setForm({ [e.target.name]: e.target.value });', 'function send(e) { console.log("Sent"); }'], [[1, '<input value={name} />', '<input value={name} onChange={(e) => setName(e.target.value)} />'], [2, '{ [e.target.name]', '{ ...form, [e.target.name]'], [3, '{ console.log', '{ e.preventDefault(); console.log']], 'Add onChange, keep the other fields, and stop the reload.'),
    xray('<form class="card"><label>Mobile number</label><input value="123"><p class="err" role="alert">Enter a 10-digit mobile number</p><button>Send</button></form>', [
      ['input', 'The number box', 'value={phone} onChange={…}', ['value={phone} onChange={…}', '{error}', 'onSubmit={send}']],
      ['.err', 'The message', '{error}', ['{error}', 'value={phone} onChange={…}', 'onSubmit={send}']],
      ['form', 'The form', 'onSubmit={send}', ['onSubmit={send}', '{error}', 'value={phone} onChange={…}']],
    ]),
    arrange(['import { useState } from "react";', 'function App() {', '  const [name, setName] = useState("Ava");', '  return <label className="card">Name: {name} <input value={name} onChange={(e) => setName(e.target.value)} /></label>;', '}'], 'import, start the component, make the state, then the controlled input'),
  ]),
];
