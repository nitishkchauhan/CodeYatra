// HTML track · Module 3 · Style Basics (a first look at CSS; the CSS track goes deeper).
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const CARD = '<h1>Weekend Sale</h1><p>Everything 20% off.</p>';

export const HTML_M3: Lesson[] = [
  lesson('html-3-1', 'The style attribute', 4, [
    chat(['HTML builds the house. Now let’s paint it!', 'The quickest way is the style attribute.']),
    reveal('The parts of a style', [
      ['color', 'The property: what to change.'],
      [':', 'Joins the property and its value.'],
      ['blue', 'The value: how to change it.'],
      [';', 'Ends the rule. Add more rules one after another.'],
    ], { code: ['<p style="color:blue;">Hi</p>'], mono: true }),
    toggle('Five properties', [
      ['color', ['<h1 style="color:#4B3FD8;">Weekend Sale</h1>'], 'color changes the text colour.', { html: '<h1 style="color:#4B3FD8;">Weekend Sale</h1><p>Everything 20% off.</p>' }],
      ['background-color', ['<body style="background-color:#FFF3CD;">'], 'background-color colours the page or a box.', { html: CARD, css: 'body{background-color:#FFF3CD}' }],
      ['font-family', ['<p style="font-family:Courier New;">'], 'font-family picks the font, like Arial, Verdana or Courier New.', { html: '<h1>Weekend Sale</h1><p style="font-family:Courier New;">Everything 20% off.</p>' }],
      ['font-size', ['<p style="font-size:150%;">'], 'font-size sets the text size, in px or %.', { html: '<h1>Weekend Sale</h1><p style="font-size:150%;">Everything 20% off.</p>' }],
      ['text-align', ['<h1 style="text-align:center;">'], 'text-align puts text left, centre or right.', { html: '<h1 style="text-align:center;">Weekend Sale</h1><p>Everything 20% off.</p>' }],
    ], 'Tap each property and watch the page.'),
    place('Make a birthday card', 'Tap the styles in order: a pink page, a purple heading, then centre it.', [['<body style="', { gap: 0 }, '">'], ['<h1 style="', { gap: 1 }, ' ', { gap: 2 }, '">Happy Birthday!</h1>'], ['</body>']], ['background-color:pink;', 'color:purple;', 'text-align:center;', 'font-color:purple;'], ['background-color:pink;', 'color:purple;', 'text-align:center;'], 'Several rules go in one style attribute, one after another.'),
    check('Which property changes the text colour?', ['color', 'background-color', 'font-color'], 'There is no font-color property. Text colour is just color.', 'The simplest one is right.'),
    tapbug('The sale isn’t red', ['<h1 style="color=red;">Sale</h1>'], [[1, 'color=red;', 'color:red;']], 'Inside style, use a colon between the property and the value.'),
    recap([
      ['🎨', 'style adds CSS to one element'],
      ['🔤', 'Write it as property:value;'],
      ['🖌', 'color, background-color, font-family, font-size, text-align'],
    ]),
  ]),

  lesson('html-3-2', 'Colours', 5, [
    reveal('One colour, four ways', [
      ['red', 'A colour name.'],
      ['rgb(255, 0, 0)', 'RGB: red, green and blue, each from 0 to 255.'],
      ['#ff0000', 'HEX: the same three amounts, written in base 16.'],
      ['hsl(0, 100%, 50%)', 'HSL: hue, saturation and lightness.'],
    ], { mono: true, intro: 'All four are the same red. Tap each.' }),
    toggle('A wall of colour names', [
      ['Tomato', ['<div style="background:Tomato;">Tomato</div>'], 'Browsers know about 140 colour names, and they work in any case.', { html: '<div style="background:Tomato;color:#fff;padding:30px;font:20px sans-serif">Tomato</div>' }],
      ['DodgerBlue', ['<div style="background:DodgerBlue;">DodgerBlue</div>'], 'Another named colour.', { html: '<div style="background:DodgerBlue;color:#fff;padding:30px;font:20px sans-serif">DodgerBlue</div>' }],
      ['MediumSeaGreen', ['<div style="background:MediumSeaGreen;">MediumSeaGreen</div>'], 'Names are handy, but they only cover a small set of colours.', { html: '<div style="background:MediumSeaGreen;color:#fff;padding:30px;font:20px sans-serif">MediumSeaGreen</div>' }],
    ]),
    live('Mix light with RGB', 'Tap a mix. All 0 is black, all 255 is white, equal values are greys.', ['<div style="background:{{v}};height:90px;border-radius:12px"></div>'], ['rgb(255, 0, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(120, 120, 120)', 'rgb(255, 160, 0)']),
    reveal('Reading HEX', [
      ['ff', 'Red: the most (255).'],
      ['63', 'Green: some (99).'],
      ['47', 'Blue: a little (71).'],
    ], { code: ['#ff6347'], mono: true, intro: '#ff6347 is Tomato. Each pair goes from 00 to ff (0 to 255). #000000 is black and #ffffff is white.' }),
    live('Hue, saturation, lightness', 'Tap a colour. Hue is the angle on a colour wheel: 0 red, 120 green, 240 blue.', ['<div style="background:{{v}};height:90px;border-radius:12px"></div>'], ['hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)', 'hsl(240, 100%, 50%)', 'hsl(240, 30%, 80%)']),
    toggle('See-through colours', [
      ['rgb', ['background: rgb(255, 99, 71);'], 'A solid colour.', { html: '<div class="bg"><div class="box" style="background:rgb(255,99,71)">rgb</div></div>', css: '.bg{background:repeating-linear-gradient(45deg,#4B3FD8 0 12px,#fff 12px 24px);padding:20px}.box{padding:30px;color:#fff;font:20px sans-serif}' }],
      ['rgba', ['background: rgba(255, 99, 71, 0.5);'], 'The fourth value, alpha, goes from 0 (invisible) to 1 (solid). At 0.5 you see the stripes through it.', { html: '<div class="bg"><div class="box" style="background:rgba(255,99,71,0.5)">rgba</div></div>', css: '.bg{background:repeating-linear-gradient(45deg,#4B3FD8 0 12px,#fff 12px 24px);padding:20px}.box{padding:30px;color:#fff;font:20px sans-serif}' }],
    ]),
    place('Add a border', 'Pick the rule that draws a red-orange border.', [['<h1 style="', { gap: 0 }, '">Colours</h1>']], ['border:2px solid Tomato;', 'border=2px Tomato;', 'border-color-line:Tomato;'], ['border:2px solid Tomato;'], 'Colours work on text, backgrounds and borders.'),
    check('Which of these is white?', ['#ffffff', 'rgb(0,0,0)', 'hsl(0,100%,50%)'], 'ff is the most of each colour, and all of them together make white.', 'Black is all zeros.'),
    recap([
      ['🏷', 'Names like Tomato'],
      ['🔴', 'RGB: 0 to 255 for each light'],
      ['#️⃣', 'HEX: #rrggbb'],
      ['🌈', 'HSL: hue, saturation, lightness, and alpha for see-through'],
    ]),
  ]),

  lesson('html-3-3', 'Adding CSS to a page', 5, [
    chat(['Styling every element one by one is slow.', 'CSS can style a whole page, or a whole website, at once.']),
    reveal('Three ways to add CSS', [
      ['1️⃣ Inline', 'The style attribute on one element.'],
      ['2️⃣ Internal', 'A <style> element inside <head>, for one page.'],
      ['3️⃣ External', 'A separate .css file, linked to many pages.'],
    ]),
    explore('Internal CSS', ['<head>', '  <style>', '    h1 { color: blue; }', '    p  { color: gray; }', '  </style>', '</head>'], [
      [2, '<style> holds CSS for this page. It goes in the head.'],
      [3, 'The selector h1 picks every h1 on the page. The rules go inside curly braces.', 'h1'],
      [4, 'p picks every paragraph.', 'p'],
    ], { page: { html: '<h1>Garden Club</h1><p>Meets every Sunday.</p>', css: 'h1{color:blue} p{color:gray}' } }),
    explore('External CSS', ['<head>', '  <link rel="stylesheet" href="styles.css">', '</head>'], [
      [2, '<link> connects the page to styles.css. Change that one file and every page linked to it changes.'],
    ], { page: { html: '<p>Every page that links to styles.css shares its look.</p>' }, minTaps: 1 }),
    live('Space inside the border', 'Tap a padding value. Padding is the space between the content and the border.', ['<div style="border:3px solid #4B3FD8; padding:{{v}}; margin:20px;">Box</div>'], ['20px', '4px', '40px'], { caption: 'margin is the space outside the border; padding is the space inside it.' }),
    toggle('Which style wins?', [
      ['Internal only', ['<style> h1 { color: blue; } </style>', '<h1>Hello</h1>'], 'The internal CSS makes the heading blue.', { html: '<h1>Hello</h1>', css: 'h1{color:blue}' }],
      ['Add inline', ['<style> h1 { color: blue; } </style>', '<h1 style="color:red;">Hello</h1>'], 'The inline style wins: inline styles beat internal and external ones.', { html: '<h1 style="color:red;">Hello</h1>', css: 'h1{color:blue}' }],
    ]),
    tapbug('The styles won’t load', ['<link rel="stylesheet" src="styles.css">'], [[1, 'src="styles.css"', 'href="styles.css"']], '<link> uses href to point to the CSS file.'),
    recap([
      ['📍', 'Inline: one element'],
      ['📄', 'Internal: <style> in the head'],
      ['🗂', 'External: <link> to a .css file, best for websites'],
      ['🥇', 'Inline wins when rules conflict'],
    ]),
  ]),

  challenge('html-3-ch', 'Module 3 Challenge', { icon: '🎨', name: 'Colour Painter' }, ['Style an element with the style attribute', 'Write colours as names, RGB, HEX and HSL', 'Choose inline, internal or external CSS'], [
    mcq(1, 'Which attribute adds CSS directly to one element?', ['style', 'class', 'css', 'font'], 'Inline CSS uses the style attribute.', { mono: true }),
    mcq(2, 'Which code is pure red?', ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', '#0000ff', 'hsl(120, 100%, 50%)'], 'Red is at full strength (255); green and blue are 0.', { mono: true }),
    mcq(3, 'Where does the <style> element go?', ['Inside <head>', 'After </html>', 'Inside every <p>', 'Inside the title'], 'Internal CSS goes in the head.'),
    mcq(4, 'Which line links an external stylesheet?', ['<link rel="stylesheet" href="styles.css">', '<style src="styles.css">', '<css href="styles.css">', '<script href="styles.css">'], 'External CSS uses <link> with rel and href.', { mono: true }),
    mcq(5, 'What does the alpha value in rgba() control?', ['Transparency', 'Brightness', 'Font size', 'Hue'], '0 is fully transparent, 1 is solid.'),
    swipe([
      ['font-color is a CSS property', false, 'Text colour is just color.'],
      ['#000000 is black', true, 'All zeros means no light: black.'],
      ['An external CSS file can style many pages', true, 'Link it from every page.'],
      ['Padding is the space outside the border', false, 'Padding is inside; margin is outside.'],
    ]),
    pairs([['text-align', 'Left, centre or right'], ['font-size', 'How big the text is'], ['background-color', 'Colour behind the content'], ['margin', 'Space outside the border']], 'Each property changes one thing about how an element looks.'),
    pickCode('Which makes a centred, blue heading?', ['<h1 style="color:blue; text-align:center;">', '<h1 style="color=blue, align=center">', '<h1 color="blue" center>'], 'Colons between property and value, semicolons between rules.'),
    bugTask(['<style>', '  p { color: green }', '  h1 ( color: navy; )', '</style>'], [[3, '( color: navy; )', '{ color: navy; }']], 'CSS rules go inside curly braces { }. (The missing semicolon after green is fine for the last rule.)'),
    xray(
      { html: '<div class="card"><h1>Garden Club</h1><p>Meets every Sunday.</p><div class="box">Join today</div></div>', css: '.card{background-color:#FFF3CD;padding:12px} h1{text-align:center} p{color:gray} .box{border:4px solid #4B3FD8;padding:8px}' },
      [
        ['.card', 'The yellow background', 'background-color', ['background-color', 'color', 'border']],
        ['h1', 'The centred heading', 'text-align', ['text-align', 'font-size', 'margin']],
        ['p', 'The grey text', 'color', ['color', 'background-color', 'font-family']],
        ['.box', 'The thick line around the box', 'border', ['border', 'padding', 'margin']],
      ],
    ),
    arrange(['<head>', '<style>', 'body { background-color: lightyellow; }', 'h1 { color: darkgreen; }', '</style>', '</head>', '<body><h1>Garden Club</h1></body>'], 'a light yellow page with a dark green heading'),
  ]),
];
