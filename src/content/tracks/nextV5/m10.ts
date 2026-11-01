// Next.js · Module 10 · Deployment: the production build, environment configuration, deployment platforms, and
// performance monitoring and error logging. Lesson 10.1 keeps the old module id (nx-deploy-1). Building and hosting
// can’t run on a phone, so these lessons show real terminal output and config; error reporting runs live.
import type { Lesson } from '../../types';
import { CAFE } from './apps';
import { app, arrange, bugTask, challenge, chat, check, explore, go, lesson, matchUp, mcq, pairs, pickCode, recap, reveal, swipe, tapbug, tapPage, toggle, truth, xray } from './kit';

const BUILD_OUT = [
  '$ npm run build',
  '  ▲ Next.js 16',
  '  Creating an optimized production build ...',
  ' ✓ Compiled successfully',
  ' ✓ Linting and checking validity of types',
  ' ✓ Generating static pages (6/6)',
  '',
  'Route (app)              Size     First Load JS',
  '┌ ○ /                    1.2 kB         103 kB',
  '├ ○ /menu                1.4 kB         104 kB',
  '├ ● /menu/[id]           0.9 kB         103 kB',
  '├ ƒ /account             1.1 kB         103 kB',
  '└ ƒ /api/dishes          0 B              0 B',
  '',
  '○  (Static)   made at build time',
  '●  (SSG)      made at build time with generateStaticParams',
  'ƒ  (Dynamic)  made on each request',
];

const CONFIG = [
  '/** @type {import("next").NextConfig} */',
  'const nextConfig = {',
  '  cacheComponents: true,',
  '  images: {',
  '    remotePatterns: [{ protocol: "https", hostname: "images.rosascafe.example" }],',
  '  },',
  '  experimental: {',
  '    serverActions: { bodySizeLimit: "2mb" },',
  '  },',
  '};',
  '',
  'export default nextConfig;',
];

const DOCKER = [
  'FROM node:22-alpine',
  'WORKDIR /app',
  'COPY .next/standalone ./',
  'COPY .next/static ./.next/static',
  'COPY public ./public',
  'ENV NODE_ENV=production',
  'EXPOSE 3000',
  'CMD ["node", "server.js"]',
];

const REPORT_ERROR = [
  '"use client";',
  'import { useEffect } from "react";',
  '',
  'export default function Error({ error, reset }) {',
  '  useEffect(() => {',
  '    // In a real app: send it to a service such as Sentry.',
  '    console.log("Reported to monitoring: " + error.message);',
  '  }, [error]);',
  '  return (',
  '    <div className="card">',
  '      <p className="err">Something went wrong. We have been told.</p>',
  '      <button onClick={() => reset()}>Try again</button>',
  '    </div>',
  '  );',
  '}',
];
const BROKEN = ['export default async function Orders() {', '  const res = await fetch("https://cafe.example.com/api/menu/broken");', '  if (!res.ok) throw new Error("Orders service answered " + res.status);', '  return <p>Orders</p>;', '}'];
const INSTRUMENT = [
  'export async function register() {',
  '  // Runs once when the server starts: set up monitoring here.',
  '}',
  '',
  'export async function onRequestError(error, request) {',
  '  await fetch("https://logs.rosascafe.example/errors", {',
  '    method: "POST",',
  '    body: JSON.stringify({ message: error.message, path: request.path }),',
  '  });',
  '}',
];
const VITALS = [
  '"use client";',
  'import { useReportWebVitals } from "next/web-vitals";',
  '',
  'export function WebVitals() {',
  '  useReportWebVitals((metric) => {',
  '    // LCP: main content shown; INP: response to taps; CLS: layout jumps.',
  '    console.log(metric.name, metric.value);',
  '  });',
  '  return null;',
  '}',
];

export const NX_M10: Lesson[] = [
  lesson('nx-deploy-1', 'The production build', 7, [
    chat(['Before real visitors see your site, run npm run build. It compiles everything, checks for errors, and makes the static pages ahead of time.', 'If the build fails, nothing is deployed. Fix it on your computer first.']),
    explore('Reading the build output', BUILD_OUT, [
      [4, 'Compiled: no syntax errors.'],
      [5, 'Lint and type checks passed.'],
      [6, 'Static pages were made now, at build time.'],
      [9, '○ static: made once.'],
      [11, '● pre-built with generateStaticParams.'],
      [12, 'ƒ dynamic: made on each request (it reads cookies).'],
      [8, 'First Load JS: what a visitor downloads. Smaller is faster.'],
    ], { intro: 'This is what the terminal shows after npm run build.' }),
    reveal('After the build', [
      ['npm run start', 'Runs the built site on port 3000, as a host would.'],
      ['Test it like a visitor', 'Open the built site and click through before deploying.'],
      ['Errors stop the build', 'Type errors, failing imports, or a page that throws while being made.'],
    ], { mono: false }),
    matchUp('Which symbol?', [['/about, no data per visit', '○ Static'], ['/menu/[id] with generateStaticParams', '● SSG'], ['/account, reads cookies()', 'ƒ Dynamic']], 'The build tells you how each route is made.'),
    check('What happens if npm run build fails?', ['Nothing is deployed until you fix it', 'The site goes live with errors', 'Only the broken page is skipped', 'Next.js fixes it'], 'A failed build is a safety net.', 'Would you want broken code live?'),
    truth([
      ['npm run dev is fine for real visitors', false, 'Use the production build.'],
      ['The build makes static pages ahead of time', true, '○ and ●.'],
      ['First Load JS shows what a visitor downloads', true, 'Keep it small.'],
    ]),
    recap([
      ['📦', 'npm run build checks and prepares everything'],
      ['○●ƒ', 'The route table shows static, SSG and dynamic pages'],
      ['▶', 'npm run start runs the built site'],
    ]),
  ]),

  lesson('nx-a-10-2', 'Environment configuration', 8, [
    reveal('Three environments', [
      ['Development', 'Your computer: npm run dev, .env.local, test data.'],
      ['Preview', 'A copy online for each branch or pull request, to check before going live.'],
      ['Production', 'The real site, the real database, the real keys.'],
    ]),
    reveal('Env files Next.js reads', [
      ['.env', 'Defaults for every environment.'],
      ['.env.development / .env.production', 'Used by npm run dev / npm run build.'],
      ['.env.local', 'Your own secrets; overrides the others; never committed.'],
      ['The host’s settings', 'Where production secrets really live.'],
    ], { mono: true }),
    chat(['One trap: NEXT_PUBLIC_ values are copied into the JavaScript at build time.', 'Change one on the host and nothing happens until you build again. Server-only variables are read when the server runs.']),
    explore('next.config.js', CONFIG, [
      [3, 'Turns on Cache Components ("use cache").'],
      [5, 'Which other sites next/image may load pictures from.'],
      [8, 'Bigger uploads for Server Actions (1 MB by default).'],
    ]),
    tapbug('The new support email never shows on the live site', ['# changed on the host, no new build', 'NEXT_PUBLIC_SUPPORT_EMAIL=help@rosascafe.example'], [[1, '# changed on the host, no new build', '# changed on the host, then built and deployed again']], 'NEXT_PUBLIC_ values are fixed at build time. Build again after changing them.'),
    check('Where should the production database password be set?', ['In the host’s environment variable settings', 'In .env committed to Git', 'In next.config.js', 'In a NEXT_PUBLIC_ variable'], 'Never in the code or the repository.', 'Who should be able to read it?'),
    recap([
      ['🌍', 'Development, preview, production'],
      ['🗂', '.env files locally; real secrets on the host'],
      ['⚠', 'NEXT_PUBLIC_ values need a new build'],
    ]),
  ]),

  lesson('nx-a-10-3', 'Deployment platforms', 8, [
    reveal('Four ways to put it online', [
      ['A managed host', 'Vercel (from the makers of Next.js), Netlify and others: connect your Git repository; every push deploys.'],
      ['Your own Node.js server', 'npm run build, then npm run start on a server, often behind nginx, kept running with a process manager.'],
      ['A Docker container', 'output: "standalone" makes a small server you can run anywhere containers run.'],
      ['A static export', 'output: "export" makes plain HTML files for any web host, but with no server: no Server Actions, cookies or dynamic pages.'],
    ]),
    explore('A Dockerfile for a standalone build', DOCKER, [
      [1, 'Start from Node.js.'],
      [3, 'The standalone build: a server.js and only the files it needs.'],
      [4, 'The static files.'],
      [8, 'Start the server.'],
    ], { intro: 'With output: "standalone" in next.config.js.' }),
    matchUp('Which one fits?', [['A student portfolio of plain pages', 'Static export'], ['A team that wants every push live', 'Managed host'], ['A company that runs everything in containers', 'Docker'], ['A college server you already have', 'Node.js server']], 'Pick by what you need and what you already run.'),
    tapbug('Server Actions stop working after deploying', ['const nextConfig = {', '  output: "export",', '};'], [[2, 'output: "export",', 'output: "standalone",']], 'A static export has no server, so Server Actions, cookies and dynamic pages can’t work. Use a server build.'),
    check('After connecting a repository to a managed host, how does a new version go live?', ['Push to the main branch', 'Email the host', 'Copy files by hand', 'Restart your laptop'], 'Every push builds and deploys.', 'What do you already do with Git?'),
    recap([
      ['☁', 'Managed hosts deploy on every push'],
      ['🐳', 'Node.js servers and Docker run anywhere'],
      ['📄', 'Static export: plain files, no server features'],
    ]),
  ]),

  lesson('nx-a-10-4', 'Monitoring and error logging', 8, [
    chat(['Once the site is live, you need to know when it is slow or broken, before your users tell you.', 'Monitoring watches speed; error logging records what went wrong, where and for whom.']),
    tapPage('Report errors', 'Open /orders. Its service is down; error.js shows a friendly message and reports it.', app({ ...CAFE, 'app/orders/page.js': BROKEN, 'app/orders/error.js': REPORT_ERROR }), 'Reported to monitoring: Orders service answered 500', go('/orders'), 'Visitors saw a calm message; the team got the details.'),
    explore('error.js that reports', REPORT_ERROR, [
      [5, 'When the error arrives…'],
      [7, '…send it to a monitoring service.'],
      [11, 'Tell the visitor kindly; never show stack traces.', '.err'],
    ], { page: app({ ...CAFE, 'app/orders/page.js': BROKEN, 'app/orders/error.js': REPORT_ERROR }, '/orders'), minTaps: 2 }),
    explore('instrumentation.js', INSTRUMENT, [
      [1, 'register runs once when the server starts.'],
      [5, 'onRequestError runs for every error on the server.'],
      [6, 'Send the details to your logging service.'],
    ]),
    explore('Measuring speed: Web Vitals', VITALS, [
      [2, 'A hook from Next.js.'],
      [6, 'The three numbers Google uses to judge speed.'],
    ]),
    check('Which file runs code for every error on the server?', ['instrumentation.js with onRequestError', 'error.js', 'not-found.js', 'next.config.js'], 'error.js only shows the browser side.', 'Which one runs on the server?', { mono: true }),
    recap([
      ['🚨', 'Report errors to a service, show visitors a kind message'],
      ['🔧', 'instrumentation.js: register and onRequestError'],
      ['⏱', 'Web Vitals: LCP, INP, CLS'],
    ]),
  ]),

  challenge('nx-a-10-ch', 'Module 10 Challenge', { icon: '🚀', name: 'Shipper' }, ['Build and check a production site', 'Configure environments safely', 'Deploy, monitor and log errors'], [
    mcq(1, 'Which command makes the production build?', ['npm run build', 'npm run dev', 'npm test', 'npm run lint'], 'Then npm run start.', { mono: true }),
    mcq(2, 'In the build output, what does ƒ mean?', ['Made on each request', 'Made at build time', 'An error', 'A Client Component'], 'Dynamic.', { mono: true }),
    mcq(3, 'When are NEXT_PUBLIC_ values fixed?', ['At build time', 'At every request', 'When the server starts', 'Never'], 'Build again after changing them.'),
    mcq(4, 'What can’t a static export do?', ['Run Server Actions', 'Show pages', 'Use CSS', 'Use images'], 'There is no server.'),
    mcq(5, 'Which function in instrumentation.js sees every server error?', ['onRequestError', 'register', 'reportError', 'useReportWebVitals'], 'Send it to your log service.', { mono: true }),
    swipe([
      ['Preview deployments let you check a branch online', true, 'Before going live.'],
      ['Production secrets belong in the repository', false, 'On the host.'],
      ['output: "standalone" helps with Docker', true, 'A small server.js.'],
      ['Visitors should see the full error message and stack', false, 'A kind message; details to the team.'],
    ]),
    pairs([['npm run build', 'Prepare'], ['output: "export"', 'Plain files'], ['output: "standalone"', 'Docker'], ['onRequestError', 'Log server errors']], 'Deployment tools.'),
    pickCode('Which reports an error from error.js?', ['useEffect(() => { report(error); }, [error]);', 'report(error) at the top of the file', 'throw error;', 'alert(error.stack);'], 'After it is shown, once per error.'),
    bugTask(['NEXT_PUBLIC_DB_PASSWORD=secret', 'const nextConfig = { output: "export" }; // the site uses Server Actions'], [[1, 'NEXT_PUBLIC_DB_PASSWORD', 'DB_PASSWORD'], [2, 'output: "export"', 'output: "standalone"']], 'Keep secrets server-only, and don’t export statically if you need a server.'),
    xray('<div><pre class="build">├ ƒ /account   1.1 kB</pre><p class="err">Something went wrong. We have been told.</p></div>', [
      ['.build', 'A route in the build output', 'npm run build', ['npm run build', 'error.js', 'next.config.js']],
      ['.err', 'A kind error message', 'error.js', ['npm run build', 'error.js', 'next.config.js']],
    ]),
    arrange(['"use client";', 'export default function Error({ error }) {', '  console.log("Reported: " + error.message);', '  return <p>Sorry, something broke.</p>;', '}'], '"use client", start the error page, report it, show a kind message, close it', { ...CAFE, 'app/broken/page.js': ['export default function Broken() {', '  throw new Error("Oven offline");', '}'] }, 'app/broken/error.js', '/broken'),
  ]),
];
