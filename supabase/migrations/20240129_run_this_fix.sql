-- Create the lead_magnets_log table
create table public.lead_magnets_log (
  id uuid not null default gen_random_uuid(),
  user_email text not null,
  tool_requested text not null,
  task_description text null,
  status text not null default 'pending', -- pending, completed, failed
  created_at timestamp with time zone not null default now(),
  constraint lead_magnets_log_pkey primary key (id)
);

-- Enable RLS
alter table public.lead_magnets_log enable row level security;

-- Policy to allow anonymous inserts (public lead magnet)
create policy "Enable insert for all users" on public.lead_magnets_log
  for insert with check (true);

-- Policy to allow users to read (potentially needed for checks, or restricted to service_role)
-- For rate limiting, we might need select access or use service_role in server action
create policy "Enable select for service_role" on public.lead_magnets_log
  for select to service_role using (true);

-- Create index for rate limiting lookups
create index lead_magnets_log_email_idx on public.lead_magnets_log (user_email);

-- Grant privileges
grant all on public.lead_magnets_log to anon, authenticated, service_role;
