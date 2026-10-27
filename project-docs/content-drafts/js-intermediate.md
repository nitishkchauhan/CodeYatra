# JavaScript · Intermediate level · content draft (modules 1–6 and the project)

**Status:** draft for owner review (27 Oct 2026). Nothing is built yet. Once approved, each module is built as a Lesson v3 lesson with tests and module notes, on branch `lesson-v3`.

**Order:** the same as HTML and CSS Intermediate: Hook → 3 learn cards with animations → Try it → **See it run** → Common mistake → Sort or match → Quick check → **At work** → Build it → Recap → Read more. Six modules, about 12 minutes each.

**What’s new compared with Basic:** Basic taught the language one piece at a time. Intermediate is about **real app work**: shaping data, showing money and dates properly, talking to servers when things go wrong, and keeping a page in step with its data.

**See it run:** modules 1 and 2 use the variables panel (plain JavaScript, as in Basic). Modules 3–6 build a page, so See it run shows the live page step by step, as in Basic modules 11–12.

**Practice server:** fetch lessons use the in-app practice server from Basic, extended with train data (see Decision 2). Every reply is the same each time and works offline, so the tests can check every lesson.

**Story thread:** still at **Saathi Web Studio** in Indore. **Meera** (team lead) and **Farhan** (backend developer) send the At work messages. The client is **Pune Travel Desk**, a travel agent who wants a page where customers can check if their train is on time. (Names, train numbers and times are all made up and shown as practice data.)

**Learner level:** has finished JavaScript Basic. All code is real and checked in tests: modules 1–2 are run and their printed output compared; pages for 3–6 and the project are run in a test browser (jsdom) against the practice server.

**New animations (4):** the data pipeline (a list flowing through `filter` → `map` → `reduce`, getting smaller and changing shape) · parallel vs one-by-one (three requests waiting in a row vs three at once, with a stopwatch) · retry with back-off (a request failing, waiting 1 s, then 2 s, then succeeding) · state → render (one state object; every change goes through `render()` and the page redraws to match).

---

## Module 1 · Working with data
**Id:** `j-i-data` · **Time:** 12 min · **Goals:** I can chain `filter`, `map` and `reduce` · I can sort without changing the original · I can group items and check them with `some` and `every`

1. **Hook:** Pune Travel Desk has a list of 40 trains. Customers want “only trains to Mumbai, fastest first, and how many are late”. Basic showed each array method on its own; real work is joining them.
2. **What is it?** Turning a raw list into the answer you need, one clear step at a time: keep some items, change their shape, sort them, total or group them.
   - *Animation (new):* the data pipeline: the list flows through `filter` → `map` → `reduce`, getting smaller and changing shape at each step.
3. **Where it’s used:** every app screen that lists things: search results, “sort by price”, order history grouped by month, the dashboard total at the top.
4. **How it works:**
   ```js
   const trains = [
     { no: 90101, to: "Mumbai", mins: 195, late: 0 },
     { no: 90102, to: "Nashik", mins: 260, late: 25 },
     { no: 90103, to: "Mumbai", mins: 170, late: 10 },
   ];
   const toMumbai = trains.filter((t) => t.to === "Mumbai");
   const fastest = [...toMumbai].sort((a, b) => a.mins - b.mins);
   console.log(fastest.map((t) => t.no));          // [90103,90101]
   console.log(trains.some((t) => t.late > 20));   // true
   const byCity = trains.reduce((acc, t) => {
     acc[t.to] = (acc[t.to] ?? 0) + 1;
     return acc;
   }, {});
   console.log(byCity);                            // {"Mumbai":2,"Nashik":1}
   ```
   `sort` changes the array it’s called on, so copy first with `[...list]`. `some` asks “is at least one?”, `every` asks “are all?”.
5. **Try it:** tap the city, the sort order (fastest ↔ slowest) and the “late” limit; the output updates.
6. **See it run:** `trains` appears → `toMumbai` holds 2 → `fastest` reorders them → the numbers print → `some` prints true → `byCity` fills in, one train at a time.
7. **Common mistake:** `trains.sort(…)` on the shared list, and the original order is gone everywhere else on the page. **Fix:** `[...trains].sort(…)` (or `toSorted` on newer browsers). Also: `reduce` without its starting value (`{}` or `0`).
8. **Match:** `filter` → keep some · `map` → change each · `sort((a, b) => a - b)` → smallest first · `reduce` → many into one · `some` → at least one · `every` → all · `find` → the first match.
9. **Quick check:** what does `[3, 10, 2].sort()` give? **`[10, 2, 3]`** ✅ (sorted as text) · `[2, 3, 10]` · `[3, 10, 2]` · an error.
10. **At work:** Farhan: “The API gives us all trains. The client wants a summary line at the top of the page.” *Data:* 6 trains · *Ticket:* show “Mumbai: 3 trains, fastest 90103, 1 running late”.
11. **Build it:** write `summary(trains, city)`. **Checks:** uses `filter` and does not change `trains` · the fastest train is right · counts late trains · prints the exact summary line for two test cities.
12. **Recap:** chain small steps · copy before sorting · reduce needs a start value · some/every answer yes-or-no questions.
13. **Read more:** `Object.groupBy` (newer browsers) · `flatMap` · readability vs one long chain · interview: map vs forEach? why does `sort()` put 10 before 2? · MDN “Array”, “Array.prototype.reduce()”.

---

## Module 2 · Money, dates and text
**Id:** `j-i-intl` · **Time:** 12 min · **Goals:** I can show rupees the Indian way with `Intl.NumberFormat` · I can show dates and times in India’s time zone · I can clean and check text a user typed

1. **Hook:** The page shows the fare as “1250.5” and the departure as “Tue Oct 27 2026 18:30:00 GMT+0530”. Customers expect “₹1,250.50” and “27 Oct, 6:30 pm”. Getting this right by hand is full of traps; JavaScript has it built in.
2. **What is it?** **Intl** is the built-in toolkit for showing numbers, money and dates the way people in a region expect. Text methods (`trim`, `padStart`, `includes`, `split`) clean up what users type.
   - *Animation:* the same number shown for India (`1,25,000`) and the US (`125,000`); the same moment shown in Indore and London.
3. **Where it’s used:** every price on Flipkart, every bank statement, every ticket time on a booking site. Banks and payment apps get this wrong at their peril.
4. **How it works:**
   ```js
   const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
   console.log(inr.format(125000));        // ₹1,25,000.00
   const dep = new Date("2026-10-27T18:30:00+05:30");
   const when = new Intl.DateTimeFormat("en-IN", {
     day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
     timeZone: "Asia/Kolkata",
   });
   console.log(when.format(dep));
   const typed = "  90101 ";
   console.log(typed.trim().padStart(6, "0"));   // 090101
   ```
   Make a formatter **once** and reuse it. Always say the time zone, or the phone’s own setting is used. Months in `new Date(2026, 9, 27)` count from 0, so 9 is October; the ISO text form above avoids that trap.
5. **Try it:** tap the locale (`en-IN` ↔ `en-US`), the currency and the amount; tap the time zone (Kolkata ↔ London).
6. **See it run:** the formatter is made → the fare prints in rupees → `dep` is created → the time prints in Kolkata time → the typed train number is cleaned.
7. **Common mistake:** `new Date(2026, 10, 27)` for 27 October gives **27 November**. **Fix:** remember months start at 0, or build dates from ISO text (`"2026-10-27"`).
8. **Match:** `Intl.NumberFormat` → money and numbers · `"en-IN"` → lakh and crore commas · `timeZone` → whose clock · `trim()` → remove spaces at the ends · `padStart` → fill to a length · `includes` → contains this text?
9. **Quick check:** `new Intl.NumberFormat("en-IN").format(1500000)` gives… **`15,00,000`** ✅ · `1,500,000` · `15.00.000` · `1500000`.
10. **At work:** Farhan: “The API sends fares in paise and times in ISO format. The client wants them readable.” *Data:* `{ fare: 125050, dep: "2026-10-27T18:30:00+05:30" }`.
11. **Build it:** write `fareText(paise)` and `timeText(iso)`. **Checks:** `fareText(125050)` gives “₹1,250.50” · uses `Intl.NumberFormat` with `en-IN` and `INR` · `timeText` uses `timeZone: "Asia/Kolkata"` · gives the right text for two test times.
12. **Recap:** Intl for money and dates · en-IN for Indian commas · always set the time zone · months start at 0.
13. **Read more:** `Intl.RelativeTimeFormat` (“in 5 minutes”) · why money is stored in paise (whole numbers) · `toLocaleString` · interview: why is `0.1 + 0.2` not 0.3? how do you store money? · MDN “Intl.NumberFormat”, “Intl.DateTimeFormat”.

---

## Module 3 · Fetch in the real world
**Id:** `j-i-fetch` · **Time:** 12 min · **Goals:** I can build a request URL with search parameters · I can handle every response: loading, success, empty, not found and server error · I can give up on a slow request with a timeout

1. **Hook:** A customer types a train number that doesn’t exist, and the page shows “undefined”. Another is on slow 3G, and the spinner spins forever. Basic handled the happy path; real apps handle **every** path.
2. **What is it?** A request can end in many ways: data, an empty list, **404** (not found), **500** (server error), or no answer at all. A good page has a clear message for each one.
   - *Animation:* one request splitting into five paths, each ending at a different message on the page.
3. **Where it’s used:** every app that loads data. “No results”, “Something went wrong, try again” and “You seem to be offline” are all this code.
4. **How it works:**
   ```js
   async function loadTrain(no) {
     const url = new URL("/api/trains", location.origin);
     url.searchParams.set("no", no);
     show("Loading…");
     try {
       const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
       if (res.status === 404) return show(`No train ${no}. Check the number.`);
       if (!res.ok) return show("The server had a problem. Try again.");
       const train = await res.json();
       show(`${train.name}: ${train.late ? `${train.late} min late` : "on time"}`);
     } catch (e) {
       show(e.name === "TimeoutError" ? "This is taking too long." : "You seem to be offline.");
     }
   }
   ```
   `URLSearchParams` (through `url.searchParams`) writes `?no=90101` safely, even with spaces or symbols. `AbortSignal.timeout(5000)` gives up after 5 seconds.
5. **Try it:** tap the train number (a real one ↔ a wrong one) and the server mode (normal ↔ slow ↔ broken); the page shows each message.
6. **See it run:** the URL is built → “Loading…” → the request goes out → the reply arrives → the status check → the train line appears.
7. **Common mistake:** `const train = await res.json();` with no `res.ok` check. On a 404 the server sends `{ "error": "Not found" }`, and the page shows “undefined: on time”. **Fix:** check `res.status` and `res.ok` before using the data.
8. **Sort:** which message for which outcome? 200 with a train → the train line · 200 with `[]` → “No trains today” · 404 → “Check the number” · 500 → “Try again” · timeout → “Taking too long” · no network → “You seem to be offline”.
9. **Quick check:** does `fetch` throw an error when the server replies 500? **No, it resolves; you must check `res.ok`** ✅ · yes, always · only on phones · only with `await`.
10. **At work:** Farhan: “Support tickets from last week.” *Ticket:* “Page says undefined” (×14) · “Spinner never stops” (×6) · “It says on time but my train is cancelled” (×2).
11. **Build it:** the train lookup page. **Checks:** the URL uses `searchParams` · “Loading…” shows first · 404, 500, cancelled and timeout each show their own message · `res.ok` is checked before `res.json()` · tested against all practice-server modes.
12. **Recap:** build URLs with searchParams · check status before data · a message for every outcome · always a timeout.
13. **Read more:** HTTP status codes that matter (200, 201, 400, 401, 404, 429, 500, 503) · CORS in one paragraph · `navigator.onLine` · interview: why doesn’t fetch reject on 404? what is CORS? · MDN “Using the Fetch API”, “HTTP response status codes”.

---

## Module 4 · Waiting for many things
**Id:** `j-i-async` · **Time:** 12 min · **Goals:** I can run requests at the same time with `Promise.all` · I can keep the results that worked with `Promise.allSettled` · I can retry a failed request with a growing wait

1. **Hook:** A customer has saved 5 trains. The page loads them one after another: 5 × 1 second = 5 seconds of waiting. Loaded together, it takes about 1 second. And when one fails, the other 4 should still show.
2. **What is it?** Ways to wait for **several** promises: all at once (`Promise.all`), all at once but keep the failures separate (`Promise.allSettled`), and trying again when a request fails for a moment.
   - *Animation (new):* parallel vs one-by-one: three requests in a row vs side by side, with a stopwatch on each.
   - *Animation (new):* retry with back-off: a request fails, waits 1 s, fails, waits 2 s, then succeeds.
3. **Where it’s used:** dashboards that load many cards, uploading several photos, payment apps retrying a timed-out request, maps loading many tiles.
4. **How it works:**
   ```js
   const saved = [90101, 90103, 90199];
   const results = await Promise.allSettled(saved.map((no) => getTrain(no)));
   for (const r of results) {
     if (r.status === "fulfilled") addRow(r.value);
     else addRow({ error: r.reason.message });
   }

   async function withRetry(job, tries = 3) {
     for (let i = 1; ; i++) {
       try { return await job(); }
       catch (e) {
         if (i === tries) throw e;
         await new Promise((ok) => setTimeout(ok, 500 * 2 ** (i - 1)));
       }
     }
   }
   ```
   `Promise.all` fails as soon as **one** fails; `allSettled` always waits for all and tells you which worked. Waiting longer between tries (500 ms, then 1 s, then 2 s) is called **back-off**; it gives a busy server room to recover.
5. **Try it:** tap “one by one” ↔ “all at once” and watch the stopwatch; make one train fail and switch `all` ↔ `allSettled`.
6. **See it run:** three requests leave together → they come back in a different order → the rows still appear in the saved order → the failed one shows its own message.
7. **Common mistake:** `await` inside a loop when the requests don’t depend on each other: `for (const no of saved) rows.push(await getTrain(no));`. It works, but it’s 5× slower. **Fix:** start them all with `map`, then `await Promise.all(…)`.
8. **Match:** `Promise.all` → all at once, fail if any fail · `Promise.allSettled` → all at once, keep each result · `Promise.race` → the first to finish · back-off → wait longer each try · `await` in a loop → one after another.
9. **Quick check:** three requests take 1 s, 2 s and 3 s. About how long does `Promise.all` take? **3 s** ✅ · 6 s · 1 s · 2 s.
10. **At work:** Farhan: “The ‘My trains’ page is slow, and if one train number is wrong the whole page goes blank. Also the server sometimes fails once and works on the second try.” *Log:* `GET /api/trains?no=90105 → 503` then `→ 200`.
11. **Build it:** the “My trains” page. **Checks:** requests start together (`Promise.all` or `allSettled` with `map`) · one failure doesn’t hide the others · `withRetry` retries up to 3 times with a growing wait · the flaky train loads on its second try · rows keep the saved order.
12. **Recap:** independent requests run together · allSettled when some may fail · retry with back-off for short failures · never retry forever.
13. **Read more:** `Promise.any` · cancelling with `AbortController` · why not retry a payment blindly (idempotency in one paragraph) · interview: all vs allSettled? what is exponential back-off? · MDN “Promise.all()”, “Promise.allSettled()”.

---

## Module 5 · Forms with JavaScript
**Id:** `j-i-forms` · **Time:** 12 min · **Goals:** I can read a whole form with `FormData` · I can add my own rules with `setCustomValidity` · I can show errors that screen readers announce

1. **Hook:** Pune Travel Desk wants a “Get alerts” form: name, phone, train number, and the journey date must be today or later. HTML can check “required” and “10 digits”, but not “the date is not in the past” or “this train runs on that day”.
2. **What is it?** Using JavaScript **together with** HTML validation: HTML does the simple checks, JavaScript adds the rules only your app knows, and both show their messages in the same place.
   - *Animation:* the error link from HTML Intermediate, now switched on and off by code as the user types.
3. **Where it’s used:** every sign-up, booking and payment form: “This username is taken”, “Date can’t be in the past”, “Passwords don’t match”.
4. **How it works:**
   ```js
   const form = document.querySelector("#alerts");
   const date = form.elements.date;
   date.addEventListener("input", () => {
     const past = date.value && date.value < today();   // "2026-10-27" style text compares correctly
     date.setCustomValidity(past ? "Pick today or a later date" : "");
   });
   form.addEventListener("submit", (e) => {
     e.preventDefault();
     if (!form.checkValidity()) return showErrors(form);
     const data = Object.fromEntries(new FormData(form));
     send(data);
   });
   function showError(input) {
     const msg = document.querySelector(`#${input.id}-err`);
     msg.textContent = input.validationMessage;
     input.setAttribute("aria-invalid", input.validity.valid ? "false" : "true");
   }
   ```
   `setCustomValidity("message")` makes the field invalid with your message; `setCustomValidity("")` makes it valid again. `FormData` reads every named field at once. `aria-invalid` tells screen readers which field is wrong.
5. **Try it:** type a past date, a 9-digit phone, an empty name; watch each message appear and clear.
6. **See it run:** the listener is added → a past date is typed → the custom message is set → submit is tapped → `checkValidity()` is false → the messages appear → fixed → the data object prints.
7. **Common mistake:** forgetting `setCustomValidity("")` once the value is fixed. The field stays invalid forever and the form can never be sent. **Fix:** always clear it when the rule passes.
8. **Match:** `FormData` → all fields at once · `setCustomValidity` → my own rule · `checkValidity()` → is the whole form OK? · `validationMessage` → the browser’s text for this field · `aria-invalid` → tells screen readers it’s wrong · `preventDefault()` → stop the page reloading.
9. **Quick check:** browser and JavaScript checks pass. Does the server still need to check the data? **Yes, always; anyone can skip the page’s code** ✅ · no · only for payments · only on phones.
10. **At work:** Meera: “The QA report on the alerts form.” *Ticket:* past dates are accepted · after fixing an error the form still won’t send · screen readers don’t say which field is wrong.
11. **Build it:** the alerts form. **Checks:** a past date gets a custom message · the message clears once fixed · submit is stopped while invalid · errors show next to each field with `aria-invalid` · a valid form gives the data object from `FormData`.
12. **Recap:** HTML for simple rules, JS for app rules · always clear custom messages · FormData reads everything · the server checks again.
13. **Read more:** the `validity` object (`valueMissing`, `patternMismatch`, …) · the `novalidate` attribute · opening a `<dialog>` with `showModal()` for “Alert saved” · interview: client vs server validation? what does preventDefault do? · MDN “Client-side form validation”, “FormData”.

---

## Module 6 · One source of truth: state and storage
**Id:** `j-i-state` · **Time:** 12 min · **Goals:** I can keep a page’s data in one state object · I can redraw the page from state with a `render()` function · I can save and load state with `localStorage` safely

1. **Hook:** The saved-trains list shows 4 trains but the counter says 3, and after a refresh both are wrong. The page is changed in five different places and they have drifted apart. The fix is a pattern React and every big framework are built on.
2. **What is it?** Keep the data in **one place** (the **state**), change it only through small functions, and after every change call **one `render()`** that draws the page from the state. Save the state, and the page comes back exactly the same.
   - *Animation (new):* state → render: one state box; every tap changes the box, then `render()` redraws the page to match.
3. **Where it’s used:** shopping carts, to-do lists, chat apps, this app’s own progress screen. React, Vue and others do the `render()` part for you, but the idea is the same.
4. **How it works:**
   ```js
   const KEY = "ptd-saved-v1";
   const state = load() ?? { saved: [] };
   function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
   function load() {
     try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
   }
   function addTrain(no) {
     if (!state.saved.includes(no)) state.saved.push(no);
     save(); render();
   }
   function render() {
     list.replaceChildren(...state.saved.map((no) => {
       const li = document.createElement("li");
       const btn = document.createElement("button");
       btn.textContent = "Remove";
       btn.dataset.no = no;
       li.append(`${no} `, btn);
       return li;
     }));
     count.textContent = `${state.saved.length} saved`;
   }
   list.addEventListener("click", (e) => {
     if (e.target.matches("button")) removeTrain(Number(e.target.dataset.no));
   });
   render();
   ```
   `localStorage` keeps only text, so `JSON.stringify` to save and `JSON.parse` to load. The `try` protects you from old or broken saved data. One click listener on the list (**event delegation**) works for buttons added later too.
5. **Try it:** add and remove trains; tap “Refresh page”, and the list comes back; tap “Break saved data” and see the safe fallback.
6. **See it run:** state is loaded (empty) → a train is added → state changes → `save()` → `render()` draws the list and the count → the page is reloaded → state comes back from storage.
7. **Common mistake:** changing the page directly in one place (`count.textContent = …`) and the state in another; they drift apart. Also: `localStorage.setItem(KEY, state)` saves the text `"[object Object]"`. **Fix:** change state, then `render()`; always `JSON.stringify`.
8. **Match:** state → the one true copy of the data · `render()` → draw the page from state · `JSON.stringify` → object to text for saving · `JSON.parse` → text back to an object · event delegation → one listener for many buttons · `-v1` in the key → lets you change the format later.
9. **Quick check:** what does `localStorage.getItem("missing-key")` return? **`null`** ✅ · `undefined` · `""` · it throws an error.
10. **At work:** Meera: “Bug report: the counter and the list disagree, and removing a train you just added does nothing.” *Ticket:* both bugs, with steps to reproduce.
11. **Build it:** the saved-trains list. **Checks:** one `state` object · `render()` draws the list and the count from it · add and remove change state, then call `render()` · state survives a reload · broken saved data falls back safely · one delegated click listener.
12. **Recap:** one state · change it, then render · stringify to save, parse to load · try around parse · delegate events.
13. **Read more:** why frameworks like React exist (preview of the React track) · `sessionStorage` · storage limits and private browsing · interview: what is event delegation? why keep a single source of truth? · MDN “Web Storage API”, “Event delegation”.

---

## Project · Is my train on time?
**Id:** `j-i-project` · **Time:** 40 min · Four checked steps in the web editor, against the practice server.

**Brief (from Farhan, forwarding Pune Travel Desk):** “Customers call us all day to ask if their train is late. Can we have a page where they type a train number, see the status, save their regular trains, and get the latest for all of them at once?”

1. **Search a train:** a form with a train-number field (cleaned with `trim`, 5 digits checked with `setCustomValidity`), a fetch with `searchParams` and a timeout, and messages for loading, not found, server error, cancelled and offline. *Checks:* the Module 3 and 5 rules.
2. **Show it properly:** the departure time in Kolkata time, the fare in rupees, “on time” or “25 min late”, and the next stations with `map`. *Checks:* the Module 1 and 2 rules.
3. **Save my trains:** state + `render()` + `localStorage`, add and remove with a delegated listener, survives reload. *Checks:* the Module 6 rules.
4. **Refresh all:** one button loads every saved train together with `allSettled`, retries the flaky one, and shows a summary line (“3 trains: 2 on time, 1 late”). *Checks:* the Module 1 and 4 rules.

**Learned:** built a small real app end to end · handled every server outcome · kept the page in step with its data · made it fast with parallel requests.
**Read more:** MDN “Fetching data from the server”, javascript.info “Promises, async/await”.

---

## Decisions for you

1. **Modules in depth → Advanced.** The curriculum listed “modules in depth” for Intermediate. Running several JavaScript files in the app needs a small bundler, and it fits better next to npm and build tools in Advanced. I replaced it with **Money, dates and text** (Intl), which every Indian app needs. OK?
2. **Real APIs or the practice server?** The JS Basic draft said “real public APIs come in Intermediate”. Real APIs need internet, change their replies, and some need keys, so lessons built on them can break without us knowing. My recommendation: keep lessons on the practice server (extended with train routes: lookup by number, not found, cancelled, slow, broken, and a “flaky” route that fails once and then works), and add **one optional “Try a real API”** step in Module 3 using a free, no-key public API, which is not checked. *Or* real APIs throughout.
3. **Practice data label.** Train numbers in the 90100s, made-up names and times, and a small “Practice data” tag on every train page, so no one mistakes it for real railway information. OK?
4. **Six modules**, matching HTML and CSS Intermediate. OK?
