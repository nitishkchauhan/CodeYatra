// Keeping the league safe: report and block learners, and a word filter for names and bios.
import { supabase } from './supabase';

export type ReportReason = 'photo' | 'name' | 'spam' | 'other';

export const REPORT_REASONS: { id: ReportReason; label: string }[] = [
  { id: 'photo', label: 'Inappropriate photo' },
  { id: 'name', label: 'Offensive name or bio' },
  { id: 'spam', label: 'Spam or fake account' },
  { id: 'other', label: 'Something else' },
];

const DUPLICATE = '23505';

/** Reports a learner's profile. Reporting the same learner twice counts once. Returns an error message or null. */
export async function reportLearner(userId: string, reason: ReportReason): Promise<string | null> {
  if (!supabase) return 'Sign in to report a profile.';
  const { error } = await supabase.from('reports').insert({ reported: userId, reason });
  return error && error.code !== DUPLICATE ? 'Could not send the report. Check your connection and try again.' : null;
}

export async function blockLearner(userId: string): Promise<string | null> {
  if (!supabase) return 'Sign in to block a learner.';
  const { error } = await supabase.from('blocks').insert({ blocked: userId });
  return error && error.code !== DUPLICATE ? 'Could not block this learner. Check your connection and try again.' : null;
}

export async function unblockLearner(userId: string): Promise<string | null> {
  if (!supabase) return null;
  const { error } = await supabase.from('blocks').delete().eq('blocked', userId);
  return error ? 'Could not unblock. Check your connection and try again.' : null;
}

/** Ids of learners this account has blocked (row-level security returns only your own). */
export async function blockedIds(): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase.from('blocks').select('blocked');
  return (data ?? []).map((r) => r.blocked as string);
}

export async function blockedLearners(): Promise<{ user_id: string; display_name: string }[]> {
  const ids = await blockedIds();
  if (!supabase || !ids.length) return [];
  const { data } = await supabase.from('profiles').select('user_id, display_name').in('user_id', ids);
  return (data ?? []) as { user_id: string; display_name: string }[];
}

// Abuse that is never fine in a name or bio (English and Hindi, as typed in Roman script).
// Short words only match as whole words, so names like Harshita, Pornima or Dickens are fine.
const WHOLE_WORDS = [
  'ass',
  'dick',
  'cock',
  'cunt',
  'slut',
  'whore',
  'sex',
  'sexy',
  'porn',
  'porno',
  'nude',
  'rape',
  'shit',
  'shitty',
  'bullshit',
  'chut',
  'choot',
  'lund',
  'lauda',
  'loda',
  'laude',
  'gand',
  'randi',
  'kutiya',
  'harami',
  'kamina',
  'kamine',
];
// Long enough that they never appear inside a real name, so they match anywhere in a word.
const INSIDE_WORDS = [
  'fuck',
  'bitch',
  'bastard',
  'asshole',
  'nigger',
  'nigga',
  'faggot',
  'chutiya',
  'chutia',
  'chootiya',
  'chootia',
  'madarchod',
  'behenchod',
  'bhenchod',
  'betichod',
  'bhosd',
  'gandu',
  'lavda',
];

const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', $: 's', '!': 'i' };

/** True when the text contains abusive words, including simple disguises like "sh1t" or "f.u.c.k". */
export function hasBlockedWords(text: string): boolean {
  const plain = text.toLowerCase().replace(/[013457@$!]/g, (c) => LEET[c]);
  const words = plain.split(/[^a-z]+/).filter(Boolean);
  // Letters typed one at a time ("f u c k", "s.h.i.t") are joined back into a word.
  const spelled: string[] = [];
  let run = '';
  for (const w of [...words, '']) {
    if (w.length === 1) run += w;
    else {
      if (run.length >= 3) spelled.push(run);
      run = '';
    }
  }
  return [...words, ...spelled].some((w) => WHOLE_WORDS.includes(w) || INSIDE_WORDS.some((bad) => w.includes(bad)));
}
