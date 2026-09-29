// ====== CONFIGURACIÓN — edita estos valores ======

// Supabase: Project Settings → API (la anon/publishable key es pública, es seguro ponerla aquí)
const SUPABASE_URL = "https://qxjhhguyclnlkkdjcfuj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1mIOH9kQov3Rvu9qsTb8NQ_Vs8ba9kg";

// Dominio interno para los usuarios (no se muestra a los invitados)
const DOMINIO_USUARIOS = "boda.local";

const DATOS_BODA = {
  novia: "Dankaly Barros",
  novio: "Johan Barco",
  // Fecha y hora de la ceremonia (hora local)
  fecha: "2027-01-09T19:00:00",
  fechaTexto: "Sábado, 9 de enero de 2027",
  fechaLimiteRSVP: "2026-12-09T23:59:59",
  fechaLimiteTexto: "9 de diciembre de 2026",
  frase: "Con la bendición de Dios y de nuestras familias, queremos compartir contigo el día más especial de nuestras vidas.",
  lugar: {
    nombre: "Quisquella",
    direccion: "Barranquilla",
    hora: "7:00 p. m.",
    mapa: "https://maps.google.com/?q=Quisquella+Barranquilla",
  },
  // Fotos: reemplaza los archivos de la carpeta img/ (o cambia el nombre aquí, ej. "img/portada.jpg")
  fotos: {
    portada: "img/portada.svg",
    galeria: ["img/galeria-1.svg", "img/galeria-2.svg", "img/galeria-3.svg", "img/galeria-4.svg"],
  },
  dressCode: "Formal elegante",
  dressCodeNota: "Reservamos el color blanco para la novia.",
  regalos: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, tendremos lluvia de sobres.",
  hashtag: "#JohanYDankaly2027",
};
