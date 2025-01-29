//Función para abrir el menú del celular
function abrir_menu() {
    document.getElementById('menu_celular').style.display = 'flex';
}





//Función para cerrar el menú del celular
function cerrar_menu() {
    document.getElementById('menu_celular').style.display = 'none';
}

const menuItems = document.querySelectorAll('.nav-ul .nav-ul-li a');

const contenedorMenu = document.querySelector('.contenedor-menu-celular-main');

contenedorMenu.innerHTML = '';

menuItems.forEach(item => {
    // Crea el div contenedor de la opción
    const div = document.createElement('div');
    div.classList.add('menu-celular-opciones');
    
    const a = document.createElement('a');
    
    a.textContent = item.textContent;

    div.appendChild(a);
    
    contenedorMenu.appendChild(div);
});





// Función para manejar la visibilidad del menú en función del tamaño de la ventana
function ajustarMenu() {
    const menuCelular = document.getElementById('menu_celular');
    
    if (window.innerWidth > 800) {
        // Si la ventana es más grande que 800px, ocultamos el menú
        menuCelular.style.display = 'none';
    } else {
        // Si la ventana es menor o igual a 800px, dejamos el menú según el estado de la variable
        if (menuCelular.style.display === 'flex') {
            // Si el menú está visible, lo mantenemos visible
            menuCelular.style.display = 'flex';
        } else {
            // Si no está visible, lo dejamos oculto
            menuCelular.style.display = 'none';
        }
    }
}

ajustarMenu();

window.addEventListener('resize', ajustarMenu);





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