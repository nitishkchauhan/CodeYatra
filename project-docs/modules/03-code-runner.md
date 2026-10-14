# 03 · Code runner

## What it does
Runs learners’ code **on the phone**, so lessons can check real programs.

| Language | How it runs | Offline? |
|---|---|---|
| Python | Pyodide (Python compiled to WebAssembly), downloaded once (~10 MB) from jsDelivr | After the first download |
| JavaScript | The phone’s JavaScript engine | Yes |
| SQL | Python’s sqlite3, on a sample railway database | After the Python download |
| HTML / CSS / JS pages | Live preview inside the app | Yes |
| C, Java | Not run. Lessons use output, bug and order exercises instead | — |

## How it works
1. A hidden web view (on Android) or iframe (on the web) hosts a sandbox page.
2. Code runs inside a Web Worker, so a never-ending loop can be stopped.
3. Time limit: 8 seconds per run; the very first Python run gets 120 seconds to download.
4. If Python can’t download (no internet), the learner sees *“Could not download Python… check your internet connection and tap Run again”*, and the next Run tries again.

## Where it lives in the code
| Part | Files |
|---|---|
| Sandbox page and worker | `src/lib/runner/host.ts` |
| React provider (`useCodeRunner`) | `src/lib/runner/index.tsx` |
| Web view / iframe host | `src/lib/runner/RunnerHost.tsx`, `RunnerHost.web.tsx` |
| Test harness for exercises | `src/lib/runner/harness.ts` |
| Code editor | `src/components/CodeEditor.tsx` |
| Playground | `src/app/playground.tsx` |

## Known limits and fixes
- Long code lines used to wrap and put line numbers out of step; fixed on 10 Oct 2026 (the editor now scrolls sideways).
- The editor follows the phone’s font size up to 1.6×.

## Next (Plan, Phase 4)
File tabs for web projects, `input()` support, saved programs, sharing code, starter templates. Running C and Java needs a paid code-running server, so it waits until there is revenue.
