
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


@ensure_csrf_cookie
def obtener_csrf(request):
    # Preparar el token de seguridad para el inicio de sesión
    return JsonResponse({
        'mensaje': 'Token de seguridad preparado.'
    })


@require_POST
def iniciar_sesion(request):
    # Recibir los datos enviados desde el frontend
    import json

    try:
        datos = json.loads(request.body)
        username = datos.get('username')
        password = datos.get('password')
    except (json.JSONDecodeError, AttributeError):
        return JsonResponse(
            {'error': 'Los datos enviados no son válidos.'},
            status=400
        )

    # Comprobar las credenciales del usuario
    usuario = authenticate(
        request,
        username=username,
        password=password
    )

    if usuario is None:
        return JsonResponse(
            {'error': 'Usuario o contraseña incorrectos.'},
            status=401
        )

    # Iniciar la sesión del usuario
    login(request, usuario)

    return JsonResponse({
        'mensaje': 'Inicio de sesión exitoso.',
        'usuario': usuario.username,
        'rol': usuario.rol
    })


@require_POST
def cerrar_sesion(request):
    # Finalizar la sesión del usuario
    logout(request)

    return JsonResponse({
        'mensaje': 'Sesión cerrada correctamente.'
    })
