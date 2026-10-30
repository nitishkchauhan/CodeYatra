import { describe, expect, it } from '@jest/globals';

import { runPage } from '@/content/testing/page';

const HOME = '<nav><a href="admissions.html">Admissions</a> <a href="#top">Top</a></nav><h1>Home</h1>';
const ADMISSIONS = '<nav><a href="index.html">Home</a></nav><h1>Admissions</h1><img src="portrait.svg" alt="">';

describe('multi-page preview', () => {
  it('follows links between the site’s pages and logs each one', async () => {
    const { window, logs } = await runPage({ html: HOME, pages: { 'admissions.html': ADMISSIONS } });
    const d = window.document;
    expect(d.querySelector('#cy-site-bar')?.textContent).toContain('index.html');
    d.querySelector<HTMLAnchorElement>('a[href="admissions.html"]')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(d.querySelector('h1')?.textContent).toBe('Admissions');
    expect(d.querySelector('#cy-site-bar')?.textContent).toContain('admissions.html');
    // Built-in pictures work on the other pages too.
    expect(d.querySelector('img')?.getAttribute('src')).toMatch(/^data:image\/svg\+xml/);
    d.querySelector<HTMLAnchorElement>('a[href="index.html"]')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(d.querySelector('h1')?.textContent).toBe('Home');
    expect(logs.map((l) => l.text)).toEqual(['Page: admissions.html', 'Page: index.html']);
  });

  it('leaves section links and pages it does not know alone', async () => {
    const { window, logs } = await runPage({ html: HOME, pages: { 'admissions.html': ADMISSIONS } });
    window.document.querySelector<HTMLAnchorElement>('a[href="#top"]')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(window.document.querySelector('h1')?.textContent).toBe('Home');
    expect(logs).toEqual([]);
  });
});
