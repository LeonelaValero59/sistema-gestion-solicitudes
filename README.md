# Sistema de Gestión de Solicitudes y Tareas – Gestión+

## 1. Descripción del proyecto

Gestión+ es una aplicación web desarrollada para facilitar el registro, seguimiento y administración de solicitudes y tareas dentro de una organización.

El sistema permite que los usuarios registren solicitudes, que los gestores puedan revisarlas y asignar tareas, y que los administradores controlen los usuarios y el funcionamiento general de la plataforma.

## 2. Objetivo general

Desarrollar una aplicación web que permita organizar y gestionar solicitudes y tareas mediante diferentes roles de usuario, facilitando el seguimiento de los procesos y la administración de la información.

## 3. Roles del sistema

- **Administrador:** administra usuarios, roles y configuraciones del sistema.
- **Gestor:** revisa solicitudes, asigna tareas y supervisa su cumplimiento.
- **Usuario:** registra solicitudes y consulta sus propias solicitudes y estados.
- **Visitante:** puede consultar la información pública de la plataforma.

## 4. Tecnologías utilizadas

- Python
- Django
- Django REST Framework
- JavaScript
- Vite
- HTML y CSS
- SQLite
- Docker y Docker Compose
- Git y GitHub

## 5. Metodología de desarrollo: Modelo V

El desarrollo del proyecto se organiza tomando como referencia el Modelo V, una metodología que relaciona las etapas de planificación y diseño con las actividades de verificación y validación.

### Etapas del Modelo V

1. **Levantamiento de requisitos:** identificación de las necesidades y funcionalidades del sistema.
2. **Análisis del sistema:** estudio de los requisitos y definición del funcionamiento de la aplicación.
3. **Diseño de software y arquitectura:** planificación de la estructura general y selección de las tecnologías.
4. **Diseño de módulos:** organización de las funcionalidades y componentes del sistema.
5. **Codificación:** implementación de los diseños mediante programación. Representa el punto de unión entre las fases de planificación y las fases de comprobación.

### Relación con las pruebas

Después de la codificación se realizan pruebas para comprobar que los componentes, módulos y funcionalidades cumplan con los requisitos establecidos.

Entre estas actividades se contemplan las pruebas de integración, las pruebas del sistema y la validación de las necesidades de los usuarios.

La representación gráfica de esta metodología se encuentra en la carpeta `documentacion/`.

## 6. Estructura del proyecto

El proyecto presenta la siguiente organización general:

- `backend/`: contiene el proyecto desarrollado con Django.
- `backend/usuarios/`: contiene la gestión de usuarios, roles y autenticación.
- `backend/solicitudes/`: contiene los modelos y funcionalidades relacionadas con solicitudes y tareas.
- `frontend/`: contiene la interfaz web desarrollada con Vite, JavaScript, HTML y CSS.
- `documentacion/`: contiene los recursos documentales del proyecto, incluida la infografía del Modelo V.
- `Dockerfile`: define la construcción del entorno del backend.
- `docker-compose.yml`: configura la ejecución de los servicios mediante Docker.
- `.gitignore`: indica los archivos que no deben incluirse en el repositorio.
- `README.md`: contiene la documentación general del proyecto.

### Infografía del Modelo V

La infografía elaborada para representar las etapas del Modelo V se encuentra disponible en:

`documentacion/infografia_modelo_v.png`

## 7. Avances realizados

Hasta el momento se han desarrollado y comprobado las siguientes funcionalidades:

- Configuración inicial del entorno de desarrollo.
- Creación del proyecto backend con Django.
- Creación de las aplicaciones de usuarios y solicitudes.
- Implementación del modelo personalizado de usuarios con diferentes roles.
- Creación de los modelos de solicitudes y tareas.
- Configuración del panel de administración de Django.
- Implementación de autenticación mediante inicio y cierre de sesión.
- Configuración de rutas y servicios de la API.
- Integración inicial del frontend con el backend.
- Registro y consulta de solicitudes desde la interfaz.
- Comprobación del funcionamiento de una cuenta con rol Usuario.
- Creación de la infografía explicativa del Modelo V.
- Publicación de los avances y la documentación en GitHub.

## 8. Funcionalidades pendientes

Se continuará trabajando en:

- Completar y probar las funcionalidades correspondientes a los roles Administrador, Gestor y Visitante.
- Ampliar la gestión de solicitudes y tareas desde la interfaz.
- Mejorar el diseño visual y la experiencia de usuario.
- Completar las pruebas de funcionamiento.
- Ampliar la documentación técnica y las instrucciones de ejecución.

## 9. Repositorio del proyecto

El código fuente y los avances se encuentran disponibles en GitHub:

https://github.com/LeonelaValero59/sistema-gestion-solicitudes

## 10. Autoría

Proyecto académico desarrollado por **Leonela Valero** para la asignatura **Desarrollo de Aplicaciones I**.