# 07 · League and safety

## Weekly league
- Top 50 learners by XP earned **this week** (Monday to Sunday), for signed-in learners.
- Tap any learner to see their card (photo or Yatri, name, weekly XP, streak, bio).

## Fair play (schema v1.3)
XP is counted on the phone, so the server limits how fast a card can rise:
- At most **2,000 XP per 24 hours**, refilling gradually. Extra XP isn’t lost; it reaches the board as the allowance refills.
- Only the current week counts, so a forged future week scores zero; the server, not the phone, stamps the time.
- Over-limit values are trimmed, never rejected, so syncing never fails.

This makes cheating slow, not impossible; fully preventing it would need lessons graded on the server.

## Report and block (schema v1.5)
- **Report** a learner for: inappropriate photo, offensive name or bio, spam, something else. Reports are anonymous; learners can’t read reports.
- **3 reports from different learners hide the profile at once** (name shows as “Learner”, no photo or bio). Only the owner can restore it from Supabase.
- **Block** removes a learner from your league; unblock under Account → Blocked learners.

Review reports in the Supabase SQL Editor:
```sql
select p.user_id, p.display_name, p.hidden, count(*) as reports, array_agg(distinct r.reason) as reasons
from public.reports r join public.profiles p on p.user_id = r.reported
group by p.user_id, p.display_name, p.hidden order by reports desc;
```
Restore after review: `update public.profiles set hidden = false where user_id = '…';`

## Word filter
Names and bios with abuse (English and Hindi, including disguises like “sh1t” or “f.u.c.k”) can’t be saved. Real names that contain those letters (Harshita, Pornima, Assam, Gandhinagar) are allowed.

## Where it lives in the code
| Part | Files |
|---|---|
| League screen | `src/app/leaderboard.tsx` |
| Learner card with report/block | `src/components/LearnerSheet.tsx` |
| Report, block, word filter | `src/lib/moderation.ts` |
| XP limits, reports, blocks, hiding | `supabase/schema.sql` (v1.3, v1.5) |

## Tests
`src/lib/__tests__/moderation.test.ts`, `src/components/__tests__/LearnerSheet.test.tsx`. The SQL was tested in a local Postgres (PGlite): 13 cases for XP limits, 13 for report/block.
