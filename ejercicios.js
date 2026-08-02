const BASE_URL = "/rehabplan";


let ejerciciosGlobal = [];

let planPaciente = [];


let datosPaciente = {

    nombre: "",

    fecha: "",

    observaciones: ""

};




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



    guardarPlan();


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



    guardarPlan();


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



    guardarPlan();


    mostrarPlan();


}







function eliminarEjercicio(id) {


    planPaciente =
        planPaciente.filter(
            e => e.id != id
        );



    guardarPlan();


    mostrarPlan();


    refrescarBiblioteca();


}








// ==============================
// NUEVO PLAN
// ==============================

// Vacía los ejercicios del paciente activo (por si el fisio se
// equivoca o cambia de idea), SIN tocar el nombre/fecha/observaciones
// ni afectar a otros pacientes guardados.
function vaciarPlan() {


    if (planPaciente.length === 0)
        return;



    const confirmar =
        confirm(
            "¿Seguro que quieres vaciar el plan? Se eliminarán todos los " +
            "ejercicios añadidos. Los datos del paciente no se tocan."
        );


    if (!confirmar)
        return;



    planPaciente = [];


    guardarPlan();


    mostrarPlan();


    refrescarBiblioteca();


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




function mostrarSelectorPacientes() {


    const selector =
        document.getElementById(
            "selectorPaciente"
        );


    if (!selector)
        return;



    const pacientes =
        obtenerPacientes()
        .slice()
        .sort(
            (a, b) => b.actualizadoEn - a.actualizadoEn
        );



    selector.innerHTML =
        `<option value="">+ Nuevo paciente</option>`;



    pacientes.forEach(paciente => {


        const etiqueta =
            (paciente.datosPaciente.nombre && paciente.datosPaciente.nombre.trim())
            || "Paciente sin nombre";


        const fecha =
            paciente.datosPaciente.fecha
            ? ` · ${paciente.datosPaciente.fecha}`
            : "";


        selector.innerHTML += `

        <option 
        value="${paciente.id}"
        ${paciente.id == pacienteActivoId ? "selected" : ""}>

            ${etiqueta}${fecha}

        </option>

        `;


    });



    if (!pacienteActivoId) {

        selector.value = "";

    }


}




function cambiarPaciente(id) {


    // Guardamos lo que hubiera antes de cambiar de paciente,
    // para no perder ningún cambio que estuviera a medias.
    guardarPlan();



    if (!id) {


        // "+ Nuevo paciente"
        pacienteActivoId = null;

        planPaciente = [];

        datosPaciente = {
            nombre: "",
            fecha: "",
            observaciones: ""
        };


        localStorage.removeItem(
            "pacienteActivoId"
        );


    } else {


        const paciente =
            obtenerPacientes().find(
                p => p.id == id
            );


        if (!paciente)
            return;


        pacienteActivoId =
            paciente.id;

        planPaciente =
            paciente.planPaciente;

        datosPaciente =
            paciente.datosPaciente;


        localStorage.setItem(
            "pacienteActivoId",
            String(pacienteActivoId)
        );


    }



    document.getElementById(
        "nombrePaciente"
    ).value = datosPaciente.nombre || "";


    document.getElementById(
        "fechaPlan"
    ).value = datosPaciente.fecha || "";


    document.getElementById(
        "observacionesPaciente"
    ).value = datosPaciente.observaciones || "";



    mostrarPlan();


    refrescarBiblioteca();


    mostrarSelectorPacientes();


}




function eliminarPacienteActivo() {


    if (!pacienteActivoId) {


        alert(
            "Este paciente todavía no se ha guardado, no hay nada que eliminar."
        );


        return;

    }



    const confirmar =
        confirm(
            "¿Seguro que quieres eliminar este paciente y su plan? No se puede deshacer."
        );


    if (!confirmar)
        return;



    const pacientes =
        obtenerPacientes().filter(
            p => p.id != pacienteActivoId
        );


    guardarPacientes(pacientes);



    localStorage.removeItem(
        "pacienteActivoId"
    );


    pacienteActivoId = null;

    planPaciente = [];

    datosPaciente = {
        nombre: "",
        fecha: "",
        observaciones: ""
    };



    document.getElementById(
        "nombrePaciente"
    ).value = "";


    document.getElementById(
        "fechaPlan"
    ).value = "";


    document.getElementById(
        "observacionesPaciente"
    ).value = "";



    mostrarPlan();


    refrescarBiblioteca();


    mostrarSelectorPacientes();


}








// ==============================
// DATOS PACIENTE
// ==============================

function configurarDatosPaciente() {


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





    nombre.value =
        datosPaciente.nombre || "";



    fecha.value =
        datosPaciente.fecha || "";



    observaciones.value =
        datosPaciente.observaciones || "";






    nombre.addEventListener(
        "input",
        () => {

            datosPaciente.nombre =
                nombre.value;

            guardarPlan();

        }
    );





    fecha.addEventListener(
        "input",
        () => {

            datosPaciente.fecha =
                fecha.value;

            guardarPlan();

        }
    );





    observaciones.addEventListener(
        "input",
        () => {

            datosPaciente.observaciones =
                observaciones.value;

            guardarPlan();

        }
    );


}









// ==============================
// LOCAL STORAGE — VARIOS PACIENTES
// ==============================

// pacienteActivoId identifica qué paciente se está editando ahora.
// null = "nuevo paciente", todavía sin guardar como registro propio.
let pacienteActivoId = null;


function obtenerPacientes() {

    const guardados =
        localStorage.getItem("planesPacientes");

    return guardados ? JSON.parse(guardados) : [];

}


function guardarPacientes(pacientes) {

    localStorage.setItem(
        "planesPacientes",
        JSON.stringify(pacientes)
    );

}


// Convierte el formato antiguo (un único "planPaciente"/"datosPaciente"
// sueltos) al nuevo formato de varios pacientes. Se ejecuta una sola
// vez: si ya existe "planesPacientes", no hace nada.
function migrarPlanAntiguo() {


    if (localStorage.getItem("planesPacientes"))
        return;



    const planAntiguo =
        localStorage.getItem("planPaciente");


    const datosAntiguos =
        localStorage.getItem("datosPaciente");


    if (!planAntiguo && !datosAntiguos)
        return;



    const idMigrado = Date.now();


    const pacientes = [{

        id: idMigrado,

        datosPaciente:
            datosAntiguos
            ? JSON.parse(datosAntiguos)
            : { nombre: "", fecha: "", observaciones: "" },

        planPaciente:
            planAntiguo
            ? JSON.parse(planAntiguo)
            : [],

        actualizadoEn: Date.now()

    }];


    guardarPacientes(pacientes);


    localStorage.setItem(
        "pacienteActivoId",
        String(idMigrado)
    );


}


function guardarPlan() {


    // Si todavía no hay paciente activo y no hay nada que merezca
    // la pena guardar (ni nombre, ni fecha, ni ejercicios), no
    // creamos un registro vacío en la lista de pacientes.
    const hayAlgoQueGuardar =
        planPaciente.length > 0 ||
        (datosPaciente.nombre && datosPaciente.nombre.trim()) ||
        datosPaciente.fecha ||
        (datosPaciente.observaciones && datosPaciente.observaciones.trim());


    if (!pacienteActivoId && !hayAlgoQueGuardar)
        return;



    if (!pacienteActivoId) {

        pacienteActivoId = Date.now();

        localStorage.setItem(
            "pacienteActivoId",
            String(pacienteActivoId)
        );

    }



    const pacientes =
        obtenerPacientes();


    const indice =
        pacientes.findIndex(
            p => p.id == pacienteActivoId
        );


    const registro = {

        id: pacienteActivoId,

        datosPaciente: datosPaciente,

        planPaciente: planPaciente,

        actualizadoEn: Date.now()

    };


    if (indice === -1) {

        pacientes.push(registro);

    } else {

        pacientes[indice] = registro;

    }



    guardarPacientes(pacientes);


    mostrarSelectorPacientes();


}


function cargarPlan() {


    migrarPlanAntiguo();



    const idGuardado =
        localStorage.getItem("pacienteActivoId");


    if (idGuardado) {


        const paciente =
            obtenerPacientes().find(
                p => p.id == idGuardado
            );


        if (paciente) {

            pacienteActivoId = paciente.id;

            planPaciente = paciente.planPaciente;

            datosPaciente = paciente.datosPaciente;

        }


    }



    mostrarSelectorPacientes();


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


        alert(
            "No hay ejercicios en el plan"
        );


        return;

    }




    const { jsPDF } =
        window.jspdf;



    const pdf =
        new jsPDF();




    let y = 20;




    pdf.setFontSize(18);


    pdf.text(
        "Plan de ejercicios",
        20,
        y
    );


    y += 15;




    pdf.setFontSize(12);



    pdf.text(
        `Paciente: ${datosPaciente.nombre || ""}`,
        20,
        y
    );


    y += 8;



    pdf.text(
        `Fecha: ${datosPaciente.fecha || ""}`,
        20,
        y
    );



    y += 10;





    if(datosPaciente.observaciones){


        pdf.text(
            "Observaciones:",
            20,
            y
        );


        y += 7;



        pdf.text(
            datosPaciente.observaciones,
            20,
            y,
            {
                maxWidth:170
            }
        );


        y += 15;


    }







    for (let indice = 0; indice < planPaciente.length; indice++) {


        const item = planPaciente[indice];


        // Si este ejercicio lleva la descripción activada, calculamos
        // de antemano cuántas líneas ocupará (con el ancho real que
        // va a usar en el PDF), para reservar el espacio justo.
        let lineasDescripcion = [];

        if (item.incluirDescripcion && item.ejercicio.descripcion) {

            pdf.setFontSize(9);

            lineasDescripcion =
                pdf.splitTextToSize(
                    item.ejercicio.descripcion,
                    170
                );

        }


        const alturaDescripcion =
            lineasDescripcion.length > 0
            ? (lineasDescripcion.length * 4) + 8
            : 0;


        // Altura real aproximada de una ficha compacta (sin notas
        // largas): cabecera ~14mm + imagen/QR ~40mm + texto ~13mm +
        // margen final, más la descripción si toca incluirla. Con
        // esta reserva entran 3 ejercicios por página en el caso
        // normal (menos si llevan descripción larga).
        const alturaBloque = 80 + alturaDescripcion;


        if(y + alturaBloque > 270){

            pdf.addPage();

            y = 20;

        }




        // Línea separadora entre ejercicios
        pdf.setDrawColor(200);

        pdf.setLineWidth(0.5);

        pdf.line(20, y, 190, y);

        y += 5;




        // Número de ejercicio
        pdf.setFontSize(9);

        pdf.setTextColor(120);

        pdf.text(
            `Ejercicio ${indice + 1}`,
            20,
            y
        );

        pdf.setTextColor(0);

        y += 4;




        pdf.setFontSize(13);



        pdf.text(
            item.ejercicio.nombre,
            20,
            y
        );

        y += 5;


        // Guardamos la altura de referencia: imagen y QR se pintan
        // a la misma altura (columna izquierda / columna derecha).
        const inicioImagenY = y;


try {


    const imagen = await cargarImagenPDF(
        `${BASE_URL}${item.ejercicio.imagen}`
    );


    pdf.addImage(
        imagen,
        "JPEG",
        20,
        inicioImagenY,
        38,
        38
    );


} catch(error){


    console.error(
        "No se pudo cargar imagen",
        error
    );


}



        // Columna izquierda: continúa el flujo de texto debajo de la imagen
        let yColumnaIzquierda = inicioImagenY + 38;

        yColumnaIzquierda += 4;




        pdf.setFontSize(11);



        let pauta =
            `${item.series} series - `;



        if(item.tipo === "segundos"){


            pauta +=
            `${item.cantidad} segundos`;


        } else {


            pauta +=
            `${item.cantidad} repeticiones`;


        }




        pdf.text(
            pauta,
            20,
            yColumnaIzquierda
        );



        yColumnaIzquierda += 5;







        if(item.notas){


            pdf.text(
                `Notas: ${item.notas}`,
                20,
                yColumnaIzquierda,
                {
                    maxWidth:100
                }
            );


            yColumnaIzquierda += 7;


        }







        // Columna derecha: QR y enlace, SIEMPRE a la misma altura
        // que la imagen (inicioImagenY), independiente de cuánto
        // texto haya en la columna izquierda.
        let finColumnaDerecha = inicioImagenY;


        if(item.ejercicio.youtube){



            pdf.setFontSize(9);

            pdf.text(
                "Vídeo del ejercicio:",
                135,
                inicioImagenY
            );

            pdf.setFontSize(11);



            const qrY = inicioImagenY + 4;



            const qrContainer =
                document.createElement(
                    "div"
                );



            new QRCode(
                qrContainer,
                {

                    text:item.ejercicio.youtube,

                    width:120,

                    height:120

                }
            );



            let qrImage = null;



            try {

                qrImage =
                    await esperarQRListo(qrContainer);

            } catch(error) {

                console.error(
                    `No se pudo generar el QR para "${item.ejercicio.nombre}":`,
                    error
                );

            }



            if(qrImage) {


                pdf.addImage(
                    qrImage,
                    "PNG",
                    155,
                    qrY,
                    30,
                    30
                );


                pdf.link(
                    150,
                    qrY + 32,
                    40,
                    7,
                    {
                        url:item.ejercicio.youtube
                    }
                );


                pdf.text(
                    "Ver vídeo",
                    155,
                    qrY + 37
                );


                finColumnaDerecha = qrY + 37 + 3;


            } else {


                // El QR falló: no bloqueamos el resto del PDF, dejamos
                // el enlace como texto para que el plan siga siendo útil.
                pdf.setFontSize(9);

                pdf.text(
                    "No se pudo generar el código QR.",
                    135,
                    qrY + 6
                );

                pdf.setFontSize(11);


                pdf.link(
                    135,
                    qrY + 9,
                    55,
                    7,
                    {
                        url:item.ejercicio.youtube
                    }
                );


                pdf.text(
                    "Ver vídeo (enlace)",
                    135,
                    qrY + 14
                );


                finColumnaDerecha = qrY + 17;


            }


        }




        // Descripción completa del ejercicio (solo si el fisio activó
        // el interruptor para este ejercicio en concreto). Va a ancho
        // completo, debajo de las dos columnas.
        let yTrasColumnas =
            Math.max(yColumnaIzquierda, finColumnaDerecha);


        if (lineasDescripcion.length > 0) {


            yTrasColumnas += 4;


            pdf.setFontSize(9);

            pdf.setTextColor(90);


            pdf.text(
                "Descripción:",
                20,
                yTrasColumnas
            );


            yTrasColumnas += 4;


            pdf.text(
                lineasDescripcion,
                20,
                yTrasColumnas
            );


            pdf.setTextColor(0);


            yTrasColumnas +=
                lineasDescripcion.length * 4;


        }



        // La siguiente ficha empieza debajo de lo más alto entre
        // la columna izquierda (texto), la derecha (QR + enlace) y
        // la descripción (si se incluyó), con un pequeño margen
        // antes del separador siguiente.
        y = yTrasColumnas + 6;


    }





    // ==============================
    // PIE DE PÁGINA
    // ==============================

    const totalPaginas =
        pdf.internal.getNumberOfPages();


    for (let pagina = 1; pagina <= totalPaginas; pagina++) {


        pdf.setPage(pagina);


        pdf.setDrawColor(200);

        pdf.setLineWidth(0.3);

        pdf.line(20, 283, 190, 283);


        pdf.setFontSize(9);

        pdf.setTextColor(120);

        pdf.text(
            "RehabPlan | Programa de ejercicios personalizado",
            20,
            290
        );

        pdf.text(
            `Página ${pagina}`,
            190,
            290,
            {
                align: "right"
            }
        );

        pdf.setTextColor(0);


    }




    pdf.save(
        "plan-ejercicios.pdf"
    );


}








// ==============================
// INICIO
// ==============================

cargarPlan();

cargarEjercicios();

configurarDatosPaciente();
