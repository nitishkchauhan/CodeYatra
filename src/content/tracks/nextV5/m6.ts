// Next.js · Module 6 · Forms and Server Actions: Server Actions, form handling and validation, file upload, and data
// mutations with optimistic UI. Lesson 6.1 keeps the old module id (nx-actions-1).
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, lesson, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const ORDERS = [
  'import { revalidatePath } from "next/cache";',
  'import { db } from "@/lib/db";',
  '',
  'export default async function Orders() {',
  '  const orders = await db.order.findMany();',
  '  console.log("Orders page made with " + orders.length + " in the list");',
  '',
  '  async function placeOrder(formData) {',
  '    "use server";',
  '    const dish = formData.get("dish");',
  '    await db.order.create({ data: { dish } });',
  '    revalidatePath("/orders");',
  '  }',
  '',
  '  return (',
  '    <form id="order" action={placeOrder}>',
  '      <select name="dish" defaultValue="Lemon Tea">',
  '        <option>Lemon Tea</option>',
  '        <option>Cheese Toast</option>',
  '      </select>',
  '      <button>Order</button>',
  '      <ul>{orders.map((o) => <li key={o.id}>{o.dish}</li>)}</ul>',
  '    </form>',
  '  );',
  '}',
];

const ACTIONS = [
  '"use server";',
  'import { db } from "@/lib/db";',
  '',
  'export async function saveEnquiry(previous, formData) {',
  '  const name = String(formData.get("name") ?? "").trim();',
  '  const phone = String(formData.get("phone") ?? "").trim();',
  '  if (!name) return { error: "Please enter your name." };',
  '  if (!/^\\d{10}$/.test(phone)) return { error: "The phone number needs 10 digits." };',
  '  await db.enquiry.create({ data: { name, phone } });',
  '  console.log("Saved enquiry from " + name);',
  '  return { error: "", done: "Thanks " + name + ", we will call you." };',
  '}',
];
const FORM = [
  '"use client";',
  'import { useActionState } from "react";',
  'import { useFormStatus } from "react-dom";',
  'import { saveEnquiry } from "./actions";',
  '',
  'function Send() {',
  '  const { pending } = useFormStatus();',
  '  return <button disabled={pending}>{pending ? "Sending…" : "Send"}</button>;',
  '}',
  '',
  'export default function Enquiry() {',
  '  const [state, formAction] = useActionState(saveEnquiry, { error: "" });',
  '  return (',
  '    <form id="enquiry" action={formAction}>',
  '      <label htmlFor="name">Name</label>',
  '      <input id="name" name="name" />',
  '      <label htmlFor="phone">Phone</label>',
  '      <input id="phone" name="phone" inputMode="numeric" />',
  '      <Send />',
  '      {state.error && <p className="err">{state.error}</p>}',
  '      {state.done && <p className="ok">{state.done}</p>}',
  '    </form>',
  '  );',
  '}',
];
const FORM_APP = { ...CAFE, 'app/enquiry/actions.js': ACTIONS, 'app/enquiry/Enquiry.js': FORM, 'app/enquiry/page.js': ['import Enquiry from "./Enquiry";', '', 'export default function Page() {', '  return (', '    <>', '      <h1>Sutton Classes: enquiry</h1>', '      <Enquiry />', '    </>', '  );', '}'] };

const UPLOAD_ACTION = [
  '"use server";',
  '',
  'const TYPES = ["image/jpeg", "image/png", "image/webp"];',
  '',
  'export async function uploadPhoto(previous, formData) {',
  '  const file = formData.get("photo");',
  '  if (!file || file.size === 0) return "Choose a picture first.";',
  '  if (!TYPES.includes(file.type)) return "Only JPEG, PNG or WebP pictures.";',
  '  if (file.size > 2 * 1024 * 1024) return "The picture must be under 2 MB.";',
  '  const bytes = Buffer.from(await file.arrayBuffer());',
  '  await saveToStorage(file.name, bytes);',
  '  return "Uploaded " + file.name;',
  '}',
];
const UPLOAD_FORM = [
  '"use client";',
  'import { useActionState } from "react";',
  'import { uploadPhoto } from "./actions";',
  '',
  'export default function Upload() {',
  '  const [message, formAction] = useActionState(uploadPhoto, "");',
  '  return (',
  '    <form id="upload" action={formAction}>',
  '      <input type="file" name="photo" accept="image/*" />',
  '      <button>Upload</button>',
  '      <p className="muted">{message}</p>',
  '    </form>',
  '  );',
  '}',
];
// The practice copy checks the file the same way, then logs what it would store.
const UPLOAD_PRACTICE = [
  '"use server";',
  '',
  'const TYPES = ["image/jpeg", "image/png", "image/webp"];',
  '',
  'export async function uploadPhoto(previous, formData) {',
  '  const file = formData.get("photo");',
  '  if (!file || file.size === 0) {',
  '    console.log("Upload stopped: no file");',
  '    return "Choose a picture first.";',
  '  }',
  '  if (!TYPES.includes(file.type)) return "Only JPEG, PNG or WebP pictures.";',
  '  if (file.size > 2 * 1024 * 1024) return "The picture must be under 2 MB.";',
  '  console.log("Would store " + file.name);',
  '  return "Uploaded " + file.name;',
  '}',
];
const UPLOAD_APP = { ...CAFE, 'app/photo/actions.js': UPLOAD_PRACTICE, 'app/photo/Upload.js': UPLOAD_FORM, 'app/photo/page.js': ['import Upload from "./Upload";', '', 'export default function Page() {', '  return (', '    <>', '      <h1>Send us a photo of your dish</h1>', '      <Upload />', '    </>', '  );', '}'] };

const LIKES_ACTIONS = ['"use server";', 'import { revalidatePath } from "next/cache";', 'import { db } from "@/lib/db";', '', 'export async function addReview(text) {', '  await db.review.create({ data: { text } });', '  console.log("Saved review: " + text);', '  revalidatePath("/reviews");', '}'];
const LIKES = [
  '"use client";',
  'import { useOptimistic, startTransition } from "react";',
  'import { addReview } from "./actions";',
  '',
  'export default function Reviews({ reviews }) {',
  '  const [shown, addShown] = useOptimistic(reviews, (list, text) => [...list, text + " (saving…)"]);',
  '  function add(text) {',
  '    startTransition(async () => {',
  '      addShown(text);',
  '      await addReview(text);',
  '    });',
  '  }',
  '  return (',
  '    <div>',
  '      <button id="great" onClick={() => add("Great tea!")}>Add “Great tea!”</button>',
  '      <ul>{shown.map((r, i) => <li key={i}>{r}</li>)}</ul>',
  '    </div>',
  '  );',
  '}',
];
const LIKES_PAGE = ['import { db } from "@/lib/db";', 'import Reviews from "./Reviews";', '', 'export default async function Page() {', '  const reviews = await db.review.findMany();', '  return <Reviews reviews={reviews.map((r) => r.text)} />;', '}'];
const LIKES_APP = { ...CAFE, 'app/reviews/actions.js': LIKES_ACTIONS, 'app/reviews/Reviews.js': LIKES, 'app/reviews/page.js': LIKES_PAGE };

export const NX_M6: Lesson[] = [
  lesson('nx-actions-1', 'Server Actions', 8, [
    chat(['A Server Action is a function that runs on the server, but you can call it from a form or a button in the page.', 'Mark it with "use server". Put it as a form’s action, and Next.js sends the form data to the server for you. No API route needed.']),
    tapPage('Order without an API', 'Pick a dish and tap Order.', app({ ...CAFE, 'app/orders/page.js': ORDERS }, '/orders'), 'Orders page made with 1 in the list', [{ submit: '#order' }], 'The action saved the order on the server, then revalidatePath made the page again with it.'),
    explore('A Server Action in a form', ORDERS, [
      [8, 'A function inside the page…'],
      [9, '…marked "use server": it runs only on the server.'],
      [10, 'It gets the form’s FormData. get("dish") reads the field named dish.'],
      [12, 'Make /orders again so it shows the new order.'],
      [16, 'The form’s action is the function itself.'],
    ]),
    reveal('Where Server Actions can live', [
      ['Inside a Server Component', 'A function with "use server" as its first line.'],
      ['In their own file', 'A file starting with "use server": every export is an action. Client Components import from there.'],
      ['Not just forms', 'Call one from a button’s onClick too.'],
      ['Treat as public', 'Anyone can call it. Check the input and the user inside it.'],
    ]),
    tapbug('The order is saved but the list never changes', ['async function placeOrder(formData) {', '  "use server";', '  await db.order.create({ data: { dish: formData.get("dish") } });', '}'], [[3, 'formData.get("dish") } });', 'formData.get("dish") } }); revalidatePath("/orders");']], 'After changing data, refresh the page with revalidatePath.'),
    check('What does "use server" mark?', ['A function that runs on the server and can be called from the page', 'A Server Component', 'A page that is static', 'A file that can’t be imported'], 'It makes a Server Action.', 'Which runs on the server, but is called from a form?'),
    recap([
      ['⚙', '"use server" makes a Server Action'],
      ['📝', '<form action={fn}>: the form data goes to the server'],
      ['🔄', 'Change data, then revalidatePath'],
    ]),
  ], 'intermediate'),

  lesson('nx-i-6-2', 'Form handling and validation', 9, [
    chat(['Forms need checking. Check in the browser for quick hints, but always check again on the server: anyone can send anything to a Server Action.', 'useActionState gives the action’s answer back to the form, so it can show an error or a thank-you.']),
    tapPage('An enquiry form that checks', 'Send it empty first. Then fill in Ava Brooks, 9876543210, and send again.', app(FORM_APP, '/enquiry'), 'Saved enquiry from Ava Brooks', [{ submit: '#enquiry' }, { type: ['#name', 'Ava Brooks'] }, { type: ['#phone', '9876543210'] }, { submit: '#enquiry' }], 'The server said what was wrong; the form showed it. Then the good data was saved.'),
    explore('The action checks everything', ACTIONS, [
      [1, 'Every export in this file is a Server Action.'],
      [4, 'With useActionState, it gets the last answer and the form data.'],
      [7, 'Missing name: send back an error.'],
      [8, 'Exactly 10 digits.'],
      [11, 'All good: save, and say thanks.'],
    ]),
    explore('The form', FORM, [
      [7, 'useFormStatus tells a button inside the form if it is sending.'],
      [12, 'state is what the action last sent back.'],
      [14, 'formAction runs saveEnquiry on the server.'],
      [20, 'Show the error, if there is one.'],
    ], { page: app(FORM_APP, '/enquiry'), minTaps: 3 }),
    reveal('Checking well', [
      ['required, type, pattern', 'Quick hints in the browser, before sending.'],
      ['On the server', 'The real check: trim, test, and send back a clear message.'],
      ['Libraries', 'Teams often describe the rules once with Zod, then reuse them.'],
    ]),
    tapbug('Anyone can save an enquiry with no name', ['export async function saveEnquiry(previous, formData) {', '  const name = formData.get("name");', '  await db.enquiry.create({ data: { name } });'], [[2, 'const name = formData.get("name");', 'const name = String(formData.get("name") ?? "").trim(); if (!name) return { error: "Please enter your name." };']], 'Check on the server, every time.'),
    check('Why check again on the server when the browser already checks?', ['Anyone can call the action directly, skipping the browser', 'The browser is slow', 'Server checks are free', 'React needs it'], 'Never trust what arrives.', 'Who else can send data?'),
    recap([
      ['🔁', 'useActionState: the action’s answer goes back to the form'],
      ['⏳', 'useFormStatus: pending while sending'],
      ['🛡', 'Always check on the server'],
    ]),
  ]),

  lesson('nx-i-6-3', 'File upload', 8, [
    chat(['A form can send a file too: <input type="file" name="photo" />.', 'In the Server Action, formData.get("photo") is a File, with its name, type and size.']),
    tapPage('Upload a photo', 'Tap Upload without choosing a picture.', app(UPLOAD_APP, '/photo'), 'Upload stopped: no file', [{ submit: '#upload' }], 'The server checked and stopped. On your phone you can also choose a real picture.'),
    explore('Checking a file on the server', UPLOAD_ACTION, [
      [6, 'A File object.'],
      [7, 'Nothing chosen: size 0.'],
      [8, 'Only allow the types you expect.'],
      [9, 'Limit the size: 2 MB here.'],
      [10, 'Read the bytes…'],
      [11, '…and save them to storage.'],
    ]),
    reveal('Where uploaded files go', [
      ['Not public/', 'public/ is fixed at build time; new files there don’t appear on most hosts.'],
      ['Cloud storage', 'An object store such as Amazon S3, Vercel Blob or Supabase Storage.'],
      ['The database', 'Store only the file’s address and details, not the bytes.'],
      ['Size limit', 'Server Actions accept 1 MB by default; raise bodySizeLimit in next.config.js for more.'],
    ]),
    tapbug('A 50 MB video gets uploaded', ['const file = formData.get("photo");', 'await saveToStorage(file.name, file);'], [[2, 'await saveToStorage(', 'if (file.size > 2 * 1024 * 1024) return "Too big"; await saveToStorage(']], 'Check the size (and type) before storing.'),
    check('What is formData.get("photo") for a file input?', ['A File, with name, type and size', 'The file’s address on the phone', 'A string of text', 'Always null'], 'Read it with arrayBuffer().', 'What do you check next?'),
    recap([
      ['📎', 'type="file" sends a File in FormData'],
      ['🔍', 'Check type and size on the server'],
      ['☁', 'Store files in cloud storage, their details in the database'],
    ]),
  ]),

  lesson('nx-i-6-4', 'Data mutations and optimistic UI', 8, [
    chat(['A mutation is a change to data: add, edit or delete. After one, refresh what shows it, with revalidatePath or updateTag.', 'Saving takes a moment. Optimistic UI shows the change straight away, as if it worked, and fixes it if it didn’t.']),
    tapPage('Instant reviews', 'Add a review. It appears at once, then the saved copy replaces it.', app(LIKES_APP, '/reviews'), 'Saved review: Great tea!', [{ click: '#great' }], 'useOptimistic showed “(saving…)” while the Server Action ran.'),
    explore('useOptimistic', LIKES, [
      [6, 'shown starts as the real reviews; addShown adds a guess.'],
      [8, 'Optimistic updates happen inside a transition.'],
      [9, 'Show it now…'],
      [10, '…then save it on the server.'],
      [16, 'The list shows the guess until the real data arrives.', 'ul'],
    ], { page: app(LIKES_APP, '/reviews'), minTaps: 3 }),
    toggle('After the change', [
      ['revalidatePath', ['await db.review.create({ data: { text } });', 'revalidatePath("/reviews");'], 'Make that page again with fresh data.'],
      ['updateTag', ['await db.review.create({ data: { text } });', 'updateTag("reviews");'], 'Refresh cached data with that tag, at once.'],
      ['redirect', ['await db.review.create({ data: { text } });', 'redirect("/reviews/thanks");'], 'Send the visitor to another page.'],
    ]),
    truth([
      ['Optimistic UI shows a change before the server confirms it', true, 'And rolls back if it fails.'],
      ['useOptimistic replaces saving the data', false, 'It only changes what is shown meanwhile.'],
      ['A Server Action can be called from onClick', true, 'Inside startTransition here.'],
    ]),
    recap([
      ['✏', 'Mutations: change data, then refresh what shows it'],
      ['⚡', 'useOptimistic shows the result at once'],
      ['↩', 'redirect after a change to move on'],
    ]),
  ]),

  challenge('nx-i-6-ch', 'Module 6 Challenge', { icon: '📝', name: 'Form Pro' }, ['Handle forms with Server Actions', 'Check input and show errors', 'Upload files and update the page instantly'], [
    mcq(1, 'What makes a function a Server Action?', ['"use server" at its start (or at the top of its file)', '"use client"', 'Naming it action', 'Putting it in route.js'], 'It runs on the server.', { mono: false }),
    mcq(2, 'What does a form action get?', ['FormData', 'The event', 'A Response', 'Nothing'], 'formData.get("name").'),
    mcq(3, 'Which hook gives an action’s answer back to the form?', ['useActionState', 'useState', 'useFormStatus', 'useEffect'], 'From react.', { mono: true }),
    mcq(4, 'Which hook tells a button the form is sending?', ['useFormStatus', 'useActionState', 'useOptimistic', 'useRouter'], 'From react-dom.', { mono: true }),
    mcq(5, 'Where should uploaded pictures be stored?', ['In cloud storage, with details in the database', 'In public/ at run time', 'In a cookie', 'In localStorage'], 'public/ is fixed at build time.'),
    swipe([
      ['Server Actions should check their input', true, 'Anyone can call them.'],
      ['Browser checks are enough', false, 'Check on the server too.'],
      ['useOptimistic shows a change before it is saved', true, 'Then the real data replaces it.'],
      ['revalidatePath refreshes a page after a change', true, 'So it shows new data.'],
    ]),
    pairs([['"use server"', 'A Server Action'], ['useActionState', 'The action’s answer'], ['useFormStatus', 'Sending or not'], ['useOptimistic', 'Show it now']], 'Forms in Next.js.'),
    pickCode('Which checks for 10 digits on the server?', ['if (!/^\\d{10}$/.test(phone)) return { error: "10 digits" };', '<input pattern="\\d{10}" />', 'phone.length > 0', 'if (phone) save();'], 'A pattern in the browser helps; the server check counts.'),
    bugTask(['export async function save(formData) {', '  await db.order.create({ data: { dish: formData.dish } });', '}'], [[1, 'export async function save(formData) {', 'export async function save(formData) { "use server";'], [2, 'formData.dish', 'formData.get("dish")']], 'Mark it "use server", and read fields with get.'),
    xray('<form><input name="name"><button disabled>Sending…</button><p class="err">Please enter your name.</p><li>Great tea! (saving…)</li></form>', [
      ['button', 'The busy button', 'useFormStatus', ['useFormStatus', 'useActionState', 'useOptimistic']],
      ['.err', 'The error from the server', 'useActionState', ['useFormStatus', 'useActionState', 'useOptimistic']],
      ['li', 'A review shown before it is saved', 'useOptimistic', ['useFormStatus', 'useActionState', 'useOptimistic']],
    ]),
    arrange(['export default function Contact() {', '  async function send(formData) {', '    "use server";', '    console.log("Message from " + formData.get("name"));', '  }', '  return <form action={send}><input name="name" /><button>Send</button></form>;', '}'], 'start the page, the action, mark it, use the data, close it, then the form, and close the page', CAFE, 'app/contact/page.js', '/contact'),
  ]),
];
