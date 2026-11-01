import { describe, expect, it } from '@jest/globals';
import { transformSync } from 'esbuild';
import { readFileSync } from 'node:fs';

import { runPage } from '@/content/testing/page';
import { NODE_RUNTIME } from '@/lib/web/nodeRuntime';
import type { NodeApp } from '@/lib/web/page';

it('the Node.js runtime is built from scripts/node-runtime.js (run node scripts/build-react-runtime.mjs)', () => {
  const source = readFileSync('scripts/node-runtime.js', 'utf8');
  expect(NODE_RUNTIME).toBe(transformSync(source, { minify: true, target: 'es2019', legalComments: 'none' }).code);
});

const run = async (app: NodeApp, wait = 600) => {
  const page = await runPage({ html: '', node: app }, wait);
  const doc = page.window.document;
  const click = async (sel: string, ms = 400) => {
    doc.querySelector(sel)!.dispatchEvent(new page.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, ms));
  };
  return { ...page, doc, click, logs: () => page.logs.map((l) => (l.level === 'error' ? `ERROR ${l.text}` : l.text)) };
};

describe('Node.js lesson pages', () => {
  it('runs a program and prints like Node, with the command first', async () => {
    const p = await run({ files: { 'app.js': 'const cups = [40, 90];\nconsole.log("Total:", cups.reduce((a, b) => a + b, 0));\nconsole.log({ name: "Tea", hot: true }, [1, 2]);\nconsole.log("%s costs %d", "Tea", 40);' } });
    expect(p.lines).toEqual(['$ node app.js', 'Total: 130', '{ name: \'Tea\', hot: true } [ 1, 2 ]', 'Tea costs 40']);
    expect(p.logs()).toEqual(['Total: 130', "{ name: 'Tea', hot: true } [ 1, 2 ]", 'Tea costs 40']);
  });

  it('loads modules (require and import), JSON files, and reads and writes files', async () => {
    const p = await run({
      files: {
        'app.js': 'import { readFile, writeFile } from "node:fs/promises";\nimport path from "node:path";\nimport { total } from "./prices.js";\nconst menu = JSON.parse(await readFile(path.join(import.meta.dirname, "menu.json"), "utf8"));\nconsole.log(total(menu.map((d) => d.price)));\nawait writeFile("orders.txt", "1 tea\\n");\nconsole.log(await readFile("orders.txt", "utf8"));\ntry { await readFile("missing.txt", "utf8"); } catch (e) { console.log(e.code); }',
        'prices.js': 'export function total(list) {\n  return list.reduce((a, b) => a + b, 0);\n}',
        'menu.json': '[{ "name": "Tea", "price": 40 }, { "name": "Toast", "price": 80 }]',
      },
    });
    expect(p.logs()).toEqual(['120', '1 tea', '', 'ENOENT']);
  });

  it('runs CommonJS with events and process', async () => {
    const p = await run({ files: { 'app.js': 'const EventEmitter = require("node:events");\nconst k = new EventEmitter();\nk.on("order", (d) => console.log("Cooking " + d));\nk.emit("order", "tea");\nconsole.log(process.argv.slice(2), process.env.CAFE);' }, args: ['--fast'], env: { CAFE: 'Rosa' } });
    expect(p.logs()).toEqual(['Cooking tea', "[ '--fast' ] Rosa"]);
    expect(p.lines[0]).toBe('$ node app.js --fast');
  });

  it('serves Express routes, JSON bodies, errors and 404s from the request bar', async () => {
    const app = `import express from "express";
const app = express();
app.use(express.json());
const trains = [{ id: 1, name: "Harbour Express" }];
app.get("/trains", (req, res) => res.json(trains));
app.get("/trains/:id", (req, res) => {
  const t = trains.find((x) => x.id === Number(req.params.id));
  if (!t) return res.status(404).json({ error: "No such train" });
  res.json(t);
});
app.post("/trains", (req, res) => {
  if (!req.body?.name) return res.status(400).json({ error: "name is required" });
  res.status(201).json({ id: 2, ...req.body });
});
app.get("/boom", async () => { throw new Error("Kitchen on fire"); });
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));
app.listen(3000, () => console.log("Listening on port 3000"));`;
    const p = await run({
      files: { 'app.js': app },
      requests: [
        { method: 'GET', path: '/trains/1' },
        { method: 'POST', path: '/trains', body: '{"name":"Coastal Mail"}' },
        { method: 'POST', path: '/trains', body: '{}' },
        { method: 'GET', path: '/boom' },
        { method: 'GET', path: '/nope' },
      ],
    });
    for (const i of [0, 1, 2, 3, 4]) await p.click(`#cy-r${i}`);
    expect(p.logs()).toEqual([
      'Listening on port 3000',
      'GET /trains/1 200',
      '{"id":1,"name":"Harbour Express"}',
      'POST /trains 201',
      '{"id":2,"name":"Coastal Mail"}',
      'POST /trains 400',
      '{"error":"name is required"}',
      'GET /boom 500',
      '{"error":"Kitchen on fire"}',
      'GET /nope 404',
      'Cannot GET /nope',
    ]);
  });

  it('runs node:test files and reports passes and failures', async () => {
    const p = await run({
      test: true,
      command: 'node --test',
      files: {
        'prices.js': 'export const withTax = (n) => Math.round(n * 1.05);',
        'prices.test.js': 'import { test } from "node:test";\nimport assert from "node:assert/strict";\nimport { withTax } from "./prices.js";\ntest("adds 5% tax", () => {\n  assert.equal(withTax(100), 105);\n});\ntest("rounds", () => {\n  assert.equal(withTax(10), 10);\n});',
      },
    });
    expect(p.lines.slice(0, 2)).toEqual(['$ node --test', '✔ adds 5% tax']);
    expect(p.logs()).toContain('✖ rounds');
    expect(p.logs().slice(-3)).toEqual(['ℹ tests 2', 'ℹ pass 1', 'ℹ fail 1']);
  });

  it('shows an uncaught error the way Node does', async () => {
    const p = await run({ files: { 'app.js': 'console.log("start");\nJSON.parse("{bad");' } });
    expect(p.lines[1]).toBe('start');
    expect(p.lines[2]).toMatch(/^SyntaxError: /);
    expect(p.lines.at(-1)).toBe('Node.js v22.11.0 (/app/app.js)');
  });
});
