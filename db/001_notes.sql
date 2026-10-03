create table if not exists notes (
  id text primary key,
  title text not null default '',
  doc jsonb not null,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notes_updated_at_idx on notes (updated_at desc);
