import { supabase } from './supabase';

export type AskInput = { lang: string; title: string; instructions: string; code: string; problem?: string; question?: string };
export type AskResult = { hint: string; remaining?: number } | { error: string };

/** Asks the AI tutor (a Supabase Edge Function) for a hint. Needs a signed-in learner. */
export async function askYatri(input: AskInput): Promise<AskResult> {
  if (!supabase) return { error: 'Accounts are not set up yet.' };
  const { data, error } = await supabase.functions.invoke('ask-yatri', { body: input });
  if (error) {
    // Non-2xx responses carry a friendly message in the JSON body.
    try {
      const body = await (error as { context?: Response }).context?.json();
      if (body?.error) return { error: String(body.error) };
    } catch {
      // fall through to the generic message
    }
    return { error: 'Yatri could not answer right now. Check your connection and try again.' };
  }
  if (data?.error) return { error: String(data.error) };
  return { hint: String(data?.hint ?? ''), remaining: typeof data?.remaining === 'number' ? data.remaining : undefined };
}
