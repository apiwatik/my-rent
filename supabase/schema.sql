-- My Rent - shared household Supabase schema
-- Run this in the Supabase SQL editor to set up your database.

create extension if not exists "uuid-ossp";

create table if not exists public.properties (
  id             uuid primary key default uuid_generate_v4(),
  address        text not null,
  suburb         text not null,
  price_per_week numeric(10, 2) not null,
  bedrooms       int not null default 1,
  status         text not null default 'active'
                   check (status in ('active', 'visited', 'rejected')),
  has_parking    boolean not null default false,
  allows_pets    boolean not null default false,
  image_url      text,
  notes          text,
  listing_url    text,
  is_wishlist    boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop policy if exists "Users manage own properties" on public.properties;

alter table public.properties drop column if exists user_id;

alter table public.properties disable row level security;
revoke all on table public.properties from anon, authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_updated_at on public.properties;

create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

drop index if exists properties_user_id_idx;
create index if not exists properties_status_idx on public.properties(status);
create index if not exists properties_created_at_idx on public.properties(created_at desc);
