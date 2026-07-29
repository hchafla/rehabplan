const BASE_URL = "/rehabplan";

async function cargarEjercicios() {

    try {

        const respuesta = await fetch("ejercicios.json");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar ejercicios.json");
        }

        const ejercicios = await respuesta.json();

        console.log("Ejercicios cargados:", ejercicios);

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
            <img src="${BASE_URL}${ejercicio.imagen}" alt="${ejercicio.nombre}">
            
            <h3>${ejercicio.nombre}</h3>

            <p><strong>Región:</strong> ${ejercicio.region}</p>

            <p><strong>Objetivo:</strong> ${ejercicio.objetivo}</p>

            <p><strong>Material:</strong> ${ejercicio.material}</p>

            <p>${ejercicio.descripcion}</p>

            <a href="${ejercicio.youtube}" target="_blank">
                Ver vídeo
            </a>
        `;

        contenedor.appendChild(tarjeta);

    });

}


cargarEjercicios();
