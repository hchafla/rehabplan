window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['esguince-tobillo'] = {
  "id": "esguince-tobillo",
  "nombre": "Tobillo - Esguince de tobillo",
  "fuente": "Protocolo de actuación SCS · Esguince de tobillo (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Devolver al tobillo su funcionalidad, readaptando al paciente lo antes posible a la vida activa."
    ],
    "especificos": [
      "Disminuir el dolor.",
      "Reducir la inflamación.",
      "Mantener y mejorar la movilidad.",
      "Recuperar el tono, fuerza y potencia muscular: reequilibración muscular.",
      "Evitar las retracciones tendino-ligamentosas.",
      "Reeducar la estabilidad.",
      "Prevenir la discapacidad, conservando la independencia del usuario.",
      "Fomentar la responsabilidad del usuario en el autocuidado.",
      "Prevenir complicaciones y recidivas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Usuarios diagnosticados de esguinces grado I (distensión/elongación) y grado II (desgarro parcial).",
      "Usuarios con posibilidad de deambulación y autonomía en la marcha, hasta en los casos más graves.",
      "Aceptación y colaboración por parte del usuario del plan terapéutico a seguir."
    ],
    "criteriosExclusion": [
      "Esguinces grado III (desgarro completo / impotencia funcional severa).",
      "Pendientes de control radiológico (descarte de fractura / Reglas de Ottawa).",
      "Fracturas asociadas a los mismos.",
      "Síndrome de Dolor Regional Complejo.",
      "Cualquier otro problema de salud importante que interfiera en su resolución."
    ],
    "sesionesMaximas": 10,
    "decisionInterconsulta": {
      "textoAceptado": "Cumple criterios de inclusión, se acepta el proceso.",
      "textoNoAceptado": "No cumple criterios de inclusión o presenta criterios de exclusión, no se acepta el proceso."
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: esguince LFA tobillo derecho Grado I / II)."
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
        "titulo": "Historia de la lesión",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "lesion_inicio",
            "tipo": "texto",
            "etiqueta": "Mecanismo e inicio",
            "ayuda": "Fecha del traumatismo y mecanismo (inversión, eversión, caídas, apoyo en terreno irregular...)."
          },
          {
            "id": "lesion_grado",
            "tipo": "select",
            "etiqueta": "Grado estimado de la lesión",
            "opciones": [
              "Grado I (Distensión / Elongación)",
              "Grado II (Desgarro parcial)",
              "No precisado"
            ]
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución",
            "ayuda": "¿Ha mejorado la inflamación/dolor, episodios de inestabilidad o esguinces recidivantes previa...?"
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "Medidas iniciales aplicadas: RICE (reposo, hielo, compresión, elevación), vendaje funcional, ortesis/tobillera, reposo sin carga, analgesia..."
          }
        ],
        "gruposNarrativos": [
          {
            "fragmentos": [
              {
                "campo": "lesion_inicio",
                "texto": "Mecanismo de lesión: {valor}"
              },
              {
                "campo": "lesion_grado",
                "texto": "Clasificación clínica: {valor}"
              }
            ],
            "union": ". ",
            "sufijo": "."
          },
          {
            "fragmentos": [
              {
                "campo": "lesion_evolucion",
                "texto": "La evolución ha sido {valor}"
              }
            ],
            "sufijo": "."
          },
          {
            "fragmentos": [
              {
                "campo": "lesion_tratamientos_previos",
                "texto": "Como tratamiento previo, refiere {valor}"
              }
            ],
            "sufijo": "."
          }
        ]
      },
      {
        "id": "historiaDolor",
        "titulo": "Historia del dolor",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "dolor_localizacion",
            "tipo": "texto",
            "etiqueta": "Localización",
            "ayuda": "Ligamento peroneoastragalino anterior (LFA), calcaneoperoneo (LCF), deltoideo, seno del tarso..."
          },
          {
            "id": "dolor_intensidad",
            "tipo": "numero",
            "etiqueta": "Intensidad (EVA 0-10)",
            "min": 0,
            "max": 10,
            "ayuda": "Escala de 0 (sin dolor) a 10 (el peor dolor imaginable)."
          },
          {
            "id": "dolor_caracteristicas",
            "tipo": "texto",
            "etiqueta": "Características / Tipo",
            "ayuda": "Dolor punzante a la carga/inversión, sordo en reposo, sensación de inestabilidad/fallo..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: apoyo de peso, deambulación, marcha en terrenos irregulares, movimiento de inversión..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo en descarga, crioterapia, vendaje/ortesis, elevación..."
          }
        ],
        "gruposNarrativos": [
          {
            "prefijo": "Dolor ",
            "fragmentos": [
              {
                "campo": "dolor_localizacion",
                "texto": "localizado en {valor}"
              },
              {
                "campo": "dolor_caracteristicas",
                "texto": "de características {valor}"
              },
              {
                "campo": "dolor_intensidad",
                "texto": "intensidad {valor}/10"
              }
            ],
            "union": ", ",
            "sufijo": "."
          },
          {
            "prefijo": "El dolor ",
            "fragmentos": [
              {
                "campo": "dolor_agravantes",
                "texto": "aumenta con {valor}"
              },
              {
                "campo": "dolor_alivio",
                "texto": "mejora con {valor}"
              }
            ],
            "union": " y ",
            "sufijo": "."
          }
        ]
      },
      {
        "id": "historiaLaboral",
        "titulo": "Historia laboral",
        "tipo": "checklist",
        "ayuda": "Marca las opciones que apliquen a su puesto de trabajo.",
        "opciones": [
          {
            "id": "laboral_bipedestacion",
            "etiqueta": "Bipedestación prolongada",
            "fraseTexto": "bipedestación prolongada"
          },
          {
            "id": "laboral_marcha_irregulares",
            "etiqueta": "Deambulación continua / terrenos irregulares",
            "fraseTexto": "deambulación continua o tránsito por terrenos irregulares"
          },
          {
            "id": "laboral_escaleras_cargas",
            "etiqueta": "Subida/bajada de escaleras o manipulación de cargas",
            "fraseTexto": "subida/bajada de escaleras o manipulación de cargas"
          },
          {
            "id": "laboral_sedentario",
            "etiqueta": "Trabajo sedentario / sentado",
            "fraseTexto": "tareas sedentarias en posición de sentado"
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
        "prefijoTexto": "Su actividad laboral incluye ",
        "sufijoTexto": "."
      },
      {
        "id": "historiaSociofamiliar",
        "titulo": "Historia sociofamiliar / AVD",
        "tipo": "checklist",
        "ayuda": "Marca las actividades cotidianas afectadas por el esguince.",
        "opciones": [
          {
            "id": "avd_marcha",
            "etiqueta": "Deambulación / caminar",
            "fraseTexto": "caminar o deambular con normalidad"
          },
          {
            "id": "avd_escaleras",
            "etiqueta": "Subir / bajar escaleras",
            "fraseTexto": "subir o bajar escaleras"
          },
          {
            "id": "avd_conduccion",
            "etiqueta": "Conducción de vehículos",
            "fraseTexto": "la conducción de vehículos"
          },
          {
            "id": "avd_calzado",
            "etiqueta": "Colocación de calzado",
            "fraseTexto": "el calzado habitual por presencia de edema"
          }
        ],
        "otro": {
          "id": "avd_otras",
          "etiqueta": "Otras"
        },
        "prefijoTexto": "En las actividades de la vida diaria, refiere dificultad para ",
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
            "ayuda": "Deportes de impacto, salto, cambios de dirección (fútbol, baloncesto, running, montaña...)."
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
      }
    ]
  },
  "exploracionFisica": {
    "fuente": "Estructura según protocolo SCS",
    "inspeccionPalpacion": {
      "titulo": "Inspección y palpación",
      "campos": [
        {
          "id": "insp_posicion_bipedestacion",
          "tipo": "texto",
          "etiqueta": "Posición de ambos tobillos en bipedestación",
          "ayuda": "Ej.: Alineación neutra, varo/valgo de retropié, apoyo antiálgico en antepié..."
        },
        {
          "id": "insp_edema_inflamacion",
          "tipo": "select",
          "etiqueta": "Edema / Inflamación local",
          "opciones": [
            "Sin edema",
            "Ligero edema localizado",
            "Edema moderado / perimaleolar",
            "Importante edema / difuso (valorar exclusión)"
          ]
        },
        {
          "id": "insp_equimosis",
          "tipo": "select",
          "etiqueta": "Equímosis / Hematoma",
          "opciones": [
            "Ausente / Leve",
            "Equímosis tardía (típica de Grado II)",
            "Equímosis inmediata e extensa (sugerente de Grado III)"
          ]
        },
        {
          "id": "insp_dolor_palpacion_puntos",
          "tipo": "texto",
          "etiqueta": "Puntos dolorosos a la palpación",
          "ayuda": "Palpar: LFA, LCF, deltoideo, maléolo peroneo/tibial, base del 5º metatarsiano, cuello del astrágalo..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Tobillo y Subastragalina)",
      "notaFuente": "Evaluación del rango activo y pasivo. Valorar dolor provocado durante la inversión/eversión.",
      "movimientos": [
        {
          "id": "mov_flexion_dorsal",
          "etiqueta": "Flexión dorsal (Dorsiflexión)",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_flexion_plantar",
          "etiqueta": "Flexión plantar",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_inversion",
          "etiqueta": "Inversión (dolor en ligamentos laterales)",
          "categorias": [
            "No valorada / Dolor que la impide",
            "Dolor leve",
            "Dolor intenso",
            "Sin dolor / Movilidad completa"
          ]
        },
        {
          "id": "mov_eversion",
          "etiqueta": "Eversión (dolor en ligamento deltoideo)",
          "categorias": [
            "No valorada / Dolor que la impide",
            "Dolor leve",
            "Dolor intenso",
            "Sin dolor / Movilidad completa"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad",
        "ayuda": "Ej.: restricción de dorsiflexión por tope blando/edema, dolor al final del rango pasivo en inversión..."
      }
    },
    "balanceMuscular": {
      "titulo": "Balance muscular (escala de Daniels)",
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
          "id": "fuerza_peroneos",
          "etiqueta": "Peroneos lateral largo y corto (eversión / estabilizadores laterales)"
        },
        {
          "id": "fuerza_tibial_anterior",
          "etiqueta": "Tibial anterior (flexión dorsal e inversión)"
        },
        {
          "id": "fuerza_triceps_sural",
          "etiqueta": "Tríceps sural / Gastrocnemios-Sóleos (flexión plantar)"
        },
        {
          "id": "fuerza_tibial_posterior",
          "etiqueta": "Tibial posterior (inversión y soporte del arco)"
        }
      ]
    },
    "examenMarcha": {
      "titulo": "Examen de la marcha",
      "campos": [
        {
          "id": "marcha_patron",
          "tipo": "select",
          "etiqueta": "Patrón de marcha",
          "opciones": [
            "Normal / Fisiológica",
            "Marcha antiálgica con apoyo incompleto",
            "Cojera / Dificultad notoria para la deambulación",
            "Imposibilidad absoluta de apoyo (Criterio de exclusión)"
          ]
        },
        {
          "id": "marcha_productos_apoyo",
          "tipo": "select",
          "etiqueta": "Productos de apoyo / Ortesis",
          "opciones": [
            "Sin productos de apoyo",
            "Carga parcial con un bastón/muleta",
            "Dos muletas (descarga / apoyo puntual)",
            "Tobillera elástica / Vendaje funcional",
            "Ortesis estabilizadora (Walker / Aircast)"
          ]
        },
        {
          "id": "marcha_observaciones",
          "tipo": "texto",
          "etiqueta": "Observaciones de la marcha",
          "ayuda": "Ej.: ausencia de despegue de talón, marcha a paso corto, apoyo exclusivo en antepié..."
        }
      ]
    },
    "actitudPostural": {
      "titulo": "Actitud postural general",
      "campo": {
        "id": "actitud_postural",
        "tipo": "texto",
        "etiqueta": "Actitud postural general"
      }
    },
    "sensibilidad": {
      "titulo": "Sensibilidad",
      "campo": {
        "id": "sensibilidad_estado",
        "tipo": "select",
        "etiqueta": "Sensibilidad",
        "opciones": [
          "Normal",
          "Alterada",
          "No valorada"
        ]
      },
      "campoObservaciones": {
        "id": "sensibilidad_obs",
        "tipo": "texto",
        "etiqueta": "Observaciones"
      }
    },
    "testsEspecificos": {
      "titulo": "Tests específicos de estabilidad y laxitud articular",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_cajon_anterior",
          "nombre": "Prueba del Cajón Anterior",
          "estructura": "Ligamento Peroneoastragalino Anterior (LFA)",
          "ayuda": "Fijar tibia con una mano y traccionar el calcáneo hacia anterior con codo/tobillo en ligera flexión plantar. Positivo: traslación anterior excesiva o suave 'tope' blando (sugiere rotura/laxitud LFA)."
        },
        {
          "id": "test_bostezo_varo",
          "nombre": "Prueba de Bostezo / Estrés en Varo (Inversión forzada)",
          "estructura": "Ligamento Calcaneoperoneo (LCF)",
          "ayuda": "Fijar tibia y forzar la inversión del calcáneo. Positivo: inclinación astragalina excesiva o dolor agudo sin tope firme (sugiere rotura/laxitud LCF)."
        },
        {
          "id": "test_bostezo_valgo",
          "nombre": "Prueba de Bostezo / Estrés en Valgo (Eversión forzada)",
          "estructura": "Ligamento Deltoideo (medial)",
          "ayuda": "Fijar tibia y forzar la eversión del calcáneo. Positivo: apertura medial o dolor agudo."
        },
        {
          "id": "test_beighton_scale",
          "nombre": "Escala de Beighton (Laxitud ligamentaria sistémica - ANEXO V)",
          "estructura": "Hipermovilidad articular / factor de cronicidad",
          "ayuda": "Valoración de laxitud articular generalizada (0 a 9 puntos). Un resultado de >= 4/9 indica hiperlaxitud articular, factor predisponente a esguinces recidivantes."
        }
      ]
    }
  },
  "planActuacion": {
    "fuente": "editable",
    "recomendaciones": [
      {
        "id": "rec_scs",
        "texto": "Se entregan recomendaciones para su patología elaboradas por el SCS."
      },
      {
        "id": "rec_ejercicios_propiocepcion",
        "texto": "Se pautan ejercicios domiciliarios de reeducación propioceptiva (equilibrio monopodal), movilidad activa y fortalecimiento de eversores/peroneos."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_retorno_carga",
        "texto": "Se explican las pautas de reintroducción progresiva de la carga de peso y recomendaciones de calzado/vendaje durante la actividad."
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
