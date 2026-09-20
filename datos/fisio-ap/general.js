window.FISIOAP_GENERAL = {
  "criteriosDerivacionGenerales": {
    "fuente": "protocolo",
    "clinicosInclusion": [
      { "zona": "Hombro", "items": ["Tendinopatías del hombro"] },
      { "zona": "Codo", "items": ["Epicondilalgias"] },
      { "zona": "Rodilla", "items": ["Gonartrosis", "Síndrome de dolor fémoro-patelar", "Tendinitis rotuliana", "Tendinitis anserina o pata de ganso"] },
      { "zona": "Cadera", "items": ["Coxartrosis"] },
      { "zona": "Tobillo", "items": ["Esguince de tobillo"] },
      { "zona": "Pie", "items": ["Fascitis plantar"] },
      { "zona": "Algias vertebrales", "items": ["Cervicalgia", "Lumbalgia"] },
      { "zona": "EPOC", "items": [] }
    ],
    "criteriosExclusion": [
      "Población menor de 15 años.",
      "Cuando el nivel de riesgo del problema y/o la complejidad terapéutica excedan los criterios de inclusión de las patologías seleccionadas para derivación directa.",
      "Hallazgos clínicos en el paciente que hagan sospechar enfermedad sistémica o patología psicosocial grave (banderas rojas).",
      "Accidentes de tráfico, laborales o deportivos.",
      "Procesos quirúrgicos.",
      "Procesos que se encuentren abiertos por la misma causa en seguimiento por el Servicio de Rehabilitación o por otra especialidad.",
      "Procesos que estén en lista de espera para tratamiento de Fisioterapia.",
      "Haber sido dado de alta definitiva de dicho proceso por el Servicio de Rehabilitación.",
      "Procesos crónicos que ya hayan sido tratados en el último año en la Consulta de Fisioterapia.",
      "No aceptación del tratamiento por parte del paciente tras haber sido informado sobre las opciones terapéuticas disponibles para su patología.",
      "Problemas de salud asociados que contraindiquen el tratamiento.",
      "Toda patología que comprometa la independencia física y/o psíquica del paciente: dependencia moderada o severa según el Índice de Barthel (sobre todo en relación a la deambulación); puntuación por debajo de 24 puntos en el test de Mini-Mental State Examination de Folstein (MMSE)."
    ]
  },

  "gestionCita": {
    "notaFuente": "Depende de la organización de cada C.S., no del protocolo. La opción elegida se recuerda (no es un dato del paciente).",
    "campoOpcion": {
      "id": "inter_gestion_opcion",
      "tipo": "select",
      "etiqueta": "¿Cómo se gestiona la cita en tu centro?",
      "persistirLocal": true
    },
    "opciones": [
      {
        "id": "fisio_llama",
        "etiqueta": "Llamo yo mismo/a al paciente",
        "necesitaFechaHora": true,
        "texto": "Se llama al paciente para citar la valoración el día {fecha} a las {hora}."
      },
      {
        "id": "fisio_cita_admin_llama",
        "etiqueta": "Pongo la cita yo, administración llama al paciente",
        "necesitaFechaHora": true,
        "texto": "Se cita para valoración el día {fecha} a las {hora}; el personal administrativo se lo comunicará al paciente por teléfono."
      },
      {
        "id": "admin_todo",
        "etiqueta": "Administración pone la cita y llama al paciente",
        "necesitaFechaHora": false,
        "texto": "El personal administrativo citará al paciente para la valoración y le llamará para confirmarla."
      }
    ]
  },

  "sesionIndividual": {
    "notaFuente": "Estructura pensada para una nota de seguimiento rápida; no es un formulario oficial del SCS.",

    "motivo": {
      "campos": [
        { "id": "indiv_centro", "tipo": "texto", "etiqueta": "Centro de salud",
          "ayuda": "Tu centro de salud. Se recuerda entre sesiones (no es un dato del paciente).",
          "persistirLocal": true },
        { "id": "indiv_motivo_diagnostico", "tipo": "texto", "etiqueta": "Motivo / diagnóstico",
          "ayuda": "Motivo de la sesión o diagnóstico de base, en pocas palabras. Ej.: tendinopatía de hombro." }
      ],
      "plantilla": {
        "campoCentro": "indiv_centro",
        "base": "Sesión de seguimiento fisioterapéutico",
        "fragmentoCentro": " en el C.S. {valor}",
        "clausulas": [
          { "campo": "indiv_motivo_diagnostico", "texto": "por {valor}" }
        ],
        "union": " ",
        "sufijo": "."
      }
    },

    "anamnesis": {
      "campos": [
        { "id": "indiv_evolucion", "tipo": "opciones", "etiqueta": "Evolución", "opciones": ["Mejor", "Igual", "Peor"],
          "ayuda": "Evolución percibida respecto a la sesión anterior." },
        { "id": "indiv_dolor_actual", "tipo": "numero", "etiqueta": "Dolor actual (EVA 0-10)", "min": 0, "max": 10,
          "ayuda": "Escala de 0 (sin dolor) a 10 (el peor dolor imaginable)." },
        { "id": "indiv_cambios_relevantes", "tipo": "texto_area", "etiqueta": "Cambios relevantes desde la última sesión",
          "ayuda": "Cualquier cambio digno de mención que no quede recogido en los demás campos." },
        { "id": "indiv_adherencia", "tipo": "opciones", "etiqueta": "Adherencia a ejercicios/recomendaciones", "opciones": ["Sí", "Parcial", "No"],
          "ayuda": "¿Ha seguido las pautas dadas en la sesión anterior?" },
        { "id": "indiv_dificultades", "tipo": "opciones", "etiqueta": "Dificultades con los ejercicios",
          "opciones": ["Ninguna", "Dolor", "Dificultad técnica", "Falta de tiempo", "Otro"],
          "ayuda": "Motivo principal si no ha podido seguir bien los ejercicios." },
        { "id": "indiv_incidencias_sino", "tipo": "binario", "etiqueta": "Incidencias o síntomas nuevos",
          "ayuda": "¿Ha aparecido algo nuevo desde la última sesión?" },
        { "id": "indiv_incidencias_detalle", "tipo": "texto", "etiqueta": "Detalle de la incidencia (si aplica)",
          "ayuda": "Solo si has marcado \"Sí\" arriba." },
        { "id": "indiv_objetivo_demanda", "tipo": "texto", "etiqueta": "Objetivo o demanda actual del paciente",
          "ayuda": "Qué es lo que más le preocupa o pide el paciente en este momento." }
      ],
      "gruposNarrativos": [
        { "tipo": "mapaFrases", "campo": "indiv_evolucion", "frases": {
            "Mejor": "Refiere mejoría respecto a la sesión anterior, con disminución del dolor.",
            "Igual": "Refiere una situación similar a la sesión anterior, sin cambios significativos en el dolor.",
            "Peor": "Refiere empeoramiento respecto a la sesión anterior, con aumento del dolor."
          } },
        { "fragmentos": [ { "campo": "indiv_dolor_actual", "texto": "Dolor actual {valor}/10" } ], "sufijo": "." },
        { "fragmentos": [ { "campo": "indiv_cambios_relevantes", "texto": "{valor}" } ], "sufijo": "." },
        { "tipo": "mapaFrases", "campo": "indiv_adherencia", "frases": {
            "Sí": "Ha realizado los ejercicios pautados con buena adherencia.",
            "Parcial": "Ha realizado los ejercicios pautados con adherencia parcial.",
            "No": "No ha realizado los ejercicios pautados."
          } },
        { "tipo": "mapaFrases", "campo": "indiv_dificultades", "frases": {
            "Ninguna": "No refiere dificultades para realizar los ejercicios.",
            "Dolor": "Refiere dificultad para realizar los ejercicios pautados por incremento de la sintomatología.",
            "Dificultad técnica": "Refiere dificultad técnica para realizar correctamente los ejercicios pautados.",
            "Falta de tiempo": "Refiere no haber podido realizar los ejercicios pautados por falta de tiempo.",
            "Otro": "Refiere otras dificultades para realizar los ejercicios pautados."
          } },
        { "tipo": "binarioDetalle", "campo": "indiv_incidencias_sino", "campoDetalle": "indiv_incidencias_detalle",
          "textoNo": "No refiere incidencias ni aparición de nuevos síntomas.",
          "textoSiConDetalle": "Refiere aparición de nuevos síntomas o incidencias: {valor}.",
          "textoSiSinDetalle": "Refiere aparición de nuevos síntomas o incidencias." },
        { "fragmentos": [ { "campo": "indiv_objetivo_demanda", "texto": "Como objetivo o demanda actual, refiere {valor}" } ], "sufijo": "." }
      ]
    },

    "planActuacion": {
      "intervenciones": {
        "titulo": "Intervenciones realizadas",
        "opciones": [
          { "id": "indiv_int_manual", "etiqueta": "Terapia manual", "fraseTexto": "terapia manual" },
          { "id": "indiv_int_ejercicio", "etiqueta": "Ejercicio terapéutico", "fraseTexto": "ejercicio terapéutico" },
          { "id": "indiv_int_puncion", "etiqueta": "Punción seca", "fraseTexto": "punción seca" },
          { "id": "indiv_int_electro", "etiqueta": "Electroterapia", "fraseTexto": "electroterapia" },
          { "id": "indiv_int_termo", "etiqueta": "Termoterapia/crioterapia", "fraseTexto": "termoterapia/crioterapia" },
          { "id": "indiv_int_vendaje", "etiqueta": "Vendaje", "fraseTexto": "vendaje" },
          { "id": "indiv_int_educacion", "etiqueta": "Educación sanitaria", "fraseTexto": "educación sanitaria" }
        ],
        "otro": { "id": "indiv_int_otras", "etiqueta": "Otras" },
        "prefijoTexto": "En la sesión de hoy se ha realizado ",
        "sufijoTexto": "."
      },
      "respuesta": {
        "campo": { "id": "indiv_respuesta", "tipo": "opciones", "etiqueta": "Respuesta a la sesión",
          "opciones": ["Buena tolerancia", "Mejoría", "Sin cambios relevantes", "Mala tolerancia", "No valorable"] },
        "frases": {
          "Buena tolerancia": "El paciente ha mostrado buena tolerancia a la sesión.",
          "Mejoría": "Se objetiva mejoría tras la sesión.",
          "Sin cambios relevantes": "No se objetivan cambios relevantes tras la sesión.",
          "Mala tolerancia": "El paciente ha mostrado mala tolerancia a la sesión.",
          "No valorable": "La respuesta a la sesión no es valorable en este momento."
        }
      },
      "continuidad": {
        "campo": { "id": "indiv_continuidad", "tipo": "opciones", "etiqueta": "Continuidad",
          "opciones": ["Nueva sesión individual", "Continúa en sesiones grupales", "Finaliza seguimiento / Alta", "Otra"] },
        "frases": {
          "Nueva sesión individual": "Se programa nueva sesión individual.",
          "Continúa en sesiones grupales": "Continúa tratamiento en sesiones grupales.",
          "Finaliza seguimiento / Alta": "Finaliza el seguimiento fisioterapéutico. Alta.",
          "Otra": "Se decide otra actuación (ver notas)."
        }
      },
      "notasCampo": { "id": "indiv_plan_notas", "tipo": "texto_area", "etiqueta": "Otras indicaciones",
        "ayuda": "Cualquier matiz adicional sobre el plan que no encaje arriba." }
    }
  }
};
