-- My Rent — Supabase schema
-- Run this in the Supabase SQL editor to set up your database

create extension if not exists "uuid-ossp";

-- Properties table
create table if not exists public.properties (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  address       text not null,
  suburb        text not null,
  price_per_week numeric(10, 2) not null,
  bedrooms      int not null default 1,
  status        text not null default 'active'
                  check (status in ('active', 'visited', 'rejected')),
  has_parking   boolean not null default false,
  allows_pets   boolean not null default false,
  image_url     text,
  notes         text,
  listing_url   text,
  is_wishlist   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.properties enable row level security;

-- Users can only access their own properties
create policy "Users manage own properties"
  on public.properties
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Index for user queries
create index if not exists properties_user_id_idx on public.properties(user_id);
create index if not exists properties_status_idx on public.properties(status);
