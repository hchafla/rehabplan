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
        "titulo": "Historia del dolor",
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
        "id": "escalaOswestry",
        "titulo": "Escala de incapacidad por dolor lumbar (Oswestry / ODIsp - ANEXO VIII)",
        "tipo": "escalaPuntuada",
        "escala": {
          "id": "oswestry",
          "titulo": "Escala de incapacidad por dolor lumbar (Oswestry / ODIsp - ANEXO VIII)",
          "tituloTexto": "CUESTIONARIO DE INCAPACIDAD DE OSWESTRY (ODIsp)",
          "fraseTexto": "Resultado en el cuestionario de incapacidad de Oswestry (ODIsp): {valor}.",
          "fuente": "protocolo",
          "recursoDescargable": {
            "etiqueta": "Oswestry (versión imprimible)",
            "archivo": "pdf/oswestry.pdf"
          },
          "guiaHTML": "<h4>Cómo se puntúa</h4><p>Cada apartado se puntúa de <b>0 a 5</b>: la <b>primera opción</b> del apartado vale <b>0</b> y la <b>última 5</b>. Suma de los 10 apartados: máximo <b>50 puntos</b>; multiplicada por 2, se expresa como <b>porcentaje (%)</b>.</p><p>Si el paciente deja un apartado sin responder, la puntuación se calcula sobre los apartados contestados (9 apartados → máximo 45). La calculadora no puntúa si falta más de uno.</p><p>Si el paciente marca más de una opción en un apartado, se anota la de <b>mayor puntuación</b>.</p><p><i>Estas reglas son las del instrumento publicado (Fairbank), no un texto del protocolo SCS: edítalas en <code>guiaHTML</code> si tu protocolo indica otra cosa.</i></p>",
          "puntuacionMaxPorItem": 5,
          "maxItemsSinContestar": 1,
          "items": [
            {
              "id": "odi_1",
              "etiqueta": "1. Intensidad de dolor",
              "opciones": [
                "Puedo soportar el dolor sin necesidad de tomar calmantes",
                "El dolor es fuerte pero me arreglo sin tomar calmantes",
                "Los calmantes me alivian completamente el dolor",
                "Los calmantes me alivian un poco el dolor",
                "Los calmantes apenas me alivian el dolor",
                "Los calmantes no me quitan el dolor y no los tomo"
              ]
            },
            {
              "id": "odi_2",
              "etiqueta": "2. Cuidados personales (lavarse, vestirse, etc.)",
              "opciones": [
                "Me las puedo arreglar solo sin que me aumente el dolor",
                "Me las puedo arreglar solo pero esto me aumenta el dolor",
                "Lavarme, vestirme, etc., me produce dolor y tengo que hacerlo despacio y con cuidado",
                "Necesito alguna ayuda pero consigo hacer la mayoría de las cosas yo solo",
                "Necesito ayuda para hacer la mayoría de las cosas",
                "No puedo vestirme, me cuesta lavarme, y suelo quedarme en la cama"
              ]
            },
            {
              "id": "odi_3",
              "etiqueta": "3. Levantar peso",
              "opciones": [
                "Puedo levantar objetos pesados sin que me aumente el dolor",
                "Puedo levantar objetos pesados pero me aumenta el dolor",
                "El dolor me impide levantar objetos pesados del suelo, pero puedo hacerlo si están en un sitio cómodo (ej. en una mesa)",
                "El dolor me impide levantar objetos pesados, pero sí puedo levantar objetos ligeros o medianos si están en un sitio cómodo",
                "Sólo puedo levantar objetos muy ligeros",
                "No puedo levantar ni elevar ningún objeto"
              ]
            },
            {
              "id": "odi_4",
              "etiqueta": "4. Andar",
              "opciones": [
                "El dolor no me impide andar",
                "El dolor me impide andar más de un kilómetro",
                "El dolor me impide andar más de 500 metros",
                "El dolor me impide andar más de 250 metros",
                "Sólo puedo andar con bastón o muletas",
                "Permanezco en la cama casi todo el tiempo y tengo que ir a rastras al baño"
              ]
            },
            {
              "id": "odi_5",
              "etiqueta": "5. Estar sentado",
              "opciones": [
                "Puedo estar sentado en cualquier tipo de silla todo el tiempo que quiera",
                "Puedo estar sentado en mi silla favorita todo el tiempo que quiera",
                "El dolor me impide estar sentado más de una hora",
                "El dolor me impide estar sentado más de media hora",
                "El dolor me impide estar sentado más de diez minutos",
                "El dolor me impide estar sentado"
              ]
            },
            {
              "id": "odi_6",
              "etiqueta": "6. Estar de pie",
              "opciones": [
                "Puedo estar de pie tanto tiempo como quiera sin que me aumente el dolor",
                "Puedo estar de pie tanto tiempo como quiera pero me aumenta el dolor",
                "El dolor me impide estar de pie más de una hora",
                "El dolor me impide estar de pie más de media hora",
                "El dolor me impide estar de pie más de diez minutos",
                "El dolor me impide estar de pie"
              ]
            },
            {
              "id": "odi_7",
              "etiqueta": "7. Dormir",
              "opciones": [
                "El dolor no me impide dormir bien",
                "Sólo puedo dormir si tomo pastillas",
                "Incluso tomando pastillas duermo menos de seis horas",
                "Incluso tomando pastillas duermo menos de cuatro horas",
                "Incluso tomando pastillas duermo menos de dos horas",
                "El dolor me impide totalmente dormir"
              ]
            },
            {
              "id": "odi_8",
              "etiqueta": "8. Actividad sexual",
              "opciones": [
                "Mi actividad sexual es normal y no me aumenta el dolor",
                "Mi actividad sexual es normal pero me aumenta el dolor",
                "Mi actividad sexual es casi normal pero me aumenta mucho el dolor",
                "Mi actividad sexual se ha visto muy limitada a causa del dolor",
                "Mi actividad sexual es casi nula a causa del dolor",
                "El dolor me impide todo tipo de actividad sexual"
              ]
            },
            {
              "id": "odi_9",
              "etiqueta": "9. Vida social",
              "opciones": [
                "Mi vida social es normal y no me aumenta el dolor",
                "Mi vida social es normal, pero me aumenta el dolor",
                "El dolor no tiene un efecto importante en mi vida social, pero sí impide mis actividades más enérgicas, como bailar, etc.",
                "El dolor ha limitado mi vida social y no salgo tan a menudo",
                "El dolor ha limitado mi vida social al hogar",
                "No tengo vida social a causa del dolor"
              ]
            },
            {
              "id": "odi_10",
              "etiqueta": "10. Viajar",
              "opciones": [
                "Puedo viajar a cualquier sitio sin que me aumente el dolor",
                "Puedo viajar a cualquier sitio, pero me aumenta el dolor",
                "El dolor es fuerte, pero aguanto viajes de más de dos horas",
                "El dolor me limita a viajes de menos de una hora",
                "El dolor me limita a viajes cortos y necesarios de menos de media hora",
                "El dolor me impide viajar excepto para ir al médico o al hospital"
              ]
            }
          ]
        }
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
          "etiqueta": "Musculatura abdominal / CORE (Transverso y Recto)",
          "estructura": "Recto abdominal (flexión de tronco) y transverso del abdomen",
          "ayuda": "<b>Recto abdominal (flexión de tronco):</b> decúbito supino con caderas y rodillas flexionadas y los pies apoyados.<br><b>Gesto:</b> flexionar el tronco hasta despegar las escápulas de la camilla (encogimiento o <i>curl-up</i>), sin tirar del cuello.<br><b>Grado 3:</b> lo consigue con los brazos extendidos hacia delante.<br><b>Grado 4:</b> con los brazos cruzados sobre el pecho.<br><b>Grado 5:</b> con las manos detrás de la cabeza.<br><b>Grados 0-2:</b> si no logra despegar las escápulas, valora la contracción abdominal con la palpación (1) o el movimiento parcial (2), según tu referencia (Kendall / Daniels).<br><b>Transverso del abdomen:</b> no se gradúa con la escala de Daniels. Si quieres valorar su activación, pide \"meter el ombligo hacia dentro\" sin mover la pelvis ni contener la respiración, palpando por dentro de las espinas ilíacas anterosuperiores. Anótalo en \"Otros hallazgos\" de inspección y palpación.<br><b>Ojo:</b> si arquea la zona lumbar o se le levantan los pies, está compensando. Si reproduce el dolor lumbar, anótalo y no insistas."
        },
        {
          "id": "fuerza_extensores_lumbares",
          "etiqueta": "Extensores lumbares / Erectores espinales",
          "estructura": "Erectores espinales / extensores lumbares",
          "ayuda": "<b>Posición:</b> decúbito prono (con una almohada bajo el abdomen si es cómodo). Estabiliza la pelvis fijando o apoyando las piernas.<br><b>Gesto:</b> levantar el tronco de la camilla extendiendo la columna.<br><b>Grado 3:</b> eleva el tronco contra la gravedad con los brazos a lo largo del cuerpo.<br><b>Grados 4-5:</b> se aumenta la carga con la posición de los brazos (manos detrás del cuello, después brazos por encima de la cabeza), según tu referencia (Kendall / Daniels). Evita la resistencia manual intensa.<br><b>Grados 0-2:</b> si no logra elevar el tronco, valora con la palpación la contracción de los erectores (1) o el movimiento parcial (2).<br><b>Ojo:</b> que el movimiento sea de extensión de la columna y no un empuje con los brazos. Si reproduce el dolor lumbar, anótalo.<br><br><b>Grados:</b> 1 = contracción palpable sin movimiento · 2 = recorrido completo con la gravedad eliminada · 3 = recorrido completo contra la gravedad · 4 = contra resistencia moderada · 5 = contra resistencia máxima."
        },
        {
          "id": "fuerza_gluteo_mayor",
          "etiqueta": "Glúteo mayor (extensión de cadera)",
          "estructura": "Glúteo mayor (extensión de cadera)",
          "ayuda": "<b>Posición:</b> decúbito prono, con la rodilla del lado explorado flexionada a 90° (así se reduce la participación de los isquiotibiales). Estabiliza la pelvis con la otra mano.<br><b>Gesto:</b> elevar el muslo de la camilla (extensión de cadera) manteniendo la rodilla flexionada.<br><b>Grado 3:</b> levanta el muslo contra la gravedad.<br><b>Grados 4-5:</b> resistencia en la cara posterior de la parte distal del muslo, hacia la camilla, de forma progresiva.<br><b>Grado 2:</b> decúbito lateral con la pierna sostenida: extiende la cadera con la gravedad eliminada.<br><b>Ojo:</b> que no compense con hiperextensión lumbar ni con elevación o rotación de la pelvis. Compara con el lado contrario.<br><br><b>Grados:</b> 1 = contracción palpable sin movimiento · 2 = recorrido completo con la gravedad eliminada · 3 = recorrido completo contra la gravedad · 4 = contra resistencia moderada · 5 = contra resistencia máxima."
        },
        {
          "id": "fuerza_gluteo_medio",
          "etiqueta": "Glúteo medio (estabilidad lumbopélvica)",
          "estructura": "Glúteo medio (abducción de cadera y estabilidad lumbopélvica)",
          "ayuda": "<b>Posición:</b> decúbito lateral sobre el lado contrario, con la pierna explorada arriba, cadera en ligera extensión y sin flexión ni rotación interna.<br><b>Gesto:</b> abducir la cadera elevando la pierna hacia el techo, con la pelvis estable.<br><b>Grado 3:</b> completa la abducción contra la gravedad sin que el tronco rote hacia atrás.<br><b>Grados 4-5:</b> resistencia en la cara lateral de la parte distal del muslo, hacia abajo, de forma progresiva.<br><b>Grado 2:</b> decúbito supino: desliza la pierna lateralmente sobre la camilla (gravedad eliminada).<br><b>Ojo:</b> si flexiona la cadera o rota internamente, entra el tensor de la fascia lata; si eleva la pelvis, compensa el cuadrado lumbar. Compara con el lado contrario.<br><br><b>Grados:</b> 1 = contracción palpable sin movimiento · 2 = recorrido completo con la gravedad eliminada · 3 = recorrido completo contra la gravedad · 4 = contra resistencia moderada · 5 = contra resistencia máxima."
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
          "ayuda": "<b>¿Cómo se realiza?</b><br>Paciente en decúbito supino y relajado, con la pierna explorada extendida. Eleva pasivamente la pierna con la rodilla extendida (flexión de cadera) hasta que aparezcan los síntomas o se alcance el límite del movimiento. Anota el ángulo y dónde aparecen los síntomas. Si se reproducen los síntomas habituales, haz una maniobra de diferenciación: baja ligeramente la pierna hasta que cedan y añade dorsiflexión del tobillo para ver si aumentan.<br><br><b>✅ Positivo</b><br>Reproduce el dolor irradiado habitual del paciente, y este cambia con la maniobra de diferenciación (por ejemplo, aumenta con la dorsiflexión del tobillo y cede al bajar la pierna).<br><br><b>➖ Negativo</b><br>No reproduce el dolor irradiado habitual. Puede aparecer tirantez en la parte posterior del muslo o molestia lumbar local sin que esto se considere, por sí solo, un resultado positivo.<br><br><b>Importante:</b> ambas pruebas deben interpretarse según los síntomas habituales del paciente, su distribución y la respuesta a las maniobras de diferenciación. Una sensación aislada de estiramiento no equivale a una prueba positiva. Un resultado positivo tampoco confirma por sí solo una hernia discal o una radiculopatía, y uno negativo no las descarta por completo.",
          "imagen": "slr.webp",
          "video": null,
          "detalle": true
        },
        {
          "id": "test_slump",
          "nombre": "Test de Slump",
          "estructura": "Tensión del tejido nervioso del eje neuraxial",
          "ayuda": "<b>¿Cómo se realiza?</b><br>Con el paciente sentado en el borde de la camilla, pídele que flexione progresivamente la espalda y el cuello, acercando la barbilla al pecho. Manteniendo esa posición, extiende lentamente la rodilla que vas a explorar y añade dorsiflexión del tobillo. Observa cuándo y dónde aparecen los síntomas.<br>Si se reproducen los síntomas habituales, mantén la posición de la pierna y pide al paciente que levante la cabeza, extendiendo el cuello. Comprueba si los síntomas disminuyen.<br><br><b>✅ Positivo</b><br>Reproduce los síntomas habituales del paciente y estos disminuyen de forma apreciable al extender el cuello, lo que apoya la participación de la mecanosensibilidad neural.<br><br><b>➖ Negativo</b><br>No reproduce los síntomas habituales o estos no presentan cambios relevantes con la maniobra de diferenciación estructural. Interpreta el resultado junto con el resto de la exploración.<br><br><b>Importante:</b> ambas pruebas deben interpretarse según los síntomas habituales del paciente, su distribución y la respuesta a las maniobras de diferenciación. Una sensación aislada de estiramiento no equivale a una prueba positiva. Un resultado positivo tampoco confirma por sí solo una hernia discal o una radiculopatía, y uno negativo no las descarta por completo.",
          "imagen": "slump.webp",
          "video": null,
          "detalle": true
        }
      ]
    },
    "pruebasFuncionales": {
      "titulo": "Pruebas funcionales",
      "campos": [
        {
          "id": "func_marcha_puntillas",
          "tipo": "tristate",
          "etiqueta": "Capaz de marcha de puntillas",
          "ayuda": "Pídele que camine de puntillas unos pasos. Sí = la realiza; No = no puede; sin marcar = no valorada."
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
