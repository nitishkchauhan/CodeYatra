// Anonymous crash reports and usage events. No user id, name or email is sent,
// and learners can switch it off in Profile. Failures here never affect the app.
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { supabase } from './supabase';

let enabled = true;
export const setTelemetryEnabled = (on: boolean) => {
  enabled = on;
};

const version = Constants.expoConfig?.version ?? 'dev';

function send(kind: 'event' | 'error', name: string, props: Record<string, string | number | boolean> = {}) {
  if (!enabled || !supabase || __DEV__) return;
  supabase
    .from('app_events')
    .insert({ kind, name: name.slice(0, 80), props, app_version: version, platform: Platform.OS })
    .then(
      () => {},
      () => {},
    );
}

/** A product event, e.g. track('lesson_complete', { lesson: 'c-hello' }). */
export const track = (name: string, props?: Record<string, string | number | boolean>) => send('event', name, props);

/** An unexpected error, with a short stack so we can find the cause. */
export function reportError(error: unknown, where: string) {
  const e = error instanceof Error ? error : new Error(String(error));
  send('error', `${where}: ${e.message}`.slice(0, 80), { stack: (e.stack ?? '').slice(0, 1200) });
}
