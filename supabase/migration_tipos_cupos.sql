-- Agrega tipo de cupo (ADULTO, NINO, INFANTE) por cada lugar reservado
alter table public.familias
  add column tipos_cupos text[] not null default '{}';

-- Constraint: cada elemento debe ser ADULTO, NINO o INFANTE
alter table public.familias
  add constraint chk_tipos_cupos
  check (tipos_cupos <@ array['ADULTO','NINO','INFANTE']::text[]);

-- Constraint: la longitud del array debe coincidir con cupos_max
alter table public.familias
  add constraint chk_tipos_cupos_len
  check (array_length(tipos_cupos, 1) = cupos_max);

-- Migrar datos existentes: todos los cupos actuales como ADULTO
update public.familias
  set tipos_cupos = array_fill('ADULTO'::text, array[cupos_max]);
