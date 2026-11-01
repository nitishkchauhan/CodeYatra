// A small teaching copy of Node.js, for lesson pages: a terminal that runs a program, offline, on a phone.
//
// It runs CommonJS (require) and ES modules (import/export, top-level await in the entry file) with the parts of
// Node.js 22 the lessons use: process (argv, env, exit, cwd, nextTick), console, __dirname, timers, fetch, and the
// modules fs and fs/promises (files kept in memory), path, events, http, url, os, util, crypto (randomUUID),
// assert and node:test. A mini Express 5 (routing, params, query, express.json, Router, error middleware, async
// handlers) stands in for the npm package. A program that listens on a port gets a request bar, and each request
// is logged like a server log: "GET /trains 200".
//
// It is not Node.js: there is no real disk, network or process, and npm packages other than express and dotenv
// aren’t there. Lessons say so where it matters. Built into src/lib/web/nodeRuntime.ts by
// scripts/build-react-runtime.mjs.
(function () {
  var ROOT = '/app';

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function wait(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }
  // console.log formatting, close to Node’s for the values lessons print.
  function inspect(v, top) {
    if (typeof v === 'string') return top ? v : "'" + v + "'";
    if (v === null || typeof v !== 'object') return typeof v === 'function' ? '[Function: ' + (v.name || 'anonymous') + ']' : String(v);
    if (v instanceof Error) return (v.name || 'Error') + ': ' + v.message;
    if (v instanceof Map) return 'Map(' + v.size + ') {' + (v.size ? ' ' + Array.from(v).map(function (e) { return inspect(e[0]) + ' => ' + inspect(e[1]); }).join(', ') + ' ' : '') + '}';
    if (v instanceof Set) return 'Set(' + v.size + ') {' + (v.size ? ' ' + Array.from(v).map(function (e) { return inspect(e); }).join(', ') + ' ' : '') + '}';
    if (Array.isArray(v)) return v.length ? '[ ' + v.map(function (x) { return inspect(x); }).join(', ') + ' ]' : '[]';
    var keys = Object.keys(v);
    if (!keys.length) return '{}';
    return '{ ' + keys.map(function (k) { return (/^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'") + ': ' + inspect(v[k]); }).join(', ') + ' }';
  }
  function format(args) {
    args = Array.prototype.slice.call(args);
    if (typeof args[0] === 'string' && /%[sdifjo%]/.test(args[0])) {
      var f = args.shift();
      var s = f.replace(/%([sdifjo%])/g, function (m, c) {
        if (c === '%') return '%';
        var a = args.shift();
        if (c === 'd' || c === 'i') return String(parseInt(a, 10));
        if (c === 'f') return String(parseFloat(a));
        if (c === 'j') return JSON.stringify(a);
        if (c === 'o') return inspect(a);
        return typeof a === 'string' ? a : inspect(a);
      });
      args.unshift(s);
    }
    return args.map(function (a) { return inspect(a, true); }).join(' ');
  }

  // Lesson apps write `console.log` lines; the page prints them in the terminal and reports them for the goal.
  window.__cyNode = function (files, opts) {
    opts = opts || {};
    var realLog = console.log.bind(console);
    var term = document.getElementById('root') || document.body.appendChild(el('div'));
    term.id = 'root';
    term.className = 'cy-term';
    var style = el('style');
    style.textContent =
      'body{margin:0;background:#0F1222}.cy-term{font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;color:#E6E8F2;padding:10px 12px;min-height:100vh;box-sizing:border-box;white-space:pre-wrap;word-break:break-word}.cy-cmd{color:#7EE0B5}.cy-err{color:#FF8A9B}.cy-dim{color:#8E93B8}.cy-res{color:#FFD58A}#cy-req{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0;padding:8px;border:1px solid #2E3456;border-radius:8px;background:#161A30}#cy-req select,#cy-req input,#cy-req textarea{font:12px ui-monospace,monospace;background:#0F1222;color:#E6E8F2;border:1px solid #2E3456;border-radius:6px;padding:5px 6px}#cy-path{flex:1;min-width:90px}#cy-body{flex-basis:100%;min-height:34px}#cy-req button,.cy-preset{font:bold 12px system-ui,sans-serif;background:#4B3FD8;color:#fff;border:0;border-radius:6px;padding:6px 10px}.cy-presets{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.cy-preset{background:#2E3456}#cy-run{font:bold 12px system-ui,sans-serif;background:#2E3456;color:#fff;border:0;border-radius:6px;padding:5px 10px;margin:6px 0}' +
      (opts.css || '');
    document.head.appendChild(style);
    var lines = el('div', 'cy-lines');
    term.appendChild(lines);

    function print(text, cls, report) {
      String(text)
        .split('\n')
        .forEach(function (t) {
          lines.appendChild(el('div', 'cy-line' + (cls ? ' ' + cls : ''), t === '' ? ' ' : t));
          if (report !== false) realLog(t);
        });
    }
    var nodeConsole = {
      log: function () { print(format(arguments)); },
      info: function () { print(format(arguments)); },
      warn: function () { print(format(arguments), 'cy-err'); },
      error: function () { print(format(arguments), 'cy-err'); },
      table: function (rows) {
        var list = Array.isArray(rows) ? rows : Object.keys(rows).map(function (k) { return rows[k]; });
        var cols = [];
        list.forEach(function (r) { Object.keys(r).forEach(function (k) { if (cols.indexOf(k) < 0) cols.push(k); }); });
        print('(index) │ ' + cols.join(' │ '));
        list.forEach(function (r, i) { print(i + '       │ ' + cols.map(function (c) { return inspect(r[c]); }).join(' │ ')); });
      },
    };

    // ── The disk, in memory ──
    var disk = {};
    Object.keys(files).forEach(function (p) { disk[ROOT + '/' + p.replace(/^\.?\//, '')] = files[p]; });
    function norm(p) {
      var parts = [];
      String(p).split('/').forEach(function (s) {
        if (s === '..') parts.pop();
        else if (s && s !== '.') parts.push(s);
      });
      return '/' + parts.join('/');
    }
    function abs(p) {
      p = String(p instanceof URL ? p.pathname : p);
      return norm(p[0] === '/' ? p : ROOT + '/' + p);
    }
    function fsError(code, op, p) {
      var msgs = { ENOENT: 'no such file or directory', EEXIST: 'file already exists', EISDIR: 'illegal operation on a directory', ENOTDIR: 'not a directory' };
      var e = new Error(code + ': ' + msgs[code] + ', ' + op + " '" + p + "'");
      e.code = code;
      e.syscall = op;
      e.path = p;
      return e;
    }
    function isDir(p) {
      var pre = p === '/' ? '/' : p + '/';
      return Object.keys(disk).some(function (k) { return k.indexOf(pre) === 0; }) || dirs[p];
    }
    var dirs = {};
    dirs[ROOT] = true;
    function readText(p, enc) {
      var a = abs(p);
      if (!Object.prototype.hasOwnProperty.call(disk, a)) throw isDir(a) ? fsError('EISDIR', 'read', a) : fsError('ENOENT', 'open', a);
      var t = disk[a];
      return enc ? t : Buf.from(t);
    }
    function encOf(o) {
      return typeof o === 'string' ? o : o && o.encoding;
    }
    var fsSync = {
      readFileSync: function (p, o) { return readText(p, encOf(o)); },
      writeFileSync: function (p, data) {
        var a = abs(p);
        var dir = a.slice(0, a.lastIndexOf('/')) || '/';
        if (!isDir(dir)) throw fsError('ENOENT', 'open', a);
        disk[a] = String(data);
      },
      appendFileSync: function (p, data) {
        var a = abs(p);
        disk[a] = (disk[a] || '') + String(data);
      },
      existsSync: function (p) {
        var a = abs(p);
        return Object.prototype.hasOwnProperty.call(disk, a) || !!isDir(a);
      },
      readdirSync: function (p) {
        var a = abs(p);
        if (!isDir(a)) throw fsError('ENOENT', 'scandir', a);
        var out = [];
        Object.keys(disk).concat(Object.keys(dirs)).forEach(function (k) {
          if (k.indexOf(a + '/') === 0) {
            var name = k.slice(a.length + 1).split('/')[0];
            if (name && out.indexOf(name) < 0) out.push(name);
          }
        });
        return out.sort();
      },
      mkdirSync: function (p, o) {
        var a = abs(p);
        if (isDir(a) && !(o && o.recursive)) throw fsError('EEXIST', 'mkdir', a);
        dirs[a] = true;
      },
      unlinkSync: function (p) {
        var a = abs(p);
        if (!Object.prototype.hasOwnProperty.call(disk, a)) throw fsError('ENOENT', 'unlink', a);
        delete disk[a];
      },
      rmSync: function (p, o) {
        var a = abs(p);
        if (Object.prototype.hasOwnProperty.call(disk, a)) delete disk[a];
        else if (!(o && o.force)) throw fsError('ENOENT', 'rm', a);
      },
      renameSync: function (from, to) {
        var a = abs(from);
        if (!Object.prototype.hasOwnProperty.call(disk, a)) throw fsError('ENOENT', 'rename', a);
        disk[abs(to)] = disk[a];
        delete disk[a];
      },
      statSync: function (p) {
        var a = abs(p);
        var file = Object.prototype.hasOwnProperty.call(disk, a);
        if (!file && !isDir(a)) throw fsError('ENOENT', 'stat', a);
        return { size: file ? disk[a].length : 0, isFile: function () { return file; }, isDirectory: function () { return !file; } };
      },
    };
    var later = function (fn) {
      return function () {
        var args = arguments;
        return wait(15).then(function () { return fn.apply(null, args); });
      };
    };
    var fsPromises = {
      readFile: later(fsSync.readFileSync),
      writeFile: later(fsSync.writeFileSync),
      appendFile: later(fsSync.appendFileSync),
      readdir: later(fsSync.readdirSync),
      mkdir: later(fsSync.mkdirSync),
      unlink: later(fsSync.unlinkSync),
      rm: later(fsSync.rmSync),
      rename: later(fsSync.renameSync),
      stat: later(fsSync.statSync),
      access: later(function (p) {
        if (!fsSync.existsSync(p)) throw fsError('ENOENT', 'access', abs(p));
      }),
    };
    var fsMod = Object.assign({ promises: fsPromises }, fsSync);
    // Callback versions: (err, result) after the work is done.
    ['readFile', 'writeFile', 'appendFile', 'readdir', 'mkdir', 'unlink', 'stat'].forEach(function (k) {
      fsMod[k] = function () {
        var args = Array.prototype.slice.call(arguments);
        var cb = args.pop();
        fsPromises[k].apply(null, args).then(function (r) { cb(null, r); }, function (e) { cb(e); });
      };
    });

    // A tiny Buffer: enough for readFile without an encoding, toString and base64.
    function Buf(text) {
      this.text = text;
      this.length = text.length;
    }
    Buf.prototype.toString = function (enc) {
      return enc === 'base64' ? btoa(unescape(encodeURIComponent(this.text))) : this.text;
    };
    Buf.from = function (v, enc) {
      return new Buf(enc === 'base64' ? decodeURIComponent(escape(atob(v))) : String(v));
    };
    Buf.byteLength = function (s) {
      return unescape(encodeURIComponent(String(s))).length;
    };
    Buf.isBuffer = function (b) {
      return b instanceof Buf;
    };

    var pathMod = {
      sep: '/',
      delimiter: ':',
      join: function () { return norm(Array.prototype.slice.call(arguments).join('/')).replace(/^\//, arguments[0] && String(arguments[0])[0] === '/' ? '/' : ''); },
      resolve: function () {
        var p = ROOT;
        Array.prototype.forEach.call(arguments, function (s) { p = String(s)[0] === '/' ? s : p + '/' + s; });
        return norm(p);
      },
      basename: function (p, ext) {
        var b = String(p).replace(/\/+$/, '').split('/').pop();
        return ext && b.slice(-ext.length) === ext ? b.slice(0, -ext.length) : b;
      },
      dirname: function (p) {
        var s = String(p).replace(/\/+$/, '');
        var i = s.lastIndexOf('/');
        return i < 0 ? '.' : i === 0 ? '/' : s.slice(0, i);
      },
      extname: function (p) {
        var b = pathMod.basename(p);
        var i = b.lastIndexOf('.');
        return i > 0 ? b.slice(i) : '';
      },
      normalize: function (p) { return norm(p); },
      isAbsolute: function (p) { return String(p)[0] === '/'; },
      relative: function (from, to) {
        var a = norm(from).split('/').filter(Boolean);
        var b = norm(to).split('/').filter(Boolean);
        while (a.length && b.length && a[0] === b[0]) { a.shift(); b.shift(); }
        return a.map(function () { return '..'; }).concat(b).join('/');
      },
      parse: function (p) {
        var base = pathMod.basename(p);
        var ext = pathMod.extname(p);
        return { root: String(p)[0] === '/' ? '/' : '', dir: pathMod.dirname(p), base: base, ext: ext, name: ext ? base.slice(0, -ext.length) : base };
      },
    };
    pathMod.posix = pathMod;

    function EventEmitter() {
      this._ev = {};
    }
    EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (n, f) {
      (this._ev[n] = this._ev[n] || []).push(f);
      return this;
    };
    EventEmitter.prototype.once = function (n, f) {
      var self = this;
      function w() {
        self.off(n, w);
        f.apply(self, arguments);
      }
      return this.on(n, w);
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function (n, f) {
      this._ev[n] = (this._ev[n] || []).filter(function (x) { return x !== f; });
      return this;
    };
    EventEmitter.prototype.emit = function (n) {
      var args = Array.prototype.slice.call(arguments, 1);
      var list = (this._ev[n] || []).slice();
      if (n === 'error' && !list.length) throw args[0];
      var self = this;
      list.forEach(function (f) { f.apply(self, args); });
      return list.length > 0;
    };
    EventEmitter.prototype.listenerCount = function (n) {
      return (this._ev[n] || []).length;
    };
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.default = EventEmitter;

    // ── process ──
    var env = Object.assign({}, opts.env || {});
    if (opts.envFile && disk[ROOT + '/' + opts.envFile] !== undefined) Object.assign(env, parseEnv(disk[ROOT + '/' + opts.envFile]));
    function parseEnv(text) {
      var out = {};
      String(text).split('\n').forEach(function (line) {
        var m = /^\s*([A-Za-z_][\w]*)\s*=\s*(.*?)\s*$/.exec(line);
        if (m && line.trim()[0] !== '#') out[m[1]] = m[2].replace(/^(["'])(.*)\1$/, '$2');
      });
      return out;
    }
    function Exit(code) {
      this.code = code;
    }
    var proc = new EventEmitter();
    var entry = opts.entry || 'app.js';
    Object.assign(proc, {
      argv: ['/usr/local/bin/node', ROOT + '/' + entry].concat(opts.args || []),
      env: env,
      platform: 'linux',
      version: 'v22.11.0',
      versions: { node: '22.11.0' },
      pid: 4242,
      exitCode: undefined,
      cwd: function () { return ROOT; },
      exit: function (code) { throw new Exit(code === undefined ? proc.exitCode || 0 : code); },
      nextTick: function (f) {
        var args = Array.prototype.slice.call(arguments, 1);
        queueMicrotask(function () { f.apply(null, args); });
      },
      memoryUsage: function () { return { rss: 30000000, heapUsed: 5000000 }; },
      uptime: function () { return (Date.now() - started) / 1000; },
      hrtime: { bigint: function () { return BigInt(Math.round(performance.now() * 1e6)); } },
      stdout: { write: function (s) { print(String(s).replace(/\n$/, '')); return true; } },
      stderr: { write: function (s) { print(String(s).replace(/\n$/, ''), 'cy-err'); return true; } },
    });
    var started = Date.now();

    // ── http, and a mini Express ──
    var server = null;
    function statusText(c) {
      return { 200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict', 422: 'Unprocessable Content', 500: 'Internal Server Error' }[c] || '';
    }
    function makeReq(method, url, headers, body) {
      var req = new EventEmitter();
      req.method = method;
      req.url = url;
      req.headers = Object.assign({ host: 'localhost:' + (server ? server.port : 3000), 'user-agent': 'curl/8.5' }, headers || {});
      req.rawBody = body || '';
      req[Symbol.asyncIterator] = function () {
        var done = false;
        return { next: function () { var d = done; done = true; return Promise.resolve(d || !req.rawBody ? { done: true, value: undefined } : { done: false, value: req.rawBody }); } };
      };
      setTimeout(function () {
        if (req.rawBody) req.emit('data', req.rawBody);
        req.emit('end');
      }, 5);
      return req;
    }
    function makeRes(done) {
      var res = new EventEmitter();
      res.statusCode = 200;
      res.headers = {};
      res.body = '';
      res.headersSent = false;
      res.writableEnded = false;
      res.setHeader = function (k, v) { res.headers[String(k).toLowerCase()] = v; return res; };
      res.getHeader = function (k) { return res.headers[String(k).toLowerCase()]; };
      res.writeHead = function (code, h) {
        res.statusCode = code;
        if (h) Object.keys(h).forEach(function (k) { res.setHeader(k, h[k]); });
        res.headersSent = true;
        return res;
      };
      res.write = function (chunk) { res.body += String(chunk); res.headersSent = true; return true; };
      res.end = function (chunk) {
        if (res.writableEnded) return res;
        if (chunk !== undefined && chunk !== null) res.body += String(chunk);
        res.writableEnded = true;
        res.headersSent = true;
        done(res);
        return res;
      };
      return res;
    }

    function createServer(handler) {
      var s = new EventEmitter();
      s.handle = function (req, res) {
        try {
          var r = handler(req, res);
          if (r && r.catch) r.catch(function (e) { crash(e); });
        } catch (e) {
          crash(e);
        }
      };
      s.listen = function (port, host, cb) {
        if (typeof host === 'function') cb = host;
        s.port = Number(port) || 3000;
        server = s;
        showRequestBar();
        setTimeout(function () {
          s.emit('listening');
          if (cb) runSafe(cb);
        }, 0);
        return s;
      };
      s.close = function (cb) {
        if (server === s) server = null;
        if (cb) setTimeout(cb, 0);
        return s;
      };
      s.address = function () { return { port: s.port }; };
      return s;
    }
    var httpMod = { createServer: createServer, STATUS_CODES: { 200: 'OK', 201: 'Created', 404: 'Not Found', 500: 'Internal Server Error' } };

    function compilePath(p) {
      if (p instanceof RegExp) return { re: p, keys: [] };
      var keys = [];
      var src = String(p)
        .replace(/[.+^$|()[\]\\]/g, '\\$&')
        .replace(/\{\/:(\w+)\}/g, function (_, k) { keys.push(k); return '(?:/([^/]+))?'; })
        .replace(/\/\*(\w+)/g, function (_, k) { keys.push(k); return '/(.+)'; })
        .replace(/:(\w+)/g, function (_, k) { keys.push(k); return '([^/]+)'; });
      return { re: new RegExp('^' + src + '/?$'), prefix: new RegExp('^' + src + '(?=/|$)'), keys: keys };
    }
    function parseQuery(search) {
      var q = {};
      new URLSearchParams(search).forEach(function (v, k) {
        q[k] = q[k] === undefined ? v : [].concat(q[k], v);
      });
      return q;
    }
    function expressApp(isRouter) {
      var stack = [];
      function app(req, res, outerNext) {
        return handle(req, res, outerNext);
      }
      ['get', 'post', 'put', 'patch', 'delete', 'all'].forEach(function (m) {
        app[m] = function (path) {
          var fns = Array.prototype.slice.call(arguments, 1);
          var c = compilePath(path);
          fns.forEach(function (fn) { stack.push({ method: m === 'all' ? null : m.toUpperCase(), re: c.re, keys: c.keys, fn: fn, route: true }); });
          return app;
        };
      });
      app.route = function (path) {
        var r = {};
        ['get', 'post', 'put', 'patch', 'delete'].forEach(function (m) {
          r[m] = function () { app[m].apply(null, [path].concat(Array.prototype.slice.call(arguments))); return r; };
        });
        return r;
      };
      app.use = function (path) {
        var fns = Array.prototype.slice.call(arguments);
        var base = typeof path === 'string' ? fns.shift() : '';
        var c = base ? compilePath(base) : null;
        fns.forEach(function (fn) { stack.push({ base: base, prefix: c && c.prefix, fn: fn, route: false }); });
        return app;
      };
      app.locals = {};
      app.settings = {};
      app.set = function (k, v) { app.settings[k] = v; return app; };
      app.listen = function (port, cb) {
        var s = createServer(function (req, res) { handle(wrapReq(req), wrapRes(res)); });
        return s.listen(port, cb);
      };
      function handle(req, res, outerNext) {
        var i = 0;
        var path = req.path;
        function next(err) {
          if (err === 'route') err = undefined;
          var layer = stack[i++];
          if (!layer) {
            if (outerNext) return outerNext(err);
            return finalHandler(err, req, res);
          }
          var m;
          if (layer.route) {
            if (layer.method && layer.method !== req.method && !(layer.method === 'GET' && req.method === 'HEAD')) return next(err);
            m = layer.re.exec(path);
            if (!m) return next(err);
            req.params = {};
            layer.keys.forEach(function (k, j) { if (m[j + 1] !== undefined) req.params[k] = decodeURIComponent(m[j + 1]); });
          } else if (layer.prefix && !layer.prefix.test(path)) return next(err);
          var arity = layer.fn.length;
          if (err ? arity !== 4 : arity === 4) return next(err);
          var savedPath = path;
          var done = function (e) {
            path = savedPath;
            req.path = savedPath;
            next(e);
          };
          if (!layer.route && layer.base) {
            var cut = layer.prefix.exec(path)[0];
            req.path = path.slice(cut.length) || '/';
            req.baseUrl = (req.baseUrl || '') + cut;
          }
          try {
            var r = err ? layer.fn(err, req, res, done) : layer.fn(req, res, done);
            // Express 5: a rejected promise goes to the error handlers.
            if (r && typeof r.then === 'function') r.then(null, function (e) { done(e || new Error('Rejected')); });
          } catch (e) {
            done(e);
          }
        }
        next();
      }
      if (isRouter) return app;
      return app;
    }
    function finalHandler(err, req, res) {
      if (res.writableEnded) return;
      if (err) {
        var code = err.status || err.statusCode || 500;
        if (code >= 500) print((err.name || 'Error') + ': ' + err.message, 'cy-err');
        res.status(code).type('text').send(code >= 500 ? 'Internal Server Error' : err.message);
        return;
      }
      res.status(404).type('text').send('Cannot ' + req.method + ' ' + req.path);
    }
    function wrapReq(req) {
      var u = new URL(req.url, 'http://localhost');
      req.path = u.pathname;
      req.query = parseQuery(u.search);
      req.params = {};
      req.body = undefined;
      req.baseUrl = '';
      req.originalUrl = req.url;
      req.ip = '::1';
      req.get = req.header = function (k) { return req.headers[String(k).toLowerCase()]; };
      return req;
    }
    function wrapRes(res) {
      res.status = function (c) { res.statusCode = c; return res; };
      res.set = res.header = function (k, v) {
        if (typeof k === 'object') Object.keys(k).forEach(function (x) { res.setHeader(x, k[x]); });
        else res.setHeader(k, v);
        return res;
      };
      res.get = res.getHeader;
      res.type = function (t) { res.setHeader('content-type', t === 'json' ? 'application/json' : t === 'text' ? 'text/plain' : t === 'html' ? 'text/html' : t); return res; };
      res.json = function (data) {
        if (!res.getHeader('content-type')) res.setHeader('content-type', 'application/json');
        return res.end(JSON.stringify(data));
      };
      res.send = function (body) {
        if (body !== null && typeof body === 'object') return res.json(body);
        if (!res.getHeader('content-type')) res.setHeader('content-type', 'text/html');
        return res.end(body === undefined ? '' : String(body));
      };
      res.sendStatus = function (c) { res.statusCode = c; return res.type('text').end(c === 204 ? '' : statusText(c)); };
      res.redirect = function (code, url) {
        if (url === undefined) { url = code; code = 302; }
        res.statusCode = code;
        res.setHeader('location', url);
        return res.end('Redirecting to ' + url);
      };
      res.locals = {};
      return res;
    }
    function expressFn() {
      return expressApp(false);
    }
    expressFn.Router = function () { return expressApp(true); };
    expressFn.json = function () {
      return function jsonParser(req, res, next) {
        var type = req.headers['content-type'] || '';
        if (type.indexOf('json') < 0 || !req.rawBody) return next();
        try {
          req.body = JSON.parse(req.rawBody);
          next();
        } catch (e) {
          var err = new Error(e.message);
          err.status = 400;
          err.type = 'entity.parse.failed';
          next(err);
        }
      };
    };
    expressFn.urlencoded = function () {
      return function (req, res, next) {
        if ((req.headers['content-type'] || '').indexOf('urlencoded') >= 0) req.body = parseQuery(req.rawBody);
        next();
      };
    };
    expressFn.static = function () {
      return function (req, res, next) { next(); };
    };

    // ── Requests, from the request bar, the preset buttons or fetch() ──
    function send(method, path, body, quiet) {
      if (!server) {
        if (!quiet) print('curl: (7) Failed to connect to localhost port 3000: nothing is listening', 'cy-err');
        return Promise.resolve(null);
      }
      var headers = body ? { 'content-type': 'application/json' } : {};
      return new Promise(function (resolve) {
        var req = makeReq(method, path, headers, body || '');
        var res = makeRes(function (r) { resolve(r); });
        server.handle(req, res);
        setTimeout(function () { if (!res.writableEnded) resolve(null); }, 3000);
      }).then(function (r) {
        if (!quiet) {
          if (!r) print('(no response: the handler never called res.end or res.json)', 'cy-err');
          else {
            print(method + ' ' + path + ' ' + r.statusCode, 'cy-res');
            if (r.body) print(r.body, 'cy-dim');
          }
        }
        return r;
      });
    }
    var pageFetch = window.fetch;
    window.fetch = function (input, init) {
      var raw = String(input && input.url ? input.url : input);
      var m = /^https?:\/\/(localhost|127\.0\.0\.1):(\d+)(\/.*)?$/.exec(raw);
      if (m && server && Number(m[2]) === server.port) {
        init = init || {};
        return send((init.method || 'GET').toUpperCase(), m[3] || '/', init.body, true).then(function (r) {
          var status = r ? r.statusCode : 500;
          var text = r ? r.body : '';
          return {
            ok: status >= 200 && status < 300,
            status: status,
            headers: { get: function (k) { return r && r.headers[String(k).toLowerCase()]; } },
            json: function () { return Promise.resolve().then(function () { return JSON.parse(text); }); },
            text: function () { return Promise.resolve(text); },
          };
        });
      }
      return pageFetch.apply(window, arguments);
    };

    var bar = null;
    function showRequestBar() {
      if (bar) return;
      bar = el('div');
      var presets = el('div', 'cy-presets');
      (opts.requests || []).forEach(function (r, i) {
        var b = el('button', 'cy-preset', r.label || r.method + ' ' + r.path);
        b.type = 'button';
        b.id = 'cy-r' + i;
        b.addEventListener('click', function () {
          print('$ curl -X ' + r.method + ' localhost:' + server.port + r.path + (r.body ? " -d '" + r.body + "'" : ''), 'cy-cmd', false);
          send(r.method, r.path, r.body);
        });
        presets.appendChild(b);
      });
      var form = el('form');
      form.id = 'cy-req';
      form.innerHTML = '<select id="cy-method" aria-label="Method"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select><input id="cy-path" aria-label="Path" value="/" autocomplete="off" autocapitalize="off" spellcheck="false"><button type="submit">Send</button><textarea id="cy-body" aria-label="JSON body" placeholder="JSON body (optional)"></textarea>';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var method = document.getElementById('cy-method').value;
        var path = document.getElementById('cy-path').value.trim() || '/';
        if (path[0] !== '/') path = '/' + path;
        var body = document.getElementById('cy-body').value.trim();
        print('$ curl -X ' + method + ' localhost:' + server.port + path + (body ? " -d '" + body + "'" : ''), 'cy-cmd', false);
        send(method, path, body);
      });
      bar.appendChild(presets);
      bar.appendChild(form);
      term.insertBefore(bar, lines);
    }

    // ── node:test and assert ──
    function AssertionError(msg, actual, expected) {
      var e = new Error(msg);
      e.name = 'AssertionError';
      e.code = 'ERR_ASSERTION';
      e.actual = actual;
      e.expected = expected;
      return e;
    }
    function deepEq(a, b) {
      if (Object.is(a, b)) return true;
      if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
      var ka = Object.keys(a);
      var kb = Object.keys(b);
      return ka.length === kb.length && ka.every(function (k) { return deepEq(a[k], b[k]); });
    }
    function assert(v, msg) {
      if (!v) throw AssertionError(msg || 'The expression evaluated to a falsy value', v, true);
    }
    assert.ok = assert;
    assert.equal = function (a, b, msg) { if (a != b) throw AssertionError(msg || inspect(a) + ' == ' + inspect(b), a, b); };
    assert.notEqual = function (a, b, msg) { if (a == b) throw AssertionError(msg || inspect(a) + ' != ' + inspect(b), a, b); };
    assert.strictEqual = function (a, b, msg) { if (!Object.is(a, b)) throw AssertionError(msg || 'Expected values to be strictly equal:\n\n' + inspect(a) + ' !== ' + inspect(b), a, b); };
    assert.notStrictEqual = function (a, b, msg) { if (Object.is(a, b)) throw AssertionError(msg || 'Expected "actual" to be strictly unequal to: ' + inspect(b), a, b); };
    assert.deepStrictEqual = assert.deepEqual = function (a, b, msg) { if (!deepEq(a, b)) throw AssertionError(msg || 'Expected values to be strictly deep-equal:\n' + inspect(a) + '\n' + inspect(b), a, b); };
    assert.throws = function (fn, expected, msg) {
      try { fn(); } catch (e) {
        if (expected instanceof RegExp && !expected.test(e.message)) throw AssertionError(msg || 'The error message does not match ' + expected);
        if (expected && typeof expected === 'object' && !(expected instanceof RegExp)) Object.keys(expected).forEach(function (k) { if (!deepEq(e[k], expected[k])) throw AssertionError(msg || 'Expected the error ' + k + ' to be ' + inspect(expected[k])); });
        return;
      }
      throw AssertionError(msg || 'Missing expected exception.');
    };
    assert.rejects = function (p, expected, msg) {
      return Promise.resolve(typeof p === 'function' ? p() : p).then(
        function () { throw AssertionError(msg || 'Missing expected rejection.'); },
        function (e) { if (expected instanceof RegExp && !expected.test(e.message)) throw AssertionError(msg || 'The error message does not match ' + expected); },
      );
    };
    assert.match = function (s, re, msg) { if (!re.test(s)) throw AssertionError(msg || 'The input did not match the regular expression ' + re, s, re); };
    assert.strict = assert;
    var tests = [];
    var testPrefix = [];
    function test(name, o, fn) {
      if (typeof o === 'function') fn = o;
      tests.push({ name: testPrefix.concat(name).join(' > '), fn: fn });
    }
    function describe(name, fn) {
      testPrefix.push(name);
      try { fn(); } finally { testPrefix.pop(); }
    }
    var testMod = { test: test, it: test, describe: describe, beforeEach: function () {}, afterEach: function () {} };
    testMod.default = test;
    function runTests() {
      if (!tests.length) return Promise.resolve();
      var pass = 0;
      var fail = 0;
      return tests
        .reduce(function (p, t) {
          return p.then(function () {
            return Promise.resolve()
              .then(function () { return t.fn({ name: t.name }); })
              .then(
                function () { pass++; print('✔ ' + t.name); },
                function (e) {
                  fail++;
                  print('✖ ' + t.name, 'cy-err');
                  print('  ' + (e && e.message ? e.message.split('\n').join('\n  ') : String(e)), 'cy-err');
                },
              );
          });
        }, Promise.resolve())
        .then(function () {
          print('ℹ tests ' + (pass + fail));
          print('ℹ pass ' + pass);
          print('ℹ fail ' + fail);
          if (fail) proc.exitCode = 1;
        });
    }

    // ── Modules ──
    var modules = {};
    function builtin(name) {
      var n = name.replace(/^node:/, '');
      switch (n) {
        case 'fs': return fsMod;
        case 'fs/promises': return fsPromises;
        case 'path': return pathMod;
        case 'events': return EventEmitter;
        case 'http': return httpMod;
        case 'url': return { URL: URL, URLSearchParams: URLSearchParams, fileURLToPath: function (u) { return new URL(u).pathname; }, pathToFileURL: function (p) { return new URL('file://' + abs(p)); } };
        case 'os': return { EOL: '\n', platform: function () { return 'linux'; }, cpus: function () { return [{}, {}, {}, {}]; }, homedir: function () { return '/home/learner'; }, tmpdir: function () { return '/tmp'; }, hostname: function () { return 'codeyatra'; } };
        case 'util': return { format: function () { return format(arguments); }, inspect: inspect, promisify: function (fn) { return function () { var a = Array.prototype.slice.call(arguments); return new Promise(function (ok, no) { fn.apply(null, a.concat(function (e, r) { if (e) no(e); else ok(r); })); }); }; } };
        case 'crypto': return { randomUUID: function () { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); }); }, randomInt: function (a, b) { if (b === undefined) { b = a; a = 0; } return a + Math.floor(Math.random() * (b - a)); } };
        case 'assert': case 'assert/strict': return assert;
        case 'test': return testMod;
        case 'timers/promises': return { setTimeout: function (ms, v) { return wait(ms).then(function () { return v; }); } };
        case 'process': return proc;
        case 'buffer': return { Buffer: Buf };
        case 'express': return expressFn;
        case 'dotenv': return { config: function (o) { var f = (o && o.path) || '.env'; if (disk[abs(f)] !== undefined) { var e = parseEnv(disk[abs(f)]); Object.keys(e).forEach(function (k) { if (env[k] === undefined) env[k] = e[k]; }); } return { parsed: env }; } };
        case 'dotenv/config': builtin('dotenv').config(); return {};
      }
      return null;
    }
    function resolveFile(from, spec) {
      var base = spec[0] === '/' ? spec : pathMod.dirname(from) + '/' + spec;
      var a = norm(base);
      var tries = [a, a + '.js', a + '.mjs', a + '.cjs', a + '.json', a + '/index.js'];
      for (var i = 0; i < tries.length; i++) if (Object.prototype.hasOwnProperty.call(disk, tries[i])) return tries[i];
      return null;
    }
    function compile(path, src, entryFile) {
      var exported = [];
      var body = String(src)
        .replace(/^#!.*\n/, '')
        .replace(/^\s*import\s+(?:([\w$]+)\s*,?\s*)?(?:\{([^}]*)\}|\*\s*as\s+([\w$]+))?\s*from\s*["']([^"']+)["'];?/gm, function (_, def, named, ns, spec) {
          var m = '__m' + Math.random().toString(36).slice(2, 7);
          var out = 'var ' + m + ' = __import(' + JSON.stringify(spec) + ');';
          if (def) out += ' var ' + def + ' = ' + m + ' && ' + m + '.__esModule ? ' + m + '.default : ' + m + ';';
          if (ns) out += ' var ' + ns + ' = ' + m + ';';
          if (named)
            named.split(',').map(function (s) { return s.trim(); }).filter(Boolean).forEach(function (s) {
              var p = s.split(/\s+as\s+/);
              out += ' var ' + (p[1] || p[0]) + ' = ' + m + '.' + p[0] + ';';
            });
          return out;
        })
        .replace(/^\s*import\s+["']([^"']+)["'];?/gm, function (_, spec) { return '__import(' + JSON.stringify(spec) + ');'; })
        .replace(/\bimport\.meta\.url\b/g, JSON.stringify('file://' + path))
        .replace(/\bimport\.meta\.dirname\b/g, JSON.stringify(pathMod.dirname(path)))
        .replace(/\bimport\.meta\.filename\b/g, JSON.stringify(path))
        .replace(/\bimport\(/g, '__dynamicImport(')
        .replace(/^export\s+default\s+(async\s+)?function\s+([\w$]+)/gm, function (_, a, n) { exported.push(['default', n]); return (a || '') + 'function ' + n; })
        .replace(/^export\s+default\s+class\s+([\w$]+)/gm, function (_, n) { exported.push(['default', n]); return 'class ' + n; })
        .replace(/^export\s+default\s+/gm, 'exports.__esModule = true; exports.default = ')
        .replace(/^export\s+(async\s+)?function\s+([\w$]+)/gm, function (_, a, n) { exported.push([n, n]); return (a || '') + 'function ' + n; })
        .replace(/^export\s+class\s+([\w$]+)/gm, function (_, n) { exported.push([n, n]); return 'class ' + n; })
        .replace(/^export\s+(const|let|var)\s+([\w$]+)/gm, function (_, k, n) { exported.push([n, n]); return k + ' ' + n; })
        .replace(/^export\s*\{([^}]*)\};?/gm, function (_, list) {
          list.split(',').forEach(function (s) {
            var p = s.trim().split(/\s+as\s+/);
            if (p[0]) exported.push([p[1] || p[0], p[0]]);
          });
          return '';
        });
      var tail = exported.length ? '\nexports.__esModule = true;\n' + exported.map(function (e) { return 'exports[' + JSON.stringify(e[0]) + '] = ' + e[1] + ';'; }).join('\n') : '';
      var params = ['exports', 'require', 'module', '__filename', '__dirname', '__import', '__dynamicImport', 'process', 'console', 'Buffer', 'setImmediate', 'global'];
      // The entry file may use top-level await; exports are set before it awaits anything.
      if (entryFile) return new (Object.getPrototypeOf(async function () {}).constructor)(params.join(','), body + tail);
      return new Function(params.join(','), body + tail);
    }
    function load(from, spec) {
      var b = builtin(spec);
      if (b) return b;
      if (spec[0] !== '.' && spec[0] !== '/') {
        var e = new Error("Cannot find package '" + spec + "' imported from " + from);
        e.code = 'ERR_MODULE_NOT_FOUND';
        throw e;
      }
      var p = resolveFile(from, spec);
      if (!p) {
        var e2 = new Error("Cannot find module '" + norm(pathMod.dirname(from) + '/' + spec) + "' imported from " + from);
        e2.code = 'ERR_MODULE_NOT_FOUND';
        throw e2;
      }
      if (modules[p]) return modules[p].exports;
      if (/\.json$/.test(p)) {
        modules[p] = { exports: JSON.parse(disk[p]) };
        return modules[p].exports;
      }
      var mod = { exports: {} };
      modules[p] = mod;
      var fn = compile(p, disk[p], false);
      run(fn, mod, p);
      return mod.exports;
    }
    function run(fn, mod, p) {
      var req = function (spec) { return load(p, spec); };
      var dyn = function (spec) { return Promise.resolve().then(function () { var m = load(p, spec); return m && m.__esModule ? m : Object.assign({ default: m }, m); }); };
      return fn.call(mod.exports, mod.exports, req, mod, p, pathMod.dirname(p), req, dyn, proc, nodeConsole, Buf, function (f) { return setTimeout(f, 0); }, window);
    }
    function runSafe(fn) {
      try {
        var r = fn();
        if (r && r.catch) r.catch(crash);
      } catch (e) {
        crash(e);
      }
    }
    var crashed = false;
    function crash(e) {
      if (e instanceof Exit) return;
      crashed = true;
      var where = e && e.code === 'ERR_MODULE_NOT_FOUND' ? 'node:internal/modules/esm/resolve' : ROOT + '/' + entry;
      print('', null, false);
      print((e && e.name ? e.name : 'Error') + ': ' + (e && e.message !== undefined ? e.message : String(e)), 'cy-err');
      if (e && e.code) print('  code: ' + inspect(e.code), 'cy-err', false);
      print('', null, false);
      print('Node.js v22.11.0 (' + where + ')', 'cy-dim', false);
    }
    window.addEventListener('unhandledrejection', function (ev) {
      ev.preventDefault();
      crash(ev.reason);
    });

    // ── Run it ──
    function start() {
      lines.innerHTML = '';
      modules = {};
      tests = [];
      crashed = false;
      var cmd = opts.command || 'node ' + (opts.envFile ? '--env-file=' + opts.envFile + ' ' : '') + entry + (opts.args && opts.args.length ? ' ' + opts.args.join(' ') : '');
      print('$ ' + cmd, 'cy-cmd', false);
      var entries = opts.test ? Object.keys(disk).filter(function (k) { return /\.test\.(m?js)$/.test(k); }) : [ROOT + '/' + entry];
      return entries
        .reduce(function (p, file) {
          return p.then(function () {
            if (crashed) return;
            if (disk[file] === undefined) throw Object.assign(new Error("Cannot find module '" + file + "'"), { code: 'MODULE_NOT_FOUND' });
            var mod = { exports: {} };
            modules[file] = mod;
            var fn;
            try {
              fn = compile(file, disk[file], true);
            } catch (e) {
              // A syntax error in the lesson code is a real problem: report it to the app too.
              print('SyntaxError: ' + e.message, 'cy-err');
              if (window.onerror) window.onerror('SyntaxError in ' + file.slice(ROOT.length + 1) + ': ' + e.message);
              crashed = true;
              return;
            }
            return run(fn, mod, file);
          });
        }, Promise.resolve())
        .then(function () { if (!crashed) return runTests(); })
        .catch(crash);
    }
    if (opts.rerun) {
      var again = el('button', null, '▶ Run again');
      again.id = 'cy-run';
      again.type = 'button';
      again.addEventListener('click', function () {
        server = null;
        if (bar) { bar.remove(); bar = null; }
        start();
      });
      term.insertBefore(again, lines);
    }
    start();
  };
})();
