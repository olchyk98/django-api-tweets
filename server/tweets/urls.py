from django.urls import path, include
from rest_framework import routers

from .views import TweetsView

router = routers.DefaultRouter()
router.register('tweets', TweetsView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', include('client.urls'))
]