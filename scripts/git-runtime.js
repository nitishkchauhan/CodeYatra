// A small teaching copy of Git, for lesson pages: a terminal where learners type (or tap) Git commands, offline.
//
// It keeps a working folder, the staging area (index), commits, branches, tags, a stash and a pretend remote
// (origin, on GitHub), and answers the everyday commands the lessons teach, with output modelled on Git 2.4x:
// init, config, status (and -s), add, restore, rm, commit (-m, -am, --amend), log (--oneline, --graph, --all),
// diff (--staged), show, branch, switch, checkout, merge (fast-forward, merge commits and conflicts), stash, tag,
// revert, reset (--soft, --mixed, --hard), remote, push, pull, fetch, clone; plus the shell commands ls, cat,
// echo > and >>, touch and rm. Commit ids are short, made-up and stable, so lessons always show the same ones.
//
// It is not Git: there is no real disk or network, and rarely used options aren’t there. Lessons say so.
// Built into src/lib/web/gitRuntime.ts by scripts/build-react-runtime.mjs.
(function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }
  // A stable 7-character id from text, like a short commit hash.
  function hash(text) {
    var h1 = 0x811c9dc5;
    var h2 = 0x1234567;
    for (var i = 0; i < text.length; i++) {
      h1 = Math.imul(h1 ^ text.charCodeAt(i), 16777619) >>> 0;
      h2 = Math.imul(h2 ^ text.charCodeAt(i), 2246822519) >>> 0;
    }
    return ((h1.toString(16) + h2.toString(16)).replace(/^0+/, '') + '0000000').slice(0, 7);
  }

  window.__cyGit = function (setup, opts) {
    setup = setup || {};
    opts = opts || {};
    var realLog = console.log.bind(console);
    var term = document.getElementById('root') || document.body.appendChild(el('div'));
    term.id = 'root';
    term.className = 'cy-term';
    var style = el('style');
    style.textContent =
      'body{margin:0;background:#0F1222}.cy-term{font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;color:#E6E8F2;padding:10px 12px;min-height:100vh;box-sizing:border-box;white-space:pre-wrap;word-break:break-word}.cy-cmd{color:#7EE0B5}.cy-err{color:#FF8A9B}.cy-dim{color:#8E93B8}.cy-add{color:#7EE0B5}.cy-del{color:#FF8A9B}.cy-yel{color:#FFD58A}#cy-shell{display:flex;gap:6px;margin:8px 0}#cy-cmdline{flex:1;min-width:0;font:13px ui-monospace,monospace;background:#161A30;color:#E6E8F2;border:1px solid #2E3456;border-radius:6px;padding:6px 8px}#cy-shell button,.cy-preset{font:bold 12px system-ui,sans-serif;background:#4B3FD8;color:#fff;border:0;border-radius:6px;padding:6px 10px}.cy-presets{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 8px}.cy-preset{background:#2E3456;font:12px ui-monospace,monospace}';
    document.head.appendChild(style);

    var presets = el('div', 'cy-presets');
    var lines = el('div', 'cy-lines');
    var form = el('form');
    form.id = 'cy-shell';
    form.innerHTML = '<input id="cy-cmdline" aria-label="Command" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type a command"><button type="submit">Run</button>';
    term.appendChild(presets);
    term.appendChild(lines);
    term.appendChild(form);

    function print(text, cls) {
      String(text)
        .split('\n')
        .forEach(function (t) {
          lines.appendChild(el('div', 'cy-line' + (cls ? ' ' + cls : ''), t === '' ? ' ' : t));
          realLog(t);
        });
    }

    // ── The repository ──
    var cwd = setup.folder || 'cafe-site';
    var files = clone(setup.files || {});
    var repo = null;
    var remotes = {};
    // A pretend GitHub: repositories by URL, each with branches and the commits they hold.
    var hub = {};
    var config = { 'user.name': 'Rosa Cafe', 'user.email': 'rosa@rosascafe.example' };
    var clock = 0;
    function newRepo() {
      return { commits: {}, branches: {}, head: { branch: 'main' }, index: {}, tags: {}, stash: [], merging: null };
    }
    if (setup.repo) {
      repo = newRepo();
      buildHistory(repo, setup.repo, setup.files || {});
    }
    // setup.origin: { url, ahead: [[message, {file: text}]] }: the repo was pushed to url, and a teammate has
    // since added the `ahead` commits there.
    if (setup.origin && repo) {
      remotes.origin = setup.origin.url;
      var copy = clone(repo);
      (setup.origin.ahead || []).forEach(function (c) {
        clock += 1;
        var parent = copy.branches.main;
        var tree = Object.assign({}, copy.commits[parent].tree, c[1] || {});
        var id = hash(c[0] + '|' + JSON.stringify(tree) + '|' + parent + '|' + clock);
        copy.commits[id] = { id: id, message: c[0], tree: tree, parents: [parent], author: 'Sam Lee <sam@rosascafe.example>', time: clock };
        copy.branches.main = id;
      });
      hub[setup.origin.url] = copy;
      repo.remoteBranches = { 'origin/main': repo.branches.main };
    }
    if (setup.hub) Object.keys(setup.hub).forEach(function (url) {
      var r = newRepo();
      buildHistory(r, setup.hub[url], {});
      hub[url] = r;
    });

    // setup.repo: { commits: [[message, {file: text}, branch?]], branch?: name } builds a history to start from.
    function buildHistory(r, spec, finalFiles) {
      var tree = {};
      (spec.commits || []).forEach(function (c) {
        var branch = c[2] || 'main';
        if (!r.branches[branch] && Object.keys(r.branches).length) r.branches[branch] = r.branches[spec.from && spec.from[branch] || 'main'];
        var parent = r.branches[branch] || null;
        tree = Object.assign({}, parent ? r.commits[parent].tree : {}, c[1] || {});
        Object.keys(c[1] || {}).forEach(function (k) { if (c[1][k] === null) delete tree[k]; });
        var id = makeCommit(r, c[0], tree, parent ? [parent] : []);
        r.branches[branch] = id;
      });
      r.head = { branch: spec.branch || 'main' };
      var at = r.branches[r.head.branch];
      r.index = at ? clone(r.commits[at].tree) : {};
      if (!Object.keys(finalFiles).length && at) files = clone(r.commits[at].tree);
    }
    function makeCommit(r, message, tree, parents) {
      clock += 1;
      var id = hash(message + '|' + JSON.stringify(tree) + '|' + parents.join(',') + '|' + clock);
      r.commits[id] = { id: id, message: message, tree: clone(tree), parents: parents, author: config['user.name'] + ' <' + config['user.email'] + '>', time: clock };
      return id;
    }
    function headId(r) {
      r = r || repo;
      return r.head.branch ? r.branches[r.head.branch] || null : r.head.commit;
    }
    function headTree() {
      var id = headId();
      return id ? repo.commits[id].tree : {};
    }
    function resolve(ref) {
      if (!ref || ref === 'HEAD') return headId();
      var m = /^(.*?)(~(\d*)|\^+)$/.exec(ref);
      if (m) {
        var id = resolve(m[1]);
        var n = m[2][0] === '~' ? Number(m[3] || 1) : m[2].length;
        for (var i = 0; i < n && id; i++) id = repo.commits[id].parents[0] || null;
        return id;
      }
      if (repo.branches[ref]) return repo.branches[ref];
      if (repo.tags[ref]) return repo.tags[ref];
      if (ref.indexOf('origin/') === 0 && repo.remoteBranches && repo.remoteBranches[ref]) return repo.remoteBranches[ref];
      var ids = Object.keys(repo.commits).filter(function (id) { return id.indexOf(ref) === 0; });
      return ids.length === 1 ? ids[0] : null;
    }
    function ancestors(id) {
      var seen = {};
      var stack = id ? [id] : [];
      while (stack.length) {
        var c = stack.pop();
        if (seen[c]) continue;
        seen[c] = true;
        repo.commits[c].parents.forEach(function (p) { stack.push(p); });
      }
      return seen;
    }
    function ignored(path) {
      var gi = files['.gitignore'];
      if (!gi) return false;
      return gi.split('\n').map(function (l) { return l.trim(); }).filter(function (l) { return l && l[0] !== '#'; }).some(function (p) {
        var re = new RegExp('^' + p.replace(/[.+^$()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*').replace(/\/$/, '/.*') + '$');
        return re.test(path) || (p[p.length - 1] === '/' && path.indexOf(p) === 0);
      });
    }
    function changes() {
      var head = headTree();
      var staged = [];
      var unstaged = [];
      var untracked = [];
      var all = {};
      [head, repo.index, files].forEach(function (t) { Object.keys(t).forEach(function (k) { all[k] = true; }); });
      Object.keys(all).sort().forEach(function (f) {
        var inHead = Object.prototype.hasOwnProperty.call(head, f);
        var inIndex = Object.prototype.hasOwnProperty.call(repo.index, f);
        var inWork = Object.prototype.hasOwnProperty.call(files, f);
        if (inIndex && !inHead) staged.push(['new file', f, 'A']);
        else if (inHead && !inIndex) staged.push(['deleted', f, 'D']);
        else if (inIndex && head[f] !== repo.index[f]) staged.push(['modified', f, 'M']);
        if (inIndex && !inWork) unstaged.push(['deleted', f, 'D']);
        else if (inIndex && inWork && files[f] !== repo.index[f]) unstaged.push(['modified', f, 'M']);
        if (!inIndex && inWork && !ignored(f)) untracked.push(f);
      });
      return { staged: staged, unstaged: unstaged, untracked: untracked };
    }

    // ── Output helpers ──
    function fatal(msg) {
      print('fatal: ' + msg, 'cy-err');
    }
    function needRepo() {
      if (!repo) {
        fatal('not a git repository (or any of the parent directories): .git');
        return false;
      }
      return true;
    }
    function oneline(id) {
      var l = labels(id);
      return id + (l ? ' (' + l + ')' : '') + ' ' + repo.commits[id].message.split('\n')[0];
    }
    function labels(id) {
      var labels = [];
      if (id === headId()) labels.push(repo.head.branch ? 'HEAD -> ' + repo.head.branch : 'HEAD');
      Object.keys(repo.branches).forEach(function (b) { if (repo.branches[b] === id && b !== repo.head.branch) labels.push(b); });
      Object.keys(repo.remoteBranches || {}).forEach(function (b) { if (repo.remoteBranches[b] === id) labels.push(b); });
      Object.keys(repo.tags).forEach(function (t) { if (repo.tags[t] === id) labels.push('tag: ' + t); });
      return labels.join(', ');
    }
    function diffText(a, b, name) {
      var x = a === undefined ? [] : String(a).split('\n');
      var y = b === undefined ? [] : String(b).split('\n');
      if (x[x.length - 1] === '') x.pop();
      if (y[y.length - 1] === '') y.pop();
      print('diff --git a/' + name + ' b/' + name, 'cy-dim');
      print('--- ' + (a === undefined ? '/dev/null' : 'a/' + name), 'cy-dim');
      print('+++ ' + (b === undefined ? '/dev/null' : 'b/' + name), 'cy-dim');
      // A simple line diff: the common start and end are context (up to 3 lines each), the middle is shown as
      // removed then added, in one hunk.
      var s = 0;
      while (s < x.length && s < y.length && x[s] === y[s]) s++;
      var e = 0;
      while (e < x.length - s && e < y.length - s && x[x.length - 1 - e] === y[y.length - 1 - e]) e++;
      var before = Math.min(3, s);
      var after = Math.min(3, e);
      var oldLen = before + (x.length - s - e) + after;
      var newLen = before + (y.length - s - e) + after;
      var range = function (start, len) { return (len ? start : start - 1) + (len === 1 ? '' : ',' + len); };
      print('@@ -' + range(s - before + 1, oldLen) + ' +' + range(s - before + 1, newLen) + ' @@', 'cy-yel');
      x.slice(s - before, s).forEach(function (l) { print(' ' + l); });
      x.slice(s, x.length - e).forEach(function (l) { print('-' + l, 'cy-del'); });
      y.slice(s, y.length - e).forEach(function (l) { print('+' + l, 'cy-add'); });
      x.slice(x.length - e, x.length - e + after).forEach(function (l) { print(' ' + l); });
    }
    // " 2 files changed, 3 insertions(+)"; with perFile (merges), a " name | 2 ++" line for each file first.
    function summary(before, after, perFile) {
      var n = 0;
      var plus = 0;
      var minus = 0;
      var created = [];
      var rows = [];
      Object.keys(Object.assign({}, before, after)).sort().forEach(function (f) {
        if (before[f] === after[f]) return;
        n++;
        var a = before[f] === undefined ? [] : before[f].split('\n').filter(Boolean);
        var b = after[f] === undefined ? [] : after[f].split('\n').filter(Boolean);
        var common = a.filter(function (l) { return b.indexOf(l) >= 0; }).length;
        plus += b.length - common;
        minus += a.length - common;
        rows.push([f, b.length - common, a.length - common]);
        if (before[f] === undefined) created.push(f);
      });
      if (perFile) {
        var w = Math.max.apply(null, rows.map(function (r) { return r[0].length; }));
        rows.forEach(function (r) { print(' ' + r[0].padEnd(w) + ' | ' + (r[1] + r[2]) + ' ' + '+'.repeat(r[1]) + '-'.repeat(r[2])); });
      }
      var line = ' ' + n + ' file' + (n === 1 ? '' : 's') + ' changed';
      if (plus) line += ', ' + plus + ' insertion' + (plus === 1 ? '' : 's') + '(+)';
      if (minus) line += ', ' + minus + ' deletion' + (minus === 1 ? '' : 's') + '(-)';
      print(line);
      created.forEach(function (f) { print(' create mode 100644 ' + f); });
    }

    // ── Shell commands ──
    function words(cmd) {
      var out = [];
      var re = /"([^"]*)"|'([^']*)'|(\S+)/g;
      var m;
      while ((m = re.exec(cmd))) out.push(m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]);
      return out;
    }
    function shell(cmd) {
      var redirect = /^echo\s+(.*?)\s*(>>?)\s*(\S+)$/.exec(cmd);
      if (redirect) {
        var text = words(redirect[1]).join(' ');
        var file = redirect[3];
        if (redirect[2] === '>') files[file] = text + '\n';
        else files[file] = (files[file] || '') + text + '\n';
        return true;
      }
      var w = words(cmd);
      switch (w[0]) {
        case 'ls':
          var names = Object.keys(files).filter(function (f) { return w[1] === '-a' || f[0] !== '.'; }).sort();
          if (names.length) print(names.join('  '));
          return true;
        case 'cat':
          if (files[w[1]] === undefined) print('cat: ' + w[1] + ': No such file or directory', 'cy-err');
          else print(files[w[1]].replace(/\n$/, ''));
          return true;
        case 'touch':
          w.slice(1).forEach(function (f) { if (files[f] === undefined) files[f] = ''; });
          return true;
        case 'rm':
          w.slice(1).forEach(function (f) { if (f[0] !== '-') delete files[f]; });
          return true;
        case 'echo':
          print(w.slice(1).join(' '));
          return true;
        case 'pwd':
          print('/home/learner/' + cwd);
          return true;
        case 'cd':
          if (w[1] && w[1] !== '..') cwd = w[1];
          return true;
        case 'clear':
          lines.innerHTML = '';
          return true;
      }
      return false;
    }

    // ── Git commands ──
    function git(w) {
      var sub = w[0];
      var args = w.slice(1);
      var has = function (f) { return args.indexOf(f) >= 0; };
      var after = function (f) { var i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
      if (!sub || sub === 'help' || sub === '--help') {
        print('These are common Git commands:');
        ['init', 'status', 'add', 'commit', 'log', 'diff', 'branch', 'switch', 'merge', 'push', 'pull'].forEach(function (c) { print('   ' + c); });
        return;
      }
      if (sub === '--version' || sub === 'version') return print('git version 2.47.0');
      if (sub === 'config') {
        var key = args.filter(function (a) { return a[0] !== '-'; })[0];
        var val = args.filter(function (a) { return a[0] !== '-'; })[1];
        if (has('--list')) return Object.keys(config).forEach(function (k) { print(k + '=' + config[k]); });
        if (val !== undefined) config[key] = val;
        else if (config[key] !== undefined) print(config[key]);
        return;
      }
      if (sub === 'init') {
        if (repo) return print('Reinitialized existing Git repository in /home/learner/' + cwd + '/.git/');
        repo = newRepo();
        if (has('-b')) repo.head.branch = after('-b');
        return print('Initialized empty Git repository in /home/learner/' + cwd + '/.git/');
      }
      if (sub === 'clone') {
        var url = args[0];
        if (!hub[url]) return fatal("repository '" + url + "' not found");
        var name = args[1] || url.replace(/\.git$/, '').split('/').pop();
        print("Cloning into '" + name + "'...");
        cwd = name;
        repo = clone(hub[url]);
        repo.head = { branch: 'main' };
        files = clone(repo.commits[repo.branches.main].tree);
        repo.index = clone(files);
        remotes.origin = url;
        repo.remoteBranches = { 'origin/main': repo.branches.main };
        repo.branches = { main: repo.branches.main };
        return;
      }
      if (!needRepo()) return;
      switch (sub) {
        case 'status': return status(has('-s') || has('--short'));
        case 'add': return add(args);
        case 'restore': return restore(args);
        case 'rm': return rmFiles(args);
        case 'mv':
          files[args[1]] = files[args[0]];
          delete files[args[0]];
          repo.index[args[1]] = repo.index[args[0]];
          delete repo.index[args[0]];
          return;
        case 'commit': return commit(args);
        case 'log': return log(args);
        case 'diff': return diff(args);
        case 'show': return show(args);
        case 'branch': return branch(args);
        case 'switch': return switchTo(args[0] === '-c' || args[0] === '-C' ? args[1] : args[0], args[0] === '-c' || args[0] === '-C');
        case 'checkout':
          if (args[0] === '--') return restore([args[1]]);
          return switchTo(args[0] === '-b' ? args[1] : args[0], args[0] === '-b');
        case 'merge': return merge(args);
        case 'stash': return stash(args);
        case 'tag': return tag(args);
        case 'revert': return revert(args);
        case 'reset': return reset(args);
        case 'reflog': return Object.keys(repo.commits).sort(function (a, b) { return repo.commits[b].time - repo.commits[a].time; }).forEach(function (id, i) { print(id + ' HEAD@{' + i + '}: ' + repo.commits[id].message); });
        case 'remote': return remote(args);
        case 'push': return push(args);
        case 'fetch': return fetch(args);
        case 'pull': return pull(args);
      }
      print("git: '" + sub + "' is not a git command. See 'git --help'.", 'cy-err');
    }

    function status(short) {
      var c = changes();
      if (short) {
        var map = {};
        c.staged.forEach(function (s) { map[s[1]] = [s[2], ' ']; });
        c.unstaged.forEach(function (s) { map[s[1]] = [(map[s[1]] || [' '])[0], s[2]]; });
        Object.keys(map).sort().forEach(function (f) { print(map[f][0] + map[f][1] + ' ' + f); });
        c.untracked.forEach(function (f) { print('?? ' + f); });
        return;
      }
      print(repo.head.branch ? 'On branch ' + repo.head.branch : 'HEAD detached at ' + repo.head.commit);
      if (repo.remoteBranches && repo.remoteBranches['origin/' + repo.head.branch] !== undefined) {
        var mine = headId();
        var theirs = repo.remoteBranches['origin/' + repo.head.branch];
        var ahead = Object.keys(ancestors(mine)).filter(function (x) { return !ancestors(theirs)[x]; }).length;
        var behind = Object.keys(ancestors(theirs)).filter(function (x) { return !ancestors(mine)[x]; }).length;
        if (!ahead && !behind) print("Your branch is up to date with 'origin/" + repo.head.branch + "'.");
        else if (ahead && !behind) print("Your branch is ahead of 'origin/" + repo.head.branch + "' by " + ahead + ' commit' + (ahead === 1 ? '' : 's') + '.');
        else if (behind && !ahead) print("Your branch is behind 'origin/" + repo.head.branch + "' by " + behind + ' commit' + (behind === 1 ? '' : 's') + '.');
        print('');
      }
      if (!headId()) print('\nNo commits yet\n');
      if (repo.merging) print('You have unmerged paths.\n  (fix conflicts and run "git commit")\n');
      if (c.staged.length) {
        print('Changes to be committed:');
        print(headId() ? '  (use "git restore --staged <file>..." to unstage)' : '  (use "git rm --cached <file>..." to unstage)', 'cy-dim');
        c.staged.forEach(function (s) { print('\t' + (s[0] + ':').padEnd(12) + s[1], 'cy-add'); });
        print('');
      }
      if (c.unstaged.length) {
        print('Changes not staged for commit:');
        print('  (use "git add <file>..." to update what will be committed)', 'cy-dim');
        print('  (use "git restore <file>..." to discard changes in working directory)', 'cy-dim');
        c.unstaged.forEach(function (s) { print('\t' + (s[0] + ':').padEnd(12) + s[1], 'cy-del'); });
        print('');
      }
      if (c.untracked.length) {
        print('Untracked files:');
        print('  (use "git add <file>..." to include in what will be committed)', 'cy-dim');
        c.untracked.forEach(function (f) { print('\t' + f, 'cy-del'); });
        print('');
      }
      if (!c.staged.length && !c.unstaged.length && !c.untracked.length) print(headId() ? 'nothing to commit, working tree clean' : 'nothing to commit (create/copy files and use "git add" to track)');
      else if (!c.staged.length && !c.unstaged.length) print('nothing added to commit but untracked files present (use "git add" to track)');
      else if (!c.staged.length) print('no changes added to commit (use "git add" and/or "git commit -a")');
    }

    function add(args) {
      var list = args.filter(function (a) { return a[0] !== '-' || a === '-A'; });
      if (!list.length) return print('Nothing specified, nothing added.');
      var all = list.indexOf('.') >= 0 || list.indexOf('-A') >= 0;
      var targets = all ? Object.keys(Object.assign({}, files, repo.index)) : list;
      var bad = false;
      targets.forEach(function (f) {
        if (files[f] === undefined && repo.index[f] === undefined) {
          fatal("pathspec '" + f + "' did not match any files");
          bad = true;
          return;
        }
        if (ignored(f) && repo.index[f] === undefined) {
          if (!all) print('The following paths are ignored by one of your .gitignore files:\n' + f, 'cy-yel');
          return;
        }
        if (files[f] === undefined) delete repo.index[f];
        else repo.index[f] = files[f];
      });
      return bad;
    }
    function restore(args) {
      var staged = args.indexOf('--staged') >= 0;
      var list = args.filter(function (a) { return a[0] !== '-'; });
      var head = headTree();
      (list.indexOf('.') >= 0 ? Object.keys(Object.assign({}, repo.index, files)) : list).forEach(function (f) {
        if (staged) {
          if (head[f] === undefined) delete repo.index[f];
          else repo.index[f] = head[f];
        } else if (repo.index[f] !== undefined) files[f] = repo.index[f];
      });
    }
    function rmFiles(args) {
      var cached = args.indexOf('--cached') >= 0;
      args.filter(function (a) { return a[0] !== '-'; }).forEach(function (f) {
        if (repo.index[f] === undefined) return fatal("pathspec '" + f + "' did not match any files");
        delete repo.index[f];
        if (!cached) delete files[f];
        print("rm '" + f + "'");
      });
    }
    function commit(args) {
      var msgs = [];
      args.forEach(function (a, i) { if (a === '-m' || a === '-am') msgs.push(args[i + 1]); });
      if (args.indexOf('-am') >= 0 || args.indexOf('-a') >= 0) {
        Object.keys(repo.index).forEach(function (f) {
          if (files[f] === undefined) delete repo.index[f];
          else repo.index[f] = files[f];
        });
      }
      var amend = args.indexOf('--amend') >= 0;
      if (!msgs.length && !(amend && args.indexOf('--no-edit') >= 0)) {
        return print('error: no message given. Use git commit -m "message" (in these lessons there is no editor).', 'cy-err');
      }
      if (!config['user.name']) return print('Author identity unknown\n\n*** Please tell me who you are.', 'cy-err');
      var parent = headId();
      var parentTree = parent ? repo.commits[parent].tree : {};
      if (repo.merging && Object.keys(repo.index).some(function (f) { return /^<<<<<<< /m.test(repo.index[f]); })) {
        return print('error: Committing is not possible because you have unmerged files.', 'cy-err');
      }
      if (!amend && !repo.merging && JSON.stringify(repo.index) === JSON.stringify(parentTree)) {
        var c = changes();
        print(repo.head.branch ? 'On branch ' + repo.head.branch : 'HEAD detached');
        if (c.unstaged.length || c.untracked.length) return print('no changes added to commit (use "git add" and/or "git commit -a")');
        return print('nothing to commit, working tree clean');
      }
      var message = msgs.join('\n\n') || repo.commits[parent].message;
      var parents = amend ? repo.commits[parent].parents : parent ? [parent] : [];
      if (repo.merging) parents = [parent, repo.merging];
      var before = amend && parents[0] ? repo.commits[parents[0]].tree : parentTree;
      var id = makeCommit(repo, message, repo.index, parents);
      if (repo.head.branch) repo.branches[repo.head.branch] = id;
      else repo.head.commit = id;
      repo.merging = null;
      print('[' + (repo.head.branch || 'detached HEAD') + (parents.length ? '' : ' (root-commit)') + ' ' + id + '] ' + message.split('\n')[0]);
      summary(before, repo.index);
    }
    function log(args) {
      var id = headId();
      if (!id) return fatal("your current branch '" + repo.head.branch + "' does not have any commits yet");
      var starts = args.indexOf('--all') >= 0 ? Object.keys(repo.branches).map(function (b) { return repo.branches[b]; }) : [args.filter(function (a) { return a[0] !== '-'; })[0] ? resolve(args.filter(function (a) { return a[0] !== '-'; })[0]) : id];
      var seen = {};
      starts.forEach(function (s) { Object.assign(seen, ancestors(s)); });
      var list = Object.keys(seen).sort(function (a, b) { return repo.commits[b].time - repo.commits[a].time; });
      var n = args.filter(function (a) { return /^-\d+$/.test(a); })[0];
      if (n) list = list.slice(0, Number(n.slice(1)));
      var graph = args.indexOf('--graph') >= 0;
      if (args.indexOf('--oneline') >= 0) return list.forEach(function (c) { print((graph ? (repo.commits[c].parents.length > 1 ? '*   ' : '* ') : '') + oneline(c), 'cy-yel'); });
      list.forEach(function (c, i) {
        var cm = repo.commits[c];
        print('commit ' + c + (labels(c) ? ' (' + labels(c) + ')' : ''), 'cy-yel');
        if (cm.parents.length > 1) print('Merge: ' + cm.parents.join(' '));
        print('Author: ' + cm.author);
        print('Date:   Mon Nov 2 09:' + String(10 + (cm.time % 50)).padStart(2, '0') + ':00 2026 +0000');
        print('');
        print('    ' + cm.message);
        if (i < list.length - 1) print('');
      });
    }
    function diff(args) {
      var staged = args.indexOf('--staged') >= 0 || args.indexOf('--cached') >= 0;
      var refs = args.filter(function (a) { return a[0] !== '-'; });
      var a;
      var b;
      if (refs.length === 2) {
        a = repo.commits[resolve(refs[0])].tree;
        b = repo.commits[resolve(refs[1])].tree;
      } else if (staged) {
        a = headTree();
        b = repo.index;
      } else {
        a = repo.index;
        b = {};
        Object.keys(repo.index).forEach(function (f) { b[f] = files[f]; });
      }
      Object.keys(Object.assign({}, a, b)).sort().forEach(function (f) { if (a[f] !== b[f]) diffText(a[f], b[f], f); });
    }
    function show(args) {
      var id = resolve(args[0] || 'HEAD');
      if (!id) return fatal("ambiguous argument '" + args[0] + "': unknown revision");
      var cm = repo.commits[id];
      print('commit ' + id, 'cy-yel');
      print('Author: ' + cm.author);
      print('');
      print('    ' + cm.message);
      print('');
      var before = cm.parents[0] ? repo.commits[cm.parents[0]].tree : {};
      Object.keys(Object.assign({}, before, cm.tree)).sort().forEach(function (f) { if (before[f] !== cm.tree[f]) diffText(before[f], cm.tree[f], f); });
    }
    function branch(args) {
      var names = args.filter(function (a) { return a[0] !== '-'; });
      if (args[0] === '-d' || args[0] === '-D') {
        var b = args[1];
        if (!repo.branches[b]) return print("error: branch '" + b + "' not found", 'cy-err');
        if (b === repo.head.branch) return print("error: cannot delete branch '" + b + "' used by worktree", 'cy-err');
        if (args[0] === '-d' && !ancestors(headId())[repo.branches[b]]) return print("error: the branch '" + b + "' is not fully merged.\nhint: If you are sure you want to delete it, run 'git branch -D " + b + "'", 'cy-err');
        print('Deleted branch ' + b + ' (was ' + repo.branches[b] + ').');
        delete repo.branches[b];
        return;
      }
      if (args[0] === '-m') {
        var from = names.length > 1 ? names[0] : repo.head.branch;
        var to = names.length > 1 ? names[1] : names[0];
        repo.branches[to] = repo.branches[from];
        delete repo.branches[from];
        if (repo.head.branch === from) repo.head.branch = to;
        return;
      }
      if (names.length) {
        if (!headId()) return fatal("not a valid object name: '" + repo.head.branch + "'");
        if (repo.branches[names[0]]) return fatal("a branch named '" + names[0] + "' already exists");
        repo.branches[names[0]] = headId();
        return;
      }
      var list = Object.keys(repo.branches).sort();
      list.forEach(function (b) { print((b === repo.head.branch ? '* ' : '  ') + b, b === repo.head.branch ? 'cy-add' : null); });
      if (args.indexOf('-a') >= 0) Object.keys(repo.remoteBranches || {}).forEach(function (b) { print('  remotes/' + b, 'cy-del'); });
    }
    function dirty() {
      var c = changes();
      return c.staged.length || c.unstaged.length;
    }
    function switchTo(name, create) {
      if (!name) return fatal('missing branch or commit argument');
      if (create) {
        if (repo.branches[name]) return fatal("a branch named '" + name + "' already exists");
        repo.branches[name] = headId();
        repo.head = { branch: name };
        return print("Switched to a new branch '" + name + "'");
      }
      var target = repo.branches[name];
      if (!target && repo.remoteBranches && repo.remoteBranches['origin/' + name]) {
        repo.branches[name] = repo.remoteBranches['origin/' + name];
        target = repo.branches[name];
        print("branch '" + name + "' set up to track 'origin/" + name + "'.");
      }
      if (!target) return fatal("invalid reference: " + name);
      if (dirty() && JSON.stringify(repo.commits[target].tree) !== JSON.stringify(headTree())) {
        var c = changes();
        var hit = c.unstaged.concat(c.staged).map(function (x) { return x[1]; }).filter(function (f) { return repo.commits[target].tree[f] !== headTree()[f]; });
        if (hit.length) return print('error: Your local changes to the following files would be overwritten by checkout:\n\t' + hit.join('\n\t') + '\nPlease commit your changes or stash them before you switch branches.\nAborting', 'cy-err');
      }
      var oldTree = headTree();
      var newTree = repo.commits[target].tree;
      Object.keys(oldTree).forEach(function (f) { if (newTree[f] === undefined && files[f] === oldTree[f]) delete files[f]; });
      Object.keys(newTree).forEach(function (f) { if (files[f] === oldTree[f] || files[f] === undefined) files[f] = newTree[f]; });
      Object.keys(oldTree).forEach(function (f) { if (repo.index[f] === oldTree[f]) delete repo.index[f]; });
      Object.keys(newTree).forEach(function (f) { if (repo.index[f] === undefined || repo.index[f] === oldTree[f]) repo.index[f] = newTree[f]; });
      repo.head = { branch: name };
      print("Switched to branch '" + name + "'");
    }
    function merge(args) {
      if (args[0] === '--abort') {
        if (!repo.merging) return fatal('There is no merge to abort (MERGE_HEAD missing).');
        repo.merging = null;
        files = clone(headTree());
        repo.index = clone(headTree());
        return;
      }
      var name = args.filter(function (a) { return a[0] !== '-'; })[0];
      var theirs = resolve(name);
      if (!theirs) return fatal("'" + name + "' - not something we can merge");
      var ours = headId();
      if (ancestors(ours)[theirs]) return print('Already up to date.');
      var oursTree = headTree();
      var theirsTree = repo.commits[theirs].tree;
      if (ancestors(theirs)[ours] && args.indexOf('--no-ff') < 0) {
        print('Updating ' + ours + '..' + theirs);
        print('Fast-forward');
        summary(oursTree, theirsTree, true);
        Object.keys(theirsTree).forEach(function (f) { files[f] = theirsTree[f]; });
        Object.keys(oursTree).forEach(function (f) { if (theirsTree[f] === undefined) delete files[f]; });
        repo.index = clone(theirsTree);
        repo.branches[repo.head.branch] = theirs;
        return;
      }
      // The merge base: the newest commit both histories share.
      var a = ancestors(ours);
      var base = Object.keys(ancestors(theirs)).filter(function (x) { return a[x]; }).sort(function (x, y) { return repo.commits[y].time - repo.commits[x].time; })[0];
      var baseTree = base ? repo.commits[base].tree : {};
      var result = {};
      var conflicts = [];
      Object.keys(Object.assign({}, baseTree, oursTree, theirsTree)).sort().forEach(function (f) {
        var b = baseTree[f];
        var o = oursTree[f];
        var t = theirsTree[f];
        if (o === t) result[f] = o;
        else if (o === b) result[f] = t;
        else if (t === b) result[f] = o;
        else {
          conflicts.push(f);
          result[f] = '<<<<<<< HEAD\n' + (o || '') + '=======\n' + (t || '') + '>>>>>>> ' + name + '\n';
        }
        if (result[f] === undefined) delete result[f];
      });
      Object.keys(result).forEach(function (f) { files[f] = result[f]; });
      Object.keys(oursTree).forEach(function (f) { if (result[f] === undefined) delete files[f]; });
      repo.index = clone(result);
      if (conflicts.length) {
        repo.merging = theirs;
        conflicts.forEach(function (f) { print('Auto-merging ' + f); print('CONFLICT (content): Merge conflict in ' + f, 'cy-err'); });
        return print('Automatic merge failed; fix conflicts and then commit the result.', 'cy-err');
      }
      var id = makeCommit(repo, "Merge branch '" + name + "'", result, [ours, theirs]);
      repo.branches[repo.head.branch] = id;
      print("Merge made by the 'ort' strategy.");
      summary(oursTree, result, true);
    }
    function stash(args) {
      var sub = args[0] || 'push';
      if (sub === 'push' || sub === 'save' || sub === '-m') {
        if (!dirty()) return print('No local changes to save');
        var msg = args.indexOf('-m') >= 0 ? args[args.indexOf('-m') + 1] : null;
        repo.stash.unshift({ files: clone(files), index: clone(repo.index), message: 'WIP on ' + repo.head.branch + ': ' + (msg || repo.commits[headId()].id + ' ' + repo.commits[headId()].message) });
        var tree = headTree();
        Object.keys(files).forEach(function (f) { if (repo.index[f] !== undefined || tree[f] !== undefined) files[f] = tree[f]; if (files[f] === undefined) delete files[f]; });
        repo.index = clone(tree);
        return print('Saved working directory and index state ' + repo.stash[0].message);
      }
      if (sub === 'list') return repo.stash.forEach(function (s, i) { print('stash@{' + i + '}: ' + s.message); });
      if (sub === 'pop' || sub === 'apply') {
        if (!repo.stash.length) return print('No stash entries found.', 'cy-err');
        var s = repo.stash[0];
        Object.keys(s.files).forEach(function (f) { files[f] = s.files[f]; });
        if (sub === 'pop') {
          repo.stash.shift();
          status(false);
          return print('Dropped refs/stash@{0}');
        }
        return status(false);
      }
      if (sub === 'drop') {
        repo.stash.shift();
        return print('Dropped refs/stash@{0}');
      }
    }
    function tag(args) {
      if (!args.length) return Object.keys(repo.tags).sort().forEach(function (t) { print(t); });
      var name = args.filter(function (a, i) { return a[0] !== '-' && args[i - 1] !== '-m'; })[0];
      repo.tags[name] = headId();
    }
    function revert(args) {
      var id = resolve(args.filter(function (a) { return a[0] !== '-'; })[0]);
      if (!id) return fatal('bad revision');
      var cm = repo.commits[id];
      var before = cm.parents[0] ? repo.commits[cm.parents[0]].tree : {};
      var tree = clone(headTree());
      Object.keys(Object.assign({}, before, cm.tree)).forEach(function (f) {
        if (before[f] === cm.tree[f]) return;
        if (before[f] === undefined) delete tree[f];
        else tree[f] = before[f];
      });
      var old = headTree();
      var msg = 'Revert "' + cm.message + '"';
      var nid = makeCommit(repo, msg, tree, [headId()]);
      repo.branches[repo.head.branch] = nid;
      files = Object.assign({}, files);
      Object.keys(old).forEach(function (f) { if (tree[f] === undefined) delete files[f]; });
      Object.keys(tree).forEach(function (f) { files[f] = tree[f]; });
      repo.index = clone(tree);
      print('[' + repo.head.branch + ' ' + nid + '] ' + msg);
      summary(old, tree);
    }
    function reset(args) {
      var mode = args.indexOf('--hard') >= 0 ? 'hard' : args.indexOf('--soft') >= 0 ? 'soft' : 'mixed';
      var ref = args.filter(function (a) { return a[0] !== '-'; })[0] || 'HEAD';
      if (files[ref] !== undefined || repo.index[ref] !== undefined) return restore(['--staged', ref]);
      var id = resolve(ref);
      if (!id) return fatal("ambiguous argument '" + ref + "': unknown revision or path not in the working tree.");
      repo.branches[repo.head.branch] = id;
      var tree = repo.commits[id].tree;
      if (mode !== 'soft') repo.index = clone(tree);
      if (mode === 'hard') {
        files = clone(tree);
        return print('HEAD is now at ' + id + ' ' + repo.commits[id].message);
      }
      if (mode === 'mixed') {
        var c = changes();
        if (c.unstaged.length) {
          print('Unstaged changes after reset:');
          c.unstaged.forEach(function (s) { print(s[2] + '\t' + s[1]); });
        }
      }
    }
    function remote(args) {
      if (args[0] === 'add') {
        remotes[args[1]] = args[2];
        if (!hub[args[2]]) hub[args[2]] = newRepo();
        return;
      }
      if (args[0] === '-v') return Object.keys(remotes).forEach(function (r) { print(r + '\t' + remotes[r] + ' (fetch)'); print(r + '\t' + remotes[r] + ' (push)'); });
      Object.keys(remotes).forEach(function (r) { print(r); });
    }
    function server(name) {
      var url = remotes[name || 'origin'];
      if (!url) {
        fatal("'" + (name || 'origin') + "' does not appear to be a git repository\nfatal: Could not read from remote repository.");
        return null;
      }
      return { url: url, repo: hub[url] };
    }
    function copyCommits(from, to, tip) {
      Object.keys(ancestorsIn(from, tip)).forEach(function (id) { to.commits[id] = clone(from.commits[id]); });
    }
    function ancestorsIn(r, id) {
      var seen = {};
      var stack = id ? [id] : [];
      while (stack.length) {
        var c = stack.pop();
        if (seen[c]) continue;
        seen[c] = true;
        r.commits[c].parents.forEach(function (p) { stack.push(p); });
      }
      return seen;
    }
    function push(args) {
      var names = args.filter(function (a) { return a[0] !== '-'; });
      var s = server(names[0]);
      if (!s) return;
      var b = names[1] || repo.head.branch;
      var mine = repo.branches[b];
      if (!mine) return print("error: src refspec " + b + " does not match any", 'cy-err');
      var theirs = s.repo.branches[b];
      if (theirs && !ancestors(mine)[theirs] && args.indexOf('--force') < 0) {
        print('To ' + s.url);
        print(' ! [rejected]        ' + b + ' -> ' + b + ' (fetch first)', 'cy-err');
        print("error: failed to push some refs to '" + s.url + "'", 'cy-err');
        return print('hint: Updates were rejected because the remote contains work that you do not\nhint: have locally. Integrate the remote changes (e.g. git pull) before pushing again.', 'cy-yel');
      }
      if (theirs === mine) return print('Everything up-to-date');
      copyCommits(repo, s.repo, mine);
      s.repo.branches[b] = mine;
      repo.remoteBranches = repo.remoteBranches || {};
      repo.remoteBranches['origin/' + b] = mine;
      print('To ' + s.url);
      print(theirs ? '   ' + theirs + '..' + mine + '  ' + b + ' -> ' + b : ' * [new branch]      ' + b + ' -> ' + b);
      if (args.indexOf('-u') >= 0 || args.indexOf('--set-upstream') >= 0) print("branch '" + b + "' set up to track 'origin/" + b + "'.");
    }
    function fetch(args) {
      var s = server(args.filter(function (a) { return a[0] !== '-'; })[0]);
      if (!s) return;
      repo.remoteBranches = repo.remoteBranches || {};
      var news = [];
      Object.keys(s.repo.branches).forEach(function (b) {
        copyCommits(s.repo, repo, s.repo.branches[b]);
        if (repo.remoteBranches['origin/' + b] !== s.repo.branches[b]) news.push(b);
        repo.remoteBranches['origin/' + b] = s.repo.branches[b];
      });
      if (news.length) {
        print('From ' + s.url);
        news.forEach(function (b) { print('   ' + b + ' -> origin/' + b); });
      }
    }
    function pull(args) {
      var before = repo.remoteBranches ? repo.remoteBranches['origin/' + repo.head.branch] : null;
      fetch(args);
      var theirs = repo.remoteBranches && repo.remoteBranches['origin/' + repo.head.branch];
      if (!theirs || theirs === before && ancestors(headId())[theirs]) return print('Already up to date.');
      merge(['origin/' + repo.head.branch]);
    }

    function run(cmd) {
      cmd = String(cmd).trim();
      if (!cmd) return;
      print('$ ' + cmd, 'cy-cmd');
      if (/^git(\s|$)/.test(cmd)) git(words(cmd).slice(1));
      else if (!shell(cmd)) print(cmd.split(' ')[0] + ': command not found', 'cy-err');
    }

    (opts.commands || []).forEach(function (c, i) {
      var b = el('button', 'cy-preset', c);
      b.type = 'button';
      b.id = 'cy-c' + i;
      b.addEventListener('click', function () { run(c); });
      presets.appendChild(b);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var box = document.getElementById('cy-cmdline');
      run(box.value);
      box.value = '';
    });
    // Commands that already ran before the lesson starts (shown, so the learner sees how the folder got here).
    (opts.before || []).forEach(run);
  };
})();
