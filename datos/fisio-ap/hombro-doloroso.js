window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['hombro-doloroso'] = {
  "id": "hombro-doloroso",
  "nombre": "Hombro doloroso - Tendinopatías de hombro",
  "fuente": "Protocolo de actuación SCS · Hombro doloroso / Tendinopatías de hombro (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Devolver al hombro su funcionalidad, readaptando al paciente lo antes posible a la vida activa."
    ],
    "especificos": [
      "Disminuir el dolor.",
      "Reducir la inflamación.",
      "Mejorar/normalizar la movilidad, mejorando el balance articular.",
      "Recuperar el tono, la fuerza y la potencia muscular: reequilibración muscular.",
      "Corregir las posturas antiálgicas.",
      "Reeducar el ritmo escápulo-humeral.",
      "Prevenir la discapacidad, conservando la independencia del usuario.",
      "Fomentar la responsabilidad del usuario en el autocuidado.",
      "Prevenir complicaciones y recidivas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Persistencia de clínica dolorosa tras haber realizado tratamiento previo durante 4-6 semanas."
    ],
    "criteriosExclusion": [
      "Hombro doloroso postraumático.",
      "Hombro doloroso de etiología extrínseca.",
      "Capsulitis adhesiva (derivación a Rehabilitación)."
    ],
    "sesionesMaximas": 10
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación, si lo hay."
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
    "fuente": "Estructura y campos definidos por Héctor a partir del protocolo SCS; la redacción generada no es un texto oficial",
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
            "ayuda": "¿Cuándo y cómo empezó? Ej.: hace 3 semanas, de forma insidiosa/súbita, tras un esfuerzo concreto…"
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
            "ayuda": "Tratamientos ya realizados para este proceso: fármacos, infiltraciones, fisioterapia previa…"
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
            "ayuda": "Zona exacta del dolor. Ej.: cara anterior del hombro derecho."
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
            "etiqueta": "Características",
            "ayuda": "Tipo de dolor: mecánico, inflamatorio, punzante, sordo…"
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: movimientos por encima de la cabeza, cargar peso, dormir de lado…"
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo, frío local, analgesia…"
          },
          {
            "id": "dolor_nocturno",
            "tipo": "binario",
            "etiqueta": "Dolor nocturno",
            "ayuda": "¿Le despierta por la noche? (Sí / No)"
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
          },
          {
            "tipo": "tristate",
            "campo": "dolor_nocturno",
            "textoSi": "Presenta dolor nocturno.",
            "textoNo": "No presenta dolor nocturno."
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
            "id": "laboral_sedentario",
            "etiqueta": "Trabajo sedentario",
            "fraseTexto": "tareas sedentarias"
          },
          {
            "id": "laboral_mmss",
            "etiqueta": "Trabajo con MMSS",
            "fraseTexto": "uso repetido de miembros superiores"
          },
          {
            "id": "laboral_altura",
            "etiqueta": "Trabajo por encima de la cabeza",
            "fraseTexto": "tareas por encima de la cabeza"
          },
          {
            "id": "laboral_cargas",
            "etiqueta": "Manipulación de cargas",
            "fraseTexto": "manipulación de cargas"
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
        "ayuda": "Marca las actividades de la vida diaria que se ven dificultadas por el dolor de hombro.",
        "opciones": [
          {
            "id": "avd_vestido",
            "etiqueta": "Vestido",
            "fraseTexto": "vestirse"
          },
          {
            "id": "avd_aseo",
            "etiqueta": "Aseo",
            "fraseTexto": "el aseo personal"
          },
          {
            "id": "avd_alcanzar",
            "etiqueta": "Alcanzar objetos",
            "fraseTexto": "alcanzar objetos"
          },
          {
            "id": "avd_dormir",
            "etiqueta": "Dormir",
            "fraseTexto": "dormir"
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
            "ayuda": "Deportes o aficiones habituales y si se han visto afectados por el dolor."
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
          "id": "insp_postura",
          "tipo": "texto",
          "etiqueta": "Postura del hombro"
        },
        {
          "id": "insp_inflamacion",
          "tipo": "tristate",
          "etiqueta": "Inflamación"
        },
        {
          "id": "insp_dolor_palpacion",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos"
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular",
      "notaFuente": "El protocolo no especifica goniometría ni categorías concretas. Esta clasificación funcional es una propuesta inicial y puede modificarse fácilmente desde este archivo de datos.",
      "movimientos": [
        {
          "id": "mov_flexion",
          "etiqueta": "Flexión de hombro",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_abduccion",
          "etiqueta": "Abducción de hombro",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_rotacion_interna",
          "etiqueta": "Rotación interna",
          "categorias": [
            "No valorada",
            "Mano llega a región lumbar",
            "Mano llega a región dorsal",
            "Sin limitación funcional"
          ]
        },
        {
          "id": "mov_rotacion_externa",
          "etiqueta": "Rotación externa",
          "categorias": [
            "No valorada",
            "Mano no llega a nuca",
            "Mano llega a nuca",
            "Sin limitación funcional"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad",
        "ayuda": "Ej.: limitación en activo por dolor muscular, limitación en pasivo (articular), etc."
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
          "id": "fuerza_flexion",
          "etiqueta": "Flexión de hombro"
        },
        {
          "id": "fuerza_abduccion",
          "etiqueta": "Abducción"
        },
        {
          "id": "fuerza_rot_interna",
          "etiqueta": "Rotación interna"
        },
        {
          "id": "fuerza_rot_externa",
          "etiqueta": "Rotación externa"
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
      "titulo": "Tests específicos",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_jobe",
          "nombre": "Jobe",
          "estructura": "Supraespinoso",
          "ayuda": "Abducción de 90°, antepulsión de 30° y rotación interna máxima (pulgares hacia abajo); se aplica resistencia descendente sobre los brazos."
        },
        {
          "id": "test_yergason",
          "nombre": "Yergason",
          "estructura": "Bíceps braquial (porción larga)",
          "ayuda": "Brazo pegado al cuerpo, codo en flexión de 90° y mano en pronación; se resiste la flexo-supinación del codo y se valora el dolor en el canal bicipital."
        },
        {
          "id": "test_neer",
          "nombre": "Neer",
          "estructura": "Síndrome subacromial",
          "ayuda": "Se estabiliza la escápula y se realiza una abducción pasiva en rotación interna; es positivo si aparece dolor entre 70° y 120°."
        },
        {
          "id": "test_gerber",
          "nombre": "Gerber (lift-off test)",
          "estructura": "Subescapular",
          "ayuda": "Mano del paciente tras la espalda, en rotación interna; se retira la mano de la zona lumbar contra resistencia."
        },
        {
          "id": "test_patte",
          "nombre": "Patte",
          "estructura": "Infraespinoso / redondo menor",
          "ayuda": "90° de abducción, 30° de anteversión y codo en 90° apoyado sobre el antebrazo del explorador; se solicita rotación externa activa contra resistencia, comparando con el lado contrario."
        },
        {
          "id": "test_palmup",
          "nombre": "Palm-up test (Speed)",
          "estructura": "Porción larga del bíceps braquial",
          "ayuda": "Codo en extensión, antebrazo en supinación y hombro en flexión de 90°; se resiste la flexión del hombro y se valora el dolor en la corredera bicipital."
        },
        {
          "id": "test_palm_up",
          "nombre": "Palm-up test (Speed)",
          "estructura": "Bíceps braquial (porción larga) / labrum",
          "ayuda": "Codo en extensión, antebrazo supinado (palma hacia arriba) y hombro en flexión anterior de unos 90°; se aplica resistencia descendente. El dolor en la corredera bicipital sugiere afectación de la porción larga del bíceps."
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
        "texto": "Se pautan ejercicios domiciliarios y se explican al paciente."
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
