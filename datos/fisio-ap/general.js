window.FISIOAP_GENERAL = {
  "criteriosDerivacionGenerales": {
    "fuente": "protocolo",
    "clinicosInclusion": [
      { "zona": "Hombro", "items": ["Tendinopatías del hombro"] },
      { "zona": "Codo", "items": ["Epicondilalgias"] },
      { "zona": "Rodilla", "items": ["Gonartrosis", "Síndrome de dolor fémoro-patelar", "Tendinitis rotuliana", "Tendinitis anserina o pata de ganso"] },
      { "zona": "Cadera", "items": ["Coxartrosis"] },
      { "zona": "Tobillo", "items": ["Esguince de tobillo"] },
      { "zona": "Pie", "items": ["Fascitis plantar"] },
      { "zona": "Algias vertebrales", "items": ["Cervicalgia", "Lumbalgia"] },
      { "zona": "EPOC", "items": [] }
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
  }
};
