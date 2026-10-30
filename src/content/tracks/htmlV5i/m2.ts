// HTML Intermediate · Module 2 · Responsive images.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, truth, xray } from './kit';

const IMG_CSS = 'body{font-family:system-ui,sans-serif;margin:12px} img{max-width:100%;height:auto;border-radius:10px;display:block} .frame{border:2px dashed #C9C3FF;padding:6px;border-radius:12px} p{margin:6px 0}';
const SRCSET = ['<img src="hall-800.jpg"', '     srcset="hall-400.jpg 400w,', '             hall-800.jpg 800w,', '             hall-1600.jpg 1600w"', '     sizes="(min-width: 700px) 50vw, 100vw"', '     alt="The school hall on prize day"', '     width="800" height="500">'];

export const HTML_I_M2: Lesson[] = [
  lesson('html-i-2-1', 'Several sizes: srcset and sizes', 6, [
    atWork('Megan', ['Greenfield’s home page has one 3 MB photo of the school hall.', 'On a phone with slow data it takes ages to load, and the phone shrinks it anyway. Let’s send each screen the size it needs.']),
    reveal('One picture, three files', [
      ['hall-400.jpg', 'About 40 KB. Enough for a phone.', '📱'],
      ['hall-800.jpg', 'About 120 KB. A tablet or a small laptop.', '📟'],
      ['hall-1600.jpg', 'About 400 KB. A big, sharp screen.', '🖥'],
    ], { intro: 'You make the sizes once (image tools do it in seconds). The browser picks one.' }),
    explore('Reading srcset and sizes', SRCSET, [
      [1, 'src is the fallback for very old browsers.'],
      [2, 'srcset lists the files and their real widths: 400w means 400 pixels wide.'],
      [5, 'sizes says how wide the image will show: half the screen on wide screens, the full width otherwise.'],
      [7, 'width and height stop the page jumping while it loads (lesson 2.3).'],
    ], { page: { html: '<div class="frame"><img src="banner.svg" alt="The school hall on prize day" width="600" height="240"></div><p>The browser does the maths and downloads only one file.</p>', css: IMG_CSS }, minTaps: 3 }),
    check('A phone shows the image 400 pixels wide. Which file is the browser most likely to pick?', ['hall-400.jpg (or 800 on a sharp screen)', 'hall-1600.jpg always', 'All three', 'None: it needs JavaScript'], 'It picks the smallest file that still looks sharp. Phones with sharper screens may take the next size up.', 'Smallest that still looks good.', { mono: false }),
    tapbug('The browser ignores the list', ['<img srcset="hall-400.jpg 400, hall-800.jpg 800"', '     alt="The school hall">'], [[1, 'hall-400.jpg 400, hall-800.jpg 800', 'hall-400.jpg 400w, hall-800.jpg 800w']], 'Each width in srcset needs a w after the number.'),
    recap([
      ['🖼', 'srcset lists files with their widths (400w)'],
      ['📏', 'sizes says how wide the image shows'],
      ['⚡', 'Phones download the small file'],
    ]),
  ]),

  lesson('html-i-2-2', 'A different picture on phones', 5, [
    reveal('Why another picture?', [
      ['Art direction', 'A wide photo of the whole hall is tiny on a phone. A close-up of the stage works better there.', '🎬'],
      ['<picture>', 'Holds several <source> options and one <img> as the fallback.', '🧺'],
      ['New formats', 'A <source type="image/webp"> offers smaller files to browsers that support them.', '📦'],
    ]),
    explore('The picture element', ['<picture>', '  <source media="(max-width: 600px)" srcset="stage-closeup.jpg">', '  <source type="image/webp" srcset="hall.webp">', '  <img src="hall.jpg" alt="Prize day in the school hall">', '</picture>'], [
      [2, 'On screens up to 600px, use the close-up.'],
      [3, 'Otherwise, if the browser can show WebP, use the smaller WebP file.'],
      [4, 'The img is required: it is the fallback, and its alt text is used for every option.', 'img'],
    ], { page: { html: '<picture><img src="banner.svg" alt="Prize day in the school hall" width="600" height="240"></picture>', css: IMG_CSS }, minTaps: 3 }),
    toggle('What each screen gets', [
      ['Phone', ['<!-- max-width: 600px matches -->', 'stage-closeup.jpg'], 'A close-up that is clear on a small screen.', { html: '<div class="frame"><img src="portrait.svg" alt="Close-up of the stage" width="200" height="200"></div>', css: IMG_CSS }],
      ['Laptop', ['<!-- no media match: WebP or JPG -->', 'hall.webp'], 'The wide photo of the whole hall.', { html: '<div class="frame"><img src="banner.svg" alt="The whole school hall" width="600" height="240"></div>', css: IMG_CSS }],
    ]),
    check('What must every <picture> contain?', ['An <img> (the fallback)', 'At least three <source>s', 'A <figure>', 'A width attribute'], 'Without the img nothing shows, and alt comes from it.', 'The fallback.'),
    tapbug('Nothing shows at all', ['<picture>', '  <source media="(max-width: 600px)" srcset="closeup.jpg">', '</picture>'], [[3, '</picture>', '<img src="hall.jpg" alt="The school hall"></picture>']], 'A picture with no img shows nothing. The img is the fallback and carries the alt text.'),
    recap([
      ['🧺', '<picture> + <source>s + one <img>'],
      ['🎬', 'media picks a different crop for phones'],
      ['📦', 'type offers smaller formats like WebP'],
    ]),
  ]),

  lesson('html-i-2-3', 'No jumping while loading', 4, [
    toggle('Why the page jumps', [
      ['No size', ['<img src="hall.jpg" alt="The school hall">', '<p>Admissions are open</p>'], 'Until the photo arrives, the browser doesn’t know its height. The text jumps down when it loads, and people tap the wrong thing.', { html: '<div style="height:20px;background:#EEE;border-radius:6px"></div><p><b>Admissions are open</b> (this line will jump)</p>', css: IMG_CSS }],
      ['With size', ['<img src="hall.jpg" alt="The school hall"', '     width="800" height="500">', '<p>Admissions are open</p>'], 'width and height let the browser keep the right space from the start. With max-width: 100% and height: auto in CSS, it still shrinks to fit.', { html: '<div style="aspect-ratio:8/5;background:#EEE;border-radius:6px;max-width:100%"></div><p><b>Admissions are open</b> (stays put)</p>', css: IMG_CSS }],
    ]),
    reveal('The rule', [
      ['Always set width and height', 'Use the image’s real pixel size. The browser works out the shape.'],
      ['CSS keeps it flexible', 'img { max-width: 100%; height: auto; } still lets it shrink.'],
      ['Layout shift', 'Measured as CLS, one of Google’s Core Web Vitals (Module 5).'],
    ], { mono: true }),
    truth([
      ['width and height stop images making the page jump', true, 'The space is kept before the image arrives.'],
      ['Setting width and height makes images stop shrinking on phones', false, 'Not with max-width: 100%; height: auto in CSS.'],
      ['Layout shift annoys users and hurts search ranking', true, 'It is one of the Core Web Vitals.'],
    ]),
    place('Reserve the space', 'Give the 800×500 photo its size.', [['<img src="hall.jpg" alt="The school hall"'], ['     ', { gap: 0 }, ' ', { gap: 1 }, '>']], ['width="800"', 'height="500"', 'size="800x500"', 'style="big"'], ['width="800"', 'height="500"'], 'With both set, the page keeps the right space.', { css: IMG_CSS }),
    check('An image is 1200 × 800 pixels. Which attributes should it have?', ['width="1200" height="800"', 'width="100%"', 'height="auto"', 'size="1200x800"'], 'Use the real pixel size; CSS makes it fit the screen.', 'The real numbers, no units.'),
    recap([
      ['📐', 'Set width and height on every image'],
      ['🧱', 'The page keeps space before the image loads'],
      ['📱', 'CSS max-width keeps it flexible'],
    ]),
  ]),

  challenge('html-i-2-ch', 'Module 2 Challenge', { icon: '🖼', name: 'Image Smart' }, ['Offer several image sizes with srcset and sizes', 'Swap pictures and formats with <picture>', 'Stop layout shift with width and height'], [
    mcq(1, 'What does 800w mean in srcset?', ['The file is 800 pixels wide', 'Show it 800 pixels wide', '800 KB', 'Wait 800 ms'], 'w describes the file’s real width.'),
    mcq(2, 'What does sizes tell the browser?', ['How wide the image will show', 'How big the file is', 'How many files there are', 'The image’s height'], 'With that, it picks the best file.'),
    mcq(3, 'Which element lets phones get a different crop?', ['<picture> with <source media>', '<img sizes>', '<figure>', '<video>'], 'media chooses by screen.', { mono: true }),
    mcq(4, 'Why set width and height on images?', ['So the page doesn’t jump while they load', 'To make them load faster', 'To make them stretch', 'For search engines only'], 'The space is reserved.'),
    mcq(5, 'Where does the alt text go in a <picture>?', ['On the <img>', 'On each <source>', 'On <picture>', 'Nowhere'], 'The img carries it for every option.'),
    swipe([
      ['Phones should download the biggest image', false, 'They need the smallest sharp one.'],
      ['<picture> needs an <img> inside', true, 'It is the fallback.'],
      ['type="image/webp" offers a smaller format', true, 'Browsers that can’t show it skip it.'],
      ['Images without a size can make text jump', true, 'That is layout shift.'],
    ]),
    pairs([['srcset', 'List of files and widths'], ['sizes', 'How wide it shows'], ['<source media>', 'A different crop'], ['width + height', 'No jumping']], 'Responsive image tools.'),
    pickCode('Which is a complete responsive image?', ['<img src="a-800.jpg" srcset="a-400.jpg 400w, a-800.jpg 800w" sizes="100vw" alt="School gate" width="800" height="500">', '<img srcset="a-400.jpg, a-800.jpg" alt="School gate">', '<img src="a.jpg">', '<picture srcset="a-400.jpg 400w"></picture>'], 'Files with widths, sizes, alt text and the real dimensions.'),
    bugTask(['<picture>', '  <source media="(max-width: 600px)" srcset="close.jpg">', '</picture>', '<img srcset="big.jpg 1600" alt="Hall">'], [[3, '</picture>', '<img src="hall.jpg" alt="Hall"></picture>'], [4, 'big.jpg 1600', 'big.jpg 1600w']], 'A picture needs its img fallback, and srcset widths need a w.'),
    xray(
      { html: '<picture><img class="hero" src="banner.svg" alt="The school hall" width="600" height="240"></picture><p class="note">Space kept while loading</p>', css: IMG_CSS },
      [
        ['picture', 'The wrapper that can swap photos', '<picture>', ['<picture>', '<figure>', '<div>']],
        ['.hero', 'The photo with a fixed shape', 'width and height', ['width and height', 'srcset only', 'a background image']],
        ['.note', 'The text that does not jump', 'space reserved by the image size', ['space reserved by the image size', 'position: fixed', 'a <br>']],
      ],
    ),
    arrange(['<picture>', '<source media="(max-width: 600px)" srcset="banner.svg">', '<img src="banner.svg" alt="The school hall" width="600" height="240">', '</picture>'], 'open the picture, add the phone source, the img fallback, then close it', IMG_CSS),
  ]),
];
