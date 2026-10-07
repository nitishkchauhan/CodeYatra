import type { RunLang } from './harness';

export type RunRequest = { id: string; lang: RunLang; code: string };
export type HostMessage = { id: string; ok: boolean; output: string[]; error?: string; pyReady?: boolean };
export type HostProps = {
  onMessage: (msg: HostMessage) => void;
  registerPost: (post: (msg: RunRequest) => void) => void;
};
