-- Create profiles table (public view of auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create runs table (credit system)
create table if not exists public.runs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  balance int default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on runs
alter table public.runs enable row level security;

-- Create automations_log table
create table if not exists public.automations_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  automation_id text not null,
  status text not null check (status in ('pending', 'processing', 'completed', 'failed')),
  input_payload jsonb,
  output_payload jsonb,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on automations_log
alter table public.automations_log enable row level security;

-- RLS Policies

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Runs: Users can view their own balance
create policy "Users can view own balance" on public.runs
  for select using (auth.uid() = user_id);

-- Automations Log: Users can view their own logs
create policy "Users can view own logs" on public.automations_log
  for select using (auth.uid() = user_id);

-- Start Trigger to create profile and run balance on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  insert into public.runs (user_id, balance)
  values (new.id, 5); -- Give 5 free runs on signup

  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
