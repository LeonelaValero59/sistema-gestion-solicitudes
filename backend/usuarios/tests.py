
from django.test import TestCase
from django.urls import reverse
from .models import Usuario


class InicioSesionTests(TestCase):

    # Crear un usuario de prueba antes de cada prueba
    def setUp(self):
        self.usuario = Usuario.objects.create_user(
            username='usuario_prueba',
            password='PruebaSegura123',
            rol='usuario'
        )

    # Comprobar que un usuario pueda iniciar sesión
    def test_inicio_sesion_correcto(self):
        respuesta = self.client.post(
            reverse('iniciar_sesion'),
            data={
                'username': 'usuario_prueba',
                'password': 'PruebaSegura123'
            },
            content_type='application/json'
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertTrue(respuesta.json()['mensaje'])

    # Comprobar que se rechacen credenciales incorrectas
    def test_inicio_sesion_incorrecto(self):
        respuesta = self.client.post(
            reverse('iniciar_sesion'),
            data={
                'username': 'usuario_prueba',
                'password': 'ClaveIncorrecta'
            },
            content_type='application/json'
        )

        self.assertEqual(respuesta.status_code, 401)
        self.assertIn('error', respuesta.json())
