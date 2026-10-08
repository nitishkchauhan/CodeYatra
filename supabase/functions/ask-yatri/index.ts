// "Ask Yatri": a hint-giving tutor. Runs on Supabase Edge Functions so the
// Anthropic API key never reaches the app. Only signed-in learners can call it,
// and each one gets a daily quota.
//
// Deploy:  supabase functions deploy ask-yatri
// Secret:  supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
import Anthropic from 'npm:@anthropic-ai/sdk';
import { createClient } from 'npm:@supabase/supabase-js@2';

const DAILY_LIMIT = 20;
const MAX_FIELD = 6000; // characters; longer input is rejected, never silently cut

const SYSTEM = `You are Yatri, a friendly coding tutor inside CodeYatra, a learning app for Indian students from Class 8 to B.Tech.
A student is stuck on an exercise. Help them get unstuck without doing the work for them.

How to answer:
- Give a hint, not the full solution. Never write the complete corrected program.
- Point to the specific line or idea that is wrong, and explain why in simple English.
- You may show one short line of code (at most one) if it is the smallest useful nudge.
- Keep it under 80 words. Warm and encouraging, never condescending.
- If the student's code is already correct, say so and suggest what to check in the instructions.
- Only discuss the exercise and programming. For anything else, kindly steer back to the lesson.`;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

type Ask = { lang?: string; title?: string; instructions?: string; code?: string; problem?: string; question?: string };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Use POST' }, 405);

  // Who is asking? The Supabase client verifies the learner's session token.
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  });
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return json({ error: 'Sign in to ask Yatri.' }, 401);

  let body: Ask;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Send JSON.' }, 400);
  }
  const fields = [body.lang, body.title, body.instructions, body.code, body.problem, body.question].map((f) => String(f ?? ''));
  if (!fields[3].trim()) return json({ error: 'There is no code to look at yet.' }, 400);
  if (fields.some((f) => f.length > MAX_FIELD)) return json({ error: 'That is too much code for one question. Ask about a smaller part.' }, 413);

  // Daily quota, counted in the database (see supabase/schema.sql: bump_ai_usage).
  const { data: used, error: quotaError } = await supabase.rpc('bump_ai_usage');
  if (quotaError) return json({ error: 'Could not check your daily limit. Try again.' }, 500);
  if ((used as number) > DAILY_LIMIT) return json({ error: `You have used all ${DAILY_LIMIT} questions for today. Yatri will be back tomorrow!` }, 429);

  const [lang, title, instructions, code, problem, question] = fields;
  const prompt = [
    `Exercise: ${title}`,
    `Language: ${lang}`,
    `Instructions: ${instructions}`,
    `Student's code:\n${code}`,
    problem ? `What went wrong (tests or errors):\n${problem}` : '',
    question ? `Student's question: ${question}` : 'The student asks: what should I fix?',
  ]
    .filter(Boolean)
    .join('\n\n');

  const client = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });
  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 4000,
      // Hints are short and simple, so low effort keeps answers fast and cheap.
      output_config: { effort: 'low' },
      // If a request is declined by a safety classifier, retry on a suitable model automatically.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });

    if (response.stop_reason === 'refusal') return json({ error: 'Yatri cannot help with that one. Try asking about your code.' }, 200);
    const hint = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    return json({ hint: hint || 'Look closely at the first failing test and compare it with the instructions.', remaining: Math.max(0, DAILY_LIMIT - (used as number)) });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json({ error: 'Yatri is busy right now. Try again in a minute.' }, 503);
    if (error instanceof Anthropic.AuthenticationError) return json({ error: 'The tutor is not set up yet.' }, 503);
    if (error instanceof Anthropic.APIError) return json({ error: 'Yatri could not answer. Try again.' }, 502);
    return json({ error: 'Something went wrong. Try again.' }, 500);
  }
});
