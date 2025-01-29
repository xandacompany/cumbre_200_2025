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