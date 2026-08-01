<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Ejercicios · RehabPlan</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="styles.css">

</head>


<body>


<a class="volver" href="index.html">← RehabPlan</a>

<h1>Ejercicios</h1>

<p class="subtitulo">Diseña planes de ejercicios personalizados y compártelos con tus pacientes.</p>


<div class="barra-pacientes">

    <label for="selectorPaciente">Paciente</label>

    <select id="selectorPaciente" onchange="cambiarPaciente(this.value)"></select>

    <button class="eliminar-paciente" onclick="eliminarPacienteActivo()">
        Eliminar este paciente
    </button>

</div>



<h2>Datos del paciente</h2>


<div class="datos-paciente">


    <label>
        Nombre

        <input 
            type="text"
            id="nombrePaciente"
            placeholder="Nombre del paciente"
        >

    </label>



    <label>
        Fecha

        <input 
            type="date"
            id="fechaPlan"
        >

    </label>



    <label>
        Observaciones generales

        <textarea 
            id="observacionesPaciente"
            placeholder="Observaciones del plan..."
        ></textarea>

    </label>


</div>




<!-- Pestañas: solo visibles en móvil (ver media query en styles.css) -->
<div class="tabs-movil">

    <button 
    type="button"
    class="tab activa"
    id="tabBiblioteca"
    onclick="mostrarPestanaMovil('biblioteca')">

        Biblioteca

    </button>


    <button 
    type="button"
    class="tab"
    id="tabPlan"
    onclick="mostrarPestanaMovil('plan')">

        Mi plan <span id="contadorPlanTab">(0)</span>

    </button>

</div>




<div class="layout pestana-biblioteca" id="layout">


    <section class="panel panel-biblioteca">

        <div class="panel-header">

            <h2>Biblioteca de ejercicios</h2>

            <div class="filtros">


                <label class="visualmente-oculto" for="buscador">Buscar ejercicio</label>

                <input 
                    type="text"
                    id="buscador"
                    placeholder="Buscar ejercicio..."
                >



                <label class="visualmente-oculto" for="filtroRegion">Filtrar por región</label>

                <select id="filtroRegion">

                    <option value="">
                        Todas las regiones
                    </option>

                </select>



                <label class="visualmente-oculto" for="filtroMaterial">Filtrar por material</label>

                <select id="filtroMaterial">

                    <option value="">
                        Todos los materiales
                    </option>

                </select>


            </div>

        </div>


        <div class="panel-scroll">

            <div id="biblioteca"></div>

        </div>

    </section>



    <section 
    class="panel panel-plan"
    ondragover="permitirSoltar(event)"
    ondragenter="resaltarZonaSoltar(event)"
    ondragleave="quitarResaltadoZonaSoltar(event)"
    ondrop="soltarEjercicio(event)">


        <div class="panel-header">

            <h2>Plan del paciente</h2>

            <div class="acciones-plan">

                <button onclick="guardarComoPlantilla()">
                    Guardar como plantilla
                </button>


                <button class="primario" onclick="generarPDF()">
                    Generar PDF
                </button>

            </div>

        </div>


        <div class="panel-scroll">

            <div id="planPaciente"></div>

        </div>

    </section>


</div>




<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>


<script src="ejercicios.js"></script>


</body>

</html>
