from rest_framework.routers import DefaultRouter
from .views import SolicitudViewSet, TareaViewSet

# Crear el enrutador de la API
router = DefaultRouter()

# Registrar las rutas de solicitudes y tareas
router.register('solicitudes', SolicitudViewSet, basename='solicitud')
router.register('tareas', TareaViewSet, basename='tarea')

# Obtener todas las rutas generadas
urlpatterns = router.urls