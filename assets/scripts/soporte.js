const menuItems = document.querySelectorAll('.nav-ul .nav-ul-li a');
const contenedorMenu = document.querySelector('.contenedor-menu-celular-main');

contenedorMenu.innerHTML = ''; // Limpia el contenedor antes de agregar los nuevos elementos

menuItems.forEach(item => {
    // Crea el div contenedor de la opción
    const div = document.createElement('div');
    div.classList.add('menu-celular-opciones');

    // Crea el enlace <a> que tendrá el mismo texto y href que el original
    const a = document.createElement('a');
    a.textContent = item.textContent;  // Establece el texto del enlace
    a.href = item.href;  // Asigna el mismo href que el enlace original

    // Añade un evento para cerrar el menú cuando se haga clic en el enlace
    a.addEventListener('click', () => {
        cerrar_menu(); // Cierra el menú
    });

    // Añade el enlace <a> al div
    div.appendChild(a);

    // Añade el div al contenedor
    contenedorMenu.appendChild(div);
});

// Función para abrir el menú del celular
function abrir_menu() {
    document.getElementById('menu_celular').style.display = 'flex';
}

// Función para cerrar el menú del celular
function cerrar_menu() {
    document.getElementById('menu_celular').style.display = 'none';
}

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





document.addEventListener("DOMContentLoaded", function () {
    // Ruta del archivo JSON
    const jsonUrl = '../assets/json/package.json';

    // Selecciona el contenedor donde se van a agregar las tarjetas
    const contenedorTarjetas = document.getElementById('contenedor-tarjetas-soporte');
    
    // Selecciona el input de búsqueda
    const inputBusqueda = document.querySelector('.input-4');

    let tarjetasData = [];

    // Función para cargar y procesar el JSON
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Guardar las tarjetas en una variable global
            tarjetasData = data.tarjetas;

            // Mostrar todas las tarjetas inicialmente
            mostrarTarjetas(tarjetasData);
        })
        .catch(error => {
            console.error('Error cargando el archivo JSON:', error);
        });

    // Función para mostrar las tarjetas
    function mostrarTarjetas(tarjetas) {
        // Limpiar el contenedor de tarjetas
        contenedorTarjetas.innerHTML = '';

        // Recorrer las tarjetas y agregar cada una al contenedor
        tarjetas.forEach(tarjeta => {
            // Crear el contenedor de la tarjeta (ahora es un <a> con href)
            const tarjetaDiv = document.createElement('a');
            tarjetaDiv.classList.add('tarjeta-3');
            
            // Establecer el href de la tarjeta
            if (tarjeta.Enlace && tarjeta.Enlace.href) {
                tarjetaDiv.href = tarjeta.Enlace.href;
            }

            // Crear el título de la tarjeta
            const titulo = document.createElement('p');
            titulo.classList.add(tarjeta.Titulo.clase);
            titulo.textContent = tarjeta.Titulo.texto;

            // Crear la descripción de la tarjeta
            const descripcion = document.createElement('p');
            descripcion.classList.add(tarjeta.Descripcion.clase);
            descripcion.textContent = tarjeta.Descripcion.texto;

            // Agregar el título y la descripción a la tarjeta
            tarjetaDiv.appendChild(titulo);
            tarjetaDiv.appendChild(descripcion);

            // Finalmente, agregar la tarjeta al contenedor
            contenedorTarjetas.appendChild(tarjetaDiv);
        });
    }

    // Función para filtrar las tarjetas
    function filtrarTarjetas(query) {
        // Filtrar las tarjetas por título o descripción que contengan el texto de búsqueda
        const tarjetasFiltradas = tarjetasData.filter(tarjeta => {
            const titulo = tarjeta.Titulo.texto.toLowerCase();
            const descripcion = tarjeta.Descripcion.texto.toLowerCase();
            return titulo.includes(query) || descripcion.includes(query);
        });

        // Mostrar solo las tarjetas filtradas
        mostrarTarjetas(tarjetasFiltradas);
    }

    // Evento que se ejecuta cada vez que el usuario escribe algo en el campo de búsqueda
    inputBusqueda.addEventListener('input', function () {
        const query = inputBusqueda.value.toLowerCase(); // Obtener el texto de búsqueda en minúsculas
        filtrarTarjetas(query); // Filtrar las tarjetas
    });
});