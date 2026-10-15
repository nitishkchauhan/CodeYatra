# 08 · Certificates

## What it does
Finishing every module of a track earns a certificate in the app. When signed in, it gets an online ID so anyone can verify it, and it can be added to LinkedIn in one tap.

## How it works (schema v1.4)
1. The app asks the server function `claim_certificate(track)`.
2. The server checks the learner’s synced progress: every lesson listed for that track in `track_lessons` must be finished.
3. It issues the certificate with the name from the learner’s profile and today’s date in India time. Claiming again returns the same certificate.
4. The app can no longer insert certificates directly.
5. Anyone can open `https://nitishkchauhan.github.io/CodeYatra/verify.html?id=…` to check it.

## Keeping the server’s lesson list up to date
The list of lessons per track lives in `supabase/track-lessons.sql`, **generated from the app content**. After adding or renaming lessons:
1. `UPDATE_TRACK_SQL=1 npx jest trackLessons` regenerates the file (the test fails if it is out of date).
2. Run `supabase/track-lessons.sql` in the Supabase SQL Editor.

## Limits
Progress is reported by the phone, so a determined person could fake it, though the XP limits slow this down. Truly proving it would mean grading lessons on the server. The verify page says the certificate shows learning progress, not a proctored exam.

## Where it lives in the code
| Part | Files |
|---|---|
| Certificate screen | `src/app/certificate/[stageId].tsx` |
| Claiming, LinkedIn link | `src/lib/community.ts` |
| Verify page | `docs/verify.html` |
| Server function and tables | `supabase/schema.sql` (v1.4), `supabase/track-lessons.sql` |
| Drift test | `src/content/__tests__/trackLessons.test.ts` |
