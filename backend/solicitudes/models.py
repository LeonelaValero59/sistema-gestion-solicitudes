from django.db import models
from django.conf import settings


class Solicitud(models.Model):

    # Estados disponibles para una solicitud
    class Estados(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        EN_REVISION = 'en_revision', 'En revisión'
        EN_PROCESO = 'en_proceso', 'En proceso'
        COMPLETADA = 'completada', 'Completada'
        RECHAZADA = 'rechazada', 'Rechazada'

    # Información principal de la solicitud
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()

    # Usuario que crea la solicitud
    creador = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='solicitudes_creadas'
    )

    # Gestor encargado de atenderla
    asignado_a = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='solicitudes_asignadas'
    )

    # Estado actual de la solicitud
    estado = models.CharField(
        max_length=20,
        choices=Estados.choices,
        default=Estados.PENDIENTE
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Solicitud'
        verbose_name_plural = 'Solicitudes'

    def __str__(self):
        return self.titulo


class Tarea(models.Model):

    # Estados disponibles para una tarea
    class Estados(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        EN_PROCESO = 'en_proceso', 'En proceso'
        COMPLETADA = 'completada', 'Completada'

    # Información principal de la tarea
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True)

    # Solicitud a la que pertenece esta tarea
    solicitud = models.ForeignKey(
        Solicitud,
        on_delete=models.CASCADE,
        related_name='tareas'
    )

    # Usuario encargado de realizar la tarea
    asignado_a = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tareas_asignadas'
    )

    # Estado actual de la tarea
    estado = models.CharField(
        max_length=20,
        choices=Estados.choices,
        default=Estados.PENDIENTE
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Tarea'
        verbose_name_plural = 'Tareas'

    def __str__(self):
        return self.titulo