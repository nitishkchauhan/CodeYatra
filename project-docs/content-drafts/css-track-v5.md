# CSS track: Lesson v5 · content draft

**Status:** draft for owner review, 29 Oct 2026. Nothing here is in the app yet. Replaces `css-basic.md` (v3 draft); its examples and project are reused.

**Same shape as the HTML track (built):** 9 modules of short lessons (3–5 min each), each module ending in a **Module Challenge** (5 quick questions + 6 tasks, 1–3 stars, a badge). Same screens as HTML (chat, tap to reveal, explore, tap to place, toggle, before/after, live edit, quick check, tap the bug, recap, swipe, match, pick the code, X-ray, arrange) plus **two new CSS screens**:

- **Copy the look:** a small target picture at the top, the learner's live page below. They change values (chips or a slider) until the two match; it ticks when every value is right. Turns "read about padding" into "make it look like this".
- **Resize the screen:** a slider changes the preview width from phone (360px) to laptop (1200px). Media queries switch on and off as you drag, and a ruler shows the width. Used in the responsive lessons.

**X-ray, CSS version:** on the box model it peels a box into content, padding, border and margin; tap each layer to name it.

**Story thread:** the learner styles **Riya's Café** (Pune; tea, coffee, toast, sandwich), the same café as the Python billing project. The final challenge styles **Sharma Classes** (Jaipur), from the old project. Every value is real CSS, checked in tests (the starter fails, the answer passes).

**Progress kept:** the 13 old CSS ids are reused (marked ⟵ below), so learners keep progress, notes and practice sets.

---

## Module 1 · Getting Started · badge 🎨 First Style
| Lesson | What it teaches | Screens |
|---|---|---|
| 1.1 What is CSS? ⟵ `w-css-1` | HTML = what things are, CSS = how they look | Chat (Riya: "my menu looks like a form from 1995") → before/after of the plain and styled menu → quick check |
| 1.2 Your first rule | selector { property: value; } | Explore (tap selector, property, value) → tap to place `color`, `:`, `;` → live edit the heading colour |
| 1.3 Three ways to add CSS | inline, `<style>`, a linked file; why a file wins | Tap to reveal the three → match each to its code → swipe true/false |
| 1.4 The cascade | the later rule wins; comments | Toggle two rules on and off and watch which wins → tap the bug (missing `;` kills both lines) → recap |
| **Challenge** | | 5 questions · match parts of a rule · pick the code · tap the bug · copy the look (heading colour and background) · arrange a stylesheet |

## Module 2 · Selectors · badge 🎯 Sharp Shooter
| Lesson | What it teaches | Screens |
|---|---|---|
| 2.1 Element, class, id ⟵ `c-sel-1` | `p`, `.price`, `#menu` | Explore (tap a selector, the matching items light up) → tap to place → quick check |
| 2.2 Groups and children | `h1, h2` and `.menu li` | Live edit: choose the selector, see what gets styled → swipe |
| 2.3 Which rule wins? | specificity: id > class > element; `!important` as a last resort | **Scoreboard:** two rules face off, guess the winner, then the page shows it → tap the bug |
| 2.4 Inherited styles | colour and font flow down, borders don't | Toggle `color` on the body and watch the children → recap |
| **Challenge** | | 5 questions · match selector → what it picks · X-ray (tap an item, name the selector that styles it) · pick the code · tap the bug · arrange |

## Module 3 · Colours and Units · badge 🌈 Colour Mixer
| Lesson | What it teaches | Screens |
|---|---|---|
| 3.1 Colours ⟵ `c-units` | names, hex, rgb, transparency | Live edit with three sliders (red, green, blue) mixing the café's brand colour → match hex to colour |
| 3.2 Sizes | px, %, rem, em | Live edit: change the root font size, watch rem text grow and px text stay → quick check |
| 3.3 Screen units and max-width | vw, vh, `max-width` keeps lines readable | Resize the screen with `max-width` on and off → recap |
| **Challenge** | | 5 questions · copy the look (brand colours) · swipe · pick the code · tap the bug (`#FF55` is not a colour) · arrange |

## Module 4 · Text · badge 🔤 Type Setter
| Lesson | What it teaches | Screens |
|---|---|---|
| 4.1 Fonts ⟵ `c-text-1` | `font-family` and fallbacks | Toggle fonts on the menu → tap to place a font stack |
| 4.2 Size, weight, line height | readable body text | Live edit `line-height` from 1 to 2 (find the comfortable one) → copy the look |
| 4.3 Align and decorate | `text-align`, `text-decoration`, `text-transform`, `letter-spacing` | Before/after → match property → effect → recap |
| **Challenge** | | 5 questions · copy the look (a menu card) · pick the code · tap the bug (`font-weight: heavy`) · swipe · arrange |

## Module 5 · The Box Model · badge 📦 Box Master
| Lesson | What it teaches | Screens |
|---|---|---|
| 5.1 Every element is a box ⟵ `c-box-1` | content, padding, border, margin | **Box X-ray:** the box peels into layers; tap and name each → quick check |
| 5.2 Padding and margin | inside space vs outside space; shorthand order (top, right, bottom, left) | Live edit sliders for padding and margin → copy the look |
| 5.3 box-sizing | why `border-box` stops width surprises | Toggle `content-box` / `border-box` with the width shown → tap the bug |
| 5.4 Borders, corners, shadows | `border`, `border-radius`, `box-shadow` | Live edit the radius from square to pill → recap |
| 5.5 Block and inline | `display: block / inline / inline-block / none` | Toggle display on menu items → swipe |
| **Challenge** | | 5 questions · box X-ray · copy the look (a card with padding, border, radius, shadow) · pick the code · tap the bug · arrange |

## Module 6 · Flexbox · badge 💪 Flex Pro
| Lesson | What it teaches | Screens |
|---|---|---|
| 6.1 Lining things up ⟵ `c-flex-1` | `display: flex`, `flex-direction` | Before/after of the café header → explore the main axis |
| 6.2 Spread along the line | `justify-content` | Live edit chips (start, center, space-between, space-around) → copy the look |
| 6.3 Across the line | `align-items`, `gap` | Live edit → quick check |
| 6.4 Wrap and grow | `flex-wrap`, `flex: 1` | Resize the screen: cards wrap as it narrows → tap the bug → recap |
| **Challenge** | | 5 questions · copy the look ×2 (a nav bar, centred content) · match · pick the code · tap the bug · arrange |

## Module 7 · Grid and Positioning · badge 🧱 Layout Builder
| Lesson | What it teaches | Screens |
|---|---|---|
| 7.1 Grid basics ⟵ `c-grid-1` | `grid-template-columns`, `fr`, `gap` | Live edit the column count from 1 to 4 → tap to place |
| 7.2 Grids that fit any screen | `repeat(auto-fill, minmax(…))` | Resize the screen: the menu grid reflows → quick check |
| 7.3 Moving things ⟵ `c-pos-1` | `position: relative / absolute` | Toggle position on a "New" sticker on a menu card → explore |
| 7.4 Fixed, sticky, layers | `fixed`, `sticky`, `z-index` | Scroll the preview with a sticky header → swipe → recap |
| **Challenge** | | 5 questions · copy the look (a 3-column menu) · X-ray (which layout makes this?) · pick the code · tap the bug · arrange |

## Module 8 · States and Responsive Design · badge 📱 Screen Shifter
| Lesson | What it teaches | Screens |
|---|---|---|
| 8.1 Hover and focus ⟵ `c-pseudo` | `:hover`, `:focus-visible`, why focus matters | Tap the live button to see its states → tap to place |
| 8.2 Pick by position, add decorations | `:nth-child`, `::before` | Live edit `nth-child(odd/even/3)` on a price table → quick check |
| 8.3 Media queries ⟵ `c-resp-1` | phone first, `min-width` | Resize the screen: one column becomes two → tap the bug (`max-width` vs `min-width`) |
| 8.4 Flexible images and the viewport tag | `max-width: 100%`, `<meta name="viewport">` | Before/after on a phone width → recap |
| **Challenge** | | 5 questions · resize task (make it two columns from 700px) · copy the look · swipe · tap the bug · arrange |

## Module 9 · Motion and Tidy CSS · badge 🏆 CSS Pro
| Lesson | What it teaches | Screens |
|---|---|---|
| 9.1 Transitions ⟵ `c-motion-1` | smooth hover changes, timing | Live edit duration from 0 to 2s, then tap the button → quick check |
| 9.2 Animations | `@keyframes`, and `prefers-reduced-motion` for people who need less movement | Toggle reduced motion → tap to place |
| 9.3 Variables ⟵ `c-vars-1` | `:root { --brand }`, `var()` | Change one variable, the whole page rebrands → match |
| 9.4 Dark mode | `prefers-color-scheme` with variables | Toggle light/dark → recap |
| **Final challenge** ⟵ `c-project` | Style Sharma Classes: variables, phone-first flex and grid, a media query, button states, sticky header, reduced motion and dark mode | Mr Sharma's brief in chat → 4 build steps with live checks at phone and laptop widths (from the old project) |

---

## Decisions for you

1. **Riya's Café** for the lessons (links CSS to the Python project), or keep **Riya's Tiffins** from the old draft? I suggest the café: one story across tracks.
2. **Two new screens** (Copy the look, Resize the screen): about a day of work, and the main thing that makes CSS feel hands-on rather than read-and-tap. I suggest yes.
3. **35 lessons + 9 challenges.** I folded Grid and Positioning into one module, and States and Responsive into another, to keep 9 modules like HTML. Or keep 12 small modules (one per old topic)?
4. **Notes:** reuse the current CSS notes for now (as HTML does), and write v5 notes after both tracks are tested.
