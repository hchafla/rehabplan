window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['fascitis-plantar'] = {
  "id": "fascitis-plantar",
  "nombre": "Pie - Fascitis plantar",
  "fuente": "Protocolo de actuación SCS · Fascitis plantar (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Mejorar la calidad de vida del paciente.",
      "Disminuir los síntomas de su problema de salud."
    ],
    "especificos": [
      "Disminuir/aliviar el dolor.",
      "Reducir la inflamación.",
      "Reeducar la estabilidad.",
      "Mejorar la propiocepción.",
      "Educar al paciente en técnicas de protección articular de tobillo/pie.",
      "Enseñar plan de ejercicios para la mejoría y el mantenimiento de la movilidad, fuerza y funcionalidad.",
      "Evitar recidivas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Usuarios con diagnóstico médico de Fascitis Plantar.",
      "Aceptación y colaboración por parte del usuario del plan terapéutico a seguir."
    ],
    "criteriosExclusion": [
      "Fascitis plantar secundaria a alguna intervención quirúrgica.",
      "Presencia de problemas circulatorios importantes (linfedema, insuficiencia venosa periférica, insuficiencia arterial, trombosis venosa profunda...)."
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: fascitis plantar derecha, talalgia)."
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
        "titulo": "Historia de la enfermedad",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "lesion_inicio",
            "tipo": "texto",
            "etiqueta": "Inicio e historia",
            "ayuda": "¿Cuándo y cómo empezó? Ej.: insidioso tras cambio de calzado, sobrecarga por actividad..."
          },
          {
            "id": "lesion_evolucion",
            "tipo": "texto_area",
            "etiqueta": "Evolución y exacerbaciones",
            "ayuda": "¿Ha empeorado progresivamente, cursa con picos de dolor matutino, estabilidad...?"
          },
          {
            "id": "lesion_tratamientos_previos",
            "tipo": "texto_area",
            "etiqueta": "Tratamientos previos",
            "ayuda": "Tratamientos ya realizados: AINEs, plantillas/ortesis, taloneras de silicona, infiltraciones, frío local, fisioterapia previa…"
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
        "titulo": "Historia del dolor (ANEXO VI - EVA)",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "dolor_localizacion",
            "tipo": "texto",
            "etiqueta": "Localización e irradiación",
            "ayuda": "Tubérculo anteromedial del calcáneo, arco plantar longitudinal, irradiación a metatarsos..."
          },
          {
            "id": "dolor_intensidad",
            "tipo": "numero",
            "etiqueta": "Intensidad (EVA 0-10)",
            "min": 0,
            "max": 10,
            "ayuda": "Escala Visual Analógica de 0 (sin dolor) a 10 (el peor dolor imaginable)."
          },
          {
            "id": "dolor_caracteristicas",
            "tipo": "texto",
            "etiqueta": "Características / Cronología",
            "ayuda": "Dolor punzante en los primeros pasos de la mañana ('dolor de arranque'), sordo tras bipedestación prolongada..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: primeros pasos al levantarse de la cama o tras sedestación, bipedestación prolongada, caminar descalzo..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo en descarga, calzado con amortiguación/drop, masaje con botella/frío local, estiramiento..."
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
            "id": "laboral_bipedestacion",
            "etiqueta": "Bipedestación estática prolongada",
            "fraseTexto": "bipedestación prolongada en superficies duras"
          },
          {
            "id": "laboral_marcha_frecuente",
            "etiqueta": "Deambulación continua / desplazamientos largos",
            "fraseTexto": "deambulación continua o largas caminatas"
          },
          {
            "id": "laboral_calzado_inadecuado",
            "etiqueta": "Uso de calzado de seguridad o suela dura/plana",
            "fraseTexto": "uso de calzado de seguridad o de suela rígida/plana"
          },
          {
            "id": "laboral_cargas",
            "etiqueta": "Manipulación y transporte de cargas",
            "fraseTexto": "manipulación de cargas pesadas"
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
        "ayuda": "Marca las actividades cotidianas afectadas por la fascitis.",
        "opciones": [
          {
            "id": "avd_primeros_pasos",
            "etiqueta": "Primeros pasos matutinos / tras estar sentado",
            "fraseTexto": "iniciar la marcha al levantarse"
          },
          {
            "id": "avd_marcha",
            "etiqueta": "Caminar trayectos medios/largos",
            "fraseTexto": "caminar trayectos prolongados"
          },
          {
            "id": "avd_descalzo",
            "etiqueta": "Caminar descalzo o en casa",
            "fraseTexto": "caminar descalzo o con calzado plano de casa"
          },
          {
            "id": "avd_escaleras",
            "etiqueta": "Subir / bajar escaleras (apoyo en antepié)",
            "fraseTexto": "subir o bajar escaleras"
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
            "ayuda": "Carrera a pie (running), senderismo, baile, deportes de salto o impacto..."
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
        "id": "comorbilidadesCirculacion",
        "titulo": "Comorbilidades y estado vascular/circulatorio",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "comorbilidades",
            "tipo": "texto",
            "etiqueta": "Comorbilidades (Diabetes, sobrepeso/obesidad...)",
            "ayuda": "Indicar patologías asociadas relevante para el pronóstico y manejo."
          },
          {
            "id": "estado_circulatorio",
            "tipo": "texto",
            "etiqueta": "Descarte de problemas circulatorios severos",
            "ayuda": "Confirmar ausencia de linfedema, IVP, insuficiencia arterial o TVP (Criterio de exclusión)."
          }
        ],
        "gruposNarrativos": [
          {
            "fragmentos": [
              {
                "campo": "comorbilidades",
                "texto": "Comorbilidades: {valor}"
              }
            ],
            "sufijo": "."
          },
          {
            "fragmentos": [
              {
                "campo": "estado_circulatorio",
                "texto": "Valoración vascular/circulatoria: {valor}"
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
      "titulo": "Inspección, palpación y alineación del pie",
      "campos": [
        {
          "id": "insp_alineacion_pie",
          "tipo": "select",
          "etiqueta": "Posición en bipedestación y alineación del pie",
          "opciones": [
            "Alineación neutra",
            "Pie plano / Pronación excesiva del retropié",
            "Pie cavo / Supinación del retropié",
            "Otras deaxaciones (ej.: hallux valgus)"
          ]
        },
        {
          "id": "insp_dolor_palpacion_calcaneo",
          "tipo": "tristate",
          "etiqueta": "Dolor exquisito a la palpación en tubérculo anteromedial del calcáneo"
        },
        {
          "id": "insp_dolor_palpacion_fascia",
          "tipo": "tristate",
          "etiqueta": "Dolor / Engrosamiento a la palpación de la banda central de la fascia plantar"
        },
        {
          "id": "insp_inflamacion_edema",
          "tipo": "tristate",
          "etiqueta": "Presencia de edemas o tumefacción local"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: acortamiento de la cadena posterior, hiperqueratosis plantar..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Tobillo, Subastragalina y Primer Radio)",
      "notaFuente": "Evaluación del rango articular. Esencial valorar la restricción en dorsiflexión de tobillo y la extensión del hallux.",
      "movimientos": [
        {
          "id": "mov_flexion_dorsal_tobillo",
          "etiqueta": "Dorsiflexión de tobillo (con rodilla extendida / acortamiento gemelos)",
          "categorias": [
            "No valorada",
            "Limitación severa (<0°)",
            "Limitación moderada (0-10°)",
            "Limitación leve",
            "Sin limitación (>15°)"
          ]
        },
        {
          "id": "mov_extension_hallux",
          "etiqueta": "Extensión del 1º dedo / Hallux",
          "categorias": [
            "No valorada",
            "Limitación severa / Rigidez",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_subastragalina",
          "etiqueta": "Movilidad subastragalina (Inversión / Eversión)",
          "categorias": [
            "No valorada",
            "Limitada / Bloqueada",
            "Sin limitación"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad",
        "ayuda": "Ej.: test de Silfverskiöld positivo (restricción exclusiva de gemelos), tensión en la fascia al extender el hallux…"
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
          "id": "fuerza_intrínseca_pie",
          "etiqueta": "Musculatura intrínseca del pie (flexor corto de los dedos, aductor del hálux)"
        },
        {
          "id": "fuerza_triceps_sural",
          "etiqueta": "Tríceps sural (Gastrocnemios y Sóleo)"
        },
        {
          "id": "fuerza_tibial_posterior",
          "etiqueta": "Tibial posterior (soporte del arco plantar)"
        },
        {
          "id": "fuerza_peroneos",
          "etiqueta": "Peroneos lateral largo y corto"
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
            "Marcha antiálgica con evitación del choque inicial de talón",
            "Marcha en equino relativo / apurada fase de apoyo",
            "Pronación excesiva durante la fase media de apoyo",
            "No valorada"
          ]
        },
        {
          "id": "marcha_observaciones",
          "tipo": "texto",
          "etiqueta": "Observaciones de la marcha",
          "ayuda": "Ej.: supresión del despegue digital, claudicación por dolor en choque de talón..."
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
        "etiqueta": "Sensibilidad dermatomas / nervios periféricos",
        "opciones": [
          "Normal",
          "Alterada",
          "No valorada"
        ]
      },
      "campoObservaciones": {
        "id": "sensibilidad_obs",
        "tipo": "texto",
        "etiqueta": "Observaciones (descartar atrapamiento del nervio plantar lateral / Baxter)",
        "ayuda": "Comprobar parestesias o disestesias en planta/talón."
      }
    },
    "testsEspecificos": {
      "titulo": "Tests específicos",
      "fuente": "protocolo",
      "tests": [
        {
          "id": "test_compresion_talon",
          "nombre": "Prueba de compresión del talón (Heel Squeeze Test)",
          "estructura": "Calcáneo / Diagnóstico diferencial de dolor de talón",
          "ayuda": "El fisioterapeuta ejerce presión bimanual sobre ambos lados del calcáneo utilizando las eminencias tenares. Positivo: aparición de dolor agudo (orienta a dolor óseo/fractura por estrés del calcáneo o patología de la almohadilla grasa)."
        },
        {
          "id": "test_windlass",
          "nombre": "Prueba de Windlass (Mecanismo de Windlass)",
          "estructura": "Fascia plantar / Tensión biomecánica",
          "ayuda": "Dorsiflexión pasiva del primer dedo en carga y/o en descarga. Positivo: provocación o reproducción del dolor característico en la inserción calcánea de la fascia plantar."
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
        "texto": "Se pautan ejercicios domiciliarios (estiramientos específicos de la fascia plantar y cadena posterior, automasaje con rodillo/frío y fortalecimiento de intrínsecos del pie) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_proteccion_calzado",
        "texto": "Se pautan educación sobre técnicas de protección articular, calzado adecuado (evitar calzado plano/descalzo) y dosificación de cargas."
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
