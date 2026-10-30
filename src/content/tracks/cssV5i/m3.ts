// CSS Intermediate · Module 3 · Motion with a purpose. Motion demos run on their own (keyframes) or with a tap switch.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, live, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const BASE = 'body{font-family:system-ui,sans-serif;margin:12px;color:#1F2937}';
const DOTS = '<div class="row"><span class="d"></span><span class="d"></span><span class="d"></span><span class="d"></span></div>';
const SKELETON = '<div class="sk"><div class="pic"></div><div class="line"></div><div class="line short"></div></div>';
const SK_CSS = `${BASE} @keyframes shimmer{to{background-position:-200% 0}} .sk{display:grid;gap:8px;max-width:260px} .pic,.line{border-radius:8px;background:linear-gradient(90deg,#E5E7EB 25%,#F3F4F6 50%,#E5E7EB 75%);background-size:200% 100%;animation:shimmer 1.4s linear infinite} .pic{height:110px} .line{height:14px} .short{width:60%}`;

export const CSS_I_M3: Lesson[] = [
  lesson('css-i-3-1', 'Keyframes with several steps', 5, [
    atWork('Arden', ['I’d like a little life on the portfolio: a badge that pulses, cards that rise in, a loading shimmer.', 'Motion should explain what is happening, never just decorate. And it must switch off for people who ask for less motion.']),
    explore('A pulse in three steps', ['@keyframes pulse {', '  0%   { transform: scale(1); }', '  50%  { transform: scale(1.15); }', '  100% { transform: scale(1); }', '}', '.badge { animation: pulse 1.6s ease-in-out infinite; }'], [
      [2, '0%: the start.'],
      [3, '50%: halfway, it is 15% bigger.'],
      [4, '100%: back to normal, so the loop is smooth.'],
      [6, 'Use it: name, duration, timing, repeat forever.', '.badge'],
    ], { page: { html: '<span class="badge">Open to work</span>', css: `${BASE} @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}} .badge{display:inline-block;margin:20px;padding:6px 14px;border-radius:20px;background:#15803D;color:white;font-weight:bold;animation:pulse 1.6s ease-in-out infinite}` }, minTaps: 3 }),
    live('Timing functions', 'Pick how it speeds up and slows down.', ['.ball { animation: move 1.4s {{v}} infinite alternate; }'], ['linear', 'ease-in-out', 'cubic-bezier(.5, -0.5, .5, 1.5)', 'steps(4)'], { html: '<div class="ball"></div>', css: `${BASE} @keyframes move{to{transform:translateX(200px)}} .ball{width:36px;height:36px;border-radius:50%;background:#4B3FD8;margin-top:20px}`, caption: 'steps(4) jumps in four steps instead of gliding: good for loading dots.' }),
    check('Why make 100% the same as 0% in a looping animation?', ['So the loop has no jump', 'It is required', 'To make it slower', 'To save memory'], 'The end matches the start, so it repeats smoothly.', 'Think about the moment it repeats.', { mono: false }),
    tapbug('The badge never moves', ['@keyframes pulse { 50% { transform: scale(1.15); } }', '.badge { animation: pulsing 1.6s infinite; }'], [[2, 'pulsing', 'pulse']], 'The animation name must match the @keyframes name.'),
    recap([
      ['🎞', '@keyframes with 0%, 50%, 100% steps'],
      ['⏱', 'Timing: ease-in-out, cubic-bezier, steps()'],
      ['🔁', 'End where you started for smooth loops'],
    ]),
  ]),

  lesson('css-i-3-2', 'Staggered entrances', 4, [
    explore('Rise in, one after another', ['@keyframes rise { from { opacity: 0; transform: translateY(16px); } }', '.d { animation: rise 0.5s ease-out both; }', '.d:nth-child(2) { animation-delay: 0.1s; }', '.d:nth-child(3) { animation-delay: 0.2s; }'], [
      [1, 'Only from: the end is the element’s normal look.'],
      [2, 'both keeps the from-look during the delay, so nothing flashes.'],
      [3, 'Each next item waits a little longer: a stagger.', '.d'],
    ], { page: { html: DOTS, css: `${BASE} @keyframes rise{from{opacity:0;transform:translateY(16px)}} .row{display:flex;gap:10px;margin-top:20px} .d{width:44px;height:44px;border-radius:10px;background:#C2410C;animation:rise .6s ease-out both infinite alternate} .d:nth-child(2){animation-delay:.15s} .d:nth-child(3){animation-delay:.3s} .d:nth-child(4){animation-delay:.45s}` }, minTaps: 3 }),
    live('How long between items?', 'Pick the step between delays.', ['.d { animation-delay: calc(var(--i) * {{v}}); }'], ['0s', '0.1s', '0.3s', '0.8s'], { html: '<div class="row"><span class="d" style="--i:0"></span><span class="d" style="--i:1"></span><span class="d" style="--i:2"></span><span class="d" style="--i:3"></span></div>', css: `${BASE} @keyframes rise{from{opacity:0;transform:translateY(16px)}} .row{display:flex;gap:10px;margin-top:20px} .d{width:44px;height:44px;border-radius:10px;background:#C2410C;animation:rise .6s ease-out both infinite alternate}`, caption: 'A custom property --i on each item makes the delays easy. About 0.1s feels lively; long gaps feel slow.' }),
    check('What does fill mode both do for a delayed entrance?', ['Shows the starting look during the delay', 'Plays the animation twice', 'Removes the delay', 'Reverses it'], 'Without it, the item shows normally, then jumps to the start.', 'Before and after.'),
    tapbug('Everything rises at once', ['.d:nth-child(2) { animation-delay: 0.1; }'], [[1, '0.1;', '0.1s;']], 'A delay needs a unit (s or ms). A bare number is ignored, so there is no stagger.'),
    matchUp('Stagger settings', [['animation-delay', 'Wait before starting'], ['fill-mode both', 'No flash during the delay'], ['--i on each item', 'Its place in the line'], ['calc(var(--i) * 0.1s)', 'A growing delay']], 'Together they make items enter one after another.'),
    recap([
      ['🪜', 'animation-delay makes a stagger'],
      ['🔢', 'calc(var(--i) * 0.1s) for many items'],
      ['🧷', 'fill-mode both prevents a flash'],
    ]),
  ]),

  lesson('css-i-3-3', 'Loading skeletons and reduced motion', 5, [
    toggle('Waiting for data', [
      ['Spinner', ['<div class="spinner"></div>'], 'A spinner says “wait”, but not what is coming.', { html: '<div class="spin"></div>', css: `${BASE} @keyframes r{to{transform:rotate(1turn)}} .spin{width:36px;height:36px;border:4px solid #E5E7EB;border-top-color:#4B3FD8;border-radius:50%;animation:r 1s linear infinite;margin:30px auto}` }],
      ['Skeleton', ['<div class="sk">…grey shapes…</div>'], 'A skeleton shows the shape of what is coming, so the page feels faster and doesn’t jump.', { html: SKELETON, css: SK_CSS }],
    ]),
    reveal('Respect “reduce motion”', [
      ['Who asks', 'Some people feel dizzy or sick with motion. Phones have a setting to reduce it.', '🌀'],
      ['How CSS knows', '@media (prefers-reduced-motion: reduce) { … }', '🧠'],
      ['What to do', 'Turn off big or endless motion: animation: none, or a simple fade instead.', '✅'],
    ], { mono: true }),
    matchUp('Good motion or not?', [['A skeleton while data loads', 'Explains waiting'], ['Cards rising in once', 'Draws the eye, then stops'], ['Endless bouncing logo', 'Distracting: avoid'], ['Reduced-motion rule', 'Respects the user']], 'Motion should help, not decorate.'),
    tapbug('Motion never switches off', ['@media (prefers-reduced-motion: none) {', '  .sk * { animation: none; }', '}'], [[1, 'prefers-reduced-motion: none', 'prefers-reduced-motion: reduce']], 'The setting to check is reduce. none means the user has no preference.'),
    check('Which media query checks the “reduce motion” setting?', ['(prefers-reduced-motion: reduce)', '(motion: off)', '(reduce-animations)', '(prefers-color-scheme: reduce)'], 'prefers-reduced-motion.', 'It starts with prefers.'),
    recap([
      ['🦴', 'Skeletons show the shape of what is coming'],
      ['🌀', 'prefers-reduced-motion: reduce'],
      ['🛑', 'Turn off big or endless motion for those users'],
    ]),
  ]),

  challenge('css-i-3-ch', 'Module 3 Challenge', { icon: '🎬', name: 'Motion Designer' }, ['Write multi-step keyframes with good timing', 'Stagger entrances with delays', 'Build skeletons and respect reduced motion'], [
    mcq(1, 'What does 50% mean inside @keyframes?', ['Halfway through the animation', 'Half the size', 'Half the speed', 'Half the opacity'], 'A step in time.'),
    mcq(2, 'Which property makes items start one after another?', ['animation-delay', 'animation-duration', 'transition-property', 'z-index'], 'Delays make a stagger.', { mono: true }),
    mcq(3, 'What does steps(4) do?', ['Jumps in 4 steps instead of gliding', 'Repeats 4 times', 'Waits 4 seconds', 'Goes 4 times faster'], 'Choppy on purpose.'),
    mcq(4, 'Why show a skeleton instead of a spinner?', ['It shows the shape of what is coming', 'It loads data faster', 'It uses no CSS', 'Spinners are not allowed'], 'Feels faster and doesn’t jump.'),
    mcq(5, 'Which users does prefers-reduced-motion help?', ['People who feel sick with motion', 'People on slow internet', 'People with small screens', 'People using dark mode'], 'A comfort and health setting.'),
    swipe([
      ['Every element should be animated', false, 'Motion should have a purpose.'],
      ['fill-mode both prevents a flash before a delayed animation', true, 'It shows the start look during the delay.'],
      ['The animation name must match @keyframes', true, 'Exactly.'],
      ['Reduced motion means removing all colour', false, 'It is about movement.'],
    ]),
    pairs([['@keyframes', 'The steps of an animation'], ['animation-delay', 'Start later'], ['steps()', 'Jump instead of glide'], ['prefers-reduced-motion', 'User asked for less motion']], 'Motion tools.'),
    pickCode('Which switches off the skeleton shimmer for users who reduce motion?', ['@media (prefers-reduced-motion: reduce) { .sk * { animation: none; } }', '@media (motion: none) { .sk { display: none; } }', '.sk { reduced-motion: true; }', '@media (prefers-reduced-motion: none) { .sk * { animation: none; } }'], 'reduce is the value to check.'),
    bugTask(['@keyframes rise { from { opacity: 0 } }', '.card { animation: rise 0.5s ease-out; animation-delay: 2; }'], [[2, 'animation-delay: 2', 'animation-delay: 0.2s']], 'Times need a unit: 0.2s or 200ms. A bare number is ignored.'),
    xray(
      { html: `<span class="badge">Open to work</span>${SKELETON}`, css: `${SK_CSS} @keyframes pulse{50%{transform:scale(1.1)}} .badge{display:inline-block;margin:6px 0 12px;padding:6px 14px;border-radius:20px;background:#15803D;color:white;animation:pulse 1.6s infinite}` },
      [
        ['.badge', 'The badge that gently grows', '@keyframes with a 50% step', ['@keyframes with a 50% step', 'transition on hover', 'z-index']],
        ['.pic', 'The grey shimmering block', 'a skeleton animation', ['a skeleton animation', 'a broken image', 'a spinner']],
        ['.short', 'The shorter grey line', 'width: 60%', ['width: 60%', 'animation-delay', 'opacity: 0.6']],
      ],
    ),
    arrange(['@keyframes rise {\n  from { opacity: 0; transform: translateY(16px); }\n}', '.d {\n  animation: rise 0.5s ease-out both;\n}', '@media (prefers-reduced-motion: reduce) {\n  .d { animation: none; }\n}'], 'describe the motion, use it on the items, then switch it off for reduced motion', `${BASE} .row{display:flex;gap:10px;margin-top:20px} .d{width:44px;height:44px;border-radius:10px;background:#C2410C}`, DOTS),
  ]),
];
