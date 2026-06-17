-- Add user_id to networks
alter table networks add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- Add user_id to sessions
alter table sessions add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- Drop old open policies
drop policy if exists "Allow all on networks" on networks;
drop policy if exists "Allow all on sessions" on sessions;

-- Networks: users can only see and manage their own
create policy "Users can read own networks" on networks for select using (auth.uid() = user_id);
create policy "Users can insert own networks" on networks for insert with check (auth.uid() = user_id);
create policy "Users can update own networks" on networks for update using (auth.uid() = user_id);
create policy "Users can delete own networks" on networks for delete using (auth.uid() = user_id);

-- Sessions: users can only see and manage their own
create policy "Users can read own sessions" on sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own sessions" on sessions for update using (auth.uid() = user_id);
create policy "Users can delete own sessions" on sessions for delete using (auth.uid() = user_id);

-- Clear old seed data (it has no user_id so won't be visible anyway)
delete from networks where user_id is null;
delete from sessions where user_id is null;
