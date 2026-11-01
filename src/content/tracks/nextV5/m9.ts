// Next.js · Module 9 · Performance and SEO: SEO fundamentals and the Metadata API, image and font optimization, and
// code splitting with lazy loading. Lesson 9.1 keeps the old module id (nx-meta-1).
import type { Lesson } from '../../types';
import { CAFE, CAFE_LAYOUT, DB_MENU } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, xray } from './kit';

const META_DISH = [
  'import { notFound } from "next/navigation";',
  'import { db } from "@/lib/db";',
  '',
  'async function getDish(params) {',
  '  const { id } = await params;',
  '  const dish = await db.dish.findUnique({ where: { id: Number(id) } });',
  '  if (!dish) notFound();',
  '  return dish;',
  '}',
  '',
  'export async function generateMetadata({ params }) {',
  '  const dish = await getDish(params);',
  '  return {',
  '    title: dish.name,',
  '    description: dish.name + " at Rosa’s Café, ₹" + dish.price + ".",',
  '  };',
  '}',
  '',
  'export default async function Dish({ params }) {',
  '  const dish = await getDish(params);',
  '  return <h1>{dish.name} · ₹{dish.price}</h1>;',
  '}',
];

const SITEMAP = [
  'import { db } from "@/lib/db";',
  '',
  'export default async function sitemap() {',
  '  const dishes = await db.dish.findMany();',
  '  return [',
  '    { url: "https://rosascafe.example/", lastModified: "2026-11-01" },',
  '    { url: "https://rosascafe.example/menu" },',
  '    ...dishes.map((d) => ({ url: "https://rosascafe.example/menu/" + d.id })),',
  '  ];',
  '}',
];
const ROBOTS = ['export default function robots() {', '  return {', '    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],', '    sitemap: "https://rosascafe.example/sitemap.xml",', '  };', '}'];
const SEO_APP = { ...CAFE, 'app/menu/page.js': DB_MENU, 'app/menu/[id]/page.js': META_DISH, 'app/sitemap.js': SITEMAP, 'app/robots.js': ROBOTS };

const IMAGE_PAGE = [
  'import Image from "next/image";',
  'import { Lora } from "next/font/google";',
  '',
  'const lora = Lora({ subsets: ["latin"] });',
  '',
  'export default function Special() {',
  '  return (',
  '    <div className="card">',
  '      <h1 className={lora.className}>Today’s special</h1>',
  '      <Image src="/dish.svg" alt="A bowl of mango sago" width={400} height={260} priority />',
  '      <p>Mango sago · ₹120</p>',
  '    </div>',
  '  );',
  '}',
];
const FONT_LAYOUT = ['import { Inter } from "next/font/google";', '', 'const inter = Inter({ subsets: ["latin"] });', '', 'export default function RootLayout({ children }) {', '  return (', '    <html lang="en" className={inter.className}>', '      <body>{children}</body>', '    </html>', '  );', '}'];

const LAZY_PAGE = [
  '"use client";',
  'import { useState } from "react";',
  'import dynamic from "next/dynamic";',
  '',
  'const SalesChart = dynamic(() => import("./SalesChart"), {',
  '  loading: () => <p className="muted">Loading the chart…</p>,',
  '});',
  '',
  'export default function Reports() {',
  '  const [show, setShow] = useState(false);',
  '  return (',
  '    <>',
  '      <h1>Reports</h1>',
  '      <button id="show" onClick={() => setShow(true)}>Show sales chart</button>',
  '      {show && <SalesChart />}',
  '    </>',
  '  );',
  '}',
];
const CHART = [
  '"use client";',
  '',
  'console.log("Chart code downloaded");',
  '',
  'const SALES = [["Mon", 12], ["Tue", 18], ["Wed", 9]];',
  '',
  'export default function SalesChart() {',
  '  return (',
  '    <div className="card">',
  '      {SALES.map(([day, cups]) => (',
  '        <p key={day}>{day} {"▇".repeat(cups / 3)} {cups}</p>',
  '      ))}',
  '    </div>',
  '  );',
  '}',
];
const LAZY_APP = { ...CAFE, 'app/reports/page.js': LAZY_PAGE, 'app/reports/SalesChart.js': CHART };

export const NX_M9: Lesson[] = [
  lesson('nx-meta-1', 'SEO and the Metadata API', 8, [
    chat(['SEO (search engine optimisation) helps people find your site on Google and other search engines, and makes links look good when shared.', 'Search engines read your page’s title and description, follow your links, and read a sitemap that lists your pages.']),
    tapPage('A title for every dish', 'Tap Cold Coffee, and look at the tab title above the address bar.', app(SEO_APP, '/menu'), 'GET /menu/2 200', [{ click: '#dish-2' }], 'generateMetadata made the title “Cold Coffee”, and the layout’s template added “ · Rosa’s Café”.'),
    explore('Metadata for each page', META_DISH, [
      [4, 'A helper the page and the metadata share.'],
      [11, 'generateMetadata: metadata that depends on the data.'],
      [14, 'The title, used in the template.', '#cy-tab'],
      [15, 'The description search engines show under the link.'],
    ], { page: app(SEO_APP, '/menu/2'), minTaps: 3 }),
    explore('The title template, in the root layout', CAFE_LAYOUT, [
      [3, 'A static metadata object.'],
      [4, 'default for pages with no title; template wraps the others: %s is the page’s title.'],
    ]),
    tapPage('Sitemap and robots', 'Open /sitemap.xml, then /robots.txt.', app(SEO_APP), 'GET /robots.txt 200', [...go('/sitemap.xml'), ...go('/robots.txt')], 'app/sitemap.js and app/robots.js made these files from code.'),
    reveal('More SEO basics', [
      ['Open Graph', 'metadata.openGraph sets the picture and title shown when a link is shared.'],
      ['Real headings', 'One <h1> per page, then <h2>, <h3> in order.'],
      ['Server-rendered HTML', 'Content in the first HTML is easy for search engines to read.'],
      ['Speed', 'Fast pages rank better: images, fonts and less JavaScript.'],
    ]),
    check('Which gives each dish page its own title?', ['export async function generateMetadata', 'export const metadata (in the layout)', '<title> in layout.js', 'document.title in useEffect'], 'It can read params and data.', 'The title depends on the dish.', { mono: true }),
    recap([
      ['🏷', 'metadata or generateMetadata: title and description'],
      ['🧩', 'A title template in the root layout'],
      ['🗺', 'sitemap.js and robots.js for search engines'],
    ]),
  ], 'advanced'),

  lesson('nx-a-9-2', 'Images and fonts', 8, [
    chat(['Pictures are often the heaviest part of a page. next/image resizes them for each screen, uses modern formats, loads them only when needed, and keeps the layout from jumping.', 'next/font downloads fonts at build time and serves them from your own site: no flash of the wrong font, no extra requests to other servers.']),
    explore('Image and font', IMAGE_PAGE, [
      [1, 'Image from next/image.'],
      [2, 'A Google Font, downloaded at build time.'],
      [4, 'Load the font once, at the top of the file.'],
      [9, 'className applies the font.', 'h1'],
      [10, 'alt for screen readers; width and height so space is kept; priority for the main picture.', 'img'],
    ], { page: app({ ...CAFE, 'app/special/page.js': IMAGE_PAGE }, '/special'), minTaps: 3 }),
    reveal('What next/image does', [
      ['Right size', 'Sends a smaller file to a small screen.'],
      ['Modern formats', 'WebP or AVIF when the browser supports them.'],
      ['Lazy loading', 'Pictures below the fold load as you scroll.'],
      ['No layout shift', 'width and height (or fill) reserve the space.'],
    ]),
    tapbug('Error: Image is missing the required "alt" property', ['<Image src="/dish.svg" width={400} height={260} />'], [[1, 'width={400}', 'alt="A bowl of mango sago" width={400}']], 'Every image needs alt text. Use alt="" only for pictures that are just decoration.'),
    explore('A font for the whole site', FONT_LAYOUT, [
      [1, 'Inter, from Google Fonts, served from your site.'],
      [7, 'On <html>, so every page uses it.'],
    ]),
    check('Why give next/image a width and height?', ['So the browser keeps space for it and the page doesn’t jump', 'To stretch it', 'To make it load first', 'They are optional and do nothing'], 'It prevents layout shift.', 'What happens while it loads?'),
    recap([
      ['🖼', 'next/image: right size, modern format, lazy'],
      ['📐', 'alt, width and height (or fill) are required'],
      ['🔤', 'next/font: fonts from your own site, no flash'],
    ]),
  ]),

  lesson('nx-a-9-3', 'Code splitting and lazy loading', 8, [
    chat(['Next.js splits your JavaScript by page automatically: visiting /menu only downloads what /menu needs.', 'Inside a page you can go further: load a big component only when it is needed, with next/dynamic.']),
    tapPage('Load the chart when asked', 'Open /reports, then tap “Show sales chart”.', app(LAZY_APP), 'Chart code downloaded', [...go('/reports'), { click: '#show' }], 'The chart’s code was downloaded only after the tap. Until then, the page was smaller.'),
    explore('next/dynamic', LAZY_PAGE, [
      [3, 'dynamic comes from next/dynamic.'],
      [5, 'import() loads the file later, as its own piece.'],
      [6, 'Shown while it downloads.'],
      [15, 'Only drawn, and so only downloaded, after the tap.'],
    ]),
    reveal('Making pages lighter', [
      ['Split by page', 'Automatic: each route gets its own code.'],
      ['Server Components', 'Their code never reaches the browser at all.'],
      ['next/dynamic', 'Heavy client parts (charts, maps, editors) load on demand.'],
      ['{ ssr: false }', 'For parts that only work in the browser; use it inside a Client Component.'],
    ]),
    matchUp('What helps?', [['A big chart behind a button', 'next/dynamic'], ['A page that only shows data', 'Server Component'], ['A huge hero picture', 'next/image'], ['A custom font', 'next/font']], 'Each tool cuts a different cost.'),
    check('When is a component loaded with dynamic() downloaded?', ['When it is first drawn', 'When the site is built', 'With the first page, always', 'Never'], 'Until then, the page is smaller.', 'What triggers it?'),
    recap([
      ['✂', 'Next.js splits code by page for you'],
      ['💤', 'next/dynamic loads heavy parts on demand'],
      ['🖥', 'Server Components send no JavaScript at all'],
    ]),
  ]),

  challenge('nx-a-9-ch', 'Module 9 Challenge', { icon: '🔍', name: 'Speed and SEO' }, ['Give pages titles, descriptions and a sitemap', 'Optimise images and fonts', 'Load heavy code only when needed'], [
    mcq(1, 'Which sets a page title from its data?', ['generateMetadata', 'metadata in a Client Component', 'useEffect', 'robots.js'], 'It can await params and data.', { mono: true }),
    mcq(2, 'What does %s mean in a title template?', ['The page’s own title', 'The site name', 'The URL', 'Nothing'], '“Menu” becomes “Menu · Rosa’s Café”.', { mono: true }),
    mcq(3, 'Which props must next/image have?', ['alt, and width with height (or fill)', 'Only src', 'className', 'priority'], 'For screen readers and no layout shift.'),
    mcq(4, 'Where does next/font serve fonts from?', ['Your own site, prepared at build time', 'Google, on every visit', 'The visitor’s phone', 'A CDN you choose each time'], 'No extra requests.'),
    mcq(5, 'What does next/dynamic do?', ['Loads a component’s code only when it is drawn', 'Makes a page dynamic', 'Renders on the server', 'Caches data'], 'Code splitting inside a page.'),
    swipe([
      ['app/sitemap.js can list pages from the database', true, 'It runs on the server.'],
      ['Every image should use priority', false, 'Only the main one above the fold.'],
      ['Server Components add no JavaScript to the browser', true, 'Their code stays on the server.'],
      ['robots.js can ask search engines to skip /admin', true, 'disallow: "/admin".'],
    ]),
    pairs([['generateMetadata', 'Titles from data'], ['sitemap.js', 'A list of pages'], ['next/image', 'Lighter pictures'], ['next/dynamic', 'Load later']], 'Performance and SEO tools.'),
    pickCode('Which loads the map only when needed?', ['const Map = dynamic(() => import("./Map"));', 'import Map from "./Map";', 'const Map = await import("./Map");', '<Map lazy />'], 'next/dynamic with import().'),
    bugTask(['<Image src="/dish.svg" />', 'export const metadata = { title: dish.name };'], [[1, '<Image src="/dish.svg" />', '<Image src="/dish.svg" alt="A dish" width={400} height={260} />'], [2, 'export const metadata = { title: dish.name };', 'export async function generateMetadata() { return { title: dish.name }; }']], 'Give the image alt, width and height, and use generateMetadata for data-based titles.'),
    xray('<div><h1 class="font-lora">Today’s special</h1><img alt="A bowl of mango sago" src="dish.svg" width="200"><p class="muted">Loading the chart…</p></div>', [
      ['h1', 'A heading in Lora', 'next/font', ['next/font', 'next/image', 'next/dynamic']],
      ['img', 'A resized picture', 'next/image', ['next/font', 'next/image', 'next/dynamic']],
      ['.muted', 'Shown while code downloads', 'next/dynamic', ['next/font', 'next/image', 'next/dynamic']],
    ]),
    arrange(['export const metadata = {', '  title: "About",', '  description: "The story of Rosa’s Café.",', '};', 'export default function About() {', '  return <h1>About us</h1>;', '}'], 'the metadata: open it, the title, the description, close it; then the page', CAFE, 'app/about/page.js', '/about'),
  ]),
];
