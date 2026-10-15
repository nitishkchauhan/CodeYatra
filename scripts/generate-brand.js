// Builds every CodeYatra brand image from the vector mark (assets/brand/codeyatra-mark.svg)
// and the Lexend Bold wordmark, so icons stay sharp at any size.
// Usage: node scripts/generate-brand.js
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets/images');
const FONT = path.join(ROOT, 'node_modules/@expo-google-fonts/lexend/700Bold/Lexend_700Bold.ttf');

const NAVY_TOP = '#23157A';
const NAVY_BOTTOM = '#120A4A';
const INK = '#16123F';

// The mark's inner shapes (120×100 box), without the outer <svg>.
const markSvg = fs.readFileSync(path.join(ROOT, 'assets/brand/codeyatra-mark.svg'), 'utf8');
const MARK = markSvg.replace(/^[\s\S]*?<svg[^>]*>|<\/svg>\s*$/g, '').replace(/<!--[\s\S]*?-->/g, '');
/** The mark in one flat colour (for monochrome icons). */
const MARK_MONO = (color) =>
  MARK.replace(/<defs>[\s\S]*?<\/defs>/, '')
    .replace(/stroke="(?!none)[^"]*"/g, `stroke="${color}"`)
    .replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);

const defs = `<defs>
  <linearGradient id="navy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${NAVY_TOP}"/><stop offset="1" stop-color="${NAVY_BOTTOM}"/></linearGradient>
  <linearGradient id="yatra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC94A"/><stop offset="1" stop-color="#FF8A00"/></linearGradient>
</defs>`;

/** The mark drawn `width` px wide with its top-left corner at (x, y). */
const mark = (x, y, width, mono) => `<g transform="translate(${x} ${y}) scale(${width / 120})">${mono ? MARK_MONO(mono) : MARK}</g>`;
/** "CodeYatra", centred on (cx, baseline). */
const word = (cx, baseline, size, code) =>
  `<text x="${cx}" y="${baseline}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="${size}" letter-spacing="${-size * 0.02}"><tspan fill="${code}">Code</tspan><tspan fill="url(#yatra)">Yatra</tspan></text>`;

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${body}</svg>`;

function render(markup, file, width) {
  const png = new Resvg(markup, { fitTo: { mode: 'width', value: width }, font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: 'Lexend' } }).render().asPng();
  fs.writeFileSync(path.isAbsolute(file) ? file : path.join(OUT, file), png);
  console.log('wrote', path.relative(ROOT, path.isAbsolute(file) ? file : path.join(OUT, file)));
}

/** Mark above the wordmark, centred in a square of `s` px. Fits Android's 2/3 safe circle. */
const stacked = (s, code) => {
  const mw = s * 0.39;
  const top = s * 0.29;
  return mark((s - mw) / 2, top, mw) + word(s / 2, top + mw * (100 / 120) + s * 0.105, s * 0.086, code);
};

// Legacy / store icon: the full design on navy (Android and Play round the corners).
const icon = (s) => svg(s, s, `<rect width="${s}" height="${s}" fill="url(#navy)"/>${mark(s * 0.19, s * 0.14, s * 0.62)}${word(s / 2, s * 0.85, s * 0.15, '#FFFFFF')}`);
render(icon(1024), 'icon.png', 1024);
render(icon(1024), path.join(ROOT, 'store/icon-512.png'), 512);

// Android adaptive icon layers.
render(svg(1024, 1024, `<rect width="1024" height="1024" fill="url(#navy)"/>`), 'android-icon-background.png', 1024);
render(svg(1024, 1024, stacked(1024, '#FFFFFF')), 'android-icon-foreground.png', 1024);
render(svg(1024, 1024, mark(512 - 250, 512 - 208, 500, '#FFFFFF')), 'android-icon-monochrome.png', 1024);

// Splash: shown on the navy splash background, inside Android 12's centred circle.
render(svg(1200, 1200, stacked(1200, '#FFFFFF')), 'splash-icon.png', 1200);
render(svg(1200, 1200, stacked(1200, '#FFFFFF')), 'logo.png', 1200);

// Web favicon: the mark alone on navy.
render(svg(192, 192, `<rect width="192" height="192" rx="44" fill="url(#navy)"/>${mark(22, 32, 148)}`), 'favicon.png', 48);

// Brand files for the store, website and documents.
const BRAND = path.join(ROOT, 'assets/brand');
render(svg(1024, 1024, mark(92, 162, 840)), path.join(BRAND, 'codeyatra-mark.png'), 1024);
const horizontal = (code) => svg(1400, 360, `${mark(40, 50, 312)}<text x="390" y="238" font-family="Lexend" font-weight="700" font-size="150" letter-spacing="-3"><tspan fill="${code}">Code</tspan><tspan fill="url(#yatra)">Yatra</tspan></text>`);
render(horizontal(INK), path.join(BRAND, 'codeyatra-logo.png'), 1400);
render(horizontal('#FFFFFF'), path.join(BRAND, 'codeyatra-logo-white.png'), 1400);
render(svg(1400, 360, `${mark(40, 50, 312, '#16123F')}<text x="390" y="238" font-family="Lexend" font-weight="700" font-size="150" letter-spacing="-3" fill="#16123F">CodeYatra</text>`), path.join(BRAND, 'codeyatra-logo-mono.png'), 1400);
