-- Networks table
create table if not exists networks (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  device text not null,
  status text not null default 'Active',
  ip text default '—',
  uptime text default '0m',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Sessions/History table
create table if not exists sessions (
  id uuid default gen_random_uuid() primary key,
  network text not null,
  device text not null,
  issue text not null,
  status text not null default 'Success',
  status_color text not null default '#10B981',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security
alter table networks enable row level security;
alter table sessions enable row level security;

-- Allow all operations for now (no auth yet)
create policy "Allow all on networks" on networks for all using (true) with check (true);
create policy "Allow all on sessions" on sessions for all using (true) with check (true);

-- Seed networks with default data
insert into networks (name, device, status, ip, uptime) values
  ('Home Lab', 'MikroTik RBD52G', 'Active', '192.168.88.1', '14d 6h'),
  ('Office Main', 'Ubiquiti UDM', 'Warning', '10.0.0.1', '3d 2h'),
  ('Small Cafe Wi-Fi', 'TP-Link EAP245', 'Active', '192.168.1.1', '30d 1h');

-- Seed sessions with default history
insert into sessions (network, device, issue, status, status_color, created_at) values
  ('Home Lab', 'MikroTik RBD52G', 'VLAN setup — Guest network isolation', 'Success', '#10B981', '2026-04-26'),
  ('Office Main', 'Ubiquiti UDM', 'Firewall rules — Block inter-VLAN', 'CLI Ready', '#8B5CF6', '2026-04-26'),
  ('Small Cafe Wi-Fi', 'TP-Link EAP245', 'Channel optimisation — 5GHz band', 'Success', '#10B981', '2026-04-24'),
  ('Home Lab', 'MikroTik RBD52G', 'DHCP server configuration', 'Success', '#10B981', '2026-04-22'),
  ('Office Main', 'Ubiquiti UDM', 'IDS/IPS policy review', 'In Review', '#F59E0B', '2026-04-20');
