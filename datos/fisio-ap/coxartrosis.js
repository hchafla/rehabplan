window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['coxartrosis'] = {
  "id": "coxartrosis",
  "nombre": "Cadera - Coxartrosis",
  "fuente": "Protocolo de actuación SCS · Coxartrosis (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Mejorar la calidad de vida del usuario.",
      "Aumentar su capacidad funcional.",
      "Disminuir los síntomas de su patología de cadera."
    ],
    "especificos": [
      "Disminuir el dolor.",
      "Mantener y mejorar la movilidad (amplitud articular).",
      "Mantener y mejorar la fuerza (balance muscular).",
      "Mantener y mejorar la flexibilidad.",
      "Estabilizar la pelvis y corregir defectos de la estática.",
      "Educación sanitaria del usuario para autogestionar su tratamiento y poder prevenir complicaciones y recidivas.",
      "Fomentar cambios en el estilo de vida y la adherencia a las indicaciones terapéuticas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Usuarios diagnosticados de coxartrosis leve - moderada (Grados I y II de KELLGREN Y LAWRENCE).",
      "Usuarios con deambulación independiente conservada, sin necesidad de la presencia de personal auxiliar.",
      "Aceptación y colaboración por parte del usuario del plan terapéutico a seguir."
    ],
    "criteriosExclusion": [
      "Grado inferior a 4 en la Escala de Ambulación del Sistema de Conferencia de Evaluación del Paciente (SCEP): incapacidad para desplazarse de forma autónoma a la consulta de fisioterapia.",
      "Patología aguda: traumatismo reciente y reagudización del problema.",
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: coxartrosis Grado I-II K&L)."
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
            "ayuda": "¿Cuándo y cómo empezó? Ej.: insidioso desde hace meses/años, rigidez progresiva..."
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución",
            "ayuda": "¿Ha empeorado progresivamente, presenta episodios de reagudización, estabilidad...?"
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "Tratamientos ya realizados: AINEs, analgésicos, infiltraciones intraarticulares, fisioterapia previa, uso de bastón..."
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
            "etiqueta": "Localización y dolor referido",
            "ayuda": "Ingle, cara anterior del muslo, región trocantérea, glúteo, dolor referido a la rodilla..."
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
            "etiqueta": "Características / Rigidez",
            "ayuda": "Mecánico, rigidez matutina o tras reposo (rigidez de puesta en marcha), sordo..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: deambulación prolongada, cargar peso, ponerse en pie tras sedestación, cruzarse de piernas..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo en descarga, calor local, analgesia..."
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
        "id": "escalaWomac",
        "titulo": "Cuestionario WOMAC (Dolor / Rigidez / Capacidad funcional - ANEXO IV)",
        "tipo": "escalaPuntuada",
        "escala": {
          "id": "womac",
          "titulo": "Cuestionario WOMAC (Dolor / Rigidez / Capacidad funcional - ANEXO IV)",
          "tituloGuia": "Información y administración del WOMAC",
          "tituloTexto": "CUESTIONARIO WOMAC",
          "fraseTexto": "Resultado del cuestionario WOMAC: {valor}.",
          "fuente": "protocolo",
          "recursoDescargable": {
            "etiqueta": "WOMAC (versión imprimible)",
            "archivo": "pdf/womac.pdf"
          },
          "guiaHTML": "<p><b>Administración del WOMAC:</b> entregar el cuestionario al paciente y comprobar que se ha cumplimentado correctamente. Si se administra mediante entrevista, leer las preguntas y opciones de respuesta sin inducir la elección. Registrar la puntuación conforme a las instrucciones de la versión utilizada.</p><p>Esta versión (adaptación española para artrosis de cadera y rodilla) tiene <b>24 ítems</b> con cinco casillas por pregunta, de izquierda a derecha: <b>0</b> (Ninguno/Ninguna) a <b>4</b> (Muchísimo/Muchísima). La calculadora suma cada apartado: <b>Dolor</b> (5 ítems, máximo 20), <b>Rigidez</b> (2 ítems, máximo 8) y <b>Capacidad funcional</b> (17 ítems, máximo 68), y el <b>total</b> (máximo 96).</p><p><i>Solo se puntúa un apartado cuando está completo, y el total solo cuando están los 24 ítems. No se normaliza ni se asignan categorías: si tu versión indica otra forma de registro, edítalo en <code>guiaHTML</code>.</i></p>",
          "puntuacionMaxPorItem": 4,
          "subescalas": [
            {
              "id": "dolor",
              "titulo": "Apartado A · Dolor",
              "tituloTexto": "dolor",
              "instrucciones": "¿Cuánto dolor tiene? Dolor notado en caderas y/o rodillas en los últimos 2 días, en cada situación.",
              "items": [
                {
                  "id": "w_a1",
                  "etiqueta": "A1. Al andar por un terreno llano.",
                  "opciones": [
                    "Ninguno",
                    "Poco",
                    "Bastante",
                    "Mucho",
                    "Muchísimo"
                  ]
                },
                {
                  "id": "w_a2",
                  "etiqueta": "A2. Al subir o bajar escaleras.",
                  "opciones": [
                    "Ninguno",
                    "Poco",
                    "Bastante",
                    "Mucho",
                    "Muchísimo"
                  ]
                },
                {
                  "id": "w_a3",
                  "etiqueta": "A3. Por la noche en la cama.",
                  "opciones": [
                    "Ninguno",
                    "Poco",
                    "Bastante",
                    "Mucho",
                    "Muchísimo"
                  ]
                },
                {
                  "id": "w_a4",
                  "etiqueta": "A4. Al estar sentado o tumbado.",
                  "opciones": [
                    "Ninguno",
                    "Poco",
                    "Bastante",
                    "Mucho",
                    "Muchísimo"
                  ]
                },
                {
                  "id": "w_a5",
                  "etiqueta": "A5. Al estar de pie.",
                  "opciones": [
                    "Ninguno",
                    "Poco",
                    "Bastante",
                    "Mucho",
                    "Muchísimo"
                  ]
                }
              ]
            },
            {
              "id": "rigidez",
              "titulo": "Apartado B · Rigidez",
              "tituloTexto": "rigidez",
              "instrucciones": "Rigidez (no dolor): sensación de dificultad inicial para mover con facilidad las articulaciones, en los últimos 2 días.",
              "items": [
                {
                  "id": "w_b1",
                  "etiqueta": "B1. ¿Cuánta rigidez nota después de despertarse por la mañana?",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_b2",
                  "etiqueta": "B2. ¿Cuánta rigidez nota durante el resto del día después de estar sentado, tumbado o descansando?",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                }
              ]
            },
            {
              "id": "funcion",
              "titulo": "Apartado C · Capacidad funcional",
              "tituloTexto": "capacidad funcional",
              "instrucciones": "¿Qué grado de dificultad tiene al...? Dificultad notada en los últimos 2 días como consecuencia de la artrosis.",
              "items": [
                {
                  "id": "w_c1",
                  "etiqueta": "C1. Bajar las escaleras.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c2",
                  "etiqueta": "C2. Subir las escaleras.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c3",
                  "etiqueta": "C3. Levantarse después de estar sentado.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c4",
                  "etiqueta": "C4. Estar de pie.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c5",
                  "etiqueta": "C5. Agacharse para coger algo del suelo.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c6",
                  "etiqueta": "C6. Andar por un terreno llano.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c7",
                  "etiqueta": "C7. Entrar y salir de un coche.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c8",
                  "etiqueta": "C8. Ir de compras.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c9",
                  "etiqueta": "C9. Ponerse las medias o los calcetines.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c10",
                  "etiqueta": "C10. Levantarse de la cama.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c11",
                  "etiqueta": "C11. Quitarse las medias o los calcetines.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c12",
                  "etiqueta": "C12. Estar tumbado en la cama.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c13",
                  "etiqueta": "C13. Entrar y salir de la ducha/bañera.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c14",
                  "etiqueta": "C14. Estar sentado.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c15",
                  "etiqueta": "C15. Sentarse y levantarse del retrete.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c16",
                  "etiqueta": "C16. Hacer tareas domésticas pesadas.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                },
                {
                  "id": "w_c17",
                  "etiqueta": "C17. Hacer tareas domésticas ligeras.",
                  "opciones": [
                    "Ninguna",
                    "Poca",
                    "Bastante",
                    "Mucha",
                    "Muchísima"
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "id": "historiaLaboral",
        "titulo": "Historia laboral",
        "tipo": "checklist",
        "ayuda": "Marca las opciones que apliquen a su puesto de trabajo o modo de ejecución.",
        "opciones": [
          {
            "id": "laboral_bipedestacion",
            "etiqueta": "Bipedestación prolongada",
            "fraseTexto": "bipedestación prolongada"
          },
          {
            "id": "laboral_marcha_distancia",
            "etiqueta": "Deambulación frecuente / largas distancias",
            "fraseTexto": "deambulación continua o trayectos largos"
          },
          {
            "id": "laboral_cargas",
            "etiqueta": "Manipulación de cargas",
            "fraseTexto": "manipulación o elevación de cargas"
          },
          {
            "id": "laboral_sedestacion_mantenida",
            "etiqueta": "Sedestación prolongada",
            "fraseTexto": "sedestación mantenida"
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
        "ayuda": "Marca las actividades de la vida diaria afectadas por la coxartrosis.",
        "opciones": [
          {
            "id": "avd_calzado",
            "etiqueta": "Ponerse calcetines / calzado / cortarse las uñas",
            "fraseTexto": "ponerse el calzado/calcetines o el cuidado de los pies"
          },
          {
            "id": "avd_incorporarse",
            "etiqueta": "Levantarse de sillas bajas / inodoro",
            "fraseTexto": "incorporarse desde posiciones bajas de sedestación"
          },
          {
            "id": "avd_escaleras",
            "etiqueta": "Subir / bajar escaleras",
            "fraseTexto": "subir o bajar escaleras"
          },
          {
            "id": "avd_marcha",
            "etiqueta": "Caminar trayectos prolongados",
            "fraseTexto": "caminar trayectos largos"
          },
          {
            "id": "avd_higiene",
            "etiqueta": "Entrar / salir de la bañera",
            "fraseTexto": "acceder a la bañera o ducha"
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
          "id": "insp_deformidad_dismetria",
          "tipo": "texto",
          "etiqueta": "Deformidades / Dismetría de miembros inferiores",
          "ayuda": "Ej.: Dismetría aparente/real, actitud en flexión-rotación externa de cadera..."
        },
        {
          "id": "insp_inflamacion",
          "tipo": "tristate",
          "etiqueta": "Inflamación / Tumefacción en región inguinal o trocantérea"
        },
        {
          "id": "insp_dolor_palpacion",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación (triángulo de Scarpa, trocánter mayor, glúteos)"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: crepitación o roces articulares, acortamiento muscular..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Cadera)",
      "notaFuente": "Evaluación del rango articular en los tres planos. Típica restricción patológica en patrón capsular (rotación interna y flexión).",
      "movimientos": [
        {
          "id": "mov_flexion_cadera",
          "etiqueta": "Flexión de cadera",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_extension_cadera",
          "etiqueta": "Extensión de cadera",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_abduccion_cadera",
          "etiqueta": "Abducción de cadera",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_aduccion_cadera",
          "etiqueta": "Aducción de cadera",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_rotacion_interna",
          "etiqueta": "Rotación interna de cadera",
          "categorias": [
            "No valorada",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_rotacion_externa",
          "etiqueta": "Rotación externa de cadera",
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
        "ayuda": "Ej.: tope duro articular, dolor al final del rango en rotación interna, maniobra de Thomas..."
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
          "id": "fuerza_gluteo_medio",
          "etiqueta": "Abducción de cadera"
        },
        {
          "id": "fuerza_gluteo_mayor",
          "etiqueta": "Extensión de cadera"
        },
        {
          "id": "fuerza_psoas_iliaco",
          "etiqueta": "Flexión de cadera"
        },
        {
          "id": "fuerza_aductores",
          "etiqueta": "Aducción de cadera"
        },
        {
          "id": "fuerza_cuadriceps",
          "etiqueta": "Extensión de rodilla"
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
            "Signo de Trendelenburg (insuficiencia de glúteo medio)",
            "Claudicación / Cojera por acortamiento",
            "No valorada"
          ]
        },
        {
          "id": "marcha_scep_grado",
          "tipo": "select",
          "etiqueta": "Grado SCEP (Escala de Ambulación)",
          "opciones": [
            "Grado 4 (Deambulación independiente en comunidad)",
            "Grado 5 (Deambulación independiente sin restricciones)",
            "Inferior a Grado 4 (Criterio de exclusión)"
          ]
        },
        {
          "id": "marcha_productos_apoyo",
          "tipo": "select",
          "etiqueta": "Productos de apoyo",
          "opciones": [
            "Sin productos de apoyo",
            "Bastón en lado contralateral",
            "Bastón en lado homolateral",
            "Dos bastones / muletas",
            "Otros"
          ]
        },
        {
          "id": "marcha_observaciones",
          "tipo": "texto",
          "etiqueta": "Observaciones de la marcha",
          "ayuda": "Ej.: inclinación del tronco hacia el lado afecto (Duchenne), velocidad disminuida..."
        }
      ]
    },
    "actitudPostural": {
      "titulo": "Actitud postural general y estática pélvica",
      "campo": {
        "id": "actitud_postural",
        "tipo": "texto",
        "etiqueta": "Actitud postural general (basculación pélvica, anteversión/retroversión, hiperlordosis compensatoria)"
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
        "texto": "Se pautan ejercicios domiciliarios (fortalecimiento de glúteo medio/mayor, movilidad en descarga y estiramientos) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_estilo_vida_apoyo",
        "texto": "Se asesora sobre control del peso corporal, uso adecuado de bastón contralateral e higiene postural en las AVD."
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
