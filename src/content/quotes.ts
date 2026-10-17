// Short lines about programming. Quotes are only included with a source we can name;
// everything else is labelled as CodeYatra's own advice, never put in a famous person's mouth.

export type Quote = { text: string; by: string; source?: string; action?: { label: string; to: '/revise' | '/interview' | '/playground' | '/mock' } };

export const QUOTES: Quote[] = [
  { text: 'Talk is cheap. Show me the code.', by: 'Linus Torvalds', source: 'Linux kernel mailing list, 2000', action: { label: 'Open the playground', to: '/playground' } },
  {
    text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
    by: 'Harold Abelson and Gerald Jay Sussman',
    source: 'Structure and Interpretation of Computer Programs, 1985',
  },
  { text: 'Simplicity is prerequisite for reliability.', by: 'Edsger W. Dijkstra', source: 'EWD498, 1975' },
  {
    text: 'Everyone knows that debugging is twice as hard as writing a program in the first place.',
    by: 'Brian Kernighan and P. J. Plauger',
    source: 'The Elements of Programming Style, 1978',
    action: { label: 'Revise your mistakes', to: '/revise' },
  },
  { text: 'Premature optimization is the root of all evil (or at least most of it) in programming.', by: 'Donald Knuth', source: 'Computing Surveys, 1974' },
  { text: 'Read an error from the last line up: it names the problem, and the lines above show where.', by: 'CodeYatra tip', action: { label: 'Revise errors', to: '/revise' } },
  { text: 'Run your code early and often. A small step that breaks is easy to fix.', by: 'CodeYatra tip', action: { label: 'Open the playground', to: '/playground' } },
  { text: 'In an interview, say your plan out loud before you write code.', by: 'CodeYatra tip', action: { label: 'Practise interview questions', to: '/interview' } },
];

/** The same line all day, a new one tomorrow. */
export function quoteOfDay(day: string): Quote {
  const n = [...day].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return QUOTES[n % QUOTES.length];
}
