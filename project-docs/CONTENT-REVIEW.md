# Content standard and review checklist

Every new or rewritten module must pass this before it ships. Python Foundations and Next.js 16 are the reference tracks.

## The Lesson v2 template
| Step | What it is | Notes |
|---|---|---|
| Hook | A real situation (Indian context) and "by the end you can …" | Optional preview of the code they will write |
| 3 cards | One idea each, under 60 words | Code with comments; an interactive visual where it truly helps |
| Try it | Editable, runnable code with 2–3 ideas to change | Python or JavaScript only (the phone can run those) |
| Common mistake | Wrong code → what really happens → the fix → why | For Python the real error message (tested). For tools we can't run (Next.js), label it "an error like this (shortened)" |
| 2 quick checks | Quiz, predict the output, find the bug, tap, order | Explanations for right and wrong answers |
| Coding exercise | Write code that passes tests | Starter must fail; solution must pass (tested) |
| Recap | 3 points on the finish screen | Plus "Next" and official reading |
| Practice set | 4–5 new questions per module | Not copies of the lesson's questions |
| Checkpoint | Per roadmap section, built from the practice sets | 70% right first time = mastered |

Adapt it: a project module is a hook plus tested steps; a concept with nothing to type can skip the coding exercise. Don't add sections just to fill the template.

## Checklist (reviewer ticks every line)
- [ ] Plain English a 13-year-old can follow; every new term is explained the first time.
- [ ] Facts and code checked against the official docs for the stated version; version written in `reading`.
- [ ] Every `reading` link is official (nextjs.org, react.dev, MDN, docs.python.org), https, opens (run the link check), and has today's `reviewed` date.
- [ ] No copied text or assets from other courses or roadmap sites; no invented quotes, statistics or company interview claims.
- [ ] `npx jest src/content` passes: outputs, mistakes, try-it starters and solutions really run.
- [ ] Roadmap stops point at real lessons; no circular prerequisites (tests).
- [ ] The owner reviews the first module of each new section on a phone.

## Re-checking old content
Each `reading` entry has a `reviewed` date. When a new major version ships (e.g. Next.js 17), re-check every lesson whose reading names that version, fix what changed, and update the dates.
