# CSS track: Lesson v5 · content draft (v2: full topic coverage)

**Status:** approved by the owner (“go as suggested”) and built, 29 Oct 2026: `src/content/tracks/cssV5/`. Replaces `css-basic.md` (v3 draft); its examples and project are reused.

**Coverage:** the owner asked for every concept W3Schools teaches in CSS. Their CSS tutorial (basic, advanced, flexbox, grid, responsive) was used as a **topic checklist only**: every topic on it is in a lesson below (see the coverage table at the end). Wording, examples and pictures are our own, so nothing is copied.

**Same shape as the HTML track (built):** short lessons (3–5 min), each module ending in a **Module Challenge** (5 quick questions + 6 tasks, 1–3 stars, a badge). Same screens as HTML (chat, tap to reveal, explore, tap to place, toggle, before/after, live edit, quick check, tap the bug, recap, swipe, match, pick the code, X-ray, arrange) plus **two new CSS screens**:

- **Copy the look:** a small target picture at the top, the learner's live page below. They change values (chips or a slider) until the two match; it ticks when every value is right.
- **Resize the screen:** a slider changes the preview width from phone (360px) to laptop (1200px); media queries switch on and off as you drag.

**Story thread:** the learner styles **Riya's Café** (Pune; tea, coffee, toast, sandwich), the same café as the Python billing project. The final challenge styles **Sharma Classes** (Jaipur). Every value is real CSS, checked in tests.

**Size:** 12 modules, 68 lessons, 12 challenges (about 4–5 hours). The 13 old CSS ids are reused (⟵), so learners keep progress, notes and practice sets.

---

## Module 1 · Getting Started · 🎨 First Style
| Lesson | Teaches | Screens |
|---|---|---|
| 1.1 What is CSS? ⟵ `w-css-1` | HTML = what, CSS = how it looks | Chat (Riya: "my menu looks plain") → before/after → quick check |
| 1.2 Your first rule | selector { property: value; } | Explore the parts → tap to place `:` and `;` → live edit a colour |
| 1.3 Three ways to add CSS | external file, `<style>`, inline; several stylesheets | Tap to reveal → match → swipe |
| 1.4 Comments and errors | `/* */`; the browser skips what it can't read | Tap the bug (missing `;` kills two lines, a typo in a property) |
| 1.5 The cascade | later rule wins; order of stylesheets | Toggle two rules on and off → recap |

## Module 2 · Selectors · 🎯 Sharp Shooter
| Lesson | Teaches | Screens |
|---|---|---|
| 2.1 Element, class, id, all ⟵ `c-sel-1` | `p`, `.price`, `#menu`, `*`, groups `h1, h2` | Explore: tap a selector, matching items light up → tap to place |
| 2.2 Family selectors | descendant, child `>`, next `+`, siblings `~` | Live edit: switch the combinator, see what gets styled → quick check |
| 2.3 Attribute selectors | `[type="email"]`, `[href^="https"]`, `$=`, `*=` | Match selector → what it picks → swipe |
| 2.4 Inheritance | colour and font flow down, borders don't; `inherit` | Toggle colour on the body, watch the children |
| 2.5 Which rule wins? | specificity score, `!important` as a last resort | **Scoreboard:** two rules face off, guess the winner → tap the bug → recap |

## Module 3 · Colours, Backgrounds and Units · 🌈 Colour Mixer
| Lesson | Teaches | Screens |
|---|---|---|
| 3.1 Colours ⟵ `c-units` | names, hex, rgb, hsl, alpha, `currentColor` | Live edit RGB and HSL sliders mixing the café colour → match hex → colour |
| 3.2 Opacity | `opacity` vs an alpha colour (why text fades too) | Before/after → quick check |
| 3.3 Backgrounds | colour, image, repeat, position, size (`cover`/`contain`), attachment, shorthand, several layers | Live edit size and position on the café banner → copy the look |
| 3.4 Gradients | linear, radial, conic | Live edit angle and colours → pick the code |
| 3.5 Units | px, %, em, rem, vw, vh | Live edit the root size: rem grows, px stays → swipe |
| 3.6 CSS maths | `calc()`, `min()`, `max()`, `clamp()` | Resize the screen with a `clamp()` heading → recap |

## Module 4 · Text and Fonts · 🔤 Type Setter
| Lesson | Teaches | Screens |
|---|---|---|
| 4.1 Fonts ⟵ `c-text-1` | `font-family`, safe fonts, fallback stacks, serif vs sans-serif | Toggle fonts on the menu → tap to place a stack |
| 4.2 Size, weight, style | `font-size`, `font-weight`, `font-style`, `line-height`, the `font` shorthand | Live edit line height (find the comfortable one) → copy the look |
| 4.3 Your own fonts | `@font-face` (a font file shipped with the app, works offline); pairing two fonts | Before/after → quick check |
| 4.4 Text layout | align, indent, decoration and its styles, transform, letter and word spacing | Match property → effect → swipe |
| 4.5 Text effects | `text-shadow`, `text-overflow: ellipsis`, `word-break`, `white-space` | Live edit a long dish name in a narrow card → tap the bug |
| 4.6 Icons | icon fonts and SVG icons (how icon libraries work), sizing and colouring them | Copy the look (an icon button) → recap |

## Module 5 · The Box Model · 📦 Box Master
| Lesson | Teaches | Screens |
|---|---|---|
| 5.1 Every element is a box ⟵ `c-box-1` | content, padding, border, margin | **Box X-ray:** the box peels into layers; tap and name each |
| 5.2 Padding and margin | shorthand order, `auto` centring, margin collapse | Live edit sliders → tap the bug (collapsed margins) |
| 5.3 Width and height | `width`, `height`, `min-`/`max-`, `box-sizing: border-box` | Toggle content-box / border-box with the width shown |
| 5.4 Borders | style, width, colour, sides, shorthand, `border-radius`, border images | Live edit radius from square to pill → copy the look |
| 5.5 Outline and shadows | `outline` (doesn't take space), `outline-offset`, `box-shadow` | Before/after → quick check |
| 5.6 Overflow | `visible`, `hidden`, `scroll`, `auto`; x and y | Toggle on a too-long menu → swipe → recap |

## Module 6 · Display and Position · 🧭 Placer
| Lesson | Teaches | Screens |
|---|---|---|
| 6.1 Display | block, inline, inline-block, none vs `visibility: hidden` | Toggle on menu items → quick check |
| 6.2 Position ⟵ `c-pos-1` | static, relative, absolute (and its nearest positioned parent) | Toggle a "New" sticker on a card → explore |
| 6.3 Fixed and sticky | `fixed`, `sticky`, offsets `top/right/bottom/left` | Scroll the preview with a sticky header → tap the bug |
| 6.4 Layers | `z-index`, stacking | Live edit z-index on overlapping cards → swipe |
| 6.5 Float and clear | float for text around images, `clear`, why layouts now use flex/grid | Before/after |
| 6.6 Centring anything | text, blocks, `margin: auto`, vertical centring, `vertical-align` | Copy the look ×2 → recap |

## Module 7 · Flexbox · 💪 Flex Pro
| Lesson | Teaches | Screens |
|---|---|---|
| 7.1 Lining things up ⟵ `c-flex-1` | `display: flex`, `flex-direction` | Before/after the café header → explore the main axis |
| 7.2 Along the line | `justify-content` | Live edit chips → copy the look |
| 7.3 Across the line | `align-items`, `align-content`, `gap` | Live edit → quick check |
| 7.4 Wrapping | `flex-wrap`, `flex-flow` | Resize the screen: cards wrap as it narrows |
| 7.5 Flex items | `flex-grow`, `flex-shrink`, `flex-basis`, `flex`, `order`, `align-self` | Live edit grow on one item → tap the bug → recap |

## Module 8 · Grid · 🧱 Grid Builder
| Lesson | Teaches | Screens |
|---|---|---|
| 8.1 Grid basics ⟵ `c-grid-1` | `display: grid`, columns, rows | Live edit column count 1–4 → tap to place |
| 8.2 Tracks | `fr`, `repeat()`, `minmax()`, `auto-fill` | Resize the screen: the menu grid reflows → quick check |
| 8.3 Gaps and alignment | `gap`, `justify-items`, `align-items`, `place-items` | Copy the look |
| 8.4 Placing items | `grid-column`, `grid-row`, `span`, `order` | Tap to place a wide "Today's special" card → swipe |
| 8.5 Named areas | `grid-template-areas`, a 12-column page layout | Arrange header, menu, sidebar, footer → recap |

## Module 9 · Styling Page Parts · 🧩 Page Stylist
| Lesson | Teaches | Screens |
|---|---|---|
| 9.1 Links and buttons | link states in order, link buttons, hover effects, button groups | Tap the live button through its states → copy the look |
| 9.2 Lists | markers, `list-style`, lists as menus | Before/after → tap to place |
| 9.3 Tables | `border-collapse`, sizes, alignment, striped rows, scrolling tables on phones | Live edit → tap the bug |
| 9.4 Forms | inputs, focus style, `accent-color`, labels, select and textarea | Copy the look (the order form) → quick check |
| 9.5 Navigation bars and dropdowns | vertical and horizontal nav, a dropdown on hover and focus | Arrange the nav CSS → swipe |
| 9.6 Small parts | tooltips, pagination, an image gallery, multiple columns | Pick the code ×2 → recap |

## Module 10 · States and Extras · ✨ State Shifter
| Lesson | Teaches | Screens |
|---|---|---|
| 10.1 Pseudo-classes ⟵ `c-pseudo` | `:hover`, `:focus`, `:focus-visible`, `:active`, `:checked`, `:disabled` | Tap the live form through its states |
| 10.2 By position | `:first-child`, `:nth-child()`, `:not()`, `:has()` | Live edit `nth-child(odd/even/3n)` on the price table → quick check |
| 10.3 Pseudo-elements | `::before`, `::after`, `content`, `::first-letter`, `::placeholder`, `::selection` | Explore → tap to place |
| 10.4 Counters | `counter-reset`, `counter-increment`, nested counters | Before/after a numbered recipe |
| 10.5 Comfort and access | `cursor`, `resize`, `user-select`, contrast, visible focus, `prefers-reduced-motion` | Tap the bug (focus outline removed) → recap |

## Module 11 · Images, Effects and Motion · 🎬 Motion Maker
| Lesson | Teaches | Screens |
|---|---|---|
| 11.1 Image styling | rounded and circle images, `object-fit`, `object-position`, centring, hover overlays | Copy the look (a dish card) |
| 11.2 Filters, shapes, masks | `filter`, `clip-path`, `mask-image` with a gradient | Live edit blur, grayscale, brightness → swipe |
| 11.3 2D transforms | `translate`, `rotate`, `scale`, `skew`, `transform-origin` | Live edit sliders → quick check |
| 11.4 3D transforms | `perspective`, `rotateY`, a card flip | Tap the card to flip it → pick the code |
| 11.5 Transitions ⟵ `c-motion-1` | property, duration, timing function, delay | Live edit duration 0–2s, then tap the button |
| 11.6 Animations | `@keyframes`, iteration, direction, fill mode, and reduced motion | Toggle reduced motion → tap the bug → recap |

## Module 12 · Responsive and Modern CSS · 📱 CSS Pro
| Lesson | Teaches | Screens |
|---|---|---|
| 12.1 Responsive design ⟵ `c-resp-1` | phone first, the viewport tag, a grid view | Resize the screen → quick check |
| 12.2 Media queries | `min-width` breakpoints, orientation, `prefers-color-scheme` | Resize: one column becomes two → tap the bug (`max-width` vs `min-width`) |
| 12.3 Responsive images and video | `max-width: 100%`, `aspect-ratio`, responsive video frames | Before/after at phone width |
| 12.4 Variables ⟵ `c-vars-1` | `:root`, `var()`, overriding, variables in media queries, changing one from JavaScript | Change one variable, the whole page rebrands → match |
| 12.5 Dark mode | light and dark themes with variables | Toggle light/dark |
| 12.6 Modern extras | `@supports`, `@property`, `:has()`, a glance at Sass and frameworks | Swipe |
| 12.7 Clean, fast CSS | short selectors, shorthand, fewer rules, a simple page layout plan | Arrange a tidy stylesheet → recap |
| **Final challenge** ⟵ `c-project` | Style Sharma Classes: variables, phone-first flex and grid, a media query, button states, sticky header, reduced motion, dark mode | Mr Sharma's brief in chat → 4 build steps with live checks at phone and laptop widths |

Each module (1–11) ends with its Challenge: 5 quick questions and 6 tasks mixing copy the look, tap the bug, pick the code, match, swipe and arrange.

---

## Coverage check (W3Schools CSS topic → our lesson)

Syntax, selectors, how to add, comments, errors → 1.2–1.5, 2.1 · Colours (RGB, HEX, HSL, keywords) → 3.1 · Backgrounds (all, multiple, size, origin, clip) → 3.3 · Gradients → 3.4 · Units → 3.5 · Math functions → 3.6 · Opacity → 3.2 · Text, text effects, text shadow → 4.4, 4.5 · Fonts, Google fonts, custom fonts, pairings → 4.1–4.3 · Icons → 4.6 · Borders, rounded corners, border images → 5.4 · Margins, collapse, padding → 5.2 · Height/width, min/max, max-width, box-sizing → 5.3 · Box model → 5.1 · Outline, box shadow → 5.5 · Overflow → 5.6 · Display, visibility, inline-block → 6.1 · Position, offsets → 6.2–6.3 · Z-index → 6.4 · Float, clear → 6.5 · Align → 6.6 · Combinators → 2.2 · Attribute selectors → 2.3 · Inheritance, specificity, !important → 2.4–2.5 · Flexbox (container, items, responsive) → 7.1–7.5 · Grid (container, tracks, gaps, align, items, named, order, 12-column) → 8.1–8.5 · Links, buttons → 9.1 · Lists → 9.2 · Tables → 9.3 · Forms → 9.4 · Navigation bars, dropdowns → 9.5 · Tooltips, pagination, image gallery, multiple columns → 9.6 · Pseudo-classes → 10.1–10.2 · Pseudo-elements → 10.3 · Counters → 10.4 · User interface, accessibility → 10.5 · Image styling, centering, object-fit/position, overlays → 11.1 · Image filters, shapes, masking → 11.2 · 2D/3D transforms → 11.3–11.4 · Transitions, animations → 11.5–11.6 · Responsive (intro, viewport, grid view, media queries, images, videos) → 12.1–12.3 · Variables (all four) → 12.4 · @supports, @property → 12.6 · Optimization, website layout → 12.7, 8.5 · SASS, frameworks → a short look in 12.6.

**Left out on purpose:** image sprites (an old trick, replaced by SVG icons) and the reference pages (they are lookup tables, not lessons; our notes cover them).

## HTML: W3Schools coverage check

The HTML track already covers almost every W3Schools HTML topic (the owner's spec followed the same order). Small gaps, to add into existing lessons when CSS is built:
- **Computer code** (`<code>`, `<kbd>`, `<samp>`, `<var>`, `<pre>`) → add a screen to 2.3 Text formatting.
- **Image maps** and **background images** → add to 4.3 Images.
- **`<colgroup>`** and table styling → add to 5.2 Tables.
Already covered: editors, elements, attributes, headings, paragraphs, styles, formatting, quotations, comments, colours, CSS, links, file paths, images, `<picture>`, favicon, title, tables (colspan/rowspan), lists, block and inline, div, classes, id, buttons, iframes, JavaScript, head, layout, responsive, semantics, style guide, entities, symbols, emojis, charsets, URL encoding, forms and all input types and attributes, canvas, SVG, video, audio, YouTube, web APIs (geolocation, drag and drop, popover, storage, workers, server events), accessibility.

---

## Decisions for you

1. **Size:** 68 CSS lessons (every W3Schools topic) is about twice the earlier draft. Building it takes about 2–3 working sessions. OK, or keep the 35-lesson version and leave the extras for CSS Intermediate?
2. **Riya's Café** for the lessons (links to the Python project): OK?
3. **Two new screens** (Copy the look, Resize the screen): OK?
4. **HTML gap fill** (computer code, image maps, colgroup): add now along with CSS?
5. **Notes:** reuse the current CSS notes for now and write new notes after testing?
