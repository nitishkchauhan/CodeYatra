// HTML Intermediate · Module 5 · Pages that load fast.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, matchUp, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const CSS = 'body{font-family:system-ui,sans-serif;margin:12px} .bar{height:16px;border-radius:8px;background:#EEE;margin:4px 0;overflow:hidden} .bar span{display:block;height:100%} .lbl{font-size:13px;color:#555} img{max-width:100%;height:auto;border-radius:8px;display:block}';
const timeline = (rows: [string, number, number, string][]) =>
  rows.map(([label, start, width, color]) => `<p class="lbl">${label}</p><div class="bar"><span style="margin-left:${start}%;width:${width}%;background:${color}"></span></div>`).join('');

export const HTML_I_M5: Lesson[] = [
  lesson('html-i-5-1', 'The Core Web Vitals, in plain words', 5, [
    atWork('Megan', ['Greenfield’s parents open the site on cheap phones with patchy data. If it’s slow, they give up and call the office.', 'Google measures three things about speed. Let’s learn what they mean.']),
    reveal('Three measures of a good page', [
      ['LCP: Largest Contentful Paint', 'How long until the main thing (usually the big photo or heading) shows. Good: under 2.5 seconds.', '🖼'],
      ['INP: Interaction to Next Paint', 'How quickly the page reacts when you tap. Good: under 200 ms.', '👆'],
      ['CLS: Cumulative Layout Shift', 'How much things jump around while loading. Good: under 0.1.', '🧱'],
    ]),
    matchUp('Which measure is hurt?', [['The hero photo takes 6 seconds', 'LCP'], ['A button takes a second to respond', 'INP'], ['Text jumps when an advert loads', 'CLS'], ['Images have no width and height', 'CLS (again)']], 'Each problem hurts one measure.'),
    truth([
      ['A good LCP is under 2.5 seconds', true, 'The main content shows quickly.'],
      ['CLS is about how fast the server is', false, 'It’s about things jumping around.'],
      ['Heavy JavaScript can make taps feel slow (INP)', true, 'The page is busy and can’t respond.'],
    ]),
    check('Which fix helps CLS most?', ['Setting width and height on images', 'A bigger hero photo', 'More fonts', 'Removing the alt text'], 'Reserved space means nothing jumps.', 'Remember Module 2.'),
    recap([
      ['🖼', 'LCP: the main content shows fast'],
      ['👆', 'INP: taps respond fast'],
      ['🧱', 'CLS: nothing jumps'],
    ]),
  ]),

  lesson('html-i-5-2', 'Lazy images and embeds', 5, [
    reveal('Load what is needed, when it is needed', [
      ['loading="lazy"', 'Images and iframes below the screen load only when you scroll near them.', '🐢'],
      ['fetchpriority="high"', 'The one big image at the top (the LCP image) loads first.', '🚀'],
      ['Never lazy-load the top image', 'It would load late and hurt LCP.', '⚠️'],
    ], { mono: true }),
    toggle('What the phone downloads first', [
      ['Everything at once', ['<img src="hero.jpg" …>', '<img src="gallery-1.jpg" …>', '<img src="gallery-2.jpg" …>', '<iframe src="video" …>'], 'Every file competes, so the photo at the top arrives late.', { html: timeline([['hero.jpg', 0, 70, '#F59E0B'], ['gallery-1.jpg', 0, 60, '#C9C3FF'], ['gallery-2.jpg', 0, 60, '#C9C3FF'], ['video embed', 0, 80, '#C9C3FF']]), css: CSS }],
      ['Lazy + priority', ['<img src="hero.jpg" fetchpriority="high" …>', '<img src="gallery-1.jpg" loading="lazy" …>', '<img src="gallery-2.jpg" loading="lazy" …>', '<iframe src="video" loading="lazy" …>'], 'The hero comes first and fast; the rest waits until you scroll.', { html: timeline([['hero.jpg', 0, 30, '#15803D'], ['gallery-1.jpg (when scrolled)', 55, 25, '#C9C3FF'], ['gallery-2.jpg (when scrolled)', 60, 25, '#C9C3FF'], ['video embed (when scrolled)', 70, 30, '#C9C3FF']]), css: CSS }],
    ]),
    place('Make the gallery lazy', 'Load the gallery photo only when it is near.', [['<img src="gallery-1.jpg" alt="Sports day" width="400" height="300"'], ['     ', { gap: 0 }, '>']], ['loading="lazy"', 'fetchpriority="high"', 'lazy="true"', 'defer'], ['loading="lazy"'], 'loading="lazy" waits until the image is near the screen.', { preview: false }),
    check('Which image should NOT be lazy?', ['The big photo at the top of the page', 'Photos in a gallery lower down', 'A map at the bottom', 'Embedded videos'], 'The top image is what people see first.', 'What is visible without scrolling?', { mono: false }),
    tapbug('The home page is slow to show its photo', ['<img src="hero.jpg" alt="School gate" loading="lazy" width="800" height="500">'], [[1, 'loading="lazy"', 'fetchpriority="high"']], 'The hero is visible at once, so lazy-loading delays it. Give it high priority instead.'),
    recap([
      ['🐢', 'loading="lazy" for images and iframes lower down'],
      ['🚀', 'fetchpriority="high" for the top image'],
      ['⚠️', 'Never lazy-load what shows first'],
    ]),
  ]),

  lesson('html-i-5-3', 'Scripts that don’t block', 5, [
    reveal('How scripts can block a page', [
      ['A plain <script src> in the head', 'The browser stops building the page until the script downloads and runs.', '🛑'],
      ['defer', 'Downloads alongside the page and runs after it is built, in order. The usual choice.', '✅'],
      ['async', 'Downloads alongside and runs as soon as it arrives, in any order. For independent scripts like analytics.', '⚡'],
    ], { mono: true }),
    toggle('Three ways to load app.js', [
      ['Plain', ['<head>', '  <script src="app.js"></script>', '</head>'], 'The page waits: blank screen until app.js arrives and runs.', { html: timeline([['HTML', 0, 20, '#4B3FD8'], ['app.js (page waits)', 20, 40, '#F59E0B'], ['HTML (rest)', 60, 40, '#4B3FD8']]), css: CSS }],
      ['defer', ['<head>', '  <script src="app.js" defer></script>', '</head>'], 'HTML keeps building; app.js runs once the page is ready.', { html: timeline([['HTML', 0, 60, '#4B3FD8'], ['app.js download', 5, 40, '#C9C3FF'], ['app.js runs', 60, 10, '#15803D']]), css: CSS }],
      ['async', ['<head>', '  <script src="stats.js" async></script>', '</head>'], 'Runs the moment it arrives, possibly before the page is done. Fine for scripts that don’t touch the page.', { html: timeline([['HTML', 0, 30, '#4B3FD8'], ['stats.js runs', 30, 8, '#15803D'], ['HTML (rest)', 38, 30, '#4B3FD8']]), css: CSS }],
    ]),
    matchUp('Pick the loading style', [['Your app’s main script', 'defer'], ['A visitor counter', 'async'], ['A script that must run before anything shows', 'plain (rare)'], ['Scripts that depend on each other', 'defer (keeps order)']], 'defer is the safe default.'),
    check('Which keeps scripts in order and runs them after the page is built?', ['defer', 'async', 'Plain script in the head', 'type="text"'], 'defer runs in order once the HTML is ready.', 'Think “wait politely”.'),
    tapbug('A blank screen for 3 seconds', ['<head>', '  <script src="big-app.js"></script>', '</head>'], [[2, '<script src="big-app.js">', '<script src="big-app.js" defer>']], 'A plain script in the head stops the page building. defer lets the page show first.'),
    recap([
      ['🛑', 'Plain scripts in the head block the page'],
      ['✅', 'defer: runs after the page is built, in order'],
      ['⚡', 'async: runs when ready, for independent scripts'],
    ]),
  ]),

  challenge('html-i-5-ch', 'Module 5 Challenge', { icon: '⚡', name: 'Speedster' }, ['Explain LCP, INP and CLS', 'Lazy-load images and embeds, and prioritise the hero', 'Load scripts with defer and async'], [
    mcq(1, 'What does LCP measure?', ['How soon the main content shows', 'How much the page jumps', 'How fast taps respond', 'The file size'], 'Largest Contentful Paint.'),
    mcq(2, 'What does CLS measure?', ['How much things jump while loading', 'How fast the server is', 'How big images are', 'Colour contrast'], 'Cumulative Layout Shift.'),
    mcq(3, 'Which attribute delays an image until it is near the screen?', ['loading="lazy"', 'defer', 'async', 'hidden'], 'Lazy loading.', { mono: true }),
    mcq(4, 'Which script attribute keeps order and waits for the page?', ['defer', 'async', 'lazy', 'module only'], 'defer.', { mono: true }),
    mcq(5, 'Which image gets fetchpriority="high"?', ['The big one at the top', 'Every image', 'The footer logo', 'Hidden images'], 'The LCP image.'),
    swipe([
      ['Lazy-loading the top photo makes the page feel faster', false, 'It delays what people see first.'],
      ['Images without a size can cause layout shift', true, 'They hurt CLS.'],
      ['async scripts always run in order', false, 'They run as soon as each arrives.'],
      ['Iframes can be lazy-loaded too', true, 'loading="lazy" works on iframes.'],
    ]),
    pairs([['LCP', 'Main content shows'], ['INP', 'Taps respond'], ['CLS', 'Nothing jumps'], ['defer', 'Script waits for the page']], 'Speed words.'),
    pickCode('Which is the best hero image?', ['<img src="hero.jpg" alt="School gate" width="800" height="500" fetchpriority="high">', '<img src="hero.jpg" loading="lazy">', '<img src="hero.jpg" alt="School gate" async>', '<img src="hero-4mb.jpg" alt="School gate">'], 'Sized, described and prioritised.'),
    bugTask(['<script src="app.js" async></script>', '<script src="app-helpers.js" async></script>', '<img src="hero.jpg" alt="Gate" loading="lazy">'], [[1, 'async', 'defer'], [3, 'loading="lazy"', 'fetchpriority="high"']], 'Scripts that depend on each other need defer, and the hero image should not be lazy.'),
    xray(
      { html: '<img class="hero" src="banner.svg" alt="School gate" width="600" height="240"><p class="lbl">Gallery (scroll down)</p><img class="gal" src="dish.svg" alt="Sports day" width="400" height="260">', css: CSS },
      [
        ['.hero', 'The photo people see first', 'fetchpriority="high"', ['fetchpriority="high"', 'loading="lazy"', 'async']],
        ['.gal', 'A photo further down', 'loading="lazy"', ['loading="lazy"', 'fetchpriority="high"', 'defer']],
        ['.lbl', 'Text that does not jump', 'images with width and height', ['images with width and height', 'position: fixed', 'async']],
      ],
    ),
    arrange(['<head>', '<script src="app.js" defer></script>', '</head>', '<body>', '<img src="banner.svg" alt="School gate" width="600" height="240" fetchpriority="high">', '<img src="dish.svg" alt="Sports day" width="400" height="260" loading="lazy">', '</body>'], 'a head with a deferred script, then a body with the priority hero and a lazy gallery photo', CSS),
  ]),
];
