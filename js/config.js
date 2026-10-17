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
  fotos: {
    portada: "img/fotos/foto03.jpeg",
    parallax: "img/fotos/foto05.jpeg",
    parallax2: "img/fotos/foto01.jpeg",
    galeria: [
      "img/fotos/foto01.jpeg",
      "img/fotos/foto02.jpeg",
      "img/fotos/foto03.jpeg",
      "img/fotos/foto04.jpeg",
      "img/fotos/foto05.jpeg",
      "img/fotos/foto06.jpeg",
      "img/fotos/foto07.jpeg",
    ],
  },
  historia: {
    titulo: "Nuestra Historia",
    subtitulo: "Un amor que nació para quedarse",
    momentos: [
      {
        titulo: "El comienzo",
        texto: "Desde el primer momento en que nuestras miradas se cruzaron, supimos que algo especial estaba por comenzar. Lo que empezó como una amistad se fue convirtiendo en el amor más bonito de nuestras vidas.",
        foto: "img/fotos/foto07.jpeg",
      },
      {
        titulo: "Creciendo juntos",
        texto: "Cada día juntos ha sido una aventura. Entre risas, viajes y sueños compartidos, fuimos construyendo los cimientos de lo que hoy es nuestro hogar. Aprendimos a ser equipo, a apoyarnos y a elegernos cada día.",
        foto: "img/fotos/foto04.jpeg",
      },
      {
        titulo: "El gran paso",
        texto: "Y llegó el momento de dar el siguiente paso. Con el corazón lleno de amor y certeza, decidimos unir nuestras vidas para siempre. Ahora queremos celebrarlo con las personas que más amamos: ustedes.",
        foto: "img/fotos/foto06.jpeg",
      },
    ],
  },
  dressCode: "Formal elegante",
  dressCodeNota: "Reservamos el color blanco para la novia.",
  regalos: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, tendremos lluvia de sobres.",
  hashtag: "#JohanYDankaly2027",
};
