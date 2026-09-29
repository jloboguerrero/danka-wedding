// Cliente Supabase y utilidades de sesión compartidas por todas las páginas
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function normalizarUsuario(usuario) {
  return usuario.trim().toLowerCase().replace(/\s+/g, "");
}

async function iniciarSesion(usuario, clave) {
  const email = `${normalizarUsuario(usuario)}@${DOMINIO_USUARIOS}`;
  const { error } = await sb.auth.signInWithPassword({ email, password: clave.trim() });
  if (error) throw new Error("Usuario o clave incorrectos");
}

async function cerrarSesion() {
  await sb.auth.signOut();
  location.href = "index.html";
}

// Devuelve la familia del usuario logueado o redirige al login
async function requerirFamilia() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    location.href = "index.html";
    return null;
  }
  const { data, error } = await sb
    .from("familias")
    .select("*")
    .eq("user_id", session.user.id)
    .single();
  if (error || !data) {
    await sb.auth.signOut();
    location.href = "index.html";
    return null;
  }
  return data;
}

function llenarTextos(raiz = document) {
  raiz.querySelectorAll("[data-boda]").forEach((el) => {
    const valor = el.dataset.boda.split(".").reduce((o, k) => o?.[k], DATOS_BODA);
    if (valor != null) el.textContent = valor;
  });
  raiz.querySelectorAll("[data-boda-href]").forEach((el) => {
    const valor = el.dataset.bodaHref.split(".").reduce((o, k) => o?.[k], DATOS_BODA);
    if (valor) el.href = valor;
  });
}
