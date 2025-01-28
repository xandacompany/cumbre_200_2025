// Script para la pantalla de precarga (dura 3 segundos)
window.addEventListener('load', function() {
    setTimeout(function() {
        // Añadir la transición de opacidad para suavizar la desaparición
        document.getElementById('preload-container').style.transition = 'opacity 1s ease-out';
        document.getElementById('preload-container').style.opacity = '0';
        
        // Después de que la animación termine, escondemos el contenedor de carga
        setTimeout(function() {
            document.getElementById('preload-container').style.display = 'none';
        }, 1000); // Tiempo de la transición (1 segundo)
    }, 3200); // 3 segundos de retraso
});



// Script para el carrusel 1 (panelistas)
const prevButton = document.querySelector('.carrusel-prev');
const nextButton = document.querySelector('.carrusel-next');
const carrusel = document.querySelector('.contenedor-carrusel-1');

// Función para mover el carrusel hacia la izquierda
prevButton.addEventListener('click', () => {
  carrusel.scrollBy({
    left: -300, // El valor negativo mueve el carrusel a la izquierda
    behavior: 'smooth', // Desplazamiento suave
  });
});

// Función para mover el carrusel hacia la derecha
nextButton.addEventListener('click', () => {
  carrusel.scrollBy({
    left: 300, // El valor positivo mueve el carrusel a la derecha
    behavior: 'smooth', // Desplazamiento suave
  });
});



// Script para la lista de videos
function cargarListaDeReproduccion() {
    const apiKey = 'AIzaSyAtDHe5TAlLzCdr-BvIHglbX8VKRWHBkDg';  // Reemplaza con tu clave de API
    const playlistId = 'PLcPasP33lrPUsJEwGIRCFPTGLtoekGFZr';  // Tu lista de reproducción

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const videos = data.items;
            const contenedorParte2 = document.querySelector('.contenedor-universal-parte-2');
            const contenedorParte1 = document.querySelector('.contenedor-universal-parte-1');

            // Mostrar el último video en contenedor-universal-parte-1
            const ultimoVideo = videos[0];  // El primer video de la lista es el más reciente
            mostrarVideo(ultimoVideo, contenedorParte1);

            // Cargar miniaturas de videos en contenedor-universal-parte-2
            videos.forEach(video => {
                const videoId = video.snippet.resourceId.videoId;
                const title = video.snippet.title;
                const thumbnail = video.snippet.thumbnails.medium.url;

                const videoElement = document.createElement('div');
                videoElement.classList.add('video-miniatura');
                videoElement.innerHTML = `
                    <img src="${thumbnail}" alt="${title}" data-video-id="${videoId}">
                    <p>${title}</p>
                `;

                // Agregar evento para cambiar el video al hacer clic
                videoElement.addEventListener('click', function () {
                    mostrarVideo(video, contenedorParte1);
                });

                contenedorParte2.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error al cargar los videos:', error));
}

// Función para mostrar el video en el contenedor correspondiente
function mostrarVideo(video, contenedor) {
    const videoId = video.snippet.resourceId.videoId;
    const iframe = document.createElement('iframe');
    iframe.classList.add('videogrande');  // Añadimos la clase 'videogrande' al iframe
    iframe.width = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameborder = '0';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowfullscreen = true;

    // Limpiar el contenedor y agregar el nuevo iframe
    contenedor.innerHTML = '';  // Limpia el contenedor antes de agregar el nuevo iframe
    contenedor.appendChild(iframe);
}

// Llamar a la función cuando la página cargue
document.addEventListener('DOMContentLoaded', cargarListaDeReproduccion);





window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});





window.addEventListener("scroll", function() {
    // Obtener todas las secciones y el menú
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll(".nav-ul-li");

    // Detectar el desplazamiento de la página
    let scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        // Obtenemos la posición de cada sección y su altura
        const sectionTop = section.offsetTop - 50; // Ajustamos un poco para que se active antes
        const sectionBottom = sectionTop + section.offsetHeight;

        // Verificar si la sección está en el viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Activar la opción correspondiente en el menú
            menuLinks[index].classList.add("active");
        } else {
            // Desactivar la opción si la sección no está visible
            menuLinks[index].classList.remove("active");
        }
    });
});




// Función para convertir la hora a un formato de 24 horas para comparación
function convertirAHora24(hora) {
    const regex = /(\d{1,2}):(\d{2})\s([ap]\.?\s[m]\.)/;
    const match = hora.match(regex);

    if (!match) {
        console.error("Formato de hora no válido:", hora);
        return NaN; // Si no coincide con el formato esperado, retornamos NaN para evitar errores
    }

    let [_, h, m, ampm] = match;
    h = parseInt(h);
    m = parseInt(m);

    if (ampm === 'p. m.' && h !== 12) {
        h += 12; // Convertir p. m. a formato de 24 horas
    } else if (ampm === 'a. m.' && h === 12) {
        h = 0; // 12 a. m. es medianoche
    }

    const ahora = new Date();
    return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), h, m, 0, 0).getTime(); // Retorna en formato de timestamp
}

// Función para actualizar el contenido en función de la hora actual
function actualizarEvento() {
    const ahora = new Date();
    const horaActual = ahora.getTime();
    
    const eventos = document.querySelectorAll('.tabla-1 tbody tr');
    let eventoActivo = false;
    
    eventos.forEach(evento => {
        // Verificamos que las celdas existan antes de acceder a ellas
        const horaInicioElemento = evento.querySelector('.hora-inicio');
        const horaFinElemento = evento.querySelector('.hora-fin');
        const descripcionElemento = evento.querySelector('td:nth-child(2)');
        const puntoElemento = evento.querySelector('td:first-child span');

        // Si algún elemento no existe, no hacemos nada
        if (!horaInicioElemento || !horaFinElemento || !descripcionElemento || !puntoElemento) {
            return;
        }

        const horaInicioTexto = horaInicioElemento.textContent.trim();
        const horaFinTexto = horaFinElemento.textContent.trim();
        const descripcion = descripcionElemento.textContent.trim();

        // Convertir las horas de inicio y fin a formato 24 horas
        const horaInicio = convertirAHora24(horaInicioTexto);
        const horaFin = convertirAHora24(horaFinTexto);
        
        // Verificar si la hora actual está dentro del rango de este evento
        if (horaActual >= horaInicio && horaActual <= horaFin) {
            // Actualizamos el párrafo con la descripción y la hora
            document.getElementById('id-hora-evento').textContent = `${horaInicioTexto}`;
            document.getElementById('id-descripcion-evento').textContent = descripcion;
            
            // Cambiar la clase del punto
            puntoElemento.classList.remove('evento-no-activo');
            puntoElemento.classList.add('evento-si-activo');
            
            eventoActivo = true;
        } else {
            // Si el evento ha terminado, revertir el cambio de clase
            puntoElemento.classList.remove('evento-si-activo');
            puntoElemento.classList.add('evento-no-activo');
        }
    });

    // Si no hay evento activo, mostramos la palabra "Hora"
    if (!eventoActivo) {
        document.getElementById('id-hora-evento').textContent = 'Hora';
        document.getElementById('id-descripcion-evento').textContent = 'Descripción';
    }
}

// Ejecutamos la función cada minuto para comprobar si la hora actual cambia
setInterval(actualizarEvento, 60000);

// Ejecutamos la función inmediatamente al cargar la página
actualizarEvento();