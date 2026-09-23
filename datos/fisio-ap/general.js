window.FISIOAP_GENERAL = {
  "criteriosDerivacionGenerales": {
    "fuente": "protocolo",
    "clinicosInclusion": [
      {
        "zona": "Hombro",
        "items": [
          "Tendinopatías del hombro"
        ]
      },
      {
        "zona": "Codo",
        "items": [
          "Epicondilalgias"
        ]
      },
      {
        "zona": "Rodilla",
        "items": [
          "Gonartrosis",
          "Síndrome de dolor fémoro-patelar",
          "Tendinitis rotuliana",
          "Tendinitis anserina o pata de ganso"
        ]
      },
      {
        "zona": "Cadera",
        "items": [
          "Coxartrosis"
        ]
      },
      {
        "zona": "Tobillo",
        "items": [
          "Esguince de tobillo"
        ]
      },
      {
        "zona": "Pie",
        "items": [
          "Fascitis plantar"
        ]
      },
      {
        "zona": "Algias vertebrales",
        "items": [
          "Cervicalgia",
          "Lumbalgia"
        ]
      },
      {
        "zona": "EPOC",
        "items": []
      }
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
        {
          "id": "indiv_centro",
          "tipo": "texto",
          "etiqueta": "Centro de salud",
          "ayuda": "Tu centro de salud. Se recuerda entre sesiones (no es un dato del paciente).",
          "persistirLocal": true
        },
        {
          "id": "indiv_motivo_diagnostico",
          "tipo": "texto",
          "etiqueta": "Motivo / diagnóstico",
          "ayuda": "Motivo de la sesión o diagnóstico de base, en pocas palabras. Ej.: tendinopatía de hombro."
        }
      ],
      "plantilla": {
        "campoCentro": "indiv_centro",
        "base": "Sesión de seguimiento fisioterapéutico",
        "fragmentoCentro": " en el C.S. {valor}",
        "clausulas": [
          {
            "campo": "indiv_motivo_diagnostico",
            "texto": "por {valor}"
          }
        ],
        "union": " ",
        "sufijo": "."
      }
    },
    "anamnesis": {
      "campos": [
        {
          "id": "indiv_evolucion",
          "tipo": "opciones",
          "etiqueta": "Evolución",
          "opciones": [
            "Mejor",
            "Igual",
            "Peor"
          ],
          "ayuda": "Evolución percibida respecto a la sesión anterior."
        },
        {
          "id": "indiv_dolor_actual",
          "tipo": "numero",
          "etiqueta": "Dolor actual (EVA 0-10)",
          "min": 0,
          "max": 10,
          "ayuda": "Escala de 0 (sin dolor) a 10 (el peor dolor imaginable)."
        },
        {
          "id": "indiv_cambios_relevantes",
          "tipo": "texto_area",
          "etiqueta": "Cambios relevantes desde la última sesión",
          "ayuda": "Cualquier cambio digno de mención que no quede recogido en los demás campos."
        },
        {
          "id": "indiv_adherencia",
          "tipo": "opciones",
          "etiqueta": "Adherencia a ejercicios/recomendaciones",
          "opciones": [
            "Sí",
            "Parcial",
            "No"
          ],
          "ayuda": "¿Ha seguido las pautas dadas en la sesión anterior?"
        },
        {
          "id": "indiv_dificultades",
          "tipo": "opciones",
          "etiqueta": "Dificultades con los ejercicios",
          "opciones": [
            "Ninguna",
            "Dolor",
            "Dificultad técnica",
            "Falta de tiempo",
            "Otro"
          ],
          "ayuda": "Motivo principal si no ha podido seguir bien los ejercicios."
        },
        {
          "id": "indiv_incidencias_sino",
          "tipo": "binario",
          "etiqueta": "Incidencias o síntomas nuevos",
          "ayuda": "¿Ha aparecido algo nuevo desde la última sesión?"
        },
        {
          "id": "indiv_incidencias_detalle",
          "tipo": "texto",
          "etiqueta": "Detalle de la incidencia (si aplica)",
          "ayuda": "Solo si has marcado \"Sí\" arriba."
        },
        {
          "id": "indiv_objetivo_demanda",
          "tipo": "texto",
          "etiqueta": "Objetivo o demanda actual del paciente",
          "ayuda": "Qué es lo que más le preocupa o pide el paciente en este momento."
        }
      ],
      "gruposNarrativos": [
        {
          "tipo": "mapaFrases",
          "campo": "indiv_evolucion",
          "frases": {
            "Mejor": "Refiere mejoría respecto a la sesión anterior, con disminución del dolor.",
            "Igual": "Refiere una situación similar a la sesión anterior, sin cambios significativos en el dolor.",
            "Peor": "Refiere empeoramiento respecto a la sesión anterior, con aumento del dolor."
          }
        },
        {
          "fragmentos": [
            {
              "campo": "indiv_dolor_actual",
              "texto": "Dolor actual {valor}/10"
            }
          ],
          "sufijo": "."
        },
        {
          "fragmentos": [
            {
              "campo": "indiv_cambios_relevantes",
              "texto": "{valor}"
            }
          ],
          "sufijo": "."
        },
        {
          "tipo": "mapaFrases",
          "campo": "indiv_adherencia",
          "frases": {
            "Sí": "Ha realizado los ejercicios pautados con buena adherencia.",
            "Parcial": "Ha realizado los ejercicios pautados con adherencia parcial.",
            "No": "No ha realizado los ejercicios pautados."
          }
        },
        {
          "tipo": "mapaFrases",
          "campo": "indiv_dificultades",
          "frases": {
            "Ninguna": "No refiere dificultades para realizar los ejercicios.",
            "Dolor": "Refiere dificultad para realizar los ejercicios pautados por incremento de la sintomatología.",
            "Dificultad técnica": "Refiere dificultad técnica para realizar correctamente los ejercicios pautados.",
            "Falta de tiempo": "Refiere no haber podido realizar los ejercicios pautados por falta de tiempo.",
            "Otro": "Refiere otras dificultades para realizar los ejercicios pautados."
          }
        },
        {
          "tipo": "binarioDetalle",
          "campo": "indiv_incidencias_sino",
          "campoDetalle": "indiv_incidencias_detalle",
          "textoNo": "No refiere incidencias ni aparición de nuevos síntomas.",
          "textoSiConDetalle": "Refiere aparición de nuevos síntomas o incidencias: {valor}.",
          "textoSiSinDetalle": "Refiere aparición de nuevos síntomas o incidencias."
        },
        {
          "fragmentos": [
            {
              "campo": "indiv_objetivo_demanda",
              "texto": "Como objetivo o demanda actual, refiere {valor}"
            }
          ],
          "sufijo": "."
        }
      ]
    },
    "planActuacion": {
      "intervenciones": {
        "titulo": "Intervenciones realizadas",
        "opciones": [
          {
            "id": "indiv_int_manual",
            "etiqueta": "Terapia manual",
            "fraseTexto": "terapia manual"
          },
          {
            "id": "indiv_int_ejercicio",
            "etiqueta": "Ejercicio terapéutico",
            "fraseTexto": "ejercicio terapéutico"
          },
          {
            "id": "indiv_int_puncion",
            "etiqueta": "Punción seca",
            "fraseTexto": "punción seca"
          },
          {
            "id": "indiv_int_electro",
            "etiqueta": "Electroterapia",
            "fraseTexto": "electroterapia"
          },
          {
            "id": "indiv_int_termo",
            "etiqueta": "Termoterapia/crioterapia",
            "fraseTexto": "termoterapia/crioterapia"
          },
          {
            "id": "indiv_int_vendaje",
            "etiqueta": "Vendaje",
            "fraseTexto": "vendaje"
          },
          {
            "id": "indiv_int_educacion",
            "etiqueta": "Educación sanitaria",
            "fraseTexto": "educación sanitaria"
          }
        ],
        "otro": {
          "id": "indiv_int_otras",
          "etiqueta": "Otras"
        },
        "prefijoTexto": "En la sesión de hoy se ha realizado ",
        "sufijoTexto": "."
      },
      "respuesta": {
        "campo": {
          "id": "indiv_respuesta",
          "tipo": "opciones",
          "etiqueta": "Respuesta a la sesión",
          "opciones": [
            "Buena tolerancia",
            "Mejoría",
            "Sin cambios relevantes",
            "Mala tolerancia",
            "No valorable"
          ]
        },
        "frases": {
          "Buena tolerancia": "El paciente ha mostrado buena tolerancia a la sesión.",
          "Mejoría": "Se objetiva mejoría tras la sesión.",
          "Sin cambios relevantes": "No se objetivan cambios relevantes tras la sesión.",
          "Mala tolerancia": "El paciente ha mostrado mala tolerancia a la sesión.",
          "No valorable": "La respuesta a la sesión no es valorable en este momento."
        }
      },
      "continuidad": {
        "campo": {
          "id": "indiv_continuidad",
          "tipo": "opciones",
          "etiqueta": "Continuidad",
          "opciones": [
            "Nueva sesión individual",
            "Continúa en sesiones grupales",
            "Finaliza seguimiento / Alta",
            "Otra"
          ]
        },
        "frases": {
          "Nueva sesión individual": "Se programa nueva sesión individual.",
          "Continúa en sesiones grupales": "Continúa tratamiento en sesiones grupales.",
          "Finaliza seguimiento / Alta": "Finaliza el seguimiento fisioterapéutico. Alta.",
          "Otra": "Se decide otra actuación (ver notas)."
        }
      },
      "notasCampo": {
        "id": "indiv_plan_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras indicaciones",
        "ayuda": "Cualquier matiz adicional sobre el plan que no encaje arriba."
      }
    }
  },
  "normativaDinamometria": {
    "steiber2016": {
      "fuente": {
        "autor": "Steiber N",
        "anio": 2016,
        "revista": "PLOS ONE",
        "doi": "10.1371/journal.pone.0163917",
        "cita": "Steiber N. Strong or Weak Handgrip? Normative Reference Values for the German Population across the Life Course Stratified by Sex, Age, and Body Height. PLOS ONE. 2016;11(10):e0163917.",
        "notaMetodologica": "Los valores mostrados corresponden a una referencia poblacional publicada basada en dinamometría Smedley y estratificada por sexo, edad y talla. No constituyen por sí mismos un criterio diagnóstico."
      },
      "instrumento": "Smedley S Dynamometer TMM Tokio 100kg",
      "nombreVisible": "Valores de referencia publicados para dinamometría Smedley",
      "gruposEdad": [
        "17-19",
        "20-24",
        "25-29",
        "30-34",
        "35-39",
        "40-44",
        "45-49",
        "50-54",
        "55-59",
        "60-64",
        "65-69",
        "70-74",
        "75-79",
        "80-90"
      ],
      "hombres": {
        "gruposTalla": [
          "160-164",
          "165-169",
          "170-174",
          "175-179",
          "180-184",
          "185-189",
          "190+"
        ],
        "tallaMinCm": 160,
        "tallaMaxCm": 200,
        "valores": {
          "17-19": {
            "160-164": {
              "media": 44.6,
              "umbralRiesgo": 34.9
            },
            "165-169": {
              "media": 45.1,
              "umbralRiesgo": 35.4
            },
            "170-174": {
              "media": 46.5,
              "umbralRiesgo": 36.9
            },
            "175-179": {
              "media": 47.5,
              "umbralRiesgo": 37.8
            },
            "180-184": {
              "media": 48.5,
              "umbralRiesgo": 38.8
            },
            "185-189": {
              "media": 49.3,
              "umbralRiesgo": 39.6
            },
            "190+": {
              "media": 50.4,
              "umbralRiesgo": 40.7
            }
          },
          "20-24": {
            "160-164": {
              "media": 47.0,
              "umbralRiesgo": 38.8
            },
            "165-169": {
              "media": 47.8,
              "umbralRiesgo": 39.5
            },
            "170-174": {
              "media": 49.1,
              "umbralRiesgo": 40.8
            },
            "175-179": {
              "media": 50.3,
              "umbralRiesgo": 42.0
            },
            "180-184": {
              "media": 51.2,
              "umbralRiesgo": 42.9
            },
            "185-189": {
              "media": 51.8,
              "umbralRiesgo": 43.5
            },
            "190+": {
              "media": 52.7,
              "umbralRiesgo": 44.4
            }
          },
          "25-29": {
            "160-164": {
              "media": 49.4,
              "umbralRiesgo": 41.1
            },
            "165-169": {
              "media": 49.9,
              "umbralRiesgo": 41.6
            },
            "170-174": {
              "media": 50.9,
              "umbralRiesgo": 42.6
            },
            "175-179": {
              "media": 51.9,
              "umbralRiesgo": 43.6
            },
            "180-184": {
              "media": 52.8,
              "umbralRiesgo": 44.5
            },
            "185-189": {
              "media": 54.2,
              "umbralRiesgo": 45.9
            },
            "190+": {
              "media": 56.2,
              "umbralRiesgo": 47.9
            }
          },
          "30-34": {
            "160-164": {
              "media": 51.1,
              "umbralRiesgo": 42.8
            },
            "165-169": {
              "media": 51.8,
              "umbralRiesgo": 43.5
            },
            "170-174": {
              "media": 52.6,
              "umbralRiesgo": 44.3
            },
            "175-179": {
              "media": 53.5,
              "umbralRiesgo": 45.2
            },
            "180-184": {
              "media": 54.5,
              "umbralRiesgo": 46.2
            },
            "185-189": {
              "media": 55.9,
              "umbralRiesgo": 47.6
            },
            "190+": {
              "media": 57.3,
              "umbralRiesgo": 49.0
            }
          },
          "35-39": {
            "160-164": {
              "media": 47.8,
              "umbralRiesgo": 38.0
            },
            "165-169": {
              "media": 50.2,
              "umbralRiesgo": 40.4
            },
            "170-174": {
              "media": 52.0,
              "umbralRiesgo": 42.2
            },
            "175-179": {
              "media": 53.6,
              "umbralRiesgo": 43.8
            },
            "180-184": {
              "media": 54.9,
              "umbralRiesgo": 45.1
            },
            "185-189": {
              "media": 56.1,
              "umbralRiesgo": 46.3
            },
            "190+": {
              "media": 57.2,
              "umbralRiesgo": 47.5
            }
          },
          "40-44": {
            "160-164": {
              "media": 47.9,
              "umbralRiesgo": 38.6
            },
            "165-169": {
              "media": 49.9,
              "umbralRiesgo": 40.6
            },
            "170-174": {
              "media": 51.8,
              "umbralRiesgo": 42.5
            },
            "175-179": {
              "media": 53.4,
              "umbralRiesgo": 44.0
            },
            "180-184": {
              "media": 54.5,
              "umbralRiesgo": 45.2
            },
            "185-189": {
              "media": 55.8,
              "umbralRiesgo": 46.4
            },
            "190+": {
              "media": 56.9,
              "umbralRiesgo": 47.6
            }
          },
          "45-49": {
            "160-164": {
              "media": 48.2,
              "umbralRiesgo": 39.7
            },
            "165-169": {
              "media": 50.0,
              "umbralRiesgo": 41.5
            },
            "170-174": {
              "media": 51.6,
              "umbralRiesgo": 43.1
            },
            "175-179": {
              "media": 53.0,
              "umbralRiesgo": 44.4
            },
            "180-184": {
              "media": 54.2,
              "umbralRiesgo": 45.7
            },
            "185-189": {
              "media": 55.4,
              "umbralRiesgo": 46.8
            },
            "190+": {
              "media": 56.4,
              "umbralRiesgo": 47.9
            }
          },
          "50-54": {
            "160-164": {
              "media": 45.9,
              "umbralRiesgo": 37.4
            },
            "165-169": {
              "media": 47.7,
              "umbralRiesgo": 39.2
            },
            "170-174": {
              "media": 49.4,
              "umbralRiesgo": 40.8
            },
            "175-179": {
              "media": 50.9,
              "umbralRiesgo": 42.4
            },
            "180-184": {
              "media": 52.1,
              "umbralRiesgo": 43.6
            },
            "185-189": {
              "media": 53.1,
              "umbralRiesgo": 44.5
            },
            "190+": {
              "media": 54.1,
              "umbralRiesgo": 45.5
            }
          },
          "55-59": {
            "160-164": {
              "media": 42.8,
              "umbralRiesgo": 34.3
            },
            "165-169": {
              "media": 45.1,
              "umbralRiesgo": 36.6
            },
            "170-174": {
              "media": 47.4,
              "umbralRiesgo": 38.9
            },
            "175-179": {
              "media": 49.3,
              "umbralRiesgo": 40.9
            },
            "180-184": {
              "media": 51.1,
              "umbralRiesgo": 42.6
            },
            "185-189": {
              "media": 52.4,
              "umbralRiesgo": 43.9
            },
            "190+": {
              "media": 53.5,
              "umbralRiesgo": 45.1
            }
          },
          "60-64": {
            "160-164": {
              "media": 41.0,
              "umbralRiesgo": 32.5
            },
            "165-169": {
              "media": 43.2,
              "umbralRiesgo": 34.7
            },
            "170-174": {
              "media": 45.7,
              "umbralRiesgo": 37.3
            },
            "175-179": {
              "media": 47.6,
              "umbralRiesgo": 39.1
            },
            "180-184": {
              "media": 49.2,
              "umbralRiesgo": 40.7
            },
            "185-189": {
              "media": 50.7,
              "umbralRiesgo": 42.2
            },
            "190+": {
              "media": 52.0,
              "umbralRiesgo": 43.5
            }
          },
          "65-69": {
            "160-164": {
              "media": 40.2,
              "umbralRiesgo": 32.8
            },
            "165-169": {
              "media": 42.0,
              "umbralRiesgo": 34.6
            },
            "170-174": {
              "media": 43.6,
              "umbralRiesgo": 36.3
            },
            "175-179": {
              "media": 45.3,
              "umbralRiesgo": 37.9
            },
            "180-184": {
              "media": 46.9,
              "umbralRiesgo": 39.6
            },
            "185-189": {
              "media": 48.9,
              "umbralRiesgo": 41.6
            },
            "190+": {
              "media": 50.6,
              "umbralRiesgo": 43.2
            }
          },
          "70-74": {
            "160-164": {
              "media": 37.2,
              "umbralRiesgo": 29.6
            },
            "165-169": {
              "media": 39.1,
              "umbralRiesgo": 31.5
            },
            "170-174": {
              "media": 41.1,
              "umbralRiesgo": 33.5
            },
            "175-179": {
              "media": 42.7,
              "umbralRiesgo": 35.2
            },
            "180-184": {
              "media": 44.4,
              "umbralRiesgo": 36.8
            },
            "185-189": {
              "media": 46.4,
              "umbralRiesgo": 38.9
            },
            "190+": {
              "media": 47.6,
              "umbralRiesgo": 40.0
            }
          },
          "75-79": {
            "160-164": {
              "media": 34.7,
              "umbralRiesgo": 26.8
            },
            "165-169": {
              "media": 35.9,
              "umbralRiesgo": 28.0
            },
            "170-174": {
              "media": 37.5,
              "umbralRiesgo": 29.6
            },
            "175-179": {
              "media": 39.0,
              "umbralRiesgo": 31.1
            },
            "180-184": {
              "media": 40.6,
              "umbralRiesgo": 32.7
            },
            "185-189": {
              "media": 42.7,
              "umbralRiesgo": 34.8
            },
            "190+": {
              "media": 45.4,
              "umbralRiesgo": 37.5
            }
          },
          "80-90": {
            "160-164": {
              "media": 29.1,
              "umbralRiesgo": 21.6
            },
            "165-169": {
              "media": 31.2,
              "umbralRiesgo": 23.6
            },
            "170-174": {
              "media": 33.0,
              "umbralRiesgo": 25.4
            },
            "175-179": {
              "media": 34.0,
              "umbralRiesgo": 26.4
            },
            "180-184": {
              "media": 35.8,
              "umbralRiesgo": 28.3
            },
            "185-189": {
              "media": 39.5,
              "umbralRiesgo": 32.0
            },
            "190+": {
              "media": 40.9,
              "umbralRiesgo": 33.3
            }
          }
        }
      },
      "mujeres": {
        "gruposTalla": [
          "150-154",
          "155-159",
          "160-164",
          "165-169",
          "170-174",
          "175-179",
          "180-184"
        ],
        "tallaMinCm": 150,
        "tallaMaxCm": 184,
        "valores": {
          "17-19": {
            "150-154": {
              "media": 27.8,
              "umbralRiesgo": 21.6
            },
            "155-159": {
              "media": 29.2,
              "umbralRiesgo": 22.9
            },
            "160-164": {
              "media": 30.2,
              "umbralRiesgo": 24.0
            },
            "165-169": {
              "media": 31.2,
              "umbralRiesgo": 25.0
            },
            "170-174": {
              "media": 32.2,
              "umbralRiesgo": 26.0
            },
            "175-179": {
              "media": 33.0,
              "umbralRiesgo": 26.7
            },
            "180-184": {
              "media": 33.8,
              "umbralRiesgo": 27.6
            }
          },
          "20-24": {
            "150-154": {
              "media": 29.1,
              "umbralRiesgo": 23.7
            },
            "155-159": {
              "media": 30.2,
              "umbralRiesgo": 24.8
            },
            "160-164": {
              "media": 31.5,
              "umbralRiesgo": 26.1
            },
            "165-169": {
              "media": 32.5,
              "umbralRiesgo": 27.1
            },
            "170-174": {
              "media": 33.4,
              "umbralRiesgo": 28.0
            },
            "175-179": {
              "media": 34.5,
              "umbralRiesgo": 29.0
            },
            "180-184": {
              "media": 35.0,
              "umbralRiesgo": 29.6
            }
          },
          "25-29": {
            "150-154": {
              "media": 30.8,
              "umbralRiesgo": 25.2
            },
            "155-159": {
              "media": 31.5,
              "umbralRiesgo": 25.9
            },
            "160-164": {
              "media": 32.3,
              "umbralRiesgo": 26.7
            },
            "165-169": {
              "media": 33.3,
              "umbralRiesgo": 27.7
            },
            "170-174": {
              "media": 34.2,
              "umbralRiesgo": 28.6
            },
            "175-179": {
              "media": 35.3,
              "umbralRiesgo": 29.7
            },
            "180-184": {
              "media": 36.4,
              "umbralRiesgo": 30.8
            }
          },
          "30-34": {
            "150-154": {
              "media": 31.4,
              "umbralRiesgo": 25.6
            },
            "155-159": {
              "media": 32.0,
              "umbralRiesgo": 26.2
            },
            "160-164": {
              "media": 32.7,
              "umbralRiesgo": 26.9
            },
            "165-169": {
              "media": 33.7,
              "umbralRiesgo": 27.9
            },
            "170-174": {
              "media": 34.6,
              "umbralRiesgo": 28.8
            },
            "175-179": {
              "media": 35.8,
              "umbralRiesgo": 30.0
            },
            "180-184": {
              "media": 37.0,
              "umbralRiesgo": 31.2
            }
          },
          "35-39": {
            "150-154": {
              "media": 31.0,
              "umbralRiesgo": 24.8
            },
            "155-159": {
              "media": 32.2,
              "umbralRiesgo": 26.1
            },
            "160-164": {
              "media": 33.2,
              "umbralRiesgo": 27.0
            },
            "165-169": {
              "media": 34.3,
              "umbralRiesgo": 28.2
            },
            "170-174": {
              "media": 35.3,
              "umbralRiesgo": 29.1
            },
            "175-179": {
              "media": 36.5,
              "umbralRiesgo": 30.3
            },
            "180-184": {
              "media": 37.6,
              "umbralRiesgo": 31.4
            }
          },
          "40-44": {
            "150-154": {
              "media": 31.5,
              "umbralRiesgo": 25.3
            },
            "155-159": {
              "media": 32.7,
              "umbralRiesgo": 26.4
            },
            "160-164": {
              "media": 33.7,
              "umbralRiesgo": 27.4
            },
            "165-169": {
              "media": 34.8,
              "umbralRiesgo": 28.6
            },
            "170-174": {
              "media": 35.8,
              "umbralRiesgo": 29.6
            },
            "175-179": {
              "media": 37.1,
              "umbralRiesgo": 30.8
            },
            "180-184": {
              "media": 38.0,
              "umbralRiesgo": 31.8
            }
          },
          "45-49": {
            "150-154": {
              "media": 29.8,
              "umbralRiesgo": 23.7
            },
            "155-159": {
              "media": 31.4,
              "umbralRiesgo": 25.3
            },
            "160-164": {
              "media": 32.8,
              "umbralRiesgo": 26.7
            },
            "165-169": {
              "media": 34.1,
              "umbralRiesgo": 28.0
            },
            "170-174": {
              "media": 35.2,
              "umbralRiesgo": 29.1
            },
            "175-179": {
              "media": 36.2,
              "umbralRiesgo": 30.1
            },
            "180-184": {
              "media": 37.0,
              "umbralRiesgo": 30.9
            }
          },
          "50-54": {
            "150-154": {
              "media": 28.2,
              "umbralRiesgo": 22.3
            },
            "155-159": {
              "media": 30.1,
              "umbralRiesgo": 24.2
            },
            "160-164": {
              "media": 31.5,
              "umbralRiesgo": 25.6
            },
            "165-169": {
              "media": 32.9,
              "umbralRiesgo": 27.0
            },
            "170-174": {
              "media": 33.9,
              "umbralRiesgo": 28.0
            },
            "175-179": {
              "media": 35.2,
              "umbralRiesgo": 29.3
            },
            "180-184": {
              "media": 35.6,
              "umbralRiesgo": 29.7
            }
          },
          "55-59": {
            "150-154": {
              "media": 26.9,
              "umbralRiesgo": 21.4
            },
            "155-159": {
              "media": 28.8,
              "umbralRiesgo": 23.3
            },
            "160-164": {
              "media": 30.2,
              "umbralRiesgo": 24.7
            },
            "165-169": {
              "media": 31.2,
              "umbralRiesgo": 25.7
            },
            "170-174": {
              "media": 32.0,
              "umbralRiesgo": 26.5
            },
            "175-179": {
              "media": 32.5,
              "umbralRiesgo": 27.0
            },
            "180-184": {
              "media": 32.9,
              "umbralRiesgo": 27.4
            }
          },
          "60-64": {
            "150-154": {
              "media": 25.8,
              "umbralRiesgo": 20.5
            },
            "155-159": {
              "media": 27.4,
              "umbralRiesgo": 22.1
            },
            "160-164": {
              "media": 28.9,
              "umbralRiesgo": 23.6
            },
            "165-169": {
              "media": 29.9,
              "umbralRiesgo": 24.6
            },
            "170-174": {
              "media": 30.6,
              "umbralRiesgo": 25.4
            },
            "175-179": {
              "media": 31.3,
              "umbralRiesgo": 26.0
            },
            "180-184": {
              "media": 31.5,
              "umbralRiesgo": 26.2
            }
          },
          "65-69": {
            "150-154": {
              "media": 24.5,
              "umbralRiesgo": 19.3
            },
            "155-159": {
              "media": 26.2,
              "umbralRiesgo": 21.0
            },
            "160-164": {
              "media": 27.5,
              "umbralRiesgo": 22.3
            },
            "165-169": {
              "media": 28.6,
              "umbralRiesgo": 23.4
            },
            "170-174": {
              "media": 29.5,
              "umbralRiesgo": 24.3
            },
            "175-179": {
              "media": 30.3,
              "umbralRiesgo": 25.1
            },
            "180-184": {
              "media": 30.5,
              "umbralRiesgo": 25.3
            }
          },
          "70-74": {
            "150-154": {
              "media": 23.4,
              "umbralRiesgo": 18.5
            },
            "155-159": {
              "media": 24.7,
              "umbralRiesgo": 19.8
            },
            "160-164": {
              "media": 26.1,
              "umbralRiesgo": 21.2
            },
            "165-169": {
              "media": 27.3,
              "umbralRiesgo": 22.4
            },
            "170-174": {
              "media": 28.1,
              "umbralRiesgo": 23.2
            },
            "175-179": {
              "media": 28.7,
              "umbralRiesgo": 23.8
            },
            "180-184": {
              "media": 29.2,
              "umbralRiesgo": 24.3
            }
          },
          "75-79": {
            "150-154": {
              "media": 22.7,
              "umbralRiesgo": 18.2
            },
            "155-159": {
              "media": 23.3,
              "umbralRiesgo": 18.8
            },
            "160-164": {
              "media": 24.0,
              "umbralRiesgo": 19.5
            },
            "165-169": {
              "media": 24.9,
              "umbralRiesgo": 20.4
            },
            "170-174": {
              "media": 26.1,
              "umbralRiesgo": 21.6
            },
            "175-179": {
              "media": 27.6,
              "umbralRiesgo": 23.1
            },
            "180-184": {
              "media": 28.9,
              "umbralRiesgo": 24.4
            }
          },
          "80-90": {
            "150-154": {
              "media": 19.9,
              "umbralRiesgo": 15.9
            },
            "155-159": {
              "media": 20.4,
              "umbralRiesgo": 16.4
            },
            "160-164": {
              "media": 21.2,
              "umbralRiesgo": 17.1
            },
            "165-169": {
              "media": 22.1,
              "umbralRiesgo": 18.0
            },
            "170-174": {
              "media": 23.8,
              "umbralRiesgo": 19.7
            },
            "175-179": {
              "media": 23.0,
              "umbralRiesgo": 19.0
            },
            "180-184": null
          }
        }
      }
    }
  }
};
