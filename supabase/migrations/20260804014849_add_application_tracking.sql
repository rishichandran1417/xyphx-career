alter table public."Xyphx-Career"
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists submitted_at timestamptz not null default now(),
  add column if not exists status text not null default 'submitted'
    check (status in ('submitted', 'in_review', 'interview', 'offer', 'rejected', 'withdrawn'));

create index if not exists xyphx_career_user_id_submitted_at_idx
  on public."Xyphx-Career" (user_id, submitted_at desc);

alter table public."Xyphx-Career" enable row level security;

grant select, insert on table public."Xyphx-Career" to authenticated;

drop policy if exists "Applicants can view their own applications" on public."Xyphx-Career";
create policy "Applicants can view their own applications"
  on public."Xyphx-Career"
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Applicants can submit their own applications" on public."Xyphx-Career";
create policy "Applicants can submit their own applications"
  on public."Xyphx-Career"
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
