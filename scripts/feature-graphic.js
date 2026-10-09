// Builds the 1024×500 Google Play feature graphic from the brand artwork.
// Usage: node scripts/feature-graphic.js  →  store/feature-graphic.png
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const ROOT = path.join(__dirname, '..');
const mark = fs.readFileSync(path.join(ROOT, 'assets/brand/codeyatra-mark.png'));
const href = `data:image/png;base64,${mark.toString('base64')}`;
const W = 1024;
const H = 500;

const chips = [
  ['HTML', '#E34F26', '#FFFFFF'],
  ['CSS', '#1572B6', '#FFFFFF'],
  ['JS', '#F7DF1E', '#16142B'],
  ['Python', '#3776AB', '#FFD43B'],
  ['C', '#283593', '#FFFFFF'],
  ['Java', '#E76F00', '#FFFFFF'],
  ['React', '#20232A', '#61DAFB'],
  ['SQL', '#0369A1', '#FFFFFF'],
  ['DSA', '#7C3AED', '#FFFFFF'],
];

let x = 64;
const chipSvg = chips
  .map(([label, bg, ink]) => {
    const w = 22 + label.length * 13;
    const s = `<rect x="${x}" y="356" width="${w}" height="40" rx="12" fill="${bg}"/><text x="${x + w / 2}" y="383" font-family="Consolas, monospace" font-size="20" font-weight="700" fill="${ink}" text-anchor="middle">${label}</text>`;
    x += w + 10;
    return s;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06104A"/><stop offset="0.65" stop-color="#14186A"/><stop offset="1" stop-color="#3B2FC0"/>
    </linearGradient>
    <radialGradient id="fade" cx="0.5" cy="0.5" r="0.5"><stop offset="0.7" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <mask id="m"><circle cx="790" cy="245" r="250" fill="url(#fade)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="800" cy="250" r="230" fill="#FF9F1C" opacity="0.08"/>
  <g mask="url(#m)"><image x="520" y="-40" width="560" height="560" xlink:href="${href}"/></g>
  <text x="64" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="800" fill="#FFFFFF">Code<tspan fill="#FF9F1C">Yatra</tspan></text>
  <text x="66" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="600" fill="#FFFFFF">Learn to code. Play the journey.</text>
  <text x="66" y="262" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#B9B6F2">16 tracks · 160 lessons · real code editor</text>
  <text x="66" y="296" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#B9B6F2">Placement mock tests · CBSE · certificates</text>
  ${chipSvg}
</svg>`;

const png = new Resvg(svg, { fitTo: { mode: 'width', value: W }, font: { loadSystemFonts: true } }).render().asPng();
fs.writeFileSync(path.join(ROOT, 'store/feature-graphic.png'), png);
console.log('wrote store/feature-graphic.png');
