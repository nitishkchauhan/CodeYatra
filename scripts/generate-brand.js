// Builds CodeYatra's brand images from the master artwork (assets/brand/codeyatra-logo.png).
// The wordmark-free mark (codeyatra-mark.png) is used for square icons.
// Usage: npm i -D @resvg/resvg-js && node scripts/generate-brand.js
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'assets/brand/codeyatra-logo.png');
const OUT = path.join(ROOT, 'assets/images');
const BG = '#06104A'; // the artwork's own background colour

// The mark is the same artwork with the wordmark painted out, for square icons.
const MARK = path.join(ROOT, 'assets/brand/codeyatra-mark.png');
const src = fs.readFileSync(SRC);
const W = src.readUInt32BE(16);
const H = src.readUInt32BE(20);
const href = `data:image/png;base64,${src.toString('base64')}`;
const markHref = `data:image/png;base64,${fs.readFileSync(MARK).toString('base64')}`;

function render(svg, file, width) {
  fs.writeFileSync(path.join(OUT, file), new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng());
  console.log('wrote', file);
}

/** The artwork cropped to [x, y, size] and drawn into a square of `out` px at `scale` of the square. */
function crop(out, [x, y, size], { scale = 1, feather = false, background = true } = {}) {
  const k = (out * scale) / size;
  const offset = (out - out * scale) / 2;
  const mask = feather
    ? `<defs><radialGradient id="f"><stop offset="0.72" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
       <mask id="m"><circle cx="${out / 2}" cy="${out / 2}" r="${(out * scale) / 2}" fill="url(#f)"/></mask></defs>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${out}" height="${out}">
    ${mask}
    ${background ? `<rect width="${out}" height="${out}" fill="${BG}"/>` : ''}
    <g ${feather ? 'mask="url(#m)"' : ''}>
      <image x="${offset - x * k}" y="${offset - y * k}" width="${W * k}" height="${H * k}" xlink:href="${markHref}"/>
    </g>
  </svg>`;
}

// Robot plus the code blocks it points at.
const ROBOT = [292, 120, 750];

render(crop(1024, ROBOT), 'icon.png', 1024);
// Android adaptive layers: subject inside the safe zone, on the artwork's background colour.
render(crop(1024, ROBOT, { scale: 0.74, feather: true, background: false }), 'android-icon-foreground.png', 1024);
render(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="1024" height="1024" fill="${BG}"/></svg>`, 'android-icon-background.png', 1024);
render(crop(192, ROBOT), 'favicon.png', 48);

// Full logo with feathered edges so it melts into the splash / onboarding background.
const soft = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}">
  <defs>
    <linearGradient id="h" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.06" stop-color="#fff"/><stop offset="0.94" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.06" stop-color="#fff"/><stop offset="0.94" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="mh"><rect width="${W}" height="${H}" fill="url(#h)"/></mask>
    <mask id="mv"><rect width="${W}" height="${H}" fill="url(#v)"/></mask>
  </defs>
  <g mask="url(#mv)"><g mask="url(#mh)"><image width="${W}" height="${H}" xlink:href="${href}"/></g></g>
</svg>`;
render(soft, 'logo.png', W * 2);
render(soft, 'splash-icon.png', W * 2);
