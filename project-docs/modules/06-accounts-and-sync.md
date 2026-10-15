# 06 · Accounts and sync

## What it does
Accounts are **optional**. Everything about learning works as a guest, offline. Signing in adds sync across phones, the weekly league, certificates with verify links, invites and classes.

## How it works
- **Sign-in:** email + a 6–10 digit code sent by Supabase (email OTP). Google sign-in is built but **switched off** until a Google OAuth client is set up in Supabase (`EXPO_PUBLIC_GOOGLE_SIGNIN=on`).
- **Sync:** the whole progress object is saved on the phone and, when signed in, as one row in `learner_state`. A public card (name, photo, bio, XP, streak) goes to `profiles`.
- **Merging two phones:** finished lessons, ticks and items are combined; daily XP takes the higher value; the more recent streak wins; the newer copy decides settings. Nothing is lost.
- **Delete account:** Profile → Account → Delete account removes the photo first, then the account, which deletes every row (cascade). Web instructions: `docs/delete-account.html`. Email requests to `codeyatra.support@gmail.com` are handled within 7 days (Supabase → Authentication → Users → Delete user).

## Where it lives in the code
| Part | Files |
|---|---|
| Account provider, push/pull, delete | `src/state/account.tsx` |
| Progress model and merge | `src/state/model.ts` (`mergeProgress`, `normalize`) |
| Saved progress (on phone) | `src/state/progress.tsx` (AsyncStorage key `codeyatra/progress/v1`) |
| Sign-in screens | `src/app/account.tsx`, `src/app/auth-callback.tsx` |
| Supabase client | `src/lib/supabase.ts` (URL and publishable key from env) |
| Tables and rules | `supabase/schema.sql` (`learner_state`, `profiles`) |

## Tests
`src/state/__tests__/model.test.ts` (merging), `progress.test.tsx` (saving, rewards, persistence).
