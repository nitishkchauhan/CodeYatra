// Extra practice for each CSS module.
import { bug, order, quiz } from '../dsl';
import type { Step } from '../types';

const K = 'PRACTICE · CSS';

export const CSS_DRILLS: Record<string, Step[]> = {
  'w-css-1': [
    quiz({ prompt: 'In p { color: navy; }, what is p?', options: ['The selector', 'The property', 'The value', 'The declaration'], right: 'Right. The selector says which elements to style.', wrong: 'p is the selector; color is the property and navy the value.' }),
    quiz({ prompt: 'Where does <link rel="stylesheet" href="style.css"> go?', options: ['Inside <head>', 'At the end of <body>', 'Inside the CSS file', 'Before <!DOCTYPE html>'], right: 'Right. Stylesheets load from the head.', wrong: 'Links to stylesheets belong in <head>.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The heading isn’t navy. Tap the buggy line.', lang: 'css', lines: ['h1 {', '  color = navy;', '}'], bug: 1, fix: '  color: navy;', explain: 'Declarations use a colon between property and value.' }),
    order({ kicker: K, title: 'Put it in order', instructions: 'Arrange a rule for .note.', lang: 'css', lines: ['.note {', '  background: #FFF8EC;', '  padding: 12px;', '}'], explain: 'Selector and brace, declarations, closing brace.' }),
  ],
  'c-sel-1': [
    quiz({ prompt: 'Which selects the element with id="fees"?', options: ['#fees', '.fees', 'fees', '*fees'], right: 'Right. # is for ids, . for classes.', wrong: 'Ids use #, classes use a dot.', mono: true }),
    quiz({ prompt: 'What does ul > li select?', options: ['Only li elements that are direct children of a ul', 'Every li anywhere on the page', 'The ul after an li', 'Both ul and li'], right: 'Right. > means direct child.', wrong: '> is the child combinator: only direct children match.', mono: true }),
    quiz({ prompt: 'Which is most specific?', options: ['#intro', '.note.big', 'section p', 'p'], right: 'Right. One id outweighs any number of classes.', wrong: 'Ids weigh more than classes, which weigh more than types.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'Both h1 and h2 should be indigo. Tap the buggy line.', lang: 'css', lines: ['h1 h2 {', '  color: #4B3FD8;', '}'], bug: 0, fix: 'h1, h2 {', explain: 'A space means “h2 inside h1”. Group selectors with a comma.' }),
  ],
  'c-units': [
    quiz({ prompt: 'If the root font size is 16px, how big is 1.5rem?', options: ['24px', '15px', '1.5px', '16px'], right: 'Right: 1.5 × 16.', wrong: 'rem multiplies the root size: 1.5 × 16 = 24px.', mono: true }),
    quiz({ prompt: 'What does 50vw mean?', options: ['Half the width of the screen', 'Half the parent’s width', '50 pixels', 'Half the font size'], right: 'Right. vw is 1% of the viewport width.', wrong: 'vw units are percentages of the screen (viewport) width.', mono: true }),
    quiz({ prompt: 'Which colour is semi-transparent?', options: ['rgb(0 0 0 / 0.5)', '#000000', 'rgb(0 0 0)', 'black'], right: 'Right. The / 0.5 sets the opacity.', wrong: 'The value after the slash is alpha (transparency).', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The margin is ignored. Tap the buggy line.', lang: 'css', lines: ['.card {', '  margin: 12 px;', '}'], bug: 1, fix: '  margin: 12px;', explain: 'No space between a number and its unit.' }),
  ],
  'c-text-1': [
    quiz({ prompt: 'Which font-weight is bold?', options: ['700', '400', '100', '1'], right: 'Right. 400 is normal, 700 bold.', wrong: 'Weights go from 100 (thin) to 900; 700 is bold.', mono: true }),
    quiz({ prompt: 'What does max-width: 65ch do for a paragraph?', options: ['Keeps lines to about 65 characters', 'Sets 65 lines per page', 'Makes the font 65px', 'Adds 65 spaces'], right: 'Right. ch is the width of a “0”.', wrong: 'ch units follow character width, so 65ch keeps lines readable.', mono: true }),
    quiz({ prompt: 'Which alignment is easiest to read for long paragraphs?', options: ['Left', 'Center', 'Right', 'Justify on phones'], right: 'Right. Every line starts in the same place.', wrong: 'Left-aligned text gives a steady starting edge; centre only short lines.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The fallback font never applies. Tap the buggy line.', lang: 'css', lines: ['body {', '  font-family: "Noto Sans" sans-serif;', '}'], bug: 1, fix: '  font-family: "Noto Sans", sans-serif;', explain: 'Separate fonts in the list with commas.' }),
  ],
  'c-box-1': [
    quiz({ prompt: 'Which space is inside the border?', options: ['padding', 'margin', 'outline', 'gap'], right: 'Right. Margin is outside the border.', wrong: 'Padding is inside the border; margin pushes other boxes away.', mono: true }),
    quiz({ prompt: 'padding: 10px 20px; sets…', options: ['10px top and bottom, 20px left and right', '10px left, 20px right', '10px on all sides', '20px top only'], right: 'Right. Two values: vertical, then horizontal.', wrong: 'With two values, the first is top/bottom and the second left/right.', mono: true }),
    quiz({ prompt: 'Which is an inline element by default?', options: ['<span>', '<div>', '<p>', '<section>'], right: 'Right. span sits inside a line of text.', wrong: 'div, p and section are block elements; span is inline.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The card should be exactly 300px wide including padding. Tap the buggy line.', lang: 'css', lines: ['.card {', '  box-sizing: content-box;', '  width: 300px;', '  padding: 20px;', '}'], bug: 1, fix: '  box-sizing: border-box;', explain: 'border-box includes padding and border in the width.' }),
  ],
  'c-flex-1': [
    quiz({ prompt: 'Which puts space between a logo and a menu at opposite ends?', options: ['justify-content: space-between', 'align-items: stretch', 'flex-wrap: wrap', 'gap: 0'], right: 'Right. Extra space goes between the items.', wrong: 'space-between pushes the first and last items to the ends.', mono: true }),
    quiz({ prompt: 'With flex-direction: column, justify-content works…', options: ['Vertically', 'Horizontally', 'Not at all', 'Diagonally'], right: 'Right. The main direction is now top to bottom.', wrong: 'justify follows the main direction, which a column turns vertical.' }),
    quiz({ prompt: 'What does flex: 1 do on an item?', options: ['Lets it grow to fill spare space', 'Makes it 1px wide', 'Hides it', 'Puts it first'], right: 'Right.', wrong: 'flex: 1 lets the item grow into the free space.', mono: true }),
    order({ kicker: K, title: 'Put it in order', instructions: 'Arrange a wrapping row of cards.', lang: 'css', lines: ['.cards {', '  display: flex;', '  flex-wrap: wrap;', '  gap: 12px;', '}'], explain: 'Flex container, allow wrapping, add the gap.' }),
  ],
  'c-grid-1': [
    quiz({ prompt: 'How many columns does repeat(4, 1fr) make?', options: ['4 equal columns', '1 column', '4px columns', '1 column of 4fr'], right: 'Right.', wrong: 'repeat(4, 1fr) writes 1fr four times: four equal columns.', mono: true }),
    quiz({ prompt: 'What does grid-column: span 2 do?', options: ['Makes the item two columns wide', 'Moves it to column 2', 'Adds two new columns', 'Makes two copies'], right: 'Right.', wrong: 'span 2 stretches the item across two columns.', mono: true }),
    quiz({ prompt: 'What is minmax(180px, 1fr) for?', options: ['Columns at least 180px wide that share extra space', 'Exactly 180px columns', 'A maximum of 180 columns', 'A 1px border'], right: 'Right. Combined with auto-fill it adapts to the screen.', wrong: 'minmax sets a minimum (180px) and a maximum (1fr) size.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The items don’t form columns. Tap the buggy line.', lang: 'css', lines: ['.gallery {', '  display: block;', '  grid-template-columns: repeat(3, 1fr);', '}'], bug: 1, fix: '  display: grid;', explain: 'grid-template-columns only works on a grid container.' }),
  ],
  'c-pos-1': [
    quiz({ prompt: 'Which stays in the same spot on screen while you scroll?', options: ['position: fixed', 'position: relative', 'position: static', 'position: absolute'], right: 'Right.', wrong: 'fixed attaches the element to the screen itself.', mono: true }),
    quiz({ prompt: 'An absolute element is placed relative to…', options: ['Its nearest positioned ancestor', 'The previous element', 'Always the screen', 'Its first child'], right: 'Right. Usually a parent with position: relative.', wrong: 'It looks up for the nearest ancestor with a position other than static.' }),
    quiz({ prompt: 'What does inset: 0 do on a fixed overlay?', options: ['Sets top, right, bottom and left to 0 so it covers the screen', 'Removes the padding', 'Hides it', 'Centres the text'], right: 'Right. It is shorthand for all four sides.', wrong: 'inset sets top, right, bottom and left together.', mono: true }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The header should stick at the top while scrolling. Tap the buggy line.', lang: 'css', lines: ['header {', '  position: sticky;', '  z-index: 10;', '}'], bug: 1, fix: '  position: sticky; top: 0;', explain: 'sticky needs a threshold like top: 0 to know when to stick.' }),
  ],
  'c-pseudo': [
    quiz({ prompt: 'Which shows a focus ring for keyboard users but not mouse clicks?', options: [':focus-visible', ':hover', ':active', ':visited'], right: 'Right.', wrong: ':focus-visible matches when the browser decides focus should be shown, such as keyboard use.', mono: true }),
    quiz({ prompt: 'What does li:last-child select?', options: ['The last li in its list', 'Every li but the last', 'The first li', 'The list itself'], right: 'Right.', wrong: ':last-child matches an element that is the last child of its parent.', mono: true }),
    quiz({ prompt: 'Should important text go in ::before content?', options: ['No, it is for decoration; put real text in the HTML', 'Yes, always', 'Only headings', 'Only on phones'], right: 'Right. It can’t be selected and may be skipped by assistive tech.', wrong: 'Generated content is for decoration, not information.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The button should change colour on hover. Tap the buggy line.', lang: 'css', lines: ['.btn : hover {', '  background: #E68A00;', '}'], bug: 0, fix: '.btn:hover {', explain: 'No spaces around the colon in a pseudo-class.' }),
  ],
  'c-resp-1': [
    quiz({ prompt: 'When does @media (min-width: 40rem) apply?', options: ['When the screen is 40rem wide or wider', 'Only on phones', 'Below 40rem', 'Always'], right: 'Right.', wrong: 'min-width queries apply from that width upward.', mono: true }),
    quiz({ prompt: 'Where should breakpoints come from?', options: ['Where your layout starts to look stretched or cramped', 'A list of popular phone models', 'Always 768px', 'Random numbers'], right: 'Right. Let the content decide.', wrong: 'Choose breakpoints where the design needs them, not for particular devices.' }),
    quiz({ prompt: 'Why add height: auto with max-width: 100% on images?', options: ['It keeps the image’s shape as it shrinks', 'It makes the image taller', 'It hides tall images', 'It is required syntax'], right: 'Right. Otherwise a set height would squash it.', wrong: 'height: auto keeps the aspect ratio while the width shrinks.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The two-column rule never applies. Tap the buggy line.', lang: 'css', lines: ['@media min-width: 40rem {', '  .cards { grid-template-columns: 1fr 1fr; }', '}'], bug: 0, fix: '@media (min-width: 40rem) {', explain: 'Media features go inside brackets.' }),
  ],
  'c-motion-1': [
    quiz({ prompt: 'A good duration for a hover transition is about…', options: ['150 to 300ms', '3 seconds', '10ms', '1 minute'], right: 'Right. Quick enough to feel responsive.', wrong: 'Short transitions feel snappy; long ones feel sluggish.' }),
    quiz({ prompt: 'What does animation: spin 1s linear infinite do?', options: ['Runs the spin keyframes every second, forever', 'Spins once and stops', 'Waits 1s then hides', 'Nothing without JavaScript'], right: 'Right.', wrong: 'Name, duration, timing and repeat count: spin, 1s, linear, infinite.', mono: true }),
    quiz({ prompt: 'Which media query respects people who prefer less movement?', options: ['(prefers-reduced-motion: reduce)', '(motion: off)', '(max-motion: 0)', '(prefers-static)'], right: 'Right.', wrong: 'The feature is prefers-reduced-motion.', mono: true }),
    order({ kicker: K, title: 'Put it in order', instructions: 'Arrange a fade-in animation.', lang: 'css', lines: ['@keyframes fade {', '  from { opacity: 0; }', '  to { opacity: 1; }', '}', '.toast { animation: fade 0.3s ease; }'], explain: 'Define the keyframes, then apply them with animation.' }),
  ],
  'c-vars-1': [
    quiz({ prompt: 'How do you use a custom property called --gap?', options: ['var(--gap)', '--gap()', '$gap', 'use(--gap)'], right: 'Right.', wrong: 'Read a custom property with var().', mono: true }),
    quiz({ prompt: 'What does var(--brand, #4B3FD8) do if --brand is not defined?', options: ['Uses #4B3FD8 as a fallback', 'Throws an error', 'Uses black', 'Removes the rule'], right: 'Right. The second value is the fallback.', wrong: 'The value after the comma is used when the variable is missing.', mono: true }),
    quiz({ prompt: 'Why define spacing as a few variables like --space-2 and --space-3?', options: ['The design stays consistent and easy to change', 'Browsers require it', 'It makes pages load faster', 'Variables are shorter to type'], right: 'Right.', wrong: 'A small scale keeps spacing consistent and changeable in one place.' }),
    bug({ kicker: K, title: 'Find the bug', instructions: 'The button colour doesn’t apply. Tap the buggy line.', lang: 'css', lines: [':root { --brand: #4B3FD8; }', '.btn { background: var(brand); }'], bug: 1, fix: '.btn { background: var(--brand); }', explain: 'Keep the two dashes when you read the variable.' }),
  ],
};
