-- TRE-17: Store session id and archetype label for analytics and social proof.

alter table public.results
  add column if not exists session_id text,
  add column if not exists archetype text;

create index if not exists idx_results_session_id
  on public.results (session_id);

create index if not exists idx_results_archetype
  on public.results (archetype);
