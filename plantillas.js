// ==============================
// ALMACENAMIENTO DE PLANTILLAS
// ==============================
// Mismo localStorage que usa ejercicios.js bajo la clave "plantillas".
// Si en el futuro esto se conecta a una API (PHP + MySQL), solo hace
// falta cambiar estas dos funciones por llamadas fetch().

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




// ==============================
// MOSTRAR PLANTILLAS GUARDADAS
// ==============================

function mostrarPlantillas() {


    const contenedor =
        document.getElementById(
            "plantillasGuardadas"
        );


    const plantillas =
        obtenerPlantillas();



    if (plantillas.length === 0) {


        contenedor.innerHTML = `

        <div class="estado-vacio">
            <div class="titulo">Aún no tienes plantillas guardadas</div>
            <p>
                Ve a <a href="ejercicios.html">Ejercicios</a>, monta un plan
                y usa el botón "Guardar como plantilla".
            </p>
        </div>

        `;


        return;

    }



    contenedor.innerHTML = "";



    plantillas.forEach(plantilla => {


        const tarjeta =
            document.createElement("div");


        tarjeta.className =
            "plantilla-card";



        const listaEjercicios =
            plantilla.ejercicios
            .map(item => `<li>${item.ejercicio.nombre}</li>`)
            .join("");



        const numeroEjercicios =
            plantilla.ejercicios.length;


        tarjeta.innerHTML = `

        <h3>${plantilla.nombre}</h3>

        <div class="plantilla-meta">
            ${numeroEjercicios} ejercicio${numeroEjercicios === 1 ? "" : "s"}
        </div>

        <ul class="plantilla-lista">
            ${listaEjercicios}
        </ul>

        <div class="plantilla-acciones">

            <button 
            class="primario"
            onclick="usarPlantilla(${plantilla.id})">

                Usar plantilla

            </button>


            <button 
            class="eliminar-plantilla"
            onclick="eliminarPlantilla(${plantilla.id})">

                Eliminar

            </button>

        </div>

        `;



        contenedor.appendChild(
            tarjeta
        );


    });


}




// ==============================
// USAR / ELIMINAR PLANTILLA
// ==============================

function usarPlantilla(id) {


    const plantillas =
        obtenerPlantillas();


    const plantilla =
        plantillas.find(
            p => p.id == id
        );


    if (!plantilla)
        return;



    // Si ya hay un plan en marcha, avisamos antes de sobrescribirlo:
    // usar una plantilla sustituye el plan actual por completo.
    const planGuardado =
        localStorage.getItem("planPaciente");


    const planActual =
        planGuardado ? JSON.parse(planGuardado) : [];


    if (planActual.length > 0) {


        const confirmar =
            confirm(
                `Ya tienes un plan en marcha con ${planActual.length} ejercicio(s). ` +
                `Si usas la plantilla "${plantilla.nombre}", se sustituirá por completo. ¿Continuar?`
            );


        if (!confirmar)
            return;

    }



    localStorage.setItem(
        "planPaciente",
        JSON.stringify(plantilla.ejercicios)
    );


    // Empezamos con los datos del paciente en blanco: la plantilla
    // trae los ejercicios, no el nombre/fecha de un paciente anterior.
    localStorage.setItem(
        "datosPaciente",
        JSON.stringify({
            nombre: "",
            fecha: "",
            observaciones: ""
        })
    );



    window.location.href = "ejercicios.html";


}




function eliminarPlantilla(id) {


    const confirmar =
        confirm(
            "¿Seguro que quieres eliminar esta plantilla? No se puede deshacer."
        );


    if (!confirmar)
        return;



    const plantillas =
        obtenerPlantillas().filter(
            p => p.id != id
        );


    guardarPlantillas(plantillas);


    mostrarPlantillas();


}




// ==============================
// INICIO
// ==============================

mostrarPlantillas();
