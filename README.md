# Sistema de Gestión de Solicitudes y Tareas

## 1. Descripción del proyecto

El Sistema de Gestión de Solicitudes y Tareas es una aplicación web diseñada para facilitar el registro, seguimiento y administración de solicitudes dentro de una organización.

El sistema permitirá que los usuarios registren solicitudes, que los gestores puedan revisarlas y asignar tareas, y que los administradores controlen los usuarios y el funcionamiento general de la plataforma.

## 2. Objetivo general

Desarrollar una aplicación web que permita organizar y gestionar solicitudes y tareas mediante diferentes roles de usuario, facilitando el seguimiento de los procesos y la administración de la información.

## 3. Roles del sistema

- **Administrador:** administra usuarios, roles y configuraciones del sistema.
- **Gestor:** revisa solicitudes, asigna tareas y supervisa su cumplimiento.
- **Usuario:** registra solicitudes y consulta su estado.
- **Visitante:** puede consultar la información pública de la plataforma.

## 4. Tecnologías utilizadas

- Python
- Django
- Django REST Framework
- JavaScript
- Vite
- HTML y CSS
- Docker
- Git y GitHub

## 5. Metodología: Modelo V

El desarrollo del proyecto seguirá el Modelo V, una metodología que organiza el proceso de desarrollo mediante etapas relacionadas entre sí.

### Etapas del Modelo V

1. **Levantamiento de requisitos:** identificación de las necesidades y funcionalidades que tendrá el sistema.
2. **Análisis del sistema:** estudio de los requisitos y definición de cómo funcionará la aplicación.
3. **Diseño de software y arquitectura:** planificación de la estructura general y de las tecnologías que se utilizarán.
4. **Diseño de módulos:** organización de las funcionalidades y componentes del sistema.
5. **Codificación:** implementación de los diseños mediante programación. Esta etapa representa el punto de unión entre las fases de planificación y las fases de comprobación.

### Relación con las pruebas

Después de la codificación, se realizarán pruebas para verificar que cada parte del sistema cumpla con los requisitos establecidos, que los módulos funcionen correctamente y que la aplicación responda a las necesidades de sus usuarios.

## 6. Estructura inicial del proyecto

- `backend/`: contiene el proyecto desarrollado con Django.
- `frontend/`: contiene la interfaz web desarrollada con Vite.
- `Dockerfile`: define la construcción del entorno del backend.
- `docker-compose.yml`: configura la ejecución de los servicios mediante Docker.
- `.gitignore`: indica los archivos que no deben incluirse en el repositorio.
- `README.md`: contiene la documentación general del proyecto.

## 7. Estado del proyecto

Actualmente se encuentra preparada la estructura inicial del entorno de desarrollo. Se continuará con la implementación del backend, el frontend, el sistema de autenticación y la gestión de solicitudes y tareas.

## 8. Autoría

Proyecto académico desarrollado para la asignatura **Desarrollo de Aplicaciones I**.