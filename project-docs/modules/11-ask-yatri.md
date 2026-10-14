# 11 · Ask Yatri (AI hints)

**Status:** ⏸ built, **not switched on**. Agreed to switch it on last.

## What it does
When a learner is stuck on a coding exercise, **Ask Yatri** sends the exercise, their code and the failing checks to Claude, which replies with a **hint, never the full answer**.

## How it works
- The app calls a Supabase Edge Function (`ask-yatri`); the API key lives only on the server.
- Each signed-in learner gets **20 questions a day** (`DAILY_LIMIT`).
- The learner’s name and email are never sent to the AI.

## To switch it on (owner does this; never share the key)
1. Create an API key at console.anthropic.com.
2. From the project folder:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR-PROJECT-REF
   npx supabase secrets set ANTHROPIC_API_KEY=your-key
   npx supabase functions deploy ask-yatri
   ```
3. Add the “Ask Yatri” section back to the Play Store description (`store/listing-en.md`).

## Cost idea
Later, rewarded ads (“watch an ad for 3 more hints”) can pay for the AI usage.

## Where it lives in the code
`src/components/AskYatri.tsx`, `src/lib/askYatri.ts`, `supabase/functions/ask-yatri/index.ts`, `ai_usage` table in `supabase/schema.sql`.
