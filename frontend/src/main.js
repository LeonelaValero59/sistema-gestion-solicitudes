
import './style.css'

const API_USUARIOS = 'http://127.0.0.1:8001/api/usuarios'
const API_SOLICITUDES = 'http://127.0.0.1:8001/api/solicitudes'

let usuarioActual = ''
let rolActual = ''

// Obtener la cookie de seguridad de Django
function obtenerCookie(nombre) {
  const cookies = document.cookie.split(';')

  for (const cookie of cookies) {
    const elemento = cookie.trim()

    if (elemento.startsWith(nombre + '=')) {
      return decodeURIComponent(elemento.substring(nombre.length + 1))
    }
  }

  return null
}

// Preparar el token de seguridad
async function prepararSeguridad() {
  const respuesta = await fetch(`${API_USUARIOS}/csrf/`, {
    credentials: 'include'
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo preparar la seguridad del sistema.')
  }

  const token = obtenerCookie('csrftoken')

  if (!token) {
    throw new Error('No se pudo obtener el token de seguridad.')
  }

  return token
}

// Mostrar el formulario de inicio de sesión
function mostrarLogin(mensaje = '') {
  document.querySelector('#app').innerHTML = `
    <main class="contenido">
      <section class="seccion">
        <div class="titulo-seccion">
          <h2>Gestión<span>+</span></h2>
          <p>Sistema de Gestión de Solicitudes y Tareas</p>
        </div>

        <form id="form-login">
          <h2>Iniciar sesión</h2>
          <p>Ingresa tus datos para acceder al sistema.</p>

          <label for="username">Nombre de usuario</label>
          <input type="text" id="username" required>

          <label for="password">Contraseña</label>
          <input type="password" id="password" required>

          <button type="submit" id="boton-login">Ingresar</button>
          <p id="mensaje-login" role="alert">${mensaje}</p>
        </form>
      </section>
    </main>
  `

  document.querySelector('#form-login').addEventListener(
    'submit',
    iniciarSesion
  )
}

// Iniciar sesión
async function iniciarSesion(evento) {
  evento.preventDefault()

  const username = document.querySelector('#username').value.trim()
  const password = document.querySelector('#password').value
  const boton = document.querySelector('#boton-login')
  const mensaje = document.querySelector('#mensaje-login')

  boton.disabled = true
  boton.textContent = 'Ingresando...'

  try {
    const token = await prepararSeguridad()

    const respuesta = await fetch(`${API_USUARIOS}/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token
      },
      body: JSON.stringify({ username, password })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.error || 'No se pudo iniciar sesión.')
    }

    usuarioActual = datos.usuario
    rolActual = datos.rol

    mostrarPanel()

  } catch (error) {
    mensaje.textContent = error.message
    boton.disabled = false
    boton.textContent = 'Ingresar'
  }
}

// Obtener las opciones del menú según el rol
function obtenerMenu(rol) {
  const menus = {
    administrador: [
      'Inicio',
      'Solicitudes',
      'Tareas',
      'Usuarios',
      'Mi perfil'
    ],
    gestor: [
      'Inicio',
      'Solicitudes',
      'Tareas',
      'Mi perfil'
    ],
    usuario: [
      'Inicio',
      'Nueva solicitud',
      'Mis solicitudes',
      'Mi perfil'
    ],
    visitante: [
      'Inicio',
      'Información'
    ]
  }

  return menus[rol] || menus.visitante
}

// Mostrar el panel principal
function mostrarPanel() {
  const roles = {
    administrador: 'Administrador',
    gestor: 'Gestor',
    usuario: 'Usuario',
    visitante: 'Visitante'
  }

  const nombreRol = roles[rolActual] || 'Visitante'

  const enlacesMenu = obtenerMenu(rolActual).map((opcion, indice) => `
    <a
      href="#"
      class="${indice === 0 ? 'activo' : ''}"
      data-opcion="${opcion}"
    >
      ${opcion}
    </a>
  `).join('')

  document.querySelector('#app').innerHTML = `
    <div class="contenedor">

      <aside class="menu-lateral">
        <h2>Gestión<span>+</span></h2>
        <p class="subtitulo">Sistema de solicitudes</p>

        <nav id="menu-principal">
          ${enlacesMenu}
        </nav>

        <div class="usuario-menu">
          <strong>${usuarioActual}</strong>
          <small>${nombreRol}</small>

          <button id="boton-logout" type="button">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main class="contenido" id="contenido-principal">

        <header class="encabezado">
          <div>
            <h1>Panel principal</h1>
            <p>Bienvenido al Sistema de Gestión de Solicitudes y Tareas.</p>
          </div>

          <span class="etiqueta">Sistema activo</span>
        </header>

        <section class="resumen">
          <article class="tarjeta">
            <p>Solicitudes</p>
            <h2 id="total-solicitudes">...</h2>
            <small>Registradas en el sistema</small>
          </article>

          <article class="tarjeta">
            <p>Tareas</p>
            <h2 id="total-tareas">...</h2>
            <small>Tareas registradas</small>
          </article>

          <article class="tarjeta">
            <p>Estado</p>
            <h2>Activo</h2>
            <small>${nombreRol}</small>
          </article>
        </section>

        <section class="seccion">
          <div class="titulo-seccion">
            <div>
              <h2>Bienvenido</h2>
              <p>Desde aquí podrás organizar las actividades del sistema.</p>
            </div>
          </div>

          <div class="bienvenida">
            <h3>Gestiona tus solicitudes fácilmente</h3>
            <p>
              Registra solicitudes, consulta su estado y organiza las tareas
              relacionadas con cada requerimiento.
            </p>
          </div>
        </section>

        <footer>
          Sistema de Gestión de Solicitudes y Tareas
        </footer>

      </main>
    </div>
  `

  // Activar las opciones del menú
  document.querySelectorAll('#menu-principal a').forEach(enlace => {
    enlace.addEventListener('click', evento => {
      evento.preventDefault()

      document.querySelectorAll('#menu-principal a').forEach(item => {
        item.classList.remove('activo')
      })

      enlace.classList.add('activo')

      const opcion = enlace.dataset.opcion

      if (opcion === 'Inicio') {
        mostrarInicio()
      } else if (opcion === 'Solicitudes' || opcion === 'Mis solicitudes') {
        mostrarSolicitudes()
      } else if (opcion === 'Tareas') {
        mostrarTareas()
      } else if (opcion === 'Nueva solicitud') {
        mostrarNuevaSolicitud()
      } else {
        mostrarMensaje(opcion)
      }
    })
  })

  document.querySelector('#boton-logout').addEventListener(
    'click',
    cerrarSesion
  )

  cargarResumen()
}

// Mostrar la página de inicio
function mostrarInicio() {
  const contenido = document.querySelector('#contenido-principal')

  contenido.innerHTML = `
    <header class="encabezado">
      <div>
        <h1>Panel principal</h1>
        <p>Bienvenido al Sistema de Gestión de Solicitudes y Tareas.</p>
      </div>
      <span class="etiqueta">Sistema activo</span>
    </header>

    <section class="resumen">
      <article class="tarjeta">
        <p>Solicitudes</p>
        <h2 id="total-solicitudes">...</h2>
        <small>Registradas en el sistema</small>
      </article>

      <article class="tarjeta">
        <p>Tareas</p>
        <h2 id="total-tareas">...</h2>
        <small>Tareas registradas</small>
      </article>

      <article class="tarjeta">
        <p>Estado</p>
        <h2>Activo</h2>
        <small>${rolActual}</small>
      </article>
    </section>

    <section class="seccion">
      <div class="titulo-seccion">
        <h2>Bienvenido</h2>
        <p>Desde aquí podrás organizar las actividades del sistema.</p>
      </div>

      <div class="bienvenida">
        <h3>Gestiona tus solicitudes fácilmente</h3>
        <p>
          Registra solicitudes, consulta su estado y organiza las tareas
          relacionadas con cada requerimiento.
        </p>
      </div>
    </section>

    <footer>Sistema de Gestión de Solicitudes y Tareas</footer>
  `

  cargarResumen()
}

// Consultar las solicitudes registradas
async function mostrarSolicitudes() {
  const contenido = document.querySelector('#contenido-principal')

  contenido.innerHTML = `
    <header class="encabezado">
      <div>
        <h1>Solicitudes</h1>
        <p>Consulta las solicitudes registradas en el sistema.</p>
      </div>
      <span class="etiqueta">Gestión de solicitudes</span>
    </header>

    <section class="seccion">
      <div class="titulo-seccion">
        <h2>Listado de solicitudes</h2>
        <p>Información de las solicitudes registradas.</p>
      </div>

      <p id="mensaje-solicitudes">Cargando solicitudes...</p>

      <div id="tabla-solicitudes"></div>
    </section>
  `

  try {
    const respuesta = await fetch(`${API_SOLICITUDES}/solicitudes/`, {
      credentials: 'include'
    })

    if (!respuesta.ok) {
      throw new Error('No se pudieron consultar las solicitudes.')
    }

    const solicitudes = await respuesta.json()
    const tabla = document.querySelector('#tabla-solicitudes')
    const mensaje = document.querySelector('#mensaje-solicitudes')

    mensaje.textContent = ''

    if (solicitudes.length === 0) {
      mensaje.textContent = 'Todavía no hay solicitudes registradas.'
      return
    }

    const filas = solicitudes.map(solicitud => `
      <tr>
        <td>${solicitud.titulo}</td>
        <td>${solicitud.creador_nombre || solicitud.creador}</td>
        <td>${solicitud.asignado_nombre || 'Sin asignar'}</td>
        <td>${solicitud.estado}</td>
        <td>${new Date(solicitud.fecha_creacion).toLocaleDateString('es-VE')}</td>
      </tr>
    `).join('')

    tabla.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Solicitante</th>
            <th>Gestor asignado</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `

  } catch (error) {
    document.querySelector('#mensaje-solicitudes').textContent =
      error.message
  }
}

// Mostrar el formulario para crear una solicitud
function mostrarNuevaSolicitud(mensaje = '') {
  const contenido = document.querySelector('#contenido-principal')

  contenido.innerHTML = `
    <header class="encabezado">
      <div>
        <h1>Nueva solicitud</h1>
        <p>Registra un nuevo requerimiento en el sistema.</p>
      </div>
      <span class="etiqueta">Registro de solicitudes</span>
    </header>

    <section class="seccion">
      <div class="titulo-seccion">
        <h2>Formulario de solicitud</h2>
        <p>Completa los siguientes datos para registrar tu solicitud.</p>
      </div>

      <form id="form-solicitud">
        <label for="titulo-solicitud">Título de la solicitud</label>
        <input
          type="text"
          id="titulo-solicitud"
          maxlength="150"
          placeholder="Ejemplo: Solicitud de mantenimiento"
          required
        >

        <label for="descripcion-solicitud">Descripción</label>
        <textarea
          id="descripcion-solicitud"
          rows="5"
          placeholder="Describe detalladamente tu requerimiento."
          required
        ></textarea>

        <button type="submit" id="boton-solicitud">
          Registrar solicitud
        </button>

        <p id="mensaje-nueva-solicitud" role="alert">${mensaje}</p>
      </form>
    </section>
  `

  document.querySelector('#form-solicitud').addEventListener(
    'submit',
    crearSolicitud
  )
}

// Registrar una nueva solicitud
async function crearSolicitud(evento) {
  evento.preventDefault()

  const titulo = document.querySelector('#titulo-solicitud').value.trim()
  const descripcion = document.querySelector('#descripcion-solicitud').value.trim()
  const boton = document.querySelector('#boton-solicitud')
  const mensaje = document.querySelector('#mensaje-nueva-solicitud')

  if (!titulo || !descripcion) {
    mensaje.textContent = 'Debes completar todos los campos.'
    return
  }

  boton.disabled = true
  boton.textContent = 'Registrando...'

  try {
    const token = await prepararSeguridad()

    const respuesta = await fetch(`${API_SOLICITUDES}/solicitudes/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token
      },
      body: JSON.stringify({
        titulo: titulo,
        descripcion: descripcion
      })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      const errores = Object.values(datos).flat().join(' ')
      throw new Error(errores || 'No se pudo registrar la solicitud.')
    }

    mostrarNuevaSolicitud('¡Solicitud registrada correctamente! Su estado inicial es Pendiente.')
    cargarResumen()

  } catch (error) {
    mensaje.textContent = error.message
    boton.disabled = false
    boton.textContent = 'Registrar solicitud'
  }
}

// Consultar las tareas registradas
async function mostrarTareas() {
  const contenido = document.querySelector('#contenido-principal')

  contenido.innerHTML = `
    <header class="encabezado">
      <div>
        <h1>Tareas</h1>
        <p>Consulta las tareas relacionadas con las solicitudes.</p>
      </div>
      <span class="etiqueta">Gestión de tareas</span>
    </header>

    <section class="seccion">
      <div class="titulo-seccion">
        <h2>Listado de tareas</h2>
        <p>Información de las tareas registradas.</p>
      </div>

      <p id="mensaje-tareas">Cargando tareas...</p>

      <div id="tabla-tareas"></div>
    </section>
  `

  try {
    const respuesta = await fetch(`${API_SOLICITUDES}/tareas/`, {
      credentials: 'include'
    })

    if (!respuesta.ok) {
      throw new Error('No se pudieron consultar las tareas.')
    }

    const tareas = await respuesta.json()
    const tabla = document.querySelector('#tabla-tareas')
    const mensaje = document.querySelector('#mensaje-tareas')

    mensaje.textContent = ''

    if (tareas.length === 0) {
      mensaje.textContent = 'Todavía no hay tareas registradas.'
      return
    }

    const filas = tareas.map(tarea => `
      <tr>
        <td>${tarea.titulo}</td>
        <td>${tarea.solicitud_titulo || tarea.solicitud}</td>
        <td>${tarea.asignado_nombre || 'Sin asignar'}</td>
        <td>${tarea.estado}</td>
        <td>${new Date(tarea.fecha_creacion).toLocaleDateString('es-VE')}</td>
      </tr>
    `).join('')

    tabla.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Solicitud relacionada</th>
            <th>Responsable</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `

  } catch (error) {
    document.querySelector('#mensaje-tareas').textContent =
      error.message
  }
}

// Mostrar un mensaje para las secciones pendientes
function mostrarMensaje(opcion) {
  const contenido = document.querySelector('#contenido-principal')

  contenido.innerHTML = `
    <header class="encabezado">
      <div>
        <h1>${opcion}</h1>
        <p>Sección del Sistema de Gestión de Solicitudes y Tareas.</p>
      </div>
    </header>

    <section class="seccion">
      <div class="bienvenida">
        <h3>${opcion}</h3>
        <p>Esta sección se desarrollará en el siguiente paso.</p>
      </div>
    </section>
  `
}

// Consultar los contadores del panel
async function cargarResumen() {
  try {
    const [respuestaSolicitudes, respuestaTareas] = await Promise.all([
      fetch(`${API_SOLICITUDES}/solicitudes/`, {
        credentials: 'include'
      }),
      fetch(`${API_SOLICITUDES}/tareas/`, {
        credentials: 'include'
      })
    ])

    if (!respuestaSolicitudes.ok || !respuestaTareas.ok) {
      throw new Error('No se pudieron obtener los datos del sistema.')
    }

    const solicitudes = await respuestaSolicitudes.json()
    const tareas = await respuestaTareas.json()

    const totalSolicitudes = document.querySelector('#total-solicitudes')
    const totalTareas = document.querySelector('#total-tareas')

    if (totalSolicitudes) {
      totalSolicitudes.textContent =
        solicitudes.length.toString().padStart(2, '0')
    }

    if (totalTareas) {
      totalTareas.textContent =
        tareas.length.toString().padStart(2, '0')
    }

  } catch (error) {
    console.error('Error al consultar los datos:', error)
  }
}

// Cerrar sesión
async function cerrarSesion() {
  try {
    const token = await prepararSeguridad()

    const respuesta = await fetch(`${API_USUARIOS}/logout/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': token
      }
    })

    if (!respuesta.ok) {
      throw new Error('No se pudo cerrar la sesión.')
    }

    usuarioActual = ''
    rolActual = ''

    mostrarLogin('Has cerrado sesión correctamente.')

  } catch (error) {
    alert(error.message)
  }
}

// Mostrar el inicio de sesión al abrir el sistema
mostrarLogin()
