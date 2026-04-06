-- TRE-11: Supabase schema + seed data for the NPC trend landing page.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  landing_page_id uuid not null references public.landing_pages(id) on delete cascade,
  question_order integer not null check (question_order > 0),
  scenario text not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (landing_page_id, question_order)
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  answer_order integer not null check (answer_order > 0),
  answer_text text not null,
  score smallint not null check (score between 0 and 100),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (question_id, answer_order)
);

create table if not exists public.archetypes (
  id uuid primary key default gen_random_uuid(),
  landing_page_id uuid not null references public.landing_pages(id) on delete cascade,
  display_order integer not null check (display_order > 0),
  range_min smallint not null check (range_min between 0 and 100),
  range_max smallint not null check (range_max between 0 and 100),
  title text not null,
  subtitle text not null,
  description text not null,
  emoji text not null,
  color text not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint archetypes_valid_range check (range_min <= range_max),
  unique (landing_page_id, display_order)
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  landing_page_id uuid not null references public.landing_pages(id) on delete restrict,
  archetype_id uuid references public.archetypes(id) on delete set null,
  score smallint not null check (score between 0 and 100),
  answer_scores jsonb not null check (jsonb_typeof(answer_scores) = 'array'),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_questions_landing_page_order
  on public.questions (landing_page_id, question_order);

create index if not exists idx_answers_question_order
  on public.answers (question_id, answer_order);

create index if not exists idx_archetypes_landing_page_order
  on public.archetypes (landing_page_id, display_order);

create index if not exists idx_results_landing_page_created_at
  on public.results (landing_page_id, created_at desc);

drop trigger if exists trg_landing_pages_set_updated_at on public.landing_pages;
create trigger trg_landing_pages_set_updated_at
before update on public.landing_pages
for each row
execute function public.set_updated_at();

drop trigger if exists trg_questions_set_updated_at on public.questions;
create trigger trg_questions_set_updated_at
before update on public.questions
for each row
execute function public.set_updated_at();

drop trigger if exists trg_answers_set_updated_at on public.answers;
create trigger trg_answers_set_updated_at
before update on public.answers
for each row
execute function public.set_updated_at();

drop trigger if exists trg_archetypes_set_updated_at on public.archetypes;
create trigger trg_archetypes_set_updated_at
before update on public.archetypes
for each row
execute function public.set_updated_at();

alter table public.landing_pages enable row level security;
alter table public.questions enable row level security;
alter table public.answers enable row level security;
alter table public.archetypes enable row level security;
alter table public.results enable row level security;

drop policy if exists landing_pages_public_read on public.landing_pages;
create policy landing_pages_public_read
on public.landing_pages
for select
to anon, authenticated
using (true);

drop policy if exists questions_public_read on public.questions;
create policy questions_public_read
on public.questions
for select
to anon, authenticated
using (true);

drop policy if exists answers_public_read on public.answers;
create policy answers_public_read
on public.answers
for select
to anon, authenticated
using (true);

drop policy if exists archetypes_public_read on public.archetypes;
create policy archetypes_public_read
on public.archetypes
for select
to anon, authenticated
using (true);

drop policy if exists results_insert_only on public.results;
create policy results_insert_only
on public.results
for insert
to anon, authenticated
with check (
  score between 0 and 100
  and jsonb_typeof(answer_scores) = 'array'
);

revoke all on public.landing_pages from anon, authenticated;
revoke all on public.questions from anon, authenticated;
revoke all on public.answers from anon, authenticated;
revoke all on public.archetypes from anon, authenticated;
revoke all on public.results from anon, authenticated;

grant select on public.landing_pages to anon, authenticated;
grant select on public.questions to anon, authenticated;
grant select on public.answers to anon, authenticated;
grant select on public.archetypes to anon, authenticated;
grant insert on public.results to anon, authenticated;

insert into public.landing_pages (slug, title, description, is_active)
values (
  'are-you-an-npc',
  'Are You an NPC?',
  'Personality quiz inspired by the GTA 6 NPC trend.',
  true
)
on conflict (slug)
do update set
  title = excluded.title,
  description = excluded.description,
  is_active = excluded.is_active,
  updated_at = timezone('utc'::text, now());

insert into public.questions (landing_page_id, question_order, scenario)
values
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 1, $$Your alarm goes off at 7am. What happens next?$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 2, $$A stranger drops their coffee on the street right in front of you. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 3, $$It's Friday night and your usual plans fall through. What do you do?$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 4, $$You're given a free day with zero obligations. How do you spend it?$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 5, $$Someone at a party tells you about a conspiracy theory. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 6, $$Your commute gets disrupted - massive delay, no clear ETA. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 7, $$Someone asks for your honest opinion on their new haircut (you don't love it). You say:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 8, $$You're buying coffee. The barista asks your name. You give them:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 9, $$Someone sends you a 'we need to talk' message with no context. Your reaction:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 10, $$A new restaurant opens in your area. You:$$)
on conflict (landing_page_id, question_order)
do update set
  scenario = excluded.scenario,
  updated_at = timezone('utc'::text, now());

with question_ids as (
  select q.id, q.question_order
  from public.questions q
  inner join public.landing_pages lp on lp.id = q.landing_page_id
  where lp.slug = 'are-you-an-npc'
)
insert into public.answers (question_id, answer_order, answer_text, score)
values
  ((select id from question_ids where question_order = 1), 1, $$I'm already awake - I had a feeling something interesting would happen today.$$ , 5),
  ((select id from question_ids where question_order = 1), 2, $$I hit snooze once, then get up with a rough plan for the day.$$ , 30),
  ((select id from question_ids where question_order = 1), 3, $$I hit snooze exactly three times. It's tradition.$$ , 60),
  ((select id from question_ids where question_order = 1), 4, $$I wake up, check my phone for 40 minutes, then rush out.$$ , 80),
  ((select id from question_ids where question_order = 1), 5, $$I follow my morning routine down to the minute. Every day.$$ , 95),

  ((select id from question_ids where question_order = 2), 1, $$Help them, strike up a conversation, and somehow end up at brunch together.$$ , 8),
  ((select id from question_ids where question_order = 2), 2, $$Hand them some napkins and ask if they're okay.$$ , 28),
  ((select id from question_ids where question_order = 2), 3, $$Say 'oh no!' sympathetically, then keep walking.$$ , 55),
  ((select id from question_ids where question_order = 2), 4, $$Step around the puddle and move on - not your problem.$$ , 75),
  ((select id from question_ids where question_order = 2), 5, $$Walk past without really registering what happened.$$ , 95),

  ((select id from question_ids where question_order = 3), 1, $$Spontaneously drive to a city I've never been to and see what happens.$$ , 3),
  ((select id from question_ids where question_order = 3), 2, $$Text a few people, find something new to do, make it a night.$$ , 22),
  ((select id from question_ids where question_order = 3), 3, $$Order food, watch something on my list, call it a good night.$$ , 50),
  ((select id from question_ids where question_order = 3), 4, $$Get mildly stressed that the routine is broken, then watch the same show I always watch.$$ , 72),
  ((select id from question_ids where question_order = 3), 5, $$Nothing really changes - Friday is just another night.$$ , 92),

  ((select id from question_ids where question_order = 4), 1, $$I say yes to the first weird thing that comes my way.$$ , 7),
  ((select id from question_ids where question_order = 4), 2, $$I have a loose idea and explore from there.$$ , 25),
  ((select id from question_ids where question_order = 4), 3, $$I catch up on the pile of stuff I've been meaning to do.$$ , 52),
  ((select id from question_ids where question_order = 4), 4, $$I feel a bit lost without structure, honestly.$$ , 74),
  ((select id from question_ids where question_order = 4), 5, $$I wait for someone else to suggest something.$$ , 93),

  ((select id from question_ids where question_order = 5), 1, $$Build on it, add my own wild theory, and nearly convince myself.$$ , 10),
  ((select id from question_ids where question_order = 5), 2, $$Ask curious questions - I find it interesting even if I don't believe it.$$ , 30),
  ((select id from question_ids where question_order = 5), 3, $$Nod politely and redirect the conversation.$$ , 55),
  ((select id from question_ids where question_order = 5), 4, $$Give a rehearsed 'interesting!' and move toward the snack table.$$ , 78),
  ((select id from question_ids where question_order = 5), 5, $$Didn't really absorb it - I was thinking about something else.$$ , 95),

  ((select id from question_ids where question_order = 6), 1, $$Treat it as a sign to explore somewhere new and work remotely from a cafe I've never been to.$$ , 6),
  ((select id from question_ids where question_order = 6), 2, $$Pivot: find another route, adapt, stay calm.$$ , 28),
  ((select id from question_ids where question_order = 6), 3, $$Grumble internally, text someone about it, wait it out.$$ , 58),
  ((select id from question_ids where question_order = 6), 4, $$Feel a low-level dread that your whole day is now off.$$ , 76),
  ((select id from question_ids where question_order = 6), 5, $$Stand in the same spot and wait until it resolves.$$ , 94),

  ((select id from question_ids where question_order = 7), 1, $$Exactly what I think, with genuine kindness and specifics on what I'd change.$$ , 12),
  ((select id from question_ids where question_order = 7), 2, $$Something honest but softened - 'It's growing on me' type of thing.$$ , 35),
  ((select id from question_ids where question_order = 7), 3, $$A vague positive response that technically isn't a lie.$$ , 58),
  ((select id from question_ids where question_order = 7), 4, $$The exact compliment they're clearly fishing for.$$ , 80),
  ((select id from question_ids where question_order = 7), 5, $$Whatever gets the conversation past this point the fastest.$$ , 96),

  ((select id from question_ids where question_order = 8), 1, $$A completely different name just to see what it feels like today.$$ , 5),
  ((select id from question_ids where question_order = 8), 2, $$My name - but I'll probably chat with them for a minute.$$ , 25),
  ((select id from question_ids where question_order = 8), 3, $$My name, nothing more.$$ , 50),
  ((select id from question_ids where question_order = 8), 4, $$My name, slightly mumbled so I don't have to repeat it.$$ , 72),
  ((select id from question_ids where question_order = 8), 5, $$Whatever I always say at this point in the routine.$$ , 92),

  ((select id from question_ids where question_order = 9), 1, $$Instant curiosity - I call back immediately and ask what the story is.$$ , 8),
  ((select id from question_ids where question_order = 9), 2, $$A bit anxious, but I respond calmly and ask what's up.$$ , 32),
  ((select id from question_ids where question_order = 9), 3, $$Low-key spiral for 20 minutes, then respond.$$ , 60),
  ((select id from question_ids where question_order = 9), 4, $$Put my phone down, overthink it until they follow up.$$ , 78),
  ((select id from question_ids where question_order = 9), 5, $$I don't notice it for three hours.$$ , 95),

  ((select id from question_ids where question_order = 10), 1, $$Go opening week - I'll try anything once and probably recommend it to ten people.$$ , 10),
  ((select id from question_ids where question_order = 10), 2, $$Add it to my list and get there within a month.$$ , 32),
  ((select id from question_ids where question_order = 10), 3, $$Check the reviews before committing to anything.$$ , 56),
  ((select id from question_ids where question_order = 10), 4, $$Stick with the two restaurants I trust until a friend forces me to try it.$$ , 78),
  ((select id from question_ids where question_order = 10), 5, $$I didn't notice it opened.$$ , 96)
on conflict (question_id, answer_order)
do update set
  answer_text = excluded.answer_text,
  score = excluded.score,
  updated_at = timezone('utc'::text, now());

insert into public.archetypes (
  landing_page_id,
  display_order,
  range_min,
  range_max,
  title,
  subtitle,
  description,
  emoji,
  color
)
values
  (
    (select id from public.landing_pages where slug = 'are-you-an-npc'),
    1,
    0,
    15,
    $$Main Character$$,
    $$You break every script. Chaos follows you.$$,
    $$You don't just live outside the algorithm - you are the anomaly. People remember you. Strange things happen around you. You have somehow ended up at three different weddings this year by accident.$$,
    $$⭐$$,
    $$from-yellow-400 to-orange-500$$
  ),
  (
    (select id from public.landing_pages where slug = 'are-you-an-npc'),
    2,
    16,
    35,
    $$Side Quest Giver$$,
    $$Interesting enough to talk to, weird enough to remember.$$,
    $$You're the person who makes things interesting without quite being the protagonist. You hand out lore, spark unexpected conversations, and occasionally send people on journeys they didn't ask for.$$,
    $$🗺️$$,
    $$from-green-400 to-teal-500$$
  ),
  (
    (select id from public.landing_pages where slug = 'are-you-an-npc'),
    3,
    36,
    55,
    $$Merchant$$,
    $$Reliable, transactional, always at your post.$$,
    $$You show up. You deliver. You have strong opinions about your area of expertise and almost none about everything else. People know where to find you. That's not nothing.$$,
    $$🪙$$,
    $$from-blue-400 to-indigo-500$$
  ),
  (
    (select id from public.landing_pages where slug = 'are-you-an-npc'),
    4,
    56,
    75,
    $$Guard$$,
    $$Same route, same lines, every single day.$$,
    $$You have a system and you trust it. Your day has a shape. You've said 'I can't, I have a thing' more times than you can count, and the thing is always the same thing.$$,
    $$🛡️$$,
    $$from-purple-400 to-violet-500$$
  ),
  (
    (select id from public.landing_pages where slug = 'are-you-an-npc'),
    5,
    76,
    90,
    $$Background NPC$$,
    $$You walk the same path. Nobody notices.$$,
    $$Your existence is ambient. You are the hum of a refrigerator in a room full of people. You have a route. You take it. The world scrolls past and you scroll with it.$$,
    $$🚶$$,
    $$from-slate-400 to-gray-500$$
  ),
  (
    (select id from public.landing_pages where slug = 'are-you-an-npc'),
    6,
    91,
    100,
    $$Decoration$$,
    $$You might actually be a lamp post with a hat.$$,
    $$Scientists are divided on whether you have an inner monologue. You have been in the same place at the same time for so long that people use you as a landmark. This is fine. Everything is fine.$$,
    $$🪴$$,
    $$from-zinc-400 to-stone-500$$
  )
on conflict (landing_page_id, display_order)
do update set
  range_min = excluded.range_min,
  range_max = excluded.range_max,
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  emoji = excluded.emoji,
  color = excluded.color,
  updated_at = timezone('utc'::text, now());
