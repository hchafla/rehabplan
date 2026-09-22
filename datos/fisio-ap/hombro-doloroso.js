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
          "ayuda": "Prueba utilizada principalmente para valorar la función del <b>músculo supraespinoso y de su tendón</b>, especialmente ante sospecha de lesión del manguito rotador.<br><br>El paciente coloca ambos brazos aproximadamente a <b>90° de abducción</b>, unos <b>30° de flexión anterior</b> respecto al plano frontal (plano de la escápula) y con los pulgares orientados hacia abajo mediante rotación interna. El fisioterapeuta se sitúa frente al paciente y aplica una fuerza hacia abajo sobre los brazos mientras el paciente intenta mantener la posición.<br><br><b>Se considera positivo cuando aparece dolor o existe una disminución significativa de la fuerza</b> respecto al lado contralateral. La pérdida marcada de fuerza puede ser compatible con una lesión importante del supraespinoso, aunque el resultado debe interpretarse junto con el resto de la exploración.<br><br><b>Posición:</b> hombro a 90° de abducción y aproximadamente 30° de antepulsión, codo extendido y pulgar hacia abajo.<br><br><b>Maniobra:</b> resistencia hacia abajo mientras el paciente intenta mantener los brazos elevados.<br><br><b>Valora:</b> principalmente supraespinoso.<br><br><b>Positivo:</b> dolor y/o debilidad durante la resistencia.",
          "imagen": "jobe.webp",
          "video": "https://www.youtube.com/watch?v=gbnF6WGPnGU",
        },
        {
          "id": "test_patte",
          "nombre": "Patte",
          "estructura": "Infraespinoso / redondo menor",
          "ayuda": "Prueba utilizada principalmente para valorar la función de los <b>rotadores externos del hombro</b>, especialmente el <b>infraespinoso y el redondo menor</b>, componentes del manguito rotador.<br><br>El paciente coloca el hombro aproximadamente a <b>90° de abducción</b>, con unos <b>30° de flexión anterior respecto al plano frontal (plano de la escápula)</b> y el codo flexionado a <b>90°</b>. El fisioterapeuta sostiene el antebrazo del paciente y aplica una resistencia que intenta llevar el antebrazo hacia la rotación interna, mientras el paciente realiza una <b>rotación externa contra resistencia</b>.<br><br>Se compara la fuerza y la aparición de dolor con respecto al <b>hombro contralateral</b>. Una disminución significativa de la fuerza o la aparición de dolor puede indicar una alteración de los rotadores externos, aunque el resultado debe interpretarse junto con el resto de la exploración.<br><br><b>Posición:</b> hombro a 90° de abducción y aproximadamente 30° de antepulsión, codo flexionado a 90° y antebrazo inicialmente en posición neutra.<br><br><b>Maniobra:</b> el paciente realiza rotación externa del hombro contra la resistencia aplicada por el fisioterapeuta.<br><br><b>Valora:</b> principalmente infraespinoso y redondo menor.<br><br><b>Positivo:</b> dolor y/o disminución de la fuerza respecto al lado contralateral.",          "imagen": "patte.webp",
          "video": "https://www.youtube.com/watch?v=YI9hCfBaiAc",
        },
       {
          "id": "test_gerber",
          "nombre": "Gerber (lift-off test)",
          "estructura": "Subescapular",
          "ayuda": "Prueba utilizada principalmente para valorar la función del <b>músculo subescapular</b>, especialmente ante sospecha de lesión de su tendón.<br><br>El paciente coloca la mano del lado a explorar <b>detrás de la espalda</b>, aproximadamente a la altura de la región lumbar, realizando rotación interna del hombro con el codo flexionado. Desde esta posición, se solicita al paciente que <b>separe la mano de la espalda</b>, realizando una extensión del hombro, mientras mantiene el codo flexionado. La capacidad para realizar y mantener este movimiento se compara con el lado contralateral.<br><br>En la versión clásica, el fisioterapeuta puede aplicar una <b>resistencia hacia la espalda</b> mientras el paciente intenta mantener la mano separada. La incapacidad para levantar la mano de la espalda o para mantenerla separada, especialmente cuando no puede realizar la posición inicial, puede ser indicativa de una alteración importante del subescapular.<br><br><b>Posición:</b> mano detrás de la espalda, en la región lumbar, con el hombro en rotación interna y el codo flexionado aproximadamente 90°.<br><br><b>Maniobra:</b> el paciente separa la mano de la espalda y mantiene el brazo en esa posición.<br><br><b>Valora:</b> principalmente subescapular.<br><br><b>Positivo:</b> incapacidad para separar o mantener la mano alejada de la espalda, o aparición de debilidad/dolor durante la maniobra.",          "imagen": "gerber.webp",
          "video": "https://www.youtube.com/watch?v=n9PQM16_iww",
        },
        {
          "id": "test_neer",
          "nombre": "Neer",
          "estructura": "Síndrome subacromial",
          "ayuda": "Prueba utilizada principalmente para valorar la presencia de <b>dolor relacionado con estructuras subacromiales</b>, especialmente en el contexto de un posible síndrome de dolor subacromial.<br><br>El paciente permanece de pie mientras el fisioterapeuta <b>estabiliza la escápula y la región superior del hombro con una mano</b>. Con la otra mano, eleva pasivamente el brazo del paciente en <b>flexión anterior</b>, manteniendo el hombro en <b>rotación interna</b>. El movimiento se realiza de forma progresiva hasta alcanzar la máxima elevación posible.<br><br>La maniobra reduce el espacio subacromial y puede provocar dolor cuando existe irritación de las estructuras implicadas. El dolor suele aparecer durante la elevación, especialmente en el arco comprendido aproximadamente entre <b>70° y 120°</b>, aunque el ángulo no debe utilizarse de forma aislada para establecer un diagnóstico.<br><br><b>Posición:</b> paciente de pie, brazo relajado, codo extendido y hombro en rotación interna.<br><br><b>Maniobra:</b> el fisioterapeuta estabiliza la escápula y realiza una elevación pasiva del brazo en flexión anterior, manteniendo la rotación interna.<br><br><b>Valora:</b> principalmente dolor relacionado con estructuras subacromiales.<br><br><b>Positivo:</b> reproducción del dolor habitual del paciente durante la elevación pasiva del brazo.",
          "imagen": "neer.webp",
          "video": "https://www.youtube.com/watch?v=Gg_NyOG3AGw",
        },
        {
          "id": "test_palmup",
          "nombre": "Palm-up test (Speed)",
          "estructura": "Bíceps braquial (porción larga)",
          "ayuda": "Prueba utilizada principalmente para valorar el <b>tendón de la porción larga del bíceps braquial</b>, especialmente ante sospecha de tendinopatía o irritación en la corredera bicipital.<br><br>El paciente coloca el brazo extendido hacia delante aproximadamente a <b>90° de flexión de hombro</b>, con el codo completamente extendido y el antebrazo en <b>supinación</b>, de manera que la palma de la mano quede orientada hacia arriba. El fisioterapeuta aplica una resistencia hacia abajo sobre el antebrazo o la muñeca mientras el paciente intenta mantener o elevar la posición del brazo.<br><br>Se considera positivo cuando aparece <b>dolor localizado en la región anterior del hombro</b>, especialmente en la zona de la corredera bicipital, durante la contracción contra resistencia. La presencia de dolor debe interpretarse junto con el resto de la exploración clínica.<br><br><b>Posición:</b> hombro aproximadamente a 90° de flexión, codo extendido y antebrazo en supinación, con la palma hacia arriba.<br><br><b>Maniobra:</b> resistencia hacia abajo mientras el paciente mantiene el brazo elevado.<br><br><b>Valora:</b> principalmente la porción larga del bíceps braquial.<br><br><b>Positivo:</b> aparición o reproducción del dolor en la región anterior del hombro durante la resistencia.",          "imagen": "palm-up.webp",
          "video": "https://www.youtube.com/watch?v=3QED6euSz-s",
        },
        {
          "id": "test_yergason",
          "nombre": "Yergason",
          "estructura": "Bíceps braquial (porción larga)",
          "ayuda": "Prueba utilizada principalmente para valorar la <b>porción larga del bíceps braquial y su tendón</b>, especialmente en relación con la estabilidad del tendón en la corredera bicipital.<br><br>El paciente mantiene el codo flexionado a <b>90°</b>, con el brazo junto al tronco y el antebrazo inicialmente en <b>pronación</b>. El fisioterapeuta estabiliza el codo y solicita al paciente que realice simultáneamente <b>supinación del antebrazo y rotación externa del hombro contra resistencia</b>.<br><br>Se considera positivo cuando aparece <b>dolor en la región anterior del hombro</b>, especialmente sobre la corredera bicipital, o cuando se aprecia una sensación de <b>resalte o desplazamiento del tendón</b> durante la maniobra. El resultado debe interpretarse junto con el resto de la exploración clínica.<br><br><b>Posición:</b> hombro junto al tronco, codo flexionado a 90° y antebrazo en pronación.<br><br><b>Maniobra:</b> supinación del antebrazo y rotación externa del hombro contra resistencia.<br><br><b>Valora:</b> principalmente la porción larga del bíceps braquial y la estabilidad de su tendón en la corredera bicipital.<br><br><b>Positivo:</b> dolor en la región anterior del hombro y/o resalte o desplazamiento del tendón durante la maniobra.",          "imagen": "yergason.webp",
          "video": "https://www.youtube.com/watch?v=0a6b0kfCH4U",
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
