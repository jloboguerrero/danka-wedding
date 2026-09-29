-- Esquema web de boda: familias invitadas + confirmaciones (RSVP)

create table public.familias (
  id          bigint generated always as identity primary key,
  user_id     uuid not null unique references auth.users(id) on delete cascade,
  nombre      text not null,
  apellido    text not null,
  usuario     text not null unique,
  cupos_max   int  not null default 1 check (cupos_max >= 0),
  telefono    text,
  es_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

create table public.confirmaciones (
  familia_id          bigint primary key references public.familias(id) on delete cascade,
  asiste              boolean not null,
  cantidad            int not null default 0 check (cantidad >= 0),
  nombres_asistentes  text[] not null default '{}',
  restricciones       text,
  mensaje             text,
  updated_at          timestamptz not null default now()
);

-- ¿El usuario actual es de los novios?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.familias
    where user_id = (select auth.uid()) and es_admin
  );
$$;

-- Valida cupos y nombres antes de guardar la confirmación
create or replace function public.validar_confirmacion()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_max int;
begin
  select cupos_max into v_max from public.familias where id = new.familia_id;

  if not new.asiste then
    new.cantidad := 0;
    new.nombres_asistentes := '{}';
    new.restricciones := null;
  else
    if new.cantidad < 1 or new.cantidad > v_max then
      raise exception 'La cantidad debe estar entre 1 y % personas', v_max;
    end if;
    if coalesce(array_length(new.nombres_asistentes, 1), 0) <> new.cantidad then
      raise exception 'Debe indicar un nombre por cada asistente';
    end if;
    if exists (select 1 from unnest(new.nombres_asistentes) n where btrim(n) = '') then
      raise exception 'Los nombres de los asistentes no pueden estar vacíos';
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

create trigger trg_validar_confirmacion
before insert or update on public.confirmaciones
for each row execute function public.validar_confirmacion();

-- RLS
alter table public.familias enable row level security;
alter table public.confirmaciones enable row level security;

create policy "familia ve su fila o admin ve todo"
on public.familias for select to authenticated
using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "ver confirmación propia o admin"
on public.confirmaciones for select to authenticated
using (
  familia_id in (select id from public.familias where user_id = (select auth.uid()))
  or (select public.is_admin())
);

create policy "crear confirmación propia"
on public.confirmaciones for insert to authenticated
with check (familia_id in (select id from public.familias where user_id = (select auth.uid())));

create policy "editar confirmación propia"
on public.confirmaciones for update to authenticated
using (familia_id in (select id from public.familias where user_id = (select auth.uid())))
with check (familia_id in (select id from public.familias where user_id = (select auth.uid())));

revoke execute on function public.validar_confirmacion() from public, anon, authenticated;
