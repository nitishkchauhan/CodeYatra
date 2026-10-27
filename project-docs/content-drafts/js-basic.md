# JavaScript · Basic level · content draft (modules 1–12 and the project)

**Status:** approved by the owner on 27 Oct 2026 (with the three recommendations below) and built on branch `lesson-v3`. Once approved, each module is built as a Lesson v3 lesson with tests and module notes. Module ids stay the same, so learners keep their progress.

**Same order as HTML and CSS (approved format):** Hook → What is it? → Where it’s used → How it works → Try it (tap values, live result) → See it run → Common mistake → Sort or match → Quick check → Build it (tap pieces into gaps, live checks) → Recap → Read more (notes).

**See it run, for JavaScript (new step):** CSS had “See it build”. JavaScript runs *in order*, so the learner taps **Next line** and watches:
- the highlighted line;
- a **variables panel** that shows each name and its current value, updating as the line runs;
- the **console** filling in as `console.log` lines run.

Modules 11 and 12 (DOM and fetch) show the live page in place of the variables panel. This needs a small new step type (`trace`). Its values are checked in tests by actually running the code, so the panel can never show a wrong value.

**Where code runs:** modules 1–10 are plain JavaScript and print to the console, both on the phone and in the tests. Modules 11–12 and the project build a real page in the live web editor (HTML + CSS + JS).

**Story thread:** the learner makes the pages they built come alive. **Riya’s Tiffins** (Pune) in the modules: an order counter, a cart total, delivery fees, a working menu. **Sharma Classes** (Jaipur) in the project: a fee calculator and an enquiry form that checks itself (see the decision at the end).

**Animations:** reuse the Python ones where they fit (variable boxes, types, branch, loop, function, scope, list, dict, class/object, error, API). **4 new:** `===` vs `==` (one checks the type too, one quietly converts) · callback hand-off (a function passed along and called later) · the DOM tree (HTML becomes a tree; JavaScript reaches in and changes a node) · the event loop (slow work waits in a queue while the page stays responsive).

Learner level: Class 10 and up, has done HTML and CSS Basic. All code is real and checked in tests (each Build it’s starter fails its checks and its solution passes; every example’s printed output is compared with what actually runs).

---

## Module 1 · What is JavaScript? Variables and values
**Id:** `j-var-1` · **Time:** 8 min · **Goals:** I can say what JavaScript does · I can store values with `const` and `let` · I can print with `console.log`

1. **Hook:** Riya’s menu looks great now, but tap “Add to order” and… nothing happens. HTML is the structure, CSS the looks, and **JavaScript is what makes it do things**.
2. **What is JavaScript?** A programming language that runs **inside every web browser**. It reacts to taps, changes the page, does maths, and talks to servers. It’s the only language every browser understands.
   - *Animation:* the three layers: HTML (bricks) → CSS (paint) → JS (the switch that turns the lights on).
3. **Where it’s used:** every button that does something: “Add to cart” on Flipkart, live cricket scores, the seat map on IRCTC, Google Maps dragging. It also runs servers (Node.js) and phone apps, including this one.
4. **How it works:** a **variable** is a named box for a value. `const` for values that never change, `let` for ones that do.
   ```js
   const shop = "Riya’s Tiffins";
   let orders = 0;
   orders = orders + 1;
   console.log(`${shop} has ${orders} order`);
   ```
   Values have **types**: number (`80`), string (`"dal rice"`), boolean (`true`), `null`, `undefined`. The backticks make a **template literal**, which lets you put `${values}` inside text.
   - *Animation:* variable boxes (reused): `orders` holds 0, then 1.
5. **Try it:** tap the dish name, the price and the number of plates; the console line updates. *Ideas:* What prints if price is `"80"` (in quotes) instead of `80`?
6. **See it run:** 4 lines. `shop` appears in the panel → `orders` = 0 → `orders` becomes 1 → the console prints the line.
7. **Common mistake:** changing a `const`: `const orders = 0; orders = 1;` → **TypeError: Assignment to constant variable.** **Fix:** use `let` for anything that changes.
8. **Match:** `const` → never reassigned · `let` → can change · `"80"` → string · `80` → number · `` `${x}` `` → value inside text.
9. **Quick check:** what does `` console.log(`Total: ${2 * 80}`) `` print? **Total: 160** ✅ · Total: 2 * 80 · Total: ${160} · an error.
10. **Build it:** make a receipt line: gaps for `const`, `let`, `` ` ``, `${`. Bank: `var`, `"`, `$(`. **Checks:** `dish` is a const · `plates` uses let · prints “2 × Dal rice = ₹160”.
11. **Recap:** JavaScript makes pages do things · `const` by default, `let` when it changes · template literals put values in text.
12. **Read more:** why not `var` · naming rules (camelCase) · where JS runs (browser, Node, apps) · interview: `let` vs `const` vs `var`? what is `undefined`? · MDN “What is JavaScript?”, “Storing the information you need — Variables”.

---

## Module 2 · Operators and comparisons
**Id:** `j-ops-1` · **Time:** 8 min · **Goals:** I can do maths in JS · I can compare with `===` · I know which values count as false

1. **Hook:** A customer typed “2” plates into Riya’s form and the bill said ₹280… because `"2" + 80` gives `"280"`. Today: why that happens and how to stop it.
2. **What are operators?** Symbols that work on values: maths (`+ - * / % **`), comparison (`=== !== < >`), and logic (`&& || !`).
3. **Where they’re used:** every bill, discount, “Free delivery over ₹500” banner, and password-strength meter is made of operators.
4. **How it works:**
   ```js
   const plates = Number("2");      // turn text into a number
   const bill = plates * 80;        // 160
   console.log(bill >= 150 && bill < 500);   // true
   console.log(2 === "2");          // false: different types
   ```
   `===` checks the value **and** the type. `==` quietly converts first, which causes bugs, so we always use `===`. **Falsy** values (`0`, `""`, `null`, `undefined`, `NaN`, `false`) count as false in an `if`; everything else is true.
   - *Animation (new):* `===` vs `==`: `2` and `"2"` go to two gates; the `==` gate converts them and lets them through, the `===` gate stops them.
5. **Try it:** tap the operator (`+`, `*`, `%`) and the inputs (`2` ↔ `"2"`). *Ideas:* What is `7 % 2`? What could `%` tell you about a number?
6. **See it run:** `plates` (number 2) → `bill` 160 → the comparison prints true → `2 === "2"` prints false.
7. **Common mistake:** adding form text: `"2" + 80` → `"280"`. **Fix:** `Number(input) + 80`.
8. **Sort:** truthy vs falsy: `0` · `"0"` · `""` · `" "` · `[]` · `null`. (Answer: `0`, `""` and `null` are falsy; `"0"`, `" "` and `[]` are truthy, a classic surprise.)
9. **Quick check:** `5 === "5"`? **false** ✅ · true · "5" · error.
10. **Build it:** a safe bill from text inputs: gaps `Number(`, `*`, `===`. Bank: `==`, `+`. **Checks:** inputs turned into numbers · uses `===` · prints “Bill: ₹160”.
11. **Recap:** `+` joins text, so convert first · always `===` · know the falsy values.
12. **Read more:** operator precedence · `NaN` · `??` (nullish) in one line · interview: `==` vs `===`? what is NaN? · MDN “Basic math in JavaScript”, “Equality comparisons”.

---

## Module 3 · Decisions: if, else and switch
**Id:** `j-cond-1` · **Time:** 8 min · **Goals:** I can run different code for different cases · I can write a short ternary · I can use switch for many fixed choices

1. **Hook:** Delivery is free above ₹500, ₹30 within 3 km, and ₹60 beyond. The code has to *choose*.
2. **What is it?** `if` runs a block only when a condition is true; `else if` tries another condition; `else` catches everything left.
3. **Where it’s used:** “Out of stock” labels, age checks, showing “Login” or your name, UPI apps choosing which error to show.
4. **How it works:**
   ```js
   const bill = 420, km = 5;
   let fee;
   if (bill >= 500) fee = 0;
   else if (km <= 3) fee = 30;
   else fee = 60;
   const label = fee === 0 ? "Free delivery" : `Delivery ₹${fee}`;
   ```
   The **ternary** `a ? b : c` picks between two values. `switch` compares one value against many fixed cases (like the day of the week).
   - *Animation:* branch (reused): the value travels down and takes one path.
5. **Try it:** tap the bill (420 ↔ 650) and the distance (2 ↔ 5); watch which branch lights up.
6. **See it run:** the panel shows `bill` and `km` → the `if` line is checked (false, skipped) → `else if` false → `else` runs → `fee` = 60 → `label`.
7. **Common mistake:** `if (bill = 500)` (one `=`) sets bill to 500 instead of comparing it. **Fix:** `===`. Also: `switch` without `break` runs into the next case.
8. **Match:** `if` → first test · `else if` → another test · `else` → everything else · `? :` → pick a value · `switch` → many fixed cases.
9. **Quick check:** with `bill = 500`, `bill > 500 ? "free" : "paid"` gives… **"paid"** ✅ (500 is not *greater* than 500).
10. **Build it:** the delivery fee rules: gaps `if`, `else if`, `else`, `>=`. **Checks:** three branches · prints the right fee for three test bills.
11. **Recap:** if / else if / else · ternary for choosing a value · watch `=` vs `===` and `break`.
12. **Read more:** combining conditions with `&&` and `||` · early return · interview: ternary vs if? when use switch? · MDN “Making decisions in your code”.

---

## Module 4 · Loops: for, for…of and while
**Id:** `w-js-1` · **Time:** 8 min · **Goals:** I can repeat code a set number of times · I can visit every item in a list · I can stop a loop early

1. **Hook:** Riya’s menu has 12 dishes. Printing each by hand is 12 lines; adding a dish means editing code. A loop does it in 3 lines for any number of dishes.
2. **What is a loop?** Code that **repeats**: a set number of times (`for`), once per item (`for…of`), or until something changes (`while`).
3. **Where it’s used:** showing every product in a shop, every message in a chat, a countdown timer, retrying a failed payment three times.
4. **How it works:**
   ```js
   const dishes = ["Dal rice", "Poha", "Thali"];
   for (const dish of dishes) console.log(dish);
   for (let i = 3; i > 0; i--) console.log(i);
   let tries = 0;
   while (tries < 3) tries++;
   ```
   `break` stops a loop; `continue` skips to the next round.
   - *Animation:* loop (reused): the pointer moves item by item; `while` loop (reused).
5. **Try it:** tap the list, the start number and the condition. *Ideas:* What happens if the `while` condition never becomes false?
6. **See it run:** `dish` changes each round in the panel while the console fills; then `i` counts 3, 2, 1.
7. **Common mistake:** off by one: `for (let i = 0; i <= dishes.length; i++)` → the last round prints `undefined`. **Fix:** `<`, or use `for…of`.
8. **Match:** `for` → counting · `for…of` → every item · `while` → until a condition changes · `break` → stop · `continue` → skip this one.
9. **Quick check:** how many times does `for (let i = 0; i < 4; i++)` run? **4** ✅ · 3 · 5 · forever.
10. **Build it:** count the dishes under ₹100 and stop at the first sold-out one: gaps `for…of`, `if`, `break`. **Checks:** prints the right count.
11. **Recap:** `for` counts · `for…of` visits items · `while` repeats until · `break`/`continue`.
12. **Read more:** infinite loops and how to spot them · nested loops (a seat grid) · interview: `for…of` vs `for…in`? · MDN “Looping code”.

---

## Module 5 · Functions, scope and closures
**Id:** `j-fn-1` · **Time:** 9 min · **Goals:** I can write a function with parameters and a return value · I know where a variable can be seen · I can explain a closure in one line

1. **Hook:** The bill maths is copied in 4 places on Riya’s site, and one copy has a bug. A function is written once and used everywhere; fix it once and it’s fixed everywhere.
2. **What is a function?** A **named, reusable block** of code. It takes inputs (**parameters**) and gives back an answer (**return**).
3. **Where it’s used:** everything: `calculateGST()`, `formatPrice()`, `sendOTP()`. Large apps are thousands of small functions.
4. **How it works:**
   ```js
   function billFor(plates, price = 80) {
     return plates * price;
   }
   console.log(billFor(2));        // 160
   function makeCounter() {
     let count = 0;
     return () => ++count;         // remembers count
   }
   ```
   **Scope:** a variable made inside `{ }` exists only there. A **closure** is a function that remembers the variables around it, even after the outer function has finished.
   - *Animation:* function (reused): inputs go in, the answer comes out · scope (reused) for the closure.
5. **Try it:** tap the arguments and the default price; call the counter 1, 2, 3 times.
6. **See it run:** jump into `billFor`: the panel shows a new “inside billFor” section with `plates` and `price` → return 160 → back out, and that section disappears.
7. **Common mistake:** forgetting `return` → the function gives back `undefined`. Also: using a variable outside the block where it was made → ReferenceError.
8. **Match:** parameter → the name in the definition · argument → the value you pass · return → the answer · scope → where a name exists · closure → a function that remembers.
9. **Quick check:** `function f(x) { x * 2 }` then `f(5)` gives… **undefined** ✅ (no `return`).
10. **Build it:** a `discount(percent)` maker that returns a function: gaps `function`, `return`, `=>`. **Checks:** `tenOff(200)` gives 180 · `twentyOff(200)` gives 160.
11. **Recap:** functions are reusable and give back answers · variables live in their block · closures remember.
12. **Read more:** pure functions · default parameters · interview: what is a closure (with a counter example)? scope vs hoisting in one line · MDN “Functions — reusable blocks of code”, “Closures”.

---

## Module 6 · Arrays and array methods
**Id:** `j-arr-1` · **Time:** 9 min · **Goals:** I can add, remove and find items · I can use map, filter and find · I can total a list with reduce

1. **Hook:** Riya’s cart is a list: dal rice, two rotis, lassi. The bill needs only the prices; the “veg only” filter needs only veg dishes. Arrays have built-in tools for exactly this.
2. **What is an array?** An **ordered list** of values in `[ ]`, counted from **0**.
3. **Where it’s used:** your WhatsApp chats, a playlist, search results, cart items. Most data you see on a screen is an array.
4. **How it works:**
   ```js
   const prices = [80, 20, 40];
   prices.push(30);                          // add to the end
   const withGst = prices.map(p => p * 1.05);
   const cheap = prices.filter(p => p < 50); // [20, 40, 30]
   const total = prices.reduce((sum, p) => sum + p, 0); // 170
   ```
   **map** changes every item · **filter** keeps some · **find** gets the first match · **reduce** combines all into one.
   - *Animation:* list (reused): items flow through a map machine, a filter sieve and a reduce funnel.
5. **Try it:** tap the method (map ↔ filter ↔ find) and the condition; the output array updates.
6. **See it run:** `prices` grows to 4 items → `cheap` builds up item by item → `sum` grows 0 → 80 → 100 → 140 → 170.
7. **Common mistake:** `reduce` with no start value on an empty array → TypeError. **Fix:** always give the start (`, 0`). Also: `[10, 9, 100].sort()` sorts as text → `[10, 100, 9]`.
8. **Match:** push → add at the end · map → change each · filter → keep some · find → first match · reduce → one total.
9. **Quick check:** `[1, 2, 3].map(n => n * 2)` → **[2, 4, 6]** ✅.
10. **Build it:** total the veg dishes in the cart: gaps `filter`, `map`, `reduce`, `0`. **Checks:** prints “Veg total: ₹140”.
11. **Recap:** arrays are ordered lists from 0 · map / filter / find / reduce · chain them.
12. **Read more:** chaining · `includes`, `some`, `every` · `slice` vs `splice` · interview: map vs forEach? what does reduce do? · MDN “Arrays”, “Array.prototype.reduce()”.

---

## Module 7 · Arrow functions, callbacks and modules
**Id:** `j-arrow-1` · **Time:** 8 min · **Goals:** I can write an arrow function · I can pass a function to another function · I can split code into files with import and export

1. **Hook:** In module 6 you wrote `p => p < 50` and passed it to `filter`. You handed a *function* to a function. That one idea runs nearly all of JavaScript.
2. **What are they?** An **arrow function** is a short way to write a function: `(a, b) => a + b`. A **callback** is a function you pass to another function, which calls it later. A **module** is a file that `export`s code for other files to `import`.
3. **Where they’re used:** “when the button is tapped, run this” (callbacks), sorting search results, timers, and every modern codebase split into hundreds of module files.
4. **How it works:**
   ```js
   const byPrice = (a, b) => a.price - b.price;
   menu.sort(byPrice);                 // sort calls byPrice for you
   setTimeout(() => console.log("Ready!"), 1000);
   // prices.js
   export const gst = p => p * 1.05;
   // app.js
   import { gst } from "./prices.js";
   ```
   - *Animation (new):* callback hand-off: `byPrice` is handed to `sort`, which calls it again and again, comparing two dishes at a time.
5. **Try it:** tap the sort rule (by price ↔ by name ↔ highest first). *Ideas:* What changes if you swap `a` and `b`?
6. **See it run:** each time `sort` calls `byPrice`, the panel shows which `a` and `b` are being compared and the answer.
7. **Common mistake:** `menu.sort(byPrice())`: the brackets call the function right now and pass its *answer*. **Fix:** pass `byPrice` with no brackets.
8. **Match:** `=>` → short function · callback → passed in, called later · export → share from a file · import → use from another file.
9. **Quick check:** who calls the callback in `button.addEventListener("click", greet)`? **The browser, when clicked** ✅ · you, right now · nobody.
10. **Build it:** sort the menu by price, then by name when prices are equal: gaps `=>`, `-`, `localeCompare`. **Checks:** prints the menu in the right order.
11. **Recap:** arrows are short functions · callbacks are passed in and called later · modules split code into files.
12. **Read more:** `this` in arrows (one line) · named vs default exports · interview: what is a callback? arrow vs normal function? · MDN “Arrow function expressions”, “JavaScript modules”.

---

## Module 8 · Objects, destructuring and spread
**Id:** `j-obj-1` · **Time:** 8 min · **Goals:** I can group data in an object · I can pull values out with destructuring · I can copy and update with spread

1. **Hook:** One dish has a name, price, veg or not, and spice level. Four separate variables per dish gets messy fast. An object keeps them together.
2. **What is an object?** A group of named values (**key: value**) in `{ }`. Read them with a dot: `dish.price`.
3. **Where it’s used:** a user profile, an order, a train on IRCTC, a product on Amazon. Data from servers arrives as objects (JSON).
4. **How it works:**
   ```js
   const dish = { name: "Poha", price: 40, veg: true };
   console.log(dish.name, dish["price"]);
   const { name, price } = dish;               // destructuring
   const offer = { ...dish, price: 35 };       // copy with a change
   ```
   - *Animation:* dict (reused): labelled drawers; spread copies the drawers into a new cabinet.
5. **Try it:** tap the key to read and the value to change in the copy; the original stays the same.
6. **See it run:** `dish` appears as a small table → `name` and `price` pulled out → `offer` appears, a separate copy with price 35.
7. **Common mistake:** reading inside something missing: `order.address.city` when there’s no address → TypeError. **Fix:** `order.address?.city`. Also: `const b = a` doesn’t copy; both names point to the *same* object.
8. **Match:** `dish.price` → read a value · `{ name } = dish` → pull out · `{ ...dish }` → copy · `?.` → safe read.
9. **Quick check:** `const b = a; b.price = 0;` — what is `a.price`? **0** ✅ (same object).
10. **Build it:** update an order’s quantity without changing the original: gaps `...`, `{`, `}`. **Checks:** the original is unchanged · the copy has the new quantity.
11. **Recap:** objects group named values · destructuring pulls them out · spread copies and changes.
12. **Read more:** arrays of objects (the shape of real data) · `Object.keys` / `entries` · interview: copy vs reference? shallow copy? · MDN “JavaScript object basics”, “Destructuring”.

---

## Module 9 · Classes
**Id:** `j-class-1` · **Time:** 8 min · **Goals:** I can write a class with a constructor and methods · I can make objects with `new` · I can extend a class

1. **Hook:** Riya now has three branches, each with its own orders and stock. Same shape, different data. A class is the blueprint; each branch is made from it.
2. **What is a class?** A **blueprint** for objects: the data each one holds and the actions (**methods**) it can do. `new` builds one object from the blueprint.
3. **Where it’s used:** game characters, bank accounts, shopping carts, and the building blocks of many frameworks and libraries.
4. **How it works:**
   ```js
   class Cart {
     constructor(owner) { this.owner = owner; this.items = []; }
     add(dish) { this.items.push(dish); }
     get count() { return this.items.length; }
   }
   const c = new Cart("Aman");
   c.add("Poha");
   ```
   `this` means “the object this method is working on”. `class TiffinCart extends Cart` builds on top of it; `super()` runs the parent’s constructor.
   - *Animation:* class/object (reused): one blueprint stamps out three carts.
5. **Try it:** make two carts and add items to each; they stay separate.
6. **See it run:** `new Cart("Aman")` → the panel shows the new object with `owner` and an empty `items` → `add` puts Poha in.
7. **Common mistake:** forgetting `new` → TypeError: Class constructor cannot be invoked without 'new'. Also: forgetting `this.` inside a method.
8. **Match:** class → blueprint · constructor → set up each new object · method → an action · `this` → the current object · `extends` → build on another class.
9. **Quick check:** two carts from one class share their items? **No, each has its own** ✅.
10. **Build it:** a `Wallet` class with `add` and `spend` that refuses to go below 0: gaps `constructor`, `this`, `new`. **Checks:** balances print correctly · overspending is refused.
11. **Recap:** a class is a blueprint · `new` makes objects · methods use `this` · `extends` reuses a class.
12. **Read more:** getters · private fields (`#balance`) in one line · interview: class vs object? what does `this` mean? · MDN “Classes”.

---

## Module 10 · Handling errors
**Id:** `j-error-1` · **Time:** 8 min · **Goals:** I can read an error message · I can catch errors with try / catch · I can throw my own errors

1. **Hook:** A customer types “two” as the number of plates. Should the whole page crash? Good code expects bad input and handles it calmly.
2. **What are errors?** When JavaScript can’t do something, it **throws** an error with a **name** (TypeError, ReferenceError…) and a **message**. If nobody catches it, the code stops.
3. **Where it’s used:** “Payment failed, try again” instead of a blank screen; form messages like “Enter a valid phone number”; apps that keep working when the network drops.
4. **How it works:**
   ```js
   function plates(text) {
     const n = Number(text);
     if (!Number.isInteger(n) || n < 1) throw new Error("Enter a whole number");
     return n;
   }
   try { plates("two"); }
   catch (err) { console.log(err.message); }
   finally { console.log("Checked"); }
   ```
   - *Animation:* error (reused): the error flies up until a `catch` net stops it.
5. **Try it:** tap the input (`"2"` ↔ `"two"` ↔ `"-1"`) and see which line prints.
6. **See it run:** `try` → the function throws → execution jumps straight to `catch` (the skipped lines grey out) → `finally` runs.
7. **Common mistake:** an empty `catch {}` that hides the problem, so nobody knows anything went wrong. **Fix:** show or log `err.message`.
8. **Match:** TypeError → wrong kind of value · ReferenceError → name doesn’t exist · SyntaxError → code not written correctly · `throw` → raise your own · `finally` → always runs.
9. **Quick check:** after `throw`, does the next line in the same block run? **No, it jumps to catch** ✅.
10. **Build it:** check a phone number (10 digits) and show a friendly message: gaps `throw new Error`, `try`, `catch`, `.message`. **Checks:** good number passes · bad one prints the message.
11. **Recap:** read the error name and message first · try / catch / finally · throw clear errors of your own.
12. **Read more:** reading a stack trace · validating input · interview: how do you handle errors in JS? what does finally do? · MDN “Control flow and error handling”, “Error”.

---

## Module 11 · The DOM, events and storage
**Id:** `j-dom-1` · **Time:** 10 min · **Goals:** I can find and change things on the page · I can react to taps and typing · I can save small data in the browser

1. **Hook:** Everything so far printed to a console. Now the real thing: tap “Add” on Riya’s page and the cart count goes up, on the page, live. And it’s still there after a refresh.
2. **What is the DOM?** When a browser reads HTML it builds a **tree of objects**, the **DOM** (Document Object Model). JavaScript can find any node in that tree and change its text, classes or styles.
   - *Animation (new):* the DOM tree: the HTML folds into a tree; `querySelector` reaches in, finds `#count` and its number changes on the page.
3. **Where it’s used:** every like button, dark-mode toggle, “show password” eye, live search box and form message.
4. **How it works:**
   ```js
   const btn = document.querySelector("#add");
   const count = document.querySelector("#count");
   let items = Number(localStorage.getItem("items") ?? 0);
   count.textContent = items;
   btn.addEventListener("click", () => {
     items += 1;
     count.textContent = items;
     localStorage.setItem("items", items);
   });
   ```
   `localStorage` saves small data **as text** in the browser. It stays after a refresh.
5. **Try it:** a live page: tap which element to change, what to set (`textContent` ↔ a class), and which event (`click` ↔ `input`).
6. **See it run (page mode):** each line runs and the live page beside it changes: the count shows 0 → a simulated tap → 1.
7. **Common mistake:** using `innerHTML` with what a user typed → someone can inject code (XSS). **Fix:** use `textContent` for text. Also: the script running before the HTML exists, so `querySelector` returns `null`.
8. **Match:** `querySelector` → find one element · `addEventListener` → react · `textContent` → set text safely · `classList.toggle` → switch a class · `localStorage` → save small data.
9. **Quick check:** `localStorage.setItem("n", 5)` then `getItem("n")` returns… **"5" (text)** ✅ · 5 · null.
10. **Build it (web editor):** the order counter with a reset button that also clears storage. **Checks:** finds the elements · listens for click · updates `textContent` · saves to and reads from `localStorage`.
11. **Recap:** the DOM is the page as objects · find, listen, change · `textContent` for safety · localStorage keeps text.
12. **Read more:** `classList` for dark mode · form `input` and `submit` events · why `textContent` is safer · interview: what is the DOM? event bubbling in one line? · MDN “Manipulating documents”, “Introduction to events”, “Web Storage API”.

---

## Module 12 · Promises, async/await and fetch
**Id:** `j-async-1` · **Time:** 10 min · **Goals:** I can explain why slow work doesn’t freeze the page · I can wait for a result with await · I can load data with fetch and handle failure

1. **Hook:** Riya’s menu now comes from a server, so she can change prices without editing the page. Loading takes a second. The page must not freeze, and it must say something useful if the network fails (common on mobile data).
2. **What is it?** Slow work (network, timers) returns a **Promise**: “I’ll give you the answer later.” `await` waits for it **without freezing** the page. `fetch` asks a server for data.
   - *Animation (new):* the event loop: the fetch goes to a waiting area; meanwhile taps and scrolling still run; when the data arrives, the rest of the function continues.
3. **Where it’s used:** every app that loads anything: Swiggy’s restaurant list, the weather, your feed, train status. Plus the “Loading…”, “No results” and “Try again” states you see everywhere.
4. **How it works:**
   ```js
   async function loadMenu() {
     status.textContent = "Loading…";
     try {
       const res = await fetch("/api/menu");
       if (!res.ok) throw new Error(`Server said ${res.status}`);
       const menu = await res.json();
       status.textContent = `${menu.length} dishes`;
     } catch (err) {
       status.textContent = "Couldn’t load the menu. Try again.";
     }
   }
   ```
   The app’s web editor uses a **practice server** inside the app (no internet needed), so it works offline and is the same every time.
   - *Animation:* API (reused): request out, response back.
5. **Try it:** tap the server’s reply (works ↔ slow ↔ fails ↔ empty list) and watch the page show each state.
6. **See it run (page mode):** “Loading…” shows → the waiting area holds the fetch → the data arrives → the dishes appear.
7. **Common mistake:** forgetting `await`, so you get a Promise and not the data (`menu.length` is undefined). Also: not checking `res.ok`, because `fetch` doesn’t throw on a 404.
8. **Sort into order:** what happens first → last: “Loading…” shows · fetch is sent · the page stays usable · the data arrives · `res.json()` · the dishes appear.
9. **Quick check:** `fetch` gets a 404. Does it go to `catch` by itself? **No, you check `res.ok`** ✅.
10. **Build it (web editor):** load the menu from the practice server with loading, error and empty states. **Checks:** uses `async`/`await` · checks `res.ok` · has `try`/`catch` · shows all three states.
11. **Recap:** slow work returns a Promise · `await` waits without freezing · always handle loading, error and empty.
12. **Read more:** the event loop in plain words · `Promise.all` (preview of Intermediate) · JSON · interview: what is a Promise? async/await vs `.then`? why check `res.ok`? · MDN “Introducing asynchronous JavaScript”, “Using the Fetch API”.

---

## Project · Make Sharma Classes work
**Id:** `j-project` (kept) · **Time:** 30 min · Continues the HTML and CSS projects: the learner adds JavaScript to the Sharma Classes page they built and styled. Four checked steps in the web editor.

**Brief (from Mr Sharma):** “Parents keep calling to ask the fees and to check if we got their enquiry. Can the page work out the fee, and check the form before it’s sent?”

1. **Course data and fee logic:** courses as an array of objects; a `feeFor(course, months, siblings)` function with a sibling discount; totals with `reduce`. *Checks:* an array of course objects · `feeFor` returns the right fee for three test cases.
2. **Fee calculator on the page:** choose a course and months, and the total updates live. *Checks:* `querySelector` · `addEventListener("input" or "change")` · shows the fee with `textContent` · formats ₹ with `toLocaleString("en-IN")`.
3. **Enquiry form that checks itself:** name required, 10-digit phone, class 9–12; friendly messages next to each field, nothing sent until all are valid. *Checks:* `submit` listener with `preventDefault` · phone check · messages shown with `textContent` · a `throw`/`try` or clear validation function.
4. **Remember and load:** save the last enquiry in `localStorage` (“We got your enquiry on 27 Oct”); load the batch timings from the practice server with loading and error states. *Checks:* `localStorage` set and get · `async`/`await` fetch · checks `res.ok` · loading and error messages.

**Learned:** wrote the logic of a real feature and tested it · connected it to a page with the DOM · handled bad input, saved data and loaded from a server.
**Read more:** MDN “Client-side form validation”, “Fetching data from the server”.

---

## Decisions for you

1. **The project.** The current JavaScript project is an **expense tracker**. I propose replacing it with **Make Sharma Classes work** (above), so HTML → CSS → JS is one story ending in one complete site. The id stays the same, so progress is kept. *Or* keep the expense tracker. My recommendation: Sharma Classes.
2. **See it run (new step).** Building the variables panel is about a day of work but makes JavaScript much easier to follow, and Python could use it later too. OK to build it?
3. **Practice server.** Module 12 and the project use a fake server inside the app (works offline, same every time, no API keys). Real public APIs come in Intermediate. OK?
