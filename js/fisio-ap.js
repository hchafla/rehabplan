/* ==============================================================
   Fisio+AP — Lógica de la aplicación
   ============================================================== */

(function () {
    'use strict';

    const RUTA_DATOS = 'datos/fisio-ap/';

    let listaPatologias = [];
    let config = null;   
    let estado = null;   

    const el = (id) => document.getElementById(id);

    function estadoInicial() {
        return {
            motivo: { variables: {}, plantillaSeleccionada: null },
            anamnesis: { campos: {}, ultimoGenerado: '' },
            exploracion: { campos: {}, ultimoGenerado: '' },
            plan: { educacion: {}, tratamiento: {}, programacion: {}, ultimoGenerado: '' }
        };
    }

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
        renderHeaderInfo();
        renderAvisos();
        renderObjetivos();
        renderMotivo();
        renderAnamnesis();
        renderExploracion();
        renderPlan();
    }

    function renderHeaderInfo() {
        const titulo = el('patologiaTitulo');
        if (titulo) titulo.textContent = config.nombre;
    }

    function unirConY(items) {
        if (!items || items.length === 0) return '';
        if (items.length === 1) return items[0];
        return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1];
    }

    function limpio(valor) {
        return (valor || '').toString().trim();
    }

    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = str || '';
        return d.innerHTML;
    }

    /* ==========================================================
       AVISOS Y CRITERIOS SEPARADOS
       ========================================================== */

    function renderAvisos() {
        const cont = el('contenedorAvisos');
        const a = config.avisos;
        if (!a) { cont.innerHTML = ''; return; }

        const inclusion = (a.criteriosInclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');
        const exclusion = (a.criteriosExclusion || []).map((t) => `<li>${escapeHTML(t)}</li>`).join('');

        cont.innerHTML = `
            <details class="aviso-derivacion">
                <summary>⚠️ Criterios de derivación y protocolo</summary>
                <div class="aviso-contenido">
                    <div class="grid-avisos">
                        ${inclusion ? `<div><p class="aviso-subtitulo">Criterios de Inclusión</p><ul>${inclusion}</ul></div>` : ''}
                        ${exclusion ? `<div><p class="aviso-subtitulo">Criterios de Exclusión (Derivar)</p><ul>${exclusion}</ul></div>` : ''}
                    </div>
                    ${a.sesionesMaximas ? `<p class="aviso-sesiones">ℹ️ Límite según protocolo: <strong>máximo ${a.sesionesMaximas} sesiones</strong>.</p>` : ''}
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
                <summary>🎯 Objetivos del protocolo</summary>
                <div class="objetivos-contenido">
                    ${general ? `<p class="objetivos-subtitulo">General</p><ul>${general}</ul>` : ''}
                    ${especificos ? `<p class="objetivos-subtitulo">Específicos</p><ul>${especificos}</ul>` : ''}
                    <div class="acciones-copia">
                        <button type="button" class="btn-copiar" id="btnCopiarObjetivos">Copiar Objetivos</button>
                    </div>
                </div>
            </details>`;

        el('btnCopiarObjetivos').addEventListener('click', (e) => {
            const texto = [
                "OBJETIVOS DEL PROTOCOLO:",
                ...(o.general || []).map(t => "• " + t),
                ...(o.especificos || []).map(t => "• " + t)
            ].join('\n');
            copiarTexto(texto, e.currentTarget);
        });
    }

    /* ==========================================================
       1. MOTIVO DE ACCESO
       ========================================================== */

    function renderMotivo() {
        const contVars = el('motivoVariables');
        const contBotones = el('motivoBotones');
        contVars.innerHTML = '';
        contBotones.innerHTML = '';

        const m = config.motivo;
        if (!m) return;

        // Renderizar campos editables para las variables del motivo
        (m.variables || []).forEach((v) => {
            const wrap = document.createElement('label');
            wrap.className = 'campo-simple';
            wrap.innerHTML = `<span>${escapeHTML(v.etiqueta)}</span>
                              <input type="text" id="var_${v.id}" placeholder="${escapeHTML(v.placeholder || '')}">`;
            
            const input = wrap.querySelector('input');
            input.addEventListener('input', () => {
                estado.motivo.variables[v.id] = input.value;
                if (estado.motivo.plantillaSeleccionada) {
                    aplicarPlantillaMotivo(estado.motivo.plantillaSeleccionada);
                }
            });
            contVars.appendChild(wrap);
        });

        // Renderizar botones de plantillas
        (m.plantillas || []).forEach((p) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'chip-frase';
            btn.textContent = p.etiqueta;
            btn.addEventListener('click', () => {
                estado.motivo.plantillaSeleccionada = p;
                aplicarPlantillaMotivo(p);
            });
            contBotones.appendChild(btn);
        });

        el('motivoTexto').value = '';
    }

    function aplicarPlantillaMotivo(plantillaObj) {
        let texto = plantillaObj.plantilla;
        (config.motivo.variables || []).forEach((v) => {
            const val = limpio(estado.motivo.variables[v.id]) || `[${v.etiqueta.toUpperCase()}]`;
            texto = texto.replace(new RegExp(`\\{${v.id}\\}`, 'g'), val);
        });
        el('motivoTexto').value = texto;
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

    function generarTextoAnamnesis() {
        const bloques = [];

        (config.anamnesis.secciones || []).forEach((seccion) => {
            const frasesSeccion = [];
            seccion.campos.forEach((campo) => {
                const val = estado.anamnesis.campos[campo.id];
                const redaccion = formatearRedaccionCampo(campo, val);
                if (redaccion) frasesSeccion.push(redaccion);
            });

            if (frasesSeccion.length > 0) {
                bloques.push(`${seccion.titulo}: ${frasesSeccion.join('; ')}.`);
            }
        });

        return bloques.join('\n\n');
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
        if (!datos) return;
        
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
        if (!datos) return;

        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        datos.movimientos.forEach((mov) => {
            const fila = document.createElement('div');
            fila.className = 'grupo-botones-bloque';

            const span = document.createElement('span');
            span.className = 'grupo-etiqueta';
            span.textContent = mov.etiqueta;
            fila.appendChild(span);

            const divBotones = document.createElement('div');
            divBotones.className = 'grupo-botones-fila';

            mov.opciones.forEach((opc) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = opc.etiqueta;
                btn.addEventListener('click', () => {
                    const yaActivo = btn.classList.contains('activo');
                    divBotones.querySelectorAll('button').forEach(b => b.classList.remove('activo'));
                    if (yaActivo) {
                        delete estado.exploracion.campos[mov.id];
                    } else {
                        btn.classList.add('activo');
                        estado.exploracion.campos[mov.id] = opc;
                    }
                    regenerarExploracion();
                });
                divBotones.appendChild(btn);
            });

            fila.appendChild(divBotones);
            cont.appendChild(fila);
        });
    }

    function renderBalanceMuscular(datos) {
        const cont = el('subBalanceMuscular');
        cont.innerHTML = '';
        if (!datos) return;

        const h3 = document.createElement('h3');
        h3.textContent = datos.titulo;
        cont.appendChild(h3);

        datos.movimientos.forEach((mov) => {
            const fila = document.createElement('div');
            fila.className = 'grupo-botones-bloque';

            const span = document.createElement('span');
            span.className = 'grupo-etiqueta';
            span.textContent = mov.etiqueta;
            fila.appendChild(span);

            const divBotones = document.createElement('div');
            divBotones.className = 'grupo-botones-fila daniels-grid';

            ['0', '1', '2', '3', '4', '5'].forEach((val) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = val;
                btn.addEventListener('click', () => {
                    const yaActivo = btn.classList.contains('activo');
                    divBotones.querySelectorAll('button').forEach(b => b.classList.remove('activo'));
                    if (yaActivo) {
                        delete estado.exploracion.campos[mov.id];
                    } else {
                        btn.classList.add('activo');
                        estado.exploracion.campos[mov.id] = val;
                    }
                    regenerarExploracion();
                });
                divBotones.appendChild(btn);
            });

            fila.appendChild(divBotones);
            cont.appendChild(fila);
        });
    }

    function renderActitudPostural(datos) {
        const cont = el('subActitudPostural');
        cont.innerHTML = '';
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
        const cont = el('subSensibilidad');
        cont.innerHTML = '';
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
        const cont = el('subTestsEspecificos');
        cont.innerHTML = '';
        if (!datos) return;

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
            fila.appendChild(info);

            const divBotones = document.createElement('div');
            divBotones.className = 'grupo-botones-fila';

            [
                { id: 'pos', label: '+' },
                { id: 'neg', label: '-' }
            ].forEach((opt) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = opt.label;
                btn.className = 'btn-test';
                btn.addEventListener('click', () => {
                    const yaActivo = btn.classList.contains('activo');
                    divBotones.querySelectorAll('button').forEach(b => b.classList.remove('activo'));
                    if (yaActivo) {
                        delete estado.exploracion.campos[test.id];
                    } else {
                        btn.classList.add('activo');
                        estado.exploracion.campos[test.id] = opt.id;
                    }
                    regenerarExploracion();
                });
                divBotones.appendChild(btn);
            });

            fila.appendChild(divBotones);
            cont.appendChild(fila);
        });
    }

    function generarTextoExploracion() {
        const ef = config.exploracionFisica;
        const campos = estado.exploracion.campos;
        const bloques = [];

        // Inspección y palpación
        if (ef.inspeccionPalpacion) {
            const insp = [];
            ef.inspeccionPalpacion.campos.forEach((campo) => {
                const red = formatearRedaccionCampo(campo, campos[campo.id]);
                if (red) insp.push(red);
            });
            if (insp.length) bloques.push(`Inspección y palpación: ${insp.join('; ')}.`);
        }

        // Movilidad articular
        if (ef.movilidadArticular) {
            const movs = [];
            ef.movilidadArticular.movimientos.forEach((m) => {
                const opcSeleccionada = campos[m.id];
                if (opcSeleccionada && opcSeleccionada.texto) {
                    movs.push(opcSeleccionada.texto);
                }
            });
            if (movs.length) bloques.push(`Movilidad articular: ${movs.join('; ')}.`);
        }

        // Balance muscular (Daniels)
        if (ef.balanceMuscular) {
            const fuerza = [];
            ef.balanceMuscular.movimientos.forEach((m) => {
                const val = campos[m.id];
                if (val !== undefined) {
                    fuerza.push(`${m.etiqueta.toLowerCase()} ${val}/5`);
                }
            });
            if (fuerza.length) bloques.push(`Balance muscular (Daniels): ${unirConY(fuerza)}.`);
        }

        // Actitud postural
        if (ef.actitudPostural) {
            const actitud = formatearRedaccionCampo(ef.actitudPostural.campo, campos[ef.actitudPostural.campo.id]);
            if (actitud) bloques.push(`${actitud}.`);
        }

        // Sensibilidad
        if (ef.sensibilidad) {
            const estadoSens = campos[ef.sensibilidad.campo.id];
            const redSens = formatearRedaccionCampo(ef.sensibilidad.campo, estadoSens);
            if (redSens) {
                const obs = formatearRedaccionCampo(ef.sensibilidad.campoObservaciones, campos[ef.sensibilidad.campoObservaciones.id]);
                bloques.push(`Sensibilidad: ${redSens}${obs ? ' ' + obs : ''}.`);
            }
        }

        // Tests específicos (Resumen agregador de Positivos / Negativos)
        if (ef.testsEspecificos) {
            const pos = [];
            const neg = [];
            ef.testsEspecificos.tests.forEach((t) => {
                const res = campos[t.id];
                if (res === 'pos') pos.push(t.nombre);
                if (res === 'neg') neg.push(t.nombre);
            });

            const partesTest = [];
            if (pos.length > 0) partesTest.push(`Tests positivos: ${pos.join(', ')}`);
            if (neg.length > 0) partesTest.push(`Tests negativos: ${neg.join(', ')}`);

            if (partesTest.length > 0) {
                bloques.push(`${partesTest.join('. ')}.`);
            }
        }

        return bloques.join('\n\n');
    }

    function regenerarExploracion(forzar) {
        aplicarTextoGenerado('exploracionTexto', estado.exploracion, generarTextoExploracion(), forzar, 'regenerarExploracion');
    }

    /* ==========================================================
       4. PLAN DE ACTUACIÓN
       ========================================================== */

    function renderPlan() {
        estado.plan = { educacion: {}, tratamiento: {}, programacion: {}, ultimoGenerado: '' };
        const pa = config.planActuacion;
        if (!pa) return;

        // Educación
        const contEdu = el('subEducacion');
        contEdu.innerHTML = '<h3>Educación y recomendaciones</h3>';
        (pa.educacion || []).forEach((item) => {
            contEdu.appendChild(crearCheckboxPlan(item, estado.plan.educacion, regenerarPlan));
        });

        // Tratamiento
        const contTrat = el('subTratamiento');
        contTrat.innerHTML = '<h3>Tratamiento</h3>';
        (pa.tratamiento || []).forEach((item) => {
            contTrat.appendChild(crearCheckboxPlan(item, estado.plan.tratamiento, regenerarPlan));
        });

        // Programación y citas
        const selectTipo = el('planTipoSesion');
        selectTipo.innerHTML = '<option value="">Seleccionar…</option>' +
            (pa.tiposSesion || []).map((t) => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('');

        ['planSesionesIndividuales', 'planSesionesGrupales', 'planFecha', 'planHora', 'planTipoSesion']
            .forEach((id) => {
                const elemento = el(id);
                elemento.value = '';
                elemento.oninput = regenerarPlan;
                elemento.onchange = regenerarPlan;
            });

        configurarTextoFinal('planTexto', 'regenerarPlan', estado.plan, regenerarPlan);
        regenerarPlan(true);
    }

    function crearCheckboxPlan(item, almacen, onCambio) {
        const label = document.createElement('label');
        label.className = 'checkbox-linea';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.addEventListener('change', () => {
            if (input.checked) {
                almacen[item.id] = item.texto;
            } else {
                delete almacen[item.id];
            }
            onCambio();
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(' ' + (item.etiqueta || item.texto)));
        return label;
    }

    function generarTextoPlan() {
        const bloques = [];

        // Educación
        const eduTextos = Object.values(estado.plan.educacion);
        if (eduTextos.length > 0) {
            bloques.push(`Se pauta ${unirConY(eduTextos)}.`);
        }

        // Tratamiento
        const tratTextos = Object.values(estado.plan.tratamiento);
        if (tratTextos.length > 0) {
            bloques.push(`Tratamiento: ${unirConY(tratTextos)}.`);
        }

        // Programación
        const ind = parseInt(el('planSesionesIndividuales').value, 10);
        const gru = parseInt(el('planSesionesGrupales').value, 10);
        const tieneInd = Number.isFinite(ind) && ind > 0;
        const tieneGru = Number.isFinite(gru) && gru > 0;

        if (tieneInd && tieneGru) {
            bloques.push(`Se programan ${ind} sesiones individuales y ${gru} grupales.`);
        } else if (tieneInd) {
            bloques.push(`Se programan ${ind} sesiones individuales.`);
        } else if (tieneGru) {
            bloques.push(`Se programan ${gru} sesiones grupales.`);
        }

        // Cita
        const fecha = limpio(el('planFecha').value);
        const hora = limpio(el('planHora').value);
        const tipo = limpio(el('planTipoSesion').value);

        if (fecha || hora || tipo) {
            let cita = 'Próxima cita';
            if (tipo) cita += ` (${tipo})`;
            if (fecha) cita += ` el ${formatearFecha(fecha)}`;
            if (hora) cita += ` a las ${hora}`;
            bloques.push(`${cita}.`);
        }

        return bloques.join('\n\n');
    }

    function formatearFecha(iso) {
        const [a, m, d] = iso.split('-');
        if (!a || !m || !d) return iso;
        return `${d}/${m}/${a}`;
    }

    function regenerarPlan(forzar) {
        aplicarTextoGenerado('planTexto', estado.plan, generarTextoPlan(), forzar, 'regenerarPlan');
    }

    /* ==========================================================
       CONSTRUCTORES Y REGLAS DE REDACCIÓN
       ========================================================== */

    function construirCampoGenerico(campo, almacen, onCambio) {
        const wrap = document.createElement('div');
        wrap.className = 'campo-bloque';

        if (campo.tipo === 'tristate') {
            const span = document.createElement('span');
            span.className = 'campo-etiqueta';
            span.textContent = campo.etiqueta;
            wrap.appendChild(span);

            const divBotones = document.createElement('div');
            divBotones.className = 'grupo-botones-fila';

            [
                { val: 'si', label: 'Sí' },
                { val: 'no', label: 'No' }
            ].forEach((opt) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = opt.label;
                btn.addEventListener('click', () => {
                    const yaActivo = btn.classList.contains('activo');
                    divBotones.querySelectorAll('button').forEach(b => b.classList.remove('activo'));
                    if (yaActivo) {
                        delete almacen[campo.id];
                    } else {
                        btn.classList.add('activo');
                        almacen[campo.id] = opt.val;
                    }
                    onCambio();
                });
                divBotones.appendChild(btn);
            });

            wrap.appendChild(divBotones);
            return wrap;
        }

        const label = document.createElement('label');
        label.className = 'campo-label';
        label.innerHTML = `<span>${escapeHTML(campo.etiqueta)}</span>`;

        let input;
        if (campo.tipo === 'numero') {
            input = document.createElement('input');
            input.type = 'number';
            if (campo.min !== undefined) input.min = campo.min;
            if (campo.max !== undefined) input.max = campo.max;
        } else if (campo.tipo === 'select') {
            input = document.createElement('select');
            input.innerHTML = '<option value="">Seleccionar…</option>' +
                campo.opciones.map((o) => `<option value="${escapeHTML(o.valor)}">${escapeHTML(o.etiqueta)}</option>`).join('');
        } else {
            input = document.createElement('input');
            input.type = 'text';
        }

        input.addEventListener('input', () => {
            almacen[campo.id] = input.value;
            onCambio();
        });
        input.addEventListener('change', () => {
            almacen[campo.id] = input.value;
            onCambio();
        });

        label.appendChild(input);
        wrap.appendChild(label);
        return wrap;
    }

    function formatearRedaccionCampo(campo, valor) {
        if (!valor) return '';

        if (campo.tipo === 'tristate') {
            if (valor === 'si') return campo.redaccionAfirmativa || `${campo.etiqueta.toLowerCase()}: sí`;
            if (valor === 'no') return campo.redaccionNegativa || `${campo.etiqueta.toLowerCase()}: no`;
            return '';
        }

        const v = limpio(valor);
        if (!v) return '';

        if (campo.tipo === 'select') {
            const opc = campo.opciones.find(o => o.valor === v);
            return opc ? opc.texto : v;
        }

        if (campo.redaccion) {
            return campo.redaccion.replace('{valor}', v);
        }

        return `${campo.etiqueta.toLowerCase()}: ${v}`;
    }

    /* ==========================================================
       GESTIÓN DE TEXTO EDITABLE Y PORTAPAPELES
       ========================================================== */

    function configurarTextoFinal(idTextarea, idBotonRegenerar, bloqueEstado, funcionRegenerar) {
        const textarea = el(idTextarea);
        textarea.value = '';
        bloqueEstado.ultimoGenerado = '';
        textarea.oninput = () => {
            const boton = el(idBotonRegenerar);
            if (boton) boton.hidden = (textarea.value === bloqueEstado.ultimoGenerado);
        };
        const btnReg = el(idBotonRegenerar);
        if (btnReg) btnReg.onclick = () => funcionRegenerar(true);
    }

    function aplicarTextoGenerado(idTextarea, bloqueEstado, textoGenerado, forzar, idBotonRegenerar) {
        const textarea = el(idTextarea);
        const editadoManualmente = textarea.value !== bloqueEstado.ultimoGenerado;
        if (forzar || !editadoManualmente) {
            textarea.value = textoGenerado;
            bloqueEstado.ultimoGenerado = textoGenerado;
            const btn = el(idBotonRegenerar);
            if (btn) btn.hidden = true;
        } else {
            const btn = el(idBotonRegenerar);
            if (btn) btn.hidden = false;
        }
    }

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

    async function copiarTexto(texto, boton) {
        if (!texto || !texto.trim()) return;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(texto);
                mostrarFeedbackCopiado(boton);
                return;
            }
        } catch (err) {
            console.warn('Fisio+AP: Fallback clipboard', err);
        }
        
        const ta = document.createElement('textarea');
        ta.value = texto;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        mostrarFeedbackCopiado(boton);
    }

    document.addEventListener('click', (e) => {
        const boton = e.target.closest('.btn-copiar[data-target]');
        if (!boton) return;
        const textarea = el(boton.dataset.target);
        if (!textarea) return;
        copiarTexto(textarea.value, boton);
    });

    document.addEventListener('DOMContentLoaded', iniciar);
})();
