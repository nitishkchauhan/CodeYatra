# HTML · Intermediate level · content draft (modules 1–6 and the project)

**Status:** replaced by `web-intermediate-v5.md` (30 Oct 2026). Kept for its detail; the new draft uses Lesson v5 and neutral names. Nothing is built yet. Once approved, each module is built as a Lesson v3 lesson with tests and module notes, on branch `lesson-v3`.

**Order (as in Python Intermediate):** Hook → 3 learn cards (What is it? · Where it’s used · How it works, each with an animation) → Try it → See it build → Common mistake → Sort or match → Quick check → **At work** (a message from a teammate, with a ticket or report) → Build it (the task from that message, live checks) → Recap → Read more.

**Six modules, about 12 minutes each**, the same as Python Intermediate. Basic taught *what* each tag does; Intermediate is about doing it **well**: pages that everyone can use, that load fast on a cheap phone, and that Google and WhatsApp understand.

**Story thread (all three Intermediate tracks):** the learner has joined **Saathi Web Studio**, a small studio in Indore. **Meera** (team lead) sends the At work messages. In HTML the client is **Nayi Disha School**, which wants a proper school site with admissions online. (Both names are made up.)

**Learner level:** has finished HTML Basic and CSS Basic. All code is real and checked in tests: each Build it starter fails its checks and its solution passes, and every page is run in a test browser (jsdom).

**New animations (4):** `srcset` picking (three image sizes; the phone takes the small one, the laptop the big one) · relative paths (a folder tree; `../` climbs up one folder) · the loading waterfall (files arriving one after another; `defer` and `loading="lazy"` move them out of the way) · the error link (an error message joined to its field with a thread, read out together).

---

## Module 1 · Forms that everyone can fill
**Id:** `h-i-forms` · **Time:** 12 min · **Goals:** I can group fields with `fieldset` and `legend` · I can join an error message to its field · I can help phones fill a form with `autocomplete` and `inputmode`

1. **Hook:** Nayi Disha’s old admission form loses half its parents on the phone. The keyboard shows letters for the phone number, autofill does nothing, and a screen-reader user hears only “edit text, edit text”.
2. **What is it?** A form that works for **everyone**: every field has a label, related fields are grouped, errors say what to fix and are linked to their field, and the phone knows what each field is.
   - *Animation (new):* the error link: “Enter a 10-digit number” is tied to the phone field, and a screen reader reads both together.
3. **Where it’s used:** every sign-up, checkout and government form. Good forms get more admissions, orders and payments; in India, many public sites must meet accessibility rules.
4. **How it works:**
   ```html
   <fieldset>
     <legend>Parent’s details</legend>
     <label for="ph">Mobile number</label>
     <input id="ph" name="phone" type="tel" inputmode="numeric"
            autocomplete="tel" aria-describedby="ph-hint ph-err" required>
     <p id="ph-hint">10 digits, no +91</p>
     <p id="ph-err" class="error">Enter a 10-digit number</p>
   </fieldset>
   ```
   `autocomplete` tells the browser what to fill (`name`, `email`, `tel`, `postal-code`). `inputmode` picks the keyboard. `aria-describedby` points to the hint and the error, so they’re read with the field.
5. **Try it:** tap `inputmode` (`numeric` ↔ `text`) and `autocomplete` (`tel` ↔ `off`); the phone mock-up shows which keyboard and autofill appear.
6. **See it build:** the `fieldset` box → the `legend` on its border → label and input → the hint below → the error line joining the field.
7. **Common mistake:** a placeholder instead of a label: `<input placeholder="Mobile number">`. The text vanishes as soon as you type, and many screen readers skip it. **Fix:** a real `<label>`; keep placeholders for examples only.
8. **Match:** `fieldset` + `legend` → a group with a title · `autocomplete="email"` → autofill · `inputmode="numeric"` → number keyboard · `aria-describedby` → hint and error read with the field · `required` → can’t be left empty.
9. **Quick check:** which attribute makes the phone show the number keypad, while the value stays text? **`inputmode="numeric"`** ✅ · `type="number"` (adds spinner arrows and drops leading zeros) · `pattern` · `autocomplete`.
10. **At work:** Meera: “Parents say the form is hard on phones. Here’s the audit.” *Ticket:* 3 fields have no label · the radio buttons for class have no group name · the phone shows a letter keyboard · the errors aren’t linked to their fields.
11. **Build it:** fix the admission form. **Checks:** every input has a label · the class radios sit in a `fieldset` with a `legend` · the phone field has `inputmode` and `autocomplete="tel"` · each error’s id is in its field’s `aria-describedby`.
12. **Recap:** labels always · group with fieldset/legend · autocomplete and inputmode help phones · link errors with aria-describedby.
13. **Read more:** the full `autocomplete` list · `type="number"` vs `inputmode` · `aria-invalid` (used in JS Intermediate) · interview: why not placeholders as labels? what does `fieldset` give a screen reader? · MDN “Web forms: how to structure”, WAI “Forms tutorial”.

---

## Module 2 · Responsive images
**Id:** `h-i-images` · **Time:** 12 min · **Goals:** I can offer several image sizes with `srcset` and `sizes` · I can swap a picture for small screens with `<picture>` · I can stop the page jumping with `width` and `height`

1. **Hook:** The school’s home page photo is 4 MB. On a 4G phone it takes 9 seconds, and when it finally appears the text jumps down and the parent taps the wrong button.
2. **What is it?** Giving the browser **choices**, so each phone downloads only the size it needs, plus telling it the shape in advance so nothing jumps.
   - *Animation (new):* `srcset` picking: the phone takes the 480-pixel file, the laptop the 1200-pixel one.
3. **Where it’s used:** every shopping and news site. Flipkart and Amazon product photos come in many sizes; news sites switch to a tighter crop on phones.
4. **How it works:**
   ```html
   <img src="campus-800.jpg"
        srcset="campus-480.jpg 480w, campus-800.jpg 800w, campus-1200.jpg 1200w"
        sizes="(min-width: 50rem) 50vw, 100vw"
        width="1200" height="800" alt="Students in the school garden">

   <picture>
     <source media="(max-width: 30rem)" srcset="banner-square.jpg">
     <img src="banner-wide.jpg" width="1200" height="400" alt="Admissions open for 2027">
   </picture>
   ```
   `480w` means “this file is 480 pixels wide”. `sizes` says how wide the image will show. `width` and `height` give the shape, so the space is kept while it loads. `<picture>` swaps in a different crop.
5. **Try it:** drag the screen width; a label shows which file the browser picked and how many KB it saved.
6. **See it build:** the `img` with only `src` → `srcset` added (the file label changes) → `sizes` → `width`/`height` (the grey box holds the space) → the `<picture>` crop on a narrow screen.
7. **Common mistake:** no `width` and `height`, so the text jumps when the photo arrives. That jump is measured by Google as **CLS** (layout shift). **Fix:** always set both; CSS `max-width: 100%; height: auto;` keeps it responsive.
8. **Match:** `srcset` with `w` → the same picture in several sizes · `sizes` → how wide it shows · `<picture>` + `<source>` → a different crop · `width`/`height` → no jumping · `alt=""` → a decorative image, skipped by screen readers.
9. **Quick check:** a phone shows the image full width at 400 px. Which file will it most likely choose? **`campus-480.jpg`** ✅ · 800 · 1200 · all three.
10. **At work:** Meera: “The home page is slow and jumps. Here’s the speed report.” *Report:* hero image 4.1 MB · layout shift 0.31 (should be under 0.1) · banner text unreadable on phones.
11. **Build it:** fix the hero and the banner. **Checks:** the hero has `srcset` with 3 sizes and `sizes` · width and height are set · the banner uses `<picture>` with a phone `source` · every image has suitable `alt` text.
12. **Recap:** srcset + sizes give choices · picture swaps the crop · width and height stop the jump.
13. **Read more:** `x` descriptors for sharp logos (`logo@2x.png 2x`) · WebP and AVIF in `<picture>` · interview: srcset vs picture? what is CLS? · MDN “Responsive images”, web.dev “Optimize Cumulative Layout Shift”.

---

## Module 3 · Sites with many pages
**Id:** `h-i-pages` · **Time:** 12 min · **Goals:** I can link pages with relative paths · I can share one navigation and show the current page · I can plan folders for a real site

1. **Hook:** The school needs Home, Admissions, Fees and Contact. Meera’s first rule: “If a link works on your laptop but breaks online, the path is wrong.”
2. **What is it?** A website is **a folder of pages**. Pages link to each other with **relative paths**: directions from *this* file to *that* file.
   - *Animation (new):* relative paths: a folder tree; `about.html` stays in the same folder, `../` climbs up one folder, `images/` goes down into one.
3. **Where it’s used:** every site with more than one page. Big sites are built from templates, but every one still turns into folders of HTML files with these same links.
4. **How it works:**
   ```text
   index.html
   admissions.html
   images/logo.svg
   fees/2027.html
   ```
   ```html
   <!-- in index.html -->
   <nav aria-label="Main">
     <a href="index.html" aria-current="page">Home</a>
     <a href="admissions.html">Admissions</a>
     <a href="fees/2027.html">Fees</a>
   </nav>
   <img src="images/logo.svg" alt="Nayi Disha School">
   <!-- in fees/2027.html: go up first -->
   <a href="../index.html">Home</a>
   ```
   `aria-current="page"` marks where you are (CSS can style it, and screen readers say “current page”). Every page repeats the same `nav`, so people never get lost.
5. **Try it:** tap which file you are in and which file to link to; the path is written for you and the link is tested in the preview.
6. **See it build:** in the multi-page preview: `index.html` → the `nav` → tap Admissions → `admissions.html` opens → `aria-current` moves → the Fees page uses `../`.
7. **Common mistake:** a path from your own computer: `href="C:/Users/riya/site/fees.html"`. It works only on your laptop. Also: forgetting `../` inside a folder. **Fix:** relative paths, and test every link.
8. **Sort:** which links work from `fees/2027.html`? `../index.html` ✅ · `index.html` ✗ · `../images/logo.svg` ✅ · `/C:/site/index.html` ✗ · `2026.html` ✅ (same folder).
9. **Quick check:** from `fees/2027.html`, how do you link to `admissions.html`? **`../admissions.html`** ✅ · `admissions.html` · `/fees/admissions.html` · `./fees/admissions.html`.
10. **At work:** Meera: “The client clicked every link and sent a list.” *Ticket:* Fees → Home is broken · the logo is missing on the Fees page · you can’t tell which page you are on.
11. **Build it:** a 3-page site (Home, Admissions, Fees in a `fees/` folder). **Checks:** every link opens the right page · the logo shows on all pages · each page marks itself with `aria-current="page"` · the same `nav` on every page.
12. **Recap:** a site is a folder of pages · relative paths · `../` goes up · one shared nav with `aria-current`.
13. **Read more:** root-relative paths (`/fees/`) and when they work · a `404.html` page · breadcrumbs · interview: relative vs absolute URLs? · MDN “Creating hyperlinks”, “Dealing with files”.

---

## Module 4 · Telling Google what the page is
**Id:** `h-i-data` · **Time:** 12 min · **Goals:** I can describe a page with structured data (JSON-LD) · I can set a canonical URL · I know what robots and sitemap files are for

1. **Hook:** Search “Nayi Disha School Indore” and Google shows the wrong phone number and an old page. Basic gave the page a title and description; now we tell search engines **facts**: name, address, phone, opening hours.
2. **What is it?** **Structured data** is a small block of JSON, using words from schema.org, that states facts about the page in a form machines can read.
   - *Animation:* the page as people see it next to the same facts as a labelled card that a search engine reads.
3. **Where it’s used:** the address, hours and phone in Google’s business panel, recipe ratings, event dates, product prices. (Google decides when to show them; structured data makes it *possible*, not certain.)
4. **How it works:**
   ```html
   <link rel="canonical" href="https://nayidisha.example/admissions.html">
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "School",
     "name": "Nayi Disha School",
     "telephone": "+91-731-0000000",
     "address": {
       "@type": "PostalAddress",
       "addressLocality": "Indore",
       "addressRegion": "MP"
     }
   }
   </script>
   ```
   `canonical` says “this is the main address of this page” when the same page can be reached several ways. `robots.txt` tells crawlers where not to go; `sitemap.xml` lists the pages you want found.
5. **Try it:** tap `@type` (`School` ↔ `LocalBusiness` ↔ `Event`) and the facts; the “search result card” preview changes.
6. **See it build:** the canonical link → the empty `<script type="application/ld+json">` → `@context` and `@type` → name and phone → the nested address (the card fills in).
7. **Common mistake:** broken JSON: a comma after the last item, or single quotes. One error and the whole block is ignored, with no warning on the page. **Fix:** double quotes, no trailing comma; check with Google’s Rich Results Test.
8. **Match:** JSON-LD → facts for machines · `@type` → what kind of thing · `canonical` → the main URL · `robots.txt` → where crawlers may go · `sitemap.xml` → the list of pages.
9. **Quick check:** which line breaks this JSON-LD? **`"name": "Nayi Disha School",` right before the closing `}`** ✅ (the comma) · `"@type": "School"` · `"@context": "https://schema.org"` · none.
10. **At work:** Meera: “The school wants the right phone number on Google. Add the facts.” *Data:* name, phone, street, city, state, PIN, opening hours Mon–Sat 8:00–14:00.
11. **Build it:** add JSON-LD for the school and a canonical link. **Checks:** the script has `type="application/ld+json"` · the JSON parses · `@type` is `School` · name, telephone and a nested `PostalAddress` · `openingHours` is set · one canonical link.
12. **Recap:** JSON-LD states facts · valid JSON or nothing · canonical picks the main URL · robots and sitemap guide crawlers.
13. **Read more:** schema.org types for shops, events and courses · why structured data is not a ranking trick · interview: what is canonical? robots.txt vs `noindex`? · Google Search Central “Introduction to structured data”, schema.org “School”.

---

## Module 5 · Pages that load fast
**Id:** `h-i-speed` · **Time:** 12 min · **Goals:** I can name the three Core Web Vitals · I can lazy-load images and embeds below the fold · I can stop scripts from blocking the page

1. **Hook:** Most parents open the school site on a budget phone on mobile data. Google’s research shows people leave pages that take more than a few seconds. Speed is not a luxury; it decides admissions.
2. **What is it?** Page speed is how quickly the main content shows and the page responds. Google measures it with **Core Web Vitals**: **LCP** (main content shows; good under 2.5 s), **CLS** (layout jumps; under 0.1) and **INP** (response to taps; under 200 ms).
   - *Animation (new):* the loading waterfall: files arriving one after another; a blocking script holds everything back; `defer` and `loading="lazy"` move things out of the way.
3. **Where it’s used:** every big site watches these numbers. They are one of the signals in Google search, and on phones they are the difference between an order and a bounce.
4. **How it works:**
   ```html
   <head>
     <script src="menu.js" defer></script>
   </head>
   <img src="hero.jpg" fetchpriority="high" width="1200" height="600" alt="…">
   <!-- far down the page -->
   <img src="gallery-1.jpg" loading="lazy" width="600" height="400" alt="…">
   <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" loading="lazy"
           title="A day at Nayi Disha" width="560" height="315"></iframe>
   ```
   `defer` downloads the script without stopping the page and runs it after the HTML is read. `loading="lazy"` waits until the image is near the screen. The first big image is the opposite: load it **early** with `fetchpriority="high"`.
5. **Try it:** tap attributes on and off (`defer`, `lazy`, `fetchpriority`); the waterfall and an LCP timer change.
6. **See it build:** a slow page → `defer` on the script (the bar moves) → `lazy` on the gallery → `fetchpriority` on the hero → the final waterfall.
7. **Common mistake:** `loading="lazy"` on the hero image at the top. It now waits, and LCP gets *worse*. **Fix:** lazy only below the fold; the hero gets `fetchpriority="high"`.
8. **Sort:** lazy or not? the hero photo ✗ · a gallery at the bottom ✓ · the logo in the header ✗ · a YouTube embed in the footer ✓ · a map on the Contact page, below the form ✓.
9. **Quick check:** what does `defer` do? **downloads alongside the page and runs after the HTML is read** ✅ · runs first · never runs on phones · makes the file smaller.
10. **At work:** Meera: “Lighthouse says 41 on mobile. Get it up.” *Report:* LCP 6.2 s (hero lazy-loaded) · 2 scripts block the page · 8 gallery images load at the start · YouTube embed loads at the start.
11. **Build it:** fix the home page. **Checks:** scripts have `defer` · the hero is not lazy and has `fetchpriority="high"` · gallery images and the iframe are lazy · every image has width and height · the iframe has a `title`.
12. **Recap:** LCP, CLS, INP · lazy below the fold, early for the hero · defer scripts · always width and height.
13. **Read more:** `preconnect` for fonts · how to run Lighthouse in Chrome · why INP replaced FID in 2024 · interview: what are Core Web Vitals? defer vs async? · web.dev “Web Vitals”, MDN “Lazy loading”.

---

## Module 6 · Built-in interactive elements
**Id:** `h-i-widgets` · **Time:** 12 min · **Goals:** I can build an FAQ with `details` and `summary` · I can open a menu or tip with the `popover` attribute · I can show progress with `progress` and `meter`

1. **Hook:** The school wants an FAQ that opens and closes, a “Fee help” tip and a progress bar on the form. Many people reach for JavaScript first; HTML already has all three, and they work with the keyboard and screen readers for free.
2. **What is it?** Elements that **do something** on their own: `details` opens and closes, `popover` shows a panel over the page, `progress` and `meter` show amounts.
   - *Animation:* an FAQ opening with no script, the keyboard focus moving with it.
3. **Where it’s used:** FAQ sections, “Read more” toggles, help tips, menus, step counters (“Step 2 of 4”), storage and battery bars.
4. **How it works:**
   ```html
   <details name="faq">
     <summary>When do admissions open?</summary>
     <p>Admissions for 2027 open on 1 December.</p>
   </details>

   <button popovertarget="fee-help">Fee help</button>
   <div id="fee-help" popover>Fees can be paid in 4 parts.</div>

   <label for="steps">Form progress</label>
   <progress id="steps" value="2" max="4">2 of 4</progress>
   <meter value="0.8" low="0.3" high="0.7">80% seats filled</meter>
   ```
   Giving several `details` the same `name` makes them an accordion: opening one closes the others. A `popover` closes when you tap outside it or press Escape.
5. **Try it:** tap `open` on and off, give the FAQ items the same `name`, change the progress value.
6. **See it build:** one `details` → its `summary` → the answer → two more questions with the same `name` → the popover button and panel → the progress bar.
7. **Common mistake:** a fake button: `<div onclick="…">Fee help</div>`. It can’t be reached with the keyboard and isn’t announced as a button. **Fix:** a real `<button>`, here with `popovertarget`, no script needed.
8. **Match:** `details`/`summary` → open and close · same `name` → only one open · `popover` → a panel over the page · `progress` → how far along · `meter` → an amount in a range.
9. **Quick check:** how do you make three FAQ items an accordion where only one stays open? **give them the same `name`** ✅ · put them in a `fieldset` · add `open` to all · it needs JavaScript.
10. **At work:** Meera: “The client’s old FAQ used 80 lines of jQuery and breaks on iPhones. Can you do it with plain HTML?”
11. **Build it:** the Admissions FAQ and help tip. **Checks:** 4 `details` with `summary` · they share one `name` · a `button` with `popovertarget` matching a `popover` element · a `progress` with value and max.
12. **Recap:** details/summary for open and close · popover for panels · progress and meter for amounts · real buttons, not divs.
13. **Read more:** `<dialog>` (opened with a line of JavaScript, covered in JS Intermediate) · styling `summary` markers · interview: why use native elements over custom widgets? · MDN “details”, “Popover API”, “meter”.

---

## Project · The Nayi Disha School website
**Id:** `h-i-project` · **Time:** 35 min · Four checked steps in the multi-page web editor.

**Brief (from Meera, forwarding the school):** “We need a real site: Home, Admissions with a form parents can fill on the phone, and Fees. It must load fast and show the right details on Google.”

1. **The pages and links:** `index.html`, `admissions.html`, `fees.html`, one shared `nav` with `aria-current`, images in an `images/` folder. *Checks:* every link works · current page marked on each.
2. **Home that loads fast:** responsive hero with `srcset`, width and height, `fetchpriority`; a lazy gallery; a lazy video embed with a title; the school’s JSON-LD. *Checks:* the Module 2, 4 and 5 rules.
3. **Admissions form:** grouped fields, labels, `autocomplete`, `inputmode`, linked hints and errors; an FAQ accordion with `details`. *Checks:* the Module 1 and 6 rules.
4. **Fees and finishing touches:** a fee table with headers and a caption (Basic), a fee-help popover, a canonical link and a description on every page. *Checks:* table headers · popover wired · every page has a title, description and canonical.

**Learned:** planned and linked a multi-page site · built forms that work on phones and with screen readers · made pages fast and readable by search engines.
**Read more:** web.dev “Learn HTML”, WAI “Easy checks — a first review of web accessibility”.

---

## Decisions for you

1. **Multi-page preview (new engineering).** Module 3 and the project need the web editor to hold several HTML files (with a file switcher) and open the right file when a link is tapped in the preview. I estimate about half a day of work, with tests that check every link. *Or* keep one page and teach links between sections (`#admissions`), which is weaker. My recommendation: build it; CSS and JS Intermediate can reuse it.
2. **One topic swapped.** The curriculum listed “embedding maps and video” for Intermediate, but HTML Basic Module 10 already teaches it. I replaced it with **built-in interactive elements** (details, popover, progress), and moved lazy-loading embeds into Module 5. OK?
3. **Six modules per level**, as in Python Intermediate, rather than twelve as in Basic. OK?
