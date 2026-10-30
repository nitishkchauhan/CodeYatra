// CSS Intermediate · Module 2 · Components that fit anywhere.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, copy, explore, lesson, live, mcq, pairs, pickCode, recap, resize, reveal, swipe, tapbug, truth, xray } from './kit';

const BASE = 'body{font-family:system-ui,sans-serif;margin:10px;color:#1F2937}';
const CARD = '<div class="wrap"><article class="card"><img src="dish.svg" alt="Project screenshot"><div><h3>Rosa’s Café site</h3><p>A menu page that works on every phone.</p></div></article></div>';
const CARD_CSS = `${BASE} .wrap{container-type:inline-size;border:2px dashed #C7D2FE;border-radius:12px;padding:6px} .card{display:grid;gap:8px;background:#EEF2FF;border-radius:10px;padding:8px} .card img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px} .card h3{margin:0;font-size:16px} .card p{margin:4px 0 0;font-size:13px}`;

export const CSS_I_M2: Lesson[] = [
  lesson('css-i-2-1', 'Smooth sizes with clamp()', 5, [
    atWork('Arden', ['The portfolio heading looks tiny on laptops and huge on phones.', 'I don’t want five breakpoints for one heading. Make it grow smoothly between a smallest and a largest size.']),
    resize('A heading that grows', 'Tap each width.', { html: '<h1>Hi, I build websites</h1><p>Projects, skills and how to reach me.</p>', css: `${BASE}\nh1 {\n  font-size: clamp(1.6rem, 5vw, 3.2rem);\n  margin: 0;\n}\np {\n  font-size: clamp(1rem, 2vw, 1.25rem);\n}` }, 'clamp(smallest, preferred, largest): the middle value follows the screen; the ends stop it going too far.'),
    live('Try the three values', 'Pick a clamp.', ['h1 { font-size: {{v}}; }'], ['clamp(1.6rem, 5vw, 3.2rem)', 'clamp(1rem, 2vw, 1.5rem)', '5vw', 'clamp(2rem, 10vw, 4rem)'], { html: '<h1>Hi, I build websites</h1>', css: `${BASE} h1{margin:0}`, caption: 'Plain 5vw has no limits: tiny on phones, enormous on wide screens.' }),
    check('In clamp(1rem, 4vw, 2rem), what is the largest size?', ['2rem', '4vw', '1rem', 'There is no limit'], 'The last value is the maximum.', 'smallest, preferred, largest.'),
    tapbug('The heading is never smaller than 3rem', ['h1 { font-size: clamp(3rem, 5vw, 1.5rem); }'], [[1, 'clamp(3rem, 5vw, 1.5rem)', 'clamp(1.5rem, 5vw, 3rem)']], 'The order is smallest, preferred, largest. Swapped, the minimum wins every time.'),
    recap([
      ['🗜', 'clamp(min, preferred, max)'],
      ['📈', 'The preferred value follows the screen (vw)'],
      ['🛑', 'The limits stop it going too far'],
    ]),
  ]),

  lesson('css-i-2-2', 'Container queries', 6, [
    reveal('The idea', [
      ['Media queries', 'Ask “how wide is the screen?”. But a card in a narrow sidebar on a wide screen still needs its narrow layout.', '🖥'],
      ['Container queries', 'Ask “how wide is my box?”. The card changes its own layout wherever it is placed.', '📦'],
      ['Two steps', '1. Mark the parent: container-type: inline-size. 2. Ask: @container (min-width: 400px) { … }.', '🧩'],
    ]),
    resize('A card that adapts to its box', 'Tap each width. When its box is 400px or wider, the picture moves to the side.', { html: CARD, css: `${CARD_CSS}\n@container (min-width: 400px) {\n  .card {\n    grid-template-columns: 160px 1fr;\n    align-items: center;\n  }\n}` }, 'The same card dropped into a sidebar would stay stacked, because its box is narrow there.'),
    explore('Reading it', ['.wrap { container-type: inline-size; }', '@container (min-width: 400px) {', '  .card { grid-template-columns: 160px 1fr; }', '}'], [
      [1, 'Make .wrap a container. inline-size means “measure my width”.', '.wrap'],
      [2, 'Rules inside apply when the nearest container is at least 400px wide.'],
      [3, 'Side by side: picture, then text.', '.card'],
    ], { page: { html: CARD, css: CARD_CSS }, minTaps: 3 }),
    truth([
      ['Container queries look at the screen width', false, 'They look at the container’s width.'],
      ['The parent needs container-type set', true, 'Otherwise there is no container to ask.'],
      ['The same card can look different in a sidebar and in main', true, 'That is the point.'],
    ]),
    check('Which line makes an element a container?', ['container-type: inline-size;', 'display: container;', '@container: on;', 'position: container;'], 'Then @container rules inside can ask about it.', 'container-type.'),
    recap([
      ['📦', 'container-type: inline-size on the parent'],
      ['❓', '@container (min-width: …) asks about the box'],
      ['🧩', 'Components that fit anywhere'],
    ]),
  ]),

  lesson('css-i-2-3', 'Media in shape', 4, [
    live('Keep the shape', 'Tap a ratio for the screenshot.', ['.shot { aspect-ratio: {{v}}; object-fit: cover; }'], ['16 / 9', '4 / 3', '1', '3 / 4'], { html: '<img class="shot" src="dish.svg" alt="Project screenshot">', css: `${BASE} .shot{width:100%;border-radius:10px}`, caption: 'aspect-ratio sets the shape; object-fit: cover fills it without stretching.' }),
    copy('Match the project tiles', 'Square tiles that crop neatly.', '<div class="row"><img src="dish.svg" alt="Project one"><img src="banner.svg" alt="Project two"><img src="portrait.svg" alt="Project three"></div>', `${BASE}\n.row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }\n.row img { width: 100%; border-radius: 8px; }\n.row img {\n  aspect-ratio: {{0}};\n  object-fit: {{1}};\n}`, [
      ['aspect-ratio', ['auto', '16 / 9', '1'], '1'],
      ['object-fit', ['fill', 'contain', 'cover'], 'cover'],
    ]),
    check('Which stops a photo stretching when its box has a different shape?', ['object-fit: cover', 'aspect-ratio: auto', 'width: 100%', 'height: 100%'], 'cover crops instead of stretching.', 'fit the object.'),
    tapbug('The screenshot is squashed', ['.shot { aspect-ratio: 16 / 9; object-fit: stretch; }'], [[1, 'stretch', 'cover']], 'stretch isn’t an object-fit value, so the default (fill) stretches the picture. cover crops neatly.'),
    truth([
      ['aspect-ratio keeps a box’s shape at any width', true, 'Width changes, the shape stays.'],
      ['object-fit: cover can crop the picture’s edges', true, 'It fills the box.'],
      ['object-fit works on any div', false, 'It is for replaced elements like img and video.'],
    ]),
    recap([
      ['📐', 'aspect-ratio keeps a shape at any width'],
      ['✂️', 'object-fit: cover crops instead of stretching'],
      ['🖼', 'Tidy tiles for galleries and cards'],
    ]),
  ]),

  challenge('css-i-2-ch', 'Module 2 Challenge', { icon: '📦', name: 'Fit Anywhere' }, ['Size text smoothly with clamp()', 'Change a component’s layout with container queries', 'Keep media in shape with aspect-ratio and object-fit'], [
    mcq(1, 'What are the three values of clamp()?', ['Smallest, preferred, largest', 'Largest, smallest, step', 'Width, height, ratio', 'Start, end, speed'], 'In that order.'),
    mcq(2, 'A container query asks about…', ['The container’s size', 'The screen size', 'The font size', 'The device type'], 'Its box, not the screen.'),
    mcq(3, 'Which marks an element as a container?', ['container-type: inline-size', 'contain: layout', 'display: container', 'position: relative'], 'container-type.', { mono: true }),
    mcq(4, 'What does aspect-ratio: 16 / 9 do?', ['Keeps a 16:9 shape at any width', 'Makes it 16px by 9px', 'Zooms to 169%', 'Nothing on images'], 'A fixed shape.'),
    mcq(5, 'Which object-fit value shows the whole picture, maybe with gaps?', ['contain', 'cover', 'fill', 'none'], 'contain fits it all in.', { mono: true }),
    swipe([
      ['5vw on its own can be tiny on phones', true, 'That’s why clamp adds limits.'],
      ['Container queries need media queries to work', false, 'They are separate.'],
      ['object-fit: cover can crop the edges', true, 'It fills the box.'],
      ['clamp(3rem, 5vw, 1rem) is correct', false, 'The minimum must come first.'],
    ]),
    pairs([['clamp()', 'Grow between limits'], ['@container', 'Ask about the box'], ['aspect-ratio', 'Keep a shape'], ['object-fit', 'Crop or fit media']], 'Tools for components that fit anywhere.'),
    pickCode('Which puts the card’s picture beside the text when its box is 400px or wider?', ['@container (min-width: 400px) { .card { grid-template-columns: 160px 1fr; } }', '@media (container: 400px) { .card { … } }', '.card:container(400px) { … }', '@container 400px { … }'], '@container with a condition in brackets.'),
    bugTask(['.wrap { container: inline-size; }', 'h1 { font-size: clamp(2rem, 4vw); }'], [[1, 'container: inline-size', 'container-type: inline-size'], [2, 'clamp(2rem, 4vw)', 'clamp(2rem, 4vw, 3rem)']], 'The property is container-type, and clamp() needs all three values.'),
    xray(
      { html: `<h1 class="big">Hi, I build websites</h1>${CARD}`, css: `${CARD_CSS} .big{font-size:clamp(1.4rem,5vw,2.6rem);margin:0 0 8px}` },
      [
        ['.big', 'The heading that grows with the screen', 'clamp()', ['clamp()', 'font-size: 5vw only', '@container']],
        ['.wrap', 'The dashed box the card measures', 'container-type: inline-size', ['container-type: inline-size', 'position: relative', 'display: flex']],
        ['img', 'The picture that keeps its shape', 'aspect-ratio + object-fit', ['aspect-ratio + object-fit', 'height: 100%', 'float']],
      ],
    ),
    arrange(['.wrap {\n  container-type: inline-size;\n}', '.card {\n  display: grid;\n}', '@container (min-width: 400px) {\n  .card { grid-template-columns: 160px 1fr; }\n}'], 'make the wrapper a container, make the card a grid, then add the wide layout', CARD_CSS.replace('.wrap{container-type:inline-size;', '.wrap{').replace('.card{display:grid;', '.card{'), CARD),
  ]),
];
