-- Función pública para obtener el apellido a partir del usuario (para el sobre)
-- Ejecutar en Supabase Dashboard → SQL Editor

create or replace function public.apellido_por_usuario(p_usuario text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select apellido from public.familias where usuario = lower(trim(p_usuario)) limit 1;
$$;

grant execute on function public.apellido_por_usuario(text) to anon, authenticated;
