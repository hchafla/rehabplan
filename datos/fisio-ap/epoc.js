window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['epoc'] = {
  "id": "epoc",
  "nombre": "Respiratorio - Enfermedad Pulmonar Obstructiva Crónica (EPOC)",
  "fuente": "Protocolo de actuación SCS · EPOC (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Mejorar la calidad de vida de los usuarios, previniendo y restituyendo pérdidas en la función muscular."
    ],
    "especificos": [
      "Estabilizar la patología, con disminución del número y gravedad de las exacerbaciones.",
      "Prevenir, detectar y tratar las complicaciones e invalideces.",
      "Mejorar las condiciones de vida de los usuarios y la tolerancia al ejercicio.",
      "Aumentar la supervivencia.",
      "Promover el abandono del hábito tabáquico."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Diagnóstico de EPOC de Riesgo BAJO (Obstrucción ≥ 50% FEV1, disnea mMRC 0-1, ≤1 exacerbación sin ingreso en el último año) con Test CAT realizado.",
      "Capacidad para mantener una conversación adecuada.",
      "Sintomatología respiratoria (disnea, intolerancia al ejercicio o broncorrea) que condicione su calidad de vida según CAT.",
      "Aceptación, colaboración e interés del usuario para recibir información y participar en el plan terapéutico."
    ],
    "criteriosExclusion": [
      "Comorbilidades descompensadas que impidan o limiten la capacidad de participación.",
      "Trastornos de la conducta.",
      "Patología cardiovascular aguda o inestable que limite la realización de ejercicio físico.",
      "Falta de motivación o disponibilidad para participar en un programa de fisioterapia respiratoria."
    ],
    "sesionesMaximas": 10,
    "decisionInterconsulta": {
      "textoAceptado": "Cumple criterios de inclusión (EPOC Riesgo Bajo, mMRC 0-1, sin ingresos recientes). Se acepta el proceso.",
      "textoNoAceptado": "No cumple criterios de inclusión (Riesgo Alto / exacerbador) o presenta criterios de exclusión clínica/cardiovascular. No se acepta el proceso."
    }
  },
  "motivo": {
    "fuente": "editable",
    "notaFuente": "El protocolo no establece una fórmula concreta para este campo. Es una redacción editable, no un texto oficial del SCS.",
    "campos": [
      {
        "id": "motivo_centro",
        "tipo": "texto",
        "etiqueta": "Centro de salud",
        "ayuda": "Tu centro de salud. Se recuerda entre sesiones (no es un dato del paciente).",
        "persistirLocal": true
      },
      {
        "id": "motivo_diagnostico",
        "tipo": "texto",
        "etiqueta": "Diagnóstico (si consta en la derivación)",
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: EPOC Riesgo Bajo, fenotipo no exacerbador)."
      },
      {
        "id": "motivo_motivo",
        "tipo": "texto",
        "etiqueta": "Motivo de valoración (si no hay diagnóstico)",
        "ayuda": "Alternativa a \"Diagnóstico\": úsalo cuando la derivación no especifica un diagnóstico concreto."
      }
    ],
    "plantilla": {
      "campoCentro": "motivo_centro",
      "base": "Acceso a HC del paciente como fisioterapeuta",
      "fragmentoCentro": " del C.S. {valor}",
      "clausulas": [
        {
          "campo": "motivo_diagnostico",
          "texto": "tras derivación de MAP por diagnóstico de {valor}"
        },
        {
          "campo": "motivo_motivo",
          "texto": "tras derivación de MAP para valoración fisioterapéutica de {valor}"
        }
      ],
      "union": " ",
      "sufijo": "."
    }
  },
  "anamnesis": {
    "fuente": "Estructura y campos definidos a partir del protocolo SCS; la redacción generada no es un texto oficial",
    "secciones": [
      {
        "id": "historiaLesion",
        "titulo": "Historia de la enfermedad y síntomas respiratorios",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "epoc_inicio_evolucion",
            "tipo": "texto",
            "etiqueta": "Año de diagnóstico y evolución",
            "ayuda": "Años de evolución, estabilidad del cuadro respiratorio..."
          },
          {
            "id": "epoc_exacerbaciones",
            "tipo": "texto",
            "etiqueta": "Exacerbaciones e ingresos en el último año",
            "ayuda": "Confirmar ≤1 exacerbación sin ingreso hospitalario (Criterio de inclusión Riesgo Bajo)."
          },
          {
            "id": "epoc_habito_tabaquico",
            "tipo": "select",
            "etiqueta": "Hábito tabáquico",
            "opciones": [
              "No fumador / Nunca ha fumado",
              "Exfumador/a",
              "Fumador/a activo/a (indicar paquetes/año)"
            ]
          },
          {
            "id": "epoc_tratamiento_inhaladores",
            "tipo": "texto_area",
            "etiqueta": "Tratamiento farmacológico e inhaladores habituales",
            "ayuda": "Especificar fármacos (LAMA, LABA, CICS), dispositivo y valoración de la técnica inhalatoria."
          }
        ],
        "gruposNarrativos": [
          {
            "fragmentos": [
              {
                "campo": "epoc_inicio_evolucion",
                "texto": "Historia de EPOC: {valor}"
              },
              {
                "campo": "epoc_exacerbaciones",
                "texto": "Exacerbaciones en el último año: {valor}"
              }
            ],
            "union": ". ",
            "sufijo": "."
          },
          {
            "fragmentos": [
              {
                "campo": "epoc_habito_tabaquico",
                "texto": "Estado respecto al tabaco: {valor}"
              }
            ],
            "sufijo": "."
          },
          {
            "fragmentos": [
              {
                "campo": "epoc_tratamiento_inhaladores",
                "texto": "Tratamiento farmacológico e inhaladores habituales: {valor}"
              }
            ],
            "sufijo": "."
          }
        ]
      },
      {
        "id": "historiaDolor",
        "titulo": "Síntomas y Cuestionario CAT (ANEXO X)",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "sintomas_respiratorios",
            "tipo": "texto",
            "etiqueta": "Sintomatología predominante",
            "ayuda": "Disnea de esfuerzo, tos crónica, expectoración/broncorrea, fatiga precoz..."
          },
          {
            "id": "cat_score",
            "tipo": "numero",
            "etiqueta": "Puntuación total Cuestionario CAT (0-40)",
            "min": 0,
            "max": 40,
            "ayuda": "COPD Assessment Test (0-10 leve, 11-20 moderado, 21-30 alto, >30 muy alto impacto)."
          }
        ],
        "gruposNarrativos": [
          {
            "fragmentos": [
              {
                "campo": "sintomas_respiratorios",
                "texto": "Sintomatología clínica predominante: {valor}"
              }
            ],
            "sufijo": "."
          },
          {
            "fragmentos": [
              {
                "campo": "cat_score",
                "texto": "Puntuación del cuestionario de impacto CAT: {valor}/40 puntos"
              }
            ],
            "sufijo": "."
          }
        ]
      },
      {
        "id": "historiaLaboral",
        "titulo": "Historia laboral",
        "tipo": "checklist",
        "ayuda": "Marca las opciones que apliquen a su exposición laboral previa o actual.",
        "opciones": [
          {
            "id": "laboral_polvos_humos",
            "etiqueta": "Exposición a polvos, gases, vapores o humos industriales",
            "fraseTexto": "exposición profesional a polvos, gases o humos irritantes"
          },
          {
            "id": "laboral_esfuerzo_fisico",
            "etiqueta": "Trabajo de elevada exigencia física / carga",
            "fraseTexto": "esfuerzo físico intenso con demandas ventilatorias elevadas"
          },
          {
            "id": "laboral_sedentario",
            "etiqueta": "Trabajo sedentario / oficina",
            "fraseTexto": "actividad laboral sedentaria"
          },
          {
            "id": "laboral_no_trabaja",
            "etiqueta": "Desempleado/a o jubilado/a",
            "exclusivoConTodo": true,
            "fraseCompleta": "No consta actividad laboral activa (desempleado/a o jubilado/a)."
          }
        ],
        "otro": {
          "id": "laboral_otro",
          "etiqueta": "Otro"
        },
        "prefijoTexto": "Su historial laboral incluye ",
        "sufijoTexto": "."
      },
      {
        "id": "historiaSociofamiliar",
        "titulo": "Historia sociofamiliar / AVD",
        "tipo": "checklist",
        "ayuda": "Marca las actividades de la vida diaria limitadas por la disnea o la fatiga.",
        "opciones": [
          {
            "id": "avd_subir_escaleras",
            "etiqueta": "Subir escaleras o pendientes",
            "fraseTexto": "subir escaleras o cuestas por aparición de disnea"
          },
          {
            "id": "avd_marcha_llano",
            "etiqueta": "Caminar en llano al ritmo de personas de su edad",
            "fraseTexto": "mantener el ritmo de marcha en llano"
          },
          {
            "id": "avd_tareas_domesticas",
            "etiqueta": "Tareas domésticas / Cargar la compra",
            "fraseTexto": "tareas domésticas pesadas o transporte de compras"
          },
          {
            "id": "avd_aseo_vestido",
            "etiqueta": "Aseo personal / Vestirse",
            "fraseTexto": "actividades básicas como el aseo o vestirse en fases de fatiga"
          }
        ],
        "otro": {
          "id": "avd_otras",
          "etiqueta": "Otras"
        },
        "prefijoTexto": "En las actividades de la vida diaria, refiere limitación por síntoma respiratorio para ",
        "sufijoTexto": "."
      },
      {
        "id": "deporteOcio",
        "titulo": "Actividad deportiva / ocio",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "deporte_ocio",
            "tipo": "texto_area",
            "etiqueta": "Actividad deportiva / ocio",
            "ayuda": "Paseos diarios, ritmo de marcha, sedentarismo, aficiones al aire libre..."
          }
        ],
        "gruposNarrativos": [
          {
            "prefijo": "En cuanto a su actividad deportiva y de ocio, refiere ",
            "fragmentos": [
              {
                "campo": "deporte_ocio",
                "texto": "{valor}"
              }
            ],
            "sufijo": "."
          }
        ]
      },
      {
        "id": "comorbilidadesDescarte",
        "titulo": "Existencia de comorbilidades",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "comorbilidades",
            "tipo": "texto_area",
            "etiqueta": "Comorbilidades (Cardiopatías, Diabetes, Hipertensión, Ansiedad/Depresión...)",
            "ayuda": "Verificar ausencia de cardiopatía inestable o descompensaciones (Criterio de exclusión)."
          }
        ],
        "gruposNarrativos": [
          {
            "fragmentos": [
              {
                "campo": "comorbilidades",
                "texto": "Comorbilidades asociadas: {valor}"
              }
            ],
            "sufijo": "."
          }
        ]
      }
    ]
  },
  "exploracionFisica": {
    "fuente": "Estructura según protocolo SCS",
    "inspeccionPalpacion": {
      "titulo": "Datos Antropométricos y Valoración Respiratoria Básica",
      "campos": [
        {
          "id": "antropo_peso_talla_imc",
          "tipo": "texto",
          "etiqueta": "Peso, Talla e Índice de Masa Corporal (IMC)",
          "ayuda": "Ej.: Peso: 72 kg, Talla: 1.68 m, IMC: 25.5 kg/m² (evaluar desnutrición u obesidad)."
        },
        {
          "id": "insp_patron_respiratorio",
          "tipo": "select",
          "etiqueta": "Patrón respiratorio predominantemente",
          "opciones": [
            "Diafragmático / Abdominal normal",
            "Torácico superior / Apical",
            "Respiración con labios fruncidos",
            "Uso de musculatura accesoria (escalenos, esternocleidomastoideo)"
          ]
        },
        {
          "id": "insp_conformativa_torax",
          "tipo": "texto",
          "etiqueta": "Morfología torácica / Actitud postural",
          "ayuda": "Ej.: Tórax en tonel, cifosis dorsal, rectificación, elevación constante de cintura escapular..."
        },
        {
          "id": "insp_tos_expectoracion",
          "tipo": "select",
          "etiqueta": "Tos y características de la expectoración",
          "opciones": [
            "Sin tos habitual",
            "Tos seca no productiva",
            "Tos productiva con expectoración mucosa",
            "Tos productiva con expectoración purulenta / broncorrea"
          ]
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Examen de la movilidad articular torácica y general",
      "notaFuente": "Evaluación de la expansibilidad torácica y movilidad de cintura escapular/columna.",
      "movimientos": [
        {
          "id": "mov_expansión_toracica",
          "etiqueta": "Expansión torácica (amplitud cianométrica superior e inferior)",
          "categorias": [
            "No valorada",
            "Muy reducida (<2 cm)",
            "Ligeramente reducida (2-4 cm)",
            "Normal (>4 cm)"
          ]
        },
        {
          "id": "mov_cintura_escapular",
          "etiqueta": "Movilidad de hombros y cintura escapular",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_columna_dorsal",
          "etiqueta": "Movilidad de columna dorsal y caja torácica",
          "categorias": [
            "No valorada",
            "Rigidez marcada",
            "Ligera rigidez",
            "Sin limitación"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad o mecánica respiratoria",
        "ayuda": "Ej.: asimetría en la expansión de hemitórax, acortamiento de pectoral menor..."
      }
    },
    "balanceMuscular": {
      "titulo": "Examen del balance muscular periférico y respiratorio",
      "escala": [
        {
          "valor": "0",
          "descripcion": "Ausencia de contracción"
        },
        {
          "valor": "1",
          "descripcion": "Contracción visible o palpable sin movimiento"
        },
        {
          "valor": "2",
          "descripcion": "Movimiento completo con la gravedad eliminada"
        },
        {
          "valor": "3",
          "descripcion": "Movimiento completo contra la gravedad"
        },
        {
          "valor": "4",
          "descripcion": "Movimiento contra resistencia moderada"
        },
        {
          "valor": "5",
          "descripcion": "Fuerza muscular normal, movimiento contra resistencia máxima"
        }
      ],
      "movimientos": [
        {
          "id": "fuerza_cuadriceps_mmss",
          "etiqueta": "Musculatura de miembros inferiores (Cuádriceps / Tolerancia al esfuerzo)"
        },
        {
          "id": "fuerza_cintura_escapular",
          "etiqueta": "Musculatura de miembros superiores y fijadores escapulares"
        },
        {
          "id": "fuerza_musculatura_abdominal",
          "etiqueta": "Musculatura abdominal (efectividad en la tos)"
        }
      ]
    },
    "actitudPostural": {
      "titulo": "Actitud postural general",
      "campo": {
        "id": "actitud_postural",
        "tipo": "texto",
        "etiqueta": "Actitud postural general (proyección anterior de cabeza, cifosis dorsal, postura antiálgica o en trípode)"
      }
    },
    "testsEspecificos": {
      "titulo": "Pruebas diagnósticas y Escalas del Protocolo",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_espirometria",
          "nombre": "Resultados de la Espirometría (FEV1% y FEV1/FVC)",
          "estructura": "Grado de obstrucción al flujo aéreo",
          "ayuda": "Registrar valor de FEV1% posbroncodilatador (Riesgo Bajo exige FEV1 ≥ 50% del teórico) y cociente FEV1/FVC < 0.70."
        },
        {
          "id": "test_mmrc",
          "nombre": "Escala de Disnea mMRC (Medical Research Council Modificada) - ANEXO IX",
          "estructura": "Grado de disnea funcional (0 a 4)",
          "ayuda": "0: Disnea solo ante ejercicio intenso. 1: Disnea al andar deprisa en llano o subiendo una pendiente suave. (Grados 2, 3 y 4 se consideran disnea moderada-severa fuera de criterio bajo riesgo puro)."
        },
        {
          "id": "test_cat",
          "nombre": "Cuestionario CAT (COPD Assessment Test) - ANEXO X",
          "estructura": "Evaluación del impacto global de la EPOC",
          "ayuda": "8 ítems (tos, flemas, opresión, disnea al subir escaleras, limitaciones en casa, confianza para salir, sueño y energía). Puntuación total de 0 a 40."
        }
      ]
    }
  },
  "planActuacion": {
    "fuente": "editable",
    "recomendaciones": [
      {
        "id": "rec_scs",
        "texto": "Se entregan recomendaciones y guía educativa para la EPOC elaboradas por el SCS."
      },
      {
        "id": "rec_reeducacion_respiratoria",
        "texto": "Se adiestra en patrón respiratorio diafragmático, respiración con labios fruncidos y técnicas de drenaje de secreciones si presenta broncorrea."
      },
      {
        "id": "rec_ejercicio_tolerancia",
        "texto": "Se pauta programa de entrenamiento domiciliario a la tolerancia al ejercicio (caminata diaria, fortalecimiento de cuádriceps y MMSS)."
      },
      {
        "id": "rec_tecnica_inhalatoria",
        "texto": "Se revisa y optimiza la técnica de uso de los dispositivos inhaladores."
      },
      {
        "id": "rec_deshabituacion_tabaquica",
        "texto": "Se ofrece consejo breve y refuerzo educativo para el abandono del hábito tabáquico."
      }
    ],
    "tiposSesion": [
      "Individual",
      "Grupal",
      "Telefónica"
    ],
    "frasesPredefinidas": []
  }
};
