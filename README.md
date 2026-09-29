# Web de boda

Invitación personalizada por familia con login (usuario/clave), confirmación de asistencia y panel para los novios.
HTML/CSS/JS estático + Supabase (Auth + Postgres). Hosting: GitHub Pages.

## Páginas
- `index.html`: login. Admite `?u=usuario` para prellenar el usuario.
- `invitacion.html`: invitación personalizada, info de la boda y formulario de confirmación.
- `admin.html`: panel de novios (familia con `es_admin = true`): totales, filtros y exportar CSV.

## Configuración

1. **Supabase**: crear un proyecto nuevo en supabase.com.
   - Authentication → Sign In / Providers → Email: desactivar *Confirm email* y *Allow new users to sign up*.
   - SQL Editor → ejecutar `supabase/schema.sql`.
2. **`js/config.js`**: poner `SUPABASE_URL`, `SUPABASE_ANON_KEY` (Project Settings → API) y los datos de la boda.
3. **Invitados**: editar `scripts/invitados.csv`:
   ```
   nombre,apellido,cupos,telefono,es_admin
   María,Novia,2,573000000000,si      ← cuenta de los novios (panel admin)
   Juan,García,4,573001112233,
   ```
   `cupos` = máximo de personas por familia. Teléfono con código de país, sin `+`. Columna opcional `usuario` para elegirlo a mano.
4. `cp scripts/.env.example scripts/.env` y llenar la `service_role` key y `SITE_URL`.
5. `node scripts/crear_invitados.mjs` → crea las cuentas y genera `scripts/credenciales.csv` con usuario, clave, mensaje y link `wa.me` listo para enviar.
   Se puede volver a ejecutar tras agregar filas: omite las familias que ya existen.

`scripts/.env`, `invitados.csv` y `credenciales.csv` están en `.gitignore` (contienen claves y datos personales).

## Probar local
```
python3 -m http.server 8000
```
Abrir http://localhost:8000

## Publicar en GitHub Pages
1. Crear repo (ej. `boda`) y subir esta carpeta.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Queda en `https://TU-USUARIO.github.io/boda`. Poner esa URL en `SITE_URL` antes de generar credenciales.

## Cambiar una clave
Supabase → Authentication → Users → borrar `<usuario>@boda.local` (su fila en `familias` se borra sola) y volver a ejecutar el script: genera una clave nueva.
