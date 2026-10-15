// Career paths: roadmaps from "I want to become X" to job-ready, built from stops.

export type PathLink = {
  label: string;
  url: string;
  kind: 'docs' | 'course' | 'video' | 'practice';
  /** Shown as a small tag, e.g. "Hindi" or "Free course". */
  note?: string;
};

export type PathStop = {
  id: string;
  title: string;
  /** One or two sentences: what it is and why it matters for this job. */
  why: string;
  /** CodeYatra lessons that teach this stop. When all are finished, the stop is done. */
  modules?: string[];
  /** Free outside material for stops (or parts of stops) CodeYatra doesn't teach yet. */
  links?: PathLink[];
  /** A build-it milestone rather than a topic. */
  project?: boolean;
  /** Nice to have: doesn't count toward job-ready %. */
  optional?: boolean;
  /** Stops that share a label are alternatives: finishing any one of them is enough, e.g. "Framework". */
  choice?: string;
};

export type PathSection = { title: string; stops: PathStop[] };

export type CareerPath = {
  id: string;
  title: string;
  /** Short line under the title on the card. */
  tagline: string;
  /** What someone in this job does day to day. */
  job: string;
  /** Rough time for a student studying about an hour a day. */
  months: string;
  /** 24×24 stroke icon. */
  icon: string;
  color: string;
  /** Darker shade of color for small text (4.5:1 on white and on soft). */
  ink: string;
  soft: string;
  sections: PathSection[];
};

export type StopStatus = 'done' | 'progress' | 'todo';
