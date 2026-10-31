
from django.urls import path
from . import views

# Direcciones para iniciar y cerrar sesión
urlpatterns = [
    path('csrf/', views.obtener_csrf, name='obtener_csrf'),
    path('login/', views.iniciar_sesion, name='iniciar_sesion'),
    path('logout/', views.cerrar_sesion, name='cerrar_sesion'),
]
