-- Create the audit_jobs table
create table public.audit_jobs (
  id uuid not null default gen_random_uuid(),
  user_id uuid null, -- Optional for now, can linkage to auth.users later
  domain text not null,
  competitors text[] null,
  status text not null default 'pending', -- pending, processing, completed, failed
  result jsonb null,
  created_at timestamp with time zone not null default now(),
  constraint audit_jobs_pkey primary key (id)
);

-- Enable RLS but allow public inserts for now (as per "Remote Control" pattern with potential no-auth trigger)
alter table public.audit_jobs enable row level security;

-- Policy to allow anonymous/authenticated users to insert jobs
create policy "Enable insert for all users" on public.audit_jobs
  for insert with check (true);

-- Policy to allow users to read their own jobs (if we had user_id enforcement)
-- For now, allowing all read for simplicity in the demo phase, or restrict to service_role
create policy "Enable read for all users" on public.audit_jobs
  for select using (true);

-- Grant access to authenticated and anon roles
grant all on public.audit_jobs to anon, authenticated, service_role;
