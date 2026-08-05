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



    // Dejamos el borrador "a la espera" en una clave aparte, y es
    // ejercicios.js quien lo recoge al cargar (ver cargarPlan()).
    // Así el constructor sigue siendo el único sitio que decide cómo
    // se compone el borrador — aquí solo entregamos el encargo.
    //
    // Copia profunda: la plantilla original no debe quedar enlazada
    // al borrador que se va a editar ahora.
    localStorage.setItem(
        "borradorDesdePlantilla",
        JSON.stringify({
            nombre: plantilla.nombre,
            ejercicios: JSON.parse(
                JSON.stringify(plantilla.ejercicios)
            )
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
