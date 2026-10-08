import { useEffect, useRef } from 'react';

import { readPageMessage, type PageLog } from '@/lib/web/page';
import { colors } from '@/theme';

/** Renders a learner's page in a sandboxed iframe (scripts on, no access to the app). */
export function WebPreview({ doc, height = 260, onLog }: { doc: string; height?: number; onLog?: (log: PageLog) => void }) {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return;
      const log = readPageMessage(e.data);
      if (log) onLog?.(log);
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [onLog]);
  return (
    <iframe
      ref={ref}
      title="Your page"
      srcDoc={doc}
      sandbox="allow-scripts"
      style={{ width: '100%', height, border: `1px solid ${colors.line}`, borderRadius: 12, background: '#FFFFFF' }}
    />
  );
}
