// "Watch it run": runs a Python program under sys.settrace and records, before each line runs, which
// line it is, the variables in scope, the functions being called and everything printed so far.
// The app runs this in its Python runtime; tests run the same program with real Python.

export type TraceFrame = {
  /** The line about to run (1-based), or 0 for "finished". */
  line: number;
  /** Variable name → short repr, for the innermost function (or the whole program). */
  vars: Record<string, string>;
  /** Functions being called, outermost first. */
  stack: string[];
  /** Everything printed so far. */
  out: string;
};
export type Trace = { frames: TraceFrame[]; error?: string; cut?: boolean };

const MARK = '\u0001CYTRACE';
/** No lesson needs more; an endless loop stops here instead of hanging. */
const MAX_STEPS = 400;

/** The Python program that runs `code` and prints its trace as one JSON line. */
export function traceProgram(code: string[]): string {
  const src = JSON.stringify(code.join('\n'));
  return `import sys, io, json, types
__cy_src = ${src}
__cy_buf = io.StringIO()
__cy_frames = []
__cy_state = {"cut": False}
def __cy_show(v):
    if isinstance(v, (types.FunctionType, types.BuiltinFunctionType)):
        return "function " + getattr(v, "__name__", "")
    if isinstance(v, type):
        return "class " + v.__name__
    if isinstance(v, types.ModuleType):
        return None
    if type(v).__repr__ is object.__repr__:
        return type(v).__name__ + " object"
    try:
        r = repr(v)
    except Exception:
        r = "?"
    return r if len(r) <= 48 else r[:45] + "..."
def __cy_vars(frame):
    names = frame.f_locals
    out = {}
    for k, v in list(names.items()):
        if k.startswith("__"):
            continue
        s = __cy_show(v)
        if s is not None:
            out[k] = s
    return out
def __cy_stack(frame):
    names = []
    f = frame
    while f is not None:
        if f.f_code.co_filename == "<lesson>" and f.f_code.co_name != "<module>":
            names.append(f.f_code.co_name)
        f = f.f_back
    return names[::-1]
def __cy_local(frame, event, arg):
    if event == "line":
        if len(__cy_frames) >= ${MAX_STEPS}:
            __cy_state["cut"] = True
            raise KeyboardInterrupt
        __cy_frames.append({"line": frame.f_lineno, "vars": __cy_vars(frame), "stack": __cy_stack(frame), "out": __cy_buf.getvalue()})
    return __cy_local
def __cy_global(frame, event, arg):
    if frame.f_code.co_filename == "<lesson>":
        return __cy_local
    return None
__cy_error = None
__cy_real = sys.stdout
__cy_scope = {"__name__": "__main__"}
sys.stdout = __cy_buf
try:
    __cy_code = compile(__cy_src, "<lesson>", "exec")
    sys.settrace(__cy_global)
    try:
        exec(__cy_code, __cy_scope)
    finally:
        sys.settrace(None)
except KeyboardInterrupt:
    pass
except Exception as e:
    __cy_error = type(e).__name__ + ": " + str(e)
sys.stdout = __cy_real
__cy_final = {}
for k, v in list(__cy_scope.items()):
    if not k.startswith("__"):
        s = __cy_show(v)
        if s is not None:
            __cy_final[k] = s
__cy_frames.append({"line": 0, "vars": __cy_final, "stack": [], "out": __cy_buf.getvalue()})
print(${JSON.stringify(MARK)} + json.dumps({"frames": __cy_frames, "error": __cy_error, "cut": __cy_state["cut"]}))
`;
}

/** Reads the trace back out of the program's output. */
export function parseTrace(output: string[]): Trace | null {
  const line = output.find((l) => l.startsWith(MARK));
  if (!line) return null;
  const data = JSON.parse(line.slice(MARK.length)) as { frames: TraceFrame[]; error: string | null; cut: boolean };
  return { frames: data.frames, error: data.error ?? undefined, cut: data.cut || undefined };
}

/** Which variables changed between two frames (for highlighting). */
export function changedVars(prev: TraceFrame | undefined, next: TraceFrame): string[] {
  return Object.keys(next.vars).filter((k) => prev?.vars[k] !== next.vars[k]);
}
