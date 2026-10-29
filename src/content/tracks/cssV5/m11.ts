// CSS track · Module 11 · Images, Effects and Motion. Lesson 11.5 keeps the old motion module id (c-motion-1).
// Motion demos use a checkbox the learner taps inside the preview, so they work on phones (no hover needed).
import type { Lesson } from '../../types';
import { BASE } from './cafe';
import { arrange, beforeAfter, bugTask, challenge, chat, check, copy, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const PHOTO = '<img class="photo" src="dish.svg" alt="Cheese toast on a plate">';
const PHOTO_CSS = `${BASE} .photo { width: 160px; height: 160px; border: 3px solid #E5D3B3; background: #FFF8EC; }`;
/** Tap the switch in the preview: the box moves with the transition being taught. */
const SWITCH = '<label class="sw"><input type="checkbox"> Tap to move</label>\n<div class="box">☕</div>';
const SWITCH_CSS = `${BASE} .sw { display: inline-block; padding: 8px 12px; border: 2px solid #E5D3B3; border-radius: 10px; margin-bottom: 14px; font-weight: bold; } .box { width: 60px; height: 60px; display: grid; place-items: center; font-size: 28px; background: #FFF1D6; border-radius: 12px; } .sw:has(input:checked) + .box { transform: translateX(180px) rotate(20deg); background: #FDBA74; }`;

export const CSS_M11: Lesson[] = [
  lesson('css-11-1', 'Styling images', 6, [
    chat(['Rosa’s photos come in every shape: wide, tall, square. Her menu cards need them all the same size.', 'Stretching them looks awful. object-fit crops them neatly instead.']),
    live('object-fit', 'A wide photo in a square box. Tap a value.', ['.photo { object-fit: {{v}}; }'], ['fill', 'cover', 'contain', 'none', 'scale-down'], { html: PHOTO, css: PHOTO_CSS, caption: 'fill (the default) stretches. cover fills and crops. contain shows it all with gaps.' }),
    live('object-position', 'With cover, choose which part stays in view.', ['.photo { object-fit: cover; object-position: {{v}}; }'], ['center', 'left', 'right', '20% 80%'], { html: PHOTO, css: PHOTO_CSS }),
    toggle('Shapes and centring', [
      ['Rounded', ['.photo { border-radius: 16px; }'], 'Soft corners.', { html: PHOTO, css: `${PHOTO_CSS} .photo { object-fit: cover; border-radius: 16px; }` }],
      ['Circle', ['.photo { border-radius: 50%; }'], 'A square with 50% radius becomes a circle, good for profile photos.', { html: '<img class="photo" src="portrait.svg" alt="Rosa">', css: `${PHOTO_CSS} .photo { object-fit: cover; border-radius: 50%; }` }],
      ['Centred', ['.photo { display: block;', '  margin: 0 auto; }'], 'An image is inline; make it a block, then auto margins centre it.', { html: PHOTO, css: `${PHOTO_CSS} .photo { object-fit: cover; display: block; margin: 0 auto; }` }],
    ]),
    explore('A caption over the photo', ['.frame { position: relative; }', '.frame .cap {', '  position: absolute; inset: auto 0 0 0;', '  background: rgb(0 0 0 / 0.55);', '}'], [
      [1, 'The frame is the positioned parent.', '.frame'],
      [3, 'The caption sits on the bottom edge, full width.', '.cap'],
      [4, 'A see-through dark strip keeps white text readable on any photo.', '.cap'],
    ], { page: { html: '<div class="frame"><img src="dish.svg" alt="Cheese toast"><p class="cap">Cheese Toast · ₹80</p></div>', css: `${BASE} .frame { position: relative; width: 240px; } .frame img { width: 100%; display: block; border-radius: 12px; } .frame .cap { position: absolute; inset: auto 0 0 0; margin: 0; padding: 8px; color: white; background: rgb(0 0 0 / 0.55); border-radius: 0 0 12px 12px; }` }, minTaps: 3 }),
    check('Which fills a box with a photo without stretching it?', ['object-fit: cover', 'object-fit: fill', 'width: 100%; height: 100%;', 'background-size: stretch'], 'cover keeps the shape and crops the extra.', 'fill is the stretchy default.'),
    recap([
      ['🖼', 'object-fit: cover fills without stretching'],
      ['🎯', 'object-position picks the part to keep'],
      ['⭕', 'border-radius: 50% makes round photos'],
    ]),
  ]),

  lesson('css-11-2', 'Filters, shapes and masks', 5, [
    live('Filters', 'Tap a filter.', ['.photo { filter: {{v}}; }'], ['none', 'grayscale(1)', 'blur(3px)', 'brightness(1.3)', 'sepia(0.8)', 'contrast(1.6)'], { html: PHOTO, css: `${PHOTO_CSS} .photo { object-fit: cover; border-radius: 12px; }`, caption: 'Filters can be combined: filter: grayscale(1) blur(1px);' }),
    live('Cut a shape', 'clip-path keeps only the shape you draw.', ['.photo { clip-path: {{v}}; }'], ['none', 'circle(45%)', 'polygon(50% 0, 100% 100%, 0 100%)', 'inset(10% round 20px)'], { html: PHOTO, css: `${PHOTO_CSS} .photo { object-fit: cover; border: 0; }` }),
    beforeAfter(
      'Fade an edge with a mask',
      [['.photo { }'], 'A hard bottom edge.', { html: PHOTO, css: `${PHOTO_CSS} .photo { object-fit: cover; border: 0; }` }],
      [['.photo {', '  mask-image: linear-gradient(black 60%, transparent);', '}'], 'Where the mask is black, the photo shows; where it is transparent, it fades away.', { html: PHOTO, css: `${PHOTO_CSS} .photo { object-fit: cover; border: 0; -webkit-mask-image: linear-gradient(black 60%, transparent); mask-image: linear-gradient(black 60%, transparent); }` }],
    ),
    matchUp('Match the effect', [['grayscale(1)', 'Black and white'], ['blur(4px)', 'Out of focus'], ['circle(50%)', 'Round crop'], ['mask-image', 'Fade with a gradient']], 'Filters change colours; clip-path and masks change the shape.'),
    tapbug('The photo isn’t grey', ['.photo {', '  grayscale: 1;', '}'], [[2, 'grayscale: 1;', 'filter: grayscale(1);']], 'grayscale is a function inside the filter property, not a property of its own.'),
    recap([
      ['🎞', 'filter: grayscale, blur, brightness, sepia…'],
      ['✂️', 'clip-path cuts a shape'],
      ['🌫', 'mask-image fades with a gradient'],
    ]),
  ]),

  lesson('css-11-3', '2D transforms', 5, [
    live('Move, turn, grow', 'Tap a transform.', ['.box { transform: {{v}}; }'], ['none', 'translate(60px, 20px)', 'rotate(30deg)', 'scale(1.5)', 'skew(20deg)', 'translateX(40px) rotate(-15deg)'], { html: '<div class="box">☕</div>', css: `${BASE} .box { width: 70px; height: 70px; margin: 30px; display: grid; place-items: center; font-size: 30px; background: #FFF1D6; border: 2px solid #C2410C; border-radius: 12px; }`, caption: 'A transform doesn’t move the other boxes around it. They act as if it hadn’t moved.' }),
    live('transform-origin', 'The point it turns around.', ['.box { transform: rotate(45deg); transform-origin: {{v}}; }'], ['center', 'top left', 'bottom right'], { html: '<div class="box">☕</div>', css: `${BASE} .box { width: 70px; height: 70px; margin: 40px; display: grid; place-items: center; font-size: 30px; background: #FFF1D6; border: 2px solid #C2410C; border-radius: 12px; }` }),
    reveal('Transform functions', [
      ['translate(x, y)', 'Slide. Smooth to animate.'],
      ['rotate(30deg)', 'Turn. Positive is clockwise.'],
      ['scale(1.2)', 'Grow (or shrink below 1).'],
      ['skew(10deg)', 'Slant.'],
      ['matrix(…)', 'All of them in six numbers. Mostly written by tools, not people.'],
    ], { mono: true }),
    copy('Tilt the sale tag', 'Match the tilted, bigger tag.', '<span class="tag">SALE</span>', `${BASE}\n.tag { display: inline-block; margin: 30px; padding: 8px 16px; background: #C2410C; color: white; font-weight: bold; border-radius: 8px; }\n.tag {\n  transform: rotate({{0}}) scale({{1}});\n}`, [
      ['rotate', ['0deg', '-12deg', '45deg'], '-12deg'],
      ['scale', ['1', '0.8', '1.4'], '1.4'],
    ]),
    check('Which slides an element 20px to the right?', ['transform: translateX(20px)', 'transform: rotate(20px)', 'transform: scale(20px)', 'move: 20px'], 'translate slides; X is sideways.', 'Slide = translate.'),
    recap([
      ['↗️', 'translate, rotate, scale, skew'],
      ['📍', 'transform-origin sets the pivot'],
      ['🧱', 'Transforms don’t push other boxes'],
    ]),
  ]),

  lesson('css-11-4', '3D transforms', 5, [
    reveal('Adding depth', [
      ['perspective', 'On the parent: how far away the viewer is. Smaller = stronger 3D.'],
      ['rotateY / rotateX', 'Turn around the up-down or left-right axis, like a door or a flap.'],
      ['backface-visibility: hidden', 'Hides the back of a card when it faces away.'],
      ['transform-style: preserve-3d', 'Lets children keep their 3D position (for cubes and flips).'],
    ], { mono: true }),
    live('Turn like a door', 'Tap an angle.', ['.door { transform: perspective(500px) rotateY({{v}}); }'], ['0deg', '30deg', '60deg', '-45deg'], { html: '<div class="door">Rosa’s Café</div>', css: `${BASE} .door { width: 180px; height: 110px; margin: 20px auto; display: grid; place-items: center; background: #C2410C; color: white; font-weight: bold; border-radius: 10px; }` }),
    explore('A card flip', ['.card { transition: transform 0.6s; transform-style: preserve-3d; }', '.flipped { transform: rotateY(180deg); }', '.front, .back { backface-visibility: hidden; }', '.back { transform: rotateY(180deg); }'], [
      [1, 'The card keeps 3D for its two faces, and animates its turn.', '.card'],
      [2, 'Tap the switch: the whole card turns over.', '.card'],
      [3, 'Each face hides when it points away.', '.front'],
      [4, 'The back starts already turned, so it faces you after the flip.', '.back'],
    ], { page: { html: '<label class="sw"><input type="checkbox"> Flip</label><div class="wrap"><div class="card"><div class="front">Lemon Tea</div><div class="back">₹40 · with honey</div></div></div>', css: `${BASE} .sw { display: inline-block; padding: 6px 10px; border: 2px solid #E5D3B3; border-radius: 8px; margin-bottom: 10px; } .wrap { perspective: 600px; } .card { position: relative; width: 180px; height: 100px; transition: transform 0.6s; transform-style: preserve-3d; } .sw:has(input:checked) + .wrap .card { transform: rotateY(180deg); } .front, .back { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 12px; backface-visibility: hidden; font-weight: bold; } .front { background: #FFF1D6; } .back { background: #C2410C; color: white; transform: rotateY(180deg); }` }, minTaps: 3 }),
    check('What does a smaller perspective value do?', ['Makes the 3D effect stronger', 'Makes it flat', 'Makes the card smaller', 'Nothing'], 'Closer viewer, stronger depth.', 'Think of standing close to a door.', { mono: false }),
    truth([
      ['perspective goes on the parent of the turning element', true, 'Or inside transform as perspective().'],
      ['rotateY turns like a door', true, 'Around the up-down axis.'],
      ['3D transforms need a special library', false, 'They are plain CSS.'],
    ]),
    recap([
      ['🧊', 'perspective gives depth'],
      ['🚪', 'rotateY turns like a door'],
      ['🃏', 'backface-visibility makes flip cards work'],
    ]),
  ]),

  lesson('c-motion-1', 'Transitions', 6, [
    chat(['When a button changes colour instantly, it feels jumpy. A transition makes the change glide.', 'You say which property to animate, how long it takes and how it speeds up.']),
    explore('One line of motion', ['.box {', '  transition: transform 0.4s ease;', '}'], [
      [2, 'property, duration, timing. Tap the switch in the page and watch the box glide instead of jumping.', '.box'],
    ], { page: { html: SWITCH, css: `${SWITCH_CSS} .box { transition: transform 0.4s ease, background 0.4s; }` }, minTaps: 1 }),
    live('How long?', 'Pick a duration, then tap the switch in the page.', ['.box { transition: transform {{v}} ease; }'], ['0s', '0.2s', '0.6s', '2s'], { html: SWITCH, css: SWITCH_CSS, caption: '0.15s to 0.3s feels quick and natural for buttons. Long ones feel slow.' }),
    live('Timing functions', 'Pick one, then tap the switch.', ['.box { transition: transform 1s {{v}}; }'], ['linear', 'ease', 'ease-in', 'ease-out', 'cubic-bezier(.5, -0.6, .5, 1.6)'], { html: SWITCH, css: SWITCH_CSS, caption: 'ease-out starts fast and lands gently: good for things coming in. The cubic-bezier one overshoots and bounces back.' }),
    reveal('Good transition habits', [
      ['Animate transform and opacity', 'They are smooth on phones. Animating width or top can stutter.'],
      ['transition-delay', 'Wait before starting: transition: opacity 0.3s 0.1s;'],
      ['Several at once', 'transition: transform 0.3s, background 0.3s;'],
      ['Not “all”', 'transition: all animates things you didn’t mean to.'],
    ], { mono: true }),
    tapbug('The colour still jumps', ['.btn {', '  transition: 0.3s background;', '}', '.btn:hover {', '  background: #9A3412;', '}'], [[2, '0.3s background', 'background 0.3s']], 'Write the property first, then the duration. (The browser accepts some orders, but property-then-time is the clear, standard way.)'),
    recap([
      ['🌊', 'transition: property duration timing'],
      ['⏱', '0.15–0.3s feels natural'],
      ['⚡', 'Prefer transform and opacity'],
    ]),
  ]),

  lesson('css-11-6', 'Animations', 6, [
    explore('@keyframes', ['@keyframes steam {', '  from { transform: translateY(0); opacity: 1; }', '  to { transform: translateY(-30px); opacity: 0; }', '}', '.steam { animation: steam 1.5s ease-out infinite; }'], [
      [1, '@keyframes names an animation and describes its stages.'],
      [2, 'from: the start (0%).'],
      [3, 'to: the end (100%). You can add stages like 50% in between.'],
      [5, 'animation: name, duration, timing, how many times. The steam rises forever.', '.steam'],
    ], { page: { html: '<div class="cup">☕<span class="steam">〰</span></div>', css: `${BASE} @keyframes steam { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-30px); opacity: 0; } } .cup { font-size: 48px; position: relative; margin: 50px 30px 10px; display: inline-block; } .steam { position: absolute; left: 12px; top: -18px; font-size: 24px; color: #7C5E45; animation: steam 1.5s ease-out infinite; }` }, minTaps: 3 }),
    live('Animation settings', 'Tap a setting.', ['.dot { animation: bounce 0.8s ease-in-out {{v}}; }'], ['infinite', 'infinite alternate', '3', '1 forwards'], { html: '<div class="dot">🍋</div>', css: `${BASE} @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-50px); } } .dot { font-size: 36px; margin-top: 60px; display: inline-block; }`, caption: 'alternate goes back and forth. A number repeats that many times. forwards keeps the last frame.' }),
    matchUp('Animation properties', [['animation-duration', 'How long one round takes'], ['animation-iteration-count', 'How many rounds'], ['animation-direction', 'Forwards, backwards, alternate'], ['animation-fill-mode', 'What shows before and after']], 'The animation shorthand sets all of these in one line.'),
    toggle('Respect reduced motion', [
      ['Normal', ['.dot { animation: bounce 0.8s infinite alternate; }'], 'The lemon bounces.', { html: '<div class="dot">🍋</div>', css: `${BASE} @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-50px); } } .dot { font-size: 36px; margin-top: 60px; display: inline-block; animation: bounce 0.8s ease-in-out infinite alternate; }` }],
      ['Reduced motion', ['@media (prefers-reduced-motion: reduce) {', '  .dot { animation: none; }', '}'], 'For people who set “reduce motion” on their phone, it stays still. Always add this for big or endless motion.', { html: '<div class="dot">🍋</div>', css: `${BASE} .dot { font-size: 36px; margin-top: 60px; display: inline-block; }` }],
    ]),
    tapbug('Nothing moves', ['@keyframes spin {', '  to { transform: rotate(360deg); }', '}', '.icon { animation: spinning 2s linear infinite; }'], [[4, 'spinning', 'spin']], 'The animation name must match the @keyframes name exactly.'),
    recap([
      ['🎬', '@keyframes describes the stages'],
      ['🔁', 'animation: name duration timing count'],
      ['🌀', 'Turn motion down for prefers-reduced-motion'],
    ]),
  ]),

  challenge('css-11-ch', 'Module 11 Challenge', { icon: '🎬', name: 'Motion Maker' }, ['Fit, shape and filter images', 'Move things with 2D and 3D transforms', 'Add transitions and animations that respect users'], [
    mcq(1, 'Which keeps a photo’s shape while filling its box?', ['object-fit: cover', 'object-fit: fill', 'filter: cover', 'background-size: fill'], 'cover crops instead of stretching.', { mono: true }),
    mcq(2, 'Which makes a photo black and white?', ['filter: grayscale(1)', 'color: gray', 'opacity: 0', 'mask: gray'], 'grayscale is a filter.', { mono: true }),
    mcq(3, 'Which is smoothest to animate on a phone?', ['transform and opacity', 'width and height', 'margin and top', 'font-size'], 'They don’t make the page re-measure.'),
    mcq(4, 'What links an animation to its @keyframes?', ['The same name', 'The same duration', 'A class', 'The order in the file'], 'animation: steam … uses @keyframes steam.'),
    mcq(5, 'What does animation-iteration-count: infinite do?', ['Repeats forever', 'Plays once', 'Plays backwards', 'Pauses it'], 'It never stops.'),
    swipe([
      ['A transform pushes the boxes around it', false, 'Others act as if it hadn’t moved.'],
      ['transition needs a change to happen first, like :hover', true, 'It animates from one state to another.'],
      ['@keyframes can have stages like 50%', true, 'from = 0%, to = 100%.'],
      ['Endless motion is fine for everyone', false, 'Respect prefers-reduced-motion.'],
    ]),
    pairs([['rotate(45deg)', 'Turn'], ['scale(1.2)', 'Grow'], ['clip-path: circle()', 'Round crop'], ['ease-out', 'Fast start, gentle end']], 'Transforms, shapes and timing.'),
    pickCode('Which makes a button grow smoothly on hover?', ['.btn { transition: transform 0.2s; } .btn:hover { transform: scale(1.05); }', '.btn:hover { animation: scale 1.05; }', '.btn { transform: hover 0.2s; }', '.btn:hover { transition: grow; }'], 'The transition on the button; the change on :hover.'),
    bugTask(['@keyframes fade {', '  from { opacity: 0 }', '  to { opacity: 1 }', '}', '.card { animation: fade; }', '.photo { object-fit: crop; }'], [[5, 'animation: fade;', 'animation: fade 0.5s;'], [6, 'crop', 'cover']], 'An animation needs a duration (the default is 0s), and object-fit has no crop value; cover crops.'),
    xray(
      { html: '<img class="round" src="portrait.svg" alt="Rosa"><img class="grey" src="dish.svg" alt="Toast"><span class="tag">SALE</span>', css: 'body{font-family:system-ui,sans-serif;margin:16px} img{width:110px;height:110px;object-fit:cover;margin:4px} .round{border-radius:50%} .grey{filter:grayscale(1);border-radius:10px} .tag{display:inline-block;margin:20px;padding:6px 14px;background:#C2410C;color:white;font-weight:bold;border-radius:8px;transform:rotate(-12deg)}' },
      [
        ['.round', 'The round photo', 'border-radius: 50%', ['border-radius: 50%', 'clip-path: inset(0)', 'object-fit: contain']],
        ['.grey', 'The black-and-white photo', 'filter: grayscale(1)', ['filter: grayscale(1)', 'opacity: 0.5', 'mask-image']],
        ['.tag', 'The tilted tag', 'transform: rotate(-12deg)', ['transform: rotate(-12deg)', 'skew: 12deg', 'text-align: tilt']],
      ],
    ),
    arrange(['@keyframes pop {\n  from { transform: scale(0.8); }\n  to { transform: scale(1); }\n}', '.btn {\n  animation: pop 0.4s ease-out;\n}', '@media (prefers-reduced-motion: reduce) {\n  .btn { animation: none; }\n}'], 'describe the keyframes first, then use them on the button, then turn them off for reduced motion', `${BASE} .btn { padding: 12px 20px; background: #C2410C; color: white; border: 0; border-radius: 10px; font-size: 16px; }`, '<button class="btn">Order</button>'),
  ]),
];
