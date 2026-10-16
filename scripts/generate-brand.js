// Builds every CodeYatra brand image from the vector mark (assets/brand/codeyatra-mark.svg)
// and the Lexend Bold wordmark, so icons stay sharp at any size.
// Usage: node scripts/generate-brand.js
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets/images');
const FONT = path.join(ROOT, 'node_modules/@expo-google-fonts/lexend/700Bold/Lexend_700Bold.ttf');

const NAVY = '#170E5C';
const INDIGO = '#4B3FD8';
const LAVENDER = '#A594FF';
const GREY = '#6E6A88';
const TILE_TOP = '#FFFFFF';
const TILE_BOTTOM = '#EEEBFB';

// The mark's inner shapes (120×120 box), without the outer <svg>.
const markSvg = fs.readFileSync(path.join(ROOT, 'assets/brand/codeyatra-mark.svg'), 'utf8');
const MARK = markSvg.replace(/^[\s\S]*?<svg[^>]*>|<\/svg>\s*$/g, '').replace(/<!--[\s\S]*?-->/g, '');
/** The mark in one flat colour (for monochrome icons). */
const MARK_MONO = (color) => MARK.replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`).replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);
/** The mark for dark backgrounds: white c, lavender y, saffron footprints. */
const MARK_ON_DARK = MARK.replace(`stroke="${NAVY}"`, 'stroke="#FFFFFF"').replace(`stroke="${INDIGO}"`, `stroke="${LAVENDER}"`);

const defs = `<defs>
  <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${TILE_TOP}"/><stop offset="1" stop-color="${TILE_BOTTOM}"/></linearGradient>
</defs>`;

/** The mark drawn `width` px wide (it is square) with its top-left corner at (x, y). */
const mark = (x, y, width, variant) =>
  `<g transform="translate(${x} ${y}) scale(${width / 120})">${variant === 'dark' ? MARK_ON_DARK : variant ? MARK_MONO(variant) : MARK}</g>`;
/** "CodeYatra", centred on (cx, baseline). */
const word = (cx, baseline, size, code = NAVY, yatra = INDIGO) =>
  `<text x="${cx}" y="${baseline}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="${size}" letter-spacing="${-size * 0.02}"><tspan fill="${code}">Code</tspan><tspan fill="${yatra}">Yatra</tspan></text>`;
/** The tagline in spaced capitals. */
const tagline = (cx, baseline, size, fill = GREY) =>
  `<text x="${cx}" y="${baseline}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="${size}" letter-spacing="${size * 0.18}" fill="${fill}">YOUR JOURNEY IN CODE</text>`;

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${body}</svg>`;

function render(markup, file, width) {
  const png = new Resvg(markup, { fitTo: { mode: 'width', value: width }, font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Lexend' } }).render().asPng();
  const out = path.isAbsolute(file) ? file : path.join(OUT, file);
  fs.writeFileSync(out, png);
  console.log('wrote', path.relative(ROOT, out));
}

/** Mark, wordmark and tagline, centred in a square of `s` px. Fits Android's centred safe circle (2/3 of the box). */
const stacked = (s) => {
  const mw = s * 0.3;
  const top = s * 0.25;
  return mark((s - mw) / 2, top, mw) + word(s / 2, top + mw + s * 0.06, s * 0.072) + tagline(s / 2, top + mw + s * 0.11, s * 0.022);
};

// App and store icon: the mark on a soft white-to-lavender tile (Android and Play round the corners).
const icon = (s) => svg(s, s, `<rect width="${s}" height="${s}" fill="url(#tile)"/>${mark(s * 0.14, s * 0.14, s * 0.72)}`);
render(icon(1024), 'icon.png', 1024);
render(icon(1024), path.join(ROOT, 'store/icon-512.png'), 512);

// Android adaptive icon layers: the mark inside the safe zone on the tile.
render(svg(1024, 1024, `<rect width="1024" height="1024" fill="url(#tile)"/>`), 'android-icon-background.png', 1024);
render(svg(1024, 1024, mark(512 - 270, 512 - 270, 540)), 'android-icon-foreground.png', 1024);
render(svg(1024, 1024, mark(512 - 290, 512 - 290, 580, '#FFFFFF')), 'android-icon-monochrome.png', 1024);

// Splash and onboarding logo: mark, name and tagline on the white splash background.
render(svg(1200, 1200, stacked(1200)), 'splash-icon.png', 1200);
render(svg(1200, 1200, stacked(1200)), 'logo.png', 1200);

// Web favicon: the mark on the tile.
render(svg(192, 192, `<rect width="192" height="192" rx="44" fill="url(#tile)"/>${mark(14, 14, 164)}`), 'favicon.png', 48);

// Brand files for the store, website and documents.
const BRAND = path.join(ROOT, 'assets/brand');
render(svg(1024, 1024, mark(62, 62, 900)), path.join(BRAND, 'codeyatra-mark.png'), 1024);
const horizontal = (variant, code, yatra, tagFill) =>
  svg(
    1500,
    360,
    `${mark(20, 20, 320, variant)}<text x="350" y="210" font-family="Lexend" font-weight="700" font-size="150" letter-spacing="-3"><tspan fill="${code}">Code</tspan><tspan fill="${yatra}">Yatra</tspan></text><text x="356" y="285" font-family="Lexend" font-weight="700" font-size="40" letter-spacing="7" fill="${tagFill}">YOUR JOURNEY IN CODE</text>`,
  );
render(horizontal(undefined, NAVY, INDIGO, GREY), path.join(BRAND, 'codeyatra-logo.png'), 1500);
render(horizontal('dark', '#FFFFFF', LAVENDER, '#B9B5D9'), path.join(BRAND, 'codeyatra-logo-white.png'), 1500);
render(
  svg(1500, 360, `${mark(20, 20, 320, NAVY)}<text x="350" y="238" font-family="Lexend" font-weight="700" font-size="150" letter-spacing="-3" fill="${NAVY}">CodeYatra</text>`),
  path.join(BRAND, 'codeyatra-logo-mono.png'),
  1500,
);
