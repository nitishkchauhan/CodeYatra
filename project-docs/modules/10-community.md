# 10 · Community: invites, classes and sharing

## Invites
- Each signed-in learner has a code like `CY4F2A9C` (Profile → Invite friends).
- A friend who enters it gets **50 coins**, and so does the inviter. One code per account.

## Classes (for teachers)
- A teacher creates a class and gets a code; students join with it.
- The teacher sees each student’s display name, photo, lessons done, streak and weekly XP. Never their email.
- Students can leave a class any time.

## Sharing
A progress card (streak, XP, lessons, certificates) can be shared as an image on WhatsApp, Instagram and more.

## Where it lives in the code
| Part | Files |
|---|---|
| Invites | `src/app/invite.tsx`, `src/lib/community.ts` (`redeemCode`, `referralCount`) |
| Classes | `src/app/classes.tsx`, `src/lib/community.ts` (`createClass`, `joinClass`, `classRoster`) |
| Share card | `src/app/share-progress.tsx`, `src/lib/capture.ts` |
| Tables and functions | `supabase/schema.sql` (v1.2: `referrals`, `classes`, `class_members`) |
