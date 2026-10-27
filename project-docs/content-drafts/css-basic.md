# CSS · Basic level · content draft (modules 1–12 and the project)

**Status:** draft for owner review, 27 Oct 2026. Nothing here is in the app yet. Once approved, each module is built as a Lesson v3 lesson with tests and module notes. Module ids stay the same, so learners keep their progress.

**Same order as HTML (approved format):** Hook → What is it? → Where it’s used → How it works → Try it (tap values, live page) → See it build → Common mistake → Sort or match → Quick check → Build it (tap pieces into gaps, live checks) → Recap → Read more (notes).

**See it build, for CSS:** the HTML stays the same and the CSS is added **one rule at a time**. Each tap highlights the rule and the live page restyles, so the learner sees exactly what each line did.

**Story thread:** the learner styles the pages they built in HTML: **Riya’s Tiffins** (Pune) in the modules, and **Sharma Classes** (Jaipur) in the project. The plain HTML page becomes a polished, phone-friendly site by the end of the level.

**New animations (5):** the cascade (rules stacking up, the later one winning) · the specificity scoreboard · box-model layers peeling apart · the flex axis (items sliding along a line) · grid tracks filling in.

Learner level: Class 9 and up, has done HTML Basic. All CSS is real and checked in tests (starter fails the checks, solution passes).

---

## Module 1 · What is CSS? Your first styles
**Time:** 8 min · **Goals:** I can say what CSS does · I can write a rule · I can link a stylesheet to a page

1. **Hook:** Riya’s menu page works, but it’s plain black text on white, like a form from 1995. Customers judge a business in seconds. Today the same page gets colours, a nicer font and space to breathe, without changing a word of the HTML.
2. **What is CSS?** CSS (Cascading Style Sheets) is the language that decides **how a page looks**: colours, fonts, sizes, spacing and layout. HTML says *what* things are; CSS says *how they look*.
   - *Animation:* the plain menu page; style rules drop in one by one and it transforms.
3. **Where it’s used:** every website you use: Zomato’s red, Swiggy’s orange, Instagram’s layout, dark mode in apps. Change the CSS and the same HTML can look completely different; that’s how one site has both a light and a dark theme.
4. **How it works:** a **rule** = a **selector** (what to style) + **declarations** in `{ }` (property: value;).
   ```css
   h1 { color: #E8590C; }
   p  { font-size: 18px; line-height: 1.5; }
   ```
   CSS lives in its own file, linked from the head: `<link rel="stylesheet" href="style.css">`. **Cascade:** if two rules set the same thing, the later one wins (more on this in module 2).
   - *Animation:* the cascade: two rules for `h1` stack up; the later colour wins.
5. **Try it:** Riya’s page with a short stylesheet. Tap values: the heading colour, the font size (16px → 20px), the background colour. *Ideas:* What changes when you make the background dark? Is the text still readable?
6. **See it build:** add rules one by one to the plain page: `body` background → `h1` colour → `p` font size → `body` font-family. Each tap restyles the live page.
7. **Common mistake:** missing semicolon. `h1 { color: orange font-size: 32px; }` → *both* declarations are ignored, because the browser reads it as one broken value. **Fix:** a `;` after every declaration.
8. **Match:** selector · property · value · declaration · rule → each to its part of `h1 { color: orange; }`.
9. **Quick check:** `p { color: green; } p { color: red; }`: what colour are paragraphs? **Red** ✅ (the later rule wins) · Green · Both · Black.
10. **Build it:** style Riya’s page: gaps for `color`, `background`, `font-family`, `;`, `}`. Wrong pieces in the bank: `colour`, `font`, `:`. **Checks:** the h1 has a colour · the body has a background · paragraphs have a font-size.
11. **Recap:** CSS controls how a page looks · a rule is selector { property: value; } · later rules win when they clash.
12. **Read more:** what “cascading” means · three ways to add CSS (file, `<style>`, inline) and why a file is best · worked example · in industry (design teams, style guides) · interview: HTML vs CSS? what is the cascade? why external stylesheets? · cheat sheet · MDN “CSS first steps”, “What is CSS?”.

---

## Module 2 · Selectors and specificity
**Time:** 8 min · **Goals:** I can pick elements by tag, class, id and position in the page · I can tell which rule wins when two clash

1. **Hook:** Riya wants *only* the prices orange, not every paragraph. And one special “Today’s offer” line in green. You need ways to point at exactly the right elements.
2. **What are selectors?** A selector is the “who” of a rule. `p` picks every paragraph, `.price` picks everything with `class="price"`, `#offer` picks the one element with `id="offer"`, and `.menu p` picks paragraphs *inside* `.menu`.
3. **Where they’re used:** every button style, every highlighted search result, the red border on a wrong form field. Big sites style thousands of elements with a few hundred classes.
4. **How it works / specificity:** when rules clash, the **more specific** selector wins, whatever the order: **id (1-0-0) beats class (0-1-0) beats tag (0-0-1)**. Only when they’re equal does the later rule win.
   ```css
   p      { color: black; }   /* 0-0-1 */
   .price { color: orange; }  /* 0-1-0 wins over p */
   #offer { color: green; }   /* 1-0-0 wins over both */
   ```
   - *Animation:* the specificity scoreboard: each selector’s score appears; the highest wins.
5. **Try it:** a menu with prices and an offer line. Tap selectors (`p` ↔ `.price` ↔ `#offer`) and colours. *Ideas:* Why doesn’t the offer turn orange?
6. **See it build:** `p` rule → `.price` rule (prices change, other paragraphs don’t) → `#offer` rule → `.menu p` rule.
7. **Common mistake:** `price { color: orange; }`: forgetting the dot, so the browser looks for a `<price>` tag and nothing changes. **Fix:** `.price`. Also: reaching for `!important` to win a fight; use a class instead.
8. **Sort:** order by strength: `p` · `.price` · `.menu .price` · `#offer`.
9. **Quick check:** `.price { color: orange; }` then `p { color: blue; }`. A `<p class="price">` is… **orange** ✅ (class beats tag, even though `p` comes later).
10. **Build it:** make the prices bold and orange, the offer green: gaps `.price`, `#offer`, `font-weight`. Bank: `price`, `.offer`, `#price`. **Checks:** a `.price` rule with a colour · an `#offer` rule · no `!important`.
11. **Recap:** tag, .class, #id and descendant selectors · id beats class beats tag · prefer classes, avoid `!important`.
12. **Read more:** the specificity score explained · grouping (`h1, h2`) · in industry (class naming like BEM, preview of Advanced) · interview: what is specificity? class vs id for styling? why avoid `!important`? · MDN “CSS selectors”, “Specificity”.

---

## Module 3 · Colours, units and sizes
**Time:** 8 min · **Goals:** I can write colours as hex, rgb and hsl · I can choose px, rem, % or vw · I can keep sizes sensible on any screen

1. **Hook:** Riya’s brand colour is a warm saffron. On her friend’s old phone the text looks tiny, and on a tablet the page stretches edge to edge. Colours and sizes need to work everywhere.
2. **What are they?** Colours can be names (`orange`), hex (`#E8590C`), `rgb(232 89 12)` or `hsl(24 90% 48%)`, and can be see-through (`rgb(0 0 0 / 50%)`). Units: **px** is fixed, **rem** follows the user’s text-size setting, **%** is a share of the parent, **vw** a share of the screen width.
3. **Where they’re used:** every brand has exact colour codes (Swiggy’s orange, Paytm’s blue). Phones let people set larger text; sites using rem respect it. News sites cap their line width so text doesn’t stretch on big screens.
4. **How it works:**
   ```css
   body  { font-size: 1rem; color: #1F2933; }
   .page { max-width: 40rem; margin: 0 auto; }
   h1    { font-size: clamp(1.75rem, 5vw, 3rem); }
   ```
   `max-width` stops a box getting too wide; `clamp(min, preferred, max)` grows with the screen but stays within limits.
5. **Try it:** tap the brand colour (hex values), the max-width (30rem ↔ 60rem) and the h1 clamp. *Ideas:* What does a very wide max-width do on a tablet?
6. **See it build:** text colour → page max-width (the column narrows and centres) → h1 with clamp → a see-through background on the offer.
7. **Common mistake:** a missing unit: `width: 300;` is ignored. **Fix:** `width: 300px;` (only `0` can skip the unit). Also: light grey text on white fails contrast.
8. **Match:** `px` → fixed size · `rem` → follows text-size setting · `%` → share of parent · `vw` → share of screen width · `#E8590C` → a hex colour.
9. **Quick check:** which unit respects a user who sets large text on their phone? **rem** ✅ · px · vw · cm.
10. **Build it:** give the page a max-width of 40rem centred, body text 1rem, the brand colour on the heading. Bank includes `40`, `px`, `colour`. **Checks:** `.page` has a `max-width` in rem and `margin: 0 auto` · the h1 has a hex colour.
11. **Recap:** hex, rgb and hsl colours · px fixed, rem follows the user · max-width and clamp keep sizes sensible.
12. **Read more:** colour contrast and why it matters (4.5 : 1) · when to use which unit · interview: rem vs em vs px? what does clamp() do? · MDN “Values and units”, “Color”.

---

## Module 4 · Typography
**Time:** 7 min · **Goals:** I can set fonts with fallbacks · I can make text easy to read · I can use weight, alignment and spacing

1. **Hook:** People read menus and fee lists on small phone screens, often in the sun. Good typography is the difference between “easy to read” and “I gave up”.
2. **What is it?** Typography is how text looks: the font (`font-family`), size, weight (bold), line spacing (`line-height`), alignment and letter spacing.
3. **Where it’s used:** news apps tune line height and width for long reading; apps like Zomato use one font family everywhere for a consistent brand; Google Fonts serves fonts to millions of sites, including Hindi ones like Mukta.
4. **How it works:**
   ```css
   body { font-family: "Poppins", system-ui, sans-serif; line-height: 1.5; }
   h1   { font-weight: 700; letter-spacing: -0.01em; }
   .page { max-width: 65ch; }
   ```
   Always end with a fallback (`sans-serif`). `line-height: 1.5` and lines of about 45–75 characters (`65ch`) read best. Web fonts cost download time, so use one or two.
5. **Try it:** tap the font (serif ↔ sans-serif ↔ monospace), line-height (1 ↔ 1.5 ↔ 2), weight and text-align.
6. **See it build:** font-family → line-height (paragraphs open up) → heading weight → max-width in ch.
7. **Common mistake:** `font-family: Poppins;` with no fallback: if the font fails to load, the browser’s default serif appears. **Fix:** `"Poppins", sans-serif`.
8. **Sort:** easy to read vs hard to read: line-height 1.5 ✅ · all caps paragraphs ✗ · justified text on a phone ✗ · 16px+ body text ✅ · 120-character lines ✗ · one font family ✅.
9. **Quick check:** what does `sans-serif` at the end of a font list do? **It is the fallback if the others aren’t available** ✅.
10. **Build it:** set a font stack with a fallback, line-height 1.5 and a bold heading. **Checks:** font-family ends in a generic family · line-height between 1.4 and 1.8 · h1 has font-weight.
11. **Recap:** fonts with fallbacks · line-height ~1.5 and short lines · weight, alignment and spacing.
12. **Read more:** loading web fonts (Google Fonts, `font-display: swap`) · Indian-language fonts · interview: what is a font stack? why is unitless line-height preferred? · MDN “Fundamental text and font styling”, “Web fonts”.

---

## Module 5 · The box model
**Time:** 8 min · **Goals:** I can explain content, padding, border and margin · I can use box-sizing: border-box · I can tell block from inline

1. **Hook:** Riya’s menu items are squashed together, and the “Order” button text touches its edges. Every spacing problem on the web comes down to one idea: boxes.
2. **What is it?** Every element is a rectangle with four layers: **content**, **padding** (space inside the border), **border**, and **margin** (space outside, pushing other boxes away).
   - *Animation:* box-model layers peel apart, labelled, then snap back.
3. **Where it’s used:** cards on Flipkart, chat bubbles in WhatsApp Web, buttons everywhere: all padding, border and margin. Browser DevTools show this exact diagram for any element.
4. **How it works:**
   ```css
   * { box-sizing: border-box; }
   .card { width: 300px; padding: 16px; border: 2px solid #E8590C; margin-bottom: 24px; }
   ```
   With `border-box`, the width **includes** padding and border, so the card is exactly 300px wide. Block elements (`div`, `p`, `h1`) stack and fill the width; inline ones (`a`, `strong`, `span`) flow within a line.
5. **Try it:** tap padding, border width and margin values on a menu card and watch the layers change.
6. **See it build:** border → padding (the text moves away from the border) → margin (the next card moves away) → box-sizing (the card stops growing).
7. **Common mistake:** `width: 300px; padding: 20px;` without border-box → the card is 340px wide and overflows on a 320px phone. **Fix:** `box-sizing: border-box`.
8. **Match:** content → the text or image · padding → space inside the border · border → the line around · margin → space outside.
9. **Quick check:** with `box-sizing: border-box`, `width: 200px; padding: 20px;` is how wide? **200px** ✅ · 240px · 220px · 160px.
10. **Build it:** style `.card` with padding, a border and a bottom margin, plus the border-box rule. **Checks:** `box-sizing: border-box` · `.card` has padding, border and margin.
11. **Recap:** content, padding, border, margin · border-box makes width include padding and border · block stacks, inline flows.
12. **Read more:** margin collapsing · shorthand (`padding: 8px 16px`) · DevTools box view · interview: padding vs margin? what does border-box do? · MDN “The box model”.

---

## Module 6 · Flexbox
**Time:** 9 min · **Goals:** I can line items up in a row or column · I can space and align them · I can let them wrap

1. **Hook:** Riya wants her logo on the left and her menu links on the right, all lined up neatly, on any screen. For years this was hard. Flexbox made it one line.
2. **What is it?** `display: flex` on a parent lines its children up along a line (a row by default). You control how they spread out along it and how they line up across it.
   - *Animation:* the flex axis: items slide along the main axis as justify-content changes.
3. **Where it’s used:** almost every navigation bar, button group, chat message row and card footer. Instagram’s top bar (logo left, icons right) is a flex row.
4. **How it works:**
   ```css
   .top { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
   .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
   ```
   `justify-content` spaces items **along** the line; `align-items` aligns them **across** it; `gap` sets the space between; `flex-direction: column` stacks them; `flex-wrap: wrap` lets them flow to the next line.
5. **Try it:** a header with a logo and three links. Tap justify-content (start ↔ center ↔ space-between), align-items, gap and flex-direction.
6. **See it build:** `display: flex` (items jump into a row) → space-between → align-items center → gap → wrap on the tag list.
7. **Common mistake:** putting `display: flex` on the **children** instead of the parent → nothing lines up. **Fix:** flex goes on the container.
8. **Match:** justify-content → along the line · align-items → across the line · gap → space between items · flex-wrap → move to the next line · flex-direction → row or column.
9. **Quick check:** logo left, links right? **justify-content: space-between** ✅ · align-items: center · text-align: right · float: right.
10. **Build it:** make Riya’s header a flex row with the logo left and links right, vertically centred, with a gap. **Checks:** `.top` has `display: flex` · `justify-content: space-between` · `align-items: center` · a gap.
11. **Recap:** flex on the parent · justify-content along, align-items across · gap and wrap.
12. **Read more:** main axis vs cross axis · `flex: 1` to grow · centring anything · interview: how do you centre a div? justify-content vs align-items? · MDN “Flexbox”.

---

## Module 7 · CSS Grid
**Time:** 9 min · **Goals:** I can make rows and columns · I can use fr units · I can make a grid that adapts to any screen without media queries

1. **Hook:** Riya’s menu has 8 dishes. On a phone they should be one per row; on a tablet, two or three side by side, all the same width. Grid does this in a single line.
2. **What is it?** `display: grid` on a parent arranges its children in **rows and columns**. You describe the columns, and the browser places the items.
   - *Animation:* grid tracks: column lines appear, then cards fill the cells.
3. **Where it’s used:** product listings on Amazon, photo galleries, YouTube’s video grid, dashboards. Whole page layouts (header, sidebar, content) use grid too.
4. **How it works:**
   ```css
   .menu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
   .menu { grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); }
   ```
   `1fr` is one share of the free space, so `repeat(3, 1fr)` makes three equal columns. `auto-fill` with `minmax` fits as many columns of at least 10rem as there’s room for.
5. **Try it:** 6 dish cards. Tap the column count, fr values (`1fr 2fr`) and the minmax size; resize hint: “imagine a wider screen”.
6. **See it build:** `display: grid` → three equal columns → gap → the auto-fill version.
7. **Common mistake:** `grid-template-columns: 300px 300px 300px;` → overflows on phones. **Fix:** `repeat(auto-fill, minmax(10rem, 1fr))`.
8. **Sort:** Flexbox or Grid? a nav bar (flex) · a photo gallery (grid) · a row of buttons (flex) · a product listing (grid) · logo + links (flex) · a page layout with rows and columns (grid).
9. **Quick check:** what does `repeat(3, 1fr)` make? **Three equal columns** ✅.
10. **Build it:** make the dish list a responsive grid with a gap. **Checks:** `.menu` has `display: grid` · uses `repeat(auto-fill` or `auto-fit` with `minmax` · a gap.
11. **Recap:** grid for rows and columns · fr shares the space · auto-fill + minmax adapts to any screen.
12. **Read more:** one dimension (flex) vs two (grid) · grid-template-areas · spanning (`grid-column: span 2`) · interview: flex vs grid? what is fr? · MDN “CSS grid layout”.

---

## Module 8 · Positioning and stacking
**Time:** 8 min · **Goals:** I can place a badge on a card · I can keep a header stuck at the top · I can decide what sits on top

1. **Hook:** Riya wants a “Bestseller” badge in the corner of one dish card, and her header to stay visible while customers scroll the menu. Both need positioning.
2. **What is it?** Normally boxes flow one after another. `position` lets you take control: **relative** (nudge, and become an anchor), **absolute** (place exactly inside the nearest positioned parent), **fixed** (stick to the screen), **sticky** (stick once you scroll to it). `z-index` decides what’s on top.
3. **Where it’s used:** “Sale” badges on product cards, WhatsApp’s floating chat button (fixed), sticky table headers, the notification dot on an app icon, pop-up dialogs above the page (z-index).
4. **How it works:**
   ```css
   .card  { position: relative; }
   .badge { position: absolute; top: 8px; right: 8px; }
   .top   { position: sticky; top: 0; z-index: 10; }
   ```
5. **Try it:** a card with a badge: tap top/right values and switch position (static ↔ relative ↔ absolute).
6. **See it build:** the badge in normal flow → `position: absolute` (it jumps to the page corner!) → `.card { position: relative }` (it moves into the card’s corner) → sticky header.
7. **Common mistake:** absolute badge without a positioned parent → it flies to the corner of the whole page. **Fix:** `position: relative` on the card.
8. **Match:** relative → nudge and anchor · absolute → exact spot inside the parent · fixed → stays on screen · sticky → sticks while scrolling · z-index → what’s on top.
9. **Quick check:** a floating “Chat with us” button that never moves while scrolling? **position: fixed** ✅.
10. **Build it:** put the badge in the card’s top-right corner and make the header sticky. **Checks:** `.card` relative · `.badge` absolute with top and right · `.top` sticky with `top: 0`.
11. **Recap:** relative anchors, absolute places · fixed and sticky · z-index stacks.
12. **Read more:** stacking contexts in plain words · when not to position (use flex/grid first) · interview: absolute vs fixed? how does z-index work? · MDN “Positioning”.

---

## Module 9 · States and decorations (pseudo-classes and pseudo-elements)
**Time:** 8 min · **Goals:** I can style hover, focus and disabled states · I can select by position · I can add decoration with ::before and ::after

1. **Hook:** When you tap a button, it should *feel* pressed. When you Tab through a form, you need to see where you are. And striped tables are easier to read. All of these are “states” CSS can style.
2. **What are they?** A **pseudo-class** (one colon) selects an element in a certain **state or position**: `:hover`, `:focus-visible`, `:disabled`, `:first-child`, `:nth-child(even)`. A **pseudo-element** (two colons) styles a **part** or adds content: `::before`, `::after`, `::placeholder`.
3. **Where they’re used:** button hover colours, the blue focus ring when you Tab, striped bank statements, the red star after required field labels, greyed-out “Pay” buttons until a form is complete.
4. **How it works:**
   ```css
   .btn:hover          { background: #C2410C; }
   .btn:focus-visible  { outline: 3px solid #1D4ED8; }
   tr:nth-child(even)  { background: #FFF7ED; }
   .required::after    { content: " *"; color: #B91C1C; }
   ```
5. **Try it:** a fee table and a button. Tap `even` ↔ `odd` ↔ `3n`, the hover colour and the `::after` content.
6. **See it build:** striped rows → hover colour → focus ring → the required star.
7. **Common mistake:** `outline: none` on focus, so keyboard users can’t see where they are. **Fix:** style `:focus-visible` with a clear outline instead.
8. **Sort:** pseudo-class or pseudo-element? `:hover` · `::before` · `:nth-child(2)` · `::placeholder` · `:disabled` · `::after`.
9. **Quick check:** `tr:nth-child(even)` selects… **rows 2, 4, 6…** ✅.
10. **Build it:** stripe the fee table, add a hover colour and a visible focus style to the button. **Checks:** an `:nth-child` rule · `.btn:hover` · `.btn:focus-visible` with an outline.
11. **Recap:** one colon for states, two for parts · always keep a visible focus style · ::before/::after for decoration.
12. **Read more:** `:focus` vs `:focus-visible` · `:not()` and `:has()` (preview) · interview: pseudo-class vs pseudo-element? why not remove outlines? · MDN “Pseudo-classes and pseudo-elements”.

---

## Module 10 · Responsive design
**Time:** 9 min · **Goals:** I can design for phones first · I can add rules for bigger screens with media queries · I can make images fit

1. **Hook:** Most of Riya’s customers open the page on a phone; her son checks it on a laptop. One page has to look right on both.
2. **What is it?** Responsive design means one page that **adapts to the screen**. Write styles for phones first, then use **media queries** to add rules from a certain width up.
3. **Where it’s used:** every modern site. Open Flipkart on a phone and a laptop: same HTML, different layouts. Most people in India browse the web on phones, so phone-first is the norm.
4. **How it works:**
   ```css
   .menu { display: grid; gap: 1rem; }                 /* phones: one column */
   @media (min-width: 40rem) {
     .menu { grid-template-columns: 1fr 1fr; }         /* tablets and up: two */
   }
   img { max-width: 100%; height: auto; }
   ```
   And the viewport meta tag from HTML module 12 must be in the head.
5. **Try it:** a preview width switch (phone ↔ tablet): tap the breakpoint (30rem ↔ 40rem ↔ 60rem) and the column count.
6. **See it build:** phone styles → the image fits → the media query adds two columns (preview shown at tablet width) → the nav goes into a row.
7. **Common mistake:** desktop first with fixed widths (`width: 960px`) → a horizontal scroll bar on every phone. **Fix:** fluid widths, `max-width`, and min-width media queries.
8. **Match:** `@media (min-width: 40rem)` → from 40rem wide and up · `max-width: 100%` → images never overflow · viewport tag → phone uses real width · mobile-first → phone styles are the default.
9. **Quick check:** in mobile-first CSS, the rules *outside* any media query are for… **phones (all screens)** ✅.
10. **Build it:** one column by default, two from 40rem, and fluid images. **Checks:** a `@media (min-width:` rule · inside it, two grid columns · `img` with `max-width: 100%`.
11. **Recap:** phone first · min-width media queries add layout for bigger screens · fluid images.
12. **Read more:** choosing breakpoints from content, not devices · testing in DevTools device mode · interview: mobile-first vs desktop-first? what does the viewport tag do? · MDN “Responsive design”, “Media queries”.

---

## Module 11 · Transitions and animations
**Time:** 8 min · **Goals:** I can smooth a change with transition · I can run a keyframe animation · I can respect people who prefer less motion

1. **Hook:** A button that changes colour instantly feels cheap; one that eases in 0.2 seconds feels polished. A gentle pulse can draw the eye to “Order now”. Small motion, used well, makes a page feel alive.
2. **What are they?** A **transition** smooths a change between two states (like hover). An **animation** with `@keyframes` runs a movement by itself, once or on repeat.
3. **Where they’re used:** like-button hearts on Instagram, loading spinners, menus sliding open, skeleton loaders while content loads.
4. **How it works:**
   ```css
   .btn { transition: background 0.2s ease, transform 0.2s ease; }
   .btn:hover { transform: translateY(-2px); }
   @keyframes pulse { 50% { transform: scale(1.05); } }
   .offer { animation: pulse 2s ease-in-out infinite; }
   @media (prefers-reduced-motion: reduce) { .offer { animation: none; } }
   ```
   Animate `transform` and `opacity`: they’re smooth even on cheap phones.
5. **Try it:** tap the duration (0.1s ↔ 0.5s ↔ 1s), the easing and the scale.
6. **See it build:** hover with no transition → add transition → keyframes → apply the animation → reduced-motion rule.
7. **Common mistake:** animating `width` or `top` → jerky on low-end phones. **Fix:** animate `transform` instead. And always add the reduced-motion rule.
8. **Match:** transition → smooth a change · @keyframes → define steps · animation → run the steps · prefers-reduced-motion → user asked for less motion · transform → move/scale cheaply.
9. **Quick check:** which is smoothest to animate? **transform** ✅ · width · margin · top.
10. **Build it:** add a 0.2s transition to the button and a pulse to the offer, switched off for reduced motion. **Checks:** `transition` on `.btn` · an `@keyframes` rule · `animation` on `.offer` · a `prefers-reduced-motion` query.
11. **Recap:** transition for changes · keyframes for movement · transform/opacity, and respect reduced motion.
12. **Read more:** easing curves in plain words · motion sickness and why reduced-motion matters · interview: transition vs animation? why animate transform? · MDN “Using CSS transitions”, “Using CSS animations”.

---

## Module 12 · CSS variables and tidy CSS
**Time:** 8 min · **Goals:** I can define and use custom properties · I can switch a theme by changing variables · I can keep CSS organised

1. **Hook:** Riya decides to change her brand colour from saffron to green. Her stylesheet uses the colour in 14 places. With variables, it’s a one-line change, and dark mode comes almost free.
2. **What are they?** **Custom properties** (CSS variables) store a value with a name: `--brand: #E8590C;`. Use it anywhere with `var(--brand)`. Change it once and every use updates.
3. **Where they’re used:** every design system (colours, spacing, fonts as tokens), dark mode on YouTube and WhatsApp Web, white-label apps where each customer gets their own colours.
4. **How it works:**
   ```css
   :root { --brand: #E8590C; --text: #1F2933; --bg: #FFFFFF; --space: 1rem; }
   h1   { color: var(--brand); }
   .card { padding: var(--space); background: var(--bg); color: var(--text); }
   @media (prefers-color-scheme: dark) { :root { --bg: #111827; --text: #F9FAFB; } }
   ```
5. **Try it:** tap the `--brand` value and watch every orange thing change at once; flip the dark-mode values.
6. **See it build:** the `:root` variables → heading uses `--brand` → cards use `--space` and colours → the dark-mode block (preview shown dark).
7. **Common mistake:** `color: --brand;` → ignored. **Fix:** `color: var(--brand);`. Also: forgetting the two dashes when defining.
8. **Sort:** good tidy-CSS habits vs messy: one variable per brand colour ✅ · the same hex typed 14 times ✗ · a spacing scale (0.5, 1, 2rem) ✅ · `!important` everywhere ✗ · reusable classes like `.card` ✅ · styling by long id chains ✗.
9. **Quick check:** what does `var(--brand)` do? **Uses the value stored in --brand** ✅.
10. **Build it:** define `--brand` and `--space` on `:root`, use them on the heading and cards, and add dark-mode values. **Checks:** `:root` defines two variables · `var(--brand)` used · a `prefers-color-scheme: dark` block.
11. **Recap:** define with `--name`, use with `var()` · change once, update everywhere · variables make themes and dark mode easy.
12. **Read more:** design tokens · fallbacks (`var(--brand, orange)`) · file organisation · interview: CSS variables vs Sass variables? how would you add dark mode? · MDN “Using CSS custom properties”.

---

## Project · Style Sharma Classes
**Time:** 25 min · Continues the HTML project: the learner styles the Sharma Classes page they built. Four checked steps, live preview at phone and tablet widths.

**Brief (from Mr Sharma):** “The page works, thank you! Now it needs to look professional: our colours are deep blue and gold. Parents mostly open it on their phones. The enquiry button should stand out.”

1. **Design system:** `:root` variables for brand blue, gold, text, background and spacing; body font stack, line-height and colours from the variables. *Checks:* at least 4 variables · body uses `var()` · a font stack with a fallback.
2. **Layout, phone first:** header as a flex row (name left, links right); `.page` max-width and centred; courses as a responsive grid; the fee table striped. *Checks:* flex header with space-between · max-width + auto margins · grid with auto-fill/minmax · `:nth-child` on rows.
3. **Bigger screens and media:** a `min-width` media query that puts About and Courses side by side; images and the map iframe fluid. *Checks:* a min-width media query with a two-column layout · `max-width: 100%` on images/iframes.
4. **Polish and access:** gold enquiry button with hover transition and a visible `:focus-visible` outline; sticky header; reduced-motion and dark-mode rules. *Checks:* `.btn:hover` + transition · `:focus-visible` outline · sticky header · `prefers-reduced-motion` · `prefers-color-scheme: dark`.

**Learned:** styled a real page with a design system of variables · laid it out phone first with flex and grid · added accessible states, motion and dark mode.
**Read more:** MDN “Styling a biography page” / “Fundamental layout comprehension” assessments.
