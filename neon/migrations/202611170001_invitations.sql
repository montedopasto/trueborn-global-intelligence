begin;
create table if not exists trueborn_private.invitations (
 digest bytea primary key, email text not null, access_role text not null check(access_role in ('viewer','analyst')),
 created_at timestamptz not null default now(), expires_at timestamptz not null, used_at timestamptz,
 created_by text not null, accepted_by text
);
alter table trueborn_private.invitations enable row level security;
revoke all on trueborn_private.invitations from public, authenticated;
create or replace function trueborn_private.issue_invite(invitee text, permission text, secret text)
returns void language plpgsql security definer set search_path='' as $$
declare actor text := auth.user_id()::text; address text := lower(btrim(invitee));
begin
 if not exists(select 1 from trueborn_private.members where subject=actor and access_role='admin') then raise insufficient_privilege; end if;
 if address is null or length(address)>254 or address !~ '^[^ @]+@[^ @]+[.][^ @]+$' or permission is null or permission not in ('viewer','analyst') or secret is null or secret !~ '^[a-f0-9]{64}$' then raise invalid_parameter_value; end if;
 insert into trueborn_private.invitations(digest,email,access_role,expires_at,created_by) values(sha256(convert_to(secret,'UTF8')),address,permission,now()+interval '7 days',actor);
end $$;
create or replace function trueborn_private.accept_invite(secret text)
returns boolean language plpgsql security definer set search_path='' as $$
declare actor text := auth.user_id()::text; address text; assigned text;
begin
 if actor is null or secret is null or secret !~ '^[a-f0-9]{64}$' then return false; end if;
 select lower(email) into address from neon_auth."user" where id::text=actor and "emailVerified" is true;
 if address is null then return false; end if;
 update trueborn_private.invitations set used_at=now(),accepted_by=actor
 where digest=sha256(convert_to(secret,'UTF8')) and email=address and used_at is null and expires_at>now()
 returning access_role into assigned;
 if assigned is null then return false; end if;
 insert into trueborn_private.members(subject,access_role) values(actor,assigned) on conflict(subject) do nothing;
 return true;
end $$;
revoke all on function trueborn_private.issue_invite(text,text,text),trueborn_private.accept_invite(text) from public;
grant execute on function trueborn_private.issue_invite(text,text,text),trueborn_private.accept_invite(text) to authenticated;
commit;
