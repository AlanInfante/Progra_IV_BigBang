/* ==========================================================================
   TBBT UNIVERSE — JS
   El <script> lleva "defer": el HTML ya está listo cuando esto corre.
   ========================================================================== */

// Modo estricto: convierte errores silenciosos (como usar una variable sin
// declararla) en errores visibles. Detecta bugs antes.
'use strict';

/* --------------------------------------------------------------------------
   const y let en lugar de var: const para lo que no se reasigna, let para lo
   que sí. Así queda explícito qué puede cambiar y qué no, y cada variable
   existe solo dentro del bloque donde se declara.
   -------------------------------------------------------------------------- */


/* ELEMENTOS COMPARTIDOS
   El aviso y la marca de agua se crean acá y no en el HTML: así no se
   repiten en cada página (principio DRY) y, en el caso de la marca de agua,
   Google no indexa 24 líneas de código falso como si fueran contenido. */
const aviso = document.createElement('div');
aviso.className = 'toast';
aviso.setAttribute('role', 'status');
aviso.setAttribute('aria-live', 'polite'); // Tiene que existir antes de recibir texto para que se anuncie.
document.body.appendChild(aviso);

const marcaDeAgua = document.createElement('div');
marcaDeAgua.className = 'code-watermark';
marcaDeAgua.setAttribute('aria-hidden', 'true');
marcaDeAgua.textContent = [
    'const sheldon = new Physicist({ spot: "SOFA" });',
    'if (knocks === 3) door.open("Penny");',
    'function bazinga() { return true; }',
    'E = m * c ** 2;',
    'while (!cat.observed) cat.state = "BOTH";',
    'export default apartment4A;'
].join('\n').concat('\n').repeat(4);
document.body.prepend(marcaDeAgua);

let avisoTimer;
function mostrarAviso(mensaje) {
    aviso.textContent = mensaje;
    aviso.classList.add('is-visible');
    clearTimeout(avisoTimer); // Evita que dos avisos seguidos se corten.
    avisoTimer = setTimeout(() => aviso.classList.remove('is-visible'), 3500);
}


/* 1. MODO LABORATORIO
   Solo pone o saca la clase del body: los colores, el fondo del hero y la
   marca de agua los resuelve el CSS. La elección se guarda para que
   sobreviva al cambio de página. */
const btnTema = document.getElementById('theme-toggle');

function pintarBoton(activo) {
    btnTema.setAttribute('aria-pressed', activo); // Estado para el lector de pantalla.
    btnTema.querySelector('.btn-theme__icon').textContent = activo ? '☀️' : '🔬';
    btnTema.querySelector('.btn-theme__text').textContent = activo ? 'Modo normal' : 'Modo laboratorio';
}

// El script del <body> ya aplicó la clase; acá solo se sincroniza el botón.
pintarBoton(document.body.classList.contains('lab-mode'));

btnTema.addEventListener('click', () => {
    const activo = document.body.classList.toggle('lab-mode');
    pintarBoton(activo);
    // En modo incógnito algunos navegadores bloquean localStorage. Si falla,
    // el modo funciona igual; solo no se recuerda.
    try { localStorage.setItem('tema', activo ? 'lab' : 'normal'); } catch (e) {}
});


/* 2. CARRUSEL
   Cada bloque se ejecuta solo si su página tiene el elemento. Sin el if,
   en las páginas sin carrusel el código tiraría un error y todo lo que sigue
   dejaría de funcionar. */
const pista = document.getElementById('carousel-track');

if (pista) {
    // Ancho de una tarjeta más el espacio entre tarjetas. El espacio se lee
    // del CSS en vez de escribir 32 a mano: si mañana cambiás el gap en el
    // CSS, el JS sigue funcionando sin tocarlo.
    const paso = () => pista.querySelector('.card').offsetWidth + parseFloat(getComputedStyle(pista).columnGap);
    const mover = (direccion) => { pista.scrollLeft += direccion * paso(); }; // El scroll suave lo hace el CSS.

    document.getElementById('btn-next').addEventListener('click', () => mover(1));
    document.getElementById('btn-prev').addEventListener('click', () => mover(-1));

    // Flechas del teclado cuando el carrusel tiene el foco.
    pista.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') mover(1);
        if (e.key === 'ArrowLeft') mover(-1);
    });
}


/* 3. FICHAS DE PERSONAJE
   El estado vive en aria-expanded: le sirve al CSS para mostrar la ficha y
   al lector de pantalla para saber si está abierta. */
document.querySelectorAll('.card__toggle').forEach((boton) => {
    boton.addEventListener('click', () => {
        const abierta = boton.getAttribute('aria-expanded') === 'true';
        boton.setAttribute('aria-expanded', !abierta);
        boton.querySelector('.card__toggle-text').textContent = abierta ? 'Ver ficha' : 'Ocultar ficha';
    });
});


/* 4. FRASES
   El texto está en data-quote del HTML: agregar una frase no toca este archivo. */
document.querySelectorAll('.btn-quote[data-quote]').forEach((boton) => {
    boton.addEventListener('click', () => mostrarAviso(boton.dataset.quote));
});


/* 5. QUIZ
   Las preguntas son datos, no HTML: para agregar una se suma un objeto al
   arreglo y nada más. Separación entre datos y presentación. */
const elPregunta = document.getElementById('quiz-question');

if (elPregunta) {
    const preguntas = [
        {
            texto: 'Según el experimento mental de Schrödinger, ¿en qué estado está el gato mientras nadie abre la caja?',
            opciones: ['Vivo', 'Muerto', 'Vivo y muerto al mismo tiempo'],
            correcta: 2,
            explicacion: 'Mientras no se observa, el sistema está en superposición: los dos estados a la vez.'
        },
        {
            texto: '¿Cuál es, según Sheldon, el mejor número?',
            opciones: ['42', '73', '7'],
            correcta: 1,
            explicacion: 'El 73 es el primo número 21; su espejo, el 37, es el primo 12; y 21 es 7 × 3.'
        },
        {
            texto: '¿En qué universidad trabajan Sheldon, Leonard, Raj y Howard?',
            opciones: ['MIT', 'Caltech', 'Princeton'],
            correcta: 1,
            explicacion: 'El Instituto de Tecnología de California, en Pasadena.'
        },
        {
            texto: '¿Qué partícula se confirmó en el CERN en 2012?',
            opciones: ['El bosón de Higgs', 'El neutrino', 'El positrón'],
            correcta: 0,
            explicacion: 'El bosón de Higgs explica por qué las partículas tienen masa. Llevaba casi 50 años predicho.'
        },
        {
            texto: 'En la versión de Sheldon de piedra, papel o tijera, ¿qué le gana a Spock?',
            opciones: ['La tijera', 'El lagarto', 'La piedra'],
            correcta: 1,
            explicacion: 'El lagarto envenena a Spock. Spock, a su vez, rompe la tijera y vaporiza la piedra.'
        },
        {
            texto: 'En E = mc², ¿qué representa la c?',
            opciones: ['La carga eléctrica', 'Una constante de calor', 'La velocidad de la luz'],
            correcta: 2,
            explicacion: 'La c es la velocidad de la luz en el vacío: unos 300.000 km por segundo.'
        }
    ];

    const elProgreso = document.getElementById('quiz-progress');
    const elOpciones = document.getElementById('quiz-options');
    const elResultado = document.getElementById('quiz-result');
    const btnSiguiente = document.getElementById('quiz-next');

    let actual = 0;          // Índice de la pregunta que se muestra.
    let puntaje = 0;
    let terminado = false;   // El estado se guarda en una variable, no se
                             // deduce del texto del botón: si mañana cambiás
                             // "Volver a jugar" por otra frase, nada se rompe.

    const mostrarPregunta = () => {
        const p = preguntas[actual];

        elProgreso.textContent = `Pregunta ${actual + 1} de ${preguntas.length}`;
        elPregunta.textContent = p.texto;
        elResultado.textContent = '';
        elOpciones.textContent = ''; // Vacía sin usar innerHTML.
        btnSiguiente.hidden = true;

        // Botones creados con textContent, nunca armando HTML con strings:
        // ningún texto puede convertirse en código ejecutable.
        p.opciones.forEach((texto, i) => {
            const boton = document.createElement('button');
            boton.type = 'button';
            boton.className = 'btn-quiz';
            boton.textContent = texto;
            boton.addEventListener('click', () => responder(i, boton));
            elOpciones.appendChild(boton);
        });
    };

    const responder = (elegida, boton) => {
        const p = preguntas[actual];
        const botones = elOpciones.querySelectorAll('.btn-quiz');
        const acerto = elegida === p.correcta;

        if (acerto) puntaje++;

        botones.forEach((b) => { b.disabled = true; }); // Una sola respuesta.
        botones[p.correcta].classList.add('is-correct'); // Siempre se marca la correcta.
        if (!acerto) boton.classList.add('is-wrong');

        elResultado.textContent = (acerto ? '✔ Correcto. ' : '✘ Incorrecto. ') + p.explicacion;

        const esLaUltima = actual === preguntas.length - 1;
        btnSiguiente.textContent = esLaUltima ? 'Ver resultado' : 'Siguiente pregunta';
        btnSiguiente.hidden = false;
        btnSiguiente.focus(); // Quien usa teclado no tiene que buscar el botón.
    };

    const mostrarFinal = () => {
        let mensaje;
        if (puntaje === preguntas.length) mensaje = 'Puntaje perfecto. Podés sentarte en el lugar de Sheldon.';
        else if (puntaje >= 4) mensaje = 'Muy bien. Leonard estaría orgulloso.';
        else if (puntaje >= 2) mensaje = 'Nada mal. Penny sacó lo mismo la primera vez.';
        else mensaje = 'Hasta Howard, con su maestría, lo hacía mejor. Probá de nuevo.';

        terminado = true;
        elProgreso.textContent = 'Resultado final';
        elPregunta.textContent = `${puntaje} de ${preguntas.length} respuestas correctas`;
        elOpciones.textContent = '';
        elResultado.textContent = mensaje;
        btnSiguiente.textContent = 'Volver a jugar';
    };

    btnSiguiente.addEventListener('click', () => {
        if (terminado) {
            actual = 0;
            puntaje = 0;
            terminado = false;
        } else if (actual < preguntas.length - 1) {
            actual++;
        } else {
            mostrarFinal();
            return;
        }
        mostrarPregunta();
        elPregunta.focus(); // Lleva al lector de pantalla a la pregunta nueva.
    });

    mostrarPregunta();
}


/* 6. GALERÍAS
   GLightbox se carga por CDN y puede fallar (sin internet, CDN caído). Si no
   está, los links siguen funcionando: abren la imagen sola. Mejora progresiva. */
if (window.GLightbox && document.querySelector('.glightbox')) {
    GLightbox({
        selector: '.glightbox',
        loop: true,          // Después de la última, vuelve a la primera.
        touchNavigation: true
    });
}


/* 7. CÓDIGO SECRETO: escribir "emc2" */
let teclas = '';
document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return; // Descarta Shift, Enter, F5, etc.
    teclas = (teclas + e.key.toLowerCase()).slice(-4); // Últimas 4 letras.
    if (teclas === 'emc2') mostrarAviso('Descubriste el conocimiento del universo.');
});

/* 7. TERMINAL
   Los comandos viven en un objeto: agregar uno es sumar una clave, sin tocar
   la lógica. Cada respuesta se inserta con textContent, así lo que escriba el
   visitante nunca puede ejecutarse como HTML. */
const termEntrada = document.getElementById('term-entrada');

if (termEntrada) {
    const termSalida = document.getElementById('term-salida');

    const COMANDOS = {
        ayuda: () => 'Comandos: whoami, proyecto, stack, ellos, sheldon, 73, bazinga, limpiar. Hay otros escondidos.',
        whoami: () => 'invitado. Sin privilegios, como Howard en el laboratorio de Sheldon.',
        proyecto: () => 'Sitio tributo a The Big Bang Theory. Trabajo práctico de Programación IV, UTN Haedo.',
        stack: () => 'HTML5, CSS3 y JavaScript sin frameworks. Una sola librería externa: GLightbox.',
        ellos: () => 'Siete personas, cuatro doctorados, un máster y un lugar innegociable en el sofá.',
        sheldon: () => 'Ese lugar está ocupado. Siempre lo estuvo.',
        73: () => 'El 73 es el primo número 21. Su espejo, el 37, es el primo 12. Y 21 = 7 x 3.',
        bazinga: () => 'Caíste en mi trampa clásica de humor.',
        limpiar: () => { termSalida.textContent = ''; return null; },
        clear: () => COMANDOS.limpiar(),
        // Escondidos: no aparecen en la ayuda, premian al que prueba.
        sudo: () => 'Con gran poder viene una gran factura de electricidad.',
        'rm -rf /': () => 'Buen intento. Este servidor es de solo lectura.',
        penny: () => 'Toc, toc, toc. Toc, toc, toc. Toc, toc, toc.',
        hola: () => 'Hola. Probá con "ayuda".',
        physics: () => 'La física no miente. Los físicos, a veces.',
        'e=mc2': () => 'Energía y masa son la misma cosa vista de dos maneras.'
    };

    const escribir = (texto, clase) => {
        const li = document.createElement('li');
        li.className = clase;
        li.textContent = texto;
        termSalida.appendChild(li);
        termSalida.scrollTop = termSalida.scrollHeight; // Siempre a la vista.
    };

    let ultimo = '';

    termEntrada.addEventListener('keydown', (e) => {
        // Flecha arriba: repite el último comando, como una terminal de verdad.
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            termEntrada.value = ultimo;
            return;
        }
        if (e.key !== 'Enter') return;

        const texto = termEntrada.value.trim().toLowerCase();
        termEntrada.value = '';
        if (!texto) return;

        ultimo = texto;
        escribir('invitado@4A:~$ ' + texto, 'terminal__eco');

        const respuesta = COMANDOS[texto];
        if (respuesta) {
            const salida = respuesta();
            if (salida) escribir(salida, 'terminal__ok');
        } else {
            escribir(`comando no encontrado: ${texto}. Probá "ayuda".`, 'terminal__error');
        }
    });

    escribir('Terminal del apartamento 4A. Escribí "ayuda" para empezar.', 'terminal__ok');
}


/* 8. PIEDRA, PAPEL, TIJERA, LAGARTO, SPOCK
   A cada jugada se le listan las dos que les gana, con el verbo de la regla.
   Con esa tabla alcanza: si la jugada rival está en la lista, ganaste. */
const juegoOpciones = document.getElementById('juego-opciones');

if (juegoOpciones) {
    const GANA = {
        piedra:  { tijera: 'parte', lagarto: 'aplasta' },
        papel:   { piedra: 'envuelve', spock: 'refuta' },
        tijera:  { papel: 'corta', lagarto: 'decapita' },
        lagarto: { spock: 'envenena', papel: 'se come' },
        spock:   { tijera: 'rompe', piedra: 'vaporiza' }
    };
    const JUGADAS = Object.keys(GANA);

    const elResultado = document.getElementById('juego-resultado');
    const elMarcador = document.getElementById('juego-marcador');
    let vos = 0, maquina = 0;

    juegoOpciones.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-juego');
        if (!btn) return;

        const mia = btn.dataset.jugada;
        const suya = JUGADAS[Math.floor(Math.random() * JUGADAS.length)];

        let texto;
        if (mia === suya) {
            texto = `Empate: los dos eligieron ${mia}.`;
        } else if (GANA[mia][suya]) {
            vos++;
            texto = `Ganaste: ${mia} ${GANA[mia][suya]} ${suya}.`;
        } else {
            maquina++;
            texto = `Perdiste: ${suya} ${GANA[suya][mia]} ${mia}.`;
        }

        elResultado.textContent = texto;
        elMarcador.textContent = `Vos ${vos} – ${maquina} La computadora`;
    });
}


/* 9. ENIGMA DE LÓGICA
   La solución está acá y no en el HTML: dejarla en el marcado sería regalarla
   a cualquiera que abra el inspector. Igual es un juego, no un secreto real. */
const enigmaCuerpo = document.getElementById('enigma-cuerpo');

if (enigmaCuerpo) {
    const SOLUCION = {
        Sheldon: ['tailandesa', 'agua'],
        Leonard: ['pizza', 'cerveza'],
        Penny: ['hamburguesa', 'gaseosa'],
        Howard: ['sushi', 'té'],
        Raj: ['empanadas', 'vino']
    };
    const COMIDAS = ['tailandesa', 'pizza', 'sushi', 'hamburguesa', 'empanadas'];
    const BEBIDAS = ['agua', 'cerveza', 'vino', 'té', 'gaseosa'];

    const armarSelect = (opciones, persona, tipo) => {
        const select = document.createElement('select');
        select.dataset.persona = persona;
        select.dataset.tipo = tipo;
        // Etiqueta accesible: sin esto el lector de pantalla lee "lista" sin decir de qué.
        select.setAttribute('aria-label', `${tipo} de ${persona}`);
        select.appendChild(new Option('—', ''));
        opciones.forEach((o) => select.appendChild(new Option(o, o)));
        return select;
    };

    Object.keys(SOLUCION).forEach((persona) => {
        const fila = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = persona;
        fila.appendChild(th);

        [[COMIDAS, 'comida'], [BEBIDAS, 'bebida']].forEach(([ops, tipo]) => {
            const td = document.createElement('td');
            td.appendChild(armarSelect(ops, persona, tipo));
            fila.appendChild(td);
        });

        enigmaCuerpo.appendChild(fila);
    });

    const selects = enigmaCuerpo.querySelectorAll('select');
    const elEnigma = document.getElementById('enigma-resultado');

    document.getElementById('enigma-comprobar').addEventListener('click', () => {
        let correctas = 0, vacias = 0;

        selects.forEach((s) => {
            const esperado = SOLUCION[s.dataset.persona][s.dataset.tipo === 'comida' ? 0 : 1];
            if (!s.value) vacias++;
            else if (s.value === esperado) correctas++;
        });

        if (vacias) {
            elEnigma.textContent = `Te faltan ${vacias} casilleros por completar.`;
            return;
        }
        // Se dice cuántas están bien, no cuáles: si marcara cada una, el
        // enigma se resolvería probando en vez de razonando.
        elEnigma.textContent = correctas === selects.length
            ? '¡Resuelto! Las diez casillas correctas. Amy estaría orgullosa.'
            : `${correctas} de ${selects.length} correctas. Volvé a mirar las pistas 3, 4 y 5.`;
    });

    document.getElementById('enigma-rendirse').addEventListener('click', () => {
        selects.forEach((s) => {
            s.value = SOLUCION[s.dataset.persona][s.dataset.tipo === 'comida' ? 0 : 1];
        });
        elEnigma.textContent = 'Esta era la única combinación posible con esas nueve pistas.';
    });
}


/* 10. FORMULARIO DE CONTACTO
   El sitio es estático: no hay servidor que reciba el formulario. Al enviar
   se arma un correo con los datos y se abre el programa de mail del visitante.
   Si más adelante querés recibirlos sin abrir el mail, hace falta un servicio
   externo (Formspree, Netlify Forms) o un backend propio. */
const formContacto = document.getElementById('form-contacto');

if (formContacto) {
    const DESTINO = 'tucorreo@ejemplo.com';   // <-- cambiá esto por tu dirección

    // Una de estas preguntas se sortea al cargar. No es seguridad real: frena
    // bots simples, no a alguien decidido.
    const PREGUNTAS = [
        { texto: '¿Cuántas veces golpea Sheldon la puerta antes de decir un nombre?', ok: ['3', 'tres'] },
        { texto: 'En E = mc², ¿qué letra representa la velocidad de la luz?', ok: ['c'] },
        { texto: '¿Qué le gana al papel: la tijera o la piedra?', ok: ['tijera', 'la tijera'] }
    ];
    const pregunta = PREGUNTAS[Math.floor(Math.random() * PREGUNTAS.length)];
    document.getElementById('f-humano-pista').textContent = pregunta.texto;

    const estado = document.getElementById('form-estado');

    const marcarError = (campo, mensaje) => {
        campo.setAttribute('aria-invalid', 'true');
        campo.classList.add('is-error');
        estado.textContent = mensaje;
        campo.focus();   // El foco va al primer campo con problema.
    };

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();   // Sin esto el navegador recargaría la página.

        const nombre = document.getElementById('f-nombre');
        const email = document.getElementById('f-email');
        const mensaje = document.getElementById('f-mensaje');
        const humano = document.getElementById('f-humano');
        const asunto = document.getElementById('f-asunto');

        [nombre, email, mensaje, humano].forEach((c) => {
            c.removeAttribute('aria-invalid');
            c.classList.remove('is-error');
        });

        if (!nombre.value.trim()) return marcarError(nombre, 'Nos falta tu nombre.');
        // Validación mínima: un @ con algo antes y un punto después. Comprobar
        // de verdad si un correo existe solo se puede mandándole un mensaje.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return marcarError(email, 'Ese correo no parece válido.');
        if (mensaje.value.trim().length < 10) return marcarError(mensaje, 'Contanos un poco más: al menos 10 caracteres.');
        if (!pregunta.ok.includes(humano.value.trim().toLowerCase())) {
            return marcarError(humano, 'Esa no es. Pista: la respuesta está en este sitio.');
        }

        // encodeURIComponent escapa los caracteres que romperían la dirección
        // (saltos de línea, &, acentos).
        const cuerpo = `Nombre: ${nombre.value}\nCorreo: ${email.value}\n\n${mensaje.value}`;
        window.location.href = `mailto:${DESTINO}?subject=${encodeURIComponent('[TBBT Universe] ' + asunto.value)}&body=${encodeURIComponent(cuerpo)}`;

        estado.textContent = 'Listo: se abrió tu programa de correo con el mensaje cargado.';
        formContacto.reset();
        document.getElementById('f-humano-pista').textContent = pregunta.texto;
    });
}
