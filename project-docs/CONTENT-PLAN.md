# Content plan: fewer subjects, done properly

**Status:** 📋 proposal, 15 Oct 2026. Waiting for the owner’s decisions (end of this page).

## 1. The problem (audit, 15 Oct 2026)
| | Today |
|---|---|
| Tracks | 16 (Logic, CBSE, HTML, CSS, JS, Python, C, Java, React, Node, Next.js, DSA, DSA Advanced, SQL, Git, Placement) |
| Each module | **1 short reading card + 2 exercises** (~3 steps, ~150 words) |
| A whole track | ~1,400–2,300 words: about one blog post |
| Practice sets | Python only |
| Career paths | 13, many stops only link to outside websites |

We cover a lot of subjects thinly. A learner can finish “Python” in an evening and still can’t write a program. That hurts trust, reviews and retention.

## 2. What is in demand (sources at the end)
| Signal | What it means for us |
|---|---|
| **AI/ML hiring in India +20% a year** (Naukri JobSpeak, Sept 2026); fresher AI/ML hiring in IT +19% while overall fresher hiring grew ~1% | AI is the fastest-growing door for freshers |
| AI skills in **15.4% of tech job posts** (Naukri, 2026), up from 0.9% in 2020 | Every path needs “use AI in your work” |
| **Python** is the most requested skill in AI job posts; fastest-growing language in the Stack Overflow 2025 survey | Python is the shared foundation |
| **JavaScript, HTML/CSS, SQL** are the most used languages by professional developers (Stack Overflow 2025) | Web and SQL stay |
| Campus hiring is active, but most students are unplaced | Placement prep (DSA + aptitude + mocks) is a real need |
| GenAI fresher roles ask for Python, LLMs, APIs, RAG, FastAPI/Flask | A practical “build AI apps” path is credible |

## 3. The decision: 4 flagship paths + 1 school path
Everything in the app hangs off these. **Each path is one complete course, shown as its roadmap.**

| Path | Who it’s for | What it teaches (in the app) | Ends with |
|---|---|---|---|
| **Python Foundations** (shared start) | Everyone | Variables → conditions → loops → lists → dictionaries → functions → files → errors → classes → problem solving | A small project and certificate |
| **Data Analyst** | College, career switchers | Python Foundations → SQL (select to joins, group by, window basics) → pandas → charts → Excel/Sheets thinking → 2 portfolio projects | Portfolio + certificate |
| **AI Engineer (GenAI apps)** | College, curious, switchers | Python Foundations → APIs and JSON → prompting → calling an AI model → chat app → RAG over your own notes → evaluation and safety | A working AI app project |
| **Web Developer** | School and college | HTML → CSS (layout, responsive) → JavaScript (DOM, events, fetch) → React basics → deploy a site | Portfolio site |
| **Placement Prep** | Final-year students | DSA in Python (arrays to graphs, patterns) → aptitude and output questions → timed mocks (already built) | Mock score report |
| **CBSE Computer Science** (school) | Class 11–12 | Reuses Python Foundations + SQL modules, mapped to the CBSE syllabus chapters | Board-style practice |

**Paused (hidden, not deleted):** C, Java, Node.js, Next.js, Git as a track (Git becomes one module inside Web), DSA Advanced (merged into Placement Prep), and the 8 other career paths (Backend, Full-Stack, Data Scientist, Android, DevOps, Security, QA, separate Python Dev). They come back only when written to the new standard.

## 4. The new module standard (“Lesson v2”)
Every module is **5–8 minutes** and follows the same shape:
1. **Hook**: a real Indian situation (“Your college canteen wants to know which snack sells most”).
2. **Learn in small cards**: 3–4 cards of 40–80 words each, every card with code that animates or that you tap to run.
3. **Try it**: change the code and run it straight away (no quiz yet).
4. **Common mistake**: Yatri shows one error beginners really make and why.
5. **Check**: 2 quick questions (predict the output, fill the gap).
6. **Practise**: 3–5 exercises with auto-checked answers (the module’s Practise set).
7. **Recap**: 3 bullet points and what’s next on the roadmap.

Each section of a path ends with a **checkpoint** (10 questions) and each path with a **project** you build and share. ~400–600 words of reading per module, split into cards, never walls of text.

**Quality bar for every module (checked before it ships):** a test runs every exercise’s answer; plain English for a 13-year-old; one idea per card; the owner reviews the first module of each new section.

## 5. The roadmap is the course
- Onboarding picks a path (already built); **Home’s “Your journey” shows the path’s modules in order**, across languages (e.g. Data Analyst: Python 1–10, then SQL 1–12, then pandas…).
- The **Paths tab** shows only the 5 paths, each as its roadmap with real progress.
- Every stop on a roadmap is a module in the app. No stop is just an outside link (outside links become “Go deeper” extras).
- Tracks remain under the hood; learners mostly see their path.

## 6. Order of work (each phase ships in a build)
| Phase | What | Size |
|---|---|---|
| **A** | Hide paused tracks and paths; Home and Paths built around the 5 paths; Lesson v2 format in the app | ~3–4 days |
| **B** | **Python Foundations** rewritten to Lesson v2 (12 modules + project) | ~1 week |
| **C** | **Data Analyst**: SQL (12 modules) + pandas and charts (8) + 2 projects | ~1.5 weeks |
| **D** | **AI Engineer**: APIs, prompting, AI chat app, RAG (10 modules + project) | ~1.5 weeks |
| **E** | **Web Developer**: HTML, CSS, JavaScript, React (rewritten, ~30 modules + site project) | ~2 weeks |
| **F** | **Placement Prep**: DSA in Python (~20 modules) + aptitude; mocks already exist | ~2 weeks |
| **G** | CBSE mapping (reuses B and C) | ~2 days |

Phases A + B fit before the production application (~25 Oct). Learners keep all progress: modules they finished stay finished.

## 7. Decisions needed from the owner
1. Agree to the **5 paths** (Python Foundations, Data Analyst, AI Engineer, Web Developer, Placement Prep) + CBSE?
2. **Hide** C, Java, Node, Next.js and the 8 other paths now (before production), and bring them back later?
3. Start with **Phase A + B** (structure + Python Foundations rewritten)?
4. The AI Engineer path needs an AI model to call in lessons. Plan: lessons **simulate** the AI responses (no cost); the real call stays with “Ask Yatri”, which is switched on later.

## Sources
- [Stack Overflow Developer Survey 2025: Technology](https://survey.stackoverflow.co/2025/technology/) (via [summary](https://ssojet.com/news/2025-developer-trends-top-programming-languages-and-ai-insights), [i-programmer](https://www.i-programmer.info/news/99-professional/18213-what-does-stack-overflows-survey-tell-us.html))
- [Naukri: AI jobs in India 2026](https://www.naukri.com/campus/career-guidance/ai-jobs-in-india)
- [AI/ML jobs in India up 20%: Naukri JobSpeak, Sept 2026](https://www.successcds.net/career/qna/ai-ml-jobs-in-india-jump-20-percent), [CareerBeacon](https://thecareerbeacon.in/ai-ml-hiring-india-jobs-2026/)
- [AI skills in 15.4% of tech job descriptions: Naukri report](https://telanganatoday.com/ai-skills-feature-in-15-4-per-cent-of-tech-job-descriptions-naukri-report), [Daily Pioneer](https://dailypioneer.com/news/ai-skill-demand-rises-over-17fold-in-technology-jobs-says-report)
- [Unstop: State of campus hiring in India](https://unstop.com/blog/state-of-campus-hiring-india-report)
- [FACE Prep: 2026 AI roadmap for engineering students](https://faceprep.in/article/the-2026-ai-roadmap-for-indian-engineering-students/)
