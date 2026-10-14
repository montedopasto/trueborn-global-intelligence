-- Run as postgres in SQL Editor. All synthetic fixtures roll back.
begin;
insert into auth.users(id) values('00000000-0000-4000-8000-000000000001'),('00000000-0000-4000-8000-000000000002'),('00000000-0000-4000-8000-000000000003');
insert into public.organizations(id,name) values('00000000-0000-4000-8000-000000000010','Temporary RLS fixture');
insert into public.partner_candidates values('00000000-0000-4000-8000-000000000010','temporary','{}',current_date);
insert into public.memberships values('813ffcaf-835a-4e51-82db-3e411a978a20','00000000-0000-4000-8000-000000000001','analyst'),('813ffcaf-835a-4e51-82db-3e411a978a20','00000000-0000-4000-8000-000000000002','viewer');
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000001',true);
do $$ begin
 if (select count(*) from public.partner_candidates)<>8 then raise exception 'Isolation failed'; end if;
 insert into public.commercial_tracking(organization_id,partner_id,line_id,notes) values('813ffcaf-835a-4e51-82db-3e411a978a20','sucarn','chef','Temporary security test');
 update public.commercial_tracking set status='draft_ready' where partner_id='sucarn' and line_id='chef';
 if not exists(select 1 from public.commercial_tracking where status='draft_ready' and updated_by=auth.uid()) then raise exception 'Editor save failed'; end if;
 begin
  insert into public.commercial_tracking(organization_id,partner_id,line_id) values('00000000-0000-4000-8000-000000000010','temporary','chef');
  raise exception 'Cross organization write accepted';
 exception when insufficient_privilege then null; end;
 begin
  insert into public.memberships values('00000000-0000-4000-8000-000000000010',auth.uid(),'admin');
  raise exception 'Self grant accepted';
 exception when insufficient_privilege then null; end;
 if (select count(*) from public.audit_events where event_type like 'commercial_tracking.%')<>2 then raise exception 'Audit failed'; end if;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000002',true);
do $$ declare affected integer; begin
 if (select count(*) from public.commercial_tracking)<>1 then raise exception 'Viewer read failed'; end if;
 update public.commercial_tracking set notes='Forbidden' where partner_id='sucarn' and line_id='chef'; get diagnostics affected=row_count;
 if affected<>0 then raise exception 'Viewer update accepted'; end if;
 begin
  insert into public.commercial_tracking(organization_id,partner_id,line_id) values('813ffcaf-835a-4e51-82db-3e411a978a20','sucarn','savoury');
  raise exception 'Viewer insert accepted';
 exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000003',true);
do $$ begin
 if (select count(*) from public.commercial_tracking)<>0 or (select count(*) from public.partner_candidates)<>0 then raise exception 'Non member read accepted'; end if;
end $$;
reset role;
set local role anon;
do $$ begin
 begin
  perform count(*) from public.commercial_tracking;
  raise exception 'Anonymous read accepted';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
select 'PASS: editor save, audit, viewer read, denied viewer writes, organization isolation, no self grant, no anonymous access; fixtures rolled back' as result;
