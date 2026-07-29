const API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnT8x8db9O6Ks6LahaeaAspbX4pBKDaomrBgBnM3H3noAdCmfF-lf46_uSSd0R9sp9bQYfh3qted2OL5mAEMJBaQzqz_09Hw0sB2xJaDT_F-5mA4QXH1z85OwMK4IF3AOCOLsx1mPR5ZVFLLnsFBxTzbWyAwagT3-e5WU88f0axajbfNBrWU2i1eVY9sIyUJ3WaEyLhLxaJO4dbKomm-zKh8O5xmG_YpmM1oZPPTJfaRpkNM2LW45yP9USL13_emsB6Xxmwws2XutMiFzCXWoxOC4JYf4Q&lib=MlJGY15a9XmDGY_xRk5gVQfkSPZuzewKU";

async function cargarEjercicios() {

    try {

        const respuesta = await fetch(API_URL);

        const ejercicios = await respuesta.json();

        console.log(ejercicios);

    } catch(error) {

        console.error(error);

    }

}

cargarEjercicios();
