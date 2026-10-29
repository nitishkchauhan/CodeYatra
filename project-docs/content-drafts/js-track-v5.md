# JavaScript track: Lesson v5 · content draft

**Status:** draft for owner review, 29 Oct 2026. Nothing here is in the app yet. Replaces `js-basic.md` (v3 draft); its examples and project idea are reused.

**Coverage:** every concept on the W3Schools JavaScript tutorial (basics, HTML DOM, events, web APIs, JSON, async, classes, modules) is in a lesson below; the coverage table is at the end. W3Schools is a **topic checklist only**: all wording, examples and pictures are our own.

**Same shape as HTML and CSS (built):** short lessons (3–5 min), each module ending in a **Module Challenge** (5 quick questions + 6 tasks, 1–3 stars, a badge). All the HTML and CSS screens are reused, plus **three new JavaScript screens**:

- **Run and tweak:** a few lines of code, chips to change one value, and a console under it that shows what the program prints. Every change runs the code again, so learners see cause and effect straight away.
- **Predict, then run:** the program runs line by line with a variables panel, and pauses before chosen lines to ask “what happens next?” (Python already has this; it gets switched on for JavaScript).
- **Tap the page:** a live page with real JavaScript (a button, a form, a list). The learner taps inside it and sees the result plus the event log. Used for the DOM and events.

Every program answer is run in tests (real JavaScript), so no answer can be wrong.

**Story thread:** the lessons build **Riya’s Café** tools in Pune: an order counter, a bill with GST, a menu filter, a cart saved on the phone, today’s menu loaded from the café’s server (the practice server inside the app, offline and the same every time). The **final challenge** makes **Sharma Classes** work: the page learners built in HTML and styled in CSS, so the three tracks end in one complete site.

**Size:** 13 modules, 71 lessons, 13 challenges (about 5 to 6 hours). The 13 old JavaScript ids are reused (⟵), so learners keep progress, notes and practice sets.

---

## Module 1 · Getting Started · 🟨 First Script
| Lesson | Teaches | Screens |
|---|---|---|
| 1.1 What is JavaScript? | HTML = structure, CSS = look, JS = behaviour; where JS runs (browsers, servers, apps) | Chat → tap the page (a button that does nothing, then with JS) → quick check |
| 1.2 Where JavaScript goes | `<script>` in the page, an external `.js` file, `defer` | Tap to reveal → match → tap the bug (`<script href>`) |
| 1.3 Showing output | `console.log`, changing text on the page, `alert` (and why it’s rare) | Run and tweak → toggle the three outputs |
| 1.4 Statements and syntax | statements, semicolons, case, names, `//` and `/* */` comments | Explore → tap the bug (`Console.log`) → recap |

## Module 2 · Variables and Types ⟵ `j-var-1` · 📦 Value Keeper
| Lesson | Teaches | Screens |
|---|---|---|
| 2.1 Variables ⟵ `j-var-1` | `let`, `const`, naming rules | Run and tweak (the order counter) → tap to place |
| 2.2 let, const and var | when to use each; why `var` is old | Toggle → tap the bug (changing a `const`) |
| 2.3 Data types | string, number, boolean, `undefined`, `null`, object, array; `typeof` | Match value → type → run and tweak `typeof` |
| 2.4 Converting types | `Number()`, `String()`, `parseInt`, `NaN`, automatic conversion (`"5" + 2`) | Predict, then run → quick check |

## Module 3 · Operators ⟵ `j-ops-1` · ➕ Calculator
| Lesson | Teaches | Screens |
|---|---|---|
| 3.1 Arithmetic ⟵ `j-ops-1` | `+ - * / % **`, `++`, order of operations | Run and tweak (the bill: price × quantity) |
| 3.2 Assignment | `=`, `+=`, `-=`, `*=` | Predict, then run → tap to place |
| 3.3 Comparisons | `===` vs `==`, `!==`, `<`, `>=` | Swipe true/false → tap the bug (`=` in an if) |
| 3.4 Logic | `&&`, `||`, `!`, `??`, optional chaining `?.` | Run and tweak → match |
| 3.5 Booleans and truthiness | truthy and falsy values | Sort into truthy / falsy → recap |

## Module 4 · Decisions ⟵ `j-cond-1` · 🔀 Decision Maker
| Lesson | Teaches | Screens |
|---|---|---|
| 4.1 if and else ⟵ `j-cond-1` | `if`, `else`, `else if` (free delivery over ₹300) | Predict, then run → tap to place |
| 4.2 The ternary | `cond ? a : b` | Run and tweak → pick the code |
| 4.3 switch | `switch`, `case`, `break`, `default` | Predict, then run → tap the bug (missing `break`) |
| 4.4 Control flow | reading the path a program takes | Put the lines in order → recap |

## Module 5 · Loops ⟵ `w-js-1` · 🔁 Loop Master
| Lesson | Teaches | Screens |
|---|---|---|
| 5.1 for ⟵ `w-js-1` | counting loops | Predict, then run (watch `i` change) |
| 5.2 while and do…while | loops that run until something changes | Run and tweak → tap the bug (a loop that never ends) |
| 5.3 break and continue | stop early, skip one | Predict, then run → quick check |
| 5.4 for…of and for…in | loop over arrays and strings; over an object’s keys | Toggle → run and tweak → recap |

## Module 6 · Strings, Numbers and Maths · 🔢 Number Cruncher
| Lesson | Teaches | Screens |
|---|---|---|
| 6.1 Strings and templates | quotes, `` `Total: ₹${total}` ``, escaping | Run and tweak → tap the bug |
| 6.2 String methods | `length`, `toUpperCase`, `trim`, `slice`, `replace`, `split` | Match method → result |
| 6.3 Searching strings | `includes`, `indexOf`, `startsWith` | Run and tweak (search the menu) |
| 6.4 Numbers | `toFixed`, `toLocaleString('en-IN')` for ₹1,20,000, `Number.isInteger`, BigInt in brief | Predict, then run → quick check |
| 6.5 Math and random | `Math.round/floor/ceil/max/min`, a dice roll with `Math.random` | Run and tweak (roll it) → recap |
| 6.6 Patterns (RegExp) | `/\d{10}/` for a phone number, `test()`, flags, groups at a glance | Live tester: type, see if it matches → tap the bug |

## Module 7 · Functions ⟵ `j-fn-1`, `j-arrow-1` · 🛠 Function Builder
| Lesson | Teaches | Screens |
|---|---|---|
| 7.1 Functions ⟵ `j-fn-1` | declare, call, parameters, `return` | Predict, then run → tap to place |
| 7.2 Parameters and defaults | defaults, missing arguments, rest `...items` | Run and tweak |
| 7.3 Function expressions and arrows ⟵ `j-arrow-1` | `const add = (a, b) => a + b` | Toggle the three ways → pick the code |
| 7.4 Scope and hoisting | block scope, global scope, hoisting, strict mode | Predict, then run → tap the bug |
| 7.5 Callbacks and closures | passing a function; a function that remembers (a counter) | Predict, then run → match |
| 7.6 Timers | `setTimeout`, `setInterval`, `clearInterval` (a “ready in 3, 2, 1” countdown) | Tap the page → recap |

## Module 8 · Arrays ⟵ `j-arr-1` · 📚 List Keeper
| Lesson | Teaches | Screens |
|---|---|---|
| 8.1 Arrays ⟵ `j-arr-1` | create, index, `length`, `const` arrays | Run and tweak |
| 8.2 Changing arrays | `push`, `pop`, `shift`, `unshift`, `splice`, `slice`, `concat` | Predict, then run → match |
| 8.3 Finding things | `includes`, `indexOf`, `find`, `findIndex`, `some`, `every` | Run and tweak (find a dish) |
| 8.4 Sorting | `sort` with a compare function (and why numbers sort wrongly without one), `reverse` | Tap the bug → quick check |
| 8.5 map, filter, reduce | transform, pick, total (the bill) | Predict, then run → put in order |
| 8.6 Destructuring and spread | `[first, ...rest]`, `[...a, ...b]` | Run and tweak → recap |

## Module 9 · Objects, Sets and Maps ⟵ `j-obj-1` · 🗂 Object Pro
| Lesson | Teaches | Screens |
|---|---|---|
| 9.1 Objects ⟵ `j-obj-1` | properties, dot and bracket access, adding and deleting | Run and tweak (a dish object) |
| 9.2 Methods and this | functions inside objects, `this` | Predict, then run → tap the bug |
| 9.3 Showing and copying objects | `JSON.stringify`, `Object.keys/values/entries`, spread, destructuring | Match → run and tweak |
| 9.4 Sets | unique values, `add`, `has`, `size` | Run and tweak (unique tables served) |
| 9.5 Maps | key–value pairs with any key, `get`, `set`, looping | Toggle object vs Map → quick check |
| 9.6 Iterables and generators | what `for…of` can loop over; `function*` and `yield` in brief | Predict, then run → recap |

## Module 10 · Classes and Dates ⟵ `j-class-1` · 🏛 Class Act
| Lesson | Teaches | Screens |
|---|---|---|
| 10.1 Classes ⟵ `j-class-1` | `class`, `constructor`, methods, `new` | Run and tweak (an `Order` class) |
| 10.2 Inheritance | `extends`, `super` | Predict, then run → pick the code |
| 10.3 Static, get and set | static methods, getters and setters, private `#fields` | Match → tap the bug |
| 10.4 Prototypes in brief | what a class really makes underneath | Tap to reveal → quick check |
| 10.5 Dates | `new Date()`, get and set parts, formatting for India (`en-IN`), and the new Temporal API at a glance | Run and tweak → recap |

## Module 11 · Errors and Debugging ⟵ `j-error-1` · 🐞 Bug Hunter
| Lesson | Teaches | Screens |
|---|---|---|
| 11.1 Errors ⟵ `j-error-1` | reading an error message: name, message, line | Tap the bug with the real error shown |
| 11.2 try, catch, finally | handle an error and carry on | Predict, then run → tap to place |
| 11.3 throw and your own errors | `throw new Error("…")`, checking input | Run and tweak (a bad quantity) |
| 11.4 Debugging | `console.log`, `console.table`, `console.error`, breakpoints and the debugger (explained with pictures) | Tap to reveal → match |
| 11.5 Common mistakes | `=` vs `===`, adding strings, `this` in arrows, missing `return` | Swipe true/false → tap the bug → recap |
| 11.6 Clean code | naming, `const` first, small functions, a style guide, speed tips | Put a tidy program in order → recap |

## Module 12 · The DOM and Events ⟵ `j-dom-1` · 🖱 Page Changer
| Lesson | Teaches | Screens |
|---|---|---|
| 12.1 The DOM ⟵ `j-dom-1` | the page as a tree; `querySelector`, `getElementById` | X-ray: tap a part, name the selector |
| 12.2 Changing the page | `textContent`, `innerHTML` (and its risk), attributes, `classList`, `style` | Tap the page → run and tweak |
| 12.3 Creating elements | `createElement`, `append`, `remove` (build the menu list from an array) | Predict, then run (the page grows) |
| 12.4 Events | `addEventListener`, click, input, keydown, submit, load; the event object | Tap the page with an event log |
| 12.5 Forms and validation | read inputs, `preventDefault`, show messages (a phone number check) | Tap the page → tap the bug |
| 12.6 Moving around the tree | `parentElement`, `children`, `closest`, node lists | Explore → quick check |
| 12.7 Animation with JS | `requestAnimationFrame` and toggling CSS classes (the better way) | Tap the page → recap |

## Module 13 · Browser, Data and Async ⟵ `j-async-1` · 🌐 Web Wizard
| Lesson | Teaches | Screens |
|---|---|---|
| 13.1 The browser window | `window`, `location`, `history`, `navigator`, screen size | Tap to reveal → match |
| 13.2 Saving on the phone | `localStorage`, `sessionStorage`, cookies in brief | Tap the page (the cart survives a reload) |
| 13.3 JSON | `JSON.parse`, `JSON.stringify`, JSON vs XML | Run and tweak → tap the bug |
| 13.4 Promises ⟵ `j-async-1` | why waiting is different; `then`, `catch` | Predict, then run (the order of the logs) |
| 13.5 async and await | readable waiting; running things in parallel with `Promise.all` | Run and tweak → pick the code |
| 13.6 fetch | load today’s menu from the café server, loading and error states | Tap the page (slow, empty and broken server) |
| 13.7 Modules | `export`, `import`, splitting code into files | Match → put in order → recap |
| 13.8 Other web APIs | geolocation, Web Workers, canvas drawing, charts libraries, and old tools (jQuery, AJAX) seen in older code | Tap to reveal → swipe |
| **Final challenge** ⟵ `j-project` | **Make Sharma Classes work:** filter courses, validate the enquiry form, load batches from the server, a dark-mode switch saved on the phone | Mr Sharma’s brief → 4 build steps with live checks |

Each module (1–12) ends with its Challenge: 5 quick questions and 6 tasks (true or false, match, pick the code, tap the bug, X-ray or predict-the-output, arrange).

---

## Coverage check (W3Schools JavaScript topic → our lesson)

Introduction, where to, output → 1.1–1.3 · Syntax, statements, comments → 1.4 · Variables, let, const, var → 2.1–2.2 · Types, typeof, undefined, null, NaN, primitives, symbols (a mention) → 2.3 · Type conversion, coercion, toString → 2.4 · Operators, arithmetic, assignment, comparisons, precedence → 3.1–3.3 · Logical, booleans → 3.4–3.5 · If, else, ternary, switch, control flow → 4.1–4.4 · Loops for, while, break, continue → 5.1–5.4 · Strings, templates, methods, search → 6.1–6.3 · Numbers, number methods, toLocaleString, BigInt, bitwise (a mention) → 6.4 · Math, random → 6.5 · RegExp (flags, classes, groups, methods) → 6.6 · Functions (invocation, parameters, returns, expressions, arrows) → 7.1–7.3 · Scope, code blocks, hoisting, strict mode → 7.4 · Callbacks, closures (and call/apply/bind, IIFE in brief) → 7.5 · Timers → 7.6 · Arrays (methods, search, sort, iterations, const) → 8.1–8.5 · Destructuring → 8.6, 9.3 · Objects (properties, methods, this, display, constructors) → 9.1–9.3 · Sets, Maps (Weak ones in brief) → 9.4–9.5 · Iterables, iterators, generators → 9.6 · Classes, inheritance, static, get/set, prototypes → 10.1–10.4 · Dates and Temporal → 10.5 · Errors, error object, debugging, console → 11.1–11.4 · Style guide, best practices, mistakes, performance → 11.5–11.6 · HTML DOM, selecting, changing HTML and CSS → 12.1–12.3 · Events, listeners, mouse, keyboard, load → 12.4 · Form validation → 12.5 · DOM navigation, nodes, collections → 12.6 · DOM animations → 12.7 · Window, screen, location, history, navigator, popups → 13.1 · Cookies, web storage → 13.2 · JSON → 13.3 · Async, promises, await, event loop, parallel → 13.4–13.5 · Fetch → 13.6 · Modules → 13.7 · Geolocation, workers, canvas, chart libraries, AJAX, jQuery (old tools) → 13.8 · Projects (counter, to-do, modal, form validation) → used as lesson examples and the final challenge.

**Left out on purpose:** typed arrays, atomics, Proxy/Reflect and the version history (advanced or reference material; they belong in JavaScript Intermediate). The reference pages are covered by our notes.

## Also fixed in this rebuild

The practice server’s menu still uses Hindi dish names (Dal rice, Poha, Rajma chawal, Chicken thali). It changes to the café menu (Lemon Tea, Coffee, Cheese Toast, Veg Sandwich), in line with the no-Hindi rule.

---

## Decisions for you

1. **Size:** 71 lessons in 13 modules (every W3Schools topic). About 3 working sessions to build. OK?
2. **The final challenge:** **Make Sharma Classes work** (HTML → CSS → JS end on one site), replacing the expense tracker. Same id, so progress is kept. OK?
3. **Three new screens** (Run and tweak, Predict-then-run for JavaScript, Tap the page): OK?
4. **Practice server menu** renamed to the café dishes: OK?
5. **Notes:** keep the current JavaScript notes for now, rewrite after testing?
