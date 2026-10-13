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
        "titulo": "Síntomas respiratorios",
        "tipo": "narrativa",
        "campos": [
          {
            "id": "sintomas_respiratorios",
            "tipo": "texto",
            "etiqueta": "Sintomatología predominante",
            "ayuda": "Disnea de esfuerzo, tos crónica, expectoración/broncorrea, fatiga precoz..."
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
          "id": "antropo_imc",
          "tipo": "imc",
          "etiqueta": "Peso, talla e índice de masa corporal (IMC)",
          "idPeso": "antropo_peso",
          "idTalla": "antropo_talla",
          "ayuda": "IMC = peso (kg) / talla² (m²). Introduce el peso en kilogramos y la talla en centímetros (por ejemplo, 168, no 1,68)."
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
      "titulo": "Pruebas específicas",
      "fuente": "protocolo",
      "tests": [],
      "grupos": [
        {
          "id": "espirometria",
          "titulo": "Espirometría",
          "tituloTexto": "ESPIROMETRÍA",
          "ayuda": "Registra los datos de la espirometría que consten en la historia clínica o que aporte el paciente. Esta herramienta no calcula ni asigna el perfil de riesgo: solo recoge los valores.",
          "campos": [
            {
              "id": "espiro_fecha",
              "tipo": "fecha",
              "etiqueta": "Fecha de la espirometría",
              "textoFrase": "realizada el {valor}",
              "ayuda": "Día en que se realizó la prueba (no puede ser posterior a hoy)."
            },
            {
              "id": "espiro_procedencia",
              "tipo": "select",
              "etiqueta": "Procedencia del resultado (opcional)",
              "opciones": [
                "Consta en la historia clínica",
                "La aporta el paciente"
              ],
              "textoFrase": "procedencia: {valor}",
              "valorMinusculas": true,
              "ayuda": "Indica dónde has consultado el resultado. Déjalo sin seleccionar si no lo sabes."
            },
            {
              "id": "espiro_fev1",
              "tipo": "numero",
              "etiqueta": "FEV1 posbroncodilatador (% del valor teórico)",
              "unidad": "%",
              "step": 1,
              "rangoValido": [
                5,
                200
              ],
              "mensajeRango": "El FEV1 se registra como porcentaje del teórico (entre 5 y 200).",
              "textoFrase": "FEV1 posbroncodilatador {valor} % del teórico",
              "ayuda": "FEV1: volumen de aire que el paciente expulsa en el primer segundo de una espiración forzada. Aquí se anota como % del valor teórico (el esperado para su edad, sexo y talla), medido tras el broncodilatador. En el protocolo SCS, el perfil de EPOC de riesgo bajo incluye un FEV1 igual o superior al 50 % del teórico."
            },
            {
              "id": "espiro_cociente",
              "tipo": "numero",
              "etiqueta": "Cociente FEV1/FVC (decimal de 0 a 1, no porcentaje)",
              "unidad": "decimal (ej.: 0,65 = 65 %)",
              "step": 0.01,
              "rangoValido": [
                0.2,
                1
              ],
              "mensajeRango": "Introduce el cociente en forma decimal entre 0,2 y 1 (por ejemplo, 0,65). Si lo tienes como porcentaje, divídelo entre 100.",
              "textoFrase": "FEV1/FVC {valor}",
              "ayuda": "Relación entre el FEV1 y la capacidad vital forzada (FVC: el total de aire que se expulsa en una espiración forzada). Se anota como decimal: 0,65 equivale a 65 %. El protocolo SCS toma como umbral un cociente inferior a 0,70."
            }
          ]
        }
      ]
    },
    "escalasPuntuadas": [
      {
        "id": "mmrc",
        "tipo": "gradoUnico",
        "titulo": "Escala de disnea mMRC (Medical Research Council modificada) - ANEXO IX",
        "tituloTexto": "ESCALA DE DISNEA mMRC",
        "fuente": "protocolo",
        "resumen": "Mide el grado de disnea (falta de aire) en la vida diaria, de 0 (solo con ejercicio intenso) a 4 (la disnea impide salir de casa o aparece al vestirse). Marca una única respuesta.",
        "notaProtocolo": "El protocolo SCS utiliza mMRC 0-1 como criterio de inclusión en el perfil de EPOC de riesgo bajo.",
        "recursoDescargable": {
          "etiqueta": "mMRC (versión imprimible)",
          "archivo": "pdf/mmrc.pdf"
        },
        "grados": [
          {
            "valor": 0,
            "descripcion": "Ausencia de disnea, excepto al realizar ejercicio intenso."
          },
          {
            "valor": 1,
            "descripcion": "Disnea al andar deprisa o al subir una cuesta poco pronunciada."
          },
          {
            "valor": 2,
            "descripcion": "Incapacidad de mantener el paso de otras personas de la misma edad, debido a la dificultad respiratoria o la necesidad de pararse a descansar al andar en llano siguiendo el propio paso."
          },
          {
            "valor": 3,
            "descripcion": "Necesidad de pararse a descansar al andar unos 100 metros o a los pocos minutos de andar en llano."
          },
          {
            "valor": 4,
            "descripcion": "La disnea impide al paciente salir de casa o aparece con actividades como vestirse o desvestirse."
          }
        ]
      },
      {
        "id": "cat",
        "titulo": "Cuestionario CAT (COPD Assessment Test) - ANEXO X",
        "tituloTexto": "CUESTIONARIO CAT",
        "fuente": "protocolo",
        "resumen": "El CAT evalúa el impacto de la EPOC sobre la salud y la vida cotidiana del paciente: 8 ítems puntuados de 0 a 5 (total de 0 a 40; a mayor puntuación, mayor impacto).",
        "recursoDescargable": {
          "etiqueta": "CAT (versión imprimible)",
          "archivo": "pdf/cat.pdf"
        },
        "tituloGuia": "Cómo se puntúa el CAT",
        "guiaHTML": "<p>Cada ítem se puntúa de <b>0 a 5</b>: el enunciado de la izquierda (el estado más favorable) vale 0 y el de la derecha vale 5. La suma de los 8 ítems va de <b>0 a 40</b>.</p><p>La calculadora solo muestra el total cuando están respondidos <b>los 8 ítems</b>: si falta alguno, indica que el cuestionario está incompleto y no escribe puntuación en el texto.</p><p><i>Versión: CAT en español (EE. UU.), © 2009 GSK. La CAT (prueba de evaluación de la COPD) y el logotipo de CAT son marcas registradas del grupo de empresas de GSK.</i></p>",
        "puntuacionMaxPorItem": 5,
        "maxItemsSinContestar": 0,
        "sinPorcentaje": true,
        "items": [
          {
            "id": "cat_1",
            "etiqueta": "Ítem 1",
            "anclas": [
              "Nunca toso",
              "Siempre estoy tosiendo"
            ]
          },
          {
            "id": "cat_2",
            "etiqueta": "Ítem 2",
            "anclas": [
              "No tengo flema (mucosidad) en el pecho",
              "Tengo el pecho completamente lleno de flema (mucosidad)"
            ]
          },
          {
            "id": "cat_3",
            "etiqueta": "Ítem 3",
            "anclas": [
              "No siento ninguna opresión en el pecho",
              "Siento mucha opresión en el pecho"
            ]
          },
          {
            "id": "cat_4",
            "etiqueta": "Ítem 4",
            "anclas": [
              "Cuando subo una pendiente o un tramo de escaleras, no me falta el aire",
              "Cuando subo una pendiente o un tramo de escaleras, me falta mucho el aire"
            ]
          },
          {
            "id": "cat_5",
            "etiqueta": "Ítem 5",
            "anclas": [
              "No me siento limitado para realizar actividades domésticas",
              "Me siento muy limitado para realizar actividades domésticas"
            ]
          },
          {
            "id": "cat_6",
            "etiqueta": "Ítem 6",
            "anclas": [
              "Me siento seguro al salir de casa a pesar de la enfermedad pulmonar que padezco",
              "No me siento nada seguro al salir de casa debido a la enfermedad pulmonar que padezco"
            ]
          },
          {
            "id": "cat_7",
            "etiqueta": "Ítem 7",
            "anclas": [
              "Duermo sin problemas",
              "Tengo problemas para dormir debido a la enfermedad pulmonar que padezco"
            ]
          },
          {
            "id": "cat_8",
            "etiqueta": "Ítem 8",
            "anclas": [
              "Tengo mucha energía",
              "No tengo ninguna energía"
            ]
          }
        ]
      }
    ]
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
