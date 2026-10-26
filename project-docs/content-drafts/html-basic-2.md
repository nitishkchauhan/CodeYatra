# HTML · Basic level · content draft (modules 4–12 and the project)

**Status:** draft for owner review, 26 Oct 2026. Same 12-step shape as modules 1–3 (see `html-basic.md`). Nothing here is in the app yet.

---

## Module 4 · Attributes, ids and classes
**Time:** 8 min · **Goals:** I can add attributes to a tag · I can use id for one element and class for groups · I can store extra data with data-*

### 1. Hook
In a class, every student has a unique roll number, and many students share a house colour. Web pages need the same idea: a unique name for one element, and group names for many, so styles and buttons can find the right parts.

### 2. What are attributes?
**Attributes** are extra details written inside an opening tag as `name="value"`. You’ve already used two: `href` on links and `src` on images. **id** gives one element a unique name; **class** puts elements into a group.
- *Animation:* a plain `<p>` gets labels attached like tags on luggage: `id="intro"`, `class="note"`.

### 3. Where is it used in real life?
- Every “Add to cart” button on a shopping site has a class so all of them look the same.
- “Jump to section” links on long pages (like an FAQ) use ids: `href="#refunds"`.
- Apps store hidden details for scripts, such as a product’s ID, in `data-` attributes.

### 4. How it works
```html
<section id="fees">
  <p class="price highlight">₹2,000 a month</p>
  <p class="price">₹5,500 a term</p>
  <li data-batch="morning" data-seats="4">Python, Class 11</li>
</section>
```
- **id** must be unique on the page; CSS finds it with `#fees`.
- **class** can be shared, and one element can have several classes separated by spaces; CSS finds it with `.price`.
- **data-…** attributes hold your own information for JavaScript.

### 5. Try it (live preview with a little CSS)
Tap to change which paragraph has the `highlight` class, the price text, and the id, and watch the styles follow.

### 6. See it build
Step through the CSS rules `.price`, `.highlight` and `#note` and watch each matching element light up in the preview.

### 7. Common mistake: the same id twice
**Wrong:** two paragraphs both with `id="price"`.
**What happens:** the page looks fine, but scripts and `#price` links only ever find the first one.
**Fix:** give both `class="price"`. *Why:* ids are unique; classes are for groups.

### 8. Sort it: id or class?
| Job | Use |
|---|---|
| The one main menu of the page | id |
| All the “Buy” buttons | class |
| A “Back to top” jump target | id |
| Every price on the page | class |
| The single sign-up form | id |
| All error messages | class |

### 9. Quick check
Several fee lines should share one style. What do you give them? **The same class** ✅ · the same id · the same tag only · a data-style attribute.

### 10. Build it
**Task:** give the heading `id="title"` and both stop names `class="stop"`. Gaps for `id`, `class`, `"stop"`; word bank adds `name`, `#stop`, `.stop`, `href`.
**Checks:** one element with id title · two elements with class stop.

### 11. Recap
- Attributes add details inside the opening tag: `name="value"`.
- id names one unique element; class groups many.
- `data-*` attributes store extra information for JavaScript.

### 12. Read more
Attribute rules (quotes, true/false attributes like `disabled`), naming ids and classes well, how CSS and JavaScript select them. **Interview:** id versus class? Can an element have two classes? What are data attributes for? **Docs:** MDN “HTML attribute reference”, MDN `class`, MDN `id`.

---

## Module 5 · Lists
**Time:** 7 min · **Goals:** I can make numbered and bulleted lists · I can nest a list inside another · I know when a list is the right choice

### 1. Hook
A recipe has ingredients (any order) and steps (in order). A train timetable has stops in order. Lists make this kind of information quick to scan on a phone.

### 2. What are lists?
HTML has two main lists: **unordered** `<ul>` (bullets, order doesn’t matter) and **ordered** `<ol>` (numbers, order matters). Each item is an `<li>`.
- *Animation:* loose items snap into a bulleted column, then numbers appear when the list becomes ordered.

### 3. Where is it used in real life?
Navigation menus at the top of websites are usually `<ul>` lists of links. Step-by-step guides (how to apply for a PAN card) use `<ol>`. Product features, search results and comment threads are lists too.

### 4. How it works
```html
<h2>Ingredients</h2>
<ul>
  <li>Poha</li>
  <li>Onion</li>
</ul>
<h2>Steps</h2>
<ol>
  <li>Wash the poha</li>
  <li>Fry the onion</li>
</ol>
```
A list can contain another list inside an `<li>`, for sub-points. `<ol start="5">` starts numbering at 5.

### 5. Try it
Tap to switch `ul` ↔ `ol`, change an item, and change the start number.

### 6. See it build
Step through a nested list and watch the indentation and numbering appear level by level.

### 7. Common mistake: text directly inside `<ul>`
**Wrong:** `<ul>Poha Onion</ul>`. **What happens:** no bullets, and screen readers don’t announce a list. **Fix:** wrap each item in `<li>`.

### 8. Sort it: ordered or unordered?
Recipe steps → ordered · Ingredients → unordered · Train stops → ordered · Features of a phone → unordered · Top 10 rankings → ordered · Things to pack → unordered.

### 9. Quick check
Which tag holds one item in a list? **`<li>`** ✅ · `<item>` · `<ul>` · `<list>`.

### 10. Build it
**Task:** a train route as an ordered list of 4 stops, with a sub-list of platforms under one stop. Gaps for `ol`, `li`, `ul`; word bank adds `list`, `item`, `dl`.
**Checks:** an `<ol>` with 4 `<li>` · a nested list inside one item.

### 11. Recap
- `<ul>` for bullets, `<ol>` for numbered steps.
- Every item is an `<li>`.
- Lists can be nested for sub-points.

### 12. Read more
Description lists (`<dl>`) for terms and meanings, lists as menus, accessibility of lists. **Interview:** ul versus ol? When would you use dl? **Docs:** MDN `<ul>`, `<ol>`, `<li>`.

---

## Module 6 · Tables
**Time:** 8 min · **Goals:** I can build a table with rows and columns · I can mark header cells · I know tables are for data, not page layout

### 1. Hook
A school timetable, a mark sheet, an IRCTC fare chart: rows and columns are the clearest way to compare information.

### 2. What is a table?
An HTML **table** arranges data in rows (`<tr>`) and cells: header cells (`<th>`) and data cells (`<td>`). `<thead>` and `<tbody>` group the header row and the data rows.
- *Animation:* a grid draws itself row by row, with the header row in bold.

### 3. Where is it used in real life?
Bank statements, results pages, cricket scorecards, price comparison pages and admin dashboards all use tables.

### 4. How it works
```html
<table>
  <caption>Class 10 marks</caption>
  <thead>
    <tr><th>Name</th><th>Maths</th></tr>
  </thead>
  <tbody>
    <tr><td>Asha</td><td>91</td></tr>
    <tr><td>Ravi</td><td>72</td></tr>
  </tbody>
</table>
```
`<caption>` titles the table. `colspan="2"` makes a cell span two columns.

### 5. Try it
Tap to change marks and names, and toggle `th` ↔ `td` for the first row.

### 6. See it build
Step through each `<tr>` and watch the row and its cells appear in the grid.

### 7. Common mistake: using a table for page layout
**Wrong:** a table to put a sidebar next to the content. **What happens:** it breaks on phones, and screen readers read the page as data. **Fix:** use CSS layout (Flexbox and Grid, in the CSS track); tables are for data.

### 8. Match it
`<table>` the whole grid · `<tr>` a row · `<th>` a header cell · `<td>` a data cell · `<caption>` the table’s title.

### 9. Quick check
What does `<th>` mark? **A header cell** ✅ · a table heading outside the table · a row · the top of the page.

### 10. Build it
**Task:** a 2-column fare table (Route, Fare) with a header row and two data rows, and a caption. Gaps for `tr`, `th`, `td`, `caption`.
**Checks:** a caption · one header row with 2 `<th>` · two data rows.

### 11. Recap
- `<tr>` rows, `<th>` header cells, `<td>` data cells.
- `<thead>`, `<tbody>` and `<caption>` make tables clear and accessible.
- Tables are for data, never for layout.

### 12. Read more
`colspan` and `rowspan`, `scope` on header cells, tables on small screens. **Interview:** th versus td? Why not use tables for layout? **Docs:** MDN “HTML table basics”.

---

## Module 7 · Forms and inputs
**Time:** 9 min · **Goals:** I can build a form with labelled inputs · I can choose the right input type · I know what happens when a form is submitted

### 1. Hook
Every sign-up, login, search box and order form is an HTML form. Riya’s customers should be able to send their name, phone number and order from her page.

### 2. What is a form?
A **form** (`<form>`) collects information from the user and sends it somewhere. Inside it are **inputs** (`<input>`) for typing, each with a **label** (`<label>`) saying what it’s for, and a **button** to submit.
- *Animation:* fields fill in, the button is pressed, and a packet of name=value pairs travels to the server.

### 3. Where is it used in real life?
Login pages, Google search, UPI payment screens, college admission forms, OTP boxes and the comment box under a video.

### 4. How it works
```html
<form action="/order" method="post">
  <label for="name">Your name</label>
  <input id="name" name="name" type="text">
  <label for="phone">Phone</label>
  <input id="phone" name="phone" type="tel">
  <button type="submit">Place order</button>
</form>
```
- `for` on the label matches the input’s `id`, so tapping the label focuses the field.
- `name` is the key sent to the server; `type` (text, email, tel, number, password, date) changes the keyboard on phones and adds checks.

### 5. Try it
Tap to change input types (`text` ↔ `email` ↔ `tel` ↔ `password`) and see how the field and phone keyboard hint change.

### 6. See it build
Step through a submit: each field becomes `name=value`, joined together and sent to the address in `action`.

### 7. Common mistake: no label
**Wrong:** an input with only placeholder text, “Name”. **What happens:** the hint disappears as you type, and screen readers can’t say what the field is. **Fix:** a `<label for="…">` for every input.

### 8. Match it: which input type?
Email address → `email` · Phone number → `tel` · Password → `password` · Date of birth → `date` · Number of seats → `number` · Search → `search`.

### 9. Quick check
What does the `name` attribute do? **It is the key sent with the value to the server** ✅ · shows text on the page · sets the field’s colour · makes the field required.

### 10. Build it
**Task:** an order form with a labelled name field, a labelled phone field (`type="tel"`) and a submit button. Gaps for `label`, `for`, `type`, `button`.
**Checks:** two labels linked to inputs · a tel input · a submit button.

### 11. Recap
- `<form>` collects input and sends it to `action`.
- Every input needs a `<label>`; `name` is what gets sent.
- The right `type` gives the right keyboard and basic checks.

### 12. Read more
GET versus POST, what the server receives, why forms need security on the server too. **Interview:** GET versus POST? Why labels? What does placeholder not replace? **Docs:** MDN “Your first form”, MDN `<input>` types.

---

## Module 8 · Choices and validation
**Time:** 9 min · **Goals:** I can offer choices with checkboxes, radio buttons and dropdowns · I can make fields required and check their format · I know browser checks don’t replace server checks

### 1. Hook
A train booking form asks for class (one choice), meal preferences (several) and a valid mobile number. Good forms make the right choice easy and catch mistakes before you submit.

### 2. What are choice inputs and validation?
**Radio buttons** pick one option from a group, **checkboxes** pick any number, and a **select** dropdown picks from a list. **Validation** means checking answers: `required`, `min`/`max`, `pattern` and types like `email` let the browser stop bad input.
- *Animation:* a wrong phone number turns the field red with a message; fixing it turns it green.

### 3. Where is it used in real life?
Size and colour pickers on shopping sites, survey forms, train class selection, “I agree to the terms” checkboxes, and OTP fields that must be exactly 6 digits.

### 4. How it works
```html
<fieldset>
  <legend>Class</legend>
  <label><input type="radio" name="class" value="SL" checked> Sleeper</label>
  <label><input type="radio" name="class" value="3A"> AC 3-tier</label>
</fieldset>
<label><input type="checkbox" name="meal" value="veg"> Veg meal</label>
<label for="mobile">Mobile</label>
<input id="mobile" name="mobile" type="tel" required pattern="[6-9][0-9]{9}">
```
Radio buttons in a group share the same `name`. `required` blocks an empty field; `pattern` checks the format.

### 5. Try it
Tap to switch radio ↔ checkbox and change the pattern, then try valid and invalid mobile numbers in the preview.

### 6. See it build
Step through submitting: each field is checked in turn; the first one that fails shows its message and stops the submit.

### 7. Common mistake: radio buttons with different names
**Wrong:** `name="class1"` and `name="class2"`. **What happens:** both can be selected at once. **Fix:** the same `name` for the whole group.

### 8. Sort it: radio, checkbox or select?
Pick one coach class → radio · Choose your toppings → checkbox · Pick your state from 28 → select · Accept the terms → checkbox · Gender (one) → radio · Choose a city from many → select.

### 9. Quick check
A user turns off browser checks and submits bad data. What stops it? **Checks on the server** ✅ · the `required` attribute · the placeholder · the label.

### 10. Build it
**Task:** a booking form with a class radio group (2 options, same name), a veg-meal checkbox and a required mobile field with a 10-digit pattern. Gaps for `radio`, `name`, `checkbox`, `required`, `pattern`.
**Checks:** two radios sharing a name · a checkbox · a required tel input with a pattern.

### 11. Recap
- Radio: one choice (same name); checkbox: any number; select: pick from a list.
- `required`, types, `min`/`max` and `pattern` check input in the browser.
- Always check again on the server.

### 12. Read more
`<select>` and `<option>`, `<textarea>`, accessible error messages, why client-side checks can be bypassed. **Interview:** radio versus checkbox? Is client-side validation enough? **Docs:** MDN “Client-side form validation”.

---

## Module 9 · Semantic page layout
**Time:** 8 min · **Goals:** I can structure a page with header, nav, main, section, article, aside and footer · I know why meaningful tags beat plain divs

### 1. Hook
A newspaper has a masthead, sections, articles and a footer with the address. Websites have the same parts, and HTML has tags that say exactly what each part is.

### 2. What is semantic HTML?
**Semantic** means “with meaning”. Instead of wrapping everything in `<div>`, semantic tags describe the role of each part: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- *Animation:* a page of grey boxes gets labelled region by region.

### 3. Where is it used in real life?
News and blog sites use `<article>` for each story; every site’s menu is a `<nav>`; Google and screen readers use these regions to understand and navigate the page, and “reader mode” in browsers relies on them.

### 4. How it works
```html
<header><h1>Riya’s Tiffins</h1></header>
<nav><a href="#menu">Menu</a> <a href="#contact">Contact</a></nav>
<main>
  <section id="menu"><h2>Menu</h2> …</section>
  <aside>Free delivery above ₹300</aside>
</main>
<footer>© 2026 Riya’s Tiffins, Pune</footer>
```
One `<main>` per page. `<section>` groups a theme; `<article>` is something that makes sense on its own, like a post. `<div>` is fine when nothing else fits.

### 5. Try it
Tap to swap tags (`div` ↔ `section` ↔ `article`) and watch the outline panel update.

### 6. See it build
Step through a page and watch the landmark map fill in: header, nav, main, aside, footer.

### 7. Common mistake: everything in divs
**Wrong:** `<div class="header">`, `<div class="menu">`. **What happens:** looks the same, but screen readers and search engines see no structure. **Fix:** use `<header>` and `<nav>`.

### 8. Match it
`<header>` top of the page or a section · `<nav>` main links · `<main>` the unique main content · `<article>` a stand-alone piece · `<aside>` related side content · `<footer>` the bottom information.

### 9. Quick check
How many `<main>` elements should a page have? **One** ✅ · one per section · none · any number.

### 10. Build it
**Task:** turn a div-only page into semantic HTML. Gaps for `header`, `nav`, `main`, `footer`; word bank adds `div`, `section`, `head`, `bottom`.
**Checks:** one header, nav, main and footer · the nav contains the links.

### 11. Recap
- Semantic tags describe what each part of the page is.
- One `<main>`; `<section>` groups, `<article>` stands alone.
- Use `<div>` only when no meaningful tag fits.

### 12. Read more
Landmarks for screen readers, reader mode, and how structure helps search ranking. **Interview:** section versus article? Why semantic HTML? **Docs:** MDN “Document and website structure”.

---

## Module 10 · Audio, video and SVG
**Time:** 8 min · **Goals:** I can add audio and video with controls · I can embed a YouTube video or map · I can use SVG for sharp icons

### 1. Hook
A coaching centre wants a short welcome video, a pronunciation clip for its English batch, and crisp icons that look sharp on every phone.

### 2. What are media elements?
`<video>` and `<audio>` play media files with built-in controls. `<iframe>` embeds another page, like a YouTube video or Google Map. **SVG** is a picture made of shapes described in code, so it stays sharp at any size.
- *Animation:* a pixel image blurs when zoomed while an SVG icon stays crisp.

### 3. Where is it used in real life?
Course platforms (video lessons), podcasts, product demo videos, embedded maps on “Find us” pages, and the icons in almost every app’s menu.

### 4. How it works
```html
<video src="welcome.mp4" controls width="320" poster="cover.jpg"></video>
<audio src="hello.mp3" controls></audio>
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Welcome video" width="320" height="180"></iframe>
<svg width="40" height="40"><circle cx="20" cy="20" r="18" fill="#FF9F1C" /></svg>
```
`controls` shows play and pause; `poster` shows an image before playing. Videos shouldn’t autoplay with sound.

### 5. Try it
Tap to change the SVG circle’s size and colour, and toggle `controls` on the video.

### 6. See it build
Step through an SVG: the canvas appears, then each shape is drawn at its coordinates.

### 7. Common mistake: autoplaying video with sound
**Wrong:** `<video src="ad.mp4" autoplay>`. **What happens:** most phones block it, and the ones that don’t annoy users and use their data. **Fix:** `controls` and let the user press play (autoplay only when `muted`).

### 8. Match it
`<video>` a video file · `<audio>` a sound file · `<iframe>` another page inside this one · `<svg>` a drawing made of shapes · `poster` the image before playback · `controls` play and pause buttons.

### 9. Quick check
Why use SVG for an icon? **It stays sharp at any size** ✅ · it plays sound · it loads only on Wi-Fi · it can’t be styled.

### 10. Build it
**Task:** add a video with controls and a poster, and an SVG icon of a circle. Gaps for `controls`, `poster`, `svg`, `circle`.
**Checks:** a video with controls · an SVG containing a shape.

### 11. Recap
- `<video>` and `<audio>` with `controls` play media.
- `<iframe>` embeds YouTube videos and maps; give it a `title`.
- SVG draws sharp, scalable graphics with code.

### 12. Read more
Video formats and file size on mobile data, captions with `<track>`, accessible iframes. **Interview:** SVG versus PNG? Why not autoplay? **Docs:** MDN “Video and audio content”, MDN “Adding vector graphics”.

---

## Module 11 · Accessible pages
**Time:** 9 min · **Goals:** I can explain who accessibility helps · I can fix the most common problems (alt text, labels, contrast, headings, keyboard use) · I can check a page

### 1. Hook
Around the world and in India, millions of people use phones with screen readers, larger text or only a keyboard. A page built carefully works for all of them, and is easier for everyone else too.

### 2. What is accessibility?
**Accessibility (a11y)** means building pages everyone can use, including people who are blind or have low vision, can’t use a mouse, are hard of hearing, or are reading in bright sunlight on a cheap phone. Most of it comes from writing correct HTML.
- *Animation:* the same page “heard” by a screen reader, heading by heading and link by link.

### 3. Where is it used in real life?
Government sites are expected to follow accessibility guidelines, big companies test every release, and app stores and courts increasingly expect it. Features like captions and dark text on light backgrounds help everyone.

### 4. How it works: the top checks
- Every image has a meaningful `alt` (or `alt=""` if decorative).
- Every input has a `<label>`.
- Headings in order; one `<h1>`.
- Links say where they go (“Download the fee list”, not “click here”).
- Text has enough contrast with its background.
- Everything works with a keyboard (Tab, Enter); buttons are `<button>`, not clickable divs.
- `<html lang="en">` so screen readers use the right voice.

### 5. Try it
Tap to change link text and alt text, and to swap a clickable `<div>` for a `<button>`, then hear (as text) what a screen reader would say.

### 6. See it build: a screen reader’s view
Step through the page in reading order: “heading level 1, Riya’s Tiffins”, “link, See today’s menu”, “image, a thali with dal…”, “button, Place order”.

### 7. Common mistake: “click here” links
**Wrong:** `<a href="fees.pdf">Click here</a>`. **What happens:** a screen reader listing links hears “click here, click here, click here”. **Fix:** `<a href="fees.pdf">Download the fee list (PDF)</a>`.

### 8. Sort it: accessible or not?
Image with alt describing it → accessible · Input with only a placeholder → not · Button made from a div → not · Link text “Download the timetable” → accessible · Light grey text on white → not · `<html lang="en">` → accessible.

### 9. Quick check
Which helps screen-reader users most on a link? **Text that says where it goes** ✅ · bold text · a title attribute only · making it red.

### 10. Build it: fix this page
**Task:** a broken page with four problems; fix them by tapping in pieces: an alt text, a label, a proper button, and a meaningful link text.
**Checks:** image has alt · input has a label · a real `<button>` · no link says “click here”.

### 11. Recap
- Accessibility means everyone can use the page; correct HTML does most of the work.
- Alt text, labels, heading order, clear links, contrast and keyboard use are the core checks.
- Use real `<button>` and `<a>` elements, never clickable divs.

### 12. Read more
WCAG in plain words, testing with a screen reader (TalkBack on Android), Lighthouse accessibility scores. **Interview:** what is WCAG? Why is a div-button a problem? **Docs:** MDN “Accessibility”, MDN “HTML: a good basis for accessibility”.

---

## Module 12 · The head, metadata and SEO
**Time:** 8 min · **Goals:** I can fill the head with title, description, charset and viewport · I can make link previews look good · I know the basics of SEO

### 1. Hook
When someone shares Riya’s page on WhatsApp, it should show a title, a short description and a photo, not a bare link. When someone searches “tiffin service Kothrud”, the page should show up with a clear title.

### 2. What is the head?
The **`<head>`** holds information *about* the page that isn’t shown in it: the title in the tab and search results, the character set, how it fits on phones, a description, and link-preview details. **SEO (search engine optimisation)** means making a page easy for search engines to understand and show.
- *Animation:* the head’s tags turn into a Google result and a WhatsApp preview card.

### 3. Where is it used in real life?
Every Google search result’s blue title and grey snippet, every link preview on WhatsApp, Instagram and LinkedIn, and every “Add to home screen” icon come from the head.

### 4. How it works
```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Riya’s Tiffins · Home food in Kothrud, Pune</title>
  <meta name="description" content="Fresh veg tiffins delivered by 1 pm. Order on WhatsApp.">
  <meta property="og:image" content="https://example.com/thali.jpg">
  <link rel="icon" href="favicon.png">
</head>
```
- `charset="utf-8"` shows ₹ and Hindi correctly; `viewport` makes the page fit phones.
- A clear `<title>` and `description` help people choose your result.
- `og:` tags (Open Graph) control link previews.

### 5. Try it
Tap to change the title and description and watch a mock Google result and a WhatsApp preview update.

### 6. See it build
Step through the head and watch each tag fill its place: tab title, search result, preview card, favicon.

### 7. Common mistake: no viewport tag
**Wrong:** the head without `<meta name="viewport" …>`. **What happens:** on phones the page is shown zoomed out and tiny. **Fix:** add the viewport tag to every page.

### 8. Match it
`<title>` tab and search-result title · `description` search snippet · `viewport` fits the screen · `charset` shows all characters · `og:image` link-preview picture · `rel="icon"` the tab icon.

### 9. Quick check
What makes a page fit a phone screen? **The viewport meta tag** ✅ · the title · `charset` · `og:image`.

### 10. Build it
**Task:** complete the head: charset, viewport, a descriptive title, a description and a preview image. Gaps for `charset`, `viewport`, `title`, `description`, `og:image`.
**Checks:** all five present · the title is not empty and not just “Home”.

### 11. Recap
- `<head>` describes the page; it isn’t shown in it.
- charset and viewport are needed on every page.
- A clear title, description and og: tags help search and sharing.

### 12. Read more
How search engines read pages, writing good titles and descriptions, sitemaps and robots.txt in brief. **Interview:** what is SEO? What does the viewport tag do? **Docs:** MDN “What’s in the head?”, Google Search Central “SEO starter guide”.

---

## Project · A coaching centre landing page
**Time:** 20 min · **Steps (each with live checks):**
1. **The skeleton:** doctype, head (charset, viewport, title, description) and a semantic body (header, nav, main, footer).
2. **The content:** a main heading, an about section with paragraphs, a course list, and a fee table with a caption.
3. **Contact and enquiry:** a tap-to-call link, a map embed with a title, and an enquiry form with labelled fields (name, phone with pattern, course select) and a submit button.
4. **The accessibility pass:** alt texts, link texts, heading order and a final checklist score.
**Scenario:** “Mr Sharma runs Sharma Classes in Jaipur and wants a page parents can open from a WhatsApp link.” **Learned:** a complete, accessible, phone-friendly page from scratch.
