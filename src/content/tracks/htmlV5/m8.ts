// HTML track · Module 8 · Media and Graphics. Previews use built-in shapes instead of real media files,
// so lessons work offline; the code shown is the real thing.
import type { Lesson } from '../../types';
import { arrange, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const PLAYER_CSS = 'video,audio{width:100%;max-width:320px;background:#16142B;border-radius:8px} .yt{width:300px;height:150px;background:#16142B;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:10px;font:16px sans-serif}';
const CANVAS_JS = '<canvas id="board" width="200" height="100" style="border:1px solid #ccc"></canvas><script>var c=document.getElementById("board");if(c.getContext){var x=c.getContext("2d");x.fillStyle="tomato";x.fillRect(20,20,150,60);}</script>';

export const HTML_M8: Lesson[] = [
  lesson('h-media', 'Video', 4, [
    chat(['Before HTML5, videos needed extra plug-ins.', 'Now one tag does it all: <video>.']),
    explore('A video player', ['<video width="320" height="180" controls>', '  <source src="robot.mp4" type="video/mp4">', '  <source src="robot.webm" type="video/webm">', '  Your browser does not support video.', '</video>'], [
      [1, 'controls shows play, pause, volume and full-screen buttons.', 'video'],
      [2, '<source> gives a video file. The browser plays the first format it supports.', 'video'],
      [4, 'This text shows only in browsers that can’t play video.'],
    ], { page: { html: '<video width="320" height="180" controls></video>', css: PLAYER_CSS } }),
    toggle('Video settings', [
      ['controls', ['<video src="robot.mp4" controls>'], 'The player buttons appear.', { html: '<video controls width="300" height="150"></video>', css: PLAYER_CSS }],
      ['no controls', ['<video src="robot.mp4">'], 'Without controls there are no buttons to press.', { html: '<video width="300" height="150"></video>', css: PLAYER_CSS }],
      ['autoplay muted loop', ['<video src="robot.mp4" autoplay muted loop>'], 'Starts by itself, silently, and repeats. Most browsers allow autoplay only when muted.', { html: '<video width="300" height="150" autoplay muted loop></video>', css: PLAYER_CSS }],
      ['poster', ['<video src="robot.mp4" controls poster="cover.jpg">'], 'poster shows a picture before the video plays.', { html: '<div class="yt">🎬 Cover picture</div>', css: PLAYER_CSS }],
    ]),
    reveal('Video formats', [
      ['🎞 MP4', 'Works in all major browsers: the safest choice.'],
      ['🌐 WebM', 'An open format with smaller files.'],
      ['🟠 Ogg', 'An open format with older support.'],
    ]),
    explore('Subtitles', ['<video src="trip.mp4" controls>', '  <track src="subs_en.vtt" kind="subtitles" srclang="en" label="English">', '</video>'], [[2, '<track> goes inside <video> and adds subtitles from a .vtt file. The CC button in the player turns them on.', 'video']], { page: { html: '<video controls width="300" height="150"></video>', css: PLAYER_CSS }, minTaps: 1 }),
    tapbug('It won’t start by itself', ['<video width="320" autoplay>', '  <source src="intro.mp4" type="video/mp4">', '</video>'], [[1, 'autoplay', 'autoplay muted']], 'Most browsers block autoplay with sound. Add muted.'),
    recap([
      ['🎬', '<video controls> with <source> files'],
      ['🔇', 'autoplay needs muted'],
      ['🖼', 'poster for a cover picture'],
      ['💬', '<track> for subtitles'],
    ]),
  ]),

  lesson('html-8-2', 'Audio', 3, [
    explore('An audio player', ['<audio controls>', '  <source src="bell.mp3" type="audio/mpeg">', '  <source src="bell.ogg" type="audio/ogg">', '  Your browser does not support audio.', '</audio>'], [
      [1, '<audio controls> draws a slim player bar.', 'audio'],
      [2, 'MP3 files use the type audio/mpeg.', 'audio'],
    ], { page: { html: '<audio controls></audio>', css: PLAYER_CSS }, minTaps: 2 }),
    reveal('Audio formats', [
      ['🎵 MP3', 'audio/mpeg: works everywhere.'],
      ['🎙 WAV', 'audio/wav: high quality, large files.'],
      ['🟠 Ogg', 'audio/ogg: an open format.'],
    ]),
    toggle('With or without controls', [
      ['controls', ['<audio src="bell.mp3" controls></audio>'], 'A player bar appears.', { html: '<audio controls></audio>', css: PLAYER_CSS }],
      ['no controls', ['<audio src="bell.mp3"></audio>'], 'Nothing at all shows on the page. autoplay, loop and muted work like they do for video.', { html: '<p style="color:#999;font:13px sans-serif">(nothing to see)</p>' }],
    ]),
    place('A tune for a birthday card', 'Add a player that repeats the tune.', [['<div class="card">Happy Birthday!'], ['  ', { gap: 0 }], ['</div>']], ['<audio controls loop src="tune.mp3"></audio>', '<audio src="tune.mp3"></audio>', '<video src="tune.mp3"></video>'], ['<audio controls loop src="tune.mp3"></audio>'], 'controls makes it visible; loop repeats it.', { css: `.card{background:#FFE3EE;border-radius:12px;padding:12px;font:18px sans-serif} ${PLAYER_CSS}` }),
    check('Which type is used for MP3 files?', ['audio/mpeg', 'audio/mp3', 'sound/mp3'], 'MP3 is a kind of MPEG audio, so its type is audio/mpeg.', 'It isn’t the file ending.'),
    recap([
      ['🔊', '<audio controls> with <source> files'],
      ['🎵', 'MP3 is audio/mpeg'],
      ['🔁', 'loop repeats; no controls means nothing to see'],
    ]),
  ]),

  lesson('html-8-3', 'YouTube and plug-ins', 4, [
    chat(['Hosting big videos costs a lot.', 'Most sites upload to YouTube and embed the player instead.']),
    reveal('Find the video ID', [['youtube.com/watch?v=ABC123xyz', 'The part after v= is the video ID: ABC123xyz. You need it for the embed.']], { mono: true }),
    explore('Embed the player', ['<iframe width="420" height="236"', '  src="https://www.youtube.com/embed/ABC123xyz"', '  title="Intro video"></iframe>'], [
      [2, 'Use the /embed/ address inside an iframe, not the normal watch link.', '.yt'],
      [3, 'The title describes the frame for screen readers.', '.yt'],
    ], { page: { html: '<div class="yt">▶ Intro video</div>', css: PLAYER_CSS }, minTaps: 2 }),
    toggle('Settings in the address', [
      ['autoplay', ['src=".../embed/ABC123xyz?autoplay=1&mute=1"'], 'Starts by itself, muted.'],
      ['no controls', ['src=".../embed/ABC123xyz?controls=0"'], 'Hides the player buttons.'],
      ['loop', ['src=".../embed/ABC123xyz?loop=1&playlist=ABC123xyz"'], 'Repeats the video (loop needs the playlist value). The first setting starts with ?, the rest join with &.'],
    ]),
    reveal('Old plug-ins', [
      ['🧩 <object> and <embed>', 'Once loaded plug-ins such as Flash.'],
      ['⛔ Gone', 'Flash and Java applets no longer work in modern browsers.'],
      ['✅ Today', 'Use <video>, <audio>, <iframe>, <img> and <canvas> instead.'],
    ]),
    tapbug('The video won’t load', ['<iframe src="https://www.youtube.com/watch?v=ABC123xyz"></iframe>'], [[1, 'watch?v=', 'embed/']], 'The watch page refuses to load inside iframes. Use the embed address.'),
    recap([
      ['▶️', 'Embed YouTube with an iframe'],
      ['🆔', 'Use /embed/VIDEO_ID'],
      ['❓', 'Settings go after ?, joined by &'],
      ['🧩', 'Old plug-ins like Flash are gone'],
    ]),
  ]),

  lesson('html-8-4', 'Graphics: SVG and canvas', 5, [
    reveal('Two ways to draw', [
      ['✏️ SVG', 'Shapes written as tags. They stay sharp at any size.'],
      ['🖌 Canvas', 'An empty drawing area that JavaScript paints pixel by pixel.'],
    ]),
    live('Change the circle', 'Tap a radius and watch the circle.', ['<svg width="120" height="120">', '  <circle cx="60" cy="60" r="{{v}}"', '    stroke="green" stroke-width="4" fill="yellow" />', '</svg>'], ['40', '20', '55']),
    reveal('SVG shapes', [
      ['<rect>', 'A rectangle.'],
      ['<circle>', 'A circle.'],
      ['<line>', 'A straight line.'],
      ['<polygon>', 'A shape with many corners, like a star.'],
      ['<text>', 'Text inside the drawing.'],
    ], { mono: true }),
    explore('Painting on a canvas', ['<canvas id="board" width="200" height="100"></canvas>', '<script>', '  const ctx = document.getElementById("board").getContext("2d");', '  ctx.fillStyle = "tomato";', '  ctx.fillRect(20, 20, 150, 60);', '</script>'], [
      [1, 'An empty 200 × 100 drawing area.', 'canvas'],
      [3, 'Get the canvas, then its 2D drawing tool.', 'canvas'],
      [4, 'Choose a colour.', 'canvas'],
      [5, 'Draw a filled rectangle at x 20, y 20, 150 wide and 60 tall.', 'canvas'],
    ], { page: { html: CANVAS_JS } }),
    live('Where is (0, 0)?', 'Tap an x value. x grows to the right, y grows downward, and (0, 0) is the top-left corner.', ['<svg width="220" height="100" style="background:#F3F1FF">', '  <text x="{{v}}" y="50" font-size="28">★</text>', '</svg>'], ['150', '0', '90']),
    reveal('Which one when?', [
      ['✏️ SVG', 'Logos, icons, charts and maps: anything that must stay sharp.'],
      ['🖌 Canvas', 'Games, animations, photo effects and lots of moving things. A canvas is 300 × 150 unless you set its size.'],
    ]),
    tapbug('Nothing is drawn', ['<svg width="100" height="100">', '  <circle cx="50" cy="50" fill="blue" />', '</svg>'], [[2, 'cy="50"', 'cy="50" r="40"']], 'The circle has no r (radius), so it has no size.'),
    recap([
      ['✏️', 'SVG: shapes as tags, sharp at any size'],
      ['🖌', 'Canvas: pixels drawn by JavaScript'],
      ['📍', '(0, 0) is the top-left corner'],
      ['🎮', 'Canvas for games, SVG for icons and charts'],
    ]),
  ]),

  challenge('html-8-ch', 'Module 8 Challenge', { icon: '🎬', name: 'Media Maker' }, ['Add video and audio with the right settings', 'Embed a YouTube video', 'Draw with SVG and canvas'], [
    mcq(1, 'Which attribute shows play and pause buttons on a video?', ['controls', 'buttons', 'play', 'player'], 'controls adds the player’s built-in buttons.', { mono: true }),
    mcq(2, 'What do most browsers need before a video can autoplay?', ['The muted attribute', 'The loop attribute', 'A poster picture', 'An Ogg file'], 'Autoplay with sound is usually blocked.'),
    mcq(3, 'Which video format is the safest choice for every browser?', ['MP4', 'AVI', 'MOV', 'FLV'], 'MP4 works in every major browser.'),
    mcq(4, 'Which address do you use to embed a YouTube video?', ['youtube.com/embed/ID', 'youtube.com/watch?v=ID', 'youtube.com/video/ID', 'youtube.com/play/ID'], 'The embed address works inside an iframe.', { mono: true }),
    mcq(5, 'Which is true about SVG?', ['It stays sharp at any size', 'It is drawn pixel by pixel with JavaScript', 'It can only draw rectangles', 'It needs a plug-in'], 'SVG describes shapes, so it scales without blurring.'),
    swipe([
      ['<audio> without controls shows nothing on the page', true, 'There is no player to see.'],
      ['Flash still works in modern browsers', false, 'It was switched off years ago.'],
      ['On a canvas, (0, 0) is the top-left corner', true, 'x goes right, y goes down.'],
      ['<track> adds subtitles to a video', true, 'From a .vtt file.'],
    ]),
    pairs([['poster', 'Picture shown before the video plays'], ['audio/mpeg', 'Type for MP3 files'], ['getContext("2d")', 'Gets the canvas drawing tool'], ['<circle r="40">', 'SVG shape with a radius of 40']], 'Media settings and drawing tools.'),
    pickCode('Which video starts by itself, silently, and repeats?', ['<video autoplay muted loop>', '<video autoplay loop>', '<video play silent repeat>'], 'autoplay needs muted; loop repeats.'),
    bugTask(['<audio controls>', '  <source src="song.mp3" type="audio/mp3">', '</audio>'], [[2, 'audio/mp3', 'audio/mpeg']], 'MP3 files use the type audio/mpeg.'),
    xray(
      { html: `<video controls width="260" height="120"></video><br><audio controls></audio><br><iframe srcdoc="<p style=&quot;font-family:sans-serif&quot;>▶ YouTube player</p>" width="260" height="70" title="YouTube player"></iframe><br><svg width="60" height="60"><circle cx="30" cy="30" r="26" fill="#FF9F1C"/></svg>${CANVAS_JS}`, css: PLAYER_CSS },
      [
        ['video', 'The video player', '<video>', ['<video>', '<iframe>', '<canvas>']],
        ['audio', 'The slim audio bar', '<audio>', ['<audio>', '<video>', '<track>']],
        ['iframe', 'The YouTube player', '<iframe>', ['<iframe>', '<video>', '<embed>']],
        ['svg', 'The sharp orange logo', '<svg>', ['<svg>', '<img>', '<canvas>']],
        ['canvas', 'The drawing area', '<canvas>', ['<canvas>', '<svg>', '<div>']],
      ],
    ),
    arrange(['<video width="320" controls poster="cover.jpg">', '<source src="trip.mp4" type="video/mp4">', '<source src="trip.webm" type="video/webm">', '<track src="subs_en.vtt" kind="subtitles" srclang="en" label="English">', 'Your browser does not support video.', '</video>'], 'a player with a cover picture, two formats and English subtitles', PLAYER_CSS),
  ]),
];
