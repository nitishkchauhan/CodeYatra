# Play Console: App content answers

Answers match what the app actually does in v1.1. Update this file if features change.

## Data safety

**Does your app collect or share any of the required user data types?** Yes (only when the learner signs in).

**Is all data encrypted in transit?** Yes (HTTPS to Supabase).

**Can users request that data be deleted?** Yes: Profile → Account → Delete account removes the account and all data immediately.

| Data type | Collected | Shared | Purpose | Optional? |
| --- | --- | --- | --- | --- |
| Personal info → Email address | Yes, when signing in | No | Account management | Yes (guest mode works without it) |
| Personal info → Name | Yes (display name) | No | App functionality (league) | Yes |
| Photos → Photos | Yes, only if the learner uploads a profile photo while signed in | No | App functionality | Yes |
| App activity → App interactions | Yes (lesson progress, XP, streak) | No | App functionality | Yes (stays on device for guests) |

Not collected: location, contacts, phone number, financial info, health, messages, audio, files, calendar, device IDs, advertising ID. There are **no ads and no analytics SDKs**.

## Other declarations

- **Ads**: No ads.
- **App access**: All features work without signing in (guest mode). No special access instructions needed.
- **Content rating**: Educational; no violence, gambling, user-to-user chat or user-generated content shared publicly except display name and profile photo on the weekly league.
- **Target audience**: 13–15, 16–17, 18+. (Do not select under 13 without reviewing the Families policy.)
- **News app**: No.
- **Government app**: No.
- **Financial features**: None.
- **Health**: None.
- **Permissions used**: Notifications (daily reminder), Camera and Photos (only when choosing a profile picture), Internet.
