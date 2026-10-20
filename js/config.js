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
  fechaMostrarMesa: "2026-12-15T00:00:00",
  contactoNovia: "+57 301 000 0000",
  frase: "Con la bendición de Dios y de nuestras familias, queremos compartir contigo el día más especial de nuestras vidas.",
  lugar: {
    nombre: "Quiskeya, carrera 48 #75 – 44 Diagonal a Casa del Rey.",
    direccion: "Barranquilla",
    hora: "6:30 p. m.",
    mapa: "https://maps.app.goo.gl/WtSyeL84uuy1g9af6",
  },
  fotos: {
    portada: "img/fotos/foto03.jpeg",
    parallax: "img/fotos/foto05.jpeg",
    parallax2: "img/fotos/foto01.jpeg",
    parallax3: "img/fotos/foto03.jpeg",
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
    subtitulo: "Todo inició...",
    momentos: [
      {
        titulo: "Todo comenzó en el colegio",
        texto: "En 2010, un giro inesperado llevó a Johan a un nuevo colegio, donde Dankaly estudiaba desde primero de primaria. Ese año varios estudiantes cambiaron de salón y, por esas casualidades de la vida, coincidimos en el grupo C. Johan llegó sin conocer a nadie, pero la primera vez que vio a Dankaly sintió una certeza inexplicable: \"Ella será la madre de mis hijos\". Lo que entonces parecía una simple coincidencia, hoy lo reconocemos como una delicada obra de la gracia de Dios.",
        foto: "img/historia/cap1.jpeg",
      },
      {
        titulo: "Conversaciones que nos acercaron",
        texto: "Al principio hablábamos poco: saludos tímidos, conversaciones sencillas y despedidas demasiado breves. Al hablar de Dios y del propósito de la vida, Dankaly invitó a Johan a las reuniones cristianas que se hacían en su casa, y él comenzó a congregarse en la iglesia. Después de cada reunión alargábamos las conversaciones, aunque aún estábamos lejos de imaginar que algún día construiríamos una vida juntos.",
        foto: "img/historia/cap2.jpeg",
      },
      {
        titulo: "Un primer capítulo",
        texto: "Durante los siguientes años coincidimos en actividades del colegio y de la iglesia, hasta que el 1 de enero de 2018 nos hicimos novios por primera vez. El noviazgo duró diez meses y luego tomamos caminos separados. Aunque el silencio y la distancia dejaron huellas, nunca desaparecimos del todo de la vida del otro: la iglesia seguía haciéndonos coincidir… aunque sin dirigirnos la palabra, ¡claro! 🤭",
        foto: "img/historia/cap3.jpeg",
      },
      {
        titulo: "Coincidencias que nos acercaban",
        texto: "En 2023 volvimos a compartir un espacio: el gimnasio. Entrenábamos juntos, pero no pasábamos de ser gym brothers. En febrero de 2024 se Johan enfermó y, por las circunstancias de aquel momento, fue Dankaly quien lo acompañó. 🙈 Aun así, nuestra historia todavía no estaba lista para retomarse.",
        foto: "img/historia/cap4.jpeg",
      },
      {
        titulo: "Una invitación que lo cambió todo",
        texto: "El 30 de noviembre de 2025, una sencilla invitación a trotar hizo que nuestros caminos se encontraran de una manera diferente. Desde ese día no hemos dejado de conversar ni uno solo. Volvimos a compartir risas y momentos sencillos, hasta que, recordando nuestros comienzos, comprendimos que se abría una nueva página.",
        foto: "img/historia/cap5.jpeg",
      },
      {
        titulo: "Esta vez, para toda la vida",
        texto: "El 15 de abril de 2026 nos hicimos novios una vez más, ahora con la certeza de querer caminar juntos hacia un mismo propósito: construir una vida de la mano de Dios. Hoy somos prometidos y caminamos juntos hacia el altar.",
        foto: "img/historia/cap6.jpeg",
      },
      {
        titulo: "Dios, el autor de nuestra historia",
        texto: "Al mirar atrás entendemos que nada fue en vano: cada encuentro, cada distancia y cada reencuentro formaron parte de una historia que Dios ya conocía. Sus planes son más altos que los nuestros y sus tiempos son perfectos; Él unió lo que estaba distante y escribió un capítulo más hermoso del que imaginamos. Por eso nuestro corazón está lleno de gratitud, porque fue Él quien entretejió nuestros caminos para que nos eligiéramos, esta vez, para toda la vida. Toda la gloria y la honra sean para Él, el autor de nuestra historia de amor. \"A los que aman a Dios, todas las cosas les ayudan a bien.\" Romanos 8:28",
        foto: "img/historia/cap7.jpeg",
      },
    ],
  },
  dressCode: "Formal elegante",
  dressCodeNota: "Reservamos el color blanco para la novia.",
  regalos: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, tendremos lluvia de sobres.",
  hashtag: "#JohanYDankaly2027",
};
