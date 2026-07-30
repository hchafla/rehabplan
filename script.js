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


        tarjeta.className = "card";



        const añadido =
            planPaciente.some(
                e => e.id == ejercicio.id
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


            <button
            class="btn-anadir${añadido ? " anadido" : ""}"
            aria-pressed="${añadido}"
            onclick="añadirEjercicio(${ejercicio.id})">

                ${
                    añadido
                    ? "✓ Añadido"
                    : "Añadir al plan"
                }

            </button>

        </div>


        `;



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





function aplicarFiltros() {


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





    const resultado =
        ejerciciosGlobal.filter(
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



    mostrarEjercicios(resultado);


}







// ==============================
// PLAN PACIENTE
// ==============================

function añadirEjercicio(id) {


    const ejercicio =
        ejerciciosGlobal.find(
            e => e.id == id
        );


    if (!ejercicio)
        return;



    const existe =
        planPaciente.some(
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



    guardarPlan();


    mostrarPlan();


    mostrarEjercicios(
        ejerciciosGlobal
    );


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



    planPaciente.forEach(item => {



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



        bloque.innerHTML = `


        <h3>
            ${item.ejercicio.nombre}
        </h3>


        <div class="dosis">
            ${textoDosis}
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


    mostrarEjercicios(
        ejerciciosGlobal
    );


}








// ==============================
// NUEVO PLAN
// ==============================

function nuevoPlan() {


    const confirmar =
        confirm(
            "¿Seguro que quieres borrar el plan actual?"
        );



    if (!confirmar)
        return;



    planPaciente = [];



    datosPaciente = {

        nombre: "",

        fecha: "",

        observaciones: ""

    };



    guardarPlan();



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


    mostrarEjercicios(
        ejerciciosGlobal
    );


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
// LOCAL STORAGE
// ==============================

function guardarPlan() {


    localStorage.setItem(
        "planPaciente",
        JSON.stringify(planPaciente)
    );



    localStorage.setItem(
        "datosPaciente",
        JSON.stringify(datosPaciente)
    );


}






function cargarPlan() {


    const planGuardado =
        localStorage.getItem(
            "planPaciente"
        );



    if (planGuardado) {


        planPaciente =
            JSON.parse(
                planGuardado
            );


    }





    const datosGuardados =
        localStorage.getItem(
            "datosPaciente"
        );



    if (datosGuardados) {


        datosPaciente =
            JSON.parse(
                datosGuardados
            );


    }


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


        // Altura real aproximada de una ficha compacta (sin notas
        // largas): cabecera ~14mm + imagen/QR ~40mm + texto ~13mm +
        // margen final. Con esta reserva entran 3 ejercicios por
        // página en el caso normal.
        const alturaBloque = 80;


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




        // La siguiente ficha empieza debajo de lo más alto entre
        // la columna izquierda (texto) y la derecha (QR + enlace),
        // con un pequeño margen antes del separador siguiente.
        y = Math.max(yColumnaIzquierda, finColumnaDerecha) + 6;


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
