// Online features that need an account: certificate verification, invites and classes.
import { supabase } from './supabase';

/** Public page that verifies a certificate by id (hosted with GitHub Pages from /docs). */
export const VERIFY_BASE = 'https://nitishkchauhan.github.io/CodeYatra/verify.html';
export const verifyUrl = (id: string) => `${VERIFY_BASE}?id=${id}`;
export const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.codeyatra.app';
export const INVITE_REWARD = 50;

/** Registers a certificate online (once) and returns its verification id. */
export async function registerCertificate(userId: string, stageId: string, name: string, date: string): Promise<string | null> {
  if (!supabase) return null;
  // Certificates are never edited once issued, so look first and only insert when missing.
  const existing = await supabase.from('certificates').select('id').eq('user_id', userId).eq('stage_id', stageId).maybeSingle();
  if (existing.data) return existing.data.id as string;
  const { data, error } = await supabase.from('certificates').insert({ user_id: userId, stage_id: stageId, name: name.slice(0, 24), issued_on: date }).select('id').single();
  return error ? null : (data.id as string);
}

/** LinkedIn's "Add licence or certification" form, pre-filled. */
export function linkedInUrl(o: { title: string; date: string; verifyId: string }) {
  const [y, m] = o.date.split('-');
  const q = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: o.title,
    organizationName: 'CodeYatra',
    issueYear: y,
    issueMonth: String(Number(m)),
    certUrl: verifyUrl(o.verifyId),
    certId: o.verifyId,
  });
  return `https://www.linkedin.com/profile/add?${q.toString()}`;
}

export async function myReferralCode(userId: string): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('profiles').select('referral_code').eq('user_id', userId).maybeSingle();
  return (data?.referral_code as string | undefined) ?? null;
}

export async function referralCount(userId: string): Promise<number> {
  if (!supabase) return 0;
  const { count } = await supabase.from('referrals').select('invitee', { count: 'exact', head: true }).eq('inviter', userId);
  return count ?? 0;
}

export type RedeemResult = 'ok' | 'own' | 'used' | 'unknown' | 'error';
export async function redeemCode(code: string): Promise<RedeemResult> {
  if (!supabase) return 'error';
  const { data, error } = await supabase.rpc('redeem_referral', { code });
  return error ? 'error' : (data as RedeemResult);
}

export type ClassRow = { id: string; code: string; name: string; teacher_id: string };
export type RosterRow = { display_name: string; avatar_url: string | null; total_xp: number; week_xp: number; streak: number; lessons_done: number; stage_id: string | null; updated_at: string };

export async function myClasses(userId: string): Promise<{ teaching: ClassRow[]; joined: ClassRow[] }> {
  if (!supabase) return { teaching: [], joined: [] };
  const { data } = await supabase.from('classes').select('id, code, name, teacher_id').order('created_at', { ascending: false });
  const rows = (data ?? []) as ClassRow[];
  return { teaching: rows.filter((c) => c.teacher_id === userId), joined: rows.filter((c) => c.teacher_id !== userId) };
}

export async function createClass(name: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('create_class', { class_name: name });
  return error ? null : (data as string);
}

export async function joinClass(code: string): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('join_class', { class_code: code });
  return error ? null : ((data as string | null) ?? null);
}

export async function leaveClass(classId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('class_members').delete().eq('class_id', classId).eq('user_id', userId);
  return !error;
}

export async function classRoster(classId: string): Promise<RosterRow[]> {
  if (!supabase) return [];
  const { data } = await supabase.rpc('class_roster', { class_id: classId });
  return (data ?? []) as RosterRow[];
}
