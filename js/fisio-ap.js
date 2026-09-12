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
       ========================================================== */

    async function iniciar() {
        try {
            const resp = await fetch(RUTA_DATOS + 'patologias.json');
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            listaPatologias = await resp.json();
            poblarSelectorPatologias();
            await cargarPatologia(listaPatologias[0].id);
            el('errorCarga').hidden = true;
        } catch (err) {
            console.error('Fisio+AP: error al cargar los datos', err);
            el('errorCarga').hidden = false;
        }
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
        const meta = listaPatologias.find((p) => p.id === id);
        if (!meta) return;
        const resp = await fetch(RUTA_DATOS + meta.archivo);
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        config = await resp.json();
        estado = estadoInicial();
        renderTodo();
    }

    function renderTodo() {
        renderAvisos();
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

    /* ==========================================================
       AVISOS / CRITERIOS DE DERIVACIÓN
       ========================================================== */

    function renderAvisos() {
        const cont = el('contenedorAvisos');
        const a = config.avisos;
        if (!a) { cont.innerHTML = ''; return; }

        const inclusion = (a.criteriosInclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');
        const exclusion = (a.criteriosExclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');

        cont.innerHTML = `
            <details class="aviso-derivacion" open>
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
                <summary>Objetivos del protocolo</summary>
                <div class="objetivos-contenido">
                    ${general ? `<p class="objetivos-subtitulo">Objetivo general</p><ul>${general}</ul>` : ''}
                    ${especificos ? `<p class="objetivos-subtitulo">Objetivos específicos</p><ul>${especificos}</ul>` : ''}
                    <div class="acciones-copia">
                        <button type="button" class="btn-copiar" id="btnCopiarObjetivos">Copiar objetivos</button>
                    </div>
                </div>
            </details>`;

        el('btnCopiarObjetivos').addEventListener('click', (e) => {
            const texto = [
                ...(o.general || []),
                ...(o.especificos || [])
            ].map((t) => '- ' + t).join('\n');
            copiarTexto(texto, e.currentTarget);
        });
    }

    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    /* ==========================================================
       1. MOTIVO
       ========================================================== */

    function renderMotivo() {
        const cont = el('motivoFrasesPredefinidas');
        cont.innerHTML = '';
        const frases = (config.motivo && config.motivo.frasesPredefinidas) || [];
        frases.forEach((frase) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'chip-frase';
            btn.textContent = frase;
            btn.addEventListener('click', () => {
                const campo = el('motivoTexto');
                campo.value = campo.value.trim() ? campo.value.trim() + '\n' + frase : frase;
                campo.focus();
            });
            cont.appendChild(btn);
        });
        el('motivoTexto').value = '';
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

            const grid = document.createElement('div');
            grid.className = 'campo-grid';
            seccion.campos.forEach((campo) => {
                grid.appendChild(construirCampoGenerico(campo, estado.anamnesis.campos, regenerarAnamnesis));
            });
            box.appendChild(grid);
            cont.appendChild(box);
        });

        configurarTextoFinal('anamnesisTexto', 'regenerarAnamnesis', estado.anamnesis, regenerarAnamnesis);
        regenerarAnamnesis(true);
    }

    function textoSeccionAnamnesis(seccion, campos) {
        const partes = [];
        seccion.campos.forEach((campo) => {
            const valor = campos[campo.id];
            const texto = formatearValorCampo(campo, valor);
            if (texto) partes.push(texto);
        });
        if (partes.length === 0) return '';
        // Sección de un único campo: no repetir el título de la sección.
        if (seccion.campos.length === 1) {
            return `${seccion.titulo}: ${partes[0]}.`;
        }
        return `${seccion.titulo}: ${partes.join('; ')}.`;
    }

    function generarTextoAnamnesis() {
        const partes = [];
        (config.anamnesis.secciones || []).forEach((seccion) => {
            const t = textoSeccionAnamnesis(seccion, estado.anamnesis.campos);
            if (t) partes.push(t);
        });
        return partes.join('\n');
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
        renderActitudPostural(ef.actitudPostural);
        renderSensibilidad(ef.sensibilidad);
        renderTestsEspecificos(ef.testsEspecificos);

        configurarTextoFinal('exploracionTexto', 'regenerarExploracion', estado.exploracion, regenerarExploracion);
        regenerarExploracion(true);
    }

    function renderInspeccionPalpacion(datos) {
        const cont = el('subInspeccionPalpacion');
        cont.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);
        const grid = document.createElement('div');
        grid.className = 'campo-grid';
        datos.campos.forEach((campo) => {
            grid.appendChild(construirCampoGenerico(campo, estado.exploracion.campos, regenerarExploracion));
        });
        cont.appendChild(grid);
    }

    function renderMovilidadArticular(datos) {
        const cont = el('subMovilidadArticular');
        cont.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        datos.movimientos.forEach((mov) => {
            cont.appendChild(construirGrupoBotones({
                id: mov.id,
                etiqueta: mov.etiqueta,
                opciones: mov.categorias
            }, estado.exploracion.campos, regenerarExploracion));
        });
    }

    function renderBalanceMuscular(datos) {
        const cont = el('subBalanceMuscular');
        cont.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        const ayuda = document.createElement('p');
        ayuda.className = 'ayuda-daniels';
        ayuda.innerHTML = 'Escala de Daniels (0-5): ' +
            datos.escala.map((e) => `<strong>${e.valor}</strong> ${escapeHTML(e.descripcion)}`).join(' · ');
        cont.appendChild(ayuda);

        const opciones = [...datos.escala.map((e) => e.valor), 'No valorado'];
        datos.movimientos.forEach((mov) => {
            const fila = construirGrupoBotones({
                id: mov.id,
                etiqueta: mov.etiqueta,
                opciones,
                claseExtra: 'grupo-daniels'
            }, estado.exploracion.campos, regenerarExploracion);
            cont.appendChild(fila);
        });
    }

    function renderActitudPostural(datos) {
        const cont = el('subActitudPostural');
        cont.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);
        const grid = document.createElement('div');
        grid.className = 'campo-grid';
        grid.appendChild(construirCampoGenerico(datos.campo, estado.exploracion.campos, regenerarExploracion));
        cont.appendChild(grid);
    }

    function renderSensibilidad(datos) {
        const cont = el('subSensibilidad');
        cont.innerHTML = '';
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
        const cont = el('subTestsEspecificos');
        cont.innerHTML = '';
        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        datos.tests.forEach((test) => {
            const fila = document.createElement('div');
            fila.className = 'test-fila';

            const info = document.createElement('div');
            info.className = 'test-info';
            info.innerHTML = `<span class="test-nombre">${escapeHTML(test.nombre)}</span>
                               <span class="test-estructura">${escapeHTML(test.estructura)}</span>`;
            if (test.ayuda) {
                info.title = test.ayuda;
                info.classList.add('con-ayuda');
            }
            fila.appendChild(info);

            fila.appendChild(construirGrupoBotones({
                id: test.id,
                opciones: ['Positiva', 'Negativa', 'No realizada'],
                sinEtiqueta: true
            }, estado.exploracion.campos, regenerarExploracion));

            cont.appendChild(fila);
        });
    }

    function generarTextoExploracion() {
        const ef = config.exploracionFisica;
        const campos = estado.exploracion.campos;
        const partes = [];

        // Inspección y palpación
        const insp = [];
        ef.inspeccionPalpacion.campos.forEach((campo) => {
            const t = formatearValorCampo(campo, campos[campo.id]);
            if (t) insp.push(t);
        });
        if (insp.length) partes.push(`Inspección y palpación: ${insp.join('; ')}.`);

        // Movilidad articular
        const mov = [];
        ef.movilidadArticular.movimientos.forEach((m) => {
            const v = campos[m.id];
            if (v) mov.push(`${m.etiqueta.toLowerCase()} - ${v.toLowerCase()}`);
        });
        if (mov.length) partes.push(`Movilidad articular: ${mov.join('; ')}.`);

        // Balance muscular (Daniels) — nunca se incluye "No valorado"
        const fuerza = [];
        ef.balanceMuscular.movimientos.forEach((m) => {
            const v = campos[m.id];
            if (v && v !== 'No valorado') fuerza.push(`${m.etiqueta.toLowerCase()} ${v}/5`);
        });
        if (fuerza.length) partes.push(`Balance muscular: ${unirConY(fuerza)} según escala de Daniels.`);

        // Actitud postural
        const actitud = formatearValorCampo(ef.actitudPostural.campo, campos[ef.actitudPostural.campo.id]);
        if (actitud) partes.push(`${actitud}.`);

        // Sensibilidad
        const sens = campos[ef.sensibilidad.campo.id];
        if (sens) {
            const obs = limpio(campos[ef.sensibilidad.campoObservaciones.id]);
            partes.push(`Sensibilidad: ${sens.toLowerCase()}.${obs ? ' Observaciones: ' + obs + '.' : ''}`);
        }

        // Tests específicos — "No realizada" no se documenta
        const tests = [];
        ef.testsEspecificos.tests.forEach((t) => {
            const v = campos[t.id];
            if (v === 'Positiva' || v === 'Negativa') {
                tests.push(`${t.nombre} ${v.toLowerCase()}`);
            }
        });
        if (tests.length) partes.push(`Tests específicos: ${tests.join('; ')}.`);

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

        ['planSesionesIndividuales', 'planSesionesGrupales', 'planFecha', 'planHora', 'planTipoSesion', 'planNotas']
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
        const hora = limpio(el('planHora').value);
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

    function construirCampoGenerico(campo, almacen, onCambio) {
        const wrap = document.createElement('label');
        wrap.className = 'campo-simple';

        if (campo.tipo === 'tristate') {
            wrap.classList.add('campo-tristate');
            const span = document.createElement('span');
            span.textContent = campo.etiqueta;
            wrap.appendChild(span);
            wrap.appendChild(construirGrupoBotones({
                id: campo.id,
                opciones: ['No valorado', 'Sí', 'No'],
                sinEtiqueta: true,
                mapaValores: { 'No valorado': 'no_valorado', 'Sí': 'si', 'No': 'no' }
            }, almacen, onCambio));
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
        } else if (campo.tipo === 'select') {
            input = document.createElement('select');
            input.innerHTML = '<option value="">Seleccionar…</option>' +
                campo.opciones.map((o) => `<option value="${escapeHTML(o)}">${escapeHTML(o)}</option>`).join('');
        } else {
            input = document.createElement('input');
            input.type = 'text';
        }
        input.id = 'campo_' + campo.id;
        input.addEventListener('input', () => {
            almacen[campo.id] = input.value;
            onCambio();
        });
        input.addEventListener('change', () => {
            almacen[campo.id] = input.value;
            onCambio();
        });
        wrap.appendChild(input);
        return wrap;
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
        if (campo.tipo === 'tristate') {
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
