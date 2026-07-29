const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnT8x8db9O6Ks6LahaeaAspbX4pBKDaomrBgBnM3H3noAdCmfF-lf46_uSSd0R9sp9bQYfh3qted2OL5mAEMJBaQzqz_09Hw0sB2xJaDT_F-5mA4QXH1z85OwMK4IF3AOCOLsx1mPR5ZVFLLnsFBxTzbWyAwagT3-e5WU88f0axajbfNBrWU2i1eVY9sIyUJ3WaEyLhLxaJO4dbKomm-zKh8O5xmG_YpmM1oZPPTJfaRpkNM2LW45yP9USL13_emsB6Xxmwws2XutMiFzCXWoxOC4JYf4Q&lib=MlJGY15a9XmDGY_xRk5gVQfkSPZuzewKU";

async function cargarEjercicios() {

    const respuesta = await fetch(API_URL);

    const ejercicios = await respuesta.json();

    console.log(ejercicios);

    mostrarEjercicios(ejercicios);
}


function mostrarEjercicios(ejercicios) {

    const contenedor = document.getElementById("biblioteca");

    contenedor.innerHTML = "";

    ejercicios.forEach(ejercicio => {

        const tarjeta = document.createElement("div");

        tarjeta.className = "card";

        tarjeta.innerHTML = `
            <img src="https://hchafla.github.io/rehabplan${ejercicio.imagen}">
            <h3>${ejercicio.nombre}</h3>
            <p>${ejercicio.region}</p>
            <p>${ejercicio.objetivo}</p>
        `;

        contenedor.appendChild(tarjeta);

    });

}


cargarEjercicios();
