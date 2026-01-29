-- Add role column to profiles if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'role') then
        alter table public.profiles add column role text default 'user' check (role in ('user', 'admin'));
    end if;
end $$;

-- Update RLS Policies to allow admins to view all data

-- Profiles: Admins can view all profiles
create policy "Admins can view all profiles" on public.profiles
  for select using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- Runs: Admins can view all runs
create policy "Admins can view all runs" on public.runs
  for select using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- Automations Log: Admins can view all logs
create policy "Admins can view all logs" on public.automations_log
  for select using (
    (select role from public.profiles where id = auth.uid()) = 'admin'
  );

-- Function to make a user an admin (for manual use via SQL Editor)
-- Usage: select make_admin('email@example.com');
create or replace function public.make_admin(user_email text)
returns void as $$
begin
  update public.profiles
  set role = 'admin'
  where email = user_email;
end;
$$ language plpgsql security definer;
