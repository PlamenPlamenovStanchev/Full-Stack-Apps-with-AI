create extension if not exists "pgcrypto";

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  url text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_bookmarks_user_id_created_at
  on public.bookmarks (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_bookmarks_updated_at on public.bookmarks;
create trigger trg_bookmarks_updated_at
before update on public.bookmarks
for each row
execute function public.set_updated_at();

alter table public.bookmarks enable row level security;

create policy "select_own_bookmarks"
  on public.bookmarks
  for select
  using (auth.uid() = user_id);

create policy "insert_own_bookmarks"
  on public.bookmarks
  for insert
  with check (auth.uid() = user_id);

create policy "update_own_bookmarks"
  on public.bookmarks
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete_own_bookmarks"
  on public.bookmarks
  for delete
  using (auth.uid() = user_id);
