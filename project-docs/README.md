# CodeYatra project docs

Everything about how CodeYatra works, what is built, what is planned, and why.
Start here, then open whichever file you need.

> These docs are kept up to date with every change. The code is the final word;
> if a doc and the code ever disagree, the code is right and the doc needs fixing.

## Where things stand (14 Oct 2026)

| | |
|---|---|
| **Live on Google Play** | Closed test with 12+ testers since 11 Oct 2026. Production access opens about 25 Oct 2026. |
| **Latest store build** | Build 5 (v1.2.0). Build 6 not made yet. |
| **Branch in progress** | `paths-feature`: Career paths and the new onboarding (Phase 1), both built and checked. Not merged into `main` yet. |
| **Backend** | Supabase schema v1.5 (`supabase/schema.sql`). |
| **Tests** | 815 automated tests, all passing. |

## Read in this order

1. **[SRS.md](SRS.md)**: the requirements. What the app must do, numbered, with the status of each.
2. **[modules/](modules/)**: one file per feature, in plain language:

   | # | Module | What it covers |
   |---|---|---|
   | 01 | [Lessons and tracks](modules/01-lessons-and-tracks.md) | 16 tracks, 160 modules, exercise types |
   | 02 | [Practice](modules/02-practice.md) | Daily challenge, mistakes review, module practice, mock tests, projects |
   | 03 | [Code runner](modules/03-code-runner.md) | Running Python, JavaScript, SQL and web pages on the phone |
   | 04 | [Career paths](modules/04-career-paths.md) | 13 job roadmaps and the roadmap map |
   | 05 | [Onboarding](modules/05-onboarding.md) | First-run questions, path recommendation, daily goal and reminder |
   | 06 | [Accounts and sync](modules/06-accounts-and-sync.md) | Sign-in, cloud copy, deleting an account |
   | 07 | [League and safety](modules/07-league-and-safety.md) | Weekly league, XP limits, report and block, word filter |
   | 08 | [Certificates](modules/08-certificates.md) | Earning and verifying certificates |
   | 09 | [Rewards](modules/09-rewards.md) | XP, coins, streaks, shop, reminders |
   | 10 | [Community](modules/10-community.md) | Invites, classes, sharing |
   | 11 | [Ask Yatri](modules/11-ask-yatri.md) | AI hints (built, not switched on) |
   | 12 | [Privacy, feedback and telemetry](modules/12-privacy-feedback-telemetry.md) | Data collected, feedback links, Play declarations |
   | 13 | [Brand and logo](modules/13-brand-and-logo.md) | The `< Y >` logo, animated Yatri, icons and how to regenerate them |

3. **[ARCHITECTURE.md](ARCHITECTURE.md)**: how the code is organised, the tech stack, the database and how builds are made.
4. **[CHANGELOG.md](CHANGELOG.md)**: what changed, day by day, with the matching Git commits.
5. **[PLAN.md](PLAN.md)**: what is next, phase by phase, with status.
6. **[DECISIONS.md](DECISIONS.md)**: the important choices and the reasons for them.

## Other useful files in the project

| File | What it is |
|---|---|
| `README.md` (project root) | Developer setup: Supabase, Ask Yatri, GitHub Pages |
| `LAUNCH.md` | Launch checklist for steps that need your own accounts |
| `store/` | Play Store listing text, screenshots, feature graphic, data safety notes |
| `supabase/schema.sql` | The whole database, versions v1.0 to v1.5, safe to re-run |
| `docs/` | The public website on GitHub Pages: privacy policy, account deletion, certificate verification |
