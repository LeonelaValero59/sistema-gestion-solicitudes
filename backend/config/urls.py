
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Panel de administración de Django
    path('admin/', admin.site.urls),

    # Rutas para iniciar y cerrar sesión
    path('api/usuarios/', include('usuarios.urls')),

    # Rutas de la API de solicitudes y tareas
    path('api/solicitudes/', include('solicitudes.urls')),
]
