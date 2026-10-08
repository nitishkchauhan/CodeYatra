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

-- ============================================================================
-- v1.2: AI tutor quota, certificate verification, referrals, classes, telemetry.
-- Safe to re-run.
-- ============================================================================

-- Extra profile fields teachers see in their class roster.
alter table public.profiles add column if not exists lessons_done integer not null default 0 check (lessons_done >= 0);
alter table public.profiles add column if not exists stage_id text;
alter table public.profiles add column if not exists referral_code text;
create unique index if not exists profiles_referral_code_idx on public.profiles (referral_code);

-- Each profile gets a short, stable invite code like CY4F2A9C.
create or replace function public.set_referral_code()
returns trigger
language plpgsql
as $$
begin
  if new.referral_code is null then
    new.referral_code := 'CY' || upper(substr(md5(new.user_id::text), 1, 6));
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_referral_code on public.profiles;
create trigger profiles_referral_code before insert or update on public.profiles
  for each row execute function public.set_referral_code();

-- ---------- Ask Yatri: questions per learner per day ----------
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default current_date,
  count integer not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security;
drop policy if exists "own usage" on public.ai_usage;
create policy "own usage" on public.ai_usage for select to authenticated using (auth.uid() = user_id);

-- Adds one question for today and returns today's total.
create or replace function public.bump_ai_usage()
returns integer
language sql
security definer
set search_path = public
as $$
  insert into public.ai_usage (user_id, day, count) values (auth.uid(), current_date, 1)
  on conflict (user_id, day) do update set count = public.ai_usage.count + 1
  returning count;
$$;
revoke all on function public.bump_ai_usage() from public;
grant execute on function public.bump_ai_usage() to authenticated;

-- ---------- Certificates anyone can verify ----------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stage_id text not null,
  name text not null check (char_length(name) <= 24),
  issued_on date not null default current_date,
  unique (user_id, stage_id)
);
alter table public.certificates enable row level security;
-- Verification pages read a certificate by its id; nothing private is stored.
drop policy if exists "verify certificates" on public.certificates;
create policy "verify certificates" on public.certificates for select to anon, authenticated using (true);
drop policy if exists "own certificates" on public.certificates;
create policy "own certificates" on public.certificates for insert to authenticated with check (auth.uid() = user_id);

-- ---------- Referrals ----------
create table if not exists public.referrals (
  invitee uuid primary key references auth.users (id) on delete cascade,
  inviter uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.referrals enable row level security;
drop policy if exists "see own referrals" on public.referrals;
create policy "see own referrals" on public.referrals for select to authenticated using (auth.uid() = inviter or auth.uid() = invitee);

-- Redeems a friend's code once per account. Returns 'ok', 'own', 'used' or 'unknown'.
create or replace function public.redeem_referral(code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  owner uuid;
begin
  select user_id into owner from public.profiles where referral_code = upper(trim(code));
  if owner is null then return 'unknown'; end if;
  if owner = auth.uid() then return 'own'; end if;
  if exists (select 1 from public.referrals where invitee = auth.uid()) then return 'used'; end if;
  insert into public.referrals (invitee, inviter) values (auth.uid(), owner);
  return 'ok';
end;
$$;
revoke all on function public.redeem_referral(text) from public;
grant execute on function public.redeem_referral(text) to authenticated;

-- ---------- Classes for teachers ----------
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null check (char_length(name) between 2 and 40),
  teacher_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.class_members (
  class_id uuid not null references public.classes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
alter table public.classes enable row level security;
alter table public.class_members enable row level security;

drop policy if exists "teacher manages class" on public.classes;
create policy "teacher manages class" on public.classes for all to authenticated
  using (auth.uid() = teacher_id) with check (auth.uid() = teacher_id);
drop policy if exists "members see class" on public.classes;
create policy "members see class" on public.classes for select to authenticated
  using (exists (select 1 from public.class_members m where m.class_id = classes.id and m.user_id = auth.uid()));
drop policy if exists "own membership" on public.class_members;
create policy "own membership" on public.class_members for select to authenticated using (auth.uid() = user_id);
drop policy if exists "leave class" on public.class_members;
create policy "leave class" on public.class_members for delete to authenticated using (auth.uid() = user_id);

-- Creates a class with a fresh 6-letter code and returns the code.
create or replace function public.create_class(class_name text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  new_code text;
begin
  loop
    new_code := upper(substr(md5(random()::text), 1, 6));
    exit when not exists (select 1 from public.classes where code = new_code);
  end loop;
  insert into public.classes (code, name, teacher_id) values (new_code, trim(class_name), auth.uid());
  return new_code;
end;
$$;
revoke all on function public.create_class(text) from public;
grant execute on function public.create_class(text) to authenticated;

-- Joins a class by code. Returns the class name, or null if the code is wrong.
create or replace function public.join_class(class_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.classes;
begin
  select * into c from public.classes where code = upper(trim(class_code));
  if c.id is null then return null; end if;
  insert into public.class_members (class_id, user_id) values (c.id, auth.uid()) on conflict do nothing;
  return c.name;
end;
$$;
revoke all on function public.join_class(text) from public;
grant execute on function public.join_class(text) to authenticated;

-- A teacher's view of their class: public profile fields only, never emails.
create or replace function public.class_roster(class_id uuid)
returns table (display_name text, avatar_url text, total_xp integer, week_xp integer, streak integer, lessons_done integer, stage_id text, updated_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select p.display_name, p.avatar_url, p.total_xp, p.week_xp, p.streak, p.lessons_done, p.stage_id, p.updated_at
  from public.class_members m
  join public.profiles p on p.user_id = m.user_id
  where m.class_id = class_roster.class_id
    and exists (select 1 from public.classes c where c.id = class_roster.class_id and c.teacher_id = auth.uid())
  order by p.week_xp desc;
$$;
revoke all on function public.class_roster(uuid) from public;
grant execute on function public.class_roster(uuid) to authenticated;

-- ---------- Anonymous crash reports and usage events ----------
-- No user id is stored. Learners can switch this off in Profile.
create table if not exists public.app_events (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('event', 'error')),
  name text not null check (char_length(name) <= 80),
  props jsonb not null default '{}'::jsonb check (pg_column_size(props) < 2000),
  app_version text check (char_length(app_version) <= 20),
  platform text check (char_length(platform) <= 20),
  created_at timestamptz not null default now()
);
alter table public.app_events enable row level security;
drop policy if exists "send events" on public.app_events;
create policy "send events" on public.app_events for insert to anon, authenticated with check (true);
