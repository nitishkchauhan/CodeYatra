// React · Final project: a course enquiry app for Sutton Classes (keeps the old id r-project). The 5 questions and
// tasks 1–5 of a Module Challenge, then the app built in 4 checked steps with a live React preview. Step 4 loads batch
// times from the practice server (/api/batches in lib/web/page.ts).
import type { Lesson, WebCheck } from '../../types';
import { finalProject } from '../htmlV5/kit';
import { bugTask, challenge, mcq, pairs, pickCode, swipe, UI, xray } from './kit';

const COURSES = `const COURSES = [
  { id: "m10", name: "Class 10 Maths", subject: "Maths", fee: 1800 },
  { id: "p12", name: "Class 12 Physics", subject: "Science", fee: 2200 },
  { id: "s9", name: "Class 9 Science", subject: "Science", fee: 1500 },
  { id: "e10", name: "Class 10 English", subject: "English", fee: 1200 },
];

function CourseCard({ course }) {
  return (
    <div className="card">
      <h3>{course.name}</h3>
      <p className="muted">₹{course.fee} a month</p>
    </div>
  );
}`;

const FORM = `function EnquiryForm({ courses }) {
  const [form, setForm] = useState({ name: "", phone: "", course: courses[0].id });
  const [message, setMessage] = useState("");
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function send(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setMessage("Please enter your name");
    } else if (!/^\\d{10}$/.test(form.phone)) {
      setMessage("The phone number needs 10 digits");
    } else {
      const course = courses.find((c) => c.id === form.course);
      setMessage("Thanks, " + form.name + "! We will call you about " + course.name + ".");
    }
  }
  return (
    <form className="card" onSubmit={send}>
      <h3>Send an enquiry</h3>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={form.name} onChange={change} />
      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" value={form.phone} onChange={change} />
      <label htmlFor="course">Course</label>
      <select id="course" name="course" value={form.course} onChange={change}>
        {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button>Send</button>
      <p className={message.startsWith("Thanks") ? "ok" : "err"}>{message}</p>
    </form>
  );
}`;

const BATCHES = `function Batches() {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let ignore = false;
    fetch("/api/batches")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load batch times");
        return res.json();
      })
      .then((data) => { if (!ignore) setBatches(data); })
      .catch((e) => { if (!ignore) setError(e.message); });
    return () => { ignore = true; };
  }, []);
  if (error) return <p className="err">{error}</p>;
  if (batches.length === 0) return <p className="muted">Loading batch times…</p>;
  return (
    <div className="card">
      <h3>Batch times</h3>
      <ul>{batches.map((b) => <li key={b.course}>{b.course}: {b.days}, {b.time}</li>)}</ul>
    </div>
  );
}`;

const LIST_ONE = `      <CourseCard course={COURSES[0]} />`;
const LIST_ALL = `      {COURSES.map((c) => <CourseCard key={c.id} course={c} />)}`;
const FILTERS = `      {["All", "Maths", "Science", "English"].map((s) => (
        <button key={s} onClick={() => setSubject(s)}>{s}</button>
      ))}
      <p className="muted">{shown.length} courses</p>
      {shown.map((c) => <CourseCard key={c.id} course={c} />)}`;

const app = (imports: string, parts: string[], state: string, list: string, extra: string) =>
  `${imports}${COURSES}\n\n${parts.map((p) => `${p}\n\n`).join('')}function App() {\n${state}  return (\n    <div>\n      <h2>Sutton Classes</h2>\n${list}\n${extra}    </div>\n  );\n}\n`;

const STATE = `  const [subject, setSubject] = useState("All");\n  const shown = subject === "All" ? COURSES : COURSES.filter((c) => c.subject === subject);\n`;
const USE_STATE = 'import { useState } from "react";\n\n';
const BOTH_HOOKS = 'import { useState, useEffect } from "react";\n\n';

const P0 = app('', [], '', LIST_ONE, '');
const P1 = app('', [], '', LIST_ALL, '');
const P2 = app(USE_STATE, [], STATE, FILTERS, '');
const P3 = app(USE_STATE, [FORM], STATE, FILTERS, '      <EnquiryForm courses={COURSES} />\n');
const P4 = app(BOTH_HOOKS, [FORM, BATCHES], STATE, FILTERS, '      <Batches />\n      <EnquiryForm courses={COURSES} />\n');

const step = (n: number, title: string, instructions: string, starter: string, solution: string, checks: Omit<WebCheck, 'file'>[], hint: string) => ({
  ...finalProject({
    title: `Step ${n} · ${title}`,
    instructions,
    starter: { html: '<div id="root"></div>', css: UI, js: starter },
    solution: { html: '<div id="root"></div>', css: UI, js: solution },
    checks: checks.map((c) => ({ ...c, file: 'js' as const })),
    hint,
    react: true,
  }),
});

export const R_PROJECT: Lesson = challenge('r-project', 'Final: a course enquiry app', { icon: '🏆', name: 'React Pro' }, ['Build an app from components, props and lists', 'Filter with state and check a controlled form', 'Load data from a server in an effect'], [
  mcq(1, 'How should you show every course in an array?', ['courses.map((c) => <CourseCard key={c.id} course={c} />)', 'A for loop inside JSX', 'Copy the card once for each course', 'courses.forEach(…) inside JSX'], 'map gives back a list of elements, each with a key.', { mono: true }),
  mcq(2, 'Why does each card need a key?', ['So React can tell the items apart when the list changes', 'For CSS', 'To sort the list', 'Keys are optional and do nothing'], 'A stable id from the data is best.'),
  mcq(3, 'The shown courses depend on the chosen subject. What should be state?', ['Only the subject; the shown list is worked out from it', 'The subject and the shown list', 'Only the shown list', 'Nothing'], 'One source of truth.'),
  mcq(4, 'What makes an input “controlled”?', ['Its value comes from state, and onChange updates the state', 'It has an id', 'It is inside a form', 'It has a label'], 'value={…} plus onChange.'),
  mcq(5, 'Where should the batch times be fetched?', ['In a useEffect with an empty list', 'In the component body', 'In the button’s onClick', 'In the reducer'], 'Once, after the first draw.'),
  swipe([
    ['A form’s onSubmit should call e.preventDefault()', true, 'Or the page reloads.'],
    ['The index is always the best key', false, 'Use an id from the data.'],
    ['An effect that fetches should handle errors', true, 'Show a message, not a blank screen.'],
    ['Each input needs its own useState', false, 'One object in state can hold every field.'],
  ]),
  pairs([['COURSES.map', 'Every course'], ['useState("All")', 'The chosen subject'], ['value + onChange', 'A controlled input'], ['useEffect + fetch', 'Load from a server']], 'The app’s pieces.'),
  pickCode('Which updates one field of the form object?', ['setForm({ ...form, [e.target.name]: e.target.value })', 'form[e.target.name] = e.target.value', 'setForm(e.target.value)', 'setForm({ [e.target.name]: e.target.value })'], 'Copy the form, then change one field by its name.'),
  bugTask(['{COURSES.map((c) => <CourseCard course={c} />)}', 'const [shown, setShown] = useState(COURSES);', 'function send(e) { setMessage("Thanks!"); }'], [[1, '<CourseCard course={c} />', '<CourseCard key={c.id} course={c} />'], [2, 'const [shown, setShown] = useState(COURSES);', 'const shown = COURSES.filter((c) => subject === "All" || c.subject === subject);'], [3, '{ setMessage(', '{ e.preventDefault(); setMessage(']], 'Give each card a key, work out the shown list, and stop the form reloading the page.'),
  xray('<div><h2>Sutton Classes</h2><button>Science</button><p class="muted">2 courses</p><div class="card"><h3>Class 12 Physics</h3></div><form class="card"><input id="name"></form></div>', [
    ['button', 'A subject button', 'setSubject(s)', ['setSubject(s)', 'shown.length', '<CourseCard course={c} />', 'value={form.name}']],
    ['.muted', 'How many courses', 'shown.length', ['setSubject(s)', 'shown.length', '<CourseCard course={c} />', 'value={form.name}']],
    ['div.card', 'A course', '<CourseCard course={c} />', ['setSubject(s)', 'shown.length', '<CourseCard course={c} />', 'value={form.name}']],
    ['input', 'The name box', 'value={form.name}', ['setSubject(s)', 'shown.length', '<CourseCard course={c} />', 'value={form.name}']],
  ]),
  step(1, 'Show every course', 'Sutton Classes wants an app where students can browse courses and send an enquiry. Right now it shows only the first course. Show every course in COURSES, each with a key.', P0, P1, [
    { label: 'Maps over COURSES', pattern: /\{COURSES\.map\(\(c\) =>/ },
    { label: 'Each card has a key', pattern: /<CourseCard key=\{c\.id\} course=\{c\} \/>/ },
  ], '{COURSES.map((c) => <CourseCard key={c.id} course={c} />)}'),
  step(2, 'Filter by subject', 'Add a button for each subject (All, Maths, Science, English). Keep the chosen subject in state and work out the courses to show from it.', P1, P2, [
    { label: 'The subject is state', pattern: /useState\("All"\)/ },
    { label: 'The shown list is worked out', pattern: /COURSES\.filter\(\(c\) => c\.subject === subject\)/ },
    { label: 'Each button sets the subject', pattern: /onClick=\{\(\) => setSubject\(s\)\}/ },
  ], 'const shown = subject === "All" ? COURSES : COURSES.filter((c) => c.subject === subject);'),
  step(3, 'The enquiry form', 'Add an EnquiryForm with name, phone and course. Keep every field in one state object, stop the page reloading, and check the name and a 10-digit phone before saying thanks.', P2, P3, [
    { label: 'Controlled inputs', pattern: /value=\{form\.name\}[\s\S]*value=\{form\.phone\}/ },
    { label: 'One change handler for every field', pattern: /\[e\.target\.name\]: e\.target\.value/ },
    { label: 'Stops the page reloading', pattern: /e\.preventDefault\(\)/ },
    { label: 'Checks for 10 digits', pattern: /\^\\d\{10\}\$/ },
  ], 'setForm({ ...form, [e.target.name]: e.target.value }); and in send: e.preventDefault(); then check /^\\d{10}$/.test(form.phone)'),
  step(4, 'Load the batch times', 'Add a Batches component that loads /api/batches once, after the first draw. Show “Loading…” first, an error if the server fails, and then the list.', P3, P4, [
    { label: 'Fetches in an effect', pattern: /useEffect\(\(\) => \{[\s\S]*fetch\("\/api\/batches"\)/ },
    { label: 'Runs once', pattern: /\}, \[\]\);/ },
    { label: 'Ignores a late answer', pattern: /return \(\) => \{ ignore = true; \};/ },
    { label: 'Shows each batch', pattern: /batches\.map\(\(b\) =>/ },
  ], 'useEffect(() => { let ignore = false; fetch("/api/batches").then(…); return () => { ignore = true; }; }, []);'),
], { kind: 'project', level: 'intermediate' });
