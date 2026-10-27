# CSS · Intermediate level · content draft (modules 1–6 and the project)

**Status:** draft for owner review (27 Oct 2026). Nothing is built yet. Once approved, each module is built as a Lesson v3 lesson with tests and module notes, on branch `lesson-v3`.

**Order:** the same as HTML Intermediate: Hook → 3 learn cards with animations → Try it → See it build → Common mistake → Sort or match → Quick check → **At work** → Build it → Recap → Read more. Six modules, about 12 minutes each.

**What’s new compared with Basic:** Basic taught each tool (Flexbox, Grid, media queries, transitions, variables). Intermediate puts them together the way real designs need: layouts that fit any screen without many media queries, motion with a purpose, themes, polished forms and navigation.

**Story thread:** still at **Saathi Web Studio** in Indore. **Meera** (team lead) and **Arjun** (designer) send the At work messages, often with a design to match. The project is the learner’s **own portfolio**, the site they will send with job and internship applications.

**Learner level:** has finished HTML and CSS Basic. All code is checked in tests: each Build it starter fails its checks and its solution passes. Checks read the computed styles in a test browser (jsdom), the same way as CSS Basic.

**New animations (4):** `auto-fit` + `minmax` (cards flow into as many columns as fit while the screen widens) · container vs viewport (the same card is narrow in a sidebar and wide in the main column, and changes its own layout) · keyframes timeline (a track with 0%, 50% and 100% markers and a dot moving along it) · the theme switch (one set of design tokens, two themes, every component changing together).

---

## Module 1 · Layout patterns
**Id:** `c-i-layouts` · **Time:** 12 min · **Goals:** I can build a card grid that needs no media queries · I can build a page with header, sidebar, main and footer using grid areas · I can keep the footer at the bottom of short pages

1. **Hook:** Arjun’s design for the school has a card grid, a sidebar and a footer. The old CSS needed 6 media queries and still broke on a tablet. Most layouts on the web are a few patterns; learn them once and you can build most pages.
2. **What is it?** **Layout patterns** are tried-and-tested ways to arrange a page: the card grid, the sidebar layout, the header–main–footer page (the “holy grail”), the centred column.
   - *Animation (new):* `auto-fit` + `minmax`: cards flow from 1 to 2 to 4 columns as the screen widens, with no media query.
3. **Where it’s used:** product listings (Flipkart, Meesho), dashboards with a sidebar, blogs with a centred column, almost every site’s header and footer.
4. **How it works:**
   ```css
   .cards {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
     gap: 1rem;
   }
   .page {
     display: grid;
     grid-template-areas: "head" "main" "foot";
     grid-template-rows: auto 1fr auto;
     min-height: 100vh;
   }
   @media (min-width: 48rem) {
     .page { grid-template-columns: 16rem 1fr; grid-template-areas: "head head" "side main" "foot foot"; }
   }
   header { grid-area: head; }
   ```
   `minmax(14rem, 1fr)` means “at least 14rem, otherwise share the space”. `auto-fit` makes as many columns as fit. `1fr` on the middle row pushes the footer to the bottom.
5. **Try it:** tap the minimum card width (10rem ↔ 14rem ↔ 20rem) and drag the screen width; watch the column count.
6. **See it build:** plain stacked cards → `display: grid` → the `auto-fit` columns → the page areas → the sidebar appears at tablet width → the footer stays at the bottom.
7. **Common mistake:** `repeat(4, 1fr)` for cards. On a phone you get four squashed cards. **Fix:** `repeat(auto-fit, minmax(…, 1fr))`, which picks the count for you.
8. **Match:** `auto-fit` + `minmax` → a card grid with no media queries · `grid-template-areas` → name the parts of a page · `auto 1fr auto` rows → footer at the bottom · `max-width` + `margin-inline: auto` → a centred column · `flex-wrap` → a row that wraps.
9. **Quick check:** with `minmax(14rem, 1fr)` on a 30rem-wide screen (and no gap), how many columns? **2** ✅ · 1 · 3 · 4.
10. **At work:** Arjun: “Here’s the course page design: header, a filter sidebar on tablets and up, a card grid, a footer. No more than one media query, please.”
11. **Build it:** the course page. **Checks:** the card grid uses `auto-fit` and `minmax` · the page uses `grid-template-areas` · the sidebar shows only at 48rem and up · the footer sits at the bottom of a short page.
12. **Recap:** auto-fit + minmax for cards · named areas for pages · `1fr` pushes the footer down · one media query is often enough.
13. **Read more:** `auto-fit` vs `auto-fill` · the centred column with `min()` · subgrid (aligning card parts) · interview: Flexbox or Grid, when? · MDN “Common grid layouts”, web.dev “Ten modern layouts in one line of CSS”.

---

## Module 2 · Components that fit anywhere
**Id:** `c-i-container` · **Time:** 12 min · **Goals:** I can make text and spacing grow smoothly with `clamp()` · I can change a component’s layout with container queries · I can keep images in shape with `aspect-ratio` and `object-fit`

1. **Hook:** The same course card sits in the wide main column and in the narrow sidebar. A media query only knows the *screen* width, so the sidebar card breaks. Today the card learns to look at the space it’s given.
2. **What is it?** **Fluid** CSS that sizes itself smoothly (`clamp()`), and **container queries**, which let a component change its layout based on the width of its container instead of the screen.
   - *Animation (new):* container vs viewport: the same card, narrow in the sidebar (stacked) and wide in the main column (image beside the text).
3. **Where it’s used:** design systems at big companies, where one card or product tile must work in many places: lists, sidebars, carousels, pop-ups.
4. **How it works:**
   ```css
   h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); }
   .card-wrap { container-type: inline-size; }
   .card { display: grid; gap: 0.75rem; }
   @container (min-width: 28rem) {
     .card { grid-template-columns: 10rem 1fr; }
   }
   .card img { aspect-ratio: 4 / 3; object-fit: cover; width: 100%; }
   ```
   `clamp(min, ideal, max)` grows with the screen but never goes past the limits. `container-type: inline-size` turns the wrapper into a container; `@container` asks how wide *it* is. `object-fit: cover` crops the photo instead of squashing it.
5. **Try it:** drag the card between the sidebar and the main column; drag the screen width and watch the heading size.
6. **See it build:** a plain card → the image gets `aspect-ratio` and `object-fit` → the wrapper becomes a container → the `@container` rule (the card goes side by side in the wide column only) → the `clamp()` heading.
7. **Common mistake:** `@container` with no container: the rule never applies, and there’s no error. **Fix:** put `container-type: inline-size` on a *parent* of the element you change (an element can’t query itself).
8. **Match:** `clamp()` → smooth size with limits · `container-type` → makes a container · `@container` → layout by container width · `aspect-ratio` → a fixed shape · `object-fit: cover` → crop, don’t squash.
9. **Quick check:** `clamp(1rem, 4vw, 2rem)` on a very wide screen gives… **2rem** ✅ · 4vw · 1rem · it depends on the font.
10. **At work:** Arjun: “The marketing team will put the course card in the sidebar, the home page and an email-style banner. It must look right in all three.” *Design:* stacked under 28rem, side by side above.
11. **Build it:** the course card. **Checks:** the wrapper has `container-type: inline-size` · an `@container` rule changes the columns · images use `aspect-ratio` and `object-fit: cover` · the title uses `clamp()`.
12. **Recap:** clamp() for fluid sizes · container queries for components · media queries for the page · aspect-ratio and object-fit for photos.
13. **Read more:** container units (`cqi`) · when to use media vs container queries · interview: what problem do container queries solve? · MDN “CSS container queries”, “clamp()”.

---

## Module 3 · Motion with a purpose
**Id:** `c-i-motion` · **Time:** 12 min · **Goals:** I can write keyframes with several steps · I can stagger animations with delays · I can build a loading skeleton and respect reduced motion

1. **Hook:** The school’s results page shows a blank white box for 2 seconds while marks load, and parents think it’s broken. Basic showed one hover transition; today, motion that **tells people what’s happening**.
2. **What is it?** `@keyframes` describe an animation step by step; the `animation` properties choose how long, how often, the delay and what stays at the end.
   - *Animation (new):* the keyframes timeline: markers at 0%, 50%, 100% and a dot moving along them, with the box changing at each stop.
3. **Where it’s used:** loading skeletons (YouTube, LinkedIn), “added to cart” feedback, list items easing in one by one, spinners on payment screens.
4. **How it works:**
   ```css
   @keyframes shimmer {
     from { background-position: -20rem 0; }
     to   { background-position: 20rem 0; }
   }
   .skeleton {
     background: linear-gradient(90deg, #eee 25%, #f6f6f6 50%, #eee 75%);
     background-size: 40rem 100%;
     animation: shimmer 1.2s linear infinite;
   }
   @keyframes rise { from { opacity: 0; transform: translateY(1rem); } }
   .result { animation: rise 0.4s ease-out both; }
   .result:nth-child(2) { animation-delay: 0.1s; }
   .result:nth-child(3) { animation-delay: 0.2s; }
   @media (prefers-reduced-motion: reduce) {
     .skeleton, .result { animation: none; }
   }
   ```
   `both` (fill mode) keeps the start style during the delay and the end style afterwards. A keyframe with only `from` animates to the element’s normal style.
5. **Try it:** tap the duration, the delay step and the fill mode; switch reduced motion on in the mock phone settings.
6. **See it build:** grey boxes → the shimmer → the results replace them → each result rises in turn → the reduced-motion rule turns it off.
7. **Common mistake:** animating `width`, `top` or `margin`: the browser redoes the layout every frame and cheap phones stutter. **Fix:** animate `transform` and `opacity` only.
8. **Sort:** smooth to animate or slow? `transform` ✓ · `opacity` ✓ · `width` ✗ · `top` ✗ · `box-shadow` (use sparingly) ✗ · `filter` on a small element (OK) ✓.
9. **Quick check:** an item with `animation-delay: 0.5s` flashes in its final place before the animation starts. What fixes it? **`animation-fill-mode: both` (or `backwards`)** ✅ · `infinite` · `ease-in` · a longer duration.
10. **At work:** Meera: “Parents think the results page is broken. Add a loading state and make the results come in nicely, but our accessibility checklist says motion must be optional.”
11. **Build it:** the results page. **Checks:** a `@keyframes` rule used by `.skeleton` with `infinite` · results use a keyframe with a staggered `animation-delay` · fill mode keeps the start style · a `prefers-reduced-motion` rule turns animations off · only `transform` and `opacity` change in the rise.
12. **Recap:** keyframes for multi-step motion · stagger with delays · fill-mode both · transform and opacity · reduced motion always.
13. **Read more:** easing curves and `cubic-bezier` · `animation-play-state` · interview: transition vs animation? why animate transform? · MDN “Using CSS animations”, web.dev “Animations and performance”.

---

## Module 4 · Design tokens and themes
**Id:** `c-i-themes` · **Time:** 12 min · **Goals:** I can organise variables into tokens · I can switch themes with a `data-theme` attribute · I can control which rules win with `@layer`

1. **Hook:** The school wants a red theme for Annual Day and a calm blue theme the rest of the year. If colours are typed in 40 places, that’s 80 edits and some will be missed. With tokens it’s one block.
2. **What is it?** **Design tokens** are named decisions (brand colour, spacing, radius) kept in one place. **Primitive** tokens hold raw values (`--red-600`); **semantic** tokens say what they’re for (`--color-action`). Components use only the semantic ones, so a theme just remaps them.
   - *Animation (new):* the theme switch: one panel of tokens, two themes, every button and card changing together.
3. **Where it’s used:** every design system (Google’s Material, Atlassian, Razorpay’s Blade), white-label apps that change colours per customer, light and dark modes.
4. **How it works:**
   ```css
   @layer base, components, utilities;
   @layer base {
     :root {
       --blue-600: #1D4ED8;  --red-600: #DC2626;
       --color-action: var(--blue-600);
       --space-2: 0.5rem; --radius: 0.75rem;
     }
     [data-theme="annual-day"] { --color-action: var(--red-600); }
   }
   @layer components {
     .btn { background: var(--color-action); padding: var(--space-2) 1rem; border-radius: var(--radius); }
   }
   ```
   ```html
   <html data-theme="annual-day">
   ```
   `@layer` sets the order rules win in: `utilities` beats `components`, which beats `base`, whatever their specificity.
5. **Try it:** tap `data-theme` (none ↔ `annual-day` ↔ `dark`) and a primitive colour; watch the whole page change.
6. **See it build:** primitives → semantic tokens → the button and card using them → the `annual-day` theme block → the attribute set on `html` (everything turns red) → the layer order.
7. **Common mistake:** components using primitives directly: `.btn { background: var(--blue-600); }`. The theme can’t change it. **Fix:** components use semantic tokens (`--color-action`); only themes touch primitives.
8. **Match:** primitive token → a raw value · semantic token → what it’s for · `[data-theme]` → a theme switch · `@layer` → which group of rules wins · `var(--x, fallback)` → a backup value.
9. **Quick check:** with `@layer base, components, utilities;` a rule in `components` and one in `utilities` both set `color`. Which wins? **utilities** ✅ · components · the one with more specificity · the one written later in the file.
10. **At work:** Arjun: “Annual Day is next week. The client wants the red theme switched on for 5 days, without touching any component CSS.” *Data:* the new colours.
11. **Build it:** tokenise the school’s CSS. **Checks:** primitive and semantic tokens in `:root` · `.btn` and `.card` use only semantic tokens · `[data-theme="annual-day"]` remaps them · the button turns red when the attribute is set · rules sit in named layers.
12. **Recap:** primitives hold values, semantics hold meaning · themes remap semantics · data-theme switches · @layer orders the cascade.
13. **Read more:** dark mode with `color-scheme` and `light-dark()` · `color-mix()` for hover shades · naming tokens · interview: what is a design token? how does @layer change specificity? · MDN “Cascade layers”, “Using CSS custom properties”.

---

## Module 5 · Forms that look good
**Id:** `c-i-forms` · **Time:** 12 min · **Goals:** I can style inputs, checkboxes and buttons consistently · I can show a clear focus ring for keyboard users · I can style a field only after the user has made a mistake

1. **Hook:** The admission form from HTML Intermediate works perfectly but looks like 1999: tiny boxes, blue default checkboxes, red borders before you’ve even typed. Today it gets the design Arjun drew.
2. **What is it?** Styling form controls without breaking them: the same size and spacing for every field, brand colours on checkboxes and radios, a visible focus ring, and error styles that appear at the right moment.
   - *Animation:* a field moving through its states: normal → focused (ring) → typed wrong and left (red) → fixed (green tick).
3. **Where it’s used:** every checkout, sign-up and KYC form. Clear focus and error states cut the number of people who give up halfway.
4. **How it works:**
   ```css
   input, select, textarea { font: inherit; padding: 0.6rem 0.75rem; border: 1px solid #94A3B8; border-radius: 0.5rem; width: 100%; }
   input:focus-visible { outline: 3px solid var(--color-action); outline-offset: 2px; }
   input:user-invalid { border-color: #DC2626; }
   .field:has(input:user-invalid) .error { display: block; }
   input[type="checkbox"], input[type="radio"] { accent-color: var(--color-action); width: 1.25rem; height: 1.25rem; }
   ```
   `:focus-visible` shows the ring for keyboard users. `:user-invalid` matches only *after* the user has changed the field and left it, unlike `:invalid`, which is red from the start. `:has()` lets a parent react to its child. `accent-color` recolours checkboxes and radios without rebuilding them.
5. **Try it:** tab through the form with the on-screen keyboard; type a wrong phone number and tap out; switch `:user-invalid` ↔ `:invalid`.
6. **See it build:** the bare form → same font and size for all fields → the focus ring → `accent-color` on the radios → the error border with `:user-invalid` → the error message shown with `:has()`.
7. **Common mistake:** `outline: none` on focus because the ring “looks ugly”. Keyboard users can no longer see where they are. **Fix:** never remove it; restyle it with `:focus-visible`.
8. **Match:** `:focus-visible` → ring for keyboard users · `:user-invalid` → red only after the user leaves the field · `:has()` → a parent styled by its child · `accent-color` → brand colour on checkboxes · `font: inherit` → fields use the page font.
9. **Quick check:** why is `:invalid` a bad choice for the red border on a required field? **It’s red before the user has typed anything** ✅ · it doesn’t work on phones · it needs JavaScript · it only works on checkboxes.
10. **At work:** Arjun: “Here’s the form design. And the client’s accessibility tester says ‘focus is invisible’ on the current site.” *Ticket:* outline removed in `reset.css` · errors red on page load.
11. **Build it:** style the admission form. **Checks:** fields inherit the font and share padding and radius · `:focus-visible` has a visible outline · no `outline: none` without a replacement · the error border uses `:user-invalid` · the message shows via `:has()` · radios use `accent-color`.
12. **Recap:** consistent fields · never hide focus · `:user-invalid`, not `:invalid` · `:has()` and `accent-color` save work.
13. **Read more:** `appearance: none` and when to use it · styling `select` · touch target sizes (at least 24 × 24 CSS pixels, 44 recommended) · interview: `:focus` vs `:focus-visible`? what does `:has()` do? · MDN “Styling web forms”, “:user-invalid”.

---

## Module 6 · Responsive navigation
**Id:** `c-i-nav` · **Time:** 12 min · **Goals:** I can build a menu that is a row on laptops and a toggle on phones · I can keep the header in view with `position: sticky` · I can add a skip link

1. **Hook:** The school’s menu has 7 links. On a laptop they fit in a row; on a phone they wrap into three messy lines. Every site needs this solved, and most do it with far too much JavaScript.
2. **What is it?** A navigation that changes shape with the screen: a full row when there’s room, a **Menu** button that opens a panel when there isn’t, a header that stays in view, and a **skip link** so keyboard users can jump past it.
   - *Animation:* the same nav at three widths: row → wrapped → Menu button with a panel.
3. **Where it’s used:** every website header. Banks, shops, news sites and government portals all use some version of this.
4. **How it works:**
   ```html
   <a class="skip" href="#main">Skip to content</a>
   <header class="site-head">
     <button class="menu-btn" popovertarget="nav">Menu</button>
     <nav id="nav" popover aria-label="Main">…links…</nav>
   </header>
   ```
   ```css
   .site-head { position: sticky; top: 0; z-index: 10; }
   .skip { position: absolute; left: -999px; }
   .skip:focus { left: 1rem; top: 1rem; }
   @media (min-width: 48rem) {
     .menu-btn { display: none; }
     #nav { display: flex; gap: 1rem; position: static; inset: auto; border: 0; }
   }
   ```
   On phones the `popover` (from HTML Intermediate) opens the menu with no script; on wider screens CSS shows the nav as a normal row. `sticky` keeps the header in view while you scroll.
5. **Try it:** drag the screen width; tap Menu on the phone size; press Tab to see the skip link.
6. **See it build:** the plain list of links → the flex row → the sticky header → the phone Menu button and panel → the desktop media query → the skip link appearing on focus.
7. **Common mistake:** hiding the skip link with `display: none`. Then it can’t get focus, so it never appears. **Fix:** move it off-screen and bring it back on `:focus`.
8. **Match:** `position: sticky` → stays in view while scrolling · `popover` → Menu panel without script · skip link → jump past the header · `aria-label` on `nav` → names the menu · `z-index` → keeps the header on top.
9. **Quick check:** a `sticky` header doesn’t stick. What’s the most likely missing line? **`top: 0`** ✅ · `z-index: 10` · `display: flex` · `width: 100%`.
10. **At work:** Meera: “The school’s phone menu covers the page and can’t be closed. Rebuild it, no JavaScript.”
11. **Build it:** the school header. **Checks:** a skip link that targets `#main` and shows on focus · the header is sticky with `top: 0` · on phones a button with `popovertarget` opens the nav · from 48rem the button hides and the nav is a flex row.
12. **Recap:** row on big screens, button and panel on small · sticky + top · skip links stay focusable.
13. **Read more:** `aria-expanded` when a menu uses JavaScript · `:focus-within` for dropdowns · interview: how do you make a nav accessible? · MDN “position: sticky”, WAI “Menus tutorial”.

---

## Project · Your portfolio site
**Id:** `c-i-project` · **Time:** 35 min · Four checked steps in the web editor (with the multi-page preview if it is approved in HTML Intermediate).

**Brief (from Meera):** “Every new person at Saathi builds their own portfolio first. It’s what you’ll send with internship applications. Make it look good on a phone, because that’s where recruiters open it.”

1. **The layout:** header, a short “about me”, a projects grid, a contact section, a footer. *Checks:* page areas with grid · the projects grid uses `auto-fit` + `minmax` · footer at the bottom.
2. **Project cards that fit anywhere:** cards in a container with an `@container` layout change, screenshots with `aspect-ratio` and `object-fit`, a `clamp()` heading. *Checks:* the Module 2 rules.
3. **Themes and motion:** semantic tokens, a light theme and a dark theme switched with `data-theme`, cards rising in turn, reduced motion respected. *Checks:* the Module 3 and 4 rules.
4. **Contact form and nav:** a styled contact form with focus rings and `:user-invalid`, a responsive nav with a skip link. *Checks:* the Module 5 and 6 rules.

**Learned:** combined layout patterns into a full site · made components that fit any space · built themes, motion, forms and navigation to a professional standard.
**Read more:** web.dev “Learn CSS”, MDN “CSS layout cookbook”.

---

## Decisions for you

1. **Project choice.** The curriculum said “a responsive portfolio”. I made it the **learner’s own portfolio** (their name, their projects so far, like the Sharma Classes site), so it is useful after the course too. *Or* a portfolio for a made-up designer. My recommendation: their own.
2. **Newer CSS features.** Container queries, `:has()`, `:user-invalid`, `@layer` and `popover` work in all current browsers (Chrome, Safari, Firefox and Samsung Internet since 2023–24). On older phones (Android WebView before about 2023), parts of Modules 2, 5 and 6 may not show in the app’s preview. Since they are now standard, I propose teaching them and adding a short note where an older phone would differ. OK?
3. **Six modules**, matching HTML Intermediate. OK?
