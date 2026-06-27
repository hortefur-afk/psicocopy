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
