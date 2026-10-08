// Guided projects: build something real across several steps. Each step starts
// from the previous step's solution, so learners watch their project grow.
import { read } from './dsl';
import type { EditorStep, Lesson, WebStep } from './types';

const web = (o: Omit<WebStep, 'type'>): WebStep => ({ type: 'web', ...o });
const code = (o: Omit<EditorStep, 'type'>): EditorStep => ({ type: 'editor', ...o });

/* ---------- 1. Portfolio page ---------- */

const P1 = '<header>\n  <h1>Asha Verma</h1>\n  <p>Student · Future developer</p>\n</header>\n';
const P2 =
  P1 +
  '<section>\n  <h2>Skills</h2>\n  <ul>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>Python</li>\n  </ul>\n</section>\n';
const P3_CSS = 'body {\n  background: #F6F5FA;\n}\nheader {\n  background: #4B3FD8;\n  color: white;\n  padding: 24px;\n  border-radius: 16px;\n}\n';
const P4_HTML = P2 + '<button id="hello">Say hello</button>\n<p id="msg"></p>\n';
const P4_JS = 'const btn = document.querySelector("#hello");\nbtn.addEventListener("click", () => {\n  document.querySelector("#msg").textContent = "Thanks for visiting!";\n});\n';

export const PORTFOLIO: Lesson = {
  id: 'proj-portfolio',
  title: 'Your portfolio page',
  kind: 'project',
  minutes: 15,
  skill: 'html',
  learned: ['Structured a real page with semantic HTML', 'Styled it with CSS', 'Made it interactive with JavaScript'],
  steps: [
    read({
      kicker: 'PROJECT · PORTFOLIO',
      title: 'Build a page about you',
      body: 'In four steps you will build a personal portfolio page: a header, a skills list, colours, and a button that reacts. Every step shows a live preview. Use your own name!',
      tip: 'Share a screenshot of the finished page with your friends.',
    }),
    web({
      kicker: 'STEP 1 OF 4 · HTML',
      title: 'The header',
      instructions: 'Inside <header>, add an <h1> with your name and a <p> with one line about you.',
      starter: { html: '<header>\n\n</header>\n' },
      solution: { html: P1 },
      checks: [
        { label: 'There is a <header>', file: 'html', pattern: /<header>[\s\S]*<\/header>/ },
        { label: 'The header has an <h1> with your name', file: 'html', pattern: /<header>[\s\S]*<h1>[^<]{2,}<\/h1>/ },
        { label: 'The header has a <p> about you', file: 'html', pattern: /<header>[\s\S]*<p>[^<]{3,}<\/p>[\s\S]*<\/header>/ },
      ],
      hint: '<h1>Your Name</h1>\n<p>Student · Future developer</p>',
    }),
    web({
      kicker: 'STEP 2 OF 4 · HTML',
      title: 'Your skills',
      instructions: 'Below the header, add a <section> with an <h2>Skills</h2> and a <ul> of at least three <li> skills.',
      starter: { html: P1 },
      solution: { html: P2 },
      checks: [
        { label: 'A <section> with an <h2>', file: 'html', pattern: /<section>[\s\S]*<h2>[^<]+<\/h2>/ },
        { label: 'A list with at least three skills', file: 'html', pattern: /<ul>(\s*<li>[^<]+<\/li>){3,}\s*<\/ul>/ },
      ],
      hint: '<section>\n  <h2>Skills</h2>\n  <ul>\n    <li>HTML</li>\n    ...\n  </ul>\n</section>',
    }),
    web({
      kicker: 'STEP 3 OF 4 · CSS',
      title: 'Make it yours',
      instructions: 'Give the header a coloured background, white text, padding and rounded corners.',
      starter: { html: P2, css: 'body {\n  background: #F6F5FA;\n}\n' },
      solution: { html: P2, css: P3_CSS },
      checks: [
        { label: 'header has a background colour', file: 'css', pattern: /header\s*\{[^}]*background:/ },
        { label: 'header text is white', file: 'css', pattern: /header\s*\{[^}]*\bcolor:\s*(white|#fff\b|#ffffff)/i },
        { label: 'header has padding', file: 'css', pattern: /header\s*\{[^}]*padding:/ },
        { label: 'header has rounded corners', file: 'css', pattern: /header\s*\{[^}]*border-radius:/ },
      ],
      hint: 'header {\n  background: #4B3FD8;\n  color: white;\n  padding: 24px;\n  border-radius: 16px;\n}',
    }),
    web({
      kicker: 'STEP 4 OF 4 · JAVASCRIPT',
      title: 'Say hello',
      instructions: 'When #hello is clicked, set the text of #msg to a thank-you message. Tap the button in the preview to test it.',
      starter: { html: P4_HTML, css: P3_CSS, js: '// find the button, then listen for "click"\n' },
      solution: { html: P4_HTML, css: P3_CSS, js: P4_JS },
      checks: [
        { label: 'Finds the #hello button', file: 'js', pattern: /querySelector\(\s*["']#hello["']\s*\)|getElementById\(\s*["']hello["']\s*\)/ },
        { label: 'Listens for click', file: 'js', pattern: /addEventListener\(\s*["']click["']/ },
        { label: 'Changes the text of #msg', file: 'js', pattern: /#msg|["']msg["'][\s\S]*textContent|textContent/ },
      ],
      hint: P4_JS,
    }),
  ],
};

/* ---------- 2. To-do app ---------- */

const T_HTML = '<h1>My tasks</h1>\n<input id="task" placeholder="New task">\n<button id="add">Add</button>\n<ul id="list"></ul>\n<p id="count">0 tasks</p>\n';
const T_CSS = 'body {\n  max-width: 420px;\n}\nli {\n  padding: 8px;\n  border-bottom: 1px solid #ddd;\n}\n';
const T_JS1 = 'const input = document.querySelector("#task");\nconst list = document.querySelector("#list");\n\ndocument.querySelector("#add").addEventListener("click", () => {\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  list.appendChild(li);\n});\n';
const T_JS2 =
  'const input = document.querySelector("#task");\nconst list = document.querySelector("#list");\n\ndocument.querySelector("#add").addEventListener("click", () => {\n  if (input.value.trim() === "") return;\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  list.appendChild(li);\n  input.value = "";\n});\n';
const T_JS3 =
  'const input = document.querySelector("#task");\nconst list = document.querySelector("#list");\nconst count = document.querySelector("#count");\n\nfunction update() {\n  count.textContent = list.children.length + " tasks";\n}\n\ndocument.querySelector("#add").addEventListener("click", () => {\n  if (input.value.trim() === "") return;\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  li.addEventListener("click", () => {\n    li.remove();\n    update();\n  });\n  list.appendChild(li);\n  input.value = "";\n  update();\n});\n';

export const TODO: Lesson = {
  id: 'proj-todo',
  title: 'A to-do app',
  kind: 'project',
  minutes: 15,
  skill: 'js',
  learned: ['Created elements with JavaScript', 'Handled empty input', 'Kept a counter in sync with the page'],
  steps: [
    read({
      kicker: 'PROJECT · TO-DO APP',
      title: 'Your first real web app',
      body: 'You will build a to-do list: type a task, add it, tap it when done. This is the same pattern behind chat apps and shopping carts: read input, change the page, keep counts in sync.',
      tip: 'Test every step by using the preview like a real user.',
    }),
    web({
      kicker: 'STEP 1 OF 3 · JAVASCRIPT',
      title: 'Add tasks',
      instructions: 'When Add is clicked, create an <li> with the input\'s text and append it to #list.',
      starter: { html: T_HTML, css: T_CSS, js: 'const input = document.querySelector("#task");\nconst list = document.querySelector("#list");\n\n// listen for clicks on #add\n' },
      solution: { html: T_HTML, css: T_CSS, js: T_JS1 },
      checks: [
        { label: 'Listens for clicks on #add', file: 'js', pattern: /#add["']\s*\)\s*\.addEventListener\(\s*["']click["']/ },
        { label: 'Creates an <li>', file: 'js', pattern: /createElement\(\s*["']li["']\s*\)/ },
        { label: 'Uses the input\'s value', file: 'js', pattern: /input\.value/ },
        { label: 'Adds it to the list', file: 'js', pattern: /list\.(appendChild|append)\(/ },
      ],
      hint: 'const li = document.createElement("li");\nli.textContent = input.value;\nlist.appendChild(li);',
    }),
    web({
      kicker: 'STEP 2 OF 3 · JAVASCRIPT',
      title: 'No empty tasks',
      instructions: 'Ignore clicks when the input is empty (after trimming spaces), and clear the input after adding.',
      starter: { html: T_HTML, css: T_CSS, js: T_JS1 },
      solution: { html: T_HTML, css: T_CSS, js: T_JS2 },
      checks: [
        { label: 'Skips empty input', file: 'js', pattern: /input\.value\.trim\(\)\s*===?\s*["']{2}|!input\.value\.trim\(\)/ },
        { label: 'Clears the input after adding', file: 'js', pattern: /input\.value\s*=\s*["']{2}/ },
      ],
      hint: 'if (input.value.trim() === "") return;\n...\ninput.value = "";',
    }),
    web({
      kicker: 'STEP 3 OF 3 · JAVASCRIPT',
      title: 'Done and counted',
      instructions: 'Tapping a task removes it. Keep #count showing how many tasks are in the list, e.g. "2 tasks".',
      starter: { html: T_HTML, css: T_CSS, js: T_JS2 },
      solution: { html: T_HTML, css: T_CSS, js: T_JS3 },
      checks: [
        { label: 'Tapping a task removes it', file: 'js', pattern: /li\.addEventListener\(\s*["']click["'][\s\S]*li\.remove\(\)/ },
        { label: 'The count uses the number of tasks', file: 'js', pattern: /children\.length|querySelectorAll\(\s*["']li["']\s*\)\.length/ },
        { label: 'Writes the count into #count', file: 'js', pattern: /#count[\s\S]*textContent|count\.textContent/ },
      ],
      hint: 'function update() {\n  count.textContent = list.children.length + " tasks";\n}',
    }),
  ],
};

/* ---------- 3. Quiz game (JavaScript) ---------- */

const Q_DATA = 'const questions = [\n  { q: "2 + 2", a: "4" },\n  { q: "Capital of India", a: "New Delhi" },\n  { q: "HTML tag for a link", a: "a" },\n];\n';
const Q1 = Q_DATA + '\nfunction isCorrect(question, answer) {\n  return answer.trim().toLowerCase() === question.a.toLowerCase();\n}\n';
const Q2 = Q1 + '\nfunction score(answers) {\n  let total = 0;\n  for (let i = 0; i < questions.length; i++) {\n    if (isCorrect(questions[i], answers[i] ?? "")) total++;\n  }\n  return total;\n}\n';
const Q3 = Q2 + '\nfunction result(answers) {\n  const s = score(answers);\n  const pct = Math.round((s / questions.length) * 100);\n  return `${s}/${questions.length} (${pct}%)` + (pct === 100 ? " Perfect!" : "");\n}\n';

export const QUIZ_GAME: Lesson = {
  id: 'proj-quiz',
  title: 'Quiz game logic',
  kind: 'project',
  minutes: 12,
  skill: 'js',
  learned: ['Compared answers fairly', 'Scored a list of answers', 'Formatted a result message'],
  steps: [
    read({
      kicker: 'PROJECT · QUIZ GAME',
      title: 'The brain of a quiz app',
      body: 'Every quiz app needs the same logic: check one answer, count the score, show a result. You will write all three as tested functions.',
      lang: 'javascript',
      code: ['questions[0]  // { q: "2 + 2", a: "4" }'],
    }),
    code({
      kicker: 'STEP 1 OF 3 · JAVASCRIPT',
      title: 'Check one answer',
      instructions: 'isCorrect(question, answer) returns true when the answer matches, ignoring case and extra spaces.',
      lang: 'javascript',
      file: 'quiz.js',
      starter: Q_DATA + '\nfunction isCorrect(question, answer) {\n  return answer === question.a;\n}\n',
      tests: [
        { call: 'isCorrect(questions[1], "  new delhi ")', expect: 'true' },
        { call: 'isCorrect(questions[0], "5")', expect: 'false' },
      ],
      hint: 'answer.trim().toLowerCase() === question.a.toLowerCase()',
      solution: Q1,
    }),
    code({
      kicker: 'STEP 2 OF 3 · JAVASCRIPT',
      title: 'Count the score',
      instructions: 'score(answers) returns how many answers are correct. answers[i] belongs to questions[i]; missing answers count as wrong.',
      lang: 'javascript',
      file: 'quiz.js',
      starter: Q1 + '\nfunction score(answers) {\n  return 0;\n}\n',
      tests: [
        { call: 'score(["4", "New Delhi", "a"])', expect: '3' },
        { call: 'score(["4", "Mumbai"])', expect: '1' },
      ],
      hint: 'Loop over questions and use isCorrect(questions[i], answers[i] ?? "")',
      solution: Q2,
    }),
    code({
      kicker: 'STEP 3 OF 3 · JAVASCRIPT',
      title: 'Show the result',
      instructions: 'result(answers) returns "2/3 (67%)". Add " Perfect!" when every answer is right.',
      lang: 'javascript',
      file: 'quiz.js',
      starter: Q2 + '\nfunction result(answers) {\n  return "";\n}\n',
      tests: [
        { call: 'result(["4", "New Delhi", "x"])', expect: '"2/3 (67%)"' },
        { call: 'result(["4", "new delhi", "A"])', expect: '"3/3 (100%) Perfect!"' },
      ],
      hint: 'const pct = Math.round((s / questions.length) * 100);',
      solution: Q3,
    }),
  ],
};

/* ---------- 4. Number guessing game (Python) ---------- */

const G1 = 'def hint(guess, secret):\n    if guess < secret:\n        return "Too low"\n    if guess > secret:\n        return "Too high"\n    return "Correct!"\n';
const G2 = G1 + '\ndef play(secret, guesses):\n    for i, g in enumerate(guesses, start=1):\n        if hint(g, secret) == "Correct!":\n            return i\n    return -1\n';
const G3 = G2 + '\ndef best_guess(low, high):\n    return (low + high) // 2\n\ndef solve(secret, low=1, high=100):\n    tries = 0\n    while True:\n        tries += 1\n        g = best_guess(low, high)\n        h = hint(g, secret)\n        if h == "Correct!":\n            return tries\n        if h == "Too low":\n            low = g + 1\n        else:\n            high = g - 1\n';

export const GUESS_GAME: Lesson = {
  id: 'proj-guess',
  title: 'Number guessing game',
  kind: 'project',
  minutes: 12,
  skill: 'python',
  learned: ['Gave hints with if / elif', 'Counted tries in a loop', 'Wrote a bot that always wins with binary search'],
  steps: [
    read({
      kicker: 'PROJECT · GUESSING GAME',
      title: 'Guess my number',
      body: 'The computer thinks of a number from 1 to 100; you guess, it says too high or too low. You will build the game, count tries, then write a bot that wins in at most 7 guesses.',
      lang: 'python',
      code: ['hint(30, 42)  # "Too low"', 'hint(50, 42)  # "Too high"'],
    }),
    code({
      kicker: 'STEP 1 OF 3 · PYTHON',
      title: 'Give a hint',
      instructions: 'hint(guess, secret) returns "Too low", "Too high" or "Correct!".',
      lang: 'python',
      file: 'game.py',
      starter: 'def hint(guess, secret):\n    return "Correct!"\n',
      tests: [
        { call: 'hint(30, 42)', expect: '"Too low"' },
        { call: 'hint(50, 42)', expect: '"Too high"' },
        { call: 'hint(42, 42)', expect: '"Correct!"' },
      ],
      hint: 'if guess < secret: return "Too low"',
      solution: G1,
    }),
    code({
      kicker: 'STEP 2 OF 3 · PYTHON',
      title: 'Count the tries',
      instructions: 'play(secret, guesses) returns on which try the secret was guessed (1, 2, …), or -1 if never.',
      lang: 'python',
      file: 'game.py',
      starter: G1 + '\ndef play(secret, guesses):\n    return -1\n',
      tests: [
        { call: 'play(42, [50, 25, 42])', expect: '3' },
        { call: 'play(7, [1, 2])', expect: '-1' },
      ],
      hint: 'for i, g in enumerate(guesses, start=1): ...',
      solution: G2,
    }),
    code({
      kicker: 'STEP 3 OF 3 · PYTHON',
      title: 'A bot that always wins',
      instructions: 'solve(secret) plays automatically: always guess the middle of the remaining range and narrow it using hint(). Return the number of tries.',
      lang: 'python',
      file: 'game.py',
      starter: G2 + '\ndef solve(secret, low=1, high=100):\n    return 0\n',
      tests: [
        { call: 'solve(50)', expect: '1' },
        { call: 'max(solve(n) for n in range(1, 101))', expect: '7' },
      ],
      hint: 'Guess (low + high) // 2; on "Too low" set low = g + 1, on "Too high" set high = g - 1.',
      solution: G3,
    }),
  ],
};

export const PROJECTS: Lesson[] = [PORTFOLIO, TODO, QUIZ_GAME, GUESS_GAME];
