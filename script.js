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


        <p>
            <strong>Región:</strong>
            ${ejercicio.region}
        </p>


        <p>
            <strong>Material:</strong>
            ${ejercicio.material}
        </p>


        <p>
            ${ejercicio.descripcion}
        </p>


        <a 
        href="${ejercicio.youtube}"
        target="_blank">

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



    planPaciente.forEach(item => {



        const bloque =
            document.createElement(
                "div"
            );



        bloque.className =
            "plan-item";



        bloque.innerHTML = `


        <h3>
            ${item.ejercicio.nombre}
        </h3>



        <label>

            Series:

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

            Tipo:

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
                ? "Segundos:"
                : "Repeticiones:"
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





        <label>

            Notas:


            <textarea
            onchange="
            actualizarCampo(
                ${item.id},
                'notas',
                this.value
            )">${item.notas}</textarea>


        </label>





        <button 
        onclick="eliminarEjercicio(${item.id})">

            Eliminar

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







    for (const item of planPaciente) {



        if(y > 250){

            pdf.addPage();

            y = 20;

        }




        pdf.setFontSize(15);



        pdf.text(
            item.ejercicio.nombre,
            20,
            y
        );

        y += 5;


try {


    const imagen = await cargarImagenPDF(
        `${BASE_URL}${item.ejercicio.imagen}`
    );


    pdf.addImage(
        imagen,
        "JPEG",
        20,
        y,
        50,
        50
    );


    y += 60;


} catch(error){


    console.error(
        "No se pudo cargar imagen",
        error
    );


}



        y += 8;




        pdf.setFontSize(12);



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
            y
        );



        y += 8;







        if(item.notas){


            pdf.text(
                `Notas: ${item.notas}`,
                20,
                y,
                {
                    maxWidth:170
                }
            );


            y += 10;


        }







        if(item.ejercicio.youtube){



            pdf.text(
                "Vídeo del ejercicio:",
                20,
                y
            );



            y += 5;





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




            await new Promise(
                resolve =>
                setTimeout(resolve,300)
            );




            const qrImage =
                qrContainer
                .querySelector("img")
                .src;






            pdf.addImage(
                qrImage,
                "PNG",
                20,
                y,
                35,
                35
            );






            pdf.textWithLink(
                "🔗 Ver vídeo explicativo",
                65,
                y + 18,
                {
                    url:item.ejercicio.youtube
                }
            );



            y += 45;



        }




        y += 10;


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
