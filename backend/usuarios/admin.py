from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):

    # Campos adicionales que se muestran en la lista
    list_display = (
        'username',
        'email',
        'first_name',
        'last_name',
        'rol',
        'is_active',
    )

    # Filtros para organizar los usuarios
    list_filter = ('rol', 'is_active', 'is_staff')

    # Campos disponibles al editar un usuario
    fieldsets = UserAdmin.fieldsets + (
        ('Información del sistema', {'fields': ('rol',)}),
    )

    # Campo adicional al crear un usuario
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Información del sistema', {'fields': ('rol',)}),
    )