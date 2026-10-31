
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS

from .models import Solicitud, Tarea
from .serializers import SolicitudSerializer, TareaSerializer


# Permitir la gestión solamente al administrador y al gestor
class EsAdministradorOGestor(BasePermission):

    def has_permission(self, request, view):
        return request.user.rol in ['administrador', 'gestor']


# Permitir crear solicitudes a los usuarios registrados
class PuedeCrearSolicitud(BasePermission):

    def has_permission(self, request, view):
        return request.user.rol in [
            'administrador',
            'gestor',
            'usuario'
        ]


class SolicitudViewSet(viewsets.ModelViewSet):

    # Consultar y administrar solicitudes
    serializer_class = SolicitudSerializer

    def get_permissions(self):
        # Todos los usuarios autenticados pueden consultar
        if self.action in ['list', 'retrieve']:
            permisos = [IsAuthenticated]

        # Los usuarios también pueden registrar solicitudes
        elif self.action == 'create':
            permisos = [IsAuthenticated, PuedeCrearSolicitud]

        # Solo el administrador y el gestor pueden modificar
        else:
            permisos = [IsAuthenticated, EsAdministradorOGestor]

        return [permiso() for permiso in permisos]

    def get_queryset(self):
        usuario = self.request.user

        # El administrador y el gestor pueden ver todas las solicitudes
        if usuario.rol in ['administrador', 'gestor']:
            return Solicitud.objects.all()

        # El usuario solamente puede ver sus propias solicitudes
        return Solicitud.objects.filter(creador=usuario)

    def perform_create(self, serializer):
        # La solicitud queda asociada al usuario que la crea
        serializer.save(creador=self.request.user)


class TareaViewSet(viewsets.ModelViewSet):

    # Consultar y administrar tareas
    serializer_class = TareaSerializer

    def get_permissions(self):
        # Todos los usuarios autenticados pueden consultar
        if self.action in ['list', 'retrieve']:
            permisos = [IsAuthenticated]

        # Solo el administrador y el gestor pueden crear o modificar tareas
        else:
            permisos = [IsAuthenticated, EsAdministradorOGestor]

        return [permiso() for permiso in permisos]

    def get_queryset(self):
        usuario = self.request.user

        # El administrador y el gestor pueden ver todas las tareas
        if usuario.rol in ['administrador', 'gestor']:
            return Tarea.objects.all()

        # El usuario ve las tareas de sus propias solicitudes
        return Tarea.objects.filter(solicitud__creador=usuario)
