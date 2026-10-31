import { describe, expect, it } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { runPage } from '@/content/testing/page';
import { REACT_RUNTIME_VERSIONS } from '@/lib/web/reactRuntime';
import { reactProgram } from '@/lib/web/page';

const version = (p: string) => JSON.parse(readFileSync(join(__dirname, '../../../node_modules', p, 'package.json'), 'utf8')).version;

const COUNTER = `import { useState } from "react";

function App() {
  const [cups, setCups] = useState(0);
  return (
    <div>
      <p id="out">Teas: {cups}</p>
      <button onClick={() => { setCups(cups + 1); console.log("Teas: " + (cups + 1)); }}>Add tea</button>
    </div>
  );
}`;

describe('React lesson pages', () => {
  it('bundles the installed React and sucrase (run scripts/build-react-runtime.mjs after upgrading them)', () => {
    expect(REACT_RUNTIME_VERSIONS).toBe(`react ${version('react')}, react-dom ${version('react-dom')}, sucrase ${version('sucrase')}`);
  });

  it('turns imports into the bundled globals and shows App', () => {
    const p = reactProgram('import { useState as useS } from "react";\nexport default function App() { return null; }');
    expect(p).toContain('const { useState : useS } = React;');
    expect(p).toContain('function App()');
    expect(p).toMatch(/createRoot\(document\.getElementById\("root"\)/);
  });

  it('runs JSX and state in the page, and taps update it', async () => {
    const { logs, window } = await runPage({ html: '<div id="root"></div>', js: COUNTER, react: true }, 300);
    expect(logs.filter((l) => l.level === 'error')).toEqual([]);
    expect(window.document.querySelector('#out')?.textContent).toBe('Teas: 0');
    window.document.querySelector('button')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    await new Promise((r) => setTimeout(r, 100));
    expect(window.document.querySelector('#out')?.textContent).toBe('Teas: 1');
    expect(logs.map((l) => l.text)).toContain('Teas: 1');
  });
});
