# HTML · Basic level · content draft (modules 1–3)

**Status:** draft for owner review, 26 Oct 2026. Nothing here is in the app yet. Once approved, each module is built as a Lesson v3 lesson with tests; the remaining 9 Basic modules follow the same shape.

**Every module follows this order:**
1. **Hook**: a real situation the learner will recognise.
2. **What is it?**: the idea from zero, no jargon.
3. **Where it’s used in real life**: apps and sites they already use.
4. **How it works**: the code, explained piece by piece.
5. **Try it**: tap highlighted values and watch the live page change.
6. **See it build**: step through how the browser turns the code into the page.
7. **Common mistake**: wrong code, what goes wrong, the fix.
8. **Match or sort**: a quick, tap-only check.
9. **Quick check**: what does this page show?
10. **Build it**: the task, by tapping pieces into gaps, with a live preview and checks.
11. **Recap**: three “I can…” points.
12. **Read more**: the module notes (summary below each module).

Learner level: Class 9 and up, no coding before. Examples use Indian everyday life. Code is real HTML checked in tests.

---

## Module 1 · What is HTML? Your first web page
**Time:** 8 min · **Goals:** I can say what HTML is and what a browser does · I can write a tag · I can build a complete small page

### 1. Hook
Riya’s mother runs a tiffin service in Pune. Customers keep asking on WhatsApp for the menu and prices. A simple web page with the menu, which anyone can open on their phone, would answer them all. Every web page in the world starts the same way, and today you’ll build one.

### 2. What is HTML?
**HTML (HyperText Markup Language)** is the language that tells a browser **what each part of a page is**: this is a heading, this is a paragraph, this is a picture. It is not a programming language that calculates things; it is a way of **labelling content** so the browser knows how to show it.
- *Animation:* plain text (“Riya’s Tiffins / Dal rice ₹80”) gets labels wrapped round it one by one, `<h1>` and `<p>`, and becomes a styled page.

### 3. Where is it used in real life?
Every website and many apps are built on HTML: the IRCTC booking page, a YouTube video page, your school’s website, the Zomato menu you scroll, even emails from your bank. When you tap “View source” on any page, you see HTML.
- *Interactive card:* tap three familiar screens (a shopping page, a news article, a login form) to see the HTML tags behind each part.

### 4. How it works: tags and the browser
Content goes between an **opening tag** and a **closing tag**: `<p>Dal rice ₹80</p>`. The closing tag has a `/`. When you open a site, your **browser** (Chrome, Safari) asks a **server** for the page, receives the HTML text, and draws it.
```html
<h1>Riya’s Tiffins</h1>
<p>Fresh home food, delivered by 1 pm.</p>
```
- *Animation:* a phone sends a request to a server, the HTML text travels back, and the page appears.

### 5. Try it (live preview)
```html
<h1>Riya’s Tiffins</h1>
<p>Dal rice ₹80</p>
<p>Order on WhatsApp</p>
```
Tap the highlighted values to change them: the shop name (“Riya’s Tiffins” → another name), the price (₹80 → ₹100), and the tag `h1` ↔ `h2` ↔ `p` to see how the heading’s size and meaning change. *Ideas:* What happens to the heading when it becomes a `<p>`?

### 6. See it build
A step-through of what the browser does:
1. Reads `<!DOCTYPE html>`: “this is a modern HTML page”.
2. Opens `<html>`: the whole page starts.
3. `<head>`: information about the page; the `<title>` shows in the tab.
4. `<body>`: everything you see. The `<h1>` box appears, then each `<p>` box below it.
Each step highlights the line of code and the box that appears in the preview.

**The complete page:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Riya’s Tiffins</title>
  </head>
  <body>
    <h1>Riya’s Tiffins</h1>
    <p>Dal rice ₹80</p>
  </body>
</html>
```

### 7. Common mistake: forgetting the closing tag
**Wrong:** `<h1>Riya’s Tiffins` (no `</h1>`), then `<p>Dal rice ₹80</p>`.
**What happens:** the browser thinks the heading never ends, so the price shows up huge, like part of the heading.
**Fix:** `<h1>Riya’s Tiffins</h1>`. *Why:* the closing tag tells the browser where the heading stops.

### 8. Sort it: what goes in `<head>` and what goes in `<body>`?
| Item | Goes in |
|---|---|
| The page title in the browser tab | head |
| The menu heading | body |
| A paragraph about delivery times | body |
| Information for search engines | head |
| A photo of the thali | body |
| The character set (`<meta charset="utf-8">`) | head |

### 9. Quick check
What does this page show?
```html
<h1>Menu</h1>
<p>Poha ₹30</p>
```
**Options:** A big heading “Menu” with “Poha ₹30” below it ✅ · The text `<h1>Menu</h1>` exactly as typed · Only “Poha ₹30” · An error message.
*Explanation:* tags are instructions; the browser shows the content, not the tags.

### 10. Build it: Riya’s menu page
**Task:** finish the page so it has the title “Riya’s Tiffins” in the tab, a main heading, and two menu lines.
The learner taps the missing pieces into gaps: `title`, `h1`, `</h1>`, `p`, `body`. *Word bank adds* `h6`, `head`, `div`, `br` as believable wrong choices.
**Checks (live):** the tab title says Riya’s Tiffins · there is exactly one `<h1>` · there are two paragraphs · everything visible is inside `<body>`.

### 11. Recap
- HTML labels content so the browser knows what each part is.
- A tag has an opening and a closing part: `<p>…</p>`.
- A page has `<!DOCTYPE html>`, `<html>`, `<head>` (about the page) and `<body>` (what you see).

### 12. Read more (module notes)
- **What HTML is, really:** markup versus programming; HTML, CSS and JavaScript as structure, looks and behaviour.
- **What happens when you open a site:** URL → request → server → HTML → the browser builds the page.
- **Worked example:** the full menu page, line by line.
- **In industry:** front-end developers write HTML in every project; search engines and screen readers rely on correct tags.
- **Interview questions:** What is the difference between HTML and CSS? Why do we need `<!DOCTYPE html>`? What goes in `<head>`?
- **Cheat sheet:** `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<body>`, `<h1>`, `<p>`.
- **Official docs:** MDN “Getting started with HTML”, MDN “What is HTML?”.

---

## Module 2 · Headings, paragraphs and text
**Time:** 8 min · **Goals:** I can use headings h1–h6 as an outline · I can write paragraphs and line breaks correctly · I can mark text as important or stressed

### 1. Hook
A school notice board is easy to read because it has a big title, smaller section titles and short paragraphs. A web page works the same way. Students, Google, and people who use screen readers all rely on that structure to find what they need.

### 2. What are headings and paragraphs?
**Headings** are titles for the page and its sections. HTML has six sizes, from `<h1>` (most important) to `<h6>`. **Paragraphs** (`<p>`) hold blocks of normal text. Together they form an **outline**, like a book’s chapters and sub-chapters.
- *Animation:* a page collapses into its outline (h1 → h2 → h3), like a table of contents.

### 3. Where is it used in real life?
- News sites: the headline is the h1, each section is an h2.
- Google uses headings to understand what a page is about, and shows them in search results.
- Blind users’ screen readers let them jump from heading to heading, like skipping through chapters.

### 4. How it works
- One `<h1>` per page (the main title), then `<h2>` for sections and `<h3>` inside them. Don’t skip levels just to get a smaller size; size is styling, which CSS handles.
- `<p>` for each paragraph. The browser ignores extra spaces and new lines in your code; use `<br>` only for a real line break, like in an address.
- `<strong>` means **important**, `<em>` means *stressed* (the way you’d say it). They change meaning, not just looks.
```html
<h1>Annual Day 2026</h1>
<h2>Timings</h2>
<p>Gates open at <strong>5 pm</strong>. Please <em>don’t</em> be late.</p>
```

### 5. Try it (live preview)
A school notice. Tap to change: the heading level (`h2` ↔ `h3`), the time (5 pm → 6 pm), and `strong` ↔ `em` to see how emphasis changes.

### 6. See it build: the page outline
Step through a notice and watch the outline panel fill: h1 “Annual Day 2026” → h2 “Timings” → h2 “Dress code” → h3 “Juniors”. A wrong level (an h4 straight after an h1) flashes as a gap in the outline.

### 7. Common mistake: using headings for size
**Wrong:** `<h4>Important: fees due Friday</h4>` in the middle of a paragraph, just to make the text bold and small.
**What happens:** screen readers and Google think a new section has started, so the outline breaks.
**Fix:** `<p><strong>Important:</strong> fees due Friday.</p>`. *Why:* headings are for structure; `<strong>` is for importance.

### 8. Match it
| Tag | Meaning |
|---|---|
| `<h1>` | the main title of the page |
| `<h2>` | a section title |
| `<p>` | a paragraph |
| `<strong>` | important text |
| `<em>` | stressed text |
| `<br>` | a line break inside text |

### 9. Quick check
How many `<h1>` headings should a normal page have? **Options:** One ✅ · As many as you like · None · One per paragraph.

### 10. Build it: an exam notice
**Task:** build a notice with one main heading, two section headings, a paragraph under each, and the exam date marked important.
Gaps for `h1`, `h2`, `p`, `strong`; word bank adds `h4`, `em`, `br`, `b`.
**Checks:** one `<h1>` · two `<h2>` · at least two paragraphs · the date is inside `<strong>`.

### 11. Recap
- Headings h1–h6 form the page’s outline: one h1, then levels in order.
- `<p>` for paragraphs; `<br>` only for real line breaks.
- `<strong>` means important, `<em>` means stressed.

### 12. Read more
- **Why structure matters:** search engines, screen readers, and reading on a small screen.
- **Worked example:** a full school notice, line by line, with its outline.
- **In industry:** accessibility audits check the heading order first; good structure improves search ranking.
- **Interview questions:** Why only one h1? What is the difference between `<strong>` and `<b>`? When is `<br>` the right choice?
- **Cheat sheet:** `<h1>`–`<h6>`, `<p>`, `<br>`, `<strong>`, `<em>`, `<hr>`.
- **Official docs:** MDN “Headings and paragraphs”, MDN `<strong>` element.

---

## Module 3 · Links and images
**Time:** 9 min · **Goals:** I can link to other pages and sites · I can show an image with a useful description · I can choose relative or full addresses

### 1. Hook
Riya’s tiffin page needs a “Call us” link, a link to her menu page and a photo of the thali, so customers can see what they’re ordering. Links are what make the web a *web*: every page connects to others.

### 2. What are links and images?
A **link** (`<a>`, for “anchor”) is text you can tap to go somewhere else: another page, another site, a phone number or an email. An **image** (`<img>`) shows a picture from a file or a web address. Both use **attributes**: extra information inside the opening tag, like `href="…"` and `src="…"`.
- *Animation:* tapping a link moves along a line to another page card; an image box fills with the picture.

### 3. Where is it used in real life?
- Every menu, button-like text and “Read more” on news sites is a link.
- Product photos on shopping sites are `<img>` tags.
- `tel:` and `mailto:` links let you tap to call or email, which is common on business pages in India.
- The `alt` text on images is read aloud to blind users and shown if the image fails to load on slow internet.

### 4. How it works
```html
<a href="menu.html">See today’s menu</a>
<a href="https://www.irctc.co.in">Book a train</a>
<a href="tel:+919800000000">Call us</a>
<img src="thali.jpg" alt="A thali with dal, rice, roti and sabzi">
```
- `href` is where the link goes. `menu.html` is a **relative** address (a page next to this one); `https://…` is a **full** address (another site).
- `<img>` has no closing tag. `src` is the picture file; `alt` describes it in words.
- `target="_blank"` opens a new tab; use it only when it really helps, like a PDF.

### 5. Try it (live preview)
Tap to change: the link text, the link type (`menu.html` ↔ `tel:` ↔ `mailto:`), and the image `alt` text, then switch the image off to see the alt text appear in its place.

### 6. See it build: following a link
Step through: tap the link → the browser reads `href` → relative or full? → it requests the new page → the new page appears. For the image: the browser reads `src`, downloads the file, and draws it; if the download fails, it shows the `alt` text instead.

### 7. Common mistake: missing or useless alt text
**Wrong:** `<img src="thali.jpg">` or `alt="image"`.
**What happens:** a screen reader says “image” (or the file name), and on a slow connection the customer sees a broken box with no idea what it was.
**Fix:** `alt="A thali with dal, rice, roti and sabzi"`. *Why:* alt text should say what the picture shows and why it’s there.

### 8. Sort it: relative or full address?
| Address | Type |
|---|---|
| `menu.html` | relative |
| `https://www.google.com` | full |
| `images/thali.jpg` | relative |
| `https://maps.google.com/?q=Pune` | full |
| `../index.html` | relative |
| `https://wa.me/919800000000` | full |

### 9. Quick check
Which tag shows an image? **Options:** `<img src="thali.jpg" alt="Thali">` ✅ · `<image href="thali.jpg">` · `<a src="thali.jpg">` · `<picture="thali.jpg">`.

### 10. Build it: contact section
**Task:** add a link to `menu.html`, a tap-to-call link, and a photo with a good alt text.
Gaps for `href`, `tel:`, `src`, `alt`; word bank adds `link`, `call:`, `href` in the wrong place, `title`.
**Checks:** a link to menu.html · a `tel:` link · an image with a non-empty alt that isn’t just “image”.

### 11. Recap
- `<a href="…">` makes a link; relative addresses link within your site, full ones go to other sites.
- `<img src="…" alt="…">` shows an image, and alt describes it.
- `tel:` and `mailto:` links call or email with one tap.

### 12. Read more
- **How addresses work:** URLs, folders, `../`, and why relative links keep working when a site moves.
- **Worked example:** the tiffin contact section, line by line.
- **In industry:** image sizes and alt text are checked in performance and accessibility reviews; broken links are found automatically by tools.
- **Interview questions:** Relative versus absolute URLs? What is alt text for? When should a link open in a new tab?
- **Cheat sheet:** `<a href>`, `tel:`, `mailto:`, `target="_blank"`, `<img src alt>`, `width`/`height`.
- **Official docs:** MDN “Creating hyperlinks”, MDN `<img>` element.

---

### New pieces this needs in the app (built when the draft is approved)
- **HTML animations:** tags wrapping content, the request → server → page journey, the outline, a link travelling to a page, an image loading (or falling back to alt text).
- **“See it build” for HTML:** a step-through that highlights a line of HTML and the box it creates in the preview (the HTML version of watch-it-run).
- The rest already exists: tap-to-change try-its with a live preview, match, sort, quick checks, tap-to-build page tasks with live checks, and module notes.
