# HTML · Basic · upgrade to Lesson v4 (draft)

**Status:** draft for owner review (28 Oct 2026). HTML Basic is already built in the v3 format you approved (cards, See it build, mistakes, Sharma Classes project). This draft **upgrades** each module to v4 instead of rewriting it: the approved cards, pages and final builds stay. Module ids stay, so progress is kept. CSS and JavaScript follow the same way, one draft each, after this one.

## What changes in every module

| v3 screen (kept content) | v4 version | New content |
|---|---|---|
| Hook (a story) | **Guess first**: the story in one line, a tiny page, “what will it show?” | 1 question |
| 3 learn cards | Same cards, **each ends in a one-tap check** | 3 checks |
| Try it (a page to look at) | **Tap a tag or value to swap it**, with **2 targets** that tick | 2 targets |
| See it build | Same walk-through, plus **one pause question** (“line 3 is next: what appears?”) | 1 question |
| Common mistake | **Spot the bug**: what you see, then tap the broken line | a one-line bug |
| Sort/match, quick check, build the page | Same, with v4 feedback (hint first, then the answer) | – |
| – | **Recall cards** | 3 cards |

**One new piece of engineering:** HTML pages have no numbers or colours to tap, so today Try it in 11 of 12 HTML modules has **nothing tappable**. I’ll let learners tap **tags and attribute values** to swap them within safe families: `h1…h6`, `ul ↔ ol`, `strong ↔ em`, `th ↔ td`, `div ↔ section ↔ article ↔ aside`, input `type` (text, tel, email, number, password, date), and `controls`/`autoplay`. Targets are checked on the page’s code, and tests make sure every target can be reached.

**No Hindi words:** the HTML lessons still say dal rice, rajma chawal, poha, roti, sabzi and thali. They become **rice and lentils, bean curry and rice, flattened rice, flatbread, vegetables, meal plate**. “Riya’s Tiffins” stays (tiffin is an English word for a packed meal) unless you’d rather rename it.

---

## 1 · What is HTML? (`w-html-1`)
- **Guess:** `<h1>Riya’s Tiffins</h1>` `<p>Rice and lentils ₹80</p>`: what does the page show? **A big heading, then a normal line** · the code as typed · only the heading · nothing
- **Checks:** What does HTML do? → **labels each part of a page** (not calculate, not store, not colour) · Which sites use HTML? → **every website** · Which is a closing tag? → **`</p>`**
- **Try targets:** make the title smaller (an `h2`) · make one price line a heading (`h3`)
- **Build pause:** before `<p>` lines: what appears next? → **a normal line of text under the heading**
- **Bug:** `<h1>Riya’s Tiffins` (no closing tag): the price shows huge and bold → fix `<h1>Riya’s Tiffins</h1>`
- **Recall:** what HTML does · opening vs closing tag · what the browser does with HTML

## 2 · Headings, paragraphs and text (`h-text`)
- **Guess:** `<h1>Annual Day</h1><h2>Timings</h2>`: which looks biggest? **Annual Day**
- **Checks:** how many heading sizes? → **6 (h1–h6)** · who reads headings to understand a page? → **Google and screen readers** · `<strong>` means? → **important**
- **Try targets:** make “Dress code” an `h3` under Timings · make “please” important (`strong`)
- **Build pause:** “the h2 is next: where does it sit in the outline?” → **a section under the h1**
- **Bug:** `<h4>Important: fees due Friday</h4>` used for small bold text → fix `<p><strong>Important:</strong> fees due Friday.</p>`
- **Recall:** one h1 per page · don’t skip levels · strong vs em

## 3 · Links and images (`w-html-2`)
- **Guess:** `<a href="menu.html">See the menu</a>`: what happens when you tap it? **It opens menu.html**
- **Checks:** which attribute says where a link goes? → **href** · alt text is for? → **people who can’t see the image, and slow internet** · which is a full address? → **`https://www.irctc.co.in`**
- **Try targets:** make the phone link a call link (`tel:`) · … (link and image values)
- **Build pause:** before the `<img>`: what shows if the picture fails to load? → **the alt text**
- **Bug:** `<img src="plate.jpg" alt="image">` → fix `alt="A meal plate with rice, lentils, flatbread and vegetables"`
- **Recall:** href vs src · why alt text · relative vs full address

## 4 · Attributes, ids and classes (`h-attr-1`)
- **Guess:** `<p class="price">` twice and `#note` once: which can be shared by many elements? **class**
- **Checks:** how is an attribute written? → **`name="value"` in the opening tag** · CSS finds an id with? → **`#fees`** · several classes on one element? → **separated by spaces**
- **Try targets (colours already tappable):** make the highlight orange · make the note red
- **Build pause:** “`.price` is next: which lines turn bold?” → **both prices**
- **Bug:** two elements with `id="price"` → fix the second to `class="price"` (and the first)
- **Recall:** id vs class · how CSS finds each · data- attributes

## 5 · Lists (`h-list-1`)
- **Guess:** `<ol><li>Wash</li><li>Fry</li></ol>`: what shows? **1. Wash 2. Fry**
- **Checks:** bullets come from? → **`ul`** · each item goes in? → **`li`** · a sub-list goes? → **inside an `li`**
- **Try targets:** make the ingredients numbered (`ol`) · make the steps bullets (`ul`)
- **Build pause:** “the inner `ul` is next: where does it appear?” → **indented under New Delhi**
- **Bug:** `<ul>Flattened rice Onion Salt</ul>` → fix by putting each item in `<li>`
- **Recall:** ul vs ol · li · nesting

## 6 · Tables (`h-table-1`)
- **Guess:** a 2-row table: what is “Maths” in `<th>Maths</th>`? **a column heading**
- **Checks:** a row is? → **`tr`** · header cell? → **`th`** · use tables for? → **data, not page layout**
- **Try targets:** make “Asha” a row header (`th`) · stretch a cell across 2 columns (`colspan`)
- **Build pause:** “the second `tr` is next: what appears?” → **a new row under the headers**
- **Bug:** header written with `td` → fix with `th`
- **Recall:** tr / th / td · caption · tables for data only

## 7 · Forms and inputs (`h-form-1`)
- **Guess:** `<label for="name">` + `<input id="name">`: tap the label, what happens? **the cursor goes into the box**
- **Checks:** which tag sends the form? → **`button`** · `type="tel"` changes? → **the phone keyboard to numbers** · `name` is? → **the key sent with the value**
- **Try targets:** make the phone field show the number keyboard (`tel`) · make a field for email (`email`)
- **Build pause:** “the label is next: what does it do?” → **names the box and focuses it when tapped**
- **Bug:** a placeholder instead of a label (`<input placeholder="Name">`) → fix with `<label for="name">Name</label>`
- **Recall:** label + for + id · type · name

## 8 · Choices and validation (`h-inputs-1`)
- **Guess:** two radio buttons with the same name: how many can be chosen? **one**
- **Checks:** pick any number of options? → **checkboxes** · `required` does? → **blocks an empty field** · do browser checks replace server checks? → **no**
- **Try targets:** make seats required · make the meal choice a checkbox
- **Build pause:** “`pattern` is next: what does it check?” → **the format, like 10 digits**
- **Bug:** radios named `class1` and `class2` → fix both to `name="class"`
- **Recall:** radio vs checkbox · required / pattern · why the server checks too

## 9 · Semantic page layout (`h-sem-1`)
- **Guess:** `<nav>` vs `<div class="menu">`: which tells a screen reader “this is navigation”? **nav**
- **Checks:** how many `main` per page? → **one** · a blog post in its own box? → **`article`** · is div still OK? → **yes, for styling when nothing else fits**
- **Try targets:** make the side note an `aside` · make the menu a `nav`
- **Build pause:** “`<main>` is next: what is it for?” → **the page’s own content**
- **Bug:** `<div class="header">` → fix `<header>`
- **Recall:** semantic means? · main/section/article/aside · who uses landmarks

## 10 · Audio, video and SVG (`h-media`)
- **Guess:** `<video src="welcome.mp4" controls>`: what appears? **a video with play and pause**
- **Checks:** show play/pause? → **`controls`** · stays sharp at any size? → **SVG** · every iframe needs? → **a title**
- **Try targets (colours and shapes):** make the circle blue · make the square orange
- **Build pause:** “`poster` is next: when does it show?” → **before the video plays**
- **Bug:** `<video src="ad.mp4" autoplay>` → fix `controls poster="cover.jpg"`
- **Recall:** controls · why not autoplay with sound · why SVG for icons

## 11 · Accessible pages (`h-a11y-1`)
- **Guess:** a link that says “Click here”: what does a screen reader user hear? **“Click here”, with no idea where it goes**
- **Checks:** who benefits from captions? → **everyone, e.g. on a noisy train** · actions should use? → **`button`, not a clickable div** · `<html lang="en">` helps? → **screen readers pronounce the page right**
- **Try targets:** turn the clickable div into a button · give the image real alt text
- **Build pause:** “the button is next: what does a screen reader say?” → **“Order now, button”**
- **Bug:** `<a href="menu.pdf">Click here</a>` → fix `Download the menu (PDF)`
- **Recall:** the core checks · why buttons not divs · what a11y means

## 12 · The head, metadata and SEO (`h-head-1`)
- **Guess:** `<title>Riya’s Tiffins</title>`: where do you see it? **in the browser tab and Google results**
- **Checks:** the viewport tag does? → **makes the page fit phones** · WhatsApp previews come from? → **og: tags** · charset utf-8 is for? → **showing ₹ and other symbols correctly**
- **Try targets:** a clearer title · add a description
- **Build pause:** “the description is next: where will it show?” → **under the title in search results**
- **Bug:** no viewport tag → add `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Recall:** what goes in the head · viewport · title and description for SEO

## Project · Sharma Classes landing page (`h-project`)
Already four checked page-building steps. v4 adds a **“plan it” match** (which tag for which part), the v4 feedback, and **recall cards**. Its first screen stays Mr Sharma’s brief.

## Questions for the owner
1. OK to upgrade HTML this way (keep the approved cards and pages, add the v4 pieces)?
2. OK to build tappable tags and attribute values for HTML Try it?
3. Keep “Riya’s Tiffins” as the name (tiffin is English), or rename it?
