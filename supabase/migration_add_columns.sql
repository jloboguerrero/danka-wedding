-- Migración: agregar parentesco y mesa a familias
-- Ejecutar en Supabase Dashboard → SQL Editor

ALTER TABLE public.familias ADD COLUMN IF NOT EXISTS parentesco text;
ALTER TABLE public.familias ADD COLUMN IF NOT EXISTS mesa text;

-- Cambiar check de cupos_max de >= 0 a >= 1
ALTER TABLE public.familias DROP CONSTRAINT IF EXISTS familias_cupos_max_check;
ALTER TABLE public.familias ADD CONSTRAINT familias_cupos_max_check CHECK (cupos_max >= 1);
