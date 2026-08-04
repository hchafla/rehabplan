const BASE_URL = "/rehabplan";


let ejerciciosGlobal = [];

// planPaciente / datosPaciente representan el BORRADOR que se está
// editando ahora mismo en pantalla. No se escribe a localStorage
// hasta que el usuario pulsa "Guardar plan" (ver guardarPlanActual).
let planPaciente = [];


let datosPaciente = {

    titulo: "",

    nombre: "",

    fecha: "",

    observaciones: ""

};


// true si el borrador tiene cambios que todavía no se han guardado
// con "Guardar plan". Se usa para avisar antes de perderlos.
let cambiosSinGuardar = false;




// ==============================
// CARGAR EJERCICIOS
// ==============================

async function cargarEjercicios() {

    try {

        const respuesta = await fetch("ejercicios.json");


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo cargar ejercicios.json"
            );

        }


        const ejercicios = await respuesta.json();


        ejerciciosGlobal = ejercicios;


        crearFiltros(ejercicios);


        mostrarEjercicios(ejercicios);


        mostrarPlan();


    } catch(error) {

        console.error(
            "Error cargando ejercicios:",
            error
        );

    }

}





// ==============================
// BIBLIOTECA
// ==============================

function mostrarEjercicios(ejercicios) {


    const contenedor =
        document.getElementById("biblioteca");


    contenedor.innerHTML = "";



    if (ejercicios.length === 0) {


        contenedor.innerHTML = `

        <div class="estado-vacio">
            <div class="titulo">No hay ejercicios que coincidan</div>
            <p>Prueba a cambiar la búsqueda o quitar algún filtro.</p>
        </div>

        `;


        return;

    }



    ejercicios.forEach(ejercicio => {


        const tarjeta =
            document.createElement("div");


        const añadido =
            planPaciente.some(
                e => e.id == ejercicio.id
            );


        tarjeta.className =
            `card${añadido ? " en-plan" : ""}`;


        // Toda la tarjeta es la zona de interacción: clic o teclado
        // añade/quita del plan. Es más fácil de acertar que un botón
        // pequeño, y funciona igual en móvil que en escritorio.
        tarjeta.tabIndex = 0;

        tarjeta.setAttribute("role", "button");

        tarjeta.setAttribute("aria-pressed", añadido);

        tarjeta.setAttribute(
            "aria-label",
            `${añadido ? "Quitar" : "Añadir"} ${ejercicio.nombre} ${añadido ? "del" : "al"} plan`
        );


        tarjeta.addEventListener(
            "click",
            () => alternarEjercicioEnPlan(ejercicio.id)
        );


        tarjeta.addEventListener(
            "keydown",
            evento => {

                if (evento.key === "Enter" || evento.key === " ") {

                    evento.preventDefault();

                    alternarEjercicioEnPlan(ejercicio.id);

                }

            }
        );



        tarjeta.innerHTML = `


        <img 
        src="${BASE_URL}${ejercicio.imagen}"
        alt="${ejercicio.nombre}">


        <h3>
            ${ejercicio.nombre}
        </h3>


        <div class="etiquetas">
            <span class="etiqueta region">${ejercicio.region}</span>
            <span class="etiqueta material">${ejercicio.material}</span>
        </div>


        <p class="descripcion">
            ${ejercicio.descripcion}
        </p>


        <div class="acciones">

            <a 
            class="ver-video"
            href="${ejercicio.youtube}"
            target="_blank">

                Ver vídeo

            </a>


            <span class="estado-plan">

                ${
                    añadido
                    ? "✓ En tu plan"
                    : "Toca para añadir"
                }

            </span>

        </div>


        `;



        // El enlace "Ver vídeo" no debe disparar el añadir/quitar
        // de la tarjeta al hacer clic o al navegar con teclado.
        const enlaceVideo =
            tarjeta.querySelector(".ver-video");


        if (enlaceVideo) {

            enlaceVideo.addEventListener(
                "click",
                evento => evento.stopPropagation()
            );

            enlaceVideo.addEventListener(
                "keydown",
                evento => evento.stopPropagation()
            );

        }



        contenedor.appendChild(tarjeta);


    });


}







// ==============================
// FILTROS
// ==============================

function crearFiltros(ejercicios) {


    const regiones =
        [...new Set(
            ejercicios.map(e => e.region)
        )];


    const materiales =
        [...new Set(
            ejercicios.map(e => e.material)
        )];



    const selectRegion =
        document.getElementById("filtroRegion");



    const selectMaterial =
        document.getElementById("filtroMaterial");



    regiones.forEach(region => {


        selectRegion.innerHTML += `

        <option value="${region}">
            ${region}
        </option>

        `;


    });





    materiales.forEach(material => {


        selectMaterial.innerHTML += `

        <option value="${material}">
            ${material}
        </option>

        `;


    });





    document
    .getElementById("buscador")
    .addEventListener(
        "input",
        aplicarFiltros
    );



    selectRegion.addEventListener(
        "change",
        aplicarFiltros
    );



    selectMaterial.addEventListener(
        "change",
        aplicarFiltros
    );


}





function obtenerEjerciciosFiltrados() {


    const texto =
        document
        .getElementById("buscador")
        .value
        .toLowerCase();



    const region =
        document
        .getElementById("filtroRegion")
        .value;



    const material =
        document
        .getElementById("filtroMaterial")
        .value;





    return ejerciciosGlobal.filter(
        ejercicio => {


        return (

            ejercicio.nombre
            .toLowerCase()
            .includes(texto)



            &&



            (
                !region ||
                ejercicio.region === region
            )



            &&



            (
                !material ||
                ejercicio.material === material
            )

        );


    });


}




function aplicarFiltros() {

    mostrarEjercicios(
        obtenerEjerciciosFiltrados()
    );

}




// Vuelve a pintar la biblioteca respetando los filtros que hubiera
// puestos (en vez de mostrar siempre la lista completa sin filtrar).
function refrescarBiblioteca() {

    mostrarEjercicios(
        obtenerEjerciciosFiltrados()
    );

}







// ==============================
// PESTAÑAS MÓVIL
// ==============================

function mostrarPestanaMovil(pestana) {


    const layout =
        document.getElementById("layout");


    const tabBiblioteca =
        document.getElementById("tabBiblioteca");


    const tabPlan =
        document.getElementById("tabPlan");


    if (!layout || !tabBiblioteca || !tabPlan)
        return;



    layout.classList.remove(
        "pestana-biblioteca",
        "pestana-plan"
    );


    layout.classList.add(
        `pestana-${pestana}`
    );



    tabBiblioteca.classList.toggle(
        "activa",
        pestana === "biblioteca"
    );


    tabPlan.classList.toggle(
        "activa",
        pestana === "plan"
    );


    // Al cambiar de pestaña, subimos al principio del panel
    // que se acaba de mostrar (por si veníamos con scroll).
    window.scrollTo({ top: 0, behavior: "smooth" });


}


// ==============================
// PLAN PACIENTE
// ==============================

// Añade el ejercicio al plan si no estaba, o lo quita si ya estaba.
// Se usa al tocar/pulsar Enter sobre una tarjeta de la biblioteca.
function alternarEjercicioEnPlan(id) {


    const yaEstaEnPlan =
        planPaciente.some(
            e => e.id == id
        );



    if (yaEstaEnPlan) {


        planPaciente =
            planPaciente.filter(
                e => e.id != id
            );


    } else {


        const ejercicio =
            ejerciciosGlobal.find(
                e => e.id == id
            );


        if (!ejercicio)
            return;


        planPaciente.push({

            id: ejercicio.id,

            ejercicio: ejercicio,

            series: 3,

            tipo: "repeticiones",

            cantidad: 10,

            notas: ""

        });


    }



    marcarCambioEnBorrador();


    mostrarPlan();


    refrescarBiblioteca();


}




// ==============================
// MOSTRAR PLAN
// ==============================

function mostrarPlan() {


    const contenedor =
        document.getElementById(
            "planPaciente"
        );


    if (!contenedor)
        return;



    // Contador de la pestaña "Mi plan" (solo visible en móvil)
    const contadorTab =
        document.getElementById(
            "contadorPlanTab"
        );


    if (contadorTab) {

        contadorTab.textContent =
            `(${planPaciente.length})`;

    }



    contenedor.innerHTML = "";



    if (planPaciente.length === 0) {


        contenedor.innerHTML = `

        <div class="estado-vacio">
            <div class="titulo">Aún no hay ejercicios en el plan</div>
            <p>Añade ejercicios desde la biblioteca de arriba para empezar.</p>
        </div>

        `;


        return;

    }



    planPaciente.forEach((item, indice) => {



        const bloque =
            document.createElement(
                "div"
            );



        bloque.className =
            "plan-item";



        const textoDosis =
            item.tipo === "segundos"
            ? `${item.series} series × ${item.cantidad} s`
            : `${item.series} series × ${item.cantidad} rep`;


        const esPrimero =
            indice === 0;


        const esUltimo =
            indice === planPaciente.length - 1;


        // Campo nuevo: si no existe en planes guardados antes de
        // esta función, se trata como "no incluir" por defecto.
        const incluirDescripcion =
            item.incluirDescripcion === true;



        bloque.innerHTML = `


        <div class="plan-item-cabecera">

            <div class="orden-controles">

                <button 
                class="mover"
                type="button"
                aria-label="Subir ${item.ejercicio.nombre}"
                onclick="moverEjercicio(${item.id}, -1)"
                ${esPrimero ? "disabled" : ""}>

                    ▲

                </button>


                <button 
                class="mover"
                type="button"
                aria-label="Bajar ${item.ejercicio.nombre}"
                onclick="moverEjercicio(${item.id}, 1)"
                ${esUltimo ? "disabled" : ""}>

                    ▼

                </button>

            </div>


            <div class="plan-item-info">

                <h3>
                    ${item.ejercicio.nombre}
                </h3>


                <div class="dosis">
                    ${textoDosis}
                </div>

            </div>


            <img 
            class="miniatura"
            src="${BASE_URL}${item.ejercicio.imagen}"
            alt=""
            loading="lazy">

        </div>


        <div class="campos">


        <label>

            Series

            <input 
            type="number"
            value="${item.series}"
            onchange="
            actualizarCampo(
                ${item.id},
                'series',
                this.value
            )">

        </label>



        <label>

            Tipo

            <select 
            onchange="
            actualizarCampo(
                ${item.id},
                'tipo',
                this.value
            )">


                <option 
                value="repeticiones"
                ${item.tipo === "repeticiones" ? "selected" : ""}>

                    Repeticiones

                </option>



                <option 
                value="segundos"
                ${item.tipo === "segundos" ? "selected" : ""}>

                    Segundos

                </option>


            </select>


        </label>



        <label>

            ${
                item.tipo === "segundos"
                ? "Segundos"
                : "Repeticiones"
            }


            <input
            type="number"
            value="${item.cantidad}"
            onchange="
            actualizarCampo(
                ${item.id},
                'cantidad',
                this.value
            )">


        </label>


        </div>



        <p class="descripcion-plan">
            ${item.ejercicio.descripcion}
        </p>


        <label class="interruptor-pdf">

            <input
            type="checkbox"
            ${incluirDescripcion ? "checked" : ""}
            onchange="
            actualizarCampo(
                ${item.id},
                'incluirDescripcion',
                this.checked
            )">

            <span class="interruptor-visual"></span>

            Incluir esta descripción en el PDF

        </label>



        <label class="notas">

            Notas

            <textarea
            onchange="
            actualizarCampo(
                ${item.id},
                'notas',
                this.value
            )">${item.notas}</textarea>


        </label>



        <button 
        class="eliminar"
        onclick="eliminarEjercicio(${item.id})">

            Eliminar del plan

        </button>


        `;



        contenedor.appendChild(
            bloque
        );


    });


}




function moverEjercicio(id, direccion) {


    const indice =
        planPaciente.findIndex(
            e => e.id == id
        );


    if (indice === -1)
        return;


    const nuevoIndice =
        indice + direccion;


    if (nuevoIndice < 0 || nuevoIndice >= planPaciente.length)
        return;



    const temporal =
        planPaciente[indice];


    planPaciente[indice] =
        planPaciente[nuevoIndice];


    planPaciente[nuevoIndice] =
        temporal;



    marcarCambioEnBorrador();


    mostrarPlan();


}







function actualizarCampo(id, campo, valor) {


    const ejercicio =
        planPaciente.find(
            e => e.id == id
        );



    if (!ejercicio)
        return;




    if (
        campo === "series" ||
        campo === "cantidad"
    ) {

        valor = Number(valor);

    }



    ejercicio[campo] = valor;



    marcarCambioEnBorrador();


    mostrarPlan();


}







function eliminarEjercicio(id) {


    planPaciente =
        planPaciente.filter(
            e => e.id != id
        );



    marcarCambioEnBorrador();


    mostrarPlan();


    refrescarBiblioteca();


}








// ==============================
// VACIAR PLAN (borrador actual)
// ==============================

// Vacía el BORRADOR que se está construyendo ahora mismo: título,
// fecha, observaciones y ejercicios. Nunca toca nada ya guardado en
// localStorage, ni aunque el borrador viniera de abrir un plan
// guardado — eso es a propósito, así "vaciar" jamás puede borrar un
// plan histórico por accidente. Si se quiere borrar un plan guardado
// de verdad, es la acción "Eliminar plan" (eliminarPlanActivo), que
// es un botón aparte.
function vaciarPlan() {


    const hayAlgoQueVaciar =
        planPaciente.length > 0 ||
        cambiosSinGuardar ||
        (datosPaciente.titulo && datosPaciente.titulo.trim()) ||
        datosPaciente.fecha ||
        (datosPaciente.observaciones && datosPaciente.observaciones.trim());


    if (!hayAlgoQueVaciar)
        return;



    const confirmar =
        confirm(
            "¿Seguro que quieres vaciar el plan? Se perderá lo que hay " +
            "en pantalla (título, fecha, observaciones y ejercicios). " +
            "Los planes ya guardados de este paciente no se tocan."
        );


    if (!confirmar)
        return;



    planPaciente = [];

    datosPaciente.titulo = "";
    datosPaciente.fecha = "";
    datosPaciente.observaciones = "";

    // Al vaciar, el borrador deja de estar "atado" al plan guardado
    // del que partiera: si luego se guarda, se crea un plan nuevo en
    // vez de sobrescribir el original.
    planActivoId = null;

    cambiosSinGuardar = false;


    actualizarCamposDatosPaciente();

    mostrarPlan();

    refrescarBiblioteca();

    mostrarSelectorPlanes();


}


// ==============================
// GUARDAR COMO PLANTILLA
// ==============================

function obtenerPlantillas() {

    const guardadas =
        localStorage.getItem("plantillas");

    return guardadas ? JSON.parse(guardadas) : [];

}


function guardarPlantillas(plantillas) {

    localStorage.setItem(
        "plantillas",
        JSON.stringify(plantillas)
    );

}


function guardarComoPlantilla() {


    if (planPaciente.length === 0) {

        alert(
            "No hay ejercicios en el plan para guardar como plantilla."
        );

        return;

    }



    const nombrePlantilla =
        prompt(
            'Nombre de la plantilla (ej. "Rodilla LCA - Fase 1"):'
        );


    if (!nombrePlantilla || !nombrePlantilla.trim())
        return;



    const plantillas =
        obtenerPlantillas();


    plantillas.push({

        id: Date.now(),

        nombre: nombrePlantilla.trim(),

        // Copia profunda: la plantilla queda congelada tal cual
        // está el plan ahora, sin quedar enlazada a planPaciente.
        ejercicios: JSON.parse(
            JSON.stringify(planPaciente)
        )

    });


    guardarPlantillas(plantillas);


    alert(
        `Plantilla "${nombrePlantilla.trim()}" guardada. La verás en la sección Plantillas.`
    );


}




// ==============================
// PACIENTE ACTIVO / PLAN ACTIVO
// ==============================

// pacienteActivoId: qué paciente está seleccionado. null = ninguno.
// planActivoId: qué plan GUARDADO está cargado en el borrador.
// null = el borrador es nuevo, todavía no se ha guardado como plan.
let pacienteActivoId = null;
let planActivoId = null;


// Copia en los <input>/<select> del sidebar los valores actuales
// de datosPaciente. Se usa cada vez que cambiamos de paciente, de
// plan, o vaciamos el borrador.
function actualizarCamposDatosPaciente() {

    const titulo = document.getElementById("tituloPlan");
    const nombre = document.getElementById("nombrePaciente");
    const fecha = document.getElementById("fechaPlan");
    const observaciones = document.getElementById("observacionesPaciente");

    if (titulo) titulo.value = datosPaciente.titulo || "";
    if (nombre) nombre.value = datosPaciente.nombre || "";
    if (fecha) fecha.value = datosPaciente.fecha || "";
    if (observaciones) observaciones.value = datosPaciente.observaciones || "";

}


// Si hay cambios sin guardar en el borrador, pregunta antes de
// descartarlos. Devuelve true si es seguro continuar (no había
// cambios, o el usuario confirma que quiere perderlos).
function confirmarDescartarCambios() {

    if (!cambiosSinGuardar)
        return true;

    return confirm(
        "Tienes cambios sin guardar en este plan. Si continúas se " +
        "perderán. ¿Seguro que quieres continuar?"
    );

}


// Marca el borrador como modificado y refresca la vista. Se llama
// desde cualquier edición: campos del paciente/plan, añadir o quitar
// ejercicios, reordenar, cambiar series/repeticiones/notas...
function marcarCambioEnBorrador() {

    cambiosSinGuardar = true;

    actualizarEstadoGuardado();

}


// Actualiza un indicador de texto opcional (id="estadoPlan") si existe
// en el HTML, tipo "Cambios sin guardar" / "Guardado". No es obligatorio
// tenerlo en la página; si no existe el elemento, no pasa nada.
function actualizarEstadoGuardado() {

    const estado = document.getElementById("estadoPlan");

    if (!estado)
        return;

    if (cambiosSinGuardar) {
        estado.textContent = "Cambios sin guardar";
        estado.classList.add("sin-guardar");
    } else {
        estado.textContent = planActivoId ? "Guardado" : "";
        estado.classList.remove("sin-guardar");
    }

}


// ==============================
// LOCAL STORAGE — PACIENTES
// ==============================
// Un paciente solo guarda su nombre. El resto (título, fecha,
// observaciones, ejercicios) vive en "planes", porque un mismo
// paciente puede tener varios planes a lo largo del tiempo.

function obtenerPacientes() {

    const guardados = localStorage.getItem("pacientes");
    return guardados ? JSON.parse(guardados) : [];

}


function guardarPacientes(pacientes) {

    localStorage.setItem("pacientes", JSON.stringify(pacientes));

}


// ==============================
// LOCAL STORAGE — PLANES
// ==============================

function obtenerPlanes() {

    const guardados = localStorage.getItem("planes");
    return guardados ? JSON.parse(guardados) : [];

}


function guardarPlanes(planes) {

    localStorage.setItem("planes", JSON.stringify(planes));

}


function obtenerPlanesDePaciente(pacienteId) {

    return obtenerPlanes()
        .filter(p => p.pacienteId == pacienteId)
        .sort((a, b) => b.actualizadoEn - a.actualizadoEn);

}


// ==============================
// SELECTOR DE PACIENTES
// ==============================

function mostrarSelectorPacientes() {

    const selector = document.getElementById("selectorPaciente");

    if (!selector)
        return;

    const pacientes =
        obtenerPacientes()
        .slice()
        .sort((a, b) => b.actualizadoEn - a.actualizadoEn);

    if (pacientes.length === 0) {

        selector.innerHTML =
            `<option value="">Sin pacientes todavía</option>`;

        selector.value = "";

        return;

    }

    selector.innerHTML = pacientes.map(paciente => {

        const etiqueta =
            (paciente.nombre && paciente.nombre.trim())
            || "Paciente sin nombre";

        const seleccionado =
            paciente.id == pacienteActivoId ? "selected" : "";

        return `<option value="${paciente.id}" ${seleccionado}>${etiqueta}</option>`;

    }).join("");

    if (pacienteActivoId) {
        selector.value = pacienteActivoId;
    }

}


// Crea un paciente nuevo (solo pide el nombre) y lo deja activo con
// un borrador de plan en blanco. Acción separada del selector, para
// no mezclar "elegir uno existente" con "crear uno nuevo".
function nuevoPaciente() {

    if (!confirmarDescartarCambios())
        return;

    const nombre = prompt("Nombre del nuevo paciente:");

    if (!nombre || !nombre.trim())
        return;

    const paciente = {
        id: Date.now(),
        nombre: nombre.trim(),
        actualizadoEn: Date.now()
    };

    const pacientes = obtenerPacientes();
    pacientes.push(paciente);
    guardarPacientes(pacientes);

    pacienteActivoId = paciente.id;
    planActivoId = null;

    localStorage.setItem("pacienteActivoId", String(pacienteActivoId));
    localStorage.removeItem("planActivoId");

    datosPaciente = {
        titulo: "",
        nombre: paciente.nombre,
        fecha: "",
        observaciones: ""
    };

    planPaciente = [];
    cambiosSinGuardar = false;

    actualizarCamposDatosPaciente();
    mostrarPlan();
    refrescarBiblioteca();
    mostrarSelectorPacientes();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


function cambiarPaciente(id) {

    if (!id)
        return;

    if (id == pacienteActivoId)
        return;

    if (!confirmarDescartarCambios()) {
        mostrarSelectorPacientes();
        return;
    }

    const paciente =
        obtenerPacientes().find(p => p.id == id);

    if (!paciente)
        return;

    pacienteActivoId = paciente.id;
    planActivoId = null;

    localStorage.setItem("pacienteActivoId", String(pacienteActivoId));
    localStorage.removeItem("planActivoId");

    datosPaciente = {
        titulo: "",
        nombre: paciente.nombre,
        fecha: "",
        observaciones: ""
    };

    planPaciente = [];
    cambiosSinGuardar = false;

    actualizarCamposDatosPaciente();
    mostrarPlan();
    refrescarBiblioteca();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


// Elimina el paciente activo Y todos sus planes guardados (no solo
// el que estuviera abierto). No se puede deshacer.
function eliminarPacienteActivo() {

    if (!pacienteActivoId) {

        alert("No hay ningún paciente seleccionado para eliminar.");
        return;

    }

    const confirmar = confirm(
        "¿Seguro que quieres eliminar este paciente y TODOS sus planes " +
        "guardados? No se puede deshacer."
    );

    if (!confirmar)
        return;

    const pacientes =
        obtenerPacientes().filter(p => p.id != pacienteActivoId);

    guardarPacientes(pacientes);

    const planes =
        obtenerPlanes().filter(p => p.pacienteId != pacienteActivoId);

    guardarPlanes(planes);

    localStorage.removeItem("pacienteActivoId");
    localStorage.removeItem("planActivoId");

    pacienteActivoId = null;
    planActivoId = null;

    datosPaciente = {
        titulo: "",
        nombre: "",
        fecha: "",
        observaciones: ""
    };

    planPaciente = [];
    cambiosSinGuardar = false;

    actualizarCamposDatosPaciente();
    mostrarPlan();
    refrescarBiblioteca();
    mostrarSelectorPacientes();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


// ==============================
// SELECTOR DE PLANES (del paciente activo)
// ==============================

function mostrarSelectorPlanes() {

    const selector = document.getElementById("selectorPlan");

    if (!selector)
        return;

    if (!pacienteActivoId) {

        selector.innerHTML =
            `<option value="">Elige un paciente primero</option>`;

        selector.disabled = true;

        return;

    }

    selector.disabled = false;

    const planes = obtenerPlanesDePaciente(pacienteActivoId);

    if (planes.length === 0) {

        selector.innerHTML =
            `<option value="">Sin planes guardados todavía</option>`;

        selector.value = "";

        return;

    }

    // Si el borrador actual no está atado a ningún plan guardado
    // (planActivoId es null), lo indicamos como placeholder — pero
    // NO es una opción seleccionable de "crear nuevo": eso vive en
    // el botón "+ Nuevo plan", aparte, para no repetir la mezcla de
    // "elegir existente" / "crear nuevo" en un mismo control.
    const opcionBorrador =
        !planActivoId
        ? `<option value="" selected disabled>Borrador sin guardar</option>`
        : "";

    const opcionesGuardadas = planes.map(plan => {

        const etiqueta =
            (plan.titulo && plan.titulo.trim())
            || (plan.fecha ? `Plan del ${plan.fecha}` : "Plan sin título");

        const seleccionado =
            plan.id == planActivoId ? "selected" : "";

        return `<option value="${plan.id}" ${seleccionado}>${etiqueta}</option>`;

    }).join("");

    selector.innerHTML = opcionBorrador + opcionesGuardadas;

    selector.value = planActivoId || "";

}


// Abre un plan guardado del paciente activo en el borrador. Crear un
// plan nuevo es una acción aparte: ver nuevoPlan().
function cambiarPlan(id) {

    if (!id)
        return;

    if (id == planActivoId)
        return;

    if (!confirmarDescartarCambios()) {
        mostrarSelectorPlanes();
        return;
    }

    const plan =
        obtenerPlanes().find(
            p => p.id == id && p.pacienteId == pacienteActivoId
        );

    if (!plan)
        return;

    planActivoId = plan.id;
    localStorage.setItem("planActivoId", String(planActivoId));

    datosPaciente.titulo = plan.titulo || "";
    datosPaciente.fecha = plan.fecha || "";
    datosPaciente.observaciones = plan.observaciones || "";

    // Copia profunda: editar el borrador no debe tocar lo guardado
    // hasta que se pulse "Guardar plan".
    planPaciente = JSON.parse(JSON.stringify(plan.ejercicios || []));

    cambiosSinGuardar = false;

    actualizarCamposDatosPaciente();
    mostrarPlan();
    refrescarBiblioteca();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


// Empieza un borrador de plan en blanco para el paciente activo,
// sin tocar sus planes ya guardados.
function nuevoPlan() {

    if (!pacienteActivoId) {

        alert("Elige o crea primero un paciente.");
        return;

    }

    if (!confirmarDescartarCambios()) {
        mostrarSelectorPlanes();
        return;
    }

    planActivoId = null;
    localStorage.removeItem("planActivoId");

    datosPaciente.titulo = "";
    datosPaciente.fecha = "";
    datosPaciente.observaciones = "";

    planPaciente = [];
    cambiosSinGuardar = false;

    actualizarCamposDatosPaciente();
    mostrarPlan();
    refrescarBiblioteca();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


// Guarda explícitamente el borrador actual: crea un plan nuevo la
// primera vez, o sobrescribe el mismo plan si ya se había guardado
// antes (planActivoId). También sincroniza el nombre del paciente
// por si se editó en el campo "nombre" del borrador.
function guardarPlanActual() {

    if (!pacienteActivoId) {

        alert("Elige o crea primero un paciente antes de guardar.");
        return;

    }

    // Sincronizar nombre del paciente si se cambió en el borrador.
    const pacientes = obtenerPacientes();
    const indicePaciente = pacientes.findIndex(p => p.id == pacienteActivoId);

    if (indicePaciente !== -1 && datosPaciente.nombre && datosPaciente.nombre.trim()) {
        pacientes[indicePaciente].nombre = datosPaciente.nombre.trim();
        pacientes[indicePaciente].actualizadoEn = Date.now();
        guardarPacientes(pacientes);
    }

    const planes = obtenerPlanes();

    const registro = {
        id: planActivoId || Date.now(),
        pacienteId: pacienteActivoId,
        titulo: datosPaciente.titulo || "",
        fecha: datosPaciente.fecha || "",
        observaciones: datosPaciente.observaciones || "",
        ejercicios: planPaciente,
        actualizadoEn: Date.now()
    };

    const indicePlan = planes.findIndex(p => p.id == registro.id);

    if (indicePlan === -1) {
        planes.push(registro);
    } else {
        planes[indicePlan] = registro;
    }

    guardarPlanes(planes);

    planActivoId = registro.id;
    localStorage.setItem("planActivoId", String(planActivoId));

    cambiosSinGuardar = false;

    mostrarSelectorPacientes();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


// Elimina de localStorage el plan guardado que está abierto ahora
// mismo (distinto de "vaciar", que solo limpia el borrador en
// pantalla sin borrar nada guardado).
function eliminarPlanActivo() {

    if (!planActivoId) {

        alert("Este plan todavía no se ha guardado, no hay nada que eliminar.");
        return;

    }

    const confirmar = confirm(
        "¿Seguro que quieres eliminar este plan guardado? No se puede deshacer."
    );

    if (!confirmar)
        return;

    const planes =
        obtenerPlanes().filter(p => p.id != planActivoId);

    guardarPlanes(planes);

    planActivoId = null;
    localStorage.removeItem("planActivoId");

    datosPaciente.titulo = "";
    datosPaciente.fecha = "";
    datosPaciente.observaciones = "";

    planPaciente = [];
    cambiosSinGuardar = false;

    actualizarCamposDatosPaciente();
    mostrarPlan();
    refrescarBiblioteca();
    mostrarSelectorPlanes();
    actualizarEstadoGuardado();

}


// ==============================
// DATOS PACIENTE (campos del borrador)
// ==============================

function configurarDatosPaciente() {


    const titulo =
        document.getElementById(
            "tituloPlan"
        );


    const nombre =
        document.getElementById(
            "nombrePaciente"
        );


    const fecha =
        document.getElementById(
            "fechaPlan"
        );


    const observaciones =
        document.getElementById(
            "observacionesPaciente"
        );



    actualizarCamposDatosPaciente();


    titulo.addEventListener(
        "input",
        () => {

            datosPaciente.titulo =
                titulo.value;

            marcarCambioEnBorrador();

        }
    );



    nombre.addEventListener(
        "input",
        () => {

            datosPaciente.nombre =
                nombre.value;

            marcarCambioEnBorrador();

        }
    );




    fecha.addEventListener(
        "input",
        () => {

            datosPaciente.fecha =
                fecha.value;

            marcarCambioEnBorrador();

        }
    );




    observaciones.addEventListener(
        "input",
        () => {

            datosPaciente.observaciones =
                observaciones.value;

            marcarCambioEnBorrador();

        }
    );


    // Aviso del navegador si se intenta cerrar/recargar la pestaña
    // con cambios sin guardar en el borrador.
    window.addEventListener("beforeunload", evento => {

        if (!cambiosSinGuardar)
            return;

        evento.preventDefault();
        evento.returnValue = "";

    });


}


function cargarPlan() {

    const idPacienteGuardado =
        localStorage.getItem("pacienteActivoId");

    const idPlanGuardado =
        localStorage.getItem("planActivoId");

    if (idPacienteGuardado) {

        const paciente =
            obtenerPacientes().find(
                p => p.id == idPacienteGuardado
            );

        if (paciente) {

            pacienteActivoId = paciente.id;
            datosPaciente.nombre = paciente.nombre;

            if (idPlanGuardado) {

                const plan =
                    obtenerPlanes().find(
                        p => p.id == idPlanGuardado && p.pacienteId == pacienteActivoId
                    );

                if (plan) {

                    planActivoId = plan.id;
                    datosPaciente.titulo = plan.titulo || "";
                    datosPaciente.fecha = plan.fecha || "";
                    datosPaciente.observaciones = plan.observaciones || "";
                    planPaciente = plan.ejercicios || [];

                }

            }

        }

    }


    actualizarCamposDatosPaciente();

    mostrarSelectorPacientes();

    mostrarSelectorPlanes();

    actualizarEstadoGuardado();

}








// ==============================
// LOGO DE LA CLÍNICA
// ==============================

// Tamaño máximo (en píxeles) al que se reduce el logo antes de
// guardarlo en local. Un logo no necesita más resolución que esta
// para verse nítido en la cabecera del PDF.
const LOGO_MAX_DIMENSION_PX = 400;


function escalarImagenParaLogo(archivo, maxDimension) {

    return new Promise((resolve, reject) => {


        const lector = new FileReader();


        lector.onload = () => {


            const img = new Image();


            img.onload = () => {


                let ancho = img.width;

                let alto = img.height;


                if (ancho > maxDimension || alto > maxDimension) {

                    if (ancho >= alto) {

                        alto = Math.round(alto * (maxDimension / ancho));

                        ancho = maxDimension;

                    } else {

                        ancho = Math.round(ancho * (maxDimension / alto));

                        alto = maxDimension;

                    }

                }



                const canvas =
                    document.createElement("canvas");

                canvas.width = ancho;

                canvas.height = alto;


                const ctx =
                    canvas.getContext("2d");

                ctx.drawImage(img, 0, 0, ancho, alto);


                resolve(
                    canvas.toDataURL("image/png")
                );


            };


            img.onerror = () =>
                reject(new Error("No se pudo leer la imagen"));


            img.src = lector.result;


        };


        lector.onerror = () =>
            reject(new Error("No se pudo leer el archivo"));


        lector.readAsDataURL(archivo);


    });

}


function mostrarLogoGuardado() {


    const logo =
        localStorage.getItem("logoClinica");


    const img =
        document.getElementById("previsualizacionLogo");

    const botonQuitar =
        document.getElementById("quitarLogo");


    if (!img)
        return;



    if (logo) {

        img.src = logo;

        img.style.display = "block";


        if (botonQuitar)
            botonQuitar.style.display = "inline-block";


    } else {

        img.removeAttribute("src");

        img.style.display = "none";


        if (botonQuitar)
            botonQuitar.style.display = "none";

    }


}


function configurarLogoClinica() {


    const input =
        document.getElementById("inputLogo");

    const botonQuitar =
        document.getElementById("quitarLogo");


    if (!input)
        return;



    input.addEventListener("change", async () => {


        const archivo = input.files[0];

        if (!archivo)
            return;


        try {

            const logoEscalado =
                await escalarImagenParaLogo(
                    archivo,
                    LOGO_MAX_DIMENSION_PX
                );


            localStorage.setItem(
                "logoClinica",
                logoEscalado
            );


            mostrarLogoGuardado();


        } catch (error) {

            console.error(
                "No se pudo procesar el logo:",
                error
            );

            alert(
                "No se pudo cargar esa imagen. Prueba con otro archivo."
            );

        }


        input.value = "";


    });



    if (botonQuitar) {

        botonQuitar.addEventListener("click", () => {


            const confirmar =
                confirm(
                    "¿Quitar el logo de la clínica? Los próximos PDF se generarán sin él."
                );


            if (!confirmar)
                return;


            localStorage.removeItem("logoClinica");


            mostrarLogoGuardado();


        });

    }


}


// Dimensiones reales (en píxeles) de una imagen ya cargada como
// dataURL — necesarias para escalarla en el PDF sin deformarla.
function obtenerDimensionesImagen(dataUrl) {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = () =>
            resolve({ ancho: img.width, alto: img.height });

        img.onerror = () =>
            reject(new Error("No se pudieron leer las dimensiones de la imagen"));

        img.src = dataUrl;

    });

}


// Convierte una fecha "YYYY-MM-DD" (formato del <input type="date">)
// en algo más legible para el PDF: "2 de agosto, 2026".
function formatearFechaBonita(fechaISO) {

    if (!fechaISO)
        return "";


    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];


    const partes = fechaISO.split("-");

    if (partes.length !== 3)
        return fechaISO;


    const [anio, mes, dia] = partes;

    const nombreMes = meses[parseInt(mes, 10) - 1] || mes;


    return `${parseInt(dia, 10)} de ${nombreMes}, ${anio}`;

}




async function cargarImagenPDF(url) {

    return new Promise((resolve, reject) => {


        const img = new Image();


        img.crossOrigin = "Anonymous";


        img.onload = function(){


            const canvas =
                document.createElement("canvas");


            canvas.width =
                img.width;


            canvas.height =
                img.height;



            const ctx =
                canvas.getContext("2d");



            ctx.drawImage(
                img,
                0,
                0
            );



            resolve(
                canvas.toDataURL(
                    "image/jpeg",
                    0.8
                )
            );


        };



        img.onerror = reject;



        img.src = url;


    });

}


// ==============================
// ESPERAR A QUE EL QR ESTÉ LISTO
// ==============================

function esperarQRListo(qrContainer, maxEsperaMs = 3000) {

    return new Promise((resolve, reject) => {


        const inicio = Date.now();


        function comprobar() {


            const imgQR =
                qrContainer.querySelector("img");


            const canvasQR =
                qrContainer.querySelector("canvas");



            // El QR usa <img> cuando el navegador ya generó el dataURL
            if (imgQR && imgQR.complete && imgQR.naturalWidth > 0) {

                resolve(imgQR.src);

                return;

            }



            // Algunos navegadores se quedan en <canvas> (no llegan a crear el <img>)
            if (canvasQR && canvasQR.width > 0) {

                resolve(
                    canvasQR.toDataURL("image/png")
                );

                return;

            }



            // Todavía no está listo: si no ha pasado el tiempo máximo, reintentamos
            if (Date.now() - inicio < maxEsperaMs) {

                setTimeout(comprobar, 50);

                return;

            }



            // Se agotó el tiempo de espera: avisamos en vez de fallar en silencio
            reject(
                new Error("Tiempo de espera agotado generando el código QR")
            );

        }


        comprobar();


    });

}


// ==============================
// GENERAR PDF
// ==============================

async function generarPDF() {

    if (planPaciente.length === 0) {
        alert("No hay ejercicios en el plan");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();


    // ==============================
    // TOKENS DE COLOR (misma identidad de marca, mejor aprovechada)
    // ==============================
    const COLOR_MARCA = [43, 99, 88];
    const COLOR_MARCA_OSCURO = [30, 74, 66];
    const COLOR_ACENTO = [185, 121, 15];
    const COLOR_INK = [28, 43, 39];
    const COLOR_INK_SUAVE = [91, 107, 101];
    const COLOR_INK_TENUE = [140, 152, 147];
    const COLOR_BANDA_CLARA = [237, 244, 242];
    const COLOR_BORDE_CARD = [228, 234, 231];
    const COLOR_BORDE_SUAVE = [238, 242, 240];
    const COLOR_FONDO_CARD = [253, 254, 253];
    const COLOR_PAUTA_BG = [226, 240, 233];
    const COLOR_PAUTA_TEXT = [24, 87, 66];
    const COLOR_NOTA_BG = [247, 244, 237];


    // ==============================
    // CABECERA — documento clínico moderno, el blanco protagoniza
    // ==============================

    const alturaBanda = 32;

    // Elegimos no pintar una banda de color: el aire es el elemento
    // de diseño. Solo una línea fina de marca separa cabecera y cuerpo.
    pdf.setTextColor(...COLOR_INK_TENUE);
    pdf.setFontSize(7.5);
    pdf.setFont("helvetica", "normal");
    pdf.text("REHABPLAN", 20, 14);

    pdf.setFontSize(21);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...COLOR_MARCA_OSCURO);

    const tituloPlan =
        (datosPaciente.titulo && datosPaciente.titulo.trim())
        || "Plan de ejercicios";

    pdf.text(tituloPlan, 20, 24);
    pdf.setFont("helvetica", "normal");


    // Logo de la clínica (si el fisio ha guardado uno). Se ajusta
    // dentro de una caja de 26x16mm manteniendo su proporción.
    const logoGuardado = localStorage.getItem("logoClinica");

    if (logoGuardado) {
        try {
            const cajaAncho = 26;
            const cajaAlto = 16;
            const dimensiones = await obtenerDimensionesImagen(logoGuardado);

            let anchoLogo = cajaAncho;
            let altoLogo = (dimensiones.alto / dimensiones.ancho) * anchoLogo;

            if (altoLogo > cajaAlto) {
                altoLogo = cajaAlto;
                anchoLogo = (dimensiones.ancho / dimensiones.alto) * altoLogo;
            }

            const xLogo = 190 - anchoLogo;
            const yLogo = (alturaBanda - altoLogo) / 2;

            pdf.addImage(logoGuardado, "PNG", xLogo, yLogo, anchoLogo, altoLogo);

        } catch (error) {
            console.error("No se pudo añadir el logo al PDF:", error);
        }
    }

    // Línea única de color corporativo: separa cabecera de contenido
    pdf.setDrawColor(...COLOR_MARCA);
    pdf.setLineWidth(0.6);
    pdf.line(20, alturaBanda, 190, alturaBanda);

    pdf.setTextColor(0, 0, 0);

    let y = alturaBanda + 11;


    // ==============================
    // PACIENTE / FECHA / OBSERVACIONES — más aire, mismas dos columnas
    // ==============================

    const hayNombre = datosPaciente.nombre && datosPaciente.nombre.trim();
    const hayFecha = !!datosPaciente.fecha;

    if (hayNombre || hayFecha) {

        if (hayNombre) {
            pdf.setFontSize(7);
            pdf.setTextColor(...COLOR_INK_TENUE);
            pdf.text("PACIENTE", 20, y);

            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(...COLOR_INK);
            pdf.text(datosPaciente.nombre.trim(), 20, y + 5.5);
            pdf.setFont("helvetica", "normal");
        }

        if (hayFecha) {
            pdf.setFontSize(7);
            pdf.setTextColor(...COLOR_INK_TENUE);
            pdf.text("FECHA DE EMISIÓN", 120, y);

            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(...COLOR_INK);
            pdf.text(formatearFechaBonita(datosPaciente.fecha), 120, y + 5.5);
            pdf.setFont("helvetica", "normal");
        }

        y += 13;
    }

    pdf.setTextColor(0, 0, 0);

    if (datosPaciente.observaciones) {

        pdf.setFontSize(7);
        pdf.setTextColor(...COLOR_INK_TENUE);
        pdf.text("OBSERVACIONES", 20, y);
        y += 5;

        pdf.setFontSize(9);
        pdf.setTextColor(...COLOR_INK);
        const lineasObs = pdf.splitTextToSize(datosPaciente.observaciones, 170);
        pdf.text(lineasObs, 20, y);
        y += lineasObs.length * 4.4 + 6;
    }

    pdf.setTextColor(0, 0, 0);
    y += 3;


    // ==============================
    // MEDIDAS DE LA TARJETA
    // ==============================

    const cardX = 20;
    const cardAncho = 170;
    const padding = 6;

    const col1Ancho = 40;
    const col3Ancho = 28;
    const gapCol = 5;
    const col1X = cardX + padding;
    const col2X = col1X + col1Ancho + gapCol;
    const col2Ancho = cardAncho - padding * 2 - col1Ancho - col3Ancho - gapCol * 2;
    const col3X = col2X + col2Ancho + gapCol;

    const imgTam = 37;
    const qrTam = 22;

    const alturaHeaderCard = 9;
    const gapHeaderCuerpo = 5;
    const margenExterior = 8;

    // Constantes de ritmo vertical dentro de la columna 1 (imagen, pauta)
    const gapImgPauta = 5;
    const alturaPauta = 6.5;

    // Notas: ahora viven bajo la descripción (columna 2), aprovechando
    // su espacio en vez de alargar la tarjeta por la columna de la imagen
    const gapDescNotas = 4;
    const notaLineHeight = 3.4;
    const notaPaddingV = 3;

    // Interlineado de la descripción (columna 2)
    const descLineHeight = 4.8;


    // ==============================
    // EJERCICIOS
    // ==============================

    for (let indice = 0; indice < planPaciente.length; indice++) {

        const item = planPaciente[indice];

        // --- Precalcular altura de la descripción (si toca incluirla) ---
        let lineasDescripcion = [];
        if (item.incluirDescripcion && item.ejercicio.descripcion) {
            pdf.setFontSize(9);
            lineasDescripcion = pdf.splitTextToSize(item.ejercicio.descripcion, col2Ancho);
        }

        // --- Precalcular altura de las notas (si las hay), para que
        // no se salgan del borde de la tarjeta cuando son largas. Se
        // ajustan al ancho de la columna 2, donde ahora se muestran. ---
        let lineasNotas = [];
        if (item.notas) {
            pdf.setFontSize(8);
            lineasNotas = pdf.splitTextToSize(item.notas, col2Ancho - 4);
        }

        const alturaCol1 = imgTam + gapImgPauta + alturaPauta;

        const alturaCol3 =
            item.ejercicio.youtube
            ? (5 + qrTam + 3 + 7)
            : 0;

        const alturaCol2 =
            lineasDescripcion.length * descLineHeight +
            (lineasNotas.length > 0
                ? gapDescNotas + lineasNotas.length * notaLineHeight + notaPaddingV
                : 0);

        const alturaColumnas = Math.max(alturaCol1, alturaCol2, alturaCol3);

        const alturaCard =
            padding + alturaHeaderCard + gapHeaderCuerpo +
            alturaColumnas + padding;

        if (y + alturaCard + margenExterior > 270) {
            pdf.addPage();
            y = 20;
        }


        // --- Fondo y borde de la tarjeta: fino, redondeado, sin sombra ---
        pdf.setFillColor(...COLOR_FONDO_CARD);
        pdf.setDrawColor(...COLOR_BORDE_CARD);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(cardX, y, cardAncho, alturaCard, 3, 3, "FD");

        const contentTop = y + padding;


        // --- Cabecera de la tarjeta: insignia + título ---
        const radioInsignia = 3.8;
        const cxInsignia = cardX + padding + radioInsignia;
        const cyInsignia = contentTop + radioInsignia - 0.5;

        pdf.setFillColor(...COLOR_MARCA);
        pdf.circle(cxInsignia, cyInsignia, radioInsignia, "F");

        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.text(String(indice + 1), cxInsignia, cyInsignia + 1.1, { align: "center" });

        pdf.setFontSize(13.5);
        pdf.setTextColor(...COLOR_INK);
        pdf.text(
            item.ejercicio.nombre,
            cxInsignia + radioInsignia + 4.5,
            contentTop + 5
        );
        pdf.setFont("helvetica", "normal");

        pdf.setTextColor(0, 0, 0);

        const bodyTop = contentTop + alturaHeaderCard + gapHeaderCuerpo;


       // --- Columna 1: imagen grande + cápsula de pauta ---

// Centrar la imagen dentro de la columna
const imagenX = col1X + (col1Ancho - imgTam) / 2;

try {
    const imagen = await cargarImagenPDF(`${BASE_URL}${item.ejercicio.imagen}`);
    pdf.addImage(imagen, "JPEG", imagenX, bodyTop, imgTam, imgTam);
} catch (error) {
    console.error("No se pudo cargar imagen", error);
}


// Cápsula de pauta
let pauta = `${item.series} series · `;
pauta += item.tipo === "segundos"
    ? `${item.cantidad} s`
    : `${item.cantidad} rep`;

const pautaY = bodyTop + imgTam + gapImgPauta;

pdf.setFontSize(8.5);
pdf.setFont("helvetica", "bold");

const pautaAnchoTexto = pdf.getTextWidth(pauta);
const pautaAnchoCapsula = Math.min(col1Ancho, pautaAnchoTexto + 7);

// Centrar la cápsula respecto a la imagen
const pautaX = imagenX + (imgTam - pautaAnchoCapsula) / 2;

pdf.setFillColor(...COLOR_PAUTA_BG);
pdf.roundedRect(
    pautaX,
    pautaY,
    pautaAnchoCapsula,
    alturaPauta,
    alturaPauta / 2,
    alturaPauta / 2,
    "F"
);

pdf.setTextColor(...COLOR_PAUTA_TEXT);
pdf.text(
    pauta,
    pautaX + pautaAnchoCapsula / 2,
    pautaY + alturaPauta / 2 + 1.1,
    { align: "center" }
);

pdf.setFont("helvetica", "normal");
pdf.setTextColor(0, 0, 0);


        // --- Columna 2: descripción, con interlineado cómodo de leer,
        // seguida de las notas (si las hay) justo debajo ---
        const alturaBloqueDescripcion =
            lineasDescripcion.length > 0
            ? 3.7 + lineasDescripcion.length * descLineHeight
            : 0;

        if (lineasDescripcion.length > 0) {
            pdf.setFontSize(9);
            pdf.setTextColor(...COLOR_INK);

            let yDesc = bodyTop + 3.7;
            for (const linea of lineasDescripcion) {
                pdf.text(linea, col2X, yDesc);
                yDesc += descLineHeight;
            }

            pdf.setTextColor(0, 0, 0);
        }


        // Notas: aviso clínico diferenciado (fondo suave + borde lateral
        // fino), aprovechando el espacio libre bajo la descripción
        if (lineasNotas.length > 0) {

            const notaY =
                bodyTop + alturaBloqueDescripcion +
                (lineasDescripcion.length > 0 ? gapDescNotas : 0);

            const notaAltura = lineasNotas.length * notaLineHeight + notaPaddingV;

            pdf.setFillColor(...COLOR_NOTA_BG);
            pdf.roundedRect(col2X, notaY, col2Ancho, notaAltura, 1.2, 1.2, "F");

            pdf.setDrawColor(...COLOR_ACENTO);
            pdf.setLineWidth(0.7);
            pdf.line(col2X + 0.6, notaY + 0.6, col2X + 0.6, notaY + notaAltura - 0.6);

            pdf.setFontSize(8);
            pdf.setTextColor(...COLOR_INK_SUAVE);
            pdf.text(lineasNotas, col2X + 2.6, notaY + notaPaddingV / 2 + 2.2);
            pdf.setTextColor(0, 0, 0);
        }


        // --- Columna 3: QR + botón de vídeo ---
if (item.ejercicio.youtube) {

    // Eje central de toda la columna
    const centroCol3 = col3X + col3Ancho / 2;

    // Medidas
    const qrY = bodyTop + 5;
    const qrX = centroCol3 - qrTam / 2;

    const botonAncho = 24;
    const botonAlto = 7;
    const botonX = centroCol3 - botonAncho / 2;
    const botonY = qrY + qrTam + 3;

    // Título
    pdf.setFontSize(6.5);
    pdf.setTextColor(...COLOR_INK_TENUE);
    pdf.text(
        "VÍDEO DEL EJERCICIO",
        centroCol3,
        bodyTop,
        { align: "center" }
    );
    pdf.setTextColor(0, 0, 0);

    // Generar QR
    const qrContainer = document.createElement("div");

    new QRCode(qrContainer, {
        text: item.ejercicio.youtube,
        width: 120,
        height: 120
    });

    let qrImage = null;

    try {
        qrImage = await esperarQRListo(qrContainer);
    } catch (error) {
        console.error(`No se pudo generar el QR para "${item.ejercicio.nombre}":`, error);
    }

    if (qrImage) {

        pdf.addImage(
            qrImage,
            "PNG",
            qrX,
            qrY,
            qrTam,
            qrTam
        );

    } else {

        pdf.setDrawColor(...COLOR_BORDE_CARD);
        pdf.setLineWidth(0.3);

        pdf.rect(
            qrX,
            qrY,
            qrTam,
            qrTam,
            "S"
        );

        pdf.setFontSize(6.5);
        pdf.setTextColor(...COLOR_INK_SUAVE);

        pdf.text(
            "QR no disponible",
            centroCol3,
            qrY + qrTam / 2,
            { align: "center" }
        );

        pdf.setTextColor(0, 0, 0);
    }

    // Botón
    pdf.setDrawColor(...COLOR_INK_TENUE);
    pdf.setLineWidth(0.3);

    pdf.roundedRect(
        botonX,
        botonY,
        botonAncho,
        botonAlto,
        3.5,
        3.5,
        "S"
    );

    pdf.setFontSize(7.5);
    pdf.setTextColor(...COLOR_MARCA_OSCURO);

    pdf.text(
        "Ver vídeo",
        centroCol3,
        botonY + botonAlto / 2 + 1.2,
        { align: "center" }
    );

    pdf.setTextColor(0, 0, 0);

    pdf.link(
        botonX,
        botonY,
        botonAncho,
        botonAlto,
        { url: item.ejercicio.youtube }
    );
}

        y += alturaCard + margenExterior;
    }


    // ==============================
    // PIE DE PÁGINA — discreto: marca, línea fina, número de página
    // ==============================

    const totalPaginas = pdf.internal.getNumberOfPages();

    for (let pagina = 1; pagina <= totalPaginas; pagina++) {

        pdf.setPage(pagina);

        pdf.setDrawColor(...COLOR_BORDE_SUAVE);
        pdf.setLineWidth(0.3);
        pdf.line(20, 283, 190, 283);

        pdf.setFontSize(7.5);
        pdf.setTextColor(...COLOR_INK_TENUE);
        pdf.text("RehabPlan", 20, 289);
        pdf.text(`Página ${pagina} de ${totalPaginas}`, 190, 289, { align: "right" });
        pdf.setTextColor(0, 0, 0);
    }


    pdf.save("plan-ejercicios.pdf");
}








// ==============================
// INICIO
// ==============================

cargarPlan();

cargarEjercicios();

configurarDatosPaciente();

configurarLogoClinica();

mostrarLogoGuardado();
