import { describe, expect, it } from '@jest/globals';
import fs from 'node:fs';
import path from 'node:path';

import { getLesson, STAGES } from '@/content';

// The server issues a certificate only when every lesson listed for the track
// is finished, so its list must match the app. This keeps them in step.
// After adding or renaming lessons: UPDATE_TRACK_SQL=1 npx jest trackLessons,
// then run supabase/track-lessons.sql in the Supabase SQL Editor.
const FILE = path.join(__dirname, '../../../supabase/track-lessons.sql');

/** Same rule as the app: a track is finished when all its written lessons are done. */
function trackLessonsSql() {
  const rows = STAGES.flatMap((s) =>
    s.units
      .flatMap((u) => u.lessons)
      .filter((l) => getLesson(l.id))
      .map((l) => `  ('${s.id}', '${l.id}')`),
  );
  return [
    '-- Lessons that finish each track, for server-issued certificates (schema v1.4).',
    '-- Generated from the app content by src/content/__tests__/trackLessons.test.ts; do not edit by hand.',
    '-- Run in Supabase: Dashboard → SQL Editor → New query → paste → Run. Safe to re-run.',
    'create table if not exists public.track_lessons (stage_id text not null, lesson_id text not null, primary key (stage_id, lesson_id));',
    'alter table public.track_lessons enable row level security;',
    'begin;',
    'delete from public.track_lessons;',
    'insert into public.track_lessons (stage_id, lesson_id) values',
    rows.join(',\n') + ';',
    'commit;',
    '',
  ].join('\n');
}

describe('track lessons for certificates', () => {
  it('every track has lessons, with ids safe to put in SQL', () => {
    for (const s of STAGES) {
      const ids = s.units.flatMap((u) => u.lessons).filter((l) => getLesson(l.id));
      expect(ids.length).toBeGreaterThan(0);
      for (const l of ids) expect(l.id).toMatch(/^[a-z0-9-]+$/);
      expect(s.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('supabase/track-lessons.sql matches the app content', () => {
    const sql = trackLessonsSql();
    if (process.env.UPDATE_TRACK_SQL === '1') fs.writeFileSync(FILE, sql);
    const onDisk = fs.existsSync(FILE) ? fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n') : '';
    expect(onDisk).toBe(sql);
  });
});
