import type { Session } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { countsAsLesson, mergeProgress, normalize, weekStart, weekXp, type Progress } from './model';
import { useProgress } from './progress';
import { INVITE_REWARD, referralCount, registerCertificate } from '@/lib/community';
import { accountsEnabled, supabase } from '@/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export type SyncStatus = 'off' | 'syncing' | 'synced' | 'error';

type AccountApi = {
  enabled: boolean;
  session: Session | null;
  email: string | null;
  sync: SyncStatus;
  sendCode: (email: string) => Promise<string | null>;
  verifyCode: (email: string, code: string) => Promise<string | null>;
  signInWithGoogle: () => Promise<string | null>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<string | null>;
  /** Uploads the profile photo so other devices and the league can show it. Returns an error message or null. */
  uploadAvatar: (uri: string | null) => Promise<string | null>;
};

const AccountContext = createContext<AccountApi | null>(null);
const PUSH_DELAY_MS = 1500;

async function push(userId: string, state: Progress, today: string) {
  if (!supabase) return;
  const [a, b] = await Promise.all([
    // The device photo path means nothing on another phone; avatarUrl is the shared copy.
    supabase.from('learner_state').upsert({ user_id: userId, state: { ...state, avatar: null }, updated_at: new Date().toISOString() }),
    supabase.from('profiles').upsert({
      user_id: userId,
      display_name: (state.name || 'Explorer').slice(0, 24),
      total_xp: state.xp,
      week_xp: weekXp(state, today),
      week_start: weekStart(today),
      streak: state.streak,
      outfit: state.outfit,
      avatar_url: state.avatarUrl,
      bio: state.bio.slice(0, 80),
      lessons_done: Object.keys(state.completed).filter(countsAsLesson).length,
      stage_id: state.stageId,
      updated_at: new Date().toISOString(),
    }),
  ]);
  if (a.error || b.error) throw a.error ?? b.error;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const [session, setSession] = useState<Session | null>(null);
  const [sync, setSync] = useState<SyncStatus>('off');
  const pulledFor = useRef<string | null>(null);
  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  // On sign-in: pull the cloud copy once, merge it with this phone's progress, save both.
  useEffect(() => {
    if (!supabase || !userId || !progress.hydrated || pulledFor.current === userId) return;
    pulledFor.current = userId;
    setSync('syncing');
    const client = supabase;
    (async () => {
      const { data, error } = await client.from('learner_state').select('state').eq('user_id', userId).maybeSingle();
      if (error) throw error;
      const merged = data ? mergeProgress(progress.state, normalize(data.state as Partial<Progress>)) : progress.state;
      progress.replace(merged);
      await push(userId, merged, progress.today);
      setSync('synced');
    })().catch(() => setSync('error'));
    // Only re-run when the signed-in user or hydration changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, progress.hydrated]);

  // Afterwards: push changes shortly after they happen.
  useEffect(() => {
    if (!userId || pulledFor.current !== userId) return;
    const t = setTimeout(() => {
      setSync('syncing');
      push(userId, progress.state, progress.today)
        .then(() => setSync('synced'))
        .catch(() => setSync('error'));
    }, PUSH_DELAY_MS);
    return () => clearTimeout(t);
  }, [userId, progress.state, progress.today]);

  // Latest progress API for effects that should only re-run when their data changes.
  const latest = useRef(progress);
  useEffect(() => {
    latest.current = progress;
  });

  // Give certificates an online id so anyone can verify them.
  const unregistered = Object.values(progress.state.certificates)
    .filter((c) => !c.verifyId)
    .map((c) => c.stageId)
    .join(',');
  useEffect(() => {
    if (!userId || sync !== 'synced' || !unregistered) return;
    for (const c of Object.values(latest.current.state.certificates)) {
      if (c.verifyId) continue;
      registerCertificate(c.stageId).then((id) => id && latest.current.setCertificateVerifyId(c.stageId, id));
    }
  }, [userId, sync, unregistered]);

  // Reward the learner for friends who joined with their invite code since last time.
  useEffect(() => {
    if (!userId || sync !== 'synced') return;
    referralCount(userId).then((n) => {
      const credited = latest.current.state.referralsCredited;
      if (n > credited) latest.current.grantCoins((n - credited) * INVITE_REWARD, { referralsCredited: n });
    });
  }, [userId, sync]);

  const api: AccountApi = {
    enabled: accountsEnabled,
    session,
    email: session?.user.email ?? null,
    sync: userId ? sync : 'off',
    sendCode: async (email) => {
      if (!supabase) return 'Accounts are not set up yet.';
      // The email has a sign-in link (default template) and, if the template includes {{ .Token }}, a 6-digit code.
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true, emailRedirectTo: Linking.createURL('auth-callback') },
      });
      return error?.message ?? null;
    },
    verifyCode: async (email, code) => {
      if (!supabase) return 'Accounts are not set up yet.';
      const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: 'email' });
      return error?.message ?? null;
    },
    signInWithGoogle: async () => {
      if (!supabase) return 'Accounts are not set up yet.';
      const redirectTo = Linking.createURL('auth-callback');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo, skipBrowserRedirect: Platform.OS !== 'web' },
      });
      if (error) return error.message;
      if (Platform.OS === 'web' || !data.url) return null;
      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
      if (result.type !== 'success') return result.type === 'cancel' || result.type === 'dismiss' ? null : 'Google sign-in did not finish.';
      const code = Linking.parse(result.url).queryParams?.code;
      if (typeof code !== 'string') return 'Google sign-in did not return a code.';
      const exchange = await supabase.auth.exchangeCodeForSession(code);
      return exchange.error?.message ?? null;
    },
    signOut: async () => {
      pulledFor.current = null;
      await supabase?.auth.signOut();
    },
    uploadAvatar: async (uri) => {
      if (!supabase || !userId) return null;
      const bucket = supabase.storage.from('avatars');
      const path = `${userId}/avatar.jpg`;
      try {
        if (!uri) {
          await bucket.remove([path]);
          progress.setProfile({ avatarUrl: null });
          return null;
        }
        const body = await (await fetch(uri)).arrayBuffer();
        const { error } = await bucket.upload(path, body, { upsert: true, contentType: 'image/jpeg' });
        if (error) return error.message;
        // A version suffix makes other devices fetch the new photo instead of a cached one.
        progress.setProfile({ avatarUrl: `${bucket.getPublicUrl(path).data.publicUrl}?v=${Date.now()}` });
        return null;
      } catch {
        return 'Could not upload the photo. It is saved on this phone.';
      }
    },
    deleteAccount: async () => {
      if (!supabase) return null;
      // Storage files are not removed when the account row is, so delete the profile photo first.
      if (userId) {
        const bucket = supabase.storage.from('avatars');
        const { data: files } = await bucket.list(userId);
        if (files?.length) {
          const { error: photoError } = await bucket.remove(files.map((f) => `${userId}/${f.name}`));
          if (photoError) return 'Could not delete your profile photo. Nothing was deleted; please try again.';
        }
      }
      const { error } = await supabase.rpc('delete_my_account');
      if (error) return error.message;
      pulledFor.current = null;
      await supabase.auth.signOut();
      progress.reset();
      return null;
    },
  };

  return <AccountContext.Provider value={api}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used inside AccountProvider');
  return ctx;
}
