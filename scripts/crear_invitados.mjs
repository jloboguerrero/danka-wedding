// Crea usuarios (familias) en Supabase a partir de invitados.csv y genera credenciales + mensajes de WhatsApp.
// Uso: node scripts/crear_invitados.mjs   (lee scripts/.env)
// Omite familias (nombre + apellido) que ya existen, así que se puede ejecutar de nuevo tras agregar filas al CSV.

import { readFileSync, existsSync, appendFileSync, writeFileSync } from "node:fs";
import { randomInt } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
process.loadEnvFile(join(DIR, ".env"));

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SITE_URL, CLAVE_COMUN, DOMINIO_USUARIOS = "boda.local" } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SITE_URL) {
  console.error("Faltan SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY o SITE_URL en scripts/.env");
  process.exit(1);
}

const HEADERS = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
};

async function api(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, { ...options, headers: { ...HEADERS, ...options.headers } });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${body}`);
  return body ? JSON.parse(body) : null;
}

// CSV simple con soporte de comillas
function leerCSV(ruta) {
  const lineas = readFileSync(ruta, "utf8").replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
  const partir = (l) => [...l.matchAll(/("([^"]|"")*"|[^,]*)(,|$)/g)]
    .map((m) => m[1].replace(/^"|"$/g, "").replace(/""/g, '"').trim())
    .slice(0, -1);
  const [cab, ...resto] = lineas.map(partir);
  return resto.map((cols) => Object.fromEntries(cab.map((c, i) => [c.trim().toLowerCase(), cols[i] ?? ""])));
}

const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const slug = (s) => sinTildes(s).toLowerCase().replace(/[^a-z0-9]/g, "");

function generarClave() {
  const alfabeto = "abcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 6 }, () => alfabeto[randomInt(alfabeto.length)]).join("");
}

function mensajeWhatsApp({ nombre, apellido, usuario, clave, cupos }) {
  const url = `${SITE_URL.replace(/\/$/, "")}/?u=${usuario}`;
  return [
    `¡Hola ${nombre}! 💍`,
    ``,
    `Te invitamos a nuestra boda, favor confírmanos respondiendo el formulario al final.`,
    ``,
    `Ingresa aquí: ${url}`,
    `Usuario: ${usuario}`,
    `Clave: ${clave}`,
    ``,
    `¡Te esperamos!`,
  ].join("\n");
}

const invitados = leerCSV(join(DIR, "invitados.csv"));
const familias = await api("/rest/v1/familias?select=usuario,nombre,apellido");
const existentes = new Set(familias.map((f) => f.usuario));
const clavePersona = (n, a) => `${slug(n)}|${slug(a)}`;
const personas = new Set(familias.map((f) => clavePersona(f.nombre, f.apellido)));

const rutaCred = join(DIR, "credenciales.csv");
if (!existsSync(rutaCred)) {
  writeFileSync(rutaCred, "﻿nombre,apellido,usuario,clave,cupos,telefono,whatsapp_link,mensaje\n");
}
const celda = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

let creados = 0;
for (const inv of invitados) {
  const nombre = inv.nombre;
  const apellido = inv.apellido;
  const cupos = Number(inv.cupos || 1);
  const telefono = (inv.telefono || "").replace(/\D/g, "");
  const parentesco = inv.parentesco || null;
  const mesa = inv.mesa || null;
  const esAdmin = ["si", "sí", "true", "1"].includes((inv.es_admin || "").toLowerCase());
  if (!nombre || !apellido) continue;
  if (personas.has(clavePersona(nombre, apellido))) {
    console.log(`= ${nombre} ${apellido} ya existe, se omite`);
    continue;
  }

  // Usuario: el definido en el CSV o apellido + inicial del nombre
  const base = slug(inv.usuario || `${apellido.split(" ")[0]}${nombre[0]}`);
  let usuario = base;
  for (let n = 2; existentes.has(usuario); n++) usuario = `${base}${n}`;

  // Clave: la de la fila (columna "clave"), si no la común (CLAVE_COMUN en .env), si no una aleatoria
  const clave = inv.clave || CLAVE_COMUN || generarClave();
  try {
    const user = await api("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({ email: `${usuario}@${DOMINIO_USUARIOS}`, password: clave, email_confirm: true }),
    });
    try {
      await api("/rest/v1/familias", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ user_id: user.id, nombre, apellido, usuario, cupos_max: cupos, telefono, parentesco, mesa, es_admin: esAdmin }),
      });
    } catch (err) {
      await api(`/auth/v1/admin/users/${user.id}`, { method: "DELETE" });
      throw err;
    }
  } catch (err) {
    console.error(`✗ ${nombre} ${apellido}: ${err.message}`);
    continue;
  }

  existentes.add(usuario);
  personas.add(clavePersona(nombre, apellido));
  const msg = mensajeWhatsApp({ nombre, apellido, usuario, clave, cupos });
  const link = telefono ? `https://wa.me/${telefono}?text=${encodeURIComponent(msg)}` : "";
  appendFileSync(rutaCred, [nombre, apellido, usuario, clave, cupos, telefono, link, msg].map(celda).join(",") + "\n");
  console.log(`✓ ${nombre} ${apellido} → usuario: ${usuario}  clave: ${clave}${esAdmin ? "  (admin)" : ""}`);
  creados++;
}

console.log(`\n${creados} familias creadas. Credenciales en scripts/credenciales.csv`);
