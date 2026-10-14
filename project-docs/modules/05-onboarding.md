# 05 · Onboarding

**Status:** 🚧 new version in progress on branch `paths-feature` (Plan, Phase 1).

## Today (in store builds)
Welcome screen → name → level (School / College / Just curious) → starting track. “I already have an account” signs in instead.

## New version (being built)
Inspired by how Mimo and Enki personalise their first run, written and drawn by us:

1. **Welcome slides** (3): learn on your phone · practise with real code · get job-ready. *Get started* / *I already have an account*.
2. **Questions**, one per screen, with a progress bar and icon cards:
   - Who are you? Class 8–10 · Class 11–12 · College · Working · Other
   - Why are you learning? Placements or a job · School exams · Build apps and websites · Switch career · For fun
   - What interests you? Websites · Mobile apps · Data · AI · Automation · Not sure
   - How much time a day? 5 · 10 · 20 · 30 minutes
3. **Recommendation:** “*Software Engineer (Placements)* is the best path for you”, with its technologies, plus *See all paths*.
4. **Name**, then a **daily reminder at any time** (time picker).
5. **“Building your plan…”**, then Home with the path, the starting track and the first lesson ready.

## Rules
- Every question can be answered with one tap; no typing except the name.
- The recommendation is a suggestion; learners can pick any path or none.
- No fake numbers (learner counts, reviews) anywhere.

## Where it lives in the code
`src/app/onboarding.tsx` today. The new version’s files are listed here once built.
