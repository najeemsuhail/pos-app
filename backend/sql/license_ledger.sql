create table if not exists public.license_ledger (
  machine_id text primary key,
  trial_started_at timestamptz not null,
  activated boolean not null default false,
  activated_at timestamptz null,
  tampered boolean not null default false,
  tamper_reason text null,
  last_seen_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists license_ledger_last_seen_idx
  on public.license_ledger (last_seen_at desc);
