// Git · Final project: a clean-history checker (keeps the old project id, git-project). The challenge tasks, then
// the two tested coding steps from before: a commit-message checker and release notes from a branch’s history.
import type { EditorStep, Lesson } from '../../types';
import { GIT_PROJECT as OLD } from '../git';
import { arrange, bugTask, CAFE_REPO, challenge, mcq, pairs, pickCode, swipe, xray } from './kit';

const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s, i, all) => ({ ...s, kicker: `FINAL PROJECT · STEP ${i + 1} OF ${all.length}` }));

export const GIT_PROJECT: Lesson = challenge('git-project', 'Final: a clean-history checker', { icon: '🏆', name: 'Git Pro' }, ['Practise the whole branch, commit, merge and push workflow', 'Write a commit message checker like teams run automatically', 'Turn a branch’s history into release notes'], [
  mcq(1, 'What is the first step for a new task?', ['git switch -c feature/task', 'git push --force', 'git reset --hard', 'git init'], 'A branch per task.', { mono: true }),
  mcq(2, 'Which message follows good practice?', ['Add opening hours to the footer', 'update', 'Fixed stuff.', 'WIP!!!'], 'Imperative, specific.'),
  mcq(3, 'How does finished work reach main on a team?', ['Through a reviewed pull request', 'git push --force to main', 'Emailing the files', 'git stash'], 'Review first.'),
  mcq(4, 'A pushed commit broke the site. Which is safe?', ['git revert id', 'git reset --hard', 'git commit --amend', 'Delete the branch'], 'A new commit.', { mono: true }),
  mcq(5, 'Which keeps secrets out of the repository?', ['.gitignore with .env in it', 'A private branch', 'git stash', 'Long file names'], 'And environment variables.'),
  swipe([
    ['Small, focused commits make history easy to read', true, 'One idea each.'],
    ['A first line of about 50 characters is a common guideline', true, 'Then a blank line.'],
    ['Force-pushing main is a normal part of the workflow', false, 'Never on shared branches.'],
    ['Tags can mark each release', true, 'v1.0, v1.1…'],
  ]),
  pairs([['switch -c', 'Start a task'], ['commit -m', 'Save with a reason'], ['push -u', 'Share the branch'], ['merge', 'Bring it into main']], 'The workflow.'),
  pickCode('Which sequence finishes a task correctly?', ['git add . && git commit -m "Add hours" && git push -u origin feature/hours', 'git push --force && git commit', 'git commit && git reset --hard', 'git stash && git push'], 'Stage, commit, push the branch.'),
  bugTask(['git switch main', 'git commit -am "stuff"', 'git push --force'], [[1, 'git switch main', 'git switch -c feature/hours'], [2, '"stuff"', '"Add opening hours"'], [3, 'git push --force', 'git push -u origin feature/hours']], 'Branch, write a clear message, push the branch for review.'),
  xray('<div class="c">$ git log --oneline</div><div class="m">3f2a1bc (HEAD -> main) Merge branch \'feature/hours\'</div><div class="f">9e8d7c6 Add opening hours</div>', [
    ['.m', 'Two lines of work joined', 'git merge feature/hours', ['git merge feature/hours', 'git commit -m "Add opening hours"', 'git tag v1.0']],
    ['.f', 'The work itself', 'git commit -m "Add opening hours"', ['git merge feature/hours', 'git commit -m "Add opening hours"', 'git tag v1.0']],
  ]),
  arrange(['git switch -c feature/hours', 'echo "Open 8 to 9" > hours.txt', 'git add hours.txt', 'git commit -m "Add opening hours"', 'git switch main', 'git merge feature/hours'], 'branch, change, stage, commit, back to main, merge', { repo: CAFE_REPO }),
  ...steps,
], 'project');
