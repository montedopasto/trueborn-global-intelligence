begin;
create table public.organizations (id uuid primary key default gen_random_uuid(), name text not null);
create table public.memberships (
 organization_id uuid references public.organizations on delete cascade,
 user_id uuid references auth.users on delete cascade,
 role text not null check(role in ('viewer','analyst','admin')),
 primary key(organization_id,user_id)
);
create function public.is_member(org uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.memberships where organization_id=org and user_id=(select auth.uid()));
$$;
revoke all on function public.is_member(uuid) from public, anon;
grant execute on function public.is_member(uuid) to authenticated;
create table public.product_lines(id text primary key check(id in ('chef','savoury','charcuterie')), name text not null);
insert into public.product_lines values ('chef','Beef Chef Solutions'),('savoury','Beef Savoury Cuts'),('charcuterie','Charcuterie bovina');
create table public.catalogues (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations,
 filename text not null, storage_path text not null, sha256 text not null check(sha256 ~ '^[a-f0-9]{64}$'),
 status text not null default 'pending' check(status in ('pending','reviewed')), reviewed_by uuid references auth.users,
 created_at timestamptz not null default now()
);
create table public.products (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations,
 line_id text not null references public.product_lines, catalogue_id uuid not null references public.catalogues,
 name text not null, page_reference text not null, verified_attributes jsonb not null default '{}',
 reviewed_by uuid not null references auth.users, reviewed_at timestamptz not null
);
create table public.observations (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations,
 country_code text not null check(country_code ~ '^[A-Z]{2}$'), line_id text not null references public.product_lines,
 criterion text not null check(criterion in ('demand','channel','access','economics','competition','logistics')),
 score numeric not null check(score between 0 and 100), value text not null, unit text not null, period text not null,
 rationale text not null, source text not null, url text not null check(url ~ '^https://'), locator text not null,
 retrieved_at date not null, reviewed_at date, reviewed_by uuid references auth.users,
 verified boolean not null default false, supersedes uuid references public.observations,
 check(not verified or (reviewed_at is not null and reviewed_by is not null)),
 created_at timestamptz not null default now()
);
create index observations_lookup on public.observations(organization_id,country_code,line_id,created_at desc);
create table public.market_access (
 organization_id uuid not null references public.organizations, country_code text not null check(country_code ~ '^[A-Z]{2}$'),
 line_id text not null references public.product_lines, status text not null default 'unknown' check(status in ('unknown','approved','blocked')),
 evidence jsonb, reviewed_by uuid references auth.users, reviewed_at date,
 primary key(organization_id,country_code,line_id),
 check(status='unknown' or (evidence is not null and reviewed_by is not null and reviewed_at is not null))
);
create table public.research_jobs (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations,
 idempotency_key text not null, country_code text not null, line_id text not null references public.product_lines,
 status text not null default 'queued' check(status in ('queued','running','awaiting_review','complete','failed')),
 attempts integer not null default 0, next_attempt_at timestamptz, created_at timestamptz not null default now(),
 unique(organization_id,idempotency_key)
);
create table public.audit_events (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations,
 actor_id uuid references auth.users, event_type text not null, entity_id uuid, metadata jsonb not null default '{}',
 created_at timestamptz not null default now()
);
create table public.ai_daily_usage (
 user_id uuid not null references auth.users, day date not null default current_date,
 requests integer not null default 0, primary key(user_id,day)
);
-- Atomic reservation: includes failed provider calls; no client-controlled limit.
create function public.reserve_ai_request(org uuid) returns boolean language plpgsql security definer set search_path='' as $$
declare used integer;
begin
 if auth.uid() is null or not public.is_member(org) then raise exception 'Not authorized'; end if;
 insert into public.ai_daily_usage(user_id,day,requests) values(auth.uid(),current_date,1)
 on conflict(user_id,day) do update set requests=public.ai_daily_usage.requests+1 where public.ai_daily_usage.requests<10
 returning requests into used;
 return used is not null;
end; $$;
revoke all on function public.reserve_ai_request(uuid) from public, anon;
grant execute on function public.reserve_ai_request(uuid) to authenticated;
alter table public.memberships enable row level security;
create policy membership_self_read on public.memberships for select to authenticated using(user_id=(select auth.uid()));
alter table public.product_lines enable row level security;
create policy line_read on public.product_lines for select to authenticated using(true);
alter table public.ai_daily_usage enable row level security;
create policy usage_self_read on public.ai_daily_usage for select to authenticated using(user_id=(select auth.uid()));
do $$ declare t text; begin
 foreach t in array array['organizations','catalogues','products','observations','market_access','research_jobs','audit_events'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('create policy member_read on public.%I for select to authenticated using (public.is_member(%I))',t,case when t='organizations' then 'id' else 'organization_id' end);
 end loop;
end $$;
-- No browser write policies. Reviewed ingestion must run server-side with authorization and audit.
revoke all on public.organizations,public.memberships,public.product_lines,public.catalogues,public.products,public.observations,public.market_access,public.research_jobs,public.audit_events,public.ai_daily_usage from anon,authenticated;
grant select on public.organizations,public.memberships,public.product_lines,public.catalogues,public.products,public.observations,public.market_access,public.research_jobs,public.audit_events,public.ai_daily_usage to authenticated;
commit;
