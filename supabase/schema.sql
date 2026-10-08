-- CodeYatra backend. Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

-- One row per learner: everything the app saves on the phone, as JSON.
create table if not exists public.learner_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

-- Public leaderboard card per learner (no email or private data).
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Explorer' check (char_length(display_name) <= 24),
  total_xp integer not null default 0 check (total_xp >= 0),
  week_xp integer not null default 0 check (week_xp >= 0),
  week_start date not null default date_trunc('week', now())::date,
  streak integer not null default 0 check (streak >= 0),
  outfit text,
  updated_at timestamptz not null default now()
);

-- Added in v1.1: profile photo and bio (safe to re-run).
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists bio text not null default '' check (char_length(bio) <= 80);

create index if not exists profiles_week_idx on public.profiles (week_start, week_xp desc);

alter table public.learner_state enable row level security;
alter table public.profiles enable row level security;

-- Learners can only read and write their own saved state.
drop policy if exists "own state" on public.learner_state;
create policy "own state" on public.learner_state
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Anyone signed in can read leaderboard cards; only the owner can change theirs.
drop policy if exists "read profiles" on public.profiles;
create policy "read profiles" on public.profiles
  for select to authenticated using (true);

drop policy if exists "own profile insert" on public.profiles;
create policy "own profile insert" on public.profiles
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Profile photos: public to read, each learner writes only their own folder (avatars/<user id>/…).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "avatar upload" on storage.objects;
create policy "avatar upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatar update" on storage.objects;
create policy "avatar update" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatar delete" on storage.objects;
create policy "avatar delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Learners can delete their account (and, through the cascades, all their data).
create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = public
as $$
  delete from auth.users where id = auth.uid();
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;
