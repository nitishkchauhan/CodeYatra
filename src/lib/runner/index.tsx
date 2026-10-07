import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

import type { RunLang } from './harness';
import { RunnerHost } from './RunnerHost';
import type { HostMessage, RunRequest } from './types';

export type RunOutcome = { ok: boolean; output: string[]; error?: string };

type Runner = (lang: RunLang, code: string) => Promise<RunOutcome>;

const RunnerContext = createContext<Runner | null>(null);

const friendly = (error?: string) =>
  error === 'TIMEOUT'
    ? 'Your code ran for too long and was stopped. Is there a loop that never ends?'
    : error;

/**
 * Runs Python (Pyodide) and JavaScript in a sandbox. The sandbox is created on
 * the first run, so learners who never open a code editor pay nothing for it.
 */
export function CodeRunnerProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const ready = useRef(false);
  const queue = useRef<RunRequest[]>([]);
  const pending = useRef(new Map<string, (r: RunOutcome) => void>());
  const post = useRef<((msg: RunRequest) => void) | null>(null);
  const counter = useRef(0);

  const registerPost = useCallback((fn: (msg: RunRequest) => void) => {
    post.current = fn;
  }, []);

  const onMessage = useCallback((m: HostMessage) => {
    if (m.id === 'ready') {
      ready.current = true;
      for (const msg of queue.current) post.current?.(msg);
      queue.current = [];
      return;
    }
    const settle = (id: string, r: RunOutcome) => {
      pending.current.get(id)?.(r);
      pending.current.delete(id);
    };
    if (m.id === '*') {
      for (const id of [...pending.current.keys()]) settle(id, { ok: false, output: [], error: m.error });
      return;
    }
    settle(m.id, { ok: m.ok, output: m.output, error: friendly(m.error) });
  }, []);

  const run: Runner = useCallback((lang, code) => {
    setMounted(true);
    const id = `run${++counter.current}`;
    return new Promise<RunOutcome>((resolve) => {
      pending.current.set(id, resolve);
      const msg = { id, lang, code };
      if (ready.current && post.current) post.current(msg);
      else queue.current.push(msg);
    });
  }, []);

  return (
    <RunnerContext.Provider value={run}>
      {children}
      {mounted ? <RunnerHost onMessage={onMessage} registerPost={registerPost} /> : null}
    </RunnerContext.Provider>
  );
}

export function useCodeRunner() {
  const ctx = useContext(RunnerContext);
  if (!ctx) throw new Error('useCodeRunner must be used inside CodeRunnerProvider');
  return ctx;
}
