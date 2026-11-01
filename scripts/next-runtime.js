// A small teaching copy of Next.js (App Router), for lesson pages. It runs on the bundled React (reactRuntime.ts)
// inside the page, offline, so learners can tap and change a real-looking Next.js app on a phone.
//
// What it does, like Next.js 16: folders in app/ become URLs (page.js, layout.js, loading.js, error.js,
// not-found.js, default.js, route.js), with [id], [...slug], [[...slug]], (group), _private, @slot and (.)intercept
// folders. Server Components run first (they may be async, and may not use hooks or event handlers); "use client"
// files are drawn by React with real hooks. Route Handlers answer fetch() and the address bar; Server Actions
// ("use server") run from forms; next/link, next/navigation, next/headers (cookies), next/cache ("use cache",
// revalidatePath, revalidateTag), next/image, next/font, next/dynamic, metadata, proxy.js and .env files work.
// A practice database (@/lib/db) answers Prisma-style queries. The page logs requests like `next dev` does:
// "GET /menu 200". Pages are static or dynamic like a built site: a page that uses nothing per-visit is made once
// and reused until revalidatePath or revalidateTag.
//
// It is not Next.js: there is no real server, build or cache timing. Lessons say so where it matters.
// Built into src/lib/web/nextRuntime.ts by scripts/build-react-runtime.mjs.
(function () {
  var React = window.React;
  var h = React.createElement;
  var ORIGIN = 'http://localhost:3000';
  // Session tokens in the sign-in lessons use crypto.randomUUID(); older web views may not have it.
  if (window.crypto && !window.crypto.randomUUID)
    window.crypto.randomUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 3) | 8).toString(16);
      });
    };

  // ── Small helpers ────────────────────────────────────────────────────────────

  function log(text) {
    console.log(text);
  }
  function wait(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }
  function isElement(x) {
    return x !== null && typeof x === 'object' && x.$$typeof !== undefined && 'props' in x;
  }
  function isThenable(x) {
    return x !== null && (typeof x === 'object' || typeof x === 'function') && typeof x.then === 'function';
  }
  function parseEnv(text) {
    var env = {};
    String(text || '')
      .split('\n')
      .forEach(function (line) {
        var m = /^\s*([A-Za-z_][\w]*)\s*=\s*(.*?)\s*$/.exec(line);
        if (m && line.trim()[0] !== '#') env[m[1]] = m[2].replace(/^(["'])(.*)\1$/, '$2');
      });
    return env;
  }
  function firstDirective(src) {
    var s = String(src).replace(/^(\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*/, '');
    var m = /^(["'])(use client|use server|use cache)\1/.exec(s);
    return m ? m[2] : '';
  }
  function directiveOf(fn) {
    try {
      var m = /^[^{]*\{\s*(["'])(use server|use cache)\1/.exec(Function.prototype.toString.call(fn));
      return m ? m[2] : '';
    } catch (e) {
      return '';
    }
  }

  function Headers2(init) {
    var map = {};
    if (init) {
      if (typeof init.forEach === 'function' && !Array.isArray(init))
        init.forEach(function (v, k) {
          map[String(k).toLowerCase()] = String(v);
        });
      else
        Object.keys(init).forEach(function (k) {
          map[k.toLowerCase()] = String(init[k]);
        });
    }
    return {
      get: function (k) {
        k = String(k).toLowerCase();
        return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null;
      },
      set: function (k, v) {
        map[String(k).toLowerCase()] = String(v);
      },
      has: function (k) {
        return Object.prototype.hasOwnProperty.call(map, String(k).toLowerCase());
      },
      delete: function (k) {
        delete map[String(k).toLowerCase()];
      },
      forEach: function (f) {
        Object.keys(map).forEach(function (k) {
          f(map[k], k);
        });
      },
      entries: function () {
        return Object.keys(map).map(function (k) {
          return [k, map[k]];
        });
      },
    };
  }

  // ── Cookies (one browser, one server) ────────────────────────────────────────

  var jar = {};
  // Pages are static (made once, then reused, like after `next build`) unless drawing them used something that
  // differs per visit: cookies(), headers(), connection(), searchParams, or fetch with cache: "no-store".
  var drawing = null;
  function markDynamic() {
    if (drawing && phase === 'render') drawing.dynamic = true;
  }
  var phase = 'render';
  var dirty = false;
  function cookieStore() {
    function guard() {
      if (phase === 'render') throw new Error('Cookies can only be changed in a Server Action or Route Handler, not while a page is drawn.');
    }
    return {
      get: function (name) {
        return Object.prototype.hasOwnProperty.call(jar, name) ? { name: name, value: jar[name] } : undefined;
      },
      getAll: function () {
        return Object.keys(jar).map(function (k) {
          return { name: k, value: jar[k] };
        });
      },
      has: function (name) {
        return Object.prototype.hasOwnProperty.call(jar, name);
      },
      set: function (name, value) {
        guard();
        if (typeof name === 'object') {
          value = name.value;
          name = name.name;
        }
        jar[name] = String(value);
        dirty = true;
      },
      delete: function (name) {
        guard();
        delete jar[name];
        dirty = true;
      },
      toString: function () {
        return Object.keys(jar)
          .map(function (k) {
            return k + '=' + jar[k];
          })
          .join('; ');
      },
    };
  }
  var BROWSER_HEADERS = { 'user-agent': 'Mozilla/5.0 (Linux; Android 14) Mobile', 'accept-language': 'en-GB,en;q=0.9', host: 'localhost:3000' };

  // ── Requests and responses (the Web API shapes Route Handlers use) ──────────

  function Res(body, init) {
    init = init || {};
    this.status = init.status || 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.headers = Headers2(init.headers);
    this._body = body === undefined || body === null ? '' : body;
    var self = this;
    this.cookies = {
      set: function (name, value) {
        jar[name] = String(value);
        dirty = true;
        return self;
      },
      delete: function (name) {
        delete jar[name];
        dirty = true;
        return self;
      },
    };
  }
  Res.prototype.text = function () {
    return Promise.resolve(typeof this._body === 'string' ? this._body : JSON.stringify(this._body));
  };
  Res.prototype.json = function () {
    var b = this._body;
    return Promise.resolve().then(function () {
      return typeof b === 'string' ? JSON.parse(b) : b;
    });
  };
  Res.json = function (data, init) {
    init = init || {};
    var headers = Object.assign({ 'content-type': 'application/json' }, init.headers || {});
    return new Res(JSON.stringify(data), { status: init.status, headers: headers });
  };
  Res.redirect = function (url, status) {
    var r = new Res('', { status: status || 307, headers: { location: String(url) } });
    return r;
  };
  var NextResponse = {
    json: Res.json,
    redirect: function (url, init) {
      var r = Res.redirect(url, typeof init === 'number' ? init : (init && init.status) || 307);
      r.__redirect = String(url);
      return r;
    },
    rewrite: function (url) {
      var r = new Res('', { status: 200 });
      r.__rewrite = String(url);
      return r;
    },
    next: function () {
      var r = new Res('', { status: 200 });
      r.__next = true;
      return r;
    },
  };

  function Req(url, init) {
    init = init || {};
    var u = new URL(url, ORIGIN);
    this.url = u.href;
    this.method = (init.method || 'GET').toUpperCase();
    this.headers = Headers2(Object.assign({}, BROWSER_HEADERS, init.headers || {}));
    this._body = init.body;
    this.nextUrl = u;
    this.cookies = {
      get: function (name) {
        return Object.prototype.hasOwnProperty.call(jar, name) ? { name: name, value: jar[name] } : undefined;
      },
      has: function (name) {
        return Object.prototype.hasOwnProperty.call(jar, name);
      },
      getAll: function () {
        return Object.keys(jar).map(function (k) {
          return { name: k, value: jar[k] };
        });
      },
    };
  }
  Req.prototype.text = function () {
    var b = this._body;
    return Promise.resolve(b === undefined ? '' : String(b));
  };
  Req.prototype.json = function () {
    var b = this._body;
    return Promise.resolve().then(function () {
      if (b === undefined || b === '') throw new SyntaxError('Unexpected end of JSON input');
      return typeof b === 'string' ? JSON.parse(b) : b;
    });
  };
  Req.prototype.formData = function () {
    return Promise.resolve(this._body);
  };

  // ── Special errors: notFound() and redirect() ───────────────────────────────

  function NotFound() {
    var e = new Error('NEXT_NOT_FOUND');
    e.__notFound = true;
    return e;
  }
  function Redirect(url) {
    var e = new Error('NEXT_REDIRECT');
    e.__redirect = String(url);
    return e;
  }
  function hookHint(e) {
    var m = /reading '(use\w*)'/.exec(String(e && e.message));
    if (m) return new Error(m[1] + ' only works in a Client Component. Add "use client" at the top of the file.');
    return e;
  }

  // ── The practice database (Prisma-style) ────────────────────────────────────

  var SEED = {
    dish: [
      { id: 1, name: 'Lemon Tea', price: 40, veg: true, category: 'Drinks' },
      { id: 2, name: 'Cold Coffee', price: 90, veg: true, category: 'Drinks' },
      { id: 3, name: 'Cheese Toast', price: 80, veg: true, category: 'Snacks' },
      { id: 4, name: 'Veg Sandwich', price: 90, veg: true, category: 'Snacks' },
      { id: 5, name: 'Chicken Sandwich', price: 150, veg: false, category: 'Snacks' },
    ],
    order: [],
    user: [
      { id: 1, email: 'rosa@rosascafe.example', name: 'Rosa', role: 'owner', passwordHash: 'hash:owner-pass' },
      { id: 2, email: 'sam@example.com', name: 'Sam', role: 'customer', passwordHash: 'hash:sam-pass' },
    ],
    session: [],
    student: [
      { id: 1, name: 'Ava Brooks', course: 'Class 10 Maths', fee: 1200 },
      { id: 2, name: 'Leo Martin', course: 'Class 12 Physics', fee: 1500 },
      { id: 3, name: 'Mia Chen', course: 'Class 10 Maths', fee: 1200 },
    ],
  };
  var tables = JSON.parse(JSON.stringify(SEED));
  var nextId = {};
  function matches(row, where) {
    return Object.keys(where || {}).every(function (k) {
      var want = where[k];
      var v = row[k];
      if (want !== null && typeof want === 'object') {
        if ('contains' in want && String(v).toLowerCase().indexOf(String(want.contains).toLowerCase()) < 0) return false;
        if ('gt' in want && !(v > want.gt)) return false;
        if ('gte' in want && !(v >= want.gte)) return false;
        if ('lt' in want && !(v < want.lt)) return false;
        if ('lte' in want && !(v <= want.lte)) return false;
        if ('in' in want && want.in.indexOf(v) < 0) return false;
        if ('not' in want && v === want.not) return false;
        return true;
      }
      return v === want;
    });
  }
  function model(name) {
    function rows() {
      return tables[name] || (tables[name] = []);
    }
    function copy(x) {
      return x ? JSON.parse(JSON.stringify(x)) : null;
    }
    function pick(row, select) {
      if (!row || !select) return copy(row);
      var out = {};
      Object.keys(select).forEach(function (k) {
        if (select[k]) out[k] = row[k];
      });
      return out;
    }
    function find(q) {
      q = q || {};
      var list = rows().filter(function (r) {
        return matches(r, q.where);
      });
      if (q.orderBy) {
        var key = Object.keys(q.orderBy)[0];
        var dir = q.orderBy[key] === 'desc' ? -1 : 1;
        list = list.slice().sort(function (a, b) {
          return a[key] < b[key] ? -dir : a[key] > b[key] ? dir : 0;
        });
      }
      if (q.skip) list = list.slice(q.skip);
      if (q.take !== undefined) list = list.slice(0, q.take);
      return list;
    }
    function later(v) {
      return wait(80).then(function () {
        return v;
      });
    }
    function missing() {
      return Promise.reject(new Error('No ' + name + ' record was found.'));
    }
    return {
      findMany: function (q) {
        return later(
          find(q).map(function (r) {
            return pick(r, q && q.select);
          }),
        );
      },
      findFirst: function (q) {
        return later(pick(find(q)[0], q && q.select) || null);
      },
      findUnique: function (q) {
        return later(pick(find({ where: q && q.where })[0], q && q.select) || null);
      },
      count: function (q) {
        return later(find(q).length);
      },
      create: function (q) {
        var list = rows();
        if (!nextId[name])
          nextId[name] =
            list.reduce(function (m, r) {
              return Math.max(m, r.id || 0);
            }, 0) + 1;
        var row = Object.assign({ id: nextId[name]++ }, q.data);
        list.push(row);
        return later(copy(row));
      },
      update: function (q) {
        var row = find({ where: q.where })[0];
        if (!row) return missing();
        Object.assign(row, q.data);
        return later(copy(row));
      },
      delete: function (q) {
        var list = rows();
        var row = find({ where: q.where })[0];
        if (!row) return missing();
        list.splice(list.indexOf(row), 1);
        return later(copy(row));
      },
      deleteMany: function (q) {
        var list = rows();
        var gone = find({ where: q && q.where });
        gone.forEach(function (r) {
          list.splice(list.indexOf(r), 1);
        });
        return later({ count: gone.length });
      },
    };
  }
  var db = new Proxy(
    {},
    {
      get: function (_, name) {
        return typeof name === 'string' ? model(name) : undefined;
      },
    },
  );

  // ── "use cache" ─────────────────────────────────────────────────────────────

  var cacheStore = {};
  var cacheTags = null;
  function cached(fn, key) {
    var wrapped = function () {
      var args = Array.prototype.slice.call(arguments);
      var k;
      try {
        k = key + ':' + JSON.stringify(args);
      } catch (e) {
        k = key;
      }
      if (cacheStore[k]) return cacheStore[k].value;
      var outer = cacheTags;
      cacheTags = [];
      var entry = { tags: cacheTags };
      try {
        entry.value = Promise.resolve(fn.apply(this, args));
      } finally {
        cacheTags = outer;
      }
      cacheStore[k] = entry;
      entry.value.catch(function () {
        delete cacheStore[k];
      });
      return entry.value;
    };
    wrapped.__cached = true;
    return wrapped;
  }
  var staticPages = {};
  function dropCache(tag) {
    staticPages = {};
    Object.keys(cacheStore).forEach(function (k) {
      if (tag === undefined || cacheStore[k].tags.indexOf(tag) >= 0) delete cacheStore[k];
    });
    dirty = true;
  }

  // ── Building and running the app ────────────────────────────────────────────

  window.__cyNext = function (files, startUrl, css) {
    var serverEnv = Object.assign({ NODE_ENV: 'development' }, parseEnv(files['.env']), parseEnv(files['.env.local']));
    var clientEnv = { NODE_ENV: 'development' };
    Object.keys(serverEnv).forEach(function (k) {
      if (k.indexOf('NEXT_PUBLIC_') === 0) clientEnv[k] = serverEnv[k];
    });
    var modules = {};
    var styleId = 0;

    function addStyle(text) {
      var el = document.createElement('style');
      el.textContent = text;
      el.setAttribute('data-cy', String(styleId++));
      document.head.appendChild(el);
    }

    // Server actions keep one wrapper each, so React sees the same function every draw.
    var actionWrappers = typeof WeakMap === 'function' ? new WeakMap() : null;
    function asAction(fn) {
      if (fn.__action) return fn;
      if (actionWrappers && actionWrappers.has(fn)) return actionWrappers.get(fn);
      var w = function () {
        var args = arguments;
        var before = phase;
        phase = 'action';
        log('POST ' + state.path + ' 200');
        return wait(300)
          .then(function () {
            return fn.apply(null, args);
          })
          .then(
            function (r) {
              phase = before;
              if (dirty) refresh();
              return r;
            },
            function (e) {
              phase = before;
              if (e && e.__redirect) {
                navigate(e.__redirect, { soft: true });
                return undefined;
              }
              if (e && e.__notFound) {
                refresh();
                return undefined;
              }
              log('⨯ Error: ' + (e && e.message));
              throw e;
            },
          );
      };
      w.__action = true;
      w.__server = true;
      if (actionWrappers) actionWrappers.set(fn, w);
      return w;
    }

    // Built-in modules. Client components get __client, so the server pass leaves them for React.
    function client(fn) {
      fn.__client = true;
      return fn;
    }
    var RouterCtx = React.createContext(null);
    function useRouterCtx() {
      var r = React.useContext(RouterCtx);
      if (!r) throw new Error('This hook only works inside the app.');
      return r;
    }
    function hook(name, f) {
      return function () {
        try {
          return f();
        } catch (e) {
          if (/reading 'use/.test(String(e && e.message))) throw new Error(name + ' only works in a Client Component. Add "use client" at the top of the file.');
          throw e;
        }
      };
    }
    var Link = client(function Link(props) {
      var router = useRouterCtx().router;
      var href = props.href;
      if (href && typeof href === 'object') {
        var q = href.query ? new URLSearchParams(href.query).toString() : '';
        href = (href.pathname || '/') + (q ? '?' + q : '');
      }
      var rest = Object.assign({}, props);
      ['href', 'replace', 'scroll', 'prefetch', 'children'].forEach(function (k) {
        delete rest[k];
      });
      rest.href = href;
      rest.onClick = function (e) {
        if (props.onClick) props.onClick(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        if (props.replace) router.replace(href);
        else router.push(href);
      };
      return h('a', rest, props.children);
    });
    function assetSrc(src) {
      if (src && typeof src === 'object') src = src.src;
      return String(src || '');
    }
    var Image = client(function Image(props) {
      var src = assetSrc(props.src);
      if (props.alt === undefined) throw new Error('Image with src "' + src + '" is missing the required "alt" property.');
      if (!props.fill && (props.width === undefined || props.height === undefined))
        throw new Error('Image with src "' + src + '" is missing the required "' + (props.width === undefined ? 'width' : 'height') + '" property.');
      var style = Object.assign({}, props.style, props.fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } : { maxWidth: '100%', height: 'auto' });
      return h('img', { src: src, alt: props.alt, width: props.width, height: props.height, className: props.className, style: style, loading: props.priority ? 'eager' : 'lazy', decoding: 'async' });
    });
    function font(name) {
      return function () {
        var family = String(name).replace(/_/g, ' ');
        return { className: 'font-' + family.toLowerCase().replace(/\s+/g, '-'), style: { fontFamily: "'" + family + "', system-ui, sans-serif" }, variable: '--font-' + family.toLowerCase().replace(/\s+/g, '-') };
      };
    }
    function dynamic(loader, opts) {
      opts = opts || {};
      var Lazy = React.lazy(function () {
        return loader().then(function (m) {
          return { default: m && m.default ? m.default : m };
        });
      });
      return client(function Dynamic(props) {
        return h(React.Suspense, { fallback: opts.loading ? h(opts.loading) : null }, h(Lazy, props));
      });
    }

    function builtin(name, mode) {
      switch (name) {
        case 'react':
          return React;
        case 'react-dom':
        case 'react-dom/client':
          return window.ReactDOM;
        case 'next/link':
          return { default: Link };
        case 'next/image':
          return { default: Image };
        case 'next/dynamic':
          return { default: dynamic };
        case 'next/font/google':
          return new Proxy(
            {},
            {
              get: function (_, k) {
                return typeof k === 'string' ? font(k) : undefined;
              },
            },
          );
        case 'next/font/local':
          return {
            default: function (o) {
              return font((o && o.variable) || 'Local')();
            },
          };
        case 'next/navigation':
          return {
            useRouter: hook('useRouter', function () {
              return useRouterCtx().router;
            }),
            usePathname: hook('usePathname', function () {
              return useRouterCtx().path;
            }),
            useSearchParams: hook('useSearchParams', function () {
              return new URLSearchParams(useRouterCtx().search);
            }),
            useParams: hook('useParams', function () {
              return useRouterCtx().params;
            }),
            redirect: function (url) {
              throw Redirect(url);
            },
            permanentRedirect: function (url) {
              throw Redirect(url);
            },
            notFound: function () {
              throw NotFound();
            },
          };
        case 'next/headers':
          return {
            cookies: function () {
              markDynamic();
              return Promise.resolve(cookieStore());
            },
            headers: function () {
              markDynamic();
              return Promise.resolve(Headers2(BROWSER_HEADERS));
            },
          };
        case 'next/cache':
          return {
            revalidatePath: function () {
              dropCache();
            },
            revalidateTag: function (tag) {
              dropCache(tag);
            },
            updateTag: function (tag) {
              dropCache(tag);
            },
            refresh: function () {
              dirty = true;
            },
            cacheTag: function () {
              if (cacheTags) cacheTags.push.apply(cacheTags, arguments);
            },
            cacheLife: function () {},
          };
        case 'next/server':
          return {
            NextResponse: NextResponse,
            NextRequest: Req,
            connection: function () {
              markDynamic();
              return Promise.resolve();
            },
          };
        case 'server-only':
          if (mode === 'client') throw new Error('This module can only be used on the server ("server-only"), but a Client Component imports it.');
          return {};
        case 'client-only':
          if (mode === 'server') throw new Error('This module can only be used in a Client Component ("client-only").');
          return {};
      }
      return null;
    }

    function resolve(from, spec) {
      var path;
      if (spec.indexOf('@/') === 0) path = spec.slice(2);
      else if (spec[0] === '.') {
        var parts = from.split('/').slice(0, -1);
        spec.split('/').forEach(function (p) {
          if (p === '..') parts.pop();
          else if (p !== '.') parts.push(p);
        });
        path = parts.join('/');
      } else return null;
      var tries = [path, path + '.js', path + '.jsx', path + '/index.js'];
      for (var i = 0; i < tries.length; i++) if (Object.prototype.hasOwnProperty.call(files, tries[i])) return tries[i];
      if (path === 'lib/db' || path === 'lib/db.js') return '#db';
      return path;
    }

    function cssModule(path, text) {
      var base = path.split('/').pop().replace(/\.module\.css$/, '');
      var map = {};
      var out = String(text).replace(/\.(-?[_a-zA-Z][\w-]*)(?=[^{}]*\{)/g, function (_, n) {
        map[n] = base + '_' + n + '__cy';
        return '.' + map[n];
      });
      addStyle(out);
      return { default: map };
    }

    function load(path, mode, from) {
      if (path === '#db') {
        if (mode === 'client') throw new Error('The database can only be used on the server, but a Client Component imports @/lib/db.');
        return { db: db, default: db };
      }
      if (!Object.prototype.hasOwnProperty.call(files, path)) throw new Error("Module not found: Can't resolve '" + path + "'" + (from ? ' in ' + from : ''));
      var src = files[path];
      var dir = firstDirective(src);
      // A "use client" file is always a client module; a "use server" file always runs on the server.
      if (dir === 'use client') mode = 'client';
      if (dir === 'use server') mode = 'server';
      var key = mode + ':' + path;
      if (modules[key]) return modules[key].exports;
      if (/\.css$/.test(path)) {
        var m = { exports: /\.module\.css$/.test(path) ? cssModule(path, src) : (addStyle(src), {}) };
        modules[key] = m;
        return m.exports;
      }
      var exports = {};
      modules[key] = { exports: exports };
      var code = compile(path, src);
      var req = function (spec) {
        var b = builtin(spec, mode);
        if (b) return b;
        var to = resolve(path, spec);
        if (to === null) throw new Error("Module not found: Can't resolve '" + spec + "' in " + path);
        return load(to, mode, path);
      };
      var imp = function (spec) {
        return wait(500).then(function () {
          return req(spec);
        });
      };
      var proc = { env: mode === 'client' ? Object.assign({}, clientEnv) : Object.assign({}, serverEnv) };
      code(exports, req, imp, proc, Res, Req, NextResponse, cached, client);
      Object.keys(exports).forEach(function (k) {
        var v = exports[k];
        if (typeof v !== 'function') return;
        if (dir === 'use server') exports[k] = asAction(v);
        else if (mode === 'client') v.__client = true;
      });
      return exports;
    }

    function compile(path, src) {
      var names = [];
      var body = String(src)
        .replace(/^\s*import\s+(?:([\w$]+)\s*,?\s*)?(?:\{([^}]*)\}|\*\s*as\s+([\w$]+))?\s*from\s*["']([^"']+)["'];?/gm, function (_, def, named, ns, spec) {
          var out = 'var __m' + names.length + ' = __require(' + JSON.stringify(spec) + ');';
          var m = '__m' + names.length;
          names.push(null);
          if (def) out += ' var ' + def + ' = ' + m + ' && ' + m + '.default !== undefined ? ' + m + '.default : ' + m + ';';
          if (ns) out += ' var ' + ns + ' = ' + m + ';';
          if (named)
            named
              .split(',')
              .map(function (s) {
                return s.trim();
              })
              .filter(Boolean)
              .forEach(function (s) {
                var p = s.split(/\s+as\s+/);
                out += ' var ' + (p[1] || p[0]) + ' = ' + m + '.' + p[0] + ';';
              });
          return out;
        })
        .replace(/^\s*import\s+["']([^"']+)["'];?/gm, function (_, spec) {
          return '__require(' + JSON.stringify(spec) + ');';
        })
        .replace(/\bimport\(/g, '__import(');
      var exported = [];
      body = body
        .replace(/^export\s+default\s+(async\s+)?function\s+([\w$]+)/gm, function (_, a, n) {
          exported.push(['default', n]);
          return (a || '') + 'function ' + n;
        })
        .replace(/^export\s+default\s+/gm, 'exports.default = ')
        .replace(/^export\s+(async\s+)?function\s+([\w$]+)/gm, function (_, a, n) {
          exported.push([n, n]);
          return (a || '') + 'function ' + n;
        })
        .replace(/^export\s+(const|let|var)\s+([\w$]+)/gm, function (_, k, n) {
          exported.push([n, n]);
          return k + ' ' + n;
        })
        .replace(/^export\s*\{([^}]*)\};?/gm, function (_, list) {
          list.split(',').forEach(function (s) {
            var p = s.trim().split(/\s+as\s+/);
            if (p[0]) exported.push([p[1] || p[0], p[0]]);
          });
          return '';
        });
      // Functions that start with "use cache" (or every exported function in a "use cache" file) are cached.
      var fileCache = firstDirective(src) === 'use cache';
      var wraps = '';
      body.replace(/(?:async\s+)?function\s+([\w$]+)\s*\([^)]*\)\s*\{\s*(["'])use cache\2/g, function (_, n) {
        wraps += '\n' + n + ' = __cached(' + n + ', ' + JSON.stringify(path + '#' + n) + ');';
        return _;
      });
      if (fileCache)
        exported.forEach(function (e) {
          wraps += '\nif (typeof ' + e[1] + ' === "function") ' + e[1] + ' = __cached(' + e[1] + ', ' + JSON.stringify(path + '#' + e[1]) + ');';
        });
      var tail =
        wraps +
        '\n' +
        exported
          .map(function (e) {
            return 'exports[' + JSON.stringify(e[0]) + '] = ' + e[1] + ';';
          })
          .join('\n');
      var js;
      try {
        js = window.__cyJsx(body + tail);
      } catch (e) {
        throw new Error(path + ': ' + e.message);
      }
      try {
        return new Function('exports', '__require', '__import', 'process', 'Response', 'Request', 'NextResponse', '__cached', '__client', js);
      } catch (e) {
        throw new Error(path + ': ' + e.message);
      }
    }

    // ── Routes: the app/ folder as a tree ──
    function node(name) {
      return { name: name, kids: {}, files: {} };
    }
    var root = node('app');
    Object.keys(files).forEach(function (p) {
      var m = /^(?:src\/)?app\/(.*)$/.exec(p);
      if (!m) return;
      var parts = m[1].split('/');
      var file = parts.pop();
      var fm = /^(page|layout|loading|error|not-found|default|route)\.(js|jsx|ts|tsx)$/.exec(file);
      var n = root;
      parts.forEach(function (seg) {
        n = n.kids[seg] || (n.kids[seg] = node(seg));
      });
      if (fm) n.files[fm[1]] = p;
      else if (/\.(js|jsx)$/.test(file) && /^(sitemap|robots)$/.test(file.replace(/\.\w+$/, ''))) n.files[file.replace(/\.\w+$/, '')] = p;
    });
    var proxyFile = files['proxy.js'] !== undefined ? 'proxy.js' : files['src/proxy.js'] !== undefined ? 'src/proxy.js' : null;

    function kind(name) {
      if (name[0] === '@') return 'slot';
      if (name[0] === '_') return 'private';
      if (/^\(\.+\)/.test(name)) return 'intercept';
      if (/^\(.*\)$/.test(name)) return 'group';
      if (/^\[\[\.\.\.(.+)\]\]$/.test(name)) return 'optional';
      if (/^\[\.\.\.(.+)\]$/.test(name)) return 'catchall';
      if (/^\[(.+)\]$/.test(name)) return 'dynamic';
      return 'static';
    }
    function paramName(name) {
      return name.replace(/^\[+(\.\.\.)?/, '').replace(/\]+$/, '');
    }
    // A match is the list of folders from app/ down to the page, with the URL params.
    function match(n, segs, i, params, intercept, want) {
      var here = [{ node: n, at: i }];
      if (i === segs.length && n.files[want]) return { chain: here, params: params };
      var names = Object.keys(n.kids);
      var order = ['static', 'group', 'dynamic', 'catchall', 'optional'];
      for (var o = 0; o < order.length; o++) {
        for (var k = 0; k < names.length; k++) {
          var name = names[k];
          var kid = n.kids[name];
          var t = kind(name);
          if (t === 'intercept' && intercept && order[o] === 'static' && i < segs.length && name.replace(/^\(\.+\)/, '') === segs[i]) t = 'static-ok';
          if (order[o] === 'static' && (t === 'static' || t === 'static-ok') && i < segs.length && (t === 'static-ok' || name === segs[i])) {
            var r = match(kid, segs, i + 1, params, intercept, want);
            if (r) return { chain: here.concat(r.chain), params: r.params };
          } else if (order[o] === 'group' && t === 'group') {
            var g = match(kid, segs, i, params, intercept, want);
            if (g) return { chain: here.concat(g.chain), params: g.params };
          } else if (order[o] === 'dynamic' && t === 'dynamic' && i < segs.length) {
            var p = Object.assign({}, params);
            p[paramName(name)] = decodeURIComponent(segs[i]);
            var d = match(kid, segs, i + 1, p, intercept, want);
            if (d) return { chain: here.concat(d.chain), params: d.params };
          } else if ((order[o] === 'catchall' && t === 'catchall' && i < segs.length) || (order[o] === 'optional' && t === 'optional')) {
            var rest = segs.slice(i).map(decodeURIComponent);
            if (!kid.files[want]) continue;
            var pc = Object.assign({}, params);
            if (rest.length) pc[paramName(name)] = rest;
            return { chain: here.concat([{ node: kid, at: segs.length }]), params: pc };
          }
        }
      }
      return null;
    }

    // Does a slot of the current page have an intercepting route, like @modal/(.)dish/[id], for this address?
    function intercepted(m, segs) {
      return m.chain.some(function (c) {
        return Object.keys(c.node.kids).some(function (name) {
          if (kind(name) !== 'slot') return false;
          var sm = match(c.node.kids[name], segs, c.at, {}, true, 'page');
          return (
            !!sm &&
            sm.chain.some(function (x) {
              return kind(x.node.name) === 'intercept';
            })
          );
        });
      });
    }

    function exportsOf(path) {
      return load(path, 'server');
    }
    function component(path, label) {
      var ex = exportsOf(path);
      var C = ex.default;
      if (typeof C !== 'function') throw new Error('The default export is not a React Component in "' + path + '".' + (label ? ' ' + label : ''));
      return C;
    }

    // Boundaries the server pass understands.
    function ErrorMark() {}
    function NotFoundMark() {}
    var ErrorBoundary = client(
      (function () {
        function EB(props) {
          React.Component.call(this, props);
          this.state = { error: props.error || null };
        }
        EB.prototype = Object.create(React.Component.prototype);
        EB.getDerivedStateFromError = function (error) {
          return { error: error };
        };
        EB.prototype.componentDidCatch = function (error) {
          if (error && (error.__notFound || error.__redirect)) return;
          log('⨯ Error: ' + error.message);
        };
        EB.prototype.render = function () {
          var self = this;
          var e = this.state.error;
          if (e && e.__redirect) {
            setTimeout(function () {
              navigate(e.__redirect, { soft: true, replace: true });
            });
            return null;
          }
          if (!e) return this.props.children;
          return h(this.props.fallback, {
            error: e,
            reset: function () {
              self.setState({ error: null });
              refresh();
            },
          });
        };
        return EB;
      })(),
    );
    function Await(props) {
      return React.use(props.p);
    }

    // ── The server pass: runs Server Components (they may be async) and leaves Client Components for React ──
    function serverPass(x, ctx) {
      if (x === null || x === undefined || typeof x === 'boolean' || typeof x === 'string' || typeof x === 'number') return Promise.resolve(x);
      if (Array.isArray(x))
        return Promise.all(
          x.map(function (y) {
            return serverPass(y, ctx);
          }),
        );
      if (isThenable(x))
        return Promise.resolve(x).then(function (y) {
          return serverPass(y, ctx);
        });
      if (!isElement(x)) return Promise.resolve(x);
      var type = x.type;
      var props = x.props;
      var key = x.key;
      if (type === ErrorMark) {
        return serverPass(props.children, ctx).then(
          function (kids) {
            return h(ErrorBoundary, { key: key, fallback: props.fallback }, kids);
          },
          function (e) {
            if (e && (e.__notFound || e.__redirect)) throw e;
            e = hookHint(e);
            // A page that broke is never kept as a static page.
            ctx.dynamic = true;
            log('⨯ Error: ' + e.message);
            return h(ErrorBoundary, { key: key, fallback: props.fallback, error: e });
          },
        );
      }
      if (type === NotFoundMark) {
        return serverPass(props.children, ctx).catch(function (e) {
          if (!(e && e.__notFound)) throw e;
          ctx.status = 404;
          return serverPass(h(props.fallback), ctx);
        });
      }
      if (type === React.Suspense) {
        return serverPass(props.fallback, ctx).then(function (fallback) {
          var p = serverPass(props.children, ctx);
          p.catch(function () {});
          return h(React.Suspense, { key: key, fallback: fallback }, h(Await, { p: p }));
        });
      }
      if (typeof type === 'string' || typeof type === 'symbol' || (type && typeof type === 'object') || (typeof type === 'function' && type.__client)) {
        var isHost = typeof type === 'string';
        var names = Object.keys(props);
        return Promise.all(
          names.map(function (k) {
            var v = props[k];
            if (typeof v === 'function') {
              if (v.__action || v.__server || directiveOf(v) === 'use server') return asAction(v);
              if (isHost && /^on[A-Z]/.test(k)) throw new Error('Event handlers like ' + k + ' can’t be used in a Server Component. Move this part into a Client Component: add "use client" at the top of its file.');
              if (!isHost && typeof type === 'function' && type.__client && type !== ErrorBoundary && !/^(fallback|loading)$/.test(k))
                throw new Error('Functions can’t be passed to a Client Component (' + k + ' on <' + (type.name || 'Component') + '>) unless they are Server Actions with "use server".');
              return v;
            }
            return k === 'children' || isElement(v) || Array.isArray(v) || (isHost && isThenable(v)) ? serverPass(v, ctx) : v;
          }),
        ).then(function (vals) {
          var p = { key: key };
          names.forEach(function (k, i) {
            p[k] = vals[i];
          });
          // A root layout’s <html> and <body> become boxes inside the preview.
          var t = type === 'html' ? 'div' : type === 'body' ? 'div' : type === 'head' ? React.Fragment : type;
          if (type === 'html') p.className = 'cy-html' + (p.className ? ' ' + p.className : '');
          if (type === 'body') p.className = 'cy-body' + (p.className ? ' ' + p.className : '');
          if (type === 'html' || type === 'head') delete p.lang;
          if (t === React.Fragment) p = { key: key, children: p.children };
          if (type === 'head') return null;
          return h(t, p);
        });
      }
      if (typeof type === 'function') {
        var out;
        try {
          out = type(props);
        } catch (e) {
          return Promise.reject(hookHint(e));
        }
        return Promise.resolve(out).then(
          function (y) {
            return serverPass(y, ctx);
          },
          function (e) {
            throw hookHint(e);
          },
        );
      }
      return Promise.resolve(x);
    }

    // ── Pages: wrap the page in its layouts and boundaries, like Next.js does ──
    function build(m, slotSegs, intercept, searchObj) {
      // Reading searchParams makes the page dynamic: it differs per visit.
      var sp = {
        then: function (ok, fail) {
          markDynamic();
          return Promise.resolve(searchObj).then(ok, fail);
        },
      };
      function level(k, chain, want, params) {
        var pp = Promise.resolve(params);
        var n = chain[k].node;
        var inner;
        if (k === chain.length - 1) {
          var Page = component(n.files[want], '');
          inner = h(Page, { params: pp, searchParams: sp });
        } else inner = level(k + 1, chain, want, params);
        if (n.files['not-found']) inner = h(NotFoundMark, { fallback: component(n.files['not-found']) }, inner);
        if (n.files.loading) inner = h(React.Suspense, { fallback: h(component(n.files.loading)) }, inner);
        if (n.files.error) {
          if (firstDirective(files[n.files.error]) !== 'use client') throw new Error(n.files.error + ' must be a Client Component: add "use client" at the top.');
          inner = h(ErrorMark, { fallback: component(n.files.error) }, inner);
        }
        if (n.files.layout) {
          var lp = { params: pp, children: inner };
          Object.keys(n.kids).forEach(function (name) {
            if (kind(name) !== 'slot') return;
            var slot = n.kids[name];
            // A slot follows the address being opened (for an intercepted move, the new one).
            var sm = match(slot, slotSegs, chain[k].at, intercept ? {} : params, intercept, 'page');
            lp[name.slice(1)] = sm ? level(0, sm.chain, 'page', sm.params) : slot.files['default'] ? h(component(slot.files['default'])) : null;
          });
          inner = h(component(n.files.layout), lp, inner);
        }
        return inner;
      }
      return level(0, m.chain, 'page', m.params);
    }

    function metadataFor(m, searchObj) {
      var title = '';
      var template = '';
      var desc = '';
      var pp = Promise.resolve(m.params);
      return m.chain
        .reduce(
          function (p, c) {
            return p.then(function () {
              var paths = [c.node.files.layout, c === m.chain[m.chain.length - 1] ? c.node.files.page : null].filter(Boolean);
              return paths.reduce(function (q, path) {
                return q.then(function () {
                  var ex = exportsOf(path);
                  var md = ex.generateMetadata ? ex.generateMetadata({ params: pp, searchParams: Promise.resolve(searchObj) }) : ex.metadata;
                  return Promise.resolve(md).then(function (md) {
                    if (!md) return;
                    var t = md.title;
                    if (t && typeof t === 'object') {
                      if (t.absolute) title = t.absolute;
                      else if (t.default) title = t.default;
                      if (t.template) template = t.template;
                    } else if (typeof t === 'string') title = path === c.node.files.layout ? t : template ? template.replace('%s', t) : t;
                    if (md.description) desc = md.description;
                  });
                });
              }, Promise.resolve());
            });
          },
          Promise.resolve(),
        )
        .then(function () {
          return { title: title, description: desc };
        });
    }

    // ── The browser around the app: address bar, back, reload, the tab title, and a list of files ──
    var bar = document.createElement('div');
    bar.id = 'cy-chrome';
    bar.innerHTML =
      '<div id="cy-tab" data-title=""></div><form id="cy-go"><button type="button" id="cy-back" aria-label="Back"></button><button type="button" id="cy-reload" aria-label="Reload"></button><input id="cy-url" aria-label="Address" autocomplete="off" autocapitalize="off" spellcheck="false"><button type="submit" id="cy-enter" aria-label="Go"></button><button type="button" id="cy-files" aria-label="Files"></button></form><div id="cy-filelist" hidden></div>';
    addStyle(
      "#cy-chrome{position:sticky;top:0;z-index:50;background:#EEF0F7;border-bottom:1px solid #D3D7E6;margin:-12px -12px 10px;padding:6px 8px;font:13px system-ui,sans-serif}#cy-tab::before{content:attr(data-title);display:inline-block;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;background:#fff;border-radius:8px 8px 0 0;padding:2px 10px;font-size:12px;color:#16142B}#cy-go{display:flex;gap:4px;align-items:center}#cy-go button{border:0;background:#fff;border-radius:8px;width:30px;height:30px;padding:0;margin:0;color:#16142B;font-size:15px}#cy-back::before{content:'\\2190'}#cy-reload::before{content:'\\21BB'}#cy-enter::before{content:'\\2192'}#cy-files::before{content:'\\2630'}#cy-url{flex:1;min-width:0;border:1px solid #D3D7E6;border-radius:15px;padding:5px 10px;font:13px ui-monospace,monospace;margin:0;background:#fff}#cy-filelist{background:#fff;border:1px solid #D3D7E6;border-radius:8px;margin-top:6px;padding:4px 8px;font:12px ui-monospace,monospace}#cy-filelist a{display:block;padding:3px 0;color:#4B3FD8;text-decoration:none}.cy-html,.cy-body{display:block}.cy-overlay{border:2px solid #B91C1C;border-radius:10px;background:#FEF2F2;color:#7F1D1D;padding:10px 12px}.cy-overlay h3{margin:0 0 6px;font-size:15px}.cy-json{background:#F6F7FB;border-radius:8px;padding:8px;font:12px ui-monospace,monospace;white-space:pre-wrap;margin:0}" +
        (css || ''),
    );
    var app = document.getElementById('root') || document.body.appendChild(document.createElement('div'));
    app.id = 'root';
    app.parentNode.insertBefore(bar, app);
    var urlBox = document.getElementById('cy-url');
    var tab = document.getElementById('cy-tab');
    var list = document.getElementById('cy-filelist');
    var listHtml = Object.keys(files)
      .filter(function (p) {
        return /^(src\/)?app\/.*\/?(page|route)\.(js|jsx)$/.test(p);
      })
      .map(function (p) {
        var url =
          '/' +
          p
            .replace(/^(src\/)?app\/?/, '')
            .split('/')
            .slice(0, -1)
            .filter(function (s) {
              return !/^(\(.*\)|@.*)$/.test(s);
            })
            .join('/');
        return '<a href="' + url + '" data-url="' + url + '">' + p + ' → ' + url + '</a>';
      })
      .join('');

    var rootR = window.ReactDOM.createRoot(app, {
      onUncaughtError: function (e) {
        if (e && (e.__redirect || e.__notFound)) return;
        showOverlay(hookHint(e));
      },
    });
    var state = { path: '/', search: '', params: {}, tree: null, history: [], hard: 0 };
    var busy = 0;

    function showOverlay(e) {
      rootR.render(h('div', { className: 'cy-overlay' }, h('h3', null, 'Unhandled Runtime Error'), h('p', null, 'Error: ' + e.message)));
      if (window.onerror) window.onerror(e.message);
    }

    function split(url) {
      var u = new URL(url, ORIGIN + state.path);
      var path = u.pathname.replace(/\/+$/, '') || '/';
      var search = u.search;
      var obj = {};
      u.searchParams.forEach(function (v, k) {
        if (obj[k] === undefined) obj[k] = v;
        else obj[k] = [].concat(obj[k], v);
      });
      return { path: path, search: search, obj: obj, segs: path.split('/').filter(Boolean) };
    }

    function runProxy(u, method) {
      if (!proxyFile) return Promise.resolve(null);
      var ex = load(proxyFile, 'server');
      var fn = ex.proxy || ex.default;
      if (typeof fn !== 'function') return Promise.resolve(null);
      var matcher = ex.config && ex.config.matcher;
      if (matcher) {
        var ok = [].concat(matcher).some(function (pat) {
          pat = typeof pat === 'object' ? pat.source : pat;
          var re = '^' + String(pat).replace(/:\w+\*/g, '.*').replace(/:\w+/g, '[^/]+') + '$';
          var plain = re.replace(/\/\.\*\$$/, '(/.*)?$');
          return new RegExp(plain).test(u.path);
        });
        if (!ok) return Promise.resolve(null);
      }
      var before = phase;
      phase = 'proxy';
      return Promise.resolve()
        .then(function () {
          return fn(new Req(u.path + u.search, { method: method || 'GET' }));
        })
        .then(
          function (r) {
            phase = before;
            return r || null;
          },
          function (e) {
            phase = before;
            throw e;
          },
        );
    }

    function callRoute(u, init) {
      var m = match(root, u.segs, 0, {}, false, 'route');
      if (!m) return Promise.resolve(null);
      var n = m.chain[m.chain.length - 1].node;
      var ex = exportsOf(n.files.route);
      var method = ((init && init.method) || 'GET').toUpperCase();
      var fn = ex[method];
      var before = phase;
      if (typeof fn !== 'function') {
        log(method + ' ' + u.path + u.search + ' 405');
        return Promise.resolve(new Res('', { status: 405 }));
      }
      phase = 'route';
      return wait(200)
        .then(function () {
          return fn(new Req(u.path + u.search, init), { params: Promise.resolve(m.params) });
        })
        .then(
          function (r) {
            phase = before;
            r = r instanceof Res ? r : new Res(r === undefined ? '' : String(r));
            log(method + ' ' + u.path + u.search + ' ' + r.status);
            return r;
          },
          function (e) {
            phase = before;
            if (e && e.__notFound) {
              log(method + ' ' + u.path + u.search + ' 404');
              return new Res('', { status: 404 });
            }
            log('⨯ Error: ' + (e && e.message));
            log(method + ' ' + u.path + u.search + ' 500');
            return new Res('Internal Server Error', { status: 500 });
          },
        );
    }

    // fetch(): this app’s Route Handlers first, then the practice server (any other address ending in /api/…).
    var pageFetch = window.fetch;
    window.fetch = function (input, init) {
      var raw = String(input && input.url ? input.url : input);
      if (init && init.cache === 'no-store') markDynamic();
      var abs = /^https?:\/\//.test(raw);
      var u;
      try {
        u = new URL(raw, ORIGIN);
      } catch (e) {
        return pageFetch.apply(window, arguments);
      }
      if (abs && u.origin !== ORIGIN) return pageFetch(u.pathname + u.search, init);
      var s = split(u.pathname + u.search);
      return runProxy(s, init && init.method).then(function (pr) {
        if (pr && pr.__redirect) return new Res('', { status: 307 });
        return callRoute(s, init || {}).then(function (r) {
          return r || pageFetch(s.path + s.search, init);
        });
      });
    };

    function routerApi() {
      return {
        push: function (url) {
          navigate(url, { soft: true });
        },
        replace: function (url) {
          navigate(url, { soft: true, replace: true });
        },
        back: function () {
          back();
        },
        forward: function () {},
        refresh: function () {
          refresh();
        },
        prefetch: function () {},
      };
    }
    var router = routerApi();

    function draw(tree, u, params) {
      rootR.render(h(RouterCtx.Provider, { value: { router: router, path: u.path, search: u.search, params: params } }, h(React.Fragment, { key: 'hard' + state.hard }, tree)));
    }

    function render(u, opts, hops) {
      opts = opts || {};
      hops = hops || 0;
      if (hops > 5) return Promise.reject(new Error('Too many redirects.'));
      dirty = false;
      return runProxy(u)
        .then(function (pr) {
          if (pr && pr.__redirect) {
            log('GET ' + u.path + ' 307');
            return render(split(pr.__redirect), { soft: opts.soft, replace: true }, hops + 1);
          }
          var view = pr && pr.__rewrite ? split(pr.__rewrite) : u;
          var special = { '/sitemap.xml': 'sitemap', '/robots.txt': 'robots' }[view.path];
          if (special && root.files[special]) {
            return Promise.resolve(exportsOf(root.files[special]).default()).then(function (data) {
              log('GET ' + u.path + ' 200');
              return { tree: h('pre', { className: 'cy-json' }, special === 'sitemap' ? sitemapXml(data) : robotsTxt(data)), u: u, params: {}, title: u.path, status: null };
            });
          }
          // An address of a Route Handler shows what it sends back, like a browser does.
          var api = match(root, view.segs, 0, {}, false, 'route');
          var page = match(root, view.segs, 0, {}, false, 'page');
          if (api && !page) {
            return callRoute(view, { method: 'GET' })
              .then(function (r) {
                return r.text().then(function (t) {
                  var pretty = t;
                  try {
                    pretty = JSON.stringify(JSON.parse(t), null, 2);
                  } catch (e) {}
                  return h('pre', { className: 'cy-json' }, pretty);
                });
              })
              .then(function (tree) {
                return { tree: tree, u: u, params: {}, title: u.path, status: null };
              });
          }
          var ctx = { status: 200 };
          var tree;
          var slotSegs = view.segs;
          var m = page;
          // A soft move to an intercepted address keeps the page behind and shows the intercepting one in its slot.
          if (opts.soft && state.tree) {
            if (state.match && intercepted(state.match, view.segs)) {
              m = state.match;
              tree = build(m, view.segs, true, state.searchObj);
            }
          }
          if (!m) {
            ctx.status = 404;
            var nf = root.files['not-found'];
            var body = nf ? h(component(nf)) : h('div', null, h('h2', null, '404'), h('p', null, 'This page could not be found.'));
            tree = root.files.layout ? h(component(root.files.layout), { params: Promise.resolve({}), children: body }) : body;
            return serverPass(tree, ctx).then(function (t) {
              return { tree: t, u: u, params: {}, title: '404: This page could not be found.', status: 404, match: null };
            });
          }
          var last = m.chain[m.chain.length - 1].node;
          var pageEx = exportsOf(last.files.page);
          var check =
            pageEx.dynamicParams === false && pageEx.generateStaticParams
              ? Promise.resolve(pageEx.generateStaticParams()).then(function (list) {
                  var ok = (list || []).some(function (p) {
                    return Object.keys(p).every(function (k) {
                      return String(p[k]) === String(m.params[k]);
                    });
                  });
                  if (!ok) throw NotFound();
                })
              : Promise.resolve();
          // A static page made before is reused as it is: its Server Components don’t run again.
          var reuse = !tree && staticPages[view.path];
          if (reuse) return Promise.resolve(Object.assign({}, reuse, { u: u }));
          var keep = !tree && pageEx.dynamic !== 'force-dynamic' && pageEx.revalidate !== 0;
          if (!tree) tree = build(m, slotSegs, false, view.obj);
          ctx.dynamic = !keep;
          drawing = ctx;
          return check
            .then(function () {
              return serverPass(tree, ctx);
            })
            .then(function (t) {
              return metadataFor(m, view.obj).then(function (md) {
                var r = { tree: t, u: u, params: m.params, title: md.title, status: ctx.status, match: m, searchObj: view.obj };
                if (!ctx.dynamic && ctx.status === 200) staticPages[view.path] = r;
                return r;
              });
            })
            .catch(function (e) {
              if (e && e.__redirect) {
                log('GET ' + u.path + ' 307');
                return render(split(e.__redirect), { soft: opts.soft, replace: true }, hops + 1);
              }
              if (e && e.__notFound) {
                var nf2 = root.files['not-found'];
                var b2 = nf2 ? h(component(nf2)) : h('div', null, h('h2', null, '404'), h('p', null, 'This page could not be found.'));
                var t2 = root.files.layout ? h(component(root.files.layout), { params: Promise.resolve({}), children: b2 }) : b2;
                return serverPass(t2, { status: 404 }).then(function (t) {
                  return { tree: t, u: u, params: {}, title: '404: This page could not be found.', status: 404, match: null };
                });
              }
              throw e;
            });
        });
    }

    function sitemapXml(list) {
      return ['<urlset>']
        .concat(
          (list || []).map(function (e) {
            return '  <url><loc>' + e.url + '</loc>' + (e.lastModified ? '<lastmod>' + e.lastModified + '</lastmod>' : '') + '</url>';
          }),
        )
        .concat(['</urlset>'])
        .join('\n');
    }
    function robotsTxt(r) {
      var out = [];
      [].concat((r && r.rules) || []).forEach(function (rule) {
        out.push('User-Agent: ' + (rule.userAgent || '*'));
        [].concat(rule.allow || []).forEach(function (a) {
          out.push('Allow: ' + a);
        });
        [].concat(rule.disallow || []).forEach(function (d) {
          out.push('Disallow: ' + d);
        });
      });
      if (r && r.sitemap) out.push('', 'Sitemap: ' + r.sitemap);
      return out.join('\n');
    }

    function show(r, opts) {
      if (!r.u) return;
      if (r.status) log('GET ' + r.u.path + r.u.search + ' ' + r.status);
      if (!opts.replace && state.path && state.tree) state.history.push(state.path + state.search);
      state.path = r.u.path;
      state.search = r.u.search;
      state.params = r.params;
      state.tree = r.tree;
      state.match = r.match;
      state.searchObj = r.searchObj;
      urlBox.value = r.u.path + r.u.search;
      tab.setAttribute('data-title', r.title || r.u.path);
      document.title = r.title || r.u.path;
      draw(r.tree, r.u, r.params);
    }

    function navigate(url, opts) {
      opts = opts || {};
      var u = split(url);
      if (!opts.soft) state.hard++;
      var ticket = ++busy;
      return render(u, opts)
        .then(function (r) {
          if (ticket !== busy) return;
          show(r, opts);
        })
        .catch(function (e) {
          showOverlay(hookHint(e));
        });
    }
    function refresh() {
      return navigate(state.path + state.search, { soft: true, replace: true });
    }
    function back() {
      var prev = state.history.pop();
      if (prev !== undefined) navigate(prev, { soft: true, replace: true });
    }

    document.getElementById('cy-go').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = urlBox.value.trim() || '/';
      navigate(v[0] === '/' ? v : '/' + v, {});
    });
    document.getElementById('cy-back').addEventListener('click', back);
    document.getElementById('cy-reload').addEventListener('click', function () {
      navigate(state.path + state.search, { replace: true });
    });
    // The list of files is only on the page while it is open.
    document.getElementById('cy-files').addEventListener('click', function () {
      list.hidden = !list.hidden;
      list.innerHTML = list.hidden ? '' : listHtml;
    });
    list.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-url]');
      if (!a) return;
      e.preventDefault();
      list.hidden = true;
      list.innerHTML = '';
      if (a.getAttribute('data-url').indexOf('[') < 0) navigate(a.getAttribute('data-url'), {});
    });

    navigate(startUrl || '/', {});
  };
})();
