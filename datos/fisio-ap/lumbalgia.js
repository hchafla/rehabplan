window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['lumbalgia'] = {
  "id": "lumbalgia",
  "nombre": "Algias vertebrales - Lumbalgia",
  "fuente": "Protocolo de actuación SCS · Lumbalgia (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Mejorar la calidad de vida del paciente, disminuyendo los síntomas de su patología lumbar."
    ],
    "especificos": [
      "Aumentar el rango de movilidad libre de dolor o la tolerancia al movimiento en rangos medios.",
      "Mejorar la movilidad en los segmentos lumbares implicados.",
      "Mejorar/normalizar la fuerza y resistencia de la musculatura lumbar.",
      "Mejorar la funcionalidad.",
      "Promover un estilo de vida activo.",
      "Promocionar el autocuidado.",
      "Evitar recidivas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Lumbalgia inespecífica de comportamiento mecánico, con o sin irradiación, SIN compromiso neurológico clínico (sin déficit motor/sensitivo).",
      "Asocia criterios de limitación funcional para las AVD.",
      "Falta de respuesta a tratamiento farmacológico, medidas autoaplicadas, reposo e higiene postural previos.",
      "Evolución mayor de 6 semanas.",
      "Aceptación y colaboración del usuario con el plan terapéutico."
    ],
    "criteriosExclusion": [
      "Fisioterapia por lumbalgia inespecífica en el último año.",
      "Fibromialgia (salvo proceso agudo reciente no relacionado).",
      "Dolor referido (vascular, torácico, abdominal).",
      "Primer episodio >55 años si se sospecha causa secundaria.",
      "Banderas rojas / Signos de alarma: Antecedentes de neoplasia maligna, pérdida de peso inexplicada, inmunosupresión, uso de drogas IV o corticoides crónicos.",
      "Enfermedad inflamatoria (AR, Espondilitis Anquilosante) o sistémica grave (Lupus, esclerodermia, VIH).",
      "Tuberculosis activa, infección urinaria o fiebre.",
      "Dolor constante que aumenta con el reposo / dolor nocturno no mecánico.",
      "Signos deficitarios en la exploración neurológica: pérdida de fuerza, alteraciones esfinterianas o anestesia en silla de montar."
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: lumbalgia mecánica, lumbociatatalgia sin déficit)."
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
            "ayuda": "¿Cuándo y cómo empezó? Ej.: insidioso, sobreesfuerzo en flexión/rotación, tras levantar un peso..."
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución (>6 semanas)",
            "ayuda": "Evolución del cuadro, frecuencia de episodios previos o crisis agudas..."
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "AINEs, analgésicos, faja lumbar (desaconsejada continuo), reposo, calor local..."
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
        "titulo": "Historia del dolor y cuestionario funcional",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "dolor_localizacion",
            "tipo": "texto",
            "etiqueta": "Localización e Irradiación",
            "ayuda": "Lumbar central, sacroilíaca, irradiación glútea, cara posterior de muslo/pierna..."
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
            "ayuda": "Mecánico, opresivo, bloqueo al levantarse, pesadez al estar de pie..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: flexión de tronco, estar sentado mucho tiempo, caminar, cargar peso..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: decúbito supino con piernas flexionadas, calor local, marcha suave..."
          },
          {
            "id": "oswestry_score",
            "tipo": "texto",
            "etiqueta": "Escala de incapacidad por dolor lumbar (Oswestry / ODIsp - ANEXO VIII)",
            "ayuda": "Puntuación del cuestionario Oswestry (% de discapacidad)."
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
          },
          {
            "fragmentos": [
              {
                "campo": "oswestry_score",
                "texto": "Resultado en el cuestionario de incapacidad de Oswestry (ODIsp): {valor}"
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
        "ayuda": "Marca las opciones que apliquen a su puesto de trabajo.",
        "opciones": [
          {
            "id": "laboral_cargas",
            "etiqueta": "Manipulación manual de cargas",
            "fraseTexto": "manipulación manual de cargas pesadas"
          },
          {
            "id": "laboral_sedestacion",
            "etiqueta": "Sedestación prolongada / Oficina",
            "fraseTexto": "sedestación prolongada"
          },
          {
            "id": "laboral_posturas_forzadas",
            "etiqueta": "Posturas en flexión/rotación de tronco mantenidas",
            "fraseTexto": "posturas forzadas de flexión o torsión del tronco"
          },
          {
            "id": "laboral_conduccion_vibracion",
            "etiqueta": "Conducción / Exposición a vibraciones",
            "fraseTexto": "conducción prolongada o exposición a vibraciones"
          },
          {
            "id": "laboral_bipedestacion",
            "etiqueta": "Bipedestación prolongada",
            "fraseTexto": "bipedestación prolongada"
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
        "ayuda": "Marca las actividades cotidianas con limitación por dolor lumbar.",
        "opciones": [
          {
            "id": "avd_agacharse",
            "etiqueta": "Agacharse / coger objetos del suelo",
            "fraseTexto": "agacharse o inclinarse hacia adelante"
          },
          {
            "id": "avd_sedestacion",
            "etiqueta": "Permanecer sentado mucho tiempo",
            "fraseTexto": "la sedestación prolongada"
          },
          {
            "id": "avd_levantarse",
            "etiqueta": "Incorporarse desde sentado / cama",
            "fraseTexto": "incorporarse desde la cama o una silla"
          },
          {
            "id": "avd_marcha",
            "etiqueta": "Deambular trayectos largos",
            "fraseTexto": "caminar distancias prolongadas"
          },
          {
            "id": "avd_calzado",
            "etiqueta": "Ponerse calzado / calcetines",
            "fraseTexto": "vestirse o ponerse el calzado"
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
            "ayuda": "Paseos, gimnasio, natación, ciclismo, jardinería, nivel de sedentarismo..."
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
          "etiqueta": "Palpación de la región lumbar y pélvica",
          "ayuda": "Ej.: hipertonía en paravertebrales lumbares, dolor a la palpación en cresta ilíaca / EIPS, musculatura glútea..."
        },
        {
          "id": "insp_dolor_espinosas",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación de apófisis espinosas / articulaciones interfacetarias"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: acortamiento marcado de la cadena posterior (isquiotibiales/psoas)..."
        }
      ]
    },
    "actitudPostural": {
      "titulo": "Examen postural global",
      "campo": {
        "id": "actitud_postural",
        "tipo": "texto_area",
        "etiqueta": "Examen postural global",
        "ayuda": "Ej.: rectificación de la lordosis lumbar, hiperlordosis, escoliosis/asimetría de crestas ilíacas, basculación pélvica..."
      }
    },
    "movilidadArticular": {
      "titulo": "Examen de la movilidad lumbar",
      "notaFuente": "Evaluación del rango articular y provocación de dolor.",
      "movimientos": [
        {
          "id": "mov_flexion_lumbar",
          "etiqueta": "Flexión lumbar (distancia dedo-suelo)",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_extension_lumbar",
          "etiqueta": "Extensión lumbar",
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
        "etiqueta": "Otras especificaciones sobre la movilidad lumbar",
        "ayuda": "Ej.: dolor al retorno de la flexión, dolor en extensión (patrón facetario)..."
      }
    },
    "balanceMuscular": {
      "titulo": "Examen de la fuerza y resistencia (Tronco y Cadera)",
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
          "id": "fuerza_core_abdominis",
          "etiqueta": "Musculatura abdominal / CORE (Transverso y Recto)"
        },
        {
          "id": "fuerza_extensores_lumbares",
          "etiqueta": "Extensores lumbares / Erectores espinales"
        },
        {
          "id": "fuerza_gluteo_mayor",
          "etiqueta": "Glúteo mayor (extensión de cadera)"
        },
        {
          "id": "fuerza_gluteo_medio",
          "etiqueta": "Glúteo medio (estabilidad lumbopélvica)"
        }
      ]
    },
    "movilidadCadera": {
      "titulo": "Test de movilidad pasiva de cadera",
      "campos": [
        {
          "id": "cadera_flexion_pasiva",
          "tipo": "select",
          "etiqueta": "Flexión pasiva de cadera",
          "opciones": [
            "Normal / Sin limitación",
            "Limitada por acortamiento de isquiotibiales",
            "Limitada por dolor lumbar",
            "No valorada"
          ]
        },
        {
          "id": "cadera_rotaciones_pasivas",
          "tipo": "select",
          "etiqueta": "Rotaciones pasivas de cadera (RI / RE)",
          "opciones": [
            "Libres y simétricas",
            "Limitación en rotación interna",
            "Limitación en rotación externa",
            "No valorada"
          ]
        },
        {
          "id": "cadera_extension_pasiva",
          "tipo": "select",
          "etiqueta": "Extensión pasiva (Test de Thomas / Psoas)",
          "opciones": [
            "Normal",
            "Acortamiento de Psoas ilíaco",
            "No valorada"
          ]
        }
      ]
    },
    "sensibilidad": {
      "titulo": "Sensibilidad y exploración neurológica clínica",
      "campo": {
        "id": "sensibilidad_estado",
        "tipo": "select",
        "etiqueta": "Exploración sensitiva/motora en dermatomas L1-S1",
        "opciones": [
          "Normal (sin déficit clínico)",
          "Signos deficitarios presentes (Criterio de exclusión)",
          "No valorada"
        ]
      },
      "campoObservaciones": {
        "id": "sensibilidad_obs",
        "tipo": "texto",
        "etiqueta": "Observaciones (Descartar compromiso de raíz nerviosa, parestesias o hipoestesia)"
      }
    },
    "testsEspecificos": {
      "titulo": "Tests específicos neurodinámicos",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_slr",
          "nombre": "Test de Elevación de la Pierna Recta (SLR / Lasègue)",
          "estructura": "Mecanoneurosensibilidad del nervio ciático (L4-S2)",
          "ayuda": "Elevación pasiva de la pierna extendida en supino. Medir el ángulo y los síntomas provocados. Positivo si reproduce el dolor radicular por debajo de los 60°."
        },
        {
          "id": "test_slump",
          "nombre": "Test de Slump",
          "estructura": "Tensión del tejido nervioso del eje neuraxial",
          "ayuda": "Paciente sentado con pies colgando; realizar flexión dorsal/lumbar, mentón al pecho, extensión de rodilla y dorsiflexión de tobillo. Positivo si reproduce los síntomas radiculares conocidos y se modifica al liberar la flexión cervical."
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
        "texto": "Se pautan ejercicios domiciliarios (control motor, activación de CORE, potenciación de glúteos y movilización lumbar/cadera) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_estilo_vida_autocuidado",
        "texto": "Se fomenta la caminata diaria, la evitación del reposo en cama y pautas de higiene postural para promocionar el autocuidado."
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
