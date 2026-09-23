/* ==============================================================
   Fisio+AP — lógica de la aplicación
   ==============================================================
   Principios de este archivo (no tocar sin releer):
   - Todo lo específico de una patología vive en datos/fisio-ap/*.json.
     Este archivo NO debe contener nada de "hombro doloroso" en duro.
   - Nunca se genera texto para un campo que el usuario no ha
     rellenado o seleccionado explícitamente. Una casilla sin marcar
     nunca se traduce en "no" ni en "normal".
   - Los cuatro textos finales (MOTIVO, ANAMNESIS, EXPLORACIÓN FÍSICA,
     PLAN DE ACTUACIÓN) son siempre editables a mano, y cada uno se
     copia con un botón independiente.
   ================================================================ */

(function () {
    'use strict';

    const RUTA_DATOS = 'datos/fisio-ap/';

    let listaPatologias = [];
    let config = null;   // configuración de la patología activa
    let estado = null;   // valores introducidos por el usuario en esta sesión

    const el = (id) => document.getElementById(id);

    function estadoInicial() {
        return {
            motivo: '',
            anamnesis: { campos: {}, ultimoGenerado: '' },
            exploracion: { campos: {}, ultimoGenerado: '' },
            plan: { campos: {}, ultimoGenerado: '' }
        };
    }

    /* ==========================================================
       Carga de datos
       ==========================================================
       IMPORTANTE: los datos de cada patología se cargan como
       <script> (window.FISIOAP_PATOLOGIAS / window.FISIOAP_DATOS),
       NO con fetch(). Esto es a propósito: fetch() de archivos
       locales falla en Chrome/Edge al abrir el HTML con doble clic
       (protocolo file://), que es justo como se usará esta app en
       un PC sin conexión (pendrive, PC del SCS). La carga por
       <script> funciona igual online, offline y por file://, sin
       necesidad de ningún servidor.
       ========================================================== */

    function cargarScript(src) {
        return new Promise((resolve, reject) => {
            const yaCargado = Array.from(document.scripts).some((s) => s.src.endsWith(src));
            if (yaCargado) { resolve(); return; }
            const s = document.createElement('script');
            s.src = src;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('No se pudo cargar ' + src));
            document.body.appendChild(s);
        });
    }

    let datosGenerales = null;

    async function iniciar() {
        try {
            await cargarScript(RUTA_DATOS + 'patologias.js');
            listaPatologias = window.FISIOAP_PATOLOGIAS || [];
            if (listaPatologias.length === 0) throw new Error('patologias.js no definió ninguna patología');
            poblarSelectorPatologias();
            // general.js (tablas normativas, gestión de cita, sesión individual...) debe
            // cargarse ANTES de la primera patología, porque su renderizado (p. ej. la
            // dinamometría de prensión) puede necesitar datosGenerales ya disponible.
            await cargarScript(RUTA_DATOS + 'general.js');
            datosGenerales = window.FISIOAP_GENERAL || null;
            await cargarPatologia(listaPatologias[0].id);
            iniciarInterconsulta();
            iniciarIndividual();
            iniciarModalTest();
            iniciarPestañas();
            iniciarBorrarTodo();
            el('errorCarga').hidden = true;
        } catch (err) {
            console.error('Fisio+AP: error al cargar los datos', err);
            el('errorCargaDetalle').textContent = 'Detalle técnico: ' + (err && err.message ? err.message : err);
            el('errorCarga').hidden = false;
        }
    }

    // Asegura que los datos de una patología están cargados en
    // window.FISIOAP_DATOS[id] (los carga por <script> si hace falta) y
    // los devuelve. Común a la pestaña Valoración y a Interconsulta.
    async function asegurarDatosPatologia(id) {
        const meta = listaPatologias.find((p) => p.id === id);
        if (!meta) return null;
        if (!window.FISIOAP_DATOS || !window.FISIOAP_DATOS[id]) {
            await cargarScript(RUTA_DATOS + meta.archivo);
        }
        return (window.FISIOAP_DATOS && window.FISIOAP_DATOS[id]) || null;
    }

    function poblarSelectorPatologias() {
        const select = el('selectorPatologia');
        select.innerHTML = '';
        listaPatologias.forEach((p) => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nombre;
            select.appendChild(opt);
        });
        select.addEventListener('change', () => cargarPatologia(select.value));
    }

    async function cargarPatologia(id) {
        config = await asegurarDatosPatologia(id);
        if (!config) throw new Error('No se han encontrado datos para la patología "' + id + '"');
        estado = estadoInicial();
        renderTodo();
    }

    function renderTodo() {
        renderObjetivos();
        renderMotivo();
        renderAnamnesis();
        renderExploracion();
        renderPlan();
    }

    /* ==========================================================
       Utilidades de generación de texto
       ========================================================== */

    // Une una lista de strings en español: "a, b y c"
    function unirConY(items) {
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1];
    }

    function limpio(valor) {
        return (valor || '').toString().trim();
    }

    // Rellena una pareja de <select> hora/minuto (minutos solo 00/15/30/45,
    // para que el desplegable limite de verdad la granularidad, algo que
    // un <input type="time"> no garantiza en todos los navegadores).
    function poblarSelectoresHora(selectH, selectM) {
        selectH.innerHTML = '<option value="">--</option>' +
            Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0'))
                .map((h) => `<option value="${h}">${h}</option>`).join('');
        selectM.innerHTML = '<option value="">--</option>' +
            ['00', '15', '30', '45'].map((m) => `<option value="${m}">${m}</option>`).join('');
    }

    /* ==========================================================
       AVISOS / CRITERIOS DE DERIVACIÓN
       (solo viven en la pestaña Interconsulta: en Valoración el caso
       ya ha sido aceptado, así que no hace falta repetirlos)
       ========================================================== */

    // Construye el HTML de los avisos/criterios de derivación de UNA
    // patología concreta.
    function construirAvisosHTML(a) {
        if (!a) return '';
        const inclusion = (a.criteriosInclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');
        const exclusion = (a.criteriosExclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');
        return `
            <details class="aviso-derivacion">
                <summary>⚠️ Criterios de derivación / alarma</summary>
                <div class="aviso-contenido">
                    ${inclusion ? `<p class="aviso-subtitulo">Criterios de inclusión</p><ul>${inclusion}</ul>` : ''}
                    ${exclusion ? `<p class="aviso-subtitulo">Criterios de exclusión</p><ul>${exclusion}</ul>` : ''}
                    ${a.sesionesMaximas ? `<p class="aviso-sesiones">Número máximo de sesiones: <strong>${a.sesionesMaximas}</strong>.</p>` : ''}
                </div>
            </details>`;
    }

    /* ==========================================================
       OBJETIVOS
       ========================================================== */

    function renderObjetivos() {
        const cont = el('contenedorObjetivos');
        const o = config.objetivos;
        if (!o) { cont.innerHTML = ''; return; }

        const general = (o.general || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');
        const especificos = (o.especificos || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');

        cont.innerHTML = `
            <details class="objetivos-box">
                <summary>Objetivos</summary>
                <div class="objetivos-contenido">
                    ${general ? `<p class="objetivos-subtitulo">Objetivo general</p><ul>${general}</ul>` : ''}
                    ${especificos ? `<p class="objetivos-subtitulo">Objetivos específicos</p><ul>${especificos}</ul>` : ''}
                    <div class="acciones-copia">
                        <button type="button" class="btn-copiar" id="btnCopiarObjetivos">Copiar objetivos</button>
                    </div>
                </div>
            </details>`;

        el('btnCopiarObjetivos').addEventListener('click', (e) => {
            const bloques = [];
            if ((o.general || []).length) {
                bloques.push('Objetivo general:\n' + o.general.map((t) => '- ' + t).join('\n'));
            }
            if ((o.especificos || []).length) {
                bloques.push('Objetivos específicos:\n' + o.especificos.map((t) => '- ' + t).join('\n'));
            }
            copiarTexto(bloques.join('\n\n'), e.currentTarget);
        });
    }

    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    /* ==========================================================
       1. MOTIVO
       ==========================================================
       "Centro" se recuerda en este ordenador (localStorage): no es un
       dato del paciente, es el centro de trabajo del fisioterapeuta.
       "Diagnóstico" y "Motivo" NUNCA se recuerdan entre pacientes: son
       datos de la valoración actual y arrastrarlos de un paciente al
       siguiente sería un riesgo real de mezclar historias clínicas. */

    const CLAVE_LOCALSTORAGE_CENTRO = 'fisioap_centro';
    const CLAVE_LOCALSTORAGE_GESTION_CITA = 'fisioap_gestion_cita';

    // Genéricas: cualquier preferencia del CENTRO/CONSULTA (no del paciente)
    // puede guardarse así, pasando su propia clave.
    function leerValorGuardado(clave) {
        try {
            return window.localStorage.getItem(clave) || '';
        } catch (err) {
            return '';
        }
    }

    function guardarValorGuardado(clave, valor) {
        try {
            window.localStorage.setItem(clave, valor);
        } catch (err) {
            // Si el navegador bloquea localStorage (modo privado, etc.) simplemente lo omitimos.
        }
    }

    function leerCentroGuardado() {
        return leerValorGuardado(CLAVE_LOCALSTORAGE_CENTRO);
    }

    function guardarCentro(valor) {
        guardarValorGuardado(CLAVE_LOCALSTORAGE_CENTRO, valor);
    }

    function renderMotivo() {
        const cont = el('motivoCampos');
        cont.innerHTML = '';
        estado.motivo = { campos: {}, ultimoGenerado: '' };

        const lista = document.createElement('div');
        lista.className = 'campo-lista';
        (config.motivo.campos || []).forEach((campo) => {
            const elementoCampo = construirCampoGenerico(campo, estado.motivo.campos, regenerarMotivo);
            if (campo.persistirLocal) {
                const input = elementoCampo.querySelector('input, textarea, select');
                const valorGuardado = leerCentroGuardado();
                if (valorGuardado) {
                    input.value = valorGuardado;
                    estado.motivo.campos[campo.id] = valorGuardado;
                }
                // El listener de guardado debe existir SIEMPRE, no solo cuando
                // ya había un valor previo (si no, nunca se guardaría la primera vez).
                input.addEventListener('input', () => guardarCentro(input.value));
                input.addEventListener('change', () => guardarCentro(input.value));
            }
            lista.appendChild(elementoCampo);
        });
        cont.appendChild(lista);

        configurarTextoFinal('motivoTexto', 'regenerarMotivo', estado.motivo, regenerarMotivo);
        regenerarMotivo(true);
    }

    function generarTextoMotivo() {
        const p = config.motivo.plantilla;
        const campos = estado.motivo.campos;
        const centro = limpio(campos[p.campoCentro]);

        // Las cláusulas son alternativas entre sí (diagnóstico vs. motivo):
        // se usa la primera que tenga contenido, nunca varias a la vez.
        const clausula = (p.clausulas || []).find((c) => limpio(campos[c.campo]));

        if (!centro && !clausula) return '';

        let texto = p.base + (centro ? p.fragmentoCentro.replace('{valor}', centro) : '');
        if (clausula) texto += ' ' + clausula.texto.replace('{valor}', limpio(campos[clausula.campo]));
        return texto + p.sufijo;
    }

    function regenerarMotivo(forzar) {
        aplicarTextoGenerado('motivoTexto', estado.motivo, generarTextoMotivo(), forzar, 'regenerarMotivo');
    }

    /* ==========================================================
       VALORACIÓN DE INTERCONSULTA
       ==========================================================
       Pestaña independiente: tiene su propia patología (puede ser un
       paciente distinto al de la pestaña Valoración) y solo usa, de
       momento, el bloque MOTIVO — reutilizando los mismos campos y
       plantilla de la patología, más una decisión de aceptar/no
       aceptar que se añade a la frase final. "Centro" comparte el
       mismo localStorage que en Valoración (es el mismo centro de
       trabajo); Diagnóstico/Motivo y la decisión nunca se guardan.
       ========================================================== */

    let configInterconsulta = null;
    let estadoInterconsulta = null;

    function estadoInicialInterconsulta() {
        return { motivo: { campos: {}, ultimoGenerado: '' } };
    }

    function iniciarInterconsulta() {
        const select = el('interSelectorPatologia');
        select.innerHTML = '';
        listaPatologias.forEach((p) => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nombre;
            select.appendChild(opt);
        });
        select.addEventListener('change', () => cargarPatologiaInterconsulta(select.value));

        // Los criterios generales son iguales para todas las patologías:
        // se pintan una sola vez, no dependen de la selección.
        el('interCriteriosGenerales').innerHTML = construirCriteriosGeneralesHTML();

        cargarPatologiaInterconsulta(listaPatologias[0].id);
    }

    function construirCriteriosGeneralesHTML() {
        const g = datosGenerales && datosGenerales.criteriosDerivacionGenerales;
        if (!g) return '';

        const inclusion = (g.clinicosInclusion || []).map((zona) => {
            if (!zona.items || zona.items.length === 0) {
                return `<li>${escapeHTML(zona.zona)}</li>`;
            }
            if (zona.items.length === 1) {
                return `<li>${escapeHTML(zona.zona)}: ${escapeHTML(zona.items[0])}</li>`;
            }
            const subitems = zona.items.map((i) => `<li>${escapeHTML(i)}</li>`).join('');
            return `<li>${escapeHTML(zona.zona)}<ul class="aviso-sublista">${subitems}</ul></li>`;
        }).join('');

        const exclusion = (g.criteriosExclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');

        return `
            <details class="aviso-derivacion">
                <summary>⚠️ Criterios de derivación generales (comunes a todas las patologías)</summary>
                <div class="aviso-contenido">
                    ${inclusion ? `<p class="aviso-subtitulo">Clínicos de inclusión</p><ul>${inclusion}</ul>` : ''}
                    ${exclusion ? `<p class="aviso-subtitulo">Criterios de exclusión</p><ul>${exclusion}</ul>` : ''}
                </div>
            </details>`;
    }

    async function cargarPatologiaInterconsulta(id) {
        configInterconsulta = await asegurarDatosPatologia(id);
        if (!configInterconsulta) return;
        estadoInterconsulta = estadoInicialInterconsulta();
        el('interAvisos').innerHTML = construirAvisosHTML(configInterconsulta.avisos);
        renderMotivoInterconsulta();
    }

    function renderMotivoInterconsulta() {
        const cont = el('interMotivoCampos');
        cont.innerHTML = '';

        const lista = document.createElement('div');
        lista.className = 'campo-lista';
        (configInterconsulta.motivo.campos || []).forEach((campo) => {
            const elementoCampo = construirCampoGenerico(campo, estadoInterconsulta.motivo.campos, regenerarMotivoInterconsulta, 'inter_');
            if (campo.persistirLocal) {
                const input = elementoCampo.querySelector('input, textarea, select');
                const valorGuardado = leerCentroGuardado();
                if (valorGuardado) {
                    input.value = valorGuardado;
                    estadoInterconsulta.motivo.campos[campo.id] = valorGuardado;
                }
                input.addEventListener('input', () => guardarCentro(input.value));
                input.addEventListener('change', () => guardarCentro(input.value));
            }
            lista.appendChild(elementoCampo);
        });
        cont.appendChild(lista);

        const contDecision = el('interDecisionContenedor');
        contDecision.innerHTML = '';
        contDecision.appendChild(construirGrupoBotones({
            id: 'inter_decision',
            opciones: ['Se acepta el proceso', 'No se acepta el proceso'],
            sinEtiqueta: true,
            mapaValores: { 'Se acepta el proceso': 'aceptado', 'No se acepta el proceso': 'no_aceptado' }
        }, estadoInterconsulta.motivo.campos, () => {
            actualizarVisibilidadGestionCita();
            regenerarMotivoInterconsulta();
        }));

        renderGestionCitaInterconsulta();
        actualizarVisibilidadGestionCita();

        configurarTextoFinal('interMotivoTexto', 'interRegenerarMotivo', estadoInterconsulta.motivo, regenerarMotivoInterconsulta);
        regenerarMotivoInterconsulta(true);
    }

    // El bloque "Próxima cita" (quién llama, cuándo) solo tiene sentido
    // una vez se ha aceptado el proceso; se oculta en cualquier otro caso
    // (y se limpia, para que no quede una frase suelta sin decisión).
    function actualizarVisibilidadGestionCita() {
        const contenedor = el('interGestionCitaContenedor');
        const aceptado = estadoInterconsulta.motivo.campos.inter_decision === 'aceptado';
        contenedor.hidden = !aceptado;
    }

    function renderGestionCitaInterconsulta() {
        const g = datosGenerales && datosGenerales.gestionCita;
        const cont = el('interGestionCitaCampos');
        cont.innerHTML = '';
        if (!g) return;

        const campoOpcion = g.campoOpcion;
        const wrapSelect = document.createElement('label');
        wrapSelect.className = 'campo-simple';
        const span = document.createElement('span');
        span.textContent = campoOpcion.etiqueta;
        wrapSelect.appendChild(span);
        const select = document.createElement('select');
        select.id = 'inter_' + campoOpcion.id;
        select.innerHTML = '<option value="">Seleccionar…</option>' +
            g.opciones.map((o) => `<option value="${escapeHTML(o.id)}">${escapeHTML(o.etiqueta)}</option>`).join('');
        wrapSelect.appendChild(select);
        cont.appendChild(wrapSelect);

        const wrapFechaHora = document.createElement('div');
        wrapFechaHora.className = 'plan-grid-moderno';
        wrapFechaHora.hidden = true;
        wrapFechaHora.innerHTML = `
            <label class="plan-campo">
                <span>Fecha</span>
                <input type="date" id="inter_gestion_fecha" class="plan-input">
            </label>
            <label class="plan-campo">
                <span>Hora</span>
                <div class="plan-hora-grupo">
                    <select id="inter_gestion_hora_h" class="plan-input"></select>
                    <span class="plan-hora-separador">:</span>
                    <select id="inter_gestion_hora_m" class="plan-input"></select>
                </div>
            </label>`;
        cont.appendChild(wrapFechaHora);
        poblarSelectoresHora(el('inter_gestion_hora_h'), el('inter_gestion_hora_m'));

        if (campoOpcion.persistirLocal) {
            const valorGuardado = leerValorGuardado(CLAVE_LOCALSTORAGE_GESTION_CITA);
            if (valorGuardado) select.value = valorGuardado;
        }

        const actualizarFechaHoraVisible = () => {
            const opcion = g.opciones.find((o) => o.id === select.value);
            wrapFechaHora.hidden = !(opcion && opcion.necesitaFechaHora);
        };
        actualizarFechaHoraVisible();

        const onCambioOpcion = () => {
            estadoInterconsulta.motivo.campos.inter_gestion_opcion = select.value;
            if (campoOpcion.persistirLocal) guardarValorGuardado(CLAVE_LOCALSTORAGE_GESTION_CITA, select.value);
            actualizarFechaHoraVisible();
            regenerarMotivoInterconsulta();
        };
        select.addEventListener('change', onCambioOpcion);
        if (select.value) onCambioOpcion();

        ['inter_gestion_fecha', 'inter_gestion_hora_h', 'inter_gestion_hora_m'].forEach((id) => {
            el(id).addEventListener('change', () => {
                estadoInterconsulta.motivo.campos[id] = el(id).value;
                regenerarMotivoInterconsulta();
            });
        });
    }

    function generarTextoMotivoInterconsulta() {
        const p = configInterconsulta.motivo.plantilla;
        const campos = estadoInterconsulta.motivo.campos;
        const centro = limpio(campos[p.campoCentro]);
        const clausula = (p.clausulas || []).find((c) => limpio(campos[c.campo]));
        const decision = campos.inter_decision;
        const textosDecision = (configInterconsulta.avisos && configInterconsulta.avisos.decisionInterconsulta) || {};

        if (!centro && !clausula && !decision) return '';

        let texto = p.base + (centro ? p.fragmentoCentro.replace('{valor}', centro) : '');
        if (clausula) texto += ' ' + clausula.texto.replace('{valor}', limpio(campos[clausula.campo]));
        texto += p.sufijo;

        if (decision === 'aceptado' && textosDecision.textoAceptado) {
            texto += ' ' + textosDecision.textoAceptado;
            texto += generarFraseGestionCita(campos);
        } else if (decision === 'no_aceptado' && textosDecision.textoNoAceptado) {
            texto += ' ' + textosDecision.textoNoAceptado;
        }
        return texto;
    }

    // Frase de "quién llama/cita al paciente", solo si hay opción elegida
    // y, cuando hace falta fecha/hora, solo si ambas están rellenas (si no,
    // no se inventa una cita a medias).
    function generarFraseGestionCita(campos) {
        const g = datosGenerales && datosGenerales.gestionCita;
        if (!g) return '';
        const opcion = (g.opciones || []).find((o) => o.id === campos.inter_gestion_opcion);
        if (!opcion) return '';

        if (!opcion.necesitaFechaHora) {
            return ' ' + opcion.texto;
        }
        const fecha = limpio(campos.inter_gestion_fecha);
        const horaH = campos.inter_gestion_hora_h;
        const horaM = campos.inter_gestion_hora_m;
        if (!fecha || !horaH || !horaM) return '';
        return ' ' + opcion.texto
            .replace('{fecha}', formatearFecha(fecha))
            .replace('{hora}', `${horaH}:${horaM}`);
    }

    function regenerarMotivoInterconsulta(forzar) {
        aplicarTextoGenerado('interMotivoTexto', estadoInterconsulta.motivo, generarTextoMotivoInterconsulta(), forzar, 'interRegenerarMotivo');
    }

    /* ==========================================================
       SESIÓN INDIVIDUAL
       ==========================================================
       Sin selector de patología: la nota de evolución es genérica y
       vale para cualquier proceso (el diagnóstico va como texto libre
       en MOTIVO). Sus datos viven en general.js, bajo "sesionIndividual".
       ========================================================== */

    let datosIndividual = null;
    let estadoIndividual = null;

    function estadoInicialIndividual() {
        return {
            motivo: { campos: {}, ultimoGenerado: '' },
            anamnesis: { campos: {}, ultimoGenerado: '' },
            plan: { campos: {}, ultimoGenerado: '' }
        };
    }

    function iniciarIndividual() {
        datosIndividual = datosGenerales && datosGenerales.sesionIndividual;
        if (!datosIndividual) return;
        estadoIndividual = estadoInicialIndividual();
        renderMotivoIndividual();
        renderAnamnesisIndividual();
        renderPlanIndividual();
    }

    // ---- Motivo ----

    function renderMotivoIndividual() {
        const cont = el('indivMotivoCampos');
        cont.innerHTML = '';
        (datosIndividual.motivo.campos || []).forEach((campo) => {
            const elementoCampo = construirCampoGenerico(campo, estadoIndividual.motivo.campos, regenerarMotivoIndividual, 'indiv_');
            if (campo.persistirLocal) {
                const input = elementoCampo.querySelector('input, textarea, select');
                const valorGuardado = leerCentroGuardado();
                if (valorGuardado) {
                    input.value = valorGuardado;
                    estadoIndividual.motivo.campos[campo.id] = valorGuardado;
                }
                input.addEventListener('input', () => guardarCentro(input.value));
                input.addEventListener('change', () => guardarCentro(input.value));
            }
            cont.appendChild(elementoCampo);
        });
        configurarTextoFinal('indivMotivoTexto', 'indivRegenerarMotivo', estadoIndividual.motivo, regenerarMotivoIndividual);
        regenerarMotivoIndividual(true);
    }

    function generarTextoMotivoIndividual() {
        const p = datosIndividual.motivo.plantilla;
        const campos = estadoIndividual.motivo.campos;
        const centro = limpio(campos[p.campoCentro]);
        const clausula = (p.clausulas || []).find((c) => limpio(campos[c.campo]));
        if (!centro && !clausula) return '';
        let texto = p.base + (centro ? p.fragmentoCentro.replace('{valor}', centro) : '');
        if (clausula) texto += ' ' + clausula.texto.replace('{valor}', limpio(campos[clausula.campo]));
        return texto + p.sufijo;
    }

    function regenerarMotivoIndividual(forzar) {
        aplicarTextoGenerado('indivMotivoTexto', estadoIndividual.motivo, generarTextoMotivoIndividual(), forzar, 'indivRegenerarMotivo');
    }

    // ---- Anamnesis (nota de evolución) ----

    function renderAnamnesisIndividual() {
        const cont = el('indivAnamnesisCampos');
        cont.innerHTML = '';
        (datosIndividual.anamnesis.campos || []).forEach((campo) => {
            cont.appendChild(construirCampoGenerico(campo, estadoIndividual.anamnesis.campos, regenerarAnamnesisIndividual, 'indiv_'));
        });
        configurarTextoFinal('indivAnamnesisTexto', 'indivRegenerarAnamnesis', estadoIndividual.anamnesis, regenerarAnamnesisIndividual);
        regenerarAnamnesisIndividual(true);
    }

    function generarTextoAnamnesisIndividual() {
        return generarTextoSeccionNarrativa(datosIndividual.anamnesis, estadoIndividual.anamnesis.campos);
    }

    function regenerarAnamnesisIndividual(forzar) {
        aplicarTextoGenerado('indivAnamnesisTexto', estadoIndividual.anamnesis, generarTextoAnamnesisIndividual(), forzar, 'indivRegenerarAnamnesis');
    }

    // ---- Plan de actuación ----

    function renderPlanIndividual() {
        const pa = datosIndividual.planActuacion;

        const contInt = el('indivIntervenciones');
        contInt.innerHTML = '';
        const h3Int = document.createElement('h3');
        h3Int.textContent = pa.intervenciones.titulo;
        contInt.appendChild(h3Int);
        contInt.appendChild(construirChecklist(pa.intervenciones, estadoIndividual.plan.campos, regenerarPlanIndividual));

        const contResp = el('indivRespuestaContenedor');
        contResp.innerHTML = '';
        contResp.appendChild(construirCampoGenerico(pa.respuesta.campo, estadoIndividual.plan.campos, regenerarPlanIndividual, 'indiv_'));

        const contCont = el('indivContinuidadContenedor');
        contCont.innerHTML = '';
        contCont.appendChild(construirCampoGenerico(pa.continuidad.campo, estadoIndividual.plan.campos, regenerarPlanIndividual, 'indiv_'));

        const contNotas = el('indivPlanNotasContenedor');
        contNotas.innerHTML = '';
        contNotas.appendChild(construirCampoGenerico(pa.notasCampo, estadoIndividual.plan.campos, regenerarPlanIndividual, 'indiv_'));

        configurarTextoFinal('indivPlanTexto', 'indivRegenerarPlan', estadoIndividual.plan, regenerarPlanIndividual);
        regenerarPlanIndividual(true);
    }

    function generarTextoPlanIndividual() {
        const pa = datosIndividual.planActuacion;
        const campos = estadoIndividual.plan.campos;
        const partes = [];

        const textoInt = generarTextoSeccionChecklist(pa.intervenciones, campos);
        if (textoInt) partes.push(textoInt);

        const respuesta = campos[pa.respuesta.campo.id];
        if (respuesta && pa.respuesta.frases[respuesta]) partes.push(pa.respuesta.frases[respuesta]);

        const continuidad = campos[pa.continuidad.campo.id];
        if (continuidad && pa.continuidad.frases[continuidad]) partes.push(pa.continuidad.frases[continuidad]);

        const notas = limpio(campos[pa.notasCampo.id]);
        if (notas) partes.push(notas);

        return partes.join('\n');
    }

    function regenerarPlanIndividual(forzar) {
        aplicarTextoGenerado('indivPlanTexto', estadoIndividual.plan, generarTextoPlanIndividual(), forzar, 'indivRegenerarPlan');
    }

    /* ==========================================================
       PESTAÑAS (Interconsulta / Valoración / Sesión Individual / Alta)
       ========================================================== */

    let pestañaActiva = 'interconsulta';

    function iniciarPestañas() {
        document.querySelectorAll('.fisioap-tab').forEach((boton) => {
            boton.addEventListener('click', () => activarPestaña(boton.dataset.tab));
        });
    }

    function activarPestaña(tab) {
        pestañaActiva = tab;
        document.querySelectorAll('.fisioap-tab').forEach((boton) => {
            const activo = boton.dataset.tab === tab;
            boton.classList.toggle('activo', activo);
            boton.setAttribute('aria-selected', activo ? 'true' : 'false');
        });
        document.querySelectorAll('.fisioap-panel').forEach((panel) => {
            panel.hidden = panel.dataset.panel !== tab;
        });
    }

    // "Borrar todo": limpia SOLO los datos de la pestaña que está activa
    // en ese momento, no las otras. Pide confirmación para evitar que un
    // misclick borre una valoración a medio rellenar.
    function iniciarBorrarTodo() {
        el('btnBorrarTodo').addEventListener('click', () => {
            const confirmado = window.confirm('¿Borrar todos los datos de esta pestaña? Esta acción no se puede deshacer.');
            if (!confirmado) return;
            if (pestañaActiva === 'interconsulta') {
                cargarPatologiaInterconsulta(el('interSelectorPatologia').value);
            } else if (pestañaActiva === 'valoracion') {
                cargarPatologia(el('selectorPatologia').value);
            } else if (pestañaActiva === 'individual') {
                iniciarIndividual();
            }
            // "alta" no tiene datos que borrar todavía.
        });
    }

    /* ==========================================================
       2. ANAMNESIS
       ========================================================== */

    function renderAnamnesis() {
        const cont = el('anamnesisCampos');
        cont.innerHTML = '';
        estado.anamnesis = { campos: {}, ultimoGenerado: '' };

        (config.anamnesis.secciones || []).forEach((seccion) => {
            const box = document.createElement('div');
            box.className = 'subseccion';
            const h3 = document.createElement('h3');
            h3.textContent = seccion.titulo;
            box.appendChild(h3);
            if (seccion.ayuda) {
                const ayudaSeccion = document.createElement('p');
                ayudaSeccion.className = 'ayuda-seccion';
                ayudaSeccion.textContent = seccion.ayuda;
                box.appendChild(ayudaSeccion);
            }

            if (seccion.tipo === 'checklist') {
                box.appendChild(construirChecklist(seccion, estado.anamnesis.campos, regenerarAnamnesis));
            } else {
                // "narrativa" (o cualquier sección basada en campos individuales):
                // una fila por campo, con espacio de sobra y ayuda contextual.
                const lista = document.createElement('div');
                lista.className = 'campo-lista';
                (seccion.campos || []).forEach((campo) => {
                    lista.appendChild(construirCampoGenerico(campo, estado.anamnesis.campos, regenerarAnamnesis));
                });
                box.appendChild(lista);
            }
            cont.appendChild(box);
        });

        configurarTextoFinal('anamnesisTexto', 'regenerarAnamnesis', estado.anamnesis, regenerarAnamnesis);
        regenerarAnamnesis(true);
    }

    /* ---- Motor genérico de plantillas narrativas (data-driven) ----
       Cada "grupo narrativo" describe una frase que solo aparece si
       al menos uno de sus campos tiene valor. Nunca se inventa texto
       para un campo vacío. Ver datos/fisio-ap/*.js para ejemplos. */

    function generarGrupoNarrativo(grupo, campos) {
        if (grupo.tipo === 'tristate') {
            const v = campos[grupo.campo];
            if (v === 'si') return grupo.textoSi || '';
            if (v === 'no') return grupo.textoNo || '';
            return '';
        }
        // Traduce el valor elegido (una "opción") a una frase fija ya
        // redactada. Nunca genera nada si no hay opción seleccionada.
        if (grupo.tipo === 'mapaFrases') {
            const v = campos[grupo.campo];
            return (v && grupo.frases && grupo.frases[v]) || '';
        }
        // Binario (Sí/No) con un texto fijo para "No" y, para "Sí", una
        // frase con o sin detalle según se haya escrito algo o no.
        if (grupo.tipo === 'binarioDetalle') {
            const v = campos[grupo.campo];
            if (v === 'no') return grupo.textoNo || '';
            if (v === 'si') {
                const detalle = limpio(campos[grupo.campoDetalle]);
                if (detalle && grupo.textoSiConDetalle) return grupo.textoSiConDetalle.replace('{valor}', detalle);
                return grupo.textoSiSinDetalle || '';
            }
            return '';
        }
        const partes = (grupo.fragmentos || [])
            .map((f) => {
                const valor = limpio(campos[f.campo]);
                if (!valor) return null;
                return f.texto.replace('{valor}', valor);
            })
            .filter((x) => x !== null);
        if (partes.length === 0) return '';
        const union = grupo.union !== undefined ? grupo.union : ', ';
        const prefijo = grupo.prefijo || '';
        const sufijo = grupo.sufijo !== undefined ? grupo.sufijo : '.';
        return prefijo + partes.join(union) + sufijo;
    }

    function generarTextoSeccionNarrativa(seccion, campos) {
        return (seccion.gruposNarrativos || [])
            .map((g) => generarGrupoNarrativo(g, campos))
            .filter(Boolean)
            .join(' ');
    }

    function generarTextoSeccionChecklist(seccion, campos) {
        const opciones = seccion.opciones || [];
        const opcionExclusivaMarcada = opciones.find((o) => o.exclusivoConTodo && campos[o.id]);
        if (opcionExclusivaMarcada) return opcionExclusivaMarcada.fraseCompleta || '';

        const seleccionadas = opciones
            .filter((o) => !o.exclusivoConTodo && campos[o.id])
            .map((o) => o.fraseTexto || o.etiqueta.toLowerCase());
        const otroId = seccion.otro && seccion.otro.id;
        const otroValor = otroId ? limpio(campos[otroId]) : '';
        if (otroValor) seleccionadas.push(otroValor);
        if (seleccionadas.length === 0) return '';
        const prefijo = seccion.prefijoTexto || '';
        const sufijo = seccion.sufijoTexto !== undefined ? seccion.sufijoTexto : '.';
        return prefijo + unirConY(seleccionadas) + sufijo;
    }

    function generarTextoAnamnesis() {
        const partes = [];
        (config.anamnesis.secciones || []).forEach((seccion) => {
            const t = seccion.tipo === 'checklist'
                ? generarTextoSeccionChecklist(seccion, estado.anamnesis.campos)
                : generarTextoSeccionNarrativa(seccion, estado.anamnesis.campos);
            if (t) partes.push(t);
        });
        return partes.join(' ');
    }

    function regenerarAnamnesis(forzar) {
        aplicarTextoGenerado('anamnesisTexto', estado.anamnesis, generarTextoAnamnesis(), forzar, 'regenerarAnamnesis');
    }

    /* ==========================================================
       3. EXPLORACIÓN FÍSICA
       ========================================================== */

    function renderExploracion() {
        estado.exploracion = { campos: {}, ultimoGenerado: '' };
        const ef = config.exploracionFisica;

        renderInspeccionPalpacion(ef.inspeccionPalpacion);
        renderMovilidadArticular(ef.movilidadArticular);
        renderBalanceMuscular(ef.balanceMuscular);
        renderDinamometria(ef.dinamometriaPrension);
        renderActitudPostural(ef.actitudPostural);
        renderSensibilidad(ef.sensibilidad);
        renderTestsEspecificos(ef.testsEspecificos);

        configurarTextoFinal('exploracionTexto', 'regenerarExploracion', estado.exploracion, regenerarExploracion);
        regenerarExploracion(true);
    }

    // Todas las subsecciones de Exploración física son opcionales: no toda
    // patología necesita, por ejemplo, "sensibilidad" (EPOC) o tests
    // específicos ortopédicos. Si la clave no existe en los datos, se omite
    // limpiamente en vez de romper.
    function limpiarContenedor(idContenedor) {
        const cont = el(idContenedor);
        cont.innerHTML = '';
        return cont;
    }

    function renderInspeccionPalpacion(datos) {
        const cont = limpiarContenedor('subInspeccionPalpacion');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);
        const grid = document.createElement('div');
        grid.className = 'campo-grid';
        (datos.campos || []).forEach((campo) => {
            grid.appendChild(construirCampoGenerico(campo, estado.exploracion.campos, regenerarExploracion));
        });
        cont.appendChild(grid);
    }

    function renderMovilidadArticular(datos) {
        const cont = limpiarContenedor('subMovilidadArticular');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        (datos.movimientos || []).forEach((mov) => {
            cont.appendChild(construirGrupoBotones({
                id: mov.id,
                etiqueta: mov.etiqueta,
                opciones: mov.categorias
            }, estado.exploracion.campos, regenerarExploracion));
        });

        if (datos.campoEspecificaciones) {
            const lista = document.createElement('div');
            lista.className = 'campo-lista campo-lista-compacta';
            lista.appendChild(construirCampoGenerico(datos.campoEspecificaciones, estado.exploracion.campos, regenerarExploracion));
            cont.appendChild(lista);
        }
    }

    function renderBalanceMuscular(datos) {
        const cont = limpiarContenedor('subBalanceMuscular');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        const ayuda = document.createElement('p');
        ayuda.className = 'ayuda-daniels';
        ayuda.innerHTML = 'Escala de Daniels (0-5): ' +
            datos.escala.map((e) => `<strong>${e.valor}</strong> ${escapeHTML(e.descripcion)}`).join(' · ');
        cont.appendChild(ayuda);

        const opciones = [...datos.escala.map((e) => e.valor), 'No valorado'];
        (datos.movimientos || []).forEach((mov) => {
            const fila = construirGrupoBotones({
                id: mov.id,
                etiqueta: mov.etiqueta,
                opciones,
                claseExtra: 'grupo-daniels'
            }, estado.exploracion.campos, regenerarExploracion);
            cont.appendChild(fila);
        });
    }

    /* ==========================================================
       DINAMOMETRÍA DE PRENSIÓN MANUAL
       ==========================================================
       Opcional (como el resto de subsecciones): solo aparece si la
       patología define ef.dinamometriaPrension. La tabla normativa
       (Steiber N. 2016, PLOS ONE, DOI 10.1371/journal.pone.0163917)
       vive en general.js, en datosGenerales.normativaDinamometria,
       porque no es específica de ninguna patología y así se puede
       reutilizar sin duplicar los 196 valores en cada .js.
       ========================================================== */

    // "32.5" -> "32,5" (coma decimal, como en el ejemplo del texto pedido)
    function formatearNumeroEs(numero, decimales) {
        return numero.toFixed(decimales).replace('.', ',');
    }

    // Grupos de edad EXACTOS de las tablas originales de Steiber (17-90 años).
    function buscarGrupoEdadSteiber(edad) {
        const rangos = [
            [17, 19, '17-19'], [20, 24, '20-24'], [25, 29, '25-29'], [30, 34, '30-34'],
            [35, 39, '35-39'], [40, 44, '40-44'], [45, 49, '45-49'], [50, 54, '50-54'],
            [55, 59, '55-59'], [60, 64, '60-64'], [65, 69, '65-69'], [70, 74, '70-74'],
            [75, 79, '75-79'], [80, 90, '80-90']
        ];
        const r = rangos.find(([min, max]) => edad >= min && edad <= max);
        return r ? r[2] : null;
    }

    // Grupos de talla EXACTOS de la tabla (distintos para hombres/mujeres:
    // hombres tiene un grupo abierto "190+"; mujeres no pasa de 180-184,
    // porque la muestra del estudio no incluyó mujeres más altas).
    function buscarGrupoTallaSteiber(sexo, talla) {
        const tabla = datosGenerales && datosGenerales.normativaDinamometria && datosGenerales.normativaDinamometria.steiber2016;
        if (!tabla) return null;
        const bloque = sexo === 'Hombre' ? tabla.hombres : tabla.mujeres;
        if (!bloque) return null;
        if (talla < bloque.tallaMinCm) return null;
        if (sexo === 'Hombre') {
            if (talla >= 190) return '190+';
            const base = Math.floor((talla - 160) / 5) * 5 + 160;
            return `${base}-${base + 4}`;
        }
        if (talla > bloque.tallaMaxCm) return null;
        const base = Math.floor((talla - 150) / 5) * 5 + 150;
        return `${base}-${base + 4}`;
    }

    // Devuelve { grupoEdad, grupoTalla, valor } — valor es {media, umbralRiesgo}
    // o null si esa combinación exacta no consta en la tabla original (nunca
    // se inventa ni se interpola).
    function buscarValorReferenciaSteiber(sexo, edad, talla) {
        const tabla = datosGenerales && datosGenerales.normativaDinamometria && datosGenerales.normativaDinamometria.steiber2016;
        if (!tabla || !sexo || !Number.isFinite(edad) || !Number.isFinite(talla)) {
            return { grupoEdad: null, grupoTalla: null, valor: null };
        }
        const grupoEdad = buscarGrupoEdadSteiber(edad);
        const grupoTalla = buscarGrupoTallaSteiber(sexo, talla);
        if (!grupoEdad || !grupoTalla) return { grupoEdad, grupoTalla, valor: null };
        const bloque = sexo === 'Hombre' ? tabla.hombres : tabla.mujeres;
        const valor = (bloque.valores[grupoEdad] && bloque.valores[grupoEdad][grupoTalla]) || null;
        return { grupoEdad, grupoTalla, valor };
    }

    function renderDinamometria(datos) {
        const cont = limpiarContenedor('subDinamometria');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        const onCambio = () => { actualizarResultadoDinamometria(); regenerarExploracion(); };
        const campos = estado.exploracion.campos;

        // Datos para la referencia
        const gridRef = document.createElement('div');
        gridRef.className = 'campo-grid';
        gridRef.appendChild(construirCampoGenerico(
            { id: 'dina_sexo', tipo: 'select', etiqueta: 'Sexo', opciones: ['Hombre', 'Mujer'] }, campos, onCambio));
        gridRef.appendChild(construirCampoGenerico(
            { id: 'dina_edad', tipo: 'numero', etiqueta: 'Edad (años)', min: 0, max: 120,
              ayuda: 'El grupo de edad de la tabla de referencia se determina automáticamente.' }, campos, onCambio));
        gridRef.appendChild(construirCampoGenerico(
            { id: 'dina_talla', tipo: 'numero', etiqueta: 'Talla (cm)', min: 100, max: 230,
              ayuda: 'Opcional; solo hace falta para comparar con la tabla de referencia.' }, campos, onCambio));
        gridRef.appendChild(construirCampoGenerico(
            { id: 'dina_mano_dominante', tipo: 'select', etiqueta: 'Mano dominante', opciones: ['Derecha', 'Izquierda'] }, campos, onCambio));
        cont.appendChild(gridRef);

        // Dispositivo (con "Otro" -> marca/modelo libre). Predeterminado a
        // SAEHAN Smedley, pero nunca bloquea registrar la medición si es otro.
        const gridDispositivo = document.createElement('div');
        gridDispositivo.className = 'campo-grid';

        const labelDisp = document.createElement('label');
        labelDisp.className = 'campo-simple';
        const spanDisp = document.createElement('span');
        spanDisp.textContent = 'Dinamómetro utilizado';
        const selectDisp = document.createElement('select');
        selectDisp.innerHTML = ['SAEHAN Smedley', 'Otro'].map((o) => `<option value="${o}">${o}</option>`).join('');
        selectDisp.value = 'SAEHAN Smedley';
        campos.dina_dispositivo = 'SAEHAN Smedley';
        labelDisp.appendChild(spanDisp);
        labelDisp.appendChild(selectDisp);
        gridDispositivo.appendChild(labelDisp);

        const labelOtro = document.createElement('label');
        labelOtro.className = 'campo-simple';
        labelOtro.hidden = true;
        const spanOtro = document.createElement('span');
        spanOtro.textContent = 'Marca / modelo';
        const inputOtro = document.createElement('input');
        inputOtro.type = 'text';
        labelOtro.appendChild(spanOtro);
        labelOtro.appendChild(inputOtro);
        gridDispositivo.appendChild(labelOtro);

        selectDisp.addEventListener('change', () => {
            campos.dina_dispositivo = selectDisp.value;
            labelOtro.hidden = selectDisp.value !== 'Otro';
            if (selectDisp.value !== 'Otro') {
                campos.dina_dispositivo_otro = '';
                inputOtro.value = '';
            }
            onCambio();
        });
        inputOtro.addEventListener('input', () => {
            campos.dina_dispositivo_otro = inputOtro.value;
            onCambio();
        });
        cont.appendChild(gridDispositivo);

        // Medición: dos columnas (derecha / izquierda), mismos campos cada una
        const filaManos = document.createElement('div');
        filaManos.className = 'dinamometria-manos';
        ['Derecha', 'Izquierda'].forEach((lado) => {
            const prefijo = lado === 'Derecha' ? 'dina_der' : 'dina_izq';
            const col = document.createElement('div');
            col.className = 'dinamometria-columna';
            const tituloCol = document.createElement('h4');
            tituloCol.textContent = 'Mano ' + lado.toLowerCase();
            col.appendChild(tituloCol);
            col.appendChild(construirCampoGenerico(
                { id: `${prefijo}_valor`, tipo: 'numero', etiqueta: 'Prensión máxima (kg)', min: 0, max: 150, step: 0.1 }, campos, onCambio));
            col.appendChild(construirCampoGenerico(
                { id: `${prefijo}_dolor`, tipo: 'binario', etiqueta: 'Dolor durante la prueba' }, campos, onCambio));
            col.appendChild(construirCampoGenerico(
                { id: `${prefijo}_obs`, tipo: 'texto', etiqueta: 'Observaciones' }, campos, onCambio));
            filaManos.appendChild(col);
        });
        cont.appendChild(filaManos);

        // Paneles calculados (no son campos, se recalculan solos)
        const resultado = document.createElement('div');
        resultado.id = 'dinamometriaResultado';
        resultado.className = 'dinamometria-panel';
        cont.appendChild(resultado);

        const referencia = document.createElement('div');
        referencia.id = 'dinamometriaReferencia';
        referencia.className = 'dinamometria-panel';
        cont.appendChild(referencia);

        // Reproducibilidad + nota metodológica + cita, plegado por defecto
        const info = document.createElement('details');
        info.className = 'dinamometria-info';
        const fuenteSteiber = datosGenerales && datosGenerales.normativaDinamometria && datosGenerales.normativaDinamometria.steiber2016;
        info.innerHTML = `
            <summary>ℹ️ Sobre esta medición y su referencia</summary>
            <p><strong>Para que la medición sea comparable entre sesiones:</strong></p>
            <ul>
                <li>Realiza la medición en ambas manos.</li>
                <li>Utiliza siempre el mismo dinamómetro y la misma configuración.</li>
                <li>Mantén una posición de medición constante.</li>
                <li>Mantén un número de intentos constante.</li>
                <li>Mantén tiempos de descanso constantes.</li>
                <li>Registra el valor máximo obtenido según el protocolo de tu centro.</li>
            </ul>
            ${fuenteSteiber ? `
                <p class="dinamometria-nota-metodologica">${escapeHTML(fuenteSteiber.fuente.notaMetodologica)}</p>
                <p class="dinamometria-cita">${escapeHTML(fuenteSteiber.fuente.cita)}</p>` : ''}
        `;
        cont.appendChild(info);

        actualizarResultadoDinamometria();
    }

    function actualizarResultadoDinamometria() {
        const contResultado = el('dinamometriaResultado');
        const contReferencia = el('dinamometriaReferencia');
        if (!contResultado || !contReferencia) return;

        const campos = estado.exploracion.campos;
        const derVal = parseFloat(campos.dina_der_valor);
        const izqVal = parseFloat(campos.dina_izq_valor);
        const derValida = Number.isFinite(derVal);
        const izqValida = Number.isFinite(izqVal);

        if (!derValida && !izqValida) {
            contResultado.innerHTML = '';
            contReferencia.innerHTML = '';
            return;
        }

        const dominante = campos.dina_mano_dominante;
        const filas = [];
        if (derValida) filas.push(`Derecha: <strong>${formatearNumeroEs(derVal, 1)} kg</strong>`);
        if (izqValida) filas.push(`Izquierda: <strong>${formatearNumeroEs(izqVal, 1)} kg</strong>`);

        let lineaBilateral = '';
        if (derValida && izqValida && (dominante === 'Derecha' || dominante === 'Izquierda')) {
            const dominanteKg = dominante === 'Derecha' ? derVal : izqVal;
            const noDominanteKg = dominante === 'Derecha' ? izqVal : derVal;
            const diffKg = Math.abs(derVal - izqVal);
            const maxKg = Math.max(derVal, izqVal);
            const diffPct = maxKg > 0 ? (diffKg / maxKg) * 100 : 0;
            lineaBilateral = `
                <p>Dominante: <strong>${formatearNumeroEs(dominanteKg, 1)} kg</strong> ·
                   No dominante: <strong>${formatearNumeroEs(noDominanteKg, 1)} kg</strong></p>
                <p>Diferencia entre manos: <strong>${formatearNumeroEs(diffKg, 1)} kg (${formatearNumeroEs(diffPct, 1)}%)</strong></p>`;
        } else if (derValida && izqValida) {
            lineaBilateral = '<p class="dinamometria-aviso-suave">Indica la mano dominante para calcular la diferencia bilateral.</p>';
        }

        contResultado.innerHTML = `
            <p class="dinamometria-panel-titulo">Resultado</p>
            <p>${filas.join(' · ')}</p>
            ${lineaBilateral}
        `;

        // Referencia normativa
        const sexo = campos.dina_sexo;
        const edad = parseFloat(campos.dina_edad);
        const talla = parseFloat(campos.dina_talla);
        const edadValida = Number.isFinite(edad);
        const tallaValida = Number.isFinite(talla);
        const dominanteValida = dominante === 'Derecha' ? derValida : (dominante === 'Izquierda' ? izqValida : false);

        const faltantes = [];
        if (!sexo) faltantes.push('el sexo');
        if (!edadValida) faltantes.push('la edad');
        if (!tallaValida) faltantes.push('la talla');
        if (!dominante) faltantes.push('la mano dominante');
        if (dominante && !dominanteValida) faltantes.push(`la medición de la mano ${dominante.toLowerCase()}`);

        if (faltantes.length > 0) {
            contReferencia.innerHTML = `<p class="dinamometria-panel-titulo">Referencia publicada</p>
                <p class="dinamometria-aviso-suave">Introduzca ${unirConY(faltantes)} para mostrar el valor de referencia.</p>`;
            return;
        }

        const ref = buscarValorReferenciaSteiber(sexo, edad, talla);
        const fuenteSteiber = datosGenerales && datosGenerales.normativaDinamometria && datosGenerales.normativaDinamometria.steiber2016;
        if (!fuenteSteiber) { contReferencia.innerHTML = ''; return; }

        if (!ref.grupoEdad || !ref.grupoTalla) {
            contReferencia.innerHTML = `<p class="dinamometria-panel-titulo">Referencia publicada</p>
                <p class="dinamometria-aviso-suave">La edad o la talla introducidas quedan fuera del rango de la tabla de referencia. No se muestra comparación.</p>`;
            return;
        }
        if (!ref.valor) {
            contReferencia.innerHTML = `<p class="dinamometria-panel-titulo">Referencia publicada</p>
                <p class="dinamometria-aviso-suave">No hay un valor publicado para esta combinación exacta de edad y talla en la tabla original.</p>`;
            return;
        }

        const dominanteKg = dominante === 'Derecha' ? derVal : izqVal;
        const avisoDispositivo = campos.dina_dispositivo === 'Otro'
            ? '<p class="dinamometria-aviso-suave">La referencia seleccionada procede de mediciones realizadas con un dinamómetro Smedley. La comparabilidad puede verse afectada por el instrumento y el protocolo de medición.</p>'
            : '';

        contReferencia.innerHTML = `
            <p class="dinamometria-panel-titulo">${escapeHTML(fuenteSteiber.nombreVisible)}</p>
            <p>Resultado (mano dominante): <strong>${formatearNumeroEs(dominanteKg, 1)} kg</strong></p>
            <p>Referencia publicada: <strong>${formatearNumeroEs(ref.valor.media, 1)} kg</strong></p>
            <p class="dinamometria-referencia-cita">Steiber 2016 · sexo ${sexo === 'Hombre' ? 'masculino' : 'femenino'} · grupo de edad ${ref.grupoEdad} años · grupo de talla ${ref.grupoTalla} cm.</p>
            ${avisoDispositivo}
        `;
    }

    // Texto narrativo para EXPLORACIÓN FÍSICA. Nunca genera nada con datos
    // vacíos ni emite valoraciones (normal/anormal/déficit...): solo hechos.
    function generarTextoDinamometria(campos) {
        const derVal = parseFloat(campos.dina_der_valor);
        const izqVal = parseFloat(campos.dina_izq_valor);
        const derValida = Number.isFinite(derVal);
        const izqValida = Number.isFinite(izqVal);
        if (!derValida && !izqValida) return '';

        const partes = [];

        if (derValida && izqValida) {
            partes.push(`Se obtiene una fuerza de prensión de ${formatearNumeroEs(derVal, 1)} kg en la mano derecha y ${formatearNumeroEs(izqVal, 1)} kg en la izquierda.`);
            const dominante = campos.dina_mano_dominante;
            if (dominante === 'Derecha' || dominante === 'Izquierda') {
                const diffKg = Math.abs(derVal - izqVal);
                const maxKg = Math.max(derVal, izqVal);
                const diffPct = maxKg > 0 ? (diffKg / maxKg) * 100 : 0;
                partes.push(`La mano dominante es la ${dominante.toLowerCase()}, observándose una diferencia entre ambas manos de ${formatearNumeroEs(diffKg, 1)} kg (${formatearNumeroEs(diffPct, 1)}%).`);
            }
        } else if (derValida) {
            partes.push(`Se obtiene una fuerza de prensión de ${formatearNumeroEs(derVal, 1)} kg en la mano derecha.`);
        } else {
            partes.push(`Se obtiene una fuerza de prensión de ${formatearNumeroEs(izqVal, 1)} kg en la mano izquierda.`);
        }

        const manosConDolor = [];
        if (campos.dina_der_dolor === 'si') manosConDolor.push('derecha');
        if (campos.dina_izq_dolor === 'si') manosConDolor.push('izquierda');
        if (manosConDolor.length === 2) partes.push('Durante la medición se reproduce dolor en ambas manos.');
        else if (manosConDolor.length === 1) partes.push(`Durante la medición se reproduce dolor en la mano ${manosConDolor[0]}.`);

        const dominante = campos.dina_mano_dominante;
        const dominanteValida = dominante === 'Derecha' ? derValida : (dominante === 'Izquierda' ? izqValida : false);
        if (dominanteValida) {
            const ref = buscarValorReferenciaSteiber(campos.dina_sexo, parseFloat(campos.dina_edad), parseFloat(campos.dina_talla));
            if (ref.valor) {
                partes.push('El resultado de la mano dominante se compara con los valores de referencia publicados por Steiber et al. para población alemana según sexo, edad y talla.');
            }
        }

        const obsDer = limpio(campos.dina_der_obs);
        if (obsDer) partes.push(`Observaciones (mano derecha): ${obsDer}.`);
        const obsIzq = limpio(campos.dina_izq_obs);
        if (obsIzq) partes.push(`Observaciones (mano izquierda): ${obsIzq}.`);

        return partes.join(' ');
    }

    function renderActitudPostural(datos) {
        const cont = limpiarContenedor('subActitudPostural');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);
        const grid = document.createElement('div');
        grid.className = 'campo-grid';
        grid.appendChild(construirCampoGenerico(datos.campo, estado.exploracion.campos, regenerarExploracion));
        cont.appendChild(grid);
    }

    function renderSensibilidad(datos) {
        const cont = limpiarContenedor('subSensibilidad');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);
        const grid = document.createElement('div');
        grid.className = 'campo-grid';
        grid.appendChild(construirCampoGenerico(datos.campo, estado.exploracion.campos, regenerarExploracion));
        grid.appendChild(construirCampoGenerico(datos.campoObservaciones, estado.exploracion.campos, regenerarExploracion));
        cont.appendChild(grid);
    }

    function renderTestsEspecificos(datos) {
        const cont = limpiarContenedor('subTestsEspecificos');
        if (!datos) return;
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        (datos.tests || []).forEach((test) => {
            const fila = document.createElement('div');
            fila.className = 'test-fila';

            const info = document.createElement('div');
            info.className = 'test-info';
            const btnNombre = document.createElement('button');
            btnNombre.type = 'button';
            btnNombre.className = 'test-nombre-btn';
            btnNombre.innerHTML = `<span class="test-nombre">${escapeHTML(test.nombre)}</span> ℹ️`;
            btnNombre.addEventListener('click', () => abrirModalTest(test));
            const estructura = document.createElement('span');
            estructura.className = 'test-estructura';
            estructura.textContent = test.estructura;
            info.appendChild(btnNombre);
            info.appendChild(estructura);
            fila.appendChild(info);

            fila.appendChild(construirGrupoBotones({
                id: test.id,
                opciones: ['Positiva', 'Negativa', 'No realizada'],
                sinEtiqueta: true
            }, estado.exploracion.campos, regenerarExploracion));

            cont.appendChild(fila);
        });
    }

    /* ==========================================================
       MODAL DE INFORMACIÓN DE TEST (imagen + vídeo)
       ==========================================================
       Genérico: sirve para los tests de cualquier patología. Cada test
       puede traer "imagen" (archivo dentro de datos/fisio-ap/img/) y
       "video" (una URL). Si falta cualquiera de los dos, esa parte del
       popup simplemente no se muestra.
       ========================================================== */

    const RUTA_IMG = 'datos/fisio-ap/img/';

    function iniciarModalTest() {
        el('modalCerrarBtn').addEventListener('click', cerrarModalTest);
        el('modalTest').addEventListener('click', (e) => {
            if (e.target.id === 'modalTest') cerrarModalTest();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') cerrarModalTest();
        });
    }

    function abrirModalTest(test) {
        el('modalTestNombre').textContent = test.nombre;
        el('modalTestEstructura').textContent = test.estructura || '';

        const img = el('modalTestImagen');
        if (test.imagen) {
            img.src = RUTA_IMG + test.imagen;
            img.alt = 'Imagen del ' + test.nombre;
            img.hidden = false;
            img.onerror = () => { img.hidden = true; };
        } else {
            img.hidden = true;
            img.removeAttribute('src');
        }

        // innerHTML a propósito: el campo "ayuda" lo escribes tú mismo en el
        // .js de cada patología (no es texto de un paciente ni de un
        // formulario), así que puedes usar <b>, <br>, etc. con seguridad.
        el('modalTestAyuda').innerHTML = test.ayuda || '';

        const enlaceVideo = el('modalTestVideo');
        if (test.video) {
            enlaceVideo.href = test.video;
            enlaceVideo.hidden = false;
        } else {
            enlaceVideo.hidden = true;
            enlaceVideo.removeAttribute('href');
        }

        el('modalTest').hidden = false;
    }

    function cerrarModalTest() {
        el('modalTest').hidden = true;
    }

    function generarTextoExploracion() {
        const ef = config.exploracionFisica;
        const campos = estado.exploracion.campos;
        const partes = [];

        // Los títulos de cada bloque van en MAYÚSCULAS en el texto copiado
        // (así se distinguen mejor al pegarlo en DRAGOAP). Cada bloque es
        // opcional: si la patología no define esa sección, se salta.

        // Inspección y palpación
        if (ef.inspeccionPalpacion) {
            const insp = [];
            ef.inspeccionPalpacion.campos.forEach((campo) => {
                const t = formatearValorCampo(campo, campos[campo.id]);
                if (t) insp.push(t);
            });
            if (insp.length) partes.push(`INSPECCIÓN Y PALPACIÓN: ${insp.join('; ')}.`);
        }

        // Movilidad articular
        if (ef.movilidadArticular) {
            const mov = [];
            ef.movilidadArticular.movimientos.forEach((m) => {
                const v = campos[m.id];
                if (v) mov.push(`${m.etiqueta.toLowerCase()} - ${v.toLowerCase()}`);
            });
            if (mov.length) partes.push(`MOVILIDAD ARTICULAR: ${mov.join('; ')}.`);
            if (ef.movilidadArticular.campoEspecificaciones) {
                const especCampo = ef.movilidadArticular.campoEspecificaciones;
                const especTexto = limpio(campos[especCampo.id]);
                if (especTexto) partes.push(`${especTexto}.`);
            }
        }

        // Balance muscular (Daniels) — nunca se incluye "No valorado"
        if (ef.balanceMuscular) {
            const fuerza = [];
            ef.balanceMuscular.movimientos.forEach((m) => {
                const v = campos[m.id];
                if (v && v !== 'No valorado') fuerza.push(`${m.etiqueta.toLowerCase()} ${v}/5`);
            });
            if (fuerza.length) partes.push(`BALANCE MUSCULAR: ${unirConY(fuerza)} según escala de Daniels.`);
        }

        // Dinamometría de prensión manual
        if (ef.dinamometriaPrension) {
            const textoDina = generarTextoDinamometria(campos);
            if (textoDina) partes.push(`DINAMOMETRÍA DE PRENSIÓN MANUAL: ${textoDina}`);
        }

        // Actitud postural
        if (ef.actitudPostural) {
            const actitudValor = limpio(campos[ef.actitudPostural.campo.id]);
            if (actitudValor) partes.push(`ACTITUD POSTURAL GENERAL: ${actitudValor}.`);
        }

        // Sensibilidad
        if (ef.sensibilidad) {
            const sens = campos[ef.sensibilidad.campo.id];
            if (sens) {
                const obs = limpio(campos[ef.sensibilidad.campoObservaciones.id]);
                partes.push(`SENSIBILIDAD: ${sens.toLowerCase()}.${obs ? ' Observaciones: ' + obs + '.' : ''}`);
            }
        }

        // Tests específicos — "No realizada" no se documenta
        if (ef.testsEspecificos) {
            const tests = [];
            (ef.testsEspecificos.tests || []).forEach((t) => {
                const v = campos[t.id];
                if (v === 'Positiva' || v === 'Negativa') {
                    tests.push(`${t.nombre} ${v.toLowerCase()}`);
                }
            });
            if (tests.length) partes.push(`TESTS ESPECÍFICOS: ${tests.join('; ')}.`);
        }

        return partes.join('\n');
    }

    function regenerarExploracion(forzar) {
        aplicarTextoGenerado('exploracionTexto', estado.exploracion, generarTextoExploracion(), forzar, 'regenerarExploracion');
    }

    /* ==========================================================
       4. PLAN DE ACTUACIÓN
       ========================================================== */

    function renderPlan() {
        estado.plan = { campos: {}, ultimoGenerado: '' };
        const pa = config.planActuacion;

        if (pa.tratamientoHoy) {
            const contTrat = el('subTratamientoHoy');
            contTrat.innerHTML = '';
            const h3trat = document.createElement('h3');
            h3trat.textContent = pa.tratamientoHoy.titulo;
            contTrat.appendChild(h3trat);
            contTrat.appendChild(construirChecklist(pa.tratamientoHoy, estado.plan.campos, regenerarPlan));
        }

        const cont = el('subRecomendaciones');
        cont.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = 'Recomendaciones';
        cont.appendChild(h3);
        (pa.recomendaciones || []).forEach((rec) => {
            const label = document.createElement('label');
            label.className = 'checkbox-linea';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.addEventListener('change', () => {
                estado.plan.campos[rec.id] = input.checked;
                regenerarPlan();
            });
            label.appendChild(input);
            label.appendChild(document.createTextNode(' ' + rec.texto));
            cont.appendChild(label);
        });

        // Tipo de sesión (próxima cita)
        const selectTipo = el('planTipoSesion');
        selectTipo.innerHTML = '<option value="">Seleccionar…</option>' +
            pa.tiposSesion.map((t) => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('');

        // Hora en dos <select> (hora / minutos de 15 en 15): un <input type="time">
        // deja elegir cualquier minuto en el teclado o en algunos navegadores,
        // así que se sustituye por dos desplegables con las opciones exactas.
        poblarSelectoresHora(el('planHoraH'), el('planHoraM'));

        ['planSesionesIndividuales', 'planSesionesGrupales', 'planFecha', 'planHoraH', 'planHoraM', 'planTipoSesion', 'planNotas']
            .forEach((id) => {
                const elemento = el(id);
                elemento.value = '';
                elemento.addEventListener('input', regenerarPlan);
                elemento.addEventListener('change', regenerarPlan);
            });

        configurarTextoFinal('planTexto', 'regenerarPlan', estado.plan, regenerarPlan);
        regenerarPlan(true);
    }

    function generarTextoPlan() {
        const pa = config.planActuacion;
        const partes = [];

        if (pa.tratamientoHoy) {
            const t = generarTextoSeccionChecklist(pa.tratamientoHoy, estado.plan.campos);
            if (t) partes.push(t);
        }

        (pa.recomendaciones || []).forEach((rec) => {
            if (estado.plan.campos[rec.id]) partes.push(rec.texto);
        });

        const individuales = parseInt(el('planSesionesIndividuales').value, 10);
        const grupales = parseInt(el('planSesionesGrupales').value, 10);
        const tieneIndividuales = Number.isFinite(individuales) && individuales > 0;
        const tieneGrupales = Number.isFinite(grupales) && grupales > 0;
        if (tieneIndividuales && tieneGrupales) {
            partes.push(`Se programan ${individuales} citas en sesión individual y ${grupales} en sesiones grupales.`);
        } else if (tieneIndividuales) {
            partes.push(`Se programan ${individuales} citas en sesión individual.`);
        } else if (tieneGrupales) {
            partes.push(`Se programan ${grupales} citas en sesiones grupales.`);
        }

        const fecha = limpio(el('planFecha').value);
        const horaH = el('planHoraH').value;
        const horaM = el('planHoraM').value;
        const hora = (horaH && horaM) ? `${horaH}:${horaM}` : '';
        const tipo = limpio(el('planTipoSesion').value);
        if (fecha || hora || tipo) {
            let frase = 'Próxima cita';
            if (tipo) frase += ` en sesión ${tipo.toLowerCase()}`;
            if (fecha) frase += ` el ${formatearFecha(fecha)}`;
            if (hora) frase += ` a las ${hora}`;
            partes.push(frase + '.');
        }

        const notas = limpio(el('planNotas').value);
        if (notas) partes.push(notas);

        return partes.join('\n');
    }

    function formatearFecha(iso) {
        // input[type=date] entrega AAAA-MM-DD; lo mostramos como DD/MM/AAAA
        const [a, m, d] = iso.split('-');
        if (!a || !m || !d) return iso;
        return `${d}/${m}/${a}`;
    }

    function regenerarPlan(forzar) {
        aplicarTextoGenerado('planTexto', estado.plan, generarTextoPlan(), forzar, 'regenerarPlan');
    }

    /* ==========================================================
       Constructores de campos genéricos (data-driven)
       ========================================================== */

    function construirCampoGenerico(campo, almacen, onCambio, prefijoId) {
        prefijoId = prefijoId || '';
        const wrap = document.createElement('label');
        wrap.className = 'campo-simple';
        if (campo.ayuda) wrap.title = campo.ayuda;

        if (campo.tipo === 'tristate' || campo.tipo === 'binario') {
            wrap.classList.add('campo-tristate');
            const span = document.createElement('span');
            span.textContent = campo.etiqueta;
            wrap.appendChild(span);
            const opcionesBinarias = campo.tipo === 'binario'
                ? { opciones: ['Sí', 'No'], mapaValores: { 'Sí': 'si', 'No': 'no' } }
                : { opciones: ['No valorado', 'Sí', 'No'], mapaValores: { 'No valorado': 'no_valorado', 'Sí': 'si', 'No': 'no' } };
            wrap.appendChild(construirGrupoBotones({
                id: campo.id,
                sinEtiqueta: true,
                ...opcionesBinarias
            }, almacen, onCambio));
            if (campo.ayuda) wrap.appendChild(construirAyudaVisible(campo.ayuda));
            return wrap;
        }

        // Botones de una sola opción, con la lista que diga cada campo
        // (p. ej. Mejor/Igual/Peor, o Sí/Parcial/No). El valor guardado es
        // literalmente el texto de la opción elegida.
        if (campo.tipo === 'opciones') {
            wrap.classList.add('campo-tristate');
            const span = document.createElement('span');
            span.textContent = campo.etiqueta;
            wrap.appendChild(span);
            wrap.appendChild(construirGrupoBotones({
                id: campo.id,
                sinEtiqueta: true,
                opciones: campo.opciones
            }, almacen, onCambio));
            if (campo.ayuda) wrap.appendChild(construirAyudaVisible(campo.ayuda));
            return wrap;
        }

        const span = document.createElement('span');
        span.textContent = campo.etiqueta;
        wrap.appendChild(span);

        let input;
        if (campo.tipo === 'numero') {
            input = document.createElement('input');
            input.type = 'number';
            if (campo.min !== undefined) input.min = campo.min;
            if (campo.max !== undefined) input.max = campo.max;
            if (campo.step !== undefined) input.step = campo.step;
        } else if (campo.tipo === 'select') {
            input = document.createElement('select');
            input.innerHTML = '<option value="">Seleccionar…</option>' +
                campo.opciones.map((o) => `<option value="${escapeHTML(o)}">${escapeHTML(o)}</option>`).join('');
        } else if (campo.tipo === 'texto_area') {
            input = document.createElement('textarea');
            input.rows = 2;
        } else {
            input = document.createElement('input');
            input.type = 'text';
        }
        input.id = prefijoId + 'campo_' + campo.id;
        if (campo.ayuda) input.title = campo.ayuda;
        input.addEventListener('input', () => {
            almacen[campo.id] = input.value;
            onCambio();
        });
        input.addEventListener('change', () => {
            almacen[campo.id] = input.value;
            onCambio();
        });
        wrap.appendChild(input);
        if (campo.ayuda) wrap.appendChild(construirAyudaVisible(campo.ayuda));
        return wrap;
    }

    // Texto de ayuda siempre visible (no solo al pasar el ratón): más
    // fiable en tablet, donde no existe un "hover" real.
    function construirAyudaVisible(texto) {
        const p = document.createElement('span');
        p.className = 'campo-ayuda';
        p.textContent = texto;
        return p;
    }

    // Sección tipo checklist (historia laboral, AVD, tratamiento de hoy…):
    // checkboxes de una sola marca + campo "otro" libre opcional. Una
    // opción puede marcarse "exclusivoConTodo": al marcarla se desmarcan
    // (y deshabilitan) las demás, y viceversa.
    function construirChecklist(seccion, almacen, onCambio) {
        const cont = document.createElement('div');
        cont.className = seccion.disposicion === 'grid' ? 'checklist-opciones checklist-grid' : 'checklist-opciones';

        const inputs = [];
        const inputExclusivo = { ref: null };

        (seccion.opciones || []).forEach((opcion) => {
            const label = document.createElement('label');
            label.className = 'checkbox-linea';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.addEventListener('change', () => {
                almacen[opcion.id] = input.checked;
                if (opcion.exclusivoConTodo && input.checked) {
                    inputs.forEach((otro) => {
                        if (otro.input !== input) {
                            otro.input.checked = false;
                            otro.input.disabled = true;
                            delete almacen[otro.id];
                        }
                    });
                    if (campoOtroInput) {
                        campoOtroInput.value = '';
                        campoOtroInput.disabled = true;
                        delete almacen[seccion.otro.id];
                    }
                } else if (opcion.exclusivoConTodo && !input.checked) {
                    inputs.forEach((otro) => { otro.input.disabled = false; });
                    if (campoOtroInput) campoOtroInput.disabled = false;
                } else if (input.checked && inputExclusivo.ref) {
                    inputExclusivo.ref.checked = false;
                    inputExclusivo.ref.disabled = false;
                    delete almacen[inputExclusivo.id];
                }
                onCambio();
            });
            label.appendChild(input);
            label.appendChild(document.createTextNode(' ' + opcion.etiqueta));
            cont.appendChild(label);
            inputs.push({ input, id: opcion.id });
            if (opcion.exclusivoConTodo) inputExclusivo.ref = input, inputExclusivo.id = opcion.id;
        });

        let campoOtroInput = null;
        if (seccion.otro) {
            const label = document.createElement('label');
            label.className = 'campo-simple campo-otro';
            const span = document.createElement('span');
            span.textContent = seccion.otro.etiqueta;
            campoOtroInput = document.createElement('input');
            campoOtroInput.type = 'text';
            campoOtroInput.addEventListener('input', () => {
                almacen[seccion.otro.id] = campoOtroInput.value;
                if (campoOtroInput.value && inputExclusivo.ref) {
                    inputExclusivo.ref.checked = false;
                    inputExclusivo.ref.disabled = false;
                    delete almacen[inputExclusivo.id];
                }
                onCambio();
            });
            label.appendChild(span);
            label.appendChild(campoOtroInput);
            cont.appendChild(label);
        }

        return cont;
    }

    // Grupo de botones de una sola selección (tri-state, categorías, Daniels, tests…)
    function construirGrupoBotones(opts, almacen, onCambio) {
        const wrap = document.createElement('div');
        wrap.className = 'grupo-botones' + (opts.claseExtra ? ' ' + opts.claseExtra : '');

        if (!opts.sinEtiqueta && opts.etiqueta) {
            const label = document.createElement('span');
            label.className = 'grupo-botones-etiqueta';
            label.textContent = opts.etiqueta;
            wrap.appendChild(label);
        }

        const fila = document.createElement('div');
        fila.className = 'grupo-botones-fila';

        opts.opciones.forEach((opcion) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = opcion;
            btn.dataset.valor = opcion;
            btn.addEventListener('click', () => {
                const yaActivo = btn.classList.contains('activo');
                fila.querySelectorAll('button').forEach((b) => b.classList.remove('activo'));
                if (yaActivo) {
                    // Permite deseleccionar (volver a "sin informar")
                    delete almacen[opts.id];
                } else {
                    btn.classList.add('activo');
                    const valorGuardado = opts.mapaValores ? opts.mapaValores[opcion] : opcion;
                    almacen[opts.id] = valorGuardado === 'no_valorado' ? undefined : valorGuardado;
                    if (valorGuardado === 'no_valorado') delete almacen[opts.id];
                }
                onCambio();
            });
            fila.appendChild(btn);
        });

        wrap.appendChild(fila);
        return wrap;
    }

    function formatearValorCampo(campo, valor) {
        if (campo.tipo === 'tristate' || campo.tipo === 'binario') {
            if (valor === 'si') return `${campo.etiqueta.toLowerCase()}: sí`;
            if (valor === 'no') return `${campo.etiqueta.toLowerCase()}: no`;
            return '';
        }
        const v = limpio(valor);
        if (!v) return '';
        if (campo.tipo === 'numero') return `${campo.etiqueta.toLowerCase()}: ${v}`;
        if (campo.tipo === 'select') return `${campo.etiqueta}: ${v}`;
        return `${campo.etiqueta.toLowerCase()}: ${v}`;
    }

    /* ==========================================================
       Sincronización campos → texto final editable
       ========================================================== */

    function configurarTextoFinal(idTextarea, idBotonRegenerar, bloqueEstado, funcionRegenerar) {
        const textarea = el(idTextarea);
        textarea.value = '';
        bloqueEstado.ultimoGenerado = '';
        textarea.oninput = () => {
            const boton = el(idBotonRegenerar);
            boton.hidden = textarea.value === bloqueEstado.ultimoGenerado;
        };
        el(idBotonRegenerar).onclick = () => funcionRegenerar(true);
    }

    // Actualiza el textarea con el texto recién generado, salvo que el
    // usuario ya lo haya editado a mano (a menos que forzar === true).
    function aplicarTextoGenerado(idTextarea, bloqueEstado, textoGenerado, forzar, idBotonRegenerar) {
        const textarea = el(idTextarea);
        const editadoManualmente = textarea.value !== bloqueEstado.ultimoGenerado;
        if (forzar || !editadoManualmente) {
            textarea.value = textoGenerado;
            bloqueEstado.ultimoGenerado = textoGenerado;
            el(idBotonRegenerar).hidden = true;
        } else {
            el(idBotonRegenerar).hidden = false;
        }
    }

    /* ==========================================================
       Portapapeles
       ========================================================== */

    function mostrarFeedbackCopiado(boton) {
        if (boton._timeoutCopiado) clearTimeout(boton._timeoutCopiado);
        if (!boton.dataset.textoOriginal) boton.dataset.textoOriginal = boton.textContent;
        boton.textContent = '✓ Copiado';
        boton.classList.add('copiado');
        boton._timeoutCopiado = setTimeout(() => {
            boton.textContent = boton.dataset.textoOriginal;
            boton.classList.remove('copiado');
        }, 1800);
    }

    function copiarConFallback(texto) {
        const ta = document.createElement('textarea');
        ta.value = texto;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    }

    async function copiarTexto(texto, boton) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(texto);
                mostrarFeedbackCopiado(boton);
                return;
            }
        } catch (err) {
            console.warn('Fisio+AP: navigator.clipboard falló, usando fallback', err);
        }
        try {
            if (copiarConFallback(texto)) {
                mostrarFeedbackCopiado(boton);
                return;
            }
        } catch (err) {
            console.warn('Fisio+AP: fallback de copia falló', err);
        }
        alert('No se ha podido copiar automáticamente. Selecciona el texto y cópialo manualmente (Ctrl/Cmd + C).');
    }

    document.addEventListener('click', (e) => {
        const boton = e.target.closest('.btn-copiar[data-target]');
        if (!boton) return;
        const textarea = el(boton.dataset.target);
        if (!textarea) return;
        copiarTexto(textarea.value, boton);
    });

    /* ==========================================================
       Arranque
       ========================================================== */

    document.addEventListener('DOMContentLoaded', iniciar);
})();
