// Built-in pictures for lesson pages. Lessons write short names like url(cup.svg) or src="dish.svg"; the page
// builder swaps them for the drawing itself, so the pictures work offline and the code stays easy to read.

const SVG: Record<string, string> = {
  'cup.svg':
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M10 18h22v12a10 10 0 0 1-10 10h-2a10 10 0 0 1-10-10z" fill="#C2410C"/><path d="M32 21h3a5 5 0 0 1 0 10h-3" fill="none" stroke="#C2410C" stroke-width="3"/><path d="M17 6c-2 3 2 5 0 8M23 6c-2 3 2 5 0 8" fill="none" stroke="#7C5E45" stroke-width="2" stroke-linecap="round"/></svg>',
  'leaf.svg':
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M10 30C10 16 20 8 32 8c0 14-8 22-22 22z" fill="#86C99A"/><path d="M10 30L26 14" stroke="#3F8F5A" stroke-width="2"/></svg>',
  'banner.svg':
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="240" viewBox="0 0 600 240"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDBA74"/><stop offset="1" stop-color="#FEF3C7"/></linearGradient></defs><rect width="600" height="240" fill="url(#s)"/><circle cx="470" cy="90" r="38" fill="#FB923C"/><path d="M0 190q150-60 300 0t300 0v50H0z" fill="#A3D9A5"/><rect x="120" y="120" width="120" height="80" rx="6" fill="#7C2D12"/><path d="M110 125l70-40 70 40z" fill="#C2410C"/><rect x="165" y="160" width="30" height="40" fill="#FDE68A"/></svg>',
  'dish.svg':
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="400" height="260" fill="#FDE7C7"/><ellipse cx="200" cy="140" rx="150" ry="90" fill="#FFFFFF"/><ellipse cx="200" cy="140" rx="110" ry="62" fill="#F1F5F9"/><rect x="140" y="100" width="120" height="80" rx="14" fill="#E9A84C"/><rect x="152" y="110" width="96" height="60" rx="10" fill="#F6CD7A"/><circle cx="330" cy="60" r="20" fill="#86C99A"/></svg>',
  'riya.svg':
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#E0E7FF"/><circle cx="100" cy="80" r="38" fill="#B45309"/><path d="M30 200c6-50 40-74 70-74s64 24 70 74z" fill="#4B3FD8"/></svg>',
};

/** The names lessons can use. */
export const ASSET_NAMES = Object.keys(SVG);

const uri = (name: string) => `data:image/svg+xml,${encodeURIComponent(SVG[name])}`;
const PATTERN = new RegExp(`(["'(])(${ASSET_NAMES.map((n) => n.replace('.', '\\.')).join('|')})(?=["')])`, 'g');

/** Swaps built-in picture names for the pictures. Anything else is left alone. */
export const withAssets = (text: string) => text.replace(PATTERN, (_, open: string, name: string) => `${open}${uri(name)}`);
