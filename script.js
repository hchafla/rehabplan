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



        const añadido = planPaciente.some(
            e => e.id == ejercicio.id
        );



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

                ${
                    añadido
                    ? "✓ Añadido"
                    : "Añadir al plan"
                }

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


        planPaciente.push({

            id: ejercicio.id,

            ejercicio: ejercicio,

            series: 3,

            tipo: "repeticiones",

            cantidad: 10,

            notas: ""

        });


    }


    mostrarPlan();

    mostrarEjercicios(ejerciciosGlobal);

}







function mostrarPlan() {


    const contenedor = document.getElementById("planPaciente");


    contenedor.innerHTML = "";



    planPaciente.forEach(item => {


        const elemento = document.createElement("div");


        elemento.className = "plan-item";



        elemento.innerHTML = `

            <h3>
                ${item.ejercicio.nombre}
            </h3>


            <label>
                Series:
                <input 
                    type="number"
                    value="${item.series}"
                    onchange="actualizarCampo(${item.id}, 'series', this.value)"
                >
            </label>


            <label>
                Tipo:
                <select 
                    onchange="actualizarCampo(${item.id}, 'tipo', this.value)"
                >

                    <option value="repeticiones"
                    ${item.tipo === "repeticiones" ? "selected" : ""}>
                        Repeticiones
                    </option>


                    <option value="segundos"
                    ${item.tipo === "segundos" ? "selected" : ""}>
                        Segundos
                    </option>

                </select>
            </label>



            <label>
                ${
                    item.tipo === "segundos"
                    ? "Segundos:"
                    : "Repeticiones:"
                }

                <input 
                    type="number"
                    value="${item.cantidad}"
                    onchange="actualizarCampo(${item.id}, 'cantidad', this.value)"
                >

            </label>



            <label>
                Notas:

                <textarea
                    onchange="actualizarCampo(${item.id}, 'notas', this.value)"
                >${item.notas}</textarea>

            </label>



            <button onclick="eliminarEjercicio(${item.id})">
                Eliminar
            </button>

        `;


        contenedor.appendChild(elemento);


    });


}







function actualizarCampo(id, campo, valor) {


    const ejercicio = planPaciente.find(
        e => e.id == id
    );


    if (!ejercicio) return;



    if (campo === "series" || campo === "cantidad") {

        valor = Number(valor);

    }



    ejercicio[campo] = valor;



    mostrarPlan();


}







function eliminarEjercicio(id) {


    planPaciente = planPaciente.filter(
        e => e.id != id
    );


    mostrarPlan();

    mostrarEjercicios(ejerciciosGlobal);

}







cargarEjercicios();
