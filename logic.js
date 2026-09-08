/* ==========================================================================
   TBBT UNIVERSE — JS
   El <script> lleva "defer": el HTML ya está listo cuando esto corre.
   ========================================================================== */

/* Aviso emergente. Reemplaza a alert(), que congela la página. */
var avisoTimer;
function mostrarAviso(mensaje) {
    var aviso = document.getElementById('toast');
    aviso.textContent = mensaje;
    aviso.classList.add('is-visible');
    clearTimeout(avisoTimer); // Evita que dos avisos seguidos se corten.
    avisoTimer = setTimeout(function () { aviso.classList.remove('is-visible'); }, 3500);
}

/* 1. MODO LABORATORIO
   Solo pone o saca la clase del body: los colores, la fórmula del hero y la
   marca de agua los resuelve el CSS a partir de esa clase. */
var btnTema = document.getElementById('theme-toggle');
btnTema.addEventListener('click', function () {
    var activo = document.body.classList.toggle('lab-mode');
    btnTema.setAttribute('aria-pressed', activo); // Estado para el lector de pantalla.
    btnTema.querySelector('.btn-theme__icon').textContent = activo ? '☀️' : '🔬';
    btnTema.querySelector('.btn-theme__text').textContent = activo ? 'Modo normal' : 'Modo laboratorio';
});

/* 2. CARRUSEL */
var pista = document.getElementById('carousel-track');

// Ancho de una tarjeta más el espacio entre ellas. Se mide en el momento
// porque cambia según el tamaño de pantalla.
function paso() {
    return pista.querySelector('.card').offsetWidth + 32;
}
function mover(direccion) {
    pista.scrollLeft += direccion * paso(); // El desplazamiento suave lo hace el CSS.
}

document.getElementById('btn-next').addEventListener('click', function () { mover(1); });
document.getElementById('btn-prev').addEventListener('click', function () { mover(-1); });

// Flechas del teclado cuando el carrusel tiene el foco.
pista.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') mover(1);
    if (e.key === 'ArrowLeft') mover(-1);
});

/* 3. FICHAS DE PERSONAJE
   El estado vive en aria-expanded: le sirve al CSS para mostrar la ficha y
   al lector de pantalla para saber si está abierta. */
document.querySelectorAll('.card__toggle').forEach(function (boton) {
    boton.addEventListener('click', function () {
        var abierta = boton.getAttribute('aria-expanded') === 'true';
        boton.setAttribute('aria-expanded', !abierta);
        boton.querySelector('.card__toggle-text').textContent = abierta ? 'Ver ficha' : 'Ocultar ficha';
    });
});

/* 4. FRASES
   El texto está en data-quote del HTML: agregar una frase no toca este archivo. */
document.querySelectorAll('.btn-quote[data-quote]').forEach(function (boton) {
    boton.addEventListener('click', function () { mostrarAviso(boton.dataset.quote); });
});

/* 5. QUIZ */
var opciones = document.querySelectorAll('.btn-quiz');
var resultado = document.getElementById('quiz-result');
var reintentar = document.getElementById('quiz-retry');

opciones.forEach(function (boton) {
    boton.addEventListener('click', function () {
        var correcta = boton.dataset.correct === 'true'; // dataset devuelve texto.

        opciones.forEach(function (otro) {
            otro.disabled = true; // Sin esto se responde hasta acertar.
            // Si falló, se marca también cuál era la correcta.
            if (!correcta && otro.dataset.correct === 'true') otro.classList.add('is-correct');
        });

        // Color por clase y no por style: así respeta el modo laboratorio.
        boton.classList.add(correcta ? 'is-correct' : 'is-wrong');

        resultado.textContent = correcta
            ? '✔ Correcto. Mientras nadie observa el sistema, el gato está en superposición: vivo y muerto a la vez. El estado se define recién al abrir la caja.'
            : '✘ Incorrecto. La respuesta es "vivo y muerto al mismo tiempo": el gato permanece en superposición hasta que alguien abre la caja y lo observa.';

        reintentar.hidden = false;
    });
});

reintentar.addEventListener('click', function () {
    opciones.forEach(function (boton) {
        boton.disabled = false;
        boton.classList.remove('is-correct', 'is-wrong');
    });
    resultado.textContent = '';
    reintentar.hidden = true;
    opciones[0].focus(); // Devuelve el foco a quien navega con teclado.
});

/* 6. CÓDIGO SECRETO: escribir "emc2" */
var teclas = '';
document.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return; // Descarta Shift, Enter, F5, etc.
    teclas = (teclas + e.key.toLowerCase()).slice(-4); // Últimas 4 letras.
    if (teclas === 'emc2') mostrarAviso('Descubriste el conocimiento del universo.');
});
