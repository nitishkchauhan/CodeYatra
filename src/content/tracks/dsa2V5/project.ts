// DSA Advanced · Final project: a metro route planner (keeps the old project id, dsa2-project). The challenge tasks,
// then the tested planner from before, in the Python code editor.
import type { EditorStep, Lesson } from '../../types';
import { DSA_ADVANCED_PROJECT as OLD } from '../dsaAdvanced';
import { arrange, bugTask, challenge, mcq, pairs, pickCode, predictTask, swipe } from '../dsaV5/kit';

const steps = OLD.steps.filter((s): s is EditorStep => s.type === 'editor').map((s) => ({ ...s, kicker: 'FINAL PROJECT · THE PLANNER' }));

export const DSA2_PROJECT: Lesson = challenge('dsa2-project', 'Final: a metro route planner', { icon: '🏆', name: 'Algorithms Pro' }, ['Model a metro map as a graph', 'Find the fewest-stop route with BFS', 'Rebuild the route from parent links'], [
  mcq(1, 'How should the metro map be stored?', ['An adjacency list: station → neighbours', 'A sorted list of stations', 'A heap', 'A 2-D table of names'], 'A graph.'),
  mcq(2, 'Which search gives the fewest stops?', ['BFS', 'DFS', 'Binary search', 'Topological sort'], 'Equal-weight edges.'),
  mcq(3, 'How do you rebuild the route after BFS?', ['Keep each station’s parent, then walk back from the end', 'Run DFS', 'Sort the stations', 'Count the stops'], 'Parent links.'),
  mcq(4, 'If lines have different travel times, use…', ['Dijkstra', 'BFS', 'DFS', 'Kruskal'], 'Weighted shortest path.'),
  mcq(5, 'What if the destination can’t be reached?', ['Return no route (None), not crash', 'Loop forever', 'Return the start', 'Raise IndexError'], 'Handle it.'),
  swipe([
    ['BFS visits each station at most once', true, 'With a visited set.'],
    ['Walking back from the destination gives the route reversed', true, 'Reverse it at the end.'],
    ['DFS always finds the fewest stops', false, 'BFS does.'],
    ['A disconnected station has no route', true, 'Handle it.'],
  ]),
  pairs([['Adjacency list', 'The map'], ['Queue', 'BFS order'], ['Parent dict', 'Route links'], ['None', 'No route']], 'The planner’s parts.'),
  pickCode('Which records where a station was reached from?', ['parent[nxt] = here', 'parent[here] = nxt', 'parent.append(nxt)', 'here = parent'], 'Child points to parent.'),
  bugTask(['route = []', 'while node:', '    route.append(node)', '    node = parent[node]', 'return route'], [[5, 'return route', 'return route[::-1]']], 'Walking back gives the route backwards: reverse it.'),
  predictTask(['parent = {"Central": None, "Harbour": "Central", "Airport": "Harbour"}', 'node, route = "Airport", []', 'while node:', '    route.append(node)', '    node = parent[node]', 'print(route[::-1])'], 'What does it print?', ["['Central', 'Harbour', 'Airport']", "['Airport', 'Harbour', 'Central']", "['Airport']", '[]'], 'Walk back, then reverse.'),
  arrange(['from collections import deque', 'metro = {"A": ["B"], "B": ["A", "C"], "C": ["B"]}', 'parent, q = {"A": None}, deque(["A"])', 'while q:', '    here = q.popleft()', '    for n in metro[here]:', '        if n not in parent: parent[n] = here; q.append(n)', 'print(parent)'], 'import, the map, start, loop, take one, its neighbours, record new ones, print', ["{'A': None, 'B': 'A', 'C': 'B'}"]),
  ...steps,
], 'project');
