let familia = null;

const $ = (id) => document.getElementById(id);

async function iniciar() {
  familia = await requerirFamilia();
  if (!familia) return;

  llenarTextos();
  const nombreCompleto = `${familia.nombre} ${familia.apellido}`;
  $("barra-familia").textContent = `Familia ${familia.apellido}`;
  $("saludo").textContent = `Querida familia de ${nombreCompleto}`;
  $("cupos").textContent = familia.cupos_max === 1
    ? "Hemos reservado 1 lugar en su honor"
    : `Hemos reservado ${familia.cupos_max} lugares en su honor`;
  document.title = `Invitación · ${nombreCompleto}`;

  $("cantidad").innerHTML = Array.from({ length: familia.cupos_max }, (_, i) =>
    `<option value="${i + 1}">${i + 1} ${i === 0 ? "persona" : "personas"}</option>`
  ).join("");
  $("cantidad").value = familia.cupos_max;

  iniciarCuentaRegresiva();
  $("foto-portada").src = DATOS_BODA.fotos.portada;
  $("galeria").innerHTML = DATOS_BODA.fotos.galeria.map((f) => `<img src="${f}" alt="" loading="lazy">`).join("");
  document.querySelectorAll("input[name=asiste]").forEach((r) => r.addEventListener("change", alternarCampos));
  $("cantidad").addEventListener("change", () => dibujarNombres());
  $("form-rsvp").addEventListener("submit", enviar);

  await cargarConfirmacion();

  if (new Date() > new Date(DATOS_BODA.fechaLimiteRSVP)) {
    $("form-rsvp").querySelectorAll("input, select, textarea, button").forEach((el) => (el.disabled = true));
    mostrarMensaje("La fecha límite para confirmar ya pasó. Si necesitas un cambio, escríbenos directamente.", "error");
  }
}

function alternarCampos() {
  const asiste = document.querySelector("input[name=asiste]:checked")?.value === "si";
  $("campos-si").classList.toggle("oculto", !asiste);
  if (asiste && !$("nombres").children.length) dibujarNombres();
}

// Dibuja un campo por asistente conservando lo ya escrito
function dibujarNombres(valores) {
  const actuales = valores ?? [...$("nombres").querySelectorAll("input")].map((i) => i.value);
  const n = Number($("cantidad").value);
  $("nombres").innerHTML = "";
  for (let i = 0; i < n; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.placeholder = `Asistente ${i + 1}`;
    input.value = actuales[i] ?? (i === 0 ? `${familia.nombre} ${familia.apellido}` : "");
    $("nombres").appendChild(input);
  }
}

async function cargarConfirmacion() {
  const { data } = await sb
    .from("confirmaciones")
    .select("*")
    .eq("familia_id", familia.id)
    .maybeSingle();
  if (!data) return;

  document.querySelector(`input[name=asiste][value=${data.asiste ? "si" : "no"}]`).checked = true;
  $("mensaje-novios").value = data.mensaje ?? "";
  if (data.asiste) {
    $("cantidad").value = data.cantidad;
    $("restricciones").value = data.restricciones ?? "";
    dibujarNombres(data.nombres_asistentes);
  }
  alternarCampos();
  $("btn-enviar").textContent = "Actualizar confirmación";
  mostrarMensaje(`Ya recibimos tu confirmación. Puedes modificarla hasta el ${DATOS_BODA.fechaLimiteTexto}.`, "ok");
}

async function enviar(e) {
  e.preventDefault();
  const asiste = document.querySelector("input[name=asiste]:checked")?.value === "si";
  const nombres = asiste ? [...$("nombres").querySelectorAll("input")].map((i) => i.value.trim()) : [];
  if (asiste && nombres.some((n) => !n)) {
    mostrarMensaje("Por favor escribe el nombre de cada asistente.", "error");
    return;
  }

  $("btn-enviar").disabled = true;
  const { error } = await sb.from("confirmaciones").upsert({
    familia_id: familia.id,
    asiste,
    cantidad: asiste ? nombres.length : 0,
    nombres_asistentes: nombres,
    restricciones: asiste ? $("restricciones").value.trim() || null : null,
    mensaje: $("mensaje-novios").value.trim() || null,
  });
  $("btn-enviar").disabled = false;

  if (error) {
    mostrarMensaje(`No pudimos guardar tu respuesta: ${error.message}`, "error");
    return;
  }
  $("btn-enviar").textContent = "Actualizar confirmación";
  mostrarMensaje(asiste
    ? "¡Gracias! Nos hace muy felices que nos acompañen. 🤍"
    : "Gracias por avisarnos. ¡Los extrañaremos!", "ok");
}

function mostrarMensaje(texto, tipo) {
  $("mensaje").textContent = texto;
  $("mensaje").className = `mensaje ${tipo}`;
}

function iniciarCuentaRegresiva() {
  const destino = new Date(DATOS_BODA.fecha).getTime();
  const pintar = () => {
    const d = Math.max(0, destino - Date.now());
    const partes = [
      [Math.floor(d / 864e5), "días"],
      [Math.floor((d / 36e5) % 24), "horas"],
      [Math.floor((d / 6e4) % 60), "min"],
      [Math.floor((d / 1e3) % 60), "seg"],
    ];
    $("cuenta").innerHTML = partes.map(([v, t]) => `<div><b>${v}</b><span>${t}</span></div>`).join("");
  };
  pintar();
  setInterval(pintar, 1000);
}

iniciar();
