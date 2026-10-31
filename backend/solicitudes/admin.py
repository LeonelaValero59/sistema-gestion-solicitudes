from django.contrib import admin
from .models import Solicitud, Tarea


@admin.register(Solicitud)
class SolicitudAdmin(admin.ModelAdmin):

    # Datos que aparecen en la lista de solicitudes
    list_display = (
        'titulo',
        'creador',
        'asignado_a',
        'estado',
        'fecha_creacion',
    )

    # Filtros para organizar las solicitudes
    list_filter = ('estado', 'fecha_creacion')

    # Búsqueda por título y descripción
    search_fields = ('titulo', 'descripcion')


@admin.register(Tarea)
class TareaAdmin(admin.ModelAdmin):

    # Datos que aparecen en la lista de tareas
    list_display = (
        'titulo',
        'solicitud',
        'asignado_a',
        'estado',
        'fecha_creacion',
    )

    # Filtros para organizar las tareas
    list_filter = ('estado', 'fecha_creacion')

    # Búsqueda por título y descripción
    search_fields = ('titulo', 'descripcion')