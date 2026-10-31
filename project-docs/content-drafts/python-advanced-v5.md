# Python Advanced in Lesson v5 · content record

**Status:** built on `lesson-v3` in `src/content/tracks/pythonV5a/`, 31 Oct 2026. The plan was approved in `python-intermediate-v5.md` (decision 5: “then Python Advanced in v5 … the same way”), and the owner asked to build it straight away (“lets implement next module”). This file records what was built.

**Shape:** the same as Python Intermediate. 6 modules of 3 short lessons, a Module Challenge each, and the final project as the last challenge. Story: Brightline Studio (Felix, Megan) builds City Travel Desk’s booking service. The six topics of the old Advanced level are kept; the first lesson of each module and the project keep their old ids.

| Module | Lessons | Challenge badge |
|---|---|---|
| **1 · Testing** | 1.1 assert and test functions (`py-testing`) · 1.2 unittest · 1.3 Edge cases and test-first | 🧪 Tester |
| **2 · Debugging and logging** | 2.1 Reading a traceback (`py-debugging`) · 2.2 Finding the bug · 2.3 Logging | 🐞 Bug Hunter |
| **3 · APIs and HTTP** | 3.1 Requests and status codes (`py-apis`) · 3.2 Timeouts and retries · 3.3 Sending data: POST and JSON | 🌐 API Pro |
| **4 · Generators and big data** | 4.1 yield (`py-generators`) · 4.2 Generator pipelines · 4.3 itertools | 🚰 Stream Master |
| **5 · Decorators and caching** | 5.1 Functions are values (`py-decorators`) · 5.2 Writing a decorator · 5.3 Caching | 🎁 Decorator Pro |
| **6 · Clean code** | 6.1 Names and small functions (`py-clean-code`) · 6.2 Errors that help (own exceptions) · 6.3 Context managers | 🏆 **Final project: a tested booking service** (`py-a-project`; 4 checked steps: validated model, never overbook, cancel, prove it with tests) |

**Choices made while building:**
- API lessons use a small `get()`/`post()` inside each program in place of a real server, so they work offline and give the same answer every time; `requests` is shown in Explore and Tap to reveal.
- Logging lessons log to the screen (`stream=sys.stdout`, `force=True`), so each run shows its own lines.
- unittest lessons print the counts of tests run and failed, not the runner’s timing line.
- Type hints and dataclasses moved to Intermediate, so Clean code now covers names, small functions, early returns, custom exceptions and context managers.
