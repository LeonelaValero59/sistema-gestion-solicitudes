
from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):

    # Roles disponibles dentro del sistema
    class Roles(models.TextChoices):
        ADMINISTRADOR = 'administrador', 'Administrador'
        GESTOR = 'gestor', 'Gestor'
        USUARIO = 'usuario', 'Usuario'
        VISITANTE = 'visitante', 'Visitante'

    # Rol asignado a cada cuenta
    rol = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.USUARIO,
        verbose_name='Rol del usuario'
    )

    def __str__(self):
        return f"{self.username} - {self.get_rol_display()}"
