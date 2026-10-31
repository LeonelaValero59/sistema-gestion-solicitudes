from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Solicitud, Tarea
from .serializers import SolicitudSerializer, TareaSerializer


class SolicitudViewSet(viewsets.ModelViewSet):

    # Consultar y administrar solicitudes
    serializer_class = SolicitudSerializer
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario = self.request.user

        # El administrador y el gestor pueden ver todas las tareas
        if usuario.rol in ['administrador', 'gestor']:
            return Tarea.objects.all()

        # El usuario ve las tareas de sus propias solicitudes
        return Tarea.objects.filter(solicitud__creador=usuario)