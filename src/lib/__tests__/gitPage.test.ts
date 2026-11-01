import { describe, expect, it } from '@jest/globals';
import { transformSync } from 'esbuild';
import { readFileSync } from 'node:fs';

import { runPage } from '@/content/testing/page';
import { GIT_RUNTIME } from '@/lib/web/gitRuntime';
import type { GitApp } from '@/lib/web/page';

it('the Git runtime is built from scripts/git-runtime.js (run node scripts/build-react-runtime.mjs)', () => {
  const source = readFileSync('scripts/git-runtime.js', 'utf8');
  expect(GIT_RUNTIME).toBe(transformSync(source, { minify: true, target: 'es2019', legalComments: 'none' }).code);
});

/** Runs the commands and gives back the terminal lines (commit ids replaced by #######). */
const run = async (app: GitApp) => {
  const page = await runPage({ html: '', git: app }, 200);
  return Array.from(page.window.document.querySelectorAll('.cy-line')).map((d) => (d.textContent ?? '').replace(/\b[0-9a-f]{7}\b/g, '#######').trimEnd());
};

describe('Git lesson terminals', () => {
  it('stages, commits and shows status like Git', async () => {
    const out = await run({ before: ['git init -b main', 'echo "Lemon Tea" > menu.txt', 'git add menu.txt', 'git commit -m "Add the menu"', 'echo "Cheese Toast" >> menu.txt', 'git status -s', 'git commit -am "Add toast"', 'git log --oneline'] });
    expect(out).toEqual([
      '$ git init -b main',
      'Initialized empty Git repository in /home/learner/cafe-site/.git/',
      '$ echo "Lemon Tea" > menu.txt',
      '$ git add menu.txt',
      '$ git commit -m "Add the menu"',
      '[main (root-commit) #######] Add the menu',
      ' 1 file changed, 1 insertion(+)',
      ' create mode 100644 menu.txt',
      '$ echo "Cheese Toast" >> menu.txt',
      '$ git status -s',
      ' M menu.txt',
      '$ git commit -am "Add toast"',
      '[main #######] Add toast',
      ' 1 file changed, 1 insertion(+)',
      '$ git log --oneline',
      '####### (HEAD -> main) Add toast',
      '####### Add the menu',
    ]);
  });

  it('merges branches with a conflict to fix', async () => {
    const out = await run({
      repo: { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea 40\n' }]] },
      before: ['git switch -c prices', 'echo "Lemon Tea 45" > menu.txt', 'git commit -am "Raise tea price"', 'git switch main', 'echo "Lemon Tea 50" > menu.txt', 'git commit -am "Tea costs 50"', 'git merge prices', 'cat menu.txt'],
    });
    expect(out.slice(-9)).toEqual(['Auto-merging menu.txt', 'CONFLICT (content): Merge conflict in menu.txt', 'Automatic merge failed; fix conflicts and then commit the result.', '$ cat menu.txt', '<<<<<<< HEAD', 'Lemon Tea 50', '=======', 'Lemon Tea 45', '>>>>>>> prices']);
    expect(out).toContain('CONFLICT (content): Merge conflict in menu.txt');
    expect(out).toContain('<<<<<<< HEAD');
    expect(out).toContain('>>>>>>> prices');
  });

  it('pushes, is rejected when the remote moved on, then pulls', async () => {
    const out = await run({
      repo: { commits: [['Add the menu', { 'menu.txt': 'Lemon Tea\n' }]] },
      origin: { url: 'git@github.com:rosascafe/site.git', ahead: [['Add opening hours', { 'hours.txt': 'Open 8 to 9\n' }]] },
      before: ['echo "Cheese Toast" >> menu.txt', 'git commit -am "Add toast"', 'git push', 'git pull', 'ls'],
    });
    expect(out).toContain(' ! [rejected]        main -> main (fetch first)');
    expect(out).toContain("Merge made by the 'ort' strategy.");
    expect(out.at(-1)).toBe('hours.txt  menu.txt');
  });
});
