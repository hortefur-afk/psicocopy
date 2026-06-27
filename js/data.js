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
const NICHES   = ["Relaciones", "Psicología", "Ciencia", "Dinero", "Autoestima", "Narcisismo", "Hábitos", "Manipulación"];
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
    Ciencia: "#ciencia #neurociencia #cerebro #datoscuriosos #psicologia",
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
  },

  /* ========== LOTE 2 ========== */

  /* ----- RELACIONES ----- */
  {
    frase: "Lo contrario del amor no es el odio. Es la indiferencia de quien antes te escribía todos los días.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Pone palabras al dolor silencioso del distanciamiento. Conecta de inmediato.",
    hashtags: "#desamor #relaciones #indiferencia #frases #reflexiones",
    prompt: "Pantalla de chat con el último mensaje sin respuesta, luz azulada de la noche, ambiente melancólico.",
    tecnicas: ["Antítesis", "Espejo emocional", "Cierre emocional"]
  },
  {
    frase: "Te eligieron a medias y aun así diste todo. Imagina lo que harás cuando alguien te elija completo.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Convierte una herida en promesa. Da esperanza sin negar el dolor.",
    hashtags: "#amorpropio #relaciones #esperanza #merecer #frases",
    prompt: "Amanecer sobre un campo abierto, una persona de pie mirando al horizonte, luz cálida y prometedora.",
    tecnicas: ["Reframe", "Contraste", "Cierre potente"]
  },
  {
    frase: "Madurar en pareja es dejar de querer ganar la discusión y empezar a querer entender a la persona.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Invita a reflexionar sobre el ego en las relaciones. Genera respuestas.",
    hashtags: "#parejas #relaciones #madurez #comunicacion #amor",
    prompt: "Pareja sentada frente a frente tomados de las manos en una conversación tranquila, luz suave de tarde.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "No era amor. Era miedo a quedarte solo disfrazado de cariño.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Una verdad incómoda que muchos reconocen al releerla. Alto poder de identificación.",
    hashtags: "#relaciones #soledad #amorpropio #verdades #reflexion",
    prompt: "Persona sola en un cuarto con una sola luz encendida, sombras suaves, atmósfera introspectiva.",
    tecnicas: ["Revelación", "Reframe", "Brevedad"]
  },

  /* ----- PSICOLOGÍA ----- */
  {
    frase: "Descansar no es premio por terminar todo. Es requisito para poder seguir.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reescribe la culpa del descanso. Ideal para perfiles de bienestar.",
    hashtags: "#descanso #saludmental #autocuidado #bienestar #burnout",
    prompt: "Persona recostada leyendo junto a una ventana con luz natural, ambiente sereno y acogedor.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Estás comparando tu detrás de cámaras con el estreno editado de los demás. No es una pelea justa.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Desarma la comparación en redes con una metáfora clara y memorable.",
    hashtags: "#comparacion #saludmental #redessociales #autoestima #mentalidad",
    prompt: "Detrás de cámaras de una producción frente a una pantalla pulida, contraste visual, estilo conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Identificación"]
  },
  {
    frase: "Algunas heridas no necesitan que alguien las entienda. Solo necesitan que tú dejes de fingir que no existen.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Invita a la honestidad emocional con uno mismo. Profundo y guardable.",
    hashtags: "#sanar #saludmental #emociones #honestidad #bienestar",
    prompt: "Persona con la mano sobre el pecho, ojos cerrados, luz tenue y cálida, atmósfera introspectiva.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre emocional"]
  },
  {
    frase: "La procrastinación no es pereza. Casi siempre es miedo a hacerlo mal disfrazado de 'mañana'.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Reencuadra la procrastinación desde el miedo, no la flojera. Abre conversación.",
    hashtags: "#procrastinacion #productividad #psicologia #miedo #habitos",
    prompt: "Escritorio con tareas pendientes y un reloj, persona mirando la ventana distraída, luz neutra.",
    tecnicas: ["Reframe", "Revelación", "Gancho de debate"]
  },

  /* ----- DINERO ----- */
  {
    frase: "No necesitas ganar más para empezar. Necesitas dejar de huir de tus números.",
    emocion: "Miedo", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Confronta el miedo a mirar las finanzas propias. Accionable.",
    hashtags: "#finanzas #dinero #educacionfinanciera #habitos #mentalidad",
    prompt: "Persona abriendo un sobre con cuentas sobre una mesa de madera, luz cálida, ambiente honesto.",
    tecnicas: ["Reframe", "Antítesis", "Llamado a la acción"]
  },
  {
    frase: "Comprar barato lo que no necesitas sigue siendo caro.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Frase corta y contundente sobre consumo. Muy compartible por lo memorable.",
    hashtags: "#dinero #ahorro #finanzas #consumo #mentalidad",
    prompt: "Bolsas de compras acumuladas en una esquina con etiquetas de oferta, luz dura, estilo conceptual.",
    tecnicas: ["Antítesis", "Brevedad", "Paradoja"]
  },
  {
    frase: "Invertir en ti no siempre se ve en la cuenta hoy. Se ve en las puertas que se abren mañana.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Conecta el dinero con el crecimiento personal a largo plazo. Inspirador.",
    hashtags: "#inversion #crecimiento #dinero #mentalidad #futuro",
    prompt: "Persona estudiando de noche con una lámpara cálida, libros y laptop, ambiente de esfuerzo y esperanza.",
    tecnicas: ["Reframe", "Perspectiva temporal", "Metáfora"]
  },

  /* ----- AUTOESTIMA ----- */
  {
    frase: "Tú no eres difícil de amar. Solo estuviste con quien no sabía hacerlo.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Devuelve el valor a quien se culpó por relaciones que fallaron. Muy poderosa.",
    hashtags: "#amorpropio #autoestima #relaciones #merecer #frases",
    prompt: "Retrato cálido de una persona sonriendo con calma a la cámara, luz dorada, estética íntima.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre potente"]
  },
  {
    frase: "Deja de pedir permiso para ocupar el espacio que ya te ganaste.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Seguidores",
    descripcion: "Frase de empoderamiento que atrae a quienes buscan afirmación. Buen gancho de seguidores.",
    hashtags: "#empoderamiento #autoestima #confianza #valor #mujeres",
    prompt: "Persona entrando segura a una sala iluminada, postura firme, estética editorial poderosa.",
    tecnicas: ["Reframe", "Llamado a la acción", "Brevedad"]
  },
  {
    frase: "Cuídate como cuidas a quien amas. Esa persona también te necesita.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Recordatorio de autocuidado con un giro tierno hacia el final.",
    hashtags: "#autocuidado #amorpropio #autoestima #bienestar #saludmental",
    prompt: "Manos sosteniendo una taza con cariño junto a una manta y una vela, ambiente cálido y tierno.",
    tecnicas: ["Reframe", "Espejo emocional", "Cierre emocional"]
  },

  /* ----- NARCISISMO / RELACIONES TÓXICAS ----- */
  {
    frase: "Si necesitas grabar las conversaciones para saber qué pasó realmente… ya sabes qué pasó.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Señala la distorsión de la realidad (gaslighting) sin tecnicismos. Genera identificación y debate.",
    hashtags: "#narcisismo #gaslighting #relacionestoxicas #saludmental #limites",
    prompt: "Reflejo distorsionado en un espejo roto, luz fría, estilo conceptual sobre la confusión.",
    tecnicas: ["Revelación", "Open Loop", "Gancho de debate"]
  },
  {
    frase: "No estabas loca. Solo te hicieron sentir así para que no confiaras en lo que veías.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Valida a quien fue manipulado para dudar de su percepción. Muy liberador.",
    hashtags: "#gaslighting #narcisismo #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona saliendo de la sombra hacia la luz con expresión de claridad, estética de liberación.",
    tecnicas: ["Validación emocional", "Reframe", "Cierre potente"]
  },

  /* ----- HÁBITOS ----- */
  {
    frase: "La motivación te hace empezar. El sistema te hace continuar cuando la motivación se va.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Enseña a depender de sistemas, no de ganas. Muy práctico y guardable.",
    hashtags: "#habitos #disciplina #sistemas #productividad #constancia",
    prompt: "Tablero de hábitos con marcas diarias y un café, luz limpia, estética organizada y motivadora.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "No subestimes lo que puedes construir con 30 minutos al día repetidos durante un año.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Resalta el poder del interés compuesto del tiempo. Inspirador y compartible.",
    hashtags: "#constancia #disciplina #habitos #mejora #productividad",
    prompt: "Línea de tiempo visual de pequeños progresos que culminan en un gran resultado, estilo infográfico cálido.",
    tecnicas: ["Perspectiva temporal", "Reframe", "Prueba implícita"]
  },

  /* ----- MANIPULACIÓN (límites) ----- */
  {
    frase: "'No' es una oración completa. No le debes a nadie un párrafo de justificaciones.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Empodera a poner límites sin culpa ni explicaciones interminables.",
    hashtags: "#limites #amorpropio #inteligenciaemocional #saludmental #conciencia",
    prompt: "Mano levantada en gesto sereno de 'alto', fondo neutro, luz limpia, estética minimalista firme.",
    tecnicas: ["Reframe", "Brevedad", "Regla de oro"]
  },
  {
    frase: "Cuidado con quien solo aparece cuando necesita algo. La cercanía con condiciones no es cariño.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Ayuda a reconocer relaciones interesadas. Provoca identificación y respuestas.",
    hashtags: "#limites #relacionestoxicas #amistad #conciencia #verdades",
    prompt: "Dos figuras donde una se acerca solo con la mano extendida pidiendo, luz contrastada, conceptual.",
    tecnicas: ["Reframe", "Gancho de debate", "Contraste"]
  },

  /* ----- VARIADAS (cierre del lote) ----- */
  {
    frase: "Crecer duele porque significa dejar atrás versiones de ti que ya no caben en quien estás siendo.",
    emocion: "Nostalgia", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Da sentido al dolor del cambio personal. Reflexiva y muy compartible.",
    hashtags: "#crecimientopersonal #cambio #saludmental #madurez #reflexion",
    prompt: "Persona soltando una hoja al viento desde una colina al atardecer, estética simbólica y cálida.",
    tecnicas: ["Reframe", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "El perdón no es para quien te hirió. Es para que tú dejes de cargar lo que ya no merece tu energía.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Redefine el perdón como un acto de liberación propia. Top en guardados.",
    hashtags: "#perdon #sanar #saludmental #pazmental #bienestar",
    prompt: "Persona dejando caer una piedra pesada de su mano sobre el agua, ondas suaves, luz serena.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Etiqueta a alguien que necesita escuchar que sí va a estar bien.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "CTA directo y cálido que multiplica el alcance por etiquetas.",
    hashtags: "#esperanza #saludmental #apoyo #bienestar #frases",
    prompt: "Dos manos entrelazadas en señal de apoyo, luz cálida, estética tierna y luminosa.",
    tecnicas: ["CTA invisible", "Prueba social", "Brevedad"]
  },
  {
    frase: "Un día vas a contar todo esto como la etapa que te hizo fuerte, no como la que te rompió.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Proyecta el dolor presente hacia un futuro de superación. Muy motivadora.",
    hashtags: "#superacion #resiliencia #esperanza #fortaleza #mentalidad",
    prompt: "Amanecer tras una noche de tormenta, persona de pie mirando la luz, estética épica y esperanzadora.",
    tecnicas: ["Perspectiva temporal", "Reframe", "Cierre potente"]
  },

  /* ========== LOTE 3 (equilibrado) ========== */

  /* ----- RELACIONES ----- */
  {
    frase: "El amor real no te deja en visto en lo que más te importa.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Frase breve que define el amor por los actos, no las palabras. Invita a opinar.",
    hashtags: "#relaciones #amor #hechos #amorpropio #frases",
    prompt: "Teléfono con una notificación vista y sin respuesta sobre una mesa, luz fría, ambiente tenso.",
    tecnicas: ["Brevedad", "Gancho de debate", "Reframe"]
  },
  {
    frase: "Extrañar no significa volver. A veces extrañas justo lo que te hizo daño.",
    emocion: "Nostalgia", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Aclara la diferencia entre extrañar y querer regresar. Muy útil para sanar.",
    hashtags: "#desamor #soltar #relaciones #sanar #reflexiones",
    prompt: "Persona mirando una foto antigua con expresión pensativa, luz cálida de ventana, tono melancólico.",
    tecnicas: ["Reframe", "Antítesis", "Validación emocional"]
  },
  {
    frase: "Querer a alguien no basta. También hay que saber tratarlo bien.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Separa el sentir del actuar. Sencilla, directa y muy compartible.",
    hashtags: "#relaciones #amor #respeto #parejas #frases",
    prompt: "Dos tazas de café juntas y manos cercanas sobre una mesa de madera, luz cálida, intimidad sencilla.",
    tecnicas: ["Antítesis", "Brevedad", "Regla de oro"]
  },
  {
    frase: "Lo que no se dice a tiempo se convierte en distancia que no se explica.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Toca el costo del silencio en las relaciones. Reflexiva y conectora.",
    hashtags: "#comunicacion #relaciones #silencio #parejas #reflexion",
    prompt: "Dos siluetas en extremos opuestos de un sofá, espacio vacío en medio, luz tenue de tarde.",
    tecnicas: ["Causa-efecto", "Metáfora", "Cierre emocional"]
  },

  /* ----- PSICOLOGÍA ----- */
  {
    frase: "No tienes que estar productivo todo el tiempo para merecer descanso.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Libera de la cultura del rendimiento constante. Alivia y se guarda.",
    hashtags: "#descanso #saludmental #autocuidado #burnout #bienestar",
    prompt: "Persona acostada en el pasto mirando el cielo, luz suave de tarde, sensación de pausa.",
    tecnicas: ["Reframe", "Validación emocional", "Regla de oro"]
  },
  {
    frase: "Tu cuerpo lleva la cuenta de todo lo que tu mente intentó ignorar.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Conecta emociones reprimidas con el cuerpo. Reveladora y compartible.",
    hashtags: "#saludmental #emociones #cuerpo #psicologia #bienestar",
    prompt: "Silueta humana con líneas de tensión suaves en hombros y pecho, estética conceptual serena.",
    tecnicas: ["Revelación", "Metáfora", "Reframe"]
  },
  {
    frase: "Poner límites no te hace egoísta. Te hace responsable de tu propia paz.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Quita la culpa de poner límites. Empoderadora y muy guardable.",
    hashtags: "#limites #saludmental #pazmental #autocuidado #bienestar",
    prompt: "Persona cerrando suavemente una puerta con calma, luz cálida del otro lado, estética serena.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Sentir que retrocedes no siempre es retroceder. A veces es tu mente tomando impulso.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra las recaídas en el proceso de crecer. Da esperanza.",
    hashtags: "#crecimientopersonal #saludmental #proceso #resiliencia #mentalidad",
    prompt: "Arco tensándose antes de soltar la flecha, metáfora de impulso, luz dramática suave.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },

  /* ----- DINERO ----- */
  {
    frase: "Gastas según cómo te sientes. Por eso ordenar tus emociones también ordena tu cartera.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Une finanzas y emociones de forma novedosa. Educativa y guardable.",
    hashtags: "#finanzas #dinero #emociones #habitos #mentalidad",
    prompt: "Persona reflexionando frente a un cuaderno de gastos con una taza de té, luz cálida y honesta.",
    tecnicas: ["Causa-efecto", "Reframe", "Revelación"]
  },
  {
    frase: "El lujo más caro no es un auto. Es deber dinero y fingir que no te quita el sueño.",
    emocion: "Enojo", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Confronta el endeudamiento por apariencia. Genera debate fuerte.",
    hashtags: "#deudas #dinero #finanzas #apariencias #verdades",
    prompt: "Persona despierta de noche con la mirada preocupada, luz azulada de la madrugada, ambiente tenso.",
    tecnicas: ["Antítesis", "Polémica controlada", "Reframe"]
  },
  {
    frase: "Ahorrar sin un porqué es difícil. Ponle nombre a tu meta y verás cómo cambia todo.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Consejo práctico de finanzas conductuales. Accionable y guardable.",
    hashtags: "#ahorro #finanzas #metas #dinero #habitos",
    prompt: "Frasco de ahorros con una etiqueta escrita a mano, luz cálida, ambiente esperanzador.",
    tecnicas: ["Reframe", "Regla práctica", "Llamado a la acción"]
  },

  /* ----- AUTOESTIMA ----- */
  {
    frase: "No bajes tu nivel para que otros no se sientan pequeños a tu lado.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Empodera a no encogerse por la inseguridad ajena. Motivadora.",
    hashtags: "#autoestima #empoderamiento #valor #confianza #frases",
    prompt: "Persona de pie segura bajo un haz de luz, postura firme, estética editorial poderosa.",
    tecnicas: ["Reframe", "Regla de oro", "Cierre potente"]
  },
  {
    frase: "Hablarte bien no es vanidad. Es la base sobre la que construyes todo lo demás.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Defiende el diálogo interno amable como cimiento. Guardable.",
    hashtags: "#amorpropio #autoestima #dialogointerno #bienestar #saludmental",
    prompt: "Persona sonriéndose con calma frente al espejo por la mañana, luz suave y cálida.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Te pasaste años pidiendo perdón por existir como eres. Ya basta.",
    emocion: "Enojo", nicho: "Autoestima", objetivo: "Comentarios",
    descripcion: "Frase de ruptura con la autoexigencia. Provoca identificación intensa.",
    hashtags: "#autoestima #autenticidad #amorpropio #liberacion #frases",
    prompt: "Persona quitándose un peso simbólico de los hombros, luz que entra por una ventana, alivio.",
    tecnicas: ["Espejo emocional", "Reframe", "Gancho de debate"]
  },

  /* ----- NARCISISMO / RELACIONES TÓXICAS ----- */
  {
    frase: "Te pidió que cambiaras 'por amor'. El amor no te pide ser otra persona para merecerlo.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Desenmascara el control disfrazado de amor. Reveladora.",
    hashtags: "#relacionestoxicas #narcisismo #limites #amorpropio #conciencia",
    prompt: "Persona ante dos máscaras eligiendo no ponerse ninguna, luz teatral suave, estilo conceptual.",
    tecnicas: ["Revelación", "Antítesis", "Reframe"]
  },
  {
    frase: "Cuando por fin pusiste el límite, lo llamaron exageración. Ahí supiste que el límite era necesario.",
    emocion: "Orgullo", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Valida los límites frente al reproche manipulador. Empoderadora.",
    hashtags: "#limites #relacionestoxicas #narcisismo #saludmental #conciencia",
    prompt: "Persona sosteniendo una línea de luz entre ella y una sombra, estética conceptual firme.",
    tecnicas: ["Reframe", "Open Loop", "Cierre potente"]
  },

  /* ----- HÁBITOS ----- */
  {
    frase: "No falles dos veces seguidas. Un tropiezo es humano; dos seguidos ya es el nuevo hábito.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Regla práctica y memorable para sostener hábitos. Muy guardable.",
    hashtags: "#habitos #disciplina #constancia #productividad #mejora",
    prompt: "Calendario con marcas diarias y una sola casilla vacía retomada al día siguiente, estética limpia.",
    tecnicas: ["Regla práctica", "Reframe", "Brevedad"]
  },
  {
    frase: "Tu entorno te empuja o te frena. Rodéate de lo que quieres llegar a ser.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Resalta el poder del entorno en los hábitos. Inspiradora.",
    hashtags: "#habitos #entorno #mentalidad #crecimiento #disciplina",
    prompt: "Persona caminando hacia un grupo activo y luminoso, dejando atrás la sombra, estética motivadora.",
    tecnicas: ["Reframe", "Causa-efecto", "Llamado a la acción"]
  },
  {
    frase: "La disciplina es elegirte a ti del futuro por encima de lo que te apetece ahora.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Define la disciplina desde el autocuidado, no el castigo. Guardable.",
    hashtags: "#disciplina #habitos #futuro #mentalidad #autocuidado",
    prompt: "Persona eligiendo agua sobre comodidad, escena cotidiana con luz cálida, decisión consciente.",
    tecnicas: ["Reframe", "Perspectiva temporal", "Metáfora"]
  },

  /* ----- MANIPULACIÓN (límites) ----- */
  {
    frase: "Si tu silencio incomoda a quien siempre te interrumpe, vas por buen camino.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Anima a recuperar la voz frente a quien la opaca. Genera respuestas.",
    hashtags: "#limites #inteligenciaemocional #saludmental #conciencia #verdades",
    prompt: "Persona en calma rodeada de ruido visual que se desvanece, foco nítido en ella, conceptual.",
    tecnicas: ["Reframe", "Gancho de debate", "Brevedad"]
  },
  {
    frase: "Que se enojen cuando dejas de complacer no significa que hagas algo mal. Significa que perdieron una ventaja.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Reencuadra el enojo ajeno al poner límites. Liberadora.",
    hashtags: "#limites #relacionestoxicas #manipulacion #saludmental #conciencia",
    prompt: "Persona soltando hilos de marioneta de sus manos, luz de liberación, estilo conceptual.",
    tecnicas: ["Reframe", "Revelación", "Antítesis"]
  },

  /* ----- CIERRE (extra equilibrio) ----- */
  {
    frase: "Compártelo si crees que sanar también es un acto de valentía.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "CTA directo que dignifica el proceso de sanar. Multiplica alcance.",
    hashtags: "#sanar #valentia #saludmental #bienestar #frases",
    prompt: "Persona de pie frente al amanecer con expresión serena y firme, luz dorada esperanzadora.",
    tecnicas: ["CTA invisible", "Reframe", "Brevedad"]
  },
  {
    frase: "Aprende a estar bien solo. No para alejar a nadie, sino para no quedarte por miedo.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Enseña la independencia emocional como libertad, no aislamiento. Guardable.",
    hashtags: "#amorpropio #soledad #independencia #autoestima #bienestar",
    prompt: "Persona disfrutando un café sola junto a una ventana luminosa, ambiente tranquilo y pleno.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },

  /* ========== LOTE 4 (equilibrado · enfoque ciencia + psicología) ========== */

  /* ----- PSICOLOGÍA / CIENCIA DE LA MENTE ----- */
  {
    frase: "Tu cerebro no distingue del todo entre un peligro real y un pensamiento. Por eso una idea puede acelerarte el corazón.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato de neurociencia explicado simple. Despierta curiosidad e identificación.",
    hashtags: "#neurociencia #ansiedad #psicologia #mente #saludmental",
    prompt: "Ilustración conceptual de un cerebro con conexiones de luz activándose, fondo oscuro, estética científica elegante.",
    tecnicas: ["Curiosity Gap", "Dato revelador", "Reframe"]
  },
  {
    frase: "Recordar algo no es como abrir un archivo: tu mente lo reconstruye cada vez. Por eso dos personas 'recuerdan' lo mismo distinto.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Curiosidad científica sobre la memoria. Invita a debatir experiencias propias.",
    hashtags: "#memoria #cerebro #psicologia #neurociencia #datos",
    prompt: "Fragmentos de fotografías reensamblándose en el aire, luz suave, estética conceptual sobre la memoria.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "La dopamina no es la molécula del placer. Es la del 'quiero más'. Por eso conseguir algo emociona menos que perseguirlo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Desmonta un mito popular sobre la dopamina. Educativo y muy guardable.",
    hashtags: "#dopamina #neurociencia #motivacion #cerebro #psicologia",
    prompt: "Persona persiguiendo un punto de luz que siempre está un paso adelante, estética conceptual minimalista.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Llorar no es debilidad: libera hormonas del estrés. Tu cuerpo lo diseñó para sanarte, no para avergonzarte.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Une ciencia y emoción para validar el llanto. Conecta y reconforta.",
    hashtags: "#emociones #saludmental #llorar #ciencia #bienestar",
    prompt: "Primer plano sereno de una lágrima atrapando la luz, fondo suave, estética íntima y delicada.",
    tecnicas: ["Dato revelador", "Reframe", "Validación emocional"]
  },

  /* ----- RELACIONES ----- */
  {
    frase: "El enamoramiento intenso dura, en promedio, lo que tarda tu cerebro en bajar la euforia química. Lo que queda después se llama elegir.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Ciencia del amor aplicada a las relaciones. Reflexiva y diferente.",
    hashtags: "#amor #relaciones #ciencia #parejas #neurociencia",
    prompt: "Pareja mayor caminando tomada de la mano en un parque otoñal, luz cálida, ternura serena.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Te aferras no por amor, sino porque tu cerebro odia las pérdidas más de lo que disfruta las ganancias.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Aplica la aversión a la pérdida al desamor. Revelador y compartible.",
    hashtags: "#desamor #relaciones #psicologia #soltar #neurociencia",
    prompt: "Mano sosteniendo con fuerza un hilo que ya está suelto, luz dramática, estilo conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Quien te quiere bien no te deja en la incertidumbre. La calma también es una forma de amor.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Define el amor sano por la tranquilidad que da. Guardable.",
    hashtags: "#relaciones #amor #pazmental #parejas #amorpropio",
    prompt: "Dos personas leyendo juntas en silencio en un sofá, luz cálida de tarde, ambiente apacible.",
    tecnicas: ["Reframe", "Regla de oro", "Brevedad"]
  },

  /* ----- AUTOESTIMA ----- */
  {
    frase: "Tu autoestima no se construye con halagos de afuera. Se construye con las promesas que te cumples a ti mismo.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Reenfoca la autoestima hacia el autocompromiso. Accionable y guardable.",
    hashtags: "#autoestima #amorpropio #disciplina #confianza #habitos",
    prompt: "Persona marcando una tarea cumplida en una libreta con satisfacción, luz cálida, ambiente íntimo.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla de oro"]
  },
  {
    frase: "El cerebro recuerda más las críticas que los elogios. No es que valgas poco: es un sesgo de supervivencia. Reescríbelo a propósito.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Explica el sesgo de negatividad y da una salida. Ciencia + empoderamiento.",
    hashtags: "#autoestima #psicologia #sesgos #saludmental #mentalidad",
    prompt: "Balanza donde un lado pesado de sombra empieza a equilibrarse con luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Dejaste de brillar por miedo a incomodar. Pero apagarte nunca hizo más feliz a nadie.",
    emocion: "Enojo", nicho: "Autoestima", objetivo: "Comentarios",
    descripcion: "Frase de empoderamiento contra el autoboicot social. Provoca respuestas.",
    hashtags: "#autoestima #autenticidad #empoderamiento #valor #frases",
    prompt: "Persona quitando un velo de sombra de sí misma y dejando salir la luz, estética conceptual.",
    tecnicas: ["Espejo emocional", "Antítesis", "Gancho de debate"]
  },

  /* ----- DINERO ----- */
  {
    frase: "Tu cerebro siente el gasto con tarjeta menos que con efectivo. Por eso 'no sientes' cuándo te pasaste.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Dato de psicología del consumo, muy útil y guardable.",
    hashtags: "#finanzas #dinero #psicologia #consumo #habitos",
    prompt: "Tarjeta y billetes lado a lado bajo una luz que ilumina más los billetes, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "No te falta dinero para todo. Te falta claridad sobre qué es 'todo' para ti.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reenfoca las finanzas hacia las prioridades personales. Reflexiva.",
    hashtags: "#finanzas #dinero #prioridades #mentalidad #claridad",
    prompt: "Persona escribiendo metas en una pizarra clara y ordenada, luz natural, ambiente enfocado.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },

  /* ----- HÁBITOS ----- */
  {
    frase: "Un hábito no se forma en 21 días. Se forma cuando dejas de necesitar fuerza de voluntad para hacerlo.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Desmonta el mito de los 21 días con criterio real. Educativo y guardable.",
    hashtags: "#habitos #disciplina #ciencia #productividad #mejora",
    prompt: "Sendero que pasa de tierra irregular a camino firme y marcado, metáfora de hábito, luz cálida.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Lo que repites a diario tiene más poder sobre tu vida que lo que haces de vez en cuando con mucha intensidad.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Resalta la repetición sobre la intensidad. Inspirador y compartible.",
    hashtags: "#habitos #constancia #disciplina #mentalidad #mejora",
    prompt: "Goteo constante que llena un recipiente frente a un chorro fugaz que se desborda, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Metáfora"]
  },
  {
    frase: "Prepara el entorno la noche anterior. La voluntad se gasta; un sistema bien puesto no.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Consejo práctico sobre diseño de entorno. Accionable.",
    hashtags: "#habitos #productividad #sistemas #disciplina #rutina",
    prompt: "Ropa y zapatillas listas junto a la puerta la noche anterior, luz tenue, ambiente preparado.",
    tecnicas: ["Regla práctica", "Reframe", "Llamado a la acción"]
  },

  /* ----- NARCISISMO / RELACIONES TÓXICAS ----- */
  {
    frase: "El cariño intermitente engancha más que el constante. No es amor: es el mismo mecanismo que vuelve adictivo el azar.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Explica el refuerzo intermitente en relaciones tóxicas. Revelador y científico.",
    hashtags: "#relacionestoxicas #narcisismo #psicologia #refuerzointermitente #conciencia",
    prompt: "Luz que parpadea de forma irregular sobre una figura que espera, estética conceptual inquietante.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Confundes intensidad con amor porque nadie te enseñó que la calma también puede ser profunda.",
    emocion: "Calma", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Distingue intensidad de amor sano. Ayuda a reconocer patrones.",
    hashtags: "#relacionestoxicas #amor #pazmental #limites #saludmental",
    prompt: "Contraste entre una llama agitada y una vela estable, luz cálida, estética conceptual serena.",
    tecnicas: ["Antítesis", "Reframe", "Validación emocional"]
  },

  /* ----- MANIPULACIÓN (límites) ----- */
  {
    frase: "La persona que te hace sentir culpable por tener necesidades, es justo de quien debes cuidarte.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Señala una bandera roja clara. Genera identificación y debate.",
    hashtags: "#limites #manipulacion #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona protegiendo una pequeña luz en sus manos frente a una sombra, estética conceptual firme.",
    tecnicas: ["Reframe", "Gancho de debate", "Brevedad"]
  },
  {
    frase: "Decir 'me hizo sentir mal' no es un ataque. Es información. Quien la ignora, te está diciendo quién es.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Enseña a leer la respuesta del otro ante tus emociones. Revelador.",
    hashtags: "#limites #comunicacion #relaciones #inteligenciaemocional #conciencia",
    prompt: "Dos figuras donde una extiende una nota y la otra la aparta, luz contrastada, conceptual.",
    tecnicas: ["Reframe", "Revelación", "Regla de oro"]
  },

  /* ----- CIERRE EQUILIBRIO ----- */
  {
    frase: "Sonreír, aunque sea forzado, le manda al cerebro una señal de calma. A veces el cuerpo guía a la mente, no al revés.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Dato de psicología corporal sencillo y accionable. Curioso y positivo.",
    hashtags: "#psicologia #bienestar #cerebro #emociones #ciencia",
    prompt: "Persona con una sonrisa suave bajo luz matutina cálida, ambiente sereno y luminoso.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Guárdalo: la mente que aprende a observarse sin juzgarse es la que de verdad cambia.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Principio de autoconciencia sin autocrítica. CTA invisible de guardar.",
    hashtags: "#autoconciencia #saludmental #psicologia #bienestar #mindfulness",
    prompt: "Persona meditando junto a una ventana con plantas, luz natural, atmósfera de calma y claridad.",
    tecnicas: ["CTA invisible", "Reframe", "Cierre emocional"]
  },

  /* ========== LOTE 5 (equilibrado · ciencia + psicología) ========== */

  /* ----- PSICOLOGÍA / CIENCIA DE LA MENTE ----- */
  {
    frase: "Tu mente repite los pensamientos negativos no porque sean ciertos, sino porque los practicaste más.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica los pensamientos automáticos como hábitos mentales reentrenables.",
    hashtags: "#psicologia #pensamientos #saludmental #mente #habitos",
    prompt: "Sendero marcado en la hierba por el paso repetido, junto a uno nuevo apenas iniciado, luz cálida.",
    tecnicas: ["Reframe", "Causa-efecto", "Dato revelador"]
  },
  {
    frase: "El estrés no es siempre el enemigo. En dosis cortas afila tu mente; el problema es no apagarlo nunca.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Matiza la idea del estrés con criterio científico. Útil y compartible.",
    hashtags: "#estres #saludmental #psicologia #bienestar #ciencia",
    prompt: "Cuerda de instrumento tensada en su punto justo, luz suave, estética conceptual de equilibrio.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Posponer una decisión también es decidir. Tu cerebro lo hace para evitar el miedo, no para protegerte.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Revela el mecanismo detrás de la indecisión. Genera reflexión y respuestas.",
    hashtags: "#decisiones #psicologia #miedo #mente #crecimientopersonal",
    prompt: "Persona ante dos puertas dudando, reloj de fondo avanzando, luz tenue, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Dormir mal no solo te cansa: borra parte de lo que aprendiste. El descanso es donde tu cerebro guarda el progreso.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre sueño y memoria. Educativo y muy guardable.",
    hashtags: "#sueño #cerebro #memoria #saludmental #ciencia",
    prompt: "Persona durmiendo plácidamente mientras destellos suaves de luz se ordenan sobre su cabeza, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },

  /* ----- RELACIONES ----- */
  {
    frase: "Pasamos horas analizando a quien nos ignora y minutos valorando a quien sí está. El cerebro premia lo incierto.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Aplica el sesgo hacia lo incierto a las relaciones. Revelador.",
    hashtags: "#relaciones #psicologia #amorpropio #desamor #reflexion",
    prompt: "Persona mirando un teléfono mientras alguien presente a su lado espera, luz contrastada, conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Espejo emocional"]
  },
  {
    frase: "No se trata de encontrar a alguien perfecto. Se trata de encontrar a alguien con quien valga la pena reparar lo imperfecto.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Madura la idea del amor real frente al ideal. Guardable.",
    hashtags: "#relaciones #amor #parejas #madurez #frases",
    prompt: "Dos manos reparando juntas una taza de cerámica con líneas doradas (kintsugi), luz cálida.",
    tecnicas: ["Reframe", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Si después de hablar con alguien sientes paz y no ansiedad, presta atención: ahí hay algo sano.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Da una señal corporal para reconocer vínculos sanos. Práctica.",
    hashtags: "#relaciones #pazmental #amorpropio #vinculos #bienestar",
    prompt: "Dos personas conversando relajadas en un banco al atardecer, luz dorada, ambiente apacible.",
    tecnicas: ["Reframe", "Regla práctica", "Identificación"]
  },

  /* ----- AUTOESTIMA ----- */
  {
    frase: "Te exiges una perfección que no le pedirías jamás a alguien que amas. Empieza a tratarte como a esa persona.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Invita a la autocompasión usando el contraste con el trato a otros.",
    hashtags: "#amorpropio #autocompasion #autoestima #saludmental #bienestar",
    prompt: "Persona abrazándose a sí misma con ternura frente a un espejo, luz cálida y suave.",
    tecnicas: ["Reframe", "Contraste", "Regla de oro"]
  },
  {
    frase: "Cada vez que cumples una promesa pequeña que te hiciste, tu cerebro aprende a confiar en ti.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Conecta autoconfianza y autocompromiso con base psicológica. Motivadora.",
    hashtags: "#autoestima #confianza #disciplina #habitos #mentalidad",
    prompt: "Persona marcando con satisfacción un pequeño logro diario en una libreta, luz cálida.",
    tecnicas: ["Causa-efecto", "Reframe", "Cierre potente"]
  },
  {
    frase: "No eres 'demasiado'. Solo estuviste rodeado de gente con poca capacidad para sostenerte.",
    emocion: "Enojo", nicho: "Autoestima", objetivo: "Comentarios",
    descripcion: "Devuelve el valor a quien fue tachado de intenso. Provoca identificación.",
    hashtags: "#autoestima #autenticidad #amorpropio #valor #frases",
    prompt: "Persona iluminada con fuerza mientras las sombras alrededor no logran contenerla, conceptual.",
    tecnicas: ["Reframe", "Espejo emocional", "Gancho de debate"]
  },

  /* ----- DINERO ----- */
  {
    frase: "Comparas tu sueldo con el de otros y te sientes pobre. La comparación es el ladrón silencioso de tu tranquilidad.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Une psicología de la comparación y finanzas. Reflexiva.",
    hashtags: "#dinero #finanzas #comparacion #mentalidad #bienestar",
    prompt: "Persona en calma frente a su propio camino, ignorando carriles vecinos, luz serena, conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "El primer paso para tener dinero no es ganar más. Es saber a dónde se va el que ya tienes.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Consejo financiero base, claro y accionable. Compartible.",
    hashtags: "#finanzas #ahorro #dinero #educacionfinanciera #habitos",
    prompt: "Persona revisando un registro de gastos con claridad y calma, luz natural, ambiente honesto.",
    tecnicas: ["Reframe", "Llamado a la acción", "Brevedad"]
  },

  /* ----- HÁBITOS ----- */
  {
    frase: "No necesitas más tiempo. Necesitas proteger el poco que tienes de las cosas que no elegiste.",
    emocion: "Sorpresa", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Reenfoca la gestión del tiempo hacia la protección de la atención.",
    hashtags: "#productividad #habitos #tiempo #enfoque #disciplina",
    prompt: "Reloj de arena protegido por dos manos del viento, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Metáfora"]
  },
  {
    frase: "El truco no es no caer. Es acortar el tiempo entre la caída y volver a empezar.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Resalta la recuperación rápida sobre la perfección. Motivadora.",
    hashtags: "#habitos #constancia #resiliencia #disciplina #mejora",
    prompt: "Persona levantándose tras un tropiezo en una pista, mirada decidida, luz dinámica.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Lo que mides, mejora. Anota una sola cosa al día y verás cómo tu mente empieza a cuidarla.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Principio práctico del seguimiento de hábitos. Accionable.",
    hashtags: "#habitos #productividad #seguimiento #disciplina #mejora",
    prompt: "Pequeña tabla de seguimiento con una marca diaria y un lápiz, luz limpia, estética minimalista.",
    tecnicas: ["Regla práctica", "Causa-efecto", "Llamado a la acción"]
  },

  /* ----- NARCISISMO / RELACIONES TÓXICAS ----- */
  {
    frase: "Primero crean el problema, luego se ofrecen como la solución. Y tú terminas agradeciéndoles el alivio que ellos provocaron.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Describe un patrón de control con claridad. Revelador y guardable.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #saludmental #conciencia",
    prompt: "Figura que apaga y enciende una luz mientras otra agradece, luz intermitente, conceptual.",
    tecnicas: ["Revelación", "Open Loop", "Reframe"]
  },
  {
    frase: "Te acostumbraste tanto al caos que la tranquilidad te parecía aburrida. Eso no eras tú: era lo que te enseñaron.",
    emocion: "Calma", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Explica por qué la calma incomoda tras una relación tóxica. Sanadora.",
    hashtags: "#relacionestoxicas #pazmental #saludmental #sanar #conciencia",
    prompt: "Persona aprendiendo a disfrutar el silencio en una habitación luminosa y ordenada, luz suave.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre emocional"]
  },

  /* ----- MANIPULACIÓN (límites) ----- */
  {
    frase: "Pedir respeto no es ser difícil. Difícil es convivir contigo mismo cuando te traicionas por agradar.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Reenfoca el costo de no poner límites. Genera identificación y debate.",
    hashtags: "#limites #amorpropio #inteligenciaemocional #saludmental #conciencia",
    prompt: "Persona de pie firme bajo un foco, sombras alrededor retrocediendo, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "No tienes que asistir a cada discusión a la que te invitan. El silencio también es un límite.",
    emocion: "Calma", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Enseña el silencio elegido como herramienta de límite. Guardable.",
    hashtags: "#limites #inteligenciaemocional #pazmental #saludmental #conciencia",
    prompt: "Persona alejándose serena de un grupo que discute, luz cálida adelante, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },

  /* ----- CIERRE EQUILIBRIO ----- */
  {
    frase: "Tu atención es la moneda más cara que tienes. Decide con cuidado a quién y a qué se la regalas.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Eleva la atención a recurso valioso. Reflexiva y compartible.",
    hashtags: "#atencion #enfoque #psicologia #mentalidad #bienestar",
    prompt: "Haz de luz concentrado iluminando un solo objeto en una sala oscura, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre potente"]
  },
  {
    frase: "Guárdalo para tus días difíciles: no tienes que sentirte bien para hacer lo correcto por ti.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Separa la emoción de la acción de autocuidado. CTA de guardar incluido.",
    hashtags: "#autocuidado #saludmental #disciplina #bienestar #amorpropio",
    prompt: "Persona abriendo las cortinas en un día gris dejando entrar la luz, gesto de cuidado, cálido.",
    tecnicas: ["CTA invisible", "Reframe", "Brevedad"]
  },

  /* ========== LOTE 6 (equilibrado · estrena categoría Ciencia) ========== */

  /* ----- CIENCIA / CURIOSIDADES ----- */
  {
    frase: "Tu intestino produce gran parte de la serotonina de tu cuerpo. Por eso lo que comes también cambia cómo te sientes.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato del eje intestino-cerebro, simple y útil. Genera curiosidad y guardados.",
    hashtags: "#ciencia #cerebro #serotonina #saludmental #datoscuriosos",
    prompt: "Ilustración conceptual elegante que conecta el cerebro y el sistema digestivo con líneas de luz, fondo oscuro.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Causa-efecto"]
  },
  {
    frase: "El cerebro humano consume cerca del 20% de tu energía pesando apenas el 2% de tu cuerpo. Pensar, literalmente, cansa.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato impactante sobre el gasto energético del cerebro. Muy compartible.",
    hashtags: "#ciencia #cerebro #neurociencia #datoscuriosos #mente",
    prompt: "Cerebro iluminado como una ciudad de noche consumiendo energía, estética científica elegante.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Brevedad"]
  },
  {
    frase: "No 'ves' con los ojos: ves con el cerebro. Los ojos solo envían datos que tu mente interpreta… y a veces inventa.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Curiosidad sobre la percepción visual. Abre debate sobre ilusiones.",
    hashtags: "#ciencia #percepcion #cerebro #neurociencia #datoscuriosos",
    prompt: "Ojo del que salen líneas de datos hacia un cerebro que reconstruye una imagen, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Cada vez que aprendes algo, tu cerebro cambia físicamente. No eres el mismo de ayer: tienes conexiones nuevas.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la neuroplasticidad de forma motivadora. Inspirador y guardable.",
    hashtags: "#neuroplasticidad #cerebro #ciencia #aprendizaje #crecimiento",
    prompt: "Red neuronal formando conexiones brillantes nuevas, fondo oscuro, estética científica luminosa.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre potente"]
  },
  {
    frase: "Respirar lento y profundo no es 'solo relajarte': le avisa a tu sistema nervioso que el peligro pasó.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica por qué la respiración calma, con base fisiológica. Práctico.",
    hashtags: "#ciencia #respiracion #ansiedad #sistemanervioso #bienestar",
    prompt: "Persona respirando profundo con ondas suaves de calma a su alrededor, luz serena, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Tu mente no puede estar agradecida y ansiosa al mismo tiempo. Por algo la gratitud cambia tu química.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Une gratitud y regulación emocional con tono científico. Guardable.",
    hashtags: "#gratitud #ciencia #cerebro #bienestar #saludmental",
    prompt: "Persona escribiendo en un diario de gratitud junto a una ventana luminosa, ambiente cálido.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },

  /* ----- PSICOLOGÍA ----- */
  {
    frase: "Postergar lo que te incomoda no lo hace desaparecer. Solo le da tiempo a la ansiedad para crecer.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Conecta evitación y ansiedad. Reflexiva y compartible.",
    hashtags: "#ansiedad #psicologia #procrastinacion #saludmental #mente",
    prompt: "Pequeña sombra que crece mientras una persona la ignora, luz tenue, estética conceptual.",
    tecnicas: ["Causa-efecto", "Reframe", "Metáfora"]
  },
  {
    frase: "Decir 'estoy bien' cuando no lo estás también enseña a tu mente a no escucharte.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Invita a la honestidad emocional contigo mismo. Profunda.",
    hashtags: "#emociones #saludmental #honestidad #psicologia #bienestar",
    prompt: "Persona frente al espejo con expresión sincera y cansada, luz suave, ambiente íntimo.",
    tecnicas: ["Reframe", "Causa-efecto", "Validación emocional"]
  },

  /* ----- RELACIONES ----- */
  {
    frase: "A veces la madurez es entender que esa persona no te faltó al respeto por error: simplemente te mostró su límite real.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Reencuadra decepciones como información sobre el otro. Genera debate.",
    hashtags: "#relaciones #madurez #limites #amorpropio #reflexion",
    prompt: "Persona observando con calma desde cierta distancia a otra, luz neutra, estética serena.",
    tecnicas: ["Reframe", "Revelación", "Gancho de debate"]
  },
  {
    frase: "El amor que necesita que te encojas no es amor: es una jaula con buena decoración.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Metáfora potente sobre relaciones que limitan. Compartible.",
    hashtags: "#relaciones #amorpropio #libertad #limites #frases",
    prompt: "Jaula dorada abierta con una persona saliendo hacia la luz, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Antítesis"]
  },

  /* ----- AUTOESTIMA ----- */
  {
    frase: "Pedir ayuda no te resta valor. Cargarlo todo solo para parecer fuerte sí te resta paz.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Normaliza pedir ayuda. Libera de la falsa fortaleza. Guardable.",
    hashtags: "#autoestima #saludmental #ayuda #vulnerabilidad #bienestar",
    prompt: "Mano que se extiende para ayudar a otra a subir, luz cálida, ambiente de apoyo.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Eres la única persona con la que vas a pasar el resto de tu vida. Empieza a tratarte como tal.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Recordatorio potente de autovaloración. Muy compartible.",
    hashtags: "#amorpropio #autoestima #autocuidado #valor #frases",
    prompt: "Persona caminando segura junto a su propio reflejo en un escaparate, luz cálida urbana.",
    tecnicas: ["Reframe", "Llamado a la acción", "Cierre potente"]
  },

  /* ----- DINERO ----- */
  {
    frase: "No es que el tiempo sea dinero. Es que el dinero bien usado te compra tiempo libre. No es lo mismo.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Matiza un dicho popular con criterio. Reflexivo y guardable.",
    hashtags: "#dinero #tiempo #libertadfinanciera #finanzas #mentalidad",
    prompt: "Reloj y monedas en una balanza equilibrada, luz cálida, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "Endeudarte para impresionar a gente que no piensa en ti es el peor negocio del mundo.",
    emocion: "Enojo", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Confronta el gasto por estatus. Genera debate y acuerdo.",
    hashtags: "#deudas #dinero #finanzas #apariencias #verdades",
    prompt: "Persona cargando bolsas de lujo con cara de preocupación, luz dura, estilo conceptual.",
    tecnicas: ["Antítesis", "Polémica controlada", "Gancho de debate"]
  },

  /* ----- HÁBITOS ----- */
  {
    frase: "Hazlo aburrido y constante en vez de épico y ocasional. Lo aburrido sostenido es lo que de verdad transforma.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Defiende la constancia discreta sobre los arranques intensos. Guardable.",
    hashtags: "#habitos #constancia #disciplina #productividad #mejora",
    prompt: "Persona haciendo su rutina diaria con calma en un espacio ordenado, luz natural constante.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "Cada vez que dices 'mañana empiezo', tu cerebro aprende que tus planes son negociables.",
    emocion: "Sorpresa", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Señala el costo invisible de posponer. Provoca reflexión.",
    hashtags: "#habitos #disciplina #procrastinacion #mentalidad #constancia",
    prompt: "Calendario con muchos 'mañana' tachados, una mano a punto de empezar hoy, estética conceptual.",
    tecnicas: ["Causa-efecto", "Reframe", "Gancho de debate"]
  },

  /* ----- NARCISISMO / RELACIONES TÓXICAS ----- */
  {
    frase: "Si solo eres 'el malo' cuando pones límites y 'el bueno' cuando obedeces, no te quieren: te administran.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Expone la dinámica de control con una frase contundente. Debate fuerte.",
    hashtags: "#relacionestoxicas #narcisismo #limites #manipulacion #conciencia",
    prompt: "Figura moviendo a otra como pieza de ajedrez, luz contrastada, estilo conceptual.",
    tecnicas: ["Antítesis", "Revelación", "Gancho de debate"]
  },
  {
    frase: "Volver con quien te lastimó porque 'cambió' suele ser volver a la misma película esperando otro final.",
    emocion: "Calma", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Advierte sobre las recaídas en relaciones tóxicas. Guardable.",
    hashtags: "#relacionestoxicas #narcisismo #limites #saludmental #sanar",
    prompt: "Persona ante una puerta giratoria que vuelve al mismo lugar, luz tenue, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Regla de oro"]
  },

  /* ----- MANIPULACIÓN (límites) ----- */
  {
    frase: "Quien te quiere bien no te castiga con silencio por haber dicho lo que sentías.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Señala la ley del hielo como forma de control. Identificación clara.",
    hashtags: "#limites #relacionestoxicas #manipulacion #saludmental #conciencia",
    prompt: "Persona hablando mientras la otra le da la espalda en silencio, luz fría, conceptual.",
    tecnicas: ["Reframe", "Revelación", "Brevedad"]
  },
  {
    frase: "Cuidado con quien te pide paciencia para todo, pero no te ofrece cambio para nada.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Distingue la paciencia sana de la excusa indefinida. Genera respuestas.",
    hashtags: "#limites #relaciones #paciencia #conciencia #verdades",
    prompt: "Reloj de arena que nunca termina de caer junto a una persona que espera, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Gancho de debate"]
  },

  /* ========== LOTE 7 (equilibrado · más peso en Ciencia) ========== */

  /* ----- CIENCIA / CURIOSIDADES ----- */
  {
    frase: "Tu cerebro decide muchas cosas segundos antes de que 'tú' creas haberlo decidido. El libre albedrío es más lento de lo que sientes.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Curiosidad de neurociencia que invita a debatir sobre la decisión. Polémica sana.",
    hashtags: "#neurociencia #cerebro #ciencia #librealbedrio #datoscuriosos",
    prompt: "Cerebro con un destello de actividad anticipándose a una mano que actúa, estética científica.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "No existe el 'multitasking': tu cerebro solo cambia de tarea muy rápido, y cada cambio te cuesta concentración.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Desmonta el mito de la multitarea con base científica. Útil y guardable.",
    hashtags: "#ciencia #productividad #cerebro #enfoque #neurociencia",
    prompt: "Persona rodeada de varias pantallas con líneas de atención cruzándose y rompiéndose, conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Bostezar es contagioso incluso al leerlo. Tu cerebro está cableado para imitar a los demás sin que lo notes.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato curioso sobre neuronas espejo y empatía. Muy compartible por lo lúdico.",
    hashtags: "#ciencia #cerebro #empatia #datoscuriosos #neuronasespejo",
    prompt: "Varias siluetas bostezando en cadena bajo una luz suave, estética conceptual amigable.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Interacción"]
  },
  {
    frase: "La música que te pone la piel de gallina libera el mismo químico del placer que la comida o el amor.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Conecta música y dopamina. Curioso y emocional a la vez.",
    hashtags: "#ciencia #musica #dopamina #cerebro #datoscuriosos",
    prompt: "Persona con los ojos cerrados sintiendo la música, ondas de luz suaves a su alrededor, conceptual.",
    tecnicas: ["Dato revelador", "Identificación", "Reframe"]
  },
  {
    frase: "Tu memoria no guarda los hechos: guarda la última vez que los recordaste. Cada recuerdo es una copia de una copia.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Profundiza en cómo se reescribe la memoria. Fascinante y guardable.",
    hashtags: "#memoria #cerebro #ciencia #neurociencia #datoscuriosos",
    prompt: "Fotografía que se va difuminando en cada reimpresión sucesiva, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "Pasar tiempo en la naturaleza baja de verdad tus niveles de estrés. No es poético: es medible.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Respalda el efecto de la naturaleza con tono científico. Positivo y accionable.",
    hashtags: "#ciencia #naturaleza #estres #bienestar #saludmental",
    prompt: "Persona caminando entre árboles altos con luz filtrándose, ambiente sereno y verde.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Tu sentido del tiempo se acelera con la rutina y se alarga con lo nuevo. Por eso los veranos de niño parecían eternos.",
    emocion: "Nostalgia", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica la percepción del tiempo con un giro nostálgico. Muy compartible.",
    hashtags: "#ciencia #tiempo #cerebro #memoria #datoscuriosos",
    prompt: "Niño jugando en un verano dorado infinito frente a un adulto con un reloj veloz, conceptual.",
    tecnicas: ["Dato revelador", "Nostalgia", "Curiosity Gap"]
  },
  {
    frase: "Sonríe y tu cerebro empieza a creerse un poco más feliz. El gesto no solo expresa la emoción: también la provoca.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Hipótesis de la retroalimentación facial, simple y accionable.",
    hashtags: "#ciencia #cerebro #felicidad #bienestar #psicologia",
    prompt: "Persona sonriendo suavemente bajo luz cálida matutina, ambiente luminoso y sereno.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },

  /* ----- PSICOLOGÍA ----- */
  {
    frase: "Lo que callas para evitar un conflicto hoy, lo gritará tu cuerpo mañana.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Conecta represión emocional y salud. Reflexiva e impactante.",
    hashtags: "#emociones #saludmental #psicologia #cuerpo #bienestar",
    prompt: "Silueta con tensión acumulada en hombros y mandíbula, líneas suaves, estética conceptual.",
    tecnicas: ["Causa-efecto", "Reframe", "Metáfora"]
  },
  {
    frase: "Compararte es injusto: ves el resumen editado de los demás y el documental completo de ti.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Metáfora memorable contra la comparación. Guardable.",
    hashtags: "#comparacion #saludmental #autoestima #psicologia #bienestar",
    prompt: "Pantalla con un tráiler brillante frente a una sala viendo metraje crudo, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Contraste"]
  },

  /* ----- RELACIONES ----- */
  {
    frase: "Una disculpa sin cambio es solo manipulación con buenos modales.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Frase corta y contundente que separa palabras de hechos. Genera debate.",
    hashtags: "#relaciones #limites #disculpas #verdades #amorpropio",
    prompt: "Mano ofreciendo una nota de disculpa mientras la otra repite un gesto dañino, conceptual.",
    tecnicas: ["Antítesis", "Brevedad", "Gancho de debate"]
  },
  {
    frase: "No necesitas a alguien que te complete. Necesitas a alguien que no te haga sentir incompleto.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Madura la idea del amor desde la suficiencia propia. Guardable.",
    hashtags: "#relaciones #amorpropio #parejas #autoestima #frases",
    prompt: "Dos personas caminando juntas pero completas, cada una con su propia luz, estética cálida.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },

  /* ----- AUTOESTIMA ----- */
  {
    frase: "Te criticas creyendo que así mejoras. Pero nadie floreció en un lugar donde solo le señalaban lo seco.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Metáfora sobre la autocrítica destructiva. Reflexiva y compartible.",
    hashtags: "#autoestima #autocompasion #saludmental #amorpropio #bienestar",
    prompt: "Planta creciendo hacia la luz en tierra cuidada frente a otra en tierra seca, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Antítesis"]
  },
  {
    frase: "Que no te elijan no te hace menos valioso. A nadie le gusta la misma canción y eso no le quita su valor a la canción.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Metáfora reconfortante sobre el rechazo. Guardable.",
    hashtags: "#autoestima #rechazo #amorpropio #valor #frases",
    prompt: "Disco de vinilo girando bajo una luz cálida, estética nostálgica y serena.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },

  /* ----- DINERO ----- */
  {
    frase: "La libertad no es tener mucho dinero. Es no tener que decir que sí a todo por necesitarlo.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Redefine la libertad financiera desde la elección. Reflexiva.",
    hashtags: "#libertadfinanciera #dinero #finanzas #mentalidad #vida",
    prompt: "Persona rechazando con calma una oferta, postura serena, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },

  /* ----- HÁBITOS ----- */
  {
    frase: "Junta un hábito nuevo a uno que ya tienes. Tu cerebro aprende más rápido por asociación que por fuerza.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Técnica de apilamiento de hábitos con base psicológica. Accionable.",
    hashtags: "#habitos #productividad #disciplina #ciencia #mejora",
    prompt: "Dos engranajes encajando, uno viejo y uno nuevo, girando juntos, estética conceptual limpia.",
    tecnicas: ["Regla práctica", "Dato revelador", "Llamado a la acción"]
  },

  /* ----- NARCISISMO ----- */
  {
    frase: "Te hicieron creer que su versión calmada era un premio. La paz no debería sentirse como una recompensa por portarte bien.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Revela cómo se normaliza el maltrato intermitente. Sanadora.",
    hashtags: "#relacionestoxicas #narcisismo #pazmental #limites #conciencia",
    prompt: "Luz que se enciende como premio tras una sombra, persona dándose cuenta, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Antítesis"]
  },

  /* ----- MANIPULACIÓN ----- */
  {
    frase: "Te hicieron sentir exagerado por sentir. Sentir nunca fue el problema; lo fue que no te quisieron escuchar.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Valida las emociones invalidadas por otros. Liberadora.",
    hashtags: "#limites #emociones #saludmental #manipulacion #conciencia",
    prompt: "Persona expresándose mientras la otra minimiza con un gesto, luz contrastada, conceptual.",
    tecnicas: ["Validación emocional", "Reframe", "Cierre potente"]
  },

  /* ========== LOTE 8 (Ciencia / curiosidades) ========== */
  {
    frase: "La cafeína no te da energía: bloquea la señal de cansancio. Por eso luego llega de golpe la cuenta del sueño.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el mecanismo real de la cafeína. Curioso y útil.",
    hashtags: "#ciencia #cafe #cerebro #sueño #datoscuriosos",
    prompt: "Taza de café con engranajes de reloj alrededor, luz cálida, estética conceptual elegante.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "El ejercicio no solo cambia tu cuerpo: hace crecer conexiones en tu cerebro. Mover el cuerpo es cuidar la mente.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Conecta ejercicio y salud cerebral. Motivador y compartible.",
    hashtags: "#ciencia #ejercicio #cerebro #saludmental #bienestar",
    prompt: "Persona corriendo al amanecer con destellos de luz en la cabeza, estética científica luminosa.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Los olores van directo a la zona de la memoria y la emoción. Por eso un perfume puede traerte a alguien de golpe.",
    emocion: "Nostalgia", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Curiosidad sobre olfato y memoria. Emotiva y muy compartible.",
    hashtags: "#ciencia #olfato #memoria #cerebro #datoscuriosos",
    prompt: "Frasco de perfume del que salen recuerdos en forma de luz suave, estética conceptual nostálgica.",
    tecnicas: ["Dato revelador", "Nostalgia", "Identificación"]
  },
  {
    frase: "Reír de verdad relaja tus arterias y baja el estrés. Tu carcajada es, literalmente, medicina gratis.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Respalda el beneficio de la risa. Positivo y compartible.",
    hashtags: "#ciencia #risa #bienestar #salud #datoscuriosos",
    prompt: "Grupo de amigos riendo con luz cálida y natural, ambiente alegre y genuino.",
    tecnicas: ["Dato revelador", "Reframe", "Brevedad"]
  },
  {
    frase: "Tener vínculos cercanos predice tu salud mejor que muchos hábitos. La soledad crónica pesa como una enfermedad.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre conexión social y longevidad. Profundo y guardable.",
    hashtags: "#ciencia #conexion #salud #relaciones #bienestar",
    prompt: "Manos de varias personas unidas en círculo bajo luz cálida, estética conceptual humana.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "El efecto placebo es tan real que una pastilla sin nada puede aliviar dolor. Tu expectativa cambia tu biología.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica el placebo de forma simple. Genera debate y asombro.",
    hashtags: "#ciencia #placebo #cerebro #mente #datoscuriosos",
    prompt: "Pastilla de luz suave en una mano abierta, fondo neutro, estética conceptual elegante.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Tu cerebro borra los sueños a propósito al despertar. Recordar todo lo que sueñas te impediría distinguir lo real.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Curiosidad sobre el olvido de los sueños. Fascinante y guardable.",
    hashtags: "#ciencia #sueños #cerebro #memoria #datoscuriosos",
    prompt: "Persona despertando mientras imágenes oníricas se disuelven en luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Tomar decisiones cansa al cerebro. Por eso al final del día caes en lo fácil: no es falta de carácter, es batería baja.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la fatiga de decisión. Libera de culpa y es accionable.",
    hashtags: "#ciencia #decisiones #cerebro #productividad #psicologia",
    prompt: "Batería mental descargándose junto a un escritorio al anochecer, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Validación emocional"]
  },
  {
    frase: "Crees que todos notan tu error, pero casi nadie lo recuerda mañana. Se llama efecto foco: el reflector es tuyo, no de ellos.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el efecto foco para aliviar la ansiedad social. Compartible.",
    hashtags: "#ciencia #psicologia #ansiedadsocial #cerebro #bienestar",
    prompt: "Persona bajo un reflector que en realidad nadie mira, multitud distraída, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Identificación"]
  },
  {
    frase: "La luz azul de las pantallas le dice a tu cerebro que aún es de día. Por eso te cuesta dormir tras el último scroll.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato práctico sobre pantallas y sueño. Accionable y guardable.",
    hashtags: "#ciencia #sueño #pantallas #cerebro #bienestar",
    prompt: "Rostro iluminado por la luz azul de un teléfono en la oscuridad, estética conceptual.",
    tecnicas: ["Dato revelador", "Causa-efecto", "Llamado a la acción"]
  },

  /* ========== LOTE 9 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Las tareas sin terminar ocupan espacio en tu mente hasta que las cierras. Por eso anotar lo pendiente te calma.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica el efecto Zeigarnik de forma útil. Accionable y guardable.",
    hashtags: "#psicologia #productividad #mente #ansiedad #bienestar",
    prompt: "Lista de tareas con varias casillas marcadas y una mente despejándose, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Buscas pruebas de lo que ya crees e ignoras el resto. Por eso cambiar de opinión se siente como perder.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Explica el sesgo de confirmación. Genera reflexión y debate.",
    hashtags: "#psicologia #sesgos #mente #pensamiento #crecimientopersonal",
    prompt: "Persona mirando solo a través de una rendija que confirma lo que espera, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Seguir en algo que ya no funciona solo porque 'ya invertiste tanto' es la trampa que más sueños entierra.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Explica la falacia del costo hundido aplicada a la vida. Revelador.",
    hashtags: "#psicologia #decisiones #soltar #mentalidad #crecimientopersonal",
    prompt: "Persona soltando un ancla pesada para poder avanzar en un bote, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Metáfora"]
  },
  {
    frase: "No reaccionas a lo que pasa, sino a lo que te dices que significa. Cambia la historia y cambia la emoción.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Principio de la terapia cognitiva, simple y accionable. Guardable.",
    hashtags: "#psicologia #emociones #pensamiento #saludmental #bienestar",
    prompt: "Mismo paisaje visto con dos filtros de luz distintos, estética conceptual de perspectiva.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla de oro"]
  },
  {
    frase: "El cuerpo recuerda la calma con la que lo tratas. Háblate suave hasta cuando fallas.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Invita a la autocompasión con tono cálido. Conecta.",
    hashtags: "#autocompasion #saludmental #psicologia #amorpropio #bienestar",
    prompt: "Persona con la mano en el corazón respirando en calma, luz suave, ambiente íntimo.",
    tecnicas: ["Reframe", "Regla de oro", "Cierre emocional"]
  },
  {
    frase: "Madurar es dejar de buscar culpables y empezar a buscar responsabilidad. Una te ancla, la otra te libera.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Distingue culpa de responsabilidad. Profundo y guardable.",
    hashtags: "#madurez #psicologia #responsabilidad #crecimientopersonal #mentalidad",
    prompt: "Persona tomando las riendas de su propio camino al amanecer, estética conceptual firme.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "Te quedaste por la persona que prometía ser, no por la que era. Y esa diferencia te costó años.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Toca el costo de aferrarse al potencial ajeno. Identificación fuerte.",
    hashtags: "#relaciones #desamor #amorpropio #soltar #reflexion",
    prompt: "Persona mirando una silueta que se desvanece entre lo que era y lo que prometía, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Espejo emocional"]
  },
  {
    frase: "El respeto no se pide cada semana. Cuando hay que recordarlo constantemente, ya no es respeto: es tolerancia condicionada.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Frase contundente sobre el respeto en pareja. Genera debate.",
    hashtags: "#relaciones #respeto #limites #parejas #verdades",
    prompt: "Dos figuras a distinta altura, una mirando hacia arriba esperando, luz fría, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "A veces no extrañas a la persona. Extrañas a quien eras tú cuando todavía creías en ella.",
    emocion: "Nostalgia", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Giro profundo sobre el duelo amoroso. Muy guardable.",
    hashtags: "#desamor #relaciones #nostalgia #amorpropio #frases",
    prompt: "Persona mirando un reflejo más joven y esperanzado de sí misma, luz cálida melancólica.",
    tecnicas: ["Reframe", "Open Loop", "Cierre emocional"]
  },
  {
    frase: "Te enseñaron a ser fuerte, pero no a pedir ayuda. Y cargar todo solo no es fortaleza: es soledad con buena fama.",
    emocion: "Tristeza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Cuestiona la falsa fortaleza. Identificación profunda.",
    hashtags: "#autoestima #saludmental #vulnerabilidad #ayuda #bienestar",
    prompt: "Persona sosteniendo un peso enorme sola bajo luz tenue, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Espejo emocional"]
  },
  {
    frase: "Dejar de explicarte ante quien solo quiere malinterpretarte también es una forma de quererte.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Empodera a soltar la necesidad de ser entendido por todos. Guardable.",
    hashtags: "#amorpropio #limites #autoestima #pazmental #bienestar",
    prompt: "Persona cerrando un libro con calma y mirando hacia la luz, estética serena.",
    tecnicas: ["Reframe", "Regla de oro", "Cierre emocional"]
  },
  {
    frase: "Tu valor no baja porque alguien no supo verlo. El oro sigue siendo oro aunque caiga en manos que no lo aprecian.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Metáfora clásica pero efectiva sobre el valor propio. Compartible.",
    hashtags: "#autoestima #amorpropio #valor #confianza #frases",
    prompt: "Pieza de oro brillando incluso en un entorno opaco, luz cálida, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre potente"]
  },

  /* ========== LOTE 10 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Pagarte a ti primero no es egoísmo financiero. Es la única forma de que el dinero no se evapore en lo urgente.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Principio del 'págate primero', claro y accionable. Guardable.",
    hashtags: "#finanzas #ahorro #dinero #habitos #mentalidad",
    prompt: "Persona apartando una parte de su ingreso en un frasco antes de gastar, luz cálida.",
    tecnicas: ["Reframe", "Regla práctica", "Llamado a la acción"]
  },
  {
    frase: "El interés compuesto es la octava maravilla para quien lo cobra… y una trampa para quien lo paga.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Explica las dos caras del interés compuesto. Educativo y compartible.",
    hashtags: "#finanzas #inversion #deudas #dinero #educacionfinanciera",
    prompt: "Curva ascendente de monedas creciendo frente a otra de deudas, estética conceptual.",
    tecnicas: ["Antítesis", "Dato revelador", "Reframe"]
  },
  {
    frase: "No necesitas controlar cada centavo. Necesitas conocer a dónde se va el dinero que dices que 'no sabes en qué gastaste'.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Quita la presión del control extremo y propone consciencia. Práctico.",
    hashtags: "#finanzas #dinero #gastos #habitos #claridad",
    prompt: "Persona revisando con calma un registro simple de gastos, luz natural, ambiente sereno.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "No subas la apuesta de tus metas. Baja el listón de empezar. La grandeza se construye con días pequeños y repetidos.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza el inicio mínimo viable de hábitos. Accionable.",
    hashtags: "#habitos #disciplina #constancia #productividad #mejora",
    prompt: "Escalón muy bajo y fácil de subir al inicio de una larga escalera luminosa, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "Tu identidad sigue a tus actos. No esperes 'ser disciplinado' para actuar: actúa y te volverás esa persona.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Conecta hábitos e identidad. Motivador y compartible.",
    hashtags: "#habitos #identidad #disciplina #mentalidad #crecimiento",
    prompt: "Persona transformándose a través de acciones repetidas representadas en pasos de luz, conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Cierre potente"]
  },
  {
    frase: "El día que no tengas ganas es justo el día que más cuenta. La constancia se mide en los días difíciles, no en los fáciles.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Dignifica el esfuerzo en los días sin motivación. Guardable.",
    hashtags: "#disciplina #constancia #habitos #mentalidad #fortaleza",
    prompt: "Persona entrenando bajo la lluvia con determinación, luz dramática, estética motivadora.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Te pedían que entendieras sus razones, pero nunca hicieron el esfuerzo de entender tu dolor. Eso no es relación: es servicio.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Expone la falta de reciprocidad emocional. Genera identificación.",
    hashtags: "#relacionestoxicas #narcisismo #limites #saludmental #conciencia",
    prompt: "Una figura escuchando con esfuerzo a otra que no devuelve la atención, luz contrastada.",
    tecnicas: ["Antítesis", "Revelación", "Gancho de debate"]
  },
  {
    frase: "No te enamoraste de la persona. Te enamoraste de la versión que te mostró los primeros meses y nunca volvió.",
    emocion: "Tristeza", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Describe el idealizar inicial del narcisista. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #idealizacion #saludmental #conciencia",
    prompt: "Retrato que cambia de cálido a frío al girar la luz, estética conceptual de dos caras.",
    tecnicas: ["Revelación", "Reframe", "Espejo emocional"]
  },
  {
    frase: "Si cada conversación termina contigo pidiendo perdón sin saber por qué, no estás discutiendo: estás siendo entrenado.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Señala el patrón de culpabilización constante. Revelador y guardable.",
    hashtags: "#manipulacion #relacionestoxicas #limites #saludmental #conciencia",
    prompt: "Persona disculpándose confundida frente a una sombra que asiente, luz fría, conceptual.",
    tecnicas: ["Revelación", "Open Loop", "Reframe"]
  },
  {
    frase: "Quien de verdad te valora no te hace competir por un lugar que ya deberías tener.",
    emocion: "Calma", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Señala el juego de hacerte competir por afecto. Identificación clara.",
    hashtags: "#limites #relacionestoxicas #amorpropio #conciencia #verdades",
    prompt: "Persona dejando de correr en una carrera que nadie más estaba corriendo, conceptual.",
    tecnicas: ["Reframe", "Brevedad", "Regla de oro"]
  },

  /* ========== LOTE 11 (Ciencia / curiosidades) ========== */
  {
    frase: "Tu cerebro recuerda mejor el principio y el final de una experiencia que el medio. Por eso cómo terminas algo lo define todo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la regla del pico y el final. Útil para relaciones y trabajo.",
    hashtags: "#ciencia #memoria #cerebro #psicologia #datoscuriosos",
    prompt: "Línea de tiempo con destellos brillantes al inicio y al final, centro tenue, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Un abrazo de más de 20 segundos libera oxitocina y baja el estrés. Tu cuerpo agradece el contacto, no solo tu corazón.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato cálido sobre el contacto físico y la oxitocina. Compartible.",
    hashtags: "#ciencia #oxitocina #abrazos #bienestar #saludmental",
    prompt: "Dos personas abrazándose con calma bajo luz dorada, ambiente cálido y tierno.",
    tecnicas: ["Dato revelador", "Reframe", "Identificación"]
  },
  {
    frase: "Olvidar no es un fallo de tu cerebro: es una función. Si recordaras todo, no podrías pensar en nada.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Reencuadra el olvido como diseño útil. Genera asombro y debate.",
    hashtags: "#ciencia #memoria #cerebro #olvido #datoscuriosos",
    prompt: "Hojas que el viento se lleva de un escritorio dejando solo las importantes, conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Gancho de debate"]
  },
  {
    frase: "El hambre cambia tu humor de verdad: con el azúcar bajo, tu cerebro interpreta todo como amenaza. No estás insoportable, estás 'hangry'.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el fenómeno 'hangry' con base fisiológica. Curioso y compartible.",
    hashtags: "#ciencia #cerebro #emociones #hambre #datoscuriosos",
    prompt: "Persona irritada que se calma tras comer algo, dos estados de luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Identificación"]
  },
  {
    frase: "Mojarte la cara con agua fría puede frenar la ansiedad: activa un reflejo que baja tu pulso. Tu cuerpo trae un botón de calma.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Truco fisiológico (reflejo de inmersión) para calmarse. Accionable.",
    hashtags: "#ciencia #ansiedad #cerebro #bienestar #saludmental",
    prompt: "Agua fría salpicando suavemente un rostro sereno, gotas en cámara lenta, estética limpia.",
    tecnicas: ["Dato revelador", "Llamado a la acción", "Reframe"]
  },
  {
    frase: "Tu mente solo sostiene unas pocas cosas a la vez. Por eso intentar recordarlo todo te abruma: anótalo y libera espacio.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la memoria de trabajo limitada. Práctico y guardable.",
    hashtags: "#ciencia #memoria #productividad #cerebro #enfoque",
    prompt: "Mente con pocas cajas que se desbordan, una libreta recibiendo el resto, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "El estrés se contagia: estar cerca de alguien tenso eleva tu propio cortisol. Cuidas tu paz también eligiendo tu entorno.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre el estrés de segunda mano. Revelador y compartible.",
    hashtags: "#ciencia #estres #cortisol #entorno #bienestar",
    prompt: "Ondas de tensión pasando de una persona a otra cercana, luz fría, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Caminar despeja la mente de verdad: el movimiento activa las zonas creativas del cerebro. Las mejores ideas no llegan sentado.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Conecta caminar y creatividad. Accionable y positivo.",
    hashtags: "#ciencia #creatividad #cerebro #caminar #bienestar",
    prompt: "Persona caminando por un sendero con destellos de ideas surgiendo, luz natural, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Anticipar un viaje te da más felicidad que el viaje mismo. La mente disfruta esperar tanto como vivir.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre la felicidad de la anticipación. Curioso y compartible.",
    hashtags: "#ciencia #felicidad #cerebro #psicologia #datoscuriosos",
    prompt: "Persona soñando con un viaje mientras planea con un mapa, luz cálida, estética ilusionante.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Leer ficción entrena tu empatía: tu cerebro practica ponerse en otra piel. Los libros también son gimnasio emocional.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Conecta lectura y empatía. Inspirador y guardable.",
    hashtags: "#ciencia #lectura #empatia #cerebro #bienestar",
    prompt: "Persona leyendo mientras de las páginas emergen otras vidas en luz suave, conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Las cosas buenas dejan de emocionarte con el tiempo: se llama adaptación hedónica. Por eso agradecer lo de siempre es un superpoder.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica la adaptación hedónica y el valor de la gratitud. Profundo.",
    hashtags: "#ciencia #felicidad #gratitud #psicologia #bienestar",
    prompt: "Persona redescubriendo con asombro algo cotidiano iluminado, estética conceptual cálida.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre potente"]
  },
  {
    frase: "Tu corazón tiende a sincronizarse con la música y con las personas con las que te sientes seguro. La calma también se contagia.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre sincronía fisiológica. Cálido y guardable.",
    hashtags: "#ciencia #corazon #musica #conexion #bienestar",
    prompt: "Dos ondas de latido acompasándose junto a una luz suave, estética conceptual serena.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },

  /* ========== LOTE 12 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Ponerle nombre a lo que sientes baja su intensidad. 'Estoy ansioso' calma más que fingir que no pasa nada.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Técnica de etiquetado emocional ('name it to tame it'). Accionable.",
    hashtags: "#psicologia #emociones #ansiedad #saludmental #bienestar",
    prompt: "Persona escribiendo el nombre de una emoción que se vuelve más pequeña, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Sentir que no mereces lo que lograste tiene nombre: síndrome del impostor. Y lo sienten justo quienes más se esfuerzan.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Da nombre y alivio al síndrome del impostor. Identificación fuerte.",
    hashtags: "#psicologia #sindromedelimpostor #autoestima #saludmental #mentalidad",
    prompt: "Persona frente a un logro propio dudando, sombra de inseguridad detrás, luz conceptual.",
    tecnicas: ["Dato revelador", "Validación emocional", "Reframe"]
  },
  {
    frase: "Pensar en exceso no resuelve el problema. Solo te hace vivirlo muchas veces antes de que pase.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Confronta la rumiación. Reflexiva y muy compartible.",
    hashtags: "#psicologia #overthinking #ansiedad #saludmental #mente",
    prompt: "Persona rodeada de pensamientos en bucle que se disuelven al respirar, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "Complacer a todos es la forma más educada de abandonarte a ti mismo.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Frase potente contra el people-pleasing. Guardable.",
    hashtags: "#psicologia #limites #amorpropio #saludmental #peoplepleasing",
    prompt: "Persona repartiéndose en pedazos para otros mientras queda poco de sí, conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "El primer número que escuchas ancla tu juicio del resto. Por eso la primera impresión y el primer precio pesan tanto.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Explica el sesgo de anclaje. Educativo y debatible.",
    hashtags: "#psicologia #sesgos #decisiones #mente #crecimientopersonal",
    prompt: "Ancla sujetando un punto de referencia mientras lo demás flota alrededor, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Gancho de debate"]
  },
  {
    frase: "No tienes que ganarte el descanso. Tu valor no depende de tu nivel de productividad.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Separa valor personal de productividad. Liberadora y guardable.",
    hashtags: "#descanso #saludmental #autoestima #burnout #bienestar",
    prompt: "Persona descansando sin culpa en un sofá luminoso con una taza, ambiente sereno.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "La disponibilidad emocional es el lujo más raro hoy. No busques a quien te desee: busca a quien esté presente.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Eleva la presencia sobre el deseo. Madura y guardable.",
    hashtags: "#relaciones #amor #presencia #parejas #amorpropio",
    prompt: "Dos personas plenamente presentes en una conversación sin teléfonos, luz cálida.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "El cierre que esperas de la otra persona casi nunca llega. El verdadero cierre lo firmas tú el día que decides seguir.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Reencuadra el 'closure' como decisión propia. Sanadora.",
    hashtags: "#desamor #relaciones #soltar #sanar #amorpropio",
    prompt: "Persona cerrando con calma una puerta y caminando hacia la luz, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Una bandera verde: alguien con quien puedes estar en silencio sin sentir que algo anda mal.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Define una señal de vínculo sano de forma concreta. Guardable.",
    hashtags: "#relaciones #vinculos #amor #pazmental #parejas",
    prompt: "Dos personas en silencio cómodo leyendo juntas, luz cálida de tarde, ambiente sereno.",
    tecnicas: ["Reframe", "Identificación", "Brevedad"]
  },
  {
    frase: "Te trataron mal y encima te hicieron sentir difícil por molestarte. Tu enojo no era el problema: era la respuesta correcta.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Valida el enojo legítimo invalidado por otros. Genera debate.",
    hashtags: "#relaciones #limites #emociones #amorpropio #verdades",
    prompt: "Persona de pie firme defendiendo su espacio con calma, luz contrastada, conceptual.",
    tecnicas: ["Validación emocional", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Tu autoestima no se rompe por lo que dicen los demás, sino por lo que tú te crees de lo que dicen.",
    emocion: "Sorpresa", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Devuelve el control del valor propio al interior. Guardable.",
    hashtags: "#autoestima #amorpropio #saludmental #mentalidad #bienestar",
    prompt: "Persona filtrando con calma comentarios externos antes de que la toquen, conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla de oro"]
  },
  {
    frase: "Descansar también es producir: produces salud, claridad y futuro. No todo lo valioso se ve en una lista de tareas.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Reivindica el descanso como inversión. Compartible.",
    hashtags: "#descanso #autocuidado #bienestar #saludmental #amorpropio",
    prompt: "Persona descansando junto a una ventana mientras afuera amanece, estética serena.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Dejaste de ser tú para que te quisieran, y al final te quisieron a ti menos que nunca. Vuelve a casa: vuelve a ti.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Invita a recuperar la autenticidad perdida. Emotiva y guardable.",
    hashtags: "#autenticidad #amorpropio #autoestima #saludmental #frases",
    prompt: "Persona reencontrándose con su reflejo verdadero, luz cálida que la envuelve, conceptual.",
    tecnicas: ["Reframe", "Espejo emocional", "Cierre potente"]
  },

  /* ========== LOTE 13 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Cada vez que ganas más, gastas más, y sigues igual de justo. Se llama inflación del estilo de vida, y se come tu progreso.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Explica la inflación del estilo de vida. Educativo y guardable.",
    hashtags: "#finanzas #dinero #ahorro #mentalidad #habitos",
    prompt: "Escalera de ingresos creciente junto a una de gastos que la iguala, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Un fondo de emergencia no es dinero parado. Es la tranquilidad de poder decir 'no' sin que tiemble tu economía.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reencuadra el fondo de emergencia como libertad emocional. Compartible.",
    hashtags: "#finanzas #ahorro #fondodeemergencia #dinero #tranquilidad",
    prompt: "Persona durmiendo tranquila junto a un frasco de ahorros etiquetado, luz cálida.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Un presupuesto no te quita libertad: te dice exactamente cuánta tienes. El control es la base de la calma financiera.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Cambia la imagen negativa del presupuesto. Accionable.",
    hashtags: "#finanzas #presupuesto #dinero #libertadfinanciera #habitos",
    prompt: "Persona organizando categorías de gasto con claridad y calma, luz natural, ordenado.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "La regla de los dos minutos: si algo toma menos de eso, hazlo ya. Lo postergado pequeño se acumula en montaña.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Regla práctica de productividad. Accionable y guardable.",
    hashtags: "#habitos #productividad #disciplina #mejora #rutina",
    prompt: "Reloj marcando dos minutos junto a una tarea pequeña completada, estética limpia.",
    tecnicas: ["Regla práctica", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "No rompas la cadena. Ver tus días seguidos marcados motiva más que cualquier discurso de fuerza de voluntad.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Técnica de la cadena de Seinfeld. Motivadora y compartible.",
    hashtags: "#habitos #constancia #disciplina #productividad #mejora",
    prompt: "Calendario con una larga cadena de días marcados en verde, estética satisfactoria.",
    tecnicas: ["Regla práctica", "Prueba social", "Reframe"]
  },
  {
    frase: "Persigue sistemas, no metas. La meta te da una dirección; el sistema es lo que de verdad te lleva ahí cada día.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza sistemas sobre metas. Guardable.",
    hashtags: "#habitos #sistemas #productividad #disciplina #mentalidad",
    prompt: "Brújula (meta) junto a un motor en marcha (sistema), estética conceptual clara.",
    tecnicas: ["Antítesis", "Reframe", "Metáfora"]
  },
  {
    frase: "Cuando intentaste irte, de repente volvió a ser perfecto. No era amor reavivado: era miedo a perder el control sobre ti.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Describe el 'hoovering' tras intentar alejarse. Revelador y guardable.",
    hashtags: "#narcisismo #relacionestoxicas #hoovering #limites #conciencia",
    prompt: "Persona en una puerta entreabierta mientras una luz cálida falsa intenta retenerla, conceptual.",
    tecnicas: ["Revelación", "Open Loop", "Reframe"]
  },
  {
    frase: "Te prometían el futuro perfecto justo cuando ibas a marcharte. Las promesas no eran planes: eran anzuelos.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Explica el 'future faking'. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #futurefaking #limites #conciencia",
    prompt: "Mano ofreciendo una promesa luminosa que se desvanece al acercarse, estética conceptual.",
    tecnicas: ["Revelación", "Metáfora", "Antítesis"]
  },
  {
    frase: "Si al señalar el daño terminas tú pidiendo perdón y consolándolos a ellos, le diste la vuelta a toda la historia.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Describe el patrón de invertir la víctima y el agresor. Revelador.",
    hashtags: "#manipulacion #relacionestoxicas #limites #saludmental #conciencia",
    prompt: "Dos figuras donde la que dañó recibe consuelo y la dañada se disculpa, luz fría, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Vivir cuidando cada palabra para no provocar el enojo de alguien no es amor: es caminar sobre cáscaras de huevo.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Nombra la tensión constante de relaciones controladoras. Identificación.",
    hashtags: "#relacionestoxicas #manipulacion #limites #saludmental #conciencia",
    prompt: "Persona caminando con cuidado extremo sobre un suelo frágil, luz tensa, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Espejo emocional"]
  },

  /* ========== LOTE 14 (Ciencia / curiosidades) ========== */
  {
    frase: "El rechazo activa las mismas zonas del cerebro que el dolor físico. Por eso 'me rompió el corazón' no es solo una metáfora.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre el dolor del rechazo. Valida y conecta.",
    hashtags: "#ciencia #cerebro #rechazo #emociones #datoscuriosos",
    prompt: "Cerebro con una zona iluminada igual que una herida física, estética conceptual elegante.",
    tecnicas: ["Dato revelador", "Reframe", "Validación emocional"]
  },
  {
    frase: "Valoramos más lo que ayudamos a construir, aunque sea imperfecto. Se llama efecto Ikea: el esfuerzo crea cariño.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el efecto Ikea. Curioso y aplicable a la vida.",
    hashtags: "#ciencia #psicologia #esfuerzo #cerebro #datoscuriosos",
    prompt: "Persona admirando algo hecho por sus propias manos con orgullo, luz cálida, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Cuanto más ves algo, más te gusta, aunque al principio te fuera indiferente. La familiaridad es media conquista.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica el efecto de mera exposición. Genera reflexión y debate.",
    hashtags: "#ciencia #psicologia #cerebro #familiaridad #datoscuriosos",
    prompt: "Rostro que pasa de neutro a familiar y agradable en repeticiones, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Hacerle un favor a alguien hace que te caiga mejor a ti. Tu mente justifica el esfuerzo decidiendo que vale la pena.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el efecto Benjamin Franklin. Curioso y guardable.",
    hashtags: "#ciencia #psicologia #cerebro #relaciones #datoscuriosos",
    prompt: "Dos personas, una entregando ayuda y sintiendo cercanía, luz cálida, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Tus pupilas se dilatan cuando algo te gusta de verdad. El cuerpo confiesa lo que la boca calla.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato curioso sobre el lenguaje corporal involuntario. Compartible.",
    hashtags: "#ciencia #cerebro #lenguajecorporal #datoscuriosos #psicologia",
    prompt: "Primer plano de un ojo con la pupila dilatada bajo luz suave, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "Olvidamos lo que sabemos que podemos buscar después. Se llama efecto Google: tu mente delega para liberar espacio.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica el efecto Google sobre la memoria. Actual y debatible.",
    hashtags: "#ciencia #memoria #tecnologia #cerebro #datoscuriosos",
    prompt: "Mente delegando recuerdos a una nube de datos luminosa, estética conceptual moderna.",
    tecnicas: ["Dato revelador", "Reframe", "Gancho de debate"]
  },
  {
    frase: "El asombro, mirar algo enorme como el cielo o el mar, reduce la obsesión por tus problemas. La grandeza te recuerda tu tamaño.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre el efecto del asombro en la mente. Profundo y guardable.",
    hashtags: "#ciencia #asombro #bienestar #cerebro #saludmental",
    prompt: "Persona pequeña frente a un cielo estrellado inmenso, estética conceptual de asombro.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Mantenemos estables solo a unas 150 personas en nuestro círculo. Tu energía social es finita: elige bien a quién se la das.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el número de Dunbar aplicado a la vida. Reflexivo.",
    hashtags: "#ciencia #relaciones #cerebro #energia #datoscuriosos",
    prompt: "Persona en el centro de círculos concéntricos de personas que se alejan, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Regla de oro"]
  },
  {
    frase: "Cuando algo te estresa mucho, tu visión mental se hace túnel y solo ves la amenaza. Respirar vuelve a abrir el campo.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la visión de túnel del estrés. Accionable.",
    hashtags: "#ciencia #estres #cerebro #ansiedad #bienestar",
    prompt: "Campo visual que se estrecha y luego se abre al respirar, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Escribir a mano fija mejor lo que aprendes que teclear. La lentitud obliga a tu cerebro a procesar, no solo a copiar.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre escritura a mano y memoria. Útil para estudiantes.",
    hashtags: "#ciencia #aprendizaje #memoria #cerebro #estudio",
    prompt: "Mano escribiendo en un cuaderno con luz cálida, letras que se graban en luz, conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Esa canción que se te pega no es casualidad: tu cerebro deja el bucle abierto buscando un final que no llega.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica los 'earworms'. Lúdico y debatible.",
    hashtags: "#ciencia #musica #cerebro #datoscuriosos #memoria",
    prompt: "Nota musical girando en bucle dentro de una cabeza ilustrada, estética conceptual amigable.",
    tecnicas: ["Dato revelador", "Open Loop", "Gancho de debate"]
  },
  {
    frase: "Tu nivel de cortisol sube de forma natural al despertar para activarte. Por eso revisar el móvil recién levantado te dispara la ansiedad.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre el cortisol matutino y el móvil. Accionable.",
    hashtags: "#ciencia #cortisol #ansiedad #habitos #bienestar",
    prompt: "Persona despertando con luz natural sin tocar el móvil, ambiente sereno, conceptual.",
    tecnicas: ["Dato revelador", "Causa-efecto", "Llamado a la acción"]
  },

  /* ========== LOTE 15 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Tu cerebro odia la contradicción: si actúas distinto a lo que crees, cambiará lo que crees para no sentirse mal. Cuida tus actos.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica la disonancia cognitiva. Profundo y guardable.",
    hashtags: "#psicologia #disonancia #mente #crecimientopersonal #valores",
    prompt: "Persona ante un espejo donde acto y creencia intentan alinearse, estética conceptual.",
    tecnicas: ["Dato revelador", "Causa-efecto", "Reframe"]
  },
  {
    frase: "Imaginar el peor escenario no te prepara: te hace sufrir dos veces si pasa y una de más si no pasa.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Confronta el catastrofismo. Reflexiva y compartible.",
    hashtags: "#psicologia #ansiedad #catastrofismo #saludmental #mente",
    prompt: "Persona rodeada de escenarios sombríos imaginarios que se desvanecen, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "Cámbiate los 'debería' por 'elijo'. Una palabra te llena de culpa; la otra, de poder.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Técnica de reencuadre del lenguaje interno. Accionable.",
    hashtags: "#psicologia #lenguajeinterno #mentalidad #saludmental #bienestar",
    prompt: "Dos palabras flotando, una pesada y gris, otra ligera y luminosa, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "Las emociones no son hechos. Sentir que vas a fracasar no significa que vayas a hacerlo.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Separa emoción de realidad. Liberadora y compartible.",
    hashtags: "#psicologia #emociones #ansiedad #saludmental #mentalidad",
    prompt: "Nube de emoción pasajera sobre un suelo firme de hechos, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Buscar validación afuera es como llenar un vaso roto: por más que te elogien, si no te lo crees tú, se vacía.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Metáfora sobre la validación externa. Guardable.",
    hashtags: "#psicologia #validacion #autoestima #amorpropio #saludmental",
    prompt: "Vaso agrietado que no retiene el agua de cumplidos, luz suave, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Causa-efecto"]
  },
  {
    frase: "El perfeccionismo no es buscar lo mejor. Es miedo a ser juzgado disfrazado de exigencia.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Reencuadra el perfeccionismo como miedo. Genera debate.",
    hashtags: "#psicologia #perfeccionismo #miedo #saludmental #mentalidad",
    prompt: "Persona puliendo eternamente un objeto ya impecable, sombra de juicio detrás, conceptual.",
    tecnicas: ["Reframe", "Revelación", "Gancho de debate"]
  },
  {
    frase: "Una buena relación no es la que nunca choca. Es la que sabe repararse rápido después de chocar.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Resalta la reparación sobre la ausencia de conflicto. Madura.",
    hashtags: "#relaciones #parejas #comunicacion #amor #reflexion",
    prompt: "Dos personas reconciliándose con calma tras una discusión, luz cálida, ambiente sereno.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Elegir no es lo mismo que conformarse. Conformarse es quedarte por miedo; elegir es quedarte aun viendo otras puertas.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Distingue elegir de conformarse. Reflexiva y compartible.",
    hashtags: "#relaciones #amor #parejas #decisiones #frases",
    prompt: "Persona eligiendo con calma una puerta entre varias abiertas, luz cálida, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "La seguridad emocional es saber que puedes mostrarte como eres sin que lo usen en tu contra después.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Define la seguridad emocional de forma concreta. Guardable.",
    hashtags: "#relaciones #seguridademocional #confianza #parejas #vinculos",
    prompt: "Dos personas conversando con apertura y calma, luz cálida, ambiente de confianza.",
    tecnicas: ["Reframe", "Identificación", "Regla de oro"]
  },
  {
    frase: "No estás atrasado en la vida. Hay flores que abren en primavera y otras que florecen en pleno invierno.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Consuela a quien siente que va tarde. Metáfora cálida y compartible.",
    hashtags: "#autoestima #ritmopropio #crecimiento #esperanza #frases",
    prompt: "Flor abriendo entre la nieve bajo un rayo de sol, estética conceptual esperanzadora.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Confiar en ti no es no tener miedo. Es saber que aun con miedo, no te vas a abandonar.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Redefine la autoconfianza desde el autocompromiso. Guardable.",
    hashtags: "#autoestima #confianza #miedo #amorpropio #fortaleza",
    prompt: "Persona avanzando con paso firme pese a la sombra del miedo, luz adelante, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Deja de pedirte que todo te salga bien a la primera. Nadie aplaude al bebé por caerse al aprender a caminar.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Normaliza el error en el aprendizaje. Compasiva y compartible.",
    hashtags: "#autoestima #autocompasion #aprendizaje #saludmental #mentalidad",
    prompt: "Bebé dando sus primeros pasos con ternura bajo luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },

  /* ========== LOTE 16 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Hay quien es rico y quien aparenta serlo. El primero tiene activos; el segundo, deudas con buena vista.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Distingue riqueza real de aparente. Genera debate.",
    hashtags: "#dinero #finanzas #riqueza #apariencias #mentalidad",
    prompt: "Dos casas iguales por fuera, una con cimientos sólidos y otra hueca, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Gasta en experiencias más que en cosas. Las cosas se vuelven costumbre; los recuerdos se vuelven tú.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Respaldo psicológico para gastar en experiencias. Compartible.",
    hashtags: "#dinero #finanzas #experiencias #felicidad #mentalidad",
    prompt: "Persona contemplando un atardecer recordado frente a objetos olvidados, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Invertir temprano poco vale más que invertir tarde mucho. El tiempo hace el trabajo que el dinero solo no puede.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Enseña el poder del tiempo en la inversión. Accionable.",
    hashtags: "#finanzas #inversion #tiempo #dinero #educacionfinanciera",
    prompt: "Pequeña semilla plantada temprano que se vuelve un gran árbol, estética conceptual.",
    tecnicas: ["Antítesis", "Dato revelador", "Metáfora"]
  },
  {
    frase: "Une lo que debes hacer con algo que disfrutas. Tu serie favorita solo mientras caminas: tu cerebro dirá que sí.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Técnica de 'temptation bundling'. Accionable y guardable.",
    hashtags: "#habitos #productividad #disciplina #mejora #rutina",
    prompt: "Persona caminando en cinta mientras ve algo que disfruta, luz cálida, ambiente positivo.",
    tecnicas: ["Regla práctica", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Quieres más de un hábito bueno: hazlo fácil. Quieres menos de uno malo: ponle fricción. Diseña, no pelees.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Resume el diseño de hábitos por fricción. Compartible.",
    hashtags: "#habitos #disciplina #productividad #sistemas #mejora",
    prompt: "Dos caminos: uno despejado y fácil, otro con obstáculos a propósito, estética conceptual.",
    tecnicas: ["Antítesis", "Regla práctica", "Reframe"]
  },
  {
    frase: "No necesitas motivación todos los días. Necesitas hacerlo tan pequeño que la falta de ganas deje de ser excusa.",
    emocion: "Calma", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza reducir la barrera de entrada. Guardable.",
    hashtags: "#habitos #disciplina #constancia #productividad #mejora",
    prompt: "Tarea diminuta y fácil de iniciar al pie de una rutina, luz limpia, minimalista.",
    tecnicas: ["Reframe", "Regla práctica", "Antítesis"]
  },
  {
    frase: "Cuando hablaste con otros de lo que vivías, de repente eras tú quien quedaba como el problema. Eso tiene un patrón, no es casualidad.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Describe la campaña de desprestigio. Revelador y debatible.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #saludmental #conciencia",
    prompt: "Persona señalada injustamente mientras otra controla el relato, luz fría, conceptual.",
    tecnicas: ["Revelación", "Open Loop", "Gancho de debate"]
  },
  {
    frase: "Te comparaba con otros para que compitieras por su afecto. El amor no es un concurso que debas ganar cada día.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Describe la triangulación. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #triangulacion #limites #conciencia",
    prompt: "Persona corriendo en una carrera de afecto contra rivales invisibles, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Antítesis"]
  },
  {
    frase: "Lo que sienten por ti se mide en cómo te tratan cuando no les conviene fingir.",
    emocion: "Calma", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Regla clara para leer la intención real. Guardable.",
    hashtags: "#limites #relaciones #verdades #conciencia #inteligenciaemocional",
    prompt: "Dos versiones de una misma persona, una actuando y otra real, estética conceptual.",
    tecnicas: ["Reframe", "Regla de oro", "Brevedad"]
  },
  {
    frase: "Confundir lástima con amor te ata a quien deberías soltar. Quedarte por pena no salva a nadie: los hunde a los dos.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Distingue la culpa-lástima del amor. Revelador y compartible.",
    hashtags: "#relaciones #limites #culpa #saludmental #conciencia",
    prompt: "Dos personas hundiéndose juntas mientras una podría nadar, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Metáfora"]
  },

  /* ========== LOTE 17 (Ciencia / curiosidades) ========== */
  {
    frase: "Tu cerebro termina de madurar cerca de los 25 años, y la última zona es la que controla los impulsos. Por eso a los 20 todo era ahora.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre el desarrollo de la corteza prefrontal. Curioso y compartible.",
    hashtags: "#ciencia #cerebro #neurociencia #juventud #datoscuriosos",
    prompt: "Cerebro ilustrado con la zona frontal iluminándose al final, estética científica elegante.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Dormir poco afecta tu juicio tanto como ir algo ebrio. No es que rindas cansado: es que decides peor sin notarlo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre falta de sueño y rendimiento. Impactante y guardable.",
    hashtags: "#ciencia #sueño #cerebro #salud #datoscuriosos",
    prompt: "Persona somnolienta frente a decisiones borrosas, luz tenue, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Entras a un cuarto y olvidas a qué venías: es el efecto umbral. Cruzar una puerta le dice a tu cerebro 'capítulo nuevo'.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica el 'doorway effect'. Lúdico y muy debatible.",
    hashtags: "#ciencia #memoria #cerebro #datoscuriosos #psicologia",
    prompt: "Persona parada en una puerta con un signo de interrogación sobre la cabeza, conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "En medio del ruido, tu cerebro detecta tu nombre al instante. Tu atención tiene un filtro que nunca deja de vigilarte.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el efecto cóctel. Curioso y compartible.",
    hashtags: "#ciencia #cerebro #atencion #datoscuriosos #neurociencia",
    prompt: "Una voz destacando entre muchas ondas de sonido difusas, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Ves caras en las nubes, en los enchufes, en todo. Tu cerebro está tan programado para detectar rostros que los inventa.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica la pareidolia. Lúdico y genera respuestas.",
    hashtags: "#ciencia #cerebro #pareidolia #datoscuriosos #percepcion",
    prompt: "Objetos cotidianos que parecen caras sonrientes, luz suave, estética conceptual amigable.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "No puedes hacerte cosquillas a ti mismo: tu cerebro predice tu propio toque y lo ignora. Solo lo inesperado te sorprende.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato curioso sobre predicción cerebral. Muy compartible por lo lúdico.",
    hashtags: "#ciencia #cerebro #datoscuriosos #percepcion #neurociencia",
    prompt: "Ilustración divertida de una mano intentando hacerse cosquillas sin efecto, conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Interacción"]
  },
  {
    frase: "Las malas noticias se te quedan más que las buenas. Tu cerebro evolucionó para sobrevivir, no para estar tranquilo.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el sesgo de negatividad en el consumo de noticias. Útil.",
    hashtags: "#ciencia #cerebro #sesgos #noticias #bienestar",
    prompt: "Balanza donde una mala noticia pesa más que muchas buenas, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Cuando algo te supera, a veces no peleas ni huyes: te paralizas o complaces. Congelarse y agradar también son respuestas de supervivencia.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica las respuestas de freeze y fawn. Validante y guardable.",
    hashtags: "#ciencia #trauma #cerebro #saludmental #respuestas",
    prompt: "Figura inmóvil ante una amenaza, líneas suaves de tensión, estética conceptual.",
    tecnicas: ["Dato revelador", "Validación emocional", "Reframe"]
  },
  {
    frase: "Tomas miles de decisiones al día sin notarlo. Por eso simplificar tu vida no es pereza: es liberar a tu cerebro.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre la cantidad de decisiones diarias. Práctico y compartible.",
    hashtags: "#ciencia #cerebro #decisiones #simplicidad #bienestar",
    prompt: "Mente saturada de pequeñas decisiones que se ordenan al simplificar, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Juzgamos una cara en milisegundos, antes de pensar. La primera impresión no es justa, pero es biológica.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica la rapidez de la primera impresión. Debatible.",
    hashtags: "#ciencia #cerebro #primeraimpresion #psicologia #datoscuriosos",
    prompt: "Rostro evaluado por un destello instantáneo de juicio, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Cuanto menos sabes de un tema, más fácil es creer que lo dominas. La verdadera experiencia te vuelve más humilde, no más seguro.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el efecto Dunning-Kruger. Educativo y guardable.",
    hashtags: "#ciencia #psicologia #dunningkruger #humildad #aprendizaje",
    prompt: "Persona en una cima pequeña creyendo verlo todo frente a una montaña real, conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Lo que esperan de ti influye en cómo te desempeñas. Rodéate de quien cree en ti: la fe ajena también moldea resultados.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el efecto Pigmalión. Inspirador y compartible.",
    hashtags: "#ciencia #psicologia #expectativas #motivacion #crecimiento",
    prompt: "Persona creciendo bajo la mirada de apoyo de otra, luz cálida, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },

  /* ========== LOTE 18 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Sanar no es una línea recta. Habrá días en que sientas que vuelves atrás: no es fracaso, es el proceso teniendo curvas.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Normaliza las recaídas en la sanación. Compasiva y guardable.",
    hashtags: "#sanar #saludmental #proceso #resiliencia #bienestar",
    prompt: "Camino sinuoso que sube entre la niebla hacia la luz, estética conceptual esperanzadora.",
    tecnicas: ["Reframe", "Antítesis", "Validación emocional"]
  },
  {
    frase: "Quien hiere desde el dolor no te define a ti, lo define a él. La gente lastima con lo que carga, no con lo que tú vales.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Explica que el daño ajeno habla de quien lo causa. Liberadora.",
    hashtags: "#psicologia #saludmental #limites #amorpropio #bienestar",
    prompt: "Persona en calma mientras la sombra ajena no la alcanza, luz protectora, conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Cierre emocional"]
  },
  {
    frase: "Aceptar no es rendirse. Es dejar de gastar fuerzas peleando con lo que ya pasó para usarlas en lo que sigue.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra la aceptación como ahorro de energía. Guardable.",
    hashtags: "#psicologia #aceptacion #saludmental #pazmental #mentalidad",
    prompt: "Persona soltando una cuerda tensa y enderezándose con alivio, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "Concéntrate en lo que sí controlas: tu esfuerzo, tu actitud, tu límite. Lo demás solo te roba la paz sin cambiar el resultado.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Aplica la dicotomía del control. Práctica y compartible.",
    hashtags: "#psicologia #control #estoicismo #saludmental #mentalidad",
    prompt: "Persona enfocada en un círculo de luz a su alcance ignorando lo lejano, conceptual.",
    tecnicas: ["Reframe", "Lista implícita", "Regla de oro"]
  },
  {
    frase: "El autoboicot no es debilidad: es una parte de ti intentando protegerte de un fracaso que aún no llega. Escúchala y sigue igual.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra el autoboicot con compasión. Profundo y guardable.",
    hashtags: "#psicologia #autoboicot #miedo #saludmental #crecimientopersonal",
    prompt: "Persona dando un paso adelante mientras una versión temerosa intenta frenarla, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Llamado a la acción"]
  },
  {
    frase: "El duelo no tiene calendario. Sanar más lento que otros no significa que lo estés haciendo mal.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Valida el ritmo propio del duelo. Compasiva y compartible.",
    hashtags: "#duelo #saludmental #sanar #emociones #bienestar",
    prompt: "Persona en calma frente al mar gris al amanecer, ritmo propio, estética serena.",
    tecnicas: ["Reframe", "Validación emocional", "Brevedad"]
  },
  {
    frase: "El desprecio disfrazado de broma sigue siendo desprecio. Quien te quiere no construye su humor sobre tu vergüenza.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Señala el desprecio encubierto en 'bromas'. Genera debate.",
    hashtags: "#relaciones #respeto #limites #parejas #verdades",
    prompt: "Persona incómoda mientras otra ríe a su costa, luz fría, estética conceptual.",
    tecnicas: ["Reframe", "Revelación", "Gancho de debate"]
  },
  {
    frase: "El amor se demuestra en los pequeños gestos diarios, no en las grandes promesas de fin de semana.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Resalta la consistencia cotidiana sobre los gestos grandilocuentes.",
    hashtags: "#relaciones #amor #parejas #gestos #frases",
    prompt: "Detalle de un café preparado para el otro cada mañana, luz cálida, ambiente tierno.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Quien te quiere busca cómo, quien no, busca excusas. Y las dos cosas se notan, aunque te cueste aceptarlas.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Frase clara sobre el esfuerzo real. Identificación fuerte.",
    hashtags: "#relaciones #amor #esfuerzo #amorpropio #frases",
    prompt: "Dos caminos: uno que insiste en llegar y otro lleno de excusas, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "Tienes permiso de superar a la gente que ya no crece contigo. Querer a alguien no te obliga a quedarte donde te apagas.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Da permiso para soltar vínculos que estancan. Guardable.",
    hashtags: "#autoestima #crecimiento #amorpropio #limites #frases",
    prompt: "Persona ascendiendo hacia la luz dejando atrás con cariño un lugar conocido, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Le enseñas a la gente cómo tratarte con lo que les permites. Tu silencio también es una instrucción.",
    emocion: "Sorpresa", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Conecta límites y trato recibido. Reveladora y compartible.",
    hashtags: "#autoestima #limites #amorpropio #relaciones #verdades",
    prompt: "Persona poniendo una línea clara con calma frente a otra, estética conceptual firme.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla de oro"]
  },
  {
    frase: "No tienes que caerle bien a todos. Eso es físicamente imposible y emocionalmente agotador.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Libera de la necesidad de agradar a todos. Guardable.",
    hashtags: "#autoestima #amorpropio #autenticidad #limites #bienestar",
    prompt: "Persona caminando tranquila sin mirar la aprobación de la multitud, luz cálida.",
    tecnicas: ["Reframe", "Brevedad", "Regla de oro"]
  },

  /* ========== LOTE 19 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Los pequeños gastos diarios que 'no son nada' son justo los que se comen tu fin de mes. Las goteras hunden barcos.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Explica el efecto de los micro-gastos. Accionable y guardable.",
    hashtags: "#finanzas #ahorro #dinero #gastos #habitos",
    prompt: "Pequeñas gotas que vacían lentamente un recipiente lleno, estética conceptual clara.",
    tecnicas: ["Metáfora", "Reframe", "Dato revelador"]
  },
  {
    frase: "Tu riqueza no es lo que ganas: es lo que conservas. Hay sueldos altos con bolsillos vacíos.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Distingue ingreso de patrimonio. Educativo y compartible.",
    hashtags: "#finanzas #dinero #patrimonio #ahorro #mentalidad",
    prompt: "Dos billeteras: una que entra y sale vacía, otra que retiene, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "El dinero compra tranquilidad hasta cubrir lo básico. Después, lo que de verdad da paz son los vínculos y el sentido.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Matiza la relación dinero-felicidad. Reflexiva y guardable.",
    hashtags: "#dinero #felicidad #bienestar #mentalidad #vida",
    prompt: "Persona en calma compartiendo con seres queridos en un hogar sencillo, luz cálida.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Mejorar un 1% al día no se nota hoy, pero en un año eres otra persona. Lo pequeño, compuesto, es imparable.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Explica el interés compuesto de los hábitos. Motivador.",
    hashtags: "#habitos #mejora #constancia #disciplina #crecimiento",
    prompt: "Línea casi plana que despega exponencialmente con el tiempo, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Metáfora"]
  },
  {
    frase: "Hazlo obvio, fácil y satisfactorio si lo quieres mantener. El truco no es tu fuerza: es bajarle el esfuerzo a tu mejor versión.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Resume las leyes de los buenos hábitos. Accionable y guardable.",
    hashtags: "#habitos #disciplina #productividad #sistemas #mejora",
    prompt: "Objetos de un buen hábito a la vista y al alcance, ambiente ordenado, luz limpia.",
    tecnicas: ["Regla práctica", "Reframe", "Lista implícita"]
  },
  {
    frase: "No te castigues por el día que fallaste. Castígate menos y vuelve más rápido: eso sí construye una vida.",
    emocion: "Calma", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Promueve la autocompasión en los hábitos. Compartible.",
    hashtags: "#habitos #autocompasion #constancia #disciplina #bienestar",
    prompt: "Persona retomando con calma su rutina tras un tropiezo, luz cálida, estética serena.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Te acusaba justo de lo que él hacía. La proyección convierte sus defectos en tus supuestas culpas.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Explica la proyección en relaciones tóxicas. Revelador y guardable.",
    hashtags: "#narcisismo #proyeccion #relacionestoxicas #limites #conciencia",
    prompt: "Figura proyectando su propia sombra sobre otra persona inocente, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Cada vez que cumplías una exigencia, aparecía otra. Con quien mueve la meta, nunca eres suficiente porque ese es el plan.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Describe el patrón de mover la meta. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #limites #conciencia",
    prompt: "Línea de meta que se aleja cada vez que alguien la alcanza, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Antítesis"]
  },
  {
    frase: "Discutir con quien tuerce cada palabra es agotador a propósito. A veces ganar es dejar de jugar ese juego.",
    emocion: "Calma", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Describe las discusiones circulares y el desgaste. Guardable.",
    hashtags: "#manipulacion #limites #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona alejándose serena de un laberinto de palabras enredadas, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "El amor sano no se gana portándote bien ni se pierde poniendo límites. Si depende de obedecer, no era amor: era control.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Distingue amor de control condicional. Revelador y compartible.",
    hashtags: "#manipulacion #relacionestoxicas #amor #limites #conciencia",
    prompt: "Persona libre frente a una jaula abierta de condiciones, luz cálida, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },

  /* ========== LOTE 20 (Ciencia · mitos y sesgos) ========== */
  {
    frase: "No usas solo el 10% de tu cerebro: lo usas casi todo, todo el tiempo. Ese mito vendió muchas películas, pero es falso.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Desmiente el mito del 10% del cerebro. Genera debate y correcciones.",
    hashtags: "#ciencia #cerebro #mitos #neurociencia #datoscuriosos",
    prompt: "Cerebro completamente iluminado en todas sus zonas, fondo oscuro, estética científica.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Gancho de debate"]
  },
  {
    frase: "No existen personas 'de cerebro izquierdo' o 'derecho'. Ambos lados trabajan juntos en casi todo lo que haces.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Desmiente el mito de los hemisferios. Educativo y guardable.",
    hashtags: "#ciencia #cerebro #mitos #neurociencia #datoscuriosos",
    prompt: "Cerebro con ambos hemisferios conectados por puentes de luz, estética conceptual.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Reframe"]
  },
  {
    frase: "El azúcar no vuelve hiperactivos a los niños: lo demostraron los estudios. Lo que cambia es lo que los adultos esperan ver.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Desmiente el mito azúcar-hiperactividad. Polémico y debatible.",
    hashtags: "#ciencia #mitos #azucar #ninos #datoscuriosos",
    prompt: "Niño jugando normal mientras un adulto lo observa con prejuicio, estética conceptual.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Gancho de debate"]
  },
  {
    frase: "Tu lengua no tiene zonas separadas para cada sabor. Ese mapa que te enseñaron en la escuela es un mito.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Desmiente el mito del mapa de la lengua. Curioso y compartible.",
    hashtags: "#ciencia #mitos #cuerpo #datoscuriosos #curiosidades",
    prompt: "Ilustración de una lengua con sabores distribuidos por toda su superficie, conceptual.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Curiosity Gap"]
  },
  {
    frase: "Cuanto más caro pagaste por algo, más te cuesta soltarlo aunque ya no sirva. Valoramos de más lo que es 'nuestro'.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el efecto dotación (endowment). Útil y guardable.",
    hashtags: "#ciencia #psicologia #sesgos #decisiones #datoscuriosos",
    prompt: "Persona aferrada a un objeto viejo etiquetado como 'mío', estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Demasiadas opciones no te hacen más libre: te paralizan. A más alternativas, más miedo a elegir mal.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica la paradoja de la elección. Reflexiva y compartible.",
    hashtags: "#ciencia #psicologia #decisiones #sesgos #bienestar",
    prompt: "Persona abrumada frente a un pasillo infinito de opciones idénticas, conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Aprendes una palabra nueva y de repente la ves en todos lados. No apareció más: tu cerebro empezó a notarla.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica el fenómeno Baader-Meinhof. Lúdico y debatible.",
    hashtags: "#ciencia #cerebro #percepcion #datoscuriosos #psicologia",
    prompt: "Una palabra destacándose repetidamente en un entorno cotidiano, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Cómo te presentan algo cambia tu decisión: '90% sin grasa' suena mejor que '10% de grasa', aunque es lo mismo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el efecto marco (framing). Educativo y guardable.",
    hashtags: "#ciencia #psicologia #sesgos #decisiones #marketing",
    prompt: "Misma información con dos etiquetas distintas provocando reacciones opuestas, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Juzgamos lo que es probable por lo fácil que es recordarlo. Por eso un titular alarmante te asusta más que una estadística real.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el heurístico de disponibilidad. Útil contra el alarmismo.",
    hashtags: "#ciencia #psicologia #sesgos #miedo #pensamientocritico",
    prompt: "Titular gigante eclipsando datos pequeños y reales, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Tu lado nocturno o madrugador es en parte biológico. No todos rinden a la misma hora: conocer tu reloj interno lo cambia todo.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica los cronotipos. Práctico y guardable.",
    hashtags: "#ciencia #sueño #cronotipo #productividad #cerebro",
    prompt: "Dos relojes internos, uno activo de noche y otro de día, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Una siesta corta de 20 minutos recarga tu mente; una larga te deja peor. El descanso también tiene su dosis exacta.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato práctico sobre las siestas. Accionable y guardable.",
    hashtags: "#ciencia #sueño #siesta #productividad #bienestar",
    prompt: "Persona tomando una siesta breve junto a un reloj marcando 20 minutos, luz suave.",
    tecnicas: ["Dato revelador", "Reframe", "Regla práctica"]
  },
  {
    frase: "Las 'mariposas en el estómago' son reales: tu intestino reacciona al nervio del miedo y la emoción. Sientes con las tripas, literal.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el origen de las mariposas. Curioso y compartible.",
    hashtags: "#ciencia #cuerpo #emociones #cerebro #datoscuriosos",
    prompt: "Ilustración del eje intestino-cerebro con mariposas de luz, estética conceptual amable.",
    tecnicas: ["Dato revelador", "Reframe", "Identificación"]
  },
  {
    frase: "En un peligro real sientes que el tiempo se ralentiza. No es magia: tu cerebro graba con más detalle para sobrevivir.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Explica la percepción del tiempo bajo adrenalina. Fascinante.",
    hashtags: "#ciencia #cerebro #adrenalina #tiempo #datoscuriosos",
    prompt: "Escena en cámara lenta con destellos de detalle alrededor de una persona, conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },

  /* ========== LOTE 21 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "La positividad tóxica calla lo que duele. 'Échale ganas' a alguien que sufre no lo cura: lo deja más solo.",
    emocion: "Enojo", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Critica la positividad tóxica. Genera debate y validación.",
    hashtags: "#psicologia #positividadtoxica #emociones #saludmental #bienestar",
    prompt: "Persona triste recibiendo una frase vacía mientras se aísla más, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "Lo que reprimes no desaparece: se guarda con vida y sale cuando menos lo esperas. Sentir a tiempo es más barato que estallar después.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica el costo de reprimir emociones. Profundo y guardable.",
    hashtags: "#psicologia #emociones #saludmental #represion #bienestar",
    prompt: "Emoción guardada en una caja que vibra a punto de abrirse, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Causa-efecto"]
  },
  {
    frase: "Cuidar de todos menos de ti tiene nombre: autoabandono. Y nadie puede dar de un pozo que dejó secar.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Nombra el autoabandono. Identificación profunda.",
    hashtags: "#psicologia #autoabandono #autocuidado #saludmental #limites",
    prompt: "Persona regando muchas plantas mientras la suya se marchita, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Espejo emocional"]
  },
  {
    frase: "Un disparador emocional no mide tu locura: mide una herida que aún no terminó de sanar. Obsérvalo, no te juzgues por él.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica los gatillos emocionales con compasión. Guardable.",
    hashtags: "#psicologia #emociones #saludmental #sanar #autoconciencia",
    prompt: "Herida antigua de luz que reacciona ante un estímulo, estética conceptual suave.",
    tecnicas: ["Reframe", "Validación emocional", "Dato revelador"]
  },
  {
    frase: "No tienes que ser 'el fuerte' siempre. Pedir ayuda no rompe tu fortaleza: la hace sostenible.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra pedir ayuda como fortaleza real. Compartible.",
    hashtags: "#psicologia #ayuda #saludmental #vulnerabilidad #bienestar",
    prompt: "Persona apoyándose en otra para seguir de pie, luz cálida, ambiente de apoyo.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Estar cómodo en tu zona de confort no es debilidad. Pero la vida que quieres casi siempre vive un paso afuera.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Matiza la zona de confort con respeto. Motivadora y guardable.",
    hashtags: "#psicologia #zonadeconfort #crecimiento #mentalidad #superacion",
    prompt: "Persona asomándose desde un círculo cálido hacia una luz nueva afuera, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Llamado a la acción"]
  },
  {
    frase: "Si solo te escriben cuando no tienen nada mejor, no eres su opción: eres su repuesto. Y tú no naciste para ser plan B.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Confronta el ser tratado como repuesto. Genera identificación.",
    hashtags: "#relaciones #amorpropio #limites #verdades #frases",
    prompt: "Teléfono iluminándose solo cuando todo lo demás se apagó, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "Las relaciones se construyen en los pequeños 'estoy aquí', no en las grandes declaraciones. La presencia gana al discurso.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Resalta los pequeños gestos de conexión (bids). Guardable.",
    hashtags: "#relaciones #amor #presencia #parejas #vinculos",
    prompt: "Detalle de una mano sosteniendo otra en silencio, luz cálida, ambiente íntimo.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Si tienes que convencerte cada día de que te quieren, ya tienes tu respuesta. El amor seguro no se interroga tanto.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Señala la inseguridad constante en una relación. Identificación.",
    hashtags: "#relaciones #amorpropio #ansiedad #parejas #frases",
    prompt: "Persona buscando señales de cariño en gestos ambiguos, luz tenue, conceptual.",
    tecnicas: ["Reframe", "Espejo emocional", "Brevedad"]
  },
  {
    frase: "No eres para todos, y está perfecto. El que intenta gustarle a todo el mundo termina diluyéndose en nadie.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Defiende la autenticidad sobre la aprobación masiva. Compartible.",
    hashtags: "#autoestima #autenticidad #amorpropio #valor #frases",
    prompt: "Persona con color propio destacando entre figuras grises uniformes, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Que te tomen tiempo para responderte no baja tu valor. Tu precio no lo pone quien no supo apreciarte.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Protege la autoestima del trato ajeno. Guardable.",
    hashtags: "#autoestima #amorpropio #valor #limites #bienestar",
    prompt: "Pieza de valor intacta sin importar quién la ignore, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Dejar de explicarte tanto también es madurar. No todo merece tu defensa; algunas opiniones solo merecen tu silencio.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Empodera a no justificarse ante todos. Compartible.",
    hashtags: "#autoestima #madurez #limites #pazmental #amorpropio",
    prompt: "Persona caminando serena sin voltear a las críticas detrás, luz adelante, conceptual.",
    tecnicas: ["Reframe", "Regla de oro", "Cierre potente"]
  },

  /* ========== LOTE 22 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Comprar tiempo libre con tu dinero es de las mejores inversiones. Delegar lo que odias te devuelve vida, no solo horas.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Reencuadra el dinero como comprador de tiempo. Guardable.",
    hashtags: "#dinero #tiempo #libertadfinanciera #finanzas #mentalidad",
    prompt: "Persona disfrutando tiempo libre tras delegar tareas, luz cálida, ambiente sereno.",
    tecnicas: ["Reframe", "Dato revelador", "Cierre emocional"]
  },
  {
    frase: "Sé tacaño con lo que no te importa para ser generoso con lo que sí. Recortar sin criterio es tan tonto como gastar sin él.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Enseña el gasto selectivo por valores. Compartible.",
    hashtags: "#finanzas #dinero #ahorro #prioridades #mentalidad",
    prompt: "Persona eligiendo gastar en lo que valora y recortar lo demás, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "La generosidad bien medida también es inteligencia financiera. Dar desde la abundancia, no desde la culpa, te hace más rico por dentro.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Conecta generosidad sana y bienestar. Guardable.",
    hashtags: "#dinero #generosidad #finanzas #bienestar #mentalidad",
    prompt: "Manos compartiendo con calma desde un lugar de suficiencia, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "La motivación llega después de empezar, no antes. Mueve el cuerpo cinco minutos y las ganas suelen aparecer en el camino.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Invierte la lógica motivación-acción. Accionable y compartible.",
    hashtags: "#habitos #motivacion #disciplina #accion #productividad",
    prompt: "Persona dando los primeros pasos y la energía encendiéndose en el camino, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Disciplina es libertad: cada cosa que automatizas te quita una decisión y te devuelve energía para lo que importa.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Reencuadra la disciplina como libertad. Guardable.",
    hashtags: "#disciplina #habitos #libertad #productividad #mentalidad",
    prompt: "Persona con una rutina fluida que le abre tiempo libre al fondo, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Cierre potente"]
  },
  {
    frase: "Gestiona tu energía, no solo tu tiempo. De nada sirven dos horas libres si llegas a ellas vacío.",
    emocion: "Calma", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Cambia el foco del tiempo a la energía. Reflexiva y compartible.",
    hashtags: "#productividad #energia #habitos #bienestar #enfoque",
    prompt: "Batería personal junto a un reloj, ambas en equilibrio, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Metáfora"]
  },
  {
    frase: "Al principio fue perfecto, demasiado perfecto. El exceso de intensidad temprana a veces no es amor: es una estrategia.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Describe el 'love bombing' inicial. Revelador y guardable.",
    hashtags: "#narcisismo #lovebombing #relacionestoxicas #limites #conciencia",
    prompt: "Lluvia de regalos y halagos rodeando a una persona confundida, estética conceptual.",
    tecnicas: ["Revelación", "Open Loop", "Reframe"]
  },
  {
    frase: "Pasó de ponerte en un pedestal a hacerte sentir que no valías nada. Ese cambio brusco no fuiste tú: fue su patrón.",
    emocion: "Tristeza", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Describe la fase de devaluación tras la idealización. Validante.",
    hashtags: "#narcisismo #devaluacion #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona cayendo de un pedestal de luz hacia la sombra, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Espejo emocional"]
  },
  {
    frase: "Te ignoró en silencio hasta que cediste. El silencio como castigo no es paz: es control sin levantar la voz.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Comentarios",
    descripcion: "Describe el 'stonewalling'/ley del hielo. Genera debate.",
    hashtags: "#manipulacion #leydelhielo #relacionestoxicas #limites #conciencia",
    prompt: "Persona hablando a un muro frío mientras otra se cierra, luz fría, conceptual.",
    tecnicas: ["Reframe", "Revelación", "Gancho de debate"]
  },
  {
    frase: "Te repetían que exagerabas hasta que dudaste de tu propia memoria. Reconocer eso ya es empezar a recuperar tu voz.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Cierra el tema del gaslighting con esperanza. Guardable.",
    hashtags: "#gaslighting #manipulacion #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona recuperando claridad y saliendo de la niebla hacia la luz, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre potente"]
  },

  /* ========== LOTE 23 (Ciencia · curiosidades del universo y la vida) ========== */
  {
    frase: "Estás hecho, literalmente, de polvo de estrellas. Los átomos de tu cuerpo se forjaron en estrellas que murieron hace miles de millones de años.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato cósmico que conmueve. Muy compartible y poético.",
    hashtags: "#ciencia #universo #astronomia #polvodeestrellas #datoscuriosos",
    prompt: "Silueta humana hecha de estrellas y polvo cósmico, fondo de galaxia, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "La luz del sol que ves tardó unos 8 minutos en llegar. Siempre miras un sol del pasado.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Curiosidad astronómica fascinante. Muy compartible.",
    hashtags: "#ciencia #sol #astronomia #universo #datoscuriosos",
    prompt: "Rayo de luz solar viajando por el espacio hacia la Tierra, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Hay más árboles en la Tierra que estrellas en nuestra galaxia. Lo inmenso a veces está bajo tus pies, no solo en el cielo.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato natural que invita a mirar lo cercano. Compartible.",
    hashtags: "#ciencia #naturaleza #arboles #universo #datoscuriosos",
    prompt: "Bosque frondoso bajo un cielo estrellado, equilibrio entre tierra y cosmos, conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "El pulpo tiene tres corazones y sangre azul. La naturaleza es mucho más extraña de lo que nos enseñaron.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato curioso de biología. Lúdico y genera respuestas.",
    hashtags: "#ciencia #biologia #pulpo #naturaleza #datoscuriosos",
    prompt: "Pulpo elegante en aguas profundas con un brillo azulado, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "La miel no caduca: han encontrado tarros de miles de años aún comestibles. Algunas cosas, bien hechas, simplemente perduran.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato curioso con metáfora de durabilidad. Guardable.",
    hashtags: "#ciencia #miel #naturaleza #datoscuriosos #curiosidades",
    prompt: "Tarro de miel dorada con luz cálida atravesándolo, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Un día en Venus dura más que un año en Venus: gira tan lento que tarda más en girar que en orbitar al Sol.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato astronómico que rompe la lógica. Genera debate.",
    hashtags: "#ciencia #venus #astronomia #universo #datoscuriosos",
    prompt: "Planeta Venus girando lentamente frente al Sol, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Los tiburones existían antes que los árboles. Llevan nadando más de 400 millones de años: son más antiguos que los bosques.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato impactante de historia natural. Compartible.",
    hashtags: "#ciencia #tiburones #evolucion #naturaleza #datoscuriosos",
    prompt: "Tiburón antiguo nadando en un océano primitivo, estética conceptual evocadora.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Un rayo es varias veces más caliente que la superficie del Sol. La furia de un instante puede superar a una estrella.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato meteorológico sorprendente. Muy compartible.",
    hashtags: "#ciencia #rayos #clima #fisica #datoscuriosos",
    prompt: "Rayo cayendo con energía intensa en un cielo oscuro, estética conceptual dramática.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "La piel de gallina es un reflejo heredado de cuando teníamos pelaje. Tu cuerpo aún intenta erizar un abrigo que ya no existe.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el origen evolutivo de la piel de gallina. Curioso y guardable.",
    hashtags: "#ciencia #cuerpo #evolucion #datoscuriosos #biologia",
    prompt: "Primer plano de piel con vello erizado bajo luz suave, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Tu corazón late unas 100.000 veces al día sin que se lo pidas. Tu cuerpo trabaja por ti incluso cuando crees que no haces nada.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato corporal con giro de gratitud. Reflexivo y compartible.",
    hashtags: "#ciencia #cuerpo #corazon #gratitud #datoscuriosos",
    prompt: "Corazón latiendo con pulsos de luz suave, estética conceptual cálida.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Lo que crees recordar de un momento intenso es vívido, pero no siempre exacto. La emoción graba fuerte, no perfecto.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica las memorias 'flashbulb'. Educativo y guardable.",
    hashtags: "#ciencia #memoria #cerebro #emociones #datoscuriosos",
    prompt: "Recuerdo brillante pero ligeramente distorsionado en la mente, estética conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Cuando el miedo es extremo, una parte de tu cerebro toma el mando y apaga la razón. No eres débil por bloquearte: es biología.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el 'secuestro de la amígdala'. Validante y compartible.",
    hashtags: "#ciencia #cerebro #miedo #emociones #saludmental",
    prompt: "Cerebro con la zona emocional iluminada dominando a la racional, estética conceptual.",
    tecnicas: ["Dato revelador", "Validación emocional", "Reframe"]
  },

  /* ========== LOTE 24 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Damos por hecho que entendimos a alguien cuando en realidad llenamos los huecos con nuestras suposiciones. Pregunta antes de juzgar.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Comentarios",
    descripcion: "Invita a no asumir intenciones. Reflexiva y debatible.",
    hashtags: "#psicologia #comunicacion #suposiciones #relaciones #mente",
    prompt: "Dos personas con globos de pensamiento distintos sobre la misma escena, conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Gancho de debate"]
  },
  {
    frase: "Subestimamos cuánto tardaremos en hacer las cosas, una y otra vez. No eres desorganizado: tu mente es optimista con el tiempo.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica la falacia de planificación. Útil y guardable.",
    hashtags: "#psicologia #productividad #tiempo #sesgos #planificacion",
    prompt: "Reloj y una lista de tareas más larga de lo previsto, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Validación emocional"]
  },
  {
    frase: "Cuando algo sale mal, culpamos a la persona; cuando nos pasa a nosotros, culpamos a la situación. Sé justo: aplica la misma vara.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Explica el error fundamental de atribución. Reflexivo.",
    hashtags: "#psicologia #sesgos #empatia #juicio #crecimientopersonal",
    prompt: "Balanza desigual al juzgar a otros y a uno mismo, estética conceptual.",
    tecnicas: ["Dato revelador", "Antítesis", "Reframe"]
  },
  {
    frase: "Lo que resistes, persiste. Pelear con una emoción la agranda; nombrarla y dejarla pasar la disuelve.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Principio de aceptación emocional. Accionable y guardable.",
    hashtags: "#psicologia #emociones #aceptacion #saludmental #bienestar",
    prompt: "Ola que pasa sin resistencia bajo una persona en calma, estética conceptual serena.",
    tecnicas: ["Reframe", "Antítesis", "Metáfora"]
  },
  {
    frase: "El niño que fuiste sigue ahí, buscando lo que entonces le faltó. Date hoy la paciencia que esperabas de los demás.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Trabaja el concepto de niño interior. Emotiva y compartible.",
    hashtags: "#psicologia #niñointerior #sanar #saludmental #autocompasion",
    prompt: "Adulto abrazando con ternura a su versión de niño, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Espejo emocional", "Cierre emocional"]
  },
  {
    frase: "Estar disponible para todos te deja sin nadie para ti. Decir 'no' a veces es decirte 'sí' a ti mismo.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Refuerza los límites como autocuidado. Guardable.",
    hashtags: "#psicologia #limites #autocuidado #amorpropio #saludmental",
    prompt: "Persona reservando un espacio propio en su agenda con calma, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Regla de oro"]
  },
  {
    frase: "Perseguir a quien se aleja solo le enseña que puede irse y volver cuando quiera. El que se queda no debería tener que correr.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Confronta la dinámica de perseguir. Genera debate.",
    hashtags: "#relaciones #amorpropio #limites #parejas #frases",
    prompt: "Persona deteniéndose en una persecución y recuperando su dignidad, conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Gancho de debate"]
  },
  {
    frase: "Si te dejan en la incertidumbre a propósito, no es despiste: es una forma de tenerte esperando. Mereces claridad, no migajas.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Señala el 'breadcrumbing'. Identificación fuerte.",
    hashtags: "#relaciones #breadcrumbing #limites #amorpropio #verdades",
    prompt: "Rastro de migajas de luz que nunca llega a una mesa servida, estética conceptual.",
    tecnicas: ["Revelación", "Metáfora", "Reframe"]
  },
  {
    frase: "La química te atrae, pero la compatibilidad te sostiene. Una enciende la chispa; la otra mantiene el fuego.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Distingue química de compatibilidad. Madura y guardable.",
    hashtags: "#relaciones #amor #compatibilidad #parejas #frases",
    prompt: "Chispa inicial frente a una hoguera estable y duradera, estética conceptual cálida.",
    tecnicas: ["Antítesis", "Metáfora", "Reframe"]
  },
  {
    frase: "Comparar tu vida con la de otros es como medir tu capítulo 3 con el capítulo 20 de alguien más. Cada quien va por su página.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Metáfora contra la comparación. Compartible.",
    hashtags: "#autoestima #comparacion #ritmopropio #amorpropio #bienestar",
    prompt: "Dos libros abiertos en capítulos distintos, luz cálida, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "No bajes el precio de tu paz para entrar en lugares donde no te valoran. Hay puertas que es mejor dejar cerradas.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Empodera a no rebajarse por pertenecer. Guardable.",
    hashtags: "#autoestima #amorpropio #limites #pazmental #valor",
    prompt: "Persona alejándose serena de una puerta cerrada hacia un camino luminoso, conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Tu cicatriz no es una falla: es la prueba de que sanaste algo que creíste que iba a acabar contigo.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Reencuadra las heridas superadas como fortaleza. Compartible.",
    hashtags: "#autoestima #superacion #resiliencia #sanar #fortaleza",
    prompt: "Cicatriz iluminada con luz dorada como símbolo de fuerza, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },

  /* ========== LOTE 25 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "El dinero no resuelve todos los problemas, pero la pobreza tampoco tiene nada de romántico. La calma financiera también es salud.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Frase equilibrada sobre el dinero. Genera debate sano.",
    hashtags: "#dinero #finanzas #bienestar #mentalidad #verdades",
    prompt: "Persona en calma revisando sus cuentas con tranquilidad, luz cálida, estética serena.",
    tecnicas: ["Antítesis", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Automatiza tu ahorro y deja de depender de tu fuerza de voluntad. Lo que no ves, no lo gastas.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Consejo práctico de automatización del ahorro. Accionable.",
    hashtags: "#finanzas #ahorro #automatizacion #dinero #habitos",
    prompt: "Transferencia automática moviendo una parte del sueldo a ahorro, estética limpia.",
    tecnicas: ["Regla práctica", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Antes de comprar algo, calcula cuántas horas de tu vida cuesta. A veces el precio real no está en pesos, sino en tiempo tuyo.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reencuadra el gasto en horas de vida. Reflexivo y compartible.",
    hashtags: "#dinero #finanzas #tiempo #consumo #mentalidad",
    prompt: "Etiqueta de precio que muestra horas en vez de dinero, estética conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Llamado a la acción"]
  },
  {
    frase: "No confíes en la memoria para tus hábitos: confía en señales. Deja la guitarra a la vista y la tocarás; guárdala y la olvidarás.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Aplica el diseño de señales visibles. Accionable.",
    hashtags: "#habitos #productividad #entorno #disciplina #mejora",
    prompt: "Objeto de un hábito a la vista invitando a usarlo, ambiente ordenado, luz cálida.",
    tecnicas: ["Regla práctica", "Reframe", "Causa-efecto"]
  },
  {
    frase: "No necesitas empezar el lunes. El mejor día para construir quien quieres ser siempre fue hoy.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Rompe la excusa del 'lunes empiezo'. Motivador y compartible.",
    hashtags: "#habitos #disciplina #accion #hoy #mentalidad",
    prompt: "Calendario donde 'hoy' brilla más que cualquier lunes futuro, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Llamado a la acción"]
  },
  {
    frase: "Celebra los avances pequeños. Tu cerebro repite lo que premia, así que felicitarte también es entrenar la constancia.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Conecta recompensa y hábitos. Accionable y guardable.",
    hashtags: "#habitos #constancia #recompensa #disciplina #mentalidad",
    prompt: "Persona celebrando con calma un pequeño logro en su rutina, luz cálida, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Cuando lo cuestionabas, hacía que parecieras el dramático. Quien siempre invierte los papeles rara vez se mira al espejo.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Describe la inversión de roles. Genera identificación y debate.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #limites #conciencia",
    prompt: "Figura señalando a otra para desviar la atención de sí misma, luz fría, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Salir de ahí no te hace débil por haber aguantado tanto. Te hace fuerte por haberte elegido al fin.",
    emocion: "Esperanza", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Valida y empodera a quien dejó una relación tóxica. Compartible.",
    hashtags: "#relacionestoxicas #superacion #amorpropio #saludmental #conciencia",
    prompt: "Persona saliendo de una puerta oscura hacia un amanecer luminoso, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "La culpa que sientes por priorizarte fue plantada por alguien a quien le servía que no lo hicieras.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Revela el origen de la culpa inducida. Liberadora y guardable.",
    hashtags: "#manipulacion #culpa #limites #saludmental #conciencia",
    prompt: "Semilla de culpa plantada en la mente que una persona arranca con calma, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Causa-efecto"]
  },
  {
    frase: "No tienes que demostrar con pruebas que algo te lastimó. Tu malestar ya es razón suficiente para poner un límite.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Empodera a validar el propio malestar sin justificarlo. Compartible.",
    hashtags: "#limites #manipulacion #emociones #saludmental #conciencia",
    prompt: "Persona poniendo un límite con calma y firmeza, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre potente"]
  },

  /* ========== LOTE 26 (Ciencia · universo, planeta y cuerpo) ========== */
  {
    frase: "La Antártida es el desierto más grande del planeta. Un desierto no es arena: es un lugar donde casi no llueve.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato geográfico que rompe la intuición. Genera debate.",
    hashtags: "#ciencia #geografia #antartida #datoscuriosos #planeta",
    prompt: "Vasto paisaje helado de la Antártida bajo cielo despejado, estética conceptual.",
    tecnicas: ["Dato revelador", "Mito vs verdad", "Gancho de debate"]
  },
  {
    frase: "El Sáhara fue verde y lleno de lagos hace miles de años. Nada es para siempre, ni siquiera un desierto.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato con metáfora del cambio. Reflexivo y guardable.",
    hashtags: "#ciencia #sahara #planeta #cambio #datoscuriosos",
    prompt: "Desierto con una visión fantasma de lagos y vegetación antiguos, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Saturno es tan poco denso que, si existiera una bañera lo bastante grande, flotaría en el agua.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato astronómico lúdico y compartible.",
    hashtags: "#ciencia #saturno #astronomia #universo #datoscuriosos",
    prompt: "Planeta Saturno flotando como un corcho en agua, estética conceptual divertida.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Tu cuerpo crea millones de células nuevas cada segundo. Mientras lees esto, ya eres un poco distinto a hace un minuto.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato corporal con metáfora de renovación. Compartible.",
    hashtags: "#ciencia #cuerpo #celulas #biologia #datoscuriosos",
    prompt: "Células regenerándose con destellos de luz dentro del cuerpo, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Los bebés nacen con cerca de 300 huesos; los adultos tenemos 206. Crecer también es fusionar piezas.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato anatómico curioso. Genera respuestas.",
    hashtags: "#ciencia #cuerpo #huesos #biologia #datoscuriosos",
    prompt: "Ilustración de huesos de bebé que se fusionan al crecer, estética conceptual suave.",
    tecnicas: ["Dato revelador", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "Lo que llamas 'sabor' es casi todo olfato. Tápate la nariz y una manzana sabrá casi igual que una cebolla.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sensorial sorprendente. Curioso y guardable.",
    hashtags: "#ciencia #sabor #olfato #cuerpo #datoscuriosos",
    prompt: "Nariz y lengua conectadas por líneas de luz al percibir un sabor, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Los árboles se comunican bajo tierra a través de redes de hongos. Un bosque no es un grupo de árboles: es una sola familia conectada.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato de biología con metáfora de comunidad. Compartible.",
    hashtags: "#ciencia #naturaleza #arboles #biologia #datoscuriosos",
    prompt: "Raíces de árboles conectadas por hilos luminosos bajo tierra, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Una nube puede pesar cientos de toneladas. Lo que parece ligero a veces carga un peso enorme: igual que las personas.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato meteorológico con giro humano. Guardable.",
    hashtags: "#ciencia #nubes #clima #datoscuriosos #reflexion",
    prompt: "Nube imponente sobre un cielo claro con sensación de peso, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "La fosa más profunda del océano es más honda que el Everest es alto. Lo que no vemos suele ser más vasto que lo que admiramos.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato geográfico con metáfora de lo invisible. Compartible.",
    hashtags: "#ciencia #oceano #naturaleza #datoscuriosos #planeta",
    prompt: "Comparación visual entre la fosa de las Marianas y el Everest, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "Cleopatra vivió más cerca en el tiempo del primer iPhone que de la construcción de las grandes pirámides. La historia es más larga de lo que crees.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato histórico que descoloca la intuición del tiempo. Debatible.",
    hashtags: "#ciencia #historia #datoscuriosos #tiempo #curiosidades",
    prompt: "Línea de tiempo sorprendente con pirámides, Cleopatra y tecnología moderna, conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "El día en la Tierra se alarga muy poco a poco: la Luna se aleja y nos frena. El tiempo, literalmente, cambia de ritmo.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato astronómico fascinante. Guardable.",
    hashtags: "#ciencia #luna #tierra #astronomia #datoscuriosos",
    prompt: "Tierra y Luna con la órbita alejándose lentamente, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Solo entendemos una pequeña parte del universo; el resto es materia y energía que ni siquiera podemos ver. La ciencia también es aprender a decir 'no lo sé'.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato cosmológico con humildad científica. Reflexivo y compartible.",
    hashtags: "#ciencia #universo #cosmos #astronomia #datoscuriosos",
    prompt: "Vasto universo oscuro con una pequeña porción iluminada, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },

  /* ========== LOTE 27 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "La ansiedad y la emoción se sienten casi igual en el cuerpo. La diferencia muchas veces está en la historia que les pones.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra la ansiedad como activación. Accionable y guardable.",
    hashtags: "#psicologia #ansiedad #emociones #saludmental #mente",
    prompt: "Misma sensación corporal con dos etiquetas, miedo y emoción, estética conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Antítesis"]
  },
  {
    frase: "El duelo es amor que se quedó sin lugar a dónde ir. No buscas dejar de sentirlo: aprendes a llevarlo con más calma.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra el duelo con ternura. Muy compartible.",
    hashtags: "#duelo #saludmental #amor #sanar #emociones",
    prompt: "Persona sosteniendo una luz cálida en el pecho frente al mar, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Lo que los demás piensan de ti dice más de ellos que de ti. No puedes controlar el espejo en el que otros te miran.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Libera del juicio ajeno. Guardable.",
    hashtags: "#psicologia #opiniones #amorpropio #saludmental #limites",
    prompt: "Persona serena rodeada de espejos que la distorsionan distinto, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Puedes ser buena persona y aun así decir 'no'. La bondad no significa estar disponible para todo y para todos.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Separa bondad de complacencia. Compartible.",
    hashtags: "#psicologia #limites #bondad #amorpropio #saludmental",
    prompt: "Persona amable poniendo un límite con calma y sonrisa serena, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "Tu sistema nervioso no necesita que tengas la razón: necesita sentirse a salvo. A veces calmar el cuerpo es más urgente que ganar la discusión.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Introduce la idea de seguridad del sistema nervioso. Guardable.",
    hashtags: "#psicologia #sistemanervioso #emociones #saludmental #bienestar",
    prompt: "Persona respirando para calmar su cuerpo en medio de la tensión, estética conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Regla de oro"]
  },
  {
    frase: "Tienes permiso de cambiar de opinión. Crecer a veces significa contradecir a quien eras ayer.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Da permiso para evolucionar. Liberadora y compartible.",
    hashtags: "#psicologia #crecimientopersonal #cambio #mentalidad #autenticidad",
    prompt: "Persona reescribiendo su propio camino con calma, luz adelante, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "El amor correcto no se siente como una audición constante. Si tienes que actuar para que se queden, ya estás actuando solo.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Metáfora sobre dejar de fingir en pareja. Guardable.",
    hashtags: "#relaciones #amor #autenticidad #parejas #amorpropio",
    prompt: "Persona dejando un escenario para sentarse a ser ella misma, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Elige a quien se sienta como hogar, no como una pregunta sin responder. La paz también es una forma de química.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Eleva la calma como criterio de elección. Compartible.",
    hashtags: "#relaciones #amor #pazmental #parejas #frases",
    prompt: "Hogar cálido e iluminado frente a un signo de interrogación frío, estética conceptual.",
    tecnicas: ["Antítesis", "Metáfora", "Reframe"]
  },
  {
    frase: "Si una relación te cuesta la paz, el precio es demasiado alto sin importar cuánto la quieras.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Pone la paz como límite no negociable. Identificación.",
    hashtags: "#relaciones #pazmental #limites #amorpropio #frases",
    prompt: "Balanza entre amor y paz inclinándose hacia la calma, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "No tienes que encogerte para caber en la vida de alguien. La persona correcta agranda la puerta, no te pide que te dobles.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Empodera a no reducirse por encajar. Guardable.",
    hashtags: "#autoestima #amorpropio #relaciones #limites #frases",
    prompt: "Persona de pie firme frente a una puerta que se ensancha para ella, conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Sé tu propio lugar seguro. Cuando aprendes a sostenerte, dejas de mendigar que alguien lo haga por ti.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Promueve la autocontención emocional. Compartible.",
    hashtags: "#autoestima #amorpropio #autocuidado #saludmental #bienestar",
    prompt: "Persona abrazándose con calma en un espacio luminoso y propio, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Deja de audicionar para gente que ya decidió no elegirte. Tu energía vale más que un papel que nunca te iban a dar.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Empodera a soltar la búsqueda de aprobación. Compartible.",
    hashtags: "#autoestima #amorpropio #valor #limites #frases",
    prompt: "Persona saliendo de una audición y caminando segura hacia su propia luz, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre potente"]
  },

  /* ========== LOTE 28 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "La riqueza real suele ser silenciosa. Lo que más se presume a veces es justo lo que aún no se ha pagado.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Distingue riqueza discreta de ostentación. Compartible.",
    hashtags: "#dinero #finanzas #riqueza #apariencias #mentalidad",
    prompt: "Persona sencilla y tranquila frente a otra ostentosa y tensa, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "Un presupuesto es decirle a tu dinero a dónde ir, en vez de preguntarte a dónde se fue.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Reencuadra el presupuesto como dirección. Accionable y guardable.",
    hashtags: "#finanzas #presupuesto #dinero #habitos #control",
    prompt: "Persona dirigiendo flujos de dinero hacia metas claras, estética conceptual ordenada.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "Compra activos que trabajen por ti, no pasivos que trabajen contra ti. La diferencia entre ambos define tu futuro.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Distingue activos de pasivos. Educativo y debatible.",
    hashtags: "#finanzas #inversion #activos #dinero #educacionfinanciera",
    prompt: "Dos cajas: una que genera flujo y otra que lo drena, estética conceptual.",
    tecnicas: ["Antítesis", "Dato revelador", "Gancho de debate"]
  },
  {
    frase: "Haz que la buena decisión sea la fácil. Si tu fruta está a la vista y la chatarra escondida, ya ganaste media batalla.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Diseño de entorno para decisiones sanas. Accionable y guardable.",
    hashtags: "#habitos #entorno #salud #disciplina #mejora",
    prompt: "Cocina con fruta visible y comida chatarra guardada lejos, estética conceptual.",
    tecnicas: ["Regla práctica", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Tu yo del futuro está mirando lo que haces hoy. Cada decisión pequeña es una carta que le escribes a quien serás.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Conecta el presente con el yo futuro. Motivador y compartible.",
    hashtags: "#habitos #disciplina #futuro #mentalidad #constancia",
    prompt: "Persona presente y su versión futura mirándose con gratitud, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Progreso, no perfección. Un paso torcido hacia adelante vale más que quedarte quieto esperando el momento perfecto.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Promueve avanzar imperfecto. Motivador y guardable.",
    hashtags: "#habitos #progreso #disciplina #mentalidad #mejora",
    prompt: "Pasos imperfectos pero constantes hacia una luz, estética conceptual cálida.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "Poco a poco te alejó de tu gente, hasta que solo quedaba su versión de la realidad. El aislamiento no fue casualidad: fue método.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Describe el aislamiento progresivo. Revelador y guardable.",
    hashtags: "#narcisismo #aislamiento #relacionestoxicas #limites #conciencia",
    prompt: "Persona en un círculo que se cierra apartándola de sus seres queridos, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Encantador en público, distinto en privado. Quien guarda su peor cara solo para ti, te está mostrando quién es de verdad.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Señala el contraste público-privado. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #doblescaras #limites #conciencia",
    prompt: "Persona con dos rostros, uno cálido al público y otro frío en privado, conceptual.",
    tecnicas: ["Antítesis", "Revelación", "Reframe"]
  },
  {
    frase: "Reescribían la historia hasta que parecía que tú lo habías imaginado todo. Confía en lo que viviste, no en su versión editada.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Aborda la reescritura de la realidad. Liberadora y guardable.",
    hashtags: "#manipulacion #gaslighting #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona sosteniendo su propio relato verdadero frente a una versión borrosa, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Cierre potente"]
  },
  {
    frase: "Usaban tu culpa como moneda para conseguir lo que querían. El día que dejas de pagar con culpa, recuperas tu libertad.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Expone la culpa como herramienta de control. Compartible.",
    hashtags: "#manipulacion #culpa #limites #saludmental #conciencia",
    prompt: "Persona dejando de entregar monedas de culpa y cerrando la mano, estética conceptual.",
    tecnicas: ["Revelación", "Metáfora", "Cierre potente"]
  },

  /* ========== LOTE 29 (Ciencia · naturaleza, cuerpo y cosmos) ========== */
  {
    frase: "El corazón de un colibrí late más de mil veces por minuto. Vivir rápido también es una forma de estar vivo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato biológico curioso. Compartible.",
    hashtags: "#ciencia #colibri #naturaleza #biologia #datoscuriosos",
    prompt: "Colibrí suspendido junto a una flor con sus alas en movimiento, estética conceptual vibrante.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "El sonido no viaja en el espacio: sin aire, el silencio es absoluto. Hay vacíos donde ni un grito existiría.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato de física espacial. Genera asombro y debate.",
    hashtags: "#ciencia #espacio #fisica #sonido #datoscuriosos",
    prompt: "Astronauta en el vacío silencioso del espacio, estrellas alrededor, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "Eres un poco más alto al despertar que al dormir: durante el día, la gravedad comprime tu columna.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato corporal curioso y compartible.",
    hashtags: "#ciencia #cuerpo #gravedad #datoscuriosos #curiosidades",
    prompt: "Silueta humana ligeramente más alta de mañana que de noche, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Tu esqueleto se renueva por completo cada cierto número de años. El cuerpo que tienes hoy no es del todo el de antes.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato biológico con metáfora de renovación. Guardable.",
    hashtags: "#ciencia #cuerpo #huesos #renovacion #datoscuriosos",
    prompt: "Esqueleto regenerándose con destellos de luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Las abejas pueden reconocer rostros humanos. Un cerebro del tamaño de una semilla hace cosas que aún nos asombran.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato curioso de etología. Genera respuestas.",
    hashtags: "#ciencia #abejas #naturaleza #cerebro #datoscuriosos",
    prompt: "Abeja observando un rostro humano de cerca, estética conceptual delicada.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Tus ojos ven el mundo del revés y tu cerebro lo voltea. Casi nada de lo que percibes es 'directo': todo pasa por un filtro.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre percepción visual. Curioso y guardable.",
    hashtags: "#ciencia #cerebro #percepcion #vista #datoscuriosos",
    prompt: "Imagen invertida en el ojo y corregida por el cerebro, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Cae un rayo sobre la Tierra unas cien veces por segundo. Mientras lees esta frase, el cielo ya descargó varias veces.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato meteorológico impactante. Compartible.",
    hashtags: "#ciencia #rayos #clima #planeta #datoscuriosos",
    prompt: "Mapa del planeta con destellos de rayos cayendo constantemente, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Brevedad"]
  },
  {
    frase: "Lo que ves cuando miras una galaxia lejana es luz de hace millones de años. El cielo nocturno es un álbum de fotos del pasado.",
    emocion: "Nostalgia", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato astronómico poético. Muy compartible.",
    hashtags: "#ciencia #universo #astronomia #galaxias #datoscuriosos",
    prompt: "Cielo estrellado visto como un álbum de luz antigua, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "En una cucharada de tierra hay más microorganismos que personas en el planeta. La vida está donde menos la imaginas.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato de microbiología. Curioso y guardable.",
    hashtags: "#ciencia #naturaleza #microbios #biologia #datoscuriosos",
    prompt: "Cucharada de tierra con un universo microscópico iluminado, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "La lengua de la ballena azul pesa tanto como un elefante. Hay vida tan grande que cuesta imaginarla.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato biológico impresionante. Genera respuestas.",
    hashtags: "#ciencia #ballenas #naturaleza #oceano #datoscuriosos",
    prompt: "Ballena azul majestuosa en las profundidades del océano, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Decimos que algo está 'a años luz', pero un año luz mide distancia, no tiempo. El universo es tan grande que medimos con la velocidad de la luz.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Aclara un malentendido común. Educativo y guardable.",
    hashtags: "#ciencia #universo #añoluz #astronomia #datoscuriosos",
    prompt: "Regla de luz extendiéndose por el espacio entre estrellas, estética conceptual.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Reframe"]
  },
  {
    frase: "Tardígrados microscópicos sobreviven al vacío del espacio y a temperaturas extremas. La resistencia más asombrosa cabe en lo más pequeño.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato biológico con metáfora de resiliencia. Compartible.",
    hashtags: "#ciencia #tardigrados #naturaleza #resiliencia #datoscuriosos",
    prompt: "Tardígrado microscópico flotando resistente en condiciones extremas, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },

  /* ========== LOTE 30 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "La ansiedad miente. Te promete catástrofes detalladas que casi nunca llegan, y te cobra hoy un dolor de un mañana que no existe.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Desmonta el discurso de la ansiedad. Reconfortante y compartible.",
    hashtags: "#ansiedad #saludmental #psicologia #emociones #bienestar",
    prompt: "Persona en calma viendo cómo se disuelven escenarios catastróficos imaginarios, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Validación emocional"]
  },
  {
    frase: "No puedes dar de un vaso vacío. Cuidarte no es egoísmo: es lo que te permite seguir cuidando a quien amas.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Justifica el autocuidado con una metáfora clara. Guardable.",
    hashtags: "#autocuidado #saludmental #limites #amorpropio #bienestar",
    prompt: "Persona llenando su propio vaso antes de servir a otros, luz cálida, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Regla de oro"]
  },
  {
    frase: "No es tu trabajo arreglar a todos. Puedes acompañar sin cargar la vida entera de otra persona sobre tus hombros.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Libera del rol de salvador. Compartible.",
    hashtags: "#psicologia #limites #saludmental #relaciones #bienestar",
    prompt: "Persona soltando un peso ajeno con calma y manteniéndose firme, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Deja que te malinterpreten. Gastar tu vida explicándote ante quien no quiere entender es regalarle tu paz.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Empodera a soltar la necesidad de ser entendido. Guardable.",
    hashtags: "#psicologia #pazmental #limites #amorpropio #saludmental",
    prompt: "Persona caminando tranquila mientras los malentendidos quedan atrás, conceptual.",
    tecnicas: ["Reframe", "Regla de oro", "Cierre potente"]
  },
  {
    frase: "Tus emociones son válidas aunque otra persona no las entienda. No necesitan permiso ajeno para existir.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Valida las emociones propias. Compartible.",
    hashtags: "#emociones #saludmental #psicologia #validacion #bienestar",
    prompt: "Persona reconociendo sus emociones con calma frente a un espejo, estética conceptual.",
    tecnicas: ["Validación emocional", "Reframe", "Brevedad"]
  },
  {
    frase: "Empezar de nuevo no borra lo aprendido. Reiniciar con experiencia no es volver a cero: es volver con ventaja.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra los reinicios con esperanza. Guardable.",
    hashtags: "#psicologia #cambio #crecimientopersonal #superacion #mentalidad",
    prompt: "Persona reiniciando un camino con una mochila de experiencia, luz adelante, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Las señales confusas ya son una respuesta. Quien te quiere claro no te deja adivinando dónde estás parado.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Interpreta las señales mixtas como un 'no'. Genera debate.",
    hashtags: "#relaciones #amorpropio #limites #parejas #frases",
    prompt: "Semáforo en ámbar permanente frente a una persona cansada de esperar, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "No te enamores del potencial de alguien. Enamórate de lo que hace, no de lo que algún día prometió llegar a ser.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Advierte contra idealizar el potencial. Identificación.",
    hashtags: "#relaciones #amor #realidad #parejas #amorpropio",
    prompt: "Persona frente a una promesa brillante que no se concreta, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Brevedad"]
  },
  {
    frase: "Alejarte de quien te hace daño no es rencor. A veces irte es el acto de amor propio más grande que puedes hacer.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Reencuadra el alejarse como autocuidado. Guardable.",
    hashtags: "#relaciones #amorpropio #limites #soltar #bienestar",
    prompt: "Persona alejándose serena hacia la luz, dejando atrás la sombra, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "La confianza de verdad es silenciosa. No necesita demostrarle nada a nadie: solo sabe quién es.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Define la confianza serena. Compartible.",
    hashtags: "#autoestima #confianza #amorpropio #autenticidad #frases",
    prompt: "Persona tranquila y segura sin necesidad de aprobación, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "Tu valor no se gana con logros ni se pierde con errores. Naciste valiendo: lo demás solo es lo que haces, no lo que eres.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Separa el valor del rendimiento. Guardable.",
    hashtags: "#autoestima #amorpropio #valor #saludmental #bienestar",
    prompt: "Persona en calma rodeada de una luz propia constante, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "No necesitas la aprobación de todos para avanzar. Quien espera el aplauso unánime nunca da el primer paso.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Libera de la aprobación universal. Compartible.",
    hashtags: "#autoestima #amorpropio #valentia #autenticidad #mentalidad",
    prompt: "Persona avanzando decidida sin esperar el aplauso de la multitud, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },

  /* ========== LOTE 31 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "El dinero es una herramienta, no un marcador para compararte. Quien vive para ganarle a otros nunca tiene suficiente.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reencuadra el dinero fuera de la comparación. Compartible.",
    hashtags: "#dinero #finanzas #comparacion #mentalidad #bienestar",
    prompt: "Persona usando el dinero como herramienta tranquila, sin mirar a los demás, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "La regla de las 24 horas: si quieres comprar algo por impulso, espera un día. La mitad de las veces, el deseo se apaga solo.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Truco práctico contra compras impulsivas. Accionable y guardable.",
    hashtags: "#finanzas #ahorro #impulso #dinero #habitos",
    prompt: "Carrito de compra en pausa junto a un reloj de 24 horas, estética conceptual.",
    tecnicas: ["Regla práctica", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Invertir en aprender algo nuevo paga el mejor interés. El conocimiento es lo único que nadie te puede quitar.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Defiende la inversión en uno mismo. Compartible.",
    hashtags: "#dinero #inversion #aprendizaje #crecimiento #mentalidad",
    prompt: "Persona estudiando con una luz que crece a su alrededor, estética conceptual cálida.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Un ritual fijo de inicio le ahorra decisiones a tu cerebro. Por eso las personas constantes parecen tener más fuerza de voluntad: en realidad, deciden menos.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Conecta rituales y fatiga de decisión. Accionable y guardable.",
    hashtags: "#habitos #rutina #disciplina #productividad #mejora",
    prompt: "Persona iniciando su día con un ritual fijo y ordenado, luz cálida, estética serena.",
    tecnicas: ["Dato revelador", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Cómo empiezas la mañana le pone el tono a todo el día. Los primeros minutos son el timón, no un detalle.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Resalta el poder de la rutina matutina. Compartible.",
    hashtags: "#habitos #rutina #mañana #productividad #mentalidad",
    prompt: "Amanecer tranquilo con una rutina matutina ordenada, luz cálida, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Brevedad"]
  },
  {
    frase: "No necesitas hacerlo perfecto, necesitas hacerlo otra vez. La constancia imperfecta vence al talento que no aparece.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza repetir sobre perfeccionar. Guardable.",
    hashtags: "#habitos #constancia #disciplina #mejora #mentalidad",
    prompt: "Persona repitiendo una acción con constancia hasta dominarla, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "Nunca pedían perdón de verdad: solo lo justo para que bajaras la guardia y todo volviera a empezar.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Describe las disculpas vacías como táctica. Revelador y guardable.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #limites #conciencia",
    prompt: "Disculpa que se desvanece apenas cumple su función, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Open Loop"]
  },
  {
    frase: "Te castigaban justo cuando empezabas a crecer. A quien le incomoda tu evolución no te quería bien: te quería pequeño.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Señala el castigo ante el crecimiento propio. Identificación.",
    hashtags: "#narcisismo #relacionestoxicas #crecimiento #limites #conciencia",
    prompt: "Persona creciendo hacia la luz mientras una sombra intenta retenerla, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Antítesis"]
  },
  {
    frase: "Convertían tus inseguridades en armas justo cuando confiabas. Lo que les contaste para acercarte, lo usaron para herirte.",
    emocion: "Tristeza", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Describe el uso de las confidencias en contra. Revelador y guardable.",
    hashtags: "#manipulacion #relacionestoxicas #confianza #saludmental #conciencia",
    prompt: "Una confidencia luminosa convertida en sombra que hiere, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Espejo emocional"]
  },
  {
    frase: "Recuperar tu voz no se siente cómodo al principio: se siente raro, casi culpable. Es normal. Estás desaprendiendo a callarte.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Acompaña el proceso de recuperar la voz. Empoderador y compartible.",
    hashtags: "#limites #manipulacion #saludmental #amorpropio #conciencia",
    prompt: "Persona alzando la voz por primera vez con cierta timidez pero firme, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre potente"]
  },

  /* ========== LOTE 32 (Ciencia · animales, cosmos y cuerpo) ========== */
  {
    frase: "Las nutrias se toman de las manos al dormir para no separarse con la corriente. Hasta en el descanso buscamos no soltar lo que amamos.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal tierno con giro emocional. Altísima compartibilidad.",
    hashtags: "#ciencia #nutrias #naturaleza #animales #datoscuriosos",
    prompt: "Dos nutrias flotando tomadas de las manos en el agua, luz suave, estética tierna.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Los pingüinos le regalan una piedra a quien eligen como pareja. A veces el amor más sincero cabe en el gesto más pequeño.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal entrañable con metáfora del amor. Muy compartible.",
    hashtags: "#ciencia #pinguinos #naturaleza #animales #datoscuriosos",
    prompt: "Pingüino ofreciendo una pequeña piedra a otro, fondo nevado, estética tierna.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Los elefantes se reconocen en el espejo, una señal de conciencia de sí mismos que pocos animales tienen.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato de cognición animal. Genera asombro y debate.",
    hashtags: "#ciencia #elefantes #animales #conciencia #datoscuriosos",
    prompt: "Elefante observándose en un gran espejo con calma, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Los delfines se ponen 'nombres': cada uno tiene un silbido único con el que los demás lo llaman.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato curioso de comunicación animal. Compartible.",
    hashtags: "#ciencia #delfines #animales #naturaleza #datoscuriosos",
    prompt: "Delfines comunicándose con ondas de sonido visibles, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "El pulpo puede 'saborear' con sus brazos: cada ventosa detecta sustancias al tocar. Sentir el mundo no siempre es como lo imaginamos.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato biológico fascinante. Curioso y guardable.",
    hashtags: "#ciencia #pulpo #biologia #animales #datoscuriosos",
    prompt: "Pulpo explorando con sus brazos sensibles en el fondo marino, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Dentro de miles de millones de años, nuestra galaxia chocará con Andrómeda. Hasta las galaxias terminan encontrándose.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato cosmológico con metáfora poética. Compartible.",
    hashtags: "#ciencia #universo #galaxias #astronomia #datoscuriosos",
    prompt: "Dos galaxias acercándose lentamente en el espacio, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Tu cuerpo tiene alrededor de 37 billones de células trabajando en equipo. Eres, literalmente, una multitud que se llama 'yo'.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato corporal con metáfora de unidad. Guardable.",
    hashtags: "#ciencia #cuerpo #celulas #biologia #datoscuriosos",
    prompt: "Cuerpo humano formado por millones de puntos de luz coordinados, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Ni siquiera los gemelos idénticos comparten huellas dactilares. Eres, hasta en lo más mínimo, irrepetible.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato con mensaje de singularidad. Compartible.",
    hashtags: "#ciencia #cuerpo #huellas #identidad #datoscuriosos",
    prompt: "Huella dactilar única iluminada con un patrón propio, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre potente"]
  },
  {
    frase: "El corazón tiene su propio sistema eléctrico: puede seguir latiendo un rato fuera del cuerpo. Algunos motores no piden permiso para seguir.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato fisiológico impactante. Genera respuestas.",
    hashtags: "#ciencia #corazon #cuerpo #biologia #datoscuriosos",
    prompt: "Corazón con impulsos eléctricos propios iluminados, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "Los anillos de un árbol guardan la historia del clima de cada año que vivió. La naturaleza también lleva un diario.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato natural con metáfora. Guardable.",
    hashtags: "#ciencia #arboles #naturaleza #clima #datoscuriosos",
    prompt: "Tronco cortado mostrando anillos como un diario de años, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "El Atlántico se ensancha unos centímetros al año mientras el Pacífico se encoge. El suelo que pisas también está, lentamente, en movimiento.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato geológico fascinante. Compartible.",
    hashtags: "#ciencia #geologia #planeta #tierra #datoscuriosos",
    prompt: "Placas tectónicas moviéndose lentamente bajo los océanos, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Probablemente respiras átomos que alguna vez respiró gente de hace siglos. El aire también es una herencia compartida.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato curioso con metáfora de conexión. Guardable.",
    hashtags: "#ciencia #aire #atomos #universo #datoscuriosos",
    prompt: "Aire con partículas de luz conectando épocas distintas, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },

  /* ========== LOTE 33 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "La comparación es la ladrona de la alegría. Cada vez que mides tu vida con la de otro, le entregas tu paz a alguien que ni se entera.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Frase clásica desarrollada sobre la comparación. Compartible.",
    hashtags: "#psicologia #comparacion #saludmental #bienestar #amorpropio",
    prompt: "Persona mirando su propio camino mientras ignora carriles ajenos, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Lo que ocupa tu mente, gobierna tu vida. Elige con cuidado a qué le das tu atención: ahí se va tu energía.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Conecta atención y calidad de vida. Guardable.",
    hashtags: "#psicologia #atencion #mente #enfoque #bienestar",
    prompt: "Mente iluminando aquello en lo que se concentra, estética conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla de oro"]
  },
  {
    frase: "Sobreviviste al 100% de tus peores días. La evidencia de que puedes con esto la llevas escrita en tu propia historia.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Recordatorio de resiliencia con dato personal. Compartible.",
    hashtags: "#psicologia #resiliencia #superacion #saludmental #fortaleza",
    prompt: "Persona mirando atrás su camino superado con orgullo sereno, estética conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Cierre potente"]
  },
  {
    frase: "Las emociones son visitantes, no dueñas de la casa. Llegan, se quedan un rato y se van si no las alimentas con historias.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Metáfora sobre la transitoriedad emocional. Guardable.",
    hashtags: "#psicologia #emociones #saludmental #mindfulness #bienestar",
    prompt: "Emociones representadas como visitantes que entran y salen de una casa, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Soltar el plan perfecto que tenías para tu vida también es un duelo. Está bien extrañar lo que imaginabas mientras abrazas lo que es.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Valida el duelo por expectativas perdidas. Compartible.",
    hashtags: "#psicologia #duelo #expectativas #saludmental #aceptacion",
    prompt: "Persona soltando un mapa idealizado y mirando el camino real con calma, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre emocional"]
  },
  {
    frase: "Tu paz mental es prioridad, no recompensa. No tienes que ganártela cumpliendo primero las exigencias de todos.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Eleva la paz a prioridad. Guardable.",
    hashtags: "#psicologia #pazmental #limites #saludmental #bienestar",
    prompt: "Persona eligiendo su calma por encima del ruido externo, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "No puedes ser la única persona remando en una relación. Dos remos del mismo lado solo hacen girar el bote en círculos.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Metáfora sobre el esfuerzo desigual. Genera debate.",
    hashtags: "#relaciones #esfuerzo #parejas #amorpropio #frases",
    prompt: "Persona remando sola mientras la otra suelta los remos, bote girando, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Gancho de debate"]
  },
  {
    frase: "El amor seguro a veces se siente 'aburrido' para quien creció en el caos. No es falta de chispa: es por fin sentirte a salvo.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Explica por qué la calma confunde tras el caos. Guardable.",
    hashtags: "#relaciones #amor #pazmental #saludmental #parejas",
    prompt: "Persona acostumbrándose a la calma de una relación serena, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Validación emocional"]
  },
  {
    frase: "No ruegues por un lugar en la mesa de quien no te quiere ahí. Mereces ser invitado, no tolerado.",
    emocion: "Orgullo", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Empodera a no mendigar pertenencia. Compartible.",
    hashtags: "#relaciones #amorpropio #limites #valor #frases",
    prompt: "Persona dejando una mesa fría y caminando hacia una cálida que la recibe, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre potente"]
  },
  {
    frase: "Eres suficiente tal como eres, no como una versión mejorada que aún no llega. Tu valor no está en lista de espera.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Afirma la suficiencia presente. Guardable.",
    hashtags: "#autoestima #amorpropio #suficiente #saludmental #bienestar",
    prompt: "Persona en calma aceptándose plenamente en el presente, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Sé el amor que andas buscando afuera. La relación más larga de tu vida es la que tienes contigo.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Promueve el amor propio como base. Compartible.",
    hashtags: "#autoestima #amorpropio #autocuidado #bienestar #frases",
    prompt: "Persona abrazándose con ternura frente a un espejo cálido, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Tu valor no está a debate. No tienes que defenderlo ante quien decidió no verlo.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Afirma el valor propio sin justificación. Guardable.",
    hashtags: "#autoestima #amorpropio #valor #limites #frases",
    prompt: "Persona firme y serena sin necesidad de defenderse, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Brevedad", "Regla de oro"]
  },

  /* ========== LOTE 34 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Dejar de competir con los vecinos es el primer ahorro real. Comprar para impresionar a otros te empobrece por dentro y por fuera.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Confronta la comparación de consumo. Compartible.",
    hashtags: "#dinero #finanzas #comparacion #ahorro #mentalidad",
    prompt: "Persona tranquila en su hogar sencillo ignorando el lujo ajeno, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "El dinero te compra opciones, y las opciones son libertad. Ahorrar no es privarte: es comprarte futuro.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Reencuadra el ahorro como libertad futura. Guardable.",
    hashtags: "#dinero #finanzas #libertad #ahorro #mentalidad",
    prompt: "Puertas de opciones abriéndose ante una persona que ahorró, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Gasta de más en lo que usas a diario y recorta sin piedad en lo que casi no tocas. Ahí están tus mejores decisiones financieras.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Regla práctica de gasto inteligente. Accionable y guardable.",
    hashtags: "#finanzas #dinero #gastos #prioridades #habitos",
    prompt: "Persona priorizando gasto en lo cotidiano y recortando lo raro, estética conceptual.",
    tecnicas: ["Antítesis", "Regla práctica", "Reframe"]
  },
  {
    frase: "El aburrimiento es el precio de la maestría. Lo que parece monótono hoy es lo que mañana los demás llamarán 'talento'.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Dignifica la repetición que lleva a la maestría. Compartible.",
    hashtags: "#habitos #disciplina #maestria #constancia #mentalidad",
    prompt: "Persona practicando lo mismo una y otra vez hasta brillar, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "La constancia se acumula en silencio: no ves el cambio cada día, pero un día el cambio es imposible de ignorar.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Explica el progreso invisible de la constancia. Guardable.",
    hashtags: "#habitos #constancia #disciplina #mejora #crecimiento",
    prompt: "Línea de progreso casi plana que de pronto se vuelve evidente, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "No esperes tener ganas para empezar. Empieza, y deja que las ganas te alcancen en el camino.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Invierte la relación ganas-acción. Motivador y compartible.",
    hashtags: "#habitos #motivacion #accion #disciplina #mentalidad",
    prompt: "Persona dando el primer paso mientras la energía la alcanza, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Mandaban a otros a presionarte 'por tu bien'. Cuando alguien recluta gente para doblegarte, no busca tu bien: busca tu obediencia.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Describe a los 'flying monkeys'. Revelador y debatible.",
    hashtags: "#narcisismo #relacionestoxicas #manipulacion #limites #conciencia",
    prompt: "Persona presionada por un grupo enviado por alguien detrás, luz fría, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Llevaban la cuenta de cada cosa que hacías, pero nunca de las suyas. En una relación sana nadie te pasa factura por amar.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Señala el llevar la cuenta como control. Identificación.",
    hashtags: "#narcisismo #relacionestoxicas #limites #saludmental #conciencia",
    prompt: "Figura con una libreta de 'deudas' ajenas pero sin las propias, conceptual.",
    tecnicas: ["Antítesis", "Revelación", "Reframe"]
  },
  {
    frase: "No cambian, solo entran en ciclos: encanto, daño, disculpa y vuelta a empezar. Reconocer el patrón es empezar a salir de él.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Describe el ciclo del abuso. Revelador y guardable.",
    hashtags: "#manipulacion #relacionestoxicas #cicloabuso #saludmental #conciencia",
    prompt: "Círculo que se repite con fases de luz y sombra, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Cierre potente"]
  },
  {
    frase: "Poner un límite y sostenerlo, aunque tiemble tu voz, es el día en que dejas de pedir permiso para respetarte.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Empodera a sostener los límites. Compartible.",
    hashtags: "#limites #manipulacion #amorpropio #saludmental #conciencia",
    prompt: "Persona sosteniendo un límite con firmeza aunque con nervios, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre potente"]
  },

  /* ========== LOTE 35 (Ciencia · cerebro, animales y cosmos) ========== */
  {
    frase: "Tu cerebro tiene unos 86 mil millones de neuronas. Tienes en la cabeza más conexiones posibles que estrellas en la Vía Láctea.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre la magnitud del cerebro. Muy compartible.",
    hashtags: "#ciencia #cerebro #neuronas #neurociencia #datoscuriosos",
    prompt: "Cerebro como una galaxia de conexiones luminosas, fondo oscuro, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "Mientras sueñas, tu cuerpo se paraliza a propósito para que no actúes lo que sueñas. Tu mente te protege incluso dormido.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la parálisis del sueño REM. Curioso y guardable.",
    hashtags: "#ciencia #sueño #cerebro #REM #datoscuriosos",
    prompt: "Persona durmiendo serena mientras su mente sueña en movimiento, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Olvidamos casi la mitad de lo aprendido en la primera hora si no lo repasamos. No eres olvidadizo: así funciona la memoria.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la curva del olvido y el repaso. Útil y guardable.",
    hashtags: "#ciencia #memoria #aprendizaje #cerebro #estudio",
    prompt: "Curva que cae rápido y se sostiene al repasar, estética conceptual educativa.",
    tecnicas: ["Dato revelador", "Reframe", "Validación emocional"]
  },
  {
    frase: "Hay una medusa que puede revertir su envejecimiento y volver a su forma joven. La naturaleza guarda trucos que aún no entendemos.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato biológico fascinante (Turritopsis). Genera debate.",
    hashtags: "#ciencia #medusa #biologia #naturaleza #datoscuriosos",
    prompt: "Medusa translúcida brillando en aguas oscuras, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "El ajolote puede regenerar patas, partes del corazón y hasta del cerebro. Algunas criaturas convierten el daño en algo que vuelve a crecer.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato biológico con metáfora de regeneración. Compartible.",
    hashtags: "#ciencia #ajolote #biologia #regeneracion #datoscuriosos",
    prompt: "Ajolote sonriente regenerando una extremidad, estética conceptual luminosa.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Las ratas ríen cuando les hacen cosquillas, en un tono que no oímos. La risa quizá sea más antigua y común de lo que creemos.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal entrañable. Compartible.",
    hashtags: "#ciencia #animales #risa #biologia #datoscuriosos",
    prompt: "Rata feliz en un gesto de juego, luz cálida, estética conceptual amigable.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Las mariposas saborean con las patas: al posarse, ya saben si la flor sirve. Sentir el mundo tiene muchas formas.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato curioso de biología. Guardable.",
    hashtags: "#ciencia #mariposas #naturaleza #biologia #datoscuriosos",
    prompt: "Mariposa posada en una flor con sus patas sensibles destacadas, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Probablemente hay más estrellas en el universo que granos de arena en todas las playas de la Tierra. Lo inabarcable también es real.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato cosmológico que genera asombro. Compartible.",
    hashtags: "#ciencia #universo #estrellas #astronomia #datoscuriosos",
    prompt: "Playa de noche bajo un cielo desbordante de estrellas, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "La Gran Mancha Roja de Júpiter es una tormenta que lleva siglos girando. Hay tormentas más viejas que cualquier país.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato astronómico impresionante. Genera respuestas.",
    hashtags: "#ciencia #jupiter #astronomia #universo #datoscuriosos",
    prompt: "Júpiter con su Gran Mancha Roja girando, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Los impulsos en tus nervios viajan a más de 100 metros por segundo. Tu cuerpo te avisa del dolor casi antes de que lo pienses.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato fisiológico curioso. Guardable.",
    hashtags: "#ciencia #cuerpo #nervios #cerebro #datoscuriosos",
    prompt: "Señal eléctrica viajando veloz por una red nerviosa, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Algunos caracoles pueden dormir durante años cuando el clima no acompaña. Esperar el momento correcto también es una estrategia de la vida.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal con metáfora de paciencia. Compartible.",
    hashtags: "#ciencia #animales #naturaleza #paciencia #datoscuriosos",
    prompt: "Caracol en reposo dentro de su concha bajo luz suave, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "El sol representa el 99,8% de toda la masa del sistema solar. Los planetas, incluidos nosotros, somos apenas las migajas que sobraron.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato astronómico con giro humilde. Compartible.",
    hashtags: "#ciencia #sol #sistemasolar #astronomia #datoscuriosos",
    prompt: "Sol gigante junto a planetas diminutos a escala, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },

  /* ========== LOTE 36 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "No puedes sanar en el mismo lugar que te enfermó. A veces alejarte no es huir: es darte la oportunidad de respirar.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra alejarse como condición para sanar. Compartible.",
    hashtags: "#psicologia #sanar #saludmental #limites #bienestar",
    prompt: "Persona saliendo de un cuarto cerrado hacia aire libre y luz, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Los disparadores no son tu enemigo: son maestros que te muestran qué herida pide atención. Obsérvalos en vez de pelearte con ellos.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra los gatillos como guías. Guardable.",
    hashtags: "#psicologia #emociones #sanar #saludmental #autoconciencia",
    prompt: "Persona observando con calma una señal interna que la guía, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Validación emocional"]
  },
  {
    frase: "Sobrepensar es el arte de crear problemas que aún no existen y vivirlos como si ya fueran reales.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Define el sobrepensar con un giro punzante. Compartible.",
    hashtags: "#psicologia #overthinking #ansiedad #saludmental #mente",
    prompt: "Persona rodeada de problemas imaginarios que se desvanecen, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "Los límites no alejan a quien te quiere: alejan a quien solo te quería sin límites. Cuidan tus relaciones, no las rompen.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra los límites como protección de vínculos. Guardable.",
    hashtags: "#psicologia #limites #relaciones #amorpropio #saludmental",
    prompt: "Persona poniendo un límite mientras quien la quiere se queda cerca, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Puedes querer a alguien y aun así elegir alejarte. El amor no siempre significa quedarse: a veces significa cuidarte tú.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Valida soltar por amor propio. Compartible.",
    hashtags: "#psicologia #soltar #amorpropio #saludmental #limites",
    prompt: "Persona soltando con cariño una mano y caminando hacia la luz, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "No tienes que perdonar para liberarte; basta con dejar de esperar que el pasado sea distinto. Soltar también es paz.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Matiza el perdón frente a la aceptación. Guardable.",
    hashtags: "#psicologia #perdon #aceptacion #pazmental #saludmental",
    prompt: "Persona dejando ir un peso del pasado con calma, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Si tuvieran ganas, lo harían. Dejar de inventar excusas por quien no te elige también es un acto de dignidad.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Confronta la falta de esfuerzo del otro. Genera debate.",
    hashtags: "#relaciones #amorpropio #limites #parejas #verdades",
    prompt: "Persona dejando de justificar a alguien que no aparece, estética conceptual.",
    tecnicas: ["Reframe", "Brevedad", "Gancho de debate"]
  },
  {
    frase: "No te incendies para mantener a otros calientes. Si para que alguien esté bien tú tienes que apagarte, ese trato no es amor.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Metáfora sobre el autosacrificio excesivo. Guardable.",
    hashtags: "#relaciones #amorpropio #limites #autocuidado #frases",
    prompt: "Persona conservando su propia llama en lugar de consumirse por otros, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Regla de oro"]
  },
  {
    frase: "Una relación es dos personas eligiéndose cada día, no una sola insistiendo todos los días. El amor no debería sentirse como un trabajo solitario.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Define la reciprocidad diaria. Compartible.",
    hashtags: "#relaciones #amor #reciprocidad #parejas #frases",
    prompt: "Dos personas eligiéndose mutuamente con calma, luz cálida, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Empieza a tratarte como tratas a tu persona favorita. La relación contigo marca el tono de todas las demás.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Promueve el buen trato propio como base. Guardable.",
    hashtags: "#autoestima #amorpropio #autocuidado #saludmental #bienestar",
    prompt: "Persona cuidándose con el mismo cariño con que cuida a quien ama, conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Romantiza tu propia vida: el café de la mañana, el camino, la canción. La felicidad casi siempre vive en lo pequeño que damos por hecho.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Invita a valorar lo cotidiano. Compartible.",
    hashtags: "#autoestima #bienestar #gratitud #amorpropio #vida",
    prompt: "Persona disfrutando un momento sencillo con luz cálida y presencia, estética conceptual.",
    tecnicas: ["Reframe", "Llamado a la acción", "Cierre emocional"]
  },
  {
    frase: "Deja de abandonarte para que te elijan. El día que dejas de traicionarte, atraes a quien sí sabe quedarse.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Conecta autolealtad y mejores vínculos. Guardable.",
    hashtags: "#autoestima #amorpropio #autenticidad #limites #frases",
    prompt: "Persona reencontrándose consigo misma con firmeza y calma, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },

  /* ========== LOTE 37 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Un presupuesto es una declaración de tus valores: muéstrame en qué gastas y te diré qué te importa de verdad.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Conecta gasto y valores personales. Genera reflexión y debate.",
    hashtags: "#finanzas #presupuesto #dinero #valores #mentalidad",
    prompt: "Gastos personales reflejando prioridades de vida, estética conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Gancho de debate"]
  },
  {
    frase: "La mejor inversión es la que entiendes. Si no sabes cómo gana o pierde, no estás invirtiendo: estás apostando.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Consejo prudente de inversión. Accionable y guardable.",
    hashtags: "#finanzas #inversion #dinero #educacionfinanciera #mentalidad",
    prompt: "Persona estudiando con calma una inversión que comprende, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "El interés compuesto premia la paciencia, no la prisa. Lo que siembras hoy crece más por el tiempo que por la cantidad.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Refuerza la paciencia en la inversión. Compartible.",
    hashtags: "#finanzas #inversion #paciencia #dinero #educacionfinanciera",
    prompt: "Pequeña semilla que se convierte en árbol con el paso del tiempo, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Tus hábitos son votos por la persona en la que te conviertes. Cada acción pequeña le dice a tu cerebro quién eres.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Conecta hábitos e identidad (votos). Guardable.",
    hashtags: "#habitos #identidad #disciplina #mentalidad #crecimiento",
    prompt: "Persona depositando 'votos' de acciones en la urna de su identidad, conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre potente"]
  },
  {
    frase: "La recuperación es parte del plan, no una pausa que te roba progreso. Descansar bien también te hace más constante.",
    emocion: "Calma", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Integra el descanso en la constancia. Compartible.",
    hashtags: "#habitos #descanso #constancia #bienestar #disciplina",
    prompt: "Persona descansando como parte de su rutina de progreso, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "No necesitas fuerza de voluntad infinita: necesitas un buen diseño. Quita la tentación de tu vista y ganaste la mitad de la batalla.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza diseño de entorno sobre voluntad. Guardable.",
    hashtags: "#habitos #entorno #disciplina #productividad #mejora",
    prompt: "Entorno diseñado para facilitar lo bueno y esconder lo malo, estética conceptual.",
    tecnicas: ["Antítesis", "Regla práctica", "Reframe"]
  },
  {
    frase: "Te confundían a propósito para que dependieras de su versión de las cosas. La claridad que recuperas hoy es tu camino de regreso a ti.",
    emocion: "Esperanza", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Aborda la confusión inducida con esperanza. Guardable.",
    hashtags: "#narcisismo #relacionestoxicas #claridad #saludmental #conciencia",
    prompt: "Persona saliendo de la niebla hacia un camino claro, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Cierre potente"]
  },
  {
    frase: "Confundían el control con el amor. Querer a alguien no es vigilarlo, sino confiar en que puede ser libre a tu lado.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Distingue control de amor. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #amor #limites #conciencia",
    prompt: "Persona libre junto a otra que confía, frente a una jaula abierta, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "No estabas exagerando. Estabas reaccionando a algo real que te hicieron creer que era normal. Tu percepción no estaba rota.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Valida la percepción negada por el gaslighting. Compartible.",
    hashtags: "#gaslighting #manipulacion #saludmental #validacion #conciencia",
    prompt: "Persona recuperando la confianza en lo que vio y sintió, luz clara, conceptual.",
    tecnicas: ["Validación emocional", "Reframe", "Cierre potente"]
  },
  {
    frase: "Sentir culpa al priorizarte no significa que hagas algo malo. A veces es solo el eco de quien te enseñó a ponerte último.",
    emocion: "Calma", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Separa la culpa real de la culpa aprendida. Guardable.",
    hashtags: "#manipulacion #culpa #limites #saludmental #conciencia",
    prompt: "Persona priorizándose con calma mientras un eco de culpa se desvanece, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Causa-efecto"]
  },

  /* ========== LOTE 38 (Ciencia · cosmos, planeta y animales) ========== */
  {
    frase: "El planeta más caliente no es el más cercano al Sol: es Venus, atrapado bajo su propio efecto invernadero. A veces lo que te quema no es la fuente, sino lo que retienes.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato astronómico con metáfora. Compartible.",
    hashtags: "#ciencia #venus #astronomia #planetas #datoscuriosos",
    prompt: "Venus envuelto en densas nubes calientes, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "El tiempo pasa un poquito más lento cerca de objetos muy masivos. Tu GPS lo corrige a diario: la relatividad te guía sin que lo notes.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica la dilatación del tiempo y el GPS. Fascinante y guardable.",
    hashtags: "#ciencia #relatividad #tiempo #fisica #datoscuriosos",
    prompt: "Satélite ajustando el tiempo sobre la Tierra, estética conceptual científica.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Cabrían todos los planetas del sistema solar en el espacio que hay entre la Tierra y la Luna. La distancia que crees pequeña es enorme.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato astronómico que descoloca la escala. Debatible.",
    hashtags: "#ciencia #espacio #luna #astronomia #datoscuriosos",
    prompt: "Planetas alineados entre la Tierra y la Luna, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "El volcán más alto conocido no está en la Tierra: es el Olympus Mons en Marte, casi tres veces el Everest.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato planetario impresionante. Compartible.",
    hashtags: "#ciencia #marte #volcanes #astronomia #datoscuriosos",
    prompt: "Olympus Mons gigante sobre la superficie marciana, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Los cuervos recuerdan rostros y guardan rencor durante años. La inteligencia animal a veces se parece demasiado a la nuestra.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato de cognición animal. Genera respuestas.",
    hashtags: "#ciencia #cuervos #animales #inteligencia #datoscuriosos",
    prompt: "Cuervo observando atento con mirada inteligente, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Las vacas tienen amigas: se estresan cuando las separan de su mejor compañera. Hasta donde menos lo imaginas hay vínculos.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal tierno. Compartible.",
    hashtags: "#ciencia #vacas #animales #naturaleza #datoscuriosos",
    prompt: "Dos vacas juntas en un campo al atardecer, estética conceptual tierna.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "El olfato de un perro es decenas de miles de veces más fino que el tuyo. Viven en un mundo de olores que no podemos ni imaginar.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato animal curioso. Guardable.",
    hashtags: "#ciencia #perros #olfato #animales #datoscuriosos",
    prompt: "Perro olfateando con ondas de aromas visibles, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Si pudieras estirar todos tus vasos sanguíneos, darían varias vueltas a la Tierra. Llevas dentro un universo de caminos.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato corporal impresionante. Compartible.",
    hashtags: "#ciencia #cuerpo #circulacion #biologia #datoscuriosos",
    prompt: "Red de vasos sanguíneos extendiéndose como caminos luminosos, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "La estrella más cercana, además del Sol, está tan lejos que su luz tarda más de cuatro años en llegarnos. El vecino del cosmos vive lejísimos.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato astronómico que da perspectiva. Guardable.",
    hashtags: "#ciencia #estrellas #universo #astronomia #datoscuriosos",
    prompt: "Estrella lejana con un haz de luz viajando años hacia la Tierra, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "El polvo de tu casa es, en buena parte, piel que tu cuerpo dejó ir. Te renuevas tanto que vas dejando rastro de quien fuiste.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato corporal curioso con metáfora. Genera respuestas.",
    hashtags: "#ciencia #cuerpo #piel #biologia #datoscuriosos",
    prompt: "Partículas de polvo flotando en un rayo de luz en una habitación, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "El universo no solo es enorme: se expande, y cada vez más rápido. Todo se aleja de todo mientras lees esto.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato cosmológico que asombra. Compartible.",
    hashtags: "#ciencia #universo #expansion #cosmos #datoscuriosos",
    prompt: "Galaxias alejándose unas de otras en un cosmos en expansión, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Las jirafas duermen apenas unos minutos al día, a ratos y casi de pie. No todos descansamos igual, y aun así seguimos en pie.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato animal curioso con metáfora. Guardable.",
    hashtags: "#ciencia #jirafas #animales #sueño #datoscuriosos",
    prompt: "Jirafa descansando brevemente en la sabana al amanecer, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },

  /* ========== LOTE 39 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "No tienes que estar bien todo el tiempo. Forzar la sonrisa cuando algo duele solo entierra lo que tarde o temprano vas a tener que sentir.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Critica la obligación de estar siempre bien. Compartible.",
    hashtags: "#psicologia #emociones #saludmental #autenticidad #bienestar",
    prompt: "Persona permitiéndose sentir sin máscaras, luz suave, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Validación emocional"]
  },
  {
    frase: "Puedes estar triste y agradecido a la vez. Las emociones no hacen turnos: a veces vienen todas juntas y está bien.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Normaliza emociones mezcladas. Guardable.",
    hashtags: "#psicologia #emociones #gratitud #saludmental #bienestar",
    prompt: "Persona sosteniendo a la vez una luz cálida y una sombra suave, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Validación emocional"]
  },
  {
    frase: "Sanar no siempre es dramático. A veces se ve como días normales en los que, sin notarlo, ya nada de aquello te quita el sueño.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra la sanación como normalidad recuperada. Compartible.",
    hashtags: "#psicologia #sanar #saludmental #bienestar #procesos",
    prompt: "Persona viviendo un día tranquilo y común con serenidad, estética conceptual cálida.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "No puedes razonar para salir de un sentimiento. Primero el cuerpo necesita calmarse; después la mente puede pensar claro.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Explica el orden cuerpo-mente al regular emociones. Guardable.",
    hashtags: "#psicologia #emociones #sistemanervioso #saludmental #bienestar",
    prompt: "Persona respirando para calmar el cuerpo antes de pensar, estética conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Regla de oro"]
  },
  {
    frase: "Sanar es, en gran parte, desaprender. Desaprender que tenías que ganarte el amor, callar para encajar y disculparte por sentir.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Define sanar como desaprender. Compartible.",
    hashtags: "#psicologia #sanar #crecimientopersonal #saludmental #amorpropio",
    prompt: "Persona soltando viejas creencias como hojas al viento, estética conceptual.",
    tecnicas: ["Reframe", "Lista implícita", "Cierre potente"]
  },
  {
    frase: "La paz llega cuando tu mente deja de discutir con la realidad. Aceptar lo que es no es rendirte: es dejar de pelear contigo.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Define la paz como fin de la resistencia. Guardable.",
    hashtags: "#psicologia #pazmental #aceptacion #saludmental #bienestar",
    prompt: "Persona en calma frente a un paisaje sereno, sin tensión, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "El cierre no te lo debe la otra persona: te lo das tú el día que decides dejar de tocar esa puerta.",
    emocion: "Esperanza", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Reencuadra el cierre como decisión propia. Compartible.",
    hashtags: "#relaciones #soltar #cierre #amorpropio #sanar",
    prompt: "Persona dándose la espalda a una puerta cerrada y avanzando, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "No puedes ser el traductor de alguien que no quiere escucharte. Donde no hay oídos, sobran tus explicaciones.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Confronta el esfuerzo de explicarse a quien no escucha. Debatible.",
    hashtags: "#relaciones #comunicacion #limites #parejas #frases",
    prompt: "Persona hablando ante alguien que se tapa los oídos, luz fría, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Gancho de debate"]
  },
  {
    frase: "El amor correcto se siente como alivio, no como ansiedad. Si tu cuerpo se tensa cada vez que aparecen, escúchalo.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Da una señal corporal de vínculo sano. Guardable.",
    hashtags: "#relaciones #amor #ansiedad #pazmental #parejas",
    prompt: "Persona relajándose al estar con alguien que le da calma, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Identificación"]
  },
  {
    frase: "Habla contigo como le hablarías a alguien por quien estás echando porras. Tu voz interna también moldea quién llegas a ser.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Promueve el diálogo interno amable. Guardable.",
    hashtags: "#autoestima #dialogointerno #amorpropio #saludmental #mentalidad",
    prompt: "Persona animándose a sí misma frente al espejo con cariño, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "El respeto propio es la forma más alta de amor propio. Puedes quererte mucho de palabra, pero se nota en lo que te permites y lo que no.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Conecta autorrespeto y límites. Compartible.",
    hashtags: "#autoestima #autorrespeto #limites #amorpropio #frases",
    prompt: "Persona poniendo un límite con dignidad y calma, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Cierre potente"]
  },
  {
    frase: "Puedes ser un trabajo en progreso y una obra maestra al mismo tiempo. Crecer no significa que ahora valgas menos.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Une crecimiento y valor presente. Guardable.",
    hashtags: "#autoestima #amorpropio #crecimiento #valor #bienestar",
    prompt: "Persona en proceso de crecer brillando con luz propia, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },

  /* ========== LOTE 40 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "La meta no es tener más dinero: es tener más libertad. El dinero es el medio, no el premio.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reorienta el objetivo financiero hacia la libertad. Compartible.",
    hashtags: "#dinero #libertadfinanciera #finanzas #mentalidad #vida",
    prompt: "Persona disfrutando libertad de tiempo gracias a sus finanzas, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Revisa las suscripciones que olvidaste cancelar. El dinero no se va en grandes gastos, sino en pequeñas fugas que ni recuerdas.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Consejo práctico sobre fugas de dinero. Accionable y guardable.",
    hashtags: "#finanzas #ahorro #suscripciones #dinero #habitos",
    prompt: "Lista de suscripciones olvidadas drenando una cuenta, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Llamado a la acción"]
  },
  {
    frase: "Gasta en recuerdos, no en impresionar a desconocidos. Nadie recuerda tu auto; tú recordarás los viajes toda la vida.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Prioriza experiencias sobre estatus. Compartible.",
    hashtags: "#dinero #experiencias #finanzas #felicidad #mentalidad",
    prompt: "Persona atesorando recuerdos de viaje frente a objetos de estatus olvidados, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Baja la barrera de entrada: que empezar tome diez segundos. Lo difícil casi nunca es hacerlo, sino arrancar.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza minimizar la fricción de inicio. Accionable y guardable.",
    hashtags: "#habitos #productividad #disciplina #mejora #rutina",
    prompt: "Persona iniciando un hábito en segundos gracias a la preparación, estética conceptual.",
    tecnicas: ["Regla práctica", "Reframe", "Antítesis"]
  },
  {
    frase: "Lo que se agenda, se hace. Una intención sin hora es solo un deseo flotando en tu cabeza.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Promueve agendar para concretar. Accionable y compartible.",
    hashtags: "#habitos #productividad #planificacion #disciplina #mejora",
    prompt: "Tarea con una hora asignada en un calendario claro, estética conceptual ordenada.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "La meta no es no fallar nunca: es volverte alguien que casi nunca falla dos veces seguidas. Ahí vive la verdadera constancia.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Reencuadra la constancia como recuperación rápida. Guardable.",
    hashtags: "#habitos #constancia #disciplina #mentalidad #mejora",
    prompt: "Persona retomando su rutina sin demora tras un tropiezo, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Cortar el contacto no es crueldad: a veces es la única forma de dejar de sangrar por la misma herida.",
    emocion: "Calma", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Valida el contacto cero como autocuidado. Guardable.",
    hashtags: "#narcisismo #relacionestoxicas #contactocero #saludmental #conciencia",
    prompt: "Persona cerrando con calma una puerta y cuidando su herida, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Llamarán 'fría' a tu calma porque perdieron el acceso a alterarte. Tu paz les molesta justo porque ya no pueden moverla.",
    emocion: "Orgullo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Reencuadra la crítica a tu nueva calma. Empoderador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #pazmental #limites #conciencia",
    prompt: "Persona serena e inalcanzable para quien antes la alteraba, estética conceptual.",
    tecnicas: ["Reframe", "Revelación", "Cierre potente"]
  },
  {
    frase: "Sanar después de la manipulación es, sobre todo, reaprender a confiar en ti. Volver a creerle a tu intuición es la verdadera salida.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Orienta la recuperación hacia la autoconfianza. Guardable.",
    hashtags: "#manipulacion #saludmental #autoconfianza #sanar #conciencia",
    prompt: "Persona reconectando con su intuición y su claridad, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Cierre potente", "Validación emocional"]
  },
  {
    frase: "Cómo reacciona alguien a tu límite te dice todo lo que necesitas saber. Quien te respeta lo acepta; quien te usaba, lo ataca.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Convierte los límites en una prueba reveladora. Compartible.",
    hashtags: "#limites #manipulacion #relaciones #saludmental #conciencia",
    prompt: "Persona poniendo un límite y observando dos reacciones opuestas, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },

  /* ========== LOTE 41 (Ciencia · espacio, cuerpo e historia) ========== */
  {
    frase: "Los astronautas crecen unos centímetros en el espacio: sin gravedad que la comprima, la columna se estira. La Tierra, literalmente, nos encoge.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato espacial curioso. Compartible.",
    hashtags: "#ciencia #espacio #astronautas #cuerpo #datoscuriosos",
    prompt: "Astronauta flotando estirado en la estación espacial, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "En la estación espacial ven amanecer unas 16 veces al día. Allá arriba, cada hora y media empieza un nuevo día.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato espacial con metáfora de nuevos comienzos. Compartible.",
    hashtags: "#ciencia #espacio #amanecer #astronomia #datoscuriosos",
    prompt: "Vista de varios amaneceres desde la órbita terrestre, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Tienes más de cinco sentidos: también percibes el equilibrio, la posición de tu cuerpo y la temperatura. Sientes más de lo que te enseñaron.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Desmonta el mito de los 5 sentidos. Educativo y guardable.",
    hashtags: "#ciencia #cuerpo #sentidos #cerebro #datoscuriosos",
    prompt: "Cuerpo humano con múltiples sentidos representados en luz, estética conceptual.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Reframe"]
  },
  {
    frase: "No puedes oler nada mientras duermes profundamente: por eso una alarma de humo te despierta con sonido, no con olor.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato curioso sobre el olfato y el sueño. Genera respuestas.",
    hashtags: "#ciencia #olfato #sueño #cuerpo #datoscuriosos",
    prompt: "Persona durmiendo mientras una alarma suena, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Los bebés nacen casi sin rótulas: son de cartílago y se endurecen con los años. Hasta los huesos llegan después, con tiempo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato anatómico curioso. Guardable.",
    hashtags: "#ciencia #cuerpo #bebes #huesos #datoscuriosos",
    prompt: "Ilustración tierna de un bebé con cartílago que se vuelve hueso, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "Respiras alrededor de 20.000 veces al día sin pensarlo. Tu cuerpo te mantiene vivo en automático mientras tú vives tu vida.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato corporal con giro de gratitud. Compartible.",
    hashtags: "#ciencia #cuerpo #respiracion #biologia #datoscuriosos",
    prompt: "Persona respirando con ondas suaves de aire visibles, estética conceptual serena.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Tu nariz puede distinguir hasta un billón de olores distintos. Tienes un detector de aromas más fino de lo que imaginas.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sensorial impresionante. Guardable.",
    hashtags: "#ciencia #olfato #cuerpo #sentidos #datoscuriosos",
    prompt: "Nariz percibiendo un abanico de aromas representados en color, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "La Universidad de Oxford es más antigua que el Imperio Azteca. La historia no siempre ocurrió en el orden que imaginas.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato histórico que descoloca la intuición. Debatible.",
    hashtags: "#ciencia #historia #datoscuriosos #tiempo #curiosidades",
    prompt: "Línea de tiempo comparando Oxford y el Imperio Azteca, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "La primera persona en programar una máquina fue una mujer, Ada Lovelace, casi un siglo antes de la primera computadora.",
    emocion: "Orgullo", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato histórico inspirador. Compartible.",
    hashtags: "#ciencia #historia #tecnologia #mujeres #datoscuriosos",
    prompt: "Retrato conceptual de una pionera de la computación con engranajes y código, estética elegante.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre potente"]
  },
  {
    frase: "Los polos magnéticos de la Tierra se mueven y, a lo largo de millones de años, hasta se han invertido. Lo que parece fijo, no lo es.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato geofísico fascinante con metáfora. Guardable.",
    hashtags: "#ciencia #planeta #magnetismo #geologia #datoscuriosos",
    prompt: "Campo magnético terrestre representado con líneas que se desplazan, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "La mayor parte del agua dulce del planeta está congelada en la Antártida. La reserva de la vida descansa en el lugar más frío.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato ambiental relevante. Compartible.",
    hashtags: "#ciencia #agua #antartida #planeta #datoscuriosos",
    prompt: "Inmensos glaciares de la Antártida bajo un cielo claro, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "El lugar más frío conocido del universo no es el espacio vacío: es una nebulosa donde un gas se enfría más que su entorno. Hay fríos que cuesta imaginar.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato cosmológico curioso. Guardable.",
    hashtags: "#ciencia #universo #frio #astronomia #datoscuriosos",
    prompt: "Nebulosa fría con tonos azulados profundos en el espacio, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },

  /* ========== LOTE 42 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Preocuparte sin parar es como rezar por lo que no quieres que pase. Tu mente ensaya el desastre y tu cuerpo lo vive como real.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra la preocupación con una metáfora potente. Compartible.",
    hashtags: "#psicologia #ansiedad #preocupacion #saludmental #mente",
    prompt: "Persona soltando un bucle de preocupación que se disuelve, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Tus emociones son información, no órdenes. Sentir miedo no significa que debas huir: significa que algo pide tu atención.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Distingue sentir de obedecer a la emoción. Guardable.",
    hashtags: "#psicologia #emociones #saludmental #inteligenciaemocional #bienestar",
    prompt: "Persona observando una emoción como un mensaje sin reaccionar de inmediato, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Dato revelador"]
  },
  {
    frase: "No tienes que ganar cada discusión para tener razón. A veces tu paz vale más que el último comentario.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Prioriza la paz sobre el ego de ganar. Compartible.",
    hashtags: "#psicologia #pazmental #ego #saludmental #madurez",
    prompt: "Persona retirándose serena de una discusión sin necesidad de ganar, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "No puedes odiarte para llegar a una mejor versión de ti. Nadie floreció a base de reproches: cámbiate desde el cariño, no desde el castigo.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Promueve el cambio desde la autocompasión. Guardable.",
    hashtags: "#psicologia #autocompasion #cambio #saludmental #amorpropio",
    prompt: "Persona cuidándose con paciencia mientras crece, luz cálida, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "Sanar es elegirte una y otra vez, sobre todo los días en que sería más fácil volver a lo conocido que te hacía daño.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Define sanar como elección repetida. Compartible.",
    hashtags: "#psicologia #sanar #amorpropio #saludmental #constancia",
    prompt: "Persona eligiendo su bienestar día tras día, camino de luz, estética conceptual.",
    tecnicas: ["Reframe", "Cierre potente", "Identificación"]
  },
  {
    frase: "Tu única tarea hoy puede ser tratarte un 1% más amable que ayer. La sanación también avanza en pasos diminutos.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Propone un avance mínimo y amable. Guardable.",
    hashtags: "#psicologia #autocompasion #saludmental #bienestar #amorpropio",
    prompt: "Persona dándose un pequeño gesto de cariño, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Regla práctica", "Cierre emocional"]
  },
  {
    frase: "Hay quien solo amará la versión de ti que le resulta cómoda. Tú no naciste para ser conveniente: naciste para ser tú.",
    emocion: "Orgullo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Confronta el amor condicionado a la conveniencia. Debatible.",
    hashtags: "#relaciones #autenticidad #amorpropio #limites #frases",
    prompt: "Persona mostrándose auténtica frente a quien solo quería su versión cómoda, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "No bajes tus estándares para subir su comodidad. Pedir respeto, claridad y constancia no es exigir demasiado: es exigir lo básico.",
    emocion: "Orgullo", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Defiende los estándares sanos en pareja. Compartible.",
    hashtags: "#relaciones #limites #amorpropio #parejas #frases",
    prompt: "Persona manteniendo su estándar con calma y firmeza, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "La constancia es el lenguaje del amor adulto. Las palabras bonitas emocionan; aparecer cada día es lo que de verdad sostiene.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Eleva la constancia sobre el discurso. Guardable.",
    hashtags: "#relaciones #amor #constancia #parejas #frases",
    prompt: "Persona presente y constante en los pequeños gestos diarios, luz cálida, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Deja de disculparte por ocupar espacio. Existir plenamente no le hace daño a nadie: solo incomoda a quien quería verte pequeño.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Empodera a ocupar el propio espacio. Compartible.",
    hashtags: "#autoestima #empoderamiento #amorpropio #autenticidad #frases",
    prompt: "Persona ocupando su espacio con seguridad y luz propia, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Tu valor no sube ni baja con la atención que alguien te da. Eres valioso en silencio, ignorado o aplaudido por igual.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Desliga el valor de la atención ajena. Guardable.",
    hashtags: "#autoestima #amorpropio #valor #limites #bienestar",
    prompt: "Persona con luz propia constante sin importar quién la mire, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Sé el amigo que necesitabas cuando estabas mal. Esa voz amable que esperabas de otros puede empezar a salir de ti.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Promueve la autoamistad. Compartible.",
    hashtags: "#autoestima #amorpropio #autocuidado #saludmental #bienestar",
    prompt: "Persona consolándose a sí misma con cariño, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Espejo emocional", "Cierre emocional"]
  },

  /* ========== LOTE 43 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Tu tasa de ahorro importa más que tu sueldo. No es cuánto ganas: es cuánto logras quedarte.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Resalta el ahorro sobre el ingreso. Educativo y guardable.",
    hashtags: "#finanzas #ahorro #dinero #mentalidad #educacionfinanciera",
    prompt: "Persona apartando una porción fija de su ingreso con constancia, estética conceptual.",
    tecnicas: ["Antítesis", "Dato revelador", "Reframe"]
  },
  {
    frase: "Evita endeudarte por cosas que pierden valor. Pagar intereses por algo que se devalúa es perder dos veces.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Consejo claro sobre deuda y depreciación. Compartible.",
    hashtags: "#finanzas #deudas #dinero #consumo #educacionfinanciera",
    prompt: "Objeto que se devalúa mientras la deuda por él crece, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Causa-efecto"]
  },
  {
    frase: "Que un buen mes no se convierta en un estilo de vida permanente. Lo extra de hoy puede ser tu tranquilidad de mañana.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Advierte contra inflar el estilo de vida. Guardable.",
    hashtags: "#finanzas #ahorro #dinero #mentalidad #habitos",
    prompt: "Persona guardando el excedente de un buen mes en vez de gastarlo, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "No necesitas motivación: necesitas una señal que no puedas ignorar. Pon el libro sobre la almohada y lo leerás esta noche.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza las señales visibles sobre la motivación. Accionable y guardable.",
    hashtags: "#habitos #productividad #señales #disciplina #mejora",
    prompt: "Libro sobre la almohada como recordatorio imposible de ignorar, estética conceptual.",
    tecnicas: ["Antítesis", "Regla práctica", "Reframe"]
  },
  {
    frase: "Para dejar un mal hábito, hazlo molesto de hacer. Si tienes que levantarte y buscarlo, la mitad de las veces ya no lo harás.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Aplica la fricción para cortar malos hábitos. Compartible.",
    hashtags: "#habitos #disciplina #productividad #mejora #friccion",
    prompt: "Mal hábito escondido y difícil de alcanzar a propósito, estética conceptual.",
    tecnicas: ["Regla práctica", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Mide una sola cosa y obsérvala cambiar. Lo que registras, mejora, porque por fin le prestas atención.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza el seguimiento de un solo indicador. Accionable y guardable.",
    hashtags: "#habitos #seguimiento #productividad #disciplina #mejora",
    prompt: "Gráfico simple de un solo dato mejorando con el tiempo, estética conceptual.",
    tecnicas: ["Regla práctica", "Causa-efecto", "Reframe"]
  },
  {
    frase: "Solo respetan el límite que no pueden cruzar. Por eso un 'no' sostenido vale más que mil 'por favor' ignorados.",
    emocion: "Orgullo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Refuerza sostener límites firmes. Genera debate.",
    hashtags: "#narcisismo #limites #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona sosteniendo un límite firme e infranqueable con calma, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "Tu calma deja al descubierto su caos. Cuando dejas de reaccionar, lo que parecía 'culpa tuya' se revela como su patrón.",
    emocion: "Orgullo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Reencuadra la calma como revelador del otro. Compartible.",
    hashtags: "#narcisismo #relacionestoxicas #pazmental #limites #conciencia",
    prompt: "Persona serena mientras el caos ajeno queda en evidencia, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Confundían tu paciencia con permiso. Aguantar de más no los hizo cambiar: solo les enseñó hasta dónde podían llegar.",
    emocion: "Enojo", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Señala el riesgo de la paciencia sin límites. Guardable.",
    hashtags: "#manipulacion #limites #relacionestoxicas #saludmental #conciencia",
    prompt: "Persona poniendo fin a una paciencia que fue malinterpretada, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Sanaste de verdad el día en que su opinión dejó de dirigir tu vida. La libertad empieza cuando su voz ya no es la más fuerte en tu cabeza.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Define la sanación como recuperar la voz propia. Compartible.",
    hashtags: "#manipulacion #saludmental #sanar #amorpropio #conciencia",
    prompt: "Persona caminando libre mientras una voz ajena se apaga, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Cierre potente", "Metáfora"]
  },

  /* ========== LOTE 44 (Ciencia · cosmos, naturaleza y cuerpo) ========== */
  {
    frase: "El hielo flota porque el agua, al congelarse, se expande. Si se hundiera, los lagos se helarían desde el fondo y la vida no habría sobrevivido.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato físico con implicación vital. Educativo y guardable.",
    hashtags: "#ciencia #agua #fisica #naturaleza #datoscuriosos",
    prompt: "Cubo de hielo flotando con vida acuática debajo, estética conceptual.",
    tecnicas: ["Dato revelador", "Causa-efecto", "Reframe"]
  },
  {
    frase: "Siempre vemos la misma cara de la Luna: gira sobre sí misma al mismo ritmo que orbita la Tierra. Hay cosas que solo te muestran un lado.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica el acoplamiento de marea con metáfora. Compartible.",
    hashtags: "#ciencia #luna #astronomia #universo #datoscuriosos",
    prompt: "La Luna mostrando siempre la misma cara a la Tierra, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "El olor a tierra mojada tiene nombre: petricor. Es un aroma que libera el suelo con la lluvia, y a casi todos nos calma.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sensorial entrañable. Compartible.",
    hashtags: "#ciencia #petricor #lluvia #naturaleza #datoscuriosos",
    prompt: "Lluvia cayendo sobre tierra seca liberando aroma, estética conceptual cálida.",
    tecnicas: ["Dato revelador", "Identificación", "Reframe"]
  },
  {
    frase: "Cada copo de nieve tiene una estructura única: jamás caen dos idénticos. Hasta lo más diminuto se da el lujo de ser irrepetible.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato natural con metáfora de singularidad. Guardable.",
    hashtags: "#ciencia #nieve #naturaleza #datoscuriosos #curiosidades",
    prompt: "Copos de nieve únicos vistos de cerca, estética conceptual delicada.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Los búhos pueden girar la cabeza unos 270 grados. Tienen huesos y vasos diseñados para mirar atrás sin hacerse daño.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato animal curioso. Genera respuestas.",
    hashtags: "#ciencia #buhos #animales #naturaleza #datoscuriosos",
    prompt: "Búho girando la cabeza con elegancia, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Los gatos no perciben lo dulce: les falta el receptor para ese sabor. No es que no les guste el postre, es que ni lo notan.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal curioso. Compartible.",
    hashtags: "#ciencia #gatos #animales #sabor #datoscuriosos",
    prompt: "Gato indiferente ante un postre, estética conceptual amigable.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Tus lágrimas de emoción tienen una composición distinta a las que sueltas al cortar cebolla. El cuerpo llora diferente cuando el alma habla.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato sobre los tipos de lágrimas. Curioso y guardable.",
    hashtags: "#ciencia #lagrimas #emociones #cuerpo #datoscuriosos",
    prompt: "Lágrima emocional capturando la luz frente a una de reflejo, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Una sonda construida por humanos ya salió del sistema solar, llevando un disco con sonidos de la Tierra. Mandamos un saludo al universo por si alguien escucha.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre las Voyager. Inspirador y compartible.",
    hashtags: "#ciencia #voyager #espacio #astronomia #datoscuriosos",
    prompt: "Sonda viajando por el espacio profundo con un disco dorado, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "La primera foto real de un agujero negro se logró en 2019, uniendo telescopios de todo el planeta. A veces ver lo invisible requiere que el mundo coopere.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato científico con metáfora de cooperación. Guardable.",
    hashtags: "#ciencia #agujeronegro #astronomia #cosmos #datoscuriosos",
    prompt: "Imagen conceptual de un agujero negro con su anillo de luz, estética cósmica.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "El Sol, dentro de miles de millones de años, se hinchará hasta volverse una estrella gigante. Hasta las estrellas tienen su final escrito.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato astronómico con tono reflexivo. Compartible.",
    hashtags: "#ciencia #sol #estrellas #astronomia #datoscuriosos",
    prompt: "Sol convertido en gigante roja en un futuro lejano, estética conceptual cósmica.",
    tecnicas: ["Dato revelador", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Los flamencos son rosados por lo que comen: nacen grises y se tiñen con su dieta. A veces el color que muestras viene de lo que consumes.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato animal con metáfora. Genera respuestas.",
    hashtags: "#ciencia #flamencos #animales #naturaleza #datoscuriosos",
    prompt: "Flamencos rosados elegantes en una laguna, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "Nuestra galaxia gira tan despacio para nosotros que una sola vuelta tarda cientos de millones de años. Vamos a toda velocidad sin sentir el movimiento.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato astronómico que da perspectiva. Guardable.",
    hashtags: "#ciencia #galaxia #universo #astronomia #datoscuriosos",
    prompt: "Vía Láctea girando lentamente en el cosmos, estética conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },

  /* ========== LOTE 45 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Deja de repetir conversaciones que ya terminaron. Tu mente las revive una y otra vez, pero la otra persona hace rato siguió con su día.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Confronta la rumiación de conversaciones. Compartible.",
    hashtags: "#psicologia #overthinking #saludmental #pazmental #mente",
    prompt: "Persona soltando una conversación en bucle que se desvanece, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "No le debes acceso a tu vida a todo el mundo. Poner una puerta con cerradura no te hace cerrado: te hace dueño de tu espacio.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra los límites como propiedad del propio espacio. Guardable.",
    hashtags: "#psicologia #limites #amorpropio #saludmental #bienestar",
    prompt: "Persona con una puerta propia que abre y cierra a voluntad, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Regla de oro"]
  },
  {
    frase: "Tus sentimientos son válidos, aunque la historia que te cuentas sobre ellos no siempre lo sea. Sentir es real; interpretar puede engañarte.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Distingue emoción de interpretación. Compartible.",
    hashtags: "#psicologia #emociones #pensamiento #saludmental #bienestar",
    prompt: "Emoción real junto a una historia mental que la distorsiona, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Validación emocional"]
  },
  {
    frase: "Protege tu mañana y protegerás tu día. Los primeros minutos sin pantallas ni prisa le dan a tu mente un punto de partida en calma.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Conecta rutina matutina y bienestar mental. Guardable.",
    hashtags: "#psicologia #rutina #mañana #bienestar #saludmental",
    prompt: "Amanecer tranquilo con una rutina serena sin pantallas, estética conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla práctica"]
  },
  {
    frase: "Puedes ser tú la razón de tu propia calma. No siempre llega alguien a rescatarte: a veces el rescate eres tú aprendiendo a sostenerte.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Promueve la autocontención. Compartible.",
    hashtags: "#psicologia #amorpropio #autocuidado #saludmental #fortaleza",
    prompt: "Persona sosteniéndose a sí misma con firmeza y calma, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Lo que te drena no siempre es obvio. A veces no es el trabajo, sino la culpa; no es el día, sino la conversación que no tuviste.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Invita a identificar drenajes ocultos de energía. Guardable.",
    hashtags: "#psicologia #energia #saludmental #autoconciencia #bienestar",
    prompt: "Persona descubriendo la fuente real de su cansancio, estética conceptual.",
    tecnicas: ["Reframe", "Revelación", "Causa-efecto"]
  },
  {
    frase: "Extrañar a alguien no es razón suficiente para volver. Puedes echar de menos justo lo que sabes que no te hacía bien.",
    emocion: "Tristeza", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Separa extrañar de regresar. Genera debate.",
    hashtags: "#relaciones #desamor #soltar #amorpropio #frases",
    prompt: "Persona recordando con nostalgia pero eligiendo no volver, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Gancho de debate"]
  },
  {
    frase: "La paz es la nueva chispa. Cuando maduras, ya no buscas que te aceleren el pulso: buscas a quien te lo calme.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Eleva la calma sobre la intensidad. Compartible.",
    hashtags: "#relaciones #amor #pazmental #madurez #parejas",
    prompt: "Persona en calma junto a alguien que le transmite serenidad, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Elige a quien te elige de vuelta. Dejar de perseguir a quien duda es hacerle espacio a quien te tiene claro.",
    emocion: "Orgullo", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Promueve la reciprocidad en la elección. Guardable.",
    hashtags: "#relaciones #amorpropio #reciprocidad #limites #frases",
    prompt: "Persona caminando hacia quien la elige con seguridad, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Tu sensibilidad no es debilidad. Sentir profundo es una forma de inteligencia que el mundo apenas está aprendiendo a valorar.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Revaloriza la sensibilidad. Compartible.",
    hashtags: "#autoestima #sensibilidad #amorpropio #autenticidad #frases",
    prompt: "Persona sensible y fuerte a la vez bajo luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Deja de esperar que te elijan: elígete tú. Quien aprende a quedarse consigo nunca se queda realmente solo.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Promueve elegirse a uno mismo. Guardable.",
    hashtags: "#autoestima #amorpropio #autenticidad #valor #frases",
    prompt: "Persona eligiéndose a sí misma con firmeza y calma, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "La confianza no nace, se construye. Cada vez que te atreves a pesar del miedo, le pones un ladrillo más a tu seguridad.",
    emocion: "Esperanza", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Reencuadra la confianza como construcción. Compartible.",
    hashtags: "#autoestima #confianza #crecimiento #mentalidad #fortaleza",
    prompt: "Persona construyendo su confianza ladrillo a ladrillo, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Causa-efecto"]
  },

  /* ========== LOTE 46 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Mide tu patrimonio, no tu sueldo. Ganar mucho y no quedarte con nada es solo correr más rápido en el mismo sitio.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Reorienta el foco hacia el patrimonio. Educativo y guardable.",
    hashtags: "#finanzas #patrimonio #dinero #ahorro #mentalidad",
    prompt: "Persona midiendo lo que conserva, no solo lo que entra, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Metáfora"]
  },
  {
    frase: "Una meta de dinero necesita una cifra y una fecha. 'Quiero ahorrar más' no es un plan: es un deseo sin forma.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Da estructura a las metas financieras. Accionable y compartible.",
    hashtags: "#finanzas #metas #ahorro #dinero #planificacion",
    prompt: "Meta financiera con un número y una fecha claros, estética conceptual ordenada.",
    tecnicas: ["Antítesis", "Regla práctica", "Reframe"]
  },
  {
    frase: "La riqueza se construye en el espacio entre lo que ganas y lo que gastas. Si ese espacio es cero, el sueldo no importa.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Explica la brecha ingreso-gasto. Educativo y guardable.",
    hashtags: "#finanzas #ahorro #dinero #mentalidad #educacionfinanciera",
    prompt: "Brecha entre ingreso y gasto representada como espacio de crecimiento, conceptual.",
    tecnicas: ["Reframe", "Dato revelador", "Causa-efecto"]
  },
  {
    frase: "Pregúntate: ¿qué haría hoy la persona que quiero llegar a ser? Y haz eso, aunque sea en pequeño.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Hábitos basados en identidad. Accionable y compartible.",
    hashtags: "#habitos #identidad #disciplina #mentalidad #crecimiento",
    prompt: "Persona actuando hoy como su mejor versión futura, estética conceptual.",
    tecnicas: ["Reframe", "Llamado a la acción", "Cierre potente"]
  },
  {
    frase: "Que empezar sea tan pequeño que parezca ridículo, y repítelo tanto que se vuelva real. Lo diminuto sostenido es imparable.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza el inicio mínimo y la repetición. Guardable.",
    hashtags: "#habitos #constancia #disciplina #mejora #productividad",
    prompt: "Acción mínima repetida que se vuelve un gran cambio, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Regla práctica"]
  },
  {
    frase: "Acompaña la disciplina con amabilidad. Exigirte sin cariño se rompe rápido; cuidarte mientras te esfuerzas dura toda la vida.",
    emocion: "Calma", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Une disciplina y autocompasión. Compartible.",
    hashtags: "#habitos #disciplina #autocompasion #bienestar #mentalidad",
    prompt: "Persona esforzándose con cariño hacia sí misma, luz cálida, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "'Siento que te sientas así' no es una disculpa: es esquivar la responsabilidad con cara de buena persona.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Desenmascara la falsa disculpa. Genera debate.",
    hashtags: "#narcisismo #disculpas #manipulacion #limites #conciencia",
    prompt: "Disculpa vacía que esquiva la responsabilidad, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Gancho de debate"]
  },
  {
    frase: "Te mantenían dudando para que siguieras dependiendo. Cuando recuperas la certeza de lo que vales, pierden su poder sobre ti.",
    emocion: "Esperanza", nicho: "Narcisismo", objetivo: "Guardados",
    descripcion: "Explica la duda inducida y su salida. Guardable.",
    hashtags: "#narcisismo #relacionestoxicas #autoestima #saludmental #conciencia",
    prompt: "Persona recuperando su certeza y firmeza, luz creciente, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Cierre potente"]
  },
  {
    frase: "Lo más sano que hiciste fue dejar de explicarte ante quien solo buscaba munición. No todo merece tu versión de los hechos.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Empodera a dejar de justificarse ante quien manipula. Compartible.",
    hashtags: "#manipulacion #limites #pazmental #amorpropio #conciencia",
    prompt: "Persona guardando silencio sereno en vez de justificarse, estética conceptual.",
    tecnicas: ["Reframe", "Regla de oro", "Cierre potente"]
  },
  {
    frase: "Tu límite no es un ataque; la reacción de ellos es la respuesta. Quien te respeta lo entiende; quien te usaba, lo dramatiza.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Convierte la reacción al límite en información. Guardable.",
    hashtags: "#manipulacion #limites #relaciones #saludmental #conciencia",
    prompt: "Persona poniendo un límite con calma y observando la reacción, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Revelación"]
  },

  /* ========== LOTE 47 (Ciencia · naturaleza, luz y cuerpo) ========== */
  {
    frase: "El cielo es azul porque el aire dispersa más esa luz; al atardecer, el sol viaja más lejos y nos llegan los rojos. El color del día es pura física.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica por qué el cielo es azul y rojo el atardecer. Educativo y guardable.",
    hashtags: "#ciencia #luz #cielo #fisica #datoscuriosos",
    prompt: "Cielo pasando de azul a rojo al atardecer con haces de luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Causa-efecto", "Reframe"]
  },
  {
    frase: "Los arcoíris en realidad son círculos completos; desde el suelo solo vemos la mitad. A veces solo te falta el ángulo para ver el todo.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato óptico con metáfora de perspectiva. Compartible.",
    hashtags: "#ciencia #arcoiris #luz #naturaleza #datoscuriosos",
    prompt: "Arcoíris circular completo visto desde el aire, estética conceptual luminosa.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "El ornitorrinco pone huevos, tiene pico y es venenoso. La naturaleza no leyó el manual de cómo debían ser las cosas.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato biológico curioso. Genera respuestas.",
    hashtags: "#ciencia #ornitorrinco #animales #naturaleza #datoscuriosos",
    prompt: "Ornitorrinco nadando en un río, estética conceptual amigable.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Las serpientes 'huelen' con la lengua: recogen partículas del aire y las llevan a un órgano especial. Cada especie percibe el mundo a su manera.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato biológico curioso. Guardable.",
    hashtags: "#ciencia #serpientes #animales #biologia #datoscuriosos",
    prompt: "Serpiente sacando la lengua para percibir el aire, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Tu cerebro no siente dolor: no tiene receptores para eso. Puede procesar todo el sufrimiento del cuerpo sin doler él mismo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato neurológico fascinante. Genera asombro y debate.",
    hashtags: "#ciencia #cerebro #dolor #neurociencia #datoscuriosos",
    prompt: "Cerebro procesando señales de dolor sin sentirlo, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "Los koalas duermen hasta 22 horas al día: sus hojas dan tan poca energía que ahorrar es sobrevivir. No todo descanso es pereza.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal con metáfora del descanso. Compartible.",
    hashtags: "#ciencia #koalas #animales #sueño #datoscuriosos",
    prompt: "Koala durmiendo plácidamente en un árbol, estética conceptual tierna.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "El trueno es el sonido del aire calentándose de golpe por el rayo. Primero ves la luz y luego la oyes, porque la luz va más rápido.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Explica el trueno y el desfase con el rayo. Educativo y guardable.",
    hashtags: "#ciencia #trueno #rayos #fisica #datoscuriosos",
    prompt: "Rayo iluminando el cielo seguido de ondas de sonido, estética conceptual.",
    tecnicas: ["Dato revelador", "Causa-efecto", "Curiosity Gap"]
  },
  {
    frase: "El plancton del mar puede brillar de noche cuando lo agitan. Hay vida tan pequeña que ilumina el océano entero.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato de bioluminiscencia con metáfora. Compartible.",
    hashtags: "#ciencia #bioluminiscencia #oceano #naturaleza #datoscuriosos",
    prompt: "Costa nocturna con plancton brillando en azul en las olas, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Las estrellas de mar no tienen cerebro y aun así sienten su entorno con todo el cuerpo. No hay una sola forma de percibir el mundo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato biológico curioso. Genera respuestas.",
    hashtags: "#ciencia #estrellademar #animales #biologia #datoscuriosos",
    prompt: "Estrella de mar en el fondo marino con luz suave, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "El pozo más profundo que cavó la humanidad llega a unos 12 kilómetros, y aún así apenas rasguñamos la corteza terrestre. Sabemos menos del suelo que del cielo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato geológico que da humildad. Guardable.",
    hashtags: "#ciencia #geologia #tierra #planeta #datoscuriosos",
    prompt: "Sección de la Tierra mostrando lo poco perforado frente a su tamaño, conceptual.",
    tecnicas: ["Dato revelador", "Reframe", "Curiosity Gap"]
  },
  {
    frase: "El sonido viaja mucho más rápido en el agua que en el aire. Bajo el mar, una ballena puede 'hablar' a kilómetros de distancia.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato físico curioso. Compartible.",
    hashtags: "#ciencia #sonido #oceano #fisica #datoscuriosos",
    prompt: "Ondas de sonido viajando lejos bajo el océano entre ballenas, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Los camaleones no cambian de color solo para esconderse: también lo hacen según su ánimo y para comunicarse. Su piel habla por ellos.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Desmonta el mito del camuflaje del camaleón. Curioso y guardable.",
    hashtags: "#ciencia #camaleon #animales #naturaleza #datoscuriosos",
    prompt: "Camaleón cambiando de color expresando un estado, estética conceptual.",
    tecnicas: ["Mito vs verdad", "Dato revelador", "Reframe"]
  },

  /* ========== LOTE 48 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "La disculpa que nunca llegó no es una deuda que tengas que cobrarte a ti mismo. Puedes sanar sin que el otro reconozca el daño.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Libera de esperar la disculpa ajena. Compartible.",
    hashtags: "#psicologia #sanar #perdon #saludmental #pazmental",
    prompt: "Persona sanando sin esperar reconocimiento ajeno, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Los límites que no haces cumplir son solo sugerencias. Decir 'no' una vez y ceder a la tercera le enseña al otro que tu límite es negociable.",
    emocion: "Sorpresa", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Subraya la importancia de sostener límites. Guardable.",
    hashtags: "#psicologia #limites #amorpropio #saludmental #conciencia",
    prompt: "Persona sosteniendo un límite con firmeza tranquila, estética conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Antítesis"]
  },
  {
    frase: "Tu paz no está en negociación. No la cambies por una compañía que te cuesta más de lo que te da.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Eleva la paz como innegociable. Compartible.",
    hashtags: "#psicologia #pazmental #limites #amorpropio #bienestar",
    prompt: "Persona protegiendo su calma como un tesoro, luz cálida, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "A veces crecer se siente como soledad antes de sentirse como libertad. Soltar lo que ya no encaja deja un silencio que después se vuelve paz.",
    emocion: "Tristeza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Valida la soledad del crecimiento. Guardable.",
    hashtags: "#psicologia #crecimiento #soledad #saludmental #libertad",
    prompt: "Persona en un espacio tranquilo tras soltar, luz que va creciendo, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Puedes perdonar y aun así quedarte con la lección. Perdonar no es borrar lo aprendido: es soltar el peso sin tirar la sabiduría.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Matiza el perdón con aprendizaje. Compartible.",
    hashtags: "#psicologia #perdon #aprendizaje #saludmental #bienestar",
    prompt: "Persona soltando un peso pero guardando una llave de sabiduría, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "No encojas tus sueños para que quepan en la comodidad de otros. Quien te quiere bien no te pide ser menos para que ellos estén tranquilos.",
    emocion: "Orgullo", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Empodera a no reducir las propias metas. Guardable.",
    hashtags: "#psicologia #sueños #autenticidad #amorpropio #mentalidad",
    prompt: "Persona dejando crecer sus sueños sin recortarlos, luz amplia, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Si su silencio se siente como un castigo, eso no es amor: el amor no usa la ausencia para controlarte.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Señala el silencio como castigo. Genera debate.",
    hashtags: "#relaciones #limites #leydelhielo #parejas #conciencia",
    prompt: "Persona herida por un silencio usado como castigo, luz fría, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "El amor lento es amor real; el que llega como huracán los primeros días suele ser una bandera roja, no una señal.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Distingue amor sano de love bombing. Guardable.",
    hashtags: "#relaciones #amor #lovebombing #parejas #conciencia",
    prompt: "Relación creciendo con calma frente a una intensidad abrumadora, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre emocional"]
  },
  {
    frase: "La distancia revela prioridades. Quien quiere estar, encuentra la forma; quien no, encuentra el kilómetro como excusa.",
    emocion: "Sorpresa", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "La distancia como prueba de prioridad. Identificación.",
    hashtags: "#relaciones #amor #prioridades #esfuerzo #frases",
    prompt: "Dos caminos: uno que acorta la distancia y otro que la usa de excusa, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Brevedad"]
  },
  {
    frase: "Tu valor no es un proyecto grupal: deja de esperar los votos de los demás para sentirte suficiente.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Desliga el valor de la aprobación grupal. Guardable.",
    hashtags: "#autoestima #amorpropio #valor #validacion #frases",
    prompt: "Persona segura sin esperar la aprobación de un grupo, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "Puedes decepcionar a alguien y seguir siendo buena persona. No fuiste puesto en el mundo para cumplir las expectativas de todos.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Libera de la culpa por decepcionar. Compartible.",
    hashtags: "#autoestima #limites #amorpropio #culpa #bienestar",
    prompt: "Persona en paz tras decepcionar expectativas ajenas con dignidad, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Tu suavidad sobrevivió a todo lo que intentó endurecerte. Seguir sintiendo después de tanto no es debilidad: es valentía.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Revaloriza la ternura que resistió. Guardable.",
    hashtags: "#autoestima #sensibilidad #fortaleza #amorpropio #frases",
    prompt: "Persona que conserva su ternura pese a las heridas, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },

  /* ========== LOTE 49 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "Tu mayor activo eres tú. Invertir en tu salud y tus habilidades rinde más que cualquier acción del mercado.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Posiciona al individuo como mejor inversión. Compartible.",
    hashtags: "#dinero #inversion #crecimiento #salud #mentalidad",
    prompt: "Persona invirtiendo en su salud y aprendizaje con resultados crecientes, conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "La paciencia es el interés que más rinde. En el dinero y en la vida, los frutos llegan a quien sabe esperar sin dejar de sembrar.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Conecta paciencia y rendimiento. Guardable.",
    hashtags: "#dinero #inversion #paciencia #finanzas #mentalidad",
    prompt: "Árbol creciendo con paciencia hasta dar frutos, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre emocional"]
  },
  {
    frase: "Gasta según tus valores, no según los likes. La aprobación de desconocidos es el lujo más caro y más inútil que existe.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Comentarios",
    descripcion: "Confronta el gasto por aprobación social. Genera debate.",
    hashtags: "#dinero #finanzas #valores #consumo #mentalidad",
    prompt: "Persona gastando alineada a sus valores e ignorando la aprobación ajena, conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Gancho de debate"]
  },
  {
    frase: "No cuentes los días: haz que los días cuenten. Un hábito vale por lo que construye, no por cuántas veces lo marcaste.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Reorienta el foco de los hábitos al sentido. Compartible.",
    hashtags: "#habitos #constancia #proposito #disciplina #mentalidad",
    prompt: "Persona dando sentido a cada día de su rutina, luz cálida, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "El hábito se vuelve fácil cuando se vuelve identidad. Ya no 'haces ejercicio': eres alguien que se mueve, y eso ya no se discute.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Une hábito e identidad. Guardable.",
    hashtags: "#habitos #identidad #disciplina #mentalidad #crecimiento",
    prompt: "Persona viviendo su hábito como parte de quién es, estética conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Cierre emocional"]
  },
  {
    frase: "Lo que repites en privado se nota en público. La disciplina de los días invisibles es la que un día todos terminan viendo.",
    emocion: "Orgullo", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Dignifica el esfuerzo invisible. Compartible.",
    hashtags: "#habitos #disciplina #constancia #esfuerzo #mentalidad",
    prompt: "Práctica privada y constante que brilla en público, estética conceptual.",
    tecnicas: ["Causa-efecto", "Reframe", "Cierre potente"]
  },
  {
    frase: "No cambiaron ellos: cambió tu tolerancia. Y cuando dejaste de aceptar lo inaceptable, todo el juego se vino abajo.",
    emocion: "Orgullo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Reencuadra el cambio en la propia tolerancia. Genera debate.",
    hashtags: "#narcisismo #relacionestoxicas #limites #saludmental #conciencia",
    prompt: "Persona subiendo su estándar y cambiando la dinámica, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "Te decían 'frío' cuando dejabas de tolerar lo intolerable. Poner límites no te volvió duro: te volvió libre.",
    emocion: "Orgullo", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Reencuadra la crítica al poner límites. Compartible.",
    hashtags: "#narcisismo #limites #relacionestoxicas #amorpropio #conciencia",
    prompt: "Persona libre y firme tras dejar de tolerar el daño, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "El día que dejaste de pedir perdón por existir, empezaste a vivir. Tu presencia nunca fue el problema.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Empodera tras la culpa inducida. Guardable.",
    hashtags: "#manipulacion #culpa #amorpropio #saludmental #conciencia",
    prompt: "Persona ocupando su lugar en el mundo sin disculparse, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Cierre potente", "Validación emocional"]
  },
  {
    frase: "Recuperar tu voz incomoda a quien se acostumbró a tu silencio. Que les moleste tu 'no' confirma cuánto les servía tu 'sí' automático.",
    emocion: "Orgullo", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Explica por qué molesta tu nueva voz. Compartible.",
    hashtags: "#manipulacion #limites #amorpropio #saludmental #conciencia",
    prompt: "Persona alzando la voz con calma ante quien esperaba su silencio, conceptual.",
    tecnicas: ["Reframe", "Revelación", "Cierre potente"]
  },

  /* ========== LOTE 50 (Ciencia · naturaleza, cuerpo y cosmos) ========== */
  {
    frase: "Los girasoles jóvenes siguen al sol durante el día y vuelven al este de noche para recibirlo al amanecer. Hasta las plantas buscan la luz.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato botánico con metáfora luminosa. Compartible.",
    hashtags: "#ciencia #girasoles #naturaleza #plantas #datoscuriosos",
    prompt: "Campo de girasoles girando hacia el sol naciente, estética conceptual cálida.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "El organismo vivo más grande del mundo no es una ballena: es un bosque de álamos conectados por una misma raíz. Lo que parece muchos, a veces es uno.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato biológico sorprendente con metáfora. Debatible.",
    hashtags: "#ciencia #naturaleza #arboles #biologia #datoscuriosos",
    prompt: "Bosque de álamos idénticos conectados bajo tierra, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Gancho de debate"]
  },
  {
    frase: "Los hongos están más emparentados con los animales que con las plantas. La vida tiene parentescos que rompen toda intuición.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato biológico curioso. Guardable.",
    hashtags: "#ciencia #hongos #biologia #naturaleza #datoscuriosos",
    prompt: "Hongos brillando en un bosque húmedo, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "En el Mar Muerto flotas sin esfuerzo: tiene tanta sal que el cuerpo no se hunde. Hay aguas que te sostienen aunque no sepas nadar.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato geográfico con metáfora. Compartible.",
    hashtags: "#ciencia #marmuerto #naturaleza #datoscuriosos #curiosidades",
    prompt: "Persona flotando sin esfuerzo en el Mar Muerto, estética conceptual serena.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "Las auroras son partículas del sol chocando con el campo magnético de la Tierra. El cielo se pinta de colores gracias a una tormenta invisible.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Explica las auroras. Bello y compartible.",
    hashtags: "#ciencia #aurora #espacio #naturaleza #datoscuriosos",
    prompt: "Aurora boreal danzando en un cielo nocturno polar, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Una sola abeja produce en toda su vida apenas una fracción de cucharadita de miel. Cada gota de dulzura es el trabajo de muchas vidas pequeñas.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato natural con metáfora del esfuerzo. Guardable.",
    hashtags: "#ciencia #abejas #miel #naturaleza #datoscuriosos",
    prompt: "Abeja trabajando en un panal dorado, estética conceptual cálida.",
    tecnicas: ["Dato revelador", "Metáfora", "Reframe"]
  },
  {
    frase: "El colmillo del narval es en realidad un diente que le creció hacia afuera, lleno de terminaciones sensibles. La naturaleza reinventa todo.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Comentarios",
    descripcion: "Dato animal curioso. Genera respuestas.",
    hashtags: "#ciencia #narval #animales #oceano #datoscuriosos",
    prompt: "Narval con su largo colmillo nadando en aguas árticas, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Gancho de debate"]
  },
  {
    frase: "El golpe del camarón mantis es tan rápido que crea una burbuja que estalla con luz y calor. La fuerza más brutal cabe en algo diminuto.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato animal impresionante. Compartible.",
    hashtags: "#ciencia #camaronmantis #animales #naturaleza #datoscuriosos",
    prompt: "Camarón mantis lanzando un golpe veloz bajo el agua, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Curiosity Gap"]
  },
  {
    frase: "El bambú puede crecer casi un metro en un solo día. Cuando las condiciones son las correctas, el crecimiento sorprende hasta a quien lo siembra.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato botánico con metáfora de crecimiento. Guardable.",
    hashtags: "#ciencia #bambu #naturaleza #crecimiento #datoscuriosos",
    prompt: "Bambú creciendo rápidamente hacia la luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "Las abejas se avisan dónde hay flores con una 'danza' que indica dirección y distancia. La naturaleza también tiene su forma de dar direcciones.",
    emocion: "Sorpresa", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato sobre el lenguaje de las abejas. Compartible.",
    hashtags: "#ciencia #abejas #naturaleza #comunicacion #datoscuriosos",
    prompt: "Abeja realizando su danza de comunicación en el panal, estética conceptual.",
    tecnicas: ["Dato revelador", "Curiosity Gap", "Reframe"]
  },
  {
    frase: "Tu corazón bombea miles de litros de sangre al día sin descansar ni un segundo. El músculo más leal de tu cuerpo no se toma vacaciones.",
    emocion: "Calma", nicho: "Ciencia", objetivo: "Guardados",
    descripcion: "Dato corporal con metáfora de lealtad. Guardable.",
    hashtags: "#ciencia #corazon #cuerpo #biologia #datoscuriosos",
    prompt: "Corazón bombeando sangre incansablemente con pulsos de luz, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "El desierto de Atacama tiene zonas donde no se registra lluvia en décadas, y aun así hay vida. Hasta en la sequía más extrema, algo persiste.",
    emocion: "Esperanza", nicho: "Ciencia", objetivo: "Compartidos",
    descripcion: "Dato geográfico con metáfora de resiliencia. Compartible.",
    hashtags: "#ciencia #atacama #naturaleza #resiliencia #datoscuriosos",
    prompt: "Pequeña vida brotando en el desierto más árido, estética conceptual.",
    tecnicas: ["Dato revelador", "Metáfora", "Cierre potente"]
  },

  /* ========== LOTE 51 (Psicología / Relaciones / Autoestima) ========== */
  {
    frase: "Algunas puertas se cierran para que dejes de tocar. No todo lo que termina es un castigo: a veces es una redirección.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra los finales como redirección. Compartible.",
    hashtags: "#psicologia #cambio #soltar #saludmental #crecimientopersonal",
    prompt: "Puerta cerrándose mientras otra se ilumina al lado, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre emocional"]
  },
  {
    frase: "La ansiedad es una alarma de humo, no siempre un incendio. Avisa por si acaso, pero no todo lo que la activa es una amenaza real.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Reencuadra la ansiedad como alarma. Guardable.",
    hashtags: "#psicologia #ansiedad #saludmental #emociones #bienestar",
    prompt: "Alarma sonando sin fuego real, persona respirando con calma, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Validación emocional"]
  },
  {
    frase: "Decir 'no' sin culpa es una habilidad, no un defecto de carácter. Se entrena, como cualquier músculo que nunca usaste.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Reencuadra poner límites como habilidad. Compartible.",
    hashtags: "#psicologia #limites #amorpropio #saludmental #bienestar",
    prompt: "Persona practicando decir 'no' con calma y firmeza, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Llamado a la acción"]
  },
  {
    frase: "La versión de ti que sobrevivió merece la versión de ti que florece. No cargues para siempre el modo supervivencia: ya puedes vivir.",
    emocion: "Esperanza", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Invita a pasar de sobrevivir a vivir. Guardable.",
    hashtags: "#psicologia #sanar #superacion #saludmental #crecimientopersonal",
    prompt: "Persona pasando de resistir a florecer bajo la luz, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Deja de cambiar la paz de hoy por la preocupación de un mañana que quizá ni llegue. Tu mente vive en el futuro y se pierde el presente.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Compartidos",
    descripcion: "Confronta la preocupación anticipada. Compartible.",
    hashtags: "#psicologia #ansiedad #presente #saludmental #bienestar",
    prompt: "Persona regresando del futuro imaginado al presente sereno, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla de oro"]
  },
  {
    frase: "Tienes permiso de tomar el camino largo para sanar. No hay premio por hacerlo rápido, solo por hacerlo de verdad.",
    emocion: "Calma", nicho: "Psicología", objetivo: "Guardados",
    descripcion: "Valida el ritmo propio de sanar. Guardable.",
    hashtags: "#psicologia #sanar #proceso #saludmental #bienestar",
    prompt: "Persona recorriendo con calma un camino largo hacia su bienestar, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "No puedes amar a alguien hasta que te trate bien. El cariño no enseña modales: o ya saben respetarte, o no lo harán por más que insistas.",
    emocion: "Enojo", nicho: "Relaciones", objetivo: "Comentarios",
    descripcion: "Confronta la idea de cambiar a alguien con amor. Debatible.",
    hashtags: "#relaciones #amorpropio #limites #parejas #verdades",
    prompt: "Persona dejando de intentar enseñar respeto a quien no quiere darlo, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "El amor correcto se siente como exhalar. Si a su lado vives conteniendo la respiración, tu cuerpo ya te está dando la respuesta.",
    emocion: "Calma", nicho: "Relaciones", objetivo: "Guardados",
    descripcion: "Da una señal corporal de vínculo sano. Guardable.",
    hashtags: "#relaciones #amor #pazmental #parejas #bienestar",
    prompt: "Persona exhalando en calma junto a alguien que la relaja, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Identificación"]
  },
  {
    frase: "No aceptes migajas cuando tienes hambre de un banquete. Conformarte con lo mínimo solo le confirma al otro que con poco basta.",
    emocion: "Orgullo", nicho: "Relaciones", objetivo: "Compartidos",
    descripcion: "Confronta conformarse con poco afecto. Compartible.",
    hashtags: "#relaciones #amorpropio #limites #merecer #frases",
    prompt: "Persona rechazando migajas y esperando lo que merece, estética conceptual.",
    tecnicas: ["Metáfora", "Reframe", "Cierre potente"]
  },
  {
    frase: "Tu valor nunca estuvo en venta, así que deja de rebajarlo para que alguien lo compre. Lo que se regala por miedo, no se valora.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Defiende no rebajarse por miedo. Guardable.",
    hashtags: "#autoestima #amorpropio #valor #limites #frases",
    prompt: "Persona manteniendo su valor firme sin rebajarse, estética conceptual.",
    tecnicas: ["Reframe", "Metáfora", "Cierre potente"]
  },
  {
    frase: "No tienes que caer bien para que te respeten. El respeto se gana con límites claros, no con sonrisas que esconden tu incomodidad.",
    emocion: "Orgullo", nicho: "Autoestima", objetivo: "Compartidos",
    descripcion: "Distingue agradar de ser respetado. Compartible.",
    hashtags: "#autoestima #respeto #limites #amorpropio #frases",
    prompt: "Persona respetada por su firmeza, no por complacer, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Cierre potente"]
  },
  {
    frase: "Haz las paces con el espejo. Esa persona que te mira ha cargado contigo cada día: merece tu cariño, no tu juicio.",
    emocion: "Calma", nicho: "Autoestima", objetivo: "Guardados",
    descripcion: "Promueve la reconciliación con uno mismo. Guardable.",
    hashtags: "#autoestima #amorpropio #autocompasion #saludmental #bienestar",
    prompt: "Persona mirándose al espejo con cariño y aceptación, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Espejo emocional", "Cierre emocional"]
  },

  /* ========== LOTE 52 (Dinero / Hábitos / Narcisismo / Manipulación) ========== */
  {
    frase: "El sueldo entra; tus hábitos deciden si se queda. Por eso hay quien gana poco y prospera, y quien gana mucho y nunca tiene.",
    emocion: "Sorpresa", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Resalta los hábitos sobre el ingreso. Compartible.",
    hashtags: "#finanzas #dinero #habitos #ahorro #mentalidad",
    prompt: "Dinero entrando y quedándose según los hábitos de la persona, estética conceptual.",
    tecnicas: ["Antítesis", "Reframe", "Causa-efecto"]
  },
  {
    frase: "Compárate solo con tu yo del mes pasado. Esa es la única carrera en la que ganar de verdad te hace mejor.",
    emocion: "Esperanza", nicho: "Dinero", objetivo: "Guardados",
    descripcion: "Reorienta la comparación hacia uno mismo. Guardable.",
    hashtags: "#finanzas #dinero #progreso #mentalidad #comparacion",
    prompt: "Persona midiendo su avance frente a su versión anterior, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "Una deuda evitada es dinero ganado sin esfuerzo. A veces la mejor inversión es no comprar lo que no necesitas.",
    emocion: "Calma", nicho: "Dinero", objetivo: "Compartidos",
    descripcion: "Reencuadra evitar deuda como ganancia. Compartible.",
    hashtags: "#finanzas #deudas #ahorro #dinero #mentalidad",
    prompt: "Persona evitando una compra innecesaria y sintiéndose en paz, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre emocional"]
  },
  {
    frase: "Hazlo a la misma hora y dejarás de negociar contigo cada día. La constancia ahorra la energía que pierdes en decidir.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Refuerza la rutina fija contra la fatiga de decisión. Guardable.",
    hashtags: "#habitos #rutina #disciplina #productividad #mejora",
    prompt: "Persona haciendo su hábito a la misma hora sin dudarlo, estética conceptual.",
    tecnicas: ["Reframe", "Causa-efecto", "Regla práctica"]
  },
  {
    frase: "Cambia 'tengo que' por 'elijo'. La misma acción pesa la mitad cuando dejas de vivirla como obligación.",
    emocion: "Esperanza", nicho: "Hábitos", objetivo: "Compartidos",
    descripcion: "Reencuadra el lenguaje de la disciplina. Compartible.",
    hashtags: "#habitos #disciplina #lenguaje #mentalidad #mejora",
    prompt: "Dos versiones de una acción, una pesada y otra ligera por la actitud, conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Regla práctica"]
  },
  {
    frase: "Un mal día no borra un buen mes. No tires toda la constancia por un tropiezo: la próxima decisión es la que cuenta.",
    emocion: "Calma", nicho: "Hábitos", objetivo: "Guardados",
    descripcion: "Promueve no abandonar tras un fallo. Guardable.",
    hashtags: "#habitos #constancia #autocompasion #disciplina #mejora",
    prompt: "Persona retomando su rutina tras un tropiezo sin rendirse, estética conceptual.",
    tecnicas: ["Reframe", "Antítesis", "Cierre potente"]
  },
  {
    frase: "Te revisaban el teléfono y lo llamaban amor. El amor no necesita espías: la desconfianza disfrazada de cariño sigue siendo control.",
    emocion: "Enojo", nicho: "Narcisismo", objetivo: "Comentarios",
    descripcion: "Desenmascara la vigilancia como control. Genera debate.",
    hashtags: "#narcisismo #relacionestoxicas #control #limites #conciencia",
    prompt: "Persona vigilada bajo el disfraz de 'preocupación', luz fría, estética conceptual.",
    tecnicas: ["Revelación", "Antítesis", "Gancho de debate"]
  },
  {
    frase: "Te hacían sentir afortunado por recibir un trato básico. Que alguien sea amable a ratos no es un premio: es lo mínimo.",
    emocion: "Sorpresa", nicho: "Narcisismo", objetivo: "Compartidos",
    descripcion: "Señala la normalización de lo mínimo. Revelador y compartible.",
    hashtags: "#narcisismo #relacionestoxicas #limites #amorpropio #conciencia",
    prompt: "Persona dándose cuenta de que el trato básico no era un favor, conceptual.",
    tecnicas: ["Revelación", "Reframe", "Antítesis"]
  },
  {
    frase: "Su 'cambio' duraba justo lo necesario para que te quedaras. La mejora no era real: era el anzuelo del mismo ciclo.",
    emocion: "Sorpresa", nicho: "Manipulación", objetivo: "Guardados",
    descripcion: "Describe el cambio temporal como táctica. Revelador y guardable.",
    hashtags: "#manipulacion #relacionestoxicas #cicloabuso #saludmental #conciencia",
    prompt: "Mejora breve que se desvanece apenas cumple su función, estética conceptual.",
    tecnicas: ["Revelación", "Reframe", "Open Loop"]
  },
  {
    frase: "Tu intuición intentó avisarte mucho antes de que entendieras. Aprender a confiar otra vez en esa voz interna es la verdadera sanación.",
    emocion: "Esperanza", nicho: "Manipulación", objetivo: "Compartidos",
    descripcion: "Reivindica la intuición tras la manipulación. Compartible.",
    hashtags: "#manipulacion #intuicion #saludmental #sanar #conciencia",
    prompt: "Persona reconectando con su voz interior y su intuición, luz cálida, conceptual.",
    tecnicas: ["Reframe", "Validación emocional", "Cierre potente"]
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
