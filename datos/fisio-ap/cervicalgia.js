window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['cervicalgia'] = {
  "id": "cervicalgia",
  "nombre": "Algias vertebrales - Cervicalgia",
  "fuente": "Protocolo de actuación SCS · Cervicalgia (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Mejorar la calidad del vida del usuario, aumentando su capacidad funcional y disminuyendo los síntomas."
    ],
    "especificos": [
      "Disminuir el dolor.",
      "Mejorar/normalizar la movilidad.",
      "Recuperar el tono, fuerza y potencia muscular: reequilibración muscular.",
      "Corregir las posturas antiálgicas.",
      "Mejorar la propiocepción.",
      "Enseñar ejercicios y técnicas de protección.",
      "Enseñar pautas de autocuidado y consejos higiénico-posturales para prevenir recaídas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Cervicalgia inespecífica de comportamiento mecánico, con o sin irradiación, SIN compromiso neurológico clínico (sin déficit motor/sensitivo).",
      "Asocia criterios de limitación funcional para las AVD.",
      "Falta de respuesta a tratamiento farmacológico, medidas autoaplicadas, reposo e higiene postural previos.",
      "Evolución mayor de 6 semanas.",
      "Aceptación y colaboración del usuario con el plan terapéutico."
    ],
    "criteriosExclusion": [
      "Accidentes de tráfico/laborales (salvo >1 año y alta por Rehabilitación).",
      "Terapia física recibida por el mismo cuadro en el último año.",
      "Fibromialgia (salvo proceso agudo reciente no relacionado).",
      "Dolor referido (vascular, torácico, abdominal) u omalgia concomitante de predominio nocturno / no mecánico.",
      "Insuficiencia vascular (drop attacks: pérdida de conocimiento con mov. cervicales).",
      "Traumatismo significativo / cirugía previa / osteoporosis severa / uso crónico de corticoides (sospecha fractura).",
      "Banderas rojas (Malignidad, infección, inflamación): fiebre, pérdida de peso, antecedentes neoplasia, inmunosupresión.",
      "Mielopatía (trastorno marcha, torpeza en manos, alt. esfinteriana).",
      "Signos deficitarios neurológicos progresivos/persistentes: paresia, parálisis, hipoestesia severa.",
      "Deformidad vertebral congénita/adquirida no susceptible de fisioterapia.",
      "Distonía inducida por drogas."
    ],
    "sesionesMaximas": 10,
    "decisionInterconsulta": {
      "textoAceptado": "Cumple criterios de inclusión, sin signos de alarma neurológica. Se acepta el proceso.",
      "textoNoAceptado": "No cumple criterios de inclusión o presenta banderas rojas / criterios de exclusión. No se acepta el proceso."
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: cervicalgia mecánica, cervicobraquialgia sin déficit)."
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
            "ayuda": "¿Cuándo y cómo empezó? Ej.: insidioso, sobrecarga postural sostenida, tras mala postura al dormir (tortícolis)..."
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución (>6 semanas)",
            "ayuda": "Empeoramiento paulatino, episodios previos, frecuencia de crisis agudas..."
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "AINEs, relajantes musculares, calor local, collarín (desaconsejado), ejercicios en casa..."
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
            "etiqueta": "Localización e Irradiación",
            "ayuda": "Cervical alta/baja, trapecios, irradiación a MMSS (cervicobraquialgia), interescapular..."
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
            "ayuda": "Mecánico, tensión, opresivo, quemazón, pesadez cervicodorsal..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: posturas mantenidas, lectura, uso de pantallas, giros rápidos..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: calor local, decúbito supino, analgesia, masoterapia local..."
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
                "texto": "intensidad {valor}/10 (EVA)"
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
            "id": "laboral_pvd",
            "etiqueta": "Uso intensivo de pantallas (PVD)",
            "fraseTexto": "uso continuado de pantallas y ordenadores"
          },
          {
            "id": "laboral_sedestacion",
            "etiqueta": "Sedestación prolongada / Tareas de escritorio",
            "fraseTexto": "sedestación prolongada y posturas estáticas"
          },
          {
            "id": "laboral_fuerza_mmss",
            "etiqueta": "Carga de peso o uso intensivo de MMSS",
            "fraseTexto": "esfuerzos y sobrecarga de miembros superiores"
          },
          {
            "id": "laboral_conduccion",
            "etiqueta": "Conductor profesional (transporte, maquinaria)",
            "fraseTexto": "conducción prolongada de vehículos"
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
            "id": "avd_descanso",
            "etiqueta": "Descanso nocturno / Dormir",
            "fraseTexto": "el descanso nocturno y las posturas de sueño"
          },
          {
            "id": "avd_conducir",
            "etiqueta": "Conducir / Mirar retrovisores",
            "fraseTexto": "la conducción y los giros de cabeza"
          },
          {
            "id": "avd_lectura_dispositivos",
            "etiqueta": "Lectura / Uso de móvil (postura de flexión)",
            "fraseTexto": "la lectura o el uso del teléfono móvil"
          },
          {
            "id": "avd_domesticas",
            "etiqueta": "Tareas domésticas con los brazos en alto",
            "fraseTexto": "actividades domésticas que elevan los brazos"
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
            "ayuda": "Ej.: Natación, bicicleta (postura cervical), gimnasio, sedentarismo total..."
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
          "id": "insp_musculatura",
          "tipo": "texto",
          "etiqueta": "Palpación muscular (espasmos/contracturas)",
          "ayuda": "Ej.: Tono muy aumentado en trapecios superiores bilaterales y elevador de la escápula..."
        },
        {
          "id": "insp_puntos_gatillo",
          "tipo": "tristate",
          "etiqueta": "Presencia de Puntos Gatillo Miofasciales (PGM) activos"
        },
        {
          "id": "insp_dolor_espinosas",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación de apófisis espinosas / facetas articulares"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: engrosamiento tisular, zonas de fricción/roce fascial..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Cervical)",
      "notaFuente": "Evaluación del rango activo y pasivo en los 3 planos anatómicos.",
      "movimientos": [
        {
          "id": "mov_flexion_cervical",
          "etiqueta": "Flexión cervical",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_extension_cervical",
          "etiqueta": "Extensión cervical",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_rotacion_der",
          "etiqueta": "Rotación derecha",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_rotacion_izq",
          "etiqueta": "Rotación izquierda",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_inclinacion_der",
          "etiqueta": "Inclinación derecha",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_inclinacion_izq",
          "etiqueta": "Inclinación izquierda",
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
        "ayuda": "Ej.: patrón limitante asimétrico, dolor al final del rango en rotación..."
      }
    },
    "balanceMuscular": {
      "titulo": "Balance muscular (escala de Daniels y reequilibración)",
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
          "id": "fuerza_flexores_profundos",
          "etiqueta": "Flexores profundos cervicales (estabilidad anterior)"
        },
        {
          "id": "fuerza_extensores",
          "etiqueta": "Extensores cervicales"
        },
        {
          "id": "fuerza_trapecios",
          "etiqueta": "Trapecio superior / Angular de la escápula"
        },
        {
          "id": "fuerza_rotadores",
          "etiqueta": "Rotadores e inclinadores (ECOM, Escalenos)"
        }
      ]
    },
    "actitudPostural": {
      "titulo": "Actitud postural general",
      "campo": {
        "id": "actitud_postural",
        "tipo": "texto_area",
        "etiqueta": "Actitud postural (Estática cervical y dorsal)",
        "ayuda": "Ej.: Antepulsión de cabeza, hipercifosis dorsal, rectificación de la lordosis cervical, hombros adelantados (patrón cruzado superior)..."
      }
    },
    "sensibilidad": {
      "titulo": "Sensibilidad y exploración neurológica clínica",
      "campo": {
        "id": "sensibilidad_estado",
        "tipo": "select",
        "etiqueta": "Exploración sensitiva/motora en MMSS",
        "opciones": [
          "Normal (sin déficit clínico)",
          "Signos deficitarios presentes (Criterio de exclusión)",
          "No valorada"
        ]
      },
      "campoObservaciones": {
        "id": "sensibilidad_obs",
        "tipo": "texto",
        "etiqueta": "Observaciones (Descartar radiculopatía C5-T1 o mielopatía)",
        "ayuda": "Descartar parestesias, hipoestesia, pérdida de fuerza o alteraciones de reflejos osteotendinosos."
      }
    },
    "testsEspecificos": {
      "titulo": "Test Específico",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_ndi",
          "nombre": "Índice de Discapacidad Cervical / Neck Disability Index (NDI) - ANEXO V",
          "estructura": "Escala funcional para dolor cervical",
          "ayuda": "Cuestionario de 10 ítems sobre intensidad de dolor, cuidados personales, levantar peso, lectura, dolor de cabeza, concentración, trabajo, conducir, dormir y ocio. Mayor puntuación = mayor discapacidad."
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
        "texto": "Se pautan ejercicios domiciliarios (flexibilización, activación de flexores profundos, reeducación postural) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_higiene_postural",
        "texto": "Se ofrecen pautas de higiene postural (posiciones de sueño, uso de pantallas, adaptación del entorno laboral) para prevenir recaídas."
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
