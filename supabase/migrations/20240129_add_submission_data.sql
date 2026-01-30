-- Add submission_data column to lead_magnets_log table to store complex form data
alter table public.lead_magnets_log 
add column if not exists submission_data jsonb default '{}'::jsonb;
