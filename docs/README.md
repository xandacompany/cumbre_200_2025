# CUMBRE 200

## Descripción

**CUMBRE 200** es un evento anual dedicado a premiar a las empresarias más influyentes de México. Nuestro objetivo es reconocer el esfuerzo, la innovación y el impacto de las mujeres líderes en el ámbito empresarial, destacando sus logros y contribuciones al desarrollo del país. Este sitio web tiene como propósito proporcionar a los usuarios toda la información necesaria sobre el evento, incluyendo fechas, ubicación, panelistas, videos de ediciones anteriores, itinerario y un formulario de registro.

## Características

El sitio web ofrece las siguientes funcionalidades para los usuarios:

- **Consulta de fechas y ubicación del evento**: Conoce cuándo y dónde se llevará a cabo la CUMBRE 200.
- **Información sobre las panelistas**: Detalles de las empresarias y líderes que participarán en el evento.
- **Videos de entregas anteriores**: Revive los momentos más destacados de ediciones previas del evento.
- **Itinerario**: Consulta el horario de actividades y eventos programados.
- **Formulario de registro**: Inscríbete al evento de forma sencilla a través del formulario en línea.

## Estructura del Proyecto

Este proyecto está organizado en varias carpetas y archivos que permiten un desarrollo modular, limpio y eficiente. A continuación, se explica la estructura principal del repositorio.

### Raíz del Proyecto

- **index.html**: Página principal que da la bienvenida al sitio e introduce la CUMBRE 200, destacando las principales características del evento.
- **sitemap.xml**: Mapa del sitio utilizado por los motores de búsqueda para mejorar el SEO y optimizar la indexación de las páginas.
- **license.txt**: Información sobre la licencia bajo la cual se distribuye este proyecto.
- **manifest.json**: Configuración del manifiesto de la aplicación web, que incluye iconos y otros datos de configuración de la PWA (Progressive Web App).
- **robots.txt**: Directivas para los motores de búsqueda sobre qué páginas indexar o no.
- **styles.css**: Hoja de estilo principal que define el diseño visual del sitio.
  
### Carpetas

#### **assets/**
Contiene todos los recursos estáticos del proyecto, como imágenes, fuentes, estilos adicionales y scripts.

- **images/**: Subcarpeta que contiene las imágenes utilizadas en el sitio web, como logotipos, banners y fotos de las ediciones anteriores.
- **styles/**: Contiene archivos CSS, incluido el archivo principal `main.css`, que es responsable del estilo visual del sitio.
- **scripts/**: Subcarpeta que alberga los archivos JavaScript. El archivo `main.js` es el script principal que contiene la lógica de funcionamiento interactivo del sitio.
- **fonts/**: Contiene las fuentes personalizadas usadas en el sitio, para garantizar una tipografía consistente y visualmente atractiva.
- **json/**: Almacena archivos JSON relacionados con los datos dinámicos del sitio (por ejemplo, información de panelistas o itinerarios).

#### **config/**
Contiene archivos de configuración del proyecto. Estos archivos son utilizados para personalizar y estructurar la carga de las páginas.

- **pages.py**: Script encargado de generar las rutas para las páginas y añadirlas automáticamente al archivo `sitemap.xml`. Facilita la actualización del mapa del sitio cuando se agregan o eliminan páginas.

#### **docs/**
Contiene la documentación del proyecto, explicando su funcionamiento, arquitectura y cualquier detalle relevante para los desarrolladores.

- **README.md**: Este archivo, que proporciona una descripción general del proyecto.
- **framework.md**: Explica cómo funciona el framework utilizado para desarrollar este sitio web, las dependencias y las tecnologías involucradas.

#### **pages/**
Esta carpeta contiene las páginas HTML que conforman el sitio web. Cualquier nueva página o contenido adicional debe ser colocado aquí.

- **404.html**: Página que se muestra cuando el usuario intenta acceder a una ruta que no existe en el sitio.
- **Otras páginas HTML**: Incluye las páginas de información del evento, el formulario de registro, las páginas de las panelistas, etc. Puedes agregar nuevas páginas dentro de esta carpeta.

## Arquitectura y Tecnologías Utilizadas

El sitio web de **CUMBRE 200** ha sido desarrollado utilizando tecnologías web estándar y modernas para asegurar un rendimiento óptimo y una experiencia de usuario fluida.

### Tecnologías principales:

- **HTML5**: Estructura del sitio web.
- **CSS3**: Para el diseño visual y la maquetación responsiva.
- **JavaScript**: Para mejorar la interactividad, con el archivo `main.js` proporcionando funcionalidades como la validación de formularios y la carga dinámica de contenido.
- **Python**: El script `pages.py` está escrito en Python para facilitar la carga de páginas y su integración con el sitemap.
- **PWA (Progressive Web App)**: El manifiesto y la estructura del sitio están diseñados para ser fácilmente instalables en dispositivos móviles, permitiendo al sitio funcionar sin conexión.

## Instalación y Configuración

Si deseas ejecutar este proyecto de manera local, sigue estos pasos:

### 1. Clonar el repositorio

Primero, clona el repositorio a tu máquina local:

```bash
git clone https://github.com/tu-usuario/cumbre-200.git
cd cumbre-200