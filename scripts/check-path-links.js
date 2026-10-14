// Checks that every outside link in the career paths still opens.
// Usage: node scripts/check-path-links.js   (needs internet; exits 1 if any link is broken)
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'content', 'paths');
const urls = [
  ...new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.ts'))
      .flatMap((f) => fs.readFileSync(path.join(dir, f), 'utf8').match(/https:\/\/[^'"\s]+/g) ?? []),
  ),
].sort();

// These sites block scripts with a "checking your browser" page but open fine for people.
const BOT_WALLED = ['leetcode.com', 'www.cloudflare.com'];
// Opens in browsers, but its certificate chain fails Node's stricter check.
const BROWSER_ONLY = ['ncert.nic.in'];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

/** HTTP status, or the error name when the request fails. */
async function check(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(25000) });
    return res.status;
  } catch (e) {
    return String(e.name);
  }
}

(async () => {
  const bad = [];
  for (const url of urls) {
    // Two tries: slow sites sometimes time out on the first.
    let status = await check(url);
    if (typeof status !== 'number') status = await check(url);
    const host = new URL(url).hostname;
    const walled = (status === 403 && BOT_WALLED.includes(host)) || (typeof status !== 'number' && BROWSER_ONLY.includes(host));
    const ok = walled || (typeof status === 'number' && status < 400);
    console.log(`${walled ? 'ok*' : ok ? 'ok ' : 'BAD'} ${status} ${url}`);
    if (!ok) bad.push(url);
  }
  console.log(`\n${urls.length - bad.length}/${urls.length} links open (ok* = blocks scripts but opens in a browser)`);
  process.exit(bad.length ? 1 : 0);
})();
