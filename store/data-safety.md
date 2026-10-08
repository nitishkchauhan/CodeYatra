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
| App activity → App interactions (anonymous events) | Yes, not linked to the user | No | Analytics | Yes (Profile → Help improve CodeYatra) |
| App info and performance → Crash logs | Yes, not linked to the user | No | Analytics | Yes (same switch) |
| App activity → Other user-generated content (code sent to Ask Yatri) | Yes, only when the learner taps Ask Yatri | Yes, with Anthropic (AI service provider) to generate the hint | App functionality | Yes |

Not collected: location, contacts, phone number, financial info, health, messages, audio, files, calendar, device IDs, advertising ID. There are **no ads and no third-party analytics SDKs**; anonymous events go to our own Supabase database.

Note for "Data shared": sending data to a service provider that processes it on our behalf (Anthropic for AI hints) may not count as "sharing" under Play's definitions, but declaring it is the safer choice.

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
- **AI-generated content**: Ask Yatri produces AI-written hints. Play's AI-generated content policy applies: hints are limited to the exercise, and users can report problems via the support email.
