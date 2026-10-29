// HTML track · Module 4 · Links and Images.
import type { Lesson } from '../../types';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pic, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

export const HTML_M4: Lesson[] = [
  lesson('w-html-2', 'Links', 4, [
    chat(['Links are the roads of the web.', 'One tap and you travel to another page.']),
    reveal('The parts of a link', [
      ['<a>', 'The anchor element: the link itself.'],
      ['href', 'The address the link goes to.'],
      ['Visit site', 'The link text the user taps.'],
    ], { code: ['<a href="https://example.com">Visit site</a>'], mono: true }),
    reveal('Link colours', [
      ['🔵 Unvisited', 'Blue and underlined.'],
      ['🟣 Visited', 'Purple and underlined.'],
      ['🔴 Active', 'Red, while it is being tapped.'],
    ], { intro: 'Browsers colour links like this until CSS changes them. Tap each.' }),
    toggle('Same tab or new tab?', [
      ['target="_self"', ['<a href="https://example.com" target="_self">Visit</a>'], '_self (the default) opens the page in the same tab.'],
      ['target="_blank"', ['<a href="https://example.com" target="_blank">Visit</a>'], '_blank opens it in a new tab. Use it only when a new tab really helps.'],
    ]),
    reveal('Special links', [
      ['href="mailto:hello@example.com"', 'Opens the email app.', '✉️'],
      ['href="tel:+911234567890"', 'Opens the phone dialler.', '📞'],
      ['<a href="…"><img …></a>', 'A picture inside a link becomes a link.', '🖼'],
    ], { mono: true }),
    place('Make a “Jump to FAQ” link', 'Put the link’s address on top, and the matching id on the FAQ heading.', [['<a ', { gap: 0 }, '>Jump to FAQ</a>'], ['<p>Lots of text…</p>'], ['<h2 ', { gap: 1 }, '>FAQ</h2>']], ['href="#faq"', 'id="faq"', 'src="#faq"'], ['href="#faq"', 'id="faq"'], 'A # link jumps to the element with that id. Another page works too: help.html#faq.'),
    tapbug('The link goes nowhere', ['<a src="https://example.com">Home</a>'], [[1, 'src=', 'href=']], 'Links use href; images use src.'),
    recap([
      ['🔗', '<a href> makes a link'],
      ['🆕', 'target="_blank" opens a new tab'],
      ['✉️', 'mailto: and tel: open email and the dialler'],
      ['#️⃣', '#id jumps within a page'],
    ]),
  ]),

  lesson('html-4-2', 'File paths', 4, [
    chat(['A file path is directions to a file.', 'Wrong directions, and the image or page won’t load.']),
    explore('A website’s folders', ['website/', '├── index.html', '├── logo.png', '├── images/', '│   └── cat.jpg', '└── pages/', '    └── about.html'], [
      [3, 'From index.html, the logo is next door: logo.png'],
      [5, 'From index.html, the cat is inside a folder: images/cat.jpg'],
      [7, 'From index.html, the about page is in pages: pages/about.html'],
    ], { page: { html: '<p>Tap a file to see its path from index.html.</p>' } }),
    reveal('Four kinds of path', [
      ['logo.png', 'In the same folder as this page.', '📄'],
      ['images/cat.jpg', 'Inside the images folder.', '📁'],
      ['/images/cat.jpg', 'Starting from the root of the website.', '🏠'],
      ['../logo.png', 'One folder up.', '⬆️'],
    ], { mono: true }),
    reveal('Absolute or relative?', [
      ['🌍 Absolute', 'The full web address, like https://example.com/images/cat.jpg'],
      ['🧭 Relative', 'Directions from this page, like images/cat.jpg. Use these for your own files: they keep working if the site moves.'],
    ]),
    place('Climb up one folder', 'You are in pages/about.html. Show the logo from the main folder.', [['<img src="', { gap: 0 }, '" alt="Logo">']], ['../logo.png', 'logo.png', 'pages/logo.png'], ['../logo.png'], '../ climbs up out of pages, back to the main folder where logo.png is.', { preview: false }),
    tapbug('The cat won’t load', ['<img src="image/cat.jpg" alt="Cat">'], [[1, 'image/', 'images/']], 'The folder is called images. Paths must match folder names exactly, including spelling and capitals.'),
    recap([
      ['📄', 'Same folder: file.jpg'],
      ['📁', 'Subfolder: folder/file.jpg'],
      ['⬆️', 'Up a level: ../file.jpg'],
      ['🌍', 'Absolute paths are full web addresses'],
    ]),
  ]),

  lesson('html-4-3', 'Images', 4, [
    explore('An image, attribute by attribute', [`<img src="cat.jpg" alt="A ginger cat"`, '     width="300" height="200">'], [
      [1, 'src is the path to the image file, and alt is the text alternative. Both are required.', 'img'],
      [2, 'width and height set the size in pixels. Setting both stops the page jumping while the image loads.', 'img'],
    ], { page: { html: `<img src="${pic(300, 200, 'Ginger cat')}" alt="A ginger cat" width="300" height="200">` }, minTaps: 2 }),
    toggle('A slow network', [
      ['Fast', ['<img src="cat.jpg" alt="A ginger cat">'], 'The photo shows.', { html: `<img src="${pic(240, 140, 'Ginger cat')}" alt="A ginger cat" width="240">` }],
      ['Slow network', ['<img src="cat.jpg" alt="A ginger cat">'], 'The image fails and “A ginger cat” shows instead. Screen readers read the same words aloud.', { html: '<img src="missing-cat.jpg" alt="A ginger cat" width="240" height="60">' }],
    ]),
    reveal('Image formats', [
      ['📷 JPG', 'Photos.'],
      ['🖼 PNG', 'Graphics; supports see-through parts.'],
      ['🎞 GIF', 'Simple animations.'],
      ['✏️ SVG', 'Logos and icons that stay sharp at any size.'],
      ['⚡ WebP', 'A modern format with smaller files.'],
    ]),
    live('Change the size', 'Tap a width. With only width set, the height follows and the shape stays right.', [`<img src="${pic(400, 240, 'Mountains')}" alt="Mountains" width="{{v}}">`], ['200', '100', '320']),
    place('A background picture', 'Pick the way to put a picture behind text.', [['<div ', { gap: 0 }, '>Night sky</div>']], [`style="background-image: url('${pic(300, 120, 'Stars')}');"`, 'src="stars.jpg"', 'alt="stars.jpg"'], [`style="background-image: url('${pic(300, 120, 'Stars')}');"`], 'Background pictures come from CSS, not from <img>.', { css: 'div{min-height:120px;color:#fff;font:20px sans-serif;padding:12px;background-color:#1e1b4b;background-size:cover}' }),
    reveal('Smart images', [
      ['loading="lazy"', 'The image loads only when you scroll near it, saving mobile data.', '🐢'],
      ['<picture>', 'Shows a different image on different screen sizes.', '📱'],
    ], { mono: true, code: ['<picture>', '  <source media="(min-width: 650px)" srcset="big.jpg">', '  <img src="small.jpg" alt="Mountain view">', '</picture>'] }),
    reveal('Image maps', [
      ['usemap="#menu"', 'Links the picture to a map with that name.'],
      ['<map name="menu">', 'Holds the clickable areas.'],
      ['<area shape="rect" coords="0,0,100,80" href="tea.html" alt="Tea">', 'One clickable part: a rectangle from the top-left corner (0,0) to (100,80). Shapes can be rect, circle or poly.'],
      ['When to use', 'A floor plan or a map with clickable rooms. For normal buttons, use links instead.'],
    ], { mono: true, code: ['<img src="menu-board.png" alt="Menu board" usemap="#menu">', '<map name="menu">', '  <area shape="rect" coords="0,0,100,80" href="tea.html" alt="Tea">', '</map>'] }),
    tapbug('One tag too many', ['<img src="logo.png" alt="Company logo"></img>'], [[1, '</img>', '']], '<img> is an empty element: it has no closing tag.'),
    recap([
      ['🖼', '<img src alt> adds an image'],
      ['🔊', 'Always write useful alt text'],
      ['📏', 'Set width and height'],
      ['🐢', 'loading="lazy" saves data; background pictures use CSS'],
    ]),
  ]),

  lesson('html-4-4', 'Page title and favicon', 3, [
    reveal('Where the title shows', [
      ['🗂 The tab', 'The text on the browser tab.'],
      ['⭐ Bookmarks', 'The name of a saved bookmark.'],
      ['🔍 Search results', 'The big blue line in Google results.'],
    ], { intro: 'Every page needs a <title>. Tap each place it appears.' }),
    beforeAfter('A good title', [['<title>Page 1</title>'], 'Page 1 tells nobody anything.', { html: '<div class="tab">Page 1</div>', css: '.tab{display:inline-block;background:#E4E1F5;border-radius:8px 8px 0 0;padding:6px 12px;font:14px sans-serif}' }], [['<title>Lemon Tea Recipe | Yatri Kitchen</title>'], 'Short, specific and different on every page.', { html: '<div class="tab">Lemon Tea Recipe | Yatri Kitchen</div>', css: '.tab{display:inline-block;background:#E4E1F5;border-radius:8px 8px 0 0;padding:6px 12px;font:14px sans-serif}' }]),
    chat(['See the tiny picture next to the tab title?', 'That’s a favicon: your site’s mini logo.']),
    explore('Title and favicon in the head', ['<head>', '  <title>Yatri Kitchen</title>', '  <link rel="icon" type="image/png" href="favicon.png">', '</head>'], [
      [2, '<title> names the tab.'],
      [3, '<link rel="icon"> adds the favicon. It goes in the head; the file is a small square image, like 32×32 pixels, in .ico, .png or .svg.'],
    ], { page: { html: '<div class="tab"><span>🍲</span> Yatri Kitchen</div>', css: '.tab{display:inline-block;background:#E4E1F5;border-radius:8px 8px 0 0;padding:6px 12px;font:14px sans-serif}' }, minTaps: 2 }),
    place('Give the page an identity', 'Put the title and the favicon link into the head.', [['<head>'], ['  ', { gap: 0 }], ['  ', { gap: 1 }], ['</head>']], ['<title>Yatri Kitchen</title>', '<link rel="icon" href="favicon.png">', '<h1>Yatri Kitchen</h1>'], ['<title>Yatri Kitchen</title>', '<link rel="icon" href="favicon.png">'], 'Both live in the head: the tab now shows the name and the icon.', { preview: false }),
    check('Where does the favicon <link> go?', ['Inside <head>', 'Inside <body>', 'Inside <title>'], 'Like the title, the favicon is information about the page, so it goes in the head.', 'It isn’t part of the visible page.', { mono: false }),
    recap([
      ['🗂', '<title> names the tab, bookmarks and search results'],
      ['🔍', 'Make titles clear and different on every page'],
      ['🟦', 'Favicon: <link rel="icon"> in the head'],
    ]),
  ]),

  challenge('html-4-ch', 'Module 4 Challenge', { icon: '🔗', name: 'Link Explorer' }, ['Link pages, email, phone and parts of a page', 'Write file paths that work', 'Add images with alt text, a title and a favicon'], [
    mcq(1, 'Which attribute sets where a link goes?', ['href', 'src', 'link', 'target'], 'href holds the link address.', { mono: true }),
    mcq(2, 'Which value opens a link in a new tab?', ['_blank', '_self', '_new', '_top'], 'target="_blank" opens a new tab.', { mono: true }),
    mcq(3, 'From pages/about.html, how do you reach logo.png in the main folder?', ['../logo.png', 'logo.png', 'pages/logo.png', '/pages/logo.png'], '../ moves up one folder.', { mono: true }),
    mcq(4, 'Why is the alt attribute important?', ['It describes the image for screen readers and shows if the image fails', 'It makes images load faster', 'It adds a border', 'It sets the file type'], 'alt makes images accessible.'),
    mcq(5, 'What is a favicon?', ['A small icon shown on the browser tab', 'The main heading', 'A large background image', 'A type of link'], 'It is added with <link rel="icon"> in the head.'),
    swipe([
      ['<img> needs a closing tag', false, '<img> is an empty element.'],
      ['Visited links are purple by default', true, 'Unvisited links are blue.'],
      ['href="#contact" jumps to the element with id="contact"', true, 'A # link jumps within the page.'],
      ['The favicon link goes inside <body>', false, 'It goes in the head.'],
    ]),
    pairs([['mailto:', 'Opens the email app'], ['tel:', 'Opens the phone dialler'], ['../', 'One folder up'], ['loading="lazy"', 'Loads the image when needed']], 'Special links, paths and lazy images.'),
    pickCode('Which makes an image a link?', ['<a href="shop.html"><img src="bag.png" alt="Shop"></a>', '<img href="shop.html" src="bag.png" alt="Shop">', '<a src="bag.png">shop.html</a>'], 'Put the <img> inside an <a>.'),
    bugTask(['<a href="https://example.com" target="blank">Visit</a>', '<img src="images/dog.jpg">'], [[1, 'target="blank"', 'target="_blank"'], [2, '<img src="images/dog.jpg">', '<img src="images/dog.jpg" alt="My dog">']], 'The new-tab value needs its underscore, and every image needs alt text.'),
    xray(
      { html: `<div class="tab"><span class="icon">🐾</span> <span class="name">Paws Cafe</span></div><p><a class="menu" href="#">Menu</a></p><img src="${pic(200, 110, 'Coffee')}" alt="Coffee cup" width="200"><p><a class="mail" href="mailto:hi@example.com">Email us</a></p>`, css: '.tab{display:inline-block;background:#E4E1F5;border-radius:8px 8px 0 0;padding:6px 12px;font:14px sans-serif}' },
      [
        ['.icon', 'The tab icon', '<link rel="icon">', ['<link rel="icon">', '<img>', '<title>']],
        ['.name', 'The tab name', '<title>', ['<title>', '<h1>', '<head>']],
        ['.menu', 'The Menu link', '<a href>', ['<a href>', '<link>', '<p>']],
        ['img', 'The photo', '<img>', ['<img>', '<picture>', '<a>']],
        ['.mail', 'Email us', '<a href="mailto:…">', ['<a href="mailto:…">', '<a href="tel:…">', '<address>']],
      ],
    ),
    arrange(['<head>', '<title>Paws Cafe</title>', '<link rel="icon" href="paw.png">', '</head>', '<body>', '<a href="menu.html">', `<img src="${pic(200, 110, 'Coffee')}" alt="Coffee cup" width="200">`, '</a>', '</body>'], 'the tab shows the paw icon and Paws Cafe; tapping the coffee photo opens the menu page'),
  ]),
];
