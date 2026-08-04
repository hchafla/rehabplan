
let datosPaciente = {

    titulo: "",

nombre: "",

fecha: "",
@@ -1207,6 +1209,7 @@ function cambiarPaciente(id) {
planPaciente = [];

datosPaciente = {
            titulo: "",
nombre: "",
fecha: "",
observaciones: ""
@@ -1252,28 +1255,13 @@ function cambiarPaciente(id) {


document.getElementById(
        "nombrePaciente"
    ).value = datosPaciente.nombre || "";


    document.getElementById(
        "fechaPlan"
    ).value = datosPaciente.fecha || "";
        "tituloPlan"
    ).value = datosPaciente.titulo || "";


document.getElementById(
        "observacionesPaciente"
    ).value = datosPaciente.observaciones || "";



    mostrarPlan();


    refrescarBiblioteca();


    mostrarSelectorPacientes();
        "nombrePaciente"
    ).value = datosPaciente.nombre || "";


}
@@ -1329,13 +1317,19 @@ function eliminarPacienteActivo() {
planPaciente = [];

datosPaciente = {
        titulo: "",
nombre: "",
fecha: "",
observaciones: ""
};



    document.getElementById(
        "tituloPlan"
    ).value = "";


document.getElementById(
"nombrePaciente"
).value = "";
@@ -1377,6 +1371,12 @@ function eliminarPacienteActivo() {
function configurarDatosPaciente() {


    const titulo =
        document.getElementById(
            "tituloPlan"
        );


const nombre =
document.getElementById(
"nombrePaciente"
@@ -1397,6 +1397,9 @@ function configurarDatosPaciente() {



    titulo.value =
        datosPaciente.titulo || "";


nombre.value =
datosPaciente.nombre || "";
@@ -1414,6 +1417,18 @@ function configurarDatosPaciente() {



    titulo.addEventListener(
        "input",
        () => {

            datosPaciente.titulo =
                titulo.value;

            guardarPlan();

        }
    );



nombre.addEventListener(
@@ -1680,6 +1695,293 @@ function cargarPlan() {



// ==============================
// LOGO DE LA CLÍNICA
// ==============================

// Tamaño máximo (en píxeles) al que se reduce el logo antes de
// guardarlo en local. Un logo no necesita más resolución que esta
// para verse nítido en la cabecera del PDF.
const LOGO_MAX_DIMENSION_PX = 400;


function escalarImagenParaLogo(archivo, maxDimension) {

    return new Promise((resolve, reject) => {


        const lector = new FileReader();


        lector.onload = () => {


            const img = new Image();


            img.onload = () => {


                let ancho = img.width;

                let alto = img.height;


                if (ancho > maxDimension || alto > maxDimension) {

                    if (ancho >= alto) {

                        alto = Math.round(alto * (maxDimension / ancho));

                        ancho = maxDimension;

                    } else {

                        ancho = Math.round(ancho * (maxDimension / alto));

                        alto = maxDimension;

                    }

                }



                const canvas =
                    document.createElement("canvas");

                canvas.width = ancho;

                canvas.height = alto;


                const ctx =
                    canvas.getContext("2d");

                ctx.drawImage(img, 0, 0, ancho, alto);


                resolve(
                    canvas.toDataURL("image/png")
                );


            };


            img.onerror = () =>
                reject(new Error("No se pudo leer la imagen"));


            img.src = lector.result;


        };


        lector.onerror = () =>
            reject(new Error("No se pudo leer el archivo"));


        lector.readAsDataURL(archivo);


    });

}


function mostrarLogoGuardado() {


    const logo =
        localStorage.getItem("logoClinica");


    const img =
        document.getElementById("previsualizacionLogo");

    const botonQuitar =
        document.getElementById("quitarLogo");


    if (!img)
        return;



    if (logo) {

        img.src = logo;

        img.style.display = "block";


        if (botonQuitar)
            botonQuitar.style.display = "inline-block";


    } else {

        img.removeAttribute("src");

        img.style.display = "none";


        if (botonQuitar)
            botonQuitar.style.display = "none";

    }


}


function configurarLogoClinica() {


    const input =
        document.getElementById("inputLogo");

    const botonQuitar =
        document.getElementById("quitarLogo");


    if (!input)
        return;



    input.addEventListener("change", async () => {


        const archivo = input.files[0];

        if (!archivo)
            return;


        try {

            const logoEscalado =
                await escalarImagenParaLogo(
                    archivo,
                    LOGO_MAX_DIMENSION_PX
                );


            localStorage.setItem(
                "logoClinica",
                logoEscalado
            );


            mostrarLogoGuardado();


        } catch (error) {

            console.error(
                "No se pudo procesar el logo:",
                error
            );

            alert(
                "No se pudo cargar esa imagen. Prueba con otro archivo."
            );

        }


        input.value = "";


    });



    if (botonQuitar) {

        botonQuitar.addEventListener("click", () => {


            const confirmar =
                confirm(
                    "¿Quitar el logo de la clínica? Los próximos PDF se generarán sin él."
                );


            if (!confirmar)
                return;


            localStorage.removeItem("logoClinica");


            mostrarLogoGuardado();


        });

    }


}


// Dimensiones reales (en píxeles) de una imagen ya cargada como
// dataURL — necesarias para escalarla en el PDF sin deformarla.
function obtenerDimensionesImagen(dataUrl) {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = () =>
            resolve({ ancho: img.width, alto: img.height });

        img.onerror = () =>
            reject(new Error("No se pudieron leer las dimensiones de la imagen"));

        img.src = dataUrl;

    });

}


// Convierte una fecha "YYYY-MM-DD" (formato del <input type="date">)
// en algo más legible para el PDF: "2 de agosto, 2026".
function formatearFechaBonita(fechaISO) {

    if (!fechaISO)
        return "";


    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];


    const partes = fechaISO.split("-");

    if (partes.length !== 3)
        return fechaISO;


    const [anio, mes, dia] = partes;

    const nombreMes = meses[parseInt(mes, 10) - 1] || mes;


    return `${parseInt(dia, 10)} de ${nombreMes}, ${anio}`;

}




async function cargarImagenPDF(url) {

return new Promise((resolve, reject) => {
@@ -1851,91 +2153,221 @@ async function generarPDF() {



    // Colores corporativos (los mismos tokens que usa la web)
    const COLOR_MARCA = [43, 99, 88];
    const COLOR_MARCA_OSCURO = [30, 74, 66];
    const COLOR_ACENTO = [185, 121, 15];
    const COLOR_INK = [28, 43, 39];
    const COLOR_INK_SUAVE = [91, 107, 101];



    let y = 20;

    // ==============================
    // CABECERA
    // ==============================

    const alturaBanda = 34;


    pdf.setFillColor(...COLOR_MARCA);

    pdf.setFontSize(18);
    pdf.rect(0, 0, 210, alturaBanda, "F");


    pdf.setTextColor(255, 255, 255);

    pdf.setFontSize(9);

pdf.text(
        "Plan de ejercicios",
        "PROGRAMA DE FISIOTERAPIA PERSONALIZADO",
20,
        y
        14
);


    y += 15;
    pdf.setFontSize(20);

    pdf.setFont("helvetica", "bold");


    const tituloPlan =
        (datosPaciente.titulo && datosPaciente.titulo.trim())
        || "Plan de ejercicios";

    pdf.setFontSize(12);

    pdf.text(tituloPlan, 20, 25);


    pdf.text(
        `Paciente: ${datosPaciente.nombre || ""}`,
        20,
        y
    );
    pdf.setFont("helvetica", "normal");


    y += 8;

    // Logo de la clínica (si el fisio ha guardado uno). Se ajusta
    // dentro de una caja de 30x20mm manteniendo su proporción, para
    // que nunca salga deformado ni descuadre la cabecera.
    const logoGuardado =
        localStorage.getItem("logoClinica");


    pdf.text(
        `Fecha: ${datosPaciente.fecha || ""}`,
        20,
        y
    );
    if (logoGuardado) {

        try {

            const cajaAncho = 30;

    y += 10;
            const cajaAlto = 20;

            const dimensiones =
                await obtenerDimensionesImagen(logoGuardado);


            let anchoLogo = cajaAncho;

            let altoLogo =
                (dimensiones.alto / dimensiones.ancho) * anchoLogo;

    if(datosPaciente.observaciones){

            if (altoLogo > cajaAlto) {

        pdf.text(
            "Observaciones:",
            20,
            y
        );
                altoLogo = cajaAlto;

                anchoLogo =
                    (dimensiones.ancho / dimensiones.alto) * altoLogo;

        y += 7;
            }


            const xLogo = 190 - anchoLogo;

            const yLogo = (alturaBanda - altoLogo) / 2;

        pdf.text(
            datosPaciente.observaciones,
            20,
            y,
            {
                maxWidth:170
            }
        );

            pdf.addImage(
                logoGuardado,
                "PNG",
                xLogo,
                yLogo,
                anchoLogo,
                altoLogo
            );

        y += 15;

        } catch (error) {

            console.error(
                "No se pudo añadir el logo al PDF:",
                error
            );

        }

}



    pdf.setTextColor(0, 0, 0);


    let y = alturaBanda + 12;




    // ==============================
    // PACIENTE / FECHA / OBSERVACIONES
    // ==============================

    const hayNombre =
        datosPaciente.nombre && datosPaciente.nombre.trim();

    const hayFecha =
        !!datosPaciente.fecha;


    if (hayNombre || hayFecha) {


        if (hayNombre) {

            pdf.setFontSize(8);

            pdf.setTextColor(...COLOR_INK_SUAVE);

            pdf.text("PACIENTE", 20, y);


            pdf.setFontSize(12);

            pdf.setTextColor(...COLOR_INK);

            pdf.text(datosPaciente.nombre.trim(), 20, y + 6);

        }


        if (hayFecha) {

            pdf.setFontSize(8);

            pdf.setTextColor(...COLOR_INK_SUAVE);

            pdf.text("FECHA DE EMISIÓN", 120, y);


            pdf.setFontSize(12);

            pdf.setTextColor(...COLOR_INK);

            pdf.text(formatearFechaBonita(datosPaciente.fecha), 120, y + 6);

        }


        y += 18;

    }



    pdf.setTextColor(0, 0, 0);


    if (datosPaciente.observaciones) {


        pdf.setFontSize(8);

        pdf.setTextColor(...COLOR_INK_SUAVE);

        pdf.text("OBSERVACIONES", 20, y);

        y += 5;


        pdf.setFontSize(10);

        pdf.setTextColor(...COLOR_INK);

        const lineasObs =
            pdf.splitTextToSize(datosPaciente.observaciones, 170);

        pdf.text(lineasObs, 20, y);

        y += lineasObs.length * 4.5 + 8;

    }


    pdf.setTextColor(0, 0, 0);




    // ==============================
    // EJERCICIOS
    // ==============================

for (let indice = 0; indice < planPaciente.length; indice++) {


@@ -1966,15 +2398,13 @@ async function generarPDF() {
: 0;


        // Altura real aproximada de una ficha compacta (sin notas
        // largas): cabecera ~14mm + imagen/QR ~40mm + texto ~13mm +
        // margen final, más la descripción si toca incluirla. Con
        // esta reserva entran 3 ejercicios por página en el caso
        // normal (menos si llevan descripción larga).
        const alturaBloque = 80 + alturaDescripcion;
        // Altura real aproximada de una ficha compacta (cabecera con
        // insignia ~15mm + imagen/QR ~40mm + texto ~13mm + margen
        // final), más la descripción si toca incluirla.
        const alturaBloque = 85 + alturaDescripcion;


        if(y + alturaBloque > 270){
        if (y + alturaBloque > 270) {

pdf.addPage();

@@ -1986,46 +2416,82 @@ async function generarPDF() {


// Línea separadora entre ejercicios
        pdf.setDrawColor(200);
        pdf.setDrawColor(222);

        pdf.setLineWidth(0.5);
        pdf.setLineWidth(0.4);

pdf.line(20, y, 190, y);

        y += 5;
        y += 9;




        // Número de ejercicio
        pdf.setFontSize(9);
        // Insignia numerada en color de marca, con el título y la
        // dosis en la misma fila.
        const radioInsignia = 4.2;

        pdf.setTextColor(120);
        const cxInsignia = 20 + radioInsignia;

        const cyInsignia = y - radioInsignia + 1.2;

        pdf.text(
            `Ejercicio ${indice + 1}`,
            20,
            y
        );

        pdf.setTextColor(0);
        pdf.setFillColor(...COLOR_MARCA);

        y += 4;
        pdf.circle(cxInsignia, cyInsignia, radioInsignia, "F");


        pdf.setFontSize(9);

        pdf.setTextColor(255, 255, 255);

        pdf.setFontSize(13);
        pdf.setFont("helvetica", "bold");

        pdf.text(
            String(indice + 1),
            cxInsignia,
            cyInsignia + 1.3,
            { align: "center" }
        );

        pdf.setFont("helvetica", "normal");


        pdf.setFontSize(13);

        pdf.setTextColor(...COLOR_INK);

pdf.text(
item.ejercicio.nombre,
            20,
            20 + radioInsignia * 2 + 4,
y
);

        y += 5;

        pdf.setFontSize(9);

        pdf.setTextColor(...COLOR_ACENTO);

        let pauta =
            `${item.series} series · `;

        if (item.tipo === "segundos") {

            pauta += `${item.cantidad} segundos`;

        } else {

            pauta += `${item.cantidad} repeticiones`;

        }

        pdf.text(pauta, 190, y, { align: "right" });


        pdf.setTextColor(0, 0, 0);


        y += 6;


// Guardamos la altura de referencia: imagen y QR se pintan
@@ -2072,70 +2538,30 @@ try {



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



        if (item.notas) {


            pdf.setFontSize(9);


        if(item.notas){

            pdf.setTextColor(...COLOR_INK_SUAVE);

pdf.text(
`Notas: ${item.notas}`,
20,
yColumnaIzquierda,
{
                    maxWidth:100
                    maxWidth: 100
}
);


            yColumnaIzquierda += 7;

            pdf.setTextColor(0, 0, 0);

        }

            yColumnaIzquierda += 7;


        }



@@ -2150,15 +2576,18 @@ try {



            pdf.setFontSize(9);
            pdf.setFontSize(8);

            pdf.setTextColor(...COLOR_INK_SUAVE);

pdf.text(
                "Vídeo del ejercicio:",
                "VÍDEO DEL EJERCICIO",
135,
inicioImagenY
);

            pdf.setFontSize(11);
            pdf.setTextColor(0, 0, 0);




@@ -2221,23 +2650,39 @@ try {
);


                pdf.link(
                    150,
                    qrY + 32,
                    40,
                    7,
                    {
                        url:item.ejercicio.youtube
                    }
                pdf.setFillColor(...COLOR_MARCA_OSCURO);

                pdf.triangle(
                    155, qrY + 34,
                    155, qrY + 37,
                    158, qrY + 35.5,
                    "F"
);


                pdf.setFontSize(9);

                pdf.setTextColor(...COLOR_MARCA_OSCURO);

pdf.text(
"Ver vídeo",
                    155,
                    161,
qrY + 37
);

                pdf.setTextColor(0, 0, 0);


                pdf.link(
                    155,
                    qrY + 32,
                    35,
                    7,
                    {
                        url:item.ejercicio.youtube
                    }
                );


finColumnaDerecha = qrY + 37 + 3;

@@ -2249,13 +2694,15 @@ try {
// el enlace como texto para que el plan siga siendo útil.
pdf.setFontSize(9);

                pdf.setTextColor(...COLOR_INK_SUAVE);

pdf.text(
"No se pudo generar el código QR.",
135,
qrY + 6
);

                pdf.setFontSize(11);
                pdf.setTextColor(...COLOR_MARCA_OSCURO);


pdf.link(
@@ -2276,6 +2723,9 @@ try {
);


                pdf.setTextColor(0, 0, 0);


finColumnaDerecha = qrY + 17;


@@ -2300,29 +2750,33 @@ try {
yTrasColumnas += 4;


            pdf.setFontSize(9);
            pdf.setFontSize(8);

            pdf.setTextColor(90);
            pdf.setTextColor(...COLOR_INK_SUAVE);


pdf.text(
                "Descripción:",
                "DESCRIPCIÓN DEL MOVIMIENTO",
20,
yTrasColumnas
);


            yTrasColumnas += 4;
            yTrasColumnas += 4.5;


            pdf.setFontSize(9);

            pdf.setTextColor(...COLOR_INK);

pdf.text(
lineasDescripcion,
20,
yTrasColumnas
);


            pdf.setTextColor(0);
            pdf.setTextColor(0, 0, 0);


yTrasColumnas +=
@@ -2337,15 +2791,14 @@ try {
// la columna izquierda (texto), la derecha (QR + enlace) y
// la descripción (si se incluyó), con un pequeño margen
// antes del separador siguiente.
        y = yTrasColumnas + 6;
        y = yTrasColumnas + 8;


}





// ==============================
// PIE DE PÁGINA
// ==============================
@@ -2360,33 +2813,33 @@ try {
pdf.setPage(pagina);


        pdf.setDrawColor(200);
        pdf.setDrawColor(222);

pdf.setLineWidth(0.3);

pdf.line(20, 283, 190, 283);


        pdf.setFontSize(9);
        pdf.setFontSize(8);

        pdf.setTextColor(120);
        pdf.setTextColor(...COLOR_INK_SUAVE);

pdf.text(
            "RehabPlan | Programa de ejercicios personalizado",
            "RehabPlan — Programa de Fisioterapia y Ejercicio",
20,
290
);

pdf.text(
            `Página ${pagina}`,
            `Página ${pagina} de ${totalPaginas}`,
190,
290,
{
align: "right"
}
);

        pdf.setTextColor(0);
        pdf.setTextColor(0, 0, 0);


}
@@ -2417,3 +2870,7 @@ cargarPlan();
cargarEjercicios();

configurarDatosPaciente();

configurarLogoClinica();

mostrarLogoGuardado();
