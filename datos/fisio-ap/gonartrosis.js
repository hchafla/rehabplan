window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['gonartrosis'] = {
  "id": "gonartrosis",
  "nombre": "Rodilla - Gonartrosis",
  "fuente": "Protocolo de actuación SCS · Gonartrosis (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Restaurar la funcionalidad de la rodilla y mantener la autonomía en la deambulación, adaptando al paciente a una vida activa."
    ],
    "especificos": [
      "Disminuir el dolor y la inflamación.",
      "Mejorar/normalizar la movilidad articular (flexo-extensión).",
      "Recuperar el balance muscular (fuerza y tono de la musculatura periarticular).",
      "Corregir alteraciones de la marcha y actitudes posturales antiálgicas.",
      "Prevenir la discapacidad conservando la independencia funcional en las AVD.",
      "Fomentar el autocuidado, el control ponderal y el ejercicio regular."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Usuarios diagnosticados de Gonartrosis leves y moderadas (Grados 1 y 2 de KELLGREN Y LAWRENCE: dudoso/posible estrechamiento del espacio articular y posibles osteofitos), derivadas de patología NO traumática.",
      "Usuarios con posibilidad de deambulación independiente conservada o autónoma.",
      "Aceptación y colaboración por parte del usuario del plan terapéutico a seguir."
    ],
    "criteriosExclusion": [
      "Patología traumática previa reciente.",
      "Gonartrosis pendientes de intervención quirúrgica.",
      "Gonartrosis graves (Grado III y IV de KELLGREN Y LAWRENCE).",
      "Otro problema de salud asociado al proceso."
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: gonartrosis Grado I-II K&L)."
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
            "etiqueta": "Inicio",
            "ayuda": "¿Cuándo y cómo empezó? Ej.: insidioso desde hace meses/años, empeoramiento progresivo..."
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución",
            "ayuda": "¿Ha empeorado progresivamente, presenta brotes inflamatorios, estabilidad...?"
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "Tratamientos ya realizados: AINEs, analgésicos, infiltraciones (corticoides/hialurónico), fisioterapia previa, uso de rodillera..."
          }
        ],
        "gruposNarrativos": [
          {
            "fragmentos": [
              {
                "campo": "lesion_inicio",
                "texto": "El cuadro comenzó {valor}"
              }
            ],
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
            "ayuda": "Compartimento interno, externo, anterior/femoropatelar, difuso..."
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
            "ayuda": "Mecánico, rigidez matutina (<30 min), sordo, inflamatorio al descanso..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: bajar/subir escaleras, bipedestación prolongada, ponerse de cuclillas, iniciar la marcha..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo, descarga, calor/frío local, analgesia..."
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
            "id": "laboral_marcha",
            "etiqueta": "Deambulación frecuente / desplazamientos",
            "fraseTexto": "deambulación continua o trayectos largos"
          },
          {
            "id": "laboral_escaleras_cargas",
            "etiqueta": "Subida/bajada de escaleras o cargas",
            "fraseTexto": "subida/bajada de escaleras o manipulación de cargas"
          },
          {
            "id": "laboral_posturas_forzadas",
            "etiqueta": "Posturas en cuclillas o de rodillas",
            "fraseTexto": "posturas en cuclillas o apoyo directo sobre rodillas"
          },
          {
            "id": "laboral_sedentario",
            "etiqueta": "Trabajo sedentario / sentado",
            "fraseTexto": "tareas sedentarias con sedestación prolongada"
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
        "ayuda": "Marca las actividades de la vida diaria afectadas.",
        "opciones": [
          {
            "id": "avd_escaleras",
            "etiqueta": "Subir / bajar escaleras",
            "fraseTexto": "subir o bajar escaleras"
          },
          {
            "id": "avd_levantarse",
            "etiqueta": "Levantarse de silla / inodoro",
            "fraseTexto": "incorporarse desde la posición de sentado"
          },
          {
            "id": "avd_marcha_distancia",
            "etiqueta": "Caminar distancias medias/largas",
            "fraseTexto": "caminar trayectos prolongados"
          },
          {
            "id": "avd_agacharse",
            "etiqueta": "Agacharse / recoger objetos del suelo",
            "fraseTexto": "agacharse o recoger objetos del suelo"
          },
          {
            "id": "avd_higiene",
            "etiqueta": "Entrar / salir de la bañera o ducha",
            "fraseTexto": "acceso a bañera/ducha o aseo personal"
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
            "ayuda": "Paseos, senderismo, natación, ciclismo, baile, jardinería..."
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
          "id": "insp_deformidad",
          "tipo": "texto",
          "etiqueta": "Deformidades / Alineación",
          "ayuda": "Ej.: Genu varo, genu valgo, genu recurvatum..."
        },
        {
          "id": "insp_inflamacion_derrame",
          "tipo": "tristate",
          "etiqueta": "Inflamación / Tumefacción / Choque rotuliano"
        },
        {
          "id": "insp_dolor_palpacion",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación (interlínea articular, facetas patelares)"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: crujidos/crepitación articular, quiste de Baker..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Rodilla)",
      "notaFuente": "Evaluación del rango de movimiento activo y pasivo.",
      "movimientos": [
        {
          "id": "mov_flexion_rodilla",
          "etiqueta": "Flexión de rodilla",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_extension_rodilla",
          "etiqueta": "Extensión / Flexo de rodilla",
          "categorias": [
            "No valorado",
            "Flexo severo (>15°)",
            "Flexo moderado (5-15°)",
            "Flexo leve (<5°)",
            "Extensión completa"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad",
        "ayuda": "Ej.: crepitación durante el movimiento, dolor al final del rango, tope duro/elástico…"
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
          "id": "fuerza_cuadriceps",
          "etiqueta": "Cuádriceps (extensión de rodilla)"
        },
        {
          "id": "fuerza_isquiotibiales",
          "etiqueta": "Isquiotibiales (flexión de rodilla)"
        },
        {
          "id": "fuerza_gluteo_medio",
          "etiqueta": "Abductores de cadera / Glúteo medio"
        },
        {
          "id": "fuerza_psoas_gluteomax",
          "etiqueta": "Flexores / Extensores de cadera"
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
            "Marcha antiálgica",
            "Claudicación / Cojera",
            "Pérdida de alineación / Colapso en valgo-varo",
            "No valorada"
          ]
        },
        {
          "id": "marcha_productos_apoyo",
          "tipo": "select",
          "etiqueta": "Productos de apoyo",
          "opciones": [
            "Sin productos de apoyo",
            "Bipedestación/deambulación con bastón/muleta",
            "Dos muletas / andador",
            "Otros"
          ]
        },
        {
          "id": "marcha_observaciones",
          "tipo": "texto",
          "etiqueta": "Observaciones de la marcha",
          "ayuda": "Ej.: velocidad disminuida, fase de apoyo acortada en MS afectado..."
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
        "id": "rec_ejercicios_pautados",
        "texto": "Se pautan ejercicios domiciliarios (potenciación isométrica/isotónica cuádriceps, movilidad y estiramientos) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_estilo_vida",
        "texto": "Se aconseja control del peso corporal y realización de actividad física aeróbica de bajo impacto."
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
