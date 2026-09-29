let filas = [];

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function estado(f) {
  if (!f.confirmaciones) return "pend";
  return f.confirmaciones.asiste ? "si" : "no";
}
const ETIQUETA = { si: "Asiste", no: "No asiste", pend: "Pendiente" };

async function iniciar() {
  const yo = await requerirFamilia();
  if (!yo) return;
  if (!yo.es_admin) {
    location.href = "invitacion.html";
    return;
  }
  llenarTextos();

  const { data, error } = await sb
    .from("familias")
    .select("*, confirmaciones(*)")
    .eq("es_admin", false)
    .order("apellido");
  if (error) {
    $("error").textContent = error.message;
    return;
  }
  filas = data;

  pintarStats();
  pintarTabla();
  $("buscar").addEventListener("input", pintarTabla);
  $("filtro").addEventListener("change", pintarTabla);
  $("btn-csv").addEventListener("click", exportarCSV);
}

function pintarStats() {
  const cuenta = (e) => filas.filter((f) => estado(f) === e).length;
  const cupos = filas.reduce((s, f) => s + f.cupos_max, 0);
  const personas = filas.reduce((s, f) => s + (f.confirmaciones?.cantidad ?? 0), 0);
  const stats = [
    [filas.length, "Familias"],
    [cupos, "Cupos asignados"],
    [personas, "Personas confirmadas"],
    [cuenta("si"), "Familias asisten"],
    [cuenta("no"), "No asisten"],
    [cuenta("pend"), "Pendientes"],
  ];
  $("stats").innerHTML = stats.map(([v, t]) => `<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("");
}

function filtradas() {
  const q = $("buscar").value.trim().toLowerCase();
  const filtro = $("filtro").value;
  return filas.filter((f) => {
    if (filtro !== "todos" && estado(f) !== filtro) return false;
    if (!q) return true;
    const texto = [f.nombre, f.apellido, f.usuario, ...(f.confirmaciones?.nombres_asistentes ?? [])].join(" ").toLowerCase();
    return texto.includes(q);
  });
}

function pintarTabla() {
  $("tabla").innerHTML = filtradas().map((f) => {
    const c = f.confirmaciones;
    const e = estado(f);
    return `<tr>
      <td>${esc(f.nombre)} ${esc(f.apellido)}</td>
      <td>${esc(f.usuario)}</td>
      <td><span class="chip ${e}">${ETIQUETA[e]}</span></td>
      <td>${f.cupos_max}</td>
      <td>${c ? c.cantidad : "—"}</td>
      <td>${esc((c?.nombres_asistentes ?? []).join(", "))}</td>
      <td>${esc(c?.restricciones)}</td>
      <td>${esc(c?.mensaje)}</td>
      <td>${c ? new Date(c.updated_at).toLocaleDateString("es") : ""}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="9" class="centro suave">Sin resultados</td></tr>`;
}

function exportarCSV() {
  const celda = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const encabezado = ["Nombre", "Apellido", "Usuario", "Teléfono", "Estado", "Cupos", "Asisten", "Nombres", "Restricciones", "Mensaje", "Actualizado"];
  const lineas = filas.map((f) => {
    const c = f.confirmaciones;
    return [
      f.nombre, f.apellido, f.usuario, f.telefono, ETIQUETA[estado(f)], f.cupos_max,
      c?.cantidad ?? "", (c?.nombres_asistentes ?? []).join("; "), c?.restricciones, c?.mensaje,
      c ? new Date(c.updated_at).toLocaleString("es") : "",
    ].map(celda).join(",");
  });
  const csv = "﻿" + [encabezado.map(celda).join(","), ...lineas].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = "confirmaciones-boda.csv";
  a.click();
}

iniciar();
