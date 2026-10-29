// The final CSS project: style Sutton Classes in four checked steps (the page from the HTML track).
// Used by the CSS track's final challenge (m12.ts, id c-project).
import type { WebStep } from '../../types';

const web = (o: Omit<WebStep, 'type' | 'kicker'>): WebStep => ({ type: 'web', kicker: 'BUILD IT · CSS', ...o });

const SUTTON = '<header class="top">\n  <strong>Sutton Classes</strong>\n  <nav><a href="#courses">Courses</a> <a href="#enquire">Enquire</a></nav>\n</header>\n<main class="page">\n  <div class="split">\n    <section id="about">\n      <h2>About us</h2>\n      <p>Small batches for Class 9 to 12, with a test every week.</p>\n    </section>\n    <section id="courses">\n      <h2>Courses</h2>\n      <div class="courses">\n        <div class="course">Maths, Class 10</div>\n        <div class="course">Physics, Class 12</div>\n        <div class="course">Chemistry, Class 12</div>\n      </div>\n      <table>\n        <tr><th>Course</th><th>Fee</th></tr>\n        <tr><td>Maths, Class 10</td><td>₹2,000</td></tr>\n        <tr><td>Physics, Class 12</td><td>₹2,500</td></tr>\n      </table>\n    </section>\n  </div>\n  <img src="https://placehold.co/640x320/png?text=Our+toppers" alt="Three Class 12 toppers holding their result sheets">\n  <section id="enquire">\n    <a class="btn" href="tel:+919800000000">Call to enquire</a>\n  </section>\n</main>\n';
const P1 = ':root {\n  --blue: #1E3A8A;\n  --gold: #F59E0B;\n  --text: #1F2937;\n  --bg: #FFFFFF;\n  --space: 1rem;\n}\n* {\n  box-sizing: border-box;\n}\nbody {\n  margin: 0;\n  font-family: "Poppins", system-ui, sans-serif;\n  line-height: 1.5;\n  color: var(--text);\n  background: var(--bg);\n}\nh2 {\n  color: var(--blue);\n}\n';
const P2 = P1 + '.top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--space);\n  background: var(--blue);\n  color: white;\n}\n.top a {\n  color: white;\n}\n.page {\n  max-width: 60rem;\n  margin: 0 auto;\n  padding: var(--space);\n}\n.courses {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));\n  gap: var(--space);\n}\ntr:nth-child(even) {\n  background: #EFF6FF;\n}\n';
const P3 = P2 + 'img {\n  max-width: 100%;\n  height: auto;\n}\n@media (min-width: 48rem) {\n  .split {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n    gap: 2rem;\n  }\n}\n';
const P4 = P3 + '.btn {\n  display: inline-block;\n  padding: 12px 20px;\n  background: var(--gold);\n  color: #1F2937;\n  border-radius: 8px;\n  transition: transform 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n}\n.btn:focus-visible {\n  outline: 3px solid var(--blue);\n}\n.top {\n  position: sticky;\n  top: 0;\n}\n@media (prefers-reduced-motion: reduce) {\n  .btn {\n    transition: none;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --text: #F9FAFB;\n    --bg: #0F172A;\n  }\n}\n';

/** Step 1 design system, step 2 layout, step 3 bigger screens, step 4 polish and access. */
export const SUTTON_STEPS: WebStep[] = [
    web({
      title: 'Step 1 · The design system',
      instructions: 'On :root, define at least 4 variables (blue, gold, text, background, spacing). Give the body a font list with a fallback, a line-height, and colours from your variables.',
      starter: { html: SUTTON, css: '/* Sutton Classes styles */\n' },
      solution: { html: SUTTON, css: P1 },
      checks: [
        { label: 'At least 4 variables on :root', file: 'css', pattern: /:root\s*\{(?:[^}]*?--[\w-]+\s*:){4}/ },
        { label: 'The body uses your variables', file: 'css', pattern: /body\s*\{[^}]*var\(--/ },
        { label: 'A font list with a fallback', file: 'css', pattern: /font-family:[^;]*,\s*(sans-serif|serif|system-ui)\s*;/ },
        { label: 'A comfortable line-height', file: 'css', pattern: /body\s*\{[^}]*line-height:\s*1\.[4-8]\b/ },
      ],
      hint: ':root { --blue: …; --gold: …; --text: …; --bg: …; } body { font-family: "Poppins", sans-serif; line-height: 1.5; color: var(--text); }',
    }),
    web({
      title: 'Step 2 · Layout, phone first',
      instructions: 'Make the header a flex row (name left, links right), give .page a max-width and centre it, make .courses a grid that adapts, and stripe the fee table.',
      starter: { html: SUTTON, css: P1 },
      solution: { html: SUTTON, css: P2 },
      checks: [
        { label: 'A flex header with space-between', file: 'css', pattern: /\.top\s*\{(?=[^}]*display:\s*flex)(?=[^}]*justify-content:\s*space-between)[^}]*\}/ },
        { label: 'A centred page with a max-width', file: 'css', pattern: /\.page\s*\{(?=[^}]*max-width:)(?=[^}]*margin:\s*0 auto)[^}]*\}/ },
        { label: 'A course grid that adapts', file: 'css', pattern: /\.courses\s*\{[^}]*repeat\(auto-(fill|fit),\s*minmax\(/ },
        { label: 'Striped fee rows', file: 'css', pattern: /tr:nth-child\([^)]+\)\s*\{/ },
      ],
      hint: '.top { display: flex; justify-content: space-between; } .page { max-width: 60rem; margin: 0 auto; } .courses { display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); } tr:nth-child(even) { … }',
    }),
    web({
      title: 'Step 3 · Bigger screens and images',
      instructions: 'Make images fluid, and add a min-width media query that puts About and Courses (.split) side by side.',
      starter: { html: SUTTON, css: P2 },
      solution: { html: SUTTON, css: P3 },
      checks: [
        { label: 'Fluid images', file: 'css', pattern: /img\s*\{[^}]*max-width:\s*100%/ },
        { label: 'A min-width media query', file: 'css', pattern: /@media\s*\(min-width:\s*[\d.]+(rem|px|em)\)/ },
        { label: 'Two columns for .split inside it', file: 'css', pattern: /@media\s*\(min-width[^{]*\{\s*\.split\s*\{[^}]*grid-template-columns:/ },
      ],
      hint: 'img { max-width: 100%; height: auto; } @media (min-width: 48rem) { .split { display: grid; grid-template-columns: 1fr 2fr; } }',
    }),
    web({
      title: 'Step 4 · Polish and access',
      instructions: 'A gold .btn with a transition and a hover, a visible focus outline, a sticky header, a reduced-motion rule and dark-mode colours.',
      starter: { html: SUTTON, css: P3 },
      solution: { html: SUTTON, css: P4 },
      checks: [
        { label: 'A button with a transition', file: 'css', pattern: /\.btn\s*\{[^}]*transition:/ },
        { label: 'A hover style', file: 'css', pattern: /\.btn:hover\s*\{/ },
        { label: 'A visible focus outline', file: 'css', pattern: /\.btn:focus-visible\s*\{[^}]*outline:/ },
        { label: 'A sticky header', file: 'css', pattern: /\.top\s*\{(?=[^}]*position:\s*sticky)(?=[^}]*top:\s*0)[^}]*\}/ },
        { label: 'Reduced motion and dark mode', file: 'css', pattern: /prefers-reduced-motion:\s*reduce[\s\S]*prefers-color-scheme:\s*dark|prefers-color-scheme:\s*dark[\s\S]*prefers-reduced-motion:\s*reduce/ },
      ],
      hint: '.btn { background: var(--gold); transition: transform 0.2s ease; } .btn:hover { … } .btn:focus-visible { outline: 3px solid var(--blue); } .top { position: sticky; top: 0; } and the two @media blocks.',
    }),
];
