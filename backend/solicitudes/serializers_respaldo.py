from rest_framework import serializers
from .models import Solicitud, Tarea


class SolicitudSerializer(serializers.ModelSerializer):

    # Mostrar el nombre del usuario que creó la solicitud
    creador_nombre = serializers.CharField(
        source='creador.username',
        read_only=True
    )

    # Mostrar el nombre del gestor asignado
    asignado_nombre = serializers.CharField(
        source='asignado_a.username',
        read_only=True
    )

    class Meta:
        model = Solicitud
        fields = '__all__'
        read_only_fields = ('creador', 'fecha_creacion', 'fecha_actualizacion')


class TareaSerializer(serializers.ModelSerializer):

    # Mostrar el título de la solicitud relacionada
    solicitud_titulo = serializers.CharField(
        source='solicitud.titulo',
        read_only=True
    )

    # Mostrar el nombre del usuario asignado
    asignado_nombre = serializers.CharField(
        source='asignado_a.username',
        read_only=True
    )

    class Meta:
        model = Tarea
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'fecha_actualizacion')