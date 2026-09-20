window.FISIOAP_DATOS = window.FISIOAP_DATOS || {};
window.FISIOAP_DATOS['rodilla-otras'] = {
  "id": "rodilla-otras",
  "nombre": "Rodilla - Síndrome fémoro-patelar, tendinitis rotuliana y pata de ganso",
  "fuente": "Protocolo de actuación SCS · Síndrome fémoro-patelar y tendinopatías de rodilla (Atención Primaria)",
  "objetivos": {
    "fuente": "protocolo",
    "general": [
      "Mejorar la calidad de vida del usuario.",
      "Aumentar su capacidad funcional.",
      "Disminuir los síntomas de su patología de rodilla.",
      "Fomentar la responsabilidad del usuario en el autocuidado."
    ],
    "especificos": [
      "Disminuir el dolor.",
      "Mantener y mejorar la movilidad.",
      "Recuperar el tono, fuerza o potencia muscular.",
      "Prevenir la discapacidad, conservando la independencia del usuario.",
      "Fomentar la responsabilidad del usuario en el autocuidado.",
      "Educar al usuario en ejercicios terapéuticos y técnicas de protección articular para las rodillas.",
      "Prevenir complicaciones y recidivas."
    ]
  },
  "avisos": {
    "fuente": "protocolo",
    "criteriosInclusion": [
      "Patología tendinosa leve o moderada de las diferentes estructuras de la rodilla (rotuliana, cuadricipital y anserina).",
      "Síndrome fémoro-patelar en estadios iniciales.",
      "Usuario con posibilidad de deambulación independiente conservada o autónoma.",
      "Aceptación y colaboración por parte del usuario del plan terapéutico a seguir."
    ],
    "criteriosExclusion": [
      "Patología traumática previa reciente.",
      "Procesos derivados de procedimientos quirúrgicos previos.",
      "Bursitis.",
      "Esguince de rodilla.",
      "Síndromes de Dolor Regional Complejo.",
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
        "ayuda": "Diagnóstico indicado por el MAP en la derivación (ej.: SFP, tendinitis rotuliana, tendinitis anserina/pata de ganso)."
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
            "ayuda": "¿Cuándo y cómo empezó? Ej.: insidioso tras incremento de actividad/carrera, tras sobrecarga laboral..."
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
            "ayuda": "Tratamientos ya realizados: AINEs, frío local, cincha/cinchilla infrapatelar, fisioterapia previa…"
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
            "ayuda": "Polo inferior de rótula (rotuliano), inserción anserina (medial), cara anterior/retropatelar (SFP), tendón cuadricipital..."
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
            "ayuda": "Mecánico, punzante al gesto, sordo en sedestación prolongada (signo del cine)..."
          },
          {
            "id": "dolor_agravantes",
            "tipo": "texto_area",
            "etiqueta": "Factores agravantes",
            "ayuda": "¿Qué lo empeora? Ej.: subir/bajar escaleras, sentadillas/cuclillas, carrera, saltos, sedestación prolongada con flexión de rodilla..."
          },
          {
            "id": "dolor_alivio",
            "tipo": "texto_area",
            "etiqueta": "Factores de alivio",
            "ayuda": "¿Qué lo mejora? Ej.: reposo, extensión de rodilla, frío local, analgesia..."
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
        "id": "historiaLaboral",
        "titulo": "Historia laboral",
        "tipo": "checklist",
        "ayuda": "Marca las opciones que apliquen a su puesto de trabajo.",
        "opciones": [
          {
            "id": "laboral_escaleras_rampas",
            "etiqueta": "Subida/bajada continua de escaleras o rampas",
            "fraseTexto": "subida y bajada frecuente de escaleras o rampas"
          },
          {
            "id": "laboral_cuclillas",
            "etiqueta": "Posturas en cuclillas o arrodillado",
            "fraseTexto": "posturas mantenidas en cuclillas o de rodillas"
          },
          {
            "id": "laboral_sedestacion_mantenida",
            "etiqueta": "Sedestación prolongada con flexión de rodilla",
            "fraseTexto": "sedestación prolongada con flexión de rodillas"
          },
          {
            "id": "laboral_cargas_deambulacion",
            "etiqueta": "Cargas de peso o deambulación prolongada",
            "fraseTexto": "manipulación de cargas o trayectos largos a pie"
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
        "ayuda": "Marca las actividades cotidianas afectadas por la patología.",
        "opciones": [
          {
            "id": "avd_escaleras",
            "etiqueta": "Subir / bajar escaleras",
            "fraseTexto": "subir o bajar escaleras"
          },
          {
            "id": "avd_agacharse_cuclillas",
            "etiqueta": "Agacharse / ponerse de cuclillas",
            "fraseTexto": "agacharse o ponerse de cuclillas"
          },
          {
            "id": "avd_incorporarse",
            "etiqueta": "Levantarse tras estar sentado mucho tiempo",
            "fraseTexto": "incorporarse tras sedestación prolongada"
          },
          {
            "id": "avd_marcha",
            "etiqueta": "Caminar trayectos largos",
            "fraseTexto": "caminar trayectos prolongados"
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
            "ayuda": "Carrera a pie (running), deportes de salto/impacto, ciclismo, gimnasio, senderismo..."
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
          "id": "insp_deformidad",
          "tipo": "texto",
          "etiqueta": "Alineación y deaxaciones",
          "ayuda": "Ej.: Genu valgo, genu varo, genu recurvatum, rotación patelar, estrabismo rotuliano..."
        },
        {
          "id": "insp_inflamacion",
          "tipo": "tristate",
          "etiqueta": "Inflamación / Tumefacción local"
        },
        {
          "id": "insp_dolor_palpacion_rotuliano",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación en tendón rotuliano / polo inferior"
        },
        {
          "id": "insp_dolor_palpacion_pata_ganso",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación en inserción de pata de ganso (medial)"
        },
        {
          "id": "insp_dolor_palpacion_cuadricipital_facetas",
          "tipo": "tristate",
          "etiqueta": "Dolor a la palpación en tendón cuadricipital / facetas patelares"
        },
        {
          "id": "insp_otros",
          "tipo": "texto",
          "etiqueta": "Otros hallazgos",
          "ayuda": "Ej.: crepitación fémoro-patelar, aprensión a la movilización patelar..."
        }
      ]
    },
    "movilidadArticular": {
      "titulo": "Movilidad articular (Rodilla)",
      "notaFuente": "Evaluación del rango articular activo y pasivo.",
      "movimientos": [
        {
          "id": "mov_flexion_rodilla",
          "etiqueta": "Flexión de rodilla",
          "categorias": [
            "No valorado",
            "Limitación severa",
            "Limitación moderada",
            "Limitación leve",
            "Sin limitación"
          ]
        },
        {
          "id": "mov_extension_rodilla",
          "etiqueta": "Extensión de rodilla",
          "categorias": [
            "No valorado",
            "Flexo severo (>15°)",
            "Flexo moderado (5-15°)",
            "Flexo leve (<5°)",
            "Extensión completa"
          ]
        }
      ],
      "campoEspecificaciones": {
        "id": "movilidad_notas",
        "tipo": "texto_area",
        "etiqueta": "Otras especificaciones sobre la movilidad",
        "ayuda": "Ej.: dolor al final de la flexión profunda, roce/crepitación patelar..."
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
          "id": "fuerza_cuadriceps",
          "etiqueta": "Cuádriceps (extensión de rodilla / VMO)"
        },
        {
          "id": "fuerza_isquiotibiales",
          "etiqueta": "Isquiotibiales (flexión de rodilla)"
        },
        {
          "id": "fuerza_gluteo_medio",
          "etiqueta": "Glúteo medio / Abductores de cadera"
        },
        {
          "id": "fuerza_triceps_sural",
          "etiqueta": "Tríceps sural / Flexores plantares"
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
            "Claudicación / Cojera",
            "Valgo dinámico en fase de apoyo",
            "No valorada"
          ]
        },
        {
          "id": "marcha_productos_apoyo",
          "tipo": "select",
          "etiqueta": "Productos de apoyo",
          "opciones": [
            "Sin productos de apoyo",
            "Bipedestación/deambulación con bastón/muleta",
            "Dos muletas / andador",
            "Otros"
          ]
        },
        {
          "id": "marcha_observaciones",
          "tipo": "texto",
          "etiqueta": "Observaciones de la marcha",
          "ayuda": "Ej.: desaceleración o acortamiento del apoyo en el miembro afecto..."
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
        "texto": "Se pautan ejercicios domiciliarios (fortalecimiento isométrico/excéntrico, trabajo de glúteo medio y estiramientos) y se explican al paciente."
      },
      {
        "id": "rec_hoja_ejercicios",
        "texto": "Se entrega hoja de ejercicios domiciliarios."
      },
      {
        "id": "rec_gestion_carga",
        "texto": "Se pautan recomendaciones de gestión de carga de entrenamiento/actividad diaria y educación en protección articular."
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
