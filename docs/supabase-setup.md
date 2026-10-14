# Supabase commercial workspace

Project: `yvrwfkqngmubeeheidny`, North EU (Stockholm). Migrations 001–003 installed 14 October 2026. Eight public candidate profiles and two research snapshots are seeded; three product lines are separate. No commercial interest or final market scores are inferred.

Public app URL: https://montedopasto.github.io/trueborn-global-intelligence/
Configured as Supabase Site URL. Browser uses only the publishable key; secret keys and the database password remain outside the repository. Auth tokens are stored in sessionStorage and disappear when the tab session ends. The local Supabase JS bundle is pinned at 2.117.3, built with esbuild 0.25.12 from npm (`--ignore-scripts`), license included. No CDN is required.

## First authorized account

Open Acompanhamento and request a login link using the intended email. Supabase default mail delivery may restrict recipients to organization team addresses; configure custom SMTP if delivery is unavailable. A successful login does not grant membership. A database administrator must verify the exact account and, with owner authorization, assign its UUID to the organization in memberships. Never grant admin to the first account automatically. New accounts cannot read organization records until a membership is assigned.

Roles: viewer reads; analyst/admin can insert and update commercial tracking. They cannot grant membership, change row identity, forge timestamps/authors, delete tracking or alter verified research. All browser-facing tables have RLS; anonymous access to organization data is denied. Tracking writes create an audit event without copying note contents.

## Verification

Run `supabase/tests/tracking_security.sql` in the SQL Editor as postgres. It tests editor insert/update, audit, viewer reading, denied viewer writes, cross organization isolation, denied membership self grants, nonmember and anonymous access. All synthetic fixtures run inside a transaction and roll back.

Eleven existing research/scoring tests and the static build pass. Final email delivery and a real authorized user's save/reload still require that user's login and membership. No outreach is sent by this application. OpenAI and recurring automations remain inactive.

Sources: https://supabase.com/docs/guides/getting-started/api-keys and https://supabase.com/docs/guides/auth/auth-email-passwordless
