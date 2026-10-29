// JavaScript track · Module 12 · The DOM and Events. Lesson 12.1 keeps the old DOM module id (j-dom-1).
// Every live page here is run in tests with its demo taps, so each goal can really be reached.
import type { Lesson } from '../../types';
import { UI } from './cafe';
import { arrange, bugTask, challenge, chat, check, explore, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const MENU_HTML = '<h1 id="title">Riya’s Café</h1>\n<ul id="menu">\n  <li class="dish">Lemon Tea</li>\n  <li class="dish veg">Cheese Toast</li>\n</ul>\n<p class="total">Total: ₹0</p>';

export const JS_M12: Lesson[] = [
  lesson('j-dom-1', 'The DOM', 5, [
    chat(['When the browser reads HTML, it builds a family tree of objects called the DOM (Document Object Model).', 'JavaScript can find any branch of that tree and change it while the page is open.']),
    reveal('The page as a tree', [
      ['document', 'The whole page. The root of the tree.', '🌳'],
      ['Elements', 'Every tag becomes an object: the <h1>, the <ul>, each <li>.', '🧩'],
      ['Parents and children', 'The <ul> is the parent of its <li> children.', '👪'],
    ]),
    explore('Finding elements', ['document.querySelector("#title")', 'document.querySelector(".dish")', 'document.querySelectorAll(".dish")', 'document.getElementById("menu")'], [
      [1, 'querySelector takes any CSS selector and gives the first match: here the heading.', '#title'],
      [2, 'A class selector: only the first dish.', '.dish'],
      [3, 'querySelectorAll gives every match, as a list you can loop over.', '.dish'],
      [4, 'The older way to find by id. Same result as querySelector("#menu").', '#menu'],
    ], { page: { html: MENU_HTML, css: UI }, minTaps: 3 }),
    tapPage('Find and change', 'Tap a button. Each one finds a different element.', { html: `${MENU_HTML}\n<button id="a">Change the title</button>\n<button id="b">Mark every dish</button>`, css: UI, js: 'document.querySelector("#a").addEventListener("click", () => {\n  document.querySelector("#title").textContent = "Riya’s Café · Open";\n  console.log("Title changed");\n});\ndocument.querySelector("#b").addEventListener("click", () => {\n  const dishes = document.querySelectorAll(".dish");\n  for (const d of dishes) d.textContent = "✓ " + d.textContent;\n  console.log("Marked " + dishes.length + " dishes");\n});' }, 'Marked 2 dishes', [{ click: '#a' }, { click: '#b' }]),
    check('Which finds every element with class="dish"?', ['document.querySelectorAll(".dish")', 'document.querySelector(".dish")', 'document.getElementById("dish")', 'document.dish'], 'querySelectorAll gives them all.', 'One finds the first; one finds all.'),
    recap([
      ['🌳', 'The DOM is the page as a tree of objects'],
      ['🔍', 'querySelector finds the first match'],
      ['📋', 'querySelectorAll finds them all'],
    ]),
  ]),

  lesson('js-12-2', 'Changing the page', 6, [
    toggle('Ways to change an element', [
      ['textContent', ['el.textContent = "Sold out";'], 'Changes the text. Safe: any < > are shown as text.', { html: '<p id="el">Cheese Toast ₹80</p>', css: UI, js: 'document.querySelector("#el").textContent = "Sold out";' }],
      ['classList', ['el.classList.add("soldout");'], 'Adds a CSS class, so the stylesheet decides the look. The cleanest way to change style.', { html: '<p id="el">Cheese Toast ₹80</p>', css: `${UI} .soldout { text-decoration: line-through; color: #999; }`, js: 'document.querySelector("#el").classList.add("soldout");' }],
      ['style', ['el.style.color = "crimson";'], 'Sets one CSS property directly. Fine for one-offs.', { html: '<p id="el">Cheese Toast ₹80</p>', css: UI, js: 'document.querySelector("#el").style.color = "crimson";' }],
      ['attributes', ['img.src = "dish.svg";', 'img.alt = "Cheese toast";'], 'Change any attribute: src, href, alt, disabled.', { html: '<img id="img" width="140" alt="">', css: UI, js: 'const img = document.querySelector("#img"); img.src = "dish.svg"; img.alt = "Cheese toast";' }],
    ]),
    tapPage('Sold out switch', 'Tap the toast to mark it sold out. Tap again to bring it back.', { html: '<p>Tap a dish:</p>\n<ul>\n  <li id="toast">Cheese Toast ₹80</li>\n</ul>', css: `${UI} li { padding: 8px; font-size: 18px; } .soldout { text-decoration: line-through; color: #999; }`, js: 'const toast = document.querySelector("#toast");\ntoast.addEventListener("click", () => {\n  toast.classList.toggle("soldout");\n  const gone = toast.classList.contains("soldout");\n  console.log(gone ? "Sold out" : "Available");\n});' }, 'Sold out', [{ click: '#toast' }], 'classList.toggle adds the class if it’s missing and removes it if it’s there.'),
    reveal('innerHTML: powerful but risky', [
      ['el.innerHTML = "<b>New</b>"', 'Reads the text as HTML, so tags become real elements.'],
      ['The risk', 'If the text came from a user, they could slip in harmful code. This is how many websites get hacked.'],
      ['The rule', 'Use textContent for anything a user typed. Use innerHTML only for your own, fixed HTML.'],
    ], { mono: true }),
    matchUp('Pick the tool', [['textContent', 'Change words safely'], ['classList.add', 'Switch on a CSS class'], ['style.color', 'One CSS property'], ['setAttribute', 'Change an attribute']], 'Each changes a different part of an element.'),
    tapbug('The customer’s note runs as code', ['const note = input.value;', 'box.innerHTML = note;'], [[2, 'innerHTML', 'textContent']], 'Never put what a user typed into innerHTML. textContent shows it as plain text.'),
    recap([
      ['📝', 'textContent for text (safe)'],
      ['🎨', 'classList for style; style for one-offs'],
      ['⚠️', 'innerHTML only for your own HTML'],
    ]),
  ]),

  lesson('js-12-3', 'Creating elements', 5, [
    explore('Build a list from an array', ['const menu = ["Lemon Tea", "Coffee", "Cheese Toast"];', 'const list = document.querySelector("#menu");', 'for (const dish of menu) {', '  const li = document.createElement("li");', '  li.textContent = dish;', '  list.append(li);', '}'], [
      [1, 'The data: a plain array.'],
      [4, 'createElement makes a new <li>, not on the page yet.'],
      [5, 'Give it text.'],
      [6, 'append puts it inside the list, at the end. Now it is on the page.', '#menu'],
    ], { page: { html: '<ul id="menu"></ul>', css: UI, js: 'const menu = ["Lemon Tea", "Coffee", "Cheese Toast"];\nconst list = document.querySelector("#menu");\nfor (const dish of menu) {\n  const li = document.createElement("li");\n  li.textContent = dish;\n  list.append(li);\n}' }, minTaps: 3 }),
    tapPage('Order pad', 'Type a dish and tap Add. Add two dishes, then remove one by tapping it.', { html: '<input id="dish" placeholder="Dish name">\n<button id="add">Add</button>\n<ul id="pad"></ul>', css: `${UI} li { padding: 6px; }`, js: 'const pad = document.querySelector("#pad");\nconst input = document.querySelector("#dish");\ndocument.querySelector("#add").addEventListener("click", () => {\n  if (!input.value.trim()) return;\n  const li = document.createElement("li");\n  li.textContent = input.value.trim();\n  li.addEventListener("click", () => {\n    li.remove();\n    console.log("Removed " + li.textContent + ". Items: " + pad.children.length);\n  });\n  pad.append(li);\n  input.value = "";\n  console.log("Items: " + pad.children.length);\n});' }, 'Items: 2', [{ type: ['#dish', 'Tea'] }, { click: '#add' }, { type: ['#dish', 'Toast'] }, { click: '#add' }], 'createElement + append to add; remove() to take away.'),
    reveal('Add and remove', [
      ['append(el)', 'At the end, inside.'],
      ['prepend(el)', 'At the start, inside.'],
      ['before(el) / after(el)', 'Next to it, outside.'],
      ['el.remove()', 'Take it off the page.'],
    ], { mono: true }),
    check('A new element from createElement is…', ['Not on the page until you add it', 'Shown at the top of the page', 'Added to the end of the body', 'Thrown away'], 'It waits until you append it somewhere.', 'Has anything put it on the page yet?', { mono: false }),
    tapbug('Nothing appears', ['const li = document.createElement("li");', 'li.textContent = "Tea";'], [[2, 'li.textContent = "Tea";', 'li.textContent = "Tea"; list.append(li);']], 'The element was made but never added to the page.'),
    recap([
      ['🧱', 'createElement makes a new element'],
      ['➕', 'append / prepend put it on the page'],
      ['🗑', 'remove() takes it away'],
    ]),
  ]),

  lesson('js-12-4', 'Events', 6, [
    chat(['An event is something that happens on the page: a tap, a key press, typing, the page finishing loading.', 'addEventListener says “when this happens here, run this function”.']),
    tapPage('Event log', 'Tap the button, type in the box, and press a key. Watch the log.', { html: '<button id="btn">Tap me</button>\n<input id="box" placeholder="Type here">', css: UI, js: 'const btn = document.querySelector("#btn");\nconst box = document.querySelector("#box");\nbtn.addEventListener("click", (e) => console.log("click on " + e.target.id));\nbox.addEventListener("input", () => console.log("input: " + box.value));\nbox.addEventListener("keydown", (e) => console.log("keydown: " + e.key));\nwindow.addEventListener("load", () => console.log("page loaded"));' }, 'input: ', [{ click: '#btn' }, { type: ['#box', 'Tea'] }], 'e (the event object) tells you what happened: e.target is the element, e.key is the key.'),
    reveal('Events you will use', [
      ['click', 'A tap or a mouse click.'],
      ['input / change', 'The value of a field changed.'],
      ['keydown', 'A key was pressed. e.key says which.'],
      ['submit', 'A form was sent.'],
      ['load / DOMContentLoaded', 'The page has finished loading.'],
      ['mouseover / pointerdown', 'Mouse and touch details.'],
    ], { mono: true }),
    explore('Anatomy of a listener', ['btn.addEventListener("click", (e) => {', '  console.log(e.target);', '});', 'btn.removeEventListener("click", handler);'], [
      [1, 'Which element, which event, and the function to run. Nothing runs yet: it waits.', '#btn'],
      [2, 'When it happens, the function gets an event object with the details.'],
      [4, 'Stop listening. You need the same named function you added.'],
    ], { page: { html: '<button id="btn">Tap me</button>', css: UI }, minTaps: 2 }),
    tapbug('The order is placed when the page opens', ['btn.addEventListener("click", placeOrder());'], [[1, 'placeOrder()', 'placeOrder']], 'With (), the function runs straight away and its result is passed in. Pass the function itself.'),
    check('Which event fires on every keystroke in a text box?', ['input', 'submit', 'load', 'click'], 'input fires whenever the value changes.', 'Typing changes the value.'),
    recap([
      ['👂', 'addEventListener(event, function)'],
      ['📦', 'The event object e has the details'],
      ['⚠️', 'Pass the function, don’t call it'],
    ]),
  ]),

  lesson('js-12-5', 'Forms and validation', 6, [
    tapPage('Phone number check', 'Type a phone number and tap Send. Try a wrong one first, then a right one (10 digits, starting 6 to 9).', { html: '<form id="f">\n  <label>Phone <input id="phone" inputmode="numeric"></label>\n  <button>Send</button>\n</form>\n<p id="msg"></p>', css: UI, js: 'const form = document.querySelector("#f");\nconst msg = document.querySelector("#msg");\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const phone = document.querySelector("#phone").value.trim();\n  if (!/^[6-9]\\d{9}$/.test(phone)) {\n    msg.textContent = "Please enter a 10-digit mobile number";\n    msg.className = "err";\n    console.log("Invalid: " + phone);\n    return;\n  }\n  msg.textContent = "Thanks! We will call you.";\n  msg.className = "ok";\n  console.log("Sent: " + phone);\n});' }, 'Sent: ', [{ type: ['#phone', '12345'] }, { submit: '#f' }, { type: ['#phone', '9876543210'] }, { submit: '#f' }], 'e.preventDefault() stops the browser reloading the page, so your code can check the form first.'),
    explore('The parts of the check', ['form.addEventListener("submit", (e) => {', '  e.preventDefault();', '  const phone = input.value.trim();', '  if (!/^[6-9]\\d{9}$/.test(phone)) {', '    msg.textContent = "Please enter…";', '    return;', '  }', '});'], [
      [1, 'Listen to the form’s submit, not the button’s click: Enter on the keyboard sends it too.'],
      [2, 'Stop the normal send-and-reload.'],
      [3, 'Read what was typed. trim() removes stray spaces.'],
      [4, 'The pattern from Module 6.'],
      [6, 'return stops here, so the order isn’t sent.'],
    ], { page: { html: '<p>Read each line.</p>', css: UI }, minTaps: 3 }),
    reveal('HTML checks first', [
      ['required, type="email", pattern', 'The browser checks these before submit even fires (the HTML track).'],
      ['JavaScript checks', 'For anything the HTML can’t express, and for friendly messages.'],
      ['The server checks too', 'Page checks can be skipped; the server must never trust them.'],
    ], { mono: true }),
    tapbug('The page reloads and the message vanishes', ['form.addEventListener("submit", (e) => {', '  showMessage();', '});'], [[2, 'showMessage();', 'e.preventDefault(); showMessage();']], 'Without preventDefault, the browser sends the form and reloads the page.'),
    check('Why listen to submit instead of the button’s click?', ['It also catches Enter on the keyboard', 'Buttons can’t be clicked', 'click is slower', 'It skips validation'], 'submit fires however the form is sent.', 'How else can a form be sent?'),
    recap([
      ['📨', 'Listen for submit on the form'],
      ['✋', 'e.preventDefault() stops the reload'],
      ['✅', 'Check, show a message, return early'],
    ]),
  ]),

  lesson('js-12-6', 'Moving around the tree', 5, [
    explore('Family links', ['li.parentElement', 'ul.children', 'li.nextElementSibling', 'btn.closest(".card")'], [
      [1, 'Up one level: the <ul> holding this <li>.', '#menu'],
      [2, 'Down: the list of child elements.', '#menu'],
      [3, 'Sideways: the next element at the same level.'],
      [4, 'Up and up until something matches the selector. Perfect for “which card was this button in?”', '.card'],
    ], { page: { html: '<div class="card"><ul id="menu"><li>Tea</li><li>Coffee</li></ul><button>Remove</button></div>', css: `${UI} .card { border: 2px solid #E5D3B3; border-radius: 12px; padding: 8px; }` }, minTaps: 3 }),
    tapPage('Which card?', 'Tap any Remove button. One listener on the list handles all of them.', { html: '<div id="cards">\n  <div class="card" data-dish="Tea">Tea <button>Remove</button></div>\n  <div class="card" data-dish="Toast">Toast <button>Remove</button></div>\n</div>', css: `${UI} .card { border: 2px solid #E5D3B3; border-radius: 12px; padding: 8px; margin: 6px 0; }`, js: 'document.querySelector("#cards").addEventListener("click", (e) => {\n  if (e.target.tagName !== "BUTTON") return;\n  const card = e.target.closest(".card");\n  console.log("Removed " + card.dataset.dish);\n  card.remove();\n});' }, 'Removed', [{ click: '.card button' }], 'Event delegation: one listener on the parent, closest() finds which card. data-dish is read with dataset.dish.'),
    reveal('Lists of elements', [
      ['NodeList', 'What querySelectorAll gives. Loop with for…of or forEach.'],
      ['HTMLCollection', 'What .children gives. Loop with for…of, or turn it into an array with [...el.children].'],
      ['Live or not', '.children updates as the page changes; a querySelectorAll list doesn’t.'],
    ], { mono: true }),
    check('Which goes up from a button to the card it is in?', ['button.closest(".card")', 'button.children', 'button.nextElementSibling', 'document.card'], 'closest walks up the tree.', 'Up, until it matches.'),
    tapbug('It breaks when the button moves', ['const card = btn.parentElement.parentElement;'], [[1, 'btn.parentElement.parentElement', 'btn.closest(".card")']], 'Counting parents breaks as soon as the HTML changes. closest(".card") finds the card wherever the button is.'),
    recap([
      ['⬆️', 'parentElement, closest'],
      ['⬇️', 'children'],
      ['🎯', 'One listener on a parent can handle many children'],
    ]),
  ]),

  lesson('js-12-7', 'Animation with JavaScript', 5, [
    chat(['JavaScript can move things on the page. The best way is usually to let CSS do the moving and have JavaScript just switch a class.', 'That keeps the animation smooth on phones.']),
    tapPage('Add to cart, with a bounce', 'Tap Add and watch the cart.', { html: '<button id="add">Add tea</button>\n<span id="cart" class="cart">🛒 0</span>', css: `${UI} .cart { display: inline-block; font-size: 22px; margin-left: 10px; transition: transform 0.3s; } .cart.bump { transform: scale(1.4); }`, js: 'let n = 0;\nconst cart = document.querySelector("#cart");\ndocument.querySelector("#add").addEventListener("click", () => {\n  n++;\n  cart.textContent = "🛒 " + n;\n  cart.classList.add("bump");\n  setTimeout(() => cart.classList.remove("bump"), 300);\n  console.log("Cart: " + n);\n});' }, 'Cart: 2', [{ click: '#add' }, { click: '#add' }], 'JavaScript adds the class; the CSS transition does the animation; a timer removes the class.'),
    reveal('Two ways to animate', [
      ['Switch a class', 'CSS transitions and animations do the work. Smooth, and easy to turn off for reduced motion.', '✅'],
      ['requestAnimationFrame', 'Run a function before each screen refresh (about 60 times a second). For games and drawings on a canvas.', '🎮'],
      ['Avoid setInterval for motion', 'It isn’t in step with the screen, so it can stutter.', '⚠️'],
    ]),
    truth([
      ['Switching a CSS class is the simplest way to animate', true, 'CSS does the moving.'],
      ['requestAnimationFrame runs before each screen refresh', true, 'About 60 times a second.'],
      ['setInterval is best for smooth motion', false, 'It can stutter; use CSS or requestAnimationFrame.'],
    ]),
    tapbug('The bump only works once', ['cart.classList.add("bump");'], [[1, 'cart.classList.add("bump");', 'cart.classList.add("bump"); setTimeout(() => cart.classList.remove("bump"), 300);']], 'Once the class is on, adding it again changes nothing. Remove it after the animation.'),
    recap([
      ['🎬', 'Let CSS animate; JavaScript switches classes'],
      ['🖼', 'requestAnimationFrame for drawing and games'],
      ['🧹', 'Remove the class so it can run again'],
    ]),
  ]),

  challenge('js-12-ch', 'Module 12 Challenge', { icon: '🖱', name: 'Page Changer' }, ['Find and change elements on the page', 'Create, remove and animate elements', 'React to events and check forms'], [
    mcq(1, 'What does document.querySelector(".dish") give?', ['The first element with class dish', 'Every dish', 'The dish text', 'A new element'], 'querySelector gives the first match.'),
    mcq(2, 'Which is safe for text a user typed?', ['textContent', 'innerHTML', 'outerHTML', 'document.write'], 'textContent never runs HTML.', { mono: true }),
    mcq(3, 'What does e.preventDefault() do in a submit handler?', ['Stops the page reloading', 'Deletes the form', 'Sends the form twice', 'Clears the inputs'], 'Your code checks first.'),
    mcq(4, 'Which adds a new element to the end of a list?', ['list.append(li)', 'list.remove(li)', 'li.closest(list)', 'list.textContent = li'], 'append puts it inside, at the end.', { mono: true }),
    mcq(5, 'Which is the smoothest way to animate on a phone?', ['Switch a class and let CSS animate', 'Change style.left with setInterval', 'Rebuild the page each time', 'Use alert'], 'CSS transitions are smooth.'),
    swipe([
      ['addEventListener("click", go()) passes the function', false, 'With () it runs straight away.'],
      ['closest() walks up the tree', true, 'Until a match.'],
      ['createElement puts the element on the page', false, 'You still need to append it.'],
      ['One listener on a parent can handle many buttons', true, 'That’s event delegation.'],
    ]),
    pairs([['querySelectorAll', 'Find every match'], ['classList.toggle', 'Switch a class on and off'], ['createElement', 'Make a new element'], ['submit', 'A form was sent']], 'DOM and event tools.'),
    pickCode('Which shows the typed name safely?', ['out.textContent = input.value;', 'out.innerHTML = input.value;', 'out = input.value;', 'out.value.textContent = input;'], 'textContent shows it as plain text.'),
    bugTask(['const btn = document.querySelector("#add");', 'btn.addEventListener("click", addTea());', 'form.addEventListener("submit", (e) => {', '  save();', '});'], [[2, 'addTea()', 'addTea'], [4, 'save();', 'e.preventDefault(); save();']], 'Pass the function itself, and stop the reload before saving.'),
    xray(
      { html: '<h1 id="title">Riya’s Café · Open</h1><ul id="menu"><li class="dish soldout">Cheese Toast</li><li class="dish">Lemon Tea</li></ul><p id="cart">🛒 2</p>', css: `${UI} .soldout { text-decoration: line-through; color: #999; }` },
      [
        ['#title', 'The heading that was changed', 'textContent', ['textContent', 'classList', 'createElement']],
        ['.soldout', 'The crossed-out dish', 'classList.add("soldout")', ['classList.add("soldout")', 'style.display = "none"', 'remove()']],
        ['#menu', 'The list built from an array', 'createElement + append', ['createElement + append', 'innerHTML from the user', 'alert']],
      ],
    ),
    arrange(['const menu = ["Tea", "Toast"];', 'const items = menu.map((d) => `<li>${d}</li>`);', 'const html = `<ul>${items.join("")}</ul>`;', 'console.log(html);'], 'make the menu, turn each dish into a list item, wrap them in a list, then print the HTML', ['<ul><li>Tea</li><li>Toast</li></ul>']),
  ]),
];
