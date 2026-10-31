
from django.test import TestCase
from rest_framework.test import APIClient

from usuarios.models import Usuario
from .models import Solicitud


class PermisosSolicitudesTests(TestCase):

    def setUp(self):
        # Crear usuarios de prueba
        self.usuario1 = Usuario.objects.create_user(
            username='usuario_uno',
            password='PruebaSegura123',
            rol='usuario'
        )

        self.usuario2 = Usuario.objects.create_user(
            username='usuario_dos',
            password='PruebaSegura123',
            rol='usuario'
        )

        self.gestor = Usuario.objects.create_user(
            username='gestor_prueba',
            password='PruebaSegura123',
            rol='gestor'
        )

        # Crear solicitudes de prueba
        Solicitud.objects.create(
            titulo='Solicitud del usuario uno',
            descripcion='Primera solicitud de prueba',
            creador=self.usuario1
        )

        Solicitud.objects.create(
            titulo='Solicitud del usuario dos',
            descripcion='Segunda solicitud de prueba',
            creador=self.usuario2
        )

        self.cliente = APIClient()

    # Comprobar que el usuario solo vea sus solicitudes
    def test_usuario_solo_ve_sus_solicitudes(self):
        self.cliente.force_authenticate(user=self.usuario1)

        respuesta = self.cliente.get('/api/solicitudes/solicitudes/')

        self.assertEqual(respuesta.status_code, 200)
        self.assertEqual(len(respuesta.data), 1)
        self.assertEqual(
            respuesta.data[0]['titulo'],
            'Solicitud del usuario uno'
        )

    # Comprobar que el gestor pueda ver todas las solicitudes
    def test_gestor_ve_todas_las_solicitudes(self):
        self.cliente.force_authenticate(user=self.gestor)

        respuesta = self.cliente.get('/api/solicitudes/solicitudes/')

        self.assertEqual(respuesta.status_code, 200)
        self.assertEqual(len(respuesta.data), 2)

    # Comprobar que un usuario normal no pueda crear tareas
    def test_usuario_no_puede_crear_tareas(self):
        self.cliente.force_authenticate(user=self.usuario1)

        respuesta = self.cliente.post(
            '/api/solicitudes/tareas/',
            data={
                'titulo': 'Tarea de prueba',
                'descripcion': 'Tarea no autorizada',
                'solicitud': 1
            }
        )

        self.assertEqual(respuesta.status_code, 403)
