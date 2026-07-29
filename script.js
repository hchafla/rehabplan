const BASE_URL = "/rehabplan";

let ejerciciosGlobal = [];

let planPaciente = [];



async function cargarEjercicios() {

    try {

        const respuesta = await fetch("ejercicios.json");


        if (!respuesta.ok) {
            throw new Error("No se pudo cargar ejercicios.json");
        }


        const ejercicios = await respuesta.json();


        ejerciciosGlobal = ejercicios;


        console.log("Ejercicios cargados:", ejercicios);


        crearFiltros(ejercicios);


        mostrarEjercicios(ejercicios);


    } catch (error) {

        console.error("Error cargando ejercicios:", error);

    }

}




function mostrarEjercicios(ejercicios) {


    const contenedor = document.getElementById("biblioteca");


    contenedor.innerHTML = "";



    ejercicios.forEach(ejercicio => {


        const tarjeta = document.createElement("div");


        tarjeta.className = "card";



        tarjeta.innerHTML = `

            <img src="${BASE_URL}${ejercicio.imagen}" 
                 alt="${ejercicio.nombre}">


            <h3>${ejercicio.nombre}</h3>


            <p>
                <strong>Región:</strong> ${ejercicio.region}
            </p>


            <p>
                <strong>Material:</strong> ${ejercicio.material}
            </p>


            <p>
                ${ejercicio.descripcion}
            </p>


            <a href="${ejercicio.youtube}" target="_blank">
                Ver vídeo
            </a>


            <button onclick="añadirEjercicio(${ejercicio.id})">
                Añadir al plan
            </button>

        `;


        contenedor.appendChild(tarjeta);


    });


}




function crearFiltros(ejercicios) {


    const regiones = [...new Set(
        ejercicios.map(e => e.region)
    )];


    const materiales = [...new Set(
        ejercicios.map(e => e.material)
    )];



    const selectRegion = document.getElementById("filtroRegion");


    const selectMaterial = document.getElementById("filtroMaterial");



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
        .addEventListener("input", aplicarFiltros);



    selectRegion
        .addEventListener("change", aplicarFiltros);



    selectMaterial
        .addEventListener("change", aplicarFiltros);


}





function aplicarFiltros() {


    const texto = document
        .getElementById("buscador")
        .value
        .toLowerCase();



    const region = document
        .getElementById("filtroRegion")
        .value;



    const material = document
        .getElementById("filtroMaterial")
        .value;




    const resultado = ejerciciosGlobal.filter(ejercicio => {


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



    mostrarEjercicios(resultado);


}





function añadirEjercicio(id) {


    const ejercicio = ejerciciosGlobal.find(
        e => e.id == id
    );


    if (!ejercicio) return;



    const existe = planPaciente.some(
        e => e.id == id
    );



    if (!existe) {

        planPaciente.push(ejercicio);

    }


    mostrarPlan();


}




function mostrarPlan() {


    const contenedor = document.getElementById("planPaciente");


    contenedor.innerHTML = "";



    planPaciente.forEach(ejercicio => {


        const elemento = document.createElement("div");


        elemento.className = "plan-item";



        elemento.innerHTML = `

            <span>
                ${ejercicio.nombre}
            </span>


            <button onclick="eliminarEjercicio(${ejercicio.id})">
                ❌
            </button>

        `;


        contenedor.appendChild(elemento);


    });


}




function eliminarEjercicio(id) {


    planPaciente = planPaciente.filter(
        e => e.id != id
    );


    mostrarPlan();

}





cargarEjercicios();
