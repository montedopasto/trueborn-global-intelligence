begin;
create function public.can_edit(org uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.memberships where organization_id=org and user_id=(select auth.uid()) and role in ('admin','analyst'));
$$;
revoke all on function public.can_edit(uuid) from public, anon;
grant execute on function public.can_edit(uuid) to authenticated;
create table public.partner_candidates (
 organization_id uuid not null references public.organizations,
 id text not null, profile jsonb not null check(jsonb_typeof(profile)='object'),
 researched_at date not null, primary key(organization_id,id)
);
create table public.research_snapshots (
 organization_id uuid not null references public.organizations,
 id text not null, payload jsonb not null check(jsonb_typeof(payload)='object'),
 researched_at date not null, primary key(organization_id,id)
);
create table public.commercial_tracking (
 organization_id uuid not null references public.organizations,
 partner_id text not null, line_id text not null references public.product_lines,
 status text not null default 'researching' check(status in ('researching','draft_ready','contacted','replied','qualified','declined')),
 notes text not null default '' check(length(notes)<=5000),
 next_action text not null default '' check(length(next_action)<=1000), next_action_date date,
 created_by uuid not null default auth.uid() references auth.users,
 updated_by uuid not null default auth.uid() references auth.users,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 primary key(organization_id,partner_id,line_id),
 foreign key(organization_id,partner_id) references public.partner_candidates(organization_id,id)
);
create function public.stamp_tracking() returns trigger language plpgsql set search_path='' as $$
begin
 if TG_OP='UPDATE' and (new.organization_id<>old.organization_id or new.partner_id<>old.partner_id or new.line_id<>old.line_id) then
  raise exception 'Tracking identity is immutable';
 end if;
 if TG_OP='INSERT' then new.created_by:=auth.uid(); new.created_at:=now(); end if;
 new.updated_by:=auth.uid(); new.updated_at:=now(); return new;
end; $$;
create trigger tracking_stamp before insert or update on public.commercial_tracking for each row execute function public.stamp_tracking();
create function public.audit_tracking() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.audit_events(organization_id,actor_id,event_type,metadata)
 values(new.organization_id,auth.uid(),'commercial_tracking.'||lower(TG_OP),jsonb_build_object('partner_id',new.partner_id,'line_id',new.line_id,'status',new.status));
 return new;
end; $$;
revoke all on function public.stamp_tracking(),public.audit_tracking() from public, anon, authenticated;
create trigger tracking_audit after insert or update on public.commercial_tracking for each row execute function public.audit_tracking();
alter table public.partner_candidates enable row level security;
alter table public.research_snapshots enable row level security;
alter table public.commercial_tracking enable row level security;
create policy candidate_member_read on public.partner_candidates for select to authenticated using(public.is_member(organization_id));
create policy snapshot_member_read on public.research_snapshots for select to authenticated using(public.is_member(organization_id));
create policy tracking_member_read on public.commercial_tracking for select to authenticated using(public.is_member(organization_id));
create policy tracking_editor_insert on public.commercial_tracking for insert to authenticated with check(public.can_edit(organization_id) and created_by=auth.uid() and updated_by=auth.uid());
create policy tracking_editor_update on public.commercial_tracking for update to authenticated using(public.can_edit(organization_id)) with check(public.can_edit(organization_id) and updated_by=auth.uid());
revoke all on public.partner_candidates,public.research_snapshots,public.commercial_tracking from anon,authenticated;
grant select on public.partner_candidates,public.research_snapshots,public.commercial_tracking to authenticated;
grant insert(organization_id,partner_id,line_id,status,notes,next_action,next_action_date) on public.commercial_tracking to authenticated;
grant update(status,notes,next_action,next_action_date) on public.commercial_tracking to authenticated;
-- Explicit server privileges: project setup disabled automatic table exposure.
grant all on public.organizations,public.memberships,public.product_lines,public.catalogues,public.products,public.observations,public.market_access,public.research_jobs,public.audit_events,public.ai_daily_usage,public.partner_candidates,public.research_snapshots,public.commercial_tracking to service_role;
commit;
