/* ===================================================================
   PSICOCOPY™ — CAPA DE DATOS (extensible)
   -------------------------------------------------------------------
   Para AGREGAR contenido en el futuro NO necesitas tocar la lógica.
   Solo añade objetos a estos arreglos:
     · SECTIONS  -> capítulos del manual (bloques tipados)
     · LIBRARY   -> publicaciones de la biblioteca (1000+)
     · EMOTIONS / NICHES / GOALS -> opciones del generador y filtros
   Tipos de bloque soportados por el render:
     lead | h2 | p | list | quote | callout | cards | accordions | timeline | posts | chips
   =================================================================== */

const EMOTIONS = ["Tristeza", "Nostalgia", "Esperanza", "Enojo", "Sorpresa", "Miedo", "Orgullo", "Calma"];
const NICHES   = ["Relaciones", "Psicología", "Dinero", "Autoestima", "Narcisismo", "Hábitos", "Manipulación"];
const GOALS    = ["Compartidos", "Comentarios", "Guardados", "Seguidores", "Clics"];

/* -------- Plantillas para el GENERADOR (base ampliable) -------- */
const GENERATOR_BANK = {
  frases: [
    "No extrañas a {tema}… extrañas cómo te hacía sentir.",
    "Nadie te lo dice, pero {tema} también se aprende a soltar.",
    "El día que entendí {tema}, dejé de mendigar lo que merecía.",
    "{tema} no se cura con tiempo. Se cura con verdad.",
    "Hay personas que se van… y recién ahí entiendes {tema}.",
    "Lo más maduro que harás este año será aceptar {tema}."
  ],
  hashtags: {
    Relaciones: "#relaciones #amorpropio #desamor #reflexiones #frases",
    Psicología: "#psicologia #mente #crecimientopersonal #emociones #reflexion",
    Dinero: "#dinero #mentalidad #finanzas #abundancia #exito",
    Autoestima: "#autoestima #amorpropio #valor #confianza #superacion",
    Narcisismo: "#narcisismo #relacionestoxicas #limites #saludmental",
    Hábitos: "#habitos #disciplina #productividad #mejora #constancia",
    Manipulación: "#limites #relacionestoxicas #inteligenciaemocional #conciencia"
  },
  // Descripciones LISTAS para publicar (texto de apoyo, no explicación)
  descripciones: [
    "A veces {tema} no se habla… solo se carga en silencio. Hoy alguien necesita leer que no está solo en esto.",
    "Nadie te prepara para {tema}. Pero entenderlo es el primer paso para soltarlo.",
    "Si estás pasando por {tema}, respira: esto también es parte de crecer.",
    "Lo que casi nadie te dice sobre {tema} es que aceptarlo duele menos que seguir negándolo.",
    "Guarda esto para el día en que {tema} vuelva a tocar tu puerta. Te va a hacer falta."
  ],
  // CTA invisibles según el OBJETIVO de la publicación
  ctas: {
    Compartidos: "Comparte esto con quien hoy lo necesita leer. 💭",
    Comentarios: "¿Te ha pasado? Cuéntamelo aquí abajo. 👇",
    Guardados: "Guárdalo para releerlo cuando lo necesites. 🔖",
    Seguidores: "Sígueme para más frases que te hacen pensar. ✨",
    Clics: "Te dejo la reflexión completa en el primer comentario. 👇"
  }
};

/* -------- BIBLIOTECA (muestra; replicar el patrón para llegar a 1000) -------- */
const LIBRARY = [
  {
    frase: "No extrañas a esa persona… extrañas cómo te hacía sentir.",
    emocion: "Nostalgia", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Una verdad incómoda sobre el desamor que casi nadie se atreve a aceptar.",
    hashtags: "#desamor #relaciones #amorpropio #frases #reflexiones",
    prompt: "Fotografía cinematográfica de una persona mirando por la ventana de un café al atardecer, luz cálida, tono melancólico, bokeh suave.",
    tecnicas: ["Curiosity Gap", "Storytelling", "Espejo emocional", "CTA invisible"]
  },
  {
    frase: "Madurar es darte cuenta de que tenías razón… pero ya no te importa tener la última palabra.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "El tipo de paz que solo llega cuando dejas de pelear por ser entendido.",
    hashtags: "#madurez #psicologia #pazmental #crecimiento #reflexion",
    prompt: "Persona caminando sola por un sendero de montaña al amanecer, niebla ligera, sensación de serenidad, estética editorial.",
    tecnicas: ["Reframe", "Identificación", "Cierre emocional"]
  },
  {
    frase: "Si te cansa, no es tu lugar. Si te calma, no lo sueltes.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Una regla simple para reconocer lo que de verdad te suma.",
    hashtags: "#autoestima #amorpropio #limites #bienestar #frases",
    prompt: "Manos sosteniendo una taza caliente junto a una ventana lluviosa, ambiente acogedor, luz suave.",
    tecnicas: ["Contraste", "Regla de oro", "Brevedad"]
  },
  {
    frase: "El dinero no cambia a las personas. Solo les quita la máscara.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Una frase que invita a debatir y exponer tu opinión.",
    hashtags: "#dinero #mentalidad #exito #reflexion #verdades",
    prompt: "Retrato dramático en blanco y negro con sombras marcadas, mirada intensa, estilo editorial premium.",
    tecnicas: ["Polémica controlada", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "La ansiedad no es debilidad. Es tu mente intentando protegerte de algo que ya pasó.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reformula la ansiedad desde la compasión, no desde la culpa. Genera alivio e identificación.",
    hashtags: "#ansiedad #saludmental #psicologia #bienestar #calma",
    prompt: "Persona respirando profundo junto a una ventana con plantas, luz matutina suave, atmósfera serena y esperanzadora.",
    tecnicas: ["Reframe", "Validación emocional", "Efecto espejo"]
  },

  /* ===== RELACIONES ===== */
  {
    frase: "Te acostumbraste a pedir migajas… y por eso un trato normal te parecía amor.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Confronta con cariño la costumbre de conformarse con poco. Duele, pero libera.",
    hashtags: "#relacionestoxicas #amorpropio #desamor #limites #reflexion",
    prompt: "Persona sentada sola en una mesa para dos en un restaurante con luz tenue, tono melancólico, fotografía cinematográfica.",
    tecnicas: ["Espejo emocional", "Reframe", "Contraste"]
  },
  {
    frase: "Una relación no se rompe el día que terminan. Se rompe en todas las veces que te quedaste callado.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Reescribe el final de una relación como una acumulación de silencios, no un solo momento.",
    hashtags: "#relaciones #comunicacion #desamor #parejas #reflexiones",
    prompt: "Dos siluetas de espaldas en un sofá con distancia entre ellas, luz fría de ventana, ambiente íntimo y tenso.",
    tecnicas: ["Reframe", "Open Loop", "Cierre emocional"]
  },
  {
    frase: "Si tienes que rogar por atención, ya tienes tu respuesta.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Frase directa que invita al lector a opinar y etiquetar a alguien.",
    hashtags: "#amorpropio #relaciones #limites #verdades #frases",
    prompt: "Primer plano de un teléfono con la pantalla apagada sobre una mesa, manos esperando, luz dramática.",
    tecnicas: ["Brevedad", "Gancho de debate", "Regla de oro"]
  },
  {
    frase: "Lo más sano que hice por mí fue dejar de explicarle mi valor a quien decidió no verlo.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Celebra el momento de soltar la necesidad de aprobación ajena.",
    hashtags: "#amorpropio #autoestima #relaciones #pazmental #soltar",
    prompt: "Persona caminando hacia la luz al final de un pasillo, postura firme, estética editorial luminosa.",
    tecnicas: ["Identificación", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Quédate donde te nombren con cariño, no donde solo te recuerden cuando te necesitan.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Una guía emocional para reconocer el afecto real frente a la conveniencia.",
    hashtags: "#relaciones #amistad #amorpropio #limites #bienestar",
    prompt: "Mesa con dos tazas humeantes y luz cálida de tarde, sensación de hogar y compañía sincera.",
    tecnicas: ["Contraste", "Regla de oro", "Metáfora"]
  },

  /* ===== PSICOLOGÍA ===== */
  {
    frase: "No estás cansado de hacer cosas. Estás cansado de hacerlas sin sentir que importan.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Distingue el cansancio físico del agotamiento por falta de propósito.",
    hashtags: "#saludmental #psicologia #burnout #proposito #bienestar",
    prompt: "Persona mirando el techo desde la cama al amanecer, luz gris suave, atmósfera introspectiva.",
    tecnicas: ["Reframe", "Espejo emocional", "Antítesis"]
  },
  {
    frase: "Tu mente cree todo lo que le repites. Por eso tu diálogo interno no es un detalle: es tu destino.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Conecta el lenguaje interno con los resultados de vida. Inspirador y accionable.",
    hashtags: "#mentalidad #psicologia #crecimientopersonal #habitos #mente",
    prompt: "Reflejo de una persona en un espejo con expresión decidida, iluminación cálida, estilo motivacional editorial.",
    tecnicas: ["Causa-efecto", "Reframe", "Cierre potente"]
  },
  {
    frase: "Sanar no es olvidar. Es recordar sin que te siga doliendo.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Redefine la sanación de forma realista y compasiva.",
    hashtags: "#sanar #saludmental #psicologia #procesos #bienestar",
    prompt: "Cicatriz de luz suave sobre fondo neutro, manos abiertas en calma, fotografía minimalista.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "El miedo no desaparece cuando te sientes listo. Desaparece cuando actúas a pesar de no estarlo.",
    emocion: "Miedo", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Rompe el mito de esperar a 'estar listo'. Empuja a la acción.",
    hashtags: "#miedo #valentia #accion #mentalidad #superacion",
    prompt: "Persona al borde de un trampolín mirando hacia abajo, luz contrastada, momento de decisión.",
    tecnicas: ["Reframe", "Contraste", "Llamado a la acción"]
  },
  {
    frase: "A veces no necesitas más motivación. Necesitas menos cosas drenando tu energía.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Cambia el foco del 'hacer más' al 'quitar lo que estorba'. Genera debate.",
    hashtags: "#energia #saludmental #productividad #limites #bienestar",
    prompt: "Escritorio despejado con una sola planta y luz natural, estética minimalista y serena.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },

  /* ===== DINERO ===== */
  {
    frase: "No eres malo con el dinero. Nadie te enseñó. Hay diferencia.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Quita la culpa financiera y abre la puerta al aprendizaje. Muy compartible.",
    hashtags: "#finanzas #dinero #educacionfinanciera #mentalidad #abundancia",
    prompt: "Cuaderno abierto con cálculos y una taza de café, luz cálida de mañana, ambiente de aprendizaje.",
    tecnicas: ["Reframe", "Validación emocional", "Antítesis"]
  },
  {
    frase: "Ahorrar no te hace pobre. Gastar para aparentar, sí.",
    emocion: "Enojo", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Frase polémica que confronta el consumo por estatus. Dispara opiniones.",
    hashtags: "#dinero #finanzas #ahorro #mentalidad #verdades",
    prompt: "Contraste entre una cartera llena de tickets y una alcancía sencilla, luz dura, estilo conceptual.",
    tecnicas: ["Antítesis", "Polémica controlada", "Brevedad"]
  },
  {
    frase: "El dinero compra tiempo. Y el tiempo es lo único que no vas a recuperar.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reenfoca el dinero como herramienta de libertad, no de acumulación.",
    hashtags: "#dinero #libertadfinanciera #tiempo #mentalidad #vida",
    prompt: "Reloj de arena junto a una ventana con vista al mar, luz dorada, estética aspiracional.",
    tecnicas: ["Reframe", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Tu primer salario alto no cambiará tu vida. Tus primeros hábitos con ese salario, sí.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Desmonta la ilusión de que ganar más resuelve todo. Educa con un giro.",
    hashtags: "#finanzas #habitos #dinero #disciplina #mentalidad",
    prompt: "Persona joven revisando un presupuesto en una laptop, ambiente sobrio y enfocado, luz neutra.",
    tecnicas: ["Antítesis", "Open Loop", "Reframe"]
  },

  /* ===== AUTOESTIMA ===== */
  {
    frase: "No naciste para gustarle a todos. Naciste para reconocerte cuando te mires.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Libera de la necesidad de aprobación masiva. Empoderador.",
    hashtags: "#autoestima #amorpropio #autenticidad #valor #confianza",
    prompt: "Retrato de una persona mirándose al espejo con calma y orgullo, luz suave y cálida.",
    tecnicas: ["Reframe", "Espejo emocional", "Cierre potente"]
  },
  {
    frase: "Pusiste tanto en los demás que olvidaste que tú también eras alguien a quien cuidar.",
    emocion: "Tristeza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Toca a quienes se abandonan por cuidar a otros. Genera identificación profunda.",
    hashtags: "#amorpropio #autocuidado #autoestima #limites #bienestar",
    prompt: "Persona abrazándose a sí misma junto a una ventana al atardecer, tono tierno y melancólico.",
    tecnicas: ["Espejo emocional", "Storytelling", "Validación emocional"]
  },
  {
    frase: "Deja de competir con quien fingías ser. Esa versión también estaba agotada.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Comentarios",
    descripcion: "Invita a soltar la máscara perfeccionista. Provoca reflexión y respuestas.",
    hashtags: "#autenticidad #autoestima #perfeccionismo #saludmental #aceptacion",
    prompt: "Persona quitándose una máscara de teatro lentamente, luz teatral suave, estilo conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Hablas cinco idiomas contigo: cuatro de reproche y uno de cariño. Cambia la proporción.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Imagen memorable sobre el diálogo interno crítico. Accionable.",
    hashtags: "#autoestima #dialogointerno #amorpropio #saludmental #habitos",
    prompt: "Globos de diálogo de colores alrededor de una silueta, uno brillante y cálido, estética ilustrada.",
    tecnicas: ["Metáfora", "Lista implícita", "Reframe"]
  },

  /* ===== NARCISISMO / RELACIONES TÓXICAS ===== */
  {
    frase: "No te confundió. Te entrenó para dudar de ti y confiar solo en su versión.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Explica con claridad la dinámica de manipulación emocional. Educativo y revelador.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #saludmental #limites",
    prompt: "Laberinto de espejos con una figura confundida buscando la salida, luz fría, estilo conceptual.",
    tecnicas: ["Reframe", "Revelación", "Espejo emocional"]
  },
  {
    frase: "Primero te hicieron sentir especial. Luego te hicieron sentir que sin ellos no eras nada. Esa secuencia tiene nombre.",
    emocion: "Miedo", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Describe el ciclo idealización-devaluación para ayudar a reconocerlo.",
    hashtags: "#narcisismo #relacionestoxicas #cicloabuso #saludmental #conciencia",
    prompt: "Dos máscaras superpuestas, una sonriente y otra fría, iluminación dramática, estilo editorial.",
    tecnicas: ["Open Loop", "Storytelling", "Curiosity Gap"]
  },
  {
    frase: "Que te pida perdón no significa que vaya a cambiar. A veces solo significa que no quiere perder el control.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Distingue el arrepentimiento real de la manipulación. Genera debate intenso.",
    hashtags: "#relacionestoxicas #narcisismo #limites #manipulacion #verdades",
    prompt: "Mano extendida ofreciendo una flor marchita, contraste sombrío, fotografía conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Gancho de debate"]
  },

  /* ===== HÁBITOS ===== */
  {
    frase: "No te falta disciplina. Te sobran decisiones que podrías haber automatizado.",
    emocion: "Sorpresa", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Reenfoca la disciplina como diseño de sistemas, no fuerza de voluntad.",
    hashtags: "#habitos #disciplina #productividad #sistemas #mejora",
    prompt: "Rutina matutina ordenada sobre una mesa: agua, libreta, zapatillas, luz limpia y minimalista.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "Un día tras otro no es aburrido. Es el precio silencioso de todo lo que admiras en otros.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Dignifica la constancia frente a la fantasía del éxito rápido.",
    hashtags: "#constancia #disciplina #habitos #exito #mentalidad",
    prompt: "Escalera de piedra ascendiendo entre la niebla hacia la luz, estética épica y serena.",
    tecnicas: ["Reframe", "Prueba social implícita", "Metáfora"]
  },
  {
    frase: "Empieza tan pequeño que sea ridículo fallar. La constancia nace de lo fácil, no de lo épico.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Consejo práctico para empezar hábitos sin abrumarse. Muy guardable.",
    hashtags: "#habitos #productividad #disciplina #mejora #constancia",
    prompt: "Una sola flexión o un vaso de agua sobre fondo claro, simbolismo de inicio pequeño, minimalista.",
    tecnicas: ["Reframe", "Regla práctica", "Contraste"]
  },

  /* ===== MANIPULACIÓN (reconocer y poner límites) ===== */
  {
    frase: "Si poner un límite hace que te llamen 'malo', el límite era justo lo que necesitabas.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Empodera a quien teme poner límites por miedo a la culpa ajena.",
    hashtags: "#limites #relacionestoxicas #inteligenciaemocional #amorpropio #conciencia",
    prompt: "Persona cerrando suavemente una puerta con expresión serena, luz cálida del otro lado, estilo editorial.",
    tecnicas: ["Reframe", "Regla de oro", "Validación emocional"]
  },
  {
    frase: "La culpa que sientes al decir 'no' no siempre es tuya. A veces te la prestaron para que obedezcas.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Distingue la culpa propia de la culpa inducida. Revelador.",
    hashtags: "#culpa #limites #manipulacion #saludmental #inteligenciaemocional",
    prompt: "Hilos invisibles atados a una muñeca abriéndose, luz suave, estilo conceptual de liberación.",
    tecnicas: ["Reframe", "Metáfora", "Revelación"]
  },

  /* ===== VARIADAS (más emociones/objetivos) ===== */
  {
    frase: "El día que dejé de perseguir, empezaron a buscarme. No era magia: era respeto propio.",
    emocion: "Orgullo", nicho: "Relaciones", objetivo: "Seguidores",
    descripcion: "Historia breve con moraleja sobre autovaloración. Atrae seguidores que se identifican.",
    hashtags: "#amorpropio #relaciones #autoestima #respeto #frases",
    prompt: "Persona caminando con seguridad por una calle iluminada al atardecer, estética cinematográfica.",
    tecnicas: ["Storytelling", "Reframe", "Cierre potente"]
  },
  {
    frase: "Guárdate esto: la paz también es una forma de éxito. Quizás la más difícil de conseguir.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Redefine el éxito desde el bienestar. CTA invisible de guardar incluido.",
    hashtags: "#pazmental #exito #bienestar #saludmental #mentalidad",
    prompt: "Persona meditando en una habitación luminosa y ordenada, plantas, luz natural, atmósfera serena.",
    tecnicas: ["Reframe", "CTA invisible", "Brevedad"]
  },
  {
    frase: "¿Y si el problema no era que pedías demasiado… sino que se lo pedías a quien no podía darlo?",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Pregunta retórica que reencuadra el dolor y abre conversación.",
    hashtags: "#relaciones #amorpropio #limites #reflexion #parejas",
    prompt: "Dos manos que casi se tocan pero no llegan, luz suave de contraste, fotografía emotiva.",
    tecnicas: ["Pregunta retórica", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Tu yo de hace cinco años daría lo que fuera por estar donde estás. No lo olvides cuando te exijas tanto.",
    emocion: "Nostalgia", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Cambia la perspectiva del autoexigente recordando el progreso logrado.",
    hashtags: "#gratitud #autoestima #progreso #mentalidad #bienestar",
    prompt: "Persona mirando fotografías antiguas con una sonrisa suave, luz cálida nostálgica.",
    tecnicas: ["Reframe", "Perspectiva temporal", "Validación emocional"]
  },
  {
    frase: "Da miedo empezar de nuevo. Pero da más miedo seguir igual cinco años más.",
    emocion: "Miedo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Contrasta dos miedos para empujar al cambio. Muy compartible.",
    hashtags: "#cambio #miedo #valentia #superacion #mentalidad",
    prompt: "Bifurcación de un camino en el bosque al amanecer, una senda iluminada, estética simbólica.",
    tecnicas: ["Contraste", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "No todos los que aplauden tu calma vivieron tu tormenta. Por eso tu paz vale doble.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reconoce el mérito invisible de quien sanó en silencio.",
    hashtags: "#superacion #saludmental #pazmental #resiliencia #fortaleza",
    prompt: "Mar en calma tras una tormenta, cielo despejándose, luz dorada en el horizonte.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Comparte si alguna vez fingiste estar bien para no preocupar a nadie.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Invitación directa y empática que da permiso a sentirse identificado.",
    hashtags: "#saludmental #emociones #vulnerabilidad #bienestar #frases",
    prompt: "Persona con una sonrisa cansada frente a un espejo que refleja una expresión triste, luz tenue.",
    tecnicas: ["CTA invisible", "Espejo emocional", "Vulnerabilidad"]
  }
];

/* -------- SECCIONES DEL MANUAL -------- */
const SECTIONS = [
  /* ---------- INICIO ---------- */
  {
    id: "inicio", icon: "🏠", title: "Inicio", breadcrumb: "Inicio",
    blocks: [
      { type: "head", kicker: "Master System", title: "Bienvenido a PSICOCOPY™",
        lead: "El sistema completo para escribir publicaciones que la gente NECESITA compartir. No es un PDF: es una experiencia interactiva pensada para crecer contigo." },
      { type: "cards", items: [
        { ico: "🧠", h: "Psicología Viral", p: "Por qué el cerebro comparte ciertas frases y no otras." },
        { ico: "🔥", h: "Gatillos Mentales", p: "Los disparadores que activan la acción." },
        { ico: "🎯", h: "Copywriting", p: "Estructuras probadas para escribir como un profesional." },
        { ico: "📷", h: "Prompts de IA", p: "Imágenes que multiplican el alcance de tu copy." },
        { ico: "🧩", h: "Plantillas", p: "Rellena y publica en minutos." },
        { ico: "📚", h: "Biblioteca", p: "Cientos de ejemplos filtrables por emoción y nicho." }
      ]},
      { type: "callout", variant: "good", tag: "Cómo usarlo",
        html: "Navega con el menú lateral, usa el <strong>buscador</strong> para ir directo a un tema (prueba «ansiedad»), prueba el <strong>Generador</strong> y estudia la <strong>Anatomía de un Viral</strong>." }
    ]
  },

  /* ---------- INTRODUCCIÓN ---------- */
  {
    id: "introduccion", icon: "📖", title: "Introducción",
    blocks: [
      { type: "head", kicker: "Fundamentos", title: "Por qué la gente comparte",
        lead: "Compartir no es un acto racional: es emocional e identitario. Comparte lo que dice algo sobre quién eres." },
      { type: "h2", text: "Las 3 razones para compartir" },
      { type: "cards", items: [
        { ico: "🪞", h: "Identidad", p: "«Esto me representa». Comparto para mostrar quién soy." },
        { ico: "❤️", h: "Conexión", p: "«Esto le va a llegar a alguien». Comparto para vincular." },
        { ico: "⚡", h: "Emoción alta", p: "Asombro, ternura o indignación rompen el silencio del scroll." }
      ]},
      { type: "quote", text: "La gente no comparte información. Comparte emociones con forma de frase." }
    ]
  },

  /* ---------- PSICOLOGÍA VIRAL ---------- */
  {
    id: "psicologia", icon: "🧠", title: "Psicología Viral",
    blocks: [
      { type: "head", kicker: "Cómo piensa el lector", title: "Psicología Viral",
        lead: "Tu copy compite contra el pulgar. Tienes menos de 2 segundos para detener el scroll." },
      { type: "accordions", items: [
        { ico: "🧠", title: "Open Loop (bucle abierto)",
          html: "<p>El cerebro <strong>odia las historias incompletas</strong>. Si abres un bucle, necesita cerrarlo.</p>" +
                "<div class='callout good'><span class='tag'>Bien</span><p>«Cometí un error que me costó 3 años… y nadie me lo advirtió.»</p></div>" +
                "<div class='callout bad'><span class='tag'>Evita</span><p>«Hoy quiero hablarte de un error común.» (cierra el bucle de inmediato).</p></div>" },
        { ico: "🔎", title: "Curiosity Gap (brecha de curiosidad)",
          html: "<p>Muestra que existe información valiosa, pero no la entregues toda. La distancia entre lo que sabes y lo que quieres saber genera tensión.</p>" },
        { ico: "🪞", title: "Efecto Espejo",
          html: "<p>Cuando alguien se siente <strong>descrito</strong>, comparte para decir «esto soy yo». Escribe sobre la persona, no sobre ti.</p>" }
      ]}
    ]
  },

  /* ---------- GATILLOS MENTALES ---------- */
  {
    id: "gatillos", icon: "🔥", title: "Gatillos Mentales",
    blocks: [
      { type: "head", kicker: "Disparadores", title: "Gatillos Mentales",
        lead: "Atajos psicológicos que mueven a la acción. Úsalos con ética: para conectar, no para engañar." },
      { type: "cards", items: [
        { ico: "⏳", h: "Escasez", p: "Lo limitado se desea más." },
        { ico: "👥", h: "Prueba social", p: "Si otros lo hacen, debe valer la pena." },
        { ico: "🔁", h: "Reciprocidad", p: "Da valor primero; el lector querrá devolver." },
        { ico: "🏆", h: "Autoridad", p: "La experiencia genera confianza." },
        { ico: "💔", h: "Dolor", p: "Nombrar el problema crea identificación inmediata." },
        { ico: "✨", h: "Aspiración", p: "Muestra la versión deseada del lector." }
      ]},
      { type: "callout", variant: "bad", tag: "Ética",
        html: "Un gatillo bien usado <strong>revela</strong> una verdad; mal usado, <strong>fabrica</strong> una mentira. Nunca prometas lo que no cumples." }
    ]
  },

  /* ---------- EMOCIONES ---------- */
  {
    id: "emociones", icon: "❤️", title: "Emociones",
    blocks: [
      { type: "head", kicker: "El motor del compartir", title: "Mapa de Emociones",
        lead: "Las emociones de alta activación (asombro, ternura, indignación) se comparten mucho más que las neutras." },
      { type: "cards", items: [
        { ico: "😢", h: "Tristeza", p: "Conecta y desahoga. Ideal para identificación." },
        { ico: "🕯️", h: "Nostalgia", p: "«Cómo me hacía sentir». Top en compartidos." },
        { ico: "🌅", h: "Esperanza", p: "Da una salida. Genera guardados." },
        { ico: "😡", h: "Enojo", p: "Polémica controlada. Dispara comentarios." },
        { ico: "😮", h: "Sorpresa", p: "Rompe el patrón esperado." },
        { ico: "🤍", h: "Calma", p: "Frases de paz que se guardan." }
      ]}
    ]
  },

  /* ---------- COPYWRITING ---------- */
  {
    id: "copywriting", icon: "🎯", title: "Copywriting",
    blocks: [
      { type: "head", kicker: "Estructura", title: "Copywriting",
        lead: "Una buena publicación tiene anatomía: gancho, desarrollo y cierre que invita a actuar." },
      { type: "timeline", items: [
        { t: "1 · Gancho", d: "La primera línea detiene el scroll. Promete o intriga." },
        { t: "2 · Tensión", d: "Profundiza el dolor o la curiosidad. Que se sienta visto." },
        { t: "3 · Giro", d: "Una verdad nueva, un cambio de perspectiva." },
        { t: "4 · Cierre", d: "Una frase memorable + CTA invisible que invita a compartir." }
      ]}
    ]
  },

  /* ---------- PROMPTS ---------- */
  {
    id: "prompts", icon: "📷", title: "Prompts",
    blocks: [
      { type: "head", kicker: "Imágenes con IA", title: "Prompts",
        lead: "La imagen correcta multiplica el alcance del copy. Esta es la fórmula base." },
      { type: "quote", text: "[Sujeto] + [acción/emoción] + [escenario] + [luz] + [estilo/estética]" },
      { type: "callout", variant: "good", tag: "Ejemplo",
        html: "«Persona mirando por la ventana al atardecer, melancólica, luz cálida dorada, fotografía cinematográfica, bokeh suave.»" }
    ]
  },

  /* ---------- DESCRIPCIONES ---------- */
  {
    id: "descripciones", icon: "✍️", title: "Descripciones",
    blocks: [
      { type: "head", kicker: "El texto de apoyo", title: "Descripciones",
        lead: "La descripción acompaña a la frase: aporta contexto sin repetirla y refuerza la emoción." },
      { type: "list", items: [
        "Reformula la idea, no la repitas literal.",
        "Termina con una pregunta o invitación sutil.",
        "1 a 3 líneas: más corto, más compartible."
      ]}
    ]
  },

  /* ---------- ALGORITMO ---------- */
  {
    id: "algoritmo", icon: "📈", title: "Algoritmo Facebook",
    blocks: [
      { type: "head", kicker: "Distribución", title: "Algoritmo de Facebook",
        lead: "El algoritmo premia lo que genera interacción significativa rápido. Tu copy debe provocar reacción." },
      { type: "cards", items: [
        { ico: "💬", h: "Comentarios", p: "Pesan más que los likes. Haz preguntas." },
        { ico: "🔁", h: "Compartidos", p: "La señal más fuerte de alcance orgánico." },
        { ico: "⏱️", h: "Primera hora", p: "La tracción temprana define el alcance total." },
        { ico: "💾", h: "Guardados", p: "Indican valor; impulsan recomendaciones." }
      ]}
    ]
  },

  /* ---------- CTA INVISIBLES ---------- */
  {
    id: "cta", icon: "💬", title: "CTA Invisibles",
    blocks: [
      { type: "head", kicker: "Llamados sutiles", title: "CTA Invisibles",
        lead: "Pedir «comparte» funciona poco. Un CTA invisible hace que el lector quiera compartir sin que se lo pidas." },
      { type: "callout", variant: "bad", tag: "Evita", html: "«Dale like y comparte si te gustó.»" },
      { type: "callout", variant: "good", tag: "Mejor", html: "«Etiqueta a quien necesita leer esto hoy.» / «Guárdalo para cuando lo olvides.»" }
    ]
  },

  /* ---------- PLANTILLAS ---------- */
  {
    id: "plantillas", icon: "🧩", title: "Plantillas",
    blocks: [
      { type: "head", kicker: "Rellena y publica", title: "Plantillas",
        lead: "Estructuras listas. Sustituye lo que está [entre corchetes]." },
      { type: "accordions", items: [
        { ico: "🪞", title: "Plantilla Espejo",
          html: "<div class='quote'>No [acción]… [verdad emocional]. Y está bien.</div><p>Ej: «No estás atrasado en la vida… vas a tu ritmo. Y está bien.»</p>" },
        { ico: "⚖️", title: "Plantilla Contraste",
          html: "<div class='quote'>Si [X], no es tu lugar. Si [Y], no lo sueltes.</div>" },
        { ico: "🔓", title: "Plantilla Open Loop",
          html: "<div class='quote'>Nadie te dice que [tema]… hasta que [consecuencia].</div>" }
      ]}
    ]
  },

  /* ---------- BIBLIOTECA (especial) ---------- */
  {
    id: "biblioteca", icon: "📚", title: "Biblioteca", special: "biblioteca",
    blocks: [
      { type: "head", kicker: "Banco de publicaciones", title: "Biblioteca",
        lead: "Ejemplos filtrables por emoción, nicho y objetivo. Cada uno incluye frase, descripción, hashtags, prompt y técnicas." }
    ]
  },

  /* ---------- GENERADOR (especial) ---------- */
  {
    id: "generador", icon: "⚙️", title: "Generador", special: "generador",
    blocks: [
      { type: "head", kicker: "Crea en segundos", title: "Generador de Copy",
        lead: "Elige tema, emoción y objetivo. Obtén frase, descripción, hashtags y prompt listos para publicar." }
    ]
  },

  /* ---------- EJERCICIOS ---------- */
  {
    id: "ejercicios", icon: "📝", title: "Ejercicios",
    blocks: [
      { type: "head", kicker: "Practica", title: "Ejercicios",
        lead: "El copy se entrena. Haz estos retos para afilar el músculo." },
      { type: "list", items: [
        "Escribe 10 ganchos para el tema «soltar a alguien».",
        "Reescribe una noticia aburrida usando un Open Loop.",
        "Convierte un consejo genérico en una frase espejo.",
        "Toma una de tus frases y crea su prompt de imagen."
      ]}
    ]
  },

  /* ---------- EJEMPLOS / ANATOMÍA (especial) ---------- */
  {
    id: "ejemplos", icon: "⭐", title: "Anatomía de un Viral", special: "anatomia",
    blocks: [
      { type: "head", kicker: "Laboratorio Viral", title: "Anatomía de un Viral",
        lead: "Desarmamos publicaciones (sin copiar su contenido) para entender POR QUÉ funcionan y cómo recrear la estructura." }
    ]
  },

  /* ---------- ACTUALIZACIONES ---------- */
  {
    id: "actualizaciones", icon: "🚀", title: "Actualizaciones",
    blocks: [
      { type: "head", kicker: "Roadmap", title: "Actualizaciones",
        lead: "Esta base está preparada para crecer. Próximos capítulos y mejoras se añaden sin rehacer el proyecto." },
      { type: "timeline", items: [
        { t: "v1.0 · Base", d: "Estructura completa, navegación, temas, buscador, generador y biblioteca." },
        { t: "Próximo", d: "Ampliar la biblioteca a 1.000+ publicaciones." },
        { t: "Próximo", d: "Más plantillas y casos en la Anatomía de un Viral." }
      ]}
    ]
  }
];

/* -------- Casos para «Anatomía de un Viral» -------- */
const ANATOMY = [
  {
    titulo: "Frase de nostalgia (relaciones)",
    frase: "No extrañas a esa persona… extrañas cómo te hacía sentir.",
    pasos: [
      { t: "Produce nostalgia", d: "Activa un recuerdo emocional inmediato." },
      { t: "Rompe un patrón", d: "Contradice lo que el lector creía sentir." },
      { t: "Genera identificación", d: "«Esto me pasó a mí.»" },
      { t: "Invita a compartir", d: "Le da palabras a algo que no sabían expresar." }
    ],
    sesgo: "Sesgo de identificación + cierre de un bucle emocional.",
    recrear: "Aplica la estructura «No [objeto]… [verdad emocional más profunda]» a otro nicho, como dinero o autoestima."
  }
];
