window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['codo-epicondilalgia'] = {
  "id": "codo-epicondilalgia",
  "nombre": "Codo - Epicondilalgia y Epitrocleitis",
  "fuente": "Protocolo de actuación SCS · Epicondilalgia / Epitrocleitis (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Restaurar la funcionalidad del codo.",
      "Prevenir las recaídas."
    ],
    "especificos": [
      "Aliviar el dolor.",
      "Restaurar la movilidad.",
      "Recuperar la fuerza muscular.",
      "Enseñar ejercicios y técnicas para evitar recidivas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Usuarios con diagnóstico médico de Epicondilalgia: \"epicondilitis\" y/o \"epitrocleitis\".",
      "Aceptación y colaboración por parte del usuario del plan terapéutico a seguir."
    ],
    "criteriosExclusion": [
      "Epicondilalgias de origen cervical: por radiculopatía C5-C6.",
      "Epicondilalgias acompañadas de un síndrome del túnel carpiano."
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: epicondilitis lateral, epitrocleitis)."
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
            "ayuda": "¿Cuándo y cómo empezó? Ej.: hace 3 semanas, insidioso tras uso continuado de herramientas..."
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución",
            "ayuda": "¿Ha mejorado, empeorado o se mantiene igual desde el inicio?"
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "Tratamientos ya realizados: AINEs, cincha/ortesis, infiltraciones, fisioterapia previa…"
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
            "ayuda": "Zona exacta del dolor. Ej.: epicóndilo lateral derecho, cara medial de codo..."
          },
          {
            "id": "dolor_irradiacion",
            "tipo": "texto",
            "etiqueta": "Irradiación",
            "ayuda": "Hacia musculatura extensora/flexora del antebrazo, muñeca, etc."
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
            "ayuda": "Mecánico, punzante, sordo, al agarre..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: prensión manual, pronosupinación con carga, teclear, llevar bolsas..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo, estiramientos, frío local, cincha de epicondilitis…"
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
                "campo": "dolor_irradiacion",
                "texto": "irradiado a {valor}"
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
            "id": "laboral_repetitivo",
            "etiqueta": "Movimientos repetitivos de muñeca/antebrazo",
            "fraseTexto": "movimientos repetitivos de muñeca y antebrazo"
          },
          {
            "id": "laboral_prension",
            "etiqueta": "Prensión o agarre mantenido",
            "fraseTexto": "prensión o agarre mantenido de fuerza"
          },
          {
            "id": "laboral_herramientas",
            "etiqueta": "Uso de herramientas / ordenador",
            "fraseTexto": "uso continuado de herramientas o ratón/teclado"
          },
          {
            "id": "laboral_cargas",
            "etiqueta": "Manipulación de cargas con MMSS",
            "fraseTexto": "manipulación de cargas con miembros superiores"
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
        "ayuda": "Marca las actividades cotidianas afectadas por la patología de codo.",
        "opciones": [
          {
            "id": "avd_prension",
            "etiqueta": "Coger/cargar objetos (jarras, bolsas)",
            "fraseTexto": "coger o sujetar objetos pesados"
          },
          {
            "id": "avd_giros",
            "etiqueta": "Girar objetos (llaves, abrir botes, pomos)",
            "fraseTexto": "gestos de giro como abrir botes o manipular llaves"
          },
          {
            "id": "avd_aseo",
            "etiqueta": "Aseo / Peinado / Cepillado",
            "fraseTexto": "actividades de aseo e higiene personal"
          },
          {
            "id": "avd_limpieza",
            "etiqueta": "Tareas domésticas (escurrir, barrer)",
            "fraseTexto": "tareas domésticas que implican torsión de antebrazo"
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
            "ayuda": "Deportes de raqueta, gimnasio, escalada, bricolaje, instrumentos musicales..."
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
        "id": "comorbilidadesEscalas",
        "titulo": "Comorbilidades y escalas",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "comorbilidades",
            "tipo": "texto",
            "etiqueta": "Comorbilidades",
            "ayuda": "Patologías asociadas (diabetes, patología cervical, artrosis...)."
          },
          {
            "id": "prtee_score",
            "tipo": "texto",
            "etiqueta": "Escala funcional (PRTEE / Codo de tenista)",
            "ayuda": "Puntuación de la escala de funcionalidad si ha sido administrada."
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
          },
          {
            "fragmentos": [
              {
                "campo": "prtee_score",
                "texto": "Puntuación en la escala funcional PRTEE: {valor}"
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
          "id": "insp_postura",
          "tipo": "texto",
          "etiqueta": "Actitud / Postural general",
          "ayuda": "Ej.: codo sostenido en semiflexión, protección del miembro..."
        },
        {
          "id": "insp_inflamacion",
          "tipo": "tristate",
          "etiqueta": "Tumefacción / Inflamación local"
        },
        {
          "id": "insp_dolor_palpacion",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación en epicóndilo/epitróclea"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: dolor a la palpación en la masa muscular extensora/flexora..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Codo y Antebrazo)",
      "notaFuente": "Evaluación funcional del rango de movimiento del codo y complejo radiocubital.",
      "movimientos": [
        {
          "id": "mov_flexion_codo",
          "etiqueta": "Flexión de codo",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_extension_codo",
          "etiqueta": "Extensión de codo",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_pronacion",
          "etiqueta": "Pronación de antebrazo",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_supinacion",
          "etiqueta": "Supinación de antebrazo",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad",
        "ayuda": "Ej.: tope elástico, dolor al final del rango en estiramiento, movilidad activa vs pasiva…"
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
          "id": "fuerza_extensora_muneca",
          "etiqueta": "Extensión de muñeca / dedos (EPRC, ESRC, ED)"
        },
        {
          "id": "fuerza_flexora_muneca",
          "etiqueta": "Flexión de muñeca / dedos (FRC, FUC)"
        },
        {
          "id": "fuerza_pronacion",
          "etiqueta": "Pronación de antebrazo"
        },
        {
          "id": "fuerza_supinacion",
          "etiqueta": "Supinación de antebrazo"
        },
        {
          "id": "fuerza_flexion_codo",
          "etiqueta": "Flexión de codo"
        },
        {
          "id": "fuerza_extension_codo",
          "etiqueta": "Extensión de codo"
        }
      ]
    },
    "dinamometriaPrension": {
      "titulo": "Dinamometría de prensión manual",
      "dispositivo": {
        "marca": "SAEHAN",
        "modelo": "Smedley",
        "referencia": "08-010401",
        "tipo": "resorte",
        "rangoKg": "0-100",
        "notaDispositivo": "No confundir con el Saehan SH5001 (hidráulico); esta sección está pensada para el Smedley de resorte."
      }
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
      "titulo": "Sensibilidad y Neurología",
      "campo": {
        "id": "sensibilidad_estado",
        "tipo": "select",
        "etiqueta": "Sensibilidad dermatomas / territorio nervioso",
        "opciones": [
          "Normal",
          "Alterada",
          "No valorada"
        ]
      },
      "campoObservaciones": {
        "id": "sensibilidad_obs",
        "tipo": "texto",
        "etiqueta": "Observaciones (descartar parestesias en C5-C6 o territorio cubital/mediano)",
        "ayuda": "Recuerda que la radiculopatía C5-C6 y el Síndrome del Túnel Carpiano son criterios de exclusión."
      }
    },
    "testsEspecificos": {
      "titulo": "Tests específicos (elegir el/los que proceda/n)",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_thomson",
          "nombre": "Maniobra de Thomson",
          "estructura": "Epicóndilo lateral / Musculatura extensora",
          "ayuda": "Dolor al realizar la extensión contra resistencia de la muñeca con el puño cerrado y el codo en extensión completa. Positivo: dolor en epicóndilo lateral/musculatura radial.",
          "imagen": "thomson.webp",
          "video": null
        },
        {
          "id": "test_mill",
          "nombre": "Maniobra de Mill",
          "estructura": "Epicóndilo lateral / Musculatura extensora",
          "ayuda": "Con codo flexionado y pronado, el paciente intenta la supinación contra resistencia del explorador. Positivo: dolor en epicóndilo lateral o musculatura extensora.",
          "imagen": "mill.webp",
          "video": null
        },
        {
          "id": "test_cozen",
          "nombre": "Maniobra de Cozen",
          "estructura": "Epicóndilo lateral / Extensores radiales",
          "ayuda": "Con codo en flexión, el paciente realiza extensión de muñeca contra resistencia. Positivo: dolor en epicóndilo lateral.",
          "imagen": "cozen.webp",
          "video": null
        },
        {
          "id": "test_cozen_invertida",
          "nombre": "Maniobra de Cozen invertida",
          "estructura": "Epicóndilo medial / Musculatura flexora",
          "ayuda": "El paciente intenta flexionar la mano (extendida) contra resistencia. Positivo: dolor agudo y punzante en epicóndilo medial.",
          "imagen": "cozen-invertida.webp",
          "video": null
        },
        {
          "id": "test_codo_golfista",
          "nombre": "Signo del codo de golfista",
          "estructura": "Epicóndilo medial / Musculatura flexora-pronadora",
          "ayuda": "Codo flexionado, intenta flexión palmar y extender el brazo contra resistencia. Positivo: dolor en epicóndilo medial y masa flexora.",
          "imagen": "codo-golfista.webp",
          "video": null
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
        "id": "rec_ejercicios_pautados",
        "texto": "Se pautan ejercicios domiciliarios (carga progresiva/estiramientos) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
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
