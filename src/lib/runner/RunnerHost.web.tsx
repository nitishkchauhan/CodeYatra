import { useEffect, useRef } from 'react';

import { RUNNER_HTML } from './host';
import type { HostMessage, HostProps } from './types';

/** Hidden iframe that hosts the code sandbox on web. */
export function RunnerHost({ onMessage, registerPost }: HostProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.source === ref.current?.contentWindow && e.data?.__codeyatra) onMessage(e.data as HostMessage);
    };
    window.addEventListener('message', listener);
    registerPost((msg) => ref.current?.contentWindow?.postMessage({ __codeyatraRun: true, msg }, '*'));
    return () => window.removeEventListener('message', listener);
  }, [onMessage, registerPost]);

  return (
    <iframe
      ref={ref}
      title="Code runner"
      srcDoc={RUNNER_HTML}
      sandbox="allow-scripts allow-same-origin"
      aria-hidden
      style={{ position: 'absolute', width: 1, height: 1, opacity: 0, border: 0, left: -10, top: -10 }}
    />
  );
}
